import { z } from 'zod';
import { playerUUIDSchema, dateSchema } from '../Shared/Common';

export const AccountXPProgressSchema = z.object({
  Level: z.number(),
  XP: z.number(),
});
export type AccountXPProgress = z.infer<typeof AccountXPProgressSchema>;

export const XPSourceSchema = z.object({
  ID: z.enum(['time-played', 'match-win', 'first-win-of-the-day']),
  Amount: z.number(),
});
export type XPSource = z.infer<typeof XPSourceSchema>;

export const AccountXPHistoryEntrySchema = z.object({
  ID: z.string().describe('Match ID'),
  MatchStart: dateSchema,
  StartProgress: AccountXPProgressSchema,
  EndProgress: AccountXPProgressSchema,
  XPDelta: z.number(),
  XPSources: z.array(XPSourceSchema),
  XPMultipliers: z.array(z.unknown()),
});
export type AccountXPHistoryEntry = z.infer<typeof AccountXPHistoryEntrySchema>;

export const AccountXPSchema = z.object({
  Version: z.number(),
  Subject: playerUUIDSchema,
  Progress: AccountXPProgressSchema,
  History: z.array(AccountXPHistoryEntrySchema),
  LastTimeGrantedFirstWin: dateSchema,
  NextTimeFirstWinAvailable: dateSchema,
});



export type AccountXPResponse = z.input<typeof AccountXPSchema>;
