import { z } from 'zod';
import { playerUUIDSchema } from '../Shared/Common';

export const NameServiceSchema = z.array(z.object({
  DisplayName: z.string(),
  Subject: playerUUIDSchema,
  GameName: z.string(),
  TagLine: z.string(),
}));

export type NameServiceResponse = z.infer<typeof NameServiceSchema>;
