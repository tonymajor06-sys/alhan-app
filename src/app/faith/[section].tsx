import { Redirect, useLocalSearchParams } from 'expo-router';

import { goBackOrHome, ScreenShell } from '@/components/alhan-ui';
import { GuideSectionBody } from '@/components/guide-section-body';
import { QuizRound } from '@/components/quiz-round';
import { buildFaithQuiz, faithSections, faithStrings } from '@/data/faith-guide';
import { useSettings } from '@/hooks/use-settings';

// Build every page ahead of time, so a shared link or a refresh on the website works
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return [...faithSections.map((s) => s.id), 'quiz'].map((section) => ({ section }));
}

export default function FaithSectionScreen() {
  const { section: id } = useLocalSearchParams<{ section: string }>();
  const { language: lang } = useSettings();

  if (id === 'quiz') {
    const t = faithStrings[lang];
    return (
      <ScreenShell lang={lang} title={t.quizTitle} subtitle={t.quizDesc} onBack={goBackOrHome}>
        <QuizRound lang={lang} build={() => buildFaithQuiz(lang)} strings={t} />
      </ScreenShell>
    );
  }

  const section = faithSections.find((s) => s.id === id);
  if (!section) return <Redirect href="/faith" />;

  return (
    <ScreenShell lang={lang} title={section.title[lang]} subtitle={section.desc[lang]} onBack={goBackOrHome}>
      <GuideSectionBody section={section} lang={lang} />
    </ScreenShell>
  );
}
