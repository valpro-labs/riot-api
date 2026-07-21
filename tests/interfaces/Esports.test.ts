import { EsportsMatchesSchema, UpcomingMatchesSchema } from '../../src/types/Esports/Esports';

describe('Esports schemas', () => {
  it('accepts upcoming matches response payloads', () => {
    const response = {
      Leagues: [{ ID: 'league', Name: 'League', ImageURL: 'https://example.com/league.png', TournamentIDs: ['tournament'], TeamIDs: null }],
      Tournaments: [{ ID: 'tournament', Name: 'Tournament', LeagueID: 'league', LeagueName: 'League', StartTime: '2026-07-21T00:00:00.000Z', EndTime: '2026-07-22T00:00:00.000Z', StageIDs: ['stage'], TeamIDs: ['team'] }],
      Teams: [{ ID: 'team', Name: 'Team', Code: 'TM', BaseImageURL: 'base', HighResImageURL: 'high', LowResImageURL: 'low', HomeLeagueID: 'league', TeamMemberIDs: null, BundleID: 'bundle', BundleDataAssetID: 'bundle-data', DataAssetID: 'data' }],
      Seasons: null,
      Splits: null,
    };

    expect(UpcomingMatchesSchema.safeParse(response).success).toBe(true);
  });

  it('accepts matches response payloads', () => {
    const response = {
      Matches: [{
        ID: 'match', LeagueID: 'league', TournamentID: 'tournament', StageID: 'stage', StageName: 'Stage', StructuralID: 'structure',
        StartTime: '2026-07-21T00:00:00.000Z', State: 'unstarted',
        Destinations: { Win: { StructuralID: 'next', Type: 'decisionPoint', Slot: 1 } },
        MatchTeams: [{ TeamID: 'team', OriginStructuralID: 'origin', OriginType: 'standing', OriginSlot: 1, Result: '', GameWins: 0 }],
        Streams: [null],
      }],
    };

    expect(EsportsMatchesSchema.safeParse(response).success).toBe(true);
  });
});
