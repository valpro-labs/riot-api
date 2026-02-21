import { jwtDecode } from 'jwt-decode';

import { parseAuthRedirect } from '../../src/utils/parseAuthRedirect';

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('parseAuthRedirect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const generateValidUrl = (hashPrefix = '#') =>
    `https://example.com/redirect${hashPrefix}access_token=valid_access_token&id_token=valid_id_token&expires_in=3600`;

  it('correctly parses redirect URL with #access_token, id_token, and expires_in', () => {
    const mockPuuid = '12345-67890';
    (jwtDecode as jest.Mock).mockReturnValue({ sub: mockPuuid });
    const now = 1600000000000;
    jest.setSystemTime(new Date(now));

    const result = parseAuthRedirect(generateValidUrl());

    expect(result.accessToken).toBe('valid_access_token');
    expect(result.idToken).toBe('valid_id_token');
    expect(result.puuid).toBe(mockPuuid);
  });

  it('correctly decodes puuid (sub) from JWT access_token', () => {
    const mockPuuid = 'mocked-puuid-sub';
    (jwtDecode as jest.Mock).mockReturnValue({ sub: mockPuuid });

    const result = parseAuthRedirect(generateValidUrl());

    expect(jwtDecode).toHaveBeenCalledWith('valid_access_token');
    expect(result.puuid).toBe(mockPuuid);
  });

  it('calculates expiresAt correctly (expiresIn * 1000 + Date.now() - 60000)', () => {
    (jwtDecode as jest.Mock).mockReturnValue({ sub: 'puuid' });
    const now = 1600000000000;
    jest.setSystemTime(new Date(now));

    const result = parseAuthRedirect(generateValidUrl());
    // expires_in is 3600
    // formula: 3600 * 1000 + 1600000000000 - 60000 = 1600003540000
    expect(result.expiresAt).toBe(1600003540000);
  });

  it('throws an error when URL is missing access_token', () => {
    const url = 'https://example.com/redirect#id_token=valid_id_token&expires_in=3600';
    expect(() => parseAuthRedirect(url)).toThrow('Access token missing from url');
  });

  it('throws an error when URL is missing id_token', () => {
    const url = 'https://example.com/redirect#access_token=valid_access_token&expires_in=3600';
    expect(() => parseAuthRedirect(url)).toThrow('Entitlement missing from url');
  });

  it('throws an error when URL is missing expires_in', () => {
    const url = 'https://example.com/redirect#access_token=valid_access_token&id_token=valid_id_token';
    expect(() => parseAuthRedirect(url)).toThrow('Expiry missing from url');
  });

  it('throws an error when JWT payload is missing the sub field', () => {
    (jwtDecode as jest.Mock).mockReturnValue({ other_field: 'value' });
    expect(() => parseAuthRedirect(generateValidUrl())).toThrow('Invalid access token, missing sub');
  });

  it('correctly parses hash that does not start with #', () => {
    const originalURL = global.URL;
    global.URL = jest.fn(() => ({
      hash: 'access_token=valid_access_token&id_token=valid_id_token&expires_in=3600',
    })) as any;

    try {
      const mockPuuid = 'puuid-no-hash';
      (jwtDecode as jest.Mock).mockReturnValue({ sub: mockPuuid });

      const result = parseAuthRedirect('dummy_url');
      expect(result.puuid).toBe(mockPuuid);
      expect(result.accessToken).toBe('valid_access_token');
    } finally {
      global.URL = originalURL;
    }
  });
});
