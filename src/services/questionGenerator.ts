import { Question, SubjectId, ImportanceLevel } from '../types';
import { isQuestionEligibleForPractice } from './srsEngine';
import { getLiveCurrentAffairsQuestion } from './currentAffairsService';

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

export const TEMPLATES: GenerationTemplate[] = [
  // ==========================================
  // 1. RAJASTHAN HISTORY, ART & CULTURE
  // ==========================================
  {
    subjectId: 'raj_history_art',
    subtopic: 'Forts, Palaces & Architecture (दुर्ग एवं स्थापत्य)',
    importance: 'HIGH_YIELD',
    importanceScore: 96,
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
          factEn: 'Built without foundations on a natural rock, famous for the heroic resistance of King Achaldas Khichi.',
          factHi: 'यह बिना किसी नींव के सीधे प्राकृतिक चट्टान पर खड़ा है तथा अचलदास खींची की वीरता के लिए प्रसिद्ध है।'
        },
        {
          nameEn: 'Kumbhalgarh Fort (Rajsamand)',
          nameHi: 'कुंभलगढ़ दुर्ग (राजसमंद)',
          typeEn: 'Hill Fort (Giri Durg) with Katargarh citadel (Eye of Mewar)',
          typeHi: 'गिरि दुर्ग एवं अंतःदुर्ग कटारगढ़ (मेवाड़ की आंख)',
          riversEn: 'Aravalli range near Kelwara',
          riversHi: 'अरावली की जरगा पहाड़ी श्रृंखला पर',
          factEn: 'Constructed by Maharana Kumbha through chief architect Mandan; features a 36 km long massive wall ("Great Wall of India").',
          factHi: 'महाराणा कुंभा द्वारा प्रमुख वास्तुकार मंडन की देखरेख में निर्मित, जिसकी 36 किमी लंबी दीवार भारत की महान दीवार कहलाती है।'
        },
        {
          nameEn: 'Mehrangarh Fort (Jodhpur)',
          nameHi: 'मेहरानगढ़ दुर्ग (जोधपुर)',
          typeEn: 'Peacock-shaped Hill Fort (Mayur-dhvaj-garh on Chidiyatunk hill)',
          typeHi: 'मयूरध्वजगढ़ / चिड़ियाटूँक पहाड़ी पर निर्मित गिरि दुर्ग',
          riversEn: 'Chidiyatunk hill overlooking Marwar',
          riversHi: 'चिड़ियाटूँक पहाड़ी पर स्थित',
          factEn: 'Founded by Rao Jodha in 1459 AD; Rudyard Kipling described it as "A work of giants and fairies".',
          factHi: 'राव जोधा द्वारा 1459 ई. में नींव रखी गई। रुडयार्ड किपलिंग ने इसे "परियों व फरिश्तों द्वारा निर्मित" बताया था।'
        },
        {
          nameEn: 'Taragarh Fort (Bundi)',
          nameHi: 'तारागढ़ दुर्ग (बूंदी)',
          typeEn: 'Star-shaped Fort with Garbh-Gunjam Cannon',
          typeHi: 'तारे के आकार का दुर्ग (गर्भ गुंजन तोप युक्त)',
          riversEn: 'Bundi Aravalli hills',
          riversHi: 'बूंदी की अरावली पहाड़ियों पर',
          factEn: 'Built by Rao Bar Singh in the 14th century, world-famous for its stepwells and Chitrashala mural paintings.',
          factHi: '14वीं शताब्दी में राव बरसिंह द्वारा निर्मित, जो अपनी चित्रशाला और विशाल बावड़ियों के लिए विश्वविख्यात है।'
        },
        {
          nameEn: 'Junagarh Fort (Bikaner)',
          nameHi: 'जूनागढ़ दुर्ग (बीकानेर)',
          typeEn: 'Dhanva/Ground Fort (Zameen ka Zevar)',
          typeHi: 'धान्व दुर्ग (जमीन का जेवर)',
          riversEn: 'Bikaner desert plains',
          riversHi: 'बीकानेर के मैदानी क्षेत्र में',
          factEn: 'Constructed by Maharaja Rai Singh between 1589 and 1594 AD with high artistic ramparts and Anup Mahal.',
          factHi: 'महाराजा रायसिंह द्वारा 1589-1594 ई. में निर्मित, जिसे "जमीन का जेवर" कहा जाता है।'
        }
      ];

      const chosen = forts[seed % forts.length];
      const wrongs = forts.filter(f => f.nameEn !== chosen.nameEn);

      return {
        question: {
          en: `Which of the following forts of Rajasthan is situated at/on ${chosen.riversEn} and classified as a ${chosen.typeEn}?`,
          hi: `राजस्थान का कौन सा दुर्ग ${chosen.riversHi} स्थित है तथा इसे ${chosen.typeHi} की श्रेणी में रखा जाता है?`
        },
        options: {
          en: [chosen.nameEn, wrongs[0].nameEn, wrongs[1].nameEn, wrongs[2].nameEn],
          hi: [chosen.nameHi, wrongs[0].nameHi, wrongs[1].nameHi, wrongs[2].nameHi]
        },
        correctOption: 0,
        explanation: {
          en: `${chosen.nameEn}: ${chosen.factEn} Location/Rivers: ${chosen.riversEn}.`,
          hi: `${chosen.nameHi}: ${chosen.factHi} यह ${chosen.riversHi} स्थित है।`
        },
        tags: ['Forts', 'Architecture', 'High Yield', 'RPSC Favorite']
      };
    }
  },
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
          rajpramukhEn: 'Maharaja Udaybhan Singh (Dholpur)',
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
          stageEn: 'Stage 4: Greater Rajasthan (बृहत् राजस्थान)',
          dateEn: '30 March 1949 (Rajasthan Day)',
          dateHi: '30 मार्च 1949 (राजस्थान दिवस)',
          pmEn: 'Pandit Hiralal Shastri',
          pmHi: 'पंडित हीरालाल शास्त्री',
          rajpramukhEn: 'Maharaja Sawai Man Singh II (Jaipur)',
          rajpramukhHi: 'सवाई मानसिंह द्वितीय (जयपुर)',
          statesEn: 'United Rajasthan + Jaipur, Jodhpur, Bikaner, Jaisalmer'
        }
      ];

      const item = stages[seed % stages.length];
      const others = stages.filter(s => s.stageEn !== item.stageEn);

      return {
        question: {
          en: `During the integration of Rajasthan, in which stage was ${item.pmEn} appointed as Prime Minister and ${item.rajpramukhEn} as Rajpramukh on ${item.dateEn}?`,
          hi: `राजस्थान के एकीकरण के किस चरण में ${item.dateHi} को ${item.pmHi} प्रधानमंत्री तथा ${item.rajpramukhHi} राजप्रमुख बने?`
        },
        options: {
          en: [item.stageEn, others[0].stageEn, others[1].stageEn, others[2].stageEn],
          hi: [item.stageEn, others[0].stageEn, others[1].stageEn, others[2].stageEn]
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
          durationEn: '1897 to 1941 (44 years - Longest non-violent movement in India)',
          durationHi: '1897 से 1941 (44 वर्ष - भारत का सबसे लंबा अहिंसक आंदोलन)',
          leadersEn: 'Sadhu Sitaram Das, Vijay Singh Pathik (Bhup Singh), Manikya Lal Verma',
          leadersHi: 'साधु सीताराम दास, विजय सिंह पथिक, माणिक्य लाल वर्मा',
          taxesEn: '84 types of taxes (Lagh-Bagh) including Chanwari tax (₹5 on daughter marriage) and Talwar Bandhai tax',
          taxesHi: '84 प्रकार की लाग-बाग (चौंरी कर व तलवार बंधाई कर)'
        },
        {
          nameEn: 'Begun Peasant Movement',
          nameHi: 'बेगूं किसान आंदोलन',
          durationEn: '1921 to 1923 in Chittorgarh region',
          durationHi: '1921 से 1923 (चित्तौड़गढ़ क्षेत्र)',
          leadersEn: 'Ramnarayan Chaudhary; Rupa Ji and Kripa Ji Dhakar (martyred at Govindpura firing)',
          leadersHi: 'रामनारायण चौधरी; रूपा जी व कृपा जी धाकड़ (गोविंदपुरा गोलीकांड में शहीद)',
          taxesEn: 'Trench Commission Inquiry & subsequent agreement labeled "Bolshevik decision"',
          taxesHi: 'ट्रेंच आयोग की जांच तथा बोलशेविक फैसला'
        },
        {
          nameEn: 'Neemuchana Peasant Movement (Alwar)',
          nameHi: 'नीमूचाणा हत्याकांड (अलवर)',
          durationEn: '14 May 1925',
          durationHi: '14 मई 1925',
          leadersEn: 'Led by Madho Singh & Govind Singh against wild boar crop damage & enhanced land revenue',
          leadersHi: 'सूअर समस्या एवं नई लगान दरों के विरोध में किसानों का आंदोलन',
          taxesEn: 'Condemned by Mahatma Gandhi in "Young India" as "Dyerism Double Distilled" (दोहरी डायरशाही)',
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
        tags: ['Peasant Movement', 'Bijolia', 'Neemuchana', 'High Yield']
      };
    }
  },

  // ==========================================
  // 2. GEOGRAPHY OF RAJASTHAN
  // ==========================================
  {
    subjectId: 'raj_geography',
    subtopic: 'Drainage Systems & Lakes (अपवाह तंत्र एवं झीलें)',
    importance: 'HIGH_YIELD',
    importanceScore: 96,
    conceptKey: 'River_Origins',
    generate: (seed) => {
      const rivers = [
        {
          nameEn: 'Luni River (लूणी नदी)',
          originEn: 'Nag Pahar (Ajmer) in Aravalli range',
          originHi: 'नाग पहाड़ (अजमेर)',
          natureEn: 'Sweet water up to Balotra (Barmer), then becomes saline',
          natureHi: 'बालोतरा तक मीठा पानी, इसके बाद खारी हो जाती है',
          mouthEn: 'Rann of Kutch (Gujarat)',
          mouthHi: 'कच्छ का रण (गुजरात)'
        },
        {
          nameEn: 'Banas River (बनास नदी - वन की आशा)',
          originEn: 'Khamnor Hills (Rajsamand)',
          originHi: 'खमनोर की पहाड़ियां (राजसमंद)',
          natureEn: 'Longest river flowing entirely within Rajasthan (~480 km)',
          natureHi: 'पूर्णतः राजस्थान में बहने वाली सबसे लंबी नदी (वन की आशा)',
          mouthEn: 'Confluence with Chambal at Rameshwaram Ghat (Sawai Madhopur)',
          mouthHi: 'रामेश्वरम घाट (सवाई माधोपुर) में चंबल में विलय'
        },
        {
          nameEn: 'Mahi River (माही नदी)',
          originEn: 'Amjhero/Mehad Lake in Dhar, Vindhyachal (MP)',
          originHi: 'मेहद झील, अमझोरा (धार, म.प्र.)',
          natureEn: 'Crosses Tropic of Cancer twice; forms Triveni Sangam at Beneshwar (Banswara-Dungarpur)',
          natureHi: 'कर्क रेखा को दो बार पार करने वाली नदी; बेणेश्वर में त्रिवेणी संगम',
          mouthEn: 'Gulf of Khambhat (Arabian Sea)',
          mouthHi: 'खंभात की खाड़ी'
        },
        {
          nameEn: 'Chambal River (चंबल / चर्मण्यवती)',
          originEn: 'Janapav Hills in Vindhya range near Mhow (MP)',
          originHi: 'जानापाव की पहाड़ियां (महू, म.प्र.)',
          natureEn: 'Perennial river renowned for badland topography (Ravines/Behad)',
          natureHi: 'राजस्थान की बारहमासी नदी जो बीहड़ (उत्खात भूमि) हेतु कुख्यात है',
          mouthEn: 'Yamuna river near Etawah (UP)',
          mouthHi: 'यमुना नदी (इटावा, उ.प्र.)'
        }
      ];

      const item = rivers[seed % rivers.length];
      const others = rivers.filter(r => r.nameEn !== item.nameEn);

      return {
        question: {
          en: `Which river originating from ${item.originEn} is known for "${item.natureEn}" and drains into ${item.mouthEn}?`,
          hi: `${item.originHi} से उद्गमित होने वाली कौन सी नदी "${item.natureHi}" के रूप में जानी जाती है तथा ${item.mouthHi} में विलीन होती है?`
        },
        options: {
          en: [item.nameEn, others[0].nameEn, others[1].nameEn, others[2].nameEn],
          hi: [item.nameEn, others[0].nameEn, others[1].nameEn, others[2].nameEn]
        },
        correctOption: 0,
        explanation: {
          en: `${item.nameEn}: Origin: ${item.originEn}. Characteristics: ${item.natureEn}. Drainage destination: ${item.mouthEn}.`,
          hi: `${item.nameEn}: उद्गम ${item.originHi}। विशेषताएं: ${item.natureHi}। विसर्जन: ${item.mouthHi}।`
        },
        tags: ['Rivers', 'Drainage', 'Rajasthan Geography']
      };
    }
  },
  {
    subjectId: 'raj_geography',
    subtopic: 'Minerals & Natural Resources (खनिज संसाधन)',
    importance: 'HIGH_YIELD',
    importanceScore: 97,
    conceptKey: 'Mineral_Mines_Pair',
    generate: (seed) => {
      const minerals = [
        {
          mineralEn: 'Lead & Zinc (सीसा-जस्ता)',
          minesEn: 'Rampura-Agucha (Bhilwara), Zawar (Udaipur), Rajpura-Dariba (Rajsamand)',
          minesHi: 'रामपुरा-आगूचा (भीलवाड़ा), जावर (उदयपुर), राजपुरा-दरीबा (राजसमंद)',
          factEn: 'Rajasthan holds virtually 100% of India\'s lead-zinc resources; Hindustan Zinc Limited smelters located at Chanderiya and Debari.',
          factHi: 'भारत के लगभग 100% सीसा-जस्ता संसाधन राजस्थान में हैं; चंदेरिया व देबारी में प्रद्रावक स्थित हैं।'
        },
        {
          mineralEn: 'Rock Phosphate (रॉक फॉस्फेट)',
          minesEn: 'Jhamarkotra (Udaipur), Birmania (Jaisalmer)',
          minesHi: 'झामरकोटड़ा (उदयपुर), बिरमानिया (जैसलमेर)',
          factEn: 'Essential for chemical fertilizers; Jhamarkotra is India\'s largest open-cast deposit operated by RSMML.',
          factHi: 'रासायनिक उर्वरक उद्योग हेतु अनिवार्य; झामरकोटड़ा देश की सबसे बड़ी ओपन कास्ट खान है।'
        },
        {
          mineralEn: 'Gypsum (जिप्सम / हरसोंठ)',
          minesEn: 'Jamsar (Bikaner), Badwasi (Nagaur), Mohangarh (Jaisalmer)',
          minesHi: 'जामसर (बीकानेर), बड़वासी (नागौर), मोहनगढ़ (जैसलमेर)',
          factEn: 'Used for soil reclamation of alkaline soils and manufacturing of cement/plaster of paris.',
          factHi: 'क्षारीय भूमि सुधार व सीमेंट/पीओपी निर्माण में प्रयुक्त; जामसर सबसे बड़ा भंडार है।'
        },
        {
          mineralEn: 'Copper (तांबा)',
          minesEn: 'Khetri-Singhana (Jhunjhunu), Kho-Dariba (Alwar), Chandmari',
          minesHi: 'खेतड़ी-सिंघाना (झुंझुनूं), खो-दरीबा (अलवर), चांदमारी',
          factEn: 'Hindustan Copper Limited (HCL) complex at Khetri operates along the Aravalli copper belt.',
          factHi: 'हिंदुस्तान कॉपर लिमिटेड (HCL) का संयंत्र खेतड़ी में अरावली कॉपर बेल्ट पर स्थित है।'
        }
      ];

      const item = minerals[seed % minerals.length];
      const wrongs = minerals.filter(m => m.mineralEn !== item.mineralEn);

      return {
        question: {
          en: `In Rajasthan, which mineral deposit is predominantly mined from ${item.minesEn}?`,
          hi: `राजस्थान में ${item.minesHi} क्षेत्र से मुख्य रूप से किस खनिज का उत्खनन किया जाता है?`
        },
        options: {
          en: [item.mineralEn, wrongs[0].mineralEn, wrongs[1].mineralEn, wrongs[2].mineralEn],
          hi: [item.mineralEn, wrongs[0].mineralEn, wrongs[1].mineralEn, wrongs[2].mineralEn]
        },
        correctOption: 0,
        explanation: {
          en: `${item.mineralEn}: Major mining locations: ${item.minesEn}. ${item.factEn}`,
          hi: `${item.mineralEn}: प्रमुख खनन क्षेत्र - ${item.minesHi}। ${item.factHi}`
        },
        tags: ['Minerals', 'Mining', 'Rajasthan Geography', 'High Yield']
      };
    }
  },

  // ==========================================
  // 3. RAJASTHAN POLITY & ADMINISTRATIVE SYSTEM
  // ==========================================
  {
    subjectId: 'raj_polity_admin',
    subtopic: 'State Executive & Constitutional Bodies',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'State_Polity_Articles',
    generate: (seed) => {
      const articles = [
        {
          officeEn: 'Governor of Rajasthan (राज्यपाल)',
          articleEn: 'Articles 153 to 161 (Appointment by President under Art. 155; Ordinance power under Art. 213)',
          articleHi: 'अनुच्छेद 153 से 161 (अनु. 155 राष्ट्रपति द्वारा नियुक्ति, अनु. 213 अध्यादेश शक्ति)',
          dutyEn: 'Constitutional executive head of state acting on aid and advice of the Council of Ministers under Article 163',
          dutyHi: 'राज्य का संवैधानिक प्रमुख जो अनु. 163 के तहत मंत्रिपरिषद की सलाह पर कार्य करता है'
        },
        {
          officeEn: 'Chief Minister & Council of Ministers',
          articleEn: 'Article 164 (CM appointed by Governor; collective responsibility to Legislative Assembly under Art. 164(2))',
          articleHi: 'अनुच्छेद 164 (राज्यपाल द्वारा मुख्यमंत्री की नियुक्ति; विधानसभा के प्रति सामूहिक उत्तरदायित्व)',
          dutyEn: 'Article 167 defines the duties of the Chief Minister in furnishing information to the Governor',
          dutyHi: 'अनुच्छेद 167 के अंतर्गत राज्यपाल को प्रशासनिक सूचनाएं देना मुख्यमंत्री का कर्तव्य है'
        },
        {
          officeEn: 'Rajasthan Public Service Commission (RPSC)',
          articleEn: 'Articles 315 to 323 (Established on 20 August 1949; Chairman + 7 Members)',
          articleHi: 'अनुच्छेद 315 से 323 (स्थापना 20 अगस्त 1949; अध्यक्ष + 7 सदस्य)',
          dutyEn: 'Tenure is 6 years or 62 years of age; removal exclusively by President under Article 317 on Supreme Court inquiry',
          dutyHi: 'पदावधि 6 वर्ष या 62 वर्ष की आयु; केवल राष्ट्रपति द्वारा उच्चतम न्यायालय की जांच उपरांत अनु. 317 के तहत पदच्युति'
        },
        {
          officeEn: 'Rajasthan State Election Commission (SEC)',
          articleEn: 'Articles 243K and 243ZA (Single-member Constitutional Commission established in July 1994)',
          articleHi: 'अनुच्छेद 243K एवं 243ZA (एकल सदस्यीय संवैधानिक आयोग, जुलाई 1994 में गठित)',
          dutyEn: 'Superintends, directs and conducts elections to Panchayati Raj Institutions and Urban Local Bodies in Rajasthan',
          dutyHi: 'पंचायती राज संस्थाओं एवं नगरीय निकायों के चुनावों का अधीक्षण, निर्देशन व संचालन'
        }
      ];

      const item = articles[seed % articles.length];
      const others = articles.filter(a => a.officeEn !== item.officeEn);

      return {
        question: {
          en: `Which constitutional office/body in Rajasthan is governed by "${item.articleEn}" and characterized by "${item.dutyEn}"?`,
          hi: `राजस्थान की कौन सी संवैधानिक संस्था/पद "${item.articleHi}" से संबंधित है तथा "${item.dutyHi}" इसकी प्रमुख विशेषता है?`
        },
        options: {
          en: [item.officeEn, others[0].officeEn, others[1].officeEn, 'Rajasthan Lokayukta Secretariat'],
          hi: [item.officeEn, others[0].officeEn, others[1].officeEn, 'राजस्थान लोकायुक्त सचिवालय']
        },
        correctOption: 0,
        explanation: {
          en: `${item.officeEn}: Constitutional Framework: ${item.articleEn}. Key roles: ${item.dutyEn}.`,
          hi: `${item.officeEn}: संवैधानिक उपबंध: ${item.articleHi}। मुख्य प्रावधान: ${item.dutyHi}।`
        },
        tags: ['Polity', 'Constitutional Bodies', 'RPSC Favorite']
      };
    }
  },

  // ==========================================
  // 4. RAJASTHAN ECONOMY
  // ==========================================
  {
    subjectId: 'raj_economy',
    subtopic: 'Rajasthan Economic Survey & Infrastructure',
    importance: 'HIGH_YIELD',
    importanceScore: 97,
    conceptKey: 'Raj_Econ_Indicators',
    generate: (seed) => {
      const indicators = [
        {
          nameEn: 'Sectoral Composition of GSDP (at constant 2011-12 prices)',
          factEn: 'Services (~43-44%), Agriculture & Allied (~27-28%), Industry (~27-28%)',
          factHi: 'सेवा क्षेत्र (~43-44%), कृषि एवं संबद्ध क्षेत्र (~27-28%), उद्योग क्षेत्र (~27-28%)',
          detailEn: 'Services sector constitutes the largest contribution to the Gross State Domestic Product of Rajasthan.',
          detailHi: 'राजस्थान के सकल राज्य घरेलू उत्पाद (GSDP) में सेवा क्षेत्र का योगदान सर्वाधिक है।'
        },
        {
          nameEn: 'Rajasthan Solar Energy Policy 2023',
          factEn: 'Target to establish 90 GW (90,000 MW) of solar power capacity by 2030',
          factHi: 'वर्ष 2030 तक 90 गीगावाट (90,000 मेगावाट) सौर ऊर्जा क्षमता स्थापना का लक्ष्य',
          detailEn: 'Rajasthan currently ranks 1st in India in installed solar capacity with over 20,000 MW operational.',
          detailHi: 'राजस्थान वर्तमान में 20,000 मेगावाट से अधिक स्थापित क्षमता के साथ देश में प्रथम स्थान पर है।'
        },
        {
          nameEn: 'Delhi-Mumbai Industrial Corridor (DMIC) in Rajasthan',
          factEn: '~38% of DMIC total alignment length (578 km) passes through Rajasthan',
          factHi: 'DMIC के डेडिकेटेड फ्रेट कॉरिडोर का लगभग 38% हिस्सा (578 किमी) राजस्थान से गुजरता है',
          detailEn: 'Major investment nodes include Khushkhera-Bhiwadi-Neemrana (Alwar) and Jodhpur-Pali-Marwar industrial node.',
          detailHi: 'प्रमुख निवेश क्षेत्र: खुशखेड़ा-भिवाड़ी-नीमराना (अलवर) तथा जोधपुर-पाली-मारवाड़ नोड।'
        }
      ];

      const item = indicators[seed % indicators.length];
      const others = indicators.filter(i => i.nameEn !== item.nameEn);

      return {
        question: {
          en: `According to the official Economic Survey of Rajasthan, which indicator/policy corresponds to: "${item.factEn}"?`,
          hi: `राजस्थान की आधिकारिक आर्थिक समीक्षा के अनुसार कौन सा सूचक/नीति "${item.factHi}" से संबंधित है?`
        },
        options: {
          en: [item.nameEn, others[0].nameEn, others[1].nameEn, 'Rajasthan Wind & Hybrid Energy Policy 2019'],
          hi: [item.nameEn, others[0].nameEn, others[1].nameEn, 'राजस्थान पवन एवं हाइब्रिड ऊर्जा नीति 2019']
        },
        correctOption: 0,
        explanation: {
          en: `${item.nameEn}: ${item.detailEn} Key data: ${item.factEn}.`,
          hi: `${item.nameEn}: ${item.detailHi} मुख्य आंकड़े: ${item.factHi}।`
        },
        tags: ['Economic Survey', 'Rajasthan Economy', 'High Yield']
      };
    }
  },

  // ==========================================
  // 5. INDIAN HISTORY
  // ==========================================
  {
    subjectId: 'indian_history',
    subtopic: 'Indian National Movement & Freedom Struggle',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'INC_Sessions_PurnaSwaraj',
    generate: (seed) => {
      const incSessions = [
        {
          sessionEn: '1929 Lahore Session (लाहौर अधिवेशन)',
          presidentEn: 'Pt. Jawaharlal Nehru',
          presidentHi: 'पं. जवाहरलाल नेहरू',
          resolutionEn: 'Adoption of "Purna Swaraj" (Complete Independence) resolution; Tri-color hoisted on Ravi river on 31 Dec 1929; 26 Jan 1930 declared Independence Day',
          resolutionHi: '"पूर्ण स्वराज" का ऐतिहासिक प्रस्ताव पारित; रावी तट पर तिरंगा फहराया गया; 26 जनवरी 1930 को प्रथम स्वतंत्रता दिवस घोषित'
        },
        {
          sessionEn: '1907 Surat Session (सूरत अधिवेशन)',
          presidentEn: 'Rash Behari Ghosh',
          presidentHi: 'रास बिहारी घोष',
          resolutionEn: 'Surat Split between Moderates (Gokhale, Mehta) and Extremists (Tilak, Lal-Bal-Pal)',
          resolutionHi: 'कांग्रेस का प्रथम ऐतिहासिक विभाजन (नरम दल और गरम दल में फूट)'
        },
        {
          sessionEn: '1916 Lucknow Session (लखनऊ अधिवेशन)',
          presidentEn: 'Ambica Charan Mazumdar',
          presidentHi: 'अंबिका चरण मजूमदार',
          resolutionEn: 'Reunion of Moderates and Extremists; historic Lucknow Pact signed between Congress and Muslim League',
          resolutionHi: 'नरम दल व गरम दल का पुनर्मिलन तथा कांग्रेस व मुस्लिम लीग के बीच प्रसिद्ध लखनऊ समझौता'
        },
        {
          sessionEn: '1924 Belgaum Session (बेलगाम अधिवेशन)',
          presidentEn: 'Mahatma Gandhi',
          presidentHi: 'महात्मा गांधी',
          resolutionEn: 'The only Indian National Congress session presided over by Mahatma Gandhi',
          resolutionHi: 'महात्मा गांधी की अध्यक्षता में आयोजित होने वाला भारतीय राष्ट्रीय कांग्रेस का एकमात्र अधिवेशन'
        }
      ];

      const item = incSessions[seed % incSessions.length];
      const others = incSessions.filter(s => s.sessionEn !== item.sessionEn);

      return {
        question: {
          en: `In which historic session of the Indian National Congress, presided over by ${item.presidentEn}, was the resolution for "${item.resolutionEn}" passed?`,
          hi: `${item.presidentHi} की अध्यक्षता में आयोजित भारतीय राष्ट्रीय कांग्रेस के किस अधिवेशन में "${item.resolutionHi}" पारित किया गया था?`
        },
        options: {
          en: [item.sessionEn, others[0].sessionEn, others[1].sessionEn, others[2].sessionEn],
          hi: [item.sessionEn, others[0].sessionEn, others[1].sessionEn, others[2].sessionEn]
        },
        correctOption: 0,
        explanation: {
          en: `${item.sessionEn}: President was ${item.presidentEn}. Key outcome: ${item.resolutionEn}.`,
          hi: `${item.sessionEn}: अध्यक्ष ${item.presidentHi} थे। मुख्य परिणाम: ${item.resolutionHi}।`
        },
        tags: ['Freedom Movement', 'INC Sessions', 'Modern India', 'High Yield']
      };
    }
  },

  // ==========================================
  // 6. INDIAN POLITY & CONSTITUTION
  // ==========================================
  {
    subjectId: 'indian_polity',
    subtopic: 'Fundamental Rights & Constitutional Remedies',
    importance: 'HIGH_YIELD',
    importanceScore: 99,
    conceptKey: 'Writs_Article32',
    generate: (seed) => {
      const writs = [
        {
          writEn: 'Habeas Corpus (बंदी प्रत्यक्षीकरण)',
          meaningEn: '"To have the body of"; safeguards individual liberty against unlawful detention by state or private individuals',
          meaningHi: '"शरीर को प्रस्तुत किया जाए"; अवैध नजरबंदी के विरुद्ध व्यक्तिगत स्वतंत्रता की रक्षा'
        },
        {
          writEn: 'Mandamus (परमादेश)',
          meaningEn: '"We Command"; issued to a public official/body directing them to perform a mandatory statutory public duty',
          meaningHi: '"हम आदेश देते हैं"; किसी सार्वजनिक प्राधिकारी को उसके वैधानिक कर्तव्य पालन हेतु जारी'
        },
        {
          writEn: 'Quo-Warranto (अधिकार-पृच्छा)',
          meaningEn: '"By what authority"; inquires into the legality of a person\'s claim to a public office to prevent usurpation',
          meaningHi: '"किस अधिकार से"; किसी व्यक्ति द्वारा गैर-कानूनी तरीके से सार्वजनिक पद धारण करने की जांच'
        },
        {
          writEn: 'Certiorari (उत्प्रेषण)',
          meaningEn: '"To be certified / informed"; quashes the order of a lower court/tribunal issued in excess of jurisdiction or violating natural justice',
          meaningHi: '"पूर्णतः सूचित किया जाए"; अधीनस्थ न्यायालय/अधिकरण के अधिकार क्षेत्र से बाहर दिए गए आदेश को निरस्त करना'
        }
      ];

      const item = writs[seed % writs.length];
      const others = writs.filter(w => w.writEn !== item.writEn);

      return {
        question: {
          en: `Under Article 32 (Supreme Court) and Article 226 (High Courts), which prerogative writ literally translates to "${item.meaningEn}"?`,
          hi: `अनुच्छेद 32 (उच्चतम न्यायालय) एवं अनुच्छेद 226 (उच्च न्यायालय) के अंतर्गत किस रिट (प्रलेख) का शाब्दिक अर्थ "${item.meaningHi}" होता है?`
        },
        options: {
          en: [item.writEn, others[0].writEn, others[1].writEn, others[2].writEn],
          hi: [item.writEn, others[0].writEn, others[1].writEn, others[2].writEn]
        },
        correctOption: 0,
        explanation: {
          en: `Writ of ${item.writEn}: Meaning & Scope: ${item.meaningEn}. Dr. B.R. Ambedkar termed Article 32 the "Heart and Soul of the Constitution".`,
          hi: `${item.writEn}: इसका अर्थ एवं कार्यक्षेत्र - ${item.meaningHi}। डॉ. बी.आर. अंबेडकर ने अनु. 32 को "संविधान का हृदय व आत्मा" कहा था।`
        },
        tags: ['Fundamental Rights', 'Article 32', 'Writs', 'Indian Polity']
      };
    }
  },

  // ==========================================
  // 7. INDIAN & WORLD GEOGRAPHY
  // ==========================================
  {
    subjectId: 'indian_world_geo',
    subtopic: 'Himalayan Passes & Physical Features of India',
    importance: 'HIGH_YIELD',
    importanceScore: 95,
    conceptKey: 'Mountain_Passes_India',
    generate: (seed) => {
      const passes = [
        {
          passEn: 'Zoji La Pass (जोजी ला दर्रा)',
          locationEn: 'Greater Himalayas in Ladakh',
          locationHi: 'लद्दाख (बृहत् हिमालय)',
          connectsEn: 'Srinagar with Kargil and Leh; Zoji La tunnel provides all-weather connectivity',
          connectsHi: 'श्रीनगर को कारगिल व लेह से जोड़ता है'
        },
        {
          passEn: 'Shipki La Pass (शिपकी ला दर्रा)',
          locationEn: 'Himachal Pradesh (Kinnaur district)',
          locationHi: 'हिमाचल प्रदेश (किन्नौर जिला)',
          connectsEn: 'Entry point of Satluj River into India from Tibet; ancient Indo-Tibetan trade route',
          connectsHi: 'सतलुज नदी का तिब्बत से भारत में प्रवेश बिंदु; भारत-तिब्बत व्यापार मार्ग'
        },
        {
          passEn: 'Nathu La Pass (नाथू ला दर्रा)',
          locationEn: 'East Sikkim district',
          locationHi: 'सिक्किम (डोंगक्या श्रेणी)',
          connectsEn: 'India with Tibet (Chumbi Valley); vital branch of the historic Silk Route',
          connectsHi: 'सिक्किम को तिब्बत (चुंबी घाटी) से जोड़ता है; सिल्क रूट का हिस्सा'
        },
        {
          passEn: 'Bum La / Bomdi La Pass (बोमडी ला)',
          locationEn: 'Arunachal Pradesh',
          locationHi: 'अरुणाचल प्रदेश',
          connectsEn: 'Arunachal Pradesh with Lhasa (Tibet); strategic military pass',
          connectsHi: 'अरुणाचल प्रदेश को ल्हासा (तिब्बत) से जोड़ता है'
        }
      ];

      const item = passes[seed % passes.length];
      const others = passes.filter(p => p.passEn !== item.passEn);

      return {
        question: {
          en: `Which strategic Himalayan mountain pass located in ${item.locationEn} is famous for "${item.connectsEn}"?`,
          hi: `${item.locationHi} में स्थित कौन सा महत्वपूर्ण हिमालयी दर्रा "${item.connectsHi}" हेतु प्रसिद्ध है?`
        },
        options: {
          en: [item.passEn, others[0].passEn, others[1].passEn, others[2].passEn],
          hi: [item.passEn, others[0].passEn, others[1].passEn, others[2].passEn]
        },
        correctOption: 0,
        explanation: {
          en: `${item.passEn}: Located in ${item.locationEn}. Strategic connectivity: ${item.connectsEn}.`,
          hi: `${item.passEn}: यह ${item.locationHi} में स्थित है तथा ${item.connectsHi}।`
        },
        tags: ['Himalayan Passes', 'Indian Geography', 'Physical Geography']
      };
    }
  },

  // ==========================================
  // 8. INDIAN ECONOMY
  // ==========================================
  {
    subjectId: 'indian_economy',
    subtopic: 'Monetary Policy & Banking in India',
    importance: 'HIGH_YIELD',
    importanceScore: 96,
    conceptKey: 'RBI_Monetary_Instruments',
    generate: (seed) => {
      const instruments = [
        {
          toolEn: 'Repo Rate (रेपो दर)',
          definitionEn: 'The policy interest rate at which the Reserve Bank of India lends short-term funds to commercial banks against government securities',
          definitionHi: 'वह नीतिगत ब्याज दर जिस पर भारतीय रिज़र्व बैंक वाणिज्यिक बैंकों को सरकारी प्रतिभूतियों के बदले अल्पकालिक ऋण प्रदान करता है'
        },
        {
          toolEn: 'Cash Reserve Ratio - CRR (नकद आरक्षित अनुपात)',
          definitionEn: 'The specified minimum percentage of a commercial bank\'s Net Demand and Time Liabilities (NDTL) that it must mandatorily hold as cash with the RBI',
          definitionHi: 'वाणिज्यिक बैंक की कुल जमा (NDTL) का वह अनिवार्य न्यूनतम प्रतिशत जो उसे RBI के पास नकद रूप में रखना होता है'
        },
        {
          toolEn: 'Statutory Liquidity Ratio - SLR (वैधानिक तरलता अनुपात)',
          definitionEn: 'The percentage of NDTL that commercial banks must maintain in liquid assets (gold, unencumbered approved government securities) with themselves',
          definitionHi: 'बैंकों द्वारा अपनी कुल जमा का वह अंश जो उन्हें स्वर्ण या अनुमोदित सरकारी प्रतिभूतियों के रूप में स्वयं के पास रखना अनिवार्य है'
        },
        {
          toolEn: 'Standing Deposit Facility - SDF (स्थायी जमा सुविधा)',
          definitionEn: 'An uncollateralized liquidity absorption mechanism allowing RBI to absorb surplus funds from commercial banks without providing government securities',
          definitionHi: 'RBI द्वारा बिना किसी सरकारी प्रतिभूति को बंधक रखे बैंकों से अतिरिक्त तरलता सोखने का गैर-संपार्श्विक साधन'
        }
      ];

      const item = instruments[seed % instruments.length];
      const others = instruments.filter(i => i.toolEn !== item.toolEn);

      return {
        question: {
          en: `In the monetary policy framework of India, which instrument is defined as "${item.definitionEn}"?`,
          hi: `भारत के मौद्रिक नीति ढांचे में किस उपकरण को "${item.definitionHi}" के रूप में परिभाषित किया गया है?`
        },
        options: {
          en: [item.toolEn, others[0].toolEn, others[1].toolEn, others[2].toolEn],
          hi: [item.toolEn, others[0].toolEn, others[1].toolEn, others[2].toolEn]
        },
        correctOption: 0,
        explanation: {
          en: `${item.toolEn}: ${item.definitionEn}. Set by the 6-member Monetary Policy Committee (MPC) chaired by the RBI Governor.`,
          hi: `${item.toolEn}: ${item.definitionHi}। इसका निर्धारण RBI गवर्नर की अध्यक्षता वाली 6-सदस्यीय मौद्रिक नीति समिति (MPC) करती है।`
        },
        tags: ['RBI', 'Monetary Policy', 'Indian Economy', 'High Yield']
      };
    }
  },

  // ==========================================
  // 9. SCIENCE & TECHNOLOGY
  // ==========================================
  {
    subjectId: 'science_tech',
    subtopic: 'Space Exploration & Defense Technology',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'ISRO_Launch_Vehicles',
    generate: (seed) => {
      const missions = [
        {
          nameEn: 'LVM3 (Launch Vehicle Mark-3 / Bahubali)',
          roleEn: 'Three-stage heavy lift launch vehicle with two solid strap-on motors (S200), a liquid core stage (L110), and a high-thrust cryogenic upper stage (C25); successfully launched Chandrayaan-3 into Lunar Transfer Orbit',
          roleHi: 'इसरो का सबसे शक्तिशाली प्रक्षेपण यान जिसने चंद्रयान-3 और वनवेब उपग्रहों को सफलतापूर्वक कक्षा में स्थापित किया'
        },
        {
          nameEn: 'PSLV (Polar Satellite Launch Vehicle - Workhorse of ISRO)',
          roleEn: 'Four-stage launch vehicle with alternating solid and liquid propulsion stages; created world record by launching 104 satellites in a single flight (PSLV-C37)',
          roleHi: 'इसरो का कार्य-अश्व (Workhorse) जिसमें ठोस व द्रव प्रणोदक चरण होते हैं; एक ही उड़ान में 104 उपग्रह प्रक्षेपित करने का रिकॉर्ड'
        },
        {
          nameEn: 'BrahMos Supersonic Cruise Missile',
          roleEn: 'Joint venture between India (DRDO) and Russia (NPO Mashinostroyeniya); operates on "Fire and Forget" principle reaching speeds of Mach 2.8 to 3.0',
          roleHi: 'भारत व रूस का संयुक्त उद्यम; मैक 2.8 से 3.0 की गति से दागो और भूल जाओ (Fire and Forget) सिद्धांत पर आधारित सुपरसोनिक क्रूज मिसाइल'
        },
        {
          nameEn: 'Aditya-L1 Solar Mission',
          roleEn: 'India\'s first dedicated space observatory to study the Sun, placed in a halo orbit around Sun-Earth Lagrange Point 1 (L1) ~1.5 million km from Earth',
          roleHi: 'सूर्य का अध्ययन करने वाली भारत की प्रथम अंतरिक्ष वेधशाला, जिसे पृथ्वी से 15 लाख किमी दूर L1 हेलो कक्षा में स्थापित किया गया'
        }
      ];

      const item = missions[seed % missions.length];
      const others = missions.filter(m => m.nameEn !== item.nameEn);

      return {
        question: {
          en: `Which space or defense technology of India corresponds to the following description: "${item.roleEn}"?`,
          hi: `भारत की कौन सी अंतरिक्ष अथवा रक्षा तकनीक "${item.roleHi}" से संबंधित है?`
        },
        options: {
          en: [item.nameEn, others[0].nameEn, others[1].nameEn, others[2].nameEn],
          hi: [item.nameEn, others[0].nameEn, others[1].nameEn, others[2].nameEn]
        },
        correctOption: 0,
        explanation: {
          en: `${item.nameEn}: ${item.roleEn}.`,
          hi: `${item.nameEn}: ${item.roleHi}।`
        },
        tags: ['ISRO', 'DRDO', 'Science & Tech', 'High Yield']
      };
    }
  },

  // ==========================================
  // 10. REASONING & MENTAL ABILITY
  // ==========================================
  {
    subjectId: 'reasoning_mental',
    subtopic: 'Number Series & Analytical Reasoning',
    importance: 'HIGH_YIELD',
    importanceScore: 94,
    conceptKey: 'Reasoning_Dynamic_Math',
    generate: (seed) => {
      // Dynamic pattern generator: n^2 + k or n^3 - 1
      const offset = (seed % 7) + 2;
      const multipliers = [2, 3, 4, 5];
      const mult = multipliers[seed % multipliers.length];

      // Series: a, a*m + offset, ...
      const a1 = (seed % 5) + 3;
      const a2 = a1 * 2 + offset;
      const a3 = a2 * 2 + offset;
      const a4 = a3 * 2 + offset;
      const correctNext = a4 * 2 + offset;

      const wrong1 = correctNext + offset;
      const wrong2 = correctNext - 2 * offset;
      const wrong3 = a4 * 2;

      return {
        question: {
          en: `Find the missing next number in the given series: ${a1}, ${a2}, ${a3}, ${a4}, ?`,
          hi: `दी गई संख्या श्रृंखला में अगला लुप्त पद ज्ञात कीजिए: ${a1}, ${a2}, ${a3}, ${a4}, ?`
        },
        options: {
          en: [String(correctNext), String(wrong1), String(wrong2), String(wrong3)],
          hi: [String(correctNext), String(wrong1), String(wrong2), String(wrong3)]
        },
        correctOption: 0,
        explanation: {
          en: `Pattern logic: Each consecutive term is obtained by (Previous Term × 2) + ${offset}. Thus: ${a4} × 2 + ${offset} = ${correctNext}.`,
          hi: `पैटर्न का नियम: प्रत्येक अगला पद (पिछला पद × 2) + ${offset} है। अतः: ${a4} × 2 + ${offset} = ${correctNext}।`
        },
        tags: ['Number Series', 'Logical Reasoning', 'Math']
      };
    }
  },

  // ==========================================
  // 11. CURRENT AFFAIRS
  // ==========================================
  {
    subjectId: 'current_affairs',
    subtopic: 'Rajasthan & National Current Affairs',
    importance: 'HIGH_YIELD',
    importanceScore: 99,
    conceptKey: 'Dynamic_Current_Affairs_Generator',
    generate: (seed) => {
      const q = getLiveCurrentAffairsQuestion(seed);
      return {
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
        explanation: q.explanation,
        tags: q.tags
      };
    }
  }
];

export function generateDynamicQuestion(subjectId?: SubjectId, seed: number = Date.now()): Question {
  // If subject is current affairs, route to live current affairs engine
  if (subjectId === 'current_affairs') {
    return getLiveCurrentAffairsQuestion(seed);
  }

  const eligibleTemplates = subjectId 
    ? TEMPLATES.filter(t => t.subjectId === subjectId)
    : TEMPLATES;

  const template = eligibleTemplates.length > 0 
    ? eligibleTemplates[seed % eligibleTemplates.length]
    : TEMPLATES[seed % TEMPLATES.length];

  const generated = template.generate(seed);
  const qId = `dyn_${template.subjectId}_${seed % 999999}_${Math.floor(Math.random() * 10000)}`;

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
    list.push(generateDynamicQuestion(subjectId, Date.now() + i * 47));
  }
  return list;
}
