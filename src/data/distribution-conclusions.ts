import type { LanguageType } from './hymns';

// The middle verse of the Distribution's Concluding Hymn ("We proclaim and say, O our Lord Jesus Christ, ...") changes
// with the feast. Each season's verse as Spirit & Truth has it (read from the app on its feast day), keyed by the
// Distribution service; it replaces Annual's "bless the waters of the rivers" in that season's copy.
// The Coptic and Arabic in English letters were written for the app.
const intro: Partial<Record<LanguageType, string>> = {
  coptic: 'Ⲧⲉⲛⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ: ϫⲉ ⲱ̀ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏ︦ⲥ︦ Ⲡⲭ︦ⲥ︦: ',
  englishCoptic: 'Tenōsh evol enjō emmos: je ō Pentshois Iēsous Pikhristos: ',
  english: 'We proclaim and say: O our Lord Jesus Christ, ',
  arabic: 'نصرخ قائلين: يا ربنا يسوع المسيح، ',
  englishArabic: "Nasrukh qaa-ileen: ya rabbana Yasoo el-Maseeh, ",
};
const save: Partial<Record<LanguageType, string>> = {
  coptic: ' Ⲥⲱϯ ⲙ̀ⲙⲟⲛ ⲟⲩⲟϩ ⲛⲁⲓ ⲛⲁⲛ.',
  englishCoptic: ' Sōti emmon ouoh nai nan.',
  english: ' Save us and have mercy on us.',
  arabic: ' خلصنا وارحمنا.',
  englishArabic: ' Khallisna warhamna.',
};
const verse = (middle: Partial<Record<LanguageType, string>>, ending = save) =>
  Object.fromEntries(
    Object.entries(middle).map(([language, text]) => [language, `${intro[language as LanguageType]}${text}${ending[language as LanguageType] ?? ''}`])
  ) as Partial<Record<LanguageType, string>>;
const none: Partial<Record<LanguageType, string>> = {};

export const distributionConclusionVerses: Record<string, Partial<Record<LanguageType, string>>> = {
  'nativity-fast-distribution': verse(
    {
      coptic: 'Ⲡⲓⲙⲓⲥⲓ ⲉ̀ⲃⲟⲗϧⲉⲛ Ⲫ̀ⲓⲱⲧ ϧⲁϫⲱⲟⲩ ⲛ̀ⲛⲓⲉ̀ⲱⲛ ⲧⲏⲣⲟⲩ.',
      englishCoptic: 'Pimisi evolkhen Efiōt khajōou enni-eōn tērou.',
      english: 'the Begotten of the Father before all the ages.',
      arabic: 'المولود من الآب قبل كل الدهور.',
      englishArabic: 'el-mawlood min el-Ab qabl kull ed-duhoor.',
    },
    none
  ),
  'nativity-distribution': verse(
    {
      coptic: 'Ⲫⲏⲉ̀ⲧⲁⲩⲙⲁⲥϥ ϧⲉⲛ Ⲃⲏⲑⲗⲉⲉⲙ ⲕⲁⲧⲁ ⲛⲓⲥ̀ⲙⲏ ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ.',
      englishCoptic: 'Fē-etaumasf khen Vēthle-em kata ni-esmē emeprofētikon.',
      english: 'who was born in Bethlehem, according to the prophetic voices.',
      arabic: 'الذي ولد في بيت لحم كالأخبار النبوية.',
      englishArabic: 'elladhi wulida fi Bayt Lahm kal-akhbar en-nabawiyya.',
    },
    { ...save, arabic: '', englishArabic: '' }
  ),
  'theophany-distribution': verse({
    coptic: 'Ⲫⲏⲉ̀ⲧⲁϥϭⲓⲱⲙⲥ ϧⲉⲛ ⲡⲓⲒⲟⲣⲇⲁⲛⲏⲥ.',
    englishCoptic: 'Fē-etaftshi-ōms khen pi-Iordanēs.',
    english: 'who was baptized in the Jordan.',
    arabic: 'الذي إعتمد في الأردن.',
    englishArabic: "elladhi i'tamada fil-Urdun.",
  }),
  'jonah-distribution': verse({
    coptic: 'Ⲥⲙⲟⲩ ⲉ̀ⲛⲓⲁ̀ⲏⲣ ⲛ̀ⲧⲉ ⲧ̀ⲫⲉ: ⲙⲁⲣⲉ ⲡⲉⲕⲛⲁⲓ ⲛⲉⲙ ⲧⲉⲕϩⲓⲣⲏⲛⲏ ⲟⲓ ⲛ̀ⲥⲟⲃⲧ ⲙ̀ⲡⲉⲕⲗⲁⲟⲥ:',
    englishCoptic: 'Smou eni-aēr ente etfe: mare peknai nem tekhirēnē oi ensobt empeklaos:',
    english: 'bless the air of heaven. May Your mercy and Your peace be a fortress unto Your people.',
    arabic: 'بارك أهوية السماء لتكن رحمتُكَ وسلامُكَ حصناً لشعبِك،',
    englishArabic: "barik ahwiyat es-sama', wal-takun rahmatuka wa salamuka hisnan li-sha'bik,",
  }),
  'palmsunday-distribution': verse({
    coptic: 'Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ.',
    englishCoptic: 'Epshēri em-Efnouti: afshe ekhoun e-Ierousalēm.',
    english: 'the Son of God, who entered into Jerusalem.',
    arabic: 'إبن الله، دخل أورُشَليم.',
    englishArabic: 'Ibn Allah, dakhala Urushaleem.',
  }),
  'minorfeasts-feast-of-circumcision-distribution': verse({
    coptic: 'Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫϯ ⲁϥϣⲱⲟⲡ ⲉ̀ⲣⲟϥ ⲙ̀ⲡⲓⲥⲉⲃⲓ.',
    englishCoptic: 'Epshēri em-Efti afshōp erof empisevi.',
    english: 'the Son of God, accepted unto Himself circumcision.',
    arabic: 'ابن الله قبل إليه الختان.',
    englishArabic: 'Ibn Allah qabila ilayhi el-khitan.',
  }),
  'minorfeasts-wedding-at-cana-of-galilee-distribution': verse({
    coptic: 'Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫϯ: ⲁϥⲥ̀ⲙⲟⲩ ⲉ̀ⲛⲓⲙⲱⲟⲩ ⲁϥⲁⲓⲧⲟⲩ ⲛ̀ⲏⲣⲡ.',
    englishCoptic: 'Epshēri em-Efti: afesmou enimōou afaitou en-ērp.',
    english: 'the Son of God, blessed the water and changed it into wine.',
    arabic: 'ابن الله بارك المياه فصيرها خمراً.',
    englishArabic: 'Ibn Allah barak el-miyah fa-sayyaraha khamran.',
  }),
  'minorfeasts-presentation-of-the-lord-in-the-temple-distribution': verse({
    coptic: 'Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲡⲓⲉⲣⲫⲉⲓ.',
    englishCoptic: 'Epshēri em-Efnouti afshe ekhoun epi-erfei.',
    english: 'the Son of God entered into the temple.',
    arabic: 'ابن الله دخل إلى الهيكل.',
    englishArabic: 'Ibn Allah dakhala ila el-haykal.',
  }),
  'minorfeasts-feast-of-annunciation-distribution': verse({
    coptic: 'Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ⲁϥϭⲓⲥⲁⲣⲝ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ.',
    englishCoptic: 'Epshēri em-Efnouti: aftshisarks khen Tiparthenos.',
    english: 'the Son of God, was incarnate from the Virgin.',
    arabic: 'إبن الله، تجسد من العذراء.',
    englishArabic: "Ibn Allah, tagassada min el-'Adhra'.",
  }),
  'minorfeasts-feast-of-transfiguration-distribution': verse(
    {
      coptic: 'Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ϯ: ⲁϥϣⲱⲃⲧϥ ⲉ̀ϫⲉⲛ ⲡⲓⲧⲱⲟⲩ ⲛ̀Ⲑⲁⲃⲱⲣ.',
      englishCoptic: 'Epshēri em-Efti: afshōbtf ejen pitōou en-Thavōr.',
      english: 'the Son of God, was transfigured upon Mount Tabor.',
      arabic: 'إبن الله تجلى على جبل تابور.',
      englishArabic: "Ibn Allah tagalla 'ala gabal Tabour.",
    },
    none
  ),
};
