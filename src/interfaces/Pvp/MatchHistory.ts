import { z } from 'zod';
import { playerUUIDSchema, matchIDSchema, millisSchema, queueIDSchema } from '../Shared/Common';

export const MatchHistoryItemSchema = z.object({
  MatchID: matchIDSchema,
  GameStartTime: millisSchema,
  QueueID: queueIDSchema,
});
export type MatchHistoryItem = z.infer<typeof MatchHistoryItemSchema>;

export const MatchHistorySchema = z.object({
  Subject: playerUUIDSchema,
  BeginIndex: z.number(),
  EndIndex: z.number(),
  Total: z.number(),
  History: z.array(MatchHistoryItemSchema),
});

export type MatchHistoryResponse = z.input<typeof MatchHistorySchema>;
