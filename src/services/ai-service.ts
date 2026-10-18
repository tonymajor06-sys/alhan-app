import { Platform } from 'react-native';

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
    keywords: ['kyrillos', 'pope kyrillos', 'كيرلس', 'البابا كيرلس'],
    en: `### St. Pope Kyrillos VI (البابا كيرلس السادس)\n\n* **Title:** 116th Pope of Alexandria and Patriarch of the See of St. Mark (1959–1971).\n* **Feast:** 30 Amshir (March 9).\n* **Life:** Known as a man of continuous prayer, daily Liturgies, fasting, and profound humility. He had a deep spiritual friendship with St. Mina the Wonderworker.\n* **Milestones:**\n  * Built the grand St. Mark Cathedral in Cairo.\n  * Witnessed the Apparitions of the Virgin Mary at Zeitoun (1968).\n  * Retrieved the holy relics of St. Mark the Apostle from Venice to Egypt.`,
    ar: `### القديس البابا كيرلس السادس (رجل الصلاة)\n\n* **المنصب:** البابا رقم ١١٦ في بطاركة الكرسي المرقسي الإسكندري (١٩٥٩ - ١٩٧١م).\n* **العيد:** ٣٠ أمشير (٩ مارس).\n* **السيرة العطرة:** عُرف برجل الصلاة الدائمة، والقداسات اليومية، والتواضع العجيب، وصداقته العميقة مع الشهيد العظيم مارمينا العجائبي.\n* **أهم إنجازاته وعصره:**\n  * بناء الكاتدرائية المرقسية الكبرى بالعباسية.\n  * عودة رفات القديس مارمرقس الرسول من فينيسيا إلى مصر.\n  * تجلي السيدة العذراء مريم بكنيستها بالزيتون عام ١٩٦٨م.`,
  },
];

export async function askAiQuestion(
  question: string,
  history: ChatMessage[] = [],
  language: 'en' | 'ar' = 'en'
): Promise<string> {
  const qLower = question.toLowerCase().trim();

  // Check built-in knowledge base first for instant high-confidence response
  for (const item of OFFLINE_KNOWLEDGE) {
    if (item.keywords.some((k) => qLower.includes(k.toLowerCase()))) {
      // If we find an offline match, we can return it directly or use it as fallback
      // Try online API first, fallback to this
    }
  }

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
        question,
        history: history.map((m) => ({ role: m.role, content: m.content })),
        language,
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as AskResponse;
      if (data.answer) {
        return data.answer;
      }
    }
  } catch {
    // Network or server error - check fallback
  }

  // Fallback to knowledge base
  for (const item of OFFLINE_KNOWLEDGE) {
    if (item.keywords.some((k) => qLower.includes(k.toLowerCase()))) {
      return language === 'ar' ? item.ar : item.en;
    }
  }

  if (language === 'ar') {
    return 'شكراً لسؤالك. حالياً المساعد الذكي قيد الاتصال بخادم التسبحة. يمكنك السؤال عن معاني الألحان، نغمات الآدام والواطس، أو سِيَر القديسين كالبابا كيرلس السادس ومارمينا.';
  }
  return 'Thank you for your question. The AI assistant is connecting to the server. You can ask about hymn tunes (Adam vs Watos), rites for Kiahk and Great Lent, Coptic grammar, or saints like Pope Kyrillos VI.';
}

