import { toArabicDigits } from '@/data/coptic-calendar';
import { PraiseKind } from '@/data/follow-along';

// Words for following tonight's Midnight or Vesper Praises in order
export const followStrings = {
  en: {
    title: { midnight: "Tonight's Midnight Praises", vesper: "Tonight's Vesper Praises" } as Record<PraiseKind, string>,
    open: { midnight: "Follow tonight's Midnight Praises", vesper: "Follow tonight's Vesper Praises" } as Record<PraiseKind, string>,
    // The church's day begins the evening before: Saturday night is Sunday's
    night: (day: string, eve: string) => `${eve} night · ${day}'s Psali and Theotokia`,
    tonight: 'Tonight',
    whichNight: 'Which night',
    praises: 'The Praises',
    day: (day: string) => `${day}'s Psali and Theotokia`,
    conclusion: 'Conclusion',
    start: '▶ Start from the beginning',
    playAll: '♪ Play all',
    position: (i: number, n: number) => `${i} of ${n}`,
    note: 'In order, as prayed tonight. Tap any hymn, then use Next to keep going.',
  },
  ar: {
    title: { midnight: 'تسبحة نصف الليل الليلة', vesper: 'تسبحة العشية الليلة' } as Record<PraiseKind, string>,
    open: { midnight: 'تابع تسبحة نصف الليل الليلة', vesper: 'تابع تسبحة العشية الليلة' } as Record<PraiseKind, string>,
    // "ليلة الأحد" is the night before Sunday
    night: (day: string) => `ليلة ${day} · إبصالية وثيؤطوكية ${day}`,
    tonight: 'الليلة',
    whichNight: 'أي ليلة',
    praises: 'التسبحة',
    day: (day: string) => `إبصالية وثيؤطوكية ${day}`,
    conclusion: 'الختام',
    start: '▶ ابدأ من البداية',
    playAll: '♪ تشغيل الكل',
    position: (i: number, n: number) => `${toArabicDigits(i)} من ${toArabicDigits(n)}`,
    note: 'بالترتيب كما تُصلّى الليلة. اضغط على أي لحن ثم «التالي» لتكمل.',
  },
};
