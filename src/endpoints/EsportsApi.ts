import type {
  EsportsMatchesResponse,
  EsportsRequestParams,
  UpcomingMatchesResponse,
} from '../types/Esports/Esports';
import type { Region } from '../types/Shared/ValorantType';

import { IRiotClient } from '../types/Base/IRiotClient';
import { RequestOptions } from '../types/Base/RequestOptions';

const BASE_RESOURCE = 'esports-service/v2';

export class EsportsApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/upcoming-matches)
   */
  public async getUpcomingMatches(
    region: Region,
    leagueIDs: string[],
    params?: EsportsRequestParams,
    options?: RequestOptions
  ) {
    return this.client.requestPD<UpcomingMatchesResponse>(
      region,
      `${BASE_RESOURCE}/upcomingMatches`,
      {
        method: 'GET',
        signal: options?.signal,
        params: {
          leagueID: leagueIDs.join(','),
          locale: params?.locale,
          sport: params?.sport,
        },
      }
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/matches)
   */
  public async postMatches(
    region: Region,
    matchIDs: string[],
    params?: EsportsRequestParams,
    options?: RequestOptions
  ) {
    return this.client.requestPD<EsportsMatchesResponse>(
      region,
      `${BASE_RESOURCE}/matches`,
      {
        method: 'POST',
        data: { MATCHIDS: matchIDs },
        signal: options?.signal,
        params: {
          locale: params?.locale,
          sport: params?.sport,
        },
      }
    );
  }
}
