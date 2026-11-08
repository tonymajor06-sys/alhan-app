# Spirit & Truth's wording for every hymn verse the app shares with it (see README.md).
#   python3 -I scripts/st-wording/build.py <hymns.json from dump.mjs> captures/st-wording
# writes src/data/st-wording.ts: for each hymn (by id), the verses whose English or Arabic differ in words from Spirit &
# Truth's for the same Coptic, with Spirit & Truth's in their place (and the Arabic in English letters to match).
import difflib, glob, json, os, re, sys, unicodedata
from collections import Counter, defaultdict

HYMNS, CAPTURES = sys.argv[1], sys.argv[2]
OUT = 'src/data/st-wording.ts'


# ---- Spirit & Truth's rows, read from its window: "|||" between a row's languages, "=====" between rows ----
def script(s):
    c = sum(1 for ch in s if 'Ⲁ' <= ch <= '⳿' or 'Ϣ' <= ch <= 'ϯ')
    a = sum(1 for ch in s if '؀' <= ch <= 'ۿ')
    l = sum(1 for ch in s if ch.isascii() and ch.isalpha())
    if c and c >= a and c >= l / 3: return 'cop'
    if a and a >= l: return 'ar'
    return 'en' if l else None


def clean(s): return re.sub(r'[‪-‮‎‏]', '', s).strip()


def ncop(s):
    s = unicodedata.normalize('NFD', s)
    s = ''.join(ch for ch in s if not unicodedata.category(ch).startswith('M'))
    s = s.lower().replace('⳪', 'ⲡϭⲥ')
    return re.sub(r'[^Ⲁ-⳿Ϣ-ϯ]', '', s)


pages = []
for path in sorted(glob.glob(os.path.join(CAPTURES, '*.txt'))):
    rows = []
    for piece in open(path, encoding='utf8').read().split('\n=====\n'):
        if not piece.startswith('|||'): continue  # titles and buttons
        row = {}
        for cell in (clean(x) for x in piece.split('|||')):
            k = cell and script(cell)
            if k and k not in row: row[k] = cell
        if any('•' in x or '\n+ ' in x for x in row.values()): continue  # rows the window ran together
        if 'cop' in row: rows.append(row)
    pages.append(rows)

single = {}
seqs = []
for rows in pages:
    s, bounds = '', []
    for r in rows:
        n = ncop(r['cop'])
        single.setdefault(n, r)
        bounds.append((len(s), len(s) + len(n), r))
        s += n
    seqs.append((s, {b[0]: k for k, b in enumerate(bounds)}, {b[1]: k for k, b in enumerate(bounds)}, bounds))


def find(n):
    """Spirit & Truth's rows that hold exactly this Coptic (one row, or several in a row)"""
    if n in single: return [single[n]]
    if len(n) < 12: return None
    for s, starts, ends, bounds in seqs:
        i = s.find(n)
        while i >= 0:
            if i in starts and i + len(n) in ends: return [b[2] for b in bounds[starts[i]:ends[i + len(n)] + 1]]
            i = s.find(n, i + 1)
    return None


# ---- comparing ----
NUM = re.compile(r'^(\+ )?(\([0-9٠-٩]+/[0-9٠-٩]+\) ?)?')


def split(text): return text.split('\n\n')


def body(v):
    m = NUM.match(v)
    return m.group(0), v[m.end():]


def words_en(s): return re.findall(r"[a-z0-9']+", s.lower().replace('’', "'"))


def nar(s):
    s = re.sub(r'[ً-ْـٰ]', '', s)
    s = s.translate(str.maketrans('أإآىة٠١٢٣٤٥٦٧٨٩', 'ااايه0123456789'))
    return re.findall(r'\w+', s)


hymns = json.load(open(HYMNS, encoding='utf8'))
# Spirit & Truth verses not to use: run together or misspelt in its window (checked by hand)
SKIP = set(json.load(open('scripts/st-wording/skip.json', encoding='utf8')))
uniq_rows = list({(r.get('en'), r['cop'], r.get('ar')): r for rows in pages for r in rows}.values())
st_en_words = Counter(w for r in uniq_rows for w in words_en(r.get('en', '')))
app_en_words = Counter(w for h in hymns for w in words_en(h['v'].get('english', '')))


st_ar_words = Counter(w for r in uniq_rows for w in nar(r.get('ar', '')))
app_ar_words = Counter(w for h in hymns for w in nar(h['v'].get('arabic', '')))


def key_en(t):
    w = words_en(t)
    return w[0] if w else ''


def key_ar(t):
    w = nar(t)
    return w[0] if w else ''


def merge(old, new, lang):
    """Spirit & Truth's verse, except where it misspelt a word the app has right (its word is rare in Spirit & Truth,
    the app's common, and the two nearly the same: "Allelluia", "السلا") or dropped a number the app has"""
    key, st_count, app_count = (key_en, st_en_words, app_en_words) if lang == 'en' else (key_ar, st_ar_words, app_ar_words)
    a, b = old.split(' '), new.split(' ')
    ka, kb = [key(t) for t in a], [key(t) for t in b]
    out, kept = [], 0
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, ka, kb, autojunk=False).get_opcodes():
        if tag == 'replace' and i2 - i1 == j2 - j1:
            for o, n, ko, kn in zip(a[i1:i2], b[j1:j2], ka[i1:i2], kb[j1:j2]):
                typo = ko and kn and difflib.SequenceMatcher(None, ko, kn).ratio() >= 0.6 and st_count[kn] <= 2 and app_count[ko] >= 3 and st_count[ko] >= 3
                if typo: kept += 1
                out.append(o if typo else n)
        elif tag == 'delete' and (i2 == len(a) or all(re.fullmatch(r'[0-9\u0660-\u0669]+', k) for k in ka[i1:i2])):
            # a number Spirit & Truth dropped, or the verse's last words, which its window put in the next row
            out += a[i1:i2]; kept += 1
        elif tag == 'insert' and j1 == 0 and re.search(r'[.:"\u201d\u00bb]$', b[j2 - 1]):
            kept += 1  # the end of the verse before, which its window put in this row
        elif tag != 'delete': out += b[j1:j2]
    return ' '.join(out), kept


# A feast's own words (for You were baptized, have risen...) where the app's Coptic has the everyday ones: kept
SEASONAL = re.compile(r"\b(baptized|risen|rose|born|crucified|ascended|transfigured)\b|اعتمد|إعتمد|قمت|قام|ولدت|وُلد|ولد|صلبت|صُلبت|صعدت|تجليت", re.I)


def seasonal_loss(old, new):
    return any(w not in SEASONAL.findall(new) for w in SEASONAL.findall(old)) if SEASONAL.search(old) else False


INSTRUCTION = re.compile(r'^\([^()]{3,80}\):? ?')


# Arabic word -> its spelling in English letters, learned from the app's own verses whose words line up one to one
def ar_tokens(s): return re.findall(r'[؀-ۿݐ-ݿ0-9]+', s)


def lat_tokens(s): return re.findall(r"[A-Za-z0-9'\-]+", s)


ar2lat = defaultdict(Counter)


def skeleton(latin):
    s = latin.lower().replace('sh', 'S').replace('th', 'T').replace('kh', 'K').replace('gh', 'G').replace('dh', 'D')
    s = re.sub(r"^(el|al|wal|wa|bil|lil|fil|li|bi|fa|ka)-", '', s)
    return re.sub(r"[aeiou'\-y w]", '', s)


def plausible(ar, latin):
    """Do the Arabic word and these English letters sound alike (their consonants, roughly)?"""
    a, b = skeleton(spell(ar)), skeleton(latin)
    if not a or not b: return a == b
    return a[0] == b[0] and difflib.SequenceMatcher(None, a, b).ratio() >= 0.6


def akey(word):
    w = re.sub(r'[\u064b-\u0652\u0640\u0670]', '', word)
    return w.translate(str.maketrans('أإآى', 'اااي'))


def lat_of(word):
    c = ar2lat.get(akey(word))
    if not c: return None
    # the commonest spelling, preferring the one used inside a verse (lower case unless it is a name)
    return c.most_common(1)[0][0]


FAIL = Counter()
UNKNOWN = Counter()


LETTERS = dict(zip('بتثجحخدذرزسشصضطظعغفقكلمنهءئؤ', 'b t th g h kh d dh r z s sh s d t z \' gh f q k l m n h \' \' \''.split(' ')))


def spell(word):
    """A word the app has never written in English letters, spelt out by rule (g for ج, ' for ع)"""
    w = re.sub(r'[^\u0621-\u0652]', '', word)
    pre = ''
    if w.startswith('و') and len(w) > 3: pre, w = 'wa-', w[1:]
    if w.startswith('ال') and len(w) > 3: pre, w = pre + 'el-', w[2:]
    out, i = '', 0
    while i < len(w):
        ch = w[i]; nx = w[i + 1] if i + 1 < len(w) else ''
        if ch in LETTERS:
            out += LETTERS[ch]
            if nx == '\u0651': out += LETTERS[ch]; i += 1; nx = w[i + 1] if i + 1 < len(w) else ''
            if nx and nx in '\u064e\u0650\u064f': out += {'\u064e': 'a', '\u0650': 'i', '\u064f': 'u'}[nx]; i += 1
            elif nx and nx not in 'اويىة\u0652' and i + 1 < len(w): out += 'a'
        elif ch in 'اأآ': out += 'a' if i else ('a' if ch != 'آ' else 'aa')
        elif ch == 'إ': out += 'i'
        elif ch == 'و': out += 'w' if i == 0 else 'ou'
        elif ch == 'ي': out += 'y' if i == 0 else 'ee'
        elif ch in 'ىة': out += 'a'
        i += 1
    return pre + re.sub(r'aa+', 'aa', out)


for h in hymns:
    ar, la = h['v'].get('arabic'), h['v'].get('englishArabic')
    if not ar or not la: continue
    av, lv = split(ar), split(la)
    if len(av) != len(lv): continue
    for a, l in zip(av, lv):
        at, lt = ar_tokens(body(a)[1]), lat_tokens(body(l)[1])
        if len(at) == len(lt):
            for k, (x, y) in enumerate(zip(at, lt)):
                if not plausible(x, y): continue
                if k == 0: y = re.sub(r'^(\'?)([A-Z])', lambda m: m.group(1) + m.group(2).lower(), y)
                ar2lat[akey(x)][y] += 1


def write_out(new_ar):
    """The whole verse in English letters, word by word in the app's commonest spellings"""
    text = ''
    for piece in re.split(r'([\u0600-\u06ff\u0750-\u077f0-9]+)', new_ar):
        if re.fullmatch(r'[\u0600-\u06ff\u0750-\u077f0-9]+', piece):
            w = lat_of(piece) or spell(piece)
            text += (w[0].upper() + w[1:]) if not text.strip() and w else w
        else:
            text += piece.translate(str.maketrans('،؛؟', ',;?'))
    return re.sub(r'\s+', ' ', text).strip()


WRITTEN = json.load(open('scripts/st-wording/arabic-english.json', encoding='utf8')) if os.path.exists('scripts/st-wording/arabic-english.json') else {}
TO_WRITE = {}


def patch_latin(latin, old_ar, new_ar):
    """The Arabic in English letters for Spirit & Truth's Arabic: written for the app (arabic-english.json), else the
    app's own with the changed words written over (None if that cannot be done safely: it is then to be written)"""
    if new_ar in WRITTEN: return WRITTEN[new_ar]
    p = patch_latin_in_place(latin, old_ar, new_ar)
    if p is None: TO_WRITE[new_ar] = latin
    return p


def patch_latin_in_place(latin, old_ar, new_ar):
    if ''.join(nar(old_ar)) == ''.join(nar(new_ar)): return latin
    a, b = ar_tokens(old_ar), ar_tokens(new_ar)
    na, nb = [tuple(nar(x)) for x in a], [tuple(nar(x)) for x in b]
    if na == nb: return latin
    la = lat_tokens(latin)
    ops = difflib.SequenceMatcher(None, na, nb, autojunk=False).get_opcodes()
    if len(la) == len(a):
        # one English-letters word for each Arabic word: write the new words in their places
        res = []
        for tag, i1, i2, j1, j2 in ops:
            if tag == 'equal': res += la[i1:i2]
            else:
                for w in b[j1:j2]:
                    l = lat_of(w)
                    if not l: return None
                    res.append(l)
        text, k = '', 0
        for piece in re.split(r'([\u0600-\u06ff\u0750-\u077f0-9]+)', new_ar):
            if re.fullmatch(r'[\u0600-\u06ff\u0750-\u077f0-9]+', piece):
                if k >= len(res): return None
                w = res[k]; k += 1
                text += (w[0].upper() + w[1:]) if not text.strip() else w
            else:
                text += piece.translate(str.maketrans('،؛؟', ',;?'))
        return text if k == len(res) else None
    # otherwise find each changed word's English letters in the verse and write the new ones over them
    text = latin
    for tag, i1, i2, j1, j2 in ops:
        if tag == 'equal': continue
        olds = [lat_of(w) for w in a[i1:i2]]
        news = [lat_of(w) for w in b[j1:j2]]
        if None in news:
            FAIL['unknown new word'] += 1; UNKNOWN.update(w for w, l in zip(b[j1:j2], news) if l is None); return None
        if tag == 'insert':
            prev = lat_of(a[i1 - 1]) if i1 else None
            m = prev and re.search(r'(?i)\b' + re.escape(prev) + r'\b', text)
            if not m: FAIL['insert: word before not found'] += 1; return None
            text = text[:m.end()] + ' ' + ' '.join(news) + text[m.end():]
            continue
        if None in olds: FAIL['unknown old word'] += 1; return None
        pat = r'(?i)\b' + r'[\s,.;:]+'.join(re.escape(o) for o in olds) + r'\b'
        m = re.search(pat, text)
        if not m: FAIL['old words not found'] += 1; return None
        text = text[:m.start()] + ' '.join(news) + text[m.end():]
    text = re.sub(r'\s+', ' ', text).strip()
    return text[0].upper() + text[1:] if text else text


# ---- verses whose Coptic Spirit & Truth spells otherwise (a letter or two in a word) ----
grams = defaultdict(set)
all_rows = [r for rows in pages for r in rows]
row_norm = [ncop(r['cop']) for r in all_rows]
for k, n in enumerate(row_norm):
    for j in range(max(1, len(n) - 4)): grams[n[j:j + 5]].add(k)


def cwords(s):
    """A verse's Coptic words, without the marks over the letters; an abbreviation (written with a line over it, or ⳪)
    is marked with a * so it is not taken for a misspelling"""
    out = []
    for w in re.split(r'[\s:.,;·()\[\]/«»"]+', s):
        if not w: continue
        abbr = '⳪' in w or any(ch in w for ch in '\u0305\ufe24\ufe25\ufe26')
        n = ncop(w)
        if n: out.append(n + ('*' if abbr else ''))
    return out


st_cop_words = Counter(w for r in uniq_rows for w in cwords(r['cop']) if not w.endswith('*'))


def near(c):
    """Spirit & Truth's row for a verse it spells otherwise: the same words, but for letters inside some of them"""
    n = ncop(c)
    if len(n) < 15 or '(...)' in c or '(…)' in c: return None
    votes = Counter()
    for j in range(len(n) - 4):
        for k in grams.get(n[j:j + 5], ()): votes[k] += 1
    best = None
    for k, _ in votes.most_common(5):
        r = difflib.SequenceMatcher(None, n, row_norm[k], autojunk=False).ratio()
        if not best or r > best[0]: best = (r, k)
    return all_rows[best[1]] if best and best[0] >= 0.9 else None


def same_words(a, b):
    """The same words, but for abbreviations and spellings"""
    x, y = cwords(a), cwords(b)
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, x, y, autojunk=False).get_opcodes():
        if tag == 'equal': continue
        if tag != 'replace' or i2 - i1 != j2 - j1: return False
        if any('*' not in p and '*' not in q and difflib.SequenceMatcher(None, p, q).ratio() < 0.6 for p, q in zip(x[i1:i2], y[j1:j2])): return False
    return True


def respell(app, st):
    """The app's verse with each word Spirit & Truth spells otherwise spelt its way (its other words, marks and line
    breaks kept); None if the two say different words, or Spirit & Truth spells none otherwise"""
    at, bt = re.split(r'([ \n]+)', app), re.split(r'([ \n]+)', st)
    ai = [k for k in range(0, len(at), 2) if cwords(at[k])]
    bi = [k for k in range(0, len(bt), 2) if cwords(bt[k])]
    ka, kb = [' '.join(cwords(at[k])) for k in ai], [' '.join(cwords(bt[k])) for k in bi]
    out, changed = list(at), False
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, ka, kb, autojunk=False).get_opcodes():
        if tag == 'equal': continue
        if tag != 'replace' or i2 - i1 != j2 - j1: return None  # words added or left out: another text
        for x, y, ta, tb in zip(ka[i1:i2], kb[j1:j2], ai[i1:i2], bi[j1:j2]):
            if '*' in x or '*' in y: continue  # an abbreviation and the word written out
            if x.replace('ⲫⲛⲟⲩϯ', 'ⲫϯ') == y.replace('ⲫⲛⲟⲩϯ', 'ⲫϯ'): continue  # Ⲫϯ is how the app writes God
            if difflib.SequenceMatcher(None, x, y).ratio() < 0.6: return None  # another word
            if st_cop_words[y] < 2 or st_cop_words[y] <= st_cop_words[x]: continue  # Spirit & Truth's slip, or as common
            lead = re.match(r'^[^\u2c80-\u2cff\u03e2-\u03ef]*', at[ta]).group(0)
            trail = re.search(r'[^\u2c80-\u2cff\u03e2-\u03ef\u0300-\u036f\ufe20-\ufe2f]*$', at[ta]).group(0)
            word = re.sub(r'^[^\u2c80-\u2cff\u03e2-\u03ef]+|[^\u2c80-\u2cff\u03e2-\u03ef\u0300-\u036f\ufe20-\ufe2f]+$', '', bt[tb])
            out[ta] = lead + word + trail
            changed = True
    return ''.join(out) if changed else None


fixes = defaultdict(lambda: defaultdict(dict))
stats = Counter()
for h in hymns:
    v = h['v']
    if 'coptic' not in v: continue
    base = h['id'].split('@')[0]
    cv = split(v['coptic'])
    langs = {k: split(v[k]) for k in ('english', 'arabic', 'englishArabic') if v.get(k)}
    for i, c in enumerate(cv):
        n = ncop(c)
        if len(n) < 4: continue
        stats['verses'] += 1
        rows = find(n)
        if not rows:
            row = near(c)
            if not row: continue
            respelt = respell(c, row['cop'])
            if respelt:
                fixes[base]['coptic'][c] = respelt
                stats['coptic spelt as Spirit & Truth spells it'] += 1
            elif not same_words(c, row['cop']):
                continue  # another text
            rows = [row]
        stats['matched'] += 1
        st_en = ' '.join(r['en'] for r in rows if r.get('en')).strip()
        st_ar = ' '.join(r['ar'] for r in rows if r.get('ar')).strip()
        en = langs.get('english')
        if en and len(en) == len(cv) and st_en and all(r.get('en') for r in rows):
            pre, old = body(en[i])
            _, new = body(st_en)
            if words_en(old) != words_en(new):
                new, kept = merge(old, new, 'en')
                stats['en words kept (Spirit & Truth typo)'] += kept
                m = INSTRUCTION.match(old)
                if m and not new.startswith('('): new = m.group(0) + new
                if words_en(old) != words_en(new) and not seasonal_loss(old, new) and new not in SKIP:
                    fixes[base]['english'][en[i]] = pre + new
                    stats['en'] += 1
        ar = langs.get('arabic')
        if ar and len(ar) == len(cv) and st_ar and all(r.get('ar') for r in rows):
            pre, old = body(ar[i])
            _, new = body(st_ar)
            if nar(old) != nar(new):
                new, kept = merge(old, new, 'ar')
                stats['ar words kept (Spirit & Truth typo)'] += kept
                m = INSTRUCTION.match(old)
                if m and not new.startswith('('): new = m.group(0) + new
            if nar(old) != nar(new) and not seasonal_loss(old, new) and new not in SKIP:
                fixes[base]['arabic'][ar[i]] = pre + new
                stats['ar'] += 1
                la = langs.get('englishArabic')
                if la and len(la) == len(ar):
                    lpre, lold = body(la[i])
                    patched = patch_latin(lold, old, new)
                    if patched is None: stats['ar: English letters to write'] += 1
                    elif patched != lold:
                        fixes[base]['englishArabic'][la[i]] = lpre + patched
                        stats['ar: English letters rewritten'] += 1

for k, x in sorted(stats.items()): print(f'{k}: {x}')
print(f'hymns changed: {len(fixes)}')
print(dict(FAIL))
if TO_WRITE:
    json.dump(TO_WRITE, open('scripts/st-wording/to-write.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    print(f'{len(TO_WRITE)} Arabic verses still need English letters: scripts/st-wording/to-write.json (new Arabic: old English letters)')


def js(s): return json.dumps(s, ensure_ascii=False)


lines = [
    "// Spirit & Truth's wording (used with permission) for the verses where the app said it in other words: for each hymn",
    "// (by id), each language's verses as they were and as Spirit & Truth has them for the same Coptic (and its Coptic where",
    "// it spells a word otherwise), with the Arabic in English letters rewritten to match. Made by",
    "// scripts/st-wording/build.py; applied in hymns-build.ts.",
    "export const stWording: Record<string, Partial<Record<'coptic' | 'english' | 'arabic' | 'englishArabic', [string, string][]>>> = {",
]
for base in sorted(fixes):
    lines.append(f'  {js(base)}: {{')
    for lang in ('coptic', 'english', 'arabic', 'englishArabic'):
        pairs = fixes[base].get(lang)
        if pairs: lines.append(f'    {lang}: [' + ', '.join(f'[{js(a)}, {js(b)}]' for a, b in pairs.items()) + '],')
    lines.append('  },')
lines.append('};')
open(OUT, 'w', encoding='utf8').write('\n'.join(lines) + '\n')
print('wrote', OUT)
