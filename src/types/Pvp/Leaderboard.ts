import { z } from 'zod';
import { cardIDSchema, playerUUIDSchema, seasonIDSchema, titleIDSchema } from '../Shared/Common';

export const LeaderboardPlayerSchema = z.object({
  PlayerCardID: cardIDSchema,
  TitleID: titleIDSchema,
  IsBanned: z.boolean(),
  IsAnonymized: z.boolean(),
  puuid: playerUUIDSchema,
  gameName: z.string(),
  tagLine: z.string(),
  leaderboardRank: z.number(),
  rankedRating: z.number(),
  numberOfWins: z.number(),
  competitiveTier: z.number(),
});
export type LeaderboardPlayer = z.input<typeof LeaderboardPlayerSchema>;

export const LeaderboardTierDetailSchema = z.object({
  rankedRatingThreshold: z.number(),
  startingPage: z.number(),
  startingIndex: z.number(),
});
export type LeaderboardTierDetail = z.input<typeof LeaderboardTierDetailSchema>;

export const LeaderboardSchema = z.object({
  Deployment: z.string(),
  QueueID: z.string(),
  SeasonID: seasonIDSchema,
  Players: z.array(LeaderboardPlayerSchema),
  totalPlayers: z.number(),
  immortalStartingPage: z.number(),
  immortalStartingIndex: z.number(),
  topTierRRThreshold: z.number(),
  tierDetails: z.record(z.string(), LeaderboardTierDetailSchema),
  startIndex: z.number(),
  query: z.string(),
});
export type LeaderboardResponse = z.input<typeof LeaderboardSchema>;
