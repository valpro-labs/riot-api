import type { StorefrontResponse } from '../types/Store/Storefront';
import type { WalletResponse } from '../types/Store/Wallet';

import type { Region, ItemTypeID } from '../types/Shared/ValorantType';

import { OwnedItemsResponse } from '../types/Store/OwnedItems';

import { IRiotClient } from '../types/Base/IRiotClient';
import { RequestOptions } from '../types/Base/RequestOptions';

export class StoreApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/storefront)
   */
  public async postStorefront(region: Region, uuid: string, options?: RequestOptions) {

    return this.client.requestPD<StorefrontResponse>(
      region,
      `store/v3/storefront/${uuid}`,
      {
        method: 'POST',
        data: {},
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/wallet)
   */
  public async getWallet(region: Region, uuid: string, options?: RequestOptions) {

    return this.client.requestPD<WalletResponse>(
      region,
      `store/v1/wallet/${uuid}`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/owned-items)
   */
  public async getOwnedItems(region: Region, uuid: string, itemTypeID: ItemTypeID, options?: RequestOptions) {

    return this.client.requestPD<OwnedItemsResponse>(
      region,
      `store/v1/entitlements/${uuid}/${itemTypeID}`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }
}
