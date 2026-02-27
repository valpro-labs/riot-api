
import type { ContractsResponse } from '../interfaces/Contract/Contracts';

import { IRiotClient } from '../interfaces/Base/IRiotClient';

import type { Region } from '../interfaces/Shared/ValorantType';


export class ContractApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/contracts)
   */
  public async getContracts(region: Region, uuid: string) {
    return this.client.requestPD<ContractsResponse>(
      region,
      `contracts/v1/contracts/${uuid}`,
      { method: 'GET' }
    );
  }
}
