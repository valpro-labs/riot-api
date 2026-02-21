import { RiotClient } from '../src/RiotClient';
import { AuthApi } from '../src/endpoints/AuthApi';
import { PvpApi } from '../src/endpoints/PvpApi';
import { StoreApi } from '../src/endpoints/StoreApi';
import { ContractApi } from '../src/endpoints/ContractApi';
import { PreGameApi } from '../src/endpoints/PreGameApi';

import { VALORANT_ITEM_TYPES } from '../src/interfaces/ValorantType';

jest.mock('../src/RiotClient');

describe('Riot API Endpoints', () => {
  let mockClient: jest.Mocked<RiotClient>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient = new RiotClient({} as any) as jest.Mocked<RiotClient>;
    mockClient.request = jest.fn();
    mockClient.requestPD = jest.fn();
    mockClient.requestShared = jest.fn();
    mockClient.requestGLZ = jest.fn();
    mockClient.getAuthProvider = jest.fn().mockReturnValue({
      getAuthData: jest.fn().mockResolvedValue({ idToken: 'test-id-token' })
    });
  });

  describe('AuthApi', () => {
    let api: AuthApi;
    beforeEach(() => { api = new AuthApi(mockClient); });

    it('getPlayerInfo calls correct URL', async () => {
      await api.getPlayerInfo();
      expect(mockClient.request).toHaveBeenCalledWith('https://auth.riotgames.com/userinfo', { method: 'GET' });
    });

    it('putRiotGeo sends id_token', async () => {
      await api.putRiotGeo();
      expect(mockClient.request).toHaveBeenCalledWith('https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant', {
        method: 'PUT',
        data: { id_token: 'test-id-token' }
      });
    });
  });

  describe('PvpApi', () => {
    let api: PvpApi;
    beforeEach(() => { api = new PvpApi(mockClient); });

    it('getAccountXP formats resource', async () => {
      await api.getAccountXP('na', 'uuid-123');
      expect(mockClient.requestPD).toHaveBeenCalledWith('na', 'account-xp/v1/players/uuid-123', { method: 'GET' });
    });

    it('getPlayerLoadout formats resource', async () => {
      await api.getPlayerLoadout('na', 'uuid-123');
      expect(mockClient.requestPD).toHaveBeenCalledWith('na', 'personalization/v2/players/uuid-123/playerloadout', { method: 'GET' });
    });

    it('getMatchHistory appends queue if provided', async () => {
      await api.getMatchHistory('na', 'uuid-123');
      expect(mockClient.requestPD).toHaveBeenCalledWith('na', 'match-history/v1/history/uuid-123', { method: 'GET' });

      await api.getMatchHistory('na', 'uuid-123', 'competitive');
      expect(mockClient.requestPD).toHaveBeenCalledWith('na', 'match-history/v1/history/uuid-123?queue=competitive', { method: 'GET' });
    });

    it('getMatchDetail formats resource', async () => {
      await api.getMatchDetail('na', 'match-id');
      expect(mockClient.requestPD).toHaveBeenCalledWith('na', 'match-details/v1/matches/match-id', { method: 'GET' });
    });

    it('getCompetitiveUpdates formats resource', async () => {
      await api.getCompetitiveUpdates('na', 'uuid-123');
      expect(mockClient.requestPD).toHaveBeenCalledWith('na', 'mmr/v1/players/uuid-123/competitiveupdates?queue=competitive', { method: 'GET' });
    });

    it('putNameService uses PUT and array data', async () => {
      await api.putNameService('na', ['u1', 'u2']);
      expect(mockClient.requestPD).toHaveBeenCalledWith('na', 'name-service/v2/players', { method: 'PUT', data: ['u1', 'u2'] });
    });
  });

  describe('StoreApi', () => {
    let api: StoreApi;
    beforeEach(() => { api = new StoreApi(mockClient); });

    it('postStorefront uses POST', async () => {
      await api.postStorefront('na', 'uuid-123');
      expect(mockClient.requestPD).toHaveBeenCalledWith('na', 'store/v3/storefront/uuid-123', { method: 'POST', data: {} });
    });

    it('getWallet uses GET', async () => {
      await api.getWallet('na', 'uuid-123');
      expect(mockClient.requestPD).toHaveBeenCalledWith('na', 'store/v1/wallet/uuid-123', { method: 'GET' });
    });

    it('getOwnedItems appends itemTypeID', async () => {
      await api.getOwnedItems('na', 'uuid-123', VALORANT_ITEM_TYPES.AGENT);
      expect(mockClient.requestPD).toHaveBeenCalledWith('na', `store/v1/entitlements/uuid-123/${VALORANT_ITEM_TYPES.AGENT}`, { method: 'GET' });
    });
  });

  describe('ContractApi', () => {
    let api: ContractApi;
    beforeEach(() => { api = new ContractApi(mockClient); });

    it('getContracts calls correct resource', async () => {
      await api.getContracts('na', 'uuid-123');
      expect(mockClient.requestPD).toHaveBeenCalledWith('na', 'contracts/v1/contracts/uuid-123', { method: 'GET' });
    });
  });

  describe('PreGameApi', () => {
    let api: PreGameApi;
    beforeEach(() => { api = new PreGameApi(mockClient); });

    it('getPreGamePlayer calls GLZ', async () => {
      await api.getPreGamePlayer('na', 'uuid-123');
      expect(mockClient.requestGLZ).toHaveBeenCalledWith('na', 'pregame/v1/players/uuid-123');
    });

    it('getPreGameMatch calls GLZ with matchId', async () => {
      await api.getPreGameMatch('na', 'match-id');
      expect(mockClient.requestGLZ).toHaveBeenCalledWith('na', 'pregame/v1/matches/match-id');
    });

    it('postSelectCharacter uses POST', async () => {
      await api.postSelectCharacter('na', 'match-id', 'agent-id');
      expect(mockClient.requestGLZ).toHaveBeenCalledWith('na', 'pregame/v1/matches/match-id/select/agent-id', { method: 'POST' });
    });

    it('postLockCharacter uses POST', async () => {
      await api.postLockCharacter('na', 'match-id', 'agent-id');
      expect(mockClient.requestGLZ).toHaveBeenCalledWith('na', 'pregame/v1/matches/match-id/lock/agent-id', { method: 'POST' });
    });
  });
});
