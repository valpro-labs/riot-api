import { IRiotClient } from '../../src/types/Base/IRiotClient';
import { NewsFeedApi } from '../../src/endpoints/NewsFeedApi';

describe('NewsFeedApi', () => {
  let mockClient: jest.Mocked<IRiotClient>;
  let api: NewsFeedApi;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient = {
      request: jest.fn(),
      requestPD: jest.fn(),
      requestShared: jest.fn(),
      requestGLZ: jest.fn(),
      getAuthProvider: jest.fn(),
      getEntitlementToken: jest.fn(),
    };
    api = new NewsFeedApi(mockClient);
  });

  it('getNewsFeed uses default params when none provided', async () => {
    await api.getNewsFeed();
    expect(mockClient.request).toHaveBeenCalledWith(
      'https://content.publishing.riotgames.com/publishing-content/v2.0/public/channel/riot_games_mobile/list/riot_mobile_newsfeed',
      expect.objectContaining({
        method: 'GET',
        params: expect.objectContaining({
          products: 'valorant',
          categories: 'game_updates',
          tags: 'patch_notes',
          locale: 'en-us',
          from: 0,
          limit: 25,
        }),
        timeout: 15000,
      })
    );
  });

  it('getNewsFeed merges custom params with defaults', async () => {
    await api.getNewsFeed({ locale: 'zh-tw', limit: 10 });
    expect(mockClient.request).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          locale: 'zh-tw',
          limit: 10,
          products: 'valorant',
        }),
      })
    );
  });

  it('getNewsFeed uses custom channel and list in URL', async () => {
    await api.getNewsFeed({ channel: 'custom_channel', list: 'custom_list' });
    expect(mockClient.request).toHaveBeenCalledWith(
      'https://content.publishing.riotgames.com/publishing-content/v2.0/public/channel/custom_channel/list/custom_list',
      expect.any(Object)
    );
  });
});
