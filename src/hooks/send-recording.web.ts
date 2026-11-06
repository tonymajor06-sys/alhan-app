// On the website: phones get the share sheet with the recording as a file (WhatsApp, Messages, Save to Files...);
// where the browser cannot share files (most computers), it is downloaded instead. The site sends the file from its
// own address (worker/index.ts, /download/), so the browser may read it.
export const fileNameFor = (title: string, file: string) => {
  const ext = file.match(/\.\w+$/)?.[0] ?? '';
  const name = title.replace(/[\\/:*?"<>|\r\n]+/g, ' ').replace(/\s+/g, ' ').trim() || file.replace(/\.\w+$/, '');
  return `${name}${ext}`;
};

const downloadUrl = (file: string, name: string) => `/download/${encodeURIComponent(file)}?name=${encodeURIComponent(name)}`;

export async function sendRecording(file: string, title: string): Promise<boolean> {
  const name = fileNameFor(title, file);
  const canShareFiles =
    typeof navigator !== 'undefined' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [new File([], name, { type: 'audio/mpeg' })] });
  if (!canShareFiles) {
    window.location.href = downloadUrl(file, name);
    return true;
  }
  try {
    const response = await fetch(downloadUrl(file, name));
    if (!response.ok) return false;
    const blob = await response.blob();
    const type = /\.mp3$/i.test(file) ? 'audio/mpeg' : 'audio/mp4';
    await navigator.share({ files: [new File([blob], name, { type })], title });
    return true;
  } catch (error) {
    // Closing the share sheet is not a failure
    return error instanceof Error && error.name === 'AbortError';
  }
}
