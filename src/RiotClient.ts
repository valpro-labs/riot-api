import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

import { EntitlementResponse } from './interfaces/Auth/Entitlement';

import type { Region, Shard } from './interfaces/Shared/ValorantType';
import { RiotClientConfig } from './interfaces/Base/RiotClientConfig';
import { IAuthProvider } from './interfaces/Base/IAuthProvider';
import { IVersionProvider } from './interfaces/Base/IVersionProvider';


export class RiotClient {
  private axiosInstance: AxiosInstance;
  private config: RiotClientConfig;
  private entitlements: EntitlementResponse | null = null;
  private entitlementsPromise: Promise<EntitlementResponse> | null = null;
  private entitlementForToken: string | null = null;

  constructor(config: RiotClientConfig) {
    this.config = config;
    this.axiosInstance = axios.create({
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request Interceptor: Inject Access Token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const authData = await this.config.authProvider.getAuthData();
          if (authData) {
            config.headers.Authorization = `Bearer ${authData.accessToken}`;
          }
        } catch (error) {
          console.error('API:Client', 'Failed to get access token', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: Error Handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Basic logging, can be improved or injected via logger interface later
        if (error.response) {
          // No-op or future better error handling
        }
        return Promise.reject(error);
      }
    );
  }

  public getAuthProvider(): IAuthProvider {
    return this.config.authProvider;
  }

  public getVersionProvider(): IVersionProvider {
    return this.config.versionProvider;
  }

  private getShard(region: Region): Shard {
    switch (region) {
      case 'latam':
      case 'br':
      case 'na':
        return 'na';
      case 'pbe':
        return 'na';
      case 'eu':
        return 'eu';
      case 'ap':
        return 'ap';
      case 'kr':
        return 'kr';
      default:
        return region;
    }
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/entitlement)
   */
  private async postEntitlement() {
    return this.request<EntitlementResponse>(
      'https://entitlements.auth.riotgames.com/api/token/v1',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
      }
    );
  }

  // Internal method to get entitlement
  // Accepts the current accessToken so it can auto-invalidate when token changes
  private async getEntitlement(accessToken: string): Promise<EntitlementResponse> {
    if (accessToken !== this.entitlementForToken) {
      this.entitlements = null;
      this.entitlementsPromise = null;
      this.entitlementForToken = accessToken;
    }

    if (this.entitlements) {
      return this.entitlements;
    }

    if (this.entitlementsPromise) {
      return this.entitlementsPromise;
    }

    this.entitlementsPromise = this.postEntitlement()
      .then(response => {
        this.entitlements = response;
        return response;
      })
      .catch(error => {
        this.entitlements = null;
        this.entitlementForToken = null;
        throw error;
      })
      .finally(() => {
        this.entitlementsPromise = null;
      });

    return this.entitlementsPromise;
  }

  private async getAuthHeaders() {
    const authData = await this.config.authProvider.getAuthData();
    if (!authData) {
      throw new Error('No authentication data available');
    }

    const [entitlements, riotClientVersion] = await Promise.all([
      this.getEntitlement(authData.accessToken),
      this.config.versionProvider.getRiotClientVersion(),
    ]);

    return {
      'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
      'X-Riot-ClientVersion': riotClientVersion,
      'X-Riot-Entitlements-JWT': entitlements.entitlements_token,
    };
  }

  // Generic Request Methods

  public async request<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const response = await this.axiosInstance<T>({
      url,
      ...config,
    });
    return response.data;
  }

  public async requestPD<T>(region: Region, resource: Resource, config: AxiosRequestConfig = { method: 'GET' }): Promise<T> {
    const shard = this.getShard(region);
    const url = `https://pd.${shard}.a.pvp.net/${resource}`;

    const authHeaders = await this.getAuthHeaders();

    return this.request<T>(url, {
      ...config,
      headers: {
        ...authHeaders,
        ...config.headers
      }
    });
  }

  public async requestShared<T>(region: Region, resource: Resource, config: AxiosRequestConfig = {}): Promise<T> {
    const shard = this.getShard(region);
    const url = `https://shared.${shard}.a.pvp.net/${resource}`;

    const authHeaders = await this.getAuthHeaders();

    return this.request<T>(url, {
      ...config,
      headers: {
        ...authHeaders,
        ...config.headers
      }
    });
  }

  public async requestGLZ<T>(region: Region, resource: Resource, config: AxiosRequestConfig = {}): Promise<T> {
    const shard = this.getShard(region);
    const url = `https://glz-${region}-1.${shard}.a.pvp.net/${resource}`;

    const authHeaders = await this.getAuthHeaders();

    return this.request<T>(url, {
      ...config,
      headers: {
        ...authHeaders,
        ...config.headers
      }
    });
  }
}

type Resource = string;
