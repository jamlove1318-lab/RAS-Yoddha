import { Question, SRSItem, SubjectId } from '../types';

const SRS_STORAGE_KEY = 'ras_srs_data_v3';
const MISTAKES_STORAGE_KEY = 'ras_mistakes_v3';
const SOLVED_HISTORY_KEY = 'ras_solved_history_v3';
const RECENT_SIGNATURES_KEY = 'ras_recent_signatures_v3';
const GLOBAL_COUNTER_KEY = 'ras_global_counter_v3';

// Leitner intervals in milliseconds
const INTERVALS_MS = [
  0,
  12 * 60 * 60 * 1000,      // Box 1: 12 hours
  24 * 60 * 60 * 1000,      // Box 2: 1 day
  3 * 24 * 60 * 60 * 1000,  // Box 3: 3 days
  7 * 24 * 60 * 60 * 1000,  // Box 4: 7 days
  14 * 24 * 60 * 60 * 1000  // Box 5: 14 days
];

export interface SolvedRecord {
  questionId: string;
  conceptKey: string;
  subjectId: SubjectId;
  attempts: number;
  correctCount: number;
  lastAttemptAt: number;
  lastWasCorrect: boolean;
  isHighYield: boolean;
  importanceScore: number;
  minSolvedCounterDue: number; // Question can only repeat after this global counter
}

export function getGlobalSolvedCounter(): number {
  try {
    const raw = localStorage.getItem(GLOBAL_COUNTER_KEY);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

export function incrementGlobalSolvedCounter(): number {
  try {
    const next = getGlobalSolvedCounter() + 1;
    localStorage.setItem(GLOBAL_COUNTER_KEY, next.toString());
    return next;
  } catch {
    return 1;
  }
}

/**
 * Ring buffer of the last 40 answered question signatures/conceptKeys
 */
export function getRecentSignatures(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_SIGNATURES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function pushRecentSignature(signature: string): void {
  try {
    const current = getRecentSignatures();
    const updated = [signature, ...current.filter(s => s !== signature)].slice(0, 40);
    localStorage.setItem(RECENT_SIGNATURES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to push recent signature', e);
  }
}

export function isSignatureRecentlySeen(signature: string, maxLookback: number = 30): boolean {
  const recent = getRecentSignatures();
  const index = recent.indexOf(signature);
  if (index === -1) return false;
  return index < maxLookback;
}

export function getSolvedHistory(): Record<string, SolvedRecord> {
  try {
    const raw = localStorage.getItem(SOLVED_HISTORY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSolvedHistory(history: Record<string, SolvedRecord>): void {
  try {
    localStorage.setItem(SOLVED_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save solved history', e);
  }
}

export function getSRSItems(): Record<string, SRSItem> {
  try {
    const raw = localStorage.getItem(SRS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSRSItems(items: Record<string, SRSItem>): void {
  try {
    localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save SRS items', e);
  }
}

/**
 * Record user response for spaced repetition and mastery tracking.
 * STRICT REPETITION RULES:
 * 1. Standard Questions (<90 importance):
 *    - Once solved correctly, marked permanently mastered and NEVER repeated.
 * 2. High-Importance Questions (>=90 importance):
 *    - MUST NOT revise immediately!
 *    - Can only revise after at least 20 to 40 MORE questions have been answered.
 * 3. Recent 40 Buffer:
 *    - The question's signature is added to a 40-item FIFO buffer.
 *    - While inside the buffer (last 20-40 questions), it is strictly blocked.
 */
export function recordAnswerInSRS(question: Question, isCorrect: boolean): void {
  const isHighYield = question.importance === 'HIGH_YIELD' || question.importanceScore >= 90;
  const now = Date.now();
  const currentGlobalCounter = incrementGlobalSolvedCounter();

  // Signature based on conceptKey or question ID
  const signature = question.conceptKey || question.id;
  pushRecentSignature(signature);

  // 1. Update Solved History
  const history = getSolvedHistory();
  const existingRecord: SolvedRecord = history[question.id] || {
    questionId: question.id,
    conceptKey: signature,
    subjectId: question.subjectId,
    attempts: 0,
    correctCount: 0,
    lastAttemptAt: 0,
    lastWasCorrect: false,
    isHighYield,
    importanceScore: question.importanceScore,
    minSolvedCounterDue: 0
  };

  existingRecord.attempts += 1;
  existingRecord.lastAttemptAt = now;
  existingRecord.lastWasCorrect = isCorrect;
  if (isCorrect) {
    existingRecord.correctCount += 1;
  }

  // Set minimum question delay: must solve 20 to 40 MORE questions before this can appear again!
  const delay = Math.floor(Math.random() * 21) + 20; // 20 to 40 questions gap
  existingRecord.minSolvedCounterDue = currentGlobalCounter + delay;

  history[question.id] = existingRecord;
  saveSolvedHistory(history);

  // 2. Standard questions answered correctly are locked out permanently
  if (!isHighYield && isCorrect) {
    clearMistake(question.id);
    return;
  }

  // 3. For High-Yield or wrong answers: update Leitner Spaced Repetition
  const srsItems = getSRSItems();
  const existingSRS = srsItems[question.id] || {
    questionId: question.id,
    box: 1,
    nextReviewDate: now,
    lastReviewedDate: 0,
    consecutiveCorrect: 0,
    totalAttempts: 0,
    history: [],
    isHighYieldOnly: isHighYield
  };

  existingSRS.totalAttempts += 1;
  existingSRS.lastReviewedDate = now;
  existingSRS.history.push({ date: now, isCorrect });

  if (isCorrect) {
    existingSRS.consecutiveCorrect += 1;
    existingSRS.box = Math.min(5, existingSRS.box + 1);
  } else {
    existingSRS.consecutiveCorrect = 0;
    existingSRS.box = 1;
  }

  // Interval based on Leitner box
  const interval = INTERVALS_MS[existingSRS.box] || INTERVALS_MS[1];
  existingSRS.nextReviewDate = now + interval;

  srsItems[question.id] = existingSRS;
  saveSRSItems(srsItems);

  // 4. Mistake Notebook
  if (!isCorrect) {
    recordMistake(question.id);
  } else {
    clearMistake(question.id);
  }
}

/**
 * Check whether a question is eligible to appear in practice.
 * Enforces:
 * - Minimum 20-40 questions gap before high-importance questions repeat
 * - Never repeats standard questions answered correctly
 * - Blocks questions in the recent 30-40 answered buffer
 */
export function isQuestionEligibleForPractice(
  questionId: string, 
  importanceScore: number, 
  conceptKey?: string
): boolean {
  const signature = conceptKey || questionId;

  // 1. If question was seen in the last 20 to 40 questions, DO NOT SHOW!
  if (isSignatureRecentlySeen(signature, 30)) {
    return false;
  }

  const history = getSolvedHistory();
  const record = history[questionId];

  // If candidate has never attempted this question, it is eligible
  if (!record || record.attempts === 0) {
    return true;
  }

  // If candidate got it wrong last time, it can appear ONLY if not in recent 20
  if (!record.lastWasCorrect) {
    return !isSignatureRecentlySeen(signature, 20);
  }

  const isHighYield = record.isHighYield || importanceScore >= 90;

  // If standard question answered correctly -> NEVER repeat!
  if (!isHighYield) {
    return false;
  }

  // For High-Importance:
  // Must satisfy BOTH:
  // 1) Global question counter gap (at least 20-40 questions solved since last attempt)
  const currentCounter = getGlobalSolvedCounter();
  if (currentCounter < record.minSolvedCounterDue) {
    return false; // Still waiting for 20-40 questions to pass
  }

  // 2) Leitner SRS time interval
  const srsItems = getSRSItems();
  const srs = srsItems[questionId];
  if (!srs) {
    return true;
  }

  // Mastered high yield question (Box 5 with 3+ consecutive correct) - keep out of daily drill
  if (srs.consecutiveCorrect >= 3 && srs.box >= 5) {
    return false;
  }

  return srs.nextReviewDate <= Date.now();
}

export function recordMistake(questionId: string): void {
  try {
    const raw = localStorage.getItem(MISTAKES_STORAGE_KEY);
    const mistakes: string[] = raw ? JSON.parse(raw) : [];
    if (!mistakes.includes(questionId)) {
      mistakes.unshift(questionId);
      localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(mistakes.slice(0, 200)));
    }
  } catch (e) {
    console.error('Failed to record mistake', e);
  }
}

export function getMistakeQuestionIds(): string[] {
  try {
    const raw = localStorage.getItem(MISTAKES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearMistake(questionId: string): void {
  try {
    const raw = localStorage.getItem(MISTAKES_STORAGE_KEY);
    if (!raw) return;
    const mistakes: string[] = JSON.parse(raw);
    const filtered = mistakes.filter(id => id !== questionId);
    localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to clear mistake', e);
  }
}

export interface UserLiveStats {
  totalSolved: number;
  correctCount: number;
  incorrectCount: number;
  accuracyRate: number;
  highYieldMastered: number;
  srsDueCount: number;
  mistakesCount: number;
  subjectPerformance: Record<SubjectId, { solved: number; correct: number; accuracy: number }>;
}

export function getUserLiveStats(): UserLiveStats {
  const history = getSolvedHistory();
  const srsItems = getSRSItems();
  const mistakes = getMistakeQuestionIds();
  const now = Date.now();

  let totalSolved = 0;
  let correctCount = 0;
  let highYieldMastered = 0;

  const subjectPerformance: any = {};

  Object.values(history).forEach((rec) => {
    totalSolved += rec.attempts;
    correctCount += rec.correctCount;

    if (!subjectPerformance[rec.subjectId]) {
      subjectPerformance[rec.subjectId] = { solved: 0, correct: 0, accuracy: 0 };
    }
    subjectPerformance[rec.subjectId].solved += rec.attempts;
    subjectPerformance[rec.subjectId].correct += rec.correctCount;
  });

  Object.keys(subjectPerformance).forEach((subj) => {
    const s = subjectPerformance[subj];
    s.accuracy = s.solved > 0 ? Math.round((s.correct / s.solved) * 100) : 0;
  });

  Object.values(srsItems).forEach((item) => {
    if (item.consecutiveCorrect >= 3 || item.box >= 4) {
      highYieldMastered += 1;
    }
  });

  let srsDueCount = 0;
  Object.values(srsItems).forEach((item) => {
    if (item.nextReviewDate <= now && item.consecutiveCorrect < 3) {
      srsDueCount += 1;
    }
  });

  const incorrectCount = Math.max(0, totalSolved - correctCount);
  const accuracyRate = totalSolved > 0 ? Math.round((correctCount / totalSolved) * 100) : 0;

  return {
    totalSolved,
    correctCount,
    incorrectCount,
    accuracyRate,
    highYieldMastered,
    srsDueCount,
    mistakesCount: mistakes.length,
    subjectPerformance
  };
}
