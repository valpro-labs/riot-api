import { RiotApi } from '../src/core/RiotApi';
import { RiotClient } from '../src/core/RiotClient';
import { AuthApi } from '../src/endpoints/AuthApi';
import { PvpApi } from '../src/endpoints/PvpApi';
import { StoreApi } from '../src/endpoints/StoreApi';
import { ContractApi } from '../src/endpoints/ContractApi';
import { PreGameApi } from '../src/endpoints/PreGameApi';
import { NewsFeedApi } from '../src/endpoints/NewsFeedApi';
import { PartyApi } from '../src/endpoints/PartyApi';
import { CoreGameApi } from '../src/endpoints/CoreGameApi';
import { EsportsApi } from '../src/endpoints/EsportsApi';
import { RestrictionsApi } from '../src/endpoints/RestrictionsApi';

jest.mock('../src/core/RiotClient');

describe('RiotApi', () => {
  it('initializes all API endpoint instances', () => {
    const api = new RiotApi({
      authProvider: { getAuthData: jest.fn() },
      versionProvider: { getRiotClientVersion: jest.fn() },
    });

    expect(api.client).toBeInstanceOf(RiotClient);
    expect(api.authApi).toBeInstanceOf(AuthApi);
    expect(api.pvpApi).toBeInstanceOf(PvpApi);
    expect(api.storeApi).toBeInstanceOf(StoreApi);
    expect(api.contractApi).toBeInstanceOf(ContractApi);
    expect(api.preGameApi).toBeInstanceOf(PreGameApi);
    expect(api.newsFeedApi).toBeInstanceOf(NewsFeedApi);
    expect(api.partyApi).toBeInstanceOf(PartyApi);
    expect(api.coreGameApi).toBeInstanceOf(CoreGameApi);
    expect(api.esportsApi).toBeInstanceOf(EsportsApi);
    expect(api.restrictionsApi).toBeInstanceOf(RestrictionsApi);
  });
});
