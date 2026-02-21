/**
 * Adapted from insomnia-plugin-valorant
 * @see https://github.com/techchrism/insomnia-plugin-valorant
 * * Refactored for React Native:
 * - Replaced Node.js 'Buffer' with 'jwt-decode'
 * - Adjusted URL fragment parsing for cross-platform compatibility
 */

import { jwtDecode } from 'jwt-decode';

import { AuthRedirectData } from '../interfaces/IAuthProvider';

interface JWTPayload {
  sub: string;
  [key: string]: any;
}

function throwExpression(errorMessage: string): never {
  throw new Error(errorMessage);
}

export function parseAuthRedirect(url: string): AuthRedirectData {
  const parsedUrl = new URL(url);
  const hash = parsedUrl.hash.startsWith('#') ? parsedUrl.hash.slice(1) : parsedUrl.hash;
  const searchParams = new URLSearchParams(hash);

  const accessToken = searchParams.get('access_token') ?? throwExpression('Access token missing from url');
  const idToken = searchParams.get('id_token') ?? throwExpression('Entitlement missing from url');
  const expiresIn = searchParams.get('expires_in') ?? throwExpression('Expiry missing from url');

  const decoded = jwtDecode<JWTPayload>(accessToken);

  if (!decoded.sub) {
    throw new Error('Invalid access token, missing sub');
  }

  return {
    accessToken,
    idToken,
    expiresAt: (Number(expiresIn) * 1000) + Date.now() - 60_000,
    puuid: decoded.sub
  };
}