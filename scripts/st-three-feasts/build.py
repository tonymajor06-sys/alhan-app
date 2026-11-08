"""The 3 Feasts Commemoration (the 29th of each Coptic month) in Spirit & Truth's order, as one of the Minor Feasts of
the Lord: src/data/st-three-feasts.ts.

    python3 -I scripts/st-three-feasts/build.py <hymns.json from dump.mjs> <captures dir> <capture prefix>

Each of Spirit & Truth's hymns in a captured service is matched to the app's hymn that has most of its Coptic verses
(a copy of it goes in the order); a hymn the app does not have is written in from Spirit & Truth's words (Coptic,
English, Arabic). Readings and the priest's prayers with no Coptic are left out, as for the other feasts."""
import difflib, json, os, re, sys, unicodedata
from collections import Counter, defaultdict

HYMNS, CAPTURES, PREFIX = sys.argv[1], sys.argv[2], sys.argv[3]
OUT = 'src/data/st-three-feasts.ts'
FEAST, FEAST_ID = '3 Feasts Commemoration', 'minorfeasts-3-feasts-commemoration'
# The app's services for the feast, from Spirit & Truth's (the Liturgy is the Offering of the Lamb, the Liturgy of the
# Word and St Basil's, each under its own heading)
SERVICES = [
    ('vespers', 'Vespers', [('ev', None)]),
    ('morning-praises', 'Morning Praises', [('morning-praises', None)]),
    ('matins', 'Matins', [('mo', None)]),
    ('liturgy', 'Liturgy', [('lamb', 'Offering of the Lamb'), ('word', 'Liturgy of the Word'), ('basil', 'The Liturgy of St Basil')]),
    ('distribution', 'Distribution', [('dist', None)]),
    ('midnight', 'Midnight Praises', [('midnight', None)]),
]


def clean(s): return re.sub(r'[‪-‮‎‏]', '', s).strip()


def script(s):
    if re.search(r'[Ⲁ-⳿Ϣ-ϯ]', s): return 'cop'
    if re.search(r'[؀-ۿ]', s): return 'ar'
    if re.search(r'[A-Za-z]', s): return 'en'
    return None


def ncop(s):
    s = unicodedata.normalize('NFD', s)
    s = ''.join(ch for ch in s if not unicodedata.category(ch).startswith('M'))
    s = s.lower().replace('⳪', 'ⲡϭⲥ')
    return re.sub(r'[^Ⲁ-⳿Ϣ-ϯ]', '', s)


NUM = re.compile(r'^(\+ )?(\([0-9٠-٩]+/[0-9٠-٩]+\) ?)?')


def sections(path):
    """Spirit & Truth's hymns in a captured service: a title, then its rows (Coptic, English, Arabic)"""
    out = []
    for piece in open(path, encoding='utf8').read().split('\n=====\n'):
        cells = [clean(c) for c in piece.split('|||')]
        if not piece.startswith('|||'):
            title = cells[0].split('\n')[0].strip() if cells and cells[0] else ''
            # a verse the window broke into pieces ("The flowing water,", ", by a miraculous, act of wonder."): a piece
            # of the hymn before, not a new one
            broken = len([c for c in cells if c]) == 1 and (not re.match(r'^[A-Z0-9(]', title) or re.search(r'[,.;:!?"\u201d]$', title)
                                                         or (', ' in title and len(title) > 30))
            if broken and out: continue
            out.append({'title': title, 'ar': next((c for c in cells[1:] if script(c) == 'ar'), ''), 'rows': []})
            continue
        row = {}
        for c in cells:
            k = c and script(c)
            if k and k not in row: row[k] = c
        if out and row: out[-1]['rows'].append(row)
    return out


hymns = json.load(open(HYMNS, encoding='utf8'))
by_id = {h['id']: h for h in hymns}
verse_index = defaultdict(set)
size = {}
for h in hymns:
    if '@' in h['id']: continue
    vs = [ncop(NUM.sub('', v)) for v in h['v'].get('coptic', '').split('\n\n')]
    vs = [v for v in vs if len(v) >= 6]
    size[h['id']] = len(vs)
    for v in vs: verse_index[v].add(h['id'])
full = {h['id']: ncop(h['v'].get('coptic', '')) for h in hymns if '@' not in h['id']}
grams = defaultdict(set)
for hid, t in full.items():
    for j in range(0, max(1, len(t) - 7), 4): grams[t[j:j + 8]].add(hid)
by_title = defaultdict(list)
for h in hymns:
    if '@' not in h['id']: by_title[h['title'].lower()].append(h['id'])


def season_rank(hid):
    s = by_id[hid]['season']
    return 0 if s == 'annual' else 1 if s == 'minor-feasts' else 2


def match(sec):
    rows = [ncop(NUM.sub('', r['cop'])) for r in sec['rows'] if 'cop' in r]
    rows = [r for r in rows if len(r) >= 6]
    votes = Counter()
    for r in rows:
        for hid in verse_index.get(r, ()): votes[hid] += 1
    if not votes or max(votes.values()) < len(rows) * 0.5:
        # S&T's verse inside a longer one of the app's (or the other way round): the hymns that have its words
        votes = Counter()
        for r in rows:
            cands = Counter(h for j in range(0, max(1, len(r) - 7), 4) for h in sorted(grams.get(r[j:j + 8], ())))
            for hid, _ in sorted(cands.items(), key=lambda x: (-x[1], x[0]))[:40]:
                if r in full[hid]: votes[hid] += 1
    if votes:
        named = lambda h: sec['title'].lower() in by_id[h]['title'].lower()  # (its own name first, when hymns tie)
        # (ties go the same way every time: Annual's, its own name, the closest in length, then by id)
        best = min(votes, key=lambda h: (-votes[h], season_rank(h), not named(h), abs(size.get(h, 0) - len(rows)), h))
        if votes[best] >= max(1, len(rows) * 0.5): return best
    if not rows: return None
    # the same hymn with a word or a name otherwise (the Pope's name, a spelling): nearly the same words
    whole = ''.join(rows)
    cands = Counter(h for j in range(0, max(1, len(whole) - 7), 4) for h in sorted(grams.get(whole[j:j + 8], ())))
    near = []
    for hid, _ in sorted(cands.items(), key=lambda x: (-x[1], x[0]))[:15]:
        r = difflib.SequenceMatcher(None, whole, full[hid], autojunk=False).ratio()
        if r >= 0.8: near.append((r, hid))
    if near:
        # Annual's (then a Minor Feast's) when it is about as close as another season's version
        top = max(r for r, _ in near)
        return min((h for r, h in near if r >= top - 0.05), key=lambda h: (season_rank(h), h))
    # its name: "Hail to Mary" is the app's "Ⲭⲉⲣⲉ Ⲙⲁⲣⲓⲁ (Hail to Mary)"
    t = sec['title'].lower()
    named = [h for h in full if (lambda x: x == t or x.endswith(f'({t})'))(by_id[h]['title'].lower()) and full[h]]
    return min(named, key=season_rank) if named else None


def match_rows(sec):
    """The hymns a section's verses belong to, one by one, in order (a section that holds more than one hymn: the
    window ran them together); short lines that many hymns share are not counted"""
    out = []
    for r in sec['rows']:
        n = ncop(NUM.sub('', r.get('cop', '')))
        if len(n) < 30: continue
        hits = set(verse_index.get(n, ()))
        if not hits:
            cands = Counter(h for j in range(0, max(1, len(n) - 7), 4) for h in sorted(grams.get(n[j:j + 8], ())))
            hits = {h for h, _ in sorted(cands.items(), key=lambda x: (-x[1], x[0]))[:40] if n in full[h]}
        if hits: out.append(min(hits, key=lambda h: (season_rank(h), h)))
    # a hymn two or more of its verses belong to, in order
    count = Counter(out)
    return [h for i, h in enumerate(out) if count[h] >= 2 and h not in out[:i]]


def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')[:60]


def js(s): return json.dumps(s, ensure_ascii=False)


# Spirit & Truth's hymns the app lacks that are written in: the people's and the chanters' hymns of the day (not the
# litanies, readings and the priest's prayers, nor the saint of the day's psali)
NEW_OK = re.compile(r'Psali|Cymbals|Response|Hymn|Creed|Hail to|Wise Men|Have Mercy|Trisagion|Doxology|Praises|Theotokia|Aspasmos|Agios|Chant')
NOT_NEW = re.compile(r'St\. |Saint |Pope|Bishop|Introduction|Litany|Prayer|Absolution|Blessing|^Morning Praises$|^Agios Agios|Confession')
# The Arabic in English letters of the hymns written in, written for the app (by hymn id, verse by verse)
WRITTEN = json.load(open('scripts/st-three-feasts/arabic-english.json', encoding='utf8'))
SKIP_TITLES = re.compile(r'^(Spirit & Truth|Fractions Index|Synaxarion|Our Father|Thanksgiving Prayer|Coptic Gospel|Anaphora|'
                         r'The Confession|Prayers before Communion|Introduction To The Creed|Healing to the Sick|'
                         r'(Vespers |Matins |Liturgy )?(Psalm|Gospel)|(Pauline|Catholic) Epistle|Praxis|'
                         r'(Psalms?|Luke|Mark|Matthew|John|Acts|Romans|[0-9] \w+) [0-9].*)$'
                         r'|^(Litany|Another Litany|The Prayer|Prayer|Introduction to the|The Institution|The Seven Short|'
                         r'The Five Short|Three Great|Combined Litany|Conclusion to the Coptic|The Prayers of)', re.I)
# A copy keeps its hymn's name, so a hymn the app has under another day's name (a psalm chant that is "Second Sunday
# of Kiahk" there) is written in under Spirit & Truth's name instead
OTHER_DAY = re.compile(r'Sunday of|Feast of|Day of|Paramoun')
OTHER_SEASON = re.compile(r'Sunday of|Feast of|Day of|Paramoun|Kiahk|Lent|Nativity|Theophany|Pascha|Ode')
entries, new_hymns, report = [], [], []
for key, title, parts in SERVICES:
    sid = f'{FEAST_ID}-{key}'
    items, last = [], None
    for part, header in parts:
        path = os.path.join(CAPTURES, f'{PREFIX}{part}.txt')
        if header: items.append(('header', header)); last = None
        for sec in sections(path):
            if SKIP_TITLES.match(sec['title']): continue
            if sec['title'] == 'The Orthodox Creed':
                # the Creed as the other feasts have it (once in each service)
                if not any(k == 'copy' and x.endswith('the-orthodox-creed') for k, x in items):
                    items.append(('copy', f'minorfeasts-feast-of-transfiguration-{key if key in ("vespers", "matins", "liturgy") else "vespers"}-the-orthodox-creed')); last = None
                continue
            hid = match(sec)
            if not hid and len([r for r in sec['rows'] if 'cop' in r]) > 1 and not NOT_NEW.search(sec['title']):
                for h in match_rows(sec):
                    if not OTHER_SEASON.search(by_id[h]['title']) and not any(k == 'copy' and x == h for k, x in items):
                        items.append(('copy', h)); last = h
                if items and items[-1][0] == 'copy' and items[-1][1] == last and last in match_rows(sec): continue
            if hid and OTHER_SEASON.search(by_id[hid]['title']) and not OTHER_SEASON.search(sec['title']): hid = None
            if hid:
                prev = next((x for k, x in reversed(items) if k == 'copy'), None)
                same_name = prev and by_id.get(prev, {}).get('title') == by_id[hid]['title']
                if hid != last and not same_name and not any(k == 'copy' and x == hid for k, x in items): items.append(('copy', hid))
                last = hid
                continue
            cop = [r for r in sec['rows'] if 'cop' in r]
            if not cop or not NEW_OK.search(sec['title']) or NOT_NEW.search(sec['title']):
                # a reading, a litany or the priest's prayers (left out, as for the other feasts), or a line the
                # window broke up
                report.append(f'left out: {sid}: {sec["title"][:70]}')
                continue
            new_id = f'{sid}-{slug(sec["title"])}'
            while any(n['id'] == new_id for n in new_hymns): new_id += '-2'
            versions = {lang: '\n\n'.join(r.get(k, '') for r in cop) for lang, k in (('coptic', 'cop'), ('english', 'en'), ('arabic', 'ar'))}
            if new_id in WRITTEN and len(WRITTEN[new_id]) == len(cop): versions['englishArabic'] = '\n\n'.join(WRITTEN[new_id])
            else: report.append(f'TO WRITE: Arabic in English letters for {new_id} ({len(cop)} verses) in arabic-english.json')
            hymn = {'id': new_id, 'title': sec['title'], 'ar': sec['ar'], 'versions': versions}
            new_hymns.append(hymn)
            items.append(('hymn', hymn)); last = None
            report.append(f'new: {sid}: {sec["title"]} ({len(cop)} verses)')
    entries.append((sid, f'{FEAST}: {title}', items))

with open(OUT, 'w', encoding='utf8') as f:
    f.write('// The 3 Feasts Commemoration (the 29th of each Coptic month) in Spirit & Truth\'s order, as one of the Minor Feasts\n')
    f.write('// of the Lord. Made by scripts/st-three-feasts/build.py; see st-full-seasons.ts for what the items are.\n')
    f.write("import type { Hymn } from './hymns';\n\n")
    f.write('export const stThreeFeasts: { id: string; season: string; title: string; items: ({ ref: string } | { copy: string } | { hymn: Hymn } | { header: string })[] }[] = [\n')
    for sid, title, items in entries:
        f.write(f'  {{ id: {js(sid)}, season: "minor-feasts", title: {js(title)}, items: [\n')
        for kind, x in items:
            if kind == 'header': f.write(f'    {{ header: {js(x)} }},\n')
            elif kind == 'copy': f.write(f'    {{ copy: {js(x)} }},\n')
            else:
                vs = ', '.join(f"{{ language: '{lang}', text: {js(t)} }}" for lang, t in x['versions'].items() if t.strip())
                f.write(f'    {{ hymn: {{ id: {js(x["id"])}, title: {js(x["title"])}, versions: [{vs}] }} }},\n')
        f.write('  ] },\n')
    f.write('];\n\n// Arabic titles of the hymns written in from Spirit & Truth\n')
    f.write('export const stThreeFeastsArabicTitles: Record<string, string> = {\n')
    for h in new_hymns:
        if h['ar']: f.write(f'  {js(h["id"])}: {js(h["ar"])},\n')
    f.write('};\n')
print('\n'.join(report))
print(f'{sum(len(i) for _, _, i in entries)} items, {len(new_hymns)} new hymns: wrote {OUT}')
