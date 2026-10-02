// When each verse starts in a recording, in seconds, for learning mode's verse highlighting.
// One number per verse (paragraph) of the text the recording belongs to, keyed by audio file name.
// To fill one in: open the hymn, turn on Learn, tap "Mark verses" while it plays, then
// "Send verse times" and paste the numbers here.
export const verseTimings: Record<string, number[]> = {};
