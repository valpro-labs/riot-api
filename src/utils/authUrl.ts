export function getLoginUrl() {
  const url = new URL('https://auth.riotgames.com/authorize');
  url.searchParams.set('redirect_uri', 'https://playvalorant.com/opt_in');
  url.searchParams.set('client_id', 'play-valorant-web-prod');
  url.searchParams.set('response_type', 'token id_token');
  url.searchParams.set('nonce', '1');
  url.searchParams.set('scope', 'account openid');

  return url.toString();
}

export function getLogoutUrl() {
  const url = new URL('https://auth.riotgames.com/logout');

  return url.toString();
}
