import {
  createCookieString,
  parseSetCookieString,
  parseCookieString,
  mergeCookies,
  Cookie,
} from '../../src/auth/cookies';

describe('cookies', () => {
  describe('createCookieString', () => {
    it('joins cookies with "; "', () => {
      const cookies: Cookie[] = [
        { name: 'a', value: '1' },
        { name: 'b', value: '2' },
      ];
      expect(createCookieString(cookies)).toBe('a=1; b=2');
    });

    it('returns empty string for empty array', () => {
      expect(createCookieString([])).toBe('');
    });

    it('handles single cookie', () => {
      expect(createCookieString([{ name: 'token', value: 'abc' }])).toBe('token=abc');
    });
  });

  describe('parseSetCookieString', () => {
    it('parses a single Set-Cookie header', () => {
      const result = parseSetCookieString('session=abc123; Path=/; HttpOnly');
      expect(result).toEqual([{ name: 'session', value: 'abc123' }]);
    });

    it('parses multiple Set-Cookie headers joined by comma', () => {
      const result = parseSetCookieString(
        'a=1; Path=/, b=2; Path=/'
      );
      expect(result).toEqual([
        { name: 'a', value: '1' },
        { name: 'b', value: '2' },
      ]);
    });

    it('parses array of Set-Cookie strings', () => {
      const result = parseSetCookieString([
        'x=10; Path=/',
        'y=20; Path=/',
      ]);
      expect(result).toEqual([
        { name: 'x', value: '10' },
        { name: 'y', value: '20' },
      ]);
    });
  });

  describe('parseCookieString', () => {
    it('parses a cookie string into Cookie array', () => {
      const result = parseCookieString('a=1; b=2');
      expect(result).toEqual([
        { name: 'a', value: '1' },
        { name: 'b', value: '2' },
      ]);
    });

    it('handles values containing "="', () => {
      const result = parseCookieString('token=abc=def=ghi');
      expect(result).toEqual([{ name: 'token', value: 'abc=def=ghi' }]);
    });
  });

  describe('mergeCookies', () => {
    it('merges two arrays, b overwrites a on name conflict', () => {
      const a: Cookie[] = [
        { name: 'x', value: 'old' },
        { name: 'y', value: '2' },
      ];
      const b: Cookie[] = [
        { name: 'x', value: 'new' },
        { name: 'z', value: '3' },
      ];
      const result = mergeCookies(a, b);
      expect(result).toEqual([
        { name: 'y', value: '2' },
        { name: 'x', value: 'new' },
        { name: 'z', value: '3' },
      ]);
    });

    it('returns b when a is empty', () => {
      const b: Cookie[] = [{ name: 'a', value: '1' }];
      expect(mergeCookies([], b)).toEqual(b);
    });

    it('returns a when b is empty', () => {
      const a: Cookie[] = [{ name: 'a', value: '1' }];
      expect(mergeCookies(a, [])).toEqual(a);
    });
  });
});
