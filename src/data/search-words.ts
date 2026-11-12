// What a search understands beyond the letters typed (2026-11-12, the owner's request after "philo" put St Philopater's
// hymns far down): the other names a saint or a hymn is known by, and words that sound the same in English letters.

// Each line is one name, every way people write it (English letters and Arabic). Typing any of them finds the others.
const NAME_GROUPS: string[][] = [
  ['philopater', 'filopater', 'philopateer', 'filobateer', 'filopateer', 'mercurius', 'merkourios', 'markorios', 'marcorius', 'abu sefein', 'abu seifein', 'abu sifein', 'abo sefein', 'abu saifain', 'abusefein', 'abuseifein', 'فيلوباتير', 'مرقوريوس', 'ابو سيفين', 'ابي سيفين'],
  ['george', 'girgis', 'gergis', 'guirguis', 'gerges', 'georgios', 'mar girgis', 'mari girgis', 'margirgis', 'جرجس', 'مارجرجس', 'جاورجيوس'],
  ['mina', 'mena', 'menas', 'marmina', 'mar mina', 'مينا', 'مارمينا'],
  ['abanoub', 'apanoub', 'abanob', 'abanoob', 'apanoup', 'ابانوب'],
  ['demiana', 'dimiana', 'damiana', 'دميانه'],
  ['mary', 'maria', 'mariam', 'maryam', 'virgin', 'theotokos', 'el adra', 'العذراء', 'مريم'],
  ['michael', 'mikhail', 'mikhael', 'michail', 'ميخائيل'],
  ['gabriel', 'ghobrial', 'gabrial', 'ghabrial', 'غبريال', 'جبرائيل'],
  ['raphael', 'rafael', 'rufail', 'روفائيل', 'رافائيل'],
  ['suriel', 'sourial', 'سوريال'],
  ['mark', 'marcos', 'markos', 'morkos', 'marqos', 'marmarkos', 'مرقس', 'مارمرقس'],
  ['john', 'yohanna', 'youhanna', 'yuhanna', 'يوحنا'],
  ['stephen', 'estefanos', 'stephanos', 'اسطفانوس'],
  ['antony', 'anthony', 'antonios', 'antonius', 'انطونيوس'],
  ['bishoy', 'pishoy', 'بيشوي'],
  ['shenouda', 'shenoute', 'شنوده'],
  ['macarius', 'makarios', 'makary', 'abu makar', 'مقار', 'مكاريوس'],
  ['athanasius', 'athanasios', 'اثناسيوس'],
  ['cyril', 'kyrillos', 'kirollos', 'kerollos', 'كيرلس'],
  ['dioscorus', 'dioscoros', 'ديسقوروس'],
  ['pachomius', 'pakhom', 'باخوميوس'],
  ['theodore', 'tadros', 'تادرس'],
  ['victor', 'boktor', 'بقطر'],
  ['takla', 'tekle', 'تكلا'],
  ['abraam', 'abram', 'ابرام'],
  ['barsoum', 'barsom', 'برسوم'],
  ['verena', 'fereena', 'فيرينا'],
  ['midnight praises', 'tasbeha', 'psalmody', 'تسبحه'],
  ['doxology', 'thoksologia', 'doksologia', 'ذكصولوجيه'],
  ['theotokia', 'theotokion', 'ثيوطوكيه', 'ثيئوطوكيه'],
  ['psali', 'ebsalia', 'absalia', 'ابصاليه'],
  ['kiahk', 'kiyahk', 'كيهك'],
  ['pascha', 'holy week', 'البصخه'],
  ['matins', 'morning incense', 'باكر'],
  ['vespers', 'evening incense', 'عشيه'],
];

// The same name however it is spelled in English letters: no vowels after the first letter, and letters that are
// written for one sound counted as one (ph f, kh k, p b, q k ...), so Philopateer is Filobater and Sifein is Sefein
export function soundKey(word: string): string {
  if (!/^[a-z]+$/.test(word)) return '';
  const w = word
    .replace(/ph/g, 'f')
    .replace(/kh|ch|q|c/g, 'k')
    .replace(/gh|j/g, 'g')
    .replace(/sh/g, 's')
    .replace(/th/g, 't')
    .replace(/p/g, 'b')
    .replace(/v/g, 'b')
    .replace(/z/g, 's')
    .replace(/[wy]/g, 'u');
  const rest = w.slice(1).replace(/[aeiou]/g, '');
  return (w[0] + rest).replace(/(.)\1+/g, '$1');
}

let groups: { members: string[]; keys: Set<string> }[] | null = null;

// The other names of the name in `words` from `at` on (one word or two), and how many words it took
export function otherNames(words: string[], at: number, fold: (s: string) => string): { names: string[]; length: number } | null {
  groups ??= NAME_GROUPS.map((g) => {
    const members = [...new Set(g.map(fold))];
    return { members, keys: new Set(members.map((m) => m.split(' ').map(soundKey).join(' '))) };
  });
  for (const length of [2, 1]) {
    if (at + length > words.length) continue;
    const typed = words.slice(at, at + length).join(' ');
    const typedKey = words.slice(at, at + length).map(soundKey).join(' ');
    const group =
      groups.find((g) => g.members.includes(typed)) ??
      (typedKey.replace(/ /g, '').length >= 3 ? groups.find((g) => g.keys.has(typedKey)) : undefined) ??
      // the start of a name, from four letters ("philo" is Philopater, so St Mercurius too)
      (length === 1 && typed.length >= 4 ? groups.find((g) => g.members.some((m) => m.startsWith(typed))) : undefined);
    if (group) return { names: [...new Set([typed, ...group.members])], length };
  }
  return null;
}
