import { getLoginUrl, getLogoutUrl } from '../../src/utils/authUrl';

describe('authUrl', () => {
  describe('getLoginUrl', () => {
    it('returns a URL with base https://auth.riotgames.com/authorize', () => {
      const url = getLoginUrl();
      const origin = new URL(url).origin;
      const pathname = new URL(url).pathname;
      expect(origin + pathname).toBe('https://auth.riotgames.com/authorize');
    });

    it('contains correct query parameters', () => {
      const urlString = getLoginUrl();
      const url = new URL(urlString);

      expect(url.searchParams.get('redirect_uri')).toBe('https://playvalorant.com/opt_in');
      expect(url.searchParams.get('client_id')).toBe('play-valorant-web-prod');
      expect(url.searchParams.get('response_type')).toBe('token id_token');
      expect(url.searchParams.get('nonce')).toBe('1');
      expect(url.searchParams.get('scope')).toBe('account openid');
    });
  });

  describe('getLogoutUrl', () => {
    it('returns https://auth.riotgames.com/logout', () => {
      const urlString = getLogoutUrl();
      expect(urlString).toBe('https://auth.riotgames.com/logout');

      const url = new URL(urlString);
      expect(url.origin + url.pathname).toBe('https://auth.riotgames.com/logout');
    });
  });
});
