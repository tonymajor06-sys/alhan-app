import type { Service } from './hymns';

// Seasons whose hymns come from alhan.org (by Archdeacon Arsani Sidarous, used with his permission): Coptic and English
// as given there, the Coptic in English letters written out, and its recording. Arabic is added as the texts come in.
export const alhanSeasonServices: Record<string, Service[]> = {
  "nayrouz": [
    {
      id: "nayrouz-matins",
      title: "Vespers and Matins",
      hymns: [
        {
          id: "nayrouz-matins-doxology",
          title: "Ϩⲱⲥ ⲉ̀Ⲡ⳪ (Doxology)",
          versions: [
            { language: 'coptic', audio: "alhan-nairouz-nai-doxo.mp3", text: "Ϩⲱⲥ ⲉ̀Ⲡ⳪ ϧⲉⲛ ⲟⲩϩⲱⲥ ⲙ̀ⲃⲉⲣⲓ ⲱ̀ⲛⲓⲗⲁⲟⲥ ⲙ̀ⲙⲁⲓ Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲚⲟⲩϯ ϫⲉ ⲁϥϫⲉⲙⲡⲉⲛϣⲓⲛⲓ ϧⲉⲛ ⲡⲉϥⲟⲩϫⲁⲓ ϩⲱⲥ ⲁⲅⲁⲑⲟⲥ ⲟⲩⲟϩ ⲙ̀ⲙⲁⲓⲣⲱⲙⲓ.\n\n+ Ⲧⲉⲛⲟ̀ⲩⲱⲣⲡ ⲛⲁⲕ ⲙ̀ⲡⲓϩⲩⲙⲛⲟⲥ ϧⲉⲛ ϩⲁⲛⲥ̀ⲙⲏ ⲛ̀ϯⲇⲟⲝⲟⲗⲟⲅⲓⲁ ⲱ̀ ⲡⲉⲛⲤⲱⲧⲏⲣ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲙⲁⲧⲁϫⲣⲟⲛ ϣⲁ ϯⲥⲩⲛⲧⲉⲗⲓⲁ.\n\nⲘⲟⲓ ⲛⲁⲛ Ⲡ⳪ ⲛ̀ⲧⲉⲕϩⲓⲣⲏⲛⲏ ⲛⲁϩⲙⲉⲛ ϧⲉⲛ ⲛⲉⲛϫⲩϫ ⲛ̀ⲧⲉ ⲛⲉⲛϫⲁϫⲓ ⲙⲁⲑⲉⲃⲓⲟ ⲙ̀ⲡⲟⲩⲥⲟϭⲛⲓ ⲟⲩⲟϩ ⲙⲁⲧⲁⲗϭⲟ ⲛ̀ⲛⲉⲛϣⲱⲛⲓ.\n\n+ Ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭⲣⲏⲥⲧⲟⲥ Ⲡ⳪ ⲛⲓⲓⲁⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲙⲟⲩⲙⲓ ⲛⲉⲙ ⲛⲓⲥⲓϯ ⲛⲉⲙ ⲛⲓⲕⲁⲣⲡⲟⲥ.\n\nⲤ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲛ ϧⲉⲛ ⲛⲉⲛϩ̀ⲃⲏⲟⲩⲓ̀ ϧⲉⲛ ⲡⲉⲕⲥ̀ⲙⲟⲩ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ ⲟⲩⲱⲣⲡ ⲛⲁⲛ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲡⲉⲕϭⲓⲥⲓ ⲡⲉⲕϩ̀ⲙⲟⲧ ⲛⲉⲙ ⲛⲉⲕⲁ̀ⲅⲁⲑⲟⲛ.\n\n+ Ⲛⲏⲉ̀ⲧϩⲉϫϩⲱϫ ⲛⲁϩⲙⲟⲩ ⲉ̀ⲃⲟⲗ ⲛⲏⲉ̀ⲧⲁⲩϣⲉ ⲉ̀ⲡ̀ϣⲉⲙⲙⲟ ⲙⲁⲧⲁⲥⲑⲱⲟⲩ ⲛⲉⲙ ⲛⲏⲉ̀ⲧⲥⲱⲛϩ ⲃⲟⲗⲟⲩ ⲉ̀ⲃⲟⲗ ⲛⲏⲉ̀ⲧⲁⲩⲉⲛⲕⲟⲧ ⲙⲁⲙ̀ⲧⲟⲛ ⲛⲱⲟⲩ.\n\nⲰ̀ⲗⲓ ⲙ̀ⲡⲉⲕϫⲱⲛ ⲉ̀ⲃⲟⲗϩⲁⲣⲟⲛ ⲛⲁϩⲙⲉⲛ ⲉ̀ⲃⲟⲗϩⲁ ⲟⲩϩ̀ⲃⲱⲛ ⲛⲉⲙ ⲛⲓⲫⲁϣ ⲛ̀ⲧⲉ ⲛⲓⲇⲉⲙⲱⲛ ⲱ̀ ⲫ̀ⲣⲉϥϯ ⲛ̀ⲛⲓⲁ̀ⲅⲁⲑⲟⲛ.\n\n+ Ⲧⲉⲛϩⲱⲥ ⲉ̀ⲣⲟϥ ⲧⲉⲛϯⲱ̀ⲟⲩ ⲛⲁϥ ⲧⲉⲛⲉⲣϩⲟⲩⲟ̀ ϭⲓⲥⲓ ⲙ̀ⲙⲟϥ ϩⲱⲥ ⲁⲅⲁⲑⲟⲥ ⲟⲩⲟϩ ⲙ̀ⲙⲁⲓⲣⲱⲙⲓ ⲛⲁⲓ ⲛⲁⲛ ⲕⲁⲧⲁ ⲡⲉⲕⲛⲓϣϯ ⲛ̀ⲛⲁⲓ." },
            { language: 'englishCoptic', audio: "alhan-nairouz-nai-doxo.mp3", text: "Hōs e-Ptshois khen ouhōs emveri ōnilaos emmai Pi-ekhristos pen-Nouti je afjempenshini khen pefoujai hōs agathos ouoh emmairōmi.\n\n+ Tenouōrp nak empihumnos khen hanesmē entidoksologia ō pen-Sōtēr enagathos matajron sha tisuntelia.\n\nMoi nan Ptshois entekhirēnē nahmen khen nenjuj ente nenjaji mathevio empousotshni ouoh mataltsho ennenshōni.\n\n+ Esmou epikhlom ente tirompi hiten tekmetkhrēstos Ptshois niiarōou nem nimoumi nem nisiti nem nikarpos.\n\nEsmou eron khen nenehvēou-i khen pekesmou enepouranion ouōrp nan evolkhen pektshisi pekehmot nem nekagathon.\n\n+ Nē-ethejhōj nahmou evol nē-etaushe e-epshemmo matasthōou nem nē-etsōnh volou evol nē-etauenkot ma-emton nōou.\n\nŌli empekjōn evolharon nahmen evolha ou-ehvōn nem nifash ente nidemōn ō efrefti enni-agathon.\n\n+ Tenhōs erof tenti-ōou naf tenerhou-o tshisi emmof hōs agathos ouoh emmairōmi nai nan kata peknishti ennai." },
            { language: 'english', text: "Sing unto the Lord a new song, O people who love Christ our God, for He visited us with His salvation, as a good One and Lover of mankind.\n\n+ We ascribe praise unto You, with voices of glorification, O our good Savior, confirm us unto the end.\n\nGrant us O Lord Your peace, and save us from the hands of our enemies, humiliate their counsel, and heal our sicknesses.\n\n+ Bless the crown of the year, with Your goodness O Lord, the rivers and the fountains, the plants and the fruits.\n\nBless us in our work, with Your heavenly blessings, and send unto us from on high, Your grace and Your goodness.\n\n+ The afflicted save them, the travelers return them, the bound loosen them, and those who have slept repose them.\n\nLift away Your wrath from us, and deliver us from inflation, and from the snares of demons, O Giver of good things.\n\n+ We praise and glorify Him, and exalt Him above all, as a good One and Lover of man, have mercy upon us according to Your great mercy." },
          ],
        },
        {
          id: "nayrouz-matins-psalm-response",
          title: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ (Psalm Response)",
          versions: [
            { language: 'coptic', audio: "alhan-nairouz-nai-psalm.mp3", text: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀⳪ ⲛⲓⲁ̀ⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲙⲟⲩⲙⲓ ⲛⲉⲙ ⲛⲓⲥⲓϯ ⲛⲉⲙ ⲛⲓⲕⲁⲣⲡⲟⲥ. Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅." },
            { language: 'englishCoptic', audio: "alhan-nairouz-nai-psalm.mp3", text: "Allēlouia allēlouia esmou epi-ekhlom ente tirompi hiten tekmetekhrēstos Eptshois ni-arōou nem nimoumi nem nisiti nem nikarpos. Allēlouia allēlouia." },
            { language: 'english', text: "Alleluia Alleluia, bless the crown of the year with Your goodness O Lord. The rivers, the springs, the plants, and the crops. Alleluia Alleluia." },
          ],
        },
        {
          id: "nayrouz-matins-gospel-response",
          title: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ (Gospel Response)",
          versions: [
            { language: 'coptic', audio: "alhan-nairouz-nai-gospel.mp3", text: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀⳪.\n\nⲪⲁⲓ ⲉⲣⲉ ⲡⲓⲱ̀ⲟⲩ ⲉⲣⲡ̀ⲣⲉⲡⲓⲛⲁϥ ⲛⲉⲙ Ⲡⲉϥⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ." },
            { language: 'englishCoptic', audio: "alhan-nairouz-nai-gospel.mp3", text: "Allēlouia allēlouia allēlouia allēlouia esmou epi-ekhlom ente tirompi hiten tekmetekhrēstos Eptshois.\n\nFai ere pi-ōou ereprepinaf nem Pefiōt enagathos nem pi-Epneuma ethouab isjen tinou nem sha eneh." },
            { language: 'english', text: "Alleluia Alleluia Alleluia Alleluia, Bless the crown of the year with Your goodness O Lord.\n\nThis is He who is worthy of glory, with His Good Father, and the Holy Spirit, both now and forever." },
          ],
        },
      ],
    },
    {
      id: "nayrouz-liturgy",
      title: "Liturgy",
      hymns: [
        {
          id: "nayrouz-liturgy-praxis-response",
          title: "Ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ (Praxis Response)",
          versions: [
            { language: 'coptic', audio: "alhan-nairouz-nai-epraxis.mp3", text: "Ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀⳪ ⲛⲓⲁ̀ⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲙⲟⲩⲙⲓ ⲛⲉⲙ ⲛⲓⲥⲓϯ ⲛⲉⲙ ⲛⲓⲕⲁⲣⲡⲟⲥ.\n\nⲔ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ" },
            { language: 'englishCoptic', audio: "alhan-nairouz-nai-epraxis.mp3", text: "Esmou epi-ekhlom ente tirompi hiten tekmetekhrēstos Eptshois ni-arōou nem nimoumi nem nisiti nem nikarpos.\n\nEkesmarōout" },
            { language: 'english', text: "Bless the crown of the year with Your goodness O Lord. the rivers, the springs, the plants, and the crops.\n\nBlessed are You" },
          ],
        },
        {
          id: "nayrouz-liturgy-psalm-response",
          title: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ (Psalm Response)",
          versions: [
            { language: 'coptic', audio: "alhan-nairouz-nai-psalm.mp3", text: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀⳪ ⲛⲓⲁ̀ⲣⲱⲟⲩ ⲛⲉⲙ ⲛⲓⲙⲟⲩⲙⲓ ⲛⲉⲙ ⲛⲓⲥⲓϯ ⲛⲉⲙ ⲛⲓⲕⲁⲣⲡⲟⲥ. Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅." },
            { language: 'englishCoptic', audio: "alhan-nairouz-nai-psalm.mp3", text: "Allēlouia allēlouia esmou epi-ekhlom ente tirompi hiten tekmetekhrēstos Eptshois ni-arōou nem nimoumi nem nisiti nem nikarpos. Allēlouia allēlouia." },
            { language: 'english', text: "Alleluia Alleluia, bless the crown of the year with Your goodness O Lord. The rivers, the springs, the plants, and the crops. Alleluia Alleluia." },
          ],
        },
        {
          id: "nayrouz-liturgy-gospel-response",
          title: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ (Gospel Response)",
          versions: [
            { language: 'coptic', audio: "alhan-nairouz-nai-gospel.mp3", text: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ ⲥ̀ⲙⲟⲩ ⲉ̀ⲡⲓⲭ̀ⲗⲟⲙ ⲛ̀ⲧⲉ ϯⲣⲟⲙⲡⲓ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡ̀⳪.\n\nⲪⲁⲓ ⲉⲣⲉ ⲡⲓⲱ̀ⲟⲩ ⲉⲣⲡ̀ⲣⲉⲡⲓⲛⲁϥ ⲛⲉⲙ Ⲡⲉϥⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ." },
            { language: 'englishCoptic', audio: "alhan-nairouz-nai-gospel.mp3", text: "Allēlouia allēlouia allēlouia allēlouia esmou epi-ekhlom ente tirompi hiten tekmetekhrēstos Eptshois.\n\nFai ere pi-ōou ereprepinaf nem Pefiōt enagathos nem pi-Epneuma ethouab isjen tinou nem sha eneh." },
            { language: 'english', text: "Alleluia Alleluia Alleluia Alleluia, Bless the crown of the year with Your goodness O Lord.\n\nThis is He who is worthy of glory, with His Good Father, and the Holy Spirit, both now and forever." },
          ],
        },
      ],
    },
  ],
  "cross": [
    {
      id: "cross-matins",
      title: "Vespers and Matins",
      hymns: [
        {
          id: "cross-matins-verses-of-the-cymbal",
          title: "Ⲭⲉⲣⲉ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ (Verses of the Cymbal)",
          versions: [
            { language: 'coptic', audio: "alhan-cross-cross-cymbals.mp3", text: "Ⲭⲉⲣⲉ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲉ̀ⲧⲁⲩⲉϣ ⲡⲁ⳪ ⲉ̀ⲣⲟϥ ⲭⲉⲣⲉ ⲡⲓⲙ̀ϩⲁⲩ ⲉⲧⲁⲩ ⲭⲱ ⲙ̀ⲡⲉϥⲥⲱⲙⲁ ⲛ̀ϧⲏⲧϥ.\n\nⲠⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲉ ⲡⲉⲛϩⲟⲡⲗⲟⲛ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲉ ⲧⲉⲛϩⲉⲗⲡⲓⲥ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲉ ⲡⲉⲛⲧⲁϫⲣⲟ ϧⲉⲛ ⲛⲉⲛϩⲟϫϩⲉϫ ⲛⲉⲙ ⲛⲉⲛⲑ̀ⲗⲓⲯⲓⲥ." },
            { language: 'englishCoptic', audio: "alhan-cross-cross-cymbals.mp3", text: "Shere pi-estauros etauesh patshois erof shere pi-emhau etau khō empefsōma enkhētf.\n\nPi-estauros pe penhoplon pi-estauros pe tenhelpis pi-estauros pe pentajro khen nenhojhej nem nenethlipsis." },
            { language: 'english', text: "Hail to the cross, which my Lord was crucified upon, hail to the grave, where they placed His body.\n\nThe cross is our weapon, the cross is our hope, the cross is our confirmation, in our troubles and sufferings." },
          ],
        },
        {
          id: "cross-matins-doxology",
          title: "Ⲁⲛⲟⲛ ϩⲱⲛ ϧⲁ ⲛⲓⲗⲁⲟⲥ (Doxology)",
          versions: [
            { language: 'coptic', audio: "alhan-cross-cross-doxology.mp3", text: "Ⲁⲛⲟⲛ ϩⲱⲛ ϧⲁ ⲛⲓⲗⲁⲟⲥ ⲛⲓϣⲏⲣⲓ ⲛ̀ⲟⲣⲑⲟⲇⲟⲝⲟⲥ ⲛ̀ⲧⲉⲛⲟ̀ⲩⲱϣⲧ ⲙ̀ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲛ̀ⲧⲉ ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅.\n\n+ Ⲡⲁⲩⲗⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ ⲉϥϫⲱ ⲙ̀ⲡ̀ⲁⲧⲓⲟ ⲙ̀ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ϫⲉ ⲧⲉⲛⲛⲁϣⲟⲩϣⲟⲩ ⲙ̀ⲙⲟⲛ ⲁⲛ ⲉ̀ⲃⲏⲗ ϧⲉⲛ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅.\n\nⲦⲉⲛⲉⲣϩⲩⲙⲛⲟⲥ ⲱ̀ ⲛⲓⲡⲓⲥⲧⲟⲥ ⲙ̀ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲟⲩⲟϩ ⲛ̀ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲡⲉϥⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲓϣⲉ ⲉ̅ⲑ̅ⲩ̅ ⲛ̀ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ.\n\n+ Ⲧⲉⲛϣⲟⲩϣⲟⲩ ⲙ̀ⲙⲟⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲫⲏⲉ̀ⲧⲁⲩⲓ̀ϣⲓ ⲉ̀ϫⲱⲕ ⲛ̀Ⲓ̅ⲏ̅ⲥ̅ ϫⲉ ⲉ̀ⲃⲟⲗϩⲓⲧⲉⲛ ⲡⲉⲕⲧⲩⲡⲟⲥ ⲁⲛϣⲱⲡⲓ ⲉⲛⲉ̀ⲗⲉⲩⲑⲉⲣⲟⲥ.\n\nⲢⲱⲟⲩ ⲛ̀ⲛⲓⲟⲣⲑⲟⲇⲟⲝⲟⲥ ⲛⲉⲙ ϣⲁϣϥ ⲛ̀ⲧⲁⲅⲙⲁ ⲛ̀ⲁⲅⲅⲉⲗⲟⲥ ⲥⲉϣⲟⲩϣⲟⲩ ⲙ̀ⲙⲟⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲛ̀ⲧⲉ ⲡⲉⲛⲤⲱⲧⲏⲣ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ.\n\n+ Ⲧⲉⲛⲧⲁⲗⲟ ⲙ̀ⲙⲟⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲫ̀ⲛⲁϣϯ ⲛ̀ⲛⲓⲭ̀ⲣⲓⲥⲧⲓⲁ̀ⲛⲟⲥ ⲉ̀ϫⲉⲛ ⲛⲉⲛⲙⲟϯ ⲛ̀ⲇⲩⲛⲁⲧⲟⲥ ⲟⲩⲟϩ ⲛ̀ⲧⲉⲛⲱϣ ⲉ̀ⲃⲟⲗ ⲣⲏⲧⲱⲥ.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲫ̀ⲣⲁϣⲓ ⲛ̀ⲛⲓⲭ̀ⲣⲓⲥⲧⲓⲁ̀ⲛⲟⲥ ⲡⲓϭ̀ⲣⲟ ⲟⲩⲃⲉ ⲡⲓⲧⲩⲣⲁⲛⲛⲟⲥ ⲛⲉⲙ ⲡⲉⲛⲧⲁϫⲣⲟ ⲁⲛⲟⲛ ϧⲁ ⲛⲓⲡⲓⲥⲧⲟⲥ.\n\n+ Ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲫ̀ⲛⲟⲙϯ ⲛ̀ⲛⲓⲡⲥⲧⲟⲥ ⲟⲩⲟϩ ⲡ̀ⲧⲁϫⲣⲟ ⲛ̀ⲛⲓⲙⲁⲣⲧⲩⲣⲟⲥ ϣⲁ ⲛ̀ⲧⲟⲩϫⲱⲕ ⲉ̀ⲃⲟⲗ ⲛ̀ⲛⲟⲩⲃⲁⲥⲁⲛⲟⲥ.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲓϩⲟⲡⲗⲟⲛ ⲛ̀ⲧⲉ ⲡⲓϭ̀ⲣⲟ ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲓⲑ̀ⲣⲟⲛⲟⲥ ⲙ̀ⲡⲓⲟⲩⲣⲟ.\n\n+ Ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲓⲙⲏⲓⲛⲓ ⲛ̀ⲧⲉ ⲡⲓⲟⲩϫⲁⲓ ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲓⲟⲩⲱⲓⲛⲓ ⲉ̀ⲧⲁϥϣⲁⲓ.\n\nⲬⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ϯⲥⲏϥⲓ ⲛ̀ⲧⲉ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ϯⲙⲟⲩⲙⲓ ⲛ̀ⲛⲓⲭⲁⲣⲓⲥⲙⲁ.\n\n+ Ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲓⲑⲩⲥⲁⲩⲣⲟⲥ ⲛ̀ⲧⲉ ⲛⲓⲁ̀ⲅⲁⲑⲟⲛ ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ϣⲁ ⲡ̀ϫⲱⲕ ⲉ̀ⲃⲟⲗ ⲛ̀ⲛⲓⲉ̀ⲱⲛ.\n\nϪⲉ ⲭⲉⲣⲉ ⲛⲁⲕ ⲱ̀ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲫⲏⲉ̀ⲧⲁ ⲡ̀ⲟⲩⲣⲟ Ⲕⲱⲥⲧⲁⲛⲧⲓⲛⲟⲥ ⲟⲗϥ ⲛⲉⲙⲁϥ ⲉ̀ⲡⲓⲡⲟⲗⲉⲙⲟⲥ ⲁϥϣⲁⲣⲓ ⲛ̀ⲛⲓⲂⲁⲣⲃⲁⲣⲟⲥ.\n\n+ Ϥ̀ⲧⲁⲓⲏ̀ⲟⲩⲧ ⲅⲁⲣ ⲉ̀ⲙⲁϣⲱ ⲛ̀ϫⲉ ⲡⲓⲙⲏⲓⲛⲓ ⲛ̀ⲧⲉ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲛ̀ⲧⲉ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ⲟⲩⲣⲟ ⲡⲉⲛⲚⲟⲩϯ ⲛ̀ⲁ̀ⲗⲏⲑⲓⲛⲟⲥ.\n\nⲪⲏⲉ̀ⲧⲁⲩⲁ̀ϣϥ ⲉ̀ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ϣⲁⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲡⲉⲛⲅⲉⲛⲟⲥ ⲁ̀ⲛⲟⲛ ⲇⲉ ϩⲱⲛ ⲙⲁⲣⲉⲛⲧⲁⲓⲟϥ ⲉⲛⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ.\n\n+ Ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲉ ⲡⲉⲛϩⲟⲡⲗⲟⲛ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲉ ⲧⲉⲛϩⲉⲗⲡⲓⲥ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲡⲉ ⲡⲉⲛⲧⲁϫⲣⲟ ϧⲉⲛ ⲛⲉⲛϩⲟϫϩⲉϫ ⲛⲉⲙ ⲛⲉⲛⲑ̀ⲗⲓⲯⲓⲥ.\n\nϪⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲚⲟⲩϯ ⲛⲉⲙ ⲡⲉϥⲥ̀ⲧⲁⲩⲣⲟⲥ ⲛ̀ⲣⲉϥⲧⲁⲛϧⲟ ⲫⲏⲉ̀ⲧⲁⲩⲁϣϥ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱϥ ϣⲁ ⲛ̀ⲧⲉϥ ⲥⲟⲧⲧⲟⲛ ϧⲉⲛ ⲛⲉⲛⲛⲟⲃⲓ.\n\n+ Ⲧⲉⲛϩⲱⲥ ⲉ̀ⲣⲟϥ ⲧⲉⲛϯⲱ̀ⲟⲩ ⲛⲁϥ ⲧⲉⲛⲉⲣϩⲟⲩⲟ̀ ϭⲓⲥⲓ ⲙ̀ⲙⲟϥ ϩⲱⲥ ⲁ̀ⲅⲁⲑⲟⲥ ⲟⲩⲟϩ ⲙ̀ⲙⲁⲓⲣⲱⲙⲓ ⲛⲁⲓ ⲛⲁⲛ ⲕⲁⲧⲁ ⲡⲉⲕⲛⲓϣϯ ⲛ̀ⲛⲁⲓ." },
            { language: 'englishCoptic', audio: "alhan-cross-cross-doxology.mp3", text: "Anon hōn kha nilaos nishēri enorthodoksos entenouōsht empi-estauros ente pentshois Iēsous Pi-ekhristos.\n\n+ Paulos pi-apostolos efjō emepatio empi-estauros je tennashoushou emmon an evēl khen pi-estauros ente Pi-ekhristos.\n\nTenerhumnos ō nipistos empentshois Iēsous Pi-ekhristos ouoh entenouōsht empefestauros pishe ethouab enathanatos.\n\n+ Tenshoushou emmok ō pi-estauros fē-etau-ishi ejōk en-Iēsous je evolhiten pektupos anshōpi eneleutheros.\n\nRōou enniorthodoksos nem shashf entagma enaggelos seshoushou emmok ō pi-estauros ente pen-Sōtēr enagathos.\n\n+ Tentalo emmok ō pi-estauros efnashti enni-ekhristi-anos ejen nenmoti endunatos ouoh entenōsh evol rētōs.\n\nShere nak ō pi-estauros efrashi enni-ekhristi-anos pi-etshro ouve piturannos nem pentajro anon kha nipistos.\n\n+ Shere nak ō pi-estauros efnomti ennipstos ouoh eptajro ennimarturos sha entoujōk evol ennouvasanos.\n\nShere nak ō pi-estauros pihoplon ente pi-etshro shere nak ō pi-estauros pi-ethronos empiouro.\n\n+ Shere nak ō pi-estauros pimēini ente pioujai shere nak ō pi-estauros piouōini etafshai.\n\nShere nak ō pi-estauros tisēfi ente pi-Epneuma shere nak ō pi-estauros timoumi ennikharisma.\n\n+ Shere nak ō pi-estauros pithusauros ente ni-agathon shere nak ō pi-estauros sha epjōk evol enni-eōn.\n\nJe shere nak ō pi-estauros fē-eta epouro Kōstantinos olf nemaf epipolemos afshari enni-Varvaros.\n\n+ Eftai-ēout gar emashō enje pimēini ente pi-estauros ente Iēsous Pi-ekhristos ep-Ouro pen-Nouti enalēthinos.\n\nFē-etau-ashf epi-estauros sha-entefsōti empengenos anon de hōn marentaiof enōsh evol enjō emmos.\n\n+ Pi-estauros pe penhoplon pi-estauros pe tenhelpis pi-estauros pe pentajro khen nenhojhej nem nenethlipsis.\n\nJe efesmarōout enje Pi-ekhristos pen-Nouti nem pefestauros enreftankho fē-etauashf e-ehrēi ejōf sha entef sotton khen nennovi.\n\n+ Tenhōs erof tenti-ōou naf tenerhou-o tshisi emmof hōs agathos ouoh emmairōmi nai nan kata peknishti ennai." },
            { language: 'english', text: "And we also the people, the Sons of the Orthodox, we bow down to the cross, of our Lord Jesus Christ.\n\n+ Saint Paul the Apostle, speaks of the honor of the cross, saying \"We will not glory, except in the cross of Christ.\"\n\nLet us give praise O faithful, to our Lord Jesus Christ, and bow down to His cross, the Immortal and sacred wood.\n\n+ We take pride in you O cross, on which Jesus was crucified, for through your type, we were set free.\n\nThe mouths of the Orthodox people, and the seven hosts of angels, take pride in you O cross, of our good Savior.\n\n+ We carry you O cross, upon our necks, O supporter of brave Christians, and we proclaim loudly.\n\nHail to you O cross, the joy of Christians, the conqueror of tyranny, our confirmation we the faithful.\n\n+ Hail to you O cross, the comfort of the faithful, the confirmation of the martyrs, who completed their sufferings.\n\nHail to you O cross, the weapon of victory, ail to you O cross, the throne of the King.\n\n+ Hail to you O cross, the sign of salvation, hail to you O cross, the shining light.\n\nHail to you O cross, the sword of the Spirit, hail to you O cross, the fountain of grace.\n\n+ Hail to you O cross, the treasure of good things, hail to you O cross, to the end of the ages.\n\nHail to you O cross, which emperor Constantine, carried with him to the war, and smote the Barbarians.\n\n+ For greatly honored, is the sign of the cross, of Jesus Christ the King, our true God.\n\nHe who was crucified upon the cross, to save our race, let us also honor Him, proclaiming and saying.\n\n+ The cross is our weapon, the cross is our hope, the cross is our confirmation, in our troubles and sufferings.\n\nFor blessed is Christ our God, and His life-giving cross, upon which He was crucified, to redeem us from our sins.\n\n+ We praise and glorify Him, and exalt Him above all, as a good One and Lover of man, have mercy upon us according to Your great mercy." },
          ],
        },
        {
          id: "cross-matins-refrain",
          title: "Ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ (Refrain)",
          versions: [
            { language: 'coptic', audio: "alhan-cross-pmatin-refrain-cross.mp3", text: "Ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ ⲡⲉϥⲥ̀ⲧⲁⲩⲣⲟⲥ ⲛⲉⲙ ⲧⲉϥⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ ⲉⲑⲟⲩⲁⲃ ⲁϥⲧⲁⲥⲑⲟ ⲙ̀ⲡⲓⲣⲱⲙⲓ ⲛ̀ⲕⲉⲥⲟⲡ ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲡⲓⲡⲁⲣⲁⲇⲓⲥⲟⲥ.\n\nϪⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ Ϯⲧ̀ⲣⲓⲁⲥ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲥ ⲧⲉⲛϯⲱ̀ⲟⲩ ⲛⲁⲥ." },
            { language: 'englishCoptic', audio: "alhan-cross-pmatin-refrain-cross.mp3", text: "Evol hiten pefestauros nem tefanastasis ethouab aftastho empirōmi enkesop ekhoun epiparadisos.\n\nJe efesmarōout enje Fiōt nem Pshēri nem Pi-epneuma ethouab Ti-etrias etjēk evol tenouōsht emmos tenti-ōou nas." },
            { language: 'english', text: "Through His crucifixion, and holy Resurrection, He restored man once more, to the Paradise.\n\nBlessed be the Father and the Son and the Holy Spirit, the perfect Trinity. We worship Him and glorify Him." },
          ],
        },
        {
          id: "cross-matins-main-sanctuary",
          title: "Ⲡⲓϥ̀ⲧⲟⲟⲩ ⲛ̀ⲍⲱⲟⲛ (Main Sanctuary)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-main-sanc.mp3", text: "Ⲡⲓϥ̀ⲧⲟⲟⲩ ⲛ̀ⲍⲱⲟⲛ ⲛ̀ⲁ̀ⲥⲱⲙⲁⲧⲟⲥ ⲉⲧϥⲁⲓ ϧⲁ ⲡⲓϩⲁⲣⲙⲁ ⲛ̀ⲧⲉ Ⲫϯ ⲟⲩϩⲟ ⲙ̀ⲙⲟⲩⲓ̀ ⲛⲉⲙ ⲟⲩϩⲟ ⲙ̀ⲙⲁⲥⲓ ⲟⲩϩⲟ ⲛ̀ⲣⲱⲙⲓ ⲛⲉⲙ ⲟⲩϩⲟ ⲛ̀ⲁ̀ⲏⲧⲟⲥ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-main-sanc.mp3", text: "Pi-eftoou enzōon enasōmatos etfai kha piharma ente Efnouti ouho emmou-i nem ouho emmasi ouho enrōmi nem ouho enaētos." },
            { language: 'english', text: "The four Incorporeal Beasts, carrying the throne of God, a face of lion a face of a calf, a face of human and a face of an angel." },
          ],
        },
        {
          id: "cross-matins-st-mary",
          title: "Ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ (St Mary)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-mary.mp3", text: "Ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ ϧⲉⲛ ⲟⲩⲉⲙⲡ̀ϣⲁ ⲛⲉⲙ Ⲉ̀ⲗⲓⲥⲁⲃⲉⲧ ⲧⲉⲥⲩⲅⲅⲉⲛⲏⲥ ϫⲉ ⲧⲉⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲑⲟ ϧⲉⲛ ⲛⲓϩⲓⲟ̀ⲙⲓ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲡ̀ⲟⲩⲧⲁϩ ⲛ̀ⲧⲉ ⲧⲉⲛⲉϫⲓ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-mary.mp3", text: "Tentshisi emmo khen ouemepsha nem Elisavet tesuggenēs je te-esmarōout entho khen nihi-omi efesmarōout enje epoutah ente teneji." },
            { language: 'english', text: "We indeed exalt you, with your cousin Elizabeth, saying \"Blessed are you among women, and blessed is the fruit of your womb.\"" },
          ],
        },
        {
          id: "cross-matins-archangel-gabriel",
          title: "Ⲅⲁⲃⲣⲓⲏⲗ (Archangel Gabriel)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-gabriel.mp3", text: "Ⲅⲁⲃⲣⲓⲏⲗ ⲡⲓⲁ̀ⲅⲅⲉⲗⲟⲥ ⲁϥⲛⲁⲩ ⲉ̀ⲣⲟϥ ⲛ̀ϫⲉ Ⲇⲁⲛⲓⲏⲗ ⲉϥⲟ̀ϩⲓ ⲉ̀ⲣⲁⲧϥ ϩⲓϫⲉⲛ ⲛⲉϥⲫⲁⲧ ϩⲓϫⲉⲛ ⲛⲉⲛⲥ̀ⲫⲟⲧⲟⲩ ⲙ̀ⲫ̀ⲓⲁⲣⲟ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-gabriel.mp3", text: "Gabriēl pi-aggelos afnau erof enje Daniēl efohi eratf hijen neffat hijen nenesfotou emefiaro." },
            { language: 'english', text: "The Angel Gabriel, was seen by Daniel, standing on his feet, on the banks of the river." },
          ],
        },
        {
          id: "cross-matins-archangel-michael",
          title: "Ⲙⲓⲭⲁⲏⲗ (Archangel Michael)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-mikhail.mp3", text: "Ⲙⲓⲭⲁⲏⲗ ⲡ̀ⲁ̀ⲣⲭⲱⲛ ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟⲩⲓ̀ ⲛ̀ⲑⲟϥ ⲉⲧⲟⲓ ⲛ̀ϣⲟⲣⲡ ϧⲉⲛ ⲛⲓⲧⲁⲝⲓⲥ ⲛ̀ⲁ̀ⲅⲅⲉⲗⲓⲕⲟⲛ ⲉϥϣⲉⲙϣⲓ ⲙ̀ⲡⲉⲙ̀ⲑⲟ ⲙ̀Ⲡ⳪." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-mikhail.mp3", text: "Mikhaēl eparkhōn enna nifēou-i enthof etoi enshorp khen nitaksis enaggelikon efshemshi empe-emtho em-Ptshois." },
            { language: 'english', text: "Michael the head of the heavenly, you are the first, in the angelic orders, serving in the presence of the Lord." },
          ],
        },
        {
          id: "cross-matins-st-mark",
          title: "Ⲙⲁⲣⲕⲟⲥ (St Mark)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-mark.mp3", text: "Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ ⲟⲩⲟϩ ⲡⲓⲉ̀ⲩⲁ̀ⲅⲅⲉⲗⲓⲥⲧⲏⲥ ⲡⲓⲙⲉⲑⲣⲉ ϧⲁ ⲛⲓⲙ̀ⲕⲁⲩϩ ⲛ̀ⲧⲉ ⲡⲓⲙⲟⲛⲟⲅⲉⲛⲏⲥ Ⲛ̀ⲛⲟⲩϯ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-mark.mp3", text: "Markos pi-apostolos ouoh pi-eu-aggelistēs pimethre kha ni-emkauh ente pimonogenēs Ennouti." },
            { language: 'english', text: "Mark the Apostle, and the Evangelist, the witness of the passion, of the only-begotten God." },
          ],
        },
        {
          id: "cross-matins-st-george",
          title: "ⲍ̅ ⲛ̀ⲣⲟⲙⲡⲓ (St George)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-martyr.mp3", text: "Ϣⲁϣϩϥ (ⲍ̅) ⲛ̀ⲣⲟⲙⲡⲓ ⲁϥϫⲟⲕⲟⲩ ⲉ̀ⲃⲟⲗ ⲛ̀ϫⲉ ⲫⲏⲉ̅ⲑ̅ⲩ̅ Ⲅⲉⲱⲣⲅⲓⲟⲥ ⲉ̀ⲣⲉ ⲡⲓϣ̀ⲃⲉ ⲛ̀ⲟⲩⲣⲟ ⲛ̀ⲁⲛⲟⲙⲟⲥ ⲉⲩϯϩⲁⲡ ⲉⲣⲟϥ ⲙ̀ⲙⲏⲛⲓ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-martyr.mp3", text: "Shashhf (z) enrompi afjokou evol enje fēethouab Geōrgios ere pi-eshve enouro enanomos eutihap erof emmēni." },
            { language: 'english', text: "For seven whole years, Saint George endured, Seventy impious kings, Judging him every day." },
          ],
        },
        {
          id: "cross-matins-st-anthony",
          title: "Ⲃⲱⲗ ⲉ̀ⲃⲟⲗ (St Anthony)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-antony.mp3", text: "Ⲃⲱⲗ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲉⲧⲉⲛϩⲏⲧ ⲛ̀ⲛⲓⲙⲟⲕⲙⲉⲕ ⲛ̀ⲧⲉ ϯⲭⲁⲕⲓ̀ⲁ ⲛⲉⲙ ⲛⲓⲙⲉⲩⲓ̀ ⲉⲧϣⲉⲃϣⲱⲃ ⲉⲧⲓ̀ⲣⲓ ⲙ̀ⲡⲓⲛⲟⲩⲥ ⲛ̀ⲭⲁⲕⲓ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-antony.mp3", text: "Vōl evol khen netenhēt ennimokmek ente tikhakia nem nimeu-i etshebshōb etiri empinous enkhaki." },
            { language: 'english', text: "Remove from your hearts, all the evil thoughts, and the deceiving suspicions, that darken the mind." },
          ],
        },
        {
          id: "cross-matins-northern-door",
          title: "Ⲁⲕϣⲁⲛⲓ̀ (Northern door)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-ndoor.mp3", text: "Ⲁⲕϣⲁⲛⲓ̀ ϧⲉⲛ ⲧⲉⲕⲙⲁϩⲥ̀ⲛⲟⲩϯ ⲙ̀ⲡⲁⲣⲟⲩⲥⲓⲁ̀ ⲉⲧⲟⲓ ⲛ̀ϩⲟϯ ⲙ̀ⲡⲉⲛⲑ̀ⲣⲉⲛⲥⲱⲧⲉⲙ ϧⲉⲛ ⲟⲩⲥ̀ⲑⲉⲣ-ⲧⲉⲣ ϫⲉ ϯⲥⲱⲟⲩⲛ ⲙ̀ⲙⲱⲧⲉⲛ ⲁⲛ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-ndoor.mp3", text: "Akshani khen tekmahesnouti emparousi-a etoi enhoti empenethrensōtem khen ou-esther-ter je tisōoun emmōten an." },
            { language: 'english', text: "And when You come again, in Your fearful appearance, may we never hear You say, \"I do not know you.\"" },
          ],
        },
        {
          id: "cross-matins-baptismal",
          title: "Ⲁϥⲉⲣⲙⲉⲑⲣⲉ (Baptismal)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-baptism.mp3", text: "Ⲁϥⲉⲣⲙⲉⲑⲣⲉ ⲛ̀ϫⲉ Ⲓⲱⲁⲛⲛⲏⲥ ϧⲉⲛ ⲡⲓϥ̀ⲧⲟⲟⲩ (ⲇ̅) ⲛ̀ⲉ̀ⲩⲁ̀ⲅⲅⲉⲗⲓⲟⲛ ϫⲉ ⲁⲓϯⲱⲙⲥ ⲙ̀ⲡⲁⲤⲱⲧⲏⲣ ϧⲉⲛ ⲛⲓⲙⲱⲟⲩ ⲛ̀ⲧⲉ ⲡⲓⲒⲟⲣⲇⲁⲛⲏⲥ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-baptism.mp3", text: "Afermethre enje Iōannēs khen pi-eftoou (d) eneu-aggelion je aitiōms empa-Sōtēr khen nimōou ente pi-Iordanēs." },
            { language: 'english', text: "John witnessed, in the four gospels, \"I baptized my Savior, in the waters of the Jordan.\"" },
          ],
        },
        {
          id: "cross-matins-southern-door",
          title: "Ⲫⲏⲉⲧϩⲉⲙⲥⲓ (Southern door)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-sdoor.mp3", text: "Ⲫⲏⲉⲧϩⲉⲙⲥⲓ ϩⲓϫⲉⲛ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ ϩⲓϫⲉⲛ ⲡⲓⲑ̀ⲣⲟⲛⲟⲥ ⲛ̀ⲧⲉ ⲡⲉϥⲱ̀ⲟⲩ  ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲟⲩⲡⲉ ⲡⲁⲓⲛⲓϣϯ ⲛ̀ⲑⲉⲃⲓⲟ̀." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-sdoor.mp3", text: "Fēethemsi hijen ni-Kherouvim hijen pi-ethronos ente pefōou  afshe ekhoun e-Ierousalēm oupe painishti enthevi-o." },
            { language: 'english', text: "He who sits upon the Cherubim, on the throne of His glory, He entered Jerusalem, such a great modesty." },
          ],
        },
        {
          id: "cross-matins-st-john-the-baptist",
          title: "Ⲙⲡⲉ ⲟⲩⲟⲛ ⲧⲱⲛϥ (St John the Baptist)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-john.mp3", text: "Ⲙⲡⲉ ⲟⲩⲟⲛ ⲧⲱⲛϥ ϧⲉⲛ ⲛⲓϫⲓⲛⲙⲓⲥⲓ ⲛ̀ⲧⲉ ⲛⲓϩⲓⲟⲙⲓ ⲉϥⲟⲛⲓ ⲙ̀ⲙⲟⲕ ⲛ̀ⲑⲟⲕ ⲟⲩⲛⲓϣϯ ϧⲉⲛ ⲛⲏⲉ̅ⲑ̅ⲩ̅ ⲧⲏⲣⲟⲩ Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲓⲣⲉϥϯⲱⲙⲥ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-john.mp3", text: "Mpe ouon tōnf khen nijinmisi ente nihiomi efoni emmok enthok ounishti khen nēethouab tērou Iōannēs pireftiōms." },
            { language: 'english', text: "Among those born of women, no one is like you, you are great among the saints, O John the Baptist." },
          ],
        },
      ],
    },
    {
      id: "cross-liturgy",
      title: "Liturgy",
      hymns: [
        {
          id: "cross-liturgy-hiten-for-constantine",
          title: "Ϩⲓⲧⲉⲛ..Ⲕⲱⲥⲧⲁⲛⲧⲓⲛⲟⲥ (Hiten for Constantine)",
          versions: [
            { language: 'coptic', audio: "alhan-cross-cross-hiten.mp3", text: "Ϩⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ ⲛ̀ⲧⲉ ⲡⲁ⳪ ⲡ̀ⲟⲩⲣⲟ Ⲕⲱⲥⲧⲁⲛⲧⲓⲛⲟⲥ ⲛⲉⲙ Ⲏ̀ⲗⲁⲛⲏ ⲧⲉϥⲙⲁⲩ ϯⲟⲩⲣⲱ Ⲡ⳪..." },
            { language: 'englishCoptic', audio: "alhan-cross-cross-hiten.mp3", text: "Hiten ni-eukhē ente patshois epouro Kōstantinos nem Ēlanē tefmau tiourō Ptshois..." },
            { language: 'english', text: "Through the prayers, of my master king Constantine, and his mother queen Helen, O Lord..." },
          ],
        },
        {
          id: "cross-liturgy-praxis-response",
          title: "Ⲭⲉⲣⲉ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ (Praxis Response)",
          versions: [
            { language: 'coptic', audio: "alhan-cross-cross-praxis.mp3", text: "Ⲭⲉⲣⲉ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲫⲏⲉ̀ⲧⲁⲩⲉϣ ⲡⲁ⳪ ⲉ̀ⲣⲟϥ ϣⲁ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲉⲛⲛⲟⲃⲓ." },
            { language: 'englishCoptic', audio: "alhan-cross-cross-praxis.mp3", text: "Shere pi-estauros fē-etauesh patshois erof sha entefsōti emmon evol khen nennovi." },
            { language: 'english', text: "Hail to the Cross, which my Lord was crucified upon, in order to save us, from our sins." },
          ],
        },
        {
          id: "cross-liturgy-hymn-of-king-constantine",
          title: "Ⲉⲧⲁⲩⲉ̀ⲛ ⲛⲓⲥ̀ϧⲁⲓ (Hymn of King Constantine)",
          versions: [
            { language: 'coptic', audio: "alhan-cross-cross-etaven.mp3", text: "Ⲉⲧⲁⲩⲉ̀ⲛ ⲛⲓⲥ̀ϧⲁⲓ ⲛ̀ϩⲓⲣⲏⲛⲓⲕⲟⲛ ⲛ̀ⲧⲉ Ⲕⲱⲥⲧⲁⲛⲧⲓⲛⲟⲥ ⲉ̀ϧⲟⲩⲛ ⲉⲢⲁⲕⲟϯ ϫⲉ ⲙⲁϣ̀ⲑⲁⲙ ⲙ̀ⲫ̀ⲣⲟ ⲛ̀ⲛⲓⲉⲣⲫⲏⲟⲩⲓ̀ ⲁ̀ⲱⲟⲩⲛ ⲙ̀ⲫ̀ⲣⲟ ⲛ̀ⲛⲓⲉⲕⲕ̀ⲗⲏⲥⲓⲁ̀.\n\nⲀ̀ ⲛⲓⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ ⲥⲱⲧⲉⲙ ⲁⲩⲣⲁϣⲓ ⲁ̀ⲛⲓⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ ⲟⲩⲛⲟϥ ⲙ̀ⲙⲱⲟⲩ ⲁ̀ⲡⲓϣⲁϣϥ ⲛ̀ⲧⲁⲅⲙⲁ ⲛ̀ⲧⲉ ϯⲉⲕⲕ̀ⲗⲏⲥⲓⲁ̀ ϯⲱ̀ⲟⲩ ⲙ̀Ⲫ̀ϯ ⲛ̀ⲧⲉ ⲧ̀ⲫⲉ." },
            { language: 'englishCoptic', audio: "alhan-cross-cross-etaven.mp3", text: "Etau-en ni-eskhai enhirēnikon ente Kōstantinos ekhoun e-Rakoti je ma-eshtham emefro ennierfēou-i aōoun emefro enniekeklēsi-a.\n\nA ni-episkopos sōtem aurashi ani-epresvuteros ounof emmōou apishashf entagma ente tiekeklēsi-a ti-ōou em-Efti ente etfe." },
            { language: 'english', text: "When Constantine's peaceful writings reached Alexandria saying, \"Shut the gates of the heathen and open the gates of the Churches\".\n\nThe bishops heard and were joyful, the priests rejoiced, and the seven ranks of the Church glorified the God of heaven." },
          ],
        },
      ],
    },
  ],
  "nativity": [
    {
      id: "nativity-matins",
      title: "Matins",
      hymns: [
        {
          id: "nativity-matins-verses-of-the-cymbals",
          title: "Ⲧⲉⲛⲟ̀ⲩⲱ̀ϣⲧ (Verses of the cymbals)",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-tenouosht.mp3", text: "Ⲧⲉⲛⲟ̀ⲩⲱ̀ϣⲧ ⲙ̀Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ ⲡ̀Ϣⲏⲣⲓ ⲛⲉⲙ ⲡⲓⲠ̀ⲉⲛⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ⲭⲉⲣⲉ ϯⲉ̀ⲕⲕⲗⲏⲥⲓⲁ ⲡ̀ⲏⲓ ⲛ̀ⲧⲉ ⲛⲓⲁ̀ⲅⲅⲉⲗⲟⲥ\n\n+ Ⲭⲉⲣⲉ ϯⲠⲁⲣⲑⲉⲛⲟⲥ ⲉ̀ⲧⲁⲥⲙⲉⲥ ⲡⲉⲛⲤⲱⲧⲏⲣ ⲭⲉⲣⲉ Ⲅⲁⲃⲣⲓⲏⲗ ⲉ̀ⲧⲁϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛⲁⲥ.\n\nⲬⲉⲣⲉ Ⲙⲓⲭⲁⲏⲗ ⲡⲓⲁ̀ⲣⲭⲏⲁ̀ⲅⲅⲉⲗⲟⲥ ⲭⲉⲣⲉ ⲡⲓϫⲟⲩⲧ ϥ̀ⲧⲟⲟⲩ ⲙ̀ⲡ̀ⲣⲉⲥⲃⲩⲧⲉⲣⲟⲥ.\n\n+ Ⲭⲉⲣⲉ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ ⲭⲉⲣⲉ ⲛⲓⲤⲉⲣⲁⲫⲓⲙ ⲭⲉⲣⲉ ⲛⲓⲧⲁⲅⲙⲁ ⲧⲏⲣⲟⲩ ⲛ̀ⲉ̀ⲡⲟⲩⲣⲁⲛⲓⲟⲛ.\n\nⲬⲉⲣⲉ Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲓⲛⲓϣϯ ⲙ̀ⲡⲣⲟⲇⲣⲟⲙⲟⲥ ⲭⲉⲣⲉ ⲡⲓⲙⲏⲧ ⲥ̀ⲛⲁⲩ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ.\n\n+ Ⲭⲉⲣⲉ ⲡⲉⲛⲓⲱⲧ Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲉ̀ⲩⲁ̀ⲅⲅⲉⲗⲓⲥⲧⲏⲥ ⲡⲓⲣⲉϥϫⲱⲣ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲓⲓ̀ⲇⲱⲗⲟⲛ.\n\nⲬⲉⲣⲉ Ⲥ̀ⲧⲉⲫⲁⲛⲟⲥ ⲡⲓϣⲟⲣⲡ ⲙ̀ⲙⲁⲣⲧⲩⲣⲟⲥ ⲭⲉⲣⲉ Ⲅⲉⲱ̀ⲣⲅⲓⲟⲥ ⲡⲓⲥⲓⲟⲩ ⲛ̀ⲧⲉ ϩⲁⲛⲁ̀ⲧⲟ̀ⲟⲩⲓ̀.\n\n+ Ⲭⲉⲣⲉ ⲡ̀ⲭⲟⲣⲟⲥ ⲧⲏⲣϥ ⲛ̀ⲧⲉ ⲛⲓⲙⲁⲣⲧⲩⲣⲟⲥ ⲭⲉⲣⲉ Ⲁⲃⲃⲁ Ⲁⲛⲧⲱⲛⲓ ⲛⲉⲙ ⲡⲓϣⲟⲙⲧ Ⲙⲁⲕⲁⲣⲓⲟⲥ.\n\nⲬⲉⲣⲉ ⲡ̀ⲭⲟⲣⲟⲥ ⲧⲏⲣϥ ⲛ̀ⲧⲉ ⲛⲓⲥ̀ⲧⲁⲩⲣⲟⲫⲟⲣⲟⲥ ⲭⲉⲣⲉ ⲛⲏⲉ̅ⲑ̅ⲩ̅ ⲧⲏⲣⲟⲩ ⲉ̀ⲧⲁϥⲣⲁⲛⲁϥ ⲙ̀Ⲡ⳪.\n\n+ Ϩⲓⲧⲉⲛ ⲛⲟⲩⲉ̀ⲩⲭⲏ Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲞⲩⲣⲟ ⲁ̀ⲣⲓ ⲟ̀ⲩⲛⲁⲓ ⲛⲉⲙⲁⲛ ϧⲉⲛ ⲧⲉⲕⲙⲉⲧⲟ̀ⲩⲣⲟ.\n\nⲠⲓϫⲓⲛⲙⲓⲥⲓ ⲙ̀ⲡⲁⲣⲑⲉⲛⲓⲕⲟⲛ ⲟⲩⲟϩ ⲛⲓⲛⲁⲕϩⲓ ⲙ̀ⲡ̀ⲛⲉⲩⲙⲁⲧⲓⲕⲟⲛ ⲟⲩϣ̀ⲫⲏⲣⲓ ⲙ̀ⲡⲁⲣⲁⲇⲟⲝⲟⲛ ⲕⲁⲧⲁ ⲛⲓⲥ̀ⲙⲏ ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ.\n\n+ Ⲭⲉⲣⲉ Ⲃⲏⲑⲗⲉⲉⲙ ⲧ̀ⲡⲟⲗⲓⲥ ⲛ̀ⲛⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ ⲑⲏⲉ̀ⲧⲁⲩⲙⲉⲥ Ⲡⲭ̅ⲥ̅ ⲛ̀ϧⲏⲧⲥ ⲡⲓⲙⲁϩⲥ̀ⲛⲁⲩ ⲛ̀Ⲁⲇⲁⲙ." },
            { language: 'englishCoptic', audio: "alhan-nativity-tenouosht.mp3", text: "Tenou-ōsht em-Efiōt nem ep-Shēri nem pi-Epenuma ethouab shere ti-ekklēsia epēi ente ni-aggelos\n\n+ Shere ti-Parthenos etasmes pen-Sōtēr shere Gabriēl etafhishennoufi nas.\n\nShere Mikhaēl pi-arkhē-aggelos shere pijout eftoou emepresvuteros.\n\n+ Shere ni-Kherouvim shere ni-Serafim shere nitagma tērou enepouranion.\n\nShere Iōannēs pinishti emprodromos shere pimēt esnau enapostolos.\n\n+ Shere peniōt Markos pi-eu-aggelistēs pirefjōr evol ente ni-idōlon.\n\nShere Estefanos pishorp emmarturos shere Ge-ōrgios pisiou ente hanatoou-i.\n\n+ Shere epkhoros tērf ente nimarturos shere Abba Antōni nem pishomt Makarios.\n\nShere epkhoros tērf ente ni-estauroforos shere nēethouab tērou etafranaf em-Ptshois.\n\n+ Hiten nou-eukhē Pi-ekhristos pen-Ouro ari ounai neman khen tekmetouro.\n\nPijinmisi emparthenikon ouoh ninakhi emepneumatikon ou-eshfēri emparadokson kata ni-esmē emeprofētikon.\n\n+ Shere Vēthleem etpolis enni-eprofētēs thē-etaumes Pi-ekhristos enkhēts pimahesnau en-Adam." },
            { language: 'english', text: "We worship the Father and the Son, and the Holy Spirit, hail to the Church, the house of the angels.\n\n+ Hail to the Virgin, who gave birth to our Savior, hail to Gabriel, who announced to her the good news.\n\nHail to Michael, the archangel, hail to the twenty four, presbyters.\n\n+ Hail to the Cherubim, hail to the Seraphim, hail to all the hosts, of the heavens.\n\nHail to John, the great forerunner, hail to the, twelve apostles.\n\n+ Hail to our father Mark, the Evangelist, the destroyer, of the idols.\n\nHail to Stephen, the first martyr, hail to George, the morning star.\n\n+ Hail to the whole choir, of the martyrs, hail to Abba Antony, and the three Macarii.\n\nHail to the whole choir, of the cross-bearers, hail to all the saints, who have pleased the Lord.\n\n+ Through their prayers, O Christ our King, have mercy upon us, in Your kingdom.\n\nThe virginal birth, and the spiritual emissions, are an amazing wonder, according to the prophets.\n\n+ Hail to Bethlehem, the city of the prophets, where Christ was born, the second Adam." },
          ],
        },
        {
          id: "nativity-matins-7-tunes-1",
          title: "ⲠⲓⲞ̀ⲩⲱ̀ⲓⲛⲓ (7 Tunes (1))",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-piouoiny1.mp3", text: "ⲠⲓⲞ̀ⲩⲱ̀ⲓⲛⲓ ⲛ̀ⲧⲁⲫ̀ⲙⲏⲓ ⲫⲏⲉ̀ⲧⲉ̀ⲣⲟ̀ⲩⲱ̀ⲓⲛⲓ ⲉ̀ⲣⲱⲙⲓ ⲛⲓⲃⲉⲛ ⲉⲑⲛⲏⲟⲩ ⲉ̀ⲡⲓⲕⲟⲥⲙⲟⲥ.\n\n+ Ⲁⲕⲓ̀ ⲉ̀ⲡⲓⲕⲟⲥⲙⲟⲥ ϩⲓⲧⲉⲛ ⲧⲉⲕⲙⲉⲧⲙⲁⲓⲣⲱⲙⲓ ⲁϯⲕ̀ⲧⲏⲥⲓⲥ ⲧⲏⲣⲥ ⲑⲉⲗⲏⲗ ϧⲁ ⲡⲉⲕϫⲓⲛⲓ̀.\n\nⲀⲕⲥⲱϯ ⲛ̀Ⲁⲇⲁⲙ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ϯⲁ̀ⲡⲁⲧⲏ ⲁⲕⲉ̀ⲣ Ⲉⲩⲁ ⲛ̀ⲣⲉⲙϩⲉ ϧⲉⲛ ⲛⲓⲛⲁⲕϩⲓ ⲛ̀ⲧⲉ ⲫ̀ⲙⲟⲩ.\n\n+ Ⲁⲕϯ ⲛⲁⲛ ⲙ̀ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲛ̀ⲧⲉ ϯⲙⲉⲧϣⲏⲣⲓ ⲉⲛϩⲱⲥ ⲉⲛⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲕ ⲛⲉⲙ ⲛⲉⲕⲁ̀ⲅⲅⲉⲗⲟⲥ." },
            { language: 'englishCoptic', audio: "alhan-nativity-piouoiny1.mp3", text: "Pi-Ou-ōini enta-efmēi fē-eterou-ōini erōmi niven ethnēou epikosmos.\n\n+ Aki epikosmos hiten tekmetmairōmi ati-ektēsis tērs thelēl kha pekjini.\n\nAksōti en-Adam evol khen ti-apatē aker Eua enremhe khen ninakhi ente efmou.\n\n+ Akti nan empi-Epneuma ente timetshēri enhōs enesmou erok nem nekaggelos." },
            { language: 'english', text: "O true Light, that gives light, to every man, that comes into the world.\n\n+ You came into the world, through Your love for man, and all the creation, rejoiced at Your coming.\n\nYou have saved Adam, from seduction, and delivered Eve, from the pangs of death.\n\n+ You gave unto us, the Spirit of sonship, we praise and bless You, with Your angels." },
          ],
        },
        {
          id: "nativity-matins-7-tunes-2",
          title: "Ϧⲉⲛ ⲡ̀ϫⲓⲛ (7 Tunes (2))",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-piouoiny2.mp3", text: "Ϧⲉⲛ ⲡ̀ϫⲓⲛⲑ̀ⲣⲉϥⲓ̀ ⲛⲁⲛ ⲉ̀ϧⲟⲩⲛ ⲛ̀ϫⲉ ⲫ̀ⲛⲁⲩ ⲛ̀ϣⲱⲣⲡ ⲱ̀ Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲚⲟⲩϯ ⲡⲓⲞ̀ⲩⲱ̀ⲓⲛⲓ ⲛ̀ⲧⲁⲫ̀ⲙⲏⲓ.\n\n+ Ⲙⲁⲣⲟⲩϣⲁⲓ ⲛ̀ϧⲏⲧⲉⲛ ⲛ̀ϫⲉ ⲛⲓⲗⲟⲅⲓⲥⲙⲟⲥ ⲛ̀ⲧⲉ ⲡⲓⲟ̀ⲩⲱ̀ⲓⲛⲓ ⲟⲩⲟϩ ⲙ̀ⲡⲉⲛⲑ̀ⲣⲉϥϩⲟⲃⲥⲧⲉⲛ ⲛ̀ϫⲉ ⲡ̀ⲭⲁⲕⲓ ⲛ̀ⲛⲓⲡⲁⲑⲟⲥ.\n\nϨⲓⲛⲁ ⲛ̀ⲧⲉⲛϩⲱⲥ ⲉ̀ⲣⲟⲕ ⲛ̀ⲛⲟⲏ̀ⲧⲟⲥ ⲛⲉⲙ Ⲇⲁⲩⲓⲇ ⲉⲛⲱϣ ⲟⲩⲃⲏⲕ ⲟⲩⲟϩ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ.\n\n+ Ϫⲉ ⲁⲩⲉ̀ⲣϣⲟⲣⲡ ⲙ̀ⲫⲟϩ ⲛ̀ϫⲉ ⲛⲁⲃⲁⲗ ⲙ̀ⲫ̀ⲛⲁⲩ ⲛ̀ϣⲱⲣⲡ ⲉ̀ⲉ̀ⲣⲙⲉⲗⲉⲧⲁⲛ ϧⲉⲛ ⲛⲉⲕⲥⲁϫⲓ ⲧⲏⲣⲟⲩ." },
            { language: 'englishCoptic', audio: "alhan-nativity-piouoiny2.mp3", text: "Khen epjinethrefi nan ekhoun enje efnau enshōrp ō Pi-ekhristos pen-Nouti pi-Ou-ōini enta-efmēi.\n\n+ Maroushai enkhēten enje nilogismos ente pi-ou-ōini ouoh empenethrefhobsten enje epkhaki ennipathos.\n\nHina entenhōs erok enno-ētos nem Dauid enōsh ouvēk ouoh enjō emmos.\n\n+ Je au-ershorp emfoh enje naval emefnau enshōrp e-ermeletan khen neksaji tērou." },
            { language: 'english', text: "When the morning hour, comes upon us, O Christ our God, the true Light.\n\n+ Let the thought of light, shine within us, and do not let the darkness, of pain cover us.\n\nThat we may praise You, with understanding, proclaiming and saying, with David.\n\n+ My eyes have reached, the morning watch, that I may meditate, upon all Your words." },
          ],
        },
        {
          id: "nativity-matins-7-tunes-3",
          title: "Ⲥⲱⲧⲉⲙ (7 Tunes (3))",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-piouoiny3.mp3", text: "Ⲥⲱⲧⲉⲙ ⲉ̀ⲧⲉⲛⲥ̀ⲙⲏ ⲕⲁⲧⲁ ⲡⲉⲕⲛⲓϣϯ ⲛ̀ⲛⲁⲓ ⲛⲁϩⲙⲉⲛ Ⲡ⳪ ⲡⲉⲛⲚⲟⲩϯ ⲕⲁⲧⲁ ⲛⲉⲕⲙⲉⲧϣⲉⲛϩⲏⲧ.\n\n+ Ⲫϯ ⲡⲓϥⲁⲓⲣⲱⲟ̀ⲩϣ ⲛ̀ⲣⲉϥⲉ̀ⲣⲡⲉⲑⲛⲁⲛⲉϥ ⲡⲓⲣⲉϥⲉ̀ⲣⲟⲓⲕⲟⲛⲟⲙⲓⲛ ⲛ̀ⲛⲉϥⲥⲱⲧⲡ ⲛ̀ⲕⲁⲗⲱⲥ.\n\nⲠⲓⲣⲉϥⲉ̀ⲣϩⲉⲙⲓ ⲉⲧϫⲟⲣ ⲛ̀ⲛⲏⲉ̀ⲧⲁⲩⲫⲱⲧ ϩⲁⲣⲟϥ ⲫ̀ⲣⲉϥϭⲓϣϣⲱⲟ̀ⲩ ⲛ̀ⲧⲉ ⲟⲩⲟ̀ⲛ ⲛⲓⲃⲉⲛ ⲛⲟϩⲉⲙ ⲛ̀ⲧⲟⲩⲟ̀ⲩϫⲁⲓ.\n\n+ Ϧⲉⲛ ⲧⲉⲕⲙⲉⲧⲭ̀ⲣⲏⲥⲧⲟⲥ ⲁⲕⲥⲟⲃϯ ⲛⲁⲛ ⲙ̀ⲡⲓⲉ̀ϫⲱⲣϩ ⲁⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲁⲓⲉ̀ϩⲟⲟ̀ⲩ ⲉ̀ⲛⲟⲓ ⲛ̀ⲁ̀ⲑⲛⲟⲃⲓ." },
            { language: 'englishCoptic', audio: "alhan-nativity-piouoiny3.mp3", text: "Sōtem etenesmē kata peknishti ennai nahmen Ptshois pen-Nouti kata nekmetshenhēt.\n\n+ Efnouti pifairō-oush enreferpethnanef pireferoikonomin ennefsōtp enkalōs.\n\nPireferhemi etjor ennē-etaufōt harof efreftshishshō-ou ente ou-on niven nohem entou-oujai.\n\n+ Khen tekmetekhrēstos aksobti nan empi-ejōrh ari-ehmot nan empai-eho-ou enoi enathnovi." },
            { language: 'english', text: "Hear our voices, according to Your great mercy, save us O Lord our God, according to Your compassion.\n\n+ O caring God, the Maker of all good things, who governs well, with His chosen ones.\n\nThe strong Governor for those, who take refuge in Him, who longs for the salvation, and deliverance of everyone.\n\n+ Through Your goodness, You provided us the night, grant us to pass, this day without sin." },
          ],
        },
        {
          id: "nativity-matins-7-tunes-4",
          title: "Ⲉⲑⲣⲉⲛⲉ̀ⲣ (7 Tunes (4))",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-piouoiny4.mp3", text: "Ⲉⲑⲣⲉⲛⲉ̀ⲣⲡ̀ⲉ̀ⲙⲡ̀ϣⲁ ⲉ̀ϥⲁⲓ ⲛ̀ⲛⲉⲛϫⲓϫ ⲉ̀ⲡ̀ϣⲱⲓ ϩⲁⲣⲟⲕ ⲙ̀ⲡⲉⲕⲙ̀ⲑⲟ ⲭⲱⲣⲓⲥ ϫⲱⲛⲧ ⲛⲉⲙ ⲙⲟⲕⲙⲉⲕ ⲉϥϩⲱⲟ̀ⲩ.\n\n+ Ϧⲉⲛ ⲧⲁⲓ ϩⲁⲛⲁ̀ⲧⲟⲟⲩⲓ̀ ⲥⲟⲩⲧⲱⲛ ⲛⲉⲛⲙⲱⲓⲧ ⲉ̀ϧⲟⲩⲛ ⲛⲉⲙ ⲛⲉⲛⲙⲱⲓⲧ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲡ̀ⲟ̀ⲩⲛⲟϥ ⲛ̀ⲧⲉ ⲧⲉⲕⲥ̀ⲕⲉⲡⲏ.\n\nⲈⲑⲣⲉⲛϫⲱ ⲛ̀ⲧⲉⲕⲙⲉⲑⲙⲏⲓ ⲛ̀ⲉ̀ϩⲟⲟ̀ⲩ ⲛⲓⲃⲉⲛ ⲛ̀ⲧⲉⲛϩⲱⲥ ⲉ̀ⲧⲉⲕϫⲟⲙ ⲛⲉⲙ Ⲇⲁⲩⲓⲇ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ.\n\n+ Ϫⲉ ϧⲉⲛ ⲧⲉⲕϩⲓⲣⲏⲛⲏ Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲤⲱⲧⲏⲣ ⲁ̀ⲛⲉⲛⲕⲟⲧ ⲁⲛⲧⲱⲟ̀ⲩⲛ ϫⲉ ⲁ̀ⲛⲉⲣϩⲉⲗⲡⲓⲥ ⲉ̀ⲣⲟⲕ." },
            { language: 'englishCoptic', audio: "alhan-nativity-piouoiny4.mp3", text: "Ethrenerepemepsha efai ennenjij e-epshōi harok empekemtho khōris jōnt nem mokmek efhō-ou.\n\n+ Khen tai hanatoou-i soutōn nenmōit ekhoun nem nenmōit evol khen epounof ente tekeskepē.\n\nEthrenjō entekmethmēi eneho-ou niven entenhōs etekjom nem Dauid pi-eprofētēs.\n\n+ Je khen tekhirēnē Pi-ekhristos pen-Sōtēr anenkot antō-oun je anerhelpis erok." },
            { language: 'english', text: "That we may be worthy, to lift up our hands, before You without anger, or evil thoughts.\n\n+ At this dawn, make straight our coming in, and our going out, in the joy of Your protection.\n\nThat we may proclaim, Your righteousness daily, and praise Your power, with David the prophet.\n\n+ Saying \"In Your peace, O Christ our Savior, we slept and arose, for we have hoped in You.\"" },
          ],
        },
        {
          id: "nativity-matins-7-tunes-5",
          title: "Ϩⲏⲡⲡⲉ (7 Tunes (5))",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-piouoiny5.mp3", text: "Ϩⲏⲡⲡⲉ ⲟ̀ⲩⲡⲉⲑⲛⲁⲛⲉϥ ⲓⲉ ⲟ̀ⲩⲡⲉⲧϩⲟⲗϫ ⲉ̀ⲃⲏⲗ ⲉ̀ⲡ̀ϯⲙⲁϯ ⲛ̀ϩⲁⲛⲥ̀ⲛⲏⲟⲩ ⲉⲩϣⲟⲡ ϩⲓ ⲟ̀ⲩⲙⲁ.\n\n+ Ⲉⲩⲉ̀ⲣⲥⲩⲙⲫⲱⲛⲓⲛ ϧⲉⲛ ⲟⲩⲁ̀ⲅⲁⲡⲏ ⲙ̀ⲙⲏⲓ ⲛ̀ⲉ̀ⲩⲁ̀ⲅⲅⲉⲗⲓⲕⲏ ⲕⲁⲧⲁ ⲛⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ.\n\nⲘ̀ⲫ̀ⲣⲏϯ ⲙ̀ⲡⲓⲥⲟϫⲉⲛ ⲉ̀ϯⲁ̀ⲫⲉ ⲙ̀Ⲡⲭ̅ⲥ̅ ⲉϥⲛⲏⲟⲩ ⲉ̀ϫⲉⲛ ϯⲙⲟⲣⲧ ϣⲁⲉ̀ϧ̀ⲣⲏⲓ ⲉ̀ⲛⲓϭⲁⲗⲁⲩϫ.\n\n+ Ⲉϥⲑⲱϩⲥ ⲙ̀ⲙⲏⲛⲓ ⲛⲓⲃⲉⲛ ⲛⲓϧⲉⲗⲗⲟⲓ ⲛⲉⲙ ⲛⲓⲁ̀ⲗⲱⲟⲩⲓ̀ ⲛⲉⲙ ⲛⲓϧⲉⲗϣⲓⲣⲓ ⲛⲉⲙ ⲛⲓⲇⲓⲁⲕⲟⲛⲓⲥⲧⲏⲥ." },
            { language: 'englishCoptic', audio: "alhan-nativity-piouoiny5.mp3", text: "Hēppe oupethnanef ie oupetholj evēl e-eptimati enhanesnēou eushop hi ouma.\n\n+ Eu-ersumfōnin khen ou-agapē emmēi eneu-aggelikē kata ni-apostolos.\n\nEmefrēti empisojen eti-afe em-Pi-ekhristos efnēou ejen timort sha-e-ekhrēi enitshalauj.\n\n+ Efthōhs emmēni niven nikhelloi nem ni-alōou-i nem nikhelshiri nem nidiakonistēs." },
            { language: 'english', text: "\"Behold how beneficent, and how pleasant, it is for brethren, to dwell together in unity.\"\n\n+ United, in the true, evangelic love, like the apostles.\n\nIt is like the fragrant oil, on the head of Christ, running down the beard, down to the feet.\n\n+ That anoints every day, the elders, the children and young men, and the deacons." },
          ],
        },
        {
          id: "nativity-matins-7-tunes-6",
          title: "Ⲛⲁⲓ ⲉⲧⲁϥϩⲟⲧⲡⲟⲩ (7 Tunes (6))",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-piouoiny6.mp3", text: "Ⲛⲁⲓ ⲉⲧⲁϥϩⲟⲧⲡⲟⲩ ⲉⲩⲥⲟⲡ ⲛ̀ϫⲉ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲟⲩⲕⲩⲑⲁⲣⲁ ⲉⲩⲥ̀ⲙⲟⲩ ⲉ̀Ⲫϯ ⲛ̀ⲥⲏⲟⲩ ⲛⲓⲃⲉⲛ.\n\n+ Ϧⲉⲛ ϩⲁⲛⲯ̀ⲁⲗⲙⲟⲥ ⲛⲉⲙ ϩⲁⲛϩⲱⲥ ⲛⲉⲙ ϩⲁⲛϩⲱⲇⲏ ⲙ̀ⲡ̅ⲛ̅ⲁ̅ⲧⲓⲕⲟⲛ ⲙ̀ⲡⲓⲉ̀ϩⲟⲟⲩ ⲛⲉⲙ ⲡⲓⲉ̀ϫⲱⲣϩ ϧⲉⲛ ⲟ̀ⲩϩⲏⲧ ⲛ̀ⲁ̀ⲧⲭⲁⲣⲱϥ." },
            { language: 'englishCoptic', audio: "alhan-nativity-piouoiny6.mp3", text: "Nai etafhotpou eusop enje pi-Epneuma ethouab emefrēti enoukuthara eu-esmou e-Efnouti ensēou niven.\n\n+ Khen hanepsalmos nem hanhōs nem hanhōdē emepneumatikon empi-ehoou nem pi-ejōrh khen ouhēt enatkharōf." },
            { language: 'english', text: "Those whom the Holy Spirit, has attuned together, as a stringed instrument, always blessing God.\n\n+ By psalms and hymns, and spiritual songs, by day and by night, with an incessant heart." },
          ],
        },
        {
          id: "nativity-matins-7-tunes-7",
          title: "Ⲛⲉⲕⲛⲁⲓ (7 Tunes (7))",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-neknai.mp3", text: "Ⲛⲉⲕⲛⲁⲓ ⲱ̀ ⲡⲁⲚⲟⲩϯ ϩⲁⲛⲁⲧϭⲓⲏ̀ⲡⲓ ⲙ̀ⲙⲱⲟⲩ ⲥⲉⲟ̀ϣ ⲉ̀ⲙⲁϣⲱ ⲛ̀ϫⲉ ⲛⲉⲕⲙⲉⲧϣⲉⲛϩⲏⲧ.\n\n+ Ⲛⲓⲧⲉⲗⲧⲓⲗⲓ ⲙ̀ⲙⲟⲩⲛϩⲱⲟ̀ⲩ ⲥⲉⲏⲡ ⲛ̀ⲧⲟⲧⲕ ⲧⲏⲣⲟⲩ ⲡⲓⲕⲉϣⲱ ⲛ̀ⲧⲉ ⲫ̀ⲓⲟⲙ ⲥⲉⲭⲏ ⲛⲁϩⲣⲉⲛ ⲛⲉⲕⲃⲁⲗ.\n\nⲒⲉ ⲁⲩⲏⲣ ⲙⲁⲗⲗⲟⲛ ⲛⲓⲛⲟⲃⲓ ⲛ̀ⲧⲉ ⲧⲁⲯ̀ⲩⲭⲏ ⲛⲁⲓ ⲉⲑⲟ̀ⲩⲱ̀ⲛϩ ⲉ̀ⲃⲟⲗ ⲙ̀ⲡⲉⲕⲙ̀ⲑⲟ ⲡⲁ⳪.\n\n+ Ⲛⲓⲛⲟⲃⲓ ⲉⲧⲁⲓⲁ̀ⲧⲟⲩ ⲡⲁ⳪ ⲛ̀ⲛⲉⲕⲉ̀ⲣⲡⲟⲩⲙⲉⲩⲓ̀ ⲟⲩⲇⲉ ⲙ̀ⲡⲉⲣϯϩ̀ⲑⲏⲕ ⲉ̀ⲛⲁⲁ̀ⲛⲟⲙⲓⲁ.\n\nϪⲉ ⲡⲓⲧⲉⲗⲱⲛⲏⲥ ⲁⲕⲥⲟⲧⲡϥ ϯⲡⲟⲣⲛⲏ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲥ ⲡⲓⲥⲟⲛⲓ ⲉⲧⲥⲁⲟⲩⲓ̀ⲛⲁⲙ ⲡⲁ⳪ ⲁⲕⲉⲣⲡⲉϥⲙⲉⲩⲓ̀.\n\n+ Ⲁⲛⲟⲕ ϩⲱ ⲡⲁ⳪ ϧⲁ ⲡⲓⲣⲉ̀ϥⲉⲣⲛⲟⲃⲓ ⲙⲁⲧ̀ⲥⲁⲃⲟⲓ ⲛ̀ⲧⲁⲓ̀ⲣⲓ ⲛ̀ⲟⲩⲙⲉⲧⲁⲛⲟⲓⲁ.\n\nϪⲉ ⲭ̀ⲟⲩⲱ̀ϣ ⲙ̀ⲫ̀ⲙⲟⲩ ⲁⲛ ⲙ̀ⲡⲓⲣⲉϥⲉ̀ⲣⲛⲟⲃⲓ ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲧⲉϥⲧⲁⲥⲑⲟϥ ⲛ̀ⲧⲉⲥⲱ̀ⲛϧ ⲛ̀ϫⲉ ⲧⲉϥⲯ̀ⲩⲭⲏ.\n\n+ Ⲙⲁⲧⲁⲥⲑⲟⲛ Ⲫϯ ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲡⲉⲕⲟ̀ⲩϫⲁⲓ ⲁ̀ⲣⲓⲟ̀ⲩⲓ̀ ⲛⲉⲙⲁⲛ ⲕⲁⲧⲁ ⲧⲉⲕⲙⲉⲧⲁ̀ⲅⲁⲑⲟⲥ.\n\nϪⲉ ⲛ̀ⲑⲟⲕ ⲟⲩⲁ̀ⲅⲁⲑⲟⲥ ⲟⲩⲟϩ ⲛ̀ⲛⲁⲏ̀ⲧ ⲙⲁⲣⲟⲩⲧⲁϩⲟⲛ ⲛ̀ⲭⲱⲗⲉⲙ ⲛ̀ϫⲉ ⲛⲉⲕⲙⲉⲧϣⲉⲛϩⲏⲧ.\n\n+ Ϣⲉⲛϩⲏⲧ ϧⲁⲣⲟⲛ ⲧⲏⲣⲉⲛ Ⲡ⳪ Ⲫϯ ⲡⲉⲛⲤⲱⲧⲏⲣ ⲟⲩⲟϩ ⲛⲁⲓ ⲛⲁⲛ ⲕⲁⲧⲁ ⲡⲉⲕⲛⲓϣϯ ⲛ̀ⲛⲁⲓ.\n\nⲚⲁⲓ ⲕ̀ⲓ̀ⲣⲓ ⲙ̀ⲡⲟⲩⲙⲉⲩⲓ̀ ⲱ̀ ⲡⲉⲛⲚⲏⲃ Ⲡⲭ̅ⲥ̅ ⲉⲕⲉ̀ϣⲱⲡⲓ ϧⲉⲛ ⲧⲉⲛⲙⲏϯ ⲉⲕⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲕϫⲱ ⲙ̀ⲙⲟⲥ.\n\n+ Ϫⲉ ⲧⲁϩⲓⲣⲏⲛⲏ ⲁ̀ⲛⲟⲕ ϯϯ ⲙ̀ⲙⲟⲥ ⲛⲱⲧⲉⲛ ⲧ̀ϩⲓⲣⲏⲛⲏ ⲙ̀Ⲡⲁⲓⲱⲧ ϯⲭⲱ ⲙ̀ⲙⲟⲥ ⲛⲉⲙⲱⲧⲉⲛ.\n\nⲠ̀Ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ϯϩⲓⲣⲏⲛⲏ ⲙⲟⲓ ⲛⲁⲛ ⲛ̀ⲧⲉⲕϩⲓⲣⲏⲛⲏ ⲥⲉⲙⲛⲓ ⲛⲁⲛ ⲛ̀ⲧⲉⲕϩⲓⲣⲏⲛⲏ ⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\n+ Ϫⲱⲣ ⲉ̀ⲃⲟⲗ ⲛ̀ⲛⲓϫⲁϫⲓ ⲛ̀ⲧⲉ ϯⲉⲕⲕⲗⲏⲥⲓⲁ ⲁ̀ⲣⲓⲥⲟⲃⲧ ⲉ̀ⲣⲟⲥ ⲛ̀ⲛⲉⲥⲕⲓⲙ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nⲈⲙⲙⲁⲛⲟⲩⲏⲗ ⲡⲉⲛⲚⲟⲩϯ ϧⲉⲛ ⲧⲉⲛⲙⲏϯ ϯⲛⲟⲩ ϧⲉⲛ ⲡ̀ⲱ̀ⲟ̀ⲩ ⲛ̀ⲧⲉ Ⲡⲉϥⲓⲱⲧ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅.\n\n+ Ⲛ̀ⲧⲉϥⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲛ ⲧⲏⲣⲉⲛ ⲛ̀ⲧⲉϥⲧⲟⲩⲃⲟ ⲛ̀ⲛⲉⲛϩⲏⲧ ⲛ̀ⲧⲉϥⲧⲁⲗϭⲟ ⲛ̀ⲛⲓϣⲱⲛⲓ ⲛ̀ⲧⲉ ⲛⲉⲛⲯ̀ⲩⲭⲏ ⲛⲉⲙ ⲛⲉⲛⲥⲱⲙⲁ.\n\nⲦⲉⲛⲟ̀ⲩⲱ̀ϣⲧ ⲙ̀ⲙⲟⲕ ⲱ̀ Ⲡⲭ̅ⲥ̅ ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ϫⲉ ⲁⲩⲙⲁⲥⲕ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ. (Ⲛⲁⲓ ⲛⲁⲛ)" },
            { language: 'englishCoptic', audio: "alhan-nativity-neknai.mp3", text: "Neknai ō pa-Nouti hanattshi-ēpi emmōou se-osh emashō enje nekmetshenhēt.\n\n+ Niteltili emmounhō-ou seēp entotk tērou pikeshō ente efiom sekhē nahren nekval.\n\nIe auēr mallon ninovi ente ta-epsukhē nai ethou-ōnh evol empekemtho patshois.\n\n+ Ninovi etai-atou patshois ennekerpoumeu-i oude emperti-ehthēk ena-anomia.\n\nJe pitelōnēs aksotpf tipornē aksōti emmos pisoni etsaou-inam patshois akerpefmeu-i.\n\n+ Anok hō patshois kha pirefernovi ma-etsavoi enta-iri enoumetanoia.\n\nJe ekhou-ōsh emefmou an empirefernovi emefrēti enteftasthof entesōnkh enje tefepsukhē.\n\n+ Matasthon Efnouti ekhoun epekoujai ari-ou-i neman kata tekmetagathos.\n\nJe enthok ou-agathos ouoh enna-ēt maroutahon enkhōlem enje nekmetshenhēt.\n\n+ Shenhēt kharon tēren Ptshois Efnouti pen-Sōtēr ouoh nai nan kata peknishti ennai.\n\nNai ekiri empoumeu-i ō pen-Nēb Pi-ekhristos ekeshōpi khen tenmēti ekōsh evol ekjō emmos.\n\n+ Je tahirēnē anok titi emmos nōten ethirēnē em-Paiōt tikhō emmos nemōten.\n\nEp-Ouro ente tihirēnē moi nan entekhirēnē semni nan entekhirēnē kha nennovi nan evol.\n\n+ Jōr evol ennijaji ente tiekklēsia arisobt eros enneskim sha eneh.\n\nEmmanouēl pen-Nouti khen tenmēti tinou khen epō-ou ente Pefiōt nem pi-Epneuma ethouab.\n\n+ Entefesmou eron tēren enteftouvo ennenhēt enteftaltsho ennishōni ente nenepsukhē nem nensōma.\n\nTenou-ōsht emmok ō Pi-ekhristos nem Pekiōt enagathos nem pi-Epneuma ethouab je aumask aksōti emmon. (Nai nan)" },
            { language: 'english', text: "Your mercies O my God, are countless, and exceedingly plenteous, are Your compassion.\n\n+ All the rain drops, are counted by You, and the sand of the sea, is before Your eyes.\n\nHow much more are, the sins of my soul, manifest before You, O my God.\n\n+ The sins that I have committed, do not remember my Lord, and do not count, my iniquities.\n\nFor You have chosen the publican, and the adulteress You have saved, and the right-hand thief, my Lord You have remembered.\n\n+ And me too, the sinner, teach me O my Master, to offer repentance.\n\nFor You do not desire, the death of a sinner, but rather that he returns, and that his soul may live.\n\n+ Restore us O God, to Your salvation, and deal with us, according to Your goodness.\n\nFor You are good, and merciful, let Your compassion, speedily come to us.\n\n+ Have compassion upon us all, O Lord God our Savior, and have mercy upon us, according to Your great mercy.\n\nRemember those, O Christ our Master, be among us, and proclaim and say.\n\n+ My peace I give to you, the peace, of my Father, I leave with you.\n\nO King of peace, grant us Your peace, render unto us Your peace, and forgive us our sins.\n\n+ Disperse the enemies, of the Church, and fortify her, that she may not be shaken forever.\n\nEmmanuel our God, is now in our midst, with the glory of His Father, and the Holy Spirit.\n\n+ May He bless us all, and purify our hearts, and heal the sicknesses, of our souls and bodies,\n\nWe worship You O Christ, with Your good Father, and the Holy Spirit, for You were born and saved us." },
          ],
        },
        {
          id: "nativity-matins-first-doxology",
          title: "Ⲧⲟⲧⲉ ⲣⲱⲛ (First Doxology)",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-nat-toteron.mp3", text: "Ⲧⲟⲧⲉ ⲣⲱⲛ ⲁϥⲙⲟϩ ⲛ̀ⲣⲁϣⲓ ⲟⲩⲟϩ ⲡⲉⲛⲗⲁⲥ ϧⲉⲛ ⲟⲩⲑⲉⲗⲏⲗ ϫⲉ ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲁⲩⲙⲁⲥϥ ϧⲉⲛ Ⲃⲏⲑⲗⲉⲉⲙ.\n\n+ Ⲭⲉⲣⲉ ϯⲃⲁⲕⲓ ⲙ̀ⲡⲉⲛⲚⲟⲩϯ ⲧ̀ⲡⲟⲗⲓⲥ ⲛ̀ⲧⲉ ⲛⲏⲉ̀ⲧⲟⲛϧ ⲫ̀ⲙⲁⲛ̀-ϣⲱⲡⲓ ⲛ̀ⲛⲓⲇⲓⲕⲉⲟⲥ ⲉ̀ⲧⲉ ⲑⲁⲓ ⲧⲉ Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ.\n\nⲬⲉⲣⲉ ⲛⲉ ⲱ̀ Ⲃⲏⲑⲗⲉⲉⲙ ⲧ̀ⲡⲟⲗⲓⲥ ⲛ̀ⲛⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ ⲛⲏⲉ̀ⲧⲁⲩⲉ̀ⲣⲡ̀ⲣⲟⲫⲏⲧⲉⲩⲓⲛ ⲉⲑⲃⲉ ⲡ̀ϫⲓⲛⲙⲓⲥⲓ ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ.\n\n+ ⲀⲡⲓⲞ̀ⲩⲱⲓⲛⲓ ⲛ̀ⲧⲁⲫ̀ⲙⲏⲓ ⲁϥϣⲁⲓ ⲛⲁⲛ ϩⲱⲛ ⲙ̀ⲫⲟⲟ̀ⲩ ϧⲉⲛ ϯⲠⲁⲣⲑⲉⲛⲟⲥ Ⲙⲁⲣⲓⲁⲙ ϯϣⲉⲗⲉⲧ ⲛ̀ⲕⲁⲑⲁⲣⲟⲥ.\n\nⲘⲁⲣⲓⲁ ⲁⲥⲙⲓⲥⲓ ⲙ̀ⲡⲉⲛⲤⲱⲧⲏⲣ ⲡⲓⲙⲁⲓⲣⲱⲙⲓ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ϧⲉⲛ Ⲃⲏⲑⲗⲉⲉⲙ ⲛ̀ⲧⲉ ϯⲒⲟⲩⲇⲉⲁ̀ ⲕⲁⲧⲁ ⲛⲓⲥ̀ⲙⲏ ⲛ̀ⲧⲉ ⲛⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ.\n\n+ Ⲏ̀ⲥⲁⲏ̀ⲁⲥ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ ⲱ̀ϣ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲟⲩⲥ̀ⲙⲏ ⲛ̀ⲑⲉⲗⲏⲗ ϫⲉ ⲉⲥⲉ̀ⲙⲓⲥⲓ ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ ⲡⲉⲛⲤⲱⲧⲏⲣ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ.\n\nⲒⲥ ⲛⲓⲫⲏⲟⲩⲓ̀ ⲉⲩⲉ̀ⲟ̀ⲩⲛⲟϥ ⲛⲉⲙ ⲡ̀ⲕⲁϩⲓ ⲑⲉⲗⲏⲗ ϫⲉ ⲁⲥⲙⲓⲥⲓ ⲛⲁⲛ ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ ⲁ̀ⲛⲟⲛ ϧⲁ ⲛⲓⲭ̀ⲣⲓⲥⲧⲓⲁⲛⲟⲥ.\n\n+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛⲟⲓ ⲛ̀ⲣⲁⲙⲁⲟ̀ ϧⲉⲛ ⲛⲓⲁ̀ⲅⲁⲑⲟⲛ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲟⲩⲛⲁϩϯ ⲧⲉⲛⲉ̀ⲣⲯⲁⲗⲓⲛ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ ϫⲉ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ϣⲏⲣⲓ ⲙ̀Ⲫϯ ⲁⲩⲙⲁⲥϥ ϧⲉⲛ Ⲃⲏⲑⲗⲉⲉⲙ.\n\n+ Ⲫⲁⲓ ⲉ̀ⲣⲉ ⲡⲓⲱ̀ⲟ̀ⲩ ⲉⲣⲡ̀ⲣⲉⲡⲓ ⲛⲁϥ ⲛⲉⲙ Ⲡⲉϥⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ." },
            { language: 'englishCoptic', audio: "alhan-nativity-nat-toteron.mp3", text: "Tote rōn afmoh enrashi ouoh penlas khen outhelēl je pentshois Iēsous Pi-ekhristos aumasf khen Vēthleem.\n\n+ Shere tivaki empen-Nouti etpolis ente nē-etonkh efma-en-shōpi ennidikeos ete thai te Ierousalēm.\n\nShere ne ō Vēthleem etpolis enni-eprofētēs nē-etau-ereprofēteuin ethve epjinmisi en-Emmanouēl.\n\n+ Api-Ouōini enta-efmēi afshai nan hōn emfo-ou khen ti-Parthenos Mariam tishelet enkatharos.\n\nMaria asmisi empen-Sōtēr pimairōmi enagathos khen Vēthleem ente ti-Ioude-a kata ni-esmē ente ni-eprofētēs.\n\n+ Ēsa-ēas pi-eprofētēs ōsh evol khen ou-esmē enthelēl je esemisi en-Emmanouēl pen-Sōtēr enagathos.\n\nIs nifēou-i eu-e-ounof nem epkahi thelēl je asmisi nan en-Emmanouēl anon kha ni-ekhristianos.\n\n+ Ethve fai tenoi enrama-o khen ni-agathon etjēk evol khen ounahti tenerpsalin enjō emmos je allēlouia.\n\nAllēlouia allēlouia allēlouia allēlouia Iēsous Pi-ekhristos ep-Shēri em-Efnouti aumasf khen Vēthleem.\n\n+ Fai ere pi-ō-ou ereprepi naf nem Pefiōt enagathos nem pi-Epneuma ethouab isjen tinou nem sha eneh." },
            { language: 'english', text: "Then our mouths are filled with joy, and our tongues with rejoicing, for our Lord Jesus Christ, was born in Bethlehem.\n\n+ Hail to the city of our Lord, the city of the living, the dwelling of the righteous, which is Jerusalem.\n\nHail to you O Bethlehem, the city of the prophets, who has foretold of, the birth of Emmanuel.\n\n+ Today the true Light, has shone upon us, from the Virgin Mary, the pure bride.\n\nMary gave birth to our Savior, the good Lover of man, in Bethlehem of Judea, according to the sayings of the prophets.\n\n+ Isaiah the prophet, proclaimed with a voice of joy saying, \"She will give birth to Emmanuel, our good Savior.\"\n\nNow the heavens rejoice, and the earth is glad, for she has born Emmanuel for us, we the Christian people.\n\n+ Therefore we are wealthy, with perfect gifts, and we sing with faith, saying Alleluia.\n\nAlleluia Alleluia, Alleluia Alleluia, Jesus Christ the Son of God, was born in Bethlehem.\n\n+ This is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever." },
          ],
        },
        {
          id: "nativity-matins-psalm-response",
          title: "Ⲯⲁⲗⲙⲟⲥ ⲁ̅ⲗ̅ (Psalm Response)",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-nat-psalm-mor.mp3", text: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ϣⲏⲣⲓ ⲙ̀Ⲫϯ ⲁⲥⲙⲁⲥϥ ⲛ̀ϫⲉ ϯⲠⲁⲣⲑⲉⲛⲟⲥ ϧⲉⲛ Ⲃⲏⲑⲗⲉⲉⲙ ⲛ̀ⲧⲉ ϯⲒⲟⲩⲇⲉⲁ̀ ⲕⲁⲧⲁ ⲛⲓⲥ̀ⲙⲏ ⲙ̀ⲡ̀ⲣⲟⲩⲫⲏⲧⲓⲕⲟⲛ. Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅." },
            { language: 'englishCoptic', audio: "alhan-nativity-nat-psalm-mor.mp3", text: "Allēlouia allēlouia Iēsous Pi-ekhristos ep-Shēri em-Efnouti asmasf enje ti-Parthenos khen Vēthleem ente ti-Ioude-a kata ni-esmē emeproufētikon. Allēlouia allēlouia." },
            { language: 'english', text: "Alleluia, Alleluia. Jesus Christ the Son of God was born of the Virgin in Bethlehem of Judea according to the prophetic sayings. Alleulia, Alleluia." },
          ],
        },
        {
          id: "nativity-matins-gospel-response",
          title: "Ϫⲉ ⲡⲓⲁ̀ⲧⲥⲁⲣⲝ (Gospel Response)",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-nat-gospel-mor.mp3", text: "Ϫⲉ ⲡⲓⲁ̀ⲧⲥⲁⲣⲝ ⲁϥϭⲓⲥⲁⲣⲝ ⲟⲩⲟϩ ⲡⲓⲖⲟⲅⲟⲥ ⲁϥϧ̀ⲑⲁⲓ ⲡⲓⲀ̀ⲧⲁ̀ⲣⲭⲏ ⲁϥⲉ̀ⲣϩⲏⲧⲥ ⲡⲓⲁ̀ⲧⲥⲏⲟⲩ ⲁϥϣⲱⲡⲓ ϧⲁ ⲟⲩⲭ̀ⲣⲟⲛⲟⲥ.\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ϣⲏⲣⲓ ⲙ̀Ⲫϯ ⲫⲏⲉ̀ⲧⲁⲩⲙⲁⲥϥ ϧⲉⲛ Ⲃⲏⲑⲗⲉⲉⲙ.\n\nⲪⲁⲓ ⲉ̀ⲣⲉ ⲡⲓⲱ̀ⲟ̀ⲩ ⲉⲣⲡ̀ⲣⲉⲡⲓⲛⲁϥ ⲛⲉⲙ Ⲡⲉϥⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nϪⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ Ⲫ̀ⲓⲱⲧ ⲛⲙ ⲡ̀Ϣⲏⲣⲓ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ϯⲦ̀ⲣⲓⲁⲥ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ ⲧⲉⲛⲟ̀ⲩⲱ̀ϣⲧ ⲙ̀ⲙⲟⲥ ⲧⲉⲛϯⲱ̀ⲟ̀ⲩ ⲛⲁⲥ." },
            { language: 'englishCoptic', audio: "alhan-nativity-nat-gospel-mor.mp3", text: "Je pi-atsarks aftshisarks ouoh pi-Logos afekhthai pi-Atarkhē aferhēts pi-atsēou afshōpi kha ou-ekhronos.\n\nAllēlouia allēlouia allēlouia allēlouia Iēsous Pi-ekhristos ep-Shēri em-Efnouti fē-etaumasf khen Vēthleem.\n\nFai ere pi-ō-ou ereprepinaf nem Pefiōt enagathos nem pi-Epneuma ethouab isjen tinou nem sha eneh.\n\nJe efesmarōout enje Efiōt nm ep-Shēri nem pi-Epneuma ethouab ti-Etrias etjēk evol tenou-ōsht emmos tenti-ō-ou nas." },
            { language: 'english', text: "For the Incorporeal was incarnate, and the Word became flesh, the One without beginning began, the Eternal came under time.\n\nAlleluia Alleluia, Alleluia Alleluia, Jesus Christ the Son of God, was born in Bethlehem.\n\nThis is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.\n\nBlessed be the Father and the Son, and the Holy Spirit, the perfect Trinity, we worship Him and glorify Him." },
          ],
        },
      ],
    },
    {
      id: "nativity-liturgy",
      title: "Liturgy",
      hymns: [
        {
          id: "nativity-liturgy-hiten-st-joseph-salome",
          title: "Ϩⲓⲧⲉⲛ (Hiten St Joseph & Salome)",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-nat-hiten.mp3", text: "Ϩⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ ⲛ̀ⲧⲉ ⲛⲓϧⲉⲗⲗⲟⲓ ⲧ̀ⲥⲙⲁⲣⲱⲟⲩⲧ Ⲓⲱⲥⲏⲫ ⲡⲓϩⲁⲙϣⲉ ⲛⲉⲙ ⲑⲏⲉ̅ⲑ̅ⲩ̅ Ⲥⲁⲗⲱⲙⲓ Ⲡ⳪..." },
            { language: 'englishCoptic', audio: "alhan-nativity-nat-hiten.mp3", text: "Hiten ni-eukhē ente nikhelloi etsmarōout Iōsēf pihamshe nem thēethouab Salōmi Ptshois..." },
            { language: 'english', text: "Through the prayers of the blessed elders, Joseph the carpenter and Saint Salome, O Lord..." },
          ],
        },
        {
          id: "nativity-liturgy-praxis-response",
          title: "Ⲭⲉⲣⲉ Ⲃⲏⲉⲑⲗⲉⲉⲙ (Praxis Response)",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-epraxis.mp3", text: "Ⲭⲉⲣⲉ Ⲃⲏⲉⲑⲗⲉⲉⲙ ⲧ̀ⲡⲟⲗⲓⲥ ⲛ̀ⲛⲓⲡⲣⲟⲫⲏⲧⲏⲥ ⲑⲏⲉ̀ⲧⲁⲩⲙⲉⲥ Ⲡⲭ̅ⲥ̅ ⲛ̀ϧⲏⲧⲥ ⲡⲓⲙⲁϩ ⲥ̀ⲛⲁⲩ ⲛ̀Ⲁⲇⲁⲙ.\n\nⲔ̀ⲥ̀ⲙⲁⲣⲱⲟ̀ⲩⲧ ⲁ̀ⲗⲏⲑⲱⲥ ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ϫⲉ ⲁⲩⲙⲁⲥⲕ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ. Ⲛⲁⲓ ⲛⲁⲛ." },
            { language: 'englishCoptic', audio: "alhan-nativity-epraxis.mp3", text: "Shere Vēethleem etpolis enniprofētēs thē-etaumes Pi-ekhristos enkhēts pimah esnau en-Adam.\n\nEkesmarō-out alēthōs nem Pekiōt enagathos nem pi-Epneuma ethouab je aumask aksōti emmon. Nai nan." },
            { language: 'english', text: "Hail to Bethlehem, the city of the prophets, where Christ was born, the second Adam.\n\nBlessed are You indeed, with Your good Father and the Holy Spirit, for You were born and saved us. Have mercy upon us." },
          ],
        },
        {
          id: "nativity-liturgy-e-parthenos",
          title: "Ⲏ̀ⲡⲁⲣⲑⲉⲛⲟⲥ (E-parthenos)",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-eparthenos.mp3", text: "Ⲏ̀ⲡⲁⲣⲑⲉⲛⲟⲥ ⲥⲏⲙⲉⲣⲟⲛ ⲧⲟⲛ ⲩ̀ⲡⲉⲣⲟⲩⲥⲓⲟⲛ ⲧⲓⲕⲧⲓ ⲕⲉ ⲏⲅⲏⲧⲟ ⲥⲡⲏⲗⲉⲟⲛ ⲧⲱ ⲁⲡⲣⲟⲥⲓⲧⲱ ⲡ̀ⲣⲟⲥⲁⲅⲓ ⲁⲅⲅⲉⲗⲓ ⲙⲉⲧⲁ ⲡⲓⲙⲉⲛⲱⲛ ⲇⲟⲝⲟⲗⲟⲅⲟⲩⲥⲓ ⲙⲁⲅⲓ ⲇⲉ ⲙⲉⲧⲁ ⲁⲥⲧⲉⲣⲟⲥ ⲟ̀ⲇⲓⲡⲟⲣⲟⲩⲥⲓ ⲇⲓ ⲏ̀ⲙⲁⲥ ⲅⲁⲣ ⲉⲅⲉⲛⲛⲏⲑⲏ ⲡⲉⲇⲓⲟⲛ ⲛⲉⲟⲛ ⲟ̀ⲡ̀ⲣⲟⲉⲱⲛⲱⲛ ⲑⲉⲟⲥ." },
            { language: 'englishCoptic', audio: "alhan-nativity-eparthenos.mp3", text: "Ēparthenos sēmeron ton uperousion tikti ke ēgēto spēleon tō aprositō eprosagi aggeli meta pimenōn doksologousi magi de meta asteros odiporousi di ēmas gar egennēthē pedion neon o-eproeōnōn theos." },
            { language: 'english', text: "Today, the virgin bears Him who is transcendent, and the earth presents the cave to Him who is beyond reach. Angels, along with shepherds glorify Him. The Magi make their way to Him by a star. For a new child has been born for us, the God before all ages" },
          ],
        },
        {
          id: "nativity-liturgy-pi-jen-misi",
          title: "Ⲡⲓϫⲓⲛⲙⲓⲥⲓ (Pi-jen-misi)",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-pigenmisi.mp3", text: "Ⲡⲓϫⲓⲛⲙⲓⲥⲓ ⲙ̀ⲡⲁⲣⲑⲉⲛⲓⲕⲟⲛ ⲟⲩⲟϩ ⲛⲓⲛⲁⲕϩⲓ ⲙ̀ⲡ̀ⲛⲉⲩⲙⲁⲧⲓⲕⲟⲛ ⲟⲩϣ̀ⲫⲏⲣⲓ ⲙ̀ⲡⲁⲣⲁⲇⲟⲝⲟⲛ ⲕⲁⲧⲁ ⲛⲓⲥ̀ⲙⲏⲓ ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ." },
            { language: 'englishCoptic', audio: "alhan-nativity-pigenmisi.mp3", text: "Pijinmisi emparthenikon ouoh ninakhi emepneumatikon ou-eshfēri emparadokson kata ni-esmēi emeprofētikon." },
            { language: 'english', text: "The virginal birth and spiritual contractions, are marvelous wonders according to the prophetic sayings." },
          ],
        },
        {
          id: "nativity-liturgy-apenchois",
          title: "Ⲁⲡⲉⲛ⳪ (Apenchois)",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-nat-apenshois.mp3", text: "Ⲁⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲫⲏⲉ̀ⲧⲁⲥ ⲙⲁⲥϥ ⲛ̀ϫⲉ ϯⲠⲁⲣⲑⲉⲛⲟⲥ ϧⲉⲛ Ⲃⲏⲑⲗⲉⲉⲙ ⲛ̀ⲧⲉ ϯⲒⲟⲩⲇⲉⲁ̀ ⲕⲁⲧⲁ ⲛⲓⲥ̀ⲙⲏ ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ\n\nⲚⲓⲬⲉⲣⲟⲩⲃⲓⲙ ⲛⲉⲙ ⲛⲓⲤⲉⲣⲁⲫⲓⲙ ⲛⲓⲁ̀ⲅⲅⲉⲗⲟⲥ ⲛⲉⲙ ⲛⲓⲁ̀ⲣⲭⲏⲁ̀ⲅⲅⲉⲗⲟⲥ ⲛⲓⲥ̀ⲧⲣⲁⲧⲓⲁ ⲛⲉⲙ ⲛⲓⲉ̀ⲝⲟⲩⲥⲓⲁ ⲛⲓⲑ̀ⲣⲟⲛⲟⲥ ⲛⲓⲙⲉⲧ⳪ ⲛⲓϫⲟⲙ.\n\nⲈⲩⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲩϫⲟ ⲙ̀ⲙⲟⲥ ϫⲉ ⲟ̀ⲩⲱ̀ⲟ̀ⲩ ⲙ̀Ⲫϯ ϧⲉⲛ ⲛⲏⲉ̀ⲧϭⲟⲥⲓ ⲛⲉⲙ ⲟⲩϩⲓⲣⲏⲛⲏ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ ⲛⲉⲙ ⲟⲩϯⲙⲁϯ ϧⲉⲛ ⲛⲓⲣⲱⲙⲓ." },
            { language: 'englishCoptic', audio: "alhan-nativity-nat-apenshois.mp3", text: "Apentshois Iēsous Pi-ekhristos fē-etas masf enje ti-Parthenos khen Vēthleem ente ti-Ioude-a kata ni-esmē emeprofētikon\n\nNi-Kherouvim nem ni-Serafim ni-aggelos nem ni-arkhē-aggelos ni-estratia nem ni-eksousia ni-ethronos nimettshois nijom.\n\nEuōsh evol eujo emmos je ou-ō-ou em-Efnouti khen nē-ettshosi nem ouhirēnē hijen pikahi nem outimati khen nirōmi." },
            { language: 'english', text: "Our Lord Jesus Christ, was born of the Virgin, in Bethlehem of Judea, according to the prophetic sayings.\n\nThe Cherubim and the Seraphim, the angels and the archangels, the principalities and the authorities, the thrones and the powers.\n\nProclaiming and saying, \"Glory to God in the highest, peace on earth, and goodwill toward men.\"" },
          ],
        },
        {
          id: "nativity-liturgy-trisagion-agios",
          title: "Ⲁⲅⲓⲟⲥ (Trisagion - Agios)",
          versions: [
            { language: 'coptic', audio: "alhan-nativity-nat-agios.mp3", text: "Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ ⲁⲅⲓⲟⲥ Ⲓⲥⲭⲩⲣⲟⲥ ⲁⲅⲓⲟⲥ Ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲟ̀ ⲉⲕ Ⲡⲁⲣⲑⲉⲛⲟⲩ ⲅⲉⲛⲛⲉⲑⲏⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲀⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ ⲁⲅⲓⲟⲥ Ⲓⲥⲭⲩⲣⲟⲥ ⲁⲅⲓⲟⲥ Ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲟ̀ ⲉⲕ Ⲡⲁⲣⲑⲉⲛⲟⲩ ⲅⲉⲛⲛⲉⲑⲏⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲀⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ ⲁⲅⲓⲟⲥ Ⲓⲥⲭⲩⲣⲟⲥ ⲁⲅⲓⲟⲥ Ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲟ̀ ⲉⲕ Ⲡⲁⲣⲑⲉⲛⲟⲩ ⲅⲉⲛⲛⲉⲑⲏⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲆⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁⲙⲏⲛ.\n\nⲀⲅⲓⲁ Ⲧ̀ⲣⲓⲁⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ." },
            { language: 'englishCoptic', audio: "alhan-nativity-nat-agios.mp3", text: "Agios o Theos agios Iskhuros agios Athanatos o ek Parthenou gennethēs ele-ēson ēmas.\n\nAgios o Theos agios Iskhuros agios Athanatos o ek Parthenou gennethēs ele-ēson ēmas.\n\nAgios o Theos agios Iskhuros agios Athanatos o ek Parthenou gennethēs ele-ēson ēmas.\n\nDoksa Patri ke Uiō ke agiō Epneumati ke nun ke a-i ke is tous e-ōnas tōn e-ōnōn amēn.\n\nAgia Etrias ele-ēson ēmas." },
            { language: 'english', text: "Holy God, holy Mighty, holy Immortal, who was born of the Virgin, have mercy upon us.\n\nHoly God, holy Mighty, holy Immortal, who was born of the Virgin, have mercy upon us.\n\nHoly God, holy Mighty, holy Immortal, who was born of the Virgin, have mercy upon us.\n\nGlory be to the Father and the Son and the Holy Spirit, now and ever and unto the ages of the ages. Amen.\n\nO holy Trinity, have mercy upon us." },
          ],
        },
      ],
    },
  ],
  "theophany": [
    {
      id: "theophany-matins",
      title: "Matins",
      hymns: [
        {
          id: "theophany-matins-verses-of-the-cymbals",
          title: "Ϫⲉ ⲫⲁⲓ ⲡⲉ (Verses of the cymbals)",
          versions: [
            { language: 'coptic', audio: "alhan-epiphany-cymbals-verses.mp3", text: "Ϫⲉ ⲫⲁⲓ ⲡⲉ ⲠⲁϢⲏⲣⲓ ⲡⲁⲙⲉⲛⲣⲓⲧ ⲉ̀ⲧⲁ ⲧⲁⲯ̀ⲩⲭⲏ ϯⲙⲁϯ ⲛ̀ϧⲏⲧϥ ϫⲉ ⲁϥⲉ̀ⲣⲡⲁⲟ̀ⲩⲱ̀ϣ ⲥⲱⲧⲉⲙ ⲛ̀ⲥⲱϥ ϫⲉ ⲛ̀ⲑⲟϥ ⲡⲉ ⲡⲓⲢⲉϥⲧⲁⲛϧⲟ.\n\n+ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲛ̀ⲥⲁϥ ⲛⲉⲙ ⲫⲟⲟ̀ⲩ ⲛ̀ⲑⲟϥ ⲛ̀ⲑⲟϥ ⲡⲉ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ ϧⲉⲛ ⲟⲩϩⲩⲡⲟⲥⲧⲁⲥⲓⲥ ⲛ̀ⲟ̀ⲩⲱ̀ⲧ ⲧⲉⲛⲟ̀ⲩⲱ̀ϣⲧ ⲙ̀ⲙⲟϥ ⲧⲉⲛϯⲱ̀ⲟ̀ⲩ ⲛⲁϥ." },
            { language: 'englishCoptic', audio: "alhan-epiphany-cymbals-verses.mp3", text: "Je fai pe Pa-Shēri pamenrit eta ta-epsukhē timati enkhētf je aferpa-ou-ōsh sōtem ensōf je enthof pe pi-Reftankho.\n\n+ Iēsous Pi-ekhristos ensaf nem fo-ou enthof enthof pe nem sha eneh khen ouhupostasis enou-ōt tenou-ōsht emmof tenti-ō-ou naf." },
            { language: 'english', text: "\"This is My beloved Son, with whom My soul is well pleased, He does My will hear Him, for He is the life-Giver.\"\n\n+ Jesus Christ the same yesterday, today and forever, in one hypostasis, we worship and glorify Him." },
          ],
        },
      ],
    },
    {
      id: "theophany-liturgy",
      title: "Liturgy",
      hymns: [
        {
          id: "theophany-liturgy-hiten-for-st-john",
          title: "Ϩⲓⲧⲉⲛ (Hiten for St John)",
          versions: [
            { language: 'coptic', audio: "alhan-advent-hiten2.mp3", text: "Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ ⲛ̀ⲧⲉ ⲡⲓⲥⲩⲅⲅⲉⲛⲏⲥ ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ Ⲓⲱⲁⲛⲛⲏⲥ ⲡ̀ϣⲏⲣⲓ ⲛ̀Ⲍⲁⲭⲁⲣⲓⲁⲥ Ⲡ̀ϭⲟⲓⲥ..." },
            { language: 'englishCoptic', audio: "alhan-advent-hiten2.mp3", text: "Hiten ni-epresvia ente pisuggenēs en-Emmanouēl Iōannēs epshēri en-Zakharias Eptshois..." },
            { language: 'english', text: "Through the intercessions, of the relative of Emmanuel, John the son of Zechariah, O Lord..." },
          ],
        },
        {
          id: "theophany-liturgy-praxis-response",
          title: "Ϫⲉ ⲫⲁⲓ ⲡⲉ ⲠⲁϢⲏⲣⲓ (Praxis Response)",
          versions: [
            { language: 'coptic', audio: "alhan-epiphany-epi-lit-epraxis.mp3", text: "Ϫⲉ ⲫⲁⲓ ⲡⲉ ⲠⲁϢⲏⲣⲓ ⲡⲁⲙⲉⲛⲣⲓⲧ ⲉ̀ⲧⲁ ⲧⲁⲯ̀ⲩⲭⲏ ϯⲙⲁϯ ⲛ̀ϧⲏⲧϥ ⲁϥⲉ̀ⲣⲡⲁⲟ̀ⲩⲱ̀ϣ ⲥⲱⲧⲉⲙ ⲛ̀ⲥⲱϥ ϫⲉ ⲛ̀ⲑⲟϥ ⲡⲉ ⲡⲓⲢⲉϥⲧⲁⲛϧⲟ." },
            { language: 'englishCoptic', audio: "alhan-epiphany-epi-lit-epraxis.mp3", text: "Je fai pe Pa-Shēri pamenrit eta ta-epsukhē timati enkhētf aferpa-ou-ōsh sōtem ensōf je enthof pe pi-Reftankho." },
            { language: 'english', text: "This is My beloved Son, with whom My soul is well pleased, He does My will hear Him, for He is the life-Giver." },
          ],
        },
        {
          id: "theophany-liturgy-hymn-for-st-john",
          title: "Ⲟ̀ⲩⲣⲁⲛ ⲛ̀ϣⲟⲩϣⲟⲩ (Hymn for St John)",
          versions: [
            { language: 'coptic', audio: "alhan-epiphany-ouranenshoushou.mp3", text: "Ⲟ̀ⲩⲣⲁⲛ ⲛ̀ϣⲟⲩϣⲟⲩ ⲡⲉ ⲡⲉⲕⲣⲁⲛ ⲱ̀ ⲡⲓⲥⲩⲅⲅⲉⲛⲏⲥ ⲛ̀Ⲉⲙⲙⲁⲛⲟⲩⲏ̀ⲗ ⲛ̀ⲑⲟⲕ ⲟ̀ⲩⲛⲓϣϯ ϧⲉⲛ ⲛⲏⲉ̅ⲑ̅ⲩ̅ ⲧⲏⲣⲟⲩ Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲓⲣⲉϥϯⲱ̀ⲙⲥ.\n\nⲔ̀ϭⲟⲥⲓ ⲉ̀ⲛⲓⲡⲁⲧⲣⲓⲁⲣⲭⲏⲥ ⲕ̀ⲧⲁⲓⲏ̀ⲟⲩⲧ ⲉ̀ⲛⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ ϫⲉ ⲙ̀ⲡⲉ ⲟ̀ⲩⲟ̀ⲛ ⲧⲱⲛϥ ϧⲉⲛ ⲛⲓϫⲓⲛⲙⲓⲥⲓ ⲛ̀ⲧⲉ ⲛⲓϩⲓⲟ̀ⲙⲓ ⲉϥⲟ̀ⲛⲓ ⲙ̀ⲙⲟⲕ.\n\nⲀ̀ⲙⲱⲓⲛⲓ ⲥⲟⲧⲉⲙ ⲉ̀ⲡⲓⲥⲟⲫⲟⲥ ⲡⲓⲗⲁⲥ ⲛ̀ⲛⲟⲩⲃ Ⲑⲉⲟ̀ⲇⲟⲥⲓⲟⲥ ⲉϥϫⲱ ⲙ̀ⲡ̀ⲧⲁⲓⲟ ⲙ̀ⲡⲓⲃⲁⲡⲧⲏⲥⲧⲏⲥ Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲓⲣⲉϥϯⲱ̀ⲙⲥ." },
            { language: 'englishCoptic', audio: "alhan-epiphany-ouranenshoushou.mp3", text: "Ouran enshoushou pe pekran ō pisuggenēs en-Emmanou-ēl enthok ounishti khen nēethouab tērou Iōannēs pirefti-ōms.\n\nEktshosi enipatriarkhēs ektai-ēout eni-eprofētēs je empe ou-on tōnf khen nijinmisi ente nihi-omi efoni emmok.\n\nAmōini sotem episofos pilas ennoub The-odosios efjō emeptaio empivaptēstēs Iōannēs pirefti-ōms." },
            { language: 'english', text: "A name of pride is your name, O relative of Emmanuel, for you are great among all the saints, O John the Baptist.\n\nYou are higher than the patriarchs, more honored than the prophets, for no one born of women, is as great as you.\n\nCome and hear the wise, the golden tongued Theodosius, speaking of the honor of the baptizer, John the Baptist." },
          ],
        },
        {
          id: "theophany-liturgy-trisagion-agios",
          title: "Ⲁ̀ⲅⲓⲟⲥ (Trisagion - Agios)",
          versions: [
            { language: 'coptic', audio: "alhan-epiphany-epi-agios.mp3", text: "Ⲁ̀ⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ ⲁ̀ⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲟ̀ Ⲓⲟⲣⲇⲁⲛⲟⲩ ⲃⲁⲡⲧⲓⲥⲧⲏⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲀ̀ⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ ⲁ̀ⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲟ̀ Ⲓⲟⲣⲇⲁⲛⲟⲩ ⲃⲁⲡⲧⲓⲥⲧⲏⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲀ̀ⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ ⲁ̀ⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲟ̀ Ⲓⲟⲣⲇⲁⲛⲟⲩ ⲃⲁⲡⲧⲓⲥⲧⲏⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲆⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ.\n\nⲀⲅⲓⲁ Ⲧ̀ⲣⲓⲁⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ." },
            { language: 'englishCoptic', audio: "alhan-epiphany-epi-agios.mp3", text: "Agios o Theos agios iskhuros agios athanatos o Iordanou vaptistēs ele-ēson ēmas.\n\nAgios o Theos agios iskhuros agios athanatos o Iordanou vaptistēs ele-ēson ēmas.\n\nAgios o Theos agios iskhuros agios athanatos o Iordanou vaptistēs ele-ēson ēmas.\n\nDoksa Patri ke Uiō ke agiō Epneumati ke nun ke a-i ke is tous e-ōnas tōn e-ōnōn amēn.\n\nAgia Etrias ele-ēson ēmas." },
            { language: 'english', text: "Holy God, holy Mighty, holy Immortal, who was baptized in the Jordan, have mercy upon us.\n\nHoly God, holy Mighty, holy Immortal, who was baptized in the Jordan, have mercy upon us.\n\nHoly God, holy Mighty, holy Immortal, who was baptized in the Jordan, have mercy upon us.\n\nGlory be to the Father and the Son and the Holy Spirit, now and forever and unto the age of all ages. Amen.\n\nO holy Trinity, have mercy upon us." },
          ],
        },
        {
          id: "theophany-liturgy-psalm",
          title: "Ⲯⲁⲗⲙⲟⲥ (Psalm)",
          versions: [
            { language: 'coptic', audio: "alhan-epiphany-epi-lit-psalm.mp3", text: "ϥ̀ⲥ̀ⲙⲁⲣⲱⲟ̀ⲩⲧ ⲛ̀ϫ̀ⲉ ⲫⲏⲉ̀ⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ⳪ ⲁⲛⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲱⲧⲉⲛ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲡ̀ⲏⲓ ⲙ̀Ⲡ⳪ ⲛ̀ⲑⲟⲕ ⲡⲉ ⲡⲁⲚⲟⲩϯ ϯⲛⲁⲟ̀ⲩⲱ̀ⲛϩ ⲛⲁⲕ ⲉ̀ⲃⲟⲗ ⲛ̀ⲑⲟⲕ ⲡⲉ ⲡⲁⲚⲟⲩϯ ϯⲛⲁϭ̀ⲁⲥⲕ ⲁ̅ⲗ̅." },
            { language: 'englishCoptic', audio: "alhan-epiphany-epi-lit-psalm.mp3", text: "efesmarō-out eneje fē-ethnēou khen efran em-Ptshois anesmou erōten evolkhen epēi em-Ptshois enthok pe pa-Nouti tina-ou-ōnh nak evol enthok pe pa-Nouti tina-etshask allēlouia." },
            { language: 'english', text: "Blessed is He who comes in the name of the Lord. We have blessed you out of the house of the Lord. You are my God, and I will give You thanks. You are my God, I will exalt You." },
          ],
        },
        {
          id: "theophany-liturgy-gospel-response",
          title: "Ⲫⲁⲓ ⲡⲉ ⲡⲓϨⲓⲏⲃ (Gospel Response)",
          versions: [
            { language: 'coptic', audio: "alhan-epiphany-epi-lit-gospel-reply.mp3", text: "Ⲫⲁⲓ ⲡⲉ ⲡⲓϨⲓⲏⲃ ⲛ̀ⲧⲉ Ⲫϯ ⲫⲏⲉ̀ⲧⲱ̀ⲗⲓ ⲙ̀ⲫ̀ⲛⲟⲃⲓ ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ ⲫⲏⲉ̀ⲧⲁϥⲓⲛⲓ ⲛ̀ⲟⲩⲧⲁⲡ ⲛ̀ⲥⲱϯ ⲉⲑⲣⲉϥ ⲛⲟϩⲉⲙ ⲙ̀ⲡⲉϥⲗⲁⲟⲥ." },
            { language: 'englishCoptic', audio: "alhan-epiphany-epi-lit-gospel-reply.mp3", text: "Fai pe pi-Hiēb ente Efnouti fē-etōli emefnovi empikosmos fē-etafini enoutap ensōti ethref nohem empeflaos." },
            { language: 'english', text: "This is the Lamb of God, who carried the sin of the world, who brought a horn of salvation, in order to save His people." },
          ],
        },
      ],
    },
  ],
  "jonah": [
    {
      id: "jonah-matins",
      title: "Matins",
      hymns: [
        {
          id: "jonah-matins-mon-matins-gospel-response",
          title: "Ⲁⲗⲗⲁ ⲡⲁ⳪ (Mon Matins Gospel Response)",
          versions: [
            { language: 'coptic', audio: "alhan-jonah-jon-mon-mor.mp3", text: "Ⲁⲗⲗⲁ ⲡⲁ⳪ ⲁ̀ⲣⲓⲟⲩⲓ̀ ⲛⲉⲙⲁⲛ ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲛⲓⲣⲉⲙⲚⲓⲛⲉⲩⲏ̀ ⲛⲁⲓ ⲉ̀ⲧⲁⲩⲉⲣⲙⲉⲧⲁⲛⲟⲓⲛ ⲁⲕⲭⲁ ⲛⲟⲩⲛⲟⲃⲓ ⲛⲱⲟⲩ ⲉ̀ⲃⲟⲗ." },
            { language: 'englishCoptic', audio: "alhan-jonah-jon-mon-mor.mp3", text: "Alla patshois ariou-i neman emefrēti ennirem-Nineu-ē nai etauermetanoin akkha nounovi nōou evol." },
            { language: 'english', text: "But deal with us O my Lord, like the people of Nineveh, who has repented, and You forgave them their sins." },
          ],
        },
        {
          id: "jonah-matins-tue-matins-gospel-response",
          title: "Ⲙⲟⲓ ⲛⲏⲓ Ⲡ̀⳪ (Tue Matins Gospel Response)",
          versions: [
            { language: 'coptic', audio: "alhan-jonah-jon-tue-mor.mp3", text: "Ⲙⲟⲓ ⲛⲏⲓ Ⲡ̀⳪ ⲛ̀ⲟⲩⲙⲉⲧⲁⲛⲟⲓⲁ ⲉ̀ⲡ̀ϫⲓⲛⲧⲁⲉⲣⲙⲉⲧⲁⲛⲟⲓⲛ ⲙ̀ⲡⲁⲧⲉ ⲫ̀ⲙⲟⲩ ⲙⲁϣ̀ⲑⲁⲙ ⲛ̀ⲣⲱⲓ ϧⲉⲛ ⲛⲓⲡⲩⲗⲏ ⲛ̀ⲧⲉ Ⲁ̀ⲙⲉⲛϯ." },
            { language: 'englishCoptic', audio: "alhan-jonah-jon-tue-mor.mp3", text: "Moi nēi Eptshois enoumetanoia e-epjintaermetanoin empate efmou ma-eshtham enrōi khen nipulē ente Amenti." },
            { language: 'english', text: "Grant me O Lord repentance, that I may repent, before death closes my mouth, in the gates of Hades." },
          ],
        },
        {
          id: "jonah-matins-wed-matins-gospel-response",
          title: "Ϫⲉ ⲁ̀ⲙⲱⲓⲛⲓ (Wed Matins Gospel Response)",
          versions: [
            { language: 'coptic', audio: "alhan-jonah-jon-wed-mor.mp3", text: "Ϫⲉ ⲁ̀ⲙⲱⲓⲛⲓ ϩⲁⲣⲟⲓ ⲛⲏⲉⲧⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲧⲉ Ⲡⲁⲓⲱⲧ ⲁ̀ⲣⲓⲕ̀ⲗⲏⲣⲟⲛⲟⲙⲓⲛ ⲙ̀ⲡⲓⲱⲛϧ ⲉⲑⲙⲏⲛ ⲉ̀ⲃⲟⲗ ϣⲁ ⲉ̀ⲛⲉϩ." },
            { language: 'englishCoptic', audio: "alhan-jonah-jon-wed-mor.mp3", text: "Je amōini haroi nēetesmarōout ente Paiōt ari-eklēronomin empiōnkh ethmēn evol sha eneh." },
            { language: 'english', text: "\"Come unto Me, O blessed of My Father, and inherit the life, that endures forever.\"" },
          ],
        },
      ],
    },
    {
      id: "jonah-liturgy",
      title: "Liturgy",
      hymns: [
        {
          id: "jonah-liturgy-alleluia-ei-e-ee",
          title: "Ⲁⲗ Ⲉⲓⲉ̀ⲓ̀ ⲉ̀ϧⲟⲩⲛ (Alleluia. Ei-e-ee)",
          versions: [
            { language: 'coptic', audio: "alhan-jonah-al-eieii.mp3", text: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ. Ⲉⲓⲉ̀ⲓ̀ ⲉ̀ϧⲟⲩⲛ ϣⲁ ⲡⲓⲙⲁⲉ̀ⲛⲉ̀ⲣϣⲱⲟ̀ⲩϣⲓ ⲛ̀ⲧⲉ Ⲫ̀ϯ ⲛⲁϩⲣⲉⲛ ⲡ̀ϩⲟ ⲙ̀Ⲫ̀ϯ ⲫⲏⲉ̀ⲧⲁϥϯ ⲙ̀ⲡ̀ⲟ̀ⲩⲛⲟϥ ⲛ̀ⲧⲉ ⲧⲁⲙⲉⲧⲁ̀ⲗⲟⲩ. Ϯⲛⲁⲟ̀ⲩⲱ̀ⲛϩ ⲛⲁⲕ ⲉ̀ⲃⲟⲗ Ⲫ̀ϯ ⲡⲁⲚⲟⲩϯ ϧⲉⲛ ⲟ̀ⲩⲕⲩⲑⲁⲣⲁ. Ⲁ̀ⲣⲓⲫ̀ⲙⲉⲩⲓ̀ Ⲡ̀⳪ ⲛ̀Ⲇⲁⲩⲓⲇ ⲛⲉⲙ ⲧⲉϥⲙⲉⲧⲣⲉⲙⲣⲁⲩϣ ⲧⲏⲣⲥ. Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ." },
            { language: 'englishCoptic', audio: "alhan-jonah-al-eieii.mp3", text: "Allēlouia. Ei-e-i ekhoun sha pima-enershō-oushi ente Efti nahren epho em-Efti fē-etafti emepounof ente tametalou. Tina-ou-ōnh nak evol Efti pa-Nouti khen oukuthara. Ari-efmeu-i Eptshois en-Dauid nem tefmetremraush tērs. Allēlouia." },
            { language: 'english', text: "Alleluia. I shall go in unto the Altar of God, before the face of God, who gives gladness to my youth. I will confess to You O God my God with a harp. Remember O Lord David and all his meekness. Alleluia." },
          ],
        },
        {
          id: "jonah-liturgy-nefsenty",
          title: "Ⲛⲉϥⲥⲉⲛϯ (Nefsenty)",
          versions: [
            { language: 'coptic', audio: "alhan-jonah-nefsenty.mp3", text: "Ⲛⲉϥⲥⲉⲛϯ ϧⲉⲛ ⲛⲓⲧⲱⲟ̀ⲩ ⲉ̅ⲑ̅ⲩ̅. Ⲁ̀Ⲡ⳪ ⲙⲉⲓ ⲛ̀ⲛⲓⲡⲩⲗⲏ ⲛ̀ⲧⲉ Ⲥⲓⲱⲛ ⲉ̀ϩⲟⲧⲉ ⲛⲓⲙⲁ ⲛ̀ϣⲱⲡⲓ ⲧⲏⲣⲟⲩ ⲛ̀ⲧⲉ Ⲓⲁⲕⲱⲃ. Ⲁϥⲥⲁϫⲓ ⲉ̀ⲑⲃⲏϯ ⲛ̀ϩⲁⲛ ⲛ̀ⲃⲏⲟⲩⲓ̀ ⲉⲩⲧⲁⲓⲏⲟⲩⲧ ϯⲃⲁⲕⲓ ⲛ̀ⲧⲉ Ⲫϯ. Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲤⲓⲱⲛ ϯⲙⲁⲩ ⲛⲁϫⲟⲥ ϫⲉ ⲟ̀ⲩⲣⲱⲙⲓ ⲛⲉⲙ ⲟ̀ⲩⲣⲱⲙⲓ ⲁϥϣⲱⲡⲓ ⲛ̀ϧⲏⲧⲥ ⲟⲩⲟϩ ⲛ̀ⲑⲟϥ Ⲡⲉⲧϭ̀ⲟⲥⲓ ⲁϥϩⲓⲥⲉⲛϯ ⲙ̀ⲙⲟⲥ ϣⲁ ⲉ̀ⲛⲉϩ. Ⲁ̀ⲗⲗⲏⲗⲟⲩⲓⲁ." },
            { language: 'englishCoptic', audio: "alhan-jonah-nefsenty.mp3", text: "Nefsenti khen nitō-ou ethouab. A-Ptshois mei ennipulē ente Siōn ehote nima enshōpi tērou ente Iakōb. Afsaji ethvēti enhan envēou-i eutaiēout tivaki ente Efnouti. Allēlouia.\n\nSiōn timau najos je ourōmi nem ourōmi afshōpi enkhēts ouoh enthof Petetshosi afhisenti emmos sha eneh. Allēlouia." },
            { language: 'english', text: "His foundation is in the holy mountains. The Lord loves the gates of Zion, more than all the dwellings of Jacob. Glorious things are spoken of you, O city of God. Alleluia.\n\nAnd of Zion it will be said, \"This one and that one were born in her, and the Most High Himself shall establish her.\" Alleluia." },
          ],
        },
        {
          id: "jonah-liturgy-entho-te-teeshoory",
          title: "Ⲛ̀ⲑⲟ ⲧⲉ ϯϣⲟⲩⲣⲏ (Entho Te Teeshoory)",
          versions: [
            { language: 'coptic', audio: "alhan-jonah-enthotetishori.mp3", text: "Ⲛ̀ⲑⲟ ⲧⲉ ϯϣⲟⲩⲣⲏ ⲛ̀ⲛⲟⲩⲃ ⲛ̀ⲕⲁⲑⲁⲣⲟⲥ ⲉⲧϥⲁⲓ ϧⲁ ⲡⲓϫⲉⲃⲥ ⲛ̀ⲭ̀ⲣⲱⲙ ⲉⲧⲥ̀ⲙⲁⲣⲱⲟ̀ⲩⲧ." },
            { language: 'englishCoptic', audio: "alhan-jonah-enthotetishori.mp3", text: "Entho te tishourē ennoub enkatharos etfai kha pijebs enekhrōm etesmarō-out." },
            { language: 'english', text: "You are the golden censer, carrying the blessed and live coal." },
          ],
        },
        {
          id: "jonah-liturgy-praxis-response",
          title: "Ϣⲁⲣⲉ Ⲫ̀ϯ (Praxis Response)",
          versions: [
            { language: 'coptic', audio: "alhan-jonah-share.mp3", text: "Ϣⲁⲣⲉ Ⲫ̀ϯ ⲱ̀ⲗⲓ ⲙ̀ⲙⲁⲩ ⲛ̀ⲛⲓⲛⲟⲃⲓ ⲛ̀ⲧⲉ ⲡⲓⲗⲁⲟ̀ⲥ ⲉ̀ⲃⲟⲗϩⲓⲧⲉⲛ ⲡⲓϭ̀ⲗⲓⲗ ⲛⲉⲙ ⲡⲓⲥ̀ⲑⲟⲓ ⲛ̀ⲧⲉ ⲡⲓⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ.\n\nⲔ̀ⲥ̀ⲙⲁⲣⲱⲟ̀ⲩⲧ ⲁ̀ⲗⲏⲑⲱⲥ ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ϫⲉ ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ. Ⲛⲁⲓ ⲛⲁⲛ." },
            { language: 'englishCoptic', audio: "alhan-jonah-share.mp3", text: "Share Efti ōli emmau enninovi ente pila-os evolhiten pi-etshlil nem pi-esthoi ente pi-esthoinoufi.\n\nEkesmarō-out alēthōs nem Pekiōt enagathos nem pi-Epneuma ethouab je aki aksōti emmon. Nai nan." },
            { language: 'english', text: "Wherein God takes away, the sins of the people, through the burnt offerings, and the aroma of incense.\n\nBlessed are You indeed, with Your good Father, and the Holy Spirit, for You have come and saved us. Have mercy upon us." },
          ],
        },
      ],
    },
  ],
  "palm-sunday": [
    {
      id: "palmsunday-vespers",
      title: "Vespers",
      hymns: [
        {
          id: "palmsunday-vespers-verses-of-the-cymbals",
          title: "Ⲱⲥⲁⲛⲛⲁ (Verses of the Cymbals)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-cymbals.mp3", text: "Ⲱⲥⲁⲛⲛⲁ ϧⲉⲛ ⲛⲏⲉⲧϭⲟⲥⲓ ⲫⲁⲓ ⲡⲉ ⲡ̀ⲟⲩⲣⲟ ⲙ̀ⲡⲒⲥⲣⲁⲏⲗ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲫⲏⲉⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ⳪ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ.\n\nⲪⲏⲉⲧϩⲉⲙⲥⲓ ϩⲓϫⲉⲛ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ ⲁϥⲧⲁⲗⲟϥ ⲉ̀ⲟⲩⲉ̀ⲱ̀ ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲟⲩ ⲡⲉ ⲡⲁⲓⲛⲓϣϯ ⲛ̀ⲑⲉⲃⲓⲟ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-cymbals.mp3", text: "Ōsanna khen nēettshosi fai pe epouro emp-Israēl efesmarōout enje fēethnēou khen efran em-Ptshois ente nijom.\n\nFēethemsi hijen ni-Kherouvim aftalof eou-e-ō afshe ekhoun e-Ierousalēm ou pe painishti enthevio." },
            { language: 'english', text: "Hosanna in the highest, this is the King of Israel, blessed is He who comes in the Name, of the Lord of Hosts.\n\nHe who sits upon the Cherubim, sat on a donkey, He came into Jerusalem, what is this great humility." },
          ],
        },
        {
          id: "palmsunday-vespers-doxology",
          title: "Ⲁⲣⲓⲥⲁⲗⲡⲓⲍⲓⲛ (Doxology)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-doxology.mp3", text: "Ⲁⲣⲓⲥⲁⲗⲡⲓⲍⲓⲛ ϧⲉⲛ ⲟⲩⲥⲟⲩⲁⲓ ϧⲉⲛ ⲟⲩⲥ̀ⲙⲏ ⲛ̀ⲥⲁⲗⲡⲓⲅⲅⲟⲥ ϧⲉⲛ ⲟⲩⲉ̀ϩⲟⲟⲩ ⲛ̀ⲛⲉⲧⲉⲛϣⲁⲓ ϫⲉ ⲟⲩⲁϩⲥⲁϩⲛⲓ ⲛ̀Ⲑⲉⲟⲥ.\n\n+ Ⲫⲏⲉⲧϩⲉⲙⲥⲓ ϩⲓϫⲉⲛ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ ⲁϥⲧⲁⲗⲟϥ ⲉ̀ⲟⲩⲉ̀ⲱ̀ ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲟⲩⲡⲉ ⲡⲁⲓⲛⲓϣϯ ⲛ̀ⲑⲉⲃⲓⲟ.\n\nⲔⲁⲧⲁ ⲫ̀ⲣⲏϯ ⲉ̀ⲧⲁϥϫⲟⲥ ⲛ̀ϫⲉ Ⲇⲁⲩⲓⲇ ϧⲉⲛ ⲡⲓⲯⲁⲗⲙⲟⲥ ϫⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲫⲏⲉ̀ⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ̀⳪ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ.\n\n+ Ⲡⲁⲗⲓⲛ ⲟⲛ ⲁϥϫⲱ ⲙ̀ⲙⲟⲥ ϫⲉ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲣⲱⲟⲩ ⲛ̀ϩⲁⲛⲕⲟⲩϫⲓ ⲛ̀ⲁ̀ⲗⲱⲟⲩⲓ ⲛⲉⲙ ⲛⲏⲉⲑⲟⲩⲉⲙϭⲓ ⲛ̀ⲑⲟⲕ ⲁⲕⲥⲉⲃⲧⲉ ⲡⲓⲥ̀ⲙⲟⲩ.\n\nⲦⲟⲧⲉ ⲁϥϫⲱⲕ ⲉ̀ⲃⲟⲗ ⲙ̀ⲡⲓⲥⲁϫⲓ ⲛ̀ⲧⲉ Ⲇⲁⲩⲓⲇ ⲡⲓⲡ̀ⲛⲉⲩⲙⲁⲧⲟⲫⲟⲣⲟⲥ ϫⲉ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲣⲱⲟⲩ ⲛ̀ϩⲁⲛⲕⲟⲩϫⲓ ⲛ̀ⲁ̀ⲗⲱⲟⲩⲓ ⲙ̀ⲡⲁⲓⲣⲏϯ ⲉϥϫⲱ ⲙ̀ⲙⲟⲥ.\n\n+ Ⲥⲉϩⲱⲥ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲟⲩⲛⲉϩⲥⲓ ⲁⲩϫⲉ ⲫⲁⲓ ⲡⲉ Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ ⲱⲥⲁⲛⲛⲁ ϧⲉⲛ ⲛⲏⲉⲧϭⲟⲥⲓ ⲫⲁⲓ ⲡⲉ ⲡ̀ⲟⲩⲣⲟ ⲙ̀ⲡⲒⲥⲣⲁⲏⲗ.\n\nⲀⲛⲓⲟⲩⲓ̀ ⲙ̀Ⲡ̀⳪ ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ Ⲫ̀ⲛⲟⲩϯ ⲁ̀ⲛⲓⲟⲩⲓ ⲙ̀Ⲡ̀⳪ ⲛ̀ⲟⲩⲱ̀ⲟⲩ ⲛⲉⲙ ⲟⲩⲧⲁⲓⲟ̀ ⲉ̀ϣⲗⲏⲗⲟⲩⲓ̀ ⲉ̀ⲃⲟⲗ ⲙ̀ⲡⲉⲛⲛⲟⲩϯ ϧⲉⲛ ϩⲁⲛⲇⲟⲝⲟⲗⲟⲅⲓⲁ ⲛ̀ⲥ̀ⲙⲟⲩ.\n\n+ Ⲛ̀ⲑⲟⲕ Ⲫ̀ⲛⲟⲩϯ ϥ̀ⲉⲣϣⲁⲩ ⲛⲁⲕ ⲛ̀ϫⲉ ⲡⲓϫⲱ ϧⲉⲛ Ⲥⲓⲱⲛ ⲛⲉⲙ Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲉⲩⲉ̀ϯ ⲛⲁⲕ ⲛ̀ϩⲁⲛⲉⲩⲭⲏ ϣⲁ ⲛⲓⲉ̀ⲱⲛ.\n\nⲰⲥⲁⲛⲛⲁ ϧⲉⲛ ⲛⲏⲉ̀ⲧϭⲟⲥⲓ ⲫⲁⲓ ⲡⲉ ⲡ̀ⲟⲩⲣⲟ ⲙ̀ⲡⲒⲥⲣⲁⲏⲗ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲫⲏⲉ̀ⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ̀⳪ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ.\n\n+ Ⲧⲉⲛϩⲱⲥ ⲉ̀ⲣⲟϥ ⲧⲉⲛϯⲱ̀ⲟⲩ ⲛⲁϥ ⲧⲉⲛⲉⲣϩⲟⲩⲟ̀ ϭⲓⲥⲓ ⲙ̀ⲙⲟϥ ϩⲱⲥ ⲁ̀ⲅⲁⲑⲟⲥ ⲟⲩⲟϩ ⲙ̀ⲙⲁⲓⲣⲱⲙⲓ ⲛⲁⲓ ⲛⲁⲛ ⲕⲁⲧⲁ ⲡⲉⲕⲛⲓϣϯ ⲛ̀ⲛⲁⲓ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-doxology.mp3", text: "Arisalpizin khen ousouai khen ou-esmē ensalpiggos khen ou-ehoou ennetenshai je ouahsahni en-Theos.\n\n+ Fēethemsi hijen ni-Kherouvim aftalof eou-e-ō afshe ekhoun e-Ierousalēm oupe painishti enthevio.\n\nKata efrēti etafjos enje Dauid khen pipsalmos je efesmarōout enje fē-ethnēou khen efran em-Eptshois ente nijom.\n\n+ Palin on afjō emmos je evolkhen rōou enhankouji enalōoui nem nēethouemtshi enthok aksebte pi-esmou.\n\nTote afjōk evol empisaji ente Dauid pi-epneumatoforos je evolkhen rōou enhankouji enalōoui empairēti efjō emmos.\n\n+ Sehōs erof khen ounehsi auje fai pe Emmanouēl ōsanna khen nēettshosi fai pe epouro emp-Israēl.\n\nAniou-i em-Eptshois nishēri ente Efnouti anioui em-Eptshois enou-ōou nem outai-o eshlēlou-i evol empennouti khen handoksologia enesmou.\n\n+ Enthok Efnouti efershau nak enje pijō khen Siōn nem Ierousalēm eu-eti nak enhaneukhē sha ni-eōn.\n\nŌsanna khen nē-ettshosi fai pe epouro emp-Israēl efesmarōout enje fē-ethnēou khen efran em-Eptshois ente nijom.\n\n+ Tenhōs erof tenti-ōou naf tenerhou-o tshisi emmof hōs agathos ouoh emmairōmi nai nan kata peknishti ennai." },
            { language: 'english', text: "Blow the trumpet at the new moon, with the sound of the instruments, on your festive day, for it is an order from God.\n\n+ He who sits upon the Cherubim, sat on a donkey, He came into Jerusalem, what is this great humility.\n\nAs David has said, in the Book of the Psalms, \"Blessed is He who comes in the Name, of the Lord of Hosts.\n\n+ And again he said, \"Out of the mouths of babes, and suckling infants, You have perfected praise.\n\nThen David the Spirit Bearer, completed his saying, \"Out of the mouths of babes, and suckling infants likewise say.\n\n+ They praise Him watchfully, saying \"This is Emmanuel, hosanna in the highest, this is the King of Israel.\"\n\nAscribe to the Lord O sons of God, ascribe to the Lord glory and honor, rejoice in our God, with doxologies of blessing.\n\n+ Praise is due to You O God, in Zion and Jerusalem, they send to You prayers, unto the ages.\n\nHosanna in the highest, this is the King of Israel, blessed is He who comes in the Name, of the Lord of Hosts.\n\n+ We praise and glorify Him, and exalt Him above all, as a Good One and Lover of Man, have mercy upon us according to Your great mercy." },
          ],
        },
        {
          id: "palmsunday-vespers-evlogymenos",
          title: "Ⲉⲩⲗⲟⲅⲓⲙⲉⲛⲟⲥ (Evlogymenos)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-evlogymenos.mp3", text: "Ⲉⲩⲗⲟⲅⲓⲙⲉⲛⲟⲥ ⲟ̀ ⲉⲣⲭⲟⲙⲉⲛⲟⲥ ⲉⲛ ⲟ̀ⲛⲟⲙⲁⲧⲓ ⲕⲩⲣⲓⲟⲩ ⲡⲁⲗⲓⲛ ⲉⲛ ⲟ̀ⲛⲟⲙⲁⲧⲓ ⲕⲩⲣⲓⲟⲩ.\n\nⲰⲥⲁⲛⲛⲁ ⲧⲱ ⲩ̀ⲓⲱ̀ Ⲇⲁⲩⲓⲇ ⲡⲁⲗⲓⲛ ⲧⲱ ⲩ̀ⲓⲱ̀ Ⲇⲁⲩⲓⲇ.\n\nⲰⲥⲁⲛⲛⲁ ⲉⲛ ⲧⲓⲥ ⲩ̀ⲯⲓⲥⲧⲓⲥ ⲡⲁⲗⲓⲛ ⲉⲛ ⲧⲓⲥ ⲩ̀ⲯⲓⲥⲧⲓⲥ.\n\nⲰⲥⲁⲛⲛⲁ ⲃⲁⲥⲓⲗⲓ ⲧⲟⲩ Ⲓⲥⲣⲁⲏⲗ ⲡⲁⲗⲓⲛ ⲃⲁⲥⲓⲗⲓ ⲧⲟⲩ Ⲓⲥⲣⲁⲏⲗ.\n\nⲦⲉⲛⲉⲣⲯⲁⲗⲓⲛ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ̀ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ ⲡⲓⲱ̀ⲟⲩ ⲫⲁ Ⲡⲉⲛⲛⲟⲩϯ ⲡⲉ ⲡⲁⲗⲓⲛ ⲡⲓⲱ̀ⲟⲩ Ⲡⲉⲛⲛⲟⲩϯ ⲡⲉ." },
            { language: 'englishCoptic', audio: "alhan-palm-evlogymenos.mp3", text: "Eulogimenos o erkhomenos en onomati kuriou palin en onomati kuriou.\n\nŌsanna tō ui-ō Dauid palin tō ui-ō Dauid.\n\nŌsanna en tis upsistis palin en tis upsistis.\n\nŌsanna vasili tou Israēl palin vasili tou Israēl.\n\nTenerpsalin enjō emmos\n\nAllēloui-a allēlouia allēlouia pi-ōou fa Pennouti pe palin pi-ōou Pennouti pe." },
            { language: 'english', text: "Blessed is He who comes in the Name of the Lord; again in the Name of the Lord.\n\nHosanna to the Son of David; again to the Son of David.\n\nHosanna in the highest; again in the highest.\n\nHosanna to the King of Israel; again to the King of Israel .\n\nLet us praise saying:\n\nAlleluia, Alleluia, Alleluia. Glory be to our God, and glory be to our God." },
          ],
        },
        {
          id: "palmsunday-vespers-gospel-response",
          title: "Ⲭⲉⲣⲉ Ⲗⲁⲍⲁⲣⲟⲥ (Gospel Response)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-vespers-gospel-reply.mp3", text: "Ⲭⲉⲣⲉ Ⲗⲁⲍⲁⲣⲟⲥ ⲫⲏⲉⲧⲁϥⲧⲟⲩⲛⲟⲥϥ ⲙⲉⲛⲉⲛⲥⲁ ϥ̀ⲧⲟⲟⲩ (ⲇ̅) ⲛ̀ⲉ̀ϩⲟⲟⲩ ⲙⲁⲧⲟⲩⲛⲟⲥ ⲡⲁϩⲏⲧ Ⲡⲁ⳪ Ⲓ̅ⲏ̅ⲥ̅ ⲫⲏⲉ̀ⲧⲁϥϧⲟⲑⲃⲉϥ ⲛ̀ϫⲉ ⲡⲓⲡⲉⲧϩⲱⲟⲩ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-vespers-gospel-reply.mp3", text: "Shere Lazaros fēetaftounosf menensa eftoou (d) enehoou matounos pahēt Patshois Iēsous fē-etafkhothvef enje pipethōou." },
            { language: 'english', text: "Hail to Lazarus whom He raised, after four days, raise my heart O my Lord Jesus, which evil has slain." },
          ],
        },
      ],
    },
    {
      id: "palmsunday-matins",
      title: "Matins",
      hymns: [
        {
          id: "palmsunday-matins-verses-of-the-cymbals",
          title: "Ⲱⲥⲁⲛⲛⲁ (Verses of the Cymbals)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-cymbals.mp3", text: "Ⲱⲥⲁⲛⲛⲁ ϧⲉⲛ ⲛⲏⲉⲧϭⲟⲥⲓ ⲫⲁⲓ ⲡⲉ ⲡ̀ⲟⲩⲣⲟ ⲙ̀ⲡⲒⲥⲣⲁⲏⲗ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲫⲏⲉⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ⳪ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ.\n\nⲪⲏⲉⲧϩⲉⲙⲥⲓ ϩⲓϫⲉⲛ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ ⲁϥⲧⲁⲗⲟϥ ⲉ̀ⲟⲩⲉ̀ⲱ̀ ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲟⲩ ⲡⲉ ⲡⲁⲓⲛⲓϣϯ ⲛ̀ⲑⲉⲃⲓⲟ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-cymbals.mp3", text: "Ōsanna khen nēettshosi fai pe epouro emp-Israēl efesmarōout enje fēethnēou khen efran em-Ptshois ente nijom.\n\nFēethemsi hijen ni-Kherouvim aftalof eou-e-ō afshe ekhoun e-Ierousalēm ou pe painishti enthevio." },
            { language: 'english', text: "Hosanna in the highest, this is the King of Israel, blessed is He who comes in the Name, of the Lord of Hosts.\n\nHe who sits upon the Cherubim, sat on a donkey, He came into Jerusalem, what is this great humility." },
          ],
        },
        {
          id: "palmsunday-matins-doxology",
          title: "Ⲁⲣⲓⲥⲁⲗⲡⲓⲍⲓⲛ (Doxology)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-doxology.mp3", text: "Ⲁⲣⲓⲥⲁⲗⲡⲓⲍⲓⲛ ϧⲉⲛ ⲟⲩⲥⲟⲩⲁⲓ ϧⲉⲛ ⲟⲩⲥ̀ⲙⲏ ⲛ̀ⲥⲁⲗⲡⲓⲅⲅⲟⲥ ϧⲉⲛ ⲟⲩⲉ̀ϩⲟⲟⲩ ⲛ̀ⲛⲉⲧⲉⲛϣⲁⲓ ϫⲉ ⲟⲩⲁϩⲥⲁϩⲛⲓ ⲛ̀Ⲑⲉⲟⲥ.\n\n+ Ⲫⲏⲉⲧϩⲉⲙⲥⲓ ϩⲓϫⲉⲛ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ ⲁϥⲧⲁⲗⲟϥ ⲉ̀ⲟⲩⲉ̀ⲱ̀ ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲟⲩⲡⲉ ⲡⲁⲓⲛⲓϣϯ ⲛ̀ⲑⲉⲃⲓⲟ.\n\nⲔⲁⲧⲁ ⲫ̀ⲣⲏϯ ⲉ̀ⲧⲁϥϫⲟⲥ ⲛ̀ϫⲉ Ⲇⲁⲩⲓⲇ ϧⲉⲛ ⲡⲓⲯⲁⲗⲙⲟⲥ ϫⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲫⲏⲉ̀ⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ̀⳪ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ.\n\n+ Ⲡⲁⲗⲓⲛ ⲟⲛ ⲁϥϫⲱ ⲙ̀ⲙⲟⲥ ϫⲉ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲣⲱⲟⲩ ⲛ̀ϩⲁⲛⲕⲟⲩϫⲓ ⲛ̀ⲁ̀ⲗⲱⲟⲩⲓ ⲛⲉⲙ ⲛⲏⲉⲑⲟⲩⲉⲙϭⲓ ⲛ̀ⲑⲟⲕ ⲁⲕⲥⲉⲃⲧⲉ ⲡⲓⲥ̀ⲙⲟⲩ.\n\nⲦⲟⲧⲉ ⲁϥϫⲱⲕ ⲉ̀ⲃⲟⲗ ⲙ̀ⲡⲓⲥⲁϫⲓ ⲛ̀ⲧⲉ Ⲇⲁⲩⲓⲇ ⲡⲓⲡ̀ⲛⲉⲩⲙⲁⲧⲟⲫⲟⲣⲟⲥ ϫⲉ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲣⲱⲟⲩ ⲛ̀ϩⲁⲛⲕⲟⲩϫⲓ ⲛ̀ⲁ̀ⲗⲱⲟⲩⲓ ⲙ̀ⲡⲁⲓⲣⲏϯ ⲉϥϫⲱ ⲙ̀ⲙⲟⲥ.\n\n+ Ⲥⲉϩⲱⲥ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲟⲩⲛⲉϩⲥⲓ ⲁⲩϫⲉ ⲫⲁⲓ ⲡⲉ Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ ⲱⲥⲁⲛⲛⲁ ϧⲉⲛ ⲛⲏⲉⲧϭⲟⲥⲓ ⲫⲁⲓ ⲡⲉ ⲡ̀ⲟⲩⲣⲟ ⲙ̀ⲡⲒⲥⲣⲁⲏⲗ.\n\nⲀⲛⲓⲟⲩⲓ̀ ⲙ̀Ⲡ̀⳪ ⲛⲓϣⲏⲣⲓ ⲛ̀ⲧⲉ Ⲫ̀ⲛⲟⲩϯ ⲁ̀ⲛⲓⲟⲩⲓ ⲙ̀Ⲡ̀⳪ ⲛ̀ⲟⲩⲱ̀ⲟⲩ ⲛⲉⲙ ⲟⲩⲧⲁⲓⲟ̀ ⲉ̀ϣⲗⲏⲗⲟⲩⲓ̀ ⲉ̀ⲃⲟⲗ ⲙ̀ⲡⲉⲛⲛⲟⲩϯ ϧⲉⲛ ϩⲁⲛⲇⲟⲝⲟⲗⲟⲅⲓⲁ ⲛ̀ⲥ̀ⲙⲟⲩ.\n\n+ Ⲛ̀ⲑⲟⲕ Ⲫ̀ⲛⲟⲩϯ ϥ̀ⲉⲣϣⲁⲩ ⲛⲁⲕ ⲛ̀ϫⲉ ⲡⲓϫⲱ ϧⲉⲛ Ⲥⲓⲱⲛ ⲛⲉⲙ Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲉⲩⲉ̀ϯ ⲛⲁⲕ ⲛ̀ϩⲁⲛⲉⲩⲭⲏ ϣⲁ ⲛⲓⲉ̀ⲱⲛ.\n\nⲰⲥⲁⲛⲛⲁ ϧⲉⲛ ⲛⲏⲉ̀ⲧϭⲟⲥⲓ ⲫⲁⲓ ⲡⲉ ⲡ̀ⲟⲩⲣⲟ ⲙ̀ⲡⲒⲥⲣⲁⲏⲗ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲫⲏⲉ̀ⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ̀⳪ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ.\n\n+ Ⲧⲉⲛϩⲱⲥ ⲉ̀ⲣⲟϥ ⲧⲉⲛϯⲱ̀ⲟⲩ ⲛⲁϥ ⲧⲉⲛⲉⲣϩⲟⲩⲟ̀ ϭⲓⲥⲓ ⲙ̀ⲙⲟϥ ϩⲱⲥ ⲁ̀ⲅⲁⲑⲟⲥ ⲟⲩⲟϩ ⲙ̀ⲙⲁⲓⲣⲱⲙⲓ ⲛⲁⲓ ⲛⲁⲛ ⲕⲁⲧⲁ ⲡⲉⲕⲛⲓϣϯ ⲛ̀ⲛⲁⲓ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-doxology.mp3", text: "Arisalpizin khen ousouai khen ou-esmē ensalpiggos khen ou-ehoou ennetenshai je ouahsahni en-Theos.\n\n+ Fēethemsi hijen ni-Kherouvim aftalof eou-e-ō afshe ekhoun e-Ierousalēm oupe painishti enthevio.\n\nKata efrēti etafjos enje Dauid khen pipsalmos je efesmarōout enje fē-ethnēou khen efran em-Eptshois ente nijom.\n\n+ Palin on afjō emmos je evolkhen rōou enhankouji enalōoui nem nēethouemtshi enthok aksebte pi-esmou.\n\nTote afjōk evol empisaji ente Dauid pi-epneumatoforos je evolkhen rōou enhankouji enalōoui empairēti efjō emmos.\n\n+ Sehōs erof khen ounehsi auje fai pe Emmanouēl ōsanna khen nēettshosi fai pe epouro emp-Israēl.\n\nAniou-i em-Eptshois nishēri ente Efnouti anioui em-Eptshois enou-ōou nem outai-o eshlēlou-i evol empennouti khen handoksologia enesmou.\n\n+ Enthok Efnouti efershau nak enje pijō khen Siōn nem Ierousalēm eu-eti nak enhaneukhē sha ni-eōn.\n\nŌsanna khen nē-ettshosi fai pe epouro emp-Israēl efesmarōout enje fē-ethnēou khen efran em-Eptshois ente nijom.\n\n+ Tenhōs erof tenti-ōou naf tenerhou-o tshisi emmof hōs agathos ouoh emmairōmi nai nan kata peknishti ennai." },
            { language: 'english', text: "Blow the trumpet at the new moon, with the sound of the instruments, on your festive day, for it is an order from God.\n\n+ He who sits upon the Cherubim, sat on a donkey, He came into Jerusalem, what is this great humility.\n\nAs David has said, in the Book of the Psalms, \"Blessed is He who comes in the Name, of the Lord of Hosts.\n\n+ And again he said, \"Out of the mouths of babes, and suckling infants, You have perfected praise.\n\nThen David the Spirit Bearer, completed his saying, \"Out of the mouths of babes, and suckling infants likewise say.\n\n+ They praise Him watchfully, saying \"This is Emmanuel, hosanna in the highest, this is the King of Israel.\"\n\nAscribe to the Lord O sons of God, ascribe to the Lord glory and honor, rejoice in our God, with doxologies of blessing.\n\n+ Praise is due to You O God, in Zion and Jerusalem, they send to You prayers, unto the ages.\n\nHosanna in the highest, this is the King of Israel, blessed is He who comes in the Name, of the Lord of Hosts.\n\n+ We praise and glorify Him, and exalt Him above all, as a Good One and Lover of Man, have mercy upon us according to Your great mercy." },
          ],
        },
        {
          id: "palmsunday-matins-gospel-response",
          title: "Ⲧ̀ⲫⲁϣⲓ (Gospel Response)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-matins-gospel-reply.mp3", text: "Ⲧ̀ⲫⲁϣⲓ ⲛ̀ⲛⲓϩⲩⲡⲁⲣⲭⲱⲛⲧⲁ ⲡⲉϫⲉ Ⲍⲁⲕⲕⲉⲟⲥ ⲙ̀ⲡⲉϥ⳪ ϯⲛⲁⲧⲏⲓϥ ⲱ̀ⲇⲉⲥⲡⲟⲧⲁ ⲛ̀ⲛⲓϩⲏⲕⲓ ϧⲉⲛ ϣ̀ⲣⲱⲓⲥ.\n\nⲒⲥ ⲡⲓⲟⲩϫⲁⲓ ⲁϥϣⲱⲡⲓ ⲛⲁⲕ ⲡⲉ ϫⲉ Ⲡ⳪ Ⲫϯ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ ⲙ̀ⲫⲟⲟⲩ ⲅⲁⲣ ϫⲉ ⲛ̀ⲑⲟⲕ ϩⲱⲕ ⲟⲩϣⲏⲣⲓ ⲛ̀ⲧⲉ Ⲁⲃⲣⲁⲁⲙ.\n\nϪⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ..." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-matins-gospel-reply.mp3", text: "Etfashi ennihuparkhōnta peje Zakkeos empeftshois tinatēif ōdespota ennihēki khen eshrōis.\n\nIs pioujai afshōpi nak pe je Ptshois Efnouti ente nijom emfoou gar je enthok hōk oushēri ente Abraam.\n\nJe efesmarōout..." },
            { language: 'english', text: "The half of my goods, said Zacchaeus to his Lord, I give O Master, to the poor with care.\n\nSalvation has come unto you today, replied the Lord God of Hosts, because you are also, the son of Abraham.\n\nBlassed..." },
          ],
        },
      ],
    },
    {
      id: "palmsunday-procession",
      title: "Procession",
      hymns: [
        {
          id: "palmsunday-procession-refrain",
          title: "Ⲱⲥⲁⲛⲛⲁ (Refrain)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-refrain.mp3", text: "Ⲱⲥⲁⲛⲛⲁ ϧⲉⲛ ⲛⲏⲉⲧϭⲟⲥⲓ ⲫⲁⲓ ⲡⲉ ⲡ̀ⲟⲩⲣⲟ ⲙ̀ⲡⲒⲥⲣⲁⲏⲗ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲫⲏⲉⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ̀⳪ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-refrain.mp3", text: "Ōsanna khen nēettshosi fai pe epouro emp-Israēl efesmarōout enje fēethnēou khen efran em-Eptshois ente nijom." },
            { language: 'english', text: "Hosanna in the highest, this is the King of Israel, blessed is He who comes in the Name, of the Lord of Hosts." },
          ],
        },
        {
          id: "palmsunday-procession-main-sanctuary",
          title: "Ⲡⲓϥ̀ⲧⲟⲟⲩ ⲛ̀ⲍⲱⲟⲛ (Main Sanctuary)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-main-sanc.mp3", text: "Ⲡⲓϥ̀ⲧⲟⲟⲩ ⲛ̀ⲍⲱⲟⲛ ⲛ̀ⲁ̀ⲥⲱⲙⲁⲧⲟⲥ ⲉⲧϥⲁⲓ ϧⲁ ⲡⲓϩⲁⲣⲙⲁ ⲛ̀ⲧⲉ Ⲫϯ ⲟⲩϩⲟ ⲙ̀ⲙⲟⲩⲓ̀ ⲛⲉⲙ ⲟⲩϩⲟ ⲙ̀ⲙⲁⲥⲓ ⲟⲩϩⲟ ⲛ̀ⲣⲱⲙⲓ ⲛⲉⲙ ⲟⲩϩⲟ ⲛ̀ⲁ̀ⲏⲧⲟⲥ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-main-sanc.mp3", text: "Pi-eftoou enzōon enasōmatos etfai kha piharma ente Efnouti ouho emmou-i nem ouho emmasi ouho enrōmi nem ouho enaētos." },
            { language: 'english', text: "The four Incorporeal Beasts, carrying the throne of God, a face of lion a face of a calf, a face of human and a face of an angel." },
          ],
        },
        {
          id: "palmsunday-procession-st-mary",
          title: "Ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ (St Mary)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-mary.mp3", text: "Ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ ϧⲉⲛ ⲟⲩⲉⲙⲡ̀ϣⲁ ⲛⲉⲙ Ⲉ̀ⲗⲓⲥⲁⲃⲉⲧ ⲧⲉⲥⲩⲅⲅⲉⲛⲏⲥ ϫⲉ ⲧⲉⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ⲑⲟ ϧⲉⲛ ⲛⲓϩⲓⲟ̀ⲙⲓ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲡ̀ⲟⲩⲧⲁϩ ⲛ̀ⲧⲉ ⲧⲉⲛⲉϫⲓ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-mary.mp3", text: "Tentshisi emmo khen ouemepsha nem Elisavet tesuggenēs je te-esmarōout entho khen nihi-omi efesmarōout enje epoutah ente teneji." },
            { language: 'english', text: "We indeed exalt you, with your cousin Elizabeth, saying \"Blessed are you among women, and blessed is the fruit of your womb.\"" },
          ],
        },
        {
          id: "palmsunday-procession-archangel-gabriel",
          title: "Ⲅⲁⲃⲣⲓⲏⲗ (Archangel Gabriel)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-gabriel.mp3", text: "Ⲅⲁⲃⲣⲓⲏⲗ ⲡⲓⲁ̀ⲅⲅⲉⲗⲟⲥ ⲁϥⲛⲁⲩ ⲉ̀ⲣⲟϥ ⲛ̀ϫⲉ Ⲇⲁⲛⲓⲏⲗ ⲉϥⲟ̀ϩⲓ ⲉ̀ⲣⲁⲧϥ ϩⲓϫⲉⲛ ⲛⲉϥⲫⲁⲧ ϩⲓϫⲉⲛ ⲛⲉⲛⲥ̀ⲫⲟⲧⲟⲩ ⲙ̀ⲫ̀ⲓⲁⲣⲟ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-gabriel.mp3", text: "Gabriēl pi-aggelos afnau erof enje Daniēl efohi eratf hijen neffat hijen nenesfotou emefiaro." },
            { language: 'english', text: "The Angel Gabriel, was seen by Daniel, standing on his feet, on the banks of the river." },
          ],
        },
        {
          id: "palmsunday-procession-archangel-michael",
          title: "Ⲙⲓⲭⲁⲏⲗ (Archangel Michael)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-mikhail.mp3", text: "Ⲙⲓⲭⲁⲏⲗ ⲡ̀ⲁ̀ⲣⲭⲱⲛ ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟⲩⲓ̀ ⲛ̀ⲑⲟϥ ⲉⲧⲟⲓ ⲛ̀ϣⲟⲣⲡ ϧⲉⲛ ⲛⲓⲧⲁⲝⲓⲥ ⲛ̀ⲁ̀ⲅⲅⲉⲗⲓⲕⲟⲛ ⲉϥϣⲉⲙϣⲓ ⲙ̀ⲡⲉⲙ̀ⲑⲟ ⲙ̀Ⲡ⳪." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-mikhail.mp3", text: "Mikhaēl eparkhōn enna nifēou-i enthof etoi enshorp khen nitaksis enaggelikon efshemshi empe-emtho em-Ptshois." },
            { language: 'english', text: "Michael the head of the heavenly, you are the first, in the angelic orders, serving in the presence of the Lord." },
          ],
        },
        {
          id: "palmsunday-procession-st-mark",
          title: "Ⲙⲁⲣⲕⲟⲥ (St Mark)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-mark.mp3", text: "Ⲙⲁⲣⲕⲟⲥ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ ⲟⲩⲟϩ ⲡⲓⲉ̀ⲩⲁ̀ⲅⲅⲉⲗⲓⲥⲧⲏⲥ ⲡⲓⲙⲉⲑⲣⲉ ϧⲁ ⲛⲓⲙ̀ⲕⲁⲩϩ ⲛ̀ⲧⲉ ⲡⲓⲙⲟⲛⲟⲅⲉⲛⲏⲥ Ⲛ̀ⲛⲟⲩϯ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-mark.mp3", text: "Markos pi-apostolos ouoh pi-eu-aggelistēs pimethre kha ni-emkauh ente pimonogenēs Ennouti." },
            { language: 'english', text: "Mark the Apostle, and the Evangelist, the witness of the passion, of the only-begotten God." },
          ],
        },
        {
          id: "palmsunday-procession-the-apostles",
          title: "Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ (The Apostles)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-apostles.mp3", text: "Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲁϥⲟⲩⲱⲣⲡ ⲙ̀ⲙⲱⲧⲉⲛ ⲱ̀ⲡⲓⲙⲏⲧⲥ̀ⲛⲁⲩ (ⲓ̅ⲃ̅) ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ ⲉ̀ⲧⲉⲧⲉⲛ ϩⲓⲱⲓϣ ϧⲉⲛ ⲛⲓⲉⲑⲛⲟⲥ ⲉ̀ⲣⲉⲧⲉⲛ ⲁⲓⲧⲟⲩ ⲛ̀ⲭ̀ⲣⲏⲥⲧⲓⲁ̀ⲛⲟⲥ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-apostles.mp3", text: "Iēsous Pi-ekhristos afouōrp emmōten ōpimētesnau (ib) enapostolos eteten hiōish khen niethnos ereten aitou enekhrēsti-anos." },
            { language: 'english', text: "Jesus Christ sent you, O twelve Apostles, to preach in the nations, and to convert them to Christianity." },
          ],
        },
        {
          id: "palmsunday-procession-st-george",
          title: "Ϣⲁϣϥ ⲛ̀ⲣⲟⲙⲡⲓ (St George)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-martyr.mp3", text: "Ϣⲁϣϥ ⲛ̀ⲣⲟⲙⲡⲓ ⲁϥϫⲟⲕⲟⲩ ⲉ̀ⲃⲟⲗ ⲛ̀ϫⲉ ⲫⲏⲉ̅ⲑ̅ⲩ̅ Ⲅⲉⲱⲣⲅⲓⲟⲥ ⲉ̀ⲣⲉ ⲡⲓϣ̀ⲃⲉ ⲛ̀ⲟⲩⲣⲟ ⲛ̀ⲁⲛⲟⲙⲟⲥ ⲉⲩϯϩⲁⲡ ⲉⲣⲟϥ ⲙ̀ⲙⲏⲛⲓ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-martyr.mp3", text: "Shashf enrompi afjokou evol enje fēethouab Geōrgios ere pi-eshve enouro enanomos eutihap erof emmēni." },
            { language: 'english', text: "For seven whole years, Saint George endured, Seventy impious kings, Judging him every day." },
          ],
        },
        {
          id: "palmsunday-procession-st-anthony",
          title: "Ⲃⲱⲗ ⲉ̀ⲃⲟⲗ (St Anthony)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-antony.mp3", text: "Ⲃⲱⲗ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲉⲧⲉⲛϩⲏⲧ ⲛ̀ⲛⲓⲙⲟⲕⲙⲉⲕ ⲛ̀ⲧⲉ ϯⲭⲁⲕⲓ̀ⲁ ⲛⲉⲙ ⲛⲓⲙⲉⲩⲓ̀ ⲉⲧϣⲉⲃϣⲱⲃ ⲉⲧⲓ̀ⲣⲓ ⲙ̀ⲡⲓⲛⲟⲩⲥ ⲛ̀ⲭⲁⲕⲓ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-antony.mp3", text: "Vōl evol khen netenhēt ennimokmek ente tikhakia nem nimeu-i etshebshōb etiri empinous enkhaki." },
            { language: 'english', text: "Remove from your hearts, all the evil thoughts, and the deceiving suspicions, that darken the mind." },
          ],
        },
        {
          id: "palmsunday-procession-northern-door",
          title: "Ⲁⲕϣⲁⲛⲓ̀ (Northern door)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-ndoor.mp3", text: "Ⲁⲕϣⲁⲛⲓ̀ ϧⲉⲛ ⲧⲉⲕⲙⲁϩⲥ̀ⲛⲟⲩϯ ⲙ̀ⲡⲁⲣⲟⲩⲥⲓⲁ̀ ⲉⲧⲟⲓ ⲛ̀ϩⲟϯ ⲙ̀ⲡⲉⲛⲑ̀ⲣⲉⲛⲥⲱⲧⲉⲙ ϧⲉⲛ ⲟⲩⲥ̀ⲑⲉⲣ-ⲧⲉⲣ ϫⲉ ϯⲥⲱⲟⲩⲛ ⲙ̀ⲙⲱⲧⲉⲛ ⲁⲛ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-ndoor.mp3", text: "Akshani khen tekmahesnouti emparousi-a etoi enhoti empenethrensōtem khen ou-esther-ter je tisōoun emmōten an." },
            { language: 'english', text: "And when You come again, in Your fearful appearance, may we never hear You say, \"I do not know you.\"" },
          ],
        },
        {
          id: "palmsunday-procession-baptismal",
          title: "Ⲁϥⲉⲣⲙⲉⲑⲣⲉ (Baptismal)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-baptism.mp3", text: "Ⲁϥⲉⲣⲙⲉⲑⲣⲉ ⲛ̀ϫⲉ Ⲓⲱⲁⲛⲛⲏⲥ ϧⲉⲛ ⲡⲓϥ̀ⲧⲟⲟⲩ (ⲇ̅) ⲛ̀ⲉ̀ⲩⲁ̀ⲅⲅⲉⲗⲓⲟⲛ ϫⲉ ⲁⲓϯⲱⲙⲥ ⲙ̀ⲡⲁⲤⲱⲧⲏⲣ ϧⲉⲛ ⲛⲓⲙⲱⲟⲩ ⲛ̀ⲧⲉ ⲡⲓⲒⲟⲣⲇⲁⲛⲏⲥ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-baptism.mp3", text: "Afermethre enje Iōannēs khen pi-eftoou (d) eneu-aggelion je aitiōms empa-Sōtēr khen nimōou ente pi-Iordanēs." },
            { language: 'english', text: "John witnessed, in the four gospels, \"I baptized my Savior, in the waters of the Jordan.\"" },
          ],
        },
        {
          id: "palmsunday-procession-southern-door",
          title: "Ⲫⲏⲉⲧϩⲉⲙⲥⲓ (Southern door)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-sdoor.mp3", text: "Ⲫⲏⲉⲧϩⲉⲙⲥⲓ ϩⲓϫⲉⲛ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ ϩⲓϫⲉⲛ ⲡⲓⲑ̀ⲣⲟⲛⲟⲥ ⲛ̀ⲧⲉ ⲡⲉϥⲱ̀ⲟⲩ  ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲟⲩⲡⲉ ⲡⲁⲓⲛⲓϣϯ ⲛ̀ⲑⲉⲃⲓⲟ̀." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-sdoor.mp3", text: "Fēethemsi hijen ni-Kherouvim hijen pi-ethronos ente pefōou  afshe ekhoun e-Ierousalēm oupe painishti enthevi-o." },
            { language: 'english', text: "He who sits upon the Cherubim, on the throne of His glory, He entered Jerusalem, such a great modesty." },
          ],
        },
        {
          id: "palmsunday-procession-st-john-the-baptist",
          title: "Ⲙⲡⲉ ⲟⲩⲟⲛ ⲧⲱⲛϥ (St John the Baptist)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-pmatin-john.mp3", text: "Ⲙⲡⲉ ⲟⲩⲟⲛ ⲧⲱⲛϥ ϧⲉⲛ ⲛⲓϫⲓⲛⲙⲓⲥⲓ ⲛ̀ⲧⲉ ⲛⲓϩⲓⲟⲙⲓ ⲉϥⲟⲛⲓ ⲙ̀ⲙⲟⲕ ⲛ̀ⲑⲟⲕ ⲟⲩⲛⲓϣϯ ϧⲉⲛ ⲛⲏⲉ̅ⲑ̅ⲩ̅ ⲧⲏⲣⲟⲩ Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲓⲣⲉϥϯⲱⲙⲥ." },
            { language: 'englishCoptic', audio: "alhan-palm-pmatin-john.mp3", text: "Mpe ouon tōnf khen nijinmisi ente nihiomi efoni emmok enthok ounishti khen nēethouab tērou Iōannēs pireftiōms." },
            { language: 'english', text: "Among those born of women, no one is like you, you are great among the saints, O John the Baptist." },
          ],
        },
      ],
    },
    {
      id: "palmsunday-liturgy",
      title: "Liturgy",
      hymns: [
        {
          id: "palmsunday-liturgy-praxis-response",
          title: "Ⲱⲥⲁⲛⲛⲁ (Praxis Response)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-epraxis.mp3", text: "Ⲱⲥⲁⲛⲛⲁ ϧⲉⲛ ⲛⲏⲉ̀ⲧϭⲟⲥⲓ ⲫⲁⲓ ⲡⲉ ⲡ̀ⲟⲩⲣⲟ ⲙ̀ⲡⲒⲥⲣⲁⲏⲗ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟ̀ⲩⲧ ⲛ̀ϫⲉ ⲫⲏⲉ̀ⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ⳪ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ.\n\nⲔ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲁ̀ⲗⲏⲑⲱⲥ ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ϫⲉ ⲁⲕⲓ̀ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ. Ⲛⲁⲓ ⲛⲁⲛ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-epraxis.mp3", text: "Ōsanna khen nē-ettshosi fai pe epouro emp-Israēl efesmarō-out enje fē-ethnēou khen efran em-Ptshois ente nijom.\n\nEkesmarōout alēthōs nem Pekiōt enagathos nem Pi-epneuma ethouab je aki aksōti emmon. Nai nan." },
            { language: 'english', text: "Hosanna in the highest, this is the King of Israel, blessed is He who comes in the Name, of the Lord of Hosts.\n\nBlessed are You indeed, with Your good Father and the Holy Spirit, for You have come and saved us. Have mercy on us." },
          ],
        },
        {
          id: "palmsunday-liturgy-feeethemcy",
          title: "Ⲫⲏⲉⲧϩⲉⲙⲥⲓ (FeeEthemcy)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-feethemsy.mp3", text: "Ⲫⲏⲉⲧϩⲉⲙⲥⲓ ϩⲓϫⲉⲛ ⲛⲓⲬⲉⲣⲟⲩⲃⲓⲙ ⲁϥⲧⲁⲗⲏⲟⲩⲧ ⲉ̀ⲟⲩⲉ̀ⲱ̀ ⲁϥϣⲉ ⲉ̀ϧⲟⲩⲛ ⲉ̀Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ ⲟⲩ ⲡⲉ ⲡⲁⲓⲛⲓϣϯ ⲛ̀ⲑⲉⲃⲓⲟ.\n\nⲤⲉϩⲱⲥ ⲉ̀ⲣⲟϥ ϧⲉⲛ ⲟⲩⲛⲉϩⲥⲓ ⲁⲩϫⲉ ⲫⲁⲓ ⲡⲉ Ⲉⲙⲙⲁⲛⲟⲩⲏⲗ ⲱ̀ⲥⲁⲛⲛⲁ ϧⲉⲛ ⲛⲏⲉⲧϭⲟⲥⲓ ⲫⲁⲓ ⲡⲉ ⲡ̀ⲟⲩⲣⲟ ⲙ̀ⲡⲒⲥⲣⲁⲏⲗ.\n\nⲘⲁⲣⲉⲛϫⲟⲥ ⲛⲉⲙ Ⲇⲁⲩⲓⲇ ⲡⲓϩⲩⲙⲛⲟⲇⲟⲥ ϫⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲫⲏⲉⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ⳪ ⲡⲓⲁⲅⲁⲑⲟⲥ ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ϣⲁ ⲧ̀ϧⲁⲉ̀ ⲛ̀ⲛⲓⲥⲏⲟⲩ.\n\nⲚⲓⲬⲉⲣⲟⲩⲃⲓⲙ ⲛⲉⲙ ⲛⲓⲤⲉⲣⲁⲫⲓⲙ ⲛⲓⲁ̀ⲅⲅⲉⲗⲟⲥ ⲛⲉⲙ ⲛⲓ̀ⲁⲣⲭⲏⲁ̀ⲅⲅⲉⲗⲟⲥ ⲛⲓⲥⲧⲣⲁⲧⲓⲁ̀ ⲛⲉⲙ ⲛⲓⲉ̀ⲝⲟⲩⲥⲓⲁ̀ ⲛⲓⲑ̀ⲣⲟⲛⲟⲥ ⲛⲓⲙⲉⲧ ϭⲟⲓⲥ ⲛⲓϫⲟⲙ.\n\nⲈⲩⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲩϫⲱ ⲙ̀ⲙⲟⲥ ϫⲉ ⲟⲩⲱ̀ⲟⲩ ⲙ̀Ⲫϯ ϧⲉⲛ ⲛⲏⲉⲧϭⲟⲥⲓ ⲛⲉⲙ ⲟⲩϩⲓⲣⲏⲛⲏ ϩⲓϫⲉⲛ ⲡⲓⲕⲁϩⲓ ⲛⲉⲙ ⲟⲩϯⲙⲁϯ ϧⲉⲛ ⲛⲓⲣⲱⲙⲓ." },
            { language: 'englishCoptic', audio: "alhan-palm-feethemsy.mp3", text: "Fēethemsi hijen ni-Kherouvim aftalēout eou-e-ō afshe ekhoun e-Ierousalēm ou pe painishti enthevio.\n\nSehōs erof khen ounehsi auje fai pe Emmanouēl ōsanna khen nēettshosi fai pe epouro emp-Israēl.\n\nMarenjos nem Dauid pihumnodos je efesmarōout enje fēethnēou khen efran em-Ptshois piagathos isjen tinou sha etkha-e ennisēou.\n\nNi-Kherouvim nem ni-Serafim ni-aggelos nem niarkhē-aggelos nistrati-a nem ni-eksousi-a ni-ethronos nimet tshois nijom.\n\nEuōsh evol eujō emmos je ou-ōou em-Efnouti khen nēettshosi nem ouhirēnē hijen pikahi nem outimati khen nirōmi." },
            { language: 'english', text: "He who sits upon the Cherubim, rode a colt and entered Jerusalem, O what great humility.\n\nThey praise Him with alertness saying, \"This is Emmanuel, hosanna in the highest, this is the King of Israel.\"\n\nLet us say with David the chanter, \"Blessed is He who comes, in the Name of the Good Lord, from now and till the end of the ages.\"\n\nThe Cherubim and the Seraphim, the angels and the archangels, the principalities and the authorities, the thrones and the powers.\n\nProclaiming and saying: Glory to God in the highest, peace on Earth and goodwill toward men." },
          ],
        },
        {
          id: "palmsunday-liturgy-evlogymenos",
          title: "Ⲉⲩⲗⲟⲅⲓⲙⲉⲛⲟⲥ (Evlogymenos)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-evlogymenos.mp3", text: "Ⲉⲩⲗⲟⲅⲓⲙⲉⲛⲟⲥ ⲟ̀ ⲉⲣⲭⲟⲙⲉⲛⲟⲥ ⲉⲛ ⲟ̀ⲛⲟⲙⲁⲧⲓ ⲕⲩⲣⲓⲟⲩ ⲡⲁⲗⲓⲛ ⲉⲛ ⲟ̀ⲛⲟⲙⲁⲧⲓ ⲕⲩⲣⲓⲟⲩ.\n\nⲰⲥⲁⲛⲛⲁ ⲧⲱ ⲩ̀ⲓⲱ̀ Ⲇⲁⲩⲓⲇ ⲡⲁⲗⲓⲛ ⲧⲱ ⲩ̀ⲓⲱ̀ Ⲇⲁⲩⲓⲇ.\n\nⲰⲥⲁⲛⲛⲁ ⲉⲛ ⲧⲓⲥ ⲩ̀ⲯⲓⲥⲧⲓⲥ ⲡⲁⲗⲓⲛ ⲉⲛ ⲧⲓⲥ ⲩ̀ⲯⲓⲥⲧⲓⲥ.\n\nⲰⲥⲁⲛⲛⲁ ⲃⲁⲥⲓⲗⲓ ⲧⲟⲩ Ⲓⲥⲣⲁⲏⲗ ⲡⲁⲗⲓⲛ ⲃⲁⲥⲓⲗⲓ ⲧⲟⲩ Ⲓⲥⲣⲁⲏⲗ.\n\nⲦⲉⲛⲉⲣⲯⲁⲗⲓⲛ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ̀ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ ⲡⲓⲱ̀ⲟⲩ ⲫⲁ Ⲡⲉⲛⲛⲟⲩϯ ⲡⲉ ⲡⲁⲗⲓⲛ ⲡⲓⲱ̀ⲟⲩ Ⲡⲉⲛⲛⲟⲩϯ ⲡⲉ." },
            { language: 'englishCoptic', audio: "alhan-palm-evlogymenos.mp3", text: "Eulogimenos o erkhomenos en onomati kuriou palin en onomati kuriou.\n\nŌsanna tō ui-ō Dauid palin tō ui-ō Dauid.\n\nŌsanna en tis upsistis palin en tis upsistis.\n\nŌsanna vasili tou Israēl palin vasili tou Israēl.\n\nTenerpsalin enjō emmos\n\nAllēloui-a allēlouia allēlouia pi-ōou fa Pennouti pe palin pi-ōou Pennouti pe." },
            { language: 'english', text: "Blessed is He who comes in the Name of the Lord; again in the Name of the Lord.\n\nHosanna to the Son of David; again to the Son of David.\n\nHosanna in the highest; again in the highest.\n\nHosanna to the King of Israel; again to the King of Israel .\n\nLet us praise saying:\n\nAlleluia, Alleluia, Alleluia. Glory be to our God, and glory be to our God." },
          ],
        },
        {
          id: "palmsunday-liturgy-first-psalm-short-singary",
          title: "Ⲯⲁⲗⲙⲟⲥ 1 (First Psalm - Short Singary)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-lit-psalm1.mp3", text: "Ⲁⲣⲓⲥⲁⲗⲡⲓⲍⲓⲛ ϧⲉⲛ ⲟⲩⲥⲟⲩⲁⲓ ϧⲉⲛ ⲟⲩⲥⲁⲗⲡⲓⲅⲅⲟⲥ ϧⲉⲛ ⲟⲩⲉ̀ϩ̀ⲟⲟⲩ ⲙ̀ⲙⲏⲛⲓ ⲛ̀ⲧⲉ ⲛⲉⲧⲉⲛϣⲁⲓ Ⲑⲉⲗⲏⲗ ⲙⲁ̅ⲗ̅Ⲫ̀ⲛⲟⲩϯ ⲡⲉⲛⲃⲟⲏ̀ⲑⲟⲥ ⲉϣⲗⲏⲗⲟⲩⲓ̀ ⲉⲃⲟⲗ ⲙ̀Ⲫ̀ⲛⲟⲩϯ ⲛ̀Ⲓⲁⲕⲱⲃ ϭⲓ ⲛ̀ⲟⲩⲯⲁⲗⲧⲏⲣⲓⲟⲛ ⲟⲩⲟϩ ⲙⲟⲓ ⲛⲟⲩⲕⲉⲙⲕⲉⲙ ⲟⲩⲯⲁⲗⲧⲏⲣⲓⲟⲛ ⲉⲛⲉⲥⲱϥ ⲛⲉⲙ ⲟⲩⲕⲩⲑⲁⲣⲁ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-lit-psalm1.mp3", text: "Arisalpizin khen ousouai khen ousalpiggos khen ou-e-ehoou emmēni ente netenshai Thelēl mallēlouia-Efnouti penvo-ēthos eshlēlou-i evol em-Efnouti en-Iakōb tshi enoupsaltērion ouoh moi noukemkem oupsaltērion enesōf nem oukuthara allēlouia." },
            { language: 'english', text: "Blow the trumpet at the new moon, in the glorious day your feast. Rejoice in God our helper; shout aloud to the God of Jacob. Take a psalm, and produce the timbrel, the pleasant psaltery with the harp. Alleluia." },
          ],
        },
        {
          id: "palmsunday-liturgy-second-psalm-short-singary",
          title: "Ⲯⲁⲗⲙⲟⲥ 2 (Second Psalm - Short Singary)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-lit-psalm2.mp3", text: "Ⲛⲑⲟⲕ Ⲫ̀ⲛⲟⲩⲧ ϥ̀ⲉⲣϣⲁⲩⲛⲁⲕ ⲛϫⲉ ⲡⲓϫⲟ ϧⲉⲛ Ⲥⲓⲱⲛ ⲉⲩⲉϯⲛⲁⲕ ⲛ̀ⲟⲩⲉⲩⲭⲏ ϧⲉⲛ Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ Ⲥⲱⲧⲉⲙ Ⲫ̀ⲛⲟⲩϯ ⲉⲧⲁ ⲡ̀ⲣⲟⲥⲉⲩⲭⲏ ϫⲉ ⲥⲉⲛⲏⲟⲩ ϩⲁⲣⲟⲕ ⲛ̀ϫⲉ ⲥⲁⲣⲍ ⲛⲓⲃⲉⲛ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-lit-psalm2.mp3", text: "Nthok Efnout efershaunak nje pijo khen Siōn euetinak enoueukhē khen Ierousalēm Sōtem Efnouti eta eproseukhē je senēou harok enje sarz niven allēlouia." },
            { language: 'english', text: "To You is due praise, O God, in Zion: and to You shall a vow be rendered in Jerusalem. Listen to my prayer, for to You shall all flesh come: Alleluia." },
          ],
        },
        {
          id: "palmsunday-liturgy-second-psalm-joyful",
          title: "Ⲯⲁⲗⲙⲟⲥ 2 (Second Psalm - Joyful)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-psalm21.mp3", text: "Ⲛⲑⲟⲕ Ⲫ̀ⲛⲟⲩⲧ ϥ̀ⲉⲣϣⲁⲩⲛⲁⲕ ⲛϫⲉ ⲡⲓϫⲟ ϧⲉⲛ Ⲥⲓⲱⲛ ⲉⲩⲉϯⲛⲁⲕ ⲛ̀ⲟⲩⲉⲩⲭⲏ ϧⲉⲛ Ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ Ⲥⲱⲧⲉⲙ Ⲫ̀ⲛⲟⲩϯ ⲉⲧⲁ ⲡ̀ⲣⲟⲥⲉⲩⲭⲏ ϫⲉ ⲥⲉⲛⲏⲟⲩ ϩⲁⲣⲟⲕ ⲛ̀ϫⲉ ⲥⲁⲣⲍ ⲛⲓⲃⲉⲛ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-psalm21.mp3", text: "Nthok Efnout efershaunak nje pijo khen Siōn euetinak enoueukhē khen Ierousalēm Sōtem Efnouti eta eproseukhē je senēou harok enje sarz niven allēlouia." },
            { language: 'english', text: "To You is due praise, O God, in Zion: and to You shall a vow be rendered in Jerusalem. Listen to my prayer, for to You shall all flesh come: Alleluia." },
          ],
        },
        {
          id: "palmsunday-liturgy-gospel-1-response",
          title: "Ⲱⲥⲁⲛⲛⲁ (Gospel 1 response)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-lit-gos1.mp3", text: "Ⲱⲥⲁⲛⲛⲁ ϧⲉⲛ ⲛⲏⲉⲧϭⲟⲥⲓ ⲫⲁⲓ ⲡⲉ ⲡ̀ⲟⲩⲣⲟ ⲙ̀ⲡⲒⲥⲣⲁⲏⲗ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ ⲫⲏⲉⲑⲛⲏⲟⲩ ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲙ̀Ⲡ̀ϭⲟⲓⲥ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-lit-gos1.mp3", text: "Ōsanna khen nēettshosi fai pe epouro emp-Israēl efesmarōout enje fēethnēou khen efran em-Eptshois ente nijom." },
            { language: 'english', text: "Hosanna in the highest, this is the King of Israel, blessed is He who comes in the Name, of the Lord of Hosts." },
          ],
        },
        {
          id: "palmsunday-liturgy-gospel-2-response",
          title: "الجالس فوق الشاروبيم (Gospel 2 response)",
          versions: [
            { language: 'arabic', audio: "alhan-palm-palm-lit-gos2.mp3", text: "الجالس فوق الشاروبيم\n\nاليوم ظهر في اورشليم\n\nراكبًا على جحش بمجد عظيم\n\nوحوله طقوس ني أنجيلوس" },
            { language: 'english', text: "He, Who is sitting on the Cherubim:\n\ntoday appeared in Jerusalem:\n\nriding on a colt with great glory:\n\nand a multitude of angels surrounding Him." },
          ],
        },
        {
          id: "palmsunday-liturgy-gospel-3-response",
          title: "في الطريق فرشوا القمصان (Gospel 3 response)",
          versions: [
            { language: 'arabic', audio: "alhan-palm-palm-lit-gos3.mp3", text: "في الطريق فرشوا القمصان\n\nومن الشجر قطعوا أغصان\n\nوهم يصيحون بالألحان\n\nأوصنا ابشيري أن دافيد" },
            { language: 'english', text: "The crowds spread garments on the road:\n\nand they cut branches from the trees:\n\nwhile shouting and singing:\n\n“Hosanna to the Son of David!\"" },
          ],
        },
        {
          id: "palmsunday-liturgy-gsopel-4-response",
          title: "اليوم تمت الأقوال (Gsopel 4 response)",
          versions: [
            { language: 'arabic', audio: "alhan-palm-palm-lit-gos4.mp3", text: "اليوم تمت الأقوال\n\nمن النبوات والأمثال\n\nكما تنبأ زكريا وقال\n\nنبوة عن ايسوس بي اخرستوس" },
            { language: 'english', text: "Today these sayings have been fulfilled:\n\nas told in the prophets and proverbs:\n\nas Zechariah prophesied and said:\n\na prophecy about our Lord Jesus Christ." },
          ],
        },
      ],
    },
    {
      id: "palmsunday-general-funeral",
      title: "General Funeral",
      hymns: [
        {
          id: "palmsunday-general-funeral-pauline",
          title: "Ⲉⲑⲃⲉ ϯⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ (Pauline)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-ethvety.mp3", text: "Ⲉⲑⲃⲉ ϯⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ ⲛ̀ⲧⲉ ⲛⲓⲣⲉϥⲙⲱⲟⲩⲧ ⲉ̀ⲧⲁⲩⲉⲛⲕⲟⲩⲧ ⲁⲩⲉⲙⲧⲟⲛ ⲙ̀ⲙⲱⲟⲩ ϧⲉⲛ ⲫ̀ⲛⲁϩϯ ⲙ̀Ⲡⲭ̅ⲥ̅ Ⲡ̀⳪ ⲙⲁⲙ̀ⲧⲟⲛ ⲛ̀ⲛⲟⲩⲯⲩⲭⲏ ⲧⲏⲣⲟⲩ.\n\nⲠⲁⲩⲗⲟⲥ ⲫ̀ⲃⲱⲕ ⲙ̀ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ ⲉⲧⲑⲁϩⲉⲙ ⲫⲏⲉ̀ⲧⲁⲩⲑⲁϣϥ ⲡⲓϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛ̀ⲧⲉ Ⲫϯ.\n\nϮⲧⲁⲙⲟ ⲇⲉ ⲙ̀ⲙⲱⲧⲉⲛ ⲛⲁⲥ̀ⲛⲏⲟⲩ ⲉ̀ⲡⲓⲉⲩⲁⲅⲅⲉⲗⲓⲟⲛ ⲫⲏ ⲉⲧⲁⲓϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲙ̀ⲙⲟϥ ⲛⲱⲧⲉⲛ ⲉⲧⲉ ⲫⲏ ⲡⲉ ⲉⲧⲁⲣⲉⲧⲉⲛϭⲓⲧϥ ⲫⲁⲓ ⲉⲧⲉⲧⲉⲛⲟϩⲓ ⲉⲣⲁⲧⲉⲛ ⲑⲏⲛⲟⲩ ⲛ̀ϧⲏⲧϥ. ⲫⲁⲓ ⲟⲛ ⲉ̀ⲧⲉⲧⲉⲛⲛⲁⲛⲟϩⲉⲙ ⲉ̀ⲃⲟⲗ ϩⲓⲧⲟⲧϥ ϫⲉ ϧⲉⲛ ⲟⲩⲥⲁϫⲓ ⲁⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛⲱⲧⲉⲛ ⲓⲥϫⲉ ⲧⲉⲧⲉⲛⲁⲙⲟⲛⲓ ⲙ̀ⲙⲟϥ ⲥⲁⲃⲟⲗ ⲓⲙⲏⲧⲓ ϩⲓⲕⲏ ⲁⲣⲉⲧⲉⲛⲛⲁϩϯ. Ⲁⲓϯ ⲅⲁⲣ ⲛ̀ⲧⲉⲛ ⲑⲏⲛⲟⲩ ⲛ̀ϣⲟⲣⲡ ⲙ̀ⲫⲏ ⲉⲧⲁⲓϭⲓⲧϥ ϫⲉ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲁϥⲙⲟⲩ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲉⲛ ⲛⲉⲛⲛⲟⲃⲓ ⲕⲁⲧⲁ ⲛⲓⲅ̀ⲣⲁⲫⲏ. Ⲟⲩⲟϩ ϫⲉ ⲁⲩⲕⲟⲥϥ ⲟⲩⲟϩ ϫⲉ ⲁϥⲧⲱⲛϥ ϧⲉⲛ ⲡⲓⲉ̀ϩⲟⲟⲩ ⲙ̀ⲙⲁϩ ⲅ̅ ⲕⲁⲧⲁ ⲛⲓⲅ̀ⲣⲁⲫⲏ. Ⲟⲩⲟϩ ⲁϥⲟⲩⲟⲛϩϥ ⲉ̀Ⲕⲏⲫⲁ ⲓⲧⲁ ⲁϥⲟⲩⲟⲛϩϥ ⲉ̀ⲡⲓⲉ̅ⲑ̅ⲩ̅̅2. Ⲙⲉⲛⲉⲛⲥⲱⲥ ⲁϥⲟⲩⲟⲛϩϥ ⲥⲁⲡ̀ϣⲱⲓ ⲛ̀ⲫ̅ ⲛ̀ⲥⲟⲛ ⲉⲩⲥⲟⲡ ⲛⲁⲓ ⲉⲧⲉ ⲡⲟⲩϩⲟⲩⲟ ϣⲟⲡ ϣⲁ ⲉ̀ϧⲟⲩⲛ ⲉ̀ϯⲛⲟⲩ ϩⲁⲛⲕⲉⲭⲱⲟⲩⲛⲓ ⲇⲉ ⲁⲩⲉⲛⲕⲟⲧ. Ⲓⲧⲁ ⲁϥⲟⲩⲟⲛϩϥ ⲉⲓⲁⲕⲱⲃⲟⲥ ⲓⲧⲁ ⲁϥⲟⲩⲟⲛϩϥ ⲉ̀ⲛⲓⲁⲡⲟⲥⲧⲟⲗⲟⲥ ⲧⲏⲣⲟⲩ. Ⲉ̀ⲡ̀ϧⲁⲉ ⲇⲉ ⲙ̀ⲙⲱⲟⲩ ⲧⲏⲣⲟⲩ ⲙ̀ⲫ̀ⲣⲏϯ ⲙ̀ⲡⲓⲟⲩϧⲉ ⲁϥⲟⲩⲟⲛϩϥ ⲉ̀ⲣⲟⲓ ϩⲱ. Ⲁⲛⲟⲕ ⲅⲁⲣ ⲡⲉ ⲡⲓⲕⲟⲩϫⲓ ⲉ̀ⲃⲟⲗ ⲟⲩⲧⲉ ⲛⲓⲁⲡⲟⲥⲧⲟⲗⲟⲥ ⲧⲏⲣⲟⲩ ⲛ̀ϯⲉⲙⲡ̀ϣⲁ ⲁⲛ ⲉⲑⲣⲟⲩⲙⲟⲩϯ ⲉ̀ⲣⲟⲓ ϫⲉ ⲁⲡⲟⲥⲧⲟⲗⲟⲥ ⲉⲑⲃⲉ ϫⲉ ⲁⲓϭⲟϫⲓ ⲛ̀ⲥⲁ ϯⲉⲕⲕ̀ⲗⲏⲥⲓⲁ ⲛ̀ⲧⲉ Ⲫⲛⲟⲩϯ. Ϧⲉⲛ ⲟⲩϩ̀ⲙⲟⲧ ⲇⲉ ⲛ̀ⲧⲉ Ⲫⲛⲟⲩϯ ϯⲟⲓ ⲙ̀ⲡ̀ⲉϯⲟⲓ ⲙ̀ⲙⲟϥ ⲟⲩⲟϩ ⲡⲉϥϩ̀ⲙⲟⲧ ⲉⲧⲉⲛϧⲏⲧ ⲙ̀ⲡⲉϥϣⲱⲡⲓ ⲉϥϣⲟⲩⲓⲧ ⲁⲗⲗⲁ ⲁⲓϭⲓϧⲓⲥⲓ ⲉ̀ϩⲟⲧⲉⲣⲱⲟⲩ ⲧⲏⲣⲟⲩ ⲁⲛⲟⲕ ⲇⲉ ⲁⲛ ⲁⲗⲗⲁ ⲡⲓϩ̀ⲙⲟⲧ ⲛ̀ⲧⲉ Ⲫⲛⲟⲩϯ ⲉⲑⲛⲉⲙⲏⲓ. Ⲓⲧⲉ ⲟⲩⲛ ⲁⲛⲟⲕ ⲓⲧⲉ ⲛⲏ ⲧⲉⲛϩⲓⲱⲓϣ ⲙ̀ⲡⲁⲓⲣⲏϯ ⲟⲩⲟϩ ⲡⲁⲓⲣⲏϯ ⲁⲧⲉⲧⲉⲛⲛⲁϩϯ. Ⲓⲥϫⲉ ⲇⲉ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲥⲉϩⲓⲱⲓϣ ⲙ̀ⲙⲟϥ ϫⲉ ⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏ ⲉⲑⲙⲱⲟⲩⲧ ⲡⲱⲥ ⲟⲩⲟⲛ ϩⲁⲛⲟⲩⲟⲛ ϫⲱ ⲙ̀ⲙⲟⲥ ϧⲉⲛ ⲑⲏⲛⲟⲩ ϫⲉ ⲙ̀ⲙⲟⲛ ⲁⲛⲁⲥⲧⲁⲥⲓⲥ ⲛ̀ⲧⲉ ⲛⲓⲣⲉϥⲙⲱⲟⲩⲧ ⲛⲁϣⲱⲡⲓ. Ⲓⲥϫⲉ ⲇⲉ ⲙ̀ⲙⲟⲛ ⲁⲛⲁⲥⲧⲁⲥⲓⲥ ⲛ̀ⲧⲉ ⲛⲓⲣⲉϥⲙⲱⲟⲩⲧ ⲛⲁϣⲱⲡⲓ ⲓⲉ ⲟⲩⲇⲉ ⲙ̀ⲡⲉ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲧⲱⲛϥ. Ⲓⲥϫⲉ ⲇⲉ ⲙ̀ⲡⲉ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲧⲱⲛϥ ϩⲁⲣⲁ ϥ̀ϣⲟⲩⲓⲧ ⲛ̀ϫⲉ ⲡⲉⲛϩⲓⲱⲓϣ ϥ̀ϣⲟⲩⲓⲧ ⲟⲛ ⲛ̀ϫⲉ ⲡⲉⲧⲉⲛⲕⲉⲛⲁϩϯ. Ⲥⲉⲛⲁϫⲉⲙⲉⲛ ⲇⲉ ⲟⲛ ⲉⲛⲟⲓ ⲙ̀ⲙⲉⲑⲣⲉ ⲛ̀ⲛⲟⲩϫ ϧⲁ Ⲫⲛⲟⲩϯ ϫⲉ ⲁⲛⲉⲣⲙⲉⲑⲣⲉ ϧⲁ Ⲫⲛⲟⲩϯ ϫⲉ ⲁϥⲧⲟⲩⲛⲟⲥ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲫⲁⲓ ⲉⲧⲉⲙ̀ⲡ̀ⲉϥⲧⲟⲩⲛⲟⲥϥ ⲓⲥϫⲉ ϩⲁⲣⲁ ⲛⲓⲣⲉϥⲙⲱⲟⲩⲧ ⲛⲁⲧⲱⲟⲩⲛⲟⲩ ⲁⲛ. Ⲓⲥϫⲉ ⲅⲁⲣ ⲛⲓⲣⲉϥⲙⲱⲟⲩⲧ ⲛⲁⲧⲱⲟⲩⲛⲟⲩ ⲁⲛ ⲓⲉ ⲙ̀ⲡⲉ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲧⲱⲛϥ. Ⲓⲥϫⲉ ⲇⲉ ⲙ̀ⲡⲉ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲧⲱⲛϥ ⲟⲩⲉ̀ⲫ̀ⲗⲏⲟⲩ ⲡⲉ ⲡⲉⲧⲉⲛⲛⲁϩϯ ⲉⲧⲓ ⲟⲛ ⲧⲉⲧⲉⲛⲭⲏ ⲛ̀ϧⲣⲏⲓ ϧⲉⲛ ⲛⲉⲧⲉⲛⲛⲟⲃⲓ ⲓⲉ ϩⲁⲣⲁ ⲛⲏ ⲉⲧⲁⲩⲉⲛⲕⲟⲧ ϧⲉⲛ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲁⲩⲧⲁⲕⲟ. Ⲓⲥϫⲉ ⲇⲉ ⲛ̀ϧⲣⲏⲓ ϧⲉⲛ ⲡⲁⲓⲱⲛϧ ⲙ̀ⲙⲁⲩⲁⲧϥ ⲁⲛⲉⲣϩⲉⲗⲡⲓⲥ ⲉ̀Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲓⲉ ⲧⲉⲛϭⲓ ⲛ̀ⲟⲩⲛⲁⲓ ⲉ̀ⲣⲟⲛ ⲉ̀ϩⲟⲧⲉ ⲣⲱⲙⲓ ⲛⲓⲃⲉⲛ. Ϯⲛⲟⲩ ⲇⲉ ⲁ̀ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ ⲧ̀ⲁⲡⲁⲣⲭⲏ ⲛ̀ⲧⲉ ⲛⲏⲉⲧⲁⲩⲉⲛⲕⲟⲧ. Ⲉⲡⲓⲇⲏ ⲅⲁⲣ ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ ⲟⲩⲣⲱⲙⲓ ⲁ̀ ⲫⲙⲟⲩ ϣⲱⲡⲓ ⲉ̀ⲃⲟⲗ ϩⲓⲧⲉⲛ ⲕⲉⲣⲱⲙⲓ ⲧ̀ⲁⲛⲁⲥⲧⲁⲥⲓⲥ ⲛ̀ⲧⲉ ⲛⲓⲣⲉϥⲙⲱⲟⲩⲧ. Ⲙ̀ⲫ̀ⲣⲏϯ ⲅⲁⲣ ⲉⲧⲉ ϧⲉⲛ Ⲁⲇⲁⲙ ⲥⲉⲛⲁⲙⲟⲩ ⲧⲏⲣⲟⲩ ⲡⲁⲓⲣⲏϯ ⲟⲛ ϧⲉⲛ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲥⲉⲛⲁⲱⲛϧ ⲧⲏⲣⲟⲩ. Ⲡⲓⲟⲩⲁⲓ ⲡⲓⲟⲩⲁⲓ ϧⲉⲛ ⲡⲉϥⲧⲁⲅⲙⲁ ⲁ̀ⲡⲁⲣⲭⲏ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲓⲧⲁ ⲛⲁ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ϧⲉⲛ ⲡⲉϥϫⲓⲛⲓ. Ⲓⲧⲁ ⲛⲁ ⲡⲓϫⲱⲕ ϩⲟⲧⲁⲛ ⲁϥϣⲁⲛϯ ⲛ̀ϯⲙⲉⲧⲟⲩⲣⲟ ⲛ̀ⲧⲉ Ⲫⲛⲟⲩϯ ⲟⲩⲟϩ Ⲫⲓⲱⲧ ⲉϣⲱⲡ ⲁϥϣⲁⲛⲕⲱⲣϥ ⲛ̀ⲁⲣⲭⲏ ⲛⲓⲃⲉⲛ ⲛⲉⲙ ⲉⲝⲟⲩⲥⲓⲁ ⲛⲓⲃⲉⲛ ⲛⲉⲙ ϫⲟⲙ ⲛⲓⲃⲉⲛ. Ϩⲱϯ ⲅⲁⲣ ⲉⲣⲟϥ ⲛ̀ⲧⲉϥⲉⲣⲟⲩⲣⲟ ϣⲁⲧⲉϥⲭⲁ ⲛⲉϥϫⲁϫⲓ ⲧⲏⲣⲟⲩ ⲥⲁⲡⲉⲥⲏⲧ ⲛ̀ⲛⲉϥϭⲁⲗⲁⲩϫ. Ⲡⲓϧ̀ⲁⲉ ⲇⲉ ̀ⲛϫⲁϫⲓ ϥ̀ⲛⲁⲕⲱⲣϥϥ ⲉⲧⲉ ⲫ̀ⲙⲟⲩ ⲡⲉ. Ⲁϥⲉⲑ̀ⲣⲉ ⲉⲛⲭⲁⲓ ⲛⲓⲃⲉⲛ ϭⲛⲉϫⲱⲟⲩ ⲥⲁⲡⲉⲥⲏⲧ ⲛ̀ⲛⲉϥϭⲁⲗⲁⲩϫ.\n\nⲠⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲛⲉⲙⲱⲧⲉⲛ ⲧⲏⲣⲟⲩ ϫⲉ ⲁ̀ⲙⲏⲛ ⲉⲥⲉ̀ϣⲱⲡⲓ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-ethvety.mp3", text: "Ethve ti-anastasis ente nirefmōout etauenkout auemton emmōou khen efnahti em-Pi-ekhristos Eptshois ma-emton ennoupsukhē tērou.\n\nPaulos efvōk empentshois Iēsous Pi-ekhristos pi-apostolos etthahem fē-etauthashf pihishennoufi ente Efnouti.\n\nTitamo de emmōten na-esnēou epieuaggelion fē etaihishennoufi emmof nōten ete fē pe etaretentshitf fai etetenohi eraten thēnou enkhētf. fai on etetennanohem evol hitotf je khen ousaji aishennoufi nōten isje tetenamoni emmof savol imēti hikē aretennahti. Aiti gar enten thēnou enshorp emfē etaitshitf je Pikhristos afmou e-ehrēi ejen nennovi kata ni-egrafē. Ouoh je aukosf ouoh je aftōnf khen pi-ehoou emmah g kata ni-egrafē. Ouoh afouonhf e-Kēfa ita afouonhf epiethouab2. Menensōs afouonhf sa-epshōi enf enson eusop nai ete pouhouo shop sha ekhoun etinou hankekhōouni de auenkot. Ita afouonhf eiakōvos ita afouonhf eniapostolos tērou. E-epkhae de emmōou tērou emefrēti empioukhe afouonhf eroi hō. Anok gar pe pikouji evol oute niapostolos tērou entiemepsha an ethroumouti eroi je apostolos ethve je aitshoji ensa tiekeklēsia ente Fnouti. Khen ou-ehmot de ente Fnouti tioi emepetioi emmof ouoh pefehmot etenkhēt empefshōpi efshouit alla aitshikhisi ehoterōou tērou anok de an alla pi-ehmot ente Fnouti ethnemēi. Ite oun anok ite nē tenhiōish empairēti ouoh pairēti atetennahti. Isje de Pikhristos sehiōish emmof je aftōnf evol khen nē ethmōout pōs ouon hanouon jō emmos khen thēnou je emmon anastasis ente nirefmōout nashōpi. Isje de emmon anastasis ente nirefmōout nashōpi ie oude empe Pikhristos tōnf. Isje de empe Pikhristos tōnf hara efshouit enje penhiōish efshouit on enje petenkenahti. Senajemen de on enoi emmethre ennouj kha Fnouti je anermethre kha Fnouti je aftounos Pikhristos fai ete-emepeftounosf isje hara nirefmōout natōounou an. Isje gar nirefmōout natōounou an ie empe Pikhristos tōnf. Isje de empe Pikhristos tōnf ou-e-eflēou pe petennahti eti on tetenkhē enkhrēi khen netennovi ie hara nē etauenkot khen Pikhristos autako. Isje de enkhrēi khen paiōnkh emmauatf anerhelpis e-Pikhristos ie tentshi enounai eron ehote rōmi niven. Tinou de a Pikhristos tōnf evol khen nēethmōout etaparkhē ente nēetauenkot. Epidē gar evol hiten ourōmi a fmou shōpi evol hiten kerōmi etanastasis ente nirefmōout. Emefrēti gar ete khen Adam senamou tērou pairēti on khen Pikhristos senaōnkh tērou. Piouai piouai khen peftagma aparkhē Pikhristos ita na Pikhristos khen pefjini. Ita na pijōk hotan afshanti entimetouro ente Fnouti ouoh Fiōt eshōp afshankōrf enarkhē niven nem eksousia niven nem jom niven. Hōti gar erof enteferouro shatefkha nefjaji tērou sapesēt enneftshalauj. Pi-ekhae de njaji efnakōrff ete efmou pe. Afe-ethre enkhai niven tshnejōou sapesēt enneftshalauj.\n\nPi-ehmot gar nemōten tērou je amēn eseshōpi." },
            { language: 'english', text: "For the resurrection of the dead who have fallen asleep and reposed in the faith of Christ. O Lord repose their souls.\n\nPaul, a servant of our Jesus Christ, called to be an apostle, appointed to the gospel of God.\n\nMoreover, brethren, I declare to you the gospel which I preached to you, which also you received and in which you stand, by which also you are saved, if you hold fast that word which I preached to you—unless you believed in vain. For I delivered to you first of all that which I also received: that Christ died for our sins according to the Scriptures, and that He was buried, and that He rose again the third day according to the Scriptures, and that He was seen by Cephas, then by the twelve. After that He was seen by over five hundred brethren at once, of whom the greater part remain to the present, but some have fallen asleep. After that He was seen by James, then by all the apostles. Then last of all He was seen by me also, as by one born out of due time. For I am the least of the apostles, who am not worthy to be called an apostle, because I persecuted the church of God. But by the grace of God I am what I am, and His grace toward me was not in vain; but I labored more abundantly than they all, yet not I, but the grace of God which was with me. Therefore, whether it was I or they, so we preach and so you believed. Now if Christ is preached that He has been raised from the dead, how do some among you say that there is no resurrection of the dead? But if there is no resurrection of the dead, then Christ is not risen. And if Christ is not risen, then our preaching is empty and your faith is also empty. Yes, and we are found false witnesses of God, because we have testified of God that He raised up Christ, whom He did not raise up—if in fact the dead do not rise. For if the dead do not rise, then Christ is not risen. And if Christ is not risen, your faith is futile; you are still in your sins! Then also those who have fallen asleep in Christ have perished. If in this life only we have hope in Christ, we are of all men the most pitiable. But now Christ is risen from the dead, and has become the firstfruits of those who have fallen asleep. For since by man came death, by Man also came the resurrection of the dead. For as in Adam all die, even so in Christ all shall be made alive. But each one in his own order: Christ the firstfruits, afterward those who are Christ’s at His coming. Then comes the end, when He delivers the kingdom to God the Father, when He puts an end to all rule and all authority and power. For He must reign till He has put all enemies under His feet. The last enemy that will be destroyed is death. For “He has put all things under His feet.”\n\nThe grace of God the Father be with you all. Amen." },
          ],
        },
        {
          id: "palmsunday-general-funeral-the-trisagion",
          title: "Ⲁⲅⲓⲟⲥ (The Trisagion)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-palm-fun-agios.mp3", text: "Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ Ⲁⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ Ⲁⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲟ̀ ⲥ̀ⲧⲁⲩⲣⲱⲑⲓⲥ ⲇⲓ ⲏⲙⲁⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲀⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ Ⲁⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ Ⲁⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲟ̀ ⲥ̀ⲧⲁⲩⲣⲱⲑⲓⲥ ⲇⲓ ⲏⲙⲁⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲀⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ Ⲁⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ Ⲁⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲟ̀ ⲥ̀ⲧⲁⲩⲣⲱⲑⲓⲥ ⲇⲓ ⲏⲙⲁⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲆⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ ⲁ̀ⲅⲓⲱ Ⲡⲛⲉⲩⲙⲁⲧⲓ ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲩⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁⲙⲏⲛ.\n\nⲀⲅⲓⲁ ⲧ̀ⲣⲓⲁⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ." },
            { language: 'englishCoptic', audio: "alhan-palm-palm-fun-agios.mp3", text: "Agios o Theos Agios iskhuros Agios athanatos o estaurōthis di ēmas ele-ēson ēmas.\n\nAgios o Theos Agios iskhuros Agios athanatos o estaurōthis di ēmas ele-ēson ēmas.\n\nAgios o Theos Agios iskhuros Agios athanatos o estaurōthis di ēmas ele-ēson ēmas.\n\nDoksa Patri ke Uiō ke agiō Pneumati ke nun ke a-i ke is tous e-ōnas tōn e-ōnōn amēn.\n\nAgia etrias ele-ēson ēmas." },
            { language: 'english', text: "Holy God, Holy Mighty, Holy Immortal, Who was crucified for us, have mercy on us.\n\nHoly God, Holy Mighty, Holy Immortal, Who was crucified for us, have mercy on us.\n\nHoly God, Holy Mighty, Holy Immortal, Who was crucified for us, have mercy on us.\n\nGlory to the Father and to the Son and to The Holy Spirit, now and ever and unto the ages of the ages.Amen.\n\nO Holy Trinity, have mercy upon us." },
          ],
        },
        {
          id: "palmsunday-general-funeral-psalm",
          title: "Ⲯⲁⲗⲙⲟⲥ (Psalm)",
          versions: [
            { language: 'coptic', audio: "alhan-palm-ouniatk.mp3", text: "Ⲱ̀ⲟⲩⲛⲓⲁⲧϥ ⲙ̀ⲫⲏⲉ̀ⲧⲁⲕⲥⲟⲧⲡϥ ⲟⲩⲟϩ ⲁⲕϣⲟⲡϥ ⲉ̀ⲣⲟⲕ ⲉϥⲉϣⲱⲡⲓ ϧⲉⲛ ⲛⲉⲕⲁⲩⲗⲏⲟⲩ ϣⲁ ⲉ̀ⲛⲉϩ ⲉⲛⲉ̀ⲥⲓ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲓⲁ̀ⲅⲁⲑⲟⲛ ⲛ̀ⲧⲉ ⲡⲉⲕⲏⲓ ϥ̀ⲟⲩⲁⲃ ⲛ̀ϫⲉ ⲡⲉⲕⲉⲣⲫⲉⲓ ⲟⲩⲟϩ ϥ̀ⲟⲓ ⲛ̀ϣ̀ⲫⲏⲣⲓ ϧⲉⲛ ⲟⲩⲙⲉⲑⲙⲏ ⲁ̅ⲗ̅" },
            { language: 'englishCoptic', audio: "alhan-palm-ouniatk.mp3", text: "Ōouniatf emfē-etaksotpf ouoh akshopf erok efeshōpi khen nekaulēou sha eneh enesi evolkhen ni-agathon ente pekēi efouab enje pekerfei ouoh efoi eneshfēri khen oumethmē allēlouia" },
            { language: 'english', text: "Blessed is he whom You have chosen and adopted; he shall dwell in Your courts; we shall be filled with the good things of Your house; Your temple is holy. You are wonderful in righteousness." },
          ],
        },
      ],
    },
  ],
  "holy-week": [
    {
      id: "holyweek-pascha-general",
      title: "Pascha Hours (General)",
      hymns: [
        {
          id: "holyweek-pascha-general-ke-eepertou",
          title: "Ⲕⲉ ⲩ̀ⲡⲉⲣⲧⲟⲩ (Ke Eepertou)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-keieperto.mp3", text: "Ⲕⲉ ⲩ̀ⲡⲉⲣⲧⲟⲩ ⲕⲁⲧⲁⲝⲓⲱⲑⲏⲛⲉ ⲏ̀ⲙⲁⲥ ⲧⲏⲥ ⲁⲕⲣⲟ ⲁ̀ⲥⲉⲱ̀ⲥ ⲧⲟⲩ ⲁ̀ⲅⲓⲟⲩ ⲉⲩⲁ̀ⲅⲅⲉⲗⲓⲟⲩ ⲕⲩⲣⲓⲟⲛ ⲕⲉ ⲧⲟⲛ ⲑⲉⲟ̀ⲛ ⲏ̀ⲙⲱⲛ ⲓ̀ⲕⲉⲧⲉⲩⲥⲱⲙⲉⲛ ⲥⲟⲫⲓⲁ ⲟⲣⲑⲓ ⲁ̀ⲕⲟⲩⲥⲱⲙⲉⲛ ⲧⲟⲩ ⲁ̀ⲅⲓⲟⲩ ⲉⲩⲁ̀ⲅⲅⲉⲗⲓⲟⲩ." },
            { language: 'englishCoptic', audio: "alhan-pascha-keieperto.mp3", text: "Ke upertou kataksiōthēne ēmas tēs akro ase-ōs tou agiou eu-aggeliou kurion ke ton the-on ēmōn iketeusōmen sofia orthi akousōmen tou agiou eu-aggeliou." },
            { language: 'english', text: "We beseech our Lord and God, that we may be worthy to hear the holy Gospel. In wisdom, let us listen to the holy Gospel." },
          ],
        },
        {
          id: "holyweek-pascha-general-exposition-introduction",
          title: "Ϧⲉⲛ ⲫ̀ⲣⲁⲛ (Exposition Introduction)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-exp1.mp3", text: "Ϧⲉⲛ ⲫ̀ⲣⲁⲛ ⲛ̀Ϯⲧ̀ⲣⲓⲁⲥ ⲛ̀ⲟⲩⲙⲟⲟⲩⲥⲓⲟⲥ ⲫ̀ⲓⲱⲧ ⲛⲉⲙ ⲡ̀ϣⲏⲣⲓ ⲛⲉⲙ ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ." },
            { language: 'englishCoptic', audio: "alhan-pascha-exp1.mp3", text: "Khen efran en-Ti-etrias enoumoousios efiōt nem epshēri nem pi-epneuma ethouab." },
            { language: 'english', text: "In the name of the Trinity, one in essence, the Father, the Son, and the Holy Spirit." },
          ],
        },
        {
          id: "holyweek-pascha-general-morning-exposition-intro",
          title: "Ⲡⲓⲟⲩⲱⲓⲛⲓ (Morning Exposition Intro)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-exp2.mp3", text: "Ⲡⲓⲟⲩⲱⲓⲛⲓ ⲛ̀ⲧⲁ ⲫ̀ⲙⲏⲓ ⲫⲏ ⲉⲧⲉⲣⲟⲩⲱⲓⲛⲓ ⲉ̀ⲣⲱⲙⲓ ⲛⲓⲃⲉⲛ ⲉⲑⲛⲏⲟⲩ ⲉ̀ⲡⲓⲕⲟⲥⲙⲟⲥ." },
            { language: 'englishCoptic', audio: "alhan-pascha-exp2.mp3", text: "Piouōini enta efmēi fē eterouōini erōmi niven ethnēou epikosmos." },
            { language: 'english', text: "O true light who gives light to every man that comes into the world." },
          ],
        },
        {
          id: "holyweek-pascha-general-evening-exposition-intro",
          title: "Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ̀ (Evening Exposition Intro)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-exp3.mp3", text: "Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ̀ ϯϭ̀ⲣⲟⲙⲡⲓ ⲉⲑⲛⲉⲥⲱⲥ ⲑⲏⲉ̀ⲧⲁⲥⲙⲓⲥⲓ ⲛⲁⲛ ⲙ̀Ⲫϯ ⲡⲓⲖⲟⲅⲟⲥ." },
            { language: 'englishCoptic', audio: "alhan-pascha-exp3.mp3", text: "Shere ne Mari-a ti-etshrompi ethnesōs thē-etasmisi nan em-Efnouti pi-Logos." },
            { language: 'english', text: "Hail to you O Mary, the pure dove who, for us, gave birth to God the Logos." },
          ],
        },
        {
          id: "holyweek-pascha-general-exposition-conclusion",
          title: "Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲤⲱⲧⲏⲣ (Exposition Conclusion)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-exp4.mp3", text: "Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ ⲡⲉⲛⲤⲱⲧⲏⲣ ⲁϥⲓ̀ ⲁϥϣⲉⲡⲙ̀ⲕⲁϩ ϩⲓⲛⲁ ϧⲉⲛ ⲛⲉϥⲙ̀ⲕⲁⲩϩ ⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ.\n\nⲘⲁⲣⲉⲛ ϯⲱ̀ⲟⲩⲛⲁϥ ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲡⲉϥⲣⲁⲛ ϫⲉ ⲁϥⲉⲣⲟⲩⲛⲁⲓ ⲛⲉⲙⲁⲛ ⲕⲁⲧⲁ ⲡⲉϥⲛⲓϣϯ ⲛ̀ⲛⲁⲓ." },
            { language: 'englishCoptic', audio: "alhan-pascha-exp4.mp3", text: "Pikhristos pen-Sōtēr afi afshepemkah hina khen nefemkauh entefsōti emmon.\n\nMaren ti-ōounaf tentshisi empefran je aferounai neman kata pefnishti ennai." },
            { language: 'english', text: "Christ our Savior, has come and has suffered, that through His Passion, He may save us.\n\nLet us glorify Him, and exalt His Name, for He had mercy on us, according to His great mercy." },
          ],
        },
      ],
    },
    {
      id: "holyweek-covenant-thursday",
      title: "Covenant Thursday",
      hymns: [
        {
          id: "holyweek-covenant-thursday-fai-etav-enf",
          title: "Ⲫⲁⲓ ⲉ̀ⲧⲁϥⲉⲛϥ (Fai Etav Enf)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-fai-etav-enf.mp3", text: "Ⲫⲁⲓ ⲉ̀ⲧⲁϥⲉⲛϥ ⲉ̀ⲡ̀ϣⲱⲓ ⲛ̀ⲟⲩⲑⲩⲥⲓⲁ ⲉⲥϣⲏⲡ: ϩⲓϫⲉⲛ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ: ϧⲁ ⲡ̀ⲟⲩϫⲁⲓ ⲙ̀ⲡⲉⲛⲅⲉⲛⲟⲥ.\n\nⲀϥϣⲱⲗⲉⲙ ⲉ̀ⲣⲟϥ ⲛ̀ϫⲉ ⲡⲉϥⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ: ⲙ̀ⲫ̀ⲛⲁⲩ ⲛ̀ⲧⲉ ϩⲁⲛⲁ̀ⲣⲟⲩϩⲓ: ϩⲓϫⲉⲛ ϯⲄⲟⲗⲅⲟⲑⲁ." },
            { language: 'englishCoptic', audio: "alhan-pascha-fai-etav-enf.mp3", text: "Fai etafenf e-epshōi enouthusia esshēp: hijen pi-estauros: kha epoujai empengenos.\n\nAfshōlem erof enje pefiōt enagathos: emefnau ente hanarouhi: hijen ti-Golgotha." },
            { language: 'english', text: "This is He who offered Himself up, as an acceptable sacrifice, on the Cross for the salvation of our race.\n\nHis Good Father smelled Him at the evening watch on Golgotha." },
          ],
        },
        {
          id: "holyweek-covenant-thursday-acts-of-the-apostles",
          title: "Ⲡ̀ⲣⲁⲝⲉⲱⲛ ⲧⲱⲛ (Acts of the Apostles)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-maunday-thurs-praxis.mp3", text: "Ⲡ̀ⲣⲁⲝⲉⲱⲛ ⲧⲱⲛ ⲁ̀ⲅⲓⲱⲛ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲱⲛ ⲧⲟⲁ̀ⲛⲁⲅⲛⲱⲥ̀ⲙⲁ (ⲡ̀ⲣⲁⲝⲓⲥ) 2ⲃ ⲛ̀ⲧⲉ ⲛⲉⲛⲓⲟϯ ⲛ̀ⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ ⲉ̀ⲣⲉ ⲡⲟⲩⲥ̀ⲙⲟⲩ ⲉⲑ̅ⲩ̅ ϣⲱⲡⲓ ⲛⲉⲙⲁⲛ ⲁⲙⲏⲛ.\n\nⲞⲩⲟϩ ⲛ̀ϩ̀ⲣⲏⲓ ⲇⲉ ϧⲉⲛ ⲛⲁⲓ ⲉ̀ϩⲟⲟⲩ ⲁϥⲧⲱⲛϥ ⲛ̀ϫⲉ Ⲡⲉⲧⲣⲟⲥ ϧⲉⲛ ⲑ̀ⲙⲏϯ ⲛ̀ⲛⲓⲥ̀ⲛⲏⲟⲩ ⲛⲉ ⲟⲩⲟⲛ ⲟⲩⲙⲏϣ ⲇⲉ ⲉⲩⲑⲟⲩⲏⲧ ϩⲓⲫⲁⲓ ⲉ̀ⲫⲁⲓ ⲉ̀ⲛⲁⲩⲉⲣ ϣⲉ ϫⲟⲩⲧ ⲛ̀ⲣⲁⲛ ⲟⲩⲟϩ ⲡⲉϫⲁϥ. Ⲛⲓⲣⲱⲙⲓ ⲛⲉⲛⲥ̀ⲛⲏⲟⲩ ϩⲱϯ ⲛ̀ⲧⲉⲥϫⲱⲕ ⲉ̀ⲃⲟⲗ ⲛ̀ϫⲉ ϯⲅ̀ⲣⲁⲫⲏ ⲑⲏⲉ̀ⲧⲁϥ ⲉⲣϣⲟⲣⲡ ⲛ̀ϫⲟⲥ ⲛ̀ϫⲉ ⲡⲓⲡ̅ⲛ̅ⲁ̅ ⲉ̀ⲑⲟⲩⲁⲃ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲣⲱϥ ⲛ̀Ⲇⲁⲩⲓⲇ ⲉⲑⲃⲉ Ⲓⲟⲩⲇⲁⲥ ⲫⲏⲉ̀ⲧⲁϥⲉⲣϭⲁⲩⲙⲱⲓⲧ ⲛ̀ⲛⲏⲉ̀ⲧⲁⲩⲁ̀ⲙⲟⲛⲓ ⲛ̀Ⲓ̅ⲏ̅ⲥ̅. Ϫⲉ ⲛⲁϥⲏⲡ ⲛ̀ϧ̀ⲣⲏⲓ ⲛ̀ϧⲏⲧⲉⲛ ⲡⲉ ⲟⲩⲟϩ ⲁ̀ⲡⲓⲱⲡ ⲓ̀ ⲉ̀ⲣⲟϥ ⲙ̀ⲡⲓⲕ̀ⲗⲏⲣⲟⲥ ⲛ̀ⲧⲉ ⲧⲁⲓ ⲇⲓ. ⲁ̀ⲕⲟⲛⲓⲁ̀. Ⲫⲁⲓ ⲙⲉⲛ ⲟⲩⲛ ⲁϥϣⲱⲡ ⲛ̀ⲟⲩⲓⲟϩⲓ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲫ̀ⲃⲉⲭⲉ ⲛ̀ⲧⲉ ϯⲁ̀ⲇⲓⲕⲓⲁ̀ ⲟⲩⲟϩ ⲁϥϩⲉⲓ ϩⲓϫⲉⲛ ⲡⲉϥϩⲟ ⲁϥⲕⲱϣ ϧⲉⲛ ⲧⲉϥⲙⲏϯ ⲛⲏⲉⲧ ⲥⲁϧⲟⲩⲛ ⲙ̀ⲙⲟϥ ⲧⲏⲣⲟⲩ ⲁⲩⲫⲱⲛ ⲉ̀ⲃⲟⲗ. Ⲟⲩⲟϩ ⲁϥⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ ⲛⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ ⲉⲧϣⲟⲡ ϧⲉⲛ Ⲓ̀ⲗⲏⲙ ϩⲱⲥⲧⲉ ⲛ̀ⲥⲉⲙⲟⲩϯ ⲉ̀ⲫ̀ⲣⲁⲛ ⲙ̀ⲡⲓⲓⲟϩⲓ ⲉ̀ⲧⲉ ⲙ̀ⲙⲁⲩ ϧⲉⲛ ⲧⲟⲩⲁⲥⲡⲓ ϫⲉ Ⲁ̀ⲭⲉⲗⲇⲁⲙⲁⲅ ⲉ̀ⲧⲉ ⲡⲓⲓⲟϩⲓ ⲛ̀ⲧⲉ ⲡⲓⲥ̀ⲛⲟϥ ⲡⲉ. Ⲉ̀ⲥ̀ϧⲏⲟⲩⲧ ⲅⲁⲣ ϩⲓ ⲡ̀ϫⲱⲙ ⲛ̀ⲧⲉ ⲛⲓⲯⲁⲗⲙⲟⲥϥⲅ ϫⲉ ⲧⲉϥⲉⲣⲃⲓ ⲙⲁⲣⲉⲥϣⲱϥ ⲟⲩⲟϩ ⲙ̀ⲡⲉⲛⲑ̀ⲣⲉϥϣⲱⲡⲓ ⲛ̀ϫⲉ ⲫⲏⲉⲧϣⲟⲡ ⲛ̀ϧⲏⲧⲥ ⲛ̀ⲧⲉϥⲙⲉⲧⲉ̀ⲡⲓⲥⲕⲟⲡⲟⲥ ⲙⲁⲣⲉ ⲕⲉⲟⲩⲁⲓ ϭⲓⲧⲥ.\n\nⲠⲓⲥⲁϫⲓ ⲇⲉ ⲛ̀ⲧⲉ Ⲡ̀⳪ ⲉϥⲉ̀ⲁⲓⲁⲓ ⲟⲩⲟϩ ⲉϥⲉ̀ⲁ̀ϣⲁⲓ ⲉϥⲁ̀ⲁ̀ⲙⲁϩⲓ ⲟⲩⲟϩ ⲉϥⲉ̀ⲧⲁϫⲣⲟ ϧⲉⲛ ϯⲁ̀ⲅⲓⲁ ⲛ̀ⲉⲕⲕ̀ⲗⲏⲥⲓⲁ ⲛ̀ⲧⲉ Ⲫϯ." },
            { language: 'englishCoptic', audio: "alhan-pascha-maunday-thurs-praxis.mp3", text: "Eprakseōn tōn agiōn enapostolōn to-anagnō-esma (epraksis) 2b ente nenioti enapostolos ere pou-esmou ethouab shōpi neman amēn.\n\nOuoh enehrēi de khen nai ehoou aftōnf enje Petros khen ethmēti enni-esnēou ne ouon oumēsh de euthouēt hifai efai enauer she jout enran ouoh pejaf. Nirōmi nenesnēou hōti entesjōk evol enje ti-egrafē thē-etaf ershorp enjos enje pi-epneuma ethouab evolkhen rōf en-Dauid ethve Ioudas fē-etafertshaumōit ennē-etau-amoni en-Iēsous. Je nafēp enekhrēi enkhēten pe ouoh apiōp i erof empi-eklēros ente tai di. akoni-a. Fai men oun afshōp enouiohi evolkhen efvekhe ente ti-adiki-a ouoh afhei hijen pefho afkōsh khen tefmēti nēet sakhoun emmof tērou aufōn evol. Ouoh afouōnh evol nouon niven etshop khen Ilēm hōste ensemouti e-efran empiiohi ete emmau khen touaspi je Akheldamag ete piiohi ente pi-esnof pe. E-eskhēout gar hi epjōm ente nipsalmosfg je tefervi maresshōf ouoh empenethrefshōpi enje fēetshop enkhēts entefmetepiskopos mare keouai tshits.\n\nPisaji de ente Eptshois efeaiai ouoh efe-ashai efa-amahi ouoh efetajro khen ti-agia enekeklēsia ente Efnouti." },
            { language: 'english', text: "A reading from the Acts of our holy fathers, the apostles, may their holy blessings be with us all. Amen.\n\nAnd in those days Peter stood up in the midst of the disciples altogether the number of names was about a hundred and twenty, and said, “Men and brethren, this Scripture had to be fulfilled, which the Holy Spirit spoke before by the mouth of David concerning Judas, who became a guide to those who arrested Jesus; for he was numbered with us and obtained a part in this ministry.” (Now this man purchased a field with the wages of iniquity; and falling headlong, he burst open in the middle and all his entrails gushed out. And it became known to all those dwelling in Jerusalem; so that field is called in their own language, Akel Dama, that is, Field of Blood.) “For it is written in the book of Psalms: ‘Let his dwelling place be desolate(3), And let no one live in it’; and ‘Let another take his office.’\n\nThe word of the Lord shall grow, multiply, be mighty and be confirmed in the holy church of God. Amen." },
          ],
        },
        {
          id: "holyweek-covenant-thursday-avchnon",
          title: "Ⲁⲩϭ̀ⲛⲟⲛ (Avchnon)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-avechnon.mp3", text: "Ⲁⲩϭ̀ⲛⲟⲛ ⲛ̀ϫⲉ ⲛⲉϥⲥⲁϫⲓ ⲉ̀ϩⲟⲧⲉ ⲟⲩⲛⲉϩ ⲟⲩⲟϩ ⲛ̀ⲑⲱⲟⲩ ϩⲁⲛ ⲥⲟⲑⲛⲉϥ ⲛⲉ ϭⲓⲥ̀ⲙⲏ Ⲫϯ ⲉ̀ⲧⲁ ⲡ̀ⲣⲟⲥⲉⲩⲭⲏ ⲟⲩⲟϩ ⲙ̀ⲡⲉⲣϩⲓ ⲡ̀ϩⲟ ⲙ̀ⲡⲁⲧⲱⲃϩ ⲁ̅ⲗ̅." },
            { language: 'englishCoptic', audio: "alhan-pascha-avechnon.mp3", text: "Au-etshnon enje nefsaji ehote ouneh ouoh enthōou han sothnef ne tshi-esmē Efnouti eta eproseukhē ouoh emperhi epho empatōbh allēlouia." },
            { language: 'english', text: "His words were softer than oil, Yet they were drawn swords. Give ear to my prayer, O God, And do not hide Yourself from my supplication. Alleluia." },
          ],
        },
      ],
    },
    {
      id: "holyweek-great-friday",
      title: "Great Friday",
      hymns: [
        {
          id: "holyweek-great-friday-6th-hour-taishoury",
          title: "Ⲧⲁⲓϣⲟⲩⲣⲏ (6th hour Taishoury)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-taishori.mp3", text: "Ⲧⲁⲓϣⲟⲩⲣⲏ ⲛ̀ⲛⲟⲩⲃ ⲛ̀ⲕⲁⲑⲁⲣⲟⲥ ⲉⲧϥⲁⲓ ϧⲁ ⲡⲓⲁ̀ⲣⲱⲙⲁⲧⲁ ⲉⲧϧⲉⲛ ⲛⲉⲛϫⲓϫ ⲛ̀Ⲁ̀ⲁⲣⲱⲛ ⲡⲓⲟ̀ⲩⲏⲃ ⲉϥⲧⲁⲗⲉ ⲟⲩⲥ̀ⲑⲟⲓⲛⲟⲩϥⲓ ⲉ̀ⲡ̀ϣⲱⲓ ⲉ̀ϫⲉⲛ ⲡⲓⲙⲁ ⲛ̀ⲉ̀ⲣϣⲱⲟ̀ⲩϣⲓ." },
            { language: 'englishCoptic', audio: "alhan-pascha-taishori.mp3", text: "Taishourē ennoub enkatharos etfai kha pi-arōmata etkhen nenjij en-Aarōn pi-ouēb eftale ou-esthoinoufi e-epshōi ejen pima enershō-oushi." },
            { language: 'english', text: "This is the censer of pure gold bearing the aroma, in the hands of Aaron the priest, offering up incense on the altar." },
          ],
        },
        {
          id: "holyweek-great-friday-6th-hour-pauline",
          title: "Ϯⲉ̀ⲡⲓⲥⲧⲟⲗⲏ (6th hour Pauline)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-teepistoly.mp3", text: "Ϯⲉ̀ⲡⲓⲥⲧⲟⲗⲏ ⲛ̀ⲧⲉ ⲡⲉⲛⲥⲁϧ Ⲡⲁⲩⲗⲟⲥ ⲉ̀ⲣⲉ ⲡⲉϥⲥ̀ⲙⲟⲩ ⲉ̀ⲑⲟⲩⲁⲃ ϣⲱⲡⲓ ⲛⲉⲙⲁⲛ ⲁ̀ⲙⲏⲛ.\n\nⲠⲁⲩⲗⲟⲥ ⲫ̀ⲃⲱⲕ ⲙ̀ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡⲓⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ ⲉⲧⲑⲁϩⲉⲙ ⲫⲏⲉ̀ⲧⲁⲩⲑⲁϣϥ ⲉ̀ⲡⲓϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛ̀ⲧⲉ Ⲫϯ.\n\nⲀⲛⲟⲕ ⲇⲉ ⲛ̀ⲛⲉⲥϣⲱⲡⲓ ⲛⲏⲓ ⲛ̀ⲧⲁϣⲟⲩϣⲟⲩ ⲙ̀ⲙⲟⲓ ⲉ̀ⲃⲏⲗ ϧⲉⲛ ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲛ̀ⲧⲉ ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲫⲁⲓ ⲉ̀ⲧⲉ ⲉⲃⲟⲗϩⲓⲧⲟⲧϥ ⲁⲩⲓ̀ϣⲓ ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ ⲛⲏⲓ ⲟⲩⲟϩ ⲁ̀ⲛⲟⲕ ϩⲱ ⲁⲩⲁϣⲧ ⲙ̀ⲡⲓⲕⲟⲥⲙⲟⲥ. Ⲛ̀ϩ̀ⲣⲏⲓ ⲅⲁⲣ ϧⲉⲛ Ⲡⲭ̅ⲥ̅ Ⲓ̅ⲏ̅ⲥ̅ ⲟⲩⲇⲉ ⲡ̀ⲥⲉⲃⲓ ϩ̀ⲗⲓ ⲡⲉ ⲟⲩⲇⲉ ϯⲙⲉⲧⲁⲧⲥⲉⲃⲓ ⲁⲗⲗⲁ ⲟⲩⲥⲱⲛⲧ ⲙ̀ⲃⲉⲣⲓⲡⲉ. Ⲟⲩⲟϩ ⲟⲩⲟⲛ ⲛⲓⲃⲉⲛ ⲉ̀ⲧⲁⲩϯⲙⲁϯ ϧⲉⲛ ⲡⲁⲓⲕⲁⲛⲱⲛ ⲧ̀ϩⲓⲣⲏⲛⲏ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲟⲩ ⲛⲉⲙ ⲡⲓⲛⲁⲓ ⲛⲉⲙ ⲉ̀ϫⲉⲛ ⲡ̀Ⲓⲥⲣⲁⲏ̀ⲗ ⲛ̀ⲧⲉ Ⲫϯ. Ⲡ̀ⲥⲉⲡⲓ ⲇⲉ ⲛ̀ⲛⲁⲓ ⲙ̀ⲡⲉⲛⲑ̀ⲣⲉϩ̀ⲗⲓ ⲟⲩⲁϩ ϧⲓⲥⲓ ⲉ̀ⲣⲟⲓ ⲁ̀ⲛⲟⲕ ⲅⲁⲣ ⲛⲓϣⲱⲗϩ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅ ϯϥⲁⲓ ϧⲁⲣⲱⲟⲩ ϧⲉⲛ ⲡⲁⲥⲱⲙⲁ. Ⲡⲓϩ̀ⲙⲟⲧ ⲙ̀ⲡⲉⲛⲟⲥ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲛⲉⲙ ⲡⲉⲧⲉⲛⲡⲛⲁ ⲛⲁⲥ̀ⲛⲏⲟⲩ ⲁ̀ⲙⲏⲛ.\n\nⲠⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲛⲉⲙⲱⲧⲉⲛ ⲛⲉⲙ ⲧ̀ϩⲓⲣⲏⲛⲓ ⲉⲩⲥⲟⲡ ϫⲉ ⲁⲙⲏⲛ ⲉ̀ⲥⲉϣⲱⲡⲓ." },
            { language: 'englishCoptic', audio: "alhan-pascha-teepistoly.mp3", text: "Ti-epistolē ente pensakh Paulos ere pefesmou ethouab shōpi neman amēn.\n\nPaulos efvōk empentshois Iēsous Pi-ekhristos pi-apostolos etthahem fē-etauthashf epihishennoufi ente Efnouti.\n\nAnok de ennesshōpi nēi entashoushou emmoi evēl khen pi-estauros ente pentshois Iēsous Pi-ekhristos fai ete evolhitotf au-ishi empikosmos nēi ouoh anok hō auasht empikosmos. Enehrēi gar khen Pi-ekhristos Iēsous oude epsevi ehli pe oude timetatsevi alla ousōnt emveripe. Ouoh ouon niven etautimati khen paikanōn ethirēnē e-ehrēi ejōou nem pinai nem ejen ep-Isra-ēl ente Efnouti. Epsepi de ennai empenethre-ehli ouah khisi eroi anok gar nishōlh ente Pi-ekhristos tifai kharōou khen pasōma. Pi-ehmot empenos Iēsous Pi-ekhristos nem petenpna na-esnēou amēn.\n\nPi-ehmot gar nemōten nem ethirēni eusop je amēn eseshōpi." },
            { language: 'english', text: "An epistle of our teacher St. Paul, may his holy blessing be with us. Amen.\n\nPaul, a bondservant of Jesus Christ, called to be an apostle, separated to the gospel of God.\n\nBut God forbid that I should boast except in the cross of our Lord Jesus Christ, by whom the world has been crucified to me, and I to the world. For in Christ Jesus neither circumcision nor uncircumcision avails anything, but a new creation. And as many as walk according to this rule, peace and mercy be upon them, and upon the Israel of God. From now on let no one trouble me, for I bear in my body the marks of the Lord Jesus. Brethren, the grace of our Lord Jesus Christ be with your spirit. Amen\n\nThe grace of God the Father be with you all. Amen." },
          ],
        },
        {
          id: "holyweek-great-friday-6th-hour-litanies-refrain",
          title: "Ⲱⲫⲏⲉⲧ (6th hour Litanies refrain)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-sixthhour.mp3", text: "Ⲱⲫⲏⲉⲧ ϧⲉⲛ ⲡⲓⲉ̀ϩⲟⲟⲩ ⲙ̀ⲙⲁϩ ⲥⲟⲟⲩ ϧⲉⲛ ⲫ̀ⲛⲁⲩ ⲛ̀ⲁϫⲡ ⲥⲟⲟⲩ ⲁⲩϯⲓϥⲧ ⲛⲁⲕ ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲉⲑⲃⲉ ⲫ̀ⲛⲟⲃⲓ ⲉ̀ⲧⲁϥⲉⲣⲧⲟⲗⲙⲁⲛ ⲉ̀ⲣⲟϥ ⲛ̀ϫⲉ Ⲁⲇⲁⲙ ϧⲉⲛ ⲡⲓⲡⲁⲣⲁⲇⲓⲥⲟⲥ ⲫⲱϧ ⲙ̀ⲡⲓⲥ̀ϧⲓ ⲛ̀ϫⲓϫ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ ⲱ̀Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲚⲟⲩϯ ⲟⲩⲟϩ ⲛⲁϩⲙⲉⲛ." },
            { language: 'englishCoptic', audio: "alhan-pascha-sixthhour.mp3", text: "Ōfēet khen pi-ehoou emmah soou khen efnau enajp soou autiift nak ekhoun epi-estauros ethve efnovi etafertolman erof enje Adam khen piparadisos fōkh empi-eskhi enjij ente nennovi ō-Pi-ekhristos pen-Nouti ouoh nahmen." },
            { language: 'english', text: "O You who on the sixth day, and at the sixth hour, were nailed to the cross on account of the sin that our father Adam dared to commit in Paradise; wipe out the handwriting of our sins, O Christ our God and save us." },
          ],
        },
        {
          id: "holyweek-great-friday-omonogenyc",
          title: "Ⲟ̀ⲙⲟⲛⲟⲅⲉⲛⲏⲥ (Omonogenyc)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-omonogenis.mp3", text: "Ⲟ̀ⲙⲟⲛⲟⲅⲉⲛⲏⲥ Ⲩ̀ⲓⲟⲥ ⲕⲉ Ⲗⲟⲅⲟⲥ ⲧⲟⲩ Ⲑⲉⲟⲩ Ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲩ̀Ⲡⲁⲣⲭⲱⲛ ⲕⲉ ⲕⲁⲧⲁ ⲇⲉⲝⲁⲙⲉⲛⲟⲥ ⲇⲓⲁⲧⲏⲛ ⲏ̀ⲙⲉⲧⲉⲣⲁⲛ ⲥⲱⲧⲏⲣⲓⲁⲛ ⲥⲁⲣⲕⲱⲑⲏⲛⲉ ⲉⲕ ⲧⲏⲥ ⲁ̀ⲅⲓⲁⲥ Ⲑⲉⲟ̀ⲧⲟⲕⲟⲩ ⲕⲉ ⲁ̀ⲓ̀ (Ⲡⲁⲣⲑⲉⲛⲟⲩ Ⲙⲁⲣⲓⲁⲥ) ⲃ̅.\n\nⲀⲧⲣⲉⲡⲧⲱⲥ ⲉ̀ⲛⲁⲛⲑ̀ⲣⲱⲡⲓⲥⲁⲥ ⲟ̀ⲥ̀ⲧⲁⲩⲣⲱⲑⲓⲥ ⲧⲉ Ⲭ̀ⲣⲓⲥⲧⲉ ⲟ̀ Ⲑⲉⲟⲥ. Ⲑⲁⲛⲁⲧⲱ ⲑⲁⲛⲁⲧⲟⲛ ⲡⲁⲧⲏⲥⲁⲥ ⲓⲥ ⲱⲛⲧⲏⲥ ⲁ̀ⲅⲓⲁⲥ Ⲧ̀ⲣⲓⲁⲇⲟⲥ ⲥⲩⲛ ⲇⲟⲝⲁ ⲍⲟⲙⲉⲛⲟⲥ ⲧⲱ Ⲡⲁⲧⲣⲓ ⲕⲉ ⲧⲱ ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲥⲱⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲀ̀ⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ ⲟ̀ⲇⲓ ⲏ̀ⲙⲁⲥ ⲁⲛ ⲑ̀ⲣⲱⲡⲟⲥ ⲅⲉ ⲅⲟⲛⲱⲥ ⲁⲧⲣⲉⲡⲧⲱⲥ ⲕⲉ ⲙⲓⲛⲁⲥ Ⲑⲉⲟⲥ.\n\nⲀ̀ⲅⲓⲟⲥ Ⲓⲥⲭⲩⲣⲟⲥ ⲟ̀ ⲉ̀ⲛ ⲁⲥⲑⲉⲛⲓⲁ ⲧⲟ ⲩ̀ⲡⲉⲣⲉⲭⲟⲛ ⲧⲏⲥ Ⲓⲥⲭⲩⲣⲟⲥ ⲉ̀ⲡⲓⲇⲓⲝⲁⲙⲉⲛⲟⲥ.\n\nⲀ̀ⲅⲓⲟⲥ Ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲟ̀ ⲥ̀ⲧⲁⲩⲣⲱⲑⲓⲥ ⲇⲓ ⲏ̀ⲙⲁⲥ ⲟ̀ⲧⲟⲛ ⲇⲓⲁ̀ⲥ̀ⲧⲁⲩⲣⲟⲩ ⲑⲁⲛⲁⲧⲟⲛ ⲩ̀ⲡⲟⲙⲓⲛⲁⲥ ⲥⲁⲣⲕⲓ ⲕⲉ ⲇⲓⲝⲁⲥⲩⲱⲥ ⲕⲉ ⲉⲛ ⲑⲁⲛⲁⲧⲱ ⲅⲉⲅⲟⲛⲱⲥ ⲩ̀Ⲡⲁⲣⲭⲓⲥ Ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ.\n\nⲀ̀ⲅⲓⲁ Ⲧ̀ⲣⲓⲁⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ." },
            { language: 'englishCoptic', audio: "alhan-pascha-omonogenis.mp3", text: "Omonogenēs Uios ke Logos tou Theou Athanatos u-Parkhōn ke kata deksamenos diatēn ēmeteran sōtērian sarkōthēne ek tēs agias The-otokou ke a-i (Parthenou Marias) b.\n\nAtreptōs enanethrōpisas o-estaurōthis te Ekhriste o Theos. Thanatō thanaton patēsas is ōntēs agias Etriados sun doksa zomenos tō Patri ke tō agiō Epneumati sōson ēmas.\n\nAgios o Theos odi ēmas an ethrōpos ge gonōs atreptōs ke minas Theos.\n\nAgios Iskhuros o en asthenia to uperekhon tēs Iskhuros epidiksamenos.\n\nAgios Athanatos o estaurōthis di ēmas oton di-a-estaurou thanaton upominas sarki ke diksasuōs ke en thanatō gegonōs u-Parkhis Athanatos.\n\nAgia Etrias ele-ēson ēmas." },
            { language: 'english', text: "O only-begotten Son, the eternal and immortal Word of God; who for our salvation did will to be incarnate of the holy Theotokos (and ever Virgin Mary)2.\n\nWho without change became man and was crucified, the Christ God. Trampled down death by death. One of the Holy Trinity, who is glorified with the Father and the Holy Spirit, save us.\n\nHoly God, who being God, for our sake, became man without change.\n\nHoly Mighty, who by weakness showed forth what is greater than power.\n\nHoly Immortal, who was crucified for our sake, and endured death in His flesh, the Eternal and Immortal.\n\nO Holy Trinity, have mercy on us." },
          ],
        },
        {
          id: "holyweek-great-friday-9th-hour-teeshoory",
          title: "Ϯϣⲟⲩⲣⲏ (9th hour Teeshoory)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-teeshori.mp3", text: "Ϯϣⲟⲩⲣⲏ ⲛ̀ⲛⲟⲩⲃ ⲧⲉ ϯⲠⲁⲣⲑⲉⲛⲟⲥ ⲡⲉⲥⲁ̀ⲣⲱⲙⲁⲧⲁ ⲡⲉ ⲡⲉⲛⲥ̅ⲱ̅ⲣ̅ ⲁⲥⲙⲓⲥⲓ ⲙ̀ⲙⲟϥ ⲁϥⲥⲱϯ ⲙ̀ⲙⲟⲛ ⲟⲩⲟϩ ⲁϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ." },
            { language: 'englishCoptic', audio: "alhan-pascha-teeshori.mp3", text: "Tishourē ennoub te ti-Parthenos pesarōmata pe pensōtēr asmisi emmof afsōti emmon ouoh afkha nennovi nan evol." },
            { language: 'english', text: "The golden censer is the Virgin, her aroma is our Savior. She gave birth to Him; He saved us and forgave us our sins." },
          ],
        },
        {
          id: "holyweek-great-friday-9th-hour-litanies-refrain",
          title: "Ⲱ̀ ⲫⲏⲉ̀ⲧⲁϥϫⲉⲙϯⲡⲓ (9th hour Litanies refrain)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-ninthhour.mp3", text: "Ⲱ̀ ⲫⲏⲉ̀ⲧⲁϥϫⲉⲙϯⲡⲓ ⲙ̀ⲫ̀ⲙⲟⲩ ϧⲉⲛ ⲧ̀ⲥⲁⲣⲝ ⲙ̀ⲫ̀ⲛⲁⲩ ⲛ̀ⲁϫⲡ ⲯⲓϯ ⲉⲑⲃⲏⲧⲉⲛ ϧⲱⲧⲉⲃ ⲛ̀ⲛⲉⲛⲗⲟⲅⲓⲥⲙⲟⲥ ⲛ̀ⲥⲱⲙⲁⲧⲓⲕⲟⲛ ⲱ̀Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲚⲟⲩϯ ⲟⲩⲟϩ ⲛⲁϩⲙⲉⲛ." },
            { language: 'englishCoptic', audio: "alhan-pascha-ninthhour.mp3", text: "Ō fē-etafjemtipi emefmou khen etsarks emefnau enajp psiti ethvēten khōteb ennenlogismos ensōmatikon ō-Pi-ekhristos pen-Nouti ouoh nahmen." },
            { language: 'english', text: "O who tasted death in the flesh at the ninth hour for our sake, us sinners, put to death our carnal desires O Christ our God and deliver us." },
          ],
        },
        {
          id: "holyweek-great-friday-12th-hour-pekethronos",
          title: "Ⲡⲉⲕⲑ̀ⲣⲟⲛⲟⲥ (12th hour PekEthronos)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-pekethronos-04.mp3", text: "Ⲡⲉⲕⲑ̀ⲣⲟⲛⲟⲥ Ⲫ̀ϯ ϣⲁⲉ̀ⲛⲉϩ ⲛ̀ⲧⲉ ⲡⲓⲉ̀ⲛⲉϩ ⲟⲩⲟϩ ⲡⲓϣ̀ⲃⲱⲧ ⲙ̀ⲡ̀ⲥⲱⲟⲩⲧⲉⲛ ⲡⲉ ⲡ̀ϣ̀ⲃⲱⲧ ⲛ̀ⲧⲉ ⲧⲉⲕⲙⲉⲧⲟ̀ⲩⲣⲟ.\n\nⲞ̀ⲩⲥ̀ⲙⲩⲣⲛⲁ ⲛⲉⲙ ⲟⲩⲥ̀ⲧⲁⲕⲧⲏ ⲛⲉⲙ ⲟ̀ⲩⲕⲁⲥⲓⲁ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲉⲕϩ̀ⲃⲱⲥ ⲁ̅ⲗ̅." },
            { language: 'englishCoptic', audio: "alhan-pascha-pekethronos-04.mp3", text: "Pekethronos Efti sha-eneh ente pi-eneh ouoh pi-eshvōt emepsōouten pe epeshvōt ente tekmetouro.\n\nOu-esmurna nem ou-estaktē nem oukasia evolkhen nekehvōs allēlouia." },
            { language: 'english', text: "Your throne, O God, is forever and ever; A scepter of righteousness is the scepter of Your kingdom.\n\nAll Your garments are scented with myrrh and aloes and cassia. Alleluia." },
          ],
        },
        {
          id: "holyweek-great-friday-golgotha",
          title: "Ⲅⲟⲗⲅⲟⲑⲁ (Golgotha)",
          versions: [
            { language: 'coptic', audio: "alhan-pascha-golgotha.mp3", text: "Ⲅⲟⲗⲅⲟⲑⲁ ⲙ̀ⲙⲉⲧ ϩⲉⲃⲣⲉⲟⲥ ⲡⲓⲕ̀ⲣⲁⲛⲓⲟⲛ ⲙ̀ⲙⲉⲧⲟⲩⲉⲓⲛⲓⲛ ⲡⲓⲙⲁⲉⲧⲁⲩⲁϣⲕ Ⲡⲭ̅ⲥ̅⳪ ⲛ̀ϧⲏⲧϥ ⲁⲕⲫⲱⲣϣ ⲛ̀ⲛⲉⲕϫⲓϫ ⲉ̀ⲃⲟⲗ ⲁϥⲓ̀ϣⲓ ⲛⲉⲙⲁⲕ ⲛ̀ⲕⲉⲥⲟⲛⲓ ⲥ̀ⲛⲁⲩ ⲥⲁⲧⲉⲕⲟⲩⲓ̀ⲛⲁⲙ ⲛⲉⲙ ⲥⲁⲧⲉⲕϫⲁⲧϭⲏ ⲛ̀ⲑⲟⲕ ⲉⲕⲭⲏ ϧⲉⲛ ⲧⲟⲩⲙⲏϯ ⲱ̀ ⲡⲓⲥⲱⲧⲏⲣ ⲛ̀ⲁⲅⲁⲑⲟⲥ.\n\nⲆⲟⲍⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ ⲁ̀ⲅⲓⲱ̀ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ.\n\nⲀϥⲱϣ ⲉ̀ⲃⲟⲗ ⲛ̀ϫⲉ ⲡⲓⲥⲟⲛⲓ ⲉⲧⲥⲁⲟⲩⲓ̀ ⲛⲁⲙ ⲉϥϫⲱ ⲙ̀ⲙⲟⲥ ϫⲉ ⲁ̀ⲣⲓⲡⲁⲙⲉⲩⲓ̀ ⲱ Ⲡⲁ⳪ ⲁ̀ⲣⲓⲡⲁⲙⲉⲩⲓ̀ ⲱ Ⲡⲁⲥⲱⲧⲏⲣ ⲁ̀ⲣⲓⲡⲁⲙⲉⲩⲓ̀ ⲱ Ⲡⲁⲟⲩⲣⲟ ⲁⲕϣⲁⲛⲓ̀ ϧⲉⲛ ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ\n\nⲀϥⲉⲣⲟⲩⲱ ⲛⲁϥ ⲛ̀ϫⲉ Ⲡ⳪ ϧⲉⲛ ⲟⲩⲥ̀ⲙⲏ ⲙ̀ⲙⲉⲧⲣⲉⲙⲣⲁⲩϣ ϫⲉ ⲙ̀ⲫⲟⲟⲩ ⲉⲕ ⲉ̀ϣⲱⲡⲓ ⲛⲉⲙⲏⲓ ⲛ̀ϩ̀ⲣⲏⲓ ϧⲉⲛ ⲧⲁⲙⲉⲧⲟⲩⲣⲟ.\n\nⲔⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥⲧⲟⲩⲥ ⲉ̀ⲱⲛ̀ⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ.\n\nⲀⲩⲓ̀ ⲛ̀ϫⲉ ⲛⲓⲇⲓⲕⲉⲟⲥ Ⲓⲱⲥⲏⲫ ⲛⲉⲙ Ⲛⲓⲕⲟⲇⲏⲙⲟⲥ ⲁⲩϭⲓ ⲛ̀ⲧ̀ⲥⲁⲣⲍ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅  ⲁⲩⲧ ⲛ̀ⲟⲩⲥⲟϫⲉⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱϥ ⲁⲩⲕⲟⲥϥ ⲁⲩⲭⲁϥ ϧⲉⲛ ⲟⲩⲙ̀ϩⲁⲩ ⲉⲩϩⲱⲥ ⲉⲣⲟϥ ⲉⲩϫⲱ ⲙ̀ⲙⲟⲥ ϫⲉ ⲁ̀ⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ ⲁ̀ⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲑⲁⲛⲁⲧⲟⲥ ⲟ̀ ⲥ̀ⲧⲁⲩⲣⲱⲑⲓⲥ ⲇⲓⲏ̀ⲙⲁⲥ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.\n\nⲆⲟⲍⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ ⲁ̀ⲅⲓⲱ̀ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ.\n\nⲔⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥⲧⲟⲩⲥ ⲉ̀ⲱⲛ̀ⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ.\n\nⲀⲛⲟⲛ ϩⲱⲛ ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟϥ ⲉⲛⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ ϫⲉ ⲛⲁⲓ ⲛⲁⲛ Ⲫϯ ⲡⲉⲛⲥⲱⲧⲏⲣ ⲫⲏⲉ̀ⲧⲁⲩⲁϥ ̀ⲉ̀ⲡⲓⲥ̀ⲧⲁⲩⲣⲟⲥ ⲉⲕⲉ̀ϧⲟⲙϧⲉⲙ ⲙ̀ⲡ̀ⲥⲁⲧⲁⲛⲁⲥ ⲥⲁⲡⲉⲥⲏⲧ ⲛ̀ⲛⲉⲛϭⲁⲗⲁⲩϫ.\n\nⲤⲱϯ ⲙ̀ⲙⲟⲛ ⲟⲩⲟϩ ⲛⲁⲓ ⲛⲁⲛ Ⲕⲩⲣⲓⲉ̀ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲕⲩⲣⲓⲉ̀ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲕⲩⲣⲓⲉ̀ ⲉⲩⲗⲟⲅⲏⲥⲟⲛ ⲁ̀ⲙⲏⲛ ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲓ ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟⲓ ⲓⲥ ϯⲙⲉⲧⲁⲛⲟⲓ̀ⲁ ⲭⲱ ⲛⲏⲓ ⲉ̀ⲃⲟⲗ ϫⲱ ⲙ̀ⲡⲓⲥ̀ⲙⲟⲩ." },
            { language: 'englishCoptic', audio: "alhan-pascha-golgotha.mp3", text: "Golgotha emmet hebreos pi-ekranion emmetoueinin pimaetauashk Pi-ekhristostshois enkhētf akfōrsh ennekjij evol afishi nemak enkesoni esnau satekou-inam nem satekjattshē enthok ekkhē khen toumēti ō pisōtēr enagathos.\n\nDoza Patri ke Uiō ke agi-ō Epneumati.\n\nAfōsh evol enje pisoni etsaou-i nam efjō emmos je aripameu-i ō Patshois aripameu-i ō Pasōtēr aripameu-i ō Paouro akshani khen tekmetouro\n\nAferouō naf enje Ptshois khen ou-esmē emmetremraush je emfoou ek eshōpi nemēi enehrēi khen tametouro.\n\nKe nun ke a-i ke istous eō-enas tōn e-ōnōn amēn.\n\nAu-i enje nidikeos Iōsēf nem Nikodēmos autshi enetsarz ente Pi-ekhristos  aut enousojen e-ehrēi ejōf aukosf aukhaf khen ou-emhau euhōs erof eujō emmos je agios o Theos agios iskhuros agios athanatos o estaurōthis di-ēmas ele-ēson ēmas.\n\nDoza Patri ke Uiō ke agi-ō Epneumati.\n\nKe nun ke a-i ke istous eō-enas tōn e-ōnōn amēn.\n\nAnon hōn marenouōsht emmof enōsh evol enjō emmos je nai nan Efnouti pensōtēr fē-etauaf epi-estauros ekekhomkhem emepsatanas sapesēt ennentshalauj.\n\nSōti emmon ouoh nai nan Kuri-e ele-ēson kuri-e ele-ēson kuri-e eulogēson amēn esmou eroi esmou eroi is timetano-ia khō nēi evol jō empi-esmou." },
            { language: 'english', text: "Golgotha in Hebrew, kranion in Greek, the place where You were crucified, O Lord. You stretched out Your hands, and crucified two thieves with You; one on Your right side, the other on Your left, and You, O good savior, in the midst.\n\nGlory be to the Father, to the Son, and to the Holy Spirit.\n\nThe right-hand thief cried out saying: Remember me, O my Lord, remember me, O my savior, remember me, O my King, when You come into Your Kingdom.\n\nThe Lord answered him in a lowly voice saying: This day you will be with Me in Paradise.\n\nBoth now, and ever and unto the age of all ages. Amen.\n\nThe righteous Joseph and Nicodemus came took away the Body of Christ, wrapped it in linen cloths with spices, and put it in a sepulcher and praised Him saying, “Holy God, Holy Mighty, Holy Immortal, who was crucified for us, have mercy on us.”\n\nGlory be to the Father, to the Son, and to the Holy Spirit.\n\nBoth now, and ever and unto the age of all ages. Amen.\n\nWe also worship him saying: “Have mercy on us, O God our Savior, who was crucified on the cross, destroy Satan under our feet.”\n\nSave us and have mercy on us. Lord have mercy, Lord have mercy, Lord bless us. Amen. Give the blessing; I prostrate, forgive me, give the blessing." },
          ],
        },
      ],
    },
    {
      id: "holyweek-apocalypse-praises",
      title: "Apocalypse Night: Praises and Matins",
      hymns: [
        {
          id: "holyweek-apocalypse-praises-psalm-151",
          title: "Ⲁ̀ⲛⲟⲕ ⲡⲉ ⲡⲓⲕⲟⲩϫⲓ (Psalm 151)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-anok.mp3", text: "Ⲇⲟⲝⲁ ⲥⲓ ⲟ̀ Ⲑⲉⲟⲥ ⲩ̀ⲙⲱⲛ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲠⲓⲱ̀ⲟⲩ ⲫⲁ ⲡⲉⲛⲚⲟⲩϯ ⲡⲉ.\n\nⲀ̀ⲛⲟⲕ ⲡⲉ ⲡⲓⲕⲟⲩϫⲓ ⲛ̀ϧ̀ⲣⲏⲓ ϧⲉⲛ ⲛⲁⲥ̀ⲛⲏⲟⲩ ⲟⲩⲟϩ ⲛ̀ⲁ̀ⲗⲟⲩ ϧⲉⲛ ⲡ̀ⲏⲓ ⲛ̀ⲧⲉ ⲡⲁⲓⲱⲧ ⲛⲁⲓ ⲁ̀ⲙⲟⲛⲓ ⲛ̀ⲛⲓⲉ̀ⲥⲱⲟⲩ ⲛ̀ⲧⲉ ⲡⲁⲓⲱⲧ. Ⲛⲁϫⲓϫ ⲁⲩⲑⲁⲙⲓⲟ ⲛ̀ⲟⲩⲟⲣⲅⲁⲛⲟⲛ ⲟⲩⲟϩ ⲛⲁⲧⲏⲃ ⲁⲩϩⲱⲧⲡ ⲛ̀ⲟ̀ⲯⲁⲗⲧⲏⲣⲓⲟⲛ. Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅." },
            { language: 'englishCoptic', audio: "alhan-brightsat-anok.mp3", text: "Doksa si o Theos umōn allēlouia.\n\nPi-ōou fa pen-Nouti pe.\n\nAnok pe pikouji enekhrēi khen na-esnēou ouoh enalou khen epēi ente paiōt nai amoni enni-esōou ente paiōt. Najij authamio enouorganon ouoh natēb auhōtp enopsaltērion. Allēlouia allēlouia allēlouia." },
            { language: 'english', text: "Glory be to You, O our God, Alleluia.\n\nGlory be to our God.\n\nI was small among my brothers, and the youngest in my father’s house; I tended my father’s sheep. My hands made a harp; my fingers fashioned a lyre. Alleluia, alleluia, alleluia." },
          ],
        },
        {
          id: "holyweek-apocalypse-praises-the-second-hoos-lobsh",
          title: "Ⲙⲁⲣⲉⲛⲟⲩⲱⲛϩ (The Second Hoos Lobsh)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-marenouonh.mp3", text: "Ⲙⲁⲣⲉⲛⲟⲩⲱⲛϩ ⲉ̀ⲃⲟⲗ ⲙ̀Ⲡⲓⲭ̀ⲣⲏⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲛⲉⲙ ⲡⲓⲉⲣⲟⲯⲁⲗⲧⲏⲥ Ⲇⲁⲩⲓⲇ ⲡⲓⲡ̀ⲣⲟⲫⲏⲧⲏⲥ .\n\nϪⲉ ⲁϥⲑⲁⲙⲓⲟ ⲛ̀ⲛⲓⲫⲏⲟⲩⲓ̀ ⲛⲉⲙ ⲛⲟⲩⲇⲩⲛⲁⲙⲓⲥ ⲁϥϩⲓⲥⲉⲛϯ ⲙ̀ⲡⲓⲕⲁϩⲓ ϩⲓϫⲉⲛ ⲛⲓⲙⲱⲟⲩ .\n\nⲚⲁⲓ ⲛⲓϣϯ ⲙ̀ⲫⲱⲥⲧⲏⲣ ⲡⲓⲣⲏ ⲛⲉⲙ ⲡⲓⲓⲟϩ ⲁϥⲭⲁⲩ ⲉⲩⲉ̀ⲣⲟⲩⲱⲓⲛⲓ ϧⲉⲛ ⲡⲓⲥ̀ⲧⲉⲣⲉⲱ̀ⲙⲁ.\n\nⲀϥⲓ̀ⲛⲓ ⲛ̀ϩⲁⲛⲑⲏⲟⲩ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲉϥⲁ̀ϩⲱⲣ ⲁϥⲛⲓϥⲓ ⲛ̀ⲥⲁ ⲛⲓϣ̀ϣⲏⲛ ϣⲁⲛ̀ⲧⲟⲩⲫⲓⲣⲓ ⲉ̀ⲃⲟⲗ.\n\nⲀϥϩⲱⲟⲩ ⲛ̀ⲟⲩⲙⲟⲩⲛϩⲱⲟⲩ ϩⲓϫⲉⲛ ⲡ̀ϩⲟ ⲙ̀ⲡ̀ⲕⲁϩⲓ ϣⲁⲛ̀ⲧⲉϥⲣⲱⲧ ⲉ̀ⲡ̀ϣⲱⲓ ⲛ̀ⲧⲉϥϯ ⲙ̀ⲡⲉϥⲟⲩⲧⲁϩ.\n\nⲀϥⲓ̀ⲛⲓ ⲛ̀ⲟⲩⲙⲱⲟⲩ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲟⲩⲡⲉⲧⲣⲁ ⲁϥⲧ̀ⲥⲟ ⲙ̀ⲡⲉϥⲗⲁⲟⲥ ⲛ̀ϩ̀ⲣⲏⲓ ϩⲓ ⲡ̀ϣⲁϥⲉ.\n\nⲀϥⲑⲁⲙⲓⲟ ⲙ̀ⲡⲓⲣⲱⲙⲓ ⲕⲁⲧⲁ ⲡⲉϥⲓ̀ⲛⲓ ⲛⲉⲙ ⲧⲉϥϩⲓⲕⲱⲛ ⲉⲑⲣⲉϥⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲟϥ.\n\nⲘⲁⲣⲉⲛϩⲱⲥ ⲉ̀ⲣⲟϥ ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲡⲉϥⲣⲁⲛ ⲧⲉⲛⲟⲩⲱⲛϩ ⲛⲁϥ ⲉ̀ⲃⲟⲗ ϫⲉ ⲡⲉϥⲛⲁⲓ ϣⲟⲡ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲉⲩⲭⲏ ⲛ̀ⲧⲉ ⲡⲓⲓⲉⲣⲟⲯⲁⲗⲧⲏⲥ Ⲇⲁⲩⲓⲇ Ⲡ⳪ ⲁ̀ⲣⲓϩ̀ⲙⲟⲧ ⲛⲁⲛ ⲙ̀ⲡⲓⲭⲱ ⲉ̀ⲃⲟⲗ ⲛ̀ⲧⲉ ⲛⲉⲛⲛⲟⲃⲓ.\n\nϨⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ̀ ⲛ̀ⲧⲉ ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ ⲉ̅ⲑ̅ⲩ̅ Ⲙⲁⲣⲓⲁ̀ Ⲡ⳪....\n\nϨⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ̀ ⲛ̀ⲧⲉ ⲡ̀ⲭⲟⲣⲟⲥ ⲧⲏⲣϥ ⲛ̀ⲧⲉ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ Ⲡ⳪...\n\nⲔⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲁ̀ⲗⲏⲑⲱⲥ ⲛⲉⲙ Ⲡⲉⲕⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ Ⲡⲓⲡ̅ⲛ̅ⲁ̅ ⲉ̅ⲑ̅ⲩ̅ ϫⲉ (ⲁⲕⲓ̀) ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-marenouonh.mp3", text: "Marenouōnh evol em-Pi-ekhrēstos Pennouti nem pieropsaltēs Dauid pi-eprofētēs .\n\nJe afthamio ennifēou-i nem noudunamis afhisenti empikahi hijen nimōou .\n\nNai nishti emfōstēr pirē nem piioh afkhau eu-erouōini khen pi-estere-ōma.\n\nAfini enhanthēou evolkhen nefahōr afnifi ensa ni-eshshēn sha-entoufiri evol.\n\nAfhōou enoumounhōou hijen epho emepkahi sha-entefrōt e-epshōi entefti empefoutah.\n\nAfini enoumōou evolkhen oupetra afetso empeflaos enehrēi hi epshafe.\n\nAfthamio empirōmi kata pefini nem tefhikōn ethrefesmou erof.\n\nMarenhōs erof tentshisi empefran tenouōnh naf evol je pefnai shop sha eneh.\n\nHiten nieukhē ente piieropsaltēs Dauid Ptshois ari-ehmot nan empikhō evol ente nennovi.\n\nHiten ni-epresvi-a ente tithe-otokos ethouab Mari-a Ptshois....\n\nHiten ni-epresvi-a ente epkhoros tērf ente niaggelos Ptshois...\n\nKesmarōout alēthōs nem Pekiōt enagathos nem Pi-epneuma ethouab je (aki) aksōti emmon." },
            { language: 'english', text: "Let us give thanks, to Christ our God, with David the prophet, and psalmist.\n\nFor He has made the heavens, and all its hosts, and established the earth, on the waters.\n\nThese two great stars, the sun and the moon, He has made to enlighten, the firmament.\n\nHe brought forth the winds, out of His treasure box, He breathed unto the trees, and they blossomed.\n\nHe caused the rain to fall, upon the face of the earth, and it sprouted, and gave its fruit.\n\nHe brought forth water, out of a rock, and gave it to His people, in the wilderness.\n\nHe made man, in His image, and His likeness, that he may praise Him.\n\nLet us praise Him, and exalt His name, and give thanks to Him, His mercy endures forever.\n\nThrough the prayers, of David the Psalmist, O Lord grant us, the forgiveness of our sins.\n\nThrough the intercessions, of the Mother of God Saint Mary, O Lord...\n\nThrough the intercessions, of all the heavenly hosts, O Lord....\n\nBlessed are You indeed, with You Good Father, and the Holy Spirit, for You have (come) and saved us." },
          ],
        },
      ],
    },
    {
      id: "holyweek-apocalypse-revelation",
      title: "Apocalypse Night: Revelation",
      hymns: [
        {
          id: "holyweek-apocalypse-revelation-hymn-of-st-john-the-beloved",
          title: "Ⲉ̀ⲣⲉ ⲡⲓⲥ̀ⲙⲟⲩ (hymn of St John the Beloved)",
          versions: [
            { language: 'coptic', audio: "alhan-audio-1791164705324-erepiesmoo.mp3", text: "Ⲉ̀ⲣⲉ ⲡⲓⲥ̀ⲙⲟⲩ ⲛ̀ⲧⲉ ⲡⲓⲑⲉⲟⲗⲟⲅⲟⲥ ⲛ̀ⲉⲩⲁⲅⲅⲉⲗⲓⲥⲧⲏⲥ Ⲓⲱⲁⲛⲛⲏⲥ ⲡⲓⲡⲁⲣⲑⲉⲛⲟⲥ: ⲉϥⲉ̀ⲓ̀ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲉⲛ ⲡⲁⲓⲗⲁⲟⲥ ⲁ̀ϫⲟⲥ ⲧⲏⲣⲟⲩ: ϫⲉ ⲁⲙⲏⲛ ⲉⲥⲉ̀ϣⲱⲡⲓ" },
            { language: 'englishCoptic', audio: "alhan-audio-1791164705324-erepiesmoo.mp3", text: "Ere pi-esmou ente pitheologos eneuaggelistēs Iōannēs piparthenos: efe-i e-ehrēi ejen pailaos ajos tērou: je amēn eseshōpi" },
            { language: 'english', text: "The blessing of the evangelist and theologian, John the virgin, shall come upon this congregation. All say, Amen so be it." },
            { language: 'arabic', text: "بركة اللاهوتي الإنجيلي يوحنا البتول تأتي وتحل علي هذا الشعب كله، قولوا كلكم آمين يكون" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-he-who-has-an-ear",
          title: "Ⲫⲏⲉ̀ⲧⲉ ⲟⲩⲟⲛ (He who has an ear)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-feete.mp3", text: "Ⲫⲏⲉ̀ⲧⲉ ⲟⲩⲟⲛ ⲙⲁϣϫ ⲙ̀ⲙⲟϥ ⲉ̀ⲥⲱⲧⲉⲙ ⲙⲁⲣⲉϥⲥⲱⲧⲉⲙ ϫⲉ ⲟⲩ ⲡⲉ ⲉ̀ⲧⲉ ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ϫⲱ ⲙ̀ⲙⲟϥ ⲛ̀ⲛⲓⲉⲕⲕ̀ⲗⲏⲥⲓⲁ̀." },
            { language: 'englishCoptic', audio: "alhan-brightsat-feete.mp3", text: "Fē-ete ouon mashj emmof esōtem marefsōtem je ou pe ete pi-epneuma jō emmof enniekeklēsi-a." },
            { language: 'english', text: "He who has an ear, let him hear, what the Spirit says, to the Churches." },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-tribe-of-judah",
          title: "Ⲓⲟⲩⲇⲁⲥ (Tribe of Judah)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-ioodas.mp3", text: "Ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲩⲗⲏ ⲛ̀Ⲓⲟⲩⲇⲁⲥ ⲓ̅ⲃ ⲛ̀ϣⲟ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-ioodas.mp3", text: "Evolkhen etfulē en-Ioudas ib ensho." },
            { language: 'english', text: "Of the tribe of Judah twelve thousand" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-tribe-of-reuben",
          title: "Ⲣⲟⲩⲃⲏⲛ (Tribe of Reuben)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-roobeen.mp3", text: "Ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲩⲗⲏ ⲛ̀Ⲣⲟⲩⲃⲏⲛ ⲓ̅ⲃ ⲛ̀ϣⲟ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-roobeen.mp3", text: "Evolkhen etfulē en-Rouvēn ib ensho." },
            { language: 'english', text: "Of the tribe of Reuben twelve thousand" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-tribe-of-gad",
          title: "Ⲅⲁⲇ (Tribe of Gad)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-gad.mp3", text: "Ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲩⲗⲏ ⲛ̀Ⲅⲁⲇ ⲓ̅ⲃ ⲛ̀ϣⲟ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-gad.mp3", text: "Evolkhen etfulē en-Gad ib ensho." },
            { language: 'english', text: "Of the tribe of Gad twelve thousand" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-tribe-of-asher",
          title: "Ⲁⲥⲥⲏⲣ (Tribe of Asher)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-aseer.mp3", text: "Ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲩⲗⲏ ⲛ̀Ⲁⲥⲥⲏⲣ ⲓ̅ⲃ ⲛ̀ϣⲟ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-aseer.mp3", text: "Evolkhen etfulē en-Assēr ib ensho." },
            { language: 'english', text: "Of the tribe of Asher twelve thousand" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-tribe-of-naphtali",
          title: "Ⲛⲉⲫⲑⲁⲗⲓ̀ⲙ (Tribe of Naphtali)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-nefthalim.mp3", text: "Ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲩⲗⲏ ⲛ̀Ⲉⲫⲑⲁⲗⲓ̀ⲙ ⲓ̅ⲃ ⲛ̀ϣⲟ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-nefthalim.mp3", text: "Evolkhen etfulē en-Efthalim ib ensho." },
            { language: 'english', text: "Of the tribe of Naphtali twelve thousand" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-tribe-of-manasseh",
          title: "Ⲙⲁⲛⲁⲥⲏ (Tribe of Manasseh)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-manasse.mp3", text: "Ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲩⲗⲏ ⲛ̀Ⲙⲁⲛⲁⲥⲏ ⲓ̅ⲃ ⲛ̀ϣⲟ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-manasse.mp3", text: "Evolkhen etfulē en-Manasē ib ensho." },
            { language: 'english', text: "Of the tribe of Manasseh twelve thousand" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-tribe-of-simeon",
          title: "Ⲥⲩⲙⲉⲱⲛ (Tribe of Simeon)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-cimeon.mp3", text: "Ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲩⲗⲏ ⲛ̀Ⲥⲩⲙⲉⲱⲛ ⲓ̅ⲃ ⲛ̀ϣⲟ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-cimeon.mp3", text: "Evolkhen etfulē en-Sumeōn ib ensho." },
            { language: 'english', text: "Of the tribe of Simeon twelve thousand" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-tribe-of-issachar",
          title: "Ⲓⲥⲁⲭⲁⲣ (Tribe of Issachar)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-isakar.mp3", text: "Ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲩⲗⲏ ⲛ̀Ⲓⲥⲁⲭⲁⲣ ⲓ̅ⲃ ⲛ̀ϣⲟ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-isakar.mp3", text: "Evolkhen etfulē en-Isakhar ib ensho." },
            { language: 'english', text: "Of the tribe of Issachar twelve thousand" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-tribe-of-zebulun",
          title: "Ⲍⲁⲃⲟⲩⲗⲱⲛ (Tribe of Zebulun)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-zaboulon.mp3", text: "Ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲩⲗⲏ ⲛ̀Ⲍⲁⲃⲟⲩⲗⲱⲛ ⲓ̅ⲃ ⲛ̀ϣⲟ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-zaboulon.mp3", text: "Evolkhen etfulē en-Zavoulōn ib ensho." },
            { language: 'english', text: "Of the tribe of Zebulun twelve thousand" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-tribe-of-joseph",
          title: "Ⲓⲱⲥⲏⲫ (Tribe of Joseph)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-iousef.mp3", text: "Ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲩⲗⲏ ⲛ̀Ⲓⲱⲥⲏⲫ ⲓ̅ⲃ ⲛ̀ϣⲟ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-iousef.mp3", text: "Evolkhen etfulē en-Iōsēf ib ensho." },
            { language: 'english', text: "Of the tribe of Joseph twelve thousand" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-tribe-of-benjamin",
          title: "Ⲃⲉⲛⲓⲁ̀ⲙⲏⲛ (Tribe of Benjamin)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-benyameen.mp3", text: "Ⲉ̀ⲃⲟⲗϧⲉⲛ ⲧ̀ⲫⲩⲗⲏ ⲛ̀Ⲃⲉⲛⲓⲁ̀ⲙⲏⲛ ⲓ̅ⲃ ⲛ̀ϣⲟ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-benyameen.mp3", text: "Evolkhen etfulē en-Veni-amēn ib ensho." },
            { language: 'english', text: "Of the tribe of Benjamin twelve thousand" },
          ],
        },
        {
          id: "holyweek-apocalypse-revelation-and-our-savior",
          title: "Ⲉ̀ⲣⲉ ⲡⲉⲛⲤⲱⲧⲏⲣ (And our Savior)",
          versions: [
            { language: 'coptic', audio: "alhan-brightsat-erepensoteer.mp3", text: "Ⲉ̀ⲣⲉ ⲡⲉⲛⲤⲱⲧⲏⲣ ϧⲉⲛ ⲧⲉⲥⲙⲏϯ ⲉϥϯⲭ̀ⲗⲟⲙ ϩⲓ ⲧⲁⲓⲟ̀ ⲛ̀ⲛⲏⲉⲑⲙⲉⲓ ⲙ̀ⲙⲟϥ." },
            { language: 'englishCoptic', audio: "alhan-brightsat-erepensoteer.mp3", text: "Ere pen-Sōtēr khen tesmēti efti-ekhlom hi tai-o ennēethmei emmof." },
            { language: 'english', text: "And our Savior in the midst of it giving a crown and honoring the ones who love Him." },
          ],
        },
      ],
    },
  ],
  "pentecost": [
    {
      id: "pentecost-matins",
      title: "Vespers and Matins",
      hymns: [
        {
          id: "pentecost-matins-verses-of-the-cymbals",
          title: "Ⲁ̀Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲚⲟⲩϯ (Verses of the cymbals)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-verses-of-the-cymbals.mp3", text: "Ⲁ̀ Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲚⲟⲩϯ ⲧⲱⲛϥ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉ̀ⲑⲙⲱⲟ̀ⲩⲧ Ⲛ̀ⲑⲟϥ ⲡⲉ ⲧ̀ⲁ̀ⲡⲁⲣⲭⲏ ⲛ̀ⲧⲉ ⲛⲏⲉ̀ⲧⲁⲩⲉ̀ⲛⲕⲟⲧ.\n\n+ Ⲭⲉⲣⲉ Ⲧⲉϥⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ ⲉ̀ⲧⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉ̀ⲑⲙⲱⲟ̀ⲩⲧ ϣⲁⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲉⲛⲛⲟⲃⲓ.\n\nⲖⲟⲓⲡⲟⲛ ⲁⲩⲭⲁϥ ϧⲉⲛ ⲡⲓⲙ̀ϩⲁⲩ ⲕⲁⲧⲁ ⲛⲓⲥ̀ⲙⲏⲓ ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ ϧⲉⲛ ⲡⲓⲙⲁϩϣⲟⲙⲧ ⲛ̀ⲉ̀ϩⲟⲟ̀ⲩ Ⲡⲭ̅ⲥ̅ ⲁ̀ⲛⲉⲥⲧⲏ ⲉⲕⲛⲉⲕⲣⲱⲛ.\n\n+ Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ...\n\nⲬⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ...\n\n+ Ⲭⲉⲣⲉ Ⲙⲓⲭⲁⲏ̀ⲗ ⲡⲓⲛⲓϣϯ ⲛ̀ⲁ̀ⲣⲭⲏⲁ̀ⲅⲅⲉⲗⲟⲥ ⲡⲓⲭ̀ⲣⲓⲙⲁⲛ ⲛ̀ⲟ̀ⲩⲅⲁⲓ ⲛ̀ⲧⲉ ϯⲀ̀ⲛⲁⲥⲧⲁⲥⲓⲥ.\n\nⲒ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲛ̀ⲥⲁϥ ⲛⲉⲙ ⲫⲟⲟ̀ⲩ Ⲛ̀ⲑⲟϥ Ⲛ̀ⲑⲟϥ ⲡⲉ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ ϧⲉⲛ ⲟ̀ⲩϩⲩⲡⲟⲥⲧⲁⲥⲓⲥ ⲛ̀ⲟ̀ⲩⲱ̀ⲧ ⲧⲉⲛⲟ̀ⲩⲱ̀ϣⲧ ⲙ̀ⲙⲟϥ ⲧⲉⲛϯⲱ̀ⲟ̀ⲩ ⲛⲁϥ.\n\n+ Ⲡ̀Ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ϯϩⲓⲣⲏⲛⲏ ⲙⲟⲓ ⲛⲁⲛ ⲛ̀ⲧⲉⲕϩⲓⲣⲏⲛⲏ..." },
            { language: 'englishCoptic', audio: "alhan-resurrection-verses-of-the-cymbals.mp3", text: "A Pi-ekhristos pen-Nouti tōnf evolkhen nē-ethmō-out Enthof pe etaparkhē ente nē-etau-enkot.\n\n+ Shere Tefanastasis etaftōnf evolkhen nē-ethmō-out sha-entefsōti emmon evolkhen nennovi.\n\nLoipon aukhaf khen pi-emhau kata ni-esmēi emeprofētikon khen pimahshomt eneho-ou Pi-ekhristos anestē eknekrōn.\n\n+ Shere ne Maria...\n\nShere ne Maria...\n\n+ Shere Mikha-ēl pinishti enarkhē-aggelos pi-ekhriman enougai ente ti-Anastasis.\n\nIēsous Pi-ekhristos ensaf nem fo-ou Enthof Enthof pe nem sha eneh khen ouhupostasis enou-ōt tenou-ōsht emmof tenti-ō-ou naf.\n\n+ Ep-Ouro ente tihirēnē moi nan entekhirēnē..." },
            { language: 'english', text: "Christ our God, has risen from the dead, He is the first-fruit, of those who departed.\n\n+ Hail to His Resurrection, when He rose from the dead, He saved us, from our sins.\n\nThen He was placed in the tomb, according to the prophetic sayings, and on the third day, Christ is risen from the dead.\n\n+ Hail to you O Mary...\n\nHail to you O Mary...\n\n+ Hail to Michael the great Archangel, the Announcer of salvation, of the Resurrection. ... ...\n\nJesus Christ the same yesterday, today and forever, in one hypostasis, we worship and glorify Him.\n\n+ O King of peace, grant us Your peace..." },
          ],
        },
        {
          id: "pentecost-matins-first-doxology",
          title: "Ⲧⲟⲧⲉ ⲣⲱⲛ (First Doxology)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-doxology.mp3", text: "Ⲧⲟⲧⲉ ⲣⲱⲛ ⲁϥⲙⲟϩ ⲛ̀ⲣⲁϣⲓ ⲟⲩⲟϩ ⲡⲉⲛⲗⲁⲥ ϧⲉⲛ ⲟ̀ⲩⲑⲉⲗⲏⲗ ϫⲉ ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏⲉ̀ⲑⲙⲱⲟ̀ⲩⲧ.\n\n+ Ⲁϥⲕⲱⲣϥ ⲙ̀ⲫ̀ⲙⲟⲩ ϧⲉⲛ ⲧⲉϥϫⲟⲙ ⲁϥⲑ̀ⲣⲉⲡ̀ⲱ̀ⲛϧ ⲉ̀ⲣⲟ̀ⲩⲱ̀ⲓⲛⲓ ⲉ̀ⲣⲟⲛ Ⲛ̀ⲑⲟϥ ⲟⲛ ⲫⲏⲉ̀ⲧⲁϥϣⲉⲛϣⲁϥ ⲉ̀ⲛⲓⲙⲁ ⲉⲧⲥⲁⲡⲉⲥⲏⲧ ⲙ̀ⲡ̀ⲕⲁϩⲓ.\n\nⲚⲓⲙ̀ⲛⲟⲩⲧ ⲛ̀ⲧⲉ Ⲁ̀ⲙⲉⲛϯ ⲁⲩⲛⲁⲩ ⲉ̀ⲣⲟϥ ⲁⲩⲉ̀ⲣϩⲟϯ ⲁϥⲧⲁⲕⲟ ⲛ̀ⲛⲓⲛⲁⲕϩⲓ ⲙ̀ⲫ̀ⲙⲟⲩ ⲙ̀ⲡⲟⲩϣ̀ϫⲉⲙϫⲟⲙ ⲛ̀ⲁ̀ⲙⲟⲛⲓ ⲙ̀ⲙⲟϥ.\n\n+ Ⲁϥϧⲟⲙϧⲉⲙ ⲛ̀ϩⲁⲛⲡⲩⲗⲏ ⲛ̀ϩ̀ⲟⲙⲧ ⲁϥⲕⲱϣ ⲛ̀ϩⲁⲛⲙⲟⲭⲗⲟⲩⲥ ⲙ̀ⲃⲉⲛⲓⲡⲓ ⲁϥⲓ̀ⲛⲓ ⲛ̀ⲛⲉϥⲥⲱⲧⲡ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲟ̀ⲩⲟ̀ⲩⲛⲟϥ ⲛⲉⲙ ⲟ̀ⲩⲑⲉⲗⲏⲗ.\n\nⲀϥⲟ̀ⲗⲟⲩ ⲉ̀ⲡ̀ϭⲓⲥⲓ ⲛⲉⲙⲁϥ ⲉ̀ϧⲟⲩⲛ ⲉ̀ⲛⲉϥⲙⲁⲛ̀ⲉ̀ⲙⲧⲟⲛ ⲁϥⲛⲁϩⲙⲟⲩ ⲉⲑⲃⲉ ⲡⲉϥⲣⲁⲛ ⲁϥⲟ̀ⲩⲱ̀ⲛϩ ⲛ̀ⲧⲉϥϫⲟⲙ ⲛⲱⲟ̀ⲩ ⲉ̀ⲃⲟⲗ.\n\n+ Ⲉⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛⲟⲓ ⲛ̀ⲣⲁⲙⲁⲟ̀ ϧⲉⲛ ⲛⲓⲁ̀ⲅⲁⲑⲟⲛ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲟ̀ⲩⲛⲁϩϯ ⲧⲉⲛⲉ̀ⲣⲉⲯⲁⲗⲓⲛ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ ϫⲉ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ.\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ⲟ̀ⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟ̀ⲩ ⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲛⲏⲉ̀ⲑⲙⲱⲟ̀ⲩⲧ.\n\n+ Ⲫⲁⲓ ⲉ̀ⲣⲉ ⲡⲓⲱ̀ⲟ̀ⲩ ⲉⲣⲡ̀ⲣⲉⲡⲓⲛⲁϥ ⲛⲉⲙ Ⲡⲉϥⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-doxology.mp3", text: "Tote rōn afmoh enrashi ouoh penlas khen outhelēl je pentshois Iēsous Pi-ekhristos aftōnf evol khen nē-ethmō-out.\n\n+ Afkōrf emefmou khen tefjom afethre-epōnkh erou-ōini eron Enthof on fē-etafshenshaf enima etsapesēt emepkahi.\n\nNi-emnout ente Amenti aunau erof au-erhoti aftako enninakhi emefmou empou-eshjemjom enamoni emmof.\n\n+ Afkhomkhem enhanpulē enehomt afkōsh enhanmokhlous emvenipi afini ennefsōtp evol khen ou-ounof nem outhelēl.\n\nAfolou e-eptshisi nemaf ekhoun enefma-enemton afnahmou ethve pefran afou-ōnh entefjom nō-ou evol.\n\n+ Ethve fai tenoi enrama-o khen ni-agathon etjēk evol khen ounahti tenerepsalin enjō emmos je allēlouia.\n\nAllēlouia allēlouia allēlouia allēlouia Iēsous Pi-ekhristos ep-Ouro ente epō-ou aftōnf evol khen nē-ethmō-out.\n\n+ Fai ere pi-ō-ou ereprepinaf nem Pefiōt enagathos nem pi-Epneuma ethouab isjen tinou nem sha eneh." },
            { language: 'english', text: "Then our mouths are filled with joy, and our tongues with rejoicing, for our Lord Jesus Christ, has risen from the dead.\n\n+ He has abolished death by His might, and made life shine upon us, He is the One who has descended, to the lower parts of the earth.\n\nThe gatekeepers of Hades, saw Him and were afraid, He abolished the pangs of death, and He was not held by them.\n\n+ He has crushed the gates of brass, and broke the bars of iron, and brought out His chosen ones, with rejoicing and with joy.\n\nHe lifted them up with Him, into His place of rest, and saved them for His name's sake, He revealed His power to them.\n\n+ Therefore we are wealthy, with perfect gifts, and with faith we sing, saying Alleluia.\n\nAlleluia Alleluia, Alleluia Alleluia, Jesus Christ the King of glory, has risen from the dead.\n\n+ This is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever." },
          ],
        },
        {
          id: "pentecost-matins-archangel-michael-doxology",
          title: "Ⲥⲁ ⲧ̀Ⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ (Archangel Michael Doxology)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-michael-doxology.mp3", text: "Ⲥⲁ ⲧ̀Ⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ ⲛ̀ⲧⲉ Ⲡⲭ̅ⲥ̅ ⲛ̀ϫⲉ ⲛⲓϩⲓⲟⲙⲓ ⲙ̀ϥⲁⲓⲥⲟϫⲉⲛ ⲁⲩⲓ̀ ⲁⲩⲕⲱϯ ϧⲉⲛ ⲟ̀ⲩⲥ̀ⲡⲟⲩⲇⲏ ⲁϥⲟ̀ⲩⲱ̀ⲛϩ ⲛⲱⲟ̀ⲩ ⲛ̀ϫⲉ Ⲙⲓⲭⲁⲏ̀ⲗ.\n\n+ Ⲡⲉϥⲥ̀ⲙⲟⲧ ⲇⲉ ⲛⲁϥⲟⲓ ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲟ̀ⲩⲥⲉⲧⲉⲃⲣⲏϫ ⲛ̀ⲟ̀ⲩⲱ̀ⲓⲛⲓ ⲟⲩⲟϩ ⲧⲉϥϩⲉⲃⲥⲱ ⲥ̀ⲟ̀ⲩⲱ̀ⲃϣ ⲙ̀ⲫ̀ⲣⲏϯ ⲛ̀ⲟ̀ⲩⲭⲓⲱⲛ.\n\nⲀϥⲉ̀ⲣⲟ̀ⲩⲱ̀ ⲟⲩⲟϩ ⲡⲉϫⲁϥ ⲛ̀ⲛⲓϩⲓⲟⲙⲓ ⲙ̀ϥⲁⲓⲥⲟϫⲉⲛ ϫⲉ ⲫⲏⲉ̀ⲧⲉⲧⲉⲛⲕⲱϯ ⲛ̀ⲥⲱϥ ⲁϥⲧⲱⲛϥ ϥ̀ⲭⲏ ⲙ̀ⲡⲁⲓ ⲙⲁ ⲁⲛ.\n\n+ Ⲓⲱⲥ ⲟⲩⲟϩ ⲙⲁϣⲉⲛⲱⲧⲉⲛ ⲁ̀ϫⲟⲥ ⲛ̀ⲛⲉϥⲁ̀ⲡⲟⲥⲧⲟⲗⲟⲥ ϫⲉ ⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉ̀ⲑⲙⲱⲟ̀ⲩⲧ ⲕⲁⲧⲁ ⲫ̀ⲣⲏϯ ⲉ̀ⲧⲁϥϫⲟⲥ ⲛⲱⲧⲉⲛ.\n\nⲢⲁϣⲓ ϫⲉ ⲫⲏⲉ̀ⲧⲁⲩⲁ̀ϣϥ ⲁϥⲧⲱⲛϥ ϩⲏⲡⲡⲉ ϥ̀ⲛⲁⲉ̀ⲣϣⲟⲣⲡ ⲉ̀ⲣⲱⲧⲉⲛ ⲉ̀ϯⲄⲁⲗⲓⲗⲉⲁ̀ ⲧⲉⲧⲉⲛⲛⲁⲩ ⲉ̀ⲣⲟϥ ⲙ̀ⲙⲁⲩ ϫⲉ ⲁⲓϫⲟⲥ ⲛⲱⲧⲉⲛ.\n\n+ Ⲟ̀ⲩⲛⲓϣϯ ⲅⲁⲣ ⲡⲉ ⲡⲉⲕⲧⲁⲓⲟ ⲱ̀ Ⲙⲓⲭⲁⲏ̀ⲗ ⲡ̀ⲁ̀ⲣⲭⲱⲛ ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟ̀ⲩⲓ̀ ϫⲉ ⲛ̀ⲑⲟⲕ ⲉ̀ⲧⲁⲕϩⲓϣⲉⲛⲛⲟⲩϥⲓ ⲛⲁⲛ ϧⲉⲛ ϯⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ ⲙ̀Ⲡ̀⳪.\n\nⲰ̀ ⲥ̀ⲧⲁⲩⲣⲱⲑⲓⲥ ⲇⲓ ⲏ̀ⲙⲁⲥ ⲱ̀ Ⲡⲭ̅ⲥ̅ ⲡ̀Ⲟ̀ⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟ̀ⲩ Ⲁⲛⲁⲥⲧⲁⲥ ⲉⲕⲧⲱⲛ ⲛⲉⲕⲣⲱⲛ ⲟⲩⲟϩ ⲁⲕϯ ⲛⲁⲛ ⲙ̀ⲡⲉⲕⲟ̀ⲩⲛⲟϥ.\n\n+ Ⲁ̀ⲣⲓⲡ̀ⲣⲉⲥⲃⲉⲩⲓⲛ ⲉ̀ϩ̀ⲣⲏⲓ ⲉ̀ϫⲱⲛ ⲱ̀ ⲡⲓⲥⲁⲗⲡⲓⲥⲧⲏⲥ ⲛ̀ⲧⲉ ϯⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ Ⲙⲓⲭⲁⲏ̀ⲗ ⲡ̀ⲁ̀ⲣⲭⲱⲛ ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟ̀ⲩⲓ̀ ⲛ̀ⲧⲉϥ ⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉⲃⲟⲗ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-michael-doxology.mp3", text: "Sa et-Anastasis ente Pi-ekhristos enje nihiomi emfaisojen au-i aukōti khen ou-espoudē afou-ōnh nō-ou enje Mikha-ēl.\n\n+ Pefesmot de nafoi emefrēti enousetebrēj enou-ōini ouoh tefhebsō esou-ōbsh emefrēti enoukhiōn.\n\nAferou-ō ouoh pejaf ennihiomi emfaisojen je fē-etetenkōti ensōf aftōnf efkhē empai ma an.\n\n+ Iōs ouoh mashenōten ajos ennefapostolos je aftōnf evolkhen nē-ethmō-out kata efrēti etafjos nōten.\n\nRashi je fē-etau-ashf aftōnf hēppe efna-ershorp erōten eti-Galile-a tetennau erof emmau je aijos nōten.\n\n+ Ounishti gar pe pektaio ō Mikha-ēl eparkhōn enna nifē-ou-i je enthok etakhishennoufi nan khen ti-anastasis em-Eptshois.\n\nŌ estaurōthis di ēmas ō Pi-ekhristos ep-Ouro ente epō-ou Anastas ektōn nekrōn ouoh akti nan empekounof.\n\n+ Ari-epresveuin e-ehrēi ejōn ō pisalpistēs ente ti-anastasis Mikha-ēl eparkhōn enna nifē-ou-i entef kha nennovi nan evol." },
            { language: 'english', text: "At the Resurrection of Christ, the women carrying fragrant oil, came and sought earnestly, and Michael appeared to them.\n\n+ His appearance became, illuminated like lightning, and his clothes, became white like snow.\n\nHe answered and said, to the women carrying the fragrant oil, \"Who are you looking for, He is risen He is not here.\"\n\n+ Now go quickly, tell His apostles, He has risen from the dead, as He said to you.\n\nRejoice for He who was crucified, arose and goes before you, to Galilee there you will see Him, behold I have told you.\n\n+ Great is your honor, O Michael the head of the heavenly, for you preached to us, the Resurrection of Christ.\n\nO You who were crucified for us, O Christ the King of glory, You have risen from the dead, and granted us Your joy.\n\n+ Intercede on our behalf, O trumpeter of the Resurrection, Michael the head of the heavenly, that He may forgive us our sins." },
          ],
        },
        {
          id: "pentecost-matins-matins-gospel-response",
          title: "Ⲭ̀ⲟ̀ⲩⲁⲃ Ⲡ⳪ (Matins - Gospel Response)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-matins-gospel-response.mp3", text: "Ⲭ̀ⲟ̀ⲩⲁⲃ Ⲡ⳪ ⲟⲩⲟϩ ⲕ̀ⲥ̀ⲙⲁⲣⲱⲟ̀ⲩⲧ ⲁⲕϭⲓ ⲙ̀ⲕⲁϩ ⲟⲩⲟϩ ⲙ̀ⲡⲉⲕⲅⲱⲛⲧ ⲁⲕⲧⲱⲛⲕ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉ̀ⲑⲙⲱⲟ̀ⲩⲧ ϧⲉⲛ ⲡⲓⲉ̀ϩⲟⲟ̀ⲩ ⲙ̀ⲙⲁϩϣⲟⲙⲧ.\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ⲟ̀ⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟ̀ⲩ ⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉ̀ⲑⲙⲱⲟ̀ⲩⲧ.\n\nⲪⲁⲓ ⲉ̀ⲣⲉ ⲡⲓⲱ̀ⲟ̀ⲩ ⲉⲣⲡ̀ⲣⲉⲡⲓⲛⲁϥ ⲛⲉⲙ Ⲡⲉϥⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nϪⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟ̀ⲩⲧ ⲛ̀ϫⲉ ⲫ̀Ⲓⲱⲧ ⲛⲉⲙ ⲡ̀Ϣⲏⲣⲓ ⲛⲉⲙ ⲡⲓⲠ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ϯⲦ̀ⲣⲓⲁⲥ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ ⲧⲉⲛⲟ̀ⲩⲱ̀ϣⲧ ⲙ̀ⲙⲟⲥ ⲧⲉⲛϯⲱ̀ⲟ̀ⲩ ⲛⲁⲥ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-matins-gospel-response.mp3", text: "Ekhouab Ptshois ouoh ekesmarō-out aktshi emkah ouoh empekgōnt aktōnk evolkhen nē-ethmō-out khen pi-eho-ou emmahshomt.\n\nAllēlouia allēlouia allēlouia allēlouia Iēsous Pi-ekhristos ep-Ouro ente epō-ou aftōnf evolkhen nē-ethmō-out.\n\nFai ere pi-ō-ou ereprepinaf nem Pefiōt enagathos nem pi-Epneuma ethouab isjen tinou nem sha eneh.\n\nJe efesmarō-out enje ef-Iōt nem ep-Shēri nem pi-Epneuma ethouab ti-Etrias etjēk evol tenou-ōsht emmos tenti-ō-ou nas." },
            { language: 'english', text: "Holy and blessed are You O Lord, for You have suffered and was not angered, and You have risen from the dead, on the third day.\n\nAlleluia Alleluia, Alleluia Alleluia, Jesus Christ the King of glory, has risen from the dead.\n\nThis is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.\n\nBlessed be the Father and the Son, and the Holy Spirit, the perfect Trinity, we worship Him and glorify Him." },
          ],
        },
      ],
    },
    {
      id: "pentecost-liturgy",
      title: "Liturgy",
      hymns: [
        {
          id: "pentecost-liturgy-hiten-for-archangel-michael",
          title: "Ϩⲓⲧⲉⲛ Ⲙⲓⲭⲁⲏ̀ⲗ (Hiten for Archangel Michael)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-hitenmichael.mp3", text: "Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ ⲛ̀ⲧⲉ ⲡⲓⲥⲁⲗⲡⲓⲥⲧⲏⲥ ⲛ̀ϯⲀ̀ⲛⲁⲥⲧⲁⲥⲓⲥ Ⲙⲓⲭⲁⲏ̀ⲗ ⲡ̀ⲁ̀ⲣⲭⲱⲛ ⲛ̀ⲛⲁ ⲛⲓⲫⲏⲟ̀ⲩⲓ̀ Ⲡ̀⳪..." },
            { language: 'englishCoptic', audio: "alhan-resurrection-hitenmichael.mp3", text: "Hiten ni-epresvia ente pisalpistēs enti-Anastasis Mikha-ēl eparkhōn enna nifē-ou-i Eptshois..." },
            { language: 'english', text: "Through the intercessions, of the trumpeter of Resurrection, Michael the head of the heavenly, O Lord..." },
          ],
        },
        {
          id: "pentecost-liturgy-hiten-for-joseph-nicodemus",
          title: "Ϩⲓⲧⲉⲛ ⲛⲓⲑ̀ⲙⲏⲓ ⲛⲓⲣⲱⲙⲓ (Hiten for Joseph & Nicodemus)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-hitenniromi.mp3", text: "Ϩⲓⲧⲉⲛ ⲛⲓⲉ̀ⲩⲭⲏ ⲛ̀ⲧⲉ ⲛⲓⲑ̀ⲙⲏⲓ ⲛⲓⲣⲱⲙⲓ ⲛ̀ⲧⲉⲗⲓⲟⲥ Ⲓⲱⲥⲏⲫ ⲛⲉⲙ Ⲛⲓⲕⲟⲇⲏⲙⲟⲥ ⲛⲉⲙ ϯⲁ̀ⲅⲓⲁ Ⲙⲁⲣⲓⲁ ϯⲘⲁⲅⲇⲁⲗⲓⲛⲏ Ⲡ̀⳪..." },
            { language: 'englishCoptic', audio: "alhan-resurrection-hitenniromi.mp3", text: "Hiten ni-eukhē ente ni-ethmēi nirōmi entelios Iōsēf nem Nikodēmos nem ti-agia Maria ti-Magdalinē Eptshois..." },
            { language: 'english', text: "Through the prayers, of the two righteous perfect men, Joseph and Nicodemus, and St. Mary Magdalene, O Lord...." },
          ],
        },
        {
          id: "pentecost-liturgy-acts-response",
          title: "Ⲭⲉⲣⲉ Ⲧⲉϥⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ (Acts Response)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-praxisresponse.mp3", text: "Ⲭⲉⲣⲉ Ⲧⲉϥⲁ̀ⲛⲁⲥⲧⲁⲥⲓⲥ ⲉ̀ⲧⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉ̀ⲑⲙⲱⲟ̀ⲩⲧ ϣⲁⲛ̀ⲧⲉϥⲥⲱϯ ⲙ̀ⲙⲟⲛ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲉⲛⲛⲟⲃⲓ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-praxisresponse.mp3", text: "Shere Tefanastasis etaftōnf evolkhen nē-ethmō-out sha-entefsōti emmon evolkhen nennovi." },
            { language: 'english', text: "Hail to His Resurrection, when He rose from the dead, He saved us, from our sins." },
          ],
        },
        {
          id: "pentecost-liturgy-o-nimnai",
          title: "ⲱ̀ ⲛⲓⲙ ⲛⲁⲓ (O NimNai)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-onimnai.mp3", text: "ⲱ̀ ⲛⲓⲙ ⲛⲁⲓ ⲥⲩⲙⲫⲱⲛⲓⲁ" },
            { language: 'englishCoptic', audio: "alhan-resurrection-onimnai.mp3", text: "ō nim nai sumfōnia" },
            { language: 'english', text: "O what a harmonious tune" },
          ],
        },
        {
          id: "pentecost-liturgy-ya-kol-alsefoof",
          title: "يا كل الصفوف السمائيين (Ya Kol Alsefoof)",
          versions: [
            { language: 'arabic', audio: "alhan-resurrection-yakolalsefoof.mp3", text: "يا كل الصفوف السمائيين. رتلوا لإلهنا بنغمات التسبيح وابتهجوا معنا اليوم فرحين. بقيامة السيد المسيح\n\nاليوم قد كملت النبوات. وتمت اقوال الأباء الأولين بقيامة الرب من بين الأموات وهو بدء المضطجعين\n\nقد قام الرب مثل النائم. وكالثمل من الخمرة، ووهبنا النعيم الدائم، وعتقنا من العبودية المرة\n\nوسبي الجحيم سبيًا. وحطم ابوابه النحاس. وكسر متاريسه الحديد كسرًا. وأبدل لنا العقوبة بالخلاص" },
            { language: 'english', text: "All you heavenly orders, Sing to our God with the melody of praise, Rejoice with us today with gladness, In the Resurrection of the Lord Christ.\n\nToday the prophecies are fulfilled, And the sayings of the forefathers are realized, By the Resurrection of the Lord from among the dead, He is the firstfruit of those who have fallen asleep.\n\nThe Lord arose as one who sleeps, And as one who is sated with wine, He has granted us the everlasting joy, And freed us from bitter bondage.\n\nHe led Hades captive, And crushed its doors of copper, He utterly broke the bars of iron, And for us, exchanged salvation for punishment." },
          ],
        },
        {
          id: "pentecost-liturgy-xrictoc-anesti-long",
          title: "Ⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁ̀ⲛⲉⲥⲧⲏ - 1 (Xrictoc Anesti - Long)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-xrictocanesti-1.mp3", text: "Ⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁ̀ⲛⲉⲥⲧⲏ ⲉⲕ ⲛⲉⲕⲣⲱⲛ ⲑⲁⲛⲁⲧⲱ ⲑⲁⲛⲁⲧⲟⲛ ⲡⲁⲧⲏⲥⲁⲥ ⲕⲉ ⲧⲓⲥ ⲉⲛ ⲧⲓⲥ ⲙ̀ⲛⲏⲙⲁⲥⲓ ⲍⲱⲏⲛ ⲭⲁⲣⲓⲥⲁⲙⲉⲛⲟⲥ.\n\nⲆⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ Ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-xrictocanesti-1.mp3", text: "Ekhristos anestē ek nekrōn thanatō thanaton patēsas ke tis en tis emnēmasi zōēn kharisamenos.\n\nDoksa Patri ke Uiō ke Agiō Epneumati ke nun ke a-i ke is tos e-ōnas tōn e-ōnōn amēn." },
            { language: 'english', text: "Christ is risen from the dead, trampling down death by death, and upon those in the tombs bestowing life.\n\nGlory to the Father and the Son and the Holy Spirit, now and forever and unto the age of all ages Amen." },
          ],
        },
        {
          id: "pentecost-liturgy-xrictoc-anesti-long-2",
          title: "Ⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁ̀ⲛⲉⲥⲧⲏ - 2 (Xrictoc Anesti - Long 2)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-xrictocanesti-2.mp3", text: "Ⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁ̀ⲛⲉⲥⲧⲏ ⲉⲕ ⲛⲉⲕⲣⲱⲛ ⲑⲁⲛⲁⲧⲱ ⲑⲁⲛⲁⲧⲟⲛ ⲡⲁⲧⲏⲥⲁⲥ ⲕⲉ ⲧⲓⲥ ⲉⲛ ⲧⲓⲥ ⲙ̀ⲛⲏⲙⲁⲥⲓ ⲍⲱⲏⲛ ⲭⲁⲣⲓⲥⲁⲙⲉⲛⲟⲥ.\n\nⲆⲟⲝⲁ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲩⲓⲱ ⲕⲉ Ⲁ̀ⲅⲓⲱ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲕⲉ ⲛⲩⲛ ⲕⲉ ⲁ̀ⲓ̀ ⲕⲉ ⲓⲥ ⲧⲟⲥ ⲉ̀ⲱ̀ⲛⲁⲥ ⲧⲱⲛ ⲉ̀ⲱ̀ⲛⲱⲛ ⲁ̀ⲙⲏⲛ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-xrictocanesti-2.mp3", text: "Ekhristos anestē ek nekrōn thanatō thanaton patēsas ke tis en tis emnēmasi zōēn kharisamenos.\n\nDoksa Patri ke Uiō ke Agiō Epneumati ke nun ke a-i ke is tos e-ōnas tōn e-ōnōn amēn." },
            { language: 'english', text: "Christ is risen from the dead, trampling down death by death, and upon those in the tombs bestowing life.\n\nGlory to the Father and the Son and the Holy Spirit, now and forever and unto the age of all ages Amen." },
          ],
        },
        {
          id: "pentecost-liturgy-xrictoc-anesti-short",
          title: "Ⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁ̀ⲛⲉⲥⲧⲏ - 3 (Xrictoc Anesti - Short)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-xrictocanesti-3.mp3", text: "Ⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁ̀ⲛⲉⲥⲧⲏ ⲉⲕ ⲛⲉⲕⲣⲱⲛ ⲑⲁⲛⲁⲧⲱ ⲑⲁⲛⲁⲧⲟⲛ ⲡⲁⲧⲏⲥⲁⲥ ⲕⲉ ⲧⲓⲥ ⲉⲛ ⲧⲓⲥ ⲙ̀ⲛⲏⲙⲁⲥⲓ ⲍⲱⲏⲛ ⲭⲁⲣⲓⲥⲁⲙⲉⲛⲟⲥ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-xrictocanesti-3.mp3", text: "Ekhristos anestē ek nekrōn thanatō thanaton patēsas ke tis en tis emnēmasi zōēn kharisamenos." },
            { language: 'english', text: "Christ is risen from the dead, trampling down death by death, and upon those in the tombs bestowing life." },
          ],
        },
        {
          id: "pentecost-liturgy-xrictoc-anesti-arabic",
          title: "Ⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁ̀ⲛⲉⲥⲧⲏ - 4 (Xrictoc Anesti - Arabic)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-xrictocanesti-a.mp3", text: "Ⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁ̀ⲛⲉⲥⲧⲏ ⲉⲕ ⲛⲉⲕⲣⲱⲛ ⲑⲁⲛⲁⲧⲱ ⲑⲁⲛⲁⲧⲟⲛ ⲡⲁⲧⲏⲥⲁⲥ ⲕⲉ ⲧⲓⲥ ⲉⲛ ⲧⲓⲥ ⲙ̀ⲛⲏⲙⲁⲥⲓ ⲍⲱⲏⲛ ⲭⲁⲣⲓⲥⲁⲙⲉⲛⲟⲥ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-xrictocanesti-a.mp3", text: "Ekhristos anestē ek nekrōn thanatō thanaton patēsas ke tis en tis emnēmasi zōēn kharisamenos." },
            { language: 'english', text: "Christ is risen from the dead, trampling down death by death, and upon those in the tombs bestowing life." },
          ],
        },
        {
          id: "pentecost-liturgy-ton-cinanarkhon",
          title: "Ⲧⲟⲛ ⲥⲩⲛⲁⲛⲁⲣⲭⲟⲛ (Ton cinanarkhon)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-toncina.mp3", text: "Ⲧⲟⲛ ⲥⲩⲛⲁⲛⲁⲣⲭⲟⲛ Ⲗⲟⲅⲟⲛ Ⲡⲁⲧⲣⲓ ⲕⲉ Ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲧⲟⲛ ⲉⲕ ⲡⲁⲣⲑⲉⲛⲟⲩ ⲧⲉⲭⲑⲉⲛⲧⲁ ⲓⲥ ⲥⲱⲧⲏⲣⲓⲁⲛ ⲏ̀ⲙⲟⲛ ⲁ̀ⲛⲩⲙⲛⲏⲥⲱⲙⲉⲛ ⲡⲓⲥⲧⲓ ⲕⲉ ⲡ̀ⲣⲟⲥⲕⲩⲛⲏⲥⲱⲙⲉⲛ ⲟ̀ⲧⲓ ⲏⲩⲇⲟⲕⲏⲥⲉ ⲥⲁⲣⲕⲓ ⲁ̀ⲛⲉⲗⲑⲓⲛ ⲉⲛ ⲧⲱ ⲥ̀ⲧⲁⲩⲣⲟ ⲕⲉ ⲑⲁⲛⲁⲧⲟⲛ ⲩ̀ⲡⲟⲙⲓⲛⲉ ⲕⲉ ⲉ̀ⲅⲓⲣⲉ ⲧⲟⲩⲥ ⲧⲉⲑⲛⲉⲱ̀ⲟ̀ ⲧⲁⲥ ⲉⲛ ⲧⲏ ⲉⲛⲇⲟⲝⲱ Ⲁ̀ⲛⲁⲥⲧⲁⲥⲓ ⲁⲩⲧⲟⲩ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-toncina.mp3", text: "Ton sunanarkhon Logon Patri ke Epneumati ton ek parthenou tekhthenta is sōtērian ēmon anumnēsōmen pisti ke eproskunēsōmen oti ēudokēse sarki anelthin en tō estauro ke thanaton upomine ke egire tous tethne-ō-o tas en tē endoksō Anastasi autou." },
            { language: 'english', text: "We the believers hymn and worship the Logos, without beginning with the Father and the Spirit, having been born of a virgin for our salvation, for He appeared in the flesh to ascend on the Cross. He persevered unto death and raised the dead through His glorious Resurrection." },
          ],
        },
        {
          id: "pentecost-liturgy-toulitho",
          title: "Ⲧⲟⲩ ⲗⲓⲑⲟⲩ (Toulitho)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-tolitho.mp3", text: "Ⲧⲟⲩ ⲗⲓⲑⲟⲩ ⲥⲫ̀ⲣⲁⲅⲓⲥⲑⲉⲛ ⲧⲟⲥ ⲩ̀ⲡⲟ ⲧⲱⲛ Ⲓⲟⲩⲇⲉⲱⲛ ⲕⲉ ⲥ̀ⲧ̀ⲣⲁⲧⲓⲱ ⲧⲱⲛ ⲫⲩⲗⲁⲥⲥⲟⲛ ⲧⲱⲛ ⲧⲟ ⲁⲭⲣⲁⲛⲧⲟⲛ ⲥⲟⲩ Ⲥⲱⲙⲁ ⲁ̀ⲛⲉⲥⲧⲏⲥ ⲧ̀ⲣⲓⲏ̀ⲙⲉⲣⲟⲥ Ⲥⲱⲧⲏⲣ ⲇⲱⲣⲟⲩⲙⲉⲛⲟⲥ ⲧⲱ ⲕⲟⲥⲙⲱ ⲧⲏⲛ ⲍⲱⲏⲛ ⲇⲓⲁ ⲧⲟⲩⲧⲟ ⲉ̀ⲇⲩⲛⲁⲙⲓⲥ ⲧⲱⲛ ⲟⲩⲣⲁⲛⲱⲛ ⲉ̀ⲃⲟⲱⲛ ⲥⲓ ⲍⲱⲟ̀ⲇⲟⲧⲁ ⲇⲟⲝⲁ ⲧⲏ Ⲁ̀ⲛⲁⲥⲧⲁⲥⲓ ⲥⲟⲩ Ⲭ̀ⲣⲓⲥⲧⲉ ⲇⲟⲝⲁ ⲧⲏ ⲃⲁⲥⲓⲗⲓⲁ ⲥⲟⲩ ⲇⲟⲝⲁ ⲧⲏ ⲟⲓⲕⲟⲛⲟⲙⲓⲁ ⲥⲟⲩ ⲙⲟⲛⲉ Ⲫⲓⲗⲁⲛⲑ̀ⲣⲱⲡⲉ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-tolitho.mp3", text: "Tou lithou sefragisthen tos upo tōn Ioudeōn ke esetratiō tōn fulasson tōn to akhranton sou Sōma anestēs etri-ēmeros Sōtēr dōroumenos tō kosmō tēn zōēn dia touto edunamis tōn ouranōn evoōn si zō-odota doksa tē Anastasi sou Ekhriste doksa tē vasilia sou doksa tē oikonomia sou mone Filanethrōpe." },
            { language: 'english', text: "When the stone was sealed by the Jews, and the soldiers were guarding Your undefiled Body, You arose on the third day, O Savior, granting life to the world. For this reason, the heavenly powers cried out to You, O Giver of Life, \"Glory to Your Resurrection O Christ. Glory to Your kingdom. Glory be to Your Economy, O You who alone are Lover of Mankind.\"" },
          ],
        },
        {
          id: "pentecost-liturgy-pekhristos-aftonf",
          title: "Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁϥⲧⲱⲛϥ (Pekhristos Aftonf)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-pekhrictocaftonf.mp3", text: "Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ ⲫⲏⲉ̀ⲧⲁϥⲙⲟⲩ ⲁϥϩⲱⲙⲓ ⲉ̀ϫⲉⲛ ⲫ̀ⲙⲟⲩ ⲟⲩⲟϩ ⲛⲏⲉⲧⲭⲏ ϧⲉⲛ ⲛⲓⲙ̀ϩⲁⲩ ⲁϥⲉⲣϩ̀ⲙⲟⲧ ⲛⲱⲟⲩ ⲙ̀ⲡⲓⲱⲛϧ ⲛ̀ⲉ̀ⲛⲉϩ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-pekhrictocaftonf.mp3", text: "Pi-ekhristos aftōnf evolkhen nēethmōout fē-etafmou afhōmi ejen efmou ouoh nēetkhē khen ni-emhau aferehmot nōou empiōnkh eneneh." },
            { language: 'english', text: "Christ is risen from the dead; He who died trampled down death and upon those in the tombs bestowed eternal life." },
          ],
        },
        {
          id: "pentecost-liturgy-pachoice",
          title: "Ⲡⲁϭⲟⲓⲥ (Pachoice)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-pachoice.mp3", text: "Ⲡⲁϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ⲫⲏⲉ̀ⲧⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ ϧⲉⲛ ⲡⲓⲉ̀ϩⲟⲟⲩ ⲙ̀ⲙⲁϩϣⲟⲙⲧ ⲉⲕⲉ̀ⲧⲟⲩⲛⲟⲥⲧⲉⲛ ϧⲉⲛ ⲧⲉⲕϫⲟⲙ.\n\nⲚⲓⲭⲉⲣⲟⲩⲃⲓⲙ ⲛⲉⲙ Ⲛⲓⲥⲉⲣⲁⲫⲓⲙ ⲛⲓⲁⲅⲅⲗⲟⲥ ⲛⲉⲙ ⲛⲓⲁⲣⲭⲏⲁⲅⲅⲉⲗⲟⲥ ⲛⲓⲥ̀ⲧ̀ⲣⲁⲧⲓⲁ ⲛⲉⲙ ⲛⲓⲉⲝⲟⲩⲥⲓⲁ ⲛⲓⲑ̀ⲣⲟⲛⲟⲥ ⲛⲓⲙⲉⲧϭⲟⲓⲥ ⲛⲓϫⲟⲙ.\n\nⲈⲩⲱϣ ⲉ̀ⲃⲟⲗ ⲉⲩϫⲱ ⲙ̀ⲙⲟⲥ ϫⲉ ⲭ̀ⲟⲩⲁⲃ ⲟⲩⲟϩ ⲭ̀ⲟⲩⲁⲃ ⲭ̀ⲟⲩⲁⲃ Ⲡ̀ϭⲟⲓⲥ ⲛ̀ⲛⲓⲉ̀ⲱⲛ Ⲭ̀ⲣⲓⲥⲧⲟⲥ ⲁ̀ⲛⲉⲥⲧⲏ ⲉⲕ ⲛⲉⲕⲣⲱⲛ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-pachoice.mp3", text: "Patshois Iēsous Pi-ekhristos fē-etaftōnf evolkhen nēethmōout khen pi-ehoou emmahshomt eketounosten khen tekjom.\n\nNikherouvim nem Niserafim niagglos nem niarkhēaggelos ni-esetratia nem nieksousia ni-ethronos nimettshois nijom.\n\nEuōsh evol eujō emmos je ekhouab ouoh ekhouab ekhouab Eptshois enni-eōn Ekhristos anestē ek nekrōn." },
            { language: 'english', text: "O My Lord Jesus Christ, who rose from the dead, on the third day, You shall raise us with Your power.\n\nThe Cherubim and the Seraphim, the angels and the archangels, the armies and authorities, the thrones, the dominions, the powers.\n\nProclaim saying, \"Holy holy, holy O Lord of the ages, Christ is risen from the dead.\"" },
          ],
        },
        {
          id: "pentecost-liturgy-gospel-response",
          title: "Ⲗⲟⲓⲡⲟⲛ ⲁⲩⲭⲁϥ (Gospel response)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-lit-gospel-response.mp3", text: "Ⲗⲟⲓⲡⲟⲛ ⲁⲩⲭⲁϥ ϧⲉⲛ ⲡⲓⲙ̀ϩⲁⲩ ⲕⲁⲧⲁ ⲛⲓⲥ̀ⲙⲏ ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ ϧⲉⲛ ⲡⲓⲙⲁϩϣⲟⲙⲧ ⲛ̀ⲉ̀ϩⲟⲟ̀ⲩ Ⲡⲭ̅ⲥ̅ ⲁ̀ⲛⲉⲥⲧⲏ ⲉⲕ ⲛⲉⲕⲣⲱⲛ.\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ Ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟⲩ ⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ.\n\nⲪⲁⲓ ⲉ̀ⲣⲉ ⲡⲓⲱ̀ⲟⲩ ⲉⲣⲡ̀ⲣⲉⲡⲓ ⲛⲁϥ ⲛⲉⲙ Ⲡⲉϥⲓⲱⲧ ⲛ̀ⲁ̀ⲅⲁⲑⲟⲥ ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ ⲓⲥϫⲉⲛ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉ̀ⲛⲉϩ.\n\nϪⲉ ϥ̀ⲥ̀ⲙⲁⲣⲱⲟⲩⲧ ⲛ̀ϫⲉ Ⲫ̀ⲓⲱⲧ ⲛⲉⲙ Ⲡ̀ϣⲏⲣⲓ ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉ̅ⲑ̅ⲩ̅ Ϯⲧ̀ⲣⲓⲁⲥ ⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀ⲙⲟⲥ ⲧⲉⲛϯⲱ̀ⲟⲩ ⲛⲁⲥ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-lit-gospel-response.mp3", text: "Loipon aukhaf khen pi-emhau kata ni-esmē emeprofētikon khen pimahshomt eneho-ou Pi-ekhristos anestē ek nekrōn.\n\nAllēlouia allēlouia allēlouia allēlouia Iēsous Pi-ekhristos Epouro ente epōou aftōnf evolkhen nēethmōout.\n\nFai ere pi-ōou ereprepi naf nem Pefiōt enagathos nem Pi-epneuma ethouab isjen tinou nem sha eneh.\n\nJe efesmarōout enje Efiōt nem Epshēri nem Pi-epneuma ethouab Ti-etrias etjēk evol tenouōsht emmos tenti-ōou nas." },
            { language: 'english', text: "Moreover He was placed in the tomb, according to the prophetic voices, on the third day, Christ rose from the dead.\n\nAlleluia alleluia, alleluia alleluia, Jesus Christ the King of glory, has risen from the dead.\n\nThis is He who is worthy of glory, with His good Father, and the Holy Spirit, both now and forever.\n\nFor blessed be the Father and the Son, and the Holy Spirit, the perfect Trinity, we worship Him and glorify Him." },
          ],
        },
        {
          id: "pentecost-liturgy-aspasmos-adam",
          title: "Ⲁ̀ Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲚⲟⲩϯ (Aspasmos Adam)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-aspasmos-adam.mp3", text: "Ⲁ̀ Ⲡⲭ̅ⲥ̅ ⲡⲉⲛⲚⲟⲩϯ ⲧⲱⲛϥ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉ̀ⲑⲙⲱⲟ̀ⲩⲧ Ⲛ̀ⲑⲟϥ ⲡⲉ ⲧ̀ⲁ̀ⲡⲁⲣⲭⲏ ⲛ̀ⲧⲉ ⲛⲏⲉ̀ⲧⲁⲩⲉ̀ⲛⲕⲟⲧ.\n\nⲈⲑⲃⲉ ⲫⲁⲓ ⲧⲉⲛϯⲱ̀ⲟ̀ⲩ ⲛⲁϥ ⲉⲛⲱ̀ϣ ⲉ̀ⲃⲟⲗ ⲉⲛϫⲱ ⲙ̀ⲙⲟⲥ ϫⲉ ⲕ̀ⲥ̀ⲙⲁⲣⲱⲟ̀ⲩⲧ ⲱ̀ ⲡⲁ⳪ Ⲓ̅ⲏ̅ⲥ̅ ϫⲉ ⲁⲕⲧⲱⲛⲕ ⲁⲕⲥⲱϯ ⲙ̀ⲙⲟⲛ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-aspasmos-adam.mp3", text: "A Pi-ekhristos pen-Nouti tōnf evolkhen nē-ethmō-out Enthof pe etaparkhē ente nē-etau-enkot.\n\nEthve fai tenti-ō-ou naf enōsh evol enjō emmos je ekesmarō-out ō patshois Iēsous je aktōnk aksōti emmon." },
            { language: 'english', text: "Christ our God, has risen from the dead, He is the first-fruit, of those who departed.\n\nTherefore we glorify Him, proclaiming and saying, \"Blessed are You O my Lord Jesus, for You have risen and saved us.\"" },
          ],
        },
        {
          id: "pentecost-liturgy-aspasmos-vatos",
          title: "Ⲗⲟⲓⲡⲟⲛ ⲁⲩⲭⲁϥ (Aspasmos Vatos)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-aspasmos-vatos.mp3", text: "Ⲗⲟⲓⲡⲟⲛ ⲁⲩⲭⲁϥ ϧⲉⲛ ⲡⲓⲙ̀ϩⲁⲩ ⲕⲁⲧⲁ ⲛⲓⲥ̀ⲙⲏⲓ ⲙ̀ⲡ̀ⲣⲟⲫⲏⲧⲓⲕⲟⲛ ϧⲉⲛ ⲡⲓⲙⲁϩϣⲟⲙⲧ ⲛ̀ⲉ̀ϩⲟⲟ̀ⲩ Ⲡⲭ̅ⲥ̅ ⲁ̀ⲛⲉⲥⲧⲏ ⲉⲕⲛⲉⲕⲣⲱⲛ.\n\nⲀⲗⲗⲏⲗⲟⲩⲓⲁ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ ⲁ̅ⲗ̅ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ ⲡ̀Ⲟ̀ⲩⲣⲟ ⲛ̀ⲧⲉ ⲡ̀ⲱ̀ⲟ̀ⲩ ⲁϥⲧⲱⲛϥ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉ̀ⲑⲙⲱⲟ̀ⲩⲧ.\n\nⲤⲱϯ ⲙ̀ⲙⲟⲛ ⲟⲩⲟϩ ⲛⲁⲓ ⲛⲁⲛ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-aspasmos-vatos.mp3", text: "Loipon aukhaf khen pi-emhau kata ni-esmēi emeprofētikon khen pimahshomt eneho-ou Pi-ekhristos anestē eknekrōn.\n\nAllēlouia allēlouia allēlouia allēlouia Iēsous Pi-ekhristos ep-Ouro ente epō-ou aftōnf evolkhen nē-ethmō-out.\n\nSōti emmon ouoh nai nan." },
            { language: 'english', text: "Then He was placed in the tomb, according to the prophetic sayings, and on the third day, Christ is risen from the dead.\n\nAlleluia Alleluia, Alleluia Alleluia, Jesus Christ the King of glory, has risen from the dead.\n\nSave us and have mercy upon us." },
          ],
        },
        {
          id: "pentecost-liturgy-kata-nichorous",
          title: "Ⲕⲁⲧⲁ ⲛⲓⲭⲟⲣⲟⲥ (Kata Nichorous)",
          versions: [
            { language: 'coptic', audio: "alhan-resurrection-katanikhoros.mp3", text: "Ⲕⲁⲧⲁ ⲛⲓⲭⲟⲣⲟⲥ ⲛⲉⲙ ⲛⲓⲧⲁⲝⲓⲥ ⲛ̀ⲧⲉ ⲛⲁ ⲛⲓⲫⲏⲟⲩⲓ̀ ⲛⲉⲙ ⲛⲁ ⲡ̀ⲕⲁϩⲓ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ ⲛⲉⲙ ⲛⲓⲣⲱⲙⲓ ⲉⲩⲥⲟⲡ ⲉⲩⲉⲣⲯⲁⲗⲓⲛ ϧⲉⲛ ⲟⲩⲑⲉⲗⲏⲗ.\n\n(Ϫⲉ Ⲡⲉⲛ⳪ Ⲓ̅ⲏ̅ⲥ̅ Ⲡⲭ̅ⲥ̅ Ⲡⲓϩⲓⲏⲃ ⲙ̀ⲙⲏⲓ) ⲃ̅ (ⲁϥⲧⲱⲛϥ) ⲅ̅ ⲉ̀ⲃⲟⲗϧⲉⲛ ⲛⲏⲉⲑⲙⲱⲟⲩⲧ." },
            { language: 'englishCoptic', audio: "alhan-resurrection-katanikhoros.mp3", text: "Kata nikhoros nem nitaksis ente na nifēou-i nem na epkahi niaggelos nem nirōmi eusop euerpsalin khen outhelēl.\n\n(Je Pentshois Iēsous Pi-ekhristos Pihiēb emmēi) b (aftōnf) g evolkhen nēethmōout." },
            { language: 'english', text: "All the choirs and ranks, of the heavenly and the earthly, the angels and the people together, chant joyfully.\n\nFor our Lord Jesus Christ, the true Lamb, has risen from the dead" },
          ],
        },
      ],
    },
  ],
};
