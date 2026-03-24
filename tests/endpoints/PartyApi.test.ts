import { IRiotClient } from '../../src/types/Base/IRiotClient';
import { PartyApi } from '../../src/endpoints/PartyApi';

describe('PartyApi', () => {
  let mockClient: jest.Mocked<IRiotClient>;
  let api: PartyApi;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient = {
      request: jest.fn(),
      requestPD: jest.fn(),
      requestShared: jest.fn(),
      requestGLZ: jest.fn(),
      getAuthProvider: jest.fn(),
      getEntitlementToken: jest.fn(),
    };
    api = new PartyApi(mockClient);
  });

  it('getParty calls GLZ with GET', async () => {
    await api.getParty('na', 'party-id');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'na', 'parties/v1/parties/party-id',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('changeQueue sends queueID in data', async () => {
    await api.changeQueue('na', 'party-id', 'competitive');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'na', 'parties/v1/parties/party-id/queue',
      expect.objectContaining({ method: 'POST', data: { queueID: 'competitive' } })
    );
  });

  it('setPartyAccessibility sends accessibility value', async () => {
    await api.setPartyAccessibility('na', 'party-id', 'OPEN');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'na', 'parties/v1/parties/party-id/accessibility',
      expect.objectContaining({ method: 'POST', data: { accessibility: 'OPEN' } })
    );
  });

  it('generatePartyCode uses POST', async () => {
    await api.generatePartyCode('eu', 'party-id');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'eu', 'parties/v1/parties/party-id/invitecode',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('disablePartyCode uses DELETE', async () => {
    await api.disablePartyCode('eu', 'party-id');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'eu', 'parties/v1/parties/party-id/invitecode',
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('joinPartyByCode sends code in URL', async () => {
    await api.joinPartyByCode('na', 'ABCD1234');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'na', 'parties/v1/players/joinbycode/ABCD1234',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('setMemberReady sends ready status', async () => {
    await api.setMemberReady('na', 'party-id', 'puuid-123', true);
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'na', 'parties/v1/parties/party-id/members/puuid-123/setReady',
      expect.objectContaining({ method: 'POST', data: { ready: true } })
    );
  });

  it('enterMatchmakingQueue uses POST', async () => {
    await api.enterMatchmakingQueue('ap', 'party-id');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'ap', 'parties/v1/parties/party-id/matchmaking/join',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('leaveMatchmakingQueue uses POST', async () => {
    await api.leaveMatchmakingQueue('ap', 'party-id');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'ap', 'parties/v1/parties/party-id/matchmaking/leave',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('startCustomGame uses POST', async () => {
    await api.startCustomGame('kr', 'party-id');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'kr', 'parties/v1/parties/party-id/startcustomgame',
      expect.objectContaining({ method: 'POST' })
    );
  });
});
