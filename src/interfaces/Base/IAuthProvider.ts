export interface AuthRedirectData {
    accessToken: string;
    idToken: string;
    expiresAt: number;
    puuid: string;
}

export interface IAuthProvider {
    getAuthData(): Promise<AuthRedirectData | null>;
}
