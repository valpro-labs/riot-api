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

export const MatchInfoPremierMatchInfoSchema = z.object({});
export type MatchInfoPremierMatchInfo = z.input<typeof MatchInfoPremierMatchInfoSchema>;

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
  seasonId: seasonIDSchema,
  completionState: z.enum(['Surrendered', 'Completed', 'VoteDraw', '']),
  platformType: platformSchema.shape.platformType,
  premierMatchInfo: MatchInfoPremierMatchInfoSchema,
  partyRRPenalties: z.record(z.string(), z.number()).optional(),
  shouldMatchDisablePenalties: z.boolean(),
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
});
export type XPModification = z.input<typeof XPModificationSchema>;

export const BehaviorFactorsSchema = z.object({
  afkRounds: z.number(),
  collisions: z.number().optional(),
  commsRatingRecovery: z.number(),
  damageParticipationOutgoing: z.number(),
  friendlyFireIncoming: z.number().optional(),
  friendlyFireOutgoing: z.number().optional(),
  mouseMovement: z.number().optional(),
  stayedInSpawnRounds: z.number().optional(),
});
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
  partyId: partyIDSchema,
  characterId: characterIDSchema,
  stats: PlayerStatsSchema.nullable(),
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
});
export type Player = z.input<typeof PlayerSchema>;

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
});
export type RoundResult = z.input<typeof RoundResultSchema>;

export const MatchDetailsSchema = z.object({
  matchInfo: MatchInfoSchema,
  players: z.array(PlayerSchema),
  bots: z.array(z.unknown()),
  coaches: z.array(CoachSchema),
  teams: z.array(TeamSchema).nullable(),
  roundResults: z.array(RoundResultSchema).nullable(),
  kills: z.array(KillSchema.merge(z.object({ round: z.number() }))).nullable(),
});

export type MatchDetailsResponse = z.input<typeof MatchDetailsSchema>;

