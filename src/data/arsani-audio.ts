import type { LanguageType } from './hymns';

// Archdeacon Arsani Sidarous's recordings from the SoundCloud playlist "Archie Arsani Sidarous" (he approved his
// recordings for the app), each with the hymns it is for and the language it is sung in. A hymn that already has a
// recording in that language gets it as another recording to choose. Annual hymns match their own id only (other
// seasons sing them in another tune); a season's hymns also match their copies in that season's other services.
export const arsaniAudio: { file: string; hymns: string[]; language: LanguageType }[] = [
  // Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ | Teno osht emefiot | Long Watos Antiphonary - Archdeacon Arsani Sidaros
  { file: "arsani-002-teno-osht-emefiot-long-watos-antiphonary-sidaros.m4a", hymns: ["annual-vespers-verse-of-cymbals", "annual-matins-verse-of-cymbals"], language: "coptic" },
  // Joyful Verses of the Cymbals (Adam) Feast of the Cross| Archdeacon Arsani Sidarous
  { file: "arsani-003-joyful-verses-of-cymbals-adam-feast-of-cross.m4a", hymns: ["cross-matins-verses-of-the-cymbal"], language: "coptic" },
  // Lipon (Conclusion of Adam Psalis)| Arsani Sidarous and Chorus
  { file: "arsani-004-lipon-conclusion-of-adam-psalis.m4a", hymns: ["annual-midnight-sunday-adam-psali-conclusion", "annual-midnight-monday-adam-psali-conclusion", "annual-midnight-tuesday-adam-psali-conclusion", "annual-vesper-praises-sunday-adam-psali-conclusion", "annual-vesper-praises-monday-adam-psali-conclusion", "annual-vesper-praises-tuesday-adam-psali-conclusion"], language: "coptic" },
  // Kata Ni Khoros- Arsani Sidarous
  { file: "arsani-009-kata-ni-khoros.m4a", hymns: ["pentecost-liturgy-kata-nichorous", "pentecost-liturgy-all-the-choirs", "pentecost-distribution-all-the-choirs"], language: "coptic" },
  // 2nd Hoos + Lobsh (Coptic) | Archdeacon Arsani Sidarous + Chorus
  { file: "arsani-010-2nd-hoos-lobsh-coptic.m4a", hymns: ["annual-midnight-second-canticle"], language: "coptic" },
  // 1st Hos (Coptic)| Archdeacon Arsani Sidarous+ Seattle Deacons
  { file: "arsani-011-1st-hos-coptic-seattle-s.m4a", hymns: ["annual-midnight-first-canticle"], language: "coptic" },
  // Piepnevma - Arsani Sidarous
  { file: "arsani-013-piepnevma.m4a", hymns: ["pentecost-liturgy-hymn-of-the-holy-spirit"], language: "coptic" },
  // I Start With God's Holy Name (Arabic)- Arsani
  { file: "arsani-016-i-start-with-god-s-holy-name-arabic.m4a", hymns: ["annual-veneration-in-the-name"], language: "arabic" },
  // Satanastasis(Resurrection Doxology for Archangel Michael)|الذكصولوجية القيامة(رئيس الملائكة ميخائيل)
  { file: "arsani-018-satanastasis-resurrection-doxology-for-archangel-m.m4a", hymns: ["pentecost-matins-archangel-michael-doxology"], language: "coptic" },
  // Hymn for Judas Procession|Abouna Louka Sidarous + Arsani Sidarous| لحن يهوذا |ارسانى سيداروس
  { file: "arsani-023-hymn-for-judas-procession-abouna-louka.m4a", hymns: ["holyweek-covenant-thursday-the-procession-of-judas"], language: "coptic" },
  // Pekethronos - Arsani Sidarous
  { file: "arsani-024-pekethronos.m4a", hymns: ["holyweek-great-friday-12th-hour-pekethronos"], language: "coptic" },
  // Anok Pe Pikoji Psalm 151 - Arsani Sidarous & Fr Luke Sidarous
  { file: "arsani-026-anok-pe-pikoji-psalm-151-fr-luke.m4a", hymns: ["holyweek-apocalypse-praises-psalm-151"], language: "coptic" },
  // Tin Anastasin
  { file: "arsani-027-tin-anastasin.m4a", hymns: ["pentecost-liturgy-your-resurrection"], language: "coptic" },
  // Ϣⲁϣϥ ⲛⲥ̀ⲟⲡ ⲙⲙ̀ⲏⲛⲓ ( Arsani Sidarous & St. Abraam Deacons )
  { file: "arsani-028-st-abraam-s.m4a", hymns: ["annual-midnight-sunday-theotokia-part-8", "annual-vesper-praises-sunday-theotokia-part-8", "annual-veneration-sunday-theotokia"], language: "coptic" },
  // Aripsalin-Joe Seif and Deacons from the Diocese of Los Angeles (Live)
  { file: "arsani-029-aripsalin-joe-seif-s-from-diocese-of-los-angeles-l.m4a", hymns: ["annual-midnight-greek-psali-watos"], language: "coptic" },
  // Ⲧⲁⲓϣⲟⲩⲣⲏ + Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ̀ ┃ Taishori + Hymn of the Intercessions - Arsani Sidarous
  { file: "arsani-030-taishori-hymn-of-intercessions.m4a", hymns: ["annual-liturgy-offering-golden-censer"], language: "coptic" },
  // Afrek Etfe (Hymn of the Ascension) - Arsani Sidarous
  { file: "arsani-031-afrek-etfe-hymn-of-ascension.m4a", hymns: ["pentecost-liturgy-he-bowed-heaven"], language: "coptic" },
  // Annual Psalm 150 - Arsani Sidarous
  { file: "arsani-034-annual-psalm-150.m4a", hymns: ["annual-distribution-psalm-150"], language: "coptic" },
  // Pinishti (Short) | Archdeacon Arsani Sidarous | مرد بينيشتي - الأرشيدياكون أرساني سيداروس
  { file: "arsani-035-pinishti-short.m4a", hymns: ["d-annual-liturgy-faithful-the-great-abba-antony-pinishti"], language: "coptic" },
  // Saturday Psali - Coptic Monastery of St. Shenouda, Rochester, NY 07.12.19 (live)
  { file: "arsani-038-saturday-psali-coptic-monastery-of-st-shenouda-roc.m4a", hymns: ["annual-midnight-saturday-watos-psali", "annual-vesper-praises-saturday-watos-psali"], language: "coptic" },
  // Fai Etafenf- Arsani Sidarous
  { file: "arsani-039-fai-etafenf.m4a", hymns: ["holyweek-covenant-thursday-fai-etav-enf"], language: "coptic" },
  // Tov hina (Coptic) | Archdeacon Arsani Sidarous | اطلبوا لكي يرحمنا
  { file: "arsani-043-tov-hina-coptic.m4a", hymns: ["d-annual-matins-pray-for-mercy", "d-annual-vespers-pray-for-mercy", "d-annual-offering-lamb-pray-for-mercy"], language: "coptic" },
  // Tenen and Tenoweh Kiahk
  { file: "arsani-048-tenen-tenoweh-kiahk.m4a", hymns: ["kiahk-midnight-hymn-20"], language: "coptic" },
  // Teoi Enhikanos (Melismatic) - Arsani Sidarous and the Deacons of the LA Diocese
  { file: "arsani-050-teoi-enhikanos-melismatic-s-of-la-diocese.m4a", hymns: ["annual-midnight-sunday-theotokia-part-10", "annual-vesper-praises-sunday-theotokia-part-10"], language: "coptic" },
  // Nim Ghar I Archdeacon Arsani Sidarous and Chorus I نيم غار ارشي ارساني سيداروس
  { file: "arsani-051-nim-ghar-i-i.m4a", hymns: ["annual-midnight-sunday-theotokia-part-16", "annual-vesper-praises-sunday-theotokia-part-16"], language: "coptic" },
  // شيري ماريا┃Ⲭⲉⲣⲉ Ⲙⲁⲣⲓⲁ┃ Shere Maria - Arsani Sidarous
  { file: "arsani-053-shere-maria.m4a", hymns: ["annual-liturgy-offering-hail-to-mary"], language: "coptic" },
  // Fourth Hoas - Arsani Siarous
  { file: "arsani-054-fourth-hoas-siarous.m4a", hymns: ["annual-midnight-fourth-canticle", "annual-vesper-praises-sunday-fourth-canticle", "annual-vesper-praises-monday-fourth-canticle", "annual-vesper-praises-tuesday-fourth-canticle", "annual-vesper-praises-wednesday-fourth-canticle", "annual-vesper-praises-thursday-fourth-canticle", "annual-vesper-praises-friday-fourth-canticle", "annual-vesper-praises-saturday-fourth-canticle"], language: "coptic" },
  // Cemoti (4 Verses) |Archdeacon Arsani Sidarous + Seattle Deacons
  { file: "arsani-057-cemoti-4-verses-seattle-s.m4a", hymns: ["annual-midnight-semouti-ero-dikeos"], language: "coptic" },
  // Marahmak Ya Elahi-Arsani Sidarous
  { file: "arsani-059-marahmak-ya-elahi.m4a", hymns: ["kiahk-midnight-hymn-75"], language: "arabic" },
  // Palm Sunday Doxology-احد الشعانين
  { file: "arsani-061-palm-sunday-doxology.m4a", hymns: ["palmsunday-vespers-doxology", "palmsunday-matins-doxology"], language: "coptic" },
  // Tennav (We look at the Resurrection) | Arsani Sidarous and Chorus
  { file: "arsani-069-tennav-we-look-at-resurrection.m4a", hymns: ["annual-midnight-the-hymn-of-the-resurrection@pentecost-midnight"], language: "coptic" },
  // Etaven NiEskhai(Feast of the Cross)-Arsani Sidarous|ايطاف انياسخاي لعيد الصليب لشماس أرسانىى سيداروس
  { file: "arsani-073-etaven-nieskhai-feast-of-cross.m4a", hymns: ["cross-matins-the-hymn-of-constantine"], language: "coptic" },
  // Tenen - Arsani Sidarous
  { file: "arsani-074-tenen.m4a", hymns: ["annual-midnight-three-holy-children"], language: "coptic" },
  // 06- Maren Ouonh
  { file: "arsani-075-06-maren-ouonh.m4a", hymns: ["annual-midnight-second-canticle-lobsh"], language: "coptic" },
  // Mournful Ti Shoree+Fai Etaf Enf (Good Friday)| Arsani Sidarous+Chorus
  { file: "arsani-077-mournful-ti-shoree-fai-etaf-enf-good-friday.m4a", hymns: ["holyweek-great-friday-9th-hour-teeshoory"], language: "coptic" },
  // Annual Aspasmos Watos (Epchois Efnoti)| Archi Arsani + Seattle Deacons| اسبسمس واطس قبطى
  { file: "arsani-078-annual-aspasmos-watos-epchois-efnoti-archi-seattle.m4a", hymns: ["annual-liturgy-aspasmos-watos"], language: "coptic" },
  // Ti Epistoly (Introduction to 6th hour Pauline Epistle on Good Friday) | Arsani Sidarous
  { file: "arsani-081-ti-epistoly-introduction-to-6th-hour-pauline-epist.m4a", hymns: ["holyweek-great-friday-6th-hour-pauline"], language: "coptic" },
  // Commemoration of the Saints- Arsani Sidarous
  { file: "arsani-082-commemoration-of-saints.m4a", hymns: ["annual-midnight-commemoration"], language: "coptic" },
  // 1st & 2nd Joyful Sherat (Coptic)| Arsani Sidarous and Archangel Michael Chorus
  { file: "arsani-085-1st-2nd-joyful-sherat-coptic-archangel-michael.m4a", hymns: ["annual-midnight-saturday-watos-lobsh-1", "annual-vesper-praises-saturday-watos-lobsh-1"], language: "coptic" },
  // Kyrie Eleyson (Lent weekday Matins Verses of the Cymbals) | Archdeacon Arsani Sidarous
  { file: "arsani-088-kyrie-eleyson-lent-weekday-matins-verses-of-cymbal.m4a", hymns: ["lent-weekday-matins-verse-of-cymbals"], language: "coptic" },
  // Shere Theotoke- Arsani Sidarous
  { file: "arsani-090-shere-otoke.m4a", hymns: ["annual-veneration-rejoice-o-theotokos"], language: "coptic" },
  // Resurrection Verses of Cymbals - Arsani Sidarous and Chorus
  { file: "arsani-092-resurrection-verses-of-cymbals.m4a", hymns: ["pentecost-matins-verses-of-the-cymbals"], language: "coptic" },
  // Khristos Analimepsis (Major) - Greek Hymn for the Ascension - Arsani Sidarous | المسيح صعد
  { file: "arsani-102-khristos-analimepsis-major-greek-hymn-for-ascensio.m4a", hymns: ["pentecost-matins-hymn-of-the-ascension"], language: "coptic" },
  // Litany of the Departed (Coptic) | Archdeacon Arsani Sidarous | أوشية الراقدين
  { file: "arsani-103-litany-of-departed-coptic.m4a", hymns: ["d-annual-matins-pray-for-the-departed", "d-annual-vespers-pray-for-the-departed"], language: "coptic" },
  // Omonogenis - English (O Only-Begotten Son) | Archdeacon Arsani Sidarous
  { file: "arsani-106-omonogenis-english-o-only-begotten-son.m4a", hymns: ["holyweek-great-friday-omonogenyc"], language: "english" },
  // Kiahk Melody for the Trinity (Arabic/English) | Archdeacon Arsani Sidarous + Chorus
  { file: "arsani-108-kiahk-melody-for-trinity-arabic-english.m4a", hymns: ["kiahk-midnight-hymn-14"], language: "arabic" },
  // Doxology for the Feast of the Cross - Arsani Sidarous
  { file: "arsani-109-doxology-for-feast-of-cross.m4a", hymns: ["cross-matins-doxology"], language: "coptic" },
  // ⲧⲟⲩ ⲙⲁⲕⲁⲣⲓⲱ - Archdeacon Arsani Sidarous
  { file: "arsani-111-recording.m4a", hymns: ["kiahk-liturgy-hymn-8"], language: "coptic" },
  // Melismatic Shere Ne Maria- Praxis Response- مرد الابركسيس الكبير
  { file: "arsani-115-melismatic-shere-ne-maria-praxis-response.m4a", hymns: ["annual-liturgy-praxis-response"], language: "coptic" },
  // Annual Psalm And Marouetchasf
  { file: "arsani-119-annual-psalm-marouetchasf.m4a", hymns: ["annual-liturgy-psalm-trailer"], language: "coptic" },
  // Nairouz Praxis Response - Arsani Sidarous & Vancouver Deacons مرد الابركسيس لعيد النيروز
  { file: "arsani-120-nairouz-praxis-response-vancouver-s.m4a", hymns: ["nayrouz-liturgy-praxis-response-2"], language: "coptic" },
  // First Hoos Lobsh-Khen Oushot- لبش الهوس الأول خين اوشوت- Deacons of LA Diocese
  { file: "arsani-121-first-hoos-lobsh-khen-oushot-s-of-la-diocese.m4a", hymns: ["annual-midnight-first-canticle-lobsh"], language: "coptic" },
  // Nativity Doxology - St. Mercurius & St. Abraam, Torrance CA
  { file: "arsani-122-nativity-doxology-st-mercurius-st-abraam-torrance.m4a", hymns: ["nativity-matins-first-doxology"], language: "coptic" },
  // Nisavev
  { file: "arsani-124-nisavev.m4a", hymns: ["annual-liturgy-offering-all-the-wise-men"], language: "coptic" },
  // Hiteniat
  { file: "arsani-125-hiteniat.m4a", hymns: ["annual-liturgy-hitens"], language: "coptic" },
  // Apekran
  { file: "arsani-127-apekran.m4a", hymns: ["annual-veneration-your-name"], language: "coptic" },
  // Coptic Paschal Praxis | Praxeonton - Arsani Sidarous & Chorus
  { file: "arsani-130-coptic-paschal-praxis-praxeonton.m4a", hymns: ["holyweek-covenant-thursday-acts-of-the-apostles"], language: "coptic" },
  // Tayshori Good Friday - Arsani Sidarous
  { file: "arsani-132-tayshori-good-friday.m4a", hymns: ["holyweek-great-friday-6th-hour-taishoury"], language: "coptic" },
  // Ⲡ̀ⲟⲩⲣⲟ┃Festive Epouro - Arsani Sidarous┃إبؤرو - يا ملك السلام
  { file: "arsani-142-festive-epouro.m4a", hymns: ["annual-veneration-hymn-of-joy", "d-order-matrimony-hymn-of-joy"], language: "coptic" },
  // Introduction to the Gospel for Metropolitan Antonious of Jerusalem | Archdeacon Arsani Sidarous
  { file: "arsani-146-introduction-to-gospel-for-metropolitan-antonious.m4a", hymns: ["d-annual-bishop-introduction-to-the-coptic-gospel-when-read-by-the"], language: "coptic" },
  // Golgotha - Arsani Sidarous
  { file: "arsani-154-golgotha.m4a", hymns: ["holyweek-great-friday-golgotha"], language: "coptic" },
  // Kiahk Psalm 150 Alleluia-Arsani Sidarous
  { file: "arsani-155-kiahk-psalm-150-alleluia.m4a", hymns: ["kiahk-distribution-hymn-1"], language: "coptic" },
  // O Nim Nai| Arsani Sidarous |  أو نيم ناي| ارسانى سيداروس
  { file: "arsani-157-o-nim-nai.m4a", hymns: ["pentecost-liturgy-o-nimnai"], language: "coptic" },
  // Festive Tenoweh Ensok I Archdeacon Arsani Sidarous and Chorus
  { file: "arsani-162-festive-tenoweh-ensok-i.m4a", hymns: ["annual-midnight-psali-watos-three-holy-youth"], language: "coptic" },
  // Third Hoos I Archdeacon Arsani Sidarous and Chorus
  { file: "arsani-163-third-hoos-i.m4a", hymns: ["annual-midnight-third-canticle"], language: "coptic" },
  // Khristos Analimepsis (Minor) - Greek Hymn for the Ascension - Arsani Sidarous | المسيح صعد
  { file: "arsani-164-khristos-analimepsis-minor-greek-hymn-for-ascensio.m4a", hymns: ["pentecost-matins-hymn-of-the-ascension"], language: "coptic" },
  // Neknai O Panouti I Archdeacon Arsani Sidarous and Chorus
  { file: "arsani-167-neknai-o-panouti-i.m4a", hymns: ["annual-midnight-sunday-adam-theotokias-conclusion", "annual-midnight-monday-adam-theotokias-conclusion", "annual-midnight-tuesday-adam-theotokias-conclusion", "annual-vesper-praises-sunday-adam-theotokias-conclusion", "annual-vesper-praises-monday-adam-theotokias-conclusion", "annual-vesper-praises-tuesday-adam-theotokias-conclusion", "annual-morning-praises-adam-theotokias-conclusion"], language: "coptic" },
  // Evshes (For St. Athanasius) - Arsani Sidarous | لحن افشيس - أرسانى سيداروس
  { file: "arsani-169-evshes-for-st-athanasius.m4a", hymns: ["d-annual-liturgy-faithful-through-the-prayers-evshes"], language: "coptic" },
  // Lenten Sherat (Saturday Theotokia Lobsh) | Archdeacon Arsani Sidarous
  { file: "arsani-172-lenten-sherat-saturday-otokia-lobsh.m4a", hymns: ["lent-midnight-saturday-watos-lobsh-1"], language: "coptic" },
  // Introduction to the Gospel in Presence of General Bishop (Arabic)| Arsani Sidarous
  { file: "arsani-174-introduction-to-gospel-in-presence-of-general-bish.m4a", hymns: ["d-annual-bishop-introduction-to-the-coptic-gospel-when-read-by-the"], language: "arabic" },
  // Conclusion of Midnight Praises I Archdeacon Arsani Sidarous and Chorus
  { file: "arsani-183-conclusion-of-midnight-praises-i.m4a", hymns: ["annual-midnight-concluding-hymn"], language: "coptic" },
  // Melismatic Singary Psalm Feast of Theophany | Archdeacon Arsani Sidarous
  { file: "arsani-184-melismatic-singary-psalm-feast-of-ophany.m4a", hymns: ["theophany-liturgy-psalm"], language: "coptic" },
  // Ke Eeperto - Arsani Sidarous
  { file: "arsani-185-ke-eeperto.m4a", hymns: ["holyweek-pascha-general-ke-eepertou"], language: "coptic" },
  // Shere Tef Anastasis w Arshi Arsani
  { file: "arsani-187-shere-tef-anastasis-w-arshi.m4a", hymns: ["pentecost-liturgy-acts-response"], language: "coptic" },
  // Tov hina (English) | Archdeacon Arsani Sidarous | اطلبوا لكي يرحمنا
  { file: "arsani-192-tov-hina-english.m4a", hymns: ["d-annual-matins-pray-for-mercy", "d-annual-vespers-pray-for-mercy", "d-annual-offering-lamb-pray-for-mercy"], language: "english" },
  // Introduction to the Exposition for Holy Week - Arsani Sidarous
  { file: "arsani-210-introduction-to-exposition-for-holy-week.m4a", hymns: ["holyweek-pascha-general-exposition-introduction"], language: "coptic" },
  // Ommonogenees - Arsani Sidarous
  { file: "arsani-213-ommonogenees.m4a", hymns: ["holyweek-great-friday-omonogenyc"], language: "coptic" },
  // 16- Aikoti
  { file: "arsani-224-16-aikoti.m4a", hymns: ["annual-midnight-sunday-psali-lord-jesus", "annual-vesper-praises-sunday-psali-lord-jesus"], language: "coptic" },
  // 01- Tenthino
  { file: "arsani-232-01-tenthino.m4a", hymns: ["annual-midnight-arise-o-children"], language: "coptic" },
  // 03 Evlogimenos
  { file: "arsani-236-03-evlogimenos.m4a", hymns: ["annual-vespers-blessed-is-he"], language: "coptic" },
  // The Great Azpazesthe (Quick Tune) | Arsani Sidarous & Anton Ibrahim Ayad | قبلوا الكبير
  { file: "arsani-241-great-azpazes-quick-tune-anton-ibrahim-ayad.m4a", hymns: ["d-annual-liturgy-faithful-greet-one-another-great"], language: "coptic" },
  // Avechenon- Arsani Sidarous
  { file: "arsani-243-avechenon.m4a", hymns: ["holyweek-covenant-thursday-avchnon"], language: "coptic" },
  // The Burning Bush- Arsani Sidarous
  { file: "arsani-247-burning-bush.m4a", hymns: ["kiahk-midnight-hymn-33"], language: "arabic" },
  // Ya Kol A Sefoof - Arsani Sidarous
  { file: "arsani-248-ya-kol-a-sefoof.m4a", hymns: ["pentecost-liturgy-ya-kol-alsefoof"], language: "arabic" },
  // Litany of the Departed (English) | Archdeacon Arsani Sidarous | أوشية الراقدين
  { file: "arsani-255-litany-of-departed-english.m4a", hymns: ["d-annual-matins-pray-for-the-departed", "d-annual-vespers-pray-for-the-departed"], language: "english" },
  // Enthok Gar - Abouna Felimon Mikhail, Lipon (Coptic Resurrection Watos Aspasmos) - Arsani Sidarous
  { file: "arsani-257-enthok-gar-abouna-felimon-mikhail-lipon-coptic-res.m4a", hymns: ["pentecost-liturgy-aspasmos-vatos"], language: "coptic" },
  // 2022 | فلنجتمع (Marentho Oti/Let us Gather) | Arsani Sidarous, Joe Mikhail, & Chorus
  { file: "arsani-269-2022-marentho-oti-let-us-ga-r-joe-mikhail.m4a", hymns: ["annual-veneration-let-us-gather"], language: "arabic" },
  // Thok Te Tea Gome-9th Hr Eve of Wed
  { file: "arsani-315-thok-te-tea-gome-9th-hr-eve-of-wed.m4a", hymns: ["holyweek-covenant-thursday-paschal-doxology"], language: "coptic" },
];
