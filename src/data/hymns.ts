export type LanguageType = 'coptic' | 'englishCoptic' | 'english' | 'englishArabic' | 'arabic';

export interface LanguageVersion {
  language: LanguageType;
  text: string;
  // File name of the recording; see src/data/audio.ts for where it is played from
  audio?: string;
}

export interface Hymn {
  id: string;
  title: string;
  versions: LanguageVersion[];
  isSectionHeader?: boolean;
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

// Helper to generate numbered deacon responses for each service
const generateDeaconResponses = (categoryPrefix: string, serviceName: string): Hymn[] => {
  return Array.from({ length: 12 }, (_, index) => {
    const num = index + 1;
    return {
      id: `deacon-${categoryPrefix}-${serviceName.toLowerCase().replace(/[\s/]+/g, '-')}-response-${num}`,
      title: `${serviceName} Response #${num}`,
      versions: [
        { language: 'coptic', text: `Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ ${num} - (${serviceName} Coptic Text)` },
        { language: 'englishCoptic', text: `Kurie eleēson ${num} - (${serviceName} Coptic Text)` },
        { language: 'english', text: `Lord have mercy, response number ${num} chanted during the ${serviceName} service.` },
        { language: 'englishArabic', text: `Ya Rab irham, istijaba raqam ${num} fi ${serviceName}...` },
        { language: 'arabic', text: `يا رب ارحم، الاستجابة رقم ${num} لخدمة ${serviceName}.` },
      ],
    };
  });
};

// Helper to generate Hymns for the 15 Seasons
const generateHymns = (seasonId: string, serviceName: string): Hymn[] => {
  const isAnnual = seasonId === 'annual';
  const isDistribution = serviceName.toLowerCase() === 'distribution';
  const isMatins = serviceName.toLowerCase() === 'matins';
  const isMorningPraises = serviceName.toLowerCase() === 'morning praises';

  return Array.from({ length: 12 }, (_, index) => {
    const num = index + 1;
    const isPsalm150 = isAnnual && isDistribution && num === 1;
    const isPiOik = isAnnual && isDistribution && num === 2;
    const isVerseOfCymbals = isAnnual && isMatins && num === 1;
    const isMorningDoxology = isAnnual && isMorningPraises && num === 1;

    if (isMorningDoxology) {
      return {
        id: `${seasonId}-${serviceName.toLowerCase()}-morning-doxology`,
        title: 'Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫ̀ⲓⲱⲧ (Morning Doxology)',
        versions: [
          {
            language: 'coptic',
            text: 'Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ⲭⲉⲣⲉ ϯⲉⲕⲕⲗⲏⲥⲓⲁ: ⲡ̀ⲏⲓ ⲛ̀ⲧⲉ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ.\n\nⲬⲉⲣⲉ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲉ̀ⲧⲁⲥⲙⲉⲥ Ⲡⲉⲛⲥⲱⲧⲏⲣ: ⲭⲉⲣⲉ Ⲅⲁⲃⲣⲓⲏⲗ: ⲉ̀ⲧⲁϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛⲁⲥ.\n\nⲬⲉⲣⲉ Ⲙⲓⲭⲁⲏⲗ: ⲡⲓⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ: ⲭⲉⲣⲉ ⲡⲓϫⲟⲩⲧ ϥ̀ⲧⲟⲟⲩ: ⲙ̀ⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ.\n\nⲬⲉⲣⲉ Ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ: ⲭⲉⲣⲉ Ⲛⲓⲥⲉⲣⲁⲫⲓⲙ: ⲭⲉⲣⲉ ⲛⲓⲧⲁⲅⲙⲁ ⲧⲏⲣⲟⲩ: ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ.\n\nⲬⲉⲣⲉ Ⲓⲱⲁⲛⲛⲏⲥ: ⲡⲓⲛⲓϣϯ ⲙ̀ⲡ̀ⲣⲟⲇⲣⲟⲙⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲙⲏⲧⲥ̀ⲛⲁⲩ: ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ.\n\nⲬⲉⲣⲉ ⲡⲉⲛⲓⲱⲧ Ⲙⲁⲣⲕⲟⲥ: ⲡⲓⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: ⲡⲓⲣⲉϥϫⲱⲣ ⲉ̀ⲃⲟⲗ: ⲛ̀ⲧⲉ ⲛⲓⲓ̀ⲇⲱⲗⲟⲛ.\n\nⲬⲉⲣⲉ Ⲥ̀ⲧⲉⲫⲁⲛⲟⲥ: ⲡⲓϣⲟⲣⲡ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ Ⲅⲉⲱⲣⲅⲓⲟⲥ: ⲡⲓⲥⲓⲟⲩ ⲛ̀ⲧⲉ ϩⲁⲛⲁ̀ⲧⲟⲟⲩⲓ̀.\n\nⲬⲉⲣⲉ ⲡ̀ⲭⲟⲣⲟⲥ ⲧⲏⲣϥ: ⲛ̀ⲧⲉ ⲛⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲁⲃⲃⲁ Ⲁⲛⲧⲱⲛⲓ: ⲛⲉⲙ ⲡⲓϣⲟⲙⲧ Ⲙⲁⲕⲁⲣⲓⲟⲥ.\n\nⲬⲉⲣⲉ ⲡ̀ⲭⲟⲣⲟⲥ ⲧⲏⲣϥ: ⲛ̀ⲧⲉ ⲛⲓⲥ̀ⲧⲁⲩⲣⲟⲫⲟⲣⲟⲥ: ⲭⲉⲣⲉ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲧⲏⲣⲟⲩ: ⲉ̀ⲧⲁϥⲣⲁⲛⲁϥ ⲙ̀Ⲡ̀ϭⲟⲓⲥ.\n\nϨⲓⲧⲉⲛ ⲛⲟⲩⲉⲩⲭⲏ: Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲟⲩⲣⲟ: ⲁ̀ⲣⲓ ⲟⲩⲛⲁⲓ ⲛⲉⲙⲁⲛ: ϧⲉⲛ ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ.\n\n(Ⲉⲑⲃⲉ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅)\n\nⲠⲓⲟⲩⲱⲓⲛⲓ ⲛ̀ⲧⲁⲫ̀ⲙⲏⲓ: ⲫⲏⲉⲧⲉⲣⲟⲩⲱⲓⲛⲓ: ⲉ̀ⲣⲱⲙⲓ ⲛⲓⲃⲉⲛ: ⲉⲑⲛⲏⲟⲩ ⲉ̀ⲡⲓⲕⲟⲥⲙⲟⲥ.\n\nⲀⲕⲓ̀ ⲉ̀ⲡⲓⲕⲟⲥⲙⲟⲥ: ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲙⲁⲓⲣⲱⲙⲓ: ⲁ̀ϯⲕ̀ⲧⲏⲥⲓⲥ ⲧⲏⲣⲥ: ⲑⲉⲗⲏⲗ ϧⲁ ⲡⲉⲕϫⲓⲛⲓ̀.\n\nⲀⲕⲥⲱϯ ⲛ̀Ⲁ̀ⲇⲁⲙ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ ϯⲁ̀ⲡⲁⲧⲏ: ⲁⲕⲉⲣ Ⲉ̀ⲩⲁ ⲛ̀ⲣⲉⲙϩⲉ: ϧⲉⲛ ⲛⲓⲛⲁⲕϩⲓ ⲛ̀ⲧⲉ ⲫ̀ⲙⲟⲩ.\n\nⲀⲕϯ ⲛⲁⲛ ⲙ̀Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ: ⲛ̀ⲧⲉ ϯⲙⲉⲧϣⲏⲣⲓ: ⲉⲛϩⲱⲥ ⲉⲛⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲕ: ⲛⲉⲙ ⲛⲉⲕⲁⲅⲅⲉⲗⲟⲥ.\n\nϦⲉⲛ ⲡ̀ϫⲓⲛⲑ̀ⲣⲉϥⲓ̀ ⲛⲁⲛ ⲉ̀ϧⲟⲩⲛ: ⲛ̀ϫⲉ ⲫ̀ⲛⲁⲩ ⲛ̀ϣⲱⲣⲡ: ⲱ̀ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ: Ⲡⲓⲟⲩⲱⲓⲛⲓ ⲛ̀ⲧⲁⲫ̀ⲙⲏⲓ.\n\nⲘⲁⲣⲟⲩϣⲁⲓ ⲛ̀ϧⲏⲧⲉⲛ: ⲛ̀ϫⲉ ⲛⲓⲗⲟⲅⲓⲥⲙⲟⲥ ⲛ̀ⲧⲉ ⲡⲓⲟⲩⲱⲓⲛⲓ: ⲟⲩⲟϩ ⲙ̀ⲡⲉⲛⲑ̀ⲣⲉϥϩⲟⲃⲥⲧⲉⲛ: ⲛ̀ϫⲉ ⲡ̀ⲭⲁⲕⲓ ⲛ̀ⲛⲓⲡⲁⲑⲟⲥ.\n\nϨⲓⲛⲁ ⲛ̀ⲧⲉⲛϩⲱⲥ ⲉ̀ⲣⲟⲕ: ⲛ̀ⲛⲟⲏ̀ⲧⲟⲥ ⲛⲉⲙ Ⲇⲁⲩⲓⲇ: ⲉⲛⲱϣ ⲟⲩⲃⲏⲕ: ⲟⲩⲟϩ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ.\n\nϪⲉ ⲁⲩⲉⲣϣⲟⲣⲡ ⲙ̀ⲫⲟϩ: ⲛ̀ϫⲉ ⲛⲁⲃⲁⲗ ⲙ̀ⲫ̀ⲛⲁⲩ ⲛ̀ϣⲱⲣⲡ: ⲉ̀ⲉⲣⲙⲉⲗⲉⲧⲁⲛ: ϧⲉⲛ ⲛⲉⲕⲥⲁϫⲓ ⲧⲏⲣⲟⲩ.\n\nⲤⲱⲧⲉⲙ ⲉ̀ⲧⲉⲛⲥ̀ⲙⲏ: ⲕⲁⲧⲁ ⲡⲉⲕⲛⲓϣϯ ⲛ̀ⲛⲁⲓ: ⲛⲁϩⲙⲉⲛ Ⲡ̀ϭⲟⲓⲥ Ⲡⲉⲛⲛⲟⲩϯ: ⲕⲁⲧⲁ ⲛⲉⲕⲙⲉⲧϣⲉⲛϩⲏⲧ.\n\nⲪ̀ⲛⲟⲩϯ Ⲡⲓϥⲁⲓⲣⲱⲟⲩϣ: ⲛ̀ⲣⲉϥⲉⲣⲡⲉⲑⲛⲁⲛⲉϥ: Ⲡⲓⲣⲉϥⲉⲣⲟⲓⲕⲟⲛⲟⲙⲓⲛ: ⲛ̀ⲛⲉϥⲥⲱⲧⲡ ⲛ̀ⲕⲁⲗⲱⲥ.\n\nⲠⲓⲣⲉϥⲉⲣϩⲉⲙⲓ ⲉⲧϫⲟⲣ: ⲛ̀ⲛⲏⲉ̀ⲧⲁⲩⲫⲱⲧ ϩⲁⲣⲟϥ: ⲫ̀ⲣⲉϥϭⲓϣϣⲱⲟⲩ ⲛ̀ⲧⲉ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ: ⲛⲟϩⲉⲙ ⲛ̀ⲧⲟⲩⲟⲩϫⲁⲓ.\n\nϦⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ: ⲁⲕⲥⲟⲃϯ ⲛⲁⲛ ⲙ̀ⲡⲓⲉ̀ϫⲱⲣϩ: ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲁⲓⲉ̀ϩⲟⲟⲩ: ⲉ̀ⲛⲟⲓ ⲛ̀ⲁⲑⲛⲟⲃⲓ.\n\nⲈⲑⲣⲉⲛⲉⲣⲡ̀ⲉⲙⲡ̀ϣⲁ: ⲉ̀ϥⲁⲓ ⲛ̀ⲛⲉⲛϫⲓϫ ⲉ̀ⲡ̀ϣⲱⲓ: ϩⲁⲣⲟⲕ ⲙ̀ⲡⲉⲕⲙ̀ⲑⲟ: ⲭⲱⲣⲓⲥ ϫⲱⲛⲧ ⲛⲉⲙ ⲙⲟⲕⲙⲉⲕ ⲉϥϩⲱⲟⲩ.\n\nϦⲉⲛ ⲧⲁⲓϩⲁⲛⲁⲧⲟⲟⲩⲓ̀: ⲥⲟⲩⲧⲱⲛ ⲛⲉⲛⲙⲱⲓⲧ ⲉ̀ϧⲟⲩⲛ: ⲛⲉⲙ ⲛⲉⲛⲙⲱⲓⲧ ⲉ̀ⲃⲟⲗ: ϧⲉⲛ ⲡ̀ⲟⲩⲛⲟϥ ⲛ̀ⲧⲉ ⲧⲉⲕⲥ̀ⲕⲉⲡⲏ.\n\nⲈⲑⲣⲉⲛϫⲱ ⲛ̀ⲧⲉⲕⲙⲉⲑⲙⲏⲓ: ⲛ̀ⲉ̀ϩⲟⲟⲩ ⲛⲓⲃⲉⲛ: ⲛ̀ⲧⲉⲛϩⲱⲥ ⲉ̀ⲧⲉⲕϫⲟⲙ: ⲛⲉⲙ Ⲇⲁⲩⲓⲇ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ.\n\nϪⲉ ϧⲉⲛ ⲧⲉⲕϩⲓⲣⲏⲛⲏ: Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲥⲱⲧⲏⲣ: ⲁ̀ⲛⲉⲛⲕⲟⲧ ⲁⲛⲧⲱⲟⲩⲛ: ϫⲉ ⲁ̀ⲛⲉⲣϩⲉⲗⲡⲓⲥ ⲉ̀ⲣⲟⲕ.\n\nϨⲏⲡⲡⲉ ⲟⲩⲡⲉⲑⲛⲁⲛⲉϥ: ⲓⲉ ⲟⲩⲡⲉⲧϩⲟⲗϫ ⲉ̀ⲃⲏⲗ: ⲉ̀ⲡ̀ϯⲙⲁϯ ⲛ̀ϩⲁⲛⲥ̀ⲛⲏⲟⲩ: ⲉⲩϣⲟⲡ ϩⲓ ⲟⲩⲙⲁ.\n\nⲈⲩⲉⲣⲥⲩⲙⲫⲱⲛⲓⲛ: ϧⲉⲛ ⲟⲩⲁ̀ⲅⲁⲡⲏ ⲙ̀ⲙⲏⲓ: ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲕⲏ: ⲕⲁⲧⲁ ⲛⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ.\n\nⲘ̀ⲫ̀ⲣⲏϯ ⲙ̀ⲡⲓⲥⲟϫⲉⲛ: ⲉ̀ϯⲁ̀ⲫⲉ ⲙ̀Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲉϥⲛⲏⲟⲩ ⲉ̀ϫⲉⲛ ϯⲙⲟⲣⲧ: ϣⲁ ⲉ̀ϧ̀ⲣⲏⲓ ⲉ̀ⲛⲓϭⲁⲗⲁⲩϫ.\n\nⲈϥⲑⲱϩⲥ ⲙ̀ⲙⲏⲛⲓ ⲛⲓⲃⲉⲛ: ⲛⲓϧⲉⲗⲗⲟⲓ ⲛⲉⲙ ⲛⲓⲁ̀ⲗⲱⲟⲩⲓ̀: ⲛⲉⲙ ⲛⲓϧⲉⲗϣⲓⲣⲓ: ⲛⲉⲙ ⲛⲓⲇⲓⲁⲕⲟⲛⲓⲥⲧⲏⲥ.\n\nⲚⲁⲓ ⲉ̀ⲧⲁϥϩⲟⲧⲡⲟⲩ ⲉⲩⲥⲟⲡ: ⲛ̀ϫⲉ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲟⲩⲕⲩⲑⲁⲣⲁ: ⲉⲩⲥ̀ⲙⲟⲩ ⲉ̀Ⲫ̀ⲛⲟⲩϯ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.\n\nϦⲉⲛ ϩⲁⲛⲯⲁⲗⲙⲟⲥ ⲛⲉⲙ ϩⲁⲛϩⲱⲥ: ⲛⲉⲙ ϩⲁⲛϩⲱⲇⲏ ⲙ̀ⲡ̀ⲛⲉⲩⲙⲁⲧⲓⲕⲟⲛ: ⲙ̀ⲡⲓⲉ̀ϩⲟⲟⲩ ⲛⲉⲙ ⲡⲓⲉ̀ϫⲱⲣϩ: ϧⲉⲛ ⲟⲩϩⲏⲧ ⲛ̀ⲁⲧⲭⲁⲣⲱϥ.\n\n(Ⲉⲑⲃⲉ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ)\n\nⲚ̀ⲑⲟ Ⲑ̀ⲙⲁⲩ ⲙ̀Ⲡⲓⲟⲩⲱⲓⲛⲓ: ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲙ̀Ⲙⲁⲥⲛⲟⲩϯ: ⲁ̀ⲣⲉϥⲁⲓ ϧⲁ Ⲡⲓⲗⲟⲅⲟⲥ: Ⲡⲓⲁ̀ⲭⲱⲣⲓⲧⲟⲥ.\n\nⲘⲉⲛⲉⲛⲥⲁ ⲑ̀ⲣⲉⲙⲁⲥϥ: ⲁ̀ⲣⲉⲟ̀ϩⲓ ⲉ̀ⲣⲉⲟⲓ ⲙ̀ⲡⲁⲣⲑⲉⲛⲟⲥ: ϧⲉⲛ ϩⲁⲛϩⲱⲥ ⲛⲉⲙ ϩⲁⲛⲥ̀ⲙⲟⲩ: ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ.\n\nϪⲉ ⲛ̀ⲑⲟϥ ϧⲉⲛ ⲡⲉϥⲟⲩⲱϣ: ⲛⲉⲙ ⲡ̀ϯⲙⲁϯ ⲙ̀Ⲡⲉϥⲓⲱⲧ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ⲁϥⲓ̀ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.\n\nⲀ̀ⲛⲟⲛ ϩⲱⲛ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.\n\nⲀ̀ ⲡⲓⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ ⲉⲧⲥⲱⲧⲡ: ⲛ̀ⲧⲉ ⲧⲉⲡⲁⲣⲑⲉⲛⲓⲁ: ⲁϥϣⲉⲛⲁϥ ⲉ̀ⲡ̀ϣⲱⲓ: ϣⲁ ⲡⲓⲑ̀ⲣⲟⲛⲟⲥ ⲙ̀Ⲫ̀ⲓⲱⲧ.\n\nⲈ̀ϩⲟⲧⲉ ⲡⲓⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ: ⲛ̀ⲧⲉ Ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ: ⲛⲉⲙ Ⲛⲓⲥⲉⲣⲁⲫⲓⲙ: Ⲙⲁⲣⲓⲁ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ.\n\nⲬⲉⲣⲉ ϯⲫⲉ ⲙ̀ⲃⲉⲣⲓ: ⲑⲏⲉ̀ⲧⲁ Ⲫ̀ⲓⲱⲧ ⲑⲁⲙⲓⲟⲥ: ⲁϥⲭⲁⲥ ⲛ̀ⲟⲩⲙⲁ ⲛ̀ⲉⲙⲧⲟⲛ: ⲙ̀Ⲡⲉϥϣⲏⲣⲓ ⲙ̀ⲙⲉⲛⲣⲓⲧ.\n\nⲬⲉⲣⲉ ⲡⲓⲑ̀ⲣⲟⲛⲟⲥ: ⲙ̀ⲃⲁⲥⲓⲗⲓⲕⲟⲛ: ⲙ̀ⲫⲏⲉ̀ⲧⲟⲩϥⲁⲓ ⲙ̀ⲙⲟϥ: ϩⲓϫⲉⲛ Ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ.\n\nⲬⲉⲣⲉ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ: ⲛ̀ⲧⲉ ⲛⲉⲛⲯⲩⲭⲏ: ⲛ̀ⲑⲟ ⲅⲁⲣ ⲁ̀ⲗⲏⲑⲱⲥ: ⲡⲉ ⲡ̀ϣⲟⲩϣⲟⲩ ⲙ̀ⲡⲉⲛⲅⲉⲛⲟⲥ.\n\nⲀ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲑⲏⲉⲑⲙⲉϩ ⲛ̀ϩ̀ⲙⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲥⲱⲧⲏⲣ: Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ.\n\nϨⲟⲡⲱⲥ ⲛ̀ⲧⲉϥⲧⲁϫⲣⲟⲛ: ϧⲉⲛ ⲡⲓⲛⲁϩϯ ⲉⲧⲥⲟⲩⲧⲱⲛ: ⲟⲩⲟϩ ⲛ̀ⲧⲉϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(Ⲉⲑⲃⲉ Ⲛⲓⲁⲅⲅⲉⲗⲟⲥ)\n\nϨⲁⲛⲁⲛ̀ϣⲟ ⲛ̀ϣⲟ: ⲛⲉⲙ ϩⲁⲛⲑ̀ⲃⲁ ⲛ̀ⲑ̀ⲃⲁ: ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ: ⲛⲉⲙ ⲁⲅⲅⲉⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ.\n\nⲈⲩⲟ̀ϩⲓ ⲉ̀ⲣⲁⲧⲟⲩ: ⲙ̀ⲡⲉⲙ̀ⲑⲟ ⲙ̀ⲡⲓⲑ̀ⲣⲟⲛⲟⲥ: ⲛ̀ⲧⲉ Ⲡⲓⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ: ⲉⲩⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲩϫⲱ ⲙ̀ⲙⲟⲥ.\n\nϪⲉ ⲭ̀ⲟⲩⲁⲃ ⲭ̀ⲟⲩⲁⲃ: ⲭ̀ⲟⲩⲁⲃ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ: ⲡⲓⲱ̀ⲟⲩ ⲛⲉⲙ ⲡⲓⲧⲁⲓⲟ: ⲉⲣⲡ̀ⲣⲉⲡⲓ ⲛ̀Ϯⲧ̀ⲣⲓⲁⲥ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ ⲡ̀ⲭⲟⲣⲟⲥ ⲧⲏⲣϥ ⲛ̀ⲧⲉ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(Ⲉⲑⲃⲉ Ⲛⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ)\n\nⲚⲉⲛⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲁⲩϩⲓⲱⲓϣ ϧⲉⲛ ⲛⲓⲉⲑⲛⲟⲥ: ϧⲉⲛ ⲡⲓⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ: ⲛ̀ⲧⲉ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ.\n\nⲀ̀ ⲡⲟⲩϧ̀ⲣⲱⲟⲩ ϣⲉⲛⲁϥ: ϩⲓϫⲉⲛ ⲡ̀ⲕⲁϩⲓ ⲧⲏⲣϥ: ⲟⲩⲟϩ ⲛⲟⲩⲥⲁϫⲓ ⲁⲩⲫⲟϩ: ϣⲁ ⲁⲩⲣⲏϫⲥ ⲛ̀ϯⲟⲓⲕⲟⲩⲙⲉⲛⲏ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ: ⲛ̀ⲧⲉ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(Ⲉⲑⲃⲉ Ⲛⲓⲙⲁⲣⲧⲩⲣⲟⲥ)\n\nϨⲁⲛⲭ̀ⲗⲟⲙ ⲛ̀ⲁⲧⲗⲱⲙ: ⲁϥⲧⲏⲓⲧⲟⲩ ⲛ̀ϫⲉ Ⲡ̀ϭⲟⲓⲥ: ϩⲓϫⲉⲛ ⲡ̀ⲭⲟⲣⲟⲥ ⲧⲏⲣϥ: ⲛ̀ⲧⲉ ⲛⲓⲙⲁⲣⲧⲩⲣⲟⲥ.\n\nⲀϥⲧⲟⲩϫⲱⲟⲩ ⲁϥⲛⲁϩⲙⲟⲩ: ϫⲉ ⲁⲩⲫⲱⲧ ϩⲁⲣⲟϥ: ⲁⲩⲉⲣϣⲁⲓ ⲛⲉⲙⲁϥ: ϧⲉⲛ ⲧⲉϥⲙⲉⲧⲟⲩⲣⲟ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ: ⲛ̀ⲧⲉ ⲡ̀ⲭⲟⲣⲟⲥ ⲧⲏⲣϥ ⲛ̀ⲧⲉ ⲛⲓⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(Ⲉⲑⲃⲉ Ⲛⲏⲉⲑⲟⲩⲁⲃ)\n\nⲚⲏⲉⲑⲟⲩⲁⲃ ⲛ̀ⲧⲁⲕ: ⲉⲩⲉ̀ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲕ: ⲉⲩⲉ̀ⲥⲁϫⲓ ⲙ̀ⲡ̀ⲱ̀ⲟⲩ: ⲛ̀ⲧⲉ ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ.\n\nⲦⲉⲕⲙⲉⲧⲟⲩⲣⲟ Ⲡⲁⲛⲟⲩϯ: ⲟⲩⲙⲉⲧⲟⲩⲣⲟ ⲛ̀ⲉ̀ⲛⲉϩ: ⲟⲩⲟϩ ⲧⲉⲕⲙⲉⲧϭⲟⲓⲥ: ϣⲁ ⲛⲓⲅⲉⲛⲉⲁ̀ ⲧⲏⲣⲟⲩ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ: ⲛ̀ⲧⲉ ⲡ̀ⲭⲟⲣⲟⲥ ⲧⲏⲣϥ ⲛ̀ⲧⲉ ⲛⲓⲥ̀ⲧⲁⲩⲣⲟⲫⲟⲣⲟⲥ: ⲛⲉⲙ ⲛⲓⲑ̀ⲙⲏⲓ ⲛⲉⲙ ⲛⲓⲇⲓⲕⲉⲟⲥ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(Ⲉⲑⲃⲉ Ⲛⲓⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ ⲛⲉⲙ Ⲛⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ)\n\nⲬⲉⲣⲉ Ⲏ̀ⲗⲓⲁⲥ: ⲡⲓⲥⲟⲫⲣⲟⲛ ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲏⲥ: ⲛⲉⲙ Ⲉ̀ⲗⲓⲥⲉⲟⲥ: ⲡⲉϥⲥⲱⲧⲡ ⲙ̀ⲙⲁⲑⲏⲧⲏⲥ.\n\nⲠⲓⲛⲓϣϯ ⲛ̀ⲣⲉϥϩⲓⲱⲓϣ: ϧⲉⲛ ϯⲭⲱⲣⲁ ⲛ̀ⲧⲉ Ⲭⲏⲙⲓ: Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲡⲉⲥϣⲟⲣⲡ ⲛ̀ⲣⲉϥⲉⲣϩⲉⲙⲓ.\n\nⲚ̀ⲑⲟ ⲡⲉ Ⲑ̀ⲙⲁⲩ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: Ⲙⲁⲣⲓⲁ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲧⲱⲃϩ ⲙ̀ⲙⲟϥ ⲉ̀ϫⲱⲛ: ⲉⲑⲣⲉϥⲛⲁⲓ ϧⲁ ⲡⲉⲛⲅⲉⲛⲟⲥ.\n\nⲠⲓⲛⲓϣϯ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: ⲡⲉⲛⲓⲱⲧ ⲁⲃⲃⲁ Ⲥⲉⲩⲏⲣⲟⲥ: ⲫⲏⲉ̀ⲧⲁ ⲛⲉϥⲥ̀ⲃⲱⲟⲩⲓ̀ ⲉⲑⲟⲩⲁⲃ: ⲉⲣⲟⲩⲱⲓⲛⲓ ⲙ̀ⲡⲉⲛⲛⲟⲩⲥ.\n\nⲠⲉⲛⲓⲱⲧ ⲛ̀ⲟ̀ⲙⲟⲗⲟⲅⲓⲧⲏⲥ: ⲁⲃⲃⲁ Ⲇⲓⲟⲥⲕⲟⲣⲟⲥ: ⲁϥⲙⲓϣⲓ ⲉ̀ϫⲉⲛ ⲡⲓⲛⲁϩϯ: ⲟⲩⲃⲉ ⲛⲓϩⲉⲣⲉⲧⲓⲕⲟⲥ.\n\nⲚⲉⲙ ⲛⲉⲛⲓⲟϯ ⲧⲏⲣⲟⲩ: ⲉ̀ⲧⲁⲩⲣⲁⲛⲁϥ ⲙ̀Ⲡ̀ϭⲟⲓⲥ: ⲉ̀ⲣⲉ ⲡⲟⲩⲥ̀ⲙⲟⲩ ⲉⲑⲟⲩⲁⲃ: ϣⲱⲡⲓ ⲛⲁⲛ ⲛ̀ⲟⲩⲣⲉϥⲣⲱⲓⲥ.\n\nϨⲓⲧⲉⲛ ⲛⲟⲩⲉⲩⲭⲏ: ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ Ⲫ̀ⲛⲟⲩϯ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ: ⲙⲟⲓ ⲛⲁⲛ ⲛ̀ⲟⲩⲥⲱϯ.',
          },
          {
            language: 'englishCoptic',
            text: 'Tenouōsht em-Efiōt nem Epshēri: nem Pi-epneuma ethouab: khere tiekklēsia: epēi ente niaggelos.\n\nKhere Tiparthenos: etasmes Pensōtēr: khere Gabriēl: etafhishennoufi nas.\n\nKhere Mikhaēl: piarkhēaggelos: khere pijout eftoou: emepresvuteros.\n\nKhere Nikherouvim: khere Niserafim: khere nitagma tērou: enepouranion.\n\nKhere Iōannēs: pinishti emeprodromos: khere pimētesnau: enapostolos.\n\nKhere peniōt Markos: pieuaggelistēs: pirefjōr evol: ente ni-idōlon.\n\nKhere Estefanos: pishorp emmarturos: khere Geōrgios: pisiou ente hanatoou-i.\n\nKhere epkhoros tērf: ente nimarturos: khere abba Antōni: nem pishomt Makarios.\n\nKhere epkhoros tērf: ente ni-estauroforos: khere nēethouab tērou: etafranaf em-Eptshois.\n\nHiten noueukhē: Pi-ekhristos Penouro: ari ounai neman: khen tekmetouro.\n\n(Ethve Pentshois Iēsous Pikhristos)\n\nPiouōini enta-efmēi: fēeterouōini: erōmi niven: ethnēou epikosmos.\n\nAki epikosmos: hiten tekmetmairōmi: ati-ektēsis tērs: thelēl kha pekjini.\n\nAksōti en-Adam: evol khen ti-apatē: aker Eua enremhe: khen ninakhi ente efmou.\n\nAkti nan em-Pi-epneuma: ente timetshēri: enhōs enesmou erok: nem nekaggelos.\n\nKhen epjinethrefi nan ekhoun: enje efnau enshōrp: ō Pi-ekhristos Pennouti: Piouōini enta-efmēi.\n\nMaroushai enkhēten: enje nilogismos ente piouōini: ouoh empenethrefhobsten: enje epkhaki ennipathos.\n\nHina entenhōs erok: enno-ētos nem Dauid: enōsh ouvēk: ouoh enjō emmos.\n\nJe auershorp emfoh: enje naval emefnau enshōrp: eermeletan: khen neksaji tērou.\n\nSōtem etenesmē: kata peknishti ennai: nahmen Eptshois Pennouti: kata nekmetshenhēt.\n\nEfnouti Pifairōoush: enreferpethnanef: Pireferoikonomin: ennefsōtp enkalōs.\n\nPireferhemi etjor: ennē-etaufōt harof: efreftshishshōou ente ouon niven: nohem entououjai.\n\nKhen tekmetekhrēstos: aksobti nan empi-ejōrh: ari-ehmot nan empai-ehoou: enoi enathnovi.\n\nEthrenerepemepsha: efai ennenjij e-epshōi: harok empekemtho: khōris jōnt nem mokmek efhōou.\n\nKhen taihanatoou-i: soutōn nenmōit ekhoun: nem nenmōit evol: khen epounof ente tekeskepē.\n\nEthrenjō entekmethmēi: enehoou niven: entenhōs etekjom: nem Dauid pi-eprofētēs.\n\nJe khen tekhirēnē: Pi-ekhristos Pensōtēr: anenkot antōoun: je anerhelpis erok.\n\nHēppe oupethnanef: ie oupetholj evēl: e-eptimati enhanesnēou: eushop hi ouma.\n\nEuersumfōnin: khen ou-agapē emmēi: eneuaggelikē: kata ni-apostolos.\n\nEmefrēti empisojen: eti-afe em-Pi-ekhristos: efnēou ejen timort: sha e-ekhrēi enitshalauj.\n\nEfthōhs emmēni niven: nikhelloi nem ni-alōou-i: nem nikhelshiri: nem nidiakonistēs.\n\nNai etafhotpou eusop: enje Pi-epneuma ethouab: emefrēti enoukuthara: eu-esmou e-Efnouti ensēou niven.\n\nKhen hanpsalmos nem hanhōs: nem hanhōdē emepneumatikon: empi-ehoou nem pi-ejōrh: khen ouhēt enatkharōf.\n\n(Ethve Tiparthenos)\n\nEntho Ethmau em-Piouōini: ettaiēout em-Masnouti: arefai kha Pilogos: Pi-akhōritos.\n\nMenensa ethremasf: are-ohi ereoi emparthenos: khen hanhōs nem hanesmou: tentshisi emmo.\n\nJe enthof khen pefouōsh: nem eptimati em-Pefiōt: nem Pi-epneuma ethouab: afi afsōti emmon.\n\nAnon hōn tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.\n\nA pi-esthoinoufi etsōtp: ente teparthenia: afshenaf e-epshōi: sha pi-ethronos em-Efiōt.\n\nEhote pi-esthoinoufi: ente Nikherouvim: nem Niserafim: Maria Tiparthenos.\n\nKhere tife emveri: thē-eta Efiōt thamios: afkhas enouma enemton: em-Pefshēri emmenrit.\n\nKhere pi-ethronos: emvasilikon: emfē-etoufai emmof: hijen Nikherouvim.\n\nKhere ti-eprostatēs: ente nenpsukhē: entho gar alēthōs: pe epshoushou empengenos.\n\nAri-epresveuin ejōn: ō thēethmeh enehmot: nahren Pensōtēr: Pentshois Iēsous Pi-ekhristos.\n\nHopōs enteftajron: khen pinahti etsoutōn: ouoh enteferehmot nan: empikhō evol ente nennovi.\n\nHiten ni-epresvia: ente Tithe-otokos ethouab Maria: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(Ethve Niaggelos)\n\nHana-ensho ensho: nem hanethva enethva: enarkhēaggelos: nem aggelos ethouab.\n\nEu-ohi eratou: empe-emtho empi-ethronos: ente Pipantokratōr: euōsh evol eujō emmos.\n\nJe ekhouab ekhouab: ekhouab khen oumethmēi: pi-ōou nem pitaio: ereprepi en-Ti-etrias.\n\nHiten ni-epresvia: ente epkhoros tērf ente niaggelos: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(Ethve Ni-apostolos)\n\nNenioti enapostolos: auhiōish khen niethnos: khen pieuaggelion: ente Iēsous Pi-ekhristos.\n\nA pou-ekhrōou shenaf: hijen epkahi tērf: ouoh nousaji aufoh: sha aurējs entioikoumenē.\n\nHiten nieukhē: ente natshois enioti enapostolos: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(Ethve Nimarturos)\n\nHanekhlom enatlōm: aftēitou enje Eptshois: hijen epkhoros tērf: ente nimarturos.\n\nAftoujōou afnahmou: je aufōt harof: auershai nemaf: khen tefmetouro.\n\nHiten nieukhē: ente epkhoros tērf ente nimarturos: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(Ethve Nēethouab)\n\nNēethouab entak: eu-e-esmou erok: eu-esaji emepōou: ente tekmetouro.\n\nTekmetouro Panouti: oumetouro eneneh: ouoh tekmettshois: sha nigene-a tērou.\n\nHiten nieukhē: ente epkhoros tērf ente ni-estauroforos: nem ni-ethmēi nem nidikeos: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(Ethve Nipatriarkhēs nem Ni-eprofētēs)\n\nKhere Ēlias: pisofron emeprofētēs: nem Eliseos: pefsōtp emmathētēs.\n\nPinishti enrefhiōish: khen tikhōra ente Khēmi: Markos pi-apostolos: pesshorp enreferhemi.\n\nEntho pe Ethmau em-Efnouti: Maria Tiparthenos: tōbh emmof ejōn: ethrefnai kha pengenos.\n\nPinishti empatriarkhēs: peniōt abba Seuēros: fē-eta nefesvōou-i ethouab: erouōini empennous.\n\nPeniōt enomologitēs: abba Dioskoros: afmishi ejen pinahti: ouve niheretikos.\n\nNem nenioti tērou: etauranaf em-Eptshois: ere pou-esmou ethouab: shōpi nan enourefrōis.\n\nHiten noueukhē: ari-ehmot nan Efnouti: empikhō evol ente nennovi: moi nan enousōti.',
          },
          {
            language: 'english',
            text: 'We worship the Father and the Son, and the Holy Spirit, hail to the church, the house of the angels.\n\nHail to the Virgin, who gave birth to our Savior, hail to Gabriel, who announced to her the good news.\n\nHail to Michael, the archangel, hail to the twenty four, presbyters.\n\nHail to the Cherubim, hail to the Seraphim, hail to all the hosts, of the heavens.\n\nHail to John, the great forerunner, hail to the, twelve Apostles.\n\nHail to our father Mark, the Evangelist, the destroyer, of the idols.\n\nHail to Stephen, the first martyr, hail to George, the morning star.\n\nHail to the whole choir, of the martyrs, hail to Abba Antony, and the three Macarii.\n\nHail to the whole choir, of the cross-bearers, hail to all the saints, who have pleased the Lord.\n\nThrough their prayers, O Christ our King, have mercy upon us, in Your kingdom.\n\n(For Our Lord Jesus Christ)\n\nO true Light, that gives light, to every man, that comes into the world.\n\nYou came into the world, through Your love for man, and all the creation, rejoiced at Your coming.\n\nYou have saved Adam, from seduction, and delivered Eve, from the pangs of death.\n\nYou gave unto us, the Spirit of sonship, we praise and bless You, with Your angels.\n\nWhen the morning hour, comes upon us, O Christ our God, the true Light.\n\nLet the thought of light, shine within us, and do not let the darkness, of pain cover us.\n\nThat we may praise You, with understanding, proclaiming and saying, with David.\n\n"My eyes have reached, the morning watch, that I may meditate, upon all Your words."\n\nHear our voices, according to Your great mercy, save us O Lord our God, according to Your compassion.\n\nO caring God, the Maker of all good things, who governs well, with His chosen ones.\n\nThe strong Governor for those, who take refuge in Him, who longs for the salvation, and deliverance of everyone.\n\nThrough Your goodness, You provided us the night, grant us to pass, this day without sin.\n\nThat we may be worthy, to lift up our hands, before You without anger, or evil thoughts.\n\nAt this dawn, make straight our coming in, and our going out, in the joy of Your protection.\n\nThat we may proclaim, Your righteousness daily, and praise Your power, with David the prophet.\n\nSaying "In Your peace, O Christ our Savior, we slept and arose, for we have hoped in You.\n\nBehold how beneficent, and how pleasant, it is for brethren, to dwell together in unity."\n\nUnited, in the true, evangelic love, like the Apostles.\n\nIt is like the fragrant oil, on the head of Christ, running down the beard, down to the feet.\n\nThat anoints every day, the elders, the children and young men, and the deacons.\n\nThose whom the Holy Spirit, has attuned together, as a stringed instrument, always blessing God.\n\nBy psalms and hymns, and spiritual songs, by day and by night, with an incessant heart.\n\n(For the Virgin)\n\nYou are the Mother of the Light, the honored Mother of God, you have carried, the Uncircumscript Logos.\n\nAfter you gave birth to Him, you remained a virgin, with praises and blessings, we magnify you.\n\nFor of His own will, and the pleasure of His Father, and the Holy Spirit, He came and saved us.\n\nAnd we too, hope to win mercy, through your intercessions, with the Lover of Mankind.\n\nThe select incense, of your virginity, ascended to the throne, of the Father.\n\nBetter than the incense, of the Cherubim, and the Seraphim, O Virgin Mary.\n\nHail to the new heaven, whom the Father has created, and made a place of rest, for His beloved Son.\n\nHail to the royal throne, of Him who is, carried by, the Cherubim.\n\nHail to the advocate, of our souls, you are indeed, the pride of our race.\n\nIntercede on our behalf, O full of grace, before our Savior, our Lord Jesus Christ.\n\nThat He may confirm us, in the upright faith, and grant us the forgiveness, of our sins.\n\nThrough the intercessions, of the Mother of God Saint Mary, O Lord grant us, the forgiveness of our sins.\n\n(For the Angels)\n\nThousands of thousands, and myriads of myriads, of archangels, and holy angels.\n\nThey stand before, the throne, of the Pantocrator, proclaiming and saying.\n\n"Holy holy, holy in truth, the glory and the honor, befit the Trinity."\n\nThrough the intercessions, of the whole choir of the angels, O Lord grant us, the forgiveness of our sins.\n\n(For the Apostles)\n\nOur fathers the Apostles, preached unto the nations, the Gospel, of Jesus Christ.\n\nTheir voices went forth, into all the earth, and their words have reached, the ends of the world.\n\nThrough the prayers, of my masters the fathers the Apostles, O Lord grant us, the forgiveness of our sins.\n\n(For the Martyrs)\n\nUnfading crowns, the Lord has placed, upon the whole choir, of the martyrs.\n\nHe saved and delivered them, because they took refuge in Him, they celebrated with Him, in His kingdom.\n\nThrough the prayers, of the whole choir of the martyrs, O Lord grant us, the forgiveness of our sins.\n\n(For the Saints)\n\nYour saints bless You, and they speak, of the glory, of Your kingdom.\n\nYour kingdom O my God, is an eternal kingdom, and Your Lordship, is unto all ages.\n\nThrough the prayers, of the whole choir of the cross-bearers, the righteous and the just, O Lord grant us, the forgiveness of our sins.\n\n(For the Patriarchs and the Prophets)\n\nHail to Elijah, the prophet of temperance, and Elisha, his elect disciple.\n\nThe great Evangelist, of the land of Egypt, Mark the Apostle, the first prelate.\n\nYou are the Mother of God, O Virgin Mary, ask Him on our behalf, to have mercy upon our race.\n\nThe great patriarch, our father Abba Severus, whose holy teachings, enlightened our minds.\n\nOur father the confessor, Abba Dioscorus, defended the faith, against the heretics.\n\nAnd all of our fathers, who have pleased the Lord, may their holy blessings, be a guard unto us.\n\nThrough their prayers, O God grant us, the forgiveness of our sins, and give us peace.',
          },
          {
            language: 'arabic',
            text: 'نسجد للآب والإبن، والروح القدس، السلام للكنيسة، بيت الملائكة.\n\nالسلام للعذراء، التي ولدت مخلصنا، السلام لغبريال، الذي بشرها.\n\nالسلام لميخائيل، رئيس الملائكة، السلام للأربعة والعشرين، قسيساً.\n\nالسلام للشاروبيم، السلام للسارافيم، السلام لجميع الطغمات، السمائية.\n\nالسلام ليوحنا، السابق العظيم، السلام للإثنى عشر، رسولاً.\n\nالسلام لأبينا مرقس، الإنجيلي، مُبَدِد، الأوثان.\n\nالسلام لإستفانوس، الشهيد الأول، السلام لجرجس، كوكب الصبح.\n\nالسلام لجميع صفوف، الشهداء، السلام لأنبا أنطونيوس، والثلاثة المقارات.\n\nالسلام لجميع صفوف، لُباس الصليب، السلام لجميع القديسين، الذين أرضوا الرب.\n\nأيها المسيح ملكنا، بصلواتهم، إصنع معنا رحمة، في ملكوتك.\n\n(لأجل ربنا يسوع المسيح)\n\nأيها النور الحقيقي، الذي يضئ، لكل إنسان، آتٍ إلى العالم.\n\nأتيت إلى العالم، بمحبتك للبشر، وكل الخليقة، تهللت بمجيئك.\n\nخلصَّت آدم، من الغواية، وعتقت حواء، من طلقات الموت.\n\nأعطيتنا، روح البنوة، نسبحك ونباركك، مع ملائكتك.\n\nعندما يدخل، وقت باكر إلينا، أيها المسيح إلهنا، النور الحقيقي.\n\nفلتشرق فينا، حواس النور، ولا تغطينا، ظلمة الآلام.\n\nلكي نسبحك، عقلياً، مع داود، صارخين، نحوك قائلين.\n\n"سبق أن بلغت، عيناي وقت السحر، لأتلو، جميع أقوالك."\n\nإسمع صوتنا، كعظيم رحمتك، ونجنا أيها الرب إلهنا، حسب رأفاتك.\n\nيا الله المُهْتم، صانع الخيرات، مُدبر مُختاريه، حسناً.\n\nالمدبر القوي، للملتجئين، المتشوق لخلاص، ونجاة كل أحد.\n\nبصلاحك هيأت، لنا الليل، أنعم لنا بهذا اليوم، ونحن بغير خطية.\n\nلنستحق أن نرفع، أيدينا إليك، أمامك بغير غضب، ولا فكر ردئ.\n\nفي هذا السحر، سهل طرقنا، الداخلية والخارجية، بسترك المفرح.\n\nلننطق بعدلك، كل يوم، ونمجد قوتك، مع داود النبي.\n\nقائلين "بسلامك، أيها المسيح مخلصنا، رقدنا وقمنا، لأننا توكلنا عليك.\n\nها ما هو الحسن، وما هو الحلو، إلا إتفاق إخوة، ساكنين معاً."\n\nمُتفقين، بمحبة حقيقية، إنجيلية، كمثل الرسل.\n\nمثل الطيب، على رأس المسيح، النازل على اللحية، إلى أسفل الرجلين.\n\nيمسح كل يوم، الشيوخ، والصبيان والشبان، والخدام.\n\nهؤلاء الذين، ألَّفهم الروح القدس معاً، مثل قيثارة مُسبحين، الله كل حين.\n\nبمزامير وتسابيح، وترانيم روحية، النهار والليل، بقلب لا يفتر.\n\n(لأجل العذراء)\n\nأنتِ يا أم النور، المكرمة والدة الإله، حملتِ الكلمة، غير المحوي.\n\nومن بعد أن ولدتِه، بقيتِ عذراء، نعظمكِ بتسابيح، وبركات.\n\nلأنه بإرادته، ومسرة أبيه، والروح القدس، آتى وخلصنا.\n\nونحن أيضاً، نطلب أن نفوز، برحمة بشفاعاتك، لدى محب البشر.\n\nالبخور المختار، الذي لبتوليتك، صعد إلى، كرسي الآب.\n\nأفضل من بخور، الشاروبيم، والسارافيم، يا مريم العذراء.\n\nالسلام للسماء الجديدة، التي صنعها الآب، وجعلها موضع راحة، لإبنه الحبيب.\n\nالسلام للكرسي، الملوكي، الذي للمحمول، على الشاروبيم.\n\nالسلام لشفيعة، نفوسنا، أنت بالحقيقة، فخر جنسنا.\n\nإشفعي فينا، يا ممتلئة نعمة، أمام مخلصنا، ربنا يسوع المسيح.\n\nلكي يثبتنا، في الإيمان المستقيم، وينعم لنا، بمغفرة خطايانا.\n\nبشفاعات، والدة الإله القديسة مريم، يا رب إنعم لنا، بمغفرة خطايانا.\n\n(لأجل الملائكة)\n\nألوف ألوف، وربوات ربوات، رؤساء ملائكة، وملائكة مُقدسين.\n\nوقوف أمام، كرسي، ضابط الكل، صارخين قائلين:\n\n"قدوس قدوس، قدوس بالحقيقة، المجد والكرامة، يليقان بالثالوث."\n\nبشفاعات، جميع صفوف الملائكة، يا رب إنعم لنا، بمغفرة خطايانا.\n\n(لأجل الرسل)\n\nآباؤنا الرسل، بشروا في الأمم، بإنجيل، يسوع المسيح.\n\nخرجت أصواتهم، إلى الأرض كلها، وبلغ كلامهم، إلى أقطار المسكونة.\n\nبصلوات، سادتي الآباء الرسل، يا رب إنعم لنا، بمغفرة خطايانا.\n\n(لأجل الشهداء)\n\nأكاليل غير مضمحلة، جعلها الرب، على جميع، صفوف الشهداء.\n\nأنقذهم وخلصهم، لأنهم إلتجأوا إليه، وعيدوا معه، في ملكوته.\n\nبصلوات، جميع صفوف الشهداء، يا رب إنعم لنا، بمغفرة خطايانا.\n\n(لأجل القديسين)\n\nقديسوك، يباركونك، وينطقون بمجد، ملكوتك.\n\nملكوتك يا إلهي، ملكوت أبدي، وربوبيتك، إلى كل الأجيال.\n\nبصلوات، كافة مصاف لابسي الصليب، والأبرار والصديقين، يا رب إنعم لنا، بمغفرة خطايانا.\n\n(لأجل الآباء والأنبياء)\n\nالسلام لإيليا، النبي المتعفف، وإليشع، تلميذه المختار.\n\nالمبشر العظيم، في كورة مصر، مرقس الرسول، مدبرها الأول.\n\nأنت هي أم الله، يا مريم العذراء، أُطلبي منه عنا، أن يرحم جنسنا.\n\nالبطريرك العظيم، أبونا أنبا ساويرس، الذي أنارت تعاليمه، المقدسة عقولنا.\n\nأبونا المعترف، أنبا ديسقوروس، حارب عن الإيمان، ضد الهراطقة.\n\nوكل آبائنا، الذين أرضوا الرب، بركتهم المقدسة، تكون لنا حارساً.\n\nبصلواتهم، إنعم لنا يا الله، بمغفرة خطايانا، وأعطنا سلاماً.',
          },
        ],
      };
    }

    if (isVerseOfCymbals) {
      return {
        id: `${seasonId}-${serviceName.toLowerCase()}-verse-of-cymbals`,
        title: 'Ⲧⲉⲛⲟⲩⲱϣⲧ (Verse of the Cymbals)',
        versions: [
          {
            language: 'coptic',
            text: 'Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏⲥⲟⲛ.\n\nⲦⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: Ϯⲧ̀ⲣⲓⲁⲥ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲟⲙⲟⲟⲩⲥⲓⲟⲥ.\n\nⲬⲉⲣⲉ ϯⲉⲕⲕⲗⲏⲥⲓⲁ: ⲡⲏⲓ ⲛ̀ⲧⲉ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ: ⲭⲉⲣⲉ ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲉ̀ⲧⲁⲥⲙⲉⲥ Ⲡⲉⲛⲥⲱⲧⲏⲣ.\n\nⲬⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϯⲃ̀ⲣⲱⲡⲓ ⲉⲑⲛⲉⲥⲱⲥ: ⲑⲏ̀ⲉⲧⲁⲥⲙⲓⲥⲓ ⲛⲁⲛ: ⲙ̀Ⲫⲛⲟⲩϯ ⲡⲓⲗⲟⲅⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϧⲉⲛ ⲟⲩⲭⲉⲣⲉ ⲉϥⲟⲩⲁⲃ: ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲑⲙⲁⲩ ⲙ̀Ⲫⲛⲉⲑⲟⲩⲁⲃ.\n\nⲬⲉⲣⲉ Ⲙⲓⲭⲁⲏⲗ: ⲡⲓⲛⲓϣϯ ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ: ⲭⲉⲣⲉ Ⲅⲁⲃⲣⲓⲏⲗ: ⲡⲓⲥⲟⲧⲡ ⲙ̀ⲡⲓⲣⲉϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ.\n\nⲬⲉⲣⲉ Ⲙⲓⲭⲁⲏⲗ: ⲡⲓⲛⲓϣϯ ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲁⲣⲭⲏⲥ̀ⲧⲣⲁⲧⲓⲅⲟⲥ: ⲛ̀ⲧⲉ ⲧⲫⲉ ⲛ̀ⲛⲓⲫⲏⲟⲩⲓ̀.\n\nⲬⲉⲣⲉ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ: ⲭⲉⲣⲉ ⲛⲓⲤⲉⲣⲁⲫⲓⲙ: ⲭⲉⲣⲉ ⲛⲓⲧⲁⲅⲙⲁ ⲧⲏⲣⲟⲩ: ⲛ̀ⲉⲡⲟⲩⲣⲁⲛⲓⲟⲛ.\n\nⲬⲉⲣⲉ Ⲓⲱⲁⲛⲛⲏⲥ: ⲡⲓⲛⲓϣϯ ⲙ̀Ⲡ̀ⲣⲟⲇⲣⲟⲙⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲟⲩⲏⲃ: ⲡ̀ⲥⲩⲅⲅⲉⲛⲏⲥ ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ.\n\nⲬⲉⲣⲉ ⲛⲁⲃⲟⲓⲥ ⲛ̀ⲓⲟϯ: ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲭⲉⲣⲉ ⲛⲓⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ.\n\nⲦⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲡⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: ⲭⲉⲣⲉ ⲡⲓⲁⲡⲟⲥⲧⲟⲗⲟⲥ: ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲡⲓϣⲱⲓϫ ⲛ̀ⲥⲉⲛⲛⲉⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ: ⲡⲁⲟ̅ⲥ̅ ⲡ̀ⲟⲩⲣⲟ Ⲅⲉⲱⲣⲅⲓⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲛⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲡⲓϣⲱⲓϫ ⲛ̀ⲥⲉⲛⲛⲉⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲡⲓϣⲱⲓϫ ⲛ̀ⲥⲉⲛⲛⲉⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ: ⲡⲓⲁⲅⲓⲟⲥ ⲁⲃⲃⲁ Ⲙⲏⲛⲁ.\n\nⲰⲟⲩⲛⲓⲁⲧⲕ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: ⲡⲓⲙⲉⲛⲣⲓⲧ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅.\n\nⲰⲟⲩⲛⲓⲁⲧⲕ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ: ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲇⲓⲕⲉⲟⲥ: ⲁⲃⲃⲁ Ⲁⲃⲣⲁⲁⲙ ⲡⲓⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ: ⲡⲓⲙⲉⲛⲣⲓⲧ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲫⲛⲉⲑⲟⲩⲁⲃ: ⲡⲓⲙⲉⲛⲣⲓⲧ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅: ⲡⲉⲛⲓⲱⲧ Ⲡⲓϣⲱⲓ ⲕⲁⲙⲉⲗ: ⲡⲓϩⲏⲅⲟⲩⲙⲉⲛⲟⲥ.\n\nⲦⲉⲛⲧϩⲟ ⲉ̀ⲣⲟⲕ ⲱ̀ Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫⲛⲟⲩϯ: ⲉ̀ⲑⲣⲉⲕⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ: ⲙ̀ⲡⲉⲛⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ (…) ⲡⲓⲁⲣⲭⲏⲉⲣⲉⲩⲥ: ⲙⲁⲧⲁϫⲣⲟϥ ϩⲓϫⲉⲛ ⲡⲉϥⲑ̀ⲣⲟⲛⲟⲥ.\n\nⲚⲉⲙ ⲡⲉϥⲕⲉϣⲫⲏⲣ ⲛ̀ⲗⲓⲧⲟⲩⲣⲅⲟⲥ: ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲇⲓⲕⲉⲟⲥ Ⲁⲃⲃⲁ (…) ⲡⲓⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ (ⲡⲓⲙⲏⲧⲣⲟⲡⲟⲗⲓⲧⲏⲥ): ⲙⲁⲧⲁϫⲣⲟϥ ϩⲓϫⲉⲛ ⲡⲉϥⲑ̀ⲣⲟⲛⲟⲥ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ ϮⲐⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ: Ⲡ̀ⲟ̅ⲥ̅ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nⲈⲑⲣⲉⲛϩⲱⲥ ⲉ̀ⲣⲟⲕ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ ⲛⲁⲓ ⲛⲁⲛ.',
          },
          {
            language: 'englishCoptic',
            text: 'Kurie eleēson.\n\nTenouōsht em-Fiōt nem Pshēri: nem Pi-epneuma ethouab: Ti-etrias ethouab: enomoousios.\n\nKhere tiekklēsia: pēi ente niaggelos: khere tiparthenos: etasmes Pensōtēr.\n\nKhere ne Maria: ti-ebrōpi ethnesōs: thēetasmisi nan: em-Fnouti pilogos.\n\nKhere ne Maria: khen oukhere efouab: khere ne Maria: thmau em-Fnethouab.\n\nKhere Mikhaēl: pinishti enarkhēaggelos: khere Gabriēl: pisotp empirefhishennoufi.\n\nKhere Mikhaēl: pinishti enarkhēaggelos: khere piarkhē-estratigos: ente tfe ennifēou-i.\n\nKhere ni-Kherouvim: khere ni-Serafim: khere nitagma tērou: enepouranion.\n\nKhere Iōannēs: pinishti em-Eprodromos: khere piouēb: epsuggenēs en-Emmanouēl.\n\nKhere navois enioti: enapostolos: khere nimathētēs: ente Pentshois Iēsous Pi-ekhristos.\n\nTenouōsht empimarturos: khere pieuaggelistēs: khere piapostolos: abba Markos pitheōrimos.\n\nKhere nak ō pimarturos: khere pishōij ensenneos: khere piathloforos: patshois epouro Geōrgios.\n\nKhere nak ō nimarturos: khere pishōij ensenneos: khere piathloforos: Filopatēr Merkourios.\n\nKhere nak ō pimarturos: khere pishōij ensenneos: khere piathloforos: piagios abba Mēna.\n\nŌouniatk khen oumethmēi: Peniōt ethouab empatriarkhēs: Papa Abba Kurillos pimahsoou: pimenrit ente Pikhristos.\n\nŌouniatk khen oumethmēi: peniōt ethouab endikeos: abba Abraam pi-episkopos: pimenrit ente Pikhristos.\n\nKhere nak ō fnethouab: pimenrit ente Pikhristos: peniōt Pishōi kamel: pihēgoumenos.\n\nTentho erok ō Epshēri em-Fnouti: ethrekareh e-epōnkh: empenpatriarkhēs: Papa Abba (…) piarkhēereus: matajrof hijen pefethronos.\n\nNem pefkeshfēr enlitourgos: peniōt ethouab endikeos Abba (…) pi-episkopos (pimētropolitēs): matajrof hijen pefethronos.\n\nHiten ni-epresvia: ente Ti-The-otokos ethouab Maria: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\nEthrenhōs erok: nem Pekiōt enagathos: nem Pi-epneuma ethouab: je aki aksōti emmon nai nan.',
          },
          {
            language: 'english',
            text: 'Lord have mercy.\n\nWe worship the Father and the Son, and the Holy Spirit, the holy and co-essential, Trinity.\n\nHail to the Church, the house of the angels, Hail to the Virgin, who gave birth to our Savior.\n\nHail to you O Mary, the beautiful dove, who has borne to us, God the Logos.\n\nHail to you O Mary, with a holy hail, Hail to you O Mary, the Mother of the Holy One.\n\nHail to Michael: the great archangel: Hail to Gabriel: the chosen announcer.\n\nHail to Michael: the great archangel: hail to the chief commander: of the army of the heavens!\n\nHail to the cherubim: hail to the seraphim: hail to all: the heavenly orders.\n\nHail to John: the great forerunner: hail to the priest: the kinsman of Emmanuel.\n\nHail to my lords, and fathers the apostles, hail to the disciples, of our Lord Jesus Christ.\n\nHail to you O martyr: hail to the Evangelist: hail to the Apostle: Mark the Beholder of God.\n\nHail to you, O martyr: hail to the courageous hero: hail to the struggle-mantled, my Lord Prince George.\n\nHail to you O martyr: hail to the courageous hero: hail to the struggle bearer: Philopater Mercurius.\n\nHail to you, O martyr: hail to the noble hero: hail to the struggle-bearer, saint Abba Mina.\n\nBlessed are you indeed: our holy father the patriarch: Abba Kyrillos the sixth: the beloved of Christ.\n\nBlessed are you indeed, our holy and righteous father, Abba Abraam the bishop, the beloved of Christ.\n\nHail to you O saint: the beloved of Christ: Abouna Pishoy Kamel: the hegumen.\n\nWe ask You O Son of God, to keep the life of our patriarch, Pope Abba (…) the high priest, confirm him upon his throne.\n\nAnd his partner in the liturgy, our holy righteous father, Abba (…) the bishop (metropolitan), confirm him upon his throne.\n\nThrough the intercessions, of the Theotokos Saint Mary, O Lord grant us, the forgiveness of our sins.\n\nThat we may praise You: with Your good Father: and the Holy Spirit: for You have come and saved us. Have mercy on us.',
          },
          {
            language: 'arabic',
            text: 'يارب ارحم.\n\nنسجد للآب والإبن والروح القدس الثالوث القدوس المساوي في الجوهر.\n\nالسلام للكنيسة بيت الملائكة السلام للعذراء التي ولدت مخلصنا.\n\nالسلام لك يا مريم الحمامة الحسنة التي ولدت لنا، الله الكلمة.\n\nالسلام لك يا مريم، سلاماً مقدساً السلام لك يا مريم أم القدوس.\n\nالسلام لميخائيل رئيس الملائكة العظيم. السلام لغبريال المبشر المختار.\n\nالسلام لميخائيل رئيس الملائكة العظيم. السلام لرئيس جنود قوات السموات.\n\nالسلام للشاروبيم، السلام للسرافيم السلام لجميع الطغمات السمائية.\n\nالسلام ليوحنا السابق العظيم السلام للكاهن نسيب عمانوئيل.\n\nالسلام لسادتي الآباء، الرسل. السلام لتلاميذ ربنا يسوع المسيح.\n\nالسلام لك أيها الشهيد السلام للانجيلي السلام للرسول مرقس ناظر الإله.\n\nالسلام لك أيها الشهيد، السلام للشجاع المجاهد، السلام للابس الجهاد، سيدي الملك جيؤرجيوس.\n\nالسلام لك أيها الشهيد. السلام للشجاع البطل. السلام للمجاهد محب الآب مرقوريوس.\n\nالسلام لك أيها الشهيد. السلام للشجاع البطل. السلام للمجاهد القديس أبا مينا.\n\nطوباك بالحقيقة، يا أبانا القديس البطريرك، الانبا كيرلس السادس، حبيب المسيح.\n\nطوباك بالحقيقة يا أبانا القديس البار انبا ابرآم الاسقف حبيب المسيح.\n\nالسلام لك أيها القديس: حبيب المسيح: أبونا القمص: بيشوي كامل.\n\nنسألك يا إبن الله، أن تحفظ حياة بطريركنا، البابا أنبا (...) رئيسُ الكهنة، ثبته على كرسيه.\n\nوشريكه في الخدمة الرسولية، أبانا القديس البار، أنبا (...) الأسقف (المطران)، ثبته على كرسيه.\n\nبشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.\n\nلكي نُسبِّحُك، مع أبيك الصالح، والروح القدس، لأنك أتيت وخلَّصتنا ارحمنا.',
          },
        ],
      };
    }

    if (isPsalm150) {
      return {
        id: `${seasonId}-${serviceName.toLowerCase()}-psalm-150`,
        title: 'Ⲥⲙⲟⲩ ⲉ̀Ⲫ̀ⲛⲟⲩϯ (Psalm 150)',
        versions: [
          {
            language: 'coptic',
            text: 'ⲥⲙⲟⲩ ⲉⲫⲛⲟⲩϯ ϧⲉⲛ ⲛⲉϥⲉⲑⲟⲩⲁⲃ ⲧⲏⲣⲟⲩ ⲁⲗ.\nⲥⲙⲟⲩ ⲉⲣⲟϥ ϧⲉⲛ ⲡⲓⲧⲁϫⲣⲟ ⲛⲧⲉ ⲧⲉϥϫⲟⲙ. ⲁⲗ.\nⲥⲙⲟⲩ ⲉⲣⲟϥ ϧⲉⲧⲉⲣⲏⲓ ϩⲓϫⲉⲛ ⲧⲉϥⲙⲉⲧϫⲱⲣⲓ. ⲁⲗ.\nⲥⲙⲟⲩ ⲉⲣⲟϥ ⲕⲁⲧⲁ ⲡϣⲱⲓ ⲛⲧⲉ ⲧⲉϥⲙⲉⲧⲛⲓϣϯ. ⲁⲗ.\nⲥⲙⲟⲩ ⲉⲣⲟϥ ϧⲉⲛ ⲟⲩⲥⲱⲛⲓ ⲛ̀ⲥⲁⲗⲡⲓⲅⲅⲟⲥ. ⲁⲗ.\nⲥⲙⲟⲩ ⲉⲣⲟϥ ϧⲉⲛ ⲟⲩⲯⲁⲗⲧⲏⲣⲓⲟⲛ ⲛⲉⲙ ⲟⲩⲕⲑⲁⲣⲁ. ⲁⲗ.\nⲥⲙⲟⲩ ⲉⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲩⲙⲃⲁⲗⲟⲛ ⲛⲉⲙ ϩⲁⲛⲭⲟⲣⲟⲥ. ⲁⲗ.\nⲥⲙⲟⲩ ⲉⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲁⲡ ⲛⲉⲙ ⲟⲣⲅⲁⲛⲟⲛ. ⲁⲗ.\nⲥⲙⲟⲩ ⲉⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲩⲙⲃⲁⲗⲟⲛ ⲉ̀ⲛⲉⲥⲉ ⲧⲟⲧⲥⲱⲛ. ⲁⲗ.\nⲥⲙⲟⲩ ⲉⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲩⲙⲃⲁⲗⲟⲛ ⲛⲧⲉ ⲟⲩⲥⲩⲗⲏⲗⲟⲩⲓ. ⲁⲗ.\nⲡⲛⲓⲥⲓ ⲛⲓⲃⲉⲛ ⲙⲁⲣⲟⲩⲥⲙⲟⲩ ⲧⲏⲣⲟⲩ ⲉ̀ⲫⲣⲁⲛ ⲙ̀ⲡ̀ⲥⲟⲓⲥ Ⲡⲉⲛⲛⲟⲩϯ. ⲁⲗ.\nⲄⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ Ⲁⲅⲓⲱ Ⲡⲛⲉⲩⲙⲁⲧⲓ. ⲁⲗ.\nⲔⲉ ⲛⲩⲛ ⲕⲉ ⲁⲉⲓ ⲕⲉ ⲓⲥⲧⲟⲓⲥ ⲉⲱⲛⲁⲥ ⲧⲱⲛ ⲉⲱⲛⲱⲛ: ⲁⲙⲏⲛ ⲁⲗ.\nⲁⲗ. ⲁⲗ. Ⲇⲟⲝⲁ ⲥⲓ Ⲭⲉⲟⲥ ⲏⲙⲱⲛ. ⲁⲗ.\nⲁⲗ. ⲁⲗ. Ⲡⲓⲱⲟⲩ ⲫⲁ Ⲡⲉⲛⲛⲟⲩϯ ⲡⲉ. ⲁⲗ.\nⲒⲏⲥⲟⲩⲥ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ Ⲡϣⲏⲣⲓ ⲙ̀ⲫⲛⲟⲩϯ ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲛ ⲟⲩⲟϩ ⲛⲁⲓ ⲛⲁⲛ.\nⲔⲉⲙⲁⲣⲱⲟⲩⲧ ⲁⲗⲏⲑⲱⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲓ ⲁⲕⲥⲱⲧⲓ ⲙ̀ⲙⲟⲛ.',
          },
          {
            language: 'englishCoptic',
            text: 'smou efnouti khen nefethouab tērou allēlouia.\nsmou erof khen pitajro nte tefjom. allēlouia.\nsmou erof kheterēi hijen tefmetjōri. allēlouia.\nsmou erof kata pshōi nte tefmetnishti. allēlouia.\nsmou erof khen ousōni ensalpiggos. allēlouia.\nsmou erof khen oupsaltērion nem oukthara. allēlouia.\nsmou erof khen hankumvalon nem hankhoros. allēlouia.\nsmou erof khen hankap nem organon. allēlouia.\nsmou erof khen hankumvalon enese totsōn. allēlouia.\nsmou erof khen hankumvalon nte ousulēloui. allēlouia.\npnisi niven marousmou tērou efran emepsois Pennouti. allēlouia.\nGoksa Patri ke Uiō ke Agiō Pneumati. allēlouia.\nKe nun ke aei ke istois eōnas tōn eōnōn: amēn allēlouia.\nallēlouia. allēlouia. Doksa si Kheos ēmōn. allēlouia.\nallēlouia. allēlouia. Piōou fa Pennouti pe. allēlouia.\nIēsous Pikhristos Pshēri emfnouti sōtem eron ouoh nai nan.\nKemarōout alēthōs: nem Pekiōt enagathos: nem Pipneuma ethouab: je aki aksōti emmon.',
          },
          {
            language: 'english',
            text: 'Praise God in all His saints. Alleluia.\nPraise Him in the firmament of His power. Alleluia.\nPraise Him for His mighty acts. Alleluia.\nPraise Him according to the multitudes of His greatness. Alleluia.\nPraise Him with the sound of the trumpet. Alleluia.\nPraise Him with psaltery and harp. Alleluia.\nPraise Him with timbrel and chorus. Alleluia.\nPraise Him with strings and organs. Alleluia.\nPraise Him with pleasant-sounding cymbals. Alleluia.\nPraise Him upon the cymbals of joy. Alleluia.\nLet everything that has breath praise the name of the Lord our God. Alleluia.\nGlory to the Father, and the Son, and the Holy Spirit. Alleluia.\nNow and ever and unto the age of ages. Amen. Alleluia.\nAlleluia. Alleluia. Glory to You, our God. Alleluia.\nAlleluia. Alleluia. Glory be to our God. Alleluia.\nO Jesus Christ, the Son of God, hear us and have mercy on us.\nBlessed are You indeed, with Your good Father, and the Holy Spirit, for You have come and saved us.',
          },
          {
            language: 'englishArabic',
            text: 'Sabeho Allah fi gamea kideseen.\nSabaho fi galad qowetehee.\nSabaho ala maqderateehy.\nSabaho kakatharat azamateehee.\nSabaho bi sowt el booq.\nSabaho bi mizmar wal kithar.\nSabaho bi difoofel wa sofouf.\nSabaho bi owtaren wa orhoon.\nSabaho bi snuuge hasinat esoot.\nSabaho bi snuuge etahleel.\nKulu nasma faltusabi esmelrab elahona.\nAlelluia, Doxa patri kay ayo kay agio epnevmati.\nKe nin ke a ee ke estosey onan stoney onon amin alleluia.\nDoxasi otheos imon alleluia.\nPi oou fai pennouti pe alleluia.\nEsoos piekhristos epshiri em ef nooti soten eron owoh nai nan.',
          },
          {
            language: 'arabic',
            text: 'سبحوا الله في قديسيه، هللويا.\nسبحوا في فلك قوته، هللويا.\nسبحوا على قواته، هللويا.\nسبحوا ككثرة عظمته، هللويا.\nسبحوا صوت البوق، هللويا.\nسبحوا بمزمار وقيثارة، هللويا.\nسبحوا بدفوف وصفوف، هللويا.\nسبحوا بأوتار وآلات ذوات أوتار، هللويا.\nسبحوا بصنوج حسنة الصوت، هللويا.\nسبحوا بصنوج تهليل، هللويا.\nكل نسمة فلتسبح اسم الرب إلهنا، هللويا.\nالمجد للآب والابن والروح القدس، هللويا.\nالآن وكل أوان وإلى دهر الدهور آمين، هللويا.\nالمجد لك يا إلهنا، هللويا.\nالمجد هو لإلهنا، هللويا.\nيا يسوع المسيح ابن الله، اسمعنا وارحمنا.\nمبارك أنت بالحقيقة مع أبيك الصالح والروح القدس، لأنك أتيت وخلصتنا.',
          },
        ],
      };
    }

    if (isPiOik) {
      return {
        id: `${seasonId}-${serviceName.toLowerCase()}-pi-oik`,
        title: 'Ⲡⲓⲱⲓⲕ (The Bread of Life)',
        versions: [
          {
            language: 'coptic',
            text: 'Ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡ̀ⲱⲛϧ: ⲉ̀ⲧⲁϥⲓ̀ ⲉⲡⲉⲥⲏⲧ: ⲛⲁⲛ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲉ: ⲁⲫϯ ⲙ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ.\n\nⲚ̀ⲑⲟ ϩⲱⲓ Ⲙⲁⲣⲓⲁ̀: ⲁ̀ⲣⲉϥⲁⲓ ϧⲉⲛ ⲧⲉⲛⲉϫⲓ: ⲙ̀ⲡⲓⲘⲁⲛⲛⲁ ⲛ̀ⲛⲟ ⲏ̀ⲧⲟⲛ: ⲉ̀ⲧⲁϥⲓ̀ ⲉ̀ⲃⲟⲗϧⲉⲛ Ⲫ̀ⲓⲱⲧ.\n\nⲀ̀ⲣⲉⲙⲁⲥⲥⲟⲩ ⲁϭⲛⲉ ⲑⲱⲗⲉⲃ: ⲁϥϯ ⲛⲁⲛ ⲙ̀ⲡⲉϥⲥⲱⲙⲁ: ⲛⲉⲙ ⲡⲉϥⲥ̀ⲛⲟϥ ⲉⲧⲧⲁⲓⲏ̀ⲟⲩⲧ: ⲁⲛⲱⲛϧ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲤⲉⲧⲱⲟⲩⲛⲟⲩ ϩⲁⲣⲟⲕ: ⲛ̀ϫⲉ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ: ⲛⲉⲙ ⲛⲓⲤⲉⲣⲁⲫⲓⲙ: ⲥⲉϣ̀ⲛⲁⲩ ⲉ̀ⲣⲟⲕ ⲁⲛ.\n\nⲦⲉⲛⲛⲁⲩ ⲉ̀ⲣⲟⲕ ⲙ̀ⲙⲏⲓ: ϩⲓϫⲉⲛ ⲡⲓⲙⲁⲛ̀ⲉⲣϣⲱⲟⲩϣⲓ: ⲧⲉⲛϭⲓ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲡⲉⲕⲥⲱⲙⲁ ⲛⲉⲙ ⲡⲉⲕ ⲥ̀ⲛⲟϥ ⲉⲧⲧⲁⲓⲏ̀ⲟⲩⲧ.\n\nⲈ̀ⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛϭⲓⲥⲓ: ⲙ̀ⲙⲟ ⲁ̀ⲝⲓⲱⲥ ϧⲉⲛ ϩⲁⲛⲩ̀ⲙⲛⲟⲗⲟⲅⲓⲁ̀: ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ.\n\nϪⲉ ⲁⲩⲥⲁϫⲓ ⲉⲑⲃⲏϯ: ⲛ̀ϩⲁⲛ ϩ̀ⲃⲏⲟⲩⲓ̀ ⲉⲩⲧⲁⲓⲏ̀ⲟⲩⲧ ⲃⲁⲕⲓ ⲉ̀ⲑⲟⲩⲁⲃ ⲛ̀ⲧⲉ ⲡⲓⲛⲓϯ ⲛ̀Ⲟⲩⲣⲟ.\n\nⲦⲉⲛϯϩⲟ ⲧⲉⲛⲧⲱⲃϩ: ⲉ̀ⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲩⲓⲁ̀: ⲛ̀ⲧⲟⲧϥ ⲙ̀ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲩⲓⲁ̀ ⲛ̀ⲧⲉ ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉ̀ⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ̀: Ⲡ̀ⲟ̅ⲥ̅ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲩⲓⲁ̀ ⲛ̀ⲧⲉ ⲛⲓⲁ̀ⲣⲭⲏⲁ̀ⲅⲅⲉⲗⲟⲥ ⲉ̅ⲑ̅ⲩ̅ Ⲙⲓⲭⲁⲏⲗ ⲛⲉⲛ Ⲅⲁⲃⲣⲓⲏⲗ: Ⲡ̀ⲟ̅ⲥ̅ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.',
          },
          {
            language: 'englishCoptic',
            text: 'Piōik ente epōnkh: etafi epesēt: nan evolkhen etfe: a-efnouti emepōnkh empikosmos.\n\nEntho hōi Mari-a: arefai khen teneji: empi-Manna enno ēton: etafi evolkhen Efiōt.\n\nAremassou atshne thōleb: afti nan empefsōma: nem pefesnof ettai-ēout: anōnkh sha eneh.\n\nSetōounou harok: enje ni-Kherouvim: nem ni-Serafim: se-eshnau erok an.\n\nTennau erok emmēi: hijen pima-enershōoushi: tentshi evolkhen peksōma nem pek esnof ettai-ēout.\n\nEthve fai tentshisi: emmo aksiōs khen hanumnologi-a: emeprofētikon.\n\nJe ausaji ethvēti: enhan ehvēou-i eutai-ēout vaki ethouab ente piniti en-Ouro.\n\nTentiho tentōbh: ethrenshashni eunai: hiten ni-epresui-a: entotf empimairōmi.\n\nHiten ni-epresui-a ente tithe-otokos ethouab Mari-a: Eptshois ari-ehmot nan empikhō evol ente nennovi.\n\nHiten ni-epresui-a ente ni-arkhē-aggelos ethouab Mikhaēl nen Gabriēl: Eptshois ari-ehmot nan empikhō evol ente nennovi.',
          },
          {
            language: 'english',
            text: 'The Bread of life, which came down for us from heaven, has given life to the world.\n\nAnd you too, O Mary, have born in your womb the rational Manna, which came from the Father.\n\nYou have brought Him forth without blemish; He gave us His body and His precious blood, and we live forever.\n\nAround You stand the Cherubim, and the Seraphim, and they cannot look at You.\n\nWe behold You upon the Altar and we partake of Your body and Your precious blood.\n\nTherefore we exalt you befittingly, with prophetic hymnology.\n\nFor they spoke of you with great honor, O holy city of the great King.\n\nWe entreat and pray that we may win mercy through your intercessions with the Lover of mankind.\n\nThrough the intercessions of the Theotokos Saint Mary, O Lord, grant us the forgiveness of our sins.\n\nThrough the intercessions of the holy archangels Michael and Gabriel, O Lord, grant us the forgiveness of our sins.',
          },
          {
            language: 'englishArabic',
            text: 'Al-Khubz al-hayat alladhi nazala mina as-sama, wahaba al-hayata lil-alam.\n\nWa anti aydan ya Maryam hamalti fi batnik al-manna al-aqli alladhi ata mina al-aab.\n\nWaladtihi bi-ghayri danas, wa a`tana jasadahu wa damahu al-karam fa-hayyna ila al-abad.\n\nYaqumu hawlaka ash-sharubim wa as-sarafim wa la yastati`una an yanzuruk.\n\nWa nahnu nanzuruk kulla yawm `ala al-madhbah, wa natanawalu min jasadak wa damak al-karam.\n\nMin ajli hatha nu`azzimuk bi-istihqaq bi-tamajid nabawiyyah.\n\nLi-annahum takallamu min ajlaka bi-a`mal karimah, ayyuha al-madinah al-muqaddasah allati lil-malik al-`azim.\n\nNasalu wa natlubu an nufuza bi-rahmah, bi-shafa`atika `inda muhibb al-bashar.\n\nBi-shafa`at walidat al-ilah al-qiddisah Maryam, ya Rabb an`am lana bi-ghuf-ran khatajana.\n\nBi-shafa`at ra-isay al-mala-ikah al-muqaddasin Mikha-il wa Ghabriyal, ya Rabb an`am lana bi-ghuf-ran khatajana.',
          },
          {
            language: 'arabic',
            text: 'خبز الحياة الذى نزل من السماء، وهب الحياة للعالم.\n\nوأنتِ أيضاً يا مريم حملتِ فى بطنك المن العقلى الذى أتى من الآب.\n\nولدته بغير دنس، وأعطانا جسده ودمه الكريم فحيينا الى الأبـد.\n\nيقوم حولك الشاروبيم والسارافيم ولا يستطيعون أن ينظروك.\n\nونحن ننظرك كل يوم على المذبح، ونتناول من جسدك ودمك الكريم.\n\nمن أجل هذا نعظمك بإستحقاق بتماجيد نبوية.\n\nلانهم تكلموا من أجلك بأعمال كريمة، أيتها المدينة المقدسة التى للملك العظيم.\n\nنسأل ونطلب أن نفوز برحمة، بشفاعاتك عند محب البشر.\n\nبشفاعات والدة الاله القديسة مريم، يا رب أنعم لنا بغفران خطايانا.\n\nبشفاعات رئيسى الملائكة المقدسين ميخائيل وغبريال يا رب أنعم لنا بغفران خطايانا.',
          },
        ],
      };
    }

    return {
      id: `${seasonId}-${serviceName.toLowerCase()}-hymn-${num}`,
      title: `${serviceName} Hymn #${num}`,
      versions: [
        { language: 'coptic', text: `Ⲁⲡⲟⲥⲧⲟⲗⲟⲥ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ ${num} - (${serviceName} Coptic Text)` },
        { language: 'englishCoptic', text: `Apostolos niaggelos ${num} - (${serviceName} Coptic Text)` },
        { language: 'english', text: `Praise the Lord for this sacred hymn #${num} chanted during the service of ${serviceName}.` },
        { language: 'englishArabic', text: `Ya Rab isma' salatana li-khidmat ${serviceName} raqam ${num}...` },
        { language: 'arabic', text: `يا رب اسمع صلاتنا لخدمة ${serviceName} رقم ${num}.` },
      ],
    };
  });
};

const createServices = (seasonId: string): Service[] => [
  { id: `${seasonId}-matins`, title: 'Matins', hymns: generateHymns(seasonId, 'Matins') },
  { id: `${seasonId}-liturgy`, title: 'Liturgy', hymns: generateHymns(seasonId, 'Liturgy') },
  { id: `${seasonId}-distribution`, title: 'Distribution', hymns: generateHymns(seasonId, 'Distribution') },
  { id: `${seasonId}-vespers`, title: 'Vespers', hymns: generateHymns(seasonId, 'Vespers') },
  { id: `${seasonId}-midnight`, title: 'Midnight Praises', hymns: generateHymns(seasonId, 'Midnight Praises') },
];

const createAnnualServices = (): Service[] => [
  { id: 'annual-morning-praises', title: 'Morning Praises', hymns: generateHymns('annual', 'Morning Praises') },
  { id: 'annual-matins', title: 'Matins', hymns: generateHymns('annual', 'Matins') },
  { id: 'annual-liturgy', title: 'Liturgy', hymns: generateHymns('annual', 'Liturgy') },
  { id: 'annual-distribution', title: 'Distribution', hymns: generateHymns('annual', 'Distribution') },
  { id: 'annual-vespers', title: 'Vespers', hymns: generateHymns('annual', 'Vespers') },
  { id: 'annual-midnight', title: 'Midnight Praises', hymns: generateHymns('annual', 'Midnight Praises') },
];

export const seasons: Season[] = [
  { id: 'annual', title: '1. Annual / Standard Services', services: createAnnualServices() },
  { id: 'nayrouz', title: '2. Nayrouz (Coptic New Year)', services: createServices('nayrouz') },
  { id: 'cross', title: '3. Feast of the Cross', services: createServices('cross') },
  { id: 'nativity-fast', title: '4. Nativity Fast (Advent)', services: createServices('nativityfast') },
  { id: 'kiahk', title: '5. Kiahk Praises & Season', services: createServices('kiahk') },
  { id: 'nativity', title: '6. Feast of the Nativity (Christmas)', services: createServices('nativity') },
  { id: 'theophany', title: '7. Feast of Theophany (Epiphany)', services: createServices('theophany') },
  { id: 'jonah', title: '8. Jonahs Fast & Feast (Nineveh)', services: createServices('jonah') },
  { id: 'great-lent', title: '9. Great Lent', services: createServices('lent') },
  { id: 'palm-sunday', title: '10. Palm Sunday & Hosanna Sunday', services: createServices('palmsunday') },
  { id: 'holy-week', title: '11. Holy Week (Pascha)', services: createServices('holyweek') },
  { id: 'pentecost', title: '12. Holy Resurrection & Holy Fifty Days', services: createServices('pentecost') },
  { id: 'apostles-fast', title: '13. Apostles Fast & Feast', services: createServices('apostles') },
  { id: 'st-mary', title: '14. St. Mary Fast & Assumption Feast', services: createServices('stmary') },
  { id: 'minor-feasts', title: '15. Lord’s Minor Feasts', services: createServices('minorfeasts') },
];

// Deacon Categories corresponding to Annual, Special Holy Orders, and Festival Special
export const deaconCategories: DeaconCategory[] = [
  {
    id: 'deacon-annual',
    title: 'Annual',
    services: [
      { id: 'd-annual-matins', title: 'Matins', hymns: generateDeaconResponses('d-annual', 'Matins') },
      { id: 'd-annual-offering-lamb', title: 'Offering of Lamb', hymns: generateDeaconResponses('d-annual', 'Offering of Lamb') },
      { id: 'd-annual-liturgy-word', title: 'Liturgy of the Word', hymns: generateDeaconResponses('d-annual', 'Liturgy of the Word') },
      { id: 'd-annual-liturgy-faithful', title: 'Liturgy of the Faithful', hymns: generateDeaconResponses('d-annual', 'Liturgy of the Faithful') },
      { id: 'd-annual-vespers', title: 'Vespers', hymns: generateDeaconResponses('d-annual', 'Vespers') },
      { id: 'd-annual-bishop', title: 'In Presence of Bishop / Patriarch', hymns: generateDeaconResponses('d-annual', 'In Presence of Bishop / Patriarch') },
    ],
  },
  {
    id: 'deacon-special-orders',
    title: 'Special Holy Orders',
    services: [
      { id: 'd-order-unction', title: 'Unction', hymns: generateDeaconResponses('d-order', 'Unction') },
      { id: 'd-order-baptism', title: 'Baptism', hymns: generateDeaconResponses('d-order', 'Baptism') },
      { id: 'd-order-prostration', title: 'Prostration', hymns: generateDeaconResponses('d-order', 'Prostration') },
      { id: 'd-order-matrimony', title: 'Matrimony', hymns: generateDeaconResponses('d-order', 'Matrimony') },
      { id: 'd-order-funeral', title: 'Funeral', hymns: generateDeaconResponses('d-order', 'Funeral') },
      { id: 'd-order-consecration', title: 'Consecration', hymns: generateDeaconResponses('d-order', 'Consecration') },
      { id: 'd-order-waters', title: 'Liturgy of the Waters', hymns: generateDeaconResponses('d-order', 'Liturgy of the Waters') },
    ],
  },
  {
    id: 'deacon-festival',
    title: 'Festival Special',
    services: [
      { id: 'd-fest-matins', title: 'Matins', hymns: generateDeaconResponses('d-fest', 'Matins') },
      { id: 'd-fest-offering-lamb', title: 'Offering of Lamb', hymns: generateDeaconResponses('d-fest', 'Offering of Lamb') },
      { id: 'd-fest-liturgy-word', title: 'Liturgy of the Word', hymns: generateDeaconResponses('d-fest', 'Liturgy of the Word') },
      { id: 'd-fest-liturgy-faithful', title: 'Liturgy of the Faithful', hymns: generateDeaconResponses('d-fest', 'Liturgy of the Faithful') },
      { id: 'd-fest-bishop', title: 'Vespers in Presence of Bishop / Patriarch', hymns: generateDeaconResponses('d-fest', 'Vespers in Presence of Bishop / Patriarch') },
    ],
  },
];

export const mainCategories: MainCategory[] = [
  {
    id: 'responses',
    title: 'Deacon / Altar Responses',
    description: 'Common responses, litanies, and dialogue between the Priest and the Congregation/Deacons.',
    deaconCategories: deaconCategories,
  },
  {
    id: 'hymns',
    title: 'Hymns',
    description: 'Complete collection of hymns categorized by liturgical seasons, fasts, and feasts.',
    seasons: seasons,
  },
];

// ---- Morning Doxology: add Eng-Coptic + Eng-Arabic ----
const morningDoxology = seasons
  .flatMap((s) => s.services)
  .flatMap((s) => s.hymns)
  .find((h) => h.id.endsWith('-morning-doxology'));

if (morningDoxology) {
  morningDoxology.versions = morningDoxology.versions.filter(
    (v) => v.language !== 'englishCoptic' && v.language !== 'englishArabic'
  );

  morningDoxology.versions.push(
    {
      language: 'englishCoptic',
      text: 'Ten-ou-osht em-Efiot nem Epshiri: nem Pi-epnevma ethowab: shere tee-eklesia: ep-ee ente ni-angelos.\n\nShere tee-Parthenos: etasmes Pen-soteer: shere Ghabriel: etaf-hi-shenofi nas.\n\nShere Mikhail: pi-arshee-angelos: Shere pi-gout eftou: em-epresvee-teros.\n\nShere ni-sherobim: Shere ni-serafim: Shere ni-taghma teero: eneporanion.\n\nShere Youanes: pinishti emeprodromos: Shere pi-meet-esnav: en-Apostolos.\n\nShere peniot Markos: pi-evangelistees: pirefgor evol: ente ne-idolon.\n\nShere Stefanos: pi-shorp em-martyros: Shere Georgios: pi-siou ente han-atoo-ee.\n\nShere ep-khoros teerf: ente ni-martyros: Shere Avva Antoni: nem pishomt Makarios.\n\nShere ep-khoros teerf: ente ni-estavroforos: Shere nee-ethowab teero: etaf-ranaf em-Epchois.\n\nHiten no-evshee: Pikhristos Pen-ouro: ari-oonai neman: khen tekmetouro.\n\n(Ethve Penchois Iesous Pikhristos)\n\nPi-oo-oyni enta-efmee: fee-eter-oo-oyni: eromi niven: eth-neyo epikosmos.\n\nAki epikosmos: hiten tek-metmayromi: a tee-ekteesees teers: theleel kha pek-jin-ee.\n\nAksoti en-Adam: evol khen tee-apatee: aker Eva en-remhe: khen ni-nakhi ente efmo.\n\nAktee nan em-Piepnevma: ente tee-metsheeri: enhos en-esmo erok: nem nek-angelos.\n\nKhen ep-jin-ethrefi nan ekhon: enje efnav enshorp: o Pikhristos Penouti: Pi-oo-oyni enta-efmee.\n\nMaro-shai enkheeten: enje nilogismos ente pi-oo-oyni: owoh empenethref-hobsten: enje epkaki en-nipathos.\n\nHina entenhos erok: en-no-eetos nem David: en-osh oo-veek: owoh engo emmos.\n\nJe aver-shorp emfo: enje naval emefnav en-shorp: ermeletan: khen neksaji teero.\n\nSotem e-tenesmee: kata peknishtee ennai: nahmen Epshois Penouti: kata nek-metshenheet.\n\nEfnouti Pifai-roo-oush: enref-erpethnanef: pi-ref-er-eekonomin: enef-sotp enkalos.\n\nPi-referhemi etgor: enee-etavfot harof: ef-ref-chishoo-ou ente ou-on niven: nohem en-to-ougai.\n\nKhen tek-met-ekhreetos: aksovtee nan em-pi-egorh: ari-ehmot nan em-pai-ehoo-ou: enoi en-athnovi.\n\nEthren-er-epemepsha: efai en-nenjig ep-shoi: harok em-pekemtho: khoris gont nem mokmek ef-ho-ou.\n\nKhen tai-han-ata-oowee: co-toun nenmoit ekhon: nem nenmoit evol: khen ep-oo-nof ente tek-eskepee.\n\nEthren-go entek-methme: en-eho-ou niven: en-tenhos en-tekgom: nem David pi-eprofeetees.\n\nJe khen tek-hirinee: Pikhristos Pensoteer: anenkot an-ta-oo-oun: je aner-helpis erok.\n\nHe-pe oo-pethnanef: ye oo-pet-holg eveel: eptee-matee en-hanesneyo: evshop hi ooma.\n\nEv-ersimfonin: khen oo-aghapee em-mee: en-evangelikee: kata ni-apostolos.\n\nEm-efreetee empi-sojen: ete-afe emPikhristos: ef-neyoo ejen tee-mort: sha ekhree eni-eshalavg.\n\nEf-thohs em-meeni niven: ni-kheloi nem ni-alaowee: nem ni-khelsheeri: nem ni-diakonistees.\n\nNai etaf-hotpou evsop: enje Pi-epnevma ethowab: em-efreetee en-oo-kithara: ev-esmo e-Efnouti en-seeoo niven.\n\nKhen han-psalmos nem han-hos: nem han-odee em-epnevmatikon: em-pi-ehoo-ou nem pi-egorh: khen oo-heet en-at-kharof.\n\n(Ethve tee-Parthenos)\n\nEntho ethmav em-Pi-oo-oyni: et-tai-eeoot em-Masnouti: aref-ai kha Pi-logos: Pi-akhoreetos.\n\nMenensa thremasf: are-ohi ere-oi em-parthenos: khen han-hos nem han-esmo: ten-chisi emmo.\n\nJe entof khen pef-ou-osh: nem ep-teematee em-Pef-yot: nem Pi-epnevma ethowab: af-ee afsotee emmon.\n\nAnon hon tentovh: ethren-shashni ev-nai: hiten ne-epresvia: entotf em-Pi-mai-romi.\n\nA pi-esthoinoufi etsotp: ente te-parthenia: af-shenaf ep-shoi: sha pi-thronos em-Efiot.\n\nEhote pi-esthoinoufi: ente ni-sherobim: nem ni-serafim: Maria tee-Parthenos.\n\nShere tee-fe emveri: thee-eta Efiot thamios: afkhas en-ooma en-emton: em-Pef-sheeri em-menrit.\n\nShere pi-thronos: em-vasilikon: em-fee-etoo-fai emmof: hijen ni-sherobim.\n\nShere tee-eprostatees: ente nen-psykhee: entho gar aleethos: pe ep-shoushou em-pen-genos.\n\nAri-epresvevin ejon: o thee-ethmeh en-ehmot: nahren Pen-soteer: Pen-chois Iesous Pikhristos.\n\nHopos entef-tajron: khen pi-nahti etsouton: owoh entef-er-ehmot nan: em-pi-kho evol ente nen-novi.\n\nHiten ni-epresvia: ente tee-Theotokos ethowab Maria: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(Ethve ni-angelos)\n\nHana-ensho en-sho: nem han-ethva en-ethva: en-arshee-angelos: nem angelos ethowab.\n\nEv-ohi eratou: em-pem-tho em-pi-thronos: ente Pi-pantokrator: ev-osh evol ev-jo emmos.\n\nJe ekh-owab ekh-owab: ekh-owab khen oo-methmee: pi-o-oo nem pi-taio: er-eprepi en-tee-Trias.\n\nHiten ni-epresvia: ente ep-khoros teerf ente ni-angelos: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(Ethve ni-apostolos)\n\nNeniotee en-apostolos: av-hi-oish khen ni-ethnos: khen pi-evangelion: ente Iesous Pikhristos.\n\nA pou-ekhro-ou shenaf: hijen ep-kahi teerf: owoh nou-saji av-foh: sha avreejs en-tee-ikoumenee.\n\nHiten ni-evshee: ente nachois en-iotee en-apostolos: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(Ethve ni-martyros)\n\nHan-ekhlom en-atlom: af-teeitou enje Epchois: hijen ep-khoros teerf: ente ni-martyros.\n\nAf-toujo-ou af-nahmou: je avfot harof: av-ershai nemaf: khen tef-metouro.\n\nHiten ni-evshee: ente ep-khoros teerf ente ni-martyros: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(Ethve nee-ethowab)\n\nNee-ethowab entak: eve-esmo erok: eve-saji em-ep-o-oo: ente tek-metouro.\n\nTek-metouro Panouti: oo-metouro en-eneh: owoh tek-metchois: sha ni-genea teero.\n\nHiten ni-evshee: ente ep-khoros teerf ente ni-estavroforos: nem ni-ethmee nem ni-dikeos: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(Ethve ni-patriarkhees nem ni-eprofeetees)\n\nShere Eelias: pi-sofron em-eprofeetees: nem Eliseos: pef-sotp em-matheetees.\n\nPi-nishti en-ref-hi-oish: khen tee-khora ente Kheemi: Markos pi-apostolos: pes-shorp en-ref-er-hemi.\n\nEntho pe ethmav em-Efnouti: Maria tee-Parthenos: tovh emmof ejon: ethref-nai kha pen-genos.\n\nPi-nishti em-patriarkhees: peniot Avva Seveeros: fee-eta nef-esvo-owi ethowab: er-oo-oyni em-pen-nous.\n\nPeniot en-omologeetees: Avva Dioskoros: af-mishi ejen pi-nahti: ouve ni-hereteekos.\n\nNem neniotee teero: etav-ranaf em-Epchois: ere pou-esmo ethowab: shopi nan en-oo-ref-rois.\n\nHiten nou-evshee: ari-ehmot nan Efnouti: em-pi-kho evol ente nen-novi: moi nan en-oo-sotee.',
    },
    {
      language: 'englishArabic',
      text: 'Nesgod lel-Ab wel-Ibn, wel-Roh el-Qodos, es-salamo lel-kanisa, beit el-malaika.\n\nEs-salamo lel-Azra, elli waladet mokhalisna, es-salamo le-Ghabrial, elli bashsharha.\n\nEs-salamo le-Mikhail, ra\'is el-malaika, es-salamo lel-arba\'a wel-\'eshrin, qessisan.\n\nEs-salamo lel-Sharubim, es-salamo lel-Sarafim, es-salamo le-gamee\' el-taghamat, es-samaya\'ia.\n\nEs-salamo le-Yohanna, es-sabeq el-\'azim, es-salamo lel-ithnay \'ashar, rasoolan.\n\nEs-salamo le-abina Morqos, el-Engili, mobaddid, el-awthan.\n\nEs-salamo le-Estefanos, el-shaheed el-awwal, es-salamo le-Gerges, kawkab el-sobh.\n\nEs-salamo le-gamee\' sofoof, el-shohada, es-salamo le-Anba Antonios, wel-thalatha el-Maqarat.\n\nEs-salamo le-gamee\' sofoof, lobbas el-saleeb, es-salamo le-gamee\' el-qiddiseen, elladhina ardaw el-Rab.\n\nAyyoha el-Maseeh malikna, be-salawatihim, esna\' ma\'ana rahma, fi malakootak.\n\n(For Our Lord Jesus Christ)\n\nAyyoha el-noor el-haqeeqi, elladhi yodee\', le-kolli ensan, atin ela el-\'alam.\n\nAtaita ela el-\'alam, be-mahabbatika lel-bashar, wa kol el-khaleeqa, tahallalat be-maji\'ik.\n\nKhallasta Adam, min el-ghawaya, wa \'ataqta Hawwa, min talaqat el-mawt.\n\nA\'taitana, roh el-bonowwa, nosabbehok wa nobarikok, ma\'a mala\'ikatik.\n\n\'Indama yadkhol, waqt bakir ilaina, ayyoha el-Maseeh elahna, el-noor el-haqeeqi.\n\nFalteshriq feena, hawas el-noor, wa la toghatteena, zolmat el-alam.\n\nLe-key nosabbehok, \'aqliyyan, ma\'a Dawood, sarikheen, nahwak qa\'ileen.\n\n"Sabaqa an balaghat, \'aynay waqt el-sahar, le-atlo, gamee\' aqwalik."\n\nEsma\' sawtana, ka-\'azeem rahmatik, wa naggina ayyoha el-Rab elahna, hasab ra\'afatik.\n\nYa Allah el-mohtam, sani\' el-khayrat, modabbir mokhtareeh, hasanan.\n\nEl-modabbir el-qawi, lel-moltaji\'een, el-motashawweq le-khalas, wa nagat kol ahad.\n\nBe-salahik hayya\'ta, lana el-layl, an\'im lana be-hadha el-yawm, wa nahno be-ghayr khateeya.\n\nLe-nastahiqq an narfa\', aydeena elaik, amamak be-ghayr ghadab, wa la fikr radi\'.\n\nFi hadha el-sahar, sahhil toroqana, el-dakhiliyya wel-kharigiyya, be-sitrik el-mofrih.\n\nLe-nantiq be-\'adlik, kol yawm, wa nomagged qowwatak, ma\'a Dawood el-nabi.\n\nQa\'ileen "Be-salamik, ayyoha el-Maseeh mokhalisna, raqadna wa qomna, li-annana tawakkalna \'alaik.\n\nHa ma howa el-hasan, wa ma howa el-helw, illa ettifaq ekhwa, sakineen ma\'an."\n\nMottafiqeen, be-mahabba haqeeqiyya, engeeliyya, ka-mithl el-rosol.\n\nMithl el-tayyeb, \'ala ra\'s el-Maseeh, el-nazil \'ala el-lihya, ela asfal el-rigleen.\n\nYamsah kol yawm, el-shoyookh, wel-sibyan wel-fatayat, wel-khoddam.\n\nHa\'olaa elladhina, allafahom el-Roh el-Qodos ma\'an, mithl qeethara mosabbiheen, Allah kol heen.\n\nBe-mazameer wa tasabeeh, wa taraneem roheyya, el-nahar wel-layl, be-qalb la yafter.\n\n(For the Virgin)\n\nAnti ya omm el-noor, el-mokarrama walidat el-Ilah, hamalti el-Kalima, ghayr el-mahwi.\n\nWa min ba\'d an waladtih, baqeeti \'azra, no\'azzemok be-tasabeeh, wa barakat.\n\nLi-annahu be-eradatih, wa masarrat abeeh, wel-Roh el-Qodos, ata wa khallasna.\n\nWa nahno ayadan, natlob an nafooz, be-rahma be-shafa\'atik, lada moheb el-bashar.\n\nEl-bokhoor el-mokhtar, elladhi le-betooliyyatik, sa\'ada ela, korsi el-Ab.\n\nAfdal min bokhoor, el-Sharubim, wel-Sarafim, ya Maryam el-\'Azra.\n\nEs-salamo lel-sama\' el-gadeeda, elleti sana\'aha el-Ab, wa ga\'alaha mawdi\' raha, le-ibnihi el-Habeeb.\n\nEs-salamo lel-korsi, el-molookeyy, elladhi lel-mahmool, \'ala el-Sharubim.\n\nEs-salamo le-shafee\'at, nofoosina, anti bel-haqeeqa, fakhr ginsina.\n\nIshfa\'i feena, ya momtali\'at ne\'ma, amama mokhalisna, Rabbona Yasoo\' el-Maseeh.\n\nLe-key yothabbitana, fil-eman el-mostaqeem, wa yon\'em lana, be-maghfirat khataya-na.\n\nBe-shafa\'at, walidat el-Ilah el-qiddeesa Maryam, ya Rab en\'im lana, be-maghfirat khataya-na.\n\n(For the Angels)\n\nAloof aloof, wa rabawat rabawat, ro\'asa\' mala\'ika, wa mala\'ika moqaddaseen.\n\nWoqoof amama, korsi, dabet el-kol, sarikheen qa\'ileen:\n\n"Qoddoos qoddoos, qoddoos bel-haqeeqa, el-majd wel-karama, yaleeqan bel-thaloot."\n\nBe-shafa\'at, gamee\' sofoof el-mala\'ika, ya Rab en\'im lana, be-maghfirat khataya-na.\n\n(For the Apostles)\n\nAba\'ona el-rosol, bashsharoo fil-omam, be-engeel, Yasoo\' el-Maseeh.\n\nKharagat aswatohom, ela el-ard kolliha, wa balagha kalamohom, ela aqtar el-maskoona.\n\nBe-salawat, sadati el-aba\' el-rosol, ya Rab en\'im lana, be-maghfirat khataya-na.\n\n(For the Martyrs)\n\nAkaleel ghayr modmahilla, ga\'alaha el-Rab, \'ala gamee\', sofoof el-shohada.\n\nAnqadhahom wa khallasahom, li-annahom eltaja\'oo elaih, wa \'ayyadoo ma\'ah, fi malakootih.\n\nBe-salawat, gamee\' sofoof el-shohada, ya Rab en\'im lana, be-maghfirat khataya-na.\n\n(For the Saints)\n\nQiddeesook, yobarikoonak, wa yantiqoon be-majd, malakootak.\n\nMalakootak ya elahi, malakoot abadi, wa robooboyyatak, ela kol el-agyal.\n\nBe-salawat, kaffat masaff labisi el-saleeb, wel-abrar wel-siddeeqeen, ya Rab en\'im lana, be-maghfirat khataya-na.\n\n(For the Patriarchs and the Prophets)\n\nEs-salamo le-Eliyya, el-nabi el-mota\'affif, wa Elisha\', talmeezuhu el-mokhtar.\n\nEl-mobashshir el-\'azeem, fi koorat Misr, Morqos el-rasool, modabbiroha el-awwal.\n\nAnti hiya omm Allah, ya Maryam el-\'Azra, otlobi minhu \'anna, an yarham ginsana.\n\nEl-batreyark el-\'azeem, abouna Anba Sawiros, elladhi anarat ta\'aleemuhu, el-moqaddasa \'oqoolana.\n\nAbouna el-mo\'tarif, Anba Dioscoros, haraba \'an el-eman, didd el-haratiqa.\n\nWa kol aba\'ina, elladhina ardaw el-Rab, barakatohom el-moqaddasa, takoon lana harisan.\n\nBe-salawatihim, en\'im lana ya Allah, be-maghfirat khataya-na, wa a\'tina salaman.',
    }
  );
}

// ---- Annual > Morning Praises: only 2 hymns ----
const annualMorningPraises = seasons
  .find((s) => s.id === 'annual')
  ?.services.find((s) => s.id === 'annual-morning-praises');

if (annualMorningPraises) {
  annualMorningPraises.hymns = annualMorningPraises.hymns.filter(
    (h) => h.id.endsWith('-morning-doxology')
  );

  annualMorningPraises.hymns.push({
    id: 'annual-morning-praises-adam-theotokias-conclusion',
    title: 'Ⲛⲉⲕⲛⲁⲓ ⲱ̀ Ⲡⲁⲛⲟⲩϯ (Conclusion of the Adam Theotokias)',
    versions: [
      {
        language: 'coptic',
        text: 'Ⲛⲉⲕⲛⲁⲓ ⲱ̀ Ⲡⲁⲛⲟⲩϯ: ϩⲁⲛⲁⲧϭⲓⲏ̀ⲡⲓ ⲙ̀ⲙⲱⲟⲩ: ⲥⲉⲟϣ ⲉ̀ⲙⲁϣⲱ: ⲛ̀ϫⲉ ⲛⲉⲕⲙⲉⲧϣⲉⲛϩⲏⲧ.\n\nⲚⲓⲧⲉⲗⲧⲓⲗⲓ ⲙ̀ⲙⲟⲩⲛϩⲱⲟⲩ: ⲥⲉⲏⲡ ⲛ̀ⲧⲟⲧⲕ ⲧⲏⲣⲟⲩ: ⲡⲓⲕⲉϣⲱ ⲛ̀ⲧⲉ ⲫ̀ⲓⲟⲙ: ⲥⲉⲭⲏ ⲛⲁϩⲣⲉⲛ ⲛⲉⲕⲃⲁⲗ.\n\nⲒⲉ ⲁⲩⲏⲣ ⲙⲁⲗⲗⲟⲛ: ⲛⲓⲛⲟⲃⲓ ⲛ̀ⲧⲉ ⲧⲁⲯⲩⲭⲏ: ⲛⲁⲓ ⲉⲑⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ: ⲙ̀ⲡⲉⲕⲙ̀ⲑⲟ Ⲡⲁϭⲟⲓⲥ.\n\nⲚⲓⲛⲟⲃⲓ ⲉ̀ⲧⲁⲓⲁⲧⲟⲩ: Ⲡⲁϭⲟⲓⲥ ⲛ̀ⲛⲉⲕⲉⲣⲡⲟⲩⲙⲉⲩⲓ̀: ⲟⲩⲇⲉ ⲙ̀ⲡⲉⲣϯϩ̀ⲑⲏⲕ: ⲉ̀ⲛⲁⲁ̀ⲛⲟⲙⲓⲁ.\n\nϪⲉ ⲡⲓⲧⲉⲗⲱⲛⲏⲥ ⲁⲕⲥⲟⲧⲡϥ: ϯⲡⲟⲣⲛⲏ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲥ: ⲡⲓⲥⲟⲛⲓ ⲉⲧⲥⲁⲟⲩⲓ̀ⲛⲁⲙ: Ⲡⲁϭⲟⲓⲥ ⲁⲕⲉⲣⲡⲉϥⲙⲉⲩⲓ̀.\n\nⲀ̀ⲛⲟⲕ ϩⲱ Ⲡⲁϭⲟⲓⲥ: ϧⲁ ⲡⲓⲣⲉϥⲉⲣⲛⲟⲃⲓ: ⲙⲁⲧ̀ⲥⲁⲃⲟⲓ ⲛ̀ⲧⲁⲓ̀ⲣⲓ: ⲛ̀ⲟⲩⲙⲉⲧⲁⲛⲟⲓⲁ.\n\nϪⲉ ⲭ̀ⲟⲩⲱϣ ⲙ̀ⲫ̀ⲙⲟⲩ ⲁⲛ: ⲙ̀ⲡⲓⲣⲉϥⲉⲣⲛⲟⲃⲓ: ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲧⲉϥⲧⲁⲥⲑⲟϥ: ⲛ̀ⲧⲉⲥⲱⲛϧ ⲛ̀ϫⲉ ⲧⲉϥⲯⲩⲭⲏ.\n\nⲘⲁⲧⲁⲥⲑⲟⲛ Ⲫ̀ⲛⲟⲩϯ: ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲡⲉⲕⲟⲩϫⲁⲓ: ⲁ̀ⲣⲓⲟⲩⲓ̀ ⲛⲉⲙⲁⲛ: ⲕⲁⲧⲁ ⲧⲉⲕⲙⲉⲧⲁ̀ⲅⲁⲑⲟⲥ.\n\nϪⲉ ⲛ̀ⲑⲟⲕ ⲟⲩⲁ̀ⲅⲁⲑⲟⲥ: ⲟⲩⲟϩ ⲛ̀ⲛⲁⲏⲧ: ⲙⲁⲣⲟⲩⲧⲁϩⲟⲛ ⲛ̀ⲭⲱⲗⲉⲙ: ⲛ̀ϫⲉ ⲛⲉⲕⲙⲉⲧϣⲉⲛϩⲏⲧ.\n\nϢⲉⲛϩⲏⲧ ϧⲁⲣⲟⲛ ⲧⲏⲣⲉⲛ: Ⲡ̀ϭⲟⲓⲥ Ⲫ̀ⲛⲟⲩϯ Ⲡⲉⲛⲥⲱⲧⲏⲣ: ⲟⲩⲟϩ ⲛⲁⲓ ⲛⲁⲛ: ⲕⲁⲧⲁ ⲡⲉⲕⲛⲓϣϯ ⲛ̀ⲛⲁⲓ.\n\nⲚⲁⲓ ⲕ̀ⲓ̀ⲣⲓ ⲙ̀ⲡⲟⲩⲙⲉⲩⲓ̀: ⲱ̀ Ⲡⲉⲛⲛⲏⲃ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲉⲕⲉ̀ϣⲱⲡⲓ ϧⲉⲛ ⲧⲉⲛⲙⲏϯ: ⲉⲕⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲕϫⲱ ⲙ̀ⲙⲟⲥ.\n\nϪⲉ ⲧⲁϩⲓⲣⲏⲛⲏ ⲁ̀ⲛⲟⲕ: ϯϯ ⲙ̀ⲙⲟⲥ ⲛⲱⲧⲉⲛ: ⲧ̀ϩⲓⲣⲏⲛⲏ ⲙ̀Ⲡⲁⲓⲱⲧ: ϯⲭⲱ ⲙ̀ⲙⲟⲥ ⲛⲉⲙⲱⲧⲉⲛ.\n\nⲠ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ϯϩⲓⲣⲏⲛⲏ: ⲙⲟⲓ ⲛⲁⲛ ⲛ̀ⲧⲉⲕϩⲓⲣⲏⲛⲏ: ⲥⲉⲙⲛⲓ ⲛⲁⲛ ⲛ̀ⲧⲉⲕϩⲓⲣⲏⲛⲏ: ⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nϪⲱⲣ ⲉ̀ⲃⲟⲗ ⲛ̀ⲛⲓϫⲁϫⲓ: ⲛ̀ⲧⲉ Ϯⲉⲕⲕⲗⲏⲥⲓⲁ: ⲁ̀ⲣⲓⲥⲟⲃⲧ ⲉ̀ⲣⲟⲥ: ⲛ̀ⲛⲉⲥⲕⲓⲙ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲈⲙⲙⲁⲛⲟⲩⲏⲗ Ⲡⲉⲛⲛⲟⲩϯ: ϧⲉⲛ ⲧⲉⲛⲙⲏϯ ϯⲛⲟⲩ: ϧⲉⲛ ⲡ̀ⲱ̀ⲟⲩ ⲛ̀ⲧⲉ Ⲡⲉϥⲓⲱⲧ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ.\n\nⲚ̀ⲧⲉϥⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲛ ⲧⲏⲣⲉⲛ: ⲛ̀ⲧⲉϥⲧⲟⲩⲃⲟ ⲛ̀ⲛⲉⲛϩⲏⲧ: ⲛ̀ⲧⲉϥⲧⲁⲗϭⲟ ⲛ̀ⲛⲓϣⲱⲛⲓ: ⲛ̀ⲧⲉ ⲛⲉⲛⲯⲩⲭⲏ ⲛⲉⲙ ⲛⲉⲛⲥⲱⲙⲁ.\n\nⲦⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲕ ⲱ̀ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ (ⲁⲕⲧⲱⲛⲕ/ ⲁⲕⲓ̀) ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ.',
      },
      {
        language: 'englishCoptic',
        text: 'Neknai ō Panouti: hanattshi-ēpi emmōou: seosh emashō: enje nekmetshenhēt.\n\nNiteltili emmounhōou: seēp entotk tērou: pikeshō ente efiom: sekhē nahren nekval.\n\nIe auēr mallon: ninovi ente tapsukhē: nai ethouōnh evol: empekemtho Patshois.\n\nNinovi etaiatou: Patshois ennekerpoumeu-i: oude emperti-ehthēk: ena-anomia.\n\nJe pitelōnēs aksotpf: tipornē aksōti emmos: pisoni etsaou-inam: Patshois akerpefmeu-i.\n\nAnok hō Patshois: kha pirefernovi: ma-etsavoi enta-iri: enoumetanoia.\n\nJe ekhouōsh emefmou an: empirefernovi: emefrēti enteftasthof: entesōnkh enje tefpsukhē.\n\nMatasthon Efnouti: ekhoun epekoujai: ariou-i neman: kata tekmetagathos.\n\nJe enthok ou-agathos: ouoh ennaēt: maroutahon enkhōlem: enje nekmetshenhēt.\n\nShenhēt kharon tēren: Eptshois Efnouti Pensōtēr: ouoh nai nan: kata peknishti ennai.\n\nNai ekiri empoumeu-i: ō Pennēb Pi-ekhristos: ekeshōpi khen tenmēti: ekōsh evol ekjō emmos.\n\nJe tahirēnē anok: titi emmos nōten: ethirēnē em-Paiōt: tikhō emmos nemōten.\n\nEpouro ente tihirēnē: moi nan entekhirēnē: semni nan entekhirēnē: kha nennovi nan evol.\n\nJōr evol ennijaji: ente Tiekklēsia: arisobt eros: enneskim sha eneh.\n\nEmmanouēl Pennouti: khen tenmēti tinou: khen epōou ente Pefiōt: nem Pi-epneuma ethouab.\n\nEntefesmou eron tēren: enteftouvo ennenhēt: enteftaltsho ennishōni: ente nenpsukhē nem nensōma.\n\nTenouōsht emmok ō Pi-ekhristos: nem Pekiōt enagathos: nem Pi-epneuma ethouab: je (aktōnk/ aki) aksōti emmon.',
      },
      {
        language: 'english',
        text: 'Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.\n\nAll the rain drops, are counted by You, and the sand of the sea, is before Your eyes.\n\nHow much more are, the sins of my soul, manifest before You, O my Lord.\n\nThe sins that I have committed, do not remember my Lord, and do not count, my iniquities.\n\nFor You have chosen the publican, and the adulteress You have saved, and the right-hand thief, my Lord You have remembered.\n\nAnd me too, the sinner, teach me O my Master, to offer repentance.\n\nFor You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.\n\nRestore us O God, to Your salvation, and deal with us, according to Your goodness.\n\nFor You are good, and merciful, let Your compassion, speedily come to us.\n\nHave compassion upon us all, O Lord God our Savior, and have mercy upon us, according to Your great mercy.\n\nRemember those, O Christ our Master, be among us, and proclaim and say.\n\n"My peace I, give to you, the peace of My Father, I leave with you."\n\nO King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.\n\nDisperse the enemies, of the Church, and fortify her that she, may not be shaken forever.\n\nEmmanuel our God, is now in our midst, with the glory of His Father, and the Holy Spirit.\n\nMay He bless us all, and purify our hearts, and heal the sicknesses, of our souls and bodies.\n\nWe worship You O Christ, with Your good Father, and the Holy Spirit, for You have (risen/come) and saved us.',
      },
      {
        language: 'englishArabic',
        text: 'Maraheemak ya elahi, ghayr mohsah, wa kathira giddan, hiya ra\'afatik.\n\nQatarat el-matar, mohsah \'indak gamee\'uha, wa raml el-bahr, ka\'in amama \'aynayk.\n\nFakam bel-harey, khataya nafsi, hadhihi el-zahira, amamak ya rabbi.\n\nEl-khataya elleti sana\'tuha, ya rabbi la tadhkoruha, wa la tahsib, athami.\n\nFa\'inna el-\'ashshar ikhtartah, wel-zaniya khallastaha, wel-liss el-yameen, ya sayyidi dhakartah.\n\nWa ana ayadan el-khati\', ya sayyidi, \'allimni, an asna\' tawba.\n\nLi\'annak la tasha\', mawt el-khati\', mithl an yarge\', wa tahya nafsoh.\n\nRadduna ya Allah, ela khalasik, wa \'amilna, ka-salahik.\n\nLi\'annak anta saleh, wa rahoom, fal-yodrikna, ra\'afatik sari\'an.\n\nTara\'af \'alaina kolena, ayyoha el-Rab el-Ilah, mokhalisna warhamna, ka-\'azeem rahmatik.\n\nHa\'ola\' adhkorhom, ya sayyidna el-Maseeh, kun fi wasatina, sarikhan qa\'ilan:\n\n"Salami ana, o\'teekom, salam abi, atrukuhu ma\'akom."\n\nYa malik el-salam, a\'tina salamak, qarrir lana salamak, wagh-fir lana khataya-na.\n\nFarriq a\'da\' el-kanisa, wa hassinha, fala tatazaz\'a, ela el-abad.\n\n\'Emmanoeil elahna, fi wasatina el-an, be-majd abeeh, wel-Roh el-Qodos.\n\nLi-yobarikna kolena, wa yotahhir qoloobana, wa yashfi amrad, nofoosina wa agsadina.\n\nNasgod lak ayyoha el-Maseeh, ma\'a abeek el-saleh, wel-Roh el-Qodos, li\'annak (qomt/ataita) wa khallastana.',
      },
      {
        language: 'arabic',
        text: 'مراحمك يا إلهي، غير محصاة، وكثيرة جداً، هي رأفاتك.\n\nقطرات المطر، محصاة عندك جميعها، ورمل البحر، كائن أمام عينيك.\n\nفكم بالحري، خطايا نفسي، هذه الظاهرة، أمامك يا ربي.\n\nالخطايا التي صنعتها، يا ربي لا تذكرها، ولا تحسب، آثامي.\n\nفإن العشار إخترته، والزانية خلصتها، واللص اليمين، يا سيدي ذكرته.\n\nوأنا أيضاً الخاطئ، يا سيدي، علمني، أن أصنع توبة.\n\nلأنك لا تشاء، موت الخاطئ، مثل أن يرجع، وتحيا نفسه.\n\nردنا يا الله، إلى خلاصك، وعاملنا، كصلاحك.\n\nلأنك أنت صالح، ورحوم، فلتدركنا، رأفاتك سريعاً.\n\nترأف علينا كلنا، أيها الرب الإله، مخلصنا وإرحمنا، كعظيم رحمتك.\n\nهؤلاء أذكرهم، يا سيدنا المسيح، كن في وسطنا، صارخاً قائلاً:\n\n"سلامي أنا، أعطيكم، سلام أبي، أتركه معكم."\n\nيا ملك السلام، أعطنا سلامك، قرر لنا سلامك، وإغفر لنا خطايانا.\n\nفرِّق أعداء الكنيسة، وحصنها، فلا تتزعزع، إلى الأبد.\n\nعمانوئيل إلهنا، في وسطنا الآن، بمجد أبيه، والروح القدس.\n\nليباركنا كلنا، ويطهر قلوبنا، ويشفي أمراض، نفوسنا وأجسادنا.\n\nنسجد لك أيها المسيح، مع أبيك الصالح، والروح القدس، لأنك (قمت/أتيت) وخلصتنا.',
      },
    ],
  });
}

// ---- Audio: Annual > Distribution > Psalm 150 ----
const psalm150Audio = seasons
  .find((s) => s.id === 'annual')
  ?.services.find((s) => s.id === 'annual-distribution')
  ?.hymns.find((h) => h.id.endsWith('-psalm-150'));

const psalm150ArabicVersion = psalm150Audio?.versions.find((v) => v.language === 'arabic');
if (psalm150ArabicVersion) {
  psalm150ArabicVersion.audio = 'psalm-150-arabic.m4a';
}const psalm150EnglishArabicVersion = psalm150Audio?.versions.find((v) => v.language === 'englishArabic');
if (psalm150EnglishArabicVersion) {
  psalm150EnglishArabicVersion.audio = 'psalm-150-arabic.m4a';
}
const psalm150CopticVersion = psalm150Audio?.versions.find((v) => v.language === 'coptic');
if (psalm150CopticVersion) {
  psalm150CopticVersion.audio = 'psalm-150-coptic.mp3';
}
const psalm150EnglishCopticVersion = psalm150Audio?.versions.find((v) => v.language === 'englishCoptic');
if (psalm150EnglishCopticVersion) {
  psalm150EnglishCopticVersion.audio = 'psalm-150-coptic.mp3';
}
const psalm150EnglishVersion = psalm150Audio?.versions.find((v) => v.language === 'english');
if (psalm150EnglishVersion) {
  psalm150EnglishVersion.audio = 'psalm-150-english.mp3';
}

// ---- Annual > Distribution: add "Melodies" divider + Our Father ----
const annualDistribution = seasons
  .find((s) => s.id === 'annual')
  ?.services.find((s) => s.id === 'annual-distribution');

if (annualDistribution) {
  annualDistribution.hymns = annualDistribution.hymns.filter(
    (h) => h.id.endsWith('-psalm-150') || h.id.endsWith('-pi-oik')
  );

  annualDistribution.hymns.push(
    {
      id: 'annual-distribution-melodies-header',
      title: 'Melodies',
      versions: [],
      isSectionHeader: true,
    },
    {
      id: 'annual-distribution-our-father',
      title: 'Our Father Who Art in Heaven / أبانا الذي في السماوات',
      versions: [
        {
          language: 'english',
          text: 'Our Father who art in heaven\nBefore His glory bows every knee\nWe plead that our sins be forgiven\nWe humbly stand praying to Thee.\n\nHallowed be Your glorious name\nWhom the Cherubim and the Seraphim fear\nThough our sins put us to shame\nWe ask, as Your children, our plea hear.\n\nYour kingdom come in the world today\nThat we may live in Your kingdom now\nYour Holy Spirit will lead our way\nYour guiding hand will show us how.\n\nYour will be done for You are the King\nAs all creation praise Your name\nOur will, under Your feet, we bring\nPlease set our hearts with Your love aflame.\n\nOn earth as it is in heaven\nFor all by Your mighty power are made\nThe honor and majesty be given\nTo You, may we be, with Your hand guided.\n\nGive us this day our daily bread\nFor You alone, our needs supply\nOur souls forever with Your love be fed\nFor Your love is all we need to live by.\n\nForgive our trespasses as we forgive\nThose who do against us trespass\nPurity of heart, O Lord please give\nAnd let our wicked sins to pass.\n\nAnd lead us not into temptation\nFor we are weak when we are alone\nBut through Your glorious salvation\nYour mighty hand will guide our own.\n\nDeliver us O God, from the evil of man\nAnd help us walk in the path of light\nYou cast away from us Satan\nAnd keep us guarded in Your holy sight.\n\nThrough the mediation of Christ Jesus\nThe Savior of the world in whom we believe\nThe fruits of salvation will be with us\nAnd what we ask in His name, we receive.\n\nFor Yours is the glory and kingdom\nPower and light for us will shine\nYou fill us with heavenly wisdom\nAnd grace from Your power divine\n\nFrom now and forever, Amen\nTo You our hearts and our souls will bring\nOfferings from the gifts we are given\nTo give our God, Savior and King.',
        },
        {
          language: 'englishArabic',
          text: 'Abana el-lazi fis-samawat\nTumajjiduka kullut-taghamat\nNasrukhu ilayka fid-dayyiqat\nYa Abana el-lazi fis-samawat.\n\nLi-yataqaddas ismuka ya mu\'een\nWa li-yatabarak fi kulli heen\nIrham \'abeedak el-khati\'een\nYa Abana el-lazi fis-samawat.\n\nLi-ya\'ti malakutuka ya Rabbi\nWa Rohuka el-Qudus yamluku qalbi\nHatha raja\'i wa talabi\nYa Abana el-lazi fis-samawat.\n\nLitakun mashi\'atuka fi kulli heen\nNafitha wa nahnu laha khadi\'een\nIj\'alna li-awamirika ta\'i\'een\nYa Abana el-lazi fis-samawat.\n\nKama fis-sama kazalik\n\'Alal-ard anta es-sayyid el-malik\nNajji \'abeedak minal-mahalik\nYa Abana el-lazi fis-samawat.\n\nKhubzuna el-lazi lil-ghad\nA\'tina el-yawm ya zal-majd\nMarahimuka kathira la tu\'ad\nYa Abana el-lazi fis-samawat.\n\nWa-ighfir lana zunubana ya mawlana\nYa Rabbi bi-marahimika la tansana\nKa-rahmatika wa laysa ka-khataya-na\nYa Abana el-lazi fis-samawat.\n\nKama naghfiru nahnu lil-muznibeen\nIlayna wal-a\'da\' el-musi\'een\n\'Allimna an nakuna mutasamiheen\nYa Abana el-lazi fis-samawat.\n\nWa la tudkhilna fi tajriba ya Ilahana\nWa in samahta fala tatakhalla \'anna\n\'Ala ihtimal et-tajarib a\'inna\nYa Abana el-lazi fis-samawat.\n\nLakin najjina minash-shirreer\nYa sahib el-amr wat-tadbeer\nAnta ya Ilahi \'alal-kulli baseer\nYa Abana el-lazi fis-samawat.\n\nBil-Maseeh Yasu\' Rabbina iqbalna\nYa Rabb bi-ma\'unatika ishmulna\nWa bi-sawtika el-mufrih isma\'na\nYa Abana el-lazi fis-samawat.\n\nLi-anna lakal-mulku wal-quwwa\nWal-majdu wal-\'azamatu wal-qudra\nBika naseeru min quwwatin ila quwwa\nYa Abana el-lazi fis-samawat.\n\nIla abadil-abideen\nIj\'alna fi imanika thabiteen\nWa isma\'na \'indama nasrukhu qa\'ileen\nYa Abana el-lazi fis-samawat.',
        },
        {
          language: 'arabic',
          text: 'أبانا الذي في السموات،\nتمجدك كل الطغمات،\nنصرخ إليك في الضيقات،\nيا أبانا الذي في السموات.\n\nليتقدس إسمك يا معين،\nوليتبارك في كل حين،\nإرحم عبيدك الخاطئين،\nيا أبانا الذي في السموات.\n\nليأتي ملكوتك يا ربي،\nوروحك القدوس يملك قلبي،\nهذا رجائي وطلبي،\nيا أبانا الذي في السموات.\n\nلتكن مشيئتك في كل حين،\nنافذة ونحن لها خاضعين،\nإجعلنا لأوامرك طائعين،\nيا أبانا الذي في السموات.\n\nكما في السماء كذلك،\nعلى الأرض أنت السيد المالك،\nنج عبيدك من المهالك،\nيا أبانا الذي في السموات.\n\nخبزنا الذي للغد،\nأعطنا اليوم ياذا المجد،\nمراحمك كثيرة لا تعد،\nيا أبانا الذي في السموات.\n\nوأغفر لنا ذنوبنا يا مولانا،\nيا ربي بمراحمك لا تنسانا،\nكرحمتك وليس كخطايانا،\nيا أبانا الذي في السموات.\n\nكما نغفر نحن للمذنبين،\nإلينا والأعداء المسيئين،\nعلمنا أن نكون متسامحين،\nيا أبانا الذي في السموات.\n\nولا تدخلنا في تجربة يا إلهنا،\nوأن سمحت فلا تتخلى عنا،\nعلى إحتمال التجارب أعنا،\nيا أبانا الذي في السموات.\n\nلكن نجنا من الشرير،\nيا صاحب الأمر والتدبير،\nأنت يا إلهي على الكل بصير،\nيا أبانا الذي في السموات.\n\nبالمسيح يسوع ربنا إقبلنا،\nيا رب بمعونتك إشملنا،\nوبصوتك المفرح إسمعنا،\nيا أبانا الذي في السموات.\n\nلأن لك الملك والقوة،\nوالمجد والعظمة والقدرة،\nبك نسير من قوة إلى قوة،\nيا أبانا الذي في السموات.\n\nإلى أبد الآبدين،\nإجعلنا في إيمانك ثابتين،\nوإسمعنا عندما نصرخ قائلين،\nيا أبانا الذي في السموات.',
        },
      ],
    },
    {
      id: 'annual-distribution-listen-o-christs-congregation',
      title: "Listen O Christ's Congregation / إسمعوا يا شعب المسيح",
      versions: [
        {
          language: 'english',
          text: 'Listen O Christ\'s congregation\nWith understanding and concentrations\nAnd sing with all jubilation\nChrist has granted us salvation.\n\nGive thanks unto Him for His grace\nAnd praise Him for His great kindness\nExalt His name in every place\nChrist has granted us salvation.\n\nThe bread of which we partake\nIs the body broken for our sake\nIt forgives every fault and mistake\nChrist has granted us salvation.\n\nThe wine in the cup that has been blessed\nBecomes the blood of Jesus Christ\nAnd remits all sins we have transgressed\nChrist has granted us salvation.\n\nThrough His compassion and love divine\nHe granted unto us, sons of men\nThis mystery of the bread and wine\nChrist has granted us salvation.\n\nThe holy angels of heavens\nDesire to behold and look given\nThis mystery we have been given\nChrist has granted us salvation.\n\nDeath came to the world by one man\'s mistake\nBut the Lord shed His blood for our sake\nThis is the blood of which we partake\nChrist has granted us salvation.\n\nThe manna given in the wilderness\nWas a figure of this mystery of goodness\nWe deserve it only if we confess\nChrist has granted us salvation.\n\nThis is the true heavenly bread\nThis is the blood that for us He shed\nThrough them we are to Him united\nChrist has granted us salvation.\n\nEvery time we partake with affection\nWe remember His death and resurrection\nAnd His mysteries will lead us to perfection\nChrist has granted us salvation.',
        },
        {
          language: 'englishArabic',
          text: 'Isma\'u ya sha\'b el-Maseeh\nWa tafahhamu bi-\'aqlin rajeeh\nWa seehu bi-lisanin faseeh\nEl-Maseeh an\'ama lana bil-khalas.\n\nUshkuru fadlahu wa ihsanah\nLi-annahu a\'tana jazeela in\'amih\nWa an\'ama \'alayna bi-asrarih\nEl-Maseeh an\'ama lana bil-khalas.\n\nBi-iradatihi el-ilahiya\nWa hikmatihi el-\'ulwiya\nAwhaba lana asraran khafiya\nEl-Maseeh an\'ama lana bil-khalas.\n\nTashtahi el-mala\'ika en-nuraniya\nAn tanzura hazihi el-\'atiya\nAllati an\'ama biha lil-bashariya\nEl-Maseeh an\'ama lana bil-khalas.\n\nJada \'alayna bil-ghufran\nWa kasara \'anna fakhkh esh-shaytan\nWa a\'tana jasadahu qurban\nEl-Maseeh an\'ama lana bil-khalas.\n\nHikma \'ameeqa wa sirrun khafi\nLa yudrikuhuma \'aqlun bashari\nIlla el-Ilah el-hayy el-azali\nEl-Maseeh an\'ama lana bil-khalas.\n\nKhubzan mawdu\'an fis-seeniya\nLi-mahw ez-zunub wal-khatiya\nMan akalahu yanal hayah abadiya\nEl-Maseeh an\'ama lana bil-khalas.\n\nKhamran tahiran mamzujan bil-ka\'s\nLi-ajl et-tawba wal-khalas\nMan yashrabuhu yanja min el-qisas\nEl-Maseeh an\'ama lana bil-khalas.\n\nKhalasan lil-arwah wan-nufus\nWa man yu\'min bi-ism el-Quddus\nYanal meerath el-firdaws\nEl-Maseeh an\'ama lana bil-khalas.\n\nDawa\' yubri kulla jirahat\nWa yamhi el-khataya was-sayyi\'at\nWa narith malakut es-samawat\nEl-Maseeh an\'ama lana bil-khalas.\n\nEl-Maseeh an\'ama lana bil-khalas.aha li-nufus el-mu\'mineen\nAllazeena hum \'alal-iman thabiteen\nYarhamuhum er-Rabb fi yawm ed-deen\nEl-Maseeh an\'ama lana bil-khalas.\n\nZaman ed-dalala zala \'anna\nWa ada\'a \'alayna nur mukhallisna\nWa ibtahajat nufusuna wa farihna\nEl-Maseeh an\'ama lana bil-khalas.\n\nSiraj el-haqq ada\'a feena\nWa nuruhu ashraqa \'alayna\nYasu\' el-hayy fadeena\nEl-Maseeh an\'ama lana bil-khalas.\n\nSharafun za\'id wa majdun jaleel\nMawhiba tamma laysat tamtheel\nJasad wa dam \'Imanu\'eel\nEl-Maseeh an\'ama lana bil-khalas.\n\nSufuf el-mala\'ika el-\'ulwiyeen\nWuqufun quddamahu murta\'ideen\nLi-jalal \'azamatihi khadi\'een\nEl-Maseeh an\'ama lana bil-khalas.\n\nDiya\' nurihi fi kulli makan\nLahu el-\'azama was-sultan\nWas-sujud el-an wa kulla awan\nEl-Maseeh an\'ama lana bil-khalas.\n\nZahara bil-khalas lish-shu\'ub\nWa kharaqa kitab el-\'ahd el-maktub\nTuba liman yu\'minu bihi wa yatub\nEl-Maseeh an\'ama lana bil-khalas.\n\nA\'tana wasayahu el-ilahiya\nEl-i\'tiraf wa tark el-khatiya\nWat-tanawul min asrarihi el-muhyiya\nEl-Maseeh an\'ama lana bil-khalas.\n\nGhasala khatayana bi-damihi el-kareem\nWa khallasana min nar el-jaheem\nWa fataha lana bab en-na\'eem\nEl-Maseeh an\'ama lana bil-khalas.\n\nFal-nusabbih Rabb el-anam\nWa naqul ma\'a el-mala\'ika el-kiram\nEl-majdu lillahi fil-\'ula\nWa \'alal-ard es-salam.\n\nWa naseeh bi-a\'la sawt\nNahwa el-hayy allazi la yamut\nLi-yun\'ima \'alayna bil-malakut\nEl-Maseeh an\'ama lana bil-khalas.\n\nQuddus Quddus Rabb el-quwwat\nQuddus el-mumajjad fis-samawat\nAllazi an\'ama \'alayna bil-khayrat\nEl-Maseeh an\'ama lana bil-khalas.\n\nKarama wa majdan wa ikram\nBi-ism Allah el-hayy el-a\'zam\nAllazi a\'tana mawahib \'izam\nEl-Maseeh an\'ama lana bil-khalas.\n\nLaysa lana mu\'een siwak\nWa a\'yun el-kull tatarajjak\nJud \'alayna bi-ridak\nEl-Maseeh an\'ama lana bil-khalas.\n\nMinka natlub ghufran ez-zunub\nAnta el-ghaya wal-matlub\nTafrah bi-khati\' wahid yatub\nEl-Maseeh an\'ama lana bil-khalas.\n\nNas\'aluka ya Rabb es-Sabaot\nEl-hayy el-azali allazi la yamut\nAn tun\'ima \'alayna bil-malakut\nEl-Maseeh an\'ama lana bil-khalas.\n\nA\'tina ya Rabb tawba naqiya\nWa a\'malan barra mardiya\nLikay narith hayah abadiya\nEl-Maseeh an\'ama lana bil-khalas.',
        },
        {
          language: 'arabic',
          text: 'إسمعوا يا شعب المسيح،\nوتفهموا بعقل رجيح،\nوصيحوا بلسان فصيح،\nالمسيح أنعم لنا بالخلاص.\n\nاُشكروا فضله وإحسانه،\nلأنه أعطانا جزيل أنعامه،\nوأنعم علينا بأسراره،\nالمسيح أنعم لنا بالخلاص.\n\nبإرادته الآلهية،\nوحكمته العلوية،\nأوهب لنا أسراراً خفية،\nالمسيح أنعم لنا بالخلاص.\n\nتشتهي الملائكة النورانية،\nأن تنظر هذه العطية،\nالتي أنعم بها للبشرية،\nالمسيح أنعم لنا بالخلاص.\n\nجاد علينا بالغفران،\nوكسر عنا فخ الشيطان،\nوأعطانا جسده قربان،\nالمسيح أنعم لنا بالخلاص.\n\nحكمة عميقة وسر خفي،\nلا يدركهما عقل بشري،\nإلا الإله الحي الأزلي،\nالمسيح أنعم لنا بالخلاص.\n\nخبزاً موضوعاً في الصينية،\nلمحو الذنوب والخطية،\nمن أكله ينال حياة أبدية،\nالمسيح أنعم لنا بالخلاص.\n\nخمراً طاهراً ممزوج بالكأس،\nلأجل التوبة والخلاص،\nمن يشربه ينجي من القصاص،\nالمسيح أنعم لنا بالخلاص.\n\nخلاصاً لأرواح ونفوس،\nومن يؤمن بإسم القدوس،\nينال ميراث الفردوس،\nالمسيح أنعم لنا بالخلاص.\n\nدواء يبري كل جراحات،\nويمحي الخطايا والسيئات،\nونرث ملكوت السموات،\nالمسيح أنعم لنا بالخلاص.\n\nراحة لنفوس المؤمنين،\nالذين هم على الأيمان ثابتين،\nيرحمهم الرب في يوم الدين،\nالمسيح أنعم لنا بالخلاص.\n\nزمان الضلالة زال عنا،\nوأضاء علينا نور مخلصنا،\nوإبتهجت نفوسنا وفرحنا،\nالمسيح أنعم لنا بالخلاص.\n\nسراج الحق أضاء فينا،\nونوره أشرق علينا،\nيسوع الحي فادينا،\nالمسيح أنعم لنا بالخلاص.\n\nشرف زائد ومجد جليل،\nموهبة تامة ليست تمثيل،\nجسد ودم عمانوئيل،\nالمسيح أنعم لنا بالخلاص.\n\nصفوف الملائكة العلويين،\nوقوف قدامه مرتعدين،\nلجلال عظمته خاضعين،\nالمسيح أنعم لنا بالخلاص.\n\nضياء نوره في كل مكان،\nله العظمة والسلطان،\nوالسجود الآن وكل آوان،\nالمسيح أنعم لنا بالخلاص.\n\nظهر بالخلاص للشعوب،\nوخرق كتاب العهد المكتوب،\nطوبى لمن يؤمن به ويتوب،\nالمسيح أنعم لنا بالخلاص.\n\nأعطانا وصاياه الألهية،\nالاعتراف وترك الخطية،\nوالتناول من أسراره المحيية،\nالمسيح أنعم لنا بالخلاص.\n\nغسل خطايانا بدمه الكريم،\nوخلصنا من نار الجحيم،\nوفتح لنا باب النعيم،\nالمسيح أنعم لنا بالخلاص.\n\nفلنسبح رب الآنام،\nونقول مع الملائكة الكرام،\nالمجد لله في العلا،\nوعلى الأرض السلام.\n\nونصيح بأعلى صوت،\nنحو الحي الذي لا يموت،\nلينعم علينا بالملكوت،\nالمسيح أنعم لنا بالخلاص.\n\nقدوس قدوس رب القوات،\nقدوس الممجد في السموات،\nالذي أنعم علينا بالخيرات،\nالمسيح أنعم لنا بالخلاص.\n\nكرامة ومجداً وأكرام،\nبإسم الله الحي الأعظم،\nالذي اعطانا مواهب عظام،\nالمسيح أنعم لنا بالخلاص.\n\nليس لنا معين سواك،\nوأعين الكل تترجاك،\nجُد علينا برضاك،\nالمسيح أنعم لنا بالخلاص.\n\nمنك نطلب غفران الذنوب،\nأنت الغاية والمطلوب،\nتفرح بخاطئ واحد يتوب،\nالمسيح أنعم لنا بالخلاص.\n\nنسألك يا رب الصابؤوت،\nالحي الأزلي الذي لا يموت،\nأن تنعم علينا بالملكوت،\nالمسيح أنعم لنا بالخلاص.\n\nأعطينا يا رب توبة نقية،\nوأعمالاً بارة مرضية،\nلكي نرث حياة أبدية،\nالمسيح أنعم لنا بالخلاص.',
        },
      ],
    }
  );
}

// ---- Kiahk > Distribution: rename the first hymn (title only) ----
const kiahkDistributionHymn1 = seasons
  .find((s) => s.id === 'kiahk')
  ?.services.find((s) => s.id === 'kiahk-distribution')
  ?.hymns.find((h) => h.id === 'kiahk-distribution-hymn-1');

if (kiahkDistributionHymn1) {
  kiahkDistributionHymn1.title = 'Psalm 150';
  kiahkDistributionHymn1.versions = [
    {
      language: 'coptic',
      text: 'Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲫϯ ϧⲉⲛ ⲛⲏⲉ̅ⲑ̅ⲩ̅ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲁϥ.\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲡⲓⲧⲁϫⲣⲟ ⲛ̀ⲧⲉ ⲧⲉϥϫⲟⲙ.\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ⲉ̀ϩ̀ⲣⲏⲓ ϩⲓϫⲉⲛ ⲧⲉϥⲙⲉⲧϫⲱⲣⲓ.\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ⲕⲁⲧⲁ ⲡ̀ⲁ̀ϣⲁⲓ ⲛ̀ⲧⲉ ⲧⲉϥⲙⲉⲧⲛⲓϣϯ.\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲟⲩⲥ̀ⲙⲏ ⲛ̀ⲥⲁⲗⲡⲓⲅⲅⲟⲥ.\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲟⲩⲯⲁⲗⲧⲏⲣⲓⲟⲛ ⲛⲉⲙ ⲟⲩⲕⲩⲑⲁⲣⲁ.\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲉⲙⲕⲉⲙ ⲛⲉⲙ ϩⲁⲛⲭⲟⲣⲟⲥ.\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲁⲡ ⲛⲉⲙ ⲟⲩⲟⲣⲅⲁⲛⲟⲛ.\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲩⲙⲃⲁⲗⲟⲛ ⲉ̀ⲛⲉⲥⲉ ⲧⲟⲩⲥ̀ⲙⲏ.\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲩⲙⲃⲁⲗⲟⲛ ⲛ̀ⲧⲉ ⲟⲩⲉ̀ϣ̀ⲗⲏⲗⲟⲩⲓ̀.\nⲚⲓϥⲓ ⲛⲓⲃⲉⲛ ⲙⲁⲣⲟⲩⲥ̀ⲙⲟⲩ ⲧⲏⲣⲟⲩ ⲉ̀ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡⲟ̅ⲥ̅ ⲡⲉⲛⲛⲟⲩϯ.\n+ Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩ̀ⲓⲱ̀ ⲕⲉ ⲁ̀ⲅⲓⲱ̀ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ.\nⲔⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ.\n+ Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅: ⲇⲟⲝⲁ ⲥⲓ ⲟ Ⲑⲉⲟⲥ ⲏ̀ⲙⲱⲛ.\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅: ⲡⲓⲱ̀ⲟⲩ ⲫⲁ ⲡⲉⲛⲚⲟⲩϯ ⲡⲉ.\n+ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ϣⲏⲣⲓ ⲙ̀Ⲫϯ ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲛ ⲟⲩⲟϩ ⲛⲁⲓ ⲛⲁⲛ.',
    },
    {
      language: 'englishCoptic',
      text: 'Allēlouia.\nEsmou e-Efnouti khen nēethouab tērou entaf.\n+ Esmou erof khen pitajro ente tefjom.\nEsmou erof e-ehrēi hijen tefmetjōri.\n+ Esmou erof kata epashai ente tefmetnishti.\nEsmou erof khen ou-esmē ensalpiggos.\n+ Esmou erof khen oupsaltērion nem oukuthara.\nEsmou erof khen hankemkem nem hankhoros.\n+ Esmou erof khen hankap nem ouorganon.\nEsmou erof khen hankumvalon enese tou-esmē.\n+ Esmou erof khen hankumvalon ente ou-e-eshlēlou-i.\nNifi niven marou-esmou tērou e-efran em-Eptshois pennouti.\n+ Doksa Patri ke Ui-ō ke agi-ō Epneumati.\nKe nun ke a-i ke is tous e-ōnas tōn e-ōnōn amēn.\n+ Allēlouia allēlouia: doksa si o Theos ēmōn.\nAllēlouia allēlouia: pi-ōou fa pen-Nouti pe.\n+ Iēsous Pikhristos ep-Shēri em-Efnouti sōtem eron ouoh nai nan.',
    },
    {
      language: 'english',
      text: 'Alleluia.\nPraise God in all His saints.\n+ Praise Him in the firmament of His power.\nPraise Him for His mighty acts.\n+ Praise Him according to the multitudes of His greatness.\nPraise Him with the sound of the trumpet.\n+ Praise Him with psaltery and harp.\nPraise Him with timbrel and chorus.\n+ Praise Him with strings and organs.\nPraise Him with pleasant sounding cymbals.\n+ Praise Him upon the cymbals of joy.\nLet every thing that has breath praise the name of the Lord our God.\n+ Glory be to the Father, and the Son and the Holy Spirit.\nNow and forever and unto the age of all ages Amen.\n+ Alleluia, Alleluia, glory be to our God.\nAlleluia, Alleluia, glory be to our God.\n+ O Jesus Christ, the Son of God, hear us and have mercy upon us.',
    },
    {
      language: 'englishArabic',
      text: 'Sabeho Allah fi gamea kideseen.\nSabaho fi galad qowetehee.\nSabaho ala maqderateehy.\nSabaho kakatharat azamateehee.\nSabaho bi sowt el booq.\nSabaho bi mizmar wal kithar.\nSabaho bi difoofel wa sofouf.\nSabaho bi owtaren wa orhoon.\nSabaho bi snuuge hasinat esoot.\nSabaho bi snuuge etahleel.\nKulu nasma faltusabi esmelrab elahona.\nAlelluia, Doxa patri kay ayo kay agio epnevmati.\nKe nin ke a ee ke estosey onan stoney onon amin alleluia.\nDoxasi otheos imon alleluia.\nPi oou fai pennouti pe alleluia.\nEsoos piekhristos epshiri em ef nooti soten eron owoh nai nan.',
    },
    {
      language: 'arabic',
      text: 'هلليلويا.\nسبحوا الله في جميع قديسيه.\n+ سبحوه في جلد قوته.\nسبحوه على مقدرته.\n+ سبحوه ككثرة عظمته.\nسبحوه بصوت البوق.\n+ سبحوه بالمزمار والقيثار.\nسبحوه بدفوف وصفوف.\n+ سبحوه بأوتار وأرغن.\nسبحوه بصنوج حسنة الصوت.\n+ سبحوه بصنوج التهليل.\nكل نسمة فلتسبح اسم الرب الهنا.\n+ المجد للآب والأبن والروح القدس.\nالآن وكل أوان وإلى دهر الداهرين آمين.\n+ المجد لإلهنا هلليلويا.\nالمجد لإلهنا هلليلويا.\n+ يا يسوع المسيح ابن الله، إسمعنا وإرحمنا.',
    },
  ];
}

// ---- Annual > Matins: add "Doxologies" divider + Introduction to the Doxologies ----
const annualMatins = seasons
  .find((s) => s.id === 'annual')
  ?.services.find((s) => s.id === 'annual-matins');

if (annualMatins) {
  annualMatins.hymns = annualMatins.hymns.filter(
    (h) => h.id.endsWith('-verse-of-cymbals')
  );

  annualMatins.hymns.push(
    {
      id: 'annual-matins-doxologies-header',
      title: 'Doxologies',
      versions: [],
      isSectionHeader: true,
    },
    {
      id: 'annual-matins-intro-doxologies',
      title: 'Ϧⲉⲛ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ (Introduction to the Doxologies)',
      versions: [
        {
          language: 'coptic',
          text: 'Ϧⲉⲛ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲉⲛϭⲟⲓⲥ: ⲁ̀ⲙⲏⲛ ⲁ̀ⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲬⲉⲣⲉ ⲛⲉ ⲧⲉⲛ̀ⲑⲟ ⲉ̀ⲣⲟ: ⲱ̀ ⲑⲉⲟⲧⲟⲕⲟⲥ ⲉⲥⲙⲉϩ ⲛ̀ⲱⲟⲩ: ⲉ̀ⲧⲟⲓ ⲛ̀ⲡⲁⲣⲑⲉⲛⲟⲥ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ: ϯⲙⲁⲥⲛⲟⲩϯ ⲑⲙⲁⲩ ⲛ̀Ⲡⲭ̅ⲥ̅.\n\nⲀ̀ⲛⲓⲟϯ ⲛ̀ⲧⲉⲛ̀ⲡⲣⲟⲥⲉⲩⲭⲏ: ⲉ̀ⲡ̀ϣⲱⲓ ϩⲁ ⲡⲉϥϣⲏⲣⲓ ⲙ̀ⲙⲉⲣⲓⲧ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲬⲉⲣⲉ ⲑⲏⲉⲧⲁⲥⲙⲓⲥⲓ ⲛⲁⲛ: ⲙ̀ⲡⲓⲟⲩⲱⲓⲛⲓ ⲛ̀ⲧⲁⲫ̀ⲙⲏⲓ: Ⲡⲭ̅ⲥ̅ Ⲡⲉⲛⲛⲟⲩϯ: ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲉⲑⲟⲩⲁⲃ.\n\nⲘⲁⲧϩⲟ ⲙ̀Ⲡⲟ̅ⲥ̅ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛ̀ⲧⲉϥⲉⲣⲟⲩⲛⲁⲓ ⲛⲉⲙ ⲛⲉⲛⲯⲩⲭⲏ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nϮⲡⲁⲣⲑⲉⲛⲟⲥ Ⲙⲁⲣⲓⲁ: ϯⲑⲉⲟⲧⲟⲕⲟⲥ ⲉⲑⲟⲩⲁⲃ: ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛ̀ⲧⲉ ⲡⲅⲉⲛⲟⲥ ⲛ̀ⲧⲉ ϯⲙⲉⲧⲣⲱⲙⲓ.\n\nⲀ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϩⲣⲉⲛ Ⲡⲭ̅ⲥ̅: ⲫⲏⲉⲧⲁⲣⲉⲭ̀ⲫⲟϥ: ϩⲟⲡⲱⲥ ⲛ̀ⲧⲉϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nⲬⲉⲣⲉ ⲛⲉ ⲱ̀ ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ϯⲟⲣⲱ ⲙ̀ⲙⲏⲓ ⲛ̀ⲁⲗⲏⲑⲓⲛⲏ: ⲭⲉⲣⲉ ⲡϣⲟⲩϣⲟⲩ ⲛ̀ⲧⲉ ⲡⲉⲛⲅⲉⲛⲟⲥ: ⲁ̀ⲣⲉⲭ̀ⲫⲟ ⲛⲁⲛ ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ.\n\nⲦⲉⲛⲧϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
        },
        {
          language: 'english',
          text: 'In Christ Jesus our Lord. Amen Alleluia.\n\nHail to you. We ask you, O saint, full of glory, the ever-Virgin, the Theotokos, the Mother of Christ.\n\nLift our prayers unto your beloved Son, that He may forgive us our sins.\n\nHail to the holy Virgin, who has brought forth unto us the true Light, Christ our God.\n\nAsk the Lord on our behalf, to have mercy on our souls, and forgive us our sins.\n\nO Virgin Mary, the holy Theotokos, the faithful advocate for all mankind.\n\nIntercede on our behalf before Christ whom you bore, that He may grant us the forgiveness of our sins.\n\nHail to you O Virgin, the right and true Queen. Hail to the pride of our race, who bore to us Emmanuel.\n\nWe ask you to remember us, O our faithful advocate, before our Lord Jesus Christ, that He may forgive us our sins.',
        },
                {
          language: 'englishCoptic',
          text: 'Khen Pi-ekhristos Iēsous Pentshois: amēn allēlouia.\n\nKhere ne te-entho ero: ō theotokos esmeh enōou: etoi enparthenos ensēou niven: timasnouti thmau en-Pikhristos.\n\nAnioti ente-enproseukhē: e-epshōi ha pefshēri emmerit: entefkha nennovi nan evol.\n\nKhere thēetasmisi nan: empiouōini enta-efmēi: Pikhristos Pennouti: tiparthenos ethouab.\n\nMatho em-Eptshois ekhrēi ejōn: enteferounai nem nenpsukhē: entefkha nennovi nan evol.\n\nTiparthenos Maria: titheotokos ethouab: ti-eprostatēs etenhot: ente pgenos ente timetrōmi.\n\nAri-epresveuin ekhrēi ejōn: nahren Pikhristos: fēetare-ekhfof: hopōs enteferehmot nan empikhō evol ente nennovi.\n\nKhere ne ō tiparthenos: tiorō emmēi enalēthinē: khere pshoushou ente pengenos: are-ekhfo nan en-Emmanouēl.\n\nTentho aripenmeu-i: ō ti-eprostatēs etenhot: nahren Pentshois Iēsous Pikhristos: entefkha nennovi nan evol.',
        },
        {
          language: 'englishArabic',
          text: 'Bil-Maseeh Yasou\' Rabbina. Ameen Halleluia.\n\nEs-salamo lak, nas\'aluki ayyatuha el-qiddisa el-mumtali\'a majdan, el-\'azra kulla heen, walidat el-ilah omm el-Maseeh.\n\nAs\'idi salawatina ila ibniki el-habeeb, li-yaghfira lana khataya-na.\n\nEs-salamo lillati waladat lana en-noor el-haqeeqi, el-Maseeh elahna, el-\'azra el-qiddisa.\n\nIs\'ali er-Rabba \'anna, li-yasna\'a rahma ma\'a nofoosina, wa yaghfira lana khataya-na.\n\nAyyatuha el-\'azra Maryam, walidat el-ilah el-qiddisa, esh-shafee\'a el-ameena li-jins el-bashar.\n\nIshfa\'i feena amam el-Maseeh el-lazi waladtihi, li-kay yan\'ama lana bi-maghfirat khataya-na.\n\nEs-salamo laki ayyatuha el-\'azra, el-malika el-haqeeqiyya el-haqqaniyya. Es-salamo li-fakhr jinsina, waladti lana \'Emmanoeil.\n\nNas\'aluki an tazkoreena ayyatuha esh-shafee\'a el-mu\'tamana, amam Rabbina Yasou\' el-Maseeh, li-yaghfira lana khataya-na.',
        },
        {
          language: 'arabic',
          text: 'بالمسيح يسوع ربنا. آمين هلليلويا.\n\nالسلام لك، نسألك أيتها القديسة الممتلئة مجدا، العذراء كل حين، والدة الاله أم المسيح.\n\nاصعدي صلاتنا الى ابنك الحبيب، ليغفر لنا خطايانا.\n\nالسلام للتى ولدت لنا النور الحقيقى، المسيح الهنا، العذراء القديسة.\n\nاسألى الرب عنا، ليصنع رحمة مع نفوسنا، ويغفر لنا خطايانا.\n\nأيتها العذراء مريم، والدة الاله القديسة، الشفيعة الأمينة لجنس البشر.\n\nاشفعى فينا أمام المسيح الذى ولدته، لكى ينعم لنا بمغفرة خطايانا.\n\nالسلام لك أيتها العذراء، الملكة الحقيقية الحقانية. السلام لفخر جنسنا، ولدت لنا عمانوئيل.\n\nنسألك أن تذكرينا أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا.',
        },
      ],
    },
    {
      id: 'annual-matins-doxology-virgin-mary',
      title: 'Ⲱⲟⲩⲛⲓⲁⲧⲥ (The Doxology for Saint Virgin Mary)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲱⲟⲩⲛⲓⲁⲧⲥ Ⲛ̀ⲑⲟ Ⲙⲁⲣⲓⲁ̀: Ϯⲥⲁⲃⲉ ⲟⲩⲟϩ Ⲛ̀ⲥⲉⲙⲛⲉ: Ϯⲙⲁϩⲥ̀ⲛⲟⲩϯ Ⲛ̀ⲥⲕⲏⲛⲏ: Ⲡⲓⲁϩⲟ Ⲙ̀ⲡ̀ⲛⲉⲩⲙⲁⲧⲓⲕⲟⲛ.\n\nϮⲃ̀ⲣⲱⲙⲡϣⲁⲗ Ⲛ̀ⲕⲁⲑⲁⲣⲟⲥ: ⲑⲏ ⲉ̀ⲧⲁⲥⲙⲟⲩϯ ϧⲉⲛ ⲡⲉⲛⲕⲁϩⲓ: ⲟⲩⲟϩ ⲁⲥϯⲣⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ: Ⲛ̀ⲟⲩⲕⲁⲣⲡⲟⲥ Ⲛ̀ⲧⲉ ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ.\n\nⲠⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲙ̀ⲡⲁⲣⲁⲕⲗⲏⲧⲟⲛ: ⲫⲏ ⲉ̀ⲧⲁϥⲓ̀ ⲉ̀ϫⲉⲛ ⲡⲉϥϣⲏⲣⲓ: ϩⲓϫⲉⲛ ⲛⲓⲙⲱⲟⲩ Ⲛ̀ⲧⲉ ⲡⲓⲓⲟⲣⲇⲁⲛⲏⲥ: ⲕⲁⲧⲁ ⲡ̀ⲧⲩⲡⲟⲥ Ⲛ̀Ⲛⲱⲉ.\n\nϮⲃ̀ⲣⲱⲙⲡⲓ ⲅⲁⲣ ⲉ̀ⲧⲉ ⲑ̀ⲙⲁⲩ: Ⲛ̀ⲑⲟⲥ ⲁⲥϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛⲁⲛ: Ⲛ̀ϯϩⲓⲣⲏⲛⲏ Ⲛ̀ⲧⲉ Ⲫ̀ϯ: ⲑⲏ ⲉ̀ⲧⲁⲥϣⲱⲡⲓ ϣⲁ ⲛⲓⲣⲱⲙⲓ.\n\nⲚ̀ⲑⲟ ϩⲱⲓ ⲱ̀ ⲧⲉⲛϩⲉⲗⲡⲓⲥ: Ϯⲃ̀ⲣⲱⲙⲡϣⲁⲗ Ⲛ̀ⲛⲟⲏⲧⲏ: ⲁⲣⲉ̀ⲓⲛⲓ Ⲙ̀ⲡⲓⲛⲁⲓ ⲛⲁⲛ: ⲁⲣⲉⲱ̀ⲗⲓ ϧⲁⲣⲟϥ ϧⲉⲛ ⲧⲉⲛⲉϫⲓ.\n\nⲈ̀ⲧⲉ ⲫⲁⲓ ⲡⲉ Ⲓⲏⲥⲟⲩⲥ: ⲡⲓⲙⲓⲥⲓ ⲉ̀ⲃⲟⲗϧⲉⲛ Ⲫ̀ⲓⲱⲧ: ⲁⲩⲙⲁⲥϥ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ Ⲛ̀ϧⲏⲧ: ⲁϥⲉⲣ ⲡⲉⲛⲅⲉⲛⲟⲥ Ⲛ̀ⲣⲉⲙϩⲉ.\n\nⲪⲁⲓ ⲅⲁⲣ ⲙⲁⲣⲉⲛⲧⲁⲟⲩⲟϥ: ⲉ̀ⲃⲟⲗϧⲉⲛ ⲡⲉⲛϩⲏⲧ Ⲛ̀ϣⲟⲣⲡ: ⲙⲉⲛⲉⲛⲥⲱⲥ ⲟⲛ ϧⲉⲛ ⲡⲉⲛⲗⲁⲥ: ⲉⲛⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲛϫⲱ Ⲙ̀ⲙⲟⲥ.\n\nϪⲉ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲙⲁⲑⲁⲙⲓⲟ ⲛⲁⲕ Ⲛ̀ϧⲣⲏⲓ Ⲛ̀ϧⲏⲧⲉⲛ: Ⲛ̀ⲟⲩⲉⲣⲫⲉⲓ Ⲛ̀ⲧⲉ ⲡⲉⲕⲡ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅: ⲉⲣⲧ̀ⲇⲟⲝⲟⲗⲟⲅⲓⲁ ⲛⲁⲕ.\n\nⲬⲉⲣⲉ ⲛⲉ ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: Ϯⲟⲩⲣⲱ Ⲙ̀ⲙⲏⲓ Ⲛ̀ⲁⲗⲏⲑⲓⲛⲏ: ⲭⲉⲣⲉ Ⲡ̀ϣⲟⲩϣⲟⲩ Ⲛ̀ⲧⲉ ⲡⲉⲛⲅⲉⲛⲟⲥ: ⲁⲣⲉⲭ̀ⲫⲟ ⲛⲁⲛ Ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ.\n\nⲦⲉⲛⲧϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
        },
        {
          language: 'englishCoptic',
          text: 'Ōouniats Entho Mari-a: Tisave ouoh Ensemne: Timahesnouti Enskēnē: Piaho Emepneumatikon.\n\nTi-ebrōmpshal Enkatharos: thē etasmouti khen penkahi: ouoh astiri nan evol: Enoukarpos Ente pi-epneuma.\n\nPi-epneuma Emparaklēton: fē etafi ejen pefshēri: hijen nimōou Ente piiordanēs: kata eptupos En-Nōe.\n\nTi-ebrōmpi gar ete ethmau: Enthos ashishennoufi nan: Entihirēnē Ente Efnouti: thē etasshōpi sha nirōmi.\n\nEntho hōi ō tenhelpis: Ti-ebrōmpshal Ennoētē: areini Empinai nan: are-ōli kharof khen teneji.\n\nEte fai pe Iēsous: pimisi evolkhen Efiōt: aumasf nan evol Enkhēt: afer pengenos Enremhe.\n\nFai gar marentaouof: evolkhen penhēt Enshorp: menensōs on khen penlas: enōsh evol enjō Emmos.\n\nJe Pentshois Iēsous Pikhristos: mathamio nak Enkhrēi Enkhēten: Enouerfei Ente pekepneuma ethouab: eretdoksologia nak.\n\nKhere ne ō Tiparthenos: Tiourō Emmēi Enalēthinē: khere Epshoushou Ente pengenos: are-ekhfo nan En-Emmanouēl.\n\nTentho aripenmeu-i: ō Ti-eprostatēs etenhot: nahren Pentshois Iēsous Pikhristos: Entefkha nennovi nan evol.',
        },
        {
          language: 'english',
          text: 'Blessed are you O Mary: the wise and the chaste: the Second Tabernacle: the spiritual treasure.\n\nThe pure turtledove: who declared in our land: and brought to us: the Fruit of the Spirit.\n\nThe Spirit of Comfort: who came upon your son: in the waters of the Jordan: according to the type of Noah.\n\nThat dove has announced to us: the peace of God: for mankind.\n\nLikewise you O our hope: the spiritual turtledove: have brought mercy unto us: carrying Him in your womb.\n\nHe is Jesus: the begotten of the Father: He was born of you for us: setting free our race.\n\nTherefore let us declare: first with our hearts: then also with our tongues: proclaiming and saying,\n\n"O our Lord Jesus Christ: make for Yourself within us: a temple of Your Holy Spirit: glorifying You."\n\nHail to you O Virgin: the right and true Queen: Hail to the pride of our race: who bore to us Emmanuel.\n\nWe ask you to remember us: O our faithful advocate: before our Lord Jesus Christ: that He may forgive us our sins.',
        },
        {
          language: 'englishArabic',
          text: 'Tubaki anti ya Maryam, el-hakima el-\'afifa, el-qubba eth-thaniya, el-kanz er-rohy.\n\nEl-yamama en-naqiya, ellati nadat fi ardina, wa ayna\'at lana, thamarat er-roh.\n\nEr-roh el-mu\'azzi, ellazi halla \'ala ibniki, fi miyah el-Urdunn, ka-mithal Nuh.\n\nLi-anna tilka el-hamama, hiya bishratuna, bi-salami-llah, ellazi sara lil-bashar.\n\nWa anti aydan ya raja\'ana, el-yamama el-\'aqliya, atayti lana bir-rahma, hamaltihi fi batniki.\n\nAy Yasu\', el-mawlud minal-Ab, wulida lana minki, wa harrara jinsana.\n\nFal-nanqul hadha min qalbina awwalan, wa ba\'da dhalika bilisanina aydan, sarikheena qa\'ileen,\n\nYa Rabbana Yasu\' el-Maseeh, ij\'al laka feena, haykalan li-Ruhika el-Qudus, yu\'teeka tamjeeda.\n\nEs-salamu laki ayyatuha el-\'adhra\', el-malika el-haqiqiya el-haqqaniya, es-salamu li-fakhri jinsina, waladti lana Emmanuel.\n\nNas\'aluki an tadhkureena, ayyatuha esh-shafi\'a el-mu\'tamana, amama Rabbina Yasu\' el-Maseeh, li-yaghfira lana khatayana.',
        },
        {
          language: 'arabic',
          text: 'طوباك أنت يا مريم، الحكيمة العفيفة، القبة الثانية، الكنز الروحى.\n\nاليمامة النقية، التى نادت فى أرضنا، وأينعت لنا، ثمرة الروح.\n\nالروح المعزى، الذى حل على ابنك، فى مياه الأردن، كمثال نوح.\n\nلأن تلك الحمامة، هى بشرتنا، بسلام الله، الذى صار للبشر.\n\nوأنت أيضا يا رجاءنا، اليمامة العقلية، أتيت لنا بالرحمة، حملته فى بطنك.\n\nأى يسوع، المولود من الآب، ولد لنا منك، وحرر جنسنا.\n\nفلنقل هذا من قلبنا أولاً، وبعد ذلك بلساننا أيضا، صارخين قائلين،\n\nيا ربنا يسوع المسيح، اجعل لك فينا، هيكلاً لروحك القدوس، يعطيك تمجيدا.\n\nالسلام لك أيتها العذراء، الملكة الحقيقية الحقانية، السلام لفخر جنسنا، ولدت لنا عمانوئيل.\n\nنسألك أن تذكرينا، أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا.',
        },
      ],
    },
    {
      id: 'annual-matins-doxology-archangel-michael',
      title: 'Ⲙⲓⲭⲁⲏⲗ ⲡⲓⲁ̀ⲣⲭⲱⲛ (Doxology for Archangel Michael)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲙⲓⲭⲁⲏⲗ ⲡⲓⲁ̀ⲣⲭⲱⲛ Ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟⲩⲓ: Ⲛ̀ⲑⲟϥ ⲉⲧⲟⲓ Ⲛ̀ϣⲟⲣⲡ: ϧⲉⲛ ⲛⲓⲧⲁⲝⲓⲥ Ⲛ̀ⲁⲛ̀ⲅⲉⲗⲓⲕⲟⲛ: ⲉϥϣⲉⲙϣⲓ Ⲙ̀ⲡⲉⲙ̀ⲑⲟ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ\\n\\nϢⲁⲣⲉ Ⲫ̀ϯ ⲟⲩⲱⲣⲡ ⲛⲁⲛ: Ⲛ̀ⲛⲉϥⲛⲁⲓ ⲛⲉⲙ ⲛⲉϥⲙⲉⲧϣⲉⲛϩⲏⲧ: ϩⲓⲧⲉⲛ ⲛⲓⲧϩⲟ Ⲛ̀ⲧⲉ Ⲙⲓⲭⲁⲏⲗ: ⲡⲓⲛⲓϣϯ Ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ\\n\\nϢⲁⲣⲧⲱⲕ ⲉ̀ⲃⲟⲗ Ⲛ̀ϫⲉ ⲛⲓⲕⲁⲣⲡⲟⲥ: ϩⲓⲧⲉⲛ ⲛⲉⲛⲧⲱⲃϩ Ⲙ̀Ⲙⲓⲭⲁⲏⲗ: ϫⲉ Ⲛ̀ⲑⲟϥ ⲉⲧϧⲉⲛⲧ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲫ̀ϯ: ⲉϥϯϩⲟ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ\\n\\nⲦⲁⲓⲟ ⲛⲓⲃⲉⲛ ⲉⲑⲛⲁⲛⲉⲩ: ⲛⲉⲙ ⲇⲱⲣⲟⲛ ⲛⲓⲃⲉⲛ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲉⲩⲛⲏⲟⲩ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ Ⲙ̀ⲡ̀ϣⲱⲓ: ϩⲓⲧⲉⲛ Ⲫ̀ⲓⲱⲧ Ⲛ̀ⲧⲉ ⲛⲓⲟⲩⲱⲓⲛⲓ\\n\\nⲘⲁⲣⲉⲛϩⲱⲥ Ⲛ̀ⲧⲉⲛⲧⲱⲟⲩ: Ⲛ̀ⲧⲉⲛⲟⲩⲱϣⲧ Ⲛ̀ϯⲧ̀ⲣⲓⲁⲥ ⲉⲑⲟⲩⲁⲃ: ⲉⲧⲟⲓ Ⲛ̀ⲟⲙⲟⲟⲩⲥⲓⲟⲥ: ⲉⲑⲙⲏⲛ ⲉ̀ⲃⲟⲗ ϣⲁ ⲉ̀ⲛⲉϩ\\n\\nⲀ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ: Ⲙⲓⲭⲁⲏⲗ ⲡⲓⲁ̀ⲣⲭⲱⲛ Ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟⲩⲓ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ',
        },
        {
          language: 'englishCoptic',
          text: 'Mikhaēl pi-arkhōn Enna nifēoui: Enthof etoi Enshorp: khen nitaksis Ena-engelikon: efshemshi Empe-emtho Em-Eptshois\\n\\nShare Efnouti ouōrp nan: Ennefnai nem nefmetshenhēt: hiten nitho Ente Mikhaēl: pinishti Enarkhēaggelos\\n\\nShartōk evol Enje nikarpos: hiten nentōbh Em-Mikhaēl: je Enthof etkhent ekhoun e-Efnouti: eftiho ekhrēi ejōn\\n\\nTaio niven ethnaneu: nem dōron niven etjēk evol: eunēou nan evol Emepshōi: hiten Efiōt Ente niouōini\\n\\nMarenhōs Ententōou: Entenouōsht Enti-etrias ethouab: etoi Enomoousios: ethmēn evol sha eneh\\n\\nAri-epresveuin ekhrēi ejōn: ō pi-arkhēaggelos ethouab: Mikhaēl pi-arkhōn Enna nifēoui: Entefkha nennovi nan evol',
        },
        {
          language: 'english',
          text: 'Michael the head of the heavenly: he is the first: among the angelic ranks: serving before the Lord\\n\\nGod sends unto us: His mercy and compassion: through the supplications of Michael: the great archangel\\n\\nThe harvest is perfected: through the prayers of Michael: for he is close to God: asking Him on our behalf\\n\\nAll good honor: and every perfect gift: comes to us from on high: from the Father of lights\\n\\nLet us praise and glorify: and worship the Holy Trinity: one in essence: who abides forever\\n\\nIntercede on our behalf: O holy archangel: Michael the head of heavenly: that He may forgive us our sins',
        },
        {
          language: 'englishArabic',
          text: 'Mikhail ra\'is es-samma\'iyyin: huwa el-awwal fit-tuqus el-mala\'ikiyya: yakhdim amam er-Rabb\\n\\nEnna-llaha yursilu lana marahimahu wa-ra\'fatahu: bisu\'alat Mikhail ra\'is el-mala\'ika el-\'azim\\n\\nWa takmulu el-athmar bi-talabat Mikhail: li-annahu qareebun ilal-lah: yas\'alu \'anna\\n\\nKullu \'atiyya saliha, wa kullu mawhiba tamma: innama tahbitu lana min fawq: min \'inda abil-anwar\\n\\nFal-nusabbih wa numajjid wa nasjud: lith-thalooth el-quddoos: el-musawi ed-da\'im ilal-abad\\n\\nIshfa\' feena amam er-Rabb: ya ra\'is el-mala\'ika et-tahir: Mikhail ra\'is es-samma\'iyyin: li-yaghfir lana khatayana',
        },
        {
          language: 'arabic',
          text: 'ميخائيل رئيس السمائيين: هو الأول فى الطقوس الملائكية: يخدم أمام الرب\\n\\nان الله يرسل لنا مراحمه وأفاته: بسؤالات ميخائيل رئيس الملائكة العظيم\\n\\nوتكمل الأثمار بطلبات ميخائيل: لأنه قريب إلى الله: يسأل عنا\\n\\nكل عطية صالحة وكل موهبة تامة: انما تهبط لنا من فوق: من عند أبى الأنوار\\n\\nفلنسبح ونمجد ونسجد: للثالوث القدوس: المساوى الدائم إلى الأبد\\n\\nاشفع فينا أمام الرب: يا رئيس الملائكة الطاهر ميخائيل رئيس السمائيين: ليغفر لنا خطايانا',
        },
      ],
    },
    {
      id: 'annual-matins-doxology-heavenly-beings',
      title: 'Ϣⲁϣϥ Ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ (Doxology for All the Heavenly Beings)',
      versions: [
        {
          language: 'coptic',
          text: 'Ϣⲁϣϥ Ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ: ⲥⲉⲟ̀ϩⲓ ⲉ̀ⲣⲁⲧⲟⲩ ⲉ̀ⲧⲉⲣϩ̀ⲧⲙⲟⲥ: Ⲙ̀ⲡⲉⲙ̀ⲑⲟ Ⲙ̀ⲡⲓⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ: ⲉⲩϣⲉⲙϣⲓ Ⲙ̀ⲡⲓⲙⲩⲥⲧⲏⲣⲓⲟⲛ ⲉⲧϩⲏⲡ\\n\\nⲘⲓⲭⲁⲏⲗ ⲡⲉ ⲡⲓϩⲟⲩⲓⲧ: Ⲅⲁⲃⲣⲓⲏⲗ ⲡⲉ ⲡⲓⲙⲁϩⲃ̀ⲥⲛⲁⲩ: Ⲣⲁⲫⲁⲏⲗ ⲡⲉ ⲡⲓⲙⲁϩϣⲟⲙⲧ: ⲕⲁⲧⲁ ⲡ̀ⲧⲩⲡⲟⲥ Ⲛ̀ϯⲧ̀ⲣⲓⲁⲥ\\n\\nⲤⲟⲩⲣⲓⲏⲗ Ⲥⲉⲇⲁⲕⲓⲏⲗ: Ⲥⲁⲣⲁⲑⲓⲏⲗ ⲛⲉⲙ Ⲁ̀ⲛⲁⲛⲓⲏⲗ: ⲛⲁⲓⲛⲓϣϯ Ⲛ̀ⲣⲉϥⲉ̀ⲣⲟⲩⲱⲓⲛⲓ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲏⲉ̀ⲧⲱⲃϩ Ⲙ̀ⲙⲟϥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲉⲛ ⲡⲓⲥⲱⲛⲧ\\n\\nⲚⲓⲭⲉⲣⲟⲩⲃⲓⲙ ⲛⲉⲙ ⲛⲓⲥⲉⲣⲁⲫⲓⲙ: ⲛⲓⲑ̀ⲣⲟⲛⲟⲥ ⲛⲓⲙⲉⲧϭⲟⲓⲥ ⲛⲓϫⲟⲙ: ⲡⲓϥ̀ⲧⲟⲟⲩ Ⲛ̀ⲍⲱⲟⲛ Ⲛ̀ⲁ̀ⲥⲱⲙⲁⲧⲟⲥ: ⲉⲧϥⲁⲓ ϧⲁ ⲡⲓϩⲁⲣⲙⲁ Ⲛ̀Ⲑⲉⲟⲥ\\n\\nⲠⲓϫⲟⲩⲧ ϥ̀ⲧⲟⲟⲩ Ⲙ̀ⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ: ϧⲉⲛ ϯⲉⲕⲕⲗⲏⲥⲓⲁ Ⲛ̀ⲧⲉ ⲛⲓϣⲟⲣⲡ Ⲙ̀ⲙⲓⲥⲓ: ⲉⲩϩⲱⲥ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲟⲩⲙⲉⲧⲁⲧⲙⲟⲩⲛⲕ: ⲉⲩⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲩϫⲱ Ⲙ̀ⲙⲟⲥ\\n\\nϪⲉ ⲁ̀ⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ: ⲛⲏⲉⲧϣⲱⲛⲓ ⲙⲁⲧⲁⲗϭⲱⲟⲩ: ⲁ̀ⲅⲓⲟⲥ Ⲓⲥⲭⲏⲣⲟⲥ: ⲛⲏⲉⲧⲁⲩⲉⲛⲕⲟⲧ Ⲡ̀ϭⲟⲓⲥ ⲙⲁⲙ̀ⲧⲟⲛ ⲛⲱⲟⲩ\\n\\nⲀ̀ⲅⲓⲟⲥ Ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ: ⲥ̀ⲙⲟⲩ ⲉ̀ⲧⲉⲕⲕ̀ⲗⲏⲣⲟⲛⲟⲙⲓⲁ: ⲙⲁⲣⲉ ⲡⲉⲕⲛⲁⲓ ⲛⲉⲙ ⲧⲉⲕϩⲓⲣⲏⲛⲏ: ⲟⲓ Ⲛ̀ⲥⲟⲃⲧ Ⲙ̀ⲡⲉⲕⲗⲁⲟⲥ\\n\\nϪⲉ ⲭ̀ⲟⲩⲁⲃ ⲭ̀ⲟⲩⲁⲃ: ⲭ̀ⲟⲩⲁⲃ Ⲡ̀ϭⲟⲓⲥ ⲥⲁⲃⲁⲱⲑ: Ⲧ̀ⲫⲉ ⲛⲉⲙ ⲡ̀ⲕⲁϩⲓ ⲙⲉϩ ⲉ̀ⲃⲟⲗ: ϧⲉⲛ ⲡⲉⲕⲱ̀ⲟⲩ ⲛⲉⲙ ⲡⲉⲕⲧⲁⲓⲟ\\n\\nⲀ̀ⲣⲉϣⲁⲛϫⲟⲥ Ⲙ̀ⲡⲓⲁ̀ⲗⲗⲏⲗⲟⲩⲓⲁ: ϣⲁⲣⲉ ⲛⲁⲛ ⲛⲓⲫⲏⲟⲩⲓ̀ ⲟⲩⲱϣ Ⲙ̀ⲙⲱⲟⲩ: ϫⲉ ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲙⲏⲛ Ⲁ̀ⲗⲗⲏⲗⲟⲩⲓⲁ: ⲡⲓⲱ̀ⲟⲩ ⲫⲁ ⲡⲉⲛⲛⲟⲩϯ ⲡⲉ\\n\\nⲀ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲥ̀ⲧⲣⲁⲧⲓⲁ Ⲛ̀ⲁⲅⲅⲉⲗⲓⲕⲟⲛ: ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ Ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ',
        },
        {
          language: 'englishCoptic',
          text: 'Shashf Enarkhēaggelos: se-ohi eratou eterehtmos: Empe-emtho Empipantokratōr: eushemshi Empimustērion ethēp\\n\\nMikhaēl pe pihouit: Gabriēl pe pimahebsnau: Rafaēl pe pimahshomt: kata eptupos Enti-etrias\\n\\nSouriēl Sedakiēl: Sarathiēl nem Ananiēl: nainishti Enreferouōini ethouab: enē-etōbh Emmof ekhrēi ejen pisōnt\\n\\nNikherouvim nem niserafim: ni-ethronos nimettshois nijom: pi-eftoou Enzōon Enasōmatos: etfai kha piharma En-Theos\\n\\nPijout eftoou Emepresvuteros: khen tiekklēsia Ente nishorp Emmisi: euhōs erof khen oumetatmounk: euōsh evol eujō Emmos\\n\\nJe agios o Theos: nēetshōni mataltshōou: agios Iskhēros: nēetauenkot Eptshois ma-emton nōou\\n\\nAgios Athanatos: esmou etekeklēronomia: mare peknai nem tekhirēnē: oi Ensobt Empeklaos\\n\\nJe ekhouab ekhouab: ekhouab Eptshois savaōth: Etfe nem epkahi meh evol: khen pekōou nem pektaio\\n\\nAreshanjos Empi-allēlouia: share nan nifēou-i ouōsh Emmōou: je agios amēn Allēlouia: pi-ōou fa pennouti pe\\n\\nAri-epresveuin ekhrēi ejōn: ni-estratia Enaggelikon: nem nitagma Enepouranion: Entefkha nennovi nan evol',
        },
        {
          language: 'english',
          text: 'Seven archangels: praising as they stand: before the Pantocrator: serving the hidden Mystery\\n\\nMichael is the first: Gabriel is the second: Raphael is the third: a symbol of the Trinity\\n\\nSuriel Sedakiel: Sarathiel and Ananiel: the great and holy luminaries: entreating Him for the creation\\n\\nThe cherubim and the seraphim: the thrones, dominions and powers: the four incorporeal creatures: carrying the throne of God\\n\\nThe twenty-four presbyters: in the Church of the firstborn: praising Him without ceasing: proclaiming and saying\\n\\n"Holy God, heal the sick: Holy Mighty, O Lord repose those who are asleep;\\n\\nHoly Immortal, bless Your inheritance: may Your mercy and peace: be a fortress to Your people\\n\\nHoly, Holy, Holy O Lord of Hosts: heaven and earth are full of: Your glory and honor\\n\\nAnd when they say "Alleluia": the heavenly respond saying: "Holy, Amen. Alleluia. Glory be to our God."\\n\\nIntercede on our behalf, O angelic armies: and heavenly orders: that He may forgive us our sins',
        },
        {
          language: 'englishArabic',
          text: 'Sab\'atu ru\'asa\' mala\'ika: wuqufun yusabbihun amam ed-Dabit el-kull: yakhdimuna es-sirr el-khafi\\n\\nMikhail huwa el-awwal: Ghubriyal huwa eth-thani: Rafa\'il huwa eth-thalith: ka-mithal eth-thaloth\\n\\nSuriyal Sedakiyal: Saratiyal wa Ananiyal: ha\'ula\' el-muniroon el-\'uzama\' el-athar: yatlubuna minhu \'anil-khaliqa\\n\\nEsh-sharubim wes-sarafim: el-karasi wel-arbab, wel-quwwat el-arba\'a: el-hayawanat el-ghayr el-mutajassidin el-hamiloon markabat Allah\\n\\nEl-arba\'a wa \'ishrin qissisan: fi kanisat el-abkar: yusabbihunahu bila futur: sarikheena qa\'ileen:\\n\\nQuddoosun Allah, el-marda ishfihim: quddoosun el-qawiyy, er-raqidin ya Rabb niyyihum\\n\\nQuddoosun elladhi la yamut, barik mirathak: wal-takun rahmatuka wa salamuka: hisnan li-sha\'bik\\n\\nQuddoos quddoos quddoos, Rabb es-Saba\'oot: es-sama\' wel-ard mamlu\'atan: min majdika wa karamatik\\n\\nIza ma qaloo halleluia: yatba\'uhum es-samaiyyoon qa\'ilin: quddoos amin halleluia, el-majdu huwa li-ilahina\\n\\nIshfa\'u feena ayyuhal-\'asakir el-mala\'ikiyya: wat-taghamat es-sama\'iyya: li-yaghfiru lana khatayana',
        },
        {
          language: 'arabic',
          text: 'سبعة رؤساء ملائكة: وقوف يسبحون أمام الضابط الكل: يخدمون السر الخفى\\n\\nميخائيل هو الأول: غبريال هو الثانى: رافائيل هو الثالث: كمثال الثالوث\\n\\nسوريال سداكيال سراتيال وآنانيال: هؤلاء المنيرون العظماء الأطهار: يطلبون منه عن الخليقة\\n\\nالشاروبيم والسارافيم: الكراسي والأرباب والقوات الأربعة: الحيوانات الغير المتجسدين الحاملون مركبة الله\\n\\nالأربعة وعشرين قسيساً: في كنيسة الأبكار: يسبحونه بلا فتور: صارخين قائلين:\\n\\nقدوس الله. المرضي إشفهم: قدوس القوى. الراقدين يارب نيحهم\\n\\nقدوس الذى لا يموت بارك ميراثك: ولتكن رحمتك وسلامك: حصناً لشعبك\\n\\nقدوس قدوس قدوس رب الصابأؤوت: السماء والأرض مملوءتان: من مجدك وكرامتك\\n\\nإذا ما قالوا هلليلويا يتبعهم السمائييون قائلين: قدوس أمين هلليلويا. المجد هو لإلهنا\\n\\nإشفعوا فينا أيها العساكر الملائكية والطغمات السمائية: ليغفر لنا خطايانا',
        },
      ],
    },
    {
      id: 'annual-matins-doxology-apostles',
      title: 'Ⲕⲩⲣⲓⲟⲥ Ⲓⲏⲥⲟⲩⲥ (Doxology for The Apostles)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲕⲩⲣⲓⲟⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲁϥⲥⲱⲧⲡ Ⲛ̀ⲛⲉϥⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲉ̀ⲧⲉ Ⲡⲉⲧⲣⲟⲥ ⲛⲉⲙ Ⲁ̀ⲛⲇ̀ⲣⲉⲁⲥ: Ⲓⲱⲁⲛⲛⲏⲥ ⲛⲉⲙ Ⲓⲁⲕⲱⲃⲟⲥ\\n\\nⲖⲟⲓⲡⲟⲛ Ⲫⲓⲗⲓⲡⲡⲟⲥ ⲛⲉⲙ Ⲙⲁⲧⲑⲉⲟⲥ: Ⲃⲁⲣⲑⲟⲗⲟⲙⲉⲟⲥ ⲛⲉⲙ Ⲑⲱⲙⲁⲥ: Ⲓⲁⲕⲱⲃⲟⲥ Ⲛ̀ⲧⲉ Ⲁⲗⲫⲉⲟⲥ: ⲛⲉⲙ Ⲥⲓⲙⲱⲛ ⲡⲓⲕⲁⲛⲁⲛⲉⲟⲥ\\n\\nⲐⲁⲇⲇⲉⲟⲥ ⲛⲉⲙ Ⲙⲁⲧⲑⲓⲁⲥ: Ⲡⲁⲩⲗⲟⲥ ⲛⲉⲙ Ⲙⲁⲣⲕⲟⲥ ⲛⲉⲙ Ⲗⲟⲩⲕⲁⲥ: ⲛⲉⲙ ⲡ̀ⲥⲉⲡⲓ Ⲛ̀ⲧⲉ ⲛⲓⲙⲁⲑⲏⲧⲏⲥ: ⲛⲏⲉ̀ⲧⲁⲩⲙⲟϣⲓ Ⲛ̀ⲥⲁ ⲠⲉⲛⲤⲱⲧⲏⲣ\\n\\nⲘⲁⲧⲑⲓⲁⲥ ⲫⲏⲉ̀ⲧⲁϥϣⲱⲡⲓ: Ⲛ̀ⲧ̀ϣⲉⲃⲓⲱ Ⲛ̀ⲓⲟⲩⲇⲁⲥ: ⲛⲉⲙ ⲡ̀ⲭⲱⲕ ⲉ̀ⲃⲟⲗ ⲛⲉⲙ ⲡ̀ⲥⲉⲡⲓ: ⲛⲏⲉ̀ⲧⲁⲩⲙⲟϣⲓ Ⲛ̀ⲥⲁ Ⲇⲉⲥⲡⲟⲧⲁ\\n\\nⲀ̀ⲡⲟⲩⲧ̀ϩ̀ⲣⲱⲟⲩ ϣⲉⲛⲁϥ ⲉ̀ⲃⲟⲗ: ϩⲓϫⲉⲛ ⲡ̀ϩⲟ Ⲙ̀ⲡ̀ⲕⲁϩⲓ ⲧⲏⲣϥ: ⲟⲩⲟϩ ⲛⲟⲩⲥⲁϫⲓ ⲁⲩⲫⲟϩ: ϣⲁ ⲁⲩⲣⲏϫⲥ Ⲛ̀ϯⲟⲓⲕⲟⲩⲙⲉⲛⲏ\\n\\nⲦⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲁϭⲟⲓⲥ Ⲛ̀ⲓⲟϯ Ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛⲉⲙ ⲡⲓⲱ̀ⲃⲉⲥⲛⲁⲩ Ⲙ̀ⲙⲁⲑⲏⲧⲏⲥ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ',
        },
        {
          language: 'englishCoptic',
          text: 'Kurios Iēsous Pi-ekhristos: afsōtp Ennefapostolos: ete Petros nem Anedreas: Iōannēs nem Iakōvos\\n\\nLoipon Filippos nem Mattheos: Vartholomeos nem Thōmas: Iakōvos Ente Alfeos: nem Simōn pikananeos\\n\\nThaddeos nem Matthias: Paulos nem Markos nem Loukas: nem epsepi Ente nimathētēs: nē-etaumoshi Ensa Pen-Sōtēr\\n\\nMatthias fē-etafshōpi: Enetsheviō Enioudas: nem epkhōk evol nem epsepi: nē-etaumoshi Ensa Despota\\n\\nApou-etehrōou shenaf evol: hijen epho Emepkahi tērf: ouoh nousaji aufoh: sha aurējs Entioikoumenē\\n\\nTōbh Em-Eptshois ekhrēi ejōn: ō natshois Enioti Enapostolos: nem pi-ōvesnau Emmathētēs: Entefkha nennovi nan evol',
        },
        {
          language: 'english',
          text: 'Our Lord Jesus Christ, has chosen His apostles, who are Peter and Andrew: and John and James\\n\\nAlso Philip and Matthew, Bartholomew and Thomas: James the Son of Alphaeus: and Simon the Canaanite\\n\\nThaddaeus and Matthias, Paul Mark and Luke: and the rest of the disciples: who followed our Savior\\n\\nMatthias, who was chosen, in place of Judas: all of them and the rest: followed the Master\\n\\nTheir voice went forth, upon the face of the whole earth: and their words have reached: the ends of the world\\n\\nPray to the Lord on our behalf, my lords and fathers the apostles: and the seventy-two disciples: that He may forgive us our sins',
        },
        {
          language: 'englishArabic',
          text: 'Er-Rabb Yasu\' el-Maseeh, ikhtara rusulahu, wa hum Butros wa Andrawus: wa Yohanna wa Ya\'qub\\n\\nWa Filibbus wa Matta, wa Bartholomaus wa Touma: wa Ya\'qub ibn Halfi: wa Sam\'an el-Qanawi\\n\\nWa Taddaus wa Matthias, wa Boulos wa Murqus wa Luqa: wa baqiyyat et-talamiz: ellazina tabi\'oo mukhallisana\\n\\nMatthias ellazi sara, \'iwadan \'an Yahouza: wa kamil wa baqiyyat et-talamiz: ellazina tabi\'us-sayyid\\n\\nKharajat aswatuhum, ila wajh el-ard kulliha: wa balagha kalamuhum: ila aqtar el-maskuna\\n\\nUtlubu minar-Rabb \'anna, ya sadati el-aba\' er-rusul: wal-ithnan was-sab\'oon tilmizan: li-yaghfir lana khatayana',
        },
        {
          language: 'arabic',
          text: 'الرب يسوع المسيح، اختار رسله، وهم بطرس واندراوس: ويوحنا ويعقوب\\n\\nوفيلبس ومتي، وبرثلماوس وتوما: ويعقوب بن حلفي: وسمعان القانوي\\n\\nوتداوس ومتياس، وبولس ومرقس ولوقا: وبقية التلاميذ: الذين تبعوا مخلصنا\\n\\nمتياس الذي صار، عِوضاً عن يهوذا: وكامل وبقية التلاميذ: الذين تبعوا السيد\\n\\nخرجت أصواتهم، إلي وجه الأرض كلها: وبلغ كلامهم: إلي أقطار المسكونة\\n\\nأطلبوا من الرب عنا، يا سادتي الآباء الرسل: والاثنان والسبعون تلميذاً: ليغفر لنا خطايانا',
        },
      ],
    },    {
      id: 'annual-matins-doxology-st-mark',
      title: 'Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ (Doxology for St Mark the Apostle)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲟⲩⲟϩ ⲡⲓⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: ⲡⲓⲙⲉⲑⲣⲉ ϧⲁ ⲛⲓⲕⲁϩⲓ: Ⲛ̀ⲧⲉ ⲡⲓⲙⲟⲛⲟⲅⲉⲛⲏⲥ Ⲛ̀ⲛⲟⲩϯ\\n\\nⲀⲕⲓ̀ ⲁⲕⲉⲣⲟⲩⲱⲓⲛⲓ ⲉ̀ⲣⲟⲛ: ϩⲓⲧⲉⲛ ⲡⲉⲕⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ: ⲁⲕⲧ̀ⲥⲁⲃⲟⲛ Ⲙ̀Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ: ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ\\n\\nⲀⲕⲉⲛⲧⲉⲛ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲡ̀ⲭⲁⲕⲓ: ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲡⲓⲟⲩⲱⲓⲛⲓ Ⲙ̀ⲙⲏⲓ: ⲁⲕⲧⲉⲙⲙⲟⲛ Ⲙ̀ⲡⲓⲱⲓⲕ Ⲛ̀ⲧⲉ ⲡ̀ⲱⲛϧ: ⲉ̀ⲧⲁϥⲓ̀ ⲉ̀ⲡⲉⲥⲏⲧ ⲉ̀ⲃⲟⲗϧⲉⲛ Ⲧ̀ⲫⲉ\\n\\nⲀⲩⲥ̀ⲙⲟⲩ Ⲛ̀ϧⲣⲏⲓ Ⲛ̀ϧⲏⲧⲕ: Ⲛ̀ϫⲉ ⲛⲓⲫⲩⲗⲏ ⲧⲏⲣⲟⲩ Ⲛ̀ⲧⲉ ⲡ̀ⲕⲁϩⲓ: ⲟⲩⲟϩ ⲛⲉⲕⲥⲁϫⲓ ⲁⲩⲫⲟϩ: ϣⲁ ⲁⲩⲣⲏϫⲥ Ⲛ̀ϯⲟⲓⲕⲟⲩⲙⲉⲛⲏ\\n\\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: ⲭⲉⲣⲉ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ\\n\\nⲦⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ Ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ',
        },
        {
          language: 'englishCoptic',
          text: 'Markos pi-apostolos: ouoh pieuaggelistēs: pimethre kha nikahi: Ente pimonogenēs Ennouti\\n\\nAki akerouōini eron: hiten pekeuaggelion: aketsavon Em-Efiōt nem Epshēri: nem pi-Epneuma ethouab\\n\\nAkenten evolkhen epkhaki: ekhoun epiouōini Emmēi: aktemmon Empiōik Ente epōnkh: etafi epesēt evolkhen Etfe\\n\\nAu-esmou Enkhrēi Enkhētk: Enje nifulē tērou Ente epkahi: ouoh neksaji aufoh: sha aurējs Entioikoumenē\\n\\nKhere nak ō pimarturos: khere pieuaggelistēs: khere pi-apostolos: Abba Markos pitheōrimos\\n\\nTōbh Em-Eptshois ekhrēi ejōn: ō pitheōrimos Eneuaggelistēs: Abba Markos pi-apostolos: Entefkha nennovi nan evol',
        },
        {
          language: 'english',
          text: 'O Mark the Apostle: and the evangelist: the witness of the passion: of the only-begotten God\\n\\nYou have come and enlightened us: through your Gospel: and taught us the Father and the Son: and the Holy Spirit\\n\\nYou brought us out of the darkness: into the true Light: and nourished us with the Bread of life: that came down from heaven\\n\\nAll the tribes of the earth: were blessed through you: and your words have reached: the ends of the world\\n\\nHail to you O martyr: hail to the evangelist: hail to the Apostle: Mark the beholder of God\\n\\nPray to the Lord on our behalf: O beholder of God, the evangelist: Mark the Apostle: that He may forgive us our sins',
        },
        {
          language: 'englishArabic',
          text: 'Ya Markos er-rasul: wal-injili: esh-shahid li-alam: el-ilah el-wahid\\n\\nAtayta wa anarta lana: bi-injilik: wa \'allamtana el-Ab, wal-Ibn: war-Ruh el-Qudus\\n\\nWa akhrajtana minaz-zulma: ilan-noor el-haqiqi: wa at\'amtana khubz el-hayah: ellazi nazala minas-sama\'\\n\\nTabarakat bik, kullu qaba\'il el-ard: wa aqwaluka balaghat: ila aqtar el-maskuna\\n\\nEs-salamu lak ayyuhash-shahid: es-salamu lil-injili: es-salamu lir-rasul: Markos nazir el-ilah\\n\\nUtlub minar-Rabb \'anna: ya nazir el-ilah el-injili: Markos er-rasul: li-yaghfir lana khatayana',
        },
        {
          language: 'arabic',
          text: 'يا مرقس الرسول: والانجيلى: الشاهد لآلام: الاله الوحيد\\n\\nأتيت وأنرت لنا: بانجيلك: وعلمتنا الآب والابن: والروح القدس\\n\\nوأخرجتنا من الظلمة: الى النور الحقيقى: وأطعمتنا خبز الحياة: الذى نزل من السماء\\n\\nتباركت بك، كل قبائل الأرض: وأقوالك بلغت: الى أقطار المسكونة\\n\\nالسلام لك أيها الشهيد: السلام للانجيلى: السلام للرسول: مرقس ناظر الاله\\n\\nاطلب من الرب عنا: يا ناظر الإله الإنجيلي: مرقس الرسول: ليغفر لنا خطايانا',
        },
      ],
    },
    {
      id: 'annual-matins-doxology-st-mark-2',
      title: 'Ϣⲟⲙⲧ Ⲛ̀ⲣⲁⲛ (Another Doxology for St Mark the Apostle)',
      versions: [
        {
          language: 'coptic',
          text: 'Ϣⲟⲙⲧ Ⲛ̀ⲣⲁⲛ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ: Ⲛ̀ⲑⲟⲕ ⲁⲕⲉⲣϥⲟⲣⲓⲛ Ⲙ̀ⲙⲱⲟⲩ: ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ Ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ\\n\\nⲀⲕⲉⲣϥⲟⲣⲓⲛ Ⲙ̀ⲡⲓϣⲟⲙⲧ Ⲛ̀ⲭ̀ⲗⲟⲙ: ⲡⲓϣⲟⲙⲧ Ⲛ̀ⲣⲁⲛ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲉ̀ⲧⲉ ⲫⲁⲓⲡⲉ Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ: ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ\\n\\nⲚ̀ⲑⲟⲕ ⲟⲩⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: Ⲛ̀ⲑⲟⲕ ⲟⲛ ⲟⲩⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲛ̀ⲑⲟⲕ ⲟⲛ ⲡⲉ ⲡⲓⲙⲁϩⲃ̀ⲥ̀ⲛⲁⲩ: Ⲛ̀ⲥⲱⲧⲡ Ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ\\n\\nⲚⲉⲕⲕⲉϣⲫⲏⲣ Ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲥⲉϣⲟⲩϣⲟⲩ Ⲙ̀ⲙⲱⲟⲩ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲕ: ⲟⲩⲟϩ ⲛⲉⲕⲥⲁϫⲓ ⲁⲩⲫⲟϩ: ϣⲁ ⲁⲩⲣⲏϫⲥ Ⲛ̀ϯⲟⲓⲕⲟⲩⲙⲉⲛⲏ\\n\\nⲤⲉϣⲟⲩϣⲟⲩ Ⲙ̀ⲙⲱⲟⲩ Ⲛ̀ϧⲣⲏⲓ Ⲛ̀ϧⲏⲧⲕ: Ⲛ̀ϫⲉ ⲛⲏⲉ̀ⲧⲁⲕⲧⲟ ϧⲟⲩ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ: ϧⲉⲛ ϯⲭⲱⲣⲁ ⲧⲏⲣⲥ Ⲛ̀Ⲭⲏⲙⲓ: ⲁⲩϯⲣⲓ ⲉ̀ⲃⲟⲗ ⲉⲩⲧ̀ⲕⲁⲣⲡⲟⲥ\\n\\nⲦⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ Ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ',
        },
        {
          language: 'englishCoptic',
          text: 'Shomt Enran etkhen nifēoui: Enthok akerforin Emmōou: pitheōrimos Eneuaggelistēs: Abba Markos pi-apostolos\\n\\nAkerforin Empishomt Enekhlom: pishomt Enran etjēk evol: ete faipe Efiōt nem Epshēri: nem pi-Epneuma ethouab\\n\\nEnthok ou-apostolos: Enthok on oumarturos: Enthok on pe pimahebesnau: Ensōtp Eneuaggelistēs\\n\\nNekkeshfēr Enapostolos: seshoushou Emmōou ekhrēi ejōk: ouoh neksaji aufoh: sha aurējs Entioikoumenē\\n\\nSeshoushou Emmōou Enkhrēi Enkhētk: Enje nē-etakto khou hijen pikahi: khen tikhōra tērs En-Khēmi: autiri evol eu-etkarpos\\n\\nTōbh Em-Eptshois ekhrēi ejōn: ō pitheōrimos Eneuaggelistēs: Abba Markos pi-apostolos: Entefkha nennovi nan evol',
        },
        {
          language: 'english',
          text: 'You wore three names: that are in heaven: O beholder of God the Evangelist: Mark the Apostle\\n\\nYou wore the three crowns: the three perfect names: which is the Father the Son: and the Holy Spirit\\n\\nYou are an Apostle: you are a martyr: you are also the second: chosen Evangelist\\n\\nYour friends the Apostles: boast about you: and your words reached: the ends of the world\\n\\nThose whom you planted on Earth: throughout the land of Egypt: take pride in you: they blossomed and brought forth fruit\\n\\nPray to the Lord on our behalf: O beholder of God, the Evangelist: Mark the Apostle: that He may forgive us our sins',
        },
        {
          language: 'englishArabic',
          text: 'Thalathatu asma\' fis-samawat: anta tawashahta biha: ya nazir el-ilah el-injili: Markos er-rasul\\n\\nTawashahta bi-thalathati akalil: hiya eth-thalatha asma\' el-kamila: ay el-Ab, wal-Ibn, war-Ruh el-Qudus\\n\\nAnta rasul: anta shahid: wa anta el-mukhtar eth-thani: fil-injiliyyin\\n\\nWa asdiqa\'uka er-rusul: el-akharoon yafkharoon bik: wa aqwaluka balaghat: ila aqtar el-maskuna\\n\\nWa yafkharoona bik: ellazina ghara-sathum \'alal-ard: fi kulli iqleem Misr: muthmirin\\n\\nUtlub minar-Rabb \'anna: ya nazir el-ilah el-injili: Markos er-rasul: li-yaghfir lana khatayana',
        },
        {
          language: 'arabic',
          text: 'ثلاثة أسماء فى السموات: أنت توشحت بها: يا ناظر الإله الإنجيلي: مرقس الرسول\\n\\nتوشحت بثلاثة أكاليل: هي الثلاثه أسماء الكاملة: أي الآب والإبن، والروح القدس\\n\\nأنت رسول: أنت شهيد: وأنت المختار الثاني: في الإنجلييين\\n\\nوأصدقاؤك الرسل: الأخرون يفخرون بك: وأقوالك بلغت: إلى أقطار المسكونة\\n\\nويفخرون بك: الذين غرستهم على الأرض: في كل إقليم مصر: مُثمرين\\n\\nأُطلب من الرب عنا: يا ناظر الإله الإنجيلي: مرقس الرسول: ليغفر لنا خطايانا',
        },
      ],
    },
    {
      id: 'annual-matins-doxology-philopater-mercurius',
      title: 'Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ (Doxology for St Philopater Mercurius)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: ⲡⲓⲣⲉⲙⲛ̀ϫⲟⲙ Ⲛ̀ⲧⲉ Ⲡ̀ⲭ̅ⲥ̅: ⲁϥϯϩⲓⲱⲧϥ Ⲛ̀ϯⲡⲁⲛⲟⲡⲗⲓⲁ: ⲛⲉⲙ ⲡⲓϫⲱⲕ ⲧⲏⲣϥ Ⲛ̀ⲧⲉ ⲡⲓⲛⲁϩϯ\\n\\nⲞⲩⲟϩ ⲁϥϭⲓ ϧⲉⲛ ⲧⲉϥϫⲓϫ: Ⲛ̀ϯⲥⲏϥⲓ Ⲛ̀ⲣⲟϭⲛⲁⲩ: ⲑⲏⲉ̀ⲧⲁ ⲡⲓⲁⲅⲅⲉⲗⲟⲥ Ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ: ⲧⲁϩⲣⲟⲥ ϧⲉⲛ ⲧⲉϥϫⲓϫ Ⲛ̀ⲟⲩⲓⲛⲁⲙ\\n\\nⲀϥϣⲉ ⲛⲁϥ ⲉ̀ⲡⲓⲡⲟⲗⲉⲙⲟⲥ: ϧⲉⲛ ϯϫⲟⲙ Ⲛ̀ⲧⲉ Ⲡ̀ⲭ̅ⲥ̅: ⲁϥϣⲁⲣⲓ ⲉ̀ⲛⲓⲃⲁⲣⲃⲁⲣⲟⲥ: ϧⲉⲛ ⲟⲩⲛⲓϣϯ Ⲛ̀ⲉⲣϣⲟⲧ\\n\\nⲀϥⲉⲣⲛⲏϥⲓⲛ ⲉ̀ⲃⲟⲗϧⲁ ⲛⲁ ⲡ̀ⲕⲁϩⲓ: ⲟⲩⲟϩ ⲁϥⲕⲱⲧ Ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟⲩⲓ: ⲁϥϧⲟⲕⲓ ϧⲉⲛ ⲡⲓⲥ̀ⲧⲁⲇⲓⲟⲛ: Ⲛ̀ⲧⲉ ϯⲙⲉⲧⲙⲁⲣⲧⲩⲣⲟⲥ\\n\\nⲀϥϯϣⲓⲡⲓ Ⲛ̀Ⲇⲉⲕⲓⲟⲥ: ⲡⲓⲟⲩⲣⲟ Ⲛ̀ⲁⲥⲉⲃⲏⲥ: ϩⲓⲧⲉⲛ ⲧⲉϥⲛⲓϣϯ Ⲛ̀ϩⲩⲡⲟⲙⲟⲛⲏ: ⲛⲉⲙ Ⲡ̀ϣⲓϫⲓ Ⲛ̀ⲧⲉ ⲛⲓⲃⲁⲥⲁⲛⲟⲥ\\n\\nϦⲉⲛ ⲛⲁⲓ ⲁϥⲉⲣϥⲟⲣⲓⲛ: Ⲙ̀ⲡⲓⲭ̀ⲗⲟⲙ Ⲛ̀ⲁⲧⲗⲱⲙ: Ⲛ̀ⲧⲉ ϯⲙⲉⲧⲙⲁⲣⲧⲩⲣⲟⲥ: ⲁϥⲉⲣϣⲁⲓ ⲛⲉⲙ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲧⲏⲣⲟⲩ: ϧⲉⲛ ϯⲭⲱⲣⲁ Ⲛ̀ⲧⲉ ⲛⲏⲉ̀ⲧⲟⲛϧ\\n\\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲡⲓϣⲱⲓϫ Ⲛ̀ⲥⲉⲛⲛⲉⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ\\n\\nⲦⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ Ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ',
        },
        {
          language: 'englishCoptic',
          text: 'Filopatēr Merkourios: piremenjom Ente Epkhristos: aftihiōtf Entipanoplia: nem pijōk tērf Ente pinahti\\n\\nOuoh aftshi khen tefjij: Entisēfi Enrotshnau: thē-eta piaggelos Ente Eptshois: tahros khen tefjij Enouinam\\n\\nAfshe naf epipolemos: khen tijom Ente Epkhristos: afshari enivarvaros: khen ounishti Enershot\\n\\nAfernēfin evolkha na epkahi: ouoh afkōt Enna nifēoui: afkhoki khen pi-estadion: Ente timetmarturos\\n\\nAftishipi En-Dekios: piouro Enasevēs: hiten tefnishti Enhupomonē: nem Epshiji Ente nivasanos\\n\\nKhen nai aferforin: Empi-ekhlom Enatlōm: Ente timetmarturos: afershai nem nēethouab tērou: khen tikhōra Ente nē-etonkh\\n\\nKhere nak ō pimarturos: khere pishōij Ensenneos: khere pi-athloforos: Filopatēr Merkourios\\n\\nTōbh Em-Eptshois ekhrēi ejōn: ō pi-athloforos Emmarturos: Filopatēr Merkourios: Entefkha nennovi nan evol',
        },
        {
          language: 'english',
          text: 'Philopater Mercurius: the mighty one of Christ, put on the full battle gear: and the whole armor of faith\\n\\nHe took in his hand: the two-edged sword: that an angel of the Lord: placed in his right hand\\n\\nHe went to the war: in the power of Christ: he smote the barbarians: with severe wounds\\n\\nHe refused the earthly: and sought the heavenly: he fought in the stadium: of martyrdom\\n\\nHe embarrassed Decius: the ungodly emperor: through his great patience: in the travails of his torments\\n\\nIn this he wore the unfading crown: of martyrdom: he celebrated with all the saints: in the region of the living\\n\\nHail to you O martyr: hail to the noble hero: hail to the struggle-bearer: Philopater Mercurius\\n\\nPray to the Lord on our behalf, O struggle-bearer and martyr: Philopater Mercurius: that He may forgive us our sins',
        },
        {
          language: 'englishArabic',
          text: 'Muhibb el-Ab Merqoreyos, el-qawi bil-Maseeh, labisa el-khoza: wa kulla silah el-eeman\\n\\nWa akhadha bi-yadihi: es-sayfa dhal-haddayn: elladhi thabbatahu malak er-Rabb: fi yadihil-yumna\\n\\nMada ilal-harb: bi-quwwat el-Maseeh: wa qatala el-barbar: bi-jirahatin \'azima\\n\\nTarraffa\'a \'anil-ardiyyat: wa talaba es-sama\'iyyat: wa tashajja\'a fi maydan: esh-shahada\\n\\nAfdaha Dakyoos: el-malik el-munafiq: bi-sabrihil-\'azeem: wa ta\'ab el-\'azabat\\n\\nWa bihaza labisa iklil esh-shahada ghayr el-mudmahill: wa \'ayyada ma\'a jami\' el-qiddiseen: fi kurat el-ahya\'\\n\\nEs-salamu lak ayyuhash-shahid: es-salamu lish-shuja\' el-batal: es-salamu lil-mujahid: Muhibb el-Ab Merqoreyos\\n\\nUtlub minar-Rabb \'anna, ayyuhash-shahid el-mujahid: Muhibb el-Ab Merqoreyos: li-yaghfir lana khatayana',
        },
        {
          language: 'arabic',
          text: 'محب الآب مرقوريوس، القوى بالمسيح، لبس الخوذة: وكل سلاح الإيمان\\n\\nوأخذ بيده: السيف ذا الحدين: الذي ثبته ملاك الرب: في يده اليمنى\\n\\nمضى إلي الحرب: بقوة المسيح: وقتل البربر: بجراحات عظيمة\\n\\nترَّفع عن الأرضيات: وطلب السمائيات: وتشجع في ميدان: الشهادة\\n\\nأفضح داكيوس: الملك المنافق: بصبره العظيم: وتعب العذابات\\n\\nوبهذا لبس إكليل الشهادة غير المضمحل: وعيّد مع جميع القديسين: في كورة الأحياء\\n\\nالسلام لك أيها الشهيد: السلام للشجاع البطل: السلام للمجاهد: محب الآب مرقوريوس\\n\\nاطلب من الرب عنا، أيها الشهيد المجاهد: محب الآب مرقوريوس: ليغفر لنا خطايانا',
        },
      ],
    },
    {
      id: 'annual-matins-doxology-st-mena',
      title: 'Ⲉ̀ϣⲱⲡ ⲟⲩⲛ (Doxology for St Mena the Wonderworker)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲉ̀ϣⲱⲡ ⲟⲩⲛ Ⲛ̀ⲧⲉ ⲡⲓⲣⲱⲙⲓ: ϫⲉⲙϩⲏⲟⲩ Ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ ⲧⲏⲣϥ: Ⲛ̀ⲧⲉϥϯⲟ̀ⲥⲓ Ⲛ̀ⲧⲉϥⲯⲩⲭⲏ: ⲟⲩ ⲡⲉ ⲡⲁⲓ ⲱ̀ⲛϧ Ⲛ̀ⲉ̀ⲫⲗⲏⲟⲩ\\n\\nⲠⲓⲁ̀ⲅⲓⲟⲥ Ⲁⲃⲃⲁ Ⲙⲏⲛⲁ: ⲁϥⲥⲱⲧⲉⲙ Ⲛ̀ⲥⲁ ϯⲥ̀ⲙⲏ Ⲛ̀ⲛⲟⲩϯ: ⲁϥⲭⲱ Ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ ⲧⲏⲣϥ Ⲛ̀ⲥⲱϥ: ⲛⲉⲙ ⲡⲉϥⲱ̀ⲟⲩ ⲉⲑⲛⲁⲧⲁⲕⲟ\\n\\nⲀϥϯ Ⲛ̀ⲧⲉϥⲯⲩⲭⲏ ⲉ̀ⲫⲙⲟⲩ: ⲛⲉⲙ ⲡⲉϥⲥⲱⲙⲁ ⲉ̀ⲡⲓⲭ̀ⲣⲱⲙ: ⲁϥϣⲉⲡ ϩⲁⲛⲛⲓϣϯ Ⲙ̀ⲃⲁⲥⲁⲛⲟⲥ: ⲉⲑⲃⲉ Ⲡ̀ϣⲏⲣⲓ Ⲙ̀Ⲫ̀ϯ ⲉ̀ⲧⲟⲛϧ\\n\\nⲈⲑⲃⲉ ⲫⲁⲓ ⲁ̀ⲡⲉⲛⲤⲱⲧⲏⲣ: ⲟ̀ⲗϥ ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲧⲉϥⲙⲉⲧⲟⲩⲣⲟ: ⲁϥϯⲛⲁϥ Ⲛ̀ⲛⲓⲁ̀ⲅⲁⲑⲟⲛ: Ⲛ̀ⲏⲉ̀ⲧⲉ Ⲙ̀ⲡⲉⲃⲁⲗ ⲛⲁⲩ ⲉ̀ⲣⲱⲟⲩ\\n\\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲡⲓϣⲱⲓϫ Ⲛ̀ⲥⲉⲛⲛⲉⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ: Ⲡⲓⲁ̀ⲅⲓⲟⲥ Ⲁⲃⲃⲁ Ⲙⲏⲛⲁ\\n\\nⲦⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ Ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲡⲓⲁ̀ⲅⲓⲟⲥ Ⲁⲃⲃⲁ Ⲙⲏⲛⲁ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ',
        },
        {
          language: 'englishCoptic',
          text: 'Eshōp oun Ente pirōmi: jemhēou Empikosmos tērf: Entefti-osi Entefpsukhē: ou pe pai ōnkh Eneflēou\\n\\nPi-agios Abba Mēna: afsōtem Ensa ti-esmē Ennouti: afkhō Empikosmos tērf Ensōf: nem pefōou ethnatako\\n\\nAfti Entefpsukhē efmou: nem pefsōma epi-ekhrōm: afshep hannishti Emvasanos: ethve Epshēri Em-Efnouti etonkh\\n\\nEthve fai apen-Sōtēr: olf ekhoun etefmetouro: aftinaf Enni-agathon: Enē-ete Empeval nau erōou\\n\\nKhere nak ō pimarturos: khere pishōij Ensenneos: khere pi-athloforos: Pi-agios Abba Mēna\\n\\nTōbh Em-Eptshois ekhrēi ejōn: ō pi-athloforos Emmarturos: Pi-agios Abba Mēna: Entefkha nennovi nan evol',
        },
        {
          language: 'english',
          text: 'What will it profit a man: if he gains the whole world: and loses his soul: O the futility of this life\\n\\nThe saint Abba Mina: heard the Divine voice: and forsook the whole world: and its corrupt glory\\n\\nHe gave his soul up to death, and his flesh to the fire: and accepted great torment: for the Son of the Living God\\n\\nTherefore our Savior: lifted him to His kingdom: and granted him the good things: that no eye has seen\\n\\nHail to you, O martyr: hail to the noble hero: hail to the struggle-bearer: saint Abba Mina\\n\\nPray to the Lord on our behalf: O struggle-bearer and martyr: saint Abba Mina: that He may forgive us our sins',
        },
        {
          language: 'englishArabic',
          text: 'Iza rabiha el-insanu el-\'alama kullahu: wa khasira nafsahu: fama hiya el-hayat el-batila\\n\\nEl-qiddis Aba Mina: sami\'a es-sawt el-ilahi: wa taraka \'anhul-\'alama kullahu: wa majdahul-fasid\\n\\nWa bazala nafsahu lil-mawt, wa jasadahu lin-nar: wa qabila \'azabatin \'azima: li-ajli ibnil-lahil-hayy\\n\\nFa-lihaza rafa\'ahu mukhallisuna: ila malakutihi: wa a\'tahul-khayrat: ellati lam tara-ha \'ayn\\n\\nEs-salamu lak ayyuhash-shahid: es-salamu lish-shuja\' el-batal: es-salamu lil-mujahid: el-qiddis Aba Mina\\n\\nUtlub minar-Rabb \'anna: ayyuhash-shahid el-mujahid: el-qiddis Aba Mina: li-yaghfir lana khatayana',
        },
        {
          language: 'arabic',
          text: 'اذا ربح الإنسان العالم كله: وخسر نفسه: فما هي الحياة الباطلة\\n\\nالقديس أبا مينا: سمع الصوت الالهي: وترك عنه العالم كله: ومجده الفاسد\\n\\nوبذل نفسه للموت، وجسده للنار: وقبل عذابات عظيمة: لأجل ابن الله الحي\\n\\nفلهذا رفعه مخلصنا: إلي ملكوته: وأعطاه الخيرات: التي لم ترها عين\\n\\nالسلام لك أيها الشهيد: السلام للشجاع البطل: السلام للمجاهد: القديس أبا مينا\\n\\nأطلب من الرب عنا: أيها الشهيد المجاهد: القديس أبا مينا: ليغفر لنا خطايانا',
        },
      ],
    },
    {
      id: 'annual-matins-doxology-pope-kyrillos-vi',
      title: 'Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ (Doxology for St Pope Kyrillos VI)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: Ⲡⲓⲙⲁⲕⲁⲣⲓⲟⲥ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ: Ⲫⲏⲉ̀ⲧⲁϥⲧⲁϫⲣⲟⲛ Ⲙ̀ⲡⲓⲛⲁϩϯ: Ⲛ̀ⲟⲣⲑⲟⲇⲟⲝⲟⲥ Ⲛ̀ⲧⲁⲫ̀ⲙⲏⲓ\\n\\nⲞⲩⲣⲁⲛ Ⲛ̀ϣⲟⲩϣⲟⲩ ⲡⲉ ⲡⲉⲕⲣⲁⲛ: ⲱ̀ ⲡⲓⲙⲟⲛⲁⲭⲟⲥ ⲉⲧⲧⲟⲩⲃⲏⲟⲩⲧ: Ⲡⲓⲙⲁⲛⲇ̀ⲣⲓⲧⲏⲥ ⲉⲧⲧⲁϫⲣⲏⲟⲩⲧ: Ⲛ̀ⲛⲓⲁ̀ⲛⲁⲭⲱⲣⲏⲧⲏⲥ\\n\\nⲈⲑⲃⲉ ⲫⲁⲓ ⲁⲕϣⲱⲡⲓ ⲛⲁⲛ: Ⲛ̀ⲟⲩⲧⲩⲡⲟⲥ ϧⲉⲛ ⲡ̀ⲥⲁϫⲓ: ϧⲉⲛ ϯⲁ̀ⲅⲁⲡⲏ ϧⲉⲛ ⲡⲓϫⲓⲛⲙⲟϣⲓ: ϧⲉⲛ ⲡⲓⲧⲟⲩⲃⲟ ϧⲉⲛ Ⲫ̀ⲛⲁϩϯ\\n\\nⲬⲉⲣⲉ ⲡⲓⲙⲁⲓⲛⲉϥϣⲏⲣⲓ: Ⲫⲏⲉ̀ⲧⲁϥⲧⲁⲗϭⲟ Ⲛ̀ⲛⲏⲉⲧϣⲱⲛⲓ: Ⲁϥⲉⲣϣ̀ⲣⲡ̀ϩⲓⲧⲉⲛ Ⲛ̀ⲛⲓϣ̀ⲫⲏⲣⲓ: Ⲟⲩⲟϩ ⲛⲓⲇⲉⲙⲱⲛ ⲁϥϩⲓⲧⲟⲩ ⲉ̀ⲃⲟⲗ\\n\\nϤ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ Ⲛ̀ϫⲉ ⲡⲉⲕⲃⲓⲟⲥ: ⲱ̀ ⲡⲉⲛⲓⲱⲧ Ⲙ̀ⲙⲁⲕⲁⲣⲓⲟⲥ: Ⲁⲕⲧⲁⲥⲑⲟ ⲛⲁⲛ Ⲙ̀ⲡⲓⲥⲱⲙⲁ Ⲛ̀Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ: Ⲟⲩⲟϩ ⲁⲕⲓ̀ⲣⲓ Ⲙ̀ⲡⲓⲘⲩⲣⲟⲛ ⲉⲑⲟⲩⲁⲃ\\n\\nⲘⲁⲣⲓⲁ Ϯⲙⲁⲥⲛⲟⲩϯ: Ⲁⲥⲟⲩⲱⲛϩ ϧⲉⲛ ⲟⲩⲛⲓϣϯ Ⲛ̀ϣ̀ⲫⲏⲣⲓ: Ⲛⲉⲙ ⲛⲓϭⲣⲟⲙⲡⲓ ⲛⲉⲙ ⲛⲓⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ: ϧⲉⲛ ⲧⲉⲥⲉⲕⲕⲗⲏⲥⲓⲁ ϧⲉⲛ Ⲍⲏⲧⲟⲩⲛ\\n\\nⲀⲕⲕⲱⲧ Ⲛ̀ⲟⲩⲙⲁⲕⲁⲑⲉⲇⲣⲁ Ⲙ̀ⲃⲉⲣⲓ: Ⲛⲉⲙ ⲡⲓⲛⲓϣϯ Ⲛ̀ⲁⲃϩⲏⲧ Ⲛ̀Ⲁⲃⲃⲁ Ⲙⲏⲛⲁ: Ⲛⲉⲙ ϩⲁⲛⲙⲏϣ Ⲛ̀ⲉⲕⲕⲗⲏⲥⲓⲁ: Ⲡⲉⲕϩⲏⲧ Ⲙ̀ⲡⲉϥϭⲓⲥⲓ ⲛⲁϩⲣⲓ ⲉ̀ⲡ̀ⲧⲏⲣϥ\\n\\nϢⲁⲕⲧⲱⲛⲕ Ⲙ̀ⲫ̀ⲛⲁⲩ Ⲛ̀ϣⲟⲣⲡ: ϧⲉⲛ ⲧⲉⲕϫⲟⲙ ⲛⲉⲙ ⲛⲉⲕϣⲱⲛⲓ: Ⲉⲑⲣⲉⲕϩⲱⲥ ⲛⲉⲙ ⲛⲓⲁ̀ⲅⲅⲉⲗⲟⲥ: Ⲛⲉⲙ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲉⲧⲉⲕⲙⲉⲛⲣⲓⲧⲟⲩ\\n\\nϮⲛⲟⲩ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: Ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲛⲟⲩϯ: Ⲉⲑⲣⲉϥϫⲱⲕ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ Ⲙ̀ⲡⲉⲕⲣⲏϯ: ϧⲉⲛ ϯⲁ̀ⲅⲁⲡⲏ ϧⲉⲛ Ⲫ̀ⲛⲁϩϯ\\n\\nⲦⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ Ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ',
        },
        {
          language: 'englishCoptic',
          text: 'Papa Abba Kurillos pimahsoou: Pimakarios khen oumethmēi: Fē-etaftajron Empinahti: Enorthodoksos Enta-efmēi\\n\\nOuran Enshoushou pe pekran: ō pimonakhos ettouvēout: Pimanedritēs ettajrēout: Enni-anakhōrētēs\\n\\nEthve fai akshōpi nan: Enoutupos khen epsaji: khen ti-agapē khen pijinmoshi: khen pitouvo khen Efnahti\\n\\nKhere pimainefshēri: Fē-etaftaltsho Ennēetshōni: Afereshrephiten Enni-eshfēri: Ouoh nidemōn afhitou evol\\n\\nEfesmarōout Enje pekvios: ō peniōt Emmakarios: Aktastho nan Empisōma En-Abba Markos: Ouoh akiri Empi-Muron ethouab\\n\\nMaria Timasnouti: Asouōnh khen ounishti Eneshfēri: Nem nitshrompi nem ni-esthoinoufi: khen tesekklēsia khen Zētoun\\n\\nAkkōt Enoumakathedra Emveri: Nem pinishti Enabhēt En-Abba Mēna: Nem hanmēsh Enekklēsia: Pekhēt Empeftshisi nahri e-eptērf\\n\\nShaktōnk Emefnau Enshorp: khen tekjom nem nekshōni: Ethrekhōs nem ni-aggelos: Nem nēethouab etekmenritou\\n\\nTinou aripenmeu-i: Nahren Pennouti: Ethrefjōk nan evol Empekrēti: khen ti-agapē khen Efnahti\\n\\nTōbh Em-Eptshois ekhrēi ejōn: Peniōt ethouab Empatriarkhēs: Papa Abba Kurillos pimahsoou: Entefkha nennovi nan evol',
        },
        {
          language: 'english',
          text: 'Pope Kyrillos the sixth: the truly honored: who founded us in the true: orthodox faith\\n\\nYour name is a name of pride: O pure monk: the strengthened hermit: the friend of the anchorites\\n\\nFor you have become: a leading example: of words, love, and deeds: and of purity in faith\\n\\nHail to you loving father: who healed the sick: and foresaw miracles: and cast out demons\\n\\nYour era was blessed: O our honored father: you restored St. Mark\'s relics: and made the sacred Myron\\n\\nMary the mother of God: appeared miraculously: with doves and incense: above her church in Zeitoun\\n\\nYou built a new cathedral: and St. Mina\'s great monastery: and many churches: but you remained humble\\n\\nYou rose at dawn: both in health and in sickness: to praise with the angels: and your beloved saints\\n\\nAnd now remember us: before our God: that He may keep us: In His love and faith\\n\\nPray to the Lord on our behalf: our holy father the patriarch: Abba Kyrillos the sixth: that He may forgive us our sins',
        },
        {
          language: 'englishArabic',
          text: 'El-Baba Kirillos es-sadis: et-tubawi bil-haqiqa: ellazi thabbatana fil-eeman: el-Orthodoxi el-haqiqi\\n\\nYa ismuka huwa fakhr ismik: ayyuhar-rahib et-tahir: wal-mutawahhid el-qawi: sadeeq es-suwwah\\n\\nMin ajli haza sirta lana: qudwatan fil-kalam: fil-mahabba fit-tasarruf: fit-taharati fil-eeman\\n\\nEs-salamu li-muhibbi awladih: ellazi shafal-marda: wa tanabba\'a bil-\'aza\'im: wa akhraja esh-shayatin\\n\\nMubarakun huwa \'ahduk: ya abanat-tubawi: a\'adta lana jasada Mar-Murqus: wa \'amilta el-Mayroon el-muqaddas\\n\\nMaryam walidat el-ilah: zaharat bi-i\'jubatin \'azima: ma\'a hamamin wa bakhoor: fi kanisatiha biz-Zaytoun\\n\\nBanayta katedra\'iyyatan jadida: wad-dayr el-\'azeem li-Mar-Mina: wa kana\'isan kathira: amma qalbuka lam yastakbir mutlaqan\\n\\nTa\'awwadta el-qiyama waqtas-sahar: fi quwwatika wa fi amradik: li-tusabbiha ma\'al-mala\'ika: wa ma\'al-qiddiseen ahibba\'ik\\n\\nWal-an uzkurna: amama ilahina: li-yukammilana mithlak: fil-mahabba fil-eeman\\n\\nUtlub minar-Rabb \'anna: ya abanal-qiddis el-batriyark: el-Anba Kirillos es-sadis: li-yaghfir lana khatayana',
        },
        {
          language: 'arabic',
          text: 'البابا كيرلس السادس: الطوباوي بالحقيقة: الذي ثبتنا في الإيمان: الأرثوذكسي الحقيقي\\n\\nيا إسمك هو فخر إسمك: أيها الراهب الطاهر: والمتوحد القوي: صديق السواح\\n\\nمن أجل هذا صرت لنا: قدوة في الكلام: في المحبة في التصرف: في الطهارة في الإيمان\\n\\nالسلام لمحب أولاده: الذي شفى المرضى: وتنبأ بالعظائم: وأخرج الشياطين\\n\\nمبارك هو عهدك: يا أبانا الطوباوي: أعدت لنا جسد مارمرقس: وعملت الميرون المقدس\\n\\nمريم والدة الإله: ظهرت بإعجوبة عظيمة: مع حمام وبخور: في كنيستها بالزيتون\\n\\nبنيت كاتدرائية جديدة: والدير العظيم لمارمينا: وكنائس كثيرة: أمّا قلبك لم يستكبر مطلقًا\\n\\nتعودت القيام وقت السحر: في قوّتك وفي أمراضك: لتسبّح مع الملائكة: ومع القديسين أحبائك\\n\\nوالآن أذكرنا: أمام إلهنا: ليكملنا مثلك: في المحبة في الإيمان\\n\\nأطلب من الرب عنا: يا أبانا القديس البطريرك: الانبا كيرلس السادس: ليغفر لنا خطايانا',
        },
      ],
    },
    {
      id: 'annual-matins-doxology-patriarch-bishop',
      title: 'Ⲁⲕϭⲓ Ⲧ̀ⲭⲁⲣⲓⲥ (Doxology for the Patriarch or Bishop)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲁⲕϭⲓ Ⲧ̀ⲭⲁⲣⲓⲥ Ⲙ̀Ⲙⲱⲩⲥⲏⲥ: Ϯⲙⲉⲧⲟⲩⲏⲃ Ⲛ̀ⲧⲉ Ⲙⲉⲗⲭⲓⲥⲉⲇⲉⲕ: Ⲁⲕϭⲓ Ⲙ̀ⲡⲁⲓⲟ Ⲙ̀ⲡⲉⲛⲓⲱⲧ Ⲙⲁⲣⲕⲟⲥ: Ⲫⲏⲉ̀ⲧⲁϥϩⲓⲱⲓϣ ⲛⲁⲛ\\n\\nⲀ̀Ⲡ̀ⲭ̅ⲥ̅ ⲧⲁⲗⲟ Ⲛ̀ⲧⲉϥϫⲓϫ Ⲛ̀ⲟⲩⲓⲛⲁⲙ: ⲉ̀ϫⲉⲛ ⲧⲉⲕⲁ̀ⲫⲉ: Ⲁϥⲧⲉⲛϧⲟⲩⲧⲕ ⲉ̀ⲛⲓϣⲟϣⲧ: Ⲛ̀ⲧⲉ ϯⲙⲉⲧⲟⲩⲣⲟ Ⲛ̀ⲛⲓⲫⲏⲟⲩⲓ\\n\\nⲈⲑⲣⲉⲕϣⲱⲡⲓ Ⲛ̀ⲟⲩⲣⲉϥϣⲉⲙϣⲓ: ⲥⲁⲡ̀ϣⲱⲓ Ⲛ̀ϯⲉⲕⲕⲗⲏⲥⲓⲁ: ⲉⲑⲣⲉⲕⲁ̀ⲙⲟⲛⲓ Ⲙ̀ⲡⲉⲕⲗⲁⲟⲥ: ϧⲉⲛ ⲟⲩⲧⲟⲩⲃⲟ ⲛⲉⲙ ⲟⲩⲙⲉⲑⲙⲏⲓ\\n\\nⲔⲁⲧⲁ ⲫ̀ⲣⲏϯ ⲉ̀ⲧⲁϥϫⲟⲥ: Ⲛ̀ϫⲉ Ⲡⲁⲩⲗⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ϫⲉ ⲕⲁⲧⲁ ⲫ̀ⲣⲏϯ Ⲙ̀Ⲙⲉⲗⲭⲓⲥⲉⲇⲉⲕ: ⲡⲁⲓⲣⲏϯ ϩⲱϥ Ⲙ̀Ⲡ̀ⲭ̅ⲥ̅\\n\\nⲰ̀ⲥⲁⲩⲧⲱⲥ ⲧⲉⲛϯⲟⲥⲓ Ⲙ̀ⲙⲟⲕ: ⲛⲉⲙ ⲡⲓⲣⲉϥⲉⲣⲯⲁⲗⲓⲛ Ⲇⲁⲩⲓⲇ: ϫⲉ Ⲛ̀ⲑⲟⲕ ⲡⲉ ⲡⲓⲟⲩⲏⲃ ϣⲁ ⲉ̀ⲛⲉϩ: ⲕⲁⲧⲁ ϯⲧⲁⲝⲓⲥ Ⲙ̀Ⲙⲉⲗⲭⲓⲥⲉⲇⲉⲕ\\n\\nⲦⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ Ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ (…) Ⲡⲓⲁⲣⲭⲏⲉⲣⲉⲩⲥ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ\\n\\nⲦⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ Ⲛ̀ⲇⲓⲕⲉⲟⲥ: Ⲁⲃⲃⲁ (…) Ⲡⲓⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ (Ⲡⲓⲙⲏⲧ̀ⲣⲟⲡⲟⲗⲓⲧⲏⲥ): Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ',
        },
        {
          language: 'englishCoptic',
          text: 'Aktshi Etkharis Em-Mōusēs: Timetouēb Ente Melkhisedek: Aktshi Empaio Empeniōt Markos: Fē-etafhiōish nan\\n\\nA-Epkhristos talo Entefjij Enouinam: ejen tekafe: Aftenkhoutk enishosht: Ente timetouro Ennifēoui\\n\\nEthrekshōpi Enourefshemshi: sa-epshōi Entiekklēsia: ethrekamoni Empeklaos: khen outouvo nem oumethmēi\\n\\nKata efrēti etafjos: Enje Paulos pi-apostolos: je kata efrēti Em-Melkhisedek: pairēti hōf Em-Epkhristos\\n\\nŌsautōs tentiosi Emmok: nem pireferpsalin Dauid: je Enthok pe piouēb sha eneh: kata titaksis Em-Melkhisedek\\n\\nTōbh Em-Eptshois ekhrēi ejōn: Peniōt ethouab Empatriarkhēs: Papa Abba (…) Piarkhēereus: Entefkha nennovi nan evol\\n\\nTōbh Em-Eptshois ekhrēi ejōn: Peniōt ethouab Endikeos: Abba (…) Pi-episkopos (Pimē-etropolitēs): Entefkha nennovi nan evol',
        },
        {
          language: 'english',
          text: 'You received the grace of Moses: the priesthood of Melchizedek: you received honor from our father Mark: who preached to us\\n\\nChrist lifted His right hand: on your head: He gave you the keys: of the kingdom of heaven\\n\\nThat you may govern: over the church: and that you may shepherd your people: in purity and righteousness\\n\\nAs it was said: by Paul the Apostle: "As was Melchizedek: so also is Christ."\\n\\nLikewise we magnify You: with David the Psalmist: You are the priest forever: according to the order of Melchizedek\\n\\nPray to the Lord on our behalf: our holy father the patriarch: Pope Abba (...): that He may forgive us our sins\\n\\nPray to the Lord on our behalf: our holy righteous father: Abba (...) the bishop (metropolitan): that He may forgive us our sins',
        },
        {
          language: 'englishArabic',
          text: 'Akhadhta ni\'mata Musa: wa kahanoot Malaki-Sadiq: akhadhta karamatan min abina Murqus: ellazi bashsharana\\n\\nEl-Maseeh rafa\'a yadahul-yumna \'ala ra\'sik: a\'taka mafateeh malakoot es-sama\'\\n\\nLi-kay tasusa \'alal-kaneesa: wa tar\'a sha\'baka: bi-taharatin wa birr\\n\\nKama qala Boulos er-rasul: kama kana Malaki-Sadiq: hakaza aydan el-Maseeh\\n\\nKazalika nu\'azzimuk: ma\'al-murattil Dawood: qa\'ileen anta huwal-kahin ilal-abad: \'ala taqsi Malaki-Sadiq\\n\\nUtlub minar-Rabb \'anna: ya abanal-qiddis el-batriyark: Anba (...) ra\'is el-kahana: li-yaghfir lana khatayana\\n\\nFi hudur el-Ab el-usquf: Utlub minar-Rabb \'anna: ya abinal-qiddis el-barr: Anba (...) el-usquf (el-matran): li-yaghfir lana khatayana',
        },
        {
          language: 'arabic',
          text: 'أخذت نعمة موسى: وكهنوت ملكي صادق: أخذت كرامة من أبينا مرقس: الذي بشرنا\\n\\nالمسيح رفع يده اليمنى على رأسك: أعطاك مفاتيح ملكوت السماء\\n\\nلكي تسوس على الكنيسة: وترعى شعبك: بطهارة وبر\\n\\nكما قال بولس الرسول: كما كان ملكي صادق: هكذا أيضاً المسيح\\n\\nكذلك نعظمك: مع المرتل داود: قائلين أنت هو الكاهن إلى الأبد: على طقس ملكي صادق\\n\\nأطلب من الرب عنا: يا أبانا القديس البطريرك: أنبا (...) رئيس الكهنة: ليغفر لنا خطايانا\\n\\nفي حضور الآب الأسقف: أطلب من الرب عنا: يا أبينا القديس البار: أنبا (...) الأسقف (المطران): ليغفر لنا خطايانا',
        },
      ],
    },
    {
      id: 'annual-matins-doxology-conclusion',
      title: 'Ϣⲱⲡⲓ Ⲛ̀ⲑⲟ (The Conclusion of the Doxologies)',
      versions: [
        {
          language: 'coptic',
          text: 'Ϣⲱⲡⲓ Ⲛ̀ⲑⲟ ⲉ̀ⲣⲉ ⲥⲟⲙⲥ ⲉ̀ϫⲱⲛ: ϧⲉⲛ ⲛⲓⲙⲁ ⲉⲧϭⲟⲥⲓ ⲉ̀ⲧⲉⲣⲉ ⲭⲏ Ⲛ̀ϧⲏⲧⲟⲩ: ⲱ̀ Ⲧⲉⲛⲟ̅ⲥ̅ Ⲛ̀ⲛⲏⲃ ⲧⲏⲣⲉⲛ: Ϯⲑⲉⲟⲧⲟⲕⲟⲥ ⲉⲧⲟⲓ Ⲙ̀ⲡⲁⲣⲑⲉⲛⲟⲥ Ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ\\n\\nⲘⲁⲧϩⲟ Ⲙ̀Ⲫⲏ ⲉ̀ⲧⲁⲣⲉⲙⲁⲥϥ: Ⲡⲉⲛⲥⲱⲧⲏⲣ Ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: Ⲛ̀ⲧⲉϥⲱ̀ⲗⲓ Ⲛ̀ⲛⲁⲓϧⲓⲥⲓ ⲉ̀ⲃⲟⲗϧⲁⲣⲟⲛ: Ⲛ̀ⲧⲉϥⲥⲉⲙⲛⲓ ⲛⲁⲛ Ⲛ̀ⲧⲉϥϩⲓⲣⲏⲛⲏ\\n\\nⲬⲉⲣⲉ ⲛⲉ ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: Ϯⲟⲩⲣⲱ Ⲙ̀ⲙⲏⲓ Ⲛ̀ⲁⲗⲏⲑⲓⲛⲏ: ⲭⲉⲣⲉ Ⲡ̀ϣⲟⲩϣⲟⲩ Ⲛ̀ⲧⲉ ⲡⲉⲛⲅⲉⲛⲟⲥ: ⲁⲣⲉⲭ̀ⲫⲟ ⲛⲁⲛ Ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ\\n\\nⲦⲉⲛⲧϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ',
        },
        {
          language: 'englishCoptic',
          text: 'Shōpi Entho ere soms ejōn: khen nima ettshosi etere khē Enkhētou: ō Tentshois Ennēb tēren: Titheotokos etoi Emparthenos Ensēou niven\\n\\nMatho Em-Fē etaremasf: Pensōtēr Enagathos: Entefōli Ennaikhisi evolkharon: Entefsemni nan Entefhirēnē\\n\\nKhere ne ō Tiparthenos: Tiourō Emmēi Enalēthinē: khere Epshoushou Ente pengenos: are-ekhfo nan En-Emmanouēl\\n\\nTentho arepenmeui: ō Ti-eprostatēs etenhot: nahren Pentshois Iēsous Pikhristos: Entefkha nennovi nan evol',
        },
        {
          language: 'english',
          text: 'Watch over us, from on high where you dwell: O Lady of us all: the ever-virgin Theotokos\\n\\nAsk of Him whom you have borne, our good Savior: to take away our troubles: and grant us His peace\\n\\nHail to you O Virgin, the right and true Queen: Hail to the pride of our race: who bore to us Emmanuel\\n\\nWe ask you to remember us, O our faithful advocate: before our Lord Jesus Christ: that He may forgive us our sins',
        },
        {
          language: 'englishArabic',
          text: 'Kooni anti nazirah, \'alayna fil-mawadi\' el-\'aliya elleti anti ka\'ina feeha: ya sayyidatana kullana: walidat el-ilah el-\'azra\' kulla heen\\n\\nIs\'ali ellazi walidtihi, mukhallisuna es-salih: an yarfa\'a \'anna hazihil-at\'ab: wa yuqarrira lana salamahu\\n\\nEs-salamu laki ayyatuha el-\'adhra\', el-malika el-haqiqiya el-haqqaniya: es-salamu li-fakhri jinsina: waladti lana Emmanuel\\n\\nNas\'aluki an tadhkureena, ayyatuha esh-shafi\'a el-mu\'tamana: amama Rabbina Yasu\' el-Maseeh: li-yaghfira lana khatayana',
        },
        {
          language: 'arabic',
          text: 'كونى أنتِ ناظرة، علينا فى المواضع العالية التى أنتِ كائنة فيها: يا سيدتنا كلنا: والدة الإله العذراء كل حين\\n\\nإسألى الذى ولدته، مخلصنا الصالح: أن يرفع عنا هذه الأتعاب: ويقرر لنا سلامه\\n\\nالسلام لك أيتها العذراء، الملكة الحقيقية الحقانية: السلام لفخر جنسنا: ولدت لنا عمانوئيل\\n\\nنسألك أن تذكرينا، أيتها الشفيعة المؤتمنة: أمام ربنا يسوع المسيح: ليغفر لنا خطايانا',
        },
      ],
    },    {
      id: 'annual-matins-psalm-trailer',
      title: 'Ⲫ̀ϯ ⲉϥⲉ̀ϣⲉⲛϩⲏⲧ (Psalm Trailer)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲫ̀ϯ ⲉϥⲉ̀ϣⲉⲛϩⲏⲧ ϧⲁⲣⲟⲛ ⲉϥⲉ̀ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲛ: ⲉϥⲉ̀ⲟⲩⲱⲛϩ Ⲙ̀ⲡⲉϥϩⲟ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ ⲟⲩⲟϩ ⲉϥⲉ̀ⲛⲁⲓ ⲛⲁⲛ\\n\\nⲈ̀ⲡ̀ϫⲓⲛⲥⲟⲩⲉⲛ Ⲙ̀ⲡⲉⲕⲙⲱⲓⲧ ϩⲓϫⲉⲛ ⲡ̀ⲕⲁϩⲓ: ⲛⲉⲙ ⲡⲉⲕⲟⲩϫⲁⲓ ϧⲉⲛ ⲛⲓⲉⲑⲛⲟⲥ ⲧⲏⲣⲟⲩ',
        },
        {
          language: 'englishCoptic',
          text: 'Efnouti efeshenhēt kharon efe-esmou eron: efeouōnh Empefho ekhrēi ejōn ouoh efenai nan\\n\\nE-epjinsouen Empekmōit hijen epkahi: nem pekoujai khen niethnos tērou',
        },
        {
          language: 'english',
          text: 'God shall pity us, and bless us: and reveal His face upon us and have mercy on us;\\n\\nthat Your way may be known on the earth: Your salvation among all nations.',
        },
        {
          language: 'englishArabic',
          text: 'Li-yatara\'afi-llahu \'alayna wal-yubarikna: wal-yudi\' bi-wajhihi \'alayna\\n\\nLi-kay yu\'rafa fil-ardi tareequk: wa yabayyana bayna jami\'il-umami khalasuk',
        },
        {
          language: 'arabic',
          text: 'لِيَتَرَّأفِ اللهُ عَلَيْنَا وَلْيُبَارِكْنَا: وَلْيُضِيءْ بِوَجْهِهِ عَلَيْنَا\\n\\nلِكَيْ يُعْرَفَ فِي الأَرْضِ طَرِيقُكَ: وَ يَبَيْنَ جَمِيعِ الأُمَمِ خَلاَصُكَ',
        },
      ],
    },
    {
      id: 'annual-matins-psalm-trailer-pope-bishop',
      title: 'Ⲙⲁⲣⲟⲩϭⲁⲥϥ (Psalm Trailer for the Pope or a Bishop)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲙⲁⲣⲟⲩϭⲁⲥϥ ϧⲉⲛ ϯⲉⲕⲕⲗⲏⲥⲓⲁ Ⲛ̀ⲧⲉ ⲡⲉϥⲗⲁⲟⲥ\\n\\nⲞⲩⲟϩ ⲙⲁⲣⲟⲩⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϩⲓ ⲧ̀ⲕⲁⲑⲉⲇⲣⲁ Ⲛ̀ⲧⲉ ⲛⲓⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ\\n\\nϫⲉ ⲁϥⲭⲱ Ⲛ̀ⲟⲩⲙⲉⲧⲓⲱⲧ Ⲙ̀ⲫ̀ⲣⲏϯ Ⲛ̀ϩⲁⲛⲉⲥⲱⲟⲩ\\n\\nⲈⲩⲉ̀ⲛⲁⲩ Ⲛ̀ϫⲉ ⲛⲏⲉⲧⲥⲟⲩⲧⲱⲛ ⲟⲩⲟϩ ⲉⲩⲉ̀ⲟⲩⲛⲟϥ\\n\\nⲀϥⲱⲣⲕ Ⲛ̀ϫⲉ Ⲡ̀ϭⲟⲓⲥ ⲟⲩⲟϩ Ⲛ̀ⲛⲉϥⲟⲩⲱⲙ Ⲛ̀ϧⲏⲧϥ\\n\\nϫⲉ Ⲛ̀ⲑⲟⲕ ⲡⲉ Ⲫⲟⲩⲏⲃ ϣⲁ ⲉ̀ⲛⲉϩ ⲕⲁⲧⲁ ϯⲧⲁⲝⲓⲥ Ⲙ̀Ⲙⲉⲗⲭⲓⲥⲉⲇⲉⲕ\\n\\nⲠ̀ϭⲟⲓⲥ ⲥⲁⲟⲩⲓⲛⲁⲙ Ⲙ̀ⲙⲟⲕ Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ Ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ (…)\\n\\nⲚⲉⲙ ⲡⲉⲛⲓⲱⲧ Ⲛ̀ⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ (Ⲙ̀ⲙⲏⲧ̀ⲣⲟⲡⲟⲗⲓⲧⲏⲥ) Ⲁⲃⲃⲁ (…)\\n\\nⲠ̀ϭⲟⲓⲥ ⲉϥⲉ̀ⲁⲣⲉϩ ⲉ̀ⲧⲉⲕⲙⲉⲧⲱⲛϧ (ⲉ̀ⲡⲉⲧⲉⲛⲱⲛϧ) Ⲁ̀ⲗ̅',
        },
        {
          language: 'englishCoptic',
          text: 'Maroutshasf khen tiekklēsia Ente peflaos\\n\\nOuoh marou-esmou erof hi etkathedra Ente ni-epresvuteros\\n\\nje afkhō Enoumetiōt Emefrēti Enhanesōou\\n\\nEu-enau Enje nēetsoutōn ouoh eu-eounof\\n\\nAfōrk Enje Eptshois ouoh Ennefouōm Enkhētf\\n\\nje Enthok pe Fouēb sha eneh kata titaksis Em-Melkhisedek\\n\\nEptshois saouinam Emmok Peniōt ethouab Empatriarkhēs Papa Abba (…)\\n\\nNem peniōt Enepiskopos (Emmē-etropolitēs) Abba (…)\\n\\nEptshois efeareh etekmetōnkh (epetenōnkh) Allēlouia',
        },
        {
          language: 'english',
          text: 'Let them exalt Him in the church of His people,\\n\\nand praise Him in the seat of the elders\\n\\nfor He has made His families like a flock of sheep\\n\\nthe upright shall see and rejoice\\n\\nThe Lord has sworn and will have no regret,\\n\\n"You are a priest forever, after the order of Melchizedek."\\n\\nThe Lord is at your right hand, our saintly father, the patriarch, Pope Abba (...)\\n\\nand our father the bishop (metropolitan), Abba (...).\\n\\nMay the Lord keep your life (lives). Alleluia.',
        },
        {
          language: 'englishArabic',
          text: 'Fal-yarfa\'ouhu fi kanisati sha\'bih.\\n\\nWal-yubarikoohu \'ala manabir esh-shuyookh.\\n\\nLi-annahu ja\'ala abwatahu mithla el-kharaf.\\n\\nYubsirul-mustaqeemoona wa yafrahoon.\\n\\nAqsama er-Rabbu wa lan yandam,\\n\\nAnta huwal-kahinu ilal-abadi \'ala rutbati Malaki-Sadiq.\\n\\nEr-Rabbu \'an yameenik ya abanal-qiddis el-batriyark el-Anba (...)\\n\\nWa abinal-usquf (el-matran) el-Anba (...).\\n\\nEr-Rabbu yahfazu hayatakuma. Halleluia.',
        },
        {
          language: 'arabic',
          text: 'فليرفعوه في كنيسةِ شعبِه\\n\\nولْيبارِكوه على منابرِ الشيوخِ\\n\\nلأنه جَعَلَ ابوة مثل الخراف\\n\\nيُبْصِرُ المستقيمون ويفرحون\\n\\nأقسم الربُ ولن يندم،\\n\\nأنتَ هو الكاهن إلى الأبدِ على رتبةِ ملكي صادق.\\n\\nالرب عن يمينِك يا أبانا القديس البطريرك الأنبا (...)\\n\\nوأبينا الأسقف (المطران) الأنبا (...).\\n\\nالرب يحفظ حياتَكما. هلليلويا.',
        },
      ],
    },
    {
      id: 'annual-matins-gospel-response',
      title: 'Ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ (Gospel Response)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ Ⲙ̀Ⲡⲉⲛⲥⲱⲧⲏⲣ: Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ Ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ϫⲉ Ⲛ̀ⲑⲟϥ ⲁϥϣⲉⲛϩⲏⲧ ϧⲁⲣⲟⲛ: ⲁϥⲓ̀ ⲟⲩⲟϩ ⲁϥⲥⲱϯ Ⲙ̀ⲙⲟⲛ\\n\\nⲀ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲧⲉⲛϭⲟⲓⲥ Ⲛ̀ⲛⲏⲃ ⲧⲏⲣⲉⲛ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: Ⲙⲁⲣⲓⲁ Ⲑⲙⲁⲩ Ⲙ̀Ⲡⲉⲛⲥⲱⲧⲏⲣ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ\\n\\nⲦⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ Ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ\\n\\nϪⲉ Ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ Ⲛ̀ϫⲉ Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: Ϯⲧ̀ⲣⲓⲁⲥ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲧⲉⲛⲟⲩⲱϣⲧ Ⲙ̀ⲙⲟⲥ ⲧⲉⲛϯⲱ̀ⲟⲩ ⲛⲁⲥ',
        },
        {
          language: 'englishCoptic',
          text: 'Marenouōsht Em-Pensōtēr: Pimairōmi Enagathos: je Enthof afshenhēt kharon: afi ouoh afsōti Emmon\\n\\nAri-epresveuin ekhrēi ejōn: ō tentshois Ennēb tēren Tithe-otokos: Maria Thmau Em-Pensōtēr: Entefkha nennovi nan evol\\n\\nTōbh Em-Eptshois ekhrēi ejōn: ō pi-athloforos Emmarturos: Filopatēr Merkourios: Entefkha nennovi nan evol\\n\\nJe Efesmarōout Enje Efiōt nem Epshēri: nem Pi-epneuma ethouab: Ti-etrias etjēk evol: tenouōsht Emmos tenti-ōou nas',
        },
        {
          language: 'english',
          text: 'Let us worship our Savior: the good Lover of Mankind: for He had compassion on us: He has come and saved us\\n\\nIntercede on our behalf: O the Lady of us all the Theotokos: Mary the Mother of our Savior: that He may forgive us our sins\\n\\nPray to the Lord on our behalf, O struggle-bearer and martyr: Philopater Mercurius: that He may forgive us our sins\\n\\nBlessed be the Father and the Son: and the Holy Spirit: the perfect Trinity: We worship Him and glorify Him',
        },
        {
          language: 'englishArabic',
          text: 'Fal-nasjuda li-mukhallisina: muhibb el-bashar es-salih: li-annahu tara\'afa \'alayna: ata wa khallasana\\n\\nIshfa\'i feena amam er-Rabb: ya sayyidatana kullana es-sayyida walidat el-ilah: Maryam umm mukhallisina: li-yaghfir lana khatayana\\n\\nUtlub minar-Rabb \'anna ayyuhash-shahid el-mujahid: muhibb el-Ab Merqoreyos: li-yaghfir lana khatayana\\n\\nLi-annahu mubarakun el-Ab wal-Ibn: war-Ruh el-Qudus: eth-thaloth el-kamil: nasjudu lahu wa numajjiduh',
        },
        {
          language: 'arabic',
          text: 'فلنسجد لمخلصنا: محب البشر الصالح: لأنه تراءف علينا: أتى وخلصنا\\n\\nإشفعي فينا أمام الرب: يا سيدتنا كلنا السيدة والدة الإله: مريم أم مخلصنا: ليغفر لنا خطايانا\\n\\nاطلب من الرب عنا أيها الشهيد المجاهد: محب الآب مرقوريوس: ليغفر لنا خطايانا\\n\\nلأنه مباركٌ الآب والابن: والروح القدس: الثالوث الكامل: نسجد له ونمجده',
        },
      ],
    },
  );
}

const annualLiturgy = seasons
  .find((s) => s.id === 'annual')
  ?.services.find((s) => s.id === 'annual-liturgy');

if (annualLiturgy) {

  
  annualLiturgy.hymns = [];

  annualLiturgy.hymns.push(
    { id: 'annual-liturgy-offering-header', title: 'Offering of the Lamb', versions: [], isSectionHeader: true },
    {
      id: 'annual-liturgy-offering-blessed-are-you',
      title: 'Ⲕ̀ⲥⲙⲁⲣⲱⲟⲩⲧ (Blessed Are You)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲕ̀ⲥⲙⲁⲣⲱⲟⲩⲧ ⲁ̀ⲗⲏⲑⲱⲥ, ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ Ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ, ⲛⲉⲙ ⲠⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ, ϫⲉ ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ Ⲙ̀ⲙⲟⲛ.\\n\\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ Ⲛ̀ⲧⲉ ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ Ⲛ̀ⲁⲣⲭⲏⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ Ⲁⲃⲃⲁ (ⲛⲓⲙ), Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϧ̀ⲙⲟⲧ ⲛⲁⲛ, Ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ Ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\\n\\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ Ⲛ̀ⲧⲉ ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ Ⲛ̀ⲁⲣⲭⲏⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ Ⲁⲃⲃⲁ (ⲛⲓⲙ) ⲛⲉⲙ ⲡⲉⲛⲓⲱⲧ Ⲙ̀ⲙⲏⲧⲣⲟⲡⲟⲗⲓⲧⲏⲥ (Ⲛ̀ⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ) Ⲁⲃⲃⲁ (ⲛⲓⲙ), Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϧ̀ⲙⲟⲧ ⲛⲁⲛ, Ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ Ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.',
        },
        {
          language: 'englishCoptic',
          text: 'Eksmarōout alēthōs, nem Pekiōt Enagathos, nem Pi-Epneuma ethouab, je aki aksōti Emmon.\\n\\nHiten nieukhē Ente peniōt ettaiēout Enarkhē-ereus papa Abba (nim), Eptshois ari-ekhmot nan, Empikhō evol Ente nennovi.\\n\\nHiten nieukhē Ente peniōt ettaiēout Enarkhē-ereus papa Abba (nim) nem peniōt Emmētropolitēs (Enepiskopos) Abba (nim), Eptshois ari-ekhmot nan, Empikhō evol Ente nennovi.',
        },
        {
          language: 'english',
          text: 'Blessed are You indeed, with Your good Father, and the Holy Spirit, for You have come and saved us.\\n\\nThrough the prayers, of our honored father, the archpriest, Papa Abba (...), O Lord grant us the forgiveness of our sins.\\n\\nThrough the prayers, of our honored father, the archpriest, Papa Abba (...) and the honored Metropolitan Abba (...), O Lord, grant us the forgiveness of our sins.',
        },
        {
          language: 'englishArabic',
          text: 'Mubarakun an ta bil-haqiqati, ma\'a abika es-salih, war-Ruh el-Qudus, li\'annaka atayta wa khallastana.\\n\\nBi-salawati abina el-mukarram, ra\'is el-kahana el-baba el-Anba (...), ya Rabbu an\'im lana, bi-maghfirati khatayana.\\n\\nBi-salawati abina el-mukarram, ra\'is el-kahana el-baba el-Anba (...), wa abina el-matran el-Anba (...), ya Rabbu an\'im lana bi-maghfirati khatayana.',
        },
        {
          language: 'arabic',
          text: 'مبارك أنت بالحقيقة، مع أبيك الصالح، والروح القدس، لأنك أتيتَ وخلصتنا.\\n\\nبصلوات أبينا المكرم، رئيس الكهنة البابا الأنبا (...)، يا رب أنعم لنا، بمغفرة خطايانا.\\n\\nبصلوات أبينا المكرم، رئيس الكهنة البابا الأنبا (...)، وأبينا المطران الأنبا (...)، يا رب أنعم لنا بمغفرة خطايانا.',
        },
      ],
    },
    {
      id: 'annual-liturgy-offering-hymn-of-blessing',
      title: 'Ⲧⲉⲛⲟⲩⲱϣⲧ (Hymn of Blessing)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲧⲉⲛⲟⲩⲱϣⲧ Ⲙ̀Ⲫⲓⲱⲧ Ⲛ̀ⲧⲉ ⲡⲓⲟⲩⲱⲓⲛⲓ, ⲛⲉⲙ Ⲡⲉϥϣⲏⲣⲓ Ⲙ̀ⲙⲟⲛⲟⲅⲉⲛⲏⲥ, ⲛⲉⲙ ⲠⲓⲠ̀ⲛⲉⲩⲙⲁ Ⲙ̀ⲡⲁⲣⲁⲕⲗⲏⲧⲟⲛ, Ϯⲧ̀ⲣⲓⲁⲥ Ⲛ̀ⲟⲙⲟⲟⲩⲥⲓⲟⲥ.',
        },
        {
          language: 'englishCoptic',
          text: 'Tenouōsht Em-Fiōt Ente piouōini, nem Pefshēri Emmonogenēs, nem Pi-Epneuma Emparaklēton, Ti-etrias Enomoousios.',
        },
        {
          language: 'english',
          text: 'We worship the Father of Light, and His only-begotten Son, and the Spirit, the Paraclete; the Trinity, one in essence.',
        },
        {
          language: 'englishArabic',
          text: 'Nasjudu li-Abin-nour, wa Ibnihil-wahid, war-Ruhil-Mu\'azzi, eth-thalouth el-musawi.',
        },
        {
          language: 'arabic',
          text: 'نسجدُ لآبِ النور، وإبنِهِ الوحيد، والروحِ المعزي، الثالوثِ المساوي.',
        },
      ],
    },
    {
      id: 'annual-liturgy-offering-hail-to-mary',
      title: 'Ⲭⲉⲣⲉ Ⲙⲁⲣⲓⲁ (Hail to Mary)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲭⲉⲣⲉ Ⲙⲁⲣⲓⲁ ϯⲟⲩⲣⲱ, Ϯⲃⲱ Ⲛ̀ⲁ̀ⲗⲟⲗⲓ Ⲛ̀ⲁⲧⲉⲣϩⲉⲗⲗⲟ, ⲑⲏ̀ⲉⲧⲉ Ⲙ̀ⲡⲉ ⲟⲩⲱⲓ ⲉⲣⲟⲩⲱ ⲉ̀ⲣⲟⲥ, ⲁⲩϫⲉⲙ Ⲡⲓⲥⲙⲁϩ Ⲛ̀ⲧⲉ Ⲡ̀ⲱⲛϧ Ⲛ̀ϧⲏⲧⲥ.\\n\\nⲠ̀ϣⲏⲣⲓ Ⲙ̀Ⲫ̀ⲛⲟⲩϯ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ, ⲁϥϭⲓⲥⲁⲣⲝ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ, ⲁⲥⲙⲓⲥⲓ Ⲙ̀ⲙⲟϥ ⲁϥⲥⲱϯ Ⲙ̀ⲙⲟⲛ, ⲁϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\\n\\nⲀⲣⲉϫⲉⲙ ⲟⲩϩ̀ⲙⲟⲧ ⲱ̀ ϯϣⲉⲗⲉⲧ, ϩⲁⲛⲙⲏϣ ⲁⲩⲥⲁϫⲓ ⲉ̀ⲡⲉⲧⲁⲓⲟ̀, ϫⲉ ⲁ̀ⲡⲓⲗⲟⲅⲟⲥ Ⲛ̀ⲧⲉ Ⲫ̀ⲓⲱⲧ ⲓ̀, ⲁϥϭⲓⲥⲁⲣⲝ ⲉ̀ⲃⲟⲗ Ⲛ̀ϧⲏϯ.\\n\\nⲚⲓⲙ Ⲛ̀ⲥ̀ϩⲓⲙⲓ ⲉⲧ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ, ⲁⲥⲉⲣⲙⲁⲩ Ⲙ̀Ⲫ̀ⲛⲟⲩϯ ⲉ̀ⲃⲏⲗ ⲉ̀ⲣⲟ, ϫⲉ Ⲛ̀ⲑⲟ ⲟⲩⲥ̀ϩⲓⲙⲓ Ⲛ̀ⲣⲉⲙⲛ̀ⲕⲁϩⲓ, ⲁ̀ⲣⲉⲉⲣⲙⲁⲩ Ⲙ̀ⲡⲓⲣⲉϥⲥⲱⲛⲧ.\\n\\nⲀ̀ⲟⲩⲙⲏϣ Ⲛ̀ⲥ̀ϩⲓⲙⲓ ϭⲓⲧⲁⲓⲟ̀, ⲁⲩϣⲁϣⲛⲓ ⲉ̀ⲧⲙⲉⲧⲟⲩⲣⲟ, ⲁⲗⲗⲁ Ⲙ̀ⲡⲟⲩϣⲟϧ ⲉ̀ⲡⲉⲧⲁⲓⲟ̀, ⲑⲏ̀ⲉⲑⲛⲉⲥⲱⲥ ϧⲉⲛ ⲛⲓⲥ̀ϩⲓⲟⲙⲓ.\\n\\nⲚ̀ⲑⲟ ⲅⲁⲣ ⲡⲉ ⲡⲓⲡⲩⲣⲅⲟⲥ ⲉⲧϭⲟⲥⲓ, ⲉ̀ⲧⲁⲩϫⲉⲙ Ⲡⲓⲁ̀ⲛⲁⲙⲏⲓ Ⲛ̀ϧⲏⲧϥ, ⲉ̀ⲧⲉ Ⲫⲁⲓ ⲡⲉ Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ, ⲉ̀ⲧⲁϥⲓ̀ ⲁϥϣⲱⲡⲓ ϧⲉⲛ ⲧⲉⲛⲉϫⲓ.\\n\\nⲘⲁⲣⲉⲛⲧⲁⲓⲟ̀ Ⲛ̀ϯⲡⲁⲣⲑⲉⲛⲓⲁ, Ⲛ̀ⲧⲉ ϯϣⲉⲗⲉⲧ Ⲛ̀ⲁⲧⲕⲁⲕⲓⲁ, Ϯⲕⲁⲑⲁⲣⲟⲥ Ⲙ̀ⲡⲁⲛⲁⲅⲓⲁ, Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ Ⲙⲁⲣⲓⲁ.\\n\\nⲀⲣⲉϭⲓⲥⲓ ⲉ̀ϩⲟⲧⲉ ⲧ̀ⲫⲉ, ⲧⲉⲧⲁⲓⲏⲟⲩⲧ ⲉ̀ϩⲟⲧⲉ ⲡ̀ⲕⲁϩⲓ, ⲛⲉⲙ ⲥⲱⲛⲧ ⲛⲓⲃⲉⲛ ⲉ̀ⲧⲉ Ⲛ̀ϧⲏⲧϥ, ϫⲉ ⲁⲣⲉⲉⲣⲙⲁⲩ Ⲙ̀ⲡⲓⲣⲉϥⲥⲱⲛⲧ.\\n\\nⲚ̀ⲑⲟ ⲅⲁⲣ ⲁ̀ⲗⲏⲑⲱⲥ, ⲡⲓⲙⲁ Ⲛ̀ϣⲉⲗⲉⲧ Ⲛ̀ⲕⲁⲑⲁⲣⲟⲥ, Ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ⲡⲓⲛ̀ⲩⲙⲫⲓⲟⲥ, ⲕⲁⲧⲁ ⲛⲓⲥⲙⲏ Ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ.\\n\\nⲀ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ, ⲱ̀ ⲧⲉⲛϭⲟⲓⲥ Ⲛ̀ⲛⲏⲃ ⲧⲏⲣⲉⲛ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ, Ⲙⲁⲣⲓⲁ Ⲑⲙⲁⲩ Ⲙ̀Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ, Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
        },
        {
          language: 'englishCoptic',
          text: 'Khere Maria tiourō, Tivō Enaloli Enaterhello, thēete Empe ouōi erouō eros, aujem Pismah Ente Epōnkh Enkhēts.\\n\\nEpshēri Em-Efnouti khen oumethmēi, aftshisarks khen Tiparthenos, asmisi Emmof afsōti Emmon, afkha nennovi nan evol.\\n\\nArejem ou-ehmot ō tishelet, hanmēsh ausaji epetai-o, je apilogos Ente Efiōt i, aftshisarks evol Enkhēti.\\n\\nNim Eneshimi et hijen pikahi, asermau Em-Efnouti evēl ero, je Entho ou-eshimi Enremenkahi, areermau Empirefsōnt.\\n\\nAoumēsh Eneshimi tshitai-o, aushashni etmetouro, alla Empoushokh epetai-o, thēethnesōs khen ni-eshiomi.\\n\\nEntho gar pe pipurgos ettshosi, etaujem Pi-anamēi Enkhētf, ete Fai pe Emmanouēl, etafi afshōpi khen teneji.\\n\\nMarentai-o Entiparthenia, Ente tishelet Enatkakia, Tikatharos Empanagia, Tithe-otokos Maria.\\n\\nAretshisi ehote etfe, tetaiēout ehote epkahi, nem sōnt niven ete Enkhētf, je areermau Empirefsōnt.\\n\\nEntho gar alēthōs, pima Enshelet Enkatharos, Ente Pi-ekhristos pi-enumfios, kata nismē Emeprofētikon.\\n\\nAri-epresveuin ekhrēi ejōn, ō tentshois Ennēb tēren Tithe-otokos, Maria Thmau Em-Pi-ekhristos, Entefkha nennovi nan evol.',
        },
        {
          language: 'english',
          text: 'Hail to Mary the queen, the unbarren vine that no farmer toiled. In her is found the Cluster of Life.\\n\\nThe Son of God is truly incarnate from the Virgin. She bore Him; He saved us and forgave us our sins.\\n\\nYou found grace, O Bride. Many spoke of your honor, for the Logos of the Father came and was incarnate of you.\\n\\nWhat woman on earth became Mother of God but you? For while you are a woman of the earth, you became the mother of the Creator.\\n\\nMany women received honor and gained the kingdom, but they did not reach your honor, O you, the fair among women.\\n\\nYou are the high tower in which the treasure was found, which is Emmanuel, who came and dwelt in your womb.\\n\\nLet us honor the virginity of the bride, who is without malice, pure, all-holy - the Theotokos Mary.\\n\\nYou are exalted more than heaven; you are honored more than earth and all creation therein, for you became the mother of the Creator.\\n\\nTruly, you are the pure bridal chamber which belongs to Christ the bridegroom, according to the voice of the prophets.\\n\\nIntercede on our behalf, O Lady of us all, the Theotokos, Mary, the mother of Jesus Christ, that He may forgive us our sins.',
        },
        {
          language: 'englishArabic',
          text: 'Es-salamu li-Maryam el-malika, el-karma ghayr esh-shamikha elleti lam yaflahha fallah, wa wujida feeha \'unqoudul-hayah.\\n\\nIbnullahi bil-haqiqati tajassada minal-\'adhra\', wa waladathu wa khallasana wa ghafara lana khatayana.\\n\\nWajadti ni\'matan ya hazihil-\'arous, kathiroun nataqou bi-karamatik li\'anna kalimatal-Abi ata wa tajassada minki.\\n\\nAyyatu imra\'atin \'alal-ard sarat umman lillahi siwaki, li\'annaki imra\'atun ardiyyatun sirti umman lil-Bari.\\n\\nNisa\'un kathiratun nilna karamatin wa fizna bil-malakout, lakin lam yablughna karamatik, ayyatuhal-hasanatu fin-nisa\'.\\n\\nAnti hiyal-burjul-\'ali allazi wajadou fihil-jawhar, ay \'Immanuil, allazi ata wa halla fi batniki.\\n\\nFal-nukarrim betoulieyata el-\'arous, elleti bi-ghayri sharrin, en-naqiyyata el-kulliyyata el-qudus, walidatal-ilahi Maryam.\\n\\nIrtafa\'ti akthara minas-sama\', wa anti akramu minal-ard wa kullil-makhlouqati elleti fiha, li\'annaki sirti umman lil-Khaliq.\\n\\nAnti bil-haqiqati el-khidrun-naqi allazi lil-Maseehi el-khatan, kal-aswatin-nabawiyya.\\n\\nIshfa\'i feena ya sayyidatana kullana es-sayyidata walidatal-ilah, Maryam umma Yasu\'al-Maseeh, li-yaghfir lana khatayana.',
        },
        {
          language: 'arabic',
          text: 'السلام لمريم الملكة، الكرمة غير الشامخة التي لم يفلحها فلاح، ووُجِدَ فيها عنقودُ الحياةِ.\\n\\nإبن الله بالحقيقة تجسدَ من العذراءِ، ولدته وخلصنا وغفر لنا خطايانا.\\n\\nوجدتِ نعمةً يا هذه العروس، كثيرون نطقوا بكرامتك لأن كلمة الآب أتى وتجسد منكِ.\\n\\nأية إمرأة على الارض صارت أماً لله سواكِ، لأنكِ إمرأة أرضية صرتِ أماً للباري.\\n\\nنساء كثيرات نلنَ كرامات وفزنَ بالملكوت، لكن لم يبلغنَ كرامَتكِ أيتها الحسنة في النساء.\\n\\nأنت هي البرج العالي الذي وجدوا فيه الجوهر، أي عمانوئيل الذي أتى وحلَّ في بطنِكِ.\\n\\nفلنكرم بتولية العروس، التي بغير شر، النقية الكلية القدس، والدة الاله مريم.\\n\\nإرتفعتِ أكثر من السماء، وأنتِ أكرم من الأرض، وكل المخلوقات التي فيها، لانك صرت أماً للخالق.\\n\\nأنتِ بالحقيقة الخدر النقي، الذي للمسيح الختن، كالأصوات النبوية.\\n\\nإشفعي فينا يا سيدتنا كلنا، السيدة والدة الإله، مريم أم يسوع المسيح، ليغفر لنا خطايانا.',
        },
      ],
    },
    {
      id: 'annual-liturgy-offering-the-time-has-come',
      title: 'Ⲁ̀ ⲡⲓⲛⲁⲩ ϣⲱⲡⲓ (The Time Has Come)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲁ̀ ⲡⲓⲛⲁⲩ ϣⲱⲡⲓ ⲭⲁ ⲛⲓⲙⲏϣ ⲉ̀ⲃⲟⲗ. Ⲙⲁⲣⲉ ⲛⲓⲥⲁϧ ⲫⲓⲣⲓ ⲉ̀ⲃⲟⲗ: ⲙⲁⲣⲉ ⲛⲓⲥⲟⲫⲟⲥ ⲑⲱⲟⲩϯ ϣⲁⲣⲟⲛ: ⲉⲩⲉⲣⲙⲏⲛⲉⲩⲓⲛ ϧⲉⲛ ⲛⲓⲅ̀ⲣⲁⲫⲏ ⲉⲑ̅ⲩ̅.\\n\\nⲈ̀ⲣⲉ ⲡⲓⲥ̀ⲙⲟⲩ ⲛ̀Ϯⲧ̀ⲣⲓⲁⲥ ⲉⲑ̅ⲩ̅: Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑ̅ⲩ̅.\\n\\nⲈ̀ⲣⲉ ⲡⲓⲥ̀ⲙⲟⲩ ⲛ̀ϮⲐⲉⲟ̀ⲧⲟⲕⲟⲥ: Ⲙⲁⲣⲓⲁ ⲑ̀ⲙⲁⲩ ⲛ̀Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅.\\n\\nⲈ̀ⲣⲉ ⲡⲓⲥ̀ⲙⲟⲩ...\\n\\nⲈϥⲉ̀ⲓ̀ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲉⲛ ⲡⲁⲓⲗⲁⲟⲥ ⲧⲏⲣϥ ⲉⲩⲟ̀ⲩϫⲁⲓ ϧⲉⲛ Ⲡ̀ⲟ̅ⲥ̅. Ϫⲉ ⲁ̀ⲙⲏⲛ ⲉⲥⲉ̀ϣⲱⲡⲓ.',
        },
        {
          language: 'englishCoptic',
          text: 'A pinau shōpi kha nimēsh evol. Mare nisakh firi evol: mare nisofos thōouti sharon: euermēneuin khen ni-egrafē ethouab.\\n\\nEre pi-esmou en-Ti-etrias ethouab: Fiōt nem Epshēri nem Pi-epneuma ethouab.\\n\\nEre pi-esmou en-Ti-The-otokos: Maria ethmau en-Iēsous Pikhristos.\\n\\nEre pi-esmou...\\n\\nEfe-i e-ehrēi ejen pailaos tērf eu-oujai khen Eptshois. Je amēn eseshōpi.',
        },
        {
          language: 'english',
          text: 'The time has come, dismiss the multitude, let teachers explain, let all wise-men gather unto us to explain the Holy Books.\\n\\nThe blessing of the Holy Trinity, the Father, the Son and the Holy Spirit.\\n\\nThe blessing of the Mother of God Mary the mother of Jesus Christ.\\n\\nThe blessing of...\\n\\nShall come upon this entire congregation for salvation by the Lord. Amen. So be it.',
        },
        {
          language: 'englishArabic',
          text: 'Qad hana el-waqt atliq el-gamee\'. Fal-yofassir el-mo\'allimoon, fal-yagtami\' el-hokama\' ilayna, mofassireen fil-kotob el-moqaddasa.\\n\\nWa barakat el-thalooth el-aqdas, el-Ab wal-Ibn wal-Rooh el-Qodos.\\n\\nWa barakat walidat el-Ilah Maryam omm Yasoo\' el-Maseeh.\\n\\nWa baraka...\\n\\nTahill \'ala hatha el-sha\'b kolloh mo\'afeen min el-Rab. Amin yakoon.',
        },
        {
          language: 'arabic',
          text: 'قد حان الوقت أطلق الجميع. فليفسر المعلمون، فليجتمع الحكماء إلينا، مفسرين في الكتب المقدسة.\\n\\nوبركة الثالوث الأقدس، الآب والابن والروح القدس.\\n\\nوبركة والدة الإله مريم أم يسوع المسيح.\\n\\nوبركة...\\n\\nتحل على هذا الشعب كله معافين من الرب. آمين يكون.',
        },
      ],
    },
    {
      id: 'annual-liturgy-offering-alleluia-thought-of-man',
      title: 'Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ Ϫⲉ ⲫ̀ⲙⲉⲩⲓ̀ (Alleluia, the Thought of Man)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ϫⲉ ⲫ̀ⲙⲉⲩⲓ̀ ⲛ̀ⲟ̀ⲩⲣⲱⲙⲓ ⲉϥⲉ̀ⲟ̀ⲩⲱ̀ⲛϩ ⲛⲁⲕ ⲉ̀ⲃⲟⲗ Ⲡ̀ⲟ̅ⲥ̅: ⲟⲩⲟϩ ⲡ̀ⲥⲱϫⲡ ⲛ̀ⲧⲉ ⲟ̀ⲩⲙⲉⲩⲓ̀ ⲉϥⲉ̀ⲉⲣϣⲁⲓ ⲛⲁⲕ. Ⲛⲓⲑⲩⲥⲓⲁ ⲛⲓⲡ̀ⲣⲟⲥⲫⲟⲣⲁ ϣⲟⲡⲟⲩ ⲉ̀ⲣⲟⲕ. Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.',
        },
        {
          language: 'englishCoptic',
          text: 'Allēlouia. Je efmeu-i enourōmi efe-ou-ōnh nak evol Eptshois: ouoh epsōjp ente oumeu-i efeershai nak. Nithusia ni-eprosfora shopou erok. Allēlouia.',
        },
        {
          language: 'english',
          text: 'Alleluia. The thought of man shall confess to You O Lord, and the remainder of thought shall keep a feast to You. The sacrifices and the offerings receive them to Yourself. Alleluia.',
        },
        {
          language: 'englishArabic',
          text: 'Hallelouia. Inna fikr el-insan ya\'tarif lak ya Rab, wa baqiyyat el-fikr to\'ayyid lak. El-thaba\'ih wal-qarabeen iqbalha ilayk. Hallelouia.',
        },
        {
          language: 'arabic',
          text: 'هلليلويا. إن فكر الإنسان يعترف لك يا رب، وبقية الفكر تعيد لك. الذبائح والقرابين اقبلها إليك. هلليلويا.',
        },
      ],
    },
    {
      id: 'annual-liturgy-offering-all-the-wise-men',
      title: 'Ⲛⲓⲥⲁⲃⲉⲩ ⲧⲏⲣⲟⲩ (All the Wise Men)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲛⲓⲥⲁⲃⲉⲩ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲉ ⲡⲒⲥⲣⲁⲏⲗ: ⲛⲏⲉ̀ⲧⲉ̀ⲣϩⲱⲃ ⲉ̀ⲛⲓⲕⲁⲡ ⲛ̀ⲛⲟⲩⲃ: ⲙⲁⲑⲁⲙⲓⲟ ⲛ̀ⲟⲩϣ̀ⲑⲏⲛ ⲛ̀Ⲁⲁⲣⲱⲛ ⲕⲁⲧⲁ ⲡ̀ⲧⲁⲓⲟ ⲛ̀ϯⲙⲉⲧⲟ̀ⲩⲏ̀ⲃ:\\n\\nⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁ̀ⲣⲭⲓⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (Ⲑⲉⲟ̀ⲇⲟⲣⲟⲥ): ⲡⲓⲙⲉⲛⲣⲓⲧ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ.',
        },
        {
          language: 'englishCoptic',
          text: 'Nisaveu tērou ente p-Israēl: nē-eterhōb enikap ennoub: mathamio enou-eshthēn en-Aarōn kata eptaio entimetou-ēb:\\n\\nempeniōt ettaiēout enarkhi-ereus papa abba (The-odoros): pimenrit ente Pi-ekhristos.',
        },
        {
          language: 'english',
          text: 'All the wise men of Israel, who craft threads of gold, make a garment of Aaron according to the honor of the priesthood of,\\n\\nour honored father, the high priest, Pope Abba (Tawadros), the beloved of Christ.',
        },
        {
          language: 'englishArabic',
          text: 'Ya kulla hukama\' Isra\'il, sunna\' khuyout ez-zahab, isna\'u thawban Harouniyyan la\'iqan bi-karamati kahanout,\\n\\nabina el-mukarram ra\'is el-kahana el-baba (Tawadros), habib el-Maseeh.',
        },
        {
          language: 'arabic',
          text: 'يا كل حكماء اسرائيل صناع خيوط الذهب، اصنعوا ثوباً هارونيا لائقا بكرامة كهنوت،\\n\\nأبينا المكرم رئيس الكهنة البابا (تواضروس)، حبيب المسيح.',
        },
      ],
    },
    {
      id: 'annual-liturgy-offering-sotis-amen',
      title: 'Ⲥⲱⲑⲓⲥ ⲁ̀ⲙⲏⲛ (Saved. Amen.)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲥⲱⲑⲓⲥ ⲁ̀ⲙⲏⲛ: ⲕⲉ ⲧⲱ ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲥⲟⲩ.',
        },
        {
          language: 'englishCoptic',
          text: 'Sōthis amēn: ke tō epneumati sou.',
        },
        {
          language: 'english',
          text: 'Saved. Amen. And with your spirit.',
        },
        {
          language: 'englishArabic',
          text: 'Khalasta haqqan: wa li-rohak.',
        },
        {
          language: 'arabic',
          text: 'خلصت حقا ولروحك.',
        },
      ],
    },
    {
      id: 'annual-liturgy-offering-golden-censer',
      title: 'Ⲧⲁⲓϣⲟⲩⲣⲏ (The Golden Censer)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲧⲁⲓϣⲟⲩⲣⲏ ⲛ̀ⲛⲟⲩⲃ ⲛ̀ⲕⲁⲑⲁⲣⲟⲥ ⲉⲧϥⲁⲓ ϧⲁ ⲡⲓⲁ̀ⲣⲱⲙⲁⲧⲁ: ⲉⲧϧⲉⲛ ⲛⲉⲛϫⲓϫ ⲛ̀Ⲁ̀ⲁⲣⲱⲛ ⲡⲓⲟ̀ⲩⲏⲃ ⲉϥⲧⲁⲗⲉ ⲟⲩⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ ⲉ̀ⲡ̀ϣⲱⲓ ⲉ̀ϫⲉⲛ ⲡⲓⲙⲁ ⲛ̀ⲉ̀ⲣϣⲱⲟ̀ⲩϣⲓ.',
        },
        {
          language: 'englishCoptic',
          text: 'Taishourē ennoub enkatharos etfai kha pi-arōmata: etkhen nenjij en-Aarōn pi-ouēb eftale ou-esthoinoufi e-epshōi ejen pima enershō-oushi.',
        },
        {
          language: 'english',
          text: 'This is the censer of pure gold bearing the aroma, in the hands of Aaron the priest, offering up incense on the altar.',
        },
        {
          language: 'englishArabic',
          text: 'Hazihi el-majmara ez-zahab en-naqi, el-hamila el-\'anbar, elleti fi yaday Haroun el-kahin, yarfa\' bukhouran fawqa el-mazbah.',
        },
        {
          language: 'arabic',
          text: 'هذه المجمرة الذهب النقي الحاملة العنبر، التي في يدي هرون الكاهن، يرفع بخوراً فوق المذبح.',
        },
      ],
    },
    {
      id: 'annual-liturgy-offering-golden-censer-virgin',
      title: 'Ϯϣⲟⲩⲣⲏ (The Golden Censer)',
      versions: [
        {
          language: 'coptic',
          text: 'Ϯϣⲟⲩⲣⲏ ⲛ̀ⲛⲟⲩⲃ ⲧⲉ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲡⲉⲥⲁ̀ⲣⲱⲙⲁⲧⲁ ⲡⲉ Ⲡⲉⲛⲥⲱⲧⲏⲣ. Ⲁⲥⲙⲓⲥⲓ ⲙ̀ⲙⲟϥ: ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ: ⲟⲩⲟϩ ⲁϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
        },
        {
          language: 'englishCoptic',
          text: 'Tishourē ennoub te Tiparthenos: pesarōmata pe Pensōtēr. Asmisi emmof: afsōti emmon: ouoh afkha nennovi nan evol.',
        },
        {
          language: 'english',
          text: 'The golden censer is the Virgin, her aroma is our Savior. She gave birth to Him; He saved us, and forgave us our sins.',
        },
        {
          language: 'englishArabic',
          text: 'El-majmara ez-zahab hiya el-\'azra\', wa \'anbaruha huwa mukhallisuna. Qad waladathu wa khallasana wa ghafara lana khatayana.',
        },
        {
          language: 'arabic',
          text: 'المجمرة الذهب هي العذراء، وعنبرها هو مخلصنا. قد ولدته وخلصنا وغفر لنا خطايانا.',
        },
      ],
    },
    {
      id: 'annual-liturgy-hymn-of-intercessions',
      title: 'Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ (Hymn of the Intercessions)',
      versions: [
        {
          language: 'coptic',
          text: 'Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(For the Commemoration of Archangel Gabriel, the Feast of the Annunciation, and the month of Koiahk)\n\nϨⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ ⲛ̀ⲧⲉ ⲡⲓⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ Ⲅⲁⲃⲣⲓⲏⲗ ⲡⲓϥⲁⲓϣⲉⲛⲛⲟⲩϥⲓ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ ⲛ̀ⲧⲉ ⲡⲓϣⲁϣϥ ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ ⲛ̀ⲧⲉ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ ⲛⲉⲙ ⲡ̀ⲥⲉⲡⲓ ⲛ̀ⲧⲉ ⲛⲓⲙⲁⲑⲏⲧⲏⲥ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ ⲛ̀ⲧⲉ ⲡⲓⲑⲉⲱ̀ⲣⲓⲙⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ ⲛ̀ⲧⲉ ⲡⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ ⲡⲁϭⲟⲓⲥ ⲡ̀ⲟⲩⲣⲟ Ⲅⲉⲱⲣⲅⲓⲟⲥ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(For the Commemoration of St. Philopater Mercurius)\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ ⲛ̀ⲧⲉ ⲡⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(For the Commemoration of St. Mena)\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ ⲛ̀ⲧⲉ ⲡⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ ⲁ̀ⲡⲁ Ⲙⲏⲛⲁ ⲛ̀ⲧⲉ ⲛⲓⲫⲁⲓⲁⲧ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(For the Commemoration of Abba Abraam Bishop of Fayoum)\n\nϨⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ: ⲛ̀ⲧⲉ ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲇⲓⲕⲉⲟⲥ: ⲁⲃⲃⲁ Ⲁⲃⲣⲁⲁⲙ ⲡⲓⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(For the Commemoration of Pope Kyrillos the 6th)\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ: ⲛ̀ⲧⲉ ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ Ⲡⲓⲙⲁϩⲥⲟⲟⲩ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(The verse for the saint of the church is added here, if not already mentioned above)\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ ⲛ̀ⲧⲉ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲛ̀ⲧⲉ ⲡⲁⲓⲉ̀ϩⲟⲟⲩ ⲡⲓⲟⲩⲁⲓ ⲡⲓⲟⲩⲁⲓ ⲕⲁⲧⲁ ⲡⲉϥⲣⲁⲛ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nϨⲓⲧⲉⲛ ⲛⲟⲩⲉⲩⲭⲏ ⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁⲣⲭⲏⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (ⲛⲓⲙ): Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nϨⲓⲧⲉⲛ ⲛⲟⲩⲉⲩⲭⲏ ⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲇⲓⲕⲉⲟⲥ ⲁⲃⲃⲁ (ⲛⲓⲙ) ⲡⲓⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ (ⲡⲓⲙⲏⲧⲣⲟⲡⲟⲗⲓⲧⲏⲥ): Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n(On standard days of the year and on fasting days)\n\nⲦⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲕ ⲱ̀ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ ⲛⲁⲓ ⲛⲁⲛ.',
        },
        {
          language: 'englishCoptic',
          text: 'Hiten ni-epresvia: ente Tithe-otokos ethouab Maria: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(For the Commemoration of Archangel Gabriel, the Feast of the Annunciation, and the month of Koiahk)\n\nHiten ni-epresvia ente piarkhēaggelos ethouab Gabriēl pifaishennoufi: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\nHiten ni-epresvia ente pishashf enarkhēaggelos nem nitagma enepouranion: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\nHiten nieukhē ente natshois enioti enapostolos nem epsepi ente nimathētēs: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\nHiten nieukhē ente pithe-ōrimos eneuaggelistēs Markos pi-apostolos: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\nHiten nieukhē ente piathloforos emmarturos patshois epouro Geōrgios: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(For the Commemoration of St. Philopater Mercurius)\n\nHiten nieukhē ente piathloforos emmarturos Filopatēr Merkourios: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(For the Commemoration of St. Mena)\n\nHiten nieukhē ente piathloforos emmarturos apa Mēna ente nifaiat: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(For the Commemoration of Abba Abraam Bishop of Fayoum)\n\nHiten ni-eukhē: ente peniōt ethouab endikeos: abba Abraam pi-episkopos: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(For the Commemoration of Pope Kyrillos the 6th)\n\nHiten nieukhē: ente peniōt ethouab empatriarkhēs: Abba Kurillos Pimahsoou: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(The verse for the saint of the church is added here, if not already mentioned above)\n\nHiten nieukhē ente nēethouab ente pai-ehoou piouai piouai kata pefran: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\nHiten noueukhē areh e-epōnkh empeniōt ettaiēout enarkhē-ereus papa abba (nim): Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\nHiten noueukhē areh e-epōnkh empeniōt ettaiēout endikeos abba (nim) pi-episkopos (pimētropolitēs): Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n(On standard days of the year and on fasting days)\n\nTenouōsht emmok ō Pi-ekhristos: nem Pekiōt enagathos: nem Pi-epneuma ethouab: je aki aksōti emmon nai nan.',
        },
        {
          language: 'english',
          text: 'Through the intercessions, of the Theotokos Saint Mary, O Lord grant us, the forgiveness of our sins.\n\n(For the Commemoration of Archangel Gabriel, the Feast of the Annunciation, and the month of Koiahk)\n\nThrough the intercessions of the holy archangel Gabriel, the herald of glad tidings: O Lord, grant us the forgiveness of our sins.\n\nThrough the intercessions of the seven archangels, and the heavenly orders, O Lord, grant us the forgiveness of our sins.\n\nThrough the prayers of my lords and fathers, the apostles, and the rest of the disciples, O Lord, grant us the forgiveness of our sins.\n\nThrough the prayers of the Beholder of God, the Evangelist Mark, the apostle, O Lord, grant us the forgiveness of our sins.\n\nThrough the prayers of the struggle-mantled martyr, my lord Prince George, O Lord, grant us the forgiveness of our sins.\n\n(For the Commemoration of St. Philopater Mercurius)\n\nThrough the prayers of the struggle-mantled martyr, Philopater Mercurius, O Lord, grant us the forgiveness of our sins.\n\n(For the Commemoration of St. Mena)\n\nThrough the prayers of the struggle-mantled martyr, holy Abba Mena of Bayad, O Lord, grant us the forgiveness of our sins.\n\n(For the Commemoration of Abba Abraam Bishop of Fayoum)\n\nThrough the prayers: of our righteous father: Abba Abraam the bishop: O Lord grant us the forgiveness of our sins.\n\n(For the Commemoration of Pope Kyrillos the 6th)\n\nThrough the prayers, of our holy father the patriarch, Abba Kyrillos the Sixth, O Lord grant us the forgiveness of our sins.\n\n(The verse for the saint of the church is added here, if not already mentioned above)\n\nThrough the prayers of the saints of this day, each one according to their names, O Lord, grant us the forgiveness of our sins.\n\nThrough their prayers, keep the life of our honored father, the archpriest, Pope Abba (...). O Lord, grant us the forgiveness of our sins.\n\nThrough their prayers, keep the life of our honored and righteous father, Abba (...) the bishop (metropolitan), O Lord, grant us the forgiveness of our sins.\n\n(On standard days of the year and on fasting days)\n\nWe worship You, O Christ, with Your good Father, and the Holy Spirit, for You have come and saved us. Have mercy on us.',
        },
        {
          language: 'englishArabic',
          text: 'Bi-shafa\'at walidat el-ilah el-qiddisa Maryam, ya rabbu an\'im lana, bi-maghfirat khatayana.\n\n(Fi tizkar ra\'is el-mala\'ika Ghobrial, wa \'eid el-bishara, wa shahr Kiahk)\n\nBi-shafa\'at ra\'is el-mala\'ika et-tahir Ghobrial el-mubashshir. Ya rabbu an\'im \'alayna bi-maghfirat khatayana.\n\nBi-shafa\'at ru\'asa\' el-mala\'ika es-sab\'a wat-tughmat es-sama\'iya, ya rabbu an\'im \'alayna bi-maghfirat khatayana.\n\nBi-salawat sadati el-aba\' er-rusul wa baqiyyat et-talameez, ya rabbu an\'im \'alayna bi-maghfirat khatayana.\n\nBi-salawat nazir el-ilah el-injeeli Marqos er-rasool, ya rabbu an\'im \'alayna bi-maghfirat khatayana.\n\nBi-salawat el-mujahid esh-shaheed sayyidi el-malik Georgios, ya rabbu an\'im \'alayna bi-maghfirat khatayana.\n\n(Fi tizkar el-qiddis Philopater Marqorios)\n\nBi-salawat el-mujahid esh-shaheed Philopater Marqorios, ya rabbu an\'im \'alayna bi-maghfirat khatayana.\n\n(Fi tizkar el-qiddis Mar Mina)\n\nBi-salawat el-mujahid esh-shaheed Abba Mina el-Bayadi, ya rabbu an\'im \'alayna bi-maghfirat khatayana.\n\n(Fi tizkar el-Anba Abram usquf el-Fayoum)\n\nBi-salawat abina el-qiddis el-barr Anba Abram el-usquf, ya rabbu an\'im lana bi-maghfirat khatayana.\n\n(Fi tizkar el-Baba Kirollos es-sadis)\n\nBi-salawat, ya abana el-qiddis el-batreerk, el-Anba Kirollos es-sadis, ya rabbu an\'im \'alayna bi-maghfirat khatayana.\n\n(Yudaf huna rub\' qiddis el-kanisa in lam yuzkar a\'lah)\n\nBi-salawat qiddisi hadha el-yawm, kullu wahid bi-ismih, ya rabbu an\'im \'alayna bi-maghfirat khatayana.\n\nBi-salawatihim ihfaz hayat abina el-mukarram ra\'is el-kahana el-Baba el-Anba (...), ya rabbu an\'im \'alayna bi-maghfirat khatayana.\n\nBi-salawatihim ihfaz hayat abina el-mukarram el-barr Anba (...) el-usquf (el-mutran), ya rabbu an\'im \'alayna bi-maghfirat khatayana.\n\n(Fil-ayyam es-sanawiya wa ayyam es-sawm)\n\nNasjudu laka ayyuha el-Maseeh, ma\'a abeeka es-saleh war-Roh el-Qudus, li-annaka ateita wa khallastana. [Irhamna]',
        },
        {
          language: 'arabic',
          text: 'بشفاعاتِ والِدةِ الإلهِ القدِّيسةِ مريمَ، يا ربُّ أنعِمْ لَنا، بمغفِرةِ خطايانا.\n\n(في تذكار رئيس الملائكة غبريال، وعيد البشارة، وشهر كيهك)\n\nبشفاعات رئيس الملائكة الطاهر غبريال المبشر. يارب أنعم علينا بمغفرة خطايانا.\n\nبشفاعات رؤساء الملائكة السبعة والطغمات السمائية، يارب أنعم علينا بمغفرة خطايانا.\n\nبصلوات سادتي الآباء الرسل وبقية التلاميذ، يارب أنعم علينا بمغفرة خطايانا.\n\nبصلوات ناظر الإله الإنجيلي مرقس الرسول، يارب أنعم علينا بمغفرة خطايانا.\n\nبصلوات المجاهد الشهيد سيدي الملك جيؤرجيوس، يارب أنعم علينا بمغفرة خطايانا.\n\n(في تذكار القديس فيلوباتير مرقوريوس)\n\nبصلوات المجاهد الشهيد فيلوباتير مرقوريوس، يارب أنعم علينا بمغفرة خطايانا.\n\n(في تذكار القديس مار مينا)\n\nبصلوات المجاهد الشهيد ابا مينا البياضي، يارب أنعم علينا بمغفرة خطايانا.\n\n(في تذكار الأنبا أبرام أسقف الفيوم)\n\nبصلوات ابينا القديس البار أنبا أبرام الاسقف يارب انعم لنا بمغفرة خطايانا.\n\n(في تذكار البابا كيرلس السادس)\n\nبصلوات، يا أبانا القديس البطريرك، الانبا كيرلس السادس، يا رب أنعم علينا بمغفرة خطايانا.\n\n(يُضاف هنا ربع قديس الكنيسة إن لم يُذكر أعلاه)\n\nبصلوات قديسي هذا اليوم، كل واحد باسمِه، يارب أنعم علينا بمغفرة خطايانا.\n\nبصلواتِهم إحفظ حياة أبينا المكرم رئيس الكهنة البابا الأنبا(...)، يارب أنعم علينا بمغفرة خطايانا.\n\nبصلواتهم إحفظ حياة أبينا المكرم البار أنبا (...) الاسقف (المطران) يارب أنعم علينا بمغفرة خطايانا.\n\n(في الأيام السنوية وأيام الصوم)\n\nنسجدُ لكَ أيها المسيحُ، معَ أبيكَ الصالحِ والرّوحِ القُدُسِ، لأنَّكَ أتيتَ وخلَّصتَنا. [ارحَمْنا]',
        },
      ],
    },
    {
      id: 'annual-liturgy-pihmot-gar',
      title: 'Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲙ̀ⲡⲉⲛⲟ̅ⲥ̅ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲉϥⲉ̀ϣⲱⲡⲓ ⲛⲉⲙ ⲡⲉⲕⲁ̀ⲅⲓⲟⲛ ⲡ̀ⲛⲉⲩⲙⲁ: ⲡⲁⲟ̅ⲥ̅ ⲛ̀ⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁ̀ⲣⲭⲏⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (ⲛⲓⲙ).\n\nⲚⲉⲙ ⲡⲉⲛⲓⲱⲧ ⲙ̀ⲙⲏⲧⲣⲟⲡⲟⲗⲓⲧⲏⲥ ⲁⲃⲃⲁ (ⲛⲓⲙ).\n\nⲚⲉⲙ ⲡⲉⲛⲓⲱⲧ ⲛ̀ⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ ⲁⲃⲃⲁ (ⲛⲓⲙ).\n\nⲘⲁⲣⲉ ⲡⲓⲕ̀ⲗⲏⲣⲟⲥ: ⲛⲉⲙ ⲡⲓⲗⲁⲟⲥ ⲧⲏⲣϥ: ⲟⲩϫⲁⲓ ϧⲉⲛ Ⲡ̅ⲟ̅ⲥ̅: ϫⲉ ⲁ̀ⲙⲏⲛ ⲉⲥⲉ̀ϣⲱⲡⲓ.',
        },
        {
          language: 'englishCoptic',
          text: 'Pi-ehmot gar empentshois Iēsous Pikhristos: efeshōpi nem pekagion epneuma: patshois eniōt ettaiēout enarkhē-ereus papa abba (nim).\n\nNem peniōt emmētropolitēs abba (nim).\n\nNem peniōt enepiskopos abba (nim).\n\nMare pi-eklēros: nem pilaos tērf: oujai khen Eptshois: je amēn eseshōpi.',
        },
        {
          language: 'english',
          text: 'The grace of our Lord Jesus Christ, be with your saintly spirit, my lord the honored father the high priest Pope Abba (...).\n\nAnd our father the Metropolitan Abba (...).\n\nAnd our father the Bishop Abba (...).\n\nMay the clergy and all the people be safe in the Lord. Amen. So be it.',
        },
        {
          language: 'englishArabic',
          text: 'Ni\'mat Rabbina Yasou\' el-Maseeh takoon ma\'a roohak et-tahira, ya sayyidi el-ab el-mukarram ra\'is el-kahana el-Baba Anba (...).\n\nWa abina el-mutran el-Anba (...).\n\nWa abina el-usquf el-Anba (...).\n\nFal-yakun el-ekleeros wa kull esh-sha\'b mu\'afeen fir-Rabb. Ameen yakoon.',
        },
        {
          language: 'arabic',
          text: 'نعمة ربنا يسوع المسيح تكون مع روحك الطاهرة، يا سيدي الأب المكرم رئيس الكهنة البابا أنبا (...).\n\nوأبينا المطران الأنبا (...).\n\nوأبينا الأسقف الأنبا (...).\n\nفليكن الإكليروس وكل الشعب معافين في الرب. آمين يكون.',
        },
      ],
    },
    {
      id: 'annual-liturgy-perfect-is-the-blessing',
      title: 'Ⲁ̀ ⲡⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲁ̀ ⲡⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ ⲛ̀ϫⲉ ⲡⲓⲥ̀ⲙⲟⲩ ⲧⲟⲩ Ⲗⲟⲅⲟⲩ Ⲡⲉϥⲓⲱⲧ: ⲓ̀ ⲁϥϭⲓⲥⲁⲣⲝ ϩⲱⲥ ⲣⲱⲙⲓ ⲛ̀ⲧⲉⲗⲓⲟⲥ.\n\nⲆⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩ̀ⲓⲱ ⲕⲉ Ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ.\n\nⲀ̀ ⲡⲉⲧϧⲉⲗϧⲱⲗϥ ⲛⲁⲩ ⲉ̀ⲣⲟϥ: ⲁ̀ ⲡⲉⲧϧⲉⲗϧⲱⲗϥ ϣⲟⲡ ⲛⲉⲙⲱⲧⲉⲛ: ⲁ̀ ⲡⲉⲧϧⲉⲗϧⲱⲗϥ ⲁϣϥ ϩⲓϫⲉⲛ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ.\n\nⲔⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ. Ⲁ̀ⲙⲏⲛ.\n\nⲐⲁⲓ ⲧⲉ ϯⲛⲟⲩ ⲉ̀ⲧⲉ: ⲑⲁⲓ ⲧⲉ ϯⲥⲉⲃⲏⲣⲟⲥ: ϯⲡ̀ⲣⲟⲥⲕⲩⲛⲏⲥⲓⲥ ⲧⲱ ⲙⲟⲛⲱ Ⲭ̀ⲣⲓⲥⲧⲟⲥ.\n\nⲈ̀ⲣⲉ ⲡⲓⲥ̀ⲙⲟⲩ ⲛ̀ϯⲦ̀ⲣⲓⲁⲥ ⲉ̅ⲑ̅ⲩ̅ (ⲃ̅): Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅.\n\nⲈ̀ⲣⲉ ⲡⲓⲥ̀ⲙⲟⲩ ⲛ̀ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ (ⲃ̅): Ⲙⲁⲣⲓⲁ ⲑ̀ⲙⲁⲩ ⲛ̀Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅.\n\nⲈ̀ⲣⲉ ⲡⲓⲥ̀ⲙⲟⲩ ⲙ̀ⲡⲉⲛⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ (ⲃ̅): ⲛ̀ⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲧ ⲛ̀ⲁⲣⲭⲏⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (...).\n\nⲈ̀ⲣⲉ ⲡⲓⲥ̀ⲙⲟⲩ ⲙ̀ⲡⲉⲛ ⲙⲏⲧⲣⲟⲡⲟⲗⲓⲧⲏⲥ: ⲛ̀ⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲧ ⲁⲃⲃⲁ (...).\n\nⲈ̀ⲣⲉ ⲡⲓⲥ̀ⲙⲟⲩ ⲙ̀ⲡⲉⲛⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ: ⲛ̀ⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲧ ⲁⲃⲃⲁ (...).\n\nⲈⲩⲉ̀ⲓ̀ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲉⲛ ⲡⲁⲓⲗⲁⲟⲥ ⲧⲏⲣϥ: ϫⲉ ⲁ̀ⲙⲏⲛ ⲉⲥⲉ̀ϣⲱⲡⲓ.\n\nⲔⲁⲑⲟⲗⲓⲕⲟⲛ: ⲕⲁⲑⲟⲗⲓⲕⲟⲛ.',
        },
        {
          language: 'englishCoptic',
          text: 'A petjēk evol enje pi-esmou tou Logou Pefiōt: i aftshisarks hōs rōmi entelios.\n\nDoksa Patri ke Uiō ke Agiō Epneumati.\n\nA petkhelkhōlf nau erof: a petkhelkhōlf shop nemōten: a petkhelkhōlf ashf hijen pi-estauros.\n\nKe nun ke a-i ke is tous e-ōnas tōn e-ōnōn. Amēn.\n\nThai te tinou ete: thai te tisevēros: ti-eproskunēsis tō monō Ekhristos.\n\nEre pi-esmou enti-Etrias ethouab (2): Efiōt nem Epshēri nem Pi-epneuma ethouab.\n\nEre pi-esmou entithe-otokos (2): Maria ethmau en-Iēsous Pikhristos.\n\nEre pi-esmou empenpatriarkhēs (2): eniōt ettaiēot enarkhē-ereus papa abba (...).\n\nEre pi-esmou empen mētropolitēs: eniōt ettaiēot abba (...).\n\nEre pi-esmou empenepiskopos: eniōt ettaiēot abba (...).\n\nEu-e-i e-ehrēi ejen pailaos tērf: je amēn eseshōpi.\n\nKatholikon: katholikon.',
        },
        {
          language: 'english',
          text: 'Perfect is the blessing, of the Word of the Father, who came and was incarnate as a perfect man.\n\nGlory to the Father, and the Son, and the Holy Spirit.\n\nThe slaughtered One was seen. The slaughtered One is present among you. The slaughtered One is crucified on the Cross.\n\nNow and ever and unto the age of ages. Amen.\n\nThis is the perceptible. This is the miraculous. Worship is due to the only-begotten Christ.\n\nThe blessing of the Holy Trinity (2), the Father, the Son, and the Holy Spirit.\n\nThe blessing of the Theotokos (2), Mary the Mother of Jesus Christ.\n\nThe blessing of our patriarch (2), the honored father, the archpriest, Pope Abba (...).\n\nThe blessing of our metropolitan, the honored father Abba (...).\n\nThe blessing of our bishop, the honored father Abba (...).\n\nShall come upon this entire congregation. Amen. So be it.\n\nThe catholic epistle, the catholic epistle.',
        },
        {
          language: 'englishArabic',
          text: 'El-kamil barakat abeeh el-kalima, ata wa tajassad ka-insan kamil.\n\nEl-majd lil-Ab wal-Ibn war-Rooh el-Qudus.\n\nEl-mazbooh nazarooh, el-mazbooh el-ka\'in ma\'akum, el-mazbooh mu\'allaq \'ala es-saleeb.\n\nEl-aan wa kull awan wa ila dahr ed-duhoor. Ameen.\n\nHadhihi el-\'aqliya, hadhihi el-u\'jooba, es-sujood lil-Maseeh el-wahid.\n\n(Barakat eth-thaloos el-aqdas) 2, el-Ab wal-Ibn war-Rooh el-Qudus.\n\n(Barakat walidat el-ilah) 2, Maryam umm Yasou\' el-Maseeh.\n\n(Barakat batreerkina) 2, el-ab el-mukarram ra\'is el-kahana el-Baba Anba (...).\n\nBarakat el-ab el-mutran el-Anba (...).\n\nBarakat el-ab el-usquf el-Anba (...).\n\nTahillu \'ala hadha esh-sha\'b kullih. Ameen yakoon.\n\nEl-Katholikon el-Katholikon.',
        },
        {
          language: 'arabic',
          text: 'الكامل بركة أبيه الكلمة، أتى وتجسد كإنسان كامل.\n\nالمجد للآب والإبن والروح القدس.\n\nالمذبوح نظروه، المذبوح الكائن معكم، المذبوح مُعَلق على الصليب.\n\nالآن وكل أوان وإلى دهر الدهور. آمين.\n\nهذه العقلية، هذه الأعجوبة، السجود للمسيح الواحد.\n\n(بركة الثالوث الاقدس)٢، الآب والإبن والروح القدس.\n\n(بركة والدة الإله)٢، مريم أم يسوع المسيح.\n\n(بركة بطريركنا)٢، الآب المكرم رئيس الكهنة البابا أنبا (...).\n\nبركة الأب المطران الانبا (...)\n\nبركة الأب الاسقف الانبا (...)\n\nتحل علي هذا الشعب كله أمين يكون.\n\nالكاثوليكون الكاثوليكون.',
        },
      ],
    },
    {
      id: 'annual-liturgy-praxis-response',
      title: 'Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ (Praxis Response)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϯϭ̀ⲣⲟⲙⲡⲓ ⲉⲑⲛⲉⲥⲱⲥ: ⲑⲏⲉ̀ⲧⲁⲥⲙⲓⲥⲓ ⲛⲁⲛ: ⲙ̀Ⲫ̀ⲛⲟⲩϯ ⲡⲓⲖⲟⲅⲟⲥ.\n\nⲔ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲁ̀ⲗⲏⲑⲱⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ ⲛⲁⲓ ⲛⲁⲛ.',
        },
        {
          language: 'englishCoptic',
          text: 'Khere ne Maria: ti-etshrompi ethnesōs: thē-etasmisi nan: em-Efnouti pi-Logos.\n\nEkesmarōout alēthōs: nem Pekiōt enagathos: nem Pi-epneuma ethouab: je aki aksōti emmon nai nan.',
        },
        {
          language: 'english',
          text: 'Hail to you O Mary, the beautiful dove, who has borne to us, God the Logos.\n\nBlessed are You indeed, with Your good Father, and the Holy Spirit, for You have come and saved us. Have mercy on us.',
        },
        {
          language: 'englishArabic',
          text: 'Es-salamu laki ya Maryam el-hamama el-hasana, allati waladat lana Allah el-kalima.\n\nMubarakun anta bil-haqiqa, ma\'a abeeka es-saleh war-Rooh el-Qudus, li-annaka ateita wa khallastana. Irhamna.',
        },
        {
          language: 'arabic',
          text: 'السلام لك يا مريم الحمامة الحسنة التي ولدت لنا الله الكلمة.\n\nمبارك أنت بالحقيقة، مع أبيك الصالح والروح القدس لأنك أتيتَ وخلصتنا. ارحمنا.',
        },
      ],
    },
    {
      id: 'annual-liturgy-agios',
      title: 'Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ: Ⲁⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ: Ⲁⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ: ⲟ̀ ⲉⲕ ⲡⲁⲣⲑⲉⲛⲟⲩ ⲅⲉⲛⲛⲉⲑⲓⲥ: ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲀⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ: Ⲁⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ: Ⲁⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ: ⲟ̀ ⲥ̀ⲧⲁⲩⲣⲱⲑⲓⲥ ⲇⲓ ⲏⲙⲁⲥ: ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲀⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ: Ⲁⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ: Ⲁⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ: ⲟ̀ ⲁ̀ⲛⲁⲥⲧⲁⲥ ⲉⲕ ⲧⲱⲛ ⲛⲉⲕⲣⲱⲛ ⲕⲉ ⲁ̀ⲛⲉⲗⲑⲱⲛ ⲓⲥ ⲧⲟⲩⲥ ⲟⲩⲣⲁⲛⲟⲥ: ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲆⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩ̀ⲓⲱ ⲕⲉ ⲁ̀ⲅⲓⲱ Ⲡⲛⲉⲩⲙⲁⲧⲓ: ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ: ⲁ̀ⲙⲏⲛ. Ⲁⲅⲓⲁ Ⲧ̀ⲣⲓⲁⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.',
        },
        {
          language: 'englishCoptic',
          text: 'Agios o Theos: Agios iskhuros: Agios athanatos: o ek parthenou gennethis: ele-ēson ēmas.\n\nAgios o Theos: Agios iskhuros: Agios athanatos: o estaurōthis di ēmas: ele-ēson ēmas.\n\nAgios o Theos: Agios iskhuros: Agios athanatos: o anastas ek tōn nekrōn ke anelthōn is tous ouranos: ele-ēson ēmas.\n\nDoksa Patri ke Uiō ke agiō Pneumati: ke nun ke a-i ke is tous e-ōnas tōn e-ōnōn: amēn. Agia Etrias ele-ēson ēmas.',
        },
        {
          language: 'english',
          text: 'Holy God, Holy Mighty, Holy Immortal, who was born of the Virgin, have mercy upon us.\n\nHoly God, Holy Mighty, Holy Immortal, who was crucified for us, have mercy upon us.\n\nHoly God, Holy Mighty, Holy Immortal, who rose from the dead and ascended into the heavens, have mercy upon us.\n\nGlory to the Father and to the Son and to the Holy Spirit, now and ever and unto the age of the ages. Amen. O Holy Trinity, have mercy upon us.',
        },
        {
          language: 'englishArabic',
          text: 'Quddoos Allah. Quddoos el-qawi. Quddoos el-hayy elladhi la yamoot. Ya man wulida min el-\'adhra\', irhamna.\n\nQuddoos Allah. Quddoos el-qawi. Quddoos el-hayy elladhi la yamoot. Ya man sulliba \'anna, irhamna.\n\nQuddoos Allah. Quddoos el-qawi. Quddoos el-hayy elladhi la yamoot. Ya man qama min el-amwat wa sa\'ida ila es-samawat, irhamna.\n\nEl-majdu lil-Ab wal-Ibn war-Rooh el-Qudus, el-aan wa kull awan wa ila dahr ed-dahireen. Ameen. Ayyuha eth-thaloothu el-quddoos, irhamna.',
        },
        {
          language: 'arabic',
          text: 'قدوسُ الله. قدوسُ القوى. قدوسُ الحي الذي لا يموتُ. يا من وُلِّدَ من العذراء، إرحَمنا.\n\nقدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من صُلِّبَ عنا، إرحَمنا.\n\nقدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من قامَ من الامواتِ وصعدَ إلى السموات، إرحَمنا.\n\nالمجدُ للآبِ والابنِ والروحِ القدس، الآنَ وكل أوانٍ وإلى دهر الداهرين. آمين. أيها الثالوثُ القدوس، إرحَمنا.',
        },
      ],
    },
  );
}

// ---- Audio: Annual > Matins > Verse of the Cymbals ----
const verseOfCymbalsHymn = annualMatins?.hymns.find((h) => h.id === 'annual-matins-verse-of-cymbals');
const verseOfCymbalsCoptic = verseOfCymbalsHymn?.versions.find((v) => v.language === 'coptic');
if (verseOfCymbalsCoptic) {
  verseOfCymbalsCoptic.audio = 'verse-of-the-cymbals-annual.mp3';
}
const verseOfCymbalsEnglishCoptic = verseOfCymbalsHymn?.versions.find((v) => v.language === 'englishCoptic');
if (verseOfCymbalsEnglishCoptic) {
  verseOfCymbalsEnglishCoptic.audio = 'verse-of-the-cymbals-annual.mp3';
}

// ---- Annual > Liturgy: same Psalm Trailer for the Pope or a Bishop as Matins, with its own audio ----
const matinsPsalmTrailerPopeBishop = annualMatins?.hymns.find((h) => h.id === 'annual-matins-psalm-trailer-pope-bishop');
if (annualLiturgy && matinsPsalmTrailerPopeBishop) {
  annualLiturgy.hymns.push({
    ...matinsPsalmTrailerPopeBishop,
    id: 'annual-liturgy-psalm-trailer-pope-bishop',
    // Copy each version so audio set here doesn't leak into the Matins hymn
    versions: matinsPsalmTrailerPopeBishop.versions.map((v) => ({ ...v })),
  });
}

// ---- Annual > Liturgy: after the Psalm Trailer for the Pope or a Bishop ----
annualLiturgy?.hymns.push({
  id: 'annual-liturgy-blessed-are-they',
  title: 'Ⲱⲟⲩⲛⲓⲁⲧⲟⲩ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ',
  versions: [
    {
      language: 'coptic',
      text: 'Ⲱⲟⲩⲛⲓⲁⲧⲟⲩ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ: ⲛⲏⲉⲑⲟⲩⲁⲃ ⲛ̀ⲧⲉ ⲡⲁⲓⲉ̀ϩⲟⲟⲩ: ⲡⲓⲟⲩⲁⲓ ⲡⲓⲟⲩⲁⲓ ⲕⲁⲧⲁ ⲡⲉϥⲣⲁⲛ: ⲛⲓⲙⲉⲛⲣⲁϯ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ.\n\nⲀ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲧⲉⲛϭⲟⲓⲥ ⲛ̀ⲛⲏⲃ ⲧⲏⲣⲉⲛ ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: Ⲙⲁⲣⲓⲁ ⲑ̀ⲙⲁⲩ ⲙ̀ⲡⲉⲛⲥⲱⲧⲏⲣ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̅ⲟ̅ⲥ̅ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nϪⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϯⲦ̀ⲣⲓⲁⲥ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲥ ⲧⲉⲛϯⲱ̀ⲟⲩ ⲛⲁⲥ.',
    },
    {
      language: 'englishCoptic',
      text: 'Ōouniatou khen oumethmēi: nēethouab ente pai-ehoou: piouai piouai kata pefran: nimenrati ente Pi-ekhristos.\n\nAri-epresveuin e-ehrēi ejōn: ō tentshois ennēb tēren tithe-otokos: Maria ethmau empensōtēr: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: ō pi-athloforos emmarturos: Filopatēr Merkourios: entefkha nennovi nan evol.\n\nJe efesmarōout enje Efiōt nem Epshēri: nem Pi-epneuma ethouab: ti-Etrias etjēk evol: tenouōsht emmos tenti-ōou nas.',
    },
    {
      language: 'english',
      text: 'Blessed are they in truth, the saints of this day, each one according to their name, the beloved of Christ.\n\nIntercede on our behalf, O Lady of us all, the Theotokos, Mary, the mother of our Savior, that He may forgive us our sins.\n\nPray to the Lord on our behalf, O struggle-bearer and martyr: Philopater Mercurius: that He may forgive us our sins.\n\nBlessed be the Father and the Son and the Holy Spirit, the perfect Trinity. We worship Him and glorify Him.',
    },
    {
      language: 'englishArabic',
      text: 'Toobahum bil-haqiqa qiddeesu hadha el-yawm, kullu wahid bi-ismih, ahibba\' el-Maseeh.\n\nIshfa\'i feena ya sayyidatana kullina, es-sayyida walidat el-ilah Maryam umm mukhallisina, li-yaghfira lana khatayana.\n\nUtlub min er-Rabb \'anna ayyuha esh-shaheed el-mujahid muhibb el-Ab Marqorios, li-yaghfira lana khatayana.\n\nLi-annahu mubarakun el-Ab wal-Ibn war-Rooh el-Qudus, eth-thaloos el-kamil, nasjudu lahu wa numajjiduh.',
    },
    {
      language: 'arabic',
      text: 'طوباهم بالحقيقةِ قديسو هذا اليوم، كل واحد بإسمه احباء المسيح.\n\nأشفعي فينا يا سيدتَنا كلِنا، السيدة والدة الإله مريم أم مخلصنا، ليغفرَ لنا خطايانا.\n\nاطلب من الرب عنا أيها الشهيد المجاهد محب الآب مرقوريوس ليغفر لنا خطايانا.\n\nلأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده.',
    },
  ],
});

// ---- Annual > Liturgy: after Ouoniatou Khen Oumethmee ----
annualLiturgy?.hymns.push({
  id: 'annual-liturgy-hiten-ni-presvia-eleos',
  title: 'Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ ⲛ̀ⲧⲉ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ',
  versions: [
    {
      language: 'coptic',
      text: 'Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ ⲛ̀ⲧⲉ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nⲦⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲕ ⲱ̀ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ.\n\nⲈⲗⲉⲟⲥ ⲓ̀ⲣⲏⲛⲏⲥ: ⲑⲩⲥⲓⲁ ⲉ̀ⲛⲉⲥⲉⲱⲥ.',
    },
    {
      language: 'englishCoptic',
      text: 'Hiten ni-epresvia ente Tithe-otokos ethouab Maria: Eptshois ari-ehmot nan empikhō evol ente nennovi.\n\nTenouōsht emmok ō Pi-ekhristos: nem Pekiōt enagathos: nem Pi-epneuma ethouab: je aki aksōti emmon.\n\nEleos irēnēs: thusia eneseōs.',
    },
    {
      language: 'english',
      text: 'Through the intercessions of the Theotokos, Saint Mary, O Lord, grant us the forgiveness of our sins.\n\nWe worship You, O Christ, with Your Good Father and the Holy Spirit, for You have come and saved us.\n\nA mercy of peace, a sacrifice of praise.',
    },
    {
      language: 'englishArabic',
      text: 'Bi-shafa\'at walidat el-ilah el-qiddisa Maryam, ya rabbu an\'im lana bi-maghfirat khatayana.\n\nNasjudu laka ayyuha el-Maseeh, ma\'a abeeka es-saleh war-Rooh el-Qudus, li-annaka ataita wa khallastana.\n\nRahmatu es-salam, dhabeehatu et-tasbeeh.',
    },
    {
      language: 'arabic',
      text: 'بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا.\n\nنسجدُ لكَ أيها المسيح، مع أبيكَ الصالح، والروح القدس، لأنك أتيتَ وخلصتنا.\n\nرحمةُ السلامِ، ذبيحةُ التسبيحِ.',
    },
  ],
});

// ---- Audio: Annual > Liturgy > Psalm Trailer for the Pope or a Bishop ----
const psalmTrailerPopeBishopHymn = annualLiturgy?.hymns.find((h) => h.id === 'annual-liturgy-psalm-trailer-pope-bishop');
const psalmTrailerPopeBishopCoptic = psalmTrailerPopeBishopHymn?.versions.find((v) => v.language === 'coptic');
if (psalmTrailerPopeBishopCoptic) {
  psalmTrailerPopeBishopCoptic.audio = 'psalm-trailer-pope-bishop-liturgy.mp3';
}
const psalmTrailerPopeBishopEnglishCoptic = psalmTrailerPopeBishopHymn?.versions.find((v) => v.language === 'englishCoptic');
if (psalmTrailerPopeBishopEnglishCoptic) {
  psalmTrailerPopeBishopEnglishCoptic.audio = 'psalm-trailer-pope-bishop-liturgy.mp3';
}

// ---- Audio: Annual > Matins > Introduction to the Doxologies (Coptic) ----
const introDoxologiesHymn = seasons
  .find((s) => s.id === 'annual')
  ?.services.find((s) => s.id === 'annual-matins')
  ?.hymns.find((h) => h.id === 'annual-matins-intro-doxologies');

const introDoxologiesCoptic = introDoxologiesHymn?.versions.find((v) => v.language === 'coptic');
if (introDoxologiesCoptic) {
  introDoxologiesCoptic.audio = 'introduction-to-doxologies-coptic.m4a';
}
const introDoxologiesEnglishCoptic = introDoxologiesHymn?.versions.find((v) => v.language === 'englishCoptic');
if (introDoxologiesEnglishCoptic) {
  introDoxologiesEnglishCoptic.audio = 'introduction-to-doxologies-coptic.m4a';
}
// ---- Audio: Annual > Matins > The Conclusion of the Doxologies ----
const doxologyConclusionHymn = seasons
  .find((s) => s.id === 'annual')
  ?.services.find((s) => s.id === 'annual-matins')
  ?.hymns.find((h) => h.id === 'annual-matins-doxology-conclusion');

const doxologyConclusionCoptic = doxologyConclusionHymn?.versions.find((v) => v.language === 'coptic');
if (doxologyConclusionCoptic) {
  doxologyConclusionCoptic.audio = 'doxology-conclusion-coptic.m4a';
}

const doxologyConclusionEnglishCoptic = doxologyConclusionHymn?.versions.find((v) => v.language === 'englishCoptic');
if (doxologyConclusionEnglishCoptic) {
  doxologyConclusionEnglishCoptic.audio = 'doxology-conclusion-coptic.m4a';
}
const doxologyVirginMary = annualMatins?.hymns.find((h) => h.id === 'annual-matins-doxology-virgin-mary');
const doxologyVirginMaryCopticVersion = doxologyVirginMary?.versions.find((v) => v.language === 'coptic');
const doxologyVirginMaryEnglishCopticVersion = doxologyVirginMary?.versions.find((v) => v.language === 'englishCoptic');
if (doxologyVirginMaryCopticVersion) {
  doxologyVirginMaryCopticVersion.audio = 'doxology-virgin-mary.m4a';
}
if (doxologyVirginMaryEnglishCopticVersion) {
  doxologyVirginMaryEnglishCopticVersion.audio = 'doxology-virgin-mary.m4a';
}
// ---- Deacon Responses > Annual > Matins: replace the placeholders with the real responses ----
const deaconAnnualMatins = deaconCategories
  .find((c) => c.id === 'deacon-annual')
  ?.services.find((s) => s.id === 'd-annual-matins');

const prayForMercyCoptic =
  'Ⲧⲱⲃϩ ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲫⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ: ⲛ̀ⲧⲉϥϣⲉⲛϩⲏⲧ ϧⲁⲣⲟⲛ: ⲛ̀ⲧⲉϥⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲛ: ⲛ̀ⲧⲉϥⲉⲣⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲛ: ⲛ̀ⲧⲉϥϭⲓ ⲛ̀ⲛⲓϯϩⲟ ⲛⲉⲙ ⲛⲓⲧⲱⲃϩ ⲛ̀ⲧⲉ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲛ̀ⲧⲁϥ: ⲛ̀ⲧⲟⲧⲟⲩ ⲉ̀ϩⲣⲏⲓ ⲉ̀ϫⲱⲛ ⲉ̀ⲡⲓⲁ̀ⲅⲁⲑⲟⲛ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ: ☩ ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.';
const prayForMercyEnglishCoptic =
  'Tōbh hina ente Fnouti nai nan: entefshenhēt kharon: entefsōtem eron: entefervo-ēthin eron: enteftshi ennitiho nem nitōbh ente nēethouab entaf: entotou ehrēi ejōn epi-agathon ensēou niven: ☩ entefkha nennovi nan evol.';
const prayForMercyEnglish =
  'Pray that God may have mercy and compassion on us, hear us, help us, and accept the supplications and prayers of His saints, for that which is good on our behalf at all times ☩ and forgive us our sins.';
const prayForMercyEnglishArabic =
  'Utlubu likay yarhamana Allah, wa yatara\'af \'alayna, wa yasma\'na, wa yu\'eenana, wa yaqbal su\'alat wa talabat qiddiseeh minhum bis-salah \'anna fi kulli heen ☩ wa yaghfir lana khatayana.';
const prayForMercyArabic =
  'اطلبوا لكي يرحمَنا الله، ويتراءف علينا، ويسمعنا، ويعيننا، ويقبلَ سؤالات وطلبات قديسيه منهم بالصلاحِ عنا في كلِّ حينٍ ☩ ويغفرَ لنا خطايانا.';

// Added when the Pope or a bishop is present; Coptic and English are the same in every service
const popeBishopCoptic = 'ⲛ̀ⲧⲉϥⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲛⲉⲙ ⲡ̀ⲧⲁϩⲟ ⲉ̀ⲣⲁⲧϥ ⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁⲣⲭⲓⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (ⲛⲓⲙ) ⲛⲉⲙ ⲡⲉϥⲕⲉϣ̀ⲫⲏⲣ ⲛ̀ⲗⲓⲧⲟⲩⲣⲅⲟⲥ ⲡⲉⲛⲓⲱⲧ ⲛ̀ⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ (ⲙ̀ⲙⲏⲧⲣⲟⲡⲟⲗⲏⲧⲏⲥ) ⲁⲃⲃⲁ (ⲛⲓⲙ).';
const popeBishopEnglishCoptic = 'entefareh e-epōnkh nem eptaho eratf empeniōt ettaiēout enarkhi-ereus papa abba (nim) nem pefke-eshfēr enlitourgos peniōt enepiskopos (emmētropolētēs) abba (nim).';
const popeBishopEnglish = 'and to keep the life and standing of our honored father, the archpriest, Pope Abba (...), and his partner in the liturgy, our father the bishop (metropolitan), Abba (...).';

if (deaconAnnualMatins) {
  deaconAnnualMatins.hymns = [
    {
      id: 'd-annual-matins-stand-up-for-prayer',
      title: 'Ⲉⲡⲓ ⲡ̀ⲣⲟⲥⲉⲩⲭⲏ ⲥ̀ⲧⲁⲑⲏⲧⲉ (Stand Up for Prayer)',
      versions: [
        { language: 'coptic', text: 'Ⲉⲡⲓ ⲡ̀ⲣⲟⲥⲉⲩⲭⲏ ⲥ̀ⲧⲁⲑⲏⲧⲉ.' },
        { language: 'englishCoptic', text: 'Epi eproseukhē estathēte.' },
        { language: 'english', text: 'Stand up for prayer.' },
        { language: 'englishArabic', text: 'Lis-salah qifu.' },
        { language: 'arabic', text: 'للصلاة قفوا.' },
      ],
    },
    {
      id: 'd-annual-matins-pray',
      title: 'Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ (Pray)',
      versions: [
        { language: 'coptic', text: 'Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ.' },
        { language: 'englishCoptic', text: 'Proseuksasthe.' },
        { language: 'english', text: 'Pray.' },
        { language: 'englishArabic', text: 'Sallu.' },
        { language: 'arabic', text: 'صلوا.' },
      ],
    },
    {
      id: 'd-annual-matins-pray-for-mercy',
      title: 'Ⲧⲱⲃϩ ϩⲓⲛⲁ (Pray That God May Have Mercy)',
      versions: [
        { language: 'coptic', text: prayForMercyCoptic },
        { language: 'englishCoptic', text: prayForMercyEnglishCoptic },
        { language: 'english', text: prayForMercyEnglish },
        { language: 'englishArabic', text: prayForMercyEnglishArabic },
        { language: 'arabic', text: prayForMercyArabic },
      ],
    },
    {
      id: 'd-annual-matins-pray-for-mercy-pope-bishop',
      title: 'Ⲧⲱⲃϩ ϩⲓⲛⲁ (Pray That God May Have Mercy, in the Presence of the Pope or a Bishop)',
      versions: [
        {
          language: 'coptic',
          text: `${prayForMercyCoptic}\n\n${popeBishopCoptic}`,
        },
        {
          language: 'englishCoptic',
          text: `${prayForMercyEnglishCoptic}\n\n${popeBishopEnglishCoptic}`,
        },
        {
          language: 'english',
          text: `${prayForMercyEnglish}\n\n${popeBishopEnglish}`,
        },
        {
          language: 'englishArabic',
          text: `${prayForMercyEnglishArabic}\n\nWa an yahfaz hayat wa qiyam abina el-mukarram el-Baba el-Anba (...) wa shareekahu fil-khidma [er-rasouliya] abina el-usquf (el-mutran) Anba (...).`,
        },
        {
          language: 'arabic',
          text: `${prayForMercyArabic}\n\nوأن يحفظَ حياةَ وقيامَ أبينا المكرمِ البابا الأنبا (...) وشريكه في الخدمةِ [الرسولية] أبينا الأسقف (المطران) أنبا (...).`,
        },
      ],
    },
    {
      id: 'd-annual-matins-pray-for-the-sick',
      title: 'Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲛⲉⲛⲓⲟϯ (Pray for the Sick)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲛⲉⲛⲓⲟϯ ⲛⲉⲙ ⲛⲉⲛ̀ⲥⲛⲏⲟⲩ ⲉⲧϣⲱⲛⲓ ϧⲉⲛ ϫⲓⲛϣⲱⲛⲓ ⲛⲓⲃⲉⲛ: ⲓ̀ⲧⲉ ϧⲉⲛ ⲡⲁⲓⲧⲟⲡⲟⲥ ⲓ̀ⲧⲉ ϧⲉⲛ ⲙⲁⲓ ⲛⲓⲃⲉⲛ: ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲛⲉⲙⲱⲟⲩ ⲙ̀ⲡⲓⲟⲩϫⲁⲓ ⲛⲉⲙ ⲡⲓⲧⲁⲗϭⲟ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
        },
        {
          language: 'englishCoptic',
          text: 'Tōbh ejen nenioti nem ne-ensnēou etshōni khen jinshōni niven: ite khen paitopos ite khen mai niven: hina ente Pi-ekhristos Pennouti erehmot nan nemōou empioujai nem pitaltsho: entefkha nennovi nan evol.',
        },
        {
          language: 'english',
          text: 'Pray for our fathers and our brethren who are sick with any sickness, whether in this place or in any place, that Christ our God may grant us, with them, health and healing, and forgive us our sins.',
        },
        {
          language: 'englishArabic',
          text: 'Utlubu \'an aba\'ina wa ikhwatina el-marda bi-kulli marad, in kana fi hadha el-maskan aw bi-kulli mawdi\', likay el-Maseeh ilahuna yun\'im lana wa lahum bil-\'afiya wash-shifa\', wa yaghfir lana khatayana.',
        },
        {
          language: 'arabic',
          text: 'أطلبوا عن آبائنا وأخوتِنا المرضى بكلِّ مرضٍ، إن كانَ في هذا المسكنِ أو بكلِّ موضعٍ، لكي المسيحُ إلهنا ينعمَ لنا ولهم بالعافيةِ والشفاءِ ويغفرَ لنا خطايانا.',
        },
      ],
    },
    {
      id: 'd-annual-matins-pray-for-travelers',
      title: 'Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲛⲉⲛⲓⲟϯ (Pray for the Travelers)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲛⲉⲛⲓⲟϯ ⲛⲉⲙ ⲛⲉⲛ̀ⲥⲛⲏⲟⲩ ⲉ̀ⲧⲁⲩϣⲉ ⲉ̀ⲡ̀ϣⲉⲙⲙⲟ: ⲓⲉ ⲛⲏⲉⲑⲙⲉⲩ̀ⲓ ⲉ̀ϣⲉ ϧⲉⲛ ⲙⲁⲓ ⲛⲓⲃⲉⲛ: ⲥⲟⲩⲧⲱⲛ ⲛⲟⲩⲙⲱⲓⲧ ⲧⲏⲣⲟⲩ: ⲓ̀ⲧⲉ ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ ⲫⲓⲟⲙ ⲓⲉ ⲛⲓⲓⲁⲣⲱⲟⲩ ⲓⲉ ⲛⲓⲗⲩⲙⲛⲏ ⲓⲉ ⲛⲓⲙⲱⲓⲧ ⲙ̀ⲙⲟϣⲓ: (ⲓⲉ ⲡⲓⲁⲏⲣ) ⲓⲉ ⲉⲩ̀ⲓⲣⲓ ⲙ̀ⲡⲟⲩϫⲓⲛⲙⲟϣⲓ ⲛ̀ⲣⲏϯ ⲛⲓⲃⲉⲛ: ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲧⲁⲥⲑⲱⲟⲩ ⲉ̀ⲛⲏⲉ̀ⲧⲉ ⲛⲟⲩⲟⲩ ⲙ̀ⲙⲁⲛ̀ϣⲱⲡⲓ ϧⲉⲛ ⲟⲩϩⲓⲣⲏⲛⲏ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
        },
        {
          language: 'englishCoptic',
          text: 'Tōbh ejen nenioti nem ne-ensnēou etaushe e-epshemmo: ie nēethme-ui eshe khen mai niven: soutōn noumōit tērou: ite evol hiten fiom ie niiarōou ie nilumnē ie nimōit emmoshi: (ie piaēr) ie e-uiri empoujinmoshi enrēti niven: hina ente Pi-ekhristos Pennouti tasthōou enē-ete nouou emma-enshōpi khen ouhirēnē: entefkha nennovi nan evol.',
        },
        {
          language: 'english',
          text: 'Pray for our fathers and our brethren who are traveling, and those who intend to travel anywhere. Straighten all their ways, whether by sea, rivers, lakes, roads, [air,] or those who are traveling by any other means, that Christ our God may bring them back to their own homes in peace, and forgive us our sins.',
        },
        {
          language: 'englishArabic',
          text: 'Utlubu \'an aba\'ina wa ikhwatina el-musafireen, wal-ladheena yudmiroon es-safar fi kulli mawdi\', likay yusahhil turuqahum ajma\'een, in kana fil-bahr aw el-anhar aw el-buhayrat aw et-turuq el-maslouka, [aw el-jaw] aw el-musafireen bi-kulli naw\', likay el-Maseeh ilahuna yaruddahum ila masakinihim saalimeen, wa yaghfir lana khatayana.',
        },
        {
          language: 'arabic',
          text: 'اطلبوا عن آبائنا وإخوتنا المسافرين، والذين يضمرون السفر في كل موضع، لكي يسهل طرقهم أجمعين إن كان في البحر أو الأنهار أو البحيرات أو الطرق المسلوكة، [أو الجو] أو المسافرين بكل نوعٍ، لكي المسيح إلهنا يردهم إلى مساكنهم سالمين، ويغفر لنا خطايانا.',
        },
      ],
    },
    {
      id: 'd-annual-matins-pray-for-providers',
      title: 'Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲛⲏⲉⲧϥⲓ ⲙ̀ⲫ̀ⲣⲱⲟⲩϣ (Pray for Those Who Provide)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲛⲏⲉⲧϥⲓ ⲙ̀ⲫ̀ⲣⲱⲟⲩϣ ⲛ̀ⲛⲓⲑⲩⲥⲓⲁ ⲛⲓⲡ̀ⲣⲟⲥⲫⲟⲣⲁ ⲛⲓⲁ̀ⲡⲁⲣⲭⲏ ⲛⲓⲛⲉϩ ⲛⲓⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ ⲛⲓⲥ̀ⲕⲉⲡⲁⲥⲙⲁ ⲛⲓϫⲱⲙ ⲛ̀ⲱϣ ⲛⲓⲕⲩⲙⲓⲗⲗⲓⲟⲛ ⲛ̀ⲧⲉ ⲡⲓⲙⲁⲛ̀ⲉⲣϣⲱⲟⲩϣⲓ: ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ϯϣⲉⲃⲓⲱ ⲛⲱⲟⲩ ϧⲉⲛ Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲛ̀ⲧⲉ ⲧ̀ⲫⲉ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
        },
        {
          language: 'englishCoptic',
          text: 'Tōbh ejen nēetfi emefrōoush ennithusia ni-eprosfora ni-aparkhē nineh ni-esthoinoufi ni-eskepasma nijōm enōsh nikumillion ente pima-enershōoushi: hina ente Pi-ekhristos Pennouti tisheviō nōou khen Ierousalēm ente etfe: entefkha nennovi nan evol.',
        },
        {
          language: 'english',
          text: 'Pray for those who provide for the sacrifices, offerings, first fruits, oil, incense, coverings, reading books, and altar vessels, that Christ our God may reward them in the heavenly Jerusalem, and forgive us our sins.',
        },
        {
          language: 'englishArabic',
          text: 'Utlubu \'an el-muhtammeen bis-sa\'a\'id, wal-qarabeen, wal-bukur, waz-zeit, wal-bukhur, was-sutur, wa kutub el-qira\'a, wa awani el-madhbah, likay el-Maseeh ilahuna yukafi\'ahum fi Urushaleem es-sama\'iya, wa yaghfir lana khatayana.',
        },
        {
          language: 'arabic',
          text: 'اطلبوا عن المهتمينَ بالصعائدِ، والقرابينَ، والبكورِ، والزيتِ، والبخورِ، والستورِ، وكتبِ القراءةِ، وأواني المذبحِ، لكي المسيحُ إلهُنا يكافئهم في أورشليمَ السمائيةِ، ويغفرَ لنا خطايانا.',
        },
      ],
    },
    {
      id: 'd-annual-matins-pray-for-the-gospel',
      title: 'Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲟⲩ ⲁ̀ⲅⲓⲟⲩ ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲩ (Pray for the Holy Gospel)',
      versions: [
        { language: 'coptic', text: 'Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲟⲩ ⲁ̀ⲅⲓⲟⲩ ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲩ.' },
        { language: 'englishCoptic', text: 'Proseuksasthe uper tou agiou euaggeliou.' },
        { language: 'english', text: 'Pray for the Holy Gospel.' },
        { language: 'englishArabic', text: 'Sallu min ajl el-Injeel el-Muqaddas.' },
        { language: 'arabic', text: 'صلوا من أجل الإنجيل المقدس.' },
      ],
    },
    {
      id: 'd-annual-matins-stand-in-the-fear-of-god',
      title: 'Ⲥⲧⲁⲑⲏⲧⲉ ⲙⲉⲧⲁ ⲫⲟⲃⲟⲩ Ⲑⲉⲟⲩ (Stand in the Fear of God)',
      versions: [
        { language: 'coptic', text: 'Ⲥⲧⲁⲑⲏⲧⲉ ⲙⲉⲧⲁ ⲫⲟⲃⲟⲩ Ⲑⲉⲟⲩ: ⲁ̀ⲕⲟⲩⲥⲱⲙⲉⲛ ⲧⲟⲩ ⲁ̀ⲅⲓⲟⲩ ⲉⲩⲁⲅⲅⲉⲗⲓⲟⲩ.' },
        { language: 'englishCoptic', text: 'Stathēte meta fovou Theou: akousōmen tou agiou euaggeliou.' },
        { language: 'english', text: 'Stand in the fear of God. Let us hear the Holy Gospel.' },
        { language: 'englishArabic', text: 'Qifu bi-khawf Allah li-sama\' el-Injeel el-Muqaddas.' },
        { language: 'arabic', text: 'قفوا بخوفِ الله لسماعِ الإنجيل المقدس.' },
      ],
    },
    {
      // People and deacon take turns; each speaker is its own paragraph so side by side lines up
      id: 'd-annual-matins-in-christ-jesus-our-lord',
      title: 'Ϧⲉⲛ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲉⲛϭⲟⲓⲥ (In Christ Jesus Our Lord)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲡⲓⲗⲁⲟⲥ:\n\nϦⲉⲛ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲉⲛϭⲟⲓⲥ.\n\nⲠⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲁⲥ ⲕⲉⲫⲁⲗⲁⲥ ⲩ̀ⲙⲱⲛ ⲧⲱ Ⲕⲩⲣⲓⲱ ⲕ̀ⲗⲓⲛⲁⲧⲉ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲈⲛⲱⲡⲓⲟⲛ ⲥⲟⲩ Ⲕⲩⲣⲓⲉ.\n\nⲠⲓⲇⲓⲁⲕⲱⲛ:\n\nⲠⲣⲟⲥⲭⲱⲙⲉⲛ Ⲑⲉⲟⲩ ⲙⲉⲧⲁ ⲫⲟⲃⲟⲩ: ⲁ̀ⲙⲏⲛ.',
        },
        {
          language: 'englishCoptic',
          text: 'Pilaos:\n\nKhen Pi-ekhristos Iēsous Pentshois.\n\nPidiakōn:\n\nTas kefalas umōn tō Kuriō eklinate.\n\nPilaos:\n\nEnōpion sou Kurie.\n\nPidiakōn:\n\nProskhōmen Theou meta fovou: amēn.',
        },
        {
          language: 'english',
          text: 'People:\n\nIn Christ Jesus our Lord.\n\nDeacon:\n\nBow your heads to the Lord.\n\nPeople:\n\nBefore You, O Lord.\n\nDeacon:\n\nLet us attend in the fear of God. Amen.',
        },
        {
          language: 'englishArabic',
          text: 'Esh-sha\'b:\n\nBil-Maseeh Yasou\' Rabbina.\n\nEsh-shammas:\n\nIhnu ru\'usakum lir-Rabb.\n\nEsh-sha\'b:\n\nAmamak ya Rabb.\n\nEsh-shammas:\n\nAnsitu bi-khawf Allah. Ameen.',
        },
        {
          language: 'arabic',
          text: 'الشعب:\n\nبالمسيحِ يسوعِ ربنا.\n\nالشماس:\n\nإحنوا رؤوسَكم للربِ.\n\nالشعب:\n\nأمامك ياربُ.\n\nالشماس:\n\nأنصتوا بخوفِ الله. آمين.',
        },
      ],
    },
  ];
}

// ---- Deacon Responses > Annual > Offering of the Lamb: replace the placeholders with the real responses ----
const deaconAnnualOffering = deaconCategories
  .find((c) => c.id === 'deacon-annual')
  ?.services.find((s) => s.id === 'd-annual-offering-lamb');

// Like the Matins prayer, but asking to partake of the Mysteries instead of forgiveness alone
const offeringPrayForMercyCoptic =
  'Ⲧⲱⲃϩ ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲫⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ: ⲛ̀ⲧⲉϥϣⲉⲛϩⲏⲧ ϧⲁⲣⲟⲛ: ⲛ̀ⲧⲉϥⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲛ: ⲛ̀ⲧⲉϥⲉⲣⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲛ: ⲛ̀ⲧⲉϥϭⲓ ⲛ̀ⲛⲓϯϩⲟ ⲛⲉⲙ ⲛⲓⲧⲱⲃϩ ⲛ̀ⲧⲉ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲛ̀ⲧⲁϥ ⲛ̀ⲧⲟⲧⲟⲩ ⲉ̀ϩⲣⲏⲓ ⲉ̀ϫⲱⲛ ⲉ̀ⲡⲓⲁ̀ⲅⲁⲑⲟⲛ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ: ☩ ⲛ̀ⲧⲉϥⲁⲓⲧⲉⲛ ⲛ̀ⲉⲙⲡ̀ϣⲁ ⲉⲑⲣⲉⲛϭⲓ ⲉ̀ⲃⲟⲗϧⲉⲛ ϯⲕⲟⲓⲛⲱⲛⲓⲁ ⲛ̀ⲧⲉ ⲛⲉϥⲙⲩⲥⲧⲏⲣⲓⲟⲛ ⲉⲑⲟⲩⲁⲃ ⲉⲧⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲉ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.';
const offeringPrayForMercyEnglishCoptic =
  'Tōbh hina ente Fnouti nai nan: entefshenhēt kharon: entefsōtem eron: entefervo-ēthin eron: enteftshi ennitiho nem nitōbh ente nēethouab entaf entotou ehrēi ejōn epi-agathon ensēou niven: ☩ entefaiten enemepsha ethrentshi evolkhen tikoinōnia ente nefmustērion ethouab etesmarōout epikhō evol ente nennovi.';
const offeringPrayForMercyEnglish =
  'Pray that God may have mercy and compassion on us, hear us, help us, and accept the supplications and prayers of His saints, for that which is good on our behalf at all times; ☩ and make us worthy to partake of the communion of His holy and blessed Mysteries, for the remission of our sins.';
const offeringPrayForMercyEnglishArabic =
  'Utlubu likay yarhamana Allah, wa yatara\'af \'alayna, wa yasma\'ana, wa yu\'eenana, wa yaqbal su\'alat wa talabat qiddiseeh minhum bis-salah \'anna fi kulli heen, ☩ wa yaj\'alana mustahiqqeen an nanal min sharikat asrarihi el-muqaddasa el-mubaraka, li-maghfirat khatayana.';
const offeringPrayForMercyArabic =
  'اطلبوا لكي يرحمنا الله، ويتراءف علينا، ويسمَعَنَا، ويُعينَنَا، ويَقْبَلَ سؤالات وطلبات قديسيه منهم بالصلاح عنا في كل حين، ☩ ويجعلنا مستحقين أن ننال من شركةِ أسرارِه المقدسة المباركة، لمغفرة خطايانا.';

// The same short responses as in Matins, under their own ids
const fromMatins = (matinsId: string, id: string): Hymn[] => {
  const hymn = deaconAnnualMatins?.hymns.find((h) => h.id === matinsId);
  return hymn ? [{ ...hymn, id, versions: hymn.versions.map((v) => ({ ...v })) }] : [];
};

if (deaconAnnualOffering) {
  deaconAnnualOffering.hymns = [
    {
      id: 'd-annual-offering-lamb-pray-for-the-gifts',
      title: 'Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲱⲛ ⲁ̀ⲅⲓⲱⲛ (Pray for These Holy Gifts)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲱⲛ ⲁ̀ⲅⲓⲱⲛ ⲧⲓⲙⲓⲱⲛ ⲇⲱⲣⲟⲛ ⲧⲟⲩⲧⲱⲛ ⲕⲉ ⲑⲩⲥⲓⲱⲛ ⲏ̀ⲙⲱⲛ ⲕⲉ ⲡ̀ⲣⲟⲥⲫⲉⲣⲟⲛⲧⲱⲛ: Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ.',
        },
        {
          language: 'englishCoptic',
          text: 'Proseuksasthe uper tōn agiōn timiōn dōron toutōn ke thusiōn ēmōn ke eprosferontōn: Kurie ele-ēson.',
        },
        {
          language: 'english',
          text: 'Pray for these holy and precious gifts, our sacrifices, and those who bring them. Lord have mercy.',
        },
        {
          language: 'englishArabic',
          text: 'Sallu min ajl hadhihi el-qarabeen el-muqaddasa el-kareema, wa dahayana wal-ladheena qaddamuha. Ya Rabbu irham.',
        },
        {
          language: 'arabic',
          text: 'صلوا من أجل هذه القرابين المقدسة الكريمة، وضحايانا والذين قدموها. ياربُ إرحَم.',
        },
      ],
    },
    {
      id: 'd-annual-offering-lamb-one-is-the-holy-father',
      title: 'Ⲁ̀ⲙⲏⲛ. Ⲓⲥ Ⲡⲁⲧⲏⲣ ⲁ̀ⲅⲓⲟⲥ (Amen. One Is the Holy Father)',
      versions: [
        {
          language: 'coptic',
          text: 'Ⲁ̀ⲙⲏⲛ. Ⲓⲥ Ⲡⲁⲧⲏⲣ ⲁ̀ⲅⲓⲟⲥ: ⲓⲥ Ⲩ̀ⲓⲟⲥ ⲁ̀ⲅⲓⲟⲥ: ⲉⲛ Ⲡ̀ⲛⲉⲩⲙⲁ Ⲁ̀ⲅⲓⲟⲛ. Ⲁ̀ⲙⲏⲛ.\n\nⲈⲩⲗⲟⲅⲓⲧⲟⲥ Ⲕⲩⲣⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ ⲓⲥ ⲧⲟⲩⲥ ⲉ̀ⲱ̀ⲛⲁⲥ. Ⲁ̀ⲙⲏⲛ.\n\nⲚⲓⲉⲑⲛⲟⲥ ⲧⲏⲣⲟⲩ ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̅ⲟ̅ⲥ̅: ⲙⲁⲣⲟⲩⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ⲛ̀ϫⲉ ⲛⲓⲗⲁⲟⲥ ⲧⲏⲣⲟⲩ: ϫⲉ ⲁ̀ ⲡⲉϥⲛⲁⲓ ⲧⲁϫⲣⲟ ⲉ̀ϩⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲟⲩⲟϩ ϯⲙⲉⲑⲙⲏⲓ ⲛ̀ⲧⲉ Ⲡ̅ⲟ̅ⲥ̅ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ. Ⲁ̀ⲙⲏⲛ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.',
        },
        {
          language: 'englishCoptic',
          text: 'Amēn. Is Patēr agios: is Uios agios: en Epneuma Agion. Amēn.\n\nEulogitos Kurios o Theos is tous e-ōnas. Amēn.\n\nNiethnos tērou esmou e-Eptshois: marou-esmou erof enje nilaos tērou: je a pefnai tajro ehrēi ejōn: ouoh timethmēi ente Eptshois shop sha eneh. Amēn allēlouia.',
        },
        {
          language: 'english',
          text: 'Amen. One is the holy Father, one is the holy Son, one is the Holy Spirit. Amen.\n\nBlessed be the Lord God forever. Amen.\n\nPraise the Lord all you nations, praise Him all you peoples, for His mercy is confirmed upon us, and the truth of the Lord endures forever. Amen alleluia.',
        },
        {
          language: 'englishArabic',
          text: 'Ameen. Wahid huwa el-Ab el-Quddus, wahid huwa el-Ibn el-Quddus, wahid huwa er-Rooh el-Qudus. Ameen.\n\nMubarak er-Rabb el-Ilah ila el-abad. Ameen.\n\nYa jamee\' el-umam barikoo er-Rabb. Wal-tubarikhu jamee\' esh-shu\'ub. Li-anna rahmatahu thubbitat \'alayna. Wa haqq er-Rabb yadoom ila el-abad. Ameen hallelouia.',
        },
        {
          language: 'arabic',
          text: 'آمين. واحد هو الآب القدوس، واحد هو الإبن القدوس، واحد هو الروح القدس. آمين.\n\nمبارك الرب الإله إلى الأبد. آمين.\n\nيا جميع الأمم باركوا الرب. ولتباركه جميع الشعوب. لأن رحمته ثُبِتَت علينا. وحق الرب يدوم إلى الأبد. آمين هلليلويا.',
        },
      ],
    },
    ...fromMatins('d-annual-matins-stand-up-for-prayer', 'd-annual-offering-lamb-stand-up-for-prayer'),
    ...fromMatins('d-annual-matins-pray', 'd-annual-offering-lamb-pray'),
    {
      id: 'd-annual-offering-lamb-pray-for-mercy',
      title: 'Ⲧⲱⲃϩ ϩⲓⲛⲁ (Pray That God May Have Mercy)',
      versions: [
        { language: 'coptic', text: offeringPrayForMercyCoptic },
        { language: 'englishCoptic', text: offeringPrayForMercyEnglishCoptic },
        { language: 'english', text: offeringPrayForMercyEnglish },
        { language: 'englishArabic', text: offeringPrayForMercyEnglishArabic },
        { language: 'arabic', text: offeringPrayForMercyArabic },
      ],
    },
    {
      id: 'd-annual-offering-lamb-pray-for-mercy-pope-bishop',
      title: 'Ⲧⲱⲃϩ ϩⲓⲛⲁ (Pray That God May Have Mercy, in the Presence of the Pope or a Bishop)',
      versions: [
        { language: 'coptic', text: `${offeringPrayForMercyCoptic}\n\n${popeBishopCoptic}` },
        { language: 'englishCoptic', text: `${offeringPrayForMercyEnglishCoptic}\n\n${popeBishopEnglishCoptic}` },
        { language: 'english', text: `${offeringPrayForMercyEnglish}\n\n${popeBishopEnglish}` },
        {
          language: 'englishArabic',
          text: `${offeringPrayForMercyEnglishArabic}\n\nWa an yahfaz hayat wa qiyam abina el-mukarram el-Baba el-Anba (...) wa shareekahu fil-khidma er-rasouliya abina el-usquf (el-mutran) Anba (...).`,
        },
        {
          language: 'arabic',
          text: `${offeringPrayForMercyArabic}\n\nوأن يحفظ حياة وقيام أبينا المكرم البابا الأنبا (...) وشريكه في الخدمة الرسولية أبينا الأسقف (المطران) انبا (...).`,
        },
      ],
    },
  ];
}

// ---- Deacon Responses > Annual > Liturgy of the Word: the same responses as in Matins ----
const deaconAnnualLiturgyWord = deaconCategories
  .find((c) => c.id === 'deacon-annual')
  ?.services.find((s) => s.id === 'd-annual-liturgy-word');

if (deaconAnnualLiturgyWord) {
  deaconAnnualLiturgyWord.hymns = [
    ...fromMatins('d-annual-matins-stand-up-for-prayer', 'd-annual-liturgy-word-stand-up-for-prayer'),
    ...fromMatins('d-annual-matins-pray-for-the-gospel', 'd-annual-liturgy-word-pray-for-the-gospel'),
    ...fromMatins('d-annual-matins-stand-in-the-fear-of-god', 'd-annual-liturgy-word-stand-in-the-fear-of-god'),
  ];
}

// ---- Annual > Midnight Praises: General plus a group for each day of the week ----
// Titles only for now; each hymn's text is added as it comes in
const annualMidnight = seasons
  .find((s) => s.id === 'annual')
  ?.services.find((s) => s.id === 'annual-midnight');

// Sunday: the Adam Psali for the Lord Jesus, sung right before the Sunday Theotokia
const sundayPsaliLordJesus: Hymn = {
  id: 'annual-midnight-sunday-psali-adam-lord-jesus',
  title: 'Ⲁ̀ Ⲫϯ ⲡⲓⲛⲁⲏⲧ (Adam Psali for the Lord Jesus)',
  versions: [
    { language: 'coptic', text: 'Ⲁ̀ Ⲫϯ ⲡⲓⲛⲁⲏⲧ: ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲛⲓⲉ̀ⲱⲛ: ⲡⲓⲛⲓϣϯ ⲛ̀ⲣⲉϥϣⲉⲛϩⲏⲧ: ⲟⲩⲟϩ ⲛ̀ⲁ̀ⲗⲏⲑⲓⲛⲟⲥ.\nⲂⲱⲣⲡ ⲛⲁⲛ ⲙ̀ⲡⲉϥⲥⲁϫⲓ: ⲉ̀ϯϣⲉⲗⲏⲧ ⲙ̀ⲙⲏⲓ: ⲁϥϣⲱⲡⲓ ϧⲉⲛ ⲧⲉⲥⲛⲉϫⲓ: ⲉⲑⲃⲉ ⲡⲉⲛⲟⲩϫⲁⲓ.\n\n+ Ⲅⲉⲛⲛⲉⲑⲓⲥ ⲟ̀ ⲉⲕⲡⲁⲣⲑⲉⲛⲟⲩ: ⲙ̀ⲫ̀ⲣⲏϯ ⲙ̀ⲡⲁⲓⲉ̀ϩⲟⲟⲩ: ϯⲙⲟⲩⲙⲓ ⲛ̀ⲁⲑⲙⲟⲩ: Ⲓⲏ̅ⲥ̅ ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟⲩ.\n+ Ⲇⲁⲩⲓⲇ ⲁ̀ⲙⲟⲩ ⲧⲉⲛⲙⲏϯ: ⲛ̀ϩⲁⲛϫⲱⲙ ⲙ̀ⲯⲁⲗⲓⲁ̀: ⲉ̀ϯⲃⲁⲕⲓ ⲛ̀ⲧⲉ Ⲫϯ: ⲉⲑⲙⲉϩ ⲛ̀ⲉⲩⲗⲟⲅⲓⲁ̀.\n\nⲈⲡⲓⲇⲏ ⲅⲁⲣ ⲁϥϯⲙⲁϯ: ⲉ̀ϣⲱⲡⲓ ⲛ̀ϧⲏⲧⲥ: ⲛ̀ϫⲉ ⲡⲉⲛⲣⲉϥⲥⲱϯ: ⲫⲏⲉ̀ⲧⲁⲩⲥⲉⲙⲛⲏⲧⲥ.\nⲌⲉⲟϣ ⲉ̀ⲙⲁϣⲱ: ⲛ̀ϫⲉ ⲛⲉⲉⲩⲫⲟⲙⲓⲁ̀: ⲡⲁⲣⲁ ⲧ̀ⲏ̀ⲡⲓ ⲙ̀ⲡⲓϣⲱ: ⲱ̀ ⲧⲉⲛⲟ̅ⲥ̅ Ⲙⲁⲣⲓⲁ̀.\n\n+ Ⲏⲡⲡⲉ ⲅⲁⲣ ⲁ̀ⲗⲏⲑⲱⲥ: ⲡⲁⲓⲣⲏϯ ⲟⲛ ⲁϥϫⲱ ⲙ̀ⲙⲟⲥ: ⲛ̀ϫⲉ Ⲏ̀ⲥⲁⲏ̀ⲁⲥ: ⲕⲉ ⲡ̀ⲣⲟⲫⲏⲧⲏⲥ ⲟ̀ⲥⲓⲟⲥ.\n+ Ⲑⲁⲓ ⲧⲉ ϯⲛⲓϣϯ ⲛ̀ϣ̀ⲫⲏⲣⲓ: ⲟⲩⲁ̀ⲗⲟⲩ ⲛⲁⲛ ⲁⲩⲙⲓⲥⲓ: ⲁⲩϯ ⲛⲁⲛ ⲛ̀ⲟⲩϣⲏⲣⲓ: ⲫⲁ ⲡⲓⲥⲟϭⲛⲓ ⲛ̀ϣ̀ⲫⲏⲣⲓ.\n\nⲒⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡⲓϫⲱⲣⲓ: ⲡⲓⲉ̀ⲝⲟⲩⲥⲓⲁⲥⲧⲏⲥ: ⲫⲏⲉ̀ⲣⲉ ⲧⲉϥⲁⲣⲭⲏ: ⲭⲏ ϩⲓϫⲉⲛ ⲛⲉϥⲙⲟⲩϯ ⲧⲏⲣⲥ.\nⲔⲁⲗⲱⲥ ⲟⲛ ⲁϥϫⲟⲥ: ⲛ̀ϫⲉ Ⲓⲉⲍⲉⲕⲓⲏⲗ: ⲉ̀ϫⲉⲛ Ⲙⲁⲥⲓⲁⲥ: ⲡ̀ⲟⲩⲣⲟ ⲙ̀Ⲡⲓ̅ⲥ̅ⲗ̅.\n\n+ Ⲗⲟⲓⲡⲟⲛ ⲁⲓⲛⲁⲩ ⲉ̀ⲟⲩⲡⲩⲗⲏ: ⲛ̀ⲥⲁ ⲛⲓⲙⲁⲛ̀ϣⲁⲓ: ⲉⲥⲧⲟⲃ ϧⲉⲛ ⲟⲩⲧⲉⲃⲥ ⲛ̀ϣ̀ⲫⲏⲣⲓ: Ⲫϯ ⲡⲓⲣⲉϥⲛⲁⲓ.\n+ Ⲙ̀ⲡⲉ ϩ̀ⲗⲓ ϣⲉ ⲉ̀ϧⲟⲩⲛ: ⲉ̀ⲣⲟϥ ⲉ̀ⲃⲏⲗ ⲛ̀ⲑⲟϥ: ⲧⲉⲛϩⲱⲥ ⲛⲁϥ ϧⲉⲛ ⲟⲩⲥ̀ⲙⲟⲩ: ⲕⲁⲧⲁ ⲡⲉⲑⲣⲁⲛⲁϥ.\n\nⲚⲓⲟⲩⲣⲱⲟⲩ ⲛ̀ϩⲁⲛⲙⲁⲅⲟⲥ: ⲁⲩⲓ̀ ⲉ̀ⲃⲟⲗ ⲥⲁ ⲡⲉⲓⲉⲃⲧ: ⲁⲩⲟⲩⲱϣⲧ ⲙ̀Ⲡⲭ̅ⲥ̅: ⲫⲁ ⲡⲓⲣⲁⲛ ⲉⲧⲧⲁⲓⲏ̀ⲟⲩⲧ.\nⲜⲁⲡⲓⲛⲁ ⲁⲩⲟⲩⲱⲛ: ⲛ̀ⲛⲟⲩⲁ̀ϩⲱⲣ ⲁⲩⲓ̀ⲛⲓ: ⲛⲁϥ ⲛ̀ϩⲁⲛⲇⲱⲣⲟⲛ: ⲧ̀ⲣⲓⲁ̀ⲇⲓⲕⲟⲛ ⲁⲩϯⲙⲏⲓⲛⲓ.\n\n+ Ⲟⲩⲗⲓⲃⲁⲛⲟⲥ ϩⲱⲥ ⲛⲟⲩϯ: ⲛⲉⲙ ⲟⲩⲛⲟⲩⲃ ϩⲱⲥ ⲟⲩⲣⲟ: ⲛⲉⲙ ⲟⲩϣⲁⲗ ⲁⲩϯⲙⲏⲓⲛⲓ: ⲉ̀ⲡⲉϥϫⲓⲛⲙⲟⲩ ⲛ̀ⲣⲉϥⲧⲁⲛϧⲟ.\n+ Ⲡⲁⲓⲣⲏϯ ⲛⲓⲟⲩⲣⲱⲟⲩ: ⲛ̀ⲧⲉ ⲛⲓⲀ̀ⲣⲁⲃⲟⲥ: ⲛⲉⲙ ⲛⲓⲙⲁⲛⲉ̀ⲥⲱⲟⲩ: ⲛⲉⲙ Ⲥⲁⲃⲁ ⲛⲉⲙ ⲛⲓⲛⲏⲥⲟⲥ.\n\nⲢⲏⲧⲟⲥ ⲁⲩⲓ̀ⲛⲓ ⲛⲁϥ: ⲛ̀ϩⲁⲛⲇⲱⲣⲟⲛ ⲉⲩϣⲏⲡ: ⲟⲩⲟϩ ⲁⲩⲟⲩⲱϣⲧ ⲙ̀ⲙⲟϥ: ⲕⲁⲧⲁ ϭⲟⲓⲥ ⲛ̀ⲛⲏⲃ.\nⲤⲉ ⲉⲣⲛⲟϥⲣⲓ ⲛⲁⲛ ⲇⲉ ⲟⲛ: ⲁ̀ⲛⲟⲛ ϧⲁ ⲛⲓⲡⲓⲥⲧⲟⲥ: ⲛⲓϫⲱⲣⲓ ⲛ̀ⲅⲉⲛⲛⲉⲟⲥ: ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡⲭ̅ⲥ̅.\n\n+ Ⲧⲉⲛⲑⲟⲩⲏⲧ ⲉⲩⲥⲟⲡ: ϩⲓⲛⲁ ⲛ̀ⲧⲉⲛⲉⲣϣⲁⲓ ⲛⲁϥ: ϧⲉⲛ ⲟⲩϩⲏⲧ ⲉ̀ϥⲟⲩⲁⲃ: ⲟⲩⲟϩ ⲛ̀ⲧⲉⲛⲓ̀ⲛⲓ ⲛⲁϥ.\n+ Ⲩⲙⲛⲟⲥ ⲛⲓⲃⲉⲛ ⲛⲉⲙ ϩⲱⲥ: ⲛⲉⲙ ϩⲁⲛⲇⲟⲝⲟⲗⲟⲅⲓⲁ̀: ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲑⲉⲟ̀ ⲡ̀ⲣⲓⲡⲧⲟⲥ: ϧⲉⲛ ϯⲁⲥⲡⲓ ⲁ̀ⲡⲓⲅⲓⲁ̀.\n\nⲪⲏ ⲅⲁⲣ ⲉ̀ⲧⲁⲩⲙⲁⲥϥ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ⲙⲁⲣⲓⲁ̀: ⲛ̀ⲑⲟϥ ⲡⲉ ⲫⲏⲉ̀ⲧⲁϥⲁϣϥ: ⲉⲑⲃⲉ ⲛⲉⲛⲁ̀ⲛⲟⲙⲓⲁ̀.\nⲬⲱⲗⲉⲙ ⲇⲉ ⲟⲛ ⲁϥⲥⲟⲧⲧⲉⲛ: ⲉ̀ⲃⲟⲗϧⲉⲛ ϯⲑ̀ⲣⲁⲩⲥⲓⲥ: ϩⲓⲧⲉⲛ ⲡⲉϥⲙⲟⲩ ⲁϥⲟⲗⲧⲉⲛ: ⲉ̀ϯ ⲁ̀ⲛⲁⲡⲁⲩⲥⲓⲥ.\n\n+ Ⲯⲩⲭⲏ ⲛⲓⲃⲉⲛ ⲉⲩⲥⲟⲡ: ⲙⲁⲣⲟⲩϭ̀ⲛⲉϫⲱⲟⲩ ⲛⲁϥ: ⲛⲉⲙ ⲡⲉϥⲓⲱⲧ ⲫⲏⲉ̅ⲑ̅ⲩ̅: ⲁ̀ϫⲟⲥ ϧⲉⲛ ⲟⲩⲟⲩⲛⲟϥ.\n+ Ⲱ̀ ⲡⲓⲙⲁⲛⲉ̀ⲥⲱⲟⲩ: ⲛ̀ⲣⲉϥⲛⲟϩⲉⲙ ⲛ̀ⲕⲁⲗⲱⲥ: ϧⲉⲛ ϩⲁⲛϩⲱⲇⲏ ⲛ̀ⲉ̀ⲥⲱⲟⲩ: ⲉⲛϩⲱⲥ ⲛⲁⲕ ⲁⲥ ⲫⲁⲗⲱⲥ.' },
    { language: 'englishCoptic', text: 'A Efnouti pinaēt: epouro enni-eōn: pinishti enrefshenhēt: ouoh enalēthinos.\nVōrp nan empefsaji: etishelēt emmēi: afshōpi khen tesneji: ethve penoujai.\n\n+ Gennethis o ekparthenou: emefrēti empai-ehoou: timoumi enathmou: Iēsous epouro ente epōou.\n+ Dauid amou tenmēti: enhanjōm empsali-a: etivaki ente Efnouti: ethmeh eneulogi-a.\n\nEpidē gar aftimati: eshōpi enkhēts: enje penrefsōti: fē-etausemnēts.\nZeosh emashō: enje neeufomi-a: para etēpi empishō: ō tentshois Mari-a.\n\n+ Ēppe gar alēthōs: pairēti on afjō emmos: enje Ēsa-ēas: ke eprofētēs osios.\n+ Thai te tinishti eneshfēri: ou-alou nan aumisi: auti nan enoushēri: fa pisotshni eneshfēri.\n\nIēsous Pikhristos pijōri: pi-eksousiastēs: fē-ere tefarkhē: khē hijen nefmouti tērs.\nKalōs on afjos: enje Iezekiēl: ejen Masias: epouro em-Pisraēl.\n\n+ Loipon ainau eoupulē: ensa nima-enshai: estob khen outebs eneshfēri: Efnouti pirefnai.\n+ Empe ehli she ekhoun: erof evēl enthof: tenhōs naf khen ou-esmou: kata pethranaf.\n\nNiourōou enhanmagos: au-i evol sa peiebt: auouōsht em-Pikhristos: fa piran ettai-ēout.\nKsapina auouōn: ennou-ahōr au-ini: naf enhandōron: etri-adikon autimēini.\n\n+ Oulivanos hōs nouti: nem ounoub hōs ouro: nem oushal autimēini: epefjinmou enreftankho.\n+ Pairēti niourōou: ente ni-Aravos: nem nimanesōou: nem Sava nem ninēsos.\n\nRētos au-ini naf: enhandōron eushēp: ouoh auouōsht emmof: kata tshois ennēb.\nSe ernofri nan de on: anon kha nipistos: nijōri engenneos: khen efran em-Pikhristos.\n\n+ Tenthouēt eusop: hina entenershai naf: khen ouhēt efouab: ouoh entenini naf.\n+ Umnos niven nem hōs: nem handoksologi-a: emefrēti enthe-o epriptos: khen tiaspi apigi-a.\n\nFē gar etaumasf: evol khen Mari-a: enthof pe fē-etafashf: ethve nenanomi-a.\nKhōlem de on afsotten: evolkhen ti-ethrausis: hiten pefmou afolten: eti anapausis.\n\n+ Psukhē niven eusop: marou-etshnejōou naf: nem pefiōt fēethouab: ajos khen ouounof.\n+ Ō pimanesōou: enrefnohem enkalōs: khen hanhōdē enesōou: enhōs nak as falōs.' },
    { language: 'english', text: 'God the merciful, the King of the ages, the Great and compassionate, and the true one.\nHe sent His Word, to the true bride, and dwelt in her womb, for our salvation.\n\n+ He was born of the Virgin, on this day, the overflowing fountain, Jesus the King of Glory.\n+ O David come in our midst, with your book of Psalms, to the city of God, full of blessing.\n\nOur Savior, who know her, delighted to, dwell in her.\nMany are, your praises, more than the sand of the sea, O Mary our lady.\n\n+ For truly, it was said to us, by Isaiah, the true prophet.\n+ This is a great wonder, unto us a Child is born, unto us a Son is given, of great counsel.\n\nJesus Christ the Mighty, and the government, will be upon, His shoulder.\nTruly indeed, it was said by Ezekiel, about the Messiah, the King of Israel.\n\n+ I also saw, a Gate towards the East, sealed with a mysterious seal, and God the merciful.\n+ No man shall enter it, but Him who did, we praise Him with praises, that befits Him.\n\nThe kings of the Magi, came from the East, and worshiped the Christ, whose name is honored.\nTruly, they opened their gifts, and offered unto him, three offerings.\n\n+ Frankincense a symbol of divinity, gold for his kingship, and Myrrh a symbol, of his life-giving death.\n+ Also the kings, of the arabs, and the shepherds, and Saba and Algeria.\n\nTruly they offered to Him, acceptable offerings, they worshiped Him, as a Lord and Master.\nWe also the believers, the strong and the brave, ought to, in the name of Christ.\n\n+ To gather together, to celebrate for Him, with a pure heart, and offer unto Him.\n+ All exaltation and praise, glorification and honor, as befits God, with pure tongues.\n\nFor He who was, born of Mary, was crucified, for our sins.\nHurry and save us, from our enemies, O who by His death, carried our sins.\n\n+ Let all souls give, reverence to Him, with His Holy Father, and say with joy.\n+ O Shepherd and Savior, we sing unto you, and give praise to you, incessantly.' },
    { language: 'englishArabic', text: 'Allah er-rahoum malik ed-duhour el-\'azeem el-mutahannin wal-haqiqi.\nArsala lana kalimatahu ila el-\'arous el-haqiqiya wa halla fi batniha min ajl khalasina.\n\n+ Wulida min el-\'adhra\' fi mithl hadha el-yawm el-yanbou\' ghayr en-nadib Yasou\' malik el-majd.\n+ Ya Dawoud ta\'ala fi wasatina bi-kitab mazameerika ila madeenat Allah el-mamlou\'a baraka.\n\nIdh surra an yahill feeha mukhallisuna alladhi atqanaha.\nKatheera jiddan hiya mada\'ihuki akthar min \'adad er-raml ya sayyidatana Maryam.\n\n+ Li-annahu hakadha bil-haqiqa aydan qal Ash\'iya\' en-nabi el-kamil.\n+ Hadhihi u\'jouba \'azeema ghulam wulida lana wa ibnan a\'taynahu huwa sahib el-mashoura el-\'uzma.\n\nYasou\' el-Maseeh el-mutasallit el-qawi alladhi sultanuhu \'ala mankibayh.\nHasanan qal aydan Hizqiyal \'ala el-Masiya malik Isra\'eel.\n\n+ Wa aydan ra\'aytu baban nahiyat el-mashariq makhtouman bi-khatam \'ajeeb wa Allah er-rahoum.\n+ Lam yadkhulhu ahad ghayruhu nusabbihuhu tasbeehan kama yurdeeh.\n\nAta mulouk el-Majous min el-mashriq wa sajadou lil-Maseeh dhi el-ism el-mukarram.\nHaqqan fatahou kunouzahum wa qaddamou lahu qarabeen thalatha.\n\n+ Lubanan \'alama \'ala uluhiyatihi wa dhahaban ishara ila annahu malik wa murran ishara ila mawtihi el-muhyi.\n+ Wa hakadha mulouk el-\'Arab war-ru\'ah wa Saba wal-jaza\'ir.\n\nHaqqan qaddamou lahu qarabeen maqboula wa sajadou lahu ka-Rabb wa sayyid.\nNa\'am yajib \'alayna nahnu aydan ma\'shar el-mu\'mineen el-ashidda\' esh-shuj\'an bi-ism el-Maseeh.\n\n+ An najtami\' ma\'an likay nu\'ayyid lahu bi-qalb tahir wa nuqaddim lahu.\n+ Kull et-tamajeed wa tasbeeh wa karamat bil-ilah bi-alsina tahira.\n\nLi-anna alladhi wulida min Maryam huwa alladhi sulib min ajl athamina.\nAsri\' aydan wa khallisna min a\'da\'ina ya man bi-mawtihi ihtamal alamana.\n\n+ Faltakhda\' kull el-anfus lahu ma\'a abeeka el-quddous wal-naqul bi-farah.\n+ Ayyuha er-ra\'i el-mukhallis hasanan nurattil lak wa nusabbihuk bi-ghayr futour.' },
    { language: 'arabic', text: 'الله الرحوم ملك الدهور العظيم المتحنن والحقيقي.\nأرسل لنا كلمته إلي العروس الحقيقية وحل في بطنها من أجل خلاصنا.\n\n+ ولد من العذراء في مثل هذا اليوم الينبوع الغير الناضب يسوع ملك المجد.\n+ يا داود تعال في وسطنا بكتاب مزاميرك إلي مدينة الله المملوءة بركة.\n\nاذ سر أن يحل فيها مخلصنا الذي اتقنها.\nكثيرة جداً هي مدائحك أكثر من عدد الرمل يا سيدتنا مريم.\n\n+ لانه هكذا بالحقيقة أيضاً قال أشعياء النبي الكامل.\n+ هذه أعجوبة عظيمة غلام ولد لنا وابناً أعطيناه هو صاحب المشورة العظمي.\n\nيسوع المسيح المتسلط القوي الذي سلطانه علي منكبيه.\nحسناً قال ايضاً حزقيال علي الماسيا ملك اسرائيل.\n\n+ وأيضاًُ رأيت باباُ ناحية المشارق مختوماً بخاتم عجيب والله الرحوم.\n+ لم يدخله أحد غيرة نسبحه تسبيحاً كما يرضيه.\n\nأتي ملوك المجوس من المشرق وسجدوا للمسيح ذي الاسم المكرم.\nحقاً فتحوا كنوزهم وقدموا له قرابين ثلاثة.\n\n+ لباناً علامة علي الوهيتة وذهباً اشارة الي انه ملك ومراً اشارة الي موته المحيي.\n+ وهكذا ملوك العرب والرعاة وسابا والجزائر.\n\nحقاً قدموا له قرابين مقبولة وسجدوا له كرب وسيد.\nنعم يجب علينا نحن ايضاً معشر المؤمنين الأشداء الشجعان بأسم المسيح.\n\n+ أن نجتمع معاً لكي نعيد له بقلب طاهر ونقدم له.\n+ كل التماجيد وتسبيح وكرامات بالإله بألسنة طاهرة.\n\nلان الذي ولد من مريم هو الذي صلب من أجل اثامنا.\nاسرع أيضاً وخلصنا من أعدئنا يا من بموته احتمل آلامنا.\n\n+ فلتخضع كل الانفس له مع أبيك القدوس ولنقل بفرح.\n+ أيها الراعي المخلص حسناً نرتل لك ونسبحك بغير فتور.' },
  ],
};

// The Conclusion of the Adam Psali, sung before the Theotokia on Adam days
const adamPsaliConclusion = (day: string): Hymn => ({
  id: `annual-midnight-${day}-adam-psali-conclusion`,
  title: 'Ⲗⲟⲓⲡⲟⲛ ⲁⲛϣⲁⲛⲑⲱⲟⲩϯ (Conclusion of the Adam Psali)',
  versions: [
    { language: 'coptic', text: 'Ⲗⲟⲓⲡⲟⲛ ⲁⲛϣⲁⲛⲑⲱⲟⲩϯ: ⲉ̀ϯⲡ̀ⲣⲟⲥⲉⲩⲭⲏ: ⲙⲁⲣⲉⲛⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲣⲁⲛ: ⲛ̀ⲧⲉ Ⲡⲁϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ.\n\nϪⲉ ⲧⲉⲛⲛⲁⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲕ: ⲱ̀ Ⲡⲁϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ: ⲛⲁϩⲙⲉⲛ ϧⲉⲛ ⲡⲉⲕⲣⲁⲛ: ϫⲉ ⲁⲛⲉⲣϩⲉⲗⲡⲓⲥ ⲉ̀ⲣⲟⲕ.\n\nⲈⲑⲣⲉⲛϩⲱⲥ ⲉ̀ⲣⲟⲕ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲧⲱⲛⲕ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ.\n\nⲆⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩ̀ⲓⲱ: ⲕⲉ Ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ: ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ: ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ.' },
    { language: 'englishCoptic', text: 'Loipon anshanthōouti: eti-eproseukhē: marenesmou epiran: ente Patshois Iēsous.\n\nJe tenna-esmou erok: ō Patshois Iēsous: nahmen khen pekran: je anerhelpis erok.\n\nEthrenhōs erok: nem Pekiōt enagathos: nem Pi-epneuma ethouab: je aktōnk aksōti emmon.\n\nDoksa Patri ke Uiō: ke Agiō Epneumati: ke nun ke a-i ke is tous: e-ōnas tōn e-ōnōn amēn.' },
    { language: 'english', text: 'And whenever we, gather for prayer, let us bless the name, of my Lord Jesus.\n\nWe bless You, O my Lord Jesus, deliver us through Your name, for we have hope in You.\n\nThat we may praise You, with Your good Father, and the Holy Spirit, for You have risen and saved us.\n\nGlory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen.' },
    { language: 'englishArabic', text: 'Wa aydan idha ma ijtama\'na, lis-salah, falnubarik ism, Rabbi Yasou\'.\n\nLi-annana nubarikuk, ya Rabbi Yasou\', najjina bi-ismik, li-annana tawakkalna \'alayk.\n\nLikay nusabbihuk, ma\'a abeeka es-saleh, war-Rooh el-Qudus, li-annaka qumta wa khallastana.\n\nEl-majd lil-Ab wal-Ibn, war-Rooh el-Qudus, el-an wa kulla awan, wa ila dahr ed-duhour ameen.' },
    { language: 'arabic', text: 'وأيضاً إذا ما إجتمعنا، للصلاة، فلنبارك إسم، ربي يسوع.\n\nلأننا نباركك، يا ربي يسوع، نجنا بإسمك، لأننا توكلنا عليك.\n\nلكي نسبحك، مع أبيك الصالح، والروح القدس، لأنك قُمت وخلصتنا.\n\nالمجد للآب والإبن، والروح القدس، الآن وكل أوان، وإلى دهر الدهور آمين.' },
  ],
});
// The Conclusion of the Watos Psali, sung before the Theotokia on Watos days
const watosPsaliConclusion = (day: string): Hymn => ({
  id: `annual-midnight-${day}-watos-psali-conclusion`,
  title: 'Ⲉϣⲱⲡ ⲁⲛϣⲁⲛⲉⲣⲯⲁⲗⲓⲛ (Conclusion of the Watos Psali)',
  versions: [
    { language: 'coptic', text: 'Ⲉϣⲱⲡ ⲁⲛϣⲁⲛⲉⲣⲯⲁⲗⲓⲛ: ⲙⲁⲣⲉⲛϫⲟⲥ ϧⲉⲛ ⲟⲩϩ̀ⲗⲟϫ: ϫⲉ ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ: ⲁ̀ⲣⲓⲟⲩⲛⲁⲓ ⲛⲉⲙ ⲛⲉⲛⲯⲩⲭⲏ.\n\nⲆⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩ̀ⲓⲱ: ⲕⲉ Ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ: ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ: ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ.' },
    { language: 'englishCoptic', text: 'Eshōp anshanerpsalin: marenjos khen ou-ehloj: je pentshois Iēsous Pikhristos: ariounai nem nenpsukhē.\n\nDoksa Patri ke Uiō: ke Agiō Epneumati: ke nun ke a-i ke is tous: e-ōnas tōn e-ōnōn amēn.' },
    { language: 'english', text: 'And whenever we sing, let us say tenderly, "Our Lord Jesus Christ, have mercy upon our souls."\n\nGlory to the Father and the Son, and the Holy Spirit, now and forever and unto the ages of the ages, Amen.' },
    { language: 'englishArabic', text: 'Idha ma rattalna, falnaqul bi-\'udhouba, ya Rabbana Yasou\' el-Maseeh, isna\' rahma ma\'a nufousina.\n\nEl-majd lil-Ab wal-Ibn, war-Rooh el-Qudus, el-an wa kulla awan, wa ila dahr ed-dahireen ameen.' },
    { language: 'arabic', text: 'إذا ما رتلنا. فلنقل بعذوبة. يا ربنا يسوع المسيح. اصنع رحمة مع نفوسنا.\n\nالمجد للآب والابن. والروح القدس. الآن وكل أوان. والى دهر الداهرين آمين.' },
  ],
});


// Text of the Sunday Theotokia, by part number (parts not listed here are titles only for now)
const sundayTheotokiaTexts: Record<number, LanguageVersion[]> = {
  1: [
    { language: 'coptic', text: 'Ⲥⲉⲙⲟⲩϯ ⲉ̀ⲣⲟ ⲇⲓⲕⲉⲟⲥ: ⲱ̀ ⲑⲏⲉⲧⲥ̀ⲙⲁⲣⲱⲟⲩⲧ: ϧⲉⲛ ⲛⲓϩⲓⲟⲙⲓ: ϫⲉ ϯⲙⲁϩⲥ̀ⲛⲟⲩϯ ⲛ̀ⲥ̀ⲕⲏⲛⲏ.\n\n+ Ⲑⲏⲉ̀ⲧⲟⲩⲙⲟⲩϯ ⲉ̀ⲣⲟⲥ: ϫⲉ ⲑⲏⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲧⲉ ⲛⲏⲉⲑⲟⲩⲁⲃ: ⲉ̀ⲣⲉ ⲛⲓⲡ̀ⲗⲁⲝ ⲛ̀ϧⲏⲧⲥ.\n\nⲚ̀ⲧⲉ ϯⲇⲓⲁⲑⲏⲕⲏ: ⲛⲉⲙ ⲡⲓⲙⲏⲧ ⲛ̀ⲥⲁϫⲓ: ⲛⲁⲓ ⲉ̀ⲧⲁϥⲥ̀ϧⲏⲧⲟⲩ: ⲛ̀ϫⲉ ⲡⲓⲧⲏⲃ ⲛ̀ⲧⲉ Ⲫ̀ⲛⲟⲩϯ.\n\n+ Ⲥⲉⲉⲣϣⲟⲣⲡ ⲛ̀ⲉⲣⲥⲩⲙⲙⲉⲛⲓⲛ: ⲛⲁⲛ ⲙ̀Ⲡⲓⲓⲱⲧⲁ: ⲡⲓⲣⲁⲛ ⲛ̀ⲟⲩϫⲁⲓ: ⲛ̀ⲧⲉ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ.\n\nⲪⲁⲓ ⲉ̀ⲧⲁϥϭⲓⲥⲁⲣⲝ ⲛ̀ϧⲏϯ: ϧⲉⲛ ⲟⲩⲙⲉⲧⲁⲧϣⲓⲃϯ: ⲁϥϣⲱⲡⲓ ⲙ̀Ⲙⲉⲥⲓⲧⲏⲥ: ⲉⲩⲇⲓⲁⲑⲏⲕⲏ ⲙ̀ⲃⲉⲣⲓ.\n\n+ Ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ ⲫ̀ⲛⲟⲩϫϧ: ⲛ̀ⲧⲉ Ⲡⲉϥⲥ̀ⲛⲟϥ ⲉⲑⲟⲩⲁⲃ: ⲁϥⲧⲟⲩⲃⲟ ⲛ̀ⲛⲏⲉⲑⲛⲁϩϯ: ⲉⲩⲗⲁⲟⲥ ⲉⲩⲑ̀ⲙⲁⲓⲟϥ.\n\nⲈⲑⲃⲉ ⲫⲁⲓ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ: ⲥⲉϭⲓⲥⲓ ⲙ̀ⲙⲟ: ⲧⲁϭⲟⲓⲥ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.\n\n+ Ⲁ̀ⲛⲟⲛ ϩⲱⲛ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.\n\nⲚⲓⲙ ⲡⲉⲑⲛⲁϣ̀ⲥⲁϫⲓ: ⲙ̀ⲡ̀ⲧⲁⲓⲟ ⲛ̀ϯⲥ̀ⲕⲏⲛⲏ: ⲉ̀ⲧⲁ Ⲙⲱⲩ̀ⲥⲏⲥ ⲑⲁⲙⲓⲟⲥ: ϩⲓϫⲉⲛ ⲡ̀ⲧⲱⲟⲩ ⲛ̀Ⲥⲓⲛⲁ.\n\n+ Ⲁϥⲑⲁⲙⲓⲟⲥ ϧⲉⲛ ⲟⲩⲱ̀ⲟⲩ: ⲕⲁⲧⲁ ⲡ̀ⲥⲁϫⲓ ⲙ̀Ⲡ̀ϭⲟⲓⲥ: ⲛⲉⲙ ⲕⲁⲧⲁ ⲛⲓⲧⲩⲡⲟⲥ ⲧⲏⲣⲟⲩ: ⲉ̀ⲧⲁⲩⲧⲁⲙⲟϥ ⲉ̀ⲣⲱⲟⲩ.\n\nⲐⲏ ⲉ̀ⲣⲉ Ⲁ̀ⲁ̀ⲣⲱⲛ: ⲛⲉⲙ ⲛⲉϥϣⲏⲣⲓ ϣⲉⲙϣⲓ ⲛ̀ϧⲏⲧⲥ: ϧⲉⲛ ⲡ̀ⲧⲩⲡⲟⲥ ⲛ̀ⲧⲉ ⲡ̀ϭⲓⲥⲓ: ⲛⲉⲙ ⲧ̀ϧⲏⲓⲃⲓ ⲛ̀ⲧⲉ ⲛⲁ ⲧ̀ⲫⲉ.\n\n+ Ⲁⲩⲧⲉⲛⲑⲱⲛⲓ ⲉ̀ⲣⲟⲥ: Ⲙⲁⲣⲓⲁ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ϯⲥ̀ⲕⲏⲛⲏ ⲙ̀ⲙⲏⲓ: ⲉ̀ⲣⲉ Ⲫ̀ⲛⲟⲩϯ ⲥⲁϧⲟⲩⲛ ⲙ̀ⲙⲟⲥ.\n\nⲈⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛϭⲓⲥⲓ: ⲙ̀ⲙⲟ ⲁⲝⲓⲱⲥ: ϧⲉⲛ ϩⲁⲛⲩⲙⲛⲟⲗⲟⲅⲓⲁ: ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ.\n\n+ Ϫⲉ ⲁⲩⲥⲁϫⲓ ⲉⲑⲃⲏϯ: ⲛ̀ϩⲁⲛϩ̀ⲃⲏⲟⲩⲓ̀ ⲉⲩⲧⲁⲓⲏⲟⲩⲧ: ϯⲃⲁⲕⲓ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲧⲉ ⲡⲓⲛⲓϣϯ ⲛ̀Ⲟⲩⲣⲟ.\n\nⲦⲉⲛϯϩⲟ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.' },
    { language: 'englishCoptic', text: 'Semouti ero dikeos: ō thēetesmarōout: khen nihiomi: je timahesnouti eneskēnē.\n\n+ Thē-etoumouti eros: je thēethouab: ente nēethouab: ere ni-eplaks enkhēts.\n\nEnte tidiathēkē: nem pimēt ensaji: nai etafeskhētou: enje pitēb ente Efnouti.\n\n+ Seershorp enersummenin: nan em-Piiōta: piran enoujai: ente Iēsous Pi-ekhristos.\n\nFai etaftshisarks enkhēti: khen oumetatshibti: afshōpi em-Mesitēs: eudiathēkē emveri.\n\n+ Evol hiten efnoujkh: ente Pefesnof ethouab: aftouvo ennēethnahti: eulaos eu-ethmaiof.\n\nEthve fai ouon niven: setshisi emmo: tatshois Tithe-otokos: ethouab ensēou niven.\n\n+ Anon hōn tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.\n\nNim pethna-eshsaji: emeptaio enti-eskēnē: eta Mō-usēs thamios: hijen eptōou en-Sina.\n\n+ Afthamios khen ou-ōou: kata epsaji em-Eptshois: nem kata nitupos tērou: etautamof erōou.\n\nThē ere A-arōn: nem nefshēri shemshi enkhēts: khen eptupos ente eptshisi: nem etkhēivi ente na etfe.\n\n+ Autenthōni eros: Maria Tiparthenos: ti-eskēnē emmēi: ere Efnouti sakhoun emmos.\n\nEthve fai tentshisi: emmo aksiōs: khen hanumnologia: emeprofētikon.\n\n+ Je ausaji ethvēti: enhanehvēou-i eutaiēout: tivaki ethouab: ente pinishti en-Ouro.\n\nTentiho tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.' },
    { language: 'english', text: 'You are called righteous, O blessed one, among women, the second tabernacle.\n\n+ Which is called, the holy of holies, wherein are the tablets, of the covenant.\n\nWhereupon is, the ten commandments, these which are written, by the finger of God.\n\n+ They have directed us, to the Iota, the name of salvation, of Jesus Christ.\n\nWho was incarnate, of you without change, and became the Mediator, of a new covenant.\n\n+ Through the shedding, of His holy Blood, He purified the faithful, to be a justified people.\n\nWherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.\n\n+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.\n\nWho can speak of, the honor of the tabernacle, which Moses had made, on Mount Sinai.\n\n+ He made it with glory, as commanded by the Lord, according to the patterns, shown unto him.\n\nTherein Aaron, and his sons served, the example of the highest, in the shadow of the heavenly ones.\n\n+ They likened it to you, O Virgin Mary, the true tabernacle, wherein dwelt God.\n\nWherefore we, magnify you befittingly, with prophetic, hymnology.\n\n+ For they spoke of you, with great honor, O holy city, of the great King.\n\nWe entreat and pray, that we may win mercy, through your intercessions, with the Lover of Mankind.' },
    { language: 'englishArabic', text: 'Mad\'ouwa siddeeqa, ayyatuha el-mubaraka, fin-nisa\', el-qubba eth-thaniya.\n\n+ Allati tud\'a, quds el-aqdas, wa feeha, lawha el-\'ahd.\n\nWal-\'ashr, el-kalimat, hadhihi el-maktouba, bi-isba\' Allah.\n\n+ Sabaqat an dallatna, \'ala el-youta, ism el-khalas, alladhi li-Yasou\' el-Maseeh.\n\nHadha alladhi tajassada, minki bi-ghayr taghyeer, wa sara waseetan, li-\'ahdin jadeed.\n\n+ Min qibal rashash, damihi el-muqaddas, tahhara el-mu\'mineen, sha\'ban mubarraran.\n\nMin ajl hadha, kullu wahid yu\'azzimuki, ya sayyidati walidat el-ilah, el-qiddisa kulla heen.\n\n+ Wa nahnu aydan natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.\n\nMan yaqdir an yantiq, bi-karamat el-qubba, allati sana\'aha Mousa, \'ala jabal Sina\'.\n\n+ Sana\'aha bi-majd, ka-qawl er-Rabb, wa ka-jamee\' el-mithalat, allati u\'linat lahu.\n\nTilka allati kana, Haroun wa banouhu yakhdimoun feeha, bi-mithal el-\'ala\', wa zill es-sama\'iyat.\n\n+ Shabbahouki biha, ya Maryam el-\'adhra\', el-qubba el-haqiqiya, allati fi dakhiliha Allah.\n\nMin ajl hadha, nu\'azzimuki, bi-stihqaq, bi-tamajeed nabawiya.\n\n+ Li-annahum takallamou, min ajliki bi-a\'mal kareema, ayyatuha el-madeena el-muqaddasa, allati lil-malik el-\'azeem.\n\nNas\'al wa natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.' },
    { language: 'arabic', text: 'مدعوة صديقة، أيتها المباركة، في النساء، القبة الثانية.\n\n+ التي تدعى، قدس الأقداس، وفيها، لوحا العهد.\n\nوالعشر، الكلمات، هذة المكتوبة، بأصبع الله.\n\n+ سبقت أن دلتنا، على اليوطة، إسم الخلاص، الذي ليسوع المسيح.\n\nهذا الذي تجسد، منكِ بغير تغيير، وصار وسيطاً، لعهدٍ جديد.\n\n+ من قِبَل رشاش، دمه المقدس، طهر المؤمنين، شعباً مبرراً.\n\nمن أجل هذا، كل واحد يعظمِك، يا سيدتي والدة الإله، القديسة كل حين.\n\n+ ونحن أيضاً نطلب، أن نفوز برحمة، بشفاعاتِك، عند محب البشر.\n\nمن يقدر أن ينطق، بكرامة القبة، التي صنعها موسى، على جبل سيناء.\n\n+ صنعها بمجد، كقول الرب، وكجميع المثالات، التي أعلنت له.\n\nتلك التي كان، هرون وبنوة يخدمون فيها، بمثال العلاء، وظِل السمائيات.\n\n+ شبهوكِ بها، يا مريم العذراء، القبة الحقيقية، التي في داخلها الله.\n\nمن أجل هذا، نعظمِك، بإستحقاقٍ، بتماجيد نبوية.\n\n+ لأنهم تكلموا، من أجلِك بأعمال كريمة، أيتها المدينة المقدسة، التي للملك العظيم.\n\nنسأل ونطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر.' },
  ],
  2: [
    { language: 'coptic', text: '+ Ϯⲕⲓⲃⲱⲧⲟⲥ ⲉⲧⲟϣϫ: ⲛ̀ⲛⲟⲩⲃ ⲛ̀ⲥⲁⲥⲁ ⲛⲓⲃⲉⲛ: ⲑⲏⲉ̀ⲧⲁⲩⲑⲁⲙⲓⲟⲥ: ϧⲉⲛ ϩⲁⲛϣⲉ ⲛ̀ⲁⲧⲉⲣϩⲟⲗⲓ.\n\nⲀⲥⲉⲣϣⲟⲣⲡ ⲛ̀ϯⲙⲏⲓⲛⲓ: ⲙ̀Ⲫ̀ⲛⲟⲩϯ Ⲡⲓⲗⲟⲅⲟⲥ: ⲫⲏⲉ̀ⲧⲁϥϣⲱⲡⲓ ⲛ̀ⲣⲱⲙⲓ: ϧⲉⲛ ⲟⲩⲙⲉⲧⲁⲧⲫⲱⲣϫ.\n\n+ Ⲟⲩⲁⲓ ⲡⲉ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲥ̀ⲛⲁⲩ: ⲟⲩⲙⲉⲑⲛⲟⲩϯ ⲉⲥⲧⲟⲩⲃⲏⲟⲩⲧ: ⲉⲥⲟⲓ ⲛ̀ⲁⲧⲧⲁⲕⲟ: ⲛ̀ⲟ̀ⲙⲟⲟⲩⲥⲓⲟⲥ ⲛⲉⲙ Ⲫ̀ⲓⲱⲧ.\n\nⲚⲉⲙ ⲟⲩⲙⲉⲧⲣⲱⲙⲓ ⲉⲑⲟⲩⲁⲃ: ⲭⲱⲣⲓⲥ ⲥⲩⲛⲟⲩⲥⲓⲁ: ⲛ̀ⲟ̀ⲙⲟⲟⲩⲥⲓⲟⲥ ⲛⲉⲙⲁⲛ: ⲕⲁⲧⲁ ϯⲟⲓⲕⲟⲛⲟⲙⲓⲁ.\n\n+ Ⲑⲁⲓⲉ̀ⲧⲁϥϭⲓⲧⲥ ⲛ̀ϧⲏϯ: ⲱ̀ ϯⲁⲧⲑⲱⲗⲉⲃ: ⲉ̀ⲁϥϩⲱⲧⲡ ⲉ̀ⲣⲟⲥ: ⲕⲁⲧⲁ ⲟⲩϩⲩⲡⲟⲥⲧⲁⲥⲓⲥ.\n\nⲈⲑⲃⲉ ⲫⲁⲓ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ: ⲥⲉϭⲓⲥⲓ ⲙ̀ⲙⲟ: ⲧⲁϭⲟⲓⲥ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.\n\n+ Ⲁ̀ⲛⲟⲛ ϩⲱⲛ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.\n\nⲮⲩⲭⲏ ⲛⲓⲃⲉⲛ ⲉⲩⲥⲟⲡ: ⲛ̀ⲧⲉ ⲛⲉⲛϣⲏⲣⲓ ⲙ̀Ⲡⲓⲥⲣⲁⲏⲗ: ⲁⲩⲓ̀ⲛⲓ ⲛ̀ϩⲁⲛⲇⲱⲣⲟⲛ: ⲉ̀ϯⲥ̀ⲕⲏⲛⲏ ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ.\n\n+ Ⲡⲓⲛⲟⲩⲃ ⲛⲉⲙ ⲡⲓϩⲁⲧ: ⲛⲉⲙ ⲡⲓⲱ̀ⲛⲓ ⲙ̀ⲙⲏⲓ: ⲛⲉⲙ ⲡⲓϣⲉⲛⲥ ⲉⲧⲥⲁϯ: ⲛⲉⲙ ⲡⲓϩⲩⲁ̀ⲕⲩⲛⲑⲓⲛⲟⲛ.\n\nⲀⲩⲑⲁⲙⲓⲟ ⲛ̀ⲟⲩⲕⲓⲃⲱⲧⲟⲥ: ϧⲉⲛ ϩⲁⲛϣⲉ ⲛ̀ⲁⲧⲉⲣϩⲟⲗⲓ: ⲁⲩⲗⲁⲗⲱⲥ ⲛ̀ⲛⲟⲩⲃ: ⲥⲁϧⲟⲩⲛ ⲛⲉⲙ ⲥⲁⲃⲟⲗ.\n\n+ Ⲧⲉϫⲟⲗϩ ⲅⲁⲣ ϩⲱⲓ: Ⲙⲁⲣⲓⲁ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲙ̀ⲡ̀ⲱ̀ⲟⲩ ⲛ̀ⲧⲉ ϯⲙⲉⲑⲛⲟⲩϯ: ⲥⲁϧⲟⲩⲛ ⲛⲉⲙ ⲥⲁⲃⲟⲗ.\n\nϪⲉ ⲁ̀ⲣⲉⲓ̀ⲛⲓ ⲉ̀ϧⲟⲩⲛ: ⲛ̀ⲟⲩⲗⲁⲟⲥ ⲉϥⲟϣ: ⲙ̀Ⲫ̀ⲛⲟⲩϯ Ⲡⲉϣⲏⲣⲓ: ϩⲓⲧⲉⲛ ⲡⲉⲧⲟⲩⲃⲟ.\n\n+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛϭⲓⲥⲓ: ⲙ̀ⲙⲟ ⲁⲝⲓⲱⲥ: ϧⲉⲛ ϩⲁⲛⲩⲙⲛⲟⲗⲟⲅⲓⲁ: ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ.\n\nϪⲉ ⲁⲩⲥⲁϫⲓ ⲉⲑⲃⲏϯ: ⲛ̀ϩⲁⲛϩ̀ⲃⲏⲟⲩⲓ̀ ⲉⲩⲧⲁⲓⲏⲟⲩⲧ: ϯⲃⲁⲕⲓ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲧⲉ ⲡⲓⲛⲓϣϯ ⲛ̀Ⲟⲩⲣⲟ.\n\n+ Ⲧⲉⲛϯϩⲟ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.' },
    { language: 'englishCoptic', text: '+ Tikivōtos etoshj: ennoub ensasa niven: thē-etauthamios: khen hanshe enaterholi.\n\nAsershorp entimēini: em-Efnouti Pilogos: fē-etafshōpi enrōmi: khen oumetatfōrj.\n\n+ Ouai pe evol khen esnau: oumethnouti estouvēout: esoi enattako: enomoousios nem Efiōt.\n\nNem oumetrōmi ethouab: khōris sunousia: enomoousios neman: kata tioikonomia.\n\n+ Thai-etaftshits enkhēti: ō tiatthōleb: eafhōtp eros: kata ouhupostasis.\n\nEthve fai ouon niven: setshisi emmo: tatshois Tithe-otokos: ethouab ensēou niven.\n\n+ Anon hōn tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.\n\nPsukhē niven eusop: ente nenshēri em-Pisraēl: au-ini enhandōron: eti-eskēnē ente Eptshois.\n\n+ Pinoub nem pihat: nem pi-ōni emmēi: nem pishens etsati: nem pihu-akunthinon.\n\nAuthamio enoukivōtos: khen hanshe enaterholi: aulalōs ennoub: sakhoun nem savol.\n\n+ Tejolh gar hōi: Maria Tiparthenos: emepōou ente timethnouti: sakhoun nem savol.\n\nJe are-ini ekhoun: enoulaos efosh: em-Efnouti Peshēri: hiten petouvo.\n\n+ Ethve fai tentshisi: emmo aksiōs: khen hanumnologia: emeprofētikon.\n\nJe ausaji ethvēti: enhanehvēou-i eutaiēout: tivaki ethouab: ente pinishti en-Ouro.\n\n+ Tentiho tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.' },
    { language: 'english', text: '+ The ark overlaid, roundabout with gold, that was made, with wood that would not decay.\n\nIt foretold the sign, of God the Word, who became man, without separation.\n\n+ One nature out of two, a holy divinity, co-essential with the Father, and incorruptible.\n\nA holy humanity, begotten without seed, co-essential with us, according to the Economy.\n\n+ This which He has taken, from you O undefiled, He made one with Him, as a hypostasis.\n\nWherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.\n\n+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.\n\nAll the souls together, of the children of Israel, brought offering unto, the tabernacle of the Lord.\n\n+ Gold and silver, and precious stone, purple and scarlet, and fine linen.\n\nAnd they made an ark, of wood that would not decay, overlaid with gold, within and without.\n\n+ You too O Mary, are clothed with the glory, of the divinity, within and without.\n\nFor you have brought, unto God your Son, many people, through your purity.\n\n+ Wherefore we, magnify you befittingly, with prophetic, hymnology.\n\nFor they spoke of you, with great honor, O holy city, of the great King.\n\n+ We entreat and pray, that we may win mercy, through your intercessions, with the Lover of Mankind.' },
    { language: 'englishArabic', text: '+ Et-tabout el-musaffah, bidh-dhahab min kulli nahiya, el-masnou\' min khashab, la yusawwas.\n\nSabaqa an dallana, \'ala Allah el-kalima, alladhi sara insanan, bi-ghayr iftiraq.\n\n+ Wahid min ithnayn, lahout quddous, bi-ghayr fasad, musawi lil-Ab.\n\nWa nasout tahir, bi-ghayr mubada\'a, musawi lana, kat-tadbeer.\n\n+ Hadha alladhi akhadhahu minki, ayyatuha ghayr ed-danisa, wa ittahada, bihi ka-uqnoum.\n\nMin ajl hadha, kullu wahid yu\'azzimuki, ya sayyidati walidat el-ilah, el-qiddisa kulla heen.\n\n+ Wa nahnu aydan natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.\n\nKull el-anfus ma\'an, min bani Isra\'eel, qaddamou qarabeen, ila qubbat er-Rabb.\n\n+ Edh-dhahab wal-fidda, wal-hajar el-kareem, wal-hareer el-maghzoul, wal-urjuwan.\n\nSana\'ou tabouta, min khashab la yusawwas, wa saffahouhu bidh-dhahab, dakhilan wa kharijan.\n\n+ Wa anti aydan ya Maryam, el-\'adhra\' mutasarbila, bi-majd el-lahout, dakhilan wa kharijan.\n\nLi-annaki qaddamti, sha\'ban katheeran, lillah ibniki, min qibal taharatiki.\n\n+ Min ajl hadha, nu\'azzimuki, bi-stihqaq, bi-tamajeed nabawiya.\n\nLi-annahum takallamou, min ajliki bi-a\'mal kareema, ayyatuha el-madeena el-muqaddasa, allati lil-malik el-\'azeem.\n\n+ Nas\'al wa natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.' },
    { language: 'arabic', text: '+ التابوت المصفح، بالذهب من كل ناحية، المصنوع من خشب، لا يُسَوس.\n\nسبق أن دلنا، على الله الكلمة، الذي صار إنساناً، بغير إفتراق.\n\n+ واحد من إثنين، لاهوت قدوس، بغير فساد، مساوي للآب.\n\nوناسوت طاهر، بغير مباضعة، مساوي لنا، كالتدبير.\n\n+ هذا الذي أخذه منكِ، أيتها الغير الدنسة، وإتحد، به كأُقنوم.\n\nمن أجل هذا، كل واحد يعظمِك، يا سيدتي والدة الإله، القديسة كل حين.\n\n+ ونحن أيضاً نطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر.\n\nكل الأنفس معاً، من بني إسرائيل، قدموا قرابين، إلى قبة الرب.\n\n+ الذهب والفضة، والحجر الكريم، والحرير المغزول، والأرجوان.\n\nصنعوا تابوتاً، من خشب لا يُسوَس، وصفَّحوه بالذهب، داخلاً وخارجاً.\n\n+ وأنت أيضاً يا مريم، العذراء متسربلة، بمجد اللاهوت، داخلاً وخارجاً.\n\nلأنكِ قدمتِ، شعباً كثيراً، لله إبنِك، من قِبَل طهارتك.\n\n+ من أجل هذا، نعظمِك، بإستحقاقٍ، بتماجيد نبوية.\n\nلأنهم تكلموا، من أجلِك بأعمال كريمة، أيتها المدينة المقدسة، التي للملك العظيم.\n\n+ نسأل ونطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر.' },
  ],
  3: [
    { language: 'coptic', text: 'Ⲡⲓⲓ̀ⲗⲁⲥⲧⲏⲣⲓⲟⲛ: ⲉ̀ⲧⲟⲩϩⲱⲃⲥ ⲙ̀ⲙⲟϥ: ϩⲓⲧⲉⲛ Ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ: ⲉⲩⲟⲓ ⲛ̀ϩⲓⲕⲱⲛ.\n\n+ Ⲉ̀ⲧⲉ Ⲫ̀ⲛⲟⲩϯ Ⲡⲓⲗⲟⲅⲟⲥ: ⲉ̀ⲧⲁϥϭⲓⲥⲁⲣⲝ ⲛ̀ϧⲏϯ: ⲱ̀ ϯⲁ̀ⲧⲁϭⲛⲓ: ϧⲉⲛ ⲟⲩⲙⲉⲧⲁⲧϣⲓⲃϯ.\n\nⲀϥϣⲱⲡⲓ ⲛ̀ⲧⲟⲩⲃⲟ: ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ: ⲛⲉⲙ ⲟⲩⲣⲉϥⲭⲱ ⲉ̀ⲃⲟⲗ: ⲛ̀ⲧⲉ ⲛⲉⲛⲁ̀ⲛⲟⲙⲓⲁ.\n\n+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ: ⲥⲉϭⲓⲥⲓ ⲙ̀ⲙⲟ: ⲧⲁϭⲟⲓⲥ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.\n\nⲀ̀ⲛⲟⲛ ϩⲱⲛ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.\n\n+ Ⲭⲉⲣⲟⲩⲃⲓⲙ ⲥ̀ⲛⲁⲩ ⲛ̀ⲛⲟⲩⲃ: ⲉⲩⲟⲓ ⲛ̀ϩⲓⲕⲱⲛ: ⲉⲩϩⲱⲃⲥ ⲙ̀ⲡⲓⲓ̀ⲗⲁⲥⲧⲏⲣⲓⲟⲛ: ϧⲉⲛ ⲛⲟⲩⲧⲉⲛϩ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.\n\nⲈⲩⲉⲣϧⲏⲓⲃⲓ ⲉ̀ϩ̀ⲣⲏⲓ: ϩⲓϫⲉⲛ ⲡⲓⲙⲁ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲧⲉ ⲛⲏⲉⲑⲟⲩⲁⲃ: ϧⲉⲛ ϯⲥ̀ⲕⲏⲛⲏ ⲙ̀ⲙⲁϩⲥ̀ⲛⲟⲩϯ.\n\n+ Ⲛ̀ⲑⲟ ϩⲱⲓ Ⲙⲁⲣⲓⲁ: ⲛⲓⲁ̀ⲛⲁⲛϣⲟ ⲛ̀ϣⲟ: ⲛⲉⲙ ⲛⲓⲁ̀ⲛⲁⲛⲑ̀ⲃⲁ ⲛ̀ⲑ̀ⲃⲁ: ⲥⲉⲉⲣϧⲏⲓⲃⲓ ⲉ̀ϫⲱ.\n\nⲈⲩϩⲱⲥ ⲉ̀Ⲡⲟⲩⲣⲉϥⲥⲱⲛⲧ: ⲉϥⲭⲏ ϧⲉⲛ ⲧⲉⲛⲉϫⲓ: ⲫⲁⲓ ⲉ̀ⲧⲁϥϭⲓ ⲙ̀ⲡⲉⲛⲓ̀ⲛⲓ: ⲭⲱⲣⲓⲥ ⲛⲟⲃⲓ ϩⲓ ϣⲓⲃϯ.\n\n+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛϭⲓⲥⲓ: ⲙ̀ⲙⲟ ⲁⲝⲓⲱⲥ: ϧⲉⲛ ϩⲁⲛⲩⲙⲛⲟⲗⲟⲅⲓⲁ: ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ.\n\nϪⲉ ⲁⲩⲥⲁϫⲓ ⲉⲑⲃⲏϯ: ⲛ̀ϩⲁⲛϩ̀ⲃⲏⲟⲩⲓ̀ ⲉⲩⲧⲁⲓⲏⲟⲩⲧ: ϯⲃⲁⲕⲓ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲧⲉ ⲡⲓⲛⲓϣϯ ⲛ̀Ⲟⲩⲣⲟ.\n\n+ Ⲧⲉⲛϯϩⲟ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.' },
    { language: 'englishCoptic', text: 'Pi-ilastērion: etouhōbs emmof: hiten Nikherouvim: euoi enhikōn.\n\n+ Ete Efnouti Pilogos: etaftshisarks enkhēti: ō ti-atatshni: khen oumetatshibti.\n\nAfshōpi entouvo: ente nennovi: nem ourefkhō evol: ente nenanomia.\n\n+ Ethve fai ouon niven: setshisi emmo: tatshois Tithe-otokos: ethouab ensēou niven.\n\nAnon hōn tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.\n\n+ Kherouvim esnau ennoub: euoi enhikōn: euhōbs empi-ilastērion: khen noutenh ensēou niven.\n\nEuerkhēivi e-ehrēi: hijen pima ethouab: ente nēethouab: khen ti-eskēnē emmahesnouti.\n\n+ Entho hōi Maria: ni-anansho ensho: nem ni-ananethva enethva: seerkhēivi ejō.\n\nEuhōs e-Pourefsōnt: efkhē khen teneji: fai etaftshi empenini: khōris novi hi shibti.\n\n+ Ethve fai tentshisi: emmo aksiōs: khen hanumnologia: emeprofētikon.\n\nJe ausaji ethvēti: enhanehvēou-i eutaiēout: tivaki ethouab: ente pinishti en-Ouro.\n\n+ Tentiho tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.' },
    { language: 'english', text: 'The mercy seat, was overshadowed by, the forged Cherubim, from all sides.\n\n+ Was a symbol of God the Word, who was incarnate, of you without change, O undefiled.\n\nHe became the purification, of our sins, and the forgiveness, of our iniquities.\n\n+ Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.\n\nAnd we too, hope to win mercy, through your intercessions, with the Lover of Mankind.\n\n+ The two golden Cherubim, continually covered, with their wings, the mercy seat.\n\nOvershadowing, the place of the holy, of the holies, in the second tabernacle.\n\n+ You too O Mary, thousands of thousands, and myriads of myriads, overshadow you.\n\nPraising their Creator, who was in your womb, and took our likeness, without sin or alteration.\n\n+ Wherefore we, magnify you befittingly, with prophetic, hymnology.\n\nFor they spoke of you, with great honor, O holy city, of the great King.\n\n+ We entreat and pray, that we may win mercy, through your intercessions, with the Lover of Mankind.' },
    { language: 'englishArabic', text: 'El-ghita\', el-muzallal \'alayh, bish-Sharoubim, el-musawwareen.\n\n+ Ay Allah el-kalima, alladhi tajassada minki, ayyatuha allati bila \'ayb, bi-ghayr taghayyur.\n\nWa sara tatheeran, li-khatayana, wa ghafiran, li-athamina.\n\n+ Min ajl hadha, kullu wahid yu\'azzimuki, ya sayyidati walidat el-ilah, el-qiddisa kulla heen.\n\nWa nahnu aydan natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.\n\n+ Karouban dhahab, musawwaran muzallilan, \'ala el-ghita\', bi-ajnihatihima kulla heen.\n\nYuzallilan \'ala, mawdi\' quds, el-aqdas, fil-qubba eth-thaniya.\n\n+ Wa anti aydan ya Maryam, ulouf ulouf, wa rabawat rabawat, yuzalliloun \'alayki.\n\nMusabbiheen khaliqahum, wa huwa fi batniki, hadha alladhi akhadha shabahana, ma khala el-khatiya wat-taghyeer.\n\n+ Min ajl hadha, nu\'azzimuki, bi-stihqaq, bi-tamajeed nabawiya.\n\nLi-annahum takallamou, min ajliki bi-a\'mal kareema, ayyatuha el-madeena el-muqaddasa, allati lil-malik el-\'azeem.\n\n+ Nas\'al wa natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.' },
    { language: 'arabic', text: 'الغطاء، المظلل عليه، بالشاروبيم، المصورين.\n\n+ أي الله الكلمة، الذي تجسد منكِ، أيتها التي بلا عيب، بغير تغير.\n\nوصار تطهيراً، لخطايانا، وغافراً، لآثامنا.\n\n+ من أجل هذا، كل واحد يعظمِك، يا سيدتي والدة الإله، القديسة كل حين.\n\nونحن أيضاً نطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر.\n\n+ كروباً ذهب، مصوران مظللان، على الغطاء، بأجنحتهما كل حين.\n\nيظللان على، موضع قدس، الأقداس، في القبة الثانية.\n\n+ وأنت أيضاً يا مريم، ألوف ألوف، وربوات ربوات، يظللون عليك.\n\nمُسبحين خالقهم، وهو في بطنِك، هذا الذي أخذ شبهنا، ما خلا الخطية والتغيير.\n\n+ من أجل هذا، نعظمِك، بإستحقاقٍ، بتماجيد نبوية.\n\nلأنهم تكلموا، من أجلِك بأعمال كريمة، أيتها المدينة المقدسة، التي للملك العظيم.\n\n+ نسأل ونطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر.' },
  ],
  4: [
    { language: 'coptic', text: 'Ⲛ̀ⲑⲟ ⲡⲉ ⲡⲓⲥ̀ⲧⲁⲙⲛⲟⲥ: ⲛ̀ⲛⲟⲩⲃ ⲉⲧⲧⲟⲩⲃⲏⲟⲩⲧ: ⲉ̀ⲣⲉ Ⲡⲓⲙⲁⲛⲛⲁ ϩⲏⲡ: ⲛ̀ϩ̀ⲣⲏⲓ ϧⲉⲛ ⲧⲉϥⲙⲏϯ.\n\n+ Ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡ̀ⲱⲛϧ: ⲉ̀ⲧⲁϥⲓ̀ ⲉ̀ⲡⲉⲥⲏⲧ: ⲛⲁⲛ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲧ̀ⲫⲉ: ⲁϥϯ ⲙ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ.\n\nⲈⲑⲃⲉ ⲫⲁⲓ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ: ⲥⲉϭⲓⲥⲓ ⲙ̀ⲙⲟ: ⲧⲁϭⲟⲓⲥ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.\n\n+ Ⲁ̀ⲛⲟⲛ ϩⲱⲛ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.\n\nϤ̀ⲧⲱⲙⲓ ⲅⲁⲣ ⲉ̀ⲣⲟ: ⲉⲑⲣⲟⲩⲙⲟⲩϯ ⲉ̀ⲡⲉⲣⲁⲛ: ϫⲉ ⲡⲓⲥ̀ⲧⲁⲙⲛⲟⲥ ⲛ̀ⲛⲟⲩⲃ: ⲉ̀ⲣⲉ ⲡⲓⲙⲁⲛⲛⲁ ϩⲏⲡ ⲛ̀ϧⲏⲧϥ.\n\n+ Ⲫⲏ ⲙⲉⲛ ⲉ̀ⲧⲉ ⲙ̀ⲙⲁⲩ: ϣⲁⲩⲭⲁϥ ϧⲉⲛ ϯⲥ̀ⲕⲏⲛⲏ: ⲛ̀ⲟⲩⲙⲉⲧⲙⲉⲑⲣⲉ: ⲛ̀ⲧⲉ ⲛⲉⲛϣⲏⲣⲓ ⲙ̀Ⲡⲓⲥⲣⲁⲏⲗ.\n\nⲈⲑⲃⲉ ⲛⲓⲡⲉⲑⲛⲁⲛⲉⲩ: ⲉ̀ⲧⲁϥⲁⲓⲧⲟⲩ ⲛⲉⲙⲱⲟⲩ: ⲛ̀ϫⲉ Ⲡ̀ϭⲟⲓⲥ Ⲫ̀ⲛⲟⲩϯ: ϩⲓ ⲡ̀ϣⲁϥⲉ ⲛ̀Ⲥⲓⲛⲁ.\n\n+ Ⲛ̀ⲑⲟ ϩⲱⲓ Ⲙⲁⲣⲓⲁ: ⲁ̀ⲣⲉϥⲁⲓ ϧⲉⲛ ⲧⲉⲛⲉϫⲓ: ⲙ̀Ⲡⲓⲙⲁⲛⲛⲁ ⲛ̀ⲛⲟⲏ̀ⲧⲟⲛ: ⲉ̀ⲧⲁϥⲓ̀ ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ⲫ̀ⲓⲱⲧ.\n\nⲀ̀ⲣⲉⲙⲁⲥϥ ⲁϭⲛⲉ ⲑⲱⲗⲉⲃ: ⲁϥϯ ⲛⲁⲛ ⲙ̀Ⲡⲉϥⲥⲱⲙⲁ: ⲛⲉⲙ Ⲡⲉϥⲥ̀ⲛⲟϥ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ: ⲁⲛⲱⲛϧ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛϭⲓⲥⲓ: ⲙ̀ⲙⲟ ⲁⲝⲓⲱⲥ: ϧⲉⲛ ϩⲁⲛⲩⲙⲛⲟⲗⲟⲅⲓⲁ: ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ.\n\nϪⲉ ⲁⲩⲥⲁϫⲓ ⲉⲑⲃⲏϯ: ⲛ̀ϩⲁⲛϩ̀ⲃⲏⲟⲩⲓ̀ ⲉⲩⲧⲁⲓⲏⲟⲩⲧ: ϯⲃⲁⲕⲓ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲧⲉ ⲡⲓⲛⲓϣϯ ⲛ̀Ⲟⲩⲣⲟ.\n\n+ Ⲧⲉⲛϯϩⲟ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.' },
    { language: 'englishCoptic', text: 'Entho pe pi-estamnos: ennoub ettouvēout: ere Pimanna hēp: enehrēi khen tefmēti.\n\n+ Piōik ente epōnkh: etafi epesēt: nan evol khen etfe: afti emepōnkh empikosmos.\n\nEthve fai ouon niven: setshisi emmo: tatshois Tithe-otokos: ethouab ensēou niven.\n\n+ Anon hōn tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.\n\nEftōmi gar ero: ethroumouti eperan: je pi-estamnos ennoub: ere pimanna hēp enkhētf.\n\n+ Fē men ete emmau: shaukhaf khen ti-eskēnē: enoumetmethre: ente nenshēri em-Pisraēl.\n\nEthve nipethnaneu: etafaitou nemōou: enje Eptshois Efnouti: hi epshafe en-Sina.\n\n+ Entho hōi Maria: arefai khen teneji: em-Pimanna enno-ēton: etafi evol khen Efiōt.\n\nAremasf atshne thōleb: afti nan em-Pefsōma: nem Pefesnof ettaiēout: anōnkh sha eneh.\n\n+ Ethve fai tentshisi: emmo aksiōs: khen hanumnologia: emeprofētikon.\n\nJe ausaji ethvēti: enhanehvēou-i eutaiēout: tivaki ethouab: ente pinishti en-Ouro.\n\n+ Tentiho tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.' },
    { language: 'english', text: 'You are the pot, made of pure gold, wherein was hidden, the true Manna.\n\n+ The Bread of life, which came down from heaven, and gave life, unto the world.\n\nWherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.\n\n+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.\n\nIt befits you, to be called, the golden pot, where the manna was hidden.\n\n+ For that was kept, in the tabernacle, as a testimony, to the children of Israel.\n\nOf the good things, that the Lord God, did unto them, in the wilderness of Sinai.\n\n+ You too O Mary, have carried in your womb, the rational Manna, that came from the Father.\n\nYou bore Him without blemish, He gave unto us, His honored Body and Blood, and we lived forever.\n\n+ Wherefore we, magnify you befittingly, with prophetic, hymnology.\n\nFor they spoke of you, with great honor, O holy city, of the great King.\n\n+ We entreat and pray, that we may win mercy, through your intercessions, with the Lover of Mankind.' },
    { language: 'englishArabic', text: 'Anti hiya qist, edh-dhahab en-naqi, el-makhfi el-mann, fi wasatihi.\n\n+ Khubz el-hayah, alladhi nazala lana, min es-sama\', wa a\'ta el-hayah lil-\'alam.\n\nMin ajl hadha, kullu wahid yu\'azzimuki, ya sayyidati walidat el-ilah, el-qiddisa kulla heen.\n\n+ Wa nahnu aydan natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.\n\nYaleeq biki an, yud\'a ismuki, qist edh-dhahab, el-makhfi feehi el-mann.\n\n+ Fa-dhalika wudi\', fil-qubba, shahadatan li-bani, Isra\'eel.\n\nMin ajl el-khayrat, allati sana\'aha ma\'ahum, er-Rabb el-ilah, fi barriyat Sina\'.\n\n+ Wa anti aydan ya Maryam, hamalti fi batniki, el-mann el-\'aqli, alladhi ata min el-Ab.\n\nWa waladtihi bi-ghayr danas, wa a\'tana jasadahu, wa damahu el-kareemayn, fa-hayeena ila el-abad.\n\n+ Min ajl hadha, nu\'azzimuki, bi-stihqaq, bi-tamajeed nabawiya.\n\nLi-annahum takallamou, min ajliki bi-a\'mal kareema, ayyatuha el-madeena el-muqaddasa, allati lil-malik el-\'azeem.\n\n+ Nas\'al wa natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.' },
    { language: 'arabic', text: 'أنت هي قسط، الذهب النقي، المخفي المَنَّ، في وسطه.\n\n+ خبز الحياة، الذي نزل لنا، من السماء، وأعطى الحياة للعالم.\n\nمن أجل هذا، كل واحد يعظمِك، يا سيدتي والدة الإله، القديسة كل حين.\n\n+ ونحن أيضاً نطلب، أن نفوز برحمة، بشفاعاتِك، عند محب البشر.\n\nيليق بكِ أن، يدعى إسمِك، قسط الذهب، المخفي فيه المَنَّ.\n\n+ فذلك وُضع، في القبة، شهادة لبني، إسرائيل.\n\nمن أجل الخيرات، التي صنعها معهم، الرب الإله، في برية سيناء.\n\n+ وأنتِ أيضاً يا مريم، حملتِ في بطنِك، المَنَّ العقلي، الذي أتى من الآب.\n\nوولدته بغير دنس، وأعطانا جسده، ودمه الكريمين، فحيينا إلى الأبد.\n\n+ من أجل هذا، نعظمِك، بإستحقاقٍ، بتماجيد نبوية.\n\nلأنهم تكلموا، من أجلِك بأعمال كريمة، أيتها المدينة المقدسة، التي للملك العظيم.\n\n+ نسأل ونطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر.' },
  ],
  5: [
    { language: 'coptic', text: 'Ⲛ̀ⲑⲟ ⲧⲉ ϯⲗⲩⲭⲛⲓⲁ: ⲛ̀ⲛⲟⲩⲃ ⲉⲧⲧⲟⲩⲃⲏⲟⲩⲧ: ⲉⲧϥⲁⲓ ϧⲁ Ⲡⲓⲗⲁⲙⲡⲁⲥ: ⲉⲑⲙⲟϩ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.\n\n+ Ⲉ̀ⲧⲉ Ⲫ̀ⲟⲩⲱⲓⲛⲓ ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ: ⲡⲓⲁⲧϣ̀ϧⲱⲛⲧ ⲉ̀ⲣⲟϥ: ⲡⲓⲉ̀ⲃⲟⲗ ϧⲉⲛ Ⲡⲓⲟⲩⲱⲓⲛⲓ: ⲛ̀ⲁⲧϣ̀ϧⲱⲛⲧ ⲉ̀ⲣⲟϥ.\n\nⲠⲓⲛⲟⲩϯ ⲛ̀ⲧⲁⲫ̀ⲙⲏⲓ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ⲟⲩⲛⲟⲩϯ ⲛ̀ⲧⲁⲫ̀ⲙⲏⲓ: ⲉ̀ⲧⲁϥϭⲓⲥⲁⲣⲝ ⲛ̀ϧⲏϯ: ϧⲉⲛ ⲟⲩⲙⲉⲧⲁⲧϣⲓⲃϯ.\n\n+ Ϩⲓⲧⲉⲛ ⲧⲉϥⲡⲁⲣⲟⲩⲥⲓⲁ: ⲁϥⲉⲣⲟⲩⲱⲓⲛⲓ ⲉ̀ⲣⲟⲛ: ϧⲁ ⲛⲏⲉⲧϩⲉⲙⲥⲓ ϧⲉⲛ ⲙ̀ⲭⲁⲕⲓ: ⲛⲉⲙ ⲧ̀ϧⲏⲓⲃⲓ ⲙ̀ⲫ̀ⲙⲟⲩ.\n\nⲀϥⲥⲟⲩⲧⲉⲛ ⲛⲉⲛϭⲁⲗⲁⲩϫ: ⲉ̀ⲫ̀ⲙⲱⲓⲧ ⲛ̀ⲧⲉ ϯϩⲓⲣⲏⲛⲏ: ϩⲓⲧⲉⲛ ϯⲕⲟⲓⲛⲱⲛⲓⲁ: ⲛ̀ⲧⲉ ⲛⲉϥⲙⲩⲥⲧⲏⲣⲓⲟⲛ ⲉⲑⲟⲩⲁⲃ.\n\n+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ: ⲥⲉϭⲓⲥⲓ ⲙ̀ⲙⲟ: ⲧⲁϭⲟⲓⲥ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.\n\nⲀ̀ⲛⲟⲛ ϩⲱⲛ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.\n\n+ Ⲩ̀ⲥⲟⲥ ⲛⲓⲃⲉⲛ ⲉⲧ ϧⲉⲛ ⲡ̀ϭⲓⲥⲓ: ⲙ̀ⲡⲟⲩϣ̀ⲧⲉⲛⲑⲱⲛⲟⲩ ⲉ̀ⲣⲟ: ⲱ̀ ϯⲗⲩⲭⲛⲓⲁ ⲛ̀ⲛⲟⲩⲃ: ⲉⲧϥⲁⲓ ϧⲁ Ⲡⲓⲟⲩⲱⲓⲛⲓ ⲙ̀ⲙⲏⲓ.\n\nⲐⲏ ⲙⲉⲛ ⲉ̀ⲧⲉ ⲙ̀ⲙⲁⲩ: ϣⲁⲩⲑⲁⲙⲓⲟⲥ ϧⲉⲛ ⲟⲩⲛⲟⲩⲃ: ⲉϥⲥⲱⲧⲡ ⲛ̀ⲕⲁⲑⲁⲣⲟⲥ: ϣⲁⲩⲭⲁⲥ ϧⲉⲛ ϯⲥ̀ⲕⲏⲛⲏ.\n\n+ Ⲥⲉⲉⲣⲕⲉⲃⲉⲣⲛⲓⲧⲏⲥ ⲉ̀ⲣⲟⲥ: ϩⲓⲧⲉⲛ ϩⲁⲛϫⲓϫ ⲛ̀ⲣⲱⲙⲓ: ⲉⲩϯⲛⲉϩ ⲛ̀ⲥⲁ ⲛⲉⲥⲗⲁⲙⲡⲁⲥ: ⲙ̀ⲡⲓⲉ̀ϩⲟⲟⲩ ⲛⲉⲙ ⲡⲓⲉ̀ϫⲱⲣϩ.\n\nⲪⲏⲉⲧⲭⲏ ϧⲉⲛ ⲧⲉⲛⲉϫⲓ: Ⲙⲁⲣⲓⲁ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲁϥⲉⲣⲟⲩⲱⲓⲛⲓ ⲉ̀ⲣⲱⲙⲓ ⲛⲓⲃⲉⲛ: ⲉⲑⲛⲏⲟⲩ ⲉ̀ⲡⲓⲕⲟⲥⲙⲟⲥ.\n\n+ Ⲛ̀ⲑⲟϥ ⲅⲁⲣ ⲡⲉ Ⲫ̀ⲣⲏ: ⲛ̀ⲧⲉ ϯⲇⲓⲕⲉⲟ̀ⲥⲩⲛⲏ: ⲁ̀ⲣⲉⲙⲁⲥϥ ⲁϥⲧⲁⲗϭⲟⲛ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲉⲛⲛⲟⲃⲓ.\n\nⲈⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛϭⲓⲥⲓ: ⲙ̀ⲙⲟ ⲁⲝⲓⲱⲥ: ϧⲉⲛ ϩⲁⲛⲩⲙⲛⲟⲗⲟⲅⲓⲁ: ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ.\n\n+ Ϫⲉ ⲁⲩⲥⲁϫⲓ ⲉⲑⲃⲏϯ: ⲛ̀ϩⲁⲛϩ̀ⲃⲏⲟⲩⲓ̀ ⲉⲩⲧⲁⲓⲏⲟⲩⲧ: ϯⲃⲁⲕⲓ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲧⲉ ⲡⲓⲛⲓϣϯ ⲛ̀Ⲟⲩⲣⲟ.\n\nⲦⲉⲛϯϩⲟ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.' },
    { language: 'englishCoptic', text: 'Entho te tilukhnia: ennoub ettouvēout: etfai kha Pilampas: ethmoh ensēou niven.\n\n+ Ete Efouōini empikosmos: piateshkhōnt erof: pi-evol khen Piouōini: enateshkhōnt erof.\n\nPinouti enta-efmēi: evol khen Ounouti enta-efmēi: etaftshisarks enkhēti: khen oumetatshibti.\n\n+ Hiten tefparousia: aferouōini eron: kha nēethemsi khen emkhaki: nem etkhēivi emefmou.\n\nAfsouten nentshalauj: e-efmōit ente tihirēnē: hiten tikoinōnia: ente nefmustērion ethouab.\n\n+ Ethve fai ouon niven: setshisi emmo: tatshois Tithe-otokos: ethouab ensēou niven.\n\nAnon hōn tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.\n\n+ Usos niven et khen eptshisi: empou-eshtenthōnou ero: ō tilukhnia ennoub: etfai kha Piouōini emmēi.\n\nThē men ete emmau: shauthamios khen ounoub: efsōtp enkatharos: shaukhas khen ti-eskēnē.\n\n+ Seerkevernitēs eros: hiten hanjij enrōmi: eutineh ensa neslampas: empi-ehoou nem pi-ejōrh.\n\nFēetkhē khen teneji: Maria Tiparthenos: aferouōini erōmi niven: ethnēou epikosmos.\n\n+ Enthof gar pe Efrē: ente tidike-osunē: aremasf aftaltshon: evol khen nennovi.\n\nEthve fai tentshisi: emmo aksiōs: khen hanumnologia: emeprofētikon.\n\n+ Je ausaji ethvēti: enhanehvēou-i eutaiēout: tivaki ethouab: ente pinishti en-Ouro.\n\nTentiho tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.' },
    { language: 'english', text: 'You are the lampstand, made of pure gold, carrying, the ever-burning Lamp.\n\n+ That is the unapproachable, Light of the world, that proceeds from, the unapproachable Light.\n\nThe true God, out of true God, who was incarnate, of you without change.\n\n+ By His appearing, He gave light to us, we who sit in the darkness, and in the shadow of death.\n\nAnd He guided our feet, in the path of peace, through the communion, of His holy sacraments.\n\n+ Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.\n\nAnd we too, hope to win mercy, through your intercessions, with the Lover of Mankind.\n\n+ All the ranks on high, cannot resemble you, O golden lampstand, that carries the true Light.\n\nThat was made of, pure and elect gold, and was placed in, the tabernacle.\n\n+ That was made, by the hands of men, who brought oil for its lamps, by day and by night.\n\nHe who dwells in your womb, O Virgin Mary, gives light to every man, who comes into the world.\n\n+ For He whom you have born, is the Sun of righteousness, and He has healed us, of all our sins.\n\nWherefore we, magnify you befittingly, with prophetic, hymnology.\n\n+ For they spoke of you, with great honor, O holy city, of the great King.\n\nWe entreat and pray, that we may win mercy, through your intercessions, with the Lover of Mankind.' },
    { language: 'englishArabic', text: 'Anti el-manara, edh-dhahab en-naqi, el-hamila el-misbah, el-muttaqid kulla heen.\n\n+ Alladhi huwa nour el-\'alam, ghayr el-muqtarab ilayh, alladhi min en-nour, ghayr el-mudna minh.\n\nEl-ilah el-haqq, min el-ilah el-haqq, alladhi tajassada minki, bi-ghayr taghyeer.\n\n+ Bi-zuhourihi, ada\'a \'alayna nahnu, el-julous fiz-zulma, wa zilal el-mawt.\n\nWa qawwama arjulana, ila tareeq es-salam, bi-shirkat, asrarihi el-muqaddasa.\n\n+ Min ajl hadha, kullu wahid yu\'azzimuki, ya sayyidati walidat el-ilah, el-qiddisa kulla heen.\n\nWa nahnu aydan natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.\n\n+ Kull er-rutab el-\'ulwiya, lam taqdir an tushbihaki, ayyatuha el-manara edh-dhahabiya, hamilat en-nour el-haqiqi.\n\nFa-tilka suni\'at, min dhahab, mukhtar naqi, wa wudi\'at fil-qubba.\n\n+ Tudabbar, bi-aydi el-bashar idh, yu\'ta zayt li-masabeehiha, naharan wa laylan.\n\nWalladhi fi batniki, ya Maryam el-\'adhra\', ada\'a li-kulli insan, atin ila el-\'alam.\n\n+ Li-annahu huwa, shams el-birr, waladtihi wa shafana, min khatayana.\n\nMin ajl hadha, nu\'azzimuki, bi-stihqaq, bi-tamajeed nabawiya.\n\n+ Li-annahum takallamou, min ajliki bi-a\'mal kareema, ayyatuha el-madeena el-muqaddasa, allati lil-malik el-\'azeem.\n\nNas\'al wa natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.' },
    { language: 'arabic', text: 'أنت المنارة، الذهب النقي، الحاملة المصباح، المتقد كل حين.\n\n+ الذي هو نور العالم، غير المقترب إليه، الذي من النور، غير المُدني منه.\n\nالإله الحق، من الإله الحق، الذي تجسد منكِ، بغير تغيير.\n\n+ بظهوره، آضاء علينا نحن، الجلوس في الظلمة، وظلال الموت.\n\nوقوَّم أرجلنا، إلى طريق السلام، بشركة، أسراره المقدسة.\n\n+ من أجل هذا، كل واحد يعظمِك، يا سيدتي والدة الإله، القديسة كل حين.\n\nونحن أيضاً نطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر.\n\n+ كل الرتب العلوية، لم تقدر أن تشبهكِ، أيتها المنارة الذهبية، حاملة النور الحقيقي.\n\nفتلك صُنعت، من ذهب، مختار نقي، ووُضعت في القبة.\n\n+ تدبر، بأيدي البشر إذ، يعطى زيت لمصابيحها، نهاراً وليلاً.\n\nوالذي في بطنِك، يا مريم العذراء، أضاء لكل أنسان، آت إلى العالم.\n\n+ لأنه هو، شمس البر، ولدتِه وشفانا، من خطايانا.\n\nمن أجل هذا، نعظمِك، بإستحقاقٍ، بتماجيد نبوية.\n\n+ لأنهم تكلموا، من أجلِك بأعمال كريمة، أيتها المدينة المقدسة، التي للملك العظيم.\n\nنسأل ونطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر.' },
  ],
  6: [
    { language: 'coptic', text: '+ Ⲛ̀ⲑⲟ ⲧⲉ ϯϣⲟⲩⲣⲏ: ⲛ̀ⲛⲟⲩⲃ ⲛ̀ⲕⲁⲑⲁⲣⲟⲥ: ⲉⲧϥⲁⲓ ϧⲁ ⲡⲓϫⲉⲃⲥ: ⲛ̀ⲭ̀ⲣⲱⲙ ⲉⲧⲥ̀ⲙⲁⲣⲱⲟⲩⲧ.\n\nⲪⲏⲉ̀ⲧⲟⲩϭⲓ ⲙ̀ⲙⲟϥ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲡⲓⲙⲁ ⲛ̀ⲉⲣϣⲱⲟⲩϣⲓ: ϣⲁϥⲧⲟⲩⲃⲟ ⲛ̀ⲛⲓⲛⲟⲃⲓ: ⲛ̀ⲧⲉϥⲱ̀ⲗⲓ ⲛ̀ⲛⲓⲁ̀ⲛⲟⲙⲓⲁ.\n\n+ Ⲉ̀ⲧⲉ Ⲫ̀ⲛⲟⲩϯ Ⲡⲓⲗⲟⲅⲟⲥ: ⲉ̀ⲧⲁϥϭⲓⲥⲁⲣⲝ ⲛ̀ϧⲏϯ: ⲁϥⲟⲗϥ ⲉ̀ⲡ̀ϣⲱⲓ ⲛ̀ⲟⲩⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ: ϣⲁ Ⲫ̀ⲛⲟⲩϯ Ⲡⲉϥⲓⲱⲧ.\n\nⲈⲑⲃⲉ ⲫⲁⲓ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ: ⲥⲉϭⲓⲥⲓ ⲙ̀ⲙⲟ: ⲧⲁϭⲟⲓⲥ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.\n\n+ Ⲁ̀ⲛⲟⲛ ϩⲱⲛ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.\n\nⲦⲟⲧⲉ ⲁ̀ⲗⲏⲑⲱⲥ: ⲛ̀ϯϣⲱϥⲧ ⲁⲛ ⲛ̀ϩ̀ⲗⲓ: ⲁⲓϣⲁⲛⲙⲟⲩϯ ⲉ̀ⲣⲟ: ϫⲉ ϯϣⲟⲩⲣⲏ ⲛ̀ⲛⲟⲩⲃ.\n\n+ Ⲑⲏ ⲙⲉⲛ ⲉ̀ⲧⲉ ⲙ̀ⲙⲁⲩ: ϣⲁⲩⲧⲁⲗⲟ ⲉ̀ⲡ̀ϣⲱⲓ ⲛ̀ϧⲏⲧⲥ: ⲙ̀ⲡⲓⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ ⲉⲧⲥⲱⲧⲡ: ⲙ̀ⲡⲉⲙ̀ⲑⲟ ⲛ̀ⲛⲏⲉⲑⲟⲩⲁⲃ.\n\nϢⲁⲣⲉ Ⲫ̀ⲛⲟⲩϯ ⲱ̀ⲗⲓ ⲙ̀ⲙⲁⲩ: ⲛ̀ⲛⲓⲛⲟⲃⲓ ⲛ̀ⲧⲉ ⲡⲓⲗⲁⲟⲥ: ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ ⲡⲓϭⲗⲓⲗ: ⲛⲉⲙ ⲡⲓⲥ̀ⲑⲟⲓ ⲛ̀ⲧⲉ ⲡⲓⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ.\n\n+ Ⲛ̀ⲑⲟ ϩⲱⲓ Ⲙⲁⲣⲓⲁ: ⲁ̀ⲣⲉϥⲁⲓ ϧⲉⲛ ⲧⲉⲛⲉϫⲓ: ⲙ̀Ⲡⲓⲁⲧϣ̀ⲛⲁⲩ ⲉ̀ⲣⲟϥ: ⲛ̀Ⲗⲟⲅⲟⲥ ⲛ̀ⲧⲉ Ⲫ̀ⲓⲱⲧ.\n\nⲪⲁⲓ ⲉ̀ⲧⲁϥⲉⲛϥ ⲉ̀ⲡ̀ϣⲱⲓ: ⲛ̀ⲟⲩⲑⲩⲥⲓⲁ ⲉⲥϣⲏⲡ: ϩⲓϫⲉⲛ Ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ: ϧⲁ ⲡ̀ⲟⲩϫⲁⲓ ⲙ̀ⲡⲉⲛⲅⲉⲛⲟⲥ.\n\n+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛϭⲓⲥⲓ: ⲙ̀ⲙⲟ ⲁⲝⲓⲱⲥ: ϧⲉⲛ ϩⲁⲛⲩⲙⲛⲟⲗⲟⲅⲓⲁ: ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ.\n\nϪⲉ ⲁⲩⲥⲁϫⲓ ⲉⲑⲃⲏϯ: ⲛ̀ϩⲁⲛϩ̀ⲃⲏⲟⲩⲓ̀ ⲉⲩⲧⲁⲓⲏⲟⲩⲧ: ϯⲃⲁⲕⲓ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲧⲉ ⲡⲓⲛⲓϣϯ ⲛ̀Ⲟⲩⲣⲟ.\n\n+ Ⲧⲉⲛϯϩⲟ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.' },
    { language: 'englishCoptic', text: '+ Entho te tishourē: ennoub enkatharos: etfai kha pijebs: enekhrōm etesmarōout.\n\nFē-etoutshi emmof: evol khen pima enershōoushi: shaftouvo enninovi: entefōli enni-anomia.\n\n+ Ete Efnouti Pilogos: etaftshisarks enkhēti: afolf e-epshōi enou-esthoinoufi: sha Efnouti Pefiōt.\n\nEthve fai ouon niven: setshisi emmo: tatshois Tithe-otokos: ethouab ensēou niven.\n\n+ Anon hōn tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.\n\nTote alēthōs: entishōft an enehli: aishanmouti ero: je tishourē ennoub.\n\n+ Thē men ete emmau: shautalo e-epshōi enkhēts: empi-esthoinoufi etsōtp: empe-emtho ennēethouab.\n\nShare Efnouti ōli emmau: enninovi ente pilaos: evol hiten pitshlil: nem pi-esthoi ente pi-esthoinoufi.\n\n+ Entho hōi Maria: arefai khen teneji: em-Piateshnau erof: en-Logos ente Efiōt.\n\nFai etafenf e-epshōi: enouthusia esshēp: hijen Pi-estauros: kha epoujai empengenos.\n\n+ Ethve fai tentshisi: emmo aksiōs: khen hanumnologia: emeprofētikon.\n\nJe ausaji ethvēti: enhanehvēou-i eutaiēout: tivaki ethouab: ente pinishti en-Ouro.\n\n+ Tentiho tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.' },
    { language: 'english', text: '+ You are the censer, made of pure gold, carrying the blessed, and live coal.\n\nThat is taken, from the altar, to purge the sins, and take away the iniquities.\n\n+ Which is God the Word, who took flesh from you, and offered Himself as incense, to God His Father.\n\nWherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.\n\n+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.\n\nWherefore truly, I do not err, whenever I call you, the golden censer.\n\n+ For therein, is offered, the choice incense, before the Holies.\n\nWherein God takes away, the sins of the people, through the burnt offerings, and the aroma of incense.\n\n+ You too O Mary, have carried in your womb, the Invisible, Word of the Father.\n\nHe who offered Himself, as an acceptable sacrifice, upon the Cross, for the salvation of our race.\n\n+ Wherefore we, magnify you befittingly, with prophetic, hymnology.\n\nFor they spoke of you, with great honor, O holy city, of the great King.\n\n+ We entreat and pray, that we may win mercy, through your intercessions, with the Lover of Mankind.' },
    { language: 'englishArabic', text: '+ Anti hiya el-mijmara, edh-dhahab en-naqi, hamilat jamr, en-nar el-mubaraka.\n\nAlladhi yu\'khadh, min el-madhbah, yutahhir el-khataya, wa yamhou el-atham.\n\n+ Ay Allah el-kalima, alladhi tajassada minki, wa rafa\'a dhatahu bukhouran, ila Allah abeeh.\n\nMin ajl hadha, kullu wahid yu\'azzimuki, ya sayyidati walidat el-ilah, el-qiddisa kulla heen.\n\n+ Wa nahnu aydan natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.\n\nHeena\'idhin bil-haqiqa, la ukhti\' fi shay\', idha ma da\'awtuki, el-mijmara edh-dhahab.\n\n+ Fa-tilka yurfa\', feeha el-bukhour, el-mukhtar, amam el-aqdas.\n\nWa yarfa\' Allah hunak, khataya esh-sha\'b, min qibal el-muhraqat, wa ra\'ihat el-bukhour.\n\n+ Wa anti ya Maryam, hamalti fi batniki, ghayr el-manzour, kalimat el-Ab.\n\nHadha alladhi as\'ada, dhatahu dhabeeha, maqboula \'ala es-saleeb, \'an khalas jinsina.\n\n+ Min ajl hadha, nu\'azzimuki, bi-stihqaq, bi-tamajeed nabawiya.\n\nLi-annahum takallamou, min ajliki bi-a\'mal kareema, ayyatuha el-madeena el-muqaddasa, allati lil-malik el-\'azeem.\n\n+ Nas\'al wa natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.' },
    { language: 'arabic', text: '+ أنت هي المجمرة، الذهب النقي، حاملة جمر، النار المباركة.\n\nالذي يُؤخذ، من المذبح، يُطهر الخطايا، ويمحو الآثام.\n\n+ أي الله الكلمة، الذي تجسد منكِ، ورفع ذاته بخوراً، إلى الله أبيه.\n\nمن أجل هذا، كل واحد يعظمِك، يا سيدتي والدة الإله، القديسة كل حين.\n\n+ ونحن أيضاً نطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر.\n\nحينئذ بالحقيقة، لا أخطيئ في شئ، إذا ما دعوتك، المجمرة الذهب.\n\n+ فتلك يُرفع، فيها البخور، المختار، أمام الأقدس.\n\nويرفع الله هناك، خطايا الشعب، من قِبَل المحرقات، ورائحة البخور.\n\n+ وأنتِ يا مريم، حملتِ في بطنِك، الغير منظور، كلمة الآب.\n\nهذا الذي أصعد، ذاته ذبيحة، مقبولة على الصليب، عن خلاص جنسنا.\n\n+ من أجل هذا، نعظمِك، بإستحقاقٍ، بتماجيد نبوية.\n\nلأنهم تكلموا، من أجلِك بأعمال كريمة، أيتها المدينة المقدسة، التي للملك العظيم.\n\n+ نسأل ونطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر.' },
  ],
};

const mondayTheotokiaTexts: Record<number, LanguageVersion[]> = {
  1: [
    { language: 'coptic', text: 'Ⲁ̀ⲇⲁⲙ ⲉ̀ⲧⲓ ⲉϥⲟⲓ: ⲛ̀ⲙ̀ⲕⲁϩⲛ̀ϩⲏⲧ: ⲁϥϯⲙⲁϯ ⲛ̀ϫⲉ Ⲡ̀ϭⲟⲓⲥ: ⲉ̀ⲧⲁⲥⲑⲟϥ ⲉ̀ⲧⲉϥⲁⲣⲭⲏ.\n\n+ Ⲁϥϣⲁⲓ ⲥⲱⲙⲁⲧⲓⲕⲱⲥ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: 'Adam eti efoi: enemkahenhēt: aftimati enje Eptshois: etasthof etefarkhē.\n\n+ Afshai sōmatikōs: evol khen Tiparthenos: atshne esperma enrōmi: sha entefsōti emmon.' },
    { language: 'english', text: 'While Adam was sad, God was pleased, to bring him back, to his authority.\n\n+ He shone in the flesh, taken from the Virgin, without the seed of man, in order to save us.' },
    { language: 'englishArabic', text: 'Adam baynama, huwa hazeen, surra er-Rabbu an yaruddahu, ila ri\'asatihi.\n\n+ Ashraqa jasadiyyan, min el-\'adhra\', bi-ghayr zar\' basharin, hatta khallasana.' },
    { language: 'arabic', text: 'آدم بينما، هو حزين، سُرَّ الربُّ أن يردُّه، إلى رئاسته.\n\n+ أشرق جسدياً، من العذراء، بغير زرع بشرٍ، حتى خلصنا.' },
  ],
  2: [
    { language: 'coptic', text: 'Ⲉ̀ⲩⲁ ⲑⲏⲉ̀ⲧⲁϥⲉⲣϩⲁⲗ ⲙ̀ⲙⲟⲥ: ⲛ̀ϫⲉ ⲡⲓϩⲟϥ: ⲁⲥϭⲓ ⲁ̀ⲡⲟⲫⲁⲥⲓⲥ: ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ Ⲡ̀ϭⲟⲓⲥ.\n\n+ Ϫⲉ ϧⲉⲛ ⲟⲩⲁ̀ϣⲁⲓ: ϯⲛⲁⲑ̀ⲣⲟⲩⲁ̀ϣⲁⲓ: ⲛ̀ϫⲉ ⲛⲉⲙ̀ⲕⲁϩⲛ̀ϩⲏⲧ: ⲛⲉⲙ ⲛⲉϥⲓⲁϩⲟⲙ.\n\nⲀϥϣⲉⲛϩⲏⲧ ⲛ̀ϫⲉ Ⲡ̀ϭⲟⲓⲥ: ϩⲓⲧⲉⲛ ⲧⲉϥⲙⲉⲧⲙⲁⲓⲣⲱⲙⲓ: ⲁϥϯⲙⲁϯ ⲛ̀ⲕⲉⲥⲟⲡ: ⲉ̀ⲁⲓⲥ ⲛ̀ⲣⲉⲙϩⲉ.\n\n+ Ⲁϥϣⲁⲓ ⲥⲱⲙⲁⲧⲓⲕⲱⲥ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: 'Eua thē-etaferhal emmos: enje pihof: astshi apofasis: evol hiten Eptshois.\n\n+ Je khen ou-ashai: tina-ethrou-ashai: enje ne-emkahenhēt: nem nefiahom.\n\nAfshenhēt enje Eptshois: hiten tefmetmairōmi: aftimati enkesop: eais enremhe.\n\n+ Afshai sōmatikōs: evol khen Tiparthenos: atshne esperma enrōmi: sha entefsōti emmon.' },
    { language: 'english', text: 'Eve who was tempted, by the serpent, was condemned, by the Lord.\n\n+ “For in abundance, I will greatly multiply, your sorrows, and your sighs.”\n\nYet God felt compassionate, through his love for man, and was pleased, to free her once again.\n\n+ He shone in the flesh, taken from the Virgin, without the seed of man, in order to save us.' },
    { language: 'englishArabic', text: 'Hawwa\' allati, aghratha el-hayya, hukima \'alayha, min qibal er-Rabb.\n\n+ Inna bil-kathra, ukaththir, ahzanaki, wa tanahhudataki.\n\nTahannana er-Rabb, min qibal mahabbatihi lil-bashar, wa surra marra ukhra, bi-\'itqiha.\n\n+ Ashraqa jasadiyyan, min el-\'adhra\', bi-ghayr zar\' basharin, hatta khallasana.' },
    { language: 'arabic', text: 'حواء التي، أغرتها الحية، حُكم عليها، من قِبَل الرب.\n\n+ "إن بالكثرة، أُكثِر، أحزانِك، وتنهداتِك."\n\nتحنَّن الرب، من قِبَل محبته للبشر، وسُرَّ مرة أخرى، بعتقها.\n\n+ أشرق جسدياً، من العذراء، بغير زرع بشرٍ، حتى خلصنا.' },
  ],
  3: [
    { language: 'coptic', text: 'Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲓⲗⲟⲅⲟⲥ: ⲉ̀ⲧⲁϥϭⲓⲥⲁⲣⲝ: ⲁϥϣⲱⲡⲓ ⲛ̀ϧⲏⲧⲉⲛ: ⲁⲛⲛⲁⲩ ⲉ̀ⲡⲉϥⲱ̀ⲟⲩ.\n\n+ Ⲙ̀ⲫ̀ⲣⲏϯ ⲙ̀ⲡ̀ⲱ̀ⲟⲩ: ⲛ̀Ⲟⲩϣⲏⲣⲓ ⲙ̀ⲙⲁⲩⲁⲧϥ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲉϥⲓⲱⲧ: ⲁϥϯⲙⲁϯ ⲉ̀ⲫ̀ⲛⲁϩⲙⲉⲛ.\n\nⲀϥϣⲁⲓ ⲥⲱⲙⲁⲧⲓⲕⲱⲥ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: 'Iēsous Pi-ekhristos Pilogos: etaftshisarks: afshōpi enkhēten: annau epefōou.\n\n+ Emefrēti emepōou: en-Oushēri emmauatf: entotf em-Pefiōt: aftimati e-efnahmen.\n\nAfshai sōmatikōs: evol khen Tiparthenos: atshne esperma enrōmi: sha entefsōti emmon.' },
    { language: 'english', text: 'Jesus Christ the Word, who came and took flesh, He dwelt in us, and we saw His glory.\n\n+ Like the glory of the only Son, of His Father, He was pleased, to redeem us.\n\nHe shone in the flesh, taken from the Virgin, without the seed of man, in order to save us.' },
    { language: 'englishArabic', text: 'Yasou\' el-Maseeh el-kalima, alladhi tajassada, wa halla feena, wa ra\'ayna majdahu.\n\n+ Mithl majd, ibn waheed li-abeeh, qad surra, an yukhallisana.\n\nAshraqa jasadiyyan, min el-\'adhra\', bi-ghayr zar\' basharin, hatta khallasana.' },
    { language: 'arabic', text: 'يسوع المسيح الكلمة، الذي تجسد، وحلَّ فينا، ورأينا مجده.\n\n+ مثل مجد، إبن وحيد لأبيه، قد سُرَّ، أن يخلصنا.\n\nأشرق جسدياً، من العذراء، بغير زرع بشرٍ، حتى خلصنا.' },
  ],
  4: [
    { language: 'coptic', text: '+ Ⲛⲁϥⲛⲁⲩ ϧⲉⲛ ⲛⲓⲃⲁⲗ: ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ: ⲉ̀ⲡⲓⲙⲩⲥⲧⲏⲣⲓⲟⲛ: ⲛ̀ⲧⲉ Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ.\n\nⲚ̀ϫⲉ Ⲏ̀ⲥⲁⲏ̀ⲁⲥ: ⲡⲓⲛⲓϣϯ ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲏⲥ: ⲉⲑⲃⲉ ⲫⲁⲓ ⲁϥⲱϣ ⲉ̀ⲃⲟⲗ: ⲉϥϫⲱ ⲙ̀ⲙⲟⲥ.\n\n+ Ϫⲉ ⲁⲩⲙⲓⲥⲓ ⲛⲁⲛ ⲛ̀Ⲟⲩⲁ̀ⲗⲟⲩ: ⲁⲩϯ ⲛⲁⲛ ⲛ̀Ⲟⲩϣⲏⲣⲓ: ⲫⲏⲉⲧⲉ̀ⲣⲉ ⲧⲉϥⲁⲣⲭⲏ: ⲭⲏ ϩⲓϫⲉⲛ ⲧⲉϥⲛⲁϩⲃⲓ.\n\nⲪ̀ⲛⲟⲩϯ ⲫⲏⲉⲧϫⲟⲣ: ⲛ̀ⲉⲝⲟⲩⲥⲓⲁⲥⲧⲏⲥ: ⲟⲩⲟϩ Ⲡⲓⲁⲅⲅⲉⲗⲟⲥ: ⲛ̀ⲧⲉ ⲡⲓⲛⲓϣϯ ⲛ̀ⲥⲟϭⲛⲓ.\n\n+ Ⲁϥϣⲁⲓ ⲥⲱⲙⲁⲧⲓⲕⲱⲥ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: '+ Nafnau khen nival: emeprofētikon: epimustērion: ente Emmanouēl.\n\nEnje Ēsa-ēas: pinishti emeprofētēs: ethve fai afōsh evol: efjō emmos.\n\n+ Je aumisi nan en-Ou-alou: auti nan en-Oushēri: fēetere tefarkhē: khē hijen tefnahvi.\n\nEfnouti fēetjor: eneksousiastēs: ouoh Piaggelos: ente pinishti ensotshni.\n\n+ Afshai sōmatikōs: evol khen Tiparthenos: atshne esperma enrōmi: sha entefsōti emmon.' },
    { language: 'english', text: '+ (Isaiah) has seen, the mystery, of Emmanuel, with prophetic insight.\n\nTherefore Isaiah, the great prophet, cried out proclaiming, and saying.\n\n+ “For unto us a Child is born, unto us a Son is given, the government shall be, upon His shoulder.\n\nThe powerful God, of authority, and the Angel of, the great counsel.”\n\n+ He shone in the flesh, taken from the Virgin, without the seed of man, in order to save us.' },
    { language: 'englishArabic', text: '+ Kana yanzur, bi-a\'yun en-nubuwwa, ila sirr, \'Immanoueel.\n\nAsh\'iya\', en-nabi el-\'azeem, fa-li-hadha sarakha, qa\'ilan.\n\n+ Innahu wulida lana waladun, wa u\'teena ibnan, ri\'asatuhu, \'ala katifihi.\n\nEl-ilah el-qawi, el-mutasallit, wa malak el-mashoura, el-\'uzma.\n\n+ Ashraqa jasadiyyan, min el-\'adhra\', bi-ghayr zar\' basharin, hatta khallasana.' },
    { language: 'arabic', text: '+ كان ينظر، بأعين النبوة، إلى سر، عمانوئيل.\n\nأشعياء، النبي العظيم، فلهذا صرخ، قائلاً.\n\n+ "إنه وُلِدَ لنا ولدٌ، وأُعطينا أبناً، رئاسته، على كتفه.\n\nالإله القوي، المتسلط، وملاكُ المشورة، العُظمى."\n\n+ أشرق جسدياً، من العذراء، بغير زرع بشرٍ، حتى خلصنا.' },
  ],
  5: [
    { language: 'coptic', text: 'Ⲣⲁϣⲓ ⲟⲩⲟϩ ⲑⲉⲗⲏⲗ: ⲱ̀ ⲡ̀ⲅⲉⲛⲟⲥ ⲛ̀ⲛⲓⲣⲱⲙⲓ: ϫⲉ ⲡⲁⲓⲣⲏϯ ⲁ̀ Ⲫ̀ⲛⲟⲩϯ: ⲙⲉⲛⲣⲉ ⲡⲓⲕⲟⲥⲙⲟⲥ.\n\n+ Ϩⲱⲥⲧⲉ ⲛ̀ⲧⲉϥϯ: ⲙ̀Ⲡⲉϥϣⲏⲣⲓ ⲙ̀ⲙⲉⲛⲣⲓⲧ: ϧⲁ ⲛⲏⲉⲑⲛⲁϩϯ ⲉ̀ⲣⲟϥ: ⲉⲑⲣⲟⲩⲱⲛϧ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲀⲩϭⲣⲟ ⲅⲁⲣ ⲉ̀ⲣⲟϥ: ϩⲓⲧⲉⲛ ⲧⲉϥⲙⲉⲧϣⲉⲛϩⲏⲧ: ⲟⲩⲟϩ ⲁϥⲟⲩⲱⲣⲡ ⲛⲁⲛ: ⲙ̀ⲡⲉϥϫ̀ⲫⲟⲓ ⲉⲧϭⲟⲥⲓ.\n\n+ Ⲁϥϣⲁⲓ ⲥⲱⲙⲁⲧⲓⲕⲱⲥ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: 'Rashi ouoh thelēl: ō epgenos ennirōmi: je pairēti a Efnouti: menre pikosmos.\n\n+ Hōste entefti: em-Pefshēri emmenrit: kha nēethnahti erof: ethrouōnkh sha eneh.\n\nAutshro gar erof: hiten tefmetshenhēt: ouoh afouōrp nan: empefejfoi ettshosi.\n\n+ Afshai sōmatikōs: evol khen Tiparthenos: atshne esperma enrōmi: sha entefsōti emmon.' },
    { language: 'english', text: 'Rejoice and be happy, O human race, for God so revealed, His love to the world.\n\n+ That He gave, His beloved Son, for those who believe in Him, so that they may live forever.\n\nFor He was overcome, by His compassion, and sent unto us, His almighty arm.\n\n+ He shone in the flesh, taken from the Virgin, without the seed of man, in order to save us.' },
    { language: 'englishArabic', text: 'Ifrahou wa tahallalou, ya jins el-bashar, li-annahu hakadha, ahabba Allah el-\'alam.\n\n+ Hatta badhala, ibnahu el-habeeb, \'an el-mu\'mineen bihi, likay yahyou ila el-abad.\n\nLi-annahu ghulib, min ra\'fatihi, wa arsala lana, dhira\'ahu el-\'aliya.\n\n+ Ashraqa jasadiyyan, min el-\'adhra\', bi-ghayr zar\' basharin, hatta khallasana.' },
    { language: 'arabic', text: 'إفرحوا وتهللوا، يا جنس البشر، لأنه هكذا، أحب الله العالم.\n\n+ حتى بذل، إبنه الحبيب، عن المؤمنين به، لكي يحيوا إلى الأبد.\n\nلأنه غُلِب، من رأفته، وأرسل لنا، ذراعه العالية.\n\n+ أشرق جسدياً، من العذراء، بغير زرع بشرٍ، حتى خلصنا.' },
  ],
  6: [
    { language: 'coptic', text: 'Ⲫⲏⲉⲧϣⲟⲡ: ⲫⲏⲉ̀ⲛⲁϥϣⲟⲡ: ⲫⲏⲉ̀ⲧⲁϥⲓ̀: ⲡⲁⲗⲓⲛ ⲟⲛ ϥ̀ⲛⲏⲟⲩ.\n\n+ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲓⲗⲟⲅⲟⲥ: ⲉ̀ⲧⲁϥϭⲓⲥⲁⲣⲝ: ϧⲉⲛ ⲟⲩⲙⲉⲧⲁⲧϣⲓⲃⲧ: ⲁϥϣⲱⲡⲓ ⲛ̀ⲣⲱⲙⲓ ⲛ̀ⲧⲉⲗⲓⲟⲥ.\n\nⲘ̀ⲡⲉϥϫⲱϣ ⲙ̀ⲡⲉϥⲑⲱϧ: ⲟⲩⲇⲉ ⲙ̀ⲡⲉϥⲫⲱⲣϫ: ⲕⲁⲧⲁ ϩ̀ⲗⲓ ⲛ̀ⲥ̀ⲙⲟⲧ: ⲙⲉⲛⲉⲛⲥⲁ ϯⲙⲉⲧⲟⲩⲁⲓ.\n\n+ Ⲁⲗⲗⲁ ⲟⲩⲫⲩⲥⲓⲥ ⲛ̀ⲟⲩⲱⲧ: ⲟⲩϩⲩⲡⲟⲥⲧⲁⲥⲓⲥ ⲛ̀ⲟⲩⲱⲧ: ⲟⲩⲡ̀ⲣⲟⲥⲟ̀ⲡⲟⲛ ⲛ̀ⲟⲩⲱⲧ: ⲛ̀ⲧⲉ Ⲫ̀ⲛⲟⲩϯ Ⲡⲓⲗⲟⲅⲟⲥ.\n\nⲀϥϣⲁⲓ ⲥⲱⲙⲁⲧⲓⲕⲱⲥ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: 'Fēetshop: fē-enafshop: fē-etafi: palin on efnēou.\n\n+ Iēsous Pi-ekhristos Pilogos: etaftshisarks: khen oumetatshibt: afshōpi enrōmi entelios.\n\nEmpefjōsh empefthōkh: oude empeffōrj: kata ehli enesmot: menensa timetouai.\n\n+ Alla oufusis enouōt: ouhupostasis enouōt: ou-eprosopon enouōt: ente Efnouti Pilogos.\n\nAfshai sōmatikōs: evol khen Tiparthenos: atshne esperma enrōmi: sha entefsōti emmon.' },
    { language: 'english', text: 'He who is, and who was, who has come, who is to come again.\n\n+ Jesus Christ the Word, who was incarnate, without alteration, became a perfect man.\n\nWithout alteration of His being, or mingling or separation, of any kind, after the unity.\n\n+ But He is of one nature, one hypostasis, and one person, for God the Word.\n\nHe shone in the flesh, taken from the Virgin, without the seed of man, in order to save us.' },
    { language: 'englishArabic', text: 'El-ka\'in, alladhi kan, alladhi ata, wa aydan ya\'ti.\n\n+ Yasou\' el-Maseeh el-kalima, alladhi tajassad, bi-ghayr taghyeer, wa sara insanan kamilan.\n\nLam yafid wa lam yakhtalit, wa lam yaftariq, bi-shay\' min el-anwa\', min ba\'d el-ittihad.\n\n+ Bal bi-tabee\'a wahida, wa uqnoum wahid, wa shakhs wahid, lillah el-kalima.\n\nAshraqa jasadiyyan, min el-\'adhra\', bi-ghayr zar\' basharin, hatta khallasana.' },
    { language: 'arabic', text: 'الكائن، الذي كان، الذي أتى، وأيضاً يأتي.\n\n+ يسوع المسيح الكلمة، الذي تجسد، بغير تغيير، وصار إنساناً كاملاً.\n\nلم يفض ولم يختلط، ولم يفترق، بشئ من الأنواع، من بعد الإتحاد.\n\n+ بل بطبيعة واحدة، وأُقنوم واحد، وشخص واحد، لله الكلمة.\n\nأشرق جسدياً، من العذراء، بغير زرع بشرٍ، حتى خلصنا.' },
  ],
  7: [
    { language: 'coptic', text: '+ Ⲭⲉⲣⲉ Ⲃⲏⲑⲗⲉⲉⲙ: ⲧ̀ⲡⲟⲗⲓⲥ ⲛ̀ⲛⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ: ⲑⲏⲉ̀ⲧⲁⲩⲙⲉⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ⲛ̀ϧⲏⲧⲥ: ⲡⲓⲙⲁϩⲥ̀ⲛⲁⲩ ⲛ̀Ⲁ̀ⲇⲁⲙ.\n\nϨⲓⲛⲁ ⲛ̀ⲧⲉϥⲧⲁⲑⲥⲟ ⲛ̀Ⲁ̀ⲇⲁⲙ: ⲡⲓϩⲟⲩⲓⲧ ⲛ̀ⲣⲱⲙⲓ: ⲡⲓⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲡ̀ⲕⲁϩⲓ: ⲉ̀Ⲡⲓⲡⲁⲣⲁⲇⲓⲥⲟⲥ.\n\n+ Ⲟⲩⲟϩ ⲛ̀ⲧⲉϥⲃⲱⲗ ⲉ̀ⲃⲟⲗ: ⲛ̀ⲧ̀ⲁ̀ⲡⲟⲫⲁⲥⲓⲥ ⲙ̀ⲫ̀ⲙⲟⲩ: ϫⲉ Ⲁ̀ⲇⲁⲙ ⲛ̀ⲑⲟⲕ ⲟⲩⲕⲁϩⲓ: ⲭ̀ⲛⲁⲧⲁⲥⲑⲟⲕ ⲉ̀ⲡ̀ⲕⲁϩⲓ.\n\nⲠⲓⲙⲁ ⲅⲁⲣ ⲉ̀ⲧⲁϥⲁ̀ϣⲁⲓ: ⲙ̀ⲙⲟϥ ⲛ̀ϫⲉ ⲫ̀ⲛⲟⲃⲓ: ⲁϥⲉⲣϩⲟⲩⲟ̀ ⲁ̀ϣⲁⲓ ⲛ̀ϧⲏⲧϥ: ⲛ̀ϫⲉ ⲡⲓϩ̀ⲙⲟⲧ ⲙ̀Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ.\n\n+ Ⲁϥϣⲁⲓ ⲥⲱⲙⲁⲧⲓⲕⲱⲥ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: '+ Khere Vēthleem: etpolis enni-eprofētēs: thē-etaumes Pi-ekhristos enkhēts: pimahesnau en-Adam.\n\nHina enteftathso en-Adam: pihouit enrōmi: pi-evol khen epkahi: e-Piparadisos.\n\n+ Ouoh entefvōl evol: enetapofasis emefmou: je Adam enthok oukahi: ekhnatasthok e-epkahi.\n\nPima gar etafashai: emmof enje efnovi: aferhou-o ashai enkhētf: enje pi-ehmot em-Pi-ekhristos.\n\n+ Afshai sōmatikōs: evol khen Tiparthenos: atshne esperma enrōmi: sha entefsōti emmon.' },
    { language: 'english', text: '+ Hail to Bethlehem, the city of the prophets, in which was born Christ, the second Adam.\n\nIn order to bring Adam, the first man, who was made of dust, back to Paradise.\n\n+ And to absolve, the decree of death saying, “Adam you are from dust, and to dust you shall return.”\n\nFor in the place, where sin has abounded, the grace of Christ, has abounded more.\n\n+ He shone in the flesh, taken from the Virgin, without the seed of man, in order to save us.' },
    { language: 'englishArabic', text: '+ Es-salam li-Bayt Lahm, madeenat el-anbiya\', allati wulida feeha el-Maseeh, Adam eth-thani.\n\nLikay yarudd Adam, el-insan el-awwal, et-turabi, ila el-firdaws.\n\n+ Wa yahill qadiyyat el-mawt, innaka ya Adam, anta turab wa ila, et-turab ta\'oud.\n\nLi-anna el-mawdi\', alladhi kathurat feeha el-khatiya, tafadalat feehi, ni\'mat el-Maseeh.\n\n+ Ashraqa jasadiyyan, min el-\'adhra\', bi-ghayr zar\' basharin, hatta khallasana.' },
    { language: 'arabic', text: '+ السلام لبيت لحم، مدينة الأنبياء، التي وُلِدَ فيها المسيح، آدم الثاني.\n\nلكي يرد آدم، الإنسان الأول، الترابي، إلى الفردوس.\n\n+ ويحل قضية الموت، "إنك يا آدم، أنت تراب وإلى، التراب تعود."\n\nلأن الموضع، الذي كثرت فيها الخطية، تفاضلت فيه، نعمة المسيح.\n\n+ أشرق جسدياً، من العذراء، بغير زرع بشرٍ، حتى خلصنا.' },
  ],
  8: [
    { language: 'coptic', text: 'Ⲯⲩⲭⲏ ⲛⲓⲃⲉⲛ ⲣⲁϣⲓ: ⲟⲩⲟϩ ⲥⲉⲉⲣⲭⲱⲣⲉⲩⲓⲛ: ⲛⲉⲙ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ: ⲉⲩϩⲱⲥ ⲉ̀Ⲡ̀ⲟⲩⲣⲟ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ.\n\n+ Ⲉⲩⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲩϫⲱ ⲙ̀ⲙⲟⲥ: ϫⲉ ⲟⲩⲱ̀ⲟⲩ ϧⲉⲛ ⲛⲏⲉⲧϭⲟⲥⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ⲛⲉⲙ ⲟⲩϩⲓⲣⲏⲛⲏ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ: ⲛⲉⲙ ⲟⲩϯⲙⲁϯ ϧⲉⲛ ⲛⲓⲣⲱⲙⲓ.\n\nϪⲉ ⲁϥⲃⲱⲗ ⲅⲁⲣ ⲉ̀ⲃⲟⲗ: ⲙ̀ⲡⲓϫⲓⲛⲓ̀ ⲉ̀ⲑ̀ⲙⲏϯ: ⲁϥϧⲱⲧⲉⲃ ϧⲉⲛ ⲟⲩϫⲱⲕ: ⲛ̀ϯⲙⲉⲧϫⲁϫⲓ.\n\n+ Ⲁϥⲫⲱϧ ⲙ̀ⲡⲓⲥ̀ϧⲓ ⲛ̀ϫⲓϫ: ⲛ̀ⲧⲉ ϯⲙⲉⲧⲃⲱⲕ: ⲛ̀ⲧⲉ Ⲁ̀ⲇⲁⲙ ⲛⲉⲙ Ⲉ̀ⲩⲁ: ⲁϥⲁⲓⲧⲟⲩ ⲛ̀ⲣⲉⲙϩⲉ.\n\nⲚ̀ϫⲉ ⲫⲏⲉ̀ⲧⲁϥⲙⲁⲥϥ ⲛⲁⲛ: ϧⲉⲛ ⲑ̀ⲃⲁⲕⲓ ⲛ̀Ⲇⲁⲩⲓⲇ: ⲕⲁⲧⲁ ⲡ̀ⲥⲁϫⲓ ⲙ̀ⲡⲓⲁⲅⲅⲉⲗⲟⲥ: Ⲡⲉⲛⲥⲱⲧⲏⲣ Ⲓⲏⲥⲟⲩⲥ.\n\n+ Ⲁϥϣⲁⲓ ⲥⲱⲙⲁⲧⲓⲕⲱⲥ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: 'Psukhē niven rashi: ouoh seerkhōreuin: nem niaggelos: euhōs e-Epouro Pi-ekhristos.\n\n+ Euōsh evol eujō emmos: je ou-ōou khen nēettshosi em-Efnouti: nem ouhirēnē hijen pikahi: nem outimati khen nirōmi.\n\nJe afvōl gar evol: empijini e-ethmēti: afkhōteb khen oujōk: entimetjaji.\n\n+ Affōkh empi-eskhi enjij: ente timetvōk: ente Adam nem Eua: afaitou enremhe.\n\nEnje fē-etafmasf nan: khen ethvaki en-Dauid: kata epsaji empiaggelos: Pensōtēr Iēsous.\n\n+ Afshai sōmatikōs: evol khen Tiparthenos: atshne esperma enrōmi: sha entefsōti emmon.' },
    { language: 'english', text: 'All the souls, rejoice and sing, with the angels, and praise Christ the King.\n\n+ Proclaiming and saying, “Glory to God in the highest, peace on earth, and goodwill toward men.”\n\nFor He has destroyed, the middle wall, and killed the enmity, with perfection.\n\n+ He has torn, the verdict of slavery, pronounced on Adam and Eve, and He freed them.\n\nHe who was born for us, in the city of David, is our Savior Jesus, as the angel said.\n\n+ He shone in the flesh, taken from the Virgin, without the seed of man, in order to save us.' },
    { language: 'englishArabic', text: 'Kull el-anfus, tafrah wa turattil, ma\'a el-mala\'ika, musabbiheen el-malik el-Maseeh.\n\n+ Wa sarikheen qa\'ileen, el-majd lillah fil-a\'ali, wa \'ala el-ard es-salam, wa fin-nas el-masarra.\n\nLi-annahu halla, el-hajiz, wa qatala el-\'adawa, bil-kamal.\n\n+ Wa mazzaqa kitab, yad el-\'ubudiya, allati li-Adam wa Hawwa\', wa harrarahuma.\n\nAlladhi wulida lana, fi madeenat Dawoud, mukhallisuna Yasou\', ka-qawl el-malak.\n\n+ Ashraqa jasadiyyan, min el-\'adhra\', bi-ghayr zar\' basharin, hatta khallasana.' },
    { language: 'arabic', text: 'كل الأنفس، تفرح وترتل، مع الملائكة، مُسبحين الملك المسيح.\n\n+ وصارخين قائلين، "المجد لله في الأعالي، وعلى الأرض السلام، وفي الناس المسرة."\n\nلأنه حلَّ، الحاجز، وقتل العداوة، بالكمال.\n\n+ ومزَّق كتاب، يد العبودية، التي لآدم وحواء، وحررهما.\n\nالذي وُلِدَ لنا، في مدينة داود، مُخلِّصنا يسوع، كقول الملاك.\n\n+ أشرق جسدياً، من العذراء، بغير زرع بشرٍ، حتى خلصنا.' },
  ],
  9: [
    { language: 'coptic', text: 'Ⲟⲩⲟⲩⲱⲓⲛⲓ ⲡⲉ Ⲫ̀ⲛⲟⲩϯ: ⲉϥϣⲱⲡ ϧⲉⲛ ⲡⲓⲟⲩⲱⲓⲛⲓ: ϩⲁⲛⲁⲅⲅⲉⲗⲟⲥ ⲛ̀ⲟⲩⲱⲓⲛⲓ: ⲉⲧⲉⲣϩⲩⲙⲛⲟⲥ ⲉ̀ⲣⲟϥ.\n\n+ Ⲁ̀ Ⲡⲓⲟⲩⲱⲓⲛⲓ ϣⲁⲓ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ⲙⲁⲣⲓⲁ: ⲁ̀ Ⲉ̀ⲗⲓⲥⲁⲃⲉⲧ ⲙⲓⲥⲓ: ⲙ̀ⲡⲓⲡ̀ⲣⲟⲇⲣⲟⲙⲟⲥ.\n\nⲀ̀ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲉⲑⲟⲩⲁⲃ: ⲛⲉϩⲥⲓ ϧⲉⲛ Ⲇⲁⲩⲓⲇ: ϫⲉ ⲧⲱⲛⲕ ⲁ̀ⲣⲓⲯⲁⲗⲓⲛ: ϫⲉ ⲁ̀ Ⲡⲓⲟⲩⲱⲓⲛⲓ ϣⲁⲓ.\n\n+ Ⲁϥⲧⲱⲛϥ ⲛ̀ϫⲉ Ⲇⲁⲩⲓⲇ: ⲡⲓϩⲩⲙⲛⲟⲇⲟⲥ ⲉⲑⲟⲩⲁⲃ: ⲁϥϭⲓ ⲛ̀ⲧⲉϥⲕⲩⲑⲁⲣⲁ: ⲙ̀ⲡ̀ⲛⲉⲩⲙⲁⲧⲓⲕⲟⲛ.\n\nⲀϥϩⲱⲗ ⲉ̀ϯⲉⲕⲕⲗⲏⲥⲓⲁ: ⲡ̀ⲏⲓ ⲛ̀ⲧⲉ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ: ⲁϥϩⲱⲥ ⲁϥⲉⲣϩⲩⲙⲛⲟⲥ: ⲉ̀Ϯⲧ̀ⲣⲓⲁⲥ ⲉⲑⲟⲩⲁⲃ.\n\n+ Ϫⲉ ϧⲉⲛ ⲡⲉⲕⲟⲩⲱⲓⲛⲓ: Ⲡ̀ϭⲟⲓⲥ ⲉⲛⲉ̀ⲛⲁⲩ ⲉ̀ⲟⲩⲱⲓⲛⲓ: ⲙⲁⲣⲉϥⲓ̀ ⲛ̀ϫⲉ ⲡⲉⲕⲛⲁⲓ: ⲛ̀ⲛⲏⲉⲧⲥⲱⲟⲩⲛ ⲙ̀ⲙⲟⲕ.\n\nⲠⲓⲟⲩⲱⲓⲛⲓ ⲛ̀ⲧⲁⲫ̀ⲙⲏⲓ: ⲫⲏⲉⲧⲉⲣⲟⲩⲱⲓⲛⲓ: ⲉ̀ⲣⲱⲙⲓ ⲛⲓⲃⲉⲛ: ⲉⲑⲛⲏⲟⲩ ⲉ̀ⲡⲓⲕⲟⲥⲙⲟⲥ.\n\n+ Ⲁⲕⲓ̀ ⲉ̀ⲡⲓⲕⲟⲥⲙⲟⲥ: ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲙⲁⲓⲣⲱⲙⲓ: ⲁ̀ ϯⲕ̀ⲧⲏⲥⲓⲥ ⲧⲏⲣⲥ: ⲑⲉⲗⲏⲗ ϧⲁ ⲡⲉⲕϫⲓⲛⲓ̀.\n\nⲀⲕⲥⲱϯ ⲛ̀Ⲁ̀ⲇⲁⲙ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ ϯⲁ̀ⲡⲁⲧⲏ: ⲁⲕⲉⲣ Ⲉ̀ⲩⲁ ⲛ̀ⲣⲉⲙϩⲉ: ϧⲉⲛ ⲛⲓⲛⲁⲕϩⲓ ⲛ̀ⲧⲉ ⲫ̀ⲙⲟⲩ.\n\n+ Ⲁⲕϯ ⲛⲁⲛ ⲙ̀Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ: ⲛ̀ⲧⲉ ϯⲙⲉⲧϣⲏⲣⲓ: ⲉⲛϩⲱⲥ ⲉⲛⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲕ: ⲛⲉⲙ ⲛⲉⲕⲁⲅⲅⲉⲗⲟⲥ.\n\nⲀϥϣⲁⲓ ⲥⲱⲙⲁⲧⲓⲕⲱⲥ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: 'Ououōini pe Efnouti: efshōp khen piouōini: hanaggelos enouōini: eterhumnos erof.\n\n+ A Piouōini shai: evol khen Maria: a Elisavet misi: empi-eprodromos.\n\nA Pi-epneuma Ethouab: nehsi khen Dauid: je tōnk aripsalin: je a Piouōini shai.\n\n+ Aftōnf enje Dauid: pihumnodos ethouab: aftshi entefkuthara: emepneumatikon.\n\nAfhōl etiekklēsia: epēi ente niaggelos: afhōs aferhumnos: e-Ti-etrias ethouab.\n\n+ Je khen pekouōini: Eptshois enenau eouōini: marefi enje peknai: ennēetsōoun emmok.\n\nPiouōini enta-efmēi: fēeterouōini: erōmi niven: ethnēou epikosmos.\n\n+ Aki epikosmos: hiten tekmetmairōmi: a ti-ektēsis tērs: thelēl kha pekjini.\n\nAksōti en-Adam: evol khen ti-apatē: aker Eua enremhe: khen ninakhi ente efmou.\n\n+ Akti nan em-Pi-epneuma: ente timetshēri: enhōs enesmou erok: nem nekaggelos.\n\nAfshai sōmatikōs: evol khen Tiparthenos: atshne esperma enrōmi: sha entefsōti emmon.' },
    { language: 'english', text: 'God is light, He abides in light, and the angels of light, sing unto Him.\n\n+ The Light has shone, from Mary, and Elizabeth, gave birth to the forerunner.\n\nThe Holy Spirit, woke up in David, and said “Arise and sing, for the Light has shone.”\n\n+ So David the psalmist, and the holy one, rose up and took his, spiritual harp.\n\nHe went to the church, the house of the angels, he praised and chanted to, the Holy Trinity.\n\n+ Saying “In Your light, O Lord we will see light, let Your mercy come, to those who know You.”\n\nO true Light, that shines upon, every man, that comes into the world.\n\n+ You have come into the world, through Your love for man, and all the creation, rejoiced at Your coming.\n\nYou have saved Adam, from the seduction, and delivered Eve, from the pangs of death.\n\n+ You gave unto us, the Spirit of sonship, we praise and bless You, with Your angels.\n\nHe shone in the flesh, taken from the Virgin, without the seed of man, in order to save us.' },
    { language: 'englishArabic', text: 'Allah huwa nour, wa sakin fin-nour, tusabbihuhu, mala\'ikat en-nour.\n\n+ En-nour ashraq, min Maryam, wa Elisabat, waladat es-sabiq.\n\nEr-Rooh el-Qudus, ayqaza Dawoud qa\'ilan, qum rattil li-anna, en-nour qad ashraq.\n\n+ Fa-qama Dawoud, el-murattil el-qiddis, wa akhadha qeetharatahu, er-rouhiya.\n\nWa mada ila el-bee\'a, bayt el-mala\'ika, fa-sabbaha wa rattal, lith-thalouth el-quddous.\n\n+ Qa\'ilan bi-nourika, ya Rabb nu\'ayin nouran, faltati rahmatuka, lilladheena ya\'rifounak.\n\nAyyuha en-nour el-haqiqi, alladhi yudi\', li-kulli insan, atiyan ila el-\'alam.\n\n+ Atayta ila el-\'alam, bi-mahabbatika lil-bashar, wa kull el-khaleeqa, tahallalat bi-maji\'ik.\n\nKhallasta Adam, min el-ghawaya, wa \'ataqta Hawwa\', min talqat el-mawt.\n\n+ A\'taytana, rouh el-bunouwa, nusabbihuka wa nubarikuka, ma\'a mala\'ikatik.\n\nAshraqa jasadiyyan, min el-\'adhra\', bi-ghayr zar\' basharin, hatta khallasana.' },
    { language: 'arabic', text: 'الله هو نور، وساكن في النور، تسبحه، ملائكة النور.\n\n+ النور أشرق، من مريم، وأليصابات، ولدت السابق.\n\nالرُّوح القُدُس، أيقظ داود قائلاً، "قم رتِّل لأن، النور قد أشرق."\n\n+ فقام داود، المُرتِّل القديس، وأخذ قيثارته، الروحية.\n\nومضى إلى البيعة، بيت الملائكة، فسبَّح ورتَّل، للثالوث القدوس.\n\n+ قائلاً "بنورك، يا رب نعاين نوراً، فلتأت رحمتك، للذين يعرفونك."\n\nأيها النور الحقيقي، الذي يضئ، لكل إنسان، آتياً إلى العالم.\n\n+ أتيت إلى العالم، بمحبتك للبشر، وكل الخليقة، تهللت بمجيئك.\n\nخلَّصت آدم، من الغواية، وعتقت حواء، من طلقات الموت.\n\n+ أعطيتنا، روح البنوة، نُسبحك ونُباركك، مع ملائكتك.\n\nأشرق جسدياً، من العذراء، بغير زرع بشرٍ، حتى خلصنا.' },
  ],
};

const tuesdayTheotokiaTexts: Record<number, LanguageVersion[]> = {
  1: [
    { language: 'coptic', text: 'Ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ⲡⲉⲛϣⲟⲩϣⲟⲩ: ⲧ̀ⲁ̀ⲡⲁⲣⲭⲏ ⲙ̀ⲡⲉⲛⲥⲱϯ: ⲡ̀ⲧⲁϫⲣⲟ ⲙ̀ⲡⲉⲛⲧⲟⲩⲃⲟ: ⲡⲉ Ⲙⲁⲣⲓⲁ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ.\n\n+ Ⲑⲏⲉ̀ⲧⲁⲥⲙⲓⲥⲓ ⲛⲁⲛ: ⲙ̀Ⲫ̀ⲛⲟⲩϯ Ⲡⲓⲗⲟⲅⲟⲥ: ⲫⲏⲉ̀ⲧⲁϥϣⲱⲡⲓ ⲛ̀ⲣⲱⲙⲓ: ⲉⲑⲃⲉ ⲡⲉⲛⲟⲩϫⲁⲓ.\n\nⲘⲉⲛⲉⲛⲥⲁ ⲑ̀ⲣⲉϥⲉⲣⲣⲱⲙⲓ: ⲛ̀ⲑⲟϥ ⲟⲛ ⲡⲉ Ⲫ̀ⲛⲟⲩϯ: ⲉⲑⲃⲉ ⲫⲁⲓ ⲁⲥⲙⲁⲥϥ: ⲉⲥⲟⲓ ⲙ̀ⲡⲁⲣⲑⲉⲛⲟⲥ.\n\n+ Ⲥ̀ϭⲟⲥⲓ ⲛ̀ϫⲉ ϯϣ̀ⲫⲏⲣⲓ: ⲛ̀ⲧⲉ ⲡⲉⲥϫⲓⲛⲉⲣⲃⲟⲕⲓ: ⲡⲉⲥϫⲓⲛⲙⲓⲥⲓ ⲟⲛ: ⲟⲩⲁⲧⲥⲁϫⲓ ⲙ̀ⲙⲟϥ ⲡⲉ.\n\nϪⲉ ⲛ̀ⲑⲟϥ ϧⲉⲛ ⲡⲉϥⲟⲩⲱϣ: ⲛⲉⲙ ⲡ̀ϯⲙⲁϯ ⲙ̀Ⲡⲉϥⲓⲱⲧ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲉⲑⲟⲩⲁⲃ: ⲁϥⲓ̀ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: 'Pi-ekhlom ente penshoushou: etaparkhē empensōti: eptajro empentouvo: pe Maria Tiparthenos.\n\n+ Thē-etasmisi nan: em-Efnouti Pilogos: fē-etafshōpi enrōmi: ethve penoujai.\n\nMenensa ethreferrōmi: enthof on pe Efnouti: ethve fai asmasf: esoi emparthenos.\n\n+ Estshosi enje ti-eshfēri: ente pesjinervoki: pesjinmisi on: ouatsaji emmof pe.\n\nJe enthof khen pefouōsh: nem eptimati em-Pefiōt: nem Pi-epneuma Ethouab: afi afsōti emmon.' },
    { language: 'english', text: 'The crown of our pride, the head of our salvation, the confirmation of our purity, is the Virgin Mary.\n\n+ Who for us gave birth to, God the Word, who became man, for our salvation.\n\nAnd after He became man, He is also God, therefore she gave birth to Him, while a virgin.\n\n+ Exalted is the wonder, of her pregnancy, and her delivery, is unutterable.\n\nFor of His own will, and the pleasure of His Father, and the Holy Spirit, He came and saved us.' },
    { language: 'englishArabic', text: 'Ikleel fakhrina, wa ra\'s khalasina, wa thabat tuhrina, hiya Maryam el-\'adhra\'.\n\n+ Allati waladat lana, Allah el-kalima, alladhi sara insanan, li-ajl khalasina.\n\nWa ba\'d an sara insanan, huwa el-ilah aydan, fa-li-hadha waladathu, wa hiya \'adhra\'.\n\n+ \'Aliya hiya el-u\'jouba, allati li-hablaha, wa wiladatuha aydan, la yuntaq bih.\n\nLi-annahu bi-iradatihi, wa masarrat abeeh, war-Rooh el-Qudus, ata wa khallasana.' },
    { language: 'arabic', text: 'إكليل فخرنا، ورأس خلاصنا، وثبات طُهرنا، هي مريم العذراء.\n\n+ التي ولدت لنا، الله الكلمة، الذي صار إنساناً، لإجل خلاصنا.\n\nوبعد أن صار إنساناً، هو الإله أيضاً، فلهذا ولدته، وهي عذراء.\n\n+ عالية هي الأُعجوبة، التي لحبلها، وولادتها أيضاً، لا يُنطق به.\n\nلأنه بإرادته، ومسرة أبيه، والرُّوح القُدُس، أتى وخلصنا.' },
  ],
  2: [
    { language: 'coptic', text: '+ Ⲟⲩⲛⲓϣϯ ⲡⲉ ⲡ̀ⲱ̀ⲟⲩ: ⲛ̀ⲧⲉ ⲧⲉⲡⲁⲣⲑⲉⲛⲓⲁ: Ⲙⲁⲣⲓⲁ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲑⲏⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ.\n\nⲀ̀ⲣⲉϫⲉⲙ ϩ̀ⲙⲟⲧ: Ⲡ̀ϭⲟⲓⲥ ϣⲟⲡ ⲛⲉⲙⲉ: ⲛ̀ⲑⲟ ⲧⲉ ϯⲙⲟⲕⲓ: ⲑⲏⲉ̀ⲧⲁ Ⲓⲁⲕⲱⲃ ⲛⲁⲩ ⲉ̀ⲣⲟⲥ.\n\n+ Ⲉⲥⲧⲁϫⲣⲏⲟⲩⲧ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ: ⲉⲥϭⲟⲥⲓ ϣⲁ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ⲧ̀ⲫⲉ: ⲉ̀ⲣⲉ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ: ⲛⲏⲟⲩ ⲉ̀ⲡⲉⲥⲏⲧ ϩⲓⲱⲧⲥ.\n\nⲚ̀ⲑⲟ ⲡⲉ ⲡⲓϣ̀ϣⲏⲛ: ⲉ̀ⲧⲁϥⲛⲁⲩ ⲉ̀ⲣⲟϥ ⲛ̀ϫⲉ Ⲙⲱⲩ̀ⲥⲏⲥ: ⲉϥⲙⲟϩ ϧⲉⲛ ⲡⲓⲭ̀ⲣⲱⲙ: ⲟⲩⲟϩ ⲛⲁϥⲣⲱⲕϩ ⲁⲛ.\n\n+ Ⲉ̀ⲧⲉ ⲫⲁⲓ ⲡⲉ Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ⲉ̀ⲧⲁϥϣⲱⲡⲓ ϧⲉⲛ ⲧⲉⲛⲉϫⲓ: ⲙ̀ⲡⲉ ⲡⲓⲭ̀ⲣⲱⲙ ⲛ̀ⲧⲉ ⲧⲉϥⲙⲉⲑⲛⲟⲩϯ: ⲣⲱⲕϩ ⲙ̀ⲡⲉⲥⲱⲙⲁ.\n\nⲚ̀ⲑⲟ ⲧⲉ ϯⲕⲟⲓ: ⲙ̀ⲡⲟⲩϯϫ̀ⲣⲟϫ ⲉ̀ⲣⲟⲥ: ⲁ̀ⲣⲉⲧⲁⲟⲩⲟ̀ ⲉ̀ⲃⲟⲗ: ⲛ̀Ⲟⲩⲕⲁⲣⲡⲟⲥ ⲛ̀ⲱⲛϧ.\n\n+ Ⲛ̀ⲑⲟ ⲡⲉ ⲡⲓⲁ̀ϩⲟ: ⲉ̀ⲧⲁϥϣⲟⲡϥ ⲛ̀ϫⲉ Ⲓⲱⲥⲏⲫ: ⲁϥϫⲉⲙ ⲡⲓⲙⲁⲣⲅⲁⲣⲓⲧⲏⲥ: ⲉϥϩⲏⲡ ϧⲉⲛ ⲧⲉϥⲙⲏϯ.\n\nⲀϥϫⲉⲙ Ⲡⲉⲛⲥⲱⲧⲏⲣ: Ⲓⲏⲥⲟⲩⲥ ϧⲉⲛ ⲧⲉⲛⲉϫⲓ: ⲁ̀ⲣⲉϫ̀ⲫⲟϥ ⲉ̀ⲡⲓⲕⲟⲥⲙⲟⲥ: ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.\n\n+ Ϫⲉ ⲛ̀ⲑⲟϥ ϧⲉⲛ ⲡⲉϥⲟⲩⲱϣ: ⲛⲉⲙ ⲡ̀ϯⲙⲁϯ ⲙ̀Ⲡⲉϥⲓⲱⲧ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲉⲑⲟⲩⲁⲃ: ⲁϥⲓ̀ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: '+ Ounishti pe epōou: ente teparthenia: Maria Tiparthenos: thēetjēk evol.\n\nArejem ehmot: Eptshois shop neme: entho te timoki: thē-eta Iakōb nau eros.\n\n+ Estajrēout hijen pikahi: estshosi sha e-ehrēi e-etfe: ere niaggelos: nēou epesēt hiōts.\n\nEntho pe pi-eshshēn: etafnau erof enje Mō-usēs: efmoh khen pi-ekhrōm: ouoh nafrōkh an.\n\n+ Ete fai pe Epshēri em-Efnouti: etafshōpi khen teneji: empe pi-ekhrōm ente tefmethnouti: rōkh empesōma.\n\nEntho te tikoi: empouti-ejroj eros: aretaou-o evol: en-Oukarpos enōnkh.\n\n+ Entho pe pi-aho: etafshopf enje Iōsēf: afjem pimargaritēs: efhēp khen tefmēti.\n\nAfjem Pensōtēr: Iēsous khen teneji: are-ejfof epikosmos: sha entefsōti emmon.\n\n+ Je enthof khen pefouōsh: nem eptimati em-Pefiōt: nem Pi-epneuma Ethouab: afi afsōti emmon.' },
    { language: 'english', text: '+ Great is the glory, of your virginity, O Virgin Mary, the perfect one.\n\nYou have found grace, and the Lord is with you, you are the ladder, which Jacob saw.\n\n+ Set firmly on the earth, reaching to heaven, where the angels, come down upon it.\n\nYou are the tree, which Moses has seen, flaming with fire, and was not consumed.\n\n+ This is the Son of God, who dwelt in your womb, the fire of His divinity, did not burn your body.\n\nYou are the field, that was not planted, but you did give, the Fruit of life.\n\n+ You are the treasure, that Joseph bought, and he found the pearl, hidden in its midst.\n\nOur Savior Jesus, was found in your womb, you bore Him for the world, that He may save us.\n\n+ For of His own will, and the pleasure of His Father, and the Holy Spirit, He came and saved us.' },
    { language: 'englishArabic', text: '+ \'Azeem huwa majd, batouliyatiki, ya Maryam el-\'adhra\', el-kamila.\n\nWajadti ni\'ma, er-Rabbu ma\'aki, anti hiya es-sullam, allati ra\'aha Ya\'qoub.\n\n+ Thabita \'ala el-ard, wa murtafi\'a ila es-sama\', wal-mala\'ika, nazilouna \'alayha.\n\nAnti hiya esh-shajara, allati ra\'aha Mousa, mutaqqida bin-nar, wa lam tahtariq.\n\n+ Ay ibn Allah, alladhi ata wa halla fi batniki, wa nar lahoutihi, lam tuhriq jasadaki.\n\nAnti hiya el-haql, alladhi lam yuzra\', wa akhrajti, thamarat hayah.\n\n+ Anti hiya el-kanz, alladhi ishtarahu Yousef, fa-wajada el-jawhar, makhfiyyan fi wasatih.\n\nWujida mukhallisuna, Yasou\' fi batniki, wa waladtihi ila el-\'alam, hatta khallasana.\n\n+ Li-annahu bi-iradatihi, wa masarrat abeeh, war-Rooh el-Qudus, ata wa khallasana.' },
    { language: 'arabic', text: '+ عظيم هو مجد، بتوليتِك، يا مريم العذراء، الكاملة.\n\nوجدتِ نعمة، الربُّ مَعَكِ، أنتِ هي السلم، التي رآها يعقوب.\n\n+ ثابتة على الأرض، ومرتفعة إلى السماء، والملائكة، نازلون عليها.\n\nأنتِ هي الشجرة، التي رآها موسى، مُتَقدة بالنار، ولم تحترق.\n\n+ أي إبن الله، الذي أتى وحلَّ في بطنِك، ونار لاهوته، لم تحرق جسدِك.\n\nأنتِ هي الحقل، الذي لم يُزرَع، وأخرجتِ، ثمرة حياة.\n\n+ أنتِ هي الكنز، الذي إشتراه يوسف، فوجد الجوهر، مخفي في وسطه.\n\nوُجد مُخلِّصنا، يسوع في بطنِك، وولدتيِه إلى العالم، حتى خلصنا.\n\n+ لأنه بإرادته، ومسرة أبيه، والرُّوح القُدُس، أتى وخلصنا.' },
  ],
  3: [
    { language: 'coptic', text: 'Ⲭⲉⲣⲉ Ϯⲙⲁⲥⲛⲟⲩϯ: ⲡ̀ⲑⲉⲗⲏⲗ ⲛ̀ⲧⲉ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ: ⲭⲉⲣⲉ ϯⲥⲉⲙⲛⲉ: ⲡ̀ϩⲓⲱⲓϣ ⲛ̀ⲧⲉ ⲛⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ.\n\n+ Ⲭⲉⲣⲉ ⲑⲏⲉ̀ⲧⲁⲥϫⲉⲙ ϩ̀ⲙⲟⲧ: Ⲡ̀ϭⲟⲓⲥ ϣⲟⲡ ⲛⲉⲙⲉ: ⲭⲉⲣⲉ ⲑⲏⲉ̀ⲧⲁⲥϭⲓ ⲛ̀ⲧⲉⲛ ⲡⲓⲁⲅⲅⲉⲗⲟⲥ: ⲙ̀Ⲫ̀ⲣⲁϣⲓ ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ.\n\nⲬⲉⲣⲉ ⲑⲏⲉ̀ⲧⲁⲥⲙⲓⲥⲓ: ⲙ̀Ⲫ̀ⲣⲉϥⲑⲁⲙⲓⲟ ⲙ̀ⲡⲓⲉ̀ⲡ̀ⲧⲏⲣϥ: ⲭⲉⲣⲉ ⲑⲏⲉ̀ⲧⲁⲥⲙ̀ⲡ̀ϣⲁ ⲙ̀ⲙⲟⲩϯ ⲉ̀ⲣⲟⲥ: ϫⲉ Ⲑ̀ⲙⲁⲩ ⲙ̀Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ.\n\n+ Ⲭⲉⲣⲉ ⲑⲏⲉ̀ⲧⲁⲥϯ: ⲙ̀ⲡ̀ⲥⲱϯ ⲛ̀Ⲁ̀ⲇⲁⲙ ⲛⲉⲙ Ⲉ̀ⲩⲁ: ⲭⲉⲣⲉ ⲑⲏⲉ̀ⲧⲁⲥϯϭⲓ: ⲙ̀Ⲫ̀ⲣⲉϥϣⲁⲛϣ ⲛ̀ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ.\n\nⲬⲉⲣⲉ ⲑⲏⲉⲑⲟⲩⲁⲃ: Ⲑ̀ⲙⲁⲩ ⲛ̀ⲛⲏⲉⲧⲟⲛϧ ⲧⲏⲣⲟⲩ: ⲛ̀ⲑⲟ ⲡⲉ ⲉ̀ⲧⲉⲛⲧⲱⲃϩ ⲙ̀ⲙⲟ: ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϫⲱⲛ.\n\n+ Ϫⲉ ⲛ̀ⲑⲟϥ ϧⲉⲛ ⲡⲉϥⲟⲩⲱϣ: ⲛⲉⲙ ⲡ̀ϯⲙⲁϯ ⲙ̀Ⲡⲉϥⲓⲱⲧ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲉⲑⲟⲩⲁⲃ: ⲁϥⲓ̀ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: 'Khere Timasnouti: epthelēl ente niaggelos: khere tisemne: ephiōish ente ni-eprofētēs.\n\n+ Khere thē-etasjem ehmot: Eptshois shop neme: khere thē-etastshi enten piaggelos: em-Efrashi empikosmos.\n\nKhere thē-etasmisi: em-Efrefthamio empi-e-eptērf: khere thē-etasemepsha emmouti eros: je Ethmau em-Pi-ekhristos.\n\n+ Khere thē-etasti: emepsōti en-Adam nem Eua: khere thē-etastitshi: em-Efrefshansh enouon niven.\n\nKhere thēethouab: Ethmau ennēetonkh tērou: entho pe etentōbh emmo: ari-epresveuin ejōn.\n\n+ Je enthof khen pefouōsh: nem eptimati em-Pefiōt: nem Pi-epneuma Ethouab: afi afsōti emmon.' },
    { language: 'english', text: 'Hail to the Mother of God, the rejoicing of angels, hail to the chaste one, the preaching of the prophets.\n\n+ Hail to you who has found grace, the Lord is with you, hail to you who accepted, the Joy of the world.\n\nHail to her who gave birth, to the Creator of all, hail to her who is worthy, to be called the Mother of Christ.\n\n+ Hail to you who brought, salvation to Adam and Eve, hail to her who nursed, the Provider of everyone.\n\nHail to the saint, the Mother of all the living, you are the one we pray to, intercede for us.\n\n+ For of His own will, and the pleasure of His Father, and the Holy Spirit, He came and saved us.' },
    { language: 'englishArabic', text: 'Es-salam li-walidat el-ilah, tahleel el-mala\'ika, es-salam lil-\'afeefa, karazat el-anbiya\'.\n\n+ Es-salam lillati wajadat ni\'ma, er-Rabbu ma\'aki, es-salam lillati qabilat min el-malak, farah el-\'alam.\n\nEs-salam lillati waladat, khaliq el-kull, es-salam lillati istahaqqat, an tud\'a umm el-Maseeh.\n\n+ Es-salam lillati a\'tat, el-khalas li-Adam wa Hawwa\', es-salam lillati arda\'at, \'a\'il kull ahad.\n\nEs-salam lil-qiddisa, umm jamee\' el-ahya\', natlub ilayki, an tashfa\'i feena.\n\n+ Li-annahu bi-iradatihi, wa masarrat abeeh, war-Rooh el-Qudus, ata wa khallasana.' },
    { language: 'arabic', text: 'السلام لوالدة الإله، تهليل الملائكة، السلام للعفيفة، كرازة الأنبياء.\n\n+ السلام للتي وجدت نعمة، الربُّ مَعَكِ، السلام للتي قَبَلت من الملاك، فرح العالم.\n\nالسلام للتي وَلَدت، خالق الكل، السلام للتي إستحقت، أن تُدعى أُم المسيح.\n\n+ السلام للتي أعطت، الخلاص لآدم وحواء، السلام للتي أرضعت، عائل كل أحد.\n\nالسلام للقديسة، أُم جميع الأحياء، نطلب إليكِ، أن تشفعي فينا.\n\n+ لأنه بإرادته، ومسرة أبيه، والرُّوح القُدُس، أتى وخلصنا.' },
  ],
  4: [
    { language: 'coptic', text: 'Ⲁ̀ⲣⲉϣⲁⲛ ⲟⲩⲁⲓ: ϯⲛⲓⲁⲧϥ ⲙ̀ⲙⲟ: ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲉⲑⲟⲩⲁⲃ: ⲟⲩⲟϩ ⲙ̀Ⲙⲁⲥⲛⲟⲩϯ.\n\n+ Ⲛⲉⲙ Ⲡⲓⲙⲩⲥⲧⲏⲣⲓⲟⲛ: ⲉⲧⲟⲓ ⲛ̀ϣ̀ⲫⲏⲣⲓ: ⲉ̀ⲧⲁϥϣⲱⲡⲓ ⲛ̀ϧⲏϯ: ⲉⲑⲃⲉ ⲡⲉⲛⲟⲩϫⲁⲓ.\n\nϤ̀ⲛⲁⲕⲁⲣⲱϥ ⲙⲉⲛ: ⲉⲑⲃⲉ ϯⲙⲉⲧⲁⲧⲥⲁϫⲓ ⲙ̀ⲙⲟϥ: ϥ̀ⲛⲁⲧⲟⲩⲛⲟⲥⲧⲉⲛ ⲉ̀ⲡ̀ϣⲱⲓ: ⲉ̀ⲟⲩϫⲓⲛⲉⲣϩⲩⲙⲛⲟⲥ.\n\n+ Ⲉⲑⲃⲉ ϯⲙⲉⲧⲛⲓϣϯ: ⲛ̀ⲧⲉ ⲫⲏⲉⲧⲟⲓ ⲛ̀ϣ̀ⲫⲏⲣⲓ: ⲛ̀Ⲣⲉϥⲉⲣⲡⲉⲑⲛⲁⲛⲉϥ: ⲉⲧⲟⲓ ⲛ̀ⲟⲩⲑⲟ ⲛ̀ⲣⲏϯ.\n\nⲠⲓⲗⲟⲅⲟⲥ ⲅⲁⲣ ⲉⲧⲟⲛϧ: ⲛ̀ⲧⲉ Ⲫ̀ⲛⲟⲩϯ Ⲫ̀ⲓⲱⲧ: ⲉ̀ⲧⲁϥⲓ̀ ⲉ̀ⲡⲉⲥⲏⲧ ⲉ̀ϯⲛⲟⲙⲟⲥ: ϩⲓϫⲉⲛ ⲡ̀ⲧⲱⲟⲩ ⲛ̀Ⲥⲓⲛⲁ.\n\n+ Ⲁϥϩⲱⲃⲥ ⲛ̀ⲧ̀ⲁ̀ⲫⲉ: ⲡⲓⲧⲱⲟⲩ ϧⲉⲛ ⲟⲩⲭ̀ⲣⲉⲙⲧⲥ: ⲛⲉⲙ ⲟⲩⲭⲁⲕⲓ ⲛⲉⲙ ⲟⲩⲅ̀ⲛⲟⲫⲟⲥ: ⲛⲉⲙ ⲟⲩⲥⲁⲣⲁⲑⲏⲟⲩ.\n\nⲈ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ ϯⲥ̀ⲙⲏ: ⲛ̀ⲧⲉ ϩⲁⲛⲥⲁⲗⲡⲓⲅⲅⲟⲥ: ⲛⲁϥϯⲥ̀ⲃⲱ ϧⲉⲛ ⲟⲩϩⲟϯ: ⲛ̀ⲛⲏⲉⲧⲟ̀ϩⲓ ⲉ̀ⲣⲁⲧⲟⲩ.\n\n+ Ⲛ̀ⲑⲟϥ ⲟⲛ ⲁϥⲓ̀ ⲉ̀ⲡⲉⲥⲏⲧ: ⲉ̀ϫⲱ ϧⲁ ⲡⲓⲧⲱⲟⲩ ⲛ̀ⲗⲟⲅⲓⲕⲟⲛ: ϧⲉⲛ ⲟⲩⲙⲉⲧⲣⲉⲙⲣⲁⲩϣ: ⲛⲉⲙ ⲟⲩⲙⲉⲧⲙⲁⲓⲣⲱⲙⲓ.\n\nⲞⲩⲟϩ ⲟⲛ ⲙ̀ⲡⲁⲓⲣⲏϯ: ⲁϥϭⲓⲥⲁⲣⲝ ⲛ̀ϧⲏϯ: ϧⲉⲛ ⲟⲩⲙⲉⲧⲁⲧϣⲓⲃϯ: ⲛ̀ⲟⲩⲥⲁⲣⲝ ⲛ̀ⲗⲟⲅⲓⲕⲏ.\n\n+ Ⲛ̀ⲟ̀ⲙⲟⲟⲩⲥⲓⲟⲥ ⲛⲉⲙⲁⲛ: ⲉⲥϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲉ̀ⲟⲩⲟⲛ ⲛ̀ⲧⲁⲥ ⲙ̀ⲙⲁⲩ: ⲛ̀ⲟⲩⲯⲩⲭⲏ ⲛ̀ⲛⲟⲏ̀ⲣⲁ.\n\nⲀϥⲟ̀ϩⲓ ⲉϥⲟⲓ ⲛ̀Ⲛⲟⲩϯ: ϧⲉⲛ ⲫⲏⲉ̀ⲛⲁϥⲟⲓ ⲙ̀ⲙⲟϥ: ⲟⲩⲟϩ ⲁϥϣⲱⲡⲓ ⲛ̀ⲣⲱⲙⲓ: ⲛ̀ⲧⲉⲗⲓⲟⲥ.\n\n+ Ϩⲓⲛⲁ ⲛ̀ⲧⲉϥⲃⲱⲗ ⲉ̀ⲃⲟⲗ: ⲙ̀ⲡⲁⲣⲁⲡ̀ⲧⲱⲙⲁ ⲛ̀Ⲁ̀ⲇⲁⲙ: ⲟⲩⲟϩ ⲛ̀ⲧⲉϥⲥⲱϯ: ⲙ̀ⲫⲏⲉ̀ⲧⲁϥⲧⲁⲕⲟ.\n\nⲚ̀ⲧⲉϥⲁⲓϥ ⲙ̀ⲡⲟⲗⲓⲧⲏⲥ: ⲛ̀ϩ̀ⲣⲏⲓ ϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ̀: ⲛ̀ⲧⲉϥⲧⲁⲥⲑⲟϥ ⲉ̀ⲧⲉϥⲁⲣⲭⲏ: ⲕⲁⲧⲁ ⲡⲉϥⲛⲓϣϯ ⲛ̀ⲛⲁⲓ.\n\n+ Ϫⲉ ⲛ̀ⲑⲟϥ ϧⲉⲛ ⲡⲉϥⲟⲩⲱϣ: ⲛⲉⲙ ⲡ̀ϯⲙⲁϯ ⲙ̀Ⲡⲉϥⲓⲱⲧ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲉⲑⲟⲩⲁⲃ: ⲁϥⲓ̀ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: 'Areshan ouai: tiniatf emmo: ō Tiparthenos ethouab: ouoh em-Masnouti.\n\n+ Nem Pimustērion: etoi eneshfēri: etafshōpi enkhēti: ethve penoujai.\n\nEfnakarōf men: ethve timetatsaji emmof: efnatounosten e-epshōi: eoujinerhumnos.\n\n+ Ethve timetnishti: ente fēetoi eneshfēri: en-Referpethnanef: etoi enoutho enrēti.\n\nPilogos gar etonkh: ente Efnouti Efiōt: etafi epesēt etinomos: hijen eptōou en-Sina.\n\n+ Afhōbs enetafe: pitōou khen ou-ekhremts: nem oukhaki nem ou-egnofos: nem ousarathēou.\n\nEvol hiten ti-esmē: ente hansalpiggos: nafti-esvō khen ouhoti: ennēetohi eratou.\n\n+ Enthof on afi epesēt: ejō kha pitōou enlogikon: khen oumetremraush: nem oumetmairōmi.\n\nOuoh on empairēti: aftshisarks enkhēti: khen oumetatshibti: enousarks enlogikē.\n\n+ Enomoousios neman: esjēk evol: eouon entas emmau: enoupsukhē enno-ēra.\n\nAfohi efoi en-Nouti: khen fē-enafoi emmof: ouoh afshōpi enrōmi: entelios.\n\n+ Hina entefvōl evol: empara-eptōma en-Adam: ouoh entefsōti: emfē-etaftako.\n\nEntefaif empolitēs: enehrēi khen nifēou-i: enteftasthof etefarkhē: kata pefnishti ennai.\n\n+ Je enthof khen pefouōsh: nem eptimati em-Pefiōt: nem Pi-epneuma Ethouab: afi afsōti emmon.' },
    { language: 'english', text: 'If someone contemplates, about you, O holy Virgin, and Mother of God.\n\n+ And about the Mystery, full of wonder, which dwelt in you, for our salvation.\n\nHe would keep silent, for he cannot utter, he would make us, rise up for praise.\n\n+ Because of the greatness, of the wonderful, Maker of all, good things.\n\nFor the living Word, of God the Father, came down to give the law, on Mount Sinai.\n\n+ He covered the peak, of the mountain, with smoke and darkness, mist and storms.\n\nThrough the sound, of the trumpets, He was teaching the people, standing with fear.\n\n+ He also descended on you, O speaking mountain, that spoke with humility, and love of mankind.\n\nAnd likewise, He took flesh from you, without alteration, a speaking body.\n\n+ Co-essential with us, and perfect, and also has, a rational soul.\n\nHe remained God, as He is, and became, a perfect man.\n\n+ So as to abolish, the iniquity of Adam, and that He may save, those who perished.\n\nAnd to make him, a citizen of heaven, and restore his leadership, according to His great mercy.\n\n+ For of His own will, and the pleasure of His Father, and the Holy Spirit, He came and saved us.' },
    { language: 'englishArabic', text: 'Idha ta\'ammalaki ahadun, ayyatuha el-\'adhra\', el-qiddisa, walidat el-ilah.\n\n+ Was-sirr, el-\'ajeeb, alladhi sara feeki, li-ajl khalasina.\n\nFa-innahu yasmut min ajl, ma la yuntaq bih, wa yuqeemuna, ila et-tasbeeh.\n\n+ Min ajl \'azamat, el-\'ajeeb, sani\' el-khayrat, el-mutanawwi\'a.\n\nLi-anna kalimat Allah, el-hayy alladhi lil-Ab, nazala liyu\'ti en-namous, \'ala jabal Sina\'.\n\n+ Ghatta ra\'s el-jabal, bid-dukhan, waz-zalam wad-dabab, wal-\'asif.\n\nWa min jihat, sawt el-abwaq, kana yu\'allim, el-waqifeen bi-makhafa.\n\n+ Huwa aydan nazala \'alayki, ayyatuha el-jabal, en-natiq bi-wada\'a, wa mahabba bashariya.\n\nWa hakadha aydan, tajassada minki, bi-ghayr taghyeer, bi-jasad natiq.\n\n+ Musawin lana, kamil, wa lahu nafs, \'aqila.\n\nBaqiya ilahan, \'ala halihi, wa sara, insanan kamilan.\n\n+ Likay yahill, zallat Adam, wa yukhallis, man qad halak.\n\nWa yusayyiruhu madaniyyan, fis-samawat, wa yaruddahu ila ri\'asatihi, ka-\'azeem rahmatihi.\n\n+ Li-annahu bi-iradatihi, wa masarrat abeeh, war-Rooh el-Qudus, ata wa khallasana.' },
    { language: 'arabic', text: 'إذا تأملكِ أحدٌ، أيتها العذراء، القديسة، والدة الإله.\n\n+ والسر، العجيب، الذي صار فيكِ، لأجل خلاصنا.\n\nفأنه يصمت من أجل، ما لا يُنطَق به، ويُقيمنا، إلى التسبيح.\n\n+ من أجل عظمة، العجيب، صانع الخيرات، المتنوعة.\n\nلأن كلمة الله، الحي الذي للآب، نزل ليعطي الناموس، على جبل سيناء.\n\n+ غطَّى رأس الجبل، بالدخان، والظلام والضباب، والعاصف.\n\nومن جهة، صوت الأبواق، كان يُعلِم، الواقفين بمخافة.\n\n+ هو أيضاً نزل عليكِ، أيتها الجبل، الناطق بوداعة، ومحبة بشرية.\n\nوهكذا أيضاً، تجسد منكِ، بغير تغيير، بجسد ناطق.\n\n+ مساويٍ لنا، كامل، وله نفس، عاقلة.\n\nبقيَ إلهاً، على حاله، وصار، إنساناً كاملاً.\n\n+ لكي يحل، زلَّة آدم، ويُخلِّص، مَنْ قد هلك.\n\nويُصَيِّره مدنيا، في السموات، ويردُّه إلى رئاسته، كعظيم رحمته.\n\n+ لأنه بإرادته، ومسرة أبيه، والرُّوح القُدُس، أتى وخلصنا.' },
  ],
  5: [
    { language: 'coptic', text: 'Ⲡ̀ⲧⲁⲓⲟ ⲛ̀Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲟⲩⲁⲧⲥⲁϫⲓ ⲙ̀ⲙⲟϥ ⲡⲉ: ϫⲉ ⲁ̀ Ⲫ̀ⲛⲟⲩϯ ⲟⲩⲁϣⲥ: ⲁϥⲓ̀ ⲁϥϣⲱⲡⲓ ⲛ̀ϧⲏⲧⲥ.\n\n+ Ⲫⲏⲉⲧϣⲟⲡ ϧⲉⲛ ⲡⲓⲟⲩⲱⲓⲛⲓ: ⲛ̀ⲁⲧϣ̀ϧⲱⲛⲧ ⲉ̀ⲣⲟϥ: ⲁϥϣⲱⲡⲓ ϧⲉⲛ ⲛⲉⲥⲛⲉϫⲓ: ⲙ̀ⲯⲏⲧ ⲛ̀ⲁ̀ⲃⲟⲧ.\n\nⲠⲓⲁⲑⲛⲁⲩ ⲉ̀ⲣⲟϥ: Ⲡⲓⲁⲧϯⲑⲱϣ ⲉ̀ⲣⲟϥ: ⲁ̀ Ⲙⲁⲣⲓⲁ ⲙⲁⲥϥ: ⲉⲥⲟⲓ ⲙ̀ⲡⲁⲣⲑⲉⲛⲟⲥ.\n\n+ Ⲫⲁⲓ ⲅⲁⲣ ⲡⲉ Ⲡⲓⲱ̀ⲛⲓ: ⲫⲏⲉ̀ⲧⲁ Ⲇⲁⲛⲓⲏⲗ: ⲛⲁⲩ ⲉ̀ⲣⲟϥ ⲉ̀ⲁⲩϣⲁⲧϥ: ⲉ̀ⲃⲟⲗ ϩⲓ ⲟⲩⲧⲱⲟⲩ.\n\nⲈ̀ⲧⲉ ⲙ̀ⲡⲉϫⲓϫ ⲛ̀ⲣⲱⲙⲓ: ϭⲟϩ ⲉ̀ⲣⲟϥ ⲉ̀ⲡ̀ⲧⲏⲣϥ: ⲉ̀ⲧⲉ ⲫⲁⲓ ⲡⲉ Ⲡⲓⲗⲟⲅⲟⲥ: ⲡⲓⲉ̀ⲃⲟⲗ ϧⲉⲛ Ⲫ̀ⲓⲱⲧ.\n\n+ Ⲁϥⲓ̀ ⲁϥϭⲓⲥⲁⲣⲝ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.\n\nϪⲉ ⲛ̀ⲑⲟϥ ϧⲉⲛ ⲡⲉϥⲟⲩⲱϣ: ⲛⲉⲙ ⲡ̀ϯⲙⲁϯ ⲙ̀Ⲡⲉϥⲓⲱⲧ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲉⲑⲟⲩⲁⲃ: ⲁϥⲓ̀ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: 'Eptaio en-Tiparthenos: ouatsaji emmof pe: je a Efnouti ouashs: afi afshōpi enkhēts.\n\n+ Fēetshop khen piouōini: enateshkhōnt erof: afshōpi khen nesneji: empsēt enavot.\n\nPiathnau erof: Piattithōsh erof: a Maria masf: esoi emparthenos.\n\n+ Fai gar pe Pi-ōni: fē-eta Daniēl: nau erof eaushatf: evol hi outōou.\n\nEte empejij enrōmi: tshoh erof e-eptērf: ete fai pe Pilogos: pi-evol khen Efiōt.\n\n+ Afi aftshisarks: evol khen Tiparthenos: atshne esperma enrōmi: sha entefsōti emmon.\n\nJe enthof khen pefouōsh: nem eptimati em-Pefiōt: nem Pi-epneuma Ethouab: afi afsōti emmon.' },
    { language: 'english', text: 'The honor of the Virgin, is unutterable, for God desired her, He came and dwelt in her.\n\n+ He who abides in light, that is unapproachable, dwelt in her womb, for nine months.\n\nMary gave birth to, the Invisible, and Infinite One, and remained a virgin.\n\n+ For this is the Rock, which Daniel saw, which was cut, from a mountain.\n\nThe hands of men, never touched Him, for He is the Word, of the Father.\n\n+ He came and took flesh, from the Virgin, without the seed of man, in order to save us.\n\nFor of His own will, and the pleasure of His Father, and the Holy Spirit, He came and saved us.' },
    { language: 'englishArabic', text: 'Karamat el-\'adhra\', la yuntaq biha, li-anna Allah aradaha, wa ja\'a wa sakana feeha.\n\n+ Es-sakin fin-nour, ghayr el-muqtarab ilayh, halla fi batniha, tis\'at shuhour.\n\nGhayr el-manzour, ghayr el-mahdoud, waladathu Maryam, wa hiya \'adhra\'.\n\n+ Li-anna hadha huwa el-hajar, alladhi ra\'ahu Daniyal, qad quti\', min jabal.\n\nWa lam talmishu, yad insanin el-battata, huwa el-kalima, alladhi min el-Ab.\n\n+ Ata wa tajassada, min el-\'adhra\', bi-ghayr zar\' bashar, hatta khallasana.\n\nLi-annahu bi-iradatihi, wa masarrat abeeh, war-Rooh el-Qudus, ata wa khallasana.' },
    { language: 'arabic', text: 'كرامة العذراء، لا يُنطق بها، لأن الله أرادها، وجاء وسكن فيها.\n\n+ الساكن في النور، غير المقترب إليه، حل في بطنها، تسعة شهور.\n\nغير المنظور، غير المحدود، ولدته مريم، وهي عذراء.\n\n+ لأن هذا هو الحجر، الذي رآه دانيال، قد قُطع، من جبلٍ.\n\nولم تلمسه، يد إنسانٍ البتة، هو الكلمة، الذي من الآب.\n\n+ أتى وتجسد، من العذراء، بغير زرع بشر، حتى خلصنا.\n\nلأنه بإرادته، ومسرة أبيه، والرُّوح القُدُس، أتى وخلصنا.' },
  ],
  6: [
    { language: 'coptic', text: '+ Ⲁ̀ⲣⲉϣⲱⲡⲓ ⲛ̀ⲟⲩⲕ̀ⲗⲁⲇⲟⲥ: ⲛ̀ⲧⲉ ⲡⲓⲧⲟⲩⲃⲟ: ⲟⲩⲟϩ ⲛ̀ⲕⲩⲙⲓⲗⲗⲓⲟⲛ: ⲛ̀ⲧⲉ ⲡⲓⲛⲁϩϯ.\n\nⲚ̀ⲟⲣⲑⲟⲇⲟⲝⲟⲥ: ⲛ̀ⲧⲉ ⲛⲉⲛⲓⲟϯ ⲉⲑⲟⲩⲁⲃ: ⲱ̀ ϯⲥⲉⲙⲛⲉ ⲙ̀Ⲙⲁⲥⲛⲟⲩϯ: ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲙ̀Ⲡⲁⲣⲑⲉⲛⲟⲥ.\n\n+ Ϫⲉ ⲁ̀ⲣⲉⲙⲓⲥⲓ ⲛⲁⲛ: ⲙ̀Ⲫ̀ⲛⲟⲩϯ Ⲡⲓⲗⲟⲅⲟⲥ: Ⲡⲉⲛⲥⲱⲧⲏⲣ Ⲓⲏⲥⲟⲩⲥ: ⲁϥⲓ̀ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.\n\nϪⲉ ⲛ̀ⲑⲟϥ ϧⲉⲛ ⲡⲉϥⲟⲩⲱϣ: ⲛⲉⲙ ⲡ̀ϯⲙⲁϯ ⲙ̀Ⲡⲉϥⲓⲱⲧ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲉⲑⲟⲩⲁⲃ: ⲁϥⲓ̀ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: '+ Areshōpi enou-eklados: ente pitouvo: ouoh enkumillion: ente pinahti.\n\nEnorthodoksos: ente nenioti ethouab: ō tisemne em-Masnouti: ettaiēout em-Parthenos.\n\n+ Je aremisi nan: em-Efnouti Pilogos: Pensōtēr Iēsous: afi afsōti emmon.\n\nJe enthof khen pefouōsh: nem eptimati em-Pefiōt: nem Pi-epneuma Ethouab: afi afsōti emmon.' },
    { language: 'english', text: '+ You became a branch, of purity, and a vessel, of the faith.\n\nOf the orthodox, our holy fathers, O chaste Mother of God, the honored Virgin.\n\n+ For you gave birth for us, God the Word, our Savior Jesus, He came and saved us.\n\nFor of His own will, and the pleasure of His Father, and the Holy Spirit, He came and saved us.' },
    { language: 'englishArabic', text: '+ Sirti ghusnan, lit-tahara, wa ina\'an, lil-eeman.\n\nEl-orthodoksi, alladhi li-aba\'ina el-qiddiseen, ayyatuha el-\'afeefa walidat el-ilah, el-mukarrama el-\'adhra\'.\n\n+ Li-annaki waladti lana, Allah el-kalima, mukhallisana Yasou\', ata wa khallasana.\n\nLi-annahu bi-iradatihi, wa masarrat abeeh, war-Rooh el-Qudus, ata wa khallasana.' },
    { language: 'arabic', text: '+ صرتِ غصنا، للطهارة، وإناء، للإيمان.\n\nالأرثوذكسي، الذي لآبائنا القديسين، أيتها العفيفة والدة الإله، المكرمة العذراء.\n\n+ لأنك ولدتِ لنا، الله الكلمة، مُخلِّصنا يسوع، أتى وخلصنا.\n\nلأنه بإرادته، ومسرة أبيه، والرُّوح القُدُس، أتى وخلصنا.' },
  ],
  7: [
    { language: 'coptic', text: '+ Ⲛ̀ⲑⲟ Ⲑ̀ⲙⲁⲩ ⲙ̀ⲡⲓⲟⲩⲱⲓⲛⲓ: ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲙ̀Ⲙⲁⲥⲛⲟⲩϯ: ⲁ̀ⲣⲉϥⲁⲓ ϧⲁ Ⲡⲓⲗⲟⲅⲟⲥ: Ⲡⲓⲁ̀ⲭⲱⲣⲓⲧⲟⲥ.\n\nⲘⲉⲛⲉⲛⲥⲁ ⲑ̀ⲣⲉⲙⲁⲥϥ: ⲁ̀ⲣⲉⲟ̀ϩⲓ ⲉ̀ⲣⲉⲟⲓ ⲙ̀ⲡⲁⲣⲑⲉⲛⲟⲥ: ϧⲉⲛ ϩⲁⲛϩⲱⲥ ⲛⲉⲙ ϩⲁⲛⲥ̀ⲙⲟⲩ: ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ.\n\n+ Ϫⲉ ⲛ̀ⲑⲟϥ ϧⲉⲛ ⲡⲉϥⲟⲩⲱϣ: ⲛⲉⲙ ⲡ̀ϯⲙⲁϯ ⲙ̀Ⲡⲉϥⲓⲱⲧ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲉⲑⲟⲩⲁⲃ: ⲁϥⲓ̀ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.' },
    { language: 'englishCoptic', text: '+ Entho Ethmau empiouōini: ettaiēout em-Masnouti: arefai kha Pilogos: Pi-akhōritos.\n\nMenensa ethremasf: are-ohi ereoi emparthenos: khen hanhōs nem hanesmou: tentshisi emmo.\n\n+ Je enthof khen pefouōsh: nem eptimati em-Pefiōt: nem Pi-epneuma Ethouab: afi afsōti emmon.' },
    { language: 'english', text: '+ You are the Mother of light, the honored Mother of God, you have carried, the infinite Logos.\n\nAfter you gave birth to Him, you remained a virgin, with praises and blessings, we magnify you.\n\n+ For of His own will, and the pleasure of His Father, and the Holy Spirit, He came and saved us.' },
    { language: 'englishArabic', text: '+ Anti ya umm en-nour, el-mukarrama walidat el-ilah, hamalti el-kalima, ghayr el-muhwa.\n\nWa min ba\'d an waladtihi, baqeeti \'adhra\', nu\'azzimuki bi-tasabeeh, wa barakat.\n\n+ Li-annahu bi-iradatihi, wa masarrat abeeh, war-Rooh el-Qudus, ata wa khallasana.' },
    { language: 'arabic', text: '+ أنتِ يا أم النور، المكرمة والدة الإله، حملتِ الكلمة، غير المحوى.\n\nومن بعد أن ولدتِه، بقيتِ عذراء، نعظمكِ بتسابيح، وبركات.\n\n+ لأنه بإرادته، ومسرة أبيه، والرُّوح القُدُس، أتى وخلصنا.' },
  ],
};

// One day of the week: its Psali, any extra hymns, then its Theotokia as a list of parts
const midnightDay = (
  day: string,
  title: string,
  psaliTitle: string,
  theotokiaParts: number,
  beforeTheotokia: Hymn[] = [],
  theotokiaTexts: Record<number, LanguageVersion[]> = {}
): Hymn => ({
  id: `annual-midnight-${day}`,
  title,
  versions: [],
  children: [
    { id: `annual-midnight-${day}-psali`, title: psaliTitle, versions: [] },
    ...beforeTheotokia,
    {
      id: `annual-midnight-${day}-theotokia`,
      title: `${title} Theotokia`,
      versions: [],
      children: Array.from({ length: theotokiaParts }, (_, i) => ({
        id: `annual-midnight-${day}-theotokia-part-${i + 1}`,
        title: `${title} Theotokia (Part ${i + 1})`,
        versions: theotokiaTexts[i + 1] ?? [],
      })),
    },
  ],
});

if (annualMidnight) {
  annualMidnight.hymns = [
    {
      id: 'annual-midnight-general',
      title: 'General',
      versions: [],
      children: [
        {
          id: 'annual-midnight-arise-o-children',
          title: 'Ⲧⲉⲛⲑⲏⲛⲟⲩ ⲉ̀ⲡ̀ϣⲱⲓ (Arise, O Children of the Light)',
          versions: [
            {
              language: 'coptic',
              text: 'Ⲧⲉⲛⲑⲏⲛⲟⲩ ⲉ̀ⲡ̀ϣⲱⲓ ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ⲡⲓⲟⲩⲱⲓⲛⲓ: ⲛ̀ⲧⲉⲛϩⲱⲥ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ.\n\n+ Ϩⲟⲡⲱⲥ ⲛ̀ⲧⲉϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡ̀ⲥⲱϯ ⲛ̀ⲧⲉ ⲛⲉⲛⲯⲩⲭⲏ.\n\nϦⲉⲛ ⲡ̀ϫⲓⲛⲑ̀ⲣⲉⲛⲟ̀ϩⲓ ⲉ̀ⲣⲁⲧⲉⲛ ⲙ̀ⲡⲉⲕⲙ̀ⲑⲟ ⲥⲱⲙⲁⲧⲓⲕⲱⲥ.\n\n+ Ⲁ̀ⲗⲓⲟⲩⲓ̀ ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ ⲡⲉⲛⲛⲟⲩⲥ ⲙ̀ⲡⲓϩⲩⲛⲓⲙ ⲛ̀ⲧⲉ ϯⲉⲃϣⲓ.\n\nⲘⲟⲓ ⲛⲁⲛ Ⲡ̀ϭⲟⲓⲥ ⲛ̀ⲟⲩⲙⲉⲧⲣⲉϥⲉⲣⲛⲩⲙⲫⲓⲛ: ϩⲟⲡⲱⲥ ⲛ̀ⲧⲉⲛⲕⲁϯ ⲛ̀ⲧⲉⲛⲟ̀ϩⲓ ⲉ̀ⲣⲁⲧⲉⲛ ⲙ̀ⲡⲉⲕⲙ̀ⲑⲟ ⲙ̀ⲫ̀ⲛⲁⲩ ⲛ̀ⲧⲉ ϯⲡ̀ⲣⲟⲥⲉⲩⲭⲏ.\n\n+ Ⲟⲩⲟϩ ⲛ̀ⲧⲉⲛⲟⲩⲱⲣⲡ ⲛⲁⲕ ⲉ̀ⲡ̀ϣⲱⲓ ⲛ̀ϯⲇⲟⲝⲟⲗⲟⲅⲓⲁ ⲉ̀ⲧⲉⲣⲡ̀ⲣⲉⲡⲓ: ⲟⲩⲟϩ ⲛ̀ⲧⲉⲛϣⲁϣⲛⲓ ⲉ̀ⲡ̀ⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ ⲉⲧⲟϣ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\nϨⲏⲡⲡⲉ ⲇⲉ ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲉ̀ⲃⲓⲁⲓⲕ ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\n+ Ⲛⲏⲉⲧⲟ̀ϩⲓ ⲉ̀ⲣⲁⲧⲟⲩ ϧⲉⲛ ⲡ̀ⲏⲓ ⲙ̀Ⲡ̀ϭⲟⲓⲥ: ϧⲉⲛ ⲛⲓⲁⲩⲗⲏⲟⲩ ⲛ̀ⲧⲉ ⲡ̀ⲏⲓ ⲙ̀Ⲡⲉⲛⲛⲟⲩϯ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\nⲚ̀ϩ̀ⲣⲏⲓ ϧⲉⲛ ⲛⲓⲉ̀ϫⲱⲣϩ ϥⲁⲓ ⲛ̀ⲛⲉⲧⲉⲛϫⲓϫ ⲉ̀ⲡ̀ϣⲱⲓ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\n+ Ⲡ̀ϭⲟⲓⲥ ⲉϥⲉ̀ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲕ ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ⲥⲓⲱⲛ: ⲫⲏⲉ̀ⲧⲁϥⲑⲁⲙⲓⲟ ⲛ̀ⲧ̀ⲫⲉ ⲛⲉⲙ ⲡ̀ⲕⲁϩⲓ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\nⲘⲁⲣⲉ ⲡⲁϯϩⲟ ϧⲱⲛⲧ ⲙ̀ⲡⲉⲕⲙ̀ⲑⲟ Ⲡ̀ϭⲟⲓⲥ: ⲙⲁⲕⲁϯ ⲛⲏⲓ ⲕⲁⲧⲁ ⲡⲉⲕⲥⲁϫⲓ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\n+ Ⲉϥⲉ̀ⲓ̀ ⲉ̀ϧⲟⲩⲛ ⲙ̀ⲡⲉⲕⲙ̀ⲑⲟ ⲛ̀ϫⲉ ⲡⲁⲁⲝⲓⲱⲙⲁ: ⲕⲁⲧⲁ ⲡⲉⲕⲥⲁϫⲓ ⲙⲁⲧⲁⲛϧⲟⲓ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\nⲈ̀ⲣⲉ ⲛⲁⲥ̀ⲫⲟⲧⲟⲩ ⲃⲉⲃⲓ ⲛ̀ⲟⲩⲥ̀ⲙⲟⲩ: ⲉ̀ϣⲱⲡ ⲁⲕϣⲁⲛⲧ̀ⲥⲁⲃⲟⲓ ⲉ̀ⲛⲉⲕⲙⲉⲑⲙⲏⲓ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\n+ Ⲡⲁⲗⲁⲥ ⲉϥⲉ̀ⲉⲣⲟⲩⲱ̀ ϧⲉⲛ ⲛⲉⲕⲥⲁϫⲓ ϫⲉ ⲛⲉⲕⲉⲛⲧⲟⲗⲏ ⲧⲏⲣⲟⲩ ϩⲁⲛⲙⲉⲑⲙⲏⲓ ⲛⲉ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\nⲘⲁⲣⲉⲥϣⲱⲡⲓ ⲛ̀ϫⲉ ⲧⲉⲕϫⲓϫ ⲉ̀ⲫ̀ⲛⲁϩⲙⲉⲧ ϫⲉ ⲛⲉⲕⲉⲛⲧⲟⲗⲏ ⲁⲓⲉⲣⲉ̀ⲡⲓⲑⲩⲙⲓⲛ ⲉ̀ⲣⲱⲟⲩ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\n+ Ⲁⲓϭⲓϣϣⲱⲟⲩ ⲙ̀ⲡⲉⲕⲟⲩϫⲁⲓ Ⲡ̀ϭⲟⲓⲥ: ⲟⲩⲟϩ Ⲡⲉⲕⲛⲟⲙⲟⲥ ⲡⲉ ⲧⲁⲙⲉⲗⲉⲧⲏ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\nⲈⲥⲉ̀ⲱⲛϧ ⲛ̀ϫⲉ ⲧⲁⲯⲩⲭⲏ ⲟⲩⲟϩ ⲉⲥⲉ̀ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲕ: ⲟⲩⲟϩ ⲛⲉⲕϩⲁⲡ ⲉⲩⲉ̀ⲉⲣⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲓ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\n+ Ⲁⲓⲥⲱⲣⲉⲙ ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲟⲩⲉ̀ⲥⲱⲟⲩ ⲉ̀ⲁϥⲧⲁⲕⲟ: ⲕⲱϯ ⲛ̀ⲥⲁ ⲡⲉⲕⲃⲱⲕ ϫⲉ ⲛⲉⲕⲉⲛⲧⲟⲗⲏ ⲙ̀ⲡⲓⲉⲣⲡⲟⲩⲱⲃϣ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\nⲆⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩ̀ⲓⲱ ⲕⲉ Ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\n+ Ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\nⲠⲓⲱ̀ⲟⲩ ⲙ̀Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ ⲛ̀ⲧⲉ ⲛⲓⲉ̀ⲛⲉϩ ⲧⲏⲣⲟⲩ ⲁ̀ⲙⲏⲛ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\n+ Ⲡⲓⲱ̀ⲟⲩ ⲛⲁⲕ Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲡⲓⲱ̀ⲟⲩ ⲛ̀Ⲧⲉⲕⲙⲁⲩ ⲙ̀Ⲡⲁⲣⲑⲉⲛⲟⲥ ⲛⲉⲙ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲁⲕ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\nⲆⲟⲝⲁ ⲥⲓ ⲟ̀ⲙⲟⲛⲟⲅⲉⲛⲏⲥ: ⲁ̀ⲅⲓⲁ Ⲧ̀ⲣⲓⲁⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\n+ Ⲙⲁⲣⲉϥⲧⲱⲛϥ ⲛ̀ϫⲉ Ⲫ̀ⲛⲟⲩϯ ⲙⲁⲣⲟⲩϫⲱⲣ ⲉ̀ⲃⲟⲗ ⲛ̀ϫⲉ ⲛⲉϥϫⲁϫⲓ ⲧⲏⲣⲟⲩ ⲙⲁⲣⲟⲩⲫⲱⲧ ⲉ̀ⲃⲟⲗ ϧⲁⲧ̀ϩⲏ ⲙ̀ⲡⲉϥϩⲟ ⲛ̀ϫⲉ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ ⲉⲑⲙⲟⲥϯ ⲙ̀ⲡⲉϥⲣⲁⲛ ⲉⲑⲟⲩⲁⲃ. Ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ.\n\nⲠⲉⲕⲗⲁⲟⲥ ⲇⲉ ⲙⲁⲣⲉϥϣⲱⲡⲓ ϧⲉⲛ ⲡⲓⲥ̀ⲙⲟⲩ: ⲉ̀ϩⲁⲛⲁⲛϣⲟ ⲛ̀ϣⲟ ⲛⲉⲙ ϩⲁⲛⲑ̀ⲃⲁ ⲛ̀ⲑ̀ⲃⲁ: ⲉⲩⲓ̀ⲣⲓ ⲙ̀ⲡⲉⲕⲟⲩⲱϣ.\n\n+ Ⲡ̀ϭⲟⲓⲥ ⲉⲕⲉ̀ⲁ̀ⲟⲩⲱⲛ ⲛ̀ⲛⲁⲥ̀ⲫⲟⲧⲟⲩ: ⲟⲩⲟϩ ⲉ̀ⲣⲉ ⲣⲱⲓ ϫⲱ ⲙ̀ⲡⲉⲕⲥ̀ⲙⲟⲩ.',
            },
            {
              language: 'englishCoptic',
              text: 'Tenthēnou e-epshōi nishēri ente piouōini: entenhōs e-Eptshois ente nijom.\n\n+ Hopōs enteferehmot nan emepsōti ente nenpsukhē.\n\nKhen epjinethrenohi eraten empekemtho sōmatikōs.\n\n+ Aliou-i evol hiten pennous empihunim ente tiebshi.\n\nMoi nan Eptshois enoumetrefernumfin: hopōs entenkati entenohi eraten empekemtho emefnau ente ti-eproseukhē.\n\n+ Ouoh entenouōrp nak e-epshōi entidoksologia etereprepi: ouoh entenshashni e-epkhō evol ente nennovi etosh. Doksa si Filanethrōpe.\n\nHēppe de esmou e-Eptshois ni-eviaik ente Eptshois. Doksa si Filanethrōpe.\n\n+ Nēetohi eratou khen epēi em-Eptshois: khen niaulēou ente epēi em-Pennouti. Doksa si Filanethrōpe.\n\nEnehrēi khen ni-ejōrh fai ennetenjij e-epshōi nēethouab esmou e-Eptshois. Doksa si Filanethrōpe.\n\n+ Eptshois efe-esmou erok evol khen Siōn: fē-etafthamio enetfe nem epkahi. Doksa si Filanethrōpe.\n\nMare patiho khōnt empekemtho Eptshois: makati nēi kata peksaji. Doksa si Filanethrōpe.\n\n+ Efe-i ekhoun empekemtho enje paaksiōma: kata peksaji matankhoi. Doksa si Filanethrōpe.\n\nEre na-esfotou vevi enou-esmou: eshōp akshanetsavoi enekmethmēi. Doksa si Filanethrōpe.\n\n+ Palas efeerou-ō khen neksaji je nekentolē tērou hanmethmēi ne. Doksa si Filanethrōpe.\n\nMaresshōpi enje tekjij e-efnahmet je nekentolē aierepithumin erōou. Doksa si Filanethrōpe.\n\n+ Aitshishshōou empekoujai Eptshois: ouoh Peknomos pe tameletē. Doksa si Filanethrōpe.\n\nEseōnkh enje tapsukhē ouoh ese-esmou erok: ouoh nekhap eu-eervo-ēthin eroi. Doksa si Filanethrōpe.\n\n+ Aisōrem emefrēti enou-esōou eaftako: kōti ensa pekvōk je nekentolē empierpouōbsh. Doksa si Filanethrōpe.\n\nDoksa Patri ke Uiō ke Agiō Epneumati. Doksa si Filanethrōpe.\n\n+ Ke nun ke a-i ke is tous e-ōnas tōn e-ōnōn amēn. Doksa si Filanethrōpe.\n\nPi-ōou em-Efiōt nem Epshēri nem Pi-epneuma ethouab: isjen tinou nem sha eneh ente ni-eneh tērou amēn. Doksa si Filanethrōpe.\n\n+ Pi-ōou nak Pimairōmi enagathos: pi-ōou en-Tekmau em-Parthenos nem nēethouab tērou entak. Doksa si Filanethrōpe.\n\nDoksa si omonogenēs: agia Etrias ele-ēson ēmas. Doksa si Filanethrōpe.\n\n+ Mareftōnf enje Efnouti maroujōr evol enje nefjaji tērou maroufōt evol kha-ethē empefho enje ouon niven ethmosti empefran ethouab. Doksa si Filanethrōpe.\n\nPeklaos de marefshōpi khen pi-esmou: ehanansho ensho nem hanethva enethva: eu-iri empekouōsh.\n\n+ Eptshois eke-aouōn enna-esfotou: ouoh ere rōi jō empekesmou.',
            },
            {
              language: 'english',
              text: 'Arise O children of the light, let us praise the Lord of hosts.\n\n+ That He may grant us the salvation of our souls.\n\nWhenever we stand before You in the flesh.\n\n+ Cast away from our minds the slumber of sleep.\n\nGrant us sobriety O Lord, that we may know how to stand before You at times of prayer.\n\n+ And ascribe unto You the befitting glorification, and win the forgiveness of our many sins. Glory be to You O Lover of Mankind.\n\nBehold bless the Lord all you servants of the Lord. Glory be to You O Lover of Mankind.\n\n+ You who stand in the house of the Lord, in the courts of the house of our God. Glory be to You O Lover of Mankind.\n\nBy night lift up your hands O you saints and bless the Lord. Glory be to You O Lover of Mankind.\n\n+ The Lord bless you from Zion, who created heaven and earth. Glory be to You O Lover of Mankind.\n\nLet my cry come before You O Lord, give me understanding according to Your word. Glory be to You O Lover of Mankind.\n\n+ Let my supplication come before You, deliver me according to Your word. Glory be to You O Lover of Mankind.\n\nMy lips shall overflow with praise, when You have taught me Your statutes. Glory be to You O Lover of Mankind.\n\n+ My tongue shall speak of Your words for all Your commandments are righteous. Glory be to You O Lover of Mankind.\n\nLet Your hand help me for I have chosen Your precepts. Glory be to You O Lover of Mankind.\n\n+ I have longed for Your salvation O Lord, and Your Law is my delight. Glory be to You O Lover of Mankind.\n\nLet my soul live and it shall praise You, and let Your judgments help me. Glory be to You O Lover of Mankind.\n\n+ I have gone astray like a lost sheep, seek Your servant for I do not forget Your commandments. Glory be to You O Lover of Mankind.\n\nGlory be to the Father and the Son and the Holy Spirit. Glory be to You O Lover of Mankind.\n\n+ Now and forever and unto the age of all ages Amen. Glory be to You O Lover of Mankind.\n\nGlory be to the Father and the Son and the Holy Spirit, now and forever and unto all the ages Amen. Glory be to You O Lover of Mankind.\n\n+ Glory be to You O good One the Lover of Mankind, glory be to Your Mother the Virgin and all Your saints. Glory be to You O Lover of Mankind.\n\nGlory be to You O only-begotten One, O holy Trinity have mercy upon us. Glory be to You O Lover of Mankind.\n\n+ Let God arise and let all His enemies be scattered and let all that hate His holy name flee from before His face. Glory be to You O Lover of Mankind.\n\nAs for Your people let them be blessed, a thousand thousand fold and ten thousand ten thousand fold, doing Your will.\n\n+ O Lord open my lips, and my mouth shall declare Your praise.',
            },
            {
              language: 'englishArabic',
              text: 'Qumu ya bani en-nour, li-nusabbih Rabb el-quwwat.\n\n+ Likay yun\'im lana bi-khalas nufusina.\n\n\'Indama naqif amamak jasadiyyan.\n\n+ Inza\' \'an \'uqulina nawm el-ghafla.\n\nA\'tina ya Rabb yaqaza, likay nafham an naqif amamak waqt es-salah.\n\n+ Wa nursil lak ila fawq et-tamjeed el-la\'iq, wa nafuz bi-ghufran khatayana el-katheera. El-majd lak ya muhibb el-bashar.\n\nHa barikoo er-Rabb ya \'abeed er-Rabb. El-majd lak ya muhibb el-bashar.\n\n+ El-qa\'imeen fi bayt er-Rabb, fi diyar bayt ilahina. El-majd lak ya muhibb el-bashar.\n\nBil-layali irfa\'u aydiyakum ila fawq ayyuha el-qiddiseen barikoo er-Rabb. El-majd lak ya muhibb el-bashar.\n\n+ Yubarikuka er-Rabb min Sahyoun, alladhi khalaqa es-sama\' wal-ard. El-majd lak ya muhibb el-bashar.\n\nFaltadnu waseelati quddamak ya Rabb, ka-qawlika fahhimni. El-majd lak ya muhibb el-bashar.\n\n+ Liyadkhul ibtihali amamak, ka-kalimatika ahyini. El-majd lak ya muhibb el-bashar.\n\nTafeed shafatay es-subh, idha ma \'allamtani huquqak. El-majd lak ya muhibb el-bashar.\n\n+ Lisani yujeeb bi-aqwalik li-anna jamee\' wasayak hiya haqq. El-majd lak ya muhibb el-bashar.\n\nLitakun yaduka li-tukhallisani li-anni ishtahaytu wasayak. El-majd lak ya muhibb el-bashar.\n\n+ Ishtaqtu ila khalasika ya Rabb, wa namousuka huwa tilawati. El-majd lak ya muhibb el-bashar.\n\nTahya nafsi wa tusabbihuk, wa ahkamuka tu\'eenuni. El-majd lak ya muhibb el-bashar.\n\n+ Dalaltu mithl el-kharouf ed-dall, fa-utlub \'abdak li-anni li-wasayak lam ansa. El-majd lak ya muhibb el-bashar.\n\nEl-majd lil-Ab wal-Ibn war-Rooh el-Qudus. El-majd lak ya muhibb el-bashar.\n\n+ El-an wa kulla awan wa ila dahr ed-duhour, ameen. El-majd lak ya muhibb el-bashar.\n\nEl-majd lil-Ab wal-Ibn war-Rooh el-Qudus mundhu el-an wa ila abad el-abideen kulliha, ameen. El-majd lak ya muhibb el-bashar.\n\n+ El-majd lak ya muhibb el-bashar es-saleh, el-majd li-ummika el-\'adhra\' wa jamee\' qiddiseek. El-majd lak ya muhibb el-bashar.\n\nEl-majd lak ayyuha el-waheed, ayyuha eth-thalouth el-quddous irhamna. El-majd lak ya muhibb el-bashar.\n\n+ Liyaqum Allah wa litatabaddad jamee\' a\'da\'ih, wa liyahrub min quddam wajhihi kullu mubghidi ismihi el-quddous. El-majd lak ya muhibb el-bashar.\n\nWa amma sha\'buka falyakun bil-baraka, ulouf ulouf wa rabawat rabawat, yasna\'oon iradatak.\n\n+ Ya Rabb iftah shafatayya wa liyantiq fami bi-tasbihatik.',
            },
            {
              language: 'arabic',
              text: 'قوموا يا بني النور، لنسبح رب القوات.\n\n+ لكي ينعم لنا بخلاص نفوسنا.\n\nعندما نقف أمامك جسدياً.\n\n+ إنزع عن عقولنا نوم الغفلة.\n\nأعطنا يا رب يقظة، لكي نفهم أن نقف أمامك وقت الصلاة.\n\n+ ونرسل لك إلى فوق التمجيد اللائق، ونفوز بغفران خطايانا الكثيرة. المجد لك يا محب البشر.\n\nها باركوا الرب يا عبيد الرب. المجد لك يا محب البشر.\n\n+ القائمين في بيت الرب، في ديار بيت إلهنا. المجد لك يا محب البشر.\n\nبالليالي إرفعوا أيديكم إلى فوق أيها القديسون باركوا الرب. المجد لك يا محب البشر.\n\n+ يباركك الرب من صهيون، الذي خلق السماء والأرض. المجد لك يا محب البشر.\n\nفلتدن وسيلتي قدامك يا رب، كقولك فهمني. المجد لك يا محب البشر.\n\n+ ليدخل إبتهالي أمامك، ككلمتك أحيني. المجد لك يا محب البشر.\n\nتفيض شفتاي السُبح، إذا ما علمتني حقوقك. المجد لك يا محب البشر.\n\n+ لساني يجيب بأقوالك لأن جميع وصاياك هي حق. المجد لك يا محب البشر.\n\nلتكن يدك لتخلصني لأني إشتهيت وصاياك. المجد لك يا محب البشر.\n\n+ إشتقت إلى خلاصك يا رب، وناموسك هو تلاوتي. المجد لك يا محب البشر.\n\nتحيا نفسي وتسبحك، وأحكامك تعينني. المجد لك يا محب البشر.\n\n+ ضللت مثل الخروف الضال، فأُطلب عبدك لأني لوصاياك لم أنس. المجد لك يا محب البشر.\n\nالمجد للآب والإبن والروح القدس. المجد لك يا محب البشر.\n\n+ الآن وكل أوان وإلى دهر الدهور آمين. المجد لك يا محب البشر.\n\nالمجد للآب والإبن والروح القدس منذ الآن وإلى أبد الأبدين كلها آمين. المجد لك يا محب البشر.\n\n+ المجد لك يا محب البشر الصالح، المجد لأُمك العذراء وجميع قديسيك. المجد لك يا محب البشر.\n\nالمجد لك أيها الوحيد، أيها الثالوث القدوس إرحمنا. المجد لك يا محب البشر.\n\n+ ليقم الله ولتتبدَّد جميع أعدائه وليهرب من قدام وجهه كل مُبغضي إسمه القدوس. المجد لك يا محب البشر.\n\nوأما شعبك فليكن بالبركة، ألوف ألوف وربوات ربوات، يصنعون إرادتك.\n\n+ يا رب إفتح شفتيَ ولينطق فمي بتسبحتك.',
            },
          ],
        },
        {
          id: 'annual-midnight-first-canticle',
          title: 'Ⲧⲟⲧⲉ ⲁϥϩⲱⲥ (The First Canticle)',
          versions: [
            {
              language: 'coptic',
              text: 'Ⲁ̀ⲙⲏⲛ Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ: Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ: Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ.\n\nⲦⲟⲧⲉ ⲁϥϩⲱⲥ ⲛ̀ϫⲉ Ⲙⲱⲩ̀ⲥⲏⲥ ⲛⲉⲙ ⲛⲉⲛϣⲏⲣⲓ ⲙ̀Ⲡⲓⲥⲣⲁⲏⲗ ⲉ̀ⲧⲁⲓϩⲱⲇⲏ ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ ⲟⲩⲟϩ ⲁϥϫⲟⲥ ⲉⲑⲣⲟⲩϫⲟⲥ: ϫⲉ ⲙⲁⲣⲉⲛϩⲱⲥ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ϫⲉ ϧⲉⲛ ⲟⲩⲱ̀ⲟⲩ ⲅⲁⲣ ⲁϥϭⲓⲱ̀ⲟⲩ.\n\n+ Ⲟⲩϩ̀ⲑⲟ ⲛⲉⲙ ⲟⲩϭⲁⲥⲓϩ̀ⲑⲟ ⲁϥⲃⲉⲣⲃⲱⲣⲟⲩ ⲉ̀ⲫ̀ⲓⲟⲙ. Ⲟⲩⲃⲟⲏ̀ⲑⲟⲥ ⲛⲉⲙ ⲟⲩⲣⲉϥϩⲱⲃⲥ ⲉ̀ⲃⲟⲗ ϩⲓϫⲱⲓ: ⲁϥϣⲱⲡⲓ ⲛⲏⲓ ⲛ̀ⲟⲩⲥⲱⲧⲏⲣⲓⲁ.\n\nⲪⲁⲓ ⲡⲉ Ⲡⲁⲛⲟⲩϯ ϯⲛⲁϯⲱ̀ⲟⲩ ⲛⲁϥ: Ⲫ̀ⲛⲟⲩϯ ⲙ̀ⲡⲁⲓⲱⲧ ϯⲛⲁϭⲁⲥϥ.\n\n+ Ⲡ̀ϭⲟⲓⲥ ⲡⲉⲧϧⲟⲙϧⲉⲙ ⲛ̀ⲛⲓⲃⲱⲧⲥ: Ⲡ̀ϭⲟⲓⲥ ⲡⲉ ⲡⲉϥⲣⲁⲛ. Ⲛⲓⲃⲉⲣⲉϭⲱⲟⲩⲧⲥ ⲛ̀ⲧⲉ Ⲫⲁⲣⲁⲱ̀ ⲛⲉⲙ ⲧⲉϥϫⲟⲙ ⲧⲏⲣⲥ ⲁϥⲃⲉⲣⲃⲱⲣⲟⲩ ⲉ̀ⲫ̀ⲓⲟⲙ.\n\nϨⲁⲛⲥⲱⲧⲡ ⲛ̀ⲁ̀ⲛⲁⲃⲁⲧⲏⲥ ⲛ̀ⲧ̀ⲣⲓⲥⲧⲁⲧⲏⲥ ⲁϥϫⲟⲗⲕⲟⲩ ϧⲉⲛ ⲫ̀ⲓⲟⲙ ⲛ̀ϣⲁⲣⲓ.\n\n+ Ⲁϥϩⲱⲃⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲟⲩ ⲛ̀ϫⲉ ⲡⲓⲙⲱⲟⲩ: ⲁⲩⲱⲙⲥ ⲉ̀ϧ̀ⲣⲏⲓ ⲉ̀ⲡⲉⲧϣⲏⲕ ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲟⲩⲱ̀ⲛⲓ.\n\nⲦⲉⲕⲟⲩⲓ̀ⲛⲁⲙ Ⲡ̀ϭⲟⲓⲥ ⲁⲥϭⲓⲱ̀ⲟⲩ ϧⲉⲛ ⲟⲩϫⲟⲙ. Ⲧⲉⲕϫⲓϫ ⲛ̀ⲟⲩⲓ̀ⲛⲁⲙ Ⲡⲁⲛⲟⲩϯ ⲁⲥⲧⲁⲕⲉ ⲛⲉⲕϫⲁϫⲓ.\n\n+ Ϧⲉⲛ ⲡ̀ⲁ̀ϣⲁⲓ ⲛ̀ⲧⲉ ⲡⲉⲕⲱ̀ⲟⲩ: ⲁⲕϧⲟⲙϧⲉⲙ ⲛ̀ⲛⲏⲉⲧϯⲟⲩⲃⲏⲛ: ⲁⲕⲟⲩⲱⲣⲡ ⲙ̀ⲡⲉⲕϫⲱⲛⲧ: ⲁϥⲟⲩⲟ̀ⲙⲟⲩ ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ϩⲁⲛⲣⲱⲟⲩⲓ̀.\n\nⲈ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲛ̀ⲧⲉ ⲡⲉⲕⲙ̀ⲃⲟⲛ ⲁϥⲟ̀ϩⲓ ⲉ̀ⲣⲁⲧϥ ⲛ̀ϫⲉ ⲡⲓⲙⲱⲟⲩ: ⲁⲩϭⲓⲥⲓ ⲛ̀ϫⲉ ⲛⲓⲙⲱⲟⲩ ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲟⲩⲥⲟⲃⲧ: ⲁⲩϭⲱⲥ ⲛ̀ϫⲉ ⲛⲓϫⲟⲗ ϧⲉⲛ ⲑ̀ⲙⲏϯ ⲙ̀ⲫ̀ⲓⲟⲙ.\n\n+ Ⲁϥϫⲟⲥ ⲅⲁⲣ ⲛ̀ϫⲉ ⲡⲓϫⲁϫⲓ: ϫⲉ ϯⲛⲁϭⲟϫⲓ ⲛ̀ⲧⲁⲧⲁϩⲟ: ⲛ̀ⲧⲁⲫⲱϣ ⲛ̀ϩⲁⲛϣⲱⲗ: ⲛ̀ⲧⲁⲧ̀ⲥⲓⲟ ⲛ̀ⲧⲁⲯⲩⲭⲏ: ⲛ̀ⲧⲁϧⲱⲧⲉⲃ ϧⲉⲛ ⲧⲁⲥⲏϥⲓ ⲛ̀ⲧⲉ ⲧⲁϫⲓϫ ⲉⲣϭⲟⲓⲥ.\n\nⲀⲕⲟⲩⲱⲣⲡ ⲙ̀Ⲡⲉⲕⲡ̀ⲛⲉⲩⲙⲁ: ⲁϥϩⲟⲃⲥⲟⲩ ⲛ̀ϫⲉ ⲫ̀ⲓⲟⲙ: ⲁⲩⲱⲙⲥ ⲉ̀ⲡⲉⲥⲏⲧ ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲟⲩⲧⲁⲧϩ ϧⲉⲛ ϩⲁⲛⲙⲱⲟⲩ ⲉⲩⲟϣ.\n\n+ Ⲛⲓⲙ ⲉⲧⲟ̀ⲛⲓ ⲙ̀ⲙⲟⲕ ϧⲉⲛ ⲛⲓⲛⲟⲩϯ Ⲡ̀ϭⲟⲓⲥ. Ⲛⲓⲙ ⲉⲧⲟ̀ⲛⲓ ⲙ̀ⲙⲟⲕ: ⲉ̀ⲁⲩϯⲱ̀ⲟⲩ ⲛⲁⲕ ϧⲉⲛ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲛ̀ⲧⲁⲕ: ⲉⲩⲉⲣϣ̀ⲫⲏⲣⲓ ⲙ̀ⲙⲟⲕ ϧⲉⲛ ⲟⲩⲱ̀ⲟⲩ: ⲉⲕⲓ̀ⲣⲓ ⲛ̀ϩⲁⲛϣ̀ⲫⲏⲣⲓ.\n\nⲀⲕⲥⲟⲩⲧⲉⲛ ⲧⲉⲕⲟⲩⲓ̀ⲛⲁⲙ ⲉ̀ⲃⲟⲗ ⲁϥⲟⲙⲕⲟⲩ ⲛ̀ϫⲉ ⲡ̀ⲕⲁϩⲓ. Ⲁⲕϭⲓⲙⲱⲓⲧ ϧⲁϫⲱϥ ⲙ̀ⲡⲉⲕⲗⲁⲟⲥ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ: ⲫⲁⲓ ⲉ̀ⲧⲁⲕⲥⲟⲧⲡϥ: ⲁⲕϯϫⲟⲙ ⲛⲁϥ ϧⲉⲛ ⲧⲉⲕⲛⲟⲙϯ: ⲉⲩⲙⲁ ⲛ̀ⲉⲙⲧⲟⲛ ⲉϥⲟⲩⲁⲃ ⲛⲁⲕ.\n\n+ Ⲁⲩⲥⲱⲧⲉⲙ ⲛ̀ϫⲉ ϩⲁⲛⲉⲑⲛⲟⲥ ⲟⲩⲟϩ ⲁⲩϫⲱⲛⲧ: ϩⲁⲛⲛⲁⲕϩⲓ ⲁⲩϭⲓ ⲛ̀ⲛⲏⲉⲧϣⲟⲡ ϧⲉⲛ Ⲛⲓⲫⲩⲗⲓⲥⲧⲓⲙ.\n\nⲦⲟⲧⲉ ⲁⲩⲓⲏⲥ ⲙ̀ⲙⲱⲟⲩ ⲛ̀ϫⲉ ⲛⲓϩⲏⲅⲉⲙⲱⲛ ⲛ̀ⲧⲉ Ⲉ̀ⲇⲱⲙ: ⲛⲓⲁⲣⲭⲱⲛ ⲛ̀ⲧⲉ Ⲛⲓⲙⲱⲁ̀ⲃⲓⲧⲏⲥ ⲟⲩⲥ̀ⲑⲉⲣⲧⲉⲣ ⲡⲉ ⲉ̀ⲧⲁϥϭⲓⲧⲟⲩ.\n\n+ Ⲁⲩⲃⲱⲗ ⲉ̀ⲃⲟⲗ ⲛ̀ϫⲉ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ ⲉⲧϣⲟⲡ ϧⲉⲛ Ⲭⲁⲛⲁⲁⲛ: ⲁϥⲓ̀ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲟⲩ ⲛ̀ϫⲉ ⲟⲩⲥ̀ⲑⲉⲣⲧⲉⲣ ⲛⲉⲙ ⲟⲩϩⲟϯ.\n\nϦⲉⲛ ⲡ̀ⲁ̀ϣⲁⲓ ⲛ̀ⲧⲉ ⲡⲉⲕϫ̀ⲫⲟⲓ ⲙⲁⲣⲟⲩⲉⲣⲱ̀ⲛⲓ: ϣⲁⲧⲉϥⲥⲓⲛⲓ ⲛ̀ϫⲉ ⲡⲉⲕⲗⲁⲟⲥ Ⲡ̀ϭⲟⲓⲥ: ϣⲁⲧⲉϥⲥⲓⲛⲓ ⲛ̀ϫⲉ ⲡⲉⲕⲗⲁⲟⲥ: ⲫⲁⲓ ⲉ̀ⲧⲁⲕϫ̀ⲫⲟϥ.\n\n+ Ⲁ̀ⲛⲓⲧⲟⲩ ⲉ̀ϧⲟⲩⲛ ⲧⲟϫⲟⲩ ϩⲓϫⲉⲛ ⲟⲩⲧⲱⲟⲩ ⲛ̀ⲧⲉ ⲧⲉⲕⲕ̀ⲗⲏⲣⲟⲛⲟⲙⲓⲁ: ⲛⲉⲙ ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲡⲉⲕⲙⲁⲛ̀ϣⲱⲡⲓ ⲉⲧⲥⲉⲃⲧⲱⲧ: ⲫⲁⲓ ⲉ̀ⲧⲁⲕⲉⲣϩⲱⲃ ⲉ̀ⲣⲟϥ Ⲡ̀ϭⲟⲓⲥ.\n\nⲠⲉⲕⲙⲁ ⲉⲑⲟⲩⲁⲃ Ⲡ̀ϭⲟⲓⲥ ⲫⲏⲉ̀ⲧⲁⲩⲥⲉⲃⲧⲱⲧϥ ⲛ̀ϫⲉ ⲛⲉⲕϫⲓϫ: Ⲡ̀ϭⲟⲓⲥ ⲉⲕⲟⲓ ⲛ̀ⲟⲩⲣⲟ ϣⲁ ⲉ̀ⲛⲉϩ ⲛⲉⲙ ⲓⲥϫⲉⲛ ⲡ̀ⲉ̀ⲛⲉϩ ⲟⲩⲟϩ ⲉ̀ⲧⲓ.\n\n+ Ϫⲉ ⲁⲩⲓ̀ ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲫ̀ⲓⲟⲙ ⲛ̀ϫⲉ ⲛⲓϩ̀ⲑⲱⲣ ⲛ̀ⲧⲉ Ⲫⲁⲣⲁⲱ̀: ⲛⲉⲙ ⲛⲉϥⲃⲉⲣⲉϭⲱⲟⲩⲧⲥ ⲛⲉⲙ ⲛⲉϥϭⲁⲥⲓϩ̀ⲑⲟ.\n\nⲀ̀ Ⲡ̀ϭⲟⲓⲥ ⲉⲛ ⲡⲓⲙⲱⲟⲩ ⲛ̀ⲧⲉ ⲫ̀ⲓⲟⲙ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲟⲩ: ⲛⲉⲛϣⲏⲣⲓ ⲇⲉ ⲙ̀Ⲡⲓⲥⲣⲁⲏⲗ ⲛⲁⲩⲙⲟϣⲓ ϧⲉⲛ ⲡⲉⲧϣⲟⲩⲱ̀ⲟⲩ ϧⲉⲛ ⲑ̀ⲙⲏϯ ⲙ̀ⲫ̀ⲓⲟⲙ.\n\n+ Ⲁⲥϭⲓ ⲇⲉ ⲛⲁⲥ ⲛ̀ϫⲉ Ⲙⲁⲣⲓⲁⲙ ϯⲡ̀ⲣⲟⲫⲏⲧⲏⲥ ⲧ̀ⲥⲱⲛⲓ ⲛ̀Ⲁ̀ⲁ̀ⲣⲱⲛ ⲙ̀ⲡⲓⲕⲉⲙⲕⲉⲙ ϧⲉⲛ ⲛⲉⲥϫⲓϫ: ⲟⲩⲟϩ ⲁⲩⲓ̀ ⲉ̀ⲃⲟⲗ ⲥⲁⲙⲉⲛϩⲏⲥ ⲛ̀ϫⲉ ⲛⲓϩⲓⲟⲙⲓ ⲧⲏⲣⲟⲩ ϧⲉⲛ ϩⲁⲛⲕⲉⲙⲕⲉⲙ ⲛⲉⲙ ϩⲁⲛϩⲱⲥ.\n\nⲀⲥⲉⲣϩⲏⲧⲥ ⲇⲉ ϧⲁϫⲱⲟⲩ ⲛ̀ϫⲉ Ⲙⲁⲣⲓⲁⲙ ⲉⲥϫⲱ ⲙ̀ⲙⲟⲥ: ϫⲉ ⲙⲁⲣⲉⲛϩⲱⲥ ⲉ̀Ⲡ̀ϭⲟⲓⲥ: ϫⲉ ϧⲉⲛ ⲟⲩⲱ̀ⲟⲩ ⲅⲁⲣ ⲁϥϭⲓⲱ̀ⲟⲩ.\n\n+ Ⲟⲩϩ̀ⲑⲟ ⲛⲉⲙ ⲟⲩϭⲁⲥⲓϩ̀ⲑⲟ: ⲁϥⲉⲣⲃⲱⲣⲟⲩ ⲉ̀ⲫ̀ⲓⲟⲙ. Ϫⲉ ⲙⲁⲣⲉⲛϩⲱⲥ ⲉ̀Ⲡ̀ϭⲟⲓⲥ: ϫⲉ ϧⲉⲛ ⲟⲩⲱ̀ⲟⲩ ⲅⲁⲣ ⲁϥϭⲓⲱ̀ⲟⲩ.',
            },
            {
              language: 'englishCoptic',
              text: 'Amēn Allēlouia Kurie ele-ēson: Kurie ele-ēson: Kurie ele-ēson.\n\nTote afhōs enje Mō-usēs nem nenshēri em-Pisraēl etaihōdē ente Eptshois ouoh afjos ethroujos: je marenhōs e-Eptshois je khen ou-ōou gar aftshi-ōou.\n\n+ Ou-ehtho nem outshasi-ehtho afvervōrou e-efiom. Ouvo-ēthos nem ourefhōbs evol hijōi: afshōpi nēi enousōtēria.\n\nFai pe Panouti tinati-ōou naf: Efnouti empaiōt tinatshasf.\n\n+ Eptshois petkhomkhem ennivōts: Eptshois pe pefran. Niveretshōouts ente Fara-ō nem tefjom tērs afvervōrou e-efiom.\n\nHansōtp enanavatēs enetristatēs afjolkou khen efiom enshari.\n\n+ Afhōbs e-ehrēi ejōou enje pimōou: auōms e-ekhrēi epetshēk emefrēti enou-ōni.\n\nTekou-inam Eptshois astshi-ōou khen oujom. Tekjij enou-inam Panouti astake nekjaji.\n\n+ Khen epashai ente pekōou: akkhomkhem ennēettiouvēn: akouōrp empekjōnt: afou-omou emefrēti enhanrōou-i.\n\nEvol hiten pi-epneuma ente pekemvon afohi eratf enje pimōou: autshisi enje nimōou emefrēti enousobt: autshōs enje nijol khen ethmēti emefiom.\n\n+ Afjos gar enje pijaji: je tinatshoji entataho: entafōsh enhanshōl: enta-etsio entapsukhē: entakhōteb khen tasēfi ente tajij ertshois.\n\nAkouōrp em-Pekepneuma: afhobsou enje efiom: auōms epesēt emefrēti enoutath khen hanmōou euosh.\n\n+ Nim etoni emmok khen ninouti Eptshois. Nim etoni emmok: eauti-ōou nak khen nēethouab entak: euereshfēri emmok khen ou-ōou: ekiri enhaneshfēri.\n\nAksouten tekou-inam evol afomkou enje epkahi. Aktshimōit khajōf empeklaos khen oumethmēi: fai etaksotpf: aktijom naf khen teknomti: euma enemton efouab nak.\n\n+ Ausōtem enje hanethnos ouoh aujōnt: hannakhi autshi ennēetshop khen Nifulistim.\n\nTote auiēs emmōou enje nihēgemōn ente Edōm: niarkhōn ente Nimō-avitēs ou-estherter pe etaftshitou.\n\n+ Auvōl evol enje ouon niven etshop khen Khanaan: afi e-ehrēi ejōou enje ou-estherter nem ouhoti.\n\nKhen epashai ente pekejfoi marouerōni: shatefsini enje peklaos Eptshois: shatefsini enje peklaos: fai etakejfof.\n\n+ Anitou ekhoun tojou hijen outōou ente tekeklēronomia: nem ekhoun epekma-enshōpi etsebtōt: fai etakerhōb erof Eptshois.\n\nPekma ethouab Eptshois fē-etausebtōtf enje nekjij: Eptshois ekoi enouro sha eneh nem isjen epeneh ouoh eti.\n\n+ Je au-i ekhoun e-efiom enje ni-ehthōr ente Fara-ō: nem nefveretshōouts nem neftshasi-ehtho.\n\nA Eptshois en pimōou ente efiom e-ehrēi ejōou: nenshēri de em-Pisraēl naumoshi khen petshou-ōou khen ethmēti emefiom.\n\n+ Astshi de nas enje Mariam ti-eprofētēs etsōni en-A-arōn empikemkem khen nesjij: ouoh au-i evol samenhēs enje nihiomi tērou khen hankemkem nem hanhōs.\n\nAserhēts de khajōou enje Mariam esjō emmos: je marenhōs e-Eptshois: je khen ou-ōou gar aftshi-ōou.\n\n+ Ou-ehtho nem outshasi-ehtho: afervōrou e-efiom. Je marenhōs e-Eptshois: je khen ou-ōou gar aftshi-ōou.',
            },
            {
              language: 'english',
              text: 'Amen Alleluia, Kyrie eleison, Kyrie eleison, Kyrie eleison.\n\nThen Moses and the children of Israel sang this song to the Lord, and spoke saying, "Let us sing to the Lord for He has triumphed gloriously."\n\n+ The horse and its rider He has thrown into the sea, the Lord is my strength and song, and He has become my salvation.\n\nHe is my God and I will glorify Him, my father\'s God and I will exalt Him.\n\n+ The Lord is a Man of war, the Lord is His name. Pharaoh\'s chariots and his army He has cast into the sea.\n\nHis chosen captains also drowned, in the Red Sea.\n\n+ The depths have covered them, they sank to the bottom like a stone.\n\nYour right hand O Lord, has become glorious in power. Your right hand O Lord, has dashed the enemy in pieces.\n\n+ And in the greatness of Your excellence, You have overthrown those who rose against You. You sent forth Your wrath, it consumed them like stubble.\n\nAnd with the blast of Your nostrils the waters were gathered together, the flood stood upright like a heap, and the depths congealed in the heart of the sea.\n\n+ The enemy said, "I will pursue, I will overtake, I will divide the spoil, my desire shall be satisfied on them, I will draw my sword, and my hand shall destroy them."\n\nYou blew with Your wind, the sea covered them, they sank like lead in the mighty waters.\n\n+ Who is like You O Lord, among the gods. Who is like You, glorified in His saints, amazing in glory, performing wonders.\n\nYou stretched out Your right hand, the earth swallowed them. You in Your mercy, have led forth the people whom You have redeemed. You have guided them in Your strength, to Your holy habitation.\n\n+ The people will hear and be afraid, sorrow will take hold of the inhabitants of Palestine.\n\nThen the chiefs of Edom will be dismayed, the mighty men of Moab trembling, will take hold of them.\n\n+ All the inhabitants of Canaan will melt away, fear and dread will fall on them.\n\nBy the greatness of Your arm, they will be as still as a stone, till Your people pass over O Lord, till Your people pass over, whom You have purchased.\n\n+ You will bring them in, and plant them in the mountain of Your inheritance, in the place O Lord, which You have made for Your own dwelling.\n\nYour sanctuary O Lord, which Your hands have established, the Lord shall reign forever and ever.\n\n+ For the horses of Pharaoh, went with his chariots and his horsemen into the sea.\n\nAnd the Lord brought back the waters of the sea on them, but the children of Israel went on dry land, in the midst of the sea.\n\n+ Then Miriam the prophetess, the sister of Aaron, took the timbrel in her hand, and all the women went out after her, with timbrels and with praises.\n\nAnd Miriam answered them saying, "Let us sing to the Lord, for He has triumphed gloriously."\n\n+ The horse and its rider He has thrown into the sea. "Let us sing to the Lord, for He has triumphed gloriously."',
            },
            {
              language: 'englishArabic',
              text: 'Amin halleluia, Kyrie eleison, Kyrie eleison, Kyrie eleison.\n\nHina\'idhin sabbah Mousa wa banou Isra\'eel bi-hadhihi et-tasbiha lir-Rabb wa qalou, "Falnusabbih lir-Rabb li-annahu bil-majd qad tamajjad."\n\n+ El-faras wa rakibahu tarahahuma fil-bahr. Mu\'eeni wa satiri, sara li khalasan.\n\nHadha huwa ilahi fa-umajjiduhu, ilah abi fa-arfa\'uhu.\n\n+ Er-Rabb mukassir el-hurub, er-Rabb ismuhu. Markabat Fir\'awn wa kull quwwatihi tarahahuma fil-bahr.\n\nRukbanan muntakhabin dhi thalath junubat gharraqahum fil-bahr el-ahmar.\n\n+ Ghattahum el-ma\', inghamasou ila el-\'umq mithl el-hajar.\n\nYameenuka ya Rabb tamajjadat bil-quwwa. Yaduka el-yumna ya ilahi ahlakat a\'da\'ak.\n\n+ Bi-kathrat majdik, sahaqta alladhina yuqawimounana, arsalta ghadabak, fa-akalahum mithl el-hasheem.\n\nWa bi-rouh ghadabak waqaf el-ma\', wartafa\'at el-ma\' mithl es-sour, wa jamadat el-amwaj fi wasat el-bahr.\n\n+ Qal el-\'aduww, "Inni usri\' fa-udrik, wa uqassim el-ghana\'im, wa ushbi\' nafsi, wa aqtul bi-sayfi wa yadi tatasallat."\n\nArsalta rouhak, fa-ghattahum el-bahr, wa ghatasou ila asfal kar-rasas fi miyah kathira.\n\n+ Man yushbihuka fil-aliha. Ya Rabb man yushbihuka, mumajjadan fi qiddiseek, muta\'ajjaban minka bil-majd, sani\'an \'aja\'ib.\n\nMadadta yameenaka fa-ibtala\'athum el-ard. Hadayta sha\'bak bil-haqiqa, hadha alladhi ikhtartahu, wa qawwaytahu bi-ta\'ziyatik, ila mawdi\' rahat qudsik.\n\n+ Sami\'at el-umam wa ghadibat, wal-makhad akhadh sukkan Filistin.\n\nHina\'idhin asra\' wulat Adoum, wa ru\'asa\' el-Mu\'abiyyin akhadhathum er-ra\'da.\n\n+ Dhab kull sukkan Kan\'an, wa atat \'alayhim er-ra\'da wal-khawf.\n\nBi-kathrat sa\'idik falyasirou kal-hajar, hatta yajtaz sha\'buka ya Rabb, hatta yajtaz sha\'buka hadha alladhi iqtanaytahu.\n\n+ Adkhilhum wa aghrishum \'ala jabal mirathik, wa fi maskanik el-mu\'add, hadha alladhi sana\'tahu ya Rabb.\n\nMawdi\'uka el-muqaddas ya Rabb alladhi a\'addathu yadak, ya Rabb tamlik mundhu el-azal wal-an wa ila el-abad.\n\n+ Li-annahu qad dakhal ila el-bahr khayl Fir\'awn wa markabatuhu wa fursanuhu.\n\nWer-Rabb ghamarahum bi-miyah el-bahr, amma banou Isra\'eel fa-kanou yamshoun \'ala el-yabisa fi wasat el-bahr.\n\n+ Fa-akhadhat Maryam en-nabiyya, ukht Haroun, ed-duff bi-yadayha, wa kharajat fi ithriha jamee\' en-niswa bid-dufouf wat-tasabeeh.\n\nWa bada\'at Maryam fi muqaddimatihinn taqoul, "Falnusabbih er-Rabb, li-annahu bil-majd qad tamajjad."\n\n+ El-faras wa rakib el-faras, tarahahuma fil-bahr. "Falnusabbih er-Rabb, li-annahu bil-majd qad tamajjad."',
            },
            {
              language: 'arabic',
              text: 'آمين هلليلويا، كيرياليسون، كيرياليسون، كيرياليسون.\n\nحينئذ سبح موسى وبنو إسرائيل بهذه التسبحة للرب وقالوا، "فلنسبح للرب لأنه بالمجد قد تمجد."\n\n+ الفَرس وراكبه طرحهما في البحر. مُعيني وساتري، صار لي خلاصاً.\n\nهذا هو إلهي فأمجده، إله أبي فأرفعه.\n\n+ الرب مكسر الحروب، الرب إسمه. مركبات فرعون وكل قوته طرحهما في البحر.\n\nركباناً منتخبين ذي ثلاث جنبات غرقهم في البحر الأحمر.\n\n+ غطاهم الماء، إنغمسوا إلى العمق مثل الحجر.\n\nيمينك يا رب تمجدت بالقوة. يدك اليمنى يا إلهي أهلكت أعداءك.\n\n+ بكثرة مجدك، سحقت الذين يقاوموننا، أرسلت غضبك، فأكلهم مثل الهشيم.\n\nوبروح غضبك وقف الماء، وإرتفعت الماء مثل السور، وجمدت الأمواج في وسط البحر.\n\n+ قال العدو، "إني أسرع فأدرك، وأقسم الغنائم، وأشبع نفسي، وأقتل بسيفي ويدي تتسلط."\n\nأرسلت روحك، فغطاهم البحر، وغطسوا إلى أسفل كالرصاص في مياه كثيرة.\n\n+ من يشبهك في الآلهة. يا رب من يشبهك، مُمجداً في قديسيك، متعجباً منك بالمجد، صانعاً عجائب.\n\nمددت يمينك فإبتلعتهم الأرض. هديت شعبك بالحقيقة، هذا الذي إخترته، وقويته بتعزيتك، إلى موضع راحة قدسك.\n\n+ سمعت الأمم وغضبت، والمخاض أخذ سكان فلسطين.\n\nحينئذ أسرع وُلاة أدوم، ورؤساء المؤابيين أخذتهم الرعدة.\n\n+ ذاب كل سكان كنعان، وأتت عليهم الرعدة والخوف.\n\nبكثرة ساعدك فليصيروا كالحجر، حتى يجتاز شعبك يا رب، حتى يجتاز شعبك هذا الذي إقتنيته.\n\n+ أدخلهم وأغرسهم على جبل ميراثك، وفي مسكنك المُعَد، هذا الذي صنعته يا رب.\n\nموضعك المقدس يا رب الذي أعددته يداك، يا رب تمَلك منذ الأزل والآن وإلى الأبد.\n\n+ لأنه قد دخل إلى البحر خيل فرعون ومركباته وفرسانه.\n\nوالرب غمرهم بمياه البحر، أما بنو إسرائيل فكانوا يمشون على اليابسة في وسط البحر.\n\n+ فأخذت مريم النبية، أخت هرون، الدُف بيديها، وخرج في إثرها جميع النسوة بالدُفوف والتسابيح.\n\nوبدأت مريم في مقدمتهنَّ تقول، "فلنسبح الرب، لأنه بالمجد قد تمجد."\n\n+ الفرس ورُاكب الفرس، طرحهما في البحر. "فلنسبح الرب، لأنه بالمجد قد تمجد."',
            },
          ],
        },
        {
          id: 'annual-midnight-first-canticle-lobsh',
          title: 'Ϧⲉⲛ ⲟⲩϣⲱⲧ ⲁϥϣⲱⲧ (Lobsh of the First Canticle)',
          versions: [
            {
              language: 'coptic',
              text: 'Ϧⲉⲛ ⲟⲩϣⲱⲧ ⲁϥϣⲱⲧ: ⲛ̀ϫⲉ ⲡⲓⲙⲱⲟⲩ ⲛ̀ⲧⲉ ⲫ̀ⲓⲟⲙ: ⲟⲩⲟϩ ⲫ̀ⲛⲟⲩⲛ ⲉⲧϣⲏⲕ: ⲁϥϣⲱⲡⲓ ⲛ̀ⲟⲩⲙⲁ ⲙ̀ⲙⲟϣⲓ.\n\n+ Ⲟⲩⲕⲁϩⲓ ⲛ̀ⲁⲑⲟⲩⲱⲛϩ: ⲁ̀ⲫ̀ⲣⲏ ϣⲁⲓ ϩⲓϫⲱϥ: ⲟⲩⲙⲱⲓⲧ ⲛ̀ⲁⲧⲥⲓⲛⲓ: ⲁⲩⲙⲟϣⲓ ϩⲓⲱⲧϥ.\n\nⲞⲩⲙⲱⲟⲩ ⲉϥⲃⲏⲗ ⲉ̀ⲃⲟⲗ: ⲁϥⲟ̀ϩⲓ ⲉ̀ⲣⲁⲧϥ: ϧⲉⲛ ⲟⲩϩⲱⲃ ⲛ̀ϣ̀ⲫⲏⲣⲓ: ⲙ̀ⲡⲁⲣⲁⲇⲟⲝⲟⲛ.\n\n+ Ⲫⲁⲣⲁⲱ̀ ⲛⲉⲙ ⲛⲉϥϩⲁⲣⲙⲁ: ⲁⲩⲱⲙⲥ ⲉ̀ⲡⲉⲥⲏⲧ: ⲛⲉⲛϣⲏⲣⲓ ⲙ̀Ⲡⲓⲥⲣⲁⲏⲗ: ⲁⲩⲉⲣϫⲓⲛⲓⲟⲣ ⲙ̀ⲫ̀ⲓⲟⲙ.\n\nⲈ̀ⲛⲁϥϩⲱⲥ ϧⲁϫⲱⲟⲩ ⲡⲉ: ⲛ̀ϫⲉ Ⲙⲱⲩ̀ⲥⲏⲥ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ: ϣⲁ ⲛ̀ⲧⲉϥϭⲓⲧⲟⲩ ⲉ̀ϧⲟⲩⲛ: ϩⲓ ⲡ̀ϣⲁϥⲉ ⲛ̀Ⲥⲓⲛⲁ.\n\n+ Ⲉ̀ⲛⲁϥϩⲱⲥ ⲉ̀Ⲫ̀ⲛⲟⲩϯ: ϧⲉⲛ ⲧⲁⲓϩⲱⲇⲏ ⲙ̀ⲃⲉⲣⲓ: ϫⲉ ⲙⲁⲣⲉⲛϩⲱⲥ ⲉ̀Ⲡ̀ϭⲟⲓⲥ: ϫⲉ ϧⲉⲛ ⲟⲩⲱ̀ⲟⲩ ⲅⲁⲣ ⲁϥϭⲓⲱ̀ⲟⲩ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ: ⲛ̀ⲧⲉ Ⲙⲱⲩ̀ⲥⲏⲥ ⲡⲓⲁⲣⲭⲏⲡ̀ⲣⲟⲫⲏⲧⲏⲥ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n+ Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nⲦⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲕ ⲱ̀ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ (ⲁⲕⲧⲱⲛⲕ/ⲁⲕⲓ̀) ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ.',
            },
            {
              language: 'englishCoptic',
              text: 'Khen oushōt afshōt: enje pimōou ente efiom: ouoh efnoun etshēk: afshōpi enouma emmoshi.\n\n+ Oukahi enathouōnh: a-efrē shai hijōf: oumōit enatsini: aumoshi hiōtf.\n\nOumōou efvēl evol: afohi eratf: khen ouhōb eneshfēri: emparadokson.\n\n+ Fara-ō nem nefharma: auōms epesēt: nenshēri em-Pisraēl: auerjinior emefiom.\n\nEnafhōs khajōou pe: enje Mō-usēs pi-eprofētēs: sha enteftshitou ekhoun: hi epshafe en-Sina.\n\n+ Enafhōs e-Efnouti: khen taihōdē emveri: je marenhōs e-Eptshois: je khen ou-ōou gar aftshi-ōou.\n\nHiten nieukhē: ente Mō-usēs piarkhē-eprofētēs: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n+ Hiten ni-epresvia: ente Tithe-otokos ethouab Maria: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\nTenouōsht emmok ō Pi-ekhristos: nem Pekiōt enagathos: nem Pi-epneuma ethouab: je (aktōnk/aki) aksōti emmon.',
            },
            {
              language: 'english',
              text: 'With the split, the waters of the sea split, and the very deep, became a walkway.\n\n+ A hidden earth, was shone upon by the sun, and an untrodden road, was walked upon.\n\nThe flowing water, stood still, by a miraculous, act of wonder.\n\n+ Pharaoh and his chariots, were drowned, and the children of Israel, crossed the sea.\n\nAnd in front of them was, Moses the prophet praising, until he brought them, to the wilderness of Sinai.\n\n+ And they were praising God, with this new psalmody, saying "Let us sing to the Lord, for He has triumphed gloriously."\n\nThrough the prayers, of Moses the archprophet, O Lord grant us, the forgiveness of our sins.\n\n+ Through the intercessions, of the Mother of God Saint Mary, O Lord grant us, the forgiveness of our sins.\n\nWe worship You O Christ, with Your good Father, and the Holy Spirit, for You have (risen/come) and saved us.',
            },
            {
              language: 'englishArabic',
              text: 'Qat\'an inqata\', ma\' el-bahr, wal-\'umq el-\'ameeq, sara maslakan.\n\n+ Ard ghayr zahira, ashraqat esh-shams \'alayha, wa tareeq ghayr maslouka, mashaw \'alayha.\n\nMa\' munhall, waqaf, bi-fi\'l \'ajeeb, mu\'jiz.\n\n+ Ghariqa Fir\'awn, wa markabatuh, wa \'abara banu Isra\'eel, el-bahr.\n\nWa kana Mousa en-nabi, yusabbih quddamahum, hatta adkhalahum, barriyat Sina\'.\n\n+ Wa kanu yusabbihoon Allah, bi-hadhihi et-tasbiha el-jadeeda qa\'ileen, "Falnusabbih er-Rabb, li-annahu bil-majd qad tamajjad."\n\nBi-salawat, Mousa ra\'ees el-anbiya\', ya Rabb in\'im lana, bi-maghfirat khatayana.\n\n+ Bi-shafa\'at, walidat el-ilah el-qiddisa Maryam, ya Rabb in\'im lana, bi-maghfirat khatayana.\n\nNasjudu laka ayyuha el-Maseeh, ma\'a abeeka es-saleh, war-Rooh el-Qudus, li-annaka (qumta / ataita) wa khallastana.',
            },
            {
              language: 'arabic',
              text: 'قطعاً إنقطع، ماء البحر، والعمق العميق، صار مَسلكاً.\n\n+ أرض غير ظاهرة، أشرقت الشمس عليها، وطريق غير مسلوكة، مشوا عليها.\n\nماء مُنحل، وقف، بفِعل عجيب، مُعِجز.\n\n+ غرق فرعون، ومركباته، وعبر بنو إسرائيل، البحر.\n\nوكان موسى النبي، يسبح قدامهم، حتى أدخلهم، برية سيناء.\n\n+ وكانوا يسبحون الله، بهذه التسبحة الجديدة قائلين، "فلنسبح الرب، لأنه بالمجد قد تمجد."\n\nبصلوات، موسى رئيس الأنبياء، يا رب إنعم لنا، بمغفرة خطايانا.\n\n+ بشفاعات، والدة الإله القديسة مريم، يا رب إنعم لنا، بمغفرة خطايانا.\n\nنسجد لك أيها المسيح، مع أبيك الصالح، والروح القدس، لأنك (قُمت/أتيت) وخلصتنا.',
            },
          ],
        },
        {
          id: 'annual-midnight-sunday-theotokion-7',
          title: 'Sunday Theotokion (7)',
          versions: [
            {
              language: 'coptic',
              text: 'Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϯϭⲣⲟⲙⲡⲓ ⲉⲑⲛⲉⲥⲱⲥ: ⲑⲏⲉ̀ⲧⲁⲥⲙⲓⲥⲓ ⲛⲁⲛ: ⲙ̀Ⲫ̀ⲛⲟⲩϯ Ⲡⲓⲗⲟⲅⲟⲥ.\n\n+ Ⲛ̀ⲑⲟ ⲧⲉ ϯϩ̀ⲣⲏⲣⲓ: ⲛ̀ⲧⲉ ⲡⲓⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ: ⲑⲏⲉ̀ⲧⲁⲥⲫⲓⲣⲓ ⲉ̀ⲃⲟⲗ: ϧⲉⲛ ⲑ̀ⲛⲟⲩⲛⲓ ⲛ̀Ⲓⲉⲥⲥⲉ.\n\nⲠⲓϣ̀ⲃⲱⲧ ⲛ̀ⲧⲉ Ⲁ̀ⲁ̀ⲣⲱⲛ: ⲉ̀ⲧⲁϥⲫⲓⲣⲓ ⲉ̀ⲃⲟⲗ: ⲭⲱⲣⲓⲥ ϭⲟ ⲛⲉⲙ ⲧ̀ⲥⲟ: ϥ̀ⲟⲓ ⲛ̀ⲧⲩⲡⲟⲥ ⲛⲉ.\n\n+ Ⲱ̀ ⲑⲏⲉ̀ⲧⲁⲥⲙⲉⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: Ⲡⲉⲛⲛⲟⲩϯ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲓ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ⲉⲥⲟⲓ ⲙ̀ⲡⲁⲣⲑⲉⲛⲟⲥ.\n\nⲈⲑⲃⲉ ⲫⲁⲓ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ: ⲥⲉϭⲓⲥⲓ ⲙ̀ⲙⲟ: ⲧⲁϭⲟⲓⲥ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.\n\n+ Ⲁ̀ⲛⲟⲛ ϩⲱⲛ ⲧⲉⲛⲧⲱⲃϩ: ⲉⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.',
            },
            {
              language: 'englishCoptic',
              text: 'Khere ne Maria: titshrompi ethnesōs: thē-etasmisi nan: em-Efnouti Pilogos.\n\n+ Entho te ti-ehrēri: ente pi-esthoinoufi: thē-etasfiri evol: khen ethnouni en-Iesse.\n\nPi-eshvōt ente A-arōn: etaffiri evol: khōris tsho nem etso: efoi entupos ne.\n\n+ Ō thē-etasmes Pi-ekhristos: Pennouti khen oumethmi: atshne esperma enrōmi: esoi emparthenos.\n\nEthve fai ouon niven: setshisi emmo: tatshois Tithe-otokos: ethouab ensēou niven.\n\n+ Anon hōn tentōbh: ethrenshashni eunai: hiten ne-epresvia: entotf em-Pimairōmi.',
            },
            {
              language: 'english',
              text: 'Hail to you Mary, the beautiful dove, who gave birth to, God the Word.\n\n+ You are the flower, of incense, that has blossomed, from the root of Jesse.\n\nThe rod of Aaron, which blossomed, without planting or watering, resembles you.\n\n+ O who gave birth to Christ, our true God, without the seed of man, and remained a virgin.\n\nWherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.\n\n+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.',
            },
            {
              language: 'englishArabic',
              text: 'Es-salamu laki ya Maryam, el-hamama el-hasana, allati waladat lana, Allah el-kalima.\n\n+ Anti zahrat, el-bukhour allati, ayna\'at min, asl Yessa.\n\n\'Asa Haroun, allati azharat, bi-ghayr ghars wa la saqy, hiya mithal laki.\n\n+ Ya man waladti el-Maseeh, ilahana bil-haqiqa, wa bi-ghayr zar\' bashar, wa anti \'adhra\'.\n\nMin ajl hadha, kullu wahid yu\'azzimuki, ya sayyidati walidat el-ilah, el-qiddisa kulla heen.\n\n+ Wa nahnu aydan natlub, an nafuz bi-rahma, bi-shafa\'atiki, \'inda muhibb el-bashar.',
            },
            {
              language: 'arabic',
              text: 'السلام لكِ يا مريم، الحمامة الحسنة، التي ولدِت لنا، الله الكلمة.\n\n+ أنتِ زهرة، البخور التي، أينعت من، أصل يسَّى.\n\nعصا هرون، التي أزهرت، بغير غرس ولا سقي، هي مثال لكِ.\n\n+ يا مَنْ ولدِت المسيح، إلهنا بالحقيقة، وبغير زرع بشر، وأنتِ عذراء.\n\nمن أجل هذا، كل واحد يعظمِك، يا سيدتي والدة الإله، القديسة كل حين.\n\n+ ونحن أيضاً نطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر.',
            },
          ],
        },
        {
          id: 'annual-midnight-sunday-theotokion-8',
          title: 'Sunday Theotokion (8)',
          versions: [
            {
              language: 'coptic',
              text: '+ Ϣⲁϣϥ ⲛ̀ⲥⲟⲡ ⲙ̀ⲙⲏⲛⲓ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲡⲁϩⲏⲧ ⲧⲏⲣϥ: ϯⲛⲁⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲉⲕⲣⲁⲛ: Ⲡ̀ϭⲟⲓⲥ ⲙ̀ⲡⲓⲉ̀ⲡ̀ⲧⲏⲣϥ.\n\nⲀⲓⲉⲣⲫ̀ⲙⲉⲩⲓ ⲙ̀ⲡⲉⲕⲣⲁⲛ: ⲟⲩⲟϩ ⲁⲓϫⲉⲙⲛⲟⲙϯ: Ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲛⲓⲉ̀ⲱⲛ: Ⲫ̀ⲛⲟⲩϯ ⲛ̀ⲧⲉ ⲛⲓⲛⲟⲩϯ.\n\n+ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ: Ⲡⲓⲁ̀ⲗⲏⲑⲓⲛⲟⲥ: ⲫⲏⲉ̀ⲧⲁϥⲓ̀ ⲉⲑⲃⲉ ⲡⲉⲛⲥⲱϯ: ⲁϥⲉⲣⲥⲱⲙⲁⲧⲓⲕⲟⲥ.\n\nⲀϥϭⲓⲥⲁⲣⲝ ⲉ̀ⲃⲟⲗ: ϧⲉⲛ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲉⲑⲟⲩⲁⲃ: ⲛⲉⲙ ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ⲙⲁⲣⲓⲁ: ϯϣⲉⲗⲉⲧ ⲉⲑⲟⲩⲁⲃ.\n\n+ Ⲁϥⲫⲱⲛϩ ⲙ̀ⲡⲉⲛϩⲏⲃⲓ: ⲛⲉⲙ ⲡⲉⲛϩⲟϫϩⲉϫ ⲧⲏⲣϥ: ⲉ̀ⲟⲩⲣⲁϣⲓ ⲛ̀ϩⲏⲧ: ⲛⲉⲙ ⲟⲩⲑⲉⲗⲏⲗ ⲉ̀ⲡ̀ⲧⲏⲣϥ.\n\nⲘⲁⲣⲉⲛⲟⲩϣⲧ ⲙ̀ⲙⲟϥ: ⲟⲩⲟϩ ⲛ̀ⲧⲉⲛⲉⲣϩⲩⲙⲛⲟⲥ: ⲛ̀Ⲧⲉϥⲙⲁⲩ Ⲙⲁⲣⲓⲁ: ϯϭⲣⲟⲙⲡⲓ ⲉⲑⲛⲉⲥⲱⲥ.\n\n+ Ⲟⲩⲟϩ ⲛ̀ⲧⲉⲛⲱϣ ⲉ̀ⲃⲟⲗ: ϧⲉⲛ ⲟⲩⲥ̀ⲙⲏ ⲛ̀ⲑⲉⲗⲏⲗ: ϫⲉ ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: Ⲑ̀ⲙⲁⲩ ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ.\n\nⲬⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲡ̀ⲥⲱϯ ⲛ̀Ⲁ̀ⲇⲁⲙ ⲡⲉⲛⲓⲱⲧ: ⲭ̅ⲉ̅: Ⲑ̀ⲙⲁⲩ ⲙ̀Ⲡⲓⲙⲁⲙ̀ⲫⲱⲧ: ⲭ̅ⲉ̅: ⲡ̀ⲑⲉⲗⲏⲗ ⲛ̀Ⲉ̀ⲩⲁ: ⲭ̅ⲉ̅: ⲡ̀ⲟⲩⲛⲟϥ ⲛ̀ⲛⲓⲅⲉⲛⲉⲁ̀.\n\n+ Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲫ̀ⲣⲁϣⲓ ⲛ̀Ⲁ̀ⲃⲉⲗ ⲡⲓⲑ̀ⲙⲏⲓ: ⲭ̅ⲉ̅: Ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲛ̀ⲧⲁⲫ̀ⲙⲏⲓ: ⲭ̅ⲉ̅: ⲫ̀ⲛⲟϩⲉⲙ ⲛ̀Ⲛⲱⲉ̀: ⲭ̅ⲉ̅: ϯⲁⲧⲑⲱⲗⲉⲃ ⲛ̀ⲥⲉⲙⲛⲉ.\n\nⲬⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲡ̀ϩ̀ⲙⲟⲧ ⲛ̀Ⲁⲃⲣⲁⲁⲙ: ⲭ̅ⲉ̅: ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲁⲑⲗⲱⲙ: ⲭ̅ⲉ̅: ⲡ̀ⲥⲱϯ ⲛ̀Ⲓ̀ⲥⲁⲁⲕ ⲡⲉⲑⲟⲩⲁⲃ: ⲭ̅ⲉ̅: Ⲑ̀ⲙⲁⲩ ⲙ̀Ⲫⲏⲉⲑⲟⲩⲁⲃ.\n\n+ Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲡ̀ⲑⲉⲗⲏⲗ ⲛ̀Ⲓⲁⲕⲱⲃ: ⲭ̅ⲉ̅: ϩⲁⲛⲑ̀ⲃⲁ ⲛ̀ⲕⲱⲃ: ⲭ̅ⲉ̅: ⲡ̀ϣⲟⲩϣⲟⲩ ⲛ̀Ⲓⲟⲩⲇⲁ: ⲭ̅ⲉ̅: Ⲑ̀ⲙⲁⲩ ⲙ̀Ⲡⲓⲇⲉⲥⲡⲟⲧⲁ.\n\nⲬⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲡ̀ϩⲓⲱⲓϣ ⲙ̀Ⲙⲱⲩ̀ⲥⲏⲥ: ⲭ̅ⲉ̅: Ⲑ̀ⲙⲁⲩ ⲙ̀Ⲡⲓⲇⲉⲥⲡⲟⲧⲏⲥ: ⲭ̅ⲉ̅: ⲡ̀ⲧⲁⲓⲟ ⲛ̀Ⲥⲁⲙⲟⲩⲏⲗ: ⲭ̅ⲉ̅: ⲡ̀ϣⲟⲩϣⲟⲩ ⲙ̀Ⲡⲓⲥⲣⲁⲏⲗ.\n\n+ Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲡ̀ⲧⲁϫⲣⲟ ⲛ̀Ⲓⲱⲃ ⲡⲓⲑ̀ⲙⲏⲓ: ⲭ̅ⲉ̅: ⲡⲓⲱ̀ⲛⲓ ⲛ̀ⲁ̀ⲛⲁⲙⲏⲓ: ⲭ̅ⲉ̅: Ⲑ̀ⲙⲁⲩ ⲙ̀Ⲡⲓⲙⲉⲛⲣⲓⲧ: ⲭ̅ⲉ̅: ⲧ̀ϣⲉⲣⲓ ⲙ̀ⲡ̀ⲟⲩⲣⲟ Ⲇⲁⲩⲓⲇ.\n\nⲬⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϯϣ̀ⲫⲉⲣⲓ ⲛ̀Ⲥⲟⲗⲟⲙⲱⲛ: ⲭ̅ⲉ̅: ⲡ̀ϭⲓⲥⲓ ⲛ̀ⲛⲓⲇⲓⲕⲉⲟⲛ: ⲭ̅ⲉ̅: ⲡ̀ⲟⲩϫⲁⲓ ⲛ̀Ⲏ̀ⲥⲁⲏ̀ⲁⲥ: ⲭ̅ⲉ̅: ⲡ̀ⲧⲁⲗϭⲟ ⲛ̀Ⲓⲉⲣⲉⲙⲓⲁⲥ.\n\n+ Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲡ̀ⲉ̀ⲙⲓ ⲛ̀Ⲓⲉⲍⲉⲕⲓⲏⲗ: ⲭ̅ⲉ̅: ⲭⲁⲣⲓⲥ ⲧⲟⲩ Ⲇⲁⲛⲓⲏⲗ: ⲭ̅ⲉ̅: ⲧ̀ϫⲟⲙ ⲛ̀Ⲏⲗⲓⲁⲥ: ⲭ̅ⲉ̅: ⲡⲓϩ̀ⲙⲟⲧ ⲛ̀Ⲉ̀ⲗⲓⲥⲉⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: ⲭ̅ⲉ̅: Ⲑ̀ⲙⲁⲩ ⲛ̀Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲭ̅ⲉ̅: ϯϭⲣⲟⲙⲡⲓ ⲉⲑⲛⲉⲥⲱⲥ: ⲭ̅ⲉ̅: Ⲑ̀ⲙⲁⲩ ⲛ̀Ⲩⲓⲟⲥ Ⲑⲉⲟⲥ.\n\n+ Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲉ̀ⲧⲁⲩⲉⲣⲙⲉⲑⲣⲉ ⲛⲁⲥ: ⲛ̀ϫⲉ ⲛⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ ⲧⲏⲣⲟⲩ: ⲟⲩⲟϩ ⲁⲫϫⲱ ⲙ̀ⲙⲟⲥ.\n+ Ϩⲏⲡⲡⲉ Ⲫ̀ⲛⲟⲩϯ Ⲡⲓⲗⲟⲅⲟⲥ: ⲉ̀ⲧⲁϥϭⲓⲥⲁⲣⲝ ⲛ̀ϧⲏϯ: ϧⲉⲛ ⲟⲩⲙⲉⲧⲟⲩⲁⲓ: ⲛ̀ⲁⲧⲥⲁϫⲓ ⲙ̀ⲡⲉⲥⲣⲏϯ.\n\nⲦⲉϭⲟⲥⲓ ⲁ̀ⲗⲏⲑⲱⲥ: ⲉ̀ϩⲟⲧⲉ ⲡⲓϣ̀ⲃⲱⲧ: ⲛ̀ⲧⲉ Ⲁ̀ⲁ̀ⲣⲱⲛ: ⲱ̀ ⲑⲏⲉⲑⲙⲉϩ ⲛ̀ϩ̀ⲙⲟⲧ.\nⲀϣⲡⲉ ⲡⲓϣ̀ⲃⲱⲧ: ⲉ̀ⲃⲏⲗ ⲉ̀Ⲙⲁⲣⲓⲁ: ϫⲉ ⲛ̀ⲑⲟϥ ⲡⲉ ⲡ̀ⲧⲩⲡⲟⲥ: ⲛ̀ⲧⲉⲥⲡⲁⲣⲑⲉⲛⲓⲁ.\n\n+ Ⲁⲥⲉⲣⲃⲟⲕⲓ ⲁⲥⲙⲓⲥⲓ: ⲭⲱⲣⲓⲥ ⲥⲩⲛⲟⲥⲓⲁ: ⲙ̀Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫⲏⲉⲧϭⲟⲥⲓ: Ⲡⲓⲗⲟⲅⲟⲥ ⲛ̀Ⲁⲓⲇⲓⲁ.\n+ Ϩⲓⲧⲉⲛ ⲛⲉⲥⲉⲩⲭⲏ: ⲛⲉⲙ ⲛⲉⲥⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲁ̀ⲟⲩⲱⲛ ⲛⲁⲛ Ⲡ̀ϭⲟⲓⲥ: ⲙ̀ⲫ̀ⲣⲟ ⲛ̀ⲧⲉ Ϯⲉⲕⲕⲗⲏⲥⲓⲁ.\n\nϮϯϩⲟ ⲉ̀ⲣⲟ: ⲱ̀ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: ⲭⲁ ⲫ̀ⲣⲟ ⲛ̀ⲛⲓⲉⲕⲕⲗⲏⲥⲓⲁ: ⲉϥⲟⲩⲏⲛ ⲛ̀ⲛⲓⲡⲓⲥⲧⲟⲥ.\nⲘⲁⲣⲉⲛϯϩⲟ ⲉ̀ⲣⲟⲥ: ⲉⲑⲣⲉⲥⲧⲱⲃϩ ⲉ̀ϫⲱⲛ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲥⲙⲉⲛⲣⲓⲧ: ⲉⲑⲣⲉϥⲭⲱ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
            },
            {
              language: 'englishCoptic',
              text: '+ Shashf ensop emmēni: evol khen pahēt tērf: tina-esmou epekran: Eptshois empi-e-eptērf.\n\nAierefmeui empekran: ouoh aijemnomti: Epouro enni-eōn: Efnouti ente ninouti.\n\n+ Iēsous Pi-ekhristos Pennouti: Pi-alēthinos: fē-etafi ethve pensōti: afersōmatikos.\n\nAftshisarks evol: khen Pi-epneuma Ethouab: nem evol khen Maria: tishelet ethouab.\n\n+ Affōnh empenhēvi: nem penhojhej tērf: eourashi enhēt: nem outhelēl e-eptērf.\n\nMarenousht emmof: ouoh entenerhumnos: en-Tefmau Maria: titshrompi ethnesōs.\n\n+ Ouoh entenōsh evol: khen ou-esmē enthelēl: je khere ne Maria: Ethmau en-Emmanouēl.\n\nKhere ne Maria: epsōti en-Adam peniōt: khere: Ethmau em-Pima-emfōt: khere: epthelēl en-Eua: khere: epounof ennigene-a.\n\n+ Khere ne Maria: efrashi en-Avel pi-ethmēi: khere: Tiparthenos enta-efmēi: khere: efnohem en-Nō-e: khere: tiatthōleb ensemne.\n\nKhere ne Maria: epehmot en-Abraam: khere: pi-ekhlom enathlōm: khere: epsōti en-Isaak pethouab: khere: Ethmau em-Fēethouab.\n\n+ Khere ne Maria: epthelēl en-Iakōb: khere: hanethva enkōb: khere: epshoushou en-Iouda: khere: Ethmau em-Pidespota.\n\nKhere ne Maria: ephiōish em-Mō-usēs: khere: Ethmau em-Pidespotēs: khere: eptaio en-Samouēl: khere: epshoushou em-Pisraēl.\n\n+ Khere ne Maria: eptajro en-Iōb pi-ethmēi: khere: pi-ōni enanamēi: khere: Ethmau em-Pimenrit: khere: etsheri emepouro Dauid.\n\nKhere ne Maria: ti-eshferi en-Solomōn: khere: eptshisi ennidikeon: khere: epoujai en-Ēsa-ēas: khere: eptaltsho en-Ieremias.\n\n+ Khere ne Maria: epemi en-Iezekiēl: khere: kharis tou Daniēl: khere: etjom en-Ēlias: khere: pi-ehmot en-Eliseos.\n\nKhere ne Maria: Tithe-otokos: khere: Ethmau en-Iēsous Pi-ekhristos: khere: titshrompi ethnesōs: khere: Ethmau en-Uios Theos.\n\n+ Khere ne Maria: etauermethre nas: enje ni-eprofētēs tērou: ouoh afjō emmos.\n+ Hēppe Efnouti Pilogos: etaftshisarks enkhēti: khen oumetouai: enatsaji empesrēti.\n\nTetshosi alēthōs: ehote pi-eshvōt: ente A-arōn: ō thēethmeh enehmot.\nAshpe pi-eshvōt: evēl e-Maria: je enthof pe eptupos: entesparthenia.\n\n+ Aservoki asmisi: khōris sunosia: em-Epshēri em-Fēettshosi: Pilogos en-Aidia.\n+ Hiten neseukhē: nem nesepresvia: aouōn nan Eptshois: emefro ente Tiekklēsia.\n\nTitiho ero: ō Tithe-otokos: kha efro enniekklēsia: efouēn ennipistos.\nMarentiho eros: ethrestōbh ejōn: nahren Pesmenrit: ethrefkhō nan evol.',
            },
            {
              language: 'english',
              text: '+ Seven times everyday, I will praise Your name, with all my heart, O God of everyone.\n\nI remembered Your name, and I was comforted, O King of the ages, and God of all gods.\n\n+ Jesus Christ our true God, who has come, for our salvation, was incarnate.\n\nHe was incarnate, of the Holy Spirit, and of Mary, the pure Bride.\n\n+ And changed our sorrow, and all our troubles, to joy for our hearts, and total rejoicing.\n\nLet us worship Him, and sing to, His Mother Mary, the beautiful dove.\n\n+ And let us all proclaim, with the voice of joy, saying hail to you Mary, the Mother of Emmanuel.\n\nHail to you Mary, the salvation of our father Adam, hail... the Mother of the Refuge, hail... the rejoicing of Eve, hail... the joy of all generations.\n\n+ Hail to you Mary, the joy of Abel the just, hail... the true Virgin, hail... the salvation of Noah, hail... the chaste and undefiled.\n\nHail to you Mary, the grace of Abraham, hail... the unfading crown, hail... the redemption of Saint Isaac, hail... the Mother of the Holy.\n\n+ Hail to you Mary, the rejoicing of Jacob, hail... myriads of myriads, hail... the pride of Judah, hail... the Mother of the Master.\n\nHail to you Mary, the preaching of Moses, hail... the Mother of the Master, hail... the honor of Samuel, hail... the pride of Israel.\n\n+ Hail to you Mary, the steadfastness of Job the just, hail... the precious stone, hail... the Mother of the Beloved, hail... the daughter of king David.\n\nHail to you Mary, the friend of Solomon, hail... the exaltation of the righteous, hail... the redemption of Isaiah, hail... the healing of Jeremiah.\n\n+ Hail to you Mary, the knowledge of Ezekiel, hail... the grace of Daniel, hail... the power of Elijah, hail... the grace of Elisha.\n\nHail to you Mary, the Mother of God, hail... the Mother of Jesus Christ, hail... the beautiful dove, hail... the Mother of the Son of God.\n\n+ Hail to you Mary, who was witnessed by, all the prophets, and they said.\n+ Behold God the Word, was incarnate of you, in an undescribable, unity.\n\nYou are truly exalted, more than the rod, of Aaron, O full of grace.\nWhat is the rod, but Mary, for it is the symbol, of her virginity.\n\n+ She conceived and gave birth, without a man, to the Son of the Highest, the Word Himself.\n+ Through her prayers, and intercessions, O Lord open unto us, the gates of the Church.\n\nI entreat You, O Mother of God, keep the gates of the church, open to the faithful.\nLet us ask her, to intercede for us, before her Beloved, that He may forgive us.',
            },
            {
              language: 'englishArabic',
              text: '+ Sab\' marrat kulla yawm, min kulli qalbi, ubarik ismak, ya Rabb el-kull.\n\nDhakartu ismak, fa-ta\'azzayt, ya malik ed-duhour, wa ilah el-aliha.\n\n+ Yasou\' el-Maseeh ilahuna, el-haqiqi alladhi, ata min ajl khalasina, mutajassidan.\n\nWa tajassada min, er-Rooh el-Qudus, wa min Maryam, el-\'arous et-tahira.\n\n+ Wa qalaba huznana, wa kulla deeqina, ila farah qalb, wa tahleel kulli.\n\nFalnasjud lahu, wa nurattil li-ummihi, Maryam, el-hamama el-hasana.\n\n+ Wa nasrukh, bi-sawt et-tahleel qa\'ileen, es-salamu laki ya Maryam, umm \'Immanoueel.\n\nEs-salamu laki ya Maryam, khalas abina Adam, es-salam... umm el-malja\', es-salam... tahleel Hawwa\', es-salam... farah el-ajyal.\n\n+ Es-salamu laki ya Maryam, farah Habeel el-barr, es-salam... el-\'adhra\' el-haqiqiya, es-salam... khalas Nouh, es-salam... ghayr ed-danisa el-hadi\'a.\n\nEs-salamu laki ya Maryam, ni\'mat Ibraheem, es-salam... el-ikleel ghayr el-mudmahill, es-salam... khalas Ishaq el-qiddis, es-salam... umm el-quddous.\n\n+ Es-salamu laki ya Maryam, tahleel Ya\'qoub, es-salam... rabawat muda\'afa, es-salam... fakhr Yahouza, es-salam... umm es-sayyid.\n\nEs-salamu laki ya Maryam, karazat Mousa, es-salam... walidat es-sayyid, es-salam... karamat Samouel, es-salam... fakhr Isra\'eel.\n\n+ Es-salamu laki ya Maryam, thabat Ayyoub el-barr, es-salam... el-hajar el-kareem, es-salam... umm el-habeeb, es-salam... ibnat el-malik Dawoud.\n\nEs-salamu laki ya Maryam, sadeeqat Sulayman, es-salam... rif\'at es-siddiqeen, es-salam... khalas Ash\'iya\', es-salam... shifa\' Irmiya.\n\n+ Es-salamu laki ya Maryam, \'ilm Hizqiyal, es-salam... ni\'mat Daniyal, es-salam... quwwat Iliya, es-salam... ni\'mat Elisha\'.\n\nEs-salamu laki ya Maryam, walidat el-ilah, es-salam... umm Yasou\' el-Maseeh, es-salam... el-hamama el-hasna\', es-salam... umm Ibn Allah.\n\n+ Es-salamu li-Maryam, allati shahida laha, jamee\' el-anbiya\', wa qalou.\n+ Huwadha Allah el-kalima, alladhi tajassada minki, bi-wahdaniya, la yuntaq bi-mithliha.\n\nMurtafi\'a, anti bil-haqiqa, akthar min \'asa Haroun, ayyatuha el-mumtali\'a ni\'ma.\nMa hiya el-\'asa, illa Maryam, li-annaha mithal, batouliyatiha.\n\n+ Habalat wa waladat, bi-ghayr mubada\'a, Ibn el-\'Aliy, el-kalima edh-dhati.\n+ Bi-salawatiha, wa shafa\'atiha, iftah lana ya Rabb, bab el-kaneesa.\n\nAs\'aluki, ya walidat el-ilah, ij\'ali abwab el-kana\'is, maftouha lil-mu\'mineen.\nFalnas\'alha, an tatlub \'anna, \'inda habeebiha, li-yaghfir lana.',
            },
            {
              language: 'arabic',
              text: '+ سبع مرات كل يوم، من كل قلبي، أُبارك أسمك، يا رب الكل.\n\nذكرت إسمك، فتعزيت، يا ملك الدهور، وإله الآلهة.\n\n+ يسوع المسيح إلهنا، الحقيقي الذي، أتى من أجل خلاصنا، متجسداً.\n\nوتجسد من، الروح القدس، ومن مريم، العروس الطاهرة.\n\n+ وقلب حُزننا، وكل ضيقنا، إلى فرح قلب، وتهليل كُلي.\n\nفلنسجد له، ونرتل لأمه، مريم، الحمامة الحسنة.\n\n+ ونصرخ، بصوت التهليل قائلين، السلام لك يا مريم، أُم عمانوئيل.\n\nالسلام لك يا مريم، خلاص أبينا آدم، السلام... أُم الملجأ، السلام... تهليل حواء، السلام... فرح الأجيال.\n\n+ السلام لك يا مريم، فرح هابيل البار، السلام... العذراء الحقيقية، السلام... خلاص نوح، السلام... غير الدنسة الهادئة.\n\nالسلام لك يا مريم، نعمة إبراهيم، السلام... الإكليل غير المُضمحل، السلام... خلاص إسحق القديس، السلام... أُم القدوس.\n\n+ السلام لك يا مريم، تهليل يعقوب، السلام... ربوات مضاعفة، السلام... فخر يهوذا، السلام... أُم السيد.\n\nالسلام لك يا مريم، كرازة موسى، السلام... والدة السيد، السلام... كرامة صموئيل، السلام... فخر إسرائيل.\n\n+ السلام لك يا مريم، ثبات أيوب البار، السلام... الحجر الكريم، السلام... أُم الحبيب، السلام... إبنة الملك داود.\n\nالسلام لك يا مريم، صديقة سليمان، السلام... رفعة الصديقين، السلام... خلاص أشعياء، السلام... شفاء أرميا.\n\n+ السلام لك يا مريم، عِلم حزقيال، السلام... نعمة دانيال، السلام... قوة إيليا، السلام... نعمة إليشع.\n\nالسلام لك يا مريم، والدة الإله، السلام... أم يسوع المسيح، السلام... الحمامة الحسناء، السلام... أم إبن الله.\n\n+ السلام لمريم، التي شهد لها، جميع الأنبياء، وقالوا.\n+ هوذا الله الكلمة، الذي تجسد منكِ، بوحدانية، لا يُنطق بمثلها.\n\nمرتفعة، أنت بالحقيقة، أكثر من عصا هرون، أيتها المُمتلئة نعمة.\nما هيَّ العصا، إلا مريم، لأنها مِثال، بتوليتها.\n\n+ حبلت وولدت، بغير مباضعة، إبن العليِّ، الكلمة الذاتي.\n+ بصلواتها، وشفاعاتها، إفتح لنا يا رب، باب الكنيسة.\n\nأسالكِ، يا والدة الإله، إجعلي أبواب الكنائس، مفتوحة للمؤمنين.\nفلنسألها، أن تطلب عنا، عند حبيبها، ليغفر لنا.',
            },
          ],
        },
        {
          id: 'annual-midnight-sunday-theotokion-9',
          title: 'Sunday Theotokion (9)',
          versions: [
            {
              language: 'coptic',
              text: '+ Ⲁⲩⲙⲟⲩϯ ⲉ̀ⲣⲟ: Ⲙⲁⲣⲓⲁ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ϫⲉ ϯϩ̀ⲣⲏⲣⲓ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲧⲉ ⲡⲓⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ.\n\nⲐⲏⲉ̀ⲧⲁⲥϯⲟⲩⲱ̀ ⲉ̀ⲡ̀ϣⲱⲓ: ⲁⲥⲫⲓⲣⲓ ⲉ̀ⲃⲟⲗ: ϧⲉⲛ ⲑ̀ⲛⲟⲩⲛⲓ ⲛ̀ⲛⲓⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: ⲛⲉⲙ ⲛⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ.\n\n+ Ⲙ̀ⲫ̀ⲣⲏϯ ⲙ̀ⲡⲓϣ̀ⲃⲱⲧ: ⲛ̀ⲧⲉ Ⲁ̀ⲁ̀ⲣⲱⲛ ⲡⲓⲟⲩⲏⲃ: ⲉ̀ⲧⲁϥⲫⲓⲣⲓ ⲉ̀ⲃⲟⲗ: ⲁϥⲟⲡⲧ ⲛ̀ⲕⲁⲣⲡⲟⲥ.\n\nϪⲉ ⲁ̀ⲣⲉϫ̀ⲫⲟ ⲙ̀Ⲡⲓⲗⲟⲅⲟⲥ: ⲁϭⲛⲉ ⲥ̀ⲡⲉⲣⲙⲁ ⲛ̀ⲣⲱⲙⲓ: ⲉⲥⲟⲓ ⲛ̀ⲁⲧⲧⲁⲕⲟ: ⲛ̀ϫⲉ ⲧⲉⲥⲡⲁⲣⲑⲉⲛⲓⲁ.\n\n+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛϯⲱ̀ⲟⲩ ⲛⲉ: ϩⲱⲥ Ⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: ⲙⲁϯϩⲟ ⲙ̀Ⲡⲉϣⲏⲣⲓ: ⲉⲑⲣⲉϥⲭⲱ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
            },
            {
              language: 'englishCoptic',
              text: '+ Aumouti ero: Maria Tiparthenos: je ti-ehrēri ethouab: ente pi-esthoinoufi.\n\nThē-etastiou-ō e-epshōi: asfiri evol: khen ethnouni ennipatriarkhēs: nem ni-eprofētēs.\n\n+ Emefrēti empi-eshvōt: ente A-arōn piouēb: etaffiri evol: afopt enkarpos.\n\nJe are-ejfo em-Pilogos: atshne esperma enrōmi: esoi enattako: enje tesparthenia.\n\n+ Ethve fai tenti-ōou ne: hōs The-otokos: matiho em-Peshēri: ethrefkhō nan evol.',
            },
            {
              language: 'english',
              text: '+ You are called, O Virgin Mary, the holy flower, of incense.\n\nWhich came out, and blossomed, from the roots of the patriarchs, and the prophets.\n\n+ Like the rod, of Aaron the priest, which blossomed, and brought forth fruit.\n\nFor you gave birth to the Word, without the seed of man, and your virginity, was not corrupted.\n\n+ Wherefore we glorify you, as the Mother of God, ask your Son, to forgive us.',
            },
            {
              language: 'englishArabic',
              text: '+ Du\'iti, ya Maryam el-\'adhra\', ez-zahra el-muqaddasa, allati lil-bukhour.\n\nAllati tala\'at, wa azharat, min asl ru\'asa\' el-aba\', wal-anbiya\'.\n\n+ Mithl \'asa, Haroun el-kahin, azharat, wa awsaqat thamaran.\n\nLi-annaki waladti el-kalima, bi-ghayr zar\' bashar, wa batouliyatuki, bi-ghayr fasad.\n\n+ Fa-li-hadha numajjiduki, ka-walidat el-ilah, is\'ali ibnaki, li-yaghfir lana.',
            },
            {
              language: 'arabic',
              text: '+ دعيتِ، يا مريم العذراء، الزهرة المقدسة، التي للبخور.\n\nالتي طلعت، وأزهرت، من أصل رؤساء الآباء، والأنبياء.\n\n+ مِثل عصا، هارون الكاهن، أزهرت، وأوسقت ثمراً.\n\nلأنكِ ولدتِ الكلمة، بغير زرع بشر، وبتوليتِك، بغير فساد.\n\n+ فلهذا نمجدكِ، كوالدة الإله، إسألي إبنِك، ليغفر لنا.',
            },
          ],
        },
        {
          id: 'annual-midnight-second-canticle',
          title: 'Ⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ (The Second Canticle)',
          versions: [
            {
              language: 'coptic',
              text: '+ Ⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ϫⲉ ⲟⲩⲭ̀ⲣⲏⲥⲧⲟⲥ ⲟⲩⲁ̀ⲅⲁⲑⲟⲥ ⲡⲉ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲞⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ ⲙ̀Ⲫ̀ⲛⲟⲩϯ ⲛ̀ⲧⲉ ⲛⲓⲛⲟⲩϯ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲛ̀ⲧⲉ ⲛⲓϭⲟⲓⲥ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲪⲏⲉⲧⲓ̀ⲣⲓ ⲛ̀ϩⲁⲛⲛⲓϣϯ ⲛ̀ϣ̀ⲫⲏⲣⲓ ⲙ̀ⲙⲁⲩⲁⲧϥ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲫⲏⲉ̀ⲧⲁϥⲑⲁⲙⲓⲟ ⲛ̀ⲛⲓⲫⲏⲟⲩⲓ̀ ϧⲉⲛ ⲟⲩⲕⲁϯ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲪⲏⲉ̀ⲧⲁϥⲧⲁϫⲣⲟ ⲙ̀ⲡⲓⲕⲁϩⲓ ϩⲓϫⲉⲛ ⲛⲓⲙⲱⲟⲩ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲫⲏⲉ̀ⲧⲁϥⲑⲁⲙⲓⲟ ⲛ̀ϩⲁⲛⲛⲓϣϯ ⲛ̀ⲣⲉϥⲉⲣⲟⲩⲱⲓⲛⲓ ⲙ̀ⲙⲁⲩⲁⲧϥ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲪ̀ⲣⲏ ⲉ̀ⲟⲩⲉⲣϣⲓϣⲓ ⲛ̀ⲧⲉ ⲡⲓⲉ̀ϩⲟⲟⲩ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲡⲓⲓⲟϩ ⲛⲉⲙ ⲛⲓⲥⲓⲟⲩ ⲉⲩⲉⲝⲟⲩⲥⲓⲁ ⲛ̀ⲧⲉ ⲡⲓⲉ̀ϫⲱⲣϩ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲪⲏⲉ̀ⲧⲁϥϣⲁⲣⲓ ⲉ̀ⲛⲁ Ⲭⲏⲙⲓ ⲛⲉⲙ ⲛⲟⲩϣⲁⲙⲓⲥⲓ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲟⲩⲟϩ ⲁϥⲓ̀ⲛⲓ ⲙ̀Ⲡⲓⲥⲣⲁⲏⲗ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲧⲟⲩⲙⲏϯ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nϦⲉⲛ ⲟⲩϫⲓϫ ⲉⲥⲁ̀ⲙⲁϩⲓ ⲛⲉⲙ ⲟⲩϣⲱⲃϣ ⲉϥϭⲟⲥⲓ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲫⲏⲉ̀ⲧⲁϥⲫⲱⲣϫ ⲙ̀ⲫ̀ⲓⲟⲙ ⲛ̀ϣⲁⲣⲓ ϧⲉⲛ ϩⲁⲛⲫⲱⲣϫ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲞⲩⲟϩ ⲁϥⲓ̀ⲛⲓ ⲙ̀Ⲡⲓⲥⲣⲁⲏⲗ ⲉ̀ⲙⲏⲣ ϧⲉⲛ ⲧⲉϥⲙⲏϯ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲟⲩⲟϩ ⲁϥⲃⲟⲣⲃⲉⲣ ⲙ̀ⲫⲁⲣⲁⲱ̀ ⲛⲉⲙ ⲧⲉϥϫⲟⲙ ⲧⲏⲣⲥ ⲉ̀ⲫ̀ⲓⲟⲙ ⲛ̀ϣⲁⲣⲓ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲪⲏⲉ̀ⲧⲁϥⲓ̀ⲛⲓ ⲙ̀ⲡⲉϥⲗⲁⲟⲥ ⲉ̀ⲃⲟⲗ ⲛ̀ϩ̀ⲣⲏⲓ ϩⲓ ⲡ̀ϣⲁϥⲉ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲫⲏⲉ̀ⲧⲁϥⲓ̀ⲛⲓ ⲛ̀ⲟⲩⲙⲱⲟⲩ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲟⲩⲡⲉⲧⲣⲁ ⲛ̀ⲕⲟϩ ⲛ̀ϣⲱⲧ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲪⲏⲉ̀ⲧⲁϥϣⲁⲣⲓ ⲉ̀ϩⲁⲛⲛⲓϣϯ ⲛ̀ⲟⲩⲣⲱⲟⲩ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲟⲩⲟϩ ⲁϥϧⲱⲧⲉⲃ ⲛ̀ϩⲁⲛⲟⲩⲣⲱⲟⲩ ⲉⲩⲟⲓ ⲛ̀ϣ̀ⲫⲏⲣⲓ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲤⲏⲱⲛ ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ Ⲛⲓⲁ̀ⲙⲟⲣⲣⲉⲟⲥ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲛⲉⲙ Ⲱⲅ ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲑ̀Ⲃⲁⲥⲁⲛ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲀϥϯ ⲙ̀ⲡⲟⲩⲕⲁϩⲓ ⲉⲩⲕ̀ⲗⲏⲣⲟⲛⲟⲙⲓⲁ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲉⲩⲕ̀ⲗⲏⲣⲟⲛⲟⲙⲓⲁ ⲙ̀ⲡⲉϥⲃⲱⲕ Ⲡⲓⲥⲣⲁⲏⲗ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲚ̀ϩ̀ⲣⲏⲓ ϧⲉⲛ ⲡⲉⲛⲑⲉⲃⲓⲟ ⲁϥⲉⲣⲡⲉⲛⲙⲉⲩⲓ̀ ⲛ̀ϫⲉ Ⲡ̀ϭⲟⲓⲥ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲟⲩⲟϩ ⲁϥⲥⲟⲧⲧⲉⲛ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲉⲛϫⲓϫ ⲛ̀ⲧⲉ ⲛⲉⲛϫⲁϫⲓ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲪⲏⲉⲧϯ ϧ̀ⲣⲉ ⲛ̀ⲥⲁⲣⲝ ⲛⲓⲃⲉⲛ ⲉⲧⲟⲛϧ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ ⲙ̀Ⲫ̀ⲛⲟⲩϯ ⲛ̀ⲧⲉ ⲧ̀ⲫⲉ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲞⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲛ̀ⲧⲉ ⲛⲓϭⲟⲓⲥ ϫⲉ ⲟⲩⲭ̀ⲣⲏⲥⲧⲟⲥ ⲟⲩⲁ̀ⲅⲁⲑⲟⲥ ⲡⲉ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.',
            },
            {
              language: 'englishCoptic',
              text: '+ Ouōnh evol em-Eptshois je ou-ekhrēstos ou-agathos pe: allēlouia je pefnai shop sha eneh.\n\nOuōnh evol em-Efnouti ente ninouti: allēlouia je pefnai shop sha eneh.\n\n+ Ouōnh evol em-Eptshois ente nitshois: allēlouia je pefnai shop sha eneh.\n\nFēetiri enhannishti eneshfēri emmauatf: allēlouia je pefnai shop sha eneh.\n\n+ Fē-etafthamio ennifēou-i khen oukati: allēlouia je pefnai shop sha eneh.\n\nFē-etaftajro empikahi hijen nimōou: allēlouia je pefnai shop sha eneh.\n\n+ Fē-etafthamio enhannishti enreferouōini emmauatf: allēlouia je pefnai shop sha eneh.\n\nEfrē eouershishi ente pi-ehoou: allēlouia je pefnai shop sha eneh.\n\n+ Piioh nem nisiou eueksousia ente pi-ejōrh: allēlouia je pefnai shop sha eneh.\n\nFē-etafshari ena Khēmi nem noushamisi: allēlouia je pefnai shop sha eneh.\n\n+ Ouoh afini em-Pisraēl evol khen toumēti: allēlouia je pefnai shop sha eneh.\n\nKhen oujij esamahi nem oushōbsh eftshosi: allēlouia je pefnai shop sha eneh.\n\n+ Fē-etaffōrj emefiom enshari khen hanfōrj: allēlouia je pefnai shop sha eneh.\n\nOuoh afini em-Pisraēl emēr khen tefmēti: allēlouia je pefnai shop sha eneh.\n\n+ Ouoh afvorver emfara-ō nem tefjom tērs e-efiom enshari: allēlouia je pefnai shop sha eneh.\n\nFē-etafini empeflaos evol enehrēi hi epshafe: allēlouia je pefnai shop sha eneh.\n\n+ Fē-etafini enoumōou evol khen oupetra enkoh enshōt: allēlouia je pefnai shop sha eneh.\n\nFē-etafshari ehannishti enourōou: allēlouia je pefnai shop sha eneh.\n\n+ Ouoh afkhōteb enhanourōou euoi eneshfēri: allēlouia je pefnai shop sha eneh.\n\nSēōn epouro ente Ni-amorreos: allēlouia je pefnai shop sha eneh.\n\n+ Nem Ōg epouro ente eth-Vasan: allēlouia je pefnai shop sha eneh.\n\nAfti empoukahi eu-eklēronomia: allēlouia je pefnai shop sha eneh.\n\n+ Eu-eklēronomia empefvōk Pisraēl: allēlouia je pefnai shop sha eneh.\n\nEnehrēi khen penthevio aferpenmeu-i enje Eptshois: allēlouia je pefnai shop sha eneh.\n\n+ Ouoh afsotten evol khen nenjij ente nenjaji: allēlouia je pefnai shop sha eneh.\n\nFēetti ekhre ensarks niven etonkh: allēlouia je pefnai shop sha eneh.\n\n+ Ouōnh evol em-Efnouti ente etfe: allēlouia je pefnai shop sha eneh.\n\nOuōnh evol em-Eptshois ente nitshois je ou-ekhrēstos ou-agathos pe: allēlouia je pefnai shop sha eneh.',
            },
            {
              language: 'english',
              text: '+ O give thanks to the Lord for He is good, Alleluia His mercy endures forever.\n\nO give thanks to the God of gods, Alleluia His mercy endures forever.\n\n+ O give thanks to the Lord of lords, Alleluia His mercy endures forever.\n\nTo Him who alone does great wonders, Alleluia His mercy endures forever.\n\n+ To Him who by wisdom made the heavens, Alleluia His mercy endures forever.\n\nTo Him who stretched out the earth above the waters, Alleluia His mercy endures forever.\n\n+ To Him who made great lights, Alleluia His mercy endures forever.\n\nThe sun to rule by day, Alleluia His mercy endures forever.\n\n+ The moon and stars to rule by night, Alleluia His mercy endures forever.\n\nTo Him who smote Egypt in their firstborn, Alleluia His mercy endures forever.\n\n+ And brought out Israel from among them, Alleluia His mercy endures forever.\n\nWith a strong hand and with a stretched out arm, Alleluia His mercy endures forever.\n\n+ To Him who divided the Red Sea into parts, Alleluia His mercy endures forever.\n\nAnd made Israel to pass through the midst of it, Alleluia His mercy endures forever.\n\n+ But overthrew pharaoh and his hosts in the Red Sea, Alleluia His mercy endures forever.\n\nTo Him who led His people through the wilderness, Alleluia His mercy endures forever.\n\n+ To Him who retrieved water from a rock, Alleluia His mercy endures forever.\n\nTo Him who smote great kings, Alleluia His mercy endures forever.\n\n+ And slew famous kings, Alleluia His mercy endures forever.\n\nSihon the king of the Amorites, Alleluia His mercy endures forever.\n\n+ And Og the king of Bashan, Alleluia His mercy endures forever.\n\nAnd gave their lands for a heritage, Alleluia His mercy endures forever.\n\n+ A heritage unto Israel His servant, Alleluia His mercy endures forever.\n\nWho remembered us in our low estate, Alleluia His mercy endures forever.\n\n+ And has redeemed us from our enemies, Alleluia His mercy endures forever.\n\nWho gives food to all flesh, Alleluia His mercy endures forever.\n\n+ O give thanks to the God of heaven, Alleluia His mercy endures forever.\n\nO give thanks to the Lord of lords for He is good, Alleluia His mercy endures forever.',
            },
            {
              language: 'englishArabic',
              text: '+ Ushkuru er-Rabb li-annahu salih wa khayyir, halleluia li-anna ila el-abad rahmatuh.\n\nUshkuru ilah el-aliha, halleluia li-anna ila el-abad rahmatuh.\n\n+ Ushkuru Rabb el-arbab, halleluia li-anna ila el-abad rahmatuh.\n\nEs-sani\' el-\'aja\'ib el-\'izam wahdahu, halleluia li-anna ila el-abad rahmatuh.\n\n+ Alladhi khalaqa es-samawat bi-fahm, halleluia li-anna ila el-abad rahmatuh.\n\nAlladhi thabbata el-ard \'ala el-miyah, halleluia li-anna ila el-abad rahmatuh.\n\n+ Alladhi khalaqa nayyirayn \'azeemayn wahdahu, halleluia li-anna ila el-abad rahmatuh.\n\nEsh-shams li-hukm en-nahar, halleluia li-anna ila el-abad rahmatuh.\n\n+ El-qamar wan-nujoum li-hukm el-layl, halleluia li-anna ila el-abad rahmatuh.\n\nAlladhi daraba el-Misriyyeen ma\'a abkarihim, halleluia li-anna ila el-abad rahmatuh.\n\n+ Wa akhraja Isra\'eel min wasatihim, halleluia li-anna ila el-abad rahmatuh.\n\nBi-yad \'azeeza wa dhira\' \'aliya, halleluia li-anna ila el-abad rahmatuh.\n\n+ Alladhi shaqqa el-bahr el-ahmar ila aqsam, halleluia li-anna ila el-abad rahmatuh.\n\nWa ajaza Isra\'eel fi wasatihi, halleluia li-anna ila el-abad rahmatuh.\n\n+ Wa taraha Fir\'awn wa kulla quwwatihi fil-bahr el-ahmar, halleluia li-anna ila el-abad rahmatuh.\n\nAlladhi akhraja sha\'bahu ila el-barriya, halleluia li-anna ila el-abad rahmatuh.\n\n+ Alladhi akhraja ma\'an min sakhra samma\', halleluia li-anna ila el-abad rahmatuh.\n\nAlladhi daraba mulukan \'uzama\', halleluia li-anna ila el-abad rahmatuh.\n\n+ Wa qatala mulukan \'ajeebeen, halleluia li-anna ila el-abad rahmatuh.\n\nSihoun malik el-Amouriyyeen, halleluia li-anna ila el-abad rahmatuh.\n\n+ Wa \'Ouj malik Bashan, halleluia li-anna ila el-abad rahmatuh.\n\nA\'ta ardahum meerathan, halleluia li-anna ila el-abad rahmatuh.\n\n+ Meerathan li-\'abdihi Isra\'eel, halleluia li-anna ila el-abad rahmatuh.\n\nFi tawadu\'ina dhakarana er-Rabb, halleluia li-anna ila el-abad rahmatuh.\n\n+ Wa khallasana min aydi a\'da\'ina, halleluia li-anna ila el-abad rahmatuh.\n\nAlladhi yu\'ti ta\'aman li-kulli jasad hayy, halleluia li-anna ila el-abad rahmatuh.\n\n+ Ihmadu ilah es-sama\', halleluia li-anna ila el-abad rahmatuh.\n\nIhmadu Rabb el-arbab li-annahu tayyib wa salih, halleluia li-anna ila el-abad rahmatuh.',
            },
            {
              language: 'arabic',
              text: '+ أُشكروا الرب لأنه صالح وخيِّر، هلليلويا لأن إلى الأبد رحمته.\n\nأُشكروا إله الآلهة، هلليلويا لأن إلى الأبد رحمته.\n\n+ أُشكروا رب الأرباب، هلليلويا لأن إلى الأبد رحمته.\n\nالصانع العجائب العظام وحده، هلليلويا لأن إلى الأبد رحمته.\n\n+ الذي خلق السموات بفهم، هلليلويا لأن إلى الأبد رحمته.\n\nالذي ثبَّت الأرض على المياه، هلليلويا لأن إلى الأبد رحمته.\n\n+ الذي خلق نيرين عظيمين وحده، هلليلويا لأن إلى الأبد رحمته.\n\nالشمس لحكم النهار، هلليلويا لأن إلى الأبد رحمته.\n\n+ القمر والنجوم لحكم الليل، هلليلويا لأن إلى الأبد رحمته.\n\nالذي ضرب المصريين مع أبكارهم، هلليلويا لأن إلى الأبد رحمته.\n\n+ وأخرج إسرائيل من وسطهم، هلليلويا لأن إلى الأبد رحمته.\n\nبيد عزيزة وذراع عالية، هلليلويا لأن إلى الأبد رحمته.\n\n+ الذي شق البحر الأحمر إلى أقسام، هلليلويا لأن إلى الأبد رحمته.\n\nوأجاز إسرائيل في وسطه، هلليلويا لأن إلى الأبد رحمته.\n\n+ وطرح فرعون وكل قوته في البحر الأحمر، هلليلويا لأن إلى الأبد رحمته.\n\nالذي أخرج شعبه إلى البرية، هلليلويا لأن إلى الأبد رحمته.\n\n+ الذي أخرج ماء من صخرة صماء، هلليلويا لأن إلى الأبد رحمته.\n\nالذي ضرب ملوكاً عُظماء، هلليلويا لأن إلى الأبد رحمته.\n\n+ وقتل ملوكاً عجيبين، هلليلويا لأن إلى الأبد رحمته.\n\nسيحون ملك الأموريين، هلليلويا لأن إلى الأبد رحمته.\n\n+ وعوج ملك باشان، هلليلويا لأن إلى الأبد رحمته.\n\nأعطى أرضهم ميراثاً، هلليلويا لأن إلى الأبد رحمته.\n\n+ ميراثاً لعبده إسرائيل، هلليلويا لأن إلى الأبد رحمته.\n\nفي تواضعنا ذكرنا الرب، هلليلويا لأن إلى الأبد رحمته.\n\n+ وخلصنا من أيدي أعدائنا، هلليلويا لأن إلى الأبد رحمته.\n\nالذي يعطي طعاماً لكل جسد حي، هلليلويا لأن إلى الأبد رحمته.\n\n+ إحمدوا إله السماء، هلليلويا لأن إلى الأبد رحمته.\n\nإحمدوا رب الأرباب لأنه طيب وصالح، هلليلويا لأن إلى الأبد رحمته.',
            },
          ],
        },
        {
          id: 'annual-midnight-second-canticle-lobsh',
          title: 'Ⲙⲁⲣⲉⲛⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ (Lobsh of the Second Canticle)',
          versions: [
            {
              language: 'coptic',
              text: '+ Ⲙⲁⲣⲉⲛⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ: ⲙ̀Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ: ⲛⲉⲙ ⲡⲓⲓⲉⲣⲟⲯⲁⲗⲧⲏⲥ: Ⲇⲁⲩⲓⲇ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ.\n\nϪⲉ ⲁϥⲑⲁⲙⲓⲟ ⲛ̀ⲛⲓⲫⲏⲟⲩⲓ̀: ⲛⲉⲙ ⲛⲟⲩⲇⲩⲛⲁⲙⲓⲥ: ⲁϥϩⲓⲥⲉⲛϯ ⲙ̀ⲡⲓⲕⲁϩⲓ: ⲉ̀ϩ̀ⲣⲏⲓ ϩⲓϫⲉⲛ ⲛⲓⲙⲱⲟⲩ.\n\n+ Ⲛⲁⲓⲛⲓϣϯ ⲙ̀ⲫⲱⲥⲧⲏⲣ: ⲡⲓⲣⲏ ⲛⲉⲙ ⲡⲓⲓⲟϩ: ⲁϥⲭⲁⲩ ⲉⲩⲉⲣⲟⲩⲱⲓⲛⲓ: ϧⲉⲛ ⲡⲓⲥ̀ⲧⲉⲣⲉⲱ̀ⲙⲁ.\n\nⲀϥⲓ̀ⲛⲓ ⲛ̀ϩⲁⲛⲑⲏⲟⲩ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲉϥⲁ̀ϩⲱⲣ: ⲁϥⲛⲓϥⲓ ⲛ̀ⲥⲁ ⲛⲓϣ̀ϣⲏⲛ: ϣⲁ ⲛ̀ⲧⲟⲩⲫⲓⲣⲓ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲁϥϩⲱⲟⲩ ⲛ̀ⲟⲩⲙⲟⲩⲛϩⲱⲟⲩ: ϩⲓϫⲉⲛ ⲡ̀ϩⲟ ⲙ̀ⲡ̀ⲕⲁϩⲓ: ϣⲁ ⲛ̀ⲧⲉϥⲣⲱⲧ ⲉ̀ⲡ̀ϣⲱⲓ: ⲛ̀ⲧⲉϥϯ ⲙ̀ⲡⲉϥⲟⲩⲧⲁϩ.\n\nⲀϥⲓ̀ⲛⲓ ⲛ̀ⲟⲩⲙⲱⲟⲩ: ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲟⲩⲡⲉⲧⲣⲁ: ⲁϥⲧ̀ⲥⲟ ⲙ̀ⲡⲉϥⲗⲁⲟⲥ: ⲛ̀ϩ̀ⲣⲏⲓ ϩⲓ ⲡ̀ϣⲁϥⲉ.\n\n+ Ⲁϥⲑⲁⲙⲓⲟ ⲙ̀ⲡⲓⲣⲱⲙⲓ: ⲕⲁⲧⲁ ⲡⲉϥⲓ̀ⲛⲓ: ⲛⲉⲙ ⲧⲉϥϩⲓⲕⲱⲛ: ⲉⲑⲣⲉϥⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ.\n\nⲘⲁⲣⲉⲛϩⲱⲥ ⲉ̀ⲣⲟϥ: ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲡⲉϥⲣⲁⲛ: ⲧⲉⲛⲟⲩⲱⲛϩ ⲛⲁϥ ⲉ̀ⲃⲟⲗ: ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\n+ Ϩⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ: ⲛ̀ⲧⲉ ⲡⲓⲓⲉⲣⲟⲯⲁⲗⲧⲏⲥ Ⲇⲁⲩⲓⲇ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\n+ Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ ⲡ̀ⲭⲟⲣⲟⲥ ⲧⲏⲣϥ ⲛ̀ⲧⲉ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nⲔ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲁ̀ⲗⲏⲑⲱⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ (ⲁⲕⲧⲱⲛⲕ/ⲁⲕⲓ̀) ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ.',
            },
            {
              language: 'englishCoptic',
              text: '+ Marenouōnh evol: em-Pi-ekhristos Pennouti: nem piieropsaltēs: Dauid pi-eprofētēs.\n\nJe afthamio ennifēou-i: nem noudunamis: afhisenti empikahi: e-ehrēi hijen nimōou.\n\n+ Nainishti emfōstēr: pirē nem piioh: afkhau euerouōini: khen pi-estere-ōma.\n\nAfini enhanthēou: evol khen nefahōr: afnifi ensa ni-eshshēn: sha entoufiri evol.\n\n+ Afhōou enoumounhōou: hijen epho emepkahi: sha entefrōt e-epshōi: entefti empefoutah.\n\nAfini enoumōou: evol khen oupetra: afetso empeflaos: enehrēi hi epshafe.\n\n+ Afthamio empirōmi: kata pefini: nem tefhikōn: ethrefesmou erof.\n\nMarenhōs erof: tentshisi empefran: tenouōnh naf evol: je pefnai shop sha eneh.\n\n+ Hiten nieukhē: ente piieropsaltēs Dauid: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\nHiten ni-epresvia: ente Tithe-otokos ethouab Maria: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\n+ Hiten ni-epresvia: ente epkhoros tērf ente niaggelos: Eptshois ari-ehmot nan: empikhō evol ente nennovi.\n\nEkesmarōout alēthōs: nem Pekiōt enagathos: nem Pi-epneuma ethouab: je (aktōnk/aki) aksōti emmon.',
            },
            {
              language: 'english',
              text: '+ Let us give thanks, to Christ our God, with David the prophet, and psalmist.\n\nFor He has made the heavens, and all its hosts, and established the earth, on the waters.\n\n+ These two great stars, the sun and the moon, He has made to enlighten, the firmament.\n\nHe brought forth the winds, out of His treasure box, He breathed unto the trees, and they blossomed.\n\n+ He caused the rain to fall, upon the face of the earth, and it sprouted, and gave its fruit.\n\nHe brought forth water, out of a rock, and gave it to His people, in the wilderness.\n\n+ He made man, in His image, and His likeness, that he may praise Him.\n\nLet us praise Him, and exalt His name, and give thanks to Him, His mercy endures forever.\n\n+ Through the prayers, of David the psalmist, O Lord grant us, the forgiveness of our sins.\n\nThrough the intercessions, of the Mother of God Saint Mary, O Lord grant us, the forgiveness of our sins.\n\n+ Through the intercessions, of all the heavenly hosts, O Lord grant us, the forgiveness of our sins.\n\nBlessed are You indeed, with Your good Father, and the Holy Spirit, for You have (risen/come) and saved us.',
            },
            {
              language: 'englishArabic',
              text: '+ Falnashkur, el-Maseeh ilahana, ma\'a el-murattil, Dawoud en-nabi.\n\nLi-annahu khalaqa es-samawat, wa junoudaha, wa assasa el-ard, \'ala el-miyah.\n\n+ Hadhan el-kawkaban el-\'azeeman, esh-shams wal-qamar, ja\'alahuma yuneeran, fil-falak.\n\nAkhraja er-riyah, min khabayaha, nafakha fil-ashjar, hatta azharat.\n\n+ Amtara matran, \'ala wajh el-ard, hatta anbatat, wa a\'tat thamaraha.\n\nAkhraja ma\'an, min sakhra samma\', wa saqa sha\'bahu, fil-barriya.\n\n+ Sana\'a el-insan, ka-shabahihi, wa souratihi, likay yubarikahu.\n\nFalnusabbihuhu, wa narfa\' ismahu, wa nashkuruhu li-anna rahmatahu, ka\'ina ila el-abad.\n\n+ Bi-salawat, el-murattil Dawoud, ya Rabb in\'im lana, bi-maghfirat khatayana.\n\nBi-shafa\'at, walidat el-ilah, el-qiddisa Maryam, ya Rabb in\'im lana, bi-maghfirat khatayana.\n\n+ Bi-shafa\'at, kull sufouf el-mala\'ika, ya Rabb in\'im lana, bi-maghfirat khatayana.\n\nMubarakun anta bil-haqiqa, ma\'a abeeka es-saleh, war-Rooh el-Qudus, li-annaka (qumta / ataita) wa khallastana.',
            },
            {
              language: 'arabic',
              text: '+ فلنشكر، المسيح إلهنا، مع المرتل، داود النبي.\n\nلأنه خلق السموات، وجنودها، وأسَّس الأرض، على المياه.\n\n+ هذان الكوكبان العظيمان، الشمس والقمر، جعلهما ينيران، في الفلك.\n\nأخرج الرياح، من خباياها، نفخ في الأشجار، حتى أزهرت.\n\n+ أمطرا مطراً، على وجه الأرض، حتى أنبتت، وأعطت ثمرها.\n\nأخرج ماء، من صخرة صماء، وسقى شعبه، في البرية.\n\n+ صنع الإنسان، كشبهه، وصورته، لكي يباركه.\n\nفلنسبحه، ونرفع إسمه، ونشكره لأن رحمته، كائنة إلى الأبد.\n\n+ بصلوات، المرتل داود، يا رب إنعم لنا، بمغفرة خطايانا.\n\nبشفاعات، والدة الإله، القديسة مريم، يا رب إنعم لنا، بمغفرة خطايانا.\n\n+ بشفاعات، كل صفوف الملائكة، يا رب إنعم لنا، بمغفرة خطايانا.\n\nمبارك أنت بالحقيقة، مع أبيك الصالح، والروح القدس، لأنك (قُمت/أتيت) وخلصتنا.',
            },
          ],
        },
        {
          id: 'annual-midnight-third-canticle',
          title: 'Ⲕ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ (The Third Canticle)',
          versions: [
            {
              language: 'coptic',
              text: 'Ⲕ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ Ⲡ̀ϭⲟⲓⲥ Ⲫ̀ⲛⲟⲩϯ ⲛ̀ⲧⲉ ⲛⲉⲛⲓⲟϯ: ⲕ̀ⲉⲣϩⲟⲩⲟ̀ ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲕ̀ⲉⲣϩⲟⲩⲟ̀ ϭⲓⲥⲓ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲡⲓⲣⲁⲛ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲧⲉ ⲡⲉⲕⲱ̀ⲟⲩ: ϥ̀ⲉⲣϩⲟⲩⲟ̀ ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ϥ̀ⲉⲣϩⲟⲩⲟ̀ ϭⲓⲥⲓ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲔ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ϧⲉⲛ ⲡⲓⲉⲣⲫⲉⲓ ⲛ̀ⲧⲉ ⲡⲉⲕⲱ̀ⲟⲩ ⲉⲑⲟⲩⲁⲃ: ⲕ̀ⲉⲣϩⲟⲩⲟ̀ ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲕ̀ⲉⲣϩⲟⲩⲟ̀ ϭⲓⲥⲓ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲕ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲫⲏⲉⲑⲛⲁⲩ ⲉ̀ⲛⲓⲛⲟⲩⲛ ⲉϥϩⲉⲙⲥⲓ ϩⲓϫⲉⲛ Ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ: ⲕ̀ⲉⲣϩⲟⲩⲟ̀ ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲕ̀ⲉⲣϩⲟⲩⲟ̀ ϭⲓⲥⲓ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲔ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ϩⲓϫⲉⲛ ⲡⲓⲑ̀ⲣⲟⲛⲟⲥ ⲛ̀ⲧⲉ ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ: ⲕ̀ⲉⲣϩⲟⲩⲟ̀ ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲕ̀ⲉⲣϩⲟⲩⲟ̀ ϭⲓⲥⲓ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲕ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ϧⲉⲛ ⲡⲓⲥ̀ⲧⲉⲣⲉⲱ̀ⲙⲁ ⲛ̀ⲧⲉ ⲧ̀ⲫⲉ: ⲕ̀ⲉⲣϩⲟⲩⲟ̀ ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲕ̀ⲉⲣϩⲟⲩⲟ̀ ϭⲓⲥⲓ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓϩ̀ⲃⲏⲟⲩⲓ̀ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲫⲏⲟⲩⲓ̀: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲙⲱⲟⲩ ⲧⲏⲣⲟⲩ ⲉⲧⲥⲁ ⲡ̀ϣⲱⲓ ⲛ̀ⲧ̀ⲫⲉ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓϫⲟⲙ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲡⲓⲣⲏ ⲛⲉⲙ ⲡⲓⲓⲟϩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲥⲓⲟⲩ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲉ ⲧ̀ⲫⲉ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲙⲟⲩⲛϩⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲓⲱϯ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓϭⲏⲡⲓ ⲛⲉⲙ ⲛⲓⲑⲏⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲡ̀ⲛⲉⲩⲙⲁ ⲧⲏⲣⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲡⲓⲭ̀ⲣⲱⲙ ⲛⲉⲙ ⲡⲓⲕⲁⲩⲙⲁ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲡⲓⲱ̀ϫⲉⲃ ⲛⲉⲙ ⲡⲓⲕⲁⲩⲥⲱⲛ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲓⲱϯ ⲛⲉⲙ ⲛⲓⲛⲓϥⲓ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲉ̀ϫⲱⲣϩ ⲛⲉⲙ ⲛⲓⲉ̀ϩⲟⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲡⲓⲟⲩⲱⲓⲛⲓ ⲛⲉⲙ ⲡⲓⲭⲁⲕⲓ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲡⲓϫⲁϥ ⲛⲉⲙ ⲡⲓⲱ̀ϫⲉⲃ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ϯⲡⲁⲭⲛⲏ ⲛⲉⲙ ⲡⲓⲭⲓⲱⲛ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲥⲉⲧⲉⲃⲣⲏϫ ⲛⲉⲙ ⲛⲓϭⲏⲡⲓ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲡⲓⲕⲁϩⲓ ⲧⲏⲣϥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲧⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲕⲁⲗⲁⲙⲫⲱⲟⲩ ⲧⲏⲣⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲏ ⲧⲏⲣⲟⲩ ⲉⲧⲣⲏⲧ ϩⲓϫⲉⲛ ⲡ̀ϩⲟ ⲙ̀ⲡ̀ⲕⲁϩⲓ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲙⲟⲩⲙⲓ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲁ̀ⲙⲁⲓⲟⲩ ⲛⲉⲙ ⲛⲓⲓⲁⲣⲱⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲕⲏⲧⲟⲥ ⲛⲉⲙ ⲉⲛⲭⲁⲓ ⲛⲓⲃⲉⲛ ⲉⲧⲕⲓⲙ ϧⲉⲛ ⲛⲓⲙⲱⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓϩⲁⲗⲁϯ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲉ ⲧ̀ⲫⲉ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲑⲏⲣⲓⲟⲛ ⲛⲉⲙ ⲛⲓⲧⲉⲃⲛⲱⲟⲩⲓ̀ ⲧⲏⲣⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ⲛⲓⲣⲱⲙⲓ: ⲟⲩⲱϣⲧ ⲙ̀Ⲡ̀ϭⲟⲓⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ Ⲡⲓⲥⲣⲁⲏⲗ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲟⲩⲏⲃ ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲉ̀ⲃⲓⲁⲓⲕ ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲡ̀ⲛⲉⲩⲙⲁ ⲛⲉⲙ ⲛⲓⲯⲩⲭⲏ ⲛ̀ⲧⲉ ⲛⲓⲑ̀ⲙⲏⲓ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲛⲉⲙ ⲛⲏⲉⲧⲑⲉⲃⲓⲏⲟⲩⲧ ϧⲉⲛ ⲡⲟⲩϩⲏⲧ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ Ⲁ̀ⲛⲁⲛⲓⲁⲥ Ⲁ̀ⲍⲁⲣⲓⲁⲥ Ⲙⲓⲥⲁⲏⲗ ⲕⲉ Ⲇⲁⲛⲓⲏⲗ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲏⲉⲧⲉⲣⲥⲉⲃⲉⲥⲑⲉ ⲙ̀Ⲡ̀ϭⲟⲓⲥ Ⲫ̀ⲛⲟⲩϯ ⲛ̀ⲧⲉ ⲛⲉⲛⲓⲟϯ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.',
            },
            {
              language: 'englishCoptic',
              text: 'Ekesmarōout Eptshois Efnouti ente nenioti: ekerhou-o esmarōout ekerhou-o tshisi sha ni-eneh.\n\n+ Efesmarōout enje piran ethouab ente pekōou: eferhou-o esmarōout eferhou-o tshisi sha ni-eneh.\n\nEkesmarōout khen pierfei ente pekōou ethouab: ekerhou-o esmarōout ekerhou-o tshisi sha ni-eneh.\n\n+ Ekesmarōout fēethnau eninoun efhemsi hijen Nikherouvim: ekerhou-o esmarōout ekerhou-o tshisi sha ni-eneh.\n\nEkesmarōout hijen pi-ethronos ente tekmetouro: ekerhou-o esmarōout ekerhou-o tshisi sha ni-eneh.\n\n+ Ekesmarōout khen pi-estere-ōma ente etfe: ekerhou-o esmarōout ekerhou-o tshisi sha ni-eneh.\n\nEsmou e-Eptshois ni-ehvēou-i tērou ente Eptshois: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois nifēou-i: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois niaggelos tērou ente Eptshois: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois nimōou tērou etsa epshōi enetfe: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois nijom tērou ente Eptshois: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois pirē nem piioh: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois nisiou tērou ente etfe: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois nimounhōou nem niiōti: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois nitshēpi nem nithēou: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois ni-epneuma tērou: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois pi-ekhrōm nem pikauma: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois pi-ōjeb nem pikausōn: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois niiōti nem ninifi: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois ni-ejōrh nem ni-ehoou: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois piouōini nem pikhaki: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois pijaf nem pi-ōjeb: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois tipakhnē nem pikhiōn: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois nisetebrēj nem nitshēpi: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois pikahi tērf: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois nitōou nem nikalamfōou tērou: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois nē tērou etrēt hijen epho emepkahi: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois nimoumi: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois ni-amaiou nem niiarōou: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois nikētos nem enkhai niven etkim khen nimōou: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois nihalati tērou ente etfe: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois nithērion nem nitebnōou-i tērou: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois nishēri ente nirōmi: ouōsht em-Eptshois: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois Pisraēl: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois niouēb ente Eptshois: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois ni-eviaik ente Eptshois: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois ni-epneuma nem nipsukhē ente ni-ethmēi: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois nēethouab nem nēettheviēout khen pouhēt: hōs erof arihou-o tshasf sha ni-eneh.\n\nEsmou e-Eptshois Ananias Azarias Misaēl ke Daniēl: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois nēetersevesthe em-Eptshois Efnouti ente nenioti: hōs erof arihou-o tshasf sha ni-eneh.',
            },
            {
              language: 'english',
              text: 'Blessed are You O Lord God of our fathers, and exceedingly to be blessed and exalted above all forever.\n\n+ Blessed is Your holy name and Your glory, and exceedingly to be blessed and exalted above all forever.\n\nBlessed are You in the holy temple of Your glory, and exceedingly to be blessed and exalted above all forever.\n\n+ Blessed are You who beholds the depths and sits upon the Cherubim, and exceedingly to be blessed and exalted above all forever.\n\nBlessed are You on the throne of Your kingdom, and exceedingly to be blessed and exalted above all forever.\n\n+ Blessed are You in the firmament of heaven, and exceedingly to be blessed and exalted above all forever.\n\nBless the Lord O you works of the Lord, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O heaven, praise Him and exalt Him above all forever.\n\nBless the Lord all you angels of the Lord, praise Him and exalt Him above all forever.\n\n+ Bless the Lord all you waters above the heaven, praise Him and exalt Him above all forever.\n\nBless the Lord all you powers of the Lord, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O sun and moon, praise Him and exalt Him above all forever.\n\nBless the Lord all you stars of heaven, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O you rain and dew, praise Him and exalt Him above all forever.\n\nBless the Lord O you clouds and winds, praise Him and exalt Him above all forever.\n\n+ Bless the Lord all you spirits, praise Him and exalt Him above all forever.\n\nBless the Lord O fire and heat, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O cold and heat, praise Him and exalt Him above all forever.\n\nBless the Lord O you dew and winds, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O you nights and days, praise Him and exalt Him above all forever.\n\nBless the Lord O light and darkness, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O frost and cold, praise Him and exalt Him above all forever.\n\nBless the Lord O snow and ice, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O you lightnings and clouds, praise Him and exalt Him above all forever.\n\nBless the Lord all the earth, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O you mountains and all hills, praise Him and exalt Him above all forever.\n\nBless the Lord all you things that spring up on the earth, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O you fountains, praise Him and exalt Him above all forever.\n\nBless the Lord O you seas and rivers, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O you whales and all that moves in the waters, praise Him and exalt Him above all forever.\n\nBless the Lord all you birds of the sky, praise Him and exalt Him above all forever.\n\n+ Bless the Lord all you wild beasts and cattle, praise Him and exalt Him above all forever.\n\nBless the Lord O you sons of men, worship the Lord, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O Israel, praise Him and exalt Him above all forever.\n\nBless the Lord O you priests of the Lord, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O you servants of the Lord, praise Him and exalt Him above all forever.\n\nBless the Lord O you spirits and souls of the just, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O you holy and humble of heart, praise Him and exalt Him above all forever.\n\nBless the Lord O Hananiah Azariah Mishael and Daniel, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O you who worship the Lord the God of our fathers, praise Him and exalt Him above all forever.',
            },
            {
              language: 'englishArabic',
              text: 'Mubarakun anta ayyuha er-Rabb ilah aba\'ina, wa mutazayid baraka wa mutazayid \'uluwwan ila el-abad.\n\n+ Mubarakun ism majdika el-quddous, wa mutazayid baraka wa mutazayid \'uluwwan ila el-abad.\n\nMubarakun anta fi haykal majdika el-muqaddas, wa mutazayid baraka wa mutazayid \'uluwwan ila el-abad.\n\n+ Mubarakun anta ayyuha en-nazir ila el-a\'maq el-jalis \'ala esh-Sharoubim, wa mutazayid baraka wa mutazayid \'uluwwan ila el-abad.\n\nMubarakun anta \'ala \'arsh mulkika, wa mutazayid baraka wa mutazayid \'uluwwan ila el-abad.\n\n+ Mubarakun anta fi falak es-sama\', wa mutazayid baraka wa mutazayid \'uluwwan ila el-abad.\n\nBariki er-Rabb ya jamee\' a\'mal er-Rabb, sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\n+ Bariki er-Rabb ayyatuha es-samawat, sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\nBarikoo er-Rabb ya jamee\' mala\'ikat er-Rabb, sabbihouhu wa zeedouhu \'uluwwan ila el-abad.\n\n+ Bariki er-Rabb ya jamee\' el-miyah allati fawq es-sama\', sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\nBariki er-Rabb ya jamee\' quwwat er-Rabb, sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\n+ Baraka er-Rabb ayyatuha esh-shams wal-qamar, sabbihahu wa zeedahu \'uluwwan ila el-abad.\n\nBariki er-Rabb ya sa\'ir nujoum es-sama\', sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\n+ Bariki er-Rabb ayyatuha el-amtar ma\'a el-anda\', sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\nBariki er-Rabb ayyatuha es-suhub war-riyah, sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\n+ Bariki er-Rabb ya jamee\' el-arwah, sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\nBaraka er-Rabb ayyatuha en-nar wal-harara, sabbihahu wa zeedahu \'uluwwan ila el-abad.\n\n+ Baraka er-Rabb ayyuha el-bard wal-harr, sabbihahu wa zeedahu \'uluwwan ila el-abad.\n\nBariki er-Rabb ayyatuha el-ahwiya wal-anda\', sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\n+ Bariki er-Rabb ayyatuha el-layali wal-ayyam, sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\nBaraka er-Rabb ayyuha en-nour waz-zulma, sabbihahu wa zeedahu \'uluwwan ila el-abad.\n\n+ Baraka er-Rabb ayyuha el-bard was-saqee\', sabbihahu wa zeedahu \'uluwwan ila el-abad.\n\nBaraka er-Rabb ayyuha el-jaleed wath-thalj, sabbihahu wa zeedahu \'uluwwan ila el-abad.\n\n+ Bariki er-Rabb ayyatuha el-burouq was-suhub, sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\nBariki er-Rabb ayyatuha el-ard kulluha, sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\n+ Bariki er-Rabb ayyatuha el-jibal wa jamee\' el-akam, sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\nBarik er-Rabb ya jamee\' ma yanbut \'ala wajh el-ard, sabbihhu wa zidhu \'uluwwan ila el-abad.\n\n+ Bariki er-Rabb ayyatuha el-yanabee\', sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\nBariki er-Rabb ayyatuha el-bihar wal-anhar, sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\n+ Bariki er-Rabb ayyatuha el-heetan wa jamee\' ma yataharrak fil-ma\', sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\nBariki er-Rabb ya jamee\' tuyour es-sama\', sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\n+ Bariki er-Rabb ayyatuha el-wuhoush wa kull el-baha\'im, sabbiheehi wa zeedeehi \'uluwwan ila el-abad.\n\nBarikoo er-Rabb ya bani el-bashar, wa usjudu lir-Rabb, sabbihouhu wa zeedouhu \'uluwwan ila el-abad.\n\n+ Barik er-Rabb ya Isra\'eel, sabbihhu wa zidhu \'uluwwan ila el-abad.\n\nBarikoo er-Rabb ya kahanat er-Rabb, sabbihouhu wa zeedouhu \'uluwwan ila el-abad.\n\n+ Barikoo er-Rabb ya \'abeed er-Rabb, sabbihouhu wa zeedouhu \'uluwwan ila el-abad.\n\nBarikoo er-Rabb ya arwah wa anfus es-siddiqeen, sabbihouhu wa zeedouhu \'uluwwan ila el-abad.\n\n+ Barikoo er-Rabb ayyuha el-qiddisoon wal-mutawadi\'ou el-quloub, sabbihouhu wa zeedouhu \'uluwwan ila el-abad.\n\nBarikoo er-Rabb ya Hananiya wa \'Azariya wa Misa\'eel wa Daniyal, sabbihouhu wa zeedouhu \'uluwwan ila el-abad.\n\n+ Barikoo er-Rabb ya \'abidi er-Rabb ilah aba\'ina, sabbihouhu wa zeedouhu \'uluwwan ila el-abad.',
            },
            {
              language: 'arabic',
              text: 'مبارك أنت أيها الرب إله أبائنا، ومتزايد بركة ومتزايد علواً إلى الآباد.\n\n+ مبارك إسم مجدك القدوس، ومتزايد بركة ومتزايد علواً إلى الآباد.\n\nمبارك أنت في هيكل مجدك المقدس، ومتزايد بركة ومتزايد علواً إلى الآباد.\n\n+ مبارك أنت أيها الناظر إلى الأعماق الجالس على الشاروبيم، ومتزايد بركة ومتزايد علواً إلى الآباد.\n\nمبارك أنت على عرش مُلكك، ومتزايد بركة ومتزايد علواً إلى الآباد.\n\n+ مبارك أنت في فلك السماء، ومتزايد بركة ومتزايد علواً إلى الآباد.\n\nباركي الرب يا جميع أعمال الرب، سبحيه وزيديه علواً إلى الآباد.\n\n+ باركي الرب أيتها السموات، سبحيه وزيديه علواً إلى الآباد.\n\nباركوا الرب يا جميع ملائكة الرب، سبحوه وزيدوه علواً إلى الآباد.\n\n+ باركي الرب يا جميع المياه التي فوق السماء، سبحيه وزيديه علواً إلى الآباد.\n\nباركي الرب يا جميع قوات الرب، سبحيه وزيديه علواً إلى الآباد.\n\n+ باركا الرب أيتها الشمس والقمر، سبحاه وزيداه علواً إلى الآباد.\n\nباركي الرب يا سائر نجوم السماء، سبحيه وزيديه علواً إلى الآباد.\n\n+ باركي الرب أيتها الأمطار مع الأنداء، سبحيه وزيديه علواً إلى الآباد.\n\nباركي الرب أيتها السُحب والرياح، سبحيه وزيديه علواً إلى الآباد.\n\n+ باركي الرب يا جميع الأرواح، سبحيه وزيديه علواً إلى الآباد.\n\nباركا الرب أيتها النار والحرارة، سبحاه وزيداه علواً إلى الآباد.\n\n+ باركا الرب أيها البرد والحر، سبحاه وزيداه علواً إلى الآباد.\n\nباركي الرب أيتها الأهوية والأنداء، سبحيه وزيديه علواً إلى الآباد.\n\n+ باركي الرب أيتها الليالي والأيام، سبحيه وزيديه علواً إلى الآباد.\n\nباركا الرب أيها النور والظلمة، سبحاه وزيداه علواً إلى الآباد.\n\n+ باركا الرب أيها البرد والصقيع، سبحاه وزيداه علواً إلى الآباد.\n\nباركا الرب أيها الجليد والثلج، سبحاه وزيداه علواً إلى الآباد.\n\n+ باركي الرب أيتها البروق والسحب، سبحيه وزيديه علواً إلى الآباد.\n\nباركي الرب أيتها الأرض كلها، سبحيه وزيديه علواً إلى الآباد.\n\n+ باركي الرب أيتها الجبال وجميع الآكام، سبحيه وزيديه علواً إلى الآباد.\n\nبارك الرب يا جميع ما يَنبت على وجه الأرض، سبحه وزده علواً إلى الآباد.\n\n+ باركي الرب أيتها الينابيع، سبحيه وزيديه علواً إلى الآباد.\n\nباركي الرب أيتها البحار والأنهار، سبحيه وزيديه علواً إلى الآباد.\n\n+ باركي الرب أيتها الحيتان وجميع ما يتحرك في الماء، سبحيه وزيديه علواً إلى الآباد.\n\nباركي الرب يا جميع طيور السماء، سبحيه وزيديه علواً إلى الآباد.\n\n+ باركي الرب أيتها الوحوش وكل البهائم، سبحيه وزيديه علواً إلى الآباد.\n\nباركوا الرب يا بني البشر، وأُسجدوا للرب، سبحوه وزيدوه علواً إلى الآباد.\n\n+ بارك الرب يا إسرائيل، سبحه وزده علواً إلى الآباد.\n\nباركوا الرب يا كهنة الرب، سبحوه وزيدوه علواً إلى الآباد.\n\n+ باركوا الرب يا عبيد الرب، سبحوه وزيدوه علواً إلى الآباد.\n\nباركوا الرب يا أرواح وأنفس الصديقين، سبحوه وزيدوه علواً إلى الآباد.\n\n+ باركوا الرب أيها القديسون والمتواضعو القلوب، سبحوه وزيدوه علواً إلى الآباد.\n\nباركوا الرب يا حنانيا وعزاريا وميصائيل ودانيال، سبحوه وزيدوه علواً إلى الآباد.\n\n+ باركوا الرب يا عابدي الرب إله أبائنا، سبحوه وزيدوه علواً إلى الآباد.',
            },
          ],
        },
        {
          id: 'annual-midnight-esmou-epchois-melismatic',
          title: 'Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ (Esmou Epchois, Melismatic)',
          versions: [
            {
              language: 'coptic',
              text: 'Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ Ⲁ̀ⲛⲁⲛⲓⲁⲥ Ⲁ̀ⲍⲁⲣⲓⲁⲥ Ⲙⲓⲥⲁⲏⲗ ⲕⲉ Ⲇⲁⲛⲓⲏⲗ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲏⲉⲧⲉⲣⲥⲉⲃⲉⲥⲑⲉ ⲙ̀Ⲡ̀ϭⲟⲓⲥ Ⲫ̀ⲛⲟⲩϯ ⲛ̀ⲧⲉ ⲛⲉⲛⲓⲟϯ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.',
            },
            {
              language: 'englishCoptic',
              text: 'Esmou e-Eptshois Ananias Azarias Misaēl ke Daniēl: hōs erof arihou-o tshasf sha ni-eneh.\n\n+ Esmou e-Eptshois nēetersevesthe em-Eptshois Efnouti ente nenioti: hōs erof arihou-o tshasf sha ni-eneh.',
            },
            {
              language: 'english',
              text: 'Bless the Lord O Hananiah Azariah Mishael and Daniel, praise Him and exalt Him above all forever.\n\n+ Bless the Lord O you who worship the Lord the God of our fathers, praise Him and exalt Him above all forever.',
            },
            {
              language: 'englishArabic',
              text: 'Barikoo er-Rabb ya Hananiya wa \'Azariya wa Misa\'eel wa Daniyal, sabbihouhu wa zeedouhu \'uluwwan ila el-abad.\n\n+ Barikoo er-Rabb ya \'abidi er-Rabb ilah aba\'ina, sabbihouhu wa zeedouhu \'uluwwan ila el-abad.',
            },
            {
              language: 'arabic',
              text: 'باركوا الرب يا حنانيا وعزاريا وميصائيل ودانيال، سبحوه وزيدوه علواً إلى الآباد.\n\n+ باركوا الرب يا عابدي الرب إله أبائنا، سبحوه وزيدوه علواً إلى الآباد.',
            },
          ],
        },
        {
          id: 'annual-midnight-arihoo-chasf',
          title: 'Ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ (Arihoo Chasf)',
          versions: [
            {
              language: 'coptic',
              text: 'Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲏⲉⲧⲉⲣⲥⲉⲃⲉⲥⲑⲉ ⲙ̀Ⲡ̀ϭⲟⲓⲥ Ⲫ̀ⲛⲟⲩϯ ⲛ̀ⲧⲉ ⲛⲉⲛⲓⲟϯ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.',
            },
            {
              language: 'englishCoptic',
              text: 'Esmou e-Eptshois nēetersevesthe em-Eptshois Efnouti ente nenioti: hōs erof arihou-o tshasf sha ni-eneh.',
            },
            {
              language: 'english',
              text: 'Bless the Lord O you who worship the Lord the God of our fathers, praise Him and exalt Him above all forever.',
            },
            {
              language: 'englishArabic',
              text: 'Barikoo er-Rabb ya \'abidi er-Rabb ilah aba\'ina, sabbihouhu wa zeedouhu \'uluwwan ila el-abad.',
            },
            {
              language: 'arabic',
              text: 'باركوا الرب يا عابدي الرب إله أبائنا، سبحوه وزيدوه علواً إلى الآباد.',
            },
          ],
        },
        {
          id: 'annual-midnight-greek-psali-watos',
          title: 'Ⲁ̀ⲣⲓⲯⲁⲗⲓⲛ (Greek Psali, Watos)',
          versions: [
            {
              language: 'coptic',
              text: 'Ⲁ̀ⲣⲓⲯⲁⲗⲓⲛ ⲉ̀ⲫⲏⲉ̀ⲧⲁⲩⲁϣϥ: ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ ⲟⲩⲟϩ ⲁⲩⲕⲟⲥϥ: ⲁϥⲧⲱⲛϥ ⲁϥⲕⲱⲣϥ ⲙ̀ⲫ̀ⲙⲟⲩ ⲁϥϯϣⲟϣϥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\nⲂⲱϣ ⲙ̀ⲡⲓⲣⲱⲙⲓ ⲙ̀ⲡⲁⲗⲉⲟⲥ: ⲟⲩⲟϩ ϫⲱⲗϩ ⲙ̀ⲡⲓⲃⲉⲣⲓ ⲉⲩⲕ̀ⲗⲉⲟⲥ: ⲟⲩⲟϩ ⲉ̀ϧⲱⲛⲧ ⲉ̀ⲙⲉⲅⲁⲉ̀ⲗⲉⲟⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n\n+ Ⲅⲉⲛⲟⲥ ⲛ̀Ⲛⲓⲭ̀ⲣⲓⲥⲧⲓⲁⲛⲟⲥ: ⲛⲓⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ ⲕⲉ ⲇⲓⲁⲕⲟⲛⲟⲥ: ⲙⲁⲱ̀ⲟⲩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ϫⲉ ⲟⲩϩⲓⲕⲁⲛⲟⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n+ Ⲇⲉⲩⲧⲉ ϩⲁⲣⲟⲛ ⲱ̀ ⲡⲓϣⲟⲙⲧ ⲛ̀ⲁ̀ⲗⲟⲩ: ⲉ̀ⲧⲁ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲟ̀ⲗⲟⲩ: ⲁϥⲛⲁϩⲙⲟⲩ ⲉ̀ⲃⲟⲗ ϩⲁ Ⲡⲓⲇⲓⲁⲃⲟⲗⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n\nⲈⲑⲃⲉ Ⲡⲉⲕⲛⲟⲩϯ Ⲙⲁⲥⲓⲁⲥ: Ⲫ̀ⲣⲉϥϯ ⲛ̀ⲉⲩⲉⲣⲅⲉⲥⲓⲁⲥ: ⲁ̀ⲙⲟⲩ ϣⲁⲣⲟⲛ Ⲁ̀ⲛⲁⲛⲓⲁⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\nⲌⲏⲗⲱⲧⲉ Ⲁ̀ⲍⲁⲣⲓⲁⲥ: ⲉⲥⲡⲉⲣⲁⲥ ⲕⲉ ⲡ̀ⲣⲱⲓ̀ ⲕⲉ ⲙⲉⲥⲏⲙ ⲃ̀ⲣⲓⲁⲥ: ⲙⲁⲱ̀ⲟⲩ ⲛ̀ⲧ̀ϫⲟⲙ ⲛ̀Ϯⲧ̀ⲣⲓⲁⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n\n+ Ⲏⲡⲡⲉ ⲅⲁⲣ ⲓⲥ Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ: ϩⲓ ⲧⲉⲛⲙⲏϯ ⲱ̀ Ⲙⲓⲥⲁⲏⲗ: ⲗⲁⲗⲓ ϧⲉⲛ ⲟⲩⲥ̀ⲙⲏ ⲛ̀ⲑⲉⲗⲏⲗ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n+ Ⲑⲱⲟⲩϯ ϯⲛⲟⲩ ⲕⲁⲧⲁ ⲭⲓⲛ ⲧⲏⲣⲟⲩ: ⲥⲁϫⲓ ⲛⲉⲙ ⲛⲓⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲩ: ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲉϥϩ̀ⲃⲏⲟⲩⲓ̀ ⲧⲏⲣⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n\nⲒⲥ ⲛⲓⲫⲏⲟⲩⲓ̀ ⲥⲉⲥⲁϫⲓ ⲙ̀ⲡ̀ⲱ̀ⲟⲩ: ⲙ̀Ⲫ̀ⲛⲟⲩϯ ϣⲁ ⲉ̀ϧⲟⲩⲛ ⲙ̀ⲫⲟⲟⲩ: ⲱ̀ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ ⲉ̀ⲧⲁϥϫ̀ⲫⲱⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\nⲔⲉ ⲛⲩⲛ ⲇⲩⲛⲁⲙⲓⲥ ⲧⲟⲩ Ⲕⲩⲣⲓⲟⲩ: ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲉϥⲣⲁⲛ ⲧⲟⲩ ⲧⲓⲙⲓⲟⲩ: ⲡⲓⲣⲏ ⲛⲉⲙ ⲡⲓⲓⲟϩ ⲛⲉⲙ ⲛⲓⲥⲓⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n\n+ Ⲗⲟⲓⲡⲟⲛ ⲛⲓⲙⲟⲩⲛ̀ϩⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲓⲱϯ: ⲉⲩⲫⲏⲙⲓⲥⲁ ⲧⲉ Ⲡⲉⲛⲣⲉϥⲥⲱϯ: ϫⲉ ⲛ̀ⲑⲟϥ ⲡⲉ Ⲫ̀ⲛⲟⲩϯ ⲛ̀ⲧⲉ ⲛⲉⲛⲓⲟϯ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n+ Ⲙⲁⲱ̀ⲟⲩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲱ̀ ⲛⲓϭⲏⲡⲓ ⲉⲩⲙⲁ: ⲛⲓⲑⲏⲟⲩ ⲛⲉⲙ ⲛⲓⲛⲓϥⲓ ⲛⲉⲙ ⲛⲓⲡ̀ⲛⲉⲩⲙⲁ: ⲡⲓϫⲁϥ ⲛⲉⲙ ⲡⲓⲭ̀ⲣⲱⲙ ⲛⲉⲙ ⲡⲓⲕⲁⲩⲙⲁ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n\nⲚⲩⲕⲧⲉⲥ ⲕⲉ ⲏ̀ⲙⲉⲣⲉⲣⲱ ⲡⲉ: ⲫⲱⲥ ⲕⲉ ⲥ̀ⲕⲟⲧⲟⲥ ⲕⲉ ⲁⲥⲧ̀ⲣⲁⲡⲉ: ϫⲉ ⲇⲟⲝⲁ ⲥⲓ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\nⲜⲩⲗⲁ ⲕⲉ ⲡⲁⲛⲧⲁ ⲧⲁ ⲫⲩⲟ̀ⲙⲉⲛⲁ: ⲉⲛ ⲧⲏ ⲅⲏ ⲕⲉ ⲡⲁⲛⲧⲁ ⲧⲁ ⲕⲓⲛⲟⲩⲙⲉⲛⲁ: ϩⲓ ⲛⲓⲙⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲧⲱⲟⲩ ⲛⲉⲙ ⲇ̀ⲣⲩⲙⲟⲛⲁ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n\n+ Ⲟⲩⲟϩ ⲟⲛ ⲥ̀ⲙⲟⲩ ⲛ̀ⲁⲧⲭⲁⲣⲱⲟⲩ: ⲉ̀Ⲡ̀ϭⲟⲓⲥ Ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲛⲓⲟⲩⲣⲱⲟⲩ: ⲛⲓⲁ̀ⲙⲁⲓⲟⲩ ⲛⲉⲙ ⲛⲓⲓⲁⲣⲱⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n+ Ⲡⲁⲓⲣⲏϯ ⲁ̀ⲛⲟⲛ ⲧⲉⲛⲛⲁⲩ ⲉ̀ⲣⲱⲟⲩ: ⲙⲁⲣⲉⲛϫⲟⲥ ⲛⲉⲙ ⲛⲁⲓ ⲱⲛ ⲧⲏⲣⲟⲩ: ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓϩⲁⲗⲁϯ ⲧⲏⲣⲟⲩ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n\nⲢⲱ ⲛ̀ⲛⲓⲡⲁⲭⲛⲏ ⲛⲉⲙ ⲛⲓⲭⲓⲱⲛ: ⲕⲉ ⲕ̀ⲧⲏⲛⲱⲛ ⲛⲉⲙ ⲛⲓⲑⲏⲣⲓⲟⲛ: ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲧⲱⲛ ⲕⲩⲣⲓⲱⲛ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲕⲁⲧⲁ ⲫ̀ⲧⲱⲙⲓ: ⲉ̀ⲣⲟϥ ⲕⲉ ⲟⲩ ⲙⲏ ⲡⲁⲣⲁⲛⲟⲙⲓ: ⲱ̀ ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ ⲛⲓⲣⲱⲙⲓ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n\n+ Ⲧⲓⲙⲏ ⲕⲉ ⲇⲟⲝⲁ ⲱ̀ Ⲡⲓⲥⲣⲁⲏⲗ: ⲓ̀ⲛⲓ ⲛⲁϩⲣⲁϥ ϧⲉⲛ ⲟⲩⲥ̀ⲙⲏ ⲛ̀ⲑⲉⲗⲏⲗ: ⲛⲓⲟⲩⲏⲃ ⲛ̀ⲧⲉ Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n+ Ⲩ̀ⲡⲏⲣⲉⲧⲱⲛ ⲙ̀Ⲫ̀ⲛⲟⲩϯ ⲙ̀ⲙⲏⲓ: ⲛⲉⲙ ⲛⲓⲯⲩⲭⲏ ⲛ̀ⲧⲉ ⲛⲓⲑ̀ⲙⲏⲓ: ⲛⲏⲉⲧⲑⲉⲃⲓⲏⲟⲩⲧ ⲛ̀ⲣⲉϥⲙⲉⲓ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n\nⲪ̀ⲛⲟⲩϯ Ⲡⲁⲛⲟⲩϯ ⲉ̀ⲅⲱ: Ⲡⲉⲧⲉⲛⲣⲉϥⲥⲱϯ ⲉⲕ ⲧⲟⲛ ⲁ̀ⲅⲱ: Ⲥⲉⲇⲣⲁⲕ Ⲙⲓⲥⲁⲕ Ⲁⲃⲇⲉⲛⲁⲅⲱ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\nⲬⲱⲗⲉⲙ ϧⲉⲛ ⲟⲩⲛⲓϣϯ ⲛ̀ϣ̀ⲣⲱⲓⲥ: ⲱ̀ ⲛⲏⲉⲧⲉⲣⲥⲉⲃⲉⲥⲑⲉ ⲙ̀Ⲡ̀ϭⲟⲓⲥ: ⲛⲉⲙ ⲛⲓⲫⲩⲥⲓⲥ ⲧⲏⲣⲟⲩ ⲉ̀ⲧⲁϥⲁⲓⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n\n+ Ⲯⲩⲭⲟⲥ ⲕⲉ ⲁ̀ⲛⲁⲡⲁⲩⲥⲓⲥ: ⲙⲟⲓ ⲛⲁⲛ ⲧⲏⲣⲉⲛ ⲭⲱⲣⲓⲥ ⲑ̀ⲣⲁⲩⲥⲓⲥ: ⲉⲑⲣⲉⲛϫⲱ ϧⲉⲛ ⲟⲩⲁ̀ⲡⲟⲗⲁⲩⲥⲓⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.\n+ Ⲱ̀ⲥⲁⲩⲧⲱⲥ ⲡⲉⲕⲃⲱⲕ ⲡⲓⲡ̀ⲧⲱⲭⲟⲥ: Ⲥⲁⲣⲕⲓⲥ ⲁ̀ⲣⲓⲧϥ ⲉϥⲟⲓ ⲛ̀ⲉⲛⲟⲭⲟⲥ: ⲉ̀ⲥⲁϫⲓ ⲛⲉⲙ ⲛⲁⲓ ϩⲱⲥ ⲙⲉⲧⲟⲭⲟⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ.',
            },
            {
              language: 'englishCoptic',
              text: 'Aripsalin efē-etauashf: e-ehrēi ejōn ouoh aukosf: aftōnf afkōrf emefmou aftishoshf: hōs erof arihou-o tshasf.\nVōsh empirōmi empaleos: ouoh jōlh empiveri eu-ekleos: ouoh ekhōnt emega-eleos: hōs erof arihou-o tshasf.\n\n+ Genos en-Ni-ekhristianos: ni-epresvuteros ke diakonos: ma-ōou em-Eptshois je ouhikanos: hōs erof arihou-o tshasf.\n+ Deute haron ō pishomt enalou: eta Pi-ekhristos Pennouti olou: afnahmou evol ha Pidiavolou: hōs erof arihou-o tshasf.\n\nEthve Peknouti Masias: Efrefti eneuergesias: amou sharon Ananias: hōs erof arihou-o tshasf.\nZēlōte Azarias: esperas ke eprō-i ke mesēm ebrias: ma-ōou enetjom en-Ti-etrias: hōs erof arihou-o tshasf.\n\n+ Ēppe gar is Emmanouēl: hi tenmēti ō Misaēl: lali khen ou-esmē enthelēl: hōs erof arihou-o tshasf.\n+ Thōouti tinou kata khin tērou: saji nem ni-epresvuterou: esmou e-Eptshois nefehvēou-i tērou: hōs erof arihou-o tshasf.\n\nIs nifēou-i sesaji emepōou: em-Efnouti sha ekhoun emfoou: ō niaggelos etafejfōou: hōs erof arihou-o tshasf.\nKe nun dunamis tou Kuriou: esmou epefran tou timiou: pirē nem piioh nem nisiou: hōs erof arihou-o tshasf.\n\n+ Loipon nimou-enhōou nem niiōti: eufēmisa te Penrefsōti: je enthof pe Efnouti ente nenioti: hōs erof arihou-o tshasf.\n+ Ma-ōou em-Eptshois ō nitshēpi euma: nithēou nem ninifi nem ni-epneuma: pijaf nem pi-ekhrōm nem pikauma: hōs erof arihou-o tshasf.\n\nNuktes ke ēmererō pe: fōs ke eskotos ke asetrape: je doksa si Filanethrōpe: hōs erof arihou-o tshasf.\nKsula ke panta ta fu-omena: en tē gē ke panta ta kinoumena: hi nimōou nem nitōou nem edrumona: hōs erof arihou-o tshasf.\n\n+ Ouoh on esmou enatkharōou: e-Eptshois Epouro ente niourōou: ni-amaiou nem niiarōou: hōs erof arihou-o tshasf.\n+ Pairēti anon tennau erōou: marenjos nem nai ōn tērou: esmou e-Eptshois nihalati tērou: hōs erof arihou-o tshasf.\n\nRō ennipakhnē nem nikhiōn: ke ektēnōn nem nithērion: esmou e-Eptshois tōn kuriōn: hōs erof arihou-o tshasf.\nEsmou e-Eptshois kata eftōmi: erof ke ou mē paranomi: ō nishēri ente nirōmi: hōs erof arihou-o tshasf.\n\n+ Timē ke doksa ō Pisraēl: ini nahraf khen ou-esmē enthelēl: niouēb ente Emmanouēl: hōs erof arihou-o tshasf.\n+ Upēretōn em-Efnouti emmēi: nem nipsukhē ente ni-ethmēi: nēettheviēout enrefmei: hōs erof arihou-o tshasf.\n\nEfnouti Panouti egō: Petenrefsōti ek ton agō: Sedrak Misak Abdenagō: hōs erof arihou-o tshasf.\nKhōlem khen ounishti eneshrōis: ō nēetersevesthe em-Eptshois: nem nifusis tērou etafais: hōs erof arihou-o tshasf.\n\n+ Psukhos ke anapausis: moi nan tēren khōris ethrausis: ethrenjō khen ou-apolausis: hōs erof arihou-o tshasf.\n+ Ōsautōs pekvōk pi-eptōkhos: Sarkis aritf efoi enenokhos: esaji nem nai hōs metokhos: hōs erof arihou-o tshasf.',
            },
            {
              language: 'english',
              text: 'O sing unto Him who was crucified, buried and resurrected, who trampled and abolished death, praise Him and exalt Him above all.\nTake off the old man, and put on the new and superior one, come closer to greatness of mercy, praise Him and exalt Him above all.\n\n+ All you Christian people, the priests and the deacons, glorify the Lord for He is worthy, praise Him and exalt Him above all.\n+ Come to us O three children, whom Christ our God has lifted, and from the Devil has delivered, praise Him and exalt Him above all.\n\nFor the sake of your God the Messiah, the Giver of all good things, come unto us O Hananiah, praise Him and exalt Him above all.\nO Azariah the zealot, morning and noon and the evening, glorify the power of the Trinity, praise Him and exalt Him above all.\n\n+ Behold Emmanuel [our Lord], is now in our midst O Mishael, proclaim with the voice of joy, praise Him and exalt Him above all.\n+ Gather now and persevere, and proclaim with the priests, bless the Lord all His works, praise Him and exalt Him above all.\n\nThe heavens declare the glory, of God until this day, O you angels whom He has made, praise Him and exalt Him above all.\nNow all you powers of the Lord, bless His honored name, O sun and moon and all the stars, praise Him and exalt Him above all.\n\n+ And also you rain and dew, sing praises unto our Savior, for He is the God of our fathers, praise Him and exalt Him above all.\n+ Glorify the Lord O clouds and winds, together with the souls and the spirits, O you cold and fire and heat, praise Him and exalt Him above all.\n\nYou also nights and days, light and darkness and lightning, glorify the Lover of Mankind, praise Him and exalt Him above all.\nYou trees and all that springs on the earth, and all that moves in the sea, mountains and the forests, praise Him and exalt Him above all.\n\n+ Praise without ceasing, the Lord the King of the kings, O you rivers and seas, praise Him and exalt Him above all.\n+ And we also seeing them, let us say with all these things, bless the Lord all you birds, praise Him and exalt Him above all.\n\nO snow and ice, cattle and wild beasts, bless the Lord of lords, praise Him and exalt Him above all.\nBless the Lord as befits Him, and not like the heretics, all you sons of men, praise Him and exalt Him above all.\n\n+ O Israel offer before Him, honor and glory in a joyful voice, all you priests of Emmanuel, praise Him and exalt Him above all.\n+ You servants of the true God, the souls of the righteous, and the humble and the charitable, praise Him and exalt Him above all.\n\nGod my God is the One, who saved you from danger, O Sedrach Misach and Abednago, praise Him and exalt Him above all.\nHurry with great haste, O you righteous of the Lord, and all the creatures He has made, praise Him and exalt Him above all.\n\n+ Coolness and repose without ceasing, grant unto all of us, that we may joyfully proclaim, praise Him and exalt Him above all.\n+ And also Your poor servant Sarkis, make him without condemnation, that he may join all those and say, praise Him and exalt Him above all.',
            },
            {
              language: 'englishArabic',
              text: 'Rattilou lilladhi sulib \'anna, wa qubir wa qam, wa abtal el-mawt wa ahanahu, sabbihouhu wa zeedouhu \'uluwwan.\nIkhla\'ou el-insan el-\'ateeq, wa ilbasou el-jadeed el-fakhir, wa iqtaribou ila \'izam er-rahma, sabbihouhu wa zeedouhu \'uluwwan.\n\n+ Ya jins el-Maseehiyyeen, el-qusous wash-shamamisa, a\'tou majdan lir-Rabb li-annahu mustawjib, sabbihouhu wa zeedouhu \'uluwwan.\n+ Halumma ilayna ayyuha eth-thalatha fitya, alladheena rafa\'ahum el-Maseeh ilahuna, wa anqadhahum min Iblees, sabbihouhu wa zeedouhu \'uluwwan.\n\nMin ajl ilahika Masiya, el-manih el-ihsan, halumma ilayna ya Hananiya, sabbihouhu wa zeedouhu \'uluwwan.\nYa \'Azariya el-ghayour, \'ashiyya wa bukra wadh-dhaheera, a\'ti majdan li-quwwat eth-thalouth, sabbihhu wa zidhu \'uluwwan.\n\n+ Fa-ha huwadha \'Immanoueel, fi wasatina ya Misa\'eel, takallam bi-sawt et-tahleel, sabbihhu wa zidhu \'uluwwan.\n+ Ijtami\'ou wa thabirou jamee\'an, takallamou ma\'a el-qusous, wa sabbihi er-Rabb ya jamee\' a\'malihi, sabbihouhu wa zeedouhu \'uluwwan.\n\nHa es-samawat tantiq bi-majd Allah, ila hadha el-yawm, ya ayyuha el-mala\'ika alladheena ansha\'ahum, sabbihouhu wa zeedouhu \'uluwwan.\nWal-an ya quwwat er-Rabb, barikou ismahu el-kareem, ayyatuha esh-shams wal-qamar wan-nujoum, sabbiheehi wa zeedeehi \'uluwwan.\n\n+ Wa aydan ayyatuha el-amtar wal-anda\', imdahi mukhallisana, li-annahu huwa ilah aba\'ina, sabbiheehi wa zeedeehi \'uluwwan.\n+ A\'ti majdan ayyatuha es-suhub ma\'an, wal-ahwiya wan-nufous wal-arwah, wal-bard wan-nar wal-harara, sabbiheehi wa zeedhu \'uluwwan.\n\nAyyatuha el-layali wal-ayyam aydan, wan-nour waz-zulma wal-burouq, qa\'ila el-majd lak ya muhibb el-bashar, sabbihouhu wa zeedouhu \'uluwwan.\nAyyatuha el-ashjar wa jamee\' ma yanbut, fil-ard wa kull ma yataharrak, fil-miyah wal-jibal wal-ghiyad, sabbihouhu wa zeedouhu \'uluwwan.\n\n+ Wa aydan sabbihi bi-ghayr futour, er-Rabb malik el-mulouk, ayyatuha el-bihar wal-anhar, sabbiheehi wa zeedeehi \'uluwwan.\n+ Hakadha nahnu idh nanzur ilayhim, falnaqul ma\'a hadhihi el-mawjoudat jamee\'iha, bariki er-Rabb ya jamee\' et-tuyour, sabbiheehi wa zeedhu \'uluwwan.\n\nAyyuha el-jaleed wath-thalj, wal-baha\'im wal-wuhoush, bariki Rabb el-arbab, sabbiheehi wa zeedeehi \'uluwwan.\nSabbihou er-Rabb kama yaleeq bihi, wa laysa kal-mukhalifeen, ya abna\' el-bashar, sabbihouhu wa zeedouhu \'uluwwan.\n\n+ Majdan wa ikraman qaddim amamahu, ya Isra\'eel bi-sawt et-tahleel, ya kahanat \'Immanoueel, sabbihouhu wa zeedouhu \'uluwwan.\n+ Ya khuddam Allah el-haqiqi, wa anfus el-abrar, el-mutawadi\'een el-muhibbeen, sabbihouhu wa zeedouhu \'uluwwan.\n\nAllah ilahi ana, huwa mukhallisukum min el-khatar, ya Sadrak wa Meesak wa Abednagho, sabbihouhu wa zeedouhu \'uluwwan.\nAsri\'ou bi-hirs \'azeem, ya atqiya\' er-Rabb, wa kull et-taba\'i\' allati sana\'aha, sabbihouhu wa zeedouhu \'uluwwan.\n\n+ Burouda wa niyahan a\'tina, kullana bi-ghayr inqita\', li-naqoul bi-tamattu\', sabbihouhu wa zeedouhu \'uluwwan.\n+ Kadhalika \'abduka el-miskeen Sarkees, ij\'alhu bi-ghayr daynouna, li-yaqoul ma\'a ha\'ula\' ka-shareek, sabbihouhu wa zeedouhu \'uluwwan.',
            },
            {
              language: 'arabic',
              text: 'رتلوا للذي صُلب عنا، وقُبر وقام، وأبطل الموت وأهانه، سبحوه وزيدوه علواً.\nإخلعوا الإنسان العتيق، وألبسوا الجديد الفاخر، وإقتربوا إلى عِظَم الرحمة، سبحوه وزيدوه علواً.\n\n+ يا جنس المسيحيين، القسوس والشمامسة، أعطوا مجداً للرب لأنه مستوجب، سبحوه وزيدوه علواً.\n+ هَلُمَّ إلينا أيها الثلاثة فتية، الذين رفعهم المسيح إلهنا، وأنقذهم من إبليس، سبحوه وزيدوه علواً.\n\nمن أجل إلهك ماسيا، المانح الإحسان، هَلُمَّ إلينا يا حنانيا، سبحوه وزيدوه علواً.\nيا عزاريا الغيور، عشية وبكرة والظهيرة، أعط مجداً لقوة الثالوث، سبّحه وزده علواً.\n\n+ فها هوذا عمانوئيل، في وسطنا يا ميصائيل، تكلم بصوت التهليل، سبّحه وزده علواً.\n+ إجتمعوا وثابروا جميعاً، تكلموا مع القسوس، وسبحي الرب يا جميع أعماله، سبحوه وزيدوه علواً.\n\nها السموات تنطق بمجد الله، إلى هذا اليوم، يا أيها الملائكة الذين أنشأهم، سبحوه وزيدوه علواً.\nوالآن يا قوات الرب، باركوا إسمه الكريم، أيتها الشمس والقمر والنجوم، سبحيه وزيديه علواً.\n\n+ وأيضاً أيتها الأمطار والأنداء، إمدحي مخلصنا، لأنه هو إله آبائنا، سبحيه وزيديه علواً.\n+ أعطي مجداً أيتها السحب معاً، والأهوية والنفوس والأرواح، والبرد والنار والحرارة، سبحيه وزيده علوا.\n\nأيتها الليالي والأيام أيضاً، والنور والظلمة والبروق، قائلة المجد لك يا محب البشر، سبحوه وزيدوه علواً.\nأيتها الأشجار وجميع ما ينبُت، في الأرض وكل ما يتحرك، في المياه والجبال والغياض، سبحوه وزيدوه علواً.\n\n+ وأيضاً سبحي بغير فتور، الرب ملك الملوك، أيتها البحار والأنهار، سبحيه وزيديه علواً.\n+ هكذا نحن إذ ننظر إليهم، فلنقل مع هذه الموجودات جميعها، باركي الرب يا جميع الطيور، سبحيه وزيده علواً.\n\nأيها الجليد والثلج، والبهائم والوحوش، باركي رب الأرباب، سبحيه وزيديه علواً.\nسبحوا الرب كما يليق به، وليس كالمخالفين، يا أبناء البشر، سبحوه وزيدوه علواً.\n\n+ مجداً وإكراماً قدم أمامه، يا إسرائيل بصوت التهليل، يا كهنة عمانوئيل، سبحوه وزيدوه علواً.\n+ يا خدام الله الحقيقي، وأنفس الأبرار، المتواضعين المحبين، سبحوه وزيدوه علواً.\n\nالله إلهي أنا، هو مخلصكم من الخطر، يا سدراك وميساك وأبدناغو، سبحوه وزيدوه علوا.\nأسرعوا بحرص عظيم، يا أتقياء الرب، وكل الطبائع التي صنعها، سبحوه وزيدوه علواً.\n\n+ برودة ونياحاً أعطنا، كلنا بغير إنقطاع، لنقول بتمتُع، سبحوه وزيدوه علواً.\n+ كذلك عبدك المسكين سركيس، إجعله بغير دينونة، ليقول مع هؤلاء كشريك، سبحوه وزيدوه علواً.',
            },
          ],
        },
        {
          id: 'annual-midnight-three-holy-children',
          title: 'Ⲧⲉⲛⲉⲛ (The Song of the Three Holy Children)',
          versions: [
            {
              language: 'coptic',
              text: 'Ⲧⲉⲛⲉⲛ ⲟ̀ⲑⲉⲛ ⲑⲩⲥⲓⲁⲛ ⲕⲉ ⲧⲏⲛ ⲗⲟⲅⲓⲕⲏⲛ: ⲗⲁⲧⲣⲓⲁⲛ ⲁ̀ⲛⲁⲡⲉⲙⲡⲱⲙⲉⲛ: ⲥⲉⲁⲩⲧⲱ ⲥⲏⲙⲉⲣⲟⲛ ⲱ̀ⲇⲁⲥ: ⲡ̀ⲣⲟⲥ ⲇⲟⲝⲁ ⲥⲟⲩ Ⲥⲱⲧⲏⲣ ⲏ̀ⲙⲱⲛ. Ⲁ̀ⲛⲁⲛⲓⲁⲥ Ⲁ̀ⲍⲁⲣⲓⲁⲥ ⲕⲉ Ⲙⲓⲥⲁⲏⲗ.\n\nⲦⲣⲓⲟⲛ ⲡⲁⲓⲑⲟⲛ ⲛ̀ϫⲉ ⲙⲉⲗⲓⲛ ⲛⲁⲧⲟⲩ ⲡⲉⲣⲟⲥ ⲇⲟⲝⲁ ⲙ̀ⲡ̀ⲥⲁⲧⲉⲧⲟⲩ: ⲥⲱⲙⲁⲧⲟⲥ Ⲁ̀ⲅⲅⲉⲗⲟⲥ ⲅⲁⲣ ⲥⲉⲛⲁⲥⲉⲗ ⲑⲉⲇⲉ: ⲁⲩⲧⲟⲕⲓⲑⲟⲛ ⲫ̀ⲗⲓⲅⲁⲣⲧⲏⲥ: ⲉ̀ⲗⲉⲩⲥⲉⲱⲛ ⲏ̀ⲙⲱⲛ: Ⲁ̀ⲛⲁⲛⲓⲁⲥ Ⲁ̀ⲍⲁⲣⲓⲁⲥ ⲕⲉ Ⲙⲓⲥⲁⲏⲗ.\n\nⲈⲩⲗⲟⲅⲟⲛ ⲑⲁⲧⲟⲛ Ⲕⲩⲣⲓⲟⲛ ⲉ̀ⲛⲧⲟⲩ ⲛ̀ϣⲟⲙⲧ ⲉⲩϩⲉⲛ ⲑ̀ⲙⲏϯ ⲛ̀ϯϩ̀ⲣⲱ ⲙ̀ⲥⲁⲧⲉ: ⲉⲩⲱ̀ⲟⲩ ⲙ̀ⲡⲉⲙ̀ⲕⲁⲩϩ ϯⲛⲁϣ̀ϫⲉⲙϫⲟⲙ ⲉ̀ⲣⲟⲓ: Ⲡ̀ⲁⲅⲅⲉⲗⲟⲥ ⲅⲁⲣ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉϥϩⲉⲛⲧⲉ ⲟⲩⲙⲉⲧⲁϥ ⲛⲟϩⲉⲙ ⲙ̀ⲙⲱⲟⲩ ⲉⲩⲱ̀ⲟⲩ ⲙ̀ⲡⲉϥⲕⲉⲗⲉⲩ: ⲙ̀ⲡⲁⲧⲟⲩ ⲉⲛⲛⲉϥⲧⲁϩⲟ. Ⲁ̀ⲛⲁⲛⲓⲁⲥ Ⲁ̀ⲍⲁⲣⲓⲁⲥ ⲕⲉ Ⲙⲓⲥⲁⲏⲗ.\n\nⲘⲉⲛⲉⲛⲥⲁ ⲑ̀ⲣⲉ ⲛ̀ϫⲉ ⲁϥⲟⲩⲱⲛϩ ⲛ̀ⲛⲉϥⲙⲩⲥⲧⲏⲣⲓⲟⲛ: ⲉⲧⲟⲓ ⲉ̀ϯ ⲉⲛⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ: ϫⲉ ϥ̀ⲟⲩⲁⲃ Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ϥ̀ⲟⲩⲁⲃ Ⲡ̀ϣⲏⲣⲓ ⲛ̀ϫⲱⲣⲓ: ϥ̀ⲟⲩⲁⲃ Ⲡ̀ϣⲏⲣⲓ ⲙ̀ⲡⲉϥⲛⲁⲩ ⲙ̀ⲙⲁⲩⲁⲧϥ ⲡⲉ ⲡⲉϥϩⲟⲛϩⲉⲛ: ⲛⲁϩ ⲛ̀ϩ̀ⲙⲟⲧ ϣⲁⲛⲁϩ̀ⲑⲏⲕ ⲛ̀ⲅ̀ⲛⲟⲛ ⲁⲛ. Ⲁ̀ⲛⲁⲛⲓⲁⲥ Ⲁ̀ⲍⲁⲣⲓⲁⲥ ⲕⲉ Ⲙⲓⲥⲁⲏⲗ.\n\nⲈⲩϩⲱⲥ ⲉⲩⲥ̀ⲙⲟⲩ ⲉ̀Ⲫ̀ⲛⲟⲩϯ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.',
            },
            {
              language: 'englishCoptic',
              text: 'Tenen othen thusian ke tēn logikēn: latrian anapempōmen: seautō sēmeron ōdas: epros doksa sou Sōtēr ēmōn. Ananias Azarias ke Misaēl.\n\nTrion paithon enje melin natou peros doksa emepsatetou: sōmatos Aggelos gar senasel thede: autokithon efligartēs: eleuseōn ēmōn: Ananias Azarias ke Misaēl.\n\nEulogon thaton Kurion entou enshomt euhen ethmēti enti-ehrō emsate: eu-ōou empe-emkauh tina-eshjemjom eroi: Epaggelos gar em-Eptshois efhente oumetaf nohem emmōou eu-ōou empefkeleu: empatou enneftaho. Ananias Azarias ke Misaēl.\n\nMenensa ethre enje afouōnh ennefmustērion: etoi eti enōsh evol enjō emmos: je efouab Epshēri em-Efnouti: efouab Epshēri enjōri: efouab Epshēri empefnau emmauatf pe pefhonhen: nah enehmot shana-ehthēk enegnon an. Ananias Azarias ke Misaēl.\n\nEuhōs eu-esmou e-Efnouti ensēou niven.',
            },
            {
              language: 'english',
              text: 'We therefore present an offering and rational worship; We send unto you this day psalmodies for Your glory O our Savior. Hananiah Azariah and Mishael.\n\nWhen they were raised to take glory in their bodies, an Angel came down, stopped the fire and made it cool for Hananiah Azariah and Mishael.\n\nThey bless the Lord - the three in the midst of the fiery furnace, and the fire did not overcome them for the angel of the Lord was in their midst; He saved them and He did not leave any evil to reach them; Hananiah Azariah and Mishael.\n\nAfterward, we partake from His holy mysteries, proclaiming and saying, “Holy God, Holy Mighty, Holy Immortal, who gave us his grace,” have compassion on our ignorance. Hananiah Azariah and Mishael.\n\nThey praise and glorify God at all times.',
            },
            {
              language: 'englishArabic',
              text: 'Fa-min thamma nuqaddim edh-dhabeeha wal-\'ibada el-\'aqliya. Wa nursil lak fi hadha el-yawm et-tasabeeh lada majdika ya mukhallisana. Hananiya wa \'Azariya wa Misa\'eel.\n\nLamma rufi\'u li-ya\'khudhu el-majd fi ajsadihim inhadara malak wa atfa\'a el-laheeb wa sayyarahu baridan \'an Hananiya wa \'Azariya wa Misa\'eel.\n\nKanu yubarikoon er-Rabb eth-thalatha. Idh hum fi wasat el-atoun el-mutawaqqid. Wa lam yaqwa \'alayhim el-hareeq. Li-anna malak er-Rabb kana fi wasatihim wa khallasahum. Wa lam yada\' shay\'an min esh-sharr yudrikuhum Hananiya wa \'Azariya wa Misa\'eel.\n\nWa min ba\'d an nanal min asrarihi el-muqaddasa nasrukh qa\'ileen: Quddous Allah. Quddous el-qawi. Quddous alladhi huwa wahdahu ghayr ma\'it. Alladhi a\'tana in\'amahu wa tahannan \'ala \'adam ma\'rifatina Hananiya wa \'Azariya wa Misa\'eel.\n\nYusabbihoon wa yubarikoon Allah fi kulli heen.',
            },
            {
              language: 'arabic',
              text: 'فمن ثم نقدم الذبيحة والعبادة العقلية. ونرسل لك في هذا اليوم التسابيح لدى مجدك يا مخلصنا. حنانيا وعزاريا وميصائيل.\n\nلما رُفعوا ليأخذوا المجد في أجسادهم إنحدر ملاك وأطفأ اللهيب وصيره بارداً عن حنانيا وعزاريا وميصائيل.\n\nكانوا يباركون الرب الثلاثة. اذهم في وسط الأتون المتوقد. ولم يقو عليهم الحريق. لأن ملاك الرب كان في وسطهم وخلصهم. ولم يدع شيئاً من الشر يدركهم حنانيا وعزاريا وميصائيل.\n\nومن بعد أن ننال من اسراره المقدسة نصرخ قائلين: قدوس الله. قدوس القوي. قدوس الذي هو وحده غير مائت. الذي اعطانا انعامه وتحنن علي عدم معرفتنا حنانيا وعزاريا وميصائيل.\n\nيسبحون ويباركون الله فى كل حين.',
            },
          ],
        },
        {
          id: 'annual-midnight-psali-watos-three-holy-youth',
          title: 'Ⲧⲉⲛⲟⲩⲉϩ ⲛ̀ⲥⲱⲕ (Watos Psali for the Three Holy Youth)',
          versions: [
            {
              language: 'coptic',
              text: 'Ⲧⲉⲛⲟⲩⲉϩ ⲛ̀ⲥⲱⲕ ϧⲉⲛ ⲡⲉⲛϩⲏⲧ ⲧⲏⲣϥ: ⲧⲉⲛⲉⲣϩⲟϯ ϧⲁⲧⲉⲕϩⲏ: ⲟⲩⲟϩ ⲧⲉⲛⲕⲱϯ ⲛ̀ⲥⲁ ⲡⲉⲕϩⲟ: Ⲫ̀ⲛⲟⲩϯ ⲙ̀ⲡⲉⲣϯϣⲓⲡⲓ ⲛⲁⲛ.\n\n+ Ⲁⲗⲗⲁ ⲁ̀ⲣⲓⲟⲩⲓ̀ ⲛⲉⲙⲁⲛ: ⲕⲁⲧⲁ ⲧⲉⲕⲙⲉⲧⲉ̀ⲡⲓⲕⲏⲥ: ⲛⲉⲙ ⲕⲁⲧⲁ ⲡ̀ⲁ̀ϣⲁⲓ ⲛ̀ⲧⲉ ⲡⲉⲕⲛⲁⲓ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲛ.\n\nⲘⲁⲣⲉ ⲧⲉⲛⲡ̀ⲣⲟⲥⲉⲩⲭⲏ Ⲡⲉⲛⲛⲏⲃ: ⲓ̀ ⲉ̀ⲡ̀ϣⲱⲓ ⲙ̀ⲡⲉⲕⲙ̀ⲑⲟ: ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ϩⲁⲛϭⲗⲓⲗ ⲛ̀ⲧⲉ ϩⲁⲛⲱⲓⲗⲓ: ⲛⲉⲙ ϩⲁⲛⲙⲁⲥⲓ ⲉⲩⲕⲉⲛⲓⲱ̀ⲟⲩⲧ.\n\n+ Ⲙ̀ⲡⲉⲣⲉⲣⲡⲱⲃϣ ⲛ̀ϯⲇⲓⲁⲑⲏⲕⲏ: ⲑⲏⲉ̀ⲧⲁⲕⲥⲉⲙⲛⲏⲧⲥ ⲛⲉⲙ ⲛⲉⲛⲓⲟϯ: Ⲁⲃⲣⲁⲁⲙ Ⲓ̀ⲥⲁⲁⲕ Ⲓⲁⲕⲱⲃ: Ⲡⲓⲥⲣⲁⲏⲗ ⲡⲉⲉⲑⲟⲩⲁⲃ ⲛ̀ⲧⲁⲕ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲛⲓⲗⲁⲟⲥ ⲧⲏⲣⲟⲩ: ⲛⲓⲫⲩⲗⲏ ⲛⲓⲁⲥⲡⲓ ⲛ̀ⲗⲁⲥ: ϩⲱⲥ ⲉ̀ⲣⲟϥ ⲙⲁⲱ̀ⲟⲩ ⲛⲁϥ: ⲁ̀ⲣⲓϩⲟⲩⲟ̀ ϭⲁⲥϥ ϣⲁ ⲛⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓϣⲟⲙⲧ ⲛ̀ⲁ̀ⲗⲟⲩ ⲛ̀ⲁ̀ⲅⲓⲟⲥ: Ⲥⲉⲇⲣⲁⲕ Ⲙⲓⲥⲁⲕ Ⲁⲃⲇⲉⲛⲁⲅⲱ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
            },
            {
              language: 'englishCoptic',
              text: 'Tenoueh ensōk khen penhēt tērf: tenerhoti khatekhē: ouoh tenkōti ensa pekho: Efnouti empertishipi nan.\n\n+ Alla ariou-i neman: kata tekmetepikēs: nem kata epashai ente peknai: Eptshois arivo-ēthin eron.\n\nMare teneproseukhē Pennēb: i e-epshōi empekemtho: emefrēti enhantshlil ente hanōili: nem hanmasi eukeni-ōout.\n\n+ Empererpōbsh entidiathēkē: thē-etaksemnēts nem nenioti: Abraam Isaak Iakōb: Pisraēl peethouab entak.\n\nEsmou e-Eptshois nilaos tērou: nifulē niaspi enlas: hōs erof ma-ōou naf: arihou-o tshasf sha ni-eneh.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: ō pishomt enalou enagios: Sedrak Misak Abdenagō: entefkha nennovi nan evol.',
            },
            {
              language: 'english',
              text: 'We follow You with all our hearts, and fear You, and we seek Your face, O God do not forsake us.\n\n+ But rather deal with us, according to Your meekness, and according to Your great mercy, O Lord help us.\n\nMay our prayers ascend to You, O our Master, like burnt offerings of lambs, and fat calves.\n\n+ Do not forget the covenant, which You have made with our fathers, Abraham Isaac and Jacob, Israel Your saint.\n\nBless the Lord all you nations, the tribes and all kinds of tongues, praise Him and glorify Him, above all forever.\n\n+ Pray to the Lord on our behalf, O three saintly children, Sedrach Misach and Abednego, that He may forgive us our sins.',
            },
            {
              language: 'englishArabic',
              text: 'Natba\'uka bi-kulli quloubina, wa nakhafuka, wa natlub wajhaka, ya Allah la tukhzina.\n\n+ Bal isna\' ma\'ana, bi-hasab da\'atika, wa kathrat rahmatika, ya Rabb a\'inna.\n\nFaltas\'ad salatuna, amamaka ya sayyidana, mithl muhraqat kibash, wa \'ujoul siman.\n\n+ La tansa el-\'ahd alladhi, qata\'tahu ma\'a aba\'ina, Ibraheem wa Ishaq wa Ya\'qoub, Isra\'eel qiddisak.\n\nBarikou er-Rabb ya jamee\' esh-shu\'oub, wal-qaba\'il wa lughat el-alsun, sabbihouhu wa majjidouhu, wa zeedouhu \'uluwwan ila el-abad.\n\n+ Utlubu min er-Rabb \'anna, ayyuha eth-thalatha fitya el-qiddiseen, Sadrak wa Meesak wa Abednagho, li-yaghfir lana khatayana.',
            },
            {
              language: 'arabic',
              text: 'نتبعك بكل قلوبنا، ونخافك، ونطلب وجهك، يا الله لا تخزنا.\n\n+ بل إصنع معنا، بحسب دعتك، وكثرة رحمتك، يا رب أعنَّا.\n\nفلتصعد صلاتنا، أمامك يا سيدنا، مثل محرقات كباش، وعجول سِمان.\n\n+ لا تنس العهد الذي، قطعته مع آبائنا، إبراهيم وإسحق ويعقوب، إسرائيل قديسك.\n\nباركوا الرب يا جميع الشعوب، والقبائل ولغات الألسن، سبحوه ومجدوه، وزيدوه علواً إلى الآباد.\n\n+ أُطلبوا من الرب عنا، أيها الثلاثة فتية القديسين، سدراك وميساك وأبدناغو، ليغفر لنا خطايانا.',
            },
          ],
        },
        {
          id: 'annual-midnight-commemoration',
          title: 'Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ (The Commemoration of the Saints)',
          versions: [
            {
              language: 'coptic',
              text: 'Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲧⲉⲛϭⲟⲓⲥ ⲛ̀ⲛⲏⲃ ⲧⲏⲣⲉⲛ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ: Ⲙⲁⲣⲓⲁ Ⲑ̀ⲙⲁⲩ ⲙ̀Ⲡⲉⲛⲥⲱⲧⲏⲣ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲓⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ: Ⲙⲓⲭⲁⲏⲗ ⲛⲉⲙ Ⲅⲁⲃⲣⲓⲏⲗ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲀ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲓⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ: Ⲣⲁⲫⲁⲏⲗ ⲛⲉⲙ Ⲥⲟⲩⲣⲓⲏⲗ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲓⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ: Ⲥⲉⲇⲁⲕⲓⲏⲗ Ⲥⲁⲣⲁⲑⲓⲏⲗ ⲛⲉⲙ Ⲁ̀ⲛⲁⲛⲓⲏⲗ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲀ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲑ̀ⲣⲟⲛⲟⲥ ⲛⲓⲙⲉⲧϭⲟⲓⲥ ⲛⲓϫⲟⲙ: Ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ ⲛⲉⲙ Ⲛⲓⲥⲉⲣⲁⲫⲓⲙ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲓϥ̀ⲧⲟⲟⲩ ⲛ̀ⲍⲱⲟⲛ ⲛ̀ⲁ̀ⲥⲱⲙⲁⲧⲟⲥ: ⲛ̀ⲗⲓⲧⲟⲩⲣⲅⲟⲥ ⲛ̀ϣⲁϩ ⲛ̀ⲭ̀ⲣⲱⲙ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲀ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲟⲩⲏⲃ ⲛ̀ⲧⲉ ϯⲙⲉⲑⲙⲏⲓ: ⲡⲓϫⲟⲩⲧ ϥ̀ⲧⲟⲟⲩ ⲙ̀ⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲥ̀ⲧ̀ⲣⲁⲧⲓⲁ ⲛ̀ⲁⲅⲅⲉⲗⲓⲕⲟⲛ: ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲙ̀ⲡⲁⲧⲣⲓⲁⲭⲏⲥ: Ⲁⲃⲣⲁⲁⲙ Ⲓ̀ⲥⲁⲁⲕ Ⲓⲁⲕⲱⲃ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲣⲱⲙⲓ ⲛ̀ⲧⲉⲗⲓⲟⲥ: ⲡⲓⲑ̀ⲙⲏⲓ Ⲉ̀ⲛⲱⲭ ⲡⲓⲇⲓⲕⲉⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲏⲗⲓⲁⲥ ⲡⲓⲑⲉⲥⲃⲓⲧⲏⲥ: ⲛⲉⲙ Ⲉ̀ⲗⲓⲥⲉⲟⲥ ⲡⲉϥⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ Ⲙⲱⲩ̀ⲥⲏⲥ ⲡⲓⲁⲣⲭⲏⲡ̀ⲣⲟⲫⲏⲧⲏⲥ: ⲛⲉⲙ Ⲏ̀ⲥⲁⲏ̀ⲁⲥ ⲛⲉⲙ Ⲓⲉⲣⲙⲓⲁⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲇⲁⲩⲓⲇ ⲡⲓⲓⲉⲣⲟⲯⲁⲗⲧⲓⲥ: ⲛⲉⲙ Ⲓⲉⲍⲉⲕⲓⲏⲗ ⲛⲉⲙ Ⲇⲁⲛⲓⲏⲗ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲓⲱⲁⲕⲓⲙ ⲛⲉⲙ Ⲁⲛⲛⲁ ⲛⲉⲙ Ⲓⲱⲥⲏⲫ ⲡⲓⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ: ⲛⲉⲙ ⲡⲓⲑ̀ⲙⲏⲓ Ⲓⲱⲃ ⲛⲉⲙ Ⲓⲱⲥⲏⲫ ⲛⲉⲙ Ⲛⲓⲕⲟⲩⲇⲓⲙⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲙⲉⲗⲭⲓⲥⲉⲇⲉⲕ ⲛⲉⲙ Ⲁ̀ⲁ̀ⲣⲱⲛ: ⲛⲉⲙ Ⲍⲁⲭⲁⲣⲓⲁⲥ ⲛⲉⲙ Ⲥⲩⲙⲉⲱⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲭⲟⲣⲟⲥ ⲛ̀ⲧⲉ ⲛⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ: ⲛⲉⲙ ⲛⲓⲑ̀ⲙⲏⲓ ⲛⲉⲙ ⲛⲓⲇⲓⲕⲉⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲀ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲡ̀ⲣⲟⲇⲣⲟⲙⲟⲥ ⲙ̀ⲃⲁⲡⲧⲓⲥⲧⲏⲥ: Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲓⲣⲉϥϯⲱⲙⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓϣⲉ ϩ̀ⲙⲉ ϥ̀ⲧⲟⲟⲩ ⲛ̀ϣⲟ: ⲛⲉⲙ ⲡⲓⲡⲁⲣⲑⲉⲛⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛⲉⲙ ⲡ̀ⲥⲉⲡⲓ ⲛ̀ⲧⲉ ⲛⲓⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲓⲁⲣⲭⲏⲇⲓⲁⲕⲱⲛ ⲉⲧⲥ̀ⲙⲁⲣⲱⲟⲩⲧ: Ⲥ̀ⲧⲉⲫⲁⲛⲟⲥ ⲡⲓϣⲟⲣⲡ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲓⲑⲉⲱ̀ⲣⲓⲙⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: ⲡⲁϭⲟⲓⲥ ⲡ̀ⲟⲩⲣⲟ Ⲅⲉⲱⲣⲅⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲑⲉⲱ̀ⲇⲟⲣⲟⲥ ⲛⲉⲙ Ⲑⲉⲱ̀ⲇⲟⲣⲟⲥ: ⲛⲉⲙ Ⲗⲉⲟⲛⲧⲓⲟⲥ ⲛⲉⲙ Ⲡⲁⲛⲓⲕⲁⲣⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: ⲛⲉⲙ ⲁ̀ⲡⲁ Ⲙⲏⲛⲁ ⲛⲉⲙ ⲁ̀ⲡⲁ Ⲃⲓⲕⲧⲱⲣ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲕⲩⲣⲓ Ⲕ̀ⲗⲁⲩⲇⲓⲟⲥ ⲛⲉⲙ Ⲑⲉⲱ̀ⲇⲟⲣⲟⲥ: ⲛⲉⲙ ⲁ̀ⲡⲁ Ⲥ̀ⲭⲏⲣⲟⲛ ⲛⲉⲙ ⲁ̀ⲡⲁ Ⲓ̀ⲥⲁⲁⲕ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲃⲁⲥⲓⲗⲓⲧⲏⲥ ⲛⲉⲙ Ⲉⲩⲥⲉⲃⲓⲟⲥ: ⲛⲉⲙ Ⲙⲁⲕⲁⲣⲓⲟⲥ ⲛⲉⲙ Ⲫⲓⲗⲟⲑⲉⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ⲡⲓⲥⲟⲩⲣⲁ ⲛⲉⲙ ⲁ̀ⲡⲁ Ⲡ̀ϣⲱⲓ: ⲛⲉⲙ ⲁ̀ⲡⲁ Ⲏ̀ⲥⲓ ⲛⲉⲙ Ⲑⲉⲕⲗⲁ ⲧⲉϥⲥⲱⲛⲓ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲓⲟⲩⲥⲧⲟⲩⲥ ⲛⲉⲙ Ⲁ̀ⲡⲁⲗⲓ ⲛⲉⲙ Ⲑⲉⲟⲕⲗⲓⲁ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ⲓⲁⲕⲱⲃⲟⲥ ⲡⲓϥⲉⲣⲥⲓⲥ: ⲛⲉⲙ ⲡⲓⲁ̀ⲅⲓⲟⲥ Ⲥⲉⲣⲅⲓⲟⲥ ⲛⲉⲙ Ⲃⲁⲭⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲕⲟⲥⲙⲁ ⲛⲉⲙ ⲛⲉϥⲥ̀ⲛⲏⲟⲩ ⲛⲉⲙ ⲧⲟⲩⲙⲁⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁ̀ⲡⲁ Ⲕⲓⲣ ⲛⲉⲙ Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲉϥⲥⲟⲛ: ⲛⲉⲙ Ⲃⲁⲣⲃⲁⲣⲁ ⲛⲉⲙ Ⲓⲟⲩⲗⲓⲁⲛⲏ ⲛⲉⲙ Ⲇⲩⲙⲓⲁⲛⲏ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: ⲕⲩⲣⲓ Ⲁ̀ⲡⲁⲧⲏⲣ ⲛⲉⲙ Ⲏ̀ⲣⲁⲏ̀ ⲧⲉϥⲥⲱⲛⲓ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲓⲟⲩⲗⲓⲟⲥ ⲛⲉⲙ ⲛⲏⲉⲑⲛⲉⲙⲁϥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲙⲁⲣⲓ Ⲡⲁϩⲛⲁⲙ ⲛⲉⲙ Ⲥⲁⲣⲣⲁ ⲧⲉϥⲥⲱⲛⲓ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ⲥⲁⲣⲁⲡⲁⲙⲱⲛ ⲡⲓⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ: ⲛⲉⲙ Ⲯⲁⲧⲉ ⲛⲉⲙ Ⲅⲁⲗⲗⲓⲛⲓⲕⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: ⲡⲓϩ̀ⲙⲉ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲧⲉ Ⲥⲉⲃⲁⲥⲧⲉ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ⲡⲓⲣⲱⲟⲩ ⲛⲉⲙ Ⲁ̀ⲑⲱⲙ: ⲛⲉⲙ Ⲓⲱⲁⲛⲛⲏⲥ ⲛⲉⲙ Ⲥⲩⲙⲉⲱⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: ⲁ̀ⲡⲁ Ⲡⲓϣⲱⲓ ⲛⲉⲙ ⲡⲉϥϣ̀ⲫⲏⲣ Ⲡⲉⲧⲣⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁ̀ⲡⲁ Ⲕ̀ⲗⲟϫ ⲡⲓⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ: ⲛⲉⲙ ⲁ̀ⲡⲁ Ⲡ̀ϫⲟⲗ ⲛⲉⲙ ⲁ̀ⲡⲁ Ⲕⲁⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁ̀ⲡⲁ Ⲓⲱⲁⲛⲛⲏⲥ Ⲡⲓⲣⲉⲙϩⲁⲣⲁⲕⲗⲓⲁ: ⲛⲉⲙ ⲕⲩⲣⲓⲉ Ⲡⲓⲫⲁⲙⲱⲛ ⲛⲉⲙ Ⲡⲓⲥⲧⲁⲩⲣⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲏ̀ⲥⲓⲇⲱⲣⲟⲥ ⲛⲉⲙ Ⲡⲁⲛⲧⲉⲗⲉⲟⲛ: Ⲥⲟⲫⲓⲁ ⲛⲉⲙ Ⲉⲩⲫⲟⲙⲓⲁ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲕⲩⲣⲓ Ⲁ̀ⲡⲁⲛⲟⲩⲃ ⲛⲉⲙ Ⲡ̀ⲑⲟⲗⲟⲙⲉⲟⲥ: ⲛⲉⲙ ⲁ̀ⲡⲁ Ⲕ̀ⲣⲁⲅⲟⲛ ⲛⲉⲙ Ⲥⲟⲩⲥⲉⲛⲛⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲛⲓϣϯ ⲛ̀ⲁⲣⲭⲏⲉ̀ⲣⲉⲩⲥ: ⲁⲃⲃⲁ Ⲡⲉⲧⲣⲟⲥ ⲓⲉⲣⲟⲙⲁⲣⲧⲩⲣⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲓⲃⲉⲣⲓ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲡⲓⲥⲧⲁⲩⲣⲟⲥ ⲛⲉⲙ Ⲁⲣⲥⲉⲛⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ Ⲙⲓⲭⲁⲏⲗ ⲡⲓϩⲏⲅⲟⲩⲙⲉⲛⲟⲥ: ⲛⲉⲙ Ⲙⲓⲭⲁⲏⲗ ⲡⲓⲙⲟⲛⲁⲭⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲭⲟⲣⲟⲥ ⲛ̀ⲧⲉ ⲛⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲉ̀ⲧⲁⲩϣⲉⲡⲙ̀ⲕⲁϩ ⲉⲑⲃⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲙ̀ⲙⲁⲓⲛⲟⲩϣⲏⲣⲓ: ⲁⲃⲃⲁ Ⲁⲛⲧⲱⲛⲓⲟⲥ ⲛⲉⲙ ⲁⲃⲃⲁ Ⲡⲁⲩⲗⲉ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲓϣⲟⲙⲧ ⲉⲑⲟⲩⲁⲃ ⲁⲃⲃⲁ Ⲙⲁⲕⲁⲣⲓ: ⲛⲉⲙ ⲛⲟⲩϣⲏⲣⲓ ⲛ̀ⲥ̀ⲧⲁⲩⲣⲟⲫⲟⲣⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ϩⲏⲅⲟⲩⲙⲉⲛⲟⲥ: ⲁⲃⲃⲁ Ⲓⲱⲁⲛⲛⲏⲥ ⲛⲉⲙ ⲁⲃⲃⲁ Ⲇⲁⲛⲓⲏⲗ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲙ̀ⲙⲁⲓⲛⲟⲩϣⲏⲣⲓ: ⲁⲃⲃⲁ Ⲡⲓϣⲱⲓ ⲛⲉⲙ ⲁⲃⲃⲁ Ⲡⲁⲩⲗⲉ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲉⲛⲓⲟϯ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲣⲱⲙⲉⲟⲥ: Ⲙⲁⲝⲓⲙⲟⲥ ⲛⲉⲙ Ⲇⲟⲙⲉⲧⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲓϩ̀ⲙⲉ ⲯⲓⲧ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: ⲛⲓϧⲉⲗⲗⲟⲓ ⲛ̀ⲧⲉ Ϣⲓϩⲏⲧ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲓϫⲱⲣⲓ ⲉⲑⲟⲩⲁⲃ ⲁⲃⲃⲁ Ⲙⲱⲥⲏ: ⲛⲉⲙ Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲓⲭⲁⲙⲏ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ⲡⲁϧⲱⲙ ⲫⲁ ϯⲕⲟⲓⲛⲱⲛⲓⲁ: ⲛⲉⲙ Ⲑⲉⲱ̀ⲇⲟⲣⲟⲥ ⲡⲉϥⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ϣⲉⲛⲟⲩϯ ⲡⲓⲁⲣⲭⲏⲙⲁⲛⲇ̀ⲣⲓⲧⲏⲥ: ⲛⲉⲙ ⲁⲃⲃⲁ Ⲃⲏⲥⲁ ⲡⲉϥⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ⲛⲟⲩϥⲉⲣ ⲛⲉⲙ ⲁⲃⲃⲁ Ⲕⲁⲣⲟⲥ: ⲛⲉⲙ ⲡⲉⲛⲓⲱⲧ Ⲡⲁⲫⲛⲟⲩⲧⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ⲥⲁⲙⲟⲩⲏⲗ ⲡⲓⲟ̀ⲙⲟⲗⲟⲅⲓⲧⲏⲥ: ⲛⲉⲙ Ⲓⲟⲩⲥⲧⲟⲥ ⲛⲉⲙ Ⲁ̀ⲡⲟⲗⲗⲟ ⲡⲉϥⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ⲁ̀ⲡⲟⲗⲗⲟ ⲛⲉⲙ ⲁⲃⲃⲁ Ⲁ̀ⲡⲓⲡ: ⲛⲉⲙ ⲡⲉⲛⲓⲱⲧ ⲁⲃⲃⲁ Ⲡⲓϫⲓⲙⲓ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ⲉⲩⲕⲓⲛ ⲛⲉⲙ ⲁⲃⲃⲁ Ϩ̀ⲣⲟⲛ: ⲛⲉⲙ ⲁ̀ⲡⲁ Ϩⲱⲣ ⲛⲉⲙ ⲁ̀ⲡⲁ Ⲫⲓⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ⲡⲁⲣⲥⲱⲙⲁ ⲛⲉⲙ Ⲉⲫⲣⲉⲙ: ⲛⲉⲙ Ⲓⲱⲁⲛⲛⲏⲥ ⲛⲉⲙ Ⲥⲩⲙⲉⲱⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲉ̀ⲡⲓⲫⲁⲛⲟⲥ ⲛⲉⲙ Ⲁ̀ⲙⲱⲛⲓⲟⲥ: ⲛⲉⲙ Ⲁⲣⲭⲏⲗⲗⲓⲧⲏⲥ ⲛⲉⲙ Ⲁⲣⲥⲉⲛⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁⲥⲕⲏⲧⲏⲥ: ⲁⲃⲃⲁ Ⲁⲃⲣⲁⲁⲙ ⲛⲉⲙ Ⲅⲉⲱⲣⲅⲏ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲁ̀ⲑⲁⲛⲁⲥⲓⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲓⲕⲟⲥ: Ⲥⲉⲩⲏⲣⲟⲥ ⲛⲉⲙ Ⲇⲓⲟⲥⲕⲟⲣⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲃⲁⲥⲓⲗⲓⲟⲥ ⲛⲉⲙ Ⲅ̀ⲣⲓⲅⲟⲣⲓⲟⲥ: ⲛⲉⲙ ⲡⲉⲛⲓⲱⲧ ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲓϣⲟⲙⲧ ϣⲉ ⲙⲏⲧϣ̀ⲙⲏⲛ ⲉ̀ⲧⲁⲩⲑⲱⲟⲩϯ: ϧⲉⲛ Ⲛⲓⲕⲉⲁ̀ ⲉⲑⲃⲉ ⲡⲓⲛⲁϩϯ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓϣⲉ ⲧⲉⲃⲓ ⲛ̀ⲧⲉ Ⲕⲱⲥⲧⲁⲛⲧⲓⲛⲟⲩⲡⲟⲗⲓⲥ: ⲛⲉⲙ ⲡⲓⲥ̀ⲛⲁⲩ ϣⲉ ⲛ̀ⲧⲉ Ⲉ̀ⲫⲉⲥⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ϩⲁⲇⲓⲇ ⲛⲉⲙ ⲁⲃⲃⲁ Ⲓⲱⲁⲛⲛⲏⲥ: ⲛⲉⲙ ⲡⲉⲛⲓⲱⲧ ⲡⲓⲛⲓϣϯ ⲁⲃⲃⲁ Ⲡⲁⲣⲥⲱⲙⲁ ⲛⲉⲙ ⲁⲃⲃⲁ Ⲧⲉϫⲓ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲁⲃⲃⲁ Ⲁⲃⲣⲁⲁⲙ ⲡⲓϩⲏⲅⲟⲩⲙⲉⲛⲟⲥ: ⲛⲉⲙ ⲡⲉⲛⲓⲱⲧ ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲭⲟⲣⲟⲥ ⲛ̀ⲧⲉ ⲛⲓⲥ̀ⲧⲁⲩⲣⲟⲫⲟⲣⲟⲥ: ⲉ̀ⲧⲁⲩϫⲱⲕ ⲉ̀ⲃⲟⲗ ϩⲓ ⲛⲓϣⲁϥⲉⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲁϭⲟⲓⲥ ⲡ̀ⲟⲩⲣⲟ Ⲕⲱⲥⲧⲁⲛⲧⲓⲛⲟⲥ: ⲛⲉⲙ Ⲏ̀ⲗⲁⲛⲏ ϯⲟⲩⲣⲱ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲦⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲁ̀ⲗⲟⲩ ⲛ̀ⲥⲁⲃⲉ ⲙ̀ⲡⲁⲣⲑⲉⲛⲟⲥ: ⲛⲓϣⲉⲗⲉⲧ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲏⲉⲑⲟⲩⲁⲃ ⲛ̀ⲧⲉ ⲡⲁⲓⲉ̀ϩⲟⲟⲩ: ⲡⲓⲟⲩⲁⲓ ⲡⲓⲟⲩⲁⲓ ⲕⲁⲧⲁ ⲡⲉϥⲣⲁⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲰ̀ ⲥⲁⲩⲧⲱⲥ ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟⲕ: ⲛⲉⲙ ⲡⲓϩⲩⲙⲛⲟⲇⲟⲥ Ⲇⲁⲩⲓⲇ: ϫⲉ ⲛ̀ⲑⲟⲕ ⲡⲉ ⲡⲓⲟⲩⲏⲃ ϣⲁ ⲉ̀ⲛⲉϩ: ⲕⲁⲧⲁ ⲧ̀ⲧⲁⲝⲓⲥ ⲙ̀Ⲙⲉⲗⲭⲓⲥⲉⲇⲉⲕ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: ⲡⲁⲡⲁ ⲁⲃⲃⲁ Ϣⲉⲛⲟⲩⲇⲁ ⲡⲓⲁⲣⲭⲏⲉ̀ⲣⲉⲩⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲇⲓⲕⲉⲟⲥ: ⲁⲃⲃⲁ (...) ⲡⲓⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ (ⲙ̀ⲙⲏⲧⲣⲟⲡⲟⲗⲓⲧⲏⲥ): ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
            },
            {
              language: 'englishCoptic',
              text: 'Ari-epresveuin e-ehrēi ejōn: ō tentshois ennēb tēren Tithe-otokos: Maria Ethmau em-Pensōtēr: entefkha nennovi nan evol.\n\n+ Ari-epresveuin e-ehrēi ejōn: ō niarkhēaggelos ethouab: Mikhaēl nem Gabriēl: entefkha nennovi nan evol.\n\nAri-epresveuin e-ehrēi ejōn: ō niarkhēaggelos ethouab: Rafaēl nem Souriēl: entefkha nennovi nan evol.\n\n+ Ari-epresveuin e-ehrēi ejōn: ō niarkhēaggelos ethouab: Sedakiēl Sarathiēl nem Ananiēl: entefkha nennovi nan evol.\n\nAri-epresveuin e-ehrēi ejōn: ni-ethronos nimettshois nijom: Nikherouvim nem Niserafim: entefkha nennovi nan evol.\n\n+ Ari-epresveuin e-ehrēi ejōn: pi-eftoou enzōon enasōmatos: enlitourgos enshah enekhrōm: entefkha nennovi nan evol.\n\nAri-epresveuin e-ehrēi ejōn: niouēb ente timethmēi: pijout eftoou emepresvuteros: entefkha nennovi nan evol.\n\n+ Ari-epresveuin e-ehrēi ejōn: ni-esetratia enaggelikon: nem nitagma enepouranion: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: natshois enioti empatriakhēs: Abraam Isaak Iakōb: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: ō pirōmi entelios: pi-ethmēi Enōkh pidikeos: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: Ēlias pithesvitēs: nem Eliseos pefmathētēs: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: ō Mō-usēs piarkhē-eprofētēs: nem Ēsa-ēas nem Iermias: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: Dauid piieropsaltis: nem Iezekiēl nem Daniēl: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: Iōakim nem Anna nem Iōsēf pi-epresvuteros: nem pi-ethmēi Iōb nem Iōsēf nem Nikoudimos: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: Melkhisedek nem A-arōn: nem Zakharias nem Sumeōn: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: nikhoros ente ni-eprofētēs: nem ni-ethmēi nem nidikeos: entefkha nennovi nan evol.\n\nAri-epresveuin e-ehrēi ejōn: ō pi-eprodromos emvaptistēs: Iōannēs pireftiōms: entefkha nennovi nan evol.\n\n+ Ari-epresveuin e-ehrēi ejōn: ō pishe ehme eftoou ensho: nem piparthenos eneuaggelistēs: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: ō natshois enioti enapostolos: nem epsepi ente nimathētēs: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: piarkhēdiakōn etesmarōout: Estefanos pishorp emmarturos: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: pithe-ōrimos eneuaggelistēs: abba Markos pi-apostolos: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: piathloforos emmarturos: patshois epouro Geōrgios: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: The-ōdoros nem The-ōdoros: nem Leontios nem Panikaros: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: Filopatēr Merkourios: nem apa Mēna nem apa Viktōr: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: kuri Eklaudios nem The-ōdoros: nem apa Eskhēron nem apa Isaak: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: Vasilitēs nem Eusevios: nem Makarios nem Filotheos: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: abba Pisoura nem apa Epshōi: nem apa Ēsi nem Thekla tefsōni: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: niathloforos emmarturos: Ioustous nem Apali nem Theoklia: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: abba Iakōvos pifersis: nem pi-agios Sergios nem Vakhos: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: niathloforos emmarturos: Kosma nem nefesnēou nem toumau: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: apa Kir nem Iōannēs pefson: nem Varvara nem Ioulianē nem Dumianē: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: niathloforos emmarturos: kuri Apatēr nem Ēra-ē tefsōni: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: niathloforos emmarturos: Ioulios nem nēethnemaf: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: niathloforos emmarturos: Mari Pahnam nem Sarra tefsōni: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: abba Sarapamōn pi-episkopos: nem Psate nem Gallinikos: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: niathloforos emmarturos: pi-ehme ethouab ente Sevaste: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: abba Pirōou nem Athōm: nem Iōannēs nem Sumeōn: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: niathloforos emmarturos: apa Pishōi nem pefeshfēr Petros: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: apa Ekloj pi-epresvuteros: nem apa Epjol nem apa Kau: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: apa Iōannēs Piremharaklia: nem kurie Pifamōn nem Pistauros: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: Ēsidōros nem Panteleon: Sofia nem Eufomia: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: kuri Apanoub nem Eptholomeos: nem apa Ekragon nem Sousennios: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: ō pinishti enarkhē-ereus: abba Petros ieromarturos: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: ō niveri emmarturos: Pistauros nem Arsenios: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: ō Mikhaēl pihēgoumenos: nem Mikhaēl pimonakhos: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: nikhoros ente nimarturos: etaushepemkah ethve Pi-ekhristos: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: natshois enioti emmainoushēri: abba Antōnios nem abba Paule: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: pishomt ethouab abba Makari: nem noushēri enestauroforos: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: natshois enioti enhēgoumenos: abba Iōannēs nem abba Daniēl: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: natshois enioti emmainoushēri: abba Pishōi nem abba Paule: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: nenioti ethouab enrōmeos: Maksimos nem Dometios: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: pi-ehme psit emmarturos: nikhelloi ente Shihēt: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: pijōri ethouab abba Mōsē: nem Iōannēs pikhamē: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: abba Pakhōm fa tikoinōnia: nem The-ōdoros pefmathētēs: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: abba Shenouti piarkhēmanedritēs: nem abba Vēsa pefmathētēs: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: abba Noufer nem abba Karos: nem peniōt Pafnoutios: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: abba Samouēl pi-omologitēs: nem Ioustos nem Apollo pefmathētēs: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: abba Apollo nem abba Apip: nem peniōt abba Pijimi: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: abba Eukin nem abba Ehron: nem apa Hōr nem apa Fis: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: abba Parsōma nem Efrem: nem Iōannēs nem Sumeōn: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: Epifanos nem Amōnios: nem Arkhēllitēs nem Arsenios: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: natshois enioti enaskētēs: abba Abraam nem Geōrgē: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: Athanasios pi-apostolikos: Seuēros nem Dioskoros: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: Vasilios nem Egrigorios: nem peniōt abba Kurillos: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: pishomt she mēteshmēn etauthōouti: khen Nike-a ethve pinahti: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: ō pishe tevi ente Kōstantinoupolis: nem pi-esnau she ente Efesos: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: abba Hadid nem abba Iōannēs: nem peniōt pinishti abba Parsōma nem abba Teji: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: abba Abraam pihēgoumenos: nem peniōt abba Markos: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: nikhoros ente ni-estauroforos: etaujōk evol hi nishafeu: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: patshois epouro Kōstantinos: nem Ēlanē tiourō: entefkha nennovi nan evol.\n\nTōbh em-Eptshois e-ehrēi ejōn: ni-alou ensave emparthenos: nishelet ente Pi-ekhristos: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: nēethouab ente pai-ehoou: piouai piouai kata pefran: entefkha nennovi nan evol.\n\nŌ sautōs tentshisi emmok: nem pihumnodos Dauid: je enthok pe piouēb sha eneh: kata ettaksis em-Melkhisedek.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: peniōt ethouab empatriarkhēs: papa abba Shenouda piarkhē-ereus: entefkha nennovi nan evol.\n\n+ Tōbh em-Eptshois e-ehrēi ejōn: peniōt ethouab endikeos: abba (...) pi-episkopos (emmētropolitēs): entefkha nennovi nan evol.',
            },
            {
              language: 'english',
              text: 'Intercede on our behalf, O the Lady of us all the Mother of God, Mary the Mother of our Savior, that He may forgive us our sins.\n\n+ Intercede on our behalf, O holy archangels, Michael and Gabriel, that He may forgive us our sins.\n\nIntercede on our behalf, O holy archangels, Raphael and Souriel, that He may forgive us our sins.\n\n+ Intercede on our behalf, O holy archangels, Sedakiel Sarathiel and Ananiel, that He may forgive us our sins.\n\nIntercede on our behalf, O thrones dominions and powers, the Cherubim and the Seraphim, that He may forgive us our sins.\n\n+ Intercede on our behalf, O four incorporeal beasts, the ministering flames of fire, that He may forgive us our sins.\n\nIntercede on our behalf, O priests of the truth, the twenty four presbyters, that He may forgive us our sins.\n\n+ Intercede on our behalf, O angelic hosts, and all the heavenly multitudes, that He may forgive us our sins.\n\nPray to the Lord on our behalf, my lords the fathers the patriarchs, Abraham Isaac and Jacob, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O perfect man, the righteous and just Enoch, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Elijah the tishbite, and Elisha his disciple, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O Moses the archprophet, and Isaiah and Jeremiah, that He may forgive us our sins.\n\nPray to the Lord on our behalf, O David the psalmist, Ezekiel and Daniel, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, Joachim Anna and Joseph the elder, and the righteous Job Joseph and Nicodemus, that He may forgive us our sins.\n\nPray to the Lord on our behalf, O Melchizedek and Aaron, and Zacharias and Simeon, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O choirs of the prophets, and all the righteous and the just, that He may forgive us our sins.\n\nIntercede on our behalf, O forerunner and baptizer, John the Baptist, that He may forgive us our sins.\n\n+ Intercede on our behalf, O the hundred and forty four thousand, and the celibate evangelist, that He may forgive us our sins.\n\nPray to the Lord on our behalf, our masters and fathers the Apostles, and the rest of the Disciples, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O blessed archdeacon, Stephen the first martyr, that He may forgive us our sins.\n\nPray to the Lord on our behalf, O beholder of God the Evangelist, Abba Mark the apostle, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O struggle-mantled martyr, my lord prince George, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Theodore and Theodore, Leontius and Panicharus, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, Philopater Mercurius, and Abba Mina and Abba Victor, that He may forgive us our sins.\n\nPray to the Lord on our behalf, master Claudius and Theodore, Abba Eschyron and Abba Isaac, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, Basilidis and Evsebius, Macarius and Philotheos, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Abba Pisura and Abba Epshoy, Abba Isi and his sister Thecla, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O struggle-mantled martyrs, Justus Apali and Theoklia, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Abba Jacob the Persian, Saint Sergius and Saint Bacchus, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O struggle-mantled martyrs, Cosmas his brothers and their mother, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Abba Kir and his brother John, and Barbara and Juliana and Demiana, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O struggle-mantled martyrs, master Apatir and his sister Iraee, that He may forgive us our sins.\n\nPray to the Lord on our behalf, O struggle-mantled martyrs, Julius and those who were with him, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O struggle-mantled martyrs, Mari Pahnam and his sister Sarah, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Abba Sarapamon the bishop, Psate and Gallinikos, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O struggle-mantled martyrs, the forty saints of Sebaste, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Abba Piro and Athom, and John and Simeon, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O struggle-mantled martyrs, Abba Bishoy and his friend Peter, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Abba Eklog the priest, and Abba Epgol and Abba Kav, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, Abba John of Heraclia, master Piphamon and Pistavros, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Isidore and Panteleon, Sophia and Euphemia, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, master Apanoub and Ptolomeos, Apa Ekragon and Sousennius, that He may forgive us our sins.\n\nPray to the Lord on our behalf, O great high priest, Abba Peter seal of the martyrs, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O new martyrs, Pistavros and Arsenius, that He may forgive us our sins.\n\nPray to the Lord on our behalf, O Michael the hegumen, and Michael the monk, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O choirs of the martyrs, who suffered for the sake of Christ, that He may forgive us our sins.\n\nPray to the Lord on our behalf, our masters the fathers who loved their children, Abba Antony and Abba Paul, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O three saints Macarii, and all their children the cross-bearers, that He may forgive us our sins.\n\nPray to the Lord on our behalf, our masters the fathers the hegumens, Abba John and Abba Daniel, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, our masters the fathers who loved their children, Abba Bishoy and Abba Paul, that He may forgive us our sins.\n\nPray to the Lord on our behalf, our saintly Roman fathers, Maximus and Dometius, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O forty nine martyrs, the elders of Shiheet, that He may forgive us our sins.\n\nPray to the Lord on our behalf, O strong saint Abba Moses, and John Kame, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, Abba Pachomius of the Koinonia, and Theodore his disciple, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Abba Shenouda the archimandrite, and Abba Wisa his disciple, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, Abba Nopher and Abba Karus, and our father Paphnutius, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Abba Samuel the confessor, and Justus and Apollo his disciples, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, Abba Apollo and Abba Apip, and our father Abba Pigimi, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Abba Evkin and Abba Ehron, Abba Hor and Abba Phis, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, Abba Parsouma and Ephraim, and John and Simeon, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Epiphanius and Ammounios, and Arshillidis and Arsenius, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, our masters the ascetic fathers, Abba Abraam and George, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Athanasius the apostolic, Severus and Dioscorus, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, Basil and Gregory, and our father Abba Cyril, that He may forgive us our sins.\n\nPray to the Lord on our behalf, the three hundred and eighteen gathered, at Nicea for the faith, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, O the one hundred and fifty at Constantinople, and the two hundred at Ephesus, that He may forgive us our sins.\n\nPray to the Lord on our behalf, Abba Hadid and Abba John, our great father Parsouma and Abba Roweis, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, Abba Abraam the hegumen, and our father Abba Mark, that He may forgive us our sins.\n\nPray to the Lord on our behalf, O choirs of the cross-bearers, perfected in the wilderness, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, my lord king Constantine, and his mother queen Helen, that He may forgive us our sins.\n\nPray to the Lord on our behalf, O wise virgin ladies, the brides of Christ, that He may forgive us our sins.\n\n+ Pray to the Lord on our behalf, the saints of this day, everyone according to his name, that He may forgive us our sins.\n\nLikewise we exalt you, with David the psalmist, "You are a priest forever, according to the order of Melchizedek."\n\n+ Pray to the Lord on our behalf, our holy father the patriarch, Pope Abba Shenouda the high priest, that He may forgive us our sins.\n\n+ (If a Bishop is present) Pray to the Lord on our behalf, O our holy and righteous father, Abba (...) the Bishop (Metropolitan), that He may forgive us our sins.',
            },
            {
              language: 'englishArabic',
              text: 'Ishfa\'i feena (amam er-Rabb), ya sayyidatana kullina es-sayyida walidat el-ilah, Maryam umm mukhallisina, li-yaghfir lana khatayana.\n\n+ Ishfa\'a feena (amam er-Rabb), ya ra\'eesay el-mala\'ika et-tahireen, Mikha\'eel wa Ghobrial, li-yaghfir lana khatayana.\n\nIshfa\'a feena (amam er-Rabb), ya ra\'eesay el-mala\'ika et-tahireen, Rafa\'eel wa Souryal, li-yaghfir lana khatayana.\n\n+ Ishfa\'u feena (amam er-Rabb), ya ru\'asa\' el-mala\'ika el-at-har, Sadakyal wa Saratyal wa Ananyal, li-yaghfir lana khatayana.\n\nIshfa\'i feena (amam er-Rabb), ayyatuha el-karasi wal-arbab wal-quwwat, wash-Sheroubim was-Seraphim, li-yaghfir lana khatayana.\n\n+ Ishfa\'u feena (amam er-Rabb), ayyuha el-arba\'at el-hayawanat ghayr el-mutajassideen, el-khuddam el-multahibeen naran, li-yaghfir lana khatayana.\n\nIshfa\'u feena (amam er-Rabb), ya kahanat el-haqq, el-arba\'a wal-\'ishreen qasseesan, li-yaghfir lana khatayana.\n\n+ Ishfa\'u feena (amam er-Rabb), ayyuha el-\'asakir el-mala\'ikiya, wat-taghmat es-sama\'iya, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya sadati el-aba\' el-batarika, Ibraheem wa Ishaq wa Ya\'qoub, li-yaghfir lana khatayana.\n\n+ Utlub min er-Rabb \'anna, ayyuha er-rajul el-kamil, el-barr Akhnoukh es-siddeeq, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Iliya et-Tishbiti, wa Elisha\' tilmeedhuh, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya Mousa ra\'ees el-anbiya\', wa Ash\'iya\' wa Irmiya, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Dawoud el-murattil, wa Hizqiyal wa Daniyal, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya Yawaqeem wa Hanna wa Yousef esh-sheikh, wes-siddeeq Ayyoub wa Yousef wa Niqoudeemous, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Malki Sadeq wa Haroun, wa Zakariya wa Sim\'an, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya sufouf el-anbiya\', wal-abrar wes-siddiqeen, li-yaghfir lana khatayana.\n\nIshfa\' feena (amam er-Rabb), ayyuha es-sabiq es-sabigh, Youhanna el-Ma\'madan, li-yaghfir lana khatayana.\n\n+ Ishfa\'u feena (amam er-Rabb), ayyuha el-mi\'a wal-arba\'a wal-arba\'een alfan, wal-batoul el-injeeli, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya sadati el-aba\' er-rusul, wa baqiyat et-talameedh, li-yaghfir lana khatayana.\n\n+ Utlub min er-Rabb \'anna, ya ra\'ees esh-shamamisa el-mubarak, Istifanous esh-shaheed el-awwal, li-yaghfir lana khatayana.\n\nUtlub min er-Rabb \'anna, ayyuha en-nazir el-ilah el-injeeli, Aba Marqos er-rasoul, li-yaghfir lana khatayana.\n\n+ Utlub min er-Rabb \'anna, ayyuha esh-shaheed el-mujahid, sayyidi el-malik Georgios, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Theodoros wa Theodoros, wa Lawondios, wa Banikaros, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya Filobateer Marqorios, wa Aba Mina wa Aba Boqtor, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya sayyidi Iqladios wa Theodoros, wa Aba Skheiron wa Aba Ishaq, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya Wasilidis wa Arsabios, wa Makarios wa Filotheos, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Anba Bisoura wa Aba Bishay, wa Aba Eesi wa Takla ukhtuh, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ayyuha esh-shuhada\' el-mujahidoon, Yustus wa Abali wa Theoklia, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Anba Ya\'qoub el-Farisi, wal-qiddis Sergios wa Wakhes, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ayyuha esh-shuhada\' el-mujahidoon, Qozman wa ikhwatuh wa ummuhum, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Aba Qir wa Youhanna akhouh, wa Barbara wa Youliana wa Dimiana, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ayyuha esh-shaheedan el-mujahidan, es-sayyid Abadeer wa Ira\'ee ukhtuh, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ayyuha esh-shuhada\' el-mujahidoon, Youlios wa man ma\'ahu, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ayyuha esh-shaheedan el-mujahidan, Mar Behnam wa Sara ukhtuh, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Anba Sarabamoun el-usquf, wa Ibsadi wa Ghalinikos, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ayyuha esh-shuhada\' el-mujahidoon, el-arba\'oon qiddisan bi-Sebastia, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Anba Birouh wa Atoum, wa Youhanna wa Sim\'an, li-yaghfir lana khatayana.\n\n+ Utlouba min er-Rabb \'anna, ayyuha esh-shaheedan el-mujahidan, Aba Bishoy wa sadeequh Butros, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Aba Ekloug el-qiss, wa Aba Bigoul wa Aba Kav, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya Aba Youhanna el-Heraqli, wes-sayyid Bifamoun wa Bistavros, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Isidoros wa Bandalawon, wa Sofia wa Ifoumia, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya sayyidi Abanoub wa Ibtolomaos, wa Aba Ekragon wa Sousenios, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya ra\'ees el-kahana el-\'azeem, Anba Butros khatam esh-shuhada\', li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ayyuha esh-shaheedan el-jadeedan, Bistavros wa Arsanios, li-yaghfir lana khatayana.\n\nUtlouba min er-Rabb \'anna, ya Mikha\'eel el-qummus, wa Mikha\'eel er-rahib, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya sufouf esh-shuhada\', alladheena ta\'allamou min ajl el-Maseeh, li-yaghfir lana khatayana.\n\nUtlouba min er-Rabb \'anna, ya sayyiday el-abawayn muhibbay awladihima, Anba Antonios wa Anba Bola, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ayyuha eth-thalatha Maqarat el-qiddisoon, wa awladuhum labisi es-saleeb, li-yaghfir lana khatayana.\n\nUtlouba min er-Rabb \'anna, ya sayyiday el-abawayn el-qummusayn, Anba Youhanna wa Anba Daniyal, li-yaghfir lana khatayana.\n\n+ Utlouba min er-Rabb \'anna, ya sayyiday el-abawayn muhibbay awladihima, Anba Bishoy wa Anba Bola, li-yaghfir lana khatayana.\n\nUtlouba min er-Rabb \'anna, ya abawayna el-qiddisayn er-Roumiyayn, Maximos wa Doumadios, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ayyuha et-tis\'a wal-arba\'oon shaheedan, shuyoukh Shiheet, li-yaghfir lana khatayana.\n\nUtlouba min er-Rabb \'anna, ayyuha el-qawi el-qiddis Anba Mousa, wa Yohannis Kama, li-yaghfir lana khatayana.\n\n+ Utlouba min er-Rabb \'anna, ya Anba Bakhoum aba esh-shirka, wa Theodoros tilmeedhuh, li-yaghfir lana khatayana.\n\nUtlouba min er-Rabb \'anna, ya Anba Shenouda ra\'ees el-mutawahhideen, wa Anba Wissa tilmeedhuh, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya Anba Nofer wa Anba Karous, wa abana Bafnoutios, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Anba Samouel el-mu\'tarif, wa Yustus wa Abollo tilmeedhayh, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya Anba Abollo wa Anba Abeeb, wa abana Anba Bigimi, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Anba Evkin wa Anba Ehron, wa Aba Hour wa Aba Fees, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya Anba Barsouma wa Efraim, wa Youhanna wa Sim\'an, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Ebifanios wa Amonios, wa Arshelidis wa Arsanios, li-yaghfir lana khatayana.\n\n+ Utlouba min er-Rabb \'anna, ya sayyiday el-abawayn en-nasikayn, Anba Abraam wa Georgi, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Athanasios er-rasouli, wa Sawiros wa Dioscoros, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya Basilios wa Ighrighorios, wa abana Anba Kyrillos, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ayyuha eth-thalath mi\'a wa thamaniyat \'ashar alladheena ijtama\'ou, fi Niqiya min ajl el-eeman, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ayyuha el-mi\'a wal-khamseen bi-madeenat el-Qustanteeniya, wal-mi\'atayn bi-Afasus, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya Anba Hadeed wa Anba Youhanna, wa abana el-\'azeem Anba Barsouma wa Anba Ruwais, li-yaghfir lana khatayana.\n\n+ Utlouba min er-Rabb \'anna, ya Anba Abraam el-qummus, wa abana Anba Marqos, li-yaghfir lana khatayana.\n\nUtlubu min er-Rabb \'anna, ya masaf labisi es-saleeb, alladheena kamalou fil-barari, li-yaghfir lana khatayana.\n\n+ Utlouba min er-Rabb \'anna, ya sayyidi el-malik Qustanteen, wa Hilana el-malika, li-yaghfir lana khatayana.\n\nUtlubna min er-Rabb \'anna, ayyatuha el-fatayat el-\'adhara el-hakeemat, \'ara\'is el-Maseeh, li-yaghfir lana khatayana.\n\n+ Utlubu min er-Rabb \'anna, ya qiddisi hadha el-yawm, kullu wahid bi-ismih, li-yaghfir lana khatayana.\n\nKadhalika nu\'azzimuk, ma\'a el-murattil Dawoud qa\'ileen, "Anta huwa el-kahin ila el-abad, \'ala taqs Malki Sadeq."\n\n+ Utlub min er-Rabb \'anna, ya abana el-qiddis el-batreerk, Anba Shenouda ra\'ees el-kahana, li-yaghfir lana khatayana.\n\n+ (Fi hudour el-ab el-usquf) Utlub min er-Rabb \'anna, ya abina el-qiddis el-barr, Anba (...) el-usquf (el-mutran), li-yaghfir lana khatayana.',
            },
            {
              language: 'arabic',
              text: 'إشفعي فينا (أمام الرب)، يا سيدتنا كلنا السيدة والدة الإله، مريم أُم مخلصنا، ليغفر لنا خطايانا.\n\n+ إشفعا فينا (أمام الرب)، يا رئيسي الملائكة الطاهرين، ميخائيل وغبريال، ليغفر لنا خطايانا.\n\nإشفعا فينا (أمام الرب)، يا رئيسي الملائكة الطاهرين، رافائيل وسوريال، ليغفر لنا خطايانا.\n\n+ إشفعوا فينا (أمام الرب)، يا رؤساء الملائكة الأطهار، سداكيال وسراتيال وأنانيال، ليغفر لنا خطايانا.\n\nإشفعي فينا (أمام الرب)، أيتها الكراسي والأرباب والقوات، والشيروبيم والسرافيم، ليغفر لنا خطايانا.\n\n+ إشفعوا فينا (أمام الرب)، أيها الأربعة الحيوانات غير المتجسدين، الخدام الملتهبين ناراً، ليغفر لنا خطايانا.\n\nإشفعوا فينا (أمام الرب)، يا كهنة الحق، الأربعة والعشرين قسيساً، ليغفر لنا خطايانا.\n\n+ إشفعوا فينا (أمام الرب)، أيها العساكر الملائكية، والطغمات السمائية، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا سادتي الآباء البطاركة، إبراهيم وإسحق ويعقوب، ليغفر لنا خطايانا.\n\n+ أُطلب من الرب عنا، أيها الرجل الكامل، البار أخنوخ الصديق، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا إيليا التسبيتي، وإليشع تلميذه، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا موسى رئيس الأنبياء، وأشعياء وأرميا، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا داود المرتل، وحزقيال ودانيال، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا يواقيم وحنِّة ويوسف الشيخ، والصديق أيوب ويوسف ونيقوديموس، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا ملكي صادق وهرون، وزكريا وسمعان، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا صفوف الأنبياء، والأبرار والصديقين، ليغفر لنا خطايانا.\n\nإشفع فينا (أمام الرب)، أيها السابق الصابغ، يوحنا المعمدان، ليغفر لنا خطايانا.\n\n+ إشفعوا فينا (أمام الرب)، أيها المئة والأربعة والأربعين ألفاً، والبتول الإنجيلي، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا سادتي الآباء الرسل، وبقية التلاميذ، ليغفر لنا خطايانا.\n\n+ أُطلب من الرب عنا، يا رئيس الشمامسة المبارك، إستفانوس الشهيد الأول، ليغفر لنا خطايانا.\n\nأُطلب من الرب عنا، أيها الناظر الإله الإنجيلي، أبا مرقس الرسول، ليغفر لنا خطايانا.\n\n+ أُطلب من الرب عنا، أيها الشهيد المجاهد، سيدي الملك جيؤرجيوس، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا ثيؤدوروس وثيؤدوروس، ولاونديوس، وبانيكاروس، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا فيلوباتير مرقوريوس، وأبا مينا وأبا بقطر، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا سيدي إقلاديوس وثيئودوروس، وأبا سخيرون وأبا إسحق، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا واسيليدس وأرسابيوس، ومكاريوس وفيلوثيؤوس، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا أنبا بسورة وأبا بشاي، وأبا إيسي وتكلا أخته، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، أيها الشهداء المجاهدون، يسطس وآبالي وثيؤكليا، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا أنبا يعقوب الفارسي، والقديس سرجيوس وواخس، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، أيها الشهداء المجاهدون، قزمان وإخوته وأمهم، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا أبا قير ويوحنا أخوه، وبربارة ويوليانة ودميانة، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، أيها الشهيدان المجاهدان، السيد أبادير وإيرائي أخته، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، أيها الشهداء المجاهدون، يوليوس ومَن معه، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، أيها الشهيدان المجاهدان، مار بهنام وسارة أخته، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا أنبا صرابامون الأسقف، وإبصادي وغلينيكوس، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، أيها الشهداء المجاهدون، الأربعون قديساً بسبسطية، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا أنبا بيروه وأتوم، ويوحنا وسمعان، ليغفر لنا خطايانا.\n\n+ أطلبا من الرب عنا، أيها الشهيدان المجاهدان، أبا بيشوي وصديقه بطرس، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا أبا إكلوج القس، وأبا بيجول وأبا كاڤ، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا أبا يوحنا الهرقلي، والسيد بفامون وبسطوروس، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا إيسيذوروس وبندلاون، وصوفيا وإفومية، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا سيدي أبانوب وإبطلماوس، وإبا إكراجون وسوسونيوس، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا رئيس الكهنة العظيم، أنبا بطرس خاتم الشهداء، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، أيها الشهيدان الجديدان، بسطوروس وأرسانيوس، ليغفر لنا خطايانا.\n\nأطلبا من الرب عنا، يا ميخائيل القمص، وميخائيل الراهب، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا صفوف الشهداء، الذين تألموا من أجل المسيح، ليغفر لنا خطايانا.\n\nأُطلبا من الرب عنا، يا سيدي الأبوين محبي أولادهما، أنبا أنطونيوس وأنبا بولا، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، أيها الثلاثة مقارات القديسون، وأولادهم لباس الصليب، ليغفر لنا خطايانا.\n\nأُطلبا من الرب عنا، يا سيدي الأبوين القمصين، أنبا يوحنا وأنبا دانيال، ليغفر لنا خطايانا.\n\n+ أُطلبا من الرب عنا، يا سيدي الأبوين محبي أولادهما، أنبا بيشوي وأنبا بولا، ليغفر لنا خطايانا.\n\nأُطلبا من الرب عنا، يا أبوينا القديسين الروميين، مكسيموس ودوماديوس، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، أيها التسعة والأربعون شهيداً، شيوخ شيهات، ليغفر لنا خطايانا.\n\nأُطلبا من الرب عنا، أيها القوي القديس أنبا موسى، ويحنس كاما، ليغفر لنا خطايانا.\n\n+ أُطلبا من الرب عنا، يا أنبا باخوم أبا الشركة، وثيودورس تلميذه، ليغفر لنا خطايانا.\n\nأُطلبا من الرب عنا، يا أنبا شنودة رئيس المتوحدين، وأنبا ويصا تلميذه، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا أنبا نفر وأنبا كاروس، وأبانا بفنوتيوس، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا أنبا صموئيل المعترف، ويسطس وأبوللو تلميذيه، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا أنبا أبوللو وأنبا أبيب، وأبانا أنبا بيچيمي، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا أنبا إڤكين وأنبا إهرون، وأبا هور وأبا فيس، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا أنبا برسوما وإفريم، ويوحنا وسمعان، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا إبيفانيوس وأمونيوس، وأرشليدس وأرسانيوس، ليغفر لنا خطايانا.\n\n+ أُطلبا من الرب عنا، يا سيدي الأبوين الناسكين، أنبا أبرآم وجيؤرجي، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا أثاناسيوس الرسولي، وساويرس وديسقورس، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا باسيليوس وإغريغوريوس، وأبانا أنبا كيرلس، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، أيها الـ 318 الذين إجتمعوا، في نيقية من أجل الإيمان، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، أيها الـ 150 بمدينة القسطنطينية، والمائتين بأفسس، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا أنبا حديد وأنبا يوحنا، وأبانا العظيم أنبا برسوما وأنبا رويس، ليغفر لنا خطايانا.\n\n+ أُطلبا من الرب عنا، يا أنبا أبرآم القمص، وأبانا أنبا مرقس، ليغفر لنا خطايانا.\n\nأُطلبوا من الرب عنا، يا مصاف لباس الصليب، الذين كملوا في البراري، ليغفر لنا خطايانا.\n\n+ أُطلبا من الرب عنا، يا سيدي الملك قسطنطين، وهيلانة الملكة، ليغفر لنا خطايانا.\n\nأُطلبنَّ من الرب عنا، أيتها الفتيات العذارى الحكيمات، عرائس المسيح، ليغفر لنا خطايانا.\n\n+ أُطلبوا من الرب عنا، يا قديسي هذا اليوم، كل واحد بإسمه، ليغفر لنا خطايانا.\n\nكذلك نعظمك، مع المرتل داود قائلين، "أنت هو الكاهن إلى الأبد، على طقس ملكي صادق."\n\n+ أُطلب من الرب عنا، يا أبانا القديس البطريرك، أنبا شنودة رئيس الكهنة، ليغفر لنا خطايانا.\n\n+ (في حضور الآب الأسقف) أطلب من الرب عنا، يا أبينا القديس البار، أنبا (...) الأسقف (المطران)، ليغفر لنا خطايانا.',
            },
          ],
        },
        {
          id: 'annual-midnight-doxologies',
          title: 'Doxologies',
          versions: [],
          children: [
            {
              id: 'annual-midnight-doxology-virgin-mary',
              title: 'Ⲧⲉⲙⲉⲧⲛⲓϣϯ (Doxology for St Virgin Mary)',
              versions: [
                {
                  language: 'coptic',
                  text: 'Ⲧⲉⲙⲉⲧⲛⲓϣϯ ⲱ̀ Ⲙⲁⲣⲓⲁ: Ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲛ̀ⲁⲧⲑⲱⲗⲉⲃ: ⲥ̀ⲟⲛⲓ ⲙ̀ⲡⲓϭⲓⲥⲓ ⲙ̀ⲡⲓⲃⲉⲛⲓ: ⲉ̀ⲧⲁ Ⲥⲟⲗⲟⲙⲱⲛ ⲥⲁϫⲓ ⲉⲑⲃⲏⲧϥ.\n\nⲚ̀ⲑⲟ ⲧⲉ ϯⲙⲟⲩⲙⲓ ⲙ̀ⲙⲱⲟⲩ ⲛ̀ⲱⲛϧ: ⲉⲧϧⲁϯ ⲙ̀Ⲡⲓⲗⲓⲃⲁⲛⲟⲥ: ⲉ̀ⲧⲁ ⲡⲓϩ̀ⲙⲟⲧ ⲛ̀ⲧⲉ ϯⲙⲉⲑⲛⲟⲩϯ: ⲃⲉⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ ⲛ̀ϧⲏⲧⲥ.\n\nⲀ̀ⲣⲉⲙⲓⲥⲓ ⲛⲁⲛ ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ: ϧⲉⲛ ⲧⲉⲙⲏⲧⲣⲁ ⲙ̀ⲡⲁⲣⲑⲉⲛⲓⲕⲓ: ⲁϥⲁⲓⲧⲉⲛ ⲛ̀ⲕⲗⲏⲣⲟⲛⲟⲙⲟⲥ: ⲛ̀ϧ̀ⲣⲏⲓ ϧⲉⲛ ⲑ̀ⲙⲉⲧⲟⲩⲣⲟ ⲛ̀ⲛⲓⲫⲏⲟⲩⲓ̀.\n\nⲔⲁⲧⲁ ⲡⲓⲱϣ ⲉ̀ⲧⲁϥⲱϣ ⲙ̀ⲙⲟϥ: ⲛ̀ⲧⲉ ⲡⲉⲛⲓⲱⲧ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: ⲉ̀ⲧⲉ ⲫⲁⲓ ⲡⲉ ⲡ̀ⲟⲩⲣⲟ Ⲇⲁⲩⲓⲇ: ⲁϥⲓ̀ ⲁϥϫⲟⲕϥ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲬⲉⲣⲉ ⲛⲉ ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ϯⲟⲩⲣⲱ ⲙ̀ⲙⲏⲓ ⲛ̀ⲁ̀ⲗⲏⲑⲓⲛⲏ: ⲭⲉⲣⲉ ⲡ̀ϣⲟⲩϣⲟⲩ ⲛ̀ⲧⲉ ⲡⲉⲛⲅⲉⲛⲟⲥ: ⲁ̀ⲣⲉⲭ̀ⲫⲟ ⲛⲁⲛ ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ.\n\nⲦⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.',
                },
                {
                  language: 'englishCoptic',
                  text: 'Temetnishti ō Maria: Tiparthenos enatthōleb: esoni empitshisi empiveni: eta Solomōn saji ethvētf.\n\nEntho te timoumi emmōou enōnkh: etkhati em-Pilivanos: eta pi-ehmot ente timethnouti: vevi nan evol enkhēts.\n\nAremisi nan en-Emmanouēl: khen temētra empartheniki: afaiten enklēronomos: enekhrēi khen ethmetouro ennifēou-i.\n\nKata piōsh etafōsh emmof: ente peniōt empatriarkhēs: ete fai pe epouro Dauid: afi afjokf nan evol.\n\nKhere ne ō Tiparthenos: tiourō emmēi enalēthinē: khere epshoushou ente pengenos: are-ekhfo nan en-Emmanouēl.\n\nTentiho aripenmeu-i: ō ti-eprostatēs etenhot: nahren Pentshois Iēsous Pi-ekhristos: entefkha nennovi nan evol.',
                },
                {
                  language: 'english',
                  text: 'Your greatness O Mary: the undefiled Virgin: is likened to the height of the palm tree: spoken of by Solomon.\n\nYou are the spring of living water: that flows from Lebanon: for of you sprang unto us: the grace of the divinity.\n\nYou gave birth to Emmanuel: out of your virginal womb: He has made us heirs: to the Kingdom of Heaven.\n\nAccording to the promise: He promised to our father: King David the patriarch: He came and fulfilled to us.\n\nHail to you O Virgin: the right and true Queen: hail to the pride of our race: who bore to us Emmanuel.\n\nWe ask you to remember us: O our faithful advocate: before our Lord Jesus Christ: that He may forgive us our sins.',
                },
                {
                  language: 'englishArabic',
                  text: '\'Azamatuki ya Maryam, el-\'adhra\' ghayr ed-danisa, tushbih \'uluw en-nakhla, allati takallam \'anha Sulayman.\n\nAnti yanbou\' ma\' el-hayah, el-fa\'id min Lubnan, allati naba\'at lana minhu, ni\'mat el-lahout.\n\nWaladti lana \'Immanu\'il, min ahsha\'iki el-batoul, wa sayyartina warithin, fi malakout es-samawat.\n\nKal-wa\'d allazi wa\'ada bihi, abana ra\'is el-aba\', allazi huwa el-malik Dawud, ata wa akmalahu lana.\n\nEs-salam laki ayyatuha el-\'adhra\', el-malika el-haqiqiya el-haqqaniya, es-salam li-fakhr jinsina, waladti lana \'Immanu\'il.\n\nNas\'aluki an tadhkurina, ayyatuha esh-shafi\'a el-mu\'tamana, amam Rabbina Yasou\' el-Masih, li-yaghfir lana khatayana.',
                },
                {
                  language: 'arabic',
                  text: 'عظمتك يا مريم، العذراء غير الدنسة، تشبه عُلو النخلة التي، تكلم عنها سليمان.\n\nأنتِ ينبوع ماء الحياة، الفائض من لبنان، التي نبعت لنا منه، نعمة اللاهوت.\n\nولدتِ لنا عمانوئيل، من أحشائِك البتول، وصيرنا وارثين، في ملكوت السموات.\n\nكالوعد الذي وعد به، أبانا رئيس الآباء، الذي هو الملك داود، أتى وأكمله لنا.\n\nالسلام لكِ أيتها العذراء، الملكة الحقيقية الحقانية، السلام لفخر جنسنا، ولدت لنا عمانوئيل.\n\nنسألك أن تذكرينا، أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا.',
                },
              ],
            },
            { id: 'annual-midnight-doxology-archangel-gabriel', title: 'Doxology for Archangel Gabriel', versions: [] },
            { id: 'annual-midnight-doxology-michael-gabriel', title: 'Doxology for Archangels Michael and Gabriel', versions: [] },
            { id: 'annual-midnight-doxology-heavenly-beings', title: 'Doxology for All the Heavenly Beings', versions: [] },
            { id: 'annual-midnight-doxology-apostles', title: 'Doxology for All the Apostles', versions: [] },
            { id: 'annual-midnight-doxology-apostles-2', title: 'Another Doxology for All the Apostles', versions: [] },
            { id: 'annual-midnight-doxology-st-mark', title: 'Doxology for St Mark the Evangelist', versions: [] },
            { id: 'annual-midnight-doxology-st-mark-2', title: 'Another Doxology for St Mark the Evangelist', versions: [] },
            { id: 'annual-midnight-doxology-st-george', title: 'Doxology for St George', versions: [] },
            { id: 'annual-midnight-doxology-st-george-2', title: 'Another Doxology for St George', versions: [] },
            { id: 'annual-midnight-doxology-philopater-mercurius', title: 'Doxology for St Philopater Mercurius', versions: [] },
            { id: 'annual-midnight-doxology-st-mena', title: 'Doxology for St Mena', versions: [] },
            { id: 'annual-midnight-doxology-anba-abraam', title: 'Doxology for Anba Abraam', versions: [] },
            { id: 'annual-midnight-doxology-pope-kyrillos', title: 'Doxology for Pope Kyrillos', versions: [] },
            { id: 'annual-midnight-doxology-conclusion', title: 'The Conclusion of the Doxologies', versions: [] },
          ],
        },
        {
          id: 'annual-midnight-fourth-canticle',
          title: 'Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ (The Fourth Canticle)',
          versions: [
            {
              language: 'coptic',
              text: '+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ̀ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲛⲏⲉⲧϭⲟⲥⲓ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ⲛⲉϥⲁⲅⲅⲉⲗⲟⲥ ⲧⲏⲣⲟⲩ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ⲛⲉϥⲇⲩⲛⲁⲙⲓⲥ ⲧⲏⲣⲟⲩ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ⲡⲓⲣⲏ ⲛⲉⲙ ⲡⲓⲓⲟϩ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ⲛⲓⲥⲓⲟⲩ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲉ ⲡⲓⲟⲩⲱⲓⲛⲓ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ⲛⲓⲫⲏⲟⲩⲓ̀ ⲛ̀ⲧⲉ ⲛⲓⲫⲏⲟⲩⲓ̀ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲛⲉⲙ ⲛⲓⲕⲉⲙⲱⲟⲩ ⲉⲧⲥⲁ ⲡ̀ϣⲱⲓ ⲛ̀ⲛⲓⲫⲏⲟⲩⲓ̀.\n\n+ Ⲙⲁⲣⲟⲩⲥ̀ⲙⲟⲩ ⲧⲏⲣⲟⲩ ⲉ̀ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ϫⲉ ⲛ̀ⲑⲟϥ ⲁϥϫⲟⲥ ⲟⲩⲟϩ ⲁⲩϣⲱⲡⲓ.\n\nⲚ̀ⲑⲟϥ ⲁϥϩⲟⲛϩⲉⲛ ⲟⲩⲟϩ ⲁⲩⲥⲱⲛⲧ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲁϥⲧⲁϩⲱⲟ̀ ⲉ̀ⲣⲁⲧⲟⲩ ϣⲁ ⲉ̀ⲛⲉϩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ ⲛ̀ⲧⲉ ⲡⲓⲉ̀ⲛⲉϩ.\n\n+ Ⲁϥⲭⲱ ⲛ̀ⲟⲩϩⲱⲛ ⲟⲩⲟϩ ⲛ̀ⲛⲉϥⲥⲓⲛⲓ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲡ̀ⲕⲁϩⲓ.\n\nⲚⲓⲇ̀ⲣⲁⲕⲱⲛ ⲛⲉⲙ ⲛⲓⲛⲟⲩⲛ ⲧⲏⲣⲟⲩ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲟⲩⲭ̀ⲣⲱⲙ ⲟⲩⲁⲗ ⲟⲩⲭⲓⲱⲛ ⲟⲩⲭ̀ⲣⲩⲥⲧⲁⲗⲗⲟⲥ ⲟⲩⲡ̀ⲛⲉⲩⲙⲁ ⲛ̀ⲥⲁⲣⲁⲑⲏⲟⲩ ⲛⲏⲉⲧⲓ̀ⲣⲓ ⲙ̀ⲡⲉϥⲥⲁϫⲓ.\n\n+ Ⲛⲓⲧⲱⲟⲩ ⲉⲧϭⲟⲥⲓ ⲛⲉⲙ ⲛⲓⲕⲁⲗⲁⲙⲫⲱⲟⲩ ⲧⲏⲣⲟⲩ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲛⲓϣ̀ϣⲏⲛ ⲙ̀ϥⲁⲓⲟⲩⲧⲁϩ ⲛⲉⲙ ⲛⲓϣⲉⲛⲥⲓϥⲓ ⲧⲏⲣⲟⲩ.\n\nⲚⲓⲑⲏⲣⲓⲟⲛ ⲛⲉⲙ ⲛⲓⲧⲉⲃⲛⲱⲟⲩⲓ̀ ⲧⲏⲣⲟⲩ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲛⲓϭⲁⲧϥⲓ ⲛⲉⲙ ⲛⲓϩⲁⲗⲁϯ ⲉⲧⲟⲓ ⲛ̀ⲧⲉⲛϩ.\n\n+ Ⲛⲓⲟⲩⲣⲱⲟⲩ ⲛ̀ⲧⲉ ⲡ̀ⲕⲁϩⲓ ⲛⲉⲙ ⲛⲓⲗⲁⲟⲥ ⲧⲏⲣⲟⲩ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲛⲓⲁⲣⲭⲱⲛ ⲛⲉⲙ ⲛⲓⲣⲉϥϯϩⲁⲡ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲉ ⲡ̀ⲕⲁϩⲓ.\n\nϨⲁⲛϧⲉⲗϣⲓⲣⲓ ⲛⲉⲙ ϩⲁⲛⲡⲁⲣⲑⲉⲛⲟⲥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ϩⲁⲛϧⲉⲗⲗⲟⲓ ⲛⲉⲙ ϩⲁⲛⲁ̀ⲗⲱⲟⲩⲓ̀.\n\n+ Ⲙⲁⲣⲟⲩⲥ̀ⲙⲟⲩ ⲧⲏⲣⲟⲩ ⲉ̀ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ϫⲉ ⲁϥϭⲓⲥⲓ ⲛ̀ϫⲉ ⲡⲉϥⲣⲁⲛ ⲙ̀ⲙⲁⲩⲁⲧϥ.\n\nⲠⲉϥⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ ϣⲟⲡ ϩⲓϫⲉⲛ ⲡ̀ⲕⲁϩⲓ ⲛⲉⲙ ⲛ̀ϩ̀ⲣⲏⲓ ϧⲉⲛ ⲧ̀ⲫⲉ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ϥ̀ⲛⲁϭⲓⲥⲓ ⲙ̀ⲡ̀ⲧⲁⲡ ⲛ̀ⲧⲉ ⲡⲉϥⲗⲁⲟⲥ.\n\n+ Ⲟⲩⲥ̀ⲙⲟⲩ ⲛ̀ⲧⲉ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲁϥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲛⲉⲛϣⲏⲣⲓ ⲙ̀Ⲡⲓⲥⲣⲁⲏⲗ: ⲡⲓⲗⲁⲟⲥ ⲉⲧ ϧⲉⲛⲧ ⲉ̀ⲣⲟϥ.\n\n(Ⲯⲁⲗⲙⲟⲥ ⲣ̅ⲙ̅ⲑ̅)\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nϪⲱ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ϧⲉⲛ ⲟⲩϫⲱ ⲙ̀ⲃⲉⲣⲓ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ϫⲉ ⲁ̀ⲣⲉ ⲡⲉϥⲥ̀ⲙⲟⲩ ϧⲉⲛ ⲧ̀ⲉⲕⲕⲗⲏⲥⲓⲁ ⲛ̀ⲧⲉ ⲛⲏⲉⲑⲟⲩⲁⲃ.\n\n+ Ⲙⲁⲣⲉϥⲟⲩⲛⲟϥ ⲛ̀ϫⲉ Ⲡⲓⲥⲣⲁⲏⲗ ⲉ̀ϫⲉⲛ ⲫⲏⲉ̀ⲧⲁϥⲑⲁⲙⲓⲟϥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲛⲉⲛϣⲏⲣⲓ ⲛ̀Ⲥⲓⲱⲛ ⲙⲁⲣⲟⲩⲑⲉⲗⲏⲗ ⲉ̀ϫⲉⲛ Ⲡⲟⲩⲟⲩⲣⲟ.\n\nⲘⲁⲣⲟⲩⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲉϥⲣⲁⲛ ⲉⲑⲟⲩⲁⲃ ϧⲉⲛ ⲟⲩⲭⲟⲣⲟⲥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ϧⲉⲛ ⲟⲩⲕⲉⲙⲕⲉⲙ ⲛⲉⲙ ⲟⲩⲯⲁⲗⲧⲏⲣⲓⲟⲛ ⲙⲁⲣⲟⲩⲉⲣⲯⲁⲗⲓⲛ ⲉ̀ⲣⲟϥ.\n\n+ Ϫⲉ Ⲡ̀ϭⲟⲓⲥ ⲛⲁϯⲙⲁϯ ⲉ̀ϫⲉⲛ ⲡⲉϥⲗⲁⲟⲥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ϥ̀ⲛⲁϭⲓⲥⲓ ⲛ̀ⲛⲓⲣⲉⲙⲣⲁⲩϣ ϧⲉⲛ ⲟⲩⲟⲩϫⲁⲓ.\n\nⲈⲩⲉ̀ϣⲟⲩϣⲟⲩ ⲙ̀ⲙⲱⲟⲩ ⲛ̀ϫⲉ ⲛⲏⲉⲑⲟⲩⲁⲃ ϧⲉⲛ ⲟⲩⲱ̀ⲟⲩ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲉⲩⲉ̀ⲑⲉⲗⲏⲗ ⲙ̀ⲙⲱⲟⲩ ϩⲓϫⲉⲛ ⲛⲟⲩⲙⲁⲛⲉⲛⲕⲟⲧ.\n\n+ Ⲛⲓϭⲓⲥⲓ ⲛ̀ⲧⲉ Ⲫ̀ⲛⲟⲩϯ ⲉⲧⲭⲏ ϧⲉⲛ ⲧⲟⲩϣ̀ⲃⲱⲃⲓ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ϩⲁⲛⲥⲏϥⲓ ⲛ̀ⲣⲟⲥ̀ⲛⲁⲩ ⲉⲧⲭⲏ ϧⲉⲛ ⲛⲟⲩϫⲓϫ.\n\nⲈ̀ⲡ̀ϫⲓⲛⲓ̀ⲣⲓ ⲛ̀ⲟⲩϭⲓⲙ̀ⲡ̀ϣⲓϣ ϧⲉⲛ ⲛⲓⲉⲑⲛⲟⲥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲛⲉⲙ ϩⲁⲛⲥⲟϩⲓ ϧⲉⲛ ⲛⲓⲗⲁⲟⲥ.\n\n+ Ⲉ̀ⲡ̀ϫⲓⲛⲥⲱⲛϩ ⲛ̀ϩⲁⲛⲟⲩⲣⲱⲟⲩ ϧⲉⲛ ϩⲁⲛⲡⲉⲇⲏⲥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲛⲉⲙ ⲛⲏⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲧⲱⲟⲩ ϧⲉⲛ ϩⲁⲛⲡⲉⲇⲏⲥ ⲛ̀ϫⲓϫ ⲙ̀ⲃⲉⲛⲓⲡⲓ.\n\nⲈ̀ⲡ̀ϫⲓⲛⲓ̀ⲣⲓ ⲛ̀ϧⲏⲧⲟⲩ ⲛ̀ⲟⲩϩⲁⲡ ⲉϥⲥ̀ϧⲏⲟⲩⲧ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲡⲁⲓⲱ̀ⲟⲩ ⲫⲁⲓ ⲁϥϣⲟⲡ ϧⲉⲛ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲁϥ.\n\n(Ⲯⲁⲗⲙⲟⲥ ⲣ̅ⲛ̅)\n\n+ Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀Ⲫ̀ⲛⲟⲩϯ ϧⲉⲛ ⲛⲏⲉⲑⲟⲩⲁⲃ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲁϥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲡⲓⲧⲁϫⲣⲟ ⲛ̀ⲧⲉ ⲧⲉϥϫⲟⲙ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ⲉ̀ϩ̀ⲣⲏⲓ ϩⲓϫⲉⲛ ⲧⲉϥⲙⲉⲧϫⲱⲣⲓ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ⲕⲁⲧⲁ ⲡ̀ⲁ̀ϣⲁⲓ ⲛ̀ⲧⲉ ⲧⲉϥⲙⲉⲧⲛⲓϣϯ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲟⲩⲥ̀ⲙⲏ ⲛ̀ⲥⲁⲗⲡⲓⲅⲅⲟⲥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲟⲩⲯⲁⲗⲧⲏⲣⲓⲟⲛ ⲛⲉⲙ ⲟⲩⲕⲩⲑⲁⲣⲁ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲉⲙⲕⲉⲙ ⲛⲉⲙ ϩⲁⲛⲭⲟⲣⲟⲥ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲁⲡ ⲛⲉⲙ ⲟⲩⲟⲣⲅⲁⲛⲟⲛ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲩⲙⲃⲁⲗⲟⲛ ⲉ̀ⲛⲉⲥⲉ ⲧⲟⲩⲥ̀ⲙⲏ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ ϧⲉⲛ ϩⲁⲛⲕⲩⲙⲃⲁⲗⲟⲛ ⲛ̀ⲧⲉ ⲟⲩⲉϣⲗⲏⲗⲟⲩⲓ̀ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\n+ Ⲛⲓϥⲓ ⲛⲓⲃⲉⲛ ⲙⲁⲣⲟⲩⲥ̀ⲙⲟⲩ ⲧⲏⲣⲟⲩ ⲉ̀ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ̀ϭⲟⲓⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲆⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩ̀ⲓⲱ ⲕⲉ Ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\n+ Ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ: ⲁ̅ⲗ̅. Ⲇⲟⲝⲁ ⲥⲓ ⲟ̀ Ⲑⲉⲟⲥ ⲏ̀ⲙⲱⲛ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\n+ Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ: ⲁ̅ⲗ̅. Ⲡⲓⲱ̀ⲟⲩ ⲫⲁ Ⲡⲉⲛⲛⲟⲩϯ ⲡⲉ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.',
            },
            {
              language: 'englishCoptic',
              text: '+ Esmou e-Eptshois evol khen nifēou-i allēlouia. Esmou erof khen nēettshosi.\n\nEsmou erof nefaggelos tērou allēlouia. Esmou erof nefdunamis tērou.\n\n+ Esmou erof pirē nem piioh allēlouia. Esmou erof nisiou tērou ente piouōini.\n\nEsmou erof nifēou-i ente nifēou-i allēlouia. Nem nikemōou etsa epshōi ennifēou-i.\n\n+ Marou-esmou tērou e-efran em-Eptshois allēlouia. Je enthof afjos ouoh aushōpi.\n\nEnthof afhonhen ouoh ausōnt allēlouia. Aftahō-o eratou sha eneh nem sha eneh ente pi-eneh.\n\n+ Afkhō enouhōn ouoh ennefsini allēlouia. Esmou e-Eptshois evol khen epkahi.\n\nNi-edrakōn nem ninoun tērou allēlouia. Ou-ekhrōm oual oukhiōn ou-ekhrustallos ou-epneuma ensarathēou nēetiri empefsaji.\n\n+ Nitōou ettshosi nem nikalamfōou tērou allēlouia. Ni-eshshēn emfaioutah nem nishensifi tērou.\n\nNithērion nem nitebnōou-i tērou allēlouia. Nitshatfi nem nihalati etoi entenh.\n\n+ Niourōou ente epkahi nem nilaos tērou allēlouia. Niarkhōn nem nireftihap tērou ente epkahi.\n\nHankhelshiri nem hanparthenos allēlouia. Hankhelloi nem hanalōou-i.\n\n+ Marou-esmou tērou e-efran em-Eptshois allēlouia. Je aftshisi enje pefran emmauatf.\n\nPefouōnh evol shop hijen epkahi nem enehrēi khen etfe allēlouia. Efnatshisi emeptap ente peflaos.\n\n+ Ou-esmou ente nēethouab tērou entaf allēlouia. Nenshēri em-Pisraēl: pilaos et khent erof.\n\n(Psalmos 149)\n\nAllēlouia: allēlouia: allēlouia.\n\nJō em-Eptshois khen oujō emveri allēlouia. Je are pefesmou khen etekklēsia ente nēethouab.\n\n+ Marefounof enje Pisraēl ejen fē-etafthamiof allēlouia. Nenshēri en-Siōn marouthelēl ejen Pououro.\n\nMarou-esmou epefran ethouab khen oukhoros allēlouia. Khen oukemkem nem oupsaltērion marouerpsalin erof.\n\n+ Je Eptshois natimati ejen peflaos allēlouia. Efnatshisi enniremraush khen ououjai.\n\nEu-eshoushou emmōou enje nēethouab khen ou-ōou allēlouia. Eu-ethelēl emmōou hijen noumanenkot.\n\n+ Nitshisi ente Efnouti etkhē khen tou-eshvōvi allēlouia. Hansēfi enro-esnau etkhē khen noujij.\n\nE-epjiniri enoutshi-emepshish khen niethnos allēlouia. Nem hansohi khen nilaos.\n\n+ E-epjinsōnh enhanourōou khen hanpedēs allēlouia. Nem nēettaiēout entōou khen hanpedēs enjij emvenipi.\n\nE-epjiniri enkhētou enouhap efeskhēout allēlouia. Pai-ōou fai afshop khen nēethouab tērou entaf.\n\n(Psalmos 150)\n\n+ Allēlouia: allēlouia: allēlouia.\n\n+ Esmou e-Efnouti khen nēethouab tērou entaf allēlouia.\n\nEsmou erof khen pitajro ente tefjom allēlouia.\n\n+ Esmou erof e-ehrēi hijen tefmetjōri allēlouia.\n\nEsmou erof kata epashai ente tefmetnishti allēlouia.\n\n+ Esmou erof khen ou-esmē ensalpiggos allēlouia.\n\nEsmou erof khen oupsaltērion nem oukuthara allēlouia.\n\n+ Esmou erof khen hankemkem nem hankhoros allēlouia.\n\nEsmou erof khen hankap nem ouorganon allēlouia.\n\n+ Esmou erof khen hankumvalon enese tou-esmē allēlouia.\n\nEsmou erof khen hankumvalon ente oueshlēlou-i allēlouia.\n\n+ Nifi niven marou-esmou tērou e-efran em-Eptshois Pennouti allēlouia.\n\nDoksa Patri ke Uiō ke Agiō Epneumati allēlouia.\n\n+ Ke nun ke a-i ke is tous e-ōnas tōn e-ōnōn amēn allēlouia.\n\nAllēlouia: allēlouia. Doksa si o Theos ēmōn allēlouia.\n\n+ Allēlouia: allēlouia. Pi-ōou fa Pennouti pe allēlouia.',
            },
            {
              language: 'english',
              text: '+ Praise the Lord from the heavens Alleluia. Praise Him in the heights.\n\nPraise Him all His angels Alleluia. Praise Him all His hosts.\n\n+ Praise Him sun and moon Alleluia. Praise Him all you stars of light.\n\nPraise Him you heavens of heavens Alleluia. And you waters above the heavens.\n\n+ Let them praise the name of the Lord Alleluia. For He commanded and they were created.\n\nHe has ordered and they were created Alleluia. He has established them forever and ever.\n\n+ He has made a decree which shall not pass away Alleluia. Praise the Lord from the earth.\n\nYou great sea creatures and all the depths Alleluia. Fire and hail, snow and clouds, stormy wind fulfilling His word.\n\n+ Mountains and all hills Alleluia. Fruitful trees and all cedars.\n\nBeasts and all cattle Alleluia. Creeping things and flying birds.\n\n+ Kings of the earth and all people Alleluia. Princes and all judges of the earth.\n\nBoth young men and maidens Alleluia. Old men and children.\n\n+ Let them praise the name of the Lord Alleluia. For His name alone is exalted.\n\nHis glory is above the earth and heaven Alleluia. And He has exalted the horn of His people.\n\n+ The praise of all His saints Alleluia. The children of Israel, a people near unto Him.\n\n(Psalm 149)\n\nAlleluia, Alleluia, Alleluia.\n\nSing to the Lord a new song Alleluia. And His praise in the congregation of the saints.\n\n+ Let Israel rejoice in his Maker Alleluia. Let the children of Zion be joyful in their King.\n\nLet them praise His name in a chorus Alleluia. Let them sing praises unto Him with timbrel and harp.\n\n+ For the Lord takes pleasure in His people Alleluia. He will raise the meek with salvation.\n\nLet the saints be joyful in glory Alleluia. Let them sing aloud upon their beds.\n\n+ Let the high praises of God be in their mouth Alleluia. And a two edged sword in their hands.\n\nTo execute vengeance on the nations Alleluia. And punishments on the people.\n\n+ To bind their kings with chains Alleluia. And their nobles with fetters of iron.\n\nTo execute on them the written judgment Alleluia. This honor have all His saints.\n\n(Psalm 150)\n\n+ Alleluia, Alleluia, Alleluia.\n\n+ Praise God in all His saints Alleluia.\n\nPraise Him in the firmament of His power Alleluia.\n\n+ Praise Him for His mighty acts Alleluia.\n\nPraise Him according to the multitudes of His greatness Alleluia.\n\n+ Praise Him with the sound of the trumpet Alleluia.\n\nPraise Him with psaltery and harp Alleluia.\n\n+ Praise Him with timbrel and chorus Alleluia.\n\nPraise Him with strings and organs Alleluia.\n\n+ Praise Him with pleasant sounding cymbals Alleluia.\n\nPraise Him upon the cymbals of joy Alleluia.\n\n+ Let every thing that has breath praise the name of the Lord our God Alleluia.\n\nGlory be to the Father and the Son and the Holy Spirit Alleluia.\n\n+ Now and forever and unto the age of all ages Amen Alleluia.\n\nAlleluia, Alleluia. Glory to You, O our God Alleluia.\n\n+ Alleluia, Alleluia. Glory be to our God Alleluia.',
            },
            {
              language: 'englishArabic',
              text: '+ Sabbihou er-Rabb min es-samawat halleluia. Sabbihouhu fil-a\'ali.\n\nSabbihouhu ya jamee\' mala\'ikatih halleluia. Sabbihouhu ya jamee\' junoudih.\n\n+ Sabbiheehi ayyatuha esh-shams wal-qamar halleluia. Sabbiheehi ya jamee\' kawakib en-nour.\n\nSabbiheehi ya sama\' es-samawat halleluia. Wa ya ayyatuha el-miyah allati fawq es-samawat.\n\n+ Litusabbih jamee\'uha li-ism er-Rabb halleluia. Li-annahu qal fa-kanat.\n\nWa amar fa-khuliqat halleluia. Aqamaha ila el-abad wa ila abad el-abad.\n\n+ Wada\' laha amran fa-lan tatajawazahu halleluia. Sabbihi er-Rabb min el-ard.\n\nAyyatuha et-tananeen wa jamee\' el-a\'maq halleluia. En-nar wal-barad wath-thalj wal-jaleed war-reeh el-\'asifa es-sani\'a kalimatahu.\n\n+ El-jibal el-\'aliya wa jamee\' el-akam halleluia. El-ashjar el-muthmira wa kull el-arz.\n\nEl-wuhoush wa kull el-baha\'im halleluia. El-hawam wa kull et-tuyour dhat el-ajniha.\n\n+ Mulouk el-ard wa kull esh-shu\'oub halleluia. Er-ru\'asa\' wa kull hukkam el-ard.\n\nEsh-shubban wal-\'adhara halleluia. Esh-shuyoukh wes-subyan.\n\n+ Falyusabbihou jamee\'an ism er-Rabb halleluia. Li-annahu qad ta\'ala ismuhu wahdahu.\n\nShukruhu ka\'in \'ala el-ard wa fis-sama\' halleluia. Wa yarfa\' qarn sha\'bihi.\n\n+ Subhan li-jamee\' qiddiseeh halleluia. Bani Isra\'eel, esh-sha\'b el-qareeb ilayh.\n\n(El-Mazmour 149)\n\nHalleluia, halleluia, halleluia.\n\nUnshidou lir-Rabb nasheedan jadeedan halleluia. Li-anna tasbihatahu fi bee\'at el-qiddiseen.\n\n+ Falyafrah Isra\'eel bi-khaliqihi halleluia. Wa banou Sahyoun falyatahallalou bi-malikihim.\n\nFalyusabbihou ismahu el-quddous bi-saff halleluia. Bi-duff wa mizmar falyurattilou lahu.\n\n+ Li-anna er-Rabb yusarr bi-sha\'bihi halleluia. Yu\'li el-wuda\'a\' bil-khalas.\n\nYaftakhir el-qiddisoon bi-majd halleluia. Wa yatahallaloon \'ala madaji\'ihim.\n\n+ Ta\'liyat Allah fi hanajirihim halleluia. Wa suyouf dhat haddayn fi aydeehim.\n\nLi-yasna\'ou niqma fil-umam halleluia. Wa tawbeekhat fish-shu\'oub.\n\n+ Li-yuwaththiqou mulukahum bi-quyoud halleluia. Wa ashrafahum bi-aghlal lil-aydi min hadeed.\n\nLi-yasna\'ou bihim hukman maktouban halleluia. Hadha el-majd ka\'in fi jamee\' qiddiseeh.\n\n(El-Mazmour 150)\n\n+ Halleluia, halleluia, halleluia.\n\n+ Sabbihou Allah fi jamee\' qiddiseeh halleluia.\n\nSabbihouhu fi jald quwwatihi halleluia.\n\n+ Sabbihouhu \'ala maqdaratihi halleluia.\n\nSabbihouhu ka-kathrat \'azamatihi halleluia.\n\n+ Sabbihouhu bi-sawt el-bouq halleluia.\n\nSabbihouhu bil-mizmar wal-qeethar halleluia.\n\n+ Sabbihouhu bi-dufouf wa sufouf halleluia.\n\nSabbihouhu bi-awtar wa arghan halleluia.\n\n+ Sabbihouhu bi-sunouj hasanat es-sawt halleluia.\n\nSabbihouhu bi-sunouj et-tahleel halleluia.\n\n+ Kullu nasama falitusabbih ism er-Rabb ilahina halleluia.\n\nEl-majd lil-Ab wal-Ibn war-Rooh el-Qudus halleluia.\n\n+ El-an wa kulla awan wa ila dahr ed-duhour ameen halleluia.\n\nHalleluia, halleluia. El-majd lak ya ilahana halleluia.\n\n+ Halleluia, halleluia. El-majd li-ilahina halleluia.',
            },
            {
              language: 'arabic',
              text: '+ سبحوا الرب من السموات هلليلويا. سبحوه في الأعالي.\n\nسبحوه يا جميع ملائكته هلليلويا. سبحوه يا جميع جنوده.\n\n+ سبحيه أيتها الشمس والقمر هلليلويا. سبحيه يا جميع كواكب النور.\n\nسبحيه يا سماء السموات هلليلويا. ويا أيتها المياه التي فوق السموات.\n\n+ لتسبح جميعها لإسم الرب هلليلويا. لأنه قال فكانت.\n\nوأمر فخلقت هلليلويا. أقامها إلى الأبد وإلى أبد الأبد.\n\n+ وضع لها أمراً فلن تتجاوزه هلليلويا. سبحي الرب من الأرض.\n\nأيتها التنانين وجميع الأعماق هلليلويا. النار والبرد والثلج والجليد والريح العاصفة الصانعة كلمته.\n\n+ الجبال العالية وجميع الآكام هلليلويا. الأشجار المثمره وكل الأرز.\n\nالوحوش وكل البهائم هلليلويا. الهوام وكل الطيور ذات الأجنحة.\n\n+ ملوك الأرض وكل الشعوب هلليلويا. الرؤساء وكل حكام الأرض.\n\nالشبان والعذارى هلليلويا. الشيوخ والصبيان.\n\n+ فليسبحوا جميعاً إسم الرب هلليلويا. لأنه قد تعالى إسمه وحده.\n\nشكره كائن على الأرض وفي السماء هلليلويا. ويرفع قرن شعبه.\n\n+ سُبحاً لجميع قديسيه هلليلويا. بني إسرائيل، الشعب القريب إليه.\n\n(المزمور 149)\n\nهلليلويا، هلليلويا، هلليلويا.\n\nإنشدوا للرب نشيداً جديداً هلليلويا. لأن تسبحته في بيعة القديسين.\n\n+ فليفرح إسرئيل بخالقه هلليلويا. وبنوا صهيون فليتهللوا بملكهم.\n\nفليسِّبحوا إسمه القدوس بصفِ هلليلويا. بدف ومزمار فليرتلوا له.\n\n+ لأن الرب يُسر بشعبه هلليلويا. يعلي الودعاء بالخلاص.\n\nيفتخر القديسون بمجد هلليلويا. ويتهللون على مضاجعهم.\n\n+ تعليات الله في حناجرهم هلليلويا. وسيوف ذات حدين في أيديهم.\n\nليصنعوا نقمة في الأمم هلليلويا. وتوبيخات في الشعوب.\n\n+ ليوثقوا ملوكهم بقيود هلليلويا. وإشرافهم بأغلال للأيدي من حديد.\n\nليصنعوا بهم حُكماً مكتوباً هلليلويا. هذا المجد كائن في جميع قديسيه.\n\n(المزمور 150)\n\n+ هلليلويا، هلليلويا، هلليلويا.\n\n+ سبحوا الله في جميع قديسيه هلليلويا.\n\nسبحوه في جلد قوته هلليلويا.\n\n+ سبحوه على مقدرته هلليلويا.\n\nسبحوه ككثرة عظمته هلليلويا.\n\n+ سبحوه بصوت البوق هلليلويا.\n\nسبحوه بالمزمار والقيثار هلليلويا.\n\n+ سبحوه بدفوف وصفوف هلليلويا.\n\nسبحوه بأوتار وأرغن هلليلويا.\n\n+ سبحوه بصنوج حسنة الصوت هلليلويا.\n\nسبحوه بصنوج التهليل هلليلويا.\n\n+ كل نسمة فلتسبح إسم الرب الهنا هلليلويا.\n\nالمجد للآب والإبن والروح القدس هلليلويا.\n\n+ الآن وكل أوان وإلى دهر الدهور آمين هلليلويا.\n\nهلليلويا، هلليلويا. المجد لك يا إلهنا هلليلويا.\n\n+ هلليلويا، هلليلويا. المجد لإلهنا هلليلويا.',
            },
          ],
        },
        {
          id: 'annual-midnight-psali-watos-virgin-mary-21st',
          title: 'Psali (Watos) for St Mary, on the 21st of the Coptic Month',
          versions: [],
        },
      ],
    },
    midnightDay('sunday', 'Sunday', 'Sunday Psali (Adam)', 18, [sundayPsaliLordJesus, adamPsaliConclusion('sunday')], sundayTheotokiaTexts),
    midnightDay('monday', 'Monday', 'Monday Psali (Adam)', 9, [adamPsaliConclusion('monday')], mondayTheotokiaTexts),
    midnightDay('tuesday', 'Tuesday', 'Tuesday Psali (Adam)', 7, [adamPsaliConclusion('tuesday')], tuesdayTheotokiaTexts),
    midnightDay('wednesday', 'Wednesday', 'Wednesday Psali (Adam)', 7, [watosPsaliConclusion('wednesday')]),
    midnightDay('thursday', 'Thursday', 'Thursday Psali (Watos)', 9, [watosPsaliConclusion('thursday')]),
    midnightDay('friday', 'Friday', 'Friday Psali (Adam)', 7, [watosPsaliConclusion('friday')]),
    midnightDay('saturday', 'Saturday', 'Psali (Watos) for the Annunciation', 9, [watosPsaliConclusion('saturday')]),
  ];
}

// ---- Audio: Annual > Midnight Praises (Coptic recordings, also played with the English-Coptic text) ----
const midnightAudio: Record<string, string> = {
  'annual-midnight-first-canticle': 'midnight-first-canticle.mp3',
  'annual-midnight-first-canticle-lobsh': 'midnight-first-canticle-lobsh.mp3',
  'annual-midnight-sunday-theotokion-7': 'midnight-sunday-theotokion-7.mp3',
  'annual-midnight-second-canticle': 'midnight-second-canticle.mp3',
  'annual-midnight-second-canticle-lobsh': 'midnight-second-canticle-lobsh.mp3',
  'annual-midnight-third-canticle': 'midnight-third-canticle.mp3',
  'annual-midnight-esmou-epchois-melismatic': 'midnight-esmou-epchois-melismatic.mp3',
  'annual-midnight-arihoo-chasf': 'midnight-arihoo-chasf.mp3',
  'annual-midnight-fourth-canticle': 'midnight-fourth-canticle.mp3',
  'annual-midnight-greek-psali-watos': 'midnight-aripsalin.mp3',
  'annual-midnight-doxology-virgin-mary': 'midnight-doxology-virgin-mary.m4a',
};
for (const hymn of annualMidnight ? flattenHymns(annualMidnight.hymns) : []) {
  const audio = midnightAudio[hymn.id];
  if (!audio) continue;
  for (const version of hymn.versions) {
    if (version.language === 'coptic' || version.language === 'englishCoptic') {
      version.audio = audio;
    }
  }
}
