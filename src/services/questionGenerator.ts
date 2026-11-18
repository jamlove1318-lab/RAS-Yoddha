import { Question, SubjectId, ImportanceLevel } from '../types';
import { isQuestionEligibleForPractice } from './srsEngine';

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
          drainageEn: 'Longest river completely flowing within Rajasthan (480 km)',
          drainageHi: 'पूर्णतः राजस्थान में बहने वाली सबसे लंबी नदी (480 किमी)'
        },
        {
          nameEn: 'Mahi River (कांठल की गंगा / आदिवासियों की गंगा)',
          nameHi: 'माही नदी (कांठल की गंगा)',
          originEn: 'Amjhera near Dhar, Mehadd Lake (MP)',
          originHi: 'मेहद झील (धार, मध्य प्रदेश)',
          damsEn: 'Mahi Bajaj Sagar Dam (Banswara) and Kadana Dam (Gujarat)',
          damsHi: 'माही बजाज सागर (बांसवाड़ा) तथा कडाणा बांध (गुजरात)',
          drainageEn: 'Cuts Tropic of Cancer twice; drains into Gulf of Khambhat (Arabian Sea)',
          drainageHi: 'कर्क रेखा को दो बार पार करने वाली नदी (खंभात की खाड़ी)'
        },
        {
          nameEn: 'Som River (सोम नदी)',
          nameHi: 'सोम नदी',
          originEn: 'Bichhameda Hills, Udaipur',
          originHi: 'बीछामेड़ा पहाड़ियां (उदयपुर)',
          damsEn: 'Som-Kagdar (Udaipur) and Som-Kamla-Amba (Dungarpur)',
          damsHi: 'सोम-कागदर (उदयपुर) एवं सोम-कमला-अम्बा (डूंगरपुर)',
          drainageEn: 'Forms Triveni Sangam with Mahi and Jakham at Beneshwar Dham',
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
          en: `${r.nameEn}: Origin: ${r.originEn}. Dams: ${r.damsEn}. Note: ${r.drainageEn}.`,
          hi: `${r.nameHi}: उद्गम ${r.originHi} से होता है। बांध: ${r.damsHi}। विशेष: ${r.drainageHi}।`
        },
        tags: ['Drainage', 'Rivers', 'Banas', 'Chambal', 'Mahi', 'High Yield']
      };
    }
  },

  // ==========================================
  // 3. RAJASTHAN POLITY & ADMINISTRATION
  // ==========================================
  {
    subjectId: 'raj_polity_admin',
    subtopic: 'Governor & Chief Minister powers & tenures',
    importance: 'HIGH_YIELD',
    importanceScore: 94,
    conceptKey: 'Rajasthan_Governor_Articles',
    generate: (seed) => {
      const articles = [
        {
          article: 'Article 153',
          featureEn: 'There shall be a Governor for each State (and 7th Amendment allows same person for two or more states)',
          featureHi: 'प्रत्येक राज्य के लिए एक राज्यपाल होगा (7वें संशोधन द्वारा एक ही व्यक्ति दो या अधिक राज्यों का राज्यपाल हो सकता है)'
        },
        {
          article: 'Article 156',
          featureEn: 'Governor holds office during the pleasure of the President (normal term of 5 years)',
          featureHi: 'राज्यपाल राष्ट्रपति के प्रसादपर्यंत पद धारण करता है (सामान्यतः 5 वर्ष का कार्यकाल)'
        },
        {
          article: 'Article 161',
          featureEn: 'Pardoning powers of the Governor for offenses against state laws (cannot pardon death sentence)',
          featureHi: 'राज्य विधि के विरुद्ध अपराधों पर राज्यपाल की क्षमादान की शक्ति (मृत्युदंड को क्षमा नहीं कर सकता)'
        },
        {
          article: 'Article 213',
          featureEn: 'Power of the Governor to promulgate Ordinances during recess of the State Legislature',
          featureHi: 'विधानमंडल के विश्रांतिकाल में राज्यपाल द्वारा अध्यादेश प्रख्यापित करने की शक्ति'
        }
      ];

      const chosen = articles[seed % articles.length];
      const others = articles.filter(a => a.article !== chosen.article);

      return {
        question: {
          en: `Under which Article of the Constitution of India ${chosen.featureEn}?`,
          hi: `भारतीय संविधान के किस अनुच्छेद के तहत ${chosen.featureHi}?`
        },
        options: {
          en: [chosen.article, others[0].article, others[1].article, others[2].article],
          hi: [chosen.article, others[0].article, others[1].article, others[2].article]
        },
        correctOption: 0,
        explanation: {
          en: `${chosen.article}: ${chosen.featureEn}.`,
          hi: `${chosen.article}: ${chosen.featureHi}।`
        },
        tags: ['Polity', 'Governor', 'Constitution', 'High Yield']
      };
    }
  },

  // ==========================================
  // 4. RAJASTHAN ECONOMY & ECONOMIC SURVEY
  // ==========================================
  {
    subjectId: 'raj_economy',
    subtopic: 'Macro Indicators of Rajasthan (GSDP, Per Capita Income)',
    importance: 'HIGH_YIELD',
    importanceScore: 97,
    conceptKey: 'Economic_Survey_Indicators',
    generate: (seed) => {
      const indicators = [
        {
          topicEn: 'Per Capita Income of Rajasthan at current prices',
          topicHi: 'प्रचलित मूल्यों पर राजस्थान की प्रति व्यक्ति आय',
          factEn: 'As per the recent Rajasthan Economic Survey, Per Capita Income at current prices stands at approximately ₹1,56,149, reflecting strong service & industrial growth.',
          factHi: 'राजस्थान आर्थिक समीक्षा के अनुसार प्रचलित मूल्यों पर प्रति व्यक्ति आय लगभग ₹1,56,149 आंकी गई है।',
          correctEn: 'Around ₹1.56 Lakh (₹1,56,149)',
          correctHi: 'लगभग ₹1.56 लाख (₹1,56,149)',
          wrongsEn: ['Around ₹98,000', 'Around ₹2.40 Lakh', 'Around ₹3.10 Lakh'],
          wrongsHi: ['लगभग ₹98,000', 'लगभग ₹2.40 लाख', 'लगभग ₹3.10 लाख']
        },
        {
          topicEn: 'Sectoral contribution to GSVA at constant (2011-12) prices',
          topicHi: 'स्थिर (2011-12) मूल्यों पर GSVA में क्षेत्रीय योगदान का सही घटता क्रम',
          factEn: 'Services sector contributes the highest (~43.74%), followed by Agriculture (~28.50%) and Industry (~27.76%).',
          factHi: 'सेवा क्षेत्र सर्वाधिक (~43.74%), उसके बाद कृषि क्षेत्र (~28.50%) तथा उद्योग क्षेत्र (~27.76%) का स्थान है।',
          correctEn: 'Services > Agriculture > Industry',
          correctHi: 'सेवा क्षेत्र > कृषि क्षेत्र > उद्योग क्षेत्र',
          wrongsEn: ['Industry > Services > Agriculture', 'Agriculture > Industry > Services', 'Agriculture > Services > Industry'],
          wrongsHi: ['उद्योग > सेवा > कृषि', 'कृषि > उद्योग > सेवा', 'कृषि > सेवा > उद्योग']
        }
      ];

      const item = indicators[seed % indicators.length];
      return {
        question: {
          en: `According to the latest Rajasthan Economic Survey, which of the following is correct regarding ${item.topicEn}?`,
          hi: `नवीनतम राजस्थान आर्थिक समीक्षा के अनुसार ${item.topicHi} के संदर्भ में कौन सा कथन सही है?`
        },
        options: {
          en: [item.correctEn, ...item.wrongsEn],
          hi: [item.correctHi, ...item.wrongsHi]
        },
        correctOption: 0,
        explanation: {
          en: `${item.topicEn}: ${item.factEn}`,
          hi: `${item.topicHi}: ${item.factHi}`
        },
        tags: ['Economic Survey', 'GSDP', 'Macro Indicators']
      };
    }
  },

  // ==========================================
  // 5. INDIAN HISTORY
  // ==========================================
  {
    subjectId: 'indian_history',
    subtopic: 'Modern India: 1857 Revolt, Socio-religious reforms',
    importance: 'HIGH_YIELD',
    importanceScore: 94,
    conceptKey: 'Socio_Religious_Reformers',
    generate: (seed) => {
      const reformers = [
        {
          nameEn: 'Brahmo Samaj (1828, Calcutta)',
          nameHi: 'ब्रह्म समाज (1828, कलकत्ता)',
          founderEn: 'Raja Ram Mohan Roy',
          founderHi: 'राजा राम मोहन राय',
          factEn: 'Opposed Sati Pratha (led to 1829 Sati Abolition Act under William Bentinck), idol worship and advocated monotheism.',
          factHi: 'सती प्रथा के उन्मूलन (1829 का सती निषेध कानून) तथा एकेश्वरवाद के प्रचार में अग्रणी भूमिका निभाई।'
        },
        {
          nameEn: 'Arya Samaj (1875, Bombay)',
          nameHi: 'आर्य समाज (1875, बंबई)',
          founderEn: 'Swami Dayanand Saraswati',
          founderHi: 'स्वामी दयानंद सरस्वती',
          factEn: 'Gave the call "Go Back to the Vedas" (वेदों की ओर लौटो); authored Satyarth Prakash in Udaipur, Rajasthan.',
          factHi: '"वेदों की ओर लौटो" का नारा दिया तथा अपने प्रसिद्ध ग्रंथ "सत्यार्थ प्रकाश" की रचना उदयपुर (राजस्थान) में की।'
        },
        {
          nameEn: 'Prarthana Samaj (1867, Bombay)',
          nameHi: 'प्रार्थना समाज (1867, बंबई)',
          founderEn: 'Dr. Atmaram Pandurang (with Justice M. G. Ranade)',
          founderHi: 'डॉ. आत्माराम पांडुरंग (एम. जी. रानाडे के सहयोग से)',
          factEn: 'Emphasized inter-caste dining, widow remarriage, upliftment of women and depressed classes.',
          factHi: 'जाति प्रथा उन्मूलन, विधवा पुनर्विवाह एवं स्त्री शिक्षा पर विशेष बल दिया।'
        },
        {
          nameEn: 'Satyashodhak Samaj (1873, Maharashtra)',
          nameHi: 'सत्यशोधक समाज (1873, महाराष्ट्र)',
          founderEn: 'Jyotirao Phule',
          founderHi: 'ज्योतिराव फुले',
          factEn: 'Penned "Gulamgiri" and fought against caste oppression, Brahminical supremacy and for girl education.',
          factHi: '"गुलामगिरी" पुस्तक की रचना की तथा दलितों व महिलाओं की शिक्षा एवं अधिकारों हेतु संघर्ष किया।'
        }
      ];

      const chosen = reformers[seed % reformers.length];
      const others = reformers.filter(r => r.nameEn !== chosen.nameEn);

      return {
        question: {
          en: `Who was the founder of "${chosen.nameEn}" which ${chosen.factEn}?`,
          hi: `"${chosen.nameHi}" के संस्थापक कौन थे, जिन्होंने ${chosen.factHi}?`
        },
        options: {
          en: [chosen.founderEn, others[0].founderEn, others[1].founderEn, others[2].founderEn],
          hi: [chosen.founderHi, others[0].founderHi, others[1].founderHi, others[2].founderHi]
        },
        correctOption: 0,
        explanation: {
          en: `${chosen.nameEn} was founded by ${chosen.founderEn}. Key impact: ${chosen.factEn}`,
          hi: `${chosen.nameHi} की स्थापना ${chosen.founderHi} द्वारा की गई थी।`
        },
        tags: ['Modern India', 'Reformers', 'Brahmo Samaj', 'Arya Samaj']
      };
    }
  },

  // ==========================================
  // 6. INDIAN POLITY & CONSTITUTION
  // ==========================================
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

  // ==========================================
  // 7. GEOGRAPHY: INDIA & WORLD
  // ==========================================
  {
    subjectId: 'indian_world_geo',
    subtopic: 'India: Drainage System (Ganga, Brahmaputra, Peninsular rivers)',
    importance: 'HIGH_YIELD',
    importanceScore: 93,
    conceptKey: 'Indian_River_Tributaries',
    generate: (seed) => {
      const riverTributaries = [
        {
          riverEn: 'Godavari (Dakshin Ganga / Vridha Ganga)',
          riverHi: 'गोदावरी (दक्षिण गंगा / वृद्ध गंगा)',
          originEn: 'Trimbakeshwar near Nashik, Maharashtra',
          originHi: 'त्र्यंबकेश्वर (नासिक, महाराष्ट्र)',
          tributariesEn: 'Pranhita, Penganga, Wainganga, Indravati, Manjira',
          tributariesHi: 'प्राणहिता, पेनगंगा, वैनगंगा, इंद्रावती, मंजिरा'
        },
        {
          riverEn: 'Krishna River',
          riverHi: 'कृष्णा नदी',
          originEn: 'Mahabaleshwar in Western Ghats, Maharashtra',
          originHi: 'महाबलेश्वर (पश्चिमी घाट, महाराष्ट्र)',
          tributariesEn: 'Tungabhadra, Koyna, Bhima, Ghataprabha, Malaprabha',
          tributariesHi: 'तुंगभद्रा, कोयना, भीमा, घटप्रभा, मालप्रभा'
        },
        {
          riverEn: 'Cauvery (Kaveri) River',
          riverHi: 'कावेरी नदी',
          originEn: 'Talakaveri in Brahmagiri hills, Kodagu, Karnataka',
          originHi: 'तालकावेरी (ब्रह्मगिरि पहाड़ियाँ, कर्नाटक)',
          tributariesEn: 'Hemavati, Shimsha, Arkavathi, Kabini, Bhavani, Amaravati',
          tributariesHi: 'हेमावती, शिमशा, अर्कावती, काबिनी, भवानी, अमरावती'
        }
      ];

      const item = riverTributaries[seed % riverTributaries.length];
      const others = riverTributaries.filter(r => r.riverEn !== item.riverEn);

      return {
        question: {
          en: `Which major Peninsular river originates from ${item.originEn} and has key tributaries including ${item.tributariesEn}?`,
          hi: `कौन सी प्रमुख प्रायद्वीपीय नदी ${item.originHi} से निकलती है तथा जिसकी प्रमुख सहायक नदियों में ${item.tributariesHi} शामिल हैं?`
        },
        options: {
          en: [item.riverEn, others[0].riverEn, others[1].riverEn, 'Narmada River'],
          hi: [item.riverHi, others[0].riverHi, others[1].riverHi, 'नर्मदा नदी']
        },
        correctOption: 0,
        explanation: {
          en: `${item.riverEn}: Origin is ${item.originEn}. Tributaries: ${item.tributariesEn}.`,
          hi: `${item.riverHi}: उद्गम ${item.originHi} है। सहायक नदियां: ${item.tributariesHi}।`
        },
        tags: ['Geography', 'Rivers', 'Godavari', 'Krishna', 'Cauvery']
      };
    }
  },

  // ==========================================
  // 8. INDIAN ECONOMY
  // ==========================================
  {
    subjectId: 'indian_economy',
    subtopic: 'National Income & GDP Concepts',
    importance: 'HIGH_YIELD',
    importanceScore: 92,
    conceptKey: 'Macro_Economy_Concepts',
    generate: (seed) => {
      const concepts = [
        {
          termEn: 'Gross Domestic Product (GDP)',
          termHi: 'सकल घरेलू उत्पाद (GDP)',
          defEn: 'Total monetary value of all final goods and services produced within the domestic territory of a country in a given year.',
          defHi: 'एक वित्तीय वर्ष में किसी देश की घरेलू भौगोलिक सीमा के भीतर उत्पादित समस्त अंतिम वस्तुओं और सेवाओं का कुल मौद्रिक मूल्य।'
        },
        {
          termEn: 'Gross National Product (GNP)',
          termHi: 'सकल राष्ट्रीय उत्पाद (GNP)',
          defEn: 'GDP plus Net Factor Income from Abroad (NFIA) produced by citizens of a country irrespective of geographical location.',
          defHi: 'जीडीपी में विदेशों से प्राप्त शुद्ध साधन आय (NFIA) जोड़ने पर प्राप्त मूल्य।'
        },
        {
          termEn: 'Net National Product at Factor Cost (NNP at FC)',
          termHi: 'साधन लागत पर शुद्ध राष्ट्रीय उत्पाद (NNP at FC)',
          defEn: 'Regarded as the official definition of "National Income" (राष्ट्रीय आय), obtained after deducting depreciation from GNP and adjusting for net indirect taxes.',
          defHi: 'सकल राष्ट्रीय उत्पाद में से मूल्यह्रास (Depreciation) घटाने और अप्रत्यक्ष कर व सब्सिडी समायोजित करने के बाद राष्ट्रीय आय (National Income) का माप।'
        }
      ];

      const item = concepts[seed % concepts.length];
      const others = concepts.filter(c => c.termEn !== item.termEn);

      return {
        question: {
          en: `Which economic metric is defined as "${item.defEn}"?`,
          hi: `किस आर्थिक संकेतक को "${item.defHi}" के रूप में परिभाषित किया जाता है?`
        },
        options: {
          en: [item.termEn, others[0].termEn, others[1].termEn, 'Personal Disposable Income'],
          hi: [item.termHi, others[0].termHi, others[1].termHi, 'व्यक्तिगत प्रयोज्य आय']
        },
        correctOption: 0,
        explanation: {
          en: `${item.termEn}: ${item.defEn}`,
          hi: `${item.termHi}: ${item.defHi}`
        },
        tags: ['National Income', 'GDP', 'GNP', 'Economics']
      };
    }
  },

  // ==========================================
  // 9. GENERAL SCIENCE & TECHNOLOGY
  // ==========================================
  {
    subjectId: 'science_tech',
    subtopic: 'Space Technology & ISRO Missions (Chandrayaan, Gaganyaan, Aditya-L1)',
    importance: 'HIGH_YIELD',
    importanceScore: 98,
    conceptKey: 'ISRO_Launch_Vehicles',
    generate: (seed) => {
      const missions = [
        {
          nameEn: 'Chandrayaan-3',
          vehicleEn: 'LVM3-M4 (Fat Boy / Bahubali)',
          vehicleHi: 'LVM3-M4 (बाहुबली रॉकेट)',
          detailsEn: 'Landed near the lunar south pole (Shiv Shakti Point) on 23 August 2023 (celebrated as National Space Day).',
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

  // ==========================================
  // 10. REASONING & MENTAL ABILITY
  // ==========================================
  {
    subjectId: 'reasoning_mental',
    subtopic: 'Percentages, Ratio & Proportion, Averages',
    importance: 'HIGH_YIELD',
    importanceScore: 89,
    conceptKey: 'Math_Ratio_Averages',
    generate: (seed) => {
      const multiplier = (seed % 7) + 3;
      const rA = 3;
      const rB = 5;
      const baseA = rA * multiplier;
      const baseB = rB * multiplier;
      const sum = baseA + baseB;

      return {
        question: {
          en: `The ratio of two numbers is 3 : 5. If their sum is ${sum}, what is the value of the larger number?`,
          hi: `दो संख्याओं का अनुपात 3 : 5 है। यदि उनका योग ${sum} है, तो बड़ी संख्या का मान क्या होगा?`
        },
        options: {
          en: [`${baseB}`, `${baseA}`, `${baseA + 4}`, `${baseB + 6}`],
          hi: [`${baseB}`, `${baseA}`, `${baseA + 4}`, `${baseB + 6}`]
        },
        correctOption: 0,
        explanation: {
          en: `Let numbers be 3x and 5x. 3x + 5x = 8x = ${sum} => x = ${multiplier}. Larger number is 5x = 5 * ${multiplier} = ${baseB}.`,
          hi: `माना संख्याएँ 3x और 5x हैं। 3x + 5x = 8x = ${sum} => x = ${multiplier}। अतः बड़ी संख्या = 5x = 5 * ${multiplier} = ${baseB} होगी।`
        },
        tags: ['Reasoning', 'Ratios', 'Aptitude']
      };
    }
  },

  // ==========================================
  // 11. CURRENT AFFAIRS
  // ==========================================
  {
    subjectId: 'current_affairs',
    subtopic: 'Rajasthan Current Affairs & Schemes',
    importance: 'HIGH_YIELD',
    importanceScore: 97,
    conceptKey: 'Current_Affairs_Generator',
    generate: (seed) => {
      const caItems = [
        {
          schemeEn: 'Shri Annapurna Rasoi Yojana',
          schemeHi: 'श्री अन्नपूर्णा रसोई योजना',
          factEn: 'Enhanced government subsidy to ₹22 per plate with 600 grams of nutritious food while maintaining ₹8 beneficiary charge.',
          factHi: 'प्रति थाली 600 ग्राम पौष्टिक भोजन, राज्य सरकार का अनुदान ₹22 व लाभार्थी शुल्क ₹8 निर्धारित।'
        },
        {
          schemeEn: 'Mukhyamantri Ayushman Arogya (MAA) Yojana',
          schemeHi: 'मुख्यमंत्री आयुष्मान आरोग्य (माँ) योजना',
          factEn: 'Comprehensive cashless in-patient hospital healthcare with free medicines and diagnostic coverage across Rajasthan.',
          factHi: 'कैशलेस इन-डोर उपचार, जांचें व दवाइयां उपलब्ध कराने वाली प्रमुख स्वास्थ्य योजना।'
        },
        {
          schemeEn: 'Modified PKC-ERCP River Interlinking Project',
          schemeHi: 'संशोधित PKC-ERCP नदी जोड़ो परियोजना',
          factEn: 'Historic agreement between Rajasthan, Madhya Pradesh and Central Government for drinking & irrigation water to 13 eastern districts.',
          factHi: 'राजस्थान, मध्य प्रदेश और केंद्र सरकार के मध्य 13 पूर्वी जिलों में जलापूर्ति का त्रिपक्षीय समझौता।'
        }
      ];

      const item = caItems[seed % caItems.length];
      const others = caItems.filter(c => c.schemeEn !== item.schemeEn);

      return {
        question: {
          en: `Which welfare initiative of the Government of Rajasthan is characterized by "${item.factEn}"?`,
          hi: `राजस्थान सरकार की किस जनकल्याणकारी योजना की प्रमुख विशेषता "${item.factHi}" है?`
        },
        options: {
          en: [item.schemeEn, others[0].schemeEn, others[1].schemeEn, 'Rajasthan Yuva Sambal Yojana'],
          hi: [item.schemeHi, others[0].schemeHi, others[1].schemeHi, 'राजस्थान युवा संबल योजना']
        },
        correctOption: 0,
        explanation: {
          en: `${item.schemeEn}: ${item.factEn}`,
          hi: `${item.schemeHi}: ${item.factHi}`
        },
        tags: ['Current Affairs', 'Rajasthan Schemes', 'High Yield']
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
  const qId = `dyn_${template.subjectId}_${seed % 99999}_${Math.floor(Math.random() * 1000)}`;

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
