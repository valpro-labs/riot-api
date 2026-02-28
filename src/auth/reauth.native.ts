import ReactNativeBlobUtil from 'react-native-blob-util';

import { Cookie, createCookieString } from './cookies';
import { webReauthURL, ReauthData, processReauthResponse } from './reauth.common';

export async function reauth(cookies: Cookie[], url: string = webReauthURL): Promise<ReauthData> {
  const cookieStr = createCookieString(cookies);

  const response = await ReactNativeBlobUtil
    .config({
      followRedirect: false,
    })
    .fetch('GET', url, {
      Cookie: cookieStr,
    });

  return processReauthResponse(cookies, response.info().headers);
}
