import {
  ITEM_TYPES,
  CURRENCY_TYPES,
} from '../../src/types/ValorantType';

describe('ValorantType Constants', () => {
  it('has correctly formatted UUID strings for ITEM_TYPES', () => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    expect(ITEM_TYPES.AGENT).toMatch(uuidRegex);
    expect(ITEM_TYPES.GUN_BUDDY).toMatch(uuidRegex);
    expect(ITEM_TYPES.SPARY).toMatch(uuidRegex);
    expect(ITEM_TYPES.CARD).toMatch(uuidRegex);
    expect(ITEM_TYPES.TITLE).toMatch(uuidRegex);
    expect(ITEM_TYPES.CONTRACT).toMatch(uuidRegex);
    expect(ITEM_TYPES.SKIN).toMatch(uuidRegex);
    expect(ITEM_TYPES.SKIN_VARIANT).toMatch(uuidRegex);
  });

  it('has correctly formatted UUID strings for CURRENCY_TYPES', () => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    expect(CURRENCY_TYPES.VALORANT_POINTS).toMatch(uuidRegex);
    expect(CURRENCY_TYPES.RADIANITE_POINTS).toMatch(uuidRegex);
    expect(CURRENCY_TYPES.KINGDOM_CREDITS).toMatch(uuidRegex);
    expect(CURRENCY_TYPES.FREE_AGENTS).toMatch(uuidRegex);
  });

  it('has constant values that are not accidentally modified', () => {
    expect(CURRENCY_TYPES).toEqual({
      VALORANT_POINTS: '85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741',
      RADIANITE_POINTS: 'e59aa87c-4cbf-517a-5983-6e81511be9b7',
      KINGDOM_CREDITS: '85ca954a-41f2-ce94-9b45-8ca3dd39a00d',
      FREE_AGENTS: 'f08d4ae3-939c-4576-ab26-09ce1f23bb37',
    });

    expect(ITEM_TYPES).toEqual({
      AGENT: '01bb38e1-da47-4e6a-9b3d-945fe4655707',
      CONTRACT: 'f85cb6f7-33e5-4dc8-b609-ec7212301948',
      GUN_BUDDY: 'dd3bf334-87f3-40bd-b043-682a57a8dc3a',
      SPARY: 'd5f120f8-ff8c-4aac-92ea-f2b5acbe9475',
      CARD: '3f296c07-64c3-494c-923b-fe692a4fa1bd',
      TITLE: 'de7caa6b-adf7-4588-bbd1-143831e786c6',
      SKIN: 'e7c63390-eda7-46e0-bb7a-a6abdacd2433',
      SKIN_VARIANT: '3ad1b2b2-acdb-4524-852f-954a76ddae0a',
      FLEX: '03a572de-4234-31ed-d344-ababa488f981',
    });
  });
});
