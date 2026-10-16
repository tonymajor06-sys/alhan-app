import { Alert, Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, openHymnPage, ScreenShell, withCopticFont } from '@/components/alhan-ui';
import { tapFeedback } from '@/components/haptics';
import { ListGroup } from '@/components/lists';
import { titleLines } from '@/data/hymn-titles';
import { deaconCategories, flattenHymns, Hymn, seasons } from '@/data/hymns';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { downloadSize, removeDownload, useAudioDownloads } from '@/hooks/use-audio-downloads';
import { AppLanguage, useSettings } from '@/hooks/use-settings';

const downloadsStrings: Record<
  AppLanguage,
  {
    title: string;
    subtitle: (count: number, size: string) => string;
    empty: string;
    removeAll: string;
    removeAllConfirm: string;
    cancel: string;
    remove: string;
    unknown: string;
  }
> = {
  en: {
    title: 'Downloaded recordings',
    subtitle: (count, size) => `${count} ${count === 1 ? 'recording' : 'recordings'} · ${size} on this phone`,
    empty: 'Nothing downloaded yet. On a hymn, tap “Save offline”, or download a whole season from its page.',
    removeAll: 'Remove all downloads',
    removeAllConfirm: 'Remove every downloaded recording? They will stream again when you are online.',
    cancel: 'Cancel',
    remove: 'Remove',
    unknown: 'Recording',
  },
  ar: {
    title: 'التسجيلات المحفوظة',
    subtitle: (count, size) => `${count} تسجيل · ${size} على هذا الهاتف`,
    empty: 'لا يوجد شيء محفوظ بعد. اضغط «حفظ بدون إنترنت» في أي لحن، أو نزّل مناسبة كاملة من صفحتها.',
    removeAll: 'حذف كل التسجيلات المحفوظة',
    removeAllConfirm: 'حذف كل التسجيلات المحفوظة؟ ستعمل من الإنترنت مرة أخرى عند الاتصال.',
    cancel: 'إلغاء',
    remove: 'حذف',
    unknown: 'تسجيل',
  },
};

const formatBytes = (bytes: number) =>
  bytes >= 1024 * 1024 * 1024
    ? `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`
    : `${Math.max(0.1, bytes / 1024 / 1024).toFixed(1)} MB`;

// Which hymn a recording belongs to, so the list can show its name
let hymnsByFile: Map<string, Hymn> | null = null;
const hymnForFile = (file: string): Hymn | undefined => {
  if (!hymnsByFile) {
    hymnsByFile = new Map();
    for (const group of [...seasons, ...deaconCategories]) {
      for (const service of group.services) {
        for (const hymn of flattenHymns(service.hymns)) {
          for (const v of hymn.versions) {
            for (const f of [v.audio, ...(v.otherAudio ?? [])]) if (f && !hymnsByFile.has(f)) hymnsByFile.set(f, hymn);
          }
        }
      }
    }
  }
  return hymnsByFile.get(file);
};

// Every recording saved for offline, with its size, so space can be freed
export default function DownloadsScreen() {
  const settings = useSettings();
  const lang = settings.language;
  const t = downloadsStrings[lang];
  const styles = useThemedStyles(createAlhanStyles);
  const isRTL = lang === 'ar';
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const downloads = useAudioDownloads();

  const files = [...downloads.downloaded].map((file) => ({ file, size: downloadSize(file), hymn: hymnForFile(file) }));
  files.sort((a, b) => b.size - a.size);
  const total = files.reduce((sum, f) => sum + f.size, 0);

  const removeAll = () =>
    Alert.alert(t.removeAll, t.removeAllConfirm, [
      { text: t.cancel, style: 'cancel' },
      { text: t.remove, style: 'destructive', onPress: () => files.forEach((f) => removeDownload(f.file)) },
    ]);

  return (
    <ScreenShell lang={lang} title={t.title} subtitle={files.length ? t.subtitle(files.length, formatBytes(total)) : null} onBack={goBackOrHome}>
      {files.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{t.empty}</Text>
      ) : (
        <>
          <ListGroup
            rows={files.map(({ file, size, hymn }) => (
              <View key={file} style={[styles.listRow, rowDirection]}>
                <Pressable
                  onPress={() => {
                    if (!hymn) return;
                    tapFeedback();
                    openHymnPage(hymn.id);
                  }}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.rowTextWrap, pressed && styles.pressed]}>
                  <Text style={[styles.listTitle, textAlign]} numberOfLines={2}>
                    {hymn ? withCopticFont(titleLines(hymn, lang, settings.titleStyle).main) : t.unknown}
                  </Text>
                  <Text style={[styles.listSub, textAlign]}>{formatBytes(size)}</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    tapFeedback();
                    removeDownload(file);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={t.remove}
                  style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
                  <Text style={styles.iconButtonText}>✕</Text>
                </Pressable>
              </View>
            ))}
          />
          <Pressable
            onPress={removeAll}
            accessibilityRole="button"
            style={({ pressed }) => [styles.playlistButton, styles.playlistDownload, pressed && styles.pressed]}>
            <Text style={styles.controlText}>{t.removeAll}</Text>
          </Pressable>
        </>
      )}
    </ScreenShell>
  );
}
