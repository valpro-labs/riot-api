import { z } from 'zod';

export const EntitlementSchema = z.object({
  entitlements_token: z.string(),
});

export type EntitlementResponse = z.infer<typeof EntitlementSchema>;
