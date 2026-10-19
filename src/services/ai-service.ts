import { Platform } from 'react-native';

import { copticDayName, Saint, saints, saintSortKey } from '@/data/saints';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AskResponse {
  answer: string;
  configured?: boolean;
  error?: string;
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

function formatSaintStory(saint: Saint, lang: 'en' | 'ar'): string {
  const feast = copticDayName(saint.month, saint.day, lang);
  if (lang === 'ar') {
    return `### ${saint.name.ar}\n\n**تذكار نياحته/استشهاده:** ${feast}\n\n${saint.story.ar}`;
  }
  return `### ${saint.name.en}\n\n**Feast Day:** ${feast}\n\n${saint.story.en}`;
}

export function findSaintAnswer(question: string, lang: 'en' | 'ar'): string | null {
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
];

async function callGeminiDirect(
  question: string,
  history: ChatMessage[],
  apiKey: string,
  language: 'en' | 'ar'
): Promise<string | null> {
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

  const systemText = `You are a reverent, knowledgeable Coptic Orthodox Christian assistant ("Coptic Psalmody AI").
Specialize in Coptic hymns, Midnight Praises (Tasbeha), the Coptic language, Church fathers, and saints.
Answer faithfully according to Coptic Orthodox tradition. Respond in ${language === 'ar' ? 'Arabic' : 'English'}.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
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
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
}

export async function askAiQuestion(
  question: string,
  history: ChatMessage[] = [],
  language: 'en' | 'ar' = 'en',
  customApiKey?: string
): Promise<string> {
  const cleanQ = question.trim();

  // 1. Direct call if the user configured their own Gemini API key in app settings
  if (customApiKey && customApiKey.trim()) {
    try {
      const directAnswer = await callGeminiDirect(cleanQ, history, customApiKey.trim(), language);
      if (directAnswer) return directAnswer;
    } catch {
      // Continue to server or offline fallback
    }
  }

  // 2. Try online server endpoint (Cloudflare Worker with Gemini)
  const endpoint =
    Platform.OS === 'web' && typeof window !== 'undefined'
      ? '/api/ask'
      : 'https://copticpsalmody.com/api/ask';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: cleanQ,
        history: history.map((m) => ({ role: m.role, content: m.content })),
        language,
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as AskResponse;
      if (data.configured && data.answer) {
        return data.answer;
      }
    }
  } catch {
    // Network or server error - fallback to local Coptic knowledge base
  }

  // 3. Search Coptic Synaxarium saints database (St. Antony, St. Mina, St. George, etc.)
  const saintMatch = findSaintAnswer(cleanQ, language);
  if (saintMatch) {
    return saintMatch;
  }

  // 4. Search curated liturgical knowledge base
  const qLower = cleanQ.toLowerCase();
  for (const item of OFFLINE_KNOWLEDGE) {
    if (item.keywords.some((k) => qLower.includes(k.toLowerCase()))) {
      return language === 'ar' ? item.ar : item.en;
    }
  }

  // 5. If not found in offline knowledge, provide helpful setup guidance
  if (language === 'ar') {
    return `### لم يُعثر على إجابة في قاعدة البيانات المحلية

للإجابة عن أي سؤال مخصص حول الألحان والطقوس واللغة القبطية بالذكاء الاصطناعي، يمكنك تفعيل **Google Gemini** مجاناً تماماً (بدون بطاقة ائتمان) من:
**https://aistudio.google.com**

ثم إضافة المفتاح إما:
1. في إعدادات التطبيق تحت «مفتاح Gemini الذكي».
2. أو في خادم الموقع بواسطة الأمر:
\`npx wrangler secret put GEMINI_API_KEY\``;
  }

  return `### Not Found in Local Knowledge Base

To answer custom questions about hymns, rites, and Coptic translations using AI, you can activate **Google Gemini** 100% free (no credit card required) from:
**https://aistudio.google.com**

Then add your free key either:
1. In the app Settings under **"Gemini API Key"**.
2. Or on the website server using:
\`npx wrangler secret put GEMINI_API_KEY\``;
}
