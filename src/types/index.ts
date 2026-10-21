export type SubjectId = 
  | 'raj_history_art'
  | 'raj_geography'
  | 'raj_polity_admin'
  | 'raj_economy'
  | 'indian_history'
  | 'indian_polity'
  | 'indian_world_geo'
  | 'indian_economy'
  | 'science_tech'
  | 'reasoning_mental'
  | 'current_affairs';

export interface SubjectInfo {
  id: SubjectId;
  nameEn: string;
  nameHi: string;
  icon: string;
  weightage: string; // e.g. "20-25 Qs"
  color: string;
  description: string;
  subtopics: string[];
}

export type ImportanceLevel = 'HIGH_YIELD' | 'MEDIUM' | 'STANDARD';

export interface Question {
  id: string;
  subjectId: SubjectId;
  subtopic: string;
  year?: number; // e.g. 2023, 2021, 2018, 2016, 2013
  paperName?: string;
  importance: ImportanceLevel;
  importanceScore: number; // 1 - 100
  question: {
    en: string;
    hi: string;
  };
  options: {
    en: string[];
    hi: string[];
  };
  correctOption: number; // 0-indexed (0 to 3)
  explanation: {
    en: string;
    hi: string;
  };
  tags: string[];
  conceptKey: string;
  frequencyNote?: string;
}

export interface UserAnswerRecord {
  questionId: string;
  selectedOption: number | null; // 0-3, or 4 for 5th option, or null for skipped
  isCorrect: boolean;
  timeSpentSeconds: number;
  markedForReview?: boolean;
}

export interface ExamAttempt {
  id: string;
  date: string;
  mode: 'full' | 'mini' | 'subject' | 'pyq';
  title: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  rawScore: number;
  negativeMarks: number;
  netScore: number;
  maxScore: number;
  timeTakenSeconds: number;
  answers: Record<string, UserAnswerRecord>;
  subjectBreakdown: Record<SubjectId, { total: number; correct: number; incorrect: number; netScore: number }>;
}

export interface SRSItem {
  questionId: string;
  box: number; // 1, 2, 3, 4, 5 (Leitner box)
  nextReviewDate: number; // timestamp
  lastReviewedDate: number;
  consecutiveCorrect: number;
  totalAttempts: number;
  history: { date: number; isCorrect: boolean }[];
  isHighYieldOnly: boolean;
}

export interface GamePlayerProfile {
  xp: number;
  level: number;
  rankTitle: string;
  coins: number;
  streakDays: number;
  conqueredDistricts: string[]; // district IDs
  highestBlitzScore: number;
  bossDefeatedCount: number;
}
