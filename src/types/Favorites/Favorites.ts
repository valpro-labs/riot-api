import { z } from 'zod';
import { weakUUIDSchema } from '../Shared/Common';

export const FavoriteItemSchema = z.object({
  FavoriteID: weakUUIDSchema,
  ItemID: weakUUIDSchema,
  ItemTypeID: weakUUIDSchema,
});
export type FavoriteItem = z.input<typeof FavoriteItemSchema>;

export const FavoritesResponseSchema = z.object({
  FavoritedContent: z.record(z.string(), z.array(FavoriteItemSchema)),
});
export type FavoritesResponse = z.input<typeof FavoritesResponseSchema>;

export const CreateFavoriteBodySchema = z.object({
  ItemID: weakUUIDSchema,
  ItemTypeID: weakUUIDSchema,
});
export type CreateFavoriteBody = z.input<typeof CreateFavoriteBodySchema>;

export const CreateFavoriteResponseSchema = FavoriteItemSchema;
export type CreateFavoriteResponse = z.input<typeof CreateFavoriteResponseSchema>;

export const ModifyFavoritesBodySchema = z.object({
  Favorites: z.array(FavoriteItemSchema),
});
export type ModifyFavoritesBody = z.input<typeof ModifyFavoritesBodySchema>;

export const ModifyFavoritesResponseSchema = FavoritesResponseSchema;
export type ModifyFavoritesResponse = z.input<typeof ModifyFavoritesResponseSchema>;

export const DeleteFavoriteResponseSchema = FavoriteItemSchema;
export type DeleteFavoriteResponse = z.input<typeof DeleteFavoriteResponseSchema>;
