import { useDeferredValue, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { copticFont, openHymnPage, withCopticFont } from '@/components/alhan-ui';
import { learnStrings } from '@/components/learn-strings';
import { useLessonStyles } from '@/components/lesson-styles';
import { AlhanPalette } from '@/constants/alhan-colors';
import { toArabicDigits } from '@/data/coptic-calendar';
import { copticAlphabet } from '@/data/coptic-lessons';
import { dictionary, DictEntry, hasCopticLetters, HymnVerse, hymnVersesFor, lookUpCoptic, lookUpMeaning, versesSaying, WordResult } from '@/data/coptic-translator';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { AppLanguage } from '@/hooks/use-settings';

// Learn Coptic > Coptic Translator: type Coptic to see what it means (word by word, with the pieces of longer words),
// or English/Arabic to find the Coptic. Coptic can be typed on the keyboard here, since few phones have one, or in
// English letters, which are read as Coptic when they aren't English
const keys = copticAlphabet.filter((l) => l.lower !== 'ϛ').map((l) => l.lower);
const JINKIM = '̀';

// `initial` fills in the box, e.g. from a link to /learn/translator?q=ⲁϥϭⲓⲥⲁⲣⲝ
export function CopticTranslator({ lang, initial = '' }: { lang: AppLanguage; initial?: string }) {
  const t = learnStrings[lang].translator;
  const colors = useAlhanColors();
  const { styles, shared, textAlign, rowDirection, isRTL } = useLessonStyles(lang);
  const local = useThemedStyles(createStyles);
  const [text, setText] = useState(initial);
  const [keyboard, setKeyboard] = useState(false);
  const query = useDeferredValue(text.trim());
  const isCoptic = hasCopticLetters(query);

  const meaning = useMemo(() => (query && !isCoptic ? { ...lookUpMeaning(query, lang), verses: versesSaying(query) } : null), [query, isCoptic, lang]);
  // Coptic typed in Coptic letters, or in English letters that turned out to be Coptic
  const copticText = isCoptic ? query : meaning?.asCoptic;
  const coptic = useMemo(() => (copticText ? { ...lookUpCoptic(copticText, lang), ...hymnVersesFor(copticText) } : null), [copticText, lang]);

  // ⌫ takes off the last letter together with its jinkim
  const backspace = () => setText((s) => s.replace(/.\p{M}*$/u, ''));
  const count = isRTL ? toArabicDigits(dictionary().length) : String(dictionary().length);

  const entryRow = (entry: DictEntry, key: string) => (
    <View key={key} style={[shared.rowCard, rowDirection]}>
      <View style={shared.rowTextWrap}>
        <Text style={[styles.coptic, textAlign]}>{entry.coptic}</Text>
        <Text style={[styles.sound, textAlign]}>{entry.sound}</Text>
        {entry.note ? <Text style={[local.small, textAlign]}>{entry.note[lang]}</Text> : null}
      </View>
      <Text style={[styles.meaning, local.meaning]}>{entry.meaning[lang]}</Text>
    </View>
  );

  const wordCard = (word: WordResult, i: number) => (
    <View key={`${i}-${word.word}`} style={styles.card}>
      <Text style={[styles.coptic, textAlign]}>{word.word}</Text>
      <Text style={[styles.sound, textAlign]}>{word.sound}</Text>
      {word.entries.length ? (
        [...new Set(word.entries.map((e) => e.meaning[lang]))].map((m) => (
          <Text key={m} style={[styles.body, local.wordMeaning, textAlign]}>
            {m}
          </Text>
        ))
      ) : word.pieces ? (
        <>
          <Text style={[styles.label, textAlign]}>{t.madeOf}</Text>
          {word.pieces.map((piece, k) => (
            <View key={`${k}-${piece.text}`} style={[local.piece, rowDirection]}>
              <Text style={[local.pieceCoptic, piece.kind !== 'word' && local.pieceAffix]}>{piece.text}</Text>
              <Text style={[styles.body, local.pieceMeaning, textAlign]}>{piece.meaning}</Text>
            </View>
          ))}
        </>
      ) : (
        <>
          <Text style={[styles.note, textAlign]}>{t.unknown}</Text>
          {word.nearest ? (
            <Pressable
              onPress={() => setText((s) => s.replace(word.word, word.nearest!.coptic))}
              accessibilityRole="button"
              style={({ pressed }) => [local.suggestion, rowDirection, pressed && shared.pressed]}>
              <Text style={[styles.note, local.suggestionLabel]}>{t.didYouMean}</Text>
              <Text style={local.suggestionCoptic}>{word.nearest.coptic}</Text>
              <Text style={[styles.note, local.suggestionLabel]}>({word.nearest.meaning[lang]})?</Text>
            </Pressable>
          ) : null}
        </>
      )}
      {word.spelled ? <Text style={[local.small, textAlign]}>{withCopticFont(t.spelledAs(word.spelled))}</Text> : null}
      {word.entries[0]?.note ? <Text style={[local.small, textAlign]}>{word.entries[0].note[lang]}</Text> : null}
    </View>
  );

  const verseCard = (verse: HymnVerse) => {
    const meaningText = lang === 'ar' ? (verse.meaning.ar ?? verse.meaning.en) : verse.meaning.en;
    const arabic = lang === 'ar' && verse.meaning.ar;
    return (
      <View key={verse.coptic} style={styles.card}>
        <Text style={[styles.verse, textAlign]}>{verse.coptic}</Text>
        <Text style={[styles.body, local.verseMeaning, arabic ? shared.alignRight : shared.alignLeft]}>{meaningText}</Text>
        <Pressable
          onPress={() => openHymnPage(verse.hymnId, 'coptic')}
          accessibilityRole="button"
          style={({ pressed }) => [shared.controlButton, styles.secondary, pressed && shared.pressed]}>
          <Text style={shared.controlText}>{t.openHymn}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <View style={[shared.searchField, rowDirection, local.field]}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={t.placeholder}
          placeholderTextColor={colors.muted}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          accessibilityLabel={learnStrings[lang].lessons.translator.title}
          style={[shared.searchInput, textAlign, hasCopticLetters(text) && local.copticInput]}
        />
        {text ? (
          <Pressable onPress={() => setText('')} accessibilityRole="button" accessibilityLabel={t.clear} hitSlop={8}>
            <Text style={local.clear}>✕</Text>
          </Pressable>
        ) : null}
      </View>

      <Pressable
        onPress={() => setKeyboard((k) => !k)}
        accessibilityRole="button"
        accessibilityState={{ selected: keyboard }}
        style={({ pressed }) => [shared.controlButton, styles.toggle, keyboard && shared.controlButtonActive, pressed && shared.pressed]}>
        <Text style={[shared.controlText, keyboard && shared.controlTextActive]}>{keyboard ? t.hideKeyboard : t.keyboard}</Text>
      </Pressable>

      {keyboard ? (
        <View style={local.keyboard}>
          {[...keys, JINKIM].map((key) => (
            <View key={key} style={local.keyCell}>
              <Pressable
                onPress={() => setText((s) => s + key)}
                accessibilityRole="button"
                accessibilityLabel={key === JINKIM ? 'jinkim' : key}
                style={({ pressed }) => [local.key, pressed && shared.pressed]}>
                <Text style={local.keyText}>{key === JINKIM ? `◌${JINKIM}` : key}</Text>
              </Pressable>
            </View>
          ))}
          <View style={local.keyWide}>
            <Pressable onPress={() => setText((s) => `${s} `)} accessibilityRole="button" style={({ pressed }) => [local.key, pressed && shared.pressed]}>
              <Text style={local.keyLabel}>{t.space}</Text>
            </Pressable>
          </View>
          <View style={local.keyCell}>
            <Pressable onPress={backspace} accessibilityRole="button" accessibilityLabel="⌫" style={({ pressed }) => [local.key, pressed && shared.pressed]}>
              <Text style={local.keyLabel}>⌫</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {!query ? (
        <>
          <Text style={[styles.note, textAlign, local.about]}>{withCopticFont(t.about(count))}</Text>
          <View style={[local.chips, rowDirection]}>
            <Text style={[styles.note, local.tryLabel]}>{t.tryThese}</Text>
            {t.examples.map((example) => (
              <Pressable
                key={example}
                onPress={() => setText(example)}
                accessibilityRole="button"
                style={({ pressed }) => [local.chip, pressed && shared.pressed]}>
                <Text style={[local.chipText, hasCopticLetters(example) && local.copticInput]}>{example}</Text>
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      {meaning?.asCoptic ? (
        <>
          <Text style={[shared.subtitle, textAlign]}>{t.readAsCoptic}</Text>
          <View style={styles.card}>
            <Text style={[styles.verse, textAlign]}>{meaning.asCoptic}</Text>
          </View>
        </>
      ) : null}

      {coptic ? (
        <>
          {coptic.phrase.length ? (
            <>
              <Text style={[shared.subtitle, textAlign]}>{t.phrase}</Text>
              {coptic.phrase.map((entry, i) => entryRow(entry, `phrase-${i}`))}
            </>
          ) : null}
          {coptic.words.length > 1 || !coptic.phrase.length ? (
            <>
              {coptic.gloss ? (
                <>
                  <Text style={[shared.subtitle, textAlign]}>{t.wordForWord}</Text>
                  <View style={styles.card}>
                    <Text style={[styles.body, local.gloss, textAlign]}>{coptic.gloss}</Text>
                  </View>
                </>
              ) : null}
              {coptic.words.length > 1 ? <Text style={[shared.subtitle, textAlign]}>{t.wordByWord}</Text> : null}
              {coptic.words.map(wordCard)}
            </>
          ) : null}
          {coptic.verses.length ? (
            <>
              <Text style={[shared.subtitle, textAlign]}>{coptic.close ? t.closestInHymns : t.inHymns}</Text>
              {coptic.verses.map(verseCard)}
            </>
          ) : null}
        </>
      ) : null}

      {meaning && !meaning.asCoptic ? (
        <>
          {meaning.searchedFor ? <Text style={[styles.note, textAlign, local.showingFor]}>{t.showingFor(meaning.searchedFor)}</Text> : null}
          {meaning.matches.length ? (
            <>
              <Text style={[shared.subtitle, textAlign]}>{t.inCoptic}</Text>
              {meaning.matches.map((entry, i) => entryRow(entry, `match-${i}`))}
            </>
          ) : null}
          {meaning.bySound.length ? (
            <>
              <Text style={[shared.subtitle, textAlign]}>{t.soundsLike}</Text>
              {meaning.bySound.map((entry, i) => entryRow(entry, `sound-${i}`))}
            </>
          ) : null}
          {meaning.words.length ? (
            <>
              <Text style={[shared.subtitle, textAlign]}>{t.eachWord}</Text>
              {meaning.words.map((w) => (
                <View key={w.word}>
                  <Text style={[styles.label, textAlign]}>{w.word}</Text>
                  {w.matches.map((entry, i) => entryRow(entry, `${w.word}-${i}`))}
                </View>
              ))}
            </>
          ) : null}
          {meaning.verses.length ? (
            <>
              <Text style={[shared.subtitle, textAlign]}>{t.inHymns}</Text>
              {meaning.verses.map(verseCard)}
            </>
          ) : null}
          {!meaning.matches.length && !meaning.bySound.length && !meaning.words.length && !meaning.verses.length ? (
            <Text style={[styles.note, textAlign]}>{t.nothing}</Text>
          ) : null}
        </>
      ) : null}
    </>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    field: { marginTop: 4, marginBottom: 12 },
    copticInput: { fontFamily: copticFont, fontSize: 22 },
    clear: { fontSize: 18, color: colors.muted, paddingHorizontal: 4 },
    about: { marginTop: 0, marginBottom: 12 },
    chips: { flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 24 },
    tryLabel: { marginTop: 0 },
    chip: {
      minHeight: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.gold,
      paddingHorizontal: 14,
      justifyContent: 'center',
    },
    chipText: { fontSize: 17, color: colors.gold, fontWeight: '600' },
    keyboard: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -3, marginBottom: 16 },
    keyCell: { width: '12.5%', padding: 3 },
    keyWide: { width: '75%', padding: 3 },
    key: {
      minHeight: 44,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    keyText: { fontSize: 24, lineHeight: 32, fontFamily: copticFont, color: colors.text },
    keyLabel: { fontSize: 16, color: colors.muted, fontWeight: '600' },
    meaning: { maxWidth: '50%' },
    small: { fontSize: 13, color: colors.muted, marginTop: 2 },
    wordMeaning: { marginTop: 8, marginBottom: 0, fontWeight: '600' },
    piece: { gap: 12, alignItems: 'baseline', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border, paddingTop: 8, marginTop: 8 },
    pieceCoptic: { fontSize: 22, lineHeight: 30, fontFamily: copticFont, color: colors.text, minWidth: 64 },
    pieceAffix: { color: colors.gold },
    pieceMeaning: { flex: 1, marginBottom: 0 },
    verseMeaning: { marginTop: 10 },
    gloss: { marginBottom: 0, fontWeight: '600' },
    showingFor: { marginTop: 0, marginBottom: 4 },
    suggestion: { flexWrap: 'wrap', alignItems: 'baseline', gap: 6, marginTop: 4, minHeight: 36 },
    suggestionLabel: { marginTop: 0, marginBottom: 0 },
    suggestionCoptic: { fontSize: 22, lineHeight: 30, fontFamily: copticFont, color: colors.gold },
  });
