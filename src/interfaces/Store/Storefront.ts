import { z } from 'zod';
import {
  weakUUIDSchema,
  dateSchema,
  currencyIDSchema,
  itemTypeIDSchema,
  itemIDSchema
} from '../Shared/Common';

export const OfferRewardSchema = z.object({
  ItemTypeID: itemTypeIDSchema,
  ItemID: itemIDSchema,
  Quantity: z.number(),
});
export type OfferReward = z.input<typeof OfferRewardSchema>;

export const OfferSchema = z.object({
  OfferID: z.string(),
  IsDirectPurchase: z.boolean(),
  StartDate: dateSchema,
  Cost: z.record(currencyIDSchema, z.number()),
  Rewards: z.array(OfferRewardSchema),
});
export type Offer = z.input<typeof OfferSchema>;

export const BundleItemInfoSchema = z.object({
  ItemTypeID: itemTypeIDSchema,
  ItemID: itemIDSchema,
  Amount: z.number(),
});
export type BundleItemInfo = z.input<typeof BundleItemInfoSchema>;

export const BundleItemSchema = z.object({
  Item: BundleItemInfoSchema,
  BasePrice: z.number(),
  CurrencyID: currencyIDSchema,
  DiscountPercent: z.number(),
  DiscountedPrice: z.number(),
  IsPromoItem: z.boolean(),
});
export type BundleItem = z.input<typeof BundleItemSchema>;

export const BundleItemOfferSchema = z.object({
  BundleItemOfferID: weakUUIDSchema,
  Offer: OfferSchema,
  DiscountPercent: z.number(),
  DiscountedCost: z.record(weakUUIDSchema, z.number()),
});
export type BundleItemOffer = z.input<typeof BundleItemOfferSchema>;

export const BundleSchema = z.object({
  ID: weakUUIDSchema,
  DataAssetID: weakUUIDSchema,
  CurrencyID: currencyIDSchema,
  Items: z.array(BundleItemSchema),
  ItemOffers: z.array(BundleItemOfferSchema).nullable(),
  TotalBaseCost: z.record(weakUUIDSchema, z.number()).nullable(),
  TotalDiscountedCost: z.record(weakUUIDSchema, z.number()).nullable(),
  TotalDiscountPercent: z.number(),
  DurationRemainingInSeconds: z.number(),
  WholesaleOnly: z.boolean(),
});
export type Bundle = z.input<typeof BundleSchema>;

export const BonusOfferSchema = z.object({
  BonusOfferID: weakUUIDSchema,
  Offer: OfferSchema,
  DiscountPercent: z.number(),
  DiscountCosts: z.record(weakUUIDSchema, z.number()),
  IsSeen: z.boolean(),
});
export type BonusOffer = z.input<typeof BonusOfferSchema>;

export const FeaturedBundleSchema = z.object({
  Bundle: BundleSchema,
  Bundles: z.array(BundleSchema),
  BundleRemainingDurationInSeconds: z.number(),
});
export type FeaturedBundle = z.input<typeof FeaturedBundleSchema>;

export const SkinsPanelLayoutSchema = z.object({
  SingleItemOffers: z.array(itemIDSchema),
  SingleItemStoreOffers: z.array(OfferSchema),
  SingleItemOffersRemainingDurationInSeconds: z.number(),
});
export type SkinsPanelLayout = z.input<typeof SkinsPanelLayoutSchema>;

export const UpgradeCurrencyOfferSchema = z.object({
  OfferID: weakUUIDSchema,
  StorefrontItemID: itemIDSchema,
  Offer: OfferSchema,
  DiscountedPercent: z.number(),
});
export type UpgradeCurrencyOffer = z.input<typeof UpgradeCurrencyOfferSchema>;

export const UpgradeCurrencyStoreSchema = z.object({
  UpgradeCurrencyOffers: z.array(UpgradeCurrencyOfferSchema),
});
export type UpgradeCurrencyStore = z.input<typeof UpgradeCurrencyStoreSchema>;

export const AccessoryStoreOfferSchema = z.object({
  Offer: OfferSchema,
  ContractID: weakUUIDSchema,
});
export type AccessoryStoreOffer = z.input<typeof AccessoryStoreOfferSchema>;

export const AccessoryStoreSchema = z.object({
  AccessoryStoreOffers: z.array(AccessoryStoreOfferSchema),
  AccessoryStoreRemainingDurationInSeconds: z.number(),
  StorefrontID: weakUUIDSchema,
});
export type AccessoryStore = z.input<typeof AccessoryStoreSchema>;

export const BonusStoreSchema = z.object({
  BonusStoreOffers: z.array(BonusOfferSchema),
  BonusStoreRemainingDurationInSeconds: z.number(),
});
export type BonusStore = z.input<typeof BonusStoreSchema>;

export const StorefrontSchema = z.object({
  FeaturedBundle: FeaturedBundleSchema,
  SkinsPanelLayout: SkinsPanelLayoutSchema,
  UpgradeCurrencyStore: UpgradeCurrencyStoreSchema,
  AccessoryStore: AccessoryStoreSchema,
  BonusStore: BonusStoreSchema.optional(),
});

export type StorefrontResponse = z.input<typeof StorefrontSchema>;

