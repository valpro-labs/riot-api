import { FavoritesApi } from '../../src/endpoints/FavoritesApi';
import { IRiotClient } from '../../src/types/Base/IRiotClient';

describe('FavoritesApi', () => {
  let mockClient: jest.Mocked<IRiotClient>;
  let api: FavoritesApi;

  beforeEach(() => {
    mockClient = {
      request: jest.fn(),
      requestPD: jest.fn(),
      requestShared: jest.fn(),
      requestGLZ: jest.fn(),
      getAuthProvider: jest.fn(),
      getEntitlementToken: jest.fn(),
    };
    api = new FavoritesApi(mockClient);
  });

  it('deleteFavorite requests the item resource with DELETE', async () => {
    const signal = new AbortController().signal;
    const response = {
      Subject: '039acf5e-7805-56f4-afa7-3d63486d228a',
      FavoritedContent: {},
    };
    mockClient.requestPD.mockResolvedValue(response);

    const result = await api.deleteFavorite(
      'ap',
      '039acf5e-7805-56f4-afa7-3d63486d228a',
      '23193fee42c2e7e49e7660a2aee12057',
      { signal },
    );

    expect(mockClient.requestPD).toHaveBeenCalledWith(
      'ap',
      'favorites/v1/players/039acf5e-7805-56f4-afa7-3d63486d228a/favorites/23193fee42c2e7e49e7660a2aee12057',
      {
        method: 'DELETE',
        signal,
      },
    );
    expect(result).toEqual(response);
    expect(result.Subject).toBe(response.Subject);
    expect(result.FavoritedContent).toEqual(response.FavoritedContent);
  });

  it('addFavorite posts the item ID to the favorites resource', async () => {
    const signal = new AbortController().signal;
    const response = {
      Subject: '039acf5e-7805-56f4-afa7-3d63486d228a',
      FavoritedContent: {
        '88f1bcbd-4dfd-f2ef-8a2c-44b3baa26b3c': {
          FavoriteID: '23193fee-42c2-e7e4-9e76-60a2aee12057',
          ItemID: '88f1bcbd-4dfd-f2ef-8a2c-44b3baa26b3c',
        },
      },
    };
    mockClient.requestPD.mockResolvedValue(response);

    const result = await api.addFavorite(
      'ap',
      '039acf5e-7805-56f4-afa7-3d63486d228a',
      '88f1bcbd-4dfd-f2ef-8a2c-44b3baa26b3c',
      { signal },
    );

    expect(mockClient.requestPD).toHaveBeenCalledWith(
      'ap',
      'favorites/v1/players/039acf5e-7805-56f4-afa7-3d63486d228a/favorites',
      {
        method: 'POST',
        data: { ItemID: '88f1bcbd-4dfd-f2ef-8a2c-44b3baa26b3c' },
        signal,
      },
    );
    expect(result.Subject).toBe(response.Subject);
    expect(result.FavoritedContent).toEqual(response.FavoritedContent);
  });
});
