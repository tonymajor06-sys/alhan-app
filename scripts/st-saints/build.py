# Builds src/data/st-saints.ts from the Spirit & Truth captures in captures/st-saints (kept out of git):
# its Doxologies and Veneration pages, and the saints' verses of Evening Incense and the Liturgy of the Word,
# read with every box in its Saint Selection ticked. python3 -I scripts/st-saints/build.py
import json, re

C = 'captures/st-saints/'
load = lambda n: json.load(open(C + n + '.json', encoding='utf8'))

# id, name, Arabic name, feast days (Coptic month, day), what finds the saint in a title or verse (first match wins)
SAINTS = [
    ('mary-magdalene', 'St. Mary Magdalene', 'القديسة مريم المجدلية', [(11, 28)], r'Magdalene'),
    ('mary-of-egypt', 'St. Mary of Egypt', 'القديسة مريم المصرية', [(8, 6)], r'Mary of Egypt'),
    ('heavenly-beings', 'All the Heavenly Beings', 'جميع السمائيين', [(3, 12)], r'All the Heavenly Beings|seven archangels|heavenly orders'),
    ('michael', 'Archangel Michael', 'رئيس الملائكة ميخائيل', [(3, 12), (10, 12)], r'Michael'),
    ('gabriel', 'Archangel Gabriel', 'رئيس الملائكة غبريال', [(4, 22), (10, 13)], r'Gabriel'),
    ('raphael', 'Archangel Raphael', 'رئيس الملائكة رافائيل', [(13, 3)], r'Raphael'),
    ('suriel', 'Archangel Suriel', 'رئيس الملائكة سوريال', [(5, 27)], r'Suriel'),
    ('four-creatures', 'Four Incorporeal Creatures', 'الأربعة الحيوانات غير المتجسدين', [(3, 8)], r'[Ff]our [Ii]ncorporeal|four incorporeal'),
    ('twenty-four', 'Twenty Four Priests', 'الأربعة والعشرون قسيساً', [(3, 24)], r'Twenty Four|twenty four'),
    ('children', 'Children of Bethlehem', 'أطفال بيت لحم', [(5, 3)], r'Children of Bethlehem|hundred and forty four'),
    ('john-baptist', 'St. John the Baptist', 'القديس يوحنا المعمدان', [(1, 2), (10, 30)], r'John the Baptist|forerunner'),
    ('joseph', 'St. Joseph the Carpenter', 'القديس يوسف النجار', [(11, 26)], r'Joseph'),
    ('peter-seal', 'St. Peter Seal of the Martyrs', 'البابا بطرس خاتم الشهداء', [(3, 29)], r'Seal of|Abba Peter the holy martyr'),
    ('patriarchs', 'Patriarchs Abraham, Isaac and Jacob', 'الآباء إبراهيم وإسحق ويعقوب', [(12, 28)], r'Abraham, Isaac'),
    ('peter-paul', 'St. Peter and St. Paul', 'القديسان بطرس وبولس', [(11, 5)], r'Peter and St Paul|our father Peter'),
    ('peter', 'St. Peter the Apostle', 'القديس بطرس الرسول', [(11, 5)], r'St\. Peter the Apostle'),
    ('apostles', 'The Apostles', 'الآباء الرسل', [(11, 5)], r'[Tt]he [Aa]postles\b'),
    ('john-evangelist', 'St. John the Evangelist', 'القديس يوحنا الإنجيلي', [(5, 4)], r'John the Evangelist|John: the evangelist|John the Apostle'),
    ('stephen', 'St. Stephen the Archdeacon', 'القديس إسطفانوس رئيس الشمامسة', [(5, 1)], r'Stephen'),
    ('antony-paul', 'St. Antony and St. Paul', 'القديسان أنطونيوس وبولا', [(5, 22), (6, 2)], r'Antony and St Paul|Abba Antony'),
    ('antony', 'St. Antony', 'القديس أنطونيوس', [(5, 22)], r'St\.? Antony'),
    ('pishoy-kamel', 'St. Pishoy Kamel', 'القديس بيشوي كامل', [(7, 12)], r'Pishoy Kamel'),
    ('pishoy-paul', 'St. Pishoy and St. Paul of Tammah', 'الأنبا بيشوي والأنبا بولا الطموهي', [(11, 8), (1, 7)], r'Pishoy and St Paul|Abba Pishoy|abba Pishoy'),
    ('pishoy', 'St. Pishoy', 'القديس الأنبا بيشوي', [(11, 8)], r'St\. Bishoy'),
    ('paul-hermit', 'St. Paul the Hermit', 'القديس أنبا بولا', [(6, 2)], r'Paul the Hermit|holy Abba Paul'),
    ('paul', 'St. Paul the Apostle', 'القديس بولس الرسول', [(11, 5)], r'St\.? Paul the Apostle|our father Paul|teacher Paul'),
    ('mark', 'St. Mark the Apostle', 'القديس مرقس الرسول', [(8, 30)], r'\bMark\b'),
    ('luke', 'St. Luke the Evangelist', 'القديس لوقا الإنجيلي', [(2, 22)], r'\bLuke\b'),
    ('timothy', 'St. Timothy the Apostle', 'القديس تيموثاوس الرسول', [(5, 23)], r'Timothy'),
    ('cyriacus', 'St. Cyriacus and St. Julitta', 'القديس كرياكوس وأمه يوليطة', [(11, 15)], r'Cyriacus|Cyricaus'),
    ('george-new', 'St. George the New Martyr', 'الشهيد مار جرجس المزاحم', [(10, 19)], r'George the New|George Muzahim'),
    ('george', 'St. George Prince of Martyrs', 'الشهيد مار جرجس', [(8, 23), (3, 7)], r'George'),
    ('theodore-anatolius', 'St. Theodore Anatolius', 'القديس تادرس المشرقي', [(5, 12)], r'Anatolius'),
    ('theodore', 'St. Theodore of Shotep', 'القديس تادرس الشطبي', [(11, 20)], r'Theodore'),
    ('mercurius', 'St. Philopater Mercurius', 'الشهيد فيلوباتير مرقوريوس', [(3, 25)], r'Mercurius'),
    ('mena', 'St. Mena the Wonderworker', 'الشهيد مار مينا العجائبي', [(3, 15)], r'St Mena|St\. Mena|Abba Mina|Abba Mena'),
    ('apanoub', 'St. Apanoub of Nehis', 'الشهيد أبانوب النهيسي', [(11, 24)], r'Apanoub'),
    ('victor', 'St. Victor Son of Romanus', 'القديس بقطر بن رومانوس', [(8, 27)], r'Victor'),
    ('eskhyron', 'St. Eskhyron of Callin', 'القديس أباسخيرون القليني', [(10, 7)], r'Eskhyron'),
    ('sergius', 'St. Sergius and St. Bacchus', 'القديسان سرجيوس وواخس', [(2, 10)], r'Sergius'),
    ('cosmas', 'St. Cosmas and St. Demian', 'القديسان قزمان ودميان', [(3, 22)], r'Cosmas'),
    ('apakir', 'St. Apakir and St. John', 'القديسان أباكير ويوحنا', [(6, 6)], r'[AE]?[Aa][pb]akir'),
    ('sarapamon', 'St. Sarapamon Bishop of Nikios', 'القديس سرابامون أسقف نيقيوس', [(3, 28)], r'Sarapamon'),
    ('maurice', 'St. Maurice and the Theban Legion', 'القديس موريس والكتيبة الطيبية', [(1, 25)], r'Maurice'),
    ('akhmim', 'The Martyrs of Akhmim', 'شهداء إخميم', [(3, 29)], r'[Mm]artyrs of Akhmim'),
    ('libya', 'The Twenty-One Martyrs of Libya', 'شهداء ليبيا', [(6, 8)], r'Libya'),
    ('demiana', 'St. Demiana', 'القديسة دميانة', [(5, 13)], r'Demiana'),
    ('barbara', 'St. Barbara and St. Juliana', 'القديستان بربارة ويوليانة', [(4, 8)], r'Barbara|Juliana'),
    ('marina', 'St. Marina the Martyr', 'الشهيدة مارينا', [(11, 23)], r'Marina'),
    ('rebecca', 'St. Rebecca and Her Five Children', 'الشهيدة رفقة وأولادها الخمسة', [(1, 7)], r'Rebecca|Rebekah|accepted many sufferings'),
    ('justina', 'St. Cyprian and St. Justina', 'الشهيد كبريانوس والشهيدة يوستينا', [(1, 21)], r'Justina'),
    ('constantine', 'King Constantine and Queen Helen', 'الملك قسطنطين والملكة هيلانة', [(7, 28), (9, 9)], r'Constantine'),
    ('athanasius', 'St. Athanasius the Apostolic', 'القديس أثناسيوس الرسولي', [(9, 7)], r'Athanasius'),
    ('gregory', 'St. Gregory the Theologian', 'القديس غريغوريوس الناطق بالإلهيات', [(1, 24)], r'Gregory'),
    ('severus', 'St. Severus Patriarch of Antioch', 'القديس ساويرس الأنطاكي', [(6, 14)], r'Severus'),
    ('kyrillos', 'St. Pope Kyrillos VI', 'البابا كيرلس السادس', [(6, 30)], r'Kyrillos'),
    ('cyril', 'St. Cyril of Alexandria', 'القديس كيرلس الإسكندري', [(11, 3)], r'Cyril'),
    ('thomas', 'St. Thomas the Hermit', 'القديس الأنبا توماس السائح', [(9, 27)], r'Thomas'),
    ('macarius-alexandria', 'St. Macarius of Alexandria', 'القديس مقاريوس الإسكندري', [(9, 6)], r'Macarius of Alexandria'),
    ('macarius', 'St. Macarius the Great', 'القديس أبو مقار الكبير', [(7, 27)], r'Maca?rius|Makari'),
    ('john-short', 'St. John the Short', 'القديس يوحنا القصير', [(2, 20)], r'John the [Ss]hort|Colobos'),
    ('maximus', 'St. Maximus and St. Dometius', 'القديسان مكسيموس ودوماديوس', [(5, 17)], r'Maximus'),
    ('moses', 'St. Moses the Strong', 'القديس الأنبا موسى القوي', [(10, 24)], r'Moses'),
    ('isidore', 'St. Isidore the Priest', 'القديس أنبا إيسيذوروس القس', [], r'Isidore'),
    ('john-kame', 'St. John Kame', 'القديس الأنبا يؤانس كاما', [(4, 25)], r'John Kame'),
    ('misael', 'St. Misael the Anchorite', 'القديس الأنبا ميصائيل السائح', [(4, 13)], r'Misael'),
    ('shenouda', 'St. Shenouda the Archimandrite', 'القديس الأنبا شنوده رئيس المتوحدين', [(11, 7)], r'Shenute|Shenouda'),
    ('besa', 'St. Besa', 'القديس الأنبا ويصا', [], r'Besa'),
    ('samuel', 'St. Samuel the Confessor', 'القديس الأنبا صموئيل المعترف', [(4, 8)], r'Samuel'),
    ('nopher', 'St. Nopher the Anchorite', 'القديس أبو نفر السائح', [(10, 16), (3, 16)], r'Nopher'),
    ('karas', 'St. Karas the Anchorite', 'القديس أنبا كاراس السائح', [(11, 8)], r'Karas'),
    ('parsouma', 'St. Parsouma the Naked', 'القديس برسوم العريان', [(13, 5)], r'Parsou?o?ma'),
    ('roweis', 'St. Roweis', 'القديس الأنبا رويس', [(2, 21)], r'Ro?weis|Rowies|Teji'),
    ('bashnouna', 'St. Bashnouna the Monk and Martyr', 'القديس بشنونة الراهب', [(9, 24)], r'Bashnouna'),
    ('takla', 'St. Takla Haymanout', 'القديس تكلا هيمانوت', [(12, 24)], r'Takla'),
    ('simon', 'St. Simon the Tanner', 'القديس سمعان الخراز', [(4, 6)], r'Simon'),
    ('hilaria', 'St. Hilaria', 'القديسة إيلارية', [(5, 21)], r'Hilaria'),
    ('verena', 'St. Verena', 'القديسة فيرينا', [(1, 4)], r'Verena'),
    ('monica', 'St. Monica and St. Augustine', 'القديسة مونيكا والقديس أغسطينوس', [(12, 22)], r'Monica|Augustine'),
    ('three-youth', 'The Three Holy Youth', 'الثلاثة فتية القديسين', [(9, 10)], r'Three Holy Youth|three holy youth|three: holy youth'),
    ('abraam', 'St. Abraam Bishop of Fayoum', 'القديس الأنبا إبرام أسقف الفيوم', [(10, 3)], r'Abraam'),
    ('habib', 'St. Habib Girgis', 'القديس حبيب جرجس', [(12, 15)], r'Habib'),
    ('mary', 'St. Mary the Theotokos', 'القديسة مريم العذراء', [(5, 21), (12, 16)], r'Virgin Mary|Saint Mary|O Mary|Theotokos|golden censer'),
]
find = lambda text: next((s for s in SAINTS if re.search(s[4], text)), None)
slug = lambda s: re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')[:60]

def hymn(id_, title, lines):
    versions = []
    for language, key in (('coptic', 'cop'), ('english', 'en'), ('arabic', 'ar')):
        text = '\n\n'.join(l[key] for l in lines if l[key])
        if text:
            versions.append({'language': language, 'text': text})
    return {'id': id_, 'title': title, 'versions': versions}

def page_hymns(sections, prefix):
    out = []
    seen = set()
    for s in sections:
        key = json.dumps(s['lines'], ensure_ascii=False)
        if not s['lines'] or key in seen:
            continue
        seen.add(key)
        saint = find(s['title'])
        title = f"{s['copticTitle']} ({s['title']})" if s['copticTitle'] else s['title']
        # Spirit & Truth's Arabic headings sometimes misspell the word, as نوكصولوجية or ذوكصولوجية
        ar = re.sub(r'[نذ]وكصولوجية', 'ذكصولوجية', s['arabicTitle'])
        out.append((saint, hymn(f"{prefix}-{slug(s['title'])}", title, s['lines']), ar))
    return out

SKIP = re.compile(r'^(People|Priest|Deacon):$|^Lord have mercy\.$|^O come let us worship|^We are the Christian people|^That we may praise You|^Pray\.$|^Stand up|^Peace be with|^And with your spirit|'
                  r'^We ask You O Son of God|^And his partner|^Let us worship our Savior|^Blessed be the Father|^Through their prayers|^Through the prayers of the saints of this day|^We worship You, O Christ|^Blessed are You indeed, with Your good')

def verse_hymns(lines, prefix, label, label_ar):
    groups = []
    for l in lines:
        if SKIP.search(l['en']):
            continue
        saint = find(l['en'])
        if not saint:
            print('NO SAINT', prefix, l['en'][:90])
            continue
        hit = next((g for g in groups if g[0] is saint), None)
        if hit:
            hit[1].append(l)
        else:
            groups.append((saint, [l]))
    return [(s, hymn(f'{prefix}-{s[0]}', f'{label} for {s[1]}', ls), f'{label_ar}: {s[2]}') for s, ls in groups]

section = lambda page, title: next(s for s in page if s['title'] == title)['lines']
ev, wo = load('ev'), load('wo')
TABS = [
    ('veneration', 'Veneration', 'التمجيد', page_hymns(load('m'), 'veneration')),
    ('other-doxologies', 'Other Doxologies', 'ذكصولوجيات أخرى', page_hymns(load('dx'), 'other-doxology')),
    ('other-intercessions', 'Other Hymns of the Intercessions', 'هيتنيات أخرى', verse_hymns(section(wo, 'Hymn of the Intercessions'), 'other-intercession', 'Intercession', 'هيتينية')),
    ('other-praxis-responses', 'Other Praxis Responses', 'مردات إبركسيس أخرى', verse_hymns(section(wo, 'Praxis Response') + section(wo, 'Alternate Praxis Response'), 'other-praxis-response', 'Praxis Response', 'مرد الإبركسيس')),
    ('other-gospel-responses', 'Other Gospel Responses', 'مردات إنجيل أخرى', verse_hymns(section(ev, 'Gospel Response'), 'other-gospel-response', 'Gospel Response', 'مرد الإنجيل')),
    ('other-cymbals', 'Other Verses of the Cymbals', 'أرباع ناقوس أخرى', verse_hymns(section(ev, 'Verses of the Cymbals'), 'other-cymbals', 'Verses of the Cymbals', 'أرباع الناقوس')),
]

used = set()
for tab in TABS:
    ids = [h['id'] for _, h, _ in tab[3]]
    assert len(ids) == len(set(ids)), [i for i in ids if ids.count(i) > 1]
    print(tab[0], len(ids), 'no saint:', [h['title'][:48] for s, h, _ in tab[3] if not s])
    used |= {s[0] for s, _, _ in tab[3] if s}

js = lambda v: json.dumps(v, ensure_ascii=False)
out = ["import type { Hymn } from './hymns';", '',
       '// The saints as Spirit & Truth (Christian Education, Diocese of Los Angeles; used with permission) has them with every',
       '// box of its Saint Selection ticked: its Veneration and Doxologies pages, and the saints\' verses of the Intercessions,',
       '// the Praxis Response, the Gospel Response and the Verses of the Cymbals. Written by scripts/st-saints/build.py.',
       '// A saint\'s days are [Coptic month, day], for the Upcoming order; the app\'s saints where it has them, else the Synaxarium.',
       'export interface StSaint {', '  name: { en: string; ar: string };', '  days: [number, number][];', '}', '',
       'export const stSaints: Record<string, StSaint> = {']
for s in SAINTS:
    if s[0] in used:
        out.append(f"  {js(s[0])}: {{ name: {{ en: {js(s[1])}, ar: {js(s[2])} }}, days: {js([list(d) for d in s[3]])} }},")
out += ['};', '', 'export interface StSaintTab {', '  id: string;', '  title: string;', '  titleAr: string;',
        '  // In Spirit & Truth\'s order; a hymn without a saint is sung for every saint', '  hymns: Hymn[];', '  saintOf: Record<string, string>;', '  titlesAr: Record<string, string>;', '}', '',
        'export const stSaintTabs: StSaintTab[] = [']
for tid, title, ar, items in TABS:
    out.append(f"  {{ id: {js(tid)}, title: {js(title)}, titleAr: {js(ar)}, hymns: [")
    for _, h, _ in items:
        out.append(f"    {{ id: {js(h['id'])}, title: {js(h['title'])}, versions: [")
        for v in h['versions']:
            out.append(f"      {{ language: '{v['language']}', text: {js(v['text'])} }},")
        out.append('    ] },')
    out.append('  ], saintOf: ' + js({h['id']: s[0] for s, h, _ in items if s}) + ',')
    out.append('  titlesAr: ' + js({h['id']: a for _, h, a in items if a}) + ' },')
out += ['];', '']
open('src/data/st-saints.ts', 'w', encoding='utf8').write('\n'.join(out))
