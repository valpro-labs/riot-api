import { z } from 'zod';

export const RiotGeoSchema = z.object({
  token: z.string(),
  affinities: z.object({
    pbe: z.string(),
    live: z.string(),
  }),
});

export type RiotGeoResponse = z.input<typeof RiotGeoSchema>;
