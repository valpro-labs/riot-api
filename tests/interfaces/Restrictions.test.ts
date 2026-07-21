import {
  PenaltiesSchema,
  PlayerAvoidListSchema,
  PlayerInterventionsSchema,
} from '../../src/types/Restrictions/Restrictions';

const subject = '492f77ca-aafe-5d26-92c5-b11919d2b532';

describe('Restrictions schemas', () => {
  it('accepts penalties response payloads', () => {
    const response = {
      Subject: subject,
      Penalties: [{
        ID: 'penalty', IssuingGameStartUnixMillis: 0, IssuingMatchID: 'match', Expiry: '2026-07-22T00:00:00.000Z', GamesRemaining: 0,
        ApplyToAllPlatforms: false, ApplyToPlatforms: [], ApplyToPlatformGroups: [], InfractionID: 'infraction', Origin: 'game',
        ForgivenessIneligible: false, IsAutomatedDetection: true, WarningEffect: null,
      }],
      Infractions: [{ ID: 'infraction', Name: 'AFK', RatingName: 'afk' }],
      Version: 1,
    };

    expect(PenaltiesSchema.safeParse(response).success).toBe(true);
  });

  it('accepts player interventions response payloads', () => {
    const response = {
      Subject: subject,
      InterventionsByCategory: [{
        BehaviorCategory: 'PARTICIPATION', BehaviorRatingName: 'afk', LastRatingReduction: '2026-07-20T00:00:00.000Z',
        ActiveInterventions: [], NextInterventionNames: [], AppliedInfractions: {},
      }],
    };

    expect(PlayerInterventionsSchema.safeParse(response).success).toBe(true);
  });

  it('accepts player avoid list response payloads', () => {
    expect(PlayerAvoidListSchema.safeParse({ Subject: subject, AvoidList: [null] }).success).toBe(true);
  });
});
