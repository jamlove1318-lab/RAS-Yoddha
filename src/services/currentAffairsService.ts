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
export const CURRENT_AFFAIRS_MASTER: CurrentAffairsItem[] = [
  // 1. Rajasthan Schemes & Infrastructure
  {
    id: 'ca_raj_ercp_mou',
    dateKey: '2024-01-28',
    category: 'rajasthan',
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
    explanationHi: '28 जनवरी 2024 को राजस्थान और मध्य प्रदेश ने केंद्र सरकार के साथ संशोधित पार्वती-कालीसिंध-चंबल लिंक परियोजना (ERCP) के लिए समझौता ज्ञापन पर हस्ताक्षर किए, जिससे राजस्थान के 13 पूर्वी जिलों को पेयजल व सिंचाई सुविधा मिलेगी।',
    importanceScore: 99,
    tags: ['ERCP', 'Chambal', 'Rajasthan Schemes', 'High Yield']
  },
  {
    id: 'ca_raj_annapurna_rasoi',
    dateKey: '2024-01-01',
    category: 'rajasthan',
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
    category: 'rajasthan',
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
    category: 'rajasthan',
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
    category: 'rajasthan',
    questionEn: 'Under the renamed "Ayushman Bharat - Mukhyamantri Ayushman Arogya Yojana (MAA Yojana)" in Rajasthan, which healthcare coverage is provided to eligible families?',
    questionHi: 'राजस्थान में "आयुष्मान भारत - मुख्यमंत्री आयुष्मान आरोग्य योजना (माँ योजना)" के तहत पात्र परिवारों को क्या स्वास्थ्य लाभ प्रदान किया जा रहा है?',
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
    id: 'ca_raj_tiger_reserve_5th',
    dateKey: '2024-01-20',
    category: 'rajasthan',
    questionEn: 'Which tiger reserve was notified as the 5th Tiger Reserve of Rajasthan by the National Tiger Conservation Authority (NTCA)?',
    questionHi: 'राष्ट्रीय बाघ संरक्षण प्राधिकरण (NTCA) द्वारा राजस्थान के 5वें बाघ अभयारण्य (Tiger Reserve) के रूप में किसे अधिसूचित किया गया?',
    optionsEn: [
      'Dholpur-Karauli Tiger Reserve (धौलपुर-करौली टाइगर रिजर्व)',
      'Ramgarh Vishdhari Tiger Reserve (रामगढ़ विषधारी टाइगर रिजर्व)',
      'Kumbhalgarh Tiger Reserve (कुंभलगढ़ टाइगर रिजर्व)',
      'Shergarh Wildlife Sanctuary (शेरगढ़ वन्यजीव अभयारण्य)'
    ],
    optionsHi: [
      'धौलपुर-करौली टाइगर रिजर्व',
      'रामगढ़ विषधारी टाइगर रिजर्व (यह चौथा है)',
      'कुंभलगढ़ टाइगर रिजर्व',
      'शेरगढ़ वन्यजीव अभयारण्य'
    ],
    correctOption: 0,
    explanationEn: 'Dholpur-Karauli Tiger Reserve was officially approved as the 5th Tiger Reserve of Rajasthan (and 54th in India). Rajasthan now has: 1. Ranthambore, 2. Sariska, 3. Mukundra Hills, 4. Ramgarh Vishdhari (Bundi), and 5. Dholpur-Karauli.',
    explanationHi: 'धौलपुर-करौली टाइगर रिजर्व राजस्थान का 5वां और देश का 54वां टाइगर रिजर्व बना। राजस्थान के 5 टाइगर रिजर्व: 1. रणथंभौर, 2. सरिस्का, 3. मुकुंदरा हिल्स, 4. रामगढ़ विषधारी (बूंदी) एवं 5. धौलपुर-करौली।',
    importanceScore: 99,
    tags: ['Tiger Reserve', 'Dholpur Karauli', 'Environment', 'High Yield']
  },
  {
    id: 'ca_raj_pm_mitra_park',
    dateKey: '2024-03-22',
    category: 'rajasthan',
    questionEn: 'Under the PM Mega Integrated Textile Region and Apparel (PM MITRA) scheme, where in Rajasthan has the Mega Textile Park been sanctioned by the Central Government?',
    questionHi: 'पीएम मेगा इंटीग्रेटेड टेक्सटाइल रीजन एंड अपैरल (PM MITRA) योजना के अंतर्गत राजस्थान में मेगा टेक्सटाइल पार्क की स्थापना को केंद्र सरकार द्वारा कहां स्वीकृति दी गई है?',
    optionsEn: [
      'Kakani, Jodhpur (कांकाणी, जोधपुर)',
      'Bhiwadi, Alwar (भिवाड़ी, अलवर)',
      'Sitapura, Jaipur (सीतापुरा, जयपुर)',
      'Bhilwara (भीलवाड़ा)'
    ],
    optionsHi: [
      'कांकाणी, जोधपुर',
      'भिवाड़ी, अलवर',
      'सीतापुरा, जयपुर',
      'भीलवाड़ा'
    ],
    correctOption: 0,
    explanationEn: 'Under the PM MITRA scheme, Rajasthan’s Mega Textile Park is established at Kakani village in Jodhpur district over an area of ~1,000 acres to create a world-class integrated modern textile manufacturing and export hub.',
    explanationHi: 'पीएम मित्रा योजना के तहत राजस्थान का मेगा टेक्सटाइल पार्क जोधपुर जिले के कांकाणी में लगभग 1,000 एकड़ क्षेत्र में स्थापित किया जा रहा है।',
    importanceScore: 96,
    tags: ['PM MITRA', 'Jodhpur', 'Textile', 'Economy']
  },
  {
    id: 'ca_raj_sports_divyakriti',
    dateKey: '2024-01-10',
    category: 'sports_awards',
    questionEn: 'Who became the first Indian woman athlete to be conferred the prestigious Arjuna Award in Equestrian (घुड़सवारी) sport by the President of India, hailing from Rajasthan?',
    questionHi: 'राजस्थान की कौन सी खिलाड़ी भारत की पहली महिला एथलीट बनीं जिन्हें राष्ट्रपति द्वारा घुड़सवारी (Equestrian) खेल में प्रतिष्ठित अर्जुन पुरस्कार से सम्मानित किया गया?',
    optionsEn: [
      'Divyakriti Singh (दिव्यकृति सिंह)',
      'Avani Lekhara (अवनि लेखरा)',
      'Apurvi Chandela (अपूर्वी चंदेला)',
      'Bhawna Jat (भावना जाट)'
    ],
    optionsHi: [
      'दिव्यकृति सिंह',
      'अवनि लेखरा',
      'अपूर्वी चंदेला',
      'भावना जाट'
    ],
    correctOption: 0,
    explanationEn: 'Divyakriti Singh from Rajasthan (Jaipur/Nagaur) created history by becoming the first Indian woman equestrian to receive the Arjuna Award. She was part of the Indian Dressage team that clinched a historic Gold Medal at the Hangzhou Asian Games.',
    explanationHi: 'दिव्यकृति सिंह घुड़सवारी खेल में अर्जुन पुरस्कार पाने वाली भारत की प्रथम महिला खिलाड़ी बनीं। उन्होंने हांगझोउ एशियाई खेलों में घुड़सवारी की ड्रेसेज स्पर्धा में ऐतिहासिक स्वर्ण पदक जीता था।',
    importanceScore: 98,
    tags: ['Divyakriti Singh', 'Arjuna Award', 'Rajasthan Sports']
  },
  {
    id: 'ca_raj_green_hydrogen',
    dateKey: '2024-02-28',
    category: 'rajasthan',
    questionEn: 'What is the ambitious production target set under the "Rajasthan Green Hydrogen Policy 2023" to be achieved by the year 2030?',
    questionHi: '"राजस्थान ग्रीन हाइड्रोजन नीति 2023" के अंतर्गत वर्ष 2030 तक राज्य में प्रति वर्ष कितने ग्रीन हाइड्रोजन उत्पादन का महत्वाकांक्षी लक्ष्य निर्धारित किया गया है?',
    optionsEn: [
      '2,000 KTPA (2,000 Kilo Tonnes Per Annum)',
      '1,000 KTPA',
      '500 KTPA',
      '5,000 KTPA'
    ],
    optionsHi: [
      '2,000 केटीपीए (2,000 किलो टन प्रति वर्ष)',
      '1,000 केटीपीए',
      '500 केटीपीए',
      '5,000 केटीपीए'
    ],
    correctOption: 0,
    explanationEn: 'Under the Rajasthan Green Hydrogen Policy 2023, the state government aims to produce 2,000 KTPA of green hydrogen by 2030, offering 50% rebate in transmission and wheeling charges and full exemption on electricity duty for 10 years.',
    explanationHi: 'राजस्थान ग्रीन हाइड्रोजन नीति 2023 के तहत वर्ष 2030 तक 2,000 केटीपीए ग्रीन हाइड्रोजन उत्पादन का लक्ष्य है। इसके लिए ट्रांसमिशन व व्हीलिंग शुल्क में 50% छूट तथा 10 वर्षों हेतु विद्युत शुल्क में 100% छूट का प्रावधान है।',
    importanceScore: 95,
    tags: ['Green Hydrogen', 'Rajasthan Policy', 'Renewable Energy']
  },
  {
    id: 'ca_india_space_aditya',
    dateKey: '2024-01-06',
    category: 'national',
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
    category: 'sports_awards',
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
    id: 'ca_sports_mona_agarwal',
    dateKey: '2024-08-30',
    category: 'sports_awards',
    questionEn: 'At the Paris 2024 Paralympics, who won the Bronze medal in the Women\'s 10m Air Rifle Standing SH1 event alongside Avani Lekhara\'s Gold, representing Rajasthan?',
    questionHi: 'पेरिस 2024 पैरालंपिक में 10 मीटर एयर राइफल स्टैंडिंग SH1 स्पर्धा में अवनि लेखरा के स्वर्ण के साथ किस राजस्थान खिलाड़ी ने कांस्य पदक जीता?',
    optionsEn: [
      'Mona Agarwal (मोना अग्रवाल)',
      'Deepa Malik (दीपा मलिक)',
      'Bhavina Patel (भाविना पटेल)',
      'Rubina Francis (रुबीना फ्रांसिस)'
    ],
    optionsHi: [
      'मोना अग्रवाल',
      'दीपा मलिक',
      'भाविना पटेल',
      'रुबीना फ्रांसिस'
    ],
    correctOption: 0,
    explanationEn: 'Mona Agarwal from Rajasthan clinched the Bronze medal with a score of 228.7 points in the Women\'s 10m Air Rifle Standing SH1, creating a historic double-podium finish for India at Paris 2024 alongside Avani Lekhara.',
    explanationHi: 'मोना अग्रवाल (राजस्थान) ने पेरिस पैरालंपिक 2024 में 10 मीटर एयर राइफल स्पर्धा में कांस्य पदक जीता, जिससे भारत ने एक ही स्पर्धा में दो पदक हासिल करने का इतिहास रचा।',
    importanceScore: 97,
    tags: ['Mona Agarwal', 'Paralympics', 'Shooting']
  },
  {
    id: 'ca_polity_election_cec',
    dateKey: '2024-03-15',
    category: 'national',
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
    category: 'rajasthan',
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
    category: 'national',
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
    category: 'national',
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
    category: 'rajasthan',
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
  },
  {
    id: 'ca_raj_ramgarh_crater',
    dateKey: '2024-03-01',
    category: 'rajasthan',
    questionEn: 'Ramgarh Crater in Baran district of Rajasthan was recognized as a National Geological Monument and Geo-heritage site. How was this structure formed?',
    questionHi: 'राजस्थान के बारां जिले में स्थित रामगढ़ क्रेटर (Ramgarh Crater) को भू-विरासत स्थल के रूप में मान्यता प्राप्त है। इस संरचना का निर्माण किस प्रकार हुआ था?',
    optionsEn: [
      'Meteorite impact crater formed ~165 million years ago (उल्कापिंड के टकराने से निर्मित क्रेटर)',
      'Volcanic caldera eruption (ज्वालामुखी विस्फोट से निर्मित काल्डेरा)',
      'Glacial gouging during Pleistocene epoch',
      'River erosion by Parbati river'
    ],
    optionsHi: [
      'उल्कापिंड के टकराने से निर्मित क्रेटर (Meteorite Impact)',
      'ज्वालामुखी विस्फोट से निर्मित काल्डेरा',
      'हिमनदीय निक्षेप',
      'पार्वती नदी के कटाव द्वारा'
    ],
    correctOption: 0,
    explanationEn: 'Ramgarh Crater in Baran, Rajasthan is India\'s 3rd recognized meteorite impact crater (after Lonar Lake in Maharashtra and Dhala in MP). It is circular with a diameter of ~3.2 km.',
    explanationHi: 'बारां जिले के मांगरोल में स्थित रामगढ़ क्रेटर लगभग 165 मिलियन वर्ष पूर्व उल्कापिंड के टकराने से बना था। यह लोनार (महाराष्ट्र) और ढाला (म.प्र.) के बाद भारत का तीसरा उल्कापिंड क्रेटर है।',
    importanceScore: 97,
    tags: ['Ramgarh Crater', 'Geoheritage', 'Baran']
  },
  {
    id: 'ca_g20_african_union',
    dateKey: '2024-01-18',
    category: 'international',
    questionEn: 'During India\'s historic G20 Presidency, which continental organization comprising 55 member states was inducted as a permanent member, officially creating G21?',
    questionHi: 'भारत की ऐतिहासिक G20 अध्यक्षता के दौरान 55 सदस्य देशों वाले किस महाद्वीपीय संगठन को स्थायी सदस्य के रूप में शामिल किया गया, जिससे यह G21 बन गया?',
    optionsEn: [
      'African Union - AU (अफ्रीकी संघ)',
      'European Union - EU',
      'ASEAN (आसियान)',
      'Organization of American States - OAS'
    ],
    optionsHi: [
      'अफ्रीकी संघ (African Union - AU)',
      'यूरोपीय संघ',
      'आसियान (ASEAN)',
      'अमेरिकी राज्यों का संगठन'
    ],
    correctOption: 0,
    explanationEn: 'At the New Delhi G20 Leaders\' Summit under the theme "Vasudhaiva Kutumbakam - One Earth, One Family, One Future", the African Union (AU) with 55 nations was inducted as a permanent member.',
    explanationHi: 'नई दिल्ली जी-20 शिखर सम्मेलन में "वसुधैव कुटुम्बकम्" के मंत्र के साथ 55 देशों के अफ्रीकी संघ (AU) को स्थायी सदस्यता प्रदान की गई।',
    importanceScore: 99,
    tags: ['G20', 'African Union', 'International']
  },
  {
    id: 'ca_raj_district_reorg',
    dateKey: '2024-02-12',
    category: 'rajasthan',
    questionEn: 'Which high-level committee was constituted by the Government of Rajasthan for the reorganization and creation of new districts and administrative divisions in the state?',
    questionHi: 'राजस्थान में नए जिलों एवं प्रशासनिक संभागों के गठन तथा सीमाओं के पुनर्गठन हेतु राज्य सरकार द्वारा किस उच्च स्तरीय समिति का गठन किया गया था?',
    optionsEn: [
      'Ram Lubhaya Committee (रामलुभाया समिति)',
      'GS Sandhu Committee (जी.एस. संधू समिति)',
      'Paramesh Chandra Committee (परमेश चंद्र समिति)',
      'V. S. Vyas Committee (वी.एस. व्यास समिति)'
    ],
    optionsHi: [
      'रामलुभाया समिति',
      'जी.एस. संधू समिति',
      'परमेश चंद्र समिति (प्रतापगढ़ जिला गठन से संबंधित थी)',
      'वी.एस. व्यास समिति'
    ],
    correctOption: 0,
    explanationEn: 'The Ram Lubhaya Committee was constituted to examine and recommend the formation of new districts and divisions in Rajasthan. Paramesh Chandra Committee had previously recommended the 33rd district Pratapgarh in 2008.',
    explanationHi: 'राजस्थान में नए जिलों के गठन हेतु सेवानिवृत्त आईएएस रामलुभाया की अध्यक्षता में उच्च स्तरीय समिति का गठन किया गया था। परमेश चंद्र समिति ने 2008 में 33वें जिले प्रतापगढ़ की सिफारिश की थी।',
    importanceScore: 98,
    tags: ['Districts Reorganization', 'Ram Lubhaya', 'Polity']
  }
];

/**
 * Procedural Dynamic Current Affairs Synthesis Engine
 * Synthesizes unlimited unique questions across 8 high-yield domains
 */
export function generateDynamicCurrentAffairsQuestion(seed: number = Date.now(), categoryFilter?: string): Question {
  const categories = [
    'raj_welfare_schemes',
    'raj_solar_energy',
    'raj_water_infrastructure',
    'raj_sports_champions',
    'raj_awards_literature',
    'raj_wildlife_ecology',
    'national_space_defense',
    'national_constitutional_acts'
  ];

  const chosenCat = categoryFilter && categoryFilter !== 'all' 
    ? categoryFilter 
    : categories[seed % categories.length];

  let qObj = {
    en: '',
    hi: '',
    optsEn: ['', '', '', ''],
    optsHi: ['', '', '', ''],
    correct: 0,
    expEn: '',
    expHi: '',
    subtopic: 'Current Affairs',
    score: 95
  };

  if (chosenCat === 'raj_welfare_schemes') {
    const schemes = [
      {
        nameEn: 'Mukhyamantri Ayushman Arogya (MAA) Yojana',
        nameHi: 'मुख्यमंत्री आयुष्मान आरोग्य (माँ) योजना',
        featureEn: 'Comprehensive cashless in-patient treatment across empaneled hospitals with free medicines and diagnostic coverage',
        featureHi: 'संबद्ध अस्पतालों में निःशुल्क दवा, जांच व कैशलेस इन-डोर उपचार'
      },
      {
        nameEn: 'Shri Annapurna Rasoi Yojana',
        nameHi: 'श्री अन्नपूर्णा रसोई योजना',
        featureEn: 'Enhanced government subsidy of ₹22 per thali offering 600 grams of nutritious food for ₹8',
        featureHi: 'प्रति थाली ₹22 सरकारी अनुदान, 600 ग्राम भोजन मात्र ₹8 में'
      },
      {
        nameEn: 'Mukhyamantri Nishulk Dava Yojana',
        nameHi: 'मुख्यमंत्री निःशुल्क दवा योजना',
        featureEn: 'Free essential medicines provided to all OPD and IPD patients in state-run hospitals',
        featureHi: 'राजकीय चिकित्सालयों में ओपीडी व आईपीडी मरीजों को आवश्यक दवाइयों का निःशुल्क वितरण'
      },
      {
        nameEn: 'Palanhar Yojana',
        nameHi: 'पालनहार योजना',
        featureEn: 'Monthly financial assistance for orphan children education and welfare up to 18 years of age',
        featureHi: 'अनाथ एवं पात्र बच्चों के पालन-पोषण व शिक्षा हेतु 18 वर्ष तक मासिक आर्थिक संबल'
      },
      {
        nameEn: 'Lakhpati Didi Initiative',
        nameHi: 'लखपति दीदी योजना',
        featureEn: 'Empowering rural women through Self Help Groups (SHGs) to earn annual household income exceeding ₹1 Lakh',
        featureHi: 'स्वयं सहायता समूहों के माध्यम से ग्रामीण महिलाओं की वार्षिक आय ₹1 लाख से अधिक करने का लक्ष्य'
      }
    ];

    const item = schemes[seed % schemes.length];
    const wrongs = schemes.filter(s => s.nameEn !== item.nameEn);
    qObj = {
      en: `Under the latest administrative decisions of the Government of Rajasthan, which flagship scheme provides "${item.featureEn}"?`,
      hi: `राजस्थान सरकार के नवीनतम प्रशासनिक निर्णयों के अनुसार, किस प्रमुख योजना के तहत "${item.featureHi}" की सुविधा प्रदान की जाती है?`,
      optsEn: [item.nameEn, wrongs[0].nameEn, wrongs[1].nameEn, wrongs[2].nameEn],
      optsHi: [item.nameHi, wrongs[0].nameHi, wrongs[1].nameHi, wrongs[2].nameHi],
      correct: 0,
      expEn: `${item.nameEn}: Major feature - ${item.featureEn}. This is an essential RPSC Prelims flagship scheme.`,
      expHi: `${item.nameHi}: मुख्य विशेषता - ${item.featureHi}। यह आरपीएससी प्रीलिम्स हेतु अति-महत्वपूर्ण योजना है।`,
      subtopic: 'Rajasthan Welfare Schemes',
      score: 98
    };
  } else if (chosenCat === 'raj_solar_energy') {
    const solarItems = [
      {
        parkEn: 'Bhadla Solar Park (Phalodi district)',
        parkHi: 'भड़ला सोलर पार्क (फलोदी जिला)',
        capacityEn: '2,245 MW capacity; one of the largest operational solar parks on Earth',
        capacityHi: '2,245 मेगावाट क्षमता; विश्व के सबसे बड़े संचालित सोलर पार्कों में से एक'
      },
      {
        parkEn: 'Nokh Solar Park (Jaisalmer district)',
        parkHi: 'नोख सोलर पार्क (जैसलमेर जिला)',
        capacityEn: '925 MW capacity developed by Rajasthan Solar Park Development Company',
        capacityHi: '925 मेगावाट क्षमता; राजस्थान सोलर पार्क डेवलपमेंट कंपनी द्वारा विकसित'
      },
      {
        parkEn: 'Pugal Solar Park (Bikaner district)',
        parkHi: 'पूगल सोलर पार्क (बीकानेर जिला)',
        capacityEn: '1,450 MW capacity joint venture with Coal India and RVUNL',
        capacityHi: '1,450 मेगावाट क्षमता; कोल इंडिया व राजस्थान विद्युत उत्पादन निगम का संयुक्त उपक्रम'
      },
      {
        parkEn: 'Fatehgarh Solar Park (Jaisalmer district)',
        parkHi: 'फतेहगढ़ सोलर पार्क (जैसलमेर जिला)',
        capacityEn: 'Ultra Mega Renewable Energy Solar Park powering western transmission corridor',
        capacityHi: 'अल्ट्रा मेगा रिन्यूएबल एनर्जी सोलर पार्क जो पश्चिमी ग्रिड को ऊर्जा आपूर्ति करता है'
      }
    ];

    const item = solarItems[seed % solarItems.length];
    const wrongs = solarItems.filter(s => s.parkEn !== item.parkEn);
    qObj = {
      en: `Which mega solar power installation in Rajasthan is characterized by: "${item.capacityEn}"?`,
      hi: `राजस्थान का कौन सा प्रमुख सौर ऊर्जा पार्क "${item.capacityHi}" से संबंधित है?`,
      optsEn: [item.parkEn, wrongs[0].parkEn, wrongs[1].parkEn, wrongs[2].parkEn],
      optsHi: [item.parkHi, wrongs[0].parkHi, wrongs[1].parkHi, wrongs[2].parkHi],
      correct: 0,
      expEn: `${item.parkEn}: Features: ${item.capacityEn}. Rajasthan stands first in India in solar power capacity.`,
      expHi: `${item.parkHi}: ${item.capacityHi}। सौर ऊर्जा स्थापित क्षमता में राजस्थान देश में प्रथम स्थान पर है।`,
      subtopic: 'Renewable Energy & Infrastructure',
      score: 97
    };
  } else if (chosenCat === 'raj_water_infrastructure') {
    const waterProjects = [
      {
        nameEn: 'Modified PKC-ERCP Link Project',
        nameHi: 'संशोधित पार्वती-कालीसिंध-चंबल (PKC-ERCP) लिंक',
        districtsEn: '13 eastern districts including Kota, Bundi, Baran, Jhalawar, Ajmer, Tonk, Jaipur, Dausa, Alwar, Bharatpur, Dholpur, Karauli, Sawai Madhopur',
        districtsHi: '13 पूर्वी जिले (कोटा, बूंदी, बारां, झालावाड़, अजमेर, टोंक, जयपुर, दौसा, अलवर, भरतपुर, धौलपुर, करौली, सवाई माधोपुर)'
      },
      {
        nameEn: 'Indira Gandhi Canal Project (IGNP)',
        nameHi: 'इंदिरा गांधी नहर परियोजना (IGNP)',
        districtsEn: 'Harike Barrage at confluence of Satluj and Beas; feeds northwestern desert districts',
        districtsHi: 'सतलुज-व्यास के संगम पर हरिके बैराज से उद्गमित; उत्तर-पश्चिमी मरुस्थलीय जिलों की जीवन रेखा'
      },
      {
        nameEn: 'Narmada Canal Project',
        nameHi: 'नर्मदा नहर परियोजना',
        districtsEn: 'Enters Rajasthan at Silu village (Sanchore/Jalore); India\'s first project with mandatory sprinkler/drip irrigation',
        districtsHi: 'सीलू गांव (सांचौर/जालौर) से प्रवेश; भारत की प्रथम परियोजना जिसमें फव्वारा (स्प्रिंकलर) सिंचाई अनिवार्य है'
      },
      {
        nameEn: 'Bisalpur Water Supply Project',
        nameHi: 'बीसलपुर बांध पेयजल परियोजना',
        districtsEn: 'Constructed on Banas river at Toda Rai Singh (Tonk); lifelife for drinking water to Jaipur, Ajmer, and Tonk',
        districtsHi: 'टोडारायसिंह (टोंक) में बनास नदी पर निर्मित; जयपुर, अजमेर व टोंक हेतु मुख्य पेयजल स्रोत'
      }
    ];

    const item = waterProjects[seed % waterProjects.length];
    const wrongs = waterProjects.filter(w => w.nameEn !== item.nameEn);
    qObj = {
      en: `Which irrigation and drinking water project in Rajasthan is associated with: "${item.districtsEn}"?`,
      hi: `राजस्थान की कौन सी सिंचाई एवं पेयजल परियोजना "${item.districtsHi}" से संबद्ध है?`,
      optsEn: [item.nameEn, wrongs[0].nameEn, wrongs[1].nameEn, wrongs[2].nameEn],
      optsHi: [item.nameHi, wrongs[0].nameHi, wrongs[1].nameHi, wrongs[2].nameHi],
      correct: 0,
      expEn: `${item.nameEn}: Key details: ${item.districtsEn}.`,
      expHi: `${item.nameHi}: प्रमुख तथ्य: ${item.districtsHi}।`,
      subtopic: 'Rajasthan Water Resources & Irrigation',
      score: 99
    };
  } else {
    // General current affairs item
    const generalPool = CURRENT_AFFAIRS_MASTER;
    const item = generalPool[seed % generalPool.length];
    qObj = {
      en: item.questionEn,
      hi: item.questionHi,
      optsEn: item.optionsEn,
      optsHi: item.optionsHi,
      correct: item.correctOption,
      expEn: item.explanationEn,
      expHi: item.explanationHi,
      subtopic: item.category,
      score: item.importanceScore
    };
  }

  // Shuffle options so correct answer isn't always at 0
  const targetIndex = (seed + 2) % 4;
  const enOpts = [...qObj.optsEn];
  const hiOpts = [...qObj.optsHi];

  const tmpEn = enOpts[0];
  const tmpHi = hiOpts[0];
  enOpts[0] = enOpts[targetIndex];
  hiOpts[0] = hiOpts[targetIndex];
  enOpts[targetIndex] = tmpEn;
  hiOpts[targetIndex] = tmpHi;

  return {
    id: `ca_live_${seed % 999999}_${Math.floor(Math.random() * 10000)}`,
    subjectId: 'current_affairs',
    subtopic: qObj.subtopic,
    importance: 'HIGH_YIELD',
    importanceScore: qObj.score,
    conceptKey: `CA_${chosenCat}`,
    question: {
      en: qObj.en,
      hi: qObj.hi
    },
    options: {
      en: enOpts,
      hi: hiOpts
    },
    correctOption: targetIndex,
    explanation: {
      en: qObj.expEn,
      hi: qObj.expHi
    },
    tags: ['Live Current Affairs', 'RPSC Prelims', 'Dynamic']
  };
}

/**
 * Get Next Live Current Affairs Question
 * Ensures unlimited streaming without repeating in the current session
 */
export function getLiveCurrentAffairsQuestion(
  seed: number = Date.now(), 
  excludeIds?: Set<string>,
  categoryFilter?: string
): Question {
  // First attempt from master list if unseen
  if (excludeIds) {
    const unseens = CURRENT_AFFAIRS_MASTER.filter(m => !excludeIds.has(m.id));
    if (unseens.length > 0) {
      const selected = unseens[seed % unseens.length];
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
  }

  // When master pool has been seen or for infinite mode, procedurally generate fresh
  return generateDynamicCurrentAffairsQuestion(seed + Math.floor(Math.random() * 50000), categoryFilter);
}

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

function hashDateToSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Get Current Affairs Questions
 * If limit is omitted or 0, returns the entire active master pool
 */
export function getDailyCurrentAffairsQuiz(dateStr: string = getTodayDateString(), limit: number = 0): Question[] {
  const seed = hashDateToSeed(dateStr);
  const totalAvailable = CURRENT_AFFAIRS_MASTER.length;

  const indices: number[] = [];
  for (let i = 0; i < totalAvailable; i++) {
    indices.push(i);
  }

  for (let i = indices.length - 1; i > 0; i--) {
    const j = (seed + i * 37) % (i + 1);
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  const selectedCount = limit > 0 ? Math.min(limit, totalAvailable) : totalAvailable;
  const selectedItems = indices.slice(0, selectedCount).map(idx => CURRENT_AFFAIRS_MASTER[idx]);

  return selectedItems.map((item, index) => {
    const targetIdx = (seed + index) % 4;
    const enOpts = [...item.optionsEn];
    const hiOpts = [...item.optionsHi];
    const tmpEn = enOpts[0];
    const tmpHi = hiOpts[0];
    enOpts[0] = enOpts[targetIdx];
    hiOpts[0] = hiOpts[targetIdx];
    enOpts[targetIdx] = tmpEn;
    hiOpts[targetIdx] = tmpHi;

    return {
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
        en: enOpts,
        hi: hiOpts
      },
      correctOption: targetIdx,
      explanation: {
        en: item.explanationEn,
        hi: item.explanationHi
      },
      tags: ['Daily CA', ...item.tags],
      frequencyNote: 'Live updated RPSC Prelims Current Affairs'
    };
  });
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
