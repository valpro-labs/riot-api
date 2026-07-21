import { EsportsApi } from '../../src/endpoints/EsportsApi';
import { IRiotClient } from '../../src/types/Base/IRiotClient';

describe('EsportsApi', () => {
  let mockClient: jest.Mocked<IRiotClient>;
  let api: EsportsApi;

  beforeEach(() => {
    mockClient = {
      request: jest.fn(),
      requestPD: jest.fn(),
      requestShared: jest.fn(),
      requestGLZ: jest.fn(),
      getAuthProvider: jest.fn(),
      getEntitlementToken: jest.fn(),
    };
    api = new EsportsApi(mockClient);
  });

  it('gets upcoming matches with comma-separated league IDs', async () => {
    await api.getUpcomingMatches('na', ['league-a', 'league-b'], { locale: 'en-US', sport: 'val' });

    expect(mockClient.requestPD).toHaveBeenCalledWith('na', 'esports-service/v2/upcomingMatches', {
      method: 'GET',
      signal: undefined,
      params: { leagueID: 'league-a,league-b', locale: 'en-US', sport: 'val' },
    });
  });

  it('posts match IDs with optional query parameters', async () => {
    await api.postMatches('eu', ['match-a'], { locale: 'ru-RU' });

    expect(mockClient.requestPD).toHaveBeenCalledWith('eu', 'esports-service/v2/matches', {
      method: 'POST',
      data: { MATCHIDS: ['match-a'] },
      signal: undefined,
      params: { locale: 'ru-RU', sport: undefined },
    });
  });
});
