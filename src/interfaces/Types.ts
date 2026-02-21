import { z } from 'zod';

import { matchDetailsEndpoint, competitiveUpdatesEndpoint } from 'valorant-api-types';

const MatchPlayerSchema = matchDetailsEndpoint.responses[200].shape.players.element;
export type MatchPlayer = z.input<typeof MatchPlayerSchema>;

const CompetitiveMatchSchema = competitiveUpdatesEndpoint.responses[200].shape.Matches.element
export type CompetitiveMatch = z.input<typeof CompetitiveMatchSchema>;