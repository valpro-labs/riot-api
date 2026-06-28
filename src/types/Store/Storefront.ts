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

export const OfferBaseSchema = z.object({
  OfferID: z.string(),
  StartDate: dateSchema,
  Cost: z.record(currencyIDSchema, z.number()),
  Rewards: z.array(OfferRewardSchema),
});
export type OfferBase = z.input<typeof OfferBaseSchema>;

export const OfferSchema = OfferBaseSchema.extend({
  IsDirectPurchase: z.boolean(),
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
  DiscountedCost: z.record(currencyIDSchema, z.number()),
});
export type BundleItemOffer = z.input<typeof BundleItemOfferSchema>;

export const BundleSchema = z.object({
  ID: weakUUIDSchema,
  DataAssetID: weakUUIDSchema,
  CurrencyID: currencyIDSchema,
  Items: z.array(BundleItemSchema),
  ItemOffers: z.array(BundleItemOfferSchema).nullable(),
  TotalBaseCost: z.record(currencyIDSchema, z.number()).nullable(),
  TotalDiscountedCost: z.record(currencyIDSchema, z.number()).nullable(),
  TotalDiscountPercent: z.number(),
  DurationRemainingInSeconds: z.number(),
  WholesaleOnly: z.boolean(),
  IsGiftable: z.union([z.boolean(), z.number()]).optional(),
});
export type Bundle = z.input<typeof BundleSchema>;

export const BonusOfferSchema = z.object({
  BonusOfferID: weakUUIDSchema,
  Offer: OfferSchema,
  DiscountPercent: z.number(),
  DiscountCosts: z.record(currencyIDSchema, z.number()),
  IsSeen: z.boolean(),
});
export type BonusOffer = z.input<typeof BonusOfferSchema>;

export const FeaturedBundleSchema = z.object({
  Bundle: BundleSchema,
  Bundles: z.array(BundleSchema),
  FeaturedTileEntries: z.array(z.object({
    Type: z.number(),
    Entry: z.object({
      Bundle: BundleSchema,
    }),
  })).optional(),
  BundleRemainingDurationInSeconds: z.number(),
});
export type FeaturedBundle = z.input<typeof FeaturedBundleSchema>;

export const SkinsPanelLayoutSchema = z.object({
  SingleItemOffers: z.array(z.string()),
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

export const PluginStoreOfferSchema = OfferBaseSchema.extend({
  OfferID: weakUUIDSchema,
  StorefrontItemID: weakUUIDSchema,
  EndDate: dateSchema,
  Priority: z.number(),
});
export type PluginStoreOffer = z.input<typeof PluginStoreOfferSchema>;

export const LegacyPluginStoreSchema = z.object({
  PluginID: weakUUIDSchema,
  PluginInstanceID: weakUUIDSchema,
  StorefrontItemID: weakUUIDSchema,
  Offers: z.array(PluginStoreOfferSchema),
  DurationRemainingInSeconds: z.number(),
  StorefrontExpiry: dateSchema,
});

export const PluginStorePurchaseInformationSchema = z.object({
  DataAssetID: weakUUIDSchema,
  OfferID: weakUUIDSchema,
  OfferType: z.number(),
  StartDate: dateSchema,
  PrimaryCurrencyID: currencyIDSchema,
  Cost: z.record(currencyIDSchema, z.number()),
  DiscountedCost: z.record(currencyIDSchema, z.number()),
  DiscountedPercentage: z.number(),
  Rewards: z.array(OfferRewardSchema),
  AdditionalContext: z.array(z.unknown()),
  WholesaleOnly: z.boolean(),
  IsGiftable: z.number(),
});
export type PluginStorePurchaseInformation = z.input<typeof PluginStorePurchaseInformationSchema>;

export const PluginStoreSubOfferSchema = z.object({
  PurchaseInformation: PluginStorePurchaseInformationSchema,
});
export type PluginStoreSubOffer = z.input<typeof PluginStoreSubOfferSchema>;

export const PluginStoreStoreOfferSchema = z.object({
  PurchaseInformation: PluginStorePurchaseInformationSchema,
  SubOffers: z.array(PluginStoreSubOfferSchema),
});
export type PluginStoreStoreOffer = z.input<typeof PluginStoreStoreOfferSchema>;

export const PluginStoreOffersSchema = z.object({
  StoreOffers: z.array(PluginStoreStoreOfferSchema),
  RemainingDurationInSeconds: z.number(),
});
export type PluginStoreOffers = z.input<typeof PluginStoreOffersSchema>;

export const PluginStoreWithOffersSchema = z.object({
  PluginID: weakUUIDSchema,
  PluginOffers: PluginStoreOffersSchema,
  StartDate: dateSchema,
});

export const PluginStoreSchema = z.union([
  PluginStoreWithOffersSchema,
  LegacyPluginStoreSchema,
]);
export type PluginStore = z.input<typeof PluginStoreSchema>;

export const StorefrontSchema = z.object({
  FeaturedBundle: FeaturedBundleSchema,
  SkinsPanelLayout: SkinsPanelLayoutSchema,
  UpgradeCurrencyStore: UpgradeCurrencyStoreSchema,
  AccessoryStore: AccessoryStoreSchema,
  PluginStores: z.array(PluginStoreSchema),
  BonusStore: BonusStoreSchema.optional(),
});

export type StorefrontResponse = z.input<typeof StorefrontSchema>;

