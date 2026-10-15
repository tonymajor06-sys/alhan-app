import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Image, ImageSourcePropType, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
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
import { homeArt } from '../constants/home-art';
import { seasonArt } from '../constants/season-art';
import { saintsStrings } from '../data/saints';
import { guideStrings } from '../data/deacon-guide';
import { faithStrings } from '../data/faith-guide';
import { displayTitle } from '../data/arabic-titles';
import { titleLines } from '../data/hymn-titles';
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
import { PraiseKind, tonightJdn, weekdayNames, weekdayOf } from '../data/follow-along';
import { followStrings } from '../components/follow-strings';
import { useAlhanColors, useThemedStyles } from '../hooks/use-alhan-colors';
import { audioSourceFor, canDownload, downloadAudio, useAudioDownloads } from '../hooks/use-audio-downloads';
import { useSettings } from '../hooks/use-settings';
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
    return hymn && source ? { ...item, title: titleLines(hymn, lang).main, source } : null;
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

  // A tile in a two-column grid; `lead` is a small mark or number above the title, `coptic` a hymn's Coptic words
  // under its name, and `audio` marks a hymn with a recording
  const tile = (
    key: string,
    title: string,
    onPress: () => void,
    { lead, desc, coptic, audio, image }: { lead?: string; desc?: string; coptic?: string | null; audio?: boolean; image?: ImageSourcePropType } = {}
  ) => (
    <Pressable
      key={key}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={[title, coptic, audio ? t.hasAudio : null].filter(Boolean).join(', ')}
      style={({ pressed }) => [styles.tile, !desc && styles.tileSmall, pressed && styles.rowCardPressed]}>
      {image ? <Image source={image} style={[styles.tileImage, isRTL && { alignSelf: 'flex-end' }]} accessibilityIgnoresInvertColors /> : null}
      {lead || audio ? (
        <View style={[styles.tileTopRow, rowDirection]}>
          <Text style={styles.tileLead}>{lead}</Text>
          {audio ? <Text style={styles.tileAudio}>♪ {t.hasAudio}</Text> : null}
        </View>
      ) : null}
      <View>
        <Text style={[styles.tileTitle, textAlign]}>{withCopticFont(title)}</Text>
        {coptic ? <Text style={[styles.tileCoptic, textAlign]}>{coptic}</Text> : null}
        {desc ? <Text style={[styles.tileDesc, textAlign]}>{desc}</Text> : null}
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

  // A row in a list: a picture or number at the start, the name with a line under it, ♪ for a recording, and ›
  const listRow = (
    key: string,
    title: string,
    onPress: () => void,
    { lead, image, sub, coptic, audio }: { lead?: string; image?: ImageSourcePropType; sub?: string | null; coptic?: string | null; audio?: boolean } = {}
  ) => (
    <Pressable
      key={key}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={[title, coptic, sub, audio ? t.hasAudio : null].filter(Boolean).join(', ')}
      style={({ pressed }) => [styles.listRow, rowDirection, pressed && styles.listRowPressed]}>
      {image ? <Image source={image} style={styles.listThumb} accessibilityIgnoresInvertColors /> : null}
      {lead ? (
        <View style={styles.listLead}>
          <Text style={styles.listLeadText}>{lead}</Text>
        </View>
      ) : null}
      <View style={styles.rowTextWrap}>
        <Text style={[styles.listTitle, textAlign]}>{withCopticFont(title)}</Text>
        {coptic ? <Text style={[styles.tileCoptic, textAlign]}>{coptic}</Text> : null}
        {sub ? (
          <Text style={[styles.listSub, textAlign]} numberOfLines={2}>
            {sub}
          </Text>
        ) : null}
      </View>
      <View style={[styles.listEnd, rowDirection]}>
        {audio ? <Text style={styles.listAudio}>♪</Text> : null}
        <Text style={styles.listChevron}>{isRTL ? '‹' : '›'}</Text>
      </View>
    </Pressable>
  );

  // Rows together in one rounded panel, with a thin line between them
  const listGroup = (key: string, rows: ReactNode[]) => (
    <View key={key} style={styles.listGroup}>
      {rows.flatMap((row, i) => (i === 0 ? [row] : [<View key={`divider-${i}`} style={styles.listDivider} />, row]))}
    </View>
  );

  // Numbered in order, starting again from 1 after each section header
  const hymnList = (hymns: Hymn[], onSelect: (h: Hymn) => void) => {
    const out: ReactNode[] = [];
    let rows: ReactNode[] = [];
    let number = 0;
    const flush = (key: string) => {
      if (rows.length) out.push(listGroup(`list-${key}`, rows));
      rows = [];
    };
    for (const hymn of hymns) {
      if (hymn.isSectionHeader) {
        flush(hymn.id);
        number = 0;
        out.push(sectionHeader(hymn.id, displayTitle(hymn, lang)));
        continue;
      }
      number += 1;
      const inside = hymn.children ? flattenHymns(hymn.children) : [hymn];
      const hasAudio = inside.some((h) => h.versions.some((v) => v.audio));
      const { main, coptic } = titleLines(hymn, lang, settings.titleStyle);
      rows.push(
        listRow(hymn.id, main, () => (hymn.children ? setOpenGroups([...openGroups, hymn]) : onSelect(hymn)), {
          lead: localDigits(number),
          coptic,
          sub: hymn.children ? t.groupCount(inside.length) : null,
          audio: hasAudio,
        })
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
    // Midnight and Vesper Praises open tonight's order from the calendar, straight through
    const praiseKind: PraiseKind | null = group ? null : /-midnight$/.test(service.id) ? 'midnight' : /-vesper-praises$/.test(service.id) ? 'vesper' : null;
    const night = tonightJdn();
    const nightDay = weekdayNames[lang][weekdayOf(night)];
    return screen(
      displayTitle(group ?? service, lang),
      group ? path : chooseLabel,
      <>
        {praiseKind ? (
          <Pressable
            onPress={() => router.push({ pathname: '/follow/[kind]', params: { kind: praiseKind } })}
            accessibilityRole="button"
            style={({ pressed }) => [styles.followCard, rowDirection, pressed && styles.rowCardPressed]}>
            <Text style={styles.followCardIcon}>☾</Text>
            <View style={styles.rowTextWrap}>
              <Text style={[styles.followCardTitle, textAlign]}>{followStrings[lang].open[praiseKind]}</Text>
              <Text style={[styles.listSub, textAlign]} numberOfLines={2}>
                {isRTL ? followStrings.ar.night(nightDay) : followStrings.en.night(nightDay, weekdayNames.en[(weekdayOf(night) + 6) % 7])}
              </Text>
            </View>
            <Text style={styles.listChevron}>{isRTL ? '‹' : '›'}</Text>
          </Pressable>
        ) : null}
        {items.length === 0 ? <Text style={[styles.emptyText, textAlign]}>{t.nothingYet}</Text> : hymnList(items, onSelect)}
      </>
    );
  };

  // 1. HOME (the mini player can open a hymn straight from here)
  if (currentView === 'home') {
    return (
      <View style={styles.root}>
        <Head>
          <title>Coptic Psalmody · التسبحة القبطية</title>
          <meta
            name="description"
            content="Coptic Orthodox hymns, Tasbeha (Midnight Praises) and deacon responses in Coptic, English and Arabic, with transliteration, audio and the Coptic calendar. ألحان وتسبحة ومردات الكنيسة القبطية."
          />
        </Head>
        <ScrollView
          contentContainerStyle={[styles.homeContent, { paddingTop: insets.top + 12, paddingBottom: bottomPadding }]}>
          {/* Top header bar with title and action buttons */}
          <View style={[styles.topBar, rowDirection]}>
            <View style={[styles.heroTitleRow, rowDirection]}>
              <Image source={require('../../assets/images/coptic-cross.png')} style={styles.heroCross} accessibilityIgnoresInvertColors />
              <Text style={styles.navTitle}>{t.appTitle}</Text>
            </View>
            <View style={[styles.topButtons, rowDirection]}>
              <Pressable
                onPress={() => setCurrentView('search')}
                accessibilityRole="search"
                accessibilityLabel={t.search}
                style={({ pressed }) => [styles.searchButton, pressed && styles.rowCardPressed]}>
                <Text style={styles.searchButtonIcon}>⌕</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push('/settings')}
                accessibilityRole="button"
                accessibilityLabel={t.settings}
                style={({ pressed }) => [styles.searchButton, pressed && styles.rowCardPressed]}>
                <Text style={styles.searchButtonIcon}>⚙︎</Text>
              </Pressable>
            </View>
          </View>

          {/* Today in the church calendar */}
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

          <View style={styles.homeBody}>
            <View style={styles.hero}>
              <Text style={[styles.heroSubtitle, textAlign]}>{t.appSubtitle}</Text>
            </View>

            {tileGrid([
              { key: 'hymns', title: displayTitle(mainCategories[1], lang), desc: t.hymnsDesc, view: 'seasons-home' as const, image: homeArt.hymns },
              { key: 'responses', title: displayTitle(mainCategories[0], lang), desc: t.responsesDesc, view: 'responses-home' as const, image: homeArt.responses },
              { key: 'saints', title: saintsStrings[lang].title, desc: saintsStrings[lang].subtitle, view: null, href: '/saints' as const, image: homeArt.saints },
              { key: 'playlist', title: t.playlistTitle, desc: t.playlistDesc(playlist.length), view: 'playlist' as const, image: homeArt.playlist },
              { key: 'guide', title: guideStrings[lang].title, desc: guideStrings[lang].subtitle, view: null, href: '/guide' as const, image: homeArt.guide },
              { key: 'faith', title: faithStrings[lang].title, desc: faithStrings[lang].subtitle, view: null, href: '/faith' as const, image: homeArt.faith },
              { key: 'learn', title: learnStrings[lang].title, desc: learnStrings[lang].subtitle, view: null, href: '/learn' as const, image: homeArt.learn },
              // Learn Arabic is for English speakers
              ...(lang === 'en'
                ? [{ key: 'learn-arabic', title: learnArabicStrings.title, desc: learnArabicStrings.subtitle, view: null, href: '/learn-arabic' as const, image: homeArt.learnArabic }]
                : []),
              // Learn English is for Arabic speakers
              ...(lang === 'ar'
                ? [{ key: 'learn-english', title: learnEnglishStrings.title, desc: learnEnglishStrings.subtitle, view: null, href: '/learn-english' as const, image: homeArt.learnEnglish }]
                : []),
            ].map(({ key, title, desc, view, href, image }) =>
                tile(key, title, () => (view ? setCurrentView(view) : href && router.push(href)), { desc, image })
              )
            )}
            <Pressable
              onPress={() => router.push('/support')}
              accessibilityRole="link"
              style={({ pressed }) => [styles.supportLink, pressed && styles.pressed]}>
              <Text style={styles.supportLinkText}>{t.supportApp}</Text>
            </Pressable>
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
                    {withCopticFont(titleLines(hymn, lang, settings.titleStyle).main)}
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
            const name = titleLines(hymn, lang, settings.titleStyle);
            const matchedIn = language ? languageLabels[lang].find((l) => l.key === language)?.label : t.titleMatch;
            return (
              <Pressable
                key={hymn.id}
                onPress={() => openSearchResult(result)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.rowCard, rowDirection, pressed && styles.rowCardPressed]}>
                <View style={styles.rowTextWrap}>
                  <Text style={[styles.rowTitle, textAlign]}>{withCopticFont(name.main)}</Text>
                  {name.coptic ? <Text style={[styles.tileCoptic, textAlign]}>{name.coptic}</Text> : null}
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
    const art = seasonArt[selectedSeason.id];
    // Services named "<feast>: <service>" (the Minor Feasts of the Lord) are listed feast by feast
    const sections: { feast: string | null; services: Service[] }[] = [];
    for (const service of selectedSeason.services) {
      const feast = service.title.includes(': ') ? service.title.split(': ')[0] : null;
      const last = sections[sections.length - 1];
      if (last && last.feast === feast) last.services.push(service);
      else sections.push({ feast, services: [service] });
    }
    const serviceName = (service: Service) => {
      const name = displayTitle(service, lang);
      return name.includes(': ') ? name.split(': ').slice(1).join(': ') : name;
    };
    return screen(
      withoutNumber(displayTitle(selectedSeason, lang)),
      null,
      <>
        {art ? (
          <View style={[styles.seasonHeader, rowDirection]}>
            <Image source={art.image} style={styles.seasonHeaderImage} accessibilityIgnoresInvertColors />
            <Text style={[styles.seasonHeaderAbout, textAlign]}>{art.about[lang]}</Text>
          </View>
        ) : null}
        {sections.map(({ feast, services }, s) => (
          <View key={feast ?? `section-${s}`}>
            {feast ? sectionHeader(`feast-${feast}`, lang === 'ar' ? displayTitle(services[0], lang).split(': ')[0] : feast) : null}
            {listGroup(
              `services-${s}`,
              services.map((service, index) =>
                listRow(service.id, serviceName(service), () => setSelectedService(service), { lead: localDigits(index + 1) })
              )
            )}
          </View>
        ))}
      </>
    );
  }

  if (currentView === 'seasons-home') {
    // Small cards side by side (two on a phone, more on a wide screen): a round picture and the name
    const shortName = (season: Season) => withoutNumber(displayTitle(season, lang))
        .replace(/\s*\([^)]*\)$/, '')
        .replace(' / Standard Services', '');
    return screen(
      t.seasonsTitle,
      t.chooseSeason,
      <View style={[styles.seasonGrid, rowDirection]}>
        {seasons.map((season) => (
          <Pressable
            key={season.id}
            onPress={() => setSelectedSeason(season)}
            accessibilityRole="button"
            accessibilityLabel={[withoutNumber(displayTitle(season, lang)), seasonArt[season.id]?.about[lang]].filter(Boolean).join(', ')}
            style={({ pressed }) => [styles.seasonCard, rowDirection, pressed && styles.rowCardPressed]}>
            {seasonArt[season.id] ? (
              <Image source={seasonArt[season.id].image} style={styles.seasonCardImage} accessibilityIgnoresInvertColors />
            ) : null}
            <Text style={[styles.seasonCardTitle, textAlign]} numberOfLines={2}>
              {seasonArt[season.id]?.card?.[lang] ?? shortName(season)}
            </Text>
          </Pressable>
        ))}
      </View>
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
      listGroup(
        'deacon-services',
        selectedDeaconCategory.services.map((service, index) =>
          listRow(service.id, displayTitle(service, lang), () => setSelectedDeaconService(service), { lead: localDigits(index + 1) })
        )
      )
    );
  }

  return screen(
    t.responsesTitle,
    t.chooseCategory,
    listGroup(
      'deacon-categories',
      deaconCategories.map((cat, index) =>
        listRow(cat.id, displayTitle(cat, lang), () => setSelectedDeaconCategory(cat), { lead: localDigits(index + 1) })
      )
    )
  );
}

