// expo-file-system doesn't run on web; the browser streams recordings and caches them itself
export const downloadsSupported = false;
export const listDownloadedFiles = (): string[] => [];
export const localAudioUri = (file: string) => file;
export const downloadedFileSize = (_file: string): number => 0;
export async function downloadAudioFile(_url: string, _file: string) {}
export function deleteAudioFile(_file: string) {}
