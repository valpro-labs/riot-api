import { z } from 'zod';

import { weakUUIDSchema, seasonIDSchema, dateSchema } from '../Shared/Common';

export const SeasonSchema = z.object({
  ID: seasonIDSchema,
  Name: z.string(),
  Type: z.enum(['episode', 'act']),
  StartTime: dateSchema,
  EndTime: dateSchema,
  IsActive: z.boolean(),
});
export type Season = z.input<typeof SeasonSchema>;

export const EventSchema = z.object({
  ID: weakUUIDSchema,
  Name: z.string(),
  StartTime: dateSchema,
  EndTime: dateSchema,
  IsActive: z.boolean(),
});
export type Event = z.input<typeof EventSchema>;

export const FetchContentSchema = z.object({
  DisabledIDs: z.array(z.unknown()),
  Seasons: z.array(SeasonSchema),
  Events: z.array(EventSchema),
});
export type FetchContentResponse = z.input<typeof FetchContentSchema>;
