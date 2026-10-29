// Words for seasons that were missing them (2026-10-28), from tasbeha.org (St Mark Coptic Orthodox Church, Jersey City):
// each season's Psalm 150 refrain and its line in the Concluding Hymn, the Theophany and Jonah doxologies, and the
// reader's Coptic introduction to the Praxis. Arabic in English letters for all of these was written for the app.
import type { LanguageVersion } from "./hymns";

export interface SeasonLine {
  coptic: string;
  english: string;
  arabic: string;
  englishArabic: string;
}

// Sung before each verse of Psalm 150 in the Distribution, as Great Lent's (Jesus Christ fasted for us) is.
// Keyed by the Distribution service. Seasons with no refrain of their own keep Annual's Alleluia.
export const psalm150Refrains: Record<string, SeasonLine> = {
  "nayrouz-distribution": {
    coptic: "Ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ: ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀ⲟ̅ⲥ̅.",
    english: "Bless the crown of the year, with Your goodness, O Lord.",
    arabic: "بارك إكليل السنة، بصلاحك يا رب.",
    englishArabic: "Barek ekleel es-sana, bi salahak ya Rab.",
  },
  "cross-distribution": {
    coptic: "Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ⲫⲏⲉ̀ⲧⲁⲩⲁϣϥ ⲉ̀Ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ.",
    english: "Jesus Christ the Son of God, was crucified upon the Cross.",
    arabic: "يسوع المسيح ابن الله، صُلب على الصليب.",
    englishArabic: "Yasou' el-Maseeh ebn Allah, sulib 'ala es-saleeb.",
  },
  "nativity-distribution": {
    coptic: "Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ϣⲏⲣⲓ ⲙ̀Ⲫϯ: ⲁⲩⲙⲁⲥϥ ϧⲉⲛ Ⲃⲏⲑⲗⲉⲉⲙ.",
    english: "Jesus Christ the Son of God, was born in Bethlehem.",
    arabic: "يسوع المسيح ابن الله، ولد في بيت لحم.",
    englishArabic: "Yasou' el-Maseeh ebn Allah, wulid fi Bayt Lahm.",
  },
  "theophany-distribution": {
    coptic: "Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ⲁϥϭⲓⲱⲙⲥ ϧⲉⲛ Ⲡⲓⲓⲟⲣⲇⲁⲛⲏⲥ.",
    english: "Jesus Christ the Son of God, was baptized in the Jordan.",
    arabic: "يسوع المسيح ابن الله، اعتمد في الأردن.",
    englishArabic: "Yasou' el-Maseeh ebn Allah, e'tamad fil-Ordon.",
  },
  "jonah-distribution": {
    coptic:
      "Ⲓⲱⲛⲁ ϧⲉⲛ ⲑ̀ⲛⲉϫⲓ ⲙ̀ⲡⲓⲕⲓⲧⲟⲥ ⲕⲁⲧⲁ ⲡ̀ⲧⲩⲡⲟⲥ: ⲙ̀Ⲡⲭ̅ⲥ̅ ϧⲉⲛ ⲡⲓⲙ̀ϩⲁⲩ ⲛ̀ϣⲟⲙⲧ ⲛ̀ⲉ̀ϩⲟⲟⲩ.",
    english:
      "Jonah in the belly of the whale, as a type of Christ in the tomb three days.",
    arabic: "يونان في بطن الحوت، كمثال المسيح في القبر ثلاثة أيام.",
    englishArabic:
      "Younan fi batn el-hout, ka-mithal el-Maseeh fil-qabr thalathat ayyam.",
  },
  "lent-weekday": {
    coptic: "Ⲁ Ⲓⲏ︦ⲥ︦ Ⲡⲭ︦ⲥ︦ ⲉⲣⲛⲏⲥⲧⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛ̀ϩ̀ⲙⲉ ⲛ̀ⲉ̀ϩⲟⲟ̀ⲩ ⲛⲉⲙ ϩ̀ⲙⲉ ⲛ̀ⲉ̀ϫⲱⲣϩ.",
    english: "Jesus Christ fasted for us, forty days and forty nights.",
    arabic: "يسوع المسيح صام عنا، أربعين يوماً وأربعين ليلة.",
    englishArabic:
      "Yasou' el-Maseeh sam 'anna, arba'een yawman wa arba'een layla.",
  },
  "palmsunday-distribution": {
    coptic: "Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ.",
    english: "Jesus Christ the Son of God, has entered Jerusalem.",
    arabic: "يسوع المسيح ابن الله، دخل أورشليم.",
    englishArabic: "Yasou' el-Maseeh ebn Allah, dakhal Orshaleem.",
  },
  "pentecost-distribution": {
    coptic: "Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ Ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟⲩ: ⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ.",
    english: "Jesus Christ the King of glory, has risen from the dead.",
    arabic: "يسوع المسيح ملك المجد، قام من بين الأموات.",
    englishArabic: "Yasou' el-Maseeh malek el-magd, qam men bayn el-amwat.",
  },
  "ascension-distribution": {
    coptic: "Ⲡⲭ̅ⲥ̅ ⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ: ⲟⲩⲟϩ ⲁϥϣⲉⲛⲁϥ ⲉ̀ⲡ̀ϣⲱⲓ ⲉ̀ⲛⲓⲫⲏⲟⲩⲓ̀.",
    english: "Christ has risen from the dead, and ascended into the heavens.",
    arabic: "المسيح قام من الأموات، وصعد إلى السموات.",
    englishArabic: "El-Maseeh qam men el-amwat, wa sa'ad ila es-samawat.",
  },
  "minorfeasts-feast-of-circumcision-distribution": {
    coptic: "Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ⲁϥϣⲱⲡ ⲉ̀ⲣⲟϥ ⲙ̀ⲡⲓⲥⲉⲃⲓ.",
    english: "Jesus Christ the Son of God, accepted circumcision upon Himself.",
    arabic: "يسوع المسيح ابن الله، قبل إليه الختان.",
    englishArabic: "Yasou' el-Maseeh ebn Allah, qabil ilayhi el-khitan.",
  },
  "minorfeasts-wedding-at-cana-of-galilee-distribution": {
    coptic: "Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫϯ: ⲁϥⲥ̀ⲙⲟⲩ ⲉ̀ⲛⲓⲙⲱⲟⲩ ⲁϥⲁⲓⲧⲟⲩ ⲛ̀ⲏⲣⲡ.",
    english:
      "Jesus Christ the Son of God, blessed the water and changed it into wine.",
    arabic: "يسوع المسيح ابن الله، بارك المياه فصيّرها خمراً.",
    englishArabic:
      "Yasou' el-Maseeh ebn Allah, barak el-miyah fa sayyaraha khamran.",
  },
  "minorfeasts-feast-of-annunciation-distribution": {
    coptic: "Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ⲁϥϭⲓⲥⲁⲣⲝ ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ.",
    english: "Jesus Christ the Son of God, was incarnate of the Virgin.",
    arabic: "يسوع المسيح ابن الله، تجسد من العذراء.",
    englishArabic: "Yasou' el-Maseeh ebn Allah, tagassad men el-'Adhra'.",
  },
};

// The Concluding Hymn's prayer (Annual's "bless the waters of the rivers. May Your mercy and Your peace be a fortress
// unto Your people") as each feast sings it, keyed by season (and by service for the Minor Feasts)
export const concludingLines: Record<string, SeasonLine> = {
  nativity: {
    coptic: "Ⲫⲏⲉ̀ⲧⲁⲩⲙⲁⲥϥ ϧⲉⲛ Ⲃⲏⲑⲗⲉⲉⲙ ⲕⲁⲧⲁ ⲛⲓⲥ̀ⲙⲏ ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ:",
    english: "who was born in Bethlehem, according to the prophetic sayings.",
    arabic: "الذي ولد في بيت لحم كالأخبار النبوية،",
    englishArabic: "alladhi wulid fi Bayt Lahm kal-akhbar en-nabawiya,",
  },
  theophany: {
    coptic: "Ⲫⲏⲉ̀ⲧⲁϥϭⲓⲱⲙⲥ ϧⲉⲛ Ⲡⲓⲓⲟⲣⲇⲁⲛⲏⲥ:",
    english: "who was baptized in the Jordan.",
    arabic: "الذي اعتمد في الأردن،",
    englishArabic: "alladhi e'tamad fil-Ordon,",
  },
  "palm-sunday": {
    coptic: "Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ:",
    english: "the Son of God, who entered Jerusalem.",
    arabic: "ابن الله، دخل أورشليم،",
    englishArabic: "ebn Allah, dakhal Orshaleem,",
  },
  ascension: {
    coptic:
      "ⲫⲏⲉ̀ⲧⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ: ⲟⲩⲟϩ ⲁϥϣⲉⲛⲁϥ ⲉ̀ⲡ̀ϣⲱⲓ ⲉ̀ⲛⲓⲫⲏⲟⲩⲓ̀: ⲁϥϩⲉⲙⲥⲓ ⲥⲁⲟⲩⲓ̀ⲛⲁⲙ ⲙ̀Ⲡⲉϥⲓⲱⲧ:",
    english:
      "who is risen from the dead, ascended into the heavens, and is seated at the right hand of His Father.",
    arabic: "الذي قام من بين الأموات، وصعد إلى السموات، وجلس عن يمين أبيه،",
    englishArabic:
      "alladhi qam men bayn el-amwat, wa sa'ad ila es-samawat, wa galas 'an yameen abeeh,",
  },
  "minorfeasts-wedding-at-cana-of-galilee": {
    coptic:
      "Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫϯ: ⲁϥⲥ̀ⲙⲟⲩ ⲉ̀ⲛⲓⲙⲱⲟⲩ ⲁϥⲁⲓⲧⲟⲩ ⲛ̀ⲏⲣⲡ: ⲙⲁⲣⲉ ⲡⲉⲕⲛⲁⲓ ⲛⲉⲙ ⲧⲉⲕϩⲓⲣⲏⲛⲏ ⲟⲓ ⲛ̀ⲥⲟⲃⲧ ⲙ̀ⲡⲉⲕⲗⲁⲟⲥ:",
    english:
      "the Son of God, who blessed the water and changed it into wine. May Your mercy and Your peace be a fortress unto Your people.",
    arabic:
      "ابن الله، بارك المياه فصيّرها خمراً، ولتكن رحمتُكَ وسلامُكَ حصناً لشعبِك،",
    englishArabic:
      "ebn Allah, barak el-miyah fa sayyaraha khamran, wal-takun rahmatuka wa salamuka hisnan li-sha'bik,",
  },
  "minorfeasts-feast-of-annunciation": {
    coptic: "Ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲫ̀ⲛⲟⲩϯ: ⲁϥϭⲓⲥⲁⲣⲝ ⲉ̀ⲃⲟⲗ ϧⲉⲛ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ:",
    english: "the Son of God, who was incarnate of the Virgin.",
    arabic: "ابن الله، تجسد من العذراء،",
    englishArabic: "ebn Allah, tagassad men el-'Adhra',",
  },
};

// Doxologies the Theophany (Vespers and Matins) and Jonah's Fast had none of
export const seasonDoxologies: Record<
  "theophanyFirst" | "theophanySecond" | "jonah",
  SeasonLine
> = {
  theophanyFirst: {
    coptic:
      "Ⲧⲟⲧⲉ ⲣⲱⲛ ⲁϥⲙⲟϩ ⲛ̀ⲣⲁϣⲓ: ⲟⲩⲟϩ ⲡⲉⲛⲗⲁⲥ ϧⲉⲛ ⲟ̀ⲩⲑⲉⲗⲏⲗ: ϫⲉ ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲁϥϭⲓⲱ̀ⲙⲥ ϩⲓⲧⲉⲛ Ⲓⲱⲁ̀ⲛⲛⲏⲥ.\n\n+ Ⲁ̀ⲗⲏⲑⲱⲥ ⲧ̀ⲫⲉ ⲛⲉⲙ ⲡ̀ⲕⲁϩⲓ: ⲙⲉϩ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲡⲉⲕⲧⲁⲓⲟ: ⲱ̀ Ⲡⲟ̅ⲥ̅ ⲫⲁ ϯϫⲓϫ ⲉⲧⲁ̀ⲙⲁϩⲓ: ⲛⲉⲙ ⲡⲓϣⲱⲃϣ ⲛ̀ⲣⲉϥⲧⲟⲩϫⲟ.\n\nϪⲉ Ⲡⲟ̅ⲥ̅ ⲁϥⲓ̀ ⲟⲩⲟϩ ⲁϥϭⲓⲱ̀ⲙⲥ: ⲉⲑⲃⲉ ⲛⲉⲛⲛⲟⲃⲓ ⲁ̀ⲛⲁ ϩⲱⲛ: ⲁϥⲧⲟⲩϫⲟⲛ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ: ϧⲉⲛ ⲟ̀ⲩⲛⲓϣϯ ⲙ̀ⲙⲉⲧϣⲉⲛϩⲏⲧ.\n\n+ Ⲇⲁⲩⲓⲇ ⲁ̀ⲙⲟⲩ ⲧⲉⲛⲙⲏϯ ⲙ̀ⲫⲟⲟ̀ⲩ: ⲉⲑⲣⲉⲕϫⲱ ⲙ̀ⲡ̀ⲧⲁⲓⲟ ⲙ̀ⲡⲁⲓϣⲁⲓ: ϫⲉ ⲡ̀ϧ̀ⲣⲱⲟ̀ⲩ ⲙ̀Ⲡⲟ̅ⲥ̅ ϩⲓϫⲉⲛ ⲛⲓⲙⲱⲟ̀ⲩ: Ⲫϯ ⲛ̀ⲧⲉ ⲡ̀ⲱⲟ̀ⲩ ⲁϥⲉ̀ⲣϧⲁⲣⲁⲃⲁⲓ.\n\nⲎ̀ⲥⲁⲏ̀ⲁⲥ ⲁϥⲙⲟⲩϯ ⲉ̀ⲣⲟϥ: ϫⲉ ⲡ̀ϧ̀ⲣⲱⲟ̀ⲩ ⲙ̀ⲡⲉⲧⲱϣ ⲉ̀ⲃⲟⲗ: ϩⲓ ⲛⲓϣⲁϥⲉⲩ ϧⲉⲛ ⲟ̀ⲩⲟ̀ⲩⲛⲟϥ: ⲉ̀ⲡⲓⲃⲓⲟⲥ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲫ̀ⲓⲟⲙ ⲁϥⲛⲁⲩ ⲟⲩⲟϩ ⲁϥⲫⲱⲧ: ⲁ̀ ⲡⲓⲒⲟⲣⲇⲁⲛⲏⲥ ⲕⲟⲧϥ ⲉ̀ⲫⲁϩⲟⲩ: ⲟ̀ⲩ ⲡⲉⲧϣⲟⲡ ⲫ̀ⲓⲟⲙ ϫⲉ ⲁⲕⲫⲱⲧ: ⲙⲁⲧⲁϫⲣⲟⲕ ϩⲓⲛⲁ ⲛ̀ⲧⲉⲕϭⲓⲥ̀ⲙⲟⲩ.\n\nⲎ̀ⲡⲡⲉ ⲁⲩⲛⲁⲩ ⲛ̀ϫⲉ ⲛⲓⲙⲱⲟ̀ⲩ: ⲉ̀ⲡⲓⲆⲏⲙⲓⲟⲩⲣⲅⲟⲥ ⲛ̀ⲣⲉϥⲥⲱⲛⲧ: ⲁⲩⲉ̀ⲣϩⲟϯ ⲟⲩⲟϩ ⲁϥⲧⲁϩⲱⲟ̀ⲩ: ⲛ̀ϫⲉ ⲟ̀ⲩϣ̀ⲑⲟⲣⲧⲉⲣ ⲛⲉⲙ ⲟ̀ⲩⲧⲱⲙⲧ.\n\n+ Ⲣⲁϣⲓ ⲛⲓⲧⲱⲟ̀ⲩ ⲛⲉⲙ ⲛⲓⲕⲁⲗⲁⲙⲫⲱⲟ̀ⲩ: ⲡⲓⲓⲁϩϣ̀ϣⲏⲛ ⲛⲉⲙ ⲛⲓϣⲉⲛⲥⲓϥⲓ: ⲉ̀ⲃⲟⲗ ϧⲁ ⲧ̀ϩⲏ ⲙ̀ⲡ̀ϩⲟ ⲙ̀ⲡ̀Ⲟⲩⲣⲟ: ⲫⲏⲉ̀ⲧⲁϥⲑⲁⲙⲓⲟ ⲛ̀ⲛⲓⲛⲓϥⲓ.\n\nⲬ̀ⲟ̀ⲩⲁⲃ Ⲡⲟ̅ⲥ̅ ⲟⲩⲟϩ ⲭ̀ⲟ̀ⲩⲁⲃ: ⲭ̀ⲟ̀ⲩⲁⲃ Ⲡⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲡⲓⲱ̀ⲟ̀ⲩ ϥ̀ⲉ̀ⲣϣⲁⲩ ⲛⲁϥ ⲛⲉⲙ Ⲡⲉϥⲓⲱⲧ: ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲙ̀ⲡⲁⲣⲁⲕⲗⲏⲧⲟⲛ.\n\n+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛⲟⲓ ⲛ̀ⲣⲁⲙⲁⲟ̀: ϧⲉⲛ ⲛⲁⲅ̀ⲁⲑⲟⲛ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ: ϧⲉⲛ ⲟ̀ⲩⲛⲁϩϯ ⲧⲉⲛⲉ̀ⲣⲯⲁⲗⲓⲛ: ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ ϫⲉ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅: Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ϣⲏⲣⲓ ⲙ̀Ⲫϯ: ⲁϥϭⲓⲱ̀ⲙⲥ ϧⲉⲛ ⲡⲓⲒⲟⲣⲇⲁⲛⲏⲥ.\n\n+ Ⲫⲁⲓ ⲉ̀ⲣⲉ ⲡⲓⲱ̀ⲟ̀ⲩ ⲉⲣⲡ̀ⲣⲉⲡⲓ ⲛⲁϥ: ⲛⲉⲙ Ⲡⲉϥⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅: ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ.",
    english:
      'Then our mouths are filled with joy, and our tongues with rejoicing, for our Lord Jesus Christ, was baptized by John.\n\n+ Truly heaven and earth, are filled with Your honor, O Lord with the mighty hand, and the arm of salvation.\n\nFor God came and was baptized, for our sins, He delivered and saved us, with great compassion.\n\n+ Come today David to our midst, so you may speak of the honor of this feast, saying "The voice of the God of glory, thunders upon the waters."\n\nIsaiah has said, "The voice of one crying out, with joy in the wilderness, make straight His paths."\n\n+ The sea has seen and fled, and the Jordan turned away backwards, O sea why have you fled, stand firm that you may be blessed.\n\nBehold the waters have seen, the Creator and Maker of all, and became agitated and confused, worried and amazed.\n\n+ Rejoice O mountains and hills, thickets and all cedars, before the face of the King, who created all souls.\n\nHoly O Lord and holy, holy O Lord Jesus Christ, glory be to You and Your Father, and the Spirit, the Comforter.\n\n+ Therefore we are wealthy, with perfect gifts, and we sing with faith, saying Alleluia.\n\nAlleluia Alleluia, Alleluia Alleluia, Jesus Christ the Son of God, was baptized in the Jordan.\n\n+ This is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.',
    englishArabic:
      "Hina'edhin fammuna imtala' farahan, wa lisanuna tahleelan, li'anna Rabbana Yasou' el-Maseeh, e'tamad men Youhanna.\n\n+ Bil-haqeeqa es-sama' wal-ard, mamlou'atan men karamatak, ayyuha er-Rab dhu el-yad el-'azeeza, wadh-dhira' el-munqidha.\n\nLi'anna er-Rab ata wa e'tamad, men agl khataiyana nahnu aydan, wa anqadhana wa khallasana, bi ra'fa 'azeema.\n\n+ Ta'ala ya Dawoud fi wastina el-yawm, li-tantiq bi karamat hadha el-'eed, sawt er-Rab 'ala el-miyah, ilah el-magd ar'ad.\n\nAsh'iya' da'ah, sawt es-surakh, bi farah fil-barari, lis-sa'y el-kamel.\n\n+ El-bahr ra'a fa harab, wal-Ordon raga' ila khalf, ma lak ayyuha el-bahr harabt, ithbat likay tatabarak.\n\nHudha el-miyah qad ra'at, el-Khaliq el-Gabel, fa khafat wa adrakaha, el-idtirab wal-heera.\n\n+ Ifrahi ayyatuha el-gibal wal-akam, wal-ghiyad wal-arz, men quddam wagh el-Malek, alladhi khalaq el-anfas.\n\nQuddous anta ayyuha er-Rab wa quddous, quddous ayyuha er-Rab Yasou' el-Maseeh, el-magd yaleeq bihi ma'a abeeh, war-Rouh el-Qudus.\n\n+ Men agl hadha nahnu aghniya', bil-khayrat el-kamela, wa bi-eeman nurattel, qa'ileen halleluya.\n\nHalleluya halleluya, halleluya halleluya, Yasou' el-Maseeh ebn Allah, e'tamad fil-Ordon.\n\n+ Hadha alladhi yanbaghi lahu el-magd, ma'a abeeh es-saleh, war-Rouh el-Qudus, men el-aan wa ila el-abad.",
    arabic:
      "حينئذ فمنا امتلأ فرحاً، ولساننا تهليلاً، لأن ربنا يسوع المسيح، اعتمد من يوحنا.\n\n+ بالحقيقة السماء والأرض، مملوءتان من كرامتك، أيها الرب ذو اليد العزيزة، والذراع المنقذة.\n\nلأن الرب أتي واعتمد، من أجل خطايانا نحن أيضاً، وانقذنا وخلصنا، برأفة عظيمة.\n\n+ تعال يا داود في وسطنا اليوم، لتنطق بكرامة هذا العيد، صوت الرب علي المياه، إله المجد ارعد.\n\nأشعياء دعاه، صوت الصراخ، بفرح في البراري، للسعي الكامل.\n\n+ البحر رأي فهرب، والأردن رجع إلي خلف، مالك أيها البحر هربت، إثبت لكي تتبارك.\n\nهوذا المياه قد رأت، الخالق الجابل، فخافت وادركها، الاضطراب والحيرة.\n\n+ إفرحي أيتها الجبال والآكام، والغياض والأرز، من قدام وجه الملك، الذي خلق الأنفاس.\n\nقدوس أنت أيها الرب وقدوس، قدوس أيها الرب يسوع المسيح، المجد يليق به مع أبيه، والروح القدس.\n\n+ من أجل هذا نحن أغنياء، بالخيرات الكاملة، وبإيمان نرتل، قائلين هلليلويا.\n\nهلليلويا هلليلويا، هلليلويا هلليلويا، يسوع المسيح إبن الله، اعتمد في الأردن.\n\n+ هذا الذى ينبغى له المجد، مع أبيه الصالح، والروح القدس، من الآن وإلى الأبد.",
  },
  theophanySecond: {
    coptic:
      "Ⲫϯ ⲡⲓⲙⲟⲛⲟⲅⲉⲛⲏⲥ: ⲁϥⲓ̀ ⲉ̀ϫⲉⲛ ⲡⲓⲒⲟⲣⲇⲁⲛⲏⲥ: ϯϩⲓⲕⲱⲛ ⲉ̀ⲧⲁⲥⲧⲁⲕⲟ: ⲟⲩⲟϩ ⲁⲥⲙⲟⲩ ϧⲉⲛ ⲡⲓⲛⲟⲃⲓ.\n\nⲀϥⲁ̀ⲓⲥ ⲙ̀ⲃⲉⲣⲓ ⲛ̀ⲕⲉⲥⲟⲡ: ϩⲓⲧⲉⲛ ⲡⲓⲱ̀ⲙⲥ ⲛ̀ⲧⲉ ⲡⲓⲙⲱⲟ̀ⲩ: ⲟⲩⲟϩ ⲁϥⲗⲱⲥ ⲛ̀ⲧ̀ⲁ̀ⲫⲉ ⲙ̀ⲡⲓⲇ̀ⲣⲁⲕⲟⲛ: ϩⲓϫⲉⲛ ⲛⲓⲙⲱⲟ̀ⲩ ⲛ̀ⲧⲉ ⲡⲓⲒⲟⲣⲇⲁⲛⲏⲥ.\n\nⲀⲓⲛⲁⲩ ⲉ̀ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅: ⲉⲧⲁϥⲓ̀ ⲉ̀ⲡⲉⲥⲏⲧ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲉ: ⲁⲓⲥⲱⲧⲉⲙ ⲉ̀ⲧⲥ̀ⲙⲏ ⲛ̀ⲧⲉ Ⲫ̀ⲓⲱⲧ: ⲉⲥⲟ̀ϣ ⲉ̀ⲃⲟⲗ ⲉⲥϫⲱ ⲙ̀ⲙⲟⲥ.\n\nϪⲉ ⲫⲁⲓ ⲡⲉ ⲠⲁϢⲏⲣⲓ ⲡⲁⲙⲉⲛⲣⲓⲧ: ⲉ̀ⲧⲁ ⲧⲁⲯ̀ⲩⲭⲏ ϯⲙⲁϯ ⲛ̀ϧⲏⲧϥ: ⲁϥⲉ̀ⲣⲡⲁⲟ̀ⲩⲱ̀ϣ ⲥⲱⲧⲉⲙ ⲛ̀ⲥⲱϥ: ϫⲉ ⲛ̀ⲑⲟϥ ⲡⲉ ⲡⲓⲢⲉϥⲧⲁⲛϧⲟ.\n\nⲎ̀ⲥⲁⲏ̀ⲁⲥ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ: ⲁϥϫⲱ ⲙ̀ⲡ̀ⲧⲁⲓⲟ ⲙ̀ⲡⲓⲡ̀ⲣⲟⲇⲣⲟⲙⲟⲥ: ⲡⲓⲡⲁⲣⲑⲉⲛⲟⲥ ⲉ̅ⲑ̅ⲩ̅ Ⲓⲱⲁ̀ⲛⲛⲏⲥ: ⲡⲓⲥⲩⲅⲅⲉⲛⲏⲥ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅.\n\nⲔ̀ⲥ̀ⲙⲁⲣⲱⲟ̀ⲩⲧ ⲱ̀ ⲡⲉⲛⲚⲏⲃ Ⲡⲭ̅ⲥ̅: ⲡ̀Ϣⲏⲣⲓ ⲙ̀ⲙⲟⲛⲟⲅⲉⲛⲏⲥ: ⲫⲏⲉ̀ⲧⲁϥϭⲓⲥⲁⲣⲝ ϧⲉⲛ ϯⲠⲁⲣⲑⲉⲛⲟⲥ: ⲟⲩⲟϩ ⲁϥϭⲓⲱ̀ⲙⲥ ϧⲉⲛ ⲡⲓⲒⲟⲣⲇⲁⲛⲏⲥ.\n\nⲐⲉⲗⲏⲗ ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ϩⲁⲛϩⲓⲏⲃ: ⲱ̀ ⲡⲓⲒⲟⲣⲇⲁⲛⲏⲥ ⲛⲉⲙ ⲡⲉϥⲇ̀ⲣⲓⲙⲟⲥ: ⲁϥⲓ̀ ϣⲁⲣⲟⲕ ⲛ̀ϫⲉ ⲡⲓϨⲓⲏⲃ: ⲫⲏⲉ̀ⲧⲱ̀ⲗⲓ ⲙ̀ⲫ̀ⲛⲟⲃⲓ ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ.\n\nⲪⲁⲓ ⲡⲉ ⲡⲓϨⲓⲏⲃ ⲛ̀ⲧⲉ Ⲫϯ: ⲫⲏⲉ̀ⲧⲱ̀ⲗⲓ ⲙ̀ⲫ̀ⲛⲟⲃⲓ ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ: ⲫⲏⲉ̀ⲧⲁϥⲓ̀ⲛⲓ ⲛ̀ⲟ̀ⲩⲧⲁⲡ ⲛ̀ⲥⲱϯ: ⲉⲑⲣⲉϥⲛⲟϩⲉⲙ ⲙ̀ⲡⲉϥⲗⲁⲟⲥ.\n\nⲀ̀ⲙⲱⲓⲛⲓ ⲛⲓⲗⲁⲟⲥ ⲧⲏⲣⲟⲩ: ⲛⲓⲟ̀ⲩⲣⲱⲟ̀ⲩ ⲛ̀ⲧⲉ ⲡ̀ⲕⲁϩⲓ: ⲛⲓⲙⲉⲧⲙⲁⲧⲟⲓ ⲛ̀ⲧⲉ ⲛⲓⲫⲏⲟⲩⲓ̀: ⲉⲛϩⲱⲥ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲟ̀ⲩⲙⲉⲧⲁ̀ⲑⲙⲟⲩⲛⲕ.\n\nⲈⲛⲱ̀ϣ ⲉ̀ⲃⲟⲗ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ: ϫⲉ ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲅⲓⲟⲥ: ⲁ̀ⲅⲓⲟⲥ Ⲕⲩⲣⲓⲟⲥ: ⲫⲁⲓ ⲡⲉ ⲠⲁϢⲏⲣⲓ ⲡⲁⲙⲉⲛⲣⲓⲧ.\n\nϦⲉⲛ ⲛⲁⲓ ⲧⲉⲛⲣⲁϣⲓ ⲧⲉⲛⲉ̀ⲣⲯⲁⲗⲓⲛ: ⲛⲉⲙ ⲛⲓⲁ̀ⲅⲅⲉⲗⲟⲥ ⲉ̅ⲑ̅ⲩ̅: ϧⲉⲛ ⲟ̀ⲩⲑⲉⲗⲏⲗ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ: ϫⲉ ⲟ̀ⲩⲱ̀ⲟ̀ⲩ ϧⲉⲛ ⲛⲏⲉ̀ⲧϭⲟⲥⲓ ⲙ̀Ⲫϯ.\n\nⲚⲉⲙ ⲟ̀ⲩϩⲓⲣⲏⲛⲏ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ: ⲛⲉⲙ ⲟ̀ⲩϯⲙⲁϯ ϧⲉⲛ ⲛⲓⲣⲱⲙⲓ: ϫⲉ ⲁϥϯⲙⲁϯ ⲅⲁⲣ ⲛ̀ϧⲏϯ: ⲛ̀ϫⲉ ⲫⲏⲉ̀ⲧⲉ ⲫⲱϥ ⲡⲉ ⲡⲓⲱ̀ⲟ̀ⲩ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅: Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ϣⲏⲣⲓ ⲙ̀Ⲫϯ: ⲁϥϭⲓⲱ̀ⲙⲥ ϧⲉⲛ ⲡⲓⲒⲟⲣⲇⲁⲛⲏⲥ.\n\n+ Ⲫⲁⲓ ⲉ̀ⲣⲉ ⲡⲓⲱ̀ⲟ̀ⲩ ⲉⲣⲡ̀ⲣⲉⲡⲓ ⲛⲁϥ: ⲛⲉⲙ Ⲡⲉϥⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅: ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ.",
    english:
      'The only-begotten God, came to the Jordan, and the portrait that was destroyed, and ruined by sin.\n\nHe restored it once again, by the baptism of water, He crushed the head of the dragon, upon the water of the Jordan.\n\nYou have seen the Holy Spirit, coming down from heaven, and you have heard the voice of the Father, proclaiming and saying.\n\n"This is My beloved Son, with whom My soul is well pleased, He does My will hear Him, for He is the life-Giver."\n\nIsaiah the prophet, spoke of the honor of the forerunner, Saint John the celibate, the relative of Christ.\n\nBlessed are You O Christ our Master, the only-begotten Son, who was incarnate of the Virgin, and was baptized in the Jordan.\n\nRejoice like the lambs, O Jordan and its shores, for unto you came the Lamb, who carries the sin of the world.\n\nThis is the Lamb of God, who carried the sin of the world, who brought a horn of salvation, in order to save His people.\n\nCome all you peoples, and kings of the earth, and all the heavenly hosts, to praise Him unceasingly.\n\nProclaiming and saying, "Holy holy, holy O Lord, this My beloved Son."\n\nWherefore we rejoice and sing, with the holy angels, with joy saying, "Glory to God in the highest."\n\nAnd peace on earth, and good will towards men, for He was pleased by You, who is worthy of glory forever.\n\nAlleluia Alleluia, Alleluia Alleluia, Jesus Christ the Son of God, was baptized in the Jordan.\n\n+ This is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.',
    englishArabic:
      "El-Ilah el-waheed, ga' ila el-Ordon, was-soura allati fasadat, wa matat bil-khatiya.\n\nGaddadaha marra ukhra, bi 'imad el-ma', wa radd ra's et-tinneen, 'ala miyah el-Ordon.\n\nNazarta er-Rouh el-Qudus, alladhi nazal men es-sama', wa sami'ta sawt el-Ab, yasrukh qa'elan:\n\nHadha howa ebni habeebi, alladhi surrat bihi nafsi, wa sana' mashee'ati, lahu isma'ou, li'annahu howa el-muhyi.\n\nAsh'iya' en-nabi, nataq bi karamat es-sabeq, el-batoul et-taher Youhanna, naseeb el-Maseeh.\n\nMubarak anta ya sayyidana el-Maseeh, el-Ebn el-waheed, alladhi tagassad men el-'Adhra', wa e'tamad fil-Ordon.\n\nTahallal mithl humlan, ayyuha el-Ordon wa barriyatuh, fa qad ata ilayk el-Hamal, hamel khatiyat el-'alam.\n\nHadha howa Hamal Allah, hamel khatiyat el-'alam, alladhi ga' bi qarn khalas, li-yukhallis sha'bahu.\n\nTa'alaw ya gamee' esh-shu'oub, wa mulouk el-ard, wal-gunoud es-sama'iya, li-nusabbihahu bi ghayr futour.\n\nSarikheen qa'ileen, quddous quddous, quddous er-Rab, hadha howa ebni habeebi.\n\nBi hadha nafrah wa nurattel, ma'a el-mala'ika el-athar, bi tahleel qa'ileen, el-magd lillah fil-a'ali.\n\nWa 'ala el-ard es-salam, wa fin-nas el-masarra, li'annahu surra bik, alladhi lahu el-magd ila el-abad.\n\nHalleluya halleluya, halleluya halleluya, Yasou' el-Maseeh ebn Allah, e'tamad fil-Ordon.\n\n+ Hadha alladhi yanbaghi lahu el-magd, ma'a abeeh es-saleh, war-Rouh el-Qudus, men el-aan wa ila el-abad.",
    arabic:
      "الإله الوحيد، جاء إلى الأردن، والصورة التى فسدت، وماتت بالخطية.\n\nجددها مرة أخرى، بعماد الماء، ورض رأس التنين، على مياه الأردن.\n\nنظرت الروح القدس، الذي نزل من السماء، وسمعت صوت الآب، يصرخ قائلاً:\n\nهذا هو إبني حبيبي الذي سُرّت به نفسي وصنع مشيئتي له إسمعوا لأنه هو المحيي.\n\nأشعياء النبى، نطق بكرامة السابق، البتول الطاهر يوحنا، نسيب المسيح.\n\nمبارك أنت يا سيدنا المسيح، الإبن الوحيد، الذي تجسد من العذراء، وأعتمد فى الأردن.\n\nتهلل مثل حملان، أيها الأردن وبريته، فقد أتى إليك الحمل، حامل خطيه العالم.\n\nهذا هو حمل الله، حامل خطية العالم، الذي جاء بقرن خلاص، ليخلص شعبه.\n\nتعالوا يا جميع الشعوب، وملوك الأرض، والجنود السمائية، لنسبحه بغير فتور.\n\nصارخين قائلين، قدوس قدوس، قدوس الرب، هذا هو إبنى حبيبى.\n\nبهذا نفرح ونرتل، مع الملائكة الأطهار، بتهليل قائلين، المجد لله فى الأعالى.\n\nوعلى الأرض السلام، وفى الناس المسرة، لأنه سر بك، الذى له المجد إلى الأبد.\n\nهلليلويا هلليلويا، هلليلويا هلليلويا، يسوع المسيح إبن الله، اعتمد في الأردن.\n\n+ هذا الذى ينبغى له المجد، مع أبيه الصالح، والروح القدس، من الآن وإلى الأبد.",
  },
  jonah: {
    coptic:
      "Ⲓⲱⲛⲁ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ: ⲛⲁϥⲭⲏ ϧⲉⲛ ⲑ̀ⲛⲉϫⲓ ⲙ̀ⲡⲓⲕⲏⲧⲟⲥ: ⲛ̀ϣⲟⲙⲧ ⲛ̀ⲉ̀ϩⲟⲟⲩ ⲛⲉⲙ ϣⲟⲙⲧ ⲛ̀ⲉ̀ϫⲱⲣϩ: ⲕⲁⲧⲁ ⲡⲓⲕⲱⲥ ⲙ̀ⲡⲉⲛⲤⲱⲧⲏⲣ.\n\n+ Ⲁϥⲟⲩⲱⲣⲡ ⲙ̀ⲙⲟϥ ⲛ̀ϫⲉ Ⲡ̀ⲟ̅ⲥ̅ Ⲫ̀ϯ: ϣⲁ ⲛⲓⲣⲱⲙⲓ ⲛ̀ⲧⲉ Ⲛⲓⲛⲉⲩⲏ̀: ⲁϥϩⲓⲱⲓϣ ⲛⲱⲟⲩ ⲕⲁⲧⲁ ⲡⲉϥⲥⲁϫⲓ: ⲟⲩⲟϩ ⲁⲩⲉⲣⲙⲉⲧⲁⲛⲟⲓⲛ.\n\nⲚ̀ϣⲟⲙⲧ ⲛ̀ⲉ̀ϩⲟⲟⲩ ⲛⲉⲙ ϣⲟⲙⲧ ⲛ̀ⲉ̀ϫⲱⲣϩ: ϧⲉⲛ ϩⲁⲛϣ̀ⲗⲏⲗ ⲛⲉⲙ ϩⲁⲛⲛⲏⲥⲧⲓⲁ: ⲛⲉⲙ ⲛⲓⲛⲁϩⲕⲓ ⲛⲉⲙ ⲛⲓⲉⲣⲙⲱⲟⲩⲓ̀: ⲛⲓϩⲁⲗⲁϯ ⲛⲉⲙ ⲛⲓⲧⲉⲃⲛⲱⲟⲩⲓ̀.\n\n+ Ⲁϥϣⲱⲡ ⲉ̀ⲣⲟϥ ⲛ̀ⲧⲟⲩⲙⲉⲧⲁⲛⲟⲓⲁ: ⲛ̀ϫⲉ Ⲫ̀ϯ ⲟⲩⲟϩ ⲁϥⲛⲁⲓ ⲛⲱⲟⲩ: ⲁϥⲱ̀ⲗⲓ ⲙ̀ⲡⲉϥϫⲱⲛⲧ ⲉ̀ⲃⲟⲗ ϩⲁⲣⲱⲟⲩ: ⲁϥⲭⲁ ⲛⲟⲩⲛⲟⲃⲓ ⲛⲱⲟ̀ⲩ ⲉ̀ⲃⲟⲗ.\n\nⲦⲉⲛⲧⲱⲃϩ ⲙ̀ⲙⲟⲕ ⲱ̀ ⲡⲓⲚⲁⲏⲧ: ⲁ̀ⲣⲓⲟⲩⲓ̀ ⲛⲉⲙⲁⲛ ϧⲁ ⲛⲓⲣⲉϥⲉⲣⲛⲟⲃⲓ: ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲛⲓⲣⲉⲙⲚⲓⲛⲉⲩⲏ̀: ⲛⲁⲓ ⲛⲁⲛ ⲕⲁⲧⲁ ⲡⲉⲕⲛⲓϣϯ ⲛ̀ⲛⲁⲓ.\n\n+ Ϫⲉ ⲛ̀ⲑⲟⲕ ⲟⲩⲚⲟⲩϯ ⲛ̀ⲛⲁⲏⲧ: ⲡⲓⲙⲏϣ ⲛ̀ⲛⲁⲓ ⲛ̀ⲣⲉϥϣⲉⲛϩⲏⲧ: ⲟⲩⲟϩ ⲡⲓⲢⲉϥⲱ̀ⲟⲩⲛ̀ϩⲏⲧ: ⲡⲓⲘⲁⲓⲣⲱⲙⲓ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ.\n\nϪⲉ ⲭ̀ⲟⲩⲱϣ ⲙ̀ⲫ̀ⲙⲟⲩ ⲁⲛ ⲙ̀ⲡⲓⲣⲉϥⲉⲣⲛⲟⲃⲓ: ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲧⲉϥⲕⲟⲧϥ ⲟⲩⲟϩ ⲛ̀ⲧⲉϥⲱⲛϧ: ϣⲟⲡⲧⲉⲛ ⲉ̀ⲣⲟⲕ ⲟⲩⲟϩ ⲛⲁⲓ ⲛⲁⲛ: ⲭⲱ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ ⲛ̀ⲛⲉⲛⲛⲟⲃⲓ.\n\n+ Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ⲟ̅ⲥ̅ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲣⲉϥϩⲓⲱⲓϣ ⲛ̀ⲧⲉ ⲛⲓⲣⲉⲙⲚⲓⲛⲉⲩⲏ̀: Ⲓⲱⲛⲁ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.",
    english:
      "Jonah the prophet, was in the belly of the whale, for three days and three nights, like the burial of our Savior.\n\n+ The Lord God sent him, to the people of Nineveh, he preached to them His word, and they repented.\n\nFor three days and three nights, they were in prayer and fasting, with pain and tears, with the birds and animals.\n\n+ God accepted their repentance, and had mercy upon them, He lifted His anger away from them, and forgave them their sins.\n\nWe pray to You O merciful One, deal with us the sinners, like the people of Nineveh, have mercy upon us according to Your great mercy.\n\n+ For You are a merciful God, of great compassion, and full of patience, the good Lover of mankind.\n\nFor You do not desire the death of a sinner, rather he returns and lives, accept us and have mercy on us, and forgive us our sins.\n\n+ Pray to the Lord on our behalf, O preacher of the Ninevites, Jonah the prophet, that He may forgive us our sins.",
    englishArabic:
      "Younan en-nabi, kan fi batn el-hout, thalathat ayyam wa thalath layal, ka dafn mukhallisina.\n\n+ Arsalahu er-Rab el-Ilah, ila rigal Neenawa, fa karaz lahum, ka qawlihi fa tabou.\n\nThalathat ayyam wa thalath layal, bi salawat wa aswam, ma'a et-tamakhkhud wad-dumou', wa hakadha et-tuyour wal-baha'em.\n\n+ Fa qabil Allah, tawbatahum wa rahimahum, wa rafa' ghadabahu 'anhum, wa ghafar lahum khataiyahum.\n\nNatlub ilayk ayyuha er-Rahoum, an tasna' ma'ana nahnu el-khutah, mithl ahl Neenawa, warhamna ka 'azeem rahmatak.\n\n+ Li'annaka anta Ilah rahoum, katheer er-rahma, mutahannin wa taweel el-anah, muhibb el-bashar es-saleh.\n\nLi'annaka la tasha' mawt el-khati', mithl an yarga' wa yahya, iqbalna ilayk warhamna, waghfir lana khataiyana.\n\n+ Utlub men er-Rab 'anna, ayyuha el-karouz li-ahl Neenawa, Younan en-nabi, li-yaghfir lana khataiyana.",
    arabic:
      "يونان النبي، كان في بطن الحوت، ثلاثة أيام وثلاث ليال، كدفن مخلصنا.\n\n+ أرسله الرب الإله، إلي رجال نينوى، فكرز لهم، كقوله فتابوا.\n\nثلاثة أيام وثلاث ليال، بصلوات وأصوام، مع التمخض والدموع، وهكذا الطيور والبهائم.\n\n+ فقبل الله، توبتهم ورحمهم، ورفع غضبه عنهم، وغفر لهم خطاياهم.\n\nنطلب إليك أيها الرحوم، أن تصنع معنا نحن الخطاة، مثل أهل نينوى، وارحمنا كعظيم رحمتك.\n\n+ لأنك أنت إله رحوم، كثير الرحمة، متحنن وطويل الأناة، محب البشر الصالح.\n\nلأنك لا تشاء موت الخاطئ، مثل أن يرجع ويحيا، إقبلنا إليك وإرحمنا، واغفر لنا خطايانا.\n\n+ أطلب من الرب عنا، أيها الكاروز لأهل نينوي، يونان النبي، ليغفر لنا خطايانا.",
  },
};

// The reader's introduction to the Praxis, like the Pauline Epistle's (said in every Liturgy, not only before a bishop)
export const praxisReading: LanguageVersion[] = [
  {
    language: "coptic",
    text: "Ⲡⲓⲁⲛⲁⲅⲛⲱⲥⲧⲏⲥ:\n\nⲠⲣⲁⲝⲓⲥ ⲛ̀ⲧⲉ ⲛⲉⲛⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲉ̀ⲣⲉ ⲡⲟⲩⲥ̀ⲙⲟⲩ ⲉⲑⲟⲩⲁⲃ ϣⲱⲡⲓ ⲛⲉⲙⲁⲛ.",
  },
  {
    language: "english",
    text: "Reader:\n\nThe Acts of our fathers the apostles, may their holy blessings be with us.",
  },
  {
    language: "englishArabic",
    text: "El-Qari':\n\nA'mal aba'ina er-rusul, barakatuhum el-muqaddasa takoun ma'ana.",
  },
  {
    language: "arabic",
    text: "القارئ:\n\nأعمال آبائنا الرسل، بركتهم المقدسة تكون معنا.",
  },
];

// Sung in the Offering of the Lamb every day but Wednesday and Friday, when "Alleluia, the Thought of Man" is sung
export const alleluiaFaiPePiehoou: LanguageVersion[] = [
  {
    language: "coptic",
    text: "Ⲡⲓⲗⲁⲟⲥ:\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲪⲁⲓ ⲡⲉ ⲡⲓⲉ̀ϩⲟⲟⲩ ⲉ̀ⲧⲁ Ⲡ̀ⲟ̅ⲥ̅ ⲑⲁⲙⲓⲟϥ: ⲙⲁⲣⲉⲛⲑⲉⲗⲏⲗ ⲛ̀ⲧⲉⲛⲟ̀ⲩⲛⲟϥ ⲙ̀ⲙⲟⲛ ⲛ̀ϧⲏⲧϥ.\n\nⲰ̀ Ⲡ̀ⲟ̅ⲥ̅ ⲉⲕⲉ̀ⲛⲁϩⲙⲉⲛ: ⲱ̀ Ⲡ̀ⲟ̅ⲥ̅ ⲉⲕⲉ̀ⲥⲟⲩⲧⲉⲛ ⲛⲉⲛⲙⲱⲓⲧ.\n\nϤ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲫⲏⲉ̀ⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ̀ⲟ̅ⲥ̅: ⲁ̅ⲗ̅.",
  },
  {
    language: "english",
    text: "People:\n\nAlleluia.\n\nThis is the day that the Lord has made, let us rejoice and be glad in it.\n\nO Lord save us, O Lord straighten our ways.\n\nBlessed is He who comes in the name of the Lord. Alleluia.",
  },
  {
    language: "englishArabic",
    text: "Esh-Sha'b:\n\nHalleluya.\n\nHadha howa el-yawm alladhi sana'ahu er-Rab, falnafrah wa nabtahig fihi.\n\nYa Rab khallisna, ya Rab sahhil sabeelana.\n\nMubarak el-aati bismi er-Rab. Halleluya.",
  },
  {
    language: "arabic",
    text: "الشعب:\n\nهلليلويا.\n\nهذا هو اليوم الذي صنعه الرب، فلنفرح ونبتهج فيه.\n\nيا رب خلصنا، يا رب سهل سبيلنا.\n\nمبارك الآتي باسم الرب. هلليلويا.",
  },
];

// Annual's Adam Verses of the Cymbals (Ⲁⲙⲱⲓⲛⲓ ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ), the words the owner gave (2026-10-28)
export const annualAmoini: LanguageVersion[] = [
  { language: "coptic", text: "Ⲡⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ.\n\nⲀⲙⲱⲓⲛⲓ ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ: ⲛ̀Ϯⲧ̀ⲣⲓⲁⲥ ⲉⲑⲟⲩⲁⲃ: ⲉ̀ⲧⲉ Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ Ⲉⲑⲟⲩⲁⲃ.\n\nⲀⲛⲟⲛ ϧⲁ ⲛⲓⲗⲁⲟⲥ: ⲛ̀ⲭ̀ⲣⲓⲥⲧⲓⲁⲛⲟⲥ: ⲫⲁⲓ ⲅⲁⲣ ⲡⲉ Ⲡⲉⲛⲛⲟⲩϯ: ⲛ̀ⲁ̀ⲗⲏⲑⲓⲛⲟⲥ.\n\nⲞⲩⲟⲛ ⲟⲩϩⲉⲗⲡⲓⲥ ⲛ̀ⲧⲁⲛ: ϧⲉⲛ ⲑⲏⲉⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ: ⲉ̀ⲣⲉ Ⲫϯ ⲛⲁⲓ ⲛⲁⲛ: ϩⲓⲧⲉⲛ ⲛⲉⲥⲡ̀ⲣⲉⲥⲃⲓⲁ.\n\nⲞⲩⲟⲛ ⲟⲩⲙⲉⲧⲥⲉⲙⲛⲟⲥ: ⲛ̀ϩ̀ⲣⲏⲓ ϧⲉⲛ ⲡⲁⲓⲕⲟⲥⲙⲟⲥ ⲉ̀ⲃⲟⲗϩⲓⲧⲉⲛ ⲡⲓϣ̀ⲗⲏⲗ: ⲛ̀ⲧⲉ ϯⲁ̀ⲅⲓⲁ Ⲙⲁⲣⲓⲁ ϯⲡⲁⲣⲑⲉⲛⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϯϭⲣⲟⲙⲡⲓ ⲉⲑⲛⲉⲥⲱⲥ: ⲑⲏⲉ̀ⲧⲁⲥⲙⲓⲥⲓ ⲛⲁⲛ: ⲙ̀Ⲫⲛⲟⲩϯ ⲡⲓⲗⲟⲅⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϧⲉⲛ ⲟⲩⲭⲉⲣⲉ ⲉϥⲟⲩⲁⲃ: ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲑ̀ⲙⲁⲩ ⲙ̀ⲫⲏⲉⲑⲟⲩⲁⲃ.\n\nⲬⲉⲣⲉ Ⲙⲓⲭⲁⲏⲗ: ⲡⲓⲛⲓϣϯ ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ: ⲭⲉⲣⲉ Ⲅⲁⲃⲣⲓⲏⲗ: ⲡⲓⲥⲟⲧⲡ ⲙ̀ⲡⲓϥⲁⲓϣⲉⲛⲛⲟⲩϥⲓ.\n\nⲬⲉⲣⲉ Ⲙⲓⲭⲁⲏⲗ: ⲡⲓⲛⲓϣϯ ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲁⲣⲭⲏⲥ̀ⲧⲣⲁⲧⲓⲅⲟⲥ: ⲛ̀ⲧⲉ ⲧ̀ϫⲟⲙ ⲛ̀ⲛⲓⲫⲏⲟⲩⲓ.\n\nⲬⲉⲣⲉ ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ: ⲭⲉⲣⲉ ⲛⲓⲥⲉⲣⲁⲫⲓⲙ: ⲭⲉⲣⲉ ⲛⲓⲧⲁⲅⲙⲁ ⲧⲏⲣⲟⲩ: ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ.\n\nⲬⲉⲣⲉ Ⲓⲱⲁⲛⲛⲏⲥ: ⲡⲓⲛⲓϣϯ ⲙ̀ⲡ̀ⲣⲟⲇⲣⲟⲙⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲟⲩⲏⲃ ⲡ̀ⲥⲩⲅⲅⲉⲛⲏⲥ ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ.\n\nⲬⲉⲣⲉ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ: ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲭⲉⲣⲉ ⲛⲓⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ⲡⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲉ̀ⲩⲁ̀ⲅⲅⲉⲗⲓⲥⲧⲏⲥ: ⲭⲉⲣⲉ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲑⲉⲱ̀ⲣⲓⲙⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲡⲓϣⲱⲓϫ ⲛ̀ⲅⲉⲛⲛⲉⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ: ⲡⲁⲟ︦ⲥ︦ ⲡ̀ⲟⲩⲣⲟ Ⲅⲉⲱ̀ⲣⲅⲓⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲛⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲡⲓϣⲱⲓϫ ⲛ̀ⲅⲉⲛⲛⲉⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲁⲑⲗⲟⲫⲟⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲙⲁⲣⲧⲩⲣⲟⲥ: ⲭⲉⲣⲉ ⲡⲓϣⲱⲓϫ ⲛ̀ⲅⲉⲛⲛⲉⲟⲥ: ⲭⲉⲣⲉ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ: ⲡⲓⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲡⲁ Ⲙⲏⲛⲁ.\n\nⲰⲟⲩⲛⲓⲁⲧⲕ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ: Ⲡⲉⲛⲓⲱⲧ ⲉ︦ⲑ︦ⲩ︦ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ Ⲡⲓⲙⲁϩⲥⲟⲟϩ: ⲡⲓⲙⲉⲛⲣⲓⲧ ⲛ̀ⲧⲉ Ⲡⲭ︦ⲥ︦.\n\nⲰⲟⲩⲛⲓⲁⲧⲕ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ: ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲇⲓⲕⲉⲟⲥ: ⲁⲃⲃⲁ Ⲁⲃⲣⲁⲁⲙ ⲡⲓⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ: ⲡⲓⲙⲉⲛⲣⲓⲧ ⲛ̀ⲧⲉ Ⲡⲭ︦ⲥ︦.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲫⲏⲉⲑⲟⲩⲁⲃ: ⲡⲓⲙⲉⲛⲣⲓⲧ ⲛ̀ⲧⲉ Ⲡⲭ︦ⲥ︦: ⲡⲉⲛⲓⲱⲧ Ⲡⲓϣⲱⲓ ⲕⲁⲙⲉⲗ: ⲡⲓϩⲏⲅⲟⲩⲙⲉⲛⲟⲥ.\n\nⲦⲉⲛϯϩⲟ ⲉ̀ⲣⲟⲕ ⲱ̀ Ⲩ̀ⲓⲟⲥ Ⲑⲉⲟⲥ: ⲉⲑⲣⲉⲕⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲉⲛⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: ⲡⲁⲡⲁ Ⲁⲃⲃⲁ (...) ⲡⲓⲁⲣⲭⲏⲉ̀ⲣⲉⲩⲥ: ⲙⲁⲧⲁϫⲣⲟϥ ϩⲓϫⲉⲛ ⲡⲉϥⲑ̀ⲣⲟⲛⲟⲥ.\n\nⲚⲉⲙ ⲡⲉϥⲕⲉϣ̀ⲫⲏⲣ ⲛ̀ⲗⲓⲧⲟⲩⲣⲅⲟⲥ: ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲇⲓⲕⲉⲟⲥ Ⲁⲃⲃⲁ (...) ⲡⲓⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ (ⲡⲓⲙⲏⲧⲣⲟⲡⲟⲗⲓⲧⲏⲥ): ⲙⲁⲧⲁϫⲣⲟϥ ϩⲓϫⲉⲛ ⲡⲉϥⲑ̀ⲣⲟⲛⲟⲥ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ Ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ: Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nⲈⲑⲣⲉⲛϩⲱⲥ ⲉ̀ⲣⲟⲕ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ ⲛⲁⲓ ⲛⲁⲛ." },
  { language: "english", text: "People:\n\nLord have mercy.\n\nO come let us worship, the Holy Trinity, the Father and the Son, and the Holy Spirit.\n\nWe are the Christian people, for He is, our true God.\n\nWe have hope, in Saint Mary, that God will have mercy on us, through her intercession.\n\nAll calmness, in this world, is through the prayers, of Saint Mary the Virgin.\n\nHail to you O Mary, the beautiful dove, who has borne to us, God the Logos.\n\nHail to you O Mary, with a holy hail, hail to you O Mary, the Mother of the Holy One.\n\nHail to Michael, the great archangel, hail to Gabriel, the chosen announcer.\n\nHail to Michael, the great archangel, hail to the chief commander, of the army of the heavens.\n\nHail to the cherubim, hail to the seraphim, hail to all, the heavenly orders.\n\nHail to John, the great forerunner, hail to the priest, the kinsman of Emmanuel.\n\nHail to my lords, and fathers the apostles, hail to the disciples, of our Lord Jesus Christ.\n\nHail to you O martyr, hail to the Evangelist, hail to the Apostle, Mark the Beholder of God.\n\nHail to you O martyr, hail to the courageous hero, hail to the struggle-mantled, my lord Prince George.\n\nHail to you O martyr, hail to the courageous hero, hail to the struggle-bearer, Philopater Mercurius.\n\nHail to you O martyr, hail to the noble hero, hail to the struggle-bearer, Saint Abba Mina.\n\nBlessed are you indeed, our holy father the patriarch, Abba Kyrillos the sixth, the beloved of Christ.\n\nBlessed are you indeed, our holy and righteous father, Abba Abraam the bishop, the beloved of Christ.\n\nHail to you O saint, the beloved of Christ, Abouna Pishoy Kamel, the hegumen.\n\nWe ask You O Son of God, to keep the life of our patriarch, Pope Abba (...) the high priest, confirm him upon his throne.\n\nAnd his partner in the liturgy, our holy righteous father, Abba (...) the bishop (metropolitan), confirm him upon his throne.\n\nThrough the intercessions, of the Theotokos Saint Mary, O Lord grant us, the forgiveness of our sins.\n\nThat we may praise You, with Your good Father, and the Holy Spirit, for You have come and saved us. Have mercy on us." },
  { language: "englishArabic", text: "Esh-Sha'b:\n\nYa Rab irham.\n\nTa'alaw falnasgod lit-Thalouth el-Qudous, alladhi howa el-Ab wal-Ebn war-Rouh el-Qudus.\n\nNahnu esh-shu'oub el-maseeheyyeen, li'anna hadha howa ilahuna el-haqeeqi.\n\nLana raga' fil-qiddisa Maryam, Allah yarhamna bi shafa'atiha.\n\nKull hudou' fil-'alam, men qibal salat el-qiddisa Maryam el-'Adhra'.\n\nEs-salam laki ya Maryam el-hamama el-hasana, allati waladat lana Allah el-Kalema.\n\nEs-salam laki ya Maryam salaman muqaddasan, es-salam laki ya Maryam umm el-Qudous.\n\nEs-salam li-Mikha'eel ra'ees el-mala'ika el-'azeem, es-salam li-Ghobrial el-mubashshir el-mukhtar.\n\nEs-salam li-Mikha'eel ra'ees el-mala'ika el-'azeem, es-salam li-ra'ees gunoud quwwat es-samawat.\n\nEs-salam lish-Sharoubeem, es-salam lis-Seraafeem, es-salam li-gamee' et-taghamat es-sama'iya.\n\nEs-salam li-Youhanna es-sabeq el-'azeem, es-salam lil-kahen naseeb 'Emmanu'eel.\n\nEs-salam li-sadati el-aba' er-rusul, es-salam li-talameedh Rabbina Yasou' el-Maseeh.\n\nEs-salam lak ayyuha esh-shaheed, es-salam lil-Engeeli, es-salam lir-rasoul Morqos nazer el-Ilah.\n\nEs-salam lak ayyuha esh-shaheed, es-salam lish-shuga' el-mugahid, es-salam li-labis el-gihad, sayyidi el-malek Gi'orgios.\n\nEs-salam lak ayyuha esh-shaheed, es-salam lish-shuga' el-batal, es-salam lil-mugahid Muhibb el-Ab Marqourios.\n\nEs-salam lak ayyuha esh-shaheed, es-salam lish-shuga' el-batal, es-salam lil-mugahid el-qiddis Aba Mina.\n\nToubaka bil-haqeeqa ya abana el-qiddis el-batriyark, el-Anba Kyrillos es-sades, habeeb el-Maseeh.\n\nToubaka bil-haqeeqa ya abana el-qiddis el-barr, el-Anba Abraam el-osqof, habeeb el-Maseeh.\n\nEs-salam lak ayyuha el-qiddis, habeeb el-Maseeh, Abouna el-Qommos Bishoy Kamel.\n\nNas'alak ya Ebn Allah, an tahfaz hayat batriyarkina, el-Baba Anba (...) ra'ees el-kahana, thabbithu 'ala kursiyyihi.\n\nWa shareekuhu fil-khidma er-rasouliya, abana el-qiddis el-barr, Anba (...) el-osqof (el-metran), thabbithu 'ala kursiyyihi.\n\nBi shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rab an'em 'alayna bi maghfirat khataiyana.\n\nLikay nusabbihak, ma'a abeek es-saleh, war-Rouh el-Qudus, li'annaka atayta wa khallastana, irhamna." },
  { language: "arabic", text: "الشعب:\n\nيا رب ارحم.\n\nتعالوا فلنسجد للثالوث القدوس، الذي هو الآب والابن والروح القدس.\n\nنحن الشعوب المسيحيين، لأن هذا هو إلهنا الحقيقي.\n\nلنا رجاء في القديسة مريم، الله يرحمنا بشفاعاتها.\n\nكل هدوء في العالم، من قبل صلاة القديسة مريم العذراء.\n\nالسلام لك يا مريم الحمامة الحسنة، التي ولدت لنا الله الكلمة.\n\nالسلام لك يا مريم سلاماً مقدساً، السلام لك يا مريم أم القدوس.\n\nالسلام لميخائيل رئيس الملائكة العظيم، السلام لغبريال المبشر المختار.\n\nالسلام لميخائيل رئيس الملائكة العظيم، السلام لرئيس جنود قوات السموات.\n\nالسلام للشاروبيم، السلام للسيرافيم، السلام لجميع الطغمات السمائية.\n\nالسلام ليوحنا السابق العظيم، السلام للكاهن نسيب عمانوئيل.\n\nالسلام لسادتي الآباء الرسل، السلام لتلاميذ ربنا يسوع المسيح.\n\nالسلام لك أيها الشهيد، السلام للإنجيلي، السلام للرسول مرقس ناظر الإله.\n\nالسلام لك أيها الشهيد، السلام للشجاع المجاهد، السلام للابس الجهاد سيدي الملك جيؤرجيوس.\n\nالسلام لك أيها الشهيد، السلام للشجاع البطل، السلام للمجاهد محب الآب مرقوريوس.\n\nالسلام لك أيها الشهيد، السلام للشجاع البطل، السلام للمجاهد القديس أبا مينا.\n\nطوباك بالحقيقة يا أبانا القديس البطريرك، الأنبا كيرلس السادس، حبيب المسيح.\n\nطوباك بالحقيقة يا أبانا القديس البار، الأنبا أبرآم الأسقف، حبيب المسيح.\n\nالسلام لك أيها القديس، حبيب المسيح، أبونا القمص بيشوي كامل.\n\nنسألك يا ابن الله، أن تحفظ حياة بطريركنا، البابا أنبا (...) رئيس الكهنة، ثبته على كرسيه.\n\nوشريكه في الخدمة الرسولية، أبانا القديس البار، أنبا (...) الأسقف (المطران)، ثبته على كرسيه.\n\nبشفاعات والدة الإله القديسة مريم، يا رب أنعم علينا بمغفرة خطايانا.\n\nلكي نسبحك، مع أبيك الصالح، والروح القدس، لأنك أتيت وخلصتنا، ارحمنا." },
];
