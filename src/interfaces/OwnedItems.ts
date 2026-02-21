import { z } from 'zod';

const EntitlementSchema = z.object({
  TypeID: z.string(),
  ItemID: z.string(),
  Tiers: z.string().optional(),
});

const OwnedItemsSchema = z.object({
  Entitlements: z.array(EntitlementSchema),
});

export type OwnedItemsResponse = z.infer<typeof OwnedItemsSchema>;
