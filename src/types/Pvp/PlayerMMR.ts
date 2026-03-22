import { z } from 'zod';
import { playerUUIDSchema, matchIDSchema, mapIDSchema, queueIDSchema, seasonIDSchema, millisSchema } from '../Shared/Common';

export const PlayerMMRLatestCompetitiveUpdateSchema = z.object({
  MatchID: matchIDSchema,
  MapID: mapIDSchema,
  QueueID: queueIDSchema,
  SeasonID: seasonIDSchema,
  MatchStartTime: millisSchema,
  MatchLength: z.number(),
  TierAfterUpdate: z.number(),
  TierBeforeUpdate: z.number(),
  RankedRatingAfterUpdate: z.number(),
  RankedRatingBeforeUpdate: z.number(),
  RankedRatingEarned: z.number(),
  RankedRatingPerformanceBonus: z.number(),
  RankedRatingRefundApplied: z.number(),
  NewMapIncentiveRRForgiven: z.number(),
  CompetitiveMovement: z.string(),
  AFKPenalty: z.number(),
  WasDerankProtected: z.boolean(),
  WasDerankProtectionReplenished: z.boolean(),
});
export type PlayerMMRLatestCompetitiveUpdate = z.input<typeof PlayerMMRLatestCompetitiveUpdateSchema>;

export const PlayerMMRSeasonalInfoSchema = z.object({
  SeasonID: seasonIDSchema,
  NumberOfWins: z.number(),
  NumberOfWinsWithPlacements: z.number(),
  NumberOfGames: z.number(),
  Rank: z.number(),
  CapstoneWins: z.number(),
  LeaderboardRank: z.number(),
  CompetitiveTier: z.number(),
  RankedRating: z.number(),
  WinsByTier: z.record(z.string(), z.number()).nullable(),
  GamesNeededForRating: z.number(),
  TotalWinsNeededForRank: z.number(),
});
export type PlayerMMRSeasonalInfo = z.input<typeof PlayerMMRSeasonalInfoSchema>;

export const PlayerMMRQueueSkillSchema = z.object({
  TotalGamesNeededForRating: z.number(),
  TotalGamesNeededForLeaderboard: z.number(),
  CurrentSeasonGamesNeededForRating: z.number(),
  SeasonalInfoBySeasonID: z.record(seasonIDSchema, PlayerMMRSeasonalInfoSchema),
});
export type PlayerMMRQueueSkill = z.input<typeof PlayerMMRQueueSkillSchema>;

export const PlayerMMRSchema = z.object({
  Version: z.number(),
  Subject: playerUUIDSchema,
  LatestCompetitiveUpdate: PlayerMMRLatestCompetitiveUpdateSchema,
  NewPlayerExperienceFinished: z.boolean(),
  IsActRankBadgeHidden: z.boolean(),
  IsLeaderboardAnonymized: z.boolean(),
  OnboardingFlowV2Enabled: z.boolean(),
  OnboardingStatus: z.string(),
  IsAtDerankProtectedTier: z.boolean(),
  DerankProtectedGamesRemaining: z.number(),
  DerankProtectedStatus: z.string(),
  QueueSkills: z.record(z.string(), PlayerMMRQueueSkillSchema),
});

export type PlayerMMRResponse = z.input<typeof PlayerMMRSchema>;
