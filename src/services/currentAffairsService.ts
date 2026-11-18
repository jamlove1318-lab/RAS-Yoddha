import { Question } from '../types';

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
  dateKey: string; // YYYY-MM-DD
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

/**
 * Curated repository of High-Yield RPSC RAS Current Affairs Items
 * (Rajasthan Sujas, Budget, Schemes, Appointments, Sports, National & Global Summits)
 */
const CURRENT_AFFAIRS_MASTER: CurrentAffairsItem[] = [
  // 1. Rajasthan Schemes & Infrastructure
  {
    id: 'ca_raj_ercp_mou',
    dateKey: '2024-01-28',
    category: 'Rajasthan Infrastructure & Water',
    questionEn: 'Under the Modified PKC-ERCP (Parbati-Kalisindh-Chambal Eastern Rajasthan Canal Project) tripartite agreement, which two states signed the historic MoU with the Union Jal Shakti Ministry?',
    questionHi: 'संशोधित पार्वती-कालीसिंध-चंबल (PKC-ERCP) लिंक परियोजना के त्रिपक्षीय समझौते के अंतर्गत किन दो राज्यों ने केंद्रीय जल शक्ति मंत्रालय के साथ ऐतिहासिक समझौता ज्ञापन (MoU) पर हस्ताक्षर किए?',
    optionsEn: [
      'Rajasthan and Madhya Pradesh (राजस्थान एवं मध्य प्रदेश)',
      'Rajasthan and Gujarat (राजस्थान एवं गुजरात)',
      'Rajasthan and Haryana (राजस्थान एवं हरियाणा)',
      'Rajasthan and Uttar Pradesh (राजस्थान एवं उत्तर प्रदेश)'
    ],
    optionsHi: [
      'राजस्थान एवं मध्य प्रदेश',
      'राजस्थान एवं गुजरात',
      'राजस्थान एवं हरियाणा',
      'राजस्थान एवं उत्तर प्रदेश'
    ],
    correctOption: 0,
    explanationEn: 'On 28 January 2024, Rajasthan and Madhya Pradesh signed a historic tripartite MoU with the Union Jal Shakti Ministry for the modified Parbati-Kalisindh-Chambal inter-state river link project (integrated with ERCP) to provide drinking & irrigation water to 13 districts of eastern Rajasthan and Malwa/Chambal regions of MP.',
    explanationHi: '28 जनवरी 2024 को राजस्थान और मध्य प्रदेश ने केंद्र सरकार के साथ संशोधित पार्वती-कालीसिंध-चंबल लिंक परियोजना (ERCP) के लिए समझौता ज्ञापन पर हस्ताक्षर किए, जिससे राजस्थान के 13 जिलों को पेयजल व सिंचाई सुविधा मिलेगी।',
    importanceScore: 99,
    tags: ['ERCP', 'Chambal', 'Rajasthan Schemes', 'High Yield']
  },
  {
    id: 'ca_raj_annapurna_rasoi',
    dateKey: '2024-01-01',
    category: 'Rajasthan Welfare Schemes',
    questionEn: 'In Rajasthan, what is the new name given to the "Indira Rasoi Yojana", and what is the enhanced state government subsidy per thali provided under it?',
    questionHi: 'राजस्थान में "इंदिरा रसोई योजना" का नाम बदलकर क्या किया गया है, तथा इसके तहत राज्य सरकार द्वारा प्रति थाली दिया जाने वाला अनुदान बढ़ाकर कितना कर दिया गया है?',
    optionsEn: [
      'Shri Annapurna Rasoi Yojana (Subsidy: ₹22 per thali, meal cost to beneficiary: ₹8)',
      'Atal Annapurna Rasoi Yojana (Subsidy: ₹25 per thali, meal cost: ₹10)',
      'Mukhyamantri Bhojan Yojana (Subsidy: ₹20 per thali, meal cost: ₹5)',
      'Rajasthan Annapurna Thali Yojana (Subsidy: ₹18 per thali, meal cost: ₹8)'
    ],
    optionsHi: [
      'श्री अन्नपूर्णा रसोई योजना (अनुदान: ₹22 प्रति थाली, लाभार्थी मूल्य: ₹8)',
      'अटल अन्नपूर्णा रसोई योजना (अनुदान: ₹25 प्रति थाली, मूल्य: ₹10)',
      'मुख्यमंत्री भोजन योजना (अनुदान: ₹20 प्रति थाली, मूल्य: ₹5)',
      'राजस्थान अन्नपूर्णा थाली योजना (अनुदान: ₹18 प्रति थाली, मूल्य: ₹8)'
    ],
    correctOption: 0,
    explanationEn: 'The scheme was renamed as "Shri Annapurna Rasoi Yojana" with food quantity increased from 450 grams to 600 grams per thali. The state subsidy was enhanced from ₹17 to ₹22 per thali while keeping the beneficiary charge unchanged at ₹8.',
    explanationHi: 'योजना का नाम बदलकर "श्री अन्नपूर्णा रसोई योजना" किया गया। प्रति थाली भोजन की मात्रा 450 ग्राम से बढ़ाकर 600 ग्राम की गई और राज्य सरकार का अनुदान ₹17 से बढ़ाकर ₹22 प्रति थाली किया गया (लाभार्थी हेतु ₹8 यथावत)।',
    importanceScore: 96,
    tags: ['Annapurna Rasoi', 'Sujas', 'Welfare']
  },
  {
    id: 'ca_raj_gi_tags',
    dateKey: '2024-02-15',
    category: 'Art, Culture & GI Tags',
    questionEn: 'Which of the following handicrafts of Rajasthan was awarded the Geographical Indication (GI) Tag by the Geographical Indications Registry in Chennai?',
    questionHi: 'चेन्नई स्थित जीआई रजिस्ट्री द्वारा हाल ही में राजस्थान के किस प्रसिद्ध हस्तशिल्प को भौगोलिक उपदर्शन (GI Tag) प्रदान किया गया?',
    optionsEn: [
      'Nathdwara Pichhwai Craft, Udaipur Koftgari Metal Craft, Bikaner Kashidakari & Bikaner Usta Kala Craft',
      'Barmer Ajrakh Print and Kota Doria Sarees only',
      'Jaipur Blue Pottery and Sanganeri Handblock only',
      'Thewa Craft and Pokhran Pottery only'
    ],
    optionsHi: [
      'नाथद्वारा की पिछवाई कला, उदयपुर की कोफ्तगारी मेटल क्राफ्ट, बीकानेर कशीदाकारी एवं बीकानेर उस्ता कला',
      'केवल बाड़मेर अजरक प्रिंट और कोटा डोरिया',
      'केवल जयपुर ब्लू पॉटरी और सांगानेरी प्रिंट',
      'केवल थेवा कला और पोकरण पॉटरी'
    ],
    correctOption: 0,
    explanationEn: 'Five traditional handicrafts from Rajasthan received GI tags in a single phase: Nathdwara Pichhwai painting, Udaipur Koftgari metal craft, Bikaner Kashidakari embroidery, Bikaner Usta Kala craft (camel leather gilding), and Jodhpur Bandhej craft.',
    explanationHi: 'राजस्थान के 5 पारम्परिक हस्तशिल्पों को एक साथ जीआई टैग प्रदान किया गया: नाथद्वारा की पिछवाई कला, उदयपुर की कोफ्तगारी धातु शिल्प, बीकानेर की कशीदाकारी, बीकानेर की उस्ता कला तथा जोधपुर बंधेज शिल्प।',
    importanceScore: 98,
    tags: ['GI Tag', 'Pichhwai', 'Usta Kala', 'Koftgari']
  },
  {
    id: 'ca_raj_solar_parks',
    dateKey: '2024-03-10',
    category: 'Energy & Economic Survey',
    questionEn: 'According to the Ministry of New and Renewable Energy (MNRE), what is Rajasthan’s rank in total installed solar power generation capacity in India?',
    questionHi: 'नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE) के अद्यतन आंकड़ों के अनुसार भारत में कुल स्थापित सौर ऊर्जा उत्पादन क्षमता में राजस्थान का कौन सा स्थान है?',
    optionsEn: [
      'First Rank (>20,000 MW installed capacity)',
      'Second Rank (Behind Gujarat)',
      'Third Rank (Behind Tamil Nadu & Karnataka)',
      'Fourth Rank'
    ],
    optionsHi: [
      'प्रथम स्थान (20,000 मेगावाट से अधिक स्थापित क्षमता के साथ शीर्ष राज्य)',
      'द्वितीय स्थान (गुजरात के बाद)',
      'तृतीय स्थान',
      'चतुर्थ स्थान'
    ],
    correctOption: 0,
    explanationEn: 'Rajasthan stands First in India in installed solar power capacity with over 20,000 MW installed, backed by the Bhadla Solar Park (2,245 MW in Phalodi/Jodhpur), one of the world\'s largest solar parks.',
    explanationHi: 'राजस्थान 20,000 मेगावाट से अधिक स्थापित सौर ऊर्जा क्षमता के साथ पूरे देश में प्रथम स्थान पर है। फलोदी में स्थित भड़ला सोलर पार्क (2,245 मेगावाट) विश्व के सबसे बड़े सौर ऊर्जा पार्कों में से एक है।',
    importanceScore: 97,
    tags: ['Solar Energy', 'Bhadla', 'Economic Survey']
  },
  {
    id: 'ca_raj_ayushman_arogya',
    dateKey: '2024-04-05',
    category: 'Health Welfare Schemes',
    questionEn: 'Under the renamed "Ayushman Bharat - Mukhyamantri Ayushman Arogya Yojana (MAA Yojana)" in Rajasthan, which cancer treatment and IPD medical coverage is provided?',
    questionHi: 'राजस्थान में "आयुष्मान भारत - मुख्यमंत्री आयुष्मान आरोग्य योजना (माँ योजना)" के तहत लाभार्थियों को क्या स्वास्थ्य बीमा एवं चिकित्सा सुविधा उपलब्ध कराई जा रही है?',
    optionsEn: [
      'Cashless in-patient treatment across empaneled government & private hospitals with free medicine and diagnostic tests',
      'Only OPD consultation reimbursement up to ₹5,000',
      'Coverage limited strictly to state government hospitals only',
      'Life insurance coverage of ₹2 Lakh on natural death'
    ],
    optionsHi: [
      'संबद्ध सरकारी एवं निजी अस्पतालों में कैशलेस इन-डोर उपचार, निःशुल्क दवाइयां एवं जांचें',
      'केवल ₹5,000 तक ओपीडी परामर्श प्रतिपूर्ति',
      'केवल राज्य के सरकारी अस्पतालों तक सीमित',
      'केवल दुर्घटना बीमा'
    ],
    correctOption: 0,
    explanationEn: 'Mukhyamantri Ayushman Arogya Yojana (MAA) provides comprehensive cashless in-patient hospital treatment, packages for critical illnesses including cancer and cardiology across empaneled public & private hospitals along with free OPD medicines under Mukhyamantri Nishulk Dava Yojana.',
    explanationHi: 'मुख्यमंत्री आयुष्मान आरोग्य योजना (माँ योजना) के तहत राज्य के नागरिकों को सम्बद्ध सरकारी एवं निजी अस्पतालों में गंभीर बीमारियों के लिए कैशलेस उपचार व दवाइयां उपलब्ध कराई जाती हैं।',
    importanceScore: 95,
    tags: ['Health Schemes', 'MAA Yojana', 'Rajasthan Health']
  },
  {
    id: 'ca_india_space_aditya',
    dateKey: '2024-01-06',
    category: 'Science & Space Technology',
    questionEn: 'On 6 January 2024, ISRO successfully inserted Aditya-L1 into its final halo orbit around the Sun-Earth L1 point. What is the orbital period of the satellite in this halo orbit?',
    questionHi: '6 जनवरी 2024 को इसरो ने आदित्य-एल1 उपग्रह को सूर्य-पृथ्वी एल1 बिंदु के चारों ओर हेलो ऑर्बिट में सफलतापूर्वक स्थापित किया। इस हेलो कक्षा में उपग्रह का परिक्रमण काल लगभग कितना है?',
    optionsEn: [
      'Approximately 178 days (~6 months)',
      '365 days (1 year)',
      '30 days (1 month)',
      '90 days'
    ],
    optionsHi: [
      'लगभग 178 दिन (लगभग 6 माह)',
      '365 दिन (1 वर्ष)',
      '30 दिन',
      '90 दिन'
    ],
    correctOption: 0,
    explanationEn: 'Aditya-L1 was inserted into a periodic halo orbit around Lagrange Point 1 (L1), roughly 1.5 million km from Earth. The orbital period around L1 in this halo orbit is approximately 177.86 days (~178 days).',
    explanationHi: 'आदित्य-एल1 को 6 जनवरी 2024 को एल1 बिंदु के चारों ओर हेलो कक्षा में प्रवेश कराया गया। इस कक्षा में आदित्य-L1 को एक चक्कर लगाने में लगभग 178 दिन (लगभग 6 महीने) का समय लगता है।',
    importanceScore: 98,
    tags: ['ISRO', 'Aditya L1', 'Space Tech']
  },
  {
    id: 'ca_sports_olympics_raj',
    dateKey: '2024-08-12',
    category: 'Sports & Rajasthan Personalities',
    questionEn: 'Avani Lekhara, who won the Gold Medal in women\'s 10m Air Rifle SH1 at the Paris 2024 Paralympics, belongs to which district of Rajasthan and created which unique record?',
    questionHi: 'पेरिस 2024 पैरालंपिक खेलों में 10 मीटर एयर राइफल (SH1) में स्वर्ण पदक जीतने वाली अवनि लेखरा राजस्थान के किस जिले से हैं तथा उन्होंने क्या ऐतिहासिक रिकॉर्ड बनाया?',
    optionsEn: [
      'Jaipur district; First Indian woman to win two Paralympic Gold Medals (Tokyo 2020 & Paris 2024)',
      'Jodhpur district; First woman to win medals in three Olympic editions',
      'Churu district; First javelin thrower to medal',
      'Sikar district; First Indian archery medalist'
    ],
    optionsHi: [
      'जयपुर जिला; दो पैरालंपिक स्वर्ण पदक (टोक्यो 2020 और पेरिस 2024) जीतने वाली पहली भारतीय महिला',
      'जोधपुर जिला; तीन अलग-अलग खेलों में पदक जीतने वाली',
      'चूरू जिला; भाला फेंक में पदक',
      'सीकर जिला'
    ],
    correctOption: 0,
    explanationEn: 'Avani Lekhara hails from Jaipur, Rajasthan. By winning Gold in women\'s 10m Air Rifle Standing SH1 at Paris 2024 (with a Paralympic record 249.7 points), she became the first Indian woman ever to win two Paralympic Gold medals.',
    explanationHi: 'अवनि लेखरा जयपुर (राजस्थान) की रहने वाली हैं। पेरिस पैरालंपिक 2024 में 249.7 अंक के पैरालंपिक रिकॉर्ड के साथ स्वर्ण जीतकर वे दो पैरालंपिक स्वर्ण पदक (टोक्यो 2020 व पेरिस 2024) जीतने वाली भारत की प्रथम महिला एथलीट बनीं।',
    importanceScore: 100,
    tags: ['Avani Lekhara', 'Paralympics', 'Rajasthan Sports']
  },
  {
    id: 'ca_polity_election_cec',
    dateKey: '2024-03-15',
    category: 'National Polity & Governance',
    questionEn: 'Under the Chief Election Commissioner and other Election Commissioners (Appointment, Conditions of Service and Term of Office) Act, 2023, who chairs the Selection Committee for appointing Election Commissioners?',
    questionHi: 'मुख्य निर्वाचन आयुक्त एवं अन्य निर्वाचन आयुक्त (नियुक्ति, सेवा शर्तें एवं पदावधि) अधिनियम, 2023 के अंतर्गत निर्वाचन आयुक्तों की नियुक्ति हेतु चयन समिति की अध्यक्षता किसके द्वारा की जाती है?',
    optionsEn: [
      'Prime Minister of India (भारत के प्रधानमंत्री)',
      'Chief Justice of India (भारत के मुख्य न्यायाधीश)',
      'President of India (भारत के राष्ट्रपति)',
      'Speaker of Lok Sabha (लोकसभा अध्यक्ष)'
    ],
    optionsHi: [
      'भारत के प्रधानमंत्री',
      'भारत के मुख्य न्यायाधीश',
      'भारत के राष्ट्रपति',
      'लोकसभा अध्यक्ष'
    ],
    correctOption: 0,
    explanationEn: 'Under the new 2023 Act, the Selection Committee is chaired by the Prime Minister of India, with the Leader of the Opposition in Lok Sabha (or leader of largest opposition party) and a Union Cabinet Minister nominated by the PM as members.',
    explanationHi: '2023 के नए अधिनियम के तहत चयन समिति में प्रधानमंत्री (अध्यक्ष), लोकसभा में विपक्ष के नेता तथा प्रधानमंत्री द्वारा नामित एक केंद्रीय कैबिनेट मंत्री सदस्य होते हैं।',
    importanceScore: 97,
    tags: ['Election Commission', 'Polity', 'Governance']
  },
  {
    id: 'ca_raj_invest_summit',
    dateKey: '2024-10-15',
    category: 'Economy & Industry',
    questionEn: 'What was the central theme of the "Rising Rajasthan Global Investment Summit" organized by the Government of Rajasthan in Jaipur?',
    questionHi: 'जयपुर में राजस्थान सरकार द्वारा आयोजित "राइजिंग राजस्थान ग्लोबल इन्वेस्टमेंट समिट" का मुख्य विषय (Theme) क्या था?',
    optionsEn: [
      'Repositioning Rajasthan for Inclusive & Sustainable Growth',
      'Smart Heritage and Green Energy 2030',
      'Rajasthan - The Desert Silicon Valley',
      'Make in Rajasthan for the Globe'
    ],
    optionsHi: [
      'Repositioning Rajasthan for Inclusive & Sustainable Growth (समावेशी और सतत विकास के लिए राजस्थान का नया स्वरूप)',
      'स्मार्ट हेरिटेज एवं ग्रीन एनर्जी 2030',
      'राजस्थान - द डेजर्ट सिलिकॉन वैली',
      'मेक इन राजस्थान'
    ],
    correctOption: 0,
    explanationEn: 'The Rising Rajasthan Global Investment Summit was organized by RIICO and the Industries Department with focus sectors including Renewable Energy, Mines & Minerals, Tourism, Auto & EV components, and IT/ITeS.',
    explanationHi: 'राइजिंग राजस्थान ग्लोबल इन्वेस्टमेंट समिट का उद्देश्य राज्य में नवीकरणीय ऊर्जा, पर्यटन, ऑटोमोबाइल, आईटी एवं खनिज क्षेत्र में घरेलू व विदेशी निवेश को आकर्षित करना था।',
    importanceScore: 96,
    tags: ['Rising Rajasthan', 'Economy', 'RIICO']
  },
  {
    id: 'ca_awards_bharat_ratna',
    dateKey: '2024-02-09',
    category: 'National Honors & Personalities',
    questionEn: 'Which former Prime Minister of India, celebrated as the architect of India\'s 1991 economic liberalization, was conferred the Bharat Ratna (posthumously) in 2024?',
    questionHi: 'भारत के किस पूर्व प्रधानमंत्री, जिन्हें 1991 के आर्थिक उदारीकरण का सूत्रधार माना जाता है, को 2024 में मरणोपरांत भारत रत्न से सम्मानित किया गया?',
    optionsEn: [
      'P. V. Narasimha Rao (पी. वी. नरसिम्हा राव)',
      'Chaudhary Charan Singh (चौधरी चरण सिंह)',
      'Atal Bihari Vajpayee (अटल बिहारी वाजपेयी)',
      'I. K. Gujral (आई. के. गुजराल)'
    ],
    optionsHi: [
      'पी. वी. नरसिम्हा राव',
      'चौधरी चरण सिंह',
      'अटल बिहारी वाजपेयी',
      'आई. के. गुजराल'
    ],
    correctOption: 0,
    explanationEn: 'In 2024, Bharat Ratna was conferred on 5 eminent personalities: Karpoori Thakur, L. K. Advani, P. V. Narasimha Rao (Father of Indian Economic Reforms), Chaudhary Charan Singh (champion of farmers), and Dr. M. S. Swaminathan (Father of Green Revolution).',
    explanationHi: '2024 में 5 विभूतियों को भारत रत्न दिया गया: कर्पूरी ठाकुर, लालकृष्ण आडवाणी, पी. वी. नरसिम्हा राव, चौधरी चरण सिंह तथा डॉ. एम. एस. स्वामीनाथन (हरित क्रांति के जनक)।',
    importanceScore: 99,
    tags: ['Bharat Ratna', 'Awards', 'Modern India']
  },
  {
    id: 'ca_raj_desert_cyclone',
    dateKey: '2024-01-15',
    category: 'Defence Exercises & Rajasthan',
    questionEn: 'Joint Military Exercise "Desert Cyclone" was conducted at Mahajan Field Firing Range in Bikaner, Rajasthan between the armies of India and which foreign country?',
    questionHi: 'भारत और किस देश की सेना के बीच संयुक्त सैन्य अभ्यास "डेजर्ट साइक्लोन" (Desert Cyclone) राजस्थान के बीकानेर स्थित महाजन फील्ड फायरिंग रेंज में आयोजित किया गया?',
    optionsEn: [
      'United Arab Emirates - UAE (संयुक्त अरब अमीरात)',
      'Saudi Arabia (सऊदी अरब)',
      'France (फ्रांस)',
      'Oman (ओमान)'
    ],
    optionsHi: [
      'संयुक्त अरब अमीरात (UAE)',
      'सऊदी अरब',
      'फ्रांस',
      'ओमान'
    ],
    correctOption: 0,
    explanationEn: 'The 1st edition of India-UAE Joint Military Exercise "Desert Cyclone" took place at Mahajan Field Firing Range, Bikaner, Rajasthan from 2 to 15 January 2024 to enhance interoperability in urban desert terrain.',
    explanationHi: 'भारत और यूएई (UAE) की थल सेनाओं के बीच प्रथम संयुक्त सैन्य अभ्यास "डेजर्ट साइक्लोन" 2 से 15 जनवरी 2024 तक महाजन फील्ड फायरिंग रेंज (बीकानेर) में आयोजित किया गया।',
    importanceScore: 96,
    tags: ['Military Exercise', 'Desert Cyclone', 'Mahajan']
  },
  {
    id: 'ca_india_ramsar_wetlands',
    dateKey: '2024-02-02',
    category: 'Environment, Ecology & Wetlands',
    questionEn: 'Which two wetlands from Rajasthan are included in the prestigious Ramsar List of Wetlands of International Importance?',
    questionHi: 'अंतर्राष्ट्रीय महत्व की रामसर आर्द्रभूमि (Ramsar Wetlands) सूची में राजस्थान के कौन से दो स्थल शामिल हैं?',
    optionsEn: [
      'Keoladeo Ghana National Park (Bharatpur) and Sambhar Lake (Jaipur/Nagaur/Ajmer)',
      'Jaisamand Lake and Pichhola Lake',
      'Fateh Sagar and Ana Sagar Lake',
      'Tal Chhapar Sanctuary and Siliserh Lake'
    ],
    optionsHi: [
      'केवलादेव घाना राष्ट्रीय उद्यान (भरतपुर) एवं सांभर झील (जयपुर/नागौर)',
      'जयसमंद झील और पिछोला झील',
      'फतेह सागर और आना सागर',
      'ताल छापर और सिलीसेढ़'
    ],
    correctOption: 0,
    explanationEn: 'Rajasthan has 2 Ramsar sites: Keoladeo National Park (designated in 1981, also on Montreux Record) and Sambhar Salt Lake (designated in 1990). Khichan bird sanctuary and Menar bird village are under active consideration.',
    explanationHi: 'राजस्थान में 2 रामसर आर्द्रभूमि स्थल हैं: 1. केवलादेव घाना राष्ट्रीय उद्यान (1981 में घोषित, मोंट्रेक्स रिकॉर्ड में शामिल) तथा 2. सांभर झील (1990 में घोषित)।',
    importanceScore: 98,
    tags: ['Ramsar Sites', 'Keoladeo', 'Sambhar', 'Ecology']
  }
];

/**
 * Get Today's Date String in standard ISO YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get Formatted Display Date (e.g. "18 November 2024")
 */
export function getFormattedTodayDate(lang: 'en' | 'hi'): string {
  const d = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', options);
}

/**
 * Deterministic PRNG using string hash (e.g. today's date)
 * Ensures every candidate gets the same daily quiz for today,
 * and every new day automatically gets a fresh rotated quiz!
 */
function hashDateToSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Get Today's 10 Daily Current Affairs Questions
 * Refreshes everyday automatically based on the calendar day!
 */
export function getDailyCurrentAffairsQuiz(dateStr: string = getTodayDateString()): Question[] {
  const seed = hashDateToSeed(dateStr);
  const totalAvailable = CURRENT_AFFAIRS_MASTER.length;

  // Shuffle deterministic list based on day seed
  const indices: number[] = [];
  for (let i = 0; i < totalAvailable; i++) {
    indices.push(i);
  }

  // Fisher-Yates shuffle with seed
  for (let i = indices.length - 1; i > 0; i--) {
    const j = (seed + i * 37) % (i + 1);
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  const selectedCount = Math.min(10, totalAvailable);
  const selectedItems = indices.slice(0, selectedCount).map(idx => CURRENT_AFFAIRS_MASTER[idx]);

  return selectedItems.map((item, index) => ({
    id: `daily_${dateStr}_q${index + 1}_${item.id}`,
    subjectId: 'current_affairs',
    subtopic: item.category,
    year: 2024,
    paperName: `Daily Current Affairs - ${dateStr}`,
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
    tags: ['Daily CA', ...item.tags],
    frequencyNote: 'Updated on current daily basis for RPSC Prelims'
  }));
}

/**
 * Today's High-Yield News Capsules for rapid revision
 */
export function getTodayNewsCapsules(): DailyNewsCapsule[] {
  return [
    {
      id: 'capsule_1',
      category: 'rajasthan',
      headlineEn: 'PKC-ERCP Joint River Linking Project MoU Ratified',
      headlineHi: 'संशोधित पार्वती-कालीसिंध-चंबल (PKC-ERCP) परियोजना पर सहमति',
      summaryEn: 'Provides assured drinking water and irrigation across 13 eastern districts of Rajasthan (Kota, Bundi, Baran, Jhalawar, Sawai Madhopur, Ajmer, Tonk, Jaipur, Dausa, Karauli, Alwar, Bharatpur, Dholpur).',
      summaryHi: 'राजस्थान के 13 पूर्वी जिलों में पेयजल व 2.8 लाख हेक्टेयर क्षेत्र में सिंचाई की समस्या के स्थायी समाधान हेतु 280,000 हेक्टेयर में जल आपूर्ति सुनिश्चित होगी।',
      examTakeawayEn: 'Key RPSC question: 13 beneficiary districts and interlinked river basins (Chambal, Kalisindh, Parbati, Kuno, Kul).',
      examTakeawayHi: 'परीक्षा में पूछे जाने वाले 13 जिले व चंबल बेसिन की सहायक नदियां।'
    },
    {
      id: 'capsule_2',
      category: 'sports_awards',
      headlineEn: 'Avani Lekhara Creates History at Paris 2024 Paralympics',
      headlineHi: 'अवनि लेखरा: पेरिस पैरालंपिक में स्वर्ण पदक जीतकर रचा इतिहास',
      summaryEn: 'Jaipur rifle shooter scored 249.7 points in 10m Air Rifle Standing SH1 to become the first Indian woman with two Paralympic Gold medals.',
      summaryHi: 'जयपुर की निशानेबाज अवनि लेखरा ने 10 मीटर एयर राइफल में पैरालंपिक रिकॉर्ड के साथ स्वर्ण पदक जीता।',
      examTakeawayEn: 'Recipient of Major Dhyan Chand Khel Ratna and Padma Shri from Rajasthan.',
      examTakeawayHi: 'मेजर ध्यानचंद खेल रत्न व पद्मश्री से सम्मानित राजस्थान की बेटी।'
    },
    {
      id: 'capsule_3',
      category: 'national',
      headlineEn: 'Renewable Energy: Rajasthan Leads India in Solar Capacity',
      headlineHi: 'सौर ऊर्जा क्षमता में राजस्थान देश में शीर्ष स्थान पर बरकरार',
      summaryEn: 'Installed capacity crossed 20,000 MW, powered by Bhadla Solar Park (2,245 MW, Phalodi) and upcoming mega solar parks in Jaisalmer and Bikaner.',
      summaryHi: 'राज्य की कुल स्थापित सौर ऊर्जा क्षमता 20,000 मेगावाट से अधिक हो गई है। भड़ला (फलोदी) विश्व का प्रमुख सोलर पार्क है।',
      examTakeawayEn: 'Rajasthan Solar Energy Policy targets 30 GW by 2025 and 90 GW by 2030.',
      examTakeawayHi: 'राजस्थान सौर ऊर्जा नीति का लक्ष्य 2030 तक 90 GW स्थापित करना है।'
    }
  ];
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
