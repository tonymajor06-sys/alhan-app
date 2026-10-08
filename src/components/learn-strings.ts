// Text for the Learn Coptic screens, in both app languages

export type LessonId = 'alphabet' | 'reading' | 'words' | 'quiz' | 'practice';

export const lessonIds: LessonId[] = ['alphabet', 'reading', 'words', 'quiz', 'practice'];

export const learnStrings = {
  en: {
    title: 'Learn Coptic',
    subtitle: 'Read the hymns in Coptic, one step at a time',
    lessons: {
      alphabet: { title: 'The Alphabet', desc: 'Every letter, its name and sound' },
      reading: { title: 'Reading Rules', desc: 'The jinkim, ⲟⲩ, Ϯ and shortened names' },
      words: { title: 'Words from the Hymns', desc: 'The words you will hear most in church' },
      quiz: { title: 'Quiz', desc: 'Six levels, from letters to whole sentences' },
      practice: { title: 'Read a Verse', desc: 'Real verses from the hymns in this app' },
    } as Record<LessonId, { title: string; desc: string }>,
    tapLetter: 'Tap a letter to see how it sounds',
    sounds: 'Sounds like',
    example: 'Example',
    numberValue: 'Number value',
    hideMeanings: 'Hide meanings',
    showMeanings: 'Show meanings',
    tapToReveal: 'Tap to reveal',
    whatLetter: 'What is this letter called?',
    whatWord: 'What does this mean?',
    whichMeans: 'Which one means this?',
    buildSentence: 'Tap the words in order to say:',
    check: 'Check',
    startOver: 'Start over',
    rightOrder: 'Not quite. The right order is:',
    nextLevel: 'Next level',
    allLevels: 'All levels',
    level: (n: string) => `Level ${n}`,
    best: (score: string) => `Best: ${score}`,
    levelText: [
      { title: 'Letters', desc: 'Name each letter' },
      { title: 'Words', desc: 'What does each word mean?' },
      { title: 'More Words', desc: 'New words, both ways' },
      { title: 'Phrases', desc: 'Short phrases from the hymns' },
      { title: 'Build Sentences', desc: 'Put the words in the right order' },
      { title: 'Challenge', desc: 'A bit of everything' },
    ],
    correct: 'Correct!',
    wrongAnswer: (answer: string) => `The answer is ${answer}`,
    next: 'Next',
    seeScore: 'See score',
    score: (right: string, total: string) => `${right} out of ${total}`,
    scoreGreat: 'Excellent! You are ready to read along.',
    scoreGood: 'Good work. Another round will make it stick.',
    scoreKeepGoing: 'Keep going. Review the alphabet and try again.',
    playAgain: 'New round',
    readThis: 'Try reading this verse out loud, then check yourself.',
    showSound: 'Show pronunciation',
    showMeaning: 'Show meaning',
    nextVerse: 'Another verse',
    openHymn: 'Open the hymn',
    from: 'From',
  },
  ar: {
    title: 'تعلّم القبطي',
    subtitle: 'اقرأ الألحان بالقبطي خطوة بخطوة',
    lessons: {
      alphabet: { title: 'الحروف', desc: 'كل الحروف وأسماؤها ونطقها' },
      reading: { title: 'قواعد القراءة', desc: 'الجنكم و ⲟⲩ و Ϯ والأسماء المختصرة' },
      words: { title: 'كلمات من الألحان', desc: 'أكثر الكلمات التي تسمعها في الكنيسة' },
      quiz: { title: 'اختبار', desc: 'ستة مستويات، من الحروف إلى الجمل الكاملة' },
      practice: { title: 'اقرأ ربعاً', desc: 'أرباع حقيقية من ألحان التطبيق' },
    } as Record<LessonId, { title: string; desc: string }>,
    tapLetter: 'اضغط على حرف لترى نطقه',
    sounds: 'يُنطق',
    example: 'مثال',
    numberValue: 'قيمته العددية',
    hideMeanings: 'إخفاء المعاني',
    showMeanings: 'إظهار المعاني',
    tapToReveal: 'اضغط للإظهار',
    whatLetter: 'ما اسم هذا الحرف؟',
    whatWord: 'ما معنى هذا؟',
    whichMeans: 'أيها يعني هذا؟',
    buildSentence: 'اضغط على الكلمات بالترتيب لتقول:',
    check: 'تحقق',
    startOver: 'ابدأ من جديد',
    rightOrder: 'ليس تماماً. الترتيب الصحيح:',
    nextLevel: 'المستوى التالي',
    allLevels: 'كل المستويات',
    level: (n: string) => `المستوى ${n}`,
    best: (score: string) => `أفضل نتيجة: ${score}`,
    levelText: [
      { title: 'الحروف', desc: 'سمِّ كل حرف' },
      { title: 'الكلمات', desc: 'ما معنى كل كلمة؟' },
      { title: 'كلمات أكثر', desc: 'كلمات جديدة في الاتجاهين' },
      { title: 'عبارات', desc: 'عبارات قصيرة من الألحان' },
      { title: 'كوّن جملة', desc: 'رتّب الكلمات بالترتيب الصحيح' },
      { title: 'تحدٍّ', desc: 'قليل من كل شيء' },
    ],
    correct: 'إجابة صحيحة!',
    wrongAnswer: (answer: string) => `الإجابة هي ${answer}`,
    next: 'التالي',
    seeScore: 'النتيجة',
    score: (right: string, total: string) => `${right} من ${total}`,
    scoreGreat: 'ممتاز! أنت مستعد للقراءة مع الألحان.',
    scoreGood: 'عمل جيد. جولة أخرى ستثبّت ما تعلمته.',
    scoreKeepGoing: 'استمر. راجع الحروف وحاول مرة أخرى.',
    playAgain: 'جولة جديدة',
    readThis: 'حاول قراءة هذا الربع بصوت عالٍ، ثم تحقق من نفسك.',
    showSound: 'إظهار النطق',
    showMeaning: 'إظهار المعنى',
    nextVerse: 'ربع آخر',
    openHymn: 'افتح اللحن',
    from: 'من',
  },
};

// ---- Learn Arabic: for English speakers reading the Arabic text of the hymns ----

export type ArabicLessonId = 'alphabet' | 'marks' | 'words' | 'quiz' | 'practice';

export const arabicLessonIds: ArabicLessonId[] = ['alphabet', 'marks', 'words', 'quiz', 'practice'];

export const learnArabicStrings = {
  ...learnStrings.en,
  title: 'Learn Arabic',
  subtitle: 'Read the Arabic text of the hymns, one step at a time',
  lessons: {
    alphabet: { title: 'The Arabic Alphabet', desc: 'Every letter, its name, sound and shapes' },
    marks: { title: 'Vowel Marks', desc: 'The small marks above and below the letters' },
    words: { title: 'Words from the Hymns', desc: 'The Arabic words you will hear most in church' },
    quiz: { title: 'Quiz', desc: 'Six levels, from letters to whole sentences' },
    practice: { title: 'Read a Verse', desc: 'Real Arabic verses from the hymns in this app' },
  } as Record<ArabicLessonId, { title: string; desc: string }>,
  inEnglishLetters: 'In English letters',
  copticLetter: 'Coptic letter with this sound',
  forms: 'How it is written (right to left)',
  formAlone: 'Alone',
  formStart: 'Start',
  formMiddle: 'Middle',
  formEnd: 'End',
  scoreKeepGoing: 'Keep going. Review the alphabet and try again.',
};

// ---- Learn English: for Arabic speakers reading the English text of the hymns ----

export type EnglishLessonId = 'alphabet' | 'sounds' | 'words' | 'quiz' | 'practice';

export const englishLessonIds: EnglishLessonId[] = ['alphabet', 'sounds', 'words', 'quiz', 'practice'];

export const learnEnglishStrings = {
  ...learnStrings.ar,
  title: 'تعلّم الإنجليزية',
  subtitle: 'اقرأ النص الإنجليزي للألحان خطوة بخطوة',
  lessons: {
    alphabet: { title: 'الحروف الإنجليزية', desc: 'كل حرف واسمه ونطقه' },
    sounds: { title: 'أصوات وقواعد', desc: 'th و sh و ch والحروف التي لا تُنطق' },
    words: { title: 'كلمات من الألحان', desc: 'أكثر الكلمات الإنجليزية في الكنيسة' },
    quiz: { title: 'اختبار', desc: 'ستة مستويات، من الحروف إلى الجمل الكاملة' },
    practice: { title: 'اقرأ ربعاً', desc: 'أرباع إنجليزية حقيقية من ألحان التطبيق' },
  } as Record<EnglishLessonId, { title: string; desc: string }>,
  inArabicLetters: 'بالحروف العربية',
  arabicLetter: 'الحرف العربي الأقرب',
  letterName: 'اسم الحرف',
  scoreKeepGoing: 'استمر. راجع الحروف وحاول مرة أخرى.',
};
