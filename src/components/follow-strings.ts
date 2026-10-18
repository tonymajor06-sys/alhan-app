import { toArabicDigits } from '@/data/coptic-calendar';
import { PraiseKind } from '@/data/follow-along';

// Words for following tonight's Midnight or Vesper Praises in order
export const followStrings = {
  en: {
    title: { midnight: 'Midnight Praises in Order', vesper: 'Vesper Praises in Order' } as Record<PraiseKind, string>,
    kind: { midnight: 'Midnight Praises', vesper: 'Vesper Praises' } as Record<PraiseKind, string>,
    // The church's day begins the evening before: Saturday night is Sunday's
    night: (day: string, eve: string) => `${eve} night · ${day}'s Psali and Theotokia`,
    praises: 'The Praises',
    day: (day: string) => `${day}'s Psali and Theotokia`,
    conclusion: 'Conclusion',
    start: '▶ Start from the beginning',
    playAll: '♪ Play all',
    position: (i: number, n: number) => `${i} of ${n}`,
    note: 'In order, as prayed that night. Tap any hymn, then use Next to keep going.',
  },
  ar: {
    title: { midnight: 'تسبحة نصف الليل بالترتيب', vesper: 'تسبحة العشية بالترتيب' } as Record<PraiseKind, string>,
    kind: { midnight: 'تسبحة نصف الليل', vesper: 'تسبحة العشية' } as Record<PraiseKind, string>,
    // "ليلة الأحد" is the night before Sunday
    night: (day: string) => `ليلة ${day} · إبصالية وثيؤطوكية ${day}`,
    praises: 'التسبحة',
    day: (day: string) => `إبصالية وثيؤطوكية ${day}`,
    conclusion: 'الختام',
    start: '▶ ابدأ من البداية',
    playAll: '♪ تشغيل الكل',
    position: (i: number, n: number) => `${toArabicDigits(i)} من ${toArabicDigits(n)}`,
    note: 'بالترتيب كما تُصلّى في تلك الليلة. اضغط على أي لحن ثم «التالي» لتكمل.',
  },
};
