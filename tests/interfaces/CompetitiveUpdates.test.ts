import { CompetitiveUpdatesSchema } from '../../src/types/Pvp/CompetitiveUpdates';

describe('CompetitiveUpdatesSchema', () => {
  it('accepts competitiveupdates response payloads', () => {
    const response = {
      Version: 0,
      Subject: '492f77ca-aafe-5d26-92c5-b11919d2b532',
      Matches: [
        {
          MatchID: 'f051ea58-5f62-4e1b-9aab-37d16f0634ef',
          MapID: '/Game/Maps/Triad/Triad',
          QueueID: 'competitive',
          SeasonID: '4f0864e2-40af-28a4-de2c-0e9e64e75f23',
          MatchStartTime: 1782740078533,
          MatchLength: 2117554,
          TierAfterUpdate: 15,
          TierBeforeUpdate: 15,
          RankedRatingAfterUpdate: 64,
          RankedRatingBeforeUpdate: 49,
          RankedRatingEarned: 15,
          RankedRatingPerformanceBonus: 0,
          RankedRatingRefundApplied: 0,
          NewMapIncentiveRRForgiven: 0,
          CompetitiveMovement: 'MOVEMENT_UNKNOWN',
          AFKPenalty: 0,
          WasDerankProtected: false,
          WasDerankProtectionReplenished: false,
        },
      ],
    };

    expect(CompetitiveUpdatesSchema.safeParse(response).success).toBe(true);
  });
});
