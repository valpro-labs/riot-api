import { z } from 'zod';
import { playerUUIDSchema, weakUUIDSchema } from '../Shared/Common';

export const GunCommonSchema = z.object({
  SkinID: weakUUIDSchema,
  SkinLevelID: weakUUIDSchema,
  ChromaID: weakUUIDSchema,
  Attachments: z.array(z.unknown()),
});
export type GunCommon = z.input<typeof GunCommonSchema>;

export const LoadoutGunSchema = z.object({
  ID: weakUUIDSchema,
  CharmInstanceID: weakUUIDSchema.optional(),
  CharmID: weakUUIDSchema.optional(),
  CharmIDLevelID: weakUUIDSchema.optional(),
}).merge(GunCommonSchema);
export type LoadoutGun = z.input<typeof LoadoutGunSchema>;

export const LoadoutSpraySchema = z.object({
  EquipSlotID: weakUUIDSchema,
  SprayID: weakUUIDSchema,
  SprayLevelID: z.null(),
});
export type LoadoutSpray = z.input<typeof LoadoutSpraySchema>;

export const LoadoutIdentitySchema = z.object({
  PlayerCardID: weakUUIDSchema,
  PlayerTitleID: weakUUIDSchema,
  AccountLevel: z.number(),
  PreferredLevelBorderID: weakUUIDSchema,
  HideAccountLevel: z.boolean(),
});
export type LoadoutIdentity = z.input<typeof LoadoutIdentitySchema>;

export const PlayerLoadoutSchema = z.object({
  Subject: playerUUIDSchema,
  Version: z.number(),
  Guns: z.array(LoadoutGunSchema),
  Sprays: z.array(LoadoutSpraySchema),
  Identity: LoadoutIdentitySchema,
  Incognito: z.boolean(),
});


export type PlayerLoadoutResponse = z.input<typeof PlayerLoadoutSchema>;
