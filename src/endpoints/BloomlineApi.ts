import type {
  BloomlinePlayerResponse,
  BloomlineValidQueuesResponse,
  UpdateBloomlinePlayerBonsaiBody,
} from '../types/Bloomline';
import type { Region } from '../types/Shared/ValorantType';
import { IRiotClient } from '../types/Base/IRiotClient';
import { RequestOptions } from '../types/Base/RequestOptions';

export class BloomlineApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/bloomline-player)
   */
  public async getBloomlinePlayer(region: Region, puuid: string, options?: RequestOptions) {
    return this.client.requestPD<BloomlinePlayerResponse>(
      region,
      `bloomline/v0/players/${puuid}`,
      { method: 'GET', signal: options?.signal }
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/bloomline-player-bonsai)
   */
  public async getBloomlinePlayerBonsai(
    region: Region,
    puuid: string,
    agentID: string,
    options?: RequestOptions
  ) {
    return this.client.requestPD<BloomlinePlayerResponse>(
      region,
      `bloomline/v0/players/${puuid}/bonsai/${agentID}`,
      { method: 'GET', signal: options?.signal }
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/update-bloomline-player-bonsai)
   */
  public async postUpdateBloomlinePlayerBonsai(
    region: Region,
    puuid: string,
    agentID: string,
    data: UpdateBloomlinePlayerBonsaiBody,
    options?: RequestOptions
  ) {
    return this.client.requestPD<BloomlinePlayerResponse>(
      region,
      `bloomline/v0/players/${puuid}/bonsai/${agentID}`,
      { method: 'POST', data, signal: options?.signal }
    );
  }

  /**
   * [API Docs](https://valdocs.prometheuz.me/endpoint/bloomline-valid-queues)
   */
  public async getBloomlineValidQueues(region: Region, options?: RequestOptions) {
    return this.client.requestPD<BloomlineValidQueuesResponse>(
      region,
      'bloomline/v0/config/valid-queues',
      { method: 'GET', signal: options?.signal }
    );
  }
}
