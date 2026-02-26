import { z } from 'zod';

export const weakUUIDSchema = z.string().regex(/^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/i).describe('UUID');
export const playerUUIDSchema = weakUUIDSchema.describe('Player UUID');
export const matchIDSchema = weakUUIDSchema.describe('Match ID');
export const pregameIDSchema = weakUUIDSchema.describe('Pre-Game Match ID');
export const seasonIDSchema = weakUUIDSchema.describe('Season ID');
export const mapIDSchema = z.string().describe('Map ID');
export const queueIDSchema = z.string().describe('Queue ID');
export const characterIDSchema = weakUUIDSchema.describe('Character ID');
export const cardIDSchema = weakUUIDSchema.describe('Card ID');
export const titleIDSchema = weakUUIDSchema.describe('Title ID');
export const preferredLevelBorderIDSchema = weakUUIDSchema.or(z.literal('')).describe('Preferred Level Border ID');
export const xpModificationIDSchema = z.string().describe('XP Modification ID');
export const itemIDSchema = weakUUIDSchema.describe('Item ID');
export const itemTypeIDSchema = weakUUIDSchema.describe('Item Type ID');
export const armorIDSchema = weakUUIDSchema.describe('Armor ID');
export const currencyIDSchema = weakUUIDSchema.describe('Currency ID');
export const partyIDSchema = weakUUIDSchema.describe('Party ID');
export const gameModeSchema = z.string().describe('Game Mode');

export const dateSchema = z.string().datetime().transform(val => new Date(val)).describe('Date in ISO 8601 format');
export const millisSchema = z.number().transform(val => new Date(val)).describe('Milliseconds since epoch');

export const platformSchema = z.object({
  platformType: z.literal('PC'),
  platformOS: z.literal('Windows'),
  platformOSVersion: z.string(),
  platformChipset: z.literal('Unknown'),
});
