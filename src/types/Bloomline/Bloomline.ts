import { z } from 'zod';

export const BloomlineFlourishSchema = z.object({
  FlourishID: z.string().optional(),
  ShortLevel: z.number().optional(),
  PreviousShortLevel: z.number().optional(),
  LongLevel: z.number().optional(),
  Points: z.number().optional(),
  PointsVersion: z.number().optional(),
});
export type BloomlineFlourish = z.input<typeof BloomlineFlourishSchema>;

export const BloomlineNumberModuleSchema = z.object({
  ModuleID: z.string().optional(),
  NumberID: z.string(),
  Value: z.number(),
});
export type BloomlineNumberModule = z.input<typeof BloomlineNumberModuleSchema>;

export const BloomlineTrackProgressSchema = z.object({
  TrackID: z.string(),
  TrackLevel: z.number().optional(),
});
export type BloomlineTrackProgress = z.input<typeof BloomlineTrackProgressSchema>;

export const BloomlineBonsaiSchema = z.object({
  BonsaiID: z.string(),
  HypeID: z.string().optional(),
  BackgroundID: z.string().optional(),
  ClipID: z.string().optional(),
  BorderID: z.string().optional(),
  Flourish: BloomlineFlourishSchema,
  NumberModules: z.array(BloomlineNumberModuleSchema).optional(),
  TrackProgressList: z.array(BloomlineTrackProgressSchema).optional(),
});
export type BloomlineBonsai = z.input<typeof BloomlineBonsaiSchema>;

export const BloomlinePlayerResponseSchema = z.object({
  Subject: z.string(),
  Bonsais: z.array(BloomlineBonsaiSchema),
  LongGroupVersion: z.number().optional(),
});
export type BloomlinePlayerResponse = z.input<typeof BloomlinePlayerResponseSchema>;

export const UpdateBloomlinePlayerBonsaiBodySchema = z.object({
  bonsaiId: z.string(),
  hypeId: z.string(),
  backgroundId: z.string(),
  clipId: z.string(),
  borderId: z.string(),
  moduleUpdates: z.array(z.object({
    iD: z.string(),
    type: z.string(),
    item: z.string(),
  })),
});
export type UpdateBloomlinePlayerBonsaiBody = z.input<typeof UpdateBloomlinePlayerBonsaiBodySchema>;

export const BloomlineValidQueuesResponseSchema = z.object({
  ProcessedQueues: z.array(z.string()),
  PerformanceScoreQueues: z.array(z.string()),
});
export type BloomlineValidQueuesResponse = z.input<typeof BloomlineValidQueuesResponseSchema>;
