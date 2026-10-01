import type { AppLanguage } from '@/hooks/use-settings';

// Arabic display names, keyed by the id used in hymns.ts
const arabicTitles: Record<string, string> = {
  // Main categories
  responses: 'مردات الشماس والهيكل',
  hymns: 'الألحان',

  // Seasons
  annual: 'الألحان السنوية',
  nayrouz: 'عيد النيروز (رأس السنة القبطية)',
  cross: 'عيد الصليب',
  'nativity-fast': 'صوم الميلاد',
  kiahk: 'شهر كيهك وتسابيحه',
  nativity: 'عيد الميلاد المجيد',
  theophany: 'عيد الغطاس المجيد',
  jonah: 'صوم وفصح يونان (نينوى)',
  'great-lent': 'الصوم الكبير',
  'palm-sunday': 'أحد الشعانين',
  'holy-week': 'أسبوع الآلام (البصخة المقدسة)',
  pentecost: 'القيامة والخماسين المقدسة',
  'apostles-fast': 'صوم وعيد الرسل',
  'st-mary': 'صوم السيدة العذراء وعيد صعود جسدها',
  'minor-feasts': 'الأعياد السيدية الصغرى',

  // Deacon categories
  'deacon-annual': 'السنوي',
  'deacon-special-orders': 'الأسرار والطقوس الخاصة',
  'deacon-festival': 'الأعياد',

  // Section headers
  'annual-liturgy-offering-header': 'تقديم الحمل',
  'annual-distribution-melodies-header': 'مدائح',
  'annual-matins-doxologies-header': 'الذكصولوجيات',

  // Hymns
  'annual-morning praises-morning-doxology': 'ذكصولوجية باكر (نسجد للآب)',
  'annual-morning-praises-adam-theotokias-conclusion': 'ختام الثيئوطوكيات الآدام (مراحمك يا إلهي)',
  'annual-matins-verse-of-cymbals': 'أرباع الناقوس',
  'annual-distribution-psalm-150': 'المزمور المئة والخمسون',
  'annual-distribution-pi-oik': 'بي أويك (خبز الحياة)',
  'annual-distribution-our-father': 'أبانا الذي في السماوات',
  'annual-distribution-listen-o-christs-congregation': 'إسمعوا يا شعب المسيح',
  'annual-matins-intro-doxologies': 'مقدمة الذكصولوجيات',
  'annual-matins-doxology-virgin-mary': 'ذكصولوجية السيدة العذراء',
  'annual-matins-doxology-archangel-michael': 'ذكصولوجية رئيس الملائكة ميخائيل',
  'annual-matins-doxology-heavenly-beings': 'ذكصولوجية السمائيين',
  'annual-matins-doxology-apostles': 'ذكصولوجية الرسل',
  'annual-matins-doxology-st-mark': 'ذكصولوجية مار مرقس الرسول',
  'annual-matins-doxology-st-mark-2': 'ذكصولوجية أخرى لمار مرقس الرسول',
  'annual-matins-doxology-philopater-mercurius': 'ذكصولوجية أبي سيفين',
  'annual-matins-doxology-st-mena': 'ذكصولوجية مار مينا العجايبي',
  'annual-matins-doxology-pope-kyrillos-vi': 'ذكصولوجية البابا كيرلس السادس',
  'annual-matins-doxology-patriarch-bishop': 'ذكصولوجية البطريرك أو الأسقف',
  'annual-matins-doxology-conclusion': 'ختام الذكصولوجيات',
  'annual-matins-psalm-trailer': 'ذيل المزمور',
  'annual-matins-psalm-trailer-pope-bishop': 'ذيل المزمور في حضور البابا أو الأسقف',
  'annual-matins-gospel-response': 'مرد الإنجيل',
  'annual-liturgy-offering-blessed-are-you': 'مبارك أنت بالحقيقة',
  'annual-liturgy-offering-hymn-of-blessing': 'نسجد لآب النور',
  'annual-liturgy-offering-hail-to-mary': 'السلام لمريم الملكة',
  'annual-liturgy-offering-the-time-has-come': 'قد حان الوقت',
  'annual-liturgy-offering-alleluia-thought-of-man': 'هلليلويا إن فكر الإنسان',
  'annual-liturgy-offering-all-the-wise-men':'يا كل حكماء إسرائيل',
  'annual-liturgy-offering-sotis-amen': 'خلصت حقاً ولروحك',
  'annual-liturgy-offering-golden-censer': 'هذه هي المجمرة الذهب',
  'annual-liturgy-offering-golden-censer-virgin': 'المجمرة الذهب هي العذراء',
  'annual-liturgy-hymn-of-intercessions': 'بشفاعات',
  'annual-liturgy-pihmot-gar': 'نعمة ربنا',
  'annual-liturgy-perfect-is-the-blessing': 'الكامل بركة أبيه',
  'annual-liturgy-praxis-response': 'السلام لك يا مريم (مرد الإبركسيس)',
  'annual-liturgy-agios': 'قدوس الله',
  'annual-liturgy-blessed-are-they': 'طوباهم بالحقيقة',
  'annual-liturgy-psalm-trailer-pope-bishop': 'ذيل المزمور في حضور البابا أو الأسقف',
};

// Service names are shared across seasons, so match on the English title
const serviceTitles: Record<string, string> = {
  'Morning Praises': 'تسبحة باكر',
  Matins: 'رفع بخور باكر',
  Liturgy: 'القداس الإلهي',
  Distribution: 'التوزيع',
  Vespers: 'رفع بخور عشية',
  'Midnight Praises': 'تسبحة نصف الليل',
  'Offering of Lamb': 'تقديم الحمل',
  'Liturgy of the Word': 'قداس الكلمة',
  'Liturgy of the Faithful': 'قداس المؤمنين',
  'In Presence of Bishop / Patriarch': 'في حضور الأسقف / البطريرك',
  'Vespers in Presence of Bishop / Patriarch': 'عشية في حضور الأسقف / البطريرك',
  Unction: 'سر مسحة المرضى (القنديل)',
  Baptism: 'سر المعمودية',
  Prostration: 'صلاة السجدة',
  Matrimony: 'سر الزيجة (الإكليل)',
  Funeral: 'صلاة الجناز',
  Consecration: 'التكريس',
  'Liturgy of the Waters': 'صلاة اللقان',
};

const toArabicDigits = (n: string) => n.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);

export function displayTitle(item: { id: string; title: string }, lang: AppLanguage): string {
  if (lang !== 'ar') return item.title;
  if (arabicTitles[item.id]) return arabicTitles[item.id];
  if (serviceTitles[item.title]) return serviceTitles[item.title];

  // Placeholder items, e.g. "Matins Hymn #3" / "Matins Response #3"
  const placeholder = item.title.match(/^(.*) (Hymn|Response) #(\d+)$/);
  if (placeholder) {
    const [, service, kind, num] = placeholder;
    const label = kind === 'Hymn' ? 'لحن' : 'مرد';
    return `${label} ${toArabicDigits(num)} - ${serviceTitles[service] ?? service}`;
  }
  return item.title;
}
