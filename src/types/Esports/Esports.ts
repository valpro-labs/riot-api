import { z } from 'zod';

export interface EsportsRequestParams {
  locale?: string;
  sport?: string;
}

export const UpcomingMatchesLeagueSchema = z.object({
  ID: z.string(),
  Name: z.string(),
  ImageURL: z.string(),
  TournamentIDs: z.array(z.string()),
  TeamIDs: z.array(z.string()).nullable(),
});
export type UpcomingMatchesLeague = z.input<typeof UpcomingMatchesLeagueSchema>;

export const UpcomingMatchesTournamentSchema = z.object({
  ID: z.string(),
  Name: z.string(),
  LeagueID: z.string(),
  LeagueName: z.string(),
  StartTime: z.string().datetime(),
  EndTime: z.string().datetime(),
  StageIDs: z.array(z.string()),
  TeamIDs: z.array(z.string()),
});
export type UpcomingMatchesTournament = z.input<typeof UpcomingMatchesTournamentSchema>;

export const EsportsTeamSchema = z.object({
  ID: z.string(),
  Name: z.string(),
  Code: z.string(),
  BaseImageURL: z.string(),
  HighResImageURL: z.string(),
  LowResImageURL: z.string(),
  HomeLeagueID: z.string(),
  TeamMemberIDs: z.array(z.string()).nullable(),
  BundleID: z.string(),
  BundleDataAssetID: z.string(),
  DataAssetID: z.string(),
});
export type EsportsTeam = z.input<typeof EsportsTeamSchema>;

export const UpcomingMatchesSchema = z.object({
  Leagues: z.array(UpcomingMatchesLeagueSchema),
  Tournaments: z.array(UpcomingMatchesTournamentSchema),
  Teams: z.array(EsportsTeamSchema),
  Seasons: z.null(),
  Splits: z.null(),
});
export type UpcomingMatchesResponse = z.input<typeof UpcomingMatchesSchema>;

export const EsportsMatchesBodySchema = z.object({
  MATCHIDS: z.array(z.string()),
});
export type EsportsMatchesBody = z.input<typeof EsportsMatchesBodySchema>;

export const EsportsMatchDestinationSchema = z.object({
  StructuralID: z.string(),
  Type: z.string(),
  Slot: z.number(),
});
export type EsportsMatchDestination = z.input<typeof EsportsMatchDestinationSchema>;

export const EsportsMatchTeamSchema = z.object({
  TeamID: z.string(),
  OriginStructuralID: z.string(),
  OriginType: z.string(),
  OriginSlot: z.number(),
  Result: z.string(),
  GameWins: z.number(),
});
export type EsportsMatchTeam = z.input<typeof EsportsMatchTeamSchema>;

export const EsportsMatchSchema = z.object({
  ID: z.string(),
  LeagueID: z.string(),
  TournamentID: z.string(),
  StageID: z.string(),
  StageName: z.string(),
  StructuralID: z.string(),
  StartTime: z.string().datetime(),
  State: z.string(),
  Destinations: z.record(z.string(), EsportsMatchDestinationSchema),
  MatchTeams: z.array(EsportsMatchTeamSchema),
  Streams: z.array(z.unknown()),
});
export type EsportsMatch = z.input<typeof EsportsMatchSchema>;

export const EsportsMatchesSchema = z.object({
  Matches: z.array(EsportsMatchSchema),
});
export type EsportsMatchesResponse = z.input<typeof EsportsMatchesSchema>;
