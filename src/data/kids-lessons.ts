import type { Bilingual, GuideQuestion } from './deacon-guide';
import { buildQuiz } from './deacon-guide';
import type { QuizQuestion } from './quiz';

// Kids Corner (Settings > Kids mode, 2026-11-12): short Bible stories and lessons of the faith for children, in simple
// words, each with a verse, one thing to remember and a three-question quiz. Written from the Holy Bible (NKJV and Van
// Dyck), the Synaxarium and the same Coptic Orthodox teaching as the Theology School (theology-lessons-*.ts); keep
// them in step with it. Nothing here is a guess: check any new fact the same way before adding it.

export interface KidLesson {
  id: string;
  // A big picture for the card
  emoji: string;
  title: Bilingual;
  // The story, in three short steps
  steps: Bilingual[];
  verse: { text: Bilingual; ref: Bilingual };
  remember: Bilingual;
  quiz: GuideQuestion[];
}

const b = (en: string, ar: string): Bilingual => ({ en, ar });
const q = (question: [string, string], right: [string, string], wrong: [string, string][]): GuideQuestion => ({
  q: b(...question),
  right: b(...right),
  wrong: wrong.map((w) => b(...w)),
});

export const kidLessons: KidLesson[] = [
  {
    id: 'creation',
    emoji: '🌍',
    title: b('God Made Everything', 'الله خلق كل شيء'),
    steps: [
      b(
        'In the beginning there was nothing but God. Then God spoke, and light came! He made the sky, the sea, the land, the sun, the moon and the stars.',
        'في البدء لم يكن شيء إلا الله. ثم تكلم الله فكان النور! وخلق السماء والبحر والأرض والشمس والقمر والنجوم.'
      ),
      b(
        'God made the fish, the birds and all the animals. Last of all He made a man and a woman, Adam and Eve, in His own image.',
        'وخلق الله الأسماك والطيور وكل الحيوانات. وفي النهاية خلق رجلاً وامرأة، آدم وحواء، على صورته.'
      ),
      b(
        'God made everything in six days, and on the seventh day He rested. He looked at all He had made, and it was very good.',
        'خلق الله كل شيء في ستة أيام، وفي اليوم السابع استراح. ونظر إلى كل ما عمله فإذا هو حسن جداً.'
      ),
    ],
    verse: { text: b('"In the beginning God created the heavens and the earth."', '"فِي الْبَدْءِ خَلَقَ اللهُ السَّمَاوَاتِ وَالأَرْضَ."'), ref: b('Genesis 1:1', 'تكوين ١: ١') },
    remember: b('God made everything, and He made you because He loves you.', 'الله خلق كل شيء، وخلقك أنت لأنه يحبك.'),
    quiz: [
      q(['What did God make first?', 'ماذا خلق الله أولاً؟'], ['Light', 'النور'], [['Animals', 'الحيوانات'], ['People', 'الناس'], ['Houses', 'البيوت']]),
      q(['On which day did God rest?', 'في أي يوم استراح الله؟'], ['The seventh day', 'اليوم السابع'], [['The first day', 'اليوم الأول'], ['The third day', 'اليوم الثالث'], ['He never rested', 'لم يسترح أبداً']]),
      q(['Who were the first man and woman?', 'من هما أول رجل وامرأة؟'], ['Adam and Eve', 'آدم وحواء'], [['Abraham and Sarah', 'إبراهيم وسارة'], ['Joseph and Mary', 'يوسف ومريم'], ['Noah and his wife', 'نوح وامرأته']]),
    ],
  },
  {
    id: 'trinity',
    emoji: '☀️',
    title: b('One God: Father, Son and Holy Spirit', 'إله واحد: الآب والابن والروح القدس'),
    steps: [
      b(
        'We believe in one God. We say it every time we pray: "In the name of the Father, the Son and the Holy Spirit, one God. Amen."',
        'نحن نؤمن بإله واحد. ونقول ذلك كلما صلّينا: "باسم الآب والابن والروح القدس، الإله الواحد. آمين."'
      ),
      b(
        'Think of the sun. It is one sun, with its light and its warmth. The Church\'s teachers used this picture to help us understand one God, Father, Son and Holy Spirit.',
        'فكّر في الشمس. هي شمس واحدة، ومعها نورها ودفؤها. وقد استخدم معلمو الكنيسة هذه الصورة ليساعدونا أن نفهم الإله الواحد: الآب والابن والروح القدس.'
      ),
      b(
        'When Jesus was baptized in the Jordan River, the Father spoke from heaven and the Holy Spirit came down like a dove.',
        'عندما اعتمد يسوع في نهر الأردن، تكلم الآب من السماء، ونزل الروح القدس مثل حمامة.'
      ),
    ],
    verse: {
      text: b('"Baptizing them in the name of the Father and of the Son and of the Holy Spirit."', '"وَعَمِّدُوهُمْ بِاسْمِ الآبِ وَالابْنِ وَالرُّوحِ الْقُدُسِ."'),
      ref: b('Matthew 28:19', 'متى ٢٨: ١٩'),
    },
    remember: b('There is only one God: the Father, the Son and the Holy Spirit.', 'يوجد إله واحد فقط: الآب والابن والروح القدس.'),
    quiz: [
      q(['How many gods are there?', 'كم إلهاً يوجد؟'], ['One God', 'إله واحد'], [['Two', 'اثنان'], ['Three', 'ثلاثة'], ['Many', 'كثيرون']]),
      q(['What came down like a dove when Jesus was baptized?', 'ماذا نزل مثل حمامة عندما اعتمد يسوع؟'], ['The Holy Spirit', 'الروح القدس'], [['An angel', 'ملاك'], ['A real bird only', 'طائر عادي فقط'], ['A cloud', 'سحابة']]),
      q(['Which picture helps us understand one God?', 'أي صورة تساعدنا أن نفهم الإله الواحد؟'], ['The sun with its light and warmth', 'الشمس ونورها ودفؤها'], [['Three different suns', 'ثلاث شموس مختلفة'], ['Three kings', 'ثلاثة ملوك'], ['A big mountain', 'جبل كبير']]),
    ],
  },
  {
    id: 'adam-eve',
    emoji: '🍎',
    title: b('Adam and Eve', 'آدم وحواء'),
    steps: [
      b(
        'God put Adam and Eve in a beautiful garden called Eden. They could eat from every tree except one, and God told them not to eat from that tree.',
        'وضع الله آدم وحواء في جنة جميلة اسمها عدن. وكان يمكنهما أن يأكلا من كل الأشجار إلا شجرة واحدة، أوصاهما الله ألا يأكلا منها.'
      ),
      b(
        'The serpent tricked Eve, and she and Adam ate from the tree. They disobeyed God, and they had to leave the garden.',
        'خدعت الحيّة حواء، فأكلت هي وآدم من الشجرة. لقد عصيا الله، فخرجا من الجنة.'
      ),
      b(
        'But God still loved them. He promised to send a Savior. That Savior is Jesus, who came to bring us back to God.',
        'لكن الله ظل يحبهما، ووعد أن يرسل مخلّصاً. وهذا المخلّص هو يسوع، الذي جاء ليرجعنا إلى الله.'
      ),
    ],
    verse: {
      text: b('"For the Son of Man has come to seek and to save that which was lost."', '"لأَنَّ ابْنَ الإِنْسَانِ قَدْ جَاءَ لِكَيْ يَطْلُبَ وَيُخَلِّصَ مَا قَدْ هَلَكَ."'),
      ref: b('Luke 19:10', 'لوقا ١٩: ١٠'),
    },
    remember: b('Even when we do wrong, God loves us and wants us to come back to Him.', 'حتى عندما نخطئ، الله يحبنا ويريدنا أن نرجع إليه.'),
    quiz: [
      q(['What was the garden called?', 'ما اسم الجنة؟'], ['Eden', 'عدن'], [['Egypt', 'مصر'], ['Bethlehem', 'بيت لحم'], ['Jerusalem', 'أورشليم']]),
      q(['Who tricked Eve?', 'من خدع حواء؟'], ['The serpent', 'الحيّة'], [['A lion', 'أسد'], ['Adam', 'آدم'], ['An angel', 'ملاك']]),
      q(['Whom did God promise to send?', 'من وعد الله أن يرسل؟'], ['A Savior: Jesus', 'مخلّصاً: يسوع'], [['A new garden', 'جنة جديدة'], ['A king of Egypt', 'ملكاً لمصر'], ['Nobody', 'لا أحد']]),
    ],
  },
  {
    id: 'noah',
    emoji: '🌈',
    title: b("Noah's Ark", 'فلك نوح'),
    steps: [
      b(
        'Noah loved God and obeyed Him. God told Noah to build a very big boat, called an ark.',
        'كان نوح يحب الله ويطيعه. فقال له الله أن يبني سفينة كبيرة جداً اسمها الفلك.'
      ),
      b(
        'Noah, his family (eight people in all) and the animals went into the ark. Then it rained for forty days and forty nights, but everyone in the ark was safe.',
        'دخل نوح وعائلته (ثمانية أشخاص) والحيوانات إلى الفلك. ثم نزل المطر أربعين يوماً وأربعين ليلة، لكن كل من في الفلك كان في أمان.'
      ),
      b(
        'When the water went down, a dove came back with an olive leaf. God put a rainbow in the sky as a sign of His promise.',
        'وعندما نزلت المياه، رجعت حمامة وفي فمها ورقة زيتون. ووضع الله قوس قزح في السماء علامة لوعده.'
      ),
    ],
    verse: {
      text: b('"I set My rainbow in the cloud, and it shall be for the sign of the covenant between Me and the earth."', '"وَضَعْتُ قَوْسِي فِي السَّحَابِ فَتَكُونُ عَلاَمَةَ مِيثَاق بَيْنِي وَبَيْنَ الأَرْضِ."'),
      ref: b('Genesis 9:13', 'تكوين ٩: ١٣'),
    },
    remember: b('God keeps His promises. When we obey Him, He keeps us safe.', 'الله يحفظ وعوده. وعندما نطيعه يحفظنا.'),
    quiz: [
      q(['What did Noah build?', 'ماذا بنى نوح؟'], ['An ark (a big boat)', 'فلكاً (سفينة كبيرة)'], [['A tower', 'برجاً'], ['A house', 'بيتاً'], ['A church', 'كنيسة']]),
      q(['How long did it rain?', 'كم مدة نزول المطر؟'], ['Forty days and forty nights', 'أربعين يوماً وأربعين ليلة'], [['One day', 'يوماً واحداً'], ['Seven days', 'سبعة أيام'], ['One year without stopping', 'سنة كاملة بلا توقف']]),
      q(['What did God put in the sky as a sign?', 'ماذا وضع الله في السماء علامة؟'], ['A rainbow', 'قوس قزح'], [['A new star', 'نجماً جديداً'], ['A second moon', 'قمراً ثانياً'], ['A cloud shaped like a dove', 'سحابة على شكل حمامة']]),
    ],
  },
  {
    id: 'david',
    emoji: '🪨',
    title: b('David and Goliath', 'داود وجليات'),
    steps: [
      b(
        'David was a young shepherd boy who looked after his father\'s sheep. When a lion or a bear came, God helped David protect the sheep.',
        'كان داود فتى راعياً يرعى غنم أبيه. وعندما كان يأتي أسد أو دب، كان الله يعين داود ليحمي الغنم.'
      ),
      b(
        'A giant soldier named Goliath made fun of God\'s people, and everyone was afraid of him. But David was not afraid, because he trusted God.',
        'كان جندي عملاق اسمه جليات يعيّر شعب الله، وكان الجميع خائفين منه. لكن داود لم يخف لأنه كان يثق في الله.'
      ),
      b(
        'David took five smooth stones and his sling. With just one stone, God gave David the victory! Later David became king, and he wrote many of the Psalms we pray.',
        'أخذ داود خمسة حجارة ملساء ومقلاعه. وبحجر واحد فقط أعطاه الله النصرة! وصار داود ملكاً فيما بعد، وكتب كثيراً من المزامير التي نصليها.'
      ),
    ],
    verse: { text: b('"The Lord is my light and my salvation; whom shall I fear?"', '"اَلرَّبُّ نُورِي وَخَلاَصِي، مِمَّنْ أَخَافُ؟"'), ref: b('Psalm 27:1 (26 in the Agpeya)', 'مزمور ٢٧: ١ (٢٦ في الأجبية)') },
    remember: b('When something seems too big for you, trust God. He is bigger.', 'عندما يبدو أمر أكبر منك، ثق في الله، فهو أكبر من كل شيء.'),
    quiz: [
      q(['What was David\'s job when he was young?', 'ماذا كان عمل داود وهو صغير؟'], ['A shepherd', 'راعي غنم'], [['A fisherman', 'صياد سمك'], ['A carpenter', 'نجار'], ['A soldier', 'جندي']]),
      q(['How many stones did David take?', 'كم حجراً أخذ داود؟'], ['Five', 'خمسة'], [['One', 'واحداً'], ['Ten', 'عشرة'], ['Twelve', 'اثني عشر']]),
      q(['Why was David not afraid?', 'لماذا لم يخف داود؟'], ['He trusted God', 'لأنه كان يثق في الله'], [['He was a giant too', 'لأنه كان عملاقاً أيضاً'], ['He had a big army', 'لأنه كان معه جيش كبير'], ['Goliath was asleep', 'لأن جليات كان نائماً']]),
    ],
  },
  {
    id: 'nativity',
    emoji: '⭐',
    title: b('Jesus Is Born', 'ميلاد يسوع'),
    steps: [
      b(
        'St Mary and St Joseph travelled to Bethlehem. There was no room for them in the inn, so baby Jesus was born and laid in a manger.',
        'سافرت القديسة مريم والقديس يوسف إلى بيت لحم. ولم يكن لهما موضع في المنزل، فوُلد الطفل يسوع ووُضع في مذود.'
      ),
      b(
        'Angels told shepherds in the fields the good news, and they came to see Him. Wise men from the East followed a star and brought gifts: gold, frankincense and myrrh.',
        'أخبرت الملائكة الرعاة في الحقول بالخبر السار فجاءوا ليروه. وتبع مجوس من المشرق نجماً وقدّموا له هدايا: ذهباً ولباناً ومراً.'
      ),
      b(
        'Jesus is God the Son, who became a little baby for us. The Coptic Church celebrates His birth on 29 Kiahk (usually 7 January), after the Nativity Fast.',
        'يسوع هو الله الابن الذي صار طفلاً صغيراً من أجلنا. وتحتفل الكنيسة القبطية بميلاده في ٢٩ كيهك (عادةً ٧ يناير) بعد صوم الميلاد.'
      ),
    ],
    verse: {
      text: b('"For there is born to you this day in the city of David a Savior, who is Christ the Lord."', '"أَنَّهُ وُلِدَ لَكُمُ الْيَوْمَ فِي مَدِينَةِ دَاوُدَ مُخَلِّصٌ هُوَ الْمَسِيحُ الرَّبُّ."'),
      ref: b('Luke 2:11', 'لوقا ٢: ١١'),
    },
    remember: b('God loved us so much that He became a baby, to save us.', 'أحبنا الله جداً حتى صار طفلاً ليخلّصنا.'),
    quiz: [
      q(['Where was Jesus born?', 'أين وُلد يسوع؟'], ['Bethlehem', 'بيت لحم'], [['Alexandria', 'الإسكندرية'], ['Rome', 'روما'], ['Nazareth', 'الناصرة']]),
      q(['Where was baby Jesus laid?', 'أين وُضع الطفل يسوع؟'], ['In a manger', 'في مذود'], [['In a palace', 'في قصر'], ['In a boat', 'في سفينة'], ['In a tent', 'في خيمة']]),
      q(['What led the wise men?', 'ماذا قاد المجوس؟'], ['A star', 'نجم'], [['A map', 'خريطة'], ['A river', 'نهر'], ['A shepherd', 'راعٍ']]),
    ],
  },
  {
    id: 'holy-family',
    emoji: '🌴',
    title: b('The Holy Family Comes to Egypt', 'العائلة المقدسة في مصر'),
    steps: [
      b(
        'King Herod wanted to hurt baby Jesus. An angel told St Joseph in a dream: "Arise, take the young Child and His mother, flee to Egypt."',
        'أراد الملك هيرودس أن يؤذي الطفل يسوع. فظهر ملاك ليوسف في حلم وقال: "قُم وخذ الصبي وأمه واهرب إلى مصر."'
      ),
      b(
        'So Jesus, St Mary and St Joseph came to Egypt. They travelled to many places, as far as Upper Egypt. Churches and monasteries stand in many of those places today.',
        'فجاء يسوع والقديسة مريم والقديس يوسف إلى مصر، وتنقلوا في أماكن كثيرة حتى صعيد مصر. واليوم توجد كنائس وأديرة في كثير من هذه الأماكن.'
      ),
      b(
        'Long before, the prophet Isaiah said, "Blessed is Egypt My people." The Church celebrates the Holy Family\'s coming to Egypt on 24 Bashans.',
        'وقبل ذلك بزمن طويل قال إشعياء النبي: "مبارك شعبي مصر." وتحتفل الكنيسة بدخول العائلة المقدسة أرض مصر في ٢٤ بشنس.'
      ),
    ],
    verse: { text: b('"Blessed is Egypt My people."', '"مُبَارَكٌ شَعْبِي مِصْرُ."'), ref: b('Isaiah 19:25', 'إشعياء ١٩: ٢٥') },
    remember: b('Jesus Himself visited Egypt and blessed it.', 'يسوع نفسه زار مصر وباركها.'),
    quiz: [
      q(['Who told St Joseph to go to Egypt?', 'من قال للقديس يوسف أن يذهب إلى مصر؟'], ['An angel, in a dream', 'ملاك في حلم'], [['King Herod', 'الملك هيرودس'], ['The shepherds', 'الرعاة'], ['A soldier', 'جندي']]),
      q(['Which prophet said "Blessed is Egypt My people"?', 'أي نبي قال "مبارك شعبي مصر"؟'], ['Isaiah', 'إشعياء'], [['Jonah', 'يونان'], ['Daniel', 'دانيال'], ['Moses', 'موسى']]),
      q(['When does the Church celebrate the Holy Family\'s coming to Egypt?', 'متى تحتفل الكنيسة بدخول العائلة المقدسة مصر؟'], ['24 Bashans', '٢٤ بشنس'], [['29 Kiahk', '٢٩ كيهك'], ['1 Tout', '١ توت'], ['16 Misra', '١٦ مسرى']]),
    ],
  },
  {
    id: 'children',
    emoji: '🤗',
    title: b('Jesus Loves Children', 'يسوع يحب الأطفال'),
    steps: [
      b(
        'One day people brought little children to Jesus so that He would bless them.',
        'في يوم من الأيام أحضر الناس أطفالاً صغاراً إلى يسوع لكي يباركهم.'
      ),
      b(
        'The disciples tried to send the children away. But Jesus was not pleased with them. He said, "Let the little children come to Me."',
        'حاول التلاميذ أن يمنعوا الأطفال. لكن يسوع لم يرضَ بذلك وقال: "دعوا الأولاد يأتون إليّ."'
      ),
      b(
        'Then Jesus took the children in His arms, put His hands on them and blessed them. You are never too small for Jesus!',
        'ثم احتضن يسوع الأطفال ووضع يديه عليهم وباركهم. أنت لست صغيراً أبداً على يسوع!'
      ),
    ],
    verse: {
      text: b('"Let the little children come to Me, and do not forbid them; for of such is the kingdom of God."', '"دَعُوا الأَوْلاَدَ يَأْتُونَ إِلَيَّ وَلاَ تَمْنَعُوهُمْ، لأَنَّ لِمِثْلِ هؤُلاَءِ مَلَكُوتَ اللهِ."'),
      ref: b('Mark 10:14', 'مرقس ١٠: ١٤'),
    },
    remember: b('Jesus loves you and always wants you close to Him.', 'يسوع يحبك ويريدك دائماً قريباً منه.'),
    quiz: [
      q(['Who tried to send the children away?', 'من حاول أن يمنع الأطفال؟'], ['The disciples', 'التلاميذ'], [['Their parents', 'آباؤهم'], ['The angels', 'الملائكة'], ['Jesus', 'يسوع']]),
      q(['What did Jesus say?', 'ماذا قال يسوع؟'], ['"Let the little children come to Me"', '"دعوا الأولاد يأتون إليّ"'], [['"Go home"', '"اذهبوا إلى البيت"'], ['"Come back when you are older"', '"تعالوا عندما تكبرون"'], ['"Be quiet"', '"اسكتوا"']]),
      q(['What did Jesus do with the children?', 'ماذا فعل يسوع مع الأطفال؟'], ['He took them in His arms and blessed them', 'احتضنهم وباركهم'], [['He sent them away', 'صرفهم'], ['He gave them homework', 'أعطاهم واجباً'], ['Nothing', 'لا شيء']]),
    ],
  },
  {
    id: 'resurrection',
    emoji: '✝️',
    title: b('Jesus Died and Rose Again', 'يسوع مات وقام'),
    steps: [
      b(
        'Jesus loved us so much that He gave His life for us on the Cross, on the day we call Good Friday. He did it freely, to save us from sin and death.',
        'أحبنا يسوع جداً حتى بذل حياته لأجلنا على الصليب، في اليوم الذي نسميه الجمعة العظيمة. فعل ذلك بإرادته ليخلّصنا من الخطية والموت.'
      ),
      b(
        'He was buried in a tomb, and a big stone was rolled in front of it.',
        'ودُفن في قبر، ودُحرج حجر كبير على بابه.'
      ),
      b(
        'On the third day Jesus rose from the dead! An angel told the women, "He is not here; for He is risen." At the Feast of the Resurrection we say: "Christ is risen!" "Truly He is risen!"',
        'وفي اليوم الثالث قام يسوع من الأموات! وقال ملاك للنساء: "ليس هو ههنا لأنه قام." وفي عيد القيامة نقول: "المسيح قام!" "بالحقيقة قام!"'
      ),
    ],
    verse: { text: b('"He is not here; for He is risen, as He said."', '"لَيْسَ هُوَ ههُنَا، لأَنَّهُ قَامَ كَمَا قَالَ."'), ref: b('Matthew 28:6', 'متى ٢٨: ٦') },
    remember: b('Jesus is alive! He beat death for us.', 'يسوع حيّ! لقد غلب الموت من أجلنا.'),
    quiz: [
      q(['On which day did Jesus rise?', 'في أي يوم قام يسوع؟'], ['The third day', 'اليوم الثالث'], [['The same day', 'في اليوم نفسه'], ['After a year', 'بعد سنة'], ['The tenth day', 'اليوم العاشر']]),
      q(['Why did Jesus die on the Cross?', 'لماذا مات يسوع على الصليب؟'], ['Because He loves us and came to save us', 'لأنه يحبنا وجاء ليخلّصنا'], [['He could not escape', 'لأنه لم يستطع الهروب'], ['By accident', 'بالصدفة'], ['Because He did something wrong', 'لأنه فعل شيئاً خاطئاً']]),
      q(['What do we answer to "Christ is risen!"?', 'بماذا نرد على "المسيح قام!"؟'], ['"Truly He is risen!"', '"بالحقيقة قام!"'], [['"Good morning!"', '"صباح الخير!"'], ['"Amen, amen"', '"آمين، آمين"'], ['"Happy birthday!"', '"عيد ميلاد سعيد!"']]),
    ],
  },
  {
    id: 'pentecost',
    emoji: '🔥',
    title: b('The Holy Spirit Comes', 'حلول الروح القدس'),
    steps: [
      b(
        'After Jesus rose, He went up to heaven. He promised His disciples that the Holy Spirit would come to them.',
        'بعد أن قام يسوع صعد إلى السماء، ووعد تلاميذه أن الروح القدس سيأتي إليهم.'
      ),
      b(
        'On the day of Pentecost, fifty days after the Resurrection, the Holy Spirit came down on them like tongues of fire. They began to speak in other languages!',
        'وفي يوم الخمسين، بعد خمسين يوماً من القيامة، حلّ عليهم الروح القدس بألسنة كأنها من نار، فابتدأوا يتكلمون بلغات أخرى!'
      ),
      b(
        'The disciples were not afraid any more. St Peter preached, and about three thousand people were baptized that day. We receive the Holy Spirit too, in the Holy Myron after baptism.',
        'ولم يعد التلاميذ خائفين. فوعظ القديس بطرس، واعتمد في ذلك اليوم نحو ثلاثة آلاف نفس. ونحن أيضاً ننال الروح القدس بالميرون بعد المعمودية.'
      ),
    ],
    verse: {
      text: b('"But you shall receive power when the Holy Spirit has come upon you."', '"لكِنَّكُمْ سَتَنَالُونَ قُوَّةً مَتَى حَلَّ الرُّوحُ الْقُدُسُ عَلَيْكُمْ."'),
      ref: b('Acts 1:8', 'أعمال ١: ٨'),
    },
    remember: b('The Holy Spirit lives in us and makes us brave.', 'الروح القدس يسكن فينا ويجعلنا شجعاناً.'),
    quiz: [
      q(['How did the Holy Spirit come down?', 'كيف حلّ الروح القدس؟'], ['Like tongues of fire', 'بألسنة كأنها من نار'], [['Like snow', 'مثل الثلج'], ['Like a big wave', 'مثل موجة كبيرة'], ['Like a rainbow', 'مثل قوس قزح']]),
      q(['How many days after the Resurrection is Pentecost?', 'بعد كم يوم من القيامة يأتي يوم الخمسين؟'], ['Fifty', 'خمسين'], [['Three', 'ثلاثة'], ['Forty', 'أربعين'], ['Seven', 'سبعة']]),
      q(['About how many people were baptized that day?', 'كم نفساً اعتمدت في ذلك اليوم تقريباً؟'], ['About three thousand', 'نحو ثلاثة آلاف'], [['Twelve', 'اثنا عشر'], ['One hundred', 'مئة'], ['Nobody', 'لا أحد']]),
    ],
  },
  {
    id: 'st-mary',
    emoji: '💙',
    title: b('St Mary, Mother of God', 'القديسة مريم والدة الإله'),
    steps: [
      b(
        'The angel Gabriel came to St Mary and said, "Rejoice, highly favored one, the Lord is with you!" He told her she would be the mother of Jesus, the Son of God.',
        'جاء الملاك جبرائيل إلى القديسة مريم وقال: "سلام لكِ أيتها المنعم عليها! الرب معكِ." وأخبرها أنها ستكون أم يسوع ابن الله.'
      ),
      b(
        'St Mary said yes to God: "Let it be to me according to your word." Because her Son Jesus is God, we call her the Mother of God (Theotokos).',
        'وقالت القديسة مريم نعم لله: "ليكن لي كقولك." ولأن ابنها يسوع هو الله، نسمّيها والدة الإله (ثيئوطوكوس).'
      ),
      b(
        'St Mary is our mother too, and she prays for us. The Church sings her praises often, and most of all in the month of Kiahk.',
        'والقديسة مريم أمنا أيضاً، وهي تصلي لأجلنا. والكنيسة تسبّحها كثيراً، وخصوصاً في شهر كيهك.'
      ),
    ],
    verse: { text: b('"Rejoice, highly favored one, the Lord is with you."', '"سَلاَمٌ لَكِ أَيَّتُهَا الْمُنْعَمُ عَلَيْهَا! اَلرَّبُّ مَعَكِ."'), ref: b('Luke 1:28', 'لوقا ١: ٢٨') },
    remember: b('St Mary said yes to God. We can say yes to God too.', 'القديسة مريم قالت نعم لله، ونحن أيضاً نستطيع أن نقول نعم لله.'),
    quiz: [
      q(['Which angel came to St Mary?', 'أي ملاك جاء إلى القديسة مريم؟'], ['Gabriel', 'جبرائيل'], [['Michael', 'ميخائيل'], ['Raphael', 'رافائيل'], ['No angel came', 'لم يأتِ ملاك']]),
      q(['Why do we call St Mary the Mother of God?', 'لماذا نسمّي القديسة مريم والدة الإله؟'], ['Because her Son Jesus is God', 'لأن ابنها يسوع هو الله'], [['Because she is very old', 'لأنها كبيرة جداً في السن'], ['Because she was a queen', 'لأنها كانت ملكة'], ['Because she made the world', 'لأنها خلقت العالم']]),
      q(['In which Coptic month do we sing her praises the most?', 'في أي شهر قبطي نسبّحها أكثر؟'], ['Kiahk', 'كيهك'], [['Tout', 'توت'], ['Amshir', 'أمشير'], ['Bashans', 'بشنس']]),
    ],
  },
  {
    id: 'angels',
    emoji: '👼',
    title: b('The Angels', 'الملائكة'),
    steps: [
      b(
        'Angels are spirits whom God created. They worship God all the time and carry His messages.',
        'الملائكة أرواح خلقها الله. يسبّحون الله دائماً ويحملون رسائله.'
      ),
      b(
        'The Archangel Michael is the head of the angels. The Coptic Church remembers him on the 12th of every Coptic month. The Archangel Gabriel brought the good news to St Mary.',
        'رئيس الملائكة ميخائيل هو رئيس جند الملائكة، وتذكره الكنيسة القبطية في يوم ١٢ من كل شهر قبطي. ورئيس الملائكة جبرائيل حمل البشارة للقديسة مريم.'
      ),
      b(
        'Jesus said that children have angels in heaven who always see the face of God the Father. God sends His angels to keep you safe.',
        'قال يسوع إن للأطفال ملائكة في السماوات ينظرون كل حين وجه الآب. والله يرسل ملائكته ليحفظوك.'
      ),
    ],
    verse: {
      text: b('"For He shall give His angels charge over you, to keep you in all your ways."', '"لأَنَّهُ يُوصِي مَلاَئِكَتَهُ بِكَ لِكَيْ يَحْفَظُوكَ فِي كُلِّ طُرُقِكَ."'),
      ref: b('Psalm 91:11 (90 in the Agpeya)', 'مزمور ٩١: ١١ (٩٠ في الأجبية)'),
    },
    remember: b('God\'s angels watch over you.', 'ملائكة الله يحرسونك.'),
    quiz: [
      q(['Who is the head of the angels?', 'من هو رئيس جند الملائكة؟'], ['The Archangel Michael', 'رئيس الملائكة ميخائيل'], [['St George', 'مارجرجس'], ['King David', 'داود الملك'], ['St Mark', 'القديس مرقس']]),
      q(['On which day of each Coptic month do we remember Archangel Michael?', 'في أي يوم من كل شهر قبطي نذكر رئيس الملائكة ميخائيل؟'], ['The 12th', 'يوم ١٢'], [['The 1st', 'يوم ١'], ['The 21st', 'يوم ٢١'], ['The 29th', 'يوم ٢٩']]),
      q(['What do angels do?', 'ماذا يفعل الملائكة؟'], ['Worship God and carry His messages', 'يسبّحون الله ويحملون رسائله'], [['Nothing at all', 'لا شيء'], ['They are people who died', 'هم أناس ماتوا'], ['They make the weather', 'يصنعون الطقس']]),
    ],
  },
  {
    id: 'st-mark',
    emoji: '🦁',
    title: b('St Mark Brings Jesus to Egypt', 'مارمرقس يبشّر مصر'),
    steps: [
      b(
        'St Mark wrote one of the four Gospels. He came to Alexandria in Egypt to tell everyone about Jesus.',
        'كتب القديس مرقس أحد الأناجيل الأربعة، وجاء إلى الإسكندرية في مصر ليبشّر الجميع بيسوع.'
      ),
      b(
        'When he arrived, his sandal broke. A shoemaker named Anianus fixed it, but he hurt his hand and cried out, "God is one!" St Mark healed his hand and told him about the one true God.',
        'عندما وصل انقطع حذاؤه، فأصلحه إسكافي اسمه إنيانوس، لكنه جرح يده وصرخ: "يا الله الواحد!" فشفى القديس مرقس يده وبشّره بالإله الحقيقي الواحد.'
      ),
      b(
        'Anianus and his family believed and were baptized. St Mark started the Church in Egypt, and every Coptic Pope since sits on his chair. Pope Tawadros II is the 118th.',
        'فآمن إنيانوس وأهل بيته واعتمدوا. وأسس القديس مرقس الكنيسة في مصر، وكل بابا قبطي منذ ذلك الحين يجلس على كرسيه، والبابا تواضروس الثاني هو الـ١١٨.'
      ),
    ],
    verse: {
      text: b('"Go into all the world and preach the gospel to every creature."', '"اذْهَبُوا إِلَى الْعَالَمِ أَجْمَعَ وَاكْرِزُوا بِالإِنْجِيلِ لِلْخَلِيقَةِ كُلِّهَا."'),
      ref: b('Mark 16:15', 'مرقس ١٦: ١٥'),
    },
    remember: b('St Mark brought the good news of Jesus to Egypt.', 'القديس مرقس حمل بشارة يسوع إلى مصر.'),
    quiz: [
      q(['What broke when St Mark arrived in Alexandria?', 'ماذا انقطع عندما وصل القديس مرقس إلى الإسكندرية؟'], ['His sandal', 'حذاؤه'], [['His walking stick', 'عصاه'], ['His boat', 'سفينته'], ['His bag', 'حقيبته']]),
      q(['What was the shoemaker\'s name?', 'ما اسم الإسكافي؟'], ['Anianus', 'إنيانوس'], [['Athanasius', 'أثناسيوس'], ['Antony', 'أنطونيوس'], ['Abanoub', 'أبانوب']]),
      q(['Which number Pope is Pope Tawadros II?', 'ما رقم البابا تواضروس الثاني؟'], ['The 118th', 'الـ١١٨'], [['The 1st', 'الأول'], ['The 12th', 'الـ١٢'], ['The 50th', 'الـ٥٠']]),
    ],
  },
  {
    id: 'saints',
    emoji: '🛡️',
    title: b('Brave Saints: St George and St Abanoub', 'قديسون شجعان: مارجرجس وأبانوب'),
    steps: [
      b(
        'Saints are people who loved God with all their hearts. They are alive with Christ, and they pray for us.',
        'القديسون أناس أحبوا الله من كل قلوبهم. وهم أحياء مع المسيح ويصلّون لأجلنا.'
      ),
      b(
        'St George was a brave soldier. When the emperor ordered everyone to worship idols, he would not deny Jesus, and he became a martyr. We call him the Prince of Martyrs.',
        'كان مارجرجس جندياً شجاعاً. وعندما أمر الإمبراطور الجميع أن يعبدوا الأوثان، رفض أن ينكر يسوع، فصار شهيداً. ونسمّيه أمير الشهداء.'
      ),
      b(
        'St Abanoub was only twelve years old, a boy from Egypt. He too would not deny Jesus, and he became a martyr. You are never too young to be brave for Jesus!',
        'وكان القديس أبانوب صبياً مصرياً عمره اثنتا عشرة سنة فقط. وهو أيضاً رفض أن ينكر يسوع فصار شهيداً. لست صغيراً أبداً لتكون شجاعاً من أجل يسوع!'
      ),
    ],
    verse: {
      text: b('"Let no one despise your youth, but be an example to the believers."', '"لاَ يَسْتَهِنْ أَحَدٌ بِحَدَاثَتِكَ، بَلْ كُنْ قُدْوَةً لِلْمُؤْمِنِينَ."'),
      ref: b('1 Timothy 4:12', '١ تيموثاوس ٤: ١٢'),
    },
    remember: b('The saints are our friends in heaven, and they pray for us.', 'القديسون أصدقاؤنا في السماء، ويصلّون لأجلنا.'),
    quiz: [
      q(['Who is called the Prince of Martyrs?', 'من يُلقّب بأمير الشهداء؟'], ['St George', 'مارجرجس'], [['St Mark', 'القديس مرقس'], ['King David', 'داود الملك'], ['Noah', 'نوح']]),
      q(['How old was St Abanoub?', 'كم كان عمر القديس أبانوب؟'], ['Twelve', 'اثنتا عشرة سنة'], [['Forty', 'أربعون'], ['Eighty', 'ثمانون'], ['Three', 'ثلاث سنوات']]),
      q(['What do the saints do for us?', 'ماذا يفعل القديسون لأجلنا؟'], ['They pray for us', 'يصلّون لأجلنا'], [['They take God\'s place', 'يأخذون مكان الله'], ['Nothing', 'لا شيء'], ['They do our homework', 'يحلّون واجباتنا']]),
    ],
  },
  {
    id: 'church',
    emoji: '⛪',
    title: b('Going to Church', 'الذهاب إلى الكنيسة'),
    steps: [
      b(
        'The church is God\'s house. When we go in, we make the sign of the cross, light a candle and kiss the icons, and we stand quietly to pray.',
        'الكنيسة هي بيت الله. وعندما ندخلها نرشم علامة الصليب ونوقد شمعة ونقبّل الأيقونات، ونقف بهدوء لنصلي.'
      ),
      b(
        'In the Liturgy the priest prays at the altar, the deacons sing hymns, many of them in Coptic, and we smell the sweet incense rising to God like our prayers.',
        'في القداس يصلي الكاهن على المذبح، ويرتل الشمامسة الألحان، وكثير منها بالقبطية، ونشم رائحة البخور الذكية الصاعدة إلى الله مثل صلواتنا.'
      ),
      b(
        'The bread and wine become the Body and Blood of Jesus, and we receive Him in Holy Communion. We get ready by fasting before Communion and saying sorry for our sins.',
        'يتحول الخبز والخمر إلى جسد يسوع ودمه، ونتناوله في سر التناول. ونستعد بالصوم قبل التناول وبالتوبة عن خطايانا.'
      ),
    ],
    verse: {
      text: b('"I was glad when they said to me, \'Let us go into the house of the Lord.\'"', '"فَرِحْتُ بِالْقَائِلِينَ لِي: «إِلَى بَيْتِ الرَّبِّ نَذْهَبُ»."'),
      ref: b('Psalm 122:1 (121 in the Agpeya)', 'مزمور ١٢٢: ١ (١٢١ في الأجبية)'),
    },
    remember: b('In church we meet Jesus, and in Communion we receive Him.', 'في الكنيسة نلتقي بيسوع، وفي التناول نتناوله.'),
    quiz: [
      q(['What do the bread and wine become in the Liturgy?', 'إلى ماذا يتحول الخبز والخمر في القداس؟'], ['The Body and Blood of Jesus', 'جسد يسوع ودمه'], [['Ordinary food', 'طعام عادي'], ['Candles', 'شموع'], ['Incense', 'بخور']]),
      q(['How do we get ready for Communion?', 'كيف نستعد للتناول؟'], ['By fasting and saying sorry for our sins', 'بالصوم والتوبة عن خطايانا'], [['By eating a big breakfast', 'بأكل فطور كبير'], ['By playing games', 'باللعب'], ['We don\'t need to', 'لا نحتاج أن نستعد']]),
      q(['What rises to God like our prayers?', 'ماذا يصعد إلى الله مثل صلواتنا؟'], ['The incense', 'البخور'], [['Balloons', 'البالونات'], ['The bells', 'الأجراس'], ['The candles\' wax', 'شمع الشموع']]),
    ],
  },
  {
    id: 'prayer',
    emoji: '🙏',
    title: b('Talking to God', 'التكلم مع الله'),
    steps: [
      b(
        'Prayer is talking to God. You can pray anywhere, any time: when you wake up, before you eat, before you sleep, and whenever you need help or want to say thank you.',
        'الصلاة هي التكلم مع الله. تستطيع أن تصلي في أي مكان وفي أي وقت: عندما تستيقظ، وقبل الأكل، وقبل النوم، وكلما احتجت إلى معونة أو أردت أن تشكر.'
      ),
      b(
        'We begin with the sign of the cross: we touch our forehead, then our chest, then our left shoulder and our right shoulder, saying "In the name of the Father, the Son and the Holy Spirit, one God. Amen."',
        'نبدأ برشم علامة الصليب: نلمس جبهتنا ثم صدرنا ثم كتفنا الأيسر ثم الأيمن، ونقول: "باسم الآب والابن والروح القدس، الإله الواحد. آمين."'
      ),
      b(
        'Jesus taught us the Lord\'s Prayer: "Our Father in heaven..." The Church also gives us the Agpeya, a book of prayers for different hours of the day.',
        'وعلّمنا يسوع الصلاة الربانية: "أبانا الذي في السماوات..." وتعطينا الكنيسة أيضاً الأجبية، وهي كتاب صلوات لساعات النهار والليل.'
      ),
    ],
    verse: { text: b('"Pray without ceasing."', '"صَلُّوا بِلاَ انْقِطَاعٍ."'), ref: b('1 Thessalonians 5:17', '١ تسالونيكي ٥: ١٧') },
    remember: b('God always listens when you talk to Him.', 'الله يسمعك دائماً عندما تكلمه.'),
    quiz: [
      q(['What is prayer?', 'ما هي الصلاة؟'], ['Talking to God', 'التكلم مع الله'], [['Only singing', 'الغناء فقط'], ['Reading a story', 'قراءة قصة'], ['Something only priests do', 'شيء يعمله الكهنة فقط']]),
      q(['Which prayer did Jesus teach us?', 'أي صلاة علّمنا إياها يسوع؟'], ['The Lord\'s Prayer: "Our Father..."', 'الصلاة الربانية: "أبانا الذي..."'], [['The Creed', 'قانون الإيمان'], ['A birthday song', 'أغنية عيد ميلاد'], ['The alphabet', 'الحروف الأبجدية']]),
      q(['What is the Agpeya?', 'ما هي الأجبية؟'], ['A book of prayers for the hours of the day', 'كتاب صلوات لساعات النهار'], [['A storybook', 'كتاب قصص'], ['A hymn tune', 'لحن'], ['A kind of bread', 'نوع من الخبز']]),
    ],
  },
];

export const kidLessonNumber = (id: string) => kidLessons.findIndex((l) => l.id === id) + 1;

export function buildKidQuiz(lesson: KidLesson, lang: 'en' | 'ar', random: () => number = Math.random): QuizQuestion[] {
  return buildQuiz(lesson.quiz, lang, lesson.quiz.length, random);
}

export const kidsStrings = {
  en: {
    title: 'Kids Corner',
    subtitle: 'Bible stories, saints and fun quizzes',
    homeTitle: 'Kids Corner',
    homeDesc: 'Bible stories and quizzes',
    hello: 'Hello! What would you like to do?',
    todayHymns: "Today's hymns",
    todayHymnsDesc: 'The hymns the Church sings today',
    allHymns: 'All hymns',
    allHymnsDesc: 'Every feast and season',
    responses: 'Deacon responses',
    responsesDesc: 'What the deacon and the people say',
    findHymn: 'Find a hymn',
    findHymnDesc: 'Type its name',
    stars: (done: string, total: string) => `⭐ ${done} of ${total} stories done`,
    storyOf: (n: string, total: string) => `Story ${n} of ${total}`,
    verseTitle: 'From the Bible',
    rememberTitle: 'Remember',
    quizTitle: 'Quiz time!',
    quizIntro: 'Answer three questions to earn your star.',
    earned: 'You earned a star for this story! ⭐',
    nextStory: 'Next story',
    correct: 'Yes! Great job! 🎉',
    wrongAnswer: (answer: string) => `Good try! The answer is: ${answer}`,
    next: 'Next',
    seeScore: 'See my score',
    score: (right: string, total: string) => `${right} out of ${total}`,
    scoreGreat: 'Amazing! You got them all! ⭐',
    scoreGood: 'Well done! You earned a star! ⭐',
    scoreKeepGoing: 'Nice try! You earned a star. Read the story again and try once more.',
    playAgain: 'Play again',
    nextLevel: 'Next story',
  },
  ar: {
    title: 'ركن الأطفال',
    subtitle: 'قصص من الكتاب المقدس وقديسون واختبارات ممتعة',
    homeTitle: 'ركن الأطفال',
    homeDesc: 'قصص من الكتاب المقدس واختبارات',
    hello: 'أهلاً! ماذا تحب أن تفعل؟',
    todayHymns: 'ألحان اليوم',
    todayHymnsDesc: 'الألحان التي ترتلها الكنيسة اليوم',
    allHymns: 'كل الألحان',
    allHymnsDesc: 'كل الأعياد والمواسم',
    responses: 'مردات الشماس',
    responsesDesc: 'ما يقوله الشماس والشعب',
    findHymn: 'ابحث عن لحن',
    findHymnDesc: 'اكتب اسمه',
    stars: (done: string, total: string) => `⭐ أنهيت ${done} من ${total} قصة`,
    storyOf: (n: string, total: string) => `القصة ${n} من ${total}`,
    verseTitle: 'من الكتاب المقدس',
    rememberTitle: 'تذكّر',
    quizTitle: 'وقت الاختبار!',
    quizIntro: 'أجب عن ثلاثة أسئلة لتربح نجمتك.',
    earned: 'ربحت نجمة لهذه القصة! ⭐',
    nextStory: 'القصة التالية',
    correct: 'نعم! أحسنت! 🎉',
    wrongAnswer: (answer: string) => `محاولة جيدة! الإجابة هي: ${answer}`,
    next: 'التالي',
    seeScore: 'نتيجتي',
    score: (right: string, total: string) => `${right} من ${total}`,
    scoreGreat: 'رائع! أجبت عن الكل! ⭐',
    scoreGood: 'أحسنت! ربحت نجمة! ⭐',
    scoreKeepGoing: 'محاولة جميلة! ربحت نجمة. اقرأ القصة مرة أخرى وحاول من جديد.',
    playAgain: 'العب مرة أخرى',
    nextLevel: 'القصة التالية',
  },
};
