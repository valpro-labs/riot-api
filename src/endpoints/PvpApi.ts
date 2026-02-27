
import type { AccountXPResponse } from '../types/Pvp/AccountXP';
import type { CompetitiveUpdatesResponse } from '../types/Pvp/CompetitiveUpdates';
import type { PlayerLoadoutResponse } from '../types/Pvp/PlayerLoadout';
import type { MatchHistoryResponse } from '../types/Pvp/MatchHistory';
import type { MatchDetailsResponse } from '../types/Pvp/MatchDetails';
import type { NameServiceResponse } from '../types/Pvp/NameService';

import type { Region } from '../types/Shared/ValorantType';

import type { DailyTicketResponse } from '../types/Pvp/DailyTicket';


import { IRiotClient } from '../types/Base/IRiotClient';

export class PvpApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/account-xp)
   */
  public async getAccountXP(region: Region, uuid: string) {
    return this.client.requestPD<AccountXPResponse>(
      region,
      `account-xp/v1/players/${uuid}`,
      { method: 'GET' }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/player-loadout)
   */
  public async getPlayerLoadout(region: Region, uuid: string) {
    return this.client.requestPD<PlayerLoadoutResponse>(
      region,
      `personalization/v2/players/${uuid}/playerloadout`,
      { method: 'GET' }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/match-history)
   */
  public async getMatchHistory(region: Region, uuid: string, queue?: string) {
    return this.client.requestPD<MatchHistoryResponse>(
      region,
      `match-history/v1/history/${uuid}${queue ? `?queue=${queue}` : ''}`,
      { method: 'GET' }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/match-details)
   */
  public async getMatchDetail(region: Region, matchID: string) {
    return this.client.requestPD<MatchDetailsResponse>(
      region,
      `match-details/v1/matches/${matchID}`,
      { method: 'GET' }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/competitive-updates)
   */
  public async getCompetitiveUpdates(region: Region, uuid: string) {
    return this.client.requestPD<CompetitiveUpdatesResponse>(
      region,
      `mmr/v1/players/${uuid}/competitiveupdates?queue=competitive`,
      { method: 'GET' }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/name-service)
   */
  public async putNameService(region: Region, puuids: string[]) {
    return this.client.requestPD<NameServiceResponse>(
      region,
      'name-service/v2/players',
      {
        method: 'PUT',
        data: puuids,
      }
    );
  }

  public async getDailyTicket(region: Region, uuid: string) {
    return this.client.requestPD<DailyTicketResponse>(
      region,
      `daily-ticket/v1/${uuid}`,
      { method: 'GET' }
    );
  }
}
