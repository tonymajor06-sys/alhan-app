import type { AudioSource } from 'expo-audio';
import { useSyncExternalStore } from 'react';

import { bundledAudio, remoteAudioUrl } from '../data/audio';
import {
  deleteAudioFile,
  downloadAudioFile,
  downloadsSupported,
  listDownloadedFiles,
  localAudioUri,
} from './audio-file-store';

export interface DownloadState {
  downloaded: ReadonlySet<string>;
  downloading: ReadonlySet<string>;
}

const loadDownloaded = (): Set<string> => {
  try {
    return new Set(listDownloadedFiles());
  } catch {
    return new Set();
  }
};

let state: DownloadState = { downloaded: loadDownloaded(), downloading: new Set() };
const listeners = new Set<() => void>();

const setState = (patch: Partial<DownloadState>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

const without = (set: ReadonlySet<string>, file: string) => new Set([...set].filter((f) => f !== file));

// Where a recording plays from: the user's download, then the copy bundled in the app, then the internet
export function audioSourceFor(file: string): AudioSource | null {
  if (state.downloaded.has(file)) return { uri: localAudioUri(file) };
  if (bundledAudio[file] !== undefined) return bundledAudio[file];
  const url = remoteAudioUrl(file);
  return url ? { uri: url } : null;
}

// Only recordings that stream need downloading; bundled ones already work offline
export const canDownload = (file: string) =>
  downloadsSupported && bundledAudio[file] === undefined && remoteAudioUrl(file) !== null;

export async function downloadAudio(file: string): Promise<boolean> {
  const url = remoteAudioUrl(file);
  if (!url || state.downloading.has(file)) return false;
  setState({ downloading: new Set([...state.downloading, file]) });
  try {
    await downloadAudioFile(url, file);
    setState({ downloaded: new Set([...state.downloaded, file]) });
    return true;
  } catch {
    // A half-written file would fail to play later, so clear it
    try {
      deleteAudioFile(file);
    } catch {
      // nothing was written
    }
    return false;
  } finally {
    setState({ downloading: without(state.downloading, file) });
  }
}

export function removeDownload(file: string) {
  try {
    deleteAudioFile(file);
  } catch {
    // already gone
  }
  setState({ downloaded: without(state.downloaded, file) });
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useAudioDownloads(): DownloadState {
  return useSyncExternalStore(subscribe, () => state, () => state);
}
