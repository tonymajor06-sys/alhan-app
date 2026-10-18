import type { Bilingual, CopticWord, ReadingRule } from './coptic-lessons';
import { copticToEnglish } from './english-coptic';

// Bohairic grammar, step by step, for going from reading the hymns to understanding and speaking them.
// The examples come from the hymns, the Creed and the Bohairic Gospels wherever they can, so learners meet
// them again in church. Their pronunciation is the app's own (see english-coptic.ts).

type Example = { coptic: string; meaning: Bilingual };
type Rule = { title: Bilingual; body: Bilingual; examples: Example[] };
export interface GrammarUnit {
  id: string;
  title: Bilingual;
  desc: Bilingual;
  rules: ReadingRule[];
}

const withSound = (rules: Rule[]): ReadingRule[] =>
  rules.map((r) => ({ ...r, examples: r.examples.map((e) => ({ ...e, sound: copticToEnglish(e.coptic) })) }));

const unit = (id: string, title: Bilingual, desc: Bilingual, rules: Rule[]): GrammarUnit => ({ id, title, desc, rules: withSound(rules) });

export const copticGrammar: GrammarUnit[] = [
  unit('pronouns', { en: 'I, you, he, she', ar: 'أنا، أنت، هو، هي' }, { en: 'The personal pronouns', ar: 'الضمائر المنفصلة' }, [
    {
      title: { en: 'The pronouns', ar: 'الضمائر' },
      body: {
        en: 'Coptic has a "you" for a man, a "you" for a woman and a "you" for many. They are used for emphasis, or to say who someone is.',
        ar: 'في القبطية «أنتَ» للرجل و«أنتِ» للمرأة و«أنتم» للجماعة. تُستخدم للتأكيد، أو لتقول من هو الشخص.',
      },
      examples: [
        { coptic: 'ⲁ̀ⲛⲟⲕ', meaning: { en: 'I', ar: 'أنا' } },
        { coptic: 'ⲛ̀ⲑⲟⲕ', meaning: { en: 'you (a man)', ar: 'أنتَ' } },
        { coptic: 'ⲛ̀ⲑⲟ', meaning: { en: 'you (a woman)', ar: 'أنتِ' } },
        { coptic: 'ⲛ̀ⲑⲟϥ', meaning: { en: 'he', ar: 'هو' } },
        { coptic: 'ⲛ̀ⲑⲟⲥ', meaning: { en: 'she', ar: 'هي' } },
        { coptic: 'ⲁ̀ⲛⲟⲛ', meaning: { en: 'we', ar: 'نحن' } },
        { coptic: 'ⲛ̀ⲑⲱⲧⲉⲛ', meaning: { en: 'you (many)', ar: 'أنتم' } },
        { coptic: 'ⲛ̀ⲑⲱⲟⲩ', meaning: { en: 'they', ar: 'هم' } },
      ],
    },
    {
      title: { en: 'In the hymns', ar: 'في الألحان' },
      body: {
        en: 'You will hear these at the start of many verses addressed to the Lord or to the Virgin.',
        ar: 'ستسمعها في أول أرباع كثيرة موجهة للرب أو للعذراء.',
      },
      examples: [
        { coptic: 'Ⲛ̀ⲑⲟⲕ ⲡⲉ ⲡⲓⲁ̀ⲅⲁⲑⲟⲥ', meaning: { en: 'You are the Good One', ar: 'أنت هو الصالح' } },
        { coptic: 'Ⲛ̀ⲑⲟ ⲧⲉ ϯϣⲟⲩⲣⲏ', meaning: { en: 'You are the censer', ar: 'أنتِ هي المجمرة' } },
        { coptic: 'Ⲁ̀ⲛⲟⲕ ⲡⲉ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡ̀ⲱⲛϧ', meaning: { en: 'I am the bread of life (John 6:35)', ar: 'أنا هو خبز الحياة (يوحنا ٦: ٣٥)' } },
      ],
    },
  ]),

  unit('articles', { en: '"The" and "a"', ar: '«الـ» والنكرة' }, { en: 'Masculine, feminine and plural', ar: 'المذكر والمؤنث والجمع' }, [
    {
      title: { en: 'Every noun is masculine or feminine', ar: 'كل اسم مذكر أو مؤنث' },
      body: {
        en: '"The" goes on the front of the word and changes with it: ⲡⲓ for a masculine word, ϯ for a feminine word, ⲛⲓ for more than one.',
        ar: '«الـ» تلتصق بأول الكلمة وتتغير معها: ⲡⲓ للمذكر، وϯ للمؤنث، وⲛⲓ للجمع.',
      },
      examples: [
        { coptic: 'ⲡⲓⲣⲱⲙⲓ', meaning: { en: 'the man', ar: 'الرجل' } },
        { coptic: 'ϯⲉⲕⲕⲗⲏⲥⲓⲁ', meaning: { en: 'the church', ar: 'الكنيسة' } },
        { coptic: 'ⲛⲓⲁⲅⲅⲉⲗⲟⲥ', meaning: { en: 'the angels', ar: 'الملائكة' } },
      ],
    },
    {
      title: { en: 'The short "the"', ar: '«الـ» القصيرة' },
      body: {
        en: 'There is also a short form: ⲡ, ⲧ and ⲛ. Before a vowel or ⲃ, ⲗ, ⲙ, ⲛ, ⲣ, the ⲡ becomes ⲫ and the ⲧ becomes ⲑ. It is used for things that are one of a kind, like God, the heavens and the earth.',
        ar: 'وهناك صيغة قصيرة: ⲡ وⲧ وⲛ. قبل الحرف المتحرك أو ⲃ وⲗ وⲙ وⲛ وⲣ تصير ⲡ إلى ⲫ وⲧ إلى ⲑ. وتُستخدم لما هو فريد مثل الله والسماء والأرض.',
      },
      examples: [
        { coptic: 'Ⲫ̀ⲛⲟⲩϯ', meaning: { en: 'God (ⲫ + ⲛⲟⲩϯ)', ar: 'الله (ⲫ + ⲛⲟⲩϯ)' } },
        { coptic: 'ⲧ̀ⲫⲉ', meaning: { en: 'heaven (ⲧ + ⲫⲉ)', ar: 'السماء (ⲧ + ⲫⲉ)' } },
        { coptic: 'Ⲡ̀ϭⲟⲓⲥ', meaning: { en: 'the Lord (ⲡ + ϭⲟⲓⲥ)', ar: 'الرب (ⲡ + ϭⲟⲓⲥ)' } },
        { coptic: 'ⲑ̀ⲙⲁⲩ', meaning: { en: 'the mother (ⲑ + ⲙⲁⲩ)', ar: 'الأم (ⲑ + ⲙⲁⲩ)' } },
      ],
    },
    {
      title: { en: '"A" and "some"', ar: 'النكرة' },
      body: {
        en: 'ⲟⲩ means "a" or "one", for masculine and feminine. For more than one, use ϩⲁⲛ ("some").',
        ar: 'ⲟⲩ تجعل الاسم نكرة (واحد) للمذكر والمؤنث، وللجمع تُستخدم ϩⲁⲛ.',
      },
      examples: [
        { coptic: 'ⲟⲩϩⲱⲥ ⲙ̀ⲃⲉⲣⲓ', meaning: { en: 'a new song', ar: 'تسبحة جديدة' } },
        { coptic: 'ⲟⲩϩⲓⲣⲏⲛⲏ', meaning: { en: 'a peace', ar: 'سلام' } },
        { coptic: 'ϩⲁⲛⲟⲩⲱⲓⲛⲓ', meaning: { en: 'lights (some lights)', ar: 'أنوار' } },
      ],
    },
  ]),

  unit('possessives', { en: 'My, your, his', ar: 'ـي، ـك، ـه' }, { en: 'Saying whose something is', ar: 'كيف تقول لمن الشيء' }, [
    {
      title: { en: 'Possessive "the"', ar: '«الـ» مع الملكية' },
      body: {
        en: 'Instead of "the", Coptic puts "my", "your" or "his" on the front of the word. Like "the", each has a masculine (ⲡ), feminine (ⲧ) and plural (ⲛ) form.',
        ar: 'بدلاً من «الـ» تضع القبطية «ـي» أو «ـك» أو «ـه» في أول الكلمة. ولكل منها، مثل «الـ»، صيغة للمذكر (ⲡ) والمؤنث (ⲧ) والجمع (ⲛ).',
      },
      examples: [
        { coptic: 'ⲡⲁⲓⲱⲧ', meaning: { en: 'my father', ar: 'أبي' } },
        { coptic: 'ⲧⲁⲙⲁⲩ', meaning: { en: 'my mother', ar: 'أمي' } },
        { coptic: 'ⲛⲁⲥ̀ⲛⲏⲟⲩ', meaning: { en: 'my brothers', ar: 'إخوتي' } },
        { coptic: 'ⲡⲉⲕⲗⲁⲟⲥ', meaning: { en: 'your people (said to a man)', ar: 'شعبك (لرجل)' } },
        { coptic: 'ⲡⲉϥⲓⲱⲧ', meaning: { en: 'his father', ar: 'أبوه' } },
        { coptic: 'ⲧⲉⲥϣⲉⲣⲓ', meaning: { en: 'her daughter', ar: 'ابنتها' } },
        { coptic: 'ⲛⲉⲛⲛⲟⲃⲓ', meaning: { en: 'our sins', ar: 'خطايانا' } },
        { coptic: 'ⲡⲉⲧⲉⲛⲓⲱⲧ', meaning: { en: 'your father (said to many)', ar: 'أبوكم' } },
        { coptic: 'ⲡⲟⲩⲥⲟϭⲛⲓ', meaning: { en: 'their counsel', ar: 'مشورتهم' } },
      ],
    },
    {
      title: { en: 'The whole set', ar: 'الصيغ كلها' },
      body: {
        en: 'my ⲡⲁ ⲧⲁ ⲛⲁ · your (man) ⲡⲉⲕ ⲧⲉⲕ ⲛⲉⲕ · your (woman) ⲡⲉ ⲧⲉ ⲛⲉ · his ⲡⲉϥ ⲧⲉϥ ⲛⲉϥ · her ⲡⲉⲥ ⲧⲉⲥ ⲛⲉⲥ · our ⲡⲉⲛ ⲧⲉⲛ ⲛⲉⲛ · your (many) ⲡⲉⲧⲉⲛ ⲧⲉⲧⲉⲛ ⲛⲉⲧⲉⲛ · their ⲡⲟⲩ ⲧⲟⲩ ⲛⲟⲩ',
        ar: 'ـي ⲡⲁ ⲧⲁ ⲛⲁ · ـكَ ⲡⲉⲕ ⲧⲉⲕ ⲛⲉⲕ · ـكِ ⲡⲉ ⲧⲉ ⲛⲉ · ـه ⲡⲉϥ ⲧⲉϥ ⲛⲉϥ · ـها ⲡⲉⲥ ⲧⲉⲥ ⲛⲉⲥ · ـنا ⲡⲉⲛ ⲧⲉⲛ ⲛⲉⲛ · ـكم ⲡⲉⲧⲉⲛ ⲧⲉⲧⲉⲛ ⲛⲉⲧⲉⲛ · ـهم ⲡⲟⲩ ⲧⲟⲩ ⲛⲟⲩ',
      },
      examples: [
        { coptic: 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ̀', meaning: { en: 'Our Father who art in heaven', ar: 'أبانا الذي في السموات' } },
        { coptic: 'ⲙⲁⲣⲉϥⲧⲟⲩⲃⲟ ⲛ̀ϫⲉ ⲡⲉⲕⲣⲁⲛ', meaning: { en: 'hallowed be Your name', ar: 'ليتقدس اسمك' } },
        { coptic: 'ⲙⲁⲣⲉⲥⲓ̀ ⲛ̀ϫⲉ ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ', meaning: { en: 'Your kingdom come', ar: 'ليأتِ ملكوتك' } },
      ],
    },
  ]),

  unit('is', { en: '"This is", "He is"', ar: '«هذا هو»، «هو»' }, { en: 'Sentences without a verb', ar: 'الجملة الاسمية' }, [
    {
      title: { en: 'ⲡⲉ, ⲧⲉ, ⲛⲉ', ar: 'ⲡⲉ و ⲧⲉ و ⲛⲉ' },
      body: {
        en: 'To say "X is Y", put ⲡⲉ after it for a masculine word, ⲧⲉ for a feminine word and ⲛⲉ for a plural.',
        ar: 'لتقول «س هو ص» ضع بعدها ⲡⲉ للمذكر، وⲧⲉ للمؤنث، وⲛⲉ للجمع.',
      },
      examples: [
        { coptic: 'Ⲫⲁⲓ ⲡⲉ ⲡⲁϣⲏⲣⲓ ⲡⲁⲙⲉⲛⲣⲓⲧ', meaning: { en: 'This is My beloved Son (Matthew 3:17)', ar: 'هذا هو ابني الحبيب (متى ٣: ١٧)' } },
        { coptic: 'Ⲑⲁⲓ ⲧⲉ ⲧⲁⲙⲁⲩ', meaning: { en: 'This is my mother', ar: 'هذه هي أمي' } },
        { coptic: 'Ⲛⲁⲓ ⲛⲉ ⲛⲁⲥ̀ⲛⲏⲟⲩ', meaning: { en: 'These are my brothers', ar: 'هؤلاء هم إخوتي' } },
        { coptic: 'Ⲡⲁⲣⲁⲛ ⲡⲉ Ⲙⲏⲛⲁ', meaning: { en: 'My name is Mina', ar: 'اسمي مينا' } },
      ],
    },
    {
      title: { en: 'This, that', ar: 'هذا وذاك' },
      body: {
        en: 'ⲫⲁⲓ means "this" (masculine), ⲑⲁⲓ "this" (feminine) and ⲛⲁⲓ "these". Before a noun they become ⲡⲁⲓ, ⲧⲁⲓ, ⲛⲁⲓ: ⲡⲁⲓⲣⲱⲙⲓ, this man.',
        ar: 'ⲫⲁⲓ تعني «هذا»، وⲑⲁⲓ «هذه»، وⲛⲁⲓ «هؤلاء». وقبل الاسم تصير ⲡⲁⲓ وⲧⲁⲓ وⲛⲁⲓ: ⲡⲁⲓⲣⲱⲙⲓ أي هذا الرجل.',
      },
      examples: [
        { coptic: 'ⲡⲁⲓⲉ̀ϩⲟⲟⲩ', meaning: { en: 'this day', ar: 'هذا اليوم' } },
        { coptic: 'ⲧⲁⲓⲣⲟⲙⲡⲓ', meaning: { en: 'this year', ar: 'هذه السنة' } },
        { coptic: 'ⲡⲁⲓⲕⲟⲥⲙⲟⲥ', meaning: { en: 'this world', ar: 'هذا العالم' } },
      ],
    },
  ]),

  unit('present', { en: 'Present tense', ar: 'المضارع' }, { en: 'I praise, we worship', ar: 'أسبّح، نسجد' }, [
    {
      title: { en: 'Who does it goes first', ar: 'الفاعل في الأول' },
      body: {
        en: 'In the present, a short word for who is doing it goes right before the verb: ϯ (I), ⲕ (you, man), ⲧⲉ (you, woman), ϥ (he), ⲥ (she), ⲧⲉⲛ (we), ⲧⲉⲧⲉⲛ (you, many), ⲥⲉ (they).',
        ar: 'في المضارع تأتي كلمة قصيرة للفاعل قبل الفعل مباشرة: ϯ (أنا)، ⲕ (أنتَ)، ⲧⲉ (أنتِ)، ϥ (هو)، ⲥ (هي)، ⲧⲉⲛ (نحن)، ⲧⲉⲧⲉⲛ (أنتم)، ⲥⲉ (هم).',
      },
      examples: [
        { coptic: 'ϯⲛⲁϩϯ', meaning: { en: 'I believe', ar: 'أؤمن' } },
        { coptic: 'ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲕ', meaning: { en: 'we worship You', ar: 'نسجد لك' } },
        { coptic: 'ⲧⲉⲛϩⲱⲥ ⲉ̀ⲣⲟϥ', meaning: { en: 'we praise Him', ar: 'نسبحه' } },
        { coptic: 'ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ', meaning: { en: 'He is blessed', ar: 'مبارك هو' } },
        { coptic: 'ⲥⲉϩⲱⲥ ⲉ̀ⲣⲟⲕ', meaning: { en: 'they praise You', ar: 'يسبحونك' } },
        { coptic: 'ϯⲙⲉⲓ ⲙ̀ⲙⲟⲕ', meaning: { en: 'I love you', ar: 'أحبك' } },
      ],
    },
    {
      title: { en: 'With a name', ar: 'مع اسم' },
      body: {
        en: 'When the one doing it is a noun, just put the noun first and the verb after it.',
        ar: 'إذا كان الفاعل اسماً فضع الاسم أولاً ثم الفعل بعده.',
      },
      examples: [
        { coptic: 'Ⲡ̀ϭⲟⲓⲥ ⲥⲱⲧⲉⲙ', meaning: { en: 'the Lord hears', ar: 'الرب يسمع' } },
        { coptic: 'ⲛⲓⲁⲅⲅⲉⲗⲟⲥ ⲥⲉϩⲱⲥ', meaning: { en: 'the angels praise', ar: 'الملائكة يسبحون' } },
      ],
    },
  ]),

  unit('past', { en: 'Past tense', ar: 'الماضي' }, { en: 'He rose, You came', ar: 'قام، أتيت' }, [
    {
      title: { en: 'ⲁ + who + the verb', ar: 'ⲁ + الفاعل + الفعل' },
      body: {
        en: 'The past starts with ⲁ: ⲁⲓ (I), ⲁⲕ (you, man), ⲁⲣⲉ (you, woman), ⲁϥ (he), ⲁⲥ (she), ⲁⲛ (we), ⲁⲣⲉⲧⲉⲛ (you, many), ⲁⲩ (they). With a noun: ⲁ + the noun + the verb.',
        ar: 'الماضي يبدأ بـ ⲁ: ⲁⲓ (أنا)، ⲁⲕ (أنتَ)، ⲁⲣⲉ (أنتِ)، ⲁϥ (هو)، ⲁⲥ (هي)، ⲁⲛ (نحن)، ⲁⲣⲉⲧⲉⲛ (أنتم)، ⲁⲩ (هم). ومع الاسم: ⲁ + الاسم + الفعل.',
      },
      examples: [
        { coptic: 'ⲁϥⲧⲱⲛϥ', meaning: { en: 'He rose', ar: 'قام' } },
        { coptic: 'ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ', meaning: { en: 'You came and saved us', ar: 'أتيت وخلصتنا' } },
        { coptic: 'ⲁϥϫⲉⲙⲡⲉⲛϣⲓⲛⲓ', meaning: { en: 'He visited us', ar: 'افتقدنا' } },
        { coptic: 'ⲁⲥⲙⲓⲥⲓ ⲙ̀ⲡⲓⲗⲟⲅⲟⲥ', meaning: { en: 'she gave birth to the Word', ar: 'ولدت الكلمة' } },
        { coptic: 'ⲁⲛⲛⲁⲩ ⲉ̀ⲡⲓⲟⲩⲱⲓⲛⲓ', meaning: { en: 'we saw the light', ar: 'رأينا النور' } },
        { coptic: 'ⲁⲩⲙⲁⲥϥ', meaning: { en: 'He was born (they bore Him)', ar: 'وُلد' } },
      ],
    },
  ]),

  unit('future', { en: 'Future tense', ar: 'المستقبل' }, { en: 'I will bless, He will come', ar: 'سأبارك، سيأتي' }, [
    {
      title: { en: 'Add ⲛⲁ', ar: 'أضف ⲛⲁ' },
      body: {
        en: 'For the future, add ⲛⲁ after the present form: ϯⲛⲁ (I will), ⲭ̀ⲛⲁ (you will, man), ϥ̀ⲛⲁ (he will), ⲥ̀ⲛⲁ (she will), ⲧⲉⲛⲛⲁ (we will), ⲥⲉⲛⲁ (they will).',
        ar: 'للمستقبل أضف ⲛⲁ بعد صيغة المضارع: ϯⲛⲁ (سأ)، ⲭ̀ⲛⲁ (ستَ)، ϥ̀ⲛⲁ (سيـ)، ⲥ̀ⲛⲁ (ستـ للمؤنث)، ⲧⲉⲛⲛⲁ (سنـ)، ⲥⲉⲛⲁ (سيـ للجمع).',
      },
      examples: [
        { coptic: 'ϯⲛⲁⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲕ', meaning: { en: 'I will bless You', ar: 'أباركك' } },
        { coptic: 'ⲭ̀ⲛⲁⲛⲁⲩ', meaning: { en: 'you will see', ar: 'سترى' } },
        { coptic: 'ⲧⲉⲛⲛⲁϩⲱⲥ', meaning: { en: 'we will praise', ar: 'سنسبح' } },
        { coptic: 'ϯⲛⲁϣⲉ ⲉ̀ϯⲉⲕⲕⲗⲏⲥⲓⲁ', meaning: { en: 'I will go to the church', ar: 'سأذهب إلى الكنيسة' } },
      ],
    },
  ]),

  unit('negative', { en: 'Saying "not"', ar: 'النفي' }, { en: 'I do not know, do not be afraid', ar: 'لا أعرف، لا تخف' }, [
    {
      title: { en: 'Present: ⲛ̀ ... ⲁⲛ', ar: 'المضارع: ⲛ̀ ... ⲁⲛ' },
      body: {
        en: 'To say "not" in the present, put ⲛ̀ before the sentence and ⲁⲛ after the verb.',
        ar: 'لنفي المضارع ضع ⲛ̀ قبل الجملة وⲁⲛ بعد الفعل.',
      },
      examples: [
        { coptic: 'ⲛ̀ϯⲥⲱⲟⲩⲛ ⲁⲛ', meaning: { en: 'I do not know', ar: 'لا أعرف' } },
        { coptic: 'ⲛ̀ⲁ̀ⲛⲟⲕ ⲁⲛ ⲡⲉ', meaning: { en: 'it is not I', ar: 'لستُ أنا' } },
      ],
    },
    {
      title: { en: 'Past: ⲙ̀ⲡⲉ', ar: 'الماضي: ⲙ̀ⲡⲉ' },
      body: {
        en: 'For "did not", use ⲙ̀ⲡⲉ with who did it: ⲙ̀ⲡⲉϥ (he did not), ⲙ̀ⲡⲉⲛ (we did not), ⲙ̀ⲡⲟⲩ (they did not). With a noun: ⲙ̀ⲡⲉ + the noun + the verb.',
        ar: 'لنفي الماضي استخدم ⲙ̀ⲡⲉ مع الفاعل: ⲙ̀ⲡⲉϥ (لم يـ)، ⲙ̀ⲡⲉⲛ (لم نـ)، ⲙ̀ⲡⲟⲩ (لم يـ للجمع). ومع الاسم: ⲙ̀ⲡⲉ + الاسم + الفعل.',
      },
      examples: [
        { coptic: 'ⲙ̀ⲡⲉ ⲡⲓⲕⲟⲥⲙⲟⲥ ⲥⲟⲩⲱⲛϥ', meaning: { en: 'the world did not know Him (John 1:10)', ar: 'لم يعرفه العالم (يوحنا ١: ١٠)' } },
      ],
    },
    {
      title: { en: '"Do not": ⲙ̀ⲡⲉⲣ', ar: '«لا تفعل»: ⲙ̀ⲡⲉⲣ' },
      body: {
        en: 'To tell someone not to do something, put ⲙ̀ⲡⲉⲣ before the verb.',
        ar: 'لتنهى أحداً عن شيء ضع ⲙ̀ⲡⲉⲣ قبل الفعل.',
      },
      examples: [
        { coptic: 'ⲙ̀ⲡⲉⲣⲉⲣϩⲟϯ Ⲙⲁⲣⲓⲁⲙ', meaning: { en: 'Do not be afraid, Mary (Luke 1:30)', ar: 'لا تخافي يا مريم (لوقا ١: ٣٠)' } },
        { coptic: 'ⲙ̀ⲡⲉⲣⲉⲛⲧⲉⲛ ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲡⲓⲣⲁⲥⲙⲟⲥ', meaning: { en: 'lead us not into temptation', ar: 'لا تدخلنا في تجربة' } },
      ],
    },
  ]),

  unit('commands', { en: 'Commands and "let us"', ar: 'الأمر و«لنـ»' }, { en: 'Hear us, let us praise', ar: 'اسمعنا، لنسبح' }, [
    {
      title: { en: 'Commands', ar: 'الأمر' },
      body: {
        en: 'Most commands are just the verb. Verbs made with ⲉⲣ use ⲁ̀ⲣⲓ instead, and a few verbs have their own form, like ⲁ̀ⲙⲟⲩ (come) and ⲙⲟⲓ (give).',
        ar: 'أغلب صيغ الأمر هي الفعل نفسه. والأفعال المكوّنة بـ ⲉⲣ تستخدم ⲁ̀ⲣⲓ، وبعض الأفعال لها صيغة خاصة مثل ⲁ̀ⲙⲟⲩ (تعالَ) وⲙⲟⲓ (أعطِ).',
      },
      examples: [
        { coptic: 'ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲛ', meaning: { en: 'hear us', ar: 'اسمعنا' } },
        { coptic: 'ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲛ', meaning: { en: 'bless us', ar: 'باركنا' } },
        { coptic: 'ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ', meaning: { en: 'intercede for us', ar: 'اشفع فينا' } },
        { coptic: 'ⲙⲟⲓ ⲛⲁⲛ ⲛ̀ⲧⲉⲕϩⲓⲣⲏⲛⲏ', meaning: { en: 'give us Your peace', ar: 'أعطنا سلامك' } },
        { coptic: 'ⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ', meaning: { en: 'forgive us our sins', ar: 'اغفر لنا خطايانا' } },
      ],
    },
    {
      title: { en: '"Let us": ⲙⲁⲣⲉⲛ', ar: '«لنـ»: ⲙⲁⲣⲉⲛ' },
      body: {
        en: 'ⲙⲁⲣⲉⲛ before a verb means "let us". With a noun, ⲙⲁⲣⲉ means "let" (may it be): ⲙⲁⲣⲉϥ for "let him".',
        ar: 'ⲙⲁⲣⲉⲛ قبل الفعل تعني «لنـ». ومع الاسم ⲙⲁⲣⲉ تعني «ليـ»، وⲙⲁⲣⲉϥ «ليفعل هو».',
      },
      examples: [
        { coptic: 'ⲙⲁⲣⲉⲛϩⲱⲥ ⲉ̀Ⲡ̀ϭⲟⲓⲥ', meaning: { en: 'let us praise the Lord', ar: 'لنسبح الرب' } },
        { coptic: 'ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ', meaning: { en: 'let us worship Christ', ar: 'لنسجد للمسيح' } },
        { coptic: 'ⲙⲁⲣⲉⲛϣⲉ', meaning: { en: "let's go", ar: 'لنذهب' } },
      ],
    },
  ]),

  unit('endings', { en: 'Me, you, us', ar: 'ـني، ـك، ـنا' }, { en: 'Words that take an ending', ar: 'كلمات تأخذ ضميراً متصلاً' }, [
    {
      title: { en: 'ⲙ̀ⲙⲟ: the object', ar: 'ⲙ̀ⲙⲟ: المفعول به' },
      body: {
        en: 'After many verbs the one it is done to comes with ⲙ̀ⲙⲟ and an ending: ⲙ̀ⲙⲟⲓ me, ⲙ̀ⲙⲟⲕ you (man), ⲙ̀ⲙⲟ you (woman), ⲙ̀ⲙⲟϥ him, ⲙ̀ⲙⲟⲥ her, ⲙ̀ⲙⲟⲛ us, ⲙ̀ⲙⲱⲧⲉⲛ you (many), ⲙ̀ⲙⲱⲟⲩ them.',
        ar: 'بعد أفعال كثيرة يأتي المفعول به مع ⲙ̀ⲙⲟ وضمير: ⲙ̀ⲙⲟⲓ ـني، ⲙ̀ⲙⲟⲕ ـكَ، ⲙ̀ⲙⲟ ـكِ، ⲙ̀ⲙⲟϥ ـه، ⲙ̀ⲙⲟⲥ ـها، ⲙ̀ⲙⲟⲛ ـنا، ⲙ̀ⲙⲱⲧⲉⲛ ـكم، ⲙ̀ⲙⲱⲟⲩ ـهم.',
      },
      examples: [
        { coptic: 'ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲕ', meaning: { en: 'we worship You', ar: 'نسجد لك' } },
        { coptic: 'ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ', meaning: { en: 'You saved us', ar: 'خلصتنا' } },
        { coptic: 'ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ', meaning: { en: 'we exalt you (to the Virgin)', ar: 'نعظمكِ' } },
      ],
    },
    {
      title: { en: 'ⲉ̀ⲣⲟ, ⲛⲁ, ⲛⲉⲙⲁ', ar: 'ⲉ̀ⲣⲟ و ⲛⲁ و ⲛⲉⲙⲁ' },
      body: {
        en: 'ⲉ̀ⲣⲟ means "to" (ⲉ̀ⲣⲟⲓ, ⲉ̀ⲣⲟⲕ, ⲉ̀ⲣⲟϥ, ⲉ̀ⲣⲟⲛ), ⲛⲁ means "for" (ⲛⲏⲓ for me, ⲛⲁⲕ, ⲛⲁϥ, ⲛⲁⲛ) and ⲛⲉⲙⲁ means "with" (ⲛⲉⲙⲏⲓ with me, ⲛⲉⲙⲁⲕ, ⲛⲉⲙⲉ, ⲛⲉⲙⲁϥ, ⲛⲉⲙⲁⲛ).',
        ar: 'ⲉ̀ⲣⲟ تعني «إلى/على» (ⲉ̀ⲣⲟⲓ، ⲉ̀ⲣⲟⲕ، ⲉ̀ⲣⲟϥ، ⲉ̀ⲣⲟⲛ)، وⲛⲁ تعني «لـ» (ⲛⲏⲓ لي، ⲛⲁⲕ، ⲛⲁϥ، ⲛⲁⲛ)، وⲛⲉⲙⲁ تعني «مع» (ⲛⲉⲙⲏⲓ معي، ⲛⲉⲙⲁⲕ، ⲛⲉⲙⲉ، ⲛⲉⲙⲁϥ، ⲛⲉⲙⲁⲛ).',
      },
      examples: [
        { coptic: 'Ⲫ̀ⲛⲟⲩϯ ⲛⲁⲓ ⲛⲁⲛ', meaning: { en: 'O God, have mercy on us', ar: 'يا الله ارحمنا' } },
        { coptic: 'Ⲡ̀ϭⲟⲓⲥ ⲛⲉⲙⲉ', meaning: { en: 'the Lord is with you (Luke 1:28)', ar: 'الرب معكِ (لوقا ١: ٢٨)' } },
        { coptic: 'Ⲫ̀ⲛⲟⲩϯ ⲛⲉⲙⲁⲕ', meaning: { en: 'God be with you', ar: 'الله معك' } },
        { coptic: 'ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ', meaning: { en: 'grant us', ar: 'أنعم لنا' } },
      ],
    },
  ]),

  unit('prepositions', { en: 'In, on, through', ar: 'في، على، بـ' }, { en: 'The little words of place and way', ar: 'حروف الجر' }, [
    {
      title: { en: 'The most common ones', ar: 'الأكثر استخداماً' },
      body: {
        en: 'ϧⲉⲛ in · ⲉ̀ to · ⲛⲉⲙ with, and · ϩⲓϫⲉⲛ on · ⲉ̀ⲃⲟⲗϧⲉⲛ out of · ⲉⲑⲃⲉ because of · ϩⲓⲧⲉⲛ through · ⲛ̀ⲧⲉ of · ⲕⲁⲧⲁ according to · ⲛⲁϩⲣⲉⲛ before',
        ar: 'ϧⲉⲛ في · ⲉ̀ إلى · ⲛⲉⲙ مع، و · ϩⲓϫⲉⲛ على · ⲉ̀ⲃⲟⲗϧⲉⲛ من · ⲉⲑⲃⲉ من أجل · ϩⲓⲧⲉⲛ بواسطة · ⲛ̀ⲧⲉ الخاص بـ · ⲕⲁⲧⲁ حسب · ⲛⲁϩⲣⲉⲛ أمام',
      },
      examples: [
        { coptic: 'ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲫ̀ⲓⲱⲧ', meaning: { en: 'in the name of the Father', ar: 'باسم الآب' } },
        { coptic: 'ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ', meaning: { en: 'on the earth', ar: 'على الأرض' } },
        { coptic: 'ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ', meaning: { en: 'through the intercessions', ar: 'بشفاعات' } },
        { coptic: 'ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ', meaning: { en: 'from the dead', ar: 'من الأموات' } },
        { coptic: 'ⲕⲁⲧⲁ ⲡⲉⲕⲛⲓϣϯ ⲛ̀ⲛⲁⲓ', meaning: { en: 'according to Your great mercy', ar: 'كعظيم رحمتك' } },
        { coptic: 'ⲉⲑⲃⲉ ⲫⲁⲓ', meaning: { en: 'because of this, therefore', ar: 'من أجل هذا' } },
      ],
    },
  ]),

  unit('questions', { en: 'Asking questions', ar: 'الأسئلة' }, { en: 'Who, what, where, why', ar: 'مَن، ماذا، أين، لماذا' }, [
    {
      title: { en: 'Question words', ar: 'أدوات الاستفهام' },
      body: {
        en: 'ⲛⲓⲙ who · ⲟⲩ what · ⲑⲱⲛ where · ⲁ̀ϣ which, how · ⲉⲑⲃⲉ ⲟⲩ why · ⲛ̀ⲑⲛⲁⲩ when · ⲟⲩⲏⲣ how many',
        ar: 'ⲛⲓⲙ مَن · ⲟⲩ ماذا · ⲑⲱⲛ أين · ⲁ̀ϣ أي، كيف · ⲉⲑⲃⲉ ⲟⲩ لماذا · ⲛ̀ⲑⲛⲁⲩ متى · ⲟⲩⲏⲣ كم',
      },
      examples: [
        { coptic: 'Ⲛⲓⲙ ⲡⲉ ⲫⲁⲓ', meaning: { en: 'Who is this?', ar: 'من هذا؟' } },
        { coptic: 'Ⲟⲩ ⲡⲉ ⲡⲉⲕⲣⲁⲛ', meaning: { en: 'What is your name?', ar: 'ما اسمك؟' } },
        { coptic: 'Ⲁ̀ⲇⲁⲙ ⲁⲕⲑⲱⲛ', meaning: { en: 'Adam, where are you? (Genesis 3:9)', ar: 'يا آدم، أين أنت؟ (تكوين ٣: ٩)' } },
        { coptic: 'Ⲁϣ ⲡⲉ ⲡⲉⲕⲣⲏϯ', meaning: { en: 'How are you?', ar: 'كيف حالك؟' } },
        { coptic: 'Ⲉⲑⲃⲉ ⲟⲩ', meaning: { en: 'Why?', ar: 'لماذا؟' } },
        { coptic: 'Ⲛⲓⲙ ⲡⲉⲑⲛⲁϣⲥⲁϫⲓ', meaning: { en: 'Who can speak? (Sunday Theotokia)', ar: 'من يقدر أن ينطق؟ (ثيئوطوكية الأحد)' } },
      ],
    },
  ]),

  unit('relative', { en: '"Who" and "which"', ar: '«الذي» و«التي»' }, { en: 'Describing someone', ar: 'الوصف والصلة' }, [
    {
      title: { en: 'ⲉⲧ / ⲉⲑ', ar: 'ⲉⲧ / ⲉⲑ' },
      body: {
        en: 'ⲉⲧ (ⲉⲑ before a vowel) means "who is" or "which is". This is how Coptic says "holy" and "high": "who is holy", "who are in the highest".',
        ar: 'ⲉⲧ (وⲉⲑ قبل الحرف المتحرك) تعني «الذي هو». وهكذا تقول القبطية «القدوس» و«العالي»: «الذي هو قدوس»، «الذين في الأعالي».',
      },
      examples: [
        { coptic: 'Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ', meaning: { en: 'the Holy Spirit (the Spirit who is holy)', ar: 'الروح القدس (الروح الذي هو قدوس)' } },
        { coptic: 'ϧⲉⲛ ⲛⲏⲉⲧϭⲟⲥⲓ', meaning: { en: 'in the highest', ar: 'في الأعالي' } },
        { coptic: 'ⲑⲏⲉⲑⲙⲉϩ ⲛ̀ϩ̀ⲙⲟⲧ', meaning: { en: 'she who is full of grace', ar: 'الممتلئة نعمة' } },
      ],
    },
    {
      title: { en: 'ⲫⲏⲉ̀ⲧⲁϥ: "He who did"', ar: 'ⲫⲏⲉ̀ⲧⲁϥ: «الذي فعل»' },
      body: {
        en: 'For the past, ⲉ̀ⲧⲁ joins the past form: ⲫⲏⲉ̀ⲧⲁϥ (he who did), ⲑⲏⲉ̀ⲧⲁⲥ (she who did), ⲛⲏⲉ̀ⲧⲁⲩ (those who did).',
        ar: 'وللماضي تتصل ⲉ̀ⲧⲁ بصيغة الماضي: ⲫⲏⲉ̀ⲧⲁϥ (الذي فعل)، ⲑⲏⲉ̀ⲧⲁⲥ (التي فعلت)، ⲛⲏⲉ̀ⲧⲁⲩ (الذين فعلوا).',
      },
      examples: [
        { coptic: 'ⲑⲏⲉ̀ⲧⲁⲥⲙⲓⲥⲓ ⲛⲁⲛ ⲙ̀Ⲫ̀ⲛⲟⲩϯ ⲡⲓⲗⲟⲅⲟⲥ', meaning: { en: 'who gave birth for us to God the Word', ar: 'التي ولدت لنا الله الكلمة' } },
        { coptic: 'ⲫⲏⲉ̀ⲧⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ', meaning: { en: 'He who rose from the dead', ar: 'الذي قام من الأموات' } },
      ],
    },
    {
      title: { en: 'Describing with ⲛ̀', ar: 'الوصف بـ ⲛ̀' },
      body: {
        en: 'A describing word is joined with ⲛ̀ (ⲙ̀ before ⲡ, ⲃ, ⲙ, ⲫ, ⲯ).',
        ar: 'تتصل الصفة بالاسم بـ ⲛ̀ (وتصير ⲙ̀ قبل ⲡ وⲃ وⲙ وⲫ وⲯ).',
      },
      examples: [
        { coptic: 'Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ', meaning: { en: 'Your good Father', ar: 'أبوك الصالح' } },
        { coptic: 'ⲟⲩϩⲱⲥ ⲙ̀ⲃⲉⲣⲓ', meaning: { en: 'a new song', ar: 'تسبحة جديدة' } },
        { coptic: 'ϯϭ̀ⲣⲟⲙⲡⲓ ⲉⲑⲛⲉⲥⲱⲥ', meaning: { en: 'the beautiful dove', ar: 'الحمامة الحسنة' } },
      ],
    },
  ]),

  unit('have', { en: '"There is", "I have"', ar: '«يوجد»، «عندي»' }, { en: 'Having and being there', ar: 'الملكية والوجود' }, [
    {
      title: { en: 'ⲟⲩⲟⲛ and ⲙ̀ⲙⲟⲛ', ar: 'ⲟⲩⲟⲛ و ⲙ̀ⲙⲟⲛ' },
      body: {
        en: 'ⲟⲩⲟⲛ means "there is" and ⲙ̀ⲙⲟⲛ "there is not". With an ending they mean "to have": ⲟⲩⲟⲛⲧⲏⲓ (I have), ⲟⲩⲟⲛⲧⲁⲕ (you have), ⲟⲩⲟⲛⲧⲁϥ (he has), ⲟⲩⲟⲛⲧⲁⲛ (we have); ⲙ̀ⲙⲟⲛⲧⲏⲓ (I do not have).',
        ar: 'ⲟⲩⲟⲛ تعني «يوجد» وⲙ̀ⲙⲟⲛ «لا يوجد». ومع الضمير تعني الملكية: ⲟⲩⲟⲛⲧⲏⲓ (عندي)، ⲟⲩⲟⲛⲧⲁⲕ (عندك)، ⲟⲩⲟⲛⲧⲁϥ (عنده)، ⲟⲩⲟⲛⲧⲁⲛ (عندنا)؛ ⲙ̀ⲙⲟⲛⲧⲏⲓ (ليس عندي).',
      },
      examples: [
        { coptic: 'ⲙ̀ⲙⲟⲛ ϩ̀ⲗⲓ', meaning: { en: 'there is nothing', ar: 'لا شيء' } },
        { coptic: 'ⲟⲩⲟⲛⲧⲏⲓ ⲥⲱⲛⲓ', meaning: { en: 'I have a sister', ar: 'عندي أخت' } },
        { coptic: 'ⲙ̀ⲙⲟⲛⲧⲏⲓ ⲥⲟⲛ', meaning: { en: 'I do not have a brother', ar: 'ليس عندي أخ' } },
      ],
    },
  ]),

  unit('er', { en: 'Making verbs with ⲉⲣ', ar: 'تكوين الأفعال بـ ⲉⲣ' }, { en: 'ⲉⲣ = "to do, to make"', ar: 'ⲉⲣ = «يفعل، يصير»' }, [
    {
      title: { en: 'ⲉⲣ + a word', ar: 'ⲉⲣ + كلمة' },
      body: {
        en: 'ⲉⲣ means "to do" or "to become". Put it before a noun, or before a Greek word, and you have a new verb. Many verbs in the hymns are made this way.',
        ar: 'ⲉⲣ تعني «يفعل» أو «يصير». ضعها قبل اسم أو قبل كلمة يونانية فيصير عندك فعل جديد. وكثير من أفعال الألحان مكوّنة بهذه الطريقة.',
      },
      examples: [
        { coptic: 'ⲉⲣϩⲟϯ', meaning: { en: 'to be afraid (do fear)', ar: 'يخاف' } },
        { coptic: 'ⲉⲣⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ', meaning: { en: 'to intercede', ar: 'يتشفع' } },
        { coptic: 'ⲉⲣⲯⲁⲗⲓⲛ', meaning: { en: 'to sing psalms', ar: 'يرتل' } },
        { coptic: 'ⲉⲣⲟⲩⲱⲓⲛⲓ', meaning: { en: 'to give light', ar: 'يضيء' } },
        { coptic: 'ⲉⲣⲙⲉⲑⲣⲉ', meaning: { en: 'to bear witness', ar: 'يشهد' } },
      ],
    },
  ]),
];

// Short conversations to read aloud, each line with its sound and meaning
export interface Conversation {
  id: string;
  title: Bilingual;
  desc: Bilingual;
  lines: CopticWord[];
}

const line = (speaker: string, coptic: string, en: string, ar: string): CopticWord => ({
  coptic,
  sound: copticToEnglish(coptic),
  meaning: { en: `${speaker}: ${en}`, ar: `${speaker === 'A' ? 'أ' : 'ب'}: ${ar}` },
});

export const copticConversations: Conversation[] = [
  {
    id: 'meeting',
    title: { en: 'Meeting someone', ar: 'التعارف' },
    desc: { en: 'Hello, what is your name, how are you', ar: 'السلام، ما اسمك، كيف حالك' },
    lines: [
      line('A', 'Ⲭⲉⲣⲉ ⲛⲁⲕ', 'Hello', 'السلام لك'),
      line('B', 'Ⲭⲉⲣⲉ ⲛⲁⲕ ϩⲱⲕ', 'Hello to you too', 'السلام لك أنت أيضاً'),
      line('A', 'Ⲟⲩ ⲡⲉ ⲡⲉⲕⲣⲁⲛ', 'What is your name?', 'ما اسمك؟'),
      line('B', 'Ⲡⲁⲣⲁⲛ ⲡⲉ Ⲙⲏⲛⲁ. Ⲛ̀ⲑⲟⲕ ⲇⲉ', 'My name is Mina. And you?', 'اسمي مينا. وأنت؟'),
      line('A', 'Ⲁ̀ⲛⲟⲕ ⲡⲉ Ⲅⲉⲱⲣⲅⲓⲟⲥ', 'I am George', 'أنا جرجس'),
      line('B', 'Ⲁϣ ⲡⲉ ⲡⲉⲕⲣⲏϯ', 'How are you?', 'كيف حالك؟'),
      line('A', 'Ϯⲟⲩⲟϫ, ϯϣⲉⲡϩ̀ⲙⲟⲧ ⲛ̀ⲧⲟⲧϥ ⲙ̀Ⲫ̀ⲛⲟⲩϯ', 'I am well, I thank God', 'أنا بخير، أشكر الله'),
      line('B', 'Ⲫ̀ⲛⲟⲩϯ ⲛⲉⲙⲁⲕ', 'God be with you', 'الله معك'),
    ],
  },
  {
    id: 'church',
    title: { en: 'Going to church', ar: 'الذهاب إلى الكنيسة' },
    desc: { en: 'Where are you going, let us go', ar: 'إلى أين تذهب، لنذهب' },
    lines: [
      line('A', 'Ⲭ̀ⲛⲁϣⲉ ⲉ̀ⲑⲱⲛ', 'Where are you going?', 'إلى أين تذهب؟'),
      line('B', 'Ϯⲛⲁϣⲉ ⲉ̀ϯⲉⲕⲕⲗⲏⲥⲓⲁ', 'I am going to the church', 'سأذهب إلى الكنيسة'),
      line('A', 'Ⲁ̀ⲛⲟⲕ ϩⲱ', 'Me too', 'وأنا أيضاً'),
      line('B', 'Ⲙⲁⲣⲉⲛϣⲉ', "Let's go", 'لنذهب'),
      line('A', 'Ⲙⲁⲣⲉⲛϩⲱⲥ ⲉ̀Ⲡ̀ϭⲟⲓⲥ', 'Let us praise the Lord', 'لنسبح الرب'),
      line('B', 'Ⲁ̀ⲙⲏⲛ', 'Amen', 'آمين'),
    ],
  },
  {
    id: 'family',
    title: { en: 'My family', ar: 'عائلتي' },
    desc: { en: 'This is my father, I have a sister', ar: 'هذا أبي، عندي أخت' },
    lines: [
      line('A', 'Ⲛⲓⲙ ⲡⲉ ⲫⲁⲓ', 'Who is this?', 'من هذا؟'),
      line('B', 'Ⲫⲁⲓ ⲡⲉ ⲡⲁⲓⲱⲧ', 'This is my father', 'هذا هو أبي'),
      line('A', 'Ⲛⲓⲙ ⲧⲉ ⲑⲁⲓ', 'Who is this (woman)?', 'من هذه؟'),
      line('B', 'Ⲑⲁⲓ ⲧⲉ ⲧⲁⲙⲁⲩ', 'This is my mother', 'هذه هي أمي'),
      line('A', 'Ⲟⲩⲟⲛⲧⲁⲕ ⲥⲱⲛⲓ', 'Do you have a sister?', 'هل عندك أخت؟'),
      line('B', 'Ⲥⲉ, ⲟⲩⲟⲛⲧⲏⲓ ⲥⲱⲛⲓ', 'Yes, I have a sister', 'نعم، عندي أخت'),
      line('A', 'Ⲟⲩⲟⲛⲧⲁⲕ ⲥⲟⲛ', 'Do you have a brother?', 'هل عندك أخ؟'),
      line('B', 'Ⲙ̀ⲙⲟⲛ, ⲙ̀ⲙⲟⲛⲧⲏⲓ ⲥⲟⲛ', 'No, I do not have a brother', 'لا، ليس عندي أخ'),
    ],
  },
  {
    id: 'feast',
    title: { en: 'On a feast', ar: 'في العيد' },
    desc: { en: 'Christmas and Easter greetings', ar: 'تهاني الميلاد والقيامة' },
    lines: [
      line('A', 'Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁⲩⲙⲁⲥϥ', 'Christ is born', 'المسيح وُلد'),
      line('B', 'Ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ ⲁⲩⲙⲁⲥϥ', 'Truly He is born', 'بالحقيقة وُلد'),
      line('A', 'Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁϥⲧⲱⲛϥ', 'Christ is risen', 'المسيح قام'),
      line('B', 'Ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏⲓ ⲁϥⲧⲱⲛϥ', 'Truly He is risen', 'بالحقيقة قام'),
      line('A', 'Ⲛⲟϥⲣⲓ ϣⲁⲓ', 'Happy feast', 'عيد سعيد'),
      line('B', 'Ϯϣⲉⲡϩ̀ⲙⲟⲧ ⲛ̀ⲧⲟⲧⲕ, ⲛⲟϥⲣⲓ ϣⲁⲓ ⲛⲁⲕ ϩⲱⲕ', 'Thank you, happy feast to you too', 'شكراً، وعيد سعيد لك أيضاً'),
    ],
  },
];

// Every grammar example with a meaning, for the Grammar quiz level
export const grammarQuizEntries = (): CopticWord[] => copticGrammar.flatMap((u) => u.rules.flatMap((r) => r.examples.filter((e) => e.meaning) as CopticWord[]));
