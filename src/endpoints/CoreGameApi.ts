import type {
  CurrentGamePlayerResponse,
  CurrentGameMatchResponse,
  CurrentGameQuitResponse,
} from '../types/CoreGame';

import type { Region } from '../types/Shared/ValorantType';
import { IRiotClient } from '../types/Base/IRiotClient';

export class CoreGameApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/current-game-player)
   */
  public async getCurrentGamePlayer(region: Region, puuid: string) {
    return this.client.requestGLZ<CurrentGamePlayerResponse>(
      region,
      `core-game/v1/players/${puuid}`
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/current-game-match)
   */
  public async getCurrentGameMatch(region: Region, matchId: string) {
    return this.client.requestGLZ<CurrentGameMatchResponse>(
      region,
      `core-game/v1/matches/${matchId}`
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/current-game-quit)
   *
   * @param region
   * @param puuid Player UUID
   * @param matchId Current Game Match ID
   */
  public async postCurrentGameQuit(region: Region, puuid: string, matchId: string) {
    return this.client.requestGLZ<CurrentGameQuitResponse>(
      region,
      `core-game/v1/players/${puuid}/disassociate/${matchId}`,
      {
        method: 'POST',
      }
    );
  }
}
