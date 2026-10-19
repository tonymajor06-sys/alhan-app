import type { Hymn } from './hymns';

// The Liturgy of the Faithful as three Divine Liturgies (St Basil, St Gregory, St Cyril), each in the order of its book
// in Spirit & Truth (used with permission): the deacon's responses in Deacon Responses > Annual, and the people's hymns
// in Annual > Liturgy. The responses keep their ids in St Basil; St Gregory and St Cyril get copies ("<id>@<service>").

export type LiturgyId = 'basil' | 'gregory' | 'cyril';

export const liturgies: { id: LiturgyId; title: string }[] = [
  { id: 'basil', title: 'Divine Liturgy of St Basil the Great' },
  { id: 'gregory', title: 'Divine Liturgy of St Gregory the Theologian' },
  { id: 'cyril', title: 'Divine Liturgy of St Cyril the Great' },
];

// Deacon responses from Spirit & Truth's three liturgies that the Deacon Responses lacked
// (Coptic in English letters from the alphabet chart; Arabic in English letters written for the app)
export const stLiturgyDeacon: Hymn[] = [
  {
    id: "d-annual-liturgy-faithful-saved-amen",
    title: "Ⲥⲱⲑⲓⲥ ⲁ̀ⲙⲏⲛ (Saved. Amen. In the Fear of God)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲤⲱⲑⲓⲥ ⲁ̀ⲙⲏⲛ: ⲕⲉ ⲧⲱ ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲥⲟⲩ: ⲙⲉⲧⲁ ⲫⲟⲃⲟⲩ Ⲑⲉⲟⲩ ⲡ̀ⲣⲟⲥⲭⲱⲙⲉⲛ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲀⲙⲏⲛ: Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ: Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ: Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nSōthis amēn: ke tō epneumati sou: meta fovou Theou eproskhōmen.\n\nPi-laos:\n\nAmēn: Kurie ele-ēson: Kurie ele-ēson: Kurie ele-ēson." },
      { language: 'english', text: "Deacon:\n\nSaved. Amen. And with your spirit. In the fear of God, let us attend.\n\nPeople:\n\nAmen. Lord have mercy. Lord have mercy. Lord have mercy." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nKhalust haqqan, wa ma' rouhik, nunsit bi-khawf Allah.\n\nEsh-sha'b:\n\nAmeen. Ya Rabb irham. Ya Rabb irham. Ya Rabb irham." },
      { language: 'arabic', text: "الشماس:\n\nخَلُصْتَ حقاً، ومع روحِكَ، ننصتُ بخوفِ الله.\n\nالشعب:\n\nآمين. ياربُ إرحَم. ياربُ إرحَم. ياربُ إرحَم." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-peace-and-love",
    title: "Ⲏ ⲓ̀ⲣⲏⲛⲏ ⲕⲉ ⲁ̀ⲅⲁⲡⲏ (The Peace and Love of Jesus Christ)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲎ ⲓ̀ⲣⲏⲛⲏ ⲕⲉ ⲁ̀ⲅⲁⲡⲏ Ⲓⲏⲥⲟⲩ Ⲭⲣⲓⲥⲧⲟⲩ ⲙⲉⲑ ⲩ̀ⲙⲱⲛ: ⲯⲁⲗⲗⲁⲧⲉ: ϫⲱ ⲁ̀ⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲠⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲏⲥ ⲁⲝⲓⲁⲥ ⲙⲉⲧⲁⲗⲏⲯⲉⲱⲥ ⲁⲭⲣⲁⲛⲧⲱⲛ ⲕⲉ ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲱⲛ ⲧⲱⲛ ⲁ̀ⲅⲓⲱⲛ ⲙⲩⲥⲧⲏⲣⲓⲱⲛ.\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲆⲟⲝⲁ ⲥⲓ Ⲕⲩⲣⲓⲉ ⲇⲟⲝⲁ ⲥⲓ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nĒ irēnē ke agapē Iēsou Khristou meth umōn: psallate: gō allēlouia.\n\nProseuksasthe uper tēs aksias metalēpseōs akhrantōn ke epouraniōn tōn agiōn mustēriōn.\n\nKurie ele-ēson.\n\nPi-laos:\n\nDoksa si Kurie doksa si." },
      { language: 'english', text: "Deacon:\n\nThe peace and love of Jesus Christ be with you. Sing, “Alleluia.”\n\nPray for the worthy partaking of the immaculate, heavenly, and Holy Mysteries.\n\nLord have mercy.\n\nPeople:\n\nGlory to You, O Lord, glory to You." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nSalam wa mahabbat Yasou' el-Maseeh takoun ma'akum, rattilu bi-nasheed: Allelouia.\n\nSallu min agl et-tanawul bi-istihqaq min hadhihi el-asrar el-muqaddasa et-tahira was-samawiyya.\n\nYa Rabb irham.\n\nEsh-sha'b:\n\nEl-magd lak ya Rabb, el-magd lak." },
      { language: 'arabic', text: "الشماس:\n\nسلامُ ومحبةُ يسوعَ المسيحِ تكون معكم، رتلوا بنشيدٍ: الليلويا.\n\nصلوا من أجلِ التناولِ باستحقاقٍ من هذه الأسرارِ المقدسةِ الطاهرةِ والسمائيةِ.\n\nياربُ إرحَم.\n\nالشعب:\n\nالمجدُ لكَ ياربُ . المجدُ لكَ." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-pray-for-peace-st-cyril",
    title: "Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ϯϩⲓⲣⲏⲛⲏ (Pray for the Peace, St Cyril)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲱⲃϩ ⲉ̀ϫⲉⲛ ϯϩⲓⲣⲏⲛⲏ ⲛ̀ⲧⲉ ϯⲟⲩⲓ ⲙ̀ⲙⲁⲩⲁⲧⲥ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲕⲁⲑⲟⲗⲓⲕⲏ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲓⲕⲏ ⲛ̀ⲉⲕⲕ̀ⲗⲏⲥⲓⲁ: ⲛⲉⲙ ⲡ̀ⲟⲩϫⲁⲓ ⲙ̀Ⲫϯ ϧⲉⲛ ⲛⲓⲗⲁⲟⲥ ⲛⲉⲙ ⲟⲩⲥⲉⲙⲛⲓ ϧⲉⲛ ⲙⲁⲓ ⲛⲓⲃⲉⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nTōbh ejen tihirēnē ente tioui emmauats ethouab enkatholikē enapostolikē enekeklēsia: nem epougai em-Efnouti khen nilaos nem ousemni khen mai niven: entefkha nennovi nan evol.\n\nPi-laos:\n\nKurie ele-ēson." },
      { language: 'english', text: "Deacon:\n\nPray for the peace of the one, only, holy, catholic, and apostolic orthodox Church, for God’s salvation among the people, for stability in all places, that He may forgive us our sins.\n\nPeople:\n\nLord have mercy." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nUtlubu 'an salam el-kanisa el-wahida el-waheeda el-muqaddasa el-gami'a er-rasouliyya, wa khalas Allah fish-shu'oub, wal-hudou' fi kull makan, wa yaghfir lana khatayana.\n\nEsh-sha'b:\n\nYa Rabb irham." },
      { language: 'arabic', text: "الشماس:\n\nاطلبوا عن سلامِ الكنيسةِ الواحدةِ الوحيدةِ المقدسةِ الجامعةِ الرسوليةِ، وخلاصِ الله في الشعوبِ، والهدوءِ في كلِّ مكانٍ، ويغفر لنا خطايانا.\n\nالشعب:\n\nياربُ إرحَم." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-pray-for-the-leaders-st-cyril",
    title: "Ⲧⲱⲃϩ ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ⲧⲏⲓⲧⲉⲛ ⲛ̀ϩⲁⲛⲛⲁⲓ (Pray for the Leaders, St Cyril)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲱⲃϩ ϩⲓⲛⲁ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲧⲏⲓⲧⲉⲛ ⲛ̀ϩⲁⲛⲛⲁⲓ ⲛⲉⲙ ϩⲁⲛⲙⲉⲧϣⲉⲛϩⲏⲧ ⲙ̀ⲡⲉⲙ̀ⲑⲟ ⲛ̀ⲛⲓⲉⲝⲟⲩⲥⲓⲁ ⲉⲧⲁ̀ⲙⲁϩⲓ: ⲛ̀ⲧⲉϥⲉⲣⲙⲁⲗⲁⲍⲓⲛ ⲙ̀ⲡⲟⲩϩⲏⲧ ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲣⲟⲛ ⲉ̀ⲡⲓⲁ̀ⲅⲁⲑⲟⲛ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nTōbh hina Pi-ekhristos Pennouti tēiten enhannai nem hanmetshenhēt empe-emtho ennieksousia etamahi: entefermalazin empouhēt ekhoun eron epi-agathon ensēou niven: entefkha nennovi nan evol.\n\nPi-laos:\n\nKurie ele-ēson." },
      { language: 'english', text: "Deacon:\n\nPray that Christ our God may grant us mercy and compassion before the ruling authorities, and soften their heart towards us for that which is good at all times, and forgive us our sins.\n\nPeople:\n\nLord have mercy." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nUtlubu likay el-Maseeh ilahuna yu'teena rahma wa ra'fa amam er-ru'asa' el-a'izza', wa yu'attif qulubahum 'alayna bis-salah fi kull heen, wa yaghfir lana khatayana.\n\nEsh-sha'b:\n\nYa Rabb irham." },
      { language: 'arabic', text: "الشماس:\n\nاطلبوا لكي المسيحُ إلَهُنا يعطينا رحمةً ورأفةً أمامَ الرؤساءِ الأعزاءِ، ويُعَطِف قلوبَهم علينا بالصلاحِ في كلِّ حيٍن، ويغفرَ لنا خطايانا.\n\nالشعب:\n\nياربُ إرحَم." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-pray-for-the-patriarch-st-cyril",
    title: "Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡ̀ⲱⲛϧ (Pray for the Patriarch, St Cyril)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡ̀ⲱⲛϧ ⲛⲉⲙ ⲡ̀ⲧⲁϩⲟ ⲉ̀ⲣⲁⲧϥ ⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲟⲩⲧ ⲛ̀ⲁⲣⲭⲓⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (ⲛⲓⲙ): ⲛⲉⲙ ⲛⲉϥⲥⲟⲛ ⲙ̀ⲡ̀ⲛⲉⲩⲙⲁⲧⲓⲕⲟⲛ ⲡⲓⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ ⲛ̀ⲣⲉⲙⲀⲛⲧⲓⲟ̀ⲭⲓⲁ̀ Ⲙⲁⲣ Ⲓⲅⲛⲁⲧⲓⲟⲥ (ⲛⲓⲙ) ⲛⲉⲙ ⲡⲓⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ ⲛ̀ⲣⲉⲙⲈⲣⲓⲧⲣⲓⲁ Ⲁⲃⲟⲩⲛⲁ (ⲛⲓⲙ) ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲁ̀ⲣⲉϩ ⲉ̀ⲡⲟⲩⲱⲛϧ ⲛⲁⲛ ⲛ̀ϩⲁⲛⲙⲏϣ ⲛ̀ⲣⲟⲙⲡⲓ ⲛⲉⲙ ϩⲁⲛⲥⲏⲟⲩ ⲛ̀ϩⲓⲣⲏⲛⲓⲕⲟⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nTōbh ejen epōnkh nem eptaho eratf empeniōt ettaiout enarkhi-ereus papa abba (nim): nem nefson emepneumatikon pipatriarkhēs enrem-Anti-okhi-a Mar Ignatios (nim) nem pipatriarkhēs enrem-Eritria Avouna (nim) hina ente Pi-ekhristos Pennouti areh epouōnkh nan enhanmēsh enrompi nem hansēou enhirēnikon: entefkha nennovi nan evol.\n\nPi-laos:\n\nKurie ele-ēson." },
      { language: 'english', text: "Deacon:\n\nPray for the life and standing of our honored father the high priest, Pope Abba ___, and his spiritual brethren, the Patriarch of Antioch Mar Ignatius ___ and the Patriarch of Eritrea Abouna ___ , that Christ our God may keep their life for us for many years and peaceful times, and forgive us our sins.\n\nPeople:\n\nLord have mercy." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nUtlubu 'an hayat wa qiyam abeena el-mukarram ra'ees el-kahana, el-Baba Anba ___, wa akhaweihi er-rouhiyyeen Mar Ighnatios ___ batriyark Antakya, wa Abouna ___ batriyark Iritriya, likay el-Maseeh ilahuna yahfaz lana hayatahum sineen 'adeeda wa azmina salima, wa yaghfir lana khatayana.\n\nEsh-sha'b:\n\nYa Rabb irham." },
      { language: 'arabic', text: "الشماس:\n\nاطلبوا عن حياةِ وقيامِ أبينا المكرمِ رئيسِ الكهنةِ، البابا أنبا ___ وأخويه الروحيين مار أغناطيوس ___ بطريرك أنطاكيه وأبونا ___ بطريرك أريتريا ، لكي المسيحُ إلَهُنا يحفظَ لنا حياتَهم سنينَ عديدةً، وأزمنةً سالمةً، ويغفرَ لنا خطايانا.\n\nالشعب:\n\nياربُ إرحَم." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-pray-for-the-bishops-st-cyril",
    title: "Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲛⲉⲛⲓⲟϯ ⲛ̀ⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ (Pray for the Bishops, St Cyril)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲱⲃϩ ⲉ̀ϫⲉⲛ ⲛⲉⲛⲓⲟϯ ⲛ̀ⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ ⲛ̀ⲟⲣⲑⲟⲇⲟⲝⲟⲥ ⲉⲧ ϧⲉⲛ ⲙⲁⲓ ⲛⲓⲃⲉⲛ ⲛ̀ⲧⲉ ϯⲟⲓⲕⲟⲩⲙⲉⲛⲏ ⲧⲏⲣⲥ: ⲛⲉⲙ ⲛⲓϩⲏⲅⲟⲩⲙⲉⲛⲟⲥ ⲛⲉⲙ ⲛⲓⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ ⲛⲉⲙ ⲛⲓⲇⲓⲁⲕⲱⲛ: ⲛⲉⲙ ⲡ̀ⲧⲁⲅⲙⲁ ⲧⲏⲣϥ ⲛ̀ⲧⲉ ϯⲉⲕⲕ̀ⲗⲏⲥⲓⲁ̀: ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲁ̀ⲣⲉϩ ⲉ̀ⲣⲱⲟⲩ ⲉ̀ⲃⲟⲗ ϩⲁ ⲡⲉⲧϩⲱⲟⲩ ⲛⲓⲃⲉⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nTōbh ejen nenioti enepiskopos enorthodoksos et khen mai niven ente tioikoumenē tērs: nem nihēgoumenos nem ni-epresvuteros nem nidiakōn: nem eptagma tērf ente tiekeklēsi-a: hina ente Pi-ekhristos Pennouti areh erōou evol ha pethōou niven: entefkha nennovi nan evol." },
      { language: 'english', text: "Deacon:\n\nPray for our fathers the orthodox bishops in every place of the whole world, and the hegumens, the priests, the deacons, and all the orders of the Church, that Christ our God may keep them from every evil, and forgive us our sins." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nUtlubu 'an aba'ina el-asaqifa el-orthodoksiyyeen elladheena fi kull mawadi' el-maskouna, wal-qamamisa, wal-qusous, wash-shamamisa, wa kull tughmat el-kanisa, likay yahfazahum el-Maseeh ilahuna min kull sharr, wa yaghfir lana khatayana." },
      { language: 'arabic', text: "الشماس:\n\nاطلبوا عن آبائنا الأساقفةِ الأرثوذكسيينَ الذينَ في كلِّ مواضعِ المسكونةِ، والقمامصةِ، والقسوسِ، والشمامسةِ، وكلِّ طغماتِ الكنيسةِ، لكي يحفظَهم المسيحُ إلَهُنا من كلِّ شرٍ، ويغفرَ لنا خطايانا." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-pray-for-our-father-the-bishop-st-cyril",
    title: "Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡⲉⲛⲓⲱⲧ ⲛ̀ⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ (Pray for Our Father the Bishop, St Cyril)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡⲉⲛⲓⲱⲧ ⲛ̀ⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ (ⲙ̀ⲙⲏⲧⲣⲟⲡⲟⲗⲓⲧⲏⲥ) ⲁⲃⲃⲁ (ⲛⲓⲙ): ⲛⲉⲙ ⲛⲉⲛⲓⲟϯ ⲛ̀ⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ ⲛ̀ⲟⲣⲑⲟⲇⲟⲝⲟⲥ ⲉⲧ ϧⲉⲛ ⲙⲁⲓ ⲛⲓⲃⲉⲛ ⲛ̀ⲧⲉ ϯⲟⲓⲕⲟⲩⲙⲉⲛⲏ ⲧⲏⲣⲥ: ⲛⲉⲙ ⲛⲓϩⲏⲅⲟⲩⲙⲉⲛⲟⲥ ⲛⲉⲙ ⲛⲓⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ ⲛⲉⲙ ⲛⲓⲇⲓⲁⲕⲱⲛ: ⲛⲉⲙ ⲡ̀ⲧⲁⲅⲙⲁ ⲧⲏⲣϥ ⲛ̀ⲧⲉ ϯⲉⲕⲕ̀ⲗⲏⲥⲓⲁ̀: ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲁ̀ⲣⲉϩ ⲉ̀ⲣⲱⲟⲩ ⲉ̀ⲃⲟⲗ ϩⲁ ⲡⲉⲧϩⲱⲟⲩ ⲛⲓⲃⲉⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nTōbh ejen peniōt enepiskopos (emmētropolitēs) abba (nim): nem nenioti enepiskopos enorthodoksos et khen mai niven ente tioikoumenē tērs: nem nihēgoumenos nem ni-epresvuteros nem nidiakōn: nem eptagma tērf ente tiekeklēsi-a: hina ente Pi-ekhristos Pennouti areh erōou evol ha pethōou niven: entefkha nennovi nan evol.\n\nPi-laos:\n\nKurie ele-ēson." },
      { language: 'english', text: "Deacon:\n\nPray for our father the bishop (metropolitan), Abba ___ , and our fathers the orthodox bishops in every place of the whole world, and the hegumens, the priests, the deacons, and all the orders of the Church, that Christ our God may keep them from every evil, and forgive us our sins.\n\nPeople:\n\nLord have mercy." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nUtlubu 'an abeena el-usquf el-mukarram el-Anba ___, wa 'an kull aba'ina el-asaqifa el-orthodoksiyyeen elladheena fi kull mawadi' el-maskouna, wal-qamamisa, wal-qusous, wash-shamamisa, wa kull tughmat el-kanisa, likay yahfazahum el-Maseeh ilahuna min kull sharr, wa yaghfir lana khatayana.\n\nEsh-sha'b:\n\nYa Rabb irham." },
      { language: 'arabic', text: "الشماس:\n\nأطلبوا عن أبينا الأسقف المكرم الأنبا ___ ، وعن كلِّ أبائنا الأساقفةِ الأرثوذكسيينَ الذين في كلِّ مواضعِ المسكونةِ، والقمامصةِ، والقسوسِ، والشمامسةِ، وكلِّ طغماتِ الكنيسةِ، لكي يحفظهم المسيحُ إلَهُنا من كلِّ شرٍ، ويغفرَ لنا خطايانا.\n\nالشعب:\n\nياربُ إرحَم." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-pray-for-the-rest-of-the-orthodox-st-cyril",
    title: "Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡ̀ⲥⲱϫⲡ ⲛ̀ⲛⲓⲟⲣⲑⲟⲇⲟⲝⲟⲥ (Pray for the Rest of the Orthodox, St Cyril)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡ̀ⲥⲱϫⲡ ⲛ̀ⲛⲓⲟⲣⲑⲟⲇⲟⲝⲟⲥ ⲉⲧ ϧⲉⲛ ⲙⲁⲓ ⲛⲓⲃⲉⲛ ⲛ̀ⲧⲉ ϯⲟⲓⲕⲟⲩⲙⲉⲛⲏ ⲧⲏⲣⲥ: ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲧⲁϫⲣⲱⲟⲩ ϧⲉⲛ ⲡⲓⲛⲁϩϯ ⲛ̀ⲟⲣⲑⲟⲇⲟⲝⲟⲥ: ⲟⲩⲟϩ ⲛ̀ⲧⲉϥⲁ̀ⲣⲉϩ ⲉ̀ⲣⲱⲟⲩ ⲉ̀ⲃⲟⲗ ϩⲁ ⲡⲉⲧϩⲱⲟⲩ ⲛⲓⲃⲉⲛ ⲛ̀ⲛⲓⲉ̀ϩⲟⲟⲩ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲉ ⲡⲟⲩⲱⲛϧ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nTōbh ejen epsōgp enniorthodoksos et khen mai niven ente tioikoumenē tērs: hina ente Pi-ekhristos Pennouti tagrōou khen pinahti enorthodoksos: ouoh entefareh erōou evol ha pethōou niven enni-ehoou tērou ente pouōnkh: entefkha nennovi nan evol.\n\nPi-laos:\n\nKurie ele-ēson." },
      { language: 'english', text: "Deacon:\n\nPray for the rest of the orthodox in every place of the whole world, that Christ our God may confirm them in the orthodox faith and keep them from every evil all the days of their lives, and forgive us our sins.\n\nPeople:\n\nLord have mercy." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nUtlubu 'an baqi el-orthodoksiyyeen elladheena fi kull mawadi' el-maskouna kulliha, likay el-Maseeh ilahuna yuthabbitahum fil-eeman el-orthodoksi, wa yahfazahum min kull sharr gamee' ayyam hayatihim, wa yaghfir lana khatayana.\n\nEsh-sha'b:\n\nYa Rabb irham." },
      { language: 'arabic', text: "الشماس:\n\nاطلبوا عن باقي الأرثوذكسيينَ الذين في كلِّ مواضعِ المسكونةِ كلِّها، لكي المسيحُ إلَهُنا يثبتَهم في الإيمانِ الأرثوذكسي، ويحفظَهم من كلِّ شرٍ جميعَ أيامِ حياتِهم، ويغفرَ لنا خطايانا.\n\nالشعب:\n\nياربُ إرحَم." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-pray-for-the-place-st-cyril",
    title: "Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡ̀ⲥⲉⲙⲛⲓ (Pray for the Place, St Cyril)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡ̀ⲥⲉⲙⲛⲓ: ⲙ̀ⲡⲁⲓⲧⲟⲡⲟⲥ ⲉⲑⲟⲩⲁⲃ ⲫⲁⲓ: ⲛⲉⲙ ⲧⲟⲡⲟⲥ ⲛⲓⲃⲉⲛ: ⲛⲉⲙ ⲙⲟⲛⲁⲥⲧⲏⲣⲓⲟⲛ ⲛⲓⲃⲉⲛ ⲛ̀ⲧⲉ ⲛⲉⲛⲓⲟϯ ⲛ̀ⲟⲣⲑⲟⲇⲟⲝⲟⲥ: ⲛⲓϣⲁϥⲉⲩ ⲛⲉⲙ ⲛⲓϧⲉⲗⲗⲟⲓ ⲉⲧϣⲟⲡ ⲛ̀ϧⲏⲧⲟⲩ: ⲛⲉⲙ ⲡ̀ⲥⲉⲙⲛⲓ ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ ⲧⲏⲣϥ ⲉⲩⲥⲟⲡ: ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲁ̀ⲣⲉϩ ⲉ̀ⲣⲱⲟⲩ ⲉ̀ⲃⲟⲗ ϩⲁ ⲡⲉⲧϩⲱⲟⲩ ⲛⲓⲃⲉⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nTōbh ejen epsemni: empaitopos ethouab fai: nem topos niven: nem monastērion niven ente nenioti enorthodoksos: nishafeu nem nikhelloi etshop enkhētou: nem epsemni empikosmos tērf eusop: hina ente Pi-ekhristos Pennouti areh erōou evol ha pethōou niven: entefkha nennovi nan evol.\n\nPi-laos:\n\nKurie ele-ēson." },
      { language: 'english', text: "Deacon:\n\nPray for the security of this holy place and every place, and every monastery of our orthodox fathers; the deserts and the elders who dwell therein; and for the security of the world altogether, that Christ our God may keep them from every evil, and forgive us our sins.\n\nPeople:\n\nLord have mercy." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nUtlubu 'an tuma'neenat hadha el-mawdi' el-muqaddas, wa kull mawdi', wa kull dayr li-aba'ina el-orthodoksiyyeen, wal-barari, wash-shuyoukh es-sukkan feeha, wa tuma'neenat el-'alam agma' ma'an, likay yahfazahum el-Maseeh ilahuna min kull sharr, wa yaghfir lana khatayana.\n\nEsh-sha'b:\n\nYa Rabb irham." },
      { language: 'arabic', text: "الشماس:\n\nاطلبوا عن طمأنينةِ هذا الموضعِ المقدسِ، وكلِّ موضعٍ، وكلِّ ديرٍ لآبائنا الأرثوذكسيينَ، والبراري، والشيوخِ السكانِ فيها، وطمأنينةِ العالمِ أجمع معاً، لكي يحفظَهم المسيحُ إلَهُنا من كلِّ شرٍ، ويغفرَ لنا خطايانا.\n\nالشعب:\n\nياربُ إرحَم." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-pray-for-those-standing-st-cyril",
    title: "Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲛⲏⲉⲧⲟϩⲓ ⲉ̀ⲣⲁⲧⲟⲩ (Pray for Those Standing Here, St Cyril)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲱⲃϩ ⲉ̀ϫⲉⲛ ⲛⲏⲉⲧⲟϩⲓ ⲉ̀ⲣⲁⲧⲟⲩ ⲙ̀ⲡⲁⲓⲙⲁ ⲟⲩⲟϩ ⲉⲧⲟⲓ ⲛ̀ϣ̀ⲫⲏⲣ ⲛ̀ⲧⲱⲃϩ ⲛⲉⲙⲁⲛ: ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲁ̀ⲣⲉϩ ⲉ̀ⲣⲱⲟⲩ: ⲛ̀ⲧⲉϥⲣⲱⲓⲥ ⲉ̀ⲣⲱⲟⲩ: ⲛ̀ⲧⲉϥϣⲱⲡ ⲉ̀ⲣⲟϥ ⲛ̀ⲛⲟⲩⲧⲱⲃϩ: ⲟⲩⲟϩ ⲛ̀ⲧⲉϥⲛⲁⲓ ⲛⲱⲟⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nTōbh ejen nēetohi eratou empaima ouoh etoi eneshfēr entōbh neman: hina ente Pi-ekhristos Pennouti areh erōou: entefrōis erōou: entefshōp erof ennoutōbh: ouoh entefnai nōou: entefkha nennovi nan evol.\n\nPi-laos:\n\nKurie ele-ēson." },
      { language: 'english', text: "Deacon:\n\nPray for those who are standing in this place and who are partners with us in prayer, that Christ our God may keep them and guard them, receive their prayers to Himself, and have mercy upon them, and forgive us our sins.\n\nPeople:\n\nLord have mercy." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nUtlubu 'an el-qiyam fi hadha el-mawdi', wal-mushtarikeen fit-tilba ma'ana, likay yahfazahum el-Maseeh ilahuna wa yahrusahum, wa yaqbal ilayhi talabatihim wa yarhamahum, wa yaghfir lana khatayana.\n\nEsh-sha'b:\n\nYa Rabb irham." },
      { language: 'arabic', text: "الشماس:\n\nاطلبوا عن القيامِ في هذا الموضعِ، والمشتركينَ في الطلبةِ معنا، لكي يحفظَهم المسيحُ إلَهُنا ويحرسَهم، ويَقْبَلَ إليه طلباتهم ويرحَمَهم، ويغفرَ لنا خطايانا.\n\nالشعب:\n\nياربُ إرحَم." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-pray-for-those-who-asked-st-cyril",
    title: "Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ (Pray for Those Who Asked for Our Prayers, St Cyril)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲱⲃϩ ⲉ̀ϫⲉⲛ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ ⲉ̀ⲧⲁϥϩⲟⲛϩⲉⲛ ⲛⲁⲛ ⲉ̀ⲉⲣⲡⲟⲩⲙⲉⲩⲓ̀ ϧⲉⲛ ⲛⲉⲛϯϩⲟ ⲛⲉⲙ ⲛⲉⲛⲧⲱⲃϩ ⲡⲓⲟⲩⲁⲓ ⲡⲓⲟⲩⲁⲓ ⲕⲁⲧⲁ ⲡⲉϥⲣⲁⲛ: ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲉⲣⲡⲟⲩⲙⲉⲩⲓ̀ ⲉ̀ⲡⲓⲁ̀ⲅⲁⲑⲟⲛ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nTōbh ejen ouon niven etafhonhen nan eerpoumeu-i khen nentiho nem nentōbh piouai piouai kata pefran: hina ente Pi-ekhristos Pennouti erpoumeu-i epi-agathon ensēou niven: entefkha nenovi nan evol.\n\nPi-laos:\n\nKurie ele-ēson." },
      { language: 'english', text: "Deacon:\n\nPray for those who have bidden us to remember them in our supplications and prayers, each one according to his name, that Christ our God may remember them in goodness at all times, and forgive us our sins.\n\nPeople:\n\nLord have mercy." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nUtlubu 'an kull elladheena awsouna an nadhkurahum fi su'alatina wa talabatina, kull ahad bi-ismihi, likay el-Maseeh ilahuna yadhkurahum bil-khayr fi kull heen, wa yaghfir lana khatayana.\n\nEsh-sha'b:\n\nYa Rabb irham." },
      { language: 'arabic', text: "الشماس:\n\nاطلبوا عن كلِّ الذينَ أوصونا أن نذكرَهم في سؤالاتِنا، وطلباتِنا، كلُّ أحدٍ باسمِهِ، لكي المسيحُ إلُهُنا يذكرَهم بالخيِر في كلِّ حينٍ، ويغفرَ لنا خطايانا.\n\nالشعب:\n\nياربُ إرحَم." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-worship-god-in-fear-st-cyril",
    title: "Ⲟⲩⲱϣⲧ ⲙ̀Ⲫⲛⲟⲩϯ (Worship God in Fear and Trembling, St Cyril)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲞⲩⲱϣⲧ ⲙ̀Ⲫⲛⲟⲩϯ ϧⲉⲛ ⲟⲩϩⲟϯ ⲛⲉⲙ ⲟⲩⲥ̀ⲑⲉⲣⲧⲉⲣ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nOuōsht em-Fnouti khen ouhoti nem ou-estherter." },
      { language: 'english', text: "Deacon:\n\nWorship God in fear and trembling." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nUsgudu lillah bi-khawf wa ra'da." },
      { language: 'arabic', text: "الشماس:\n\nاسجدوا لله بخوفٍ ورعدةٍ." },
    ],
  },
  {
    id: "d-annual-liturgy-faithful-bow-to-god-st-cyril",
    title: "Ⲕⲗⲓⲛⲁⲧⲉ Ⲑⲉⲱ̀ (Bow to God in Fear, St Cyril)",
    versions: [
      { language: 'coptic', text: "Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲔⲗⲓⲛⲁⲧⲉ Ⲑⲉⲱ̀ ⲙⲉⲧⲁ ⲫⲟⲃⲟⲩ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲈ̀ⲗⲉⲏ̀ⲥⲟⲛ (ⲅ) ⲏ̀ⲙⲁⲥ ⲟ̀ Ⲑⲉⲟⲥ ⲟ̀ Ⲡⲁⲧⲏⲣ ⲟ̀ ⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ." },
      { language: 'englishCoptic', text: "Pi-diakon:\n\nKlinate The-ō meta fovou.\n\nPi-laos:\n\nEle-ēson (g) ēmas o Theos o Patēr o pantokratōr." },
      { language: 'english', text: "Deacon:\n\nBow to God in fear.\n\nPeople:\n\nHave mercy (x3) upon us, O God, the Father, the Pantocrator." },
      { language: 'englishArabic', text: "Esh-shammas:\n\nUsgudu lillah bi-khawf.\n\nEsh-sha'b:\n\nIrhamna (3) ya Allah el-Ab dabit el-kull." },
      { language: 'arabic', text: "الشماس:\n\nأسجدوا لله بخوفٍ.\n\nالشعب:\n\nإرحَمنا (٣) يا الله الآبُ ضابطَ الكلِّ." },
    ],
  },
];

// Responses said as in Matins, copied under a Liturgy of the Faithful id: [Matins id, new id]
export const liturgyFromMatins: [string, string][] = [
  ['d-annual-matins-stand-up-for-prayer', 'd-annual-liturgy-faithful-stand-up-for-prayer'],
  ['d-annual-matins-pray-for-the-departed', 'd-annual-liturgy-faithful-pray-for-the-departed'],
  ['d-annual-matins-pray-for-the-sick', 'd-annual-liturgy-faithful-pray-for-the-sick'],
  ['d-annual-matins-pray-for-travelers', 'd-annual-liturgy-faithful-pray-for-travelers'],
  ['d-annual-matins-pray-for-providers', 'd-annual-liturgy-faithful-pray-for-providers'],
];

// Each liturgy's deacon responses in order, by their id after "d-annual-liturgy-faithful-", under section headers.
// "-2" marks a response said a second time (the Short Litanies repeat the Litanies of Peace and of the Fathers).
type Entry = string | { header: string };
const threeGreatLitanies: Entry[] = [
  { header: 'Three Great Litanies' },
  'stand-up-for-prayer',
  'pray-for-peace',
  'pray-for-the-fathers',
  'pray-for-the-assemblies',
  'in-the-wisdom-of-god',
];
const commemoration: Entry[] = [
  { header: 'Commemoration of the Saints' },
  'let-those-who-read',
  'pray-for-the-departed',
  'through-the-prayers-evshes',
  'the-great-abba-antony-pinishti',
  'the-great-abba-antony-great-pinishti',
];
const fractionAndConfession: Entry[] = [
  { header: 'Fraction and Confession' },
  'amen-let-us-pray',
  'in-christ-jesus-our-lord',
  'bow-your-heads',
  'saved-amen',
  'confession',
  'confession-great',
  'peace-and-love',
];
const threeSeasons = ['pray-for-the-waters', 'pray-for-the-plants', 'pray-for-the-fruits', 'pray-for-the-waters-plants-fruits'];

export const deaconOrder: Record<LiturgyId, Entry[]> = {
  basil: [
    ...threeGreatLitanies,
    { header: 'Prayer of Reconciliation' },
    'reconciliation',
    'greet-one-another',
    'greet-one-another-great',
    { header: 'Anaphora' },
    'anaphora',
    'epiclesis',
    { header: 'Seven Short Litanies' },
    'pray-for-peace-2',
    'pray-for-the-fathers-2',
    'pray-for-priests-and-deacons',
    'pray-for-the-place',
    ...threeSeasons,
    'pray-for-the-oblations',
    ...commemoration,
    ...fractionAndConfession,
  ],
  gregory: [
    ...threeGreatLitanies,
    { header: 'Prayer of Reconciliation to the Son' },
    'reconciliation-st-gregory',
    'greet-one-another',
    'greet-one-another-great',
    { header: 'Anaphora' },
    'anaphora',
    'worship-the-lamb-st-gregory',
    { header: 'Short Litanies' },
    'pray-for-peace-2',
    'pray-for-the-fathers-2',
    'pray-for-priests-and-deacons',
    'pray-for-the-kings-st-gregory',
    'pray-for-the-government-st-gregory',
    'pray-for-the-oblations-st-gregory',
    'pray-for-the-captives-st-gregory',
    'worship-god-st-gregory',
    'worship-the-lamb-st-gregory-2',
    ...threeSeasons,
    'pray-for-the-place',
    ...commemoration,
    ...fractionAndConfession,
  ],
  cyril: [
    'in-the-wisdom-of-god',
    { header: 'Prayer of Reconciliation' },
    'reconciliation',
    'greet-one-another',
    'greet-one-another-great',
    { header: 'Litanies of the Anaphora' },
    'pray-for-peace-st-cyril',
    'pray-for-the-sick',
    'pray-for-travelers',
    ...threeSeasons,
    'pray-for-the-leaders-st-cyril',
    'let-those-who-read',
    'pray-for-the-departed',
    'pray-for-providers',
    'pray-for-the-patriarch-st-cyril',
    'pray-for-the-bishops-st-cyril',
    'pray-for-our-father-the-bishop-st-cyril',
    'pray-for-the-rest-of-the-orthodox-st-cyril',
    'pray-for-the-place-st-cyril',
    'pray-for-those-standing-st-cyril',
    'pray-for-those-who-asked-st-cyril',
    'worship-god-in-fear-st-cyril',
    'pray-for-the-priesthood-st-cyril',
    'pray-for-the-assemblies-st-cyril',
    'anaphora',
    { header: 'Institution Narrative' },
    'bow-to-god-st-cyril',
    'worship-god-the-father-st-cyril',
    ...fractionAndConfession,
  ],
};

// The people's hymns of each liturgy in Annual > Liturgy, in order (St Cyril has no Commemoration, so no
// "May Their Holy Blessings", and sings "According to Your Mercy" after "Your Death, O Lord")
const aspasmos = [
  'annual-liturgy-blessed-are-they',
  'annual-liturgy-aspasmos-adam',
  'annual-liturgy-aspasmos-adam-2',
  'annual-liturgy-aspasmos-adam-3',
  'annual-liturgy-great-greet-one-another',
  'annual-liturgy-aspasmos-watos',
  'annual-liturgy-aspasmos-watos-2',
  'annual-liturgy-aspasmos-watos-3',
];
export const hymnOrder: Record<LiturgyId, string[]> = {
  basil: [
    ...aspasmos,
    'annual-liturgy-kata-to-eleos',
    'annual-liturgy-amen-ton-thanaton',
    'annual-liturgy-may-their-holy-blessings',
    'annual-liturgy-as-it-was-and-is',
    'kiahk-liturgy-one-is-the-holy-father@annual-liturgy',
  ],
  gregory: [
    ...aspasmos,
    'annual-liturgy-kata-to-eleos',
    'annual-liturgy-amen-ton-thanaton',
    'annual-liturgy-may-their-holy-blessings',
    'annual-liturgy-as-it-was-and-is',
    'kiahk-liturgy-one-is-the-holy-father@annual-liturgy',
  ],
  cyril: [
    ...aspasmos,
    'annual-liturgy-amen-ton-thanaton',
    'annual-liturgy-kata-to-eleos',
    'annual-liturgy-as-it-was-and-is',
    'kiahk-liturgy-one-is-the-holy-father@annual-liturgy',
  ],
};
