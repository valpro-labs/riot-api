import { IRiotClient } from '../../src/types/Base/IRiotClient';
import { CoreGameApi } from '../../src/endpoints/CoreGameApi';

describe('CoreGameApi', () => {
  let mockClient: jest.Mocked<IRiotClient>;
  let api: CoreGameApi;

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
    api = new CoreGameApi(mockClient);
  });

  it('getCurrentGamePlayer calls GLZ with correct resource', async () => {
    await api.getCurrentGamePlayer('na', 'puuid-123');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'na',
      'core-game/v1/players/puuid-123',
      expect.objectContaining({})
    );
  });

  it('getCurrentGameMatch calls GLZ with correct resource', async () => {
    await api.getCurrentGameMatch('eu', 'match-456');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'eu',
      'core-game/v1/matches/match-456',
      expect.objectContaining({})
    );
  });

  it('postCurrentGameQuit uses POST with puuid and matchId', async () => {
    await api.postCurrentGameQuit('ap', 'puuid-123', 'match-456');
    expect(mockClient.requestGLZ).toHaveBeenCalledWith(
      'ap',
      'core-game/v1/players/puuid-123/disassociate/match-456',
      expect.objectContaining({ method: 'POST' })
    );
  });
});
