import { z } from 'zod';
import { currencyIDSchema } from '../Shared/Common';

export const WalletSchema = z.object({
  Balances: z.record(currencyIDSchema, z.number()),
});

export type WalletResponse = z.infer<typeof WalletSchema>;
