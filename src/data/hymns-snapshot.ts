import type { DeaconCategory, Hymn, LanguageVersion, Season } from './hymn-types';
import { lazySourceOf, LazyKind, withLazyText, Writers } from './lazy-text';

// The hymns saved as they are built (scripts/hymns-snapshot.ts), so the app loads them instead of building them while
// it opens. A version written out from another one (Coptic in English letters...) is saved as what it is made from,
// and is written out again only when it is read (see lazy-text.ts).

export type HymnsData = {
  seasons: Season[];
  deaconCategories: DeaconCategory[];
  openingArabicTitles: Record<string, string>;
};

// Every text is saved once, in a list, and a version keeps its place in it (a hymn's copies in other services and
// seasons share their words: 4 million characters instead of 17). A lazy version is saved as [kind] when it is made
// from the same hymn's Coptic or English as saved, else [kind, place of the text it is made from].
type SavedVersion = Omit<LanguageVersion, 'text'> & { text?: number; $lazy?: [LazyKind] | [LazyKind, number] };
type Saved = { texts: string[]; seasons: Season[]; deaconCategories: DeaconCategory[]; openingArabicTitles: Record<string, string> };
const madeFrom: Record<LazyKind, LanguageVersion['language']> = { englishCoptic: 'coptic', arabicCoptic: 'coptic', arabicEnglish: 'english' };
const plainText = (versions: LanguageVersion[], language: LanguageVersion['language']) => {
  const version = versions.find((v) => v.language === language);
  const descriptor = version && Object.getOwnPropertyDescriptor(version, 'text');
  return descriptor && !descriptor.get ? (descriptor.value as string) : undefined;
};

const eachVersionList = (data: { seasons: Season[]; deaconCategories: DeaconCategory[] }, visit: (versions: LanguageVersion[]) => LanguageVersion[]) => {
  const walk = (hymns: Hymn[]) => {
    for (const hymn of hymns) {
      hymn.versions = visit(hymn.versions);
      if (hymn.bishop) hymn.bishop = visit(hymn.bishop);
      if (hymn.children) walk(hymn.children);
    }
  };
  for (const group of [...data.seasons, ...data.deaconCategories]) for (const service of group.services) walk(service.hymns);
};

// The text to save: lazy versions are saved without writing them out
export function toSnapshot(data: HymnsData): string {
  const texts: string[] = [];
  const places = new Map<string, number>();
  const placeOf = (text: string) => {
    let place = places.get(text);
    if (place === undefined) places.set(text, (place = texts.push(text) - 1));
    return place;
  };
  const saveVersion = (version: LanguageVersion, versions: LanguageVersion[]): SavedVersion => {
    const saved = {} as SavedVersion;
    for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(version)))
      if (key !== 'text' && descriptor.enumerable) (saved as Record<string, unknown>)[key] = descriptor.value;
    const source = lazySourceOf(version);
    if (!source) saved.text = placeOf(version.text);
    else saved.$lazy = plainText(versions, madeFrom[source[0]]) === source[1] ? [source[0]] : [source[0], placeOf(source[1])];
    return saved;
  };
  const body = JSON.stringify(data, (key, value) =>
    (key === 'versions' || key === 'bishop') && Array.isArray(value)
      ? value.map((v: LanguageVersion, _i: number, all: LanguageVersion[]) => saveVersion(v, all))
      : value
  );
  // the list of texts goes first, so it is there when the hymns are read back
  return `{"texts":${JSON.stringify(texts)},${body.slice(1)}`;
}

export function fromSnapshot(json: string, writers: Writers): HymnsData {
  const { texts, ...data } = JSON.parse(json) as Saved;
  eachVersionList(data, (versions) => {
    const saved = versions as unknown as SavedVersion[];
    // the words first, so a lazy version finds the Coptic or English it is made from
    for (const version of saved) if (typeof version.text === 'number') (version as unknown as LanguageVersion).text = texts[version.text];
    return saved.map((version) => {
      if (!version.$lazy) return version as unknown as LanguageVersion;
      const [kind, place] = version.$lazy;
      delete version.$lazy;
      const source = place !== undefined ? texts[place] : (plainText(versions, madeFrom[kind]) ?? '');
      return withLazyText<LanguageVersion>(version as Omit<LanguageVersion, 'text'>, kind, source, writers[kind]);
    });
  });
  return data;
}
