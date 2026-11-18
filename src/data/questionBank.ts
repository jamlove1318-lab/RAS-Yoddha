import { Question } from '../types';

export const INITIAL_QUESTION_BANK: Question[] = [
  // ==========================================
  // 1. RAJASTHAN HISTORY, ART & CULTURE
  // ==========================================
  {
    id: 'ras_pyq_2023_01',
    subjectId: 'raj_history_art',
    subtopic: 'Folk Deities & Saints (लोकदेवता एवं संत)',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'Panchpir_Pabuji',
    frequencyNote: 'Asked in RAS 2013, 2018, 2021, and 2023.',
    tags: ['Lokdevta', 'Pabuji', 'Camel protector', 'High Yield'],
    question: {
      en: 'Who is revered as the main folk deity (Lokdevta) protecting camels and credited with bringing camels (ऊंट) to Marwar for the first time?',
      hi: 'मारवाड़ में सर्वप्रथम ऊंट (सांड) लाने का श्रेय किस लोकदेवता को दिया जाता है तथा उन्हें ऊंटों के रक्षक देवता के रूप में पूजा जाता है?'
    },
    options: {
      en: ['Pabu Ji (पाबू जी)', 'Teja Ji (तेजा जी)', 'Goga Ji (गोगा जी)', 'Ramdev Ji (रामदेव जी)'],
      hi: ['पाबू जी', 'तेजा जी', 'गोगा जी', 'रामदेव जी']
    },
    correctOption: 0,
    explanation: {
      en: 'Pabu Ji Rathore is revered as the protector of camels (Plague protector and deity of Raika/Rebari community). He is credited with bringing camels to Marwar. His chief seat is at Kolumand (Phalodi). Pabuji ki Phad is read by Bhopa priests using the Ravanhatha instrument.',
      hi: 'पाबू जी राठौड़ को मारवाड़ में ऊंट लाने का श्रेय दिया जाता है। रेबारी/राईका जाति इन्हें अपना आराध्य देव मानती है। इन्हें प्लेग रक्षक देवता एवं गौ-रक्षक भी कहा जाता है। इनका प्रमुख स्थल कोलू (फलौदी) है तथा इनकी फड़ रावणहत्था वाद्ययंत्र के साथ बांची जाती है।'
    }
  },
  {
    id: 'ras_pyq_2023_02',
    subjectId: 'raj_history_art',
    subtopic: 'Forts, Palaces & Architecture (दुर्ग एवं स्थापत्य)',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 96,
    conceptKey: 'UNESCO_Hill_Forts',
    frequencyNote: '6 Rajasthan Hill Forts UNESCO status asked repeatedly.',
    tags: ['Forts', 'UNESCO', 'Chittorgarh', 'Kumbhalgarh'],
    question: {
      en: 'Which of the following forts of Rajasthan was NOT included in the UNESCO World Heritage List in June 2013?',
      hi: 'जून 2013 में यूनेस्को (UNESCO) की विश्व धरोहर सूची में राजस्थान के किस पहाड़ी दुर्ग को शामिल नहीं किया गया था?'
    },
    options: {
      en: ['Mehrangarh Fort, Jodhpur', 'Kumbhalgarh Fort, Rajsamand', 'Gagron Fort, Jhalawar', 'Amer Fort, Jaipur'],
      hi: ['मेहरानगढ़ दुर्ग, जोधपुर', 'कुंभलगढ़ दुर्ग, राजसमंद', 'गागरोण दुर्ग, झालावाड़', 'आमेर दुर्ग, जयपुर']
    },
    correctOption: 0,
    explanation: {
      en: 'In June 2013, UNESCO inscribed 6 Hill Forts of Rajasthan: Chittorgarh, Kumbhalgarh, Ranthambore, Gagron (water fort), Amer, and Jaisalmer (Trick: चीकू गाजर आम - Chittor, Kumbhal, Gagron, Jaisalmer, Ranthambore, Amer). Mehrangarh Fort was NOT included in this list.',
      hi: 'जून 2013 में यूनेस्को ने राजस्थान के 6 पहाड़ी दुर्गों को विश्व धरोहर घोषित किया: चित्तौड़गढ़, कुंभलगढ़, गागरोण, जैसलमेर (सोनार), रणथंभौर, तथा आमेर (ट्रिक: चीकू गाजर आम)। मेहरानगढ़ (जोधपुर) इस सूची में शामिल नहीं है।'
    }
  },
  {
    id: 'ras_pyq_2021_03',
    subjectId: 'raj_history_art',
    subtopic: 'Freedom Movement & Prajamandal Movements',
    year: 2021,
    paperName: 'RPSC RAS Prelims 2021',
    importance: 'HIGH_YIELD',
    importanceScore: 97,
    conceptKey: 'Prajamandal_Founders',
    frequencyNote: 'Matching pairs of Prajamandal & Founder is a staple in every RAS paper.',
    tags: ['Prajamandal', 'Jaipur', 'Bikaner', 'Mewar'],
    question: {
      en: 'Which of the following pairs of Prajamandal and its Founder is correctly matched?',
      hi: 'निम्नलिखित में से प्रजामण्डल और उसके संस्थापक का कौन सा युग्म सही सुमेलित है?'
    },
    options: {
      en: [
        'Sirohi - Gokulbhai Bhatt (गोकुलभाई भट्ट)',
        'Mewar - Magharam Vaidya (मघाराम वैद्य)',
        'Bikaner - Manikyalal Verma (माणिक्यलाल वर्मा)',
        'Banswara - Kanti Lal (कांतीलाल)'
      ],
      hi: [
        'सिरोही - गोकुलभाई भट्ट',
        'मेवाड़ - मघाराम वैद्य',
        'बीकानेर - माणिक्यलाल वर्मा',
        'बांसवाड़ा - कांतीलाल'
      ]
    },
    correctOption: 0,
    explanation: {
      en: 'Sirohi Prajamandal was founded by Gokulbhai Bhatt (known as "Rajasthan ka Gandhi") in 1939. Mewar was founded by Manikya Lal Verma (1938), Bikaner by Magharam Vaidya in Calcutta (1936), and Banswara by Bhupendranath Trivedi (1943).',
      hi: 'सिरोही प्रजामंडल की स्थापना 1939 में गोकुलभाई भट्ट ("राजस्थान के गांधी") द्वारा की गई। मेवाड़ प्रजामंडल के संस्थापक माणिक्यलाल वर्मा थे, बीकानेर के मघाराम वैद्य (कलकत्ता में 1936) तथा बांसवाड़ा के भूपेंद्रनाथ त्रिवेदी थे।'
    }
  },
  {
    id: 'ras_pyq_hist_temple_art',
    subjectId: 'raj_history_art',
    subtopic: 'Forts, Palaces & Architecture (दुर्ग एवं स्थापत्य)',
    year: 2021,
    paperName: 'RPSC RAS Prelims 2021',
    importance: 'HIGH_YIELD',
    importanceScore: 95,
    conceptKey: 'Maha_Maru_Style',
    tags: ['Architecture', 'Maha-Maru', 'Gurjara-Pratihara', 'Osian'],
    question: {
      en: 'The architectural style of ancient temples in Rajasthan belonging to the 8th to 12th century (such as Osian, Kiradu, and Harshanath) is known as which style?',
      hi: '8वीं से 12वीं शताब्दी के मध्य राजस्थान में निर्मित प्राचीन मंदिरों की स्थापत्य शैली (जैसे ओसियां, किराडू, हर्षनाथ) को किस नाम से जाना जाता है?'
    },
    options: {
      en: ['Maha-Maru / Gurjara-Pratihara style', 'Dravidian style', 'Vesara style', 'Chola style'],
      hi: ['महा-मारू (गुर्जर-प्रतिहार) शैली', 'द्रविड़ शैली', 'वेसर शैली', 'चोल शैली']
    },
    correctOption: 0,
    explanation: {
      en: 'The temple architecture developed during the Gurjara-Pratihara period in Rajasthan is known as the Maha-Maru style. Examples include the Sun Temple & Sachiya Mata at Osian (Jodhpur), Someshwar temple at Kiradu (Barmer), and Harshnath temple (Sikar).',
      hi: 'गुर्जर-प्रतिहार काल में राजस्थान में विकसित मंदिर स्थापत्य शैली को "महा-मारू शैली" कहा जाता है। ओसियां के मंदिर, किराडू का सोमेश्वर मंदिर व सीकर का हर्षनाथ मंदिर इसके उत्कृष्ट उदाहरण हैं।'
    }
  },
  {
    id: 'ras_pyq_hist_1857',
    subjectId: 'raj_history_art',
    subtopic: 'Major Historical Dynasties & Rulers',
    year: 2018,
    paperName: 'RPSC RAS Prelims 2018',
    importance: 'HIGH_YIELD',
    importanceScore: 96,
    conceptKey: 'Revolt_1857_Rajasthan',
    tags: ['1857 Revolt', 'Naseerabad', 'Auwa', 'Kushal Singh'],
    question: {
      en: 'At which military cantonment did the 1857 Revolt start for the first time in Rajasthan on 28 May 1857?',
      hi: 'राजस्थान में 1857 की क्रांति का सूत्रपात सर्वप्रथम 28 मई 1857 को किस सैनिक छावनी से हुआ था?'
    },
    options: {
      en: ['Naseerabad Cantonment (नसीराबाद)', 'Neemuch Cantonment (नीमच)', 'Erinpura Cantonment (एरिनपुरा)', 'Kota (कोटा)'],
      hi: ['नसीराबाद छावनी', 'नीमच छावनी', 'एरिनपुरा छावनी', 'कोटा']
    },
    correctOption: 0,
    explanation: {
      en: 'The 1857 revolt in Rajasthan began at Naseerabad on 28 May 1857 by the 15th Bengal Native Infantry. Neemuch revolted on 3 June, and Erinpura on 21 August 1857 ("Chalo Dilli, Maro Firangi").',
      hi: 'राजस्थान में क्रांति की शुरुआत 28 मई 1857 को नसीराबाद छावनी में 15वीं बंगाल नेटिव इन्फैंट्री के सैनिकों द्वारा की गई। नीमच में 3 जून तथा एरिनपुरा में 21 अगस्त 1857 को विद्रोह हुआ।'
    }
  },

  // ==========================================
  // 2. GEOGRAPHY OF RAJASTHAN
  // ==========================================
  {
    id: 'ras_pyq_2023_04',
    subjectId: 'raj_geography',
    subtopic: 'Physiographic Divisions (भौतिक प्रदेश - Aravalli, Thar, Plains, Hadoti)',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 99,
    conceptKey: 'Aravalli_Peaks_Order',
    frequencyNote: 'Asked in 2016, 2018, 2021, 2023. Top RAS favorite.',
    tags: ['Aravalli', 'Guru Shikhar', 'Ser', 'Dilwara', 'Jarga'],
    question: {
      en: 'Arrange the following mountain peaks of Rajasthan in descending order of their heights: 1. Ser, 2. Dilwara, 3. Jarga, 4. Achalgarh',
      hi: 'राजस्थान की निम्नलिखित पर्वत चोटियों को उनकी ऊंचाई के अनुसार अवरोही (घटते) क्रम में व्यवस्थित कीजिए: 1. सेर, 2. दिलवाड़ा, 3. जरगा, 4. अचलगढ़'
    },
    options: {
      en: ['1 - 2 - 3 - 4', '1 - 3 - 2 - 4', '2 - 1 - 3 - 4', '1 - 2 - 4 - 3'],
      hi: ['1 - 2 - 3 - 4', '1 - 3 - 2 - 4', '2 - 1 - 3 - 4', '1 - 2 - 4 - 3']
    },
    correctOption: 0,
    explanation: {
      en: 'Heights: Guru Shikhar (1722 m) -> Ser (1597 m, Sirohi) -> Dilwara (1442 m, Sirohi) -> Jarga (1431 m, Udaipur) -> Achalgarh (1380 m, Sirohi). The descending sequence is 1-2-3-4.',
      hi: 'चोटियों की ऊंचाई: गुरुशिखर (1722 मी.) -> सेर (1597 मी., सिरोही) -> दिलवाड़ा (1442 मी., सिरोही) -> जरगा (1431 मी., उदयपुर) -> अचलगढ़ (1380 मी., सिरोही)। अतः सही अवरोही क्रम 1 - 2 - 3 - 4 है।'
    }
  },
  {
    id: 'ras_pyq_2021_05',
    subjectId: 'raj_geography',
    subtopic: 'Drainage Systems & Lakes (अपवाह तंत्र एवं झीलें)',
    year: 2021,
    paperName: 'RPSC RAS Prelims 2021',
    importance: 'HIGH_YIELD',
    importanceScore: 95,
    conceptKey: 'Luni_River_Drainage',
    frequencyNote: 'Luni basin and salinity transition is asked in nearly every Rajasthan exam.',
    tags: ['Luni', 'Balotra', 'Saline Water', 'Drainage'],
    question: {
      en: 'Up to which place does the water of river Luni remain sweet (potable), after which it turns saline/brackish?',
      hi: 'लूणी नदी का जल किस स्थान तक मीठा रहता है और उसके पश्चात खारा हो जाता है?'
    },
    options: {
      en: ['Balotra (बालोतरा)', 'Samdari (समदड़ी)', 'Bilara (बिलाड़ा)', 'Gudamalani (गुड़ामालानी)'],
      hi: ['बालोतरा', 'समदड़ी', 'बिलाड़ा', 'गुड़ामालानी']
    },
    correctOption: 0,
    explanation: {
      en: 'River Luni originates from Nag Pahar (Ajmer). Its water remains sweet up to Balotra. Beyond Balotra, due to salt-rich soil and evaporation in the arid region, the water turns saline.',
      hi: 'लूणी नदी अजमेर के नाग पहाड़ से निकलती है। बालोतरा तक इसका पानी मीठा रहता है, परंतु बालोतरा के बाद मरुस्थलीय मिट्टी में लवणीय कणों की अधिकता के कारण इसका पानी खारा (नमकीन) हो जाता है। इसलिए इसे "आधी मीठी - आधी खारी" नदी भी कहते हैं।'
    }
  },
  {
    id: 'ras_pyq_geo_minerals',
    subjectId: 'raj_geography',
    subtopic: 'Mines & Minerals (खनिज संसाधन)',
    year: 2021,
    paperName: 'RPSC RAS Prelims 2021',
    importance: 'HIGH_YIELD',
    importanceScore: 97,
    conceptKey: 'Rajasthan_Minerals_Monopoly',
    tags: ['Minerals', 'Wollastonite', 'Lead-Zinc', 'Gypsum'],
    question: {
      en: 'In production of which of the following minerals does Rajasthan hold a virtually 100% (sole monopoly) share in India?',
      hi: 'निम्नलिखित में से किस खनिज के उत्पादन में राजस्थान का भारत में लगभग शत-प्रतिशत (एकमात्र एकाधिकार) है?'
    },
    options: {
      en: ['Wollastonite and Jasper', 'Iron Ore and Bauxite', 'Mica and Coal', 'Gold and Copper'],
      hi: ['वोलास्टोनाइट एवं जैस्पर', 'लौह अयस्क एवं बॉक्साइट', 'अभ्रक एवं कोयला', 'सोना एवं तांबा']
    },
    correctOption: 0,
    explanation: {
      en: 'Rajasthan holds virtually 100% sole monopoly in production of Wollastonite and Jasper in India, and is also the leading producer of Lead-Zinc, Calcite, Gypsum, and Rock Phosphate.',
      hi: 'राजस्थान का वोलास्टोनाइट एवं जैस्पर के उत्पादन में देश में लगभग 100% एकाधिकार है। इसके अलावा सीसा-जस्ता, जिप्सम, कैल्साइट तथा रॉक फॉस्फेट में भी राजस्थान अग्रणी है।'
    }
  },
  {
    id: 'ras_pyq_geo_climate_koppen',
    subjectId: 'raj_geography',
    subtopic: 'Climate & Weather Patterns (जलवायु)',
    year: 2018,
    paperName: 'RPSC RAS Prelims 2018',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'Koppen_Climate_Classification',
    tags: ['Koppen', 'BWhw', 'BShw', 'Cwg', 'Aw'],
    question: {
      en: 'According to Koppen\'s climate classification, which symbol represents the tropical arid desert climate zone of Rajasthan (Jaisalmer, Bikaner, western Barmer)?',
      hi: 'कोपेन के जलवायु वर्गीकरण के अनुसार राजस्थान के उष्ण मरुस्थलीय शुष्क जलवायु प्रदेश (जैसलमेर, बीकानेर, पश्चिमी बाड़मेर) को किस कोड द्वारा दर्शाया गया है?'
    },
    options: {
      en: ['BWhw', 'BShw', 'Cwg', 'Aw'],
      hi: ['BWhw', 'BShw', 'Cwg', 'Aw']
    },
    correctOption: 0,
    explanation: {
      en: 'Koppen classified Rajasthan into 4 zones: BWhw (Arid Desert - Jaisalmer, Bikaner), BShw (Semi-arid Steppe - Shekhawati, Nagaur, Jodhpur), Cwg (Sub-humid / Monsoon eastern plains), and Aw (Tropical humid - Banswara, Dungarpur, Hadoti).',
      hi: 'कोपेन ने राजस्थान की जलवायु को 4 भागों में बांटा: BWhw (शुष्क मरुस्थलीय), BShw (अर्द्ध-शुष्क स्टेपी), Cwg (पूर्वी मैदानी उप-आर्द्र), तथा Aw (अति-आर्द्र दक्षिणी राजस्थान- बांसवाड़ा, झालावाड़)।'
    }
  },

  // ==========================================
  // 3. RAJASTHAN POLITY & ADMINISTRATION
  // ==========================================
  {
    id: 'ras_pyq_2023_06',
    subjectId: 'raj_polity_admin',
    subtopic: 'State Human Rights Commission (SHRC) & Information Commission',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 94,
    conceptKey: 'SHRC_Composition',
    tags: ['SHRC', 'Polity', 'Human Rights'],
    question: {
      en: 'Under the Protection of Human Rights (Amendment) Act 2019, what is the statutory composition of the State Human Rights Commission (SHRC)?',
      hi: 'मानव अधिकार संरक्षण (संशोधन) अधिनियम, 2019 के अंतर्गत राज्य मानवाधिकार आयोग (SHRC) की वैधानिक संरचना क्या है?'
    },
    options: {
      en: [
        'One Chairperson and Two Members (1 अध्यक्ष और 2 सदस्य)',
        'One Chairperson and Three Members (1 अध्यक्ष और 3 सदस्य)',
        'One Chairperson and Four Members (1 अध्यक्ष और 4 सदस्य)',
        'One Chairperson and One Member (1 अध्यक्ष और 1 सदस्य)'
      ],
      hi: [
        'एक अध्यक्ष और दो सदस्य',
        'एक अध्यक्ष और तीन सदस्य',
        'एक अध्यक्ष और चार सदस्य',
        'एक अध्यक्ष और एक सदस्य'
      ]
    },
    correctOption: 0,
    explanation: {
      en: 'As per the Human Rights Amendment Act, the State Human Rights Commission consists of 1 Chairperson (former High Court Chief Justice or Judge) and 2 Members (one judicial member, one expert in human rights). Total = 3 persons.',
      hi: 'मानवाधिकार संरक्षण अधिनियम के तहत राज्य मानवाधिकार आयोग में 1 अध्यक्ष (उच्च न्यायालय का पूर्व मुख्य न्यायाधीश या न्यायाधीश) तथा 2 सदस्य होते हैं (कुल 3 व्यक्ति)।'
    }
  },
  {
    id: 'ras_pyq_polity_rpsc_rules',
    subjectId: 'raj_polity_admin',
    subtopic: 'RPSC, State Election Commission & Lokayukta',
    year: 2021,
    paperName: 'RPSC RAS Prelims 2021',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'RPSC_Constitutional_Provisions',
    tags: ['RPSC', 'Article 316', 'Chairman', 'Governor'],
    question: {
      en: 'Under Article 316 of the Constitution, who appoints the Chairman and members of the Rajasthan Public Service Commission (RPSC), and who alone can remove them from office?',
      hi: 'संविधान के अनुच्छेद 316 के तहत राजस्थान लोक सेवा आयोग (RPSC) के अध्यक्ष व सदस्यों की नियुक्ति किसके द्वारा की जाती है तथा उन्हें पद से हटाने का अधिकार किसे प्राप्त है?'
    },
    options: {
      en: [
        'Appointed by Governor; Removed by President of India on grounds of misbehavior after Supreme Court inquiry',
        'Appointed by Governor; Removed by Governor',
        'Appointed by Chief Minister; Removed by Governor',
        'Appointed by President; Removed by Supreme Court'
      ],
      hi: [
        'नियुक्ति राज्यपाल द्वारा; पद से हटाना सर्वोच्च न्यायालय की जांच रिपोर्ट पर केवल भारत के राष्ट्रपति द्वारा',
        'नियुक्ति राज्यपाल द्वारा; पद से हटाना भी राज्यपाल द्वारा',
        'नियुक्ति मुख्यमंत्री द्वारा; पद से हटाना राज्यपाल द्वारा',
        'नियुक्ति राष्ट्रपति द्वारा; हटाना संसद द्वारा'
      ]
    },
    correctOption: 0,
    explanation: {
      en: 'Article 316: Chairman and members of a State PSC are appointed by the State Governor. However, under Article 317, they can ONLY be removed by the President of India following an inquiry by the Supreme Court.',
      hi: 'अनुच्छेद 316 के तहत राज्य लोक सेवा आयोग के अध्यक्ष व सदस्यों की नियुक्ति राज्यपाल करते हैं, परंतु अनुच्छेद 317 के तहत उन्हें पद से हटाने का अधिकार केवल भारत के राष्ट्रपति को (सर्वोच्च न्यायालय की जांच के बाद) प्राप्त है।'
    }
  },

  // ==========================================
  // 4. RAJASTHAN ECONOMY & ECONOMIC SURVEY
  // ==========================================
  {
    id: 'ras_pyq_2023_07',
    subjectId: 'raj_economy',
    subtopic: 'Macro Indicators of Rajasthan (GSDP, Per Capita Income)',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 99,
    conceptKey: 'Economic_Survey_GSDP',
    tags: ['Economic Survey', 'GSDP', 'Sectoral Share'],
    question: {
      en: 'As per the Rajasthan Economic Survey, which sector contributes the highest share to the Gross State Value Added (GSVA) at constant (2011-12) prices?',
      hi: 'राजस्थान आर्थिक समीक्षा के अनुसार, स्थिर (2011-12) बुनियादी मूल्यों पर सकल राज्य मूल्यवर्धन (GSVA) में किस क्षेत्र का योगदान सर्वाधिक है?'
    },
    options: {
      en: ['Services Sector (सेवा क्षेत्र)', 'Agriculture Sector (कृषि क्षेत्र)', 'Industries Sector (उद्योग क्षेत्र)', 'Mining Sector (खनन क्षेत्र)'],
      hi: ['सेवा क्षेत्र', 'कृषि क्षेत्र', 'उद्योग क्षेत्र', 'खनन क्षेत्र']
    },
    correctOption: 0,
    explanation: {
      en: 'According to the Rajasthan Economic Survey, the Services sector contributes the highest share (~43.74%), followed by Agriculture (~28.50%) and Industry (~27.76%) at constant prices.',
      hi: 'राजस्थान आर्थिक समीक्षा के अनुसार स्थिर मूल्यों पर GSVA में सर्वाधिक योगदान सेवा क्षेत्र (लगभग 43.74%) का है, इसके बाद कृषि क्षेत्र (~28.50%) और उद्योग क्षेत्र (~27.76%) का स्थान आता है।'
    }
  },

  // ==========================================
  // 5. INDIAN HISTORY
  // ==========================================
  {
    id: 'ras_pyq_2021_08',
    subjectId: 'indian_history',
    subtopic: 'Ancient India: IVC, Buddhism, Jainism, Mauryas, Guptas',
    year: 2021,
    paperName: 'RPSC RAS Prelims 2021',
    importance: 'HIGH_YIELD',
    importanceScore: 91,
    conceptKey: 'Buddhist_Councils',
    tags: ['Ancient India', 'Buddhism', 'Ashoka', 'Kanishka'],
    question: {
      en: 'The Fourth Buddhist Council was held during the reign of which king and at which location?',
      hi: 'चतुर्थ बौद्ध संगीति किस शासक के शासनकाल में और किस स्थान पर आयोजित की गई थी?'
    },
    options: {
      en: [
        'Kanishka at Kundalvana (Kashmir) [कनिष्क - कुंडलवन]',
        'Ashoka at Pataliputra [अशोक - पाटलिपुत्र]',
        'Ajatashatru at Rajgir [अजातशत्रु - राजगृह]',
        'Kalashoka at Vaishali [कालाशोक - वैशाली]'
      ],
      hi: [
        'कनिष्क - कुंडलवन (कश्मीर)',
        'अशोक - पाटलिपुत्र',
        'अजातशत्रु - राजगृह',
        'कालाशोक - वैशाली'
      ]
    },
    correctOption: 0,
    explanation: {
      en: 'The 4th Buddhist Council was held under Kushan King Kanishka at Kundalvana (Kashmir), presided over by Vasumitra (with Ashvaghosha as deputy). Here Buddhism split into Hinayana and Mahayana.',
      hi: 'चतुर्थ बौद्ध संगीति कुषाण राजा कनिष्क के शासनकाल में कश्मीर के कुंडलवन में हुई थी। इसके अध्यक्ष वसुमित्र व उपाध्यक्ष अश्वघोष थे। इसी संगीति में बौद्ध धर्म हीनयान और महायान में विभाजित हुआ।'
    }
  },
  {
    id: 'ras_pyq_hist_inc_sessions',
    subjectId: 'indian_history',
    subtopic: 'Freedom Struggle & Gandhian Era (1915-1947)',
    year: 2021,
    paperName: 'RPSC RAS Prelims 2021',
    importance: 'HIGH_YIELD',
    importanceScore: 93,
    conceptKey: 'INC_Historic_Sessions',
    tags: ['INC', 'Lahore Session', 'Purna Swaraj', 'Nehru'],
    question: {
      en: 'In which historic session of the Indian National Congress (INC) was the resolution of "Purna Swaraj" (Complete Independence) passed under the presidency of Jawaharlal Nehru?',
      hi: 'भारतीय राष्ट्रीय कांग्रेस के किस ऐतिहासिक अधिवेशन में जवाहरलाल नेहरू की अध्यक्षता में "पूर्ण स्वराज्य" का प्रस्ताव पारित किया गया था?'
    },
    options: {
      en: ['Lahore Session, 1929 (लाहौर अधिवेशन)', 'Karachi Session, 1931 (कराची अधिवेशन)', 'Belgaum Session, 1924 (बेलगाम अधिवेशन)', 'Calcutta Session, 1928 (कलकत्ता अधिवेशन)'],
      hi: ['लाहौर अधिवेशन, 1929', 'कराची अधिवेशन, 1931', 'बेलगाम अधिवेशन, 1924', 'कलकत्ता अधिवेशन, 1928']
    },
    correctOption: 0,
    explanation: {
      en: 'At the Lahore session in December 1929, the INC declared "Purna Swaraj" (Complete Independence) as its ultimate goal. It was decided to celebrate 26 January 1930 as the first Independence Day.',
      hi: 'दिसंबर 1929 के ऐतिहासिक लाहौर अधिवेशन में जवाहरलाल नेहरू की अध्यक्षता में पूर्ण स्वराज का प्रस्ताव पारित किया गया तथा 26 जनवरी 1930 को प्रथम स्वतंत्रता दिवस के रूप में मनाने की घोषणा की गई।'
    }
  },

  // ==========================================
  // 6. INDIAN POLITY & CONSTITUTION
  // ==========================================
  {
    id: 'ras_pyq_2023_09',
    subjectId: 'indian_polity',
    subtopic: 'Preamble, Fundamental Rights & DPSP',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'DPSP_Articles',
    tags: ['Polity', 'DPSP', 'Article 44', 'UCC'],
    question: {
      en: 'Under Part IV (Directive Principles of State Policy) of the Constitution of India, which Article directs the State to secure a Uniform Civil Code (UCC) for the citizens?',
      hi: 'भारतीय संविधान के भाग-IV (राज्य के नीति निदेशक तत्व) के अंतर्गत कौन सा अनुच्छेद राज्य को नागरिकों के लिए एक समान नागरिक संहिता (UCC) सुरक्षित करने का निर्देश देता है?'
    },
    options: {
      en: ['Article 44 (अनुच्छेद 44)', 'Article 40 (अनुच्छेद 40)', 'Article 45 (अनुच्छेद 45)', 'Article 50 (अनुच्छेद 50)'],
      hi: ['अनुच्छेद 44', 'अनुच्छेद 40', 'अनुच्छेद 45', 'अनुच्छेद 50']
    },
    correctOption: 0,
    explanation: {
      en: 'Article 44 states: "The State shall endeavour to secure for the citizens a Uniform Civil Code throughout the territory of India." Article 40 is Organization of Village Panchayats, Article 50 is Separation of Judiciary from Executive.',
      hi: 'अनुच्छेद 44 राज्य को पूरे भारत में नागरिकों के लिए एक समान नागरिक संहिता (Uniform Civil Code) लागू करने का निर्देश देता है। अनुच्छेद 40 ग्राम पंचायतों के गठन तथा अनुच्छेद 50 कार्यपालिका से न्यायपालिका के पृथक्करण से संबंधित है।'
    }
  },
  {
    id: 'ras_pyq_polity_writs',
    subjectId: 'indian_polity',
    subtopic: 'Preamble, Fundamental Rights & DPSP',
    year: 2021,
    paperName: 'RPSC RAS Prelims 2021',
    importance: 'HIGH_YIELD',
    importanceScore: 97,
    conceptKey: 'Constitutional_Writs',
    tags: ['Writs', 'Article 32', 'Quo-Warranto', 'Mandamus'],
    question: {
      en: 'Which writ is issued by the Supreme Court or High Court to prevent an illegal usurpation of a public office by an unqualified person?',
      hi: 'किसी अयोग्य व्यक्ति द्वारा किसी सार्वजनिक पद को अवैध रूप से धारण करने से रोकने हेतु सर्वोच्च न्यायालय या उच्च न्यायालय द्वारा कौन सी रिट जारी की जाती है?'
    },
    options: {
      en: ['Quo-Warranto (अधिकार पृच्छा)', 'Mandamus (परमादेश)', 'Habeas Corpus (बंदी प्रत्यक्षीकरण)', 'Certiorari (उत्प्रेषण)'],
      hi: ['अधिकार पृच्छा (Quo-Warranto)', 'परमादेश (Mandamus)', 'बंदी प्रत्यक्षीकरण (Habeas Corpus)', 'उत्प्रेषण (Certiorari)']
    },
    correctOption: 0,
    explanation: {
      en: 'Quo-Warranto (literally "By what authority?") is issued to enquire into the legality of the claim of a person to a public office. Mandamus commands performance of a public duty; Habeas Corpus produces a detained person.',
      hi: 'अधिकार पृच्छा (Quo-Warranto) का शाब्दिक अर्थ है "आपका क्या प्राधिकार है?"। यह रिट किसी व्यक्ति द्वारा सार्वजनिक पद के अवैध उपभोग की जांच करने हेतु जारी की जाती है।'
    }
  },

  // ==========================================
  // 7. GEOGRAPHY: INDIA & WORLD
  // ==========================================
  {
    id: 'ras_pyq_2021_10',
    subjectId: 'indian_world_geo',
    subtopic: 'World: Prominent Mountain Peaks, Plateaus, Oceans, Straits',
    year: 2021,
    paperName: 'RPSC RAS Prelims 2021',
    importance: 'HIGH_YIELD',
    importanceScore: 92,
    conceptKey: 'World_Straits',
    tags: ['World Geography', 'Strait of Gibraltar', 'Mediterranean'],
    question: {
      en: 'Which strait connects the Atlantic Ocean with the Mediterranean Sea and separates Europe (Spain) from Africa (Morocco)?',
      hi: 'कौन सी जलसंधि अटलांटिक महासागर को भूमध्य सागर से जोड़ती है तथा यूरोप (स्पेन) को अफ्रीका (मोरक्को) से अलग करती है?'
    },
    options: {
      en: ['Strait of Gibraltar (जिब्राल्टर जलसंधि)', 'Strait of Malacca (मलक्का जलसंधि)', 'Strait of Hormuz (हर्मुज जलसंधि)', 'Bering Strait (बेरिंग जलसंधि)'],
      hi: ['जिब्राल्टर जलसंधि', 'मलक्का जलसंधि', 'हर्मुज जलसंधि', 'बेरिंग जलसंधि']
    },
    correctOption: 0,
    explanation: {
      en: 'The Strait of Gibraltar connects the Atlantic Ocean to the Mediterranean Sea and separates Spain from Morocco. It is known as the "Key to the Mediterranean".',
      hi: 'जिब्राल्टर जलसंधि अटलांटिक महासागर को भूमध्य सागर से जोड़ती है और यूरोप (स्पेन) को अफ्रीका (मोरक्को) से पृथक करती है। इसे भूमध्य सागर की कुंजी (Key to Mediterranean) भी कहा जाता है।'
    }
  },

  // ==========================================
  // 8. INDIAN ECONOMY
  // ==========================================
  {
    id: 'ras_pyq_econ_monetary_policy',
    subjectId: 'indian_economy',
    subtopic: 'Monetary Policy, RBI & Inflation Management',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 95,
    conceptKey: 'RBI_Monetary_Policy_Committee',
    tags: ['RBI', 'MPC', 'Inflation Target', 'Repo Rate'],
    question: {
      en: 'Under the Reserve Bank of India Act 1934, what is the flexible inflation target mandate given to the Monetary Policy Committee (MPC)?',
      hi: 'भारतीय रिज़र्व बैंक अधिनियम 1934 के अंतर्गत मौद्रिक नीति समिति (MPC) को उपभोक्ता मूल्य सूचकांक (CPI) आधारित मुद्रास्फीति का क्या लक्ष्य सौंपा गया है?'
    },
    options: {
      en: ['4% with a tolerance band of +/- 2% (2% to 6%)', '5% with a tolerance band of +/- 1%', '3% with a tolerance band of +/- 2%', '6% fixed target'],
      hi: ['4% के साथ +/- 2% का सहनशीलता दायरा (2% से 6%)', '5% (+/- 1%)', '3% (+/- 2%)', '6% नियत लक्ष्य']
    },
    correctOption: 0,
    explanation: {
      en: 'The Central Government, in consultation with the RBI, sets the inflation target at 4% with an upper tolerance limit of 6% and a lower tolerance limit of 2% (4% +/- 2%) based on Headline CPI.',
      hi: 'आरबीआई अधिनियम के तहत केंद्र सरकार द्वारा मुद्रास्फीति का लक्ष्य 4% निर्धारित किया गया है, जिसकी न्यूनतम सीमा 2% तथा अधिकतम सीमा 6% (4% +/- 2%) रखी गई है।'
    }
  },

  // ==========================================
  // 9. GENERAL SCIENCE & TECHNOLOGY
  // ==========================================
  {
    id: 'ras_pyq_2023_11',
    subjectId: 'science_tech',
    subtopic: 'Space Technology & ISRO Missions (Chandrayaan, Gaganyaan, Aditya-L1)',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 100,
    conceptKey: 'Aditya_L1_Mission',
    tags: ['ISRO', 'Aditya L1', 'Lagrange Point', 'Space'],
    question: {
      en: 'In India’s solar observatory mission "Aditya-L1", what does "L1" stand for and at what approximate distance is it located from Earth?',
      hi: 'भारत के प्रथम सौर वेधशाला मिशन "आदित्य-एल1" (Aditya-L1) में "L1" का क्या अर्थ है और यह पृथ्वी से लगभग कितनी दूरी पर स्थित है?'
    },
    options: {
      en: [
        'Lagrangian Point 1 (~1.5 million km)',
        'Lunar Orbit 1 (~384,000 km)',
        'Low Earth Orbit 1 (~500 km)',
        'Linear Coordinate 1 (~15 million km)'
      ],
      hi: [
        'लैग्रेंज बिंदु 1 (Lagrange Point 1) - लगभग 15 लाख किमी (1.5 million km)',
        'चंद्र कक्षा 1 (Lunar Orbit 1) - लगभग 3.84 लाख किमी',
        'निम्न भू कक्षा 1 (Low Earth Orbit 1) - लगभग 500 किमी',
        'रेखीय निर्देशांक 1 - लगभग 1.5 करोड़ किमी'
      ]
    },
    correctOption: 0,
    explanation: {
      en: 'Aditya-L1 was launched by PSLV-C57 to the Sun-Earth Lagrangian Point 1 (L1), located approximately 1.5 million km from Earth, allowing uninterrupted 24x7 solar viewing without eclipses.',
      hi: 'आदित्य-L1 को PSLV-C57 द्वारा पृथ्वी से लगभग 15 लाख किलोमीटर दूर सूर्य-पृथ्वी लैग्रेंज बिंदु 1 (L1) के हेलो ऑर्बिट में स्थापित किया गया है, जहां से बिना किसी ग्रहण के सूर्य का 24 घंटे निरंतर अध्ययन किया जा सकता है।'
    }
  },
  {
    id: 'ras_pyq_sci_mrna_vaccine',
    subjectId: 'science_tech',
    subtopic: 'Biotechnology, Genetic Engineering & Vaccines',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'mRNA_Vaccine_Technology',
    tags: ['Biotechnology', 'mRNA', 'Nobel Prize', 'Vaccines'],
    question: {
      en: 'Katalin Kariko and Drew Weissman were awarded the 2023 Nobel Prize in Physiology or Medicine for discoveries concerning nucleoside base modifications that enabled the development of which vaccine technology?',
      hi: 'कैटालिन कारिको और ड्रू वीसमैन को न्यूक्लियोसाइड बेस संशोधनों से संबंधित खोजों के लिए 2023 का चिकित्सा नोबेल पुरस्कार दिया गया, जिससे किस टीका (वैक्सीन) तकनीक का विकास संभव हुआ?'
    },
    options: {
      en: ['Effective mRNA vaccines against COVID-19', 'Inactivated virus vaccines', 'Viral vector based vaccines', 'Live attenuated bacterial vaccines'],
      hi: ['कोविड-19 के विरुद्ध प्रभावी mRNA टीके', 'निष्क्रिय विषाणु टीके', 'वायरल वेक्टर टीके', 'जीवित क्षीण टीके']
    },
    correctOption: 0,
    explanation: {
      en: 'Kariko and Weissman discovered that base-modified mRNA suppressed inflammatory responses and drastically increased protein production, paving the way for FDA-approved mRNA COVID-19 vaccines (Pfizer/BioNTech and Moderna).',
      hi: 'कारिको और वीसमैन की खोज ने न्यूक्लियोसाइड बेस मॉडिफिकेशन द्वारा मानव शरीर की प्रतिरक्षा प्रणाली से बिना किसी सूजन के mRNA वैक्सीन (फाइजर, मॉडर्ना) बनाने का मार्ग प्रशस्त किया।'
    }
  },

  // ==========================================
  // 10. REASONING & MENTAL ABILITY
  // ==========================================
  {
    id: 'ras_pyq_2023_12',
    subjectId: 'reasoning_mental',
    subtopic: 'Statement & Assumptions / Arguments / Conclusions',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 90,
    conceptKey: 'Logical_Syllogism',
    tags: ['Reasoning', 'Syllogism', 'Logic'],
    question: {
      en: 'Statements: 1. All IAS officers are graduates. 2. Some graduates are poets. \nConclusions: I. Some poets are IAS officers. II. All graduates are IAS officers.',
      hi: 'कथन: 1. सभी आईएएस (IAS) अधिकारी स्नातक हैं। 2. कुछ स्नातक कवि हैं। \nनिष्कर्ष: I. कुछ कवि आईएएस अधिकारी हैं। II. सभी स्नातक आईएएस अधिकारी हैं।'
    },
    options: {
      en: ['Neither conclusion I nor II follows', 'Only conclusion I follows', 'Only conclusion II follows', 'Both conclusions I and II follow'],
      hi: ['न तो निष्कर्ष I और न ही II निकलता है', 'केवल निष्कर्ष I निकलता है', 'केवल निष्कर्ष II निकलता है', 'दोनों निष्कर्ष I और II निकलते हैं']
    },
    correctOption: 0,
    explanation: {
      en: 'Conclusion I ("Some poets are IAS officers") is possible but not definite. Conclusion II ("All graduates are IAS officers") is false since IAS is a subset of graduates, not vice versa. Hence, neither follows.',
      hi: 'कथन के अनुसार सभी IAS स्नातक हैं और कुछ स्नातक कवि हैं। इससे यह अनिवार्य नहीं निकलता कि कोई कवि IAS है। दूसरा निष्कर्ष भी गलत है क्योंकि स्नातक बड़ा समुच्चय है। अतः न तो निष्कर्ष I और न ही II निकलता है।'
    }
  },

  // ==========================================
  // 11. CURRENT AFFAIRS
  // ==========================================
  {
    id: 'ras_pyq_2023_13',
    subjectId: 'current_affairs',
    subtopic: 'Rajasthan Current Affairs & Schemes',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 97,
    conceptKey: 'ERCP_Project',
    tags: ['ERCP', 'Chambal', 'Districts', 'Current Affairs'],
    question: {
      en: 'The Eastern Rajasthan Canal Project (ERCP) has been designed to address drinking and irrigation water needs of how many eastern and south-eastern districts of Rajasthan?',
      hi: 'पूर्वी राजस्थान नहर परियोजना (ERCP) राजस्थान के कितने पूर्वी एवं दक्षिण-पूर्वी जिलों के पेयजल एवं सिंचाई जल की आवश्यकताओं को पूरा करने हेतु बनाई गई है?'
    },
    options: {
      en: ['13 Districts (13 जिले)', '10 Districts (10 जिले)', '17 Districts (17 जिले)', '7 Districts (7 जिले)'],
      hi: ['13 जिले', '10 जिले', '17 जिले', '7 जिले']
    },
    correctOption: 0,
    explanation: {
      en: 'ERCP interlinks the surplus waters of the Chambal river basin (Kuno, Kul, Parbati, Kalisindh, Mej) to cater to the drinking water needs of 13 districts of eastern Rajasthan (Jhalawar, Baran, Kota, Bundi, Sawai Madhopur, Ajmer, Tonk, Jaipur, Dausa, Karauli, Alwar, Bharatpur, Dholpur).',
      hi: 'ERCP परियोजना का उद्देश्य चंबल बेसिन के अधिशेष जल को 13 जिलों (झालावाड़, बारां, कोटा, बूंदी, सवाई माधोपुर, अजमेर, टोंक, जयपुर, दौसा, करौली, अलवर, भरतपुर, धौलपुर) तक पहुँचाकर पेयजल व सिंचाई उपलब्ध कराना है।'
    }
  }
];
