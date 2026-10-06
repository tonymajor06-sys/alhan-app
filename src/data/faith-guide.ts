import { Bilingual, GuideQuestion, GuideSection, buildQuiz } from './deacon-guide';
import { QuizQuestion } from './quiz';

// Our Faith: Coptic Church history, the councils and what the Church believes, in both app languages

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
          en: 'St Mark, the writer of the second Gospel, preached in Alexandria in the first century and founded the Church of Egypt. His first convert was Anianus, a shoemaker, who became the second Pope. St Mark was martyred in Alexandria in AD 68. Every Coptic Pope sits on "the Chair of St Mark".',
          ar: 'بشّر القديس مرقس، كاتب الإنجيل الثاني، في الإسكندرية في القرن الأول وأسس كنيسة مصر. وكان أول من آمن على يديه إنيانوس الإسكافي الذي صار البابا الثاني. واستشهد القديس مرقس في الإسكندرية سنة ٦٨م. وكل بابا قبطي يجلس على "كرسي مارمرقس".',
        },
      },
      {
        title: { en: 'The School of Alexandria', ar: 'مدرسة الإسكندرية' },
        text: {
          en: 'The Catechetical School of Alexandria was the first great school of Christian teaching. Its teachers included Pantaenus, St Clement and Didymus the Blind. It taught the faith to the whole world and prepared many of the Church\'s leaders.',
          ar: 'كانت مدرسة الإسكندرية اللاهوتية أول مدرسة مسيحية كبرى للتعليم. ومن معلميها بنتينوس والقديس إكليمنضس وديديموس الضرير. علّمت الإيمان للعالم كله وأعدّت كثيرين من قادة الكنيسة.',
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
        title: { en: 'Through the Centuries', ar: 'عبر القرون' },
        text: {
          en: 'After the Arab conquest of Egypt in the 7th century, the Copts kept their faith through long periods of hardship. Arabic slowly became the everyday language, but the Coptic language is still used in the Church\'s prayers and hymns to this day.',
          ar: 'بعد دخول العرب مصر في القرن السابع حفظ الأقباط إيمانهم خلال فترات طويلة من الضيق. وصارت العربية تدريجياً لغة الحياة اليومية، لكن اللغة القبطية ما زالت تُستخدم في صلوات الكنيسة وألحانها حتى اليوم.',
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
    desc: { en: 'Nicaea, Constantinople, Ephesus and Chalcedon', ar: 'نيقية والقسطنطينية وأفسس وخلقيدونية' },
    items: [
      {
        title: { en: 'What is an Ecumenical Council?', ar: 'ما هو المجمع المسكوني؟' },
        text: {
          en: 'A gathering of bishops from the whole Church to defend the true faith against a false teaching (a heresy). The Coptic Orthodox Church accepts three Ecumenical Councils: Nicaea, Constantinople and Ephesus.',
          ar: 'اجتماع لأساقفة الكنيسة كلها للدفاع عن الإيمان المستقيم ضد تعليم خاطئ (بدعة). وتقبل الكنيسة القبطية الأرثوذكسية ثلاثة مجامع مسكونية: نيقية والقسطنطينية وأفسس.',
        },
      },
      {
        title: { en: 'Nicaea · AD 325', ar: 'مجمع نيقية · ٣٢٥م' },
        text: {
          en: 'The 318 fathers met against Arius, who taught that the Son is a creature and not truly God. Led by Pope Alexander of Alexandria and his deacon St Athanasius, the council declared that the Son is "of one essence with the Father" and wrote the first part of the Creed. It also set the way the date of Easter is calculated.',
          ar: 'اجتمع الـ٣١٨ أباً ضد آريوس الذي علّم أن الابن مخلوق وليس إلهاً حقيقياً. وبقيادة البابا ألكسندروس بابا الإسكندرية وشمّاسه القديس أثناسيوس أعلن المجمع أن الابن "مساوٍ للآب في الجوهر"، ووضع الجزء الأول من قانون الإيمان، كما حدّد طريقة حساب عيد القيامة.',
        },
      },
      {
        title: { en: 'Constantinople · AD 381', ar: 'مجمع القسطنطينية · ٣٨١م' },
        text: {
          en: 'The 150 fathers met against Macedonius, who denied that the Holy Spirit is God. The council confirmed that the Holy Spirit is Lord, the Giver of Life, worshipped and glorified with the Father and the Son, and completed the Creed.',
          ar: 'اجتمع الـ١٥٠ أباً ضد مقدونيوس الذي أنكر لاهوت الروح القدس. فأكّد المجمع أن الروح القدس هو الرب المحيي، المسجود له والممجَّد مع الآب والابن، وأكمل قانون الإيمان.',
        },
      },
      {
        title: { en: 'Ephesus · AD 431', ar: 'مجمع أفسس · ٤٣١م' },
        text: {
          en: 'The 200 fathers, led by St Cyril the Great, Pope of Alexandria, met against Nestorius, who divided Christ into two persons and refused to call St Mary the Mother of God. The council declared that St Mary is the Theotokos, the Mother of God, because the One she bore is God the Word made flesh. The introduction to the Creed, "We magnify you, O Mother of the True Light", comes from this council.',
          ar: 'اجتمع الـ٢٠٠ أب برئاسة القديس كيرلس الكبير بابا الإسكندرية ضد نسطور الذي قسّم المسيح إلى شخصين ورفض أن يدعو القديسة مريم والدة الإله. فأعلن المجمع أن القديسة مريم هي الثيئوطوكوس، والدة الإله، لأن الذي ولدته هو الله الكلمة المتجسد. ومن هذا المجمع جاءت مقدمة قانون الإيمان: "نعظمك يا أم النور الحقيقي".',
        },
      },
      {
        title: { en: 'Chalcedon · AD 451', ar: 'مجمع خلقيدونية · ٤٥١م' },
        text: {
          en: 'The Coptic Church does not accept the Council of Chalcedon. It described Christ as "in two natures", which St Dioscorus, Pope of Alexandria, saw as going back toward the division of Nestorius. He held to St Cyril\'s teaching and was exiled for it. Since then the Coptic Church has been part of the Oriental Orthodox family, with the Syriac, Armenian, Ethiopian, Eritrean and Indian Orthodox Churches.',
          ar: 'لا تقبل الكنيسة القبطية مجمع خلقيدونية، فقد وصف المسيح بأنه "في طبيعتين"، وهو ما رآه القديس ديسقوروس بابا الإسكندرية رجوعاً نحو انقسام نسطور. فتمسّك بتعليم القديس كيرلس ونُفي من أجله. ومنذ ذلك الوقت تنتمي الكنيسة القبطية إلى عائلة الكنائس الأرثوذكسية الشرقية مع الكنائس السريانية والأرمنية والإثيوبية والإريترية والهندية.',
        },
      },
      {
        title: { en: 'Toward Unity', ar: 'نحو الوحدة' },
        text: {
          en: 'In modern times, the Coptic Church has held dialogues with other churches. In 1989, at the Monastery of St Bishoy, theologians of the Oriental and Eastern Orthodox Churches agreed that both families hold the same faith in Christ, expressed in different words.',
          ar: 'في العصر الحديث أجرت الكنيسة القبطية حوارات مع الكنائس الأخرى. ففي سنة ١٩٨٩ في دير الأنبا بيشوي اتفق لاهوتيو الكنائس الأرثوذكسية الشرقية والبيزنطية على أن العائلتين تؤمنان بنفس الإيمان بالمسيح وإن عبّرتا عنه بكلمات مختلفة.',
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
          en: 'Seven priests (or fewer) pray over the sick and anoint them with oil for healing of body and soul (James 5:14–15).',
          ar: 'يصلي سبعة كهنة (أو أقل) على المريض ويدهنونه بالزيت لشفاء النفس والجسد (يعقوب ٥: ١٤–١٥).',
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
          en: 'We magnify you, O Mother of the True Light, and we glorify you, O saint and Mother of God, for you have brought forth unto us the Saviour of the whole world. He came and saved our souls. Glory to You, O our Master and our King, Christ, the pride of the apostles, the crown of the martyrs, the joy of the righteous, the firmness of the churches and the forgiveness of sins. We proclaim the Holy Trinity in one Godhead: we worship Him, we glorify Him. Lord have mercy, Lord have mercy, Lord bless us. Amen.',
          ar: 'نعظمك يا أم النور الحقيقي، ونمجدك أيتها العذراء القديسة والدة الإله، لأنك ولدت لنا مخلص العالم، أتى وخلّص نفوسنا. المجد لك يا سيدنا وملكنا المسيح، فخر الرسل، إكليل الشهداء، تهليل الصديقين، ثبات الكنائس، غفران الخطايا. نبشر بالثالوث القدوس، لاهوت واحد، نسجد له ونمجده. يا رب ارحم، يا رب ارحم، يا رب بارك، آمين.',
        },
      },
      {
        title: { en: 'The Creed', ar: 'قانون الإيمان' },
        text: {
          en: 'We believe in one God, God the Father, the Pantocrator, who created heaven and earth, and all things, seen and unseen.\n\nWe believe in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father before all ages: Light of Light, true God of true God, begotten not created, of one essence with the Father, by whom all things were made. Who for us men and for our salvation came down from heaven, and was incarnate of the Holy Spirit and of the Virgin Mary, and became man. And He was crucified for us under Pontius Pilate, suffered and was buried. And on the third day He rose from the dead according to the Scriptures, ascended into the heavens, and sat at the right hand of His Father. And He is coming again in His glory to judge the living and the dead, whose kingdom shall have no end.\n\nYes, we believe in the Holy Spirit, the Lord, the Giver of Life, who proceeds from the Father, who with the Father and the Son is worshipped and glorified, who spoke by the prophets. And in one, holy, catholic and apostolic Church. We confess one baptism for the remission of sins. We look for the resurrection of the dead and the life of the coming age. Amen.',
          ar: 'بالحقيقة نؤمن بإله واحد، الله الآب، ضابط الكل، خالق السماء والأرض، ما يُرى وما لا يُرى.\n\nنؤمن برب واحد يسوع المسيح، ابن الله الوحيد، المولود من الآب قبل كل الدهور، نور من نور، إله حق من إله حق، مولود غير مخلوق، مساوٍ للآب في الجوهر، الذي به كان كل شيء. هذا الذي من أجلنا نحن البشر ومن أجل خلاصنا، نزل من السماء وتجسّد من الروح القدس ومن مريم العذراء، تأنّس. وصُلب عنا على عهد بيلاطس البنطي، تألّم وقُبر، وقام من بين الأموات في اليوم الثالث كما في الكتب، وصعد إلى السموات، وجلس عن يمين أبيه، وأيضاً يأتي في مجده ليدين الأحياء والأموات، الذي ليس لملكه انقضاء.\n\nنعم نؤمن بالروح القدس، الرب المحيي، المنبثق من الآب، نسجد له ونمجده مع الآب والابن، الناطق في الأنبياء. وبكنيسة واحدة مقدسة جامعة رسولية. ونعترف بمعمودية واحدة لمغفرة الخطايا. وننتظر قيامة الأموات وحياة الدهر الآتي. آمين.',
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
          en: 'The 20th Pope of Alexandria. As a deacon he defended the divinity of Christ at Nicaea, and as Pope he was exiled five times for the faith. He is called "the Apostolic" and "the defender of the faith". He wrote "On the Incarnation" and the Life of St Antony.',
          ar: 'البابا العشرون للإسكندرية. دافع وهو شماس عن لاهوت المسيح في مجمع نيقية، ونُفي خمس مرات وهو بابا من أجل الإيمان. يُلقّب بـ"الرسولي" و"حامي الإيمان". كتب "تجسد الكلمة" وسيرة القديس أنطونيوس.',
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
          en: 'The 25th Pope of Alexandria. He refused the Council of Chalcedon to stay faithful to St Cyril\'s teaching, and died in exile.',
          ar: 'البابا الخامس والعشرون للإسكندرية. رفض مجمع خلقيدونية ليبقى أميناً لتعليم القديس كيرلس، ومات في المنفى.',
        },
      },
      {
        title: { en: 'St Antony the Great', ar: 'القديس الأنبا أنطونيوس الكبير' },
        text: {
          en: 'The father of all monks. As a young man he heard the Gospel "Go, sell what you have and give to the poor", obeyed it, and went into the desert. His monastery near the Red Sea still stands.',
          ar: 'أب جميع الرهبان. سمع في شبابه الإنجيل: "اذهب بع أملاكك وأعط الفقراء" فأطاع وخرج إلى البرية. وما زال ديره قرب البحر الأحمر قائماً.',
        },
      },
      {
        title: { en: 'St Shenouda the Archimandrite', ar: 'القديس الأنبا شنوده رئيس المتوحدين' },
        text: {
          en: 'Head of the White Monastery near Sohag and a great teacher of the Coptic language. He went with St Cyril to the Council of Ephesus.',
          ar: 'رئيس الدير الأبيض بجوار سوهاج ومعلم عظيم للغة القبطية. رافق القديس كيرلس إلى مجمع أفسس.',
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
  { q: b('Who was exiled five times for the faith?', 'من نُفي خمس مرات من أجل الإيمان؟'), right: people.athanasius, wrong: [people.cyril, people.dioscorus, people.antony] },
  { q: b('Who wrote "On the Incarnation"?', 'من كتب "تجسد الكلمة"؟'), right: people.athanasius, wrong: [people.cyril, people.dioscorus, people.mark] },
];

// A round of random questions about the faith
export function buildFaithQuiz(lang: 'en' | 'ar', count = 10, random: () => number = Math.random): QuizQuestion[] {
  return buildQuiz(faithQuestions, lang, count, random);
}
