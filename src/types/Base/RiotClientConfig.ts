import { IAuthProvider } from './IAuthProvider';
import { IVersionProvider } from './IVersionProvider';
import { IResponseParser } from './IResponseParser';

export interface RiotClientConfig {
  authProvider: IAuthProvider;
  versionProvider: IVersionProvider;
  responseParser?: IResponseParser;
}
