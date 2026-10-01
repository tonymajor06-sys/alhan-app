import { Directory, File, Paths } from 'expo-file-system';

// Downloaded recordings live in the documents folder, so the system never clears them like a cache
const audioDir = new Directory(Paths.document, 'audio');

export const downloadsSupported = true;

export const listDownloadedFiles = (): string[] =>
  audioDir.exists ? audioDir.list().filter((entry) => entry instanceof File).map((f) => f.name) : [];

export const localAudioUri = (file: string) => new File(audioDir, file).uri;

export async function downloadAudioFile(url: string, file: string) {
  audioDir.create({ idempotent: true, intermediates: true });
  await File.downloadFileAsync(url, new File(audioDir, file), { idempotent: true });
}

export function deleteAudioFile(file: string) {
  const target = new File(audioDir, file);
  if (target.exists) target.delete();
}
