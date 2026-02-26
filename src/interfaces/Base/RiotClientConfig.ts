import { IAuthProvider } from './IAuthProvider';
import { IVersionProvider } from './IVersionProvider';

export interface RiotClientConfig {
    authProvider: IAuthProvider;
    versionProvider: IVersionProvider;
}
