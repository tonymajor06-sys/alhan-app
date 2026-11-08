import { makeQuestion, QuizQuestion, shuffle } from './quiz';

// The Deacon's Guide: how to serve in church, in both app languages


export interface Bilingual {
  en: string;
  ar: string;
}

export interface GuideItem {
  title?: Bilingual;
  // When it is done, shown under the title
  when?: Bilingual;
  text: Bilingual;
  // Psalms prayed at this point, each shown whole when tapped
  psalms?: { number: number; part?: Bilingual }[];
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
          en: 'Only the priest touches the altar board and the holy vessels. A deacon never touches the chalice or any of them.',
          ar: 'الكاهن وحده يلمس لوح المذبح والأواني المقدسة. لا يلمس الشماس الكأس ولا أياً منها أبداً.',
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
          en: "Take off your tonia only after the Benediction, then kiss the priest's hand.",
          ar: 'لا تخلع التونية إلا بعد البركة الختامية، ثم قبّل يد الكاهن.',
        },
      },
    ],
  },
  // From Archdeacon Arsani Sidarous's instructions to deacons, as the owner forwards them (candles 2026-11-03, vestments
  // 2026-11-07), each kept short to read quickly: follow his words, and add his later ones here
  {
    id: 'vestments',
    icon: '✚',
    title: { en: 'Blessing the Tonia', ar: 'رشم التونية' },
    desc: { en: 'When to have it blessed and when to take it off', ar: 'متى تُرشم ومتى تُخلع' },
    items: [
      {
        title: { en: 'When to have it blessed', ar: 'متى تُرشم التونية' },
        text: {
          en: '• Before the Third and Sixth Hours (and Ninth).\n• After those Hours, before the priest washes his hands to start the Offering.\n• Before the Absolution of the Ministers.',
          ar: '• قبل صلاة الساعة الثالثة والسادسة (والتاسعة).\n• بعد هذه الساعات، قبل أن يغسل الكاهن يديه ليبدأ تقديم الحمل.\n• قبل تحليل الخدام.',
        },
      },
      {
        title: { en: 'Came in between those times?', ar: 'وصلت بين هذه الأوقات؟' },
        text: {
          en: 'Gather with the others who came in and wait for the next of those times.',
          ar: 'اجتمع مع من وصلوا معك وانتظروا الوقت التالي منها.',
        },
      },
      {
        title: { en: 'After the Absolution of the Ministers', ar: 'بعد تحليل الخدام' },
        text: {
          en: 'No blessing after the Absolution of the Ministers, unless you were there for the Absolution Prayer.',
          ar: 'لا تُرشم التونية بعد تحليل الخدام، إلا إذا كنت حاضراً صلاة التحليل.',
        },
      },
      {
        title: { en: 'Taking it off', ar: 'خلع التونية' },
        text: {
          en: 'Only at the end of the Liturgy, after the Benediction, unless the priest clearly allows you earlier.',
          ar: 'في نهاية القداس فقط، بعد البركة الختامية، إلا إذا سمح لك الكاهن صراحةً قبل ذلك.',
        },
      },
    ],
  },
  {
    id: 'candles',
    icon: '✦',
    title: { en: 'Lighting the Candles', ar: 'إيقاد الشموع' },
    desc: { en: 'When to light them, put them out and how to hold them', ar: 'متى توقدها ومتى تطفئها وكيف تمسكها' },
    items: [
      {
        title: { en: 'Never while kneeling', ar: 'لا توقد الشموع وأنت ساجد' },
        text: {
          en: 'The light is held high to announce to the people, so put candles out before you kneel. Light them only at these six times.',
          ar: 'النور يُرفع عالياً كإعلان للشعب، فأطفئ الشموع قبل أن تسجد. وتُوقد في هذه المواضع الستة فقط.',
        },
      },
      {
        title: { en: '1. The Selection and the Offering of the Lamb', ar: '١. اختيار الحمل وتقديمه' },
        text: {
          en: 'Until the priest pours the water into the chalice. During the Offering, only the deacons with the wine and water cruets light candles, and only the one with the wine crosses his hands.',
          ar: 'حتى يصب الكاهن الماء في الكأس. وأثناء التقديم لا يوقد الشموع إلا حاملا قارورتي الخمر والماء، ولا يُخالف يديه إلا حامل الخمر.',
        },
      },
      {
        title: { en: '2. The Holy Gospel', ar: '٢. الإنجيل المقدس' },
        text: { en: 'One candle on each side while it is read.', ar: 'شمعة على كل جانب أثناء قراءته.' },
      },
      {
        title: { en: '3. The Institution Narrative', ar: '٣. صلوات التأسيس' },
        text: {
          en: 'From its start until the people begin "Amen, Amen, Amen. Your death, O Lord…"',
          ar: 'من بدايتها حتى يبدأ الشعب: "آمين آمين آمين. بموتك يا رب…"',
        },
      },
      {
        title: { en: '4. The Fraction Prayer', ar: '٤. صلاة القسمة' },
        text: {
          en: 'From its start to its end. Not at "The Holy Body" before it: the deacons kneel then.',
          ar: 'من بدايتها حتى نهايتها. وليس عند "الجسد المقدس" قبلها، لأن الشمامسة يسجدون حينئذ.',
        },
      },
      {
        title: { en: '5. "The Holy to the holies" until the Confession', ar: '٥. من "القدسات للقديسين" حتى الاعتراف' },
        text: {
          en: 'Until the Confession begins ("Amen, Amen, Amen. I believe…"). Everyone kneels for it except the deacon saying it: he stands across the altar facing the priest, the cross in his right hand, a candle in his left, a corporal (lefafa) between them.',
          ar: 'حتى يبدأ الاعتراف ("آمين آمين آمين. أؤمن…"). ويسجد الجميع أثناءه ما عدا الشماس الذي يقوله: يقف أمام المذبح مواجهاً الكاهن، الصليب بيمينه والشمعة بيساره وبينهما لفافة.',
        },
      },
      {
        title: { en: '6. After the Confession', ar: '٦. بعد الاعتراف' },
        text: {
          en: 'A second deacon, once he has taken communion, lights a candle to guard the Holy Blood. If the priest leaves the altar to give communion, a deacon goes with him carrying a candle.',
          ar: 'يوقد شماس ثانٍ بعد أن يتناول شمعة لحراسة الدم الكريم. وإذا خرج الكاهن من الهيكل ليناول أحداً، يرافقه شماس يحمل شمعة.',
        },
      },
      {
        title: { en: 'Putting candles out', ar: 'إطفاء الشموع' },
        text: { en: 'Never blow them out, especially after communion.', ar: 'لا تطفئها بالنفخ أبداً، خاصة بعد التناول.' },
      },
      {
        title: { en: 'Holding candles still', ar: 'لا تحرك الشمعة' },
        text: {
          en: 'When the priest points to the bread and the chalice, keep your candle still. Candles are for veneration, not for pointing.',
          ar: 'عندما يشير الكاهن إلى الخبز والكأس، ثبّت شمعتك. فالشموع للتكريم وليست للإشارة.',
        },
      },
    ],
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
    id: 'psalms',
    icon: '✧',
    title: { en: 'Psalms for Serving', ar: 'مزامير الخدمة' },
    desc: {
      en: 'What to pray, and when, from the morning of the Liturgy until you leave',
      ar: 'ما تصليه ومتى، من صباح القداس حتى تخرج من الكنيسة',
    },
    items: [
      {
        title: { en: '1. When you wake up', ar: '١. عند الاستيقاظ' },
        when: { en: 'At home on the morning of the Liturgy, before you leave', ar: 'في البيت صباح القداس، قبل أن تخرج' },
        text: {
          en: "Pray the Lord's Prayer and your own prayers, as your father of confession taught you. Then pray Psalms 26, 46 and 121.",
          ar: 'صلِّ الصلاة الربانية وصلواتك الخاصة حسب قانونك الروحي من أب اعترافك. ثم صلِّ المزامير ٢٦ و٤٦ و١٢١.',
        },
        psalms: [{ number: 26 }, { number: 46 }, { number: 121 }],
      },
      {
        title: { en: '2. On the way to church', ar: '٢. في الطريق إلى الكنيسة' },
        when: { en: 'While you walk or ride to church', ar: 'وأنت في الطريق إلى الكنيسة' },
        text: {
          en: 'Pray all of Psalm 121: I was glad when they said to me, "Let us go into the house of the Lord."\n\nThen from Psalm 26: One thing I have desired of the Lord, that will I seek: that I may dwell in the house of the Lord all the days of my life, to behold the beauty of the Lord, and to inquire in His temple. For in the time of trouble He shall hide me in His pavilion; in the secret place of His tabernacle He shall hide me; He shall set me high upon a rock.\n\nAnd from Psalm 64: Blessed is the man You choose, and cause to approach You, that he may dwell in Your courts. We shall be satisfied with the goodness of Your house, of Your holy temple.',
          ar: 'صلِّ المزمور ١٢١ كله: فَرِحْتُ بِالْقَائِلِينَ لِي: «إِلَى بَيْتِ الرَّبِّ نَذْهَبُ».\n\nثم من المزمور ٢٦: وَاحِدَةً سَأَلْتُ مِنَ الرَّبِّ وَإِيَّاهَا أَلْتَمِسُ: أَنْ أَسْكُنَ فِي بَيْتِ الرَّبِّ كُلَّ أَيَّامِ حَيَاتِي، لِكَيْ أَنْظُرَ إِلَى جَمَالِ الرَّبِّ، وَأَتَفَرَّسَ فِي هَيْكَلِهِ. لأَنَّهُ يُخَبِّئُنِي فِي مَظَلَّتِهِ فِي يَوْمِ الشَّرِّ. يَسْتُرُنِي بِسِتْرِ خَيْمَتِهِ. عَلَى صَخْرَةٍ يَرْفَعُنِي.\n\nومن المزمور ٦٤: طُوبَى لِلَّذِي تَخْتَارُهُ وَتُقَرِّبُهُ لِيَسْكُنَ فِي دِيَارِكَ. لَنَشْبَعَنَّ مِنْ خَيْرِ بَيْتِكَ، قُدْسِ هَيْكَلِكَ.',
        },
        psalms: [
          { number: 121 },
          { number: 26, part: { en: 'Verses 4 and 5 are said here', ar: 'تُقال هنا الآيتان ٤ و٥' } },
          { number: 64, part: { en: 'Verse 4 is said here', ar: 'تُقال هنا الآية ٤' } },
        ],
      },
      {
        title: { en: '3. Entering the church', ar: '٣. عند دخول الكنيسة' },
        when: { en: 'At the church door, before you bow toward the altar', ar: 'عند باب الكنيسة، قبل أن تسجد نحو الهيكل' },
        text: {
          en: 'From Psalm 5: But as for me, I will come into Your house in the multitude of Your mercy; in fear of You I will worship toward Your holy temple.\n\nThen bow toward the altar and say: We worship You, O Christ, with Your Good Father and the Holy Spirit, for You have come and saved us. (In the Holy Fifty Days: for You have risen and saved us.)',
          ar: 'من المزمور ٥: أَمَّا أَنَا فَبِكَثْرَةِ رَحْمَتِكَ أَدْخُلُ بَيْتَكَ. أَسْجُدُ فِي هَيْكَلِ قُدْسِكَ بِخَوْفِكَ.\n\nثم اسجد نحو الهيكل وقل: نسجد لك أيها المسيح مع أبيك الصالح والروح القدس، لأنك أتيت وخلصتنا. (وفي الخماسين: لأنك قمت وخلصتنا.)',
        },
        psalms: [{ number: 5, part: { en: 'Verse 7 is said here', ar: 'تُقال هنا الآية ٧' } }],
      },
      {
        title: { en: '4. Putting on the tonia', ar: '٤. عند لبس التونية' },
        when: { en: 'After the priest blesses your tonia (see Blessing the Tonia for when), while you put it on', ar: 'بعد أن يرشم الكاهن تونيتك (انظر رشم التونية لمعرفة متى)، وأنت تلبسها' },
        text: {
          en: 'Take the tonia to the priest to bless it. Say "I have sinned, absolve me," then kiss the cross and the priest\'s hand.\n\nWhile you put it on, stay quiet and pray all of Psalm 29 and Psalm 92.',
          ar: 'قدّم التونية للكاهن ليرشمها. قل «أخطأت، حاللني»، ثم قبّل الصليب ويد الكاهن.\n\nوأنت تلبسها، اصمت وصلِّ المزمورين ٢٩ و٩٢ كاملين.',
        },
        psalms: [{ number: 29 }, { number: 92 }],
      },
      {
        title: { en: '5. Going up to the altar', ar: '٥. عند الصعود إلى الهيكل' },
        when: { en: 'At the altar step, as you go in to serve', ar: 'عند درجة الهيكل، وأنت داخل لتخدم' },
        text: {
          en: 'From Psalm 42: Then I will go to the altar of God, to God my exceeding joy; and on the harp I will praise You, O God, my God.\n\nFrom Psalm 25: I will wash my hands in innocence; so I will go about Your altar, O Lord.\n\nTake off your shoes and bow before you go in.',
          ar: 'من المزمور ٤٢: فَآتِي إِلَى مَذْبَحِ اللهِ، إِلَى اللهِ بَهْجَةِ فَرَحِي، وَأَحْمَدُكَ بِالْعُودِ يَا اللهُ إِلهِي.\n\nمن المزمور ٢٥: أَغْسِلُ يَدَيَّ فِي النَّقَاوَةِ، فَأَطُوفُ بِمَذْبَحِكَ يَا رَبُّ.\n\nاخلع حذاءك واسجد قبل أن تدخل.',
        },
        psalms: [
          { number: 42, part: { en: 'Verse 4 is said here', ar: 'تُقال هنا الآية ٤' } },
          { number: 25, part: { en: 'Verse 6 is said here', ar: 'تُقال هنا الآية ٦' } },
        ],
      },
      {
        title: { en: '6. Before communion', ar: '٦. قبل التناول' },
        when: { en: 'While you wait to receive the Holy Mysteries', ar: 'وأنت تنتظر التناول من الأسرار المقدسة' },
        text: {
          en: 'Pray all of Psalm 50 quietly, asking forgiveness for your sins: Have mercy upon me, O God… Create in me a clean heart, O God, and renew a steadfast spirit within me.',
          ar: 'صلِّ المزمور الخمسين كله بهدوء، طالباً غفران خطاياك: اِرْحَمْنِي يَا اَللهُ… قَلْبًا نَقِيًّا اخْلُقْ فِيَّ يَا اَللهُ، وَرُوحًا مُسْتَقِيمًا جَدِّدْ فِي دَاخِلِي.',
        },
        psalms: [{ number: 50 }],
      },
      {
        title: { en: '7. After communion', ar: '٧. بعد التناول' },
        when: { en: 'Right after you receive the Body and the Blood', ar: 'بعد أن تتناول الجسد والدم مباشرة' },
        text: {
          en: 'From Psalm 115: What shall I render to the Lord for all His benefits toward me? I will take up the cup of salvation, and call upon the name of the Lord.\n\nFrom Psalm 33: Oh, taste and see that the Lord is good; blessed is the man who trusts in Him!',
          ar: 'من المزمور ١١٥: مَاذَا أَرُدُّ لِلرَّبِّ مِنْ أَجْلِ كُلِّ حَسَنَاتِهِ لِي؟ كَأْسَ الْخَلاَصِ أَتَنَاوَلُ، وَبِاسْمِ الرَّبِّ أَدْعُو.\n\nمن المزمور ٣٣: ذُوقُوا وَانْظُرُوا مَا أَطْيَبَ الرَّبَّ! طُوبَى لِلرَّجُلِ الْمُتَوَكِّلِ عَلَيْهِ.',
        },
        psalms: [
          { number: 115, part: { en: 'Verses 3 and 4 are said here', ar: 'تُقال هنا الآيتان ٣ و٤' } },
          { number: 33, part: { en: 'Verse 8 is said here', ar: 'تُقال هنا الآية ٨' } },
        ],
      },
      {
        title: { en: '8. Taking off the tonia', ar: '٨. عند خلع التونية' },
        when: { en: 'At the end of the Liturgy, after the Benediction', ar: 'في نهاية القداس، بعد البركة الختامية' },
        text: {
          en: 'Take it off only after the Benediction, unless the priest clearly allows you earlier. While you take it off, pray all of Psalm 46: Oh, clap your hands, all you peoples!…\n\nFold the tonia neatly and kiss the cross on it.',
          ar: 'لا تخلعها إلا بعد البركة الختامية، إلا إذا سمح لك الكاهن صراحةً قبل ذلك. وأنت تخلعها، صلِّ المزمور ٤٦ كله: يَا جَمِيعَ الأُمَمِ صَفِّقُوا بِالأَيَادِي…\n\nاطوِ التونية بعناية وقبّل الصليب الذي عليها.',
        },
        psalms: [{ number: 46 }],
      },
      {
        title: { en: '9. Leaving the church', ar: '٩. عند الخروج من الكنيسة' },
        when: { en: 'As you go out of the church door', ar: 'وأنت خارج من باب الكنيسة' },
        text: {
          en: 'From Psalm 120: The Lord shall preserve your going out and your coming in from this time forth, and even forevermore.',
          ar: 'من المزمور ١٢٠: الرَّبُّ يَحْفَظُ خُرُوجَكَ وَدُخُولَكَ مِنَ الآنَ وَإِلَى الدَّهْرِ.',
        },
        psalms: [{ number: 120, part: { en: 'Verse 8 is said here', ar: 'تُقال هنا الآية ٨' } }],
      },
    ],
    note: {
      en: 'Tap a psalm to read it whole. Psalm numbers follow the Agpeya, as deacons pray them; the number in brackets is the one in most Bibles (Agpeya Psalm 29 is Psalm 30). Churches differ a little, so follow what your priest teaches.\n\nEnglish psalms: Scripture taken from the New King James Version®. Copyright © 1982 by Thomas Nelson. Used by permission. All rights reserved. Arabic psalms: the Van Dyck translation.',
      ar: 'اضغط على المزمور لتقرأه كاملاً. أرقام المزامير حسب الأجبية كما يصليها الشمامسة، والرقم بين القوسين هو رقمه في أغلب نسخ الكتاب المقدس. وتختلف الكنائس قليلاً، فاتبع ما يعلّمه كاهنك.\n\nالمزامير بالعربية من ترجمة فان دايك.',
    },
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
    right: b('Only the priest. A deacon never touches them', 'الكاهن وحده. الشماس لا يلمسها أبداً'),
    wrong: [b('Any deacon', 'أي شماس'), b('Only the archdeacon', 'رئيس الشمامسة فقط'), b('A deacon, when the priest asks him', 'الشماس، إذا طلب منه الكاهن')],
  },
  // Blessing the tonia
  {
    q: b('Which is NOT a time to have your tonia blessed?', 'أي من هذه ليس وقتاً لرشم التونية؟'),
    right: b('During the Liturgy of the Word', 'أثناء قداس الكلمة'),
    wrong: [b('Before the Third and Sixth Hours', 'قبل صلاة الساعة الثالثة والسادسة'), b('Before the priest washes his hands for the Offering', 'قبل أن يغسل الكاهن يديه للتقديم'), b('Before the Absolution of the Ministers', 'قبل تحليل الخدام')],
  },
  {
    q: b('You come in between the times for blessing the tonia. What do you do?', 'وصلت بين أوقات رشم التونية. ماذا تفعل؟'),
    right: b('Gather with the others and wait for the next time', 'تجتمع مع الآخرين وتنتظر الوقت التالي'),
    wrong: [b('Ask the priest to bless it right away', 'تطلب من الكاهن أن يرشمها فوراً'), b('Put it on without a blessing', 'تلبسها بدون رشم'), b('Go home', 'ترجع إلى البيت')],
  },
  {
    q: b('Can a deacon be blessed after the Absolution of the Ministers?', 'هل يُرشم الشماس بعد تحليل الخدام؟'),
    right: b('Only if he was there for the Absolution Prayer', 'فقط إذا كان حاضراً صلاة التحليل'),
    wrong: [b('Yes, any time', 'نعم، في أي وقت'), b('Only on feasts', 'في الأعياد فقط'), b('Only if he is an archdeacon', 'فقط إذا كان رئيس شمامسة')],
  },
  {
    q: b('When do deacons take off their tonias?', 'متى يخلع الشمامسة التونية؟'),
    right: b('After the Benediction at the end of the Liturgy', 'بعد البركة الختامية في نهاية القداس'),
    wrong: [b('Right after communion', 'بعد التناول مباشرة'), b('After the Fraction Prayer', 'بعد صلاة القسمة'), b('Whenever they are done serving', 'متى انتهوا من الخدمة')],
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
    q: b('Why are candles never lit while kneeling?', 'لماذا لا تُوقد الشموع أثناء السجود؟'),
    right: b('The light is held up high as an announcement to the people', 'لأن النور يُرفع عالياً كإعلان للشعب'),
    wrong: [
      b('The wax would drip on the floor', 'لأن الشمع يسقط على الأرض'),
      b('Only the priest may kneel with a candle', 'لأن الكاهن وحده يسجد بالشمعة'),
      b('Candles are only for feasts', 'لأن الشموع للأعياد فقط'),
    ],
  },
  {
    q: b('During the Offering of the Lamb, who lights candles?', 'أثناء تقديم الحمل، من يوقد الشموع؟'),
    right: b('Only the deacons carrying the wine and water cruets', 'الشماسان اللذان يحملان قارورتي الخمر والماء فقط'),
    wrong: [b('Every deacon in the altar', 'كل الشمامسة في الهيكل'), b('Only the archdeacon', 'رئيس الشمامسة فقط'), b('Nobody', 'لا أحد')],
  },
  {
    q: b('During the Offering, which deacon crosses his hands?', 'أثناء التقديم، أي شماس يُخالف يديه؟'),
    right: b('Only the deacon with the wine', 'الشماس الذي يحمل الخمر فقط'),
    wrong: [b('Only the deacon with the water', 'الشماس الذي يحمل الماء فقط'), b('Both deacons', 'الشماسان معاً'), b('Every deacon', 'كل الشمامسة')],
  },
  {
    q: b('Candles lit at the selection of the Lamb are kept lit until…', 'الشموع التي توقد عند اختيار الحمل تبقى حتى…'),
    right: b('The priest pours the water into the chalice', 'يصب الكاهن الماء في الكأس'),
    wrong: [b('The end of the Liturgy', 'نهاية القداس'), b('The reading of the Gospel', 'قراءة الإنجيل'), b('The Fraction Prayer', 'صلاة القسمة')],
  },
  {
    q: b('Candles lit at the Institution Narrative stay lit until…', 'الشموع التي توقد في صلوات التأسيس تبقى حتى…'),
    right: b('The people respond "Amen, Amen, Amen. Your death, O Lord…"', 'يرد الشعب "آمين آمين آمين. بموتك يا رب…"'),
    wrong: [b('The Confession', 'الاعتراف'), b('The end of the Fraction', 'نهاية القسمة'), b('Communion', 'التناول')],
  },
  {
    q: b('Why are candles not lit when the priest says "The Holy Body" before the Fraction?', 'لماذا لا توقد الشموع عندما يقول الكاهن "الجسد المقدس" قبل القسمة؟'),
    right: b('The deacons should be kneeling', 'لأن الشمامسة يكونون ساجدين'),
    wrong: [b('The Gospel is being read', 'لأن الإنجيل يُقرأ'), b('Only the priest holds a light then', 'لأن الكاهن وحده يمسك النور'), b('The candles are still lit from before', 'لأن الشموع ما زالت موقدة')],
  },
  {
    q: b('During the Confession, who stands?', 'أثناء الاعتراف، من يقف؟'),
    right: b('Only the deacon who says the Confession', 'الشماس الذي يقول الاعتراف فقط'),
    wrong: [b('Every deacon', 'كل الشمامسة'), b('The deacons holding candles', 'الشمامسة الذين يمسكون الشموع'), b('The two choirs', 'الخورسان')],
  },
  {
    q: b('What does the deacon who says the Confession hold?', 'ماذا يمسك الشماس الذي يقول الاعتراف؟'),
    right: b('The cross in his right hand, a candle in his left, a corporal in between', 'الصليب باليمنى والشمعة باليسرى وبينهما لفافة'),
    wrong: [
      b('The censer', 'الشورية'),
      b('A candle in each hand', 'شمعة في كل يد'),
      b('The cross in his left hand and the Gospel in his right', 'الصليب باليسرى والإنجيل باليمنى'),
    ],
  },
  {
    q: b('After the Confession, why does a second deacon light a candle?', 'بعد الاعتراف، لماذا يوقد شماس ثانٍ شمعة؟'),
    right: b('To guard the Holy Blood', 'لحراسة الدم الكريم'),
    wrong: [b('To read the Synaxarium', 'لقراءة السنكسار'), b('To lead a procession', 'ليتقدم دورة'), b('To light the coal', 'ليشعل الفحم')],
  },
  {
    q: b('How should a deacon put out a candle?', 'كيف يطفئ الشماس الشمعة؟'),
    right: b('Any way except blowing it out', 'بأي طريقة إلا النفخ'),
    wrong: [b('Blow it out gently', 'ينفخها برفق'), b('Leave it to burn out', 'يتركها حتى تنطفئ وحدها'), b('Blow it out after communion', 'ينفخها بعد التناول')],
  },
  {
    q: b('When the priest points to the bread and the chalice, what does the deacon do with his candle?', 'عندما يشير الكاهن إلى الخبز والكأس، ماذا يفعل الشماس بشمعته؟'),
    right: b('Holds it still: candles are for veneration, not pointing', 'يثبتها: فالشموع للتكريم وليست للإشارة'),
    wrong: [b('Points it toward them', 'يشير بها نحوهما'), b('Raises it higher', 'يرفعها أعلى'), b('Puts it out', 'يطفئها')],
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
  // Psalms for Serving: when each is said
  {
    q: b('Which psalms do you pray while putting on the tonia?', 'أي مزامير تصليها وأنت تلبس التونية؟'),
    right: b('Psalms 29 and 92', 'المزموران ٢٩ و٩٢'),
    wrong: [b('Psalm 50', 'المزمور ٥٠'), b('Psalm 120', 'المزمور ١٢٠'), b('Psalms 115 and 33', 'المزموران ١١٥ و٣٣')],
  },
  {
    q: b('When do you pray Psalm 50?', 'متى تصلي المزمور الخمسين؟'),
    right: b('Before communion', 'قبل التناول'),
    wrong: [b('While taking off the tonia', 'وأنت تخلع التونية'), b('Leaving the church', 'عند الخروج من الكنيسة'), b('On the way to church', 'في الطريق إلى الكنيسة')],
  },
  {
    q: b('When do you say "What shall I render to the Lord for all His benefits toward me?"', 'متى تقول "ماذا أرد للرب من أجل كل حسناته لي؟"'),
    right: b('Right after communion', 'بعد التناول مباشرة'),
    wrong: [b('When you wake up', 'عند الاستيقاظ'), b('Entering the church', 'عند دخول الكنيسة'), b('Putting on the tonia', 'عند لبس التونية')],
  },
  {
    q: b('When do you say "Then I will go to the altar of God, to God my exceeding joy"?', 'متى تقول "فآتي إلى مذبح الله، إلى الله بهجة فرحي"؟'),
    right: b('Going up to the altar', 'عند الصعود إلى الهيكل'),
    wrong: [b('Leaving the church', 'عند الخروج من الكنيسة'), b('After communion', 'بعد التناول'), b('When you wake up', 'عند الاستيقاظ')],
  },
  {
    q: b('When do you say "The Lord shall preserve your going out and your coming in"?', 'متى تقول "الرب يحفظ خروجك ودخولك"؟'),
    right: b('Leaving the church', 'عند الخروج من الكنيسة'),
    wrong: [b('Before communion', 'قبل التناول'), b('Putting on the tonia', 'عند لبس التونية'), b('Going up to the altar', 'عند الصعود إلى الهيكل')],
  },
  {
    q: b('Which psalm do you pray while taking off the tonia?', 'أي مزمور تصليه وأنت تخلع التونية؟'),
    right: b('Psalm 46: "Oh, clap your hands, all you peoples!"', 'المزمور ٤٦: "يا جميع الأمم صفقوا بالأيادي"'),
    wrong: [b('Psalm 50: "Have mercy upon me, O God"', 'المزمور ٥٠: "ارحمني يا الله"'), b('Psalm 92: "The Lord reigns"', 'المزمور ٩٢: "الرب قد ملك"'), b('Psalm 121: "I was glad"', 'المزمور ١٢١: "فرحت بالقائلين لي"')],
  },
  {
    q: b('When do you say "I will come into Your house in the multitude of Your mercy"?', 'متى تقول "بكثرة رحمتك أدخل بيتك"؟'),
    right: b('Entering the church', 'عند دخول الكنيسة'),
    wrong: [b('Leaving the church', 'عند الخروج من الكنيسة'), b('After communion', 'بعد التناول'), b('Taking off the tonia', 'عند خلع التونية')],
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
