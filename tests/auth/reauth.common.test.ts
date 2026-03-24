import {
  isReauthSuccessful,
  processReauthResponse,
} from '../../src/auth/reauth.common';

describe('reauth.common', () => {
  describe('isReauthSuccessful', () => {
    it('returns true when location contains access_token=', () => {
      expect(isReauthSuccessful('https://example.com#access_token=abc')).toBe(true);
    });

    it('returns false when location does not contain access_token=', () => {
      expect(isReauthSuccessful('https://example.com/error')).toBe(false);
    });

    it('returns false for empty string location', () => {
      expect(isReauthSuccessful('')).toBe(false);
    });
  });

  describe('processReauthResponse', () => {
    it('returns merged cookies, success flag, and location', () => {
      const cookies = [{ name: 'ssid', value: 'old' }];
      const headers: Record<string, string> = {
        'Location': 'https://example.com#access_token=abc',
        'Set-Cookie': 'ssid=new; Path=/',
      };

      const result = processReauthResponse(cookies, headers);

      expect(result.success).toBe(true);
      expect(result.location).toBe('https://example.com#access_token=abc');
      expect(result.cookies).toEqual([{ name: 'ssid', value: 'new' }]);
    });

    it('handles lowercase headers', () => {
      const headers: Record<string, string> = {
        'location': 'https://example.com/error',
        'set-cookie': 'token=xyz; Path=/',
      };

      const result = processReauthResponse([], headers);

      expect(result.success).toBe(false);
      expect(result.location).toBe('https://example.com/error');
      expect(result.cookies).toEqual([{ name: 'token', value: 'xyz' }]);
    });

    it('handles missing Set-Cookie header', () => {
      const headers: Record<string, string> = {
        'Location': 'https://example.com#access_token=abc',
      };

      const result = processReauthResponse([{ name: 'a', value: '1' }], headers);

      expect(result.success).toBe(true);
      expect(result.cookies).toEqual([{ name: 'a', value: '1' }]);
    });
  });
});
