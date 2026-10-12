// A short line for each day, from the hymns, the Liturgy, the Psalms and the Gospels, shown by the
// Verse of the Day widget (lock screen and home screen). Kept short so a lock-screen widget can show it whole.
export interface DailyVerse {
  en: string;
  ar: string;
  source: { en: string; ar: string };
}

const v = (en: string, ar: string, sourceEn: string, sourceAr: string): DailyVerse => ({ en, ar, source: { en: sourceEn, ar: sourceAr } });

export const dailyVerses: DailyVerse[] = [
  v('Holy God, Holy Mighty, Holy Immortal, have mercy on us.', 'قدوس الله، قدوس القوي، قدوس الحي الذي لا يموت، ارحمنا.', 'The Trisagion', 'الثلاثة تقديسات'),
  v('Christ is risen from the dead; by death He trampled death.', 'المسيح قام من بين الأموات، بالموت داس الموت.', 'Hymn of the Resurrection', 'لحن القيامة'),
  v('Hail to you, Mary, the beautiful dove, who gave birth to God the Word.', 'السلام لكِ يا مريم، الحمامة الحسنة، التي ولدت لنا الله الكلمة.', 'Sunday Theotokia', 'ثيئوطوكية الأحد'),
  v('My Lord Jesus Christ, Son of God, have mercy on me.', 'يا ربي يسوع المسيح ابن الله ارحمني.', 'The Jesus Prayer', 'صلاة يسوع'),
  v('We worship the Father, the Son and the Holy Spirit, the holy Trinity.', 'نسجد للآب والابن والروح القدس، الثالوث القدوس.', 'Verses of the Cymbals', 'أرباع الناقوس'),
  v('Blessed are You indeed, with Your good Father and the Holy Spirit, for You have come and saved us.', 'مبارك أنت بالحقيقة مع أبيك الصالح والروح القدس، لأنك أتيت وخلصتنا.', 'Blessed Are You', 'إكسمارؤوت'),
  v('Glory to the Father and the Son and the Holy Spirit, now and forever. Amen.', 'المجد للآب والابن والروح القدس، الآن وكل أوان وإلى الأبد. آمين.', 'The Doxology', 'الذكصولوجية'),
  v('Praise the Lord, all you nations; praise Him, all you peoples.', 'سبحوا الرب يا جميع الأمم، وليباركه كل الشعوب.', 'Psalm 117 (116)', 'مزمور ١١٦'),
  v('The Lord is my strength and my song, and He has become my salvation.', 'قوتي وتسبحتي هو الرب، وقد صار لي خلاصاً.', 'The First Canticle', 'الهوس الأول'),
  v('Bless the Lord, all you works of the Lord; praise and exalt Him forever.', 'باركي الرب يا جميع أعمال الرب، سبحيه وزيديه علواً إلى الآباد.', 'The Third Canticle', 'الهوس الثالث'),
  v('Let everything that has breath praise the Lord.', 'كل نسمة فلتسبح الرب.', 'Psalm 150', 'مزمور ١٥٠'),
  v('Give thanks to the Lord, for He is good; His mercy endures forever.', 'اشكروا الرب لأنه صالح، لأن إلى الأبد رحمته.', 'Psalm 136 (135)', 'مزمور ١٣٥'),
  v('Arise, O children of the light, let us praise the Lord of hosts.', 'قوموا يا بني النور، لنسبح رب القوات.', 'Arise, O Children of the Light', 'تين ثينو'),
  v('Through the intercessions of the Theotokos Saint Mary, O Lord, grant us the forgiveness of our sins.', 'بشفاعات والدة الإله القديسة مريم، يا رب أنعم لنا بمغفرة خطايانا.', 'Hitens', 'الهيتينيات'),
  v('This is the day the Lord has made; let us rejoice and be glad in it.', 'هذا هو اليوم الذي صنعه الرب، فلنفرح ونبتهج به.', 'Psalm 118 (117)', 'مزمور ١١٧'),
  v('Blessed is He who comes in the name of the Lord.', 'مبارك الآتي باسم الرب.', 'Palm Sunday', 'أحد الشعانين'),
  v('Glory to God in the highest, and on earth peace, goodwill toward men.', 'المجد لله في الأعالي، وعلى الأرض السلام، وفي الناس المسرة.', 'The Gloria', 'تسبحة الملائكة'),
  v('The Lord is my shepherd; I shall not want.', 'الرب يرعاني فلا يعوزني شيء.', 'Psalm 23 (22)', 'مزمور ٢٢'),
  v('Remember me, O Lord, when You come into Your kingdom.', 'اذكرني يا رب متى جئت في ملكوتك.', 'Great Friday', 'الجمعة العظيمة'),
  v('Your death, O Lord, we proclaim; Your holy resurrection we confess.', 'بموتك يا رب نبشر، وبقيامتك المقدسة نعترف.', 'The Divine Liturgy', 'القداس الإلهي'),
  v('Holy, holy, holy, Lord of hosts; heaven and earth are full of Your glory.', 'قدوس قدوس قدوس رب الصباؤوت، السماء والأرض مملوءتان من مجدك.', 'The Divine Liturgy', 'القداس الإلهي'),
  v('One is the holy Father, one is the holy Son, one is the Holy Spirit. Amen.', 'واحد هو الآب القدوس، واحد هو الابن القدوس، واحد هو الروح القدس. آمين.', 'The Divine Liturgy', 'القداس الإلهي'),
  v('Our Father who art in heaven, hallowed be Thy name.', 'أبانا الذي في السماوات، ليتقدس اسمك.', 'The Lord’s Prayer', 'الصلاة الربانية'),
  v('Christ is born. Truly He is born.', 'المسيح وُلد. بالحقيقة وُلد.', 'The Nativity', 'عيد الميلاد'),
  v('Christ is risen. Truly He is risen.', 'المسيح قام. بالحقيقة قام.', 'The Resurrection', 'عيد القيامة'),
  v('Rejoice in the Lord always; again I will say, rejoice.', 'افرحوا في الرب كل حين، وأقول أيضاً افرحوا.', 'Philippians 4:4', 'فيلبي ٤:٤'),
  v('Blessed are the pure in heart, for they shall see God.', 'طوبى للأنقياء القلب، لأنهم يعاينون الله.', 'Matthew 5:8', 'متى ٥:٨'),
  v('Have mercy on us, O God, and have mercy on us.', 'ارحمنا يا الله ثم ارحمنا.', 'God Have Mercy', 'إفنوتي ناي نان'),
  v('The Lord will fight for you, and you shall hold your peace.', 'الرب يقاتل عنكم وأنتم تصمتون.', 'Exodus 14:14', 'خروج ١٤:١٤'),
  v('Seek first the kingdom of God and His righteousness.', 'اطلبوا أولاً ملكوت الله وبره.', 'Matthew 6:33', 'متى ٦:٣٣'),
  v('I can do all things through Christ who strengthens me.', 'أستطيع كل شيء في المسيح الذي يقويني.', 'Philippians 4:13', 'فيلبي ٤:١٣'),
  v('God is love.', 'الله محبة.', '1 John 4:8', '١ يوحنا ٤:٨'),
  v('Be still, and know that I am God.', 'كفوا واعلموا أني أنا الله.', 'Psalm 46 (45)', 'مزمور ٤٥'),
  v('The Lord is my light and my salvation; whom shall I fear?', 'الرب نوري وخلاصي، ممن أخاف؟', 'Psalm 27 (26)', 'مزمور ٢٦'),
  v('My soul magnifies the Lord, and my spirit rejoices in God my Savior.', 'تعظم نفسي الرب، وتبتهج روحي بالله مخلصي.', 'Luke 1:46–47', 'لوقا ١:٤٦–٤٧'),
  v('Ask, and it will be given to you; seek, and you will find.', 'اسألوا تُعطَوا، اطلبوا تجدوا.', 'Matthew 7:7', 'متى ٧:٧'),
  v('Come to Me, all you who labor and are heavy laden, and I will give you rest.', 'تعالوا إليّ يا جميع المتعبين والثقيلي الأحمال، وأنا أريحكم.', 'Matthew 11:28', 'متى ١١:٢٨'),
  v('I am the light of the world.', 'أنا هو نور العالم.', 'John 8:12', 'يوحنا ٨:١٢'),
  v('I am the resurrection and the life.', 'أنا هو القيامة والحياة.', 'John 11:25', 'يوحنا ١١:٢٥'),
  v('Peace I leave with you, My peace I give to you.', 'سلاماً أترك لكم، سلامي أعطيكم.', 'John 14:27', 'يوحنا ١٤:٢٧'),
  v('Create in me a clean heart, O God.', 'قلباً نقياً اخلق فيّ يا الله.', 'Psalm 51 (50)', 'مزمور ٥٠'),
  v('Taste and see that the Lord is good.', 'ذوقوا وانظروا ما أطيب الرب.', 'Psalm 34 (33)', 'مزمور ٣٣'),
  v('Your word is a lamp to my feet and a light to my path.', 'سراج لرجلي كلامك ونور لسبيلي.', 'Psalm 119 (118)', 'مزمور ١١٨'),
  v('Love is patient, love is kind.', 'المحبة تتأنى وترفق.', '1 Corinthians 13:4', '١ كورنثوس ١٣:٤'),
  v('Lord, have mercy.', 'يا رب ارحم.', 'Kyrie eleison', 'كيرياليسون'),
];

// The same line all day, a different one each day, going through the whole list in order
export const verseForDay = (jdn: number): DailyVerse => dailyVerses[((jdn % dailyVerses.length) + dailyVerses.length) % dailyVerses.length];
