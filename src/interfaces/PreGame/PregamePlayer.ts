import { z } from 'zod';
import { playerUUIDSchema, pregameIDSchema } from '../Shared/Common';

export const PregamePlayerSchema = z.object({
  Subject: playerUUIDSchema,
  MatchID: pregameIDSchema,
  Version: z.number(),
});

export type PregamePlayerResponse = z.infer<typeof PregamePlayerSchema>;
