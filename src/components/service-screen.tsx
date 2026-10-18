import { Href, router } from 'expo-router';
import { Text } from 'react-native';

import { createAlhanStyles, goBackOrHome, openHymnPage, ScreenShell, strings } from './alhan-ui';
import { HymnList } from './lists';
import { openGroupsFrom } from './open-groups';
import { displayTitle } from '../data/arabic-titles';
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
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  const openGroups = openGroupsFrom(service, groups);
  const group = openGroups[openGroups.length - 1];
  const items = group ? (group.children ?? []) : service.hymns;
  const path = [service, ...openGroups.slice(0, -1)].map((g) => displayTitle(g, lang)).join(isRTL ? ' ‹ ' : ' › ');

  return (
    <ScreenShell
      lang={lang}
      title={displayTitle(group ?? service, lang)}
      subtitle={group ? path : chooseLabel}
      onBack={goBackOrHome}>
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
