import { RiotClient } from '../../src/core/RiotClient';
import { CoreGameApi } from '../../src/endpoints/CoreGameApi';

jest.mock('../../src/core/RiotClient');

describe('CoreGameApi', () => {
  let mockClient: jest.Mocked<RiotClient>;
  let api: CoreGameApi;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient = new RiotClient({} as any) as jest.Mocked<RiotClient>;
    mockClient.requestGLZ = jest.fn();
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
