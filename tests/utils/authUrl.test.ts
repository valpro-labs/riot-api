import { webAuthURL, webReauthURL } from '../../src/auth/reauth.common';

describe('Auth URLs', () => {
  describe('webAuthURL', () => {
    it('has base https://auth.riotgames.com/authorize', () => {
      const url = new URL(webAuthURL);
      expect(url.origin + url.pathname).toBe('https://auth.riotgames.com/authorize');
    });

    it('contains correct query parameters', () => {
      const url = new URL(webAuthURL);

      expect(url.searchParams.get('redirect_uri')).toBe('https://playvalorant.com/opt_in/');
      expect(url.searchParams.get('client_id')).toBe('play-valorant-web-prod');
      expect(url.searchParams.get('response_type')).toBe('token id_token');
      expect(url.searchParams.get('nonce')).toBe('1');
      expect(url.searchParams.get('scope')).toBe('account openid');
    });
  });

  describe('webReauthURL', () => {
    it('has base https://auth.riotgames.com/authorize', () => {
      const url = new URL(webReauthURL);
      expect(url.origin + url.pathname).toBe('https://auth.riotgames.com/authorize');
    });

    it('contains correct query parameters', () => {
      const url = new URL(webReauthURL);

      expect(url.searchParams.get('redirect_uri')).toBe('https://playvalorant.com/opt_in');
      expect(url.searchParams.get('client_id')).toBe('play-valorant-web-prod');
      expect(url.searchParams.get('response_type')).toBe('token id_token');
      expect(url.searchParams.get('nonce')).toBe('1');
      expect(url.searchParams.get('scope')).toBe('account openid');
    });
  });
});
