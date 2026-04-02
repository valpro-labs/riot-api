import type {
  FavoritesResponse,
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
   * [Favorites_DeleteFavorite] Delete a favorite
   */
  public async deleteFavorite(region: Region, userId: string, itemId: string, options?: RequestOptions) {
    return this.client.requestPD<DeleteFavoriteResponse>(
      region,
      `favorites/v1/players/${userId}/favorites/${itemId}`,
      {
        method: 'DELETE',
        signal: options?.signal,
      }
    );
  }
}
