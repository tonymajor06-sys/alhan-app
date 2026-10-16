import { Href, router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, openHymnPage, ScreenShell, strings } from './alhan-ui';
import { followStrings } from './follow-strings';
import { tapFeedback } from './haptics';
import { HymnList } from './lists';
import { openGroupsFrom } from './open-groups';
import { displayTitle } from '../data/arabic-titles';
import { PraiseKind, tonightJdn, weekdayNames, weekdayOf } from '../data/follow-along';
import { Service } from '../data/hymns';
import { useThemedStyles } from '../hooks/use-alhan-colors';
import { useSettings } from '../hooks/use-settings';

// A service's list of hymns, or the list of the innermost group opened inside it.
// Opening a group pushes the same page again with one more group, so Back and the swipe step out of it.
export function ServiceScreen({
  service,
  groups,
  chooseLabel,
  hrefWithGroups,
}: {
  service: Service;
  groups: string | undefined;
  chooseLabel: string;
  hrefWithGroups: (groups: string) => Href;
}) {
  const { language: lang } = useSettings();
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  const openGroups = openGroupsFrom(service, groups);
  const group = openGroups[openGroups.length - 1];
  const items = group ? (group.children ?? []) : service.hymns;
  const path = [service, ...openGroups.slice(0, -1)].map((g) => displayTitle(g, lang)).join(isRTL ? ' ‹ ' : ' › ');
  // Midnight and Vesper Praises open tonight's order from the calendar, straight through
  const praiseKind: PraiseKind | null = group
    ? null
    : /-midnight$/.test(service.id)
      ? 'midnight'
      : /-vesper-praises$/.test(service.id)
        ? 'vesper'
        : null;
  const night = tonightJdn();
  const nightDay = weekdayNames[lang][weekdayOf(night)];

  return (
    <ScreenShell
      lang={lang}
      title={displayTitle(group ?? service, lang)}
      subtitle={group ? path : chooseLabel}
      onBack={goBackOrHome}>
      {praiseKind ? (
        <Pressable
          onPress={() => {
            tapFeedback();
            router.push({ pathname: '/follow/[kind]', params: { kind: praiseKind } });
          }}
          accessibilityRole="button"
          style={({ pressed }) => [styles.followCard, rowDirection, pressed && styles.rowCardPressed]}>
          <Text style={styles.followCardIcon}>☾</Text>
          <View style={styles.rowTextWrap}>
            <Text style={[styles.followCardTitle, textAlign]}>{followStrings[lang].open[praiseKind]}</Text>
            <Text style={[styles.listSub, textAlign]} numberOfLines={2}>
              {isRTL
                ? followStrings.ar.night(nightDay)
                : followStrings.en.night(nightDay, weekdayNames.en[(weekdayOf(night) + 6) % 7])}
            </Text>
          </View>
          <Text style={styles.listChevron}>{isRTL ? '‹' : '›'}</Text>
        </Pressable>
      ) : null}
      {items.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{t.nothingYet}</Text>
      ) : (
        <HymnList
          hymns={items}
          onOpenHymn={(hymn) => openHymnPage(hymn.id)}
          onOpenGroup={(next) => router.push(hrefWithGroups([...openGroups, next].map((g) => g.id).join(',')))}
        />
      )}
    </ScreenShell>
  );
}
