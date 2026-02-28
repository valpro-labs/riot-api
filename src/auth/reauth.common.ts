import { Cookie, mergeCookies, parseSetCookieString } from './cookies';

export const webAuthURL =
  'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in%2F&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid';
export const webReauthURL =
  'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid';

export function isReauthSuccessful(location: string) {
  return location?.includes('access_token=') === true;
}

export interface ReauthData {
  cookies: Cookie[];
  success: boolean;
  location: string;
}

export function processReauthResponse(
  cookies: Cookie[],
  headers: Record<string, string>,
): ReauthData {
  const location = headers['Location'] || headers['location'];
  const cookie = headers['Set-Cookie'] || headers['set-cookie'] || '';

  const parsedCookies = parseSetCookieString(cookie);
  const newCookies = mergeCookies(cookies, parsedCookies);
  const success = isReauthSuccessful(location);

  return { cookies: newCookies, success, location };
}
