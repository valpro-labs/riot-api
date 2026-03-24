import axios from 'axios';
import { reauth } from '../../src/auth/reauth';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('reauth (web)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends cookies as header and returns processed response', async () => {
    mockedAxios.get.mockResolvedValue({
      headers: {
        headers: {
          'Location': 'https://example.com#access_token=abc&expires_in=3600',
          'Set-Cookie': 'ssid=new; Path=/',
        },
      },
    });

    const cookies = [{ name: 'ssid', value: 'old' }];
    const result = await reauth(cookies);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('auth.riotgames.com/authorize'),
      expect.objectContaining({
        headers: { Cookie: 'ssid=old' },
        maxRedirects: 0,
      })
    );

    expect(result.success).toBe(true);
    expect(result.location).toContain('access_token=abc');
  });

  it('uses custom URL when provided', async () => {
    mockedAxios.get.mockResolvedValue({
      headers: {
        headers: {
          'Location': 'https://example.com/callback',
          'Set-Cookie': '',
        },
      },
    });

    await reauth([], 'https://custom-url.com/auth');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://custom-url.com/auth',
      expect.any(Object)
    );
  });
});
