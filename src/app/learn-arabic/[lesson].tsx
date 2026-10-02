import { Redirect, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { goBackOrHome, openHymnPage, ScreenShell } from '@/components/alhan-ui';
import { ArabicLessonId, arabicLessonIds, learnArabicStrings as t } from '@/components/learn-strings';
import { useLessonStyles } from '@/components/lesson-styles';
import { QuizRound } from '@/components/quiz-round';
import {
  arabicAlphabet,
  arabicForms,
  arabicMarks,
  arabicWords,
  buildArabicQuiz,
  getArabicPracticeVerses,
} from '@/data/arabic-lessons';

// Learn Arabic is for English speakers, so its lessons are always in English
export default function ArabicLessonScreen() {
  const { lesson } = useLocalSearchParams<{ lesson: string }>();
  if (!arabicLessonIds.includes(lesson as ArabicLessonId)) return <Redirect href="/learn-arabic" />;
  const id = lesson as ArabicLessonId;

  return (
    <ScreenShell lang="en" title={t.lessons[id].title} subtitle={t.lessons[id].desc} onBack={goBackOrHome}>
      {id === 'alphabet' ? <Alphabet /> : null}
      {id === 'marks' ? <Marks /> : null}
      {id === 'words' ? <Words /> : null}
      {id === 'quiz' ? <QuizRound lang="en" build={() => buildArabicQuiz()} strings={t} questionText={(q) => (q.kind === 'letter' ? t.whatLetter : t.whatWord)} /> : null}
      {id === 'practice' ? <Practice /> : null}
    </ScreenShell>
  );
}

function Alphabet() {
  const { styles, shared } = useLessonStyles('en');
  const [selected, setSelected] = useState(0);
  const letter = arabicAlphabet[selected];
  const forms = arabicForms(letter);
  const formCells: [string, string][] = [
    [t.formAlone, forms.alone],
    [t.formStart, forms.start],
    [t.formMiddle, forms.middle],
    [t.formEnd, forms.end],
  ];

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.arabicLetter}>{letter.letter}</Text>
        <Text style={styles.letterName}>{letter.name.en}</Text>
        <Text style={[styles.label, shared.alignLeft]}>{t.sounds}</Text>
        <Text style={[styles.value, shared.alignLeft]}>{letter.sound.en}</Text>
        <Text style={[styles.label, shared.alignLeft]}>{t.inEnglishLetters}</Text>
        <Text style={[styles.value, shared.alignLeft]}>{letter.latin}</Text>
        {letter.coptic ? (
          <>
            <Text style={[styles.label, shared.alignLeft]}>{t.copticLetter}</Text>
            <Text style={[styles.coptic, shared.alignLeft]}>{letter.coptic}</Text>
          </>
        ) : null}
        <Text style={[styles.label, shared.alignLeft]}>{t.forms}</Text>
        {/* Right to left, the way a word is read */}
        <View style={[styles.forms, shared.rowReverse]}>
          {formCells.map(([label, form]) => (
            <View key={label} style={styles.formCell}>
              <Text style={styles.formLetter}>{form}</Text>
              <Text style={styles.tileName}>{label}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.label, shared.alignLeft]}>{t.example}</Text>
        <Text style={[styles.arabicWord, shared.alignLeft]}>{letter.example}</Text>
        <Text style={[styles.sound, shared.alignLeft]}>{letter.exampleSound}</Text>
        <Text style={[styles.note, shared.alignLeft]}>{letter.meaning.en}</Text>
      </View>
      <Text style={[shared.subtitle, shared.alignLeft]}>{t.tapLetter}</Text>
      {/* In Arabic order, starting from the right */}
      <View style={[styles.grid, shared.rowReverse]}>
        {arabicAlphabet.map((l, i) => (
          <View key={l.letter} style={styles.gridCell}>
            <Pressable
              onPress={() => setSelected(i)}
              accessibilityRole="button"
              accessibilityLabel={l.name.en}
              accessibilityState={{ selected: i === selected }}
              style={({ pressed }) => [styles.tile, i === selected && styles.tileActive, pressed && shared.pressed]}>
              <Text style={[styles.tileArabic, i === selected && styles.tileLetterActive]}>{l.letter}</Text>
              <Text style={[styles.tileName, i === selected && styles.tileLetterActive]} numberOfLines={1}>
                {l.name.en}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </>
  );
}

function Marks() {
  const { styles, shared } = useLessonStyles('en');
  return (
    <>
      {arabicMarks.map((m) => (
        <View key={m.mark} style={styles.card}>
          <View style={[shared.row, styles.markHeader]}>
            <Text style={styles.markGlyph}>{m.mark}</Text>
            <Text style={[styles.cardTitle, styles.markName, shared.alignLeft]}>{m.name.en}</Text>
          </View>
          <Text style={[styles.body, shared.alignLeft]}>{m.body.en}</Text>
          <View style={styles.exampleRow}>
            <Text style={[styles.arabicWord, shared.alignLeft]}>{m.example}</Text>
            <Text style={[styles.sound, shared.alignLeft]}>{m.exampleSound}</Text>
          </View>
        </View>
      ))}
    </>
  );
}

function Words() {
  const { styles, shared } = useLessonStyles('en');
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
      {arabicWords.map((word) => {
        const shown = !hideMeanings || revealed.has(word.arabic);
        return (
          <Pressable
            key={word.arabic}
            disabled={shown}
            onPress={() => setRevealed((r) => new Set(r).add(word.arabic))}
            accessibilityRole={shown ? 'text' : 'button'}
            style={[shared.rowCard, shared.row]}>
            <View style={shared.rowTextWrap}>
              <Text style={[styles.arabicWord, shared.alignLeft]}>{word.arabic}</Text>
              <Text style={[styles.sound, shared.alignLeft]}>{word.sound}</Text>
            </View>
            <Text style={[styles.meaning, !shown && styles.hidden]}>{shown ? word.meaning : t.tapToReveal}</Text>
          </Pressable>
        );
      })}
    </>
  );
}

function Practice() {
  const { styles, shared } = useLessonStyles('en');
  const verses = getArabicPracticeVerses();
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
      <Text style={[shared.subtitle, shared.alignLeft]}>{t.readThis}</Text>
      <View style={styles.card}>
        <Text style={styles.arabicVerse}>{verse.arabic}</Text>
        {showSound ? <Text style={[styles.verseSound, shared.alignLeft]}>{verse.sound}</Text> : null}
        {showMeaning && verse.meaning ? <Text style={[styles.body, shared.alignLeft]}>{verse.meaning}</Text> : null}
        <Text style={[styles.note, shared.alignLeft]}>
          {t.from} {verse.hymn.title}
        </Text>
      </View>
      <View style={[shared.audioControls, shared.row, styles.buttonRow]}>
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
        onPress={() => openHymnPage(verse.hymn.id, 'arabic')}
        accessibilityRole="button"
        style={({ pressed }) => [shared.controlButton, styles.secondary, pressed && shared.pressed]}>
        <Text style={shared.controlText}>{t.openHymn}</Text>
      </Pressable>
    </>
  );
}
