import { Question, SubjectId, ImportanceLevel } from '../types';
import { getRecentSignatures } from './srsEngine';
import { getLiveCurrentAffairsQuestion } from './currentAffairsService';

export interface DynamicTopicItem {
  key: string;
  en: {
    question: string;
    options: [string, string, string, string];
    correct: number;
    explanation: string;
  };
  hi: {
    question: string;
    options: [string, string, string, string];
    correct: number;
    explanation: string;
  };
  subtopic: string;
  score: number;
  tags: string[];
}

export const HIGH_YIELD_TOPICS: Record<SubjectId, DynamicTopicItem[]> = {
  "raj_history_art": [
    {
      "key": "raj_fort_gagron",
      "subtopic": "Forts & Architecture (दुर्ग एवं स्थापत्य)",
      "score": 98,
      "tags": [
        "Forts",
        "Water Fort",
        "UNESCO",
        "Gagron"
      ],
      "en": {
        "question": "Which world-famous water fort (Jal Durg / Audak Durg) of Rajasthan is built without foundations on a natural rock at the confluence of Ahu and Kalisindh rivers?",
        "options": [
          "Gagron Fort (Jhalawar)",
          "Kumbhalgarh Fort (Rajsamand)",
          "Shergarh Fort (Baran)",
          "Bhensrorgarh Fort (Chittorgarh)"
        ],
        "correct": 0,
        "explanation": "Gagron Fort in Jhalawar is the finest example of an Audak/Water Fort in India, located at the confluence of Ahu and Kalisindh rivers, inscribed as a UNESCO World Heritage site in 2013."
      },
      "hi": {
        "question": "राजस्थान का कौन सा विश्वप्रसिद्ध जल दुर्ग (औदक दुर्ग) आहू और कालीसिंध नदियों के संगम पर बिना किसी नींव के सीधे प्राकृतिक चट्टान पर खड़ा है?",
        "options": [
          "गागरोण दुर्ग (झालावाड़)",
          "कुंभलगढ़ दुर्ग (राजसमंद)",
          "शेरगढ़ दुर्ग (बारां)",
          "भैंसरोड़गढ़ दुर्ग (चित्तौड़गढ़)"
        ],
        "correct": 0,
        "explanation": "झालावाड़ का गागरोण दुर्ग आहू और कालीसिंध के संगम पर स्थित देश का प्रमुख जल दुर्ग है जिसे 2013 में यूनेस्को विश्व धरोहर सूची में शामिल किया गया था।"
      }
    },
    {
      "key": "raj_fort_kumbhalgarh",
      "subtopic": "Forts & Architecture (दुर्ग एवं स्थापत्य)",
      "score": 99,
      "tags": [
        "Kumbhalgarh",
        "Mandan",
        "Katargarh",
        "UNESCO"
      ],
      "en": {
        "question": "Which hill fort built by Maharana Kumbha under chief architect Mandan features a 36-km massive fortification wall and contains the inner citadel 'Katargarh' (Eye of Mewar)?",
        "options": [
          "Kumbhalgarh Fort",
          "Chittorgarh Fort",
          "Mehrangarh Fort",
          "Taragarh Fort"
        ],
        "correct": 0,
        "explanation": "Kumbhalgarh Fort in Rajsamand was designed by Mandan. Its 36 km wall is second only to the Great Wall of China. Katargarh was the residence of Maharana Kumbha."
      },
      "hi": {
        "question": "प्रधान वास्तुकार मंडन की देखरेख में महाराणा कुंभा द्वारा निर्मित कौन सा दुर्ग अपनी 36 किमी लंबी प्राचीर तथा अंतःदुर्ग 'कटारगढ़' (मेवाड़ की आंख) हेतु विख्यात है?",
        "options": [
          "कुंभलगढ़ दुर्ग (राजसमंद)",
          "चित्तौड़गढ़ दुर्ग",
          "मेहरानगढ़ दुर्ग",
          "तारागढ़ दुर्ग"
        ],
        "correct": 0,
        "explanation": "कुंभलगढ़ दुर्ग के प्रमुख वास्तुकार मंडन थे। इसकी 36 किमी लंबी दीवार भारत की महान दीवार कहलाती है। कटारगढ़ को 'मेवाड़ की आंख' कहा जाता है।"
      }
    },
    {
      "key": "raj_fort_mehrangarh",
      "subtopic": "Forts & Architecture (दुर्ग एवं स्थापत्य)",
      "score": 96,
      "tags": [
        "Mehrangarh",
        "Rao Jodha",
        "Chidiyatunk",
        "Jodhpur"
      ],
      "en": {
        "question": "Mehrangarh Fort (Mayurdhwajgarh) in Jodhpur was founded in 1459 AD by which Rathore ruler on the Chidiyatunk hill?",
        "options": [
          "Rao Jodha",
          "Rao Maldeo",
          "Maharaja Jaswant Singh I",
          "Rao Bika"
        ],
        "correct": 0,
        "explanation": "Rao Jodha founded Jodhpur and laid the foundation of Mehrangarh Fort on Chidiyatunk hill in 1459 AD. Rudyard Kipling described it as 'A work of giants and fairies'."
      },
      "hi": {
        "question": "चिड़ियाटूँक पहाड़ी पर स्थित मेहरानगढ़ दुर्ग (मयूरध्वजगढ़) की नींव 1459 ई. में किस राठौड़ शासक द्वारा रखी गई थी?",
        "options": [
          "राव जोधा",
          "राव मालदेव",
          "महाराजा जसवंत सिंह प्रथम",
          "राव बीका"
        ],
        "correct": 0,
        "explanation": "राव जोधा ने 1459 ई. में जोधपुर नगर की स्थापना कर चिड़ियाटूँक पहाड़ी पर मेहरानगढ़ दुर्ग का निर्माण करवाया।"
      }
    },
    {
      "key": "raj_fort_chittorgarh",
      "subtopic": "Forts & Architecture (दुर्ग एवं स्थापत्य)",
      "score": 99,
      "tags": [
        "Chittorgarh",
        "Jauhar",
        "Vijay Stambha",
        "UNESCO"
      ],
      "en": {
        "question": "Chittorgarh Fort, the largest fort in Rajasthan, witnessed three historic Jauhars. In which years did these three Saka/Jauhar events take place?",
        "options": [
          "1303, 1535, and 1568 AD",
          "1299, 1527, and 1576 AD",
          "1301, 1544, and 1582 AD",
          "1311, 1538, and 1572 AD"
        ],
        "correct": 0,
        "explanation": "The 3 Sakas of Chittorgarh took place in: 1) 1303 (Alauddin Khalji vs Rawal Ratan Singh & Rani Padmini), 2) 1535 (Bahadur Shah vs Rani Karmavati), 3) 1568 (Akbar vs Jaimal & Patta)."
      },
      "hi": {
        "question": "राजस्थान का सबसे विशाल दुर्ग चित्तौड़गढ़ तीन ऐतिहासिक जौहरों का साक्षी रहा है। ये तीन शाके/जौहर किन वर्षों में हुए थे?",
        "options": [
          "1303 ई., 1535 ई. एवं 1568 ई.",
          "1299 ई., 1527 ई. एवं 1576 ई.",
          "1301 ई., 1544 ई. एवं 1582 ई.",
          "1311 ई., 1538 ई. एवं 1572 ई."
        ],
        "correct": 0,
        "explanation": "चित्तौड़ के तीन शाके: 1303 ई. (रतन सिंह-पद्मिनी), 1535 ई. (कर्णावती), 1568 ई. (जयमल-पत्ता के नेतृत्व में)।"
      }
    },
    {
      "key": "raj_fort_sonar_jaisalmer",
      "subtopic": "Forts & Architecture (दुर्ग एवं स्थापत्य)",
      "score": 95,
      "tags": [
        "Jaisalmer",
        "Sonar Qila",
        "Trikuta"
      ],
      "en": {
        "question": "Sonar Qila (Golden Fort) of Jaisalmer, built on Trikuta hill using yellow sandstone without any mortar/lime, was founded in 1156 AD by which Bhati ruler?",
        "options": [
          "Rao Jaisal",
          "Maharawal Bhati",
          "Rao Lunkaran",
          "Maharawal Moolraj"
        ],
        "correct": 0,
        "explanation": "Rao Jaisal founded Jaisalmer Fort on Trikuta hill in 1156 AD. It is famous for having 99 bastions (Burj) and being built without mortar."
      },
      "hi": {
        "question": "त्रिकूट पहाड़ी पर बिना किसी चूने-गारे के केवल पीले बलुआ पत्थरों को जोड़कर निर्मित जैसलमेर के सोनार किले की स्थापना 1156 ई. में किस भाटी शासक ने की थी?",
        "options": [
          "राव जैसल",
          "महारावल भाटी",
          "राव लूणकरण",
          "महारावल मूलराज"
        ],
        "correct": 0,
        "explanation": "1156 ई. में भाटी शासक राव जैसल ने त्रिकूट पहाड़ी पर जैसलमेर दुर्ग की नींव रखी। इसमें 99 बुर्ज हैं।"
      }
    },
    {
      "key": "raj_fort_junagarh",
      "subtopic": "Forts & Architecture (दुर्ग एवं स्थापत्य)",
      "score": 94,
      "tags": [
        "Junagarh",
        "Bikaner",
        "Rai Singh",
        "Zameen Ka Zewar"
      ],
      "en": {
        "question": "Junagarh Fort in Bikaner, often called 'Zameen ka Zewar' (Jewel of the Land), was constructed under the supervision of minister Karan Chand by which ruler?",
        "options": [
          "Raja Rai Singh (1589-1594 AD)",
          "Rao Bika",
          "Maharaja Anup Singh",
          "Maharaja Ganga Singh"
        ],
        "correct": 0,
        "explanation": "Raja Rai Singh built Junagarh Fort between 1589 and 1594 AD under minister Karan Chand. It has 37 bastions and houses Anup Mahal and Suraj Pol."
      },
      "hi": {
        "question": "बीकानेर का जूनागढ़ दुर्ग, जिसे 'जमीन का जेवर' कहा जाता है, मंत्री कर्मचंद की देखरेख में किस शासक द्वारा बनवाया गया था?",
        "options": [
          "राजा रायसिंह (1589-1594 ई.)",
          "राव बीका",
          "महाराजा अनूप सिंह",
          "महाराजा गंगा सिंह"
        ],
        "correct": 0,
        "explanation": "राजा रायसिंह ने 1589-1594 ई. में प्रधानमंत्री कर्मचंद की देखरेख में जूनागढ़ (रातिघाटी दुर्ग) का निर्माण करवाया।"
      }
    },
    {
      "key": "raj_fort_ranthambore",
      "subtopic": "Forts & Architecture (दुर्ग एवं स्थापत्य)",
      "score": 97,
      "tags": [
        "Ranthambore",
        "Hammir Dev",
        "Abul Fazl"
      ],
      "en": {
        "question": "About which hill fort of Rajasthan did court historian Abul Fazl write: 'Other forts are bareheaded (naked), but this fort is armored (baktar-band)'?",
        "options": [
          "Ranthambore Fort (Sawai Madhopur)",
          "Siwana Fort (Balotra)",
          "Jalore Fort",
          "Amer Fort"
        ],
        "correct": 0,
        "explanation": "Abul Fazl described Ranthambore Fort as 'armored' because it is surrounded by dense forests and seven concentric hills. In 1301 AD, it witnessed Rajasthan's first recorded Jauhar under Hammir Dev Chauhan."
      },
      "hi": {
        "question": "राजस्थान के किस दुर्ग के संदर्भ में अबुल फजल ने लिखा था कि 'अन्य सब दुर्ग नंगे हैं, पर यह बख्तरबंद है'?",
        "options": [
          "रणथंभौर दुर्ग (सवाई माधोपुर)",
          "सिवाना दुर्ग (बालोतरा)",
          "जालौर दुर्ग",
          "आमेर दुर्ग"
        ],
        "correct": 0,
        "explanation": "रणथंभौर सात पहाड़ियों और सघन वनों से घिरा होने के कारण अबुल फजल द्वारा 'बख्तरबंद' कहा गया। 1301 ई. में यहां हम्मीर देव के समय पहला साका हुआ।"
      }
    },
    {
      "key": "raj_peasant_bijolia",
      "subtopic": "Peasant Movements (किसान आंदोलन)",
      "score": 99,
      "tags": [
        "Bijolia",
        "Sadhu Sitaram",
        "Pathik",
        "Mewar"
      ],
      "en": {
        "question": "Which peasant movement of Mewar is recognized as India's first completely non-violent, organized peasant struggle that lasted continuously for 44 years (1897-1941)?",
        "options": [
          "Bijolia Peasant Movement",
          "Begun Peasant Movement",
          "Shekhawati Peasant Movement",
          "Nimuchana Peasant Movement"
        ],
        "correct": 0,
        "explanation": "Bijolia was led initially by Sadhu Sitaram Das, then by Vijay Singh Pathik (Bhup Singh) in 1916, and later by Manikya Lal Verma and Jamnalal Bajaj."
      },
      "hi": {
        "question": "मेवाड़ रियासत का कौन सा किसान आंदोलन भारत का पहला पूर्णतः अहिंसक एवं संगठित किसान संघर्ष माना जाता है जो 44 वर्षों (1897-1941 ई.) तक अनवरत चला?",
        "options": [
          "बिजौलिया किसान आंदोलन",
          "बेगूं किसान आंदोलन",
          "शेखावाटी किसान आंदोलन",
          "नीमचड़ा किसान आंदोलन"
        ],
        "correct": 0,
        "explanation": "बिजौलिया आंदोलन 1897 में शुरू हुआ। 1916 में विजय सिंह पथिक जुड़े। साधु सीताराम दास इसके प्रारंभिक मार्गदर्शक थे।"
      }
    },
    {
      "key": "raj_peasant_begun",
      "subtopic": "Peasant Movements (किसान आंदोलन)",
      "score": 96,
      "tags": [
        "Begun",
        "Ramnarayan Choudhary",
        "Rupa Kripa"
      ],
      "en": {
        "question": "In the Begun peasant movement (1921-1925), which two brave farmers attained martyrdom during the brutal police firing ordered by Trench Commission at Govindpura?",
        "options": [
          "Rupa Ji and Kripa Ji Dhakar",
          "Nanak Ji Bhil and Devi Lal Gurjar",
          "Chhaju Singh and Madho Singh",
          "Tikaram and Jhabar Mal"
        ],
        "correct": 0,
        "explanation": "On 13 July 1923, during a farmer gathering at Govindpura village, Mr. Trench ordered firing in which Rupa Ji and Kripa Ji Dhakar achieved martyrdom."
      },
      "hi": {
        "question": "बेगूं किसान आंदोलन (1921-1925 ई.) के दौरान गोविंदपुरा गांव में ट्रेंच कमीशन द्वारा करवाई गई पुलिस फायरिंग में कौन से दो वीर किसान शहीद हुए थे?",
        "options": [
          "रूपा जी और कृपा जी धाकड़",
          "नानक जी भील और देवीलाल गुर्जर",
          "छज्जू सिंह और माधो सिंह",
          "टीकाराम और झाबर मल"
        ],
        "correct": 0,
        "explanation": "13 जुलाई 1923 को गोविंदपुरा सम्मेलन पर ट्रेंच के आदेश से गोलीबारी हुई जिसमें रूपाजी धाकड़ और कृपाजी धाकड़ शहीद हुए।"
      }
    },
    {
      "key": "raj_peasant_nimuchana",
      "subtopic": "Peasant Movements (किसान आंदोलन)",
      "score": 97,
      "tags": [
        "Nimuchana",
        "Alwar",
        "Gandhiji",
        "Dyrism"
      ],
      "en": {
        "question": "The brutal police firing on unarmed farmers at Nimuchana (Alwar) on 14 May 1925 was described by Mahatma Gandhi in 'Young India' as what?",
        "options": [
          "'Dyrism Double Distilled' (Jallianwala Bagh worse than original)",
          "'A triumph of imperial law'",
          "'An isolated local skirmish'",
          "'The awakening of Rajasthan'"
        ],
        "correct": 0,
        "explanation": "Mahatma Gandhi condemned the Nimuchana firing ordered by Commander Chhaju Singh as 'Dyrism Double Distilled' and termed it worse than the Jallianwala Bagh massacre."
      },
      "hi": {
        "question": "14 मई 1925 को अलवर रियासत के नीमूचाणा में निहत्थे किसानों पर कमांडर छज्जू सिंह द्वारा की गई नृशंस गोलीबारी को महात्मा गांधी ने 'यंग इंडिया' में क्या संज्ञा दी थी?",
        "options": [
          "दोहरी डायरशाही (डायरिज्म डबल डिस्टिल्ड)",
          "साम्राज्यवादी न्याय की जीत",
          "एक साधारण स्थानीय झड़प",
          "राजस्थान का नवजागरण"
        ],
        "correct": 0,
        "explanation": "गांधीजी ने नीमूचाणा हत्याकांड को जलियांवाला बाग हत्याकांड से भी अधिक वीभत्स बताते हुए इसे 'दोहरी डायरशाही' (Dyrism Double Distilled) कहा था।"
      }
    },
    {
      "key": "raj_tribal_eki_movement",
      "subtopic": "Tribal Movements (जनजातीय आंदोलन)",
      "score": 98,
      "tags": [
        "Eki Movement",
        "Motilal Tejawat",
        "Matrikundiya",
        "Mewar Pukar"
      ],
      "en": {
        "question": "The historic 'Eki Movement' (Bhomat Bhil Movement) for tribal emancipation was initiated in 1921 from Matrikundiya (Rashmi) by which revered leader?",
        "options": [
          "Motilal Tejawat (Bawji)",
          "Govind Giri",
          "Sant Surmal Das",
          "Bhogilal Pandya"
        ],
        "correct": 0,
        "explanation": "Motilal Tejawat started the Eki Movement from Matrikundiya (known as Haridwar of Rajasthan) in 1921 and submitted a 21-point charter of demands called 'Mewar Pukar' to the Maharana."
      },
      "hi": {
        "question": "1921 ई. में मातृकुंडिया (राशमी, चित्तौड़गढ़) से आदिवासियों के शोषण के विरुद्ध ऐतिहासिक 'एकी आंदोलन' (भोमट भील आंदोलन) का सूत्रपात किस जननायक ने किया था?",
        "options": [
          "मोतीलाल तेजावत (बावजी)",
          "गोविंद गिरि",
          "संत सूरमल दास",
          "भोगीलाल पंड्या"
        ],
        "correct": 0,
        "explanation": "मोतीलाल तेजावत ने मातृकुंडिया से एकी आंदोलन शुरू किया और मेवाड़ महाराणा को 21 सूत्री मांग पत्र सौंपा जिसे 'मेवाड़ पुकार' कहा जाता है।"
      }
    },
    {
      "key": "raj_tribal_bhagat_movement",
      "subtopic": "Tribal Movements (जनजातीय आंदोलन)",
      "score": 99,
      "tags": [
        "Mangarh Dham",
        "Govind Giri",
        "Samp Sabha",
        "1913"
      ],
      "en": {
        "question": "The Mangarh Dham massacre, in which British and state forces killed over 1,500 Bhil tribals gathered for a peaceful meeting on 17 November 1913, was organized under the leadership of which social reformer?",
        "options": [
          "Govind Giri (Founder of Samp Sabha 1883)",
          "Motilal Tejawat",
          "Guru Vashishtha",
          "Manikya Lal Verma"
        ],
        "correct": 0,
        "explanation": "Govind Giri founded the Samp Sabha in 1883 to unite the Bhil community. On 17 Nov 1913 (Margashirsha Purnima), British forces surrounded Mangarh Hill (Banswara) and killed over 1500 Bhils. It is known as the Jallianwala Bagh of Rajasthan."
      },
      "hi": {
        "question": "17 नवंबर 1913 को मानगढ़ धाम (बांसवाड़ा) में ब्रिटिश और रियासती सेना की गोलीबारी में 1500 से अधिक भील आदिवासी शहीद हुए। यह ऐतिहासिक संप सभा किसके नेतृत्व में संचालित थी?",
        "options": [
          "गोविंद गिरि (संप सभा के संस्थापक, 1883)",
          "मोतीलाल तेजावत",
          "संत सूरमल दास",
          "माणिक्य लाल वर्मा"
        ],
        "correct": 0,
        "explanation": "गोविंद गिरि ने 1883 में सिरोही में संप सभा की स्थापना की। 17 नवंबर 1913 को मानगढ़ पहाड़ी पर हुए नरसंहार को राजस्थान का जलियांवाला बाग कहा जाता है।"
      }
    },
    {
      "key": "raj_prajamandal_sirohi",
      "subtopic": "Prajamandal Movements (प्रजामंडल)",
      "score": 96,
      "tags": [
        "Sirohi",
        "Gokulbhai Bhatt",
        "1939"
      ],
      "en": {
        "question": "Sirohi Prajamandal was formally founded in January 1939 under the leadership of which veteran leader, honored as 'Gandhi of Rajasthan'?",
        "options": [
          "Gokulbhai Bhatt",
          "Bhogilal Pandya",
          "Jaynarayan Vyas",
          "Heeralal Shastri"
        ],
        "correct": 0,
        "explanation": "Gokulbhai Bhatt founded Sirohi Prajamandal in 1939. Because of his selfless Gandhian service, he is revered as Rajasthan ke Gandhi."
      },
      "hi": {
        "question": "जनवरी 1939 में 'राजस्थान के गांधी' के नाम से विख्यात किस महान स्वतंत्रता सेनानी के नेतृत्व में सिरोही प्रजामंडल की स्थापना हुई थी?",
        "options": [
          "गोकुलभाई भट्ट",
          "भोगीलाल पंड्या",
          "जयनारायण व्यास",
          "हीरालाल शास्त्री"
        ],
        "correct": 0,
        "explanation": "गोकुलभाई भट्ट ने 1939 में सिरोही प्रजामंडल की स्थापना की। इन्हें राजस्थान का गांधी कहा जाता है।"
      }
    },
    {
      "key": "raj_prajamandal_mewar",
      "subtopic": "Prajamandal Movements (प्रजामंडल)",
      "score": 98,
      "tags": [
        "Mewar Prajamandal",
        "Manikya Lal Verma",
        "Balwant Singh Mehta"
      ],
      "en": {
        "question": "Mewar Prajamandal was founded on 24 April 1938 by Manikya Lal Verma. Who was appointed as its first President?",
        "options": [
          "Balwant Singh Mehta",
          "Bhurilal Baya",
          "Mohanlal Sukhadia",
          "Heeralal Shastri"
        ],
        "correct": 0,
        "explanation": "Mewar Prajamandal was founded on 24 April 1938 by Manikya Lal Verma at the residence of Balwant Singh Mehta, who served as its first President."
      },
      "hi": {
        "question": "24 अप्रैल 1938 को माणिक्य लाल वर्मा द्वारा स्थापित मेवाड़ प्रजामंडल के प्रथम अध्यक्ष कौन बनाए गए थे?",
        "options": [
          "बलवंत सिंह मेहता",
          "भूरीलाल बया",
          "मोहनलाल सुखाड़िया",
          "हीरालाल शास्त्री"
        ],
        "correct": 0,
        "explanation": "मेवाड़ प्रजामंडल की स्थापना 24 अप्रैल 1938 को हुई और इसके प्रथम अध्यक्ष बलवंत सिंह मेहता बनाए गए।"
      }
    },
    {
      "key": "raj_prajamandal_dungarpur",
      "subtopic": "Prajamandal Movements (प्रजामंडल)",
      "score": 95,
      "tags": [
        "Dungarpur",
        "Bhogilal Pandya",
        "Vagad Gandhi"
      ],
      "en": {
        "question": "Dungarpur Prajamandal was established in 1944 under the guidance of which leader, who is fondly honored as 'Vagad ke Gandhi'?",
        "options": [
          "Bhogilal Pandya",
          "Harideo Joshi",
          "Gokulbhai Bhatt",
          "Motilal Tejawat"
        ],
        "correct": 0,
        "explanation": "Bhogilal Pandya founded the Dungarpur Prajamandal in 1944 and is celebrated as Vagad ke Gandhi for his work for tribal upliftment."
      },
      "hi": {
        "question": "1944 ई. में 'वागड़ के गांधी' के नाम से प्रसिद्ध किस स्वतंत्रता सेनानी के प्रयासों से डूंगरपुर प्रजामंडल की स्थापना हुई थी?",
        "options": [
          "भोगीलाल पंड्या",
          "हरिदेव जोशी",
          "गोकुलभाई भट्ट",
          "मोतीलाल तेजावत"
        ],
        "correct": 0,
        "explanation": "भोगीलाल पंड्या ने 1944 में डूंगरपुर प्रजामंडल की स्थापना की। इन्हें 'वागड़ के गांधी' के रूप में जाना जाता है।"
      }
    },
    {
      "key": "raj_revolt1857_naseerabad",
      "subtopic": "1857 Revolt in Rajasthan (1857 की क्रांति)",
      "score": 98,
      "tags": [
        "1857",
        "Naseerabad",
        "15th Native Infantry"
      ],
      "en": {
        "question": "The 1857 freedom struggle in Rajasthan was sparked on 28 May 1857 at Naseerabad cantonment by which British Indian army regiment?",
        "options": [
          "15th Bengal Native Infantry",
          "30th Bengal Native Infantry",
          "Mewar Bhil Corps",
          "Kota Contigent"
        ],
        "correct": 0,
        "explanation": "On 28 May 1857, soldiers of the 15th Bengal Native Infantry mutinied at Naseerabad, killing officers Spottiswoode and Newbery, marking the beginning of 1857 revolt in Rajasthan."
      },
      "hi": {
        "question": "राजस्थान में 1857 के प्रथम स्वतंत्रता संग्राम की ज्वाला 28 मई 1857 को नसीराबाद छावनी में किस सैन्य टुकड़ी द्वारा सुलगाई गई थी?",
        "options": [
          "15वीं बंगाल नेटिव इन्फैंट्री",
          "30वीं नेटिव इन्फैंट्री",
          "मेवाड़ भील कोर",
          "कोटा कंटिजेंट"
        ],
        "correct": 0,
        "explanation": "28 मई 1857 को 15वीं नेटिव इन्फैंट्री के सैनिकों ने नसीराबाद छावनी में विद्रोह कर मेजर स्पोटिसवुड और कर्नल न्यूबरी की हत्या कर दी।"
      }
    },
    {
      "key": "raj_revolt1857_auwa",
      "subtopic": "1857 Revolt in Rajasthan (1857 की क्रांति)",
      "score": 99,
      "tags": [
        "Auwa",
        "Kushal Singh",
        "Chelawas",
        "Sugali Mata"
      ],
      "en": {
        "question": "In the Battle of Chelawas (18 September 1857), known as the 'Battle of Blacks and Whites' (Gore-Kale ka Yuddha), Thakur Kushal Singh of Auwa defeated British forces and killed which Political Agent?",
        "options": [
          "Captain Monck Mason (Jodhpur)",
          "Major Burton (Kota)",
          "Captain Showers (Mewar)",
          "Col. George Lawrence"
        ],
        "correct": 0,
        "explanation": "Thakur Kushal Singh of Auwa defeated British Agent George Lawrence and killed Captain Monck Mason at Chelawas. Mason's head was severed and hung at Auwa fort gate. Kushal Singh worshipped Sugali Mata (54 arms, 10 heads)."
      },
      "hi": {
        "question": "18 सितंबर 1857 को लड़े गए चेलावास के युद्ध ('गोरे-कालों का युद्ध') में आउवा के ठाकुर कुशाल सिंह चंपावत ने किस ब्रिटिश पॉलिटिकल एजेंट का सिर काटकर आउवा के किले के दरवाजे पर लटका दिया था?",
        "options": [
          "कैप्टन मोंक मेसन (जोधपुर)",
          "मेजर बर्टन (कोटा)",
          "कैप्टन शावर्स (मेवाड़)",
          "कर्नल जॉर्ज लॉरेंस"
        ],
        "correct": 0,
        "explanation": "चेलावास के युद्ध में आउवा के ठाकुर कुशाल सिंह ने जोधपुर के पॉलिटिकल एजेंट मोंक मेसन का सिर काटकर आउवा किले के फाटक पर लटका दिया था।"
      }
    },
    {
      "key": "raj_revolt1857_kota",
      "subtopic": "1857 Revolt in Rajasthan (1857 की क्रांति)",
      "score": 98,
      "tags": [
        "Kota 1857",
        "Jaidayal",
        "Mehrab Khan",
        "Burton"
      ],
      "en": {
        "question": "During the 1857 uprising in Kota (15 October 1857), the mass revolt was led by Lala Jaidayal and Risaldar Mehrab Khan. Which Political Agent and his two sons were killed?",
        "options": [
          "Major Burton",
          "Captain French",
          "Col. Holmes",
          "Dr. Sadler"
        ],
        "correct": 0,
        "explanation": "In Kota, public rebellion led by Lala Jaidayal and Mehrab Khan took control of the entire administration for six months. Major Burton, his two sons, and Dr. Sadler were killed."
      },
      "hi": {
        "question": "15 अक्टूबर 1857 को कोटा में हुए जनविद्रोह का नेतृत्व लाला जयदयाल एवं रिसालदार मेहराब खान ने किया था। इस विद्रोह में किस पॉलिटिकल एजेंट की हत्या कर दी गई थी?",
        "options": [
          "मेजर बर्टन",
          "कैप्टन फ्रेंच",
          "कर्नल होम्स",
          "कैप्टन ईडन"
        ],
        "correct": 0,
        "explanation": "कोटा में लाला जयदयाल और मेहराब खान के नेतृत्व में जनता और सेना ने 6 महीने तक समानांतर शासन चलाया तथा मेजर बर्टन का सिर धड़ से अलग कर दिया।"
      }
    },
    {
      "key": "raj_paintings_kishangarh",
      "subtopic": "Paintings & Schools (चित्रकला एवं शैलियां)",
      "score": 99,
      "tags": [
        "Kishangarh",
        "Bani Thani",
        "Nihal Chand",
        "Sawant Singh"
      ],
      "en": {
        "question": "The masterpiece painting 'Bani Thani' (often called India's Mona Lisa by Eric Dickinson) belongs to Kishangarh style. Who was the master painter and the patron ruler?",
        "options": [
          "Painter Nihal Chand under ruler Sawant Singh (Nagridas)",
          "Painter Sahibdin under Maharana Amar Singh",
          "Painter Mansur under Jahangir",
          "Painter Nainsukh under Raja Balwant"
        ],
        "correct": 0,
        "explanation": "Nihal Chand painted Bani Thani under the patronage of Maharaja Sawant Singh (known in poetry as Nagridas). In 1973, India Post issued a postage stamp on Bani Thani."
      },
      "hi": {
        "question": "एरिक डिकिंसन द्वारा 'भारत की मोनालिसा' कही गई विश्वप्रसिद्ध चित्रकृति 'बणी-ठणी' किशनगढ़ चित्रशैली की देन है। इसके चित्रकार तथा आश्रयदाता शासक कौन थे?",
        "options": [
          "चित्रकार निहालचंद (शासक सावंत सिंह / नागरीदास)",
          "चित्रकार साहिबदीन (महाराणा अमर सिंह)",
          "चित्रकार नूर मोहम्मद (शासक अनूप सिंह)",
          "चित्रकार डालू (राव छत्रसाल)"
        ],
        "correct": 0,
        "explanation": "किशनगढ़ के शासक सावंत सिंह (नागरीदास) के समय चित्रकार मोरध्वज निहालचंद ने बणी-ठणी का अमर चित्र बनाया जिसे भारत सरकार ने 1973 में डाक टिकट पर छापा।"
      }
    },
    {
      "key": "raj_paintings_bundi",
      "subtopic": "Paintings & Schools (चित्रकला एवं शैलियां)",
      "score": 96,
      "tags": [
        "Bundi Style",
        "Chitrashala",
        "Birds Animals"
      ],
      "en": {
        "question": "Bundi painting style is world-renowned as the 'School of Birds and Animal Painting'. Which ruler constructed the famous 'Chitrashala' (hall of murals) at Bundi palace?",
        "options": [
          "Maharao Ummed Singh",
          "Rao Surjan Singh",
          "Maharao Shatrushal",
          "Maharao Budh Singh"
        ],
        "correct": 0,
        "explanation": "Maharao Ummed Singh constructed the Chitrashala in Bundi palace, adorned with vibrant frescoes depicting Raslila, Nayika bhed, and exquisite birds/animals."
      },
      "hi": {
        "question": "पशु-पक्षियों के सजीव अंकन हेतु विश्वविख्यात बूंदी चित्रशैली में भित्ति चित्रों का स्वर्ग 'चित्रशाला' (रंग विलास) का निर्माण किस बूंदी नरेश ने करवाया था?",
        "options": [
          "महाराव उम्मेद सिंह",
          "राव सुरजन सिंह",
          "महाराव शत्रुशाल",
          "महाराव बुद्ध सिंह"
        ],
        "correct": 0,
        "explanation": "बूंदी के महाराव उम्मेद सिंह ने तारागढ़ राजप्रसाद में प्रसिद्ध 'चित्रशाला' का निर्माण करवाया जिसमें पशु-पक्षियों और प्राकृतिक दृश्यों का अद्वितीय अंकन है।"
      }
    },
    {
      "key": "raj_folk_deity_ramdevji",
      "subtopic": "Folk Deities (लोक देवता)",
      "score": 99,
      "tags": [
        "Ramdevji",
        "Runicha",
        "Kamad",
        "Terah Taali"
      ],
      "en": {
        "question": "Which folk deity of Rajasthan founded the 'Kamadiya Sect' to eradicate untouchability, authored the poetry work 'Chaubis Baniyaan', and inspired the 'Terah Taali' dance?",
        "options": [
          "Baba Ramdevji (Runicha)",
          "Gogaji",
          "Pabuji",
          "Tejaji"
        ],
        "correct": 0,
        "explanation": "Baba Ramdevji is revered as an incarnation of Lord Krishna and 'Ramsapir' by Muslims. He established the Kamad sect. Kamad women perform the iconic Terah Taali dance."
      },
      "hi": {
        "question": "राजस्थान के किस लोक देवता ने छुआछूत निवारण हेतु 'कामड़िया पंथ' की स्थापना की, 'चौबीस बाणियां' ग्रंथ की रचना की तथा जिनके मेले में 'तेरहताली नृत्य' किया जाता है?",
        "options": [
          "बाबा रामदेवजी (रुणिचा)",
          "गोगाजी",
          "पाबूजी",
          "तेजाजी"
        ],
        "correct": 0,
        "explanation": "रामदेवजी एकमात्र ऐसे लोक देवता थे जो कवि भी थे (चौबीस बाणियां)। इन्होंने कामड़िया पंथ की स्थापना की जिसकी महिलाएं तेरहताली नृत्य प्रस्तुत करती हैं।"
      }
    },
    {
      "key": "raj_folk_deity_pabuji",
      "subtopic": "Folk Deities (लोक देवता)",
      "score": 98,
      "tags": [
        "Pabuji",
        "Camels",
        "Rebari",
        "Ravanhatha"
      ],
      "en": {
        "question": "Which folk deity is credited with introducing camels (Sands) to Rajasthan, is worshipped by Rebari/Raikas as camel savior, and whose Phad is sung with Ravanhatha?",
        "options": [
          "Pabuji Rathore",
          "Gogaji",
          "Harbhooji",
          "Devnarayanji"
        ],
        "correct": 0,
        "explanation": "Pabuji Rathore (Kolumand) is known as the protector of cows, camel-deity (Unton ke Devta), and plaque-remover. His Phad is the most popular in Rajasthan played with Ravanhatha."
      },
      "hi": {
        "question": "मारवाड़ में सर्वप्रथम ऊंट (सांड) लाने का श्रेय किस लोक देवता को दिया जाता है, जिनकी फड़ राजस्थान में सर्वाधिक लोकप्रिय है और रावणहत्था वाद्ययंत्र के साथ गाई जाती है?",
        "options": [
          "पाबूजी राठौड़ (कोलूमंड)",
          "गोगाजी",
          "हरभूजी सांखला",
          "देवनारायणजी"
        ],
        "correct": 0,
        "explanation": "पाबूजी को ऊंटों का देवता, प्लेग रक्षक तथा गौ-रक्षक देवता माना जाता है। रेबारी/राईका जाति इन्हें अपना आराध्य देव मानती है।"
      }
    },
    {
      "key": "raj_folk_deity_jambhoji",
      "subtopic": "Saints & Sects (संत एवं संप्रदाय)",
      "score": 97,
      "tags": [
        "Jambhoji",
        "Bishnoi",
        "29 Rules",
        "Samrathal"
      ],
      "en": {
        "question": "Sant Jambhoji founded the Bishnoi sect in 1485 AD at Samrathal Dhora (Bikaner). How many cardinal environmental and moral principles did he prescribe for his followers?",
        "options": [
          "29 Principles (Bees + Nau = Bishnoi)",
          "36 Principles",
          "42 Principles",
          "21 Principles"
        ],
        "correct": 0,
        "explanation": "Sant Jambhoji gave 29 commandments emphasizing tree protection, animal conservation (especially blackbucks), and moral purity. The word Bishnoi comes from 20 (Bees) + 9 (Nau)."
      },
      "hi": {
        "question": "संत जांभोजी ने 1485 ई. में समराथल धोरा (बीकानेर) में बिश्नोई संप्रदाय का प्रवर्तन किया। उन्होंने अपने अनुयायियों हेतु कितने नियमों की आचार संहिता बनाई थी?",
        "options": [
          "29 नियम (बीस + नौ = बिश्नोई)",
          "36 नियम",
          "42 नियम",
          "21 नियम"
        ],
        "correct": 0,
        "explanation": "संत जांभोजी ने 29 नियमों (बीस+नौ) का विधान किया जिसमें हरे वृक्षों की रक्षा व वन्यजीवों का संरक्षण सर्वोपरि है।"
      }
    },
    {
      "key": "raj_crafts_thewa_art",
      "subtopic": "Handicrafts (हस्तशिल्प)",
      "score": 97,
      "tags": [
        "Thewa Art",
        "Pratapgarh",
        "Rajsoni",
        "Gold on Glass"
      ],
      "en": {
        "question": "The world-famous 'Thewa Art' involves delicate gold inlay work on colored Belgian glass. Which royal city of Rajasthan and family hold this closely guarded GI heritage?",
        "options": [
          "Pratapgarh (Rajsoni family)",
          "Bikaner (Usta family)",
          "Jaipur (Shekhawat family)",
          "Udaipur (Sikligar family)"
        ],
        "correct": 0,
        "explanation": "Thewa Art originated in Pratapgarh during Maharawat Samant Singh's rule, invented by Nathuji Soni. The Rajsoni family exclusively practices it and possesses a GI tag."
      },
      "hi": {
        "question": "रंगीन बेल्जियम कांच पर सोने के अत्यंत बारीक और कलात्मक नक्काशी कार्य हेतु विख्यात 'थेवा कला' का संबंध राजस्थान के किस जिले तथा किस शिल्पी घराने से है?",
        "options": [
          "प्रतापगढ़ (राजसोनी परिवार)",
          "बीकानेर (उस्ता परिवार)",
          "जयपुर (शेखावत परिवार)",
          "बाड़मेर (खत्री परिवार)"
        ],
        "correct": 0,
        "explanation": "प्रतापगढ़ की थेवा कला का प्रवर्तन नाथूजी सोनी ने किया था। यह कला केवल प्रतापगढ़ के राजसोनी परिवार तक ही सीमित है और इसे जीआई टैग प्राप्त है।"
      }
    },
    {
      "key": "raj_crafts_usta_art",
      "subtopic": "Handicrafts (हस्तशिल्प)",
      "score": 96,
      "tags": [
        "Usta Art",
        "Munawwat",
        "Bikaner",
        "Camel Hide"
      ],
      "en": {
        "question": "Munawwat / Usta Art involves exquisite gold embossing and painting on camel hide. Which city is synonymous with this art and which master artist received Padma Shri?",
        "options": [
          "Bikaner (Hisam-ud-din Usta)",
          "Jodhpur (Kripal Singh)",
          "Kota (Devi Lal)",
          "Barmer (Kalu Ram)"
        ],
        "correct": 0,
        "explanation": "Usta Art is practiced by the Usta artisans of Bikaner. Master artist Hisam-ud-din Usta was awarded Padma Shri in 1986. It holds a Geographical Indication (GI) tag."
      },
      "hi": {
        "question": "ऊंट की खाल पर स्वर्ण मीनाकारी एवं मुनव्वत कार्य हेतु विख्यात 'उस्ता कला' किस नगर की पहचान है तथा किस सिद्धहस्त कलाकार को पद्मश्री से सम्मानित किया गया था?",
        "options": [
          "बीकानेर (हिसामुद्दीन उस्ता)",
          "जोधपुर (कृपाल सिंह)",
          "जयपुर (गोपाल सैनी)",
          "जैसलमेर (अब्दुल गफूर)"
        ],
        "correct": 0,
        "explanation": "बीकानेर के उस्ता कलाकार ऊंट की खाल के कुप्पों व वस्तुओं पर स्वर्णिम मीनाकारी करते हैं। हिसामुद्दीन उस्ता को इसके लिए पद्मश्री मिला था।"
      }
    },
    {
      "key": "raj_crafts_blue_pottery",
      "subtopic": "Handicrafts (हस्तशिल्प)",
      "score": 98,
      "tags": [
        "Blue Pottery",
        "Jaipur",
        "Kripal Singh Shekhawat",
        "Ram Singh II"
      ],
      "en": {
        "question": "Blue Pottery of Jaipur, introduced from Persia/Turkestan during Sawai Ram Singh II's reign, was revived to global acclaim by which Padma Shri artist?",
        "options": [
          "Kripal Singh Shekhawat",
          "Nathuji Soni",
          "Hisam-ud-din Usta",
          "Bhur Singh Shekhawat"
        ],
        "correct": 0,
        "explanation": "Sawai Ram Singh II encouraged Blue Pottery. Padma Shri Kripal Singh Shekhawat revived this craft by introducing 25 different color shades (Kripal Kumbh)."
      },
      "hi": {
        "question": "ईरान और पर्शिया से जयपुर लाई गई प्रसिद्ध 'ब्लू पॉटरी' को राजा सवाई रामसिंह द्वितीय ने संरक्षण दिया। 25 नए रंगों का आविष्कार कर इसे अंतरराष्ट्रीय पहचान दिलाने वाले पद्मश्री शिल्पकार कौन थे?",
        "options": [
          "कृपाल सिंह शेखावत",
          "नाथूजी सोनी",
          "हिसामुद्दीन उस्ता",
          "मोहनलाल कुमार"
        ],
        "correct": 0,
        "explanation": "जयपुर की ब्लू पॉटरी को नई शैली और रंगों के संयोजन द्वारा विश्व स्तर पर प्रतिष्ठित करने वाले पद्मश्री कृपाल सिंह शेखावत थे।"
      }
    },
    {
      "key": "raj_integration_stages",
      "subtopic": "Integration of Rajasthan (राजस्थान का एकीकरण)",
      "score": 99,
      "tags": [
        "Integration",
        "7 Stages",
        "1 Nov 1956",
        "Matsya"
      ],
      "en": {
        "question": "The political integration of Rajasthan was completed in 7 stages from 17 March 1948 to 1 November 1956. Which four princely states formed the first stage 'Matsya Union'?",
        "options": [
          "Alwar, Bharatpur, Dholpur, and Karauli",
          "Kota, Bundi, Jhalawar, and Tonk",
          "Jaipur, Jodhpur, Bikaner, and Jaisalmer",
          "Udaipur, Dungarpur, Banswara, and Pratapgarh"
        ],
        "correct": 0,
        "explanation": "Matsya Union was formed on 18 March 1948 by Alwar, Bharatpur, Dholpur, and Karauli along with Neemrana chiefship. K.M. Munshi suggested the name Matsya Union; Shobharam Kumawat was Prime Minister."
      },
      "hi": {
        "question": "राजस्थान का एकीकरण 17/18 मार्च 1948 से 1 नवंबर 1956 तक 7 चरणों में संपन्न हुआ। प्रथम चरण में गठित 'मत्स्य संघ' में कौन सी चार रियासतें सम्मिलित थीं?",
        "options": [
          "अलवर, भरतपुर, धौलपुर एवं करौली",
          "कोटा, बूंदी, झालावाड़ एवं टोंक",
          "जयपुर, जोधपुर, बीकानेर एवं जैसलमेर",
          "डूंगरपुर, बांसवाड़ा, प्रतापगढ़ एवं उदयपुर"
        ],
        "correct": 0,
        "explanation": "मत्स्य संघ में अलवर, भरतपुर, धौलपुर और करौली शामिल थे। के.एम. मुंशी के सुझाव पर इसे 'मत्स्य संघ' नाम दिया गया तथा शोभाराम कुमावत प्रधानमंत्री बने।"
      }
    },
    {
      "key": "raj_integration_greater",
      "subtopic": "Integration of Rajasthan (राजस्थान का एकीकरण)",
      "score": 98,
      "tags": [
        "Greater Rajasthan",
        "Step 4",
        "30 March",
        "Rajasthan Day"
      ],
      "en": {
        "question": "Why is 30th March celebrated as 'Rajasthan Day' (Rajasthan Diwas)?",
        "options": [
          "Greater Rajasthan (Brihat Rajasthan) was formed on 30 March 1949 merging Jaipur, Jodhpur, Bikaner, and Jaisalmer",
          "The integration was finalized on 30 March 1956",
          "Matsya Union was signed on 30 March 1948",
          "First Rajasthan Legislative Assembly met on 30 March 1952"
        ],
        "correct": 0,
        "explanation": "On 30 March 1949, the 4 major Rajput states (Jaipur, Jodhpur, Bikaner, Jaisalmer) merged to form Greater Rajasthan, inaugurated by Sardar Vallabhbhai Patel. Hence 30 March is celebrated as Rajasthan Day."
      },
      "hi": {
        "question": "प्रतिवर्ष 30 मार्च को 'राजस्थान दिवस' (राजस्थान स्थापना दिवस) क्यों मनाया जाता है?",
        "options": [
          "30 मार्च 1949 को चार बड़ी रियासतों (जयपुर, जोधपुर, बीकानेर, जैसलमेर) के विलय से 'बृहत् राजस्थान' का गठन हुआ",
          "30 मार्च 1956 को राज्य पुनर्गठन आयोग की सिफारिशें लागू हुईं",
          "30 मार्च 1948 को मत्स्य संघ का गठन हुआ था",
          "30 मार्च 1952 को राजस्थान विधानसभा की प्रथम बैठक हुई थी"
        ],
        "correct": 0,
        "explanation": "30 मार्च 1949 को सरदार वल्लभभाई पटेल ने जयपुर में बृहत् राजस्थान का उद्घाटन किया था, इसी उपलक्ष्य में प्रतिवर्ष 30 मार्च को राजस्थान दिवस मनाया जाता है।"
      }
    },
    {
      "key": "raj_fairs_pushkar",
      "subtopic": "Fairs & Festivals (मेले एवं त्योहार)",
      "score": 97,
      "tags": [
        "Pushkar",
        "Kartik Purnima",
        "Camel Fair",
        "Brahma Temple"
      ],
      "en": {
        "question": "The world-famous Pushkar Fair, featuring the only ancient major temple of Lord Brahma and a vibrant international camel fair, is celebrated during which Hindu tithi?",
        "options": [
          "Kartik Shukla Ekadashi to Kartik Purnima",
          "Chaitra Shukla Navami",
          "Bhadrapada Shukla Dashami",
          "Magha Purnima"
        ],
        "correct": 0,
        "explanation": "Pushkar Fair in Ajmer culminates on Kartik Purnima (full moon). Pilgrims bathe in holy Pushkar lake (52 ghats) and worship at Jagatpita Brahma Temple."
      },
      "hi": {
        "question": "विश्वप्रसिद्ध पुष्कर मेला, जहां जगतपिता ब्रह्मा जी का प्राचीन मंदिर स्थित है और विशाल अंतरराष्ट्रीय ऊंट मेला भरता है, किस हिंदू तिथि को आयोजित होता है?",
        "options": [
          "कार्तिक शुक्ल एकादशी से कार्तिक पूर्णिमा तक",
          "चैत्र शुक्ल नवमी",
          "भाद्रपद शुक्ल दशमी",
          "माघ पूर्णिमा"
        ],
        "correct": 0,
        "explanation": "अजमेर का पुष्कर मेला कार्तिक पूर्णिमा को चरम पर होता है जहां 52 घाटों पर पवित्र स्नान किया जाता है। इसे 'तीर्थराज' और 'रंगीला मेला' भी कहते हैं।"
      }
    },
    {
      "key": "raj_fairs_beneshwar",
      "subtopic": "Fairs & Festivals (मेले एवं त्योहार)",
      "score": 98,
      "tags": [
        "Beneshwar",
        "Tribal Kumbh",
        "Som Mahi Jakham",
        "Magh Purnima"
      ],
      "en": {
        "question": "Beneshwar Dham, located at the sacred Triveni confluence of Som, Mahi, and Jakham rivers in Dungarpur, is celebrated on Magh Purnima as what?",
        "options": [
          "The Kumbh of Tribals / Vagad ka Kumbh",
          "Kumbh of Thar",
          "Bishnoi Mahakumbh",
          "Matsya Mela"
        ],
        "correct": 0,
        "explanation": "Beneshwar fair at Navatpura (Dungarpur) on Magh Purnima is worshipped by Bhils and is the world-famous 'Tribal Kumbh'. The presiding deity is a naturally fractured Shivling."
      },
      "hi": {
        "question": "डूंगरपुर जिले के नवाटापुरा गांव में सोम, माही और जाखम के त्रिवेणी संगम पर माघ पूर्णिमा को आयोजित होने वाले बेणेश्वर मेले को क्या कहा जाता है?",
        "options": [
          "आदिवासियों का महाकुंभ (वागड़ का पुष्कर)",
          "थार का कुंभ",
          "बिश्नोईयों का कुंभ",
          "हाड़ौती का सुरंगा मेला"
        ],
        "correct": 0,
        "explanation": "बेणेश्वर धाम माघ पूर्णिमा को भरता है जहां देश भर के भील आदिवासी एकत्र होते हैं। इसे आदिवासियों का कुंभ कहा जाता है। यहां खंडित शिवलिंग की पूजा होती है।"
      }
    }
  ],
  "raj_geography": [
    {
      "key": "raj_geo_aravalli_peaks",
      "subtopic": "Physiographic Divisions (भौतिक प्रदेश)",
      "score": 99,
      "tags": [
        "Aravalli",
        "Guru Shikhar",
        "Ser",
        "Peaks"
      ],
      "en": {
        "question": "Arrange the following mountain peaks of the Aravalli range in Rajasthan in strictly descending order of their heights: (1) Ser, (2) Guru Shikhar, (3) Dilwara, (4) Jhargha",
        "options": [
          "2 - 1 - 3 - 4 (Guru Shikhar: 1722m, Ser: 1597m, Dilwara: 1442m, Jhargha: 1431m)",
          "1 - 2 - 3 - 4",
          "2 - 3 - 1 - 4",
          "2 - 1 - 4 - 3"
        ],
        "correct": 0,
        "explanation": "Heights of prominent Aravalli peaks: 1) Guru Shikhar (1722m, Sirohi), 2) Ser (1597m, Sirohi), 3) Dilwara (1442m, Sirohi), 4) Jhargha (1431m, Udaipur), 5) Achalgarh (1380m, Sirohi)."
      },
      "hi": {
        "question": "राजस्थान में अरावली पर्वतमाला की निम्नलिखित चोटियों को उनकी ऊंचाई के अनुसार अवरोही क्रम (घटते क्रम) में व्यवस्थित कीजिए: (1) सेर, (2) गुरुशिखर, (3) दिलवाड़ा, (4) जरगा",
        "options": [
          "2 - 1 - 3 - 4 (गुरुशिखर: 1722 मी., सेर: 1597 मी., दिलवाड़ा: 1442 मी., जरगा: 1431 मी.)",
          "1 - 2 - 3 - 4",
          "2 - 3 - 1 - 4",
          "2 - 1 - 4 - 3"
        ],
        "correct": 0,
        "explanation": "अरावली की सर्वोच्च चोटियां: गुरुशिखर (1722 मी.), सेर (1597 मी.), दिलवाड़ा (1442 मी.), जरगा (1431 मी.), अचलगढ़ (1380 मी.)।"
      }
    },
    {
      "key": "raj_geo_luni_river",
      "subtopic": "Drainage System (अपवाह तंत्र)",
      "score": 98,
      "tags": [
        "Luni River",
        "Balotra",
        "Nag Pahar",
        "Saline"
      ],
      "en": {
        "question": "The Luni river originates from Nag Pahar (Ajmer). At which location does its water turn from fresh (sweet) to completely brackish (saline)?",
        "options": [
          "Balotra (बालोतरा)",
          "Bilara (बिलाड़ा)",
          "Tilwara (तिलवाड़ा)",
          "Samdari (समदड़ी)"
        ],
        "correct": 0,
        "explanation": "The Luni is fresh up to Balotra because the soil has low salt content. Beyond Balotra, it flows through salt-rich playa depressions and desert soils with sodium chloride deposits, turning saline."
      },
      "hi": {
        "question": "नाग पहाड़ (अजमेर) से निकलने वाली लूनी नदी का जल किस स्थान तक मीठा रहता है तथा उसके बाद अत्यधिक खारा हो जाता है?",
        "options": [
          "बालोतरा (Balotra)",
          "बिलाड़ा (जोधपुर ग्रामीण)",
          "तिलवाड़ा (बालोतरा)",
          "समदड़ी"
        ],
        "correct": 0,
        "explanation": "लूनी नदी अजमेर से बालोतरा तक मीठे जल वाली रहती है, परंतु बालोतरा के बाद मिट्टी में लवणीय तत्वों (सोडियम क्लोराइड) की अधिकता के कारण इसका जल खारा हो जाता है।"
      }
    },
    {
      "key": "raj_geo_banas_river",
      "subtopic": "Drainage System (अपवाह तंत्र)",
      "score": 97,
      "tags": [
        "Banas",
        "Van Ki Asha",
        "Khamnor",
        "Chambal"
      ],
      "en": {
        "question": "Which river originates from the Khamnor hills (Rajsamand), is known as 'Van ki Asha' (Hope of the Forest), and flows entirely within Rajasthan to join the Chambal at Rameshwar Ghat?",
        "options": [
          "Banas River (बनास)",
          "Bedach River",
          "Banganga River",
          "Kalisindh River"
        ],
        "correct": 0,
        "explanation": "Banas originates in Khamnor hills (Rajsamand). With a length of 512 km, it is the longest river flowing entirely within Rajasthan, joining Chambal at Rameshwar Ghat (Sawai Madhopur)."
      },
      "hi": {
        "question": "खमनोर की पहाड़ियों (राजसमंद) से निकलने वाली कौन सी नदी 'वन की आशा' (वर्णाशा) कहलाती है और पूर्णतः राजस्थान में बहकर रामेश्वर घाट पर चंबल में मिल जाती है?",
        "options": [
          "बनास नदी (Banas River)",
          "बेड़च नदी",
          "बाणगंगा नदी",
          "कालीसिंध नदी"
        ],
        "correct": 0,
        "explanation": "बनास नदी पूर्णतः राजस्थान में बहने वाली सबसे लंबी नदी (512 किमी) है। इसे वर्णाशा या वन की आशा कहा जाता है।"
      }
    },
    {
      "key": "raj_geo_mahi_river",
      "subtopic": "Drainage System (अपवाह तंत्र)",
      "score": 99,
      "tags": [
        "Mahi River",
        "Tropic of Cancer",
        "Chhapan Plain",
        "Khambhat"
      ],
      "en": {
        "question": "Which unique river enters Rajasthan near Khandu village (Banswara), forms the boundary between Dungarpur and Banswara, cuts the Tropic of Cancer (23.5° N) twice, and drains into the Gulf of Khambhat?",
        "options": [
          "Mahi River (माही)",
          "Sabarmati River",
          "Som River",
          "Jakham River"
        ],
        "correct": 0,
        "explanation": "Mahi river originates in Amjhero (Dhar, MP). It enters Rajasthan at Khandu (Banswara), crosses the Tropic of Cancer twice, creates the fertile Chhapan Plains, and empties into the Gulf of Khambhat."
      },
      "hi": {
        "question": "राजस्थान की कौन सी नदी खांदू गांव (बांसवाड़ा) के निकट प्रवेश करती है, कर्क रेखा (23.5° उत्तरी अक्षांश) को दो बार पार करती है तथा खंभात की खाड़ी में विलीन होती है?",
        "options": [
          "माही नदी (Mahi River)",
          "साबरमती नदी",
          "सोम नदी",
          "जाखम नदी"
        ],
        "correct": 0,
        "explanation": "माही नदी विंध्याचल (मध्य प्रदेश) से निकलकर राजस्थान में 'यू' आकार का मोड़ बनाती हुई कर्क रेखा को दो बार काटती है और खंभात की खाड़ी (अरब सागर) में गिरती है।"
      }
    },
    {
      "key": "raj_geo_chambal_river",
      "subtopic": "Drainage System (अपवाह तंत्र)",
      "score": 99,
      "tags": [
        "Chambal",
        "Chulia Falls",
        "Janapav",
        "Badlands"
      ],
      "en": {
        "question": "Chambal river enters Rajasthan at Chaurasigarh (Chittorgarh) from Janapav hills (MP). Which famous waterfall of 18 meters height is formed by it near Bhensrorgarh?",
        "options": [
          "Chulia Falls (चूलिया जलप्रपात)",
          "Dhuandhar Falls",
          "Menal Falls",
          "Bhimlat Falls"
        ],
        "correct": 0,
        "explanation": "Chambal river forms the 18-meter-high Chulia Waterfall near Bhensrorgarh at the confluence with the Bamani river. It is famous for extensive deep ravines (Badland topography / Utkhat Bhumi)."
      },
      "hi": {
        "question": "मध्य प्रदेश की जनापाव पहाड़ियों से निकलकर चौरासीगढ़ (चित्तौड़गढ़) से राजस्थान में प्रवेश करने वाली चंबल नदी भैंसरोड़गढ़ के निकट कौन सा 18 मीटर ऊंचा जलप्रपात बनाती है?",
        "options": [
          "चूलिया जलप्रपात (Chulia Falls)",
          "धुआंधार जलप्रपात",
          "मेनाल जलप्रपात",
          "भीमलत जलप्रपात"
        ],
        "correct": 0,
        "explanation": "चंबल नदी भैंसरोड़गढ़ के निकट बामनी नदी के संगम पर 18 मीटर ऊंचा 'चूलिया जलप्रपात' बनाती है। यह नदी अपने बीहड़ों और उत्खात स्थलाकृति (Badlands) हेतु विख्यात है।"
      }
    },
    {
      "key": "raj_geo_sambhar_lake",
      "subtopic": "Lakes & Wetlands (झीलें एवं आर्द्रभूमि)",
      "score": 98,
      "tags": [
        "Sambhar Lake",
        "Ramsar",
        "Salt Production",
        "8.7%"
      ],
      "en": {
        "question": "Sambhar Salt Lake is India's largest inland saline lake. Approximately what percentage of total salt produced in India is harvested from Sambhar Lake?",
        "options": [
          "8.7% (लगभग 8.7%)",
          "15.2%",
          "4.3%",
          "22.5%"
        ],
        "correct": 0,
        "explanation": "Sambhar Lake accounts for ~8.7% of India's total salt production. Fed by 4 rivers (Mendha, Rupangarh, Khari, Khandel), it was designated a Ramsar Wetland in 1990."
      },
      "hi": {
        "question": "भारत की सबसे बड़ी अंतःस्थलीय खारे पानी की झील 'सांभर झील' देश के कुल नमक उत्पादन का लगभग कितना प्रतिशत उत्पादित करती है?",
        "options": [
          "8.7% (लगभग 8.7 प्रतिशत)",
          "15.2%",
          "4.3%",
          "22.5%"
        ],
        "correct": 0,
        "explanation": "सांभर झील भारत के कुल नमक उत्पादन का लगभग 8.7% हिस्सा उत्पादित करती है। 1990 में इसे रामसर आर्द्रभूमि स्थल घोषित किया गया था।"
      }
    },
    {
      "key": "raj_geo_pachpadra_lake",
      "subtopic": "Lakes & Wetlands (झीलें एवं आर्द्रभूमि)",
      "score": 96,
      "tags": [
        "Pachpadra",
        "Balotra",
        "98% NaCl",
        "Morli Bush"
      ],
      "en": {
        "question": "From Pachpadra Lake (Balotra district), salt with up to 98% pure sodium chloride (NaCl) is traditionally manufactured by the Kharwal community using twigs of which plant?",
        "options": [
          "Morli Bush (मोरली झाड़ी)",
          "Kair Bush",
          "Babul Bush",
          "Lana Bush"
        ],
        "correct": 0,
        "explanation": "At Pachpadra Lake, the Kharwal community uses branches of the Morli bush (Lycium barbarum) to harvest crystal salt with 98% sodium chloride purity."
      },
      "hi": {
        "question": "पचपदरा झील (बालोतरा) से खारवाल जाति के लोगों द्वारा किस झाड़ी की टहनियों के उपयोग से 98% तक शुद्ध सोडियम क्लोराइड (NaCl) युक्त सर्वोत्तम खाने योग्य नमक तैयार किया जाता है?",
        "options": [
          "मोरली झाड़ी (Morli Bush)",
          "कैर की झाड़ी",
          "बबूल की झाड़ी",
          "लाना झाड़ी"
        ],
        "correct": 0,
        "explanation": "पचपदरा झील में खारवाल जाति के लोग मोरली झाड़ी की टहनियों से वायु-प्रक्रिया द्वारा 98% शुद्ध नमक स्फटिक तैयार करते हैं।"
      }
    },
    {
      "key": "raj_geo_rajsamand_lake",
      "subtopic": "Lakes & Wetlands (झीलें एवं आर्द्रभूमि)",
      "score": 97,
      "tags": [
        "Rajsamand",
        "Nau Chowki",
        "Raj Prashasti",
        "Ranchhod Bhatt"
      ],
      "en": {
        "question": "On the 'Nau Chowki' embankment of Rajsamand Lake, which Sanskrit inscription—the world's largest stone inscription carved across 25 black marble slabs—was composed by Ranchhod Bhatt?",
        "options": [
          "Raj Prashasti (राजप्रशस्ति महाकाव्य)",
          "Bijolia Inscription",
          "Kumbhalgarh Prashasti",
          "Ghosundi Inscription"
        ],
        "correct": 0,
        "explanation": "Raj Prashasti Mahakavya was composed by Ranchhod Bhatt Tailang on 25 black marble slabs at Nau Chowki, Rajsamand Lake, chronicling the history of Mewar from Bappa Rawal to Maharana Raj Singh."
      },
      "hi": {
        "question": "राजसमंद झील की 'नौ चौकी' पाल पर 25 काले संगमरमर के शिलालेखों पर रणछोड़ भट्ट तैलंग द्वारा उत्कीर्ण संसार का सबसे बड़ा शिलालेख कौन सा है?",
        "options": [
          "राजप्रशस्ति (Raj Prashasti)",
          "बिजौलिया शिलालेख",
          "कुंभलगढ़ प्रशस्ति",
          "घोसुंडी शिलालेख"
        ],
        "correct": 0,
        "explanation": "महाराणा राजसिंह द्वारा निर्मित राजसमंद झील की नौ चौकी पाल पर रणछोड़ भट्ट द्वारा रचित 'राजप्रशस्ति महाकाव्य' 25 पाषाण पट्टिकाओं पर संस्कृत में उत्कीर्ण है।"
      }
    },
    {
      "key": "raj_geo_thar_sand_dunes",
      "subtopic": "Physiographic Divisions (भौतिक प्रदेश)",
      "score": 96,
      "tags": [
        "Thar Desert",
        "Barchan",
        "Crescent",
        "Sand Dunes"
      ],
      "en": {
        "question": "Which crescent-shaped, highly dynamic transverse sand dunes are responsible for the maximum desertification and soil shifting in western Rajasthan?",
        "options": [
          "Barchan Dunes (बरखान / बालुका स्तूप)",
          "Seif Dunes",
          "Parabolic Dunes",
          "Star Dunes"
        ],
        "correct": 0,
        "explanation": "Barchan dunes are crescent-shaped dynamic dunes with horns pointing in the direction of wind. Found predominantly in Churu, Bikaner, Phalodi, and Sikar, they cause severe desert encroachment."
      },
      "hi": {
        "question": "पश्चिमी राजस्थान में सर्वाधिक गतिशील एवं मरुस्थलीकरण (रेगिस्तान प्रसार) हेतु सबसे खतरनाक अर्धचंद्राकार बालुका स्तूप क्या कहलाते हैं?",
        "options": [
          "बरखान बालुका स्तूप (Barchans)",
          "सीफ बालुका स्तूप",
          "पैराबोलिक बालुका स्तूप",
          "तारा बालुका स्तूप"
        ],
        "correct": 0,
        "explanation": "बरखान अर्धचंद्राकार बालुका स्तूप होते हैं जिनकी उत्तल दिशा हवा के सामने होती है। ये अत्यंत गतिशील होते हैं और मरुस्थलीकरण के मुख्य कारण हैं।"
      }
    },
    {
      "key": "raj_geo_lathi_series",
      "subtopic": "Physiographic Divisions (भौतिक प्रदेश)",
      "score": 97,
      "tags": [
        "Lathi Series",
        "Groundwater Belt",
        "Sevan Grass",
        "Pokaran"
      ],
      "en": {
        "question": "What is the 'Lathi Series' (लाठी सीरीज) in Jaisalmer district?",
        "options": [
          "A subterranean geological freshwater aquifer belt rich in nutritious Sevan grass",
          "A volcanic basalt ridge",
          "A chain of copper mines",
          "A range of granite hillocks"
        ],
        "correct": 0,
        "explanation": "Lathi Series is a 60-km subterranean geological aquifer belt stretching between Pokaran and Mohangarh in Jaisalmer, known for sweet groundwater and nutrient-rich Sevan grass (Lasiurus scindicus)."
      },
      "hi": {
        "question": "जैसलमेर जिले में पोकरण से मोहनगढ़ तक विस्तृत 'लाठी सीरीज' (Lathi Series) वास्तव में क्या है?",
        "options": [
          "मीठे भूगर्भीय जल की एक भूवैज्ञानिक पट्टी जहां पौष्टिक 'सेवण घास' प्रचुरता से उगती है",
          "ज्वालामुखीय बेसाल्ट चट्टानों की एक श्रृंखला",
          "तांबे की खदानों का क्षेत्र",
          "ग्रेनाइट की अवशिष्ट पहाड़ियों की पट्टी"
        ],
        "correct": 0,
        "explanation": "लाठी सीरीज पोकरण से मोहनगढ़ के बीच 60 किमी लंबी भूगर्भीय जल-पट्टी है जहां चांदन नलकूप (थार का घड़ा) स्थित है तथा सेवण घास (धामण-करड़) पाई जाती है।"
      }
    },
    {
      "key": "raj_geo_koeppen_bwhw",
      "subtopic": "Climate & Agro-Zones (जलवायु)",
      "score": 98,
      "tags": [
        "Koeppen",
        "BWhw",
        "Hot Arid",
        "Jaisalmer"
      ],
      "en": {
        "question": "According to Wladimir Köppen's climate classification, which climatic code represents the hot, arid tropical desert region of western Rajasthan (Jaisalmer, Bikaner, Phalodi)?",
        "options": [
          "BWhw (उष्ण मरुस्थलीय जलवायु)",
          "BShw (अर्धशुष्क स्टेपी)",
          "Cwg (मानसूनी जलवायु)",
          "Aw (उष्ण कटिबंधीय आर्द्र)"
        ],
        "correct": 0,
        "explanation": "Under Köppen's system: BWhw = Hot arid desert climate (rainfall < 20 cm, xerophytic vegetation); BShw = Semi-arid steppe; Cwg = Sub-humid eastern plains; Aw = Tropical wet south/Hadoti."
      },
      "hi": {
        "question": "कोपेन के जलवायु वर्गीकरण के अनुसार पश्चिमी राजस्थान के अत्यधिक गर्म, शुष्क मरुस्थलीय क्षेत्र (जैसलमेर, बीकानेर, फलोदी) को किस कोड द्वारा दर्शाया गया है?",
        "options": [
          "BWhw (उष्ण कटिबंधीय शुष्क मरुस्थलीय जलवायु)",
          "BShw (अर्धशुष्क स्टेपी जलवायु)",
          "Cwg (शुष्क शीत मानसूनी जलवायु)",
          "Aw (उष्ण कटिबंधीय आर्द्र जलवायु)"
        ],
        "correct": 0,
        "explanation": "कोपेन के अनुसार BWhw शुष्क मरुस्थलीय जलवायु का सूचक है जहाँ 20 सेमी से कम वर्षा होती है तथा कंटीली मरुद्भिद (Xerophytes) वनस्पति पाई जाती है।"
      }
    },
    {
      "key": "raj_geo_soils_vertisols",
      "subtopic": "Soils of Rajasthan (मृदा संसाधन)",
      "score": 96,
      "tags": [
        "Vertisols",
        "Black Cotton Soil",
        "Hadoti",
        "Clayey"
      ],
      "en": {
        "question": "According to the modern USDA comprehensive soil taxonomy, in which region of Rajasthan are 'Vertisols' (deep black cotton clay soils with high moisture-retention) predominantly found?",
        "options": [
          "Hadoti Plateau (Kota, Bundi, Baran, Jhalawar)",
          "Thar Desert (Jaisalmer, Barmer)",
          "Eastern Plains (Bharatpur, Alwar)",
          "Aravalli Range (Udaipur, Sirohi)"
        ],
        "correct": 0,
        "explanation": "Vertisols (black soils rich in montmorillonite clay) are found in the south-eastern Hadoti plateau (Kota, Bundi, Baran, Jhalawar), ideal for cotton, soybean, and coriander."
      },
      "hi": {
        "question": "आधुनिक मृदा वर्गीकरण (USDA) के अनुसार अत्यधिक जल-धारण क्षमता वाली गहरी काली चिकनी मिट्टी 'वर्टीसोल्स' (Vertisols) राजस्थान के किस क्षेत्र में पाई जाती है?",
        "options": [
          "हाड़ौती का पठार (कोटा, बूंदी, बारां, झालावाड़)",
          "थार मरुस्थल (जैसलमेर, बाड़मेर)",
          "पूर्वी मैदानी भाग (भरतपुर, अलवर)",
          "अरावली पर्वतीय क्षेत्र (सिरोही, उदयपुर)"
        ],
        "correct": 0,
        "explanation": "वर्टीसोल्स मृदा दक्कन लावा पठार के अपक्षय से निर्मित काली कपासी मिट्टी है जो हाड़ौती क्षेत्र (कोटा संभाग) में सोयाबीन व कपास की खेती हेतु उपयुक्त है।"
      }
    },
    {
      "key": "raj_geo_mineral_lead_zinc",
      "subtopic": "Minerals & Mines (खनिज संसाधन)",
      "score": 99,
      "tags": [
        "Lead Zinc",
        "Rampura Agucha",
        "Zawar",
        "Silver"
      ],
      "en": {
        "question": "Rampura-Agucha mine in Bhilwara district and Zawar mines in Udaipur are globally renowned for the extraction of which critical mineral deposits?",
        "options": [
          "Lead, Zinc, and Silver (सीसा, जस्ता एवं चांदी)",
          "Copper and Iron Ore",
          "Tungsten and Beryllium",
          "Manganese and Bauxite"
        ],
        "correct": 0,
        "explanation": "Rampura-Agucha (Bhilwara) is one of the world's richest zinc-lead deposits. Zawar mines (Udaipur) were mined since the Maharana Lakha era. Rajasthan produces almost 100% of India's lead and zinc."
      },
      "hi": {
        "question": "भीलवाड़ा जिले की रामपुरा-आगूचा खान तथा उदयपुर की जावर खानें किस महत्वपूर्ण खनिज के विशाल भंडार हेतु विश्वविख्यात हैं?",
        "options": [
          "सीसा, जस्ता एवं चांदी (Lead, Zinc & Silver)",
          "तांबा एवं लौह अयस्क",
          "टंगस्टन एवं बेरिलियम",
          "मैंगनीज एवं बॉक्साइट"
        ],
        "correct": 0,
        "explanation": "रामपुरा-आगूचा (भीलवाड़ा) विश्व की समृद्धतम जस्ता-सीसा खदानों में से एक है। जावर (उदयपुर) से राणा लाखा के समय से सीसा-जस्ता व चांदी निकाली जा रही है।"
      }
    },
    {
      "key": "raj_geo_mineral_rock_phosphate",
      "subtopic": "Minerals & Mines (खनिज संसाधन)",
      "score": 98,
      "tags": [
        "Rock Phosphate",
        "Jhamarkotra",
        "Fertilizer",
        "Udaipur"
      ],
      "en": {
        "question": "The largest and richest deposit of Rock Phosphate in India, vital for chemical fertilizer production, is located at which site in Rajasthan?",
        "options": [
          "Jhamarkotra (Udaipur)",
          "Degana (Nagaur)",
          "Khetri (Jhunjhunu)",
          "Jamsar (Bikaner)"
        ],
        "correct": 0,
        "explanation": "Jhamarkotra in Udaipur is India's largest and premier open-cast rock phosphate mine, operated by Rajasthan State Mines and Minerals Limited (RSMML)."
      },
      "hi": {
        "question": "रासायनिक उर्वरक (DAP) उद्योग हेतु आवश्यक 'रॉक फॉस्फेट' का भारत में सबसे बड़ा एवं समृद्ध भंडार राजस्थान में कहाँ स्थित है?",
        "options": [
          "झामरकोटड़ा (उदयपुर)",
          "डेगाना (नागौर)",
          "खेतड़ी (झुंझुनू)",
          "जामसर (बीकानेर)"
        ],
        "correct": 0,
        "explanation": "उदयपुर का झामरकोटड़ा देश का सबसे बड़ा रॉक फॉस्फेट उत्पादक क्षेत्र है, जिसका संचालन राजस्थान राज्य खान एवं खनिज लिमिटेड (RSMML) द्वारा किया जाता है।"
      }
    },
    {
      "key": "raj_geo_mineral_tungsten",
      "subtopic": "Minerals & Mines (खनिज संसाधन)",
      "score": 97,
      "tags": [
        "Tungsten",
        "Degana",
        "Revat Hill",
        "Wolframite"
      ],
      "en": {
        "question": "The historic and premier deposit of Tungsten (Wolframite ore) in India is located on Revat Hill at which location in Rajasthan?",
        "options": [
          "Degana (Nagaur)",
          "Balda (Sirohi)",
          "Salumber",
          "Goth-Manglod"
        ],
        "correct": 0,
        "explanation": "Revat Hill in Degana (Nagaur) is India's most famous Tungsten deposit. Balda in Sirohi is another notable tungsten site in Rajasthan."
      },
      "hi": {
        "question": "विद्युत बल्ब के फिलामेंट तथा रक्षा उपकरणों में प्रयुक्त होने वाले दुर्लभ खनिज 'टंगस्टन' (वुल्फ्रेमाइट अयस्क) की प्रसिद्ध रेवत पहाड़ी किस स्थान पर स्थित है?",
        "options": [
          "डेगाना (नागौर)",
          "वालदा (सिरोही)",
          "सलादीपुरा (सीकर)",
          "गोठ-मांगलोद"
        ],
        "correct": 0,
        "explanation": "नागौर जिले के डेगाना की भाकरी/रेवत पहाड़ी देश में टंगस्टन उत्पादन का ऐतिहासिक केंद्र रही है। सिरोही का वालदा भी टंगस्टन हेतु जाना जाता है।"
      }
    },
    {
      "key": "raj_geo_mineral_copper",
      "subtopic": "Minerals & Mines (खनिज संसाधन)",
      "score": 98,
      "tags": [
        "Copper",
        "Khetri",
        "Singhana",
        "HCL"
      ],
      "en": {
        "question": "The iconic Khetri-Singhana copper mineral belt, operated by public sector Hindustan Copper Limited (HCL), is situated in which region?",
        "options": [
          "Jhunjhunu / Neem Ka Thana",
          "Alwar (Kho-Dariba)",
          "Bhilwara (Pur-Banera)",
          "Udaipur (Delwara)"
        ],
        "correct": 0,
        "explanation": "Khetri-Singhana copper belt is India's historic copper center, active since Indus Valley times. Hindustan Copper Limited operates the underground mines and smelting plants here."
      },
      "hi": {
        "question": "सार्वजनिक क्षेत्र की हिंदुस्तान कॉपर लिमिटेड (HCL) द्वारा संचालित ऐतिहासिक 'खेतड़ी-सिंघाना तांबा पट्टी' किस क्षेत्र में स्थित है?",
        "options": [
          "झुंझुनू / नीम का थाना",
          "अलवर (खो-दरीबा)",
          "भीलवाड़ा (पुर-बनेड़ा)",
          "सिरोही (रोहिड़ा)"
        ],
        "correct": 0,
        "explanation": "खेतड़ी-सिंघाना तांबा मेखला प्राचीन काल से तांबा खनन का प्रमुख केंद्र रही है। यहां भारत सरकार का उपक्रम हिंदुस्तान कॉपर लिमिटेड कार्यरत है।"
      }
    },
    {
      "key": "raj_geo_mineral_monopoly",
      "subtopic": "Minerals & Mines (खनिज संसाधन)",
      "score": 99,
      "tags": [
        "Monopoly Minerals",
        "Wollastonite",
        "Jasper",
        "Lead Zinc"
      ],
      "en": {
        "question": "In which group of minerals does Rajasthan enjoy an undisputed 100% or near-monopoly in total domestic production across India?",
        "options": [
          "Wollastonite, Jasper, Selenite, and Lead-Zinc",
          "Coal, Iron Ore, and Bauxite",
          "Chromite, Gold, and Diamond",
          "Mica, Uranium, and Thorium"
        ],
        "correct": 0,
        "explanation": "Rajasthan holds a virtual 100% monopoly in Wollastonite and Jasper, and over 95-99% in Selenite and Lead-Zinc concentrates."
      },
      "hi": {
        "question": "भारत के कुल खनिज उत्पादन में राजस्थान को किन खनिजों के उत्पादन में लगभग 100% (एकाधिकार) प्राप्त है?",
        "options": [
          "वोलास्टोनाइट, जास्पर, सेलेनाइट एवं सीसा-जस्ता",
          "कोयला, लौह अयस्क एवं बॉक्साइट",
          "क्रोमाइट, स्वर्ण एवं हीरा",
          "अभ्रक, यूरेनियम एवं थोरियम"
        ],
        "correct": 0,
        "explanation": "राजस्थान को 'खनिजों का अजायबघर' कहा जाता है। वोलास्टोनाइट और जास्पर के उत्पादन में राज्य का देश में शत-प्रतिशत एकाधिकार है।"
      }
    },
    {
      "key": "raj_geo_tiger_reserves",
      "subtopic": "Forests & Wildlife (वन्यजीव एवं अभयारण्य)",
      "score": 99,
      "tags": [
        "Tiger Reserves",
        "Ramgarh Vishdhari",
        "Dholpur Karauli",
        "5 Reserves"
      ],
      "en": {
        "question": "How many notified Tiger Reserves are currently operational in Rajasthan, and which is the newest (5th) Tiger Reserve?",
        "options": [
          "5 Tiger Reserves; Dholpur-Karauli Tiger Reserve (54th in India)",
          "4 Tiger Reserves; Ramgarh Vishdhari",
          "3 Tiger Reserves; Mukundra Hills",
          "6 Tiger Reserves; Kumbhalgarh"
        ],
        "correct": 0,
        "explanation": "Rajasthan has 5 Tiger Reserves: 1) Ranthambore (1973), 2) Sariska (1978), 3) Mukundra Hills (2013), 4) Ramgarh Vishdhari (2022, 52nd in India), 5) Dholpur-Karauli (2023, 54th in India)."
      },
      "hi": {
        "question": "राजस्थान में वर्तमान में कुल कितने अधिसूचित बाघ अभयारण्य (टाइगर रिजर्व) हैं तथा राज्य का नवीनतम (5वां) टाइगर रिजर्व कौन सा है?",
        "options": [
          "5 टाइगर रिजर्व; धौलपुर-करौली टाइगर रिजर्व (देश का 54वां)",
          "4 टाइगर रिजर्व; रामगढ़ विषधारी",
          "3 टाइगर रिजर्व; मुकुंदरा हिल्स",
          "6 टाइगर रिजर्व; कुंभलगढ़"
        ],
        "correct": 0,
        "explanation": "राजस्थान के 5 टाइगर रिजर्व: रणथंभौर, सरिस्का, मुकुंदरा हिल्स, रामगढ़ विषधारी (बूंदी) और 5वां धौलपुर-करौली (देश का 54वां टाइगर रिजर्व)।"
      }
    },
    {
      "key": "raj_geo_ramsar_wetlands",
      "subtopic": "Forests & Wildlife (वन्यजीव एवं अभयारण्य)",
      "score": 98,
      "tags": [
        "Ramsar Wetlands",
        "Keoladeo Ghana",
        "Sambhar",
        "Montreux"
      ],
      "en": {
        "question": "Which two wetland sites of Rajasthan are designated as Ramsar Wetlands of International Importance, with one listed in the Montreux Record?",
        "options": [
          "Keoladeo Ghana National Park (Bharatpur) and Sambhar Salt Lake",
          "Jaisamand Lake and Pichola Lake",
          "Tal Chhapar and Siliserh Lake",
          "Nakki Lake and Fateh Sagar"
        ],
        "correct": 0,
        "explanation": "Rajasthan has two Ramsar Sites: Keoladeo National Park (1981, listed in Montreux Record due to water scarcity/changes) and Sambhar Lake (1990)."
      },
      "hi": {
        "question": "राजस्थान के कौन से दो आर्द्रभूमि स्थल 'रामसर कन्वेंशन' के तहत अंतरराष्ट्रीय महत्व के वेटलैंड घोषित हैं, जिनमें से एक मॉन्ट्रो रिकॉर्ड में भी शामिल है?",
        "options": [
          "केवलादेव घना राष्ट्रीय उद्यान (भरतपुर) एवं सांभर झील",
          "जयसमंद झील एवं पिछोला झील",
          "तालछापर एवं सिलीसेढ़ झील",
          "नक्की झील एवं फतेह सागर"
        ],
        "correct": 0,
        "explanation": "केवलादेव घना (1981) और सांभर झील (1990) राजस्थान के दो रामसर स्थल हैं। जल संकट के चलते केवलादेव को मॉन्ट्रो रिकॉर्ड में रखा गया है।"
      }
    },
    {
      "key": "raj_geo_state_symbols",
      "subtopic": "State Symbols (राज्य प्रतीक)",
      "score": 99,
      "tags": [
        "Khejri",
        "Rohida",
        "Godavan",
        "Chinkara"
      ],
      "en": {
        "question": "Match the official state symbols of Rajasthan: (1) State Tree, (2) State Flower, (3) State Bird, (4) State Heritage Animal",
        "options": [
          "(1) Khejri (Prosopis cineraria), (2) Rohida (Tecomella undulata), (3) Godavan (Ardeotis nigriceps), (4) Camel (Camelus dromedarius)",
          "(1) Rohida, (2) Khejri, (3) Peacock, (4) Cow",
          "(1) Babool, (2) Lotus, (3) Great Indian Bustard, (4) Elephant",
          "(1) Neem, (2) Marigold, (3) Godavan, (4) Chinkara"
        ],
        "correct": 0,
        "explanation": "State symbols: Tree = Khejri (1983), Flower = Rohida (1983), Bird = Godavan / Great Indian Bustard (1981), Wild Animal = Chinkara (1981), Livestock Heritage Animal = Camel (2014)."
      },
      "hi": {
        "question": "राजस्थान के राज्य प्रतीकों का सही सुमेलन कीजिए: (1) राज्य वृक्ष, (2) राज्य पुष्प, (3) राज्य पक्षी, (4) राज्य पशु (पशुधन श्रेणी)",
        "options": [
          "(1) खेजड़ी (प्रोसोपिस सिनेरेरिया), (2) रोहिड़ा (टेकोमेला अंडुलेटा), (3) गोडावण (ग्रेट इंडियन बस्टर्ड), (4) ऊंट (कैमेलस ड्रोमेडेरियस)",
          "(1) रोहिड़ा, (2) खेजड़ी, (3) मोर, (4) गाय",
          "(1) बबूल, (2) कमल, (3) गोडावण, (4) हाथी",
          "(1) नीम, (2) गेंदा, (3) तीतर, (4) चिंकारा"
        ],
        "correct": 0,
        "explanation": "राज्य वृक्ष: खेजड़ी (1983), राज्य पुष्प: रोहिड़ा (1983), राज्य पक्षी: गोडावण (1981), राज्य पशु (वन्यजीव): चिंकारा, राज्य पशु (पशुधन): ऊंट (2014)।"
      }
    }
  ],
  "raj_polity_admin": [
    {
      "key": "raj_polity_governor_153",
      "subtopic": "State Executive (राज्यपाल)",
      "score": 99,
      "tags": [
        "Governor",
        "Article 153",
        "Article 163",
        "Discretion"
      ],
      "en": {
        "question": "Under which Article of the Indian Constitution does the Governor of Rajasthan exercise discretionary powers (विवेकाधीन शक्तियां) without being bound by the advice of the Council of Ministers?",
        "options": [
          "Article 163(1) and 163(2)",
          "Article 153",
          "Article 161",
          "Article 167"
        ],
        "correct": 0,
        "explanation": "Article 163(1) mandates a Council of Ministers to aid and advise the Governor, 'except in so far as he is by or under this Constitution required to exercise his functions or any of them in his discretion'. Article 163(2) makes the Governor's decision final."
      },
      "hi": {
        "question": "भारतीय संविधान के किस अनुच्छेद के तहत राजस्थान के राज्यपाल को विवेकाधीन शक्तियां प्राप्त हैं जहां वे मंत्रिपरिषद की सलाह मानने को बाध्य नहीं हैं?",
        "options": [
          "अनुच्छेद 163(1) एवं 163(2)",
          "अनुच्छेद 153",
          "अनुच्छेद 161",
          "अनुच्छेद 167"
        ],
        "correct": 0,
        "explanation": "अनुच्छेद 163(1) के अनुसार राज्यपाल को स्वविवेक से किए जाने वाले कार्यों को छोड़कर अन्य कार्यों में सहायता व सलाह देने हेतु मंत्रिपरिषद होगी। अनुच्छेद 163(2) राज्यपाल के स्वविवेक पर अंतिम निर्णय देता है।"
      }
    },
    {
      "key": "raj_polity_first_governor",
      "subtopic": "State Executive (राज्यपाल)",
      "score": 98,
      "tags": [
        "Governor",
        "Gurumukh Nihal Singh",
        "1 Nov 1956",
        "Rajpramukh"
      ],
      "en": {
        "question": "Who was the first Governor of Rajasthan, appointed on 1 November 1956 following the abolition of the 'Rajpramukh' institution by the 7th Constitutional Amendment?",
        "options": [
          "Sardar Gurumukh Nihal Singh",
          "Dr. Sampurnanand",
          "Hukum Singh",
          "Maharaja Man Singh II"
        ],
        "correct": 0,
        "explanation": "Sardar Gurumukh Nihal Singh took oath as Rajasthan's first Governor on 1 Nov 1956. Prior to this, Maharaja Man Singh II served as the sole Rajpramukh of Rajasthan."
      },
      "hi": {
        "question": "7वें संविधान संशोधन (1956) द्वारा 'राजप्रमुख' पद समाप्त किए जाने के बाद 1 नवंबर 1956 को राजस्थान के प्रथम राज्यपाल कौन नियुक्त किए गए थे?",
        "options": [
          "सरदार गुरुमुख निहाल सिंह",
          "डॉ. संपूर्णानंद",
          "हुकुम सिंह",
          "सवाई मानसिंह द्वितीय"
        ],
        "correct": 0,
        "explanation": "1 नवंबर 1956 को राज्य पुनर्गठन के समय सरदार गुरुमुख निहाल सिंह ने राजस्थान के प्रथम राज्यपाल के रूप में शपथ ली। इससे पूर्व सवाई मानसिंह द्वितीय राजप्रमुख थे।"
      }
    },
    {
      "key": "raj_polity_cabinet_limit",
      "subtopic": "State Council of Ministers (मंत्रिपरिषद)",
      "score": 98,
      "tags": [
        "91st Amendment",
        "Cabinet Size",
        "15 Percent",
        "30 Ministers"
      ],
      "en": {
        "question": "Under the 91st Constitutional Amendment Act 2003, what is the maximum and minimum permissible number of Ministers (including the Chief Minister) in the Rajasthan Council of Ministers?",
        "options": [
          "Maximum 30 (15% of 200 seats) and Minimum 12 ministers",
          "Maximum 25 and Minimum 10",
          "Maximum 33 and Minimum 15",
          "Maximum 20 and Minimum 12"
        ],
        "correct": 0,
        "explanation": "Under Article 164(1A) added by 91st Amendment 2003, total ministers shall not exceed 15% of assembly strength (15% of 200 = 30 in Rajasthan) and shall not be less than 12."
      },
      "hi": {
        "question": "91वें संविधान संशोधन अधिनियम 2003 के अनुसार राजस्थान मंत्रिपरिषद में मुख्यमंत्री सहित मंत्रियों की अधिकतम एवं न्यूनतम संख्या क्रमशः कितनी हो सकती है?",
        "options": [
          "अधिकतम 30 (200 का 15%) एवं न्यूनतम 12 मंत्री",
          "अधिकतम 25 एवं न्यूनतम 10 मंत्री",
          "अधिकतम 33 एवं न्यूनतम 15 मंत्री",
          "अधिकतम 20 एवं न्यूनतम 12 मंत्री"
        ],
        "correct": 0,
        "explanation": "अनुच्छेद 164(1A) के तहत राज्य मंत्रिपरिषद में विधानसभा सदस्य संख्या का अधिकतम 15% (राजस्थान में 200 का 15% = 30 मंत्री) तथा न्यूनतम 12 मंत्री हो सकते हैं।"
      }
    },
    {
      "key": "raj_polity_vidhan_sabha_seats",
      "subtopic": "State Legislature (विधानसभा)",
      "score": 97,
      "tags": [
        "Assembly Seats",
        "200 Seats",
        "SC ST Reservation",
        "6th Assembly"
      ],
      "en": {
        "question": "Since which Rajasthan Legislative Assembly was the total number of assembly seats permanently fixed at 200, and how many are reserved for SC and ST?",
        "options": [
          "6th Assembly (1977); 34 seats for SC and 25 seats for ST",
          "1st Assembly (1952); 20 for SC and 15 for ST",
          "4th Assembly (1967); 30 for SC and 20 for ST",
          "7th Assembly (1980); 35 for SC and 25 for ST"
        ],
        "correct": 0,
        "explanation": "In the 1st assembly (1952), there were 160 seats. In the 6th assembly (1977), it was increased to 200 seats. Reserved seats: SC = 34, ST = 25, General = 141."
      },
      "hi": {
        "question": "किस विधानसभा चुनाव (1977) से राजस्थान विधानसभा की कुल सदस्य संख्या 200 निर्धारित की गई, तथा इसमें अनुसूचित जाति (SC) व जनजाति (ST) हेतु क्रमशः कितनी सीटें आरक्षित हैं?",
        "options": [
          "छठी विधानसभा (1977); SC हेतु 34 एवं ST हेतु 25 सीटें",
          "प्रथम विधानसभा (1952); SC हेतु 20 एवं ST हेतु 15",
          "चौथी विधानसभा (1967); SC हेतु 30 एवं ST हेतु 20",
          "सातवीं विधानसभा (1980); SC हेतु 35 एवं ST हेतु 25"
        ],
        "correct": 0,
        "explanation": "1977 में छठी विधानसभा से कुल सीटें 200 की गईं। इनमें अनुसूचित जाति (SC) के लिए 34 सीटें तथा अनुसूचित जनजाति (ST) के लिए 25 सीटें आरक्षित हैं।"
      }
    },
    {
      "key": "raj_polity_high_court_est",
      "subtopic": "State Judiciary (उच्च न्यायालय)",
      "score": 99,
      "tags": [
        "Rajasthan High Court",
        "Jodhpur",
        "Satyanarayan Rao",
        "Kamal Kant Verma"
      ],
      "en": {
        "question": "On the recommendation of which committee was the principal seat of Rajasthan High Court established at Jodhpur on 29 August 1949, and who was its first Chief Justice?",
        "options": [
          "P. Satyanarayan Rao Committee; Justice Kamal Kant Verma",
          "B.R. Patel Committee; Justice Wanchoo",
          "Fazal Ali Commission; Justice Mathur",
          "G.K. Vyas Committee; Justice Lodha"
        ],
        "correct": 0,
        "explanation": "The P. Satyanarayan Rao Committee recommended Jodhpur as the seat of the High Court and Jaipur as the State Capital. First Chief Justice was Sir Kamal Kant Verma."
      },
      "hi": {
        "question": "किस समिति की सिफारिश पर 29 अगस्त 1949 को राजस्थान उच्च न्यायालय की मुख्य पीठ जोधपुर में स्थापित की गई तथा इसके प्रथम मुख्य न्यायाधीश कौन थे?",
        "options": [
          "पी. सत्यनारायण राव समिति; न्यायमूर्ति कमलकांत वर्मा",
          "बी.आर. पटेल समिति; न्यायमूर्ति वांचू",
          "फजल अली आयोग; न्यायमूर्ति माथुर",
          "हरिश्चंद्र माथुर समिति; न्यायमूर्ति भंडारी"
        ],
        "correct": 0,
        "explanation": "सत्यनारायण राव समिति की सिफारिश पर राजधानी जयपुर तथा उच्च न्यायालय की मुख्य पीठ जोधपुर स्थापित की गई। प्रथम मुख्य न्यायाधीश न्यायमूर्ति कमलकांत वर्मा थे।"
      }
    },
    {
      "key": "raj_polity_high_court_bench",
      "subtopic": "State Judiciary (उच्च न्यायालय)",
      "score": 96,
      "tags": [
        "Jaipur Bench",
        "High Court Order 1976",
        "1977",
        "Permanent Bench"
      ],
      "en": {
        "question": "The permanent bench of Rajasthan High Court at Jaipur was revived and made operational on which date under the Rajasthan High Court (Establishment of a Permanent Bench at Jaipur) Order 1976?",
        "options": [
          "31 January 1977 (31 जनवरी 1977)",
          "15 August 1975",
          "26 January 1950",
          "1 November 1956"
        ],
        "correct": 0,
        "explanation": "The Jaipur Bench, abolished in 1958 upon Rao committee's report, was permanently re-established on 31 January 1977 by Presidential Order."
      },
      "hi": {
        "question": "राजस्थान उच्च न्यायालय (जयपुर में स्थायी पीठ की स्थापना) आदेश 1976 के तहत जयपुर पीठ ने किस तिथि से पुनः विधिवत कार्य करना प्रारंभ किया?",
        "options": [
          "31 जनवरी 1977 (31 January 1977)",
          "15 अगस्त 1975",
          "26 जनवरी 1950",
          "1 नवंबर 1956"
        ],
        "correct": 0,
        "explanation": "जयपुर पीठ 1958 में समाप्त कर दी गई थी, जिसे राष्ट्रपति के आदेशानुसार 31 जनवरी 1977 को पुनः स्थायी पीठ के रूप में स्थापित किया गया।"
      }
    },
    {
      "key": "raj_polity_rpsc_composition",
      "subtopic": "Constitutional Bodies (RPSC)",
      "score": 99,
      "tags": [
        "RPSC",
        "Ajmer",
        "Article 316",
        "Chairman 7 Members"
      ],
      "en": {
        "question": "Under Article 316 of the Constitution, what is the sanctioned composition, tenure, and retirement age of the Chairman and members of Rajasthan Public Service Commission (RPSC)?",
        "options": [
          "1 Chairman + 7 Members (Total 8); Tenure: 6 years or 62 years of age",
          "1 Chairman + 5 Members; Tenure: 5 years or 65 years",
          "1 Chairman + 10 Members; Tenure: 6 years or 60 years",
          "1 Chairman + 6 Members; Tenure: 4 years or 62 years"
        ],
        "correct": 0,
        "explanation": "RPSC has 1 Chairman and 7 members (total 8). They are appointed by Governor and hold office for 6 years or until 62 years of age (amended from 60 by 41st Amendment). Removal is strictly by the President of India under Art. 317."
      },
      "hi": {
        "question": "संविधान के अनुच्छेद 316 के तहत राजस्थान लोक सेवा आयोग (RPSC) के अध्यक्ष एवं सदस्यों की स्वीकृत संख्या, कार्यकाल एवं सेवानिवृत्ति आयु कितनी है?",
        "options": [
          "1 अध्यक्ष + 7 सदस्य (कुल 8); कार्यकाल: 6 वर्ष या 62 वर्ष की आयु (जो भी पहले हो)",
          "1 अध्यक्ष + 5 सदस्य; कार्यकाल: 5 वर्ष या 65 वर्ष",
          "1 अध्यक्ष + 10 सदस्य; कार्यकाल: 6 वर्ष या 60 वर्ष",
          "1 अध्यक्ष + 6 सदस्य; कार्यकाल: 4 वर्ष या 62 वर्ष"
        ],
        "correct": 0,
        "explanation": "RPSC में एक अध्यक्ष तथा 7 सदस्य (कुल 8) होते हैं। इनकी नियुक्ति राज्यपाल द्वारा 6 वर्ष या 62 वर्ष की आयु तक की जाती है, परंतु इन्हें केवल राष्ट्रपति द्वारा हटाया जा सकता है।"
      }
    },
    {
      "key": "raj_polity_sec_art243k",
      "subtopic": "State Election Commission (राज्य निर्वाचन आयोग)",
      "score": 98,
      "tags": [
        "SEC",
        "Article 243K",
        "Single Member",
        "Amar Singh Rathore"
      ],
      "en": {
        "question": "State Election Commission of Rajasthan, constituted under Article 243K (Panchayats) and 243ZA (Municipalities), is a single-member constitutional body. Who was its first State Election Commissioner?",
        "options": [
          "Amar Singh Rathore (अमर सिंह राठौड़)",
          "N.R. Bhasin",
          "Indrajeet Khanna",
          "A.K. Pandey"
        ],
        "correct": 0,
        "explanation": "Rajasthan SEC was constituted in July 1994. It is a single-member constitutional body headed by the State Election Commissioner. First SEC was Amar Singh Rathore."
      },
      "hi": {
        "question": "अनुच्छेद 243K एवं 243ZA के तहत जुलाई 1994 में गठित राजस्थान राज्य निर्वाचन आयोग एक एकल सदस्यीय संवैधानिक निकाय है। राज्य के प्रथम राज्य निर्वाचन आयुक्त कौन थे?",
        "options": [
          "अमर सिंह राठौड़ (Amar Singh Rathore)",
          "एन.आर. भसीन",
          "इंद्रजीत खन्ना",
          "ए.के. पांडे"
        ],
        "correct": 0,
        "explanation": "राजस्थान राज्य निर्वाचन आयोग पंचायती राज एवं नगरपालिकाओं के स्वतंत्र चुनाव हेतु जिम्मेदार संवैधानिक संस्था है। इसके प्रथम आयुक्त अमर सिंह राठौड़ थे।"
      }
    },
    {
      "key": "raj_polity_shrc_est",
      "subtopic": "Human Rights Commission (मानवाधिकार आयोग)",
      "score": 97,
      "tags": [
        "SHRC",
        "Human Rights",
        "Kanta Bhatnagar",
        "1 Chairman 2 Members"
      ],
      "en": {
        "question": "Rajasthan State Human Rights Commission (RSHRC) was constituted in January 1999 and became fully functional in March 2000. Who was its first Chairperson?",
        "options": [
          "Justice Kanta Kumari Bhatnagar (न्यायमूर्ति कांता कुमारी भटनागर)",
          "Justice N.K. Jain",
          "Justice S. Saghir Ahmad",
          "Justice Gopal Krishna Vyas"
        ],
        "correct": 0,
        "explanation": "RSHRC was established by notification dated 18 Jan 1999 and became functional in March 2000 with Justice Kanta Bhatnagar as first Chairperson. Composition: 1 Chairperson + 2 Members."
      },
      "hi": {
        "question": "जनवरी 1999 में अधिसूचित तथा मार्च 2000 से विधिवत कार्यरत राजस्थान राज्य मानवाधिकार आयोग की प्रथम अध्यक्ष कौन थीं?",
        "options": [
          "न्यायमूर्ति कांता कुमारी भटनागर",
          "न्यायमूर्ति एन.के. जैन",
          "न्यायमूर्ति एस. सगीर अहमद",
          "न्यायमूर्ति गोपाल कृष्ण व्यास"
        ],
        "correct": 0,
        "explanation": "राज्य मानवाधिकार आयोग की प्रथम अध्यक्ष राजस्थान उच्च न्यायालय की पूर्व न्यायाधीश न्यायमूर्ति कांता भटनागर थीं। इसमें 1 अध्यक्ष और 2 सदस्य होते हैं।"
      }
    },
    {
      "key": "raj_polity_lokayukta_act",
      "subtopic": "Lokayukta (लोकायुक्त)",
      "score": 97,
      "tags": [
        "Lokayukta",
        "1973 Act",
        "I.D. Dua",
        "Exclusions"
      ],
      "en": {
        "question": "Under the Rajasthan Lokayukta and Up-Lokayuktas Act 1973, who was appointed as the first Lokayukta of Rajasthan, and who among the following is completely EXCLUDED from its jurisdiction?",
        "options": [
          "First Lokayukta: Justice I.D. Dua; Excluded: Chief Minister, MLAs, High Court Judges, RPSC",
          "First Lokayukta: Justice Wanchoo; Excluded: Ministers only",
          "First Lokayukta: Justice Mathur; Excluded: Zila Pramukhs",
          "First Lokayukta: Justice Sharma; Excluded: Government clerks"
        ],
        "correct": 0,
        "explanation": "Justice I.D. Dua was appointed first Lokayukta in August 1973. Jurisdiction covers Ministers, Pramukhs, Pradhans, and bureaucrats, but explicitly EXCLUDES the Chief Minister, MLAs, Judges, and RPSC."
      },
      "hi": {
        "question": "राजस्थान लोकायुक्त एवं उप-लोकायुक्त अधिनियम 1973 के तहत राज्य के प्रथम लोकायुक्त कौन बने तथा निम्न में से कौन लोकायुक्त के जांच क्षेत्र से पूर्णतः बाहर है?",
        "options": [
          "प्रथम लोकायुक्त: न्यायमूर्ति आई.डी. दुआ; जांच क्षेत्र से बाहर: मुख्यमंत्री, विधायक, उच्च न्यायालय के न्यायाधीश, RPSC",
          "प्रथम लोकायुक्त: न्यायमूर्ति वांचू; जांच क्षेत्र से बाहर: केवल मंत्री",
          "प्रथम लोकायुक्त: न्यायमूर्ति माथुर; जांच क्षेत्र से बाहर: जिला प्रमुख",
          "प्रथम लोकायुक्त: न्यायमूर्ति शर्मा; जांच क्षेत्र से बाहर: सरकारी कर्मचारी"
        ],
        "correct": 0,
        "explanation": "न्यायमूर्ति आई.डी. दुआ राजस्थान के प्रथम लोकायुक्त बने। लोकायुक्त के दायरे से मुख्यमंत्री, विधायक, हाईकोर्ट जज, RPSC अध्यक्ष/सदस्य तथा महालेखाकार बाहर रखे गए हैं।"
      }
    },
    {
      "key": "raj_polity_panchayati_raj_nagaur",
      "subtopic": "Local Self-Government (पंचायती राज)",
      "score": 99,
      "tags": [
        "Panchayati Raj",
        "Nagaur",
        "2 Oct 1959",
        "Nehru",
        "Bagdari"
      ],
      "en": {
        "question": "On 2 October 1959, Prime Minister Jawaharlal Nehru inaugurated India's historic democratic decentralization (Panchayati Raj system) at Bagdari village in which district of Rajasthan?",
        "options": [
          "Nagaur (नागौर)",
          "Sikar",
          "Ajmer",
          "Barmer"
        ],
        "correct": 0,
        "explanation": "On Gandhi Jayanti, 2 October 1959, Pt. Nehru launched Panchayati Raj at Bagdari village in Nagaur. Rajasthan was the first state in India to adopt the 3-tier Panchayati Raj system, followed by Andhra Pradesh."
      },
      "hi": {
        "question": "2 अक्टूबर 1959 को प्रधानमंत्री पंडित जवाहरलाल नेहरू ने भारत में त्रिस्तरीय पंचायती राज व्यवस्था का शुभारंभ राजस्थान के किस जिले के बगदरी गांव से किया था?",
        "options": [
          "नागौर (Nagaur)",
          "सीकर",
          "अजमेर",
          "बाड़मेर"
        ],
        "correct": 0,
        "explanation": "गांधी जयंती (2 अक्टूबर 1959) को नागौर के बगदरी गांव में देश में सबसे पहले पंचायती राज की नींव रखी गई। राजस्थान इसे लागू करने वाला देश का पहला राज्य बना।"
      }
    },
    {
      "key": "raj_polity_women_reservation_pr",
      "subtopic": "Local Self-Government (पंचायती राज)",
      "score": 96,
      "tags": [
        "Women Reservation",
        "50 Percent",
        "PRIs",
        "2008 Amendment"
      ],
      "en": {
        "question": "In which year did the Rajasthan Legislative Assembly pass an amendment enhancing the reservation for women in Panchayati Raj Institutions (PRIs) from 33% to 50%?",
        "options": [
          "2008 (2008 में)",
          "2002",
          "1994",
          "2015"
        ],
        "correct": 0,
        "explanation": "Rajasthan amended the Panchayati Raj Act in April 2008 to grant 50% reservation for women in Panchayati Raj bodies (Gram Panchayats, Panchayat Samitis, and Zila Parishads)."
      },
      "hi": {
        "question": "राजस्थान विधानसभा ने किस वर्ष पंचायती राज अधिनियम में संशोधन कर पंचायती राज संस्थाओं में महिलाओं हेतु आरक्षण 33% से बढ़ाकर 50% किया था?",
        "options": [
          "2008 में (In 2008)",
          "2002 में",
          "1994 में",
          "2015 में"
        ],
        "correct": 0,
        "explanation": "राजस्थान सरकार ने अप्रैल 2008 में संशोधन पारित कर पंचायती राज संस्थाओं (सरपंच, प्रधान, जिला प्रमुख) में महिलाओं को 50 प्रतिशत आरक्षण प्रदान किया।"
      }
    },
    {
      "key": "raj_polity_chief_secretary",
      "subtopic": "State Administration (राज्य प्रशासन)",
      "score": 97,
      "tags": [
        "Chief Secretary",
        "Administrative Head",
        "K. Radhakrishnan",
        "Kushal Singh"
      ],
      "en": {
        "question": "The Chief Secretary is the administrative head of the state civil services. Who was the first Chief Secretary of Rajasthan (1949) and who was the first woman Chief Secretary (2009)?",
        "options": [
          "First CS: K. Radhakrishnan; First Woman CS: Smt. Kushal Singh",
          "First CS: S.W. Shiveshwarkar; First Woman CS: Usha Sharma",
          "First CS: B.G. Rao; First Woman CS: Prabha Rao",
          "First CS: V. Narayanan; First Woman CS: Veena Gupta"
        ],
        "correct": 0,
        "explanation": "K. Radhakrishnan served as first Chief Secretary in 1949. Smt. Kushal Singh became the first female Chief Secretary of Rajasthan in 2009. Smt. Usha Sharma was the second woman CS."
      },
      "hi": {
        "question": "राज्य प्रशासन का सर्वोच्च प्रशासनिक मुखिया 'मुख्य सचिव' (Chief Secretary) होता है। राजस्थान के प्रथम मुख्य सचिव (1949) तथा राज्य की प्रथम महिला मुख्य सचिव (2009) कौन थीं?",
        "options": [
          "प्रथम मुख्य सचिव: के. राधाकृष्णन; प्रथम महिला मुख्य सचिव: श्रीमती कुशल सिंह",
          "प्रथम मुख्य सचिव: एस.डब्ल्यू. शिवेशवरकर; प्रथम महिला मुख्य सचिव: उषा शर्मा",
          "प्रथम मुख्य सचिव: बी.जी. राव; प्रथम महिला मुख्य सचिव: प्रभा राव",
          "प्रथम मुख्य सचिव: वी. नारायणन; प्रथम महिला मुख्य सचिव: वीणा गुप्ता"
        ],
        "correct": 0,
        "explanation": "के. राधाकृष्णन राजस्थान के पहले मुख्य सचिव थे (1949)। श्रीमती कुशल सिंह 2009 में राज्य की पहली महिला मुख्य सचिव बनीं।"
      }
    },
    {
      "key": "raj_polity_public_accounts_comm",
      "subtopic": "State Legislature (विधानसभा समितियां)",
      "score": 96,
      "tags": [
        "PAC",
        "Public Accounts",
        "Opposition Chairman",
        "Financial Committees"
      ],
      "en": {
        "question": "Who traditionally serves as the Chairman of the Public Accounts Committee (जनलेखा समिति) of Rajasthan Legislative Assembly, and what is its primary function?",
        "options": [
          "A prominent senior MLA from the Opposition; scrutinizes the CAG audit reports on state accounts",
          "The Finance Minister of the state",
          "The Speaker of the Legislative Assembly",
          "The Chief Minister of the state"
        ],
        "correct": 0,
        "explanation": "By parliamentary convention, the Speaker appoints an Opposition MLA as PAC Chairman. PAC examines whether public funds sanctioned by assembly were spent within legal limits and scrutinizes CAG audit reports."
      },
      "hi": {
        "question": "राजस्थान विधानसभा की 'जनलेखा समिति' (Public Accounts Committee) का सभापति पारंपरिक रूप से किसे नियुक्त किया जाता है तथा इसका मुख्य कार्य क्या है?",
        "options": [
          "विपक्ष का कोई प्रमुख वरिष्ठ विधायक; कैग (CAG) के लेखापरीक्षा प्रतिवेदनों की संवीक्षा करना",
          "राज्य के वित्त मंत्री को",
          "विधानसभा अध्यक्ष को",
          "सत्तारूढ़ दल के मुख्य सचेतक को"
        ],
        "correct": 0,
        "explanation": "परंपरा के अनुसार विधानसभा अध्यक्ष विपक्ष के वरिष्ठ सदस्य को पीएसी का सभापति बनाते हैं। यह समिति महालेखापरीक्षक (CAG) की रिपोर्ट की जांच करती है।"
      }
    },
    {
      "key": "raj_polity_state_info_comm",
      "subtopic": "Statutory Bodies (सूचना आयोग)",
      "score": 95,
      "tags": [
        "SIC",
        "RTI Act 2005",
        "M.D. Kaurani",
        "Information Commission"
      ],
      "en": {
        "question": "Rajasthan State Information Commission was constituted in April 2006 under the Right to Information (RTI) Act 2005. Who was its first Chief Information Commissioner (CIC)?",
        "options": [
          "M.D. Kaurani (एम.डी. कोरानी)",
          "T. Srinivasan",
          "Suresh Choudhary",
          "D.B. Gupta"
        ],
        "correct": 0,
        "explanation": "Rajasthan State Information Commission was established on 18 April 2006. Shri M.D. Kaurani was appointed as the state's first Chief Information Commissioner."
      },
      "hi": {
        "question": "सूचना का अधिकार (RTI) अधिनियम 2005 के तहत 18 अप्रैल 2006 को गठित राजस्थान राज्य सूचना आयोग के प्रथम मुख्य सूचना आयुक्त कौन बनाए गए थे?",
        "options": [
          "एम.डी. कोरानी (M.D. Kaurani)",
          "टी. श्रीनिवासन",
          "सुरेश चौधरी",
          "डी.बी. गुप्ता"
        ],
        "correct": 0,
        "explanation": "राजस्थान राज्य सूचना आयोग का गठन 18 अप्रैल 2006 को किया गया तथा राज्य के प्रथम मुख्य सूचना आयुक्त एम.डी. कोरानी नियुक्त हुए।"
      }
    }
  ],
  "raj_economy": [
    {
      "key": "raj_econ_gsdp_sector_shares",
      "subtopic": "Macroeconomic Indicators (आर्थिक संकेतक)",
      "score": 99,
      "tags": [
        "GSDP",
        "Sector Shares",
        "Services",
        "Agriculture"
      ],
      "en": {
        "question": "According to Rajasthan Economic Survey, what is the approximate sector-wise contribution (at constant basic prices) to Rajasthan's Gross State Value Added (GSVA)?",
        "options": [
          "Services: ~43-44%, Agriculture & Allied: ~27-28%, Industry: ~27-28%",
          "Agriculture: 50%, Services: 30%, Industry: 20%",
          "Industry: 50%, Agriculture: 25%, Services: 25%",
          "Services: 65%, Industry: 25%, Agriculture: 10%"
        ],
        "correct": 0,
        "explanation": "In Rajasthan's GSVA at constant prices: Services sector contributes the highest (~43-44%), followed by Agriculture & Allied (~27-28%) and Industry (~27-28%)."
      },
      "hi": {
        "question": "राजस्थान आर्थिक समीक्षा के अनुसार स्थिर बुनियादी मूल्यों पर सकल राज्य मूल्यवर्धन (GSVA) में कृषि, उद्योग एवं सेवा क्षेत्र का अनुमानित योगदान क्रमशः कितना है?",
        "options": [
          "सेवा क्षेत्र: ~43-44%, कृषि एवं संबद्ध क्षेत्र: ~27-28%, उद्योग क्षेत्र: ~27-28%",
          "कृषि क्षेत्र: 50%, सेवा क्षेत्र: 30%, उद्योग क्षेत्र: 20%",
          "उद्योग क्षेत्र: 50%, कृषि क्षेत्र: 25%, सेवा क्षेत्र: 25%",
          "सेवा क्षेत्र: 65%, उद्योग क्षेत्र: 25%, कृषि क्षेत्र: 10%"
        ],
        "correct": 0,
        "explanation": "राजस्थान की अर्थव्यवस्था में सेवा क्षेत्र का योगदान सर्वाधिक (~44%) है, जबकि कृषि व उद्योग दोनों लगभग 27-28% का योगदान देते हैं।"
      }
    },
    {
      "key": "raj_econ_solar_policy_target",
      "subtopic": "Renewable Energy (नवीकरणीय ऊर्जा)",
      "score": 99,
      "tags": [
        "Solar Energy",
        "30 GW 2025",
        "90 GW 2030",
        "Rank 1"
      ],
      "en": {
        "question": "Rajasthan ranks 1st in India in total installed solar power capacity. What are the ambitious capacity targets set under Rajasthan Solar Energy Policy?",
        "options": [
          "30 GW by 2024-25 and 90 GW by 2029-30",
          "15 GW by 2025 and 40 GW by 2030",
          "50 GW by 2025 and 100 GW by 2030",
          "20 GW by 2025 and 60 GW by 2030"
        ],
        "correct": 0,
        "explanation": "Rajasthan Solar Energy Policy set targets of 30,000 MW (30 GW) by 2024-25 and 90,000 MW (90 GW) by 2029-30. The state has already surpassed 20,000 MW installed capacity."
      },
      "hi": {
        "question": "सौर ऊर्जा स्थापित क्षमता में राजस्थान देश में शीर्ष स्थान पर है। राजस्थान सौर ऊर्जा नीति के अंतर्गत क्या महत्वाकांक्षी लक्ष्य निर्धारित किए गए हैं?",
        "options": [
          "वर्ष 2024-25 तक 30 GW तथा 2029-30 तक 90 GW क्षमता स्थापित करना",
          "वर्ष 2025 तक 15 GW तथा 2030 तक 40 GW",
          "वर्ष 2025 तक 50 GW तथा 2030 तक 100 GW",
          "वर्ष 2025 तक 20 GW तथा 2030 तक 60 GW"
        ],
        "correct": 0,
        "explanation": "राजस्थान सौर ऊर्जा नीति का लक्ष्य 2024-25 तक 30 GW तथा 2029-30 तक 90 GW सौर ऊर्जा उत्पादन क्षमता हासिल करना है। राज्य 20,000 MW से अधिक उत्पादन के साथ देश में प्रथम है।"
      }
    },
    {
      "key": "raj_econ_dmic_corridor",
      "subtopic": "Industrial Infrastructure (औद्योगिक विकास)",
      "score": 98,
      "tags": [
        "DMIC",
        "39 Percent",
        "565 Km",
        "Khushkhera Neemrana"
      ],
      "en": {
        "question": "The Delhi-Mumbai Industrial Corridor (DMIC) spans 1,504 km across 6 states. What percentage of the total corridor passes through Rajasthan?",
        "options": [
          "Approximately 39% (~565 km)",
          "22%",
          "52%",
          "15%"
        ],
        "correct": 0,
        "explanation": "Around 39% (565 km) of the Western Dedicated Freight Corridor passes through Rajasthan, covering 22 districts. Key nodes: Khushkhera-Bhiwadi-Neemrana and Jodhpur-Pali-Marwar."
      },
      "hi": {
        "question": "दिल्ली-मुंबई इंडस्ट्रियल कॉरिडोर (DMIC) की कुल 1,504 किमी लंबाई में से लगभग कितना प्रतिशत हिस्सा (565 किमी) राजस्थान से होकर गुजरता है?",
        "options": [
          "लगभग 39% (~565 किमी)",
          "लगभग 22%",
          "लगभग 52%",
          "लगभग 15%"
        ],
        "correct": 0,
        "explanation": "DMIC का सर्वाधिक 39% (लगभग 565 किमी) मार्ग राजस्थान से गुजरता है जो राज्य के 22 जिलों को प्रभावित करता है। इसके तहत खुशखेड़ा-भिवाड़ी-नीमराणा नोड विकसित किया जा रहा है।"
      }
    },
    {
      "key": "raj_econ_riico_role",
      "subtopic": "Industrial Agencies (औद्योगिक संस्थाएं)",
      "score": 98,
      "tags": [
        "RIICO",
        "1969 1980",
        "Agro Food Parks",
        "SEZ"
      ],
      "en": {
        "question": "Which apex government corporation in Rajasthan is responsible for developing industrial areas, Agro-Food Parks, Japanese Zones, and Special Economic Zones (SEZs)?",
        "options": [
          "RIICO (Rajasthan State Industrial Development and Investment Corporation)",
          "RFC (Rajasthan Financial Corporation)",
          "RSIC / RAJSICO",
          "RUDA"
        ],
        "correct": 0,
        "explanation": "RIICO was established in 1969 (separated in 1980) as the premier agency for industrial infrastructure development in Rajasthan, operating 350+ industrial areas."
      },
      "hi": {
        "question": "राजस्थान में औद्योगिक क्षेत्रों, एग्रो-फूड पार्कों, जापानी जोन तथा विशेष आर्थिक क्षेत्रों (SEZ) को विकसित करने वाली शीर्ष राज्य निगम संस्था कौन सी है?",
        "options": [
          "रीको (RIICO - राजस्थान राज्य औद्योगिक विकास एवं निवेश निगम)",
          "आरएफसी (RFC - राजस्थान वित्त निगम)",
          "राजसिको (RAJSICO)",
          "रूडा (RUDA)"
        ],
        "correct": 0,
        "explanation": "रीको (RIICO) की स्थापना 1969 में हुई (1980 में स्वतंत्र रूप से कार्यरत)। यह राज्य में औद्योगिक ढांचागत विकास की शीर्ष संस्था है।"
      }
    },
    {
      "key": "raj_econ_oil_refinery_pachpadra",
      "subtopic": "Petroleum & Refineries (पेट्रोलियम क्षेत्र)",
      "score": 99,
      "tags": [
        "HRRL",
        "Pachpadra Refinery",
        "74 to 26",
        "9 MMTPA"
      ],
      "en": {
        "question": "The Barmer Petroleum Refinery and Petrochemical Complex at Pachpadra is being developed as a joint venture (HRRL) between HPCL and Government of Rajasthan in what equity ratio?",
        "options": [
          "HPCL : Government of Rajasthan = 74 : 26 (Capacity: 9 MMTPA)",
          "HPCL : Government of Rajasthan = 50 : 50",
          "HPCL : Government of Rajasthan = 51 : 49",
          "HPCL : Government of Rajasthan = 80 : 20"
        ],
        "correct": 0,
        "explanation": "HPCL Rajasthan Refinery Ltd (HRRL) is a 74:26 joint venture between HPCL and Government of Rajasthan. It is a 9 MMTPA capacity refinery and petrochemical complex producing BS-VI fuels."
      },
      "hi": {
        "question": "पचपदरा (बालोतरा) में स्थापित की जा रही बाड़मेर पेट्रोलियम रिफाइनरी एवं पेट्रोकेमिकल कॉम्प्लेक्स (HRRL) में HPCL तथा राजस्थान सरकार की हिस्सेदारी का अनुपात कितना है?",
        "options": [
          "HPCL : राजस्थान सरकार = 74 : 26 (क्षमता: 9 MMTPA)",
          "HPCL : राजस्थान सरकार = 50 : 50",
          "HPCL : राजस्थान सरकार = 51 : 49",
          "HPCL : राजस्थान सरकार = 80 : 20"
        ],
        "correct": 0,
        "explanation": "HRRL में हिंदुस्तान पेट्रोलियम (HPCL) की 74% तथा राजस्थान सरकार की 26% इक्विटी हिस्सेदारी है। इसकी वार्षिक शोधन क्षमता 90 लाख मीट्रिक टन (9 MMTPA) है।"
      }
    },
    {
      "key": "raj_econ_annapurna_rasoi",
      "subtopic": "Welfare Schemes (जनकल्याणकारी योजनाएं)",
      "score": 98,
      "tags": [
        "Annapurna Rasoi",
        "Subsidy 22",
        "600 Grams",
        "Price 8"
      ],
      "en": {
        "question": "Under 'Shri Annapurna Rasoi Yojana' in Rajasthan, what is the customer price, meal weight, and government subsidy provided per thali?",
        "options": [
          "Customer pays ₹8, food weight 600g, state government subsidy ₹22 per plate",
          "Customer pays ₹10, food weight 500g, subsidy ₹20",
          "Customer pays ₹5, food weight 400g, subsidy ₹15",
          "Customer pays ₹12, food weight 650g, subsidy ₹25"
        ],
        "correct": 0,
        "explanation": "Shri Annapurna Rasoi Yojana provides 600 grams of nutritious food (chapati, dal, sabji, pickle) at ₹8 to the beneficiary, with an enhanced government subsidy of ₹22 per plate."
      },
      "hi": {
        "question": "राजस्थान में 'श्री अन्नपूर्णा रसोई योजना' के अंतर्गत लाभार्थी को प्रति थाली कितने रुपये में कितना भोजन मिलता है तथा सरकार द्वारा प्रति थाली कितना अनुदान दिया जाता है?",
        "options": [
          "लाभार्थी हेतु मूल्य ₹8, भोजन की मात्रा 600 ग्राम, राज्य सरकार का अनुदान ₹22 प्रति थाली",
          "लाभार्थी हेतु मूल्य ₹10, भोजन 500 ग्राम, सरकारी अनुदान ₹20",
          "लाभार्थी हेतु मूल्य ₹5, भोजन 400 ग्राम, सरकारी अनुदान ₹15",
          "लाभार्थी हेतु मूल्य ₹12, भोजन 650 ग्राम, सरकारी अनुदान ₹25"
        ],
        "correct": 0,
        "explanation": "श्री अन्नपूर्णा रसोई योजना के तहत थाली का वजन बढ़ाकर 600 ग्राम किया गया है। लाभार्थी मूल्य ₹8 यथावत है तथा राज्य सरकार द्वारा दी जाने वाली सब्सिडी ₹17 से बढ़ाकर ₹22 प्रति थाली की गई।"
      }
    },
    {
      "key": "raj_econ_kisan_samman_nidhi",
      "subtopic": "Agriculture Schemes (कृषि कल्याण)",
      "score": 97,
      "tags": [
        "Kisan Samman Nidhi",
        "8000 Total",
        "State Top Up 2000",
        "Farmers"
      ],
      "en": {
        "question": "By adding a state top-up grant of ₹2,000 to the central PM-KISAN scheme, what is the total annual financial assistance provided to eligible farmers in Rajasthan under Mukhyamantri Kisan Samman Nidhi?",
        "options": [
          "₹8,000 per year (₹6,000 PM-KISAN + ₹2,000 State Top-Up)",
          "₹10,000 per year",
          "₹12,000 per year",
          "₹7,500 per year"
        ],
        "correct": 0,
        "explanation": "Government of Rajasthan announced a top-up of ₹2,000 per year over the central PM-KISAN (₹6,000), making the total annual direct benefit ₹8,000 for state farmers."
      },
      "hi": {
        "question": "राजस्थान सरकार द्वारा केंद्रीय PM-KISAN में ₹2,000 का राज्य टॉप-अप जोड़कर 'मुख्यमंत्री किसान सम्मान निधि योजना' के तहत किसानों को कुल कितनी वार्षिक वित्तीय सहायता दी जा रही है?",
        "options": [
          "₹8,000 प्रति वर्ष (₹6,000 केंद्र + ₹2,000 राज्य सरकार)",
          "₹10,000 प्रति वर्ष",
          "₹12,000 प्रति वर्ष",
          "₹7,500 प्रति वर्ष"
        ],
        "correct": 0,
        "explanation": "राजस्थान सरकार ने किसानों को अतिरिक्त संबल देने हेतु पीएम किसान सम्मान निधि में ₹2,000 की वृद्धि कर कुल सहायता ₹8,000 वार्षिक की है।"
      }
    },
    {
      "key": "raj_econ_kusum_scheme_comp_a",
      "subtopic": "Renewable Energy (ऊर्जा क्षेत्र)",
      "score": 96,
      "tags": [
        "PM KUSUM",
        "Component A",
        "Barren Lands",
        "Solar Pumps"
      ],
      "en": {
        "question": "Under PM-KUSUM Scheme Component-A in Rajasthan, farmers/cooperatives can set up decentralized grid-connected solar power plants on barren lands of what capacity range?",
        "options": [
          "0.5 MW to 2 MW capacity",
          "5 MW to 10 MW",
          "100 kW to 250 kW",
          "10 MW to 25 MW"
        ],
        "correct": 0,
        "explanation": "Component A of PM-KUSUM allows setting up 500 kW (0.5 MW) to 2 MW decentralized renewable plants on barren/fallow lands near sub-stations. Rajasthan set up India's 1st KUSUM plant at Bhaloji (Kotputli)."
      },
      "hi": {
        "question": "पीएम-कुसुम (PM-KUSUM) योजना के घटक-ए (Component A) के अंतर्गत किसान अपनी बंजर/अनुपयोगी भूमि पर कितनी क्षमता तक के विकेंद्रीकृत सौर ऊर्जा संयंत्र स्थापित कर सकते हैं?",
        "options": [
          "0.5 मेगावाट (500 kW) से 2 मेगावाट तक",
          "5 मेगावाट से 10 मेगावाट तक",
          "100 किलोवाट से 250 किलोवाट तक",
          "10 मेगावाट से 25 मेगावाट तक"
        ],
        "correct": 0,
        "explanation": "घटक-ए के तहत 0.5 से 2 मेगावाट क्षमता के सौर संयंत्र लगाए जा सकते हैं। देश का पहला कुसुम सोलर प्लांट राजस्थान के भालोजी गांव (कोटपूतली) में स्थापित किया गया था।"
      }
    },
    {
      "key": "raj_econ_live_stock_share",
      "subtopic": "Animal Husbandry (पशुधन)",
      "score": 98,
      "tags": [
        "Milk Production",
        "Wool Production",
        "Livestock",
        "Rank in India"
      ],
      "en": {
        "question": "What is Rajasthan's standing in India regarding the production of Wool and Milk as per the Basic Animal Husbandry Statistics?",
        "options": [
          "1st in Wool (~45% of India's production) and Top 2 in Milk (~15% of India's production)",
          "1st in Milk, 5th in Wool",
          "3rd in Milk, 2nd in Wool",
          "1st in Meat, 3rd in Milk"
        ],
        "correct": 0,
        "explanation": "Rajasthan ranks #1 in India in wool production contributing ~45% of total domestic wool, and alternates between rank 1 and 2 in milk production with ~15% national share."
      },
      "hi": {
        "question": "पशुपालन सांख्यिकी के अनुसार ऊन (Wool) तथा दूध (Milk) उत्पादन में राजस्थान का देश में क्या स्थान है?",
        "options": [
          "ऊन उत्पादन में देश में प्रथम (~45% योगदान) तथा दूध उत्पादन में शीर्ष 2 में (~15% योगदान)",
          "दूध में प्रथम तथा ऊन में 5वां",
          "दूध में तीसरा तथा ऊन में दूसरा",
          "मांस उत्पादन में प्रथम तथा दूध में तीसरा"
        ],
        "correct": 0,
        "explanation": "राजस्थान देश का लगभग 45 प्रतिशत ऊन उत्पादित कर प्रथम स्थान पर है, तथा दूध उत्पादन में लगभग 15% हिस्सेदारी के साथ देश के अग्रणी राज्यों में शामिल है।"
      }
    },
    {
      "key": "raj_econ_m-sand_policy",
      "subtopic": "Industry & Environment (पर्यावरण एवं खनन)",
      "score": 95,
      "tags": [
        "M-Sand Policy",
        "Manufactured Sand",
        "Bajri Alternative",
        "2020"
      ],
      "en": {
        "question": "Why did the Government of Rajasthan notify the 'M-Sand Policy 2020'?",
        "options": [
          "To promote Manufactured Sand (crushed stone sand) as a sustainable, legal alternative to river sand (Bajri)",
          "To ban sand exports",
          "To impose mineral tax on marble slurry",
          "To convert sand dunes into agricultural fields"
        ],
        "correct": 0,
        "explanation": "Notified in January 2021 (M-Sand Policy 2020), it gives industry status to M-Sand units to protect river ecosystems from illegal riverbed Bajri mining and ensure steady supply of construction material."
      },
      "hi": {
        "question": "राजस्थान सरकार द्वारा 'एम-सैंड नीति 2020' (M-Sand Policy) जारी करने का मुख्य उद्देश्य क्या था?",
        "options": [
          "नदियों से बजरी के अवैध खनन को रोकने हेतु क्रशर से निर्मित कृत्रिम रेत (M-Sand) को बजरी के विकल्प के रूप में बढ़ावा देना",
          "रेत के निर्यात पर प्रतिबंध लगाना",
          "संगमरमर स्लरी पर कर लगाना",
          "रेगिस्तानी टीलों को कृषि भूमि में बदलना"
        ],
        "correct": 0,
        "explanation": "नदियों के पारिस्थितिकी तंत्र को बचाने के लिए खनिज पत्थरों के क्रशिंग से तैयार एम-सैंड को बजरी का सर्वोत्तम पर्यावरण-अनुकूल विकल्प मानकर इसे उद्योग का दर्जा दिया गया है।"
      }
    }
  ],
  "indian_history": [
    {
      "key": "ind_hist_indus_kalibangan",
      "subtopic": "Ancient India (प्राचीन भारत)",
      "score": 99,
      "tags": [
        "Kalibangan",
        "Indus Valley",
        "Ghaggar",
        "Ploughed Field"
      ],
      "en": {
        "question": "At which Indus Valley site in Hanumangarh (Rajasthan) on the banks of Ghaggar river did archaeologist A. Ghosh discover the world's earliest furrowed ploughed field and fire altars?",
        "options": [
          "Kalibangan (कालीबंगा)",
          "Lothal",
          "Banawali",
          "Rakhigarhi"
        ],
        "correct": 0,
        "explanation": "Discovered by A. Ghosh in 1952 and excavated by B.B. Lal & B.K. Thapar, Kalibangan reveals evidence of pre-Harappan and mature Harappan cultures, ploughed agricultural fields, and 7 fire altars (Havan Kunds)."
      },
      "hi": {
        "question": "हनुमानगढ़ (राजस्थान) में घग्गर नदी के तट पर स्थित किस सिंधु घाटी सभ्यता स्थल से पुरातत्ववेत्ता अमलानंद घोष ने संसार के प्राचीनतम जूते हुए खेत तथा अग्निकुंडों के साक्ष्य प्राप्त किए?",
        "options": [
          "कालीबंगा (Kalibangan)",
          "लोथल",
          "बनावली",
          "राखीगढ़ी"
        ],
        "correct": 0,
        "explanation": "कालीबंगा (काले रंग की चूड़ियां) से प्राक्-हड़प्पा एवं हड़प्पा युगीन दोहरी फसल के जूते हुए खेत, लकड़ी की नाली, तथा सात अग्निकुंडों के प्रमाण मिले हैं।"
      }
    },
    {
      "key": "ind_hist_indus_lothal",
      "subtopic": "Ancient India (प्राचीन भारत)",
      "score": 98,
      "tags": [
        "Lothal",
        "Dockyard",
        "Bhogava",
        "Gujarat"
      ],
      "en": {
        "question": "Which Harappan coastal port city in Gujarat on the Bhogava river features the world's first tidal dockyard, rice husk evidence, and a Persian Gulf button seal?",
        "options": [
          "Lothal (लोथल)",
          "Dholavira",
          "Surkotada",
          "Rangpur"
        ],
        "correct": 0,
        "explanation": "Excavated by S.R. Rao, Lothal was an international commercial port with a massive brick-lined tidal dockyard, bead factory, and fire altars."
      },
      "hi": {
        "question": "गुजरात में भोगावा नदी के तट पर स्थित किस हड़प्पाकालीन बंदरगाह नगर में विश्व की प्राचीनतम गोदीबाड़ा (डॉकयार्ड), चावल की भूसी तथा फारस की खाड़ी की मुहर मिली है?",
        "options": [
          "लोथल (Lothal)",
          "धोलावीरा",
          "सुरकोटड़ा",
          "रंगपुर"
        ],
        "correct": 0,
        "explanation": "एस.आर. राव द्वारा उत्खनित लोथल हड़प्पा सभ्यता का प्रमुख बंदरगाह था जहाँ जहाजों के लंगर डालने हेतु पक्की ईंटों का विशाल गोदीबाड़ा (डॉकयार्ड) मिला है।"
      }
    },
    {
      "key": "ind_hist_buddhist_councils",
      "subtopic": "Ancient India (प्राचीन भारत)",
      "score": 99,
      "tags": [
        "Buddhist Councils",
        "Pataliputra",
        "Kundalvana",
        "Hinayana Mahayana"
      ],
      "en": {
        "question": "The Fourth Buddhist Council, where Buddhism formally divided into Hinayana and Mahayana sects, was held at Kundalvana (Kashmir) under the patronage of which Kushan emperor?",
        "options": [
          "Kanishka (कनिष्क)",
          "Ashoka",
          "Ajatashatru",
          "Kalasoka"
        ],
        "correct": 0,
        "explanation": "The 4th Council was convened by Kanishka at Kundalvana (Kashmir), presided over by Vasumitra with Ashvaghosa as deputy. It codified the Tripitakas and formalized the Mahayana-Hinayana division."
      },
      "hi": {
        "question": "चतुर्थ बौद्ध संगीति, जिसमें बौद्ध धर्म औपचारिक रूप से हीनयान एवं महायान शाखाओं में विभाजित हो गया, कुंडलवन (कश्मीर) में किस कुषाण सम्राट के शासनकाल में आयोजित हुई थी?",
        "options": [
          "कनिष्क (Kanishka)",
          "अशोक",
          "अजातशत्रु",
          "कालाशोक"
        ],
        "correct": 0,
        "explanation": "कनिष्क के शासनकाल में कुंडलवन में वसुमित्र की अध्यक्षता व अश्वघोष के उपाध्यक्षत्व में चतुर्थ बौद्ध संगीति हुई जिसमें महाविभाषा शास्त्र रचा गया।"
      }
    },
    {
      "key": "ind_hist_maurya_kalinga",
      "subtopic": "Ancient India (प्राचीन भारत)",
      "score": 99,
      "tags": [
        "Ashoka",
        "Kalinga War",
        "Rock Edict XIII",
        "Dhammaghosha"
      ],
      "en": {
        "question": "In which Major Rock Edict does Emperor Ashoka express deep personal sorrow over the slaughter of the Kalinga War (261 BC) and declare the triumph of 'Dhammaghosha' over 'Bherighosha'?",
        "options": [
          "Major Rock Edict XIII (तेरहवां शिलालेख)",
          "Major Rock Edict I",
          "Major Rock Edict VIII",
          "Bhabru Edict"
        ],
        "correct": 0,
        "explanation": "Major Rock Edict XIII provides an emotional account of the Kalinga War (261 BC) and Ashoka's decisive conversion from military conquest (Bherighosha) to conquest by righteousness (Dhammaghosha)."
      },
      "hi": {
        "question": "सम्राट अशोक ने अपने किस प्रमुख शिलालेख में कलिंग युद्ध (261 ई.पू.) के भीषण नरसंहार पर गहरा शोक व्यक्त करते हुए 'भेरीघोष' के स्थान पर 'धम्मघोष' की घोषणा की?",
        "options": [
          "13वां प्रमुख शिलालेख (Major Rock Edict XIII)",
          "पहला शिलालेख",
          "आठवां शिलालेख",
          "भाब्रू शिलालेख"
        ],
        "correct": 0,
        "explanation": "13वें शिलालेख में कलिंग विजय, युद्ध की विभीषिका तथा अशोक के हृदय परिवर्तन का मार्मिक वर्णन है, जिसके बाद उन्होंने बौद्ध धम्म स्वीकार किया।"
      }
    },
    {
      "key": "ind_hist_gupta_samudragupta",
      "subtopic": "Ancient India (प्राचीन भारत)",
      "score": 98,
      "tags": [
        "Samudragupta",
        "Prayag Prashasti",
        "Harisena",
        "Napoleon"
      ],
      "en": {
        "question": "The 'Prayag Prashasti' (Allahabad Pillar inscription), inscribed on an Ashokan pillar in flawless Sanskrit Champu poetry, details the military campaigns of which Gupta monarch?",
        "options": [
          "Samudragupta (समुद्रगुप्त)",
          "Chandragupta I",
          "Kumaragupta",
          "Skandagupta"
        ],
        "correct": 0,
        "explanation": "Composed by court poet and Sandhivigrahika Harisena, the Prayag Prashasti chronicles Samudragupta's conquest of Aryavarta and Dakshinapatha (Grahan-Mokshanugraha). V.A. Smith called him 'The Indian Napoleon'."
      },
      "hi": {
        "question": "संस्कृत की चंपू शैली में रचित 'प्रयाग प्रशस्ति' (इलाहाबाद स्तंभ लेख) किस गुप्त सम्राट के दिग्विजयी अभियानों का विस्तृत वर्णन करती है?",
        "options": [
          "समुद्रगुप्त (Samudragupta)",
          "चंद्रगुप्त प्रथम",
          "कुमारगुप्त",
          "स्कंदगुप्त"
        ],
        "correct": 0,
        "explanation": "समुद्रगुप्त के दरबारी कवि हरिषेण द्वारा रचित प्रयाग प्रशस्ति में उनके उत्तर एवं दक्षिण भारत के विजय अभियानों का वर्णन है। वी.ए. स्मिथ ने इन्हें 'भारत का नेपोलियन' कहा था।"
      }
    },
    {
      "key": "ind_hist_delhi_alauddin_market",
      "subtopic": "Medieval India (मध्यकालीन भारत)",
      "score": 98,
      "tags": [
        "Alauddin Khalji",
        "Market Reforms",
        "Shahna i Mandi",
        "Dag Chehra"
      ],
      "en": {
        "question": "Which Delhi Sultan instituted rigorous market regulation reforms, introduced 'Shahna-i-Mandi' officers, and enforced the 'Dag' (horse branding) and 'Chehra' (descriptive roll) systems in the military?",
        "options": [
          "Alauddin Khalji (अलाउद्दीन खिलजी)",
          "Balban",
          "Iltutmish",
          "Firoze Shah Tughlaq"
        ],
        "correct": 0,
        "explanation": "Alauddin Khalji fixed maximum prices of grains and cloth, maintained a large standing army, and instituted the Dag (branding) and Chehra (soldier bio-data) to prevent fraud."
      },
      "hi": {
        "question": "किस दिल्ली सुल्तान ने कठोर बाजार नियंत्रण प्रणाली लागू की, 'शहना-ए-मंडी' नामक अधिकारी नियुक्त किए तथा सेना में 'दाग' (घोड़ों को दागना) एवं 'चेहरा' (सैनिक हुलिया) प्रथा प्रारंभ की?",
        "options": [
          "अलाउद्दीन खिलजी (Alauddin Khalji)",
          "बलबन",
          "इल्तुतमिश",
          "फिरोज शाह तुगलक"
        ],
        "correct": 0,
        "explanation": "अलाउद्दीन खिलजी ने विशाल सेना के भरण-पोषण हेतु वस्तुओं के दाम निर्धारित किए तथा दीवान-ए-रियासत व शहना-ए-मंडी द्वारा बाजार नियंत्रण स्थापित किया।"
      }
    },
    {
      "key": "ind_hist_mughal_mansabdari",
      "subtopic": "Medieval India (मध्यकालीन भारत)",
      "score": 99,
      "tags": [
        "Akbar",
        "Mansabdari",
        "Zat Sawar",
        "1571"
      ],
      "en": {
        "question": "In the Mansabdari administrative system introduced by Mughal Emperor Akbar, what did the dual ranks 'Zat' and 'Sawar' respectively signify?",
        "options": [
          "Zat: Personal rank and salary; Sawar: Number of cavalrymen/horses to be maintained",
          "Zat: Land revenue quota; Sawar: Infantry soldiers",
          "Zat: Royal lineage; Sawar: Artillery guns",
          "Zat: Court protocol; Sawar: Tax collection authority"
        ],
        "correct": 0,
        "explanation": "In Akbar's Mansabdari system: 'Zat' determined the officer's personal status and salary scale, while 'Sawar' determined the quota of horsemen he had to maintain."
      },
      "hi": {
        "question": "मुगल सम्राट अकबर द्वारा प्रारंभ की गई 'मनसबदारी व्यवस्था' में 'जात' (Zat) एवं 'सवार' (Sawar) पद क्रमशः किस बात के सूचक थे?",
        "options": [
          "जात: व्यक्तिगत पद एवं वेतन; सवार: घुड़सवारों की निर्धारित संख्या",
          "जात: भू-राजस्व का दायित्व; सवार: पैदल सैनिक",
          "जात: राजसी वंश; सवार: तोपखाना",
          "जात: दरबारी पद; सवार: कर वसूली अधिकार"
        ],
        "correct": 0,
        "explanation": "मनसबदारी में 'जात' मनसबदार के व्यक्तिगत ओहदे व वेतन को तय करता था, जबकि 'सवार' यह निर्धारित करता था कि उसे कितने सशस्त्र घुड़सवार रखने होंगे।"
      }
    },
    {
      "key": "ind_hist_congress_est_1885",
      "subtopic": "Modern National Movement (राष्ट्रीय आंदोलन)",
      "score": 99,
      "tags": [
        "INC",
        "1885",
        "A.O. Hume",
        "W.C. Bonnerjee"
      ],
      "en": {
        "question": "The Indian National Congress was founded in December 1885 by A.O. Hume. Where was its inaugural session held, and who was its first President?",
        "options": [
          "Gokuldas Tejpal Sanskrit College, Bombay; W.C. Bonnerjee",
          "Calcutta; Surendranath Banerjee",
          "Madras; Badruddin Tyabji",
          "Allahabad; George Yule"
        ],
        "correct": 0,
        "explanation": "The first session met at Gokuldas Tejpal Sanskrit College, Bombay from 28 to 31 Dec 1885, presided over by Womesh Chandra Bonnerjee and attended by 72 delegates."
      },
      "hi": {
        "question": "दिसंबर 1885 में ए.ओ. ह्यूम द्वारा स्थापित 'भारतीय राष्ट्रीय कांग्रेस' का प्रथम अधिवेशन कहाँ आयोजित हुआ था तथा इसके प्रथम अध्यक्ष कौन थे?",
        "options": [
          "गोकुलदास तेजपाल संस्कृत कॉलेज, बंबई; व्योमेश चंद्र बनर्जी",
          "कलकत्ता; सुरेंद्रनाथ बनर्जी",
          "मद्रास; बदरुद्दीन तैयबजी",
          "इलाहाबाद; जॉर्ज यूल"
        ],
        "correct": 0,
        "explanation": "कांग्रेस का पहला अधिवेशन बंबई में हुआ जिसमें 72 प्रतिनिधियों ने भाग लिया। इसके प्रथम अध्यक्ष व्योमेश चंद्र बनर्जी (W.C. Bonnerjee) थे।"
      }
    },
    {
      "key": "ind_hist_gandhi_champaran_1917",
      "subtopic": "Modern National Movement (राष्ट्रीय आंदोलन)",
      "score": 98,
      "tags": [
        "Champaran",
        "1917",
        "Tinkathia",
        "First Satyagraha"
      ],
      "en": {
        "question": "Mahatma Gandhi launched his first successful Satyagraha in India in 1917 at Champaran (Bihar). Which oppressive system of European indigo planters was it directed against?",
        "options": [
          "Tinkathia System (3/20th compulsory indigo cultivation)",
          "Ryotwari System",
          "Mahalwari System",
          "Dadan System"
        ],
        "correct": 0,
        "explanation": "At the invitation of Rajkumar Shukla, Gandhi investigated the Tinkathia system where tenant farmers were compelled to cultivate indigo on 3/20th of their fertile land. The government abolished it upon the committee's report."
      },
      "hi": {
        "question": "1917 में महात्मा गांधी ने भारत में अपना प्रथम सफल सत्याग्रह चंपारण (बिहार) में किस शोषणकारी व्यवस्था के विरुद्ध प्रारंभ किया था?",
        "options": [
          "तिनकठिया पद्धति (जमीन के 3/20 भाग पर अनिवार्य नील की खेती)",
          "रैयतवाड़ी व्यवस्था",
          "महालवाड़ी व्यवस्था",
          "ददनी प्रथा"
        ],
        "correct": 0,
        "explanation": "राजकुमार शुक्ल के आग्रह पर गांधीजी चंपारण पहुंचे और तिनकठिया प्रथा के विरुद्ध सत्याग्रह किया जो भारत में उनकी प्रथम सविनय अवज्ञा विजय साबित हुई।"
      }
    },
    {
      "key": "ind_hist_congress_purna_swaraj",
      "subtopic": "Modern National Movement (राष्ट्रीय आंदोलन)",
      "score": 99,
      "tags": [
        "Purna Swaraj",
        "Lahore Session",
        "1929",
        "Jawaharlal Nehru"
      ],
      "en": {
        "question": "At the historic Lahore Session of the Indian National Congress in December 1929 presided over by Jawaharlal Nehru, which resolution was unanimously adopted?",
        "options": [
          "Purna Swaraj (Complete Independence)",
          "Dominion Status",
          "Quit India",
          "Non-Cooperation"
        ],
        "correct": 0,
        "explanation": "The Lahore session passed the historic resolution declaring 'Purna Swaraj' (Complete Independence) as the sole goal. On 31 Dec 1929, Nehru unfurled the tricolor on the Ravi banks, and 26 Jan 1930 was celebrated as Independence Day."
      },
      "hi": {
        "question": "दिसंबर 1929 में जवाहरलाल नेहरू की अध्यक्षता में आयोजित कांग्रेस के ऐतिहासिक लाहौर अधिवेशन में कौन सा संकल्प पारित किया गया था?",
        "options": [
          "पूर्ण स्वराज (पूर्ण स्वतंत्रता का संकल्प)",
          "डोमिनियन स्टेट्स (औपनिवेशिक स्वराज्य)",
          "भारत छोड़ो",
          "असहयोग आंदोलन"
        ],
        "correct": 0,
        "explanation": "लाहौर अधिवेशन में कांग्रेस ने 'पूर्ण स्वराज' को अपना अंतिम लक्ष्य घोषित किया तथा रावी नदी के तट पर तिरंगा फहराकर 26 जनवरी 1930 को प्रथम स्वतंत्रता दिवस के रूप में मनाने का निर्णय लिया।"
      }
    },
    {
      "key": "ind_hist_indus_dholavira",
      "subtopic": "Ancient India (प्राचीन भारत)",
      "score": 98,
      "tags": [
        "Dholavira",
        "Kutch",
        "UNESCO",
        "Water Reservoirs"
      ],
      "en": {
        "question": "Dholavira in Kutch (Gujarat), inscribed as a UNESCO World Heritage Site in 2021, is celebrated for which unique Harappan architectural feature?",
        "options": [
          "Tripartite city division (Citadel, Middle Town, Lower Town) and sophisticated cascading rock-cut water reservoirs",
          "Massive bronze dancing girl statue",
          "Single city layout without any citadel",
          "First brick-built temple"
        ],
        "correct": 0,
        "explanation": "Dholavira (Khadir Bet, Kutch) features a unique 3-part urban division, giant stone-cut water reservoirs, a ceremonial ground/stadium, and a 10-character inscription signboard."
      },
      "hi": {
        "question": "गुजरात के कच्छ स्थित धोलावीरा, जिसे 2021 में यूनेस्को विश्व धरोहर घोषित किया गया, किस अद्वितीय हड़प्पाकालीन नगर निर्माण विशेषता हेतु विख्यात है?",
        "options": [
          "नगर का तीन भागों (दुर्ग, मध्यम नगर, निचला नगर) में विभाजन तथा पत्थर काटकर बनाए गए विशाल जल संचयन जलाशय",
          "कांस्य की नर्तकी की विशाल मूर्ति",
          "बिना किसी दुर्ग के केवल एक समतल बस्ती",
          "ईंटों से बना पहला मंदिर"
        ],
        "correct": 0,
        "explanation": "धोलावीरा की सबसे प्रमुख विशेषता इसकी उन्नत जल संरक्षण प्रणाली (Water Harvesting) तथा नगर का तीन सुस्पष्ट भागों में विभाजन है।"
      }
    },
    {
      "key": "ind_hist_vedic_gayatri_mantra",
      "subtopic": "Ancient India (प्राचीन भारत)",
      "score": 97,
      "tags": [
        "Rigveda",
        "Gayatri Mantra",
        "Vishwamitra",
        "Savitri"
      ],
      "en": {
        "question": "The sacred 'Gayatri Mantra', addressed to the solar deity Savitri, is contained in which Mandala of the Rigveda, composed by which sage?",
        "options": [
          "Mandala 3 (तृतीय मंडल) composed by Sage Vishwamitra",
          "Mandala 10 composed by Sage Vyasa",
          "Mandala 7 composed by Sage Vashishta",
          "Mandala 9 composed by Sage Angiras"
        ],
        "correct": 0,
        "explanation": "The Gayatri Mantra (Om Bhur Bhuva Svah...) is in Rigveda Mandala 3, composed by Sage Vishwamitra dedicated to deity Savitr."
      },
      "hi": {
        "question": "सूर्य देवता (सविता) को समर्पित पवित्र 'गायत्री मंत्र' ऋग्वेद के किस मंडल में संकलित है तथा इसके रचयिता कौन से ऋषि थे?",
        "options": [
          "तीसरे मंडल में (Mandala 3); रचयिता महर्षि विश्वामित्र",
          "दसवें मंडल में; रचयिता वेदव्यास",
          "सातवें मंडल में; रचयिता महर्षि वशिष्ठ",
          "नौवें मंडल में; रचयिता ऋषि अंगिरा"
        ],
        "correct": 0,
        "explanation": "ऋग्वेद के तृतीय मंडल की रचना विश्वामित्र ने की थी जिसमें प्रसिद्ध गायत्री मंत्र संकलित है। 9वां मंडल सोम को तथा 10वां मंडल पुरुष सूक्त को समर्पित है।"
      }
    },
    {
      "key": "ind_hist_delhi_muhammad_tughlaq",
      "subtopic": "Medieval India (मध्यकालीन भारत)",
      "score": 97,
      "tags": [
        "Muhammad Tughlaq",
        "Token Currency",
        "Daulatabad",
        "Diwan-i-Kohi"
      ],
      "en": {
        "question": "Which Delhi Sultan created the agricultural department 'Diwan-i-Amir-Kohi', transferred the capital from Delhi to Daulatabad (Devagiri) in 1327, and issued copper/brass token currency?",
        "options": [
          "Muhammad bin Tughlaq (मुहम्मद बिन तुगलक)",
          "Alauddin Khalji",
          "Firoze Shah Tughlaq",
          "Sikandar Lodi"
        ],
        "correct": 0,
        "explanation": "Muhammad bin Tughlaq (1325-51) was deeply learned but known for controversial experiments: transferring capital to Daulatabad, token copper currency, Khurasan expedition, and agrarian advances (Sondhar loans)."
      },
      "hi": {
        "question": "किस दिल्ली सुल्तान ने कृषि सुधार हेतु 'दीवान-ए-अमीर-कोही' विभाग की स्थापना की, 1327 में राजधानी दिल्ली से दौलताबाद स्थानांतरित की तथा सांकेतिक मुद्रा (टोकन करेंसी) चलाई?",
        "options": [
          "मुहम्मद बिन तुगलक (Muhammad bin Tughlaq)",
          "अलाउद्दीन खिलजी",
          "फिरोज शाह तुगलक",
          "सिकंदर लोदी"
        ],
        "correct": 0,
        "explanation": "मुहम्मद बिन तुगलक ने कृषि विकास हेतु तकावी ऋण बांटे तथा दीवान-ए-कोही की स्थापना की। उनकी राजधानी परिवर्तन एवं तांबे की सांकेतिक मुद्रा की योजनाएं विफल रहीं।"
      }
    },
    {
      "key": "ind_hist_vijayanagara_krishnadeva",
      "subtopic": "Medieval India (मध्यकालीन भारत)",
      "score": 99,
      "tags": [
        "Krishnadeva Raya",
        "Vijayanagara",
        "Amuktamalyada",
        "Ashtadiggajas"
      ],
      "en": {
        "question": "The greatest ruler of the Vijayanagara Empire, Krishnadeva Raya (Tuluva dynasty, 1509-1529), authored which acclaimed Telugu administrative epic and patronized the 'Ashtadiggajas'?",
        "options": [
          "Amuktamalyada (आमुक्तमाल्यद)",
          "Jambavati Kalyanam",
          "Kavirajamarga",
          "Manucharitam"
        ],
        "correct": 0,
        "explanation": "Emperor Krishnadeva Raya wrote the Telugu masterpiece 'Amuktamalyada' on statecraft and 'Jambavati Kalyanam' in Sanskrit. His court featured the Ashtadiggajas (8 great Telugu poets) including Allasani Peddana and Tenali Rama."
      },
      "hi": {
        "question": "विजयनगर साम्राज्य के महानतम शासक कृष्णदेव राय (तुलुव वंश, 1509-1529 ई.) ने तेलुगु भाषा में राजनीति पर किस प्रसिद्ध ग्रंथ की रचना की तथा जिनके दरबार में 'अष्टदिग्गज' सुशोभित थे?",
        "options": [
          "आमुक्तमाल्यद (Amuktamalyada)",
          "जांबवती कल्याणम्",
          "कविराजमार्ग",
          "मनुचरितम्"
        ],
        "correct": 0,
        "explanation": "कृष्णदेव राय ने तेलुगु में 'आमुक्तमाल्यद' (शासन कला पर) तथा संस्कृत में 'जांबवती कल्याणम्' लिखा। पुर्तगाली यात्री डोमिंगो पायस ने इनके दरबार का भव्य वर्णन किया है।"
      }
    },
    {
      "key": "ind_hist_reform_brahmo_samaj",
      "subtopic": "Modern India (सामाजिक-धार्मिक सुधार)",
      "score": 98,
      "tags": [
        "Raja Ram Mohan Roy",
        "Brahmo Samaj",
        "Sati Abolition",
        "1829"
      ],
      "en": {
        "question": "Raja Ram Mohan Roy, honored as the 'Father of the Indian Renaissance', founded the Brahmo Sabha in 1828. With which British Governor-General did he collaborate to enact Regulation XVII abolishing Sati in 1829?",
        "options": [
          "Lord William Bentinck (लॉर्ड विलियम बेंटिक)",
          "Lord Dalhousie",
          "Lord Wellesley",
          "Lord Canning"
        ],
        "correct": 0,
        "explanation": "Raja Ram Mohan Roy's relentless campaign led Lord William Bentinck to declare Sati illegal and punishable as culpable homicide in Bengal (Regulation XVII of 1829), later extended to Madras and Bombay."
      },
      "hi": {
        "question": "'भारतीय पुनर्जागरण के पिता' राजा राममोहन राय ने 1828 में ब्रह्म सभा की स्थापना की। उन्होंने किस ब्रिटिश गवर्नर जनरल के सहयोग से 1829 में सती प्रथा निषेध कानून (नियम XVII) पारित करवाया?",
        "options": [
          "लॉर्ड विलियम बेंटिक (Lord William Bentinck)",
          "लॉर्ड डलहौजी",
          "लॉर्ड वेलेजली",
          "लॉर्ड कैनिंग"
        ],
        "correct": 0,
        "explanation": "राजा राममोहन राय के प्रयासों से लॉर्ड विलियम बेंटिक ने 4 दिसंबर 1829 को विनियमन 17 (Regulation XVII) पारित कर सती प्रथा को गैरकानूनी व दंडनीय अपराध घोषित किया।"
      }
    },
    {
      "key": "ind_hist_reform_arya_samaj",
      "subtopic": "Modern India (सामाजिक-धार्मिक सुधार)",
      "score": 98,
      "tags": [
        "Swami Dayananda",
        "Arya Samaj",
        "Satyarth Prakash",
        "Udaipur"
      ],
      "en": {
        "question": "Swami Dayananda Saraswati founded the Arya Samaj in 1875 with the rallying cry 'Go Back to the Vedas'. In which royal city of Rajasthan did he finalize his magnum opus 'Satyarth Prakash'?",
        "options": [
          "Udaipur (Navlakha Mahal in Gulab Bagh)",
          "Jaipur",
          "Ajmer",
          "Jodhpur"
        ],
        "correct": 0,
        "explanation": "Swami Dayananda completed writing 'Satyarth Prakash' in 1882 at Navlakha Mahal in Gulab Bagh, Udaipur, under the hospitality of Maharana Sajjan Singh. He established Paropkarini Sabha in Ajmer in 1883."
      },
      "hi": {
        "question": "'वेदों की ओर लौटो' का अमर संदेश देने वाले स्वामी दयानंद सरस्वती ने 1875 में आर्य समाज की स्थापना की। उन्होंने अपने अमर ग्रंथ 'सत्यार्थ प्रकाश' का अधिकांश लेखन राजस्थान के किस नगर में पूरा किया था?",
        "options": [
          "उदयपुर (गुलाब बाग स्थित नवलखा महल में)",
          "जयपुर",
          "अजमेर",
          "जोधपुर"
        ],
        "correct": 0,
        "explanation": "स्वामी दयानंद ने मेवाड़ महाराणा सज्जन सिंह के आतिथ्य में उदयपुर के गुलाब बाग (नवलखा महल) में 'सत्यार्थ प्रकाश' की रचना पूर्ण की तथा 1883 में अजमेर में परोपकारिणी सभा स्थापित की।"
      }
    },
    {
      "key": "ind_hist_battle_plassey_1757",
      "subtopic": "Modern India (ब्रिटिश साम्राज्य)",
      "score": 97,
      "tags": [
        "Battle of Plassey",
        "1757",
        "Robert Clive",
        "Siraj ud Daulah"
      ],
      "en": {
        "question": "The Battle of Plassey (23 June 1757), which laid the foundation of British territorial dominion in India, was fought between Robert Clive and the Nawab of Bengal due to the betrayal of which commander?",
        "options": [
          "Mir Jafar (मीर जाफर)",
          "Mir Qasim",
          "Shuja-ud-Daula",
          "Alivardi Khan"
        ],
        "correct": 0,
        "explanation": "Robert Clive defeated Nawab Siraj-ud-Daulah at Plassey (Nadia district, Bengal) on 23 June 1757 because commander-in-chief Mir Jafar colluded with the British in exchange for the Nawabship."
      },
      "hi": {
        "question": "23 जून 1757 को लड़े गए प्लासी के ऐतिहासिक युद्ध में रॉबर्ट क्लाइव ने बंगाल के नवाब सिराजुद्दौला को किस सेनापति के विश्वासघात के कारण पराजित किया था?",
        "options": [
          "मीर जाफर (Mir Jafar)",
          "मीर कासिम",
          "शुजाउद्दौला",
          "अलीवर्दी खान"
        ],
        "correct": 0,
        "explanation": "प्लासी के युद्ध में मीर जाफर और राय दुर्लभ के विश्वासघात के कारण नवाब सिराजुद्दौला की पराजय हुई, जिसके बाद अंग्रेजों ने मीर जाफर को कठपुतली नवाब बनाया।"
      }
    },
    {
      "key": "ind_hist_quit_india_1942",
      "subtopic": "Modern National Movement (राष्ट्रीय आंदोलन)",
      "score": 99,
      "tags": [
        "Quit India",
        "Do or Die",
        "8 August 1942",
        "Aruna Asaf Ali"
      ],
      "en": {
        "question": "On 8 August 1942 at Gowalia Tank Maidan (Bombay), Mahatma Gandhi launched the Quit India Movement giving the call 'Do or Die'. Who famously hoisted the Congress tricolor flag amidst British police repression?",
        "options": [
          "Aruna Asaf Ali (अरुणा आसफ अली)",
          "Usha Mehta",
          "Sarojini Naidu",
          "Sucheta Kripalani"
        ],
        "correct": 0,
        "explanation": "Aruna Asaf Ali hoisted the Indian flag at Gowalia Tank on 9 August 1942 after top leaders were arrested under Operation Zero Hour. Usha Mehta operated the underground secret Congress Radio."
      },
      "hi": {
        "question": "8 अगस्त 1942 को बंबई के गवालिया टैंक मैदान से गांधीजी ने 'करो या मरो' के आह्वान के साथ 'भारत छोड़ो आंदोलन' शुरू किया। पुलिस दमन के बीच वहां ऐतिहासिक तिरंगा किसने फहराया था?",
        "options": [
          "अरुणा आसफ अली (Aruna Asaf Ali)",
          "उषा मेहता",
          "सरोजिनी नायडू",
          "सुचेता कृपलानी"
        ],
        "correct": 0,
        "explanation": "ऑपरेशन जीरो आवर के तहत सभी बड़े नेताओं की गिरफ्तारी के बाद अरुणा आसफ अली ने गवालिया टैंक पर तिरंगा फहराया। उषा मेहता ने गुप्त कांग्रेस रेडियो संचालित किया।"
      }
    }
  ],
  "indian_world_geo": [
    {
      "key": "geo_pass_zojila",
      "subtopic": "Himalayan Geography (पर्वतीय भूगोल)",
      "score": 99,
      "tags": [
        "Zojila Pass",
        "Srinagar Leh",
        "Greater Himalayas",
        "NH 1"
      ],
      "en": {
        "question": "Which vital high-altitude mountain pass in the Greater Himalayas connects the Kashmir Valley (Srinagar) with Ladakh (Kargil and Leh)?",
        "options": [
          "Zoji La Pass (ज़ोजी ला दर्रा)",
          "Rohtang Pass",
          "Shipki La Pass",
          "Nathu La Pass"
        ],
        "correct": 0,
        "explanation": "Zoji La (altitude 3,528 m) connects Srinagar to Kargil and Leh on National Highway 1. A strategic 14.15 km all-weather Zojila Tunnel is being built here."
      },
      "hi": {
        "question": "वृहद् हिमालय (Greater Himalayas) में स्थित कौन सा महत्वपूर्ण दर्रा कश्मीर घाटी (श्रीनगर) को लद्दाख (कारगिल एवं लेह) से जोड़ता है?",
        "options": [
          "ज़ोजी ला दर्रा (Zoji La Pass)",
          "रोहतांग दर्रा",
          "शिपकी ला दर्रा",
          "नाथू ला दर्रा"
        ],
        "correct": 0,
        "explanation": "ज़ोजी ला दर्रा (ऊंचाई 3,528 मी.) श्रीनगर को लेह-लद्दाख से जोड़ने वाला जीवन रेखा मार्ग है। यहाँ एशिया की सबसे लंबी द्वि-दिशात्मक जोजिला सुरंग का निर्माण हो रहा है।"
      }
    },
    {
      "key": "geo_pass_shipki_la",
      "subtopic": "Himalayan Geography (पर्वतीय भूगोल)",
      "score": 97,
      "tags": [
        "Shipki La",
        "Sutlej River",
        "Himachal Pradesh",
        "Tibet"
      ],
      "en": {
        "question": "Through which Himalayan mountain pass does the Sutlej river enter India from Tibet into Himachal Pradesh?",
        "options": [
          "Shipki La Pass (शिपकी ला दर्रा)",
          "Bara Lacha La",
          "Mana Pass",
          "Lipulekh Pass"
        ],
        "correct": 0,
        "explanation": "Sutlej river originates at Rakshastal near Lake Manasarovar in Tibet and enters India through Shipki La pass in Kinnaur district of Himachal Pradesh."
      },
      "hi": {
        "question": "सतलुज नदी तिब्बत (राक्षसताल) से भारत के हिमाचल प्रदेश में किस हिमालयी दर्रे से होकर प्रवेश करती है?",
        "options": [
          "शिपकी ला दर्रा (Shipki La Pass)",
          "बाड़ा लाचा ला",
          "माना दर्रा",
          "लिपुलेख दर्रा"
        ],
        "correct": 0,
        "explanation": "सतलुज नदी किन्नौर (हिमाचल प्रदेश) में शिपकी ला दर्रे के माध्यम से भारत की सीमा में प्रवेश करती है।"
      }
    },
    {
      "key": "geo_river_ganga_devprayag",
      "subtopic": "Indian Drainage System (भारतीय नदियां)",
      "score": 99,
      "tags": [
        "Devprayag",
        "Bhagirathi",
        "Alaknanda",
        "Ganga"
      ],
      "en": {
        "question": "At which sacred confluence (Panch Prayag) do the rivers Bhagirathi and Alaknanda unite to formally take the name 'Ganga'?",
        "options": [
          "Devprayag (देवप्रयाग)",
          "Rudraprayag",
          "Karnaprayag",
          "Vishnuprayag"
        ],
        "correct": 0,
        "explanation": "At Devprayag (Uttarakhand), the Bhagirathi (originating at Gaumukh/Gangotri) meets the Alaknanda (originating at Satopanth glacier) to form the holy river Ganga."
      },
      "hi": {
        "question": "किस पावन संगम (पंच प्रयाग) पर भागीरथी एवं अलकनंदा नदियां मिलकर औपचारिक रूप से 'गंगा' नाम से प्रवाहित होती हैं?",
        "options": [
          "देवप्रयाग (Devprayag)",
          "रुद्रप्रयाग",
          "कर्णप्रयाग",
          "विष्णुप्रयाग"
        ],
        "correct": 0,
        "explanation": "उत्तराखंड के देवप्रयाग में गंगोत्री से आने वाली भागीरथी तथा संतोपथ से आने वाली अलकनंदा का संगम होता है, जिसके बाद इसे गंगा कहा जाता है।"
      }
    },
    {
      "key": "geo_islands_ten_degree_channel",
      "subtopic": "Islands & Maritime (द्वीप समूह)",
      "score": 98,
      "tags": [
        "Ten Degree Channel",
        "Andaman",
        "Nicobar",
        "Little Andaman"
      ],
      "en": {
        "question": "The 'Ten Degree Channel' (10° N latitude water strait) geographically separates which two island groups in the Bay of Bengal?",
        "options": [
          "Little Andaman and Car Nicobar (अंडमान एवं निकोबार)",
          "North Andaman and Middle Andaman",
          "Lakshadweep and Maldives",
          "South Andaman and Little Andaman"
        ],
        "correct": 0,
        "explanation": "The 10 Degree Channel lies on the 10° N parallel, separating Little Andaman (in Andaman group) from Car Nicobar (in Nicobar group)."
      },
      "hi": {
        "question": "बंगाल की खाड़ी में स्थित '10 डिग्री चैनल' (Ten Degree Channel) किन दो द्वीप समूहों को एक-दूसरे से पृथक करता है?",
        "options": [
          "अंडमान द्वीप समूह एवं निकोबार द्वीप समूह (लिटिल अंडमान व कार निकोबार)",
          "उत्तरी अंडमान एवं मध्य अंडमान",
          "लक्षद्वीप एवं मालदीव",
          "दक्षिण अंडमान एवं लिटिल अंडमान"
        ],
        "correct": 0,
        "explanation": "10 डिग्री चैनल 10° उत्तरी अक्षांश पर स्थित 150 किमी चौड़ा जलमार्ग है जो लिटिल अंडमान को कार निकोबार से अलग करता है।"
      }
    },
    {
      "key": "geo_strait_malacca",
      "subtopic": "World Straits & Choke Points (विश्व के प्रमुख जलडमरूमध्य)",
      "score": 99,
      "tags": [
        "Strait of Malacca",
        "Indian Ocean",
        "Pacific Ocean",
        "Sumatra"
      ],
      "en": {
        "question": "The Strait of Malacca, the world's most critical maritime choke point carrying 25% of global traded goods, connects which two water bodies?",
        "options": [
          "Andaman Sea (Indian Ocean) and South China Sea (Pacific Ocean)",
          "Persian Gulf and Arabian Sea",
          "Red Sea and Mediterranean Sea",
          "Atlantic Ocean and Pacific Ocean"
        ],
        "correct": 0,
        "explanation": "The Strait of Malacca connects the Andaman Sea (Indian Ocean) with the South China Sea (Pacific Ocean) between Peninsular Malaysia and the Indonesian island of Sumatra."
      },
      "hi": {
        "question": "विश्व के 25% समुद्री व्यापार का परिवहन करने वाला अत्यंत संवेदनशील 'मलक्का जलडमरूमध्य' (Strait of Malacca) किन दो जलराशियों को जोड़ता है?",
        "options": [
          "अंडमान सागर (हिंद महासागर) एवं दक्षिण चीन सागर (प्रशांत महासागर)",
          "फारस की खाड़ी एवं अरब सागर",
          "लाल सागर एवं भूमध्य सागर",
          "अटलांटिक महासागर एवं प्रशांत महासागर"
        ],
        "correct": 0,
        "explanation": "मलक्का जलडमरूमध्य मलय प्रायद्वीप और इंडोनेशिया के सुमात्रा द्वीप के बीच स्थित है जो हिंद महासागर को प्रशांत महासागर से जोड़ने वाला मुख्य समुद्री मार्ग है।"
      }
    },
    {
      "key": "geo_atmosphere_stratosphere",
      "subtopic": "Atmospheric Structure (वायुमंडल)",
      "score": 98,
      "tags": [
        "Stratosphere",
        "Ozone Layer",
        "UV Radiation",
        "Jet Aircraft"
      ],
      "en": {
        "question": "In which layer of Earth's atmosphere is the vital Ozone Layer (O3) concentrated, and why is this layer ideal for flying commercial jet aircraft?",
        "options": [
          "Stratosphere (समताप मंडल); absence of clouds, vertical turbulence, and convection currents",
          "Troposphere; presence of dense oxygen",
          "Mesosphere; lowest temperatures",
          "Thermosphere; ionized gases"
        ],
        "correct": 0,
        "explanation": "The Stratosphere extends from ~12 km to 50 km. It houses the ozone layer which absorbs harmful solar UV rays, and its horizontal air currents and absence of clouds make it ideal for supersonic jets."
      },
      "hi": {
        "question": "पृथ्वी के वायुमंडल की किस परत में जीवन रक्षक 'ओजोन परत' (Ozone Layer) पाई जाती है तथा यह परत वाणिज्यिक जेट विमानों के उड़ने हेतु सर्वोत्तम क्यों मानी जाती है?",
        "options": [
          "समताप मंडल (Stratosphere); बादलों एवं मौसम संबंधी विक्षोभों के अभाव के कारण",
          "क्षोभ मंडल; घने वायु दबाव के कारण",
          "मध्य मंडल; अत्यधिक कम तापमान के कारण",
          "आयन मंडल; रेडियो तरंगों के परावर्तन के कारण"
        ],
        "correct": 0,
        "explanation": "समताप मंडल में 15 से 35 किमी की ऊंचाई पर ओजोन गैस की सघनता होती है जो पराबैंगनी किरणों को सोखती है। यहां बादल व मौसमी हलचल न होने से जेट विमान आसानी से उड़ते हैं।"
      }
    },
    {
      "key": "geo_current_gulf_stream",
      "subtopic": "Ocean Currents (महासागरीय धाराएं)",
      "score": 97,
      "tags": [
        "Gulf Stream",
        "Warm Current",
        "North Atlantic",
        "Ice Free Ports"
      ],
      "en": {
        "question": "The 'Gulf Stream' is a powerful, warm ocean current originating in the Gulf of Mexico. What is its major climatic impact on Northwestern Europe?",
        "options": [
          "It keeps northwestern European coastal ports ice-free and moderates the winter climate",
          "It brings permanent drought to Western Europe",
          "It freezes the British Isles in summer",
          "It creates massive tropical cyclones in the Arctic"
        ],
        "correct": 0,
        "explanation": "The Gulf Stream carries warm tropical water northeast across the Atlantic as North Atlantic Drift, ensuring ports in the UK, Norway, and western Europe remain ice-free all winter."
      },
      "hi": {
        "question": "मैक्सिको की खाड़ी से उत्पन्न होने वाली तीव्र गर्म जलधारा 'गल्फ स्ट्रीम' (Gulf Stream) का उत्तर-पश्चिमी यूरोप की जलवायु पर क्या मुख्य प्रभाव पड़ता है?",
        "options": [
          "यह उत्तर-पश्चिमी यूरोप के बंदरगाहों को शीतकाल में भी बर्फ जमने से मुक्त रखती है तथा जलवायु को मृदु बनाती है",
          "यह पश्चिमी यूरोप में स्थायी सूखा लाती है",
          "यह ब्रिटेन के तटों को गर्मियों में जमा देती है",
          "यह आर्कटिक में उष्णकटिबंधीय चक्रवात लाती है"
        ],
        "correct": 0,
        "explanation": "गल्फ स्ट्रीम एक शक्तिशाली गर्म जलधारा है जो उत्तर अटलांटिक प्रवाह के रूप में यूरोप के पश्चिमी तटों को गर्म रखती है जिससे नार्वे और ब्रिटेन के बंदरगाह साल भर खुले रहते हैं।"
      }
    },
    {
      "key": "geo_desert_atacama",
      "subtopic": "World Deserts (विश्व के मरुस्थल)",
      "score": 96,
      "tags": [
        "Atacama Desert",
        "Chile",
        "Driest Desert",
        "Rain Shadow"
      ],
      "en": {
        "question": "Which desert, located in northern Chile along the Pacific coast in the rain shadow of the Andes, is documented as the driest non-polar desert on Earth?",
        "options": [
          "Atacama Desert (अटाकामा मरुस्थल)",
          "Kalahari Desert",
          "Mojave Desert",
          "Patagonian Desert"
        ],
        "correct": 0,
        "explanation": "Atacama Desert in Chile is the driest non-polar region on Earth. Rain has not fallen in parts of it for centuries due to the Andes rain shadow and the cold Humboldt/Peru ocean current."
      },
      "hi": {
        "question": "दक्षिण अमेरिका के चिली में प्रशांत तट पर एंडीज पर्वतमाला की वृष्टि छाया में स्थित पृथ्वी का सबसे शुष्कतम गैर-ध्रुवीय मरुस्थल कौन सा है?",
        "options": [
          "अटाकामा मरुस्थल (Atacama Desert)",
          "कालाहारी मरुस्थल",
          "मोजावे मरुस्थल",
          "पेटागोनिया मरुस्थल"
        ],
        "correct": 0,
        "explanation": "चिली का अटाकामा मरुस्थल संसार का सबसे शुष्क क्षेत्र है। ठंडी हम्बोल्ट धारा तथा एंडीज की वृष्टि-छाया के कारण यहाँ नाममात्र की भी वर्षा नहीं होती।"
      }
    },
    {
      "key": "geo_pass_palghat",
      "subtopic": "Peninsular Geography (प्रायद्वीपीय भारत)",
      "score": 97,
      "tags": [
        "Palghat Gap",
        "Western Ghats",
        "Kerala Tamil Nadu",
        "Nilgiri"
      ],
      "en": {
        "question": "The 'Palghat Gap' (Palakkad Pass) is a major break in the Western Ghats connecting Kerala with Tamil Nadu. Between which two hill ranges is it situated?",
        "options": [
          "Nilgiri Hills and Anaimalai Hills",
          "Cardamom Hills and Agasthyamalai",
          "Javadi Hills and Shevaroy Hills",
          "Nallamala Hills and Velikonda"
        ],
        "correct": 0,
        "explanation": "Palghat Gap is a low mountain pass ~32 km wide in the Western Ghats between Nilgiri Hills in the north and Anaimalai Hills in the south, connecting Palakkad (Kerala) with Coimbatore (Tamil Nadu)."
      },
      "hi": {
        "question": "केरल को तमिलनाडु (कोयंबटूर) से जोड़ने वाला पश्चिमी घाट का प्रमुख प्राकृतिक दर्रा 'पालघाट दर्रा' (Palghat Gap) किन दो पर्वत श्रेणियों के मध्य स्थित है?",
        "options": [
          "नीलगिरि पहाड़ियाँ एवं अनामलाई पहाड़ियाँ",
          "इलायची (कार्डमम) पहाड़ियाँ एवं अगस्त्यमलाई",
          "जावादी पहाड़ियाँ एवं शेवराय पहाड़ियाँ",
          "नल्लामलाई एवं वेलीकोंडा"
        ],
        "correct": 0,
        "explanation": "पालघाट दर्रा उत्तर में नीलगिरि तथा दक्षिण में अनामलाई की पहाड़ियों के बीच स्थित 32 किमी चौड़ा प्राकृतिक गलियारा है जो दक्षिण-पश्चिम मानसून को तमिलनाडु में प्रवेश कराता है।"
      }
    },
    {
      "key": "geo_soil_regur_black",
      "subtopic": "Soils of India (मृदा संसाधन)",
      "score": 98,
      "tags": [
        "Black Soil",
        "Regur",
        "Basalt Lava",
        "Self Ploughing"
      ],
      "en": {
        "question": "Black soils of the Deccan Trap, locally known as 'Regur Soils', are famous for self-ploughing capacity due to high swelling and shrinkage. Which crop is most suited to them?",
        "options": [
          "Cotton (कपास)",
          "Tea",
          "Jute",
          "Rubber"
        ],
        "correct": 0,
        "explanation": "Regur (black soil) is formed from weathered basalt lava, rich in montmorillonite clay. It retains moisture for prolonged periods, making it ideal for cotton cultivation (Black Cotton Soil)."
      },
      "hi": {
        "question": "दक्कन के लावा पठार पर पाई जाने वाली काली मिट्टी, जिसे 'रेगुर मिट्टी' भी कहा जाता है, अपनी 'स्वतः जुताई' की विशेषता हेतु जानी जाती है। यह किस फसल हेतु सर्वाधिक उपयुक्त है?",
        "options": [
          "कपास (Cotton)",
          "चाय",
          "जूट",
          "रबर"
        ],
        "correct": 0,
        "explanation": "रेगुर मिट्टी बेसाल्टिक लावा के अपक्षय से बनी है। भीगने पर चिपचिपी और सूखने पर इसमें गहरी दरारें पड़ जाती हैं जिससे स्वतः जुताई होती है। यह कपास की खेती हेतु सर्वश्रेष्ठ है।"
      }
    },
    {
      "key": "geo_pass_nathu_la",
      "subtopic": "Himalayan Geography (पर्वतीय भूगोल)",
      "score": 98,
      "tags": [
        "Nathu La",
        "Sikkim",
        "Tibet Border",
        "Silk Route"
      ],
      "en": {
        "question": "Through which Himalayan mountain pass in Sikkim did the ancient Old Silk Route branch connect India with Lhasa (Tibet), officially reopened for border trade in 2006?",
        "options": [
          "Nathu La Pass (नाथू ला दर्रा)",
          "Jelep La Pass",
          "Bomdi La Pass",
          "Karakoram Pass"
        ],
        "correct": 0,
        "explanation": "Nathu La (altitude 4,310 m) in East Sikkim links India with Tibet Autonomous Region. Reopened in 2006, it serves as a key land trade and Kailash Manasarovar pilgrimage route."
      },
      "hi": {
        "question": "सिक्किम में स्थित किस हिमालयी दर्रे से होकर प्राचीन रेशम मार्ग (Silk Route) की एक शाखा भारत को ल्हासा (तिब्बत) से जोड़ती थी, जिसे 2006 में सीमा व्यापार हेतु पुनः खोला गया?",
        "options": [
          "नाथू ला दर्रा (Nathu La Pass)",
          "जेलेप ला दर्रा",
          "बोमडिला दर्रा",
          "काराकोरम दर्रा"
        ],
        "correct": 0,
        "explanation": "नाथू ला (सिक्किम) भारत-चीन सीमा पर स्थित प्रमुख दर्रा है। 1962 के युद्ध के बाद बंद रहने के उपरांत इसे 2006 में द्विपक्षीय व्यापार हेतु पुनः खोला गया।"
      }
    },
    {
      "key": "geo_peak_anaimudi",
      "subtopic": "Peninsular Geography (प्रायद्वीपीय भारत)",
      "score": 98,
      "tags": [
        "Anaimudi",
        "2695m",
        "Western Ghats",
        "Kerala"
      ],
      "en": {
        "question": "Which mountain peak in the Anaimalai Hills of Kerala with an elevation of 2,695 meters is the highest peak in Peninsular India and Western Ghats?",
        "options": [
          "Anaimudi (अनाईमुडी)",
          "Doddabetta",
          "Kalsubai",
          "Mahendragiri"
        ],
        "correct": 0,
        "explanation": "Anaimudi (2,695 m) in Idukki district of Kerala is often referred to as the 'Everest of South India'. Doddabetta (2,637 m) is the highest peak in the Nilgiri Hills."
      },
      "hi": {
        "question": "केरल की अनामलाई पहाड़ियों में स्थित 2,695 मीटर ऊंची कौन सी चोटी प्रायद्वीपीय भारत तथा पश्चिमी घाट की सर्वोच्च पर्वत चोटी है?",
        "options": [
          "अनाईमुडी (Anaimudi)",
          "दोद्दाबेट्टा",
          "कलसुबाई",
          "महेंद्रगिरि"
        ],
        "correct": 0,
        "explanation": "अनाईमुडी दक्षिण भारत की सबसे ऊंची चोटी (2,695 मी.) है। नीलगिरि पर्वत की सबसे ऊंची चोटी 'दोद्दाबेट्टा' (2,637 मी.) है।"
      }
    },
    {
      "key": "geo_river_brahmaputra_tsangpo",
      "subtopic": "Indian Drainage System (भारतीय नदियां)",
      "score": 99,
      "tags": [
        "Brahmaputra",
        "Yarlung Tsangpo",
        "Majuli",
        "Namcha Barwa"
      ],
      "en": {
        "question": "Originating as the Yarlung Tsangpo from Chemayungdung glacier in Tibet, the Brahmaputra makes a dramatic U-turn into India at which eastern Himalayan peak?",
        "options": [
          "Namcha Barwa (नामचा बरवा - 7,782 m)",
          "Kanchenjunga",
          "Nanda Devi",
          "Dhaulagiri"
        ],
        "correct": 0,
        "explanation": "The Tsangpo cuts a tremendous canyon around Namcha Barwa peak (7,782m) in a hairpin bend (syntaxial bend) to enter Arunachal Pradesh as the Siang/Dihang river. In Assam, it forms Majuli, the world's largest river island."
      },
      "hi": {
        "question": "तिब्बत के चेमायुंगडुंग हिमनद से 'यारलुंग त्सांगपो' के रूप में निकलने वाली ब्रह्मपुत्र नदी किस पूर्वी हिमालयी चोटी से यू-टर्न (हेयरपिन मोड़) लेकर भारत में प्रवेश करती है?",
        "options": [
          "नामचा बरवा (Namcha Barwa - 7,782 मी.)",
          "कंचनजंगा",
          "नंदा देवी",
          "धौलागिरि"
        ],
        "correct": 0,
        "explanation": "ब्रह्मपुत्र नदी नामचा बरवा पर्वत से टकराकर एक गहरा महाखड्ड (Gorge) बनाती हुई अरुणाचल प्रदेश में दिहांग नाम से प्रवेश करती है। असम में यह माजुली नदी द्वीप बनाती है।"
      }
    },
    {
      "key": "geo_strait_hormuz",
      "subtopic": "World Straits & Choke Points (विश्व के प्रमुख जलडमरूमध्य)",
      "score": 99,
      "tags": [
        "Strait of Hormuz",
        "Persian Gulf",
        "Gulf of Oman",
        "Oil Choke Point"
      ],
      "en": {
        "question": "The strategic Strait of Hormuz, through which roughly one-fifth of the world's total petroleum consumption passes, connects which two bodies of water?",
        "options": [
          "Persian Gulf and Gulf of Oman (Arabian Sea)",
          "Red Sea and Gulf of Aden",
          "Black Sea and Mediterranean Sea",
          "North Sea and Baltic Sea"
        ],
        "correct": 0,
        "explanation": "The Strait of Hormuz lies between Iran to the north and Oman/UAE to the south, serving as the sole maritime gateway out of the oil-rich Persian Gulf into the open Indian Ocean."
      },
      "hi": {
        "question": "संसार के लगभग 20% पेट्रोलियम तेल का परिवहन करने वाला अत्यंत सामरिक 'हॉर्मुज जलडमरूमध्य' (Strait of Hormuz) किन दो जलराशियों को जोड़ता है?",
        "options": [
          "फारस की खाड़ी एवं ओमान की खाड़ी (अरब सागर)",
          "लाल सागर एवं अदन की खाड़ी",
          "काला सागर एवं भूमध्य सागर",
          "उत्तरी सागर एवं बाल्टिक सागर"
        ],
        "correct": 0,
        "explanation": "हॉर्मुज जलडमरूमध्य ईरान और ओमान/संयुक्त अरब अमीरात के मध्य स्थित है। यह फारस की खाड़ी के तेल निर्यातक देशों (सऊदी, कुवैत, इराक, यूएई) का मुख्य समुद्री निकास है।"
      }
    },
    {
      "key": "geo_lake_baikal",
      "subtopic": "World Lakes (विश्व की झीलें)",
      "score": 98,
      "tags": [
        "Lake Baikal",
        "Deepest Lake",
        "Siberia Russia",
        "Freshwater"
      ],
      "en": {
        "question": "Lake Baikal, situated in southern Siberia (Russia), is celebrated in global physical geography as what?",
        "options": [
          "The deepest (1,642 meters) and oldest freshwater lake on Earth, holding 20% of world's unfrozen surface freshwater",
          "The largest saltwater lake",
          "The highest navigable lake",
          "The most saline water body"
        ],
        "correct": 0,
        "explanation": "Lake Baikal is a rift lake in Siberia. At 1,642 m depth and 25-30 million years age, it is the world's deepest and oldest lake, containing more water than all the North American Great Lakes combined."
      },
      "hi": {
        "question": "रूस के साइबेरिया क्षेत्र में स्थित 'बैकाल झील' (Lake Baikal) विश्व भूगोल में किस रूप में प्रसिद्ध है?",
        "options": [
          "पृथ्वी की सबसे गहरी (1,642 मीटर) एवं प्राचीनतम मीठे पानी की झील जो विश्व के कुल अलवणीय सतही जल का 20% संचित रखती है",
          "विश्व की सबसे बड़ी खारे पानी की झील",
          "विश्व की सबसे ऊंची नौगम्य झील",
          "विश्व की सबसे लवणीय झील"
        ],
        "correct": 0,
        "explanation": "बैकाल झील साइबेरिया की एक रिफ्ट घाटी में स्थित है। यह संसार की सबसे गहरी मीठे पानी की झील है जिसे 'साइबेरिया का मोती' कहा जाता है।"
      }
    },
    {
      "key": "geo_winds_coriolis_force",
      "subtopic": "Atmospheric Winds (पवन तंत्र)",
      "score": 97,
      "tags": [
        "Coriolis Force",
        "Ferrel Law",
        "Earth Rotation",
        "Deflection"
      ],
      "en": {
        "question": "Due to Earth's rotation from west to east, the apparent deflective force (Coriolis Force) causes moving winds to deflect in which direction according to Ferrel's Law?",
        "options": [
          "To the right in the Northern Hemisphere and to the left in the Southern Hemisphere",
          "To the left in Northern Hemisphere and right in Southern",
          "Directly towards the equator in both hemispheres",
          "Directly towards the poles in both hemispheres"
        ],
        "correct": 0,
        "explanation": "Coriolis force is zero at the equator and increases to maximum at the poles. Under Ferrel's Law, wind trajectories deflect to their right in the Northern Hemisphere and to their left in the Southern Hemisphere."
      },
      "hi": {
        "question": "पृथ्वी के पश्चिम से पूर्व घूर्णन के कारण उत्पन्न 'कोरिओलिस बल' (Coriolis Force) फेरेल के नियमानुसार पवनों को किस दिशा में विक्षेपित करता है?",
        "options": [
          "उत्तरी गोलार्ध में अपनी दाईं ओर तथा दक्षिणी गोलार्ध में अपनी बाईं ओर",
          "उत्तरी गोलार्ध में बाईं ओर तथा दक्षिणी में दाईं ओर",
          "दोनों गोलार्धों में सीधे भूमध्य रेखा की ओर",
          "दोनों गोलार्धों में सीधे ध्रुवों की ओर"
        ],
        "correct": 0,
        "explanation": "फेरेल के नियमानुसार कोरिओलिस बल के प्रभाव से हवाएं उत्तरी गोलार्ध में अपनी गति की दिशा के दाहिनी ओर तथा दक्षिणी गोलार्ध में बाईं ओर मुड़ जाती हैं। यह बल भूमध्य रेखा पर शून्य होता है।"
      }
    }
  ],
  "indian_polity": [
    {
      "key": "polity_preamble_42nd",
      "subtopic": "Constitutional Framework (प्रस्तावना)",
      "score": 99,
      "tags": [
        "Preamble",
        "42nd Amendment",
        "1976",
        "Socialist Secular Integrity"
      ],
      "en": {
        "question": "Which three words were inserted into the Preamble of the Indian Constitution by the 42nd Constitutional Amendment Act of 1976?",
        "options": [
          "Socialist, Secular, and Integrity (समाजवादी, पंथनिरपेक्ष एवं अखंडता)",
          "Liberty, Equality, and Fraternity",
          "Justice, Democratic, and Republic",
          "Sovereign, Federal, and Pluralist"
        ],
        "correct": 0,
        "explanation": "The Preamble has been amended only once: by the 42nd Amendment 1976, which added the words 'Socialist', 'Secular', and changed 'Unity of the Nation' to 'Unity and Integrity of the Nation'."
      },
      "hi": {
        "question": "42वें संविधान संशोधन अधिनियम 1976 द्वारा भारतीय संविधान की उद्देशिका (प्रस्तावना) में कौन से तीन शब्द जोड़े गए थे?",
        "options": [
          "समाजवादी, पंथनिरपेक्ष एवं अखंडता (Socialist, Secular & Integrity)",
          "स्वतंत्रता, समानता एवं बंधुत्व",
          "न्याय, लोकतांत्रिक एवं गणराज्य",
          "संप्रभु, संघीय एवं बहुलवादी"
        ],
        "correct": 0,
        "explanation": "प्रस्तावना में अब तक केवल एक बार संशोधन हुआ है। 1976 में 42वें संशोधन द्वारा 'समाजवादी', 'पंथनिरपेक्ष' तथा 'अखंडता' शब्द शामिल किए गए।"
      }
    },
    {
      "key": "polity_art_17_untouchability",
      "subtopic": "Fundamental Rights (मूल अधिकार)",
      "score": 99,
      "tags": [
        "Article 17",
        "Untouchability",
        "Absolute Right",
        "Civil Rights"
      ],
      "en": {
        "question": "Article 17 of the Indian Constitution declares what fundamental guarantee enforceable directly against private individuals without any exceptions?",
        "options": [
          "Abolition of Untouchability (अस्पृश्यता का अंत)",
          "Abolition of Titles",
          "Right to Elementary Education",
          "Protection against Double Jeopardy"
        ],
        "correct": 0,
        "explanation": "Article 17 abolishes 'Untouchability' and forbids its practice in any form. It is an absolute Fundamental Right that allows no exceptions, enforced through the Protection of Civil Rights Act 1955."
      },
      "hi": {
        "question": "भारतीय संविधान का कौन सा अनुच्छेद 'अस्पृश्यता का अंत' (Abolition of Untouchability) घोषित करता है जो बिना किसी अपवाद के निजी व्यक्तियों के विरुद्ध भी लागू होता है?",
        "options": [
          "अनुच्छेद 17 (Article 17)",
          "अनुच्छेद 18",
          "अनुच्छेद 21A",
          "अनुच्छेद 20"
        ],
        "correct": 0,
        "explanation": "अनुच्छेद 17 अस्पृश्यता का पूर्ण उन्मूलन करता है तथा इसके किसी भी रूप में आचरण को विधि के अनुसार दंडनीय अपराध घोषित करता है।"
      }
    },
    {
      "key": "polity_art_32_writs",
      "subtopic": "Fundamental Rights (संवैधानिक उपचार)",
      "score": 99,
      "tags": [
        "Article 32",
        "Writs",
        "Heart and Soul",
        "Ambedkar"
      ],
      "en": {
        "question": "Which Article was described by Dr. B.R. Ambedkar as the 'very soul of the Constitution and the very heart of it', empowering the Supreme Court to issue prerogative writs?",
        "options": [
          "Article 32 (Right to Constitutional Remedies)",
          "Article 21",
          "Article 14",
          "Article 226"
        ],
        "correct": 0,
        "explanation": "Dr. Ambedkar hailed Article 32 as the heart and soul of the Constitution because Fundamental Rights would be meaningless without judicial enforcement through writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto)."
      },
      "hi": {
        "question": "डॉ. भीमराव अंबेडकर ने संविधान के किस अनुच्छेद को 'संविधान की आत्मा और उसका हृदय' कहा था, जिसके तहत सर्वोच्च न्यायालय को 5 प्रकार की रिटें जारी करने का अधिकार है?",
        "options": [
          "अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार)",
          "अनुच्छेद 21",
          "अनुच्छेद 14",
          "अनुच्छेद 226"
        ],
        "correct": 0,
        "explanation": "अनुच्छेद 32 नागरिकों के मौलिक अधिकारों के संरक्षण की गारंटी देता है। डॉ. अंबेडकर ने कहा था कि यदि मुझसे पूछा जाए कि संविधान का कौन सा अनुच्छेद सबसे महत्वपूर्ण है, तो मैं अनुच्छेद 32 का नाम लूंगा।"
      }
    },
    {
      "key": "polity_art_32_mandamus",
      "subtopic": "Fundamental Rights (संवैधानिक उपचार)",
      "score": 98,
      "tags": [
        "Mandamus",
        "We Command",
        "Public Duty",
        "Writs"
      ],
      "en": {
        "question": "The prerogative writ of 'Mandamus' (परमादेश) literally translates to 'We Command'. What is its specific legal purpose?",
        "options": [
          "To compel a public official, court, or statutory authority to perform a mandatory public duty which they have failed to perform",
          "To produce a detained person before the court",
          "To quash an order passed without jurisdiction",
          "To challenge the unlawful occupation of a public office"
        ],
        "correct": 0,
        "explanation": "Mandamus is issued to command a public officer or body to perform a statutory public duty. It cannot be issued against private individuals, the President of India, or Governors."
      },
      "hi": {
        "question": "संवैधानिक रिट 'परमादेश' (Mandamus) का शाब्दिक अर्थ 'हम आदेश देते हैं' होता है। इसका प्रयोग किस उद्देश्य हेतु किया जाता है?",
        "options": [
          "किसी लोक प्राधिकारी या अधीनस्थ निकाय को उसके विधिक/सार्वजनिक कर्तव्य का पालन करने हेतु बाध्य करना",
          "किसी बंदी बनाए गए व्यक्ति को न्यायालय के समक्ष प्रस्तुत करने हेतु",
          "अधिकार क्षेत्र से बाहर जाकर दिए गए निर्णय को निरस्त करने हेतु",
          "किसी सार्वजनिक पद पर किसी व्यक्ति के अवैध दावे की जांच करने हेतु"
        ],
        "correct": 0,
        "explanation": "परमादेश रिट तब जारी की जाती है जब कोई सरकारी अधिकारी या सार्वजनिक निकाय अपने अनिवार्य विधिक कर्तव्य का पालन करने से इनकार करता है।"
      }
    },
    {
      "key": "polity_dpsp_article_44",
      "subtopic": "Directive Principles (नीति निर्देशक तत्व)",
      "score": 99,
      "tags": [
        "Article 44",
        "UCC",
        "Uniform Civil Code",
        "DPSP"
      ],
      "en": {
        "question": "Which Article in Part IV (Directive Principles of State Policy) directs the State to endeavor to secure for all citizens a 'Uniform Civil Code' (समान नागरिक संहिता) throughout India?",
        "options": [
          "Article 44 (अनुच्छेद 44)",
          "Article 40",
          "Article 48",
          "Article 50"
        ],
        "correct": 0,
        "explanation": "Article 44 states: 'The State shall endeavour to secure for the citizens a Uniform Civil Code throughout the territory of India.' Goa is the historic state with UCC, and Uttarakhand became the first state to pass UCC in 2024."
      },
      "hi": {
        "question": "भारतीय संविधान के भाग IV (राज्य के नीति निर्देशक तत्व) का कौन सा अनुच्छेद राज्य को पूरे भारत में नागरिकों हेतु एक 'समान नागरिक संहिता' (Uniform Civil Code) लागू करने का निर्देश देता है?",
        "options": [
          "अनुच्छेद 44 (Article 44)",
          "अनुच्छेद 40",
          "अनुच्छेद 48",
          "अनुच्छेद 50"
        ],
        "correct": 0,
        "explanation": "अनुच्छेद 44 समान नागरिक संहिता से संबंधित है। उत्तराखंड स्वतंत्रता के बाद यूसीसी लागू करने वाला देश का पहला राज्य बना है (गोवा में पुर्तगाली सिविल कोड पहले से लागू था)।"
      }
    },
    {
      "key": "polity_president_impeachment_61",
      "subtopic": "Union Executive (राष्ट्रपति)",
      "score": 98,
      "tags": [
        "Impeachment",
        "Article 61",
        "Violation of Constitution",
        "Two Thirds"
      ],
      "en": {
        "question": "Under Article 61 of the Constitution, what is the SOLE constitutional ground on which the President of India can be impeached by Parliament?",
        "options": [
          "'Violation of the Constitution' (संविधान का अतिक्रमण)",
          "Proved misbehavior or incapacity",
          "Corruption and treason",
          "Moral turpitude"
        ],
        "correct": 0,
        "explanation": "Article 61 states that the President can be removed only for 'Violation of the Constitution'. The impeachment resolution must be passed by a majority of not less than two-thirds of the TOTAL membership of each House."
      },
      "hi": {
        "question": "भारतीय संविधान के अनुच्छेद 61 के तहत संसद द्वारा राष्ट्रपति पर महाभियोग चलाने का एकमात्र संवैधानिक आधार क्या है?",
        "options": [
          "संविधान का अतिक्रमण / उल्लंघन (Violation of the Constitution)",
          "कदाचार या असमर्थता",
          "भ्रष्टाचार एवं देशद्रोह",
          "मानसिक दुर्बलता"
        ],
        "correct": 0,
        "explanation": "अनुच्छेद 61 के अनुसार राष्ट्रपति को केवल 'संविधान के उल्लंघन' के आरोप में ही महाभियोग की प्रक्रिया द्वारा हटाया जा सकता है, जिसके लिए प्रत्येक सदन के कुल सदस्य संख्या के दो-तिहाई बहुमत की आवश्यकता होती है।"
      }
    },
    {
      "key": "polity_money_bill_art110",
      "subtopic": "Parliament (संसद)",
      "score": 99,
      "tags": [
        "Money Bill",
        "Article 110",
        "Speaker Certificate",
        "14 Days"
      ],
      "en": {
        "question": "Under Article 110 of the Constitution, who possesses the sole and final authority to certify whether a bill is a 'Money Bill', and what is the maximum duration Rajya Sabha can detain it?",
        "options": [
          "Speaker of Lok Sabha (certificate is final); Rajya Sabha can detain for maximum 14 days",
          "President of India; 30 days",
          "Finance Minister; 21 days",
          "Chairman of Rajya Sabha; 6 months"
        ],
        "correct": 0,
        "explanation": "Under Article 110(3), the decision of the Speaker of the Lok Sabha on whether a bill is a Money Bill is final. Rajya Sabha cannot amend or reject it and must return it within 14 days."
      },
      "hi": {
        "question": "संविधान के अनुच्छेद 110 के अनुसार कोई विधेयक 'धन विधेयक' (Money Bill) है या नहीं, इसका अंतिम प्रमाणन करने का अधिकार किसे है तथा राज्यसभा इसे अधिकतम कितने दिन रोक सकती है?",
        "options": [
          "लोकसभा अध्यक्ष (निर्णय अंतिम); राज्यसभा अधिकतम 14 दिन रोक सकती है",
          "भारत के राष्ट्रपति; 30 दिन",
          "केंद्रीय वित्त मंत्री; 21 दिन",
          "राज्यसभा के सभापति; 6 महीने"
        ],
        "correct": 0,
        "explanation": "धन विधेयक केवल लोकसभा में राष्ट्रपति की पूर्व सिफारिश से प्रस्तुत होता है। लोकसभा अध्यक्ष का निर्णय अंतिम होता है तथा राज्यसभा इसे अधिकतम 14 दिन ही रोक सकती है।"
      }
    },
    {
      "key": "polity_sc_basic_structure",
      "subtopic": "Judiciary (सर्वोच्च न्यायालय)",
      "score": 99,
      "tags": [
        "Basic Structure",
        "Kesavananda Bharati",
        "1973",
        "Article 368"
      ],
      "en": {
        "question": "In which landmark judgment delivered on 24 April 1973 by a 13-judge constitutional bench did the Supreme Court propound the 'Basic Structure Doctrine' (मूल संरचना का सिद्धांत)?",
        "options": [
          "Kesavananda Bharati v. State of Kerala (केशवानंद भारती केस)",
          "Golaknath v. State of Punjab",
          "Minerva Mills v. Union of India",
          "Maneka Gandhi v. Union of India"
        ],
        "correct": 0,
        "explanation": "In Kesavananda Bharati (1973), a 7:6 majority ruled that while Parliament can amend any part of the Constitution under Art. 368, it cannot alter or destroy its Basic Structure (democracy, secularism, judicial review, rule of law)."
      },
      "hi": {
        "question": "24 अप्रैल 1973 को 13 न्यायाधीशों की सबसे बड़ी संविधान पीठ द्वारा दिए गए किस ऐतिहासिक फैसले में सर्वोच्च न्यायालय ने 'मूल संरचना के सिद्धांत' (Basic Structure Doctrine) का प्रतिपादन किया?",
        "options": [
          "केशवानंद भारती बनाम केरल राज्य (Kesavananda Bharati case)",
          "गोलकनाथ बनाम पंजाब राज्य",
          "मिनर्वा मिल्स बनाम भारत संघ",
          "मेनका गांधी बनाम भारत संघ"
        ],
        "correct": 0,
        "explanation": "केशवानंद भारती मामले में सर्वोच्च न्यायालय ने निर्णय दिया कि संसद अनुच्छेद 368 के तहत मौलिक अधिकारों सहित किसी भी भाग में संशोधन कर सकती है, परंतु संविधान के 'मूल ढांचे' को नष्ट नहीं कर सकती।"
      }
    },
    {
      "key": "polity_finance_comm_280",
      "subtopic": "Constitutional Bodies (वित्त आयोग)",
      "score": 98,
      "tags": [
        "Finance Commission",
        "Article 280",
        "Tax Devolution",
        "Panagariya"
      ],
      "en": {
        "question": "Under Article 280 of the Constitution, the Finance Commission is constituted by the President every five years. Who has been appointed as Chairman of the 16th Finance Commission?",
        "options": [
          "Dr. Arvind Panagariya (डॉ. अरविंद पनगढ़िया)",
          "N.K. Singh",
          "Dr. Y.V. Reddy",
          "Dr. C. Rangarajan"
        ],
        "correct": 0,
        "explanation": "The 16th Finance Commission was constituted under the chairmanship of noted economist Dr. Arvind Panagariya (former Vice-Chairman of NITI Aayog, of Rajasthan origin). Recommendations cover 2026-2031."
      },
      "hi": {
        "question": "संविधान के अनुच्छेद 280 के तहत राष्ट्रपति द्वारा प्रत्येक 5 वर्ष में गठित किए जाने वाले 16वें वित्त आयोग का अध्यक्ष किसे नियुक्त किया गया है?",
        "options": [
          "डॉ. अरविंद पनगढ़िया (Dr. Arvind Panagariya)",
          "एन.के. सिंह",
          "डॉ. वाई.वी. रेड्डी",
          "डॉ. सी. रंगराजन"
        ],
        "correct": 0,
        "explanation": "16वें वित्त आयोग का अध्यक्ष नीति आयोग के पूर्व उपाध्यक्ष एवं राजस्थान मूल के विख्यात अर्थशास्त्री डॉ. अरविंद पनगढ़िया को बनाया गया है। यह 2026 से 2031 तक कर बंटवारे की सिफारिश करेगा।"
      }
    },
    {
      "key": "polity_nari_shakti_106th",
      "subtopic": "Constitutional Amendments (संविधान संशोधन)",
      "score": 99,
      "tags": [
        "106th Amendment",
        "Nari Shakti Vandan",
        "33 Percent",
        "Women Reservation"
      ],
      "en": {
        "question": "The historic 106th Constitutional Amendment Act 2023 (Nari Shakti Vandan Adhiniyam) provides what percentage of reservation for women in Lok Sabha and State Legislative Assemblies?",
        "options": [
          "33% (One-third reservation for women for a period of 15 years)",
          "50% reservation",
          "25% reservation",
          "30% reservation"
        ],
        "correct": 0,
        "explanation": "The 106th Amendment Act 2023 (Articles 330A, 332A, 334A) reserves 33% of seats in Lok Sabha and state assemblies for women for 15 years, to be implemented after delimitation following the census."
      },
      "hi": {
        "question": "ऐतिहासिक 106वें संविधान संशोधन अधिनियम 2023 (नारी शक्ति वंदन अधिनियम) द्वारा लोकसभा एवं राज्य विधानसभाओं में महिलाओं हेतु कितने प्रतिशत आरक्षण का प्रावधान किया गया है?",
        "options": [
          "33% (एक-तिहाई सीटें, 15 वर्ष की अवधि हेतु)",
          "50% आरक्षण",
          "25% आरक्षण",
          "30% आरक्षण"
        ],
        "correct": 0,
        "explanation": "106वें संशोधन द्वारा लोकसभा तथा राज्यों की विधानसभाओं में महिलाओं के लिए 33% (एक-तिहाई) आरक्षण सुनिश्चित किया गया है। यह व्यवस्था परिसीमन के पश्चात प्रभावी होगी।"
      }
    }
  ],
  "indian_economy": [
    {
      "key": "econ_rbi_repo_rate",
      "subtopic": "Monetary Policy (मौद्रिक नीति)",
      "score": 99,
      "tags": [
        "Repo Rate",
        "Policy Rate",
        "RBI",
        "Liquidity"
      ],
      "en": {
        "question": "In monetary economics, what does the 'Repo Rate' (Repurchasing Option Rate) fixed by the Reserve Bank of India mean?",
        "options": [
          "The interest rate at which RBI lends short-term money to commercial banks against government securities",
          "The rate at which commercial banks park excess liquidity with RBI",
          "The rate at which RBI lends long-term loans to foreign governments",
          "The rate at which commercial banks lend to their prime customers"
        ],
        "correct": 0,
        "explanation": "Repo rate is the key benchmark policy rate at which RBI provides overnight liquidity to commercial banks against eligible government securities with a repurchase agreement."
      },
      "hi": {
        "question": "मौद्रिक नीति में भारतीय रिजर्व बैंक (RBI) द्वारा निर्धारित 'रेपो दर' (Repo Rate) का क्या अर्थ होता है?",
        "options": [
          "वह ब्याज दर जिस पर आरबीआई वाणिज्यिक बैंकों को सरकारी प्रतिभूतियों के बदले अल्पकालिक ऋण प्रदान करता है",
          "वह दर जिस पर वाणिज्यिक बैंक अपनी अधिशेष राशि आरबीआई के पास जमा करते हैं",
          "वह दर जिस पर बैंक अपने सर्वोत्तम ग्राहकों को ऋण देते हैं",
          "वह दर जिस पर सरकार विदेशी संस्थाओं से उधार लेती है"
        ],
        "correct": 0,
        "explanation": "रेपो दर वह प्रमुख नीतिगत दर है जिस पर केंद्रीय बैंक (RBI) वाणिज्यिक बैंकों को नकदी संकट के समय अल्पकालिक धन उधार देता है। मुद्रास्फीति नियंत्रण हेतु रेपो दर बढ़ाई जाती है।"
      }
    },
    {
      "key": "econ_rbi_mpc_framework",
      "subtopic": "Monetary Policy (मौद्रिक नीति)",
      "score": 98,
      "tags": [
        "MPC",
        "6 Members",
        "Inflation Target",
        "4 Percent"
      ],
      "en": {
        "question": "What is the composition and inflation targeting mandate of the Monetary Policy Committee (MPC) established under the amended RBI Act 1934?",
        "options": [
          "6 Members (3 from RBI including Governor with casting vote, 3 appointed by Central Govt); Inflation target 4% (+/- 2%)",
          "5 Members headed by Finance Minister; Target 5%",
          "7 Members; Target 3%",
          "4 Members; Target 6%"
        ],
        "correct": 0,
        "explanation": "The MPC consists of 6 members: 3 from RBI (Governor is ex-officio Chairperson with casting vote) and 3 external experts appointed by the Central Government. Mandate is CPI headline inflation of 4% within a +/-2% tolerance band (2% to 6%)."
      },
      "hi": {
        "question": "आरबीआई अधिनियम 1934 के तहत गठित 'मौद्रिक नीति समिति' (MPC) की संरचना तथा इसका मुद्रास्फीति लक्ष्य क्या है?",
        "options": [
          "6 सदस्य (3 आरबीआई से गवर्नर सहित तथा 3 केंद्र द्वारा नियुक्त); मुद्रास्फीति लक्ष्य 4% (+/- 2%)",
          "5 सदस्य वित्त मंत्री की अध्यक्षता में; लक्ष्य 5%",
          "7 सदस्य; लक्ष्य 3%",
          "4 सदस्य; लक्ष्य 6%"
        ],
        "correct": 0,
        "explanation": "मौद्रिक नीति समिति में 6 सदस्य होते हैं। इसका वैधानिक कार्य खुदरा मुद्रास्फीति (CPI) को 4% पर बनाए रखना है, जिसकी सहनशील सीमा 2% से 6% के मध्य है।"
      }
    },
    {
      "key": "econ_fiscal_deficit_def",
      "subtopic": "Public Finance (राजकोषीय नीति)",
      "score": 99,
      "tags": [
        "Fiscal Deficit",
        "Total Receipts",
        "Borrowings",
        "FRBM"
      ],
      "en": {
        "question": "What is the precise macroeconomic definition of 'Fiscal Deficit' (राजकोषीय घाटा) in the Union Budget?",
        "options": [
          "Total Budget Expenditure - Total Budget Receipts excluding borrowings (total borrowing requirement of the government)",
          "Revenue Expenditure - Revenue Receipts",
          "Fiscal Deficit - Interest Payments",
          "Total Imports - Total Exports"
        ],
        "correct": 0,
        "explanation": "Fiscal Deficit = Total Expenditure - (Revenue Receipts + Non-debt Capital Receipts). It reflects the total net borrowing requirement of the Government of India from all domestic and external sources."
      },
      "hi": {
        "question": "केंद्रीय बजट में 'राजकोषीय घाटा' (Fiscal Deficit) की सही समष्टि अर्थशास्त्रीय परिभाषा क्या है?",
        "options": [
          "कुल बजट व्यय - ऋणों को छोड़कर कुल बजट प्राप्तियां (सरकार की कुल शुद्ध ऋण आवश्यकता)",
          "राजस्व व्यय - राजस्व प्राप्तियां",
          "राजकोषीय घाटा - ब्याज भुगतान",
          "कुल आयात - कुल निर्यात"
        ],
        "correct": 0,
        "explanation": "राजकोषीय घाटा सरकार के कुल व्यय तथा ऋण भिन्न कुल प्राप्तियों का अंतर होता है। यह दर्शाता है कि सरकार को अपने खर्चों को पूरा करने हेतु बाजार से कितना कर्ज लेना पड़ेगा।"
      }
    },
    {
      "key": "econ_primary_deficit",
      "subtopic": "Public Finance (राजकोषीय नीति)",
      "score": 98,
      "tags": [
        "Primary Deficit",
        "Fiscal Deficit",
        "Interest Payments",
        "Past Debt"
      ],
      "en": {
        "question": "How is the 'Primary Deficit' (प्राथमिक घाटा) calculated, and what does a zero primary deficit indicate?",
        "options": [
          "Primary Deficit = Fiscal Deficit - Interest Payments; indicates borrowing is needed only to pay past debt interest",
          "Primary Deficit = Revenue Deficit - Capital Deficit",
          "Primary Deficit = Total Borrowing + Foreign Aid",
          "Primary Deficit = Monetized Deficit - Tax Revenue"
        ],
        "correct": 0,
        "explanation": "Primary Deficit = Fiscal Deficit - Net Interest Payments. It isolates the current fiscal stance from the burden of accumulated past debt. Zero primary deficit means borrowing is solely to pay interest on old debts."
      },
      "hi": {
        "question": "'प्राथमिक घाटा' (Primary Deficit) की गणना कैसे की जाती है तथा शून्य प्राथमिक घाटा क्या दर्शाता है?",
        "options": [
          "प्राथमिक घाटा = राजकोषीय घाटा - ब्याज भुगतान; यह दर्शाता है कि चालू वर्ष का सारा उधार केवल पुराने कर्जों का ब्याज चुकाने हेतु लिया जा रहा है",
          "प्राथमिक घाटा = राजस्व घाटा - पूंजीगत घाटा",
          "प्राथमिक घाटा = कुल उधार + विदेशी सहायता",
          "प्राथमिक घाटा = घाटे का मुद्रीकरण - कर राजस्व"
        ],
        "correct": 0,
        "explanation": "प्राथमिक घाटा राजकोषीय घाटे में से पिछले ऋणों पर किए जाने वाले ब्याज भुगतान को घटाने पर प्राप्त होता है। यह वर्तमान वर्ष की वास्तविक राजकोषीय स्थिति को दर्शाता है।"
      }
    },
    {
      "key": "econ_gst_council_279a",
      "subtopic": "Taxation (कराधान)",
      "score": 98,
      "tags": [
        "GST Council",
        "Article 279A",
        "101st Amendment",
        "Weighted Voting"
      ],
      "en": {
        "question": "Under Article 279A inserted by the 101st Constitutional Amendment Act, how are decisions taken in the GST Council?",
        "options": [
          "By a majority of not less than 75% (3/4th) of weighted votes of members present and voting (Centre has 1/3rd weight, all States together have 2/3rd weight)",
          "By simple 50% majority",
          "By unanimous consent only",
          "Centre has 51% majority alone"
        ],
        "correct": 0,
        "explanation": "In GST Council (Art. 279A): Central Government has 1/3rd (33.3%) voting weight, while all State Governments combined have 2/3rd (66.7%) weight. Every decision requires a 75% weighted supermajority."
      },
      "hi": {
        "question": "101वें संविधान संशोधन द्वारा जोड़े गए अनुच्छेद 279A के तहत 'जीएसटी परिषद' (GST Council) में निर्णय किस प्रकार लिए जाते हैं?",
        "options": [
          "उपस्थित एवं मतदान करने वाले सदस्यों के 75% (तीन-चौथाई) भारित बहुमत द्वारा (केंद्र का 1/3 भार, सभी राज्यों का 2/3 भार)",
          "सामान्य 50% बहुमत द्वारा",
          "केवल सर्वसम्मति द्वारा",
          "अकेले केंद्र के 51% बहुमत द्वारा"
        ],
        "correct": 0,
        "explanation": "जीएसटी परिषद में कोई भी प्रस्ताव पारित होने हेतु 75% भारित मत आवश्यक हैं। इसमें केंद्र सरकार का मत भार एक-तिहाई तथा सभी राज्यों का कुल मिलाकर दो-तिहाई होता है।"
      }
    },
    {
      "key": "econ_niti_aayog_structure",
      "subtopic": "Economic Planning (नीति आयोग)",
      "score": 99,
      "tags": [
        "NITI Aayog",
        "1 Jan 2015",
        "Cooperative Federalism",
        "Governing Council"
      ],
      "en": {
        "question": "NITI Aayog (National Institution for Transforming India) replaced the Planning Commission on 1 January 2015. What is the fundamental difference in its approach?",
        "options": [
          "It acts as a strategic think-tank fostering 'Cooperative Federalism' without allocating financial plan funds to states",
          "It allocates 5-year plan budget grants to states",
          "It is a constitutional body created under Article 280",
          "It regulates commercial banks and interest rates"
        ],
        "correct": 0,
        "explanation": "NITI Aayog, established by Cabinet resolution on 1 Jan 2015, functions as a policy think-tank promoting bottom-up cooperative federalism through its Governing Council (all CMs + LGs), unlike the Planning Commission which allocated plan grants."
      },
      "hi": {
        "question": "1 जनवरी 2015 को योजना आयोग के स्थान पर गठित 'नीति आयोग' (NITI Aayog) का मूल दृष्टिकोण पूर्ववर्ती संस्था से किस प्रकार भिन्न है?",
        "options": [
          "यह 'सहकारी संघवाद' को बढ़ावा देने वाला एक रणनीतिक थिंक-टैंक है जो राज्यों को वित्तीय अनुदान आवंटित नहीं करता",
          "यह राज्यों को पंचवर्षीय योजनाओं का बजट आवंटित करता है",
          "यह अनुच्छेद 280 के तहत गठित एक संवैधानिक निकाय है",
          "यह वाणिज्यिक बैंकों की ब्याज दरों को नियंत्रित करता है"
        ],
        "correct": 0,
        "explanation": "नीति आयोग एक गैर-सांविधिक सलाहकार थिंक-टैंक है। योजना आयोग के विपरीत इसके पास मंत्रालयों या राज्यों को वित्तीय धन आबंटित करने का अधिकार नहीं है।"
      }
    },
    {
      "key": "econ_priority_sector_lending",
      "subtopic": "Banking (बैंकिंग क्षेत्र)",
      "score": 97,
      "tags": [
        "PSL",
        "40 Percent",
        "Agriculture",
        "MSME"
      ],
      "en": {
        "question": "Under RBI regulations, what percentage of Adjusted Net Bank Credit (ANBC) must domestic commercial banks mandatorily lend to the 'Priority Sector' (Agriculture, MSME, Education, Housing)?",
        "options": [
          "40% of ANBC (Adjusted Net Bank Credit)",
          "25%",
          "50%",
          "18%"
        ],
        "correct": 0,
        "explanation": "Domestic commercial banks and foreign banks with >=20 branches must deploy 40% of their ANBC to priority sectors (with sub-targets of 18% for agriculture and 7.5% for micro enterprises). Regional Rural Banks have a 75% target."
      },
      "hi": {
        "question": "भारतीय रिजर्व बैंक के नियमों के अनुसार घरेलू वाणिज्यिक बैंकों को अपने समायोजित शुद्ध बैंक ऋण (ANBC) का न्यूनतम कितना प्रतिशत 'प्राथमिकता प्राप्त क्षेत्र' (PSL) को देना अनिवार्य है?",
        "options": [
          "40% (समायोजित शुद्ध बैंक ऋण का 40 प्रतिशत)",
          "25%",
          "50%",
          "18%"
        ],
        "correct": 0,
        "explanation": "आरबीआई द्वारा वाणिज्यिक बैंकों हेतु कुल ऋण का 40% प्राथमिकता प्राप्त क्षेत्र (कृषि, सूक्ष्म व लघु उद्योग, कमजोर वर्ग, शिक्षा, आवास) हेतु अनिवार्य किया गया है।"
      }
    },
    {
      "key": "econ_multidimensional_poverty",
      "subtopic": "Poverty & Human Development (मानव विकास)",
      "score": 98,
      "tags": [
        "MPI",
        "NITI Aayog",
        "12 Indicators",
        "Alkire Foster"
      ],
      "en": {
        "question": "India's National Multidimensional Poverty Index (MPI) released by NITI Aayog is based on the global Alkire-Foster methodology. Across how many equally weighted dimensions and indicators is it evaluated?",
        "options": [
          "3 Dimensions (Health, Education, Standard of Living) across 12 indicators",
          "2 Dimensions across 6 indicators",
          "4 Dimensions across 20 indicators",
          "5 Dimensions across 10 indicators"
        ],
        "correct": 0,
        "explanation": "NITI Aayog's National MPI tracks poverty across 3 equal dimensions: Health (weight 1/3), Education (weight 1/3), and Standard of Living (weight 1/3), divided into 12 sub-indicators including maternal health and bank accounts."
      },
      "hi": {
        "question": "नीति आयोग द्वारा जारी राष्ट्रीय बहुआयामी गरीबी सूचकांक (National MPI) में कितने आयामों एवं संकेतकों के आधार पर गरीबी का मापन किया जाता है?",
        "options": [
          "3 आयाम (स्वास्थ्य, शिक्षा एवं जीवन स्तर) तथा 12 संकेतक",
          "2 आयाम तथा 6 संकेतक",
          "4 आयाम तथा 20 संकेतक",
          "5 आयाम तथा 10 संकेतक"
        ],
        "correct": 0,
        "explanation": "राष्ट्रीय बहुआयामी गरीबी सूचकांक ऑक्सफोर्ड की अल्कायर-फॉस्टर पद्धति पर आधारित है जिसमें स्वास्थ्य, शिक्षा एवं जीवन स्तर के 3 समान भार वाले आयामों में 12 संकेतक शामिल हैं।"
      }
    }
  ],
  "science_tech": [
    {
      "key": "sci_isro_chandrayaan3",
      "subtopic": "Space Technology (अंतरिक्ष प्रौद्योगिकी)",
      "score": 99,
      "tags": [
        "Chandrayaan-3",
        "LVM3-M4",
        "Shiv Shakti",
        "South Pole",
        "23 August"
      ],
      "en": {
        "question": "Chandrayaan-3 achieved a historic soft landing near the Moon's South Pole on 23 August 2023. Which launch vehicle, lander, and designated landing point name were associated with it?",
        "options": [
          "Rocket: LVM3-M4; Lander: Vikram; Landing Point: Shiv Shakti Point (National Space Day: 23 Aug)",
          "Rocket: PSLV-C56; Lander: Pragyan; Point: Tiranga Point",
          "Rocket: GSLV Mk II; Lander: Vikram; Point: Jawahar Point",
          "Rocket: SSLV-D2; Lander: Pushpak; Point: Shakti Point"
        ],
        "correct": 0,
        "explanation": "LVM3-M4 launched Chandrayaan-3 on 14 July 2023. On 23 Aug 2023, Vikram lander touched down near lunar south pole at 'Shiv Shakti Point'. India declared August 23 as National Space Day."
      },
      "hi": {
        "question": "23 अगस्त 2023 को चंद्रमा के दक्षिणी ध्रुव पर ऐतिहासिक सॉफ्ट लैंडिंग करने वाले 'चंद्रयान-3' के प्रक्षेपण यान, लैंडर तथा लैंडिंग स्थल का आधिकारिक नाम क्या है?",
        "options": [
          "प्रक्षेपण यान: LVM3-M4; लैंडर: विक्रम; लैंडिंग स्थल: शिव शक्ति पॉइंट (राष्ट्रीय अंतरिक्ष दिवस: 23 अगस्त)",
          "प्रक्षेपण यान: PSLV-C56; लैंडर: प्रज्ञान; लैंडिंग स्थल: तिरंगा पॉइंट",
          "प्रक्षेपण यान: GSLV Mk II; लैंडर: विक्रम; लैंडिंग स्थल: जवाहर पॉइंट",
          "प्रक्षेपण यान: SSLV-D2; लैंडर: पुष्पक; लैंडिंग स्थल: शक्ति पॉइंट"
        ],
        "correct": 0,
        "explanation": "चंद्रयान-3 को LVM3-M4 बाहुबली रॉकेट से प्रक्षेपित किया गया। इसके लैंडर का नाम 'विक्रम' तथा रोवर का नाम 'प्रज्ञान' था। लैंडिंग स्थल का नाम 'शिव शक्ति पॉइंट' रखा गया।"
      }
    },
    {
      "key": "sci_isro_aditya_l1",
      "subtopic": "Space Technology (अंतरिक्ष प्रौद्योगिकी)",
      "score": 98,
      "tags": [
        "Aditya-L1",
        "Lagrangian Point L1",
        "PSLV-C57",
        "Corona VELC"
      ],
      "en": {
        "question": "India's first dedicated solar observatory mission 'Aditya-L1' was successfully inserted into a halo orbit around which Sun-Earth gravitational balance point ~1.5 million km from Earth?",
        "options": [
          "Lagrangian Point 1 (L1)",
          "Lagrangian Point 2 (L2)",
          "Low Earth Orbit (LEO)",
          "Geostationary Orbit (GEO)"
        ],
        "correct": 0,
        "explanation": "Launched on 2 Sept 2023 by PSLV-C57, Aditya-L1 reached the Sun-Earth L1 point on 6 Jan 2024. At L1, the gravitational forces of Sun and Earth balance the orbital motion, allowing uninterrupted view of the Sun."
      },
      "hi": {
        "question": "सूर्य का निरंतर अध्ययन करने वाला भारत का पहला सौर मिशन 'आदित्य-एल1' (Aditya-L1) पृथ्वी से 15 लाख किमी दूर किस सूर्य-पृथ्वी गुरुत्वाकर्षण संतुलन बिंदु पर स्थापित किया गया है?",
        "options": [
          "लैग्रेंज बिंदु 1 (L1 - Lagrangian Point 1)",
          "लैग्रेंज बिंदु 2 (L2)",
          "भू-स्थैतिक कक्षा (GEO)",
          "ध्रुवीय कक्षा (SSO)"
        ],
        "correct": 0,
        "explanation": "आदित्य-एल1 को पीएसएलवी-सी57 द्वारा प्रक्षेपित किया गया। यह लैग्रेंजियन बिंदु L1 के चारों ओर हेलो कक्षा में स्थित है जहाँ से सूर्य पर कभी ग्रहण नहीं लगता।"
      }
    },
    {
      "key": "sci_defense_agni5",
      "subtopic": "Defense Technology (रक्षा प्रौद्योगिकी)",
      "score": 99,
      "tags": [
        "Agni-5",
        "MIRV",
        "Mission Divyastra",
        "ICBM",
        "5000 Km"
      ],
      "en": {
        "question": "In March 2024, India successfully tested its indigenous Agni-5 Intercontinental Ballistic Missile with MIRV technology under which mission name?",
        "options": [
          "Mission Divyastra (मिशन दिव्यास्त्र)",
          "Mission Shakti",
          "Mission Sudarshan",
          "Mission Vajra"
        ],
        "correct": 0,
        "explanation": "Mission Divyastra marked the flight test of Agni-5 with Multiple Independently Targetable Re-entry Vehicle (MIRV) technology, enabling a single missile to deliver nuclear warheads to multiple independent targets >5000 km away."
      },
      "hi": {
        "question": "मार्च 2024 में डीआरडीओ ने एमआईआरवी (MIRV) तकनीक से लैस अग्नि-5 अंतरमहाद्वीपीय बैलिस्टिक मिसाइल का सफल उड़ान परीक्षण किस मिशन नाम से किया?",
        "options": [
          "मिशन दिव्यास्त्र (Mission Divyastra)",
          "मिशन शक्ति",
          "मिशन सुदर्शन",
          "मिशन वज्र"
        ],
        "correct": 0,
        "explanation": "मिशन दिव्यास्त्र के तहत अग्नि-5 मिसाइल का परीक्षण हुआ जिसमें एक ही मिसाइल एक साथ कई परमाणु हथियार ले जाकर अलग-अलग लक्ष्यों को 5,000 किमी से अधिक दूरी पर नष्ट कर सकती है।"
      }
    },
    {
      "key": "sci_biotech_crispr_cas9",
      "subtopic": "Biotechnology (जैव प्रौद्योगिकी)",
      "score": 99,
      "tags": [
        "CRISPR Cas9",
        "Gene Editing",
        "Molecular Scissors",
        "Nobel Prize"
      ],
      "en": {
        "question": "What is the breakthrough biotechnology tool 'CRISPR-Cas9', which won the Nobel Prize in Chemistry in 2020?",
        "options": [
          "A precise gene-editing molecular tool acting like programmable molecular scissors to edit DNA sequences",
          "A synthetic vaccine for retroviruses",
          "An artificial intelligence algorithm for protein folding",
          "A nanotech filter for water purification"
        ],
        "correct": 0,
        "explanation": "CRISPR-Cas9 utilizes a guide RNA to locate specific DNA sequences and Cas9 endonuclease enzyme to cut DNA strands with pinpoint precision, allowing correction of genetic defects."
      },
      "hi": {
        "question": "वर्ष 2020 के रसायन नोबेल पुरस्कार से सम्मानित क्रांतिकारी जैव प्रौद्योगिकी उपकरण 'CRISPR-Cas9' वास्तव में क्या है?",
        "options": [
          "डीएनए अनुक्रमों को अत्यंत सूक्ष्मता से काटने और संपादित करने वाली 'आणविक कैंची' (जीन संपादन तकनीक)",
          "एक कृत्रिम वायरस रोधी टीका",
          "प्रोटीन संरचना का विश्लेषण करने वाला एआई मॉडल",
          "जल शुद्धिकरण हेतु नैनोटेक फिल्टर"
        ],
        "correct": 0,
        "explanation": "CRISPR-Cas9 एक क्रांतिकारी जीन-एडिटिंग तकनीक है जो किसी भी जीव के डीएनए में सटीक बदलाव करने की सुविधा देती है। इसे इमैनुएल शारपेंतिये और जेनिफर डाउडना ने विकसित किया।"
      }
    },
    {
      "key": "sci_nuclear_three_stages",
      "subtopic": "Nuclear Energy (परमाणु ऊर्जा)",
      "score": 98,
      "tags": [
        "Three Stage Nuclear",
        "Homi Bhabha",
        "Thorium",
        "Fast Breeder"
      ],
      "en": {
        "question": "In India's three-stage nuclear power program conceptualized by Dr. Homi Bhabha, which abundant domestic mineral is designed to fuel Stage-3 reactors?",
        "options": [
          "Thorium-232 (थोरियम, extracted from Monazite sands of Kerala and Rajasthan)",
          "Enriched Uranium-235",
          "Plutonium-239",
          "Deuterium gas"
        ],
        "correct": 0,
        "explanation": "Homi Bhabha's 3 stages: Stage 1 = Natural Uranium in PHWRs; Stage 2 = Plutonium in Fast Breeder Reactors; Stage 3 = Thorium-232 / U-233 in Advanced Heavy Water Reactors. India holds 25% of world thorium reserves."
      },
      "hi": {
        "question": "डॉ. होमी जहांगीर भाभा द्वारा तैयार भारत के त्रि-चरणीय परमाणु ऊर्जा कार्यक्रम के तृतीय चरण (Stage-3) में किस स्वदेशी खनिज का उपयोग ईंधन के रूप में होना है?",
        "options": [
          "थोरियम-232 (Thorium - केरल व राजस्थान की मोनाजाइट बालू से प्राप्त)",
          "संवर्धित यूरेनियम-235",
          "प्लूटोनियम-239",
          "ड्यूटीरियम गैस"
        ],
        "correct": 0,
        "explanation": "भारत के पास विश्व का लगभग 25% थोरियम भंडार है। तीसरे चरण के उन्नत भारी जल रिएक्टरों (AHWR) में थोरियम-232 को यूरेनियम-233 में बदलकर ऊर्जा प्राप्त की जाएगी।"
      }
    },
    {
      "key": "sci_health_sickle_cell",
      "subtopic": "Health & Diseases (स्वास्थ्य एवं रोग)",
      "score": 98,
      "tags": [
        "Sickle Cell Anemia",
        "Genetic Disorder",
        "Mission 2047",
        "Hemoglobin"
      ],
      "en": {
        "question": "What is the underlying cause of 'Sickle Cell Anemia', and what is the target year set under the National Sickle Cell Anemia Elimination Mission?",
        "options": [
          "Genetic mutation in the beta-globin gene altering red blood cells into sickle shape; Elimination target: 2047",
          "Bacterial infection of bone marrow; Target: 2030",
          "Viral deficiency of platelets; Target: 2025",
          "Nutritional iron deficiency; Target: 2035"
        ],
        "correct": 0,
        "explanation": "Sickle cell anemia is an autosomal recessive genetic disease where mutated hemoglobin HbS causes RBCs to become rigid and sickle-shaped, blocking microvessels. National Mission targets elimination by 2047."
      },
      "hi": {
        "question": "'सिकल सेल एनीमिया' (Sickle Cell Anemia) रोग का मूल कारण क्या है तथा केंद्र सरकार के 'राष्ट्रीय सिकल सेल एनीमिया उन्मूलन मिशन' का लक्ष्य वर्ष क्या है?",
        "options": [
          "बीटा-ग्लोबिन जीन में उत्परिवर्तन जिससे लाल रक्त कणिकाएं (RBC) हंसिया के आकार की हो जाती हैं; उन्मूलन लक्ष्य: 2047",
          "अस्थि मज्जा का जीवाणु संक्रमण; उन्मूलन लक्ष्य: 2030",
          "प्लेटलेट्स की विषाणुजनित कमी; उन्मूलन लक्ष्य: 2025",
          "आयरन की कमी से होने वाला कुपोषण; उन्मूलन लक्ष्य: 2035"
        ],
        "correct": 0,
        "explanation": "सिकल सेल एक वंशानुगत आनुवंशिक रक्त विकार है जो मुख्य रूप से जनजातीय क्षेत्रों में पाया जाता है। केंद्र सरकार ने 2047 तक देश से इसके पूर्ण उन्मूलन का लक्ष्य रखा है।"
      }
    },
    {
      "key": "sci_physics_tir_optical_fiber",
      "subtopic": "Everyday Science (दैनिक विज्ञान)",
      "score": 98,
      "tags": [
        "Optical Fiber",
        "TIR",
        "Total Internal Reflection",
        "High Speed Internet"
      ],
      "en": {
        "question": "On which fundamental optical physics phenomenon do modern high-speed broadband optical fiber communication cables operate?",
        "options": [
          "Total Internal Reflection (TIR - पूर्ण आंतरिक परावर्तन)",
          "Diffraction of light",
          "Scattering of light",
          "Polarization of light"
        ],
        "correct": 0,
        "explanation": "Optical fibers transmit light pulses along a core surrounded by cladding with lower refractive index. When angle of incidence exceeds critical angle, Total Internal Reflection (TIR) occurs with negligible loss."
      },
      "hi": {
        "question": "आधुनिक हाई-स्पीड ब्रॉडबैंड इंटरनेट में प्रयुक्त 'ऑप्टिकल फाइबर' (प्रकाशीय तंतु) प्रकाश के किस मूलभूत भौतिक सिद्धांत पर कार्य करता है?",
        "options": [
          "पूर्ण आंतरिक परावर्तन (Total Internal Reflection - TIR)",
          "प्रकाश का विवर्तन",
          "प्रकाश का प्रकीर्णन",
          "प्रकाश का ध्रुवण"
        ],
        "correct": 0,
        "explanation": "ऑप्टिकल फाइबर पूर्ण आंतरिक परावर्तन के सिद्धांत पर कार्य करता है। जब प्रकाश किरण सघन माध्यम से विरल माध्यम में क्रांतिक कोण से अधिक कोण पर प्रवेश करती है तो वह पूर्णतः परावर्तित हो जाती है।"
      }
    },
    {
      "key": "sci_env_greenhouse_gases",
      "subtopic": "Environment & Ecology (पर्यावरण विज्ञान)",
      "score": 97,
      "tags": [
        "Greenhouse Gases",
        "Water Vapor",
        "CO2 Methane",
        "Infrared Radiation"
      ],
      "en": {
        "question": "Which of the following naturally occurring atmospheric gases is the single largest contributor to Earth's natural greenhouse effect?",
        "options": [
          "Water Vapor (H2O - जलवाष्प contributes 36% to 70%)",
          "Carbon Dioxide (CO2)",
          "Methane (CH4)",
          "Nitrous Oxide (N2O)"
        ],
        "correct": 0,
        "explanation": "Water vapor is the most abundant natural greenhouse gas, accounting for ~36-70% of the natural greenhouse warming. Among anthropogenic gases, CO2 is the primary driver."
      },
      "hi": {
        "question": "पृथ्वी के प्राकृतिक 'ग्रीनहाउस प्रभाव' (Greenhouse Effect) में सर्वाधिक योगदान देने वाली वायुमंडलीय गैस कौन सी है?",
        "options": [
          "जलवाष्प (Water Vapor - लगभग 36% से 70% योगदान)",
          "कार्बन डाइऑक्साइड (CO2)",
          "मीथेन (CH4)",
          "नाइट्रस ऑक्साइड (N2O)"
        ],
        "correct": 0,
        "explanation": "जलवाष्प पृथ्वी के वायुमंडल में सबसे प्रमुख प्राकृतिक ग्रीनहाउस गैस है जो सर्वाधिक अवरक्त विकिरण सोखती है। मानवजनित गैसों में कार्बन डाइऑक्साइड का योगदान सर्वाधिक है।"
      }
    }
  ],
  "reasoning_mental": [
    {
      "key": "reasoning_series_prime_diff",
      "subtopic": "Mental Ability (तार्किक क्षमता)",
      "score": 95,
      "tags": [
        "Number Series",
        "Prime Differences",
        "Mental Ability"
      ],
      "en": {
        "question": "Find the next number in the given series: 2, 4, 7, 12, 19, 30, ?",
        "options": [
          "43 (difference between consecutive terms follows consecutive prime numbers: +2, +3, +5, +7, +11, +13)",
          "41",
          "45",
          "39"
        ],
        "correct": 0,
        "explanation": "The differences between consecutive terms are consecutive prime numbers: 4-2=2, 7-4=3, 12-7=5, 19-12=7, 30-19=11. The next difference is 13; 30 + 13 = 43."
      },
      "hi": {
        "question": "दी गई संख्या श्रृंखला में अगला पद ज्ञात कीजिए: 2, 4, 7, 12, 19, 30, ?",
        "options": [
          "43 (क्रमागत पदों का अंतर अभाज्य संख्याएं हैं: +2, +3, +5, +7, +11, +13)",
          "41",
          "45",
          "39"
        ],
        "correct": 0,
        "explanation": "पदों के बीच का अंतर क्रमशः 2, 3, 5, 7, 11 (अभाज्य संख्याएं) है। अगला अंतर 13 होगा: 30 + 13 = 43।"
      }
    },
    {
      "key": "reasoning_series_square_inc",
      "subtopic": "Mental Ability (तार्किक क्षमता)",
      "score": 94,
      "tags": [
        "Number Series",
        "Square Progression"
      ],
      "en": {
        "question": "Find the missing number in the following series: 3, 10, 29, 66, 127, ?",
        "options": [
          "218 (Formula: n^3 + 2, where n = 1, 2, 3, 4, 5, 6 -> 6^3 + 2 = 216 + 2 = 218)",
          "216",
          "220",
          "214"
        ],
        "correct": 0,
        "explanation": "The pattern is n^3 + 2: 1^3+2=3, 2^3+2=10, 3^3+2=29, 4^3+2=66, 5^3+2=127. For n=6: 6^3 + 2 = 216 + 2 = 218."
      },
      "hi": {
        "question": "निम्नलिखित संख्या श्रृंखला में अगला पद क्या होगा: 3, 10, 29, 66, 127, ?",
        "options": [
          "218 (पैटर्न: n^3 + 2, जहाँ n = 1, 2, 3, 4, 5, 6; 6^3 + 2 = 216 + 2 = 218)",
          "216",
          "220",
          "214"
        ],
        "correct": 0,
        "explanation": "श्रृंखला का सूत्र n^3 + 2 है। अतः अगला पद 6^3 + 2 = 216 + 2 = 218 होगा।"
      }
    },
    {
      "key": "reasoning_clock_angle_formula",
      "subtopic": "Basic Numeracy (घड़ी एवं समय)",
      "score": 96,
      "tags": [
        "Clock Angle",
        "Geometry",
        "Formula"
      ],
      "en": {
        "question": "What is the acute angle formed between the hour hand and minute hand of a clock at 3:40?",
        "options": [
          "130 degrees (Angle = |30*H - 5.5*M| = |30(3) - 5.5(40)| = |90 - 220| = 130°)",
          "120 degrees",
          "140 degrees",
          "125 degrees"
        ],
        "correct": 0,
        "explanation": "Using the standard clock angle formula: theta = |30H - (11/2)M| = |30(3) - 5.5(40)| = |90 - 220| = 130 degrees."
      },
      "hi": {
        "question": "किसी घड़ी में 3 बजकर 40 मिनट (3:40) पर घंटे और मिनट की सुइयों के बीच कितने अंश का न्यून कोण बनेगा?",
        "options": [
          "130 डिग्री (सूत्र: कोण = |30*H - 5.5*M| = |30(3) - 5.5(40)| = |90 - 220| = 130°)",
          "120 डिग्री",
          "140 डिग्री",
          "125 डिग्री"
        ],
        "correct": 0,
        "explanation": "घड़ी की सुइयों के बीच कोण = |30H - 5.5M|। यहाँ H=3, M=40; कोण = |90 - 220| = 130°।"
      }
    },
    {
      "key": "reasoning_direction_pythagoras",
      "subtopic": "Logical Reasoning (दिशा एवं दूरी)",
      "score": 95,
      "tags": [
        "Direction Test",
        "Pythagoras",
        "Distance"
      ],
      "en": {
        "question": "A candidate walks 12 km North, turns right and walks 9 km East. How far and in which direction is the candidate from the starting point?",
        "options": [
          "15 km North-East (Hypotenuse = sqrt(12^2 + 9^2) = sqrt(144 + 81) = sqrt(225) = 15 km)",
          "21 km North",
          "15 km South-East",
          "18 km East"
        ],
        "correct": 0,
        "explanation": "Distance = sqrt(12^2 + 9^2) = sqrt(144 + 81) = sqrt(225) = 15 km. The direction from start is North-East."
      },
      "hi": {
        "question": "एक अभ्यर्थी अपने घर से 12 किमी उत्तर दिशा में चलता है, फिर दाएं मुड़कर 9 किमी पूर्व दिशा में चलता है। वह प्रारंभिक बिंदु से कितनी दूरी पर तथा किस दिशा में है?",
        "options": [
          "15 किमी उत्तर-पूर्व (पाइथागोरस प्रमेय: कर्ण = √(12^2 + 9^2) = √(144 + 81) = 15 किमी)",
          "21 किमी उत्तर",
          "15 किमी दक्षिण-पूर्व",
          "18 किमी पूर्व"
        ],
        "correct": 0,
        "explanation": "न्यूनतम दूरी = √(12^2 + 9^2) = √225 = 15 किमी। दिशा उत्तर-पूर्व (North-East) होगी।"
      }
    },
    {
      "key": "reasoning_coding_caesar",
      "subtopic": "Coding-Decoding (कोडिंग-डिकोडिंग)",
      "score": 94,
      "tags": [
        "Coding Decoding",
        "Alphabet Shift"
      ],
      "en": {
        "question": "In a certain code language, if 'JAIPUR' is coded as 'MDLSRU' (+3 shift), how will 'RAJASTHAN' be coded in that same system?",
        "options": [
          "UDMDVVKDQ (+3 forward shift for each letter)",
          "UCMDVTKDP",
          "VDNDWVKDQ",
          "TBKBTYIBO"
        ],
        "correct": 0,
        "explanation": "Each letter is shifted forward by +3: R(+3)->U, A(+3)->D, J(+3)->M, A(+3)->D, S(+3)->V, T(+3)->W... -> UDMDVVKDQ."
      },
      "hi": {
        "question": "किसी निश्चित सांकेतिक भाषा में यदि 'JAIPUR' को 'MDLSRU' (+3 अक्षर आगे) लिखा जाता है, तो उसी सांकेतिक भाषा में 'RAJASTHAN' को क्या लिखा जाएगा?",
        "options": [
          "UDMDVVKDQ (प्रत्येक अक्षर में +3 की वृद्धि)",
          "UCMDVTKDP",
          "VDNDWVKDQ",
          "TBKBTYIBO"
        ],
        "correct": 0,
        "explanation": "नियम: प्रत्येक वर्ण में +3 का विस्थापन है: R+3=U, A+3=D, J+3=M, A+3=D, S+3=V, T+3=W, H+3=K, A+3=D, N+3=Q -> UDMDVVKDQ।"
      }
    }
  ],
  "current_affairs": [
    {
      "key": "ca_ercp_tripartite_2024",
      "subtopic": "Rajasthan Current Affairs (समसामयिकी)",
      "score": 99,
      "tags": [
        "ERCP",
        "Tripartite MoU",
        "Chambal",
        "13 Districts"
      ],
      "en": {
        "question": "On 28 January 2024, Rajasthan and Madhya Pradesh signed a historic tripartite agreement with the Union Jal Shakti Ministry for the modified PKC-ERCP link project. How many eastern districts of Rajasthan will receive assured water?",
        "options": [
          "13 Districts (Kota, Bundi, Baran, Jhalawar, Sawai Madhopur, Ajmer, Tonk, Jaipur, Dausa, Karauli, Alwar, Bharatpur, Dholpur)",
          "7 Districts",
          "10 Districts",
          "21 Districts"
        ],
        "correct": 0,
        "explanation": "The Modified Parbati-Kalisindh-Chambal (PKC) interlinked with ERCP ensures drinking water and irrigation for 13 eastern Rajasthan districts and 2.8 lakh hectares of land."
      },
      "hi": {
        "question": "28 जनवरी 2024 को राजस्थान और मध्य प्रदेश ने केंद्र सरकार के साथ संशोधित PKC-ERCP लिंक परियोजना हेतु ऐतिहासिक त्रिपक्षीय समझौते पर हस्ताक्षर किए। इससे राजस्थान के कितने पूर्वी जिलों को पेयजल व सिंचाई सुविधा मिलेगी?",
        "options": [
          "13 जिलों को (कोटा, बूंदी, बारां, झालावाड़, सवाई माधोपुर, अजमेर, टोंक, जयपुर, दौसा, करौली, अलवर, भरतपुर, धौलपुर)",
          "7 जिलों को",
          "10 जिलों को",
          "21 जिलों को"
        ],
        "correct": 0,
        "explanation": "संशोधित पार्वती-कालीसिंध-चंबल लिंक परियोजना (ERCP) से राजस्थान के 13 पूर्वी जिलों में पेयजल व 2.8 लाख हेक्टेयर सिंचाई जल आपूर्ति सुनिश्चित होगी।"
      }
    },
    {
      "key": "ca_annapurna_rasoi_subsidy",
      "subtopic": "Rajasthan Current Affairs (समसामयिकी)",
      "score": 98,
      "tags": [
        "Annapurna Rasoi",
        "Subsidy 22",
        "Food 600g"
      ],
      "en": {
        "question": "What is the state government subsidy and meal weight under the restructured 'Shri Annapurna Rasoi Yojana' in Rajasthan?",
        "options": [
          "Subsidy enhanced to ₹22 per thali, meal weight 600g, beneficiary pays ₹8",
          "Subsidy ₹25, meal 500g, beneficiary pays ₹10",
          "Subsidy ₹20, meal 450g, beneficiary pays ₹5",
          "Subsidy ₹18, meal 650g, beneficiary pays ₹12"
        ],
        "correct": 0,
        "explanation": "Government of Rajasthan increased the state subsidy from ₹17 to ₹22 per plate and enhanced food quantity to 600g while keeping the price to citizens at ₹8."
      },
      "hi": {
        "question": "राजस्थान में पुनर्गठित 'श्री अन्नपूर्णा रसोई योजना' के तहत सरकारी अनुदान एवं भोजन का वजन कितना किया गया है?",
        "options": [
          "अनुदान बढ़ाकर ₹22 प्रति थाली, वजन 600 ग्राम, लाभार्थी शुल्क ₹8 यथावत",
          "अनुदान ₹25, वजन 500 ग्राम, लाभार्थी शुल्क ₹10",
          "अनुदान ₹20, वजन 450 ग्राम, लाभार्थी शुल्क ₹5",
          "अनुदान ₹18, वजन 650 ग्राम, लाभार्थी शुल्क ₹12"
        ],
        "correct": 0,
        "explanation": "श्री अन्नपूर्णा रसोई योजना में थाली का वजन 600 ग्राम (300 ग्राम चपाती, 100 ग्राम दाल, 100 ग्राम सब्जी, 100 ग्राम चावल/खिचड़ी व अचार) किया गया तथा अनुदान ₹22 प्रति थाली किया गया।"
      }
    },
    {
      "key": "ca_sports_avani_paris_2024",
      "subtopic": "Sports & Awards (खेल एवं पुरस्कार)",
      "score": 99,
      "tags": [
        "Avani Lekhara",
        "Paris 2024",
        "Gold Medal",
        "Shooting"
      ],
      "en": {
        "question": "Avani Lekhara of Jaipur created historic milestone at Paris 2024 Paralympics by winning which medal in the Women's 10m Air Rifle Standing SH1 event?",
        "options": [
          "Gold Medal with a Paralympic record score of 249.7 points (first Indian woman with 2 Paralympic Golds)",
          "Silver Medal",
          "Bronze Medal",
          "Gold in 50m Rifle only"
        ],
        "correct": 0,
        "explanation": "Avani Lekhara became the first Indian woman athlete to win two Paralympic Gold medals (Tokyo 2020 and Paris 2024). She is a recipient of Khel Ratna and Padma Shri."
      },
      "hi": {
        "question": "पेरिस 2024 पैरालंपिक खेलों में जयपुर की निशानेबाज अवनि लेखरा ने महिलाओं की 10 मीटर एयर राइफल स्टैंडिंग SH1 स्पर्धा में कौन सा पदक जीतकर इतिहास रचा?",
        "options": [
          "249.7 अंकों के पैरालंपिक रिकॉर्ड के साथ स्वर्ण पदक (2 पैरालंपिक स्वर्ण जीतने वाली देश की पहली महिला)",
          "रजत पदक",
          "कांस्य पदक",
          "केवल 50 मीटर राइफल में स्वर्ण"
        ],
        "correct": 0,
        "explanation": "अवनि लेखरा ने पेरिस पैरालंपिक में पैरालंपिक रिकॉर्ड के साथ स्वर्ण पदक जीता। वे लगातार दो पैरालंपिक में स्वर्ण पदक जीतने वाली पहली भारतीय महिला बन गई हैं।"
      }
    },
    {
      "key": "ca_minerals_degana_lithium",
      "subtopic": "Economy & Minerals (खनिज एवं नवाचार)",
      "score": 98,
      "tags": [
        "Lithium",
        "Degana",
        "Nagaur",
        "White Gold"
      ],
      "en": {
        "question": "Geological Survey of India (GSI) discovered substantial reserves of high-grade Lithium ('White Gold' for EV batteries) at which historical site in Rajasthan?",
        "options": [
          "Degana (Nagaur - Revat hill)",
          "Zawar (Udaipur)",
          "Khetri (Jhunjhunu)",
          "Jamsar (Bikaner)"
        ],
        "correct": 0,
        "explanation": "GSI discovered high-grade Lithium reserves in the granite and pegmatite bodies of Revat hill in Degana (Nagaur), historically famous for Tungsten mining."
      },
      "hi": {
        "question": "भारतीय भूवैज्ञानिक सर्वेक्षण (GSI) ने राजस्थान के किस ऐतिहासिक खनन क्षेत्र में उच्च श्रेणी के 'लिथियम' (श्वेत स्वर्ण) के विशाल भंडारों की खोज की है?",
        "options": [
          "डेगाना (नागौर - रेवत पहाड़ी क्षेत्र)",
          "जावर (उदयपुर)",
          "खेतड़ी (झुंझुनू)",
          "जामसर (बीकानेर)"
        ],
        "correct": 0,
        "explanation": "डेगाना (नागौर) की रेवत पहाड़ी, जो पहले टंगस्टन खनन हेतु प्रसिद्ध थी, में इलेक्ट्रिक वाहनों की बैटरी निर्माण हेतु आवश्यक लिथियम के भंडार मिले हैं।"
      }
    },
    {
      "key": "ca_gitags_five_rajasthan_2023",
      "subtopic": "Culture & GI Tags (जीआई टैग)",
      "score": 98,
      "tags": [
        "GI Tags",
        "Nathdwara Pichhwai",
        "Jodhpur Bandhej",
        "Usta Art"
      ],
      "en": {
        "question": "Which of the following traditional crafts of Rajasthan were officially awarded the prestigious Geographical Indication (GI) tags in 2023-24?",
        "options": [
          "Nathdwara Pichhwai, Jodhpur Bandhej, Bikaner Usta Art, Bikaner Kashidakari, and Udaipur Koftgari",
          "Sanganeri Print only",
          "Blue Pottery only",
          "Kota Doria and Molela only"
        ],
        "correct": 0,
        "explanation": "5 handicrafts of Rajasthan received GI tags simultaneously: Nathdwara Pichhwai painting, Jodhpur Bandhej craft, Bikaner Kashidakari craft, Bikaner Usta Art craft, and Udaipur Koftgari metal craft."
      },
      "hi": {
        "question": "वर्ष 2023-24 में राजस्थान के किन पारंपरिक हस्तशिल्पों को चेन्नई स्थित जीआई रजिस्ट्री द्वारा प्रतिष्ठित भौगोलिक उपदर्शन (GI Tag) प्रदान किया गया?",
        "options": [
          "नाथद्वारा की पिछवाई, जोधपुर बंधेज, बीकानेर उस्ता कला, बीकानेर कशीदाकारी एवं उदयपुर कोफ्तगारी शिल्प",
          "केवल सांगानेरी प्रिंट",
          "केवल ब्लू पॉटरी",
          "केवल कोटा डोरिया व मोलेला मिट्टी कला"
        ],
        "correct": 0,
        "explanation": "राजस्थान के 5 नए हस्तशिल्पों (नाथद्वारा पिछवाई, जोधपुर बंधेज, बीकानेर उस्ता कला, कशीदाकारी एवं उदयपुर की कोफ्तगारी) को जीआई टैग प्रदान किया गया।"
      }
    }
  ]
};


/**
 * Procedural Reasoning Generator
 * Produces infinite mathematical & logical reasoning questions with unique seeds and unique keys
 */
export function generateProceduralReasoning(seed: number): DynamicTopicItem {
  const types = ['ap', 'gp', 'squares', 'clock', 'pythagoras', 'shift'];
  const chosenType = types[seed % types.length];

  if (chosenType === 'ap') {
    const start = (seed % 19) + 3;
    const diff = ((seed >> 2) % 7) + 3;
    const t1 = start;
    const t2 = t1 + diff;
    const t3 = t2 + diff;
    const t4 = t3 + diff;
    const ans = t4 + diff;
    const w1 = ans + diff;
    const w2 = ans - 2;
    const w3 = ans + 3;
    const key = `reasoning_ap_${start}_${diff}_${ans}`;

    return {
      key,
      subtopic: 'Number Series (संख्या श्रृंखला)',
      score: 95,
      tags: ['Arithmetic Progression', 'Mental Ability', 'Dynamic'],
      en: {
        question: `Find the next number in the following arithmetic progression series: ${t1}, ${t2}, ${t3}, ${t4}, ?`,
        options: [
          `${ans} (Common difference d = +${diff})`,
          `${w1}`,
          `${w2}`,
          `${w3}`
        ],
        correct: 0,
        explanation: `The series follows an Arithmetic Progression with first term a = ${start} and constant common difference d = +${diff}. Next term = ${t4} + ${diff} = ${ans}.`
      },
      hi: {
        question: `निम्नलिखित समानांतर श्रेणी संख्या श्रृंखला में अगला पद क्या होगा: ${t1}, ${t2}, ${t3}, ${t4}, ?`,
        options: [
          `${ans} (सार्व अंतर d = +${diff})`,
          `${w1}`,
          `${w2}`,
          `${w3}`
        ],
        correct: 0,
        explanation: `यह एक समानांतर श्रेणी है जिसका प्रथम पद a = ${start} तथा सार्व अंतर d = +${diff} है। अतः अगला पद = ${t4} + ${diff} = ${ans} होगा।`
      }
    };
  } else if (chosenType === 'gp') {
    const start = (seed % 5) + 2;
    const r = ((seed >> 1) % 3) + 2; // 2, 3, or 4
    const t1 = start;
    const t2 = t1 * r;
    const t3 = t2 * r;
    const ans = t3 * r;
    const w1 = ans + r;
    const w2 = ans - 4;
    const w3 = ans * 2;
    const key = `reasoning_gp_${start}_${r}_${ans}`;

    return {
      key,
      subtopic: 'Geometric Progression (गुणोत्तर श्रेणी)',
      score: 96,
      tags: ['Geometric Progression', 'Mental Ability', 'Dynamic'],
      en: {
        question: `Find the missing 4th term in the geometric sequence: ${t1}, ${t2}, ${t3}, ?`,
        options: [
          `${ans} (Common ratio r = *${r})`,
          `${w1}`,
          `${w2}`,
          `${w3}`
        ],
        correct: 0,
        explanation: `The sequence multiplies by common ratio r = ${r} at each step. Next term = ${t3} * ${r} = ${ans}.`
      },
      hi: {
        question: `दी गई गुणोत्तर श्रेणी में चौथा पद क्या होगा: ${t1}, ${t2}, ${t3}, ?`,
        options: [
          `${ans} (सार्व अनुपात r = *${r})`,
          `${w1}`,
          `${w2}`,
          `${w3}`
        ],
        correct: 0,
        explanation: `इस श्रेणी में प्रत्येक पद को ${r} से गुणा किया गया है। अगला पद = ${t3} * ${r} = ${ans} होगा।`
      }
    };
  } else if (chosenType === 'clock') {
    const hours = (seed % 11) + 1; // 1 to 11
    const minutes = ((seed % 10) + 1) * 5; // 5, 10, ... 50
    // Angle = |30H - 5.5M|
    const rawAngle = Math.abs(30 * hours - 5.5 * minutes);
    const acuteAngle = rawAngle > 180 ? 360 - rawAngle : rawAngle;
    const w1 = acuteAngle + 10;
    const w2 = Math.max(15, acuteAngle - 15);
    const w3 = acuteAngle + 25;
    const key = `reasoning_clock_${hours}_${minutes}_${acuteAngle}`;

    return {
      key,
      subtopic: 'Clocks & Time (घड़ी एवं कोण)',
      score: 97,
      tags: ['Clock Angle', 'Geometry', 'Dynamic'],
      en: {
        question: `What is the acute angle formed between the hour hand and minute hand of a clock at ${hours}:${String(minutes).padStart(2, '0')}?`,
        options: [
          `${acuteAngle}° (Angle = |30H - 5.5M|)`,
          `${w1}°`,
          `${w2}°`,
          `${w3}°`
        ],
        correct: 0,
        explanation: `Standard clock formula: Angle = |30 * ${hours} - 5.5 * ${minutes}| = |${30 * hours} - ${5.5 * minutes}| = ${rawAngle}°. The acute angle is ${acuteAngle}°.`
      },
      hi: {
        question: `किसी घड़ी में ${hours} बजकर ${String(minutes).padStart(2, '0')} मिनट पर दोनों सुइयों के मध्य बनने वाला न्यून कोण कितना होगा?`,
        options: [
          `${acuteAngle}° (कोण = |30H - 5.5M|)`,
          `${w1}°`,
          `${w2}°`,
          `${w3}°`
        ],
        correct: 0,
        explanation: `घड़ी की सुइयों के बीच कोण = |30H - 5.5M| = |${30 * hours} - ${5.5 * minutes}| = ${rawAngle}°। न्यून कोण ${acuteAngle}° होगा।`
      }
    };
  } else if (chosenType === 'pythagoras') {
    const triples = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
      [9, 12, 15]
    ];
    const trip = triples[seed % triples.length];
    const mult = (seed % 3) + 1;
    const a = trip[0] * mult;
    const b = trip[1] * mult;
    const c = trip[2] * mult;
    const key = `reasoning_dir_${a}_${b}_${c}`;

    return {
      key,
      subtopic: 'Direction & Distance (दिशा एवं दूरी)',
      score: 96,
      tags: ['Direction Test', 'Pythagoras', 'Dynamic'],
      en: {
        question: `A person walks ${a} km South, then turns East and walks ${b} km. What is the shortest straight-line distance from the starting point?`,
        options: [
          `${c} km (Hypotenuse = sqrt(${a}^2 + ${b}^2))`,
          `${a + b} km`,
          `${c + 2} km`,
          `${Math.abs(b - a)} km`
        ],
        correct: 0,
        explanation: `By Pythagoras theorem: Shortest Distance = sqrt(${a}^2 + ${b}^2) = sqrt(${a*a} + ${b*b}) = sqrt(${c*c}) = ${c} km South-East.`
      },
      hi: {
        question: `एक व्यक्ति ${a} किमी दक्षिण की ओर जाता है, फिर पूर्व की ओर मुड़कर ${b} किमी चलता है। प्रारंभिक बिंदु से उसकी न्यूनतम सीधी दूरी क्या है?`,
        options: [
          `${c} किमी (पाइथागोरस प्रमेय: कर्ण = √(${a}^2 + ${b}^2))`,
          `${a + b} किमी`,
          `${c + 2} किमी`,
          `${Math.abs(b - a)} किमी`
        ],
        correct: 0,
        explanation: `पाइथागोरस प्रमेय से: न्यूनतम दूरी = √(${a}^2 + ${b}^2) = √(${a*a + b*b}) = ${c} किमी दक्षिण-पूर्व होगी।`
      }
    };
  } else {
    // Difference of squares
    const n = (seed % 8) + 4; // 4 to 11
    const t1 = n * n;
    const t2 = (n + 1) * (n + 1);
    const t3 = (n + 2) * (n + 2);
    const ans = (n + 3) * (n + 3);
    const w1 = ans + 7;
    const w2 = ans - 9;
    const w3 = ans + 15;
    const key = `reasoning_squares_${n}_${ans}`;

    return {
      key,
      subtopic: 'Square Number Series (वर्ग श्रृंखला)',
      score: 95,
      tags: ['Squares', 'Mental Ability', 'Dynamic'],
      en: {
        question: `Identify the next term in the series: ${t1}, ${t2}, ${t3}, ?`,
        options: [
          `${ans} (Consecutive perfect squares: ${n}^2, ${n+1}^2, ${n+2}^2, ${n+3}^2)`,
          `${w1}`,
          `${w2}`,
          `${w3}`
        ],
        correct: 0,
        explanation: `The terms are squares of consecutive integers: ${n}^2 = ${t1}, ${n+1}^2 = ${t2}, ${n+2}^2 = ${t3}. The next term is ${n+3}^2 = ${ans}.`
      },
      hi: {
        question: `दी गई श्रृंखला में अगला पद क्या होगा: ${t1}, ${t2}, ${t3}, ?`,
        options: [
          `${ans} (क्रमागत पूर्णांकों के वर्ग: ${n}^2, ${n+1}^2, ${n+2}^2, ${n+3}^2)`,
          `${w1}`,
          `${w2}`,
          `${w3}`
        ],
        correct: 0,
        explanation: `यह क्रमागत संख्याओं के वर्गों की श्रृंखला है: ${n}^2=${t1}, ${n+1}^2=${t2}, ${n+2}^2=${t3}। अगला पद ${n+3}^2 = ${ans} होगा।`
      }
    };
  }
}

/**
 * Format a DynamicTopicItem into a full Question object with randomized option order
 */
function formatDynamicItemToQuestion(subjectId: SubjectId, item: DynamicTopicItem, seed: number): Question {
  const targetIndex = (seed + 1) % 4;
  const enOpts = [...item.en.options];
  const hiOpts = [...item.hi.options];

  const tmpEn = enOpts[0];
  const tmpHi = hiOpts[0];
  enOpts[0] = enOpts[targetIndex];
  hiOpts[0] = hiOpts[targetIndex];
  enOpts[targetIndex] = tmpEn;
  hiOpts[targetIndex] = tmpHi;

  return {
    id: `dyn_${subjectId}_${item.key}_${seed % 99999}`,
    subjectId,
    subtopic: item.subtopic,
    importance: 'HIGH_YIELD',
    importanceScore: item.score,
    conceptKey: item.key,
    question: {
      en: item.en.question,
      hi: item.hi.question
    },
    options: {
      en: enOpts,
      hi: hiOpts
    },
    correctOption: targetIndex,
    explanation: {
      en: item.en.explanation,
      hi: item.hi.explanation
    },
    tags: ['High Yield', ...item.tags]
  };
}

/**
 * Generate a dynamic question guaranteed NOT to repeat in the recent 20-40 questions
 */
export function generateDynamicQuestion(
  subjectId?: SubjectId, 
  seed: number = Date.now(),
  excludeKeys?: Set<string>
): Question {
  // 1. Procedural reasoning
  if (subjectId === 'reasoning_mental') {
    const proc = generateProceduralReasoning(seed);
    return formatDynamicItemToQuestion('reasoning_mental', proc, seed);
  }

  // 2. Dynamic live current affairs
  if (subjectId === 'current_affairs') {
    return getLiveCurrentAffairsQuestion(seed, excludeKeys);
  }

  const allSubjects = Object.keys(HIGH_YIELD_TOPICS) as SubjectId[];

  // If no subjectId specified, pick a subject with unseen topics
  let targetSubject: SubjectId = subjectId || 'raj_history_art';
  if (!subjectId) {
    const recentSignatures = getRecentSignatures();
    const recent20 = new Set(recentSignatures.slice(0, 20));
    const scored = allSubjects.map((s: SubjectId) => {
      const sItems = HIGH_YIELD_TOPICS[s] || [];
      const unseens = sItems.filter((it: DynamicTopicItem) => (!excludeKeys || !excludeKeys.has(it.key)) && !recent20.has(it.key));
      return { subj: s, count: unseens.length };
    });
    scored.sort((a, b) => b.count - a.count);
    targetSubject = scored[seed % Math.min(4, scored.length)].subj;
  }

  const items: DynamicTopicItem[] = HIGH_YIELD_TOPICS[targetSubject] || HIGH_YIELD_TOPICS.raj_history_art;
  const recentSignatures = getRecentSignatures();
  const recent20Set = new Set(recentSignatures.slice(0, 20));
  const recent30Set = new Set(recentSignatures.slice(0, 30));

  // Tier 1: unseen in this session AND not in last 30 questions
  let candidates: DynamicTopicItem[] = items.filter((it: DynamicTopicItem) => {
    if (excludeKeys && excludeKeys.has(it.key)) return false;
    if (recent30Set.has(it.key)) return false;
    return true;
  });

  // Tier 2: unseen in this session AND not in last 20 questions
  if (candidates.length === 0) {
    candidates = items.filter((it: DynamicTopicItem) => {
      if (excludeKeys && excludeKeys.has(it.key)) return false;
      if (recent20Set.has(it.key)) return false;
      return true;
    });
  }

  // Tier 3: unseen in this session
  if (candidates.length === 0 && excludeKeys) {
    candidates = items.filter((it: DynamicTopicItem) => !excludeKeys.has(it.key));
  }

  // Tier 4: all items in subject seen in this session (e.g. 50-question practice mode on single subject):
  // Pick items answered LONGEST AGO (furthest back in recentSignatures, NOT in last 20)
  if (candidates.length === 0) {
    const eligible: DynamicTopicItem[] = items.filter((it: DynamicTopicItem) => !recent20Set.has(it.key));
    if (eligible.length > 0) {
      eligible.sort((a: DynamicTopicItem, b: DynamicTopicItem) => {
        const idxA = recentSignatures.indexOf(a.key);
        const idxB = recentSignatures.indexOf(b.key);
        const posA = idxA === -1 ? 9999 : idxA;
        const posB = idxB === -1 ? 9999 : idxB;
        return posB - posA; // furthest back first
      });
      candidates = eligible;
    }
  }

  // Tier 5: Fallback if all items are in last 20 (procedural variant)
  if (candidates.length === 0) {
    const base = items[seed % items.length];
    const uniqueKey = `${base.key}_var_${seed % 100000}`;
    const chosen: DynamicTopicItem = { ...base, key: uniqueKey };
    return formatDynamicItemToQuestion(targetSubject, chosen, seed);
  }

  const chosen = candidates[seed % Math.min(candidates.length, 5)];
  return formatDynamicItemToQuestion(targetSubject, chosen, seed);
}

export function generateQuestionSet(count: number, subjectId?: SubjectId): Question[] {
  const list: Question[] = [];
  const seenInSet = new Set<string>();

  for (let i = 0; i < count; i++) {
    const q = generateDynamicQuestion(subjectId, Date.now() + i * 83, seenInSet);
    seenInSet.add(q.conceptKey);
    seenInSet.add(q.id);
    list.push(q);
  }
  return list;
}
