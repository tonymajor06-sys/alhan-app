import { Asset } from 'expo-asset';
import { Directory, File, Paths } from 'expo-file-system';
import { Platform, Share } from 'react-native';

import { bundledAudio, remoteAudioUrl } from '../data/audio';
import { localAudioUri } from './audio-file-store';

// Sends a recording as an audio file through the share sheet (WhatsApp, Messages, Mail, Save to Files...), named after
// the hymn. The file comes from the user's download, else the copy bundled in the app, else the internet; it is put in
// the cache under the hymn's name first, so the one who receives it sees what it is.
const sendDir = new Directory(Paths.cache, 'send');

const kinds: Record<string, { mimeType: string; UTI: string }> = {
  '.mp3': { mimeType: 'audio/mpeg', UTI: 'public.mp3' },
  '.m4a': { mimeType: 'audio/mp4', UTI: 'public.mpeg-4-audio' },
};

export const fileNameFor = (title: string, file: string) => {
  const ext = file.match(/\.\w+$/)?.[0] ?? '';
  const name = title.replace(/[\\/:*?"<>|\r\n]+/g, ' ').replace(/\s+/g, ' ').trim() || file.replace(/\.\w+$/, '');
  return `${name}${ext}`;
};

// On a phone the share sheet opens straight away, so nothing needs getting ready first (see send-recording.web.ts)
export const needsPreparing = (_file: string) => false;
export const prepareRecording = async (_file: string, _title: string) => true;

// False when it could not be sent (no internet, or the phone cannot share files)
export async function sendRecording(file: string, title: string): Promise<boolean> {
  try {
    // Loaded only now: an app built before Send has no file sharing, and would fail to open if it were loaded at the start
    let Sharing: typeof import('expo-sharing') | null = null;
    try {
      Sharing = await import('expo-sharing');
      if (!(await Sharing.isAvailableAsync())) Sharing = null;
    } catch {
      Sharing = null;
    }
    sendDir.create({ idempotent: true, intermediates: true });
    const target = new File(sendDir, fileNameFor(title, file));
    if (target.exists) target.delete();
    const downloaded = new File(localAudioUri(file));
    if (downloaded.exists) {
      await downloaded.copy(target);
    } else if (bundledAudio[file] !== undefined) {
      const asset = Asset.fromModule(bundledAudio[file]);
      await asset.downloadAsync();
      if (!asset.localUri) return false;
      await new File(asset.localUri).copy(target);
    } else {
      const url = remoteAudioUrl(file);
      if (!url) return false;
      await File.downloadFileAsync(url, target, { idempotent: true });
    }
    const ext = file.match(/\.\w+$/)?.[0]?.toLowerCase() ?? '';
    if (Sharing) {
      await Sharing.shareAsync(target.uri, { ...(kinds[ext] ?? {}), dialogTitle: title });
      return true;
    }
    // Without file sharing, an iPhone's own share sheet can still send the file
    if (Platform.OS !== 'ios') return false;
    await Share.share({ url: target.uri, title });
    return true;
  } catch {
    return false;
  }
}
