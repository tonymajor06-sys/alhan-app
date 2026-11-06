import { copticToArabic } from '../arabic-coptic';
import { englishToArabic } from '../arabic-english';
import { openingArabicTitles } from '../arabic-titles';
import { deaconCategories, seasons } from '../hymns-build';
import { flattenHymns } from '../hymn-types';
import { fromSnapshot, toSnapshot } from '../hymns-snapshot';
import { copticToTasbeha } from '../tasbeha-coptic';

// A release loads the hymns saved by scripts/hymns-snapshot.mjs instead of building them (see hymns.ts): what it loads
// must be every hymn exactly as built, every language written out the same
const canonical = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(canonical)
    : x && typeof x === 'object'
      ? Object.fromEntries(
          Object.keys(x)
            .sort()
            .filter((k) => (x as Record<string, unknown>)[k] !== undefined)
            .map((k) => [k, canonical((x as Record<string, unknown>)[k])])
        )
      : x;

describe('hymns saved for release', () => {
  it('loads every hymn exactly as it is built', () => {
    const built = { seasons, deaconCategories, openingArabicTitles: { ...openingArabicTitles } };
    const saved = toSnapshot(built);
    const loaded = fromSnapshot(saved, { englishCoptic: copticToTasbeha, arabicCoptic: copticToArabic, arabicEnglish: englishToArabic });
    expect(JSON.stringify(canonical(loaded))).toBe(JSON.stringify(canonical(built)));
  });

  it('writes out Coptic in Arabic letters only when it is read', () => {
    const writes: string[] = [];
    const loaded = fromSnapshot(toSnapshot({ seasons, deaconCategories, openingArabicTitles: {} }), {
      englishCoptic: copticToTasbeha,
      arabicCoptic: (text) => (writes.push(text), copticToArabic(text)),
      arabicEnglish: englishToArabic,
    });
    const hymn = flattenHymns(loaded.seasons.flatMap((s) => s.services.flatMap((service) => service.hymns))).find((h) =>
      h.versions.some((v) => v.language === 'arabicCoptic')
    )!;
    const version = hymn.versions.find((v) => v.language === 'arabicCoptic')!;
    expect(Object.getOwnPropertyDescriptor(version, 'text')?.get).toBeDefined();
    const coptic = hymn.versions.find((v) => v.language === 'coptic')!.text;
    expect(version.text).toBe(copticToArabic(coptic));
  });
});
