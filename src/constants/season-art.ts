import type { ImageSourcePropType } from 'react-native';

import type { AppLanguage } from '@/hooks/use-settings';

// Each season's picture (drawn for the app) and a short line under its name saying when it is prayed
// `card` is a shorter name for the picture cards, where the full name would not fit
export const seasonArt: Record<string, { image: ImageSourcePropType; about: Record<AppLanguage, string>; card?: Record<AppLanguage, string> }> = {
  annual: {
    image: require('../../assets/images/seasons/annual.png'),
    about: { en: 'Every day of the year', ar: 'طوال أيام السنة' },
  },
  nayrouz: {
    image: require('../../assets/images/seasons/nayrouz.png'),
    about: { en: 'Tout 1', ar: '١ توت' },
  },
  cross: {
    image: require('../../assets/images/seasons/cross.png'),
    about: { en: 'Tout 17 to 19', ar: '١٧ إلى ١٩ توت' },
  },
  'nativity-fast': {
    image: require('../../assets/images/seasons/nativity-fast.png'),
    about: { en: 'The 43 days before Christmas', ar: 'الثلاثة والأربعون يوماً قبل عيد الميلاد' },
  },
  kiahk: {
    image: require('../../assets/images/seasons/kiahk.png'),
    about: { en: 'The month of the Kiahk praises', ar: 'شهر التسابيح الكيهكية' },
  },
  nativity: {
    image: require('../../assets/images/seasons/nativity.png'),
    about: { en: 'Christmas · Kiahk 29', ar: '٢٩ كيهك' },
  },
  theophany: {
    image: require('../../assets/images/seasons/theophany.png'),
    about: { en: 'Tobi 11', ar: '١١ طوبة' },
    card: { en: "Theophany", ar: 'الغطاس' },
  },
  jonah: {
    image: require('../../assets/images/seasons/jonah.png'),
    about: { en: 'Three days, two weeks before Lent', ar: 'ثلاثة أيام قبل الصوم الكبير بأسبوعين' },
    card: { en: "Jonah's Fast", ar: 'صوم يونان' },
  },
  'great-lent': {
    image: require('../../assets/images/seasons/great-lent.png'),
    about: { en: 'Weekdays, weekends and the praises', ar: 'أيام الأسبوع والسبوت والآحاد والتسبحة' },
  },
  'palm-sunday': {
    image: require('../../assets/images/seasons/palm-sunday.png'),
    about: { en: 'Hosanna Sunday', ar: 'أحد الشعانين' },
  },
  'holy-week': {
    image: require('../../assets/images/seasons/holy-week.png'),
    about: { en: 'Pascha, to Bright Saturday', ar: 'البصخة حتى سبت النور' },
  },
  pentecost: {
    image: require('../../assets/images/seasons/pentecost.png'),
    about: { en: 'Resurrection · Ascension · Pentecost', ar: 'القيامة · الصعود · العنصرة' },
    card: { en: "Resurrection & 50 Days", ar: 'القيامة والخماسين' },
  },
  'apostles-fast': {
    image: require('../../assets/images/seasons/apostles-fast.png'),
    about: { en: 'Fast and feast of the Apostles', ar: 'صوم وعيد الرسل' },
    card: { en: "Apostles' Fast", ar: 'صوم الرسل' },
  },
  'st-mary': {
    image: require('../../assets/images/seasons/st-mary.png'),
    about: { en: 'Fast and the Assumption', ar: 'الصوم وعيد صعود الجسد' },
    card: { en: "St. Mary's Fast", ar: 'صوم العذراء' },
  },
  'minor-feasts': {
    image: require('../../assets/images/seasons/minor-feasts.png'),
    about: {
      en: 'Circumcision · Cana · Presentation · Annunciation · Transfiguration',
      ar: 'الختان · عرس قانا · دخول المسيح الهيكل · البشارة · التجلي',
    },
  },
};
