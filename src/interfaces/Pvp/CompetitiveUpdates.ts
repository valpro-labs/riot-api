import { z } from 'zod';
import { playerUUIDSchema, mapIDSchema, seasonIDSchema, millisSchema } from '../Shared/Common';

export const CompetitiveUpdatesSchema = z.object({
  Version: z.number(),
  Subject: playerUUIDSchema,
  Matches: z.array(z.object({
    MatchID: z.string(),
    MapID: mapIDSchema,
    SeasonID: seasonIDSchema,
    MatchStartTime: millisSchema,
    TierAfterUpdate: z.number(),
    TierBeforeUpdate: z.number(),
    RankedRatingAfterUpdate: z.number(),
    RankedRatingBeforeUpdate: z.number(),
    RankedRatingEarned: z.number(),
    RankedRatingPerformanceBonus: z.number(),
    CompetitiveMovement: z.literal('MOVEMENT_UNKNOWN'),
    AFKPenalty: z.number(),
  })),
});

export type CompetitiveUpdatesResponse = z.input<typeof CompetitiveUpdatesSchema>;
