import { Redirect, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { goBackOrHome, openHymnPage, ScreenShell, withCopticFont } from '@/components/alhan-ui';
import { EnglishLessonId, englishLessonIds, learnEnglishStrings as t } from '@/components/learn-strings';
import { useLessonStyles } from '@/components/lesson-styles';
import { QuizLevels } from '@/components/quiz-levels';
import {
  englishQuizLevels,
  englishMoreWords,
  englishAlphabet,
  englishSound,
  englishSounds,
  englishWords,
  getEnglishPracticeVerses,
} from '@/data/english-lessons';

const quizLevels = englishQuizLevels(t.levelText);

// Build every page ahead of time, so a shared link or a refresh on the website works
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return englishLessonIds.map((lesson) => ({ lesson }));
}

// Learn English is for Arabic speakers, so its lessons are always in Arabic (English words stay left to right)
export default function EnglishLessonScreen() {
  const { lesson } = useLocalSearchParams<{ lesson: string }>();
  if (!englishLessonIds.includes(lesson as EnglishLessonId)) return <Redirect href="/learn-english" />;
  const id = lesson as EnglishLessonId;

  return (
    <ScreenShell lang="ar" title={t.lessons[id].title} subtitle={t.lessons[id].desc} onBack={goBackOrHome}>
      {id === 'alphabet' ? <Alphabet /> : null}
      {id === 'sounds' ? <Sounds /> : null}
      {id === 'words' ? <Words /> : null}
      {id === 'quiz' ? <QuizLevels lang="ar" levels={quizLevels} strings={t} questionText={(q) => (q.kind === 'letter' ? t.whatLetter : undefined)} /> : null}
      {id === 'practice' ? <Practice /> : null}
    </ScreenShell>
  );
}

function Alphabet() {
  const { styles, shared } = useLessonStyles('ar');
  const [selected, setSelected] = useState(0);
  const letter = englishAlphabet[selected];

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.bigLetter}>{letter.letter}</Text>
        <Text style={styles.letterName}>{letter.name}</Text>
        <Text style={[styles.label, shared.alignRight]}>{t.sounds}</Text>
        <Text style={[styles.value, shared.alignRight]}>{letter.sound}</Text>
        <Text style={[styles.label, shared.alignRight]}>{t.arabicLetter}</Text>
        <Text style={[styles.arabicWord, shared.alignRight]}>{letter.arabic}</Text>
        <Text style={[styles.label, shared.alignRight]}>{t.example}</Text>
        <Text style={[styles.value, shared.alignLeft]}>{letter.example}</Text>
        <Text style={[styles.arabicWord, shared.alignRight]}>{englishSound(letter.example)}</Text>
        <Text style={[styles.note, shared.alignRight]}>{letter.meaning}</Text>
      </View>
      <Text style={[shared.subtitle, shared.alignRight]}>{t.tapLetter}</Text>
      {/* In English order, left to right */}
      <View style={[styles.grid, shared.row]}>
        {englishAlphabet.map((l, i) => (
          <View key={l.letter} style={styles.gridCell}>
            <Pressable
              onPress={() => setSelected(i)}
              accessibilityRole="button"
              accessibilityLabel={l.name}
              accessibilityState={{ selected: i === selected }}
              style={({ pressed }) => [styles.tile, i === selected && styles.tileActive, pressed && shared.pressed]}>
              <Text style={[styles.tileLetter, i === selected && styles.tileLetterActive]}>{l.letter.split(' ')[0]}</Text>
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

function Sounds() {
  const { styles, shared } = useLessonStyles('ar');
  return (
    <>
      {englishSounds.map((s) => (
        <View key={s.letters} style={styles.card}>
          <View style={[shared.rowReverse, styles.markHeader]}>
            <Text style={styles.markGlyph}>{s.letters}</Text>
            <Text style={[styles.cardTitle, styles.markName, shared.alignRight]}>{s.sound}</Text>
          </View>
          <Text style={[styles.body, shared.alignRight]}>{s.body}</Text>
          {s.examples.map((example) => (
            <View key={example} style={styles.exampleRow}>
              <Text style={[styles.value, shared.alignLeft]}>{example}</Text>
              <Text style={[styles.arabicWord, shared.alignRight]}>{englishSound(example)}</Text>
            </View>
          ))}
        </View>
      ))}
    </>
  );
}

function Words() {
  const { styles, shared } = useLessonStyles('ar');
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
      {[...englishWords, ...englishMoreWords].map((word) => {
        const shown = !hideMeanings || revealed.has(word.english);
        return (
          <Pressable
            key={word.english}
            disabled={shown}
            onPress={() => setRevealed((r) => new Set(r).add(word.english))}
            accessibilityRole={shown ? 'text' : 'button'}
            style={[shared.rowCard, shared.row]}>
            <View style={shared.rowTextWrap}>
              <Text style={[styles.value, shared.alignLeft]}>{word.english}</Text>
              <Text style={[styles.sound, shared.alignLeft]}>{englishSound(word.english)}</Text>
            </View>
            <Text style={[styles.meaning, !shown && styles.hidden]}>{shown ? word.meaning : t.tapToReveal}</Text>
          </Pressable>
        );
      })}
    </>
  );
}

function Practice() {
  const { styles, shared } = useLessonStyles('ar');
  const verses = getEnglishPracticeVerses();
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
      <Text style={[shared.subtitle, shared.alignRight]}>{t.readThis}</Text>
      <View style={styles.card}>
        <Text style={[styles.verse, shared.alignLeft]}>{verse.english}</Text>
        {showSound ? <Text style={[styles.arabicVerse]}>{verse.sound}</Text> : null}
        {showMeaning && verse.meaning ? <Text style={[styles.arabicVerse]}>{verse.meaning}</Text> : null}
        <Text style={[styles.note, shared.alignRight]}>
          {t.from} {withCopticFont(verse.hymn.title)}
        </Text>
      </View>
      <View style={[shared.audioControls, shared.rowReverse, styles.buttonRow]}>
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
        onPress={() => openHymnPage(verse.hymn.id, 'english')}
        accessibilityRole="button"
        style={({ pressed }) => [shared.controlButton, styles.secondary, pressed && shared.pressed]}>
        <Text style={shared.controlText}>{t.openHymn}</Text>
      </Pressable>
    </>
  );
}
