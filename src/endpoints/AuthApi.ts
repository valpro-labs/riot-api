import type { PlayerInfoResponse } from '../interfaces/Auth/PlayerInfo';
import type { RiotGeoResponse } from '../interfaces/Auth/RiotGeo';

import { RiotClient } from '../RiotClient';

export class AuthApi {
  private client: RiotClient;

  constructor(client: RiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/player-info)
   */
  public async getPlayerInfo() {
    return this.client.request<PlayerInfoResponse>(
      'https://auth.riotgames.com/userinfo',
      {
        method: 'GET',
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/riot-geo)
   */
  public async putRiotGeo() {
    const authData = await this.client.getAuthProvider().getAuthData();

    if (!authData) {
      throw new Error('No authentication data available');
    }

    return this.client.request<RiotGeoResponse>(
      'https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant',
      {
        method: 'PUT',
        data: {
          id_token: authData.idToken,
        }
      },
    );
  }
}
