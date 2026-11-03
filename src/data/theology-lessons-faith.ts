import type { Bilingual, GuideQuestion } from './deacon-guide';
import type { Lesson } from './theology-school';

// Theology School, units 1 and 2: what we believe, and the life of the Church. Written 2026-11-03 from the Holy Bible
// (NKJV and Van Dyck), the Coptic Liturgy and Agpeya, the Synaxarium, St Athanasius's "On the Incarnation", St Cyril,
// Pope Shenouda III ("The Nature of Christ", "Comparative Theology") and the dioceses' fasting calendars (suscopts.org).
// Psalms are numbered as in most Bibles, with the Agpeya's number (one lower) given too.

const b = (en: string, ar: string): Bilingual => ({ en, ar });
const q = (question: [string, string], right: [string, string], wrong: [string, string][]): GuideQuestion => ({
  q: b(...question),
  right: b(...right),
  wrong: wrong.map((w) => b(...w)),
});

export const faithLessons: Lesson[] = [
  // ---- Unit 1: What we believe ----
  {
    id: 'what-is-theology',
    unit: 'faith',
    title: b('What Is Theology?', 'ما هو اللاهوت؟'),
    hook: b(
      'Theology isn\'t only for priests and professors. If you have ever asked "Who is God, and how can I know Him?", you have already started.',
      'اللاهوت ليس للكهنة والأساتذة فقط. إن كنت قد سألت يوماً: "من هو الله، وكيف أعرفه؟" فقد بدأت بالفعل.'
    ),
    sections: [
      {
        heading: b('A word with a meaning', 'كلمة لها معنى'),
        body: b(
          'Theology comes from two Greek words: Theos, "God", and logos, "word". It means speaking about God and knowing Him. The Church gives St Gregory, whose Liturgy we pray, the title "the Theologian".',
          'كلمة "لاهوت" (ثيئولوجيا) من كلمتين يونانيتين: "ثيئوس" أي الله، و"لوغوس" أي كلمة. فهي الكلام عن الله ومعرفته. والكنيسة تلقّب القديس غريغوريوس، الذي نصلي قداسه، بـ"الثيئولوغوس" أي الناطق بالإلهيات.'
        ),
      },
      {
        heading: b('Knowing, not just knowing about', 'أن تعرفه، لا أن تعرف عنه فقط'),
        body: b(
          'In the Coptic Church, theology is not only ideas in a book. We come to know God by praying, reading the Bible, sharing in the sacraments and living in love. An old saying from the Egyptian desert puts it simply: "If you pray truly, you are a theologian."',
          'اللاهوت في الكنيسة القبطية ليس مجرد أفكار في كتاب. نحن نعرف الله بالصلاة وقراءة الكتاب المقدس والأسرار والحياة بالمحبة. وقول قديم من برية مصر يلخص ذلك: "إن صليت بالحق فأنت لاهوتي."'
        ),
      },
      {
        heading: b('Where we learn it', 'من أين نتعلمه'),
        body: b(
          'We learn theology from the Holy Bible, from Holy Tradition (the faith handed down from the apostles), from the fathers and the councils, and from the Liturgy itself. Every hymn you sing teaches it.',
          'نتعلم اللاهوت من الكتاب المقدس، ومن التقليد المقدس (الإيمان المُسلَّم من الرسل)، ومن الآباء والمجامع، ومن الليتورجيا نفسها. فكل لحن ترتله يعلّمك لاهوتاً.'
        ),
      },
    ],
    verse: {
      text: b(
        '"And this is eternal life, that they may know You, the only true God, and Jesus Christ whom You have sent."',
        '"وَهذِهِ هِيَ الْحَيَاةُ الأَبَدِيَّةُ: أَنْ يَعْرِفُوكَ أَنْتَ الإِلهَ الْحَقِيقِيَّ وَحْدَكَ وَيَسُوعَ الْمَسِيحَ الَّذِي أَرْسَلْتَهُ."'
      ),
      ref: b('John 17:3', 'يوحنا ١٧: ٣'),
    },
    know: b(
      'The Theotokia of the Midnight Praises are like a short course in theology set to music: they teach the Incarnation through pictures from the Old Testament, like the burning bush and the ark of the covenant.',
      'الثيئوطوكيات في التسبحة تشبه دراسة لاهوتية قصيرة مُلحّنة: فهي تعلّم التجسد بصور من العهد القديم، مثل العليقة المشتعلة وتابوت العهد.'
    ),
    remember: [
      b('Theology means knowing God, not just knowing about Him', 'اللاهوت هو معرفة الله، لا مجرد معلومات عنه'),
      b('We learn it from the Bible, Holy Tradition, the fathers and the Liturgy', 'نتعلمه من الكتاب المقدس والتقليد والآباء والليتورجيا'),
      b('Prayer and theology go together', 'الصلاة واللاهوت لا ينفصلان'),
    ],
    quiz: [
      q(['What does the Greek word "Theos" mean?', 'ما معنى كلمة "ثيئوس" اليونانية؟'], ['God', 'الله'], [['Word', 'كلمة'], ['Spirit', 'روح'], ['Church', 'كنيسة']]),
      q(['Which father does the Church call "the Theologian"?', 'أي أب تلقبه الكنيسة بـ"الثيئولوغوس"؟'], ['St Gregory', 'القديس غريغوريوس'], [['St Mark', 'القديس مرقس'], ['St Antony', 'الأنبا أنطونيوس'], ['St George', 'مارجرجس']]),
      q(
        ['Where do we learn theology?', 'من أين نتعلم اللاهوت؟'],
        ['From the Bible, Holy Tradition, the fathers and the Liturgy', 'من الكتاب المقدس والتقليد والآباء والليتورجيا'],
        [['Only from philosophy books', 'من كتب الفلسفة فقط'], ['Only from our own ideas', 'من أفكارنا الخاصة فقط'], ['Only from history books', 'من كتب التاريخ فقط']]
      ),
      q(
        ['Which hymns teach the Incarnation through Old Testament pictures?', 'أي ألحان تعلّم التجسد بصور من العهد القديم؟'],
        ['The Theotokia', 'الثيئوطوكيات'],
        [['The Synaxarium', 'السنكسار'], ['The Katameros readings', 'قراءات القطمارس'], ['The Agpeya psalms only', 'مزامير الأجبية فقط']]
      ),
    ],
  },
  {
    id: 'scripture-tradition',
    unit: 'faith',
    title: b('The Bible and Holy Tradition', 'الكتاب المقدس والتقليد'),
    hook: b(
      'Before the New Testament was even written down, the Church was already praying, baptizing and breaking bread. So how did the faith travel from the apostles to us?',
      'قبل أن يُكتب العهد الجديد، كانت الكنيسة تصلي وتعمّد وتكسر الخبز. فكيف وصل الإيمان من الرسل إلينا؟'
    ),
    sections: [
      {
        heading: b("God's written word", 'كلمة الله المكتوبة'),
        body: b(
          'The Holy Bible is the word of God, written by people inspired by the Holy Spirit (2 Timothy 3:16). The Old Testament prepares for Christ; the New Testament tells of His coming, His Church and His return.',
          'الكتاب المقدس هو كلمة الله، كتبه أناس مسوقون من الروح القدس (٢ تيموثاوس ٣: ١٦). العهد القديم يمهّد للمسيح، والعهد الجديد يخبر بمجيئه وكنيسته ومجيئه الثاني.'
        ),
      },
      {
        heading: b('Holy Tradition', 'التقليد المقدس'),
        body: b(
          'Holy Tradition is the life of faith handed down from the apostles: how we worship, the sacraments, the Creed and the teaching of the fathers. Scripture and Tradition don\'t compete: the Church reads the Bible within its living tradition.',
          'التقليد المقدس هو حياة الإيمان المُسلَّمة من الرسل: طريقة عبادتنا، والأسرار، وقانون الإيمان، وتعليم الآباء. والكتاب والتقليد لا يتعارضان، فالكنيسة تقرأ الكتاب المقدس داخل تقليدها الحي.'
        ),
      },
      {
        heading: b('Who chose the books?', 'من حدّد أسفار الكتاب؟'),
        body: b(
          'The Church recognised which books belong in the Bible. In AD 367, St Athanasius of Alexandria wrote his 39th Festal Letter: the earliest known list of exactly the 27 New Testament books we have today.',
          'الكنيسة هي التي ميّزت الأسفار المقدسة. ففي سنة ٣٦٧م كتب القديس أثناسيوس السكندري رسالته الفصحية التاسعة والثلاثين، وهي أقدم قائمة معروفة بأسفار العهد الجديد السبعة والعشرين التي بين أيدينا اليوم.'
        ),
      },
    ],
    verse: {
      text: b(
        '"Therefore, brethren, stand fast and hold the traditions which you were taught, whether by word or our epistle."',
        '"فَاثْبُتُوا إِذًا أَيُّهَا الإِخْوَةُ وَتَمَسَّكُوا بِالتَّعَالِيمِ الَّتِي تَعَلَّمْتُمُوهَا، سَوَاءٌ كَانَ بِالْكَلاَمِ أَمْ بِرِسَالَتِنَا."'
      ),
      ref: b('2 Thessalonians 2:15', '٢ تسالونيكي ٢: ١٥'),
    },
    know: b(
      'Each year the Pope of Alexandria sent a "Festal Letter" to the churches announcing the date of Easter. St Athanasius used his letter of 367 to list the books of the Bible.',
      'كان بابا الإسكندرية يرسل كل سنة "رسالة فصحية" إلى الكنائس يعلن فيها موعد عيد القيامة. واستخدم القديس أثناسيوس رسالة سنة ٣٦٧م ليذكر أسفار الكتاب المقدس.'
    ),
    remember: [
      b("The Bible is God's word, inspired by the Holy Spirit", 'الكتاب المقدس كلمة الله الموحى بها من الروح القدس'),
      b('Holy Tradition is the faith and life handed down from the apostles', 'التقليد المقدس هو الإيمان والحياة المُسلَّمة من الرسل'),
      b('St Athanasius gave the earliest list of the 27 New Testament books (AD 367)', 'القديس أثناسيوس قدّم أقدم قائمة بأسفار العهد الجديد الـ٢٧ (٣٦٧م)'),
    ],
    quiz: [
      q(['Who gave the earliest list of the 27 New Testament books?', 'من قدّم أقدم قائمة بأسفار العهد الجديد الـ٢٧؟'], ['St Athanasius', 'القديس أثناسيوس'], [['St Cyril', 'القديس كيرلس'], ['St Dioscorus', 'القديس ديسقوروس'], ['St Antony', 'الأنبا أنطونيوس']]),
      q(['In which year?', 'في أي سنة؟'], ['AD 367', '٣٦٧م'], [['AD 325', '٣٢٥م'], ['AD 451', '٤٥١م'], ['AD 68', '٦٨م']]),
      q(
        ['What is Holy Tradition?', 'ما هو التقليد المقدس؟'],
        ['The faith and life handed down from the apostles', 'الإيمان والحياة المُسلَّمة من الرسل'],
        [['Customs invented much later', 'عادات اختُرعت بعد ذلك بكثير'], ['Stories that disagree with the Bible', 'قصص تخالف الكتاب المقدس'], ['Only the rules of fasting', 'قوانين الصوم فقط']]
      ),
      q(['Who wrote "hold the traditions which you were taught"?', 'من كتب "تمسكوا بالتعاليم التي تعلمتموها"؟'], ['St Paul', 'القديس بولس'], [['St Peter', 'القديس بطرس'], ['St Mark', 'القديس مرقس'], ['Moses', 'موسى']]),
    ],
  },
  {
    id: 'trinity',
    unit: 'faith',
    title: b('The Holy Trinity', 'الثالوث القدوس'),
    hook: b(
      'We begin almost every prayer with "In the name of the Father, the Son and the Holy Spirit, one God." Notice: one name, not three names.',
      'نبدأ كل صلاة تقريباً بقولنا: "باسم الآب والابن والروح القدس، الإله الواحد." لاحظ: اسم واحد، لا ثلاثة أسماء.'
    ),
    sections: [
      {
        heading: b('One God', 'إله واحد'),
        body: b(
          'We believe in one God, not three gods. The Father, the Son and the Holy Spirit are three persons (hypostases) who share one divine essence. They are equal, eternal and never separated.',
          'نؤمن بإله واحد، لا بثلاثة آلهة. الآب والابن والروح القدس ثلاثة أقانيم في جوهر إلهي واحد، متساوون، أزليون، لا ينفصلون أبداً.'
        ),
      },
      {
        heading: b('Each person', 'كل أقنوم'),
        body: b(
          'The Father is born of no one. The Son is born of the Father before all ages, "Light of Light". The Holy Spirit proceeds from the Father (John 15:26). The Son and the Spirit are not created: the Father was never without His Word and His Spirit.',
          'الآب غير مولود من أحد. والابن مولود من الآب قبل كل الدهور، "نور من نور". والروح القدس منبثق من الآب (يوحنا ١٥: ٢٦). والابن والروح غير مخلوقين، فالآب لم يكن قط بغير كلمته وروحه.'
        ),
      },
      {
        heading: b('Pictures that help', 'صور تساعدنا'),
        body: b(
          'The fathers used pictures: the sun, its light and its heat are one sun; a fire, its light and its heat are one fire. Every picture falls short, because God is greater than anything He made, but they help us see how one can also be three.',
          'استخدم الآباء صوراً للتوضيح: الشمس ونورها وحرارتها شمس واحدة، والنار ونورها وحرارتها نار واحدة. وكل صورة ناقصة، لأن الله أعظم من كل خليقته، لكنها تساعدنا أن نفهم كيف يكون الواحد ثلاثة.'
        ),
      },
    ],
    verse: {
      text: b(
        '"Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit."',
        '"فَاذْهَبُوا وَتَلْمِذُوا جَمِيعَ الأُمَمِ وَعَمِّدُوهُمْ بِاسْمِ الآبِ وَالابْنِ وَالرُّوحِ الْقُدُسِ."'
      ),
      ref: b('Matthew 28:19', 'متى ٢٨: ١٩'),
    },
    know: b(
      'At Christ\'s baptism in the Jordan the whole Trinity was revealed: the Son was baptized, the Father spoke from heaven, and the Spirit came down like a dove. That is why the feast is called Theophany, "God appearing".',
      'في معمودية المسيح في الأردن ظهر الثالوث كله: الابن يعتمد، والآب يتكلم من السماء، والروح ينزل مثل حمامة. ولذلك يُسمّى العيد "الثيئوفانيا" أي الظهور الإلهي.'
    ),
    remember: [
      b('One God in three persons: Father, Son and Holy Spirit', 'إله واحد في ثلاثة أقانيم: الآب والابن والروح القدس'),
      b('The Son is born of the Father and the Spirit proceeds from the Father, eternally', 'الابن مولود من الآب والروح منبثق من الآب منذ الأزل'),
      b('We are baptized in one name: of the Father, the Son and the Holy Spirit', 'نعتمد باسم واحد: الآب والابن والروح القدس'),
    ],
    quiz: [
      q(['How many gods do Christians believe in?', 'بكم إله يؤمن المسيحيون؟'], ['One God in three persons', 'إله واحد في ثلاثة أقانيم'], [['Three gods', 'ثلاثة آلهة'], ['Two gods', 'إلهان'], ['One God who is one person only', 'إله واحد بأقنوم واحد فقط']]),
      q(['The Holy Spirit proceeds from…', 'الروح القدس منبثق من…'], ['The Father', 'الآب'], [['The Church', 'الكنيسة'], ['The angels', 'الملائكة'], ['The prophets', 'الأنبياء']]),
      q(['What was revealed at Christ\'s baptism?', 'ماذا ظهر في معمودية المسيح؟'], ['The whole Holy Trinity', 'الثالوث القدوس كله'], [['Only the angels', 'الملائكة فقط'], ['The twelve apostles', 'الرسل الاثنا عشر'], ['The burning bush', 'العليقة المشتعلة']]),
      q(['Which picture did the fathers use for the Trinity?', 'أي صورة استخدمها الآباء للثالوث؟'], ['The sun, its light and its heat', 'الشمس ونورها وحرارتها'], [['Three separate kings', 'ثلاثة ملوك منفصلين'], ['Three different suns', 'ثلاث شموس مختلفة'], ['A family of three gods', 'عائلة من ثلاثة آلهة']]),
    ],
  },
  {
    id: 'creation',
    unit: 'faith',
    title: b('Creation and the Human Person', 'الخليقة والإنسان'),
    hook: b('Of everything God made, only one creature was made "in His image". That\'s you.', 'من كل ما خلقه الله، خليقة واحدة فقط خُلقت "على صورته". إنها أنت.'),
    sections: [
      {
        heading: b('Made out of love', 'خُلقنا من المحبة'),
        body: b(
          'God did not need the world: He created it out of His goodness, from nothing, by His Word. "In the beginning God created the heavens and the earth" (Genesis 1:1), and all He made was "very good" (Genesis 1:31).',
          'الله لم يكن محتاجاً إلى العالم، لكنه خلقه من صلاحه، من العدم، بكلمته. "فِي الْبَدْءِ خَلَقَ اللهُ السَّمَاوَاتِ وَالأَرْضَ" (تكوين ١: ١)، وكل ما عمله كان "حَسَنٌ جِدًّا" (تكوين ١: ٣١).'
        ),
      },
      {
        heading: b('In His image', 'على صورته'),
        body: b(
          'God made man and woman "in His image, according to His likeness" (Genesis 1:26–27). We can think, love, choose, create and pray. Being made in God\'s image means we are made for friendship with Him.',
          'خلق الله الإنسان ذكراً وأنثى "عَلَى صُورَتِهِ... كَشَبَهِهِ" (تكوين ١: ٢٦–٢٧). فنحن نفكر ونحب ونختار ونبدع ونصلي. وأن نكون على صورة الله يعني أننا خُلقنا للشركة معه.'
        ),
      },
      {
        heading: b('Free to choose', 'أحرار في الاختيار'),
        body: b(
          'God gave us free will, because love that is forced is not love. We can turn toward God or away from Him. This gift makes us great, and it also makes us responsible.',
          'أعطانا الله حرية الإرادة، لأن المحبة المفروضة ليست محبة. نستطيع أن نتجه إلى الله أو نبتعد عنه. وهذه العطية تجعلنا عظماء، وتجعلنا أيضاً مسؤولين.'
        ),
      },
    ],
    verse: {
      text: b(
        '"So God created man in His own image; in the image of God He created him; male and female He created them."',
        '"فَخَلَقَ اللهُ الإِنْسَانَ عَلَى صُورَتِهِ. عَلَى صُورَةِ اللهِ خَلَقَهُ. ذَكَرًا وَأُنْثَى خَلَقَهُمْ."'
      ),
      ref: b('Genesis 1:27', 'تكوين ١: ٢٧'),
    },
    know: b(
      'In the Liturgy of St Gregory, the priest thanks Christ: "You created me as a man, as a Lover of mankind." The whole Liturgy is full of thanks for creation.',
      'في القداس الغريغوري يشكر الكاهن المسيح قائلاً: "خلقتني إنساناً كمحب للبشر." والقداس كله مملوء بالشكر على الخليقة.'
    ),
    remember: [
      b('God created everything from nothing, out of His goodness', 'خلق الله كل شيء من العدم بصلاحه'),
      b('Humans are made in the image of God, for friendship with Him', 'الإنسان مخلوق على صورة الله للشركة معه'),
      b('Free will lets us love God freely, and makes us responsible', 'حرية الإرادة تجعلنا نحب الله بحرية وتجعلنا مسؤولين'),
    ],
    quiz: [
      q(['From what did God create the world?', 'من أي شيء خلق الله العالم؟'], ['From nothing', 'من العدم'], [['From something that always existed', 'من مادة كانت موجودة دائماً'], ['From the angels', 'من الملائكة'], ['From Himself', 'من ذاته']]),
      q(['How did God see all that He made?', 'كيف رأى الله كل ما عمله؟'], ['Very good', 'حسن جداً'], [['Bad', 'رديء'], ['Unfinished', 'غير مكتمل'], ['Neither good nor bad', 'لا حسن ولا رديء']]),
      q(['What makes humans different from all other creatures?', 'ما الذي يميّز الإنسان عن باقي المخلوقات؟'], ['They are made in God\'s image', 'أنه مخلوق على صورة الله'], [['They are the biggest', 'أنه الأكبر حجماً'], ['They live the longest', 'أنه يعيش أطول'], ['They were made first', 'أنه خُلق أولاً']]),
      q(['Why did God give us free will?', 'لماذا أعطانا الله حرية الإرادة؟'], ['Because love that is forced is not love', 'لأن المحبة المفروضة ليست محبة'], [['So we could live without Him', 'لكي نعيش بدونه'], ['By mistake', 'بالخطأ'], ['So we would never sin', 'لكي لا نخطئ أبداً']]),
    ],
  },
  {
    id: 'fall',
    unit: 'faith',
    title: b('The Fall', 'السقوط'),
    hook: b(
      'One bite of fruit — why did it change everything? Because the real choice was not about fruit. It was about trusting God.',
      'قضمة واحدة من ثمرة، فلماذا غيّرت كل شيء؟ لأن الاختيار الحقيقي لم يكن عن الثمرة، بل عن الثقة في الله.'
    ),
    sections: [
      {
        heading: b('What happened', 'ماذا حدث'),
        body: b(
          'Adam and Eve listened to the serpent instead of God, and ate from the tree God had told them not to eat from (Genesis 3). Their sin was turning away from God, the source of life. They hid from Him, and they lost Paradise.',
          'سمع آدم وحواء للحية بدل أن يسمعا لله، وأكلا من الشجرة التي أوصاهما الله ألا يأكلا منها (تكوين ٣). كانت خطيتهما ابتعاداً عن الله مصدر الحياة. فاختبآ منه، وخسرا الفردوس.'
        ),
      },
      {
        heading: b('Sin and death', 'الخطية والموت'),
        body: b(
          'St Paul writes that through one man sin entered the world, and death through sin (Romans 5:12). Every human is born with a nature wounded by sin and subject to death. That is why the Church baptizes even infants "for the remission of sins".',
          'يكتب القديس بولس أنه بإنسان واحد دخلت الخطية إلى العالم وبالخطية الموت (رومية ٥: ١٢). وكل إنسان يولد بطبيعة جرحتها الخطية وخاضعة للموت. ولذلك تعمّد الكنيسة حتى الأطفال "لمغفرة الخطايا".'
        ),
      },
      {
        heading: b('A promise right away', 'وعد في الحال'),
        body: b(
          "God did not abandon us. Right after the fall He promised that the Seed of the woman would crush the serpent's head (Genesis 3:15). The fathers see in this the first promise of Christ, born of St Mary.",
          'لم يتركنا الله. فبعد السقوط مباشرة وعد أن نسل المرأة يسحق رأس الحية (تكوين ٣: ١٥). ويرى الآباء في هذا أول وعد بالمسيح المولود من القديسة مريم.'
        ),
      },
    ],
    verse: {
      text: b(
        '"Therefore, just as through one man sin entered the world, and death through sin, and thus death spread to all men, because all sinned."',
        '"مِنْ أَجْلِ ذلِكَ كَأَنَّمَا بِإِنْسَانٍ وَاحِدٍ دَخَلَتِ الْخَطِيَّةُ إِلَى الْعَالَمِ، وَبِالْخَطِيَّةِ الْمَوْتُ، وَهكَذَا اجْتَازَ الْمَوْتُ إِلَى جَمِيعِ النَّاسِ، إِذْ أَخْطَأَ الْجَمِيعُ."'
      ),
      ref: b('Romans 5:12', 'رومية ٥: ١٢'),
    },
    know: b(
      'Our hymns call St Mary "the salvation of our father Adam" and "the joy of Eve": what was lost through the first Adam and Eve is restored through Christ, born of the Virgin.',
      'تسمّي ألحاننا القديسة مريم "خلاص أبينا آدم" و"فرح حواء": فما خسرناه بآدم وحواء الأولين يُرد إلينا بالمسيح المولود من العذراء.'
    ),
    remember: [
      b('The fall was a turning away from God, the source of life', 'السقوط كان ابتعاداً عن الله مصدر الحياة'),
      b('Through Adam, sin and death entered the world', 'بآدم دخلت الخطية والموت إلى العالم'),
      b('God promised a Savior right away (Genesis 3:15)', 'وعد الله بالمخلّص في الحال (تكوين ٣: ١٥)'),
    ],
    quiz: [
      q(['What was the real sin of Adam and Eve?', 'ما هي حقيقة خطية آدم وحواء؟'], ['Turning away from God instead of trusting Him', 'الابتعاد عن الله وعدم الثقة فيه'], [['Being hungry', 'أنهما جاعا'], ['Naming the animals', 'تسمية الحيوانات'], ['Working in the garden', 'العمل في الجنة']]),
      q(['What entered the world through sin?', 'ماذا دخل إلى العالم بالخطية؟'], ['Death', 'الموت'], [['The Law of Moses', 'ناموس موسى'], ['The seasons', 'فصول السنة'], ['The angels', 'الملائكة']]),
      q(['Where is the first promise of a Savior?', 'أين أول وعد بالمخلّص؟'], ['Genesis 3:15', 'تكوين ٣: ١٥'], [['Exodus 20', 'خروج ٢٠'], ['Psalm 150', 'مزمور ١٥٠'], ['Revelation 22', 'رؤيا ٢٢']]),
      q(
        ['Why does the Church baptize infants?', 'لماذا تعمّد الكنيسة الأطفال؟'],
        ["For the remission of sins: every human shares Adam's wounded nature", 'لمغفرة الخطايا: فكل إنسان يشترك في طبيعة آدم المجروحة'],
        [['Only to give them a name', 'لتسميتهم فقط'], ['Because they have done many sins', 'لأنهم فعلوا خطايا كثيرة'], ['It never does', 'الكنيسة لا تعمّد الأطفال']]
      ),
    ],
  },
  {
    id: 'incarnation',
    unit: 'faith',
    title: b('Why God Became Man', 'لماذا تجسّد الله؟'),
    hook: b(
      "When a king's portrait is ruined, you don't throw away the canvas: the king himself comes back so it can be painted again. St Athanasius used this picture to explain the Incarnation.",
      'إذا تلفت صورة الملك، لا يُلقى اللوح، بل يأتي الملك نفسه لتُرسم الصورة من جديد. بهذه الصورة شرح القديس أثناسيوس التجسد.'
    ),
    sections: [
      {
        heading: b('The problem', 'المشكلة'),
        body: b(
          'After the fall, the image of God in us was spoiled and death ruled over us. We could not fix this ourselves: repentance alone could not undo death.',
          'بعد السقوط تشوّهت صورة الله فينا وملك علينا الموت. ولم نكن قادرين على إصلاح ذلك بأنفسنا، فالتوبة وحدها لا تلغي الموت.'
        ),
      },
      {
        heading: b("God's answer", 'جواب الله'),
        body: b(
          'So God the Word became man. He took flesh from the Virgin Mary by the Holy Spirit and became one of us, without ceasing to be God. As St Athanasius wrote in "On the Incarnation", He came to renew God\'s image in us and to destroy death by His death and Resurrection.',
          'فصار الله الكلمة إنساناً. أخذ جسداً من العذراء مريم بالروح القدس، وصار واحداً منا دون أن يكف عن أن يكون الله. وكما كتب القديس أثناسيوس في "تجسد الكلمة"، جاء ليجدد صورة الله فينا ويبيد الموت بموته وقيامته.'
        ),
      },
      {
        heading: b('Justice and mercy meet', 'العدل والرحمة يلتقيان'),
        body: b(
          'On the Cross God\'s justice and His mercy meet: the penalty of sin is paid, and His love is shown to the full. "Mercy and truth have met together" (Psalm 85:10; 84 in the Agpeya).',
          'على الصليب يلتقي عدل الله ورحمته: يُدفع ثمن الخطية، وتُعلن محبته كاملة. "الرَّحْمَةُ وَالْحَقُّ الْتَقَيَا" (مزمور ٨٥: ١٠، وهو ٨٤ في الأجبية).'
        ),
      },
    ],
    verse: {
      text: b(
        '"For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."',
        '"لأَنَّهُ هكَذَا أَحَبَّ اللهُ الْعَالَمَ حَتَّى بَذَلَ ابْنَهُ الْوَحِيدَ، لِكَيْ لاَ يَهْلِكَ كُلُّ مَنْ يُؤْمِنُ بِهِ، بَلْ تَكُونُ لَهُ الْحَيَاةُ الأَبَدِيَّةُ."'
      ),
      ref: b('John 3:16', 'يوحنا ٣: ١٦'),
    },
    know: b(
      'St Athanasius wrote "On the Incarnation" as a young man, before he became Pope. Some 1,700 years later it is still one of the most read books of Christian theology.',
      'كتب القديس أثناسيوس "تجسد الكلمة" وهو شاب قبل أن يصير بابا. وبعد نحو ١٧٠٠ سنة ما زال من أكثر كتب اللاهوت المسيحي قراءةً.'
    ),
    remember: [
      b('After the fall we could not undo death ourselves', 'بعد السقوط لم نكن قادرين على إلغاء الموت بأنفسنا'),
      b('God the Word became man to renew His image in us and defeat death', 'تجسد الله الكلمة ليجدد صورته فينا ويغلب الموت'),
      b("On the Cross God's justice and mercy meet", 'على الصليب يلتقي عدل الله ورحمته'),
    ],
    quiz: [
      q(['Who wrote "On the Incarnation"?', 'من كتب "تجسد الكلمة"؟'], ['St Athanasius', 'القديس أثناسيوس'], [['St Cyril', 'القديس كيرلس'], ['St Antony', 'الأنبا أنطونيوس'], ['St Mark', 'القديس مرقس']]),
      q(['What picture did St Athanasius use?', 'أي صورة استخدمها القديس أثناسيوس؟'], ['A spoiled portrait painted again with the king present', 'صورة ملك تلفت فأُعيد رسمها بحضوره'], [['A broken ship', 'سفينة مكسورة'], ['A lost coin', 'درهم مفقود'], ['A burning bush', 'عليقة مشتعلة']]),
      q(['From whom did the Word take flesh?', 'ممن أخذ الكلمة جسداً؟'], ['The Virgin Mary, by the Holy Spirit', 'من العذراء مريم بالروح القدس'], [['From the angels', 'من الملائكة'], ["From Adam's dust directly", 'من تراب آدم مباشرة'], ['From no one: He only seemed human', 'من لا أحد: كان يبدو إنساناً فقط']]),
      q(['What meets on the Cross?', 'ماذا يلتقي على الصليب؟'], ["God's justice and His mercy", 'عدل الله ورحمته'], [['Heaven and Hades', 'السماء والجحيم'], ['Anger and revenge', 'الغضب والانتقام'], ['East and West', 'الشرق والغرب']]),
    ],
  },
  {
    id: 'one-nature',
    unit: 'faith',
    title: b('One Nature of God the Word Incarnate', 'طبيعة واحدة لله الكلمة المتجسد'),
    hook: b(
      'Just before Communion the Church confesses aloud that Christ\'s divinity "parted not from His humanity for a single moment nor the twinkling of an eye." Why say it so firmly?',
      'قبل التناول تعترف الكنيسة بصوت عالٍ أن لاهوت المسيح "لم يفارق ناسوته لحظة واحدة ولا طرفة عين." فلماذا هذا الإصرار؟'
    ),
    sections: [
      {
        heading: b('One Christ', 'مسيح واحد'),
        body: b(
          'Christ is not two persons, a God and a man side by side. He is one: God the Word who became flesh. St Cyril the Great, Pillar of Faith, taught "one nature of God the Word incarnate": His divinity and His humanity truly united in one.',
          'المسيح ليس شخصين، إلهاً وإنساناً متجاورين، بل هو واحد: الله الكلمة الذي صار جسداً. وقد علّم القديس كيرلس الكبير عمود الدين "طبيعة واحدة لله الكلمة المتجسد": لاهوته وناسوته متحدان حقاً في واحد.'
        ),
      },
      {
        heading: b('Without mixing', 'بغير اختلاط'),
        body: b(
          'This union is "without mingling, without confusion and without alteration", as the Confession in the Liturgy says. His divinity did not turn into humanity, and His humanity was not swallowed up. He is perfect God and perfect man.',
          'وهذا الاتحاد "بغير اختلاط ولا امتزاج ولا تغيير" كما نقول في الاعتراف في القداس. فلاهوته لم يتحول إلى ناسوت، وناسوته لم يذب في لاهوته. هو إله كامل وإنسان كامل.'
        ),
      },
      {
        heading: b('Why it matters', 'لماذا يهمنا هذا'),
        body: b(
          'Because He is one, everything He did, God did. The One born of St Mary is God, so she is the Mother of God. The One who died on the Cross is "the Lord of glory" (1 Corinthians 2:8), so His death has power to save the whole world.',
          'لأنه واحد، فكل ما عمله عمله الله. المولود من القديسة مريم هو الله، فهي والدة الإله. والذي مات على الصليب هو "رب المجد" (١ كورنثوس ٢: ٨)، فلموته قوة لخلاص العالم كله.'
        ),
      },
    ],
    verse: {
      text: b('"And the Word became flesh and dwelt among us, and we beheld His glory."', '"وَالْكَلِمَةُ صَارَ جَسَدًا وَحَلَّ بَيْنَنَا، وَرَأَيْنَا مَجْدَهُ."'),
      ref: b('John 1:14', 'يوحنا ١: ١٤'),
    },
    know: b(
      'Pope Shenouda III explained the union with the picture of iron in a fire: the glowing iron has the fire\'s heat and light, yet the iron stays iron and the fire stays fire, and you cannot separate them.',
      'شرح البابا شنوده الثالث الاتحاد بصورة الحديد المحمى بالنار: فالحديد المتوهج فيه حرارة النار ونورها، ومع ذلك يبقى الحديد حديداً والنار ناراً، ولا يمكن الفصل بينهما.'
    ),
    remember: [
      b('Christ is one: God the Word who became flesh', 'المسيح واحد: الله الكلمة الذي صار جسداً'),
      b('His divinity and humanity are united without mingling, confusion or alteration', 'لاهوته وناسوته متحدان بغير اختلاط ولا امتزاج ولا تغيير'),
      b('Because He is one, St Mary is truly the Mother of God', 'لأنه واحد، فالقديسة مريم بالحقيقة والدة الإله'),
    ],
    quiz: [
      q(['Who taught "one nature of God the Word incarnate"?', 'من علّم "طبيعة واحدة لله الكلمة المتجسد"؟'], ['St Cyril the Great', 'القديس كيرلس الكبير'], [['Nestorius', 'نسطور'], ['Arius', 'آريوس'], ['Eutyches', 'أوطاخي']]),
      q(['How are Christ\'s divinity and humanity united?', 'كيف اتحد لاهوت المسيح بناسوته؟'], ['Without mingling, confusion or alteration', 'بغير اختلاط ولا امتزاج ولا تغيير'], [['Side by side, as two persons', 'متجاورين كشخصين'], ['His humanity was swallowed up', 'ذاب ناسوته'], ['Only for a while', 'لفترة فقط']]),
      q(['What picture did Pope Shenouda III use for the union?', 'أي صورة استخدمها البابا شنوده الثالث للاتحاد؟'], ['Iron in a fire', 'الحديد المحمى بالنار'], [['Oil and water', 'الزيت والماء'], ['Two houses side by side', 'بيتان متجاوران'], ['Two drinks mixed in a cup', 'مشروبان ممتزجان في كأس']]),
      q(['Why is St Mary truly the Mother of God?', 'لماذا القديسة مريم بالحقيقة والدة الإله؟'], ['Because the One born of her is God the Word incarnate', 'لأن المولود منها هو الله الكلمة المتجسد'], [['Because she is older than the angels', 'لأنها أقدم من الملائكة'], ['Because she was a queen', 'لأنها كانت ملكة'], ['Because a council chose her', 'لأن مجمعاً اختارها']]),
    ],
  },
  {
    id: 'cross-resurrection',
    unit: 'faith',
    title: b('The Cross and the Resurrection', 'الصليب والقيامة'),
    hook: b(
      'For the Romans the cross was a shameful way to execute criminals. For Christians it became the sign we make on ourselves every day. What changed?',
      'كان الصليب عند الرومان وسيلة مُخزية لإعدام المجرمين، وصار عند المسيحيين العلامة التي نرشمها على أنفسنا كل يوم. فما الذي تغيّر؟'
    ),
    sections: [
      {
        heading: b('Love to the end', 'محبة إلى المنتهى'),
        body: b(
          'Christ went to the Cross freely. He was not defeated: "No one takes it from Me, but I lay it down of Myself" (John 10:18). On the Cross He carried our sins and paid the debt we could not pay.',
          'ذهب المسيح إلى الصليب بإرادته، ولم يكن مهزوماً: "لَيْسَ أَحَدٌ يَأْخُذُهَا مِنِّي، بَلْ أَضَعُهَا أَنَا مِنْ ذَاتِي" (يوحنا ١٠: ١٨). على الصليب حمل خطايانا ووفى الدين الذي عجزنا عن وفائه.'
        ),
      },
      {
        heading: b('Death destroyed', 'الموت مهزوم'),
        body: b(
          'On the third day He rose from the dead, "trampling down death by death", as we sing in the Paschal hymn. Death could not hold Him, because He is the Life, and His Resurrection is the promise of ours.',
          'وفي اليوم الثالث قام من الأموات، "وداس الموت بالموت" كما نرتل في لحن القيامة. لم يقدر الموت أن يمسكه لأنه هو الحياة، وقيامته عربون قيامتنا.'
        ),
      },
      {
        heading: b('The Cross in our life', 'الصليب في حياتنا'),
        body: b(
          'We sign ourselves with the cross, we honour it, and we carry our own crosses with Christ. The Church celebrates the Feast of the Cross twice a year: on 17 Tout and 10 Baramhat.',
          'نرشم أنفسنا بعلامة الصليب، ونكرّمه، ونحمل صلباننا مع المسيح. وتحتفل الكنيسة بعيد الصليب مرتين في السنة: ١٧ توت و١٠ برمهات.'
        ),
      },
    ],
    verse: {
      text: b(
        '"For the message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God."',
        '"فَإِنَّ كَلِمَةَ الصَّلِيبِ عِنْدَ الْهَالِكِينَ جَهَالَةٌ، وَأَمَّا عِنْدَنَا نَحْنُ الْمُخَلَّصِينَ فَهِيَ قُوَّةُ اللهِ."'
      ),
      ref: b('1 Corinthians 1:18', '١ كورنثوس ١: ١٨'),
    },
    know: b(
      'In the Holy Fifty Days after the Resurrection the Church does not fast and does not make prostrations (metanias), because it is a time of pure joy.',
      'في الخماسين المقدسة بعد القيامة لا تصوم الكنيسة ولا تُعمل فيها المطانيات، لأنها زمن فرح خالص.'
    ),
    remember: [
      b('Christ went to the Cross freely, out of love', 'ذهب المسيح إلى الصليب بإرادته ومن أجل محبته'),
      b('By His Resurrection He trampled down death', 'بقيامته داس الموت'),
      b('The Feast of the Cross is on 17 Tout and 10 Baramhat', 'عيد الصليب في ١٧ توت و١٠ برمهات'),
    ],
    quiz: [
      q(['Did Christ die against His will?', 'هل مات المسيح رغماً عنه؟'], ['No, He laid down His life freely', 'لا، بل وضع نفسه بإرادته'], [['Yes, He was defeated', 'نعم، لقد هُزم'], ['He did not really die', 'لم يمت حقاً'], ['Only His divinity died', 'لاهوته فقط هو الذي مات']]),
      q(['"Trampling down death by death" is sung about…', '"داس الموت بالموت" نرتلها عن…'], ['The Resurrection', 'القيامة'], [['The Nativity', 'الميلاد'], ['Pentecost', 'العنصرة'], ['The Annunciation', 'البشارة']]),
      q(['When is the Feast of the Cross?', 'متى عيد الصليب؟'], ['17 Tout and 10 Baramhat', '١٧ توت و١٠ برمهات'], [['29 Kiahk', '٢٩ كيهك'], ['1 Tout only', '١ توت فقط'], ['11 Tubah', '١١ طوبه']]),
      q(['Why are there no prostrations in the Holy Fifty Days?', 'لماذا لا مطانيات في الخماسين المقدسة؟'], ['It is a time of joy in the Resurrection', 'لأنها زمن فرح بالقيامة'], [['Because it is summer', 'لأنه صيف'], ['Because of the Apostles\' fast', 'بسبب صوم الرسل'], ['There are more of them then', 'بل تكثر فيها المطانيات']]),
    ],
  },
  {
    id: 'holy-spirit-church',
    unit: 'faith',
    title: b('The Holy Spirit and the Church', 'الروح القدس والكنيسة'),
    hook: b(
      'Fifty days after the Resurrection, a few frightened disciples became fearless preachers in one morning. What happened?',
      'بعد خمسين يوماً من القيامة، صار بضعة تلاميذ خائفين كارزين بلا خوف في صباح واحد. فماذا حدث؟'
    ),
    sections: [
      {
        heading: b('Pentecost', 'يوم الخمسين'),
        body: b(
          'On the day of Pentecost the Holy Spirit came down on the apostles as tongues of fire (Acts 2). St Peter preached, and about three thousand people were baptized that day. It is the birthday of the Church.',
          'في يوم الخمسين حلّ الروح القدس على الرسل بألسنة كأنها من نار (أعمال ٢). ووعظ القديس بطرس، فاعتمد في ذلك اليوم نحو ثلاثة آلاف نفس. إنه يوم ميلاد الكنيسة.'
        ),
      },
      {
        heading: b('Who the Spirit is', 'من هو الروح القدس'),
        body: b(
          'The Holy Spirit is not a force: He is God, the third person of the Trinity, "the Lord, the Giver of Life, who proceeds from the Father," as the Creed says. He spoke through the prophets, and today He works in every sacrament.',
          'الروح القدس ليس مجرد قوة، بل هو الله، الأقنوم الثالث في الثالوث، "الرب المحيي المنبثق من الآب" كما نقول في قانون الإيمان. تكلم في الأنبياء، ويعمل اليوم في كل سر من الأسرار.'
        ),
      },
      {
        heading: b('One, holy, catholic, apostolic', 'واحدة مقدسة جامعة رسولية'),
        body: b(
          'In the Creed we confess "one, holy, catholic and apostolic Church". One, because Christ has one body. Holy, because He makes it holy. Catholic means universal: for every people and every age. Apostolic, because it keeps the faith of the apostles, handed down through their successors, the bishops.',
          'في قانون الإيمان نعترف "بكنيسة واحدة مقدسة جامعة رسولية". واحدة لأن للمسيح جسداً واحداً، ومقدسة لأنه يقدّسها، وجامعة أي لكل الشعوب وكل العصور، ورسولية لأنها تحفظ إيمان الرسل المُسلَّم عبر خلفائهم الأساقفة.'
        ),
      },
    ],
    verse: {
      text: b(
        '"And they were all filled with the Holy Spirit and began to speak with other tongues, as the Spirit gave them utterance."',
        '"وَامْتَلأَ الْجَمِيعُ مِنَ الرُّوحِ الْقُدُسِ، وَابْتَدَأُوا يَتَكَلَّمُونَ بِأَلْسِنَةٍ أُخْرَى كَمَا أَعْطَاهُمُ الرُّوحُ أَنْ يَنْطِقُوا."'
      ),
      ref: b('Acts 2:4', 'أعمال ٢: ٤'),
    },
    know: b(
      'In the Agpeya, the Third Hour remembers the coming of the Holy Spirit, because He came down at the third hour of the day (Acts 2:15).',
      'في الأجبية نتذكر حلول الروح القدس في صلاة الساعة الثالثة، لأنه حلّ في الساعة الثالثة من النهار (أعمال ٢: ١٥).'
    ),
    remember: [
      b('Pentecost is the birthday of the Church', 'يوم الخمسين هو يوم ميلاد الكنيسة'),
      b('The Holy Spirit is God, the Lord, the Giver of Life', 'الروح القدس هو الله، الرب المحيي'),
      b('The Church is one, holy, catholic and apostolic', 'الكنيسة واحدة مقدسة جامعة رسولية'),
    ],
    quiz: [
      q(['What happened on the day of Pentecost?', 'ماذا حدث في يوم الخمسين؟'], ['The Holy Spirit came down on the apostles', 'حلّ الروح القدس على الرسل'], [['Christ was born', 'وُلد المسيح'], ['Christ ascended', 'صعد المسيح'], ['The Council of Nicaea met', 'انعقد مجمع نيقية']]),
      q(['About how many were baptized that day?', 'كم نفساً اعتمدت في ذلك اليوم تقريباً؟'], ['About three thousand', 'نحو ثلاثة آلاف'], [['Twelve', 'اثنا عشر'], ['Seventy', 'سبعون'], ['Five hundred', 'خمسمائة']]),
      q(['What does "catholic" mean in the Creed?', 'ما معنى "جامعة" في قانون الإيمان؟'], ['Universal: for every people and age', 'لكل الشعوب وكل العصور'], [['Roman', 'رومانية'], ['Only for priests', 'للكهنة فقط'], ['Only for Egypt', 'لمصر فقط']]),
      q(['Which Agpeya hour remembers the coming of the Holy Spirit?', 'أي ساعة في الأجبية نتذكر فيها حلول الروح القدس؟'], ['The Third Hour', 'الساعة الثالثة'], [['The Sixth Hour', 'الساعة السادسة'], ['The Ninth Hour', 'الساعة التاسعة'], ['Midnight', 'نصف الليل']]),
    ],
  },
  {
    id: 'theotokos',
    unit: 'faith',
    title: b('St Mary the Theotokos', 'القديسة مريم والدة الإله'),
    hook: b(
      'The Coptic Church sings to St Mary more than to any other saint: a whole month, Kiahk, is filled with her praises. Why does she have such a place?',
      'تسبّح الكنيسة القبطية القديسة مريم أكثر من أي قديس آخر، حتى إن شهراً كاملاً، كيهك، مملوء بتماجيدها. فلماذا هذه المكانة؟'
    ),
    sections: [
      {
        heading: b('Mother of God', 'والدة الإله'),
        body: b(
          'Because her Son is God the Word made flesh, St Mary is truly the Theotokos, the Mother of God. The Council of Ephesus (AD 431) defended this title against Nestorius. The title is really about Christ: the One she bore is God.',
          'لأن ابنها هو الله الكلمة المتجسد، فالقديسة مريم بالحقيقة "ثيئوطوكوس" أي والدة الإله. ودافع مجمع أفسس (٤٣١م) عن هذا اللقب ضد نسطور. واللقب في حقيقته إعلان عن المسيح: فالذي ولدته هو الله.'
        ),
      },
      {
        heading: b('Ever-virgin', 'الدائمة البتولية'),
        body: b(
          'The Church believes St Mary remained a virgin before, during and after the birth of Christ. Ezekiel saw a gate that "shall be shut... because the Lord God of Israel has entered by it" (Ezekiel 44:2), and our hymns see this gate as St Mary.',
          'تؤمن الكنيسة أن القديسة مريم بقيت عذراء قبل الميلاد وفيه وبعده. ورأى حزقيال باباً "يَكُونُ مُغْلَقًا... لأَنَّ الرَّبَّ إِلهَ إِسْرَائِيلَ دَخَلَ مِنْهُ" (حزقيال ٤٤: ٢)، وألحاننا ترى في هذا الباب القديسة مريم.'
        ),
      },
      {
        heading: b('Our mother too', 'أمنا أيضاً'),
        body: b(
          'On the Cross Christ gave her to St John: "Behold your mother" (John 19:27). She intercedes for us, and we honour her above all saints, while we worship God alone.',
          'على الصليب أعطاها المسيح ليوحنا قائلاً: "هُوَذَا أُمُّكَ" (يوحنا ١٩: ٢٧). وهي تشفع فينا، ونكرّمها فوق جميع القديسين، بينما نعبد الله وحده.'
        ),
      },
    ],
    verse: { text: b('"For behold, henceforth all generations will call me blessed."', '"فَهُوَذَا مُنْذُ الآنَ جَمِيعُ الأَجْيَالِ تُطَوِّبُنِي."'), ref: b('Luke 1:48', 'لوقا ١: ٤٨') },
    know: b(
      'The Theotokia compare St Mary to the ark of the covenant, the golden censer, the lampstand and the bush that burned but was not consumed: Old Testament pictures of God dwelling with His people.',
      'تشبّه الثيئوطوكيات القديسة مريم بتابوت العهد والمجمرة الذهب والمنارة والعليقة التي اشتعلت ولم تحترق: صور من العهد القديم لسكنى الله مع شعبه.'
    ),
    remember: [
      b('St Mary is the Theotokos, because her Son is God', 'القديسة مريم والدة الإله لأن ابنها هو الله'),
      b('She is ever-virgin, the gate Ezekiel saw shut', 'هي الدائمة البتولية، الباب المغلق الذي رآه حزقيال'),
      b('We honour her and ask her intercession; we worship God alone', 'نكرّمها ونطلب شفاعتها، ونعبد الله وحده'),
    ],
    quiz: [
      q(['Which council defended the title Theotokos?', 'أي مجمع دافع عن لقب والدة الإله؟'], ['Ephesus', 'أفسس'], [['Nicaea', 'نيقية'], ['Constantinople', 'القسطنطينية'], ['Chalcedon', 'خلقيدونية']]),
      q(['Which prophet saw a gate that stayed shut after the Lord entered?', 'أي نبي رأى باباً بقي مغلقاً بعد أن دخل منه الرب؟'], ['Ezekiel', 'حزقيال'], [['Isaiah', 'إشعياء'], ['Jonah', 'يونان'], ['Daniel', 'دانيال']]),
      q(['To whom did Christ say "Behold your mother"?', 'لمن قال المسيح "هوذا أمك"؟'], ['St John', 'القديس يوحنا'], [['St Peter', 'القديس بطرس'], ['St Joseph', 'القديس يوسف'], ['St Mark', 'القديس مرقس']]),
      q(['Which Coptic month is filled with praises to St Mary?', 'أي شهر قبطي مملوء بتماجيد القديسة مريم؟'], ['Kiahk', 'كيهك'], [['Tout', 'توت'], ['Amshir', 'أمشير'], ['Baramoudah', 'برموده']]),
    ],
  },
  {
    id: 'saints',
    unit: 'faith',
    title: b('The Saints and Their Intercession', 'القديسون وشفاعتهم'),
    hook: b(
      "When you ask a friend to pray for you, you aren't replacing God: you are being part of a family. The saints are part of that family too, only they are already home.",
      'عندما تطلب من صديق أن يصلي لأجلك، فأنت لا تستبدل الله، بل تعيش كعضو في عائلة. والقديسون جزء من هذه العائلة، لكنهم سبقونا إلى البيت.'
    ),
    sections: [
      {
        heading: b('Alive in Christ', 'أحياء في المسيح'),
        body: b(
          'God "is not the God of the dead but of the living, for all live to Him" (Luke 20:38). The saints who have departed are alive with Christ. Hebrews calls them "so great a cloud of witnesses" around us (Hebrews 12:1).',
          'الله "لَيْسَ هُوَ إِلهَ أَمْوَاتٍ بَلْ إِلهُ أَحْيَاءٍ، لأَنَّ الْجَمِيعَ عِنْدَهُ أَحْيَاءٌ" (لوقا ٢٠: ٣٨). فالقديسون الراقدون أحياء مع المسيح، ويسمّيهم سفر العبرانيين "سَحَابَةٌ مِنَ الشُّهُودِ" تحيط بنا (عبرانيين ١٢: ١).'
        ),
      },
      {
        heading: b('They pray for us', 'يصلّون لأجلنا'),
        body: b(
          'In Revelation the elders hold "golden bowls full of incense, which are the prayers of the saints" (Revelation 5:8). When we ask a saint to pray for us, we ask them to bring our prayers to Christ with theirs. Only God saves; the saints pray.',
          'في سفر الرؤيا يحمل الشيوخ "جَامَاتٌ مِنْ ذَهَبٍ مَمْلُوَّةٌ بَخُورًا هِيَ صَلَوَاتُ الْقِدِّيسِينَ" (رؤيا ٥: ٨). وعندما نطلب شفاعة قديس، نطلب أن يقدّم صلواتنا مع صلواته للمسيح. الله وحده يخلّص، والقديسون يصلّون.'
        ),
      },
      {
        heading: b('In the Liturgy', 'في القداس'),
        body: b(
          'In every Liturgy the Church remembers the saints in the Commemoration, beginning with St Mary and St John the Baptist, then the apostles, martyrs and fathers. And every day the Synaxarium tells the life of a saint.',
          'في كل قداس تذكر الكنيسة القديسين في المجمع، بدءاً بالقديسة مريم والقديس يوحنا المعمدان، ثم الرسل والشهداء والآباء. وكل يوم يحكي السنكسار سيرة قديس.'
        ),
      },
    ],
    verse: {
      text: b(
        '"Therefore we also, since we are surrounded by so great a cloud of witnesses, let us lay aside every weight... and let us run with endurance the race that is set before us."',
        '"لِذلِكَ نَحْنُ أَيْضًا إِذْ لَنَا سَحَابَةٌ مِنَ الشُّهُودِ مِقْدَارُ هذِهِ مُحِيطَةٌ بِنَا، لِنَطْرَحْ كُلَّ ثِقْل... وَلْنُحَاضِرْ بِالصَّبْرِ فِي الْجِهَادِ الْمَوْضُوعِ أَمَامَنَا."'
      ),
      ref: b('Hebrews 12:1', 'عبرانيين ١٢: ١'),
    },
    know: b(
      'The Synaxarium is read in the Liturgy right after the Acts of the Apostles (the Praxis): the story of the apostles continues in the lives of the saints.',
      'يُقرأ السنكسار في القداس بعد سفر أعمال الرسل (الإبركسيس) مباشرة: فقصة الرسل مستمرة في سير القديسين.'
    ),
    remember: [
      b('The saints are alive in Christ', 'القديسون أحياء في المسيح'),
      b('They pray for us, as Revelation shows', 'هم يصلّون لأجلنا كما يُظهر سفر الرؤيا'),
      b('Only God saves; we honour the saints and worship God alone', 'الله وحده يخلّص؛ نكرّم القديسين ونعبد الله وحده'),
    ],
    quiz: [
      q(['Hebrews calls the saints a great…', 'يسمّي سفر العبرانيين القديسين…'], ['Cloud of witnesses', 'سحابة من الشهود'], [['Army of kings', 'جيشاً من الملوك'], ['Wall of stones', 'سوراً من الحجارة'], ['Crowd of strangers', 'جمعاً من الغرباء']]),
      q(['In Revelation 5:8 the golden bowls of incense are…', 'في رؤيا ٥: ٨، جامات البخور الذهبية هي…'], ['The prayers of the saints', 'صلوات القديسين'], [['The gold of Egypt', 'ذهب مصر'], ['The gifts of the Magi', 'هدايا المجوس'], ['The oil of the lamps', 'زيت المصابيح']]),
      q(['When is the Synaxarium read in the Liturgy?', 'متى يُقرأ السنكسار في القداس؟'], ['After the Acts (Praxis)', 'بعد الإبركسيس'], [['After the Gospel', 'بعد الإنجيل'], ['After communion', 'بعد التناول'], ['Before the Creed', 'قبل قانون الإيمان']]),
      q(['Who saves us?', 'من يخلّصنا؟'], ['God alone; the saints pray for us', 'الله وحده، والقديسون يصلّون لأجلنا'], [['The saints', 'القديسون'], ['Our own works alone', 'أعمالنا وحدها'], ['The angels', 'الملائكة']]),
    ],
  },
  {
    id: 'last-things',
    unit: 'faith',
    title: b('The Last Things', 'الأمور الأخيرة'),
    hook: b(
      'Every time we pray the Creed we end by looking ahead: "We look for the resurrection of the dead and the life of the coming age." Christians are people with a future.',
      'كلما صلّينا قانون الإيمان نختمه بالنظر إلى الأمام: "وننتظر قيامة الأموات وحياة الدهر الآتي." المسيحيون شعب له مستقبل.'
    ),
    sections: [
      {
        heading: b('He will come again', 'سيأتي ثانية'),
        body: b(
          'Christ ascended into heaven and "is coming again in His glory to judge the living and the dead." No one knows the day or the hour (Matthew 24:36), so we live ready, like the wise virgins with oil in their lamps.',
          'صعد المسيح إلى السماوات، "وأيضاً يأتي في مجده ليدين الأحياء والأموات." ولا أحد يعرف اليوم ولا الساعة (متى ٢٤: ٣٦)، فنعيش مستعدين كالعذارى الحكيمات اللواتي معهن زيت في مصابيحهن.'
        ),
      },
      {
        heading: b('Resurrection and judgment', 'القيامة والدينونة'),
        body: b(
          'When He comes, the dead will rise with their bodies, changed and incorruptible (1 Corinthians 15:52). Christ will judge with justice and mercy; in Matthew 25 He judges by how we loved "the least of these My brethren".',
          'عند مجيئه يقوم الأموات بأجسادهم متغيّرين وعديمي الفساد (١ كورنثوس ١٥: ٥٢). ويدين المسيح بالعدل والرحمة، وفي متى ٢٥ يدين بحسب محبتنا "لأَحَدِ إِخْوَتِي هؤُلاَءِ الأَصَاغِرِ".'
        ),
      },
      {
        heading: b('Praying for the departed', 'الصلاة من أجل الراقدين'),
        body: b(
          'In every Liturgy the Church prays for the departed, asking God to give them rest "in the bosom of our holy fathers Abraham, Isaac and Jacob." They are alive, waiting with us for the resurrection.',
          'في كل قداس تصلي الكنيسة من أجل الراقدين، طالبة أن ينيّحهم الله "في أحضان آبائنا القديسين إبراهيم وإسحق ويعقوب." فهم أحياء ينتظرون القيامة معنا.'
        ),
      },
    ],
    verse: {
      text: b(
        '"Assuredly, I say to you, inasmuch as you did it to one of the least of these My brethren, you did it to Me."',
        '"الْحَقَّ أَقُولُ لَكُمْ: بِمَا أَنَّكُمْ فَعَلْتُمُوهُ بِأَحَدِ إِخْوَتِي هؤُلاَءِ الأَصَاغِرِ، فَبِي فَعَلْتُمْ."'
      ),
      ref: b('Matthew 25:40', 'متى ٢٥: ٤٠'),
    },
    know: b(
      'The Midnight prayer of the Agpeya reads the parable of the ten virgins and says, "Behold, the Bridegroom comes in the middle of the night" (Matthew 25:6). Every night is practice for His coming.',
      'في صلاة نصف الليل بالأجبية نقرأ مثل العذارى العشر ونقول: "هوذا الختن يأتي في نصف الليل" (متى ٢٥: ٦). فكل ليلة تدريب على مجيئه.'
    ),
    remember: [
      b('Christ will come again in glory; no one knows the hour', 'سيأتي المسيح في مجده، ولا أحد يعرف الساعة'),
      b('The dead will rise, and Christ will judge with justice and mercy', 'سيقوم الأموات، ويدين المسيح بالعدل والرحمة'),
      b('We pray for the departed, who are alive in Christ', 'نصلي من أجل الراقدين، فهم أحياء في المسيح'),
    ],
    quiz: [
      q(['Who knows the day and hour of the Second Coming?', 'من يعرف يوم وساعة المجيء الثاني؟'], ['No one but the Father', 'لا أحد إلا الآب'], [['The angels', 'الملائكة'], ['Every priest', 'كل كاهن'], ['It is written in the Bible', 'مكتوب في الكتاب المقدس']]),
      q(['In Matthew 25, how does Christ judge?', 'في متى ٢٥، بماذا يدين المسيح؟'], ['By how we loved the least of His brethren', 'بمحبتنا لإخوته الأصاغر'], [['By how rich we were', 'بمقدار غنانا'], ['By how famous we were', 'بشهرتنا'], ['By how many languages we spoke', 'بعدد اللغات التي نتكلمها']]),
      q(['Will our bodies rise?', 'هل ستقوم أجسادنا؟'], ['Yes, changed and incorruptible', 'نعم، متغيّرة وعديمة الفساد'], [['No, only souls live on', 'لا، الأرواح فقط تبقى'], ['Only the bodies of saints', 'أجساد القديسين فقط'], ['They come back as animals', 'تعود في صورة حيوانات']]),
      q(['Which parable does the Midnight prayer read?', 'أي مثل نقرأه في صلاة نصف الليل؟'], ['The ten virgins', 'العذارى العشر'], [['The prodigal son', 'الابن الضال'], ['The sower', 'الزارع'], ['The good Samaritan', 'السامري الصالح']]),
    ],
  },

  // ---- Unit 2: The life of the Church ----
  {
    id: 'baptism',
    unit: 'life',
    title: b('Baptism and the Holy Myron', 'المعمودية والميرون'),
    hook: b(
      'At a Coptic baptism the person (or the godparent) faces west to renounce Satan, then turns east to confess Christ. Christians have done this since the earliest centuries.',
      'في المعمودية القبطية يتجه المعمَّد (أو إشبينه) نحو الغرب ليجحد الشيطان، ثم نحو الشرق ليعترف بالمسيح. وهكذا يفعل المسيحيون منذ القرون الأولى.'
    ),
    sections: [
      {
        heading: b('Born again', 'ولادة جديدة'),
        body: b(
          'Christ said, "Unless one is born of water and the Spirit, he cannot enter the kingdom of God" (John 3:5). In baptism we are immersed three times in the name of the Holy Trinity. We die with Christ, rise with Him to new life, and our sins are forgiven.',
          'قال المسيح: "إِنْ كَانَ أَحَدٌ لاَ يُولَدُ مِنَ الْمَاءِ وَالرُّوحِ لاَ يَقْدِرُ أَنْ يَدْخُلَ مَلَكُوتَ اللهِ" (يوحنا ٣: ٥). في المعمودية نُغطَّس ثلاث مرات باسم الثالوث القدوس، فنموت مع المسيح ونقوم معه لحياة جديدة، وتُغفر خطايانا.'
        ),
      },
      {
        heading: b('The seal of the Spirit', 'ختم الروح'),
        body: b(
          'Right after baptism comes Chrismation: the priest anoints the newly baptized with the Holy Myron, making 36 signs of the cross on the body. Through it the Holy Spirit comes to dwell in us.',
          'بعد المعمودية مباشرة يأتي سر الميرون: يدهن الكاهن المعمَّد بالميرون المقدس بستة وثلاثين رشماً على الجسد، فيحلّ فينا الروح القدس ويسكن.'
        ),
      },
      {
        heading: b('The Holy Myron', 'الميرون المقدس'),
        body: b(
          'The Myron is a holy oil consecrated by the Pope of Alexandria with the bishops, only from time to time, with long prayers. Coptic tradition traces it back to the spices used at Christ\'s burial.',
          'الميرون زيت مقدس يكرّسه بابا الإسكندرية مع الأساقفة من حين لآخر بصلوات طويلة. ويرجعه التقليد القبطي إلى الأطياب التي كُفّن بها جسد المسيح.'
        ),
      },
    ],
    verse: {
      text: b(
        '"Therefore we were buried with Him through baptism into death, that just as Christ was raised from the dead by the glory of the Father, even so we also should walk in newness of life."',
        '"فَدُفِنَّا مَعَهُ بِالْمَعْمُودِيَّةِ لِلْمَوْتِ، حَتَّى كَمَا أُقِيمَ الْمَسِيحُ مِنَ الأَمْوَاتِ، بِمَجْدِ الآبِ، هكَذَا نَسْلُكُ نَحْنُ أَيْضًا فِي جِدَّةِ الْحَيَاةِ."'
      ),
      ref: b('Romans 6:4', 'رومية ٦: ٤'),
    },
    know: b(
      'By Coptic custom a baby boy is usually baptized after 40 days and a girl after 80, following the days of purification in Leviticus 12.',
      'بحسب العادة القبطية يُعمَّد الطفل الذكر عادةً بعد أربعين يوماً والأنثى بعد ثمانين، اتباعاً لأيام التطهير في سفر اللاويين ١٢.'
    ),
    remember: [
      b('Baptism is a new birth of water and the Spirit', 'المعمودية ولادة جديدة من الماء والروح'),
      b('We are immersed three times, in the name of the Trinity', 'نُغطَّس ثلاث مرات باسم الثالوث'),
      b('In Chrismation the Holy Spirit comes to dwell in us', 'في الميرون يسكن فينا الروح القدس'),
    ],
    quiz: [
      q(['How many times is a person immersed in baptism?', 'كم مرة يُغطَّس المعمَّد؟'], ['Three', 'ثلاث مرات'], [['Once', 'مرة واحدة'], ['Seven', 'سبع مرات'], ['Twelve', 'اثنتا عشرة مرة']]),
      q(['Which way does one face to renounce Satan?', 'نحو أي اتجاه يجحد المعمَّد الشيطان؟'], ['West', 'الغرب'], [['East', 'الشرق'], ['North', 'الشمال'], ['South', 'الجنوب']]),
      q(['How many signs of the cross are made with the Holy Myron?', 'كم رشماً بالميرون المقدس؟'], ['36', '٣٦'], [['3', '٣'], ['12', '١٢'], ['40', '٤٠']]),
      q(['What does Chrismation give?', 'ماذا نأخذ في سر الميرون؟'], ['The Holy Spirit to dwell in us', 'سكنى الروح القدس فينا'], [['A new name only', 'اسماً جديداً فقط'], ['A place in the choir', 'مكاناً في الخورس'], ['Permission to fast', 'إذناً بالصوم']]),
    ],
  },
  {
    id: 'eucharist',
    unit: 'life',
    title: b('The Holy Eucharist', 'سر الإفخارستيا'),
    hook: b(
      'The word "Eucharist" means "thanksgiving". The Liturgy is the Church\'s great thank-you, and at its heart is a gift: Christ Himself.',
      'كلمة "إفخارستيا" معناها "شكر". فالقداس هو شكر الكنيسة العظيم، وفي قلبه عطية: المسيح نفسه.'
    ),
    sections: [
      {
        heading: b('Truly His Body and Blood', 'جسده ودمه حقاً'),
        body: b(
          'At the Last Supper Christ took bread and said, "Take, eat; this is My body," and the cup, "This is My blood" (Matthew 26:26–28). In the Liturgy, by the descent of the Holy Spirit, the bread and wine truly become His Body and Blood: not just symbols.',
          'في العشاء الأخير أخذ المسيح خبزاً وقال: "خُذُوا كُلُوا. هذَا هُوَ جَسَدِي"، والكأس: "هذَا هُوَ دَمِي" (متى ٢٦: ٢٦–٢٨). وفي القداس، بحلول الروح القدس، يتحول الخبز والخمر حقاً إلى جسده ودمه، لا مجرد رموز.'
        ),
      },
      {
        heading: b('Why we receive', 'لماذا نتناول'),
        body: b(
          'Christ said, "He who eats My flesh and drinks My blood abides in Me, and I in him" (John 6:56). We receive Communion for the forgiveness of sins and eternal life, and to become one with Christ and with one another.',
          'قال المسيح: "مَنْ يَأْكُلْ جَسَدِي وَيَشْرَبْ دَمِي يَثْبُتْ فِيَّ وَأَنَا فِيهِ" (يوحنا ٦: ٥٦). نتناول لغفران الخطايا والحياة الأبدية، ولنصير واحداً مع المسيح ومع بعضنا البعض.'
        ),
      },
      {
        heading: b('Coming ready', 'نأتي مستعدين'),
        body: b(
          'We prepare with repentance and confession, by fasting beforehand, and by making peace with others. St Paul tells us to examine ourselves before we eat (1 Corinthians 11:28).',
          'نستعد بالتوبة والاعتراف، وبالصوم قبل التناول، وبالمصالحة مع الآخرين. ويوصينا القديس بولس أن نمتحن أنفسنا قبل أن نأكل (١ كورنثوس ١١: ٢٨).'
        ),
      },
    ],
    verse: { text: b('"He who eats My flesh and drinks My blood abides in Me, and I in him."', '"مَنْ يَأْكُلْ جَسَدِي وَيَشْرَبْ دَمِي يَثْبُتْ فِيَّ وَأَنَا فِيهِ."'), ref: b('John 6:56', 'يوحنا ٦: ٥٦') },
    know: b(
      'The Coptic Church prays three Liturgies: St Basil (most days), St Gregory and St Cyril (the Liturgy of St Mark, written down by St Cyril). The Qurban bread is stamped with twelve crosses, for the apostles, around a large one for Christ.',
      'تصلي الكنيسة القبطية ثلاثة قداسات: القداس الباسيلي (في أغلب الأيام)، والغريغوري، والكيرلسي (قداس القديس مرقس الذي دوّنه القديس كيرلس). والقربانة مختومة باثني عشر صليباً صغيراً للرسل حول صليب كبير للمسيح.'
    ),
    remember: [
      b('Eucharist means thanksgiving', 'الإفخارستيا معناها الشكر'),
      b("The bread and wine truly become Christ's Body and Blood", 'يتحول الخبز والخمر حقاً إلى جسد المسيح ودمه'),
      b('We prepare with repentance, confession and fasting', 'نستعد بالتوبة والاعتراف والصوم'),
    ],
    quiz: [
      q(['What does "Eucharist" mean?', 'ما معنى "إفخارستيا"؟'], ['Thanksgiving', 'الشكر'], [['Gathering', 'الاجتماع'], ['Bread', 'الخبز'], ['Fasting', 'الصوم']]),
      q(['Which are the three Coptic Liturgies?', 'ما هي القداسات القبطية الثلاثة؟'], ['St Basil, St Gregory and St Cyril', 'الباسيلي والغريغوري والكيرلسي'], [['St Peter, St Paul and St John', 'بطرس وبولس ويوحنا'], ['St Antony, St Mina and St George', 'أنطونيوس ومينا وجرجس'], ['St James, St Luke and St Matthew', 'يعقوب ولوقا ومتى']]),
      q(['How many small crosses surround the large one on the Qurban?', 'كم صليباً صغيراً حول الصليب الكبير في القربانة؟'], ['Twelve', 'اثنا عشر'], [['Three', 'ثلاثة'], ['Seven', 'سبعة'], ['Forty', 'أربعون']]),
      q(['"He who eats My flesh… abides in Me" is in which Gospel?', '"من يأكل جسدي… يثبت فيّ" في أي إنجيل؟'], ['John', 'يوحنا'], [['Matthew', 'متى'], ['Mark', 'مرقس'], ['Luke', 'لوقا']]),
    ],
  },
  {
    id: 'confession',
    unit: 'life',
    title: b('Repentance and Confession', 'التوبة والاعتراف'),
    hook: b(
      'The prodigal son rehearsed a speech all the way home. But his father ran to meet him before he could finish it. That is what repentance looks like from God\'s side.',
      'جهّز الابن الضال كلاماً طوال طريق العودة، لكن أباه ركض إليه قبل أن يكمله. هكذا تبدو التوبة من جهة الله.'
    ),
    sections: [
      {
        heading: b('Coming home', 'العودة إلى البيت'),
        body: b(
          'Repentance (metanoia) means a change of heart: turning back to God. In the parable of the prodigal son (Luke 15), the father runs, embraces and restores his son. God is always waiting for us.',
          'التوبة (ميطانيا) هي تغيير القلب والرجوع إلى الله. ففي مثل الابن الضال (لوقا ١٥) يركض الأب ويحتضن ابنه ويردّه إلى كرامته. والله ينتظرنا دائماً.'
        ),
      },
      {
        heading: b('Why a priest?', 'لماذا الكاهن؟'),
        body: b(
          'After His Resurrection Christ breathed on the apostles and said, "Receive the Holy Spirit. If you forgive the sins of any, they are forgiven them" (John 20:22–23). In confession we confess to God in the presence of the priest, who prays the absolution over us.',
          'بعد قيامته نفخ المسيح في الرسل وقال: "اقْبَلُوا الرُّوحَ الْقُدُسَ. مَنْ غَفَرْتُمْ خَطَايَاهُ تُغْفَرُ لَهُ" (يوحنا ٢٠: ٢٢–٢٣). وفي الاعتراف نعترف لله في حضور الكاهن الذي يصلي علينا التحليل.'
        ),
      },
      {
        heading: b('A father of confession', 'أب الاعتراف'),
        body: b(
          'Copts usually keep one father of confession who knows them and guides them over the years. Confession is not only about the past: it is guidance for growing closer to God.',
          'يكون للقبطي عادةً أب اعتراف واحد يعرفه ويرشده على مر السنين. فالاعتراف ليس عن الماضي فقط، بل إرشاد للنمو في القرب من الله.'
        ),
      },
    ],
    verse: {
      text: b(
        '"If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness."',
        '"إِنِ اعْتَرَفْنَا بِخَطَايَانَا فَهُوَ أَمِينٌ وَعَادِلٌ، حَتَّى يَغْفِرَ لَنَا خَطَايَانَا وَيُطَهِّرَنَا مِنْ كُلِّ إِثْمٍ."'
      ),
      ref: b('1 John 1:9', '١ يوحنا ١: ٩'),
    },
    know: b(
      'A prostration in prayer is called a "metania", from the Greek metanoia, repentance: bowing to the ground is repentance you can see.',
      'السجدة في الصلاة تُسمّى "مطانية"، من الكلمة اليونانية "ميطانيا" أي التوبة: فالسجود إلى الأرض توبة منظورة.'
    ),
    remember: [
      b('Repentance is a change of heart, turning back to God', 'التوبة تغيير القلب والرجوع إلى الله'),
      b('In confession we confess to God before the priest, who prays the absolution', 'في الاعتراف نعترف لله أمام الكاهن الذي يصلي التحليل'),
      b('A father of confession guides us as we grow', 'أب الاعتراف يرشدنا في نمونا'),
    ],
    quiz: [
      q(['What does "metanoia" mean?', 'ما معنى "ميطانيا"؟'], ['Repentance, a change of heart', 'التوبة وتغيير القلب'], [['Fasting', 'الصوم'], ['A feast', 'عيد'], ['A hymn', 'لحن']]),
      q(['Which parable shows a father running to meet his son?', 'أي مثل يُظهر أباً يركض لملاقاة ابنه؟'], ['The prodigal son', 'الابن الضال'], [['The sower', 'الزارع'], ['The ten virgins', 'العذارى العشر'], ['The talents', 'الوزنات']]),
      q(['Where did Christ give the apostles authority to forgive sins?', 'أين أعطى المسيح الرسل سلطان غفران الخطايا؟'], ['John 20:22–23', 'يوحنا ٢٠: ٢٢–٢٣'], [['Genesis 3', 'تكوين ٣'], ['Psalm 150', 'مزمور ١٥٠'], ['Acts 15', 'أعمال ١٥']]),
      q(['Who is a "father of confession"?', 'من هو "أب الاعتراف"؟'], ['A priest who knows and guides us over the years', 'كاهن يعرفنا ويرشدنا على مر السنين'], [['Any friend', 'أي صديق'], ['The oldest deacon', 'أكبر الشمامسة سناً'], ['Ourselves', 'نحن أنفسنا']]),
    ],
  },
  {
    id: 'agpeya',
    unit: 'life',
    title: b('Prayer and the Agpeya', 'الصلاة والأجبية'),
    hook: b('King David said, "Seven times a day I praise You." The Coptic Church took him at his word.', 'قال داود النبي: "سبع مرات في النهار سبحتك." والكنيسة القبطية أخذت كلامه حرفياً.'),
    sections: [
      {
        heading: b('The book of the hours', 'كتاب السواعي'),
        body: b(
          'The Agpeya (from the Coptic word for "hour") is the Coptic book of the hours of prayer. Each hour has psalms, a Gospel reading, short prayers and the Lord\'s Prayer.',
          'الأجبية (من الكلمة القبطية التي تعني "ساعة") هي كتاب صلوات السواعي في الكنيسة القبطية. ولكل ساعة مزامير وفصل من الإنجيل وقطع وصلوات قصيرة والصلاة الربانية.'
        ),
      },
      {
        heading: b('Each hour remembers Christ', 'كل ساعة تذكار للمسيح'),
        body: b(
          'Prime remembers His Resurrection, for He is the Light; the Third Hour, the coming of the Holy Spirit; the Sixth, His crucifixion; the Ninth, His death on the Cross; the Eleventh, His taking down from the Cross; the Twelfth, His burial; and Midnight, His Second Coming.',
          'صلاة باكر تذكار قيامته لأنه النور، والثالثة حلول الروح القدس، والسادسة صلبه، والتاسعة موته على الصليب، والحادية عشرة (الغروب) إنزاله من على الصليب، والثانية عشرة (النوم) دفنه، ونصف الليل مجيئه الثاني.'
        ),
      },
      {
        heading: b('Starting small', 'ابدأ بالقليل'),
        body: b(
          "You don't have to pray every hour on the first day. Start with one, morning or night, as your father of confession guides you. Pray slowly, and let the psalms become your own words.",
          'لست مضطراً أن تصلي كل السواعي من أول يوم. ابدأ بواحدة، باكر أو النوم، حسب إرشاد أب اعترافك. صلِّ ببطء، ودع المزامير تصير كلماتك أنت.'
        ),
      },
    ],
    verse: {
      text: b('"Seven times a day I praise You, because of Your righteous judgments."', '"سَبْعَ مَرَّاتٍ فِي النَّهَارِ سَبَّحْتُكَ عَلَى أَحْكَامِ عَدْلِكَ."'),
      ref: b('Psalm 119:164 (118 in the Agpeya)', 'مزمور ١١٩: ١٦٤ (١١٨ في الأجبية)'),
    },
    know: b(
      'Each hour ends with "Lord have mercy" 41 times. A common explanation: 39 for the lashes Christ received, one for the crown of thorns and one for the spear.',
      'تُختم كل ساعة بـ"كيرياليسون" ٤١ مرة. وتفسير شائع لذلك: ٣٩ عن الجلدات التي احتملها المسيح، وواحدة عن إكليل الشوك، وواحدة عن الحربة.'
    ),
    remember: [
      b('The Agpeya is the Coptic book of the hours of prayer', 'الأجبية كتاب صلوات السواعي القبطي'),
      b("Each hour remembers a moment in Christ's saving work", 'كل ساعة تذكار لحدث من عمل المسيح الخلاصي'),
      b('Start small and pray slowly', 'ابدأ بالقليل وصلِّ ببطء'),
    ],
    quiz: [
      q(['What does the Sixth Hour remember?', 'بماذا تذكّرنا صلاة الساعة السادسة؟'], ['The crucifixion', 'الصلب'], [['The Resurrection', 'القيامة'], ['The coming of the Holy Spirit', 'حلول الروح القدس'], ['The burial', 'الدفن']]),
      q(['Which hour remembers Christ\'s burial?', 'أي ساعة تذكار دفن المسيح؟'], ['The Twelfth Hour (Compline)', 'الساعة الثانية عشرة (النوم)'], [['Prime', 'باكر'], ['The Third Hour', 'الثالثة'], ['The Ninth Hour', 'التاسعة']]),
      q(['How many times do we say "Lord have mercy" at the end of each hour?', 'كم مرة نقول "كيرياليسون" في ختام كل ساعة؟'], ['41', '٤١'], [['3', '٣'], ['12', '١٢'], ['100', '١٠٠']]),
      q(['Where is "Seven times a day I praise You"?', 'أين نجد "سبع مرات في النهار سبحتك"؟'], ['Psalm 119 (118 in the Agpeya)', 'مزمور ١١٩ (١١٨ في الأجبية)'], [['Psalm 150', 'مزمور ١٥٠'], ['Genesis 1', 'تكوين ١'], ['John 3', 'يوحنا ٣']]),
    ],
  },
  {
    id: 'fasting',
    unit: 'life',
    title: b('Fasting in the Coptic Church', 'الأصوام في الكنيسة القبطية'),
    hook: b(
      'Copts fast more than two hundred days a year. That sounds hard, until you see fasting as training for the heart, not punishment for the body.',
      'يصوم الأقباط أكثر من مئتي يوم في السنة. يبدو هذا صعباً، إلى أن ترى الصوم تدريباً للقلب لا عقاباً للجسد.'
    ),
    sections: [
      {
        heading: b('Why we fast', 'لماذا نصوم'),
        body: b(
          'Christ fasted forty days, and He said "when you fast" (Matthew 6:16), not "if". Fasting is not just going without food: it comes with prayer, repentance and giving to others. The body learns to obey the spirit.',
          'صام المسيح أربعين يوماً، وقال "مَتَى صُمْتُمْ" (متى ٦: ١٦) لا "إن صمتم". والصوم ليس مجرد امتناع عن الطعام، بل يصاحبه صلاة وتوبة وعطاء. فيتعلم الجسد أن يخضع للروح.'
        ),
      },
      {
        heading: b('How we fast', 'كيف نصوم'),
        body: b(
          'Coptic fasting has two parts: a time without any food (usually until a certain hour of the day, as your father of confession guides) and food without meat, eggs or dairy.',
          'للصوم القبطي جانبان: انقطاع عن الطعام لفترة (عادةً حتى ساعة معينة من النهار حسب إرشاد أب الاعتراف)، وطعام نباتي خالٍ من اللحوم والبيض والألبان.'
        ),
      },
      {
        heading: b('The fasts of the year', 'أصوام السنة'),
        body: b(
          "Wednesdays and Fridays (for the betrayal and the crucifixion), except in the Holy Fifty Days; Great Lent (55 days); the Fast of Jonah (3 days); the Nativity Fast (43 days); the Apostles' Fast (from after Pentecost until 5 Abib); and St Mary's Fast (1–15 Misra).",
          'الأربعاء والجمعة (تذكار الخيانة والصلب) ما عدا الخماسين المقدسة، والصوم الكبير (٥٥ يوماً)، وصوم يونان (٣ أيام)، وصوم الميلاد (٤٣ يوماً)، وصوم الرسل (من بعد عيد العنصرة حتى ٥ أبيب)، وصوم السيدة العذراء (١–١٥ مسرى).'
        ),
      },
    ],
    verse: {
      text: b(
        '"But you, when you fast, anoint your head and wash your face, so that you do not appear to men to be fasting, but to your Father who is in the secret place."',
        '"وَأَمَّا أَنْتَ فَمَتَى صُمْتَ فَادْهُنْ رَأْسَكَ وَاغْسِلْ وَجْهَكَ، لِكَيْ لاَ تَظْهَرَ لِلنَّاسِ صَائِمًا، بَلْ لأَبِيكَ الَّذِي فِي الْخَفَاءِ."'
      ),
      ref: b('Matthew 6:17–18', 'متى ٦: ١٧–١٨'),
    },
    know: b(
      "Great Lent is 55 days: a week of preparation, the forty days of Christ's fast, and Holy Week.",
      'الصوم الكبير ٥٥ يوماً: أسبوع استعداد، والأربعون يوماً التي صامها المسيح، وأسبوع الآلام.'
    ),
    remember: [
      b('Fasting goes with prayer, repentance and giving', 'الصوم يصاحبه صلاة وتوبة وعطاء'),
      b('Coptic fasting means time without food, and food without animal products', 'الصوم القبطي انقطاع لفترة وطعام نباتي'),
      b('We fast on Wednesdays and Fridays and in the fasting seasons', 'نصوم الأربعاء والجمعة وفي مواسم الأصوام'),
    ],
    quiz: [
      q(['How long is Great Lent?', 'كم يوماً الصوم الكبير؟'], ['55 days', '٥٥ يوماً'], [['40 days', '٤٠ يوماً'], ['43 days', '٤٣ يوماً'], ['15 days', '١٥ يوماً']]),
      q(['Why do we fast on Wednesdays and Fridays?', 'لماذا نصوم الأربعاء والجمعة؟'], ['For the betrayal and the crucifixion', 'تذكار الخيانة والصلب'], [['For the Nativity and Theophany', 'تذكار الميلاد والغطاس'], ['Because markets close', 'لأن الأسواق تغلق'], ['For St Mary and St Joseph', 'تذكار العذراء ويوسف']]),
      q(['How long is the Fast of Jonah?', 'كم يوماً صوم يونان؟'], ['3 days', '٣ أيام'], [['7 days', '٧ أيام'], ['15 days', '١٥ يوماً'], ['40 days', '٤٠ يوماً']]),
      q(["When is St Mary's Fast?", 'متى صوم السيدة العذراء؟'], ['1–15 Misra', '١–١٥ مسرى'], [['1–15 Tout', '١–١٥ توت'], ['All of Kiahk', 'شهر كيهك كله'], ['All of Baramhat', 'شهر برمهات كله']]),
    ],
  },
  {
    id: 'coptic-year',
    unit: 'life',
    title: b('The Coptic Year', 'السنة القبطية'),
    hook: b(
      'The Coptic calendar is one of the oldest calendars still in use anywhere, and it counts its years from the martyrs.',
      'التقويم القبطي من أقدم التقاويم التي ما زالت مستخدمة في العالم، وهو يعدّ سنواته من الشهداء.'
    ),
    sections: [
      {
        heading: b('Thirteen months', 'ثلاثة عشر شهراً'),
        body: b(
          'The Coptic year has twelve months of thirty days and a short thirteenth month, Nasie, of five or six days: Tout, Babah, Hatour, Kiahk, Tubah, Amshir, Baramhat, Baramoudah, Bashans, Baounah, Abib, Misra and Nasie.',
          'السنة القبطية اثنا عشر شهراً كل منها ثلاثون يوماً، وشهر ثالث عشر قصير هو النسيء (خمسة أو ستة أيام): توت، بابه، هاتور، كيهك، طوبه، أمشير، برمهات، برموده، بشنس، بؤونه، أبيب، مسرى، النسيء.'
        ),
      },
      {
        heading: b('The Year of the Martyrs', 'سنة الشهداء'),
        body: b(
          'The years are counted from AD 284, when Diocletian, the great persecutor, became emperor. The Coptic New Year, the Feast of El Nayrouz on 1 Tout (usually 11 September), honours the martyrs.',
          'تُعدّ السنوات من سنة ٢٨٤م، حين صار دقلديانوس، أشد المضطهدين، إمبراطوراً. ورأس السنة القبطية، عيد النيروز في ١ توت (عادةً ١١ سبتمبر)، عيد لتكريم الشهداء.'
        ),
      },
      {
        heading: b('Feasts of the Lord', 'الأعياد السيدية'),
        body: b(
          'The Church keeps seven major feasts of the Lord: the Annunciation, Nativity, Theophany, Palm Sunday, Resurrection, Ascension and Pentecost; and seven minor ones: the Circumcision, the Entry into the Temple, the Entry into Egypt, the Wedding at Cana, the Transfiguration, Covenant Thursday and Thomas Sunday.',
          'للكنيسة سبعة أعياد سيدية كبرى: البشارة والميلاد والغطاس وأحد الشعانين والقيامة والصعود والعنصرة؛ وسبعة صغرى: الختان ودخول المسيح الهيكل ودخوله أرض مصر وعرس قانا الجليل والتجلي وخميس العهد وأحد توما.'
        ),
      },
    ],
    verse: {
      text: b('"This is the day the Lord has made; we will rejoice and be glad in it."', '"هذَا هُوَ الْيَوْمُ الَّذِي صَنَعَهُ الرَّبُّ، نَبْتَهِجُ وَنَفْرَحُ فِيهِ."'),
      ref: b('Psalm 118:24 (117 in the Agpeya)', 'مزمور ١١٨: ٢٤ (١١٧ في الأجبية)'),
    },
    know: b(
      'Egyptian farmers still use the Coptic months to plan sowing and harvest, and many Egyptian sayings about the weather are tied to them.',
      'ما زال الفلاحون المصريون يستخدمون الشهور القبطية في مواعيد الزراعة والحصاد، وكثير من الأمثال المصرية عن الطقس مرتبط بها.'
    ),
    remember: [
      b('The Coptic year has 13 months', 'السنة القبطية ١٣ شهراً'),
      b('Years are counted from AD 284, the Era of the Martyrs', 'تُعدّ السنوات من ٢٨٤م، سنة الشهداء'),
      b('Seven major and seven minor feasts of the Lord', 'سبعة أعياد سيدية كبرى وسبعة صغرى'),
    ],
    quiz: [
      q(['How many months are in the Coptic year?', 'كم شهراً في السنة القبطية؟'], ['13', '١٣'], [['12', '١٢'], ['10', '١٠'], ['14', '١٤']]),
      q(['When does the Coptic year begin?', 'متى تبدأ السنة القبطية؟'], ['1 Tout, the Feast of El Nayrouz', '١ توت، عيد النيروز'], [['1 January', '١ يناير'], ['29 Kiahk', '٢٩ كيهك'], ['1 Baramhat', '١ برمهات']]),
      q(['From which year are Coptic years counted?', 'من أي سنة تُعدّ السنوات القبطية؟'], ['AD 284', '٢٨٤م'], [['AD 1', '١م'], ['AD 68', '٦٨م'], ['AD 325', '٣٢٥م']]),
      q(['Which of these is a major feast of the Lord?', 'أي من هذه عيد سيدي كبير؟'], ['Palm Sunday', 'أحد الشعانين'], [['The Transfiguration', 'التجلي'], ['Thomas Sunday', 'أحد توما'], ['The Wedding at Cana', 'عرس قانا الجليل']]),
    ],
  },
];
