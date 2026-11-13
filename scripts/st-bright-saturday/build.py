"""Bright Saturday in Spirit & Truth's full order: src/data/st-bright-saturday.ts (see README.md).

    python3 -I scripts/st-bright-saturday/build.py <out.json from dump.mjs> captures/st-bright-saturday

Each of Spirit & Truth's hymns in a captured service is matched to the app's hymn with most of its Coptic verses (as
for the 3 Feasts, scripts/st-three-feasts): Bright Saturday's own hymns keep their place, ids and recordings, the
others are copied in. Spirit & Truth's hymns the app lacks are written in from its words (Coptic, English, Arabic),
and Bright Saturday's own hymns that had no Coptic get it. The litanies, readings and the priest's prayers are left out,
as for the other feasts, but not in Midnight Praises: there the Prophets' Praises are read by the readers."""
import difflib, json, os, re, sys, unicodedata
from collections import Counter, defaultdict

DUMP, CAPTURES = sys.argv[1], sys.argv[2]
OUT = 'src/data/st-bright-saturday.ts'
WRITTEN_PATH = 'scripts/st-bright-saturday/arabic-english.json'
TO_WRITE = 'scripts/st-bright-saturday/to-write.json'
ENTRY = 'holyweek-bright-saturday'
# Spirit & Truth's services of the day, in its order (the Hours and the Book of Revelation are psalms and readings,
# left out; the Apocalypse's hymns are in Holy Week's Apocalypse Night: Revelation). Each: the captures (a second one
# holds what the first stopped before) and the app's heading.
SERVICES = [
    (['midnight'], 'Midnight Praises of Bright Saturday'),
    (['morning-incense', 'morning-incense-end'], 'Offering of Morning Incense (Bright Saturday)'),
    (['lamb'], 'Offering of the Lamb (Bright Saturday)'),
    (['word'], 'Liturgy of the Word (Bright Saturday)'),
    (['basil'], 'The Divine Liturgy of Saint Basil the Great (Bright Saturday)'),
    (['gregory'], 'The Divine Liturgy of Saint Gregory the Theologian (Bright Saturday)'),
    (['dist'], 'Distribution of the Holy Mysteries (Bright Saturday)'),
]
ZW = '​'  # an empty verse that keeps its place (see scripts/verse-lines)


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


def nar(s):
    """Arabic without its marks and punctuation (to find a verse's English letters)"""
    s = re.sub(r'[ً-ْٰـ‪-‮‎‏]', '', s)
    return re.sub(r'[^ء-ي0-9٠-٩]', '', s)


NUM = re.compile(r'^(\+ )?(\([0-9٠-٩]+/[0-9٠-٩]+\) ?)?')


def sections(path):
    """Spirit & Truth's hymns in a captured service: a title, then its rows (Coptic, English, Arabic); the window's
    own title ("Spirit & Truth") between two rows of a hymn is not a new one"""
    out = []
    for piece in open(path, encoding='utf8').read().split('\n=====\n'):
        cells = [clean(c) for c in piece.split('|||')]
        if not piece.startswith('|||'):
            title = cells[0].split('\n')[0].strip() if cells and cells[0] else ''
            if title == 'Spirit & Truth' and out: continue
            # a verse the window broke into pieces (around a word with a note): a piece of the hymn before
            broken = len([c for c in cells if c]) == 1 and (not re.match(r'^[A-Z0-9(]', title) or re.search(r'[,.;:!?"”]$', title)
                                                         or (', ' in title and len(title) > 30))
            if broken and out: continue
            out.append({'title': title, 'ar': next((c for c in cells[1:] if script(c) == 'ar'), ''),
                        'cop': next((c for c in cells[1:] if script(c) == 'cop'), ''), 'rows': []})
            continue
        row = {}
        for c in cells:
            k = c and script(c)
            if k and k not in row: row[k] = c
        if out and row: out[-1]['rows'].append(row)
    return out


dump = json.load(open(DUMP, encoding='utf8'))
hymns, own, before = dump['hymns'], dump['own'], dump['before']
# the hymns this build wrote from Spirit & Truth before (written again each time, as Annual's: not Bright Saturday's own)
WRITTEN_IDS = set(dump.get('written', []))
by_id = {h['id']: h for h in hymns}
inline_before = {i['hymn']['id']: i['hymn'] for i in before if 'hymn' in i}
OWN = re.compile(r'^holyweek-(bright-saturday|apocalypse)')
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
# Arabic verses' English letters, from every hymn that has both verse by verse, and those written for the app
english_letters = {}
for h in hymns:
    ar, ea = h['v'].get('arabic', '').split('\n\n'), h['v'].get('englishArabic', '').split('\n\n')
    if len(ar) == len(ea):
        for a, e in zip(ar, ea):
            if nar(a) and e.strip() and e.strip() != ZW: english_letters.setdefault(nar(a), e.strip())
WRITTEN = json.load(open(WRITTEN_PATH, encoding='utf8')) if os.path.exists(WRITTEN_PATH) else {}
for a, e in WRITTEN.items(): english_letters[nar(a)] = e


def season_rank(hid):
    if hid in WRITTEN_IDS: return 0
    if OWN.match(hid): return -1
    s = by_id[hid]['season']
    return 0 if s == 'annual' else 1 if s in ('minor-feasts', 'holy-week') else 2


# the hymns Bright Saturday copied before, kept when they hold the verses as well as another does (their ids stay)
PREFERRED = {i['copy'] for i in before if 'copy' in i} | {i['ref'] for i in before if 'ref' in i}
# Spirit & Truth's hymns that the matching cannot place by their verses: the service's own name over its first hymn
OVERRIDES = {'Offering of the Lamb': 'annual-liturgy-offering-blessed-are-you',
             # (its own hymn, with Arsani's recordings, had only the first verses: now all of them, in alhan-seasons.ts)
             'Psalm 151': 'holyweek-apocalypse-praises-psalm-151',
             # (Spirit & Truth gave the verse for the day it was opened on, in the season of the seeds; Bright Saturday
             # is in Baramouda, the season of the air and the fruits: Annual's verse)
             'Standard Watos Aspasmos (O Lord God)': 'annual-liturgy-aspasmos-watos',
             'Conclusion in the presence of the Pope or a Bishop': 'annual-vespers-conclusion-pope-bishop'}


def is_named(h, t): x = by_id[h]['title'].lower(); return x == t or x.endswith(f'({t})')


def match(sec):
    t = sec['title'].lower()
    if sec['title'] in OVERRIDES: return OVERRIDES[sec['title']]
    # Bright Saturday's own hymn of that name that has no Coptic (its Prophets' Praises had none)
    named_own = [h for h in full if OWN.match(h) and h not in WRITTEN_IDS and by_id[h]['title'].lower() == t]
    if named_own: return min(named_own)
    # (a speaker's name, "Ⲡⲓⲗⲁⲟⲥ:", is in every hymn: not counted)
    rows = [ncop(NUM.sub('', r['cop'])) for r in sec['rows'] if 'cop' in r]
    rows = [r for r in rows if len(r) >= 12]
    votes = Counter()
    for r in rows:
        for hid in verse_index.get(r, ()): votes[hid] += 1
    if not votes or max(votes.values()) < len(rows) * 0.6:
        for r in rows:
            cands = Counter(h for j in range(0, max(1, len(r) - 7), 4) for h in sorted(grams.get(r[j:j + 8], ())))
            for hid, _ in sorted(cands.items(), key=lambda x: (-x[1], x[0]))[:40]:
                if r in full[hid] and r not in {ncop(NUM.sub('', v)) for v in by_id[hid]['v'].get('coptic', '').split('\n\n')}: votes[hid] += 1
    if votes:
        # a hymn Spirit & Truth names exactly ("A Third Standard Adam Aspasmos (O Christ Our Savior)") is the app's of
        # that name, even where its verses name another Pope
        if '(' in t:
            named = [h for h in votes if is_named(h, t) and season_rank(h) < 2]
            if named: return min(named, key=lambda h: (-votes[h], season_rank(h), h))

        # Bright Saturday's own hymn with half its verses; Annual's or Holy Week's with most of them; another
        # season's only when it is nearly the same hymn (not with that season's verses as well)
        def enough(h):
            share = votes[h] / max(1, len(rows))
            if OWN.match(h) and h not in WRITTEN_IDS: return share >= 0.5
            if season_rank(h) < 2: return share >= 0.6
            return share >= 0.8 and size.get(h, 0) <= len(rows) * 1.25 + 1
        ok = [h for h in votes if votes[h] >= 1 and enough(h)]
        if ok:
            own_ok = [h for h in ok if OWN.match(h) and h not in WRITTEN_IDS]
            if own_ok: return min(own_ok, key=lambda h: (-votes[h], h))
            return min(ok, key=lambda h: (-votes[h], h not in PREFERRED, season_rank(h), not is_named(h, t), abs(size.get(h, 0) - len(rows)), h))
    if rows:
        # the same hymn with a word or a name otherwise (the Pope's name, a spelling): nearly the same words
        whole = ''.join(rows)
        cands = Counter(h for j in range(0, max(1, len(whole) - 7), 4) for h in sorted(grams.get(whole[j:j + 8], ())))
        near = []
        for hid, _ in sorted(cands.items(), key=lambda x: (-x[1], x[0]))[:15]:
            r = difflib.SequenceMatcher(None, whole, full[hid], autojunk=False).ratio()
            if r >= 0.8 and season_rank(hid) < 2: near.append((r, hid))
        if near:
            top = max(r for r, _ in near)
            return min((h for r, h in near if r >= top - 0.05), key=lambda h: (h not in PREFERRED, season_rank(h), h))
        return None
    # a hymn of Bright Saturday's Spirit & Truth shows without Coptic: by its name
    named = [h for h in full if is_named(h, t) and OWN.match(h) and h not in WRITTEN_IDS]
    return min(named, key=lambda h: (season_rank(h), h)) if named else None


def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')[:60]


def js(s): return json.dumps(s, ensure_ascii=False)


NEW_OK = re.compile(r'Psali|Cymbals|Response|Hymn|Creed|Hail to|Wise Men|Have Mercy|Trisagion|Doxology|Praises|Theotokia|Aspasmos|Agios|Chant|Paralex|Blessed')
NOT_NEW = re.compile(r'St\. |Saint |Pope|Bishop|Introduction|Litany|Prayer|Absolution|Blessing|Agios Agios|Confession|Fraction')
SKIP_TITLES = re.compile(r'^(Spirit & Truth|Fractions Index|Synaxarion|Our Father|Thanksgiving Prayer|Coptic Gospel|Anaphora|'
                         r'The Confession|Prayers before Communion|Healing to the Sick|The Benediction|Alternate Benediction|'
                         r'(Vespers |Matins |Liturgy )?(Psalm|Gospel)|(Pauline|Catholic) Epistle|Praxis|Homily|'
                         r'(Psalms?|Luke|Mark|Matthew|John|Acts|Romans|Isaiah|[0-9] \w+) [0-9].*)$'
                         r'|^(Litany|Another Litany|The Prayer|Prayer|Introduction to the|Intro to the|The Institution|The Seven Short|'
                         r'The Short Litanies|The Five Short|Three Great|Combined Litany|Conclusion to the Coptic|The Prayers of)', re.I)
# the people's short answers (the Kyries, the Sanctus, "As it was") and the services' own titles over their opening
# lines; in Midnight Praises only its title is left out
SKIP_EXACT = {'Lord Have Mercy', 'Holy Holy Holy', 'As It Was', 'Offering of Morning Incense', 'Liturgy of the Word',
              'Distribution of the Holy Mysteries', 'The Divine Liturgy of Saint Basil the Great',
              'The Divine Liturgy of Saint Gregory the Theologian'}
# the Bible readings of Midnight Praises (the Prophets' Praises, the Gospel praises, the Story of Susanna): read, not
# sung, so left out at the owner's request (2026-11-13: "i only want the hymns")
READINGS = re.compile(r'\((Deuteronomy|1 Samuel|Habakkuk|Jonah|Isaiah|2 Chronicles|Lamentations|Baruch|1 Kings|1 Chronicles|Daniel|Luke) [0-9]'
                      r'|^The (Second|Third) Praise of the Prophet Isaiah$', re.I)
OTHER_SEASON = re.compile(r'Sunday of|Feast of|Day of|Paramoun|Kiahk|Lent|Nativity|Theophany|Ode')
report, to_write, new_titles = [], {}, {}


def versions_from(rows, hid):
    """A hymn's words from Spirit & Truth's rows (a row missing a language keeps its place with an empty verse)"""
    v = {lang: '\n\n'.join(r.get(k) or ZW for r in rows) for lang, k in (('coptic', 'cop'), ('english', 'en'), ('arabic', 'ar'))}
    letters = []
    for r in rows:
        a = r.get('ar')
        if not a: letters.append(ZW); continue
        e = english_letters.get(nar(a))
        if e is None: to_write[a] = ''; e = ''
        letters.append(e)
    v['englishArabic'] = '\n\n'.join(letters) if all(letters) else ''
    if not all(letters): report.append(f'TO WRITE: Arabic in English letters for {hid} ({sum(1 for x in letters if not x)} verses)')
    return {k: t for k, t in v.items() if t.replace(ZW, '').replace('\n', '').strip()}


def same_name(app_title, st_title):
    a, t = app_title.lower(), st_title.lower()
    return a == t or a.endswith(f'({t})')


def first_verse(rows): return next((n for n in (ncop(NUM.sub('', r.get('cop', ''))) for r in rows) if len(n) >= 12), None)


items, seen, written = [], Counter(), []
full_midnight = {s['title']: s for s in sections(os.path.join(CAPTURES, 'bright-midnight-full.txt'))} \
    if os.path.exists(os.path.join(CAPTURES, 'bright-midnight-full.txt')) else {}
for parts, header in SERVICES:
    items.append(('header', header))
    midnight = parts[0] == 'midnight'
    secs = sections(os.path.join(CAPTURES, f'bright-{parts[0]}.txt'))
    for extra in parts[1:]:
        more = sections(os.path.join(CAPTURES, f'bright-{extra}.txt'))
        # the second capture: from the first hymn the first one did not reach
        titles = {s['title'] for s in secs}
        start = next(i for i, s in enumerate(more) if s['title'] not in titles)
        secs += more[start:]
    last = None
    for sec in secs:
        own_name = any(OWN.match(h) and by_id[h]['title'].lower() == sec['title'].lower() for h in full)
        if sec['title'] in ('Spirit & Truth', 'Midnight Praises of Bright Saturday') or sec['title'] in SKIP_EXACT \
                or (not midnight and SKIP_TITLES.match(sec['title']) and not own_name):
            continue
        if midnight and READINGS.search(sec['title']):
            report.append(f'reading left out: {sec["title"][:70]}')
            continue
        if midnight and sec['title'] in full_midnight: sec = full_midnight[sec['title']]  # (with every repeated row)
        cop = [r for r in sec['rows'] if 'cop' in r]
        # a hymn written in here already, again in another service (St Gregory's Aspasmos after St Basil's): a copy of
        # it (the same name and first verse; its lines for the Pope can be spelt like another hymn's)
        again = next((x['id'] for k, x in items if k == 'hymn' and same_name(x['title'], sec['title'])
                      and first_verse(x.get('rows') or [{'cop': v} for v in next((y['text'] for y in x['versions'] if y['language'] == 'coptic'), '').split('\n\n')])
                      == first_verse(cop) is not None), None)
        if again:
            if again != last: seen[again] += 1; items.append(('copy', again))
            last = again
            continue
        hid = match(sec)
        if hid and OTHER_SEASON.search(by_id[hid]['title']) and not OTHER_SEASON.search(sec['title']) and not OWN.match(hid): hid = None
        if hid:
            if hid == last: continue
            seen[hid] += 1
            if hid in inline_before:
                h = dict(inline_before[hid])
                coptic = next((v['text'] for v in h['versions'] if v['language'] == 'coptic'), '')
                no_coptic = len(ncop(coptic)) < len(re.findall(r'[A-Za-z]', coptic))  # (mostly English letters)
                if (no_coptic or hid in WRITTEN_IDS) and cop:
                    # Bright Saturday's hymn without its Coptic (or with English in its place), or one written here
                    # before: Spirit & Truth's words (Coptic, English, Arabic)
                    h['versions'] = [{'language': k, 'text': t} for k, t in versions_from(sec['rows'], hid).items()]
                    if sec.get('cop'): h['title'] = f'{sec["cop"]} ({sec["title"]})'
                    written.append(hid)
                    if hid not in WRITTEN_IDS: report.append(f'Coptic added: {h["title"]} ({len(sec["rows"])} verses)')
                items.append(('hymn' if seen[hid] == 1 else 'copy', h if seen[hid] == 1 else hid))
            elif OWN.match(hid) and seen[hid] == 1: items.append(('ref', hid))
            else: items.append(('copy', hid))
            last = hid
            continue
        if not cop or (not midnight and (not NEW_OK.search(sec['title']) or NOT_NEW.search(sec['title']))):
            # (a piece of a verse the window broke up keeps the hymn before it going)
            report.append(f'left out: {header}: {sec["title"][:70]}')
            continue
        last = None
        new_id = f'{ENTRY}-{slug(sec["title"])}'
        while any(k == 'hymn' and x['id'] == new_id for k, x in items): new_id += '-2'
        # (named as the app names its hymns: the Coptic heading Spirit & Truth gives, then its name)
        hymn = {'id': new_id, 'title': f'{sec["cop"]} ({sec["title"]})' if sec.get('cop') else sec['title'], 'versions': [{'language': k, 'text': t} for k, t in versions_from(sec['rows'], new_id).items()], 'rows': cop}
        if sec['ar']: new_titles[new_id] = sec['ar']
        items.append(('hymn', hymn))
        written.append(new_id)
        report.append(f'new: {header}: {sec["title"]} ({len(sec["rows"])} verses)')

# what Bright Saturday had before that Spirit & Truth's order no longer has
now = {x if isinstance(x, str) else x['id'] for k, x in items if k != 'header'}
for i in before:
    k = next(iter(i))
    x = i[k] if k != 'hymn' else i[k]['id']
    if k != 'header' and x not in now: report.append(f'no longer in the order: {k} {x} ({by_id.get(x, {}).get("title", "")})')

with open(OUT, 'w', encoding='utf8') as f:
    f.write("// Bright Saturday (Holy Week) in Spirit & Truth's full order, from Midnight Praises to the Distribution.\n")
    f.write("// Made by scripts/st-bright-saturday/build.py (see its README); st-full-seasons.ts lists it with the other days,\n")
    f.write("// see there for what the items are.\nimport type { Hymn } from './hymns';\n\n")
    f.write("export const stBrightSaturday: { id: string; season: string; title: string; items: ({ ref: string } | { copy: string } | { hymn: Hymn } | { header: string })[] } = {\n")
    f.write(f'  id: {js(ENTRY)}, season: "holy-week", title: "Bright Saturday", items: [\n')
    for kind, x in items:
        if kind == 'hymn': f.write(f'    {{ hymn: {js({k: v for k, v in x.items() if k != "rows"})} }},\n')
        else: f.write(f'    {{ {kind}: {js(x)} }},\n')
    f.write('  ],\n};\n\n// The hymns written here from Spirit & Truth\'s words (written again each time the build runs)\n')
    f.write(f'export const stBrightSaturdayWritten: string[] = {js(written)};\n\n')
    f.write('// Arabic titles of the hymns written in from Spirit & Truth\n')
    f.write('export const stBrightSaturdayArabicTitles: Record<string, string> = {\n')
    for k, v in new_titles.items(): f.write(f'  {js(k)}: {js(v)},\n')
    f.write('};\n')
json.dump(to_write, open(TO_WRITE, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print('\n'.join(report))
print(f'{len(items)} items; {len(to_write)} Arabic verses still to write in English letters ({TO_WRITE})')
