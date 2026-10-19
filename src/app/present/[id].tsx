import { useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { copticFont, goBackOrHome, KeepScreenAwake, languageLabels, readerFont, strings, toVerses, Verse, withCopticFont } from '@/components/alhan-ui';
import { hymnPlainText } from '@/components/hymn-reader';
import { alhanColors } from '@/constants/alhan-colors';
import { displayTitle } from '@/data/arabic-titles';
import { LanguageType } from '@/data/hymns';
import { toArabicDigits } from '@/data/coptic-calendar';
import { allHymnSlugs, locateHymn } from '@/data/search';
import { readSetting, writeSetting } from '@/hooks/settings-storage';
import { useSettings } from '@/hooks/use-settings';

// Built for every hymn, so refreshing projector mode on the website works
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return allHymnSlugs().map((id) => ({ id }));
}

// Projector mode: one verse at a time, side-by-side columns (up to 4 languages), like Spirit & Truth.
// Always dark, whatever the phone's theme, because light text on black reads best on a projector.
const colors = alhanColors;
const preferred: LanguageType[] = ['coptic', 'english', 'arabic'];
const MAX_SHOWN = 4;
export const STORAGE_SCALE_KEY = 'projector-text-scale';
export const MIN_SCALE = 0.5;
export const MAX_SCALE = 2.5;
export const SCALE_STEP = 0.1;

export function getSavedScale(fallback: number = 1): number {
  try {
    const raw = readSetting(STORAGE_SCALE_KEY);
    if (raw) {
      const val = parseFloat(raw);
      if (!isNaN(val) && val >= MIN_SCALE && val <= MAX_SCALE) {
        return Math.round(val * 100) / 100;
      }
    }
  } catch {
    // fallback
  }
  return fallback;
}

// Fit font size so text fills each side-by-side column without overflowing the screen height
export function fitFontSize(texts: string[], colWidth: number, height: number): number {
  if (texts.length === 0) return 36;
  for (let fs = 72; fs >= 14; fs -= 2) {
    const charsPerLine = Math.max(8, Math.floor(colWidth / (fs * 0.58)));
    let fits = true;
    for (const text of texts) {
      if (!text) continue;
      const paragraphs = text.split('\n');
      let lines = 0;
      for (const p of paragraphs) {
        lines += Math.max(1, Math.ceil((p.length || 1) / charsPerLine));
      }
      const neededHeight = lines * (fs * 1.35) + 24;
      if (neededHeight > height) {
        fits = false;
        break;
      }
    }
    if (fits) return fs;
  }
  return 14;
}

export default function PresentScreen() {
  const { id, lang } = useLocalSearchParams<{ id: string; lang?: string }>();
  const settings = useSettings();
  const appLang = settings.language;
  const t = strings[appLang];
  const isRTL = appLang === 'ar';
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const hymn = id ? locateHymn(id)?.hymn : undefined;

  const [scale, setScale] = useState<number>(() => getSavedScale(1));
  const [toastText, setToastText] = useState<string | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);

  const triggerToast = useCallback((msg: string) => {
    setToastText(msg);
  }, []);

  useEffect(() => {
    if (!toastText) return;
    const timer = setTimeout(() => setToastText(null), 1500);
    return () => clearTimeout(timer);
  }, [toastText]);

  const updateScale = useCallback((updater: (prev: number) => number) => {
    setScale((prev) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(updater(prev) * 100) / 100));
      try {
        writeSetting(STORAGE_SCALE_KEY, String(next));
      } catch {}
      triggerToast(`${t.textSize}: ${Math.round(next * 100)}%`);
      return next;
    });
  }, [t.textSize, triggerToast]);

  const changeScale = useCallback((delta: number) => {
    setControlsVisible(true);
    updateScale((prev) => prev + delta);
  }, [updateScale]);

  const resetScale = useCallback(() => {
    setControlsVisible(true);
    updateScale(() => 1);
  }, [updateScale]);

  const available = languageLabels.en
    .map((l) => l.key)
    .filter((key) => hymn?.versions.some((v) => v.language === key && v.text));
  const [shown, setShown] = useState<LanguageType[]>(() => {
    const start = preferred.filter((l) => available.includes(l));
    const opened = available.find((l) => l === lang);
    if (opened && !start.includes(opened)) start.unshift(opened);
    return (start.length > 0 ? start : available).slice(0, MAX_SHOWN);
  });
  const [index, setIndex] = useState(0);

  // Shown languages in reading order: Coptic first, Arabic last
  const ordered = available.filter((l) => shown.includes(l));
  const versesBy = new Map(ordered.map((l) => [l, hymn ? toVerses(hymnPlainText(hymn, l)) : []]));
  const count = Math.max(1, ...ordered.map((l) => versesBy.get(l)?.length ?? 0));
  const current = Math.min(index, count - 1);

  const go = useCallback((step: number) => {
    setIndex((prev) => Math.max(0, Math.min(count - 1, prev + step)));
  }, [count]);

  // Clickers, keyboards, and wheel shortcuts
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) go(1);
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(e.key)) go(-1);
      else if (e.key === 'Home') setIndex(0);
      else if (e.key === 'End') setIndex(count - 1);
      else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      else if (e.key === '+' || e.key === '=' || e.key === 'Add') changeScale(SCALE_STEP);
      else if (e.key === '-' || e.key === '_' || e.key === 'Subtract') changeScale(-SCALE_STEP);
      else if (e.key === '0') resetScale();
      else if (e.key === 'Escape' && !document.fullscreenElement) goBackOrHome();
      else return;
      e.preventDefault();
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) updateScale((prev) => prev + SCALE_STEP);
        else if (e.deltaY > 0) updateScale((prev) => prev - SCALE_STEP);
      }
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, [changeScale, count, go, resetScale, updateScale]);

  // Pinch-to-zoom gesture on touch devices
  const pinch = useMemo(
    () =>
      Gesture.Pinch()
        .runOnJS(true)
        .onEnd((e) => {
          if (e.scale > 1.15) {
            changeScale(SCALE_STEP);
          } else if (e.scale < 0.85) {
            changeScale(-SCALE_STEP);
          }
        }),
    [changeScale]
  );

  // The controls fade away so only the words are on screen; any tap brings them back
  useEffect(() => {
    if (!controlsVisible) return;
    const timer = setTimeout(() => setControlsVisible(false), 4000);
    return () => clearTimeout(timer);
  }, [controlsVisible, current, shown, scale]);

  const toggleLanguage = (l: LanguageType) => {
    setControlsVisible(true);
    if (shown.includes(l)) {
      if (shown.length > 1) setShown(shown.filter((s) => s !== l));
    } else {
      if (shown.length < MAX_SHOWN) {
        setShown([...shown, l]);
      } else {
        setShown([...shown.slice(1), l]);
      }
    }
  };

  const digits = (n: number) => (isRTL ? toArabicDigits(n) : String(n));
  const verseText = (v: Verse | undefined) => (v ? [v.label, v.text].filter(Boolean).join('\n') : '');
  const texts = ordered.map((l) => verseText(versesBy.get(l)?.[current]));
  const numCols = Math.max(1, ordered.length);
  const colWidth = Math.floor((width - 32 - (numCols - 1) * 16) / numCols);
  const availHeight = height - insets.top - insets.bottom - 110;
  const baseFontSize = fitFontSize(texts, colWidth, availHeight);
  const fontSize = Math.max(12, Math.round(baseFontSize * scale));
  const lineHeight = Math.round(fontSize * 1.35);
  const speakerColor = { deacon: colors.gold, people: colors.people, priest: colors.priest };

  if (!hymn) {
    return (
      <View style={styles.root}>
        <Text style={styles.message}>{t.notFound}</Text>
      </View>
    );
  }

  return (
    <GestureDetector gesture={pinch}>
      <View style={styles.root}>
        <Head>
          <title>{`${hymn.title} · Projector | Coptic Psalmody`}</title>
          <meta name="robots" content="noindex" />
        </Head>
        <StatusBar hidden />
        <KeepScreenAwake />

        {/* The verse, side-by-side columns like Spirit & Truth */}
        <View style={[styles.stage, { paddingTop: insets.top + 64, paddingBottom: insets.bottom + 48 }]}>
          {ordered.map((l, i) => {
            const verse = versesBy.get(l)?.[current];
            if (!verse) return null;
            const arabic = l === 'arabic' || l === 'arabicCoptic' || l === 'arabicEnglish';
            return (
              <View key={l} style={[styles.column, i > 0 && styles.columnDivider]}>
                <Text
                  style={[
                    styles.verse,
                    { fontSize, lineHeight },
                    arabic && styles.rtl,
                    l === 'coptic' && styles.coptic,
                    i > 0 && l === 'english' && styles.translation,
                  ]}>
                  {verse.speaker ? (
                    <Text style={[styles.speaker, { color: speakerColor[verse.speaker], fontSize: Math.round(fontSize * 0.65) }]}>
                      {verse.label}
                      {verse.text ? '\n' : ''}
                    </Text>
                  ) : null}
                  {verse.text}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Tap the left or right side to move; the middle shows the controls */}
        <View style={[StyleSheet.absoluteFill, styles.tapZones]}>
          <Pressable style={styles.tapSide} onPress={() => go(isRTL ? 1 : -1)} accessibilityLabel={isRTL ? t.nextVerse : t.previousVerse} />
          <Pressable style={styles.tapMiddle} onPress={() => setControlsVisible(!controlsVisible)} />
          <Pressable style={styles.tapSide} onPress={() => go(isRTL ? -1 : 1)} accessibilityLabel={isRTL ? t.previousVerse : t.nextVerse} />
        </View>

        <View style={[styles.progressTrack, { bottom: insets.bottom }]} pointerEvents="none">
          <View style={[styles.progressFill, { width: `${((current + 1) / count) * 100}%` }]} />
        </View>

        {/* Floating toast notification when resizing */}
        {toastText ? (
          <View style={[styles.sizeToast, { bottom: insets.bottom + 24 }]} pointerEvents="none">
            <Text style={styles.sizeToastText}>{toastText}</Text>
          </View>
        ) : null}

        {controlsVisible ? (
          <View style={[styles.controls, { paddingTop: insets.top + 8 }]}>
            <View style={[styles.controlsRow, isRTL && styles.rowReverse]}>
              <Pressable onPress={goBackOrHome} accessibilityRole="button" style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
                <Text style={styles.buttonText}>✕ {t.exit}</Text>
              </Pressable>
              <Text style={styles.title} numberOfLines={1}>
                {withCopticFont(displayTitle(hymn, appLang))}
              </Text>
              <Text style={styles.counter}>
                {digits(current + 1)} / {digits(count)}
              </Text>
              {Platform.OS === 'web' ? (
                <Pressable onPress={toggleFullscreen} accessibilityRole="button" style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
                  <Text style={styles.buttonText}>⛶</Text>
                </Pressable>
              ) : null}
            </View>

            <View style={[styles.toolbarRow, isRTL && styles.rowReverse]}>
              <View style={[styles.controlsRow, styles.wrapRow, isRTL && styles.rowReverse]}>
                <Text style={styles.controlLabel}>{t.shownLanguages}:</Text>
                {languageLabels[appLang]
                  .filter((l) => available.includes(l.key))
                  .map((l) => {
                    const on = shown.includes(l.key);
                    return (
                      <Pressable
                        key={l.key}
                        onPress={() => toggleLanguage(l.key)}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: on }}
                        style={[styles.chip, on && styles.chipOn]}>
                        <Text style={[styles.chipText, on && styles.chipTextOn]}>{l.label}</Text>
                      </Pressable>
                    );
                  })}
              </View>

              <View style={[styles.controlsRow, styles.sizeContainer, isRTL && styles.rowReverse]}>
                <Text style={styles.controlLabel}>{t.textSize}:</Text>
                <View style={[styles.textSizeGroup, isRTL && styles.rowReverse]}>
                  <Pressable
                    onPress={() => changeScale(-SCALE_STEP)}
                    disabled={scale <= MIN_SCALE}
                    accessibilityRole="button"
                    accessibilityLabel={`${t.textSize} -`}
                    style={({ pressed }) => [
                      styles.sizeBtn,
                      pressed && styles.pressed,
                      scale <= MIN_SCALE && styles.disabled,
                    ]}>
                    <Text style={styles.sizeBtnText}>A−</Text>
                  </Pressable>
                  <View style={styles.sizeDivider} />
                  <Pressable
                    onPress={resetScale}
                    accessibilityRole="button"
                    accessibilityLabel={isRTL ? 'إعادة ضبط الحجم' : 'Reset size'}
                    style={({ pressed }) => [
                      styles.scalePill,
                      pressed && styles.pressed,
                      scale !== 1 && styles.scalePillActive,
                    ]}>
                    <Text style={[styles.scalePillText, scale !== 1 && styles.scalePillTextActive]}>
                      {Math.round(scale * 100)}%
                    </Text>
                  </Pressable>
                  <View style={styles.sizeDivider} />
                  <Pressable
                    onPress={() => changeScale(SCALE_STEP)}
                    disabled={scale >= MAX_SCALE}
                    accessibilityRole="button"
                    accessibilityLabel={`${t.textSize} +`}
                    style={({ pressed }) => [
                      styles.sizeBtn,
                      pressed && styles.pressed,
                      scale >= MAX_SCALE && styles.disabled,
                    ]}>
                    <Text style={styles.sizeBtnText}>A+</Text>
                  </Pressable>
                </View>
                {scale !== 1 ? (
                  <Pressable
                    onPress={resetScale}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.resetBtn, pressed && styles.pressed]}>
                    <Text style={styles.resetBtnText}>↺ {isRTL ? 'إعادة ضبط' : 'Reset'}</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>

            <Text style={styles.hint}>
              {Platform.OS === 'web'
                ? isRTL
                  ? 'اضغط على الجانبين أو ← → للتنقل · +/- لحجم الخط · F للشاشة الكاملة'
                  : 'Tap sides or ← → to move · +/- for text size · F for full screen'
                : isRTL
                ? 'اضغط على الجانبين للتنقل · باعد بين إصبعيك أو استخدم A- / A+ لتغيير الحجم'
                : 'Tap sides to move · Pinch or use A− / A+ for text size'}
            </Text>
          </View>
        ) : null}
      </View>
    </GestureDetector>
  );
}

function toggleFullscreen() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  else document.documentElement.requestFullscreen().catch(() => {});
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  message: { color: colors.text, fontSize: 22, textAlign: 'center', marginTop: 120 },
  stage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  column: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  columnDivider: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(217, 173, 85, 0.25)',
  },
  verse: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: readerFont,
  },
  translation: { color: '#e9dfc8' },
  coptic: { fontFamily: copticFont, fontWeight: 'normal' },
  rtl: { writingDirection: 'rtl' },
  speaker: { fontWeight: '800', letterSpacing: 0.5 },
  tapZones: { flexDirection: 'row' },
  tapSide: { flex: 1 },
  tapMiddle: { flex: 1 },
  progressTrack: { position: 'absolute', left: 0, right: 0, height: 4, backgroundColor: 'rgba(255,255,255,0.08)' },
  progressFill: { height: '100%', backgroundColor: colors.gold },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
    backgroundColor: 'rgba(14, 19, 34, 0.94)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(217, 173, 85, 0.35)',
  },
  controlsRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowReverse: { flexDirection: 'row-reverse' },
  toolbarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  wrapRow: {
    flexWrap: 'wrap',
    gap: 8,
  },
  controlLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
  },
  sizeContainer: {
    alignItems: 'center',
    gap: 8,
  },
  textSizeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  sizeBtn: {
    minHeight: 38,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  sizeBtnText: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '800',
  },
  sizeDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(217, 173, 85, 0.25)',
  },
  scalePill: {
    minHeight: 38,
    minWidth: 54,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  scalePillActive: {
    backgroundColor: 'rgba(217, 173, 85, 0.2)',
  },
  scalePillText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  scalePillTextActive: {
    color: colors.gold,
    fontWeight: '800',
  },
  resetBtn: {
    minHeight: 38,
    paddingHorizontal: 12,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
  },
  resetBtnText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  sizeToast: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'rgba(14, 19, 34, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.gold,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  sizeToastText: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.35,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
  buttonText: { color: colors.text, fontSize: 16, fontWeight: '700' },
  title: { flex: 1, color: colors.gold, fontSize: 18, fontWeight: '800', textAlign: 'center' },
  counter: { color: colors.muted, fontSize: 16, fontWeight: '700', fontVariant: ['tabular-nums'] },
  hint: { color: colors.muted, fontSize: 14, textAlign: 'center' },
  chip: {
    minHeight: 38,
    paddingHorizontal: 14,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
  },
  chipOn: { backgroundColor: colors.gold, borderColor: colors.gold },
  chipText: { color: colors.text, fontSize: 15, fontWeight: '600' },
  chipTextOn: { color: colors.onGold, fontWeight: '800' },
});
