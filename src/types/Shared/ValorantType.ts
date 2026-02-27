import { z } from 'zod';

export const RegionSchema = z.enum(['na', 'latam', 'br', 'eu', 'ap', 'kr']).or(z.string());
export type Region = z.input<typeof RegionSchema>;

export const ShardSchema = z.enum(['na', 'pbe', 'eu', 'ap', 'kr']).or(z.string());
export type Shard = z.input<typeof ShardSchema>;

export const CURRENCY_TYPES = {
  VALORANT_POINTS: '85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741',
  RADIANITE_POINTS: 'e59aa87c-4cbf-517a-5983-6e81511be9b7',
  KINGDOM_CREDITS: '85ca954a-41f2-ce94-9b45-8ca3dd39a00d',
  FREE_AGENTS: 'f08d4ae3-939c-4576-ab26-09ce1f23bb37',
} as const;

export const CurrencyTypeIDSchema = z.nativeEnum(CURRENCY_TYPES).or(z.string().uuid());
export type CurrencyTypeID = z.input<typeof CurrencyTypeIDSchema>;

export const ITEM_TYPES = {
  AGENT: '01bb38e1-da47-4e6a-9b3d-945fe4655707',
  CONTRACT: 'f85cb6f7-33e5-4dc8-b609-ec7212301948',
  SPARY: 'd5f120f8-ff8c-4aac-92ea-f2b5acbe9475',
  GUN_BUDDY: 'dd3bf334-87f3-40bd-b043-682a57a8dc3a',
  CARD: '3f296c07-64c3-494c-923b-fe692a4fa1bd',
  SKIN: 'e7c63390-eda7-46e0-bb7a-a6abdacd2433',
  SKIN_VARIANT: '3ad1b2b2-acdb-4524-852f-954a76ddae0a',
  TITLE: 'de7caa6b-adf7-4588-bbd1-143831e786c6',
  FLEX: '03a572de-4234-31ed-d344-ababa488f981',
} as const;

export const ItemTypeIDSchema = z.nativeEnum(ITEM_TYPES).or(z.string().uuid());
export type ItemTypeID = z.input<typeof ItemTypeIDSchema>;
