// On the website: phones get the share sheet with the recording as a file (WhatsApp, Messages, Save to Files...);
// where the browser cannot share files (most computers), it is downloaded instead. The site sends the file from its
// own address (worker/index.ts, /download/), so the browser may read it.
// A browser only opens the share sheet straight after a tap, and fetching a recording takes longer than it allows,
// so on the website Send takes two taps: the first gets the recording ready, the second (Send now) shares it.
export const fileNameFor = (title: string, file: string) => {
  const ext = file.match(/\.\w+$/)?.[0] ?? '';
  const name = title.replace(/[\\/:*?"<>|\r\n]+/g, ' ').replace(/\s+/g, ' ').trim() || file.replace(/\.\w+$/, '');
  return `${name}${ext}`;
};

const downloadUrl = (file: string, name: string) => `/download/${encodeURIComponent(file)}?name=${encodeURIComponent(name)}`;

const sharesFiles = () => {
  try {
    return (
      typeof navigator !== 'undefined' &&
      typeof navigator.canShare === 'function' &&
      navigator.canShare({ files: [new File([], 'recording.mp3', { type: 'audio/mpeg' })] })
    );
  } catch {
    return false;
  }
};

// Recordings fetched and ready to share, by file
const ready = new Map<string, File>();

// Whether Send must first get this recording ready (the website, when it is not ready yet)
export const needsPreparing = (file: string) => sharesFiles() && !ready.has(file);

export async function prepareRecording(file: string, title: string): Promise<boolean> {
  try {
    const name = fileNameFor(title, file);
    const response = await fetch(downloadUrl(file, name));
    if (!response.ok) return false;
    const blob = await response.blob();
    ready.set(file, new File([blob], name, { type: /\.mp3$/i.test(file) ? 'audio/mpeg' : 'audio/mp4' }));
    return true;
  } catch {
    return false;
  }
}

export async function sendRecording(file: string, title: string): Promise<boolean> {
  const name = fileNameFor(title, file);
  const prepared = ready.get(file);
  if (!sharesFiles() || !prepared) {
    window.location.href = downloadUrl(file, name);
    return true;
  }
  try {
    // called straight from the tap, so the browser allows it
    await navigator.share({ files: [prepared], title });
    return true;
  } catch (error) {
    // Closing the share sheet is not a failure
    return error instanceof Error && error.name === 'AbortError';
  }
}
