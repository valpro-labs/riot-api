import { PASTokenResponse } from '../types/Auth/PASToken';
import type { PlayerInfoResponse } from '../types/Auth/PlayerInfo';
import type { RiotGeoResponse } from '../types/Auth/RiotGeo';

import { IRiotClient } from '../types/Base/IRiotClient';
import { RequestOptions } from '../types/Base/RequestOptions';

export class AuthApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/player-info)
   */
  public async getPlayerInfo(options?: RequestOptions) {
    return this.client.request<PlayerInfoResponse>(
      'https://auth.riotgames.com/userinfo',
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/riot-geo)
   */
  public async putRiotGeo(options?: RequestOptions) {
    const authData = await this.client.getAuthProvider().getAuthData();

    if (!authData) {
      throw new Error('No authentication data available');
    }

    return this.client.request<RiotGeoResponse>(
      'https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant',
      {
        method: 'PUT',
        signal: options?.signal,
        data: {
          id_token: authData.idToken,
        }
      },
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/pas-token)
   */
  public async getPasToken(options?: RequestOptions) {
    const authData = await this.client.getAuthProvider().getAuthData();

    if (!authData) {
      throw new Error('No authentication data available');
    }

    return this.client.request<PASTokenResponse>(
      'https://riot-geo.pas.si.riotgames.com/pas/v1/service/chat',
      {
        method: 'GET',
        signal: options?.signal,
      },
    );
  }
}
