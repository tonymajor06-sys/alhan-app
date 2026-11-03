import { Bilingual, buildQuiz, GuideQuestion } from './deacon-guide';
import { QuizQuestion } from './quiz';
import { faithLessons } from './theology-lessons-faith';
import { historyLessons } from './theology-lessons-history';

// Our Faith > Theology School: one short lesson a day with a quiz at the end, from what we believe to the councils,
// the fathers and the Coptic Church's history. The lessons are in theology-lessons-faith.ts and theology-lessons-history.ts.

export type UnitId = 'faith' | 'life' | 'councils' | 'fathers';

export interface Lesson {
  id: string;
  unit: UnitId;
  title: Bilingual;
  // A question or a story to open with
  hook: Bilingual;
  sections: { heading: Bilingual; body: Bilingual }[];
  verse: { text: Bilingual; ref: Bilingual };
  // "Did you know?"
  know: Bilingual;
  // Three things to remember
  remember: Bilingual[];
  quiz: GuideQuestion[];
}

export const units: { id: UnitId; title: Bilingual }[] = [
  { id: 'faith', title: { en: 'What We Believe', ar: 'ما نؤمن به' } },
  { id: 'life', title: { en: 'The Life of the Church', ar: 'حياة الكنيسة' } },
  { id: 'councils', title: { en: 'The Councils', ar: 'المجامع' } },
  { id: 'fathers', title: { en: 'The Fathers and Our History', ar: 'الآباء وتاريخنا' } },
];

export const lessons: Lesson[] = [...faithLessons, ...historyLessons];

export const lessonNumber = (id: string) => lessons.findIndex((l) => l.id === id) + 1;

// Every question of the lesson, with the answers mixed up
export function buildLessonQuiz(lesson: Lesson, lang: 'en' | 'ar', random: () => number = Math.random): QuizQuestion[] {
  return buildQuiz(lesson.quiz, lang, lesson.quiz.length, random);
}

// ---- A lesson a day ----

export interface LessonDone {
  // The day it was finished (a day number, see useTodayJdn)
  day: number;
  right: number;
  total: number;
}

export interface SchoolDay {
  // The lesson to do next, or null when every lesson is done
  next: Lesson | null;
  // A lesson was already finished today, so the next one is tomorrow's
  doneToday: boolean;
  // Days in a row with a finished lesson, up to today (or yesterday, while today's isn't done yet)
  streak: number;
  doneCount: number;
}

export function schoolDay(done: Record<string, LessonDone>, today: number): SchoolDay {
  const days = new Set(Object.values(done).map((d) => d.day));
  let streak = 0;
  for (let day = days.has(today) ? today : today - 1; days.has(day); day--) streak++;
  return {
    next: lessons.find((l) => !done[l.id]) ?? null,
    doneToday: days.has(today),
    streak,
    doneCount: lessons.filter((l) => done[l.id]).length,
  };
}

export const schoolStrings = {
  en: {
    title: 'Theology School',
    desc: 'A short lesson a day, with a quiz: our faith, the councils and the fathers',
    subtitle: 'A short lesson a day, with a quiz at the end',
    today: "Today's lesson",
    tomorrow: "Tomorrow's lesson",
    doneToday: "You finished today's lesson. Come back tomorrow for the next one.",
    startEarly: 'Start it now anyway',
    start: 'Start',
    allDone: 'You finished every lesson! Go back to any of them below.',
    lessonOf: (n: string, total: string) => `Lesson ${n} of ${total}`,
    progress: (done: string, total: string) => `${done} of ${total} lessons done`,
    streak: (n: string) => `${n}-day streak`,
    minutes: '5 minute read',
    knowTitle: 'Did you know?',
    rememberTitle: 'Remember',
    quizTitle: 'Quiz',
    quizIntro: 'Answer the questions to finish the lesson.',
    finished: (score: string) => `Lesson complete · ${score}`,
    backToSchool: 'Back to the school',
    // The quiz
    correct: 'Correct!',
    wrongAnswer: (answer: string) => `The answer is: ${answer}`,
    next: 'Next',
    seeScore: 'See score',
    score: (right: string, total: string) => `${right} out of ${total}`,
    scoreGreat: 'Excellent! Lesson complete.',
    scoreGood: 'Good work. Lesson complete: read it again any time.',
    scoreKeepGoing: 'Lesson complete. Read it again and try once more.',
    playAgain: 'Try the quiz again',
    nextLevel: 'Back to the school',
  },
  ar: {
    title: 'مدرسة اللاهوت',
    desc: 'درس قصير كل يوم مع اختبار: إيماننا والمجامع والآباء',
    subtitle: 'درس قصير كل يوم، وفي آخره اختبار',
    today: 'درس اليوم',
    tomorrow: 'درس الغد',
    doneToday: 'أنهيت درس اليوم. عد غداً للدرس التالي.',
    startEarly: 'ابدأه الآن على أي حال',
    start: 'ابدأ',
    allDone: 'أنهيت كل الدروس! يمكنك الرجوع إلى أي درس بالأسفل.',
    lessonOf: (n: string, total: string) => `الدرس ${n} من ${total}`,
    progress: (done: string, total: string) => `أنهيت ${done} من ${total} درساً`,
    streak: (n: string) => `${n} يوم متتالٍ`,
    minutes: 'قراءة ٥ دقائق',
    knowTitle: 'هل تعلم؟',
    rememberTitle: 'تذكّر',
    quizTitle: 'اختبار',
    quizIntro: 'أجب عن الأسئلة لتنهي الدرس.',
    finished: (score: string) => `أنهيت الدرس · ${score}`,
    backToSchool: 'العودة إلى المدرسة',
    correct: 'إجابة صحيحة!',
    wrongAnswer: (answer: string) => `الإجابة هي: ${answer}`,
    next: 'التالي',
    seeScore: 'النتيجة',
    score: (right: string, total: string) => `${right} من ${total}`,
    scoreGreat: 'ممتاز! أنهيت الدرس.',
    scoreGood: 'عمل جيد. أنهيت الدرس، ويمكنك قراءته مرة أخرى في أي وقت.',
    scoreKeepGoing: 'أنهيت الدرس. اقرأه مرة أخرى وحاول من جديد.',
    playAgain: 'أعد الاختبار',
    nextLevel: 'العودة إلى المدرسة',
  },
};
