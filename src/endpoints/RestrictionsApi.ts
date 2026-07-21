import type {
  PenaltiesResponse,
  PlayerAvoidListResponse,
  PlayerInterventionsResponse,
} from '../types/Restrictions/Restrictions';
import type { Region } from '../types/Shared/ValorantType';

import { IRiotClient } from '../types/Base/IRiotClient';
import { RequestOptions } from '../types/Base/RequestOptions';

export class RestrictionsApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/penalties)
   */
  public async getPenalties(region: Region, options?: RequestOptions) {
    return this.client.requestPD<PenaltiesResponse>(region, 'restrictions/v3/penalties', {
      method: 'GET',
      signal: options?.signal,
    });
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/player-interventions)
   */
  public async getPlayerInterventions(region: Region, options?: RequestOptions) {
    return this.client.requestPD<PlayerInterventionsResponse>(region, 'restrictions/v1/activeFutureInterventions', {
      method: 'GET',
      signal: options?.signal,
    });
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/player-avoid-list)
   */
  public async getPlayerAvoidList(region: Region, options?: RequestOptions) {
    return this.client.requestPD<PlayerAvoidListResponse>(region, 'restrictions/v1/avoidList', {
      method: 'GET',
      signal: options?.signal,
    });
  }
}
