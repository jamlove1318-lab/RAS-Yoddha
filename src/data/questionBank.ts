import { Question } from '../types';

export const INITIAL_QUESTION_BANK: Question[] = [
  // 1. Rajasthan History, Art & Culture
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
      en: 'Who is revered as the main folk deity (Lokdevta) protecting camels and credited with bringing camels ( ऊंट ) to Marwar for the first time?',
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
      en: 'Sirohi Prajamandal was founded by Gokulbhai Bhatt (known as "Rajasthan ka Gandhi") in 1939 in Bombay. Mewar was founded by Manikya Lal Verma (1938), Bikaner by Magharam Vaidya in Calcutta (1936), and Banswara by Bhupendranath Trivedi (1943).',
      hi: 'सिरोही प्रजामंडल की स्थापना 1939 में गोकुलभाई भट्ट ("राजस्थान के गांधी") द्वारा की गई। मेवाड़ प्रजामंडल के संस्थापक माणिक्यलाल वर्मा थे, बीकानेर के मघाराम वैद्य (कलकत्ता में 1936) तथा बांसवाड़ा के भूपेंद्रनाथ त्रिवेदी थे।'
    }
  },

  // 2. Rajasthan Geography
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
      en: 'River Luni originates from Nag Pahar (Ajmer). Its water remains sweet up to Balotra (now a separate district, formerly Barmer). Beyond Balotra, due to salt-rich soil and evaporation in the arid region, the water turns saline.',
      hi: 'लूणी नदी अजमेर के नाग पहाड़ से निकलती है। बालोतरा तक इसका पानी मीठा रहता है, परंतु बालोतरा के बाद मरुस्थलीय मिट्टी में लवणीय कणों की अधिकता के कारण इसका पानी खारा (नमकीन) हो जाता है। इसलिए इसे "आधी मीठी - आधी खारी" नदी भी कहते हैं।'
    }
  },

  // 3. Rajasthan Polity & Administration
  {
    id: 'ras_pyq_2023_06',
    subjectId: 'raj_polity_admin',
    subtopic: 'State Human Rights Commission (SHRC) & Information Commission',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 94,
    conceptKey: 'SHRC_Composition',
    frequencyNote: 'Rajasthan SHRC composition and chairpersons is a guaranteed topic.',
    tags: ['SHRC', 'Polity', 'Human Rights'],
    question: {
      en: 'Under the Protection of Human Rights (Amendment) Act 2019, what is the composition of the State Human Rights Commission (SHRC)?',
      hi: 'मानव अधिकार संरक्षण (संशोधन) अधिनियम, 2019 के अंतर्गत राज्य मानवाधिकार आयोग (SHRC) की संरचना क्या है?'
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
      en: 'As per the 2006 and 2019 amendments to the Human Rights Act, a State Human Rights Commission consists of a Chairperson (who has been a Chief Justice or a Judge of a High Court) and two members (one judicial member and one with knowledge of human rights). Total = 1 + 2 = 3.',
      hi: 'मानवाधिकार संरक्षण अधिनियम के तहत राज्य मानवाधिकार आयोग में 1 अध्यक्ष (उच्च न्यायालय का पूर्व मुख्य न्यायाधीश या न्यायाधीश) तथा 2 सदस्य होते हैं (कुल 3 व्यक्ति)।'
    }
  },

  // 4. Rajasthan Economy & Economic Survey
  {
    id: 'ras_pyq_2023_07',
    subjectId: 'raj_economy',
    subtopic: 'Macro Indicators of Rajasthan (GSDP, Per Capita Income)',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 99,
    conceptKey: 'Economic_Survey_GSDP',
    frequencyNote: 'Economic survey sectoral shares (Agri, Industry, Service) appears in every RAS exam.',
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

  // 5. Indian History
  {
    id: 'ras_pyq_2021_08',
    subjectId: 'indian_history',
    subtopic: 'Ancient India: IVC, Buddhism, Jainism, Mauryas, Guptas',
    year: 2021,
    paperName: 'RPSC RAS Prelims 2021',
    importance: 'HIGH_YIELD',
    importanceScore: 91,
    conceptKey: 'Buddhist_Councils',
    frequencyNote: 'Buddhist councils, kings & places asked in 2013, 2016, 2021.',
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

  // 6. Indian Polity
  {
    id: 'ras_pyq_2023_09',
    subjectId: 'indian_polity',
    subtopic: 'Preamble, Fundamental Rights & DPSP',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'DPSP_Articles',
    frequencyNote: 'Articles 39A, 40, 44, 48A, 50 are tested repeatedly in RPSC.',
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

  // 7. Geography: India & World
  {
    id: 'ras_pyq_2021_10',
    subjectId: 'indian_world_geo',
    subtopic: 'World: Prominent Mountain Peaks, Plateaus, Oceans, Straits',
    year: 2021,
    paperName: 'RPSC RAS Prelims 2021',
    importance: 'HIGH_YIELD',
    importanceScore: 92,
    conceptKey: 'World_Straits',
    frequencyNote: 'World straits and choke points are favorite RPSC physical geography questions.',
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
      en: 'The Strait of Gibraltar connects the Atlantic Ocean to the Mediterranean Sea and separates the Iberian Peninsula (Spain, Europe) from Morocco (Africa). It is known as the "Key to the Mediterranean".',
      hi: 'जिब्राल्टर जलसंधि अटलांटिक महासागर को भूमध्य सागर से जोड़ती है और यूरोप (स्पेन) को अफ्रीका (मोरक्को) से पृथक करती है। इसे भूमध्य सागर की कुंजी (Key to Mediterranean) भी कहा जाता है।'
    }
  },

  // 8. General Science & Technology
  {
    id: 'ras_pyq_2023_11',
    subjectId: 'science_tech',
    subtopic: 'Space Technology & ISRO Missions (Chandrayaan, Gaganyaan, Aditya-L1)',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 100,
    conceptKey: 'Aditya_L1_Mission',
    frequencyNote: 'Directly asked in RAS Prelims 2023.',
    tags: ['ISRO', 'Aditya L1', 'Lagrange Point', 'Space'],
    question: {
      en: 'In India’s first solar observatory mission "Aditya-L1", what does "L1" stand for and at what approximate distance is it located from Earth?',
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
      en: 'Aditya-L1 was launched by PSLV-C57 to the Sun-Earth Lagrangian Point 1 (L1), located approximately 1.5 million km from Earth. At L1, the gravitational forces between Sun and Earth provide a continuous unobstructed view of the Sun without eclipses.',
      hi: 'आदित्य-L1 को PSLV-C57 द्वारा पृथ्वी से लगभग 15 लाख किलोमीटर दूर सूर्य-पृथ्वी लैग्रेंज बिंदु 1 (L1) के हेलो ऑर्बिट में स्थापित किया गया है। L1 बिंदु पर बिना किसी ग्रहण के सूर्य का 24 घंटे निरंतर अध्ययन किया जा सकता है।'
    }
  },

  // 9. Reasoning & Mental Ability
  {
    id: 'ras_pyq_2023_12',
    subjectId: 'reasoning_mental',
    subtopic: 'Statement & Assumptions / Arguments / Conclusions',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 90,
    conceptKey: 'Logical_Syllogism',
    frequencyNote: 'Syllogism and statements have 3-4 questions in every RAS exam.',
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
      hi: 'कथन के अनुसार सभी IAS स्नातक हैं और कुछ स्नातक कवि हैं। इससे यह अनिवार्य नहीं निकलता कि कोई कवि IAS है (केवल संभावना है, निश्चित नहीं)। दूसरा निष्कर्ष भी गलत है क्योंकि केवल कुछ स्नातक ही IAS हैं। अतः न तो निष्कर्ष I और न ही निष्कर्ष II अनुसरण करता है।'
    }
  },

  // 10. Current Affairs
  {
    id: 'ras_pyq_2023_13',
    subjectId: 'current_affairs',
    subtopic: 'Rajasthan Current Affairs & Schemes',
    year: 2023,
    paperName: 'RPSC RAS Prelims 2023',
    importance: 'HIGH_YIELD',
    importanceScore: 97,
    conceptKey: 'ERCP_Project',
    frequencyNote: 'ERCP (Eastern Rajasthan Canal Project) is the biggest water infrastructure topic in Rajasthan.',
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
