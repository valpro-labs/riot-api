import type { PregamePlayerResponse } from '../types/PreGame/PregamePlayer';
import type { PregameMatchResponse } from '../types/PreGame/PregameMatch';
import type { SelectCharacterResponse } from '../types/PreGame/SelectCharacter';
import type { LockCharacterResponse } from '../types/PreGame/LockCharacter';
import type { PreGameQuitResponse } from '../types/PreGame/PreGameQuit';

import type { Region } from '../types/Shared/ValorantType';

import { IRiotClient } from '../types/Base/IRiotClient';
import { RequestOptions } from '../types/Base/RequestOptions';

export class PreGameApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/pre-game-player)
   */
  public async getPreGamePlayer(region: Region, uuid: string, options?: RequestOptions) {
    return this.client.requestGLZ<PregamePlayerResponse>(
      region,
      `pregame/v1/players/${uuid}`,
      { signal: options?.signal }
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/pre-game-match)
   */
  public async getPreGameMatch(region: Region, matchId: string, options?: RequestOptions) {
    return this.client.requestGLZ<PregameMatchResponse>(
      region,
      `pregame/v1/matches/${matchId}`,
      { signal: options?.signal }
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/select-character)
   */
  public async postSelectCharacter(region: Region, matchId: string, agentId: string, options?: RequestOptions) {

    return this.client.requestGLZ<SelectCharacterResponse>(
      region,
      `pregame/v1/matches/${matchId}/select/${agentId}`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/lock-character)
   */
  public async postLockCharacter(region: Region, matchId: string, agentId: string, options?: RequestOptions) {

    return this.client.requestGLZ<LockCharacterResponse>(
      region,
      `pregame/v1/matches/${matchId}/lock/${agentId}`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/pre-game-quit)
   *
   * Quit the pre-game lobby
   */
  public async postPreGameQuit(region: Region, matchId: string, options?: RequestOptions) {

    return this.client.requestGLZ<PreGameQuitResponse>(
      region,
      `pregame/v1/matches/${matchId}/quit`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }
}
