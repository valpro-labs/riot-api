import { z } from 'zod';
import { playerUUIDSchema, weakUUIDSchema } from '../Shared/Common';

export const GunCommonSchema = z.object({
  SkinID: weakUUIDSchema,
  SkinLevelID: weakUUIDSchema,
  ChromaID: weakUUIDSchema,
  Attachments: z.array(z.unknown()),
});
export type GunCommon = z.infer<typeof GunCommonSchema>;

export const LoadoutGunSchema = z.object({
  ID: weakUUIDSchema,
  CharmInstanceID: weakUUIDSchema.optional(),
  CharmID: weakUUIDSchema.optional(),
  CharmIDLevelID: weakUUIDSchema.optional(),
}).merge(GunCommonSchema);
export type LoadoutGun = z.infer<typeof LoadoutGunSchema>;

export const LoadoutSpraySchema = z.object({
  EquipSlotID: weakUUIDSchema,
  SprayID: weakUUIDSchema,
  SprayLevelID: z.null(),
});
export type LoadoutSpray = z.infer<typeof LoadoutSpraySchema>;

export const LoadoutIdentitySchema = z.object({
  PlayerCardID: weakUUIDSchema,
  PlayerTitleID: weakUUIDSchema,
  AccountLevel: z.number(),
  PreferredLevelBorderID: weakUUIDSchema,
  HideAccountLevel: z.boolean(),
});
export type LoadoutIdentity = z.infer<typeof LoadoutIdentitySchema>;

export const PlayerLoadoutSchema = z.object({
  Subject: playerUUIDSchema,
  Version: z.number(),
  Guns: z.array(LoadoutGunSchema),
  Sprays: z.array(LoadoutSpraySchema),
  Identity: LoadoutIdentitySchema,
  Incognito: z.boolean(),
});


export type PlayerLoadoutResponse = z.infer<typeof PlayerLoadoutSchema>;
