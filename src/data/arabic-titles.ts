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
  'annual-vespers-doxology-virgin-mary': 'ذكصولوجية السيدة العذراء (عشية)',
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
  'annual-liturgy-psalm-trailer': 'ذيل المزمور',
  'annual-matins-psalm-trailer-pope-bishop': 'ذيل المزمور في حضور البابا أو الأسقف',
  'annual-matins-gospel-response': 'مرد الإنجيل',
  'annual-liturgy-word-header': 'قداس الكلمة',
  'annual-liturgy-faithful-header': 'قداس المؤمنين',
  'annual-liturgy-offering-blessed-are-you': 'مبارك أنت بالحقيقة',
  'annual-liturgy-offering-hymn-of-blessing': 'نسجد لآب النور',
  'annual-liturgy-offering-hail-to-mary': 'السلام لمريم الملكة',
  'annual-liturgy-offering-the-time-has-come': 'قد حان الوقت',
  'annual-liturgy-offering-alleluia-thought-of-man': 'هلليلويا إن فكر الإنسان',
  'annual-liturgy-offering-all-the-wise-men':'يا كل حكماء إسرائيل',
  'annual-liturgy-offering-sotis-amen': 'خلصت حقاً ولروحك',
  'annual-liturgy-offering-golden-censer': 'هذه هي المجمرة الذهب',
  'annual-liturgy-offering-golden-censer-virgin': 'المجمرة الذهب هي العذراء',
  'annual-liturgy-hitens': 'بشفاعات',
  'annual-liturgy-hymn-of-intercessions': 'بشفاعات (الطويلة)',
  'annual-liturgy-pihmot-gar': 'نعمة ربنا',
  'annual-liturgy-perfect-is-the-blessing': 'الكامل بركة أبيه',
  'annual-liturgy-praxis-response': 'السلام لك يا مريم (مرد الإبركسيس)',
  'annual-liturgy-agios': 'قدوس الله',
  'annual-liturgy-blessed-are-they': 'طوباهم بالحقيقة (مرد الإنجيل)',
  'annual-liturgy-hiten-ni-presvia-eleos': 'بشفاعات والدة الإله (رحمة السلام)',
  'annual-liturgy-the-cherubim-worship-you': 'الشاروبيم يسجدون لك',
  'annual-liturgy-kata-to-eleos': 'كرحمتك يارب',
  'annual-liturgy-amen-ton-thanaton': 'آمين آمين آمين بموتك يارب نبشر',
  'annual-liturgy-may-their-holy-blessings': 'بركتهم المقدسة تكون معنا',
  'annual-liturgy-in-christ-jesus-bow-your-heads': 'بالمسيح يسوع ربنا',

  // Annual > Midnight Praises
  'annual-midnight-general': 'عام',
  'annual-midnight-arise-o-children': 'قوموا يا بني النور',
  'annual-midnight-first-canticle': 'الهوس الأول',
  'annual-midnight-first-canticle-lobsh': 'لبش الهوس الأول',
  'annual-midnight-friday-psali': 'إبصالية واطس ليوم الجمعة',
  'annual-midnight-sunday-theotokion-7': 'ثيئوطوكية الأحد (٧)',
  'annual-vesper-praises-thursday-psali-apatir-irini': 'إبصالية واطس لاستشهاد القديسين أبادير وإيريني أخته (إيرائي)',
  'annual-vesper-praises-friday-psali-29th': 'إبصالية واطس لـ٢٩ من كل شهر قبطي',
  'annual-vesper-praises-friday-exposition-29th': 'طرح واطس اليوم التاسع والعشرين من كل شهر',
  'annual-vesper-praises-friday-exposition': 'طرح واطس',
  'annual-vesper-praises-saturday-psali-virgin-mary': 'إبصالية واطس للسيدة العذراء',
  'annual-midnight-semouti-ero-dikeos': 'مدعوة أنت بالحقيقة',
  'annual-midnight-sunday-theotokion-8': 'ثيئوطوكية الأحد (٨)',
  'annual-midnight-sunday-theotokion-9': 'ثيئوطوكية الأحد (٩)',
  'annual-midnight-second-canticle': 'الهوس الثاني',
  'annual-midnight-second-canticle-lobsh': 'لبش الهوس الثاني',
  'annual-midnight-third-canticle': 'الهوس الثالث',
  'annual-midnight-greek-psali-watos': 'إبصالية يوناني (واطس)',
  'annual-midnight-three-holy-children': 'تسبحة الثلاثة فتية القديسين',
  'annual-midnight-psali-watos-three-holy-youth': 'إبصالية واطس للثلاثة فتية القديسين',
  'annual-midnight-commemoration': 'المجمع',
  'annual-midnight-doxologies': 'الذكصولوجيات',
  'annual-midnight-doxology-archangel-michael': 'ذكصولوجية رئيس الملائكة ميخائيل',
  'annual-midnight-doxology-virgin-mary': 'ذكصولوجية السيدة العذراء',
  'annual-midnight-doxology-archangel-gabriel': 'ذكصولوجية الملاك غبريال',
  'annual-midnight-doxology-michael-gabriel': 'ذكصولوجية الملاكين ميخائيل وغبريال',
  'annual-midnight-doxology-heavenly-beings': 'ذكصولوجية السمائيين',
  'annual-midnight-doxology-apostles': 'ذكصولوجية الرسل',
  'annual-midnight-doxology-apostles-2': 'ذكصولوجية أخرى للرسل',
  'annual-midnight-doxology-st-mark': 'ذكصولوجية مار مرقس الرسول',
  'annual-midnight-doxology-st-mark-2': 'ذكصولوجية أخرى لمار مرقس الرسول',
  'annual-midnight-doxology-st-george': 'ذكصولوجية مار جرجس',
  'annual-midnight-doxology-st-george-2': 'ذكصولوجية أخرى لمار جرجس',
  'annual-midnight-doxology-philopater-mercurius': 'ذكصولوجية أبي سيفين',
  'annual-midnight-doxology-st-mena': 'ذكصولوجية مار مينا العجايبي',
  'annual-midnight-doxology-anba-abraam': 'ذكصولوجية الأنبا أبرآم',
  'annual-midnight-doxology-pope-kyrillos': 'ذكصولوجية البابا كيرلس السادس',
  'annual-midnight-doxology-patriarch-bishop': 'ذكصولوجية البطريرك أو الأسقف',
  'annual-midnight-doxology-conclusion': 'ختام الذكصولوجيات',
  'annual-midnight-fourth-canticle': 'الهوس الرابع',
  'annual-midnight-psali-watos-virgin-mary-21st': 'إبصالية واطس للسيدة العذراء (يوم ٢١ من الشهر القبطي)',
  'annual-midnight-sunday': 'الأحد',
  'annual-midnight-monday': 'الاثنين',
  'annual-midnight-tuesday': 'الثلاثاء',
  'annual-midnight-wednesday': 'الأربعاء',
  'annual-midnight-thursday': 'الخميس',
  'annual-midnight-friday': 'الجمعة',
  'annual-midnight-saturday': 'السبت',
  'annual-midnight-sunday-psali': 'إبصالية آدام ليوم الأحد',
  'annual-midnight-sunday-psali-adam-lord-jesus': 'إبصالية آدام للرب يسوع',
  'annual-midnight-sunday-adam-psali-conclusion': 'ختام ابصالية آدام',
  'annual-midnight-monday-adam-psali-conclusion': 'ختام ابصالية آدام',
  'annual-midnight-tuesday-adam-psali-conclusion': 'ختام ابصالية آدام',
  'annual-midnight-wednesday-watos-psali-conclusion': 'ختام الإبصالية الواطس',
  'annual-midnight-thursday-watos-psali-conclusion': 'ختام الإبصالية الواطس',
  'annual-midnight-friday-watos-psali-conclusion': 'ختام الإبصالية الواطس',
  'annual-midnight-saturday-watos-psali-conclusion': 'ختام الإبصالية الواطس',
  'annual-midnight-monday-psali': 'إبصالية آدام ليوم الاثنين',
  'annual-midnight-tuesday-psali': 'إبصالية آدام ليوم الثلاثاء',
  'annual-midnight-wednesday-psali': 'إبصالية واطس ليوم الأربعاء',
  'annual-midnight-thursday-psali': 'إبصالية واطس ليوم الخميس',
  'annual-midnight-friday-psali-annunciation': 'إبصالية واطس للبشارة',
  'annual-midnight-friday-psali-nativity': 'إبصالية واطس للميلاد على ثيئوطوكية الجمعة',
  'annual-midnight-friday-psali-holy-fifty': 'إبصالية واطس للخماسين المقدسة',
  'annual-midnight-saturday-watos-psali': 'إبصالية واطس ليوم السبت',
  'annual-midnight-sunday-psali-lord-jesus': 'إبصالية آدام للرب يسوع (أيكوتي إنسوك)',
  'annual-midnight-sunday-resurrection-hymn': 'لحن القيامة',
  'annual-midnight-friday-resurrection-hymn': 'لحن القيامة',
  'annual-midnight-sunday-theotokia': 'ثيئوطوكية الأحد',
  'annual-midnight-monday-theotokia': 'ثيئوطوكية الاثنين',
  'annual-midnight-tuesday-theotokia': 'ثيئوطوكية الثلاثاء',
  'annual-midnight-wednesday-theotokia': 'ثيئوطوكية الأربعاء',
  'annual-midnight-thursday-theotokia': 'ثيئوطوكية الخميس',
  'annual-midnight-friday-theotokia': 'ثيئوطوكية الجمعة',
  'annual-midnight-saturday-theotokia': 'ثيئوطوكية السبت',
  'annual-midnight-monday-adam-lobsh': 'لبش آدام على ثيئوطوكية الاثنين',
  'annual-midnight-tuesday-adam-lobsh': 'لبش آدام على ثيئوطوكية الثلاثاء',
  'annual-midnight-wednesday-watos-lobsh': 'لبش واطس على ثيئوطوكية الأربعاء',
  'annual-midnight-thursday-watos-lobsh': 'لبش واطس على ثيئوطوكية الخميس',
  'annual-midnight-friday-watos-lobsh': 'لبش واطس على ثيئوطوكية الجمعة',
  'annual-midnight-saturday-watos-lobsh-1': 'لبش واطس (الشيرات الأولى)',
  'annual-midnight-saturday-watos-lobsh-2': 'لبش واطس (الشيرات الثانية)',
  'annual-midnight-sunday-adam-theotokias-conclusion': 'ختام الثيئوطوكيات الآدام',
  'annual-midnight-monday-adam-theotokias-conclusion': 'ختام الثيئوطوكيات الآدام',
  'annual-midnight-tuesday-adam-theotokias-conclusion': 'ختام الثيئوطوكيات الآدام',
  'annual-midnight-wednesday-watos-theotokia-conclusion': 'ختام الثيئوطوكيات الواطس',
  'annual-midnight-thursday-watos-theotokia-conclusion': 'ختام الثيئوطوكيات الواطس',
  'annual-midnight-friday-watos-theotokia-conclusion': 'ختام الثيئوطوكيات الواطس',
  'annual-midnight-saturday-watos-theotokia-conclusion': 'ختام الثيئوطوكيات الواطس',
  'annual-midnight-psalmody-conclusion': 'ختام التسبحة',
  'annual-midnight-concluding-hymn': 'اللحن الختامي',

  // Deacon Responses > Annual > Matins
  'd-annual-matins-stand-up-for-prayer': 'للصلاة قفوا',
  'd-annual-matins-pray': 'صلوا',
  'd-annual-matins-pray-for-mercy': 'اطلبوا لكي يرحمنا الله',
  'd-annual-matins-pray-for-mercy-pope-bishop': 'اطلبوا لكي يرحمنا الله (في حضور البابا أو الأسقف)',
  'd-annual-matins-pray-for-the-sick': 'أوشية المرضى (اطلبوا عن آبائنا وإخوتنا المرضى)',
  'd-annual-matins-pray-for-travelers': 'أوشية المسافرين (اطلبوا عن آبائنا وإخوتنا المسافرين)',
  'd-annual-matins-pray-for-providers': 'أوشية القرابين (اطلبوا عن المهتمين بالصعائد)',
  'd-annual-matins-pray-for-the-gospel': 'صلوا من أجل الإنجيل المقدس',
  'd-annual-matins-stand-in-the-fear-of-god': 'قفوا بخوف الله',
  'd-annual-matins-in-christ-jesus-our-lord': 'بالمسيح يسوع ربنا',

  // Deacon Responses > Annual > Offering of the Lamb
  'd-annual-offering-lamb-pray-for-the-gifts': 'صلوا من أجل هذه القرابين',
  'd-annual-offering-lamb-one-is-the-holy-father': 'آمين. واحد هو الآب القدوس',
  'd-annual-offering-lamb-stand-up-for-prayer': 'للصلاة قفوا',
  'd-annual-offering-lamb-pray': 'صلوا',
  'd-annual-offering-lamb-pray-for-mercy': 'اطلبوا لكي يرحمنا الله',
  'd-annual-offering-lamb-pray-for-mercy-pope-bishop': 'اطلبوا لكي يرحمنا الله (في حضور البابا أو الأسقف)',

  // Deacon Responses > Annual > Liturgy of the Word
  'd-annual-liturgy-word-stand-up-for-prayer': 'للصلاة قفوا',
  'd-annual-liturgy-word-pray-for-the-gospel': 'صلوا من أجل الإنجيل المقدس',
  'd-annual-liturgy-word-stand-in-the-fear-of-god': 'قفوا بخوف الله',
  'annual-liturgy-psalm-trailer-pope-bishop': 'ذيل المزمور في حضور البابا أو الأسقف',
};

// Service names are shared across seasons, so match on the English title
const serviceTitles: Record<string, string> = {
  'Vesper Praises': 'تسبحة عشية',
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

  // Vesper Praises shares its hymns with Midnight Praises
  if (/^annual-vesper-praises-[a-z]+day-our-father$/.test(item.id)) return 'أبانا الذي';
  if (item.id.startsWith('annual-vesper-praises-')) {
    const midnightId = item.id.replace(/^annual-vesper-praises-(?:[a-z]+day-fourth-canticle)$/, 'annual-midnight-fourth-canticle').replace('annual-vesper-praises-', 'annual-midnight-');
    const shared = displayTitle({ ...item, id: midnightId }, lang);
    if (shared !== item.title) return shared;
  }

  // Vespers shares its hymns and deacon responses with Matins
  const matinsId = item.id.replace(/^(d-)?annual-vespers-/, '$1annual-matins-');
  if (arabicTitles[matinsId]) return arabicTitles[matinsId];
  if (serviceTitles[item.title]) return serviceTitles[item.title];

  // Theotokia parts, e.g. "annual-midnight-monday-theotokia-part-3" → "ثيئوطوكية الاثنين (القطعة ٣)"
  const part = item.id.match(/^(.*)-part-(\d+)$/);
  if (part && arabicTitles[part[1]]) return `${arabicTitles[part[1]]} (القطعة ${toArabicDigits(part[2])})`;

  // Placeholder items, e.g. "Matins Hymn #3" / "Matins Response #3"
  const placeholder = item.title.match(/^(.*) (Hymn|Response) #(\d+)$/);
  if (placeholder) {
    const [, service, kind, num] = placeholder;
    const label = kind === 'Hymn' ? 'لحن' : 'مرد';
    return `${label} ${toArabicDigits(num)} - ${serviceTitles[service] ?? service}`;
  }
  return item.title;
}
