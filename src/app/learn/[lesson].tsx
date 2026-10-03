import { Redirect, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { copticFont, goBackOrHome, openHymnPage, ScreenShell, withCopticFont } from '@/components/alhan-ui';
import { learnStrings, LessonId, lessonIds } from '@/components/learn-strings';
import { useLessonStyles } from '@/components/lesson-styles';
import { QuizRound } from '@/components/quiz-round';
import { displayTitle } from '@/data/arabic-titles';
import { buildQuiz, copticAlphabet, copticWords, getPracticeVerses, readingRules } from '@/data/coptic-lessons';
import { AppLanguage, useSettings } from '@/hooks/use-settings';

type LessonProps = { lang: AppLanguage };

export default function LessonScreen() {
  const { lesson } = useLocalSearchParams<{ lesson: string }>();
  const { language: lang } = useSettings();
  const t = learnStrings[lang];

  if (!lessonIds.includes(lesson as LessonId)) return <Redirect href="/learn" />;
  const id = lesson as LessonId;

  return (
    <ScreenShell lang={lang} title={t.lessons[id].title} subtitle={t.lessons[id].desc} onBack={goBackOrHome}>
      {id === 'alphabet' ? <Alphabet lang={lang} /> : null}
      {id === 'reading' ? <ReadingRules lang={lang} /> : null}
      {id === 'words' ? <Words lang={lang} /> : null}
      {id === 'quiz' ? <Quiz lang={lang} /> : null}
      {id === 'practice' ? <Practice lang={lang} /> : null}
    </ScreenShell>
  );
}


function Alphabet({ lang }: LessonProps) {
  const t = learnStrings[lang];
  const { styles, shared, textAlign } = useLessonStyles(lang);
  const [selected, setSelected] = useState(0);
  const letter = copticAlphabet[selected];

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.bigLetter}>
          {letter.upper} {letter.lower}
        </Text>
        <Text style={styles.letterName}>{letter.name}</Text>
        <Text style={styles.copticName}>{letter.copticName}</Text>
        <Text style={[styles.label, textAlign]}>{t.sounds}</Text>
        <Text style={[styles.value, textAlign]}>{letter.sound[lang]}</Text>
        {letter.note ? <Text style={[styles.note, textAlign]}>{letter.note[lang]}</Text> : null}
        {letter.value ? (
          <>
            <Text style={[styles.label, textAlign]}>{t.numberValue}</Text>
            <Text style={[styles.value, textAlign]}>{letter.value}</Text>
          </>
        ) : null}
        {letter.example ? (
          <>
            <Text style={[styles.label, textAlign]}>{t.example}</Text>
            <Text style={[styles.coptic, textAlign]}>{letter.example}</Text>
            <Text style={[styles.sound, textAlign]}>{letter.exampleSound}</Text>
          </>
        ) : null}
      </View>
      <Text style={[shared.subtitle, textAlign]}>{t.tapLetter}</Text>
      <View style={styles.grid}>
        {copticAlphabet.map((l, i) => (
          <View key={l.upper} style={styles.gridCell}>
            <Pressable
              onPress={() => setSelected(i)}
              accessibilityRole="button"
              accessibilityLabel={l.name}
              accessibilityState={{ selected: i === selected }}
              style={({ pressed }) => [styles.tile, i === selected && styles.tileActive, pressed && shared.pressed]}>
              <Text style={[styles.tileLetter, i === selected && styles.tileLetterActive]}>{l.upper}</Text>
              <Text style={[styles.tileName, i === selected && styles.tileLetterActive]} numberOfLines={1}>
                {l.name}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </>
  );
}

function ReadingRules({ lang }: LessonProps) {
  const { styles, textAlign } = useLessonStyles(lang);
  return (
    <>
      {readingRules.map((rule) => (
        <View key={rule.title.en} style={styles.card}>
          <Text style={[styles.cardTitle, textAlign]}>{rule.title[lang]}</Text>
          <Text style={[styles.body, textAlign]}>{rule.body[lang]}</Text>
          {rule.examples.map((ex) => (
            <View key={ex.coptic} style={styles.exampleRow}>
              <Text style={[styles.coptic, textAlign]}>{ex.coptic}</Text>
              <Text style={[styles.sound, textAlign]}>{ex.sound}</Text>
              {ex.meaning ? <Text style={[styles.note, textAlign]}>{ex.meaning[lang]}</Text> : null}
            </View>
          ))}
        </View>
      ))}
    </>
  );
}

function Words({ lang }: LessonProps) {
  const t = learnStrings[lang];
  const { styles, shared, textAlign, rowDirection } = useLessonStyles(lang);
  const [hideMeanings, setHideMeanings] = useState(false);
  // Meanings tapped open while they are hidden
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const toggleHide = () => {
    setHideMeanings((h) => !h);
    setRevealed(new Set());
  };

  return (
    <>
      <Pressable
        onPress={toggleHide}
        accessibilityRole="button"
        accessibilityState={{ selected: hideMeanings }}
        style={({ pressed }) => [shared.controlButton, styles.toggle, hideMeanings && shared.controlButtonActive, pressed && shared.pressed]}>
        <Text style={[shared.controlText, hideMeanings && shared.controlTextActive]}>
          {hideMeanings ? t.showMeanings : t.hideMeanings}
        </Text>
      </Pressable>
      {copticWords.map((word) => {
        const shown = !hideMeanings || revealed.has(word.coptic);
        return (
          <Pressable
            key={word.coptic}
            disabled={shown}
            onPress={() => setRevealed((r) => new Set(r).add(word.coptic))}
            accessibilityRole={shown ? 'text' : 'button'}
            style={[shared.rowCard, rowDirection]}>
            <View style={shared.rowTextWrap}>
              <Text style={[styles.coptic, textAlign]}>{word.coptic}</Text>
              <Text style={[styles.sound, textAlign]}>{word.sound}</Text>
            </View>
            <Text style={[styles.meaning, !shown && styles.hidden]}>{shown ? word.meaning[lang] : t.tapToReveal}</Text>
          </Pressable>
        );
      })}
    </>
  );
}

function Quiz({ lang }: LessonProps) {
  const t = learnStrings[lang];
  return (
    <QuizRound
      lang={lang}
      build={() => buildQuiz(lang)}
      strings={t}
      questionText={(q) => (q.kind === 'letter' ? t.whatLetter : t.whatWord)}
      promptFont={copticFont}
    />
  );
}

function Practice({ lang }: LessonProps) {
  const t = learnStrings[lang];
  const { styles, shared, textAlign, rowDirection } = useLessonStyles(lang);
  const verses = getPracticeVerses();
  const [index, setIndex] = useState(() => Math.floor(Math.random() * verses.length));
  const [showSound, setShowSound] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const verse = verses[index];
  if (!verse) return null;

  const next = () => {
    setIndex((i) => (verses.length > 1 ? (i + 1 + Math.floor(Math.random() * (verses.length - 1))) % verses.length : i));
    setShowSound(false);
    setShowMeaning(false);
  };

  return (
    <>
      <Text style={[shared.subtitle, textAlign]}>{t.readThis}</Text>
      <View style={styles.card}>
        <Text style={[styles.verse, textAlign]}>{verse.coptic}</Text>
        {showSound ? <Text style={[styles.verseSound, textAlign]}>{verse.sound}</Text> : null}
        {showMeaning && verse.meaning ? <Text style={[styles.body, textAlign]}>{verse.meaning}</Text> : null}
        <Text style={[styles.note, textAlign]}>
          {t.from} {withCopticFont(displayTitle(verse.hymn, lang))}
        </Text>
      </View>
      <View style={[shared.audioControls, rowDirection, styles.buttonRow]}>
        <Pressable
          onPress={() => setShowSound((s) => !s)}
          accessibilityRole="button"
          accessibilityState={{ selected: showSound }}
          style={[shared.controlButton, showSound && shared.controlButtonActive]}>
          <Text style={[shared.controlText, showSound && shared.controlTextActive]}>{t.showSound}</Text>
        </Pressable>
        {verse.meaning ? (
          <Pressable
            onPress={() => setShowMeaning((s) => !s)}
            accessibilityRole="button"
            accessibilityState={{ selected: showMeaning }}
            style={[shared.controlButton, showMeaning && shared.controlButtonActive]}>
            <Text style={[shared.controlText, showMeaning && shared.controlTextActive]}>{t.showMeaning}</Text>
          </Pressable>
        ) : null}
      </View>
      <Pressable onPress={next} accessibilityRole="button" style={({ pressed }) => [styles.primary, pressed && shared.pressed]}>
        <Text style={styles.primaryText}>{t.nextVerse}</Text>
      </Pressable>
      <Pressable
        onPress={() => openHymnPage(verse.hymn.id, 'coptic')}
        accessibilityRole="button"
        style={({ pressed }) => [shared.controlButton, styles.secondary, pressed && shared.pressed]}>
        <Text style={shared.controlText}>{t.openHymn}</Text>
      </Pressable>
    </>
  );
}
