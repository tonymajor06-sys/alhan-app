"""Cuts Bright Saturday's hymns out of the 2026 service recording (15 parts) into assets/audio.

    python3 -I scripts/st-bright-saturday/slice-audio.py [folder with the parts, default ~/Downloads]

The parts are "Bright Saturday 2026 - Part NN of 15.mp3" (kept out of assets/audio: the upload and waveform scripts
take every file there). The times are Gemini's (2026-11-13), not yet checked: the owner will listen and say which are
wrong. Gemini's times past the end of their part (Part 04's Third Canticle, Part 05's Agios, Part 06's Aripakirizomen
and Morning Doxology, Part 07's Adam Theotokia conclusion, Part 12, Part 13 after 38:12, Part 14) could not be cut.
The readings are not cut: Bright Saturday has hymns only (owner, 2026-11-13). The files go on their hymns in
src/data/arsani-audio.ts. Nine are for hymns Bright Saturday does not have now (the Melismatic Alleluia, Aripresvevin,
Ethve ti-anastasis, Asomatos, Ten-ouosht, the Revelation refrain, the Matins and Ninth Hour psalm chants): they are cut
too but kept out of assets/audio (in ~/Downloads/"Bright Saturday 2026 clips waiting for a hymn") until those hymns
are in. Uses macOS's afconvert.
"""
import os
import subprocess
import sys
import tempfile
import wave

SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/Downloads')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'assets', 'audio')

# (part, start, end, file)
CUTS = [
    (1, '6:06', '8:40', 'bright-saturday-2026-agios-1.m4a'),
    (2, '6:55', '13:51', 'bright-saturday-2026-melismatic-alleluia.m4a'),
    (2, '13:51', '20:30', 'bright-saturday-2026-psalm-151.m4a'),
    (2, '20:31', '24:30', 'bright-saturday-2026-aripresvevin.m4a'),
    (2, '24:31', '30:08', 'bright-saturday-2026-first-canticle.m4a'),
    (5, '1:08', '12:06', 'bright-saturday-2026-third-canticle-arabic.m4a'),
    (5, '12:06', '17:28', 'bright-saturday-2026-ari-psalin.m4a'),
    (5, '17:28', '24:19', 'bright-saturday-2026-tenen.m4a'),
    (5, '32:07', '34:51', 'bright-saturday-2026-ethve-ti-anastasis.m4a'),
    (6, '26:55', '29:40', 'bright-saturday-2026-tenoueh-ensok.m4a'),
    (7, '6:22', '8:36', 'bright-saturday-2026-hymn-of-bright-saturday-1.m4a'),
    (7, '14:44', '24:11', 'bright-saturday-2026-asomatos.m4a'),
    (7, '30:55', '31:55', 'bright-saturday-2026-agios-2.m4a'),
    (8, '0:00', '2:33', 'bright-saturday-2026-tenouosht.m4a'),
    (8, '10:21', '11:21', 'bright-saturday-2026-revelation-refrain.m4a'),
    (9, '0:15', '2:50', 'bright-saturday-2026-matins-psalm-arabic.m4a'),
    (10, '5:29', '10:01', 'bright-saturday-2026-morning-doxology.m4a'),
    (10, '13:48', '16:02', 'bright-saturday-2026-hymn-of-bright-saturday-2.m4a'),
    (10, '18:52', '23:49', 'bright-saturday-2026-matins-psalm-coptic.m4a'),
    (13, '8:40', '13:45', 'bright-saturday-2026-ninth-hour-psalm.m4a'),
    (15, '0:00', '6:07', 'bright-saturday-2026-one-is-the-holy-father.m4a'),
]


def secs(t):
    s = 0
    for x in t.split(':'): s = s * 60 + float(x)
    return s


tmp = tempfile.mkdtemp()
decoded = {}
for part, start, end, name in CUTS:
    if part not in decoded:
        src = os.path.join(SRC, f'Bright Saturday 2026 - Part {part:02d} of 15.mp3')
        decoded[part] = os.path.join(tmp, f'{part}.wav')
        subprocess.run(['afconvert', '-f', 'WAVE', '-d', 'LEI16@44100', src, decoded[part]], check=True)
    w = wave.open(decoded[part])
    rate, total = w.getframerate(), w.getnframes()
    a, b = int(secs(start) * rate), int(secs(end) * rate)
    if b > total: sys.exit(f'{name}: {end} is past the end of Part {part:02d} ({total / rate / 60:.1f} min)')
    w.setpos(a)
    piece = os.path.join(tmp, 'piece.wav')
    with wave.open(piece, 'wb') as o:
        o.setnchannels(w.getnchannels()); o.setsampwidth(w.getsampwidth()); o.setframerate(rate)
        o.writeframes(w.readframes(b - a))
    subprocess.run(['afconvert', '-f', 'm4af', '-d', 'aac', '-b', '128000', piece, os.path.join(OUT, name)], check=True)
    print(f'Part {part:02d} {start}-{end}  {name}')
