import type { AccountXPResponse } from '../types/Pvp/AccountXP';
import type { CompetitiveUpdatesResponse } from '../types/Pvp/CompetitiveUpdates';
import type { PlayerLoadoutResponse } from '../types/Pvp/PlayerLoadout';
import type { PlayerMMRResponse } from '../types/Pvp/PlayerMMR';
import type { MatchHistoryResponse } from '../types/Pvp/MatchHistory';
import type { MatchDetailsResponse } from '../types/Pvp/MatchDetails';
import type { NameServiceResponse } from '../types/Pvp/NameService';
import type { FetchContentResponse } from '../types/Pvp/FetchContent';
import type { DailyTicketResponse } from '../types/Pvp/DailyTicket';

import type { Region } from '../types/Shared/ValorantType';

import { IRiotClient } from '../types/Base/IRiotClient';
import { RequestOptions } from '../types/Base/RequestOptions';

export class PvpApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/fetch-content)
   */
  public async getFetchContent(region: Region, options?: RequestOptions) {
    return this.client.requestShared<FetchContentResponse>(
      region,
      'content-service/v3/content',
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/account-xp)
   */
  public async getAccountXP(region: Region, uuid: string, options?: RequestOptions) {
    return this.client.requestPD<AccountXPResponse>(
      region,
      `account-xp/v1/players/${uuid}`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/player-loadout)
   */
  public async getPlayerLoadout(region: Region, uuid: string, options?: RequestOptions) {
    return this.client.requestPD<PlayerLoadoutResponse>(
      region,
      `personalization/v3/players/${uuid}/playerloadout`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/player-mmr)
   */
  public async getPlayerMMR(region: Region, uuid: string, options?: RequestOptions) {
    return this.client.requestPD<PlayerMMRResponse>(
      region,
      `mmr/v1/players/${uuid}`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/match-history)
   */
  public async getMatchHistory(region: Region, uuid: string, queue?: string, options?: RequestOptions) {
    return this.client.requestPD<MatchHistoryResponse>(
      region,
      `match-history/v1/history/${uuid}${queue ? `?queue=${queue}` : ''}`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/match-details)
   */
  public async getMatchDetail(region: Region, matchID: string, options?: RequestOptions) {
    return this.client.requestPD<MatchDetailsResponse>(
      region,
      `match-details/v1/matches/${matchID}`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/competitive-updates)
   */
  public async getCompetitiveUpdates(region: Region, uuid: string, options?: RequestOptions) {
    return this.client.requestPD<CompetitiveUpdatesResponse>(
      region,
      `mmr/v1/players/${uuid}/competitiveupdates?queue=competitive`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/name-service)
   */
  public async putNameService(region: Region, puuids: string[], options?: RequestOptions) {
    return this.client.requestPD<NameServiceResponse>(
      region,
      'name-service/v2/players',
      {
        method: 'PUT',
        data: puuids,
        signal: options?.signal,
      }
    );
  }

  public async getDailyTicket(region: Region, uuid: string, options?: RequestOptions) {
    return this.client.requestPD<DailyTicketResponse>(
      region,
      `daily-ticket/v1/${uuid}`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }
}
