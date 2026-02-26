import { z } from 'zod';
import { playerUUIDSchema } from '../Shared/Common';

export const NameServiceItemSchema = z.object({
  DisplayName: z.string(),
  Subject: playerUUIDSchema,
  GameName: z.string(),
  TagLine: z.string(),
});
export type NameServiceItem = z.infer<typeof NameServiceItemSchema>;

export const NameServiceSchema = z.array(NameServiceItemSchema);

export type NameServiceResponse = z.infer<typeof NameServiceSchema>;
