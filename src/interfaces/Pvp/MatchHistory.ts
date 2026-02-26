import { z } from 'zod';
import { playerUUIDSchema, matchIDSchema, millisSchema, queueIDSchema } from '../Shared/Common';

export const MatchHistorySchema = z.object({
  Subject: playerUUIDSchema,
  BeginIndex: z.number(),
  EndIndex: z.number(),
  Total: z.number(),
  History: z.array(z.object({
    MatchID: matchIDSchema,
    GameStartTime: millisSchema,
    QueueID: queueIDSchema,
  })),
});

export type MatchHistoryResponse = z.input<typeof MatchHistorySchema>;
