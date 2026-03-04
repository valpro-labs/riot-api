import { z } from 'zod';
import {
  playerUUIDSchema,
  matchIDSchema,
  mapIDSchema,
  characterIDSchema,
  cardIDSchema,
  titleIDSchema,
  preferredLevelBorderIDSchema,
  seasonIDSchema,
} from '../Shared/Common';

export const CurrentGameConnectionDetailsSchema = z.object({
  GameServerHosts: z.array(z.string()),
  GameServerHost: z.string(),
  GameServerPort: z.number(),
  GameServerObfuscatedIP: z.number(),
  GameClientHash: z.number(),
  PlayerKey: z.string(),
});
export type CurrentGameConnectionDetails = z.input<typeof CurrentGameConnectionDetailsSchema>;

export const CurrentGamePlayerIdentitySchema = z.object({
  Subject: playerUUIDSchema,
  PlayerCardID: cardIDSchema,
  PlayerTitleID: titleIDSchema,
  AccountLevel: z.number(),
  PreferredLevelBorderID: preferredLevelBorderIDSchema,
  Incognito: z.boolean(),
  HideAccountLevel: z.boolean(),
});
export type CurrentGamePlayerIdentity = z.input<typeof CurrentGamePlayerIdentitySchema>;

export const CurrentGameSeasonalBadgeInfoSchema = z.object({
  SeasonID: seasonIDSchema.or(z.literal('')),
  NumberOfWins: z.number(),
  WinsByTier: z.null(),
  Rank: z.number(),
  LeaderboardRank: z.number(),
});
export type CurrentGameSeasonalBadgeInfo = z.input<typeof CurrentGameSeasonalBadgeInfoSchema>;

export const CurrentGameMatchPlayerSchema = z.object({
  Subject: playerUUIDSchema,
  TeamID: z.string().describe('Team ID'),
  CharacterID: characterIDSchema,
  PlayerIdentity: CurrentGamePlayerIdentitySchema,
  SeasonalBadgeInfo: CurrentGameSeasonalBadgeInfoSchema,
  IsCoach: z.boolean(),
  IsAssociated: z.boolean(),
});
export type CurrentGameMatchPlayer = z.input<typeof CurrentGameMatchPlayerSchema>;

export const CurrentGameMatchSchema = z.object({
  MatchID: matchIDSchema,
  Version: z.number(),
  State: z.literal('IN_PROGRESS'),
  MapID: mapIDSchema,
  ModeID: z.string().describe('Game Mode'),
  ProvisioningFlow: z.enum(['Matchmaking', 'CustomGame']),
  GamePodID: z.string(),
  AllMUCName: z.string(),
  TeamMUCName: z.string(),
  TeamVoiceID: z.string(),
  TeamMatchToken: z.string(),
  IsReconnectable: z.boolean(),
  ConnectionDetails: CurrentGameConnectionDetailsSchema,
  PostGameDetails: z.null(),
  Players: z.array(CurrentGameMatchPlayerSchema),
  MatchmakingData: z.null(),
});
export type CurrentGameMatchResponse = z.input<typeof CurrentGameMatchSchema>;
