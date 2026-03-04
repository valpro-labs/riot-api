import { z } from 'zod';

export const CurrentGameQuitSchema = z.any();

export type CurrentGameQuitResponse = z.input<typeof CurrentGameQuitSchema>;
