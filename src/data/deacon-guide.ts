import { makeQuestion, QuizQuestion, shuffle } from './quiz';

// The Deacon's Guide: how to serve in church, in both app languages


export interface Bilingual {
  en: string;
  ar: string;
}

export interface GuideItem {
  title?: Bilingual;
  text: Bilingual;
}

export interface GuideSection {
  id: string;
  icon: string;
  title: Bilingual;
  desc: Bilingual;
  // Items with a title show as cards; items without one show as a list
  items: GuideItem[];
  note?: Bilingual;
}

export const guideStrings = {
  en: {
    title: "Deacon's Guide",
    subtitle: 'Serving in the church, step by step',
    quizTitle: 'Quiz',
    quizDesc: 'Test what you know about serving',
    correct: 'Correct!',
    wrongAnswer: (answer: string) => `The answer is: ${answer}`,
    next: 'Next',
    seeScore: 'See score',
    score: (right: string, total: string) => `${right} out of ${total}`,
    scoreGreat: 'Excellent! You are ready to serve.',
    scoreGood: 'Good work. Another round will make it stick.',
    scoreKeepGoing: 'Keep going. Read through the guide and try again.',
    playAgain: 'New round',
  },
  ar: {
    title: 'دليل الشماس',
    subtitle: 'الخدمة في الكنيسة خطوة بخطوة',
    quizTitle: 'اختبار',
    quizDesc: 'اختبر معرفتك بالخدمة',
    correct: 'إجابة صحيحة!',
    wrongAnswer: (answer: string) => `الإجابة هي: ${answer}`,
    next: 'التالي',
    seeScore: 'النتيجة',
    score: (right: string, total: string) => `${right} من ${total}`,
    scoreGreat: 'ممتاز! أنت مستعد للخدمة.',
    scoreGood: 'عمل جيد. جولة أخرى ستثبّت ما تعلمته.',
    scoreKeepGoing: 'استمر. اقرأ الدليل وحاول مرة أخرى.',
    playAgain: 'جولة جديدة',
  },
};

export const guideSections: GuideSection[] = [
  {
    id: 'ranks',
    icon: '✠',
    title: { en: 'The Ranks of Deacons', ar: 'رتب الشمامسة' },
    desc: { en: 'From chanter to archdeacon', ar: 'من المرتل إلى رئيس الشمامسة' },
    items: [
      {
        title: { en: '1. Epsaltos · the chanter', ar: '١. أبصالتس · المرتل' },
        text: { en: 'Sings the hymns and responses.', ar: 'يرتل الألحان والمردات.' },
      },
      {
        title: { en: '2. Anagnostis · the reader', ar: '٢. أغنسطس · القارئ' },
        text: {
          en: 'Reads the Epistles, the Acts and the Synaxarium.',
          ar: 'يقرأ البولس والإبركسيس والسنكسار.',
        },
      },
      {
        title: { en: '3. Epideacon · the subdeacon', ar: '٣. إيبودياكون · مساعد الشماس' },
        text: {
          en: 'Serves inside the altar and prepares the vessels, the censer and the candles.',
          ar: 'يخدم داخل الهيكل ويجهز الأواني والشورية والشموع.',
        },
      },
      {
        title: { en: '4. Deacon · the full deacon', ar: '٤. دياكون · الشماس الكامل' },
        text: {
          en: 'Says the deacon responses and serves the priest at the altar.',
          ar: 'يقول مردات الشماس ويخدم الكاهن على المذبح.',
        },
      },
      {
        title: { en: '5. Archdeacon', ar: '٥. أرشيدياكون · رئيس الشمامسة' },
        text: { en: 'Leads the deacons and arranges their service.', ar: 'يقود الشمامسة وينظم خدمتهم.' },
      },
    ],
    note: {
      en: 'How each rank wears the badrashin differs from church to church. Follow your church.',
      ar: 'طريقة لبس البدرشين لكل رتبة تختلف من كنيسة لأخرى. اتبع ترتيب كنيستك.',
    },
  },
  {
    id: 'altar',
    icon: '☩',
    title: { en: 'Serving in the Altar', ar: 'الخدمة في الهيكل' },
    desc: { en: 'How to enter, stand and serve', ar: 'كيف تدخل وتقف وتخدم' },
    items: [
      {
        text: {
          en: "Come early, wear a clean white tonia, and get the bishop's or priest's blessing before putting on the badrashin.",
          ar: 'احضر مبكراً، والبس تونية بيضاء نظيفة، وخذ بركة الأب الأسقف أو الكاهن قبل لبس البدرشين.',
        },
      },
      {
        text: {
          en: 'Take off your shoes, make the sign of the cross, and bow toward the altar as you enter.',
          ar: 'اخلع حذاءك، وارشم علامة الصليب، وانحنِ أمام المذبح عند دخولك.',
        },
      },
      {
        text: {
          en: 'Never turn your back to the altar. Step aside or walk backward.',
          ar: 'لا تعطِ ظهرك للمذبح أبداً. تنحَّ جانباً أو ارجع للخلف.',
        },
      },
      {
        text: {
          en: 'Only the priest touches the altar board and the holy vessels, unless he asks you to.',
          ar: 'الكاهن وحده يلمس لوح المذبح والأواني المقدسة، إلا إذا طلب منك.',
        },
      },
      {
        text: {
          en: 'Inside the altar, speak only when needed, and keep your phone off.',
          ar: 'داخل الهيكل لا تتكلم إلا للضرورة، وأغلق هاتفك.',
        },
      },
      {
        text: {
          en: "Stand still and in order. Don't lean on the altar or walk in front of the priest while he prays.",
          ar: 'قف بهدوء وبترتيب. لا تستند على المذبح ولا تمر أمام الكاهن وهو يصلي.',
        },
      },
      {
        text: {
          en: "At the end, take off your tonia respectfully and kiss the priest's hand.",
          ar: 'في النهاية اخلع التونية باحترام وقبّل يد الكاهن.',
        },
      },
    ],
  },
  {
    id: 'candles',
    icon: '✦',
    title: { en: 'When to Take the Candles', ar: 'متى تمسك الشموع' },
    desc: { en: 'The Gospel, the Lamb and feast processions', ar: 'الإنجيل والحمل ودورات الأعياد' },
    items: [
      {
        text: {
          en: 'At the reading of the Gospel: two deacons hold candles on either side of the Gospel.',
          ar: 'عند قراءة الإنجيل: يمسك شماسان الشموع على جانبي الإنجيل.',
        },
      },
      {
        text: {
          en: 'In the Procession of the Lamb: a deacon with a candle walks in front.',
          ar: 'في دورة الحمل: يتقدم شماس يحمل شمعة.',
        },
      },
      {
        text: {
          en: 'In feast processions: the Resurrection, Palm Sunday and the Cross.',
          ar: 'في دورات الأعياد: القيامة وأحد الشعانين والصليب.',
        },
      },
    ],
  },
  {
    id: 'incense',
    icon: '☁',
    title: { en: 'When to Take the Incense', ar: 'متى تمسك البخور' },
    desc: { en: 'Preparing the censer and handing it to the priest', ar: 'تجهيز الشورية ومناولتها للكاهن' },
    items: [
      {
        title: { en: 'Before Vespers or Matins Raising of Incense', ar: 'قبل رفع بخور عشية أو باكر' },
        text: {
          en: 'Light the coal early so the censer is ready when the service starts.',
          ar: 'أشعل الفحم مبكراً لتكون الشورية جاهزة عند بدء الصلاة.',
        },
      },
      {
        title: { en: 'Hand the censer to the priest', ar: 'ناول الشورية للكاهن' },
        text: {
          en: 'At the beginning of Raising of Incense, at the Pauline Epistle, and at the Prayer of the Gospel before the Gospel is read.',
          ar: 'في بداية رفع البخور، وعند البولس، وفي أوشية الإنجيل قبل قراءته.',
        },
      },
      {
        title: { en: 'In the Liturgy', ar: 'في القداس' },
        text: {
          en: 'The priest adds incense during the "Agios" in the Anaphora.',
          ar: 'يضع الكاهن البخور أثناء "آجيوس" في الأنافورا.',
        },
      },
    ],
    note: {
      en: 'Some churches add other moments, like the Prayer of Reconciliation or the Commemoration of the Saints.',
      ar: 'بعض الكنائس تضيف أوقاتاً أخرى، مثل صلاة الصلح أو المجمع.',
    },
  },
  {
    id: 'joyful',
    icon: '♫',
    title: { en: 'When We Use the Joyful Tune', ar: 'متى نقول اللحن الفرايحي' },
    desc: { en: 'Feasts of the Lord and the 29th of the month', ar: 'أعياد السيد المسيح ويوم ٢٩ من الشهر' },
    items: [
      {
        title: { en: 'The major feasts of the Lord', ar: 'أعياد السيد المسيح الكبرى' },
        text: {
          en: 'Annunciation, Nativity, Theophany, Resurrection, Ascension and Pentecost.',
          ar: 'البشارة والميلاد والغطاس والقيامة والصعود والعنصرة.',
        },
      },
      {
        title: { en: 'The minor feasts of the Lord', ar: 'أعياد السيد المسيح الصغرى' },
        text: {
          en: 'Circumcision, the Wedding at Cana, the Entrance into the Temple, the Entry into Egypt, the Transfiguration and Thomas Sunday.',
          ar: 'الختان وعرس قانا الجليل ودخول المسيح الهيكل ودخوله أرض مصر والتجلي وأحد توما.',
        },
      },
      {
        title: { en: 'The 29th of each Coptic month', ar: 'يوم ٢٩ من كل شهر قبطي' },
        text: {
          en: 'Remembering the Annunciation, the Nativity and the Resurrection, except in Tobah and Amshir.',
          ar: 'تذكار البشارة والميلاد والقيامة، ما عدا شهري طوبة وأمشير.',
        },
      },
      {
        title: { en: 'Days with their own tune instead', ar: 'أيام لها لحنها الخاص' },
        text: {
          en: 'Kiahk, Palm Sunday, Holy Week, the Holy Fifty Days, Nayrouz and the Feast of the Cross.',
          ar: 'كيهك وأحد الشعانين وأسبوع الآلام والخماسين المقدسة والنيروز وعيد الصليب.',
        },
      },
    ],
  },
  {
    id: 'bring',
    icon: '☰',
    title: { en: 'What to Bring', ar: 'ماذا تحضر معك' },
    desc: { en: 'Be ready before the service starts', ar: 'كن مستعداً قبل بدء الصلاة' },
    items: [
      { text: { en: 'Your tonia and badrashin, clean and folded.', ar: 'تونيتك وبدرشينك، نظيفين ومطويين.' } },
      {
        text: {
          en: 'The Psalmody or this app, and know the hymns ahead of time.',
          ar: 'الإبصلمودية أو هذا التطبيق، واعرف الألحان المطلوبة مسبقاً.',
        },
      },
      { text: { en: 'A handkerchief for holding the hot censer.', ar: 'منديل لمسك الشورية الساخنة.' } },
    ],
  },
  {
    id: 'psalms',
    icon: '✧',
    title: { en: 'Psalms for Serving', ar: 'مزامير الخدمة' },
    desc: {
      en: 'What to pray from the morning of the Liturgy until you leave',
      ar: 'ما تصليه من صباح القداس حتى تخرج من الكنيسة',
    },
    items: [
      {
        title: { en: 'When you wake up', ar: 'عند الاستيقاظ' },
        text: {
          en: "Pray the Lord's Prayer and your own prayers, as your father of confession taught you. Then read Psalms 26, 46 and 121.",
          ar: 'صلِّ الصلاة الربانية وصلواتك الخاصة حسب قانونك الروحي من أب اعترافك. ثم اقرأ المزامير ٢٦ و٤٦ و١٢١.',
        },
      },
      {
        title: { en: 'On the way to church · Psalm 121, 26:4–5, 64:4', ar: 'في الطريق إلى الكنيسة · مزمور ١٢١، ٢٦: ٤–٥، ٦٤: ٤' },
        text: {
          en: 'I was glad when they said to me, "Let us go into the house of the Lord." (pray the whole psalm)\n\nOne thing I have desired of the Lord, that will I seek: that I may dwell in the house of the Lord all the days of my life, to behold the beauty of the Lord, and to inquire in His temple. For in the time of trouble He shall hide me in His pavilion; in the secret place of His tabernacle He shall hide me; He shall set me high upon a rock.\n\nBlessed is the man You choose, and cause to approach You, that he may dwell in Your courts. We shall be satisfied with the goodness of Your house, of Your holy temple.',
          ar: 'فَرِحْتُ بِالْقَائِلِينَ لِي: «إِلَى بَيْتِ الرَّبِّ نَذْهَبُ». (صلِّ المزمور كله)\n\nوَاحِدَةً سَأَلْتُ مِنَ الرَّبِّ وَإِيَّاهَا أَلْتَمِسُ: أَنْ أَسْكُنَ فِي بَيْتِ الرَّبِّ كُلَّ أَيَّامِ حَيَاتِي، لِكَيْ أَنْظُرَ إِلَى جَمَالِ الرَّبِّ، وَأَتَفَرَّسَ فِي هَيْكَلِهِ. لأَنَّهُ يُخَبِّئُنِي فِي مَظَلَّتِهِ فِي يَوْمِ الشَّرِّ. يَسْتُرُنِي بِسِتْرِ خَيْمَتِهِ. عَلَى صَخْرَةٍ يَرْفَعُنِي.\n\nطُوبَى لِلَّذِي تَخْتَارُهُ وَتُقَرِّبُهُ لِيَسْكُنَ فِي دِيَارِكَ. لَنَشْبَعَنَّ مِنْ خَيْرِ بَيْتِكَ، قُدْسِ هَيْكَلِكَ.',
        },
      },
      {
        title: { en: 'Entering the church · Psalm 5:7', ar: 'عند دخول الكنيسة · مزمور ٥: ٧' },
        text: {
          en: 'But as for me, I will come into Your house in the multitude of Your mercy; in fear of You I will worship toward Your holy temple.\n\nThen bow toward the altar and say: We worship You, O Christ, with Your Good Father and the Holy Spirit, for You have come and saved us. (In the Holy Fifty Days: for You have risen and saved us.)',
          ar: 'أَمَّا أَنَا فَبِكَثْرَةِ رَحْمَتِكَ أَدْخُلُ بَيْتَكَ. أَسْجُدُ فِي هَيْكَلِ قُدْسِكَ بِخَوْفِكَ.\n\nثم اسجد نحو الهيكل وقل: نسجد لك أيها المسيح مع أبيك الصالح والروح القدس، لأنك أتيت وخلصتنا. (وفي الخماسين: لأنك قمت وخلصتنا.)',
        },
      },
      {
        title: { en: 'Putting on the tonia · Psalm 29 and 92', ar: 'عند لبس التونية · مزمور ٢٩ و٩٢' },
        text: {
          en: 'Take the tonia to the priest to bless it. Say "I have sinned, absolve me," then kiss the cross and the priest\'s hand.\n\nWhile you put it on, stay quiet and pray Psalm 29: I will extol You, O Lord, for You have lifted me up, and have not let my foes rejoice over me…\n\nand Psalm 92: The Lord reigns, He is clothed with majesty; the Lord is clothed, He has girded Himself with strength…',
          ar: 'قدّم التونية للكاهن ليرشمها. قل «أخطأت، حاللني»، ثم قبّل الصليب ويد الكاهن.\n\nوأنت تلبسها، اصمت وصلِّ المزمور ٢٩: أُعَظِّمُكَ يَا رَبُّ لأَنَّكَ نَشَلْتَنِي وَلَمْ تُشْمِتْ بِي أَعْدَائِي…\n\nوالمزمور ٩٢: اَلرَّبُّ قَدْ مَلَكَ. لَبِسَ الْجَلاَلَ. لَبِسَ الرَّبُّ الْقُدْرَةَ، ائْتَزَرَ بِهَا…',
        },
      },
      {
        title: { en: 'Going up to the altar · Psalm 42:4 and 25:6', ar: 'عند الصعود إلى الهيكل · مزمور ٤٢: ٤ و٢٥: ٦' },
        text: {
          en: 'Then I will go to the altar of God, to God my exceeding joy; and on the harp I will praise You, O God, my God.\n\nI will wash my hands in innocence; so I will go about Your altar, O Lord.\n\nTake off your shoes and bow before you go in.',
          ar: 'فَآتِي إِلَى مَذْبَحِ اللهِ، إِلَى اللهِ بَهْجَةِ فَرَحِي، وَأَحْمَدُكَ بِالْعُودِ يَا اللهُ إِلهِي.\n\nأَغْسِلُ يَدَيَّ فِي النَّقَاوَةِ، فَأَطُوفُ بِمَذْبَحِكَ يَا رَبُّ.\n\nاخلع حذاءك واسجد قبل أن تدخل.',
        },
      },
      {
        title: { en: 'Before communion · Psalm 50', ar: 'قبل التناول · مزمور ٥٠' },
        text: {
          en: 'Create in me a clean heart, O God, and renew a steadfast spirit within me.\n\nPray all of Psalm 50 quietly if you can, asking forgiveness for your sins.',
          ar: 'قَلْبًا نَقِيًّا اخْلُقْ فِيَّ يَا اَللهُ، وَرُوحًا مُسْتَقِيمًا جَدِّدْ فِي دَاخِلِي.\n\nصلِّ المزمور الخمسين كله بهدوء إن استطعت، طالباً غفران خطاياك.',
        },
      },
      {
        title: { en: 'After communion · Psalm 115:3–4 and 33:8', ar: 'بعد التناول · مزمور ١١٥: ٣–٤ و٣٣: ٨' },
        text: {
          en: 'What shall I render to the Lord for all His benefits toward me? I will take up the cup of salvation, and call upon the name of the Lord.\n\nOh, taste and see that the Lord is good; blessed is the man who trusts in Him!',
          ar: 'مَاذَا أَرُدُّ لِلرَّبِّ مِنْ أَجْلِ كُلِّ حَسَنَاتِهِ لِي؟ كَأْسَ الْخَلاَصِ أَتَنَاوَلُ، وَبِاسْمِ الرَّبِّ أَدْعُو.\n\nذُوقُوا وَانْظُرُوا مَا أَطْيَبَ الرَّبَّ! طُوبَى لِلرَّجُلِ الْمُتَوَكِّلِ عَلَيْهِ.',
        },
      },
      {
        title: { en: 'Taking off the tonia · Psalm 46', ar: 'عند خلع التونية · مزمور ٤٦' },
        text: {
          en: 'Take it off only at the end of the Liturgy, after the final blessing, unless the priest allows you earlier.\n\nWhile you take it off, pray Psalm 46: Oh, clap your hands, all you peoples! Shout to God with the voice of triumph!…\n\nFold the tonia neatly and kiss the cross on it.',
          ar: 'لا تخلعها إلا في نهاية القداس بعد البركة الختامية، إلا إذا سمح لك الكاهن قبل ذلك.\n\nوأنت تخلعها، صلِّ المزمور ٤٦: يَا جَمِيعَ الأُمَمِ صَفِّقُوا بِالأَيَادِي. اهْتِفُوا للهِ بِصَوْتِ الابْتِهَاجِ…\n\nاطوِ التونية بعناية وقبّل الصليب الذي عليها.',
        },
      },
      {
        title: { en: 'Leaving the church · Psalm 120:8', ar: 'عند الخروج من الكنيسة · مزمور ١٢٠: ٨' },
        text: {
          en: 'The Lord shall preserve your going out and your coming in from this time forth, and even forevermore.',
          ar: 'الرَّبُّ يَحْفَظُ خُرُوجَكَ وَدُخُولَكَ مِنَ الآنَ وَإِلَى الدَّهْرِ.',
        },
      },
    ],
    note: {
      en: 'Psalm numbers follow the Agpeya, as deacons pray them. In most Bibles the number is one higher (Agpeya Psalm 29 is Psalm 30). Churches differ a little, so follow what your priest teaches.',
      ar: 'أرقام المزامير حسب الأجبية كما يصليها الشمامسة. وتختلف الكنائس قليلاً، فاتبع ما يعلّمه كاهنك.',
    },
  },
  {
    id: 'stand',
    icon: '⇄',
    title: { en: 'Where to Stand', ar: 'أين تقف' },
    desc: { en: 'The two choirs and who sings what', ar: 'الخورسان ومن يرتل ماذا' },
    items: [
      {
        text: {
          en: 'The deacons stand in two choirs, north (Bahary) and south (Qebly), and take turns singing the verses.',
          ar: 'يقف الشمامسة في خورسين، البحري (الشمال) والقبلي (الجنوب)، ويتبادلان ترتيل الأرباع.',
        },
      },
      {
        text: {
          en: 'In this app, verses marked + are sung by the other choir.',
          ar: 'في هذا التطبيق، الأرباع التي عليها علامة + يرتلها الخورس الآخر.',
        },
      },
      {
        text: {
          en: 'Which choir starts changes, so follow whoever is leading the choir.',
          ar: 'الخورس الذي يبدأ يتغير، فاتبع من يقود الخورس.',
        },
      },
    ],
  },
  {
    id: 'mistakes',
    icon: '!',
    title: { en: 'Common Mistakes', ar: 'أخطاء شائعة' },
    desc: { en: 'Small things to watch for', ar: 'أشياء صغيرة انتبه لها' },
    items: [
      {
        text: {
          en: 'Answering before the priest finishes his part.',
          ar: 'الرد قبل أن ينهي الكاهن كلامه.',
        },
      },
      {
        text: {
          en: 'Starting before the priest signals with the cross.',
          ar: 'البدء قبل أن يرشم الكاهن بالصليب.',
        },
      },
      {
        text: {
          en: 'Tilting the candle so wax drips on the books, the carpet or other people. Hold it straight up, in front of you.',
          ar: 'إمالة الشمعة فيسقط الشمع على الكتب أو السجاد أو الناس. أمسكها مستقيمة أمامك.',
        },
      },
    ],
  },
  {
    id: 'glossary',
    icon: 'Ⲁ',
    title: { en: 'Glossary', ar: 'مصطلحات' },
    desc: { en: 'Words you will hear in church', ar: 'كلمات ستسمعها في الكنيسة' },
    items: [
      { title: { en: 'Tonia', ar: 'التونية' }, text: { en: 'The white robe deacons wear.', ar: 'الثوب الأبيض الذي يلبسه الشمامسة.' } },
      {
        title: { en: 'Badrashin', ar: 'البدرشين' },
        text: { en: 'Worn over the tonia, according to rank.', ar: 'الشريط الذي يُلبس فوق التونية حسب الرتبة.' },
      },
      { title: { en: 'Shoria', ar: 'الشورية' }, text: { en: 'The censer.', ar: 'المبخرة.' } },
      { title: { en: 'Katameros', ar: 'القطمارس' }, text: { en: "The book of the day's readings.", ar: 'كتاب قراءات اليوم.' } },
      {
        title: { en: 'Agpeya', ar: 'الأجبية' },
        text: { en: 'The book of the seven daily prayers.', ar: 'كتاب صلوات السواعي السبع.' },
      },
      { title: { en: 'Psalmody', ar: 'الإبصلمودية' }, text: { en: 'The book of the Midnight Praises.', ar: 'كتاب التسبحة.' } },
      {
        title: { en: 'Doxology', ar: 'الذكصولوجية' },
        text: { en: 'A hymn of praise for a feast or a saint.', ar: 'لحن تمجيد لعيد أو لقديس.' },
      },
      {
        title: { en: 'Synaxarium', ar: 'السنكسار' },
        text: { en: 'The lives of the saints, read each day.', ar: 'سير القديسين التي تُقرأ كل يوم.' },
      },
    ],
  },
];

// ---- Quiz: every question comes from the sections above ----

export interface GuideQuestion {
  q: Bilingual;
  right: Bilingual;
  // Three of these are offered with the right answer
  wrong: Bilingual[];
}

const b = (en: string, ar: string): Bilingual => ({ en, ar });

const epsaltos = b('Epsaltos', 'أبصالتس');
const anagnostis = b('Anagnostis', 'أغنسطس');
const epideacon = b('Epideacon', 'إيبودياكون');
const deacon = b('Deacon', 'دياكون');
const archdeacon = b('Archdeacon', 'أرشيدياكون');
const glossary = {
  tonia: b('The white robe deacons wear', 'الثوب الأبيض الذي يلبسه الشمامسة'),
  badrashin: b('Worn over the tonia, according to rank', 'الشريط الذي يُلبس فوق التونية'),
  shoria: b('The censer', 'المبخرة'),
  katameros: b("The book of the day's readings", 'كتاب قراءات اليوم'),
  agpeya: b('The book of the seven daily prayers', 'كتاب صلوات السواعي السبع'),
  psalmody: b('The book of the Midnight Praises', 'كتاب التسبحة'),
  doxology: b('A hymn of praise for a feast or a saint', 'لحن تمجيد لعيد أو لقديس'),
  synaxarium: b('The lives of the saints, read each day', 'سير القديسين التي تُقرأ كل يوم'),
};

const guideQuestions: GuideQuestion[] = [
  // Ranks
  {
    q: b('Which rank sings the hymns and responses?', 'أي رتبة ترتل الألحان والمردات؟'),
    right: epsaltos,
    wrong: [anagnostis, deacon, archdeacon],
  },
  {
    q: b('Which rank reads the Epistles, the Acts and the Synaxarium?', 'أي رتبة تقرأ البولس والإبركسيس والسنكسار؟'),
    right: anagnostis,
    wrong: [epsaltos, epideacon, archdeacon],
  },
  {
    q: b('Which rank prepares the vessels, the censer and the candles?', 'أي رتبة تجهز الأواني والشورية والشموع؟'),
    right: epideacon,
    wrong: [epsaltos, anagnostis, archdeacon],
  },
  {
    q: b('Which rank says the deacon responses and serves the priest at the altar?', 'أي رتبة تقول مردات الشماس وتخدم الكاهن على المذبح؟'),
    right: deacon,
    wrong: [epsaltos, anagnostis, archdeacon],
  },
  {
    q: b('Who leads the deacons and arranges their service?', 'من يقود الشمامسة وينظم خدمتهم؟'),
    right: archdeacon,
    wrong: [epideacon, deacon, anagnostis],
  },
  {
    q: b('What is the first rank of deacons?', 'ما هي أول رتبة للشمامسة؟'),
    right: epsaltos,
    wrong: [deacon, epideacon, archdeacon],
  },
  // Serving in the altar
  {
    q: b('What do you do as you enter the altar?', 'ماذا تفعل عند دخولك الهيكل؟'),
    right: b('Take off your shoes, make the sign of the cross and bow', 'تخلع حذاءك وترشم علامة الصليب وتنحني'),
    wrong: [
      b('Touch the altar board', 'تلمس لوح المذبح'),
      b('Light the candles first', 'تشعل الشموع أولاً'),
      b('Greet the other deacons', 'تسلّم على باقي الشمامسة'),
    ],
  },
  {
    q: b('How do you move away from the altar?', 'كيف تبتعد عن المذبح؟'),
    right: b('Step aside or walk backward, never turning your back', 'تتنحى جانباً أو ترجع للخلف دون أن تعطي ظهرك'),
    wrong: [
      b('Turn around quickly', 'تستدير بسرعة'),
      b('Walk in front of the priest', 'تمر أمام الكاهن'),
      b('Lean on the altar to pass', 'تستند على المذبح لتمر'),
    ],
  },
  {
    q: b('Who touches the altar board and the holy vessels?', 'من يلمس لوح المذبح والأواني المقدسة؟'),
    right: b('Only the priest, unless he asks you to', 'الكاهن وحده، إلا إذا طلب منك'),
    wrong: [b('Any deacon', 'أي شماس'), b('Only the archdeacon', 'رئيس الشمامسة فقط'), b('The Epsaltos', 'الأبصالتس')],
  },
  {
    q: b('What do you do before putting on your badrashin?', 'ماذا تفعل قبل لبس البدرشين؟'),
    right: b("Get the bishop's or priest's blessing", 'تأخذ بركة الأب الأسقف أو الكاهن'),
    wrong: [
      b('Light the coal', 'تشعل الفحم'),
      b('Read the Synaxarium', 'تقرأ السنكسار'),
      b('Nothing, just put it on', 'لا شيء، تلبسه مباشرة'),
    ],
  },
  // Candles
  {
    q: b('When do two deacons hold candles on either side?', 'متى يمسك شماسان الشموع على الجانبين؟'),
    right: b('At the reading of the Gospel', 'عند قراءة الإنجيل'),
    wrong: [
      b('During the Synaxarium', 'أثناء السنكسار'),
      b('At the dismissal', 'عند التسريح'),
      b('Before Raising of Incense', 'قبل رفع البخور'),
    ],
  },
  {
    q: b('Who walks in front in the Procession of the Lamb?', 'من يتقدم في دورة الحمل؟'),
    right: b('A deacon with a candle', 'شماس يحمل شمعة'),
    wrong: [
      b('The Epsaltos with the Psalmody', 'الأبصالتس ومعه الإبصلمودية'),
      b('The whole choir', 'الخورس كله'),
      b('Nobody', 'لا أحد'),
    ],
  },
  // Incense
  {
    q: b('When should you light the coal?', 'متى تشعل الفحم؟'),
    right: b('Early, before Raising of Incense starts', 'مبكراً، قبل بدء رفع البخور'),
    wrong: [
      b('During the Gospel', 'أثناء الإنجيل'),
      b('After the Pauline Epistle', 'بعد البولس'),
      b('At the end of the Liturgy', 'في نهاية القداس'),
    ],
  },
  {
    q: b('When do you hand the censer to the priest?', 'متى تناول الشورية للكاهن؟'),
    right: b(
      'At the start of Raising of Incense, the Pauline Epistle and the Prayer of the Gospel',
      'في بداية رفع البخور، وعند البولس، وفي أوشية الإنجيل'
    ),
    wrong: [
      b('Only at the end of the Liturgy', 'في نهاية القداس فقط'),
      b('During the Synaxarium only', 'أثناء السنكسار فقط'),
      b('Only when the choir finishes a hymn', 'فقط عندما ينتهي الخورس من لحن'),
    ],
  },
  {
    q: b('When does the priest add incense in the Anaphora?', 'متى يضع الكاهن البخور في الأنافورا؟'),
    right: b('During the "Agios"', 'أثناء "آجيوس"'),
    wrong: [
      b('During the Synaxarium', 'أثناء السنكسار'),
      b('At the dismissal', 'عند التسريح'),
      b('Before Raising of Incense', 'قبل رفع البخور'),
    ],
  },
  // Joyful tune
  {
    q: b('Which of these uses the joyful tune?', 'أي من هذه نقول فيه اللحن الفرايحي؟'),
    right: b('The Nativity', 'عيد الميلاد'),
    wrong: [b('Palm Sunday', 'أحد الشعانين'), b('Holy Week', 'أسبوع الآلام'), b('Kiahk', 'كيهك')],
  },
  {
    q: b('Which is a minor feast of the Lord?', 'أي من هذه عيد سيدي صغير؟'),
    right: b('The Wedding at Cana', 'عرس قانا الجليل'),
    wrong: [b('The Resurrection', 'القيامة'), b('Pentecost', 'العنصرة'), b('Nayrouz', 'النيروز')],
  },
  {
    q: b('In which months is the 29th not celebrated with the joyful tune?', 'في أي شهرين لا يُحتفل بيوم ٢٩ باللحن الفرايحي؟'),
    right: b('Tobah and Amshir', 'طوبة وأمشير'),
    wrong: [b('Thout and Babah', 'توت وبابه'), b('Baramhat and Baramouda', 'برمهات وبرمودة'), b('Bashans and Paona', 'بشنس وبؤونة')],
  },
  {
    q: b('Which of these has its own tune instead of the joyful tune?', 'أي من هذه له لحنه الخاص بدل اللحن الفرايحي؟'),
    right: b('The Feast of the Cross', 'عيد الصليب'),
    wrong: [b('The Ascension', 'الصعود'), b('Theophany', 'الغطاس'), b('The Transfiguration', 'التجلي')],
  },
  {
    q: b('What does the 29th of each Coptic month remember?', 'ماذا نتذكر يوم ٢٩ من كل شهر قبطي؟'),
    right: b('The Annunciation, the Nativity and the Resurrection', 'البشارة والميلاد والقيامة'),
    wrong: [
      b('The Apostles', 'الرسل'),
      b('The Archangel Michael', 'رئيس الملائكة ميخائيل'),
      b('The Martyrs', 'الشهداء'),
    ],
  },
  // What to bring, where to stand, mistakes
  {
    q: b('What do you bring for holding the hot censer?', 'ماذا تحضر لتمسك الشورية الساخنة؟'),
    right: b('A handkerchief', 'منديل'),
    wrong: [b('The Katameros', 'القطمارس'), b('A candle', 'شمعة'), b('Your phone', 'هاتفك')],
  },
  {
    q: b('In this app, what does + before a verse mean?', 'في هذا التطبيق، ماذا تعني علامة + قبل الربع؟'),
    right: b('The other choir sings it', 'يرتله الخورس الآخر'),
    wrong: [b('The priest says it', 'يقوله الكاهن'), b('It is sung slower', 'يُرتل ببطء'), b('It is skipped on Sundays', 'يُترك يوم الأحد')],
  },
  {
    q: b('How do you know which choir starts?', 'كيف تعرف أي خورس يبدأ؟'),
    right: b('Follow whoever is leading the choir', 'تتبع من يقود الخورس'),
    wrong: [b('The north choir always starts', 'البحري يبدأ دائماً'), b('The south choir always starts', 'القبلي يبدأ دائماً'), b('Whoever is loudest', 'الأعلى صوتاً')],
  },
  {
    q: b('When do you answer the priest?', 'متى ترد على الكاهن؟'),
    right: b('After he finishes his part', 'بعد أن ينهي كلامه'),
    wrong: [b('As soon as he starts', 'بمجرد أن يبدأ'), b('Before he starts', 'قبل أن يبدأ'), b('Whenever you are ready', 'عندما تكون مستعداً')],
  },
  {
    q: b('How do you hold a candle?', 'كيف تمسك الشمعة؟'),
    right: b('Straight up, in front of you', 'مستقيمة أمامك'),
    wrong: [b('Tilted toward the book', 'مائلة نحو الكتاب'), b('Above your head', 'فوق رأسك'), b('Low by your side', 'منخفضة بجانبك')],
  },
  // Glossary
  ...(
    [
      [b('What is the Tonia?', 'ما هي التونية؟'), glossary.tonia],
      [b('What is the Badrashin?', 'ما هو البدرشين؟'), glossary.badrashin],
      [b('What is the Shoria?', 'ما هي الشورية؟'), glossary.shoria],
      [b('What is the Katameros?', 'ما هو القطمارس؟'), glossary.katameros],
      [b('What is the Agpeya?', 'ما هي الأجبية؟'), glossary.agpeya],
      [b('What is the Psalmody?', 'ما هي الإبصلمودية؟'), glossary.psalmody],
      [b('What is a Doxology?', 'ما هي الذكصولوجية؟'), glossary.doxology],
      [b('What is the Synaxarium?', 'ما هو السنكسار؟'), glossary.synaxarium],
    ] as [Bilingual, Bilingual][]
  ).map(([q, right]) => ({ q, right, wrong: Object.values(glossary).filter((g) => g !== right) })),
];

// A round of random questions from the guide
export function buildGuideQuiz(lang: 'en' | 'ar', count = 10, random: () => number = Math.random): QuizQuestion[] {
  return buildQuiz(guideQuestions, lang, count, random);
}

// A round of random questions from a list (also used by Our Faith)
export function buildQuiz(
  questions: GuideQuestion[],
  lang: 'en' | 'ar',
  count = 10,
  random: () => number = Math.random
): QuizQuestion[] {
  return shuffle(questions, random)
    .slice(0, count)
    .map((g) => makeQuestion(g.right[lang], g.wrong.map((w) => w[lang]), random, { question: g.q[lang] }));
}
