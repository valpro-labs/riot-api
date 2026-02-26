import { z } from 'zod';
import {
  playerUUIDSchema,
  pregameIDSchema,
  characterIDSchema,
  cardIDSchema,
  titleIDSchema,
  preferredLevelBorderIDSchema,
  seasonIDSchema,
  mapIDSchema,
  queueIDSchema,
  gameModeSchema,
  dateSchema
} from '../Shared/Common';

export const PlayerIdentitySchema = z.object({
  Subject: playerUUIDSchema,
  PlayerCardID: cardIDSchema,
  PlayerTitleID: titleIDSchema,
  AccountLevel: z.number(),
  PreferredLevelBorderID: preferredLevelBorderIDSchema,
  Incognito: z.boolean(),
  HideAccountLevel: z.boolean(),
});
export type PlayerIdentity = z.input<typeof PlayerIdentitySchema>;

export const SeasonalBadgeInfoSchema = z.object({
  SeasonID: seasonIDSchema.or(z.literal('')),
  NumberOfWins: z.number(),
  WinsByTier: z.null(),
  Rank: z.number(),
  LeaderboardRank: z.number(),
});
export type SeasonalBadgeInfo = z.input<typeof SeasonalBadgeInfoSchema>;

export const PregamePlayerEntrySchema = z.object({
  Subject: playerUUIDSchema,
  CharacterID: characterIDSchema,
  CharacterSelectionState: z.enum(['', 'selected', 'locked']),
  PregamePlayerState: z.enum(['joined']),
  CompetitiveTier: z.number(),
  PlayerIdentity: PlayerIdentitySchema,
  SeasonalBadgeInfo: SeasonalBadgeInfoSchema,
  IsCaptain: z.boolean(),
});
export type PregamePlayerEntry = z.input<typeof PregamePlayerEntrySchema>;

export const PregameTeamSchema = z.object({
  TeamID: z.enum(['Blue', 'Red']).or(playerUUIDSchema),
  Players: z.array(PregamePlayerEntrySchema),
});
export type PregameTeam = z.input<typeof PregameTeamSchema>;

export const PregameMatchRosterMetadataSchema = z.null();
export type PregameMatchRosterMetadata = z.input<typeof PregameMatchRosterMetadataSchema>;

export const PregameMatchTournamentMetadataSchema = z.null();
export type PregameMatchTournamentMetadata = z.input<typeof PregameMatchTournamentMetadataSchema>;

export const PregameMatchSchema = z.object({
  ID: pregameIDSchema,
  Version: z.number(),
  Teams: z.array(PregameTeamSchema),
  AllyTeam: PregameTeamSchema.nullable(),
  EnemyTeam: PregameTeamSchema.nullable(),
  ObserverSubjects: z.array(z.unknown()),
  MatchCoaches: z.array(z.unknown()),
  EnemyTeamSize: z.number(),
  EnemyTeamLockCount: z.number(),
  PregameState: z.enum(['character_select_active', 'provisioned']),
  LastUpdated: dateSchema,
  MapID: mapIDSchema,
  MapSelectPool: z.array(z.unknown()),
  BannedMapIDs: z.array(z.unknown()),
  CastedVotes: z.unknown(),
  MapSelectSteps: z.array(z.unknown()),
  MapSelectStep: z.number(),
  Team1: z.enum(['Blue', 'Red']).or(playerUUIDSchema),
  GamePodID: z.string(),
  Mode: gameModeSchema,
  VoiceSessionID: z.string(),
  MUCName: z.string(),
  TeamMatchToken: z.string(),
  QueueID: queueIDSchema.or(z.literal('')),
  ProvisioningFlowID: z.enum(['Matchmaking', 'CustomGame']),
  IsRanked: z.boolean(),
  PhaseTimeRemainingNS: z.number(),
  StepTimeRemainingNS: z.number(),
  altModesFlagADA: z.boolean(),
  TournamentMetadata: PregameMatchTournamentMetadataSchema,
  RosterMetadata: PregameMatchRosterMetadataSchema,
});



export type PregameMatchResponse = z.input<typeof PregameMatchSchema>;
