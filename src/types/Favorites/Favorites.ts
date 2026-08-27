import { z } from 'zod';
import { weakUUIDSchema } from '../Shared/Common';

export const FavoriteItemSchema = z.object({
  FavoriteID: weakUUIDSchema,
  ItemID: weakUUIDSchema,
});
export type FavoriteItem = z.input<typeof FavoriteItemSchema>;

export const FavoritesResponseSchema = z.object({
  Subject: weakUUIDSchema,
  FavoritedContent: z.record(z.string(), FavoriteItemSchema),
});
export type FavoritesResponse = z.input<typeof FavoritesResponseSchema>;

export const DeleteFavoriteResponseSchema = FavoritesResponseSchema;
export type DeleteFavoriteResponse = z.input<typeof DeleteFavoriteResponseSchema>;
