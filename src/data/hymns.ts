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
}

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
        { language: 'englishCoptic', text: `Kyrie eleison response ${num} for ${serviceName}` },
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
            text: 'Kyrie eleison.\n\nTenouosht m-Efiot nem Epshiri: nem Pipnevma ethouab: Ti-Trias ethouab: n-omoousios.\n\nShere ti-ekklisia: pi-e nte ni-angelos: shere ti-parthenos: eta-smes Pensotir.\n\nShere ne Maria: ti-vropi ethnesos: thi-etasmisi nan: m-Efnouti pi-logos.\n\nShere ne Maria: khen ou-shere ef-ouab: shere ne Maria: thmav m-Ef-nethouab.\n\nShere Mikhail: pi-nishti n-arshiangelos: shere Gabriel: pi-sotp m-pi-refhishennoufi.\n\nShere Mikhail: pi-nishti n-arshiangelos: shere pi-arshistratigos: n-te tfe n-nifioui.\n\nShere ni-Cheroubim: shere ni-Serafim: shere ni-tagma tiroy: n-epouranion.\n\nShere Ioannis: pi-nishti m-Prodromos: shere pi-ouib: p-syngenis n-Emmanouil.\n\nShere na-vois n-ioti: n-apostolos: shere ni-mathitis: nte Pen-Chois Iisous Pi-Christos.\n\nTenouosht m-pi-martyros: shere pi-evangelistis: shere pi-apostolos: Abba Markos pi-theorimos.\n\nShere nak o pi-martyros: shere pi-shoish n-sennios: shere pi-athloforos: pa-Chois p-ouro Georgios.\n\nShere nak o ni-martyros: shere pi-shoish n-sennios: shere pi-athloforos: Filopatir Merkourios.\n\nShere nak o pi-martyros: shere pi-shoish n-sennios: shere pi-athloforos: pi-agios Abba Mina.\n\nOuoniatk khen ou-methmi: Peniot ethouab m-Patriarchis: Papa Abba Kyrillos pi-mahsoou: pi-menrit nte Pi-Christos.\n\nOuoniatk khen ou-methmi: peniot ethouab n-dikeos: Abba Abraam pi-episkopos: pi-menrit nte Pi-Christos.\n\nShere nak o Ef-nethouab: pi-menrit nte Pi-Christos: peniot Pishoi Kamel: pi-hegoumenos.\n\nTento erok o P-shiri m-Efnouti: ethrekareh e-p-onkh: m-pen-patriarchis: Papa Abba (...) pi-archiereos: matagrof hijen pef-thronos.\n\nNem pef-keshfir n-litourgos: peniot ethouab n-dikeos Abba (...) pi-episkopos (pi-mitropolitis): matagrof hijen pef-thronos.\n\nHiten ni-presvia: nte Ti-Theotokos ethouab Maria: P-Chois arihmot nan: m-pi-kho evol nte nen-novi.\n\nEthrenhos erok: nem Pekiot n-agathos: nem Pipnevma ethouab: je aki aksoti mmon nai nan.',
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
            text: 'Smou Efnouti khen ni-ethouab tiroy al.\nSmou erof khen pe-tagro nte tef-gom al.\nSmou erof kheteriy hijen tef-metjori al.\nSmou erof kata p-shoi nte tef-met-nishti al.\nSmou erof khen ou-soni n-salpigos al.\nSmou erof khen ou-psalterion nem ou-ktara al.\nSmou erof khen han-kymbalon nem han-choros al.\nSmou erof khen han-kap nem organon al.\nSmou erof khen han-kymbalon enese totson al.\nSmou erof khen han-kymbalon nte ou-suleloui al.\nP-nifi niben marou-smou tiroy e-fran m-p-chois Pen-nouti al.\nDoxa Patri ke I-o ke Agio Pneumati al.\nKe nun ke ae ke istis eonas ton eonon: amini al.\nAl. al. Doxa si o Theos imon al.\nAl. al. Pi-ou fa Pen-nouti pe al.\nIesous Pi-christos P-shiri m-Efnouti sotem eron ouoh nai nan.\nKemarout alithos: nem Pek-iot n-agathos: nem Pi-pneumatis ethouab: je ak-i ak-soti mmon.',
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
            text: 'Pi-oik nte p-onth: et-a-i e-pesit: nan e-bol khen t-phe: a-fti m-p-onth m-pi-kosmos.\n\nNtho hoi Maria: a-ref-a-i khen te-neji: m-pi-Manna n-no-hiton: et-a-i e-bol khen P-iot.\n\nAre-massou achne tholeb: a-fti nan m-pefsoma: nem pefsnof et-tai-hiout: anonh sha eneh.\n\nSe-taounou harok: nje ni-Cheroubim: nem ni-Seraphim: se-shnay e-rok an.\n\nTen-nay e-rok m-mii: hijen pi-man-er-shooushi: ten-chi e-bol khen pek-soma nem pek-snof et-tai-hiout.\n\nEthbe fai ten-chisi: mmo aksios khen han-hymnologia: m-prophetikon.\n\nJe a-u-saji ethbit: n-han hbyouit eu-tai-hiout t-baki ethouab n-te pi-nishti n-Ouro.\n\nTen-ti-ho ten-towbh: e-thren-shashni e-u-nai: hijen ni-presia: n-totf m-pi-ma-i-romi.\n\nHijen ni-presia n-te ti-Theotokos ethouab Maria: P-chois ari-hmot nan m-pi-ko e-bol n-te nen-nobi.\n\nHijen ni-presia n-te ni-arch-angelos ethouab Michael nen Gabriel: P-chois ari-hmot nan m-pi-ko e-bol n-te nen-nobi.',
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
        { language: 'englishCoptic', text: `Apostolos ni-angelos ${num} - (Phonetic English Coptic)` },
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
        text: 'Nek-nai o Panouti: han-atchiepi emmoou: se-osh emasho: enje nek-metshenhit.\n\nNi-teltili emmounhoou: se-ehp entotk tirou: pi-kesho ente ef-iom: se-khi nahren nek-val.\n\nIe aur mallon: ni-novi ente ta-psychi: nai ethouonh evol: empek-mtho Pachois.\n\nNi-novi etai-atou: Pachois ennek-erpou-meui: oude empert-hthek: enaa-nomia.\n\nJe pi-telonis ak-sotpf: ti-porni ak-soti emmos: pi-soni et-saoui-nam: Pachois ak-erpef-meui.\n\nAnok ho Pachois: kha pi-ref-er-novi: mat-savoi entai-ri: en-ou-metanoia.\n\nJe khouosh ef-mou an: em-pi-ref-er-novi: em-fri-ti ente-f-tastho-f: ente-sonkh enje tef-psychi.\n\nMat-astho-n Efnouti: e-khoun e-pek-oujai: ari-oui neman: kata tek-met-agathos.\n\nJe entok ou-agathos: ouoh en-naeet: marou-tahon en-khólem: enje nek-metshenhit.\n\nShenhit kharon tiren: Pchois Efnouti Pen-soter: ouoh nai nan: kata pek-nishti en-nai.\n\nNai ki-ri em-pou-meui: o Pen-neb Pi-Christos: eke-shopi khen ten-mhti: ek-osh evol ek-jo emmos.\n\nJe ta-hirini anok: ti-ti emmos nowten: t-hirini em-Paiot: ti-kho emmos nemoten.\n\nP-ouro ente ti-hirini: moi nan ente-k-hirini: semni nan ente-k-hirini: kha nen-novi nan evol.\n\nJor evol en-ni-jaji: ente ti-ekklisia: ari-sovt e-ros: en-nes-kim sha eneh.\n\nEmmanouil Pen-nouti: khen ten-mhti ti-nou: khen p-ouo-ou ente Pef-iot: nem Pi-pnevma ethouab.\n\nEnte-f-smou e-ron tiren: ente-f-toubo en-nen-hit: ente-f-talcho en-ni-shoni: ente nen-psychi nem nen-soma.\n\nTen-ou-osht emmok o Pi-Christos: nem Pek-iot en-agathos: nem Pi-pnevma ethouab: je (ak-tonk / ak-i) ak-soti emmon.',
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
          text: 'Khen Pi-Christos Iesous Pen-Chois: amen allelouia.\n\nShere ne ten-tho ero: o Theotokos esmeh n-osou: etoi n-parthenos n-siou niven: ti-masnouti thmav m-Pi-Christos.\n\nAnioti n-ten-prosevchi: ep-shoi ha pef-shiri m-merit: nte-f-kha nen-novi nan evol.\n\nShere thi-etasmisi nan: m-pi-ouoini nta-fmi: Pi-Christos Pen-nouti: ti-parthenos ethouab.\n\nMatho m-Pchois ekhrii ejon: nte-f-erounai nem nen-psychi: nte-f-kha nen-novi nan evol.\n\nTi-parthenos Maria: ti-Theotokos ethouab: ti-prostatis eten-hot: nte pi-genos nte ti-met-romi.\n\nAri-presvin ekhrii ejon: nahren Pi-Christos: fi-eta-rekh-fof: hopos nte-f-er-hmot nan m-pi-kho evol nte nen-novi.\n\nShere ne o ti-parthenos: ti-oro m-mi n-alithini: shere p-shoushou nte pen-genos: are-khfo nan n-Emmanouil.\n\nTen-tho ari-pen-meui: o ti-prostatis eten-hot: nahren Pen-Chois Iesous Pi-Christos: nte-f-kha nen-novi nan evol.',
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
          text: 'Wouniats entho Maria: ti-save ouoh en-semne: ti-mahsenouti en-eskini: pi-aho em-pnevmatikon.\n\nTi-vrompshal en-kathoros: thi eta-smout khen pen-kahi: ouoh as-tiri nan evol: en-oukarpos ente pi-pnevma.\n\nPi-pnevma em-parakliton: fi eta-fi ejen pef-shiri: hijen ni-mo-ou ente pi-Iordanis: kata ep-typos en-Noe.\n\nTi-vrompi gar ete thmav: entos as-hishennoufi nan: en-ti-hirini ente Efti: thi eta-shopi sha ni-romi.\n\nEntho ho-i o ten-helpis: ti-vrompshal en-noiti: are-ini em-pinai nan: are-oli kharof khen tene-ji.\n\nEte fai pe Isous: pi-misi evolkhen Efiot: aumasf nan evol enkhit: af-er pen-genos en-remhe.\n\nFai gar maren-taouof: evolkhen pen-hit enshorp: menensos on khen pen-las: enosh evol en-jo emmos.\n\nJe Pen-Chois Isous Pi-Christos: mathamio nak enkhri enkhiten: en-ouerfei ente pek-pnevma ethouab: er-ti-doxologia nak.\n\nShere ne o ti-parthenos: ti-ouro emmi en-alithini: shere ep-shoushou ente pen-genos: are-kfo nan en-Emmanouil.\n\nTentho aripenmevi: o ti-prostatis eten-hot: nahren Pen-Chois Isous Pi-Christos: entef-kha nen-novi nan evol.',
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
          text: 'Mikhail pi-arkhon en-na niphi-oui: entof etoi en-shorp: khen ni-taxis en-angelikon: ef-shemshi em-pemtho em-Epchois\\n\\nShare Efti ouorp nan: en-nef-nai nem nef-met-shenhit: hiten ni-tho ente Mikhail: pi-nishti en-arkhiangelos\\n\\nShartok evol enje ni-karpos: hiten nen-tobh em-Mikhail: je entof et-khent ekhoun e-Efti: ef-tiho ekhri ejon\\n\\nTaio niven ethnanev: nem doron niven etjik evol: eunioun nan evol em-epshoi: hiten Efiot ente ni-ou-oini\\n\\nMarenhos entento-ou: entenouosht en-ti-trias ethouab: etoi en-omoousios: ethmin evol sha eneh\\n\\nAri-presvin ekhri ejon: o pi-arkhiangelos ethouab: Mikhail pi-arkhon enna niphi-oui: entef-kha nen-novi nan evol',
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
          text: 'Shashf en-arkhiangelos: se-ohi eratou eterhtmos: em-pemtho em-pi-Pantokrator: eu-shemshi em-pi-mysterion et-hip\\n\\nMikhail pe pi-hoit: Gabriel pe pi-mahvesnav: Rafael pe pi-mahshomt: kata ep-typos en-ti-trias\\n\\nSouriel Sedakiel: Sarathiel nem Ananiel: nai-nishti en-refe-ro-ouini ethouab: ni-eto-tobh emmof ekhri ejen pi-sont\\n\\nNi-Cheroubim nem ni-Serafim: ni-throno ni-metjois ni-jom: pi-eftoou en-zoon en-asomatos: et-fai kha pi-harma en-Theos\\n\\nPi-jout eftoou em-presvyteros: khen ti-ekklisia ente ni-shorp em-misi: eu-hos erof khen ou-metatmounk: eu-osh evol eu-jo emmos\\n\\nJe agios o Theos: ni-etshoni mataltjo-ou: agios Ischyros: ni-etau-enkot Epchois mamton no-ou\\n\\nAgios Athanatos: esmou eteklironomia: mare pek-nai nem tek-hirini: oi en-sovt em-pek-laos\\n\\nJe khouab khouab: khouab Epchois Sabaoth: Etfe nem epkahi meh evol: khen pek-o-ou nem pek-taio\\n\\nAre-shan-jos em-pi-alliloui-a: share nan niphi-oui o-osh emmo-ou: je agios amin Alliloui-a: pi-o-ou fa Pennouti pe\\n\\nAri-presvin ekhri ejon: ni-stratia en-angelikon: nem ni-tagma en-epouranion: entef-kha nen-novi nan evol',
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
          text: 'Kyrios Isous Pi-Christos: afsotp en-nef-apostolos: ete Petros nem Andreas: Ioannis nem Iakovos\\n\\nLoipon Filippos nem Matheos: Vartholomeos nem Thomas: Iakovos ente Alfeos: nem Simon pi-kananeos\\n\\nThaddeos nem Matthias: Pavlos nem Markos nem Loukas: nem epsepi ente ni-mathitis: ni-etau-moshi ensa Pen-Sotir\\n\\nMatthias fi-etafshopi: entshevio en-Ioudas: nem epkhok evol nem epsepi: ni-etau-moshi ensa Despota\\n\\nApoutehro-ou shenaf evol: hijen epho em-epkahi tirf: ouoh nou-saji auphoh: sha au-rijs en-ti-ikoumeni\\n\\nTobh em-Epchois ekhri ejon: o naghois enioti en-apostolos: nem pi-ovesnav em-mathitis: entef-kha nen-novi nan evol',
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
          text: 'Markos pi-apostolos: ouoh pi-evangelistis: pi-methre kha ni-kahi: ente pi-monogenis Nnouti\\n\\nAki akerouoini eron: hiten pek-evangelion: ak-tsavon em-Efiot nem Epshiri: nem pi-Pnevma ethouab\\n\\nAkenten evolkhen epkhaki: ekhoun epi-ouoini emmi: aktemmon em-piok ente eponkh: etafi epeset evolkhen Etfe\\n\\nAus-mou enkhri enkhitk: enje ni-fili tirou ente epkahi: ouoh nek-saji auphoh: sha au-rijs en-ti-ikoumeni\\n\\nShere nak o pi-martyros: shere pi-evangelistis: shere pi-apostolos: Abba Markos pi-theorimos\\n\\nTobh em-Epchois ekhri ejon: o pi-theorimos en-evangelistis: Abba Markos pi-apostolos: entef-kha nen-novi nan evol',
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
          text: 'Shomt enran etkhen niphi-oui: entok ak-erforin emmo-ou: pi-theorimos en-evangelistis: Abba Markos pi-apostolos\\n\\nAk-erforin em-pishomt en-khlom: pishomt enran etjik evol: ete fai pe Efiot nem Epshiri: nem pi-Pnevma ethouab\\n\\nEntok ou-apostolos: entok on ou-martyros: entok on pe pi-mahvesnav: en-sotp en-evangelistis\\n\\nNek-keshfir en-apostolos: se-shoushou emmo-ou ekhri ejok: ouoh nek-saji au-fo: sha au-rijs enti-ikoumeni\\n\\nSe-shoushou emmo-ou enkhri enkhitk: enje ni-etakto khou hijen pi-kahi: khen tikhora tirs en-Khimi: au-tiri evol eu-tkarpos\\n\\nTobh em-Epchois ekhri ejon: o pi-theorimos en-evangelistis: Abba Markos pi-apostolos: entef-kha nen-novi nan evol',
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
          text: 'Filopatir Merkourios: pi-remenjom ente Epchris: af-ti-hiotf en-ti-panoplia: nem pi-jok tirf ente pinahti\\n\\nOuoh af-tji khen tefji: en-ti-sefi en-rojnav: thi-eta pi-angelos ente Epchois: tahros khen tefji en-ouinam\\n\\nAf-she naf epi-polemos: khen tijom ente Epchris: af-shari eni-varvaros: khen ou-nishti en-ershot\\n\\nAf-ernifin evolkha na epkahi: ouoh af-kot enna niphi-oui: af-khoki khen pi-stadion: ente ti-met-martyros\\n\\nAf-tishipi en-Dekios: pi-ouro en-asevis: hiten tefnishti en-hypomoni: nem epshiji ente ni-vasanos\\n\\nKhen nai af-erforin: em-pi-khlom en-atlom: ente ti-met-martyros: af-ersha-i nem ni-ethouab tirou khen tikhora ente ni-eton-kh\\n\\nShere nak o pi-martyros: shere pi-shoish ensennios: shere pi-athloforos: Filopatir Merkourios\\n\\nTobh em-Epchois ekhri ejon: o pi-athloforos em-martyros: Filopatir Merkourios: entef-kha nen-novi nan evol',
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
          text: 'Eshop oun ente pi-romi: jem-hiou em-pi-kosmos tirf: entef-ti-osi entef-psychi: ou pe pai onkh en-eflio-u\\n\\nPi-agios Abba Mina: af-sotem ensa ti-esmi en-Nouti: af-kho em-pi-kosmos tirf ensof: nem pef-o-ou eth-natako\\n\\nAf-ti entef-psychi e-efmou: nem pef-soma e-pi-khrom: af-shep han-nishti em-vasanos: ethve Epshiri em-Efti eton-kh\\n\\nEthve fai a-pen-Sotir: olf ekhoun e-tef-metouro: af-ti-naf en-ni-agathon: ni-ete em-pevalnau erou\\n\\nShere nak o pi-martyros: shere pi-shoish ensennios: shere pi-athloforos: pi-agios Abba Mina\\n\\nTobh em-Epchois ekhri ejon: o pi-athloforos em-martyros: pi-agios Abba Mina: entef-kha nen-novi nan evol',
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
          text: 'Papa Abba Kyrillos pi-mahsoou: Pi-makarios khen oumethmi: Fi-etaf-tajron em-pinahti: en-orthodoxos entafmi\\n\\nOu-ran enshoushou pe pek-ran: o pi-monakhos ettouviout: Pi-mandritis et-tajriout: en-nianakhoritis\\n\\nEthve fai ak-shopi nan: en-outypos khen epsaji: khen ti-agapi khen pi-jinmoshi: khen pi-touvo khen Efnahti\\n\\nShere pi-mai-nef-shiri: Fi-etaftalcho en-ni-etshoni: Af-erirp-hiten en-ni-shfiri: Ouoh ni-demon af-hitou evol\\n\\nFesmarout enje pek-vios: o penioit em-makarios: Ak-tastho nan em-pi-soma en-Abba Markos: ouoh akiri em-pi-Myron ethouab\\n\\nMaria ti-masnouti: as-ouonh khen ou-nishti en-shfiri: nem ni-jrompi nem ni-sthinoufi: khen tese-ekklisia khen Zeitoun\\n\\nAk-kot en-ou-makathedra emveri: nem pi-nishti en-avhit en-Abba Mina: nem han-mish en-ekklisia: pek-hit empef-tjisi nahri e-eptirf\\n\\nShak-tonk em-fenau enshorp: khen tekjom nem nek-shoni: ethrek-hos nem ni-angelos: nem ni-ethouab etek-menritou\\n\\nTinou ari-penmevi: nahren Pennouti: ethrefjok nan evol em-pekrifti: khen ti-agapi khen Efnahti\\n\\nTobh em-Epchois ekhri ejon: Penioit ethouab em-patriarkhis: Papa Abba Kyrillos pi-mahsoou: entef-kha nen-novi nan evol',
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
          text: 'Akji Etcharis em-Moisis: ti-metouib ente Melchisedek: akji em-paio em-penioit Markos: fi-etafhio-ish nan\\n\\nA-Epchris talo entefji en-ouinam: ejen tek-afe: af-ten-khoutk e-ni-shosht: ente ti-metouro en-niphi-oui\\n\\nEthrek-shopi en-ourefshemshi: sapshoi en-ti-ekklisia: ethrek-amoni em-pek-laos: khen outoubo nem oumethmi\\n\\nKata efriti etaf-jos: enje Pavlos pi-apostolos: je kata efriti em-Melchisedek: pai-riti hof em-Epchris\\n\\nOsautos ten-tiosi emmok: nem pi-refer-psalin David: je entok pe pi-ouib sha eneh: kata ti-taxis em-Melchisedek\\n\\nTobh em-Epchois ekhri ejon: Penioit ethouab em-patriarkhis: Papa Abba (...) Pi-arkhiereus: entef-kha nen-novi nan evol\\n\\nTobh em-Epchois ekhri ejon: Penioit ethouab en-dikeos: Abba (...) Pi-episkopos (Pi-mitropolitis): entef-kha nen-novi nan evol',
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
          text: 'Shopi entho ere soms ejon: khen ni-ma etjosi etere khi enkhitou: o Ten-o\'s ennev tiren: ti-Theotokos etoi em-parthenos ensiou niven\\n\\nMatho em-Fi eta-remasf: Pen-Sotir en-agathos: entef-oli en-nai-khisi evolkharon: entef-semni nan entef-hirini\\n\\nShere ne o ti-parthenos: ti-ouro emmi en-alithini: shere ep-shoushou ente pen-genos: are-kfo nan en-Emmanouil\\n\\nTentho are-penmevi: o ti-prostatis eten-hot: nahren Pen-Chois Isous Pi-Christos: entef-kha nen-novi nan evol',
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
          text: 'Efti efeshenhit kharon efesmou eron: efeouonh empefho ekhri ejon ouoh efenai nan\\n\\nEpjinsouen empekmoit hijen epkahi: nem pekoujai khen ni-ethnos tirou',
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
          text: 'Marou-jasf khen ti-ekklisia ente pef-laos\\n\\nOuoh marou-smou erof hi ti-kathedra ente ni-presvyteros\\n\\nJe af-kho en-ou-metiot em-efriti en-hanesouou\\n\\nEu-enav enje ni-etsouton ouoh eu-eounof\\n\\nAf-ork enje Epchois ouoh en-nef-ouom en-khitf\\n\\nJe entok pe Efouib sha eneh kata ti-taxis em-Melchisedek\\n\\nEpchois sa-ouinam emmok Penioit ethouab em-patriarkhis Papa Abba (...)\\n\\nNem penioit en-episkopos (em-mitropolitis) Abba (...)\\n\\nEpchois efe-areh etek-metonkh (e-peten-onkh) Al-',
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
          text: 'Marenouosht em-Pensotir: pi-mairomi en-agathos: je entof af-shenhit kharon: afi ouoh af-sot emmon\\n\\nAri-presvin ekhri ejon: o tenjois ennev tiren ti-Theotokos: Maria thmav em-Pensotir: entef-kha nen-novi nan evol\\n\\nTobh em-Epchois ekhri ejon: o pi-athloforos em-martyros: Filopatir Merkourios: entef-kha nen-novi nan evol\\n\\nJe fesmarout enje Efiot nem Epshiri: nem pi-Pnevma ethouab: ti-trias etjik evol: ten-ouosht emmos ten-ti-o-ou nas',
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
          text: 'Ksmarwout alithos, nem Pekiot en-agathos, nem Pi-Pnevma ethouab, je aki aksoti emmon.\\n\\nHiten ni-evchi ente penioit ettaiout en-arshierevs papa Abba (nim), Epchois arihmot nan, empikho evol ente nen-novi.\\n\\nHiten ni-evchi ente penioit ettaiout en-arshierevs papa Abba (nim) nem penioit em-mitropolitis (en-episkopos) Abba (nim), Epchois arihmot nan, empikho evol ente nen-novi.',
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
          text: 'Tenouosht em-Efiot ente pi-ou-oini, nem Pef-shiri em-monogenis, nem Pi-Pnevma em-Paraklitos, Ti-trias en-omoousios.',
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
          text: 'Shere Maria ti-ouro, ti-vo en-aloli en-ater-hello, thi-ete empe ouoi erouo eros, aujem Pi-smah ente ep-onkh en-khits.\\n\\nEpshiri em-Efnouti khen ou-methmi, afjisarx khen ti-parthenos, asmisi emmof afsoti emmon, afkha nen-novi nan evol.\\n\\nAre-jem ou-hmot o ti-shelet, hanmish au-saji e-petaio, je api-logos ente Efiot i, afjisarx evol en-khiti.\\n\\nNim en-eshimi et hijen pikahi, aser-mav em-Efnouti evil ero, je entho ou-eshimi en-remenkahi, are-ermav em-pi-refsont.\\n\\nA-oumish en-eshimi jitaio, aushashni e-tmetouro, alla emp-oushokh e-petaio, thi-ethnesos khen ni-eshiomi.\\n\\nEntho gar pe pi-pyrgos etjosi, etaujem Pi-anami en-khitf, ete Fai pe Emmanouil, etafi afshopi khen tenexi.\\n\\nMaren-taio en-ti-parthenia, ente ti-shelet en-at-kakia, ti-katharos em-panagia, ti-Theotokos Maria.\\n\\nAre-jisi e-hote et-fe, te-taiout e-hote ep-kahi, nem sont niven ete en-khitf, je are-ermav em-pi-refsont.\\n\\nEntho gar alithos, pima en-shelet en-katharos, ente Pi-Christos pi-nymfios, kata ni-esmi em-profitikon.\\n\\nAri-presvin ekhri ejon, o tenjois ennev tiren ti-Theotokos, Maria thmav em-Pi-Christos, entef-kha nen-novi nan evol.',
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
          text: 'A pinav shopi kha nimish evol. Mare nisakh firi evol: mare nisofos thoouti sharon: ev-erminevin khen ni-egrafi ethouab.\\n\\nEre pi-esmou enti-Trias ethouab: Efiot nem Epshiri nem Pi-Epnevma ethouab.\\n\\nEre pi-esmou enti-Theotokos: Maria thmav en-Iisous Pikhristos.\\n\\nEre pi-esmou...\\n\\nEfei ehri ejen pai-laos tirf ev-oujai khen Epchois. Je amin ese-shopi.',
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
          text: 'Allilouia. Je efmevi en-ouromi ef-e-ouonh nak evol Epchois: ouoh epsojp ente oumevi ef-e-ershai nak. Nithysia niprosfora shopou erok. Allilouia.',
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
          text: 'Ni-savev ti-roo ente Pi-esraeel, ni-eterhob e-ni-kab ennob, ma-thameio eno-esh-ten ente A-aron, kata eptaio enti-met-oweb,\\n\\nEmpeniot et-taiot en-arshi-erevs papa Avva (Theodoros), pi-minreet ente Pi-khrestos.',
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
          text: 'Sotis amen: ke to epnevmati sou.',
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
          text: 'Tay-shory ennob enka-tharos etfai kha pi-aro-mata, etkhen nen-jeeg en-A-aron pi-oweeb eftale oo-estoi-nofi e-epshoi ejen pima en-ersho-oshi.',
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
          text: 'Tee-shory ennob te ti-Parthenos, pes-aro-mata pe pen-Soteer, asmisi emmof, afsoti emmon, owoh ka nen-novi nan e-vol.',
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
          text: 'Hiten ni-epresvia: ente ti-Theotokos ethowab Maria: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(For the Commemoration of Archangel Gabriel, the Feast of the Annunciation, and the month of Koiahk)\n\nHiten ni-epresvia ente pi-arshee-angelos ethowab Gabriel pi-fai-shen-noufi: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\nHiten ni-epresvia ente pi-shashf en-arshee-angelos nem ni-taghma en-eporanion: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\nHiten ni-evshee ente nachois en-iotee en-apostolos nem ep-sepi ente ni-matheetees: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\nHiten ni-evshee ente pi-theoreemos en-evangelistees Markos pi-apostolos: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\nHiten ni-evshee ente pi-athloforos em-martyros pachois ep-ouro Georgios: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(For the Commemoration of St. Philopater Mercurius)\n\nHiten ni-evshee ente pi-athloforos em-martyros Philopateer Merkourios: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(For the Commemoration of St. Mena)\n\nHiten ni-evshee ente pi-athloforos em-martyros apa Meena ente ni-fai-at: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(For the Commemoration of Abba Abraam Bishop of Fayoum)\n\nHiten ni-evshee: ente peniot ethowab en-dikeos: Avva Avraam pi-episkopos: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(For the Commemoration of Pope Kyrillos the 6th)\n\nHiten ni-evshee: ente peniot ethowab em-patriarkhees: Avva Kyrillos pi-mah-soo: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(The verse for the saint of the church is added here, if not already mentioned above)\n\nHiten ni-evshee ente nee-ethowab ente pai-ehoo-ou pi-ouai pi-ouai kata pef-ran: Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\nHiten nou-evshee areh e-ep-onkh em-peniot ettai-ooet en-arshee-erefs papa Avva (...): Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\nHiten nou-evshee areh e-ep-onkh em-peniot ettai-ooet en-dikeos Avva (...) pi-episkopos (pi-meetropolitees): Epchois ari-ehmot nan: em-pi-kho evol ente nen-novi.\n\n(On standard days of the year and on fasting days)\n\nTen-ou-osht emmok o Pikhristos: nem Pek-iot en-agathos: nem Pi-epnevma ethowab: je aki aksoti emmon nai nan.',
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
          text: 'Pi-ehmot gar em-Penchois Iesous Pikhristos: ef-e-shopi nem pek-agion em-epnevma: pachois en-iot ettai-ooet en-arshee-erefs papa Avva (...).\n\nNem peniot em-meetropolitees Avva (...).\n\nNem peniot en-episkopos Avva (...).\n\nMare pi-kleeros: nem pi-laos teerf: ouchai khen Epchois: je amen es-eshopi.',
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
          text: 'A pet-jeek evol enje pi-esmou tou Logou Pef-iot: i af-chi-sarx hos romi en-teleios.\n\nDoxa Patri ke Eyo ke Agio Epnevmati.\n\nA pet-khel-kholf nav erof: a pet-khel-kholf shop nemoten: a pet-khel-kholf ashf hijen pi-stavros.\n\nKe nyn ke a-ee ke is tous e-onas ton e-onon. Amen.\n\nThai te ti-nou ete: thai te ti-seveeros: ti-proskyneesis to mono Khristos.\n\nEre pi-esmou ente ti-Trias ethowab (2): Efiot nem Epsheeri nem Pi-epnevma ethowab.\n\nEre pi-esmou ente ti-Theotokos (2): Maria ethmav en-Iesous Pikhristos.\n\nEre pi-esmou em-pen-patriarkhees (2): en-iot ettai-ooet en-arshee-erefs papa Avva (...).\n\nEre pi-esmou em-pen-meetropolitees: en-iot ettai-ooet Avva (...).\n\nEre pi-esmou em-pen-episkopos: en-iot ettai-ooet Avva (...).\n\nEv-ei e-ehree ejen pai-laos teerf: je amen es-eshopi.\n\nKatholikon: katholikon.',
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
          text: 'Shere ne Maria: ti-ehrompi eth-nesos: thee-etas-misi nan: em-Efnouti pi-Logos.\n\nEk-esmaro-out aleethos: nem Pek-iot en-agathos: nem Pi-epnevma ethowab: je aki aksoti emmon nai nan.',
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
          text: 'Agios o Theos: Agios isk-yros: Agios athanatos: o ek parthenou gennetheis: eleison imas.\n\nAgios o Theos: Agios isk-yros: Agios athanatos: o stavrotheis di imas: eleison imas.\n\nAgios o Theos: Agios isk-yros: Agios athanatos: o anastas ek ton nekron ke anelthon is tous ouranous: eleison imas.\n\nDoxa Patri ke Eyo ke agio Pnevmati: ke nyn ke a-ee ke is tous e-onas ton e-onon: amen. Agia Trias eleison imas.',
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
      text: 'Oo-oo-niatou khen oumethmee: nee-ethowab ente pai-ehoo-ou: pi-ouai pi-ouai kata pef-ran: ni-menrati ente Pikhristos.\n\nAri-epresvevin e-ehree ejon: o tenchois enneeb teeren ti-Theotokos: Maria ethmav em-pen-Soteer: entef-ka nen-novi nan evol.\n\nTovh em-Epchois e-ehree ejon: o pi-athloforos em-martyros: Philopateer Merkourios: entef-ka nen-novi nan evol.\n\nJe ef-esmaro-out enje Efiot nem Epsheeri: nem Pi-epnevma ethowab: ti-Trias et-jeek evol: ten-ou-osht emmos ten-ti-o-oo nas.',
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
      text: 'Hiten ni-epresvia ente ti-Theotokos ethowab Maria: Epchois ari-ehmot nan em-pi-kho evol ente nen-novi.\n\nTen-ou-osht emmok o Pikhristos: nem Pek-iot en-agathos: nem Pi-epnevma ethowab: je aki aksoti emmon.\n\nEleos irinis: thysia enesios.',
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
  'Tobh hina ente Efnouti nai nan: entef-shenhit kharon: entef-sotem eron: entef-erbo-ithin eron: entef-chi enni-tiho nem ni-tobh ente nee-ethowab entaf: entotou e-ehree ejon e-pi-agathon en-seou niven: ☩ entef-kha nen-novi nan evol.';
const prayForMercyEnglish =
  'Pray that God may have mercy and compassion on us, hear us, help us, and accept the supplications and prayers of His saints, for that which is good on our behalf at all times ☩ and forgive us our sins.';
const prayForMercyEnglishArabic =
  'Utlubu likay yarhamana Allah, wa yatara\'af \'alayna, wa yasma\'na, wa yu\'eenana, wa yaqbal su\'alat wa talabat qiddiseeh minhum bis-salah \'anna fi kulli heen ☩ wa yaghfir lana khatayana.';
const prayForMercyArabic =
  'اطلبوا لكي يرحمَنا الله، ويتراءف علينا، ويسمعنا، ويعيننا، ويقبلَ سؤالات وطلبات قديسيه منهم بالصلاحِ عنا في كلِّ حينٍ ☩ ويغفرَ لنا خطايانا.';

// Added when the Pope or a bishop is present; Coptic and English are the same in every service
const popeBishopCoptic = 'ⲛ̀ⲧⲉϥⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲛⲉⲙ ⲡ̀ⲧⲁϩⲟ ⲉ̀ⲣⲁⲧϥ ⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁⲣⲭⲓⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (ⲛⲓⲙ) ⲛⲉⲙ ⲡⲉϥⲕⲉϣ̀ⲫⲏⲣ ⲛ̀ⲗⲓⲧⲟⲩⲣⲅⲟⲥ ⲡⲉⲛⲓⲱⲧ ⲛ̀ⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ (ⲙ̀ⲙⲏⲧⲣⲟⲡⲟⲗⲏⲧⲏⲥ) ⲁⲃⲃⲁ (ⲛⲓⲙ).';
const popeBishopEnglishCoptic = 'entef-areh e-ep-onkh nem ep-taho eratf em-pen-iot et-tai-ooet en-arshee-erefs papa Avva (...) nem pef-ke-esh-fir en-litourgos pen-iot en-episkopos (em-mitropolitis) Avva (...).';
const popeBishopEnglish = 'and to keep the life and standing of our honored father, the archpriest, Pope Abba (...), and his partner in the liturgy, our father the bishop (metropolitan), Abba (...).';

if (deaconAnnualMatins) {
  deaconAnnualMatins.hymns = [
    {
      id: 'd-annual-matins-stand-up-for-prayer',
      title: 'Ⲉⲡⲓ ⲡ̀ⲣⲟⲥⲉⲩⲭⲏ ⲥ̀ⲧⲁⲑⲏⲧⲉ (Stand Up for Prayer)',
      versions: [
        { language: 'coptic', text: 'Ⲉⲡⲓ ⲡ̀ⲣⲟⲥⲉⲩⲭⲏ ⲥ̀ⲧⲁⲑⲏⲧⲉ.' },
        { language: 'englishCoptic', text: 'Epi proseuchi stathite.' },
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
        { language: 'englishCoptic', text: 'Proseuxasthe.' },
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
          text: 'Tobh ejen nen-ioti nem nen-esneou et-shoni khen jin-shoni niven: ite khen pai-topos ite khen mai niven: hina ente Pikhristos Pen-nouti er-ehmot nan nemo-ou em-pi-oujai nem pi-talcho: entef-kha nen-novi nan evol.',
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
          text: 'Tobh ejen nen-ioti nem nen-esneou etau-she e-epshemmo: ie nee-ethmev-i e-she khen mai niven: soutton nou-mo-it tirou: ite evol hiten fiom ie ni-iaro-ou ie ni-limni ie ni-mo-it em-moshi: (ie pi-aeer) ie ev-iri em-pou-jin-moshi en-riti niven: hina ente Pikhristos Pen-nouti tasth-o-ou e-nee-ete nou-ou em-ma-en-shopi khen ou-hirini: entef-kha nen-novi nan evol.',
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
          text: 'Tobh ejen nee-etfi em-ep-roush en-ni-thysia ni-prosfora ni-aparkhi ni-neh ni-esthoi-noufi ni-skepasma ni-jom en-osh ni-kimilion ente pi-ma-en-ershou-oushi: hina ente Pikhristos Pen-nouti ti-shevio nou khen Ierousalim ente etfe: entef-kha nen-novi nan evol.',
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
        { language: 'englishCoptic', text: 'Proseuxasthe hyper tou agiou evangeliou.' },
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
        { language: 'englishCoptic', text: 'Stathite meta fovou Theou: akousomen tou agiou evangeliou.' },
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
          text: 'Pi-laos:\n\nKhen Pikhristos Iesous Pen-chois.\n\nPi-diakon:\n\nTas kefalas imon to Kyrio klinate.\n\nPi-laos:\n\nEnopion sou Kyrie.\n\nPi-diakon:\n\nProskhomen Theou meta fovou: amin.',
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
  'Tobh hina ente Efnouti nai nan: entef-shenhit kharon: entef-sotem eron: entef-erbo-ithin eron: entef-chi enni-tiho nem ni-tobh ente nee-ethowab entaf entotou e-ehree ejon e-pi-agathon en-seou niven: ☩ entef-aiten en-em-epsha ethren-chi evol-khen ti-koinonia ente nef-mystirion ethowab et-esmarowt e-pi-kho evol ente nen-novi.';
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
          text: 'Proseuxasthe hyper ton agion timion doron touton ke thysion imon ke prosferonton: Kyrie eleison.',
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
          text: 'Amin. Is Patir agios: is Eyos agios: en Epnevma Agion. Amin.\n\nEvlogitos Kyrios o Theos is tous e-onas. Amin.\n\nNi-ethnos tirou esmou e-Epchois: marou-esmou erof enje ni-laos tirou: je a pef-nai tajro e-ehree ejon: ouoh ti-methmi ente Epchois shop sha eneh. Amin allilouia.',
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
