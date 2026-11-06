// A hymn version whose words are written out from another version the first time they are read, then kept.
// The app gives thousands of hymns Coptic in English letters, Coptic in Arabic letters and English in Arabic letters;
// writing them all out while the app opened took seconds on a phone (2026-11-06), so each is written out only when
// someone opens that hymn (or searches). The text it is made from is taken now, so it is what it would have been.
export function withLazyText<T extends { language: string; text?: string }>(version: Omit<T, 'text'>, write: () => string): T {
  // (many hymns are copies of others, so the same words are often written out once for all of them: see writtenOnce)
  let text: string | undefined;
  Object.defineProperty(version, 'text', {
    get: () => (text ??= write()),
    // Words set later belong to this version alone (a copy made with copyVersion keeps its own)
    set(this: object, value: string) {
      Object.defineProperty(this, 'text', { value, writable: true, enumerable: true, configurable: true });
    },
    enumerable: true,
    configurable: true,
  });
  return version as T;
}

// A copy of a version that does not write out its words to copy them (a spread, { ...version }, would)
export const copyVersion = <T extends object>(version: T): T => Object.defineProperties({}, Object.getOwnPropertyDescriptors(version)) as T;

// The same text written out the same way only once (a hymn's copies in other services and seasons share it)
const written = new Map<string, string>();
export const writtenOnce = (kind: string, source: string, write: (text: string) => string) => {
  const key = `${kind}\u0000${source}`;
  let text = written.get(key);
  if (text === undefined) written.set(key, (text = write(source)));
  return text;
};
