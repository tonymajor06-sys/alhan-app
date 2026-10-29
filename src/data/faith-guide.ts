import { Bilingual, GuideQuestion, GuideSection, buildQuiz } from './deacon-guide';
import { QuizQuestion } from './quiz';

// Our Faith: Coptic Church history, the councils and what the Church believes, in both app languages.
// Checked against Coptic Orthodox sources (2026-10-20), listed in the last section, "Sources". Spirit & Truth wins where
// it says something (the Creed's words are its own), then an Arabic original over its English translation: the Patriarchate's
// copticorthodox.church (its Arabic history page), the Metropolis of the Southern US (suscopts.org), the Synaxarium, Pope Shenouda III's
// "The Nature of Christ" and Metropolitan Bishoy's record of the dialogue. Base any change on them too.

export const faithStrings = {
  en: {
    title: 'Our Faith',
    subtitle: 'Coptic history, the councils and what we believe',
    quizTitle: 'Quiz',
    quizDesc: 'Test what you know about our faith',
    correct: 'Correct!',
    wrongAnswer: (answer: string) => `The answer is: ${answer}`,
    next: 'Next',
    seeScore: 'See score',
    score: (right: string, total: string) => `${right} out of ${total}`,
    scoreGreat: 'Excellent! You know your faith well.',
    scoreGood: 'Good work. Another round will make it stick.',
    scoreKeepGoing: 'Keep going. Read through the sections and try again.',
    playAgain: 'New round',
  },
  ar: {
    title: 'إيماننا',
    subtitle: 'تاريخ الكنيسة القبطية والمجامع وعقيدتنا',
    quizTitle: 'اختبار',
    quizDesc: 'اختبر معرفتك بإيمانك',
    correct: 'إجابة صحيحة!',
    wrongAnswer: (answer: string) => `الإجابة هي: ${answer}`,
    next: 'التالي',
    seeScore: 'النتيجة',
    score: (right: string, total: string) => `${right} من ${total}`,
    scoreGreat: 'ممتاز! أنت تعرف إيمانك جيداً.',
    scoreGood: 'عمل جيد. جولة أخرى ستثبّت ما تعلمته.',
    scoreKeepGoing: 'استمر. اقرأ الأقسام وحاول مرة أخرى.',
    playAgain: 'جولة جديدة',
  },
};

export const faithSections: GuideSection[] = [
  {
    id: 'history',
    icon: '☩',
    title: { en: 'Our History', ar: 'تاريخنا' },
    desc: { en: 'From St Mark to today', ar: 'من القديس مرقس إلى اليوم' },
    items: [
      {
        title: { en: 'The Holy Family in Egypt', ar: 'العائلة المقدسة في مصر' },
        text: {
          en: 'The Lord Jesus came to Egypt as a child with St Mary and St Joseph, fleeing from Herod (Matthew 2:13–15). Isaiah had foretold it: "Blessed is Egypt My people" (Isaiah 19:25). The Church remembers their arrival on the 24th of Pashons.',
          ar: 'جاء الرب يسوع إلى مصر طفلاً مع القديسة مريم والقديس يوسف هرباً من هيرودس (متى ٢: ١٣–١٥). وقد تنبأ إشعياء قائلاً: "مبارك شعبي مصر" (إشعياء ١٩: ٢٥). وتذكر الكنيسة دخولهم مصر في ٢٤ بشنس.',
        },
      },
      {
        title: { en: 'St Mark the Apostle', ar: 'القديس مرقس الرسول' },
        text: {
          en: 'St Mark, the writer of the second Gospel, came to Alexandria in the middle of the first century (about AD 43 by Eusebius and the History of the Patriarchs; others say AD 61) and founded the Church of Egypt. His first convert was Anianus, a shoemaker, whom he ordained bishop and who succeeded him as the second Pope. St Mark was martyred in Alexandria in AD 68. Every Coptic Pope sits on "the Chair of St Mark".',
          ar: 'جاء القديس مرقس، كاتب الإنجيل الثاني، إلى الإسكندرية في منتصف القرن الأول (نحو سنة ٤٣م بحسب يوسابيوس القيصري وتاريخ البطاركة، وترجّح مراجع أخرى سنة ٦١م) وأسس كنيسة مصر. وكان أول من آمن على يديه إنيانوس الإسكافي، فرسمه أسقفاً، وخلفه بعد استشهاده فصار البابا الثاني. واستشهد القديس مرقس في الإسكندرية سنة ٦٨م. وكل بابا قبطي يجلس على "كرسي مارمرقس".',
        },
      },
      {
        title: { en: 'The School of Alexandria', ar: 'مدرسة الإسكندرية' },
        text: {
          en: 'The Catechetical School of Alexandria was the first great school of Christian teaching; St Jerome says St Mark himself founded it. Its deans included Athenagoras, Pantaenus and Clement of Alexandria, and later Pope Heraclas and Pope Dionysius. It taught the faith to the whole world and prepared many of the Church\'s leaders.',
          ar: 'كانت مدرسة الإسكندرية اللاهوتية أول مدرسة مسيحية كبرى للتعليم، ويذكر القديس جيروم أن القديس مرقس نفسه أسسها. ومن عمدائها أثيناغوراس وبنتينوس وإكليمنضس السكندري، ثم البابا ياروكلاس والبابا ديونيسيوس. علّمت الإيمان للعالم كله وأعدّت كثيرين من قادة الكنيسة.',
        },
      },
      {
        title: { en: 'The Era of the Martyrs', ar: 'عصر الشهداء' },
        text: {
          en: 'Under the Roman emperor Diocletian, a huge number of Copts were martyred for Christ. The Church honours them so much that the Coptic calendar counts its years from AD 284, the year Diocletian came to power. These are the "Years of the Martyrs" (Anno Martyrum, A.M.).',
          ar: 'في عهد الإمبراطور الروماني دقلديانوس استشهد عدد كبير جداً من الأقباط من أجل المسيح. وتكرّمهم الكنيسة حتى إن التقويم القبطي يبدأ سنواته من سنة ٢٨٤م، سنة تولّي دقلديانوس الحكم. وهي "سنة الشهداء".',
        },
      },
      {
        title: { en: 'The Birthplace of Monasticism', ar: 'مهد الرهبنة' },
        text: {
          en: 'Monastic life began in the deserts of Egypt. St Antony the Great is the father of all monks. St Pachomius began monasteries where monks live together under one rule, and St Macarius the Great gathered monks in the desert of Scetis (Wadi El Natrun). From Egypt, monasticism spread to the whole world.',
          ar: 'بدأت الحياة الرهبانية في براري مصر. فالقديس الأنبا أنطونيوس الكبير هو أب جميع الرهبان، والقديس الأنبا باخوميوس أسس نظام الشركة حيث يعيش الرهبان معاً تحت قانون واحد، والقديس الأنبا مقار الكبير جمع الرهبان في برية شيهيت (وادي النطرون). ومن مصر انتشرت الرهبنة إلى العالم كله.',
        },
      },
      {
        title: { en: 'The Great Ecumenical Councils', ar: 'المجامع المسكونية الكبرى' },
        text: {
          en: 'During the golden age of the Church, the Patriarchate of Alexandria led all of Christendom in defending the Orthodox faith. At Nicaea (AD 325), St Athanasius defended the divinity of Christ against Arius. At Constantinople (AD 381), Pope Timothy presided over the fathers who affirmed the divinity of the Holy Spirit. At Ephesus (AD 431), St Cyril the Great defended the oneness of Christ and St Mary as the Theotokos. The Coptic Church accepts these three councils only. At the fourth, Chalcedon (AD 451), which the Coptic Church does not accept, St Dioscorus championed the Cyrillian faith, suffering exile rather than compromising the true confession of Christ\'s one incarnate nature.',
          ar: 'خلال العصر الذهبي للكنيسة قادت بطريركية الإسكندرية العالم المسيحي كله في الدفاع عن الإيمان المستقيم. ففي مجمع نيقية (٣٢٥م) دافع القديس أثناسيوس عن لاهوت المسيح ضد آريوس. وفي القسطنطينية (٣٨١م) رأس البابا تيموثاوس الآباء الذين أكدوا لاهوت الروح القدس. وفي أفسس (٤٣١م) دافع القديس كيرلس الكبير عن وحدانية طبيعة المسيح ولقب والدة الإله (الثيئوطوكوس). والكنيسة القبطية تقبل هذه المجامع الثلاثة فقط. وفي المجمع الرابع بخلقيدونية (٤٥١م)، الذي لا تقبله الكنيسة القبطية، ثبت القديس ديسقوروس على الإيمان الكيرلسي محتملاً النفي دفاعاً عن الاعتراف بطبيعة واحدة متجسدة لله الكلمة.',
        },
      },
      {
        title: { en: 'Through the Centuries', ar: 'عبر القرون' },
        text: {
          en: 'After the Arabs entered Egypt in AD 641, the Copts kept their faith through long periods of hardship. Arabic slowly became the everyday language, but the Coptic language is still used in the Church\'s prayers and hymns to this day.',
          ar: 'بعد دخول العرب مصر سنة ٦٤١م حفظ الأقباط إيمانهم خلال فترات طويلة من الضيق. وصارت العربية تدريجياً لغة الحياة اليومية، لكن اللغة القبطية ما زالت تُستخدم في صلوات الكنيسة وألحانها حتى اليوم.',
        },
      },
      {
        title: { en: 'The Church Today', ar: 'الكنيسة اليوم' },
        text: {
          en: 'The Coptic Orthodox Church is led today by His Holiness Pope Tawadros II, the 118th Pope of Alexandria and Patriarch of the See of St Mark. Besides Egypt, there are Coptic churches all over the world.',
          ar: 'يرعى الكنيسة القبطية الأرثوذكسية اليوم قداسة البابا تواضروس الثاني، بابا الإسكندرية الـ١١٨ وبطريرك الكرازة المرقسية. وإلى جانب مصر توجد كنائس قبطية في كل أنحاء العالم.',
        },
      },
    ],
  },
  {
    id: 'councils',
    icon: '⚖',
    title: { en: 'The Councils', ar: 'المجامع المسكونية' },
    desc: { en: 'Nicaea, Constantinople and Ephesus; Chalcedon is not accepted', ar: 'نيقية والقسطنطينية وأفسس؛ ولا تقبل الكنيسة خلقيدونية' },
    items: [
      {
        title: { en: 'What is an Ecumenical Council?', ar: 'ما هو المجمع المسكوني؟' },
        text: {
          en: 'An Ecumenical Council is a universal gathering of bishops from across the Christian world to define dogma, resolve theological crises, and safeguard apostolic faith against heresies. The Coptic Orthodox Church accepts only the first three Ecumenical Councils: Nicaea (AD 325), Constantinople (AD 381), and Ephesus (AD 431). It does not accept the fourth, the Council of Chalcedon (AD 451), which is told below only as history: there, political pressures and theological misunderstandings caused a tragic division, and the Coptic Church steadfastly upheld the Orthodox faith of St Cyril, standing alongside the sister Oriental Orthodox Churches.',
          ar: 'المجمع المسكوني هو اجتماع عام لأساقفة العالم المسيحي كله لصياغة العقيدة وحل الأزمات اللاهوتية وحماية الإيمان الرسولي من البدع. والكنيسة القبطية الأرثوذكسية تقبل المجامع المسكونية الثلاثة الأولى فقط: نيقية (٣٢٥م)، والقسطنطينية (٣٨١م)، وأفسس (٤٣١م). ولا تقبل المجمع الرابع بخلقيدونية (٤٥١م)، المذكور أدناه للتاريخ فقط: ففيه أدت الضغوط السياسية وسوء الفهم اللاهوتي إلى حدوث انقسام مؤسف، فتمسكت الكنيسة القبطية بالإيمان المستقيم للقديس كيرلس بجانب شقيقاتها الكنائس الأرثوذكسية الشرقية.',
        },
      },
      {
        title: { en: '1. The Council of Nicaea · AD 325', ar: '١. مجمع نيقية المسكوني الأول · ٣٢٥م' },
        text: {
          en: '• Convened: In AD 325 in Nicaea by Emperor Constantine the Great, attended by 318 bishops, among them Pope Alexander of Alexandria with twenty bishops and his deacon Athanasius.\n\n• The Heresy: Arius, an Alexandrian priest, claimed that the Son was a created being and not truly God, teaching: "There was a time when He was not."\n\n• The Defense: Pope Alexander of Alexandria and his young archdeacon, St Athanasius the Apostolic, led the defense of orthodoxy, showing from Scripture that the Son is co-eternal and of the same divine nature as the Father.\n\n• Decisions & Legacy: The council formulated the first part of the Nicene Creed, proclaiming Christ as "Light of Light, true God of true God, begotten not created, of one essence with the Father" (Homoousios). Arius was excommunicated, and the council issued twenty canons on pastoral, liturgical and church order. The Church remembers the council on 9 Hathor.',
          ar: '• الانعقاد: انعقد سنة ٣٢٥م في نيقية بدعوة من الإمبراطور قسطنطين الكبير، وحضره ٣١٨ أسقفاً، منهم البابا ألكسندروس السكندري ومعه عشرون أسقفاً وشماسه أثناسيوس.\n\n• البدعة: ادّعى آريوس، وهو كاهن من الإسكندرية، أن الابن مخلوق وليس إلهاً حقيقياً، وزعم أنه "كان وقت لم يكن فيه الابن موجوداً".\n\n• الدفاع: قاد البابا ألكسندروس السكندري وشمّاسه القديس أثناسيوس الرسولي الدفاع عن الإيمان المستقيم، مبيّنين من الكتب المقدسة أن الابن أزلي ومساوٍ للآب في اللاهوت.\n\n• القرارات والنتائج: صاغ المجمع الجزء الأول من قانون الإيمان النيقاوي مؤكداً أن المسيح "نور من نور، إله حق من إله حق، مولود غير مخلوق، مساوٍ للآب في الجوهر" (هوموؤوسيوس). وحُرم آريوس، ووضع المجمع عشرين قانوناً في الرعاية والطقس وترتيب الكنيسة. وتذكر الكنيسة المجمع في ٩ هاتور.',
        },
      },
      {
        title: { en: '2. The Council of Constantinople · AD 381', ar: '٢. مجمع القسطنطينية المسكوني الثاني · ٣٨١م' },
        text: {
          en: '• Convened: In AD 381 in Constantinople by Emperor Theodosius the Great, gathering 150 bishops. As the Synaxarium tells, Pope Timothy I, the 22nd Pope of Alexandria, presided over it.\n\n• The Heresies: Macedonius, former bishop of Constantinople, denied the divinity of the Holy Spirit, claiming the Spirit was a creature or servant. The council also refuted Apollinarius (who denied that Christ possessed a complete human soul and mind) and Sabellius (who confused the distinct Persons of the Trinity as temporary roles).\n\n• The Defense & The Creed: The fathers affirmed that the Holy Spirit is God, of one essence with the Father and the Son. They completed the Nicene-Constantinopolitan Creed: "Yes, we believe in the Holy Spirit, the Lord, the Giver of Life, who proceeds from the Father, who with the Father and the Son is worshipped and glorified, who spoke by the prophets. And in one, holy, catholic and apostolic Church. We confess one baptism for the remission of sins. We look for the resurrection of the dead and the life of the coming age. Amen."\n\n• Canons: The council issued seven canons on church order and condemned Macedonius, Apollinarius and Sabellius. The Church remembers it on 1 Meshir.',
          ar: '• الانعقاد: انعقد سنة ٣٨١م في القسطنطينية بدعوة من الإمبراطور ثيئودوسيوس الكبير، بحضور ١٥٠ أسقفاً، وكما يذكر السنكسار رأسه الأنبا تيموثاوس الأول، البابا الثاني والعشرون للإسكندرية.\n\n• البدع: أنكر مقدونيوس (بطريرك القسطنطينية المعزول) لاهوت الروح القدس زاعماً أنه مخلوق أو خادم، كما تصدى المجمع لبدعة أبوليناريوس (الذي أنكر وجود عقل بشري كامل في المسيح) وسابليوس (الذي طمس تمايز الأقانيم الثلاثة واعتبرها مجرد أدوار مؤقتة).\n\n• قانون الإيمان: أكد الآباء لاهوت الروح القدس ومساواته للآب والابن في الجوهر، وأكملوا قانون الإيمان: "نعم نؤمن بالروح القدس، الرب المحيي، المنبثق من الآب، نسجد له ونمجده مع الآب والابن، الناطق في الأنبياء. وبكنيسة واحدة مقدسة جامعة رسولية. ونعترف بمعمودية واحدة لمغفرة الخطايا. وننتظر قيامة الأموات وحياة الدهر الآتي. آمين."\n\n• القوانين: أصدر المجمع سبعة قوانين نظمت الترتيب الكنسي، وأدان مقدونيوس وأبوليناريوس وسابليوس. وتذكره الكنيسة في ١ أمشير.',
        },
      },
      {
        title: { en: '3. The Council of Ephesus · AD 431', ar: '٣. مجمع أفسس المسكوني الثالث · ٤٣١م' },
        text: {
          en: '• Convened: In AD 431 in Ephesus by Emperor Theodosius II, bringing together 200 bishops and presided over by St Cyril the Great (Pillar of Faith, 24th Pope of Alexandria), accompanied by St Shenouda the Archimandrite.\n\n• The Heresy: Nestorius, Patriarch of Constantinople, divided Christ into two separate persons (a divine Son and a human Jesus) and refused to call the Virgin Mary "Theotokos" (Mother of God / God-bearer), claiming she gave birth only to the human man.\n\n• The Defense: St Cyril defended the biblical truth of the Incarnation: God the Word truly became man without separating or dividing His humanity and divinity. In Christ there is a true hypostatic union: "One Nature of God the Word Incarnate" (Mia Physis tou Theou Logou Sesarkomene). Because the One born of St Mary is God the Word made flesh, she is truly the Theotokos.\n\n• Decisions & Liturgy: The council condemned and deposed Nestorius, ratified St Cyril\'s Twelve Anathemas, issued eight canons, and formulated the beloved Introduction to the Creed recited in all Coptic services: "We magnify you, O Mother of the True Light, and we glorify you, O holy Virgin and Mother of God..."',
          ar: '• الانعقاد: انعقد سنة ٤٣١م في أفسس بأمر الإمبراطور ثيئودوسيوس الثاني، بحضور ٢٠٠ أسقف وبرئاسة القديس كيرلس الكبير (عمود الدين والبابا الـ٢٤ للإسكندرية)، ومعه القديس الأنبا شنوده رئيس المتوحدين.\n\n• البدعة: قسّم نسطور، بطريرك القسطنطينية، السيد المسيح إلى شخصين منفصلين (ابن الله الإلهي والإنسان يسوع)، ورفض إطلاق لقب "ثيئوطوكوس" (والدة الإله) على العذراء مريم زاعماً أنها ولدت إنساناً فقط.\n\n• الدفاع: دافع القديس كيرلس عن حقيقة التجسد الإلهي: فالكلمة اتخذ جسداً حقيقياً وتحد بناسوته اتحاداً أقنومياً حقيقياً بغير اختلاط ولا امتزاج ولا تغيير ("طبيعة واحدة لله الكلمة المتجسد"). ولأن المولود من العذراء هو الله الكلمة متجسداً فإن القديسة مريم هي بالحقيقة والدة الإله.\n\n• القرارات والليتورجيا: عزل المجمع نسطور وحرم تعاليمه، وثبّت حرومات القديس كيرلس الاثني عشر، وأصدر ثمانية قوانين، ووضع مقدمة قانون الإيمان التي تتلوها الكنيسة في كل صلواتها: "نعظمك يا أم النور الحقيقي، ونمجدك أيتها العذراء القديسة والدة الإله...".',
        },
      },
      {
        title: { en: '4. The Council of Chalcedon · AD 451 (Not Accepted)', ar: '٤. مجمع خلقيدونية · ٤٥١م (لا تقبله الكنيسة)' },
        text: {
          en: '• Not accepted: The Coptic Orthodox Church does not accept the Council of Chalcedon or its definition of faith. It is kept here only to tell what happened there and why the Church rejected it.\n\n• Convened: In AD 451 in Chalcedon under Emperor Marcian and Empress Pulcheria, with 630 bishops, as the Synaxarium says.\n\n• The Crisis: The council was called after Eutyches taught that Christ\'s human nature was dissolved into His divinity like a drop of vinegar in the sea (Monophysitism). Pope St Dioscorus (25th Pope of Alexandria) firmly condemned Eutyches, confessing that Christ is fully human and fully divine.\n\n• The Defense of Cyrillian Faith: St Dioscorus defended St Cyril\'s Orthodox confession: "One incarnate nature of God the Word, out of two natures," united without mingling, confusion, or alteration. However, the council adopted the "Tome of Leo" and introduced the phrase "in two natures" after the union, which attributed separate actions to each nature. St Dioscorus rejected this language because it compromised the indivisible oneness of Christ.\n\n• The Unjust Exile: When St Dioscorus refused to compromise the Cyrillian formula or sign Leo\'s Tome, the council deposed him and the emperor exiled him. By the empress\'s order he was struck on the mouth, knocking out his teeth, and his beard was plucked; he sent them to Alexandria, saying, "This is the fruit of faith." He was exiled to the island of Gangra, where he remained steadfast for five years until his departure in AD 454 (7 Thout).\n\n• The Schism & Reconciliation: Chalcedon fractured the Church into the Oriental Orthodox family (Coptic, Syriac, Armenian, Ethiopian, Eritrean, and Malankara) and the Chalcedonian Churches. While historically misrepresented as "Monophysites," the Coptic Church confesses Mia-physitism (one united divine-human nature). In modern official dialogues (such as 1989 at St Bishoy Monastery), theologians of both families agreed that both sides share the same apostolic Christological faith.',
          ar: '• لا تقبله الكنيسة: الكنيسة القبطية الأرثوذكسية لا تقبل مجمع خلقيدونية ولا تحديده للإيمان، وهو مذكور هنا فقط لرواية ما حدث فيه ولماذا رفضته الكنيسة.\n\n• الانعقاد: انعقد سنة ٤٥١م في خلقيدونية في عهد الإمبراطور مرقيان والإمبراطورة بلخيريا، بحضور ٦٣٠ أسقفاً كما يذكر السنكسار.\n\n• الأزمة: عُقد المجمع بعد بدعة أوطاخي الذي زعم أن ناسوت المسيح ابتلع في لاهوته كقطرة خل في المحيط (المونوفيزيتية). وكان البابا القديس ديسقوروس (البابا الـ٢٥ للإسكندرية) قد أدان أوطاخي مسبقاً، مؤكداً كمال ناسوت المسيح وكمال لاهوته.\n\n• الدفاع عن الإيمان الكيرلسي: تمسك القديس ديسقوروس بعبارة القديس كيرلس: "طبيعة واحدة لله الكلمة المتجسد من طبيعتين"، متحدة بغير اختلاط ولا امتزاج ولا تغيير. لكن المجمع تبنى "طومس لاون" وأقر صيغة "في طبيعتين بعد الاتحاد"، ناسباً أفعالاً خاصة لكل طبيعة على حدة، وهو ما رآه القديس ديسقوروس مساساً بوحدانية المسيح التي لا تنفصم.\n\n• النفي الظالم: لرفضه التخلي عن صيغة القديس كيرلس أو توقيع طومس لاون، عزله المجمع ونفاه الإمبراطور. وبأمر الإمبراطورة ضُرب على فمه فسقطت أسنانه ونُتفت لحيته، فأرسلها إلى الإسكندرية قائلاً: "هذه ثمرة الإيمان"، ونُفي إلى جزيرة غانغرا فبقي ثابتاً في إيمانه خمس سنوات حتى نياحته سنة ٤٥٤م (٧ توت).\n\n• الانقسام والمصالحات: أدى مجمع خلقيدونية إلى الانقسام بين عائلة الكنائس الأرثوذكسية الشرقية (القبطية والسريانية والأرمنية والإثيوبية والإريترية والهندية) والكنائس الخلقيدونية. ورغم اتهام الأقباط ظلماً بـ"المونوفيزيتية"، تؤمن الكنيسة بـ"الميافيزيتية" (طبيعة واحدة متحدة). وفي الحوارات اللاهوتية الرسمية الحديثة (كدير الأنبا بيشوي سنة ١٩٨٩م)، أقر الجانبان رسمياً باتحادهما في جوهر الإيمان الرسولي بالمسيح.',
        },
      },
      {
        title: { en: 'Toward Unity and Dialogue', ar: 'نحو الوحدة والحوار المسكوني' },
        text: {
          en: 'In recent decades, through official theological consultations between the Oriental Orthodox and Eastern Orthodox Churches (at the Monastery of St Bishoy in Egypt in 1989 and at Chambésy, Switzerland, in 1990), agreed Christological statements recognized that both traditions confess the same faith in our Lord Jesus Christ, perfect in His divinity and perfect in His humanity, united without confusion, change, division, or separation.',
          ar: 'في العقود الأخيرة، ومن خلال الحوارات اللاهوتية الرسمية بين الكنائس الأرثوذكسية الشرقية والبيزنطية (في دير الأنبا بيشوي بمصر سنة ١٩٨٩م وفي شامبيزي بسويسرا سنة ١٩٩٠م)، وقّع الطرفان بيانات كريستولوجية مشتركة تعترف بأن العائلتين تعترفان بنفس الإيمان الرسولي بربنا يسوع المسيح، إلهاً كاملاً في لاهوته وإنساناً كاملاً في ناسوته، متحداً بلا اختلاط ولا تغيير ولا انقسام ولا انفصال.',
        },
      },
    ],
  },
  {
    id: 'beliefs',
    icon: '✝',
    title: { en: 'What We Believe', ar: 'عقيدتنا' },
    desc: { en: 'The Trinity, Christ, St Mary and salvation', ar: 'الثالوث والمسيح والعذراء والخلاص' },
    items: [
      {
        title: { en: 'The Holy Trinity', ar: 'الثالوث القدوس' },
        text: {
          en: 'We believe in one God: the Father, the Son and the Holy Spirit. Three persons (hypostases), one essence, one Godhead. We begin every prayer "In the name of the Father, the Son and the Holy Spirit, one God. Amen."',
          ar: 'نؤمن بإله واحد: الآب والابن والروح القدس. ثلاثة أقانيم في جوهر واحد ولاهوت واحد. ونبدأ كل صلاة بقولنا: "باسم الآب والابن والروح القدس، الإله الواحد، آمين".',
        },
      },
      {
        title: { en: 'The Incarnation', ar: 'التجسد' },
        text: {
          en: 'God the Word became man for our salvation. With St Cyril we confess "one nature of God the Word incarnate": His divinity and His humanity are united in one, without mingling, without confusion and without alteration, as the priest says at the end of the Liturgy. His divinity never parted from His humanity, not for a moment nor the twinkling of an eye.',
          ar: 'صار الله الكلمة إنساناً من أجل خلاصنا. ومع القديس كيرلس نعترف بـ"طبيعة واحدة لله الكلمة المتجسد": لاهوته وناسوته متحدان بغير اختلاط ولا امتزاج ولا تغيير، كما يقول الكاهن في نهاية القداس. ولاهوته لم يفارق ناسوته لحظة واحدة ولا طرفة عين.',
        },
      },
      {
        title: { en: 'Not "Monophysite"', ar: 'لسنا "أصحاب الطبيعة الواحدة" بمعنى أوطاخي' },
        text: {
          en: 'The Copts are sometimes wrongly called "Monophysites", as if we believed Christ\'s humanity was swallowed up by His divinity. That was the teaching of Eutyches, and the Coptic Church rejects it. We believe Christ is perfect God and perfect man, in one united nature. This is sometimes called "Miaphysite".',
          ar: 'يُسمّى الأقباط أحياناً خطأً "أصحاب الطبيعة الواحدة" كأننا نؤمن أن ناسوت المسيح ذاب في لاهوته. هذا كان تعليم أوطاخي، والكنيسة القبطية ترفضه. فنحن نؤمن أن المسيح إله كامل وإنسان كامل في طبيعة واحدة متحدة.',
        },
      },
      {
        title: { en: 'The Holy Spirit', ar: 'الروح القدس' },
        text: {
          en: 'The Holy Spirit is God, the Lord, the Giver of Life, who proceeds from the Father. He dwells in us through the Holy Myron and works in all the sacraments of the Church.',
          ar: 'الروح القدس هو الله، الرب المحيي، المنبثق من الآب. يسكن فينا بالميرون المقدس ويعمل في جميع أسرار الكنيسة.',
        },
      },
      {
        title: { en: 'St Mary the Theotokos', ar: 'القديسة مريم والدة الإله' },
        text: {
          en: 'We honour St Mary above all saints, because she is the Mother of God and ever-virgin: before, during and after the birth of Christ. She intercedes for us, which is why so many of our hymns, like the Theotokia, praise her.',
          ar: 'نكرّم القديسة مريم فوق جميع القديسين، لأنها والدة الإله والدائمة البتولية: قبل الميلاد وفيه وبعده. وهي تشفع فينا، ولذلك تمدحها ألحان كثيرة مثل الثيئوطوكيات.',
        },
      },
      {
        title: { en: 'Salvation', ar: 'الخلاص' },
        text: {
          en: 'Salvation is God\'s free gift through the Cross and Resurrection of Christ. We receive it by faith, through the sacraments of the Church, and we live it out in repentance, love and good works, growing to become more like Christ.',
          ar: 'الخلاص هو عطية الله المجانية بصليب المسيح وقيامته. ننالها بالإيمان وبأسرار الكنيسة، ونحياها بالتوبة والمحبة والأعمال الصالحة، فننمو لنصير أكثر شبهاً بالمسيح.',
        },
      },
      {
        title: { en: 'Scripture and Tradition', ar: 'الكتاب المقدس والتقليد' },
        text: {
          en: 'The Holy Bible is the word of God. The Church reads it through the Holy Tradition handed down from the apostles: the teaching of the fathers, the councils, the liturgy and the life of the Church.',
          ar: 'الكتاب المقدس هو كلمة الله. والكنيسة تقرأه من خلال التقليد المقدس المُسلَّم من الرسل: تعاليم الآباء والمجامع والليتورجيا وحياة الكنيسة.',
        },
      },
      {
        title: { en: 'The Saints and the Life to Come', ar: 'القديسون والحياة الآتية' },
        text: {
          en: 'The saints are alive in Christ and pray for us, so we ask their intercession and keep their days. We await the resurrection of the dead and the life of the age to come, when Christ comes again in glory to judge the living and the dead.',
          ar: 'القديسون أحياء في المسيح ويصلّون من أجلنا، لذلك نطلب شفاعتهم ونحتفل بأعيادهم. وننتظر قيامة الأموات وحياة الدهر الآتي، حين يأتي المسيح في مجده ليدين الأحياء والأموات.',
        },
      },
    ],
  },
  {
    id: 'sacraments',
    icon: '✦',
    title: { en: 'The Seven Sacraments', ar: 'الأسرار السبعة' },
    desc: { en: 'How God gives us His grace', ar: 'كيف يمنحنا الله نعمته' },
    items: [
      {
        title: { en: '1. Baptism', ar: '١. المعمودية' },
        text: {
          en: 'Being born again of water and the Spirit. We are immersed three times in the name of the Holy Trinity, die with Christ and rise with Him.',
          ar: 'الولادة الجديدة من الماء والروح. نُغطَّس ثلاث مرات باسم الثالوث القدوس، فنموت مع المسيح ونقوم معه.',
        },
      },
      {
        title: { en: '2. Chrismation (Holy Myron)', ar: '٢. الميرون' },
        text: {
          en: 'Right after baptism, the priest anoints us with the Holy Myron, and we receive the Holy Spirit to dwell in us.',
          ar: 'بعد المعمودية مباشرة يدهننا الكاهن بالميرون المقدس فننال سُكنى الروح القدس فينا.',
        },
      },
      {
        title: { en: '3. The Eucharist', ar: '٣. الإفخارستيا' },
        text: {
          en: 'In the Divine Liturgy, the bread and wine truly become the Body and Blood of Christ. We receive them for forgiveness of sins and eternal life.',
          ar: 'في القداس الإلهي يتحول الخبز والخمر حقاً إلى جسد المسيح ودمه، فنتناولهما لغفران الخطايا والحياة الأبدية.',
        },
      },
      {
        title: { en: '4. Repentance and Confession', ar: '٤. التوبة والاعتراف' },
        text: {
          en: 'We confess our sins before God in the presence of the priest, and receive the absolution and a fresh start.',
          ar: 'نعترف بخطايانا أمام الله في حضور الكاهن، وننال الحِلّ وبداية جديدة.',
        },
      },
      {
        title: { en: '5. Unction of the Sick', ar: '٥. مسحة المرضى' },
        text: {
          en: 'The priests pray over the sick and anoint them with oil for healing of body and soul (James 5:14–15). On the last Friday of Lent the whole congregation is anointed.',
          ar: 'يصلي الكهنة على المريض ويدهنونه بالزيت لشفاء النفس والجسد (يعقوب ٥: ١٤–١٥). وفي الجمعة الأخيرة من الصوم الكبير يُدهن الشعب كله.',
        },
      },
      {
        title: { en: '6. Matrimony', ar: '٦. الزيجة' },
        text: {
          en: 'God unites a man and a woman as one, in a lifelong bond blessed by the crowning ceremony.',
          ar: 'يوحّد الله الرجل والمرأة فيصيران واحداً، برباط مدى الحياة يباركه طقس الإكليل.',
        },
      },
      {
        title: { en: '7. Priesthood', ar: '٧. الكهنوت' },
        text: {
          en: 'Through the laying on of hands, the Holy Spirit gives bishops, priests and deacons the grace to serve the Church and the sacraments.',
          ar: 'بوضع اليد يمنح الروح القدس الأساقفة والكهنة والشمامسة نعمة خدمة الكنيسة والأسرار.',
        },
      },
    ],
  },
  {
    id: 'creed',
    icon: '☦',
    title: { en: 'The Creed', ar: 'قانون الإيمان' },
    desc: { en: 'The faith we confess together', ar: 'الإيمان الذي نعترف به معاً' },
    items: [
      {
        title: { en: 'Introduction', ar: 'المقدمة' },
        text: {
          en: 'We exalt you, the Mother of the True Light. We glorify you, O Saint, the Theotokos, for you brought forth unto us the Savior of the whole world; He came and saved our souls.\n\nGlory to You, our Master, our King, Christ, the pride of the apostles, the crown of the martyrs, the joy of the righteous, the firmness of the churches, the forgiveness of sins.\n\nWe proclaim the Holy Trinity in One Godhead. We worship Him. We glorify Him.\n\nLord have mercy. Lord have mercy. Lord bless. Amen.',
          ar: 'نُعظِّمُكِ يا أمَّ النّورِ الحَقيقىِّ ونُمجِّدكِ أيَّتُها العَذْراءُ القِدّيسةُ والِدةُ الإلهِ لأنَّكِ وَلدْتِ لَنا مُخلِّصَ العالَم، أتَى وخَلَّصَ نُفوسَنا.\n\nالمجْدُ لكَ يا سَيِّدُنا ومَلكُنا المسيحُ، فَخْرَ الرُّسُل، إكْليلَ الشُهداءِ، تَهْليلَ الصِدّيقينَ، ثَباتَ الكَنائسِ، غُفْرانَ الخَطايا.\n\nنُبشِّرُ بالثَّالوثِ القُدّوسِ، لاهوتٌ واحِدٌ نَسجُدُ لهُ ونُمجِّدهُ\n\nيا رَبُّ إرْحَم. يا رَبُّ إرْحَم. يا رَبُّ بارِك. آمين.',
        },
      },
      {
        title: { en: 'The Creed', ar: 'قانون الإيمان' },
        text: {
          en: 'We believe in one God, God the Father, the Pantocrator, creator of heaven and earth, and of all things seen and unseen.\n\nWe believe in one Lord, Jesus Christ, the Only-Begotten Son of God, begotten of the Father before all ages.\n\nLight of Light, true God of true God; begotten, not created; of one essence with the Father by Whom all things were made;\n\nWho for us men and for our salvation came down from heaven, was incarnate of the Holy Spirit and of the Virgin Mary, and became man.\n\nAnd He was crucified for us under Pontius Pilate, suffered and was buried;\n\nand on the third day He rose from the dead according to the Scriptures.\n\nAscended into the heavens, He sits at the Right Hand of His Father; and He is coming again in His glory to judge the living and the dead; Whose kingdom shall have no end.\n\nYes, we believe in the Holy Spirit, the Lord, the Giver of Life, Who proceeds from the Father; Who, with the Father and the Son, is worshiped and glorified; Who spoke by the prophets.\n\nAnd in one holy, catholic, and apostolic Church. We confess one baptism, for the remission of sins.\n\nWe look for the resurrection of the dead, and the life of the age to come. Amen.',
          ar: 'بالحَقيقَةِ نُؤمِنُ بإلهٍ واحدٍ اللَهُ الآبُ ضابطُ الكُلِّ خالِقُ السَّماءِ والأرضِ، ما يُرَى وما لا يُرَى.\n\nنُؤمِنُ بربٍّ واحدٍ يَسوعِ المسيحِ إبْن اللهِ الوَحيدِ الموْلودِ مِنَ الآبِ قَبْلَ كلِّ الدُّهورِ.\n\nنورٌ مِنْ نورٍ إلهٌ حَقٌ مِنْ إلهٍ حَقٍّ، مَولودٌ غَيْرُ مَخْلوقٍ، مُساوٍ للآبِ فى الجَوْهرِ. الَّذى بِهِ كانَ كلُّ شئٍ.\n\nهَذا الَّذى مِنْ أجْلنا نَحنُ البَشَرَ ومِنْ أجْلِ خَلاصِنا نَزلَ مِنَ السَّماءِ وتَجسَّدَ مِنَ الرّوحِ القُّدُسِ، ومِنْ مَرْيَم العَذْراءِ تَأنَّسَ.\n\nوصُلبَ عنّا علَى عَهدِ بيلاطُس البنْطى، تألَّمَ وقُبرَ\n\nوقامَ مِن بَين الأمْواتِ فى اليَومِ الثّالثِ كَما في الكتُبِ،\n\nوصَعِدَ إلَى السَّمواتِ وجَلسَ عَنْ يَمينِ أبيهِ وأيْضاً يَأتي فى مَجدهِ ليُدينَ الأحْياءَ والأمْوات ، الَّذى لَيسَ لملْكِهِ إنْقِضاءٌ.\n\nنَعَم نُؤمِنُ بالرّوحِ القُدُسِ، الرَّبُّ المحْيى المنْبَثقِ مِنَ الآبِ نَسْجُد لهُ ونُمجِّدهُ مَعَ الآبِ والإبْنِ النّاطِقِ فى الأنْبياءِ.\n\nوبكنيسَةٍ واحِدَةٍ مُقدَّسةٍ جامعَةٍ رسوليَّةٍ، ونَعْترِفُ بمَعْموديَّةٍ واحِدَةٍ لمغْفِرَةِ الخَطايا.\n\nوننْتَظرُ قِيامَةَ الأمْواتِ وحَياةَ الدَّهرِ الآتى. آمين.',
        },
      },
    ],
    note: {
      en: 'The first part of the Creed comes from the Council of Nicaea, the part about the Holy Spirit from the Council of Constantinople, and the introduction from the Council of Ephesus.',
      ar: 'الجزء الأول من قانون الإيمان من مجمع نيقية، والجزء الخاص بالروح القدس من مجمع القسطنطينية، والمقدمة من مجمع أفسس.',
    },
  },
  {
    id: 'fathers',
    icon: '✠',
    title: { en: 'Fathers of the Church', ar: 'آباء الكنيسة' },
    desc: { en: 'The saints who defended the faith', ar: 'القديسون الذين دافعوا عن الإيمان' },
    items: [
      {
        title: { en: 'St Athanasius the Apostolic', ar: 'القديس أثناسيوس الرسولي' },
        text: {
          en: 'The 20th Pope of Alexandria. As a deacon he defended the divinity of Christ at Nicaea, and as Pope he was exiled four times for the faith (a fifth exile failed), seventeen and a half years in all. He is called "the Apostolic" and "Athanasius against the world". He wrote "On the Incarnation of the Word".',
          ar: 'البابا العشرون للإسكندرية. دافع وهو شماس عن لاهوت المسيح في مجمع نيقية، ونُفي وهو بابا أربع مرات من أجل الإيمان (وفشلت محاولة نفيه الخامسة)، فبلغت سنوات نفيه سبع عشرة سنة ونصفاً. يُلقّب بـ"الرسولي" و"أثناسيوس ضد العالم". كتب "تجسد الكلمة".',
        },
      },
      {
        title: { en: 'St Cyril the Great, Pillar of Faith', ar: 'القديس كيرلس الكبير عمود الدين' },
        text: {
          en: 'The 24th Pope of Alexandria. He led the Council of Ephesus and taught the oneness of Christ: "one nature of God the Word incarnate". He defended the title Theotokos for St Mary.',
          ar: 'البابا الرابع والعشرون للإسكندرية. رأس مجمع أفسس وعلّم وحدانية المسيح: "طبيعة واحدة لله الكلمة المتجسد"، ودافع عن لقب والدة الإله للقديسة مريم.',
        },
      },
      {
        title: { en: 'St Dioscorus, Hero of Orthodoxy', ar: 'القديس ديسقوروس بطل الأرثوذكسية' },
        text: {
          en: 'The 25th Pope of Alexandria. He refused the Council of Chalcedon to stay faithful to St Cyril\'s teaching, and departed in exile on the island of Gangra in AD 454.',
          ar: 'البابا الخامس والعشرون للإسكندرية. رفض مجمع خلقيدونية ليبقى أميناً لتعليم القديس كيرلس، وتنيّح في منفاه بجزيرة غانغرا سنة ٤٥٤م.',
        },
      },
      {
        title: { en: 'St Antony the Great', ar: 'القديس الأنبا أنطونيوس الكبير' },
        text: {
          en: 'The father of all monks. As a young man he heard the Gospel "If you want to be perfect, go, sell what you have and give to the poor" (Matthew 19:21), obeyed it, and went into the desert. His monastery in the Eastern Desert still stands.',
          ar: 'أب جميع الرهبان. سمع في شبابه الإنجيل: "إن أردت أن تكون كاملاً فاذهب وبع أملاكك وأعط الفقراء" (متى ١٩: ٢١) فأطاع وخرج إلى البرية. وما زال ديره في الصحراء الشرقية قائماً.',
        },
      },
      {
        title: { en: 'St Shenouda the Archimandrite', ar: 'القديس الأنبا شنوده رئيس المتوحدين' },
        text: {
          en: 'Head of the White Monastery near Sohag, whose monasteries held four or five thousand monks and nuns. His writings and sermons are the richest of Coptic literature. He went with St Cyril to the Council of Ephesus.',
          ar: 'رئيس الدير الأبيض بجوار سوهاج، وبلغ عدد رهبان أديرته وراهباتها أربعة أو خمسة آلاف. وكتاباته وعظاته بالقبطية أغنى الأدب القبطي. رافق القديس كيرلس إلى مجمع أفسس.',
        },
      },
    ],
  },
];

// ---- Quiz: every question comes from the sections above ----

const b = (en: string, ar: string): Bilingual => ({ en, ar });

const councils = {
  nicaea: b('Nicaea', 'نيقية'),
  constantinople: b('Constantinople', 'القسطنطينية'),
  ephesus: b('Ephesus', 'أفسس'),
  chalcedon: b('Chalcedon', 'خلقيدونية'),
};
const years = { y325: b('AD 325', '٣٢٥م'), y381: b('AD 381', '٣٨١م'), y431: b('AD 431', '٤٣١م'), y451: b('AD 451', '٤٥١م') };
const people = {
  mark: b('St Mark', 'القديس مرقس'),
  athanasius: b('St Athanasius', 'القديس أثناسيوس'),
  cyril: b('St Cyril the Great', 'القديس كيرلس الكبير'),
  dioscorus: b('St Dioscorus', 'القديس ديسقوروس'),
  antony: b('St Antony the Great', 'القديس الأنبا أنطونيوس'),
  pachomius: b('St Pachomius', 'القديس الأنبا باخوميوس'),
  arius: b('Arius', 'آريوس'),
  nestorius: b('Nestorius', 'نسطور'),
  macedonius: b('Macedonius', 'مقدونيوس'),
  eutyches: b('Eutyches', 'أوطاخي'),
};
const sacraments = [
  b('Baptism', 'المعمودية'),
  b('Chrismation (Holy Myron)', 'الميرون'),
  b('The Eucharist', 'الإفخارستيا'),
  b('Confession', 'الاعتراف'),
  b('Unction of the Sick', 'مسحة المرضى'),
  b('Matrimony', 'الزيجة'),
  b('Priesthood', 'الكهنوت'),
];

const faithQuestions: GuideQuestion[] = [
  // History
  { q: b('Who founded the Church of Egypt?', 'من أسس كنيسة مصر؟'), right: people.mark, wrong: [people.athanasius, people.cyril, people.antony] },
  { q: b('In what year was St Mark martyred?', 'في أي سنة استشهد القديس مرقس؟'), right: b('AD 68', '٦٨م'), wrong: [years.y325, b('AD 284', '٢٨٤م'), b('AD 33', '٣٣م')] },
  { q: b("Who was St Mark's first convert in Alexandria?", 'من أول من آمن على يد القديس مرقس في الإسكندرية؟'), right: b('Anianus the shoemaker', 'إنيانوس الإسكافي'), wrong: [b('Pantaenus', 'بنتينوس'), b('Clement', 'إكليمنضس'), b('Didymus the Blind', 'ديديموس الضرير')] },
  { q: b('The Coptic calendar counts its years from…', 'يبدأ التقويم القبطي سنواته من…'), right: b('AD 284, the Era of the Martyrs', 'سنة ٢٨٤م، عصر الشهداء'), wrong: [b('The birth of Christ', 'ميلاد المسيح'), b('The Council of Nicaea', 'مجمع نيقية'), b('The coming of St Mark', 'مجيء القديس مرقس')] },
  { q: b('Under which emperor were countless Copts martyred?', 'في عهد أي إمبراطور استشهد عدد كبير من الأقباط؟'), right: b('Diocletian', 'دقلديانوس'), wrong: [b('Constantine', 'قسطنطين'), b('Theodosius', 'ثيئودوسيوس'), b('Justinian', 'جستنيان')] },
  { q: b('Who is the father of all monks?', 'من هو أب جميع الرهبان؟'), right: people.antony, wrong: [people.pachomius, people.cyril, people.mark] },
  { q: b('Who began monasteries where monks live together under one rule?', 'من أسس نظام الشركة في الرهبنة؟'), right: people.pachomius, wrong: [people.antony, people.athanasius, people.dioscorus] },
  { q: b('Which number Pope is Pope Tawadros II?', 'ما رقم البابا تواضروس الثاني بين باباوات الإسكندرية؟'), right: b('118th', 'الـ١١٨'), wrong: [b('117th', 'الـ١١٧'), b('116th', 'الـ١١٦'), b('120th', 'الـ١٢٠')] },
  // Councils
  { q: b('How many Ecumenical Councils does the Coptic Church accept?', 'كم مجمعاً مسكونياً تقبل الكنيسة القبطية؟'), right: b('Three', 'ثلاثة'), wrong: [b('Four', 'أربعة'), b('Seven', 'سبعة'), b('Two', 'اثنان')] },
  { q: b('Which council did the Coptic Church not accept?', 'أي مجمع لم تقبله الكنيسة القبطية؟'), right: councils.chalcedon, wrong: [councils.nicaea, councils.constantinople, councils.ephesus] },
  { q: b('Which council met against Arius?', 'أي مجمع انعقد ضد آريوس؟'), right: councils.nicaea, wrong: [councils.constantinople, councils.ephesus, councils.chalcedon] },
  { q: b('Which council confirmed the divinity of the Holy Spirit?', 'أي مجمع أكد لاهوت الروح القدس؟'), right: councils.constantinople, wrong: [councils.nicaea, councils.ephesus, councils.chalcedon] },
  { q: b('Which council declared St Mary the Theotokos?', 'أي مجمع أعلن أن القديسة مريم والدة الإله؟'), right: councils.ephesus, wrong: [councils.nicaea, councils.constantinople, councils.chalcedon] },
  { q: b('When was the Council of Nicaea?', 'متى انعقد مجمع نيقية؟'), right: years.y325, wrong: [years.y381, years.y431, years.y451] },
  { q: b('When was the Council of Constantinople?', 'متى انعقد مجمع القسطنطينية؟'), right: years.y381, wrong: [years.y325, years.y431, years.y451] },
  { q: b('When was the Council of Ephesus?', 'متى انعقد مجمع أفسس؟'), right: years.y431, wrong: [years.y325, years.y381, years.y451] },
  { q: b('When was the Council of Chalcedon?', 'متى انعقد مجمع خلقيدونية؟'), right: years.y451, wrong: [years.y325, years.y381, years.y431] },
  { q: b('Who taught that the Son is a creature?', 'من علّم أن الابن مخلوق؟'), right: people.arius, wrong: [people.nestorius, people.macedonius, people.eutyches] },
  { q: b('Who refused to call St Mary the Mother of God?', 'من رفض أن يدعو القديسة مريم والدة الإله؟'), right: people.nestorius, wrong: [people.arius, people.macedonius, people.eutyches] },
  { q: b('Who denied the divinity of the Holy Spirit?', 'من أنكر لاهوت الروح القدس؟'), right: people.macedonius, wrong: [people.arius, people.nestorius, people.eutyches] },
  { q: b("Who taught that Christ's humanity was swallowed up by His divinity?", 'من علّم أن ناسوت المسيح ذاب في لاهوته؟'), right: people.eutyches, wrong: [people.arius, people.nestorius, people.macedonius] },
  { q: b('How many fathers met at Nicaea?', 'كم أباً اجتمعوا في نيقية؟'), right: b('318', '٣١٨'), wrong: [b('150', '١٥٠'), b('200', '٢٠٠'), b('70', '٧٠')] },
  { q: b('Who led the Council of Ephesus?', 'من رأس مجمع أفسس؟'), right: people.cyril, wrong: [people.athanasius, people.dioscorus, people.mark] },
  { q: b('Which Pope was exiled for refusing Chalcedon?', 'أي بابا نُفي لرفضه مجمع خلقيدونية؟'), right: people.dioscorus, wrong: [people.cyril, people.athanasius, b('Pope Alexander', 'البابا ألكسندروس')] },
  // Beliefs
  { q: b('"One nature of God the Word incarnate" is the teaching of…', '"طبيعة واحدة لله الكلمة المتجسد" هو تعليم…'), right: people.cyril, wrong: [people.nestorius, people.eutyches, people.arius] },
  { q: b("Christ's divinity and humanity are united…", 'لاهوت المسيح وناسوته متحدان…'), right: b('Without mingling, confusion or alteration', 'بغير اختلاط ولا امتزاج ولا تغيير'), wrong: [b('As two separate persons', 'كشخصين منفصلين'), b('With His humanity swallowed up', 'وقد ذاب ناسوته'), b('Only after the Resurrection', 'بعد القيامة فقط')] },
  { q: b('The Holy Spirit proceeds from…', 'الروح القدس منبثق من…'), right: b('The Father', 'الآب'), wrong: [b('The Son', 'الابن'), b('The Church', 'الكنيسة'), b('The prophets', 'الأنبياء')] },
  { q: b('What does "Theotokos" mean?', 'ما معنى "ثيئوطوكوس"؟'), right: b('Mother of God', 'والدة الإله'), wrong: [b('Full of grace', 'الممتلئة نعمة'), b('Queen of heaven', 'ملكة السماء'), b('The Virgin', 'العذراء')] },
  { q: b('Which family of Churches is the Coptic Church part of?', 'إلى أي عائلة كنسية تنتمي الكنيسة القبطية؟'), right: b('Oriental Orthodox', 'الأرثوذكسية الشرقية'), wrong: [b('Roman Catholic', 'الكاثوليكية'), b('Protestant', 'البروتستانتية'), b('Anglican', 'الأنجليكانية')] },
  // Sacraments
  { q: b('How many sacraments does the Church have?', 'كم عدد أسرار الكنيسة؟'), right: b('Seven', 'سبعة'), wrong: [b('Two', 'اثنان'), b('Three', 'ثلاثة'), b('Twelve', 'اثنا عشر')] },
  { q: b('Which sacrament gives us the Holy Spirit to dwell in us?', 'بأي سر ننال سُكنى الروح القدس؟'), right: sacraments[1], wrong: sacraments.filter((s) => s !== sacraments[1]) },
  { q: b('In which sacrament do the bread and wine become the Body and Blood of Christ?', 'في أي سر يتحول الخبز والخمر إلى جسد المسيح ودمه؟'), right: sacraments[2], wrong: sacraments.filter((s) => s !== sacraments[2]) },
  { q: b('In which sacrament are we immersed three times?', 'في أي سر نُغطَّس ثلاث مرات؟'), right: sacraments[0], wrong: sacraments.filter((s) => s !== sacraments[0]) },
  { q: b('Which sacrament is for healing of body and soul?', 'أي سر هو لشفاء النفس والجسد؟'), right: sacraments[4], wrong: sacraments.filter((s) => s !== sacraments[4]) },
  // Creed and fathers
  { q: b('The introduction to the Creed comes from which council?', 'من أي مجمع جاءت مقدمة قانون الإيمان؟'), right: councils.ephesus, wrong: [councils.nicaea, councils.constantinople, councils.chalcedon] },
  { q: b('Who was exiled four times for the faith?', 'من نُفي أربع مرات من أجل الإيمان؟'), right: people.athanasius, wrong: [people.cyril, people.dioscorus, people.antony] },
  { q: b('Who wrote "On the Incarnation"?', 'من كتب "تجسد الكلمة"؟'), right: people.athanasius, wrong: [people.cyril, people.dioscorus, people.mark] },
];

// A round of random questions about the faith
export function buildFaithQuiz(lang: 'en' | 'ar', count = 10, random: () => number = Math.random): QuizQuestion[] {
  return buildQuiz(faithQuestions, lang, count, random);
}
