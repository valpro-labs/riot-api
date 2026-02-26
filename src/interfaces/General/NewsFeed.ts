import { z } from 'zod';

export const NewsFeedMediaDimensionsSchema = z.object({
  height: z.number(),
  width: z.number(),
  aspectRatio: z.number(),
});
export type NewsFeedMediaDimensions = z.input<typeof NewsFeedMediaDimensionsSchema>;

export const NewsFeedMediaColorsSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  label: z.string(),
});
export type NewsFeedMediaColors = z.input<typeof NewsFeedMediaColorsSchema>;

export const NewsFeedMediaSchema = z.object({
  provider: z.string(),
  type: z.string(),
  dimensions: NewsFeedMediaDimensionsSchema,
  url: z.string().url(),
  colors: NewsFeedMediaColorsSchema,
  mimeType: z.string(),
});
export type NewsFeedMedia = z.input<typeof NewsFeedMediaSchema>;

export const NewsFeedProductSchema = z.object({
  title: z.string(),
  machineName: z.string(),
  id: z.string(),
  media: NewsFeedMediaSchema,
});
export type NewsFeedProduct = z.input<typeof NewsFeedProductSchema>;

export const NewsFeedActionPayloadSchema = z.object({
  url: z.string().url(),
});
export type NewsFeedActionPayload = z.input<typeof NewsFeedActionPayloadSchema>;

export const NewsFeedActionSchema = z.object({
  type: z.string(),
  payload: NewsFeedActionPayloadSchema,
});
export type NewsFeedAction = z.input<typeof NewsFeedActionSchema>;

export const NewsFeedCategorySchema = z.object({
  title: z.string(),
  description: z.string(),
  machineName: z.string(),
});
export type NewsFeedCategory = z.input<typeof NewsFeedCategorySchema>;

export const NewsFeedDescriptionSchema = z.object({
  type: z.string(),
  body: z.string(),
});
export type NewsFeedDescription = z.input<typeof NewsFeedDescriptionSchema>;

export const NewsFeedAnalyticsSchema = z.object({
  contentId: z.string(),
  contentLocale: z.string(),
  rev: z.string(),
  publishDate: z.string().datetime(),
});
export type NewsFeedAnalytics = z.input<typeof NewsFeedAnalyticsSchema>;

export const NewsFeedItemSchema = z.object({
  title: z.string(),
  publishedAt: z.string().datetime(),
  promoCardSize: z.string().optional(),
  action: NewsFeedActionSchema,
  product: NewsFeedProductSchema,
  media: NewsFeedMediaSchema,
  description: NewsFeedDescriptionSchema,
  category: NewsFeedCategorySchema,
  analytics: NewsFeedAnalyticsSchema,
});
export type NewsFeedItem = z.input<typeof NewsFeedItemSchema>;

export const NewsFeedMetadataSchema = z.object({
  channelMachineName: z.string(),
  channelHostname: z.string(),
  smartListMachineName: z.string(),
  from: z.number(),
  limit: z.number(),
  overrideSize: z.number(),
  totalItems: z.number(),
  locale: z.string(),
  resultsUpdatedAt: z.string(),
  totalPages: z.number(),
});
export type NewsFeedMetadata = z.input<typeof NewsFeedMetadataSchema>;

export const NewsFeedLinkDataSchema = z.object({
  first: z.string(),
  last: z.string(),
  next: z.string(),
  self: z.string(),
});
export type NewsFeedLinkData = z.input<typeof NewsFeedLinkDataSchema>;

export const NewsFeedResponseSchema = z.object({
  data: z.array(NewsFeedItemSchema),
  metadata: NewsFeedMetadataSchema,
  linkdata: NewsFeedLinkDataSchema,
});
export type NewsFeedResponse = z.input<typeof NewsFeedResponseSchema>;

export const NewsFeedParamsSchema = z.object({
  channel: z.string().optional(),
  list: z.string().optional(),
  products: z.string().optional(),
  categories: z.string().optional(),
  tags: z.string().optional(),
  locale: z.string().optional(),
  from: z.number().int().min(0).optional(),
  limit: z.number().int().positive().optional(),
});
export type NewsFeedParams = z.input<typeof NewsFeedParamsSchema>;
