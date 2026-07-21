import { z } from 'zod';
import { playerUUIDSchema } from '../Shared/Common';

export const PenaltyWarningEffectSchema = z.object({
  WarningType: z.string(),
  WarningTier: z.number(),
  ParentCentralRecordID: z.string(),
});
export type PenaltyWarningEffect = z.input<typeof PenaltyWarningEffectSchema>;

export const PenaltySchema = z.object({
  ID: z.string(),
  IssuingGameStartUnixMillis: z.number(),
  IssuingMatchID: z.string(),
  Expiry: z.string(),
  GamesRemaining: z.number(),
  ApplyToAllPlatforms: z.boolean(),
  ApplyToPlatforms: z.array(z.string()),
  ApplyToPlatformGroups: z.array(z.string()),
  InfractionID: z.string(),
  Origin: z.string(),
  ForgivenessIneligible: z.boolean(),
  IsAutomatedDetection: z.boolean(),
  PenaltyInfo: z.unknown().nullable().optional(),
  DelayedPenaltyEffect: z.unknown().nullable().optional(),
  GameBanEffect: z.unknown().nullable().optional(),
  QueueDelayEffect: z.unknown().nullable().optional(),
  QueueRestrictionEffect: z.unknown().nullable().optional(),
  RankedRatingPenaltyEffect: z.unknown().nullable().optional(),
  RiotRestrictionEffect: z.unknown().nullable().optional(),
  RMSNotifyEffect: z.unknown().nullable().optional(),
  WarningEffect: PenaltyWarningEffectSchema.nullable(),
  XPMultiplierEffect: z.unknown().nullable().optional(),
  PremierRestrictionEffect: z.unknown().nullable().optional(),
});
export type Penalty = z.input<typeof PenaltySchema>;

export const InfractionSchema = z.object({
  ID: z.string(),
  Name: z.string(),
  RatingName: z.string(),
});
export type Infraction = z.input<typeof InfractionSchema>;

export const PenaltiesSchema = z.object({
  Subject: playerUUIDSchema,
  Penalties: z.array(PenaltySchema),
  Infractions: z.array(InfractionSchema),
  Version: z.number(),
});
export type PenaltiesResponse = z.input<typeof PenaltiesSchema>;

export const PlayerInterventionSchema = z.object({
  InterventionName: z.string(),
  Expiry: z.string(),
  IssuingTime: z.string(),
  OriginInfraction: z.string(),
});
export type PlayerIntervention = z.input<typeof PlayerInterventionSchema>;

export const AppliedInfractionSchema = z.object({
  InfractionName: z.string(),
  Severity: z.string(),
  AppliedInterventions: z.array(PlayerInterventionSchema),
});
export type AppliedInfraction = z.input<typeof AppliedInfractionSchema>;

export const PlayerInterventionCategorySchema = z.object({
  BehaviorCategory: z.string(),
  BehaviorRatingName: z.string(),
  LastRatingReduction: z.string(),
  ActiveInterventions: z.array(PlayerInterventionSchema),
  NextInterventionNames: z.array(z.string()),
  AppliedInfractions: z.record(z.string(), AppliedInfractionSchema),
});
export type PlayerInterventionCategory = z.input<typeof PlayerInterventionCategorySchema>;

export const PlayerInterventionsSchema = z.object({
  Subject: playerUUIDSchema,
  InterventionsByCategory: z.array(PlayerInterventionCategorySchema),
});
export type PlayerInterventionsResponse = z.input<typeof PlayerInterventionsSchema>;

export const PlayerAvoidListSchema = z.object({
  Subject: playerUUIDSchema,
  AvoidList: z.array(z.unknown()),
});
export type PlayerAvoidListResponse = z.input<typeof PlayerAvoidListSchema>;
