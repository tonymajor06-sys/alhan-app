import { useState } from 'react';
import { Pressable, Text } from 'react-native';

import { createAlhanStyles } from '@/components/alhan-ui';
import { MenuList } from '@/components/menu-list';
import { QuizRound, QuizStrings } from '@/components/quiz-round';
import { toArabicDigits } from '@/data/coptic-calendar';
import { QuizLevel, QuizQuestion } from '@/data/quiz';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { recordQuizScore, useQuizBest } from '@/hooks/use-quiz-progress';
import { AppLanguage } from '@/hooks/use-settings';

export interface QuizLevelStrings extends QuizStrings {
  allLevels: string;
  level: (n: string) => string;
  best: (score: string) => string;
}

// The quiz's levels, from letters up to whole sentences; each one opens its own round
export function QuizLevels({
  lang,
  levels,
  strings: t,
  questionText,
  promptFont,
  tilesRTL,
}: {
  lang: AppLanguage;
  levels: QuizLevel[];
  strings: QuizLevelStrings;
  questionText?: (q: QuizQuestion) => string | undefined;
  promptFont?: string;
  tilesRTL?: boolean;
}) {
  const shared = useThemedStyles(createAlhanStyles);
  const best = useQuizBest();
  const [open, setOpen] = useState<number | null>(null);
  const rtl = lang === 'ar';
  const n = (v: number) => (rtl ? toArabicDigits(v) : String(v));
  const textAlign = rtl ? shared.alignRight : shared.alignLeft;

  if (open === null) {
    return (
      <MenuList
        rtl={rtl}
        items={levels.map((level, i) => {
          const score = best[level.id];
          return {
            key: level.id,
            lead: n(i + 1),
            title: level.title,
            desc: score ? `${level.desc} · ${t.best(t.score(n(score.right), n(score.total)))}` : level.desc,
            onPress: () => setOpen(i),
          };
        })}
      />
    );
  }

  const level = levels[open];
  return (
    <>
      <Pressable
        onPress={() => setOpen(null)}
        accessibilityRole="button"
        style={({ pressed }) => [shared.controlButton, { alignSelf: rtl ? 'flex-end' : 'flex-start', marginBottom: 12, paddingHorizontal: 16 }, pressed && shared.pressed]}>
        <Text style={shared.controlText}>{rtl ? `${t.allLevels} ›` : `‹ ${t.allLevels}`}</Text>
      </Pressable>
      <Text style={[shared.subtitle, textAlign]}>
        {t.level(n(open + 1))} · {level.title}
      </Text>
      <QuizRound
        key={level.id}
        lang={lang}
        build={() => level.build()}
        strings={t}
        questionText={questionText}
        promptFont={promptFont}
        tilesRTL={tilesRTL}
        onFinish={(right, total) => recordQuizScore(level.id, right, total)}
        onNext={open + 1 < levels.length ? () => setOpen(open + 1) : undefined}
      />
    </>
  );
}
