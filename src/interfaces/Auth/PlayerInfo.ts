import { z } from 'zod';
import { millisSchema } from '../Shared/Common';

const PlayerPasswordInfoSchema = z.object({
  cng_at: millisSchema,
  reset: z.boolean(),
  must_reset: z.boolean(),
});

const PlayerAccountInfoSchema = z.object({
  type: z.number(),
  state: z.string(),
  adm: z.boolean(),
  game_name: z.string(),
  tag_line: z.string(),
  created_at: millisSchema,
});

export const PlayerInfoSchema = z.object({
  country: z.string(),
  sub: z.string(),
  email_verified: z.boolean(),
  player_plocale: z.unknown().nullable(),
  country_at: millisSchema.nullable(),
  pw: PlayerPasswordInfoSchema,
  phone_number_verified: z.boolean(),
  account_verified: z.boolean(),
  ppid: z.unknown().nullable(),
  federated_identity_providers: z.array(z.string()),
  player_locale: z.string().nullable(),
  acct: PlayerAccountInfoSchema,
  age: z.number(),
  jti: z.string(),
  affinity: z.record(z.string(), z.string()),
});


export type PlayerInfoResponse = z.input<typeof PlayerInfoSchema>;
