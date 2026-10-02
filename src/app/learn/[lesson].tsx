import { Redirect, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { copticFont, createAlhanStyles, goBackOrHome, openHymnPage, ScreenShell } from '@/components/alhan-ui';
import { learnStrings, LessonId, lessonIds } from '@/components/learn-strings';
import { QuizRound } from '@/components/quiz-round';
import { AlhanPalette } from '@/constants/alhan-colors';
import { arabicAlphabet, arabicForms, arabicMarks } from '@/data/arabic-lessons';
import { displayTitle } from '@/data/arabic-titles';
import { buildQuiz, copticAlphabet, copticWords, getPracticeVerses, readingRules } from '@/data/coptic-lessons';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
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
      {id === 'arabic' ? <ArabicAlphabet lang={lang} /> : null}
    </ScreenShell>
  );
}

function useLessonStyles(lang: AppLanguage) {
  const styles = useThemedStyles(createStyles);
  const shared = useThemedStyles(createAlhanStyles);
  const isRTL = lang === 'ar';
  return {
    styles,
    shared,
    isRTL,
    rowDirection: isRTL ? shared.rowReverse : shared.row,
    textAlign: isRTL ? shared.alignRight : shared.alignLeft,
  };
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

function ArabicAlphabet({ lang }: LessonProps) {
  const t = learnStrings[lang];
  const { styles, shared, textAlign, rowDirection } = useLessonStyles(lang);
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
        <Text style={styles.letterName}>{letter.name[lang]}</Text>
        <Text style={[styles.label, textAlign]}>{t.sounds}</Text>
        <Text style={[styles.value, textAlign]}>{letter.sound[lang]}</Text>
        <Text style={[styles.label, textAlign]}>{t.inEnglishLetters}</Text>
        <Text style={[styles.value, textAlign]}>{letter.latin}</Text>
        {letter.coptic ? (
          <>
            <Text style={[styles.label, textAlign]}>{t.copticLetter}</Text>
            <Text style={[styles.coptic, textAlign]}>{letter.coptic}</Text>
          </>
        ) : null}
        <Text style={[styles.label, textAlign]}>{t.forms}</Text>
        {/* Right to left, the way the word is read */}
        <View style={[styles.forms, shared.rowReverse]}>
          {formCells.map(([label, form]) => (
            <View key={label} style={styles.formCell}>
              <Text style={styles.formLetter}>{form}</Text>
              <Text style={styles.tileName}>{label}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.label, textAlign]}>{t.example}</Text>
        <Text style={[styles.arabicWord, textAlign]}>{letter.example}</Text>
        <Text style={[styles.sound, textAlign]}>{letter.exampleSound}</Text>
        <Text style={[styles.note, textAlign]}>{letter.meaning[lang]}</Text>
      </View>
      <Text style={[shared.subtitle, textAlign]}>{t.tapLetter}</Text>
      <View style={[styles.grid, rowDirection]}>
        {arabicAlphabet.map((l, i) => (
          <View key={l.letter} style={styles.gridCell}>
            <Pressable
              onPress={() => setSelected(i)}
              accessibilityRole="button"
              accessibilityLabel={l.name[lang]}
              accessibilityState={{ selected: i === selected }}
              style={({ pressed }) => [styles.tile, i === selected && styles.tileActive, pressed && shared.pressed]}>
              <Text style={[styles.tileArabic, i === selected && styles.tileLetterActive]}>{l.letter}</Text>
              <Text style={[styles.tileName, i === selected && styles.tileLetterActive]} numberOfLines={1}>
                {l.name[lang]}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
      <Text style={[styles.sectionTitle, textAlign]}>{t.marksTitle}</Text>
      {arabicMarks.map((m) => (
        <View key={m.mark} style={styles.card}>
          <View style={[rowDirection, styles.markHeader]}>
            <Text style={styles.markGlyph}>{m.mark}</Text>
            <Text style={[styles.cardTitle, styles.markName, textAlign]}>{m.name[lang]}</Text>
          </View>
          <Text style={[styles.body, textAlign]}>{m.body[lang]}</Text>
          <View style={styles.exampleRow}>
            <Text style={[styles.arabicWord, textAlign]}>{m.example}</Text>
            <Text style={[styles.sound, textAlign]}>{m.exampleSound}</Text>
          </View>
        </View>
      ))}
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
          {t.from} {displayTitle(verse.hymn, lang)}
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

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderTopWidth: 3,
      borderTopColor: colors.gold,
      padding: 20,
      marginBottom: 16,
    },
    cardTitle: { fontSize: 22, fontWeight: '800', color: colors.gold, marginBottom: 8 },
    body: { fontSize: 17, lineHeight: 26, color: colors.text, marginBottom: 8 },
    label: { fontSize: 14, fontWeight: '700', color: colors.muted, letterSpacing: 0.5, marginTop: 12 },
    value: { fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 2 },
    note: { fontSize: 15, lineHeight: 22, color: colors.muted, marginTop: 6 },
    bigLetter: { fontSize: 56, lineHeight: 72, fontFamily: copticFont, color: colors.gold, textAlign: 'center' },
    letterName: { fontSize: 24, fontWeight: '800', color: colors.text, textAlign: 'center', marginBottom: 4 },
    copticName: { fontSize: 20, fontFamily: copticFont, color: colors.muted, textAlign: 'center', marginBottom: 4 },
    coptic: { fontSize: 26, lineHeight: 36, fontFamily: copticFont, color: colors.text, marginTop: 2 },
    sound: { fontSize: 16, color: colors.gold, fontWeight: '600' },
    meaning: { fontSize: 17, fontWeight: '600', color: colors.text, maxWidth: '45%', textAlign: 'center' },
    hidden: { color: colors.muted, fontWeight: '400', fontSize: 14 },
    exampleRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 10, marginTop: 10 },

    grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4, marginBottom: 24 },
    gridCell: { width: '25%', padding: 4 },
    tile: {
      aspectRatio: 1,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tileActive: { backgroundColor: colors.gold, borderColor: colors.gold },
    tileLetter: { fontSize: 30, lineHeight: 38, fontFamily: copticFont, color: colors.text },
    tileName: { fontSize: 12, color: colors.muted },
    tileLetterActive: { color: colors.onGold },

    toggle: { flex: 0, marginBottom: 14 },


    primary: {
      marginTop: 12,
      minHeight: 52,
      borderRadius: 14,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    primaryText: { fontSize: 18, fontWeight: '800', color: colors.onGold },
    secondary: { flex: 0, marginTop: 12 },
    buttonRow: { marginBottom: 4 },

    verse: { fontSize: 26, lineHeight: 40, fontFamily: copticFont, color: colors.text },

    // Arabic alphabet
    arabicLetter: { fontSize: 64, lineHeight: 96, color: colors.gold, textAlign: 'center' },
    tileArabic: { fontSize: 30, lineHeight: 44, color: colors.text },
    arabicWord: { fontSize: 28, lineHeight: 44, color: colors.text, writingDirection: 'rtl' },
    forms: { justifyContent: 'space-between', marginTop: 6 },
    formCell: { alignItems: 'center', flex: 1 },
    formLetter: { fontSize: 30, lineHeight: 46, color: colors.gold },
    sectionTitle: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 12 },
    markHeader: { alignItems: 'center', gap: 14, marginBottom: 4 },
    markGlyph: { fontSize: 40, lineHeight: 58, color: colors.gold, minWidth: 48, textAlign: 'center' },
    markName: { marginBottom: 0, flex: 1 },
    verseSound: { fontSize: 18, lineHeight: 28, color: colors.gold, marginTop: 12 },
  });
