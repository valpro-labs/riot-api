import { z } from 'zod';
import {
  playerUUIDSchema,
  matchIDSchema,
  mapIDSchema,
  queueIDSchema,
  seasonIDSchema,
  platformSchema,
  partyIDSchema,
  characterIDSchema,
  itemIDSchema,
  armorIDSchema,
  xpModificationIDSchema,
  gameModeSchema
} from '../Shared/Common';

const teamOrPlayerSchema = z.enum(['Blue', 'Red']).or(playerUUIDSchema);
export const LocationSchema = z.object({ x: z.number(), y: z.number() });
export type Location = z.input<typeof LocationSchema>;

export const PlayerLocationSchema = z.object({
  subject: playerUUIDSchema,
  viewRadians: z.number(),
  location: LocationSchema,
});
export type PlayerLocation = z.input<typeof PlayerLocationSchema>;

export const EconomySchema = z.object({
  loadoutValue: z.number(),
  weapon: itemIDSchema.or(z.literal('')),
  armor: armorIDSchema.or(z.literal('')),
  remaining: z.number(),
  spent: z.number(),
});
export type Economy = z.input<typeof EconomySchema>;

export const KillFinishingDamageSchema = z.object({
  damageType: z.enum(['Weapon', 'Bomb', 'Ability', 'Fall', 'Melee', 'Invalid', '']),
  damageItem: itemIDSchema
    .or(z.enum(['Ultimate', 'Ability1', 'Ability2', 'GrenadeAbility', 'Primary']))
    .or(z.literal('')),
  isSecondaryFireMode: z.boolean(),
});
export type KillFinishingDamage = z.input<typeof KillFinishingDamageSchema>;

export const KillSchema = z.object({
  gameTime: z.number(),
  roundTime: z.number(),
  killer: playerUUIDSchema,
  victim: playerUUIDSchema,
  victimLocation: LocationSchema,
  assistants: z.array(playerUUIDSchema),
  playerLocations: z.array(PlayerLocationSchema),
  finishingDamage: KillFinishingDamageSchema,
});
export type Kill = z.input<typeof KillSchema>;

export const NewPlayerExperienceTimingSchema = z.object({
  idleTimeMillis: z.literal(0),
  objectiveCompleteTimeMillis: z.literal(0),
});
export type NewPlayerExperienceTiming = z.input<typeof NewPlayerExperienceTimingSchema>;

export const MatchInfoPremierMatchInfoSchema = z.object({}).describe('Premier match metadata; currently empty in the observed response.');
export type MatchInfoPremierMatchInfo = z.input<typeof MatchInfoPremierMatchInfoSchema>;

export const PlayerScoreImpactSchema = z.object({
  damage: z.string().describe('Qualitative impact direction for damage in the performance breakdown.'),
  deathImpact: z.string().describe('Qualitative impact direction for deaths in the performance breakdown.'),
  killImpact: z.string().describe('Qualitative impact direction for kills in the performance breakdown.'),
  trades: z.string().describe('Qualitative impact direction for trades in the performance breakdown.'),
}).describe('Qualitative impact indicators shown by the match performance UI, not numeric scores.');
export type PlayerScoreImpact = z.input<typeof PlayerScoreImpactSchema>;

export const PlayerScoreUtilitySchema = z.object({
  assists: z.string().describe('Qualitative impact direction for assists in the performance breakdown.'),
  defuses: z.string().describe('Qualitative impact direction for defuses in the performance breakdown.'),
  plants: z.string().describe('Qualitative impact direction for plants in the performance breakdown.'),
  utilityUsage: z.string().describe('Qualitative impact direction for utility usage in the performance breakdown.'),
}).describe('Qualitative impact indicators for utility/objective performance rows.');
export type PlayerScoreUtility = z.input<typeof PlayerScoreUtilitySchema>;

export const PlayerScoreLabelsSchema = z.object({
  TempValueO: z.string().describe('Internal display label; exact meaning has not been identified.'),
  TempValueM: z.string().describe('Internal display label; exact meaning has not been identified.'),
  TempValueN: z.string().describe('Internal display label; exact meaning has not been identified.'),
  TempValueP: PlayerScoreImpactSchema,
  TempValueQ: PlayerScoreUtilitySchema,
}).describe('Labels and qualitative impact indicators used by the performance breakdown UI.');
export type PlayerScoreLabels = z.input<typeof PlayerScoreLabelsSchema>;

export const PlayerScoreThresholdsSchema = z.object({
  distinction: z.number().describe('Observed score cutoff for the Distinction band.'),
  merit: z.number().describe('Observed score cutoff for the Merit band.'),
  pass: z.number().describe('Observed score cutoff for the Pass band.'),
}).describe('Performance score cutoffs used by the distribution graph.');
export type PlayerScoreThresholds = z.input<typeof PlayerScoreThresholdsSchema>;

export const PlayerScoreProgressSchema = z.object({
  TempValueR: z.number().describe('Reference marker on the performance distribution graph (observed at 250).'),
  TempValueV: z.number().describe('Lower bound of the graph score scale (observed at 0).'),
  TempValueU: z.number().describe('Upper bound of the graph score scale (observed at 500).'),
  TempValueS: PlayerScoreThresholdsSchema,
}).describe('Performance distribution graph scale, reference marker, and score-band thresholds.');
export type PlayerScoreProgress = z.input<typeof PlayerScoreProgressSchema>;

export const PlayerScoresSchema = z.object({
  TempValueF: z.number().describe('Performance score shown in the match scoreboard; the UI rounds it to an integer.'),
  TempValueG: z.number().describe('Internal score value; meaning has not been identified.'),
  TempValueH: z.number().describe('Internal score value; meaning has not been identified.'),
  TempValueA: z.number().describe('Average damage per round, shown as Damage in the performance breakdown.'),
  TempValueI: z.number().describe('Adjusted kills per round, shown as Adjusted Kills.'),
  TempValueJ: z.number().describe('Adjusted deaths per round, shown as Adjusted Deaths; returned negative, UI shows magnitude.'),
  TempValueB: z.number().describe('Trades per round; scoreboard trade count is this value multiplied by rounds played.'),
  TempValueC: z.number().describe('Assists per round, shown as Assists in the performance breakdown.'),
  TempValueD: z.number().describe('Utility/ability usage per round, shown as Utility Usage.'),
  TempValueE: z.number().describe('Plants per round, shown as Plants.'),
  TempValueK: z.number().describe('Defuses per round, shown as Defuses.'),
  TempValueL: PlayerScoreLabelsSchema,
  TempValueT: PlayerScoreProgressSchema,
}).describe('Internal per-player performance values used by the match detail scoring UI.');
export type PlayerScores = z.input<typeof PlayerScoresSchema>;

export const BonsaiBloomlineSchema = z.object({
  bloomlineLongLevel: z.number().describe('Bloomline progression level; exact UI usage is not confirmed.'),
  bloomlinePlankBackgroundID: z.string().describe('Bloomline background asset identifier; exact UI usage is not confirmed.'),
  bloomlineHypeID: z.string().describe('Bloomline hype asset identifier; exact UI usage is not confirmed.'),
  bloomlineClipID: z.string().describe('Bloomline clip asset identifier; exact UI usage is not confirmed.'),
}).describe('Bloomline progression and cosmetic metadata; exact UI usage is not confirmed.');
export type BonsaiBloomline = z.input<typeof BonsaiBloomlineSchema>;

export const ParticipationPeriodSchema = z.object({
  sessionStartTime: z.string().describe('Start timestamp of this participation session.'),
  sessionEndTime: z.string().describe('End timestamp of this participation session.'),
}).describe('Time interval associated with a player\'s participation in the match.');
export type ParticipationPeriod = z.input<typeof ParticipationPeriodSchema>;

export const MatchInfoSchema = z.object({
  matchId: matchIDSchema,
  mapId: mapIDSchema,
  gamePodId: z.string(),
  gameLoopZone: z.string(),
  gameServerAddress: z.string(),
  gameVersion: z.string(),
  gameLengthMillis: z.number().nullable(),
  gameStartMillis: z.number(),
  provisioningFlowID: z.enum(['Matchmaking', 'CustomGame']),
  isCompleted: z.boolean(),
  customGameName: z.string(),
  forcePostProcessing: z.boolean(),
  queueID: queueIDSchema,
  gameMode: gameModeSchema,
  isRanked: z.boolean(),
  isMatchSampled: z.boolean(),
  isEarlyCompletion: z.boolean().optional().describe('Whether the match ended early; downstream scoring effects are not confirmed.'),
  seasonId: seasonIDSchema,
  completionState: z.enum(['Surrendered', 'Completed', 'VoteDraw', '']),
  platformType: platformSchema.shape.platformType,
  premierMatchInfo: MatchInfoPremierMatchInfoSchema,
  partyRRPenalties: z.record(z.string(), z.number()).optional(),
  shouldMatchDisablePenalties: z.boolean(),
  newMapLossReductionModifier: z.number().optional().describe('Server modifier related to map loss reduction; formula and units are unknown.'),
  isReplayRecorded: z.boolean().optional().describe('Whether a replay was recorded for this match.'),
});
export type MatchInfo = z.input<typeof MatchInfoSchema>;

export const PlayerAbilityCastsSchema = z.object({
  grenadeCasts: z.number(),
  ability1Casts: z.number(),
  ability2Casts: z.number(),
  ultimateCasts: z.number(),
});
export type PlayerAbilityCasts = z.input<typeof PlayerAbilityCastsSchema>;

export const PlayerStatsSchema = z.object({
  score: z.number(),
  roundsPlayed: z.number(),
  kills: z.number(),
  deaths: z.number(),
  assists: z.number(),
  TempValueA: z.number().optional().describe('Internal match stat that appears to be total damage dealt.'),
  TempValueB: z.number().optional().describe('Internal match stat; meaning has not been identified.'),
  TempValueD: z.number().optional().describe('Plant count for the match.'),
  TempValueE: z.number().optional().describe('Defuse count for the match.'),
  playtimeMillis: z.number(),
  abilityCasts: PlayerAbilityCastsSchema.nullable().optional(),
});
export type PlayerStats = z.input<typeof PlayerStatsSchema>;

export const PlayerRoundDamageSchema = z.object({
  round: z.number(),
  receiver: playerUUIDSchema,
  damage: z.number(),
});
export type PlayerRoundDamage = z.input<typeof PlayerRoundDamageSchema>;

export const XPModificationSchema = z.object({
  Value: z.number(),
  ID: xpModificationIDSchema,
  IncludeInV2: z.boolean().optional().describe('Whether this XP modification is included in the V2 XP data/calculation.'),
  Type: z.number().optional().describe('Internal numeric modification category; mapping to named categories is not confirmed.'),
});
export type XPModification = z.input<typeof XPModificationSchema>;

export const BehaviorFactorsSchema = z.object({
  afkRounds: z.number().describe('Number of rounds flagged as AFK.'),
  collisions: z.number().optional().describe('Behavior telemetry; exact scale and interpretation are undocumented.'),
  commsRatingRecovery: z.number().describe('Comms-related rating recovery value; exact scale is undocumented.'),
  damageParticipationOutgoing: z.number().describe('Outgoing damage participation value; exact scale is undocumented.'),
  friendlyFireIncoming: z.number().optional().describe('Incoming friendly-fire telemetry; exact scale is undocumented.'),
  friendlyFireOutgoing: z.number().optional().describe('Outgoing friendly-fire telemetry; exact scale is undocumented.'),
  mouseMovement: z.number().optional().describe('Mouse-movement telemetry; exact scale is undocumented.'),
  selfDamage: z.number().optional().describe('Self-inflicted damage metric; exact scale and interpretation are not confirmed.'),
  stayedInSpawnRounds: z.number().optional().describe('Number of rounds spent in spawn; exact counting rules are undocumented.'),
}).describe('Behavior and match-integrity metrics; several field scales are undocumented.');
export type BehaviorFactors = z.input<typeof BehaviorFactorsSchema>;

export const AdaptiveBotDetailsSchema = z.object({
  adaptiveBotAverageDurationMillisAllAttempts: z.literal(0),
  adaptiveBotAverageDurationMillisFirstAttempt: z.literal(0),
  killDetailsFirstAttempt: z.null(),
}).merge(NewPlayerExperienceTimingSchema);
export type AdaptiveBotDetails = z.input<typeof AdaptiveBotDetailsSchema>;

export const DefendBombSiteDetailsSchema = z.object({
  success: z.literal(false),
}).merge(NewPlayerExperienceTimingSchema);
export type DefendBombSiteDetails = z.input<typeof DefendBombSiteDetailsSchema>;

export const NewPlayerExperienceSettingsStatusSchema = z.object({
  isMouseSensitivityDefault: z.boolean(),
  isCrosshairDefault: z.boolean(),
});
export type NewPlayerExperienceSettingsStatus = z.input<typeof NewPlayerExperienceSettingsStatusSchema>;

export const NewPlayerExperienceDetailsSchema = z.object({
  basicMovement: NewPlayerExperienceTimingSchema,
  basicGunSkill: NewPlayerExperienceTimingSchema,
  adaptiveBots: AdaptiveBotDetailsSchema,
  ability: NewPlayerExperienceTimingSchema,
  bombPlant: NewPlayerExperienceTimingSchema,
  defendBombSite: DefendBombSiteDetailsSchema,
  settingStatus: NewPlayerExperienceSettingsStatusSchema,
  versionString: z.literal(''),
});
export type NewPlayerExperienceDetails = z.input<typeof NewPlayerExperienceDetailsSchema>;

export const PlayerSchema = z.object({
  subject: playerUUIDSchema,
  gameName: z.string(),
  tagLine: z.string(),
  platformInfo: platformSchema,
  teamId: teamOrPlayerSchema,
  teamNumber: z.number().optional().describe('Internal numeric team index; mapping to Blue/Red is not confirmed.'),
  partyId: partyIDSchema,
  characterId: characterIDSchema,
  stats: PlayerStatsSchema.nullable(),
  scores: PlayerScoresSchema.optional(),
  roundDamage: z.array(PlayerRoundDamageSchema).nullable(),
  competitiveTier: z.number(),
  isObserver: z.boolean(),
  playerCard: z.string(),
  playerTitle: z.string(),
  preferredLevelBorder: z.string().or(z.literal('')).optional(),
  accountLevel: z.number(),
  sessionPlaytimeMinutes: z.number().nullable().optional(),
  xpModifications: z.array(XPModificationSchema).optional(),
  behaviorFactors: BehaviorFactorsSchema.optional(),
  newPlayerExperienceDetails: NewPlayerExperienceDetailsSchema.optional(),
  premierPrestige: z.record(z.string(), z.unknown()).optional().describe('Premier prestige metadata; structure is not yet known.'),
  bonsaiBloomline: BonsaiBloomlineSchema.optional(),
  participationPeriods: z.array(ParticipationPeriodSchema).optional(),
});
export type Player = z.input<typeof PlayerSchema>;

export const BotStatsSchema = z.object({
  score: z.number(),
  roundsPlayed: z.number(),
  kills: z.number(),
  deaths: z.number(),
  assists: z.number(),
  playtimeMillis: z.number(),
});
export type BotStats = z.input<typeof BotStatsSchema>;

export const BotSchema = z.object({
  subject: z.string(),
  teamId: teamOrPlayerSchema,
  characterId: characterIDSchema,
  stats: BotStatsSchema,
});
export type Bot = z.input<typeof BotSchema>;

export const CoachSchema = z.object({
  subject: playerUUIDSchema,
  teamId: z.enum(['Blue', 'Red']),
});
export type Coach = z.input<typeof CoachSchema>;

export const TeamSchema = z.object({
  teamId: teamOrPlayerSchema,
  won: z.boolean(),
  roundsPlayed: z.number(),
  roundsWon: z.number(),
  numPoints: z.number(),
  tempR: z.number().optional().describe('Undocumented internal team value; meaning is not confirmed.'),
  mvp: z.string().optional().describe('Player UUID identified as this team\'s MVP in the match response.'),
});
export type Team = z.input<typeof TeamSchema>;

export const RoundResultPlayerAbilityEffectsSchema = z.object({
  grenadeEffects: z.null(),
  ability1Effects: z.null(),
  ability2Effects: z.null(),
  ultimateEffects: z.null(),
});
export type RoundResultPlayerAbilityEffects = z.input<typeof RoundResultPlayerAbilityEffectsSchema>;

export const RoundResultPlayerDamageSchema = z.object({
  receiver: playerUUIDSchema,
  damage: z.number(),
  legshots: z.number(),
  bodyshots: z.number(),
  headshots: z.number(),
});
export type RoundResultPlayerDamage = z.input<typeof RoundResultPlayerDamageSchema>;

export const RoundResultPlayerStatSchema = z.object({
  subject: playerUUIDSchema,
  kills: z.array(KillSchema),
  damage: z.array(RoundResultPlayerDamageSchema),
  score: z.number(),
  economy: EconomySchema,
  ability: RoundResultPlayerAbilityEffectsSchema,
  wasAfk: z.boolean(),
  wasPenalized: z.boolean(),
  stayedInSpawn: z.boolean(),
});
export type RoundResultPlayerStat = z.input<typeof RoundResultPlayerStatSchema>;

export const RoundResultPlayerEconomySchema = z.object({
  subject: playerUUIDSchema,
}).merge(EconomySchema);
export type RoundResultPlayerEconomy = z.input<typeof RoundResultPlayerEconomySchema>;

export const RoundResultPlayerScoreSchema = z.object({
  subject: playerUUIDSchema,
  score: z.number(),
});
export type RoundResultPlayerScore = z.input<typeof RoundResultPlayerScoreSchema>;

export const RoundResultSchema = z.object({
  roundNum: z.number(),
  roundResult: z.enum(['Eliminated', 'Bomb detonated', 'Bomb defused', 'Surrendered', 'Round timer expired']),
  roundCeremony: z.enum(['CeremonyDefault', 'CeremonyTeamAce', 'CeremonyFlawless', 'CeremonyCloser', 'CeremonyClutch', 'CeremonyThrifty', 'CeremonyAce', '']),
  winningTeam: teamOrPlayerSchema,
  winningTeamRole: z.enum(['Attacker', 'Defender', '']).optional(),
  firstBloodPlayer: playerUUIDSchema.optional().describe('UUID of the first player to get a kill in this round (First Blood).'),
  bombPlanter: playerUUIDSchema.optional(),
  bombDefuser: teamOrPlayerSchema.optional(),
  plantRoundTime: z.number().optional(),
  plantPlayerLocations: z.array(PlayerLocationSchema).nullable(),
  plantLocation: LocationSchema,
  plantSite: z.enum(['A', 'B', 'C', '']),
  defuseRoundTime: z.number().optional(),
  defusePlayerLocations: z.array(PlayerLocationSchema).nullable(),
  defuseLocation: LocationSchema,
  playerStats: z.array(RoundResultPlayerStatSchema),
  roundResultCode: z.enum(['Elimination', 'Detonate', 'Defuse', 'Surrendered', '']),
  playerEconomies: z.array(RoundResultPlayerEconomySchema).nullable(),
  playerScores: z.array(RoundResultPlayerScoreSchema).nullable(),
  ceremonyPlayer: playerUUIDSchema.optional().describe('Player associated with the round-end ceremony, such as an ace or clutch.'),
  ceremonyTeam: teamOrPlayerSchema.optional().describe('Team associated with the round-end ceremony.'),
});
export type RoundResult = z.input<typeof RoundResultSchema>;

export const MatchDetailsSchema = z.object({
  matchInfo: MatchInfoSchema,
  players: z.array(PlayerSchema),
  bots: z.array(BotSchema),
  coaches: z.array(CoachSchema),
  teams: z.array(TeamSchema).nullable(),
  roundResults: z.array(RoundResultSchema).nullable(),
  kills: z.array(KillSchema.merge(z.object({ round: z.number() }))).nullable(),
  matchMvp: playerUUIDSchema.optional().describe('UUID of the match-level MVP player.'),
  hasTempValues: z.boolean().optional().describe('Whether the response includes internal TempValue scoring fields.'),
}).describe('Detailed match result, including players, teams, rounds, and optional performance scoring data.');

export type MatchDetailsResponse = z.input<typeof MatchDetailsSchema>;
