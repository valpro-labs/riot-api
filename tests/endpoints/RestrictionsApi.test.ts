import { RestrictionsApi } from '../../src/endpoints/RestrictionsApi';
import { IRiotClient } from '../../src/types/Base/IRiotClient';

describe('RestrictionsApi', () => {
  let mockClient: jest.Mocked<IRiotClient>;
  let api: RestrictionsApi;

  beforeEach(() => {
    mockClient = {
      request: jest.fn(),
      requestPD: jest.fn(),
      requestShared: jest.fn(),
      requestGLZ: jest.fn(),
      getAuthProvider: jest.fn(),
      getEntitlementToken: jest.fn(),
    };
    api = new RestrictionsApi(mockClient);
  });

  it.each([
    ['getPenalties', 'restrictions/v3/penalties'],
    ['getPlayerInterventions', 'restrictions/v1/activeFutureInterventions'],
    ['getPlayerAvoidList', 'restrictions/v1/avoidList'],
  ] as const)('%s requests the expected resource', async (method, resource) => {
    await api[method]('na');

    expect(mockClient.requestPD).toHaveBeenCalledWith('na', resource, {
      method: 'GET',
      signal: undefined,
    });
  });
});
