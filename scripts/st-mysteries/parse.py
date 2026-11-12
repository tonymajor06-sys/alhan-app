# Reads a capture of a Spirit & Truth rite (captures/st-mysteries/<rite>.txt, see the README) into its sections:
# each section's title (English, Coptic, Arabic) and its rows, each with who says it and its three languages.
import re

SPEAKERS = {
    'bishop': 'bishop', 'priest': 'priest', 'people': 'people', 'deacon': 'deacon', 'congregation': 'people',
    'the pope': 'bishop', 'pope': 'bishop', 'archdeacon': 'deacon', 'chanters': 'people', 'choir': 'people',
    'priests': 'priest', 'reader': 'reader', 'the reader': 'reader', 'bishop or priest': 'priest', 'all': 'people',
    'the bishop': 'bishop', 'the priest': 'priest', 'the people': 'people', 'the deacon': 'deacon', 'deacons': 'deacon',
}
STRIP = re.compile('[‎‏‪-‮]')

def cells_of(row):
    return [STRIP.sub('', c).strip() for c in row.split('|||') if STRIP.sub('', c).strip()]

def script(text):
    if re.search('[Ⲁ-⳿Ϣ-ϯ]', text): return 'coptic'
    if re.search('[؀-ۿ]', text): return 'arabic'
    return 'english'

def parse(path):
    text = open(path, encoding='utf8').read()
    raw = [r.strip('\n') for r in text.split('\n=====\n')]
    rows = [cells_of(r) for r in raw]
    # a heading is written on its own, not in the three columns (which start with |||)
    heading = [not r.startswith('|||') for r in raw]
    title = rows[0]
    sections, speaker = [], None
    cur = {'title': {'english': 'Opening'}, 'rows': []}
    for cells, is_heading in zip(rows[1:], heading[1:]):
        if not cells or cells == ['Spirit & Truth']: continue
        langs = {script(c): c for c in cells}
        en = langs.get('english', '')
        # "Bishop:" "Ⲡⲓⲉⲡⲓⲥⲕⲟⲡⲟⲥ:" "الأسقف:"
        if en.endswith(':') and len(en) < 40 and en[:-1].strip().lower() in SPEAKERS:
            speaker = SPEAKERS[en[:-1].strip().lower()]
            cur['rows'].append({'label': True, 'speaker': speaker, **langs}); continue
        # a section heading: English and Arabic (or Coptic) only, short, no full stop at the end
        if is_heading:
            sections.append(cur)
            cur = {'title': langs, 'rows': []}
            speaker = None
            continue
        cur['rows'].append({'label': False, 'speaker': speaker, **langs})
    sections.append(cur)
    return {'title': title, 'sections': [s for s in sections if s['rows']]}

if __name__ == '__main__':
    import sys
    from collections import Counter
    for path in sys.argv[1:]:
        r = parse(path)
        print('#####', r['title'][0])
        for s in r['sections']:
            c = Counter(row['speaker'] for row in s['rows'] if not row['label'])
            langs = Counter(k for row in s['rows'] for k in ('english', 'coptic', 'arabic') if row.get(k))
            print(f"  {s['title'].get('english','?')[:55]:55} | {dict(c)} | {dict(langs)}")
