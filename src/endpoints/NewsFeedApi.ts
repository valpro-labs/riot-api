import { IRiotClient } from '../types/Base/IRiotClient';

import type { NewsFeedParams, NewsFeedResponse } from '../types/General/NewsFeed';


const BASE_URL =
  'https://content.publishing.riotgames.com/publishing-content/v2.0/public';

const DEFAULT_PARAMS: Required<NewsFeedParams> = {
  channel: 'riot_games_mobile',
  list: 'riot_mobile_newsfeed',
  products: 'valorant',
  categories: 'game_updates',
  tags: 'patch_notes',
  locale: 'en-us',
  from: 0,
  limit: 25,
};

export class NewsFeedApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * Fetch VALORANT news feed (patch notes, game updates, etc.)
   * from the Riot Games Publishing Content API.
   *
   * @see https://content.publishing.riotgames.com/publishing-content/v2.0/public/channel/{channel}/list/{list}
   */
  public async getNewsFeed(
    params?: NewsFeedParams
  ): Promise<NewsFeedResponse> {
    const merged = { ...DEFAULT_PARAMS, ...params };

    const url = `${BASE_URL}/channel/${merged.channel}/list/${merged.list}`;

    return this.client.request<NewsFeedResponse>(url, {
      method: 'GET',
      params: {
        products: merged.products,
        categories: merged.categories,
        tags: merged.tags,
        locale: merged.locale,
        from: merged.from,
        limit: merged.limit,
      },
      timeout: 15000,
    });
  }
}
