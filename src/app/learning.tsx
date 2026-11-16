import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, hymnHref, ScreenShell, withCopticFont } from '@/components/alhan-ui';
import { tapFeedback } from '@/components/haptics';
import { learnBadges, serviceProgress } from '@/components/learn-badges';
import { practiceStrings } from '@/components/practice-strings';
import { titleLines } from '@/data/hymn-titles';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { currentStreak, hymnsWithStatus, LearnStatus, longestStreak, setLearnStatus, todaysReview, useLearning, usePracticeDays } from '@/hooks/use-learning';
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
  const colors = useAlhanColors();
  // The streak and badges
  const days = usePracticeDays();
  const streak = currentStreak(days);
  const best = longestStreak(days);
  const services = useMemo(() => serviceProgress(entries, lang), [entries, lang]);
  const servicesDone = services.filter((s) => s.have === s.all);
  const closest = services.filter((s) => s.have < s.all).sort((a, b) => b.have / b.all - a.have / a.all || a.all - b.all)[0];
  const badges = learnBadges(entries, best, servicesDone.length, lang);
  const header = (title: string) => (
    <View style={[styles.sectionHeader, rowDirection, { marginTop: 18, marginBottom: 10 }]}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  );

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

      {/* Days in a row */}
      <View style={[styles.rowCard, { marginBottom: 6 }]}>
        <Text style={[styles.rowTitle, textAlign]}>{streak ? p.streak(streak) : p.streakNone}</Text>
        <Text style={[styles.playlistMeta, textAlign]}>{best > 1 ? `${p.streakBest(best)} · ${p.streakHint}` : p.streakHint}</Text>
      </View>

      {review.length ? (
        <>
          {header(p.todaysReview)}
          <Text style={[styles.learnHint, textAlign, { marginBottom: 8 }]}>{review.every((r) => r.done) ? p.reviewDone : p.reviewHint}</Text>
          <View style={styles.listGroup}>{review.map((r, i) => row(r.hymnId, i, { label: p.moveToKnown, status: 'known' }, r.done))}</View>
        </>
      ) : null}

      {learning.length ? (
        <>
          {header(p.learningTitle)}
          <View style={styles.listGroup}>{learning.map((id, i) => row(id, i, { label: p.moveToKnown, status: 'known' }))}</View>
        </>
      ) : null}

      {known.length ? (
        <>
          {header(p.knownTitle)}
          <View style={styles.listGroup}>{known.map((id, i) => row(id, i, { label: p.moveToLearning, status: 'learning' }))}</View>
        </>
      ) : null}
      {header(p.badges)}
      <View style={[rowDirection, { flexWrap: 'wrap', gap: 8 }]}>
        {badges.map((b) => {
          const earned = b.have >= b.need;
          return (
            <View
              key={b.key}
              accessibilityLabel={`${b.title}${earned ? '' : `, ${p.badgeProgress(b.have, b.need)}`}`}
              style={[
                styles.chip,
                { paddingVertical: 8, alignItems: 'center', minWidth: 96 },
                earned ? { borderColor: colors.gold, backgroundColor: colors.goldSoft } : { opacity: 0.55 },
              ]}>
              <Text style={{ fontSize: 22 }}>{b.emoji}</Text>
              <Text style={[styles.chipText, { textAlign: 'center' }]}>{b.title}</Text>
              {!earned && b.need > 1 ? <Text style={[styles.playlistMeta, { textAlign: 'center' }]}>{p.badgeProgress(b.have, b.need)}</Text> : null}
            </View>
          );
        })}
      </View>

      {servicesDone.length || closest ? (
        <>
          {header(p.servicesLearnt)}
          {servicesDone.map((s) => (
            <Text key={s.name} style={[styles.listTitle, textAlign, { marginBottom: 6 }]}>
              ☩ {s.name}
            </Text>
          ))}
          {closest ? <Text style={[styles.learnHint, textAlign]}>{p.closestService(closest.name, closest.have, closest.all)}</Text> : null}
        </>
      ) : null}
    </ScreenShell>
  );
}
