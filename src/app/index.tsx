import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  createAlhanStyles,
  languageLabels,
  MiniPlayer,
  openHymnPage,
  ScreenShell,
  strings,
  withCopticFont,
  withoutNumber,
} from '../components/alhan-ui';
import { learnArabicStrings, learnEnglishStrings, learnStrings } from '../components/learn-strings';
import { guideStrings } from '../data/deacon-guide';
import { faithStrings } from '../data/faith-guide';
import { displayTitle } from '../data/arabic-titles';
import {
  copticMonths,
  currentSeasonName,
  formatCopticDate,
  formatDaysUntil,
  getSeasonInfo,
  jdnToCoptic,
  kindName,
  toArabicDigits,
  tuneName,
} from '../data/coptic-calendar';
import {
  deaconCategories,
  DeaconCategory,
  flattenHymns,
  Hymn,
  mainCategories,
  Season,
  seasons,
  Service,
} from '../data/hymns';
import { searchHymns, SearchResult } from '../data/search';
import { useAlhanColors, useThemedStyles } from '../hooks/use-alhan-colors';
import { audioSourceFor, canDownload, downloadAudio, useAudioDownloads } from '../hooks/use-audio-downloads';
import { AppLanguage, updateSettings, useSettings } from '../hooks/use-settings';
import { currentTrack, playQueue, QueueTrack, setRepeat, trackKey, useAudioQueue } from '../hooks/use-audio-queue';
import {
  audioFor,
  findHymn,
  movePlaylistItem,
  PlaylistItem,
  removePlaylistItem,
  usePlaylist,
} from '../hooks/use-playlist';
import { useTodayJdn } from '../hooks/use-today';

export default function HomeScreen() {
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const insets = useSafeAreaInsets();
  const colors = useAlhanColors();
  const styles = useThemedStyles(createAlhanStyles);

  const [currentView, setCurrentView] = useState<'home' | 'responses-home' | 'seasons-home' | 'playlist' | 'search'>(
    'home'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Deacon navigation state
  const [selectedDeaconCategory, setSelectedDeaconCategory] = useState<DeaconCategory | null>(null);
  const [selectedDeaconService, setSelectedDeaconService] = useState<Service | null>(null);

  // Hymns navigation state
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  // Groups opened inside the current service (e.g. Midnight Praises > General > Doxologies), outermost first
  const [openGroups, setOpenGroups] = useState<Hymn[]>([]);

  const today = useTodayJdn();
  const seasonInfo = getSeasonInfo(today, 1);
  const todayCoptic = jdnToCoptic(today);
  const localDigits = (n: number) => (isRTL ? toArabicDigits(n) : String(n));

  // "Open hymns" on the calendar screen (and feast reminders) land here with ?season=<id>
  const { season: seasonParam, at: seasonParamAt } = useLocalSearchParams<{ season?: string; at?: string }>();
  const seasonRequest = seasonParam ? `${seasonParam}@${seasonParamAt}` : null;
  const [handledSeasonRequest, setHandledSeasonRequest] = useState<string | null>(null);
  if (seasonRequest !== handledSeasonRequest) {
    setHandledSeasonRequest(seasonRequest);
    const requested = seasons.find((s) => s.id === seasonParam);
    if (requested) {
      setSelectedDeaconService(null);
      setSelectedDeaconCategory(null);
      setSelectedService(null);
      setOpenGroups([]);
      setSelectedSeason(requested);
      setCurrentView('seasons-home');
    }
  }

  // Audio lives in a shared queue so it keeps playing after leaving the hymn or the app
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const playlist = usePlaylist();
  const downloads = useAudioDownloads();

  const toTrack = (item: PlaylistItem): QueueTrack | null => {
    const hymn = findHymn(item.hymnId);
    const file = audioFor(item);
    const source = file ? audioSourceFor(file) : null;
    return hymn && source ? { ...item, title: displayTitle(hymn, lang), source } : null;
  };

  const playPlaylist = (startIndex = 0) =>
    playQueue(
      playlist.map(toTrack).filter((t): t is QueueTrack => t !== null),
      startIndex,
      'playlist'
    );

  const downloadAll = async (files: string[]) => {
    for (const file of files) {
      if (!(await downloadAudio(file))) return Alert.alert(t.downloadFailed);
    }
  };

  // Hymns open on their own page, which has its own address and Back
  const openHymn = (hymn: Hymn) => openHymnPage(hymn.id);
  const openSearchResult = (result: SearchResult) => openHymnPage(result.hymn.id, result.language ?? undefined);

  const changeAppLanguage = (next: AppLanguage) => updateSettings({ language: next });

  // Steps back one level; returns false when already on the home screen
  const goBack = (): boolean => {
    if (openGroups.length > 0) setOpenGroups(openGroups.slice(0, -1));
    else if (selectedService) setSelectedService(null);
    else if (selectedSeason) setSelectedSeason(null);
    else if (selectedDeaconService) setSelectedDeaconService(null);
    else if (selectedDeaconCategory) setSelectedDeaconCategory(null);
    else if (currentView !== 'home') setCurrentView('home');
    else return false;
    return true;
  };

  // Android's back button steps through the lists, but only while this screen is the one showing
  const goBackRef = useRef(goBack);
  useEffect(() => {
    goBackRef.current = goBack;
  });
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => goBackRef.current());
      return () => sub.remove();
    }, [])
  );

  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  const bottomPadding = insets.bottom + 40 + (nowPlaying ? 96 : 0);

  const screen = (title: string, subtitle: string | null, children: ReactNode) => (
    <ScreenShell lang={lang} title={title} subtitle={subtitle} onBack={goBack}>
      {children}
    </ScreenShell>
  );

  // A tile in a two-column grid; `lead` is a small mark or number above the title
  const tile = (key: string, title: string, onPress: () => void, lead?: string, desc?: string, badge?: string) => (
    <Pressable
      key={key}
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.tile, !desc && styles.tileSmall, pressed && styles.rowCardPressed]}>
      {lead ? <Text style={[styles.tileLead, textAlign]}>{lead}</Text> : null}
      <View>
        <Text style={[styles.tileTitle, textAlign]}>{withCopticFont(title)}</Text>
        {desc ? <Text style={[styles.tileDesc, textAlign]}>{desc}</Text> : null}
        {badge ? (
          <View style={[styles.badge, isRTL && styles.selfEnd]}>
            <Text style={styles.badgeText}>♪ {badge}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );

  const tileGrid = (children: ReactNode) => <View style={[styles.tileGrid, rowDirection]}>{children}</View>;

  const sectionHeader = (key: string, title: string) => (
    <View key={key} style={[styles.sectionHeader, rowDirection]}>
      <Text style={styles.sectionHeaderText}>{withCopticFont(title)}</Text>
      <View style={styles.sectionLine} />
    </View>
  );

  // Two by two, numbered in order, starting again from 1 after each section header
  const hymnList = (hymns: Hymn[], onSelect: (h: Hymn) => void) => {
    const out: ReactNode[] = [];
    let tiles: ReactNode[] = [];
    let number = 0;
    const flush = (key: string) => {
      if (tiles.length) out.push(<View key={`grid-${key}`}>{tileGrid(tiles)}</View>);
      tiles = [];
    };
    for (const hymn of hymns) {
      if (hymn.isSectionHeader) {
        flush(hymn.id);
        number = 0;
        out.push(sectionHeader(hymn.id, displayTitle(hymn, lang)));
        continue;
      }
      number += 1;
      const hasAudio = (hymn.children ? flattenHymns(hymn.children) : [hymn]).some((h) =>
        h.versions.some((v) => v.audio)
      );
      tiles.push(
        tile(
          hymn.id,
          displayTitle(hymn, lang),
          () => (hymn.children ? setOpenGroups([...openGroups, hymn]) : onSelect(hymn)),
          localDigits(number),
          undefined,
          hasAudio ? t.hasAudio : undefined
        )
      );
    }
    flush('end');
    return out;
  };

  // A service's list, or the list of the innermost group opened inside it
  const serviceScreen = (service: Service, chooseLabel: string, onSelect: (h: Hymn) => void) => {
    const group = openGroups[openGroups.length - 1];
    const items = group ? (group.children ?? []) : service.hymns;
    const path = [service, ...openGroups.slice(0, -1)].map((g) => displayTitle(g, lang)).join(isRTL ? ' ‹ ' : ' › ');
    return screen(
      displayTitle(group ?? service, lang),
      group ? path : chooseLabel,
      items.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{t.nothingYet}</Text>
      ) : (
        hymnList(items, onSelect)
      )
    );
  };

  // 1. HOME (the mini player can open a hymn straight from here)
  if (currentView === 'home') {
    return (
      <View style={styles.root}>
        <Head>
          <title>Coptic Hymns & Responses · الألحان القبطية</title>
          <meta
            name="description"
            content="Coptic Orthodox hymns, Tasbeha (Midnight Praises) and deacon responses in Coptic, English and Arabic, with transliteration, audio and the Coptic calendar. ألحان وتسبحة ومردات الكنيسة القبطية."
          />
        </Head>
        <ScrollView
          contentContainerStyle={[styles.homeContent, { paddingTop: insets.top + 12, paddingBottom: bottomPadding }]}>
          {/* Today in the church calendar, with search in the corner */}
          <View style={[styles.topBar, rowDirection]}>
            <Pressable
              onPress={() => router.push('/calendar')}
              accessibilityRole="button"
              accessibilityLabel={`${formatCopticDate(today, lang)}, ${currentSeasonName(seasonInfo, lang)}`}
              accessibilityHint={t.openCalendar}
              style={({ pressed }) => [styles.calendarBox, rowDirection, pressed && styles.rowCardPressed]}>
              {/* Today's Coptic date as a calendar page */}
              <View style={styles.calendarTile}>
                <Text style={styles.calendarTileDay}>{localDigits(todayCoptic.day)}</Text>
                <Text style={styles.calendarTileMonth} numberOfLines={1}>
                  {copticMonths[lang][todayCoptic.month - 1]}
                </Text>
                <Text style={styles.calendarTileYear}>{localDigits(todayCoptic.year)}</Text>
              </View>
              <View style={styles.calendarInfo}>
                <Text
                  style={[styles.calendarSeason, textAlign, seasonInfo.current?.kind === 'fast' && { color: colors.fast }]}
                  numberOfLines={2}>
                  {currentSeasonName(seasonInfo, lang)}
                </Text>
                <Text style={[styles.calendarMeta, textAlign]} numberOfLines={1}>
                  {seasonInfo.current ? kindName[lang][seasonInfo.current.kind] : tuneName[lang][seasonInfo.tune]}
                </Text>
                {seasonInfo.upcoming[0] ? (
                  <View style={styles.calendarNext}>
                    <Text style={[styles.calendarNextText, textAlign]} numberOfLines={1}>
                      {t.next}: {seasonInfo.upcoming[0].name[lang]}
                    </Text>
                    <Text style={[styles.calendarNextWhen, textAlign]}>
                      {formatDaysUntil(seasonInfo.upcoming[0].daysUntil, lang)}
                    </Text>
                  </View>
                ) : null}
              </View>
            </Pressable>
            <Pressable
              onPress={() => setCurrentView('search')}
              accessibilityRole="search"
              accessibilityLabel={t.search}
              style={({ pressed }) => [styles.searchButton, pressed && styles.rowCardPressed]}>
              <Text style={styles.searchButtonIcon}>⌕</Text>
            </Pressable>
          </View>

          <View style={styles.homeBody}>
            <View style={styles.hero}>
              <View style={[styles.heroTitleRow, rowDirection]}>
                <Image source={require('../../assets/images/coptic-cross.png')} style={styles.heroCross} accessibilityIgnoresInvertColors />
                <Text style={[styles.heroTitle, textAlign]}>{t.appTitle}</Text>
              </View>
              <Text style={[styles.heroSubtitle, textAlign]}>{t.appSubtitle}</Text>
            </View>

            <Text style={[styles.languagePrompt, textAlign]}>{t.languagePrompt}</Text>
            <View style={styles.segmented}>
              {(['en', 'ar'] as AppLanguage[]).map((option) => (
                <Pressable
                  key={option}
                  onPress={() => changeAppLanguage(option)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: lang === option }}
                  style={[styles.segment, lang === option && styles.segmentActive]}>
                  <Text style={[styles.segmentText, lang === option && styles.segmentTextActive]}>
                    {option === 'en' ? 'English' : 'العربية'}
                  </Text>
                </Pressable>
              ))}
            </View>

            {tileGrid([
              { key: 'hymns', title: displayTitle(mainCategories[1], lang), desc: t.hymnsDesc, view: 'seasons-home' as const },
              { key: 'responses', title: displayTitle(mainCategories[0], lang), desc: t.responsesDesc, view: 'responses-home' as const },
              { key: 'playlist', title: t.playlistTitle, desc: t.playlistDesc(playlist.length), view: 'playlist' as const },
              { key: 'guide', title: guideStrings[lang].title, desc: guideStrings[lang].subtitle, view: null, href: '/guide' as const },
              { key: 'faith', title: faithStrings[lang].title, desc: faithStrings[lang].subtitle, view: null, href: '/faith' as const },
              { key: 'learn', title: learnStrings[lang].title, desc: learnStrings[lang].subtitle, view: null, href: '/learn' as const },
              // Learn Arabic is for English speakers
              ...(lang === 'en'
                ? [{ key: 'learn-arabic', title: learnArabicStrings.title, desc: learnArabicStrings.subtitle, view: null, href: '/learn-arabic' as const }]
                : []),
              // Learn English is for Arabic speakers
              ...(lang === 'ar'
                ? [{ key: 'learn-english', title: learnEnglishStrings.title, desc: learnEnglishStrings.subtitle, view: null, href: '/learn-english' as const }]
                : []),
            ].map(({ key, title, desc, view, href }) =>
                tile(key, title, () => (view ? setCurrentView(view) : href && router.push(href)), undefined, desc)
              )
            )}
          </View>
        </ScrollView>
        <MiniPlayer lang={lang} />
      </View>
    );
  }

  // PLAYLIST
  if (currentView === 'playlist') {
    const playingFromPlaylist = queue.origin === 'playlist' && nowPlaying;
    const repeatAll = queue.repeat === 'all';
    const toDownload = [
      ...new Set(playlist.map(audioFor).filter((f): f is string => !!f && canDownload(f))),
    ].filter((f) => !downloads.downloaded.has(f));
    const downloadingAny = toDownload.some((f) => downloads.downloading.has(f));
    return screen(
      t.playlistTitle,
      t.playlistDesc(playlist.length),
      playlist.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{t.playlistEmpty}</Text>
      ) : (
        <>
          <View style={[styles.audioControls, styles.playlistActions, rowDirection]}>
            <Pressable
              onPress={() => playPlaylist(0)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.controlButton, styles.playAllButton, pressed && styles.pressed]}>
              <Text style={[styles.controlText, styles.playAllText]}>{t.playAll}</Text>
            </Pressable>
            <Pressable
              onPress={() => setRepeat(repeatAll ? 'none' : 'all')}
              accessibilityRole="button"
              accessibilityState={{ selected: repeatAll }}
              style={[styles.controlButton, repeatAll && styles.controlButtonActive]}>
              <Text style={[styles.controlText, repeatAll && styles.controlTextActive]}>{t.repeatPlaylist}</Text>
            </Pressable>
          </View>
          {toDownload.length > 0 ? (
            <Pressable
              onPress={() => downloadAll(toDownload)}
              disabled={downloadingAny}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.playlistButton,
                styles.playlistDownload,
                pressed && styles.pressed,
                downloadingAny && styles.disabled,
              ]}>
              <Text style={styles.controlText}>{downloadingAny ? t.downloading : t.downloadAll}</Text>
            </Pressable>
          ) : null}
          {playlist.map((item, index) => {
            const hymn = findHymn(item.hymnId);
            if (!hymn) return null;
            const isCurrent = !!playingFromPlaylist && trackKey(playingFromPlaylist) === trackKey(item);
            const languageLabel = languageLabels[lang].find((l) => l.key === item.language)?.label;
            return (
              <View
                key={trackKey(item)}
                style={[styles.rowCard, styles.playlistRow, rowDirection, isCurrent && styles.rowCardPressed]}>
                <Pressable
                  onPress={() => playPlaylist(index)}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.rowTextWrap, pressed && styles.pressed]}>
                  <Text style={[styles.rowTitle, textAlign]}>
                    {isCurrent ? (queue.status.playing ? '♪ ' : '❚❚ ') : `${index + 1}. `}
                    {withCopticFont(displayTitle(hymn, lang))}
                  </Text>
                  <Text style={[styles.playlistMeta, textAlign]}>{languageLabel}</Text>
                </Pressable>
                <View style={[styles.playlistRowButtons, rowDirection]}>
                  <Pressable
                    onPress={() => movePlaylistItem(index, -1)}
                    disabled={index === 0}
                    accessibilityLabel={t.moveUp}
                    style={({ pressed }) => [styles.iconButton, pressed && styles.pressed, index === 0 && styles.disabled]}>
                    <Text style={styles.iconButtonText}>▲</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => movePlaylistItem(index, 1)}
                    disabled={index === playlist.length - 1}
                    accessibilityLabel={t.moveDown}
                    style={({ pressed }) => [
                      styles.iconButton,
                      pressed && styles.pressed,
                      index === playlist.length - 1 && styles.disabled,
                    ]}>
                    <Text style={styles.iconButtonText}>▼</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => removePlaylistItem(index)}
                    accessibilityLabel={t.remove}
                    style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
                    <Text style={styles.iconButtonText}>✕</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </>
      )
    );
  }

  // SEARCH (results open on top, so Back returns to the results)
  if (currentView === 'search') {
    const results = searchHymns(searchQuery);
    const hasQuery = searchQuery.trim().length >= 2;
    return screen(
      t.search,
      null,
      <>
        <View style={[styles.searchField, rowDirection]}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t.searchPlaceholder}
            placeholderTextColor={colors.muted}
            autoFocus
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            clearButtonMode="while-editing"
            accessibilityLabel={t.search}
            style={[styles.searchInput, textAlign]}
          />
        </View>
        {!hasQuery ? (
          <Text style={[styles.emptyText, textAlign]}>{t.searchHint}</Text>
        ) : results.length === 0 ? (
          <Text style={[styles.emptyText, textAlign]}>{t.noResults}</Text>
        ) : (
          results.map((result) => {
            const { hymn, location, language } = result;
            const where = `${withoutNumber(displayTitle(location.group, lang))} › ${displayTitle(location.service, lang)}`;
            const matchedIn = language ? languageLabels[lang].find((l) => l.key === language)?.label : t.titleMatch;
            return (
              <Pressable
                key={hymn.id}
                onPress={() => openSearchResult(result)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.rowCard, rowDirection, pressed && styles.rowCardPressed]}>
                <View style={styles.rowTextWrap}>
                  <Text style={[styles.rowTitle, textAlign]}>{withCopticFont(displayTitle(hymn, lang))}</Text>
                  <Text style={[styles.playlistMeta, textAlign]} numberOfLines={1}>
                    {where} · {matchedIn}
                  </Text>
                  {result.snippet ? (
                    <Text
                      style={[styles.searchSnippet, language === 'arabic' ? styles.arabicText : textAlign]}
                      numberOfLines={2}>
                      {result.snippet}
                    </Text>
                  ) : null}
                </View>
                <Text style={styles.chevron}>{isRTL ? '‹' : '›'}</Text>
              </Pressable>
            );
          })
        )}
      </>
    );
  }

  // 3. HYMNS FLOW
  if (selectedService) {
    return serviceScreen(selectedService, t.chooseHymn, openHymn);
  }

  if (selectedSeason) {
    return screen(
      displayTitle(selectedSeason, lang),
      t.chooseService,
      tileGrid(
        selectedSeason.services.map((service, index) =>
          tile(service.id, displayTitle(service, lang), () => setSelectedService(service), localDigits(index + 1))
        )
      )
    );
  }

  if (currentView === 'seasons-home') {
    return screen(
      t.seasonsTitle,
      t.chooseSeason,
      tileGrid(
        seasons.map((season, index) =>
          tile(season.id, withoutNumber(displayTitle(season, lang)), () => setSelectedSeason(season), localDigits(index + 1))
        )
      )
    );
  }

  // 4. DEACON RESPONSES FLOW
  if (selectedDeaconService) {
    return serviceScreen(selectedDeaconService, t.chooseResponse, openHymn);
  }

  if (selectedDeaconCategory) {
    return screen(
      displayTitle(selectedDeaconCategory, lang),
      t.chooseService,
      tileGrid(
        selectedDeaconCategory.services.map((service, index) =>
          tile(service.id, displayTitle(service, lang), () => setSelectedDeaconService(service), localDigits(index + 1))
        )
      )
    );
  }

  return screen(
    t.responsesTitle,
    t.chooseCategory,
    tileGrid(
      deaconCategories.map((cat, index) =>
        tile(cat.id, displayTitle(cat, lang), () => setSelectedDeaconCategory(cat), localDigits(index + 1))
      )
    )
  );
}

