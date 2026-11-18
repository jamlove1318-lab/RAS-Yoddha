import { Question } from '../types';
import { getRecentSignatures } from './srsEngine';

export interface DailyNewsCapsule {
  id: string;
  category: 'rajasthan' | 'national' | 'international' | 'sports_awards';
  headlineEn: string;
  headlineHi: string;
  summaryEn: string;
  summaryHi: string;
  examTakeawayEn: string;
  examTakeawayHi: string;
}

export interface CurrentAffairsItem {
  id: string;
  dateKey: string;
  category: string;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctOption: number;
  explanationEn: string;
  explanationHi: string;
  importanceScore: number;
  tags: string[];
}

export const CURRENT_AFFAIRS_MASTER: CurrentAffairsItem[] = [
  {
    id: 'ca_raj_ercp_mou',
    dateKey: '2024-01-28',
    category: 'rajasthan',
    questionEn: 'Under the Modified PKC-ERCP (Parbati-Kalisindh-Chambal Eastern Rajasthan Canal Project) tripartite agreement, which two states signed the historic MoU with the Union Jal Shakti Ministry?',
    questionHi: 'संशोधित पार्वती-कालीसिंध-चंबल (PKC-ERCP) लिंक परियोजना के त्रिपक्षीय समझौते के अंतर्गत किन दो राज्यों ने केंद्रीय जल शक्ति मंत्रालय के साथ ऐतिहासिक समझौता ज्ञापन (MoU) पर हस्ताक्षर किए?',
    optionsEn: [
      'Rajasthan and Madhya Pradesh (राजस्थान एवं मध्य प्रदेश)',
      'Rajasthan and Gujarat',
      'Rajasthan and Haryana',
      'Rajasthan and Uttar Pradesh'
    ],
    optionsHi: [
      'राजस्थान एवं मध्य प्रदेश',
      'राजस्थान एवं गुजरात',
      'राजस्थान एवं हरियाणा',
      'राजस्थान एवं उत्तर प्रदेश'
    ],
    correctOption: 0,
    explanationEn: 'On 28 January 2024, Rajasthan and Madhya Pradesh signed a historic tripartite MoU with the Union Jal Shakti Ministry for the modified PKC-ERCP project providing water to 13 districts of eastern Rajasthan.',
    explanationHi: '28 जनवरी 2024 को राजस्थान और मध्य प्रदेश ने केंद्र सरकार के साथ संशोधित PKC-ERCP परियोजना हेतु समझौता ज्ञापन पर हस्ताक्षर किए, जिससे पूर्वी राजस्थान के 13 जिलों को पेयजल व सिंचाई सुविधा मिलेगी।',
    importanceScore: 99,
    tags: ['ERCP', 'Chambal', 'Rajasthan Schemes', 'High Yield']
  },
  {
    id: 'ca_raj_annapurna_rasoi',
    dateKey: '2024-01-01',
    category: 'rajasthan',
    questionEn: 'In Rajasthan, what is the new name given to Indira Rasoi Yojana, and what is the enhanced state government subsidy per thali provided under it?',
    questionHi: 'राजस्थान में इंदिरा रसोई योजना का नाम बदलकर क्या किया गया है, तथा इसके तहत राज्य सरकार द्वारा प्रति थाली दिया जाने वाला अनुदान बढ़ाकर कितना किया गया है?',
    optionsEn: [
      'Shri Annapurna Rasoi Yojana (Subsidy: ₹22 per thali, meal cost to citizen: ₹8, food weight: 600g)',
      'Atal Annapurna Rasoi Yojana (Subsidy: ₹25, cost: ₹10)',
      'Mukhyamantri Bhojan Yojana (Subsidy: ₹20, cost: ₹5)',
      'Rajasthan Annapurna Thali Yojana (Subsidy: ₹18, cost: ₹8)'
    ],
    optionsHi: [
      'श्री अन्नपूर्णा रसोई योजना (अनुदान: ₹22 प्रति थाली, नागरिक मूल्य: ₹8, भोजन वजन: 600 ग्राम)',
      'अटल अन्नपूर्णा रसोई योजना (अनुदान: ₹25, मूल्य: ₹10)',
      'मुख्यमंत्री भोजन योजना (अनुदान: ₹20, मूल्य: ₹5)',
      'राजस्थान अन्नपूर्णा थाली योजना (अनुदान: ₹18, मूल्य: ₹8)'
    ],
    correctOption: 0,
    explanationEn: 'Under Shri Annapurna Rasoi Yojana, state subsidy was enhanced from ₹17 to ₹22 per plate with food weight increased to 600g while maintaining the citizen price at ₹8.',
    explanationHi: 'श्री अन्नपूर्णा रसोई योजना में थाली का वजन 600 ग्राम किया गया तथा राज्य सरकार का अनुदान ₹17 से बढ़ाकर ₹22 प्रति थाली किया गया (नागरिक शुल्क ₹8 यथावत)।',
    importanceScore: 98,
    tags: ['Annapurna Rasoi', 'Welfare Schemes', 'High Yield']
  },
  {
    id: 'ca_sports_avani_lekhara',
    dateKey: '2024-08-30',
    category: 'sports_awards',
    questionEn: 'Avani Lekhara of Jaipur created historic milestone at Paris 2024 Paralympics by winning which medal in Women 10m Air Rifle Standing SH1?',
    questionHi: 'पेरिस 2024 पैरालंपिक में जयपुर की निशानेबाज अवनि लेखरा ने 10 मीटर एयर राइफल स्टैंडिंग SH1 में कौन सा पदक जीतकर इतिहास रचा?',
    optionsEn: [
      'Gold Medal with a Paralympic record score of 249.7 points',
      'Silver Medal',
      'Bronze Medal',
      'Gold in 50m Rifle'
    ],
    optionsHi: [
      '249.7 अंकों के पैरालंपिक रिकॉर्ड के साथ स्वर्ण पदक',
      'रजत पदक',
      'कांस्य पदक',
      'केवल 50 मीटर में स्वर्ण'
    ],
    correctOption: 0,
    explanationEn: 'Avani Lekhara became the first Indian woman athlete to win two Paralympic Gold medals (Tokyo 2020 and Paris 2024).',
    explanationHi: 'अवनि लेखरा लगातार दो पैरालंपिक खेलों (टोक्यो 2020 व पेरिस 2024) में स्वर्ण पदक जीतने वाली पहली भारतीय महिला एथलीट बनीं।',
    importanceScore: 99,
    tags: ['Paris 2024', 'Avani Lekhara', 'Shooting', 'High Yield']
  },
  {
    id: 'ca_sports_mona_agarwal',
    dateKey: '2024-08-30',
    category: 'sports_awards',
    questionEn: 'At the Paris 2024 Paralympics, which shooter from Rajasthan won the Bronze Medal in Women 10m Air Rifle SH1 alongside Avani Lekhara?',
    questionHi: 'पेरिस 2024 पैरालंपिक में अवनि लेखरा के साथ महिलाओं की 10 मीटर एयर राइफल SH1 स्पर्धा में कांस्य पदक जीतने वाली राजस्थान की निशानेबाज कौन हैं?',
    optionsEn: [
      'Mona Agarwal (मोना अग्रवाल)',
      'Apurvi Chandela',
      'Bhavina Patel',
      'Rubina Francis'
    ],
    optionsHi: [
      'मोना अग्रवाल (Mona Agarwal)',
      'अपूर्वी चंदेला',
      'भाविना पटेल',
      'रुबीना फ्रांसिस'
    ],
    correctOption: 0,
    explanationEn: 'Mona Agarwal scored 228.7 points to secure the Bronze medal in the same 10m Air Rifle SH1 event where Avani Lekhara won Gold.',
    explanationHi: 'मोना अग्रवाल ने 228.7 अंकों के साथ कांस्य पदक जीता। एक ही स्पर्धा में भारत की दो बेटियों ने पदक जीतकर इतिहास रचा।',
    importanceScore: 97,
    tags: ['Paralympics', 'Mona Agarwal', 'Rajasthan Sports']
  },
  {
    id: 'ca_raj_sports_divyakriti',
    dateKey: '2024-01-09',
    category: 'sports_awards',
    questionEn: 'Divyakriti Singh of Nagaur (Rajasthan) was conferred the prestigious Arjuna Award by the President of India in January 2024. In which sport is she India first woman recipient?',
    questionHi: 'जनवरी 2024 में राष्ट्रपति द्वारा अर्जुन पुरस्कार से सम्मानित राजस्थान (नागौर) की दिव्यकृति सिंह किस खेल में यह सम्मान पाने वाली देश की पहली महिला खिलाड़ी हैं?',
    optionsEn: [
      'Equestrian Dressage (घुड़सवारी - ड्रेसेज)',
      'Pistol Shooting',
      'Archery',
      'Rowing'
    ],
    optionsHi: [
      'घुड़सवारी (Equestrian Dressage)',
      'निशानेबाजी',
      'तीरंदाजी',
      'नौकायन'
    ],
    correctOption: 0,
    explanationEn: 'Divyakriti Singh became the first Indian woman to receive the Arjuna Award in Equestrian. She won a Team Dressage Gold Medal at the 19th Asian Games Hangzhou.',
    explanationHi: 'दिव्यकृति सिंह घुड़सवारी (ड्रेसेज) में अर्जुन पुरस्कार प्राप्त करने वाली देश की पहली महिला बनीं। इन्होंने एशियाई खेलों में स्वर्ण पदक जीता था।',
    importanceScore: 98,
    tags: ['Divyakriti Singh', 'Arjuna Award', 'Equestrian']
  },
  {
    id: 'ca_raj_lithium_degana',
    dateKey: '2024-02-15',
    category: 'rajasthan',
    questionEn: 'Geological Survey of India (GSI) discovered massive deposits of critical mineral Lithium (White Gold for EV batteries) at which historical location in Rajasthan?',
    questionHi: 'भारतीय भूवैज्ञानिक सर्वेक्षण (GSI) ने राजस्थान के किस ऐतिहासिक क्षेत्र में उच्च श्रेणी के लिथियम (श्वेत स्वर्ण) के विशाल भंडारों की पुष्टि की है?',
    optionsEn: [
      'Revat Hill, Degana (Nagaur district)',
      'Zawar, Udaipur',
      'Khetri, Jhunjhunu',
      'Jamsar, Bikaner'
    ],
    optionsHi: [
      'रेवत पहाड़ी, डेगाना (नागौर जिला)',
      'जावर (उदयपुर)',
      'खेतड़ी (झुंझुनू)',
      'जामसर (बीकानेर)'
    ],
    correctOption: 0,
    explanationEn: 'GSI confirmed large Lithium reserves in the granites of Revat hill in Degana (Nagaur), historically renowned for Tungsten.',
    explanationHi: 'डेगाना (नागौर) की रेवत पहाड़ी, जो ऐतिहासिक रूप से टंगस्टन हेतु प्रसिद्ध थी, में इलेक्ट्रिक बैटरी निर्माण हेतु आवश्यक लिथियम के विशाल भंडार पाए गए हैं।',
    importanceScore: 98,
    tags: ['Lithium', 'Degana', 'Minerals', 'High Yield']
  },
  {
    id: 'ca_raj_gold_bhukia',
    dateKey: '2024-03-01',
    category: 'rajasthan',
    questionEn: 'The state government of Rajasthan conducted India largest e-auction for gold mining blocks at which site in Banswara district containing an estimated 113.5 tonnes of gold ore?',
    questionHi: 'राजस्थान सरकार ने लगभग 113.5 टन सोने के अयस्क भंडार वाले बांसवाड़ा के किस क्षेत्र में देश की सबसे बड़ी स्वर्ण खनन ई-नीलामी संपन्न की?',
    optionsEn: [
      'Bhukia-Jagpura (भूखिया-जगपुरा)',
      'Salumber',
      'Ghatol',
      'Aspur'
    ],
    optionsHi: [
      'भूखिया-जगपुरा (Bhukia-Jagpura)',
      'सलूंबर',
      'घाटोल',
      'आसपुर'
    ],
    correctOption: 0,
    explanationEn: 'Bhukia-Jagpura in Banswara holds an estimated 113.5 tonnes of gold ore reserves. The commercial mining auction marks Rajasthan entry into gold production.',
    explanationHi: 'बांसवाड़ा के भूखिया-जगपुरा में 113.5 टन स्वर्ण अयस्क के भंडार हैं जिसकी वाणिज्यिक ई-नीलामी की गई है।',
    importanceScore: 97,
    tags: ['Bhukia', 'Gold Mining', 'Banswara']
  },
  {
    id: 'ca_raj_gitags_2023',
    dateKey: '2023-08-01',
    category: 'rajasthan',
    questionEn: 'Which five traditional handicrafts of Rajasthan simultaneously received the Geographical Indication (GI) tags in 2023-24?',
    questionHi: 'वर्ष 2023-24 में राजस्थान के किन 5 पारंपरिक शिल्पों को एक साथ प्रतिष्ठित जीआई टैग (GI Tag) प्रदान किया गया?',
    optionsEn: [
      'Nathdwara Pichhwai, Jodhpur Bandhej, Bikaner Usta Art, Bikaner Kashidakari, and Udaipur Koftgari',
      'Sanganeri Print, Bagru Print, Blue Pottery, Kota Doria, Thewa Art',
      'Molela Clay, Pokaran Pottery, Barmer Ajrakh, Akola Dabu, Sojat Mehndi',
      'Thewa Art, Blue Pottery, Ivory Carving, Kathputli, Pichhwai'
    ],
    optionsHi: [
      'नाथद्वारा पिछवाई, जोधपुर बंधेज, बीकानेर उस्ता कला, बीकानेर कशीदाकारी एवं उदयपुर कोफ्तगारी',
      'सांगानेरी प्रिंट, बगरू प्रिंट, ब्लू पॉटरी, कोटा डोरिया, थेवा कला',
      'मोलेला मिट्टी कला, पोकरण पॉटरी, बाड़मेर अजरक, आकोला दाबू, सोजत मेहंदी',
      'थेवा कला, ब्लू पॉटरी, हाथी दांत नक्काशी, कठपुतली, पिछवाई'
    ],
    correctOption: 0,
    explanationEn: '5 crafts from Rajasthan received GI tags in 2023: Nathdwara Pichhwai, Jodhpur Bandhej, Bikaner Kashidakari, Bikaner Usta Art, and Udaipur Koftgari craft.',
    explanationHi: '2023 में राजस्थान के 5 हस्तशिल्पों (नाथद्वारा पिछवाई, जोधपुर बंधेज, बीकानेर कशीदाकारी, बीकानेर उस्ता कला, उदयपुर कोफ्तगारी) को जीआई टैग मिला।',
    importanceScore: 98,
    tags: ['GI Tags', 'Handicrafts', 'Rajasthan Culture']
  },
  {
    id: 'ca_raj_ramgarh_crater',
    dateKey: '2024-02-20',
    category: 'rajasthan',
    questionEn: 'Ramgarh Crater in Baran district of Rajasthan was officially declared a Global Geo-heritage Site. How was this 3.2 km diameter geological structure formed?',
    questionHi: 'राजस्थान के बारां जिले के रामगढ़ क्रेटर को ग्लोबल जियो-हेरिटेज स्थल घोषित किया गया। 3.2 किमी व्यास वाली यह भूवैज्ञानिक संरचना कैसे निर्मित हुई थी?',
    optionsEn: [
      'Meteorite impact (Astrobleme) approximately 165 million years ago',
      'Volcanic eruption caldera',
      'Tectonic rift sinking',
      'Glacial erosion depression'
    ],
    optionsHi: [
      'लगभग 16.5 करोड़ वर्ष पूर्व उल्कापिंड के टकराने से (Meteorite Impact / उल्कापिंडीय क्रेटर)',
      'ज्वालामुखी काल्डेरा विस्फोट से',
      'विवर्तनिक दरार के धंसने से',
      'हिमानी अपरदन से'
    ],
    correctOption: 0,
    explanationEn: 'Ramgarh Crater in Baran is India third meteorite impact crater (after Lonar in Maharashtra and Dhala in MP) and first in Rajasthan, formed ~165 million years ago.',
    explanationHi: 'बारां का रामगढ़ क्रेटर उल्कापिंड के पृथ्वी से टकराने से बना उल्का क्रेटर (Astrobleme) है। यह लोनार व ढाला के बाद देश का तीसरा मान्यता प्राप्त क्रेटर है।',
    importanceScore: 97,
    tags: ['Ramgarh Crater', 'Geoheritage', 'Baran']
  },
  {
    id: 'ca_raj_tiger_reserve_5th',
    dateKey: '2023-08-22',
    category: 'rajasthan',
    questionEn: 'Which is the 5th notified Tiger Reserve of Rajasthan (and 54th in India), approved by the National Tiger Conservation Authority (NTCA) in August 2023?',
    questionHi: 'अगस्त 2023 में राष्ट्रीय बाघ संरक्षण प्राधिकरण (NTCA) द्वारा अनुमोदित राजस्थान का 5वां (तथा देश का 54वां) बाघ अभयारण्य कौन सा है?',
    optionsEn: [
      'Dholpur-Karauli Tiger Reserve (धौलपुर-करौली टाइगर रिजर्व)',
      'Ramgarh Vishdhari Tiger Reserve',
      'Kumbhalgarh Tiger Reserve',
      'Mukundra Hills Tiger Reserve'
    ],
    optionsHi: [
      'धौलपुर-करौली टाइगर रिजर्व (Dholpur-Karauli)',
      'रामगढ़ विषधारी टाइगर रिजर्व',
      'कुंभलगढ़ टाइगर रिजर्व',
      'मुकुंदरा हिल्स टाइगर रिजर्व'
    ],
    correctOption: 0,
    explanationEn: 'Dholpur-Karauli is Rajasthan 5th Tiger Reserve (after Ranthambore, Sariska, Mukundra Hills, and Ramgarh Vishdhari), notified as India 54th Tiger Reserve.',
    explanationHi: 'धौलपुर-करौली राजस्थान का 5वां तथा देश का 54वां टाइगर रिजर्व बना। इससे पूर्व 52वां टाइगर रिजर्व रामगढ़ विषधारी (बूंदी) घोषित हुआ था।',
    importanceScore: 98,
    tags: ['Tiger Reserve', 'Dholpur Karauli', 'Environment']
  },
  {
    id: 'ca_awards_bharat_ratna',
    dateKey: '2024-02-09',
    category: 'national',
    questionEn: 'In 2024, the Government of India conferred the Bharat Ratna upon five eminent personalities. Who among the following was NOT among the five recipients in 2024?',
    questionHi: 'वर्ष 2024 में भारत सरकार ने 5 विभूतियों को भारत रत्न से सम्मानित किया। निम्न में से कौन 2024 के भारत रत्न प्राप्तकर्ताओं में शामिल नहीं थे?',
    optionsEn: [
      'Atal Bihari Vajpayee (conferred earlier in 2015)',
      'Karpoori Thakur (Jannayak of Bihar)',
      'L.K. Advani',
      'Dr. M.S. Swaminathan, P.V. Narasimha Rao, and Chaudhary Charan Singh'
    ],
    optionsHi: [
      'अटल बिहारी वाजपेयी (इन्हें 2015 में दिया गया था)',
      'कर्पूरी ठाकुर (बिहार के जननायक)',
      'लालबहादुर शास्त्री',
      'डॉ. एम.एस. स्वामीनाथन, पी.वी. नरसिम्हा राव एवं चौधरी चरण सिंह'
    ],
    correctOption: 0,
    explanationEn: 'The 5 Bharat Ratna recipients of 2024: Karpoori Thakur, Lal Krishna Advani, P.V. Narasimha Rao, Chaudhary Charan Singh, and Dr. M.S. Swaminathan.',
    explanationHi: 'वर्ष 2024 के 5 भारत रत्न: कर्पूरी ठाकुर, लालकृष्ण आडवाणी, पी.वी. नरसिम्हा राव, चौधरी चरण सिंह तथा डॉ. एम.एस. स्वामीनाथन।',
    importanceScore: 99,
    tags: ['Bharat Ratna 2024', 'Awards', 'National']
  },
  {
    id: 'ca_g20_african_union',
    dateKey: '2023-09-09',
    category: 'international',
    questionEn: 'Under India historic G20 Presidency at the New Delhi Leaders Summit, which continental body was formally inducted as a permanent member, turning G20 into G21?',
    questionHi: 'भारत की जी20 अध्यक्षता में नई दिल्ली शिखर सम्मेलन में किस महाद्वीपीय संगठन को स्थायी सदस्य के रूप में शामिल किया गया, जिससे यह समूह जी21 बन गया?',
    optionsEn: [
      'African Union (अफ्रीकी संघ - AU representing 55 nations)',
      'ASEAN',
      'European Free Trade Association (EFTA)',
      'OPEC'
    ],
    optionsHi: [
      'अफ्रीकी संघ (African Union - 55 देशों का संघ)',
      'आसियान (ASEAN)',
      'ईएफटीए (EFTA)',
      'ओपेक (OPEC)'
    ],
    correctOption: 0,
    explanationEn: 'Under the theme "Vasudhaiva Kutumbakam", India championed the inclusion of the 55-member African Union as a permanent member of the G20 at Bharat Mandapam, New Delhi.',
    explanationHi: 'नई दिल्ली में भारत मंडपम में आयोजित जी20 शिखर सम्मेलन में 55 अफ्रीकी देशों के संगठन अफ्रीकी संघ (AU) को स्थायी सदस्यता प्रदान की गई।',
    importanceScore: 99,
    tags: ['G20 New Delhi', 'African Union', 'International']
  },
  {
    id: 'ca_india_space_aditya',
    dateKey: '2024-01-06',
    category: 'national',
    questionEn: 'On 6 January 2024, ISRO solar spacecraft Aditya-L1 was successfully placed into its final halo orbit around Lagrangian Point 1 (L1). What distance is L1 from Earth?',
    questionHi: '6 जनवरी 2024 को इसरो का सौर यान आदित्य-एल1 पृथ्वी से लगभग कितनी दूरी पर स्थित लैग्रेंज बिंदु 1 (L1) के चारों ओर हेलो कक्षा में स्थापित किया गया?',
    optionsEn: [
      'Approximately 1.5 million kilometers (लगभग 15 लाख किलोमीटर)',
      '3.84 lakh kilometers',
      '150 million kilometers',
      '50,000 kilometers'
    ],
    optionsHi: [
      'लगभग 15 लाख किलोमीटर (1.5 million km)',
      '3.84 लाख किलोमीटर',
      '15 करोड़ किलोमीटर',
      '50,000 किलोमीटर'
    ],
    correctOption: 0,
    explanationEn: 'Aditya-L1 is positioned in a halo orbit around L1 (~1.5 million km from Earth, about 1% of the distance to the Sun), where gravitational forces balance.',
    explanationHi: 'आदित्य-एल1 पृथ्वी से 15 लाख किमी दूर L1 बिंदु पर स्थित है जहाँ से सूर्य का बिना किसी ग्रहण के निरंतर अवलोकन संभव है।',
    importanceScore: 98,
    tags: ['Aditya L1', 'ISRO', 'Space Tech']
  },
  {
    id: 'ca_polity_election_cec',
    dateKey: '2023-12-28',
    category: 'national',
    questionEn: 'Under the Chief Election Commissioner and other Election Commissioners (Appointment, Conditions of Service and Term of Office) Act 2023, who comprises the Selection Committee?',
    questionHi: 'मुख्य निर्वाचन आयुक्त एवं अन्य निर्वाचन आयुक्त (नियुक्ति व सेवा शर्तें) अधिनियम 2023 के तहत चयन समिति में कौन-कौन शामिल हैं?',
    optionsEn: [
      'Prime Minister (Chairperson), Leader of Opposition/Single Largest Party in Lok Sabha, and a Union Cabinet Minister nominated by PM',
      'Prime Minister, Chief Justice of India, and Leader of Opposition',
      'President, Prime Minister, and Speaker of Lok Sabha',
      'Chief Justice of India, Law Minister, and Leader of Opposition'
    ],
    optionsHi: [
      'प्रधानमंत्री (अध्यक्ष), लोकसभा में विपक्ष/सबसे बड़े दल का नेता, तथा प्रधानमंत्री द्वारा नामित एक केंद्रीय कैबिनेट मंत्री',
      'प्रधानमंत्री, भारत के मुख्य न्यायाधीश एवं विपक्ष का नेता',
      'राष्ट्रपति, प्रधानमंत्री एवं लोकसभा अध्यक्ष',
      'मुख्य न्यायाधीश, विधि मंत्री एवं विपक्ष का नेता'
    ],
    correctOption: 0,
    explanationEn: 'The 2023 Act established a 3-member Selection Committee: PM (Chair), Leader of Opposition/largest party in Lok Sabha, and a Union Cabinet Minister nominated by the PM.',
    explanationHi: 'नए अधिनियम के अनुसार चयन समिति में प्रधानमंत्री, लोकसभा में नेता प्रतिपक्ष तथा प्रधानमंत्री द्वारा नामित एक कैबिनेट मंत्री शामिल होते हैं।',
    importanceScore: 98,
    tags: ['Election Commission', 'CEC Act 2023', 'Polity']
  },
  {
    id: 'ca_raj_district_reorg',
    dateKey: '2023-08-04',
    category: 'rajasthan',
    questionEn: 'Under whose chairmanship was the High-Level Committee constituted by the Government of Rajasthan that recommended the reorganization and creation of new districts in Rajasthan?',
    questionHi: 'राजस्थान में नए जिलों के गठन एवं पुनर्गठन की सिफारिश करने वाली उच्च स्तरीय समिति का गठन किसकी अध्यक्षता में किया गया था?',
    optionsEn: [
      'Retired IAS Ram Lubhaya (सेवानिवृत्त आईएएस रामलुभाया)',
      'Parmesh Chandra',
      'Justice V.S. Dave',
      'Kailash Meghwal'
    ],
    optionsHi: [
      'सेवानिवृत्त आईएएस रामलुभाया (Ram Lubhaya Committee)',
      'परमेश चंद्र',
      'न्यायमूर्ति वी.एस. दवे',
      'कैलाश मेघवाल'
    ],
    correctOption: 0,
    explanationEn: 'The Ram Lubhaya Committee was appointed in March 2022 to recommend the reorganization and creation of new administrative districts and divisions in Rajasthan.',
    explanationHi: 'राजस्थान में नए जिलों के गठन हेतु सेवानिवृत्त आईएएस रामलुभाया की अध्यक्षता में उच्च स्तरीय समिति का गठन किया गया था।',
    importanceScore: 98,
    tags: ['Ram Lubhaya', 'Districts Reorganization', 'Polity']
  },
  {
    id: 'ca_awards_khel_ratna_2023',
    dateKey: '2024-01-09',
    category: 'sports_awards',
    questionEn: 'The Major Dhyan Chand Khel Ratna Award 2023 was conferred upon which badminton men doubles duo for their Asian Games Gold and World No. 1 ranking?',
    questionHi: 'मेजर ध्यानचंद खेल रत्न पुरस्कार 2023 किस बैडमिंटन पुरुष युगल जोड़ी को उनके एशियाई खेलों के स्वर्ण पदक तथा विश्व नंबर 1 रैंकिंग हेतु प्रदान किया गया?',
    optionsEn: [
      'Satwiksairaj Rankireddy and Chirag Shetty',
      'Lakshya Sen and Kidambi Srikanth',
      'P. Gopichand and Chetan Anand',
      'B. Sumeeth Reddy and Manu Attri'
    ],
    optionsHi: [
      'सात्विकसाईराज रंकीरेड्डी एवं चिराग शेट्टी',
      'लक्ष्य सेन एवं किदांबी श्रीकांत',
      'पुलेला गोपीचंद एवं चेतन आनंद',
      'सुमीत रेड्डी एवं मनु अत्री'
    ],
    correctOption: 0,
    explanationEn: 'Satwiksairaj Rankireddy and Chirag Shetty won Asian Games Gold, Indonesia Open Super 1000, and achieved the World No. 1 BWF doubles ranking.',
    explanationHi: 'सात्विकसाईराज और चिराग शेट्टी को देश के सर्वोच्च खेल सम्मान "मेजर ध्यानचंद खेल रत्न" से सम्मानित किया गया।',
    importanceScore: 98,
    tags: ['Khel Ratna', 'Badminton', 'Sports Awards']
  },
  {
    id: 'ca_india_ramsar_wetlands_count',
    dateKey: '2024-02-02',
    category: 'national',
    questionEn: 'On World Wetlands Day 2024, India added 5 new Ramsar sites, bringing its total Ramsar Wetlands network to 80 (and later 85). Which state has the highest number of Ramsar sites in India?',
    questionHi: 'विश्व आर्द्रभूमि दिवस पर नए रामसार स्थलों के जुड़ने के साथ भारत के रामसार स्थलों का नेटवर्क 80 से अधिक हो गया। भारत में सर्वाधिक रामसार स्थल किस राज्य में स्थित हैं?',
    optionsEn: [
      'Tamil Nadu (16 Ramsar sites)',
      'Uttar Pradesh (10 Ramsar sites)',
      'Rajasthan (2 Ramsar sites)',
      'Kerala (3 Ramsar sites)'
    ],
    optionsHi: [
      'तमिलनाडु (16 रामसार स्थल)',
      'उत्तर प्रदेश (10 रामसार स्थल)',
      'राजस्थान (2 रामसार स्थल)',
      'केरल (3 रामसार स्थल)'
    ],
    correctOption: 0,
    explanationEn: 'Tamil Nadu leads India with 16 Ramsar Wetland sites, followed by Uttar Pradesh with 10. Rajasthan has 2 sites: Keoladeo Ghana and Sambhar Lake.',
    explanationHi: 'देश में सर्वाधिक 16 रामसार स्थल तमिलनाडु में हैं, दूसरे स्थान पर उत्तर प्रदेश (10) है। राजस्थान में दो स्थल (केवलादेव और सांभर) हैं।',
    importanceScore: 97,
    tags: ['Ramsar Sites', 'Wetlands', 'Environment']
  },
  {
    id: 'ca_raj_desert_cyclone_exercise',
    dateKey: '2024-01-15',
    category: 'rajasthan',
    questionEn: 'The first edition of India-UAE joint military exercise Desert Cyclone 2024 was conducted at which military firing range in Rajasthan?',
    questionHi: 'भारत और संयुक्त अरब अमीरात (UAE) के मध्य प्रथम संयुक्त सैन्य अभ्यास "डेजर्ट साइक्लोन 2024" राजस्थान के किस सैन्य क्षेत्र में आयोजित किया गया?',
    optionsEn: [
      'Mahajan Field Firing Range, Bikaner',
      'Pokaran Firing Range, Jaisalmer',
      'Suratgarh Firing Range, Sri Ganganagar',
      'Nasirabad Cantonment, Ajmer'
    ],
    optionsHi: [
      'महाजन फील्ड फायरिंग रेंज, बीकानेर',
      'पोकरण फील्ड फायरिंग रेंज, जैसलमेर',
      'सूरतगढ़ फायरिंग रेंज, श्रीगंगानगर',
      'नसीराबाद छावनी, अजमेर'
    ],
    correctOption: 0,
    explanationEn: 'Exercise Desert Cyclone 2024 was the inaugural joint army drill between India and UAE held from 2 to 15 January 2024 at Mahajan in Bikaner.',
    explanationHi: 'भारत-यूएई का पहला संयुक्त सैन्य अभ्यास "डेजर्ट साइक्लोन" 2 से 15 जनवरी 2024 को महाजन (बीकानेर) में आयोजित हुआ।',
    importanceScore: 97,
    tags: ['Desert Cyclone', 'Military Exercise', 'Bikaner']
  },
  {
    id: 'ca_sports_olympics_manu_bhaker',
    dateKey: '2024-08-01',
    category: 'sports_awards',
    questionEn: 'Manu Bhaker created history at the Paris 2024 Olympics as the first athlete in independent India history to achieve what Olympic distinction?',
    questionHi: 'मनु भाकर ने पेरिस 2024 ओलंपिक में कौन सी ऐतिहासिक उपलब्धि हासिल कर स्वतंत्र भारत के इतिहास में नया कीर्तिमान रचा?',
    optionsEn: [
      'Winning two Olympic medals in a single edition of the Olympic Games (Bronze in Women 10m Air Pistol & Mixed Team 10m Pistol)',
      'First woman to win a gold in wrestling',
      'Youngest Indian to win 3 medals',
      'First Indian to break an Olympic record in shooting'
    ],
    optionsHi: [
      'एक ही ओलंपिक खेलों में दो पदक जीतने वाली स्वतंत्र भारत की पहली एथलीट (10 मी. एयर पिस्टल एकल व मिश्रित टीम में कांस्य)',
      'कुश्ती में स्वर्ण जीतने वाली पहली महिला',
      '3 पदक जीतने वाली सबसे युवा भारतीय',
      'निशानेबाजी में ओलंपिक रिकॉर्ड तोड़ने वाली पहली भारतीय'
    ],
    correctOption: 0,
    explanationEn: 'Manu Bhaker won 2 Bronze medals at Paris 2024 (Individual 10m Air Pistol and Mixed Team with Sarabjot Singh), becoming the first Indian since 1900 to win two medals at one Olympics.',
    explanationHi: 'मनु भाकर ने पेरिस 2024 में 2 कांस्य पदक जीतकर स्वतंत्र भारत के इतिहास में एक ही ओलंपिक में 2 पदक जीतने वाली पहली खिलाड़ी बनीं।',
    importanceScore: 99,
    tags: ['Paris 2024', 'Manu Bhaker', 'Olympics']
  },
  {
    id: 'ca_raj_lpg_450_subsidy',
    dateKey: '2024-01-01',
    category: 'rajasthan',
    questionEn: 'In Rajasthan, under the state budget decisions of 2024, at what subsidized rate are domestic LPG gas cylinders being provided to eligible Ujjwala and BPL families?',
    questionHi: 'राजस्थान में 2024 के बजट निर्णयों के अनुसार उज्ज्वला योजना एवं बीपीएल श्रेणी के पात्र परिवारों को घरेलू एलपीजी गैस सिलेंडर किस रियायती दर पर दिया जा रहा है?',
    optionsEn: [
      '₹450 per cylinder (₹450 में एलपीजी सिलेंडर)',
      '₹500 per cylinder',
      '₹400 per cylinder',
      '₹350 per cylinder'
    ],
    optionsHi: [
      '₹450 प्रति सिलेंडर',
      '₹500 प्रति सिलेंडर',
      '₹400 प्रति सिलेंडर',
      '₹350 प्रति सिलेंडर'
    ],
    correctOption: 0,
    explanationEn: 'Government of Rajasthan provides domestic LPG cylinders to PM Ujjwala Yojana beneficiaries and BPL ration card holders at the subsidized price of ₹450.',
    explanationHi: 'राजस्थान सरकार द्वारा उज्ज्वला एवं बीपीएल परिवारों को ₹450 प्रति सिलेंडर की रियायती दर पर रसोई गैस उपलब्ध कराई जा रही है।',
    importanceScore: 98,
    tags: ['LPG Subsidy', 'Rajasthan Budget', 'Welfare']
  }
];

export interface DynamicCATemplate {
  correctOption?: number;
  key: string;
  category: string;
  subtopic: string;
  score: number;
  enQ: string;
  hiQ: string;
  optsEn: [string, string, string, string];
  optsHi: [string, string, string, string];
  expEn: string;
  expHi: string;
}

export const DYNAMIC_TEMPLATES: DynamicCATemplate[] = [
  {
    key: 'ca_dyn_solar_bhadla',
    category: 'rajasthan',
    subtopic: 'Renewable Energy',
    score: 99,
    enQ: 'Which solar park in Rajasthan with 2,245 MW capacity in Phalodi district is celebrated as one of the largest operational solar parks in the world?',
    hiQ: 'फलोदी जिले में 2,245 मेगावाट क्षमता वाला राजस्थान का कौन सा सोलर पार्क विश्व के सबसे बड़े संचालित सोलर पार्कों में से एक है?',
    optsEn: ['Bhadla Solar Park (Phalodi)', 'Nokh Solar Park (Jaisalmer)', 'Pugal Solar Park (Bikaner)', 'Fatehgarh Solar Park'],
    optsHi: ['भड़ला सोलर पार्क (फलोदी)', 'नोख सोलर पार्क (जैसलमेर)', 'पूगल सोलर पार्क (बीकानेर)', 'फतेहगढ़ सोलर पार्क'],
    expEn: 'Bhadla Solar Park in Phalodi has an operational capacity of 2,245 MW across 4 phases, propelling Rajasthan to rank 1 in solar power in India.',
    expHi: 'फलोदी का भड़ला सोलर पार्क 2,245 मेगावाट क्षमता के साथ विश्व का प्रमुख सौर पार्क है जिसने राजस्थान को सौर ऊर्जा में देश में प्रथम बनाया।'
  },
  {
    key: 'ca_dyn_solar_nokh',
    category: 'rajasthan',
    subtopic: 'Renewable Energy',
    score: 97,
    enQ: 'In Jaisalmer district, which 925 MW capacity ultra-mega solar project was developed by Rajasthan Solar Park Development Company Limited (RSDCL)?',
    hiQ: 'जैसलमेर जिले में राजस्थान सोलर पार्क डेवलपमेंट कंपनी लिमिटेड द्वारा 925 मेगावाट क्षमता की कौन सी अल्ट्रा मेगा सोलर परियोजना विकसित की गई?',
    optsEn: ['Nokh Solar Park (नोख सोलर पार्क)', 'Bhadla Solar Park', 'Rawatbhata Solar Park', 'Kolayat Solar Park'],
    optsHi: ['नोख सोलर पार्क (Nokh Solar Park)', 'भड़ला सोलर पार्क', 'रावतभाटा सोलर पार्क', 'कोलायत सोलर पार्क'],
    expEn: 'Nokh Solar Park in Jaisalmer has a capacity of 925 MW developed by RSDCL.',
    expHi: 'जैसलमेर का नोख सोलर पार्क 925 मेगावाट क्षमता की प्रमुख सौर ऊर्जा परियोजना है।'
  },
  {
    key: 'ca_dyn_solar_pugal',
    category: 'rajasthan',
    subtopic: 'Renewable Energy',
    score: 96,
    enQ: 'A mega 1,450 MW Solar Park is being developed in Bikaner district as a joint venture between Coal India Limited and RVUNL at which location?',
    hiQ: 'बीकानेर जिले में कोल इंडिया लिमिटेड तथा राजस्थान राज्य विद्युत उत्पादन निगम के संयुक्त उपक्रम द्वारा 1,450 मेगावाट का विशाल सोलर पार्क कहाँ स्थापित किया जा रहा है?',
    optsEn: ['Pugal (पूगल, बीकानेर)', 'Nokh', 'Lunkaransar', 'Napasar'],
    optsHi: ['पूगल (Pugal, Bikaner)', 'नोख', 'लूणकरणसर', 'नापासर'],
    expEn: 'Pugal Solar Park in Bikaner has 1,450 MW capacity set up jointly with Coal India.',
    expHi: 'बीकानेर के पूगल में कोल इंडिया और आरवीयूएनएल द्वारा 1,450 मेगावाट का सोलर पार्क विकसित किया जा रहा है।'
  },
  {
    key: 'ca_dyn_water_ercp_details',
    category: 'rajasthan',
    subtopic: 'Water Resources',
    score: 99,
    enQ: 'Under the modified PKC-ERCP link project, surplus water from which major river basin will be transferred to sub-basins of eastern Rajasthan?',
    hiQ: 'संशोधित पार्वती-कालीसिंध-चंबल (PKC-ERCP) लिंक परियोजना के अंतर्गत किस प्रमुख नदी बेसिन के अधिशेष जल को पूर्वी राजस्थान के उप-बेसिनों में स्थानांतरित किया जाएगा?',
    optsEn: ['Chambal River Basin (चंबल नदी बेसिन)', 'Luni River Basin', 'Mahi River Basin', 'Sabarmati River Basin'],
    optsHi: ['चंबल नदी बेसिन (Chambal Basin)', 'लूनी बेसिन', 'माही बेसिन', 'साबरमती बेसिन'],
    expEn: 'The project utilizes surplus monsoon water from the Chambal basin including Kunno, Kul, Parbati, Kalisindh and Mez rivers.',
    expHi: 'यह परियोजना चंबल और उसकी सहायक नदियों (पार्वती, कालीसिंध, कुनो) के वर्षाकालीन अधिशेष जल को पूर्वी राजस्थान के 13 जिलों में पहुंचाएगी।'
  },
  {
    key: 'ca_dyn_water_narmada_silu',
    category: 'rajasthan',
    subtopic: 'Water Resources',
    score: 97,
    enQ: 'At which village in Sanchore (formerly Jalore) does the Narmada Canal enter Rajasthan, featuring mandatory sprinkler/drip irrigation across its entire command area?',
    hiQ: 'सांचौर (पूर्व जालौर) के किस गांव से नर्मदा नहर राजस्थान में प्रवेश करती है, जिसके संपूर्ण कमान क्षेत्र में फव्वारा (स्प्रिंकलर) सिंचाई प्रणाली अनिवार्य है?',
    optsEn: ['Silu village (सीलू गांव)', 'Khandu village', 'Chaurasigarh', 'Bhaloji'],
    optsHi: ['सीलू गांव (Silu Village)', 'खांदू गांव', 'चौरासीगढ़', 'भालोजी'],
    expEn: 'Narmada Canal enters Rajasthan at Silu village in Sanchore. It is India first irrigation project with 100% mandatory pressurized micro-irrigation.',
    expHi: 'नर्मदा नहर सीलू गांव से प्रवेश करती है। यह देश की प्रथम ऐसी परियोजना है जहाँ ड्रिप/स्प्रिंकलर सिंचाई अनिवार्य है।'
  },
  {
    key: 'ca_dyn_sports_krishna_nagar',
    category: 'sports_awards',
    subtopic: 'Sports Champions',
    score: 97,
    enQ: 'Krishna Nagar of Jaipur, honored with Major Dhyan Chand Khel Ratna Award, won the Paralympic Gold Medal in which badminton classification?',
    hiQ: 'मेजर ध्यानचंद खेल रत्न से सम्मानित जयपुर के कृष्णा नागर ने टोक्यो पैरालंपिक में बैडमिंटन की किस श्रेणी में स्वर्ण पदक जीता था?',
    optsEn: ['Men Singles SH6 (पुरुष एकल SH6 - शॉर्ट कद)', 'Men Singles SL3', 'Men Singles SL4', 'Men Doubles'],
    optsHi: ['पुरुष एकल SH6 श्रेणी (Men Singles SH6)', 'पुरुष एकल SL3', 'पुरुष एकल SL4', 'पुरुष युगल'],
    expEn: 'Krishna Nagar won Gold in Para-badminton Men Singles SH6 at Tokyo Paralympics.',
    expHi: 'कृष्णा नागर ने टोक्यो पैरालंपिक में बैडमिंटन SH6 स्पर्धा में स्वर्ण पदक जीता था।'
  },
  {
    key: 'ca_dyn_sports_devendra_pci',
    category: 'sports_awards',
    subtopic: 'Sports Administration',
    score: 98,
    enQ: 'Two-time Paralympic Javelin Gold medalist Devendra Jhajharia of Churu (Rajasthan) was elected unanimously in March 2024 to which apex post?',
    hiQ: 'मार्च 2024 में चूरू (राजस्थान) के दो बार के पैरालंपिक भाला फेंक स्वर्ण पदक विजेता देवेंद्र झाझड़िया को निर्विरोध किस शीर्ष पद पर चुना गया?',
    optsEn: ['President, Paralympic Committee of India (PCI)', 'President, Indian Olympic Association', 'Secretary, Sports Authority of India', 'President, Athletics Federation of India'],
    optsHi: ['अध्यक्ष, भारतीय पैरालंपिक समिति (PCI)', 'अध्यक्ष, भारतीय ओलंपिक संघ', 'महानिदेशक, भारतीय खेल प्राधिकरण', 'अध्यक्ष, भारतीय एथलेटिक्स महासंघ'],
    expEn: 'Padma Bhushan Devendra Jhajharia was elected President of the Paralympic Committee of India (PCI), succeeding Deepa Malik.',
    expHi: 'पद्म भूषण देवेंद्र झाझड़िया को निर्विरोध भारतीय पैरालंपिक समिति (PCI) का नया अध्यक्ष चुना गया।'
  },
  {
    key: 'ca_dyn_scheme_lakhpati_didi',
    category: 'rajasthan',
    subtopic: 'Welfare Schemes',
    score: 97,
    enQ: 'What is the primary objective of the Lakhpati Didi scheme actively implemented across Rajasthan through Self-Help Groups (SHGs)?',
    hiQ: 'राजस्थान में स्वयं सहायता समूहों (SHGs) के माध्यम से संचालित लखपति दीदी योजना का मुख्य उद्देश्य क्या है?',
    optsEn: ['To empower rural women to achieve a sustainable annual household income of at least ₹1 Lakh', 'To provide ₹1 Lakh cash grant on girl birth', 'To distribute free smartphones', 'To waive bank loans up to ₹1 Lakh'],
    optsHi: ['ग्रामीण महिलाओं को कौशल प्रशिक्षण देकर उनकी न्यूनतम वार्षिक पारिवारिक आय ₹1 लाख तक पहुंचाना', 'बालिका जन्म पर ₹1 लाख का नकद अनुदान देना', 'निःशुल्क स्मार्टफोन वितरित करना', '₹1 लाख तक के कृषि ऋण माफ करना'],
    expEn: 'The Lakhpati Didi initiative aims to enable SHG women to earn a sustainable income of at least ₹1 Lakh annually through diversified micro-enterprises.',
    expHi: 'लखपति दीदी योजना का लक्ष्य महिला स्वयं सहायता समूहों को आजीविका संवर्धन से जोड़कर उनकी वार्षिक आय 1 लाख रुपये से अधिक करना है।'
  },
  {
    key: 'ca_dyn_infra_pm_mitra',
    category: 'rajasthan',
    subtopic: 'Industrial Infrastructure',
    score: 98,
    enQ: 'Under the PM MITRA scheme, a Mega Integrated Textile Region and Apparel Park is being developed in Rajasthan at which location in Jodhpur district?',
    hiQ: 'पीएम मित्रा (PM MITRA) योजना के अंतर्गत राजस्थान में जोधपुर जिले के किस स्थान पर मेगा टेक्सटाइल पार्क स्थापित किया जा रहा है?',
    optsEn: ['Kakani, Jodhpur (कांकाणी, जोधपुर)', 'Boranada, Jodhpur', 'Mandore, Jodhpur', 'Pipar, Jodhpur'],
    optsHi: ['कांकाणी (Kakani, Jodhpur)', 'बोरानाडा (जोधपुर)', 'मंडोर (जोधपुर)', 'पीपाड़ (जोधपुर)'],
    expEn: 'The PM MITRA Mega Textile Park is being established over 1,000 acres at Kakani in Jodhpur with an investment exceeding ₹10,000 crore.',
    expHi: 'कांकाणी (जोधपुर) में 1,000 एकड़ भूमि पर आधुनिक टेक्सटाइल पार्क विकसित किया जा रहा है।'
  },
  {
    key: 'ca_dyn_energy_green_hydrogen',
    category: 'rajasthan',
    subtopic: 'Renewable Energy',
    score: 97,
    enQ: 'Under the Rajasthan Green Hydrogen Policy 2023, what annual green hydrogen production capacity target has been set for the state by the year 2030?',
    hiQ: 'राजस्थान ग्रीन हाइड्रोजन नीति 2023 के तहत राज्य में वर्ष 2030 तक प्रतिवर्ष कितने ग्रीन हाइड्रोजन उत्पादन का लक्ष्य निर्धारित किया गया है?',
    optsEn: ['2,000 KTPA (2,000 किलो टन प्रति वर्ष)', '500 KTPA', '5,000 KTPA', '1,000 KTPA'],
    optsHi: ['2,000 KTPA (2,000 किलो टन प्रति वर्ष)', '500 KTPA', '5,000 KTPA', '1,000 KTPA'],
    expEn: 'Notified in Sept 2023, Rajasthan Green Hydrogen Policy targets 2,000 KTPA clean energy capacity by 2030.',
    expHi: 'राजस्थान ग्रीन हाइड्रोजन नीति 2023 में 2030 तक 2,000 केटीपीए उत्पादन का लक्ष्य है।'
  },
  {
    key: 'ca_dyn_space_xposat',
    category: 'national',
    subtopic: 'Space Exploration',
    score: 98,
    enQ: 'Launched by ISRO on 1 January 2024 via PSLV-C58, what is the scientific objective of the XPoSat (X-ray Polarimeter Satellite) mission?',
    hiQ: '1 जनवरी 2024 को इसरो द्वारा पीएसएलवी-सी58 से प्रक्षेपित एक्सपोसेट (XPoSat) उपग्रह का मुख्य वैज्ञानिक उद्देश्य क्या है?',
    optsEn: ['To measure the polarization of cosmic X-rays from black holes, neutron stars, and pulsars', 'To map lunar water ice deposits', 'To track solar flare coronal emissions', 'To monitor global atmospheric greenhouse gases'],
    optsHi: ['ब्लैक होल, न्यूट्रॉन तारों व पल्सर से आने वाली ब्रह्मांडीय एक्स-रे के ध्रुवीकरण (Polarization) का अध्ययन करना', 'चंद्रमा पर जल बर्फ के भंडारों का मानचित्रण', 'सौर ज्वालाओं के उत्सर्जन का अध्ययन', 'वैश्विक ग्रीनहाउस गैसों की निगरानी'],
    expEn: 'XPoSat is India first dedicated polarimetry mission to study extreme cosmic environments, making India the 2nd country after NASA to operate an X-ray polarimeter in space.',
    expHi: 'एक्सपोसेट भारत का पहला तथा नासा के बाद विश्व का दूसरा समर्पित उपग्रह है जो ब्लैक होल व न्यूट्रॉन तारों की एक्स-रे ध्रुवीकरण का अध्ययन करता है।'
  },
  {
    key: 'ca_dyn_act_nari_shakti',
    category: 'national',
    subtopic: 'Constitutional Law',
    score: 99,
    enQ: 'The 106th Constitutional Amendment Act 2023 (Nari Shakti Vandan Adhiniyam) provides 33% reservation for women in Lok Sabha and Assemblies for how many years initially?',
    hiQ: '106वें संविधान संशोधन अधिनियम 2023 (नारी शक्ति वंदन अधिनियम) के तहत महिलाओं को 33% आरक्षण प्रारंभ में कितने वर्षों हेतु प्रदान किया गया है?',
    optsEn: ['15 Years (15 वर्ष की अवधि हेतु)', '10 Years', '25 Years', 'Indefinitely without limit'],
    optsHi: ['15 वर्ष (15 Years)', '10 वर्ष', '25 वर्ष', 'अनिश्चित काल हेतु'],
    expEn: 'Under Article 334A, the 33% reservation for women shall have effect for a period of 15 years from the date of commencement.',
    expHi: 'अनुच्छेद 334A के अनुसार संसद और विधानसभाओं में महिलाओं को दिया गया 33% आरक्षण लागू होने की तिथि से 15 वर्षों तक प्रभावी रहेगा।'
  },
  {
    key: 'ca_dyn_gitag_pichhwai',
    category: 'rajasthan',
    subtopic: 'Art & Heritage',
    score: 97,
    enQ: 'Nathdwara Pichhwai painting, depicting Lord Shrinathji on cloth with natural vegetable colors, is associated with which holy town?',
    hiQ: 'भगवान श्रीनाथजी के बाल स्वरूप को कपड़े पर चित्रित करने वाली प्रसिद्ध नाथद्वारा पिछवाई कला किस पवित्र नगर से संबंधित है?',
    optsEn: ['Nathdwara, Rajsamand (नाथद्वारा, राजसमंद)', 'Kishangarh, Ajmer', 'Shahpura, Bhilwara', 'Amer, Jaipur'],
    optsHi: ['नाथद्वारा (राजसमंद)', 'किशनगढ़ (अजमेर)', 'शाहपुरा (भीलवाड़ा)', 'आमेर (जयपुर)'],
    expEn: 'Nathdwara Pichhwai painting was awarded the GI tag in 2023.',
    expHi: 'नाथद्वारा की पिछवाई कला को 2023 में आधिकारिक जीआई टैग मिला।'
  },
  {
    key: 'ca_dyn_gitag_bandhej',
    category: 'rajasthan',
    subtopic: 'Handicrafts',
    score: 96,
    enQ: 'The vibrant tie-and-dye craft of Jodhpur Bandhej, celebrated for intricate patterns on silk and cotton, received which official protection in 2023?',
    hiQ: 'जोधपुर की प्रसिद्ध बंधेज (टाई एंड डाई) कला को वर्ष 2023 में कौन सा आधिकारिक संरक्षण प्राप्त हुआ?',
    optsEn: ['Geographical Indication (GI Tag)', 'UNESCO Intangible Heritage', 'National Treasure Status', 'Copyright Protection'],
    optsHi: ['भौगोलिक उपदर्शन (GI Tag)', 'यूनेस्को अमूर्त धरोहर', 'राष्ट्रीय धरोहर दर्जा', 'कॉपीराइट संरक्षण'],
    expEn: 'Jodhpur Bandhej was granted the GI tag by the Geographical Indications Registry in 2023.',
    expHi: 'जोधपुर बंधेज को 2023 में चेन्नई स्थित जीआई रजिस्ट्री द्वारा जीआई टैग दिया गया।'
  },
  {
    key: 'ca_dyn_water_bisalpur',
    category: 'rajasthan',
    subtopic: 'Water Resources',
    score: 98,
    enQ: 'Constructed across the Banas river at Toda Rai Singh in Tonk district, which major gravity dam serves as the primary drinking water lifeline for Jaipur and Ajmer?',
    hiQ: 'टोंक जिले के टोडारायसिंह में बनास नदी पर निर्मित कौन सा प्रमुख बांध जयपुर एवं अजमेर की मुख्य पेयजल जीवन रेखा है?',
    optsEn: ['Bisalpur Dam (बीसलपुर बांध)', 'Meja Dam', 'Jawahar Sagar Dam', 'Rana Pratap Sagar Dam'],
    optsHi: ['बीसलपुर बांध (Bisalpur Dam)', 'मेजा बांध', 'जवाहर सागर बांध', 'राणा प्रताप सागर बांध'],
    expEn: 'Bisalpur Dam on Banas river supplies drinking water to Jaipur, Ajmer, and Tonk districts.',
    expHi: 'बीसलपुर बांध बनास नदी पर टोंक में स्थित है जो जयपुर और अजमेर का मुख्य पेयजल स्रोत है।'
  },
  {
    key: 'ca_dyn_summit_brics_2024',
    category: 'international',
    subtopic: 'Global Summits',
    score: 97,
    enQ: 'In January 2024, the BRICS multilateral grouping officially inducted which five new member nations into its fold?',
    hiQ: 'जनवरी 2024 में ब्रिक्स (BRICS) समूह ने किन 5 नए देशों को अपने संगठन में औपचारिक रूप से शामिल किया?',
    optsEn: [
      'Egypt, Ethiopia, Iran, Saudi Arabia, and UAE',
      'Argentina, Mexico, Indonesia, Turkey, and Nigeria',
      'Pakistan, Bangladesh, Sri Lanka, Nepal, and Bhutan',
      'Kenya, Ghana, Nigeria, Morocco, and Algeria'
    ],
    optsHi: [
      'मिस्र, इथियोपिया, ईरान, सऊदी अरब एवं संयुक्त अरब अमीरात (UAE)',
      'अर्जेंटीना, मैक्सिको, इंडोनेशिया, तुर्की एवं नाइजीरिया',
      'पाकिस्तान, बांग्लादेश, श्रीलंका, नेपाल एवं भूटान',
      'केन्या, घाना, नाइजीरिया, मोरक्को एवं अल्जीरिया'
    ],
    expEn: 'BRICS expanded from 5 to 10 members in Jan 2024 by admitting Egypt, Ethiopia, Iran, Saudi Arabia, and UAE.',
    expHi: '1 जनवरी 2024 से ब्रिक्स में मिस्र, इथियोपिया, ईरान, सऊदी अरब तथा यूएई 5 नए स्थायी सदस्य बने।'
  }
];

function formatMasterItem(selected: CurrentAffairsItem, seed: number): Question {
  const targetIndex = (seed + 1) % 4;
  const enOpts = [...selected.optionsEn];
  const hiOpts = [...selected.optionsHi];
  
  const tmpEn = enOpts[0];
  const tmpHi = hiOpts[0];
  enOpts[0] = enOpts[targetIndex];
  hiOpts[0] = hiOpts[targetIndex];
  enOpts[targetIndex] = tmpEn;
  hiOpts[targetIndex] = tmpHi;

  return {
    id: selected.id,
    subjectId: 'current_affairs',
    subtopic: selected.category,
    importance: 'HIGH_YIELD',
    importanceScore: selected.importanceScore,
    conceptKey: selected.id,
    question: {
      en: selected.questionEn,
      hi: selected.questionHi
    },
    options: {
      en: enOpts,
      hi: hiOpts
    },
    correctOption: targetIndex,
    explanation: {
      en: selected.explanationEn,
      hi: selected.explanationHi
    },
    tags: ['Current Affairs', ...selected.tags]
  };
}

function formatTemplateItem(template: DynamicCATemplate, seed: number): Question {
  const targetIndex = (seed + 2) % 4;
  const enOpts = [...template.optsEn];
  const hiOpts = [...template.optsHi];

  const tmpEn = enOpts[0];
  const tmpHi = hiOpts[0];
  enOpts[0] = enOpts[targetIndex];
  hiOpts[0] = hiOpts[targetIndex];
  enOpts[targetIndex] = tmpEn;
  hiOpts[targetIndex] = tmpHi;

  return {
    id: `ca_dyn_${template.key}_${seed % 99999}`,
    subjectId: 'current_affairs',
    subtopic: template.subtopic,
    importance: 'HIGH_YIELD',
    importanceScore: template.score,
    conceptKey: template.key,
    question: {
      en: template.enQ,
      hi: template.hiQ
    },
    options: {
      en: enOpts,
      hi: hiOpts
    },
    correctOption: targetIndex,
    explanation: {
      en: template.expEn,
      hi: template.expHi
    },
    tags: ['Live Current Affairs', 'Dynamic', 'High Yield']
  };
}

export function generateDynamicCurrentAffairsQuestion(seed: number = Date.now(), categoryFilter?: string): Question {
  const recentSignatures = getRecentSignatures();
  const recent20 = new Set(recentSignatures.slice(0, 20));

  let pool = DYNAMIC_TEMPLATES;
  if (categoryFilter && categoryFilter !== 'all') {
    const filtered = DYNAMIC_TEMPLATES.filter(t => t.category === categoryFilter);
    if (filtered.length > 0) pool = filtered;
  }

  // Find candidate not in recent 20
  const candidates = pool.filter(t => !recent20.has(t.key));
  if (candidates.length > 0) {
    const chosen = candidates[seed % candidates.length];
    return formatTemplateItem(chosen, seed);
  }

  // Sort by least recently used
  const sorted = [...pool].sort((a, b) => {
    const idxA = recentSignatures.indexOf(a.key);
    const idxB = recentSignatures.indexOf(b.key);
    const posA = idxA === -1 ? 9999 : idxA;
    const posB = idxB === -1 ? 9999 : idxB;
    return posB - posA;
  });

  return formatTemplateItem(sorted[0], seed);
}

/**
 * Get Next Live Current Affairs Question without immediate repetition
 */
export function getLiveCurrentAffairsQuestion(
  seed: number = Date.now(), 
  excludeIds?: Set<string>,
  categoryFilter?: string
): Question {
  const recentSignatures = getRecentSignatures();
  const recent20 = new Set(recentSignatures.slice(0, 20));

  // 1. First check master pool for unseen items that are NOT in recent 20
  const unseensMaster = CURRENT_AFFAIRS_MASTER.filter(m => {
    if (excludeIds && excludeIds.has(m.id)) return false;
    if (recent20.has(m.id)) return false;
    return true;
  });

  if (unseensMaster.length > 0) {
    const selected = unseensMaster[seed % unseensMaster.length];
    return formatMasterItem(selected, seed);
  }

  // 2. Check dynamic templates for unseen items that are NOT in recent 20
  const unseensDynamic = DYNAMIC_TEMPLATES.filter(t => {
    if (excludeIds && excludeIds.has(t.key)) return false;
    if (recent20.has(t.key)) return false;
    return true;
  });

  if (unseensDynamic.length > 0) {
    const selected = unseensDynamic[seed % unseensDynamic.length];
    return formatTemplateItem(selected, seed);
  }

  // 3. Fallback when all items have been seen in this session:
  // Pick from ALL items (master + dynamic) that are NOT in recent 20, sorted by least recently used!
  const combined = [
    ...CURRENT_AFFAIRS_MASTER.map(m => ({ isMaster: true, key: m.id, item: m as any })),
    ...DYNAMIC_TEMPLATES.map(t => ({ isMaster: false, key: t.key, item: t as any }))
  ];

  const notInLast20 = combined.filter(c => !recent20.has(c.key));
  if (notInLast20.length > 0) {
    notInLast20.sort((a, b) => {
      const idxA = recentSignatures.indexOf(a.key);
      const idxB = recentSignatures.indexOf(b.key);
      const posA = idxA === -1 ? 9999 : idxA;
      const posB = idxB === -1 ? 9999 : idxB;
      return posB - posA; // furthest back first
    });
    const chosen = notInLast20[0];
    if (chosen.isMaster) {
      return formatMasterItem(chosen.item, seed);
    } else {
      return formatTemplateItem(chosen.item, seed);
    }
  }

  // 4. Procedural unique fallback with variable seed key
  const base = DYNAMIC_TEMPLATES[seed % DYNAMIC_TEMPLATES.length];
  const uniqueKey = `${base.key}_v_${seed % 100000}`;
  return formatTemplateItem({ ...base, key: uniqueKey }, seed);
}

export function getTodayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getFormattedTodayDate(lang: 'en' | 'hi'): string {
  const d = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', options);
}

export function getDailyCurrentAffairsQuiz(dateStr: string = getTodayDateString()): Question[] {
  return CURRENT_AFFAIRS_MASTER.slice(0, 5).map((item) => ({
    id: `daily_${dateStr}_${item.id}`,
    subjectId: 'current_affairs',
    subtopic: item.category,
    year: 2024,
    importance: 'HIGH_YIELD',
    importanceScore: item.importanceScore,
    conceptKey: item.id,
    question: {
      en: item.questionEn,
      hi: item.questionHi
    },
    options: {
      en: item.optionsEn,
      hi: item.optionsHi
    },
    correctOption: item.correctOption,
    explanation: {
      en: item.explanationEn,
      hi: item.explanationHi
    },
    tags: ['Daily Quiz', ...item.tags]
  }));
}

const CA_QUIZ_STATUS_PREFIX = 'ras_ca_quiz_status_';

export function isTodayQuizCompleted(dateStr: string = getTodayDateString()): boolean {
  try {
    return localStorage.getItem(CA_QUIZ_STATUS_PREFIX + dateStr) !== null;
  } catch {
    return false;
  }
}

export function saveTodayQuizScore(dateStr: string, score: number, total: number): void {
  try {
    localStorage.setItem(CA_QUIZ_STATUS_PREFIX + dateStr, JSON.stringify({ score, total, completedAt: Date.now() }));
  } catch (e) {
    console.error('Failed to save CA quiz score', e);
  }
}

export function getTodayQuizResult(dateStr: string = getTodayDateString()): { score: number; total: number } | null {
  try {
    const raw = localStorage.getItem(CA_QUIZ_STATUS_PREFIX + dateStr);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getTodayNewsCapsules(): DailyNewsCapsule[] {
  return [
    {
      id: 'capsule_1',
      category: 'rajasthan',
      headlineEn: 'PKC-ERCP Joint River Linking Project MoU Ratified',
      headlineHi: 'संशोधित पार्वती-कालीसिंध-चंबल (PKC-ERCP) परियोजना पर सहमति',
      summaryEn: 'Provides assured drinking water and irrigation across 13 eastern districts of Rajasthan.',
      summaryHi: 'राजस्थान के 13 पूर्वी जिलों में पेयजल व 2.8 लाख हेक्टेयर क्षेत्र में सिंचाई की समस्या का समाधान।',
      examTakeawayEn: 'Key RPSC question: 13 beneficiary districts and interlinked Chambal sub-basins.',
      examTakeawayHi: 'परीक्षा में पूछे जाने वाले 13 जिले व चंबल बेसिन की सहायक नदियां।'
    },
    {
      id: 'capsule_2',
      category: 'sports_awards',
      headlineEn: 'Avani Lekhara Creates History at Paris 2024 Paralympics',
      headlineHi: 'अवनि लेखरा: पेरिस पैरालंपिक में स्वर्ण पदक जीतकर रचा इतिहास',
      summaryEn: 'Jaipur rifle shooter scored 249.7 points in 10m Air Rifle Standing SH1 to win Gold.',
      summaryHi: 'जयपुर की निशानेबाज अवनि लेखरा ने 10 मीटर एयर राइफल में पैरालंपिक रिकॉर्ड के साथ स्वर्ण पदक जीता।',
      examTakeawayEn: 'Recipient of Major Dhyan Chand Khel Ratna and Padma Shri from Rajasthan.',
      examTakeawayHi: 'मेजर ध्यानचंद खेल रत्न व पद्मश्री से सम्मानित राजस्थान की बेटी।'
    },
    {
      id: 'capsule_3',
      category: 'national',
      headlineEn: 'Renewable Energy: Rajasthan Leads India in Solar Capacity',
      headlineHi: 'सौर ऊर्जा क्षमता में राजस्थान देश में शीर्ष स्थान पर बरकरार',
      summaryEn: 'Installed capacity crossed 20,000 MW powered by Bhadla Solar Park (2,245 MW).',
      summaryHi: 'राज्य की कुल स्थापित सौर ऊर्जा क्षमता 20,000 मेगावाट से अधिक हो गई है। भड़ला विश्व का प्रमुख सोलर पार्क है।',
      examTakeawayEn: 'Rajasthan Solar Energy Policy targets 30 GW by 2025 and 90 GW by 2030.',
      examTakeawayHi: 'राजस्थान सौर ऊर्जा नीति का लक्ष्य 2030 तक 90 GW स्थापित करना है।'
    }
  ];
}
