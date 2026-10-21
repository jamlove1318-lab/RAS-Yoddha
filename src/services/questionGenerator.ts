import { Question, SubjectId, ImportanceLevel } from '../types';

interface GenerationTemplate {
  subjectId: SubjectId;
  subtopic: string;
  importance: ImportanceLevel;
  importanceScore: number;
  conceptKey: string;
  generate: (seed: number) => {
    question: { en: string; hi: string };
    options: { en: string[]; hi: string[] };
    correctOption: number;
    explanation: { en: string; hi: string };
    tags: string[];
  };
}

const TEMPLATES: GenerationTemplate[] = [
  // 1. Rajasthan Forts & Key Facts
  {
    subjectId: 'raj_history_art',
    subtopic: 'Forts, Palaces & Architecture (दुर्ग एवं स्थापत्य)',
    importance: 'HIGH_YIELD',
    importanceScore: 95,
    conceptKey: 'Fort_Features_Generator',
    generate: (seed) => {
      const forts = [
        {
          nameEn: 'Gagron Fort (Jhalawar)',
          nameHi: 'गागरोण दुर्ग (झालावाड़)',
          typeEn: 'Water Fort (Jal Durg / Audak Durg)',
          typeHi: 'जल दुर्ग (औदक दुर्ग)',
          riversEn: 'Ahu and Kalisindh rivers',
          riversHi: 'आहू और कालीसिंध नदियों के संगम पर',
          factEn: 'It is built without any foundation on a natural rock and was ruled by King Achaldas Khichi.',
          factHi: 'यह बिना किसी नींव के सीधे प्राकृतिक चट्टान पर खड़ा है तथा अचलदास खींची की वीरता के लिए प्रसिद्ध है।'
        },
        {
          nameEn: 'Kumbhalgarh Fort (Rajsamand)',
          nameHi: 'कुंभलगढ़ दुर्ग (राजसमंद)',
          typeEn: 'Hill Fort (Giri Durg) with Katargarh citadel',
          typeHi: 'गिरि दुर्ग एवं अंतःदुर्ग कटारगढ़ (मेवाड़ की आंख)',
          riversEn: 'Aravalli range near Kelwara',
          riversHi: 'अरावली की जरगा पहाड़ी श्रृंखला पर',
          factEn: 'Constructed by Maharana Kumbha through architect Mandan, having a 36 km long massive wall ("Great Wall of India").',
          factHi: 'महाराणा कुंभा द्वारा प्रमुख वास्तुकार मंडन की देखरेख में निर्मित, जिसकी 36 किमी लंबी दीवार भारत की महान दीवार कहलाती है।'
        },
        {
          nameEn: 'Mehrangarh Fort (Jodhpur)',
          nameHi: 'मेहरानगढ़ दुर्ग (जोधपुर)',
          typeEn: 'Peacock-shaped Hill Fort (Mayur-dhvaj-garh)',
          typeHi: 'मयूरध्वजगढ़ / चिड़ियाटूँक पहाड़ी पर निर्मित गिरि दुर्ग',
          riversEn: 'Chidiyatunk hill',
          riversHi: 'चिड़ियाटूँक पहाड़ी',
          factEn: 'Founded by Rao Jodha in 1459 AD; Rudyard Kipling described it as "A work of giants and fairies".',
          factHi: 'राव जोधा द्वारा 1459 ई. में नींव रखी गई। रुडयार्ड किपलिंग ने इसे "परियों व देवताओं द्वारा निर्मित" बताया था।'
        },
        {
          nameEn: 'Taragarh Fort (Bundi)',
          nameHi: 'तारागढ़ दुर्ग (बूंदी)',
          typeEn: 'Star-shaped Fort with Garbh-Gunjam Cannon',
          typeHi: 'तारे के आकार का दुर्ग (गर्भ गुंजन तोप युक्त)',
          riversEn: 'Nagpahar / Bundi hills',
          riversHi: 'बूंदी की अरावली पहाड़ियों पर',
          factEn: 'Built by Rao Bar Singh in the 14th century, famous for its grand stepwells and Chitrashala paintings.',
          factHi: '14वीं शताब्दी में राव बरसिंह द्वारा निर्मित, जो अपनी चित्रशाला और विशाल बावड़ियों के लिए विश्वविख्यात है।'
        }
      ];

      const chosen = forts[seed % forts.length];
      const wrongs = forts.filter(f => f.nameEn !== chosen.nameEn);

      return {
        question: {
          en: `Which of the following forts of Rajasthan is situated at the confluence of ${chosen.riversEn} and classified as a ${chosen.typeEn}?`,
          hi: `राजस्थान का कौन सा दुर्ग ${chosen.riversHi} स्थित है तथा इसे ${chosen.typeHi} की श्रेणी में रखा जाता है?`
        },
        options: {
          en: [chosen.nameEn, wrongs[0].nameEn, wrongs[1].nameEn, wrongs[2].nameEn],
          hi: [chosen.nameHi, wrongs[0].nameHi, wrongs[1].nameHi, wrongs[2].nameHi]
        },
        correctOption: 0,
        explanation: {
          en: `${chosen.nameEn}: ${chosen.factEn} Rivers/Location: ${chosen.riversEn}.`,
          hi: `${chosen.nameHi}: ${chosen.factHi} यह ${chosen.riversHi} स्थित है।`
        },
        tags: ['Forts', 'Architecture', 'High Yield', 'RPSC Favorite']
      };
    }
  },

  // 2. Rajasthan Integration (एकीकरण)
  {
    subjectId: 'raj_history_art',
    subtopic: 'Integration of Rajasthan (राजस्थान का एकीकरण)',
    importance: 'HIGH_YIELD',
    importanceScore: 97,
    conceptKey: 'Integration_Stages',
    generate: (seed) => {
      const stages = [
        {
          stageEn: 'Stage 1: Matsya Union (मत्स्य संघ)',
          dateEn: '18 March 1948',
          dateHi: '18 मार्च 1948',
          pmEn: 'Shobha Ram Kumawat',
          pmHi: 'शोभाराम कुमावत (अलवर)',
          rajpramukhEn: 'Udaybhan Singh (Dholpur)',
          rajpramukhHi: 'महाराजा उदयभान सिंह (धौलपुर)',
          statesEn: 'Alwar, Bharatpur, Dholpur, Karauli and Neemrana'
        },
        {
          stageEn: 'Stage 2: Rajasthan Union (राजस्थान संघ)',
          dateEn: '25 March 1948',
          dateHi: '25 मार्च 1948',
          pmEn: 'Gokul Lal Asawa',
          pmHi: 'गोकुल लाल असावा (शाहपुरा)',
          rajpramukhEn: 'Maharao Bhim Singh (Kota)',
          rajpramukhHi: 'महाराव भीम सिंह (कोटा)',
          statesEn: 'Kota, Bundi, Jhalawar, Banswara, Dungarpur, Pratapgarh, Kishangarh, Tonk, Shahpura'
        },
        {
          stageEn: 'Stage 3: United Rajasthan (संयुक्त राजस्थान)',
          dateEn: '18 April 1948',
          dateHi: '18 अप्रैल 1948',
          pmEn: 'Manikya Lal Verma',
          pmHi: 'माणिक्य लाल वर्मा (मेवाड़)',
          rajpramukhEn: 'Maharana Bhopal Singh (Udaipur)',
          rajpramukhHi: 'महाराणा भूपाल सिंह (उदयपुर)',
          statesEn: 'Rajasthan Union + Udaipur (Inaugurated by Pt. Jawaharlal Nehru)'
        },
        {
          stageEn: 'Stage 4: Greater Rajasthan (वृहद् राजस्थान)',
          dateEn: '30 March 1949 (Rajasthan Day)',
          dateHi: '30 मार्च 1949 (राजस्थान दिवस)',
          pmEn: 'Pt. Hiralal Shastri',
          pmHi: 'पं. हीरालाल शास्त्री',
          rajpramukhEn: 'Maharaja Sawai Man Singh II (Jaipur)',
          rajpramukhHi: 'सवाई मानसिंह द्वितीय (जयपुर)',
          statesEn: 'United Rajasthan + Jaipur, Jodhpur, Bikaner, Jaisalmer'
        }
      ];

      const item = stages[seed % stages.length];
      const otherItem = stages[(seed + 1) % stages.length];
      const otherItem2 = stages[(seed + 2) % stages.length];
      const otherItem3 = stages[(seed + 3) % stages.length];

      return {
        question: {
          en: `During the integration of Rajasthan, who was appointed as the Prime Minister (Chief Minister) of "${item.stageEn}" formed on ${item.dateEn}?`,
          hi: `राजस्थान के एकीकरण के समय ${item.dateHi} को गठित "${item.stageEn}" का प्रधानमंत्री किसे बनाया गया था?`
        },
        options: {
          en: [item.pmEn, otherItem.pmEn, otherItem2.pmEn, otherItem3.pmEn],
          hi: [item.pmHi, otherItem.pmHi, otherItem2.pmHi, otherItem3.pmHi]
        },
        correctOption: 0,
        explanation: {
          en: `For ${item.stageEn} (formed on ${item.dateEn}): Prime Minister was ${item.pmEn}, Rajpramukh was ${item.rajpramukhEn}. Member princely states: ${item.statesEn}.`,
          hi: `${item.stageEn} का गठन ${item.dateHi} को हुआ। इसके प्रधानमंत्री ${item.pmHi} तथा राजप्रमुख ${item.rajpramukhHi} थे।`
        },
        tags: ['Integration', 'Rajasthan History', 'High Yield']
      };
    }
  },

  // 3. Rajasthan Prajamandal and Peasant Movements
  {
    subjectId: 'raj_history_art',
    subtopic: 'Freedom Movement & Prajamandal Movements',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'Peasant_Movements',
    generate: (seed) => {
      const movements = [
        {
          nameEn: 'Bijolia Peasant Movement',
          nameHi: 'बिजोलिया किसान आंदोलन',
          durationEn: '1897 to 1941 (44 years - Longest non-violent movement)',
          durationHi: '1897 से 1941 (44 वर्ष - भारत का सबसे लंबा अहिंसक आंदोलन)',
          leadersEn: 'Sadhu Sitaram Das, Vijay Singh Pathik (Bhup Singh), Manikya Lal Verma',
          leadersHi: 'साधु सीताराम दास, विजय सिंह पथिक, माणिक्य लाल वर्मा',
          taxesEn: '84 types of taxes (Lagh-Bagh) including Chanwari and Talwar Bandhai tax',
          taxesHi: '84 प्रकार की लाग-बाग (चौंरी कर व तलवार बंधाई कर)'
        },
        {
          nameEn: 'Begun Peasant Movement',
          nameHi: 'बेगूं किसान आंदोलन',
          durationEn: '1921 to 1923',
          durationHi: '1921 से 1923',
          leadersEn: 'Ramnarayan Chaudhary, Rupa Ji and Kripa Ji Dhakar (martyrs at Govindpura)',
          leadersHi: 'रामनारायण चौधरी, रूपा जी व कृपा जी धाकड़ (गोविंदपुरा गोलीकांड में शहीद)',
          taxesEn: 'Trench Commission Inquiry & Bolshevik agreement',
          taxesHi: 'ट्रेंच आयोग की जांच तथा बोलशेविक फैसला'
        },
        {
          nameEn: 'Neemuchana Peasant Movement, Alwar',
          nameHi: 'नीमूचाणा हत्याकांड (अलवर)',
          durationEn: '14 May 1925',
          durationHi: '14 मई 1925',
          leadersEn: 'Maharaja Jai Singh wild boar tax & Land settlement protests',
          leadersHi: 'सूअर समस्या एवं नई लगान दरों के विरोध में किसानों का आंदोलन',
          taxesEn: 'Condemned by Mahatma Gandhi as "Dyerism Double Distilled" (दोहरी डायरशाही)',
          taxesHi: 'गांधीजी ने इसे "दोहरी डायरशाही" (जलियांवाला बाग से भी वीभत्स) कहा'
        }
      ];

      const item = movements[seed % movements.length];
      const others = movements.filter(m => m.nameEn !== item.nameEn);

      return {
        question: {
          en: `Which peasant movement in Rajasthan was associated with "${item.taxesEn}" and led by prominent leaders including ${item.leadersEn}?`,
          hi: `राजस्थान का कौन सा किसान आंदोलन "${item.taxesHi}" से जुड़ा था तथा जिसके प्रमुख नेतृत्वकर्ता ${item.leadersHi} थे?`
        },
        options: {
          en: [item.nameEn, others[0].nameEn, others[1].nameEn, 'Bundi Barad Peasant Movement'],
          hi: [item.nameHi, others[0].nameHi, others[1].nameHi, 'बूंदी (बरड़) किसान आंदोलन']
        },
        correctOption: 0,
        explanation: {
          en: `${item.nameEn}: Duration: ${item.durationEn}. Key details: ${item.taxesEn}.`,
          hi: `${item.nameHi}: समयावधि ${item.durationHi}। प्रमुख विशेषताएं: ${item.taxesHi}।`
        },
        tags: ['Peasant Movement', 'Bijolia', 'Neemuchana', 'Pathik', 'High Yield']
      };
    }
  },

  // 4. Rajasthan Geography - Rivers & Lakes
  {
    subjectId: 'raj_geography',
    subtopic: 'Drainage Systems & Lakes (अपवाह तंत्र एवं झीलें)',
    importance: 'HIGH_YIELD',
    importanceScore: 96,
    conceptKey: 'River_Origins',
    generate: (seed) => {
      const rivers = [
        {
          nameEn: 'Chambal River (चर्मण्यवती / कामधेनु)',
          nameHi: 'चंबल नदी (चर्मण्यवती)',
          originEn: 'Janapav Hills (Vindhyan range), MP',
          originHi: 'जानापाव पहाड़ी (विंध्याचल पर्वत, म.प्र.)',
          damsEn: 'Gandhi Sagar (MP), Rana Pratap Sagar (Chittor), Jawahar Sagar (Kota), Kota Barrage',
          damsHi: 'गांधी सागर (म.प्र.), राणा प्रताप सागर (चित्तौड़गढ़), जवाहर सागर व कोटा बैराज',
          drainageEn: 'Bay of Bengal drainage (tributary of Yamuna at Etawah)',
          drainageHi: 'बंगाल की खाड़ी अपवाह तंत्र (इटावा के निकट यमुना में विलय)'
        },
        {
          nameEn: 'Banas River (वन की आशा / वर्णाशा)',
          nameHi: 'बनास नदी (वन की आशा)',
          originEn: 'Khamnor Hills, Rajsamand',
          originHi: 'खमनौर की पहाड़ियां (राजसमंद)',
          damsEn: 'Bisalpur Dam (Tonk) and Isarda Dam (Sawai Madhopur)',
          damsHi: 'बीसलपुर बांध (टोंक) तथा ईसरदा बांध (सवाई माधोपुर)',
          drainageEn: 'Longest river completely flowing within Rajasthan',
          drainageHi: 'पूर्णतः राजस्थान में बहने वाली सबसे लंबी नदी'
        },
        {
          nameEn: 'Mahi River (कांठल की गंगा / आदिवासियों की गंगा)',
          nameHi: 'माही नदी (कांठल की गंगा)',
          originEn: 'Amjhera near Dhar, Mehadd Lake (MP)',
          originHi: 'मेहद झील (धार, मध्य प्रदेश)',
          damsEn: 'Mahi Bajaj Sagar Dam (Banswara) and Kadana Dam (Gujarat)',
          damsHi: 'माही बजाज सागर (बांसवाड़ा) तथा कडाणा बांध (गुजरात)',
          drainageEn: 'Cuts Tropic of Cancer twice; drains into Gulf of Khambhat (Arabian Sea)',
          drainageHi: 'कर्क रेखा को दो बार पार करने वाली नदी'
        },
        {
          nameEn: 'Som River (सोम नदी)',
          nameHi: 'सोम नदी',
          originEn: 'Bichhameda Hills, Udaipur',
          originHi: 'बीछामेड़ा पहाड़ियां (उदयपुर)',
          damsEn: 'Som-Kagdar (Udaipur) and Som-Kamla-Amba (Dungarpur)',
          damsHi: 'सोम-कागदर (उदयपुर) एवं सोम-कमला-अम्बा (डूंगरपुर)',
          drainageEn: 'Meets Mahi and Jakham at Beneshwar Dham Triveni Sangam',
          drainageHi: 'बेणेश्वर धाम पर माही व जाखम के साथ त्रिवेणी संगम बनाती है'
        }
      ];

      const r = rivers[seed % rivers.length];
      const otherRivers = rivers.filter(item => item.nameEn !== r.nameEn);

      return {
        question: {
          en: `Which river in Rajasthan originates from ${r.originEn} and on which the major dam project "${r.damsEn}" is constructed?`,
          hi: `राजस्थान की कौन सी नदी ${r.originHi} से निकलती है तथा जिस पर "${r.damsHi}" परियोजना निर्मित है?`
        },
        options: {
          en: [r.nameEn, otherRivers[0].nameEn, otherRivers[1].nameEn, otherRivers[2].nameEn],
          hi: [r.nameHi, otherRivers[0].nameHi, otherRivers[1].nameHi, otherRivers[2].nameHi]
        },
        correctOption: 0,
        explanation: {
          en: `${r.nameEn}: Origin is ${r.originEn}. Dams: ${r.damsEn}. Note: ${r.drainageEn}.`,
          hi: `${r.nameHi}: उद्गम ${r.originHi} से होता है। बांध: ${r.damsHi}। विशेष: ${r.drainageHi}।`
        },
        tags: ['Drainage', 'Rivers', 'Banas', 'Chambal', 'Mahi', 'High Yield']
      };
    }
  },

  // 5. Science & Tech - Space & Physics/Biology
  {
    subjectId: 'science_tech',
    subtopic: 'Space Technology & ISRO Missions (Chandrayaan, Gaganyaan, Aditya-L1)',
    importance: 'HIGH_YIELD',
    importanceScore: 97,
    conceptKey: 'ISRO_Launch_Vehicles',
    generate: (seed) => {
      const missions = [
        {
          nameEn: 'Chandrayaan-3',
          vehicleEn: 'LVM3-M4 (Fat Boy / Bahubali)',
          vehicleHi: 'LVM3-M4 (बाहुबली रॉकेट)',
          detailsEn: 'Landed near the lunar south pole (Shiv Shakti Point) on 23 August 2023 (National Space Day).',
          detailsHi: '23 अगस्त 2023 को चंद्रमा के दक्षिणी ध्रुव पर "शिव शक्ति बिंदु" पर सफल सॉफ्ट लैंडिंग की (राष्ट्रीय अंतरिक्ष दिवस)।'
        },
        {
          nameEn: 'Aditya-L1 Solar Mission',
          vehicleEn: 'PSLV-C57 (XL Configuration)',
          vehicleHi: 'PSLV-C57',
          detailsEn: 'Placed in a halo orbit around Sun-Earth Lagrange point 1 (L1), equipped with 7 indigenous payloads including VELC.',
          detailsHi: 'सूर्य के अध्ययन हेतु 7 पेलोड (VELC आदि) के साथ लैग्रेंज बिंदु 1 के हेलो ऑर्बिट में स्थापित।'
        },
        {
          nameEn: 'XPoSat (X-ray Polarimeter Satellite)',
          vehicleEn: 'PSLV-C58',
          vehicleHi: 'PSLV-C58',
          detailsEn: 'India\'s first dedicated scientific satellite to study polarimetry of cosmic X-ray sources like black holes and neutron stars.',
          detailsHi: 'ब्लैक होल और न्यूट्रॉन तारों से निकलने वाले एक्स-रे ध्रुवीकरण का अध्ययन करने वाला भारत का पहला समर्पित मिशन।'
        }
      ];

      const item = missions[seed % missions.length];
      const others = missions.filter(m => m.nameEn !== item.nameEn);

      return {
        question: {
          en: `Which launch vehicle of ISRO was used to successfully launch the "${item.nameEn}" mission?`,
          hi: `इसरो (ISRO) द्वारा "${item.nameEn}" मिशन को सफलतापूर्वक प्रक्षेपित करने के लिए किस प्रक्षेपण यान (Launch Vehicle) का उपयोग किया गया था?`
        },
        options: {
          en: [item.vehicleEn, others[0].vehicleEn, 'GSLV-F10', 'SSLV-D2'],
          hi: [item.vehicleHi, others[0].vehicleHi, 'GSLV-F10', 'SSLV-D2']
        },
        correctOption: 0,
        explanation: {
          en: `${item.nameEn} was launched by ${item.vehicleEn}. Mission Highlight: ${item.detailsEn}`,
          hi: `${item.nameEn} को ${item.vehicleHi} द्वारा प्रक्षेपित किया गया था। प्रमुख तथ्य: ${item.detailsHi}`
        },
        tags: ['ISRO', 'Space Tech', 'Chandrayaan', 'Aditya L1', 'Science & Tech']
      };
    }
  },

  // 6. Indian Polity - Constitutional Articles
  {
    subjectId: 'indian_polity',
    subtopic: 'Constitutional Amendments & Major Judgments',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'Polity_Amendments',
    generate: (seed) => {
      const amendments = [
        {
          amendmentEn: '73rd Constitutional Amendment Act, 1992',
          amendmentHi: '73वां संविधान संशोधन अधिनियम, 1992',
          featureEn: 'Added Part IX and 11th Schedule (29 functional items) granting constitutional status to Panchayati Raj Institutions.',
          featureHi: 'संविधान में भाग IX और 11वीं अनुसूची (29 विषय) जोड़कर पंचायती राज संस्थाओं को संवैधानिक दर्जा दिया।'
        },
        {
          amendmentEn: '86th Constitutional Amendment Act, 2002',
          amendmentHi: '86वां संविधान संशोधन अधिनियम, 2002',
          featureEn: 'Inserted Article 21A making free and compulsory elementary education a Fundamental Right for children aged 6 to 14 years.',
          featureHi: 'अनुच्छेद 21A जोड़कर 6 से 14 वर्ष के बच्चों के लिए मुफ्त और अनिवार्य प्रारंभिक शिक्षा को मौलिक अधिकार बनाया।'
        },
        {
          amendmentEn: '101st Constitutional Amendment Act, 2016',
          amendmentHi: '101वां संविधान संशोधन अधिनियम, 2016',
          featureEn: 'Introduced the Goods and Services Tax (GST) regime in India and created the GST Council under Article 279A.',
          featureHi: 'भारत में वस्तु एवं सेवा कर (GST) व्यवस्था लागू की तथा अनुच्छेद 279A के तहत जीएसटी परिषद का गठन किया।'
        },
        {
          amendmentEn: '106th Constitutional Amendment Act, 2023 (Nari Shakti Vandan Adhiniyam)',
          amendmentHi: '106वां संविधान संशोधन अधिनियम, 2023 (नारी शक्ति वंदन अधिनियम)',
          featureEn: 'Provides 33% reservation for women in Lok Sabha, Delhi Legislative Assembly, and State Legislative Assemblies for 15 years.',
          featureHi: 'लोकसभा, दिल्ली विधानसभा एवं राज्य विधानसभाओं में महिलाओं के लिए 33% आरक्षण का प्रावधान करता है।'
        }
      ];

      const item = amendments[seed % amendments.length];
      const others = amendments.filter(a => a.amendmentEn !== item.amendmentEn);

      return {
        question: {
          en: `Which Constitutional Amendment Act ${item.featureEn}?`,
          hi: `किस संविधान संशोधन अधिनियम द्वारा ${item.featureHi}?`
        },
        options: {
          en: [item.amendmentEn, others[0].amendmentEn, others[1].amendmentEn, others[2].amendmentEn],
          hi: [item.amendmentHi, others[0].amendmentHi, others[1].amendmentHi, others[2].amendmentHi]
        },
        correctOption: 0,
        explanation: {
          en: `${item.amendmentEn}: ${item.featureEn}`,
          hi: `${item.amendmentHi}: ${item.featureHi}`
        },
        tags: ['Polity', 'Amendments', 'Panchayat', 'Reservation', 'High Yield']
      };
    }
  },

  // 7. Reasoning & Mental Ability
  {
    subjectId: 'reasoning_mental',
    subtopic: 'Percentages, Ratio & Proportion, Averages',
    importance: 'HIGH_YIELD',
    importanceScore: 89,
    conceptKey: 'Math_Ratio_Averages',
    generate: (seed) => {
      const multiplier = (seed % 5) + 2;
      const baseA = 3 * multiplier;
      const baseB = 4 * multiplier;
      const sum = baseA + baseB;
      const ratioAns = '3 : 4';

      return {
        question: {
          en: `Two numbers are in the ratio of 3 : 4. If their sum is ${sum}, what is the larger number?`,
          hi: `दो संख्याएँ 3 : 4 के अनुपात में हैं। यदि उनका योग ${sum} है, तो बड़ी संख्या क्या होगी?`
        },
        options: {
          en: [`${baseB}`, `${baseA}`, `${baseA + 2}`, `${baseB + 4}`],
          hi: [`${baseB}`, `${baseA}`, `${baseA + 2}`, `${baseB + 4}`]
        },
        correctOption: 0,
        explanation: {
          en: `Let the numbers be 3x and 4x. 3x + 4x = 7x = ${sum} => x = ${multiplier}. The larger number is 4x = 4 * ${multiplier} = ${baseB}.`,
          hi: `माना संख्याएँ 3x और 4x हैं। 3x + 4x = 7x = ${sum} => x = ${multiplier}। अतः बड़ी संख्या = 4x = 4 * ${multiplier} = ${baseB} होगी।`
        },
        tags: ['Reasoning', 'Ratios', 'Aptitude']
      };
    }
  }
];

export function generateDynamicQuestion(subjectId?: SubjectId, seed: number = Date.now()): Question {
  const eligibleTemplates = subjectId 
    ? TEMPLATES.filter(t => t.subjectId === subjectId)
    : TEMPLATES;

  const template = eligibleTemplates.length > 0 
    ? eligibleTemplates[seed % eligibleTemplates.length]
    : TEMPLATES[seed % TEMPLATES.length];

  const generated = template.generate(seed);
  const qId = `dyn_${template.subjectId}_${seed}_${Math.floor(Math.random() * 1000)}`;

  // Randomize correct option position (0, 1, 2, 3)
  const targetIndex = (seed + 1) % 4;
  const enOptions = [...generated.options.en];
  const hiOptions = [...generated.options.hi];

  // Swap targetIndex with 0
  const tempEn = enOptions[0];
  const tempHi = hiOptions[0];
  enOptions[0] = enOptions[targetIndex];
  hiOptions[0] = hiOptions[targetIndex];
  enOptions[targetIndex] = tempEn;
  hiOptions[targetIndex] = tempHi;

  return {
    id: qId,
    subjectId: template.subjectId,
    subtopic: template.subtopic,
    importance: template.importance,
    importanceScore: template.importanceScore,
    conceptKey: template.conceptKey,
    question: generated.question,
    options: {
      en: enOptions,
      hi: hiOptions
    },
    correctOption: targetIndex,
    explanation: generated.explanation,
    tags: [...generated.tags, 'Generated High-Yield']
  };
}

export function generateQuestionSet(count: number, subjectId?: SubjectId): Question[] {
  const list: Question[] = [];
  for (let i = 0; i < count; i++) {
    list.push(generateDynamicQuestion(subjectId, Date.now() + i * 37));
  }
  return list;
}
