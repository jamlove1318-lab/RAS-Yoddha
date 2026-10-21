import { SubjectId, SubjectInfo } from '../types';

export const SUBJECT_METADATA: Record<SubjectId, SubjectInfo> = {
  raj_history_art: {
    id: 'raj_history_art',
    nameEn: 'Rajasthan History, Art & Culture',
    nameHi: 'राजस्थान का इतिहास, कला एवं संस्कृति',
    icon: 'Landmark',
    weightage: '22-26 Questions (~30-35 Marks)',
    color: 'from-amber-600 to-orange-700',
    description: 'Major dynasties, Forts, Palaces, Temples, Folk Deities (Lokdevtas), Prajamandal movements, 1857 Revolt in Rajasthan, Folk dances & musical instruments.',
    subtopics: [
      'Major Historical Dynasties & Rulers',
      'Freedom Movement & Prajamandal Movements',
      'Integration of Rajasthan (राजस्थान का एकीकरण)',
      'Folk Deities & Saints (लोकदेवता एवं संत)',
      'Forts, Palaces & Architecture (दुर्ग एवं स्थापत्य)',
      'Folk Dances, Drama & Music (लोक नृत्य एवं संगीत)',
      'Fairs, Festivals & Customs (मेले एवं त्यौहार)',
      'Rajasthani Literature & Dialects (राजस्थानी साहित्य व बोलियाँ)'
    ]
  },
  raj_geography: {
    id: 'raj_geography',
    nameEn: 'Geography of Rajasthan',
    nameHi: 'राजस्थान का भूगोल',
    icon: 'Mountain',
    weightage: '16-20 Questions (~22-27 Marks)',
    color: 'from-emerald-600 to-teal-700',
    description: 'Physiographic divisions, Climate, River drainage systems, Lakes, Minerals, Wildlife Sanctuaries, Soils, and Population Census.',
    subtopics: [
      'Physiographic Divisions (भौतिक प्रदेश - Aravalli, Thar, Plains, Hadoti)',
      'Drainage Systems & Lakes (अपवाह तंत्र एवं झीलें)',
      'Climate & Weather Patterns (जलवायु)',
      'Soils & Natural Vegetation (मृदा एवं वनस्पति)',
      'Major Irrigation Projects & ERCP (सिंचाई परियोजनाएं व ERCP)',
      'Mines & Minerals (खनिज संसाधन)',
      'Demographics & 2011 Census (जनगणना 2011)',
      'National Parks, Wildlife Sanctuaries & Ramsar Sites'
    ]
  },
  raj_polity_admin: {
    id: 'raj_polity_admin',
    nameEn: 'Rajasthan Polity & Administration',
    nameHi: 'राजस्थान की राजनीतिक एवं प्रशासनिक व्यवस्था',
    icon: 'Shield',
    weightage: '10-14 Questions (~13-18 Marks)',
    color: 'from-blue-600 to-indigo-700',
    description: 'Governor, Chief Minister, State Assembly, High Court, RPSC, State Election Commission, Human Rights Commission, Lokayukta, Panchayati Raj.',
    subtopics: [
      'Governor & Chief Minister powers & tenures',
      'State Legislative Assembly (विधानसभा)',
      'Rajasthan High Court & Subordinate Judiciary',
      'RPSC, State Election Commission & Lokayukta',
      'State Human Rights Commission (SHRC) & Information Commission',
      'Panchayati Raj & 73rd/74th Constitutional Amendments',
      'District Administration & Chief Secretary'
    ]
  },
  raj_economy: {
    id: 'raj_economy',
    nameEn: 'Economy of Rajasthan & Economic Survey',
    nameHi: 'राजस्थान की अर्थव्यवस्था एवं आर्थिक समीक्षा',
    icon: 'TrendingUp',
    weightage: '12-16 Questions (~16-21 Marks)',
    color: 'from-purple-600 to-violet-800',
    description: 'Rajasthan Economic Survey data, Budget announcements, Key welfare flagship schemes, Agriculture sector growth, Industrial corridors (DMIC).',
    subtopics: [
      'Macro Indicators of Rajasthan (GSDP, Per Capita Income)',
      'Agriculture & Allied Sector in Rajasthan',
      'Industrial Sector, RIICO, DMIC & Solar Energy',
      'Service Sector, Tourism Policy & Infrastructure',
      'Flagship Welfare Schemes (जनकल्याणकारी योजनाएं)'
    ]
  },
  indian_history: {
    id: 'indian_history',
    nameEn: 'Indian History (Ancient, Medieval, Modern)',
    nameHi: 'भारत का इतिहास',
    icon: 'BookOpen',
    weightage: '10-12 Questions (~13-16 Marks)',
    color: 'from-rose-600 to-pink-700',
    description: 'Indus Valley, Vedic Age, Buddhism/Jainism, Mauryan/Gupta Art, Delhi Sultanate, Mughals, Indian National Movement & Congress sessions.',
    subtopics: [
      'Ancient India: IVC, Buddhism, Jainism, Mauryas, Guptas',
      'Medieval India: Art, Architecture, Bhakti & Sufi movement',
      'Modern India: 1857 Revolt, Socio-religious reforms',
      'Freedom Struggle & Gandhian Era (1915-1947)'
    ]
  },
  indian_polity: {
    id: 'indian_polity',
    nameEn: 'Indian Constitution & Governance',
    nameHi: 'भारतीय संविधान एवं राजनीतिक व्यवस्था',
    icon: 'Award',
    weightage: '12-15 Questions (~16-20 Marks)',
    color: 'from-cyan-600 to-blue-800',
    description: 'Preamble, Fundamental Rights, DPSP, President, Supreme Court, Parliament, Federalism, Constitutional Amendments, Election Commission.',
    subtopics: [
      'Preamble, Fundamental Rights & DPSP',
      'Union Executive: President, PM & Council of Ministers',
      'Parliament: Lok Sabha, Rajya Sabha & Lawmaking',
      'Judiciary: Supreme Court of India & Judicial Review',
      'Constitutional Amendments & Major Judgments'
    ]
  },
  indian_world_geo: {
    id: 'indian_world_geo',
    nameEn: 'Geography: India & World',
    nameHi: 'भारत एवं विश्व का भूगोल',
    icon: 'Globe',
    weightage: '8-10 Questions (~10-13 Marks)',
    color: 'from-teal-600 to-emerald-800',
    description: 'Continents, Oceans, Mountain ranges, Indian Rivers, Monsoon mechanism, Major industrial regions, Minerals of India.',
    subtopics: [
      'World: Prominent Mountain Peaks, Plateaus, Oceans, Straits',
      'India: Major Physiographic Divisions, Himalayas & Peninsular Plateau',
      'India: Drainage System (Ganga, Brahmaputra, Peninsular rivers)',
      'Monsoon, Forests & Agriculture in India'
    ]
  },
  indian_economy: {
    id: 'indian_economy',
    nameEn: 'Indian Economy & Concepts',
    nameHi: 'भारतीय अर्थव्यवस्था',
    icon: 'Coins',
    weightage: '6-8 Questions (~8-10 Marks)',
    color: 'from-yellow-600 to-amber-800',
    description: 'Basic macroeconomic concepts, Inflation, Fiscal & Monetary policy, National income, NITI Aayog, GST, Subsidies & Banking reforms.',
    subtopics: [
      'National Income & GDP Concepts',
      'Monetary Policy, RBI & Inflation Management',
      'Fiscal Policy, Union Budget & Taxation (GST)',
      'Subsidies, Public Distribution System & Poverty alleviation'
    ]
  },
  science_tech: {
    id: 'science_tech',
    nameEn: 'General Science & Technology',
    nameHi: 'सामान्य विज्ञान एवं प्रौद्योगिकी',
    icon: 'Atom',
    weightage: '18-22 Questions (~24-29 Marks)',
    color: 'from-fuchsia-600 to-purple-800',
    description: 'ISRO space missions, Defence technology, Biotechnology, Human health & diseases, Genetics, IT & AI, Everyday physics and chemistry.',
    subtopics: [
      'Space Technology & ISRO Missions (Chandrayaan, Gaganyaan, Aditya-L1)',
      'Defence Technology (Missile systems, Submarines, DRDO)',
      'Biotechnology, Genetic Engineering & Vaccines',
      'Human Physiology, Nutrition & Diseases',
      'Nanotechnology, AI, Supercomputers & Cyber Security',
      'Environmental Ecology, Biodiversity & Climate Change'
    ]
  },
  reasoning_mental: {
    id: 'reasoning_mental',
    nameEn: 'Reasoning & Mental Ability',
    nameHi: 'तार्किक दक्षता एवं मानसिक योग्यता',
    icon: 'BrainCircuit',
    weightage: '18-20 Questions (~24-27 Marks)',
    color: 'from-slate-700 to-slate-900',
    description: 'Logical reasoning, Syllogisms, Series, Blood relations, Coding, Direction, Data Interpretation (Pie/Bar charts), Basic arithmetic.',
    subtopics: [
      'Statement & Assumptions / Arguments / Conclusions',
      'Coding-Decoding, Series & Blood Relations',
      'Direction Sense & Seating Arrangement',
      'Data Interpretation (Tables, Bar Charts, Pie Charts)',
      'Percentages, Ratio & Proportion, Averages'
    ]
  },
  current_affairs: {
    id: 'current_affairs',
    nameEn: 'Current Affairs (Rajasthan, India & Global)',
    nameHi: 'समसामयिक घटनाएं (राजस्थान, भारत व विश्व)',
    icon: 'Flame',
    weightage: '18-22 Questions (~24-29 Marks)',
    color: 'from-red-600 to-orange-700',
    description: 'Recent Rajasthan government initiatives, awards, sports personalities, summits, indices, appointments, military exercises.',
    subtopics: [
      'Rajasthan Current Affairs & Schemes',
      'National & International Summits, Treaties & Reports',
      'Sports Personalities, National Games & Olympic medals',
      'Awards, Honors, Appointments & Obits'
    ]
  }
};

export interface PastYearExamTrend {
  year: number;
  totalQuestions: number;
  maxMarks: number;
  cutoffGeneralMale: number;
  cutoffOBC: number;
  cutoffSC: number;
  cutoffST: number;
  difficultyRating: 'Moderate' | 'Moderate-Tough' | 'Tough';
  keyTakeaways: string[];
  subjectDistribution: Record<SubjectId, number>;
}

export const PAST_YEAR_TRENDS: PastYearExamTrend[] = [
  {
    year: 2023,
    totalQuestions: 150,
    maxMarks: 200,
    cutoffGeneralMale: 100.69,
    cutoffOBC: 100.69,
    cutoffSC: 91.49,
    cutoffST: 94.25,
    difficultyRating: 'Moderate-Tough',
    keyTakeaways: [
      'Introduction of the mandatory 5th option (Anukta Prashna / अनुत्तरित प्रश्न). 1/3 negative marking for leaving all 5 blank.',
      'Rajasthan GK (History, Art, Geo, Polity, Economy) dominated with over 65 questions.',
      'Economic Survey of Rajasthan questions were exact direct figures from macro tables.',
      'Science & Tech focused heavily on current ISRO missions (Aditya-L1, Chandrayaan-3) and diseases.'
    ],
    subjectDistribution: {
      raj_history_art: 24,
      raj_geography: 18,
      raj_polity_admin: 13,
      raj_economy: 15,
      indian_history: 10,
      indian_polity: 13,
      indian_world_geo: 9,
      indian_economy: 7,
      science_tech: 20,
      reasoning_mental: 20,
      current_affairs: 21
    }
  },
  {
    year: 2021,
    totalQuestions: 150,
    maxMarks: 200,
    cutoffGeneralMale: 84.72,
    cutoffOBC: 84.72,
    cutoffSC: 72.69,
    cutoffST: 76.85,
    difficultyRating: 'Moderate',
    keyTakeaways: [
      'Rajasthan Art and Architecture had deep sub-questions on minor temple styles (Maha-Maru) and folklore.',
      'Polity focused heavily on Rajasthan State Commission articles and constitutional benches.',
      'Mental ability section was scoring and high yield for qualifying the cutoff.'
    ],
    subjectDistribution: {
      raj_history_art: 25,
      raj_geography: 17,
      raj_polity_admin: 12,
      raj_economy: 14,
      indian_history: 11,
      indian_polity: 14,
      indian_world_geo: 8,
      indian_economy: 6,
      science_tech: 19,
      reasoning_mental: 20,
      current_affairs: 20
    }
  },
  {
    year: 2018,
    totalQuestions: 150,
    maxMarks: 200,
    cutoffGeneralMale: 76.06,
    cutoffOBC: 99.33, // OBC cutoff was initially higher before parity ruling
    cutoffSC: 68.01,
    cutoffST: 73.38,
    difficultyRating: 'Tough',
    keyTakeaways: [
      'High difficulty in World Geography and Indian Polity multi-statement matching questions.',
      'Rajasthan Prajamandal and 1857 leaders from small thikanas were specifically tested.',
      'Candidates who scored 80+ in Rajasthan GK comfortably cleared the prelims stage.'
    ],
    subjectDistribution: {
      raj_history_art: 23,
      raj_geography: 19,
      raj_polity_admin: 11,
      raj_economy: 13,
      indian_history: 12,
      indian_polity: 12,
      indian_world_geo: 10,
      indian_economy: 7,
      science_tech: 18,
      reasoning_mental: 20,
      current_affairs: 19
    }
  }
];

export const HIGH_YIELD_CONCEPTS_INDEX = [
  { concept: 'Rajasthan Prajamandal Founders & Years', frequency: 'Every Exam (100% chance)', weight: 98 },
  { concept: 'UNESCO World Heritage Hill Forts of Rajasthan (6 Forts)', frequency: 'Every 1-2 years', weight: 95 },
  { concept: 'Panchpir & Lokdevtas of Rajasthan (Pabu, Ramdev, Goga, Harbu, Mehaji)', frequency: 'Every Exam (100% chance)', weight: 97 },
  { concept: 'Aravalli Peaks in Descending Order (Guru Shikhar, Ser, Dilwara, Jarga)', frequency: 'Very Frequent', weight: 94 },
  { concept: 'Rajasthan Economic Survey: Growth rate, Per capita income, Sectoral shares', frequency: '6-8 Questions Guaranteed', weight: 99 },
  { concept: 'Rajasthan Chief Secretaries, Governors & Special Ordinances', frequency: 'Frequent deep questions', weight: 91 },
  { concept: 'River Systems: Luni, Chambal, Banas & Tributaries (Left/Right bank)', frequency: 'Every Exam', weight: 96 },
  { concept: 'ISRO space missions, payload names & launch vehicles (PSLV/GSLV/LVM3)', frequency: 'Every Exam (3-4 Qs)', weight: 96 },
  { concept: 'Fundamental Rights, Writs & DPSP Articles (39A, 40, 44, 45, 50)', frequency: 'Guaranteed 2-3 Qs', weight: 95 },
  { concept: 'Rajasthan 1857 Revolt Cantons (Naseerabad, Neemuch, Erinpura, etc.)', frequency: 'Every Exam', weight: 93 }
];
