import { z } from 'zod';
import { itemIDSchema, weakUUIDSchema } from '../Shared/Common';

export const OwnedEntitlementSchema = z.object({
  TypeID: weakUUIDSchema,
  ItemID: itemIDSchema,
  Tiers: z.string().optional(),
});
export type OwnedEntitlement = z.input<typeof OwnedEntitlementSchema>;


export const OwnedItemsSchema = z.object({
  Entitlements: z.array(OwnedEntitlementSchema),

});
export type OwnedItemsResponse = z.input<typeof OwnedItemsSchema>;
