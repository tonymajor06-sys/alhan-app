import type { Hymn } from './hymns';

// Deacon responses from Spirit & Truth's Divine Liturgy (used with permission) that the Deacon Responses lacked,
// each placed after the response it follows in the service
export const stDeacon: { service: string; after: string; hymn: Hymn }[] = [
  {
    service: 'd-annual-liturgy-faithful',
    after: 'd-annual-liturgy-faithful-pray-for-the-fathers',
    hymn: {
      id: 'd-annual-liturgy-faithful-pray-for-the-assemblies',
      title: 'Ⲡⲣⲟⲥⲉⲩⲉⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲏⲥ ⲁ̀ⲅⲓⲁⲥ ⲉⲕⲕ̀ⲗⲏⲥⲓⲁⲥ (Pray for the Assemblies)',
      versions: [
        { language: 'coptic', text: 'Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲠⲣⲟⲥⲉⲩⲉⲝⲁⲥⲑⲉ ⲩ̀ⲡⲉⲣ ⲧⲏⲥ ⲁ̀ⲅⲓⲁⲥ ⲉⲕⲕ̀ⲗⲏⲥⲓⲁⲥ ⲧⲁⲩⲧⲏⲥ ⲕⲉ ⲧⲱⲛ ⲥⲩⲛⲉ̀ⲗⲉⲩⲥⲉⲱⲛ ⲏ̀ⲙⲱⲛ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ.' },
        { language: 'englishCoptic', text: 'Pi-diakon:\n\nProseueksasthe uper tēs agias ekeklēsias tautēs ke tōn suneleuseōn ēmōn.\n\nPi-laos:\n\nKurie eleēson.' },
        { language: 'english', text: 'Deacon:\n\nPray for this holy church and for our assemblies.\n\nPeople:\n\nLord have mercy.' },
        { language: 'englishArabic', text: "Esh-shammas:\n\nSallu min agl hadhihi el-kanisa el-muqaddasa wa igtima'atina.\n\nEsh-sha'b:\n\nYa Rabb irham." },
        { language: 'arabic', text: 'الشماس:\n\nصلوا من أجل هذه الكنيسة المقدسة واجتماعاتنا.\n\nالشعب:\n\nيا رب ارحم.' },
      ],
    },
  },
  {
    service: 'd-annual-liturgy-faithful',
    after: 'd-annual-liturgy-faithful-in-christ-jesus-our-lord',
    hymn: {
      id: 'd-annual-liturgy-faithful-bow-your-heads',
      title: 'Ⲧⲁⲥ ⲕⲉⲫⲁⲗⲁⲥ ⲩ̀ⲙⲱⲛ (Bow Your Heads)',
      versions: [
        { language: 'coptic', text: 'Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲁⲥ ⲕⲉⲫⲁⲗⲁⲥ ⲩ̀ⲙⲱⲛ ⲧⲟⲩ Ⲕⲩⲣⲓⲱ ⲕ̀ⲗⲓⲛⲁⲧⲉ.' },
        { language: 'englishCoptic', text: 'Pi-diakon:\n\nTas kefalas umōn tou Kuriō eklinate.' },
        { language: 'english', text: 'Deacon:\n\nBow your heads to the Lord.' },
        { language: 'englishArabic', text: "Esh-shammas:\n\nAhnu ru'usakum lir-Rabb." },
        { language: 'arabic', text: 'الشماس:\n\nأحنوا رؤوسكم للرب.' },
      ],
    },
  },
  {
    service: 'd-annual-liturgy-faithful',
    after: 'd-annual-liturgy-faithful-bow-your-heads',
    hymn: {
      id: 'd-annual-liturgy-faithful-let-us-attend-in-fear',
      title: 'Ⲡⲣⲟⲥⲭⲱⲙⲉⲛ Ⲑⲉⲟⲩ ⲙⲉⲧⲁ ⲫⲟⲃⲟⲩ (Let Us Attend in the Fear of God)',
      versions: [
        { language: 'coptic', text: 'Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲠⲣⲟⲥⲭⲱⲙⲉⲛ Ⲑⲉⲟⲩ ⲙⲉⲧⲁ ⲫⲟⲃⲟⲩ: ⲁ̀ⲙⲏⲛ.' },
        { language: 'englishCoptic', text: 'Pi-diakon:\n\nProskhōmen Theou meta fovou: amēn.' },
        { language: 'english', text: 'Deacon:\n\nLet us attend in the fear of God. Amen.' },
        { language: 'englishArabic', text: 'Esh-shammas:\n\nAnsitu bi-khawf Allah. Amin.' },
        { language: 'arabic', text: 'الشماس:\n\nأنصتوا بخوف الله. آمين.' },
      ],
    },
  },
  {
    service: 'd-annual-liturgy-faithful',
    after: 'd-annual-liturgy-faithful-worship-god-st-gregory',
    hymn: {
      id: 'd-annual-liturgy-faithful-pray-for-the-priesthood-st-cyril',
      title: 'Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡⲁⲓⲕⲉⲓⲉⲣⲁⲧⲓⲟⲛ (Pray for the Priesthood, St Cyril)',
      versions: [
        { language: 'coptic', text: 'Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡⲁⲓⲕⲉⲓⲉⲣⲁⲧⲓⲟⲛ ⲉⲑⲟⲩⲁⲃ ⲫⲁⲓ ⲛⲉⲙ ⲧⲁⲅⲙⲁ ⲛⲓⲃⲉⲛ ⲛ̀ⲓⲉⲣⲁⲧⲓⲕⲟⲛ ⲛ̀ⲟⲣⲑⲟⲇⲟⲝⲟⲥ: ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲱⲟⲩ: ⲛ̀ⲧⲉϥⲣⲱⲓⲥ ⲉ̀ⲣⲱⲟⲩ: ⲟⲩⲟϩ ⲛ̀ⲧⲉϥϯϫⲟⲙ ⲛⲱⲟⲩ: ⲛ̀ⲧⲉϥⲛⲁⲓ ⲛⲱⲟⲩ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ.' },
        { language: 'englishCoptic', text: 'Pi-diakon:\n\nTōbh ejen paikeieration ethouab fai nem tagma niven enieratikon enorthodoksos: hina ente Pikhristos Pennouti sōtem erōou: entefrōis erōou: ouoh entefti-gom nōou: entefnai nōou: entefkha nennovi nan evol.\n\nPi-laos:\n\nKurie eleēson.' },
        { language: 'english', text: 'Deacon:\n\nPray for this holy priesthood and all the orthodox priestly orders, that Christ our God may hearken unto them, guard them, strengthen them, have mercy on them, and forgive us our sins.\n\nPeople:\n\nLord have mercy.' },
        { language: 'englishArabic', text: "Esh-shammas:\n\nUtlubu 'an hadha el-kahanout el-muqaddas, wa kull er-rutab el-kahanoutiyya el-orthodoksiyya, likay yastagib lahum el-Masih ilahuna, wa yahrusahum wa yuqawwihim wa yarhamahum, wa yaghfir lana khatayana.\n\nEsh-sha'b:\n\nYa Rabb irham." },
        { language: 'arabic', text: 'الشماس:\n\nاطلبوا عن هذا الكهنوت المقدس، وكل الرتب الكهنوتية الأرثوذكسية، لكي يستجيب لهم المسيح إلهنا، ويحرسهم ويقويهم ويرحمهم، ويغفر لنا خطايانا.\n\nالشعب:\n\nيا رب ارحم.' },
      ],
    },
  },
  {
    service: 'd-annual-liturgy-faithful',
    after: 'd-annual-liturgy-faithful-pray-for-the-priesthood-st-cyril',
    hymn: {
      id: 'd-annual-liturgy-faithful-pray-for-the-assemblies-st-cyril',
      title: 'Ⲧⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡⲉⲛϫⲓⲛⲑⲱⲟⲩϯ (Pray for the Assemblies, St Cyril)',
      versions: [
        { language: 'coptic', text: 'Ⲡⲓⲇⲓⲁⲕⲱⲛ:\n\nⲦⲱⲃϩ ⲉ̀ϫⲉⲛ ⲡⲉⲛϫⲓⲛⲑⲱⲟⲩϯ ⲉ̀ϧⲟⲩⲛ ⲫⲁⲓ ⲛⲉⲙ ϫⲓⲛⲑⲱⲟⲩϯ ⲉ̀ϧⲟⲩⲛ ⲛⲓⲃⲉⲛ ⲛ̀ⲧⲉ ⲛⲓⲗⲁⲟⲥ ⲛ̀ⲟⲣⲑⲟⲇⲟⲝⲟⲥ: ϩⲓⲛⲁ ⲛ̀ⲧⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲛⲟⲩϯ ⲥ̀ⲙⲟⲩ ⲉ̀ⲣⲱⲟⲩ: ⲛ̀ⲧⲉϥϫⲟⲕⲟⲩ ⲉ̀ⲃⲟⲗ ϧⲉⲛ ⲟⲩϩⲓⲣⲏⲛⲏ: ⲛ̀ⲧⲉϥⲭⲁ ⲛⲉⲛⲛⲟⲃⲓ ⲛⲁⲛ ⲉ̀ⲃⲟⲗ.\n\nⲠⲓⲗⲁⲟⲥ:\n\nⲔⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ.' },
        { language: 'englishCoptic', text: 'Pi-diakon:\n\nTōbh ejen penjinthōouti ekhoun fai nem jinthōouti ekhoun niven ente nilaos enorthodoksos: hina ente Pikhristos Pennouti esmou erōou: entefgokou evol khen ouhirēnē: entefkha nennovi nan evol.\n\nPi-laos:\n\nKurie eleēson.' },
        { language: 'english', text: 'Deacon:\n\nPray for this assembly of ours, and for every assembly of the Orthodox people, that Christ our God may bless them and perfect them in peace, and forgive us our sins.\n\nPeople:\n\nLord have mercy.' },
        { language: 'englishArabic', text: "Esh-shammas:\n\nUtlubu 'an igtima'ina hadha, wa 'an kull igtima' esh-shu'oub el-orthodoksiyyeen, likay yubarikaha el-Masih ilahuna wa yukammilaha bi-salam, wa yaghfir lana khatayana.\n\nEsh-sha'b:\n\nYa Rabb irham." },
        { language: 'arabic', text: 'الشماس:\n\nاطلبوا عن اجتماعنا هذا، وعن كل اجتماع الشعوب الأرثوذكسيين، لكي يباركها المسيح إلهنا ويكملها بسلام، ويغفر لنا خطايانا.\n\nالشعب:\n\nيا رب ارحم.' },
      ],
    },
  },
  {
    service: 'd-annual-liturgy-faithful',
    after: 'd-annual-liturgy-faithful-pray-for-the-assemblies-st-cyril',
    hymn: {
      id: 'd-annual-liturgy-faithful-worship-god-the-father-st-cyril',
      title: 'Ⲟⲩⲱϣⲧ ⲙ̀Ⲫϯ Ⲫⲓⲱⲧ (Worship God the Father, St Cyril)',
      versions: [
        { language: 'coptic', text: 'Ⲟⲩⲱϣⲧ ⲙ̀Ⲫϯ Ⲫⲓⲱⲧ ⲡⲓⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ.' },
        { language: 'englishCoptic', text: 'Ouōsht em-Efnouti Fiōt pipantokratōr.' },
        { language: 'english', text: 'Worship God, the Father, the Pantocrator.' },
        { language: 'englishArabic', text: 'Usgudu lillah el-Ab dabit el-kull.' },
        { language: 'arabic', text: 'اسجدوا لله الآب ضابط الكل.' },
      ],
    },
  },
];
