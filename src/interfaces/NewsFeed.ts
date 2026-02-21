import { z } from 'zod';

const NewsFeedMediaDimensionsSchema = z.object({
  height: z.number(),
  width: z.number(),
  aspectRatio: z.number(),
});

const NewsFeedMediaColorsSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  label: z.string(),
});

const NewsFeedMediaSchema = z.object({
  provider: z.string(),
  type: z.string(),
  dimensions: NewsFeedMediaDimensionsSchema,
  url: z.string().url(),
  colors: NewsFeedMediaColorsSchema,
  mimeType: z.string(),
});

const NewsFeedProductSchema = z.object({
  title: z.string(),
  machineName: z.string(),
  id: z.string(),
  media: NewsFeedMediaSchema,
});

const NewsFeedActionSchema = z.object({
  type: z.string(),
  payload: z.object({
    url: z.string().url(),
  }),
});

const NewsFeedCategorySchema = z.object({
  title: z.string(),
  description: z.string(),
  machineName: z.string(),
});

const NewsFeedDescriptionSchema = z.object({
  type: z.string(),
  body: z.string(),
});

const NewsFeedAnalyticsSchema = z.object({
  contentId: z.string(),
  contentLocale: z.string(),
  rev: z.string(),
  publishDate: z.string().datetime(),
});

const NewsFeedItemSchema = z.object({
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

const NewsFeedMetadataSchema = z.object({
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

const NewsFeedLinkDataSchema = z.object({
  first: z.string(),
  last: z.string(),
  next: z.string(),
  self: z.string(),
});

export const NewsFeedResponseSchema = z.object({
  data: z.array(NewsFeedItemSchema),
  metadata: NewsFeedMetadataSchema,
  linkdata: NewsFeedLinkDataSchema,
});

export type NewsFeedResponse = z.infer<typeof NewsFeedResponseSchema>;

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