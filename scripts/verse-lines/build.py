# Writes src/data/verse-lines.ts: hymns whose languages didn't line up verse by verse (2026-11-12, the owner's request
# after Psalm 150). Side by Side pairs verses by their place, so one missing verse puts every verse after it next to
# the wrong one. Run on the hymns as they are built without these fixes:
#   npx tsx scripts/verse-lines/dump.mjs /tmp/hymns.json && python3 -I scripts/verse-lines/build.py /tmp/hymns.json
# Every Arabic verse gets its Arabic in English letters: Psalm 150's written here, the rest from the same Arabic
# elsewhere in the app or from the hymn's own (kept in order); the build stops if a verse is left without one.
import json, os, sys, difflib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from arabic_lines import lexicon, label_of, norm

# Psalm 150 in English letters, written for the app (2026-11-12): the old ones were garbled ("Sabeho Allah fi gamea
# kideseen", the Glory in Greek) and a verse short. ج is g.
PSALM_150 = {norm(a): e for a, e in [
    ('سبحوا الله في قديسيه، هللويا.', 'Sabbihou Allah fi qiddiseeh, hallelouia.'),
    ('سبحوا في فلك قوته، هللويا.', 'Sabbihou fi falak quwwatih, hallelouia.'),
    ('سبحوا على قواته، هللويا.', "Sabbihou 'ala quwwatih, hallelouia."),
    ('سبحوا ككثرة عظمته، هللويا.', "Sabbihou ka-kathrat 'azamatih, hallelouia."),
    ('سبحوا صوت البوق، هللويا.', 'Sabbihou sawt el-bouq, hallelouia.'),
    ('سبحوا بمزمار وقيثارة، هللويا.', 'Sabbihou bi-mizmar wa qeethara, hallelouia.'),
    ('سبحوا بدفوف وصفوف، هللويا.', 'Sabbihou bi-dufouf wa sufouf, hallelouia.'),
    ('سبحوا بأوتار وآلات ذوات أوتار، هللويا.', 'Sabbihou bi-awtar wa alat dhawat awtar, hallelouia.'),
    ('سبحوا بصنوج حسنة الصوت، هللويا.', 'Sabbihou bi-sunoug hasanat es-sawt, hallelouia.'),
    ('سبحوا بصنوج تهليل، هللويا.', 'Sabbihou bi-sunoug tahleel, hallelouia.'),
    ('كل نسمة فلتسبح اسم الرب إلهنا، هللويا.', 'Kull nasama fal-tusabbih ism er-Rabb ilahina, hallelouia.'),
    ('المجد للآب والابن والروح القدس، هللويا.', 'El-magd lil-Ab wal-Ibn war-Rouh el-Qudus, hallelouia.'),
    ('الآن وكل أوان وإلى دهر الدهور آمين، هللويا.', 'El-an wa kull awan wa ila dahr ed-duhour, ameen, hallelouia.'),
    ('المجد لك يا إلهنا، هللويا.', 'El-magd laka ya ilahana, hallelouia.'),
    ('المجد هو لإلهنا، هللويا.', 'El-magd huwa li-ilahina, hallelouia.'),
    ('يا يسوع المسيح ابن الله، اسمعنا وارحمنا.', "Ya Yasou' el-Maseeh Ibn Allah, isma'na warhamna."),
    ('مبارك أنت بالحقيقة مع أبيك الصالح والروح القدس، لأنك أتيت وخلصتنا.', "Mubarakun anta bil-haqeeqa, ma'a abeeka es-salih war-Rouh el-Qudus, li-annaka ateet wa khallastana."),
    # Great Lent's and the feasts' wording
    ('سبحوه في جلد قوته. هلليلويا.', 'Sabbihouhu fi galad quwwatih. Hallelouia.'),
    ('سبحوه على مقدرته. هلليلويا.', "Sabbihouhu 'ala maqdaratih. Hallelouia."),
    ('سبحوه ككثرة عظمته. هلليلويا.', "Sabbihouhu ka-kathrat 'azamatih. Hallelouia."),
    ('سبحوه بمزمار وقيثار. هلليلويا.', 'Sabbihouhu bi-mizmar wa qeethar. Hallelouia.'),
    ('سبحوه بأوتار وأرغن. هلليلويا.', 'Sabbihouhu bi-awtar wa arghan. Hallelouia.'),
    ('سبحوه بصنوج التهليل. هلليلويا.', 'Sabbihouhu bi-sunoug et-tahleel. Hallelouia.'),
    ('كل نسمة فلتسبح إسم الرب إلهنا. هلليلويا.', 'Kull nasama fal-tusabbih ism er-Rabb ilahina. Hallelouia.'),
    ('المجد للآب والابن والروح القدس. هلليلويا.', 'El-magd lil-Ab wal-Ibn war-Rouh el-Qudus. Hallelouia.'),
    ('الآن وكل أوان والى دهر الدهور. آمين. هلليلويا.', 'El-an wa kull awan wa ila dahr ed-duhour. Ameen. Hallelouia.'),
    ('المجد هو لإلهنا. هلليلويا.', 'El-magd huwa li-ilahina. Hallelouia.'),
    # Kiahk's
    ('هلليلويا.', 'Hallelouia.'),
    ('سبحوا الله في جميع قديسيه.', "Sabbihou Allah fi gamee' qiddiseeh."),
    ('+ سبحوه في جلد قوته.', '+ Sabbihouhu fi galad quwwatih.'),
    ('سبحوه على مقدرته.', "Sabbihouhu 'ala maqdaratih."),
    ('+ سبحوه ككثرة عظمته.', "+ Sabbihouhu ka-kathrat 'azamatih."),
    ('سبحوه بصوت البوق.', 'Sabbihouhu bi-sawt el-bouq.'),
    ('+ سبحوه بالمزمار والقيثار.', '+ Sabbihouhu bil-mizmar wal-qeethar.'),
    ('سبحوه بدفوف وصفوف.', 'Sabbihouhu bi-dufouf wa sufouf.'),
    ('+ سبحوه بأوتار وأرغن.', '+ Sabbihouhu bi-awtar wa arghan.'),
    ('سبحوه بصنوج حسنة الصوت.', 'Sabbihouhu bi-sunoug hasanat es-sawt.'),
    ('+ سبحوه بصنوج التهليل.', '+ Sabbihouhu bi-sunoug et-tahleel.'),
    ('كل نسمة فلتسبح اسم الرب الهنا.', 'Kull nasama fal-tusabbih ism er-Rabb ilahina.'),
    ('+ المجد للآب والأبن والروح القدس.', '+ El-magd lil-Ab wal-Ibn war-Rouh el-Qudus.'),
    ('الآن وكل أوان وإلى دهر الداهرين آمين.', 'El-an wa kull awan wa ila dahr ed-dahireen, ameen.'),
    ('+ المجد لإلهنا هلليلويا.', '+ El-magd li-ilahina, hallelouia.'),
    ('المجد لإلهنا هلليلويا.', 'El-magd li-ilahina, hallelouia.'),
    ('+ يا يسوع المسيح ابن الله، إسمعنا وإرحمنا.', "+ Ya Yasou' el-Maseeh Ibn Allah, isma'na warhamna."),
]}
# ...and short responses the hymns had without English letters (or with another verse's in their place)
PSALM_150.update({norm(a): e for a, e in [
    ('يا الله إرحمنا (٢)', 'Ya Allah irhamna (2).'),
    ('هي عند الربِ.', "Hiya 'ind er-Rabb."),
    ('مستحقٌ وعادلٌ.', "Mustahiqqun wa 'adil."),
    ('إلى الشرقِ انظروا.', 'Ila esh-sharq unzurou.'),
    ('أيها الجلوسُ قفوا.', 'Ayyuha el-gulous qifou.'),
    ('ولروحِكَ أيضاً.', 'Wa li-rouhika aydan.'),
]})
GARBLED = ('Sabeho ', 'Sabaho ', 'Kulu nasma', 'Alelluia, Doxa', 'Ke nin ke a ee', 'Doxasi otheos', 'Pi oou fai', 'Esoos piekhristos')

# Verses fixed by hand, by hymn (any copy of it): the language and its whole text, verse by verse
BY_HAND = {
    # The Arabic's first verse had its English pasted in, and the English was missing that verse
    # A verse whose English letters ran into the next one's
    'annual-distribution-listen-o-christs-congregation': {
        'replace_text': {'englishArabic': ["El-Maseeh an'ama lana bil-khalas.aha li-nufus el-mu'mineen", "Raha li-nufus el-mu'mineen"]},
    },
    # The Coptic had the English in it, and each verse's Greek and Coptic as two verses: one verse each now
    'pentecost-distribution-let-us-praise': {'pair_coptic': True},
    'theophany-midnight-watos-exposition-on-fourth-hoos': {
        'replace_first': {
            'arabic': 'نسجد للثالوث المساوي، هذا الذي ظهر لنا على الأردن.',
        },
        'prepend': {'english': 'We worship the co-essential Trinity, who appeared to us upon the Jordan.'},
    },
}

def paras(text):
    return [p.strip() for p in (text or '').split('\n\n') if p.strip()]

def split_flat(text):
    # verses written one to a line, with no blank line between them
    return text.replace('\n', '\n\n') if text and '\n\n' not in text.strip() and text.strip().count('\n') >= 3 else text

similar = lambda x, y: difflib.SequenceMatcher(None, x.lower(), y.lower()).ratio()
is_label = lambda p: p.endswith(':') or (p.startswith('(') and p.endswith(')') and len(p) < 20)

def rebuild(arabic, old, lex, hid, missing):
    ptr, lines = 0, []
    for a in arabic:
        lab = label_of(a)
        if lab:
            if ptr < len(old) and is_label(old[ptr]): ptr += 1
            lines.append(lab); continue
        while ptr < len(old) and is_label(old[ptr]): ptr += 1
        cand = old[ptr] if ptr < len(old) else None
        psalm = PSALM_150.get(norm(a))
        if psalm:
            # "+" starts a verse sung by the other choir: kept in front of the English letters as in the Arabic
            psalm = psalm.lstrip('+ ')
            if a.lstrip().startswith('+'): psalm = '+ ' + psalm
            if cand and (cand.startswith(GARBLED) or similar(psalm, cand) > 0.3): ptr += 1
            lines.append(psalm); continue
        known = lex.get(norm(a))
        if cand and not cand.startswith(GARBLED) and (not known or similar(known, cand) > 0.45):
            lines.append(cand); ptr += 1
        elif known:
            lines.append(known)
        else:
            missing.append((hid, a)); lines.append(a)
    return lines

def main():
    hymns = json.load(open(sys.argv[1]))
    lex = lexicon(hymns)
    out, missing = {}, []
    for h in hymns:
        hid, base = h['id'], h['id'].split('@')[0]
        v = {k: split_flat(t) for k, t in h['v'].items()}
        fixes = {}
        if v != h['v']:
            fixes.update({k: t for k, t in v.items() if t != h['v'][k] and k in ('coptic', 'englishCoptic', 'english', 'arabic', 'englishArabic')})
        hand = BY_HAND.get(base)
        if hand:
            for k, (old, new) in hand.get('replace_text', {}).items():
                if old in (v.get(k) or ''): v[k] = fixes[k] = v[k].replace(old, new)
            if hand.get('pair_coptic'):
                english = set(paras(v.get('english')))
                for k in ('coptic', 'englishCoptic'):
                    ps = paras(v.get(k))
                    if len(ps) <= len(paras(v.get('english'))): continue
                    ps = [p for p in ps if p not in english]
                    label, rest = ([ps[0]], ps[1:]) if is_label(ps[0]) else ([], ps)
                    if len(rest) % 2: continue
                    v[k] = fixes[k] = '\n\n'.join(label + [rest[i] + '\n' + rest[i + 1] for i in range(0, len(rest), 2)])
            for k, t in hand.get('replace_first', {}).items():
                ps = paras(v[k]); ps[0] = t; v[k] = fixes[k] = '\n\n'.join(ps)
            for k, t in hand.get('prepend', {}).items():
                ps = paras(v[k])
                if len(ps) < len(paras(v['arabic'])): v[k] = fixes[k] = '\n\n'.join([t] + ps)
        arabic, latin = paras(v.get('arabic')), paras(v.get('englishArabic'))
        if arabic and latin and (len(arabic) != len(latin) or any(p.startswith(GARBLED) for p in latin)):
            lines = rebuild(arabic, latin, lex, hid, missing)
            text = '\n\n'.join(lines)
            if text != h['v'].get('englishArabic'): fixes['englishArabic'] = text
        if fixes: out[hid] = fixes
    for hid, a in missing: print(f'no English letters for {hid}: {a}', file=sys.stderr)
    if missing: sys.exit(1)
    path = os.path.join(os.path.dirname(__file__), '../../src/data/verse-lines.ts')
    with open(path, 'w', encoding='utf8') as f:
        f.write('// Generated by scripts/verse-lines/build.py: hymns whose languages now line up verse by verse (Psalm 150 and\n')
        f.write("// others, 2026-11-12). Each hymn (by its id, copies included) and the languages whose whole text is replaced.\n")
        f.write('// Applied in hymns-build.ts. Change the script, not this file.\n')
        f.write('export const verseLines: Record<string, Record<string, string>> = ')
        f.write(json.dumps(out, ensure_ascii=False, indent=1))
        f.write(';\n')
    print(f'{len(out)} hymns lined up', file=sys.stderr)

main()
