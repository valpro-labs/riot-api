import axios, { AxiosResponse } from "axios";

import {
  Cookie,
  createCookieString,
  mergeCookies,
  parseSetCookieString,
} from "./cookies";

export const webAuthURL =
  'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in%2F&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid';
export const webReauthURL =
  'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid';

export async function reauthWeb(cookies: Cookie[], url: string) {
  const cookieStr = createCookieString(cookies);

  try {
    const response = await axios.get(url, {
      headers: {
        Cookie: cookieStr,
      },
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status < 400,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export function isReauthSuccessful(response: AxiosResponse) {
  const location = response.headers['location'];
  return location?.includes('access_token=') === true;
}

interface ReauthWebData {
  cookies: Cookie[];
  success: boolean;
  location: string;
}

export async function refreshWeb(
  cookies: Cookie[],
  url: string,
): Promise<ReauthWebData> {
  const response = await reauthWeb(cookies, url);

  const parsedCookies = parseSetCookieString(
    response.headers['set-cookie'] ?? "",
  );
  const newCookies = mergeCookies(cookies, parsedCookies);

  const success = isReauthSuccessful(response);

  return {
    cookies: newCookies,
    success,
    location: response.headers['location'],
  };
}
