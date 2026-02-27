import { z } from 'zod';
import { weakUUIDSchema } from '../Shared/Common';

export const MilestoneSchema = z.object({
  Progress: z.number(),
  BonusApplied: z.boolean(),
});
export type Milestone = z.input<typeof MilestoneSchema>;

export const DailyTicketProcessedMatchSchema = z.object({
  ID: weakUUIDSchema,
  ProgressBefore: z.number(),
  ProgressAfter: z.number(),
  XP: z.number(),
  SoftCurrency: z.number(),
  WasPenalized: z.boolean(),
  BonusesApplied: z.number(),
  DailyBonusState: z.array(z.boolean()).length(4),
});
export type DailyTicketProcessedMatch = z.input<typeof DailyTicketProcessedMatchSchema>;


export const DailyRewardsSchema = z.object({
  RemainingLifetimeSeconds: z.number(),
  BonusMilestonesPending: z.number(),
  Milestones: z.array(MilestoneSchema),
});
export type DailyRewards = z.input<typeof DailyRewardsSchema>;

export const DailyTicketSchema = z.object({
  Version: z.number(),
  DailyRewards: DailyRewardsSchema,
  ProcessedMatches: z.array(DailyTicketProcessedMatchSchema),

});
export type DailyTicketResponse = z.input<typeof DailyTicketSchema>;
