import type {
  StorefrontResponse,
  WalletResponse,
} from 'valorant-api-types';

import type { Region } from '../interfaces/ValorantType';
import { ItemTypeID } from '../interfaces/ValorantType';
import { OwnedItemsResponse } from '../interfaces/OwnedItems';

import { RiotClient } from '../RiotClient';

export class StoreApi {
  private client: RiotClient;

  constructor(client: RiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/storefront)
   */
  public async postStorefront(region: Region, uuid: string) {
    return this.client.requestPD<StorefrontResponse>(
      region,
      `store/v3/storefront/${uuid}`,
      {
        method: 'POST',
        data: {},
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/wallet)
   */
  public async getWallet(region: Region, uuid: string) {
    return this.client.requestPD<WalletResponse>(
      region,
      `store/v1/wallet/${uuid}`,
      {
        method: 'GET',
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/owned-items)
   */
  public async getOwnedItems(region: Region, uuid: string, itemTypeID: ItemTypeID) {
    return this.client.requestPD<OwnedItemsResponse>(
      region,
      `store/v1/entitlements/${uuid}/${itemTypeID}`,
      {
        method: 'GET',
      }
    );
  }
}
