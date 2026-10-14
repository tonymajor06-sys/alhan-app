import type { Hymn } from './hymns';

// The Arabic melody sung in the Matins of the Feast of the Nativity (الله الحي المتعالى), between the First Doxology
// and the Conclusion of the Doxologies in Arsani Sidarous's recording. Text as the user sent it; the Arabic in
// English letters was written for the app.
const verses: { english: string; arabic: string; englishArabic: string }[] = [
  {
    english: '(1/18) The great living God\nBy His Goodness wished to grant us life\nTo raise up our dire straits\nAnd elevate us to the Kingdom.',
    arabic: '(١٨/١) الله الحي المتعالى\nأراد بجوده ان يحيينا\nوينهض نوعنا البالي\nوإلى الملكوت يرقينا.',
    englishArabic: "(1/18) Allah el-hayy el-muta'ali\nArada bi-gudihi an yuhyina\nWa yunhid naw'ana el-bali\nWa ila el-malakout yuraqqina.",
  },
  {
    english: '(2/18) He sent His shining angel\nCarrying the message of love\nTo Mary, he uttered saying,\n"Rejoice O highly favored one."',
    arabic: '(١٨/٢) أرسل ملاكه المتلالي\nحاملاً البشارة لوادينا\nإلى مريم بالنطق الغالي\nإفرحي يا مختارة من بارينا.',
    englishArabic: "(2/18) Arsala malakahu el-mutala'li\nHamilan el-bishara li-wadina\nIla Maryam bin-nutq el-ghali\nIfrahi ya mukhtara min barina.",
  },
  {
    english: '(3/18) You have found grace\nAnd were exalted above the righteous\nThe God of Abraham has chosen you\nOvershadowing you with power and grace.',
    arabic: '(١٨/٣) وُهبتِ نعمةَ مع تكريم\nوفُضلتِ على الأبرار\nإذ اختارك إله إبراهيم\nوظلَلكِ بقوة ووقار.',
    englishArabic: "(3/18) Wuhibti ni'matan ma'a takreem\nWa fuddilti 'ala el-abrar\nIdh ikhtaraki ilah Ibraheem\nWa zallalaki bi-quwwa wa waqar.",
  },
  {
    english: '(4/18) To incarnate of you mysteriously\nThe Almighty Son will be born\nTo grant His servants all grace\nAnd shine upon them with His light.',
    arabic: '(١٨/٤) ليتجسد منكِ بسر عظيم\nويولد الابنُ ذو الاقتدار\nويمنح عبيدَه كلَ نعيم\nويشرق عليهم بالأنوار.',
    englishArabic: "(4/18) Li-yatagassada minki bi-sirrin 'azeem\nWa yulad el-Ibn dhu el-iqtidar\nWa yamnah 'abeedahu kull na'eem\nWa yushriq 'alayhim bil-anwar.",
  },
  {
    english: '(5/18) When you received the message\nAnd submitted to the great mystery\nThe Word came according to the plan\nAnd took flesh from you, O Mary.',
    arabic: '(١٨/٥) ومنذ اقتبلتِ التبشير\nوأذعنتِ للسر الأعظم\nحل الكلمة كالتدبير\nوأخذ جسداً منك يا مريم.',
    englishArabic: "(5/18) Wa mundhu iqtabalti et-tabsheer\nWa adh'anti lis-sirr el-a'zam\nHalla el-Kalima kat-tadbeer\nWa akhadha gasadan minki ya Maryam.",
  },
  {
    english: '(6/18) (Refrain) Glory to You, O Lord of Hosts\nWho abides in the great light\nWho came to us clothed in humanity\nAnd was born of Virgin Mary.',
    arabic: '(١٨/٦) (قرار) المجد لك يا رب الصباؤوت\nالساكن في النور الأعظم\nيا من أتانا في الناسوت\nوولد من العذراء مريم.',
    englishArabic: "(6/18) (Qarar) El-magd lak ya Rabb es-Saba'out\nEs-sakin fin-nour el-a'zam\nYa man atana fin-nasout\nWa wulida min el-'Adhra' Maryam.",
  },
  {
    english: '(7/18) The great King of glory\nThe eternal Word of the Father\nCame and was incarnate with love\nOf a pure, chaste Virgin.',
    arabic: '(١٨/٧) ملك العظمة الممجد\nكلمة الآب الأزلية\nأتانا بحب وتجسد\nمن عذراء عفيفة ونقية.',
    englishArabic: "(7/18) Malik el-'azama el-mumaggad\nKalimat el-Ab el-azaliyya\nAtana bi-hubbin wa tagassad\nMin 'Adhra' 'afeefa wa naqiyya.",
  },
  {
    english: "(8/18) As said by the Evangelist\nWho chanted the Gospel of eternal life\nThe eternal only-begotten Son\nWho is in His Father's bosom.",
    arabic: '(١٨/٨) كقول البشير الذي أنشد\nإنجيل الحياة الأبدية\nأن الابن الأزلي الأوحد\nالكائن في الأحضان الأبوية.',
    englishArabic: "(8/18) Ka-qawl el-basheer elladhi anshad\nIngeel el-hayah el-abadiyya\nAnna el-Ibn el-azali el-awhad\nEl-ka'in fil-ahdan el-abawiyya.",
  },
  {
    english: '(9/18) By His own will, He came to the world\nAnd we beheld His glory\nAs the glory of an only-begotten\nTrue Son of the merciful God.',
    arabic: '(١٨/٩) بمسرته حل في العالم\nورأينا مجده بالعيان\nكمجد وحيد معظم\nابن حق للآب الرحمن.',
    englishArabic: "(9/18) Bi-masarratihi halla fil-'alam\nWa ra'ayna magdahu bil-'iyan\nKa-magdi waheedin mu'azzam\nIbnu haqqin lil-Ab er-Rahman.",
  },
  {
    english: '(10/18) He granted us forgiveness and grace\nAnd a shining bright life\nHe renewed us with His honorable Birth\nAnd called us His children through faith.',
    arabic: '(١٨/١٠) منحنا عفوا مع نعيم\nوحياة مشرقة بلمعان\nوجددنا بمولده الكريم\nودعينا بنين له بالإيمان.',
    englishArabic: "(10/18) Manahana 'afwan ma'a na'eem\nWa hayatan mushriqatan bi-lama'an\nWa gaddadana bi-mawlidihi el-kareem\nWa du'eena baneena lahu bil-iman.",
  },
  {
    english: "(11/18) O how great are these glories\nPoured out on Adam's race\nIncomprehensible with human minds\nHow could the minds understand?",
    arabic: '(١٨/١١) يا لهذه المكارم السَنية\nالمفاضلة على جبله آدم\nلا تدركها أفهام بشرية\nوتحار العقول كيف تتفهم.',
    englishArabic: "(11/18) Ya li-hadhihi el-makarim es-saniyya\nEl-mufada 'ala gibillat Adam\nLa tudrikuha afhamun bashariyya\nWa tahar el-'uqoul kayfa tatafahham.",
  },
  {
    english: '(12/18) (Refrain) Glory to You, O Lord of Hosts\nWho abides in the great light\nWho came to us clothed in humanity\nAnd was born of Virgin Mary.',
    arabic: '(١٨/١٢) (قرار) المجد لك يا رب الصباؤوت\nالساكن في النور الأعظم\nيا من أتانا في الناسوت\nوولد من العذراء مريم.',
    englishArabic: "(12/18) (Qarar) El-magd lak ya Rabb es-Saba'out\nEs-sakin fin-nour el-a'zam\nYa man atana fin-nasout\nWa wulida min el-'Adhra' Maryam.",
  },
  {
    english: '(13/18) All those of human tongues\nToday rejoice with the Newborn\nThey sing with joyful voices\nChanting merrily with David.',
    arabic: '(١٨/١٣) آل اللغات البشرية\nاليوم مبتهجون بالمولود\nيرتلون بأصوات شجية\nمترنمين بتهليل مع داود.',
    englishArabic: "(13/18) Al el-lughat el-bashariyya\nEl-yawm mubtahigoun bil-mawloud\nYurattiloun bi-aswatin shagiyya\nMutarannimeen bi-tahleelin ma'a Dawoud.",
  },
  {
    english: '(14/18) All the high ranks\nWorship His greatness\nCrying with spiritual melodies\nSanctifying the Lord with reverence.',
    arabic: '(١٨/١٤) كل الطقوس العُلوية\nيخضعون لعظمته بسجود\nهاتفين بأنغام روحية\nلتقديس الرب المعبود.',
    englishArabic: "(14/18) Kull et-tuqous el-'ulwiyya\nYakhda'oun li-'azamatihi bi-sugoud\nHatifeen bi-anghamin rouhiyya\nLi-taqdees er-Rabb el-ma'boud.",
  },
  {
    english: '(15/18) The Almighty Son was born today\nFrom the Virgin, the offspring of saints\nHe was wholly manifested\nAs revealed in the Scriptures.',
    arabic: '(١٨/١٥) اليوم ولد الابن المتعال\nمن العذراء نسل الأبرار\nواتضح علانية بكل كمال\nكما أوحى في الأسفار.',
    englishArabic: "(15/18) El-yawm wulida el-Ibn el-muta'al\nMin el-'Adhra' nasl el-abrar\nWa ittadaha 'alaniyatan bi-kull kamal\nKama awha fil-asfar.",
  },
  {
    english: '(16/18) The King of might and glory\nWill shine in Bethlehem\nHis manifestation of ancient times\nEternal, hidden from the eyes.',
    arabic: '(١٨/١٦) إن ملك العظمة والجلال\nيشرق في بيت لحم بالأنوار\nوظهوره القديم قبل الأحبال\nأزلي منزه عن الأبصار.',
    englishArabic: "(16/18) Inna malik el-'azama wal-galal\nYushriq fi Bayt Lahm bil-anwar\nWa zuhourahu el-qadeem qabl el-ahbal\nAzaliyyun munazzahun 'an el-absar.",
  },
  {
    english: '(17/18) Blessed are you O City of David\nWherein goodness has appeared\nYour Shepherd came out of You\nHail to you O Bethlehem!',
    arabic: '(١٨/١٧) يا مدينة داود طوباك\nيا من فيك الخير عم\nمنك ظهر الذي يرعاك\nفسلام عليك يا بيت لحم.',
    englishArabic: "(17/18) Ya madinat Dawoud toubaki\nYa man feeki el-khayr 'amm\nMinki zahara elladhi yar'aki\nFa-salamun 'alayki ya Bayt Lahm.",
  },
  {
    english: '(18/18) (Refrain) Glory to You, O Lord of Hosts\nWho abides in the great light\nWho came to us clothed in humanity\nAnd was born of Virgin Mary.',
    arabic: '(١٨/١٨) (قرار) المجد لك يا رب الصباؤوت\nالساكن في النور الأعظم\nيا من أتانا في الناسوت\nوولد من العذراء مريم.',
    englishArabic: "(18/18) (Qarar) El-magd lak ya Rabb es-Saba'out\nEs-sakin fin-nour el-a'zam\nYa man atana fin-nasout\nWa wulida min el-'Adhra' Maryam.",
  },
];

const AUDIO = 'nativity-matins-melody-arabic-arsani.m4a';
const join = (key: 'english' | 'arabic' | 'englishArabic') => verses.map((v) => v[key]).join('\n\n');

export const nativityMatinsMelody: Hymn = {
  id: 'nativity-matins-melody',
  title: 'Nativity Matins Melody (The Great Living God)',
  versions: [
    { language: 'arabic', text: join('arabic'), audio: AUDIO },
    { language: 'englishArabic', text: join('englishArabic'), audio: AUDIO },
    { language: 'english', text: join('english') },
  ],
};
