import { z } from 'zod';
import {
  playerUUIDSchema,
  partyIDSchema,
  cardIDSchema,
  titleIDSchema,
  preferredLevelBorderIDSchema,
  queueIDSchema,
  gameModeSchema,
  mapIDSchema,
} from '../Shared/Common';

export const PartyMemberIdentitySchema = z.object({
  Subject: playerUUIDSchema,
  PlayerCardID: cardIDSchema,
  PlayerTitleID: titleIDSchema,
  AccountLevel: z.number(),
  PreferredLevelBorderID: preferredLevelBorderIDSchema,
  Incognito: z.boolean(),
  HideAccountLevel: z.boolean(),
});
export type PartyMemberIdentity = z.input<typeof PartyMemberIdentitySchema>;

export const PartyPingSchema = z.object({
  Ping: z.number(),
  GamePodID: z.string(),
});
export type PartyPing = z.input<typeof PartyPingSchema>;

export const PartyMemberSchema = z.object({
  Subject: playerUUIDSchema,
  CompetitiveTier: z.number(),
  PlayerIdentity: PartyMemberIdentitySchema,
  SeasonalBadgeInfo: z.null(),
  IsOwner: z.boolean().optional(),
  QueueEligibleRemainingAccountLevels: z.number(),
  Pings: z.array(PartyPingSchema),
  IsReady: z.boolean(),
  IsModerator: z.boolean(),
  UseBroadcastHUD: z.boolean(),
  PlatformType: z.literal('PC'),
});
export type PartyMember = z.input<typeof PartyMemberSchema>;

export const PartyMembershipItemSchema = z.object({
  Subject: playerUUIDSchema,
});
export type PartyMembershipItem = z.input<typeof PartyMembershipItemSchema>;

export const PartyCustomGameRulesSchema = z.object({
  AllowGameModifiers: z.string().optional(),
  IsOvertimeWinByTwo: z.string().optional(),
  PlayOutAllRounds: z.string().optional(),
  SkipMatchHistory: z.string().optional(),
  TournamentMode: z.string().optional(),
});
export type PartyCustomGameRules = z.input<typeof PartyCustomGameRulesSchema>;

export const PartyCustomGameSettingsSchema = z.object({
  Map: mapIDSchema,
  Mode: gameModeSchema,
  UseBots: z.boolean(),
  GamePod: z.string(),
  GameRules: PartyCustomGameRulesSchema.nullable(),
});
export type PartyCustomGameSettings = z.input<typeof PartyCustomGameSettingsSchema>;

export const PartyMembershipSchema = z.object({
  teamOne: z.array(PartyMembershipItemSchema).nullable(),
  teamTwo: z.array(PartyMembershipItemSchema).nullable(),
  teamSpectate: z.array(PartyMembershipItemSchema).nullable(),
  teamOneCoaches: z.array(PartyMembershipItemSchema).nullable(),
  teamTwoCoaches: z.array(PartyMembershipItemSchema).nullable(),
});
export type PartyMembership = z.input<typeof PartyMembershipSchema>;

export const PartyCustomGameDataSchema = z.object({
  Settings: PartyCustomGameSettingsSchema,
  Membership: PartyMembershipSchema,
  MaxPartySize: z.number(),
  AutobalanceEnabled: z.boolean(),
  AutobalanceMinPlayers: z.number(),
  HasRecoveryData: z.boolean(),
});
export type PartyCustomGameData = z.input<typeof PartyCustomGameDataSchema>;

export const PartyMatchmakingDataSchema = z.object({
  QueueID: queueIDSchema,
  PreferredGamePods: z.array(z.string()),
  SkillDisparityRRPenalty: z.number(),
});
export type PartyMatchmakingData = z.input<typeof PartyMatchmakingDataSchema>;

export const PartyErroredPlayerSchema = z.object({
  Subject: playerUUIDSchema,
});
export type PartyErroredPlayer = z.input<typeof PartyErroredPlayerSchema>;

export const PartyErrorNotificationSchema = z.object({
  ErrorType: z.string(),
  ErroredPlayers: z.array(PartyErroredPlayerSchema).nullable(),
});
export type PartyErrorNotification = z.input<typeof PartyErrorNotificationSchema>;

export const PartyCheatDataSchema = z.object({
  GamePodOverride: z.string(),
  ForcePostGameProcessing: z.boolean(),
});
export type PartyCheatData = z.input<typeof PartyCheatDataSchema>;

export const PartySchema = z.object({
  ID: partyIDSchema,
  MUCName: z.string(),
  VoiceRoomID: z.string(),
  Version: z.number(),
  ClientVersion: z.string(),
  Members: z.array(PartyMemberSchema),
  State: z.string(),
  PreviousState: z.string(),
  StateTransitionReason: z.string(),
  Accessibility: z.enum(['OPEN', 'CLOSED']),
  CustomGameData: PartyCustomGameDataSchema,
  MatchmakingData: PartyMatchmakingDataSchema,
  Invites: z.null(),
  Requests: z.array(z.unknown()),
  QueueEntryTime: z.string().describe('Date in ISO 8601 format'),
  ErrorNotification: PartyErrorNotificationSchema,
  RestrictedSeconds: z.number(),
  EligibleQueues: z.array(z.string()),
  QueueIneligibilities: z.array(z.string()),
  CheatData: PartyCheatDataSchema,
  XPBonuses: z.array(z.unknown()),
  InviteCode: z.string().describe('Empty string when there is no invite code'),
});
export type PartyResponse = z.input<typeof PartySchema>;
