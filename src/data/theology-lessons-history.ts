import type { Bilingual, GuideQuestion } from './deacon-guide';
import type { Lesson } from './theology-school';

// Theology School, units 3 and 4: the councils, the fathers and the Coptic Church's history. Written 2026-11-03 from
// the Synaxarium (e.g. St Athanasius's five exiles, 7 Bashans), the Patriarchate's history page, Eusebius, the acts of
// the councils as Our Faith tells them (faith-guide.ts), Pope Shenouda III's "The Nature of Christ", the 1989 and 1990
// agreed statements, and news of the Holy Synod (St Habib Girgis, 2013; the 21 martyrs of Libya, 8 Amshir, 2015).

const b = (en: string, ar: string): Bilingual => ({ en, ar });
const q = (question: [string, string], right: [string, string], wrong: [string, string][]): GuideQuestion => ({
  q: b(...question),
  right: b(...right),
  wrong: wrong.map((w) => b(...w)),
});

export const historyLessons: Lesson[] = [
  // ---- Unit 3: The councils ----
  {
    id: 'persecution',
    unit: 'councils',
    title: b('From Persecution to Freedom', 'من الاضطهاد إلى الحرية'),
    hook: b(
      'For almost three centuries, being a Christian could cost you your life. Then, within a few years, everything changed.',
      'طوال ثلاثة قرون تقريباً، كان أن تكون مسيحياً قد يكلّفك حياتك. ثم تغيّر كل شيء في سنوات قليلة.'
    ),
    sections: [
      {
        heading: b('The persecutions', 'عصور الاضطهاد'),
        body: b(
          'From Nero in the first century to Diocletian in the fourth, Roman emperors persecuted Christians again and again. Egypt suffered terribly under Decius (AD 250) and under Diocletian, whose Great Persecution began in AD 303.',
          'من نيرون في القرن الأول إلى دقلديانوس في الرابع، اضطهد أباطرة الرومان المسيحيين مرة بعد مرة. وتألمت مصر بشدة في عهد ديكيوس (٢٥٠م) ودقلديانوس الذي بدأ اضطهاده العظيم سنة ٣٠٣م.'
        ),
      },
      {
        heading: b('The Seal of the Martyrs', 'خاتم الشهداء'),
        body: b(
          'St Peter, the 17th Pope of Alexandria, was martyred in AD 311 during this persecution. The Church calls him "the Seal of the Martyrs", the last martyr of that era.',
          'استشهد القديس بطرس، البابا السابع عشر للإسكندرية، سنة ٣١١م في هذا الاضطهاد. وتلقّبه الكنيسة بـ"خاتم الشهداء"، آخر شهداء ذلك العصر.'
        ),
      },
      {
        heading: b('The Edict of Milan', 'مرسوم ميلان'),
        body: b(
          'In AD 313 the emperors Constantine and Licinius gave Christians freedom of worship. Now the Church could build openly and gather its bishops to settle questions of faith together, which led to the great councils.',
          'في سنة ٣١٣م منح الإمبراطوران قسطنطين وليكينيوس المسيحيين حرية العبادة. فصار للكنيسة أن تبني علناً وأن تجمع أساقفتها ليحسموا مسائل الإيمان معاً، فكانت المجامع الكبرى.'
        ),
      },
    ],
    verse: { text: b('"Be faithful until death, and I will give you the crown of life."', '"كُنْ أَمِينًا إِلَى الْمَوْتِ فَسَأُعْطِيكَ إِكْلِيلَ الْحَيَاةِ."'), ref: b('Revelation 2:10', 'رؤيا ٢: ١٠') },
    know: b(
      'Tertullian, an early Christian writer, said: "The blood of the martyrs is the seed of the Church." The more Christians were killed, the more people believed.',
      'قال ترتليان، أحد الكتّاب المسيحيين الأوائل: "دماء الشهداء بذار الكنيسة." فكلما قُتل المسيحيون ازداد عدد المؤمنين.'
    ),
    remember: [
      b('Christians were persecuted for nearly three centuries', 'اضطُهد المسيحيون نحو ثلاثة قرون'),
      b('St Peter, the Seal of the Martyrs, was martyred in AD 311', 'استشهد القديس بطرس خاتم الشهداء سنة ٣١١م'),
      b('The Edict of Milan (AD 313) gave Christians freedom', 'مرسوم ميلان (٣١٣م) أعطى المسيحيين الحرية'),
    ],
    quiz: [
      q(['Who is called the Seal of the Martyrs?', 'من الملقّب بخاتم الشهداء؟'], ['St Peter, the 17th Pope', 'القديس بطرس، البابا السابع عشر'], [['St Mark', 'القديس مرقس'], ['St George', 'مارجرجس'], ['St Athanasius', 'القديس أثناسيوس']]),
      q(["When did Diocletian's Great Persecution begin?", 'متى بدأ اضطهاد دقلديانوس العظيم؟'], ['AD 303', '٣٠٣م'], [['AD 68', '٦٨م'], ['AD 313', '٣١٣م'], ['AD 451', '٤٥١م']]),
      q(['What did the Edict of Milan (313) give Christians?', 'ماذا أعطى مرسوم ميلان (٣١٣م) للمسيحيين؟'], ['Freedom of worship', 'حرية العبادة'], [['A new calendar', 'تقويماً جديداً'], ['The Creed', 'قانون الإيمان'], ['The list of Bible books', 'قائمة أسفار الكتاب']]),
      q(['"The blood of the martyrs is the seed of…"', '"دماء الشهداء بذار…"'], ['The Church', 'الكنيسة'], [['The empire', 'الإمبراطورية'], ['The desert', 'البرية'], ['The calendar', 'التقويم']]),
    ],
  },
  {
    id: 'nicaea',
    unit: 'councils',
    title: b('The Council of Nicaea, AD 325', 'مجمع نيقية سنة ٣٢٥م'),
    hook: b(
      'A priest named Arius wrote catchy songs teaching that "there was a time when the Son was not", and sailors in Alexandria sang them. A whole empire was arguing, and a young deacon stood up.',
      'كتب كاهن اسمه آريوس أغاني سهلة تقول "كان وقت لم يكن فيه الابن"، وردّدها البحارة في الإسكندرية. وانشغلت الإمبراطورية كلها بالجدال، فوقف شماس شاب.'
    ),
    sections: [
      {
        heading: b('The question', 'السؤال'),
        body: b(
          'Arius taught that the Son was the first and greatest creature, but not truly God. If that were true, Christ could not save us, because only God can give us the life of God.',
          'علّم آريوس أن الابن أول المخلوقات وأعظمها، لكنه ليس إلهاً حقيقياً. ولو كان هذا صحيحاً لما استطاع المسيح أن يخلّصنا، لأن الله وحده يقدر أن يعطينا حياته.'
        ),
      },
      {
        heading: b('The council', 'المجمع'),
        body: b(
          'Emperor Constantine gathered the bishops at Nicaea in AD 325: 318 fathers. Pope Alexander of Alexandria came with his deacon, St Athanasius, who showed from the Scriptures that the Son is truly God.',
          'جمع الإمبراطور قسطنطين الأساقفة في نيقية سنة ٣٢٥م، فكانوا ٣١٨ أباً. وجاء البابا ألكسندروس السكندري ومعه شماسه القديس أثناسيوس، الذي أثبت من الكتب المقدسة أن الابن إله حق.'
        ),
      },
      {
        heading: b('The answer', 'الجواب'),
        body: b(
          'The council wrote the first part of the Creed: the Son is "true God of true God, begotten, not created, of one essence with the Father." The Greek word homoousios, "of one essence", became the banner of the Orthodox faith.',
          'صاغ المجمع الجزء الأول من قانون الإيمان: الابن "إله حق من إله حق، مولود غير مخلوق، مساوٍ للآب في الجوهر." وصارت الكلمة اليونانية "هوموؤوسيوس" أي "واحد معه في الجوهر" راية الإيمان المستقيم.'
        ),
      },
    ],
    verse: { text: b('"I and My Father are one."', '"أَنَا وَالآبُ وَاحِدٌ."'), ref: b('John 10:30', 'يوحنا ١٠: ٣٠') },
    know: b(
      'The Church of Alexandria, famous for its astronomers, worked out the date of Easter each year, and the Pope of Alexandria announced it to the churches in his Festal Letter.',
      'كانت كنيسة الإسكندرية، المشهورة بعلمائها في الفلك، تحسب موعد عيد القيامة كل سنة، ويعلنه بابا الإسكندرية للكنائس في رسالته الفصحية.'
    ),
    remember: [
      b('Arius taught that the Son was created', 'علّم آريوس أن الابن مخلوق'),
      b('318 fathers met at Nicaea in AD 325, and St Athanasius defended the faith', '٣١٨ أباً اجتمعوا في نيقية سنة ٣٢٥م ودافع القديس أثناسيوس عن الإيمان'),
      b('The Son is "of one essence with the Father"', 'الابن "مساوٍ للآب في الجوهر"'),
    ],
    quiz: [
      q(['What did Arius teach?', 'بماذا علّم آريوس؟'], ['That the Son was created', 'أن الابن مخلوق'], [['That the Holy Spirit is not God', 'أن الروح القدس ليس إلهاً'], ['That St Mary is not the Mother of God', 'أن العذراء ليست والدة الإله'], ['That Christ\'s humanity was swallowed up', 'أن ناسوت المسيح ذاب في لاهوته']]),
      q(['How many fathers met at Nicaea?', 'كم أباً اجتمعوا في نيقية؟'], ['318', '٣١٨'], [['150', '١٥٠'], ['200', '٢٠٠'], ['630', '٦٣٠']]),
      q(['What does "homoousios" mean?', 'ما معنى "هوموؤوسيوس"؟'], ['Of one essence', 'واحد في الجوهر'], [['Of a similar essence', 'مشابه في الجوهر'], ['Created first', 'المخلوق أولاً'], ['Born of a virgin', 'المولود من عذراء']]),
      q(['Which Church worked out the date of Easter each year?', 'أي كنيسة كانت تحسب موعد عيد القيامة كل سنة؟'], ['Alexandria', 'الإسكندرية'], [['Rome', 'روما'], ['Antioch', 'أنطاكية'], ['Jerusalem', 'أورشليم']]),
    ],
  },
  {
    id: 'constantinople',
    unit: 'councils',
    title: b('The Council of Constantinople, AD 381', 'مجمع القسطنطينية سنة ٣٨١م'),
    hook: b('After Nicaea settled who the Son is, a new question came: who is the Holy Spirit?', 'بعد أن حسم مجمع نيقية من هو الابن، جاء سؤال جديد: من هو الروح القدس؟'),
    sections: [
      {
        heading: b('Macedonius', 'مقدونيوس'),
        body: b(
          'Macedonius, a former bishop of Constantinople, taught that the Holy Spirit was a creature, a servant of God rather than God. The fathers saw that this denied the Trinity and our life in the Spirit.',
          'علّم مقدونيوس، أسقف القسطنطينية المعزول، أن الروح القدس مخلوق، خادم لله لا الله. ورأى الآباء أن هذا إنكار للثالوث ولحياتنا في الروح.'
        ),
      },
      {
        heading: b('The council', 'المجمع'),
        body: b(
          'Emperor Theodosius the Great called 150 bishops to Constantinople in AD 381. As the Synaxarium tells, Pope Timothy of Alexandria presided. The council also rejected Apollinarius, who denied that Christ had a human mind and soul.',
          'دعا الإمبراطور ثيئودوسيوس الكبير ١٥٠ أسقفاً إلى القسطنطينية سنة ٣٨١م، وكما يذكر السنكسار رأسه البابا تيموثاوس السكندري. ورفض المجمع أيضاً تعليم أبوليناريوس الذي أنكر أن للمسيح عقلاً ونفساً بشرية.'
        ),
      },
      {
        heading: b('The Creed completed', 'اكتمال قانون الإيمان'),
        body: b(
          'The council finished the Creed: "Yes, we believe in the Holy Spirit, the Lord, the Giver of Life, who proceeds from the Father, who with the Father and the Son is worshipped and glorified, who spoke by the prophets…" This is the Creed we pray today.',
          'أكمل المجمع قانون الإيمان: "نعم نؤمن بالروح القدس، الرب المحيي، المنبثق من الآب، نسجد له ونمجده مع الآب والابن، الناطق في الأنبياء…" وهو قانون الإيمان الذي نصليه اليوم.'
        ),
      },
    ],
    verse: {
      text: b('"The grace of the Lord Jesus Christ, and the love of God, and the communion of the Holy Spirit be with you all."', '"نِعْمَةُ رَبِّنَا يَسُوعَ الْمَسِيحِ، وَمَحَبَّةُ اللهِ، وَشَرِكَةُ الرُّوحِ الْقُدُسِ مَعَ جَمِيعِكُمْ."'),
      ref: b('2 Corinthians 13:14', '٢ كورنثوس ١٣: ١٤'),
    },
    know: b(
      'In the Liturgy the priest blesses the people with these words of St Paul, in their Coptic order: "The love of God the Father, the grace of the Only-Begotten Son, and the communion and gift of the Holy Spirit", naming the whole Trinity.',
      'يبارك الكاهن الشعب بكلمات القديس بولس هذه: "محبة الله الآب، ونعمة الابن الوحيد، وشركة وموهبة الروح القدس"، وهي تذكر الثالوث كله.'
    ),
    remember: [
      b('Macedonius denied the divinity of the Holy Spirit', 'أنكر مقدونيوس لاهوت الروح القدس'),
      b('150 fathers met at Constantinople in AD 381', '١٥٠ أباً اجتمعوا في القسطنطينية سنة ٣٨١م'),
      b('The council completed the Creed with the part about the Holy Spirit', 'أكمل المجمع قانون الإيمان بالجزء الخاص بالروح القدس'),
    ],
    quiz: [
      q(['Who denied the divinity of the Holy Spirit?', 'من أنكر لاهوت الروح القدس؟'], ['Macedonius', 'مقدونيوس'], [['Arius', 'آريوس'], ['Nestorius', 'نسطور'], ['Eutyches', 'أوطاخي']]),
      q(['How many bishops met at Constantinople?', 'كم أسقفاً اجتمعوا في القسطنطينية؟'], ['150', '١٥٠'], [['318', '٣١٨'], ['200', '٢٠٠'], ['630', '٦٣٠']]),
      q(['Which part of the Creed did this council add?', 'أي جزء من قانون الإيمان أضافه هذا المجمع؟'], ['The part about the Holy Spirit', 'الجزء الخاص بالروح القدس'], [['The introduction about St Mary', 'المقدمة عن العذراء'], ['The first line', 'السطر الأول'], ['Nothing', 'لا شيء']]),
      q(['Who presided, as the Synaxarium tells?', 'من رأس المجمع كما يذكر السنكسار؟'], ['Pope Timothy of Alexandria', 'البابا تيموثاوس السكندري'], [['Pope Cyril', 'البابا كيرلس'], ['Pope Dioscorus', 'البابا ديسقوروس'], ['St Antony', 'الأنبا أنطونيوس']]),
    ],
  },
  {
    id: 'ephesus',
    unit: 'councils',
    title: b('The Council of Ephesus, AD 431', 'مجمع أفسس سنة ٤٣١م'),
    hook: b(
      'When the people of Ephesus heard that the bishops had confessed Mary as the Mother of God, they filled the streets with torches and walked the fathers home in joy.',
      'عندما سمع شعب أفسس أن الآباء أعلنوا أن مريم والدة الإله، ملأوا الشوارع بالمشاعل وساروا مع الآباء إلى بيوتهم فرحين.'
    ),
    sections: [
      {
        heading: b('Nestorius', 'نسطور'),
        body: b(
          'Nestorius, Patriarch of Constantinople, refused to call St Mary Theotokos, saying she bore a man in whom God dwelt. This split Christ into two: a Son of God and a son of Mary.',
          'رفض نسطور، بطريرك القسطنطينية، أن يدعو القديسة مريم والدة الإله، قائلاً إنها ولدت إنساناً حلّ فيه الله. وهذا يقسم المسيح إلى اثنين: ابن الله وابن مريم.'
        ),
      },
      {
        heading: b('St Cyril', 'القديس كيرلس'),
        body: b(
          'St Cyril the Great, Pope of Alexandria, answered that the One born of Mary is God the Word Himself made flesh. He wrote letters and Twelve Anathemas (chapters) against the teaching of Nestorius.',
          'أجاب القديس كيرلس الكبير، بابا الإسكندرية، بأن المولود من مريم هو الله الكلمة نفسه متجسداً. وكتب رسائل واثني عشر حرماً ضد تعليم نسطور.'
        ),
      },
      {
        heading: b('The council', 'المجمع'),
        body: b(
          'About 200 bishops met at Ephesus in AD 431 under St Cyril, with St Shenouda the Archimandrite at his side. They deposed Nestorius and confirmed that St Mary is the Theotokos. The Introduction to the Creed, "We magnify you, O Mother of the True Light", comes from this council.',
          'اجتمع نحو ٢٠٠ أسقف في أفسس سنة ٤٣١م برئاسة القديس كيرلس، ومعه القديس الأنبا شنوده رئيس المتوحدين. فعزلوا نسطور وثبّتوا أن القديسة مريم والدة الإله. ومن هذا المجمع جاءت مقدمة قانون الإيمان: "نعظمك يا أم النور الحقيقي".'
        ),
      },
    ],
    verse: { text: b('"But why is this granted to me, that the mother of my Lord should come to me?"', '"فَمِنْ أَيْنَ لِي هذَا أَنْ تَأْتِيَ أُمُّ رَبِّي إِلَيَّ؟"'), ref: b('Luke 1:43', 'لوقا ١: ٤٣') },
    know: b(
      'St Elizabeth was the first to call Mary "the mother of my Lord" (Luke 1:43), four centuries before the council used the word Theotokos.',
      'كانت القديسة أليصابات أول من دعت مريم "أم ربي" (لوقا ١: ٤٣)، قبل أن يستخدم المجمع لقب "ثيئوطوكوس" بأربعة قرون.'
    ),
    remember: [
      b('Nestorius refused to call St Mary the Mother of God', 'رفض نسطور أن يدعو العذراء والدة الإله'),
      b('St Cyril taught that the One born of Mary is God the Word incarnate', 'علّم القديس كيرلس أن المولود من مريم هو الله الكلمة المتجسد'),
      b('The Introduction to the Creed comes from Ephesus', 'مقدمة قانون الإيمان من مجمع أفسس'),
    ],
    quiz: [
      q(['What title did Nestorius refuse?', 'أي لقب رفضه نسطور؟'], ['Theotokos (Mother of God)', 'والدة الإله'], [['Virgin', 'العذراء'], ['Queen', 'الملكة'], ['Daughter of David', 'ابنة داود']]),
      q(['Who led the Council of Ephesus?', 'من رأس مجمع أفسس؟'], ['St Cyril the Great', 'القديس كيرلس الكبير'], [['St Athanasius', 'القديس أثناسيوس'], ['St Dioscorus', 'القديس ديسقوروس'], ['Pope Timothy', 'البابا تيموثاوس']]),
      q(['Which saint went with St Cyril to Ephesus?', 'أي قديس رافق القديس كيرلس إلى أفسس؟'], ['St Shenouda the Archimandrite', 'الأنبا شنوده رئيس المتوحدين'], [['St Antony', 'الأنبا أنطونيوس'], ['St Mina', 'مارمينا'], ['St George', 'مارجرجس']]),
      q(['Who first called Mary "the mother of my Lord"?', 'من أول من دعا مريم "أم ربي"؟'], ['St Elizabeth', 'القديسة أليصابات'], [['St Joseph', 'القديس يوسف'], ['The Magi', 'المجوس'], ['St Peter', 'القديس بطرس']]),
    ],
  },
  {
    id: 'chalcedon',
    unit: 'councils',
    title: b('Chalcedon and St Dioscorus, AD 451', 'خلقيدونية والقديس ديسقوروس سنة ٤٥١م'),
    hook: b(
      'Twenty years after Ephesus, another council met at Chalcedon. Its words divided the Church for centuries. The Coptic Church does not accept it, and here is why.',
      'بعد عشرين سنة من أفسس انعقد مجمع آخر في خلقيدونية، وكلماته قسمت الكنيسة لقرون. والكنيسة القبطية لا تقبله، وإليك السبب.'
    ),
    sections: [
      {
        heading: b('The background', 'الخلفية'),
        body: b(
          "Eutyches, a monk in Constantinople, taught that Christ's humanity was swallowed up by His divinity like a drop of vinegar in the sea. The Coptic Church rejects this, and St Dioscorus condemned Eutyches too.",
          'علّم أوطاخي، وهو راهب في القسطنطينية، أن ناسوت المسيح ذاب في لاهوته كنقطة خل في المحيط. والكنيسة القبطية ترفض هذا، وقد حرم القديس ديسقوروس أوطاخي أيضاً.'
        ),
      },
      {
        heading: b('The council', 'المجمع'),
        body: b(
          'At Chalcedon, under Emperor Marcian, the council adopted the Tome of Pope Leo of Rome and spoke of Christ "in two natures" after the union. St Dioscorus, Pope of Alexandria, held to St Cyril\'s words, "one nature of God the Word incarnate", because "two natures" after the union seemed to divide the one Christ.',
          'في خلقيدونية، في عهد الإمبراطور مرقيان، تبنّى المجمع "طومس لاون" بابا روما، وتكلم عن المسيح "في طبيعتين" بعد الاتحاد. وتمسك القديس ديسقوروس بابا الإسكندرية بكلمات القديس كيرلس: "طبيعة واحدة لله الكلمة المتجسد"، لأن "طبيعتين بعد الاتحاد" بدت تقسيماً للمسيح الواحد.'
        ),
      },
      {
        heading: b('Exile', 'النفي'),
        body: b(
          'St Dioscorus was deposed and exiled to the island of Gangra, where he departed in AD 454. He is honoured as the hero of Orthodoxy. From then on the Oriental Orthodox Churches (Coptic, Syriac, Armenian, Ethiopian, Eritrean and Indian) went one way, and the Chalcedonian Churches another.',
          'عُزل القديس ديسقوروس ونُفي إلى جزيرة غانغرا حيث تنيّح سنة ٤٥٤م، وتكرّمه الكنيسة بطلاً للأرثوذكسية. ومنذ ذلك الحين سارت الكنائس الأرثوذكسية الشرقية (القبطية والسريانية والأرمنية والإثيوبية والإريترية والهندية) في طريق، والكنائس الخلقيدونية في طريق آخر.'
        ),
      },
    ],
    verse: { text: b('"I have fought the good fight, I have finished the race, I have kept the faith."', '"قَدْ جَاهَدْتُ الْجِهَادَ الْحَسَنَ، أَكْمَلْتُ السَّعْيَ، حَفِظْتُ الإِيمَانَ."'), ref: b('2 Timothy 4:7', '٢ تيموثاوس ٤: ٧') },
    know: b(
      'The Synaxarium tells that St Dioscorus was struck on the mouth until his teeth fell out and his beard was plucked. He sent them to Alexandria with the words, "This is the fruit of faith."',
      'يذكر السنكسار أن القديس ديسقوروس ضُرب على فمه حتى سقطت أسنانه ونُتفت لحيته، فأرسلها إلى الإسكندرية قائلاً: "هذه ثمرة الإيمان."'
    ),
    remember: [
      b('The Coptic Church does not accept the Council of Chalcedon', 'الكنيسة القبطية لا تقبل مجمع خلقيدونية'),
      b('St Dioscorus kept St Cyril\'s "one nature of God the Word incarnate"', 'تمسك القديس ديسقوروس بعبارة القديس كيرلس "طبيعة واحدة لله الكلمة المتجسد"'),
      b('He departed in exile in Gangra in AD 454', 'تنيّح في منفاه بغانغرا سنة ٤٥٤م'),
    ],
    quiz: [
      q(['What did Eutyches teach?', 'بماذا علّم أوطاخي؟'], ["That Christ's humanity was swallowed up by His divinity", 'أن ناسوت المسيح ذاب في لاهوته'], [['That the Son is created', 'أن الابن مخلوق'], ['That St Mary is not Theotokos', 'أن العذراء ليست والدة الإله'], ['That the Spirit is a creature', 'أن الروح القدس مخلوق']]),
      q(['Which document did Chalcedon adopt?', 'أي وثيقة تبنّاها مجمع خلقيدونية؟'], ['The Tome of Leo', 'طومس لاون'], [['The Twelve Anathemas', 'الحرومات الاثنا عشر'], ['The 39th Festal Letter', 'الرسالة الفصحية ٣٩'], ['The Life of Antony', 'حياة أنطونيوس']]),
      q(['Where was St Dioscorus exiled?', 'إلى أين نُفي القديس ديسقوروس؟'], ['Gangra', 'غانغرا'], [['Rome', 'روما'], ['Jerusalem', 'أورشليم'], ['Sinai', 'سيناء']]),
      q(['What did he say when he sent his teeth and beard to Alexandria?', 'ماذا قال عندما أرسل أسنانه ولحيته إلى الإسكندرية؟'], ['"This is the fruit of faith"', '"هذه ثمرة الإيمان"'], [['"Avenge me"', '"انتقموا لي"'], ['"I have changed my mind"', '"لقد غيّرت رأيي"'], ['"Forget me"', '"انسوني"']]),
    ],
  },
  {
    id: 'unity',
    unit: 'councils',
    title: b('Toward Unity', 'نحو الوحدة'),
    hook: b(
      'After 1,500 years apart, theologians from both sides of Chalcedon sat down together, and found that they confess the same faith in Christ.',
      'بعد ١٥٠٠ سنة من الانفصال، جلس لاهوتيون من الجانبين معاً، فوجدوا أنهم يعترفون بالإيمان نفسه بالمسيح.'
    ),
    sections: [
      {
        heading: b('Misunderstood', 'سوء فهم'),
        body: b(
          'For centuries the Copts were called "Monophysites", as if they believed Christ\'s humanity disappeared. That was never the Coptic faith. The Church confesses one nature of God the Word incarnate: one Christ, perfect God and perfect man.',
          'لقرون طويلة سُمّي الأقباط "مونوفيزيت" كأنهم يؤمنون أن ناسوت المسيح تلاشى. ولم يكن هذا إيمان الأقباط قط. فالكنيسة تعترف بطبيعة واحدة لله الكلمة المتجسد: مسيح واحد، إله كامل وإنسان كامل.'
        ),
      },
      {
        heading: b('Meeting again', 'لقاء من جديد'),
        body: b(
          'In 1973 Pope Shenouda III and Pope Paul VI of Rome signed a common declaration about faith in Christ. In 1989 at the Monastery of St Bishoy in Egypt, and in 1990 at Chambésy in Switzerland, Oriental and Eastern Orthodox theologians agreed that both families hold the same faith in Christ.',
          'في سنة ١٩٧٣م وقّع البابا شنوده الثالث وبابا روما بولس السادس إعلاناً مشتركاً عن الإيمان بالمسيح. وفي سنة ١٩٨٩م بدير الأنبا بيشوي في مصر، وسنة ١٩٩٠م في شامبيزي بسويسرا، اتفق لاهوتيو الكنائس الأرثوذكسية الشرقية والبيزنطية على أن العائلتين تشتركان في الإيمان نفسه بالمسيح.'
        ),
      },
      {
        heading: b('Unity in truth', 'وحدة في الحق'),
        body: b(
          'These agreements are steps, not the end: full communion has not been restored. The Coptic Church seeks unity in the true faith, and prays in every Liturgy for the peace of the "one, only, holy, catholic and apostolic Church".',
          'هذه الاتفاقات خطوات وليست النهاية، فالشركة الكاملة لم تعد بعد. والكنيسة القبطية تطلب الوحدة في الإيمان المستقيم، وتصلي في كل قداس من أجل سلام "الكنيسة الواحدة الوحيدة المقدسة الجامعة الرسولية".'
        ),
      },
    ],
    verse: { text: b('"That they all may be one, as You, Father, are in Me, and I in You."', '"لِيَكُونَ الْجَمِيعُ وَاحِدًا، كَمَا أَنَّكَ أَنْتَ أَيُّهَا الآبُ فِيَّ وَأَنَا فِيكَ."'), ref: b('John 17:21', 'يوحنا ١٧: ٢١') },
    know: b(
      'Pope Shenouda III wrote a short book, "The Nature of Christ", explaining the Coptic faith about Christ in simple words. It is a great next step after this lesson.',
      'كتب البابا شنوده الثالث كتاباً صغيراً بعنوان "طبيعة المسيح" يشرح فيه إيمان الأقباط بالمسيح بكلمات بسيطة. وهو خطوة رائعة بعد هذا الدرس.'
    ),
    remember: [
      b('The Copts were wrongly called "Monophysites"', 'سُمّي الأقباط خطأً "مونوفيزيت"'),
      b('Agreements in 1973, 1989 and 1990 showed a shared faith in Christ', 'اتفاقات ١٩٧٣ و١٩٨٩ و١٩٩٠ أظهرت إيماناً مشتركاً بالمسيح'),
      b('Full communion is not yet restored; we pray for unity in truth', 'لم تعد الشركة الكاملة بعد، ونصلي من أجل الوحدة في الحق'),
    ],
    quiz: [
      q(['Where was the 1989 agreement reached?', 'أين تم اتفاق ١٩٨٩م؟'], ['The Monastery of St Bishoy', 'دير الأنبا بيشوي'], [["St Antony's Monastery", 'دير الأنبا أنطونيوس'], ['Rome', 'روما'], ['Nicaea', 'نيقية']]),
      q(['Which Pope signed a declaration with Pope Paul VI in 1973?', 'أي بابا وقّع إعلاناً مع البابا بولس السادس سنة ١٩٧٣م؟'], ['Pope Shenouda III', 'البابا شنوده الثالث'], [['Pope Kyrillos VI', 'البابا كيرلس السادس'], ['Pope Tawadros II', 'البابا تواضروس الثاني'], ['Pope Cyril IV', 'البابا كيرلس الرابع']]),
      q(['Why is "Monophysite" a wrong name for the Copts?', 'لماذا تسمية الأقباط "مونوفيزيت" خاطئة؟'], ["They never taught that Christ's humanity disappeared", 'لأنهم لم يعلّموا قط أن ناسوت المسيح تلاشى'], [['They believe in two persons', 'لأنهم يؤمنون بشخصين'], ['They reject the Trinity', 'لأنهم يرفضون الثالوث'], ['It is a Coptic word', 'لأنها كلمة قبطية']]),
      q(['Has full communion been restored?', 'هل عادت الشركة الكاملة؟'], ['Not yet', 'ليس بعد'], [['Yes, in 1989', 'نعم، سنة ١٩٨٩'], ['Yes, in 451', 'نعم، سنة ٤٥١'], ['It was never broken', 'لم تنقطع أبداً']]),
    ],
  },

  // ---- Unit 4: The fathers and our history ----
  {
    id: 'st-mark',
    unit: 'fathers',
    title: b('St Mark, Founder of Our Church', 'مارمرقس مؤسس كنيستنا'),
    hook: b(
      'When St Mark arrived in Alexandria, the strap of his sandal broke. The shoemaker who mended it became the first Coptic Christian.',
      'عندما وصل القديس مرقس إلى الإسكندرية انقطع سير حذائه، فصار الإسكافي الذي أصلحه أول مسيحي قبطي.'
    ),
    sections: [
      {
        heading: b('Who he was', 'من هو'),
        body: b(
          'St Mark wrote the second Gospel. Coptic tradition says he was born in Cyrene (in today\'s Libya), and that the upper room where Christ kept the Last Supper was in his mother\'s house (Acts 12:12). He travelled with St Paul and St Barnabas, and with St Peter.',
          'كتب القديس مرقس الإنجيل الثاني. ويقول التقليد القبطي إنه وُلد في القيروان (في ليبيا اليوم)، وإن العلية التي صنع فيها المسيح العشاء الأخير كانت في بيت أمه (أعمال ١٢: ١٢). وخدم مع القديسين بولس وبرنابا، ومع القديس بطرس.'
        ),
      },
      {
        heading: b('In Alexandria', 'في الإسكندرية'),
        body: b(
          'When Anianus the shoemaker hurt his hand mending Mark\'s sandal, he cried out, "God is one!" St Mark healed him and told him about the one God. Anianus believed and was baptized with his household, and later became the second Pope of Alexandria.',
          'عندما جرح إنيانوس الإسكافي يده وهو يصلح حذاء مرقس، صرخ: "يا الله الواحد!" فشفاه القديس مرقس وبشّره بالإله الواحد. فآمن إنيانوس واعتمد هو وأهل بيته، وصار فيما بعد البابا الثاني للإسكندرية.'
        ),
      },
      {
        heading: b('His martyrdom', 'استشهاده'),
        body: b(
          'In AD 68, as the Christians celebrated the Resurrection, pagan crowds seized St Mark and dragged him through the streets of Alexandria until he died a martyr. The Church celebrates him on 30 Baramoudah, and every Coptic Pope sits on his chair.',
          'في سنة ٦٨م، بينما كان المسيحيون يحتفلون بعيد القيامة، قبض الوثنيون على القديس مرقس وسحلوه في شوارع الإسكندرية حتى نال إكليل الشهادة. وتعيّد له الكنيسة في ٣٠ برموده، وكل بابا قبطي يجلس على كرسيه.'
        ),
      },
    ],
    verse: { text: b('"Go into all the world and preach the gospel to every creature."', '"اذْهَبُوا إِلَى الْعَالَمِ أَجْمَعَ وَاكْرِزُوا بِالإِنْجِيلِ لِلْخَلِيقَةِ كُلِّهَا."'), ref: b('Mark 16:15', 'مرقس ١٦: ١٥') },
    know: b(
      "St Mark's body was taken to Venice in AD 828. In 1968 part of his relics came back to Cairo, and they rest under St Mark's Cathedral in Abbassia.",
      'نُقل جسد القديس مرقس إلى البندقية سنة ٨٢٨م. وفي سنة ١٩٦٨م عاد جزء من رفاته إلى القاهرة، وهو موجود تحت الكاتدرائية المرقسية بالعباسية.'
    ),
    remember: [
      b('St Mark wrote the second Gospel and founded the Church of Egypt', 'كتب القديس مرقس الإنجيل الثاني وأسس كنيسة مصر'),
      b('Anianus the shoemaker was his first convert and the second Pope', 'إنيانوس الإسكافي أول من آمن على يده والبابا الثاني'),
      b('He was martyred in Alexandria in AD 68', 'استشهد في الإسكندرية سنة ٦٨م'),
    ],
    quiz: [
      q(['Who was St Mark\'s first convert in Alexandria?', 'من أول من آمن على يد القديس مرقس في الإسكندرية؟'], ['Anianus the shoemaker', 'إنيانوس الإسكافي'], [['Pantaenus', 'بنتينوس'], ['Clement', 'إكليمنضس'], ['Didymus the Blind', 'ديديموس الضرير']]),
      q(['What did Anianus cry out?', 'بماذا صرخ إنيانوس؟'], ['"God is one!"', '"يا الله الواحد!"'], [['"Lord have mercy!"', '"يا رب ارحم!"'], ['"Alleluia!"', '"هلليلويا!"'], ['"Help me, Mark!"', '"أعنّي يا مرقس!"']]),
      q(['When does the Church celebrate St Mark?', 'متى تعيّد الكنيسة للقديس مرقس؟'], ['30 Baramoudah', '٣٠ برموده'], [['1 Tout', '١ توت'], ['29 Kiahk', '٢٩ كيهك'], ['7 Bashans', '٧ بشنس']]),
      q(['When did part of his relics return to Cairo?', 'متى عاد جزء من رفاته إلى القاهرة؟'], ['1968', '١٩٦٨'], [['828', '٨٢٨'], ['1517', '١٥١٧'], ['2012', '٢٠١٢']]),
    ],
  },
  {
    id: 'school',
    unit: 'fathers',
    title: b('The School of Alexandria', 'مدرسة الإسكندرية'),
    hook: b(
      'Long before there were universities, Alexandria had a Christian school where people studied the Scriptures alongside philosophy and science.',
      'قبل أن توجد الجامعات بزمن طويل، كانت في الإسكندرية مدرسة مسيحية يدرس فيها الناس الكتاب المقدس مع الفلسفة والعلوم.'
    ),
    sections: [
      {
        heading: b('The first Christian school', 'أول مدرسة مسيحية'),
        body: b(
          'The Catechetical School of Alexandria taught new believers and trained teachers of the faith. St Jerome says St Mark himself founded it. It became the most famous centre of Christian learning in the world.',
          'كانت مدرسة الإسكندرية اللاهوتية تعلّم المؤمنين الجدد وتعدّ معلمي الإيمان، ويذكر القديس جيروم أن القديس مرقس نفسه أسسها. وصارت أشهر مركز للتعليم المسيحي في العالم.'
        ),
      },
      {
        heading: b('Its teachers', 'معلموها'),
        body: b(
          'Its deans included Pantaenus, who went on to preach in India; Clement of Alexandria, who showed that the faith is the true wisdom; and Didymus the Blind, who knew the Scriptures by heart. Popes Heraclas and Dionysius were also its deans.',
          'من عمدائها بنتينوس الذي ذهب ليبشر في الهند، وإكليمنضس السكندري الذي بيّن أن الإيمان هو الحكمة الحقيقية، وديديموس الضرير الذي حفظ الكتب المقدسة عن ظهر قلب. وكان البابا ياروكلاس والبابا ديونيسيوس من عمدائها أيضاً.'
        ),
      },
      {
        heading: b('A careful note', 'ملاحظة مهمة'),
        body: b(
          'Origen, its most famous teacher, wrote a great deal on the Bible, but some of his ideas were later rejected by the Church, and he is not counted among the saints. The school\'s lasting gift is its way of reading all of Scripture in the light of Christ.',
          'أوريجانوس، أشهر معلميها، كتب كثيراً في الكتاب المقدس، لكن الكنيسة رفضت لاحقاً بعض أفكاره، وهو ليس من القديسين. وعطية المدرسة الباقية هي طريقتها في قراءة الكتاب كله في نور المسيح.'
        ),
      },
    ],
    verse: { text: b('"The fear of the Lord is the beginning of wisdom, and the knowledge of the Holy One is understanding."', '"بَدْءُ الْحِكْمَةِ مَخَافَةُ الرَّبِّ، وَمَعْرِفَةُ الْقُدُّوسِ فَهْمٌ."'), ref: b('Proverbs 9:10', 'أمثال ٩: ١٠') },
    know: b(
      'Didymus the Blind is said to have read with letters carved in wood, more than a thousand years before Braille.',
      'يُقال إن ديديموس الضرير كان يقرأ بحروف محفورة في الخشب، قبل طريقة برايل بأكثر من ألف سنة.'
    ),
    remember: [
      b('The School of Alexandria was the first great school of Christian teaching', 'مدرسة الإسكندرية أول مدرسة كبرى للتعليم المسيحي'),
      b('Its deans included Pantaenus, Clement and Didymus the Blind', 'من عمدائها بنتينوس وإكليمنضس وديديموس الضرير'),
      b('It taught all of Scripture in the light of Christ', 'علّمت الكتاب المقدس كله في نور المسيح'),
    ],
    quiz: [
      q(['Who founded the School of Alexandria, according to St Jerome?', 'من أسس مدرسة الإسكندرية بحسب القديس جيروم؟'], ['St Mark', 'القديس مرقس'], [['St Athanasius', 'القديس أثناسيوس'], ['St Antony', 'الأنبا أنطونيوس'], ['Constantine', 'قسطنطين']]),
      q(['Which dean went to preach in India?', 'أي عميد ذهب ليبشر في الهند؟'], ['Pantaenus', 'بنتينوس'], [['Clement', 'إكليمنضس'], ['Didymus', 'ديديموس'], ['Heraclas', 'ياروكلاس']]),
      q(['Which dean was blind?', 'أي عميد كان ضريراً؟'], ['Didymus', 'ديديموس'], [['Pantaenus', 'بنتينوس'], ['Clement', 'إكليمنضس'], ['Dionysius', 'ديونيسيوس']]),
      q(['Which two deans became Popes of Alexandria?', 'أي عميدين صارا بابوين للإسكندرية؟'], ['Heraclas and Dionysius', 'ياروكلاس وديونيسيوس'], [['Clement and Origen', 'إكليمنضس وأوريجانوس'], ['Pantaenus and Didymus', 'بنتينوس وديديموس'], ['Arius and Alexander', 'آريوس وألكسندروس']]),
    ],
  },
  {
    id: 'athanasius',
    unit: 'fathers',
    title: b('St Athanasius the Apostolic', 'القديس أثناسيوس الرسولي'),
    hook: b(
      'There is a famous saying about him: "Athanasius against the world." When it seemed the whole empire had turned to Arius, he kept standing for the truth.',
      'هناك قول مشهور عنه: "أثناسيوس ضد العالم." فعندما بدا أن الإمبراطورية كلها مالت إلى آريوس، ظل ثابتاً على الحق.'
    ),
    sections: [
      {
        heading: b('A young defender', 'مدافع شاب'),
        body: b(
          'Athanasius was the deacon of Pope Alexander when he spoke for the faith at Nicaea in AD 325. Three years later, in 328, he became the 20th Pope of Alexandria, and he shepherded the Church for 45 years, until AD 373.',
          'كان أثناسيوس شماساً للبابا ألكسندروس حين دافع عن الإيمان في نيقية سنة ٣٢٥م. وبعد ثلاث سنوات، سنة ٣٢٨م، صار البابا العشرين للإسكندرية، ورعى الكنيسة ٤٥ سنة حتى سنة ٣٧٣م.'
        ),
      },
      {
        heading: b('Five exiles', 'خمس مرات منفياً'),
        body: b(
          'Emperors who favoured Arius drove him from his see five times, as the Synaxarium tells. He hid in the desert among the monks, kept writing, and always came back to his people, who loved him.',
          'طرده الأباطرة الذين ناصروا آريوس من كرسيه خمس مرات كما يذكر السنكسار. فاختبأ في البرية بين الرهبان، وظل يكتب، وكان يعود دائماً إلى شعبه الذي أحبه.'
        ),
      },
      {
        heading: b('His writings', 'كتاباته'),
        body: b(
          'He wrote "On the Incarnation"; the "Life of St Antony", which spread monasticism around the world; and the Festal Letter of 367 that listed the New Testament books. The Church calls him "the Apostolic" and celebrates him on 7 Bashans.',
          'كتب "تجسد الكلمة"، و"حياة الأنبا أنطونيوس" التي نشرت الرهبنة في العالم، والرسالة الفصحية سنة ٣٦٧م التي ذكرت أسفار العهد الجديد. وتلقّبه الكنيسة بـ"الرسولي" وتعيّد له في ٧ بشنس.'
        ),
      },
    ],
    verse: { text: b('"Contend earnestly for the faith which was once for all delivered to the saints."', '"أَنْ تَجْتَهِدُوا لأَجْلِ الإِيمَانِ الْمُسَلَّمِ مَرَّةً لِلْقِدِّيسِينَ."'), ref: b('Jude 3', 'يهوذا ٣') },
    know: b(
      'St Augustine tells in his "Confessions" that hearing the story of St Antony, from the life St Athanasius wrote, helped move him to give his whole life to God.',
      'يحكي القديس أغسطينوس في "اعترافاته" أن سماعه قصة الأنبا أنطونيوس، من السيرة التي كتبها القديس أثناسيوس، دفعه إلى تسليم حياته كلها لله.'
    ),
    remember: [
      b("He defended Christ's divinity at Nicaea as a deacon", 'دافع عن لاهوت المسيح في نيقية وهو شماس'),
      b('He was the 20th Pope and was exiled five times', 'كان البابا العشرين ونُفي خمس مرات'),
      b('He wrote On the Incarnation and the Life of St Antony', 'كتب تجسد الكلمة وحياة الأنبا أنطونيوس'),
    ],
    quiz: [
      q(['Which Pope of Alexandria was St Athanasius?', 'ما رقم القديس أثناسيوس بين باباوات الإسكندرية؟'], ['The 20th', 'العشرون'], [['The 17th', 'السابع عشر'], ['The 24th', 'الرابع والعشرون'], ['The 25th', 'الخامس والعشرون']]),
      q(['How many times was he exiled, as the Synaxarium tells?', 'كم مرة نُفي كما يذكر السنكسار؟'], ['Five', 'خمس مرات'], [['Twice', 'مرتين'], ['Seven', 'سبع مرات'], ['Never', 'لم يُنفَ']]),
      q(['Which of his books spread monasticism?', 'أي كتبه نشر الرهبنة؟'], ['The Life of St Antony', 'حياة الأنبا أنطونيوس'], [['On the Incarnation', 'تجسد الكلمة'], ['The Tome of Leo', 'طومس لاون'], ['The Twelve Anathemas', 'الحرومات الاثنا عشر']]),
      q(['When does the Church celebrate St Athanasius?', 'متى تعيّد الكنيسة للقديس أثناسيوس؟'], ['7 Bashans', '٧ بشنس'], [['30 Baramoudah', '٣٠ برموده'], ['1 Tout', '١ توت'], ['3 Abib', '٣ أبيب']]),
    ],
  },
  {
    id: 'desert-fathers',
    unit: 'fathers',
    title: b('St Antony and the Desert Fathers', 'الأنبا أنطونيوس وآباء البرية'),
    hook: b(
      'A rich young Egyptian heard one Gospel verse in church and walked out of his old life for good. Thousands followed him into the desert.',
      'سمع شاب مصري غني آية واحدة من الإنجيل في الكنيسة، فترك حياته القديمة إلى الأبد. وتبعه الآلاف إلى البرية.'
    ),
    sections: [
      {
        heading: b('St Antony', 'الأنبا أنطونيوس'),
        body: b(
          'As a young man Antony heard the Gospel, "If you want to be perfect, go, sell what you have and give to the poor" (Matthew 19:21). He obeyed and went into the desert to pray. He lived to 105, and the Church calls him the father of all monks.',
          'سمع أنطونيوس في شبابه الإنجيل: "إِنْ أَرَدْتَ أَنْ تَكُونَ كَامِلاً فَاذْهَبْ وَبعْ أَمْلاَكَكَ وَأَعْطِ الْفُقَرَاءَ" (متى ١٩: ٢١). فأطاع وخرج إلى البرية ليصلي، وعاش ١٠٥ سنوات، وتلقّبه الكنيسة بأب جميع الرهبان.'
        ),
      },
      {
        heading: b('Three ways of desert life', 'ثلاث طرق للحياة في البرية'),
        body: b(
          'St Antony lived as a hermit, with disciples around him. St Pachomius began the life in community, with monks living under one rule. St Macarius the Great gathered monks in the desert of Scetis (Wadi El Natrun), where monasteries still stand today.',
          'عاش الأنبا أنطونيوس متوحداً وحوله تلاميذه، وأسس الأنبا باخوميوس حياة الشركة حيث يعيش الرهبان معاً تحت قانون واحد، وجمع الأنبا مقار الكبير الرهبان في برية شيهيت (وادي النطرون) حيث ما زالت الأديرة قائمة اليوم.'
        ),
      },
      {
        heading: b('Wisdom of the desert', 'حكمة البرية'),
        body: b(
          'The sayings of the desert fathers are short and deep. St Antony taught his disciples: "Wherever you go, always have God before your eyes."',
          'أقوال آباء البرية قصيرة وعميقة. علّم الأنبا أنطونيوس تلاميذه: "أينما ذهبت، ضع الله دائماً أمام عينيك."'
        ),
      },
    ],
    verse: {
      text: b('"If you want to be perfect, go, sell what you have and give to the poor, and you will have treasure in heaven; and come, follow Me."', '"إِنْ أَرَدْتَ أَنْ تَكُونَ كَامِلاً فَاذْهَبْ وَبعْ أَمْلاَكَكَ وَأَعْطِ الْفُقَرَاءَ، فَيَكُونَ لَكَ كَنْزٌ فِي السَّمَاءِ، وَتَعَالَ اتْبَعْنِي."'),
      ref: b('Matthew 19:21', 'متى ١٩: ٢١'),
    },
    know: b(
      "St Antony's monastery near the Red Sea is one of the oldest Christian monasteries in the world still in use.",
      'دير الأنبا أنطونيوس قرب البحر الأحمر من أقدم الأديرة المسيحية في العالم التي ما زالت عامرة.'
    ),
    remember: [
      b('St Antony is the father of all monks', 'الأنبا أنطونيوس أب جميع الرهبان'),
      b('St Pachomius began monastic life in community', 'الأنبا باخوميوس أسس حياة الشركة'),
      b('St Macarius gathered monks in Scetis (Wadi El Natrun)', 'الأنبا مقار جمع الرهبان في شيهيت (وادي النطرون)'),
    ],
    quiz: [
      q(['Which verse led St Antony to the desert?', 'أي آية قادت الأنبا أنطونيوس إلى البرية؟'], ['"Go, sell what you have and give to the poor"', '"اذهب وبع أملاكك وأعط الفقراء"'], [['"In the beginning God created"', '"في البدء خلق الله"'], ['"The Lord is my shepherd"', '"الرب راعيّ"'], ['"I am the light of the world"', '"أنا هو نور العالم"']]),
      q(['Who began monastic life in community?', 'من أسس حياة الشركة الرهبانية؟'], ['St Pachomius', 'الأنبا باخوميوس'], [['St Antony', 'الأنبا أنطونيوس'], ['St Athanasius', 'القديس أثناسيوس'], ['St Mark', 'القديس مرقس']]),
      q(['Where did St Macarius gather monks?', 'أين جمع الأنبا مقار الرهبان؟'], ['Scetis (Wadi El Natrun)', 'شيهيت (وادي النطرون)'], [['Sinai', 'سيناء'], ['Jerusalem', 'أورشليم'], ['Rome', 'روما']]),
      q(['How old was St Antony when he departed?', 'كم كان عمر الأنبا أنطونيوس عند نياحته؟'], ['105', '١٠٥'], [['33', '٣٣'], ['70', '٧٠'], ['150', '١٥٠']]),
    ],
  },
  {
    id: 'cyril',
    unit: 'fathers',
    title: b('St Cyril, Pillar of Faith', 'القديس كيرلس عمود الدين'),
    hook: b(
      'One Pope of Alexandria is simply called "the Pillar of Faith". When the question of who Christ is hung in the balance, he held it up.',
      'أحد باباوات الإسكندرية يُلقّب ببساطة "عمود الدين". فحين صار السؤال عن حقيقة المسيح على المحك، كان هو السند.'
    ),
    sections: [
      {
        heading: b('Pope of Alexandria', 'بابا الإسكندرية'),
        body: b(
          'St Cyril was the nephew of Pope Theophilus, and became the 24th Pope in AD 412. In his youth he studied the Scriptures and the fathers deeply, and lived for a time among the monks of the desert.',
          'كان القديس كيرلس ابن أخت البابا ثاوفيلس، وصار البابا الرابع والعشرين سنة ٤١٢م. ودرس في شبابه الكتب المقدسة وأقوال الآباء بعمق، وعاش فترة بين رهبان البرية.'
        ),
      },
      {
        heading: b("Defender of Christ's oneness", 'المدافع عن وحدانية المسيح'),
        body: b(
          'When Nestorius divided Christ into two, St Cyril wrote letters, books and the Twelve Anathemas, and led the Council of Ephesus in 431. His teaching, "one nature of God the Word incarnate", is the heart of the Coptic faith about Christ.',
          'عندما قسم نسطور المسيح إلى اثنين، كتب القديس كيرلس الرسائل والكتب والحرومات الاثني عشر، ورأس مجمع أفسس سنة ٤٣١م. وتعليمه "طبيعة واحدة لله الكلمة المتجسد" هو قلب الإيمان القبطي بالمسيح.'
        ),
      },
      {
        heading: b('Teacher of the Bible', 'مفسّر الكتاب'),
        body: b(
          'He wrote long commentaries on the Gospel of John and other books of the Bible. He departed in AD 444, and the Church celebrates him on 3 Abib.',
          'كتب تفاسير طويلة لإنجيل يوحنا ولأسفار أخرى. وتنيّح سنة ٤٤٤م، وتعيّد له الكنيسة في ٣ أبيب.'
        ),
      },
    ],
    verse: { text: b('"And without controversy great is the mystery of godliness: God was manifested in the flesh."', '"وَبِالإِجْمَاعِ عَظِيمٌ هُوَ سِرُّ التَّقْوَى: اللهُ ظَهَرَ فِي الْجَسَدِ."'), ref: b('1 Timothy 3:16', '١ تيموثاوس ٣: ١٦') },
    know: b(
      'The third Coptic Liturgy carries St Cyril\'s name: it is the Liturgy of St Mark, as St Cyril wrote it down.',
      'القداس القبطي الثالث يحمل اسم القديس كيرلس: وهو قداس القديس مرقس كما دوّنه القديس كيرلس.'
    ),
    remember: [
      b('St Cyril was the 24th Pope of Alexandria', 'القديس كيرلس البابا الرابع والعشرون'),
      b('He led the Council of Ephesus against Nestorius', 'رأس مجمع أفسس ضد نسطور'),
      b('His words: one nature of God the Word incarnate', 'عبارته: طبيعة واحدة لله الكلمة المتجسد'),
    ],
    quiz: [
      q(['What title does the Church give St Cyril?', 'بماذا تلقّب الكنيسة القديس كيرلس؟'], ['Pillar of Faith', 'عمود الدين'], [['The Apostolic', 'الرسولي'], ['Seal of the Martyrs', 'خاتم الشهداء'], ['Father of Reform', 'أبو الإصلاح']]),
      q(["Who was St Cyril's uncle?", 'من كان خال القديس كيرلس؟'], ['Pope Theophilus', 'البابا ثاوفيلس'], [['Pope Alexander', 'البابا ألكسندروس'], ['St Athanasius', 'القديس أثناسيوس'], ['Pope Timothy', 'البابا تيموثاوس']]),
      q(['Which Liturgy carries his name?', 'أي قداس يحمل اسمه؟'], ['The Liturgy of St Mark, as he wrote it down', 'قداس القديس مرقس كما دوّنه'], [["St Basil's", 'القداس الباسيلي'], ["St Gregory's", 'القداس الغريغوري'], ["St James's", 'قداس القديس يعقوب']]),
      q(['When does the Church celebrate St Cyril?', 'متى تعيّد الكنيسة للقديس كيرلس؟'], ['3 Abib', '٣ أبيب'], [['7 Bashans', '٧ بشنس'], ['30 Baramoudah', '٣٠ برموده'], ['1 Tout', '١ توت']]),
    ],
  },
  {
    id: 'shenouda',
    unit: 'fathers',
    title: b('St Shenouda the Archimandrite', 'الأنبا شنوده رئيس المتوحدين'),
    hook: b(
      'Near Sohag stands the White Monastery, its walls built like a fortress. Its abbot led thousands of monks and nuns, and wrote some of the finest Coptic ever written.',
      'قرب سوهاج يقف الدير الأبيض بأسواره التي تشبه الحصن. ورئيسه قاد آلاف الرهبان والراهبات، وكتب من أروع ما كُتب بالقبطية.'
    ),
    sections: [
      {
        heading: b('A leader of monks', 'قائد الرهبان'),
        body: b(
          'St Shenouda became head of the White Monastery near Sohag. Under him the monasteries grew to thousands of monks and nuns, living by a strict rule of prayer, work and care for the poor.',
          'صار الأنبا شنوده رئيساً للدير الأبيض قرب سوهاج، وفي عهده بلغ عدد الرهبان والراهبات الآلاف، يعيشون بقانون صارم من الصلاة والعمل ورعاية الفقراء.'
        ),
      },
      {
        heading: b('Defender and teacher', 'مدافع ومعلّم'),
        body: b(
          'He went with St Cyril to the Council of Ephesus in AD 431. At home he preached against idol worship and stood up for the poor farmers of Upper Egypt against the powerful.',
          'رافق القديس كيرلس إلى مجمع أفسس سنة ٤٣١م. وفي بلده وعظ ضد عبادة الأوثان، ودافع عن فلاحي الصعيد الفقراء أمام الأقوياء.'
        ),
      },
      {
        heading: b('A Coptic writer', 'كاتب قبطي'),
        body: b(
          'His sermons and letters, written in Sahidic Coptic, are among the greatest works of Coptic literature. He departed at a very great age, and the Church celebrates him on 7 Abib.',
          'عظاته ورسائله المكتوبة باللهجة القبطية الصعيدية من أعظم أعمال الأدب القبطي. وتنيّح في شيخوخة عظيمة جداً، وتعيّد له الكنيسة في ٧ أبيب.'
        ),
      },
    ],
    verse: {
      text: b('"He has shown you, O man, what is good; and what does the Lord require of you but to do justly, to love mercy, and to walk humbly with your God?"', '"قَدْ أَخْبَرَكَ أَيُّهَا الإِنْسَانُ مَا هُوَ صَالِحٌ، وَمَاذَا يَطْلُبُهُ مِنْكَ الرَّبُّ، إِلاَّ أَنْ تَصْنَعَ الْحَقَّ وَتُحِبَّ الرَّحْمَةَ، وَتَسْلُكَ مُتَوَاضِعًا مَعَ إِلهِكَ."'),
      ref: b('Micah 6:8', 'ميخا ٦: ٨'),
    },
    know: b(
      'The church of the White Monastery still stands after more than 1,500 years, and some of its stones came from ancient Egyptian temples.',
      'ما زالت كنيسة الدير الأبيض قائمة بعد أكثر من ١٥٠٠ سنة، وبعض حجارتها جاء من معابد مصرية قديمة.'
    ),
    remember: [
      b('St Shenouda led the White Monastery near Sohag', 'الأنبا شنوده رئيس الدير الأبيض قرب سوهاج'),
      b('He went with St Cyril to Ephesus', 'رافق القديس كيرلس إلى أفسس'),
      b('His writings are treasures of Coptic literature', 'كتاباته كنوز الأدب القبطي'),
    ],
    quiz: [
      q(['Which monastery did St Shenouda lead?', 'أي دير رأسه الأنبا شنوده؟'], ['The White Monastery near Sohag', 'الدير الأبيض قرب سوهاج'], [["St Antony's Monastery", 'دير الأنبا أنطونيوس'], ["St Macarius' Monastery", 'دير الأنبا مقار'], ["St Mina's Monastery", 'دير مارمينا']]),
      q(['Which council did he attend with St Cyril?', 'أي مجمع حضره مع القديس كيرلس؟'], ['Ephesus', 'أفسس'], [['Nicaea', 'نيقية'], ['Chalcedon', 'خلقيدونية'], ['Constantinople', 'القسطنطينية']]),
      q(['In which dialect did he write?', 'بأي لهجة كتب؟'], ['Sahidic Coptic', 'القبطية الصعيدية'], [['Bohairic Coptic', 'القبطية البحيرية'], ['Latin', 'اللاتينية'], ['Arabic', 'العربية']]),
      q(['What does "Archimandrite" mean here?', 'ما معنى "رئيس المتوحدين"؟'], ['Head of the monks', 'رئيس الرهبان'], [['Bishop of a city', 'أسقف مدينة'], ['A deacon', 'شماس'], ['A martyr', 'شهيد']]),
    ],
  },
  {
    id: 'martyrs',
    unit: 'fathers',
    title: b('The Church of the Martyrs', 'كنيسة الشهداء'),
    hook: b(
      'Few churches count their years by their martyrs. The Coptic Church does: its calendar is "the Year of the Martyrs".',
      'قليلة هي الكنائس التي تعدّ سنواتها بشهدائها. والكنيسة القبطية تفعل ذلك: فتقويمها هو "سنة الشهداء".'
    ),
    sections: [
      {
        heading: b('A great cloud', 'سحابة عظيمة'),
        body: b(
          'Under Diocletian, Egypt gave a huge number of martyrs: soldiers, mothers, children, bishops and monks. Rather than deny Christ, they accepted torture and death with joy.',
          'في عهد دقلديانوس قدّمت مصر عدداً هائلاً من الشهداء: جنوداً وأمهات وأطفالاً وأساقفة ورهباناً. وبدل أن ينكروا المسيح قبلوا العذاب والموت بفرح.'
        ),
      },
      {
        heading: b('Martyrs we sing to', 'شهداء نمدحهم'),
        body: b(
          'Our hymns honour many of them: St George, the Prince of Martyrs; St Mina, the wonderworker of Mariout; St Philopater Mercurius (Abu Sefein); and St Demiana with the forty virgins who were martyred with her.',
          'تمدح ألحاننا كثيرين منهم: مارجرجس أمير الشهداء، ومارمينا العجايبي في مريوط، وفيلوباتير مرقوريوس (أبي سيفين)، والقديسة دميانة والأربعين عذراء اللواتي استشهدن معها.'
        ),
      },
      {
        heading: b('Martyrs today', 'شهداء في أيامنا'),
        body: b(
          'Martyrdom is not only history. In February 2015, twenty-one Christians (twenty Egyptian Copts and a companion from Ghana) were killed in Libya for refusing to deny Christ. Pope Tawadros II added them to the Synaxarium, on 8 Amshir.',
          'الاستشهاد ليس تاريخاً فقط. ففي فبراير ٢٠١٥ قُتل واحد وعشرون مسيحياً (عشرون قبطياً مصرياً ورفيق من غانا) في ليبيا لرفضهم إنكار المسيح. وأضافهم البابا تواضروس الثاني إلى السنكسار في ٨ أمشير.'
        ),
      },
    ],
    verse: {
      text: b('"Therefore whoever confesses Me before men, him I will also confess before My Father who is in heaven."', '"فَكُلُّ مَنْ يَعْتَرِفُ بِي قُدَّامَ النَّاسِ أَعْتَرِفُ أَنَا أَيْضًا بِهِ قُدَّامَ أَبِي الَّذِي فِي السَّمَاوَاتِ."'),
      ref: b('Matthew 10:32', 'متى ١٠: ٣٢'),
    },
    know: b(
      'At El Nayrouz Copts traditionally eat red dates: red outside for the martyrs\' blood, white inside for their pure hearts, with a hard stone for their firm faith.',
      'في عيد النيروز يأكل الأقباط البلح الأحمر تقليدياً: أحمر من الخارج رمزاً لدم الشهداء، وأبيض من الداخل رمزاً لقلوبهم النقية، ونواته الصلبة رمز لإيمانهم الثابت.'
    ),
    remember: [
      b('The Coptic calendar counts its years from the martyrs (AD 284)', 'التقويم القبطي يعدّ سنواته من الشهداء (٢٨٤م)'),
      b('St George, St Mina, St Mercurius and St Demiana are among our martyrs', 'مارجرجس ومارمينا وأبو سيفين والقديسة دميانة من شهدائنا'),
      b('The 21 martyrs of Libya (2015) are in the Synaxarium on 8 Amshir', 'شهداء ليبيا الـ٢١ (٢٠١٥) في السنكسار يوم ٨ أمشير'),
    ],
    quiz: [
      q(['Who is called the Prince of Martyrs?', 'من الملقّب بأمير الشهداء؟'], ['St George', 'مارجرجس'], [['St Mina', 'مارمينا'], ['St Mark', 'القديس مرقس'], ['St Antony', 'الأنبا أنطونيوس']]),
      q(['Who was martyred with forty virgins?', 'من استشهدت مع أربعين عذراء؟'], ['St Demiana', 'القديسة دميانة'], [['St Marina', 'القديسة مارينا'], ['St Elizabeth', 'القديسة أليصابات'], ['St Verena', 'القديسة فيرينا']]),
      q(['On which day does the Synaxarium remember the 21 martyrs of Libya?', 'في أي يوم يذكر السنكسار شهداء ليبيا الـ٢١؟'], ['8 Amshir', '٨ أمشير'], [['1 Tout', '١ توت'], ['29 Kiahk', '٢٩ كيهك'], ['30 Baramoudah', '٣٠ برموده']]),
      q(['What do the red dates of El Nayrouz recall?', 'بماذا يذكّرنا البلح الأحمر في النيروز؟'], ["The martyrs' blood and pure hearts", 'بدم الشهداء وقلوبهم النقية'], [['The Nile flood', 'بفيضان النيل'], ['The burning bush', 'بالعليقة المشتعلة'], ['The Red Sea', 'بالبحر الأحمر']]),
    ],
  },
  {
    id: 'modern',
    unit: 'fathers',
    title: b('The Coptic Church Today', 'الكنيسة القبطية في عصرنا'),
    hook: b(
      'A Church almost two thousand years old, still singing in the language of ancient Egypt, now has churches from Sydney to Seattle. How did it get here?',
      'كنيسة عمرها نحو ألفي سنة، ما زالت ترتل بلغة مصر القديمة، صارت لها كنائس من سيدني إلى سياتل. فكيف وصلت إلى هنا؟'
    ),
    sections: [
      {
        heading: b('Faithful through the centuries', 'أمينة عبر القرون'),
        body: b(
          'After the Arab conquest of Egypt (AD 639–641), the Copts lived through long periods of hardship. Arabic slowly became the everyday language, but the Church kept its faith, its Liturgy and the Coptic language of its hymns.',
          'بعد دخول العرب مصر (٦٣٩–٦٤١م) عاش الأقباط فترات طويلة من الضيق. وصارت العربية تدريجياً لغة الحياة اليومية، لكن الكنيسة حفظت إيمانها وطقسها واللغة القبطية في ألحانها.'
        ),
      },
      {
        heading: b('Renewal', 'نهضة'),
        body: b(
          'In the 1850s Pope Cyril IV, the "Father of Reform", opened schools, including schools for girls, and brought in a printing press. In the twentieth century St Habib Girgis led the Sunday School movement, which renewed the whole Church; the Holy Synod declared him a saint in 2013.',
          'في خمسينيات القرن التاسع عشر فتح البابا كيرلس الرابع "أبو الإصلاح" مدارس، منها مدارس للبنات، وأدخل المطبعة. وفي القرن العشرين قاد القديس حبيب جرجس حركة مدارس الأحد التي جددت الكنيسة كلها، وأعلن المجمع المقدس قداسته سنة ٢٠١٣م.'
        ),
      },
      {
        heading: b('Our time', 'زماننا'),
        body: b(
          'Pope Kyrillos VI (1959–1971) brought a revival of prayer, and in 1968 received St Mark\'s relics. Pope Shenouda III (1971–2012) taught a whole generation and planted churches across the world. Today Pope Tawadros II, the 118th Pope, shepherds Copts in Egypt and on every continent.',
          'جاء البابا كيرلس السادس (١٩٥٩–١٩٧١) بنهضة صلاة، واستقبل رفات القديس مرقس سنة ١٩٦٨م. وعلّم البابا شنوده الثالث (١٩٧١–٢٠١٢) جيلاً كاملاً وأسس كنائس في أنحاء العالم. واليوم يرعى البابا تواضروس الثاني، البابا الـ١١٨، الأقباط في مصر وفي كل القارات.'
        ),
      },
    ],
    verse: {
      text: b('"On this rock I will build My church, and the gates of Hades shall not prevail against it."', '"وَعَلَى هذِهِ الصَّخْرَةِ أَبْنِي كَنِيسَتِي، وَأَبْوَابُ الْجَحِيمِ لَنْ تَقْوَى عَلَيْهَا."'),
      ref: b('Matthew 16:18', 'متى ١٦: ١٨'),
    },
    know: b(
      'In 1968, for months, crowds saw St Mary appear in light over her church in Zeitoun, Cairo. The Patriarchate under Pope Kyrillos VI confirmed the apparitions.',
      'في سنة ١٩٦٨م، ولشهور، رأت الجموع العذراء مريم تظهر في نور فوق كنيستها بالزيتون في القاهرة، وأكدت البطريركية في عهد البابا كيرلس السادس هذه الظهورات.'
    ),
    remember: [
      b('The Copts kept their faith and Liturgy through long hardship', 'حفظ الأقباط إيمانهم وطقسهم عبر ضيقات طويلة'),
      b('Pope Cyril IV and St Habib Girgis led great renewals', 'البابا كيرلس الرابع والقديس حبيب جرجس قادا نهضات عظيمة'),
      b('Pope Tawadros II is the 118th Pope of Alexandria', 'البابا تواضروس الثاني هو البابا الـ١١٨ للإسكندرية'),
    ],
    quiz: [
      q(['Who is called the Father of Reform?', 'من الملقّب بأبي الإصلاح؟'], ['Pope Cyril IV', 'البابا كيرلس الرابع'], [['Pope Kyrillos VI', 'البابا كيرلس السادس'], ['Pope Shenouda III', 'البابا شنوده الثالث'], ['St Athanasius', 'القديس أثناسيوس']]),
      q(['Who led the Sunday School movement?', 'من قاد حركة مدارس الأحد؟'], ['St Habib Girgis', 'القديس حبيب جرجس'], [['Pope Cyril IV', 'البابا كيرلس الرابع'], ['St Antony', 'الأنبا أنطونيوس'], ['Pope Tawadros II', 'البابا تواضروس الثاني']]),
      q(["In which year did St Mark's relics return and St Mary appear at Zeitoun?", 'في أي سنة عادت رفات القديس مرقس وظهرت العذراء بالزيتون؟'], ['1968', '١٩٦٨'], [['1854', '١٨٥٤'], ['1971', '١٩٧١'], ['2012', '٢٠١٢']]),
      q(['Which number Pope is Pope Tawadros II?', 'ما رقم البابا تواضروس الثاني؟'], ['118th', 'الـ١١٨'], [['116th', 'الـ١١٦'], ['117th', 'الـ١١٧'], ['120th', 'الـ١٢٠']]),
    ],
  },
];
