import { z } from 'zod';
import { playerUUIDSchema, matchIDSchema } from '../Shared/Common';

export const CurrentGamePlayerSchema = z.object({
  Subject: playerUUIDSchema,
  MatchID: matchIDSchema,
  Version: z.number(),
});

export type CurrentGamePlayerResponse = z.input<typeof CurrentGamePlayerSchema>;
