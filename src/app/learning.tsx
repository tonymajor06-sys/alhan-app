import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, hymnHref, ScreenShell, withCopticFont } from '@/components/alhan-ui';
import { tapFeedback } from '@/components/haptics';
import { practiceStrings } from '@/components/practice-strings';
import { titleLines } from '@/data/hymn-titles';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { hymnsWithStatus, LearnStatus, setLearnStatus, todaysReview, useLearning } from '@/hooks/use-learning';
import { findHymn } from '@/hooks/use-playlist';
import { useSettings } from '@/hooks/use-settings';

// My hymns to learn: today's review (a few Learning hymns, the ones practised longest ago), then every hymn being
// learnt and every one learnt. A hymn opens with Learn on; playing it there ticks it off today's review.
export default function LearningScreen() {
  const settings = useSettings();
  const lang = settings.language;
  const p = practiceStrings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const entries = useLearning();
  const review = todaysReview(entries).filter((r) => findHymn(r.hymnId));
  const learning = hymnsWithStatus(entries, 'learning').filter((id) => findHymn(id));
  const known = hymnsWithStatus(entries, 'known').filter((id) => findHymn(id));

  const open = (id: string) => router.push({ ...hymnHref(id), params: { ...hymnHref(id).params, learn: '1' } });

  const row = (id: string, i: number, end: { label: string; status: LearnStatus | null }, done?: boolean) => {
    const hymn = findHymn(id)!;
    const { main, coptic } = titleLines(hymn, lang, settings.titleStyle);
    return (
      <View key={id}>
        {i > 0 ? <View style={styles.listDivider} /> : null}
        <View style={[styles.listRow, rowDirection]}>
          <Pressable
            onPress={() => open(id)}
            accessibilityRole="button"
            accessibilityState={done === undefined ? undefined : { checked: done }}
            style={({ pressed }) => [styles.rowTextWrap, pressed && styles.pressed]}>
            <Text style={[styles.listTitle, textAlign]}>
              {done === undefined ? '' : done ? '✓ ' : '○ '}
              {withCopticFont(main)}
            </Text>
            {coptic ? <Text style={[styles.tileCoptic, textAlign]}>{coptic}</Text> : null}
          </Pressable>
          <Pressable
            onPress={() => {
              tapFeedback();
              setLearnStatus(id, end.status);
            }}
            accessibilityRole="button"
            accessibilityLabel={`${end.label}: ${main}`}
            hitSlop={8}
            style={({ pressed }) => [styles.chip, styles.chipSmall, pressed && styles.pressed]}>
            <Text style={styles.chipText}>{end.label}</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <ScreenShell lang={lang} title={p.learnList} subtitle={p.learnListDesc(learning.length, known.length)} onBack={goBackOrHome}>
      {learning.length === 0 && known.length === 0 ? <Text style={[styles.emptyText, textAlign]}>{p.learnEmpty}</Text> : null}

      {review.length ? (
        <>
          <Text style={[styles.sectionHeaderText, textAlign, { marginTop: 18, marginBottom: 10 }]}>{p.todaysReview}</Text>
          <Text style={[styles.learnHint, textAlign, { marginBottom: 8 }]}>{review.every((r) => r.done) ? p.reviewDone : p.reviewHint}</Text>
          <View style={styles.listGroup}>{review.map((r, i) => row(r.hymnId, i, { label: p.moveToKnown, status: 'known' }, r.done))}</View>
        </>
      ) : null}

      {learning.length ? (
        <>
          <Text style={[styles.sectionHeaderText, textAlign, { marginTop: 18, marginBottom: 10 }]}>{p.learningTitle}</Text>
          <View style={styles.listGroup}>{learning.map((id, i) => row(id, i, { label: p.moveToKnown, status: 'known' }))}</View>
        </>
      ) : null}

      {known.length ? (
        <>
          <Text style={[styles.sectionHeaderText, textAlign, { marginTop: 18, marginBottom: 10 }]}>{p.knownTitle}</Text>
          <View style={styles.listGroup}>{known.map((id, i) => row(id, i, { label: p.moveToLearning, status: 'learning' }))}</View>
        </>
      ) : null}
    </ScreenShell>
  );
}
