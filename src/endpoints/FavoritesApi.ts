import type {
  FavoritesResponse,
  CreateFavoriteBody,
  CreateFavoriteResponse,
  ModifyFavoritesBody,
  ModifyFavoritesResponse,
  DeleteFavoriteResponse,
} from '../types/Favorites/Favorites';
import type { Region } from '../types/Shared/ValorantType';
import { IRiotClient } from '../types/Base/IRiotClient';
import { RequestOptions } from '../types/Base/RequestOptions';

export class FavoritesApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [Favorites_GetFavorites] Get player favorites
   */
  public async getFavorites(region: Region, userId: string, options?: RequestOptions) {
    return this.client.requestPD<FavoritesResponse>(
      region,
      `favorites/v1/players/${userId}/favorites`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  /**
   * [Favorites_CreateFavorite] Create a favorite
   */
  public async createFavorite(region: Region, userId: string, body: CreateFavoriteBody, options?: RequestOptions) {
    return this.client.requestPD<CreateFavoriteResponse>(
      region,
      `favorites/v1/players/${userId}/favorites`,
      {
        method: 'POST',
        data: body,
        signal: options?.signal,
      }
    );
  }

  /**
   * [Favorites_ModifyFavorites] Batch modify favorites
   */
  public async modifyFavorites(region: Region, userId: string, body: ModifyFavoritesBody, options?: RequestOptions) {
    return this.client.requestPD<ModifyFavoritesResponse>(
      region,
      `favorites/v1/players/${userId}/favorites-batch`,
      {
        method: 'POST',
        data: body,
        signal: options?.signal,
      }
    );
  }

  /**
   * [Favorites_DeleteFavorite] Delete a favorite
   */
  public async deleteFavorite(region: Region, userId: string, itemIdWithoutDashes: string, options?: RequestOptions) {
    return this.client.requestPD<DeleteFavoriteResponse>(
      region,
      `favorites/v1/players/${userId}/favorites/${itemIdWithoutDashes}`,
      {
        method: 'DELETE',
        signal: options?.signal,
      }
    );
  }
}
