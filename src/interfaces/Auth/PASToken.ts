import { z } from 'zod';

export const PASTokenSchema = z.string();

export type PASTokenResponse = z.input<typeof PASTokenSchema>;
