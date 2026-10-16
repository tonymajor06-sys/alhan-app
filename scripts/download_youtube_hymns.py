import os, sys, subprocess, json, re

# YouTube hymn download specification
TARGETS = [
    {
        'id': 'KT6DKKwESLI',
        'file': 'arsani-yt-kiahk-first-explanation.m4a',
        'hymns': ['kiahk-midnight-hymn-41'],
        'language': 'arabic',
        'title': 'Kiahk 1st Explanation'
    },
    {
        'id': 'ShiGyujp3LQ',
        'file': 'arsani-yt-kiahk-second-explanation.m4a',
        'hymns': ['kiahk-midnight-hymn-43'],
        'language': 'arabic',
        'title': 'Kiahk 2nd Explanation'
    },
    {
        'id': 'EJudwdx9aug',
        'file': 'arsani-yt-kiahk-sixth-explanation.m4a',
        'hymns': ['kiahk-midnight-hymn-51'],
        'language': 'arabic',
        'title': 'Kiahk 6th Explanation (Aarons Censer)'
    },
    {
        'id': 'paQ8caDpQ-0',
        'file': 'arsani-yt-kiahk-aspasmos-adam-zechariah.m4a',
        'hymns': ['kiahk-liturgy-hymn-19'],
        'language': 'arabic',
        'title': 'Luke 1 / Adam Aspasmos Zechariah (Khatarat Hamama)'
    },
    {
        'id': '5wuO9SS65S4',
        'file': 'arsani-yt-kiahk-ode.m4a',
        'hymns': ['kiahk-midnight-kiahk-ode'],
        'language': 'coptic',
        'title': 'Kiahk Ode'
    },
    {
        'id': 'QWU7mqPqy9Y',
        'file': 'arsani-yt-kiahk-agios-2015.m4a',
        'hymns': ['kiahk-midnight-agios'],
        'language': 'coptic',
        'title': 'Kiahk Agios O Theos'
    },
    {
        'id': 'CLDBxPzPsPE',
        'file': 'arsani-yt-cross-vespers.m4a',
        'hymns': ['cross-vespers-hymn-exposition-introduction', 'cross-vespers-gospel-response'],
        'language': 'coptic',
        'title': 'Cross Vespers'
    },
    {
        'id': 'Qh85DR_PpKE',
        'file': 'arsani-yt-cross-doxologies.m4a',
        'hymns': ['cross-matins-doxology', 'cross-vespers-doxology'],
        'language': 'coptic',
        'title': 'Cross Doxologies'
    },
    {
        'id': 'bRm67CQsgJs',
        'file': 'arsani-yt-cross-verses-of-cymbals.m4a',
        'hymns': ['cross-matins-verses-of-the-cymbal', 'cross-vespers-verses-of-the-cymbal'],
        'language': 'coptic',
        'title': 'Cross Verses of the Cymbals'
    },
    {
        'id': 'xky1pvu_GkQ',
        'file': 'arsani-yt-kiahk-st-anthony.m4a',
        'hymns': ['kiahk-midnight-hymn-24'],
        'language': 'arabic',
        'title': 'Kiahk St Anthony Praise'
    },
    {
        'id': 'cUWjw1NPRq0',
        'file': 'arsani-yt-kiahk-anba-mousa.m4a',
        'hymns': ['kiahk-midnight-hymn-26'],
        'language': 'arabic',
        'title': 'Kiahk St Moses the Black Praise'
    },
    {
        'id': 'H6bYY7QOxBY',
        'file': 'arsani-yt-covenant-thursday-fai-etafenf.m4a',
        'hymns': ['holyweek-covenant-thursday-fai-etav-enf'],
        'language': 'coptic',
        'title': 'Covenant Thursday Fai Etafenf'
    },
    {
        'id': 'uGuAHngG6v8',
        'file': 'arsani-yt-covenant-thursday-youdas.m4a',
        'hymns': ['holyweek-covenant-thursday-the-procession-of-judas', 'holyweek-covenant-thursday-avchnon'],
        'language': 'coptic',
        'title': 'Covenant Thursday Procession of Judas'
    },
    {
        'id': 'aruEtpq3Ly4',
        'file': 'arsani-yt-covenant-thursday-agios.m4a',
        'hymns': ['holyweek-covenant-thursday-agios'],
        'language': 'coptic',
        'title': 'Covenant Thursday Agios'
    },
    {
        'id': 'IpzDQ_u14Z8',
        'file': 'arsani-yt-covenant-thursday-praxis.m4a',
        'hymns': ['holyweek-covenant-thursday-acts-of-the-apostles'],
        'language': 'coptic',
        'title': 'Covenant Thursday Praxis'
    },
    {
        'id': 'pKJPerbG4ss',
        'file': 'arsani-yt-good-friday-6th-taishouri.m4a',
        'hymns': ['holyweek-great-friday-6th-hour-taishoury'],
        'language': 'coptic',
        'title': 'Good Friday 6th Hour Tai Shouri'
    },
    {
        'id': 'H3SzASa2WOM',
        'file': 'arsani-yt-good-friday-6th-pauline.m4a',
        'hymns': ['holyweek-great-friday-6th-hour-pauline'],
        'language': 'coptic',
        'title': 'Good Friday 6th Hour Pauline & Fai Etafenf'
    },
    {
        'id': 'aDP2AaWMxb0',
        'file': 'arsani-yt-good-friday-9th-tishouri.m4a',
        'hymns': ['holyweek-great-friday-9th-hour-teeshoory'],
        'language': 'coptic',
        'title': 'Good Friday 9th Hour Ti Shouri'
    },
    {
        'id': 'xLG-isPvqAk',
        'file': 'arsani-yt-good-friday-pekethronos.m4a',
        'hymns': ['holyweek-great-friday-12th-hour-pekethronos'],
        'language': 'coptic',
        'title': 'Good Friday 12th Hour Pekethronos'
    },
    {
        'id': 'IoDwi9X3gJA',
        'file': 'arsani-yt-good-friday-agios.m4a',
        'hymns': ['holyweek-great-friday-omonogenyc'],
        'language': 'coptic',
        'title': 'Good Friday Agios'
    },
    {
        'id': 'hKY_j1Asg_8',
        'file': 'arsani-yt-bright-saturday-psalm-151.m4a',
        'hymns': ['holyweek-apocalypse-praises-psalm-151'],
        'language': 'coptic',
        'title': 'Bright Saturday Psalm 151'
    },
    {
        'id': 'JNPe5hXQLjo',
        'file': 'arsani-yt-lazarus-saturday-gospel.m4a',
        'hymns': ['palmsunday-liturgy-gospel-response', 'palmsunday-vespers-gospel-response-lazarus-saturday'],
        'language': 'coptic',
        'title': 'Lazarus Saturday Gospel'
    },
    {
        'id': '4hqaF2JIeXs',
        'file': 'arsani-yt-palm-sunday-vesper-praises.m4a',
        'hymns': ['palmsunday-vespers-praises'],
        'language': 'coptic',
        'title': 'Palm Sunday Vespers Praises'
    },
    {
        'id': 'ntkDfNwHpzs',
        'file': 'arsani-yt-palm-sunday-distribution.m4a',
        'hymns': ['palmsunday-distribution-the-hymn-of-palm-sunday'],
        'language': 'coptic',
        'title': 'Palm Sunday Distribution'
    },
    {
        'id': 'A-YK-H5lRYk',
        'file': 'arsani-yt-kiahk-i-open-my-mouth.m4a',
        'hymns': ['kiahk-midnight-hymn-37'],
        'language': 'arabic',
        'title': 'Kiahk I Open My Mouth With Praise'
    },
    {
        'id': 'KKc-CcertAc',
        'file': 'arsani-yt-kiahk-tenen-2016.m4a',
        'hymns': ['kiahk-midnight-the-three-holy-youth-tenen'],
        'language': 'coptic',
        'title': 'Kiahk Song of 3 Holy Youth (Tenen)'
    },
    {
        'id': '2jN98buH15U',
        'file': 'arsani-yt-kiahk-ya-mrym.m4a',
        'hymns': ['kiahk-midnight-ya-m-r-y-m'],
        'language': 'arabic',
        'title': 'Kiahk Ya M-R-Y-M'
    },
    {
        'id': '2WbrC1BFG1w',
        'file': 'arsani-yt-kiahk-amdah-azraa.m4a',
        'hymns': ['kiahk-midnight-amdah-azraa-wa-batoul'],
        'language': 'arabic',
        'title': 'Kiahk Praise Amdah Azraa Wa Batoul'
    },
    {
        'id': 'Am1Po47n_B4',
        'file': 'arsani-yt-kiahk-ashkorak.m4a',
        'hymns': ['kiahk-midnight-ashkorak-ya-rabb-israeel'],
        'language': 'arabic',
        'title': 'Kiahk Praise Ashkorak Ya Rabb Israeel'
    },
    {
        'id': 'F8mzNQZrl-I',
        'file': 'arsani-yt-nativity-paramoun-ana-awel-kalami.m4a',
        'hymns': ['nativity-paramoun-distribution-melody'],
        'language': 'arabic',
        'title': 'Nativity Paramoun Distribution Melody (Ana Awel Kalami)'
    },
    {
        'id': '7vZXz04A0P4',
        'file': 'arsani-yt-resurrection-distribution.m4a',
        'hymns': ['resurrection-liturgy-distribution'],
        'language': 'coptic',
        'title': 'Resurrection Distribution'
    },
    {
        'id': '5F0E-20w4Yk',
        'file': 'arsani-yt-pentecost-distribution.m4a',
        'hymns': ['pentecost-distribution'],
        'language': 'coptic',
        'title': 'Pentecost Distribution'
    },
    {
        'id': '5tLY-yAutEU',
        'file': 'arsani-yt-apostles-distribution.m4a',
        'hymns': ['apostles-liturgy-distribution'],
        'language': 'coptic',
        'title': 'Apostles Fast Distribution'
    },
    {
        'id': 'LLveSdi65D4',
        'file': 'arsani-yt-apostles-tamgeed.m4a',
        'hymns': ['apostles-fast-tamgeed'],
        'language': 'arabic',
        'title': 'Apostles Glorification'
    },
    {
        'id': 'AWseF8iFkOY',
        'file': 'arsani-yt-st-mary-tamgeed.m4a',
        'hymns': ['st-mary-glorification'],
        'language': 'arabic',
        'title': 'St Mary Glorification'
    },
    {
        'id': 'jnlBZjpcusM',
        'file': 'arsani-yt-pope-kyrillos-tamgeed.m4a',
        'hymns': ['annual-matins-doxology-pope-kyrillos-vi', 'annual-vespers-doxology-pope-kyrillos-vi', 'annual-midnight-doxology-pope-kyrillos'],
        'language': 'arabic',
        'title': 'Pope Kyrillos VI Glorification'
    },
    {
        'id': 'kbKtUG7SP10',
        'file': 'arsani-yt-st-mina-tamgeed.m4a',
        'hymns': ['annual-matins-doxology-st-mena', 'annual-vespers-doxology-st-mena', 'annual-midnight-doxology-st-mena'],
        'language': 'arabic',
        'title': 'St Mina Glorification'
    },
    {
        'id': '8KYVeTkGCbo',
        'file': 'arsani-yt-st-george-tamgeed.m4a',
        'hymns': ['annual-matins-doxology-st-george', 'annual-vespers-doxology-st-george', 'annual-midnight-doxology-st-george'],
        'language': 'arabic',
        'title': 'St George Glorification'
    },
    {
        'id': 'Wkdi37BTaRw',
        'file': 'arsani-yt-st-mercurius-tamgeed.m4a',
        'hymns': ['annual-matins-doxology-philopater-mercurius', 'annual-vespers-doxology-philopater-mercurius', 'annual-midnight-doxology-philopater-mercurius'],
        'language': 'arabic',
        'title': 'St Mercurius Glorification'
    },
    {
        'id': 'jeRdUoP1tmY',
        'file': 'arsani-yt-st-demiana-tamgeed.m4a',
        'hymns': ['annual-matins-doxology-st-demiana', 'annual-vespers-doxology-st-demiana', 'annual-midnight-doxology-st-demiana'],
        'language': 'arabic',
        'title': 'St Demiana Glorification'
    },
    {
        'id': 'fpXPTj937tU',
        'file': 'arsani-yt-anba-abraam-tamgeed.m4a',
        'hymns': ['annual-matins-doxology-anba-abraam', 'annual-vespers-doxology-anba-abraam', 'annual-midnight-doxology-anba-abraam'],
        'language': 'arabic',
        'title': 'Anba Abraam Glorification'
    }
]

def get_clarity_score(filepath):
    if not os.path.exists(filepath):
        return -999.0, 'missing'
    probe_cmd = [
        os.path.expanduser('~/.local/bin/ffprobe'),
        '-v', 'quiet',
        '-print_format', 'json',
        '-show_format', '-show_streams',
        filepath
    ]
    try:
        probe_res = json.loads(subprocess.check_output(probe_cmd).decode('utf-8'))
        fmt = probe_res.get('format', {})
        streams = probe_res.get('streams', [{}])
        audio_stream = next((s for s in streams if s.get('codec_type') == 'audio'), streams[0])
        bit_rate = int(fmt.get('bit_rate', 0) or audio_stream.get('bit_rate', 0) or 128000)
    except Exception as e:
        bit_rate = 128000

    vol_cmd = [
        os.path.expanduser('~/.local/bin/ffmpeg'),
        '-i', filepath,
        '-af', 'highpass=f=7000,volumedetect',
        '-f', 'null', '/dev/null'
    ]
    try:
        p = subprocess.Popen(vol_cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
        _, err = p.communicate()
        err_str = err.decode('utf-8', errors='ignore')
        
        mean_vol = -90.0
        for line in err_str.split('\n'):
            if 'mean_volume:' in line:
                m = re.search(r'mean_volume:\s*(-?[\d\.]+)\s*dB', line)
                if m: mean_vol = float(m.group(1))
    except Exception as e:
        mean_vol = -90.0

    bitrate_score = min(40.0, (bit_rate / 1000.0) * 0.25)
    hf_norm = max(0.0, min(1.0, (mean_vol - (-65.0)) / ( -20.0 - (-65.0) )))
    hf_score = hf_norm * 60.0
    total_score = round(bitrate_score + hf_score, 2)
    return total_score, f'bitrate={bit_rate//1000}k, hf_mean={mean_vol}dB'

os.makedirs('/tmp/yt_raw', exist_ok=True)
os.makedirs('assets/audio', exist_ok=True)

env = os.environ.copy()
env['PATH'] = os.path.expanduser('~/.local/bin:') + env.get('PATH', '')

results = []

for idx, item in enumerate(TARGETS):
    item_id = item['id']
    item_file = item['file']
    item_title = item['title']
    raw_path = f'/tmp/yt_raw/{item_id}.m4a'
    out_path = f'assets/audio/{item_file}'
    
    print(f'[{idx+1}/{len(TARGETS)}] {item_title} ({item_id})...')
    
    if not os.path.exists(raw_path):
        dl_cmd = [
            os.path.expanduser('~/.local/bin/yt-dlp'),
            '--ffmpeg-location', os.path.expanduser('~/.local/bin'),
            '-x', '--audio-format', 'm4a',
            '-o', f'/tmp/yt_raw/{item_id}.%(ext)s',
            f'https://www.youtube.com/watch?v={item_id}'
        ]
        try:
            subprocess.check_call(dl_cmd, env=env)
        except Exception as e:
            print(f'Failed to download {item_id}: {e}')
            continue

    if not os.path.exists(out_path):
        # Trim leading silence / noise, transcode to 128k AAC m4a
        proc_cmd = [
            os.path.expanduser('~/.local/bin/ffmpeg'),
            '-y', '-i', raw_path,
            '-af', 'silenceremove=start_periods=1:start_duration=0.5:start_threshold=-35dB',
            '-c:a', 'aac', '-b:a', '128k',
            out_path
        ]
        try:
            subprocess.check_call(proc_cmd, env=env)
        except Exception as e:
            print(f'Failed to process {item_file}: {e}')
            continue
            
    score, details = get_clarity_score(out_path)
    print(f'  ✓ Saved: {item_file} | Clarity score: {score} ({details})')
    results.append({**item, 'score': score, 'details': details})

with open('/tmp/yt_processed_results.json', 'w') as f:
    json.dump(results, f, indent=2)

print('All targeted YouTube hymns successfully processed!')
