import { z } from 'zod';
import { playerUUIDSchema, matchIDSchema, mapIDSchema, queueIDSchema, seasonIDSchema, millisSchema } from '../Shared/Common';

export const CompetitiveMatchUpdateSchema = z.object({
  MatchID: matchIDSchema,
  MapID: mapIDSchema,
  QueueID: queueIDSchema,
  SeasonID: seasonIDSchema,
  MatchStartTime: millisSchema,
  TierAfterUpdate: z.number(),
  TierBeforeUpdate: z.number(),
  RankedRatingAfterUpdate: z.number(),
  RankedRatingBeforeUpdate: z.number(),
  RankedRatingEarned: z.number(),
  RankedRatingPerformanceBonus: z.number(),
  RankedRatingRefundApplied: z.number(),
  NewMapIncentiveRRForgiven: z.number(),
  CompetitiveMovement: z.literal('MOVEMENT_UNKNOWN'),
  AFKPenalty: z.number(),
  WasDerankProtected: z.boolean(),
  WasDerankProtectionReplenished: z.boolean(),
});
export type CompetitiveMatchUpdate = z.input<typeof CompetitiveMatchUpdateSchema>;

export const CompetitiveUpdatesSchema = z.object({
  Version: z.number(),
  Subject: playerUUIDSchema,
  Matches: z.array(CompetitiveMatchUpdateSchema),
});

export type CompetitiveUpdatesResponse = z.input<typeof CompetitiveUpdatesSchema>;
