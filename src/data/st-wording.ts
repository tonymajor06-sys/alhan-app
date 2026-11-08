// Spirit & Truth's wording (used with permission) for the verses where the app said it in other words: for each hymn
// (by id), each language's verses as they were and as Spirit & Truth has them for the same Coptic (and its Coptic where
// it spells a word otherwise), with the Arabic in English letters rewritten to match. Made by
// scripts/st-wording/build.py; applied in hymns-build.ts.
export const stWording: Record<string, Partial<Record<'coptic' | 'english' | 'arabic' | 'englishArabic', [string, string][]>>> = {
  "annual-distribution-concluding-hymn": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen.", "Lord have mercy. Lord have mercy. Lord bless. Amen."], ["We proclaim and say: O our Lord Jesus Christ, the Son of God, accepted unto Himself circumcision. Save us and have mercy on us.", "We cry out and say: O our Lord Jesus Christ. The Son of God, accepted unto Himself circumcision. Save us and have mercy on us."], ["We proclaim and say: O our Lord Jesus Christ, the Son of God, was transfigured upon Mount Tabor.", "We proclaim and say: O our Lord Jesus Christ, the Son of God, who was transfigured on Mount Tabor."]],
    arabic: [["نصرخ قائلين: يا ربنا يسوع المسيح بارك مياه النهر، ولتكن رحمتُكَ وسلامُكَ حصناً لشعبِك، خلصنا وارحَمنا.", "نصرخ قائلين : يا ربنا يسوع المسيح بارك مياه النهر، لتكن رحمتُكَ وسلامُكَ حصناً لشعبِك خلصنا وارحَمنا."]],
    englishArabic: [["Nasrukh qaa-ileen: ya rabbana Yasoo el-Maseeh, barik miyaah en-nahr, wal-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna.", "Nasrukh qa'ileen: ya Rabbana Yasou' el-Maseeh, barik miyah en-nahr, li-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna."]],
  },
  "annual-distribution-pi-oik": {
    coptic: [["Ⲁ̀ⲣⲉⲙⲁⲥⲥⲟⲩ ⲁϭⲛⲉ ⲑⲱⲗⲉⲃ: ⲁϥϯ ⲛⲁⲛ ⲙ̀ⲡⲉϥⲥⲱⲙⲁ: ⲛⲉⲙ ⲡⲉϥⲥ̀ⲛⲟϥ ⲉⲧⲧⲁⲓⲏ̀ⲟⲩⲧ: ⲁⲛⲱⲛϧ ϣⲁ ⲉ̀ⲛⲉϩ.", "Ⲁ̀ⲣⲉⲙⲁⲥϥ ⲁϭⲛⲉ ⲑⲱⲗⲉⲃ: ⲁϥϯ ⲛⲁⲛ ⲙ̀ⲡⲉϥⲥⲱⲙⲁ: ⲛⲉⲙ ⲡⲉϥⲥ̀ⲛⲟϥ ⲉⲧⲧⲁⲓⲏ̀ⲟⲩⲧ: ⲁⲛⲱⲛϧ ϣⲁ ⲉ̀ⲛⲉϩ."], ["Ⲧⲉⲛϯϩⲟ ⲧⲉⲛⲧⲱⲃϩ: ⲉ̀ⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲩⲓⲁ̀: ⲛ̀ⲧⲟⲧϥ ⲙ̀ⲡⲓⲙⲁⲓⲣⲱⲙⲓ.", "Ⲧⲉⲛϯϩⲟ ⲧⲉⲛⲧⲱⲃϩ: ⲉ̀ⲑⲣⲉⲛϣⲁϣⲛⲓ ⲉⲩⲛⲁⲓ: ϩⲓⲧⲉⲛ ⲛⲉⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲟⲧϥ ⲙ̀ⲡⲓⲙⲁⲓⲣⲱⲙⲓ."], ["Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲩⲓⲁ̀ ⲛ̀ⲧⲉ ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉ̀ⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ̀: Ⲡ̀ⲟ̅ⲥ̅ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.", "Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ ⲛ̀ⲧⲉ ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉ̀ⲑⲟⲩⲁⲃ Ⲙⲁⲣⲓⲁ̀: Ⲡ̀ⲟ̅ⲥ̅ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ."], ["Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲩⲓⲁ̀ ⲛ̀ⲧⲉ ⲛⲓⲁ̀ⲣⲭⲏⲁ̀ⲅⲅⲉⲗⲟⲥ ⲉ̅ⲑ̅ⲩ̅ Ⲙⲓⲭⲁⲏⲗ ⲛⲉⲛ Ⲅⲁⲃⲣⲓⲏⲗ: Ⲡ̀ⲟ̅ⲥ̅ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.", "Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ ⲛ̀ⲧⲉ ⲛⲓⲁ̀ⲣⲭⲏⲁ̀ⲅⲅⲉⲗⲟⲥ ⲉ̅ⲑ̅ⲩ̅ Ⲙⲓⲭⲁⲏⲗ ⲛⲉⲙ Ⲅⲁⲃⲣⲓⲏⲗ: Ⲡ̀ⲟ̅ⲥ̅ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ."]],
    english: [["You have brought Him forth without blemish; He gave us His body and His precious blood, and we live forever.", "You bore Him without blemish, He gave unto us, His honored Body and Blood, and we live forever."], ["Around You stand the Cherubim, and the Seraphim, and they cannot look at You.", "You are surrounded, by the cherubim, and the seraphim, and they can not see You."], ["Therefore we exalt you befittingly, with prophetic hymnology.", "Wherefore we, magnify you befittingly, with prophetic, hymnology."]],
    arabic: [["ولدته بغير دنس، وأعطانا جسده ودمه الكريم فحيينا الى الأبـد.", "ولدته بغير دنس، وأعطانا جسده، ودمه الكريمين، فحيينا إلى الأبد."], ["يقوم حولك الشاروبيم والسارافيم ولا يستطيعون أن ينظروك.", "يقوم حولك، الشاروبيم، والسِّرافيم، ولا يستطيعون أن ينظروك."], ["بشفاعات والدة الاله القديسة مريم، يا رب أنعم لنا بغفران خطايانا.", "بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا."], ["بشفاعات رئيسى الملائكة المقدسين ميخائيل وغبريال يا رب أنعم لنا بغفران خطايانا.", "بشفاعات رئيسي الملائكة المقدسين ميخائيل وغبريال، ياربُ انعم لنا بغفرانِ خطايانا ."]],
    englishArabic: [["Waladtihi bi-ghayri danas, wa a`tana gasadahu wa damahu al-karam fa-hayyna ila al-abad.", "Waladtihi bi-ghayri danas, wa a'tana gasadahu, wa damahu el-kareemayn, fa-hayeena ila el-abad."], ["Yaqumu hawlaka ash-sharubim wa as-sarafim wa la yastati`una an yanzuruk.", "Yaqoum hawlak, esh-Sharoubeem, wes-Sarafeem, wa la yastatee'oun an yanzurouk."], ["Bi-shafa`at walidat al-ilah al-qiddisah Maryam, ya Rabb an`am lana bi-ghufran khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabb an'im 'alayna bi-maghfirat khatayana."]],
  },
  "annual-distribution-psalm-150": {
    coptic: [["ⲡⲛⲓⲥⲓ ⲛⲓⲃⲉⲛ ⲙⲁⲣⲟⲩⲥⲙⲟⲩ ⲧⲏⲣⲟⲩ ⲉ̀ⲫⲣⲁⲛ ⲙ̀ⲡ̀ⲥⲟⲓⲥ Ⲡⲉⲛⲛⲟⲩϯ. ⲁⲗ.", "Ⲛⲓϥⲓ ⲛⲓⲃⲉⲛ ⲙⲁⲣⲟⲩⲥⲙⲟⲩ ⲧⲏⲣⲟⲩ ⲉ̀ⲫⲣⲁⲛ ⲙ̀Ⲡϭⲟⲓⲥ Ⲡⲉⲛⲛⲟⲩϯ. ⲁⲗ."], ["Ⲅⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ Ⲁⲅⲓⲱ Ⲡⲛⲉⲩⲙⲁⲧⲓ. ⲁⲗ.", "Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ Ⲁⲅⲓⲱ Ⲡⲛⲉⲩⲙⲁⲧⲓ. ⲁⲗ."], ["Ⲕⲉⲙⲁⲣⲱⲟⲩⲧ ⲁⲗⲏⲑⲱⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲓ ⲁⲕⲥⲱⲧⲓ ⲙ̀ⲙⲟⲛ.", "Ⲕⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲁⲗⲏⲑⲱⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲓ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ."], ["Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ϣⲏⲣⲓ ⲙ̀Ⲫϯ: ⲁⲩⲙⲁⲥϥ ϧⲉⲛ Ⲃⲏⲑⲗⲉⲉⲙ.", "Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ϣⲏⲣⲓ ⲙ̀Ⲫϯ: ⲫⲏⲉⲧⲁⲩⲙⲁⲥϥ ϧⲉⲛ Ⲃⲏⲑⲗⲉⲉⲙ."]],
    english: [["Jesus Christ the Son of God, was born in Bethlehem.", "Jesus Christ the Son of God, who was born in Bethlehem."], ["Jesus Christ the Son of God, has entered Jerusalem.", "Jesus Christ the Son of God, entered into Jerusalem."], ["Jesus Christ the King of glory, has risen from the dead.", "Jesus Christ the King of glory, is risen from the dead."], ["Christ has risen from the dead, and ascended into the heavens.", "Christ is risen from the dead, and has ascended into the heavens."]],
    arabic: [["بارك إكليل السنة، بصلاحك يا رب.", "بارك إكليل [هذه] السنة، بصلاحك يا رب."], ["سبحوا في فلك قوته، هللويا.", "سبحوه في جَلَدِ قوتِه. هلليلويا."], ["كل نسمة فلتسبح اسم الرب إلهنا، هللويا.", "كلُّ نسمةِ فلتسبح إسمَ الربِ إلَهُنا. هلليلويا."], ["المجد للآب والابن والروح القدس، هللويا.", "المجدُ للآبِ والابنِ والروحِ القدس. هلليلويا."], ["المجد هو لإلهنا، هللويا.", "المجد هو لإلهنا. هلليلويا."]],
  },
  "annual-liturgy-agios": {
    coptic: [["Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ: Ⲁⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ: Ⲁⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ: ⲟ̀ ⲉⲕ ⲡⲁⲣⲑⲉⲛⲟⲩ ⲅⲉⲛⲛⲉⲑⲓⲥ: ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.", "Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ: Ⲁⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ: Ⲁⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ: ⲟ̀ ⲉⲕ ⲡⲁⲣⲑⲉⲛⲟⲩ ⲅⲉⲛⲛⲉⲑⲏⲥ: ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ."]],
    arabic: [["قدوسُ الله. قدوسُ القوى. قدوسُ الحي الذي لا يموتُ. يا من وُلِّدَ من العذراء، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى وُلِدَ مِنَ العَذْراءِ إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من صُلِّبَ عنا، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى صُلِبَ عنّا إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من قامَ من الامواتِ وصعدَ إلى السموات، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الّذى قامَ مِنَ الأمْواتِ وصَعِدَ إلَى السَّمواتِ إرْحَمْنا."]],
    englishArabic: [["Quddoos Allah. Quddoos el-qawi. Quddoos el-hayy elladhi la yamoot. Ya man wulida min el-'adhra', irhamna.", "Quddousun Allah. Quddousun el-qawi. Quddousun el-hayy alladhi la yamout alladhi wulida min el-'Adhra' irhamna."], ["Quddoos Allah. Quddoos el-qawi. Quddoos el-hayy elladhi la yamoot. Ya man sulliba 'anna, irhamna.", "Quddousun Allah. Quddousun el-qawi. Quddousun el-hayy alladhi la yamout alladhi suliba 'anna irhamna."], ["Quddoos Allah. Quddoos el-qawi. Quddoos el-hayy elladhi la yamoot. Ya man qama min el-amwat wa sa'ida ila es-samawat, irhamna.", "Quddousun Allah. Quddousun el-qawi. Quddousun el-hayy alladhi la yamout alladhi qama min el-amwat wa sa'ida ila es-samawat irhamna."]],
  },
  "annual-liturgy-aspasmos-watos": {
    arabic: [["يا ربُّ إلهَ القوات، ارجعْ واطّلعْ من السماءِ، وانظرْ وتعهّدْ هذه الكرمةَ، وأصلحْها وثبّتْها، هذه التي غرستْها يمينُك.", "أيها الرب إله القوات، إرجع واطلع من السماء، وانظر وتعهد هذه الكرمة، أصلحها وثبتها، هذه التي غرستها يمينك."], ["قدوسٌ. قدوسٌ. قدوسٌ. ربُ الصاباؤوت. السماءُ والأرضُ مملوءتان من مجدِكَ الأقدس.", "قدوس قدوس قدوس، رب الصاباؤت، السماء والأرض، مملوءتان من مجدك الأقدس."]],
    englishArabic: [["Ya Rabb ilah el-quwwat, irgi' wattali' min es-sama', wanzur wa ta'ahhad hadhihi el-karma, wa aslihha wa thabbitha, hadhihi allati gharasatha yameenuk.", "Ayyuha er-Rabb ilah el-quwwat, irgi' wattali' min es-sama', wanzur wa ta'ahhad hadhihi el-karma, aslihha wa thabbitha, hadhihi allati gharasatha yameenuk."], ["Quddoosun, quddoosun, quddoos. Rabbu es-saba'oot. Es-sama'u wal-ardu mamloo'atani min magdika el-aqdas.", "Quddoosun quddoosun quddoos Rabbu es-Saba'out Es-sama'u wal-ardu mamloo'atani min magdika el-aqdas."]],
  },
  "annual-liturgy-hitens": {
    coptic: [["Ϩⲓⲧⲉⲛ ⲛⲟⲩⲉⲩⲭⲏ ⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁⲣⲭⲏⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (ⲛⲓⲙ): Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.", "Ϩⲓⲧⲉⲛ ⲛⲟⲩⲉⲩⲭⲏ ⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁⲣⲭⲓⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (ⲛⲓⲙ): Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ."]],
    english: [["Through the prayers of the struggle-mantled martyr, my lord Prince George, O Lord, grant us the forgiveness of our sins.", "Through the prayers of the victorious martyr: my lord Prince George: O Lord, grant us the forgiveness of our sins."], ["Through the prayers of the struggle-mantled martyr, Philopater Mercurius, O Lord, grant us the forgiveness of our sins.", "Through the prayers of the victorious martyr: Philopater Mercurius: O Lord, grant us the forgiveness of our sins."], ["Through the prayers of the saints of this day, each one according to their names, O Lord, grant us the forgiveness of our sins.", "Through the prayers of the saints of this day, each one according to their name, O Lord, grant us the forgiveness of our sins."]],
    arabic: [["بشفاعاتِ والِدةِ الإلهِ القدِّيسةِ مريمَ، يا ربُّ أنعِمْ لَنا، بمغفِرةِ خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."], ["بشفاعات رئيس الملائكة الطاهر غبريال المبشر. يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات، رئيس الملائكة الطاهر، غبريال المبشر، يا رب أنعم علينا بمغفرة خطايانا."], ["بصلواتِهم إحفظ حياة أبينا المكرم رئيس الكهنة البابا الأنبا(...)، يارب أنعم علينا بمغفرة خطايانا.", "بصلواتِهم إحفظ حياة أبينا المكرم رئيس الكهنة البابا الأنبا ___، ياربُ أنعم علينا بمغفرة خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-ilah el-qiddisa Maryam, ya rabbu an'im lana, bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "annual-liturgy-hymn-of-intercessions": {
    coptic: [["Ϩⲓⲧⲉⲛ ⲛⲟⲩⲉⲩⲭⲏ ⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁⲣⲭⲏⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (ⲛⲓⲙ): Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.", "Ϩⲓⲧⲉⲛ ⲛⲟⲩⲉⲩⲭⲏ ⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁⲣⲭⲓⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (ⲛⲓⲙ): Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ."]],
    english: [["Through the prayers of the struggle-mantled martyr, my lord Prince George, O Lord, grant us the forgiveness of our sins.", "Through the prayers of the victorious martyr: my lord Prince George: O Lord, grant us the forgiveness of our sins."], ["Through the prayers of the struggle-mantled martyr, Philopater Mercurius, O Lord, grant us the forgiveness of our sins.", "Through the prayers of the victorious martyr: Philopater Mercurius: O Lord, grant us the forgiveness of our sins."], ["Through the prayers of the saints of this day, each one according to their names, O Lord, grant us the forgiveness of our sins.", "Through the prayers of the saints of this day, each one according to their name, O Lord, grant us the forgiveness of our sins."]],
    arabic: [["بشفاعاتِ والِدةِ الإلهِ القدِّيسةِ مريمَ، يا ربُّ أنعِمْ لَنا، بمغفِرةِ خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."], ["بشفاعات رئيس الملائكة الطاهر غبريال المبشر. يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات، رئيس الملائكة الطاهر، غبريال المبشر، يا رب أنعم علينا بمغفرة خطايانا."], ["بصلواتِهم إحفظ حياة أبينا المكرم رئيس الكهنة البابا الأنبا(...)، يارب أنعم علينا بمغفرة خطايانا.", "بصلواتِهم إحفظ حياة أبينا المكرم رئيس الكهنة البابا الأنبا ___، ياربُ أنعم علينا بمغفرة خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-ilah el-qiddisa Maryam, ya rabbu an'im lana, bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "annual-liturgy-offering-golden-censer": {
    english: [["This is the censer of pure gold bearing the aroma, in the hands of Aaron the priest, offering up incense on the altar.", "This censer of pure gold, bearing the aroma, is in the hands of Aaron the priest, offering up incense upon the altar."]],
  },
  "annual-liturgy-pihmot-gar": {
    english: [["May the clergy and all the people be safe in the Lord. Amen. So be it.", "May the clergy and all the people be safe in the Lord. Amen, so it shall be. it."]],
  },
  "annual-liturgy-taishori-hitens-bishop": {
    coptic: [["Ϩⲓⲧⲉⲛ ⲛⲟⲩⲉⲩⲭⲏ ⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁⲣⲭⲏⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (ⲛⲓⲙ): Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.", "Ϩⲓⲧⲉⲛ ⲛⲟⲩⲉⲩⲭⲏ ⲁ̀ⲣⲉϩ ⲉ̀ⲡ̀ⲱⲛϧ ⲙ̀ⲡⲉⲛⲓⲱⲧ ⲉⲧⲧⲁⲓⲏⲟⲩⲧ ⲛ̀ⲁⲣⲭⲓⲉ̀ⲣⲉⲩⲥ ⲡⲁⲡⲁ ⲁⲃⲃⲁ (ⲛⲓⲙ): Ⲡ̀ϭⲟⲓⲥ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ: ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ."]],
    english: [["This is the censer of pure gold bearing the aroma, in the hands of Aaron the priest, offering up incense on the altar.", "This censer of pure gold, bearing the aroma, is in the hands of Aaron the priest, offering up incense upon the altar."], ["Through the prayers of the struggle-mantled martyr, my lord Prince George, O Lord, grant us the forgiveness of our sins.", "Through the prayers of the victorious martyr: my lord Prince George: O Lord, grant us the forgiveness of our sins."], ["Through the prayers of the struggle-mantled martyr, Philopater Mercurius, O Lord, grant us the forgiveness of our sins.", "Through the prayers of the victorious martyr: Philopater Mercurius: O Lord, grant us the forgiveness of our sins."], ["Through the prayers of the saints of this day, each one according to their names, O Lord, grant us the forgiveness of our sins.", "Through the prayers of the saints of this day, each one according to their name, O Lord, grant us the forgiveness of our sins."]],
    arabic: [["بشفاعاتِ والِدةِ الإلهِ القدِّيسةِ مريمَ، يا ربُّ أنعِمْ لَنا، بمغفِرةِ خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."], ["بشفاعات رئيس الملائكة الطاهر غبريال المبشر. يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات، رئيس الملائكة الطاهر، غبريال المبشر، يا رب أنعم علينا بمغفرة خطايانا."], ["بصلواتِهم إحفظ حياة أبينا المكرم رئيس الكهنة البابا الأنبا(...)، يارب أنعم علينا بمغفرة خطايانا.", "بصلواتِهم إحفظ حياة أبينا المكرم رئيس الكهنة البابا الأنبا ___، ياربُ أنعم علينا بمغفرة خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-ilah el-qiddisa Maryam, ya rabbu an'im lana, bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "annual-matins-concluding-hymn": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen.", "Lord have mercy. Lord have mercy. Lord bless. Amen."], ["We proclaim and say, O our Lord Jesus Christ, who was born in Bethlehem, according to the prophetic sayings. Save us and have mercy on us.", "We proclaim and say: “O our Lord Jesus Christ, who was born in Bethlehem, according to the prophetic voices.\" Save us and have mercy on us."]],
    arabic: [["نصرخ قائلين: يا ربنا يسوع المسيح بارك مياه النهر، ولتكن رحمتُكَ وسلامُكَ حصناً لشعبِك، خلصنا وارحَمنا.", "نصرخ قائلين : يا ربنا يسوع المسيح بارك مياه النهر، لتكن رحمتُكَ وسلامُكَ حصناً لشعبِك خلصنا وارحَمنا."]],
    englishArabic: [["Nasrukh qaa-ileen: ya rabbana Yasoo el-Maseeh, barik miyaah en-nahr, wal-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna.", "Nasrukh qa'ileen: ya Rabbana Yasou' el-Maseeh, barik miyah en-nahr, li-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna."]],
  },
  "annual-matins-doxology-apostles": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛⲉⲙ ⲡⲓϣ̀ⲃⲉⲥ̀ⲛⲁⲩ ⲙ̀ⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛⲉⲙ ⲡⲓϣ̀ⲃⲉⲥ̀ⲛⲁⲩ ⲙ̀ⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Also Philip and Matthew, Bartholomew and Thomas: James the Son of Alphaeus: and Simon the Canaanite", "Philip and Matthew, Bartholomew and Thomas, James the Son of Alphaeus, and Simon the Canaanite."], ["Matthias, who was chosen, in place of Judas: all of them and the rest: followed the Master", "Matthias was chosen, instead of Judas, and was counted with the rest, who followed the Master."], ["Their voice went forth, upon the face of the whole earth: and their words have reached: the ends of the world", "Their voices went forth, onto the face of the whole earth, and their words have reached, the ends of the world."], ["Pray to the Lord on our behalf, my lords and fathers the apostles: and the seventy-two disciples: that He may forgive us our sins", "Pray to the Lord on our behalf, O my lords and fathers the Apostles, and the seventy two disciples, that He may forgive us our sins."]],
  },
  "annual-matins-doxology-archangel-michael": {
    coptic: [["Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ: Ⲙⲓⲭⲁⲏⲗ ⲡⲓⲁ̀ⲣⲭⲱⲛ ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟⲩⲓ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ: Ⲙⲓⲭⲁⲏⲗ ⲡⲓⲁ̀ⲣⲭⲱⲛ ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟⲩⲓ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Intercede on our behalf: O holy archangel: Michael the head of heavenly: that He may forgive us our sins.", "Intercede on our behalf: O holy archangel: Michael the head of the heavenly: that He may forgive us our sins."]],
    arabic: [["اشفع فينا أمام الرب: يا رئيس الملائكة الطاهر ميخائيل رئيس السمائيين: ليغفر لنا خطايانا.", "اشفع فينا يارئيس الملائكة الطاهر ميخائيل رئيس السمائيين ليغفر لنا خطايانا."]],
    englishArabic: [["Ishfa' feena amam er-Rabb: ya ra'is el-mala'ika et-tahir: Mikhail ra'is es-samma'iyyin: li-yaghfir lana khatayana.", "Ishfa' feena ya ra'ees el-mala'ika et-tahir Mikha'eel ra'ees es-sama'iyyeen li-yaghfir lana khatayana."]],
  },
  "annual-matins-doxology-conclusion": {
    coptic: [["Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
  },
  "annual-matins-doxology-heavenly-beings": {
    coptic: [["Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲥ̀ⲧⲣⲁⲧⲓⲁ ⲛ̀ⲁⲅⲅⲉⲗⲓⲕⲟⲛ: ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲥ̀ⲧⲣⲁⲧⲓⲁ ⲛ̀ⲁⲅⲅⲉⲗⲓⲕⲟⲛ: ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Intercede on our behalf, O angelic armies: and heavenly orders: that He may forgive us our sins", "Intercede on our behalf, O angelic hosts, and all the heavenly multitudes, that He may forgive us our sins."]],
  },
  "annual-matins-doxology-philopater-mercurius": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Hail to you O martyr: hail to the noble hero: hail to the struggle-bearer: Philopater Mercurius", "Hail to you O martyr: hail to the courageous hero: hail to the struggle bearer: Philopater Mercurius."]],
  },
  "annual-matins-doxology-pope-kyrillos-vi": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Pray to the Lord on our behalf: our holy father the patriarch: Abba Kyrillos the sixth: that He may forgive us our sins", "Pray to the Lord on our behalf: our holy father the patriarch: Papa Abba Kyrillos the Sixth: that He may forgive us our sins."]],
  },
  "annual-matins-doxology-st-mark": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    arabic: [["اطلب من الرب عنا: يا ناظر الإله الإنجيلي: مرقس الرسول: ليغفر لنا خطايانا", "اطلب من الرب عنا ياناظر الإله الإنجيلي مرقس الرسول ليغفر لنا خطايانا."]],
  },
  "annual-matins-doxology-st-mark-2": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    arabic: [["أُطلب من الرب عنا: يا ناظر الإله الإنجيلي: مرقس الرسول: ليغفر لنا خطايانا", "اطلب من الرب عنا ياناظر الإله الإنجيلي مرقس الرسول ليغفر لنا خطايانا."]],
  },
  "annual-matins-doxology-virgin-mary": {
    english: [["\"O our Lord Jesus Christ: make for Yourself within us: a temple of Your Holy Spirit: glorifying You.\"", "O our Lord Jesus Christ, make in us a sanctuary, for Your Holy Spirit, ever-glorifying You."]],
  },
  "annual-matins-gospel-response": {
    english: [["Intercede on our behalf, O the Lady of us all the Theotokos, Mary the Mother of our Savior, that He may forgive us our sins.", "Intercede on our behalf, O Lady of us all, the Theotokos, Mary, the mother of our Savior, that He may forgive us our sins."]],
    arabic: [["إشفعي فينا أمام الرب، يا سيدتنا كلنا السيدة والدة الإله، مريم أم مخلصنا، ليغفر لنا خطايانا.", "أشفعي فينا يا سيدتَنا كلِنا، السيدة والدة الإله مريم أم مخلصنا، ليغفرَ لنا خطايانا."]],
    englishArabic: [["Ishfa'i fina amam er-Rabb, ya sayyidatana kullina es-sayyida walidat el-Ilah, Maryam umm mukhallisina, li-yaghfir lana khatayana.", "Ishfa'i feena ya sayyidatana kullina, es-sayyida walidat el-Ilah Maryam umm mukhallisina, li-yaghfir lana khatayana."]],
  },
  "annual-matins-intro-doxologies": {
    coptic: [["Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϩⲣⲉⲛ Ⲡⲭ̅ⲥ̅: ⲫⲏⲉⲧⲁⲣⲉϫ̀ⲫⲟϥ: ϩⲟⲡⲱⲥ ⲛ̀ⲧⲉϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.", "Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϩⲣⲉⲛ Ⲡⲭ̅ⲥ̅: ⲫⲏⲉⲧⲁⲣⲉϫ̀ⲫⲟϥ: ϩⲟⲡⲱⲥ ⲛ̀ⲧⲉϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ."], ["Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["O Virgin Mary, the holy Theotokos, the faithful advocate for all mankind.", "O Virgin Mary, the holy Theotokos, the trusted advocate, of the human race."], ["Intercede on our behalf before Christ whom you bore, that He may grant us the forgiveness of our sins.", "Intercede on our behalf, before Christ whom you have born, that He may grant unto us, the forgiveness of our sins."], ["We ask you to remember us, O our faithful advocate, before our Lord Jesus Christ, that He may forgive us our sins.", "We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["أيتها العذراء مريم، والدة الاله القديسة، الشفيعة الأمينة لجنس البشر.", "أيتها العذراء مريم، والده الإله القديسة، الشفيعة الأمينة، التي لجنس البشر."], ["اشفعى فينا أمام المسيح الذى ولدته، لكى ينعم لنا بمغفرة خطايانا.", "إشفعي فينا، أمام المسيح الذي ولدتِه، لكي ينعم علينا، بمغفرة خطايانا."], ["نسألك أن تذكرينا أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا.", "نَسْألُكِ اذْكرينا أيَّتُها الشَّفيعَةُ المؤْتَمَنةُ أَمامَ ربِّنا يَسوعِ المسيحِ ليغْفِرَ لَنا خَطايانا."]],
    englishArabic: [["Ayyatuha el-'azra Maryam, walidat el-ilah el-qiddisa, esh-shafee'a el-ameena li-gins el-bashar.", "Ayyatuha el-'Adhra' Maryam, walidat el-Ilah el-qiddeesa, esh-shafee'a el-ameena, allati li-gins el-bashar."], ["Ishfa'i feena amam el-Maseeh el-lazi waladtihi, li-kay yan'ama lana bi-maghfirat khataya-na.", "Ishfa'i feena amam el-Maseeh el-lazi waladtihi li-kay yan'ama 'alayna bi-maghfirat khataya-na."], ["Nas'aluki an tazkoreena ayyatuha esh-shafee'a el-mu'tamana, amam Rabbina Yasou' el-Maseeh, li-yaghfira lana khataya-na.", "Nas'aluki udhkurina ayyatuha esh-shafee'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfira lana khataya-na."]],
  },
  "annual-matins-verse-of-cymbals": {
    coptic: [["Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϧⲉⲛ ⲟⲩⲭⲉⲣⲉ ⲉϥⲟⲩⲁⲃ: ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲑⲙⲁⲩ ⲙ̀Ⲫⲛⲉⲑⲟⲩⲁⲃ.", "Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϧⲉⲛ ⲟⲩⲭⲉⲣⲉ ⲉϥⲟⲩⲁⲃ: ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲑⲙⲁⲩ ⲙ̀ⲫⲏⲉⲑⲟⲩⲁⲃ."], ["Ⲭⲉⲣⲉ Ⲙⲓⲭⲁⲏⲗ: ⲡⲓⲛⲓϣϯ ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ: ⲭⲉⲣⲉ Ⲅⲁⲃⲣⲓⲏⲗ: ⲡⲓⲥⲟⲧⲡ ⲙ̀ⲡⲓⲣⲉϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ.", "Ⲭⲉⲣⲉ Ⲙⲓⲭⲁⲏⲗ: ⲡⲓⲛⲓϣϯ ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ: ⲭⲉⲣⲉ Ⲅⲁⲃⲣⲓⲏⲗ: ⲡⲓⲥⲟⲧⲡ ⲙ̀ⲡⲓϥⲁⲓϣⲉⲛⲛⲟⲩϥⲓ."], ["Ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲫⲛⲉⲑⲟⲩⲁⲃ: ⲡⲓⲙⲉⲛⲣⲓⲧ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅: ⲡⲉⲛⲓⲱⲧ Ⲡⲓϣⲱⲓ ⲕⲁⲙⲉⲗ: ⲡⲓϩⲏⲅⲟⲩⲙⲉⲛⲟⲥ.", "Ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲫⲏⲉⲑⲟⲩⲁⲃ: ⲡⲓⲙⲉⲛⲣⲓⲧ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅: ⲡⲉⲛⲓⲱⲧ Ⲡⲓϣⲱⲓ ⲕⲁⲙⲉⲗ: ⲡⲓϩⲏⲅⲟⲩⲙⲉⲛⲟⲥ."]],
  },
  "annual-matins-verses-of-cymbals-adam": {
    arabic: [["يا رب ارحم.", "ياربُ إرحَم ."], ["السلام للشاروبيم، السلام للسيرافيم، السلام لجميع الطغمات السمائية.", "السلام للشاروبيم، السلام للسِّرافيم السلام لجميع الطغمات السمائية."], ["طوباك بالحقيقة يا أبانا القديس البار، الأنبا أبرآم الأسقف، حبيب المسيح.", "طوباك بالحقيقة يا أبانا القديس البار انبا ابرآم الاسقف حبيب المسيح."], ["بشفاعات والدة الإله القديسة مريم، يا رب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Es-salam lish-Sharoubeem, es-salam lis-Seraafeem, es-salam li-gamee' et-taghamat es-sama'iya.", "Es-salam lish-Sharoubeem es-salam lis-Sarafim es-salam li-gamee' et-taghamat es-sama'iya."], ["Toubaka bil-haqeeqa ya abana el-qiddis el-barr, el-Anba Abraam el-osqof, habeeb el-Maseeh.", "Toubaka bil-haqeeqa ya abana el-qiddis el-barr Anba Abraam el-osqof habeeb el-Maseeh."], ["Bi shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rab an'em 'alayna bi maghfirat khataiyana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "annual-midnight-arise-o-children": {
    english: [["As for Your people let them be blessed, a thousand thousand fold, and ten thousand ten thousand fold, doing Your will.", "But let Your people be in blessing, thousands of thousands and ten thousand times ten thousand, doing Your will."]],
  },
  "annual-midnight-commemoration": {
    english: [["Intercede on our behalf, O the Lady of us all the Mother of God, Mary the Mother of our Savior, that He may forgive us our sins.", "Intercede on our behalf, O Lady of us all, the Theotokos, Mary, the mother of our Savior, that He may forgive us our sins."], ["+ Intercede on our behalf, O four incorporeal beasts, the ministering flames of fire, that He may forgive us our sins.", "+ Intercede on our behalf, O four Incorporeal Creatures, the ministering flames of fire, that He may forgive us our sins."], ["Pray to the Lord on our behalf, my lords the fathers the patriarchs, Abraham Isaac and Jacob, that He may forgive us our sins.", "Pray to the Lord on our behalf, my lords and fathers the patriarchs, Abraham Isaac and Jacob, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our masters and fathers the Apostles, and the rest of the Disciples, that He may forgive us our sins.", "Pray to the Lord on our behalf, my masters and fathers the Apostles, and the rest of the Disciples, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, Basilidis and Evsebius, Macarius and Philotheos, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, Basilidis and Eusebius, Macarius and Philotheos, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Abba Pisura and Abba Epshoy, Abba Isi and his sister Thecla, that He may forgive us our sins.", "Pray to the Lord on our behalf, Abba Pisura and Abba Epshoi, Abba Isi and Thecla his sister, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Abba Kir and his brother John, and Barbara and Juliana and Demiana, that He may forgive us our sins.", "Pray to the Lord on our behalf, Abba Cyrus and John his brother, Barbara Juliana and Demiana, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, O struggle-mantled martyrs, Mari Pahnam and his sister Sarah, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, O struggle-mantled martyrs, Mari Pahnam and Sarah his sister, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, O struggle-mantled martyrs, the forty saints of Sebaste, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, O struggle-mantled martyrs, the forty saints of Sebastia, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, master Apanoub and Ptolomeos, Apa Ekragon and Sousennius, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, Master Apanoub and Ptolomeos, Apakragon and Sousennius, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our masters the fathers who loved their children, Abba Antony and Abba Paul, that He may forgive us our sins.", "Pray to the Lord on our behalf, my masters and fathers who loved their children, Abba Antony and Abba Paul, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, O three saints Macarii, and all their children the cross-bearers, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, O three saints Abba Macarii, and all their children the cross-bearers, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our masters the fathers the hegumens, Abba John and Abba Daniel, that He may forgive us our sins.", "Pray to the Lord on our behalf, my masters and fathers the hegumens, Abba John and Abba Daniel, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, our masters the fathers who loved their children, Abba Bishoy and Abba Paul, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, my masters the fathers who loved their children, Abba Pishoy and Abba Paul, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our saintly Roman fathers, Maximus and Dometius, that He may forgive us our sins.", "Pray to the Lord on our behalf, our holy Roman fathers, Maximus and Dometius, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, Abba Apollo and Abba Apip, and our father Abba Pigimi, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, Abba Apollo and Abba Apip, and our father Abba Pijimi, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Abba Evkin and Abba Ehron, Abba Hor and Abba Phis, that He may forgive us our sins.", "Pray to the Lord on our behalf, Abba Evkin and Abba Ehron, and Abba Hor and Abba Phis, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Epiphanius and Ammounios, and Arshillidis and Arsenius, that He may forgive us our sins.", "Pray to the Lord on our behalf, Epiphanius and Ammonios, and Arshillidis and Arsenius, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, our masters the ascetic fathers, Abba Abraam and George, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, my masters the ascetic fathers, Abba Abraam and George, that He may forgive us our sins."], ["Pray to the Lord on our behalf, the three hundred and eighteen gathered, at Nicea for the faith, that He may forgive us our sins.", "Pray to the Lord on our behalf, the three hundred and eighteen gathered, at Nicaea for the faith, that He may forgive us our sins."], ["Pray to the Lord on our behalf, O choirs of the cross-bearers, perfected in the wilderness, that He may forgive us our sins.", "Pray to the Lord on our behalf, O choirs of the cross-bearers, [who were] perfected in the wilderness, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, the saints of this day, everyone according to his name, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, the saints of this day, each one according to their name, that He may forgive us our sins."]],
    arabic: [["إشفعي فينا (أمام الرب)، يا سيدتنا كلنا السيدة والدة الإله، مريم أُم مخلصنا، ليغفر لنا خطايانا.", "أشفعي فينا يا سيدتَنا كلِنا، السيدة والدة الإله مريم أم مخلصنا، ليغفرَ لنا خطايانا."], ["+ إشفعا فينا (أمام الرب)، يا رئيسي الملائكة الطاهرين، ميخائيل وغبريال، ليغفر لنا خطايانا.", "+ إشفعا فينا، يا رئيسي الملائكة الطاهرين، ميخائيل وغبريال، ليغفر لنا خطايانا."], ["إشفعا فينا (أمام الرب)، يا رئيسي الملائكة الطاهرين، رافائيل وسوريال، ليغفر لنا خطايانا.", "إشفعا فينا، يا رئيسي الملائكة الطاهرين، رافائيل وسوريال، ليغفر لنا خطايانا."], ["+ إشفعوا فينا (أمام الرب)، يا رؤساء الملائكة الأطهار، سداكيال وسراتيال وأنانيال، ليغفر لنا خطايانا.", "+ إشفعوا فينا، يا رؤساء الملائكة الأطهار، سداكيال وسراتيال وأنانيال، ليغفر لنا خطايانا."], ["إشفعي فينا (أمام الرب)، أيتها الكراسي والأرباب والقوات، والشيروبيم والسرافيم، ليغفر لنا خطايانا.", "إشفعي فينا، أيتها الكراسي والأرباب والقوات، والشيروبيم والسرافيم، ليغفر لنا خطايانا."], ["+ إشفعوا فينا (أمام الرب)، أيها الأربعة الحيوانات غير المتجسدين، الخدام الملتهبين ناراً، ليغفر لنا خطايانا.", "+ إشفعوا فينا، أيها الأربعة الحيوانات غير المتجسدين، الخدام الملتهبين ناراً، ليغفر لنا خطايانا."], ["إشفعوا فينا (أمام الرب)، يا كهنة الحق، الأربعة والعشرين قسيساً، ليغفر لنا خطايانا.", "إشفعوا فينا، يا كهنة الحق، الأربعة والعشرين قسيساً، ليغفر لنا خطايانا."], ["+ إشفعوا فينا (أمام الرب)، أيها العساكر الملائكية، والطغمات السمائية، ليغفر لنا خطايانا.", "+ إشفعوا فينا، أيها العساكر الملائكية، والطغمات السمائية، ليغفر لنا خطايانا."], ["إشفع فينا (أمام الرب)، أيها السابق الصابغ، يوحنا المعمدان، ليغفر لنا خطايانا.", "اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر خطايانا."], ["+ إشفعوا فينا (أمام الرب)، أيها المئة والأربعة والأربعين ألفاً، والبتول الإنجيلي، ليغفر لنا خطايانا.", "+ إشفعوا فينا، أيها المئة والأربعة والأربعين ألفاً، والبتول الإنجيلي، ليغفر لنا خطايانا."]],
    englishArabic: [["Ishfa'i feena (amam er-Rabb), ya sayyidatana kullina es-sayyida walidat el-ilah, Maryam umm mukhallisina, li-yaghfir lana khatayana.", "Ishfa'i feena ya sayyidatana kullina, es-sayyida walidat el-Ilah Maryam umm mukhallisina, li-yaghfir lana khatayana."], ["+ Ishfa'a feena (amam er-Rabb), ya ra'eesay el-mala'ika et-tahireen, Mikha'eel wa Ghobrial, li-yaghfir lana khatayana.", "+ Ishfa'a feena ra'eesay el-mala'ika et-tahireen Mikha'eel wa Ghobrial li-yaghfir lana khatayana."], ["Ishfa'a feena (amam er-Rabb), ya ra'eesay el-mala'ika et-tahireen, Rafa'eel wa Souryal, li-yaghfir lana khatayana.", "Ishfa'a feena ra'eesay el-mala'ika et-tahireen Rafa'eel wa Souryal li-yaghfir lana khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ya ru'asa' el-mala'ika el-at-har, Sadakyal wa Saratyal wa Ananyal, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ya ru'asa' el-mala'ika el-at-har, Sadakiyal wa Saratiyal wa Ananiyal, li-yaghfir lana khatayana."], ["Ishfa'i feena (amam er-Rabb), ayyatuha el-karasi wal-arbab wal-quwwat, wash-Sheroubim was-Seraphim, li-yaghfir lana khatayana.", "Ishfa'i feena, ayyatuha el-karasi wal-arbab wal-quwwat, wesh-Sharoubeem wes-Sarafeem, li-yaghfir lana khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ayyuha el-arba'at el-hayawanat ghayr el-mutagassideen, el-khuddam el-multahibeen naran, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ayyuha el-arba'at el-hayawanat ghayr el-mutagassideen, el-khuddam el-multahibeen naran, li-yaghfir lana khatayana."], ["Ishfa'u feena (amam er-Rabb), ya kahanat el-haqq, el-arba'a wal-'ishreen qasseesan, li-yaghfir lana khatayana.", "Ishfa'ou feena, ya kahanat el-haqq, el-arba'a wal-'ishreen qasseesan, li-yaghfir lana khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ayyuha el-'asakir el-mala'ikiya, wat-taghmat es-sama'iya, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ayyuha el-'asakir el-mala'ikiyya, wat-tughmat es-sama'iyya, li-yaghfir lana khatayana."], ["Ishfa' feena (amam er-Rabb), ayyuha es-sabiq es-sabigh, Youhanna el-Ma'madan, li-yaghfir lana khatayana.", "Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-Ma'madan, li-yaghfir khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ayyuha el-mi'a wal-arba'a wal-arba'een alfan, wal-batoul el-ingeeli, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ayyuha el-mi'a wal-arba'a wal-arba'een alfan, wal-batoul el-ingeeli, li-yaghfir lana khatayana."]],
  },
  "annual-midnight-concluding-hymn": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen.", "Lord have mercy. Lord have mercy. Lord bless. Amen."], ["We proclaim and say, O our Lord Jesus Christ, who was born in Bethlehem, according to the prophetic sayings. Save us and have mercy on us.", "We proclaim and say: “O our Lord Jesus Christ, who was born in Bethlehem, according to the prophetic voices.\" Save us and have mercy on us."], ["We proclaim and say, O our Lord Jesus Christ, the Son of God, who entered Jerusalem. Save us and have mercy on us.", "We proclaim and say: “O our Lord Jesus Christ, the Son of God, who entered into Jerusalem.\" Save us and have mercy on us."]],
    arabic: [["نصرخ قائلين: يا ربنا يسوع المسيح بارك مياه النهر، ولتكن رحمتُكَ وسلامُكَ حصناً لشعبِك، خلصنا وارحَمنا.", "نصرخ قائلين : يا ربنا يسوع المسيح بارك مياه النهر، لتكن رحمتُكَ وسلامُكَ حصناً لشعبِك خلصنا وارحَمنا."]],
    englishArabic: [["Nasrukh qaa-ileen: ya rabbana Yasoo el-Maseeh, barik miyaah en-nahr, wal-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna.", "Nasrukh qa'ileen: ya Rabbana Yasou' el-Maseeh, barik miyah en-nahr, li-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna."]],
  },
  "annual-midnight-doxology-apostles": {
    english: [["+ Also Philip and Matthew, Bartholomew and Thomas, James the Son of Alphaeus, and Simon the Canaanite.", "+ Philip and Matthew, Bartholomew and Thomas, James the Son of Alphaeus, and Simon the Canaanite."], ["+ Matthias, who was chosen, in place of Judas, all of them and the rest, followed the Master.", "+ Matthias was chosen, instead of Judas, and was counted with the rest, who followed the Master."], ["Their voice went forth, upon the face of the whole earth, and their words have reached, the ends of the world.", "Their voices went forth, onto the face of the whole earth, and their words have reached, the ends of the world."], ["+ Pray to the Lord on our behalf, my lords and fathers the apostles, and the seventy-two disciples, that He may forgive us our sins.", "+ Pray to the Lord on our behalf / our fathers the apostles / and the seventy two disciples / that He may forgive us our sins."]],
    arabic: [["+ أطلبوا من الرب عنا، يا سادتي الآباء الرسل، والاثنان والسبعون تلميذاً، ليغفر لنا خطايانا.", "+ اطلبوا من الرب عنا، يا سادتى الآباء الرسل، والاثنين والسبعون تلميذاً، ليغفر لنا خطايانا لانك مبارك."]],
    englishArabic: [["+ Utlubou min er-Rabb 'anna, ya sadati el-aba' er-rusul, wal-ithnan was-sab'oun tilmeedhan, li-yaghfir lana khatayana.", "+ Utlubou min er-Rabb 'anna, ya sadati el-aba' er-rusul, wal-ithnayn was-sab'oun tilmeedhan, li-yaghfir lana khatayana li-annaka mubarak."]],
  },
  "annual-midnight-doxology-archangel-michael": {
    english: [["+ Intercede on our behalf: O holy archangel: Michael the head of heavenly: that He may forgive us our sins.", "+ Intercede on our behalf: O holy archangel: Michael the head of the heavenly: that He may forgive us our sins."]],
    arabic: [["+ اشفع فينا أمام الرب يا رئيس الملائكة الطاهر ميخائيل رئيس السمائيين ليغفر لنا خطايانا.", "+ اشفع فينا يارئيس الملائكة الطاهر ميخائيل رئيس السمائيين ليغفر لنا خطايانا."]],
    englishArabic: [["+ Ishfa' feena amam er-Rabb ya ra'ees el-mala'ika et-tahir Mikha'eel ra'ees es-sama'iyyeen li-yaghfir lana khatayana.", "+ Ishfa' feena ya ra'ees el-mala'ika et-tahir Mikha'eel ra'ees es-sama'iyyeen li-yaghfir lana khatayana."]],
  },
  "annual-midnight-doxology-conclusion": {
    coptic: [["+ Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ", "+ Ⲧⲉⲛϯϩⲟ ⲁⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ"]],
    english: [["+ We ask you to remember us, O our faithful advocate: before our Lord Jesus Christ: that He may forgive us our sins", "+ We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["+ نسألك أن تذكرينا، أيتها الشفيعة المؤتمنة: أمام ربنا يسوع المسيح: ليغفر لنا خطايانا", "+ نَسْألُكِ اذْكرينا أيَّتُها الشَّفيعَةُ المؤْتَمَنةُ أَمامَ ربِّنا يَسوعِ المسيحِ ليغْفِرَ لَنا خَطايانا."]],
    englishArabic: [["+ Nas'aluki an tadhkureena, ayyatuha esh-shafi'a el-mu'tamana: amama Rabbina Yasu' el-Maseeh: li-yaghfira lana khatayana", "+ Nas'aluki udhkurina ayyatuha esh-shafi'a el-mu'tamana amama Rabbina Yasu' el-Maseeh li-yaghfira lana khatayana."]],
  },
  "annual-midnight-doxology-heavenly-beings": {
    english: [["+ Intercede on our behalf, O angelic armies, and heavenly orders, that He may forgive us our sins.", "+ Intercede on our behalf, O angelic hosts, and all the heavenly multitudes, that He may forgive us our sins."]],
  },
  "annual-midnight-doxology-patriarch-bishop": {
    english: [["Likewise we magnify You, with David the Psalmist, You are the priest forever, according to the order of Melchizedek.", "Likewise we exalt you, with David the Psalmist, \"You are a priest forever, according to the order of Melchizedek.\""], ["+ Pray to the Lord on our behalf, our holy father the patriarch, Pope Abba (...), that He may forgive us our sins.", "+ Pray to the Lord on our behalf, our holy father the patriarch, Pope Abba (...) the archpriest, that He may forgive us our sins."], ["(In the presence of a bishop) Pray to the Lord on our behalf, our holy righteous father, Abba (...) the bishop (metropolitan), that He may forgive us our sins.", "(In the presence of a bishop) Pray to the Lord on our behalf, O our holy and righteous father, Abba (...) the Bishop (Metropolitan), that He may forgive us our sins."]],
  },
  "annual-midnight-doxology-philopater-mercurius": {
    coptic: [["+ Ⲧⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ Ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ", "+ Ⲧⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ Ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ"]],
    english: [["Hail to you O martyr: hail to the noble hero: hail to the struggle-bearer: Philopater Mercurius", "Hail to you O martyr: hail to the courageous hero: hail to the struggle bearer: Philopater Mercurius."]],
  },
  "annual-midnight-doxology-pope-kyrillos": {
    coptic: [["+ Ⲧⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ Ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ", "+ Ⲧⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ Ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ"]],
    english: [["+ Pray to the Lord on our behalf: our holy father the patriarch: Abba Kyrillos the sixth: that He may forgive us our sins", "+ Pray to the Lord on our behalf: our holy father the patriarch: Papa Abba Kyrillos the Sixth: that He may forgive us our sins."]],
  },
  "annual-midnight-doxology-st-mark-2": {
    arabic: [["+ أُطلب من الرب عنا، يا ناظر الإله الإنجيلي، مرقس الرسول، ليغفر لنا خطايانا.", "+ اطلب من الرب عنا ياناظر الإله الإنجيلي مرقس الرسول ليغفر لنا خطايانا."]],
  },
  "annual-midnight-first-canticle-lobsh": {
    arabic: [["+ بشفاعات، والدة الإله القديسة مريم، يا رب إنعم لنا، بمغفرة خطايانا.", "+ بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["+ Bi-shafa'at, walidat el-ilah el-qiddisa Maryam, ya Rabb in'im lana, bi-maghfirat khatayana.", "+ Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "annual-midnight-fourth-canticle": {
    arabic: [["+ يفتخر القديسون بمجد هلليلويا. ويتهللون على مضاجعهم.", "+ يفتخر القديسون بمجد الليلويا ويتهللون على مضاجعهم"]],
    englishArabic: [["+ Yaftakhir el-qiddisoon bi-magd halleluia. Wa yatahallaloon 'ala madagi'ihim.", "+ Yaftakhir el-qiddisoun bi-magd Hallelouia, wa yatahallaloun 'ala madagi'ihim"]],
  },
  "annual-midnight-friday-theotokia-part-2": {
    arabic: [["ليس من يُشبهك يا مريم العذراء الملائكة تكرمك والسارافيم تُمجدك.", "ليس من يُشبهِك، يا مريم العذراء، الملائكة تكرمِك، والسِّرافيم تُمجدِك."], ["+ لأن الذي على الشاروبيم أتى وتجسد منك حتى وحّدنا به من قبل صلاحه.", "+ لأن الذي على الشاروبيم، أتى وتجسد منكِ، حتى إتحدنا به، من قِبَل صلاحه."]],
    englishArabic: [["Laysa man yushbihuki ya Maryam el-'Adhra' el-mala'ika tukrimuki wes-Sarafim tumaggiduki.", "Laysa man yushbihuki, ya Maryam el-'Adhra', el-mala'ika tukrimuki, wes-Sarafeem tumaggiduki."], ["+ Li-anna alladhi 'ala esh-Sharoubim ata wa tagassad minki hatta wahhadana bihi min qibal salahihi.", "+ Li-anna alladhi 'ala esh-Sharoubeem, ata wa tagassad minki, hatta ittahadna bih, min qibal salahih."]],
  },
  "annual-midnight-friday-theotokia-part-4": {
    english: [["You are the rational city, where the Most High One lived, who sits upon the throne, of the cherubim.", "You are the rational city, in where the Most High One lived, Who sits upon the throne, of the cherubim."]],
    arabic: [["+ والسارافيم يمجدونه حملته على ذراعيك المعطي طعاماً لكل ذي جسد من قبل رأفته.", "+ والسِّرافيم يمجدونه، حَملتِه على ذراعيكِ، المعطي طعاماً لكل ذي جسد، من قِبَل رأفته."]],
    englishArabic: [["+ Wes-Sarafim yumaggidounahu hamaltihi 'ala dhira'ayki el-mu'ti ta'aman li-kull dhi gasad min qibal ra'fatihi.", "+ Wes-Sarafeem yumaggidounah, hamaltihi 'ala dhira'ayki, el-mu'ti ta'aman li-kull dhi gasad, min qibal ra'fatih."]],
  },
  "annual-midnight-friday-theotokia-part-7": {
    coptic: [["+ Ϯⲥⲱⲟⲩⲛ ⲅⲁⲣ ⲛ̀ϩ̀ⲗⲓ ⲁⲛ: ⲉ̀ⲃⲏⲗ ⲉ̀ϯⲥ̀ⲙⲏ ⲛ̀ⲧⲉ ⲡⲓⲁⲅⲅⲉⲗⲟⲥ: ⲉϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛⲏⲓ ⲛ̀ⲟⲩⲣⲁϣⲓ: ⲉϥⲛⲏⲟⲩ ⲛⲏⲓ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲧ̀ⲫⲉ.", "+ Ϯⲥⲱⲟⲩⲛ ⲅⲁⲣ ⲛ̀ϩ̀ⲗⲓ ⲁⲛ: ⲉ̀ⲃⲏⲗ ⲉ̀ⲧ̀ⲥ̀ⲙⲏ ⲛ̀ⲧⲉ ⲡⲓⲁⲅⲅⲉⲗⲟⲥ: ⲉϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛⲏⲓ ⲛ̀ⲟⲩⲣⲁϣⲓ: ⲉϥⲛⲏⲟⲩ ⲛⲏⲓ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲧ̀ⲫⲉ."]],
  },
  "annual-midnight-friday-watos-lobsh": {
    coptic: [["+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛⲉⲣⲭⲟⲣⲉⲩⲓⲛ: ⲛⲉⲙ Ⲉⲗⲓⲥⲁⲃⲉⲧ ⲧⲉⲥⲥⲩⲅⲅⲉⲛⲏⲥ: ϫⲉ ⲧⲉⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲑⲟ ϧⲉⲛ ⲛⲓϩⲓⲟ̀ⲙⲓ: ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲡ̀ⲟⲩⲧⲁϩ ⲛ̀ⲧⲉ ⲧⲉⲛⲉϫⲓ.", "+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛⲉⲣⲭⲟⲣⲉⲩⲓⲛ: ⲛⲉⲙ Ⲉⲗⲓⲥⲁⲃⲉⲧ ⲧⲉⲥⲥⲩⲅⲅⲉⲛⲏⲥ: ϫⲉ ⲉⲧⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲑⲟ ϧⲉⲛ ⲛⲓϩⲓⲟ̀ⲙⲓ: ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲧⲉ ⲡ̀ⲟⲩⲧⲁϩ ⲛ̀ⲧⲉ ⲧⲉⲛⲉϫⲓ."]],
    arabic: [["أنت مضيئة أكثر من الشمس أنت هي ناحية المشرق التي ينتظرها الأبرار بفرح وتهليل.", "أنتِ مضيئة أكثر من الشمس، أنتِ هي ناحية المشرق، التي ينظرها الأبرار، بفرح وتهليل."], ["+ نسألك اذكرينا أيتها الشفيعة المؤتمنة أمام ربنا يسوع المسيح ليغفر لنا خطايانا.", "+ نسألكِ أن تذكرينا، أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا."]],
    englishArabic: [["Anti mudi'a akthar min esh-shams anti hiya nahiyat el-mashriq allati yantaziruha el-abrar bi-farah wa tahleel.", "Anti mudee'a akthar min esh-shams, anti hiya nahiyat el-mashriq, allati yanzuruha el-abrar, bi-farah wa tahleel."], ["+ Nas'aluki udhkurina ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana.", "+ Nas'aluki an tadhkureena ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana."]],
  },
  "annual-midnight-friday-watos-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto the ages of the ages, Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والابن. والروح القدس. الآن وكل أوان. والى دهر الداهرين آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rooh el-Qudus, el-an wa kulla awan, wa ila dahr ed-dahireen ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "annual-midnight-friday-watos-theotokia-conclusion": {
    arabic: [["مُبارَك الآب والإبن، والرُّوح القُدُس، الثالوث الكامل، نسجد له ونُمجِّدهُ.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarak el-Ab wal-Ibn, war-Rooh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "annual-midnight-monday-adam-lobsh": {
    english: [["Through Mary, the Mother of God, Adam was restored again, to his authority.", "Through Mary, the Theotokos, Adam was restored again, to his authority."]],
  },
  "annual-midnight-monday-adam-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
  },
  "annual-midnight-monday-adam-theotokias-conclusion": {
    english: [["Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.", "Your mercies O my God: are countless: and exceedingly plenteous: are Your compassions."], ["And me too, the sinner, teach me O my Master, to offer repentance.", "And I too: the sinner: teach me O my Lord: to offer repentance."], ["For You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.", "For You do not desire: the death of a sinner: but rather that he return: and that his soul may live."], ["For You are good, and merciful, let Your compassion, speedily come to us.", "For You are good: and merciful: let Your compassions: speedily come to us."], ["O King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.", "O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins."], ["Disperse the enemies, of the Church, and fortify her that she, may not be shaken forever.", "Disperse the enemies, of the Church, and fortify her, that she may never be shaken. forever."]],
  },
  "annual-midnight-monday-psali": {
    coptic: [["Ⲝ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲁ̀ⲗⲏⲑⲱⲥ: ⲱ̀ Ⲡⲁϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ.", "Ⲝ̀ⲙⲁⲣⲱⲟⲩⲧ ⲁ̀ⲗⲏⲑⲱⲥ: ⲱ̀ Ⲡⲁϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ."]],
    english: [["+ God is Immanuel, the True Food, the Immortal, Tree of Life.", "+ God is Emmanuel, the True Food, the Immortal, Tree of Life."], ["+ The True Lamb, of God the Father, have mercy upon us, in Your kingdom.", "+ O You the true Lamb of God the Father, have mercy upon us, in Your Kingdom."], ["For the mouth of Your Father, has given witness unto You, saying \"You are my Son, and today I have begotten You.\"", "For the mouth of Your Father, has given witness unto You, saying “You are My Son, and today I begotten to You.”"], ["You are surrounded, by the cherubim, and the seraphim, and they cannot see You.", "You are surrounded, by the cherubim, and the seraphim, and they can not see You."]],
    arabic: [["كل من يقول ياربي يسوع كمن بيده سيف يصرع العدو.", "كل مَنْ يقول، \"يا ربي يسوع،\" كمَنْ بيده سيف، يصرع العدو."], ["كثيرة جداً هي رأفاتك أيها الحاكم العادل ياربي يسوع.", "كثيرة جداً، هي رأفاتك، أيها الحاكم العادل، يا ربي يسوع."], ["في القليل القليل نذكرك ونمجد اسمك ياربي يسوع.", "في القليل القليل، نذكرك، ونُمجد أسمك، يا ربي يسوع."], ["+ فليكن إسم الرب فينا ليضيء علينا في إنساننا الداخلي.", "+ فليكن إسم الرب، فينا، ليضئ علينا، في إنساننا الداخلي."], ["مبارك أنت بالحقيقة ياربي يسوع مع أبيك الصالح والروح القدس.", "مُبارَك أنت بالحقيقة، يا ربي يسوع، مع أبيك الصالح، والرُّوح القُدُس."], ["+ عنبر كثير الثمن هو إسمك القدوس ياربي يسوع.", "+ عنبر، كثير الثمن، هو إسمك القدوس، يا ربي يسوع."], ["يقوم حولك الشاروبيم والسارافيم ولا يستطيعون أن ينظروك.", "يقوم حولك، الشاروبيم، والسِّرافيم، ولا يستطيعون أن ينظروك."], ["أترك لنا نحن أيضاً الآن هذا الحجر ليضيء علينا في أنساننا الداخلي.", "أُترك لنا نحن أيضاً، الآن هذا الحجر، ليضئ علينا، في إنساننا الداخلي."], ["+ زينة نفوسنا وفرح قلوبنا هو اسمك القدوس ياربي يسوع.", "+ زينة نفوسنا، وفرح قلوبنا، هو إسمك القدوس، يا ربي يسوع."], ["+ أيها المتحنن الرؤوف الكثير الرحمة ياربي يسوع.", "+ أيها المتحنن، الرؤوف، الكثير الرحمة، يا ربي يسوع."], ["أنظر إلينا ياربي يسوع بعين التحنن التي لصلاحك.", "أنظر إلينا، يا ربي يسوع، بعين التحنن، التي لصلاحك."], ["وأغرس فينا قلباً مستقيماً لكي نباركك ياربي يسوع.", "وأغرس فينا، قلباً مستقيماً، لكي نباركك، يا ربي يسوع."], ["+ أبتهل إليك ياربي يسوع أن ترحمنا في ملكوتك.", "+ أبتهل إليك، يا ربي يسوع، أن ترحمنا، في ملكوتك."]],
    englishArabic: [["+ Fal-yakun ism er-Rabb fina li-yudi' 'alayna fi insanina ed-dakhili.", "+ Fal-yakun ism er-Rabb, feena, li-yudi' 'alayna, fi insanina ed-dakhili."], ["Yaqoum hawlak esh-Sharoubim wes-Sarafim wa la yastati'oun an yanzurouk.", "Yaqoum hawlak, esh-Sharoubeem, wes-Sarafeem, wa la yastatee'oun an yanzurouk."], ["Utruk lana nahnu aydan el-an hadha el-hagar li-yudi' 'alayna fi insanina ed-dakhili.", "Utruk lana nahnu aydan, el-an hadha el-hagar, li-yudi' 'alayna, fi insanina ed-dakhili."]],
  },
  "annual-midnight-monday-theotokia-part-1": {
    english: [["While Adam was sad, God was pleased, to bring him back, to his authority.", "While Adam was sad, the Lord was pleased, to restore him again, to his authority."]],
  },
  "annual-midnight-monday-theotokia-part-3": {
    english: [["Jesus Christ the Word, who came and took flesh, He dwelt in us, and we saw His glory.", "Jesus Christ the Word, who came and took flesh, He dwelt among us, and we saw His glory."]],
  },
  "annual-midnight-monday-theotokia-part-4": {
    english: [["Therefore Isaiah, the great prophet, cried out proclaiming, and saying.", "Therefore Isaiah, the great prophet, shouted out proclaiming, and saying."], ["The powerful God, of authority, and the Angel of, the great counsel.”", "He is God the powerful, and the Counselor, the angel of, the great wisdom."]],
    arabic: [["الإله القوي، المتسلط، وملاكُ المشورة، العُظمى.\"", "لإله القوي، المتسلط، وملاكُ المشورة، العُظمى."]],
    englishArabic: [["El-ilah el-qawi, el-mutasallit, wa malak el-mashoura, el-'uzma.", "Li-Ilah el-qawi, el-mutasallit, wa malak el-mashoura, el-'uzma."]],
  },
  "annual-midnight-monday-theotokia-part-6": {
    english: [["+ But He is of one nature, one hypostasis, and one person, for God the Word.", "+ But He is one nature, one hypostasis, and one person, for God the Word."]],
    arabic: [["+ بل بطبيعة واحدة، وأُقنوم واحد، وشخص واحد، لله الكلمة.", "+ بل طبيعة واحدة، وأُقنوم واحد، وشخص واحد، لله الكلمة."]],
    englishArabic: [["+ Bal bi-tabee'a wahida, wa uqnoum wahid, wa shakhs wahid, lillah el-kalima.", "+ Bal tabee'a wahida, wa uqnoum wahid, wa shakhs wahid, lillah el-Kalima."]],
  },
  "annual-midnight-monday-theotokia-part-7": {
    english: [["In order to bring Adam, the first man, who was made of dust, back to Paradise.", "In order to bring Adam, the first man, made of dust, back to Paradise."]],
  },
  "annual-midnight-monday-theotokia-part-8": {
    english: [["+ Proclaiming and saying, “Glory to God in the highest, peace on earth, and goodwill toward men.”", "+ Proclaiming and saying, “Glory to God in the highest, on earth peace, and goodwill toward men.”"]],
  },
  "annual-midnight-monday-theotokia-part-9": {
    english: [["+ So David the psalmist, and the holy one, rose up and took his, spiritual harp.", "+ So David the psalmist, and the saint, rose up and took, his spiritual stringed instrument."], ["He went to the church, the house of the angels, he praised and chanted to, the Holy Trinity.", "He went to the temple, the house of the angels, he praised and sang to, the Holy Trinity."], ["+ Saying “In Your light, O Lord we will see light, let Your mercy come, to those who know You.”", "+ Saying “In Your light, O Lord shall we see light, let Your mercy come, to those who know You.”"], ["O true Light, that shines upon, every man, that comes into the world.", "O True Light, that gives light, to every man, that comes into the world."], ["+ You have come into the world, through Your love for man, and all the creation, rejoiced at Your coming.", "+ You came into the world, through Your love for mankind, and all the creation rejoiced, at Your coming."], ["You have saved Adam, from the seduction, and delivered Eve, from the pangs of death.", "You have saved Adam, from deception, and delivered Eve, from the pangs of death."]],
    arabic: [["الله هو نور، وساكن في النور، تسبحه، ملائكة النور.", "الله هو نور، وساكن في النور، وتسبحه، ملائكة النور."]],
    englishArabic: [["Allah huwa nour, wa sakin fin-nour, tusabbihuhu, mala'ikat en-nour.", "Allah huwa nour, wa sakin fin-nour, wa tusabbihuhu, mala'ikat en-nour."]],
  },
  "annual-midnight-psali-watos-three-holy-youth": {
    english: [["+ Pray to the Lord on our behalf, O three saintly children, Shadrach Meshach and Abed-Nego, that He may forgive us our sins.", "+ Pray to the Lord on our behalf: the three holy youth: Shadrach, Meshach, Abednego: that He may forgive us our sins."]],
    arabic: [["+ أُطلبوا من الرب عنا، أيها الثلاثة فتية القديسين، سدراك وميساك وأبدناغو، ليغفر لنا خطايانا.", "+ اطلبوا من الربّ عنا / أيها الثلاثة فتية القديسين / سدراك وميساك وعبدناغو / ليغفر لنا خطايانا."]],
    englishArabic: [["+ Utlubu min er-Rabb 'anna, ayyuha eth-thalatha fitya el-qiddiseen, Sadrak wa Meesak wa Abednagho, li-yaghfir lana khatayana.", "+ Utlubu min er-Rabb 'anna, ayyuha eth-thalathat fitya el-qiddiseen, Sadrak wa Meesak wa 'Abednagho, li-yaghfir lana khatayana."]],
  },
  "annual-midnight-psalmody-conclusion": {
    arabic: [["يا ربُّ إرحَم.", "ياربُ إرحَم ."]],
  },
  "annual-midnight-saturday-theotokia-part-6": {
    english: [["Wherein are the tablets, of the covenant, and the golden vessel, where the manna hidden in it.", "Wherein are the tablets / of the covenant / and the golden vessel / where the manna was hidden. in it."]],
  },
  "annual-midnight-saturday-watos-lobsh-2": {
    english: [["We exult you worthily, with Elizabeth your cousin: saying, “Blessed are you among women, and blessed is the fruit of your womb.”", "We exalt you worthily, with Elizabeth your cousin, saying Blessed are you among women, and blessed is the fruit of your womb."]],
    arabic: [["نُعظِّمُكِ بإستحقاقٍ، مع أليصابات نَسيبَتكِ قائلين، \"مُباركةٌ أنتِ في النساء، ومُباركةٌ هي ثمرة بطنكِ.\"", "نُعظِّمُكِ باستحقاق مع أليصابات نسيبتك، مباركة أنت في النساء ومباركة هي ثمرة بطنك."]],
    englishArabic: [["Nu'azzimuki bi-istihqaq, ma'a Aleesabat naseebatiki qa'ileen, \"Mubaraka anti fin-nisa', wa mubaraka hiya thamarat batniki.\"", "Nu'azzimuki bi-istihqaq ma'a Aleesabat naseebatiki Mubaraka anti fin-nisa' wa mubaraka hiya thamarat batniki."]],
  },
  "annual-midnight-saturday-watos-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto the ages of the ages, Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والابن. والروح القدس. الآن وكل أوان. والى دهر الداهرين آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rooh el-Qudus, el-an wa kulla awan, wa ila dahr ed-dahireen ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "annual-midnight-saturday-watos-theotokia-conclusion": {
    arabic: [["مُبارَك الآب والإبن، والرُّوح القُدُس، الثالوث الكامل، نسجد له ونُمجِّدهُ.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarak el-Ab wal-Ibn, war-Rooh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "annual-midnight-second-canticle-lobsh": {
    arabic: [["بشفاعات، والدة الإله، القديسة مريم، يا رب إنعم لنا، بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at, walidat el-ilah, el-qiddisa Maryam, ya Rabb in'im lana, bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "annual-midnight-sunday-adam-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
  },
  "annual-midnight-sunday-adam-theotokias-conclusion": {
    english: [["Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.", "Your mercies O my God: are countless: and exceedingly plenteous: are Your compassions."], ["And me too, the sinner, teach me O my Master, to offer repentance.", "And I too: the sinner: teach me O my Lord: to offer repentance."], ["For You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.", "For You do not desire: the death of a sinner: but rather that he return: and that his soul may live."], ["For You are good, and merciful, let Your compassion, speedily come to us.", "For You are good: and merciful: let Your compassions: speedily come to us."], ["O King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.", "O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins."], ["Disperse the enemies, of the Church, and fortify her that she, may not be shaken forever.", "Disperse the enemies, of the Church, and fortify her, that she may never be shaken. forever."]],
  },
  "annual-midnight-sunday-psali": {
    coptic: [["+ Ⲑⲁⲓ ⲧⲉ Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ: ϯⲡⲟⲗⲓⲥ ⲙ̀Ⲡⲉⲛⲛⲟⲩϯ: ⲡ̀ϩⲁⲣⲙⲁ ⲛ̀ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ: ⲉⲧⲟⲓ ⲛ̀ⲟⲩⲑⲟ ⲛ̀ⲣⲏϯ.", "+ Ⲑⲁⲓ ⲧⲉ Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ: ⲧ̀ⲡⲟⲗⲓⲥ ⲙ̀Ⲡⲉⲛⲛⲟⲩϯ: ⲡ̀ϩⲁⲣⲙⲁ ⲛ̀ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ: ⲉⲧⲟⲓ ⲛ̀ⲟⲩⲑⲟ ⲛ̀ⲣⲏϯ."], ["Ⲕⲩⲣⲓⲟⲥ ⲡⲓⲣⲉϥⲛⲟϩⲉⲙ: ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ϩⲁⲣⲟⲥ: ⲁⲥⲟ̀ϩⲓ ⲉⲥϣⲟⲧⲉⲙ: ⲙ̀ⲡⲉⲥⲣⲏϯ ⲕⲁⲗⲱⲥ.", "Ⲕⲩⲣⲓⲟⲥ ⲡⲓⲣⲉϥⲛⲟϩⲉⲙ: ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ϣⲁⲣⲟⲥ: ⲁⲥⲟ̀ϩⲓ ⲉⲥϣⲟⲧⲉⲙ: ⲙ̀ⲡⲉⲥⲣⲏϯ ⲕⲁⲗⲱⲥ."], ["+ Ⲙⲁⲣⲓⲁ ϯⲥⲉⲙⲛⲏ: ⲡ̀ⲟⲩⲛⲟϥ ⲛ̀ⲛⲓⲇⲓⲕⲉⲟⲥ: ⲟⲩⲟϩ ⲛ̀ⲁ̀ⲗⲏⲑⲓⲛⲏ: ⲫ̀ⲣⲁϣⲓ ⲛ̀ⲛⲓⲡⲓⲥⲧⲟⲥ.", "+ Ⲙⲁⲣⲓⲁ ϯⲥⲉⲙⲛⲉ: ⲡ̀ⲟⲩⲛⲟϥ ⲛ̀ⲛⲓⲇⲓⲕⲉⲟⲥ: ⲟⲩⲟϩ ⲛ̀ⲁ̀ⲗⲏⲑⲓⲛⲏ: ⲫ̀ⲣⲁϣⲓ ⲛ̀ⲛⲓⲡⲓⲥⲧⲟⲥ."]],
    english: [["Help me, O my Lord, Jesus the Compassionate, to glorify my Lady, Your Mother the bride.", "Help me, my Lord, / Jesus the Compassionate, / to glorify my Lady, / Your Mother the bride."], ["+ Isaiah said to us, with a joyful voice, that \"She will give birth to, Immanuel for us.\"", "+ Isaiah said to us, / with a joyful voice, / that \"She will give birth to / Emmanuel for us.\""], ["+ This is Jerusalem, the city of our God, the chariot of the cherubim, of many types.", "+ This is Jerusalem, / the city of our God, / the chariot of many kinds / of the Cherubim. of many types."], ["Ezekiel has witnessed, and revealed this to us, saying, \"I saw a door, toward the East.", "Ezekiel has witnessed / and revealed this to us, / saying, \"I saw a door / to the East.\""]],
    arabic: [["أنتِ هي القبة، والتابوت، التي صنعها موسى، بعظم كرامة.", "أنتِ هي القبة، التي صنعها موسى، بعِظَم كرامة، والتابوت."], ["مُتعال عن الأفكار، السماوية، هذا الأمر العجيب، الذي للغطاء.", "مُتعال عن الأفكار، السمائية، هذا الأمر العجيب، الذي للغطاء."], ["+ مُرتفعة أنت جداً، أكثر من الشاروبيم، ومكرمة أكثر، من السَرافيم.", "+ مُرتفعة أنت جداً، أكثر من الشاروبيم، ومكرمة أكثر، من السيرافيم."], ["الساكن في النور، الذي لا يُدنى منه، أظهر آياته، أنتِ أرضعتيه اللبن.", "الساكن في النور، الذي لا يُدنى منه، أظهر آياته، وأرضعتِه اللبن."]],
    englishArabic: [["Anti hiya el-qubba, wat-tabout, allati sana'aha Mousa, bi-'izam karama.", "Anti hiya el-qubba, allati sana'aha Mousa, bi-'izam karama, wat-tabout."], ["Muta'al 'an el-afkar, es-samawiya, hadha el-amr el-'agib, alladhi lil-ghita'.", "Muta'al 'an el-afkar es-sama'iyya hadha el-amr el-'agib alladhi lil-ghita'."], ["+ Murtafi'a anti giddan, akthar min esh-Sharoubim, wa mukarrama akthar, min es-Sarafim.", "+ Murtafi'a anti giddan, akthar min esh-Sharoubeem, wa mukarrama akthar, min es-Sarafeem."], ["Es-sakin fin-nour, alladhi la yudna minhu, azhar ayatihi, anti arda'tihi el-laban.", "Es-sakin fin-nour, alladhi la yudna minhu, azhar ayatihi, wa arda'tihi el-laban."]],
  },
  "annual-midnight-sunday-psali-adam-lord-jesus": {
    english: [["Our Savior, who know her, delighted to, dwell in her.\nMany are, your praises, more than the sand of the sea, O Mary our lady.", "Our Savior, who knows her, delighted to, dwell in her. Many are, your praises, more than the sand of the sea, O Mary our lady."]],
  },
  "annual-midnight-sunday-psali-lord-jesus": {
    coptic: [["Ⲉⲕⲉⲉⲣϧⲏⲓⲃⲓ ⲉ̀ϫⲱⲓ: ϧⲁ ⲑ̀ϧⲏⲓⲃⲓ ⲛ̀ⲧⲉ ⲛⲉⲕⲧⲉⲛϩ: Ⲡⲁⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅: ⲁ̀ⲣⲓⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲓ.", "Ⲉⲕⲉⲣϧⲏⲓⲃⲓ ⲉ̀ϫⲱⲓ: ϧⲁ ⲧ̀ϧⲏⲓⲃⲓ ⲛ̀ⲧⲉ ⲛⲉⲕⲧⲉⲛϩ: Ⲡⲁⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅: ⲁ̀ⲣⲓⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲓ."]],
    english: [["You who carry the sins of the world: Have mercy upon me: My Lord Jesus Christ: help me.", "You who carries the sins of the world: Have mercy upon me: my Lord Jesus Christ: help me."], ["+ Forgive me the multitude: of my iniquities: My Lord Jesus: help me.", "+ Forgive me the multitude: of my iniquity: my Lord Jesus: help me."], ["Oh, how beloved: is Your holy name: My Lord Jesus: help me.", "O how beloved: is Your holy name: my Lord Jesus: help me."]],
  },
  "annual-midnight-sunday-theotokia-part-1": {
    english: [["You are called righteous, O blessed one, among women, the second tabernacle.", "You are called truly, O blessed one, among women, the Second Tabernacle."], ["Whereupon is, the ten commandments, these which are written, by the finger of God.", "Of the covenant, and the Ten Commandments, which are written, by the finger of God."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["+ He made it with glory, as commanded by the Lord, according to the patterns, shown unto him.", "+ He made it with glory, as commanded by the Lord, and according to the pattern, shown unto him."]],
    arabic: [["مدعوة صديقة، أيتها المباركة، في النساء، القبة الثانية.", "مدعوة أنت بالحقيقة، أيتها المباركة، في النساء، القبة الثانية."], ["والعشر، الكلمات، هذة المكتوبة، بأصبع الله.", "العهد والعشر، الكلمات، هذة المكتوبة، بأصبع الله."]],
    englishArabic: [["Mad'ouwa siddeeqa, ayyatuha el-mubaraka, fin-nisa', el-qubba eth-thaniya.", "Mad'ouwwa anti bil-haqeeqa, ayyatuha el-mubaraka, fin-nisa', el-qubba eth-thaniya."], ["Wal-'ashr, el-kalimat, hadhihi el-maktouba, bi-isba' Allah.", "El-'ahd Wal-'ashr el-kalimat hadhihi el-maktouba bi-isba' Allah."]],
  },
  "annual-midnight-sunday-theotokia-part-10": {
    arabic: [["ولكِ سعيٌ، بدالة، أكثر من الشاروبيم، والسارافيم.", "ولك سعيً، بدالة، أكثر من الشاروبيم، والسيرافيم."]],
    englishArabic: [["Wa laki sa'yun, bi-dalla, akthar min esh-Sharoubim, wes-Sarafim.", "Wa laki sa'yun, bi-dalla, akthar min esh-Sharoubeem, wes-Sarafeem."]],
  },
  "annual-midnight-sunday-theotokia-part-11": {
    english: [["+ They did not attain, your high blessedness, O you who are clothed in, the glory of the Lord of Hosts.", "+ They did not attain, your high blessedness, O who is clothed in, the glory of the Lord of Hosts."]],
    arabic: [["+ والسارافيمُ، ذوو السِتَّةِ الأجنحةِ، يُرفرفونَ، عليكِ بتهليل.", "+ والسيرافيم، ذوو الستة الأجنحة، يرفرفون عليكِ، بتهليل."]],
    englishArabic: [["+ Wes-Sarafim, dhawou es-sittat el-agniha, yurafrifoun, 'alayki bi-tahleel.", "+ Wes-Sarafeem, dhawou es-sittat el-agniha, yurafrifoun 'alayki, bi-tahleel."]],
  },
  "annual-midnight-sunday-theotokia-part-12": {
    coptic: [["Ⲁ̀ⲣⲉϯϩⲓⲱⲧ: ⲙ̀ⲫ̀ⲣⲁϣⲓ ⲛⲉⲙ ⲡ̀ⲑⲉⲗⲏⲗ: ⲁ̀ⲣⲉⲙⲟⲣϯ ⲛ̀ⲟⲩϫⲟⲙ: ⲱ̀ ϯϣⲉⲣⲓ ⲛ̀Ⲥⲓⲱⲛ.", "Ⲁ̀ⲣⲉϯϩⲓⲱⲧ: ⲙ̀ⲫ̀ⲣⲁϣⲓ ⲛⲉⲙ ⲡ̀ⲑⲉⲗⲏⲗ: ⲁ̀ⲣⲉⲙⲟⲣϯ ⲛ̀ⲟⲩϫⲟⲙ: ⲱ̀ ⲧ̀ϣⲉⲣⲓ ⲛ̀Ⲥⲓⲱⲛ."]],
    english: [["Your glory O Mary, is higher than heaven, you are more honored than the earth, and its inhabitants.", "Your glory O Mary, is higher than the heaven, you are more honored than the earth, and its inhabitants."], ["And restored him, to Paradise, the place of joy, and the dwelling of the righteous.", "And restored him, to Paradise, the place of joy, and dwelling of the righteous."]],
  },
  "annual-midnight-sunday-theotokia-part-13": {
    coptic: [["+ Ⲛⲁⲓ ⲧⲏⲣⲟⲩ ⲉⲩⲥⲟⲡ: ⲥⲉⲉⲣⲥⲩⲙⲉⲛⲓⲛ ⲛⲁⲛ: ⲙ̀ⲡⲉϫⲓⲛⲙⲓⲥⲓ ⲛ̀ϣ̀ⲫⲏⲣⲓ: ⲱ̀ Ⲙⲁⲣⲓⲁ ϯⲡⲁⲣⲑⲉⲛⲟⲥ.", "+ Ⲛⲁⲓ ⲧⲏⲣⲟⲩ ⲉⲩⲥⲟⲡ: ⲥⲉⲉⲣⲥⲩⲙⲙⲉⲛⲓⲛ ⲛⲁⲛ: ⲙ̀ⲡⲉϫⲓⲛⲙⲓⲥⲓ ⲛ̀ϣ̀ⲫⲏⲣⲓ: ⲱ̀ Ⲙⲁⲣⲓⲁ ϯⲡⲁⲣⲑⲉⲛⲟⲥ."]],
    arabic: [["التابوتُ غيرُ الدنِسِ، المُصفَّحُ بالذهبِ، مِنْ كُلِّ ناحيةٍ، والغطاءُ الكاروبيُّ.", "التابوت الغير الدنس، المصَّفح بالذهب، من كل ناحية، والغطاء الكاروبي."]],
    englishArabic: [["Et-tabout ghayr ed-danis, el-musaffah bidh-dhahab, min kull nahiya, wal-ghita' el-karoubi.", "Et-tabout el-ghayr ed-danis el-musaffah bidh-dhahab min kull nahiya wal-ghita' el-karoubi."]],
  },
  "annual-midnight-sunday-theotokia-part-14": {
    english: [["+ There was an archpriest, in the tabernacle, offering sacrifices, on account of the people's sins.", "+ There was an archpriest, in the tabernacle, offering sacrifices, on account of the peoples sins."]],
    arabic: [["كانَ في القُبَّةِ، منارةٌ مِنْ ذهبٍ، وسبعةُ سُرُجٍ، تُضيءُ عليها.", "كان في القبة، منارة من ذهب، وسبعة سُرج، تضئ عليها."], ["+ كانَ في القُبَّةِ، عصا هارون، هذهِ التي أزهرتْ، بغيرِ غرسٍ ولا سقيٍ.", "+ كان في القبة، عصا هرون، هذه التي أزهرت، بغير غرس ولا سقي."]],
    englishArabic: [["Kan fil-qubba, manara min dhahab, wa sab'at surug, tudi' 'alayha.", "Kan fil-qubba manara min dhahab wa sab'at surug tudee' 'alayha."], ["+ Kan fil-qubba, 'asa Haroun, hadhihi allati azharat, bi-ghayr ghars wa la saqy.", "+ Kan fil-qubba 'asa Haroun Haroun allati azharat bi-ghayr ghars wa la saqy."]],
  },
  "annual-midnight-sunday-theotokia-part-15": {
    coptic: [["+ Ⲁⲩⲙⲟⲩϯ ⲉ̀Ⲙⲁⲣⲓⲁ: ϯϣⲉⲣⲓ ⲛ̀Ⲓⲱⲁ̀ⲕⲓⲙ: ϫⲉ ϯⲥ̀ⲕⲏⲛⲏ ⲙ̀ⲙⲏⲓ: ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ ⲥⲁⲃⲁⲱⲑ.", "+ Ⲁⲩⲙⲟⲩϯ ⲉ̀Ⲙⲁⲣⲓⲁ: ⲧ̀ϣⲉⲣⲓ ⲛ̀Ⲓⲱⲁ̀ⲕⲓⲙ: ϫⲉ ϯⲥ̀ⲕⲏⲛⲏ ⲙ̀ⲙⲏⲓ: ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ ⲥⲁⲃⲁⲱⲑ."]],
    english: [["They thought, with their enlightened minds, and explained it, through the Holy Books.", "They thought, with their bright minds, and explained it, through the Holy Books."], ["+ They likened the mercy seat, to the Virgin, lo the cherubim of glory, overshadowing her.", "+ They likened the mercy seat, to the Virgin, and the cherubim of glory, overshadowing her."], ["They likened the golden pot, to the Virgin, and its measure of the manna, to our Savior.", "They likened the golden pot, to the Virgin, and the measure of the manna, to our Savior."], ["+ They likened the golden candlestand, to the Church, and its seven lamps, to its seven orders.", "+ They likened the golden candlestand, to the Church, and the seven lamps, to its seven orders."], ["They likened the golden censer, to the Virgin, and its aloes, to Immanuel.", "They likened the golden censer, to the Virgin, and its aloes, to Emmanuel."], ["+ They likened the flower of incense, to Mary the Queen, and its chosen incense, to her virginity.", "+ They likened the flower of incense, to Mary the Queen, and the chosen incense, to her virginity."]],
    arabic: [["شبَّهوا عصا هارونَ، بخشبةِ الصليبِ، التي صُلِبَ ربّي عليها، حتّى خلَّصنا.", "شبهوا عصا هرون، بخشبة الصليب، التي صُلب ربي عليها، حتى خلصنا."]],
    englishArabic: [["Shabbahou 'asa Haroun, bi-khashabat es-saleeb, allati sulib Rabbi 'alayha, hatta khallasana.", "Shabbahou 'asa Haroun bi-khashabat es-saleeb allati sulib Rabbi 'alayha hatta khallasana."]],
  },
  "annual-midnight-sunday-theotokia-part-16": {
    english: [["You descended to Hades, and brought up, those who were captives, in that place.", "You descended into Hades, and brought up, those who were captives, in that place."]],
  },
  "annual-midnight-sunday-theotokia-part-17": {
    coptic: [["Ⲁ̀ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ: ⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ: ⲛ̀ⲑⲟϥ ⲡⲉ ϯⲁ̀ⲡⲁⲣⲭⲏ: ⲛ̀ⲧⲉ ⲛⲏⲉⲧⲁⲩⲉⲛⲕⲟⲧ.", "Ⲁ̀ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ: ⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ: ⲛ̀ⲑⲟϥ ⲡⲉ ⲧ̀ⲁ̀ⲡⲁⲣⲭⲏ: ⲛ̀ⲧⲉ ⲛⲏⲉⲧⲁⲩⲉⲛⲕⲟⲧ."]],
    arabic: [["المسيحُ إلهُنا، قامَ مِنْ بينِ الأمواتِ، وهو، بِكرُ المُضطجِعين.", "المسيح إلهنا، قام من الأموات، وهو باكورة، الراقدين."]],
    englishArabic: [["El-Maseeh Ilahuna, qam min bayn el-amwat, wa huwa, bikr el-mudtagi'een.", "El-Maseeh ilahuna, qam min el-amwat, wa huwa bakourat, er-raqideen."]],
  },
  "annual-midnight-sunday-theotokia-part-18": {
    english: [["+ Wherefore we glorify Him, proclaiming and saying, \"Blessed are You O my Lord Jesus, for You have risen and saved us.\"", "+ Therefore we glorify Him, proclaiming and saying, \"Blessed are You, O my Lord Jesus, for You have risen and saved us.”"]],
  },
  "annual-midnight-sunday-theotokia-part-2": {
    english: [["+ One nature out of two, a holy divinity, co-essential with the Father, and incorruptible.", "+ One out of two, a holy divinity, co-essential with the Father, and incorruptible."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["All the souls together, of the children of Israel, brought offering unto, the tabernacle of the Lord.", "All the souls together, of the children of Israel, brought offerings unto, the Tabernacle of the Lord."]],
  },
  "annual-midnight-sunday-theotokia-part-3": {
    english: [["+ Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "+ Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["+ The two golden Cherubim, continually covered, with their wings, the mercy seat.", "+ The two golden cherubim, continually cover, with their wings, the Mercy Seat."]],
  },
  "annual-midnight-sunday-theotokia-part-4": {
    english: [["+ The Bread of life, which came down from heaven, and gave life, unto the world.", "+ The Bread of life, which came down for us, from heaven, has given life to the world."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["+ For that was kept, in the tabernacle, as a testimony, to the children of Israel.", "+ For that was kept, in the Tabernacle, as a testimony, for the children of Israel."], ["You bore Him without blemish, He gave unto us, His honored Body and Blood, and we lived forever.", "You bore Him without blemish, He gave unto us, His honored Body and Blood, and we live forever."]],
    arabic: [["+ فذلك وُضع، في القبة، شهادة لبني، إسرائيل.", "+ فذاك وُضع، في القبة، شهادة لبني، إسرائيل."]],
    englishArabic: [["+ Fa-dhalika wudi', fil-qubba, shahadatan li-bani, Isra'eel.", "+ Fa-dhaka wudi', fil-qubba, shahadatan li-bani, Isra'eel."]],
  },
  "annual-midnight-sunday-theotokia-part-5": {
    english: [["+ By His appearing, He gave light to us, we who sit in the darkness, and in the shadow of death.", "+ By His Coming, He gave light to us, we who were sitting in the darkness, and in the shadow of death."], ["+ Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "+ Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["That was made of, pure and elect gold, and was placed in, the tabernacle.", "That was made of, pure and chosen gold, and was placed, in the Tabernacle."], ["+ That was made, by the hands of men, who brought oil for its lamps, by day and by night.", "+ That was managed, by the hands of men, who brought oil for its lamps, by day and by night."], ["He who dwells in your womb, O Virgin Mary, gives light to every man, who comes into the world.", "He Who dwelt in your womb, O Virgin Mary, gives light to every man, who comes into the world."]],
  },
  "annual-midnight-sunday-theotokia-part-6": {
    english: [["+ Which is God the Word, who took flesh from you, and offered Himself as incense, to God His Father.", "+ Which is God the Word, Who was incarnate from you, and offered Himself as incense, to God His Father."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["Wherefore truly, I do not err, whenever I call you, the golden censer.", "Where for truly, I do not err, whenever I call you, the golden censer."], ["+ For therein, is offered, the choice incense, before the Holies.", "+ For therein, is offered, the chosen incense, before the Holies."]],
    arabic: [["حينئذ بالحقيقة، لا أخطيئ في شئ، إذا ما دعوتك، المجمرة الذهب.", "حينئذ بالحقيقة لا أخطئ في شئ أذ ما دعوتك المجمرة الذهب."], ["+ وأنتِ يا مريم، حملتِ في بطنِك، الغير منظور، كلمة الآب.", "+ وأنتِ يا مريم، حملتِ في بطنِك، غير منظور، كلمة الآب."]],
    englishArabic: [["Heena'idhin bil-haqiqa, la ukhti' fi shay', idha ma da'awtuki, el-migmara edh-dhahab.", "Heena'idhin bil-haqiqa la ukhti' fi shay' idh ma da'awtuki el-migmara edh-dhahab."], ["+ Wa anti ya Maryam, hamalti fi batniki, ghayr el-manzour, kalimat el-Ab.", "+ Wa anti ya Maryam, hamalti fi batniki, ghayr el-manzour, Kalimat el-Ab."]],
  },
  "annual-midnight-sunday-theotokia-part-7": {
    english: [["Hail to you Mary, the beautiful dove, who gave birth to, God the Word for us.", "Hail to you O Mary, the beautiful dove, who has borne to us, God the Logos."]],
  },
  "annual-midnight-sunday-theotokion-7": {
    english: [["Hail to you Mary, the beautiful dove, who gave birth to, God the Word for us.", "Hail to you O Mary, the beautiful dove, who has borne to us, God the Logos."]],
  },
  "annual-midnight-thursday-psali": {
    english: [["Once more my beloved, let us keep away, the evil inclinations of our heart, that lead us to sin.", "Once more my beloved, let us keep away, the evil inclinations of heart, that lead us to sin."], ["+ O my Lord Jesus Christ, who is born of the Father, before all ages, have mercy on us according to Your great mercy.", "+ O my Lord Jesus Christ, who is born of the Father, before all ages, have mercy upon us according to Your great mercy."]],
    arabic: [["+ ياربي يسوع المسيح المولود من الآب قبل كل الدهور إرحمنا كعظيم رحمتك.", "+ يا ربي يسوع المسيح، المولود من الآب، قبل كل الدهور، إرحمنا كعظيم رحمتك."], ["+ ياربي يسوع المسيح الذي ولدته العذراء في بيت لحم اليهودية خلصنا وارحمنا.", "+ يا ربي يسوع المسيح، الذي ولدته العذراء، في بيت لحم اليهودية، خلِّصنا وإرحمنا."], ["ياربي يسوع المسيح الذي اعتمد في الأردن طهر نفوسنا من دنس الخطية.", "يا ربي يسوع المسيح، الذي إعتمد في الأردن، طَهِّر نفوسنا، من دنس الخطية."], ["ياربي يسوع المسيح الذي صام عنا أربعين يوماً وأربعين ليلة خلصنا وارحمنا.", "يا ربي يسوع المسيح، الذي صام عنا، أربعين يوماً وأربعين ليلة، خلِّصنا وإرحمنا."], ["+ ياربي يسوع المسيح الذي صُلب على الصليب إسحق الشيطان تحت أقدامنا.", "+ يا ربي يسوع المسيح، الذي صُلب على الصليب، إسحق الشيطان، تحت أقدامنا."], ["+ ياربي يسوع المسيح الذي وُضع في القبر أكسر عنا شوكة الموت.", "+ يا ربي يسوع المسيح، الذي وُضع في القبر، إسحق عنا، شوكة الموت."], ["ياربي يسوع المسيح الذي قام من بين الأموات وصعد إلى السموات أقمنا بقوتك.", "يا ربي يسوع المسيح، الذي قام من بين الأموات، وصعد إلى السموات، أقِمنا بقوتك."], ["ياربي يسوع المسيح الآتي في ظهوره الثاني إصنع معنا محبة في منبرك المخوف.", "يا ربي يسوع المسيح، الآتي في ظهوره الثاني، إصنع معنا محبة، في منبرك المخوف."]],
    englishArabic: [["+ Ya Rabbi Yasou' el-Maseeh alladhi wudi' fil-qabr iksir 'anna shawkat el-mawt.", "+ Ya Rabbi Rabbi Yasou' el-Maseeh alladhi wudi' fil-qabr Is-haq 'anna shawkat el-mawt."]],
  },
  "annual-midnight-thursday-theotokia-part-2": {
    english: [["+ We have become worthy to have, the Tree of Life to eat from, which is the Body of God, and His true Blood.", "+ We deserved the Tree of Life: to eat from It: It is the body of God: and His true blood."], ["Let us worship our Savior, the Good Lover of Mankind, for He had compassion upon us, He came and saved us.", "Let us worship our Savior, the good Lover of Mankind, for He had compassion on us, He has come and saved us."]],
  },
  "annual-midnight-thursday-theotokia-part-3": {
    english: [["+ The one and only Word, begotten before all ages, as the divinity without body, from His Father only.", "+ The one and only Word, begotten before all ages, as the divinity without body, from His Father alone."], ["+ And also after she gave birth to Him, she remained a virgin, and thus He has shown, that she is the Mother of God.", "+ And also after she gave birth to Him, she remained a virgin, and thus He has shown, that she is the Theotokos."], ["+ It became the source of immortality, she gave birth to Immanuel, without the seed of man, to revoke the corruption of our race.", "+ It became the source of immortality, she gave birth to Emmanuel for us, without the seed of man, to revoke the corruption of our race."], ["Let us proclaim and say unto Him, glory be to the Incomprehensible One, the Good Lover of Mankind the Savior of our souls, He came and saved us.", "Let us proclaim and say to Him, glory to You O Incomprehensible One, the Good Lover of Mankind the Savior of our souls, Who came and saved us.”"]],
  },
  "annual-midnight-thursday-theotokia-part-7": {
    english: [["This is He Whom is worthy of glory, with His Good Father, and the Holy Spirit, both now and forever.", "This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."]],
    arabic: [["+ يا لهذه الاتفاقات، التي لأولئك الأنبياء، الذين تنبأوا بهذا الروح الواحد، من أجل مجيء المسيح.", "+ يا لهذه الإتفاقات، الذي لأولئك الأنبياء، الذين تنبأوا بهذا الروح الواحد، من أجل مجيئ المسيح."], ["هذا الذي ينبغي له المجد، مع أبيه الصالح، والروح القدس، منذ الآن وإلى الأبد.", "هذا الذي ينبغي له المجد، مع أبيه الصالح، والروح القدس، من الآن وإلى الأبد."]],
    englishArabic: [["Hadha elladhi yanbaghi lahu el-magd, ma'a abeehi es-salih, war-Rouh el-Qudus, mundh el-an wa ila el-abad.", "Hadha alladhi yanbaghi lahu el-magd, ma'a abeehi es-salih war-Rouh el-Qudus, min el-an wa ila el-abad."]],
  },
  "annual-midnight-thursday-watos-lobsh": {
    english: [["This is a symbol of Mary, the undefiled virgin, from whom the Logos of the Father, came and took flesh.", "This is a symbol of Mary, the undefiled Virgin, which the Word of the Father, came and took flesh from her."]],
    arabic: [["هي مثال لمريم، العذراء غير الدنسة، التي تجسد منها، كلمة الآب.", "هي مثال مريم، العذراء غير الدنسة، التي أتى وتجسد منها، كلمة الآب."]],
    englishArabic: [["Hiya mithal li-Maryam el-'Adhra' ghayr ed-danisa allati tagassad minha kalimat el-Ab.", "Hiya mithal Maryam, el-'Adhra' ghayr ed-danisa, allati ata wa tagassad minha, Kalimat el-Ab."]],
  },
  "annual-midnight-thursday-watos-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto the ages of the ages, Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والابن. والروح القدس. الآن وكل أوان. والى دهر الداهرين آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rooh el-Qudus, el-an wa kulla awan, wa ila dahr ed-dahireen ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "annual-midnight-thursday-watos-theotokia-conclusion": {
    arabic: [["مُبارَك الآب والإبن، والرُّوح القُدُس، الثالوث الكامل، نسجد له ونُمجِّدهُ.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarak el-Ab wal-Ibn, war-Rooh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "annual-midnight-tuesday-adam-lobsh": {
    english: [["By what means can we bless you, for you were exalted, above all the highest, and rational natures.", "By what means can we bless you, for you were exalted above, all the highest, the more rational natures."], ["+ Your name is remembered, throughout all ages, O beautiful dove, the Mother of Christ.", "+ Your name shall be remembered, throughout all ages, O beautiful dove, and Mother of Christ."], ["Rejoice O Mary, the handmaiden and mother, for He who is on your lap, the angels praise.", "Rejoice, O Mary, handmaiden and mother, for the angels praise Him who is in your arms,"], ["+ And the cherubim, worship Him befittingly, and the seraphim, without ceasing.", "+ and the cherubim worthily worship Him; the seraphim too, without ceasing."]],
    arabic: [["+ يُذكر اسمك في كل الأجيال أيتها الحمامة الحسناء وأم المسيح.", "+ يُذكر إسمِك، في كل الأجيال، أيتها الحمامة الحسنة، وأُم المسيح."], ["افرحي يا مريم العبدة والأم لأن الذي في حجرك تسبحه الملائكة.", "إفرحي يا مريم، العبدة والأم، لأن الذي في حجرك، الملائكة تسبحه. الملائكة."], ["+ والشاروبيم تسجد له باستحقاق والسارافيم بغير فتور.", "+ والشاروبيم، يسجدون له بإستحقاق، والسِّرافيم، بغير فتور."]],
    englishArabic: [["+ Yudhkar ismuki fi kull el-agyal ayyatuha el-hamama el-hasna' wa umm el-Maseeh.", "+ Yudhkar ismuki, fi kull el-agyal, ayyatuha el-hamama el-hasana, wa umm el-Maseeh."], ["Ifrahi ya Maryam el-'abda wal-umm li-anna alladhi fi hugriki tusabbihuhu el-mala'ika.", "Ifrahi ya Maryam el-'abda wal-umm li-anna alladhi fi hugriki el-mala'ika tusabbihuhu. el-mala'ika."], ["+ Wesh-Sharoubim tasgud lahu bi-istihqaq wes-Sarafim bi-ghayr futour.", "+ Wesh-Sharoubeem, yasgudoun lahu bi-istihqaq, wes-Sarafeem, bi-ghayr futour."]],
  },
  "annual-midnight-tuesday-adam-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
  },
  "annual-midnight-tuesday-adam-theotokias-conclusion": {
    english: [["Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.", "Your mercies O my God: are countless: and exceedingly plenteous: are Your compassions."], ["And me too, the sinner, teach me O my Master, to offer repentance.", "And I too: the sinner: teach me O my Lord: to offer repentance."], ["For You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.", "For You do not desire: the death of a sinner: but rather that he return: and that his soul may live."], ["For You are good, and merciful, let Your compassion, speedily come to us.", "For You are good: and merciful: let Your compassions: speedily come to us."], ["O King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.", "O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins."], ["Disperse the enemies, of the Church, and fortify her that she, may not be shaken forever.", "Disperse the enemies, of the Church, and fortify her, that she may never be shaken. forever."]],
  },
  "annual-midnight-tuesday-psali": {
    english: [["Come unto us today, O Christ our Master, shine upon us, with Your exalted divinity.", "Come to us today, O Christ our Master, shine on us, with Your high divinity."], ["Send unto us, this great grace, of Your Holy Spirit, the Comforter.", "Send to us, this great grace, that is of Your Holy Spirit, the Paraclete."]],
    arabic: [["أرسل لنا هذه النعمة العظيمة التي لروحك القدوس المعزي.", "أرسل علينا، هذه النعمة العظيمة، التي لروحك القدوس، المعزي."], ["+ لكن اسمك القدوس ياربي يسوع يكون لهم ناصراً في جميع ضيقاتهم.", "+ لكن أسمك القدوس، يا ربي يسوع، يكون لهم ناصراً، في جميع ضيقاتهم."], ["+ اسمك القدوس ياربي يسوع هو ينجيهم من جميع شدائدهم.", "+ إسمك القدوس، يا ربي يسوع، هو ينجيهم، من جميع شدائدهم."], ["+ اذا نطقوا به تستنير عقولهم وترتفع إلى العلاء قلوبهم.", "+ إذ نطقوا به، تستنير عقولهم، وترتفع إلى، العلاء قلوبهم."]],
    englishArabic: [["Arsil lana hadhihi en-ni'ma el-'azima allati li-Rouhik el-Qudus el-Mu'azzi.", "Arsil 'alayna hadhihi en-ni'ma el-'azima allati li-Rouhik el-Qudus el-Mu'azzi."], ["+ Idha nataqou bihi tastanir 'uqouluhum wa tartafi' ila el-'ala' quloubuhum.", "+ Idh nataqou bihi tastanir 'uqouluhum wa tartafi' ila el-'ala' quloubuhum."]],
  },
  "annual-midnight-tuesday-theotokia-part-1": {
    english: [["+ Who for us gave birth to, God the Word, who became man, for our salvation.", "+ Who for us gave birth, to God the Logos, Who became man, for our salvation."], ["And after He became man, He is also God, therefore she gave birth to Him, while a virgin.", "And after He became man, He remained God, wherefore she gave birth to Him, while a virgin."]],
    arabic: [["+ عالية هي الأُعجوبة، التي لحبلها، وولادتها أيضاً، لا يُنطق به.", "+ عالية هي الأُعجوبة، التي لحبلها، وولادتها أيضاً، لا يُنطق بها."]],
    englishArabic: [["+ 'Aliya hiya el-u'gouba, allati li-hablaha, wa wiladatuha aydan, la yuntaq bih.", "+ 'Aliya hiya el-u'gouba, allati li-hablaha, wa wiladatiha aydan, la yuntaq biha."]],
  },
  "annual-midnight-tuesday-theotokia-part-2": {
    english: [["You have found grace, and the Lord is with you, you are the ladder, which Jacob saw.", "You have found grace, and the Lord is with you, you are the ladder, that Jacob saw."], ["You are the tree, which Moses has seen, flaming with fire, and was not consumed.", "You are the bush, which Moses has seen, flaming with fire, and was not consumed."], ["+ This is the Son of God, who dwelt in your womb, the fire of His divinity, did not burn your body.", "+ This is the Son of God, who dwelt in your womb, the fire of His divinity, did not consume your body."]],
    arabic: [["وجدتِ نعمة، الربُّ مَعَكِ، أنتِ هي السلم، التي رآها يعقوب.", "وجدتِ نعمة، الربُّ مَعَكِ، أنتِ هي السلم، الذي رآه يعقوب."]],
    englishArabic: [["Wagadti ni'ma, er-Rabbu ma'aki, anti hiya es-sullam, allati ra'aha Ya'qoub.", "Wagadti ni'ma, er-Rabbu ma'aki, anti hiya es-sullam, alladhi ra'ahu Ya'qoub."]],
  },
  "annual-midnight-tuesday-theotokia-part-3": {
    english: [["Hail to the saint, the Mother of all the living, you are the one we pray to, intercede for us.", "Hail to the Saint, the mother of all the living, you are the one we entreat to, intercede for us."]],
  },
  "annual-midnight-tuesday-theotokia-part-4": {
    english: [["+ Because of the greatness, of the wonderful, Maker of all, good things.", "+ Because of the greatness, of that wonderful, Maker of, all good things."], ["+ He covered the peak, of the mountain, with smoke and darkness, mist and storms.", "+ He covered the peak, of the mountain, with smoke darkness and mist, and with storms."], ["+ Co-essential with us, and perfect, and also has, a rational soul.", "+ Coessential with us, and perfect, and also has, a rational soul."], ["And to make him, a citizen of heaven, and restore his leadership, according to His great mercy.", "And to make him a citizen, of heaven, and restore his authority, according to His great mercy."]],
  },
  "annual-midnight-tuesday-theotokia-part-5": {
    english: [["+ For this is the Rock, which Daniel saw, which was cut, from a mountain.", "+ For this is the Stone, which Daniel saw, which was cut, from a mountain."]],
  },
  "annual-midnight-tuesday-theotokia-part-6": {
    english: [["+ For you gave birth for us, God the Word, our Savior Jesus, He came and saved us.", "+ For us you gave birth to, God the Word, our Savior Jesus, He came and saved us."]],
  },
  "annual-midnight-tuesday-theotokia-part-7": {
    english: [["+ You are the Mother of light, the honored Mother of God, you have carried, the infinite Logos.", "+ You are the Mother of Light, the honored Mother of God, you have carried, the uncircumcript Logos."]],
    arabic: [["ومن بعد أن ولدتِه، بقيتِ عذراء، نعظمكِ بتسابيح، وبركات.", "وبعد ما ولدتِه، بقيتِ عذراء، بتسابيح وبركات، نعظمكِ."]],
    englishArabic: [["Wa min ba'd an waladtihi, baqeeti 'adhra', nu'azzimuki bi-tasabeeh, wa barakat.", "Wa ba'd ma waladtih, baqeeti 'adhra', bi-tasabeeh wa barakat, nu'azzimuki."]],
  },
  "annual-midnight-wednesday-psali": {
    english: [["+ The river of water is our Savior, Jesus Christ our Lord, and the souls of those who abide, in Him shall live forever.", "+ The river of water is our Savior, Jesus Christ our Lord, and the souls who abide, in Him shall live forever."]],
    arabic: [["فليفرح ويتهلل طالبو الرب الملازمون كل حين في تلاوة اسمه القدوس.", "فليفرح ويتهلل، طالبوا الرب الملازمون، كل حين في تلاوة، إسمه القدوس."], ["+ مجرى المياه هو مخلصنا ربنا يسوع المسيح والملازمون له تحيا نفوسهم.", "+ مجرى الماء هو مُخلِّصنا، ربنا يسوع المسيح، والملازمون له، تحيا نفوسهم."]],
    englishArabic: [["Fal-yafrah wa yatahallal talibou er-Rabb el-mulazimoun kull heen fi tilawat ismihi el-qudous.", "Fal-yafrah wa yatahallal, talibou er-Rabb el-mulazimoun, kull heen fi tilawat, ismihi el-quddous."], ["+ Magra el-miyah huwa mukhallisuna Rabbuna Yasou' el-Maseeh wal-mulazimoun lahu tahya nufousuhum.", "+ Magra el-ma' huwa mukhallisuna Rabbuna Yasou' el-Maseeh wal-mulazimoun lahu tahya nufousuhum."]],
  },
  "annual-midnight-wednesday-theotokia-part-2": {
    english: [["+ Every generation calls you blessed, and we also worship Him, to whom you gave birth, and we exalt Him.", "+ Every generation calls you blessed, and also worship Him, to whom you gave birth, and we exalt Him."]],
  },
  "annual-midnight-wednesday-theotokia-part-3": {
    english: [["+ For you have given birth, to the true Word, the Son of the ever-existing Father, who came and redeemed us from our sins.", "+ For you bore the True Word, / the Son of the eternal Father, / who came and saved us / from our sins."]],
    arabic: [["+ أنتِ هي السحابة الخفيفة التي دلتنا على مطر استعلان الإله الإبن الوحيد.", "+ أنتِ هي السحابة الخفيفة، التي دلتنا على، مطر إستعلان، الإله الوحيد."]],
    englishArabic: [["+ Anti hiya es-sahaba el-khafifa allati dallatna 'ala matar isti'lan el-Ilah el-Ibn el-wahid.", "+ Anti hiya es-sahaba el-khafifa allati dallatna 'ala matar isti'lan el-Ilah el-wahid."]],
  },
  "annual-midnight-wednesday-theotokia-part-4": {
    coptic: [["Ⲁⲕⲉⲣⲥⲩⲙⲉⲛⲓⲛ ⲛⲁⲛ ⲙ̀ⲡⲓϫ̀ⲫⲟ: ⲛ̀ⲧⲉ Ⲫϯ ⲉ̀ⲧⲁϥⲓ̀ ϣⲁⲣⲟⲛ: ⲁⲕϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲙ̀Ⲙⲁⲣⲓⲁ: ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲛ̀ⲁⲧⲑⲱⲗⲉⲃ.", "Ⲁⲕⲉⲣⲥⲩⲙⲙⲉⲛⲓⲛ ⲛⲁⲛ ⲙ̀ⲡⲓϫ̀ⲫⲟ: ⲛ̀ⲧⲉ Ⲫϯ ⲉ̀ⲧⲁϥⲓ̀ ϣⲁⲣⲟⲛ: ⲁⲕϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲙ̀Ⲙⲁⲣⲓⲁ: ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲛ̀ⲁⲧⲑⲱⲗⲉⲃ."]],
    arabic: [["+ عظيمة هي الكرامة التي استحققتها ياغبريال الملاك المبشر ووجهك يتلألأ فرحاً.", "+ عظيمة هي الكرامة، التي إستحققتها يا غبريال، الملاك المبشر، ووجهك يتلألأ فرحاً."], ["أعلمت لنا ميلاد الله الذي أتى إلينا وبشرت مريم العذراء غير الدنسة.", "أعلنت لنا ميلاد، الله الذي أتى إلينا، وبشرتَ مريم العذراء، غير الدنسة."]],
    englishArabic: [["A'lamta lana milad Allah alladhi ata ilayna wa bashsharta Maryam el-'Adhra' ghayr ed-danisa.", "A'lanta lana milad Allah alladhi ata ilayna, wa bashsharta Maryam el-'Adhra' ghayr ed-danisa."]],
  },
  "annual-midnight-wednesday-watos-lobsh": {
    coptic: [["Ⲧⲉⲥ̀ⲙⲁⲙⲁⲁⲧ ⲧⲉϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲱ̀ ⲑⲏⲉ̀ⲧⲁⲥϫⲉⲙ ⲭⲁⲣⲓⲥⲙⲁ ⲛⲓⲃⲉⲛ: ⲙ̀ⲡⲉⲙ̀ⲑⲟ ⲙ̀ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟⲩ: ⲡⲉⲛⲁ̀ⲗⲏⲑⲓⲛⲟⲥ ⲛ̀ⲛⲟⲩϯ.", "Ⲧⲉⲥ̀ⲙⲁⲙⲁⲁⲧ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲱ̀ ⲑⲏⲉ̀ⲧⲁⲥϫⲉⲙ ⲭⲁⲣⲓⲥⲙⲁ ⲛⲓⲃⲉⲛ: ⲙ̀ⲡⲉⲙ̀ⲑⲟ ⲙ̀ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟⲩ: ⲡⲉⲛⲁ̀ⲗⲏⲑⲓⲛⲟⲥ ⲛ̀ⲛⲟⲩϯ."]],
    english: [["+ And no one else entered it, but the Lord of Powers, He entered and went out, and the gate remained sealed.\"", "+ And no one entered through it, but the Lord of Powers, He entered and went out, and the gate remained sealed.”"], ["+ Blessed is the fruit of your womb, O you who gave birth to God for the world, so as to redeem us from the hands, of the unmerciful tyrant.", "+ Blessed is the fruit of your womb, O who gave birth to God for the world, so as to redeem us from the hands, of the unmerciful tyrant."], ["Blessed and perfect are you, O you who have found all grace, before the King of glory, our True Lord.", "Blessed and perfect are you, O who has found all grace, before the King of Glory, our True Lord."], ["And He walked among men, as a caring Lover of Mankind, until He saved our souls, through His holy appearance.", "And He walked among men, as a compassionate Lover of Mankind, until He saved our souls, through His holy appearance."], ["+ Let us worship our Savior, the Good Lover of Mankind, for He had compassion upon us, as He came and saved us.", "+ Let us worship our Savior, the good Lover of Mankind, for He had compassion on us, He has come and saved us."], ["Hail to you, O Virgin, the right and true Queen. Hail to the pride of our race, who bore to us Immanuel.", "Hail to you O Virgin / the right and true Queen. / Hail to the pride of our race / who bore to us Emmanuel."]],
    arabic: [["+ إستحقيتِ كل كرامة أكثر من كل من على الأرض لأن كلمة الآب أتى وتجسد منكِ.", "+ إستحققتِ كل كرامة، أكثر من كل مَنْ على الأرض، لأن كلمة الآب، أتى وتجسد منكِ."], ["+ نسألك اذكرينا أيتها الشفيعة المؤتمنة أمام ربنا يسوع المسيح ليغفر لنا خطايانا.", "+ نسألكِ أن تذكرينا، أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا."]],
    englishArabic: [["+ Istahaqqeiti kull karama akthar min kull man 'ala el-ard li-anna kalimat el-Ab ata wa tagassad minki.", "+ Istahaqqti kull karama, akthar min kull man 'ala el-ard, li-anna Kalimat el-Ab, ata wa tagassad minki."], ["+ Nas'aluki udhkurina ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana.", "+ Nas'aluki an tadhkureena ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana."]],
  },
  "annual-midnight-wednesday-watos-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto the ages of the ages, Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والابن. والروح القدس. الآن وكل أوان. والى دهر الداهرين آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rooh el-Qudus, el-an wa kulla awan, wa ila dahr ed-dahireen ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "annual-midnight-wednesday-watos-theotokia-conclusion": {
    arabic: [["مُبارَك الآب والإبن، والرُّوح القُدُس، الثالوث الكامل، نسجد له ونُمجِّدهُ.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarak el-Ab wal-Ibn, war-Rooh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "annual-morning praises-morning-doxology": {
    coptic: [["Ⲡⲓⲛⲓϣϯ ⲛ̀ⲣⲉϥϩⲓⲱⲓϣ: ϧⲉⲛ ϯⲭⲱⲣⲁ ⲛ̀ⲧⲉ Ⲭⲏⲙⲓ: Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲡⲉⲥϣⲟⲣⲡ ⲛ̀ⲣⲉϥⲉⲣϩⲉⲙⲓ.", "Ⲡⲓⲛⲓϣϯ ⲛ̀ⲣⲉϥϩⲓⲱⲓϣ: ϧⲉⲛ ϯⲭⲱⲣⲁ ⲛ̀ⲧⲉ Ⲭⲏⲙⲓ: Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲡⲉⲥϣⲟⲣⲡ ⲛ̀ⲛⲉϥⲉⲣϩⲉⲙⲓ."]],
    english: [["Hail to the Cherubim, hail to the Seraphim, hail to all the hosts, of the heavens.", "Hail to the cherubim: hail to the seraphim: hail to all: the heavenly orders."], ["Hail to the whole choir, of the martyrs, hail to Abba Antony, and the three Macarii.", "Hail to the whole choir, of the martyrs, hail to Abba Anthony, and the three Macarii."], ["Through their prayers, O Christ our King, have mercy upon us, in Your kingdom.", "Through their prayers, O Christ our King, have mercy on us, in Your kingdom."], ["You came into the world, through Your love for man, and all the creation, rejoiced at Your coming.", "You came into the world, through Your love for mankind, and all the creation rejoiced, at Your coming."], ["You have saved Adam, from seduction, and delivered Eve, from the pangs of death.", "You have saved Adam, from deception, and delivered Eve, from the pangs of death."], ["You are the Mother of the Light, the honored Mother of God, you have carried, the Uncircumscript Logos.", "You are the Mother of Light, the honored Mother of God, you have carried, the uncircumcript Logos."], ["And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["Through the intercessions, of the Mother of God Saint Mary, O Lord grant us, the forgiveness of our sins.", "Through the intercessions of the Theotokos, Saint Mary, O Lord, grant us the forgiveness of our sins."], ["Through the intercessions, of the whole choir of the angels, O Lord grant us, the forgiveness of our sins.", "Through the intercessions, of the whole chorus of angels, O Lord grant us, the forgiveness of our sins."], ["Their voices went forth, into all the earth, and their words have reached, the ends of the world.", "Their voices went forth, unto all the earth, and their words have reached, the ends of the world."], ["Through the prayers, of my masters the fathers the Apostles, O Lord grant us, the forgiveness of our sins.", "Through the prayers, of my lords and fathers the Apostles, O Lord grant us, the forgiveness of our sins."], ["You are the Mother of God, O Virgin Mary, ask Him on our behalf, to have mercy upon our race.", "You are the Mother of God, O Virgin Mary, ask Him on our behalf, to have mercy on our race."]],
    arabic: [["السلام للشاروبيم، السلام للسارافيم، السلام لجميع الطغمات، السمائية.", "السلام للشاروبيم، السلام للسِّرافيم السلام لجميع الطغمات السمائية."], ["أيها النور الحقيقي، الذي يضئ، لكل إنسان، آتٍ إلى العالم.", "أيها النور الحقيقي، الذي يضئ، لكل إنسان، آتياً إلى العالم."], ["المدبر القوي، للملتجئين، المتشوق لخلاص، ونجاة كل أحد.", "المدبر القوي، للملتجئين إليه، المتشوق لخلاص، ونجاة كل أحد."], ["يمسح كل يوم، الشيوخ، والصبيان والشبان، والخدام.", "يمسح كل يوم، الشيوخ، والصبيان والفتيان، والخدام."], ["ومن بعد أن ولدتِه، بقيتِ عذراء، نعظمكِ بتسابيح، وبركات.", "وبعد ما ولدتِه، بقيتِ عذراء، بتسابيح وبركات، نعظمكِ."], ["ونحن أيضاً، نطلب أن نفوز، برحمة بشفاعاتك، لدى محب البشر.", "ونحن أيضاً نطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر."], ["بشفاعات، والدة الإله القديسة مريم، يا رب إنعم لنا، بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."], ["بشفاعات، جميع صفوف الملائكة، يا رب إنعم لنا، بمغفرة خطايانا.", "بشفاعات، كل صفوف الملائكة، يا رب إنعم لنا، بمغفرة خطايانا."]],
    englishArabic: [["Es-salamo lel-Sharubim, es-salamo lel-Sarafim, es-salamo le-gamee' el-taghamat, es-samaya'ia.", "Es-salamo lel-Sharubim es-salamo lis-Sarafim es-salamo le-gamee' el-taghamat es-samaya'ia."], ["Ayyoha el-noor el-haqeeqi, elladhi yodee', le-kolli ensan, atin ela el-'alam.", "Ayyoha el-noor el-haqeeqi elladhi yodee' le-kolli ensan atiyan ela el-'alam."], ["El-modabbir el-qawi, lel-moltagi'een, el-motashawweq le-khalas, wa nagat kol ahad.", "El-mudabbir el-qawi, lil-multagi'een ilayh, el-mutashawwiq li-khalas, wa nagat kull ahad."], ["Yamsah kol yawm, el-shoyookh, wel-sibyan wel-fatayat, wel-khoddam.", "Yamsah kull yawm, esh-shuyoukh, wes-sibyan wal-fityan, wal-khuddam."], ["Wa min ba'd an waladtih, baqeeti 'azra, no'azzemok be-tasabeeh, wa barakat.", "Wa ba'd ma waladtih, baqeeti 'adhra', bi-tasabeeh wa barakat, nu'azzimuki."], ["Wa nahno ayadan, natlob an nafooz, be-rahma be-shafa'atik, lada moheb el-bashar.", "Wa nahnu aydan natlub, an nafouz bi-rahma, bi-shafa'atiki, 'ind muhibb el-bashar."], ["Be-shafa'at, walidat el-Ilah el-qiddeesa Maryam, ya Rab en'im lana, be-maghfirat khataya-na.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."], ["Be-shafa'at, gamee' sofoof el-mala'ika, ya Rab en'im lana, be-maghfirat khataya-na.", "Be-shafa'at kull sofoof el-mala'ika ya Rab en'im lana be-maghfirat khataya-na."]],
  },
  "annual-morning-praises-adam-theotokias-conclusion": {
    english: [["Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.", "Your mercies O my God: are countless: and exceedingly plenteous: are Your compassions."], ["And me too, the sinner, teach me O my Master, to offer repentance.", "And I too: the sinner: teach me O my Lord: to offer repentance."], ["For You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.", "For You do not desire: the death of a sinner: but rather that he return: and that his soul may live."], ["For You are good, and merciful, let Your compassion, speedily come to us.", "For You are good: and merciful: let Your compassions: speedily come to us."], ["O King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.", "O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins."], ["Disperse the enemies, of the Church, and fortify her that she, may not be shaken forever.", "Disperse the enemies, of the Church, and fortify her, that she may never be shaken. forever."]],
  },
  "annual-veneration-conclusion": {
    coptic: [["Ⲛⲏⲉⲧϣⲱⲛⲓ ⲙⲁⲧⲁⲗϭⲱⲟⲩ: ⲛⲏⲉ̀ⲧⲁⲩⲉⲛⲕⲟⲧ Ⲡⲟ︦ⲥ︦ ⲙⲁⲙ̀ⲧⲟⲛ ⲛⲱⲟⲩ: ⲛⲉⲛⲥ̀ⲛⲏⲟⲩ ⲉⲧⲭⲏ ϧⲉⲛ ϩⲟϫϩⲉϫ ⲛⲓⲃⲉⲛ: Ⲡⲁⲟ︦ⲥ︦ ⲁ̀ⲣⲓⲃⲟⲓⲑⲓⲛ ⲉ̀ⲣⲟⲛ ⲛⲉⲙⲱⲟⲩ.", "Ⲛⲏⲉⲧϣⲱⲛⲓ ⲙⲁⲧⲁⲗϭⲱⲟⲩ: ⲛⲏⲉ̀ⲧⲁⲩⲉⲛⲕⲟⲧ Ⲡⲟ︦ⲥ︦ ⲙⲁⲙ̀ⲧⲟⲛ ⲛⲱⲟⲩ: ⲛⲉⲛⲥ̀ⲛⲏⲟⲩ ⲉⲧⲭⲏ ϧⲉⲛ ϩⲟϫϩⲉϫ ⲛⲓⲃⲉⲛ: Ⲡⲁⲟ︦ⲥ︦ ⲁ̀ⲣⲓⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲛ ⲛⲉⲙⲱⲟⲩ."]],
    english: [["Pray to the Lord on our behalf, our holy righteous father, Abba (...), the bishop (the metropolitan), that He may forgive us our sins.", "Pray to the Lord on our behalf, O our holy and righteous father, Abba (...) the Bishop (Metropolitan), that He may forgive us our sins."], ["The sick, O Lord, heal them; / those who have slept, repose them; / and all of our brothers in distress, / help us, my Lord, and all of them.", "The sick, O Lord, heal them; / those who slept repose them; / and all our brethren in distress, / help us, my Lord, and all of them."], ["May God bless us / and let us bless his Holy Name / and may His praise / be always on our mouths.", "May God bless us / and let us bless His holy name / and may His praise / be always on our lips."], ["Blessed is the Father and the Son / and the Holy Spirit / the Perfect Trinity / we worship Him and Glorify Him.", "Blessed be the Father and the Son and the Holy Spirit, the perfect Trinity. We worship Him and glorify Him."]],
    arabic: [["أطلب من الرب عنا، يا أبانا القديس البار، أنبا (...) الأسقف (المطران)، ليغفر لنا خطايانا.", "أطلب من الرب عنا، يا أبينا القديس البار، أنبا (...) الأسقف (المطران)، ليغفر لنا خطايانا."], ["يباركنا الله، ولنبارك اسمه القدوس، في كل حين تسبحته، دائمة في أفواهنا.", "ليباركنا الله، ولنبارك اسمه القدوس، في كل حين تسبحته، دائمة في افواهنا."], ["مبارك الآب والابن، والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Utlub min er-Rabb 'anna, ya abana el-qiddees el-barr, Anba (...) el-usquf (el-matran), li-yaghfir lana khatayana.", "Utlub min er-Rabb 'anna, ya abeena el-qiddees el-barr, Anba (...) el-usquf (el-matran), li-yaghfir lana khatayana."], ["Yubarikna Allah, wa li-nubarik ismahu el-quddous, fi kull heen tasbihatuhu, da'ima fi afwahina.", "Li-yubarikna Allah, wa li-nubarik ismahu el-quddous, fi kulli heen tasbihatuhu, da'ima fi afwahina."], ["Mubarak el-Ab wal-Ibn, war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduhu.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "annual-veneration-intercede": {
    arabic: [["إشفعي فينا كلنا يا سيدتنا والدة الإله مريم أم يسوع المسيح ليغفر لنا خطايانا.", "إشفعي فينا يا سيدتنا كلنا السيدة مريم والدة الإله أم يسوع المسيح، ليغفر لنا خطايانا ."]],
    englishArabic: [["Ishfa'i fina kullina ya sayyidatana walidat el-Ilah Maryam umm Yasou' el-Maseeh li-yaghfir lana khatayana.", "Ishfa'i feena ya sayyidatana kullina es-sayyida Maryam walidat el-Ilah umm Yasou' el-Maseeh, li-yaghfir lana khatayana."]],
  },
  "annual-veneration-morning-doxologies-st-mary": {
    english: [["You are the Mother of the Light, the honored Mother of God, you have carried, the Uncircumscript Logos.", "You are the Mother of Light, the honored Mother of God, you have carried, the uncircumcript Logos."], ["And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."]],
    arabic: [["ومن بعد أن ولدتِه، بقيتِ عذراء، نعظمكِ بتسابيح، وبركات.", "وبعد ما ولدتِه، بقيتِ عذراء، بتسابيح وبركات، نعظمكِ."], ["ونحن أيضاً، نطلب أن نفوز، برحمة بشفاعتك، لدى محب البشر.", "ونحن أيضاً نطلب، أن نفوز برحمةٍ، بشفاعاتِك، عند محب البشر."], ["أفضل من بخور، الشاروبيم، والسارافيم، يا مريم العذراء.", "أفضل من بخور، الشاروبيم، و السارافيم، يا مريم العذراء."], ["بشفاعات، والدة الإله القديسة مريم، يا رب أنعم لنا، بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Wa min ba'd an waladtihi, baqiti 'adhra', nu'azzimuki bi-tasabeeh, wa barakat.", "Wa ba'd ma waladtih, baqeeti 'adhra', bi-tasabeeh wa barakat, nu'azzimuki."], ["Wa nahnu aydan, natlub an nafouz, bi-rahma bi-shafa'atiki, lada muhibb el-bashar.", "Wa nahnu aydan natlub, an nafouz bi-rahma, bi-shafa'atiki, 'ind muhibb el-bashar."], ["Bi-shafa'at, walidat el-Ilah el-qiddisa Maryam, ya Rabb an'im lana, bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "annual-veneration-who-am-i": {
    english: [["(1/10) Who am I / the weakest of all those upon the earth / to speak of your honor / O Mary, the daughter of Joachim?", "(1/10) Who am I, who is weaker than all who are on the earth, to speak of your honor, O Mary, the daughter of Joachim?"]],
  },
  "annual-vesper-praises-friday-theotokia-part-2": {
    arabic: [["ليس من يُشبهك يا مريم العذراء الملائكة تكرمك والسارافيم تُمجدك.", "ليس من يُشبهِك، يا مريم العذراء، الملائكة تكرمِك، والسِّرافيم تُمجدِك."], ["+ لأن الذي على الشاروبيم أتى وتجسد منك حتى وحّدنا به من قبل صلاحه.", "+ لأن الذي على الشاروبيم، أتى وتجسد منكِ، حتى إتحدنا به، من قِبَل صلاحه."]],
    englishArabic: [["Laysa man yushbihuki ya Maryam el-'Adhra' el-mala'ika tukrimuki wes-Sarafim tumaggiduki.", "Laysa man yushbihuki, ya Maryam el-'Adhra', el-mala'ika tukrimuki, wes-Sarafeem tumaggiduki."], ["+ Li-anna alladhi 'ala esh-Sharoubim ata wa tagassad minki hatta wahhadana bihi min qibal salahihi.", "+ Li-anna alladhi 'ala esh-Sharoubeem, ata wa tagassad minki, hatta ittahadna bih, min qibal salahih."]],
  },
  "annual-vesper-praises-friday-theotokia-part-4": {
    english: [["You are the rational city, where the Most High One lived, who sits upon the throne, of the cherubim.", "You are the rational city, in where the Most High One lived, Who sits upon the throne, of the cherubim."]],
    arabic: [["+ والسارافيم يمجدونه حملته على ذراعيك المعطي طعاماً لكل ذي جسد من قبل رأفته.", "+ والسِّرافيم يمجدونه، حَملتِه على ذراعيكِ، المعطي طعاماً لكل ذي جسد، من قِبَل رأفته."]],
    englishArabic: [["+ Wes-Sarafim yumaggidounahu hamaltihi 'ala dhira'ayki el-mu'ti ta'aman li-kull dhi gasad min qibal ra'fatihi.", "+ Wes-Sarafeem yumaggidounah, hamaltihi 'ala dhira'ayki, el-mu'ti ta'aman li-kull dhi gasad, min qibal ra'fatih."]],
  },
  "annual-vesper-praises-friday-theotokia-part-7": {
    coptic: [["+ Ϯⲥⲱⲟⲩⲛ ⲅⲁⲣ ⲛ̀ϩ̀ⲗⲓ ⲁⲛ: ⲉ̀ⲃⲏⲗ ⲉ̀ϯⲥ̀ⲙⲏ ⲛ̀ⲧⲉ ⲡⲓⲁⲅⲅⲉⲗⲟⲥ: ⲉϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛⲏⲓ ⲛ̀ⲟⲩⲣⲁϣⲓ: ⲉϥⲛⲏⲟⲩ ⲛⲏⲓ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲧ̀ⲫⲉ.", "+ Ϯⲥⲱⲟⲩⲛ ⲅⲁⲣ ⲛ̀ϩ̀ⲗⲓ ⲁⲛ: ⲉ̀ⲃⲏⲗ ⲉ̀ⲧ̀ⲥ̀ⲙⲏ ⲛ̀ⲧⲉ ⲡⲓⲁⲅⲅⲉⲗⲟⲥ: ⲉϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛⲏⲓ ⲛ̀ⲟⲩⲣⲁϣⲓ: ⲉϥⲛⲏⲟⲩ ⲛⲏⲓ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲧ̀ⲫⲉ."]],
  },
  "annual-vesper-praises-friday-watos-lobsh": {
    coptic: [["+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛⲉⲣⲭⲟⲣⲉⲩⲓⲛ: ⲛⲉⲙ Ⲉⲗⲓⲥⲁⲃⲉⲧ ⲧⲉⲥⲥⲩⲅⲅⲉⲛⲏⲥ: ϫⲉ ⲧⲉⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲑⲟ ϧⲉⲛ ⲛⲓϩⲓⲟ̀ⲙⲓ: ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲡ̀ⲟⲩⲧⲁϩ ⲛ̀ⲧⲉ ⲧⲉⲛⲉϫⲓ.", "+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛⲉⲣⲭⲟⲣⲉⲩⲓⲛ: ⲛⲉⲙ Ⲉⲗⲓⲥⲁⲃⲉⲧ ⲧⲉⲥⲥⲩⲅⲅⲉⲛⲏⲥ: ϫⲉ ⲉⲧⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲑⲟ ϧⲉⲛ ⲛⲓϩⲓⲟ̀ⲙⲓ: ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲧⲉ ⲡ̀ⲟⲩⲧⲁϩ ⲛ̀ⲧⲉ ⲧⲉⲛⲉϫⲓ."]],
    arabic: [["أنت مضيئة أكثر من الشمس أنت هي ناحية المشرق التي ينتظرها الأبرار بفرح وتهليل.", "أنتِ مضيئة أكثر من الشمس، أنتِ هي ناحية المشرق، التي ينظرها الأبرار، بفرح وتهليل."], ["+ نسألك اذكرينا أيتها الشفيعة المؤتمنة أمام ربنا يسوع المسيح ليغفر لنا خطايانا.", "+ نسألكِ أن تذكرينا، أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا."]],
    englishArabic: [["Anti mudi'a akthar min esh-shams anti hiya nahiyat el-mashriq allati yantaziruha el-abrar bi-farah wa tahleel.", "Anti mudee'a akthar min esh-shams, anti hiya nahiyat el-mashriq, allati yanzuruha el-abrar, bi-farah wa tahleel."], ["+ Nas'aluki udhkurina ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana.", "+ Nas'aluki an tadhkureena ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana."]],
  },
  "annual-vesper-praises-monday-adam-lobsh": {
    english: [["Through Mary, the Mother of God, Adam was restored again, to his authority.", "Through Mary, the Theotokos, Adam was restored again, to his authority."]],
  },
  "annual-vesper-praises-monday-theotokia-part-1": {
    english: [["While Adam was sad, God was pleased, to bring him back, to his authority.", "While Adam was sad, the Lord was pleased, to restore him again, to his authority."]],
  },
  "annual-vesper-praises-monday-theotokia-part-3": {
    english: [["Jesus Christ the Word, who came and took flesh, He dwelt in us, and we saw His glory.", "Jesus Christ the Word, who came and took flesh, He dwelt among us, and we saw His glory."]],
  },
  "annual-vesper-praises-monday-theotokia-part-4": {
    english: [["Therefore Isaiah, the great prophet, cried out proclaiming, and saying.", "Therefore Isaiah, the great prophet, shouted out proclaiming, and saying."], ["The powerful God, of authority, and the Angel of, the great counsel.”", "He is God the powerful, and the Counselor, the angel of, the great wisdom."]],
    arabic: [["الإله القوي، المتسلط، وملاكُ المشورة، العُظمى.\"", "لإله القوي، المتسلط، وملاكُ المشورة، العُظمى."]],
    englishArabic: [["El-ilah el-qawi, el-mutasallit, wa malak el-mashoura, el-'uzma.", "Li-Ilah el-qawi, el-mutasallit, wa malak el-mashoura, el-'uzma."]],
  },
  "annual-vesper-praises-monday-theotokia-part-6": {
    english: [["+ But He is of one nature, one hypostasis, and one person, for God the Word.", "+ But He is one nature, one hypostasis, and one person, for God the Word."]],
    arabic: [["+ بل بطبيعة واحدة، وأُقنوم واحد، وشخص واحد، لله الكلمة.", "+ بل طبيعة واحدة، وأُقنوم واحد، وشخص واحد، لله الكلمة."]],
    englishArabic: [["+ Bal bi-tabee'a wahida, wa uqnoum wahid, wa shakhs wahid, lillah el-kalima.", "+ Bal tabee'a wahida, wa uqnoum wahid, wa shakhs wahid, lillah el-Kalima."]],
  },
  "annual-vesper-praises-monday-theotokia-part-7": {
    english: [["In order to bring Adam, the first man, who was made of dust, back to Paradise.", "In order to bring Adam, the first man, made of dust, back to Paradise."]],
  },
  "annual-vesper-praises-monday-theotokia-part-8": {
    english: [["+ Proclaiming and saying, “Glory to God in the highest, peace on earth, and goodwill toward men.”", "+ Proclaiming and saying, “Glory to God in the highest, on earth peace, and goodwill toward men.”"]],
  },
  "annual-vesper-praises-monday-theotokia-part-9": {
    english: [["+ So David the psalmist, and the holy one, rose up and took his, spiritual harp.", "+ So David the psalmist, and the saint, rose up and took, his spiritual stringed instrument."], ["He went to the church, the house of the angels, he praised and chanted to, the Holy Trinity.", "He went to the temple, the house of the angels, he praised and sang to, the Holy Trinity."], ["+ Saying “In Your light, O Lord we will see light, let Your mercy come, to those who know You.”", "+ Saying “In Your light, O Lord shall we see light, let Your mercy come, to those who know You.”"], ["O true Light, that shines upon, every man, that comes into the world.", "O True Light, that gives light, to every man, that comes into the world."], ["+ You have come into the world, through Your love for man, and all the creation, rejoiced at Your coming.", "+ You came into the world, through Your love for mankind, and all the creation rejoiced, at Your coming."], ["You have saved Adam, from the seduction, and delivered Eve, from the pangs of death.", "You have saved Adam, from deception, and delivered Eve, from the pangs of death."]],
    arabic: [["الله هو نور، وساكن في النور، تسبحه، ملائكة النور.", "الله هو نور، وساكن في النور، وتسبحه، ملائكة النور."]],
    englishArabic: [["Allah huwa nour, wa sakin fin-nour, tusabbihuhu, mala'ikat en-nour.", "Allah huwa nour, wa sakin fin-nour, wa tusabbihuhu, mala'ikat en-nour."]],
  },
  "annual-vesper-praises-saturday-theotokia-part-6": {
    english: [["Wherein are the tablets, of the covenant, and the golden vessel, where the manna hidden in it.", "Wherein are the tablets / of the covenant / and the golden vessel / where the manna was hidden. in it."]],
  },
  "annual-vesper-praises-saturday-watos-lobsh-2": {
    english: [["We exult you worthily, with Elizabeth your cousin: saying, “Blessed are you among women, and blessed is the fruit of your womb.”", "We exalt you worthily, with Elizabeth your cousin, saying Blessed are you among women, and blessed is the fruit of your womb."]],
    arabic: [["نُعظِّمُكِ بإستحقاقٍ، مع أليصابات نَسيبَتكِ قائلين، \"مُباركةٌ أنتِ في النساء، ومُباركةٌ هي ثمرة بطنكِ.\"", "نُعظِّمُكِ باستحقاق مع أليصابات نسيبتك، مباركة أنت في النساء ومباركة هي ثمرة بطنك."]],
    englishArabic: [["Nu'azzimuki bi-istihqaq, ma'a Aleesabat naseebatiki qa'ileen, \"Mubaraka anti fin-nisa', wa mubaraka hiya thamarat batniki.\"", "Nu'azzimuki bi-istihqaq ma'a Aleesabat naseebatiki Mubaraka anti fin-nisa' wa mubaraka hiya thamarat batniki."]],
  },
  "annual-vesper-praises-sunday-adam-theotokias-conclusion": {
    english: [["Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.", "Your mercies O my God: are countless: and exceedingly plenteous: are Your compassions."], ["And me too, the sinner, teach me O my Master, to offer repentance.", "And I too: the sinner: teach me O my Lord: to offer repentance."], ["For You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.", "For You do not desire: the death of a sinner: but rather that he return: and that his soul may live."], ["For You are good, and merciful, let Your compassion, speedily come to us.", "For You are good: and merciful: let Your compassions: speedily come to us."], ["O King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.", "O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins."], ["Disperse the enemies, of the Church, and fortify her that she, may not be shaken forever.", "Disperse the enemies, of the Church, and fortify her, that she may never be shaken. forever."]],
  },
  "annual-vesper-praises-thursday-theotokia-part-2": {
    english: [["+ We have become worthy to have, the Tree of Life to eat from, which is the Body of God, and His true Blood.", "+ We deserved the Tree of Life: to eat from It: It is the body of God: and His true blood."], ["Let us worship our Savior, the Good Lover of Mankind, for He had compassion upon us, He came and saved us.", "Let us worship our Savior, the good Lover of Mankind, for He had compassion on us, He has come and saved us."]],
  },
  "annual-vesper-praises-thursday-theotokia-part-3": {
    english: [["+ The one and only Word, begotten before all ages, as the divinity without body, from His Father only.", "+ The one and only Word, begotten before all ages, as the divinity without body, from His Father alone."], ["+ And also after she gave birth to Him, she remained a virgin, and thus He has shown, that she is the Mother of God.", "+ And also after she gave birth to Him, she remained a virgin, and thus He has shown, that she is the Theotokos."], ["+ It became the source of immortality, she gave birth to Immanuel, without the seed of man, to revoke the corruption of our race.", "+ It became the source of immortality, she gave birth to Emmanuel for us, without the seed of man, to revoke the corruption of our race."], ["Let us proclaim and say unto Him, glory be to the Incomprehensible One, the Good Lover of Mankind the Savior of our souls, He came and saved us.", "Let us proclaim and say to Him, glory to You O Incomprehensible One, the Good Lover of Mankind the Savior of our souls, Who came and saved us.”"]],
  },
  "annual-vesper-praises-thursday-theotokia-part-7": {
    english: [["This is He Whom is worthy of glory, with His Good Father, and the Holy Spirit, both now and forever.", "This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."]],
    arabic: [["+ يا لهذه الاتفاقات، التي لأولئك الأنبياء، الذين تنبأوا بهذا الروح الواحد، من أجل مجيء المسيح.", "+ يا لهذه الإتفاقات، الذي لأولئك الأنبياء، الذين تنبأوا بهذا الروح الواحد، من أجل مجيئ المسيح."], ["هذا الذي ينبغي له المجد، مع أبيه الصالح، والروح القدس، منذ الآن وإلى الأبد.", "هذا الذي ينبغي له المجد، مع أبيه الصالح، والروح القدس، من الآن وإلى الأبد."]],
    englishArabic: [["Hadha elladhi yanbaghi lahu el-magd, ma'a abeehi es-salih, war-Rouh el-Qudus, mundh el-an wa ila el-abad.", "Hadha alladhi yanbaghi lahu el-magd, ma'a abeehi es-salih war-Rouh el-Qudus, min el-an wa ila el-abad."]],
  },
  "annual-vesper-praises-thursday-watos-lobsh": {
    english: [["This is a symbol of Mary, the undefiled virgin, from whom the Logos of the Father, came and took flesh.", "This is a symbol of Mary, the undefiled Virgin, which the Word of the Father, came and took flesh from her."]],
    arabic: [["هي مثال لمريم، العذراء غير الدنسة، التي تجسد منها، كلمة الآب.", "هي مثال مريم، العذراء غير الدنسة، التي أتى وتجسد منها، كلمة الآب."]],
    englishArabic: [["Hiya mithal li-Maryam el-'Adhra' ghayr ed-danisa allati tagassad minha kalimat el-Ab.", "Hiya mithal Maryam, el-'Adhra' ghayr ed-danisa, allati ata wa tagassad minha, Kalimat el-Ab."]],
  },
  "annual-vesper-praises-tuesday-adam-lobsh": {
    english: [["By what means can we bless you, for you were exalted, above all the highest, and rational natures.", "By what means can we bless you, for you were exalted above, all the highest, the more rational natures."], ["+ Your name is remembered, throughout all ages, O beautiful dove, the Mother of Christ.", "+ Your name shall be remembered, throughout all ages, O beautiful dove, and Mother of Christ."], ["Rejoice O Mary, the handmaiden and mother, for He who is on your lap, the angels praise.", "Rejoice, O Mary, handmaiden and mother, for the angels praise Him who is in your arms,"], ["+ And the cherubim, worship Him befittingly, and the seraphim, without ceasing.", "+ and the cherubim worthily worship Him; the seraphim too, without ceasing."]],
    arabic: [["+ يُذكر اسمك في كل الأجيال أيتها الحمامة الحسناء وأم المسيح.", "+ يُذكر إسمِك، في كل الأجيال، أيتها الحمامة الحسنة، وأُم المسيح."], ["افرحي يا مريم العبدة والأم لأن الذي في حجرك تسبحه الملائكة.", "إفرحي يا مريم، العبدة والأم، لأن الذي في حجرك، الملائكة تسبحه. الملائكة."], ["+ والشاروبيم تسجد له باستحقاق والسارافيم بغير فتور.", "+ والشاروبيم، يسجدون له بإستحقاق، والسِّرافيم، بغير فتور."]],
    englishArabic: [["+ Yudhkar ismuki fi kull el-agyal ayyatuha el-hamama el-hasna' wa umm el-Maseeh.", "+ Yudhkar ismuki, fi kull el-agyal, ayyatuha el-hamama el-hasana, wa umm el-Maseeh."], ["Ifrahi ya Maryam el-'abda wal-umm li-anna alladhi fi hugriki tusabbihuhu el-mala'ika.", "Ifrahi ya Maryam el-'abda wal-umm li-anna alladhi fi hugriki el-mala'ika tusabbihuhu. el-mala'ika."], ["+ Wesh-Sharoubim tasgud lahu bi-istihqaq wes-Sarafim bi-ghayr futour.", "+ Wesh-Sharoubeem, yasgudoun lahu bi-istihqaq, wes-Sarafeem, bi-ghayr futour."]],
  },
  "annual-vesper-praises-tuesday-theotokia-part-1": {
    english: [["+ Who for us gave birth to, God the Word, who became man, for our salvation.", "+ Who for us gave birth, to God the Logos, Who became man, for our salvation."], ["And after He became man, He is also God, therefore she gave birth to Him, while a virgin.", "And after He became man, He remained God, wherefore she gave birth to Him, while a virgin."]],
    arabic: [["+ عالية هي الأُعجوبة، التي لحبلها، وولادتها أيضاً، لا يُنطق به.", "+ عالية هي الأُعجوبة، التي لحبلها، وولادتها أيضاً، لا يُنطق بها."]],
    englishArabic: [["+ 'Aliya hiya el-u'gouba, allati li-hablaha, wa wiladatuha aydan, la yuntaq bih.", "+ 'Aliya hiya el-u'gouba, allati li-hablaha, wa wiladatiha aydan, la yuntaq biha."]],
  },
  "annual-vesper-praises-tuesday-theotokia-part-2": {
    english: [["You have found grace, and the Lord is with you, you are the ladder, which Jacob saw.", "You have found grace, and the Lord is with you, you are the ladder, that Jacob saw."], ["You are the tree, which Moses has seen, flaming with fire, and was not consumed.", "You are the bush, which Moses has seen, flaming with fire, and was not consumed."], ["+ This is the Son of God, who dwelt in your womb, the fire of His divinity, did not burn your body.", "+ This is the Son of God, who dwelt in your womb, the fire of His divinity, did not consume your body."]],
    arabic: [["وجدتِ نعمة، الربُّ مَعَكِ، أنتِ هي السلم، التي رآها يعقوب.", "وجدتِ نعمة، الربُّ مَعَكِ، أنتِ هي السلم، الذي رآه يعقوب."]],
    englishArabic: [["Wagadti ni'ma, er-Rabbu ma'aki, anti hiya es-sullam, allati ra'aha Ya'qoub.", "Wagadti ni'ma, er-Rabbu ma'aki, anti hiya es-sullam, alladhi ra'ahu Ya'qoub."]],
  },
  "annual-vesper-praises-tuesday-theotokia-part-3": {
    english: [["Hail to the saint, the Mother of all the living, you are the one we pray to, intercede for us.", "Hail to the Saint, the mother of all the living, you are the one we entreat to, intercede for us."]],
  },
  "annual-vesper-praises-tuesday-theotokia-part-4": {
    english: [["+ Because of the greatness, of the wonderful, Maker of all, good things.", "+ Because of the greatness, of that wonderful, Maker of, all good things."], ["+ He covered the peak, of the mountain, with smoke and darkness, mist and storms.", "+ He covered the peak, of the mountain, with smoke darkness and mist, and with storms."], ["+ Co-essential with us, and perfect, and also has, a rational soul.", "+ Coessential with us, and perfect, and also has, a rational soul."], ["And to make him, a citizen of heaven, and restore his leadership, according to His great mercy.", "And to make him a citizen, of heaven, and restore his authority, according to His great mercy."]],
  },
  "annual-vesper-praises-tuesday-theotokia-part-5": {
    english: [["+ For this is the Rock, which Daniel saw, which was cut, from a mountain.", "+ For this is the Stone, which Daniel saw, which was cut, from a mountain."]],
  },
  "annual-vesper-praises-tuesday-theotokia-part-6": {
    english: [["+ For you gave birth for us, God the Word, our Savior Jesus, He came and saved us.", "+ For us you gave birth to, God the Word, our Savior Jesus, He came and saved us."]],
  },
  "annual-vesper-praises-tuesday-theotokia-part-7": {
    english: [["+ You are the Mother of light, the honored Mother of God, you have carried, the infinite Logos.", "+ You are the Mother of Light, the honored Mother of God, you have carried, the uncircumcript Logos."]],
    arabic: [["ومن بعد أن ولدتِه، بقيتِ عذراء، نعظمكِ بتسابيح، وبركات.", "وبعد ما ولدتِه، بقيتِ عذراء، بتسابيح وبركات، نعظمكِ."]],
    englishArabic: [["Wa min ba'd an waladtihi, baqeeti 'adhra', nu'azzimuki bi-tasabeeh, wa barakat.", "Wa ba'd ma waladtih, baqeeti 'adhra', bi-tasabeeh wa barakat, nu'azzimuki."]],
  },
  "annual-vesper-praises-wednesday-theotokia-part-2": {
    english: [["+ Every generation calls you blessed, and we also worship Him, to whom you gave birth, and we exalt Him.", "+ Every generation calls you blessed, and also worship Him, to whom you gave birth, and we exalt Him."]],
  },
  "annual-vesper-praises-wednesday-theotokia-part-3": {
    english: [["+ For you have given birth, to the true Word, the Son of the ever-existing Father, who came and redeemed us from our sins.", "+ For you bore the True Word, / the Son of the eternal Father, / who came and saved us / from our sins."]],
    arabic: [["+ أنتِ هي السحابة الخفيفة التي دلتنا على مطر استعلان الإله الإبن الوحيد.", "+ أنتِ هي السحابة الخفيفة، التي دلتنا على، مطر إستعلان، الإله الوحيد."]],
    englishArabic: [["+ Anti hiya es-sahaba el-khafifa allati dallatna 'ala matar isti'lan el-Ilah el-Ibn el-wahid.", "+ Anti hiya es-sahaba el-khafifa allati dallatna 'ala matar isti'lan el-Ilah el-wahid."]],
  },
  "annual-vesper-praises-wednesday-theotokia-part-4": {
    coptic: [["Ⲁⲕⲉⲣⲥⲩⲙⲉⲛⲓⲛ ⲛⲁⲛ ⲙ̀ⲡⲓϫ̀ⲫⲟ: ⲛ̀ⲧⲉ Ⲫϯ ⲉ̀ⲧⲁϥⲓ̀ ϣⲁⲣⲟⲛ: ⲁⲕϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲙ̀Ⲙⲁⲣⲓⲁ: ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲛ̀ⲁⲧⲑⲱⲗⲉⲃ.", "Ⲁⲕⲉⲣⲥⲩⲙⲙⲉⲛⲓⲛ ⲛⲁⲛ ⲙ̀ⲡⲓϫ̀ⲫⲟ: ⲛ̀ⲧⲉ Ⲫϯ ⲉ̀ⲧⲁϥⲓ̀ ϣⲁⲣⲟⲛ: ⲁⲕϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲙ̀Ⲙⲁⲣⲓⲁ: ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲛ̀ⲁⲧⲑⲱⲗⲉⲃ."]],
    arabic: [["+ عظيمة هي الكرامة التي استحققتها ياغبريال الملاك المبشر ووجهك يتلألأ فرحاً.", "+ عظيمة هي الكرامة، التي إستحققتها يا غبريال، الملاك المبشر، ووجهك يتلألأ فرحاً."], ["أعلمت لنا ميلاد الله الذي أتى إلينا وبشرت مريم العذراء غير الدنسة.", "أعلنت لنا ميلاد، الله الذي أتى إلينا، وبشرتَ مريم العذراء، غير الدنسة."]],
    englishArabic: [["A'lamta lana milad Allah alladhi ata ilayna wa bashsharta Maryam el-'Adhra' ghayr ed-danisa.", "A'lanta lana milad Allah alladhi ata ilayna, wa bashsharta Maryam el-'Adhra' ghayr ed-danisa."]],
  },
  "annual-vesper-praises-wednesday-watos-lobsh": {
    coptic: [["Ⲧⲉⲥ̀ⲙⲁⲙⲁⲁⲧ ⲧⲉϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲱ̀ ⲑⲏⲉ̀ⲧⲁⲥϫⲉⲙ ⲭⲁⲣⲓⲥⲙⲁ ⲛⲓⲃⲉⲛ: ⲙ̀ⲡⲉⲙ̀ⲑⲟ ⲙ̀ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟⲩ: ⲡⲉⲛⲁ̀ⲗⲏⲑⲓⲛⲟⲥ ⲛ̀ⲛⲟⲩϯ.", "Ⲧⲉⲥ̀ⲙⲁⲙⲁⲁⲧ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲱ̀ ⲑⲏⲉ̀ⲧⲁⲥϫⲉⲙ ⲭⲁⲣⲓⲥⲙⲁ ⲛⲓⲃⲉⲛ: ⲙ̀ⲡⲉⲙ̀ⲑⲟ ⲙ̀ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟⲩ: ⲡⲉⲛⲁ̀ⲗⲏⲑⲓⲛⲟⲥ ⲛ̀ⲛⲟⲩϯ."]],
    english: [["+ And no one else entered it, but the Lord of Powers, He entered and went out, and the gate remained sealed.\"", "+ And no one entered through it, but the Lord of Powers, He entered and went out, and the gate remained sealed.”"], ["+ Blessed is the fruit of your womb, O you who gave birth to God for the world, so as to redeem us from the hands, of the unmerciful tyrant.", "+ Blessed is the fruit of your womb, O who gave birth to God for the world, so as to redeem us from the hands, of the unmerciful tyrant."], ["Blessed and perfect are you, O you who have found all grace, before the King of glory, our True Lord.", "Blessed and perfect are you, O who has found all grace, before the King of Glory, our True Lord."], ["And He walked among men, as a caring Lover of Mankind, until He saved our souls, through His holy appearance.", "And He walked among men, as a compassionate Lover of Mankind, until He saved our souls, through His holy appearance."], ["+ Let us worship our Savior, the Good Lover of Mankind, for He had compassion upon us, as He came and saved us.", "+ Let us worship our Savior, the good Lover of Mankind, for He had compassion on us, He has come and saved us."], ["Hail to you, O Virgin, the right and true Queen. Hail to the pride of our race, who bore to us Immanuel.", "Hail to you O Virgin / the right and true Queen. / Hail to the pride of our race / who bore to us Emmanuel."]],
    arabic: [["+ إستحقيتِ كل كرامة أكثر من كل من على الأرض لأن كلمة الآب أتى وتجسد منكِ.", "+ إستحققتِ كل كرامة، أكثر من كل مَنْ على الأرض، لأن كلمة الآب، أتى وتجسد منكِ."], ["+ نسألك اذكرينا أيتها الشفيعة المؤتمنة أمام ربنا يسوع المسيح ليغفر لنا خطايانا.", "+ نسألكِ أن تذكرينا، أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا."]],
    englishArabic: [["+ Istahaqqeiti kull karama akthar min kull man 'ala el-ard li-anna kalimat el-Ab ata wa tagassad minki.", "+ Istahaqqti kull karama, akthar min kull man 'ala el-ard, li-anna Kalimat el-Ab, ata wa tagassad minki."], ["+ Nas'aluki udhkurina ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana.", "+ Nas'aluki an tadhkureena ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana."]],
  },
  "annual-vesper-praises-wednesday-watos-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto the ages of the ages, Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والابن. والروح القدس. الآن وكل أوان. والى دهر الداهرين آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rooh el-Qudus, el-an wa kulla awan, wa ila dahr ed-dahireen ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "annual-vesper-praises-wednesday-watos-theotokia-conclusion": {
    arabic: [["مُبارَك الآب والإبن، والرُّوح القُدُس، الثالوث الكامل، نسجد له ونُمجِّدهُ.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarak el-Ab wal-Ibn, war-Rooh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "annual-vespers-concluding-hymn": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen.", "Lord have mercy. Lord have mercy. Lord bless. Amen."], ["We proclaim and say, O our Lord Jesus Christ, who was born in Bethlehem, according to the prophetic sayings. Save us and have mercy on us.", "We proclaim and say: “O our Lord Jesus Christ, who was born in Bethlehem, according to the prophetic voices.\" Save us and have mercy on us."]],
    arabic: [["نصرخ قائلين: يا ربنا يسوع المسيح بارك مياه النهر، ولتكن رحمتُكَ وسلامُكَ حصناً لشعبِك، خلصنا وارحَمنا.", "نصرخ قائلين : يا ربنا يسوع المسيح بارك مياه النهر، لتكن رحمتُكَ وسلامُكَ حصناً لشعبِك خلصنا وارحَمنا."]],
    englishArabic: [["Nasrukh qaa-ileen: ya rabbana Yasoo el-Maseeh, barik miyaah en-nahr, wal-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna.", "Nasrukh qa'ileen: ya Rabbana Yasou' el-Maseeh, barik miyah en-nahr, li-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna."]],
  },
  "annual-vespers-doxology-apostles": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛⲉⲙ ⲡⲓϣ̀ⲃⲉⲥ̀ⲛⲁⲩ ⲙ̀ⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛⲉⲙ ⲡⲓϣ̀ⲃⲉⲥ̀ⲛⲁⲩ ⲙ̀ⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Also Philip and Matthew, Bartholomew and Thomas: James the Son of Alphaeus: and Simon the Canaanite", "Philip and Matthew, Bartholomew and Thomas, James the Son of Alphaeus, and Simon the Canaanite."], ["Matthias, who was chosen, in place of Judas: all of them and the rest: followed the Master", "Matthias was chosen, instead of Judas, and was counted with the rest, who followed the Master."], ["Their voice went forth, upon the face of the whole earth: and their words have reached: the ends of the world", "Their voices went forth, onto the face of the whole earth, and their words have reached, the ends of the world."], ["Pray to the Lord on our behalf, my lords and fathers the apostles: and the seventy-two disciples: that He may forgive us our sins", "Pray to the Lord on our behalf, O my lords and fathers the Apostles, and the seventy two disciples, that He may forgive us our sins."]],
  },
  "annual-vespers-doxology-archangel-michael": {
    coptic: [["Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ: Ⲙⲓⲭⲁⲏⲗ ⲡⲓⲁ̀ⲣⲭⲱⲛ ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟⲩⲓ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲉⲑⲟⲩⲁⲃ: Ⲙⲓⲭⲁⲏⲗ ⲡⲓⲁ̀ⲣⲭⲱⲛ ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟⲩⲓ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Intercede on our behalf: O holy archangel: Michael the head of heavenly: that He may forgive us our sins.", "Intercede on our behalf: O holy archangel: Michael the head of the heavenly: that He may forgive us our sins."]],
    arabic: [["اشفع فينا أمام الرب: يا رئيس الملائكة الطاهر ميخائيل رئيس السمائيين: ليغفر لنا خطايانا.", "اشفع فينا يارئيس الملائكة الطاهر ميخائيل رئيس السمائيين ليغفر لنا خطايانا."]],
    englishArabic: [["Ishfa' feena amam er-Rabb: ya ra'is el-mala'ika et-tahir: Mikhail ra'is es-samma'iyyin: li-yaghfir lana khatayana.", "Ishfa' feena ya ra'ees el-mala'ika et-tahir Mikha'eel ra'ees es-sama'iyyeen li-yaghfir lana khatayana."]],
  },
  "annual-vespers-doxology-conclusion": {
    coptic: [["Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
  },
  "annual-vespers-doxology-heavenly-beings": {
    coptic: [["Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲥ̀ⲧⲣⲁⲧⲓⲁ ⲛ̀ⲁⲅⲅⲉⲗⲓⲕⲟⲛ: ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲥ̀ⲧⲣⲁⲧⲓⲁ ⲛ̀ⲁⲅⲅⲉⲗⲓⲕⲟⲛ: ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Intercede on our behalf, O angelic armies: and heavenly orders: that He may forgive us our sins", "Intercede on our behalf, O angelic hosts, and all the heavenly multitudes, that He may forgive us our sins."]],
  },
  "annual-vespers-doxology-philopater-mercurius": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Hail to you O martyr: hail to the noble hero: hail to the struggle-bearer: Philopater Mercurius", "Hail to you O martyr: hail to the courageous hero: hail to the struggle bearer: Philopater Mercurius."]],
  },
  "annual-vespers-doxology-pope-kyrillos-vi": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Pray to the Lord on our behalf: our holy father the patriarch: Abba Kyrillos the sixth: that He may forgive us our sins", "Pray to the Lord on our behalf: our holy father the patriarch: Papa Abba Kyrillos the Sixth: that He may forgive us our sins."]],
  },
  "annual-vespers-doxology-st-mark": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    arabic: [["اطلب من الرب عنا: يا ناظر الإله الإنجيلي: مرقس الرسول: ليغفر لنا خطايانا", "اطلب من الرب عنا ياناظر الإله الإنجيلي مرقس الرسول ليغفر لنا خطايانا."]],
  },
  "annual-vespers-doxology-st-mark-2": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲑⲉⲱⲣⲓⲙⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ: Ⲁⲃⲃⲁ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    arabic: [["أُطلب من الرب عنا: يا ناظر الإله الإنجيلي: مرقس الرسول: ليغفر لنا خطايانا", "اطلب من الرب عنا ياناظر الإله الإنجيلي مرقس الرسول ليغفر لنا خطايانا."]],
  },
  "annual-vespers-doxology-virgin-mary": {
    english: [["Solomon has called her, in the Song of Songs, \"My sister and my spouse, my true city Jerusalem.\"", "Solomon called you, in the Song of Songs saying, “My sister and my friend, my true city Jerusalem.”"]],
  },
  "annual-vespers-gospel-response": {
    english: [["Intercede on our behalf, O the Lady of us all the Theotokos, Mary the Mother of our Savior, that He may forgive us our sins.", "Intercede on our behalf, O Lady of us all, the Theotokos, Mary, the mother of our Savior, that He may forgive us our sins."]],
    arabic: [["إشفعي فينا أمام الرب، يا سيدتنا كلنا السيدة والدة الإله، مريم أم مخلصنا، ليغفر لنا خطايانا.", "أشفعي فينا يا سيدتَنا كلِنا، السيدة والدة الإله مريم أم مخلصنا، ليغفرَ لنا خطايانا."]],
    englishArabic: [["Ishfa'i fina amam er-Rabb, ya sayyidatana kullina es-sayyida walidat el-Ilah, Maryam umm mukhallisina, li-yaghfir lana khatayana.", "Ishfa'i feena ya sayyidatana kullina, es-sayyida walidat el-Ilah Maryam umm mukhallisina, li-yaghfir lana khatayana."]],
  },
  "annual-vespers-intro-doxologies": {
    coptic: [["Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϩⲣⲉⲛ Ⲡⲭ̅ⲥ̅: ⲫⲏⲉⲧⲁⲣⲉϫ̀ⲫⲟϥ: ϩⲟⲡⲱⲥ ⲛ̀ⲧⲉϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.", "Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϩⲣⲉⲛ Ⲡⲭ̅ⲥ̅: ⲫⲏⲉⲧⲁⲣⲉϫ̀ⲫⲟϥ: ϩⲟⲡⲱⲥ ⲛ̀ⲧⲉϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ."], ["Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["O Virgin Mary, the holy Theotokos, the faithful advocate for all mankind.", "O Virgin Mary, the holy Theotokos, the trusted advocate, of the human race."], ["Intercede on our behalf before Christ whom you bore, that He may grant us the forgiveness of our sins.", "Intercede on our behalf, before Christ whom you have born, that He may grant unto us, the forgiveness of our sins."], ["We ask you to remember us, O our faithful advocate, before our Lord Jesus Christ, that He may forgive us our sins.", "We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["أيتها العذراء مريم، والدة الاله القديسة، الشفيعة الأمينة لجنس البشر.", "أيتها العذراء مريم، والده الإله القديسة، الشفيعة الأمينة، التي لجنس البشر."], ["اشفعى فينا أمام المسيح الذى ولدته، لكى ينعم لنا بمغفرة خطايانا.", "إشفعي فينا، أمام المسيح الذي ولدتِه، لكي ينعم علينا، بمغفرة خطايانا."], ["نسألك أن تذكرينا أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا.", "نَسْألُكِ اذْكرينا أيَّتُها الشَّفيعَةُ المؤْتَمَنةُ أَمامَ ربِّنا يَسوعِ المسيحِ ليغْفِرَ لَنا خَطايانا."]],
    englishArabic: [["Ayyatuha el-'azra Maryam, walidat el-ilah el-qiddisa, esh-shafee'a el-ameena li-gins el-bashar.", "Ayyatuha el-'Adhra' Maryam, walidat el-Ilah el-qiddeesa, esh-shafee'a el-ameena, allati li-gins el-bashar."], ["Ishfa'i feena amam el-Maseeh el-lazi waladtihi, li-kay yan'ama lana bi-maghfirat khataya-na.", "Ishfa'i feena amam el-Maseeh el-lazi waladtihi li-kay yan'ama 'alayna bi-maghfirat khataya-na."], ["Nas'aluki an tazkoreena ayyatuha esh-shafee'a el-mu'tamana, amam Rabbina Yasou' el-Maseeh, li-yaghfira lana khataya-na.", "Nas'aluki udhkurina ayyatuha esh-shafee'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfira lana khataya-na."]],
  },
  "annual-vespers-verse-of-cymbals": {
    coptic: [["Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϧⲉⲛ ⲟⲩⲭⲉⲣⲉ ⲉϥⲟⲩⲁⲃ: ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲑⲙⲁⲩ ⲙ̀Ⲫⲛⲉⲑⲟⲩⲁⲃ.", "Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϧⲉⲛ ⲟⲩⲭⲉⲣⲉ ⲉϥⲟⲩⲁⲃ: ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ⲑⲙⲁⲩ ⲙ̀ⲫⲏⲉⲑⲟⲩⲁⲃ."], ["Ⲭⲉⲣⲉ Ⲙⲓⲭⲁⲏⲗ: ⲡⲓⲛⲓϣϯ ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ: ⲭⲉⲣⲉ Ⲅⲁⲃⲣⲓⲏⲗ: ⲡⲓⲥⲟⲧⲡ ⲙ̀ⲡⲓⲣⲉϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ.", "Ⲭⲉⲣⲉ Ⲙⲓⲭⲁⲏⲗ: ⲡⲓⲛⲓϣϯ ⲛ̀ⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ: ⲭⲉⲣⲉ Ⲅⲁⲃⲣⲓⲏⲗ: ⲡⲓⲥⲟⲧⲡ ⲙ̀ⲡⲓϥⲁⲓϣⲉⲛⲛⲟⲩϥⲓ."], ["Ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲫⲛⲉⲑⲟⲩⲁⲃ: ⲡⲓⲙⲉⲛⲣⲓⲧ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅: ⲡⲉⲛⲓⲱⲧ Ⲡⲓϣⲱⲓ ⲕⲁⲙⲉⲗ: ⲡⲓϩⲏⲅⲟⲩⲙⲉⲛⲟⲥ.", "Ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲫⲏⲉⲑⲟⲩⲁⲃ: ⲡⲓⲙⲉⲛⲣⲓⲧ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅: ⲡⲉⲛⲓⲱⲧ Ⲡⲓϣⲱⲓ ⲕⲁⲙⲉⲗ: ⲡⲓϩⲏⲅⲟⲩⲙⲉⲛⲟⲥ."]],
  },
  "apostles-liturgy-for-truly": {
    english: [["Pray to the Lord on our behalf, my masters the fathers the Apostles, and the rest of the Disciples, that He may forgive us our sins.", "Pray to the Lord on our behalf: O my lords and fathers the apostles: and the rest of the disciples: that He may forgive us our sins."]],
  },
  "apostles-midnight-watos-psali-for-the-apostles-fast": {
    english: [["And Philip and Matthew: Bartholomew and Thomas: James the son of Alphaeus: and Simon the Canaanite.", "Philip and Matthew, Bartholomew and Thomas, James the Son of Alphaeus, and Simon the Canaanite."]],
    arabic: [["وأيضاً فيلبس ومتَّى، برثولماوس وتوما، ويعقوب بن حلفى، وسمعان القانوي.", "وفيلبس ومتي، وبرثلماوس وتوما، ويعقوب بن حلفي، وسمعان القانوي."], ["ومتياس الذي صار، عِوض عن يهوذا، وكامل البقية، الذين تبعوا السيد.", "متياس الذي صار، عِوضاً عن يهوذا، وكامل وبقية التلاميذ، الذين تبعوا السيد."]],
    englishArabic: [["Wa aydan Filbus wa Matta, Barthoulomawus wa Touma, wa Ya'qoub ibn Halfa, wa Sim'an el-Qanawi.", "Wa Filbus wa Matta, wa Barthoulomawus wa Touma, wa Ya'qoub ibn Halfa, wa Sim'an el-Qanawi."], ["Wa Matyas elladhi sar, 'iwadan 'an Yahouza, wa kamil el-baqiyya, elladheena tabi'ou es-sayyid.", "Matyas alladhi sar 'iwadan 'an Yahouza, wa kamil wa baqiyyat et-talameedh, alladheena tabi'ou es-sayyid."]],
  },
  "cross-liturgy-gospel-response": {
    arabic: [["من قِبَل صليبه، و قيامته المقدسة، رد الانسان مرة أخرى، الي الفردوس.", "من قِبَل صليبه، وقيامته المقدسة، رد الإنسان مرة أُخرى، إلى الفردوس."]],
  },
  "cross-liturgy-hymn-of-king-constantine": {
    coptic: [["Ⲉⲧⲁⲩⲉ̀ⲛ ⲛⲓⲥ̀ϧⲁⲓ ⲛ̀ϩⲓⲣⲏⲛⲓⲕⲟⲛ ⲛ̀ⲧⲉ Ⲕⲱⲥⲧⲁⲛⲧⲓⲛⲟⲥ ⲉ̀ϧⲟⲩⲛ ⲉⲢⲁⲕⲟϯ ϫⲉ ⲙⲁϣ̀ⲑⲁⲙ ⲙ̀ⲫ̀ⲣⲟ ⲛ̀ⲛⲓⲉⲣⲫⲏⲟⲩⲓ̀ ⲁ̀ⲱⲟⲩⲛ ⲙ̀ⲫ̀ⲣⲟ ⲛ̀ⲛⲓⲉⲕⲕ̀ⲗⲏⲥⲓⲁ̀.", "Ⲉⲧⲁⲩⲉ̀ⲛ ⲛⲓⲥ̀ϧⲁⲓ ⲛ̀ϩⲓⲣⲏⲛⲓⲕⲟⲛ ⲛ̀ⲧⲉ Ⲕⲱⲥⲧⲁⲛⲧⲓⲛⲟⲥ ⲉ̀ϧⲟⲩⲛ ⲉⲢⲁⲕⲟϯ ϫⲉ ⲙⲁϣ̀ⲑⲁⲙ ⲙ̀ⲫ̀ⲣⲟ ⲛ̀ⲛⲓⲉⲣⲫⲏⲟⲩⲓ̀ ⲁⲟⲩⲱⲛ ⲙ̀ⲫ̀ⲣⲟ ⲛ̀ⲛⲓⲉⲕⲕ̀ⲗⲏⲥⲓⲁ̀."]],
    english: [["When Constantine's peaceful writings reached Alexandria saying, \"Shut the gates of the heathen and open the gates of the Churches\".", "When the letters of peace, from Constantine arrived in Alexandria saying, \"Shut the doors of the temples, and open the doors of the churches.\""], ["The bishops heard and were joyful, the priests rejoiced, and the seven ranks of the Church glorified the God of heaven.", "The bishops heard and rejoiced, the priests were glad, and the seven ranks of the Church glorified the God of heaven."]],
  },
  "cross-liturgy-praxis-response": {
    english: [["Hail to the Cross, which my Lord was crucified upon, in order to save us, from our sins.", "Hail to the Cross, upon which my Lord was crucified, in order to deliver us, from our sins."]],
  },
  "cross-matins-doxology": {
    english: [["+ We praise and glorify Him, and exalt Him above all, as a good One and Lover of man, have mercy upon us according to Your great mercy.", "+ We praise and glorify Him, / and exceedingly exalt Him, / as the Good One and Lover of Mankind. / Have mercy on us according to Your great mercy."]],
  },
  "cross-matins-main-sanctuary": {
    english: [["The four Incorporeal Beasts, carrying the throne of God, a face of lion a face of a calf, a face of human and a face of an angel.", "The four incorporeal creatures: carry the throne of God: a face of lion and a face of a ram: a face of a man and a face of an angel."]],
    arabic: [["الأربعة الحيوانات غير المتجسدين، الحاملون مركبة الله، وجه أسد ووجه عجل، ووجه إنسان ووجه نسر.", "الأربعة الحيوانات غير المتجسدين، الحاملين مركبة الله، وجه أسد ووجه ثور، ووجه إنسان ووجه نسر."]],
    englishArabic: [["El-arba'at hayawanat ghayr el-mutagassideen, el-hamiloun markabat Allah, wagh asad wa wagh 'igl, wa wagh insan wa wagh nasr.", "El-arba'at el-hayawanat ghayr el-mutagassideen, el-hamileen markabat Allah, wagh asad wa wagh thawr, wa wagh insan wa wagh nasr."]],
  },
  "cross-matins-northern-door": {
    english: [["And when You come again, in Your fearful appearance, may we never hear You say, \"I do not know you.\"", "And in Your awesome/ Second Coming may we never / hear with trembling / “I do not know you.”"]],
  },
  "cross-matins-refrain": {
    english: [["Through His crucifixion, and holy Resurrection, He restored man once more, to the Paradise.", "Through His Cross, and His holy Resurrection, He restored man once again, to the Paradise."]],
    arabic: [["من قِبَل صليبه، و قيامته المقدسة، رد الانسان مرة أخرى، الي الفردوس.", "من قِبَل صليبه، وقيامته المقدسة، رد الإنسان مرة أُخرى، إلى الفردوس."], ["لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "مبارك الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-Thalouth el-kamil, nasgudu lahu wa numaggiduhu."]],
  },
  "cross-matins-st-mary": {
    english: [["We indeed exalt you, with your cousin Elizabeth, saying \"Blessed are you among women, and blessed is the fruit of your womb.\"", "We exalt you worthily, with Elizabeth your cousin, saying Blessed are you among women, and blessed is the fruit of your womb."]],
    arabic: [["نُعظِّمُكِ بإستحقاقٍ، مع أليصابات نَسيبَتكِ قائلين، \"مُباركةٌ أنتِ في النساء، ومُباركةٌ هي ثمرة بطنكِ.\"", "نُعظِّمُكِ باستحقاق مع أليصابات نسيبتك، مباركة أنت في النساء ومباركة هي ثمرة بطنك."]],
    englishArabic: [["Nu'azzimuki bi-istihqaq, ma'a Aleesabat naseebatiki qa'ileen, \"Mubarakatun anti fin-nisa', wa mubarakatun hiya thamaratu batniki.\"", "Nu'azzimuki bi-istihqaq ma'a Aleesabat naseebatiki Mubarakatun anti fin-nisa' wa mubarakatun hiya thamaratu batniki."]],
  },
  "cross-matins-the-hymn-of-constantine": {
    english: [["The bishops heard and rejoiced, the priests were glad, the seven ranks of the Church, give glory to the God of heaven.", "The bishops heard and rejoiced, the priests were glad, and the seven ranks of the Church glorified the God of heaven."]],
  },
  "cross-matins-verses-of-the-cymbal": {
    english: [["Hail to the cross, which my Lord was crucified upon, hail to the grave, where they placed His body.", "Hail to the Cross, upon which my Lord was crucified, hail to the tomb, where they placed His Body."]],
  },
  "d-annual-liturgy-faithful-confession": {
    english: [["Amen. Amen. Amen. I believe, I believe, I believe that this is so in truth. Amen.", "Amen. Amen. Amen. I believe, I believe, I believe that this is true. Amen."], ["Pray for us and for all Christians who have asked us to remember them in the house of the Lord.", "Pray for us and for all Christians who said to us concerning them, “Remember us in the house of the Lord.”"]],
  },
  "d-annual-liturgy-faithful-confession-great": {
    english: [["Amen. Amen. Amen. I believe, I believe, I believe that this is so in truth. Amen.", "Amen. Amen. Amen. I believe, I believe, I believe that this is true. Amen."], ["Pray for us and for all Christians who have asked us to remember them in the house of the Lord.", "Pray for us and for all Christians who said to us concerning them, “Remember us in the house of the Lord.”"]],
  },
  "d-annual-liturgy-faithful-greet-one-another-great": {
    english: [["Let us stand well, let us stand reverently, let us stand earnestly, let us stand in peace, let us stand in the fear of God, with trembling and contrition.", "Let us stand well, let us stand reverently, let us stand earnestly, let us stand in peace, let us stand in the fear of God, with trembling and insensibility."], ["raise your eyes towards the East to see the altar, with the Body and the Blood of Emmanuel our God placed upon it.", "raise your eyes towards the East to see the altar and the Body and the Blood of Emmanuel our God placed upon it."]],
  },
  "d-annual-liturgy-faithful-let-those-who-read": {
    english: [["Let those who read, recite the names of our holy fathers the patriarchs who have fallen asleep. O Lord, repose all their souls and forgive us our sins.", "Let those who read recite the names of our holy fathers, the patriarchs who have fallen asleep. O Lord, repose their souls, and forgive us our sins."]],
  },
  "d-annual-liturgy-faithful-pray-for-peace": {
    arabic: [["صلوا من أجل سلام الواحدة الوحيدة المقدسة الجامعة الرسولية كنيسة الله الأرثوذكسية.", "صلوا من أجلِ سلامِ الواحدةِ المقدسةِ الجامعةِ الرسوليةِ كنيسةِ الله الارثوذكسية ."]],
    englishArabic: [["Sallu min agl salam el-wahida el-waheeda el-muqaddasa el-gami'a er-rasouliya kaneesat Allah el-orthodoxiya.", "Sallu min agl salam el-wahida el-muqaddasa el-gami'a er-rasouliya kaneesat Allah el-orthodoxiya ."]],
  },
  "d-annual-liturgy-faithful-pray-for-peace-2": {
    arabic: [["صلوا من أجل سلام الواحدة الوحيدة المقدسة الجامعة الرسولية كنيسة الله الأرثوذكسية.", "صلوا من أجلِ سلامِ الواحدةِ المقدسةِ الجامعةِ الرسوليةِ كنيسةِ الله الارثوذكسية ."]],
    englishArabic: [["Sallu min agl salam el-wahida el-waheeda el-muqaddasa el-gami'a er-rasouliya kaneesat Allah el-orthodoxiya.", "Sallu min agl salam el-wahida el-muqaddasa el-gami'a er-rasouliya kaneesat Allah el-orthodoxiya ."]],
  },
  "d-annual-liturgy-faithful-pray-for-providers": {
    english: [["Pray for those who provide for the sacrifices, offerings, first fruits, oil, incense, coverings, reading books, and altar vessels, that Christ our God may reward them in the heavenly Jerusalem, and forgive us our sins.", "Pray for those who have care for the sacrifices, offerings, first fruits, oil, incense, coverings, reading books, and altar vessels, that Christ our God may reward them in the heavenly Jerusalem, and forgive us our sins."]],
  },
  "d-annual-liturgy-faithful-pray-for-the-assemblies": {
    arabic: [["يا رب ارحم.", "ياربُ إرحَم ."]],
  },
  "d-annual-liturgy-faithful-pray-for-the-assemblies-st-cyril": {
    arabic: [["يا رب ارحم.", "ياربُ إرحَم ."]],
  },
  "d-annual-liturgy-faithful-pray-for-the-fruits": {
    english: [["(In Egypt, from 11 Tobi to 11 Paoni, 19/20 January to 18 June:) Pray for the air of heaven, the fruits of the earth, the trees, the vines and every fruit-bearing tree in all the world, that Christ our God may bless them, bring them to perfection in peace without harm, and forgive us our sins.", "(In Egypt, from 11 Tobi to 11 Paoni, 19/20 January to 18 June:) Pray for the air of heaven, the fruits of the earth, the trees, the vines, and for every fruit-bearing tree in all the world, that Christ our God may bless them, bring them to perfection in peace without harm, and forgive us our sins."]],
  },
  "d-annual-liturgy-faithful-pray-for-the-oblations": {
    english: [["Pray for these holy and precious gifts, our sacrifices and those who have brought them.", "Pray for these holy and precious gifts, our sacrifices, and those who bring them."]],
    arabic: [["صلوا من أجل هذه القرابين المقدسة الكريمة، وتقدماتنا، والذين قدموها.", "صلوا من أجلِ هذه القرابين المقدسةِ الكريمةِ، وضحايانا، والذين قَدَمُوها."]],
    englishArabic: [["Sallu min agl hadhihi el-qarabeen el-muqaddasa el-kareema, wa taqdimatina, wal-ladheena qaddamuha.", "Sallou min agl hadhihi el-qarabeen el-muqaddasa el-kareema, wa dahayana, wal-ladheena qaddamouha."]],
  },
  "d-annual-liturgy-faithful-pray-for-the-oblations-st-gregory": {
    english: [["Pray for these holy and precious gifts, our sacrifices and those who have brought them.", "Pray for these holy and precious gifts, our sacrifices, and those who bring them."]],
    arabic: [["صلوا من أجل هذه القرابين المقدسة الكريمة، وتقدماتنا، والذين قدموها.", "صلوا من أجلِ هذه القرابين المقدسةِ الكريمةِ، وضحايانا، والذين قَدَمُوها."]],
    englishArabic: [["Sallu min agl hadhihi el-qarabeen el-muqaddasa el-kareema, wa taqdimatina, wal-ladheena qaddamuha.", "Sallou min agl hadhihi el-qarabeen el-muqaddasa el-kareema, wa dahayana, wal-ladheena qaddamouha."]],
  },
  "d-annual-liturgy-faithful-pray-for-the-place": {
    coptic: [["Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲏⲥ ⲥⲱⲧⲏⲣⲓⲁⲥ ⲧⲟⲩ ⲕⲟⲥⲙⲟⲩ ⲕⲉ ⲧⲏⲥ ⲡⲟⲗⲉⲱⲥ ⲏ̀ⲙⲱⲛ ⲧⲁⲩⲧⲏⲥ ⲕⲉ ⲡⲁⲥⲱⲛ ⲡⲟⲗⲉⲱⲛ ⲕⲉ ⲧⲱⲛ ⲭⲱⲣⲱⲛ ⲕⲉ ⲛⲏⲥⲱⲛ ⲕⲉ ⲙⲟⲛⲁⲥⲧⲏⲣⲓⲱⲛ.", "Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲏⲥ ⲥⲱⲧⲏⲣⲓⲁⲥ ⲧⲟⲩ ⲕⲟⲥⲙⲟⲩ ⲕⲉ ⲧⲏⲥ ⲡⲟⲗⲉⲱⲥ ⲏ̀ⲙⲱⲛ ⲧⲁⲩⲧⲏⲥ ⲕⲉ ⲡⲁⲥⲱⲛ ⲡⲟⲗⲉⲱⲛ ⲕⲉ ⲧⲱⲛ ⲭⲱⲣⲱⲛ ⲕⲉ ⲛⲏⲥⲱⲛ ⲕⲉ ⲙⲟⲛⲁⲥⲧⲏⲣⲓⲟⲛ."]],
    arabic: [["صلوا من أجل خلاص العالم، ومدينتنا هذه، وسائر المدن والأقاليم والجزائر والأديرة.", "صلوا من أجلِ خلاصِ هذا العالم، ومدينتنا هذه ☩ وسائرِ المدنِ والكورِ والجزائرِ والأديرةِ."]],
    englishArabic: [["Sallu min agl khalas el-'alam, wa madeenatina hadhihi, wa sa'ir el-mudun wal-aqaleem wal-gaza'ir wal-adyira.", "Sallou min agl khalas hadha el-'alam, wa madeenatina hadhihi ☩ wa sa'ir el-mudun wal-kour wal-gaza'ir wal-adyira."]],
  },
  "d-annual-liturgy-faithful-pray-for-the-priesthood-st-cyril": {
    arabic: [["يا رب ارحم.", "ياربُ إرحَم ."]],
  },
  "d-annual-liturgy-faithful-pray-for-the-waters": {
    english: [["(In Egypt, from 12 Paoni to 9 Paopi, 19 June to 19/20 October:) Pray for the rising of the waters of the rivers this year, that Christ our God may bless them and raise them according to their measure, give joy to the face of the earth, sustain us, the sons of men, save the cattle, and forgive us our sins.", "(In Egypt, from 12 Paoni to 9 Paopi, 19 June to 19/20 October:) Pray for the rising of the waters of the rivers this year, that Christ our God may bless them and raise them according to their measure, that He may give joy to the face of the earth, sustain us, the sons of men, save the cattle, and forgive us our sins."]],
    arabic: [["(في مصر، من ١٢ بؤونة إلى ٩ بابه:) اطلبوا عن صعود مياه الأنهار في هذه السنة، لكي يباركها المسيح إلهنا، ويصعدها كمقدارها، ويفرح وجه الأرض، ويعولنا نحن البشر، ويهب النجاة للبهائم، ويغفر لنا خطايانا.", "(في مصر، من ١٢ بؤونة إلى ٩ بابه:) اطلبوا عن صعودِ مياه الأنهارِ في هذه السنةِ، لكي يباركَها المسيحُ إلهنا، ويُصْعِّدَها كمقدارِها، ويفرح وجهَ الأرضِ، ويعولَنا نحن بني البشرِ، ويعطي النجاةَ للبهائمِ، ويغفر لنا خطايانا."]],
    englishArabic: [["(Fi Masr, min 12 Ba'ouna ila 9 Baba:) Utlubu 'an su'ud miyah el-anhar fi hadhihi es-sana, likay yubarikaha el-Maseeh ilahuna, wa yus'idaha ka-miqdariha, wa yufarrih wagh el-ard, wa ya'ulna nahnu el-bashar, wa yahab en-nagah lil-baha'im, wa yaghfir lana khatayana.", "(Fi Masr, min 12 Ba'ouna ila 9 Baba:) Utlubu 'an su'oud miyah el-anhar fi hadhihi es-sana, likay yubarikaha el-Maseeh ilahuna, wa yus'idaha ka-miqdariha, wa yufarrih wagh el-ard, wa ya'oulana nahnu bani el-bashar, wa yu'ti en-nagah lil-baha'im, wa yaghfir lana khatayana."]],
  },
  "d-annual-liturgy-faithful-pray-for-travelers": {
    english: [["Pray for our fathers and our brethren who are traveling, and those who intend to travel anywhere. Straighten all their ways, whether by sea, rivers, lakes, roads, [air,] or those who are traveling by any other means, that Christ our God may bring them back to their own homes in peace, and forgive us our sins.", "Pray for our fathers and our brethren who are traveling, and those who intend to travel anywhere, [that God may] straighten all their ways, whether by sea, rivers, lakes, roads, [air,] or those who are traveling by any other means, that Christ our God may bring them back to their own homes in peace, and forgive us our sins."]],
    arabic: [["اطلبوا عن آبائنا وإخوتنا المسافرين، والذين يضمرون السفر في كل موضع، لكي يسهل طرقهم أجمعين إن كان في البحر أو الأنهار أو البحيرات أو الطرق المسلوكة، [أو الجو] أو المسافرين بكل نوعٍ، لكي المسيح إلهنا يردهم إلى مساكنهم سالمين، ويغفر لنا خطايانا.", "اطلبوا عن آبائنا وأخوتِنا المسافرين والذين يُضمِرون السفرَ في كلِّ موضعٍ، لكي يسَهِّل طرقَهم أجمعينَ، إن كانَ في البحارِ أو الأنهارِ أو البحيراتِ أو الطرقِ المسلوكةِ، أو الجو أو المسافرين بكلِّ نوعٍ لكي المسيحُ إلهنا يردَّهم إلى مساكِنهم سالمينَ، ويغفرَ لنا خطايانا."]],
    englishArabic: [["Utlubu 'an aba'ina wa ikhwatina el-musafireen, wal-ladheena yudmiroon es-safar fi kulli mawdi', likay yusahhil turuqahum agma'een, in kana fil-bahr aw el-anhar aw el-buhayrat aw et-turuq el-maslouka, [aw el-gaw] aw el-musafireen bi-kulli naw', likay el-Maseeh ilahuna yaruddahum ila masakinihim saalimeen, wa yaghfir lana khatayana.", "Utlubou 'an aba'ina wa ikhwatina el-musafireen wal-ladheena yudmiroun es-safar fi kull mawdi', likay yusahhil turuqahum agma'een, in kana fil-bihar aw el-anhar aw el-buhayrat aw et-turuq el-maslouka, aw el-gaw aw el-musafireen bi-kull naw', likay el-Maseeh ilahuna yaruddahum ila masakinihim salimeen, wa yaghfir lana khatayana."]],
  },
  "d-annual-liturgy-faithful-reconciliation": {
    english: [["Pray for perfect peace, love, and the holy apostolic kisses.", "Pray for perfect peace, love, and the holy apostolic greetings."]],
  },
  "d-annual-liturgy-faithful-reconciliation-st-gregory": {
    english: [["Pray for perfect peace, love, and the holy apostolic kisses.", "Pray for perfect peace, love, and the holy apostolic greetings."]],
  },
  "d-annual-liturgy-faithful-the-great-abba-antony-pinishti": {
    english: [["The great Abba Antony, the righteous Abba Paul, the three holy Abba Macarii, Abba John the Short, Abba Pishoy, Abba Paul, our holy Roman fathers Maximus and Dometius, Abba Moses, Abba John Kame, Abba Daniel, Abba Isidore, Abba Pachom, Abba Shenouda, Abba Paphnouti, Abba Barsoum and Abba Teji (Roweis).", "The Great Abba Antony and the righteous Abba Paul, the three saints Abba Macarii, Abba John the Short, Abba Pishoy, Abba Paul, our holy Roman fathers Maximus and Dometius, Abba Moses, Abba John Kame, Abba Daniel, Abba Isidore, Abba Pachom, Abba Shenoute and Abba Paphnoute, Abba Parsoma, Abba Teji, (Roweis)."], ["And all those who have rightly taught the word of truth: the Orthodox bishops, priests, deacons, clergy and laity, and all the Orthodox. Amen.", "and all who have rightly taught the word of truth: the orthodox bishops, priests, deacons, clergy, laity, and all the Orthodox. Amen."]],
    arabic: [["العظيم أنبا أنطونيوس، والبار أنبا بولا، والقديسون الثلاثة مقارات، أنبا يؤأنس القصير، أنبا بيشوي، أنبا بولا، أبوانا القديسان الروميان مكسيموس ودوماديوس، أنبا موسى، أنبا يؤأنس كاما، أنبا دانيال، أنبا إيسيذوروس، أنبا باخوم، أنبا شنودة، وأنبا بفنوتي، أنبا برسوم، أنبا رويس.", "العظيمُ أنبا أنطونيوس، والبارُ أنبا بولا،والقديسين الثلاثة مقارات وأنبا يحنس القصير وأنبا بيشوى، وأنبا بولا، وأبوانا القديسان الروميان مكسيموس ودوماديوس، أنبا موسى، أنبا يحنس كاما، أنبا دانيال، أنبا إيسيذوروس، أنبا باخوم . أنبا شنوده وأنبا بفنوتى، أنبا برسوما، أنبا رويس."], ["وجميع الذين علموا كلمة الحق باستقامة، الأساقفة الأرثوذكسيين والقسوس والشمامسة والإكليروس والعلمانيين، هؤلاء وجميع الأرثوذكسيين. آمين.", "وجميعُ الذين علَّمُوا كلمةَ الحقِ باستقامةٍ، الأساقفةُ الأرثوذكسيين والقسوسُ والإكليروسُ والعلمانيين، هؤلاءُ وجميعُ الأرثوذكسيين. آمين."]],
    englishArabic: [["El-'azeem Anba Antonios, wal-barr Anba Bola, wal-qiddisoon eth-thalatha Maqarat, Anba Yu'annis el-qaseer, Anba Bishoy, Anba Bola, abawana el-qiddisan er-roumiyyan Maximos wa Domadios, Anba Mousa, Anba Yu'annis Kama, Anba Danial, Anba Isidhoros, Anba Bakhoum, Anba Shenouda, wa Anba Bafnouti, Anba Barsoum, Anba Roweis.", "El-'azeem Anba Antonios, wal-barr Anba Bola, wal-qiddiseen eth-thalatha Maqarat wa Anba Yuhannis el-qaseer wa Anba Bishoy, wa Anba Bola, wa abawana el-qiddisan er-roumiyyan Maximos wa Dometios, Anba Mousa, Anba Yuhannis Kama, Anba Danial, Anba Isidhoros, Anba Bakhoum. Anba Shenouda wa Anba Bafnouti, Anba Barsoum, Anba Ruways."], ["Wa gamee' elladheena 'allamu kalimat el-haqq bi-istiqama, el-asaqifa el-orthodoxiyyeen wal-qusus wash-shamamisa wal-ikleeros wal-'almaniyyeen, ha'ula' wa gamee' el-orthodoxiyyeen. Ameen.", "Wa gamee' alladheena 'allamou kalimat el-haqq bi-istiqama, el-asaqifa el-orthodoxiyyeen wal-qusous wal-ikleeros wal-'almaniyyeen, ha'ula' wa gamee' el-orthodoxiyyeen. Ameen."]],
  },
  "d-annual-liturgy-faithful-through-the-prayers-evshes": {
    english: [["Through the prayers and intercessions of the all-holy, glorified, pure and blessed one, our lady the Mother of God, the ever-Virgin Mary.", "Through the prayers and intercessions of our Lady, the all-holy, full-of-glory, undefiled, most blessed Theotokos, the ever-virgin Mary;"], ["And the holy prophet, forerunner and baptizer, John the martyr.", "and of John, the holy prophet, forerunner, baptizer, and martyr;"], ["And Saint Stephen, the archdeacon and first martyr.", "and of Saint Stephen, the archdeacon, and protomartyr;"], ["And the holy and glorious apostles, the prophets, the victorious martyrs and all the choirs of Your saints.", "and of the holy and glorious Apostles, prophets, triumphant martyrs, and all the choirs of the saints;"], ["First, Saint Mark the Apostle, the evangelist, the archbishop and martyr.", "foremost, Mark the holy apostle, Evangelist, archbishop, and martyr;"], ["And all those who have rightly taught the word of truth: the Orthodox bishops, priests, deacons, clergy and laity, and all the Orthodox. Amen.", "and all who have rightly taught the word of truth: the orthodox bishops, priests, deacons, clergy, laity, and all the Orthodox. Amen."]],
    arabic: [["والقديس إسطفانوس رئيس الشمامسة وأول الشهداء.", "والقديس إستفانوس رئيس الشمامسة وأول الشهداء."], ["الأول، القديس مرقس الرسول الإنجيلي رئيس الأساقفة والشهيد.", "الأول، القديس مرقس الرسول الإنجيلي ورئيس الأساقفة والشهيد."], ["وجميع الذين علموا كلمة الحق باستقامة، الأساقفة الأرثوذكسيين والقسوس والشمامسة والإكليروس والعلمانيين، هؤلاء وجميع الأرثوذكسيين. آمين.", "وجميعُ الذين علَّمُوا كلمةَ الحقِ باستقامةٍ، الأساقفةُ الأرثوذكسيين والقسوسُ والإكليروسُ والعلمانيين، هؤلاءُ وجميعُ الأرثوذكسيين. آمين."]],
    englishArabic: [["Wal-qiddees Istefanos ra'ees esh-shamamisa wa awwal esh-shuhada'.", "Wal-qiddees Istifanous ra'ees esh-shamamisa wa awwal esh-shuhada'."], ["El-awwal, el-qiddees Marqus er-rasoul el-ingeeli ra'ees el-asaqifa wash-shaheed.", "El-awwal el-qiddees Marqus er-rasoul el-ingeeli ra'ees el-asaqifa wash-shaheed."], ["Wa gamee' elladheena 'allamu kalimat el-haqq bi-istiqama, el-asaqifa el-orthodoxiyyeen wal-qusus wash-shamamisa wal-ikleeros wal-'almaniyyeen, ha'ula' wa gamee' el-orthodoxiyyeen. Ameen.", "Wa gamee' alladheena 'allamou kalimat el-haqq bi-istiqama, el-asaqifa el-orthodoxiyyeen wal-qusous wal-ikleeros wal-'almaniyyeen, ha'ula' wa gamee' el-orthodoxiyyeen. Ameen."]],
  },
  "d-annual-liturgy-faithful-worship-god-st-gregory": {
    english: [["Worship God in fear.", "Bow to God in fear."]],
  },
  "d-annual-matins-pray-for-peace": {
    arabic: [["صلوا من أجل سلام الواحدة الوحيدة المقدسة الجامعة الرسولية كنيسة الله الأرثوذكسية.", "صلوا من أجلِ سلامِ الواحدةِ المقدسةِ الجامعةِ الرسوليةِ كنيسةِ الله الارثوذكسية ."]],
    englishArabic: [["Sallu min agl salam el-wahida el-waheeda el-muqaddasa el-gami'a er-rasouliya kaneesat Allah el-orthodoxiya.", "Sallu min agl salam el-wahida el-muqaddasa el-gami'a er-rasouliya kaneesat Allah el-orthodoxiya ."]],
  },
  "d-annual-matins-pray-for-providers": {
    english: [["Pray for those who provide for the sacrifices, offerings, first fruits, oil, incense, coverings, reading books, and altar vessels, that Christ our God may reward them in the heavenly Jerusalem, and forgive us our sins.", "Pray for those who have care for the sacrifices, offerings, first fruits, oil, incense, coverings, reading books, and altar vessels, that Christ our God may reward them in the heavenly Jerusalem, and forgive us our sins."]],
  },
  "d-annual-matins-pray-for-the-fruits": {
    english: [["(In Egypt, from 11 Tobi to 11 Paoni, 19/20 January to 18 June:) Pray for the air of heaven, the fruits of the earth, the trees, the vines and every fruit-bearing tree in all the world, that Christ our God may bless them, bring them to perfection in peace without harm, and forgive us our sins.", "(In Egypt, from 11 Tobi to 11 Paoni, 19/20 January to 18 June:) Pray for the air of heaven, the fruits of the earth, the trees, the vines, and for every fruit-bearing tree in all the world, that Christ our God may bless them, bring them to perfection in peace without harm, and forgive us our sins."]],
  },
  "d-annual-matins-pray-for-the-place": {
    coptic: [["Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲏⲥ ⲥⲱⲧⲏⲣⲓⲁⲥ ⲧⲟⲩ ⲕⲟⲥⲙⲟⲩ ⲕⲉ ⲧⲏⲥ ⲡⲟⲗⲉⲱⲥ ⲏ̀ⲙⲱⲛ ⲧⲁⲩⲧⲏⲥ ⲕⲉ ⲡⲁⲥⲱⲛ ⲡⲟⲗⲉⲱⲛ ⲕⲉ ⲧⲱⲛ ⲭⲱⲣⲱⲛ ⲕⲉ ⲛⲏⲥⲱⲛ ⲕⲉ ⲙⲟⲛⲁⲥⲧⲏⲣⲓⲱⲛ.", "Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲏⲥ ⲥⲱⲧⲏⲣⲓⲁⲥ ⲧⲟⲩ ⲕⲟⲥⲙⲟⲩ ⲕⲉ ⲧⲏⲥ ⲡⲟⲗⲉⲱⲥ ⲏ̀ⲙⲱⲛ ⲧⲁⲩⲧⲏⲥ ⲕⲉ ⲡⲁⲥⲱⲛ ⲡⲟⲗⲉⲱⲛ ⲕⲉ ⲧⲱⲛ ⲭⲱⲣⲱⲛ ⲕⲉ ⲛⲏⲥⲱⲛ ⲕⲉ ⲙⲟⲛⲁⲥⲧⲏⲣⲓⲟⲛ."]],
    arabic: [["صلوا من أجل خلاص العالم، ومدينتنا هذه، وسائر المدن والأقاليم والجزائر والأديرة.", "صلوا من أجلِ خلاصِ هذا العالم، ومدينتنا هذه ☩ وسائرِ المدنِ والكورِ والجزائرِ والأديرةِ."]],
    englishArabic: [["Sallu min agl khalas el-'alam, wa madeenatina hadhihi, wa sa'ir el-mudun wal-aqaleem wal-gaza'ir wal-adyira.", "Sallou min agl khalas hadha el-'alam, wa madeenatina hadhihi ☩ wa sa'ir el-mudun wal-kour wal-gaza'ir wal-adyira."]],
  },
  "d-annual-matins-pray-for-the-waters": {
    english: [["(In Egypt, from 12 Paoni to 9 Paopi, 19 June to 19/20 October:) Pray for the rising of the waters of the rivers this year, that Christ our God may bless them and raise them according to their measure, give joy to the face of the earth, sustain us, the sons of men, save the cattle, and forgive us our sins.", "(In Egypt, from 12 Paoni to 9 Paopi, 19 June to 19/20 October:) Pray for the rising of the waters of the rivers this year, that Christ our God may bless them and raise them according to their measure, that He may give joy to the face of the earth, sustain us, the sons of men, save the cattle, and forgive us our sins."]],
    arabic: [["(في مصر، من ١٢ بؤونة إلى ٩ بابه:) اطلبوا عن صعود مياه الأنهار في هذه السنة، لكي يباركها المسيح إلهنا، ويصعدها كمقدارها، ويفرح وجه الأرض، ويعولنا نحن البشر، ويهب النجاة للبهائم، ويغفر لنا خطايانا.", "(في مصر، من ١٢ بؤونة إلى ٩ بابه:) اطلبوا عن صعودِ مياه الأنهارِ في هذه السنةِ، لكي يباركَها المسيحُ إلهنا، ويُصْعِّدَها كمقدارِها، ويفرح وجهَ الأرضِ، ويعولَنا نحن بني البشرِ، ويعطي النجاةَ للبهائمِ، ويغفر لنا خطايانا."]],
    englishArabic: [["(Fi Masr, min 12 Ba'ouna ila 9 Baba:) Utlubu 'an su'ud miyah el-anhar fi hadhihi es-sana, likay yubarikaha el-Maseeh ilahuna, wa yus'idaha ka-miqdariha, wa yufarrih wagh el-ard, wa ya'ulna nahnu el-bashar, wa yahab en-nagah lil-baha'im, wa yaghfir lana khatayana.", "(Fi Masr, min 12 Ba'ouna ila 9 Baba:) Utlubu 'an su'oud miyah el-anhar fi hadhihi es-sana, likay yubarikaha el-Maseeh ilahuna, wa yus'idaha ka-miqdariha, wa yufarrih wagh el-ard, wa ya'oulana nahnu bani el-bashar, wa yu'ti en-nagah lil-baha'im, wa yaghfir lana khatayana."]],
  },
  "d-annual-matins-pray-for-travelers": {
    english: [["Pray for our fathers and our brethren who are traveling, and those who intend to travel anywhere. Straighten all their ways, whether by sea, rivers, lakes, roads, [air,] or those who are traveling by any other means, that Christ our God may bring them back to their own homes in peace, and forgive us our sins.", "Pray for our fathers and our brethren who are traveling, and those who intend to travel anywhere, [that God may] straighten all their ways, whether by sea, rivers, lakes, roads, [air,] or those who are traveling by any other means, that Christ our God may bring them back to their own homes in peace, and forgive us our sins."]],
    arabic: [["اطلبوا عن آبائنا وإخوتنا المسافرين، والذين يضمرون السفر في كل موضع، لكي يسهل طرقهم أجمعين إن كان في البحر أو الأنهار أو البحيرات أو الطرق المسلوكة، [أو الجو] أو المسافرين بكل نوعٍ، لكي المسيح إلهنا يردهم إلى مساكنهم سالمين، ويغفر لنا خطايانا.", "اطلبوا عن آبائنا وأخوتِنا المسافرين والذين يُضمِرون السفرَ في كلِّ موضعٍ، لكي يسَهِّل طرقَهم أجمعينَ، إن كانَ في البحارِ أو الأنهارِ أو البحيراتِ أو الطرقِ المسلوكةِ، أو الجو أو المسافرين بكلِّ نوعٍ لكي المسيحُ إلهنا يردَّهم إلى مساكِنهم سالمينَ، ويغفرَ لنا خطايانا."]],
    englishArabic: [["Utlubu 'an aba'ina wa ikhwatina el-musafireen, wal-ladheena yudmiroon es-safar fi kulli mawdi', likay yusahhil turuqahum agma'een, in kana fil-bahr aw el-anhar aw el-buhayrat aw et-turuq el-maslouka, [aw el-gaw] aw el-musafireen bi-kulli naw', likay el-Maseeh ilahuna yaruddahum ila masakinihim saalimeen, wa yaghfir lana khatayana.", "Utlubou 'an aba'ina wa ikhwatina el-musafireen wal-ladheena yudmiroun es-safar fi kull mawdi', likay yusahhil turuqahum agma'een, in kana fil-bihar aw el-anhar aw el-buhayrat aw et-turuq el-maslouka, aw el-gaw aw el-musafireen bi-kull naw', likay el-Maseeh ilahuna yaruddahum ila masakinihim salimeen, wa yaghfir lana khatayana."]],
  },
  "d-annual-offering-lamb-pray-for-peace": {
    arabic: [["صلوا من أجل سلام الواحدة الوحيدة المقدسة الجامعة الرسولية كنيسة الله الأرثوذكسية.", "صلوا من أجلِ سلامِ الواحدةِ المقدسةِ الجامعةِ الرسوليةِ كنيسةِ الله الارثوذكسية ."]],
    englishArabic: [["Sallu min agl salam el-wahida el-waheeda el-muqaddasa el-gami'a er-rasouliya kaneesat Allah el-orthodoxiya.", "Sallu min agl salam el-wahida el-muqaddasa el-gami'a er-rasouliya kaneesat Allah el-orthodoxiya ."]],
  },
  "d-annual-vespers-pray-for-peace": {
    arabic: [["صلوا من أجل سلام الواحدة الوحيدة المقدسة الجامعة الرسولية كنيسة الله الأرثوذكسية.", "صلوا من أجلِ سلامِ الواحدةِ المقدسةِ الجامعةِ الرسوليةِ كنيسةِ الله الارثوذكسية ."]],
    englishArabic: [["Sallu min agl salam el-wahida el-waheeda el-muqaddasa el-gami'a er-rasouliya kaneesat Allah el-orthodoxiya.", "Sallu min agl salam el-wahida el-muqaddasa el-gami'a er-rasouliya kaneesat Allah el-orthodoxiya ."]],
  },
  "d-annual-vespers-pray-for-providers": {
    english: [["Pray for those who provide for the sacrifices, offerings, first fruits, oil, incense, coverings, reading books, and altar vessels, that Christ our God may reward them in the heavenly Jerusalem, and forgive us our sins.", "Pray for those who have care for the sacrifices, offerings, first fruits, oil, incense, coverings, reading books, and altar vessels, that Christ our God may reward them in the heavenly Jerusalem, and forgive us our sins."]],
  },
  "d-annual-vespers-pray-for-the-fruits": {
    english: [["(In Egypt, from 11 Tobi to 11 Paoni, 19/20 January to 18 June:) Pray for the air of heaven, the fruits of the earth, the trees, the vines and every fruit-bearing tree in all the world, that Christ our God may bless them, bring them to perfection in peace without harm, and forgive us our sins.", "(In Egypt, from 11 Tobi to 11 Paoni, 19/20 January to 18 June:) Pray for the air of heaven, the fruits of the earth, the trees, the vines, and for every fruit-bearing tree in all the world, that Christ our God may bless them, bring them to perfection in peace without harm, and forgive us our sins."]],
  },
  "d-annual-vespers-pray-for-the-place": {
    coptic: [["Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲏⲥ ⲥⲱⲧⲏⲣⲓⲁⲥ ⲧⲟⲩ ⲕⲟⲥⲙⲟⲩ ⲕⲉ ⲧⲏⲥ ⲡⲟⲗⲉⲱⲥ ⲏ̀ⲙⲱⲛ ⲧⲁⲩⲧⲏⲥ ⲕⲉ ⲡⲁⲥⲱⲛ ⲡⲟⲗⲉⲱⲛ ⲕⲉ ⲧⲱⲛ ⲭⲱⲣⲱⲛ ⲕⲉ ⲛⲏⲥⲱⲛ ⲕⲉ ⲙⲟⲛⲁⲥⲧⲏⲣⲓⲱⲛ.", "Ⲡⲣⲟⲥⲉⲩⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲏⲥ ⲥⲱⲧⲏⲣⲓⲁⲥ ⲧⲟⲩ ⲕⲟⲥⲙⲟⲩ ⲕⲉ ⲧⲏⲥ ⲡⲟⲗⲉⲱⲥ ⲏ̀ⲙⲱⲛ ⲧⲁⲩⲧⲏⲥ ⲕⲉ ⲡⲁⲥⲱⲛ ⲡⲟⲗⲉⲱⲛ ⲕⲉ ⲧⲱⲛ ⲭⲱⲣⲱⲛ ⲕⲉ ⲛⲏⲥⲱⲛ ⲕⲉ ⲙⲟⲛⲁⲥⲧⲏⲣⲓⲟⲛ."]],
    arabic: [["صلوا من أجل خلاص العالم، ومدينتنا هذه، وسائر المدن والأقاليم والجزائر والأديرة.", "صلوا من أجلِ خلاصِ هذا العالم، ومدينتنا هذه ☩ وسائرِ المدنِ والكورِ والجزائرِ والأديرةِ."]],
    englishArabic: [["Sallu min agl khalas el-'alam, wa madeenatina hadhihi, wa sa'ir el-mudun wal-aqaleem wal-gaza'ir wal-adyira.", "Sallou min agl khalas hadha el-'alam, wa madeenatina hadhihi ☩ wa sa'ir el-mudun wal-kour wal-gaza'ir wal-adyira."]],
  },
  "d-annual-vespers-pray-for-the-waters": {
    english: [["(In Egypt, from 12 Paoni to 9 Paopi, 19 June to 19/20 October:) Pray for the rising of the waters of the rivers this year, that Christ our God may bless them and raise them according to their measure, give joy to the face of the earth, sustain us, the sons of men, save the cattle, and forgive us our sins.", "(In Egypt, from 12 Paoni to 9 Paopi, 19 June to 19/20 October:) Pray for the rising of the waters of the rivers this year, that Christ our God may bless them and raise them according to their measure, that He may give joy to the face of the earth, sustain us, the sons of men, save the cattle, and forgive us our sins."]],
    arabic: [["(في مصر، من ١٢ بؤونة إلى ٩ بابه:) اطلبوا عن صعود مياه الأنهار في هذه السنة، لكي يباركها المسيح إلهنا، ويصعدها كمقدارها، ويفرح وجه الأرض، ويعولنا نحن البشر، ويهب النجاة للبهائم، ويغفر لنا خطايانا.", "(في مصر، من ١٢ بؤونة إلى ٩ بابه:) اطلبوا عن صعودِ مياه الأنهارِ في هذه السنةِ، لكي يباركَها المسيحُ إلهنا، ويُصْعِّدَها كمقدارِها، ويفرح وجهَ الأرضِ، ويعولَنا نحن بني البشرِ، ويعطي النجاةَ للبهائمِ، ويغفر لنا خطايانا."]],
    englishArabic: [["(Fi Masr, min 12 Ba'ouna ila 9 Baba:) Utlubu 'an su'ud miyah el-anhar fi hadhihi es-sana, likay yubarikaha el-Maseeh ilahuna, wa yus'idaha ka-miqdariha, wa yufarrih wagh el-ard, wa ya'ulna nahnu el-bashar, wa yahab en-nagah lil-baha'im, wa yaghfir lana khatayana.", "(Fi Masr, min 12 Ba'ouna ila 9 Baba:) Utlubu 'an su'oud miyah el-anhar fi hadhihi es-sana, likay yubarikaha el-Maseeh ilahuna, wa yus'idaha ka-miqdariha, wa yufarrih wagh el-ard, wa ya'oulana nahnu bani el-bashar, wa yu'ti en-nagah lil-baha'im, wa yaghfir lana khatayana."]],
  },
  "d-annual-vespers-pray-for-travelers": {
    english: [["Pray for our fathers and our brethren who are traveling, and those who intend to travel anywhere. Straighten all their ways, whether by sea, rivers, lakes, roads, [air,] or those who are traveling by any other means, that Christ our God may bring them back to their own homes in peace, and forgive us our sins.", "Pray for our fathers and our brethren who are traveling, and those who intend to travel anywhere, [that God may] straighten all their ways, whether by sea, rivers, lakes, roads, [air,] or those who are traveling by any other means, that Christ our God may bring them back to their own homes in peace, and forgive us our sins."]],
    arabic: [["اطلبوا عن آبائنا وإخوتنا المسافرين، والذين يضمرون السفر في كل موضع، لكي يسهل طرقهم أجمعين إن كان في البحر أو الأنهار أو البحيرات أو الطرق المسلوكة، [أو الجو] أو المسافرين بكل نوعٍ، لكي المسيح إلهنا يردهم إلى مساكنهم سالمين، ويغفر لنا خطايانا.", "اطلبوا عن آبائنا وأخوتِنا المسافرين والذين يُضمِرون السفرَ في كلِّ موضعٍ، لكي يسَهِّل طرقَهم أجمعينَ، إن كانَ في البحارِ أو الأنهارِ أو البحيراتِ أو الطرقِ المسلوكةِ، أو الجو أو المسافرين بكلِّ نوعٍ لكي المسيحُ إلهنا يردَّهم إلى مساكِنهم سالمينَ، ويغفرَ لنا خطايانا."]],
    englishArabic: [["Utlubu 'an aba'ina wa ikhwatina el-musafireen, wal-ladheena yudmiroon es-safar fi kulli mawdi', likay yusahhil turuqahum agma'een, in kana fil-bahr aw el-anhar aw el-buhayrat aw et-turuq el-maslouka, [aw el-gaw] aw el-musafireen bi-kulli naw', likay el-Maseeh ilahuna yaruddahum ila masakinihim saalimeen, wa yaghfir lana khatayana.", "Utlubou 'an aba'ina wa ikhwatina el-musafireen wal-ladheena yudmiroun es-safar fi kull mawdi', likay yusahhil turuqahum agma'een, in kana fil-bihar aw el-anhar aw el-buhayrat aw et-turuq el-maslouka, aw el-gaw aw el-musafireen bi-kull naw', likay el-Maseeh ilahuna yaruddahum ila masakinihim salimeen, wa yaghfir lana khatayana."]],
  },
  "d-order-baptism-adam-aspasmos": {
    english: [["And heard the voice of the Father saying, 'This is my beloved Son, in Whom I am pleased.'\"", "And I heard the voice, of the Father proclaiming, 'This is My beloved Son, with whom I am pleased.´\""]],
    arabic: [["وسمعتُ صوتِ الآبِ صارخاً قائلاً: 'هذا هو ابني حبيبي به سررتُ.'\"", "وسمعت صوت، الآب صارخاً: أن هذا هو إبني الحبيب، الذي به سررت.\""], ["إلى الشرقِ انظروا.", "وإلى الشرقِ انظروا."]],
  },
  "d-order-baptism-trisagion": {
    arabic: [["قدوسُ الله. قدوسُ القوى. قدوسُ الحي الذي لا يموتُ. يا من وُلِّدَ من العذراء، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى وُلِدَ مِنَ العَذْراءِ إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من صُلِّبَ عنا، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى صُلِبَ عنّا إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من قامَ من الامواتِ وصعدَ إلى السموات، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الّذى قامَ مِنَ الأمْواتِ وصَعِدَ إلَى السَّمواتِ إرْحَمْنا."]],
  },
  "d-order-consecration-doxology": {
    arabic: [["هللا هو نور، وساكن في نور، وتسبحه، مالئكة النور.", "الله هو نور، وساكن في النور، وتسبحه، ملائكه النور."], ["ومضى إلى الكنيسة، بيت الملائكة، فسبح ّورتَل، للثالوث القدوس.", "ومضى إلى البيعة، بيت الملائكة، فسبَّح ورتَّل، للثالوث القدوس."], ["قائلا بنورك، يارب نعاين النور، فلتأت رحمتك، للذين يعرفونك .", "قائلاً \"بنورك، يا رب نعاين النور، فلتأت رحمتك، للذين يعرفونك.\" ."], ["أيها النور الحقيقى، الذي يضىء، لكل أنسان، آتياً إلى العالم.", "أيها النور الحقيقي، الذي يضئ، لكل إنسان، آتياً إلى العالم."]],
    englishArabic: [["Allah huwa nour, wa sakinun fi nour, wa tusabbihuhu, mala'ikat en-nour.", "Allah huwa nour, wa sakin fin-nour, wa tusabbihuhu, mala'ikat en-nour."], ["Wa mada ila el-kaneesa, bayt el-mala'ika, fa-sabbaha wa rattal, lith-thalouth el-quddous.", "Wa mada ila el-bee'a, bayt el-mala'ika, fa-sabbaha wa rattal, lith-Thalouth el-quddous."], ["Ayyuha en-nour el-haqeeqi, elladhi yudee', li-kull insan, atiyan ila el-'alam.", "Ayyuha en-nour el-haqeeqi elladhi yodee' li-kull insan atiyan ila el-'alam."]],
  },
  "d-order-consecration-trisagion": {
    arabic: [["قدوسُ الله. قدوسُ القوى. قدوسُ الحي الذي لا يموتُ. يا من وُلِّدَ من العذراء، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى وُلِدَ مِنَ العَذْراءِ إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من صُلِّبَ عنا، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى صُلِبَ عنّا إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من قامَ من الامواتِ وصعدَ إلى السموات، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الّذى قامَ مِنَ الأمْواتِ وصَعِدَ إلَى السَّمواتِ إرْحَمْنا."]],
    englishArabic: [["Quddoos Allah. Quddoos el-qawi. Quddoos el-hayy elladhi la yamoot. Ya man wulida min el-'adhra', irhamna.", "Quddousun Allah. Quddousun el-qawi. Quddousun el-hayy alladhi la yamout alladhi wulida min el-'Adhra' irhamna."], ["Quddoos Allah. Quddoos el-qawi. Quddoos el-hayy elladhi la yamoot. Ya man sulliba 'anna, irhamna.", "Quddousun Allah. Quddousun el-qawi. Quddousun el-hayy alladhi la yamout alladhi suliba 'anna irhamna."], ["Quddoos Allah. Quddoos el-qawi. Quddoos el-hayy elladhi la yamoot. Ya man qama min el-amwat wa sa'ida ila es-samawat, irhamna.", "Quddousun Allah. Quddousun el-qawi. Quddousun el-hayy alladhi la yamout alladhi qama min el-amwat wa sa'ida ila es-samawat irhamna."]],
  },
  "d-order-consecration-trisagion-2": {
    arabic: [["قدوسُ الله. قدوسُ القوى. قدوسُ الحي الذي لا يموتُ. يا من وُلِّدَ من العذراء، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى وُلِدَ مِنَ العَذْراءِ إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من صُلِّبَ عنا، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى صُلِبَ عنّا إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من قامَ من الامواتِ وصعدَ إلى السموات، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الّذى قامَ مِنَ الأمْواتِ وصَعِدَ إلَى السَّمواتِ إرْحَمْنا."]],
  },
  "d-order-funeral-hymn-of-the-cross": {
    english: [["This is He who offered Himself up, as an acceptable sacrifice, on the Cross for the salvation of our race.", "He Who offered Himself, as an acceptable sacrifice, upon the Cross, for the salvation of our race."], ["His good Father smelled Him at the evening watch on Golgotha.", "His good Father, smelled Him, in the evening, on Golgotha."], ["We worship You, O Christ, with Your Good Father and the Holy Spirit, for You have risen and saved us. Have mercy on us.", "We worship You O Christ, with Your Good Father, and the Holy Spirit, for You are risen and saved us. Have mercy on us."]],
  },
  "d-order-funeral-lord-have-mercy": {
    arabic: [["آمين. يا ربُّ إرحَم.", "آمين. يارب ارحم."]],
  },
  "d-order-funeral-psali-watos-for-the-three-holy-youth": {
    english: [["Pray to the Lord on our behalf, O three saintly children, Shadrach Meshach and Abed-Nego, that He may forgive us our sins.", "Pray to the Lord on our behalf: the three holy youth: Shadrach, Meshach, Abednego: that He may forgive us our sins."]],
    arabic: [["أُطلبوا من الرب عنا، أيها الثلاثة فتية القديسين، سدراك وميساك وأبدناغو، ليغفر لنا خطايانا.", "اطلبوا من الربّ عنا / أيها الثلاثة فتية القديسين / سدراك وميساك وعبدناغو / ليغفر لنا خطايانا."]],
  },
  "d-order-funeral-the-second-canticle-lobsh": {
    arabic: [["بشفاعات، والدة الإله، القديسة مريم، يا رب إنعم لنا، بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Be-shafa'at, walidat el-Ilah el-qiddeesa Maryam, ya Rab en'im lana, be-maghfirat khataya-na.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "d-order-funeral-trisagion": {
    arabic: [["قدوسُ الله. قدوسُ القوى. قدوسُ الحي الذي لا يموتُ. يا من وُلِّدَ من العذراء، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى وُلِدَ مِنَ العَذْراءِ إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من صُلِّبَ عنا، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى صُلِبَ عنّا إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من قامَ من الامواتِ وصعدَ إلى السموات، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الّذى قامَ مِنَ الأمْواتِ وصَعِدَ إلَى السَّمواتِ إرْحَمْنا."]],
  },
  "d-order-funeral-verses-of-the-cymbals": {
    arabic: [["بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabb an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "d-order-matrimony-hymn-of-joy": {
    english: [["We worship You, O Christ, with Your Good Father and the Holy Spirit, for You have risen and saved us. Have mercy on us.", "We worship You O Christ, with Your Good Father, and the Holy Spirit, for You are risen and saved us. Have mercy on us."]],
  },
  "d-order-matrimony-hymn-of-the-censer": {
    english: [["We worship You, O Christ, with Your Good Father and the Holy Spirit, for You have risen and saved us. Have mercy on us.", "We worship You O Christ, with Your Good Father, and the Holy Spirit, for You are risen and saved us. Have mercy on us."]],
  },
  "d-order-matrimony-the-sunday-theotokion-7": {
    english: [["Hail to you Mary, the beautiful dove, who gave birth to, God the Word for us.", "Hail to you O Mary, the beautiful dove, who has borne to us, God the Logos."]],
  },
  "d-order-matrimony-trisagion": {
    arabic: [["قدوسُ الله. قدوسُ القوى. قدوسُ الحي الذي لا يموتُ. يا من وُلِّدَ من العذراء، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى وُلِدَ مِنَ العَذْراءِ إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من صُلِّبَ عنا، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى صُلِبَ عنّا إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من قامَ من الامواتِ وصعدَ إلى السموات، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الّذى قامَ مِنَ الأمْواتِ وصَعِدَ إلَى السَّمواتِ إرْحَمْنا."]],
  },
  "d-order-matrimony-verses-of-the-cymbals": {
    english: [["Hail to the bridal chamber, decorated in many ways, of the true Bridegroom, who is united to humanity.", "Hail to the bridal chamber, decorated in every way, for the true Bridegroom, who united with humanity."]],
    arabic: [["بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabb an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "d-order-prostration-concluding-hymn": {
    english: [["Amen, alleluia. Glory to the Father, and the Son, and the Holy Spirit, now and ever and unto the age of ages. Amen.", "Amen. alleluia. Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
  },
  "d-order-prostration-conclusion-of-the-adam-psali": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والإبن، والروح القدوس، الآن وكل أوان، وإلى دهر الدهور آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rouh el-Quddous, el-an wa kull awan, wa ila dahr ed-duhour, ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "d-order-prostration-gospel-response": {
    english: [["He ascended into the heaven, of heavens towards the east, to send to us the Paraclete, the Spirit of truth.", "He ascended into the heaven, of heavens towards the East, to send us the Paraclete, the Spirit of Truth."]],
    arabic: [["صعد إلي سماء السماء، ناحية المشارق، لكي يرسل لنا المعزي، روح الحق", "صعد إلى سماء السموات، ناحية المشارق، لكي يرسل لنا البارقليط، روح الحق."]],
  },
  "d-order-prostration-gospel-response-2": {
    english: [["Let us worship our Savior, the good One and Lover of mankind, for He had compassion upon us, and has come and saved us.", "Let us worship our Savior, the good Lover of Mankind, for He had compassion on us, He has come and saved us."], ["Intercede on our behalf, O the Lady of us all the Theotokos, Mary the Mother of our Savior, that He may forgive us our sins.", "Intercede on our behalf, O Lady of us all, the Theotokos, Mary, the mother of our Savior, that He may forgive us our sins."]],
    arabic: [["فلنسجد لمخلصنا، محب البشر الصالح، لأنه تراءف علينا، أتي و خلصنا", "فلنسجد لمخلصنا، محب البشر الصالح، لأنه تراءف علينا، أتى وخلصنا."], ["إشفعي فينا أمام الرب، يا سيدتنا كلنا السيدة والدة الإله، مريم أم مخلصنا، ليغفر لنا خطايانا.", "أشفعي فينا يا سيدتَنا كلِنا، السيدة والدة الإله مريم أم مخلصنا، ليغفرَ لنا خطايانا."]],
  },
  "d-order-prostration-gospel-response-2-2": {
    english: [["Let us worship our Savior, the good One and Lover of Mankind, for He had compassion on us, and has come and saved us.", "Let us worship our Savior, the good Lover of Mankind, for He had compassion on us, He has come and saved us."], ["Intercede on our behalf, O the Lady of us all the Theotokos, Mary the Mother of our Savior, that He may forgive us our sins.", "Intercede on our behalf, O Lady of us all, the Theotokos, Mary, the mother of our Savior, that He may forgive us our sins."]],
    arabic: [["إشفعي فينا أمام الرب، يا سيدتنا كلنا السيدة والدة الإله، مريم أم مخلصنا، ليغفر لنا خطايانا.", "أشفعي فينا يا سيدتَنا كلِنا، السيدة والدة الإله مريم أم مخلصنا، ليغفرَ لنا خطايانا."]],
  },
  "d-order-prostration-the-fourth-canticle": {
    arabic: [["يفتخر القديسون بمجد هلليلويا. ويتهللون على مضاجعهم.", "يفتخر القديسون بمجد الليلويا ويتهللون على مضاجعهم"]],
    englishArabic: [["+ Yaftakhir el-qiddisoon bi-magd halleluia. Wa yatahallaloon 'ala madagi'ihim.", "+ Yaftakhir el-qiddisoun bi-magd Hallelouia, wa yatahallaloun 'ala madagi'ihim"]],
  },
  "d-order-prostration-the-sunday-theotokion-16": {
    english: [["Who is likened unto You, O Lord among the gods, You are the true God, the Performer of miracles.", "Among the gods O Lord, O who is likened unto You? You are the true God, the Performer of Miracles."]],
  },
  "d-order-prostration-the-sunday-theotokion-5": {
    english: [["We entreat and pray, that we may obtain mercy, through your intercessions, with the Lover of Mankind.", "We entreat and pray, that we may win mercy, through your intercessions, with the Lover of Mankind."]],
  },
  "d-order-prostration-the-sunday-theotokion-6": {
    english: [["Therefore truly, I do not err, whenever I call you, the golden censer.", "Where for truly, I do not err, whenever I call you, the golden censer."]],
    arabic: [["حينئذ بالحقيقة، لا أخطيئ في شئ، إذا ما دعوتك، المجمرة الذهب.", "حينئذ بالحقيقة لا أخطئ في شئ أذ ما دعوتك المجمرة الذهب."]],
    englishArabic: [["Heena'idhin bil-haqiqa, la ukhti' fi shay', idha ma da'awtuki, el-migmara edh-dhahab.", "Heena'idhin bil-haqiqa la ukhti' fi shay' idh ma da'awtuki el-migmara edh-dhahab."]],
  },
  "d-order-prostration-the-sunday-theotokion-7": {
    english: [["Hail to you Mary, the beautiful dove, who gave birth to, God the Word for us.", "Hail to you O Mary, the beautiful dove, who has borne to us, God the Logos."]],
  },
  "d-order-prostration-trisagion": {
    english: [["Glory be to the Father, and the Son, and the Holy Spirit, now and ever and unto the age of ages. Amen. O holy Trinity, have mercy upon us.", "Glory to the Father and to the Son and to the Holy Spirit, now and ever and unto the age of the ages. Amen. O Holy Trinity, have mercy upon us."]],
  },
  "d-order-prostration-verses-of-the-cymbals": {
    english: [["We worship You, O Christ, with Your Good Father and the Holy Spirit, for You have risen and saved us. Have mercy on us.", "We worship You O Christ, with Your Good Father, and the Holy Spirit, for You are risen and saved us. Have mercy on us."]],
    arabic: [["الروح المعزّي: إذ نزل من السماء: حلَّ على كل واحدٍ: فتكلموا بألسنة كثيرة.", "الروح المعزي، لما نزل من السماء، إنبسط على كل واحد، فنطقوا بألسنة كثيرة."]],
    englishArabic: [["Er-Rouh el-mu'azzi, idh nazala min es-sama', halla 'ala kull wahid, fa-takallamou bi-alsina katheera.", "Er-Rouh el-mu'azzi, lamma nazal min es-sama', inbasata 'ala kulli wahid, fa-nataqou bi-alsina katheera."]],
  },
  "d-order-prostration-verses-of-the-cymbals-2": {
    arabic: [["بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabb an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "d-order-unction-doxology": {
    english: [["You have saved Adam, from seduction, and delivered Eve, from the pangs of death.", "You have saved Adam, from deception, and delivered Eve, from the pangs of death."]],
    arabic: [["قائلا بنورك، يا رب، نعاين النورا، فلتأت رحمتك، للذين يعرفونك.", "قائلاً \"بنورك، يا رب نعاين نوراً، فلتأت رحمتك، للذين يعرفونك.\""], ["أيها النور الحقيقي، الذي يضئ، لكل إنسان، آتٍ إلى العالم.", "أيها النور الحقيقي، الذي يضئ، لكل إنسان، آتياً إلى العالم."]],
    englishArabic: [["Qa'ilan bi-nourika, ya Rabb, nu'ayinu en-nour, fal-ta'ti rahmatuka, lilladheena ya'rifounak.", "Qa'ilan \"bi-nourika ya Rabb nu'ayinu nouran fal-ta'ti rahmatuka lilladheena ya'rifounak.\""], ["Ayyoha el-noor el-haqeeqi, elladhi yodee', le-kolli ensan, atin ela el-'alam.", "Ayyoha el-noor el-haqeeqi elladhi yodee' le-kolli ensan atiyan ela el-'alam."]],
  },
  "d-order-unction-trisagion": {
    arabic: [["قدوسُ الله. قدوسُ القوى. قدوسُ الحي الذي لا يموتُ. يا من وُلِّدَ من العذراء، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى وُلِدَ مِنَ العَذْراءِ إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من صُلِّبَ عنا، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى صُلِبَ عنّا إرْحَمْنا."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من قامَ من الامواتِ وصعدَ إلى السموات، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الّذى قامَ مِنَ الأمْواتِ وصَعِدَ إلَى السَّمواتِ إرْحَمْنا."]],
  },
  "d-order-waters-a-proud-name": {
    arabic: [["إشفع فينا أمام الرب، أيها السابق الصابغ، يوحنا المعمدان، ليغفر لنا خطايانا.", "اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر خطايانا."]],
    englishArabic: [["Ishfa' feena (amam er-Rabb), ayyuha es-sabiq es-sabigh, Youhanna el-Ma'madan, li-yaghfir lana khatayana.", "Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-Ma'madan, li-yaghfir khatayana."]],
  },
  "d-order-waters-adam-aspasmos": {
    english: [["And I heard the voice, of the Father proclaiming, 'This is My beloved Son, with whom I am pleased.'\"", "And I heard the voice, of the Father proclaiming, 'This is My beloved Son, with whom I am pleased.´\""], ["We ask You, O Son of God, to keep the life of our patriarch, Pope Abba (...) the archpriest. Confirm him upon his throne.", "We ask You O Son of God, to keep the life of our patriarch, Pope Abba (...) the high priest, confirm him upon his throne."]],
    arabic: [["وشريكه في الخدمة الرسولية، أبانا القديس البار، أنبا (...) الأسقف، ثبته على كرسيه.", "وشريكه في الخدمة الرسولية، أبانا القديس البار، أنبا (...) الأسقف (المطران)، ثبته على كرسيه."]],
    englishArabic: [["Wa shareekahu fil-khidma er-rasouliyya, abana el-qiddees el-barr, Anba (...) el-usquf, thabbithu 'ala kursiyyih.", "Wa shareekahu fil-khidma er-rasouliyya abana el-qiddees el-barr Anba (...) el-usquf (el-mutran)ya thabbithu 'ala kursiyyih."]],
  },
  "d-order-waters-adam-aspasmos-rejoice-and-be-glad": {
    english: [["That he gave His Beloved Son, for His faithful, that they may live forever.", "That He gave, His beloved Son, for those who believe in Him, so that they may live forever."]],
    arabic: [["حتى بذل إبنه الحبيب ، عن المؤمنين لكى يحيوا إلى الأبد.", "حتى بذل، إبنه الحبيب، عن المؤمنين به، لكي يحيوا إلى الأبد."]],
    englishArabic: [["Hatta badhala ibnahu el-habeeb 'an el-mu'mineen, likay yahyou ila el-abad.", "Hatta badhala, ibnahu el-habeeb, 'an el-mu'mineen bih, likay yahyou ila el-abad."]],
  },
  "d-order-waters-alternate-adam-aspasmos": {
    english: [["Our fathers the apostles preached the Gospel of Jesus Christ among the Gentiles.", "Our fathers the apostles, preached unto the nations, the Gospel, of Jesus Christ. among the Gentiles."], ["Their voices went forth upon the face of the whole earth, and their words have reached the ends of the world.", "Their voices went forth, into all the earth, and their words have reached, the ends of the world."]],
    arabic: [["أباؤنا الرسل كرزوا في الأمم بإنجيل يسوع المسيح.", "آباؤنا الرسل، بشروا في الأمم، بإنجيل، يسوع المسيح."], ["خرجت أصواتهم علي الارض كلها و بلغ كلامهم ألي أقطار المسكونة.", "خرجت أصواتهم، إلى الأرض كلها، وبلغ كلامهم، إلى أقطار المسكونة."]],
    englishArabic: [["Aba'una er-rusul karazou fil-umam bi-ingeel Yasou' el-Maseeh.", "Aba'una er-rusul bashsharou fil-umam bi-ingeel Yasou' el-Maseeh."], ["Kharagat aswatuhum 'ala el-ard kulliha, wa balagha kalamuhum ila aqtar el-maskouna.", "Kharagat aswatuhum ila el-ardi kulliha, wa balagha kalamuhum ila aqtar el-maskouna."]],
  },
  "d-order-waters-gospel-response": {
    arabic: [["مبارك الآب والإبن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
  },
  "d-order-waters-gospel-response-2-2": {
    english: [["Jesus Christ is the same yesterday, today and forever, in one hypostasis, we worship and glorify Him.", "Jesus Christ is the same yesterday, today and forever, in one hypostasis, we worship Him and glorify Him."]],
  },
  "d-order-waters-hymn-of-joy": {
    english: [["We worship You, O Christ, with Your Good Father and the Holy Spirit, for You have risen and saved us. Have mercy on us.", "We worship You O Christ, with Your Good Father, and the Holy Spirit, for You are risen and saved us. Have mercy on us."]],
  },
  "d-order-waters-paralex": {
    arabic: [["الشيروبيم والسيرافيم، الملائكة ورؤساء الملائكة، والعساكر والسلاطين، والكراسي والأرباب.", "الشاروبيم والسِّرافيم، الملائكة ورؤساء الملائكة، والعساكر والسلاطين، والكراسي والأرباب."]],
    englishArabic: [["Esh-sharoubeem was-sarafeem, el-mala'ika wa ru'asa' el-mala'ika, wal-'asakir was-salateen, wal-karasi wal-arbab,", "Esh-Sharoubeem wes-Sarafeem, el-mala'ika wa ru'asa' el-mala'ika, wal-'asakir was-salateen, wal-karasi wal-arbab."]],
  },
  "d-order-waters-trisagion": {
    english: [["Glory to the Father, and the Son, and the Holy Spirit, now and ever and unto the age of ages. Amen. O holy Trinity, have mercy upon us.", "Glory to the Father and to the Son and to the Holy Spirit, now and ever and unto the age of the ages. Amen. O Holy Trinity, have mercy upon us."]],
    arabic: [["قدوسُ الله . قدوسُ القوى . قدوسُ الحي الذي لا يموتُ . يا من وُلِّدَ من العذراء، إرحَمنا .", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى وُلِدَ مِنَ العَذْراءِ إرْحَمْنا. ."], ["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من صُلِّبَ عنا، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى صُلِبَ عنّا إرْحَمْنا."]],
  },
  "d-order-waters-verses-of-the-cymbals-2-2": {
    arabic: [["بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabb an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "d-order-waters-watos-psali": {
    arabic: [["إشفع فينا، أيها السابق الصابغ، يوحنا المعمدان، ليغفر لنا خطايانا.", "اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر خطايانا."]],
    englishArabic: [["Ishfa' feena, ayyuha es-sabiq es-sabigh, Youhanna el-Ma'madan, li-yaghfir lana khatayana.", "Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-Ma'madan, li-yaghfir khatayana."]],
  },
  "holyweek-apocalypse-praises-the-second-hoos-lobsh": {
    coptic: [["Ⲙⲁⲣⲉⲛⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ ⲙ̀Ⲡⲓⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲛⲉⲙ ⲡⲓⲉⲣⲟⲯⲁⲗⲧⲏⲥ Ⲇⲁⲩⲓⲇ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ .", "Ⲙⲁⲣⲉⲛⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ ⲙ̀Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲛⲉⲙ ⲡⲓⲓⲉⲣⲟⲯⲁⲗⲧⲏⲥ Ⲇⲁⲩⲓⲇ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ ."]],
    english: [["Let us give thanks, to Christ our God, with David the prophet, and psalmist.", "Let us give thanks, to Christ our God, with David the psalmist, and the prophet. and psalmist."], ["These two great stars, the sun and the moon, He has made to enlighten, the firmament.", "These two great lights, the sun and the moon, He has made to enlighten, the firmament."], ["He brought forth the winds, out of His treasure box, He breathed unto the trees, and they blossomed.", "He brought forth the winds, out of His treasures, He breathed unto the trees, and they blossomed."], ["Blessed are You indeed, with You Good Father, and the Holy Spirit, for You have (come) and saved us.", "Blessed are You indeed, with Your good Father, and the Holy Spirit, for You have come and saved us."]],
  },
  "holyweek-bright-saturday-concluding-hymn": {
    english: [["Glory to the Father, and the Son, and the Holy Spirit. Now and ever and unto the age of ages. Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والابن والروح القدس. الآن وكل اوان، وإلي دهر الداهرين آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kull awan wa ila dahr ed-dahireen, ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "holyweek-covenant-thursday-alternate-adam-aspasmos": {
    english: [["Our fathers the apostles preached the Gospel of Jesus Christ among the Gentiles.", "Our fathers the apostles, preached unto the nations, the Gospel, of Jesus Christ. among the Gentiles."], ["Their voices went forth upon the face of the whole earth, and their words have reached the ends of the world.", "Their voices went forth, into all the earth, and their words have reached, the ends of the world."]],
    arabic: [["أباؤنا الرسل كرزوا في الأمم بإنجيل يسوع المسيح.", "آباؤنا الرسل، بشروا في الأمم، بإنجيل، يسوع المسيح."], ["خرجت أصواتهم علي الارض كلها و بلغ كلامهم ألي أقطار المسكونة.", "خرجت أصواتهم، إلى الأرض كلها، وبلغ كلامهم، إلى أقطار المسكونة."]],
    englishArabic: [["Aba'una er-rusul karazou fil-umam bi-ingeel Yasou' el-Maseeh.", "Aba'una er-rusul bashsharou fil-umam bi-ingeel Yasou' el-Maseeh."], ["Kharagat aswatuhum 'ala el-ard kulliha, wa balagha kalamuhum ila aqtar el-maskouna.", "Kharagat aswatuhum ila el-ardi kulliha, wa balagha kalamuhum ila aqtar el-maskouna."]],
  },
  "holyweek-covenant-thursday-fai-etav-enf": {
    english: [["This is He who offered Himself up, as an acceptable sacrifice, on the Cross for the salvation of our race.", "He Who offered Himself, as an acceptable sacrifice, upon the Cross, for the salvation of our race."], ["His Good Father smelled Him at the evening watch on Golgotha.", "His good Father, smelled Him, in the evening, on Golgotha."]],
  },
  "holyweek-covenant-thursday-gospel-response-2": {
    arabic: [["مبارك الآب والإبن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "holyweek-covenant-thursday-paschal-doxology": {
    arabic: [["(١٢/١) يا ربُّ إرحَم.", "(١٢/١) ياربُ إرحَم ."], ["(١٢/٢) يا ربُّ إرحَم.", "(١٢/٢) ياربُ إرحَم ."], ["(١٢/٣) يا ربُّ إرحَم.", "(١٢/٣) ياربُ إرحَم ."], ["(١٢/٤) يا ربُّ إرحَم.", "(١٢/٤) ياربُ إرحَم ."], ["(١٢/٥) يا ربُّ إرحَم.", "(١٢/٥) ياربُ إرحَم ."], ["(١٢/٦) يا ربُّ إرحَم.", "(١٢/٦) ياربُ إرحَم ."], ["(١٢/٧) يا ربُّ إرحَم.", "(١٢/٧) ياربُ إرحَم ."], ["(١٢/٨) يا ربُّ إرحَم.", "(١٢/٨) ياربُ إرحَم ."], ["(١٢/٩) يا ربُّ إرحَم.", "(١٢/٩) ياربُ إرحَم ."], ["(١٢/١٠) يا ربُّ إرحَم.", "(١٢/١٠) ياربُ إرحَم ."], ["(١٢/١١) يا ربُّ إرحَم.", "(١٢/١١) ياربُ إرحَم ."], ["(١٢/١٢) يا ربُّ إرحَم.", "(١٢/١٢) ياربُ إرحَم ."]],
  },
  "holyweek-great-friday-6th-hour-pauline": {
    coptic: [["Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲛⲉⲙⲱⲧⲉⲛ ⲛⲉⲙ ⲧ̀ϩⲓⲣⲏⲛⲓ ⲉⲩⲥⲟⲡ ϫⲉ ⲁⲙⲏⲛ ⲉ̀ⲥⲉϣⲱⲡⲓ.", "Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲛⲉⲙⲱⲧⲉⲛ ⲛⲉⲙ ⲧ̀ϩⲓⲣⲏⲛⲏ ⲉⲩⲥⲟⲡ ϫⲉ ⲁⲙⲏⲛ ⲉ̀ⲥⲉϣⲱⲡⲓ."]],
    english: [["Paul, a bondservant of Jesus Christ, called to be an apostle, separated to the gospel of God.", "Paul, the servant of our Lord Jesus Christ, called to be an apostle, appointed to the Gospel of God."]],
  },
  "holyweek-great-friday-6th-hour-taishoury": {
    english: [["This is the censer of pure gold bearing the aroma, in the hands of Aaron the priest, offering up incense on the altar.", "This censer of pure gold, bearing the aroma, is in the hands of Aaron the priest, offering up incense upon the altar."]],
  },
  "holyweek-great-friday-confession-of-the-thief-remember-me-o-lord": {
    english: [["Glory to the Father, and the Son, and the Holy Spirit unto the ages of all ages. Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
  },
  "holyweek-great-friday-golgotha": {
    english: [["Both now, and ever and unto the age of all ages. Amen.", "Now and ever and unto the age of ages. Amen."], ["Save us and have mercy on us. Lord have mercy, Lord have mercy, Lord bless us. Amen. Give the blessing; I prostrate, forgive me, give the blessing.", "Save us and have mercy on us.” Lord have mercy, Lord have mercy, Lord bless amen. Bless me, bless me. Behold, my repentance (metanoia). Forgive me. Say the blessing. I prostrate, forgive me, give the blessing."]],
  },
  "holyweek-pascha-general-evening-exposition-intro": {
    english: [["Hail to you O Mary, the pure dove who, for us, gave birth to God the Logos.", "Hail to you O Mary, the beautiful dove, who has borne to us, God the Logos."]],
  },
  "holyweek-pascha-general-exposition-introduction": {
    english: [["In the name of the Trinity, one in essence, the Father, the Son, and the Holy Spirit.", "In the name of the Trinity, one in essence, the. Father and the Son, and the Holy Spirit."]],
  },
  "holyweek-pascha-general-morning-exposition-intro": {
    english: [["O true light who gives light to every man that comes into the world.", "O True Light, that gives light, to every man, that comes into the world."]],
    arabic: [["أيها النور الحقيقي، الذي يضئ، لكل إنسان، آتٍ إلى العالم.", "أيها النور الحقيقي، الذي يضئ، لكل إنسان، آتياً إلى العالم."]],
    englishArabic: [["Ayyuha en-nour el-haqeeqi, elladhi yudee', li-kull insan, atin ila el-'alam.", "Ayyuha en-nour el-haqeeqi elladhi yudee' li-kull insan atiyan ila el-'alam."]],
  },
  "jonah-liturgy-entho-te-teeshoory": {
    english: [["You are the golden censer, carrying the blessed and live coal.", "You are the censer, made of pure gold, carrying the blessed, and live coal."]],
  },
  "jonah-liturgy-praxis-response": {
    english: [["Blessed are You indeed, with Your good Father, and the Holy Spirit, for You have come and saved us. Have mercy upon us.", "Blessed are You indeed, with Your good Father, and the Holy Spirit, for You have come and saved us. Have mercy on us."]],
    arabic: [["الشعب: يرفع الله هناك، خطايا الشعب، من قبل المحرقات، ورائحة البخور.", "يرفع الله هناك، خطايا الشعب، من قبل المحرقات، ورائحة البخور."]],
    englishArabic: [["Esh-Sha'b: yarfa' Allah hunak, khataya esh-sha'b, min qibal el-muhraqat, wa ra'ihat el-bukhour.", "Yarfa' Allah hunak khataya esh-sha'b, min qibal el-muhraqat wa ra'ihat el-bukhour."]],
  },
  "jonah-matins-wed-matins-gospel-response": {
    english: [["\"Come unto Me, O blessed of My Father, and inherit the life, that endures forever.\"", "“Come to Me, / O blessed of My Father, / and inherit the life / that endures forever.”"]],
  },
  "kiahk-distribution-hymn-6": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen. Bless me, bless me. Behold, my repentance. Forgive me. Say the blessing.", "Lord have mercy. Lord have mercy. Lord bless us. Amen. Bless me, bless me. Behold, my repentance (metanoia). Forgive me. Say the blessing."]],
  },
  "kiahk-distribution-hymn-8": {
    english: [["Now and forever and unto the age of all ages amen.", "Now and ever and unto the age of ages. Amen."]],
  },
  "kiahk-liturgy-gospel-response": {
    english: [["We magnify you worthily, with Elizabeth your cousin saying, \"Blessed are you among women, and blessed is the fruit of your womb.\"", "We exalt you worthily, with Elizabeth your cousin, saying Blessed are you among women, and blessed is the fruit of your womb."]],
    arabic: [["نعظمكِ بإستحقاق، مع أليصابات نسيبتِك قائلين، \"مباركة أنتِ في النساء، ومباركة هي ثمرة بطنِك.\"", "نعظمكِ باستحقاق مع أليصابات نسيبتك، مباركة أنت في النساء ومباركة هي ثمرة بطنك."]],
    englishArabic: [["Nu'azzimuki bi-istihqaq, ma'a Aleesabat naseebatiki qa'ileen, \"Mubarakatun anti fin-nisa', wa mubarakatun hiya thamaratu batniki.\"", "Nu'azzimuki bi-istihqaq ma'a Aleesabat naseebatiki Mubarakatun anti fin-nisa' wa mubarakatun hiya thamaratu batniki."]],
  },
  "kiahk-liturgy-hymn-11": {
    english: [["Hail to you O Mary, a holy hail, hail to you O Mary, the Mother of the Holy.", "Hail to you O Mary, with a holy hail, Hail to you O Mary, the Mother of the Holy One."]],
  },
  "kiahk-liturgy-hymn-18": {
    arabic: [["نعظمكِ بإستحقاق، مع أليصابات نسيبتِك قائلين، \"مباركة أنتِ في النساء، ومباركة هي ثمرة بطنِك.\"", "نعظمكِ باستحقاق مع أليصابات نسيبتك، مباركة أنت في النساء ومباركة هي ثمرة بطنك."]],
    englishArabic: [["Nu'azzimuki bi-istihqaq, ma'a Aleesabat naseebatiki qa'ileen, \"Mubarakatun anti fin-nisa', wa mubarakatun hiya thamarat batniki.\"", "Nu'azzimuki bi-istihqaq ma'a Aleesabat naseebatiki Mubarakatun anti fin-nisa' wa mubarakatun hiya thamarat batniki."]],
  },
  "kiahk-liturgy-hymn-2": {
    arabic: [["بشفاعات والدة الإله القديسة مريم، ياربُ أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddeesa Maryam, ya Rabbu an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "kiahk-liturgy-hymn-4": {
    english: [["May the clergy and all the people be safe in the Lord. Amen. So be it.", "May the clergy and all the people be safe in the Lord. Amen, so it shall be. it."]],
  },
  "kiahk-liturgy-hymn-5": {
    english: [["Pray to Christ on our behalf that He may forgive us our sins, in peace, according to His great mercy.", "Ask Christ on our behalf to forgive us our sins, in peace, according to His great mercy."]],
    arabic: [["أطلب (أطلبا) من المسيح عنا ليغفر لنا خطايانا بسلام كعظيم رحمته.", "اطلب من المسيح عنا ليغفر خطايانا بسلام كعظيم رحمته"]],
    englishArabic: [["Utlub (utluba) min el-Maseeh 'anna, li-yaghfir lana khatayana bi-salam ka-'azeem rahmatih.", "Utlub min el-Maseeh 'anna li-yaghfir khatayana bi-salam ka-'azeem rahmatih"]],
  },
  "kiahk-liturgy-praxis-response": {
    english: [["Hail to you O Mary, a holy hail, hail to you O Mary, the Mother of the Holy.", "Hail to you O Mary, with a holy hail, Hail to you O Mary, the Mother of the Holy One."]],
  },
  "kiahk-liturgy-psalm-chant-sunday-3": {
    english: [["Mercy and truth are met together; righteousness and peace have kissed each other. Truth is sprung up out of the earth and righteousness has looked down from heaven. Alleluia", "Mercy and truth have met together; righteousness and peace have kissed. Truth shall spring out of the earth, and righteousness shall look down from heaven. Alleluia."]],
    arabic: [["الرحمةُ والحقُ اِلْتَقَيا، والعدلُ والسلامُ تَلاثَمَا، الحقُ من الأرضِ أشرقَ، والعدلُ من السماءِ تَطَلَّعَ. هلِّيلويا.", "الرحمة والحق التقيـا العدل والسلامة تلاثما الحق من الأرض أشرق والعدل من السماء أطلع. الليلويا."]],
    englishArabic: [["Er-rahmatu wal-haqqu iltaqaya, wal-'adlu was-salamu talathama, el-haqqu min el-ardi ashraq, wal-'adlu min es-sama'i tatalla'. Hallelouia.", "Er-rahmatu wal-haqqu iltaqaya, el-'adlu was-salamatu talathama, el-haqqu min el-ardi ashraq, wal-'adlu min es-sama'i attala'. Hallelouia."]],
  },
  "kiahk-matins-hymn-11": {
    coptic: [["Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
  },
  "kiahk-matins-hymn-16": {
    arabic: [["نعظمكِ بإستحقاق، مع أليصابات نسيبتِك قائلين، \"مباركة أنتِ في النساء، ومباركة هي ثمرة بطنِك.\"", "نعظمكِ باستحقاق مع أليصابات نسيبتك، مباركة أنت في النساء ومباركة هي ثمرة بطنك."]],
    englishArabic: [["Nu'azzimuki bi-istihqaq, ma'a Aleesabat naseebatiki qa'ileen, \"Mubarakatun anti fin-nisa', wa mubarakatun hiya thamarat batniki.\"", "Nu'azzimuki bi-istihqaq ma'a Aleesabat naseebatiki Mubarakatun anti fin-nisa' wa mubarakatun hiya thamarat batniki."]],
  },
  "kiahk-matins-hymn-17": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen. Bless me, bless me. Behold, my repentance. Forgive me. Say the blessing.", "Lord have mercy. Lord have mercy. Lord bless us. Amen. Bless me, bless me. Behold, my repentance (metanoia). Forgive me. Say the blessing."]],
  },
  "kiahk-matins-hymn-3": {
    coptic: [["Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϩⲣⲉⲛ Ⲡⲭ̅ⲥ̅: ⲫⲏⲉⲧⲁⲣⲉϫ̀ⲫⲟϥ: ϩⲟⲡⲱⲥ ⲛ̀ⲧⲉϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.", "Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϩⲣⲉⲛ Ⲡⲭ̅ⲥ̅: ⲫⲏⲉⲧⲁⲣⲉϫ̀ⲫⲟϥ: ϩⲟⲡⲱⲥ ⲛ̀ⲧⲉϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ."], ["Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["O Virgin Mary, the holy Theotokos, the faithful advocate for all mankind.", "O Virgin Mary, the holy Theotokos, the trusted advocate, of the human race."], ["Intercede on our behalf before Christ whom you bore, that He may grant us the forgiveness of our sins.", "Intercede on our behalf, before Christ whom you have born, that He may grant unto us, the forgiveness of our sins."], ["We ask you to remember us, O our faithful advocate, before our Lord Jesus Christ, that He may forgive us our sins.", "We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["أيتها العذراء مريم، والدة الاله القديسة، الشفيعة الأمينة لجنس البشر.", "أيتها العذراء مريم، والده الإله القديسة، الشفيعة الأمينة، التي لجنس البشر."], ["اشفعى فينا أمام المسيح الذى ولدته، لكى ينعم لنا بمغفرة خطايانا.", "إشفعي فينا، أمام المسيح الذي ولدتِه، لكي ينعم علينا، بمغفرة خطايانا."], ["نسألك أن تذكرينا أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا.", "نَسْألُكِ اذْكرينا أيَّتُها الشَّفيعَةُ المؤْتَمَنةُ أَمامَ ربِّنا يَسوعِ المسيحِ ليغْفِرَ لَنا خَطايانا."]],
    englishArabic: [["Ayyatuha el-'azra Maryam, walidat el-ilah el-qiddisa, esh-shafee'a el-ameena li-gins el-bashar.", "Ayyatuha el-'Adhra' Maryam, walidat el-Ilah el-qiddeesa, esh-shafee'a el-ameena, allati li-gins el-bashar."], ["Ishfa'i feena amam el-Maseeh el-lazi waladtihi, li-kay yan'ama lana bi-maghfirat khataya-na.", "Ishfa'i feena amam el-Maseeh el-lazi waladtihi li-kay yan'ama 'alayna bi-maghfirat khataya-na."], ["Nas'aluki an tazkoreena ayyatuha esh-shafee'a el-mu'tamana, amam Rabbina Yasou' el-Maseeh, li-yaghfira lana khataya-na.", "Nas'aluki udhkurina ayyatuha esh-shafee'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfira lana khataya-na."]],
  },
  "kiahk-matins-hymn-4": {
    coptic: [["Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Hail to you O Virgin: the very and true queen: hail to the pride of our race: who bore to us Emmanuel.", "Hail to you O Virgin / the right and true Queen. / Hail to the pride of our race / who bore to us Emmanuel."]],
  },
  "kiahk-matins-hymn-5": {
    coptic: [["Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
  },
  "kiahk-matins-hymn-6": {
    coptic: [["Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Hail to you O Virgin: the very and true queen: hail to the pride of our race: who gave birth to Emmanuel.", "Hail to you O Virgin / the right and true Queen. / Hail to the pride of our race / who bore to us Emmanuel."]],
  },
  "kiahk-matins-hymn-8": {
    coptic: [["Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Hail to you O Virgin: the very and true Queen: hail to the pride of our race: who gave birth to Emmanuel.", "Hail to you O Virgin / the right and true Queen. / Hail to the pride of our race / who bore to us Emmanuel."]],
  },
  "kiahk-matins-hymn-9": {
    coptic: [["Ⲟⲩⲟϩ ⲛ̀ⲧⲉⲛⲱϣ ⲉ̀ⲃⲟⲗ ⲣⲏⲧⲱⲥ: ϧⲉⲛ ⲩⲟⲛⲓϣϯ ⲙ̀ⲙⲉⲧⲥⲁⲓⲥ: ϫⲉ ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲟⲩⲟϩ Ⲡⲟ︦ⲥ︦ ϣⲟⲡ ⲛⲉⲙⲉ.", "Ⲟⲩⲟϩ ⲛ̀ⲧⲉⲛⲱϣ ⲉ̀ⲃⲟⲗ ⲣⲏⲧⲱⲥ: ϧⲉⲛ ⲟⲩⲛⲓϣϯ ⲙ̀ⲙⲉⲧⲥⲁⲓⲉ: ϫⲉ ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲟⲩⲟϩ Ⲡⲟ︦ⲥ︦ ϣⲟⲡ ⲛⲉⲙⲉ."], ["Ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲡ̀ⲥⲱⲧ ⲛ̀Ⲁⲇⲁⲙ ⲛⲉⲙ Ⲉⲩⲁ̀: Ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲡ̀ⲟⲩⲛⲟϥ ⲛ̀ⲛⲓⲅⲉⲛⲉⲁ̀.", "Ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲡⲥⲱϯ ⲛ̀Ⲁⲇⲁⲙ ⲛⲉⲙ Ⲉⲩⲁ̀: Ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲡ̀ⲟⲩⲛⲟϥ ⲛ̀ⲛⲓⲅⲉⲛⲉⲁ̀."]],
    english: [["We utter crying out: with great charm saying: Hail to you O Virgin: the Lord is with you.", "We cry out openly: With great splendor saying: Hail to you O Virgin: The Lord is with you."], ["Hail to you O Virgin: the salvation of Adam and Eve: Hail to you O Virgin: the joy of the ages.", "Hail to you O Virgin: The salvation of Adam and Eve: Hail ...: The joy of the ages."], ["That He may confirm: all of us, His flock: and guide us with His delight: to the end of days.", "That He may confirm : All of us, His flock : And guide us in His goodwill : To the end of days."], ["And accept our prayers: be our shelter: and repose the souls: of the Christians who have slept.", "And accept our prayers : To be our shelter : And to repose the souls : Of the Christians who have slept."]],
    arabic: [["و نمجد مريم العفيفة والدة الاله، القبة الثانية، الكنز الحقيقي.", "ونمجد مريم العفيفة والدة الاله، القبة الثانية، الكنز الحقيقي."], ["و نصرخ جهراً ببهاء عظيم قائلين السلام لكِ أيتها العذراء الرب معكِ.", "ونصرخ جهرًا، ببهاء عظيم، قائلين السلام لكِ أيتها العذراء، الرب معكِ."], ["السلام لكِ أيتها العذراء خلاص آدم و خواء السلام لكِ أيتها العذراء فرح الأجيال.", "السلام لكِ ايتها العذراء، خلاص آدم وحواء، السلام لكِ ايتها العذراء، فرح الأجيال."], ["ليثبتنا في الايمان نحن كلنا غنمه و يرشدنا بمسرّته إلي كمال الأيام.", "ليثبتنا في الايمان، نحن كلنا غنمه، ويرشدنا بمسرّته، إلي كمال الأيام."], ["و يحفظ راعينا أنبا (…) و يرفع مجده ليرعي شعبه مع أبائنا الأساقفة.", "ويحفظ راعينا أنبا (…)، ويرفع مجده، ليرعى شعبه، مع أبائنا الأساقفة."], ["و يقبل إليه صلواتنا و يكون لنا ملجاً و ينبح نفوس المسيحيين الراقدين.", "ويقبل إليه صلواتنا، ويكون لنا ملجأ، وينيح نفوس، المسيحيين الراقدين."], ["و يمنحنا دالة بطلبات و شفاعات سيدتنا السيدة مريم إلي الأنقضاء.", "ويمنحنا دالة، بطلبات وشفاعات، سيدتنا السيدة مريم، إلى الانقضاء."]],
    englishArabic: [["Es-salam laki ayyatuha el-'Adhra' khalas Adam wa Hawwa', es-salam laki ayyatuha el-'Adhra' farah el-agyal.", "Es-salamu laki ayyatuha el-'Adhra', khalas Adam wa Hawwa', es-salamu laki ayyatuha el-'Adhra', farah el-agyal."], ["Wa yaqbal ilayhi salawatina wa yakoun lana malga', wa yunayyih nufous el-maseehiyyeen er-raqideen.", "Wa yaqbal ilayhi salawatina, wa yakoun lana malga', wa yunayyih nufous el-maseehiyyeen er-raqideen."]],
  },
  "kiahk-matins-verses-of-cymbals-1": {
    arabic: [["بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddeesa Maryam, ya Rabb an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "kiahk-matins-verses-of-cymbals-2": {
    arabic: [["بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddeesa Maryam, ya Rabb an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "kiahk-midnight-hymn-21": {
    english: [["+ Pray to the Lord on our behalf, O three saintly children, Shadrach Meshach and Abed-Nego, that He may forgive us our sins.", "+ Pray to the Lord on our behalf: the three holy youth: Shadrach, Meshach, Abednego: that He may forgive us our sins."]],
    arabic: [["+ أُطلبوا من الرب عنا، أيها الثلاثة فتية القديسين، سدراك وميساك وأبدناغو، ليغفر لنا خطايانا.", "+ اطلبوا من الربّ عنا / أيها الثلاثة فتية القديسين / سدراك وميساك وعبدناغو / ليغفر لنا خطايانا."]],
    englishArabic: [["+ Utlubu min er-Rabb 'anna, ayyuha eth-thalatha fitya el-qiddiseen, Sadrak wa Meesak wa Abednagho, li-yaghfir lana khatayana.", "+ Utlubu min er-Rabb 'anna, ayyuha eth-thalathat fitya el-qiddiseen, Sadrak wa Meesak wa 'Abednagho, li-yaghfir lana khatayana."]],
  },
  "kiahk-midnight-hymn-23": {
    english: [["Intercede on our behalf, O the Lady of us all the Mother of God, Mary the Mother of our Savior, that He may forgive us our sins.", "Intercede on our behalf, O Lady of us all, the Theotokos, Mary, the mother of our Savior, that He may forgive us our sins."], ["+ Intercede on our behalf, O four incorporeal beasts, the ministering flames of fire, that He may forgive us our sins.", "+ Intercede on our behalf, O four Incorporeal Creatures, the ministering flames of fire, that He may forgive us our sins."], ["Pray to the Lord on our behalf, my lords the fathers the patriarchs, Abraham Isaac and Jacob, that He may forgive us our sins.", "Pray to the Lord on our behalf, my lords and fathers the patriarchs, Abraham Isaac and Jacob, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our masters and fathers the Apostles, and the rest of the Disciples, that He may forgive us our sins.", "Pray to the Lord on our behalf, my masters and fathers the Apostles, and the rest of the Disciples, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, Basilidis and Evsebius, Macarius and Philotheos, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, Basilidis and Eusebius, Macarius and Philotheos, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Abba Pisura and Abba Epshoy, Abba Isi and his sister Thecla, that He may forgive us our sins.", "Pray to the Lord on our behalf, Abba Pisura and Abba Epshoi, Abba Isi and Thecla his sister, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Abba Kir and his brother John, and Barbara and Juliana and Demiana, that He may forgive us our sins.", "Pray to the Lord on our behalf, Abba Cyrus and John his brother, Barbara Juliana and Demiana, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, O struggle-mantled martyrs, Mari Pahnam and his sister Sarah, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, O struggle-mantled martyrs, Mari Pahnam and Sarah his sister, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, O struggle-mantled martyrs, the forty saints of Sebaste, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, O struggle-mantled martyrs, the forty saints of Sebastia, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, master Apanoub and Ptolomeos, Apa Ekragon and Sousennius, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, Master Apanoub and Ptolomeos, Apakragon and Sousennius, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our masters the fathers who loved their children, Abba Antony and Abba Paul, that He may forgive us our sins.", "Pray to the Lord on our behalf, my masters and fathers who loved their children, Abba Antony and Abba Paul, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, O three saints Macarii, and all their children the cross-bearers, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, O three saints Abba Macarii, and all their children the cross-bearers, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our masters the fathers the hegumens, Abba John and Abba Daniel, that He may forgive us our sins.", "Pray to the Lord on our behalf, my masters and fathers the hegumens, Abba John and Abba Daniel, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, our masters the fathers who loved their children, Abba Bishoy and Abba Paul, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, my masters the fathers who loved their children, Abba Pishoy and Abba Paul, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our saintly Roman fathers, Maximus and Dometius, that He may forgive us our sins.", "Pray to the Lord on our behalf, our holy Roman fathers, Maximus and Dometius, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, Abba Apollo and Abba Apip, and our father Abba Pigimi, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, Abba Apollo and Abba Apip, and our father Abba Pijimi, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Abba Evkin and Abba Ehron, Abba Hor and Abba Phis, that He may forgive us our sins.", "Pray to the Lord on our behalf, Abba Evkin and Abba Ehron, and Abba Hor and Abba Phis, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Epiphanius and Ammounios, and Arshillidis and Arsenius, that He may forgive us our sins.", "Pray to the Lord on our behalf, Epiphanius and Ammonios, and Arshillidis and Arsenius, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, our masters the ascetic fathers, Abba Abraam and George, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, my masters the ascetic fathers, Abba Abraam and George, that He may forgive us our sins."], ["Pray to the Lord on our behalf, the three hundred and eighteen gathered, at Nicea for the faith, that He may forgive us our sins.", "Pray to the Lord on our behalf, the three hundred and eighteen gathered, at Nicaea for the faith, that He may forgive us our sins."], ["Pray to the Lord on our behalf, O choirs of the cross-bearers, perfected in the wilderness, that He may forgive us our sins.", "Pray to the Lord on our behalf, O choirs of the cross-bearers, [who were] perfected in the wilderness, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, the saints of this day, everyone according to his name, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, the saints of this day, each one according to their name, that He may forgive us our sins."]],
    arabic: [["إشفعي فينا (أمام الرب)، يا سيدتنا كلنا السيدة والدة الإله، مريم أُم مخلصنا، ليغفر لنا خطايانا.", "أشفعي فينا يا سيدتَنا كلِنا، السيدة والدة الإله مريم أم مخلصنا، ليغفرَ لنا خطايانا."], ["+ إشفعا فينا (أمام الرب)، يا رئيسي الملائكة الطاهرين، ميخائيل وغبريال، ليغفر لنا خطايانا.", "+ إشفعا فينا، يا رئيسي الملائكة الطاهرين، ميخائيل وغبريال، ليغفر لنا خطايانا."], ["إشفعا فينا (أمام الرب)، يا رئيسي الملائكة الطاهرين، رافائيل وسوريال، ليغفر لنا خطايانا.", "إشفعا فينا، يا رئيسي الملائكة الطاهرين، رافائيل وسوريال، ليغفر لنا خطايانا."], ["+ إشفعوا فينا (أمام الرب)، يا رؤساء الملائكة الأطهار، سداكيال وسراتيال وأنانيال، ليغفر لنا خطايانا.", "+ إشفعوا فينا، يا رؤساء الملائكة الأطهار، سداكيال وسراتيال وأنانيال، ليغفر لنا خطايانا."], ["إشفعي فينا (أمام الرب)، أيتها الكراسي والأرباب والقوات، والشيروبيم والسرافيم، ليغفر لنا خطايانا.", "إشفعي فينا، أيتها الكراسي والأرباب والقوات، والشيروبيم والسرافيم، ليغفر لنا خطايانا."], ["+ إشفعوا فينا (أمام الرب)، أيها الأربعة الحيوانات غير المتجسدين، الخدام الملتهبين ناراً، ليغفر لنا خطايانا.", "+ إشفعوا فينا، أيها الأربعة الحيوانات غير المتجسدين، الخدام الملتهبين ناراً، ليغفر لنا خطايانا."], ["إشفعوا فينا (أمام الرب)، يا كهنة الحق، الأربعة والعشرين قسيساً، ليغفر لنا خطايانا.", "إشفعوا فينا، يا كهنة الحق، الأربعة والعشرين قسيساً، ليغفر لنا خطايانا."], ["+ إشفعوا فينا (أمام الرب)، أيها العساكر الملائكية، والطغمات السمائية، ليغفر لنا خطايانا.", "+ إشفعوا فينا، أيها العساكر الملائكية، والطغمات السمائية، ليغفر لنا خطايانا."], ["إشفع فينا (أمام الرب)، أيها السابق الصابغ، يوحنا المعمدان، ليغفر لنا خطايانا.", "اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر خطايانا."], ["+ إشفعوا فينا (أمام الرب)، أيها المئة والأربعة والأربعين ألفاً، والبتول الإنجيلي، ليغفر لنا خطايانا.", "+ إشفعوا فينا، أيها المئة والأربعة والأربعين ألفاً، والبتول الإنجيلي، ليغفر لنا خطايانا."]],
    englishArabic: [["Ishfa'i feena (amam er-Rabb), ya sayyidatana kullina es-sayyida walidat el-ilah, Maryam umm mukhallisina, li-yaghfir lana khatayana.", "Ishfa'i feena ya sayyidatana kullina, es-sayyida walidat el-Ilah Maryam umm mukhallisina, li-yaghfir lana khatayana."], ["+ Ishfa'a feena (amam er-Rabb), ya ra'eesay el-mala'ika et-tahireen, Mikha'eel wa Ghobrial, li-yaghfir lana khatayana.", "+ Ishfa'a feena ra'eesay el-mala'ika et-tahireen Mikha'eel wa Ghobrial li-yaghfir lana khatayana."], ["Ishfa'a feena (amam er-Rabb), ya ra'eesay el-mala'ika et-tahireen, Rafa'eel wa Souryal, li-yaghfir lana khatayana.", "Ishfa'a feena ra'eesay el-mala'ika et-tahireen Rafa'eel wa Souryal li-yaghfir lana khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ya ru'asa' el-mala'ika el-at-har, Sadakyal wa Saratyal wa Ananyal, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ya ru'asa' el-mala'ika el-at-har, Sadakiyal wa Saratiyal wa Ananiyal, li-yaghfir lana khatayana."], ["Ishfa'i feena (amam er-Rabb), ayyatuha el-karasi wal-arbab wal-quwwat, wash-Sheroubim was-Seraphim, li-yaghfir lana khatayana.", "Ishfa'i feena, ayyatuha el-karasi wal-arbab wal-quwwat, wesh-Sharoubeem wes-Sarafeem, li-yaghfir lana khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ayyuha el-arba'at el-hayawanat ghayr el-mutagassideen, el-khuddam el-multahibeen naran, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ayyuha el-arba'at el-hayawanat ghayr el-mutagassideen, el-khuddam el-multahibeen naran, li-yaghfir lana khatayana."], ["Ishfa'u feena (amam er-Rabb), ya kahanat el-haqq, el-arba'a wal-'ishreen qasseesan, li-yaghfir lana khatayana.", "Ishfa'ou feena, ya kahanat el-haqq, el-arba'a wal-'ishreen qasseesan, li-yaghfir lana khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ayyuha el-'asakir el-mala'ikiya, wat-taghmat es-sama'iya, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ayyuha el-'asakir el-mala'ikiyya, wat-tughmat es-sama'iyya, li-yaghfir lana khatayana."], ["Ishfa' feena (amam er-Rabb), ayyuha es-sabiq es-sabigh, Youhanna el-Ma'madan, li-yaghfir lana khatayana.", "Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-Ma'madan, li-yaghfir khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ayyuha el-mi'a wal-arba'a wal-arba'een alfan, wal-batoul el-ingeeli, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ayyuha el-mi'a wal-arba'a wal-arba'een alfan, wal-batoul el-ingeeli, li-yaghfir lana khatayana."]],
  },
  "kiahk-midnight-hymn-31": {
    arabic: [["+ يفتخر القديسون بمجد هلليلويا. ويتهللون على مضاجعهم.", "+ يفتخر القديسون بمجد الليلويا ويتهللون على مضاجعهم"]],
    englishArabic: [["+ Yaftakhir el-qiddisoon bi-magd halleluia. Wa yatahallaloon 'ala madagi'ihim.", "+ Yaftakhir el-qiddisoun bi-magd Hallelouia, wa yatahallaloun 'ala madagi'ihim"]],
  },
  "kiahk-midnight-hymn-36": {
    coptic: [["Ⲉⲕⲉⲉⲣϧⲏⲓⲃⲓ ⲉ̀ϫⲱⲓ: ϧⲁ ⲑ̀ϧⲏⲓⲃⲓ ⲛ̀ⲧⲉ ⲛⲉⲕⲧⲉⲛϩ: Ⲡⲁⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅: ⲁ̀ⲣⲓⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲓ.", "Ⲉⲕⲉⲣϧⲏⲓⲃⲓ ⲉ̀ϫⲱⲓ: ϧⲁ ⲧ̀ϧⲏⲓⲃⲓ ⲛ̀ⲧⲉ ⲛⲉⲕⲧⲉⲛϩ: Ⲡⲁⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅: ⲁ̀ⲣⲓⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲓ."]],
    english: [["You who carry the sins of the world: Have mercy upon me: My Lord Jesus Christ: help me.", "You who carries the sins of the world: Have mercy upon me: my Lord Jesus Christ: help me."], ["+ Forgive me the multitude: of my iniquities: My Lord Jesus: help me.", "+ Forgive me the multitude: of my iniquity: my Lord Jesus: help me."], ["Oh, how beloved: is Your holy name: My Lord Jesus: help me.", "O how beloved: is Your holy name: my Lord Jesus: help me."]],
  },
  "kiahk-midnight-hymn-39": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
  },
  "kiahk-midnight-hymn-4": {
    arabic: [["+ بشفاعات، والدة الإله القديسة مريم، يا رب إنعم لنا، بمغفرة خطايانا.", "+ بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["+ Bi-shafa'at, walidat el-ilah el-qiddisa Maryam, ya Rabb in'im lana, bi-maghfirat khatayana.", "+ Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "kiahk-midnight-hymn-40": {
    english: [["You are called righteous, O blessed one, among women, the second tabernacle.", "You are called truly, O blessed one, among women, the Second Tabernacle."], ["Whereupon is, the ten commandments, these which are written, by the finger of God.", "Of the covenant, and the Ten Commandments, which are written, by the finger of God."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["+ He made it with glory, as commanded by the Lord, according to the patterns, shown unto him.", "+ He made it with glory, as commanded by the Lord, and according to the pattern, shown unto him."]],
    arabic: [["مدعوة صديقة، أيتها المباركة، في النساء، القبة الثانية.", "مدعوة أنت بالحقيقة، أيتها المباركة، في النساء، القبة الثانية."], ["والعشر، الكلمات، هذة المكتوبة، بأصبع الله.", "العهد والعشر، الكلمات، هذة المكتوبة، بأصبع الله."]],
    englishArabic: [["Mad'ouwa siddeeqa, ayyatuha el-mubaraka, fin-nisa', el-qubba eth-thaniya.", "Mad'ouwwa anti bil-haqeeqa, ayyatuha el-mubaraka, fin-nisa', el-qubba eth-thaniya."], ["Wal-'ashr, el-kalimat, hadhihi el-maktouba, bi-isba' Allah.", "El-'ahd Wal-'ashr el-kalimat hadhihi el-maktouba bi-isba' Allah."]],
  },
  "kiahk-midnight-hymn-42": {
    english: [["+ One nature out of two, a holy divinity, co-essential with the Father, and incorruptible.", "+ One out of two, a holy divinity, co-essential with the Father, and incorruptible."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["All the souls together, of the children of Israel, brought offering unto, the tabernacle of the Lord.", "All the souls together, of the children of Israel, brought offerings unto, the Tabernacle of the Lord."]],
  },
  "kiahk-midnight-hymn-44": {
    english: [["+ Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "+ Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["+ The two golden Cherubim, continually covered, with their wings, the mercy seat.", "+ The two golden cherubim, continually cover, with their wings, the Mercy Seat."]],
  },
  "kiahk-midnight-hymn-46": {
    english: [["+ The Bread of life, which came down from heaven, and gave life, unto the world.", "+ The Bread of life, which came down for us, from heaven, has given life to the world."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["+ For that was kept, in the tabernacle, as a testimony, to the children of Israel.", "+ For that was kept, in the Tabernacle, as a testimony, for the children of Israel."], ["You bore Him without blemish, He gave unto us, His honored Body and Blood, and we lived forever.", "You bore Him without blemish, He gave unto us, His honored Body and Blood, and we live forever."]],
    arabic: [["+ فذلك وُضع، في القبة، شهادة لبني، إسرائيل.", "+ فذاك وُضع، في القبة، شهادة لبني، إسرائيل."]],
    englishArabic: [["+ Fa-dhalika wudi', fil-qubba, shahadatan li-bani, Isra'eel.", "+ Fa-dhaka wudi', fil-qubba, shahadatan li-bani, Isra'eel."]],
  },
  "kiahk-midnight-hymn-48": {
    english: [["+ By His appearing, He gave light to us, we who sit in the darkness, and in the shadow of death.", "+ By His Coming, He gave light to us, we who were sitting in the darkness, and in the shadow of death."], ["+ Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "+ Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["That was made of, pure and elect gold, and was placed in, the tabernacle.", "That was made of, pure and chosen gold, and was placed, in the Tabernacle."], ["+ That was made, by the hands of men, who brought oil for its lamps, by day and by night.", "+ That was managed, by the hands of men, who brought oil for its lamps, by day and by night."], ["He who dwells in your womb, O Virgin Mary, gives light to every man, who comes into the world.", "He Who dwelt in your womb, O Virgin Mary, gives light to every man, who comes into the world."]],
  },
  "kiahk-midnight-hymn-50": {
    english: [["+ Which is God the Word, who took flesh from you, and offered Himself as incense, to God His Father.", "+ Which is God the Word, Who was incarnate from you, and offered Himself as incense, to God His Father."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["Wherefore truly, I do not err, whenever I call you, the golden censer.", "Where for truly, I do not err, whenever I call you, the golden censer."], ["+ For therein, is offered, the choice incense, before the Holies.", "+ For therein, is offered, the chosen incense, before the Holies."]],
    arabic: [["حينئذ بالحقيقة، لا أخطيئ في شئ، إذا ما دعوتك، المجمرة الذهب.", "حينئذ بالحقيقة لا أخطئ في شئ أذ ما دعوتك المجمرة الذهب."], ["+ وأنتِ يا مريم، حملتِ في بطنِك، الغير منظور، كلمة الآب.", "+ وأنتِ يا مريم، حملتِ في بطنِك، غير منظور، كلمة الآب."]],
    englishArabic: [["Heena'idhin bil-haqiqa, la ukhti' fi shay', idha ma da'awtuki, el-migmara edh-dhahab.", "Heena'idhin bil-haqiqa la ukhti' fi shay' idh ma da'awtuki el-migmara edh-dhahab."], ["+ Wa anti ya Maryam, hamalti fi batniki, ghayr el-manzour, kalimat el-Ab.", "+ Wa anti ya Maryam, hamalti fi batniki, ghayr el-manzour, Kalimat el-Ab."]],
  },
  "kiahk-midnight-hymn-52": {
    english: [["Hail to you Mary, the beautiful dove, who gave birth to, God the Word for us.", "Hail to you O Mary, the beautiful dove, who has borne to us, God the Logos."]],
  },
  "kiahk-midnight-hymn-72": {
    coptic: [["+ Ⲁⲩⲙⲟⲩϯ ⲉ̀Ⲙⲁⲣⲓⲁ: ϯϣⲉⲣⲓ ⲛ̀Ⲓⲱⲁ̀ⲕⲓⲙ: ϫⲉ ϯⲥ̀ⲕⲏⲛⲏ ⲙ̀ⲙⲏⲓ: ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ ⲥⲁⲃⲁⲱⲑ.", "+ Ⲁⲩⲙⲟⲩϯ ⲉ̀Ⲙⲁⲣⲓⲁ: ⲧ̀ϣⲉⲣⲓ ⲛ̀Ⲓⲱⲁ̀ⲕⲓⲙ: ϫⲉ ϯⲥ̀ⲕⲏⲛⲏ ⲙ̀ⲙⲏⲓ: ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ ⲥⲁⲃⲁⲱⲑ."]],
    english: [["They thought, with their enlightened minds, and explained it, through the Holy Books.", "They thought, with their bright minds, and explained it, through the Holy Books."], ["+ They likened the mercy seat, to the Virgin, lo the cherubim of glory, overshadowing her.", "+ They likened the mercy seat, to the Virgin, and the cherubim of glory, overshadowing her."], ["They likened the golden pot, to the Virgin, and its measure of the manna, to our Savior.", "They likened the golden pot, to the Virgin, and the measure of the manna, to our Savior."], ["+ They likened the golden candlestand, to the Church, and its seven lamps, to its seven orders.", "+ They likened the golden candlestand, to the Church, and the seven lamps, to its seven orders."], ["They likened the golden censer, to the Virgin, and its aloes, to Immanuel.", "They likened the golden censer, to the Virgin, and its aloes, to Emmanuel."], ["+ They likened the flower of incense, to Mary the Queen, and its chosen incense, to her virginity.", "+ They likened the flower of incense, to Mary the Queen, and the chosen incense, to her virginity."]],
    arabic: [["شبَّهوا عصا هارونَ، بخشبةِ الصليبِ، التي صُلِبَ ربّي عليها، حتّى خلَّصنا.", "شبهوا عصا هرون، بخشبة الصليب، التي صُلب ربي عليها، حتى خلصنا."]],
    englishArabic: [["Shabbahou 'asa Haroun, bi-khashabat es-saleeb, allati sulib Rabbi 'alayha, hatta khallasana.", "Shabbahou 'asa Haroun bi-khashabat es-saleeb allati sulib Rabbi 'alayha hatta khallasana."]],
  },
  "kiahk-midnight-hymn-76": {
    english: [["Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.", "Your mercies O my God: are countless: and exceedingly plenteous: are Your compassions."], ["And me too, the sinner, teach me O my Master, to offer repentance.", "And I too: the sinner: teach me O my Lord: to offer repentance."], ["For You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.", "For You do not desire: the death of a sinner: but rather that he return: and that his soul may live."], ["For You are good, and merciful, let Your compassion, speedily come to us.", "For You are good: and merciful: let Your compassions: speedily come to us."], ["O King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.", "O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins."], ["Disperse the enemies, of the Church, and fortify her that she, may not be shaken forever.", "Disperse the enemies, of the Church, and fortify her, that she may never be shaken. forever."]],
  },
  "kiahk-midnight-hymn-79": {
    arabic: [["يا ربُّ إرحَم.", "ياربُ إرحَم ."]],
  },
  "kiahk-midnight-hymn-80": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen.", "Lord have mercy. Lord have mercy. Lord bless. Amen."]],
    arabic: [["نصرخ قائلين: يا ربنا يسوع المسيح بارك مياه النهر، ولتكن رحمتُكَ وسلامُكَ حصناً لشعبِك، خلصنا وارحَمنا.", "نصرخ قائلين : يا ربنا يسوع المسيح بارك مياه النهر، لتكن رحمتُكَ وسلامُكَ حصناً لشعبِك خلصنا وارحَمنا."]],
    englishArabic: [["Nasrukh qaa-ileen: ya rabbana Yasoo el-Maseeh, barik miyaah en-nahr, wal-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna.", "Nasrukh qa'ileen: ya Rabbana Yasou' el-Maseeh, barik miyah en-nahr, li-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna."]],
  },
  "kiahk-midnight-hymn-9": {
    arabic: [["بشفاعات، والدة الإله، القديسة مريم، يا رب إنعم لنا، بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at, walidat el-ilah, el-qiddisa Maryam, ya Rabb in'im lana, bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "kiahk-midnight-kiahk-ode": {
    english: [["(41/42) Bless me, bless me, behold the repentance, forgive me, my fathers and my brothers, pray for me; in love I ask you to remember me.", "(41/42) Bless me, bless me, behold the repentance, forgive me, my fathers and brothers, pray for me; in love I ask you to remember me."], ["(42/42) Glory to the Father, and the Son, and the Holy Spirit, now and ever and unto the ages of the ages. Amen. Alleluia.", "(42/42) Glory to the Father, and the Son, and the Holy Spirit, now and ever and unto the age of ages. Amen. Alleluia."]],
    arabic: [["باركوا عليَّ ها ميطانية اغفروا لي يا آبائي واخوتي. صلوا عليَّ. بالمحبة أسألكم اذكروني.", "باركوا عليَّ، باركوا عليَّ، ها مطانية، اغفروا لي يا آبائي وإخوتي، صلوا عليَّ، بالمحبة أسألكم اذكروني."]],
    englishArabic: [["Barikou 'alayy, ha metanoia, ighfirou li ya aba'i wa ikhwati. Sallou 'alayy. Bil-mahabba as'alukum udhkurouni.", "Barikou 'alayya, barikou 'alayya, ha metanoia, ighfirou li ya aba'i wa ikhwati, sallou 'alayya, bil-mahabba as'alukum udhkurouni."]],
  },
  "kiahk-vespers-hymn-11": {
    coptic: [["Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
  },
  "kiahk-vespers-hymn-16": {
    arabic: [["نعظمكِ بإستحقاق، مع أليصابات نسيبتِك قائلين، \"مباركة أنتِ في النساء، ومباركة هي ثمرة بطنِك.\"", "نعظمكِ باستحقاق مع أليصابات نسيبتك، مباركة أنت في النساء ومباركة هي ثمرة بطنك."]],
    englishArabic: [["Nu'azzimuki bi-istihqaq, ma'a Aleesabat naseebatiki qa'ileen, \"Mubarakatun anti fin-nisa', wa mubarakatun hiya thamarat batniki.\"", "Nu'azzimuki bi-istihqaq ma'a Aleesabat naseebatiki Mubarakatun anti fin-nisa' wa mubarakatun hiya thamarat batniki."]],
  },
  "kiahk-vespers-hymn-17": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen. Bless me, bless me. Behold, my repentance. Forgive me. Say the blessing.", "Lord have mercy. Lord have mercy. Lord bless us. Amen. Bless me, bless me. Behold, my repentance (metanoia). Forgive me. Say the blessing."]],
  },
  "kiahk-vespers-hymn-3": {
    coptic: [["Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϩⲣⲉⲛ Ⲡⲭ̅ⲥ̅: ⲫⲏⲉⲧⲁⲣⲉϫ̀ⲫⲟϥ: ϩⲟⲡⲱⲥ ⲛ̀ⲧⲉϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.", "Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲁϩⲣⲉⲛ Ⲡⲭ̅ⲥ̅: ⲫⲏⲉⲧⲁⲣⲉϫ̀ⲫⲟϥ: ϩⲟⲡⲱⲥ ⲛ̀ⲧⲉϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ."], ["Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["O Virgin Mary, the holy Theotokos, the faithful advocate for all mankind.", "O Virgin Mary, the holy Theotokos, the trusted advocate, of the human race."], ["Intercede on our behalf before Christ whom you bore, that He may grant us the forgiveness of our sins.", "Intercede on our behalf, before Christ whom you have born, that He may grant unto us, the forgiveness of our sins."], ["We ask you to remember us, O our faithful advocate, before our Lord Jesus Christ, that He may forgive us our sins.", "We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["أيتها العذراء مريم، والدة الاله القديسة، الشفيعة الأمينة لجنس البشر.", "أيتها العذراء مريم، والده الإله القديسة، الشفيعة الأمينة، التي لجنس البشر."], ["اشفعى فينا أمام المسيح الذى ولدته، لكى ينعم لنا بمغفرة خطايانا.", "إشفعي فينا، أمام المسيح الذي ولدتِه، لكي ينعم علينا، بمغفرة خطايانا."], ["نسألك أن تذكرينا أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا.", "نَسْألُكِ اذْكرينا أيَّتُها الشَّفيعَةُ المؤْتَمَنةُ أَمامَ ربِّنا يَسوعِ المسيحِ ليغْفِرَ لَنا خَطايانا."]],
    englishArabic: [["Ayyatuha el-'azra Maryam, walidat el-ilah el-qiddisa, esh-shafee'a el-ameena li-gins el-bashar.", "Ayyatuha el-'Adhra' Maryam, walidat el-Ilah el-qiddeesa, esh-shafee'a el-ameena, allati li-gins el-bashar."], ["Ishfa'i feena amam el-Maseeh el-lazi waladtihi, li-kay yan'ama lana bi-maghfirat khataya-na.", "Ishfa'i feena amam el-Maseeh el-lazi waladtihi li-kay yan'ama 'alayna bi-maghfirat khataya-na."], ["Nas'aluki an tazkoreena ayyatuha esh-shafee'a el-mu'tamana, amam Rabbina Yasou' el-Maseeh, li-yaghfira lana khataya-na.", "Nas'aluki udhkurina ayyatuha esh-shafee'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfira lana khataya-na."]],
  },
  "kiahk-vespers-hymn-4": {
    coptic: [["Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Hail to you O Virgin: the very and true queen: hail to the pride of our race: who bore to us Emmanuel.", "Hail to you O Virgin / the right and true Queen. / Hail to the pride of our race / who bore to us Emmanuel."]],
  },
  "kiahk-vespers-hymn-5": {
    coptic: [["Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
  },
  "kiahk-vespers-hymn-6": {
    coptic: [["Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Hail to you O Virgin: the very and true queen: hail to the pride of our race: who gave birth to Emmanuel.", "Hail to you O Virgin / the right and true Queen. / Hail to the pride of our race / who bore to us Emmanuel."]],
  },
  "kiahk-vespers-hymn-8": {
    coptic: [["Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Hail to you O Virgin: the very and true Queen: hail to the pride of our race: who gave birth to Emmanuel.", "Hail to you O Virgin / the right and true Queen. / Hail to the pride of our race / who bore to us Emmanuel."]],
  },
  "kiahk-vespers-hymn-9": {
    coptic: [["Ⲟⲩⲟϩ ⲛ̀ⲧⲉⲛⲱϣ ⲉ̀ⲃⲟⲗ ⲣⲏⲧⲱⲥ: ϧⲉⲛ ⲩⲟⲛⲓϣϯ ⲙ̀ⲙⲉⲧⲥⲁⲓⲥ: ϫⲉ ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲟⲩⲟϩ Ⲡⲟ︦ⲥ︦ ϣⲟⲡ ⲛⲉⲙⲉ.", "Ⲟⲩⲟϩ ⲛ̀ⲧⲉⲛⲱϣ ⲉ̀ⲃⲟⲗ ⲣⲏⲧⲱⲥ: ϧⲉⲛ ⲟⲩⲛⲓϣϯ ⲙ̀ⲙⲉⲧⲥⲁⲓⲉ: ϫⲉ ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲟⲩⲟϩ Ⲡⲟ︦ⲥ︦ ϣⲟⲡ ⲛⲉⲙⲉ."], ["Ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲡ̀ⲥⲱⲧ ⲛ̀Ⲁⲇⲁⲙ ⲛⲉⲙ Ⲉⲩⲁ̀: Ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲡ̀ⲟⲩⲛⲟϥ ⲛ̀ⲛⲓⲅⲉⲛⲉⲁ̀.", "Ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲡⲥⲱϯ ⲛ̀Ⲁⲇⲁⲙ ⲛⲉⲙ Ⲉⲩⲁ̀: Ⲭⲉⲣⲉ ⲛⲉ ⲱ̀ Ϯⲡⲁⲣⲑⲉⲛⲟⲥ: ⲡ̀ⲟⲩⲛⲟϥ ⲛ̀ⲛⲓⲅⲉⲛⲉⲁ̀."]],
    english: [["We utter crying out: with great charm saying: Hail to you O Virgin: the Lord is with you.", "We cry out openly: With great splendor saying: Hail to you O Virgin: The Lord is with you."], ["Hail to you O Virgin: the salvation of Adam and Eve: Hail to you O Virgin: the joy of the ages.", "Hail to you O Virgin: The salvation of Adam and Eve: Hail ...: The joy of the ages."], ["That He may confirm: all of us, His flock: and guide us with His delight: to the end of days.", "That He may confirm : All of us, His flock : And guide us in His goodwill : To the end of days."], ["And accept our prayers: be our shelter: and repose the souls: of the Christians who have slept.", "And accept our prayers : To be our shelter : And to repose the souls : Of the Christians who have slept."]],
    arabic: [["و نمجد مريم العفيفة والدة الاله، القبة الثانية، الكنز الحقيقي.", "ونمجد مريم العفيفة والدة الاله، القبة الثانية، الكنز الحقيقي."], ["و نصرخ جهراً ببهاء عظيم قائلين السلام لكِ أيتها العذراء الرب معكِ.", "ونصرخ جهرًا، ببهاء عظيم، قائلين السلام لكِ أيتها العذراء، الرب معكِ."], ["السلام لكِ أيتها العذراء خلاص آدم و خواء السلام لكِ أيتها العذراء فرح الأجيال.", "السلام لكِ ايتها العذراء، خلاص آدم وحواء، السلام لكِ ايتها العذراء، فرح الأجيال."], ["ليثبتنا في الايمان نحن كلنا غنمه و يرشدنا بمسرّته إلي كمال الأيام.", "ليثبتنا في الايمان، نحن كلنا غنمه، ويرشدنا بمسرّته، إلي كمال الأيام."], ["و يحفظ راعينا أنبا (…) و يرفع مجده ليرعي شعبه مع أبائنا الأساقفة.", "ويحفظ راعينا أنبا (…)، ويرفع مجده، ليرعى شعبه، مع أبائنا الأساقفة."], ["و يقبل إليه صلواتنا و يكون لنا ملجاً و ينبح نفوس المسيحيين الراقدين.", "ويقبل إليه صلواتنا، ويكون لنا ملجأ، وينيح نفوس، المسيحيين الراقدين."], ["و يمنحنا دالة بطلبات و شفاعات سيدتنا السيدة مريم إلي الأنقضاء.", "ويمنحنا دالة، بطلبات وشفاعات، سيدتنا السيدة مريم، إلى الانقضاء."]],
    englishArabic: [["Es-salam laki ayyatuha el-'Adhra' khalas Adam wa Hawwa', es-salam laki ayyatuha el-'Adhra' farah el-agyal.", "Es-salamu laki ayyatuha el-'Adhra', khalas Adam wa Hawwa', es-salamu laki ayyatuha el-'Adhra', farah el-agyal."], ["Wa yaqbal ilayhi salawatina wa yakoun lana malga', wa yunayyih nufous el-maseehiyyeen er-raqideen.", "Wa yaqbal ilayhi salawatina, wa yakoun lana malga', wa yunayyih nufous el-maseehiyyeen er-raqideen."]],
  },
  "kiahk-vespers-verses-of-cymbals-1": {
    arabic: [["بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddeesa Maryam, ya Rabb an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "kiahk-vespers-verses-of-cymbals-2": {
    arabic: [["بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddeesa Maryam, ya Rabb an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "lent-distribution-concluding-hymn": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen.", "Lord have mercy. Lord have mercy. Lord bless. Amen."]],
  },
  "lent-matins-concluding-hymn": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen.", "Lord have mercy. Lord have mercy. Lord bless. Amen."]],
  },
  "lent-matins-verse-of-cymbals": {
    arabic: [["يا ربُ إرحَم.", "ياربُ إرحَم ."], ["بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabb an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "lent-midnight-adam-psali-great-lent": {
    english: [["David, the son of Jesse, in his kingdom, because of fasting, received the victory.", "David Jesse's son, in his kingdom, because of fasting, he received victory."], ["Truly Enoch's mind was enlightened, and because of fasting he was taken up to heaven.", "Truly Enoch's mind, was enlightened, and because of fasting, he was taken to heaven."], ["The Lord accepted Abraham's sacrifice, and because of fasting he hosted God.", "Abraham's sacrifice, the Lord accepted, and because of fasting, he hosted God."], ["Isaac the beloved was offered to the slaughter, and because of fasting he was saved with joy.", "Isaac the beloved, was offered to the slaughter, and because of fasting, he was joyfully saved. with joy."], ["And also Jacob, whose eyes were darkened, because of fasting saw the ladder.", "And also Jacob, his eyes were darkened, and because of fasting, he saw the ladder."], ["Noah the righteous, before the flood, because of fasting made the ark.", "Noah the righteous, before the flood, because of fasting, he made the ark."], ["Suddenly the men of Nineveh, because of fasting, the Lord heard their voice.", "Suddenly the men, of Nineveh, because of fasting, the Lord heard their voices."], ["And likewise Jonah, in the belly of the whale, because of fasting came out safely.", "And likewise Jonah, in the whale's belly, because of fasting, he came out safely."], ["The lions' mouths could not approach Daniel; because of fasting they were subdued through his prayer.", "The lions' mouths, could not approach Daniel, and because of fasting, they were subdued through his prayer."], ["Samuel, the anointer of kings, because of fasting his days were increased.", "Samuel the anointer, of the kings, because of fasting, his days increased."], ["Then the three young men of Babylon, because of fasting, quenched the fire.", "Then the three children, of Babylon, because of fasting, quenched the fire."], ["My masters and fathers, the apostles, because of fasting turned the nations back.", "My masters and fathers, the Apostles, because of fasting, they restored the nations. back."], ["God of gods, Jesus the Judge, because of fasting strengthened the strugglers.", "God of all gods, Jesus the Judge, because of fasting, confirmed the strugglers."], ["Coolness and rest and repose, because of fasting, will come at the Judgment.", "Coolness and rest, and repose, because of fasting, will come on Judgment [Day]."], ["O Compassionate One towards sinners, because of fasting, forgive us our sins.", "O kind One, to the sinners, because of fasting, forgive us our sins."]],
  },
  "lent-midnight-arise-o-children": {
    english: [["As for Your people let them be blessed, a thousand thousand fold, and ten thousand ten thousand fold, doing Your will.", "But let Your people be in blessing, thousands of thousands and ten thousand times ten thousand, doing Your will."]],
  },
  "lent-midnight-commemoration": {
    english: [["Intercede on our behalf, O the Lady of us all the Mother of God, Mary the Mother of our Savior, that He may forgive us our sins.", "Intercede on our behalf, O Lady of us all, the Theotokos, Mary, the mother of our Savior, that He may forgive us our sins."], ["+ Intercede on our behalf, O four incorporeal beasts, the ministering flames of fire, that He may forgive us our sins.", "+ Intercede on our behalf, O four Incorporeal Creatures, the ministering flames of fire, that He may forgive us our sins."], ["Pray to the Lord on our behalf, my lords the fathers the patriarchs, Abraham Isaac and Jacob, that He may forgive us our sins.", "Pray to the Lord on our behalf, my lords and fathers the patriarchs, Abraham Isaac and Jacob, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our masters and fathers the Apostles, and the rest of the Disciples, that He may forgive us our sins.", "Pray to the Lord on our behalf, my masters and fathers the Apostles, and the rest of the Disciples, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, Basilidis and Evsebius, Macarius and Philotheos, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, Basilidis and Eusebius, Macarius and Philotheos, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Abba Pisura and Abba Epshoy, Abba Isi and his sister Thecla, that He may forgive us our sins.", "Pray to the Lord on our behalf, Abba Pisura and Abba Epshoi, Abba Isi and Thecla his sister, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Abba Kir and his brother John, and Barbara and Juliana and Demiana, that He may forgive us our sins.", "Pray to the Lord on our behalf, Abba Cyrus and John his brother, Barbara Juliana and Demiana, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, O struggle-mantled martyrs, Mari Pahnam and his sister Sarah, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, O struggle-mantled martyrs, Mari Pahnam and Sarah his sister, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, O struggle-mantled martyrs, the forty saints of Sebaste, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, O struggle-mantled martyrs, the forty saints of Sebastia, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, master Apanoub and Ptolomeos, Apa Ekragon and Sousennius, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, Master Apanoub and Ptolomeos, Apakragon and Sousennius, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our masters the fathers who loved their children, Abba Antony and Abba Paul, that He may forgive us our sins.", "Pray to the Lord on our behalf, my masters and fathers who loved their children, Abba Antony and Abba Paul, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, O three saints Macarii, and all their children the cross-bearers, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, O three saints Abba Macarii, and all their children the cross-bearers, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our masters the fathers the hegumens, Abba John and Abba Daniel, that He may forgive us our sins.", "Pray to the Lord on our behalf, my masters and fathers the hegumens, Abba John and Abba Daniel, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, our masters the fathers who loved their children, Abba Bishoy and Abba Paul, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, my masters the fathers who loved their children, Abba Pishoy and Abba Paul, that He may forgive us our sins."], ["Pray to the Lord on our behalf, our saintly Roman fathers, Maximus and Dometius, that He may forgive us our sins.", "Pray to the Lord on our behalf, our holy Roman fathers, Maximus and Dometius, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, Abba Apollo and Abba Apip, and our father Abba Pigimi, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, Abba Apollo and Abba Apip, and our father Abba Pijimi, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Abba Evkin and Abba Ehron, Abba Hor and Abba Phis, that He may forgive us our sins.", "Pray to the Lord on our behalf, Abba Evkin and Abba Ehron, and Abba Hor and Abba Phis, that He may forgive us our sins."], ["Pray to the Lord on our behalf, Epiphanius and Ammounios, and Arshillidis and Arsenius, that He may forgive us our sins.", "Pray to the Lord on our behalf, Epiphanius and Ammonios, and Arshillidis and Arsenius, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, our masters the ascetic fathers, Abba Abraam and George, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, my masters the ascetic fathers, Abba Abraam and George, that He may forgive us our sins."], ["Pray to the Lord on our behalf, the three hundred and eighteen gathered, at Nicea for the faith, that He may forgive us our sins.", "Pray to the Lord on our behalf, the three hundred and eighteen gathered, at Nicaea for the faith, that He may forgive us our sins."], ["Pray to the Lord on our behalf, O choirs of the cross-bearers, perfected in the wilderness, that He may forgive us our sins.", "Pray to the Lord on our behalf, O choirs of the cross-bearers, [who were] perfected in the wilderness, that He may forgive us our sins."], ["+ Pray to the Lord on our behalf, the saints of this day, everyone according to his name, that He may forgive us our sins.", "+ Pray to the Lord on our behalf, the saints of this day, each one according to their name, that He may forgive us our sins."]],
    arabic: [["إشفعي فينا (أمام الرب)، يا سيدتنا كلنا السيدة والدة الإله، مريم أُم مخلصنا، ليغفر لنا خطايانا.", "أشفعي فينا يا سيدتَنا كلِنا، السيدة والدة الإله مريم أم مخلصنا، ليغفرَ لنا خطايانا."], ["+ إشفعا فينا (أمام الرب)، يا رئيسي الملائكة الطاهرين، ميخائيل وغبريال، ليغفر لنا خطايانا.", "+ إشفعا فينا، يا رئيسي الملائكة الطاهرين، ميخائيل وغبريال، ليغفر لنا خطايانا."], ["إشفعا فينا (أمام الرب)، يا رئيسي الملائكة الطاهرين، رافائيل وسوريال، ليغفر لنا خطايانا.", "إشفعا فينا، يا رئيسي الملائكة الطاهرين، رافائيل وسوريال، ليغفر لنا خطايانا."], ["+ إشفعوا فينا (أمام الرب)، يا رؤساء الملائكة الأطهار، سداكيال وسراتيال وأنانيال، ليغفر لنا خطايانا.", "+ إشفعوا فينا، يا رؤساء الملائكة الأطهار، سداكيال وسراتيال وأنانيال، ليغفر لنا خطايانا."], ["إشفعي فينا (أمام الرب)، أيتها الكراسي والأرباب والقوات، والشيروبيم والسرافيم، ليغفر لنا خطايانا.", "إشفعي فينا، أيتها الكراسي والأرباب والقوات، والشيروبيم والسرافيم، ليغفر لنا خطايانا."], ["+ إشفعوا فينا (أمام الرب)، أيها الأربعة الحيوانات غير المتجسدين، الخدام الملتهبين ناراً، ليغفر لنا خطايانا.", "+ إشفعوا فينا، أيها الأربعة الحيوانات غير المتجسدين، الخدام الملتهبين ناراً، ليغفر لنا خطايانا."], ["إشفعوا فينا (أمام الرب)، يا كهنة الحق، الأربعة والعشرين قسيساً، ليغفر لنا خطايانا.", "إشفعوا فينا، يا كهنة الحق، الأربعة والعشرين قسيساً، ليغفر لنا خطايانا."], ["+ إشفعوا فينا (أمام الرب)، أيها العساكر الملائكية، والطغمات السمائية، ليغفر لنا خطايانا.", "+ إشفعوا فينا، أيها العساكر الملائكية، والطغمات السمائية، ليغفر لنا خطايانا."], ["إشفع فينا (أمام الرب)، أيها السابق الصابغ، يوحنا المعمدان، ليغفر لنا خطايانا.", "اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر خطايانا."], ["+ إشفعوا فينا (أمام الرب)، أيها المئة والأربعة والأربعين ألفاً، والبتول الإنجيلي، ليغفر لنا خطايانا.", "+ إشفعوا فينا، أيها المئة والأربعة والأربعين ألفاً، والبتول الإنجيلي، ليغفر لنا خطايانا."]],
    englishArabic: [["Ishfa'i feena (amam er-Rabb), ya sayyidatana kullina es-sayyida walidat el-ilah, Maryam umm mukhallisina, li-yaghfir lana khatayana.", "Ishfa'i feena ya sayyidatana kullina, es-sayyida walidat el-Ilah Maryam umm mukhallisina, li-yaghfir lana khatayana."], ["+ Ishfa'a feena (amam er-Rabb), ya ra'eesay el-mala'ika et-tahireen, Mikha'eel wa Ghobrial, li-yaghfir lana khatayana.", "+ Ishfa'a feena ra'eesay el-mala'ika et-tahireen Mikha'eel wa Ghobrial li-yaghfir lana khatayana."], ["Ishfa'a feena (amam er-Rabb), ya ra'eesay el-mala'ika et-tahireen, Rafa'eel wa Souryal, li-yaghfir lana khatayana.", "Ishfa'a feena ra'eesay el-mala'ika et-tahireen Rafa'eel wa Souryal li-yaghfir lana khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ya ru'asa' el-mala'ika el-at-har, Sadakyal wa Saratyal wa Ananyal, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ya ru'asa' el-mala'ika el-at-har, Sadakiyal wa Saratiyal wa Ananiyal, li-yaghfir lana khatayana."], ["Ishfa'i feena (amam er-Rabb), ayyatuha el-karasi wal-arbab wal-quwwat, wash-Sheroubim was-Seraphim, li-yaghfir lana khatayana.", "Ishfa'i feena, ayyatuha el-karasi wal-arbab wal-quwwat, wesh-Sharoubeem wes-Sarafeem, li-yaghfir lana khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ayyuha el-arba'at el-hayawanat ghayr el-mutagassideen, el-khuddam el-multahibeen naran, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ayyuha el-arba'at el-hayawanat ghayr el-mutagassideen, el-khuddam el-multahibeen naran, li-yaghfir lana khatayana."], ["Ishfa'u feena (amam er-Rabb), ya kahanat el-haqq, el-arba'a wal-'ishreen qasseesan, li-yaghfir lana khatayana.", "Ishfa'ou feena, ya kahanat el-haqq, el-arba'a wal-'ishreen qasseesan, li-yaghfir lana khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ayyuha el-'asakir el-mala'ikiya, wat-taghmat es-sama'iya, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ayyuha el-'asakir el-mala'ikiyya, wat-tughmat es-sama'iyya, li-yaghfir lana khatayana."], ["Ishfa' feena (amam er-Rabb), ayyuha es-sabiq es-sabigh, Youhanna el-Ma'madan, li-yaghfir lana khatayana.", "Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-Ma'madan, li-yaghfir khatayana."], ["+ Ishfa'u feena (amam er-Rabb), ayyuha el-mi'a wal-arba'a wal-arba'een alfan, wal-batoul el-ingeeli, li-yaghfir lana khatayana.", "+ Ishfa'ou feena, ayyuha el-mi'a wal-arba'a wal-arba'een alfan, wal-batoul el-ingeeli, li-yaghfir lana khatayana."]],
  },
  "lent-midnight-concluding-hymn": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen.", "Lord have mercy. Lord have mercy. Lord bless. Amen."]],
    arabic: [["نصرخ قائلين: يا ربنا يسوع المسيح بارك مياه النهر، ولتكن رحمتُكَ وسلامُكَ حصناً لشعبِك، خلصنا وارحَمنا.", "نصرخ قائلين : يا ربنا يسوع المسيح بارك مياه النهر، لتكن رحمتُكَ وسلامُكَ حصناً لشعبِك خلصنا وارحَمنا."]],
    englishArabic: [["Nasrukh qaa-ileen: ya rabbana Yasoo el-Maseeh, barik miyaah en-nahr, wal-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna.", "Nasrukh qa'ileen: ya Rabbana Yasou' el-Maseeh, barik miyah en-nahr, li-takun rahmatuka wa salamuka hisnan li-sha'bik, khallisna warhamna."]],
  },
  "lent-midnight-doxology-apostles": {
    english: [["+ Also Philip and Matthew, Bartholomew and Thomas, James the Son of Alphaeus, and Simon the Canaanite.", "+ Philip and Matthew, Bartholomew and Thomas, James the Son of Alphaeus, and Simon the Canaanite."], ["+ Matthias, who was chosen, in place of Judas, all of them and the rest, followed the Master.", "+ Matthias was chosen, instead of Judas, and was counted with the rest, who followed the Master."], ["Their voice went forth, upon the face of the whole earth, and their words have reached, the ends of the world.", "Their voices went forth, onto the face of the whole earth, and their words have reached, the ends of the world."], ["+ Pray to the Lord on our behalf, my lords and fathers the apostles, and the seventy-two disciples, that He may forgive us our sins.", "+ Pray to the Lord on our behalf / our fathers the apostles / and the seventy two disciples / that He may forgive us our sins."]],
    arabic: [["+ أطلبوا من الرب عنا، يا سادتي الآباء الرسل، والاثنان والسبعون تلميذاً، ليغفر لنا خطايانا.", "+ اطلبوا من الرب عنا، يا سادتى الآباء الرسل، والاثنين والسبعون تلميذاً، ليغفر لنا خطايانا لانك مبارك."]],
    englishArabic: [["+ Utlubou min er-Rabb 'anna, ya sadati el-aba' er-rusul, wal-ithnan was-sab'oun tilmeedhan, li-yaghfir lana khatayana.", "+ Utlubou min er-Rabb 'anna, ya sadati el-aba' er-rusul, wal-ithnayn was-sab'oun tilmeedhan, li-yaghfir lana khatayana li-annaka mubarak."]],
  },
  "lent-midnight-doxology-archangel-michael": {
    english: [["+ Intercede on our behalf: O holy archangel: Michael the head of heavenly: that He may forgive us our sins.", "+ Intercede on our behalf: O holy archangel: Michael the head of the heavenly: that He may forgive us our sins."]],
    arabic: [["+ اشفع فينا أمام الرب يا رئيس الملائكة الطاهر ميخائيل رئيس السمائيين ليغفر لنا خطايانا.", "+ اشفع فينا يارئيس الملائكة الطاهر ميخائيل رئيس السمائيين ليغفر لنا خطايانا."]],
    englishArabic: [["+ Ishfa' feena amam er-Rabb ya ra'ees el-mala'ika et-tahir Mikha'eel ra'ees es-sama'iyyeen li-yaghfir lana khatayana.", "+ Ishfa' feena ya ra'ees el-mala'ika et-tahir Mikha'eel ra'ees es-sama'iyyeen li-yaghfir lana khatayana."]],
  },
  "lent-midnight-doxology-conclusion": {
    coptic: [["+ Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ", "+ Ⲧⲉⲛϯϩⲟ ⲁⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ"]],
    english: [["+ We ask you to remember us, O our faithful advocate: before our Lord Jesus Christ: that He may forgive us our sins", "+ We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["+ نسألك أن تذكرينا، أيتها الشفيعة المؤتمنة: أمام ربنا يسوع المسيح: ليغفر لنا خطايانا", "+ نَسْألُكِ اذْكرينا أيَّتُها الشَّفيعَةُ المؤْتَمَنةُ أَمامَ ربِّنا يَسوعِ المسيحِ ليغْفِرَ لَنا خَطايانا."]],
    englishArabic: [["+ Nas'aluki an tadhkureena, ayyatuha esh-shafi'a el-mu'tamana: amama Rabbina Yasu' el-Maseeh: li-yaghfira lana khatayana", "+ Nas'aluki udhkurina ayyatuha esh-shafi'a el-mu'tamana amama Rabbina Yasu' el-Maseeh li-yaghfira lana khatayana."]],
  },
  "lent-midnight-doxology-heavenly-beings": {
    english: [["+ Intercede on our behalf, O angelic armies, and heavenly orders, that He may forgive us our sins.", "+ Intercede on our behalf, O angelic hosts, and all the heavenly multitudes, that He may forgive us our sins."]],
  },
  "lent-midnight-doxology-patriarch-bishop": {
    english: [["Likewise we magnify You, with David the Psalmist, You are the priest forever, according to the order of Melchizedek.", "Likewise we exalt you, with David the Psalmist, \"You are a priest forever, according to the order of Melchizedek.\""], ["+ Pray to the Lord on our behalf, our holy father the patriarch, Pope Abba (...), that He may forgive us our sins.", "+ Pray to the Lord on our behalf, our holy father the patriarch, Pope Abba (...) the archpriest, that He may forgive us our sins."], ["(In the presence of a bishop) Pray to the Lord on our behalf, our holy righteous father, Abba (...) the bishop (metropolitan), that He may forgive us our sins.", "(In the presence of a bishop) Pray to the Lord on our behalf, O our holy and righteous father, Abba (...) the Bishop (Metropolitan), that He may forgive us our sins."]],
  },
  "lent-midnight-doxology-philopater-mercurius": {
    coptic: [["+ Ⲧⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ Ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ", "+ Ⲧⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ Ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ"]],
    english: [["Hail to you O martyr: hail to the noble hero: hail to the struggle-bearer: Philopater Mercurius", "Hail to you O martyr: hail to the courageous hero: hail to the struggle bearer: Philopater Mercurius."]],
  },
  "lent-midnight-doxology-pope-kyrillos": {
    coptic: [["+ Ⲧⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ Ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ", "+ Ⲧⲱⲃϩ Ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ Ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: Ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ"]],
    english: [["+ Pray to the Lord on our behalf: our holy father the patriarch: Abba Kyrillos the sixth: that He may forgive us our sins", "+ Pray to the Lord on our behalf: our holy father the patriarch: Papa Abba Kyrillos the Sixth: that He may forgive us our sins."]],
  },
  "lent-midnight-doxology-sat-sun": {
    coptic: [["Ϯⲥⲱⲟ̀ⲩⲛ ϫⲉ Ⲛ̀ⲑⲟⲕ ⲟ̀ⲩⲁ̀ⲅⲁⲑⲟⲥ: ⲛ̀ⲣⲉϥϣⲉⲛϩⲏⲧ ⲟⲩⲟϩ ⲛ̀ⲛⲁⲏ̀ⲧ: ⲁ̀ⲣⲓⲡⲁⲙⲉⲩ̀ⲓ̀ ϧⲉⲛ ⲡⲉⲕⲛⲁⲓ: ϣⲁ ⲉ̀ⲛⲉϩ ⲛ̀ⲧⲉ ⲡⲓⲉ̀ⲛⲉϩ.", "Ϯⲥⲱⲟ̀ⲩⲛ ϫⲉ Ⲛ̀ⲑⲟⲕ ⲟ̀ⲩⲁ̀ⲅⲁⲑⲟⲥ: ⲛ̀ⲣⲉϥϣⲉⲛϩⲏⲧ ⲟⲩⲟϩ ⲛ̀ⲛⲁⲏ̀ⲧ: ⲁ̀ⲣⲓⲡⲁⲙⲉⲩ̀ⲓ̀ ϧⲉⲛ ⲡⲉⲕⲛⲁⲓ: ϣⲁ ⲉ̀ⲛⲉϩ ⲛ̀ⲧⲉ ⲛⲓⲉ̀ⲛⲉϩ."]],
    english: [["For I know that You are good, compassionate and patient, remember me in Your mercy, forever and ever.", "I know that You are good / compassionate and merciful. / Remember me in Your mercy / forever and ever."], ["I ask You O my Lord Jesus, do not destroy me in Your anger, and likewise also in Your wrath, do not chasten me for my ignorance.", "I ask You, O my Lord Jesus / do not chastise me with Your anger / nor also with Your wrath / do not chastise my ignorance."]],
  },
  "lent-midnight-doxology-st-mark-2": {
    arabic: [["+ أُطلب من الرب عنا، يا ناظر الإله الإنجيلي، مرقس الرسول، ليغفر لنا خطايانا.", "+ اطلب من الرب عنا ياناظر الإله الإنجيلي مرقس الرسول ليغفر لنا خطايانا."]],
  },
  "lent-midnight-doxology-weekday-lent": {
    english: [["And we too should also fast, with purity and righteousness, and let us also pray, proclaiming and saying.", "And we too let us fast, with purity and righteousness, and let us pray, proclaiming and saying:"]],
  },
  "lent-midnight-first-canticle-lobsh": {
    arabic: [["+ بشفاعات، والدة الإله القديسة مريم، يا رب إنعم لنا، بمغفرة خطايانا.", "+ بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["+ Bi-shafa'at, walidat el-ilah el-qiddisa Maryam, ya Rabb in'im lana, bi-maghfirat khatayana.", "+ Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "lent-midnight-fourth-canticle": {
    arabic: [["+ يفتخر القديسون بمجد هلليلويا. ويتهللون على مضاجعهم.", "+ يفتخر القديسون بمجد الليلويا ويتهللون على مضاجعهم"]],
    englishArabic: [["+ Yaftakhir el-qiddisoon bi-magd halleluia. Wa yatahallaloon 'ala madagi'ihim.", "+ Yaftakhir el-qiddisoun bi-magd Hallelouia, wa yatahallaloun 'ala madagi'ihim"]],
  },
  "lent-midnight-friday-theotokia-part-2": {
    arabic: [["ليس من يُشبهك يا مريم العذراء الملائكة تكرمك والسارافيم تُمجدك.", "ليس من يُشبهِك، يا مريم العذراء، الملائكة تكرمِك، والسِّرافيم تُمجدِك."], ["+ لأن الذي على الشاروبيم أتى وتجسد منك حتى وحّدنا به من قبل صلاحه.", "+ لأن الذي على الشاروبيم، أتى وتجسد منكِ، حتى إتحدنا به، من قِبَل صلاحه."]],
    englishArabic: [["Laysa man yushbihuki ya Maryam el-'Adhra' el-mala'ika tukrimuki wes-Sarafim tumaggiduki.", "Laysa man yushbihuki, ya Maryam el-'Adhra', el-mala'ika tukrimuki, wes-Sarafeem tumaggiduki."], ["+ Li-anna alladhi 'ala esh-Sharoubim ata wa tagassad minki hatta wahhadana bihi min qibal salahihi.", "+ Li-anna alladhi 'ala esh-Sharoubeem, ata wa tagassad minki, hatta ittahadna bih, min qibal salahih."]],
  },
  "lent-midnight-friday-theotokia-part-4": {
    english: [["You are the rational city, where the Most High One lived, who sits upon the throne, of the cherubim.", "You are the rational city, in where the Most High One lived, Who sits upon the throne, of the cherubim."]],
    arabic: [["+ والسارافيم يمجدونه حملته على ذراعيك المعطي طعاماً لكل ذي جسد من قبل رأفته.", "+ والسِّرافيم يمجدونه، حَملتِه على ذراعيكِ، المعطي طعاماً لكل ذي جسد، من قِبَل رأفته."]],
    englishArabic: [["+ Wes-Sarafim yumaggidounahu hamaltihi 'ala dhira'ayki el-mu'ti ta'aman li-kull dhi gasad min qibal ra'fatihi.", "+ Wes-Sarafeem yumaggidounah, hamaltihi 'ala dhira'ayki, el-mu'ti ta'aman li-kull dhi gasad, min qibal ra'fatih."]],
  },
  "lent-midnight-friday-theotokia-part-7": {
    coptic: [["+ Ϯⲥⲱⲟⲩⲛ ⲅⲁⲣ ⲛ̀ϩ̀ⲗⲓ ⲁⲛ: ⲉ̀ⲃⲏⲗ ⲉ̀ϯⲥ̀ⲙⲏ ⲛ̀ⲧⲉ ⲡⲓⲁⲅⲅⲉⲗⲟⲥ: ⲉϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛⲏⲓ ⲛ̀ⲟⲩⲣⲁϣⲓ: ⲉϥⲛⲏⲟⲩ ⲛⲏⲓ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲧ̀ⲫⲉ.", "+ Ϯⲥⲱⲟⲩⲛ ⲅⲁⲣ ⲛ̀ϩ̀ⲗⲓ ⲁⲛ: ⲉ̀ⲃⲏⲗ ⲉ̀ⲧ̀ⲥ̀ⲙⲏ ⲛ̀ⲧⲉ ⲡⲓⲁⲅⲅⲉⲗⲟⲥ: ⲉϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛⲏⲓ ⲛ̀ⲟⲩⲣⲁϣⲓ: ⲉϥⲛⲏⲟⲩ ⲛⲏⲓ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲧ̀ⲫⲉ."]],
  },
  "lent-midnight-friday-watos-lobsh": {
    coptic: [["+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛⲉⲣⲭⲟⲣⲉⲩⲓⲛ: ⲛⲉⲙ Ⲉⲗⲓⲥⲁⲃⲉⲧ ⲧⲉⲥⲥⲩⲅⲅⲉⲛⲏⲥ: ϫⲉ ⲧⲉⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲑⲟ ϧⲉⲛ ⲛⲓϩⲓⲟ̀ⲙⲓ: ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲡ̀ⲟⲩⲧⲁϩ ⲛ̀ⲧⲉ ⲧⲉⲛⲉϫⲓ.", "+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛⲉⲣⲭⲟⲣⲉⲩⲓⲛ: ⲛⲉⲙ Ⲉⲗⲓⲥⲁⲃⲉⲧ ⲧⲉⲥⲥⲩⲅⲅⲉⲛⲏⲥ: ϫⲉ ⲉⲧⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲑⲟ ϧⲉⲛ ⲛⲓϩⲓⲟ̀ⲙⲓ: ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲧⲉ ⲡ̀ⲟⲩⲧⲁϩ ⲛ̀ⲧⲉ ⲧⲉⲛⲉϫⲓ."]],
    arabic: [["أنت مضيئة أكثر من الشمس أنت هي ناحية المشرق التي ينتظرها الأبرار بفرح وتهليل.", "أنتِ مضيئة أكثر من الشمس، أنتِ هي ناحية المشرق، التي ينظرها الأبرار، بفرح وتهليل."], ["+ نسألك اذكرينا أيتها الشفيعة المؤتمنة أمام ربنا يسوع المسيح ليغفر لنا خطايانا.", "+ نسألكِ أن تذكرينا، أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا."]],
    englishArabic: [["Anti mudi'a akthar min esh-shams anti hiya nahiyat el-mashriq allati yantaziruha el-abrar bi-farah wa tahleel.", "Anti mudee'a akthar min esh-shams, anti hiya nahiyat el-mashriq, allati yanzuruha el-abrar, bi-farah wa tahleel."], ["+ Nas'aluki udhkurina ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana.", "+ Nas'aluki an tadhkureena ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana."]],
  },
  "lent-midnight-friday-watos-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto the ages of the ages, Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والابن. والروح القدس. الآن وكل أوان. والى دهر الداهرين آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rooh el-Qudus, el-an wa kulla awan, wa ila dahr ed-dahireen ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "lent-midnight-friday-watos-theotokia-conclusion": {
    arabic: [["مُبارَك الآب والإبن، والرُّوح القُدُس، الثالوث الكامل، نسجد له ونُمجِّدهُ.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarak el-Ab wal-Ibn, war-Rooh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "lent-midnight-monday-adam-lobsh": {
    english: [["Through Mary, the Mother of God, Adam was restored again, to his authority.", "Through Mary, the Theotokos, Adam was restored again, to his authority."]],
  },
  "lent-midnight-monday-adam-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
  },
  "lent-midnight-monday-adam-theotokias-conclusion": {
    english: [["Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.", "Your mercies O my God: are countless: and exceedingly plenteous: are Your compassions."], ["And me too, the sinner, teach me O my Master, to offer repentance.", "And I too: the sinner: teach me O my Lord: to offer repentance."], ["For You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.", "For You do not desire: the death of a sinner: but rather that he return: and that his soul may live."], ["For You are good, and merciful, let Your compassion, speedily come to us.", "For You are good: and merciful: let Your compassions: speedily come to us."], ["O King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.", "O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins."], ["Disperse the enemies, of the Church, and fortify her that she, may not be shaken forever.", "Disperse the enemies, of the Church, and fortify her, that she may never be shaken. forever."]],
  },
  "lent-midnight-monday-psali": {
    coptic: [["Ⲝ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲁ̀ⲗⲏⲑⲱⲥ: ⲱ̀ Ⲡⲁϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ.", "Ⲝ̀ⲙⲁⲣⲱⲟⲩⲧ ⲁ̀ⲗⲏⲑⲱⲥ: ⲱ̀ Ⲡⲁϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ."]],
    english: [["+ God is Immanuel, the True Food, the Immortal, Tree of Life.", "+ God is Emmanuel, the True Food, the Immortal, Tree of Life."], ["+ The True Lamb, of God the Father, have mercy upon us, in Your kingdom.", "+ O You the true Lamb of God the Father, have mercy upon us, in Your Kingdom."], ["For the mouth of Your Father, has given witness unto You, saying \"You are my Son, and today I have begotten You.\"", "For the mouth of Your Father, has given witness unto You, saying “You are My Son, and today I begotten to You.”"], ["You are surrounded, by the cherubim, and the seraphim, and they cannot see You.", "You are surrounded, by the cherubim, and the seraphim, and they can not see You."]],
    arabic: [["كل من يقول ياربي يسوع كمن بيده سيف يصرع العدو.", "كل مَنْ يقول، \"يا ربي يسوع،\" كمَنْ بيده سيف، يصرع العدو."], ["كثيرة جداً هي رأفاتك أيها الحاكم العادل ياربي يسوع.", "كثيرة جداً، هي رأفاتك، أيها الحاكم العادل، يا ربي يسوع."], ["في القليل القليل نذكرك ونمجد اسمك ياربي يسوع.", "في القليل القليل، نذكرك، ونُمجد أسمك، يا ربي يسوع."], ["+ فليكن إسم الرب فينا ليضيء علينا في إنساننا الداخلي.", "+ فليكن إسم الرب، فينا، ليضئ علينا، في إنساننا الداخلي."], ["مبارك أنت بالحقيقة ياربي يسوع مع أبيك الصالح والروح القدس.", "مُبارَك أنت بالحقيقة، يا ربي يسوع، مع أبيك الصالح، والرُّوح القُدُس."], ["+ عنبر كثير الثمن هو إسمك القدوس ياربي يسوع.", "+ عنبر، كثير الثمن، هو إسمك القدوس، يا ربي يسوع."], ["يقوم حولك الشاروبيم والسارافيم ولا يستطيعون أن ينظروك.", "يقوم حولك، الشاروبيم، والسِّرافيم، ولا يستطيعون أن ينظروك."], ["أترك لنا نحن أيضاً الآن هذا الحجر ليضيء علينا في أنساننا الداخلي.", "أُترك لنا نحن أيضاً، الآن هذا الحجر، ليضئ علينا، في إنساننا الداخلي."], ["+ زينة نفوسنا وفرح قلوبنا هو اسمك القدوس ياربي يسوع.", "+ زينة نفوسنا، وفرح قلوبنا، هو إسمك القدوس، يا ربي يسوع."], ["+ أيها المتحنن الرؤوف الكثير الرحمة ياربي يسوع.", "+ أيها المتحنن، الرؤوف، الكثير الرحمة، يا ربي يسوع."], ["أنظر إلينا ياربي يسوع بعين التحنن التي لصلاحك.", "أنظر إلينا، يا ربي يسوع، بعين التحنن، التي لصلاحك."], ["وأغرس فينا قلباً مستقيماً لكي نباركك ياربي يسوع.", "وأغرس فينا، قلباً مستقيماً، لكي نباركك، يا ربي يسوع."], ["+ أبتهل إليك ياربي يسوع أن ترحمنا في ملكوتك.", "+ أبتهل إليك، يا ربي يسوع، أن ترحمنا، في ملكوتك."]],
    englishArabic: [["+ Fal-yakun ism er-Rabb fina li-yudi' 'alayna fi insanina ed-dakhili.", "+ Fal-yakun ism er-Rabb, feena, li-yudi' 'alayna, fi insanina ed-dakhili."], ["Yaqoum hawlak esh-Sharoubim wes-Sarafim wa la yastati'oun an yanzurouk.", "Yaqoum hawlak, esh-Sharoubeem, wes-Sarafeem, wa la yastatee'oun an yanzurouk."], ["Utruk lana nahnu aydan el-an hadha el-hagar li-yudi' 'alayna fi insanina ed-dakhili.", "Utruk lana nahnu aydan, el-an hadha el-hagar, li-yudi' 'alayna, fi insanina ed-dakhili."]],
  },
  "lent-midnight-monday-theotokia-part-1": {
    english: [["While Adam was sad, God was pleased, to bring him back, to his authority.", "While Adam was sad, the Lord was pleased, to restore him again, to his authority."]],
  },
  "lent-midnight-monday-theotokia-part-3": {
    english: [["Jesus Christ the Word, who came and took flesh, He dwelt in us, and we saw His glory.", "Jesus Christ the Word, who came and took flesh, He dwelt among us, and we saw His glory."]],
  },
  "lent-midnight-monday-theotokia-part-4": {
    english: [["Therefore Isaiah, the great prophet, cried out proclaiming, and saying.", "Therefore Isaiah, the great prophet, shouted out proclaiming, and saying."], ["The powerful God, of authority, and the Angel of, the great counsel.”", "He is God the powerful, and the Counselor, the angel of, the great wisdom."]],
    arabic: [["الإله القوي، المتسلط، وملاكُ المشورة، العُظمى.\"", "لإله القوي، المتسلط، وملاكُ المشورة، العُظمى."]],
    englishArabic: [["El-ilah el-qawi, el-mutasallit, wa malak el-mashoura, el-'uzma.", "Li-Ilah el-qawi, el-mutasallit, wa malak el-mashoura, el-'uzma."]],
  },
  "lent-midnight-monday-theotokia-part-6": {
    english: [["+ But He is of one nature, one hypostasis, and one person, for God the Word.", "+ But He is one nature, one hypostasis, and one person, for God the Word."]],
    arabic: [["+ بل بطبيعة واحدة، وأُقنوم واحد، وشخص واحد، لله الكلمة.", "+ بل طبيعة واحدة، وأُقنوم واحد، وشخص واحد، لله الكلمة."]],
    englishArabic: [["+ Bal bi-tabee'a wahida, wa uqnoum wahid, wa shakhs wahid, lillah el-kalima.", "+ Bal tabee'a wahida, wa uqnoum wahid, wa shakhs wahid, lillah el-Kalima."]],
  },
  "lent-midnight-monday-theotokia-part-7": {
    english: [["In order to bring Adam, the first man, who was made of dust, back to Paradise.", "In order to bring Adam, the first man, made of dust, back to Paradise."]],
  },
  "lent-midnight-monday-theotokia-part-8": {
    english: [["+ Proclaiming and saying, “Glory to God in the highest, peace on earth, and goodwill toward men.”", "+ Proclaiming and saying, “Glory to God in the highest, on earth peace, and goodwill toward men.”"]],
  },
  "lent-midnight-monday-theotokia-part-9": {
    english: [["+ So David the psalmist, and the holy one, rose up and took his, spiritual harp.", "+ So David the psalmist, and the saint, rose up and took, his spiritual stringed instrument."], ["He went to the church, the house of the angels, he praised and chanted to, the Holy Trinity.", "He went to the temple, the house of the angels, he praised and sang to, the Holy Trinity."], ["+ Saying “In Your light, O Lord we will see light, let Your mercy come, to those who know You.”", "+ Saying “In Your light, O Lord shall we see light, let Your mercy come, to those who know You.”"], ["O true Light, that shines upon, every man, that comes into the world.", "O True Light, that gives light, to every man, that comes into the world."], ["+ You have come into the world, through Your love for man, and all the creation, rejoiced at Your coming.", "+ You came into the world, through Your love for mankind, and all the creation rejoiced, at Your coming."], ["You have saved Adam, from the seduction, and delivered Eve, from the pangs of death.", "You have saved Adam, from deception, and delivered Eve, from the pangs of death."]],
    arabic: [["الله هو نور، وساكن في النور، تسبحه، ملائكة النور.", "الله هو نور، وساكن في النور، وتسبحه، ملائكة النور."]],
    englishArabic: [["Allah huwa nour, wa sakin fin-nour, tusabbihuhu, mala'ikat en-nour.", "Allah huwa nour, wa sakin fin-nour, wa tusabbihuhu, mala'ikat en-nour."]],
  },
  "lent-midnight-psali-watos-three-holy-youth": {
    english: [["+ Pray to the Lord on our behalf, O three saintly children, Shadrach Meshach and Abed-Nego, that He may forgive us our sins.", "+ Pray to the Lord on our behalf: the three holy youth: Shadrach, Meshach, Abednego: that He may forgive us our sins."]],
    arabic: [["+ أُطلبوا من الرب عنا، أيها الثلاثة فتية القديسين، سدراك وميساك وأبدناغو، ليغفر لنا خطايانا.", "+ اطلبوا من الربّ عنا / أيها الثلاثة فتية القديسين / سدراك وميساك وعبدناغو / ليغفر لنا خطايانا."]],
    englishArabic: [["+ Utlubu min er-Rabb 'anna, ayyuha eth-thalatha fitya el-qiddiseen, Sadrak wa Meesak wa Abednagho, li-yaghfir lana khatayana.", "+ Utlubu min er-Rabb 'anna, ayyuha eth-thalathat fitya el-qiddiseen, Sadrak wa Meesak wa 'Abednagho, li-yaghfir lana khatayana."]],
  },
  "lent-midnight-psalmody-conclusion": {
    arabic: [["يا ربُّ إرحَم.", "ياربُ إرحَم ."]],
  },
  "lent-midnight-saturday-theotokia-part-6": {
    english: [["Wherein are the tablets, of the covenant, and the golden vessel, where the manna hidden in it.", "Wherein are the tablets / of the covenant / and the golden vessel / where the manna was hidden. in it."]],
  },
  "lent-midnight-saturday-watos-lobsh-2": {
    english: [["We exult you worthily, with Elizabeth your cousin: saying, “Blessed are you among women, and blessed is the fruit of your womb.”", "We exalt you worthily, with Elizabeth your cousin, saying Blessed are you among women, and blessed is the fruit of your womb."]],
    arabic: [["نُعظِّمُكِ بإستحقاقٍ، مع أليصابات نَسيبَتكِ قائلين، \"مُباركةٌ أنتِ في النساء، ومُباركةٌ هي ثمرة بطنكِ.\"", "نُعظِّمُكِ باستحقاق مع أليصابات نسيبتك، مباركة أنت في النساء ومباركة هي ثمرة بطنك."]],
    englishArabic: [["Nu'azzimuki bi-istihqaq, ma'a Aleesabat naseebatiki qa'ileen, \"Mubaraka anti fin-nisa', wa mubaraka hiya thamarat batniki.\"", "Nu'azzimuki bi-istihqaq ma'a Aleesabat naseebatiki Mubaraka anti fin-nisa' wa mubaraka hiya thamarat batniki."]],
  },
  "lent-midnight-saturday-watos-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto the ages of the ages, Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والابن. والروح القدس. الآن وكل أوان. والى دهر الداهرين آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rooh el-Qudus, el-an wa kulla awan, wa ila dahr ed-dahireen ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "lent-midnight-saturday-watos-theotokia-conclusion": {
    arabic: [["مُبارَك الآب والإبن، والرُّوح القُدُس، الثالوث الكامل، نسجد له ونُمجِّدهُ.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarak el-Ab wal-Ibn, war-Rooh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "lent-midnight-second-canticle-lobsh": {
    arabic: [["بشفاعات، والدة الإله، القديسة مريم، يا رب إنعم لنا، بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at, walidat el-ilah, el-qiddisa Maryam, ya Rabb in'im lana, bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "lent-midnight-sunday-adam-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
  },
  "lent-midnight-sunday-adam-theotokias-conclusion": {
    english: [["Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.", "Your mercies O my God: are countless: and exceedingly plenteous: are Your compassions."], ["And me too, the sinner, teach me O my Master, to offer repentance.", "And I too: the sinner: teach me O my Lord: to offer repentance."], ["For You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.", "For You do not desire: the death of a sinner: but rather that he return: and that his soul may live."], ["For You are good, and merciful, let Your compassion, speedily come to us.", "For You are good: and merciful: let Your compassions: speedily come to us."], ["O King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.", "O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins."], ["Disperse the enemies, of the Church, and fortify her that she, may not be shaken forever.", "Disperse the enemies, of the Church, and fortify her, that she may never be shaken. forever."]],
  },
  "lent-midnight-sunday-psali": {
    coptic: [["+ Ⲑⲁⲓ ⲧⲉ Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ: ϯⲡⲟⲗⲓⲥ ⲙ̀Ⲡⲉⲛⲛⲟⲩϯ: ⲡ̀ϩⲁⲣⲙⲁ ⲛ̀ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ: ⲉⲧⲟⲓ ⲛ̀ⲟⲩⲑⲟ ⲛ̀ⲣⲏϯ.", "+ Ⲑⲁⲓ ⲧⲉ Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ: ⲧ̀ⲡⲟⲗⲓⲥ ⲙ̀Ⲡⲉⲛⲛⲟⲩϯ: ⲡ̀ϩⲁⲣⲙⲁ ⲛ̀ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ: ⲉⲧⲟⲓ ⲛ̀ⲟⲩⲑⲟ ⲛ̀ⲣⲏϯ."], ["Ⲕⲩⲣⲓⲟⲥ ⲡⲓⲣⲉϥⲛⲟϩⲉⲙ: ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ϩⲁⲣⲟⲥ: ⲁⲥⲟ̀ϩⲓ ⲉⲥϣⲟⲧⲉⲙ: ⲙ̀ⲡⲉⲥⲣⲏϯ ⲕⲁⲗⲱⲥ.", "Ⲕⲩⲣⲓⲟⲥ ⲡⲓⲣⲉϥⲛⲟϩⲉⲙ: ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ϣⲁⲣⲟⲥ: ⲁⲥⲟ̀ϩⲓ ⲉⲥϣⲟⲧⲉⲙ: ⲙ̀ⲡⲉⲥⲣⲏϯ ⲕⲁⲗⲱⲥ."], ["+ Ⲙⲁⲣⲓⲁ ϯⲥⲉⲙⲛⲏ: ⲡ̀ⲟⲩⲛⲟϥ ⲛ̀ⲛⲓⲇⲓⲕⲉⲟⲥ: ⲟⲩⲟϩ ⲛ̀ⲁ̀ⲗⲏⲑⲓⲛⲏ: ⲫ̀ⲣⲁϣⲓ ⲛ̀ⲛⲓⲡⲓⲥⲧⲟⲥ.", "+ Ⲙⲁⲣⲓⲁ ϯⲥⲉⲙⲛⲉ: ⲡ̀ⲟⲩⲛⲟϥ ⲛ̀ⲛⲓⲇⲓⲕⲉⲟⲥ: ⲟⲩⲟϩ ⲛ̀ⲁ̀ⲗⲏⲑⲓⲛⲏ: ⲫ̀ⲣⲁϣⲓ ⲛ̀ⲛⲓⲡⲓⲥⲧⲟⲥ."]],
    english: [["Help me, O my Lord, Jesus the Compassionate, to glorify my Lady, Your Mother the bride.", "Help me, my Lord, / Jesus the Compassionate, / to glorify my Lady, / Your Mother the bride."], ["+ Isaiah said to us, with a joyful voice, that \"She will give birth to, Immanuel for us.\"", "+ Isaiah said to us, / with a joyful voice, / that \"She will give birth to / Emmanuel for us.\""], ["+ This is Jerusalem, the city of our God, the chariot of the cherubim, of many types.", "+ This is Jerusalem, / the city of our God, / the chariot of many kinds / of the Cherubim. of many types."], ["Ezekiel has witnessed, and revealed this to us, saying, \"I saw a door, toward the East.", "Ezekiel has witnessed / and revealed this to us, / saying, \"I saw a door / to the East.\""]],
    arabic: [["أنتِ هي القبة، والتابوت، التي صنعها موسى، بعظم كرامة.", "أنتِ هي القبة، التي صنعها موسى، بعِظَم كرامة، والتابوت."], ["مُتعال عن الأفكار، السماوية، هذا الأمر العجيب، الذي للغطاء.", "مُتعال عن الأفكار، السمائية، هذا الأمر العجيب، الذي للغطاء."], ["+ مُرتفعة أنت جداً، أكثر من الشاروبيم، ومكرمة أكثر، من السَرافيم.", "+ مُرتفعة أنت جداً، أكثر من الشاروبيم، ومكرمة أكثر، من السيرافيم."], ["الساكن في النور، الذي لا يُدنى منه، أظهر آياته، أنتِ أرضعتيه اللبن.", "الساكن في النور، الذي لا يُدنى منه، أظهر آياته، وأرضعتِه اللبن."]],
    englishArabic: [["Anti hiya el-qubba, wat-tabout, allati sana'aha Mousa, bi-'izam karama.", "Anti hiya el-qubba, allati sana'aha Mousa, bi-'izam karama, wat-tabout."], ["Muta'al 'an el-afkar, es-samawiya, hadha el-amr el-'agib, alladhi lil-ghita'.", "Muta'al 'an el-afkar es-sama'iyya hadha el-amr el-'agib alladhi lil-ghita'."], ["+ Murtafi'a anti giddan, akthar min esh-Sharoubim, wa mukarrama akthar, min es-Sarafim.", "+ Murtafi'a anti giddan, akthar min esh-Sharoubeem, wa mukarrama akthar, min es-Sarafeem."], ["Es-sakin fin-nour, alladhi la yudna minhu, azhar ayatihi, anti arda'tihi el-laban.", "Es-sakin fin-nour, alladhi la yudna minhu, azhar ayatihi, wa arda'tihi el-laban."]],
  },
  "lent-midnight-sunday-psali-adam-lord-jesus": {
    english: [["Our Savior, who know her, delighted to, dwell in her.\nMany are, your praises, more than the sand of the sea, O Mary our lady.", "Our Savior, who knows her, delighted to, dwell in her. Many are, your praises, more than the sand of the sea, O Mary our lady."]],
  },
  "lent-midnight-sunday-psali-lord-jesus": {
    coptic: [["Ⲉⲕⲉⲉⲣϧⲏⲓⲃⲓ ⲉ̀ϫⲱⲓ: ϧⲁ ⲑ̀ϧⲏⲓⲃⲓ ⲛ̀ⲧⲉ ⲛⲉⲕⲧⲉⲛϩ: Ⲡⲁⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅: ⲁ̀ⲣⲓⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲓ.", "Ⲉⲕⲉⲣϧⲏⲓⲃⲓ ⲉ̀ϫⲱⲓ: ϧⲁ ⲧ̀ϧⲏⲓⲃⲓ ⲛ̀ⲧⲉ ⲛⲉⲕⲧⲉⲛϩ: Ⲡⲁⲟ̅ⲥ̅ Ⲓⲏ̅ⲥ̅: ⲁ̀ⲣⲓⲃⲟⲏ̀ⲑⲓⲛ ⲉ̀ⲣⲟⲓ."]],
    english: [["You who carry the sins of the world: Have mercy upon me: My Lord Jesus Christ: help me.", "You who carries the sins of the world: Have mercy upon me: my Lord Jesus Christ: help me."], ["+ Forgive me the multitude: of my iniquities: My Lord Jesus: help me.", "+ Forgive me the multitude: of my iniquity: my Lord Jesus: help me."], ["Oh, how beloved: is Your holy name: My Lord Jesus: help me.", "O how beloved: is Your holy name: my Lord Jesus: help me."]],
  },
  "lent-midnight-sunday-theotokia-part-1": {
    english: [["You are called righteous, O blessed one, among women, the second tabernacle.", "You are called truly, O blessed one, among women, the Second Tabernacle."], ["Whereupon is, the ten commandments, these which are written, by the finger of God.", "Of the covenant, and the Ten Commandments, which are written, by the finger of God."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["+ He made it with glory, as commanded by the Lord, according to the patterns, shown unto him.", "+ He made it with glory, as commanded by the Lord, and according to the pattern, shown unto him."]],
    arabic: [["مدعوة صديقة، أيتها المباركة، في النساء، القبة الثانية.", "مدعوة أنت بالحقيقة، أيتها المباركة، في النساء، القبة الثانية."], ["والعشر، الكلمات، هذة المكتوبة، بأصبع الله.", "العهد والعشر، الكلمات، هذة المكتوبة، بأصبع الله."]],
    englishArabic: [["Mad'ouwa siddeeqa, ayyatuha el-mubaraka, fin-nisa', el-qubba eth-thaniya.", "Mad'ouwwa anti bil-haqeeqa, ayyatuha el-mubaraka, fin-nisa', el-qubba eth-thaniya."], ["Wal-'ashr, el-kalimat, hadhihi el-maktouba, bi-isba' Allah.", "El-'ahd Wal-'ashr el-kalimat hadhihi el-maktouba bi-isba' Allah."]],
  },
  "lent-midnight-sunday-theotokia-part-10": {
    arabic: [["ولكِ سعيٌ، بدالة، أكثر من الشاروبيم، والسارافيم.", "ولك سعيً، بدالة، أكثر من الشاروبيم، والسيرافيم."]],
    englishArabic: [["Wa laki sa'yun, bi-dalla, akthar min esh-Sharoubim, wes-Sarafim.", "Wa laki sa'yun, bi-dalla, akthar min esh-Sharoubeem, wes-Sarafeem."]],
  },
  "lent-midnight-sunday-theotokia-part-11": {
    english: [["+ They did not attain, your high blessedness, O you who are clothed in, the glory of the Lord of Hosts.", "+ They did not attain, your high blessedness, O who is clothed in, the glory of the Lord of Hosts."]],
    arabic: [["+ والسارافيمُ، ذوو السِتَّةِ الأجنحةِ، يُرفرفونَ، عليكِ بتهليل.", "+ والسيرافيم، ذوو الستة الأجنحة، يرفرفون عليكِ، بتهليل."]],
    englishArabic: [["+ Wes-Sarafim, dhawou es-sittat el-agniha, yurafrifoun, 'alayki bi-tahleel.", "+ Wes-Sarafeem, dhawou es-sittat el-agniha, yurafrifoun 'alayki, bi-tahleel."]],
  },
  "lent-midnight-sunday-theotokia-part-12": {
    coptic: [["Ⲁ̀ⲣⲉϯϩⲓⲱⲧ: ⲙ̀ⲫ̀ⲣⲁϣⲓ ⲛⲉⲙ ⲡ̀ⲑⲉⲗⲏⲗ: ⲁ̀ⲣⲉⲙⲟⲣϯ ⲛ̀ⲟⲩϫⲟⲙ: ⲱ̀ ϯϣⲉⲣⲓ ⲛ̀Ⲥⲓⲱⲛ.", "Ⲁ̀ⲣⲉϯϩⲓⲱⲧ: ⲙ̀ⲫ̀ⲣⲁϣⲓ ⲛⲉⲙ ⲡ̀ⲑⲉⲗⲏⲗ: ⲁ̀ⲣⲉⲙⲟⲣϯ ⲛ̀ⲟⲩϫⲟⲙ: ⲱ̀ ⲧ̀ϣⲉⲣⲓ ⲛ̀Ⲥⲓⲱⲛ."]],
    english: [["Your glory O Mary, is higher than heaven, you are more honored than the earth, and its inhabitants.", "Your glory O Mary, is higher than the heaven, you are more honored than the earth, and its inhabitants."], ["And restored him, to Paradise, the place of joy, and the dwelling of the righteous.", "And restored him, to Paradise, the place of joy, and dwelling of the righteous."]],
  },
  "lent-midnight-sunday-theotokia-part-13": {
    coptic: [["+ Ⲛⲁⲓ ⲧⲏⲣⲟⲩ ⲉⲩⲥⲟⲡ: ⲥⲉⲉⲣⲥⲩⲙⲉⲛⲓⲛ ⲛⲁⲛ: ⲙ̀ⲡⲉϫⲓⲛⲙⲓⲥⲓ ⲛ̀ϣ̀ⲫⲏⲣⲓ: ⲱ̀ Ⲙⲁⲣⲓⲁ ϯⲡⲁⲣⲑⲉⲛⲟⲥ.", "+ Ⲛⲁⲓ ⲧⲏⲣⲟⲩ ⲉⲩⲥⲟⲡ: ⲥⲉⲉⲣⲥⲩⲙⲙⲉⲛⲓⲛ ⲛⲁⲛ: ⲙ̀ⲡⲉϫⲓⲛⲙⲓⲥⲓ ⲛ̀ϣ̀ⲫⲏⲣⲓ: ⲱ̀ Ⲙⲁⲣⲓⲁ ϯⲡⲁⲣⲑⲉⲛⲟⲥ."]],
    arabic: [["التابوتُ غيرُ الدنِسِ، المُصفَّحُ بالذهبِ، مِنْ كُلِّ ناحيةٍ، والغطاءُ الكاروبيُّ.", "التابوت الغير الدنس، المصَّفح بالذهب، من كل ناحية، والغطاء الكاروبي."]],
    englishArabic: [["Et-tabout ghayr ed-danis, el-musaffah bidh-dhahab, min kull nahiya, wal-ghita' el-karoubi.", "Et-tabout el-ghayr ed-danis el-musaffah bidh-dhahab min kull nahiya wal-ghita' el-karoubi."]],
  },
  "lent-midnight-sunday-theotokia-part-14": {
    english: [["+ There was an archpriest, in the tabernacle, offering sacrifices, on account of the people's sins.", "+ There was an archpriest, in the tabernacle, offering sacrifices, on account of the peoples sins."]],
    arabic: [["كانَ في القُبَّةِ، منارةٌ مِنْ ذهبٍ، وسبعةُ سُرُجٍ، تُضيءُ عليها.", "كان في القبة، منارة من ذهب، وسبعة سُرج، تضئ عليها."], ["+ كانَ في القُبَّةِ، عصا هارون، هذهِ التي أزهرتْ، بغيرِ غرسٍ ولا سقيٍ.", "+ كان في القبة، عصا هرون، هذه التي أزهرت، بغير غرس ولا سقي."]],
    englishArabic: [["Kan fil-qubba, manara min dhahab, wa sab'at surug, tudi' 'alayha.", "Kan fil-qubba manara min dhahab wa sab'at surug tudee' 'alayha."], ["+ Kan fil-qubba, 'asa Haroun, hadhihi allati azharat, bi-ghayr ghars wa la saqy.", "+ Kan fil-qubba 'asa Haroun Haroun allati azharat bi-ghayr ghars wa la saqy."]],
  },
  "lent-midnight-sunday-theotokia-part-15": {
    coptic: [["+ Ⲁⲩⲙⲟⲩϯ ⲉ̀Ⲙⲁⲣⲓⲁ: ϯϣⲉⲣⲓ ⲛ̀Ⲓⲱⲁ̀ⲕⲓⲙ: ϫⲉ ϯⲥ̀ⲕⲏⲛⲏ ⲙ̀ⲙⲏⲓ: ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ ⲥⲁⲃⲁⲱⲑ.", "+ Ⲁⲩⲙⲟⲩϯ ⲉ̀Ⲙⲁⲣⲓⲁ: ⲧ̀ϣⲉⲣⲓ ⲛ̀Ⲓⲱⲁ̀ⲕⲓⲙ: ϫⲉ ϯⲥ̀ⲕⲏⲛⲏ ⲙ̀ⲙⲏⲓ: ⲛ̀ⲧⲉ Ⲡ̀ϭⲟⲓⲥ ⲥⲁⲃⲁⲱⲑ."]],
    english: [["They thought, with their enlightened minds, and explained it, through the Holy Books.", "They thought, with their bright minds, and explained it, through the Holy Books."], ["+ They likened the mercy seat, to the Virgin, lo the cherubim of glory, overshadowing her.", "+ They likened the mercy seat, to the Virgin, and the cherubim of glory, overshadowing her."], ["They likened the golden pot, to the Virgin, and its measure of the manna, to our Savior.", "They likened the golden pot, to the Virgin, and the measure of the manna, to our Savior."], ["+ They likened the golden candlestand, to the Church, and its seven lamps, to its seven orders.", "+ They likened the golden candlestand, to the Church, and the seven lamps, to its seven orders."], ["They likened the golden censer, to the Virgin, and its aloes, to Immanuel.", "They likened the golden censer, to the Virgin, and its aloes, to Emmanuel."], ["+ They likened the flower of incense, to Mary the Queen, and its chosen incense, to her virginity.", "+ They likened the flower of incense, to Mary the Queen, and the chosen incense, to her virginity."]],
    arabic: [["شبَّهوا عصا هارونَ، بخشبةِ الصليبِ، التي صُلِبَ ربّي عليها، حتّى خلَّصنا.", "شبهوا عصا هرون، بخشبة الصليب، التي صُلب ربي عليها، حتى خلصنا."]],
    englishArabic: [["Shabbahou 'asa Haroun, bi-khashabat es-saleeb, allati sulib Rabbi 'alayha, hatta khallasana.", "Shabbahou 'asa Haroun bi-khashabat es-saleeb allati sulib Rabbi 'alayha hatta khallasana."]],
  },
  "lent-midnight-sunday-theotokia-part-16": {
    english: [["You descended to Hades, and brought up, those who were captives, in that place.", "You descended into Hades, and brought up, those who were captives, in that place."]],
  },
  "lent-midnight-sunday-theotokia-part-17": {
    coptic: [["Ⲁ̀ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ: ⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ: ⲛ̀ⲑⲟϥ ⲡⲉ ϯⲁ̀ⲡⲁⲣⲭⲏ: ⲛ̀ⲧⲉ ⲛⲏⲉⲧⲁⲩⲉⲛⲕⲟⲧ.", "Ⲁ̀ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ: ⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ: ⲛ̀ⲑⲟϥ ⲡⲉ ⲧ̀ⲁ̀ⲡⲁⲣⲭⲏ: ⲛ̀ⲧⲉ ⲛⲏⲉⲧⲁⲩⲉⲛⲕⲟⲧ."]],
    arabic: [["المسيحُ إلهُنا، قامَ مِنْ بينِ الأمواتِ، وهو، بِكرُ المُضطجِعين.", "المسيح إلهنا، قام من الأموات، وهو باكورة، الراقدين."]],
    englishArabic: [["El-Maseeh Ilahuna, qam min bayn el-amwat, wa huwa, bikr el-mudtagi'een.", "El-Maseeh ilahuna, qam min el-amwat, wa huwa bakourat, er-raqideen."]],
  },
  "lent-midnight-sunday-theotokia-part-18": {
    english: [["+ Wherefore we glorify Him, proclaiming and saying, \"Blessed are You O my Lord Jesus, for You have risen and saved us.\"", "+ Therefore we glorify Him, proclaiming and saying, \"Blessed are You, O my Lord Jesus, for You have risen and saved us.”"]],
  },
  "lent-midnight-sunday-theotokia-part-2": {
    english: [["+ One nature out of two, a holy divinity, co-essential with the Father, and incorruptible.", "+ One out of two, a holy divinity, co-essential with the Father, and incorruptible."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["All the souls together, of the children of Israel, brought offering unto, the tabernacle of the Lord.", "All the souls together, of the children of Israel, brought offerings unto, the Tabernacle of the Lord."]],
  },
  "lent-midnight-sunday-theotokia-part-3": {
    english: [["+ Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "+ Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["+ The two golden Cherubim, continually covered, with their wings, the mercy seat.", "+ The two golden cherubim, continually cover, with their wings, the Mercy Seat."]],
  },
  "lent-midnight-sunday-theotokia-part-4": {
    english: [["+ The Bread of life, which came down from heaven, and gave life, unto the world.", "+ The Bread of life, which came down for us, from heaven, has given life to the world."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["+ For that was kept, in the tabernacle, as a testimony, to the children of Israel.", "+ For that was kept, in the Tabernacle, as a testimony, for the children of Israel."], ["You bore Him without blemish, He gave unto us, His honored Body and Blood, and we lived forever.", "You bore Him without blemish, He gave unto us, His honored Body and Blood, and we live forever."]],
    arabic: [["+ فذلك وُضع، في القبة، شهادة لبني، إسرائيل.", "+ فذاك وُضع، في القبة، شهادة لبني، إسرائيل."]],
    englishArabic: [["+ Fa-dhalika wudi', fil-qubba, shahadatan li-bani, Isra'eel.", "+ Fa-dhaka wudi', fil-qubba, shahadatan li-bani, Isra'eel."]],
  },
  "lent-midnight-sunday-theotokia-part-5": {
    english: [["+ By His appearing, He gave light to us, we who sit in the darkness, and in the shadow of death.", "+ By His Coming, He gave light to us, we who were sitting in the darkness, and in the shadow of death."], ["+ Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "+ Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["That was made of, pure and elect gold, and was placed in, the tabernacle.", "That was made of, pure and chosen gold, and was placed, in the Tabernacle."], ["+ That was made, by the hands of men, who brought oil for its lamps, by day and by night.", "+ That was managed, by the hands of men, who brought oil for its lamps, by day and by night."], ["He who dwells in your womb, O Virgin Mary, gives light to every man, who comes into the world.", "He Who dwelt in your womb, O Virgin Mary, gives light to every man, who comes into the world."]],
  },
  "lent-midnight-sunday-theotokia-part-6": {
    english: [["+ Which is God the Word, who took flesh from you, and offered Himself as incense, to God His Father.", "+ Which is God the Word, Who was incarnate from you, and offered Himself as incense, to God His Father."], ["Wherefore everyone, magnifies you, O my Lady the Mother of God, the ever-holy.", "Wherefore everyone, magnifies you, O my Lady the Theotokos, the ever-holy."], ["+ And we too, hope to win mercy, through your intercessions, with the Lover of Mankind.", "+ And we also pray, that we may win mercy, through your intercessions, with the Lover of Mankind."], ["Wherefore truly, I do not err, whenever I call you, the golden censer.", "Where for truly, I do not err, whenever I call you, the golden censer."], ["+ For therein, is offered, the choice incense, before the Holies.", "+ For therein, is offered, the chosen incense, before the Holies."]],
    arabic: [["حينئذ بالحقيقة، لا أخطيئ في شئ، إذا ما دعوتك، المجمرة الذهب.", "حينئذ بالحقيقة لا أخطئ في شئ أذ ما دعوتك المجمرة الذهب."], ["+ وأنتِ يا مريم، حملتِ في بطنِك، الغير منظور، كلمة الآب.", "+ وأنتِ يا مريم، حملتِ في بطنِك، غير منظور، كلمة الآب."]],
    englishArabic: [["Heena'idhin bil-haqiqa, la ukhti' fi shay', idha ma da'awtuki, el-migmara edh-dhahab.", "Heena'idhin bil-haqiqa la ukhti' fi shay' idh ma da'awtuki el-migmara edh-dhahab."], ["+ Wa anti ya Maryam, hamalti fi batniki, ghayr el-manzour, kalimat el-Ab.", "+ Wa anti ya Maryam, hamalti fi batniki, ghayr el-manzour, Kalimat el-Ab."]],
  },
  "lent-midnight-sunday-theotokia-part-7": {
    english: [["Hail to you Mary, the beautiful dove, who gave birth to, God the Word for us.", "Hail to you O Mary, the beautiful dove, who has borne to us, God the Logos."]],
  },
  "lent-midnight-sunday-theotokion-7": {
    english: [["Hail to you Mary, the beautiful dove, who gave birth to, God the Word for us.", "Hail to you O Mary, the beautiful dove, who has borne to us, God the Logos."]],
  },
  "lent-midnight-thursday-psali": {
    english: [["Once more my beloved, let us keep away, the evil inclinations of our heart, that lead us to sin.", "Once more my beloved, let us keep away, the evil inclinations of heart, that lead us to sin."], ["+ O my Lord Jesus Christ, who is born of the Father, before all ages, have mercy on us according to Your great mercy.", "+ O my Lord Jesus Christ, who is born of the Father, before all ages, have mercy upon us according to Your great mercy."]],
    arabic: [["+ ياربي يسوع المسيح المولود من الآب قبل كل الدهور إرحمنا كعظيم رحمتك.", "+ يا ربي يسوع المسيح، المولود من الآب، قبل كل الدهور، إرحمنا كعظيم رحمتك."], ["+ ياربي يسوع المسيح الذي ولدته العذراء في بيت لحم اليهودية خلصنا وارحمنا.", "+ يا ربي يسوع المسيح، الذي ولدته العذراء، في بيت لحم اليهودية، خلِّصنا وإرحمنا."], ["ياربي يسوع المسيح الذي اعتمد في الأردن طهر نفوسنا من دنس الخطية.", "يا ربي يسوع المسيح، الذي إعتمد في الأردن، طَهِّر نفوسنا، من دنس الخطية."], ["ياربي يسوع المسيح الذي صام عنا أربعين يوماً وأربعين ليلة خلصنا وارحمنا.", "يا ربي يسوع المسيح، الذي صام عنا، أربعين يوماً وأربعين ليلة، خلِّصنا وإرحمنا."], ["+ ياربي يسوع المسيح الذي صُلب على الصليب إسحق الشيطان تحت أقدامنا.", "+ يا ربي يسوع المسيح، الذي صُلب على الصليب، إسحق الشيطان، تحت أقدامنا."], ["+ ياربي يسوع المسيح الذي وُضع في القبر أكسر عنا شوكة الموت.", "+ يا ربي يسوع المسيح، الذي وُضع في القبر، إسحق عنا، شوكة الموت."], ["ياربي يسوع المسيح الذي قام من بين الأموات وصعد إلى السموات أقمنا بقوتك.", "يا ربي يسوع المسيح، الذي قام من بين الأموات، وصعد إلى السموات، أقِمنا بقوتك."], ["ياربي يسوع المسيح الآتي في ظهوره الثاني إصنع معنا محبة في منبرك المخوف.", "يا ربي يسوع المسيح، الآتي في ظهوره الثاني، إصنع معنا محبة، في منبرك المخوف."]],
    englishArabic: [["+ Ya Rabbi Yasou' el-Maseeh alladhi wudi' fil-qabr iksir 'anna shawkat el-mawt.", "+ Ya Rabbi Rabbi Yasou' el-Maseeh alladhi wudi' fil-qabr Is-haq 'anna shawkat el-mawt."]],
  },
  "lent-midnight-thursday-theotokia-part-2": {
    english: [["+ We have become worthy to have, the Tree of Life to eat from, which is the Body of God, and His true Blood.", "+ We deserved the Tree of Life: to eat from It: It is the body of God: and His true blood."], ["Let us worship our Savior, the Good Lover of Mankind, for He had compassion upon us, He came and saved us.", "Let us worship our Savior, the good Lover of Mankind, for He had compassion on us, He has come and saved us."]],
  },
  "lent-midnight-thursday-theotokia-part-3": {
    english: [["+ The one and only Word, begotten before all ages, as the divinity without body, from His Father only.", "+ The one and only Word, begotten before all ages, as the divinity without body, from His Father alone."], ["+ And also after she gave birth to Him, she remained a virgin, and thus He has shown, that she is the Mother of God.", "+ And also after she gave birth to Him, she remained a virgin, and thus He has shown, that she is the Theotokos."], ["+ It became the source of immortality, she gave birth to Immanuel, without the seed of man, to revoke the corruption of our race.", "+ It became the source of immortality, she gave birth to Emmanuel for us, without the seed of man, to revoke the corruption of our race."], ["Let us proclaim and say unto Him, glory be to the Incomprehensible One, the Good Lover of Mankind the Savior of our souls, He came and saved us.", "Let us proclaim and say to Him, glory to You O Incomprehensible One, the Good Lover of Mankind the Savior of our souls, Who came and saved us.”"]],
  },
  "lent-midnight-thursday-theotokia-part-7": {
    english: [["This is He Whom is worthy of glory, with His Good Father, and the Holy Spirit, both now and forever.", "This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."]],
    arabic: [["+ يا لهذه الاتفاقات، التي لأولئك الأنبياء، الذين تنبأوا بهذا الروح الواحد، من أجل مجيء المسيح.", "+ يا لهذه الإتفاقات، الذي لأولئك الأنبياء، الذين تنبأوا بهذا الروح الواحد، من أجل مجيئ المسيح."], ["هذا الذي ينبغي له المجد، مع أبيه الصالح، والروح القدس، منذ الآن وإلى الأبد.", "هذا الذي ينبغي له المجد، مع أبيه الصالح، والروح القدس، من الآن وإلى الأبد."]],
    englishArabic: [["Hadha elladhi yanbaghi lahu el-magd, ma'a abeehi es-salih, war-Rouh el-Qudus, mundh el-an wa ila el-abad.", "Hadha alladhi yanbaghi lahu el-magd, ma'a abeehi es-salih war-Rouh el-Qudus, min el-an wa ila el-abad."]],
  },
  "lent-midnight-thursday-watos-lobsh": {
    english: [["This is a symbol of Mary, the undefiled virgin, from whom the Logos of the Father, came and took flesh.", "This is a symbol of Mary, the undefiled Virgin, which the Word of the Father, came and took flesh from her."]],
    arabic: [["هي مثال لمريم، العذراء غير الدنسة، التي تجسد منها، كلمة الآب.", "هي مثال مريم، العذراء غير الدنسة، التي أتى وتجسد منها، كلمة الآب."]],
    englishArabic: [["Hiya mithal li-Maryam el-'Adhra' ghayr ed-danisa allati tagassad minha kalimat el-Ab.", "Hiya mithal Maryam, el-'Adhra' ghayr ed-danisa, allati ata wa tagassad minha, Kalimat el-Ab."]],
  },
  "lent-midnight-thursday-watos-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto the ages of the ages, Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والابن. والروح القدس. الآن وكل أوان. والى دهر الداهرين آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rooh el-Qudus, el-an wa kulla awan, wa ila dahr ed-dahireen ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "lent-midnight-thursday-watos-theotokia-conclusion": {
    arabic: [["مُبارَك الآب والإبن، والرُّوح القُدُس، الثالوث الكامل، نسجد له ونُمجِّدهُ.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarak el-Ab wal-Ibn, war-Rooh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "lent-midnight-tuesday-adam-lobsh": {
    english: [["By what means can we bless you, for you were exalted, above all the highest, and rational natures.", "By what means can we bless you, for you were exalted above, all the highest, the more rational natures."], ["+ Your name is remembered, throughout all ages, O beautiful dove, the Mother of Christ.", "+ Your name shall be remembered, throughout all ages, O beautiful dove, and Mother of Christ."], ["Rejoice O Mary, the handmaiden and mother, for He who is on your lap, the angels praise.", "Rejoice, O Mary, handmaiden and mother, for the angels praise Him who is in your arms,"], ["+ And the cherubim, worship Him befittingly, and the seraphim, without ceasing.", "+ and the cherubim worthily worship Him; the seraphim too, without ceasing."]],
    arabic: [["+ يُذكر اسمك في كل الأجيال أيتها الحمامة الحسناء وأم المسيح.", "+ يُذكر إسمِك، في كل الأجيال، أيتها الحمامة الحسنة، وأُم المسيح."], ["افرحي يا مريم العبدة والأم لأن الذي في حجرك تسبحه الملائكة.", "إفرحي يا مريم، العبدة والأم، لأن الذي في حجرك، الملائكة تسبحه. الملائكة."], ["+ والشاروبيم تسجد له باستحقاق والسارافيم بغير فتور.", "+ والشاروبيم، يسجدون له بإستحقاق، والسِّرافيم، بغير فتور."]],
    englishArabic: [["+ Yudhkar ismuki fi kull el-agyal ayyatuha el-hamama el-hasna' wa umm el-Maseeh.", "+ Yudhkar ismuki, fi kull el-agyal, ayyatuha el-hamama el-hasana, wa umm el-Maseeh."], ["Ifrahi ya Maryam el-'abda wal-umm li-anna alladhi fi hugriki tusabbihuhu el-mala'ika.", "Ifrahi ya Maryam el-'abda wal-umm li-anna alladhi fi hugriki el-mala'ika tusabbihuhu. el-mala'ika."], ["+ Wesh-Sharoubim tasgud lahu bi-istihqaq wes-Sarafim bi-ghayr futour.", "+ Wesh-Sharoubeem, yasgudoun lahu bi-istihqaq, wes-Sarafeem, bi-ghayr futour."]],
  },
  "lent-midnight-tuesday-adam-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
  },
  "lent-midnight-tuesday-adam-theotokias-conclusion": {
    english: [["Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.", "Your mercies O my God: are countless: and exceedingly plenteous: are Your compassions."], ["And me too, the sinner, teach me O my Master, to offer repentance.", "And I too: the sinner: teach me O my Lord: to offer repentance."], ["For You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.", "For You do not desire: the death of a sinner: but rather that he return: and that his soul may live."], ["For You are good, and merciful, let Your compassion, speedily come to us.", "For You are good: and merciful: let Your compassions: speedily come to us."], ["O King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.", "O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins."], ["Disperse the enemies, of the Church, and fortify her that she, may not be shaken forever.", "Disperse the enemies, of the Church, and fortify her, that she may never be shaken. forever."]],
  },
  "lent-midnight-tuesday-psali": {
    english: [["Come unto us today, O Christ our Master, shine upon us, with Your exalted divinity.", "Come to us today, O Christ our Master, shine on us, with Your high divinity."], ["Send unto us, this great grace, of Your Holy Spirit, the Comforter.", "Send to us, this great grace, that is of Your Holy Spirit, the Paraclete."]],
    arabic: [["أرسل لنا هذه النعمة العظيمة التي لروحك القدوس المعزي.", "أرسل علينا، هذه النعمة العظيمة، التي لروحك القدوس، المعزي."], ["+ لكن اسمك القدوس ياربي يسوع يكون لهم ناصراً في جميع ضيقاتهم.", "+ لكن أسمك القدوس، يا ربي يسوع، يكون لهم ناصراً، في جميع ضيقاتهم."], ["+ اسمك القدوس ياربي يسوع هو ينجيهم من جميع شدائدهم.", "+ إسمك القدوس، يا ربي يسوع، هو ينجيهم، من جميع شدائدهم."], ["+ اذا نطقوا به تستنير عقولهم وترتفع إلى العلاء قلوبهم.", "+ إذ نطقوا به، تستنير عقولهم، وترتفع إلى، العلاء قلوبهم."]],
    englishArabic: [["Arsil lana hadhihi en-ni'ma el-'azima allati li-Rouhik el-Qudus el-Mu'azzi.", "Arsil 'alayna hadhihi en-ni'ma el-'azima allati li-Rouhik el-Qudus el-Mu'azzi."], ["+ Idha nataqou bihi tastanir 'uqouluhum wa tartafi' ila el-'ala' quloubuhum.", "+ Idh nataqou bihi tastanir 'uqouluhum wa tartafi' ila el-'ala' quloubuhum."]],
  },
  "lent-midnight-tuesday-theotokia-part-1": {
    english: [["+ Who for us gave birth to, God the Word, who became man, for our salvation.", "+ Who for us gave birth, to God the Logos, Who became man, for our salvation."], ["And after He became man, He is also God, therefore she gave birth to Him, while a virgin.", "And after He became man, He remained God, wherefore she gave birth to Him, while a virgin."]],
    arabic: [["+ عالية هي الأُعجوبة، التي لحبلها، وولادتها أيضاً، لا يُنطق به.", "+ عالية هي الأُعجوبة، التي لحبلها، وولادتها أيضاً، لا يُنطق بها."]],
    englishArabic: [["+ 'Aliya hiya el-u'gouba, allati li-hablaha, wa wiladatuha aydan, la yuntaq bih.", "+ 'Aliya hiya el-u'gouba, allati li-hablaha, wa wiladatiha aydan, la yuntaq biha."]],
  },
  "lent-midnight-tuesday-theotokia-part-2": {
    english: [["You have found grace, and the Lord is with you, you are the ladder, which Jacob saw.", "You have found grace, and the Lord is with you, you are the ladder, that Jacob saw."], ["You are the tree, which Moses has seen, flaming with fire, and was not consumed.", "You are the bush, which Moses has seen, flaming with fire, and was not consumed."], ["+ This is the Son of God, who dwelt in your womb, the fire of His divinity, did not burn your body.", "+ This is the Son of God, who dwelt in your womb, the fire of His divinity, did not consume your body."]],
    arabic: [["وجدتِ نعمة، الربُّ مَعَكِ، أنتِ هي السلم، التي رآها يعقوب.", "وجدتِ نعمة، الربُّ مَعَكِ، أنتِ هي السلم، الذي رآه يعقوب."]],
    englishArabic: [["Wagadti ni'ma, er-Rabbu ma'aki, anti hiya es-sullam, allati ra'aha Ya'qoub.", "Wagadti ni'ma, er-Rabbu ma'aki, anti hiya es-sullam, alladhi ra'ahu Ya'qoub."]],
  },
  "lent-midnight-tuesday-theotokia-part-3": {
    english: [["Hail to the saint, the Mother of all the living, you are the one we pray to, intercede for us.", "Hail to the Saint, the mother of all the living, you are the one we entreat to, intercede for us."]],
  },
  "lent-midnight-tuesday-theotokia-part-4": {
    english: [["+ Because of the greatness, of the wonderful, Maker of all, good things.", "+ Because of the greatness, of that wonderful, Maker of, all good things."], ["+ He covered the peak, of the mountain, with smoke and darkness, mist and storms.", "+ He covered the peak, of the mountain, with smoke darkness and mist, and with storms."], ["+ Co-essential with us, and perfect, and also has, a rational soul.", "+ Coessential with us, and perfect, and also has, a rational soul."], ["And to make him, a citizen of heaven, and restore his leadership, according to His great mercy.", "And to make him a citizen, of heaven, and restore his authority, according to His great mercy."]],
  },
  "lent-midnight-tuesday-theotokia-part-5": {
    english: [["+ For this is the Rock, which Daniel saw, which was cut, from a mountain.", "+ For this is the Stone, which Daniel saw, which was cut, from a mountain."]],
  },
  "lent-midnight-tuesday-theotokia-part-6": {
    english: [["+ For you gave birth for us, God the Word, our Savior Jesus, He came and saved us.", "+ For us you gave birth to, God the Word, our Savior Jesus, He came and saved us."]],
  },
  "lent-midnight-tuesday-theotokia-part-7": {
    english: [["+ You are the Mother of light, the honored Mother of God, you have carried, the infinite Logos.", "+ You are the Mother of Light, the honored Mother of God, you have carried, the uncircumcript Logos."]],
    arabic: [["ومن بعد أن ولدتِه، بقيتِ عذراء، نعظمكِ بتسابيح، وبركات.", "وبعد ما ولدتِه، بقيتِ عذراء، بتسابيح وبركات، نعظمكِ."]],
    englishArabic: [["Wa min ba'd an waladtihi, baqeeti 'adhra', nu'azzimuki bi-tasabeeh, wa barakat.", "Wa ba'd ma waladtih, baqeeti 'adhra', bi-tasabeeh wa barakat, nu'azzimuki."]],
  },
  "lent-midnight-wednesday-psali": {
    english: [["+ The river of water is our Savior, Jesus Christ our Lord, and the souls of those who abide, in Him shall live forever.", "+ The river of water is our Savior, Jesus Christ our Lord, and the souls who abide, in Him shall live forever."]],
    arabic: [["فليفرح ويتهلل طالبو الرب الملازمون كل حين في تلاوة اسمه القدوس.", "فليفرح ويتهلل، طالبوا الرب الملازمون، كل حين في تلاوة، إسمه القدوس."], ["+ مجرى المياه هو مخلصنا ربنا يسوع المسيح والملازمون له تحيا نفوسهم.", "+ مجرى الماء هو مُخلِّصنا، ربنا يسوع المسيح، والملازمون له، تحيا نفوسهم."]],
    englishArabic: [["Fal-yafrah wa yatahallal talibou er-Rabb el-mulazimoun kull heen fi tilawat ismihi el-qudous.", "Fal-yafrah wa yatahallal, talibou er-Rabb el-mulazimoun, kull heen fi tilawat, ismihi el-quddous."], ["+ Magra el-miyah huwa mukhallisuna Rabbuna Yasou' el-Maseeh wal-mulazimoun lahu tahya nufousuhum.", "+ Magra el-ma' huwa mukhallisuna Rabbuna Yasou' el-Maseeh wal-mulazimoun lahu tahya nufousuhum."]],
  },
  "lent-midnight-wednesday-theotokia-part-2": {
    english: [["+ Every generation calls you blessed, and we also worship Him, to whom you gave birth, and we exalt Him.", "+ Every generation calls you blessed, and also worship Him, to whom you gave birth, and we exalt Him."]],
  },
  "lent-midnight-wednesday-theotokia-part-3": {
    english: [["+ For you have given birth, to the true Word, the Son of the ever-existing Father, who came and redeemed us from our sins.", "+ For you bore the True Word, / the Son of the eternal Father, / who came and saved us / from our sins."]],
    arabic: [["+ أنتِ هي السحابة الخفيفة التي دلتنا على مطر استعلان الإله الإبن الوحيد.", "+ أنتِ هي السحابة الخفيفة، التي دلتنا على، مطر إستعلان، الإله الوحيد."]],
    englishArabic: [["+ Anti hiya es-sahaba el-khafifa allati dallatna 'ala matar isti'lan el-Ilah el-Ibn el-wahid.", "+ Anti hiya es-sahaba el-khafifa allati dallatna 'ala matar isti'lan el-Ilah el-wahid."]],
  },
  "lent-midnight-wednesday-theotokia-part-4": {
    coptic: [["Ⲁⲕⲉⲣⲥⲩⲙⲉⲛⲓⲛ ⲛⲁⲛ ⲙ̀ⲡⲓϫ̀ⲫⲟ: ⲛ̀ⲧⲉ Ⲫϯ ⲉ̀ⲧⲁϥⲓ̀ ϣⲁⲣⲟⲛ: ⲁⲕϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲙ̀Ⲙⲁⲣⲓⲁ: ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲛ̀ⲁⲧⲑⲱⲗⲉⲃ.", "Ⲁⲕⲉⲣⲥⲩⲙⲙⲉⲛⲓⲛ ⲛⲁⲛ ⲙ̀ⲡⲓϫ̀ⲫⲟ: ⲛ̀ⲧⲉ Ⲫϯ ⲉ̀ⲧⲁϥⲓ̀ ϣⲁⲣⲟⲛ: ⲁⲕϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲙ̀Ⲙⲁⲣⲓⲁ: ϯⲡⲁⲣⲑⲉⲛⲟⲥ ⲛ̀ⲁⲧⲑⲱⲗⲉⲃ."]],
    arabic: [["+ عظيمة هي الكرامة التي استحققتها ياغبريال الملاك المبشر ووجهك يتلألأ فرحاً.", "+ عظيمة هي الكرامة، التي إستحققتها يا غبريال، الملاك المبشر، ووجهك يتلألأ فرحاً."], ["أعلمت لنا ميلاد الله الذي أتى إلينا وبشرت مريم العذراء غير الدنسة.", "أعلنت لنا ميلاد، الله الذي أتى إلينا، وبشرتَ مريم العذراء، غير الدنسة."]],
    englishArabic: [["A'lamta lana milad Allah alladhi ata ilayna wa bashsharta Maryam el-'Adhra' ghayr ed-danisa.", "A'lanta lana milad Allah alladhi ata ilayna, wa bashsharta Maryam el-'Adhra' ghayr ed-danisa."]],
  },
  "lent-midnight-wednesday-watos-lobsh": {
    coptic: [["Ⲧⲉⲥ̀ⲙⲁⲙⲁⲁⲧ ⲧⲉϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲱ̀ ⲑⲏⲉ̀ⲧⲁⲥϫⲉⲙ ⲭⲁⲣⲓⲥⲙⲁ ⲛⲓⲃⲉⲛ: ⲙ̀ⲡⲉⲙ̀ⲑⲟ ⲙ̀ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟⲩ: ⲡⲉⲛⲁ̀ⲗⲏⲑⲓⲛⲟⲥ ⲛ̀ⲛⲟⲩϯ.", "Ⲧⲉⲥ̀ⲙⲁⲙⲁⲁⲧ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ: ⲱ̀ ⲑⲏⲉ̀ⲧⲁⲥϫⲉⲙ ⲭⲁⲣⲓⲥⲙⲁ ⲛⲓⲃⲉⲛ: ⲙ̀ⲡⲉⲙ̀ⲑⲟ ⲙ̀ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟⲩ: ⲡⲉⲛⲁ̀ⲗⲏⲑⲓⲛⲟⲥ ⲛ̀ⲛⲟⲩϯ."]],
    english: [["+ And no one else entered it, but the Lord of Powers, He entered and went out, and the gate remained sealed.\"", "+ And no one entered through it, but the Lord of Powers, He entered and went out, and the gate remained sealed.”"], ["+ Blessed is the fruit of your womb, O you who gave birth to God for the world, so as to redeem us from the hands, of the unmerciful tyrant.", "+ Blessed is the fruit of your womb, O who gave birth to God for the world, so as to redeem us from the hands, of the unmerciful tyrant."], ["Blessed and perfect are you, O you who have found all grace, before the King of glory, our True Lord.", "Blessed and perfect are you, O who has found all grace, before the King of Glory, our True Lord."], ["And He walked among men, as a caring Lover of Mankind, until He saved our souls, through His holy appearance.", "And He walked among men, as a compassionate Lover of Mankind, until He saved our souls, through His holy appearance."], ["+ Let us worship our Savior, the Good Lover of Mankind, for He had compassion upon us, as He came and saved us.", "+ Let us worship our Savior, the good Lover of Mankind, for He had compassion on us, He has come and saved us."], ["Hail to you, O Virgin, the right and true Queen. Hail to the pride of our race, who bore to us Immanuel.", "Hail to you O Virgin / the right and true Queen. / Hail to the pride of our race / who bore to us Emmanuel."]],
    arabic: [["+ إستحقيتِ كل كرامة أكثر من كل من على الأرض لأن كلمة الآب أتى وتجسد منكِ.", "+ إستحققتِ كل كرامة، أكثر من كل مَنْ على الأرض، لأن كلمة الآب، أتى وتجسد منكِ."], ["+ نسألك اذكرينا أيتها الشفيعة المؤتمنة أمام ربنا يسوع المسيح ليغفر لنا خطايانا.", "+ نسألكِ أن تذكرينا، أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا."]],
    englishArabic: [["+ Istahaqqeiti kull karama akthar min kull man 'ala el-ard li-anna kalimat el-Ab ata wa tagassad minki.", "+ Istahaqqti kull karama, akthar min kull man 'ala el-ard, li-anna Kalimat el-Ab, ata wa tagassad minki."], ["+ Nas'aluki udhkurina ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana.", "+ Nas'aluki an tadhkureena ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana."]],
  },
  "lent-midnight-wednesday-watos-psali-conclusion": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto the ages of the ages, Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والابن. والروح القدس. الآن وكل أوان. والى دهر الداهرين آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rooh el-Qudus, el-an wa kulla awan, wa ila dahr ed-dahireen ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "lent-midnight-wednesday-watos-theotokia-conclusion": {
    arabic: [["مُبارَك الآب والإبن، والرُّوح القُدُس، الثالوث الكامل، نسجد له ونُمجِّدهُ.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarak el-Ab wal-Ibn, war-Rooh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "lent-vespers-concluding-hymn": {
    english: [["Lord have mercy. Lord have mercy. Lord bless us. Amen.", "Lord have mercy. Lord have mercy. Lord bless. Amen."]],
  },
  "lent-vespers-verse-of-cymbals": {
    arabic: [["يا ربُ إرحَم.", "ياربُ إرحَم ."], ["بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabb an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "lent-weekday-a-great-mystery": {
    english: [["(7/16) Your Body and Blood / are the forgiveness of our sins / and the New Covenant, / which You gave to Your Disciples.", "(7/16) Your body and Your blood, are for the forgiveness of our sins, and the new covenant, that You gave to Your disciples."], ["(16/16) “Come unto Me, / you blessed of My Father, / and inherit the life / that endures forever.”", "(16/16) “Come to Me, / O blessed of My Father, / and inherit the life / that endures forever.”"]],
    arabic: [["(١٦/٧) الجسد والدم الذين لك، هما لمغفرة خطايانا، مع العهد الجديد، الذي أعطيته لتلاميذك", "(١٦/٧) جسدك ودمك، هما لغفران خطايانا، وللعهد الجديد، الذى أعطيته لتلاميذك."], ["مبارك الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["(16/7) El-gasad wad-dam alladhan lak, huma li-maghfirat khatayana, ma'a el-'ahd el-gadeed, alladhi a'taytahu li-talameedhik", "(16/7) Gasadak wa damak, huma li-ghufran khatayana, wa lil-'ahd el-gadeed, alladhi a'taytahu li-talameedhak."], ["Mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "lent-weekday-distribution-o-good-one": {
    english: [["\"I have sinned I have sinned / My Lord Jesus forgive me / for there is no servant without sin / nor master without forgiveness.\"", "\"I have sinned I have sinned, my Lord Jesus forgive me, for there is no servant without sin, nor a master without forgiveness.\""]],
    arabic: [["أخطأت أخطأت، يا ربي يسوع اغفر لي، لأنه ليس عبد بلا خطية، ولا سيد بلا مغفرة.", "أخطأت أخطأت، يا ربي يسوع إغفر لي، لأنه ليس عبد بلا خطية، ولا سيد بلا غفران."], ["مبارك الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Akhta'tu akhta'tu, ya Rabbi Yasou' ighfir li, li-annahu laysa 'abdun bila khatiyya, wala sayyidun bila maghfira.", "Akhta'tu akhta'tu, ya Rabbi Yasou' ighfir li, li-annahu laysa 'abdun bila khatiyya, wa la sayyidun bila ghufran."], ["Mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "lent-weekday-distribution-psalm-150": {
    coptic: [["ⲡⲛⲓⲥⲓ ⲛⲓⲃⲉⲛ ⲙⲁⲣⲟⲩⲥⲙⲟⲩ ⲧⲏⲣⲟⲩ ⲉ̀ⲫⲣⲁⲛ ⲙ̀ⲡ̀ⲥⲟⲓⲥ Ⲡⲉⲛⲛⲟⲩϯ. ⲁⲗ.", "Ⲛⲓϥⲓ ⲛⲓⲃⲉⲛ ⲙⲁⲣⲟⲩⲥⲙⲟⲩ ⲧⲏⲣⲟⲩ ⲉ̀ⲫⲣⲁⲛ ⲙ̀Ⲡϭⲟⲓⲥ Ⲡⲉⲛⲛⲟⲩϯ. ⲁⲗ."], ["Ⲅⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ Ⲁⲅⲓⲱ Ⲡⲛⲉⲩⲙⲁⲧⲓ. ⲁⲗ.", "Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ Ⲁⲅⲓⲱ Ⲡⲛⲉⲩⲙⲁⲧⲓ. ⲁⲗ."], ["Ⲕⲉⲙⲁⲣⲱⲟⲩⲧ ⲁⲗⲏⲑⲱⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲓ ⲁⲕⲥⲱⲧⲓ ⲙ̀ⲙⲟⲛ.", "Ⲕⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲁⲗⲏⲑⲱⲥ: ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲛⲉⲙ Ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: ϫⲉ ⲁⲕⲓ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ."]],
    arabic: [["سبحوا في فلك قوته، هللويا.", "سبحوه في جَلَدِ قوتِه. هلليلويا."], ["كل نسمة فلتسبح اسم الرب إلهنا، هللويا.", "كلُّ نسمةِ فلتسبح إسمَ الربِ إلَهُنا. هلليلويا."], ["المجد للآب والابن والروح القدس، هللويا.", "المجدُ للآبِ والابنِ والروحِ القدس. هلليلويا."], ["المجد هو لإلهنا، هللويا.", "المجد هو لإلهنا. هلليلويا."]],
  },
  "lent-weekday-gospel-response": {
    english: [["Our Father who art in heaven, hallowed be Your name, may Your kingdom come, for Yours is the glory forever.", "Our Father who art in heaven / hallowed be Thy name / Thy kingdom come / for Thine is the glory forever."]],
  },
  "lent-weekday-liturgy-adam-aspasmos": {
    english: [["We ask You, O Son of God, to keep the life of our patriarch, Pope Abba (...) the archpriest. Confirm him upon his throne.", "We ask You O Son of God, to keep the life of our patriarch, Pope Abba (...) the high priest, confirm him upon his throne."]],
    arabic: [["وشريكه في الخدمة الرسولية، أبانا القديس البار، أنبا (...) الأسقف، ثبته على كرسيه.", "وشريكه في الخدمة الرسولية، أبانا القديس البار، أنبا (...) الأسقف (المطران)، ثبته على كرسيه."]],
    englishArabic: [["Wa shareekahu fil-khidma er-rasouliyya, abana el-qiddees el-barr, Anba (...) el-usquf, thabbithu 'ala kursiyyih.", "Wa shareekahu fil-khidma er-rasouliyya abana el-qiddees el-barr Anba (...) el-usquf (el-mutran)ya thabbithu 'ala kursiyyih."]],
  },
  "lent-weekday-liturgy-aspasmos-watos": {
    arabic: [["يا ربُّ إلهَ القوات، ارجعْ واطّلعْ من السماءِ، وانظرْ وتعهّدْ هذه الكرمةَ، وأصلحْها وثبّتْها، هذه التي غرستْها يمينُك.", "أيها الرب إله القوات، إرجع واطلع من السماء، وانظر وتعهد هذه الكرمة، أصلحها وثبتها، هذه التي غرستها يمينك."], ["قدوسٌ. قدوسٌ. قدوسٌ. ربُ الصاباؤوت. السماءُ والأرضُ مملوءتان من مجدِكَ الأقدس.", "قدوس قدوس قدوس، رب الصاباؤت، السماء والأرض، مملوءتان من مجدك الأقدس."]],
    englishArabic: [["Ya Rabb ilah el-quwwat, irgi' wattali' min es-sama', wanzur wa ta'ahhad hadhihi el-karma, wa aslihha wa thabbitha, hadhihi allati gharasatha yameenuk.", "Ayyuha er-Rabb ilah el-quwwat, irgi' wattali' min es-sama', wanzur wa ta'ahhad hadhihi el-karma, aslihha wa thabbitha, hadhihi allati gharasatha yameenuk."], ["Quddoosun, quddoosun, quddoos. Rabbu es-saba'oot. Es-sama'u wal-ardu mamloo'atani min magdika el-aqdas.", "Quddoosun quddoosun quddoos Rabbu es-Saba'out Es-sama'u wal-ardu mamloo'atani min magdika el-aqdas."]],
  },
  "lent-weekday-liturgy-pihmot-gar": {
    english: [["May the clergy and all the people be safe in the Lord. Amen. So be it.", "May the clergy and all the people be safe in the Lord. Amen, so it shall be. it."]],
  },
  "lent-weekday-liturgy-praxis-response": {
    english: [["Blessed are You indeed, with Your good Father and the Holy Spirit, for You have come and saved us. Have mercy upon us.", "Blessed are You indeed, with Your good Father, and the Holy Spirit, for You have come and saved us. Have mercy on us."]],
    arabic: [["حيث يرفع الله خطايا الشعب، بالمحرقات ورائحة البخور.", "يرفع الله هناك، خطايا الشعب، من قبل المحرقات، ورائحة البخور."]],
    englishArabic: [["Haythu yarfa' Allah khataya esh-sha'b, bil-muhraqat wa ra'ihat el-bukhour.", "Yarfa' Allah hunak khataya esh-sha'b, min qibal el-muhraqat wa ra'ihat el-bukhour."]],
  },
  "lent-weekday-matins-doxology-apostles": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛⲉⲙ ⲡⲓϣ̀ⲃⲉⲥ̀ⲛⲁⲩ ⲙ̀ⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛⲉⲙ ⲡⲓϣ̀ⲃⲉⲥ̀ⲛⲁⲩ ⲙ̀ⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Also Philip and Matthew, Bartholomew and Thomas: James the Son of Alphaeus: and Simon the Canaanite", "Philip and Matthew, Bartholomew and Thomas, James the Son of Alphaeus, and Simon the Canaanite."], ["Matthias, who was chosen, in place of Judas: all of them and the rest: followed the Master", "Matthias was chosen, instead of Judas, and was counted with the rest, who followed the Master."], ["Their voice went forth, upon the face of the whole earth: and their words have reached: the ends of the world", "Their voices went forth, onto the face of the whole earth, and their words have reached, the ends of the world."], ["Pray to the Lord on our behalf, my lords and fathers the apostles: and the seventy-two disciples: that He may forgive us our sins", "Pray to the Lord on our behalf, O my lords and fathers the Apostles, and the seventy two disciples, that He may forgive us our sins."]],
  },
  "lent-weekday-matins-doxology-conclusion": {
    coptic: [["Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
  },
  "lent-weekday-matins-doxology-heavenly-beings": {
    coptic: [["Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲥ̀ⲧⲣⲁⲧⲓⲁ ⲛ̀ⲁⲅⲅⲉⲗⲓⲕⲟⲛ: ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲥ̀ⲧⲣⲁⲧⲓⲁ ⲛ̀ⲁⲅⲅⲉⲗⲓⲕⲟⲛ: ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Intercede on our behalf, O angelic armies: and heavenly orders: that He may forgive us our sins", "Intercede on our behalf, O angelic hosts, and all the heavenly multitudes, that He may forgive us our sins."]],
  },
  "lent-weekday-matins-doxology-lent-3": {
    arabic: [["أخطأت أخطأت، يا ربي يسوع اغفر لي، لأنه ليس عبد بلا خطية، ولا سيد بلا مغفرة.", "أخطأت أخطأت، يا ربي يسوع إغفر لي، لأنه ليس عبد بلا خطية، ولا سيد بلا غفران."]],
    englishArabic: [["Akhta'tu akhta'tu, ya Rabbi Yasou' ighfir li, li-annahu laysa 'abd bila khatiyya, wa la sayyid bila maghfira.", "Akhta'tu akhta'tu, ya Rabbi Yasou' ighfir li, li-annahu laysa 'abdun bila khatiyya, wa la sayyidun bila ghufran."]],
  },
  "lent-weekday-matins-doxology-lent-4": {
    english: [["Let us worship our Savior, the Good Lover of mankind, because He had compassion on us, He came and saved us.", "Let us worship our Savior, the good Lover of Mankind, for He had compassion on us, He has come and saved us."]],
    arabic: [["فلنسجد لمخلصنا، الصالح محب البشر، لأنه تراءف علينا، أتى وخلصنا.", "فلنسجد لمخلصنا، محب البشر الصالح، لأنه تراءف علينا، أتى وخلصنا."]],
    englishArabic: [["Fal-nasgud li-mukhallisina, es-salih muhibb el-bashar, li-annahu tara'af 'alayna, ata wa khallasana.", "Fal-nasgud li-mukhallisina, muhibb el-bashar es-salih, li-annahu tara'af 'alayna, ata wa khallasana."]],
  },
  "lent-weekday-matins-doxology-philopater-mercurius": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Hail to you O martyr: hail to the noble hero: hail to the struggle-bearer: Philopater Mercurius", "Hail to you O martyr: hail to the courageous hero: hail to the struggle bearer: Philopater Mercurius."]],
  },
  "lent-weekday-matins-doxology-pope-kyrillos-vi": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Pray to the Lord on our behalf: our holy father the patriarch: Abba Kyrillos the sixth: that He may forgive us our sins", "Pray to the Lord on our behalf: our holy father the patriarch: Papa Abba Kyrillos the Sixth: that He may forgive us our sins."]],
  },
  "lent-weekday-matins-doxology-st-john": {
    arabic: [["اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر لنا خطايانا.", "اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر خطايانا."]],
    englishArabic: [["Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-ma'madan liyaghfir lana khatayana.", "Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-Ma'madan, li-yaghfir khatayana."]],
  },
  "lent-weekday-matins-doxology-st-john-2": {
    english: [["\"I saw the Holy Spirit, come down from heaven, I heard the voice of the Father, proclaiming and saying.\"", "I saw the Holy Spirit, coming down from heaven, I heard the voice of the Father, proclaiming and saying:"], ["\"This is My beloved Son, with whom My soul is well pleased, He does My will, hear Him, for He is the Life-Giver.\"", "\"This is My beloved Son, in whom I am well pleased, He has performed My will; obey Him, for He is the Giver of Life.\""]],
    arabic: [["ونظرت الروح القدس عندما نزل من السماء. وسمعت صوت الآب صارخاً قائلاً.", "نظرت الروح القدس، الذي نزل من السماء، وسمعت صوت الآب، يصرخ قائلًا:"], ["هذا هو ابني حبيبي الذي سرت به نفسي وصنع مشيئتي. اسمعوا له لأنه هو المحيي.", "هذا هو إبني حبيبي الذي سُرّت به نفسي وصنع مشيئتي له إسمعوا لأنه هو المحيي."], ["اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر لنا خطايانا.", "اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر خطايانا."]],
    englishArabic: [["Wa nazartu er-Rouh el-Qudus 'indama nazal min es-sama', wa sami'tu sawt el-Ab sarikhan qa'ilan.", "Nazartu er-Rouh el-Qudus, alladhi nazal min es-sama', wa sami'tu sawt el-Ab, yasrukh qa'ilan:"], ["Hadha huwa ibni habeebi alladhi surrat bihi nafsi wa sana' mashee'ati, isma'ou lahu li-annahu huwa el-muhyi.", "Hadha huwa Ibni habeebi alladhi surrat bihi nafsi wa sana'a mashee'ati, lahu isma'ou li-annahu huwa el-Muhyi."], ["Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-ma'madan liyaghfir lana khatayana.", "Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-Ma'madan, li-yaghfir khatayana."]],
  },
  "lent-weekday-matins-doxology-virgin-mary": {
    english: [["\"O our Lord Jesus Christ: make for Yourself within us: a temple of Your Holy Spirit: glorifying You.\"", "O our Lord Jesus Christ, make in us a sanctuary, for Your Holy Spirit, ever-glorifying You."]],
  },
  "lent-weekday-matins-doxology-weekday-lent": {
    english: [["And we too should also fast, with purity and righteousness, and let us also pray, proclaiming and saying.", "And we too let us fast, with purity and righteousness, and let us pray, proclaiming and saying:"]],
  },
  "lent-weekday-matins-intro-doxologies": {
    english: [["O Virgin Mary, the holy Theotokos, the faithful advocate for all mankind.", "O Virgin Mary, the holy Theotokos, the trusted advocate, of the human race."], ["Intercede on our behalf before Christ whom you bore, that He may grant us the forgiveness of our sins.", "Intercede on our behalf, before Christ whom you have born, that He may grant unto us, the forgiveness of our sins."], ["We ask you to remember us, O our faithful advocate, before our Lord Jesus Christ, that He may forgive us our sins.", "We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["أيتها العذراء مريم والدة الإله القديسة الشفيعة الأمينة لجنس البشر.", "أيتها العذراء مريم، والده الإله القديسة، الشفيعة الأمينة، التي لجنس البشر."], ["اشفعي فينا أمام المسيح الذي ولدتِه لكي ينعم لنا بمغفرة خطايانا.", "إشفعي فينا، أمام المسيح الذي ولدتِه، لكي ينعم علينا، بمغفرة خطايانا."], ["نسألكِ أن تذكرينا أيتها الشفيعة المؤتمنة أمام ربنا يسوع المسيح ليغفر لنا خطايانا.", "نَسْألُكِ اذْكرينا أيَّتُها الشَّفيعَةُ المؤْتَمَنةُ أَمامَ ربِّنا يَسوعِ المسيحِ ليغْفِرَ لَنا خَطايانا."]],
    englishArabic: [["Ayyatuha el-'Adhra' Maryam walidat el-Ilah el-qiddisa esh-shafi'a el-amina li-gins el-bashar.", "Ayyatuha el-'Adhra' Maryam, walidat el-Ilah el-qiddeesa, esh-shafee'a el-ameena, allati li-gins el-bashar."], ["Ishfa'i fina amam el-Maseeh elladhi waladtihi likay yun'im lana bi-maghfirat khatayana.", "Ishfa'i fina amam el-Maseeh elladhi waladtihi likay yun'im 'alayna bi-maghfirat khatayana."], ["Nas'aluki an tadhkureena ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana.", "Nas'aluki udhkurina ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana."]],
  },
  "lent-weekday-matins-verse-of-cymbals": {
    arabic: [["يا ربُ إرحَم.", "ياربُ إرحَم ."]],
  },
  "lent-weekend-distribution-o-good-one": {
    english: [["\"I have sinned I have sinned / My Lord Jesus forgive me / for there is no servant without sin / nor master without forgiveness.\"", "\"I have sinned I have sinned, my Lord Jesus forgive me, for there is no servant without sin, nor a master without forgiveness.\""]],
    arabic: [["أخطأت أخطأت، يا ربي يسوع اغفر لي، لأنه ليس عبد بلا خطية، ولا سيد بلا مغفرة.", "أخطأت أخطأت، يا ربي يسوع إغفر لي، لأنه ليس عبد بلا خطية، ولا سيد بلا غفران."], ["مبارك الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Akhta'tu akhta'tu, ya Rabbi Yasou' ighfir li, li-annahu laysa 'abdun bila khatiyya, wala sayyidun bila maghfira.", "Akhta'tu akhta'tu, ya Rabbi Yasou' ighfir li, li-annahu laysa 'abdun bila khatiyya, wa la sayyidun bila ghufran."], ["Mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "lent-weekend-liturgy-adam-aspasmos": {
    english: [["We ask You, O Son of God, to keep the life of our patriarch, Pope Abba (...) the archpriest. Confirm him upon his throne.", "We ask You O Son of God, to keep the life of our patriarch, Pope Abba (...) the high priest, confirm him upon his throne."]],
    arabic: [["وشريكه في الخدمة الرسولية، أبانا القديس البار، أنبا (...) الأسقف، ثبته على كرسيه.", "وشريكه في الخدمة الرسولية، أبانا القديس البار، أنبا (...) الأسقف (المطران)، ثبته على كرسيه."]],
    englishArabic: [["Wa shareekahu fil-khidma er-rasouliyya, abana el-qiddees el-barr, Anba (...) el-usquf, thabbithu 'ala kursiyyih.", "Wa shareekahu fil-khidma er-rasouliyya abana el-qiddees el-barr Anba (...) el-usquf (el-mutran)ya thabbithu 'ala kursiyyih."]],
  },
  "lent-weekend-liturgy-apenchois": {
    english: [["Our Father who art in heaven, hallowed be Your name, Your kingdom come, for Yours is the glory forever.", "Our Father who art in heaven / hallowed be Thy name / Thy kingdom come / for Thine is the glory forever."]],
  },
  "lent-weekend-liturgy-aspasmos-watos": {
    arabic: [["يا ربُّ إلهَ القوات، ارجعْ واطّلعْ من السماءِ، وانظرْ وتعهّدْ هذه الكرمةَ، وأصلحْها وثبّتْها، هذه التي غرستْها يمينُك.", "أيها الرب إله القوات، إرجع واطلع من السماء، وانظر وتعهد هذه الكرمة، أصلحها وثبتها، هذه التي غرستها يمينك."], ["قدوسٌ. قدوسٌ. قدوسٌ. ربُ الصاباؤوت. السماءُ والأرضُ مملوءتان من مجدِكَ الأقدس.", "قدوس قدوس قدوس، رب الصاباؤت، السماء والأرض، مملوءتان من مجدك الأقدس."]],
    englishArabic: [["Ya Rabb ilah el-quwwat, irgi' wattali' min es-sama', wanzur wa ta'ahhad hadhihi el-karma, wa aslihha wa thabbitha, hadhihi allati gharasatha yameenuk.", "Ayyuha er-Rabb ilah el-quwwat, irgi' wattali' min es-sama', wanzur wa ta'ahhad hadhihi el-karma, aslihha wa thabbitha, hadhihi allati gharasatha yameenuk."], ["Quddoosun, quddoosun, quddoos. Rabbu es-saba'oot. Es-sama'u wal-ardu mamloo'atani min magdika el-aqdas.", "Quddoosun quddoosun quddoos Rabbu es-Saba'out Es-sama'u wal-ardu mamloo'atani min magdika el-aqdas."]],
  },
  "lent-weekend-liturgy-hymn-of-intercessions": {
    arabic: [["بشفاعات والدة الإله القديسة مريم، يا ربُ أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."], ["بشفاعات رؤساء الملائكة السبعة والطغمات السمائية، يا ربُ أنعم علينا بمغفرة خطايانا.", "بشفاعات رؤساء الملائكة السبعة والطغمات السمائية، ياربُ أنعم علينا بمغفرة خطايانا."], ["بصلوات سادتي الآباء الرسل وبقية التلاميذ، يا ربُ أنعم علينا بمغفرة خطايانا.", "بصلوات سادتي الآباء الرسل وبقية التلاميذ، ياربُ أنعم علينا بمغفرة خطايانا."], ["بصلوات ناظر الإله الإنجيلي مرقس الرسول، يا ربُ أنعم علينا بمغفرة خطايانا.", "بصلوات ناظر الإله الإنجيلي مرقس الرسول، ياربُ أنعم علينا بمغفرة خطايانا."], ["بصلوات المجاهد الشهيد سيدي الملك جيؤرجيوس، يا ربُ أنعم علينا بمغفرة خطايانا.", "بصلوات المجاهد الشهيد سيدي الملك جيؤرجيوس، ياربُ أنعم علينا بمغفرة خطايانا."], ["بصلوات المجاهد الشهيد فيلوباتير مرقوريوس، يا ربُ أنعم علينا بمغفرة خطايانا.", "بصلوات المجاهد الشهيد فيلوباتير مرقوريوس، ياربُ أنعم علينا بمغفرة خطايانا."], ["بصلوات المجاهد الشهيد أبا مينا البياضي، يا ربُ أنعم علينا بمغفرة خطايانا.", "بصلوات المجاهد الشهيد ابا مينا البياضي، ياربُ أنعم علينا بمغفرة خطايانا."], ["بصلوات أبينا القديس البطريرك الأنبا كيرلس السادس، يا رب أنعم علينا بمغفرة خطايانا.", "بصلوات، يا أبانا القديس البطريرك، الانبا كيرلس السادس، يا رب أنعم علينا بمغفرة خطايانا."], ["بصلوات أبينا القديس البار أنبا أبرآم الأسقف، يا رب أنعم لنا بمغفرة خطايانا.", "بصلوات ابينا القديس البار أنبا أبرام الاسقف يارب انعم لنا بمغفرة خطايانا."], ["بصلوات كاهن الحق أبينا القمص بيشوي كامل، يا رب أنعم لنا بمغفرة خطايانا.", "بصلوات كاهن الحق: أبونا القمص بيشوي كامل: يا رب انعم لنا بمغفرة خطايانا"], ["بصلوات قديسي هذا اليوم، كل واحد باسمِه، يا ربُ أنعم علينا بمغفرة خطايانا.", "بصلوات قديسي هذا اليوم، كل واحد باسمِه، ياربُ أنعم علينا بمغفرة خطايانا."], ["بصلواتِهم إحفظ حياة أبينا المكرم رئيس الكهنة البابا الأنبا ___، يا ربُ أنعم علينا بمغفرة خطايانا.", "بصلواتِهم إحفظ حياة أبينا المكرم رئيس الكهنة البابا الأنبا ___، ياربُ أنعم علينا بمغفرة خطايانا."], ["بصلواتهم إحفظ حياة أبينا المكرم البار أنبا ___ الأسقف (المطران)، يا ربُ أنعم علينا بمغفرة خطايانا.", "بصلواتهم إحفظ حياة أبينا المكرم البار أنبا ــ الاسقف (المطران) ياربُ أنعم علينا بمغفرة خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."], ["Bi-salawat abeena el-qiddees el-batriyark el-Anba Kirollos es-sadis, ya Rabbu an'im 'alayna bi-maghfirat khatayana.", "Bi-salawat ya abana el-qiddees el-batriyark el-Anba Kirollos es-sadis ya Rabbu an'im 'alayna bi-maghfirat khatayana."], ["Bi-salawat kahin el-haqq abeena el-Qummus Bishoy Kamel, ya Rabbu an'im lana bi-maghfirat khatayana.", "Bi-salawat kahin el-haqq: abouna el-Qummus Bishoy Kamel: ya Rabbu an'im lana bi-maghfirat khatayana"], ["Bi-salawatihim ihfaz hayat abeena el-mukarram el-barr Anba ___ el-usquf (el-matran), ya Rabbu an'im 'alayna bi-maghfirat khatayana.", "Bi-salawatihim ihfaz hayat abeena el-mukarram el-barr Anba (...) el-usquf (el-mutran), ya Rabbu an'im 'alayna bi-maghfirat khatayana."]],
  },
  "lent-weekend-liturgy-paralex": {
    english: [["And we too let us fast, with purity and righteousness, and let us also pray, proclaiming and saying.", "And we too let us fast, with purity and righteousness, and let us pray, proclaiming and saying:"], ["Our Father who art in heaven, hallowed be Your name, may Your kingdom come, for Yours is the glory forever.", "Our Father who art in heaven / hallowed be Thy name / Thy kingdom come / for Thine is the glory forever."]],
  },
  "lent-weekend-liturgy-pihmot-gar": {
    english: [["May the clergy and all the people be safe in the Lord. Amen. So be it.", "May the clergy and all the people be safe in the Lord. Amen, so it shall be. it."]],
  },
  "lent-weekend-liturgy-praxis-response": {
    english: [["Blessed are You indeed, with Your good Father and the Holy Spirit, for You have come and saved us. Have mercy upon us.", "Blessed are You indeed, with Your good Father, and the Holy Spirit, for You have come and saved us. Have mercy on us."]],
    arabic: [["اذكرني يا رب، اذكرني يا إلهي، اذكرني يا ملكي، متى جئت في ملكوتك.", "اذكرني يا ربي، اذكرني يا إلهي، اذكرني يا ملكي، متي جئت في ملكوتك"]],
    englishArabic: [["Udhkurni ya Rabb, udhkurni ya Ilahi, udhkurni ya Maliki, mata gi'ta fi malakoutak.", "Udhkurni ya rabbi udhkurni ya Ilahi udhkurni ya Maliki mata gi'ta fi malakoutak"]],
  },
  "lent-weekend-matins-doxology-apostles": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛⲉⲙ ⲡⲓϣ̀ⲃⲉⲥ̀ⲛⲁⲩ ⲙ̀ⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲛⲁϭⲟⲓⲥ ⲛ̀ⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ: ⲛⲉⲙ ⲡⲓϣ̀ⲃⲉⲥ̀ⲛⲁⲩ ⲙ̀ⲙⲁⲑⲏⲧⲏⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Also Philip and Matthew, Bartholomew and Thomas: James the Son of Alphaeus: and Simon the Canaanite", "Philip and Matthew, Bartholomew and Thomas, James the Son of Alphaeus, and Simon the Canaanite."], ["Matthias, who was chosen, in place of Judas: all of them and the rest: followed the Master", "Matthias was chosen, instead of Judas, and was counted with the rest, who followed the Master."], ["Their voice went forth, upon the face of the whole earth: and their words have reached: the ends of the world", "Their voices went forth, onto the face of the whole earth, and their words have reached, the ends of the world."], ["Pray to the Lord on our behalf, my lords and fathers the apostles: and the seventy-two disciples: that He may forgive us our sins", "Pray to the Lord on our behalf, O my lords and fathers the Apostles, and the seventy two disciples, that He may forgive us our sins."]],
  },
  "lent-weekend-matins-doxology-conclusion": {
    coptic: [["Ⲧⲉⲛⲧϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ̀ Ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ Ⲡⲉⲛϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
  },
  "lent-weekend-matins-doxology-heavenly-beings": {
    coptic: [["Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲥ̀ⲧⲣⲁⲧⲓⲁ ⲛ̀ⲁⲅⲅⲉⲗⲓⲕⲟⲛ: ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲛⲓⲥ̀ⲧⲣⲁⲧⲓⲁ ⲛ̀ⲁⲅⲅⲉⲗⲓⲕⲟⲛ: ⲛⲉⲙ ⲛⲓⲧⲁⲅⲙⲁ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Intercede on our behalf, O angelic armies: and heavenly orders: that He may forgive us our sins", "Intercede on our behalf, O angelic hosts, and all the heavenly multitudes, that He may forgive us our sins."]],
  },
  "lent-weekend-matins-doxology-lent-3": {
    arabic: [["أخطأت أخطأت، يا ربي يسوع اغفر لي، لأنه ليس عبد بلا خطية، ولا سيد بلا مغفرة.", "أخطأت أخطأت، يا ربي يسوع إغفر لي، لأنه ليس عبد بلا خطية، ولا سيد بلا غفران."]],
    englishArabic: [["Akhta'tu akhta'tu, ya Rabbi Yasou' ighfir li, li-annahu laysa 'abd bila khatiyya, wa la sayyid bila maghfira.", "Akhta'tu akhta'tu, ya Rabbi Yasou' ighfir li, li-annahu laysa 'abdun bila khatiyya, wa la sayyidun bila ghufran."]],
  },
  "lent-weekend-matins-doxology-lent-4": {
    english: [["Let us worship our Savior, the Good Lover of mankind, because He had compassion on us, He came and saved us.", "Let us worship our Savior, the good Lover of Mankind, for He had compassion on us, He has come and saved us."]],
    arabic: [["فلنسجد لمخلصنا، الصالح محب البشر، لأنه تراءف علينا، أتى وخلصنا.", "فلنسجد لمخلصنا، محب البشر الصالح، لأنه تراءف علينا، أتى وخلصنا."]],
    englishArabic: [["Fal-nasgud li-mukhallisina, es-salih muhibb el-bashar, li-annahu tara'af 'alayna, ata wa khallasana.", "Fal-nasgud li-mukhallisina, muhibb el-bashar es-salih, li-annahu tara'af 'alayna, ata wa khallasana."]],
  },
  "lent-weekend-matins-doxology-philopater-mercurius": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲱ̀ ⲡⲓⲁ̀ⲑⲗⲟⲫⲟⲣⲟⲥ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ: Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Hail to you O martyr: hail to the noble hero: hail to the struggle-bearer: Philopater Mercurius", "Hail to you O martyr: hail to the courageous hero: hail to the struggle bearer: Philopater Mercurius."]],
  },
  "lent-weekend-matins-doxology-pope-kyrillos-vi": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϧⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: Ⲡⲉⲛⲓⲱⲧ ⲉⲑⲟⲩⲁⲃ ⲙ̀ⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ: Ⲡⲁⲡⲁ Ⲁⲃⲃⲁ Ⲕⲩⲣⲓⲗⲗⲟⲥ ⲡⲓⲙⲁϩⲥⲟⲟⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Pray to the Lord on our behalf: our holy father the patriarch: Abba Kyrillos the sixth: that He may forgive us our sins", "Pray to the Lord on our behalf: our holy father the patriarch: Papa Abba Kyrillos the Sixth: that He may forgive us our sins."]],
  },
  "lent-weekend-matins-doxology-sat-sun": {
    coptic: [["Ϯⲥⲱⲟ̀ⲩⲛ ϫⲉ Ⲛ̀ⲑⲟⲕ ⲟ̀ⲩⲁ̀ⲅⲁⲑⲟⲥ: ⲛ̀ⲣⲉϥϣⲉⲛϩⲏⲧ ⲟⲩⲟϩ ⲛ̀ⲛⲁⲏ̀ⲧ: ⲁ̀ⲣⲓⲡⲁⲙⲉⲩ̀ⲓ̀ ϧⲉⲛ ⲡⲉⲕⲛⲁⲓ: ϣⲁ ⲉ̀ⲛⲉϩ ⲛ̀ⲧⲉ ⲡⲓⲉ̀ⲛⲉϩ.", "Ϯⲥⲱⲟ̀ⲩⲛ ϫⲉ Ⲛ̀ⲑⲟⲕ ⲟ̀ⲩⲁ̀ⲅⲁⲑⲟⲥ: ⲛ̀ⲣⲉϥϣⲉⲛϩⲏⲧ ⲟⲩⲟϩ ⲛ̀ⲛⲁⲏ̀ⲧ: ⲁ̀ⲣⲓⲡⲁⲙⲉⲩ̀ⲓ̀ ϧⲉⲛ ⲡⲉⲕⲛⲁⲓ: ϣⲁ ⲉ̀ⲛⲉϩ ⲛ̀ⲧⲉ ⲛⲓⲉ̀ⲛⲉϩ."]],
    english: [["For I know that You are good, compassionate and patient, remember me in Your mercy, forever and ever.", "I know that You are good / compassionate and merciful. / Remember me in Your mercy / forever and ever."], ["I ask You O my Lord Jesus, do not destroy me in Your anger, and likewise also in Your wrath, do not chasten me for my ignorance.", "I ask You, O my Lord Jesus / do not chastise me with Your anger / nor also with Your wrath / do not chastise my ignorance."]],
  },
  "lent-weekend-matins-doxology-st-john": {
    arabic: [["اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر لنا خطايانا.", "اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر خطايانا."]],
    englishArabic: [["Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-ma'madan liyaghfir lana khatayana.", "Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-Ma'madan, li-yaghfir khatayana."]],
  },
  "lent-weekend-matins-doxology-st-john-2": {
    english: [["\"I saw the Holy Spirit, come down from heaven, I heard the voice of the Father, proclaiming and saying.\"", "I saw the Holy Spirit, coming down from heaven, I heard the voice of the Father, proclaiming and saying:"], ["\"This is My beloved Son, with whom My soul is well pleased, He does My will, hear Him, for He is the Life-Giver.\"", "\"This is My beloved Son, in whom I am well pleased, He has performed My will; obey Him, for He is the Giver of Life.\""]],
    arabic: [["ونظرت الروح القدس عندما نزل من السماء. وسمعت صوت الآب صارخاً قائلاً.", "نظرت الروح القدس، الذي نزل من السماء، وسمعت صوت الآب، يصرخ قائلًا:"], ["هذا هو ابني حبيبي الذي سرت به نفسي وصنع مشيئتي. اسمعوا له لأنه هو المحيي.", "هذا هو إبني حبيبي الذي سُرّت به نفسي وصنع مشيئتي له إسمعوا لأنه هو المحيي."], ["اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر لنا خطايانا.", "اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر خطايانا."]],
    englishArabic: [["Wa nazartu er-Rouh el-Qudus 'indama nazal min es-sama', wa sami'tu sawt el-Ab sarikhan qa'ilan.", "Nazartu er-Rouh el-Qudus, alladhi nazal min es-sama', wa sami'tu sawt el-Ab, yasrukh qa'ilan:"], ["Hadha huwa ibni habeebi alladhi surrat bihi nafsi wa sana' mashee'ati, isma'ou lahu li-annahu huwa el-muhyi.", "Hadha huwa Ibni habeebi alladhi surrat bihi nafsi wa sana'a mashee'ati, lahu isma'ou li-annahu huwa el-Muhyi."], ["Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-ma'madan liyaghfir lana khatayana.", "Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-Ma'madan, li-yaghfir khatayana."]],
  },
  "lent-weekend-matins-doxology-virgin-mary": {
    english: [["\"O our Lord Jesus Christ: make for Yourself within us: a temple of Your Holy Spirit: glorifying You.\"", "O our Lord Jesus Christ, make in us a sanctuary, for Your Holy Spirit, ever-glorifying You."]],
  },
  "lent-weekend-matins-intro-doxologies": {
    english: [["O Virgin Mary, the holy Theotokos, the faithful advocate for all mankind.", "O Virgin Mary, the holy Theotokos, the trusted advocate, of the human race."], ["Intercede on our behalf before Christ whom you bore, that He may grant us the forgiveness of our sins.", "Intercede on our behalf, before Christ whom you have born, that He may grant unto us, the forgiveness of our sins."], ["We ask you to remember us, O our faithful advocate, before our Lord Jesus Christ, that He may forgive us our sins.", "We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["أيتها العذراء مريم والدة الإله القديسة الشفيعة الأمينة لجنس البشر.", "أيتها العذراء مريم، والده الإله القديسة، الشفيعة الأمينة، التي لجنس البشر."], ["اشفعي فينا أمام المسيح الذي ولدتِه لكي ينعم لنا بمغفرة خطايانا.", "إشفعي فينا، أمام المسيح الذي ولدتِه، لكي ينعم علينا، بمغفرة خطايانا."], ["نسألكِ أن تذكرينا أيتها الشفيعة المؤتمنة أمام ربنا يسوع المسيح ليغفر لنا خطايانا.", "نَسْألُكِ اذْكرينا أيَّتُها الشَّفيعَةُ المؤْتَمَنةُ أَمامَ ربِّنا يَسوعِ المسيحِ ليغْفِرَ لَنا خَطايانا."]],
    englishArabic: [["Ayyatuha el-'Adhra' Maryam walidat el-Ilah el-qiddisa esh-shafi'a el-amina li-gins el-bashar.", "Ayyatuha el-'Adhra' Maryam, walidat el-Ilah el-qiddeesa, esh-shafee'a el-ameena, allati li-gins el-bashar."], ["Ishfa'i fina amam el-Maseeh elladhi waladtihi likay yun'im lana bi-maghfirat khatayana.", "Ishfa'i fina amam el-Maseeh elladhi waladtihi likay yun'im 'alayna bi-maghfirat khatayana."], ["Nas'aluki an tadhkureena ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana.", "Nas'aluki udhkurina ayyatuha esh-shafi'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana."]],
  },
  "lent-weekend-matins-verse-of-cymbals-lent": {
    english: [["Our Father who art in heaven, hallowed be Your name, Your kingdom come, for Yours is the glory forever.", "Our Father who art in heaven / hallowed be Thy name / Thy kingdom come / for Thine is the glory forever."]],
  },
  "lent-weekend-psalm-150": {
    english: [["Praise God in all His saints. Allelulia.", "Praise God in all His saints. Alleluia."]],
    arabic: [["هلليلويا. سبحوا الله في جميعِ قديسيه. هلليلويا.", "سبحوا الله في جميعِ قديسيه. هلليلويا."], ["مبارك الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Hallelouia. Sabbihou Allah fi gamee' qiddiseeh. Hallelouia.", "Sabbihou Allah fi gamee' qiddiseeh. Hallelouia."], ["Mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "lent-weekend-vespers-verse-of-cymbals-lent": {
    english: [["Our Father who art in heaven, hallowed be Your name, Your kingdom come, for Yours is the glory forever.", "Our Father who art in heaven / hallowed be Thy name / Thy kingdom come / for Thine is the glory forever."]],
  },
  "minorfeasts-feast-of-annunciation-liturgy-praxis-response": {
    english: [["Hail to you who has found grace, the Lord is with you, hail to you who accepted from the angel, the joy of the world", "Hail to you who has found grace, the Lord is with you, hail to you who accepted, the joy of the world."]],
  },
  "minorfeasts-feast-of-annunciation-liturgy-watos-aspasmos-he-bowed-the-heaven": {
    english: [["He bowed the heaven of heavens, and came to the womb of the Virgin, He became man like us, except for sin alone.", "He bowed the heaven of heavens, and came to the womb of the Virgin, He became man like us, save for sin alone."]],
    arabic: [["طأطأ سماء السموات، وجاء إلى بطن العذراء، وصار إنساناً مثلنا، ما خلا الخطية وحدها.", "طأطأ سماء السموات، وأتى إلى بطن العذراء، وصار إنساناً مثلنا، ما خلا الخطية وحدها."]],
    englishArabic: [["Ta'ta'a sama' es-samawat, wa ga'a ila batn el-'Adhra', wa sara insanan mithlana, ma khala el-khatiyya wahdaha.", "Ta'ta'a sama' es-samawat, wa ata ila batn el-'Adhra', wa sara insanan mithlana, ma khala el-khatiyya wahdaha."]],
  },
  "minorfeasts-wedding-at-cana-of-galilee-liturgy-the-first-miracle": {
    english: [["Jesus of Nazareth, blessed the water and it became wine, no one has seen such wonder, since the times of Adam till today.", "Jesus of Nazareth, blessed the water and it became wine, no one have seen such wonder, since the times of Adam till today."], ["Jesus Christ the same yesterday, today and forever, in one hypostasis, we worship and glorify Him.", "Jesus Christ is the same yesterday, today and forever, in one hypostasis, we worship Him and glorify Him."], ["Intercede on our behalf, O the Lady of us all the Theotokos, Mary the Mother of our Savior, that He may forgive us our sins.", "Intercede on our behalf, O Lady of us all, the Theotokos, Mary, the mother of our Savior, that He may forgive us our sins."]],
  },
  "nativity-fast-liturgy-gospel-response-wks-3and4": {
    english: [["We magnify you worthily, with Elizabeth your cousin saying, \"Blessed are you among women, and blessed is the fruit of your womb.\"", "We exalt you worthily, with Elizabeth your cousin, saying Blessed are you among women, and blessed is the fruit of your womb."]],
    arabic: [["نعظمكِ بإستحقاق، مع أليصابات نسيبتِك قائلين، \"مباركة أنتِ في النساء، ومباركة هي ثمرة بطنِك.\"", "نعظمكِ باستحقاق مع أليصابات نسيبتك، مباركة أنت في النساء ومباركة هي ثمرة بطنك."]],
    englishArabic: [["Nu'azzimuki bi-istihqaq, ma'a Aleesabat naseebatiki qa'ileen, \"Mubarakatun anti fin-nisa', wa mubarakatun hiya thamaratu batniki.\"", "Nu'azzimuki bi-istihqaq ma'a Aleesabat naseebatiki Mubarakatun anti fin-nisa' wa mubarakatun hiya thamaratu batniki."]],
  },
  "nativity-fast-liturgy-gospel-response-wks1and2": {
    english: [["We give unto you greeting, with Gabriel the angel saying, \"Hail to you O full of grace, the Lord is with you.\"", "We send you greetings / with Gabriel the angel / saying, “Hail to you O full of grace, / the Lord is with you.”"]],
  },
  "nativity-fast-liturgy-psalm-150": {
    english: [["+ Glory be to the Father, and the Son and the Holy Spirit.", "+ Glory to the Father, and the Son, and the Holy Spirit."], ["Now and forever and unto the age of all ages Amen.", "Now and ever and unto the age of ages. Amen."], ["+ Alleluia, Alleluia, glory be to our God.", "+ Alleluia. Alleluia. Glory to You, our God."]],
    arabic: [["هلليلويا، هلليلويا. المجد لك يا إلهنا هلليلويا.", "هلليلويا، هلليلويا. المجد هو لإلهنا."]],
    englishArabic: [["Hallelouia, hallelouia. El-magd laka ya ilahana, hallelouia.", "Hallelouia hallelouia. El-magd huwa li-ilahina."]],
  },
  "nativity-fast-matins-doxology-intro": {
    coptic: [["Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀ ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ ⲛⲁϩⲣⲉⲛ ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀ ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ ⲛⲁϩⲣⲉⲛ ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["O Virgin Mary, the holy Mother of God, the trusted advocate, of the human race.", "O Virgin Mary, the holy Theotokos, the trusted advocate, of the human race."], ["+ Intercede on our behalf, before Christ to whom you gave birth, that He may grant us, the forgiveness of our sins.", "+ Intercede on our behalf, before Christ whom you have born, that He may grant unto us, the forgiveness of our sins."], ["Hail to you O Virgin, the very and true queen, hail to the pride of our race, who gave birth to Emmanuel.", "Hail to you O Virgin / the right and true Queen. / Hail to the pride of our race / who bore to us Emmanuel."], ["+ We ask you to remember us, O our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins.", "+ We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["أيتها العذراء مريم، والدة الإله القديسة، الشفيعة المؤتمنة، لجنس البشرية.", "أيتها العذراء مريم، والده الإله القديسة، الشفيعة الأمينة، التي لجنس البشر."]],
    englishArabic: [["Ayyatuha el-'Adhra' Maryam, walidat el-Ilah el-qiddeesa, esh-shafee'a el-mu'tamana, li-gins el-bashariyya.", "Ayyatuha el-'Adhra' Maryam, walidat el-Ilah el-qiddeesa, esh-shafee'a el-ameena, allati li-gins el-bashar."]],
  },
  "nativity-fast-matins-first-doxology": {
    coptic: [["+ Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ̀ ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ ⲛⲁϩⲣⲉⲛ ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "+ Ⲧⲉⲛϯϩⲟ ⲁⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀ ⲱ̀ ϯⲡ̀ⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ ⲛⲁϩⲣⲉⲛ ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["Hail to you O Virgin, the very and true queen, hail to the pride of our race, who gave birth to Emmanuel.", "Hail to you O Virgin / the right and true Queen. / Hail to the pride of our race / who bore to us Emmanuel."], ["+ We ask you to remember us, O our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins.", "+ We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
  },
  "nativity-fast-midnight-second-hos-psali": {
    english: [["My heart and my tongue: Praise the trinity: O holy trinity have mercy on us.", "(Refrain) My heart and my tongue / praise the Trinity / O Holy Trinity / have mercy upon us."]],
  },
  "nativity-fast-midnight-song-of-the-three-holy-youth-2": {
    english: [["When they were raised to take glory in their bodies, the angel came down, stopped the fire and became cool for Hananiah Azariah and Mishael.", "When they were raised to take glory in their bodies, an Angel came down, stopped the fire and made it cool for Hananiah Azariah and Mishael."]],
  },
  "nativity-liturgy-apenchois": {
    english: [["The Cherubim and the Seraphim, the angels and the archangels, the principalities and the authorities, the thrones and the powers.", "The Cherubim and the Seraphim, the angels and the archangels, the principalities and the authorities, the thrones, the dominions and the powers."]],
  },
  "nativity-liturgy-e-parthenos": {
    english: [["Today, the virgin bears Him who is transcendent, and the earth presents the cave to Him who is beyond reach. Angels, along with shepherds glorify Him. The Magi make their way to Him by a star. For a new child has been born for us, the God before all ages", "Today, the virgin gives birth to Him who is transcendent, and the earth offers the cave to Him who is unapproachable. Angels along with shepherds glorify Him. The Magi make their way to Him by a star. For a new child has been born for us, the God before all ages."]],
  },
  "nativity-liturgy-pi-jen-misi": {
    english: [["The virginal birth and spiritual contractions, are marvelous wonders according to the prophetic sayings.", "The virginal birth and spiritual pangs: a paradoxical wonder according to the prophetic sayings."]],
  },
  "nativity-liturgy-praxis-response": {
    english: [["Blessed are You indeed, with Your good Father and the Holy Spirit, for You were born and saved us. Have mercy upon us.", "Blessed are You indeed, with Your good Father, and the Holy Spirit, for You were born and saved us. Have mercy on us."]],
  },
  "nativity-liturgy-praxis-response-nativity-paramoun": {
    english: [["O what divine, and mysterious pangs, that are for the Theotokos Mary, the ever-Virgin.", "O what mysterious emissions, of God that are for, Mary the Theotokos, the Ever-Virgin."]],
    arabic: [["يا للطلقات الإلهية المتعجب منها التى لوالدة الإله مريم العذراء كل حين.", "يا للطلقات الإلهية، العجيبة التي، لوالدة الإله مريم، العذراء كل حين."]],
    englishArabic: [["Ya lit-talaqat el-ilahiyya el-muta'aggab minha, allati li-walidat el-Ilah Maryam el-'Adhra' kull heen.", "Ya lit-talaqat el-ilahiyya el-'ageeba allati li-walidat el-Ilah Maryam el-'Adhra' kull heen."]],
  },
  "nativity-liturgy-trisagion-agios": {
    english: [["Glory be to the Father and the Son and the Holy Spirit, now and ever and unto the ages of the ages. Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["قدوسُ الله. قدوسُ القوى. قدوسُ الحي الذي لا يموتُ. يا من وُلِّدَ من العذراء، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى وُلِدَ مِنَ العَذْراءِ إرْحَمْنا."], ["المجد للآب والإبن، والروح القدوس، الآن وكل أوان، وإلى دهر الدهور آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["Quddous Allah. Quddous el-qawi. Quddous el-hayy alladhi la yamout. Ya man wulida min el-'Adhra', irhamna.", "Quddousun Allah. Quddousun el-qawi. Quddousun el-hayy alladhi la yamout alladhi wulida min el-'Adhra' irhamna."], ["El-magd lil-Ab wal-Ibn, war-Rouh el-Quddous, el-an wa kull awan, wa ila dahr ed-duhour. Ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "nativity-matins-7-tunes": {
    english: [["+ You came into the world, through Your love for man, and all the creation, rejoiced at Your coming.", "+ You came into the world, through Your love for mankind, and all the creation rejoiced, at Your coming."], ["You have saved Adam, from seduction, and delivered Eve, from the pangs of death.", "You have saved Adam, from deception, and delivered Eve, from the pangs of death."], ["Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.", "Your mercies O my God: are countless: and exceedingly plenteous: are Your compassions."], ["How much more are, the sins of my soul, manifest before You, O my God.", "How much more are: the sins of my soul: manifest before You: O my Lord."], ["+ And me too, the sinner, teach me O my Master, to offer repentance.", "+ And I too: the sinner: teach me O my Lord: to offer repentance."], ["For You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.", "For You do not desire: the death of a sinner: but rather that he return: and that his soul may live."], ["For You are good, and merciful, let Your compassion, speedily come to us.", "For You are good: and merciful: let Your compassions: speedily come to us."], ["O King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.", "O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins."], ["+ Disperse the enemies, of the Church, and fortify her, that she may not be shaken forever.", "+ Disperse the enemies, of the Church, and fortify her, that she may never be shaken. forever."]],
    arabic: [["أيها النور الحقيقي، الذي يضئ، لكل إنسان، آتٍ إلى العالم.", "أيها النور الحقيقي، الذي يضئ، لكل إنسان، آتياً إلى العالم."], ["يمسح كل يوم، الشيوخ، والصبيان والفتيات، والخدام.", "يمسح كل يوم، الشيوخ، والصبيان والفتيان، والخدام."], ["ردنا يا الله، إلى خلاصك، وعاملنا، كصلاحك.", "ردنا يا الله، إلي خلاصك، وإصنع معنا، كصلاحك."]],
    englishArabic: [["Ayyuha en-nour el-haqeeqi, elladhi yudee', li-kull insan, atin ila el-'alam.", "Ayyuha en-nour el-haqeeqi elladhi yudee' li-kull insan atiyan ila el-'alam."], ["Yamsah kull yawm, esh-shuyoukh, wal-sibyan wal-fatayat, wal-khuddam.", "Yamsah kull yawm, esh-shuyoukh, wes-sibyan wal-fityan, wal-khuddam."], ["Ruddana ya Allah, ila khalasik, wa 'amilna, ka-salahik.", "Ruddana ya Allah ila khalasik, wasna' ma'ana ka-salahik."]],
  },
  "nativity-matins-7-tunes-1": {
    english: [["+ You came into the world, through Your love for man, and all the creation, rejoiced at Your coming.", "+ You came into the world, through Your love for mankind, and all the creation rejoiced, at Your coming."], ["You have saved Adam, from seduction, and delivered Eve, from the pangs of death.", "You have saved Adam, from deception, and delivered Eve, from the pangs of death."]],
    arabic: [["أيها النور الحقيقي، الذي يضئ، لكل إنسان، آتٍ إلى العالم.", "أيها النور الحقيقي، الذي يضئ، لكل إنسان، آتياً إلى العالم."]],
    englishArabic: [["Ayyuha en-nour el-haqeeqi, elladhi yudee', li-kull insan, atin ila el-'alam.", "Ayyuha en-nour el-haqeeqi elladhi yudee' li-kull insan atiyan ila el-'alam."]],
  },
  "nativity-matins-7-tunes-5": {
    arabic: [["يمسح كل يوم، الشيوخ، والصبيان والفتيات، والخدام.", "يمسح كل يوم، الشيوخ، والصبيان والفتيان، والخدام."]],
    englishArabic: [["Yamsah kull yawm, esh-shuyoukh, wal-sibyan wal-fatayat, wal-khuddam.", "Yamsah kull yawm, esh-shuyoukh, wes-sibyan wal-fityan, wal-khuddam."]],
  },
  "nativity-matins-7-tunes-7": {
    english: [["Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.", "Your mercies O my God: are countless: and exceedingly plenteous: are Your compassions."], ["How much more are, the sins of my soul, manifest before You, O my God.", "How much more are: the sins of my soul: manifest before You: O my Lord."], ["+ And me too, the sinner, teach me O my Master, to offer repentance.", "+ And I too: the sinner: teach me O my Lord: to offer repentance."], ["For You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.", "For You do not desire: the death of a sinner: but rather that he return: and that his soul may live."], ["For You are good, and merciful, let Your compassion, speedily come to us.", "For You are good: and merciful: let Your compassions: speedily come to us."], ["O King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.", "O King of peace, grant us Your peace, establish for us Your peace, and forgive us our sins."], ["+ Disperse the enemies, of the Church, and fortify her, that she may not be shaken forever.", "+ Disperse the enemies, of the Church, and fortify her, that she may never be shaken. forever."]],
    arabic: [["ردنا يا الله، إلى خلاصك، وعاملنا، كصلاحك.", "ردنا يا الله، إلي خلاصك، وإصنع معنا، كصلاحك."]],
    englishArabic: [["Ruddana ya Allah, ila khalasik, wa 'amilna, ka-salahik.", "Ruddana ya Allah ila khalasik, wasna' ma'ana ka-salahik."]],
  },
  "nativity-matins-first-doxology": {
    english: [["+ This is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.", "+ This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."]],
  },
  "nativity-matins-gospel-response": {
    coptic: [["Ϫⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ Ⲫ̀ⲓⲱⲧ ⲛⲙ ⲡ̀Ϣⲏⲣⲓ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ϯⲦ̀ⲣⲓⲁⲥ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ ⲧⲉⲛⲟ̀ⲩⲱ̀ϣⲧ ⲙ̀ⲙⲟⲥ ⲧⲉⲛϯⲱ̀ⲟ̀ⲩ ⲛⲁⲥ.", "Ϫⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ ⲡ̀Ϣⲏⲣⲓ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ϯⲦ̀ⲣⲓⲁⲥ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ ⲧⲉⲛⲟ̀ⲩⲱ̀ϣⲧ ⲙ̀ⲙⲟⲥ ⲧⲉⲛϯⲱ̀ⲟ̀ⲩ ⲛⲁⲥ."]],
    english: [["For the Incorporeal was incarnate, and the Word became flesh, the One without beginning began, the Eternal came under time.", "For the One without flesh was incarnate, and the Word took body, the One with no beginning began, and the eternal one became temporal."], ["This is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.", "This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."]],
  },
  "nativity-matins-psalm-response": {
    english: [["Alleluia, Alleluia. Jesus Christ the Son of God was born of the Virgin in Bethlehem of Judea according to the prophetic sayings. Alleulia, Alleluia.", "Alleluia, Alleluia. Jesus Christ the Son of God / was born of the Virgin in Bethlehem of Judea / according to the prophetic voices. Alleluia, Alleluia."]],
  },
  "nativity-matins-verses-of-the-cymbals": {
    english: [["+ Hail to the Cherubim, hail to the Seraphim, hail to all the hosts, of the heavens.", "+ Hail to the cherubim: hail to the seraphim: hail to all: the heavenly orders."], ["+ Hail to the whole choir, of the martyrs, hail to Abba Antony, and the three Macarii.", "+ Hail to the whole choir, of the martyrs, hail to Abba Anthony, and the three Macarii."], ["+ Through their prayers, O Christ our King, have mercy upon us, in Your kingdom.", "+ Through their prayers, O Christ our King, have mercy on us, in Your kingdom."], ["The virginal birth, and the spiritual emissions, are an amazing wonder, according to the prophets.", "The virginal birth, and the spiritual pangs, – a paradoxical wonder, according to the prophetic voices!"]],
  },
  "nativity-midnight-nativity-ode": {
    arabic: [["باركو عليَّ ، باركوا عليَّ، ها مطانية، اغفروا لي يا آبائی وإخوتي، صلوا عليَّ، بالمحبة أسألكم اذكروني.", "باركوا عليَّ، باركوا عليَّ، ها مطانية، اغفروا لي يا آبائي وإخوتي، صلوا عليَّ، بالمحبة أسألكم اذكروني."]],
    englishArabic: [["Barikou 'alayy, barikou 'alayy, ha metanoia, ighfirou li ya aba'i wa ikhwati, sallou 'alayy, bil-mahabba as'alukum udhkurouni.", "Barikou 'alayya, barikou 'alayya, ha metanoia, ighfirou li ya aba'i wa ikhwati, sallou 'alayya, bil-mahabba as'alukum udhkurouni."]],
  },
  "nativity-midnight-psali-watos-on-wednesday-theotokia": {
    english: [["Come all to praise, our Lord Jesus Christ, the Son of God in truth, who was born in Bethlehem.", "O come all, to praise / our Lord Jesus Christ / Son of God in truth / who was born in Bethlehem."]],
    arabic: [["تعالوا جميعاً لنسبح، ربنا يسوع المسيح، إبن الله حقاً، الذي وُلد في بيت لحم.", "تعالوا جميعكم لنسبح، ربنا يسوع المسيح، ابن الله بالحقيقة، ، الذي ولد في بيت لحم."]],
    englishArabic: [["Ta'alou gamee'an li-nusabbih, Rabbana Yasou' el-Maseeh, Ibn Allah haqqan, elladhi wulida fi Bayt Lahm.", "Ta'alou gamee'akum li-nusabbih Rabbana Yasou' el-Maseeh, Ibn Allah bil-haqeeqa, alladhi wulida fi Bayt Lahm."]],
  },
  "nayrouz-liturgy-gospel-response": {
    english: [["This is He who is worthy of glory, with His Good Father, and the Holy Spirit, both now and forever.", "This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."]],
  },
  "nayrouz-liturgy-praxis-response": {
    coptic: [["Ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀⳪ ⲛⲓⲁ̀ⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲙⲟⲩⲙⲓ ⲛⲉⲙ ⲛⲓⲥⲓϯ ⲛⲉⲙ ⲛⲓⲕⲁⲣⲡⲟⲥ.", "Ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀⳪ ⲛⲓⲓⲁⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲙⲟⲩⲙⲓ ⲛⲉⲙ ⲛⲓⲥⲓϯ ⲛⲉⲙ ⲛⲓⲕⲁⲣⲡⲟⲥ."]],
    english: [["Bless the crown of the year with Your goodness O Lord. the rivers, the springs, the plants, and the crops.", "Bless the crown of the year, with Your goodness O Lord, the rivers and the fountains, the plants and the fruits."]],
  },
  "nayrouz-liturgy-psalm-response": {
    coptic: [["Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀⳪ ⲛⲓⲁ̀ⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲙⲟⲩⲙⲓ ⲛⲉⲙ ⲛⲓⲥⲓϯ ⲛⲉⲙ ⲛⲓⲕⲁⲣⲡⲟⲥ. Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅.", "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀⳪ ⲛⲓⲓⲁⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲙⲟⲩⲙⲓ ⲛⲉⲙ ⲛⲓⲥⲓϯ ⲛⲉⲙ ⲛⲓⲕⲁⲣⲡⲟⲥ. Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅."]],
    english: [["Alleluia Alleluia, bless the crown of the year with Your goodness O Lord. The rivers, the springs, the plants, and the crops. Alleluia Alleluia.", "Alleluia alleluia, Bless the crown of the year, with Your goodness O Lord, the rivers and the fountains, the plants and the fruits, alleluia alleluia."]],
  },
  "nayrouz-matins-doxology": {
    english: [["+ We praise and glorify Him, and exalt Him above all, as a good One and Lover of man, have mercy upon us according to Your great mercy.", "+ We praise and glorify Him, / and exceedingly exalt Him, / as the Good One and Lover of Mankind. / Have mercy on us according to Your great mercy."]],
  },
  "nayrouz-matins-gospel-response": {
    english: [["This is He who is worthy of glory, with His Good Father, and the Holy Spirit, both now and forever.", "This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."]],
  },
  "nayrouz-matins-psalm-response": {
    coptic: [["Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀⳪ ⲛⲓⲁ̀ⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲙⲟⲩⲙⲓ ⲛⲉⲙ ⲛⲓⲥⲓϯ ⲛⲉⲙ ⲛⲓⲕⲁⲣⲡⲟⲥ. Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅.", "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀⳪ ⲛⲓⲓⲁⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲙⲟⲩⲙⲓ ⲛⲉⲙ ⲛⲓⲥⲓϯ ⲛⲉⲙ ⲛⲓⲕⲁⲣⲡⲟⲥ. Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅."]],
    english: [["Alleluia Alleluia, bless the crown of the year with Your goodness O Lord. The rivers, the springs, the plants, and the crops. Alleluia Alleluia.", "Alleluia alleluia, Bless the crown of the year, with Your goodness O Lord, the rivers and the fountains, the plants and the fruits, alleluia alleluia."]],
  },
  "other-cymbals-macarius": {
    english: [["Hail to the great Abba Macarius / the lamp of monasticism and his children / the cross-bearers / that He may forgive us our sins.", "Hail to the great abba Macarius: the lamp of monasticism and his children: the cross bearers: the beloved of Christ."]],
  },
  "other-cymbals-mary": {
    arabic: [["بشفاعات والدة الإله القديسة مريم، يارب أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddeesa Maryam, ya Rabbu an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "other-doxology-another-doxology-for-st-john-the-baptist": {
    english: [["\"I saw the Holy Spirit, come down from heaven, I heard the voice of the Father, proclaiming and saying.\"", "I saw the Holy Spirit, coming down from heaven, I heard the voice of the Father, proclaiming and saying:"], ["\"This is My beloved Son, with whom My soul is well pleased, He does My will hear Him, for He is the life Giver.\"", "\"This is My beloved Son, in whom I am well pleased, He has performed My will; obey Him, for He is the Giver of Life.\" Giver.\""]],
    arabic: [["ونظرت الروح القدس عندما نزل من السماء. وسمعت صوت الآب صارخا قائلا.", "نظرت الروح القدس، الذي نزل من السماء، وسمعت صوت الآب، يصرخ قائلًا:"], ["هذا هو ابنى حبيبى الذى سرت به نفسى وصنع مشيئتى. إسمعوا له لأنه هو المحيى.", "هذا هو إبني حبيبي الذي سُرّت به نفسي وصنع مشيئتي له إسمعوا لأنه هو المحيي."]],
    englishArabic: [["Wa nazartu er-Rouh el-Qudus 'indama nazala min es-sama'. Wa sami'tu sawt el-Ab sarikhan qa'ilan.", "Nazartu er-Rouh el-Qudus, alladhi nazal min es-sama', wa sami'tu sawt el-Ab, yasrukh qa'ilan:"], ["Hadha huwa Ibni Habeebi alladhi surrat bihi nafsi wa sana'a mashee'ati. Isma'ou lahu li-annahu huwa el-Muhyi.", "Hadha huwa Ibni habeebi alladhi surrat bihi nafsi wa sana'a mashee'ati, lahu isma'ou li-annahu huwa el-Muhyi."]],
  },
  "other-doxology-another-doxology-for-st-mark-the-apostle": {
    arabic: [["أُطلب من الرب عنا، يا ناظر الإله الإنجيلي، مرقس الرسول، ليغفر لنا خطايانا.", "اطلب من الرب عنا ياناظر الإله الإنجيلي مرقس الرسول ليغفر لنا خطايانا."]],
  },
  "other-doxology-doxology-for-all-the-heavenly-beings": {
    english: [["Intercede on our behalf, O angelic armies, and heavenly orders, that He may forgive us our sins.", "Intercede on our behalf, O angelic hosts, and all the heavenly multitudes, that He may forgive us our sins."]],
  },
  "other-doxology-doxology-for-archangel-michael": {
    english: [["Intercede on our behalf: O holy archangel: Michael the head of heavenly: that He may forgive us our sins.", "Intercede on our behalf: O holy archangel: Michael the head of the heavenly: that He may forgive us our sins."]],
    arabic: [["اشفع فينا أمام الرب يا رئيس الملائكة الطاهر ميخائيل رئيس السمائيين ليغفر لنا خطايانا.", "اشفع فينا يارئيس الملائكة الطاهر ميخائيل رئيس السمائيين ليغفر لنا خطايانا."]],
    englishArabic: [["Ishfa' feena amam er-Rabb ya ra'ees el-mala'ika et-tahir Mikhail ra'ees es-sama'iyyeen li-yaghfira lana khatayana.", "Ishfa' feena ya ra'ees el-mala'ika et-tahir Mikha'eel ra'ees es-sama'iyyeen li-yaghfir lana khatayana."]],
  },
  "other-doxology-doxology-for-archangel-suriel": {
    arabic: [["اشفع فينا أمام الرب، يارئيس الملائكة الطاه،ر سوريال المبوق، ليغفر لنا خطايانا.", "اشفع فينا أمام الرب يارئيس الملائكة الطاهر سوريال المبوق ليغفر لنا خطايانا."]],
  },
  "other-doxology-doxology-for-st-antony-and-st-paul": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀ⲡϭⲟⲓⲥ ⲉϩ̀ⲣⲏⲓ ⲉϫⲱⲛ: ⲱ ⲛⲁⲟ︦ⲥ︦ ⲛ̀ⲓⲟϯ ⲙ̀ⲙⲁⲓⲛⲟⲩϣⲏⲣⲓ: ⲁⲃⲃⲁ Ⲁⲛⲧⲱⲛⲓⲟⲥ ⲛⲉⲙ ⲁⲃⲃⲁ Ⲡⲁⲩⲗⲉ: ⲛ̀ⲧⲉⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀ⲡϭⲟⲓⲥ ⲉϩ̀ⲣⲏⲓ ⲉϫⲱⲛ: ⲱ ⲛⲁⲟ︦ⲥ︦ ⲛ̀ⲓⲟϯ ⲙ̀ⲙⲁⲓⲛⲟⲩϣⲏⲣⲓ: ⲁⲃⲃⲁ Ⲁⲛⲧⲱⲛⲓⲟⲥ ⲛⲉⲙ ⲁⲃⲃⲁ Ⲡⲁⲩⲗⲉ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉⲃⲟⲗ."]],
    english: [["Pray to the Lord on our behalf: my lords and fathers who love their children: Abba Anthony and Abba Paul: that He may forgive us our sins.", "Pray to the Lord on our behalf, O my masters and fathers who loved their children, Abba Antony and Abba Paul, that He may forgive us our sins."]],
  },
  "other-doxology-doxology-for-st-athanasius-the-apostolic": {
    coptic: [["Ⲱⲥⲁⲩⲧⲱⲥ ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟⲕ: ⲛⲉⲙ ⲡⲓϩⲩⲙⲛⲟⲩⲇⲟⲥ ⲇⲁⲩⲓⲇ: ϫⲉ ⲛ̀ⲑⲟⲕ ⲡⲉ ⲡⲓⲟⲩⲏⲃ ϣⲁ ⲉ̀ⲛⲉϩ: ⲕⲁⲧⲁ ⲧⲧⲁⲝⲓⲥ ⲙ̀ⲙⲉⲗⲭⲓⲥⲉⲇⲉⲭ.", "Ⲱⲥⲁⲩⲧⲱⲥ ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟⲕ: ⲛⲉⲙ ⲡⲓϩⲩⲙⲛⲟⲇⲟⲥ ⲇⲁⲩⲓⲇ: ϫⲉ ⲛ̀ⲑⲟⲕ ⲡⲉ ⲡⲓⲟⲩⲏⲃ ϣⲁ ⲉ̀ⲛⲉϩ: ⲕⲁⲧⲁ ⲧⲧⲁⲝⲓⲥ ⲙ̀Ⲙⲉⲗⲭⲓⲥⲉⲇⲉⲕ."]],
    english: [["We therefore magnify You, along with David the prophet, for You are the priest forever, on the order of Melchizedek.", "Likewise we exalt you, with David the Psalmist, \"You are a priest forever, according to the order of Melchizedek.\""], ["Hail to the great patriarch, our holy father Saint Athanasius, whose holy teachings, enlightened our minds.", "Hail to the great patriarch, our holy father Abba Athanasius, whose holy teachings, enlightened our minds."]],
    arabic: [["إننا هكذا نعظمك مع المرتل داود فإنك أنت الكاهن إلى الأبد على طقس ملكي صادق.", "كذلك نعظمك، مع المرتل داود قائلين، \"أنت هو الكاهن إلى الأبد، على طقس ملكي صادق.\""], ["أطلب من الرب عنا أيها الاب القديس البطريرك الأنبا أثناسيوس الرسولي ليغفر لنا خطايانا.", "أطلب من الرب عنا أيها الاب القديس البطريرك الأنبا أثناسيوس الرسولي ليغفر لنا خطينا ."]],
    englishArabic: [["Innana hakadha nu'azzimuka ma'a el-murattil Dawoud fa-innaka anta el-kahin ila el-abad 'ala taqs Malki Sadiq.", "Kadhalika nu'azzimuka ma'a el-murattil Dawoud qa'ileen \"anta huwa el-kahin ila el-abad 'ala taqs Malki Sadiq.\""], ["Utlub min er-Rabb 'anna ayyuha el-Ab el-qiddees el-Batriyark el-Anba Athanasios er-Rasouli li-yaghfira lana khatayana.", "Utlub min er-Rabb 'anna ayyuha el-Ab el-qiddees el-Batriyark el-Anba Athanasios er-Rasouli li-yaghfira lana khatayana ."]],
  },
  "other-doxology-doxology-for-st-cyril-of-alexandria": {
    english: [["Blessed are you indeed, our holy father the patriarch, abba Cyril the pillar of the faith, the beloved of Christ.", "Blessed are you indeed, our holy father the patriarch, Saint Cyril the pillar of faith, the beloved of Christ."]],
  },
  "other-doxology-doxology-for-st-demiana": {
    arabic: [["طوباك يادميانه، عروس الختن، الراهبة البتول، المختارة الشهيدة الحقيقية.", "طوباك انت يا دميانه عروس الختن الراهبة البتول المختارة الشهيدة الحقيقية."]],
    englishArabic: [["Toubaki ya Dimyana, 'Arous el-Khatan, er-rahiba el-batoul, el-mukhtara esh-shaheeda el-haqeeqiyya.", "Toubaki anti ya Dimyana 'arous el-khatan, er-rahiba el-batoul el-mukhtara, esh-shaheeda el-haqeeqiyya."]],
  },
  "other-doxology-doxology-for-st-isidore-the-priest": {
    english: [["Blessed are you indeed, / O our holy wise father, / Abba Isidore the priest, / beloved of Christ.", "Blessed are you indeed, / O our holy wise father, / Abba Isidore the priest, / the beloved of Christ."]],
  },
  "other-doxology-doxology-for-st-mary-magdalene": {
    english: [["Pray to the Lord on our behalf: O the disciple of Christ: saint Mary Magdalene: that He may forgive us our sins.", "Pray to the Lord on our behalf: O saint Mary Magdalene: and the myrrh bearing women: that He may forgive us our sins."]],
    arabic: [["اطلبي من الرب عنا: يا تلميذة المسيح: القديسة مريم المجدلية: ليغفر لنا خطايانا.", "اطلبي من الرب عنا: ايتها القديسة مريم المجدلية: والنسوة حاملات الطيب: ليغفر لنا خطايانا."]],
    englishArabic: [["Utlubi min er-Rabb 'anna: ya tilmeedhat el-Maseeh: el-qiddeesa Maryam el-Magdaliyya: li-yaghfira lana khatayana.", "Utlubi min er-Rabb 'anna: ayyatuha el-qiddeesa Maryam el-Magdaliyya: wan-niswa hamilat et-teeb: li-yaghfir lana khatayana."]],
  },
  "other-doxology-doxology-for-st-philopater-mercurius": {
    english: [["Hail to you O martyr: hail to the noble hero: hail to the struggle-bearer: Philopater Mercurius.", "Hail to you O martyr: hail to the courageous hero: hail to the struggle bearer: Philopater Mercurius."]],
  },
  "other-doxology-doxology-for-st-pope-kyrillos-vi": {
    english: [["Pray to the Lord on our behalf: our holy father the patriarch: Abba Kyrillos the sixth: that He may forgive us our sins.", "Pray to the Lord on our behalf: our holy father the patriarch: Papa Abba Kyrillos the Sixth: that He may forgive us our sins."]],
  },
  "other-doxology-doxology-for-st-roweis": {
    coptic: [["Ⲧⲱⲃϩ ⲙ̀Ⲡⲟ︦ⲥ︦ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ⲅⲱⲛ: ⲡⲉⲛⲓⲱⲧ ⲉ︦ⲑ︦ⲩ︦ ⲛ̀ⲇⲓⲕⲉⲟⲥ: ⲁⲃⲃⲁ Ⲧⲉϫⲓ ⲑⲉⲟⲫⲁⲛⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲱⲃϩ ⲙ̀Ⲡⲟ︦ⲥ︦ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ: ⲡⲉⲛⲓⲱⲧ ⲉ︦ⲑ︦ⲩ︦ ⲛ̀ⲇⲓⲕⲉⲟⲥ: ⲁⲃⲃⲁ Ⲧⲉϫⲓ ⲑⲉⲟⲫⲁⲛⲓⲟⲥ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
  },
  "other-doxology-doxology-for-st-sarapamon-bishop-of-nikios": {
    english: [["Likewise we magnify you, with David the psalmist, You are a priest forever, according to the order of Melchizedek.", "Likewise we exalt you, with David the Psalmist, \"You are a priest forever, according to the order of Melchizedek.\""]],
    arabic: [["لذلك نرفعك، مع المرنم داود قائلين، انك انت هو الكاهن الى الأبد، على رتبة ملشيصاداق.", "كذلك نعظمك، مع المرتل داود قائلين، \"أنت هو الكاهن إلى الأبد، على طقس ملكي صادق.\""]],
    englishArabic: [["Li-dhalik narfa'uk, ma'a el-murannim Dawoud qa'ileen, innaka anta huwa el-kahin ila el-abad, 'ala rutbat Malshisadaq.", "Kadhalika nu'azzimuki ma'a el-murattil Dawoud qa'ileen \"anta huwa el-kahin ila el-abad 'ala taqs Malki Sadeq.\""]],
  },
  "other-doxology-doxology-for-st-severus-patriarch-of-antioch": {
    english: [["Likewise we magnify You: with David the psalmist: You are the priest forever: according to the order of Melchizedek.", "Likewise we exalt you, with David the Psalmist, \"You are a priest forever, according to the order of Melchizedek.\""]],
    arabic: [["لذلك نرفعك، مع المرتل داود قائلين، أنت هو الكاهن إلى الأبد، على طقس ملشيصاداق.", "كذلك نعظمك، مع المرتل داود قائلين، \"أنت هو الكاهن إلى الأبد، على طقس ملكي صادق.\""]],
    englishArabic: [["Li-dhalik narfa'uk, ma'a el-murattil Dawoud qa'ileen, anta huwa el-kahin ila el-abad, 'ala taqs Malshisadaq.", "Kadhalika nu'azzimuki ma'a el-murattil Dawoud qa'ileen \"anta huwa el-kahin ila el-abad 'ala taqs Malki Sadeq.\""]],
  },
  "other-doxology-doxology-for-st-thomas-the-hermit": {
    english: [["Pray to the Lord on our behalf: O our holy and righteous father: Saint Thomas the Hermit: that He may forgive us our sins.", "Pray to the Lord on our behalf: O our holy and righteous father: St Thomas the Hermit: that He may forgive us our sins."]],
  },
  "other-doxology-doxology-for-st-verena": {
    english: [["Pray to the Lord on our behalf, O the bride of Christ, the true Saint Verena, that He may forgive us our sins.", "Ask the lord on our behalf, O the bride of Christ, the true Saint Verena, that He may forgive us our sins."]],
    arabic: [["إسالي الرب عنّا، يا عروس مسيح، القديسة فيرينا الحقيقة، ليغفر لنا خطايانا.", "إسالى الرب عنّا، يا عروس المسيح، القديسة فيرينا الحقيقية، ليغفرلنا خطايانا."]],
    englishArabic: [["Is'ali er-Rabb 'anna, ya 'arous Maseeh, el-qiddeesa Fayrina el-haqeeqa, li-yaghfir lana khatayana.", "Is'ali er-Rabb 'anna, ya 'arous el-Maseeh, el-qiddeesa Fayrina el-haqeeqiyya, li-yaghfir lana khatayana."]],
  },
  "other-doxology-doxology-for-the-apostles": {
    english: [["Also Philip and Matthew, Bartholomew and Thomas, James the Son of Alphaeus, and Simon the Canaanite.", "Philip and Matthew, Bartholomew and Thomas, James the Son of Alphaeus, and Simon the Canaanite."], ["Matthias, who was chosen, in place of Judas, all of them and the rest, followed the Master.", "Matthias was chosen, instead of Judas, and was counted with the rest, who followed the Master."], ["Their voice went forth, upon the face of the whole earth, and their words have reached, the ends of the world.", "Their voices went forth, onto the face of the whole earth, and their words have reached, the ends of the world."], ["Pray to the Lord on our behalf, my lords and fathers the apostles, and the seventy-two disciples, that He may forgive us our sins.", "Pray to the Lord on our behalf / our fathers the apostles / and the seventy two disciples / that He may forgive us our sins."]],
    arabic: [["أطلبوا من الرب عنا، يا سادتي الآباء الرسل، والاثنان والسبعون تلميذاً، ليغفر لنا خطايانا.", "اطلبوا من الرب عنا، يا سادتى الآباء الرسل، والاثنين والسبعون تلميذاً، ليغفر لنا خطايانا لانك مبارك."]],
    englishArabic: [["Utlubou min er-Rabb 'anna, ya sadati el-aba' er-rusul, wal-ithnan was-sab'oun tilmeedhan, li-yaghfira lana khatayana.", "Utlubou min er-Rabb 'anna, ya sadati el-aba' er-rusul, wal-ithnayn was-sab'oun tilmeedhan, li-yaghfir lana khatayana li-annaka mubarak."]],
  },
  "other-doxology-doxology-for-the-patriarch-or-bishop": {
    english: [["Likewise we magnify You / with David the Psalmist / You are the priest forever / according to the order of Melchizedek.", "Likewise we exalt you, with David the Psalmist, \"You are a priest forever, according to the order of Melchizedek.\""], ["Pray to the Lord on our behalf / our holy father the patriarch / Pope Abba (...) / that He may forgive us our sins.", "Pray to the Lord on our behalf, our holy father the patriarch, Pope Abba (...) the archpriest, that He may forgive us our sins."], ["Pray to the Lord on our behalf / our holy righteous father / Abba (...) the bishop (metropolitan) / that He may forgive us our sins.", "Pray to the Lord on our behalf, O our holy and righteous father, Abba (...) the Bishop (Metropolitan), that He may forgive us our sins."]],
  },
  "other-doxology-introduction-to-the-doxologies": {
    english: [["O Virgin Mary, the holy Theotokos, the faithful advocate for all mankind.", "O Virgin Mary, the holy Theotokos, the trusted advocate, of the human race."], ["Intercede on our behalf before Christ whom you bore, that He may grant us the forgiveness of our sins.", "Intercede on our behalf, before Christ whom you have born, that He may grant unto us, the forgiveness of our sins."], ["We ask you to remember us, O our faithful advocate, before our Lord Jesus Christ, that He may forgive us our sins.", "We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["أيتها العذراء مريم والدة الاله القديسة الشفيعة الأمينة لجنس البشر.", "أيتها العذراء مريم، والده الإله القديسة، الشفيعة الأمينة، التي لجنس البشر."], ["اشفعى فينا أمام المسيح الذى ولدته لكى ينعم لنا بمغفرة خطايانا.", "إشفعي فينا، أمام المسيح الذي ولدتِه، لكي ينعم علينا، بمغفرة خطايانا."], ["نسألك أن تذكرينا أيتها الشفيعة المؤتمنة أمام ربنا يسوع المسيح ليغفر لنا خطايانا.", "نَسْألُكِ اذْكرينا أيَّتُها الشَّفيعَةُ المؤْتَمَنةُ أَمامَ ربِّنا يَسوعِ المسيحِ ليغْفِرَ لَنا خَطايانا."]],
    englishArabic: [["Ayyatuha el-'Adhra' Maryam Walidat el-Ilah el-qiddeesa esh-shafee'a el-ameena li-gens el-bashar.", "Ayyatuha el-'Adhra' Maryam, walidat el-Ilah el-qiddeesa, esh-shafee'a el-ameena, allati li-gins el-bashar."], ["Ishfa'i feena amam el-Maseeh alladhi waladtihi likay yun'im lana bi-maghfirat khatayana.", "Ishfa'i feena amam el-Maseeh alladhi waladtihi likay yun'im 'alayna bi-maghfirat khatayana."], ["Nas'aluki an tadhkureena ayyatuha esh-shafee'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana.", "Nas'aluki udhkurina ayyatuha esh-shafee'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfir lana khatayana."]],
  },
  "other-doxology-the-conclusion-of-the-doxologies": {
    coptic: [["Ⲧⲉⲛϯϩⲟ ⲁ̀ⲣⲉⲡⲉⲛⲙⲉⲩⲓ: ⲱ ϯⲡⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ ⲡⲉⲛ⳪ Ⲓⲏ︦ⲥ︦ Ⲡⲭ︦ⲥ︦: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁⲣⲓⲡⲉⲛⲙⲉⲩⲓ̀: ⲱ ϯⲡⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ ⲡⲉⲛ⳪ Ⲓⲏ︦ⲥ︦ Ⲡⲭ︦ⲥ︦: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["We ask you to remember us, O our faithful advocate, before our Lord Jesus Christ, that He may forgive us our sins.", "We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["نسألك أن تذكرينا، أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا.", "نَسْألُكِ اذْكرينا أيَّتُها الشَّفيعَةُ المؤْتَمَنةُ أَمامَ ربِّنا يَسوعِ المسيحِ ليغْفِرَ لَنا خَطايانا."]],
    englishArabic: [["Nas'aluki an tadhkureena, ayyatuha esh-shafee'a el-mu'tamana, amam Rabbina Yasou' el-Maseeh, li-yaghfira lana khatayana.", "Nas'aluki udhkurina ayyatuha esh-shafee'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfira lana khatayana."]],
  },
  "other-doxology-the-doxology-for-saint-virgin-mary-matins": {
    coptic: [["Ⲧⲉⲛϯϩⲟ ⲁⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ ϯⲡⲣⲟⲥⲁⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ ⲡⲉⲛ⳪ Ⲓⲏ︦ⲥ︦ Ⲡⲭ︦ⲥ︦: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.", "Ⲧⲉⲛϯϩⲟ ⲁⲣⲓⲡⲉⲛⲙⲉⲩⲓ: ⲱ ϯⲡⲣⲟⲥⲧⲁⲧⲏⲥ ⲉ̀ⲧⲉⲛϩⲟⲧ: ⲛⲁϩⲣⲉⲛ ⲡⲉⲛ⳪ Ⲓⲏ︦ⲥ︦ Ⲡⲭ︦ⲥ︦: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ."]],
    english: [["\"O our Lord Jesus Christ: make for Yourself within us: a temple of Your Holy Spirit: glorifying You.\"", "O our Lord Jesus Christ, make in us a sanctuary, for Your Holy Spirit, ever-glorifying You."], ["We ask you to remember us: O our faithful advocate: before our Lord Jesus Christ: that He may forgive us our sins.", "We ask you, to remember us, our trusted advocate, before our Lord Jesus Christ, that He may forgive us our sins."]],
    arabic: [["نسألك أن تذكرينا، أيتها الشفيعة المؤتمنة، أمام ربنا يسوع المسيح، ليغفر لنا خطايانا.", "نَسْألُكِ اذْكرينا أيَّتُها الشَّفيعَةُ المؤْتَمَنةُ أَمامَ ربِّنا يَسوعِ المسيحِ ليغْفِرَ لَنا خَطايانا."]],
    englishArabic: [["Nas'aluki an tadhkureena, ayyatuha esh-shafee'a el-mu'tamana, amam Rabbina Yasou' el-Maseeh, li-yaghfira lana khatayana.", "Nas'aluki udhkurina ayyatuha esh-shafee'a el-mu'tamana amam Rabbina Yasou' el-Maseeh li-yaghfira lana khatayana."]],
  },
  "other-gospel-response-mary": {
    english: [["Intercede on our behalf, O the Lady of us all the Theotokos, Mary the Mother of our Savior, that He may forgive us our sins.", "Intercede on our behalf, O Lady of us all, the Theotokos, Mary, the mother of our Savior, that He may forgive us our sins."]],
    arabic: [["إشفعي فينا أمام الرب، يا سيدتنا كلنا السيدة والدة الإله، مريم أم مخلصنا، ليغفر لنا خطايانا.", "أشفعي فينا يا سيدتَنا كلِنا، السيدة والدة الإله مريم أم مخلصنا، ليغفرَ لنا خطايانا."]],
    englishArabic: [["Ishfa'i feena amam er-Rabb, ya sayyidatana kullina es-sayyida walidat el-Ilah, Maryam umm mukhallisina, li-yaghfir lana khatayana.", "Ishfa'i feena ya sayyidatana kullina, es-sayyida walidat el-Ilah Maryam umm mukhallisina, li-yaghfir lana khatayana."]],
  },
  "other-intercession-mary": {
    arabic: [["بشفاعات والدة الإله القديسة مريم، ياربُ أنعم علينا بمغفرة خطايانا.", "بشفاعات والدة الإله القديسة مريم، ياربُ انعم لنا بمغفرةِ خطايانا."]],
    englishArabic: [["Bi-shafa'at walidat el-Ilah el-qiddeesa Maryam, ya Rabbu an'im 'alayna bi-maghfirat khatayana.", "Bi-shafa'at walidat el-Ilah el-qiddisa Maryam, ya Rabbu an'im lana bi-maghfirat khatayana."]],
  },
  "other-praxis-response-cyril": {
    english: [["Blessed are you indeed, our holy father the patriarch, Saint Cyril the pillar of the faith, the beloved of Christ.", "Blessed are you indeed, our holy father the patriarch, Saint Cyril the pillar of faith, the beloved of Christ."]],
  },
  "other-praxis-response-macarius": {
    english: [["Hail to the great Abba Macarius / the lamp of monasticism and his children / the cross-bearers / that He may forgive us our sins.", "Hail to the great abba Macarius: the lamp of monasticism and his children: the cross bearers: the beloved of Christ."]],
  },
  "other-praxis-response-marina": {
    arabic: [["السلام للفتاة العذراء، العفيفة القديسة، العروس الناقية، القديسة الحقيقيةمارينا.", "السلام للفتاة العذراء، العفيفة القديسة، العروس النقية، القديسة الحقيقية مارينا."]],
    englishArabic: [["Es-salam lil-fatah el-'adhra', el-'afeefa el-qiddeesa, el-'arous en-naqiya, el-qiddeesa el-haqeeqiyya Marina.", "Es-salam lil-fatah el-'Adhra', el-'afeefa el-qiddeesa, el-'arous en-naqiyya, el-qiddeesa el-haqeeqiyya Marina."]],
  },
  "palmsunday-distribution-hymn-for-lazarus-saturday": {
    arabic: [["مبارك الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "palmsunday-distribution-the-hymn-of-palm-sunday": {
    arabic: [["مبارك الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "palmsunday-general-funeral-pauline": {
    coptic: [["Ⲉⲑⲃⲉ ϯⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ ⲛ̀ⲧⲉ ⲛⲓⲣⲉϥⲙⲱⲟⲩⲧ ⲉ̀ⲧⲁⲩⲉⲛⲕⲟⲩⲧ ⲁⲩⲉⲙⲧⲟⲛ ⲙ̀ⲙⲱⲟⲩ ϧⲉⲛ ⲫ̀ⲛⲁϩϯ ⲙ̀Ⲡⲭ̅ⲥ̅ Ⲡ̀⳪ ⲙⲁⲙ̀ⲧⲟⲛ ⲛ̀ⲛⲟⲩⲯⲩⲭⲏ ⲧⲏⲣⲟⲩ.", "Ⲉⲑⲃⲉ ϯⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ ⲛ̀ⲧⲉ ⲛⲓⲣⲉϥⲙⲱⲟⲩⲧ ⲛⲏⲉⲧⲁⲩⲉⲛⲕⲟⲧ ⲁⲩⲉⲙⲧⲟⲛ ⲙ̀ⲙⲱⲟⲩ ϧⲉⲛ ⲫ̀ⲛⲁϩϯ ⲙ̀Ⲡⲭ̅ⲥ̅ Ⲡ̀⳪ ⲙⲁⲙ̀ⲧⲟⲛ ⲛ̀ⲛⲟⲩⲯⲩⲭⲏ ⲧⲏⲣⲟⲩ."], ["Ⲡⲁⲩⲗⲟⲥ ⲫ̀ⲃⲱⲕ ⲙ̀ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ ⲉⲧⲑⲁϩⲉⲙ ⲫⲏⲉ̀ⲧⲁⲩⲑⲁϣϥ ⲡⲓϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛ̀ⲧⲉ Ⲫϯ.", "Ⲡⲁⲩⲗⲟⲥ ⲫ̀ⲃⲱⲕ ⲙ̀ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ ⲉⲧⲑⲁϩⲉⲙ ⲫⲏⲉ̀ⲧⲁⲩⲑⲁϣϥ ⲉ̀ⲡⲓϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛ̀ⲧⲉ Ⲫϯ."]],
    english: [["For the resurrection of the dead who have fallen asleep and reposed in the faith of Christ. O Lord repose their souls.", "For the resurrection of the dead, those who slept and reposed in the faith of Christ, Lord repose all their souls!"], ["Paul, a servant of our Jesus Christ, called to be an apostle, appointed to the gospel of God.", "Paul, the servant of our Lord Jesus Christ, called to be an apostle, appointed to the Gospel of God."]],
    arabic: [["نعمة الله الآب تكون معكم جميعاً. آمين.", "نعمة اللهِ الآب تكون مع جميعكم آمين."]],
    englishArabic: [["Ni'mat Allah el-Ab takoun ma'akum gamee'an. Ameen.", "Ni'mat Allah el-Ab takoun ma'a gamee'ikum. Ameen."]],
  },
  "palmsunday-general-funeral-the-trisagion": {
    english: [["Holy God, Holy Mighty, Holy Immortal, Who was crucified for us, have mercy on us.", "Holy God, Holy Mighty, Holy Immortal, Who was crucified for us, have mercy upon us."]],
    arabic: [["قدوس الله. قدوس القوى. قدوس الحي الذي لا يموت. يا من صُلِّبَ عنا، إرحَمنا.", "قُدّوسٌ اللَّهُ. قُدّوسٌ القَوىُّ. قُدّوسٌ الحَىُّ الَّذى لا يَموتُ الَّذى صُلِبَ عنّا إرْحَمْنا."], ["المجد للآب والإبن، والروح القدوس، الآن وكل أوان، وإلى دهر الدهور آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["Quddous Allah. Quddous el-qawi. Quddous el-hayy alladhi la yamout. Ya man sulib 'anna, irhamna.", "Quddousun Allah. Quddousun el-qawi. Quddousun el-hayy alladhi la yamout alladhi suliba 'anna irhamna."], ["El-magd lil-Ab wal-Ibn, war-Rouh el-Quddous, el-an wa kull awan, wa ila dahr ed-duhour. Ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "palmsunday-liturgy-feeethemcy": {
    coptic: [["Ⲫⲏⲉⲧϩⲉⲙⲥⲓ ϩⲓϫⲉⲛ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ ⲁϥⲧⲁⲗⲏⲟⲩⲧ ⲉ̀ⲟⲩⲉ̀ⲱ̀ ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲟⲩ ⲡⲉ ⲡⲁⲓⲛⲓϣϯ ⲛ̀ⲑⲉⲃⲓⲟ.", "Ⲫⲏⲉⲧϩⲉⲙⲥⲓ ϩⲓϫⲉⲛ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ ⲉϥⲧⲁⲗⲏⲟⲩⲧ ⲉ̀ⲟⲩⲉ̀ⲱ̀ ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲟⲩ ⲡⲉ ⲡⲁⲓⲛⲓϣϯ ⲛ̀ⲑⲉⲃⲓⲟ."]],
    english: [["He who sits upon the Cherubim, rode a colt and entered Jerusalem, O what great humility.", "He who sits upon the Cherubim / riding on a donkey / He entered Jerusalem / what is this great humility."], ["Let us say with David the chanter, \"Blessed is He who comes, in the Name of the Good Lord, from now and till the end of the ages.\"", "Let us say with David the hymnist / “Blessed is He who comes / in the name of the good Lord / from now and till the end of times.”"], ["The Cherubim and the Seraphim, the angels and the archangels, the principalities and the authorities, the thrones and the powers.", "The Cherubim and the Seraphim, the angels and the archangels, the principalities and the authorities, the thrones, the dominions and the powers."]],
    arabic: [["الشاروبيم والسِّرافيم، الملائكة ورؤساء ا ل ملائكة، والعساكر والسلاطين، والكراسي والأرباب.", "الشاروبيم والسِّرافيم، الملائكة ورؤساء الملائكة، والعساكر والسلاطين، والكراسي والأرباب."]],
    englishArabic: [["Esh-sharoubeem was-sarafeem, el-mala'ika wa ru'asa' el-mala'ika, wal-'asakir was-salateen, wal-karasi wal-arbab.", "Esh-Sharoubeem wes-Sarafeem, el-mala'ika wa ru'asa' el-mala'ika, wal-'asakir was-salateen, wal-karasi wal-arbab."]],
  },
  "palmsunday-liturgy-first-psalm-short-singary": {
    english: [["Blow the trumpet at the new moon, in the glorious day your feast. Rejoice in God our helper; shout aloud to the God of Jacob. Take a psalm, and produce the timbrel, the pleasant psaltery with the harp. Alleluia.", "Blow the trumpet at the time of the New Moon, at the full moon, on your solemn feast day. Sing aloud to God our help; Make a joyful shout to the God of Jacob. Raise a song and strike the timbrel, the pleasant harp with the lute. Alleluia."]],
    arabic: [["انفخوا في رأس الشهر بالبوق، في يوم عيدكم المشهور. رنموا لله قوتنا، اهتفوا لإله يعقوب. ارفعوا نغمة وهاتوا دفاً، عوداً حلواً مع رباب. هلليلويا.", "بَوِّقُوا في رَأسِ الشهر بالبُوقِ،في يوم عِيدكُمْ المَشْهور.إبتَهِجوا بِاللهِ مُعيننا، هلِّلُوا لإله يَعْقوب،خُذوا مِزْمَاراً وأضربوا ودفاً. مِزْمَاراً مُطْرِباً مع قيثار. هلليلويا."]],
    englishArabic: [["Unfukhou fi ra's esh-shahr bil-bouq, fi yawm 'eedikum el-mash-hour. Rannimou lillah quwwatina, ihtifou li-ilah Ya'qoub. Irfa'ou naghma wa hatou daffan, 'oudan hulwan ma'a rabab. Hallelouia.", "Bawwiqou fi ra's esh-shahr bil-bouq, fi yawm 'eedikum el-mash-hour. Ibtahigou billah mu'eenina, hallilou li-ilah Ya'qoub. Khudhou mizmaran wadribou daffan, mizmaran mutriban ma'a qeethar. Hallelouia."]],
  },
  "palmsunday-liturgy-praxis-response-lazarus-saturday": {
    english: [["Hail to Lazarus, whom He raised after four days. Raise my heart my Lord Jesus, which was killed by the evil one.", "Hail to Lazarus whom He raised, after four days, raise my heart O my Lord Jesus, that was killed by the evil one."]],
  },
  "palmsunday-matins-doxology": {
    english: [["+ He who sits upon the Cherubim, sat on a donkey, He came into Jerusalem, what is this great humility.", "+ He who sits upon the Cherubim, riding on a colt, entered into Jerusalem, what is this great humility."], ["+ They praise Him watchfully, saying \"This is Emmanuel, hosanna in the highest, this is the King of Israel.\"", "+ They praise Him with alertness, saying / “This is Emmanuel / Hosanna in the highest / this is the King of Israel.”"], ["+ We praise and glorify Him, and exalt Him above all, as a Good One and Lover of Man, have mercy upon us according to Your great mercy.", "+ We praise and glorify Him, / and exceedingly exalt Him, / as the Good One and Lover of Mankind. / Have mercy on us according to Your great mercy."]],
  },
  "palmsunday-matins-verses-of-the-cymbals": {
    english: [["He who sits upon the Cherubim, sat on a donkey, He came into Jerusalem, what is this great humility.", "He who sits upon the Cherubim, riding on a colt, entered into Jerusalem, what is this great humility."]],
  },
  "palmsunday-procession-main-sanctuary": {
    english: [["The four Incorporeal Beasts, carrying the throne of God, a face of lion a face of a calf, a face of human and a face of an angel.", "The four incorporeal creatures: carry the throne of God: a face of lion and a face of a ram: a face of a man and a face of an angel."]],
    arabic: [["الأربعة الحيوانات غير المتجسدين، الحاملون مركبة الله، وجه أسد ووجه عجل، ووجه إنسان ووجه نسر.", "الأربعة الحيوانات غير المتجسدين، الحاملين مركبة الله، وجه أسد ووجه ثور، ووجه إنسان ووجه نسر."]],
    englishArabic: [["El-arba'at hayawanat ghayr el-mutagassideen, el-hamiloun markabat Allah, wagh asad wa wagh 'igl, wa wagh insan wa wagh nasr.", "El-arba'at el-hayawanat ghayr el-mutagassideen, el-hamileen markabat Allah, wagh asad wa wagh thawr, wa wagh insan wa wagh nasr."]],
  },
  "palmsunday-procession-northern-door": {
    english: [["And when You come again, in Your fearful appearance, may we never hear You say, \"I do not know you.\"", "And in Your awesome/ Second Coming may we never / hear with trembling / “I do not know you.”"]],
  },
  "palmsunday-procession-st-mary": {
    english: [["We indeed exalt you, with your cousin Elizabeth, saying \"Blessed are you among women, and blessed is the fruit of your womb.\"", "We exalt you worthily, with Elizabeth your cousin, saying Blessed are you among women, and blessed is the fruit of your womb."]],
    arabic: [["نُعظِّمُكِ بإستحقاقٍ، مع أليصابات نَسيبَتكِ قائلين، \"مُباركةٌ أنتِ في النساء، ومُباركةٌ هي ثمرة بطنكِ.\"", "نُعظِّمُكِ باستحقاق مع أليصابات نسيبتك، مباركة أنت في النساء ومباركة هي ثمرة بطنك."]],
    englishArabic: [["Nu'azzimuki bi-istihqaq, ma'a Aleesabat naseebatiki qa'ileen, \"Mubarakatun anti fin-nisa', wa mubarakatun hiya thamaratu batniki.\"", "Nu'azzimuki bi-istihqaq ma'a Aleesabat naseebatiki Mubarakatun anti fin-nisa' wa mubarakatun hiya thamaratu batniki."]],
  },
  "palmsunday-vespers-concluding-canon": {
    english: [["Glory to the Father, and to the Son, and to the Holy Spirit.", "Glory to the Father, and the Son, and the Holy Spirit."], ["Now and ever and unto the age of all ages. Amen.", "Now and ever and unto the age of ages. Amen."]],
    arabic: [["المجد الآب والإبن والروح القدس.", "المجد للآب والإبن والروح القدس."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn war-Rouh el-Qudus.", "El-magd lel-Ab wal-Ibn war-Rouh el-Qudus."]],
  },
  "palmsunday-vespers-doxology": {
    english: [["+ He who sits upon the Cherubim, sat on a donkey, He came into Jerusalem, what is this great humility.", "+ He who sits upon the Cherubim, riding on a colt, entered into Jerusalem, what is this great humility."], ["+ They praise Him watchfully, saying \"This is Emmanuel, hosanna in the highest, this is the King of Israel.\"", "+ They praise Him with alertness, saying / “This is Emmanuel / Hosanna in the highest / this is the King of Israel.”"], ["+ We praise and glorify Him, and exalt Him above all, as a Good One and Lover of Man, have mercy upon us according to Your great mercy.", "+ We praise and glorify Him, / and exceedingly exalt Him, / as the Good One and Lover of Mankind. / Have mercy on us according to Your great mercy."]],
  },
  "palmsunday-vespers-verses-of-the-cymbals": {
    english: [["He who sits upon the Cherubim, sat on a donkey, He came into Jerusalem, what is this great humility.", "He who sits upon the Cherubim, riding on a colt, entered into Jerusalem, what is this great humility."]],
  },
  "pentecost-distribution-all-the-choirs": {
    arabic: [["مبارك الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "pentecost-liturgy-acts-response": {
    english: [["Hail to His Resurrection, when He rose from the dead, He saved us, from our sins.", "Hail to His Resurrection, when He rose from the dead, in order to save us, from our sins."]],
  },
  "pentecost-liturgy-aspasmos-adam": {
    english: [["Christ our God, has risen from the dead, He is the first-fruit, of those who departed.", "Christ our God, has risen from the dead, and He is the first-fruit, of those who have fallen asleep."]],
  },
  "pentecost-liturgy-gospel-response": {
    english: [["This is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.", "This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."], ["For blessed be the Father and the Son, and the Holy Spirit, the perfect Trinity, we worship Him and glorify Him.", "Blessed be the Father and the Son and the Holy Spirit, the perfect Trinity. We worship Him and glorify Him."]],
    arabic: [["وأيضاً وُضع في القبر، حسب الأصوات النبوية، وفي اليوم الثالث، المسيح قام من بين الأموات.", "وُضع أيضاً في القبر، حسب الأخبار النبوية، وفي اليوم الثالث، المسيح قام من بين الأموات."], ["لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "مبارك الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Wa aydan wudi'a fil-qabr, hasab el-aswat en-nabawiyya, wa fil-yawm eth-thalith, el-Maseeh qam min bayn el-amwat.", "Aydan aydan wudi'a fil-qabr hasab el-akhbar en-nabawiyya wa fil-yawm eth-thalith el-Maseeh qam min bayn el-amwat."], ["Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-Thalouth el-kamil, nasgudu lahu wa numaggiduhu."]],
  },
  "pentecost-liturgy-hymn-for-thomas-sunday": {
    arabic: [["يا توما المختار تعال إلى لترانى وتعرفنى انى انا هو بسوع المسيح قد قمت من الأموات", "تعال الي يا توما المختار: لكي تنظرني وتعرفني. انني يسوع المسيح قد قمت من الأموات."]],
    englishArabic: [["Ya Touma el-mukhtar, ta'al ilayya li-tarani wa ta'rifani, inni ana huwa Yasou' el-Maseeh, qad qumtu min el-amwat.", "Ta'ala ilayya ya Touma el-mukhtar, likay tanzurani wa ta'rifani, innani Yasou' el-Maseeh qad qumtu min el-amwat."]],
  },
  "pentecost-liturgy-kata-nichorous": {
    english: [["All the choirs and ranks, of the heavenly and the earthly, the angels and the people together, chant joyfully.", "All the choirs and ranks of the heavenly and the earthly, angels and men together singing joyfully."]],
  },
  "pentecost-liturgy-pachoice": {
    coptic: [["Ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ ⲛⲉⲙ Ⲛⲓⲥⲉⲣⲁⲫⲓⲙ ⲛⲓⲁⲅⲅⲗⲟⲥ ⲛⲉⲙ ⲛⲓⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲛⲓⲥ̀ⲧ̀ⲣⲁⲧⲓⲁ ⲛⲉⲙ ⲛⲓⲉⲝⲟⲩⲥⲓⲁ ⲛⲓⲑ̀ⲣⲟⲛⲟⲥ ⲛⲓⲙⲉⲧϭⲟⲓⲥ ⲛⲓϫⲟⲙ.", "Ⲛⲓⲭⲉⲣⲟⲩⲃⲓⲙ ⲛⲉⲙ Ⲛⲓⲥⲉⲣⲁⲫⲓⲙ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ ⲛⲉⲙ ⲛⲓⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲛⲓⲥ̀ⲧ̀ⲣⲁⲧⲓⲁ ⲛⲉⲙ ⲛⲓⲉⲝⲟⲩⲥⲓⲁ ⲛⲓⲑ̀ⲣⲟⲛⲟⲥ ⲛⲓⲙⲉⲧϭⲟⲓⲥ ⲛⲓϫⲟⲙ."]],
    english: [["O My Lord Jesus Christ, who rose from the dead, on the third day, You shall raise us with Your power.", "My Lord Jesus Christ, who rose from the dead, on the third day, You shall raise us with Your power."], ["The Cherubim and the Seraphim, the angels and the archangels, the armies and authorities, the thrones, the dominions, the powers.", "The Cherubim and the Seraphim, the angels and the archangels, the principalities and the authorities, the thrones, the dominions and the powers."], ["Proclaim saying, \"Holy holy, holy O Lord of the ages, Christ is risen from the dead.\"", "Proclaiming and saying, “Holy holy, holy O Lord of the ages, Christ is risen from the dead.”"]],
    arabic: [["الشاروبيم والسِّرافيم، الملائكة ورؤساء الملائكة، والعساكر والسلاطين، والكراسي والأرباب.", "الشاروبيم والسيرافيم، الملائكة ورؤساء الملائكة، والعساكر والسلاطين، والكراسي والأرباب."]],
    englishArabic: [["Esh-sharoubeem was-sarafeem, el-mala'ika wa ru'asa' el-mala'ika, wal-'asakir was-salateen, wal-karasi wal-arbab.", "Esh-Sharoubeem wes-Sarafeem, el-mala'ika wa ru'asa' el-mala'ika, wal-'asakir was-salateen, wal-karasi wal-arbab."]],
  },
  "pentecost-liturgy-praxis-response": {
    english: [["Hail to His Ascension, in which He ascended into the heavens, in glory and honor, He is seated at the right hand of His Father.", "Hail to His Ascension, when He ascended to heaven, in glory and honor, He sat at the right hand of His Father."]],
  },
  "pentecost-liturgy-toulitho": {
    english: [["When the stone was sealed by the Jews, and the soldiers were guarding Your undefiled Body, You arose on the third day, O Savior, granting life to the world. For this reason, the heavenly powers cried out to You, O Giver of Life, \"Glory to Your Resurrection O Christ. Glory to Your kingdom. Glory be to Your Economy, O You who alone are Lover of Mankind.\"", "When the stone was sealed by the Jews, and the soldiers were guarding Your undefiled Body, You rose on the third day, O Savior, granting life to the world. For this reason, the heavenly powers cried out to You, O Giver of Life, “Glory to Your Resurrection O Christ. Glory to Your kingdom. Glory to Your Economy, O You who alone are the Lover of Mankind.”"]],
  },
  "pentecost-liturgy-watos-exposition": {
    arabic: [["من أجل هذا نمجده صارخين قائلين \"مبارك أنت يا ربي يسوع لأنك قُمت وخلَّصتنا.\"", "فلهذا نمجده، صارخين قائلين، \"مبارك أنت يا ربي يسوع، لأنك قُمت وخلصتنا.\""]],
    englishArabic: [["Min agl hadha numaggiduhu sarikheen qa'ileen: \"Mubarakun anta ya Rabbi Yasou', li-annaka qumta wa khallastana.\"", "Fa-li-hadha numaggiduh, sarikheen qa'ileen, \"Mubarakun anta ya Rabbi Yasou', li-annaka qumta wa khallastana.\""]],
  },
  "pentecost-liturgy-xrictoc-anesti-long": {
    coptic: [["Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ Ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ.", "Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ Ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ."]],
    english: [["Glory to the Father and the Son and the Holy Spirit, now and forever and unto the age of all ages Amen.", "Glory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen."]],
    arabic: [["المجد للآب والإبن والروح القدس، الآن وكل أوان وإلى دهر الدهور. آمين.", "المجد للآب والإبن، والروح القدوس، الآن وكل أوان، وإلى دهر الدهور آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kull awan wa ila dahr ed-duhour. Ameen.", "El-magd lil-Ab wal-Ibn, war-Rouh el-Quddous, el-an wa kull awan, wa ila dahr ed-duhour ameen."]],
  },
  "pentecost-liturgy-xrictoc-anesti-long-2": {
    coptic: [["Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ Ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ.", "Ⲇⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ Ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ."]],
    english: [["Glory to the Father and the Son and the Holy Spirit, now and forever and unto the age of all ages Amen.", "Glory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen."]],
    arabic: [["المجد للآب والإبن والروح القدس، الآن وكل أوان وإلى دهر الدهور. آمين.", "المجد للآب والإبن، والروح القدوس، الآن وكل أوان، وإلى دهر الدهور آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kull awan wa ila dahr ed-duhour. Ameen.", "El-magd lil-Ab wal-Ibn, war-Rouh el-Quddous, el-an wa kull awan, wa ila dahr ed-duhour ameen."]],
  },
  "pentecost-matins-concluding-hymn": {
    english: [["Glory to the Father, and the Son, and the Holy Spirit, now and ever and unto the age of ages. Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والإبن والروح القدس، الآن وكل أوان وإلى دهر الدهرين، آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."], ["نصرخ قائلين: \"يا ربنا يسوع المسيح، ملك المجد، الذي قام من بين الأموات في اليوم الثالث.", "نصرخ قائلين: \"يا ربنا يسوع المسيح، ملك المجد، الذي قام من بين الأموات في اليوم الثالث. خلصنا وإرحمنا."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kull awan wa ila dahr ed-dahireen, ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."], ["Nasrukhu qa'ileen: \"Ya Rabbana Yasou' el-Maseeh, malik el-magd, elladhi qam min bayn el-amwat fil-yawm eth-thalith.\"", "Nasrukhu qa'ileen: \"Ya Rabbana Yasou' el-Maseeh, malik el-magd, elladhi qam min bayn el-amwat fil-yawm eth-thalith khallasana warhamna.\""]],
  },
  "pentecost-matins-concluding-hymn-feast-of-pentecost": {
    english: [["We proclaim and say: “O our Lord Jesus Christ, Who has risen and ascended: and sent to us the Paraclete, the Spirit of Truth. Save us and have mercy on us.", "We proclaim and say: “O our Lord Jesus Christ, Who is risen and ascended: and sent to us the Paraclete, the Spirit of Truth.\" Save us and have mercy on us."]],
    arabic: [["الآن وكل أوان وإلى دهر الدهرين، آمين.", "الآن وكل أوان وإلى دهر الدهور. آمين."]],
    englishArabic: [["El-an wa kull awan wa ila dahr ed-dahireen, ameen.", "El-an wa kull awan wa ila dahr ed-duhour. Ameen."]],
  },
  "pentecost-matins-first-doxology": {
    english: [["+ This is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.", "+ This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."]],
  },
  "pentecost-matins-hymn-of-the-ascension": {
    english: [["Christ has ascended into the heaven, and sent the Holy Spirit the Paraclete, and bestowing life to our souls.", "Christ has ascended into the heaven, and sent the Holy Spirit the Paraclete, and granted life to our souls."]],
  },
  "pentecost-matins-matins-gospel-response": {
    english: [["This is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.", "This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."]],
  },
  "pentecost-matins-verses-of-the-cymbals": {
    english: [["Christ our God, has risen from the dead, He is the first-fruit, of those who departed.", "Christ our God, has risen from the dead, and He is the first-fruit, of those who have fallen asleep."], ["+ Hail to His Resurrection, when He rose from the dead, He saved us, from our sins.", "+ Hail to His Resurrection, when He rose from the dead, in order to save us, from our sins."], ["Jesus Christ the same yesterday, today and forever, in one hypostasis, we worship and glorify Him.", "Jesus Christ is the same yesterday, today and forever, in one hypostasis, we worship Him and glorify Him."]],
  },
  "pentecost-midnight-adam-psali-for-thomas-sunday": {
    arabic: [["هذا هو اليوم، الذي صنعه الرب، فلنتهلل اليوم، يسوع المسيح قام.", "هذا هو اليوم، الذي صنعه الرب، فلنتهلل اليوم، يسوع المسيح قد قام."]],
    englishArabic: [["Hadha huwa el-yawm, elladhi sana'ahu er-Rabb, fal-natahallal el-yawm, Yasou' el-Maseeh qam.", "Hadha huwa el-yawm elladhi sana'ahu er-Rabb fal-natahallal el-yawm Yasou' el-Maseeh qad qam."]],
  },
  "theophany-distribution-hymn-for-theophany-paramoun": {
    arabic: [["إشفع فينا، أيها السابق الصابغ، يوحنا المعمدان، ليغفر لنا خطايانا.", "اشفع فينا أمام الرب أيها السابق الصابغ يوحنا المعمدان ليغفر خطايانا."], ["مبارك الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده.", "لأنه مباركٌ الآب والابن والروح القدس، الثالوث الكامل، نسجد له ونمجده."]],
    englishArabic: [["Ishfa' feena, ayyuha es-sabiq es-sabigh, Youhanna el-Ma'madan, li-yaghfir lana khatayana.", "Ishfa' feena amam er-Rabb ayyuha es-sabiq es-sabigh Youhanna el-Ma'madan, li-yaghfir khatayana."], ["Mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh.", "Li-annahu mubarakun el-Ab wal-Ibn war-Rouh el-Qudus, eth-thalouth el-kamil, nasgud lahu wa numaggiduh."]],
  },
  "theophany-liturgy-hymn-for-st-john": {
    coptic: [["Ⲁ̀ⲙⲱⲓⲛⲓ ⲥⲟⲧⲉⲙ ⲉ̀ⲡⲓⲥⲟⲫⲟⲥ ⲡⲓⲗⲁⲥ ⲛ̀ⲛⲟⲩⲃ Ⲑⲉⲟ̀ⲇⲟⲥⲓⲟⲥ ⲉϥϫⲱ ⲙ̀ⲡ̀ⲧⲁⲓⲟ ⲙ̀ⲡⲓⲃⲁⲡⲧⲏⲥⲧⲏⲥ Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲓⲣⲉϥϯⲱ̀ⲙⲥ.", "Ⲁ̀ⲙⲱⲓⲛⲓ ⲥⲱⲧⲉⲙ ⲉ̀ⲡⲓⲥⲟⲫⲟⲥ ⲡⲓⲗⲁⲥ ⲛ̀ⲛⲟⲩⲃ Ⲑⲉⲟ̀ⲇⲟⲥⲓⲟⲥ ⲉϥϫⲱ ⲙ̀ⲡ̀ⲧⲁⲓⲟ ⲙ̀ⲡⲓⲃⲁⲡⲧⲏⲥⲧⲏⲥ Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲓⲣⲉϥϯⲱ̀ⲙⲥ."]],
    english: [["You are higher than the patriarchs, more honored than the prophets, for no one born of women, is as great as you.", "You are more exalted than the patriarchs, more honored than the prophets, for no one has risen among those born of women, who is like you."]],
  },
  "theophany-liturgy-praxis-response": {
    english: [["This is My beloved Son, with whom My soul is well pleased, He does My will hear Him, for He is the life-Giver.", "\"This is My beloved Son, in whom I am well pleased, He has performed My will; obey Him, for He is the Giver of Life.\""]],
  },
  "theophany-liturgy-psalm": {
    english: [["Blessed is He who comes in the name of the Lord. We have blessed you out of the house of the Lord. You are my God, and I will give You thanks. You are my God, I will exalt You.", "Blessed is he who comes in the name of the Lord! We have blessed you from the house of the Lord. You are my God, and I will praise You; You are my God, I will exalt You. Alleluia"]],
  },
  "theophany-liturgy-trisagion-agios": {
    english: [["Holy God, holy Mighty, holy Immortal, who was baptized in the Jordan, have mercy upon us.", "Holy God, holy Mighty, holy Immortal, who was baptized in the Jordan, have mercy on us."], ["Glory be to the Father and the Son and the Holy Spirit, now and forever and unto the age of all ages. Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والإبن، والروح القدوس، الآن وكل أوان، وإلى دهر الدهور آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rouh el-Quddous, el-an wa kull awan, wa ila dahr ed-duhour. Ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "theophany-matins-first-doxology": {
    english: [["+ This is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.", "+ This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."]],
  },
  "theophany-matins-second-doxology": {
    coptic: [["Ⲁⲓⲛⲁⲩ ⲉ̀ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅: ⲉⲧⲁϥⲓ̀ ⲉ̀ⲡⲉⲥⲏⲧ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲉ: ⲁⲓⲥⲱⲧⲉⲙ ⲉ̀ⲧⲥ̀ⲙⲏ ⲛ̀ⲧⲉ Ⲫ̀ⲓⲱⲧ: ⲉⲥⲟ̀ϣ ⲉ̀ⲃⲟⲗ ⲉⲥϫⲱ ⲙ̀ⲙⲟⲥ.", "Ⲁⲓⲛⲁⲩ ⲉ̀ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅: ⲉⲧⲁϥⲓ̀ ⲉ̀ⲡⲉⲥⲏⲧ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲉ: ⲁⲓⲥⲱⲧⲉⲙ ⲉ̀ⲧⲥ̀ⲙⲏ ⲛ̀ⲧⲉ Ⲫ̀ⲓⲱⲧ: ⲉⲥⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲥϫⲱ ⲙ̀ⲙⲟⲥ."]],
    english: [["You have seen the Holy Spirit, coming down from heaven, and you have heard the voice of the Father, proclaiming and saying.", "I saw the Holy Spirit, coming down from heaven, I heard the voice of the Father, proclaiming and saying:"], ["\"This is My beloved Son, with whom My soul is well pleased, He does My will hear Him, for He is the life-Giver.\"", "\"This is My beloved Son, in whom I am well pleased, He has performed My will; obey Him, for He is the Giver of Life.\""], ["Blessed are You O Christ our Master, the only-begotten Son, who was incarnate of the Virgin, and was baptized in the Jordan.", "You are blessed, O Christ our Master / the only-begotten Son / who was incarnate of the Virgin / and was baptized in the Jordan."], ["Wherefore we rejoice and sing, with the holy angels, with joy saying, \"Glory to God in the highest.\"", "For this we rejoice and sing, with the holy angels, and we joyfully proclaim, “Glory to God in the Highest”"], ["And peace on earth, and good will towards men, for He was pleased by You, who is worthy of glory forever.", "And on earth peace, goodwill toward man, for He who is forever glorified, was pleased with you. who is worthy of glory forever."], ["+ This is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.", "+ This is He to whom is due glory, with His good Father, and the Holy Spirit, both now and forever."]],
    arabic: [["مبارك أنت يا سيدنا المسيح، الإبن الوحيد، الذي تجسد من العذراء، وأعتمد فى الأردن.", "تباركت يا ملكنا المسيح، الابن الوحيد الجنس، الذي تجسد من العذراء، واعتمد فى الأردن."], ["بهذا نفرح ونرتل، مع الملائكة الأطهار، بتهليل قائلين، المجد لله فى الأعالى.", "بهذا نفرح ونرتل، مع الملائكة القديسين، بتهليل قائلين، \"المجد لله في الأعالي."]],
    englishArabic: [["Mubarak anta ya sayyidana el-Maseeh, el-Ebn el-waheed, alladhi tagassad men el-'Adhra', wa e'tamad fil-Ordon.", "Tabarakta ya malikana el-Maseeh el-Ebn el-waheed el-gins alladhi tagassad men el-'Adhra' wa e'tamad fil-Ordon."], ["Bi hadha nafrah wa nurattel, ma'a el-mala'ika el-athar, bi tahleel qa'ileen, el-magd lillah fil-a'ali.", "Bi-hadha nafrah wa nurattil, ma'a el-mala'ika el-qiddiseen, bi-tahleel qa'ileen, \"El-magd lillah fil-a'ali."]],
  },
  "theophany-matins-verses-of-the-cymbals": {
    english: [["+ Jesus Christ the same yesterday, today and forever, in one hypostasis, we worship and glorify Him.", "+ Jesus Christ is the same yesterday, today and forever, in one hypostasis, we worship Him and glorify Him."]],
  },
  "theophany-midnight-psali-watos-on-saturday-theotokia": {
    english: [["Rejoice like lambs / O Jordan and your wilderness / for unto you came the lamb / who lifts the sin of the world.", "Rejoice like the lambs, O Jordan and its shores, for unto you came the Lamb, who carries the sin of the world."]],
    arabic: [["تهلل مثل الحملان، أيها الأردن وبريته، لأنه أتي الحمل، الذي يحمل خطايا العالم.", "تهلل مثل الحملان، أيها الأردن وبريته، فقد أتى إليك الحمل، حامل خطية العالم."]],
    englishArabic: [["Tahallal mithl el-hamalan, ayyuha el-Urdunn wa barriyyatuh, li-annahu ata el-hamal, elladhi yahmil khataya el-'alam.", "Tahallal mithl el-hamalan, ayyuha el-Urdunn wa barriyyatuh, fa-qad ata ilayka el-hamal, hamil khatiyyat el-'alam."]],
  },
  "theophany-midnight-theophany-ode": {
    arabic: [["فليرفعوه في كنيسة شعبه . وليباركوه فى مجلس الشيوخ لأنه جعل أبـوة مثل الخراف يُبصر المستقيمون ويفرحون. هلليلويا.", "فليرفعوه في كنيسة شعبه وليباركوه على منابر الشيوخ لأنه جعل أبوة مثل الخراف يبصر المستقيمون ويفرحون. الليلويا."], ["حلف الرب ولا يندم أنك أنت هو الكاهن إلي الأبد على طقس ملشيصاداق. هلليلويا.", "حلف الرب ولم يندم أنك أنت هو الكاهن إلي الأبد على طقس ملشيصاداق. الليلويا."], ["ليترأف اللـه علينا ويباركنا وليظهر وجهه علينا ويرحمنا. هلليلويا.", "ليترأف اللـه علينا ويباركنا وليظهر وجهه علينا ويرحمنا. الليلويا."], ["يا رب خلص شعبك وبارك ميراثك ارعهم وارفعهم إلي الأبد. هلليلويا.", "يارب خلص شعبك بارك ميراثك ارعهم وارفعهم إلي الأبد. الليلويا."], ["المجد للآب والابن والروح القدس، الآن وكل اوان وإلي دهر الدهور. امين. هلليلويا. يارب ارحم (٣)", "المجد للآب والابن والروح القدس، الآن وكل أوان وإلى دهر الدهور . آمين هلليلويا . يارب إرحم يارب إرحم يارب إرحم ."]],
    englishArabic: [["Fal-yarfa'ouhu fi kaneesat sha'bih, wal-yubarikouhu fi maglis esh-shuyoukh, li-annahu ga'ala ubouwwa mithl el-khiraf. Yubsir el-mustaqeemoun wa yafrahoun. Hallelouia.", "Fal-yarfa'ouhu fi kaneesat sha'bih, wal-yubarikouhu 'ala manabir esh-shuyoukh, li-annahu ga'ala ubouwwa mithl el-khiraf. Yubsir el-mustaqeemoun wa yafrahoun. Hallelouia."], ["Halafa er-Rabb wala yandam, annaka anta huwa el-kahin ila el-abad 'ala taqs Malshisadaq. Hallelouia.", "Halafa er-Rabb wa lam yandam, annaka anta huwa el-kahin ila el-abad 'ala taqs Malshisadaq. Hallelouia."], ["Ya Rabb khallis sha'bak wa barik meerathak, ir'ahum warfa'hum ila el-abad. Hallelouia.", "Ya Rabb khallis sha'bak, barik meerathak, ir'ahum warfa'hum ila el-abad. Hallelouia."], ["El-magd lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kull awan wa ila dahr ed-duhour. Ameen. Hallelouia. Ya Rabb irham (3)", "El-magd lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen. Hallelouia. Ya Rabb irham, ya Rabb irham, ya Rabb irham."]],
  },
  "vp-conclusion-of-the-adam-psali": {
    english: [["Glory to the Father and the Son, and the Holy Spirit, now and forever and unto, the age of the ages Amen.", "Glory to the Father, and to the Son, and to the Holy Spirit. Now and ever and unto the ages of the ages. Amen."]],
    arabic: [["المجد للآب والإبن، والروح القدوس، الآن وكل أوان، وإلى دهر الدهور آمين.", "المجْدُ للآبِ والإبنِ والرّوحِ القُدُسِ، الآنَ وكلُّ أَوان وإلَى دَهْرِ الدّهورِ آمين."]],
    englishArabic: [["El-magd lil-Ab wal-Ibn, war-Rouh el-quddous, el-an wa kull awan, wa ila dahr ed-dohour, ameen.", "El-magdu lil-Ab wal-Ibn war-Rouh el-Qudus, el-an wa kulla awan wa ila dahr ed-duhour. Ameen."]],
  },
  "vp-the-ninth-bohairic-interpretation-b": {
    arabic: [["حزقيال النبي، يصرخ شاهداً قائلاً، \"إني رأيت باباً ناحية المشرق، مختوماً بختم عجيب.", "حزقيال النبي، يشهد قائلاً، \"إنني رأيت باباً ناحية المشرق، مختوماً بخاتم عجيب."]],
    englishArabic: [["Hizqiyal en-nabi, yasrukh shahidan qa'ilan: \"Inni ra'aytu baban nahiyat el-mashriq, makhtouman bi-khatm 'ageeb.", "Hizqiyal en-nabi, yash-had qa'ilan, \"Innani ra'aytu baban nahiyat el-mashriq, makhtouman bi-khatam 'ageeb."]],
  },
};
