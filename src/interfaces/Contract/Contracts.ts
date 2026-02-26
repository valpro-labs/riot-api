import { z } from 'zod';
import { weakUUIDSchema, millisSchema, dateSchema } from '../Shared/Common';


export const HighestRewardedLevelEntrySchema = z.object({
  Amount: z.number(),
  Version: z.number(),
});
export type HighestRewardedLevelEntry = z.infer<typeof HighestRewardedLevelEntrySchema>;

export const ContractProgressionSchema = z.object({
  TotalProgressionEarned: z.number(),
  TotalProgressionEarnedVersion: z.number(),
  HighestRewardedLevel: z.record(z.string(), HighestRewardedLevelEntrySchema),
});
export type ContractProgression = z.infer<typeof ContractProgressionSchema>;

export const ContractSchema = z.object({
  ContractDefinitionID: weakUUIDSchema,
  ContractProgression: ContractProgressionSchema,
  ProgressionLevelReached: z.number(),
  ProgressionTowardsNextLevel: z.number(),
});
export type Contract = z.input<typeof ContractSchema>;

export const XPGrantModifierEntrySchema = z.object({
  Value: z.number(),
  Name: z.enum(['RESTRICTIONS_XP', 'PREMIUM_CONTRACT_XP']),
  BaseOnly: z.boolean(),
});
export type XPGrantModifierEntry = z.infer<typeof XPGrantModifierEntrySchema>;

export const XPGrantModifierSchema = z.object({
  Value: z.number(),
  BaseMultiplierValue: z.number(),
  Modifiers: z.array(XPGrantModifierEntrySchema),
});
export type XPGrantModifier = z.infer<typeof XPGrantModifierSchema>;

export const XPGrantsSchema = z.object({
  GamePlayed: z.number(),
  GameWon: z.number(),
  RoundPlayed: z.number(),
  RoundWon: z.number(),
  Missions: z.object({}),
  Modifier: XPGrantModifierSchema,
  NumAFKRounds: z.number(),
});
export type XPGrants = z.infer<typeof XPGrantsSchema>;

export const MissionDeltaObjectiveSchema = z.object({
  ID: weakUUIDSchema,
  ProgressBefore: z.number(),
  ProgressAfter: z.number(),
});
export type MissionDeltaObjective = z.infer<typeof MissionDeltaObjectiveSchema>;

export const MissionDeltaSchema = z.object({
  ID: weakUUIDSchema,
  Objectives: z.record(weakUUIDSchema, z.number()),
  ObjectiveDeltas: z.record(weakUUIDSchema, MissionDeltaObjectiveSchema),
});
export type MissionDelta = z.infer<typeof MissionDeltaSchema>;

export const ContractDeltaSchema = z.object({
  ID: weakUUIDSchema,
  TotalXPBefore: z.number(),
  TotalXPAfter: z.number(),
});
export type ContractDelta = z.infer<typeof ContractDeltaSchema>;

export const ProcessedMatchSchema = z.object({
  ID: weakUUIDSchema.describe('Match ID'),
  StartTime: millisSchema,
  XPGrants: XPGrantsSchema.nullable(),
  RewardGrants: z.object({}).nullable(),
  MissionDeltas: z.record(weakUUIDSchema, MissionDeltaSchema).nullable(),
  ContractDeltas: z.record(weakUUIDSchema, ContractDeltaSchema).nullable(),
  CouldProgressMissions: z.boolean(),
});
export type ProcessedMatch = z.infer<typeof ProcessedMatchSchema>;

export const MissionSchema = z.object({
  ID: weakUUIDSchema,
  Objectives: z.record(weakUUIDSchema, z.number()),
  Complete: z.boolean(),
  ExpirationTime: dateSchema,
});
export type Mission = z.input<typeof MissionSchema>;

export const MissionMetadataSchema = z.object({
  NPECompleted: z.boolean(),
  WeeklyCheckpoint: dateSchema,
  WeeklyRefillTime: dateSchema,
});
export type MissionMetadata = z.infer<typeof MissionMetadataSchema>;

export const ContractsSchema = z.object({
  Version: z.number(),
  Subject: weakUUIDSchema.describe('Player UUID'),
  Contracts: z.array(ContractSchema),
  ProcessedMatches: z.array(ProcessedMatchSchema),
  ActiveSpecialContract: weakUUIDSchema,
  Missions: z.array(MissionSchema),
  MissionMetadata: MissionMetadataSchema,
});

export type ContractsResponse = z.input<typeof ContractsSchema>;


