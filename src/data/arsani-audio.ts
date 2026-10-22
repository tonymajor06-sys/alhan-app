import type { LanguageType } from './hymns';

// Archdeacon Arsani Sidarous's recordings from the SoundCloud playlist "Archie Arsani Sidarous" (he approved his
// recordings for the app), each with the hymns it is for and the language it is sung in. A hymn that already has a
// recording in that language gets it as another recording to choose. Annual hymns match their own id only (other
// seasons sing them in another tune); a season's hymns also match their copies in that season's other services.
// Note: When multiple recordings exist for the same hymn, the clearer recording is listed first (primary audio).
export const arsaniAudio: { file: string; hymns: string[]; language: LanguageType }[] = [
  // Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ | Teno osht emefiot | Long Watos Antiphonary - Archdeacon Arsani Sidaros
  { file: "arsani-002-teno-osht-emefiot-long-watos-antiphonary-sidaros.m4a", hymns: [], language: "coptic" },
  // Joyful Verses of the Cymbals (Adam) Feast of the Cross | Archdeacon Arsani Sidarous (Primary: score 59.47 vs 52.48 vs 44.22)
  { file: "arsani-003-joyful-verses-of-cymbals-adam-feast-of-cross.m4a", hymns: ["cross-matins-verses-of-the-cymbal", "cross-vespers-verses-of-the-cymbal"], language: "coptic" },
  // Verses of the Cymbals Feast of Cross - YouTube recording (Secondary: score 52.48)
  { file: "arsani-yt-cross-verses-of-cymbals.m4a", hymns: ["cross-matins-verses-of-the-cymbal", "cross-vespers-verses-of-the-cymbal"], language: "coptic" },
  // Verses of Cymbals Feast of Cross (Tertiary: score 44.22)
  { file: "arsani-097-verses-of-cymbals-feast-of-cross.m4a", hymns: ["cross-matins-verses-of-the-cymbal", "cross-vespers-verses-of-the-cymbal"], language: "coptic" },
  // Lipon (Conclusion of Adam Psalis)| Arsani Sidarous and Chorus
  { file: "arsani-004-lipon-conclusion-of-adam-psalis.m4a", hymns: ["annual-midnight-sunday-adam-psali-conclusion", "annual-midnight-monday-adam-psali-conclusion", "annual-midnight-tuesday-adam-psali-conclusion", "annual-vesper-praises-sunday-adam-psali-conclusion", "annual-vesper-praises-monday-adam-psali-conclusion", "annual-vesper-praises-tuesday-adam-psali-conclusion"], language: "coptic" },
  // Asomen (Let Us Praise) - Pentecost Distribution (not the Resurrection's Adam Aspasmos "Marenhos", which has other words)
  { file: "arsani-005-asomen-arsani-sidarous-chorus.m4a", hymns: ["pentecost-distribution-let-us-praise"], language: "coptic" },
  // Atai Parthenos (You are Called / Ten Strings) - Primary: score 67.07
  { file: "arsani-008-atai-parthenos.m4a", hymns: ["annual-veneration-ten-strings", "kiahk-midnight-hymn-13", "kiahk-midnight-hymn-38"], language: "coptic" },
  // Atai Parthenos - Secondary: score 54.22
  { file: "arsani-256-atai-parthenos.m4a", hymns: ["annual-veneration-ten-strings", "kiahk-midnight-hymn-13", "kiahk-midnight-hymn-38"], language: "coptic" },
  // Kata Ni Khoros - Arsani Sidarous
  { file: "arsani-009-kata-ni-khoros.m4a", hymns: ["pentecost-liturgy-kata-nichorous", "pentecost-liturgy-all-the-choirs", "pentecost-distribution-all-the-choirs"], language: "coptic" },
  // Kata Nikhoros - Arsani Sidarous & Mena Fawzy (2nd recording)
  { file: "kata-nikhoros-arsani-mena-fawzy.m4a", hymns: ["pentecost-liturgy-kata-nichorous", "pentecost-liturgy-all-the-choirs", "pentecost-distribution-all-the-choirs"], language: "coptic" },
  // 2nd Hoos + Lobsh (Coptic) | Archdeacon Arsani Sidarous + Chorus
  { file: "arsani-010-2nd-hoos-lobsh-coptic.m4a", hymns: ["annual-midnight-second-canticle"], language: "coptic" },
  // 1st Hos (Coptic)| Archdeacon Arsani Sidarous+ Seattle Deacons
  { file: "arsani-011-1st-hos-coptic-seattle-s.m4a", hymns: ["annual-midnight-first-canticle"], language: "coptic" },
  // Bright Saturday Third Hoos (Evlogite): Arsani Sidarous & St. Abraam Deacons
  { file: "arsani-012-bright-saturday-third-hoos-evlogite.m4a", hymns: ["annual-midnight-third-canticle@holyweek-bright-saturday"], language: "coptic" },
  // Piepnevma - Arsani Sidarous
  { file: "arsani-013-piepnevma.m4a", hymns: ["pentecost-liturgy-hymn-of-the-holy-spirit"], language: "coptic" },
  // I Start With God's Holy Name (Arabic)- Arsani
  { file: "arsani-016-i-start-with-god-s-holy-name-arabic.m4a", hymns: ["annual-veneration-in-the-name"], language: "arabic" },
  // Satanastasis(Resurrection Doxology for Archangel Michael)
  { file: "arsani-018-satanastasis-resurrection-doxology-for-archangel-m.m4a", hymns: ["pentecost-matins-archangel-michael-doxology"], language: "coptic" },
  // Hymn of the Nativity Paramoun - Arsani Sidarous (Primary: score 53.20)
  { file: "arsani-020-hymn-of-nativity-paramoun.m4a", hymns: ["nativity-distribution-paramoun-melody"], language: "arabic" },
  // Nativity Paramoun Melody - Arsani Sidarous & Ramy Kyrillos (Secondary: score 50.48)
  { file: "arsani-262-nativity-paramoun-melody.m4a", hymns: ["nativity-distribution-paramoun-melody"], language: "arabic" },
  // Nativity Communion Melody Ana Awel Kalami (3rd: score 37.28)
  { file: "arsani-143-nativity-communion-melody-ana-awel-kalami.m4a", hymns: ["nativity-distribution-paramoun-melody"], language: "arabic" },
  // Nativity Paramoun Distribution Melody (4th: score 37.15)
  { file: "arsani-332-nativity-paramoun-distribution-melody.m4a", hymns: ["nativity-distribution-paramoun-melody"], language: "arabic" },
  // Great Aspazesthe Nativity 2024 (Watos Aspasmos) - Arsani Sidarous (Score 72.80)
  { file: "arsani-263-great-aspazesthe-nativity-2024.m4a", hymns: ["nativity-liturgy-watos-aspasmos-who-is-born"], language: "coptic" },
  // Hymn for Judas Procession (Primary: score 51.77)
  { file: "arsani-yt-covenant-thursday-youdas.m4a", hymns: ["holyweek-covenant-thursday-the-procession-of-judas", "holyweek-covenant-thursday-avchnon"], language: "coptic" },
  // Hymn for Judas Procession - Abouna Louka (Secondary: score 48.20)
  { file: "arsani-023-hymn-for-judas-procession-abouna-louka.m4a", hymns: ["holyweek-covenant-thursday-the-procession-of-judas", "holyweek-covenant-thursday-avchnon"], language: "coptic" },
  // Pekethronos - Arsani Sidarous (Primary)
  { file: "arsani-024-pekethronos.m4a", hymns: ["holyweek-great-friday-12th-hour-pekethronos"], language: "coptic" },
  // Pekethronos - 12th Hour Good Friday (Secondary: score 50.29)
  { file: "arsani-yt-good-friday-pekethronos.m4a", hymns: ["holyweek-great-friday-12th-hour-pekethronos"], language: "coptic" },
  // Anok Pe Pikoji Psalm 151 - Bright Saturday (Primary: score 62.38)
  { file: "arsani-yt-bright-saturday-psalm-151.m4a", hymns: ["holyweek-apocalypse-praises-psalm-151"], language: "coptic" },
  // Anok Pe Pikoji Psalm 151 - Arsani Sidarous & Fr Luke Sidarous (Secondary: score 52.10)
  { file: "arsani-026-anok-pe-pikoji-psalm-151-fr-luke.m4a", hymns: ["holyweek-apocalypse-praises-psalm-151"], language: "coptic" },
  // Tin Anastasin
  { file: "arsani-027-tin-anastasin.m4a", hymns: ["pentecost-liturgy-your-resurrection"], language: "coptic" },
  // Ϣⲁϣϥ ⲛⲥ̀ⲟⲡ ⲙⲙ̀ⲏⲛⲓ (Seven Times Every Day) - Arsani Sidarous & St. Abraam Deacons
  { file: "arsani-028-st-abraam-s.m4a", hymns: ["kiahk-midnight-hymn-59"], language: "coptic" },
  // Aripsalin-Joe Seif and Deacons from the Diocese of Los Angeles (Live) - Kiahk tune
  { file: "arsani-029-aripsalin-joe-seif-s-from-diocese-of-los-angeles-l.m4a", hymns: ["kiahk-midnight-hymn-17"], language: "coptic" },
  // Ⲧⲁⲓϣⲟⲩⲣⲏ + Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ̀ ┃ Taishori + Hymn of the Intercessions (In Presence of Bishop) - Arsani Sidarous
  { file: "arsani-030-taishori-hymn-of-intercessions.m4a", hymns: ["annual-liturgy-taishori-hitens-bishop"], language: "coptic" },
  // Afrek Etfe (Hymn of the Ascension) - Arsani Sidarous
  { file: "arsani-031-afrek-etfe-hymn-of-ascension.m4a", hymns: ["pentecost-liturgy-he-bowed-heaven"], language: "coptic" },
  // Annual Psalm 150 - Arsani Sidarous
  { file: "arsani-034-annual-psalm-150.m4a", hymns: ["annual-distribution-psalm-150"], language: "coptic" },
  // Pinishti (Short) | Archdeacon Arsani Sidarous
  // One recording cut in two: its first 31 seconds are Let Those Who Read (Ⲛⲏⲉⲧⲱϣ), the rest is Pinishti
  { file: "arsani-035-let-those-who-read.m4a", hymns: ["d-annual-liturgy-faithful-let-those-who-read"], language: "coptic" },
  { file: "arsani-035-pinishti.m4a", hymns: ["d-annual-liturgy-faithful-the-great-abba-antony-pinishti"], language: "coptic" },
  // Feast of Apostles Tamgeed / Watos Aspasmos (Hail to the True)
  { file: "arsani-036-feast-of-apostles-tamgeed.m4a", hymns: ["apostles-liturgy-watos-aspasmos-for-feast-of-apostles-hail-to-the-t"], language: "coptic" },
  // Saturday Psali - Coptic Monastery of St. Shenouda, Rochester, NY
  { file: "arsani-038-saturday-psali-coptic-monastery-of-st-shenouda-roc.m4a", hymns: ["annual-midnight-saturday-watos-psali", "annual-vesper-praises-saturday-watos-psali"], language: "coptic" },
  // Fai Etafenf- Arsani Sidarous (Covenant Thursday) - Primary: score 70.75
  { file: "arsani-039-fai-etafenf.m4a", hymns: ["holyweek-covenant-thursday-fai-etav-enf"], language: "coptic" },
  // Covenant Thursday Fai Etafenf - YouTube (Secondary: score 57.50)
  { file: "arsani-yt-covenant-thursday-fai-etafenf.m4a", hymns: ["holyweek-covenant-thursday-fai-etav-enf"], language: "coptic" },
  // Feast of the Cross Praxis Response (Fai Etafenf) - Arsani Sidarous 2023
  { file: "arsani-084-fai-etafenf-feast-of-cross-2023.m4a", hymns: ["cross-liturgy-praxis-response-feast-of-the-cross"], language: "coptic" },
  // Tov hina (Coptic) | Archdeacon Arsani Sidarous
  { file: "arsani-043-tov-hina-coptic.m4a", hymns: ["d-annual-matins-pray-for-mercy", "d-annual-vespers-pray-for-mercy", "d-annual-offering-lamb-pray-for-mercy"], language: "coptic" },
  // Ya Kol Al Sefoof (All You Heavenly Orders) - Primary: score 88.80
  { file: "arsani-044-ya-kol-al-sefoof.m4a", hymns: ["pentecost-liturgy-ya-kol-alsefoof"], language: "arabic" },
  // Ya Kol A Sefoof - Secondary: score 54.62
  { file: "arsani-248-ya-kol-a-sefoof.m4a", hymns: ["pentecost-liturgy-ya-kol-alsefoof"], language: "arabic" },
  // Tenen - Kiahk 2010 (Primary: score 71.20)
  { file: "arsani-275-tenen-kiahk-2010.m4a", hymns: ["kiahk-midnight-hymn-20", "annual-midnight-three-holy-children@kiahk-midnight"], language: "coptic" },
  // Tenen - Kiahk 2016 (Secondary: score 64.19)
  { file: "arsani-yt-kiahk-tenen-2016.m4a", hymns: ["kiahk-midnight-hymn-20", "annual-midnight-three-holy-children@kiahk-midnight"], language: "coptic" },
  // Tenen and Tenoweh Kiahk (Tertiary: score 40.21)
  { file: "arsani-048-tenen-tenoweh-kiahk.m4a", hymns: ["kiahk-midnight-hymn-20"], language: "coptic" },
  // Melismatic Joyful Agios | Arsani Sidarous and Clergy Chorus (after the regular Agios)
  { file: "arsani-melismatic-joyful-agios.m4a", hymns: ["annual-liturgy-agios"], language: "coptic" },
  // Holy Week Mournful Agios - Primary: score 77.33
  { file: "arsani-049-agios-mournful-tune.m4a", hymns: ["holyweek-pascha-agios", "annual-liturgy-agios@holyweek-bright-saturday"], language: "coptic" },
  // Covenant Thursday Agios - YouTube (Secondary: score 51.66)
  { file: "arsani-yt-covenant-thursday-agios.m4a", hymns: ["holyweek-pascha-agios", "annual-liturgy-agios@holyweek-bright-saturday"], language: "coptic" },
  // Holy Week Mournful Agios - Tertiary: score 39.02
  { file: "arsani-270-agios-mournful-tune.m4a", hymns: ["holyweek-pascha-agios", "annual-liturgy-agios@holyweek-bright-saturday"], language: "coptic" },
  // Holy Week Agios - Quaternary: score 38.08
  { file: "arsani-237-agios-holy-week.m4a", hymns: ["holyweek-pascha-agios", "annual-liturgy-agios@holyweek-bright-saturday"], language: "coptic" },
  // Sunday Theotokia Part 10: JoeSeif's "20- Teoi", then the melismatic tune. If these are split into shorter files,
  // keep "melismatic" in the melismatic files' names: it labels them and puts them after the regular tune (hymns.ts).
  // 20- Teoi | JoeSeif (SoundCloud)
  { file: "sc-joeseif-sunday-theotokia-part-10-teoi.m4a", hymns: ["annual-midnight-sunday-theotokia-part-10", "annual-vesper-praises-sunday-theotokia-part-10"], language: "coptic" },
  // Teoi Enhikanos (Melismatic) - Arsani Sidarous and the Deacons of the LA Diocese
  { file: "arsani-050-teoi-enhikanos-melismatic-s-of-la-diocese.m4a", hymns: ["annual-midnight-sunday-theotokia-part-10", "annual-vesper-praises-sunday-theotokia-part-10"], language: "coptic" },
  // Nim Ghar
  { file: "arsani-051-nim-ghar-i-i.m4a", hymns: ["annual-midnight-sunday-theotokia-part-16", "annual-vesper-praises-sunday-theotokia-part-16"], language: "coptic" },
  // Shere Maria
  { file: "arsani-053-shere-maria.m4a", hymns: ["annual-liturgy-offering-hail-to-mary"], language: "coptic" },
  // Fourth Hoas
  { file: "arsani-054-fourth-hoas-siarous.m4a", hymns: ["annual-midnight-fourth-canticle", "annual-vesper-praises-sunday-fourth-canticle", "annual-vesper-praises-monday-fourth-canticle", "annual-vesper-praises-tuesday-fourth-canticle", "annual-vesper-praises-wednesday-fourth-canticle", "annual-vesper-praises-thursday-fourth-canticle", "annual-vesper-praises-friday-fourth-canticle", "annual-vesper-praises-saturday-fourth-canticle"], language: "coptic" },
  // Palm Sunday Vespers Adam Exposition (Score 42.50)
  { file: "arsani-056-mashenak-exposition-palm-sunday.m4a", hymns: ["palmsunday-vespers-adam-exposition"], language: "coptic" },
  // Cemoti (4 Verses)
  { file: "arsani-057-cemoti-4-verses-seattle-s.m4a", hymns: ["annual-midnight-semouti-ero-dikeos"], language: "coptic" },
  // Marahmak Ya Elahi (Your Mercies O My God) - Primary: score 64.40
  { file: "arsani-059-marahmak-ya-elahi.m4a", hymns: ["kiahk-midnight-hymn-75"], language: "arabic" },
  // Your Mercies O My God (Kiahk 2023) - Secondary: score 61.15
  { file: "arsani-047-your-mercies-o-my-god-kiahk-2023.m4a", hymns: ["kiahk-midnight-hymn-75"], language: "arabic" },
  // Marahmak Ya Elahi (Kiahk 2025) - Tertiary: score 52.22
  { file: "arsani-189-marahmak-ya-elahi-kiahk-2025.m4a", hymns: ["kiahk-midnight-hymn-75"], language: "arabic" },
  // Palm Sunday Psalm 150
  { file: "arsani-060-palm-sunday-psalm-150.m4a", hymns: ["annual-distribution-psalm-150@palmsunday-distribution"], language: "coptic" },
  // Palm Sunday Doxology - Primary: score 55.82
  { file: "arsani-061-palm-sunday-doxology.m4a", hymns: ["palmsunday-vespers-doxology", "palmsunday-matins-doxology"], language: "coptic" },
  // Palm Sunday Doxology - Secondary: score 52.75
  { file: "arsani-095-doxology-for-palm-sunday.m4a", hymns: ["palmsunday-vespers-doxology", "palmsunday-matins-doxology"], language: "coptic" },
  // Adam Psali Resurrection - Arsani Sidarous
  { file: "arsani-062-adam-psali-resurrection.m4a", hymns: ["pentecost-midnight-psali-adam-for-the-holy-fifty-days"], language: "coptic" },
  // Great Lent Arihou O Chasf
  { file: "arsani-063-arihou-o-chasf.m4a", hymns: ["annual-midnight-third-canticle-watos-lobsh@lent-midnight"], language: "coptic" },
  // Ascension Doxology (Owoh Menensa)
  { file: "arsani-064-owoh-menensa-doxology-ascension.m4a", hymns: ["pentecost-matins-ascension-doxology"], language: "coptic" },
  // مديح توزيع برمون الميلاد Arsani Sidarous (Coptic/Arabic)
  { file: "arsani-065-coptic-arabic.m4a", hymns: ["nativity-distribution-your-star-appeared"], language: "coptic" },
  // Kiahk Sixth Explanation (Aaron's Censer) - Primary Coptic: score 52.44
  { file: "arsani-335-aarons-censer.m4a", hymns: ["kiahk-midnight-hymn-51"], language: "coptic" },
  // Kiahk 6th Explanation - YouTube (Primary Arabic: score 52.27)
  { file: "arsani-yt-kiahk-sixth-explanation.m4a", hymns: ["kiahk-midnight-hymn-51"], language: "arabic" },
  // Kiahk Sixth Explanation - Secondary Coptic: score 45.28
  { file: "arsani-068-kiahk-sixth-explanation-censer-of-aaron.m4a", hymns: ["kiahk-midnight-hymn-51"], language: "coptic" },
  // Tennav (We look at the Resurrection)
  { file: "arsani-069-tennav-we-look-at-resurrection.m4a", hymns: ["annual-midnight-the-hymn-of-the-resurrection@pentecost-midnight"], language: "coptic" },
  // Etaven NiEskhai (Feast of the Cross)
  { file: "arsani-073-etaven-nieskhai-feast-of-cross.m4a", hymns: ["cross-matins-the-hymn-of-constantine"], language: "coptic" },
  // Tenen - Arsani Sidarous
  { file: "arsani-074-tenen.m4a", hymns: ["annual-midnight-three-holy-children"], language: "coptic" },
  // Maren Ouonh
  { file: "arsani-075-06-maren-ouonh.m4a", hymns: ["annual-midnight-second-canticle-lobsh"], language: "coptic" },
  // Mournful Ti Shoree+Fai Etaf Enf (Good Friday) - Primary: score 62.00
  { file: "arsani-077-mournful-ti-shoree-fai-etaf-enf-good-friday.m4a", hymns: ["holyweek-great-friday-9th-hour-teeshoory"], language: "coptic" },
  // Good Friday 9th Hour Ti Shouri - YouTube (Secondary: score 54.94)
  { file: "arsani-yt-good-friday-9th-tishouri.m4a", hymns: ["holyweek-great-friday-9th-hour-teeshoory"], language: "coptic" },
  // Annual Aspasmos Watos (Epchois Efnoti)
  { file: "arsani-078-annual-aspasmos-watos-epchois-efnoti-archi-seattle.m4a", hymns: [], language: "coptic" },
  // Pauline Epistle in Coptic - Arsani Sidarous (Introduction to the Pauline Epistle)
  { file: "arsani-sc-pauline-epistle-introduction-coptic.m4a", hymns: ["annual-liturgy-pauline-intro", "d-annual-liturgy-word-pauline-intro", "lent-weekend-liturgy-pauline-intro", "lent-weekday-liturgy-pauline-intro"], language: "coptic" },
  // Ti Epistoly (Good Friday 6th Hour) - Primary: score 86.27
  { file: "arsani-081-ti-epistoly-introduction-to-6th-hour-pauline-epist.m4a", hymns: ["holyweek-great-friday-6th-hour-pauline"], language: "coptic" },
  // Good Friday 6th Hour Pauline - YouTube (Secondary: score 58.48)
  { file: "arsani-yt-good-friday-6th-pauline.m4a", hymns: ["holyweek-great-friday-6th-hour-pauline"], language: "coptic" },
  // Commemoration of the Saints
  { file: "arsani-082-commemoration-of-saints.m4a", hymns: ["annual-midnight-commemoration"], language: "coptic" },
  // 1st & 2nd Joyful Sherat
  { file: "arsani-085-1st-2nd-joyful-sherat-coptic-archangel-michael.m4a", hymns: [], language: "coptic" },
  // Kyrie Eleyson (Lent weekday Matins Verses of the Cymbals)
  { file: "arsani-088-kyrie-eleyson-lent-weekday-matins-verses-of-cymbal.m4a", hymns: ["lent-weekday-matins-verse-of-cymbals"], language: "coptic" },
  // Lenten Shirat
  { file: "arsani-089-lenten-shirat.m4a", hymns: ["lent-midnight-saturday-watos-lobsh-1", "annual-midnight-saturday-watos-lobsh-1@lent-midnight"], language: "coptic" },
  // Shere Theotoke
  { file: "arsani-090-shere-otoke.m4a", hymns: ["annual-veneration-rejoice-o-theotokos"], language: "coptic" },
  // Resurrection Verses of Cymbals
  { file: "arsani-092-resurrection-verses-of-cymbals.m4a", hymns: ["pentecost-matins-verses-of-the-cymbals"], language: "coptic" },
  // Khristos Analimepsis (Major)
  { file: "arsani-102-khristos-analimepsis-major-greek-hymn-for-ascensio.m4a", hymns: ["pentecost-matins-hymn-of-the-ascension"], language: "coptic" },
  // Litany of the Departed (Coptic)
  { file: "arsani-103-litany-of-departed-coptic.m4a", hymns: ["d-annual-matins-pray-for-the-departed", "d-annual-vespers-pray-for-the-departed"], language: "coptic" },
  // Ascension Adam Psali
  { file: "arsani-104-psali-adam-ascension.m4a", hymns: ["pentecost-midnight-psali-adam-for-the-holy-fifty-days@pentecost-matins"], language: "coptic" },
  // Omonogenis - English
  { file: "arsani-106-omonogenis-english-o-only-begotten-son.m4a", hymns: ["holyweek-great-friday-omonogenyc"], language: "english" },
  // Watos Psali Kiahk (Amoini Teero)
  { file: "arsani-107-watos-psali-kiahk-amoini-teero.m4a", hymns: ["kiahk-midnight-watos-psali-before-the-conclusion-of-watos-theotokia", "kiahk-midnight-watos-psali-after-saturday-theotokia"], language: "coptic" },
  // Kiahk Melody for the Trinity
  { file: "arsani-108-kiahk-melody-for-trinity-arabic-english.m4a", hymns: ["kiahk-midnight-hymn-14"], language: "arabic" },
  // Doxology for the Feast of the Cross
  { file: "arsani-109-doxology-for-feast-of-cross.m4a", hymns: ["cross-matins-doxology"], language: "coptic" },
  // ⲧⲟⲩ ⲙⲁⲕⲁⲣⲓⲱ
  { file: "arsani-111-recording.m4a", hymns: ["kiahk-liturgy-hymn-8"], language: "coptic" },
  // Long Praxis Response (Shere Ne Maria) - Primary: score 63.02
  { file: "arsani-240-long-praxis-response-shere-ne-maria.m4a", hymns: [], language: "coptic" },
  // Melismatic Shere Ne Maria - Secondary: score 57.56
  { file: "arsani-115-melismatic-shere-ne-maria-praxis-response.m4a", hymns: [], language: "coptic" },
  // Annual Psalm And Marouetchasf
  { file: "arsani-119-annual-psalm-marouetchasf.m4a", hymns: ["annual-liturgy-psalm-trailer"], language: "coptic" },
  // Nairouz Praxis Response
  { file: "arsani-120-nairouz-praxis-response-vancouver-s.m4a", hymns: ["nayrouz-liturgy-praxis-response-2"], language: "coptic" },
  // First Hoos Lobsh-Khen Oushot
  { file: "arsani-121-first-hoos-lobsh-khen-oushot-s-of-la-diocese.m4a", hymns: ["annual-midnight-first-canticle-lobsh"], language: "coptic" },
  // Nativity Doxology
  { file: "arsani-122-nativity-doxology-st-mercurius-st-abraam-torrance.m4a", hymns: ["nativity-matins-first-doxology"], language: "coptic" },
  // Agios O Theos (Kiahk Holy God) - Primary: score 59.68
  { file: "arsani-123-agios-o-theos-kiahk.m4a", hymns: ["kiahk-midnight-hymn-1"], language: "coptic" },
  // Kiahk Agios O Theos 2015 - YouTube (Secondary: score 45.77)
  { file: "arsani-yt-kiahk-agios-2015.m4a", hymns: ["kiahk-midnight-hymn-1"], language: "coptic" },
  // Nisavev
  { file: "arsani-124-nisavev.m4a", hymns: ["annual-liturgy-offering-all-the-wise-men"], language: "coptic" },
  // Hiteniat
  { file: "arsani-125-hiteniat.m4a", hymns: ["annual-liturgy-hitens"], language: "coptic" },
  // Apekran
  { file: "arsani-127-apekran.m4a", hymns: ["annual-veneration-your-name"], language: "coptic" },
  // Coptic Paschal Praxis | Praxeonton - Primary: score 63.33
  { file: "arsani-130-coptic-paschal-praxis-praxeonton.m4a", hymns: ["holyweek-covenant-thursday-acts-of-the-apostles"], language: "coptic" },
  // Covenant Thursday Praxis - YouTube (Secondary: score 55.90)
  { file: "arsani-yt-covenant-thursday-praxis.m4a", hymns: ["holyweek-covenant-thursday-acts-of-the-apostles"], language: "coptic" },
  // Praxeon Ton The Acts - Tertiary: score 40.08
  { file: "arsani-151-praxeon-ton-the-acts.m4a", hymns: ["holyweek-covenant-thursday-acts-of-the-apostles"], language: "coptic" },
  // Good Friday 6th Hour Tai Shouri - YouTube (Primary: score 54.44)
  { file: "arsani-yt-good-friday-6th-taishouri.m4a", hymns: ["holyweek-great-friday-6th-hour-taishoury"], language: "coptic" },
  // Tayshori Good Friday - Secondary: score 44.48
  { file: "arsani-132-tayshori-good-friday.m4a", hymns: ["holyweek-great-friday-6th-hour-taishoury"], language: "coptic" },
  // Pentecost Melismatic Praxis Response - Primary: score 63.95
  { file: "arsani-133-pentecost-melismatic-praxis-response.m4a", hymns: ["pentecost-liturgy-praxis-response", "pentecost-liturgy-alternate-praxis-response"], language: "coptic" },
  // Resurrection Praxis Response - Secondary: score 37.15
  { file: "arsani-280-resurrection-praxis-response.m4a", hymns: ["pentecost-liturgy-praxis-response", "pentecost-liturgy-alternate-praxis-response"], language: "coptic" },
  // Great Lent The Doxologies
  { file: "arsani-135-great-lent-the-doxologies.m4a", hymns: ["lent-weekday-matins-doxologies", "lent-weekend-matins-doxologies"], language: "coptic" },
  // Ⲡ̀ⲟⲩⲣⲟ┃Festive Epouro
  { file: "arsani-142-festive-epouro.m4a", hymns: ["annual-veneration-hymn-of-joy", "d-order-matrimony-hymn-of-joy"], language: "coptic" },
  // Introduction to the Gospel for Metropolitan Antonious
  { file: "arsani-146-introduction-to-gospel-for-metropolitan-antonious.m4a", hymns: ["d-annual-bishop-introduction-to-the-coptic-gospel-when-read-by-the"], language: "arabic" },
  // Golgotha
  { file: "arsani-154-golgotha.m4a", hymns: ["holyweek-great-friday-golgotha"], language: "coptic" },
  // Kiahk Psalm 150 - Primary: score 77.47
  { file: "arsani-194-kiahk-psalm-150-live-la.m4a", hymns: ["kiahk-distribution-hymn-1", "annual-distribution-psalm-150@kiahk-distribution"], language: "coptic" },
  // Kiahk Psalm 150 - Secondary: score 62.22
  { file: "arsani-190-kiahk-psalm-150-2022.m4a", hymns: ["kiahk-distribution-hymn-1", "annual-distribution-psalm-150@kiahk-distribution"], language: "coptic" },
  // Kiahk Psalm 150 Alleluia - Tertiary: score 58.62
  { file: "arsani-155-kiahk-psalm-150-alleluia.m4a", hymns: ["kiahk-distribution-hymn-1", "annual-distribution-psalm-150@kiahk-distribution"], language: "coptic" },
  // O Nim Nai
  { file: "arsani-157-o-nim-nai.m4a", hymns: ["pentecost-liturgy-o-nimnai"], language: "coptic" },
  // Festive Tenoweh Ensok
  { file: "arsani-162-festive-tenoweh-ensok-i.m4a", hymns: [], language: "coptic" },
  // Third Hoos
  { file: "arsani-163-third-hoos-i.m4a", hymns: ["annual-midnight-third-canticle"], language: "coptic" },
  // Khristos Analimepsis (Minor)
  { file: "arsani-164-khristos-analimepsis-minor-greek-hymn-for-ascensio.m4a", hymns: ["pentecost-matins-hymn-of-the-ascension"], language: "coptic" },
  // Neknai O Panouti
  { file: "arsani-167-neknai-o-panouti-i.m4a", hymns: ["annual-midnight-sunday-adam-theotokias-conclusion", "annual-midnight-monday-adam-theotokias-conclusion", "annual-midnight-tuesday-adam-theotokias-conclusion", "annual-vesper-praises-sunday-adam-theotokias-conclusion", "annual-vesper-praises-monday-adam-theotokias-conclusion", "annual-vesper-praises-tuesday-adam-theotokias-conclusion", "annual-morning-praises-adam-theotokias-conclusion"], language: "coptic" },
  // Evshes (For St. Athanasius)
  { file: "arsani-169-evshes-for-st-athanasius.m4a", hymns: ["d-annual-liturgy-faithful-through-the-prayers-evshes"], language: "coptic" },
  // Lenten Sherat (Saturday Theotokia Lobsh)
  { file: "arsani-172-lenten-sherat-saturday-theotokia-lobsh.m4a", hymns: ["lent-midnight-saturday-watos-lobsh-1", "annual-midnight-saturday-watos-lobsh-1@lent-midnight"], language: "coptic" },
  // Introduction to the Gospel in Presence of General Bishop
  { file: "arsani-174-introduction-to-gospel-in-presence-of-general-bish.m4a", hymns: ["d-annual-bishop-introduction-to-the-coptic-gospel-when-read-by-the"], language: "arabic" },
  // Conclusion of Midnight Praises
  { file: "arsani-183-conclusion-of-midnight-praises-i.m4a", hymns: ["annual-midnight-concluding-hymn"], language: "coptic" },
  // Melismatic Singary Psalm Feast of Theophany
  { file: "arsani-184-melismatic-singary-psalm-feast-of-ophany.m4a", hymns: ["theophany-liturgy-psalm"], language: "coptic" },
  // Ke Eeperto
  { file: "arsani-185-ke-eeperto.m4a", hymns: ["holyweek-pascha-general-ke-eepertou"], language: "coptic" },
  // Shere Tef Anastasis
  { file: "arsani-187-shere-tef-anastasis-w-arshi.m4a", hymns: ["pentecost-liturgy-acts-response"], language: "coptic" },
  // Great Lent Esmou Epchois (Melismatic) - Arsani Sidarous & Seattle Deacons (Score 92.53)
  { file: "arsani-191-esmou-epchois-seattle-deacons.m4a", hymns: ["lent-midnight-esmou-epchois-melismatic"], language: "coptic" },
  // Tov hina (English)
  { file: "arsani-192-tov-hina-english.m4a", hymns: ["d-annual-matins-pray-for-mercy", "d-annual-vespers-pray-for-mercy", "d-annual-offering-lamb-pray-for-mercy"], language: "english" },
  // Introduction to the Exposition for Holy Week
  { file: "arsani-210-introduction-to-exposition-for-holy-week.m4a", hymns: ["holyweek-pascha-general-exposition-introduction"], language: "coptic" },
  // Ommonogenees
  { file: "arsani-213-ommonogenees.m4a", hymns: ["holyweek-great-friday-omonogenyc"], language: "coptic" },
  // Sunday Theotokeya | JoeSeif
  { file: "arsani-223-sunday-adam-psali-conclusion.m4a", hymns: ["annual-midnight-sunday-adam-psali-conclusion", "annual-midnight-monday-adam-psali-conclusion", "annual-midnight-tuesday-adam-psali-conclusion", "annual-vesper-praises-sunday-adam-psali-conclusion", "annual-vesper-praises-monday-adam-psali-conclusion", "annual-vesper-praises-tuesday-adam-psali-conclusion"], language: "coptic" },
  { file: "arsani-223-sunday-theotokia-part-1.m4a", hymns: ["annual-midnight-sunday-theotokia-part-1", "annual-vesper-praises-sunday-theotokia-part-1"], language: "coptic" },
  { file: "arsani-223-sunday-theotokia-part-2.m4a", hymns: ["annual-midnight-sunday-theotokia-part-2", "annual-vesper-praises-sunday-theotokia-part-2"], language: "coptic" },
  { file: "arsani-223-sunday-theotokia-part-3.m4a", hymns: ["annual-midnight-sunday-theotokia-part-3", "annual-vesper-praises-sunday-theotokia-part-3"], language: "coptic" },
  { file: "arsani-223-sunday-theotokia-part-4.m4a", hymns: ["annual-midnight-sunday-theotokia-part-4", "annual-vesper-praises-sunday-theotokia-part-4"], language: "coptic" },
  { file: "arsani-223-sunday-theotokia-part-5.m4a", hymns: ["annual-midnight-sunday-theotokia-part-5", "annual-vesper-praises-sunday-theotokia-part-5"], language: "coptic" },
  { file: "arsani-223-sunday-theotokia-part-6.m4a", hymns: ["annual-midnight-sunday-theotokia-part-6", "annual-vesper-praises-sunday-theotokia-part-6"], language: "coptic" },
  // Aikoti
  { file: "arsani-224-16-aikoti.m4a", hymns: ["annual-midnight-sunday-psali-lord-jesus", "annual-vesper-praises-sunday-psali-lord-jesus"], language: "coptic" },
  // Arise O Children of the Light (Tenthino) - Arsani Sidarous
  { file: "arsani-232-01-tenthino.m4a", hymns: ["annual-midnight-arise-o-children"], language: "coptic" },
  { file: "arsani-204-tenthinou.m4a", hymns: ["annual-midnight-arise-o-children"], language: "coptic" },
  // Evlogimenos (Blessed is He) - Primary: score 83.20
  { file: "arsani-236-evlogimenos.m4a", hymns: ["palmsunday-distribution-the-hymn-of-palm-sunday", "palmsunday-liturgy-evlogymenos", "annual-vespers-blessed-is-he"], language: "coptic" },
  // Evlogimenos - Tertiary: score 43.42
  { file: "arsani-114-evlogimenos.m4a", hymns: [], language: "coptic" },
  // The Great Azpazesthe (Quick Tune)
  { file: "arsani-241-great-azpazes-quick-tune-anton-ibrahim-ayad.m4a", hymns: ["d-annual-liturgy-faithful-greet-one-another-great"], language: "arabic" },
  // Avechenon
  { file: "arsani-243-avechenon.m4a", hymns: ["holyweek-covenant-thursday-avchnon"], language: "coptic" },
  // The Burning Bush - Primary: score 60.40
  { file: "arsani-247-the-burning-bush.m4a", hymns: ["kiahk-midnight-hymn-33", "kiahk-combined-midnight-the-burning-bush"], language: "arabic" },
  // The Burning Bush - Secondary: score 44.21
  { file: "arsani-033-the-burning-bush.m4a", hymns: ["kiahk-midnight-hymn-33", "kiahk-combined-midnight-the-burning-bush"], language: "arabic" },
  // Litany of the Departed (English)
  { file: "arsani-255-litany-of-departed-english.m4a", hymns: ["d-annual-matins-pray-for-the-departed", "d-annual-vespers-pray-for-the-departed"], language: "english" },
  // Enthok Gar Lipon (Resurrection Watos Aspasmos)
  { file: "arsani-257-enthok-gar-lipon-resurrection-watos-aspasmos.m4a", hymns: ["pentecost-liturgy-aspasmos-vatos", "pentecost-liturgy-watos-aspasmos-he-ascended"], language: "coptic" },
  // Let Us Gather
  { file: "arsani-269-2022-marentho-oti-let-us-ga-r-joe-mikhail.m4a", hymns: ["annual-veneration-let-us-gather"], language: "arabic" },
  // The Great High Priest (Meeghalo) - Primary: score 55.28
  { file: "arsani-300-the-great-high-priest-meeghalo.m4a", hymns: ["lent-weekday-the-great-high-priest", "lent-weekend-liturgy-the-great-high-priest"], language: "coptic" },
  // Meghalo + Apenchoice - Secondary: score 53.28
  { file: "arsani-208-meghalo-apenchoice.m4a", hymns: ["lent-weekday-the-great-high-priest", "lent-weekend-liturgy-the-great-high-priest"], language: "coptic" },
  // Saint Mary - Ya M R Y M - YouTube (Primary: score 62.67)
  { file: "arsani-yt-kiahk-ya-mrym.m4a", hymns: ["kiahk-midnight-hymn-61", "annual-veneration-o-mother-of-light"], language: "arabic" },
  // Saint Mary - Ya M R Y M - Secondary: score 57.23
  { file: "arsani-307-saint-mary-ya-m-r-y-m.m4a", hymns: ["kiahk-midnight-hymn-61", "annual-veneration-o-mother-of-light"], language: "arabic" },
  // Thok Te Tea Gome
  { file: "arsani-315-thok-te-tea-gome-9th-hr-eve-of-wed.m4a", hymns: ["holyweek-covenant-thursday-paschal-doxology"], language: "coptic" },
  // Great Lent Psalm 150
  { file: "arsani-333-great-lent-psalm-150.m4a", hymns: ["annual-distribution-psalm-150@lent-weekend", "lent-weekend-psalm-150"], language: "coptic" },
  // Efrahi Ya Mariam / Onof Emmo Maria (Rejoice O Mary)
  { file: "arsani-334-efrahi-ya-mariam-onof-emmo-maria.m4a", hymns: ["kiahk-midnight-hymn-60"], language: "coptic" },
  // St. Mary Glorification - Primary: score 68.93
  { file: "arsani-165-st-mary-glorification.m4a", hymns: ["annual-veneration-hail-to-you-o-mary-2", "annual-veneration-hail-to-you-o-mary"], language: "arabic" },
  // St Mary Glorification - YouTube (Secondary: score 58.04)
  { file: "arsani-yt-st-mary-tamgeed.m4a", hymns: ["annual-veneration-hail-to-you-o-mary-2", "annual-veneration-hail-to-you-o-mary"], language: "arabic" },
  // Veneration for St. Mary (Arabic) - Tertiary: score 57.95
  { file: "arsani-040-veneration-for-st-mary-arabic.m4a", hymns: ["annual-veneration-hail-to-you-o-mary-2", "annual-veneration-hail-to-you-o-mary"], language: "arabic" },
  // St. Mary Glorification - Quaternary: score 49.81
  { file: "arsani-112-st-mary-glorification.m4a", hymns: ["annual-veneration-hail-to-you-o-mary-2", "annual-veneration-hail-to-you-o-mary"], language: "arabic" },
  // YouTube recordings and additional tracks...
  { file: "arsani-yt-lent-psalm-150-coptic.m4a", hymns: ["lent-weekend-psalm-150"], language: "coptic" },
  { file: "arsani-yt-lent-psalm-150-arabic.m4a", hymns: ["lent-weekend-psalm-150"], language: "arabic" },
  { file: "arsani-yt-lent-sixth-sunday-melody.m4a", hymns: ["lent-weekend-distribution-melody-sixth-sunday"], language: "arabic" },
  { file: "arsani-yt-nayrouz-verses-of-cymbals.m4a", hymns: ["nayrouz-matins-verses-of-the-cymbals"], language: "coptic" },
  { file: "holyweek-bright-saturday-psali-watos-three-holy-youth.m4a", hymns: ["annual-midnight-psali-watos-three-holy-youth@holyweek-bright-saturday"], language: "coptic" },
  { file: "holyweek-bright-saturday-the-hymn-of-bright-saturday.m4a", hymns: ["holyweek-bright-saturday-the-hymn-of-bright-saturday"], language: "coptic" },
  { file: "holyweek-bright-saturday-the-hymn-of-bright-saturday.m4a", hymns: ["holyweek-bright-saturday-the-hymn-of-bright-saturday"], language: "arabic" },
  { file: "arsani-150-palm-sunday-melismatic-sherat.m4a", hymns: ["annual-midnight-saturday-watos-lobsh-1@palmsunday-midnight", "annual-midnight-saturday-watos-lobsh-2@palmsunday-midnight"], language: "coptic" },
  { file: "arsani-182-joyful-talabtoka.m4a", hymns: ["annual-midnight-sunday-psali-lord-jesus", "annual-vesper-praises-sunday-psali-lord-jesus"], language: "arabic" },
  { file: "arsani-266-festive-marouchasf.m4a", hymns: ["d-annual-bishop-psalm-trailer-for-the-pope-or-a-bishop@d-fest-bishop"], language: "coptic" },
  { file: "arsani-267-kiahk-coptic-psalm-chant.m4a", hymns: ["kiahk-liturgy-psalm-chant-bishop"], language: "coptic" },
  { file: "arsani-267-kiahk-marou-chasf.m4a", hymns: ["kiahk-liturgy-hymn-15"], language: "coptic" },
  { file: "bright-saturday-my-god-my-god.m4a", hymns: ["holyweek-bright-saturday-my-god-my-god"], language: "coptic" },
  { file: "bright-saturday-my-god-my-god.m4a", hymns: ["holyweek-bright-saturday-my-god-my-god"], language: "arabic" },
  // Kiahk 1st Explanation
  { file: "arsani-yt-kiahk-first-explanation.m4a", hymns: ["kiahk-midnight-hymn-41"], language: "arabic" },
  // Kiahk 2nd Explanation
  { file: "arsani-yt-kiahk-second-explanation.m4a", hymns: ["kiahk-midnight-hymn-43"], language: "arabic" },
  // Luke 1 / Adam Aspasmos Zechariah (Khatarat Hamama)
  { file: "arsani-yt-kiahk-aspasmos-adam-zechariah.m4a", hymns: ["kiahk-liturgy-hymn-19"], language: "arabic" },
  // Kiahk Ode
  { file: "arsani-yt-kiahk-ode.m4a", hymns: ["kiahk-midnight-kiahk-ode"], language: "coptic" },
  // Cross Vespers (Exposition Intro & Gospel Response)
  { file: "arsani-yt-cross-vespers.m4a", hymns: ["cross-matins-exposition-introduction", "cross-liturgy-gospel-response"], language: "coptic" },
  // Cross Doxologies
  { file: "arsani-yt-cross-doxologies.m4a", hymns: ["cross-matins-doxology"], language: "coptic" },
  // Kiahk St Anthony Praise
  { file: "arsani-yt-kiahk-st-anthony.m4a", hymns: ["kiahk-midnight-hymn-24"], language: "arabic" },
  // Kiahk St Moses the Black Praise
  { file: "arsani-yt-kiahk-anba-mousa.m4a", hymns: ["kiahk-midnight-hymn-26"], language: "arabic" },
  // Good Friday Agios (Omonogenyc)
  { file: "arsani-yt-good-friday-agios.m4a", hymns: ["holyweek-great-friday-omonogenyc"], language: "coptic" },
  // Lazarus Saturday Gospel
  { file: "arsani-yt-lazarus-saturday-gospel.m4a", hymns: ["palmsunday-vespers-gospel-response", "palmsunday-vespers-gospel-response-lazarus-saturday"], language: "coptic" },
  // Palm Sunday Vespers Praises
  { file: "arsani-yt-palm-sunday-vesper-praises.m4a", hymns: ["palmsunday-vespers-graciously-accord-o-lord", "palmsunday-vespers-introduction-to-the-creed", "palmsunday-vespers-watos-exposition", "palmsunday-vespers-adam-exposition", "palmsunday-vespers-concluding-canon"], language: "coptic" },
  // Kiahk I Open My Mouth With Praise
  { file: "arsani-yt-kiahk-i-open-my-mouth.m4a", hymns: ["kiahk-midnight-hymn-37"], language: "arabic" },
  // Kiahk Praise Amdah Azraa Wa Batoul
  { file: "arsani-yt-kiahk-amdah-azraa.m4a", hymns: ["kiahk-midnight-hymn-35"], language: "arabic" },
  // Kiahk Praise Ashkorak Ya Rabb Israeel
  { file: "arsani-yt-kiahk-ashkorak.m4a", hymns: ["kiahk-midnight-hymn-12", "nativity-fast-midnight-third-hos-psali"], language: "arabic" },
  // Nativity Paramoun Distribution Melody (Ana Awel Kalami)
  { file: "arsani-yt-nativity-paramoun-ana-awel-kalami.m4a", hymns: ["nativity-distribution-paramoun-melody"], language: "arabic" },
  // Resurrection Distribution
  { file: "arsani-yt-resurrection-distribution.m4a", hymns: ["pentecost-distribution-all-the-choirs"], language: "coptic" },
  // Pentecost Distribution
  { file: "arsani-yt-pentecost-distribution.m4a", hymns: ["pentecost-distribution-pentecost-feast"], language: "coptic" },
  // Apostles Fast Distribution
  { file: "arsani-yt-apostles-distribution.m4a", hymns: ["pentecost-distribution-let-us-praise@apostles-distribution", "apostles-liturgy-o-you-who@apostles-distribution"], language: "coptic" },
  // Apostles Glorification
  { file: "arsani-yt-apostles-tamgeed.m4a", hymns: ["annual-matins-doxology-apostles", "annual-vespers-doxology-apostles"], language: "arabic" },

  // St Mercurius Glorification
  { file: "arsani-yt-st-mercurius-tamgeed.m4a", hymns: ["annual-matins-doxology-philopater-mercurius", "annual-vespers-doxology-philopater-mercurius", "annual-midnight-doxology-philopater-mercurius"], language: "arabic" },
  // A Third Standard Adam Aspasmos (O Christ Our Savior)
  { file: "arsani-aspasmos-adam-o-christ-our-savior.m4a", hymns: ["annual-liturgy-aspasmos-adam-3"], language: "coptic" },
  // Standard Adam Aspasmos (Rejoice O Mary / Onof Emmo Maria)
  { file: "arsani-aspasmos-adam-onof-emmo.m4a", hymns: ["annual-liturgy-aspasmos-adam"], language: "coptic" },
  // Before Confession (English)
  { file: "liturgy-before-confession-english.m4a", hymns: ["d-annual-liturgy-faithful-in-christ-jesus-our-lord"], language: "english" },
  // St Basil's Liturgy of the Faithful: deacon responses recorded in one language
  { file: "deacon-reconciliation-arabic.m4a", hymns: ["d-annual-liturgy-faithful-reconciliation"], language: "arabic" },
  { file: "deacon-greet-one-another-arabic.m4a", hymns: ["d-annual-liturgy-faithful-greet-one-another"], language: "arabic" },
  { file: "deacon-you-who-are-seated-arabic.m4a", hymns: ["d-annual-liturgy-faithful-anaphora"], language: "arabic" },
  { file: "deacon-look-towards-the-east-arabic.m4a", hymns: ["d-annual-liturgy-faithful-look-towards-the-east"], language: "arabic" },
  { file: "deacon-epiclesis-coptic.m4a", hymns: ["d-annual-liturgy-faithful-epiclesis"], language: "coptic" },
  { file: "deacon-let-those-who-read-coptic.m4a", hymns: ["d-annual-liturgy-faithful-let-those-who-read"], language: "coptic" },
  { file: "deacon-pray-for-the-departed-coptic.m4a", hymns: ["d-annual-liturgy-faithful-pray-for-the-departed"], language: "coptic" },
  { file: "deacon-bow-your-heads-coptic.m4a", hymns: ["d-annual-liturgy-faithful-bow-your-heads"], language: "coptic" },
  { file: "deacon-let-us-attend-in-fear-coptic.m4a", hymns: ["d-annual-liturgy-faithful-let-us-attend-in-fear"], language: "coptic" },
  { file: "deacon-saved-amen-arabic.m4a", hymns: ["d-annual-liturgy-faithful-saved-amen"], language: "arabic" },
  { file: "deacon-amen-let-us-pray-coptic.m4a", hymns: ["d-annual-liturgy-faithful-amen-let-us-pray"], language: "coptic" },
  { file: "liturgy-amen-ton-thanaton-coptic-2.m4a", hymns: ["annual-liturgy-amen-ton-thanaton"], language: "coptic" },
  { file: "deacon-confession-arabic.m4a", hymns: ["d-annual-liturgy-faithful-the-confession"], language: "arabic" },
  { file: "deacon-confession-english.m4a", hymns: ["d-annual-liturgy-faithful-the-confession"], language: "english" },
  { file: "liturgy-one-is-the-holy-father-arabic.m4a", hymns: ["kiahk-liturgy-one-is-the-holy-father@annual-liturgy"], language: "arabic" },
];
