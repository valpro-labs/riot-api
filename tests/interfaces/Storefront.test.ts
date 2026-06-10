import { StorefrontSchema } from '../../src/types/Store/Storefront';

const uuid = (id: number) => `00000000-0000-0000-0000-${id.toString().padStart(12, '0')}`;

describe('StorefrontSchema', () => {
  it('parses storefront responses with plugin stores', () => {
    const currencyID = uuid(1);
    const itemTypeID = uuid(2);
    const itemID = uuid(3);
    const startDate = '2026-06-08T00:22:56.925Z';
    const endDate = '2026-06-15T00:22:56.925Z';

    const offer = {
      OfferID: uuid(4),
      IsDirectPurchase: true,
      StartDate: startDate,
      Cost: {
        [currencyID]: 875,
      },
      Rewards: [
        {
          ItemTypeID: itemTypeID,
          ItemID: itemID,
          Quantity: 1,
        },
      ],
    };

    const bundle = {
      ID: uuid(5),
      DataAssetID: uuid(6),
      CurrencyID: currencyID,
      Items: [
        {
          Item: {
            ItemTypeID: itemTypeID,
            ItemID: itemID,
            Amount: 1,
          },
          BasePrice: 875,
          CurrencyID: currencyID,
          DiscountPercent: 0,
          DiscountedPrice: 875,
          IsPromoItem: false,
        },
      ],
      ItemOffers: [
        {
          BundleItemOfferID: uuid(7),
          Offer: offer,
          DiscountPercent: 0,
          DiscountedCost: {
            [currencyID]: 875,
          },
        },
      ],
      TotalBaseCost: {
        [currencyID]: 875,
      },
      TotalDiscountedCost: {
        [currencyID]: 875,
      },
      TotalDiscountPercent: 0,
      DurationRemainingInSeconds: 86400,
      WholesaleOnly: false,
    };

    const result = StorefrontSchema.safeParse({
      FeaturedBundle: {
        Bundle: bundle,
        Bundles: [bundle],
        BundleRemainingDurationInSeconds: 86400,
      },
      SkinsPanelLayout: {
        SingleItemOffers: [itemID],
        SingleItemStoreOffers: [offer],
        SingleItemOffersRemainingDurationInSeconds: 86400,
      },
      UpgradeCurrencyStore: {
        UpgradeCurrencyOffers: [
          {
            OfferID: uuid(8),
            StorefrontItemID: itemID,
            Offer: offer,
            DiscountedPercent: 0,
          },
        ],
      },
      AccessoryStore: {
        AccessoryStoreOffers: [
          {
            Offer: offer,
            ContractID: uuid(9),
          },
        ],
        AccessoryStoreRemainingDurationInSeconds: 86400,
        StorefrontID: uuid(10),
      },
      PluginStores: [
        {
          PluginID: uuid(11),
          PluginInstanceID: uuid(12),
          StorefrontItemID: uuid(13),
          Offers: [
            {
              OfferID: uuid(14),
              StorefrontItemID: uuid(15),
              StartDate: startDate,
              EndDate: endDate,
              Priority: 1,
              Cost: {
                [currencyID]: 875,
              },
              Rewards: [
                {
                  ItemTypeID: itemTypeID,
                  ItemID: itemID,
                  Quantity: 1,
                },
              ],
            },
          ],
          DurationRemainingInSeconds: 86400,
          StorefrontExpiry: endDate,
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
