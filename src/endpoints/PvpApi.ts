import type { AccountXPResponse } from '../types/Pvp/AccountXP';
import type { CompetitiveUpdatesResponse } from '../types/Pvp/CompetitiveUpdates';
import type { PlayerLoadoutResponse } from '../types/Pvp/PlayerLoadout';
import type { PlayerMMRResponse } from '../types/Pvp/PlayerMMR';
import type { MatchHistoryResponse } from '../types/Pvp/MatchHistory';
import type { MatchDetailsResponse } from '../types/Pvp/MatchDetails';
import type { NameServiceResponse } from '../types/Pvp/NameService';
import type { FetchContentResponse } from '../types/Pvp/FetchContent';
import type { DailyTicketResponse } from '../types/Pvp/DailyTicket';
import type { LeaderboardResponse } from '../types/Pvp/Leaderboard';

import type { Region } from '../types/Shared/ValorantType';

import { IRiotClient } from '../types/Base/IRiotClient';
import { RequestOptions } from '../types/Base/RequestOptions';

export class PvpApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/fetch-content)
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
   * [API Docs](https://valdocs.prometheuz.me/endpoint/account-xp)
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
   * [API Docs](https://valdocs.prometheuz.me/endpoint/player-loadout)
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
   * [API Docs](https://valdocs.prometheuz.me/endpoint/set-player-loadout)
   */
  public async putPlayerLoadout(region: Region, uuid: string, loadout: PlayerLoadoutResponse, options?: RequestOptions) {
    return this.client.requestPD<PlayerLoadoutResponse>(
      region,
      `personalization/v3/players/${uuid}/playerloadout`,
      {
        method: 'PUT',
        data: loadout,
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/player-mmr)
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
   * Set whether the player's current act rank badge is hidden.
   * Returns no content on success.
   */
  public async postHideActRankBadge(region: Region, uuid: string, hide: boolean, options?: RequestOptions) {
    return this.client.requestPD<void>(
      region,
      `mmr/v1/players/${uuid}/hideactrankbadge`,
      {
        method: 'POST',
        data: { hide },
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/match-history)
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
   * [API Docs](https://valdocs.prometheuz.me/endpoint/match-details)
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
   * [API Docs](https://valdocs.prometheuz.me/endpoint/competitive-updates)
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
   * [API Docs](https://valdocs.prometheuz.me/endpoint/leaderboard)
   */
  public async getLeaderboard(
    region: Region,
    seasonID: string,
    startIndex: number,
    size: number,
    query?: string,
    options?: RequestOptions
  ) {
    const searchParams = new URLSearchParams({
      startIndex: String(startIndex),
      size: String(size),
    });
    if (query) searchParams.set('query', query);

    return this.client.requestPD<LeaderboardResponse>(
      region,
      `mmr/v1/leaderboards/affinity/${this.getShard(region)}/queue/competitive/season/${seasonID}?${searchParams}`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  private getShard(region: Region) {
    switch (region) {
      case 'latam':
      case 'br':
      case 'na':
      case 'pbe':
        return 'na';
      default:
        return region;
    }
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/name-service)
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
