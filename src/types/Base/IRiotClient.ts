import { AxiosRequestConfig } from 'axios';
import { Region } from '../Shared/ValorantType';
import { IAuthProvider } from './IAuthProvider';

export interface IRiotClient {
  getAuthProvider(): IAuthProvider;
  request<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  requestPD<T>(region: Region, resource: string, config?: AxiosRequestConfig): Promise<T>;
  requestShared<T>(region: Region, resource: string, config?: AxiosRequestConfig): Promise<T>;
  requestGLZ<T>(region: Region, resource: string, config?: AxiosRequestConfig): Promise<T>;
}
