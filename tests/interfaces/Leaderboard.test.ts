import { LeaderboardSchema } from '../../src/types/Pvp/Leaderboard';

describe('LeaderboardSchema', () => {
  it('accepts leaderboard response payloads', () => {
    const response = {
      Deployment: 'na',
      QueueID: 'competitive',
      SeasonID: '4f0864e2-40af-28a4-de2c-0e9e64e75f23',
      Players: [{
        PlayerCardID: '3f296c07-64c3-494c-923b-fe692a4fa1bd',
        TitleID: 'de7caa6b-adf7-4588-bbd1-143831e786c6',
        IsBanned: false,
        IsAnonymized: false,
        puuid: '492f77ca-aafe-5d26-92c5-b11919d2b532',
        gameName: 'Player',
        tagLine: 'NA1',
        leaderboardRank: 1,
        rankedRating: 999,
        numberOfWins: 100,
        competitiveTier: 27,
      }],
      totalPlayers: 1000,
      immortalStartingPage: 1,
      immortalStartingIndex: 500,
      topTierRRThreshold: 500,
      tierDetails: {
        radiant: { rankedRatingThreshold: 500, startingPage: 1, startingIndex: 0 },
      },
      startIndex: 0,
      query: '',
    };

    expect(LeaderboardSchema.safeParse(response).success).toBe(true);
  });
});
