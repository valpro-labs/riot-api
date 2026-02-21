import { z } from 'zod';

const MilestoneSchema = z.object({
  Progress: z.number(),
  BonusApplied: z.boolean(),
});

const ProcessedMatcheSchema = z.object({
  ID: z.string().uuid(),
  ProgressBefore: z.number(),
  ProgressAfter: z.number(),
  XP: z.number(),
  SoftCurrency: z.number(),
  WasPenalized: z.boolean(),
  BonusesApplied: z.number(),
  DailyBonusState: z.array(z.boolean()).length(4),
});

const DailyTicketSchema = z.object({
  Version: z.number(),
  DailyRewards: z.object({
    RemainingLifetimeSeconds: z.number(),
    BonusMilestonesPending: z.number(),
    Milestones: z.array(MilestoneSchema),
  }),
  ProcessedMatches: z.array(ProcessedMatcheSchema),
});

export type DailyTicketResponse = z.infer<typeof DailyTicketSchema>;
