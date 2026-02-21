import {
  VALORANT_ITEM_TYPES,
  CURRENCY_UUIDS,
  VALORANT_POINTS_UUID,
  RADIANITE_POINTS_UUID,
  KINGDOM_CREDITS_UUID,
  FREE_AGENTS_UUID
} from '../../src/interfaces/ValorantType';

describe('ValorantType Constants', () => {
  it('has correctly formatted UUID strings for VALORANT_ITEM_TYPES', () => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    expect(VALORANT_ITEM_TYPES.AGENT).toMatch(uuidRegex);
    expect(VALORANT_ITEM_TYPES.BUDDY).toMatch(uuidRegex);
    expect(VALORANT_ITEM_TYPES.SPARY).toMatch(uuidRegex);
    expect(VALORANT_ITEM_TYPES.CARD).toMatch(uuidRegex);
    expect(VALORANT_ITEM_TYPES.TITLE).toMatch(uuidRegex);
  });

  it('contains three currencies in CURRENCY_UUIDS', () => {
    expect(CURRENCY_UUIDS).toHaveLength(3);

    expect(CURRENCY_UUIDS).toContain(VALORANT_POINTS_UUID);
    expect(CURRENCY_UUIDS).toContain(RADIANITE_POINTS_UUID);
    expect(CURRENCY_UUIDS).toContain(KINGDOM_CREDITS_UUID);
  });

  it('has constant values that are not accidentally modified', () => {
    expect(VALORANT_POINTS_UUID).toBe('85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741');
    expect(RADIANITE_POINTS_UUID).toBe('e59aa87c-4cbf-517a-5983-6e81511be9b7');
    expect(KINGDOM_CREDITS_UUID).toBe('85ca954a-41f2-ce94-9b45-8ca3dd39a00d');
    expect(FREE_AGENTS_UUID).toBe('f08d4ae3-939c-4576-ab26-09ce1f23bb37');

    expect(VALORANT_ITEM_TYPES).toEqual({
      AGENT: '01bb38e1-da47-4e6a-9b3d-945fe4655707',
      BUDDY: 'dd3bf334-87f3-40bd-b043-682a57a8dc3a',
      SPARY: 'd5f120f8-ff8c-4aac-92ea-f2b5acbe9475',
      CARD: '3f296c07-64c3-494c-923b-fe692a4fa1bd',
      TITLE: 'de7caa6b-adf7-4588-bbd1-143831e786c6',
      SKIN_LEVEL: 'e7c63390-eda7-46e0-bb7a-a6abdacd2433',
      FLEX: '03a572de-4234-31ed-d344-ababa488f981',
    });
  });
});
