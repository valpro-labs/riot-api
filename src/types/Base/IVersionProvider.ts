export interface IVersionProvider {
  getRiotClientVersion(): Promise<string>;
}
