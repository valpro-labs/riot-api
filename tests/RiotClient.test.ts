import axios from 'axios';

import { RiotClient } from '../src/RiotClient';

import { IAuthProvider } from '../src/interfaces/IAuthProvider';
import { IVersionProvider } from '../src/interfaces/IVersionProvider';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RiotClient', () => {
  let mockAuthProvider: jest.Mocked<IAuthProvider>;
  let mockVersionProvider: jest.Mocked<IVersionProvider>;
  let mockAxiosInstance: any;
  let client: RiotClient;

  beforeEach(() => {
    jest.clearAllMocks();

    mockAuthProvider = {
      getAuthData: jest.fn().mockResolvedValue({
        accessToken: 'mock-access',
        idToken: 'mock-id',
        expiresAt: 1000,
        puuid: 'mock-puuid',
      }),
    } as any;

    mockVersionProvider = {
      getRiotClientVersion: jest.fn().mockResolvedValue('release-mock-version'),
    } as any;

    mockAxiosInstance = {
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
      request: jest.fn(),
      get: jest.fn(),
      post: jest.fn(),
    };

    // We override axios.create to return our mock instance, but in axios it acts as a callable function too.
    // For simplicity we mock the instance behaving as a function that returns a promise.
    const axiosCallable = jest.fn().mockResolvedValue({ data: { success: true } });
    Object.assign(axiosCallable, mockAxiosInstance);

    mockedAxios.create.mockReturnValue(axiosCallable as any);

    client = new RiotClient({
      authProvider: mockAuthProvider,
      versionProvider: mockVersionProvider,
    });

    // Replace the internal instance with our mocked callable for easier spying
    (client as any).axiosInstance = axiosCallable;
  });

  describe('Interceptors', () => {
    it('sets up interceptors during initialization', () => {
      // Create a fresh client to observe create() and interceptors
      const interceptorsMock = {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      };
      const newInstance = jest.fn();
      Object.assign(newInstance, { interceptors: interceptorsMock });
      mockedAxios.create.mockReturnValue(newInstance as any);

      new RiotClient({ authProvider: mockAuthProvider, versionProvider: mockVersionProvider });

      expect(interceptorsMock.request.use).toHaveBeenCalled();
      expect(interceptorsMock.response.use).toHaveBeenCalled();
    });

    it('injects access token via request interceptor', async () => {
      const interceptorsMock = {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      };
      const newInstance = jest.fn();
      Object.assign(newInstance, { interceptors: interceptorsMock });
      mockedAxios.create.mockReturnValue(newInstance as any);

      new RiotClient({ authProvider: mockAuthProvider, versionProvider: mockVersionProvider });

      const reqInterceptor = interceptorsMock.request.use.mock.calls[0][0];
      const config = { headers: {} };
      const modifiedConfig = await reqInterceptor(config);

      expect(modifiedConfig.headers.Authorization).toBe('Bearer mock-access');
    });
  });

  describe('Generic request', () => {
    it('calls axios instance and returns data', async () => {
      const result = await client.request('https://test.com', { method: 'GET' });
      expect((client as any).axiosInstance).toHaveBeenCalledWith({ url: 'https://test.com', method: 'GET' });
      expect(result).toEqual({ success: true });
    });
  });

  describe('getShard Mapping', () => {
    // We can test private getShard indirectly through formatting in requestPD
    it('maps region "na" to shard "na"', async () => {
      mockAuthProvider.getAuthData.mockResolvedValue(null); // Bypass auth for a sec, though it errors

      // We'll mock getAuthHeaders to avoid entitlement calls just to test the URL
      jest.spyOn(client as any, 'getAuthHeaders').mockResolvedValue({});

      await client.requestPD('na', 'test-res');
      expect((client as any).axiosInstance).toHaveBeenCalledWith(
        expect.objectContaining({ url: 'https://pd.na.a.pvp.net/test-res' })
      );
    });

    it('maps region "latam" to shard "na"', async () => {
      jest.spyOn(client as any, 'getAuthHeaders').mockResolvedValue({});
      await client.requestPD('latam', 'test-res');
      expect((client as any).axiosInstance).toHaveBeenCalledWith(
        expect.objectContaining({ url: 'https://pd.na.a.pvp.net/test-res' })
      );
    });

    it('maps region "eu" to shard "eu"', async () => {
      jest.spyOn(client as any, 'getAuthHeaders').mockResolvedValue({});
      await client.requestPD('eu', 'test-res');
      expect((client as any).axiosInstance).toHaveBeenCalledWith(
        expect.objectContaining({ url: 'https://pd.eu.a.pvp.net/test-res' })
      );
    });
  });

  describe('Auth Headers (getAuthHeaders & getEntitlement)', () => {
    it('fetches entitlement token and client version', async () => {
      const mockPost = jest.spyOn(client as any, 'postEntitlement').mockResolvedValue({
        entitlements_token: 'mock-entitlement'
      });

      const headers = await (client as any).getAuthHeaders();

      expect(mockPost).toHaveBeenCalled();
      expect(headers['X-Riot-ClientVersion']).toBe('release-mock-version');
      expect(headers['X-Riot-Entitlements-JWT']).toBe('mock-entitlement');
    });

    it('caches entitlement calls (deduplication)', async () => {
      const mockPost = jest.spyOn(client as any, 'postEntitlement').mockResolvedValue({
        entitlements_token: 'mock-entitlement'
      });

      // Call twice concurrently
      const p1 = (client as any).getEntitlement();
      const p2 = (client as any).getEntitlement();

      await Promise.all([p1, p2]);

      expect(mockPost).toHaveBeenCalledTimes(1); // Should only make one network request

      // A setup where the cache is hit
      await (client as any).getEntitlement();
      expect(mockPost).toHaveBeenCalledTimes(1); // Still 1
    });

    it('throws error when auth data is missing', async () => {
      mockAuthProvider.getAuthData.mockResolvedValue(null);
      await expect((client as any).getAuthHeaders()).rejects.toThrow('No authentication data available');
    });
  });

  describe('Specific request methods', () => {
    beforeEach(() => {
      jest.spyOn(client as any, 'getAuthHeaders').mockResolvedValue({ 'X-Test-Auth': 'true' });
    });

    it('requestPD formats URL correctly', async () => {
      await client.requestPD('na', 'resource/v1');
      expect((client as any).axiosInstance).toHaveBeenCalledWith({
        url: 'https://pd.na.a.pvp.net/resource/v1',
        method: 'GET',
        headers: {
          'X-Test-Auth': 'true',
        }
      });
    });

    it('requestShared formats URL correctly', async () => {
      await client.requestShared('ap', 'shared/v1');
      expect((client as any).axiosInstance).toHaveBeenCalledWith({
        url: 'https://shared.ap.a.pvp.net/shared/v1',
        headers: {
          'X-Test-Auth': 'true',
        }
      });
    });

    it('requestGLZ formats URL correctly', async () => {
      await client.requestGLZ('eu', 'glz/v1');
      expect((client as any).axiosInstance).toHaveBeenCalledWith({
        url: 'https://glz-eu-1.eu.a.pvp.net/glz/v1',
        headers: {
          'X-Test-Auth': 'true',
        }
      });
    });
  });
});
