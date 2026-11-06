// What a hymn, a service and a season are (shared by hymns.ts, which the app uses, and hymns-build.ts, which builds them)

export type LanguageType = 'coptic' | 'englishCoptic' | 'arabicCoptic' | 'english' | 'arabicEnglish' | 'englishArabic' | 'arabic';

export interface LanguageVersion {
  language: LanguageType;
  text: string;
  // File name of the recording; see src/data/audio.ts for where it is played from
  audio?: string;
  // More recordings of the same text (e.g. another chanter); the reader lets you pick between them
  otherAudio?: string[];
}

export interface Hymn {
  id: string;
  title: string;
  versions: LanguageVersion[];
  isSectionHeader?: boolean;
  // What is added when the Pope or a bishop is present; the reader shows it folded under the hymn
  bishop?: LanguageVersion[];
  // Makes this item a group (e.g. "Doxologies") that opens its own list instead of the reader
  children?: Hymn[];
}

// Every readable hymn in a list, including those inside groups, in order
export const flattenHymns = (hymns: Hymn[]): Hymn[] =>
  hymns.flatMap((h) => (h.children ? flattenHymns(h.children) : h.isSectionHeader ? [] : [h]));

export interface Service {
  id: string;
  title: string;
  hymns: Hymn[];
}

export interface Season {
  id: string;
  title: string;
  services: Service[];
}

export interface DeaconCategory {
  id: string;
  title: string;
  services: Service[];
}

export interface MainCategory {
  id: string;
  title: string;
  description: string;
  seasons?: Season[];
  deaconCategories?: DeaconCategory[];
}
