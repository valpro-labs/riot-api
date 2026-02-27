
import { RiotClient } from './RiotClient';

import { AuthApi } from '../endpoints/AuthApi';
import { PvpApi } from '../endpoints/PvpApi';
import { StoreApi } from '../endpoints/StoreApi';
import { ContractApi } from '../endpoints/ContractApi';
import { PreGameApi } from '../endpoints/PreGameApi';
import { NewsFeedApi } from '../endpoints/NewsFeedApi';

import { RiotClientConfig } from '../types/Base/RiotClientConfig';

class RiotApi {
  private client: RiotClient;

  public authApi: AuthApi;
  public pvpApi: PvpApi;
  public storeApi: StoreApi;
  public contractApi: ContractApi;
  public preGameApi: PreGameApi;
  public newsFeedApi: NewsFeedApi;

  constructor(config: RiotClientConfig) {
    this.client = new RiotClient({
      authProvider: config.authProvider,
      versionProvider: config.versionProvider,
    });

    this.authApi = new AuthApi(this.client);
    this.pvpApi = new PvpApi(this.client);
    this.storeApi = new StoreApi(this.client);
    this.contractApi = new ContractApi(this.client);
    this.preGameApi = new PreGameApi(this.client);
    this.newsFeedApi = new NewsFeedApi(this.client);
  }


}

export { RiotApi };
