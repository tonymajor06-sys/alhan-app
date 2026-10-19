import { Platform } from 'react-native';

import { displayTitle } from '@/data/arabic-titles';
import { copticMonths, dateToJdn, jdnToCoptic, toArabicDigits } from '@/data/coptic-calendar';
import { copticDayName, Saint, saints, saintSortKey } from '@/data/saints';
import { LanguageType } from '@/data/hymns';
import { locateHymn, searchHymns } from '@/data/search';

export interface ChatAction {
  type: 'hymn' | 'saint' | 'route';
  id?: string;
  route?: string;
  title: string;
  subtitle?: string;
  autoNavigate?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  actions?: ChatAction[];
}

export interface AskResponse {
  answer: string;
  configured?: boolean;
  actions?: ChatAction[];
  error?: string;
}

export interface AskResult {
  answer: string;
  actions?: ChatAction[];
  autoNavigate?: { route: string; title: string };
}

interface SaintAlias {
  keywords: string[];
  match: (s: Saint) => boolean;
}

const SAINT_ALIASES: SaintAlias[] = [
  {
    keywords: ['anthony', 'antony', 'انطونيوس', 'أنطونيوس', 'اب الرهبان', 'أب الرهبان'],
    match: (s) => s.name.en.toLowerCase().includes('antony'),
  },
  {
    keywords: ['paul the hermit', 'paul the first', 'anba bola', 'انبا بولا', 'أنبا بولا', 'بولا اول السواح'],
    match: (s) => s.name.en.toLowerCase().includes('paul the first'),
  },
  {
    keywords: ['macarius', 'مكاريوس', 'مقار'],
    match: (s) => s.name.en.toLowerCase().includes('macarius'),
  },
  {
    keywords: ['george', 'mar girgis', 'margirgis', 'جرجس', 'مارجرجس', 'مار جرجس'],
    match: (s) => s.name.en.toLowerCase().includes('george'),
  },
  {
    keywords: ['mina', 'menas', 'مارمينا', 'مار مينا', 'مينا'],
    match: (s) => s.name.en.toLowerCase().includes('mina'),
  },
  {
    keywords: ['mary', 'theotokos', 'virgin mary', 'العذراء', 'مريم', 'ام النور', 'أم النور', 'ثيؤطوكوس'],
    match: (s) => s.name.en.toLowerCase().includes('mary the theotokos'),
  },
  {
    keywords: ['moses the black', 'moses the strong', 'موسى الاسود', 'موسي الاسود', 'موسى القوي'],
    match: (s) => s.name.en.toLowerCase().includes('moses the black'),
  },
  {
    keywords: ['kyrillos', 'cyril vi', 'pope kyrillos', 'كيرلس السادس', 'البابا كيرلس'],
    match: (s) => s.name.en.toLowerCase().includes('kyrillos vi'),
  },
  {
    keywords: ['cyril the great', 'pillar of faith', 'كيرلس الكبير', 'عمود الدين'],
    match: (s) => s.name.en.toLowerCase().includes('cyril the great'),
  },
  {
    keywords: ['athanasius', 'اثناسيوس', 'أثناسيوس', 'حامي الايمان'],
    match: (s) => s.name.en.toLowerCase().includes('athanasius'),
  },
  {
    keywords: ['shenouda', 'shenoute', 'شنودة', 'شنوده', 'رئيس المتوحدين'],
    match: (s) => s.name.en.toLowerCase().includes('shenouda'),
  },
  {
    keywords: ['bishoy', 'pishoy', 'بيشوي', 'حبيب مخلصنا'],
    match: (s) => s.name.en.toLowerCase().includes('bishoy'),
  },
  {
    keywords: ['demiana', 'damiana', 'دميانة', 'دميانه', 'الاربعين عذراء'],
    match: (s) => s.name.en.toLowerCase().includes('demiana'),
  },
  {
    keywords: ['marina', 'مارينا'],
    match: (s) => s.name.en.toLowerCase().includes('marina'),
  },
  {
    keywords: ['abanoub', 'أبانوب', 'ابانوب'],
    match: (s) => s.name.en.toLowerCase().includes('abanoub'),
  },
  {
    keywords: ['karas', 'كاراس'],
    match: (s) => s.name.en.toLowerCase().includes('karas'),
  },
  {
    keywords: ['barsoum', 'برسوم', 'العريان'],
    match: (s) => s.name.en.toLowerCase().includes('barsoum'),
  },
  {
    keywords: ['habib girgis', 'حبيب جرجس'],
    match: (s) => s.name.en.toLowerCase().includes('habib girgis'),
  },
  {
    keywords: ['verena', 'فيرينا'],
    match: (s) => s.name.en.toLowerCase().includes('verena'),
  },
  {
    keywords: ['reweis', 'fraig', 'رويس', 'فريج'],
    match: (s) => s.name.en.toLowerCase().includes('reweis'),
  },
  {
    keywords: ['simon the tanner', 'سمعان الخراز'],
    match: (s) => s.name.en.toLowerCase().includes('simon the tanner'),
  },
  {
    keywords: ['mercurius', 'abu sefein', 'philopater', 'مرقوريوس', 'ابو سيفين', 'أبو سيفين', 'فيلوباتير'],
    match: (s) => s.name.en.toLowerCase().includes('mercurius'),
  },
  {
    keywords: ['mark the apostle', 'saint mark', 'st mark', 'مرقس الرسول', 'كاروز ديارنا'],
    match: (s) => s.name.en.toLowerCase().includes('mark the apostle'),
  },
  {
    keywords: ['catherine', 'كاترين'],
    match: (s) => s.name.en.toLowerCase().includes('catherine'),
  },
  {
    keywords: ['barbara', 'بربارة', 'برباره'],
    match: (s) => s.name.en.toLowerCase().includes('barbara'),
  },
  {
    keywords: ['john the baptist', 'يوحنا المعمدان'],
    match: (s) => s.name.en.toLowerCase().includes('john the baptist'),
  },
  {
    keywords: ['john the short', 'يوحنا القصير'],
    match: (s) => s.name.en.toLowerCase().includes('john the short'),
  },
  {
    keywords: ['chrysostom', 'ذهبي الفم'],
    match: (s) => s.name.en.toLowerCase().includes('chrysostom'),
  },
  {
    keywords: ['archangel michael', 'ملاك ميخائيل', 'رئيس الملائكة ميخائيل'],
    match: (s) => s.name.en.toLowerCase().includes('michael'),
  },
  {
    keywords: ['archangel gabriel', 'ملاك غبريال', 'رئيس الملائكة غبريال'],
    match: (s) => s.name.en.toLowerCase().includes('gabriel'),
  },
  {
    keywords: ['archangel raphael', 'ملاك رافائيل', 'رئيس الملائكة رافائيل'],
    match: (s) => s.name.en.toLowerCase().includes('raphael'),
  },
  {
    keywords: ['pachomius', 'باخوميوس', 'اب الشركة', 'أب الشركة'],
    match: (s) => s.name.en.toLowerCase().includes('pachomius'),
  },
  {
    keywords: ['arsenius', 'ارسانيوس', 'أرسانيوس'],
    match: (s) => s.name.en.toLowerCase().includes('arsenius'),
  },
  {
    keywords: ['onuphrius', 'abba nofer', 'ابو نوفر', 'أبو نوفر'],
    match: (s) => s.name.en.toLowerCase().includes('onuphrius'),
  },
  {
    keywords: ['takla', 'tekla', 'تكلا'],
    match: (s) => s.name.en.toLowerCase().includes('takla'),
  },
  {
    keywords: ['sidhom', 'سيدهم بيشاي'],
    match: (s) => s.name.en.toLowerCase().includes('sidhom'),
  },
  {
    keywords: ['polycarp', 'بوليكاربوس'],
    match: (s) => s.name.en.toLowerCase().includes('polycarp'),
  },
  {
    keywords: ['ignatius', 'اغناطيوس', 'إغناطيوس'],
    match: (s) => s.name.en.toLowerCase().includes('ignatius'),
  },
  {
    keywords: ['stephen', 'استفانوس', 'إستفانوس'],
    match: (s) => s.name.en.toLowerCase().includes('stephen'),
  },
];

function formatSaintStory(saint: Saint, lang: 'en' | 'ar'): AskResult {
  const feast = copticDayName(saint.month, saint.day, lang);
  const title = saint.name[lang];
  const story = saint.story[lang];

  const answer =
    lang === 'ar'
      ? `### ${title}\n\n**تذكار نياحته/استشهاده:** ${feast}\n\n${story}`
      : `### ${title}\n\n**Feast Day:** ${feast}\n\n${story}`;

  return {
    answer,
    actions: [
      {
        type: 'saint',
        id: saint.id,
        title,
        subtitle: `${lang === 'ar' ? 'تذكار' : 'Feast'}: ${feast}`,
      },
    ],
  };
}

export function findSaintAnswer(question: string, lang: 'en' | 'ar'): AskResult | null {
  const qNorm = question
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ҃-҉ً-ٰٟۖ-ۭـ⳯-⳱︠-︯]/g, '')
    .replace(/[ٱأإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي');

  // Check aliases first
  for (const alias of SAINT_ALIASES) {
    if (alias.keywords.some((kw) => qNorm.includes(kw))) {
      const match = saints.find(alias.match);
      if (match) {
        return formatSaintStory(match, lang);
      }
    }
  }

  // Check all 95 saints by their core name
  for (const s of saints) {
    const keyEn = saintSortKey(s.name.en, 'en').toLowerCase().split(/\s+/)[0];
    const keyAr = saintSortKey(s.name.ar, 'ar').split(/\s+/)[0];
    if (keyEn.length >= 4 && qNorm.includes(keyEn)) {
      return formatSaintStory(s, lang);
    }
    if (keyAr.length >= 3 && qNorm.includes(keyAr)) {
      return formatSaintStory(s, lang);
    }
  }

  return null;
}

// Built-in offline knowledge base for instant answers
const OFFLINE_KNOWLEDGE: { keywords: string[]; en: string; ar: string }[] = [
  {
    keywords: ['adam', 'watos', 'difference', 'آدام', 'واطس', 'فرق'],
    en: `### Adam vs. Watos Tunes in the Coptic Church\n\nIn Coptic Psalmody, the days of the week are divided into two distinct musical and liturgical categories:\n\n* **Adam (آدام):**\n  * **Days:** Sunday, Monday, Tuesday.\n  * **Theme:** Named after the first word of the Monday Theotokia: *"Adam et-eti ef-moit"* ("Adam while sad...").\n  * **Melody:** Characterized by shorter, lighter, and more rhythmic cadences.\n\n* **Watos (واطس):**\n  * **Days:** Wednesday, Thursday, Friday, Saturday.\n  * **Theme:** Named after the Coptic word for the burning bush (*"Pi-batos"* / Ⲡⲓⲃⲁⲧⲟⲥ) in the Thursday Theotokia.\n  * **Melody:** Longer, deeper, more contemplative and prolonged tunes.`,
    ar: `### الفرق بين النغمة الآدام والنغمة الواطس\n\nتُقسّم أيام الأسبوع في التسبحة والطقس القبطي إلى طريقتين نغميتين:\n\n* **الآدام:**\n  * **الأيام:** الأحد، الاثنين، الثلاثاء.\n  * **التسمية:** سُميت باسم "آدم" تيمناً بأول كلمة في ثيؤطوكية يوم الاثنين: «آدم إتي إف موييت» (آدم وهو حزين).\n  * **النغمة:** نغماتها أقصر وأخف وإيقاعها مبهج وسريع نسبياً.\n\n* **الواطس:**\n  * **الأيام:** الأربعاء، الخميس، الجمعة، السبت.\n  * **التسمية:** مشتقة من الكلمة القبطية «بي باطوس» (Ⲡⲓⲃⲁⲧⲟⲥ) أي العليقة، من ثيؤطوكية يوم الخميس.\n  * **النغمة:** أطول، أعمق، ونغماتها ممتدة وتأملية وقورة.`,
  },
  {
    keywords: ['tenen', 'young men', 'three holy youth', 'تنين', 'الثلاثة فتية', 'الثلاث فتية'],
    en: `### Song of the Three Holy Youth (*Tenen* / Ⲧⲉⲛⲉⲛ)\n\n* **Occasion:** Chanted during the **Kiahk Midnight Praises** right after the Third Hoos (Canticle of the Three Youths: Hananiah, Azariah, and Mishael).\n* **Meaning:** *"Tenen"* means "We follow You with all our heart and we revere You" (Daniel 3 / Song of the Youths).\n* **Significance:** Represents total surrender, faith, and joy even in the midst of the fiery furnace, symbolizing the mystery of the Incarnation where the fire of divinity did not consume St. Mary's womb.`,
    ar: `### مديح الثلاثة فتية القديسين (تنين / Ⲧⲉⲛⲉⲛ)\n\n* **المناسبة:** يُقال في **تسبحة نصف الليل لشهر كيهك** المبارك عقب الهوس الثالث مباشرة (تسبحة حنانيا وعزاريا وميصائيل في أتون النار).\n* **المعنى:** «تنين إن أويه إنوك...» أي «نتبعك بكل قلوبنا ونخافك ونطلب وجهك فلا تخزنا» (دانيال ٣).\n* **الرمزية والطقس:** يمثل الثقة الكاملة والتسبيح وسط تجارب أتون النار، ويرمز للتجسد الإلهي حيث نار اللاهوت لم تحرق بطن العذراء مريم مثلما لم يحرق الأتون الفتية الثلاثة.`,
  },
  {
    keywords: ['pouro', 'epouro', 'o king of peace', 'ابؤرو', 'إبؤرو', 'يا ملك السلام'],
    en: `### Ep-ouro (*Ⲡⲟⲩⲣⲟ* / O King of Peace)\n\n* **Occasion:** Chanted at the conclusion of every service (Matins, Vespers, Midnight Praises, and Liturgy).\n* **Meaning:** *"Ep-ouro ente ti-hirēnē, moi nan ente-khirēnē..."* ("O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins...").\n* **Rites:** It is addressed directly to our Lord Jesus Christ, asking for His divine peace to fill our hearts and the whole Church before departing.`,
    ar: `### لحن إبؤرو (Ⲡⲟⲩⲣⲟ / يا ملك السلام)\n\n* **المناسبة:** يُقال في ختام الصلوات والخدمات الطقسية (العشية، باكر، التسبحة، والقداس الإلهي).\n* **الكلمات:** «إبؤرو إنتي تي هيريني: موي نان إنتي ك هيريني: سيمني نان إنتي ك هيريني: كانين نوفي نان إيفول...» (يا ملك السلام أعطنا سلامك، قرر لنا سلامك، واغفر لنا خطايانا).\n* **المعنى:** هو طلب بركة السلام الداخلي وسلام الكنيسة من رئيس السلام ربنا يسوع المسيح قبل انصراف المصلين.`,
  },
  {
    keywords: ['tasbeha', 'midnight praises', 'structure of tasbeha', 'تسبحة', 'تسبحة نصف الليل', 'ترتيب التسبحة'],
    en: `### Structure of the Coptic Midnight Praises (Tasbeha)\n\n1. **Arise O Children of the Light (Ten-theh-no):** Awakening call to praise.\n2. **First Hoos (Exodus 15):** The song of Moses crossing the Red Sea.\n3. **First Lobsh:** Explanation of the First Hoos.\n4. **Second Hoos (Psalm 135):** Thanksgiving for God's enduring mercies.\n5. **Second Lobsh:** Meditation on the Lord's deliverance.\n6. **Third Hoos (Daniel 3):** The praise of the Three Holy Youths in the fiery furnace.\n7. **The Greek Hymn (Aripasalin):** Praising Christ.\n8. **Commemoration of the Saints & Doxologies:** Seeking intercessions.\n9. **Fourth Hoos (Psalms 148, 149, 150):** The grand cosmic praise.\n10. **Psali & Theotokia:** Daily hymn to the Virgin Mary.\n11. **Conclusion (Ep-ouro & Amen Alleluia):** Final blessings.`,
    ar: `### ترتيب تسبحة نصف الليل القبطية (الهوسات والثيؤطوكيات)\n\n١. **قوموا يا بني النور (تين ثينو):** دعوة للاستيقاظ والتسبيح.\n٢. **الهوس الأول (خروج ١٥):** تسبحة موسى النبي بعد عبور البحر الأحمر.\n٣. **لبش الهوس الأول:** تفسير وتأمل في الخلاص.\n٤. **الهوس الثاني (مزمور ١٣٥):** شكر الله على مراحمه الدائمة إلى الأبد.\n٥. **الهوس الثالث (دانيال ٣):** تسبحة الفتية الثلاثة القديسين في أتون النار.\n٦. **مديح آري إبصالين والمجمع:** تذكار الآباء والقديسين وطلب شفاعاتهم.\n٧. **الذكصولوجيات:** تمجيد العذراء والملائكة والشهداء.\n٨. **الهوس الرابع (مزامير ١٤٨، ١٤٩، ١٥٠):** تسبيح الخليقة كلها لله.\n٩. **الإبصاليات والثيؤطوكية:** تمجيد التجسد الإلهي ووالدة الإله اليومية.\n١٠. **ختام التسبحة (إبؤرو وطلبة الختام):** بركة السلام النهائي.`,
  },
  {
    keywords: ['agpeya', 'canonical hours', 'seven prayers', 'اجبية', 'أجبية', 'صلوات السواعي'],
    en: `### The Seven Canonical Hours of the Agpeya\n\n* **Prime (1st Hour - 6 AM):** Remembering the Resurrection of Christ and the true Light.\n* **Terce (3rd Hour - 9 AM):** Descent of the Holy Spirit on Pentecost and the trial of Christ.\n* **Sext (6th Hour - 12 PM):** The Crucifixion of Christ on Golgotha.\n* **None (9th Hour - 3 PM):** The physical death of Christ and the salvation of the thief.\n* **Vespers (11th Hour - 5 PM):** Taking Christ down from the Cross and sunset.\n* **Compline (12th Hour - 6 PM):** The burial of Christ and preparation for sleep.\n* **Midnight (3 Watches):** Vigilance and the Second Coming of the Bridegroom.`,
    ar: `### صلوات السواعي السبع في الأجبية القبطية\n\n* **باكر (الساعة الأولى - ٦ ص):** تذكار قيامة السيد المسيح والنور الحقيقي.\n* **الساعة الثالثة (٩ ص):** حلول الروح القدس في يوم الخمسين ومحاكمة المسيح.\n* **الساعة السادسة (١٢ ظ):** صلب مخلصنا الصالح على جبل الجلجثة.\n* **الساعة التاسعة (٣ ع):** موت المسيح بالجسد بالروح وقبول اللص اليمين.\n* **الغروب (الساعة الحادية عشرة - ٥ م):** إنزال جسد الرب عن الصليب.\n* **النوم (الساعة الثانية عشرة - ٦ م):** دفن جسد المسيح والتأهب لنهاية العمر.\n* **نصف الليل (ثلاث خدم):** السهر الروحي والاستعداد لمجيء العريس.`,
  },
  {
    keywords: ['feasts', 'seven major feasts', 'major feasts', 'الاعياد السيدية', 'الأعياد السيدية'],
    en: `### The Seven Major Feasts of the Coptic Church\n\n1. **The Annunciation (29 Paremhat):** Angel Gabriel's good tidings to St. Mary.\n2. **The Nativity / Christmas (29 Kiahk / Jan 7):** Birth of our Lord Jesus Christ.\n3. **The Theophany / Epiphany (11 Tobi / Jan 19):** Baptism of Christ in the Jordan.\n4. **Palm Sunday (Sunday before Easter):** Entrance of our Lord into Jerusalem.\n5. **The Holy Resurrection / Easter (Feast of Feasts):** Christ rising from the dead.\n6. **The Ascension (40 days after Easter):** Christ ascending into heaven.\n7. **Pentecost (50 days after Easter):** Descent of the Holy Spirit on the Apostles.`,
    ar: `### الأعياد السيدية الكبرى السبعة\n\n١. **عيد البشارة المجيد (٢٩ برمهات):** بشارة الملاك غبريال للعذراء مريم.\n٢. **عيد الميلاد المجيد (٢٩ كيهك / ٧ يناير):** ميلاد ربنا يسوع المسيح بالجسد.\n٣. **عيد الغطاس المجيد (١١ طوبة / ١٩ يناير):** عماد السيد المسيح وظهور الثالوث.\n٤. **أحد الشعانين (أحد الزعف):** دخول المسيح الظافر إلى أورشليم.\n٥. **عيد القيامة المجيد:** قيامة الفادي وقهر الموت، وهو عيد الأعياد.\n٦. **عيد الصعود المجيد (بعد القيامة بـ ٤٠ يوماً):** صعود المسيح للسماء.\n٧. **عيد العنصرة / الخمسين (بعد القيامة بـ ٥٠ يوماً):** حلول الروح القدس.`,
  },
  {
    keywords: ['fasting', 'fasts', 'coptic fasts', 'اصوام', 'أصوام', 'الصوم في الكنيسة'],
    en: `### The Fasts of the Coptic Orthodox Church\n\n1. **The Great Lent (55 days):** Pre-Lenten preparation, 40 days of Christ's fast, and Holy Week.\n2. **Nativity Fast (Kiahk - 43 days):** 40 days for Moses receiving the law + 3 days for moving Mokattam mountain.\n3. **Jonah's Fast (3 days):** Repentance of the Ninevites.\n4. **Apostles' Fast (Variable duration):** Fasting after Pentecost before ministry.\n5. **St. Mary's Fast (15 days - 1–16 Mesori / Aug 7–22):** Honoring the Mother of God.\n6. **Wednesdays and Fridays (Throughout the year):** Remembering the betrayal and Crucifixion of Christ.`,
    ar: `### أصوام الكنيسة القبطية الأرثوذكسية\n\n١. **الصوم الكبير (٥٥ يوماً):** أسبوع الاستعداد، الأربعين المقدسة، وأسبوع الآلام.\n٢. **صوم الميلاد المجيد (٤٣ يوماً):** ٤٠ يوماً صوم موسى لاستلام لوحي الشريعة + ٣ أيام تذكار نقل جبل المقطم.\n٣. **صوم يونان / نينوى (٣ أيام):** توبة أهل نينوى وتذكار خروج يونان من بطن الحوت.\n٤. **صوم الرسل (مدته متغيرة):** يبدأ بعد عيد العنصرة اقتداءً بالرسل قبل كرازتهم.\n٥. **صوم السيدة العذراء (١٥ يوماً - من ١ إلى ١٦ مسرى):** صوم محبة وتكريم لوالدة الإله.\n٦. **صوم الأربعاء والجمعة (على مدار العام):** تذكار مشورة يهوذا بالخيانة وصلب المسيح.`,
  },
  {
    keywords: ['coptic language', 'coptic alphabet', 'bohairic', 'اللغة القبطية', 'الحروف القبطية', 'البحيري'],
    en: `### The Coptic Language\n\n* **Origin:** The final historical stage of the ancient Egyptian language, written using the Greek alphabet plus **7 Demotic letters** for sounds not in Greek:\n  * Ϣ (Shai), ϥ (Fai), ϧ (Khai), ϩ (Hori), ϫ (Janjia), ϭ (Tshima), ϯ (Ti).\n* **Dialects:** **Bohairic** (northern Delta dialect, official liturgical language of the Coptic Church since Pope Gabriel II in the 12th century) and **Sahidic** (southern Upper Egypt dialect of monks and manuscripts).\n* **Pronunciation:** Bohairic preserves distinctions like Ⲃ (v before vowels, b otherwise) and Ϫ (j before e-vowels, g otherwise).`,
    ar: `### اللغة القبطية وتاريخها\n\n* **الأصل:** هي المرحلة الأخيرة من مراحل اللغة المصرية القديمة، كُتبت بحروف الأبجدية اليونانية بالإضافة إلى **٧ أحرف ديموطيقية** لأصوات لم تكن موجودة في اليونانية:\n  * Ϣ (شاي)، ϥ (فاي)، ϧ (خاي)، ϩ (هوري)، ϫ (جانجا)، ϭ (تشيما)، ϯ (تي).\n* **اللهجات:** **البحيرية** (لهجة شمال الدلتا والإسكندرية، وهي اللهجة الطقسية الرسمية للكنيسة القبطية)، و**الصعيدية** (لهجة مصر العليا والأديرة القديمة).\n* **النطق:** تُنطق الحروف وفق قواعد المنهج الكنسي العريق (مثل حرف Ⲃ ينطق ڤ قبل الحروف المتحركة وب غير ذلك، وحرف ϫ ينطق چ قبل الحروف الكسرية وج غير ذلك).`,
  },
  {
    keywords: ['censer', 'shoria', 'incense', 'الشورية', 'المجمرة', 'البخور'],
    en: `### Symbolism of the Coptic Censer (Ti-Shouri / Ϯϣⲟⲩⲣⲓ)\n\n* **The Golden Bowl:** Represents St. Mary the Mother of God, who bore the Divine Ember.\n* **The Live Coal:** Represents Christ's Divinity united with His Humanity without mingling, confusion, or separation.\n* **The Incense:** Represents the sweet prayers of the saints ascending to God's heavenly throne (Revelation 8:3-4).\n* **The Three Chains:** Represent the Holy Trinity: the Father, the Son, and the Holy Spirit, united in one ring.`,
    ar: `### رمزية الشورية القبطية (المجمرة / Ϯϣⲟⲩⲣⲓ)\n\n* **بطن الشورية الذهبي:** يرمز للسيدة العذراء مريم التي حملت جمرة اللاهوت في بطنها.\n* **الجمرة المتقدة:** ترمز لاتحاد لاهوت السيد المسيح بناسوته بغير اختلاط ولا امتزاج ولا تغيير.\n* **البخور الصاعد:** يرمز لصلوات القديسين المقبولة الصاعدة أمام عرش النعمة (رؤيا ٨: ٣-٤).\n* **السلاسل الثلاث:** ترمز للثالوث القدوس (الآب والابن والروح القدس)، متحدة في الحلقة العلوية الواحدة التي ترمز لوحدانية الجوهر الإلهي.`,
  },
  {
    keywords: ['tonia', 'tunic', 'white robe', 'التونية', 'ملابس الشماس', 'لبس الشماس'],
    en: `### The Deacon's White Tunic (Tonia / ⲧⲱⲛⲓⲁ)\n\n* **White Color:** Symbolizes the spiritual purity, righteousness, and holiness required to serve in the sanctuary (Revelation 19:8), resembling the white robes of the heavenly angels.\n* **The Stole (Orarión / ⲟⲩⲣⲁⲣⲓⲟⲛ):** Represents the wings of the Seraphim flying in praise around God's throne (Isaiah 6:2).\n* **The Crosses:** Emblazoned on the front and back to show that the deacon carries the Cross of Christ in his service.`,
    ar: `### التونية البيضاء للشماس (ⲧⲱⲛⲓⲁ)\n\n* **اللون الأبيض:** يرمز للنقاوة والطهارة وبر القديسين والملابس البيضاء التي يرتديها السمائيون حول عرش الله (رؤيا ١٩: ٨).\n* **البطرشيل (الأوراريون / ⲟⲩⲣⲁⲣⲓⲟⲛ):** يرمز لأجنحة السيرافيم المسبحين حول عرش الله (إشعياء ٦: ٢).\n* **الصلبان:** مطرزة لتذكير الشماس بحمل صليب الخدمة والإنكار والتكريس للمسيح.`,
  },
  {
    keywords: ['amen', 'meaning of amen', 'معنى امين', 'معنى آمين'],
    en: `### Meaning of "Amen" (ⲁⲙⲏⲛ)\n\n"Amen" is an ancient affirmation meaning **"Truly"**, **"So be it"**, or **"May it be so"**.\nIn Coptic Liturgies, when the congregation responds "Amen", they are not mere listeners; they actively consent, seal, and unite their prayers with the priest's thanksgiving before the altar.`,
    ar: `### معنى كلمة «آمين» (ⲁⲙⲏⲛ)\n\n«آمين» كلمة آرامية وعبرية وقبطية تعني **«حقاً»** أو **«استجب يا رب»** أو **«ليكن هكذا»**.\nوفي القداس والصلوات القبطية، حين يقول الشعب «آمين» فهم يشتركون مع الكاهن في ختم الصلاة والتصديق عليها بروح واحدة وإيمان مشترك.`,
  },
  {
    keywords: ['alleluia', 'meaning of alleluia', 'معنى هلليلويا', 'معنى الليلويا'],
    en: `### Meaning of "Alleluia" (ⲁⲗⲗⲏⲗⲟⲩⲓⲁ)\n\n"Alleluia" is derived from the Hebrew *Hallelu-Yah*, meaning **"Praise the Lord"**.\nIn the Coptic Church, it is the royal triumphant song of the Resurrection and eternity, chanted with long melismatic joyful tunes during feasts and at the close of praises.`,
    ar: `### معنى كلمة «هلليلويا» (ⲁⲗⲗⲏⲗⲟⲩⲓⲁ)\n\n«هلليلويا» كلمة مركبة من مقطعين تعني **«سبحوا الله»** (هللو = سبحوا، ياه = يهوه / الله).\nوهي ترنيمة الفرح والنصرة والقيامة في الكنيسة، وتُنشد بنغمات فرحة ممتدة في الأعياد وختام الصلوات.`,
  },
  {
    keywords: ['fraction', 'fraction prayer', 'القسمة', 'صلاة القسمة'],
    en: `### The Fraction Prayers in the Divine Liturgy (ⲡⲓⲫⲱϣ)\n\n* **Purpose:** The priest solemnly divides the Holy Body into 12 parts around the central Spadikon (representing Christ surrounded by His twelve apostles), symbolizing Christ's sacrifice on the Cross for the life of the world.\n* **Types of Fractions:** Over 30 beautiful fraction prayers exist for different liturgical seasons:\n  * *Annual Fraction:* Fraction to the Father or Son, focusing on repentance and divine mercy.\n  * *Festive Fractions:* Nativity, Epiphany, Resurrection, Ascension, Pentecost.\n  * *Fasting Fractions:* Great Lent (e.g. the 100-year-old prayers of the desert fathers) and Jonah's Fast.`,
    ar: `### صلوات القِسْمَة في القداس الإلهي (ⲡⲓⲫⲱϣ)\n\n* **الهدف والرمزية:** يقوم الكاهن بتقسيم الجسد المقدس إلى ١٢ جزءاً حول الإسباديكون الأوسط (رمز للسيد المسيح وحوله تلاميذه الاثنا عشر)، تذكاراً لآلام المسيح وذبيحة الصليب المحيية.\n* **أنواع القسم:** يوجد في الخولاجي القبطي أكثر من ٣٠ قسمة لمختلف المناسبات الكنسية:\n  * *القسم السنوية:* للآب أو للابن، وتركز على التوبة والانسحاق وطلب الرحمة.\n  * *قسم الأعياد السيدية:* للقيامة، الميلاد، الغطاس، الصعود، والعنصرة.\n  * *قسم الأصوام:* للصوم الكبير (مثل قسمة ذبح إسحاق أو قسمة الآباء الرهبان) وصوم يونان.`,
  },
  {
    keywords: ['thanksgiving', 'thanksgiving prayer', 'صلاة الشكر'],
    en: `### The Prayer of Thanksgiving (Ⲡ̀ϣⲗⲏⲗ ⲛ̀ⲧⲉ ⲡⲓϣⲉⲡϩ̀ⲙⲟⲧ)\n\n* **The Golden Key:** In the Coptic Orthodox Church, every liturgical service, sacrament, canonical hour of the Agpeya, and private devotion must begin with the Thanksgiving Prayer.\n* **Four Attributes of God:** We thank the Lord because He has:\n  1. *Sheltered us* (ⲁϥⲉⲣⲥ̀ⲕⲉⲡⲁⲍⲓⲛ ⲉ̀ϫⲱⲛ)\n  2. *Helped us* (ⲁϥⲉⲣⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲛ)\n  3. *Preserved us* (ⲁϥⲁ̀ⲣⲉϩ ⲉ̀ⲣⲟⲛ)\n  4. *Accepted us unto Himself* (ⲁϥϣⲟⲡⲧⲉⲛ ⲉ̀ⲣⲟϥ)\n  5. *Brought us to this hour* (ⲁϥⲉⲛⲧⲉⲛ ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲧⲁⲓⲟⲩⲛⲟⲩ ⲑⲁⲓ).`,
    ar: `### صلاة الشكر (Ⲡ̀ϣⲗⲏⲗ ⲛ̀ⲧⲉ ⲡⲓϣⲉⲡϩ̀ⲙⲟⲧ)\n\n* **المفتاح الذهبي للصلوات:** تبدأ الكنيسة القبطية الأرثوذكسية جميع صلواتها الطقسية وأسرارها وسواعي الأجبية بصلاة الشكر، اقتداءً بالوصية: «اشكروا في كل شيء».\n* **أفعال الشكر الخمسة:** نشكر الله لأنه:\n  ١. *سترنا* (ستر على خطايانا وضعفاتنا)\n  ٢. *أعاننا* (في تجاربنا وأتعابنا)\n  ٣. *حفظنا* (من مكايد العدو والشرور)\n  ٤. *قبلنا إليه* (بالمراحم والحب الأبوي)\n  ٥. *أشفق علينا وعضدنا وأتى بنا إلى هذه الساعة*.`,
  },
  {
    keywords: ['deacon ranks', 'orders of deacons', 'رتب الشمامسة', 'درجات الشماس'],
    en: `### The Five Orders of Coptic Deaconhood\n\n1. **Epsaltos (Chanter / ⲯⲁⲗⲧⲏⲥ):** Ordained to learn and chant the Church hymns and responses.\n2. **Anagnostis (Reader / ⲁⲛⲁⲅⲛⲱⲥⲧⲏⲥ):** Reads the daily Scripture readings (Pauline, Catholic Epistles, Praxis, Synaxarium, and Psalms).\n3. **Hypodeacon (Subdeacon / ⲩ̀ⲡⲟⲇⲓⲁⲕⲱⲛ):** Guards the sanctuary doors, lights the altar candles, and assists the full deacons.\n4. **Deacon (Full Deacon / ⲇⲓⲁⲕⲱⲛ):** Carries the chalice during Holy Communion, proclaims the major liturgical litanies, and assists the priest during the Holy Mysteries.\n5. **Archdeacon (Leader of Deacons / ⲁⲣⲭⲏⲇⲓⲁⲕⲱⲛ):** The highest deacon rank, responsible for directing all choir and liturgical order.`,
    ar: `### رتب الشمامسة الخمس في الكنيسة القبطية\n\n١. **إبصالتس (مرتل / ⲯⲁⲗⲧⲏⲥ):** وظيفته ترتيل ألحان وتسابيح الكنيسة ومردات الشعب.\n٢. **أغنسطس (قارئ / ⲁⲛⲁⲅⲛⲱⲥⲧⲏⲥ):** يقرأ القراءات الكنسية في القداس (البولس، الكاثوليكون، الإبركسيس، والسنكسار والمزمور).\n٣. **إيبودياكون (مساعد شماس / ⲩ̀ⲡⲟⲇⲓⲁⲕⲱⲛ):** حراسة أبواب الهيكل وإيقاد قناديل المذبح وخدمة الأواني المقدسة.\n٤. **دياكون (شماس كامل / ⲇⲓⲁⲕⲱⲛ):** يناول الشعب من الدم الكريم بالكأس، وينادي بالأواشي الكبرى في القداس، ويساعد الكاهن في طقوس الأسرار.\n٥. **أرشيدياكون (رئيس شمامسة / ⲁⲣⲭⲏⲇⲓⲁⲕⲱⲛ):** أعلى درجات الشمامسة، يتولى قيادة وتنسيق خدمة الشمامسة وتنظيم الهيكل.`,
  },
  {
    keywords: ['qorban', 'holy bread', 'al-hamal', 'قربان', 'القربان', 'الحمل'],
    en: `### The Holy Bread (Qorban / ⲟⲩⲕⲟⲩⲣⲃⲁⲛ)\n\n* **Round Shape:** Represents eternity without beginning or end, like our Lord Jesus Christ.\n* **The 12 Crosses:** Represent the 12 Apostles who proclaimed Christ's Gospel to the four corners of the world.\n* **The Central Cross (Spadikon / ⲥ̀ⲡⲁⲇⲓⲕⲟⲛ):** Represents Christ, the Master and Head of the Church.\n* **The 5 Holes:** Symbolize the five wounds of Christ on the Cross (the three nails, the spear in His side, and the crown of thorns).\n* **The Inscription:** Inscribed in Coptic around the border: *"Agios O Theos, Agios Ischyros, Agios Athanatos"* ("Holy God, Holy Mighty, Holy Immortal").`,
    ar: `### قربانة الحمل في الكنيسة القبطية (الحمل / ⲟⲩⲕⲟⲩⲣⲃⲁⲛ)\n\n* **الشكل الدائري:** يرمز إلى الأبدية التي لا بداية لها ولا نهاية، كشخص الفادي ربنا يسوع المسيح.\n* **الصلبان الاثنا عشر:** ترمز لتلاميذ المسيح الاثني عشر الذين كرزوا بإنجيل الخلاص في المسكونة كلها.\n* **الصليب الكبير الأوسط (الإسباديكون):** يرمز للسيد المسيح رئيس الكنيسة وفاديها.\n* **الثقوب الخمسة:** ترمز لجراحات السيد المسيح الخمس على عود الصليب (المسامير الثلاثة، طعنة الحربة في جنبه، وإكليل الشوك).\n* **الكتابة القبطية الدائرية:** منقوش حولها باليونانية والقبطية: «قدوس الله، قدوس القوي، قدوس الحي الذي لا يموت» (Ⲁⲅⲓⲟⲥ ⲟ̅ Ⲑⲉⲟⲥ).`,
  },
  {
    keywords: ['communion', 'eucharist', 'تناول', 'التناول', 'الافخارستيا', 'الإفخارستيا'],
    en: `### The Sacrament of Holy Communion (The Eucharist / ϯⲉⲩⲭⲁⲣⲓⲥⲧⲓⲁ)\n\n* **The Crown of Sacraments:** Holy Communion is the summit of Christian life, wherein bread and wine are transformed by the Holy Spirit into the true Body and true Blood of our Lord Jesus Christ.\n* **Preparation:** Fasting from midnight (or 9 hours prior for adults), spiritual repentance, receiving the absolution from the priest, and reconciliation with all.\n* **Blessing:** Chanting the joyful Psalm 150 (*Esmou Epchois*) during Distribution, thanking God for the gift of eternal life.`,
    ar: `### سر الإفخارستيا المقدس (التناول / ϯⲉⲩⲭⲁⲣⲓⲥⲧⲓⲁ)\n\n* **تاج الأسرار الكنسية:** هو سر الشركة الحقيقية مع الله، وفيه يتحول الخبز والخمر بفعل الروح القدس إلى جسد حقيقي ودم حقيقي لربنا يسوع المسيح.\n* **الاستعداد للتناول:** الصوم الانقطاعي (٩ ساعات للكبار أو من منتصف الليل)، التوبة الصادقة والاعتراف، نوال الحل من الكاهن، ومصالحة الجميع.\n* **البركة والتسبيح:** يُرتل الشعب خلال توزيع الأسرار المقدسة مزمور التوزيع ١٥٠ («سبحوا الله في جميع قديسيه / إسمو إبشويس») بفرح وشكر.`,
  },
];

function isGreeting(text: string): boolean {
  const t = text.trim().toLowerCase();
  return /^(hi|hello|hey|greetings|peace|peace be with you|good morning|good afternoon|good evening|how are you|who are you|what can you do|help|thank you|thanks|thx|سلام|سلام ونعمة|أهلاً|اهلا|مرحبا|صباح الخير|مساء الخير|إزيك|ازيك|عامل ايه|عامل إيه|من أنت|مين أنت|مين انت|بتعمل ايه|بتعرف تعمل ايه|شكراً|شكرا)$/i.test(t);
}

function getGreetingResponse(lang: 'en' | 'ar'): AskResult {
  if (lang === 'ar') {
    return {
      answer: `سلام ونعمة! أهلاً بك. أنا **خادم التسبحة الذكي**، رفيقك في التراث القبطي الأرثوذكسي العريق. ✝️

أستطيع مساعدتك في:
• 🔍 **البحث عن أي لحن وفتحه لك مباشرة:** (مثال: *«ابحث لي عن لحن تاي شوري»* أو *«أين لحن غولغوثا؟»*).
• 🎵 **شرح نغمات وطقوس الألحان:** (مثال: *«ما الفرق بين الآدام والواطس؟»*).
• ⛪ **ترتيب الصلوات والتسبحة:** (مثال: *«ترتيب تسبحة نصف الليل»* أو *«صلوات الأجبية»*).
• 📜 **سِيَر القديسين والشهداء:** (مثال: *«سيرة الأنبا أنطونيوس»* أو *«من هو مارجرجس؟»*).
• 💬 **الإجابة عن أي سؤال روحي أو لغوي قبطي.**

بماذا تحب أن نبدأ؟`,
      actions: [
        { type: 'hymn', id: 'annual-liturgy-offering-golden-censer', title: 'لحن تاي شوري (المجمرة الذهب)', subtitle: 'السنوي · القداس الإلهي' },
        { type: 'route', route: '/calendar', title: 'النتيجة القبطية', subtitle: 'أعياد وأصوام اليوم' },
        { type: 'route', route: '/guide', title: 'دليل الشماس', subtitle: 'خطوات الخدمة في الكنيسة' },
      ],
    };
  }

  return {
    answer: `Peace be with you! I am your **Coptic Psalmody Assistant**, here to help you learn, pray, and explore the rich heritage of the Coptic Orthodox Church of Alexandria. ✝️

Here are some things you can ask me:
• 🔍 **Find any hymn and take you directly to it:** e.g., *"Find me Tai Shouri"* or *"Where is Golgotha?"*
• 🎵 **Learn hymn tunes & rites:** e.g., *"What is the difference between Adam and Watos?"*
• ⛪ **Explore prayers & psalmody:** e.g., *"What is the structure of Midnight Praises?"* or *"What are the Agpeya hours?"*
• 📜 **Read saint stories from the Synaxarium:** e.g., *"Tell me the story of St. Anthony"* or *"Who is St. Mina?"*
• 💬 **Ask any question about Coptic hymns, language, or faith.**

How can I help you today?`,
    actions: [
      { type: 'hymn', id: 'annual-liturgy-offering-golden-censer', title: 'The Golden Censer (Tai Shouri)', subtitle: 'Annual · Liturgy' },
      { type: 'route', route: '/calendar', title: 'Coptic Calendar', subtitle: "Feasts, fasts & today's date" },
      { type: 'route', route: '/guide', title: "Deacon's Guide", subtitle: 'Serving in the church step by step' },
    ],
  };
}

function isDateQuestion(text: string): boolean {
  const t = text.trim().toLowerCase();
  return /(today'?s coptic date|coptic date today|what is today'?s date|what date is today|النهاردة كام قبطي|النهارده كام قبطي|تاريخ اليوم القبطي|تاريخ النهاردة قبطي|تاريخ النهار ده قبطي)/i.test(t);
}

function getDateResponse(lang: 'en' | 'ar'): AskResult {
  const todayJdn = dateToJdn(new Date());
  const coptic = jdnToCoptic(todayJdn);
  const monthName = copticMonths[lang][coptic.month - 1];
  const dayStr = lang === 'ar' ? toArabicDigits(coptic.day) : String(coptic.day);
  const yearStr = lang === 'ar' ? toArabicDigits(coptic.year) : String(coptic.year);

  if (lang === 'ar') {
    return {
      answer: `📅 اليوم في التقويم القبطي هو:\n**${dayStr} ${monthName} ${yearStr} للشهداء** (ش).\n\nيمكنك فتح النتيجة القبطية لعرض قراءات اليوم والسنكسار والمناسبات الكنسية:`,
      actions: [
        { type: 'route', route: '/calendar', title: 'عرض النتيجة القبطية', subtitle: `${dayStr} ${monthName} ${yearStr} ش` },
      ],
    };
  }

  return {
    answer: `📅 Today in the Coptic Calendar is:\n**${dayStr} ${monthName} ${yearStr} A.M.** (Year of the Martyrs).\n\nOpen the Coptic Calendar to view today's saints, fasts, and liturgical seasons:`,
    actions: [
      { type: 'route', route: '/calendar', title: 'Open Coptic Calendar', subtitle: `${dayStr} ${monthName} ${yearStr} A.M.` },
    ],
  };
}

function checkNavigationCommand(
  cleanQ: string,
  history: ChatMessage[],
  lang: 'en' | 'ar'
): AskResult | null {
  const isNav = /^(take me there|take me to it|take me|open it|open that|go there|go to it|navigate there|open the hymn|show it to me|show me|افتحه|وديني هناك|وديني له|افتح اللحن|روح له|روح هناك|وديني)$/i.test(cleanQ);

  if (!isNav) return null;

  // Look back in history to find the most recent action
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg.role === 'assistant' && msg.actions && msg.actions.length > 0) {
      const act = msg.actions[0];
      const route =
        act.type === 'hymn' && act.id
          ? `/hymn/${act.id}`
          : act.type === 'saint' && act.id
          ? `/saints/${act.id}`
          : act.route;

      if (route) {
        return {
          answer:
            lang === 'ar'
              ? `جارٍ نقلك إلى **${act.title}** الآن...`
              : `Taking you to **${act.title}** now...`,
          actions: [act],
          autoNavigate: { route, title: act.title },
        };
      }
    }
  }

  return {
    answer:
      lang === 'ar'
        ? 'أي لحن أو صفحة ترغب في الذهاب إليها؟ اكتب لي اسم اللحن وسأنقلك إليه مباشرة.'
        : 'Which hymn or page would you like to open? Tell me the name of the hymn and I will take you there!',
  };
}

function checkAppSectionNavigation(cleanQ: string, lang: 'en' | 'ar'): AskResult | null {
  const q = cleanQ.toLowerCase();

  const sections: { patterns: RegExp[]; route: string; titleEn: string; titleAr: string }[] = [
    { patterns: [/(calendar|coptic calendar|النتيجة|التقويم القبطي)/i], route: '/calendar', titleEn: 'Coptic Calendar', titleAr: 'النتيجة القبطية' },
    { patterns: [/(deacon('?s)? guide|دليل الشماس)/i], route: '/guide', titleEn: "Deacon's Guide", titleAr: 'دليل الشماس' },
    { patterns: [/(saints|synaxarium|السنكسار|قائمة القديسين)/i], route: '/saints', titleEn: 'Saints & Synaxarium', titleAr: 'السنكسار وسِيَر القديسين' },
    { patterns: [/(faith|creed|orthodox faith|الارثوذكسية|الايمان|العقيدة)/i], route: '/faith', titleEn: 'Coptic Faith & Creed', titleAr: 'الإيمان والعقيدة' },
    { patterns: [/(learn coptic|coptic lessons|تعليم القبطي|دروس القبطي)/i], route: '/learn', titleEn: 'Learn Coptic', titleAr: 'دروس اللغة القبطية' },
    { patterns: [/(playlist|my hymns|قائمة التشغيل|الحاني)/i], route: '/playlist', titleEn: 'My Playlists', titleAr: 'قوائم التشغيل' },
    { patterns: [/(downloads|offline recordings|التسجيلات المحفوظة|التحميلات)/i], route: '/downloads', titleEn: 'Downloads', titleAr: 'التسجيلات المحفوظة' },
    { patterns: [/(settings|preferences|الاعدادات|الإعدادات)/i], route: '/settings', titleEn: 'Settings', titleAr: 'الإعدادات' },
  ];

  const isExplicit = /^(open|take me to|go to|show|افتح|وديني|وريني)\s+/i.test(q);

  for (const s of sections) {
    if (s.patterns.some((p) => p.test(q))) {
      const title = lang === 'ar' ? s.titleAr : s.titleEn;
      return {
        answer:
          lang === 'ar'
            ? `يمكنك فتح **${title}** من الزر أدناه:`
            : `Here is the link to open **${title}**:`,
        actions: [
          { type: 'route', route: s.route, title, subtitle: lang === 'ar' ? 'انتقال إلى القسم' : 'Open section' },
        ],
        autoNavigate: isExplicit ? { route: s.route, title } : undefined,
      };
    }
  }

  return null;
}

const HYMN_SEARCH_ALIASES: { keywords: string[]; queries: string[] }[] = [
  {
    keywords: ['tai shouri', 'ti shouri', 'taishouri', 'tishouri', 'tai shori', 'ti shori', 'تاي شوري', 'تي شوري'],
    queries: ['Ⲧⲁⲓϣⲟⲩⲣⲏ', 'golden censer', 'المجمرة الذهب'],
  },
  {
    keywords: ['epouro', 'ep ouro', 'ابؤرو', 'إبؤرو', 'يا ملك السلام'],
    queries: ['Ⲡⲟⲩⲣⲟ', 'pouro', 'hymn of joy'],
  },
  {
    keywords: ['golgotha', 'gulgotha', 'جلجثة', 'الجلجثة', 'غولغوثا'],
    queries: ['golgotha', 'Ⲅⲟⲗⲅⲟⲑⲁ'],
  },
  {
    keywords: ['agios', 'aghios', 'قدوس', 'اجيوس', 'أجيوس'],
    queries: ['agios', 'ⲁⲅⲓⲟⲥ'],
  },
  {
    keywords: ['khen oushot', 'khenoushot', 'خين اوشوت'],
    queries: ['khen oushot', 'Ϧⲉⲛ ⲟⲩϣⲱⲧ'],
  },
  {
    keywords: ['asomen', 'اسومن'],
    queries: ['asomen', 'Ⲁⲥⲱⲙⲉⲛ'],
  },
  {
    keywords: ['tenen', 'تنين'],
    queries: ['tenen', 'Ⲧⲉⲛⲉⲛ'],
  },
  {
    keywords: ['hitens', 'hiten', 'هيتين', 'هيتينات'],
    queries: ['Ϩⲓⲧⲉⲛ', 'hitens'],
  },
  {
    keywords: ['shere maria', 'shere ne maria', 'شيري ماريا', 'شيري ني ماريا'],
    queries: ['shere ne maria', 'Χⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ'],
  },
  {
    keywords: ['eksmaroout', 'ekzmaroout', 'اكسمارؤوت', 'إكسمارؤوت'],
    queries: ['eksmaroout', 'Ⲉⲕⲥ̀ⲙⲁⲣⲱⲟⲩⲧ'],
  },
];

type HymnSearchResult = ReturnType<typeof searchHymns>[number];

function searchHymnCandidates(cleanQ: string, limit: number): HymnSearchResult[] {
  const stripped = cleanQ
    .replace(/^(can you\s+)?(please\s+)?(find|search|show|where is|locate|open|get|take me to|look up)\s+(me\s+)?(the\s+)?(hymn\s+)?/i, '')
    .replace(/^(من فضلك\s+)?(ممكن\s+)?(ابحث عن|دور على|فين|أين|عايز|اريد|وريني|افتح|وديني لـ|وديني|هاتلي|طلعلي)\s+(لحن\s+)?/i, '')
    .replace(/[?.,!]/g, '')
    .trim();

  if (!stripped || stripped.length < 2) return [];

  let results = searchHymns(stripped, limit * 2);
  if (!results || results.length === 0) {
    const sLower = stripped.toLowerCase();
    for (const alias of HYMN_SEARCH_ALIASES) {
      if (alias.keywords.some((kw) => sLower.includes(kw))) {
        for (const q of alias.queries) {
          const aliasResults = searchHymns(q, limit * 2);
          if (aliasResults && aliasResults.length > 0) {
            results = aliasResults;
            break;
          }
        }
        if (results && results.length > 0) break;
      }
    }
  }

  const uniqueResults: HymnSearchResult[] = [];
  const seenTitles = new Set<string>();
  for (const r of results ?? []) {
    const key = r.hymn.title.toLowerCase().replace(/@.+/, '');
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      uniqueResults.push(r);
      if (uniqueResults.length >= limit) break;
    }
  }
  return uniqueResults;
}

function findHymnMatches(cleanQ: string, lang: 'en' | 'ar'): AskResult | null {
  const uniqueResults = searchHymnCandidates(cleanQ, 3);
  if (uniqueResults.length === 0) return null;

  const actions: ChatAction[] = uniqueResults.map((r) => {
    const arTitle = displayTitle(r.hymn, 'ar');
    const title = lang === 'ar' ? (arTitle || r.hymn.title) : r.hymn.title;
    const loc = `${r.location.group.title} · ${r.location.service.title}`;
    return {
      type: 'hymn',
      id: r.hymn.id,
      title,
      subtitle: loc,
    };
  });

  const top = uniqueResults[0];
  const topTitle = lang === 'ar' ? (displayTitle(top.hymn, 'ar') || top.hymn.title) : top.hymn.title;
  const topLoc = `${top.location.group.title} · ${top.location.service.title}`;

  const isTakeMeTo = /^(take me to|open|go to|افتح|وديني لـ|وديني)\s+/i.test(cleanQ);

  const answer =
    lang === 'ar'
      ? `وجدت لك لحن **«${topTitle}»** في **${topLoc}**.\n\nاضغط على الزر أدناه للانتقال مباشرة إلى اللحن ومتابعته وقراءته:`
      : `I found the hymn **"${topTitle}"** in **${topLoc}**.\n\nTap the button below to open the hymn and listen or read along:`;

  return {
    answer,
    actions,
    autoNavigate: isTakeMeTo ? { route: `/hymn/${top.hymn.id}`, title: topTitle } : undefined,
  };
}

const APP_ROUTES: Record<string, string> = {
  '/calendar': 'Coptic Calendar',
  '/guide': "Deacon's Guide",
  '/saints': 'Saints & Synaxarium',
  '/faith': 'Coptic Faith & Creed',
  '/learn': 'Learn Coptic',
  '/playlist': 'My Playlists',
  '/downloads': 'Downloads',
  '/settings': 'Settings',
};

function parseActionsFromText(text: string): { cleanText: string; actions: ChatAction[] } {
  const actions: ChatAction[] = [];
  let cleanText = text;

  // Pattern: [ACTION:type:id:title] or [HYMN:query]
  const hymnMatches = [...text.matchAll(/\[\s*HYMN\s*:([^\]]+)\]/g)];
  for (const m of hymnMatches) {
    const query = m[1].trim();
    cleanText = cleanText.replace(m[0], '');
    const found = searchHymns(query, 2);
    if (found && found.length > 0) {
      actions.push({
        type: 'hymn',
        id: found[0].hymn.id,
        title: found[0].hymn.title,
        subtitle: `${found[0].location.group.title} · ${found[0].location.service.title}`,
      });
    }
  }

  // The AI sometimes leaves out the type ([ACTION:<id>:<title>]) or the title, so the type is
  // optional, and only buttons that lead somewhere real are kept
  const actionMatches = [...text.matchAll(/\[\s*ACTION\s*:\s*(?:(hymn|saint|route)\s*:)?([^:\]]+):?([^\]]*)\]/g)];
  for (const m of actionMatches) {
    cleanText = cleanText.replace(m[0], '');
    const target = m[2].trim();
    const givenTitle = m[3]?.trim();
    const actType = m[1] ?? (target.startsWith('/') ? 'route' : saints.some((s) => s.id === target) ? 'saint' : 'hymn');
    if (actType === 'hymn') {
      const hymn = locateHymn(target)?.hymn ?? (givenTitle ? searchHymns(givenTitle, 1)[0]?.hymn : undefined);
      if (hymn) actions.push({ type: 'hymn', id: hymn.id, title: givenTitle || hymn.title });
    } else if (actType === 'saint') {
      const saint = saints.find((s) => s.id === target);
      if (saint) actions.push({ type: 'saint', id: target, title: givenTitle || saint.name.en });
    } else if (APP_ROUTES[target]) {
      actions.push({ type: 'route', route: target, title: givenTitle || APP_ROUTES[target] });
    }
  }

  return { cleanText: cleanText.trim(), actions };
}

async function callGeminiDirect(
  question: string,
  history: ChatMessage[],
  apiKey: string,
  language: 'en' | 'ar'
): Promise<AskResult | null> {
  const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

  for (const m of history.slice(-6)) {
    if (m.content.trim()) {
      const role = m.role === 'assistant' ? 'model' : 'user';
      if (contents.length === 0 && role === 'model') continue;
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += '\n\n' + m.content;
      } else {
        contents.push({ role, parts: [{ text: m.content }] });
      }
    }
  }

  if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
    contents[contents.length - 1].parts[0].text += '\n\n' + question;
  } else {
    contents.push({ role: 'user', parts: [{ text: question }] });
  }

  const systemText = `You are a reverent, knowledgeable, and caring Coptic Orthodox Christian assistant ("Coptic Psalmody AI").
Specialize in Coptic hymns, Midnight Praises (Tasbeha), the Coptic language, Church fathers, and saints.
Answer faithfully according to Coptic Orthodox tradition. Respond in ${language === 'ar' ? 'Arabic' : 'English'}.
If recommending a specific hymn, you may include [HYMN:Hymn Name] at the end so the app can create an open button.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemText }] },
      contents,
      generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
    }),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text: string }[] } }[];
  };
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  if (!rawText) return null;

  const { cleanText, actions } = parseActionsFromText(rawText);
  return { answer: cleanText, actions: actions.length > 0 ? actions : undefined };
}

// What the app itself knows about the question, sent along so the AI answers from the
// app's real hymns, saints and today's date instead of guessing.
function buildAppContext(cleanQ: string, lang: 'en' | 'ar'): string {
  const today = new Date();
  const coptic = jdnToCoptic(dateToJdn(today));
  const lines: string[] = [
    `Today: ${today.toDateString()} = ${coptic.day} ${copticMonths.en[coptic.month - 1]} ${coptic.year} A.M.`,
    `The user's app language: ${lang === 'ar' ? 'Arabic' : 'English'}`,
  ];

  const hymns = searchHymnCandidates(cleanQ, 8);
  if (hymns.length > 0) {
    lines.push('', 'Hymns in the app that match the question (id | title | Arabic title | where):');
    for (const r of hymns) {
      const ar = displayTitle(r.hymn, 'ar');
      lines.push(
        `- ${r.hymn.id} | ${r.hymn.title} | ${ar && ar !== r.hymn.title ? ar : '-'} | ${r.location.group.title} · ${r.location.service.title}`
      );
    }

    // The words of the closest matches, so the AI explains the real text instead of guessing
    const translation: LanguageType = lang === 'ar' ? 'arabic' : 'english';
    hymns.slice(0, 2).forEach((r, i) => {
      // Best match: Coptic, English letters and translation; runner-up: translation only
      const languages: LanguageType[] = i === 0 ? ['coptic', 'englishCoptic', translation] : [translation];
      const excerpts = languages
        .map((l) => {
          const text = r.hymn.versions.find((v) => v.language === l)?.text.trim();
          return text ? `[${l}]\n${text.length > 500 ? text.slice(0, 500) + ' …' : text}` : null;
        })
        .filter((e): e is string => e !== null);
      if (excerpts.length > 0) {
        lines.push('', `Text of ${r.hymn.id} (opening):`, ...excerpts);
      }
    });
  }

  const saint = findSaintAnswer(cleanQ, 'en');
  const saintAction = saint?.actions?.[0];
  if (saint && saintAction?.id) {
    lines.push('', `Synaxarium entry in the app (saint id ${saintAction.id}):`, saint.answer.slice(0, 2500));
  }

  const qLower = cleanQ.toLowerCase();
  const notes = OFFLINE_KNOWLEDGE.filter((item) => item.keywords.some((k) => qLower.includes(k.toLowerCase())));
  for (const item of notes.slice(0, 2)) {
    lines.push('', "Note from the app's built-in guide:", item.en);
  }

  return lines.join('\n');
}

const OPEN_PREFIX = /^(can you\s+)?(please\s+)?(find|search|where is|locate|open|take me to|go to|look up|ابحث|دور|فين|أين|افتح|وديني|وريني)\s+/i;

function answerOffline(cleanQ: string, language: 'en' | 'ar'): AskResult | null {
  if (isDateQuestion(cleanQ)) return getDateResponse(language);

  const saintMatch = findSaintAnswer(cleanQ, language);
  if (saintMatch) return saintMatch;

  const qLower = cleanQ.toLowerCase();
  for (const item of OFFLINE_KNOWLEDGE) {
    if (item.keywords.some((k) => qLower.includes(k.toLowerCase()))) {
      return { answer: language === 'ar' ? item.ar : item.en };
    }
  }

  return checkAppSectionNavigation(cleanQ, language) ?? findHymnMatches(cleanQ, language);
}

async function askServer(
  cleanQ: string,
  history: ChatMessage[],
  language: 'en' | 'ar'
): Promise<AskResult | null> {
  const endpoint =
    Platform.OS === 'web' && typeof window !== 'undefined'
      ? '/api/ask'
      : 'https://copticpsalmody.com/api/ask';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: cleanQ,
      history: history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      language,
      context: buildAppContext(cleanQ, language),
    }),
  });
  if (!response.ok) return null;

  const data = (await response.json()) as AskResponse;
  if (!data.configured || !data.answer) return null;

  const { cleanText, actions } = parseActionsFromText(data.answer);
  return { answer: cleanText, actions: actions.length > 0 ? actions : undefined };
}

export async function askAiQuestion(
  question: string,
  history: ChatMessage[] = [],
  language: 'en' | 'ar' = 'en',
  customApiKey?: string
): Promise<AskResult> {
  const cleanQ = question.trim();

  // 1. Direct call if user configured their own Gemini API key
  if (customApiKey && customApiKey.trim()) {
    try {
      const directAnswer = await callGeminiDirect(cleanQ, history, customApiKey.trim(), language);
      if (directAnswer) return directAnswer;
    } catch {
      // Continue to next handlers
    }
  }

  // 2. Instant answers that need no thinking: greetings, "open it", and explicit
  //    "open / take me to / find X" commands for a page or hymn
  if (isGreeting(cleanQ)) {
    return getGreetingResponse(language);
  }

  const navMatch = checkNavigationCommand(cleanQ, history, language);
  if (navMatch) {
    return navMatch;
  }

  if (OPEN_PREFIX.test(cleanQ)) {
    const direct = checkAppSectionNavigation(cleanQ, language) ?? findHymnMatches(cleanQ, language);
    if (direct) return direct;
  }

  // 3. Everything else goes to the AI, with what the app knows attached
  try {
    const online = await askServer(cleanQ, history, language);
    if (online) return online;
  } catch {
    // Network or server error - answer from the built-in knowledge instead
  }

  // 4. Offline: the built-in date, Synaxarium, guide notes and hymn search
  const offline = answerOffline(cleanQ, language);
  if (offline) return offline;

  // 5. Nothing matched offline either
  if (language === 'ar') {
    return {
      answer: `سلام ونعمة! أعتذر عن عدم التمكن من الاتصال بالخادم الآن (تأكد من اتصالك بالإنترنت للإجابة بالذكاء الاصطناعي الحي).

ومع ذلك، يمكنك استكشاف التراث القبطي من خلال الأقسام التالية:
• 🔍 **ابحث عن أي لحن وافتحه مباشرة:** (مثل *«تاي شوري»*، *«إبؤرو»*، *«غولغوثا»*).
• 📜 **سِيَر القديسين من السنكسار:** (مثل *«سيرة الأنبا أنطونيوس»*، *«مارجرجس»*، *«مارمينا»*).
• 🎵 **طقوس التسبحة والألحان:** (مثل *«الفرق بين الآدام والواطس»*، *«صلوات الأجبية»*، *«صلاة القسمة»*).
• ⛪ **دليل الشماس والنتيجة القبطية** عبر الروابط أدناه:`,
      actions: [
        { type: 'hymn', id: 'annual-liturgy-offering-golden-censer', title: 'لحن تاي شوري (المجمرة الذهب)', subtitle: 'القداس الإلهي' },
        { type: 'route', route: '/calendar', title: 'النتيجة القبطية', subtitle: 'أعياد وأصوام اليوم' },
        { type: 'route', route: '/guide', title: 'دليل الشماس', subtitle: 'خطوات الخدمة في الكنيسة' },
      ],
    };
  }

  return {
    answer: `Peace be with you! I cannot reach the live AI server right now (please check your internet connection for full conversational AI answers).

You can still explore all our built-in Coptic knowledge offline:
• 🔍 **Find any hymn:** e.g., *"Find me Tai Shouri"*, *"Where is Golgotha?"*, *"Open Epouro"*
• 📜 **Saints & Synaxarium:** e.g., *"Story of St. Anthony"*, *"Who is St. Mina?"*, *"St. George"*
• 🎵 **Liturgical Rites:** e.g., *"Adam vs. Watos tunes"*, *"Hours of the Agpeya"*, *"Fraction prayers"*
• ⛪ **Deacon's Guide & Calendar** via the shortcuts below:`,
    actions: [
      { type: 'hymn', id: 'annual-liturgy-offering-golden-censer', title: 'The Golden Censer (Tai Shouri)', subtitle: 'Liturgy' },
      { type: 'route', route: '/calendar', title: 'Coptic Calendar', subtitle: "Feasts, fasts & today's date" },
      { type: 'route', route: '/guide', title: "Deacon's Guide", subtitle: 'Serving in the church step by step' },
    ],
  };
}
