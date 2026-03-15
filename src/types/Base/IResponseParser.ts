export interface IResponseParser {
  readonly responseType: 'arraybuffer' | 'blob' | 'json' | 'text';
  parse<T>(data: unknown): T | Promise<T>;
}
