# Writes src/data/st-rites.ts: the hymns and responses of Spirit & Truth's Holy Orders, Reception of a New Priest and
# Filling of the Cup (2026-11-12), for Hymns > Rites of Grace. Read from captures/st-mysteries (see README.md):
#   npx tsx scripts/verse-lines/dump.mjs /tmp/hymns.json && python3 -I scripts/st-mysteries/build.py /tmp/hymns.json
# As in the other rites (st-mysteries.ts): the hymns and the people's and deacons' parts, in order; the bishop's and
# priest's prayers, the readings and the litanies are left out. Arabic in English letters comes from the same Arabic
# elsewhere in the app, or from arabic-english.json here (written for the app); any still missing are listed in
# to-write.json and the build stops.
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.join(HERE, '../verse-lines'))
from parse import parse
from arabic_lines import lexicon, label_of, norm

ROOT = os.path.join(HERE, '../..')
CAP = os.path.join(ROOT, 'captures/st-mysteries')
LABEL = {
    'people': ('People:', 'Ⲡⲓⲗⲁⲟⲥ:', 'الشعب:'),
    'deacon': ('Deacon:', 'Ⲡⲓⲇⲓⲁⲕⲱⲛ:', 'الشماس:'),
}
# Not hymns: readings, litanies and prayers of the priest or bishop
NOT_HYMNS = re.compile(r'\d+:\d+|^Psalms? (?!150$)\d|Pauline|^John |Litan|Prayer|Blessing|Our Father|Exposition|Fraction|Confession|'
                       r'Distribution|Catechesis|Commandment|Vows|Opening|Thanksgiving', re.I)

EMPTY = '\u200b'
# Arabic names for the hymns Spirit & Truth names in English and Coptic only (as the same hymns are named in the app)
TITLE_AR = {
    'Blessed Are You': 'مبارك أنت',
    'Blessed is He': 'مبارك الآتي باسم الرب',
    'God Have Mercy': 'اللهم ارحمنا',
    'Hymn of the Virtues': 'لحن الفضائل',
    'The Blessed': 'طوباهم',
    'Psalm Trailer': 'ختام المزمور',
    'Introduction to the Coptic Gospel When Read by the Pope or a Bishop': 'مقدمة الإنجيل القبطي عند قراءته بواسطة البابا أو الأسقف',
    'Reception Hymn': 'لحن الاستقبال',
    'One is the All Holy Father': 'واحد هو الآب الكلي القدس',
    'One is the Holy Father': 'واحد هو الآب القدوس',
    'Concluding Hymn': 'الختام',
}

def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')[:60]

def hymn_from(rows, hid, title, keep=('people', 'deacon', None)):
    # one hymn: the rows of the people and deacons (or of no one in particular), each speaker named where it changes
    out = {'coptic': [], 'english': [], 'arabic': []}
    speaker = '?'
    for row in rows:
        if row['label'] or row['speaker'] not in keep: continue
        if row['speaker'] in LABEL and row['speaker'] != speaker:
            for lang, word in zip(('english', 'coptic', 'arabic'), LABEL[row['speaker']]): out[lang].append(word)
        speaker = row['speaker']
        # a verse Spirit & Truth has in only some languages keeps its place in the others (an empty verse, a zero-width
        # space, so the verses after it stay next to their translations in Side by Side)
        for lang in out:
            out[lang].append(row.get(lang) or EMPTY)
    if not out['english']: return None
    return {'id': hid, 'title': title, 'paras': out}

def hymns_of(rite_file, prefix, only_sections=None):
    rite = parse(os.path.join(CAP, rite_file))
    hymns, counts = [], {}
    for s in rite['sections']:
        title = s['title'].get('english', '')
        if only_sections is not None:
            if title not in only_sections: continue
        else:
            body = [r for r in s['rows'] if not r['label']]
            sung = [r for r in body if r['speaker'] in ('people', 'deacon', None)]
            if NOT_HYMNS.search(title) or len(sung) * 2 < len(body): continue
        base = f'{prefix}-{slug(title)}'
        counts[base] = counts.get(base, 0) + 1
        hid = base if counts[base] == 1 else f'{base}-{counts[base]}'
        coptic = s['title'].get('coptic')
        h = hymn_from(s['rows'], hid, f'{coptic} ({title})' if coptic else title)
        if h:
            h['arabicTitle'] = s['title'].get('arabic') or TITLE_AR.get(title)
            hymns.append(h)
    return hymns

ORDERS = [
    ('chanter', 'Ordaining a Chanter', 'رسامة مرتل (إبصلتس)'),
    ('reader', 'Ordaining a Reader', 'رسامة قارئ (أغنسطس)'),
    ('subdeacon', 'Ordaining a Subdeacon', 'رسامة إيبودياكون'),
    ('deacon', 'Ordaining a Deacon', 'رسامة شماس (دياكون)'),
    ('archdeacon', 'Ordaining an Archdeacon', 'رسامة رئيس شمامسة'),
    ('presbyter', 'Ordaining a Priest', 'رسامة كاهن (قس)'),
    ('hegumen', 'Raising a Priest to Hegumen', 'ترقية كاهن إلى قمص'),
]

def build():
    services = []
    # Holy Orders: the Verses of the Cymbals sung at every ordination, then each one's call and the people's answers
    orders = []
    cymbals = hymns_of('chanter.txt', 'rites-orders', ['Verses of the Cymbals'])
    for h in cymbals:
        h['id'] = 'rites-orders-verses-of-the-cymbals'
        h['title'] = 'Verses of the Cymbals (at every ordination)'
        h['arabicTitle'] = 'أرباع الناقوس (في كل رسامة)'
    orders += cymbals
    for f, title, ar in ORDERS:
        rite = parse(os.path.join(CAP, f + '.txt'))
        rows = [r for s in rite['sections'] if s['title'].get('english') in ('Litanies', 'The Ordination Prayers') for r in s['rows']]
        h = hymn_from(rows, f'rites-orders-{f}', f'{title}: the Call and the Answers')
        if h:
            h['arabicTitle'] = f'{ar}: النداء والمردات'
            orders.append({'header': True, 'id': f'rites-orders-{f}-header', 'title': title, 'arabicTitle': ar})
            orders.append(h)
    services.append(('rites-holy-orders', orders))
    services.append(('rites-new-priest', hymns_of('new-priest.txt', 'rites-new-priest')))
    services.append(('rites-filling-cup', hymns_of('filling-cup.txt', 'rites-filling-cup')))
    return services

def main():
    hymns = json.load(open(sys.argv[1]))
    lex = lexicon(hymns)
    written_path = os.path.join(HERE, 'arabic-english.json')
    written = json.load(open(written_path, encoding='utf8')) if os.path.exists(written_path) else {}
    lex.update({norm(a): e for a, e in written.items()})
    missing = {}
    services = build()
    out = []
    titles = {}
    for sid, hymns_ in services:
        items = []
        for h in hymns_:
            titles[h['id']] = h.get('arabicTitle') or ''
            if h.get('header'):
                items.append({'id': h['id'], 'title': h['title'], 'versions': [], 'isSectionHeader': True}); continue
            p = h['paras']
            latin = []
            for a in p['arabic']:
                if a == EMPTY: latin.append(EMPTY); continue
                lab = label_of(a)
                if lab: latin.append(lab); continue
                known = lex.get(norm(a))
                if known is None: missing[a] = ''
                latin.append(known or '')
            versions = [{'language': lang, 'text': '\n\n'.join(x for x in p[lang])} for lang in ('coptic', 'english', 'arabic')]
            versions.insert(2, {'language': 'englishArabic', 'text': '\n\n'.join(latin)})
            # a language with every verse empty is left out
            versions = [v for v in versions if v['text'].replace('\n', '').replace(EMPTY, '').strip()]
            items.append({'id': h['id'], 'title': h['title'], 'versions': versions})
        out.append({'id': sid, 'hymns': items})
    json.dump(missing, open(os.path.join(HERE, 'to-write.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    if missing:
        sys.exit(f'{len(missing)} Arabic verses need English letters: scripts/st-mysteries/to-write.json')
    path = os.path.join(ROOT, 'src/data/st-rites.ts')
    with open(path, 'w', encoding='utf8') as f:
        f.write("import type { Hymn } from './hymns';\n\n")
        f.write('// Generated by scripts/st-mysteries/build.py from Spirit & Truth\'s Holy Mysteries (used with permission): the hymns and\n')
        f.write("// responses of Holy Orders, the Reception of a New Priest and Filling of the Cup, for Hymns > Rites of Grace.\n")
        f.write('// Change the script, not this file.\n')
        f.write('export const stRites: { id: string; hymns: Hymn[] }[] = ')
        f.write(json.dumps(out, ensure_ascii=False, indent=1))
        f.write(';\n\nexport const stRitesArabicTitles: Record<string, string> = ')
        f.write(json.dumps({k: v for k, v in titles.items() if v}, ensure_ascii=False, indent=1))
        f.write(';\n')
    print(sum(len(s['hymns']) for s in out), 'hymns', file=sys.stderr)

main()
