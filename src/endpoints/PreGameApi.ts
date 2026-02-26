import type { PregamePlayerResponse } from '../interfaces/PreGame/PregamePlayer';
import type { PregameMatchResponse } from '../interfaces/PreGame/PregameMatch';
import type { SelectCharacterResponse } from '../interfaces/PreGame/SelectCharacter';
import type { LockCharacterResponse } from '../interfaces/PreGame/LockCharacter';

import type { Region } from '../interfaces/Shared/ValorantType';


import { RiotClient } from '../RiotClient';

export class PreGameApi {
  private client: RiotClient;

  constructor(client: RiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/pre-game-player)
   */
  public async getPreGamePlayer(region: Region, uuid: string) {
    return this.client.requestGLZ<PregamePlayerResponse>(
      region,
      `pregame/v1/players/${uuid}`
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/pre-game-match)
   */
  public async getPreGameMatch(region: Region, matchId: string) {
    return this.client.requestGLZ<PregameMatchResponse>(
      region,
      `pregame/v1/matches/${matchId}`
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/select-character)
   */
  public async postSelectCharacter(region: Region, matchId: string, agentId: string) {
    return this.client.requestGLZ<SelectCharacterResponse>(
      region,
      `pregame/v1/matches/${matchId}/select/${agentId}`,
      {
        method: 'POST',
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/lock-character)
   */
  public async postLockCharacter(region: Region, matchId: string, agentId: string) {
    return this.client.requestGLZ<LockCharacterResponse>(
      region,
      `pregame/v1/matches/${matchId}/lock/${agentId}`,
      {
        method: 'POST',
      }
    );
  }
}
