import { Question, SRSItem, SubjectId } from '../types';

const SRS_STORAGE_KEY = 'ras_srs_data_v2';
const MISTAKES_STORAGE_KEY = 'ras_mistakes_v2';
const SOLVED_HISTORY_KEY = 'ras_solved_history_v2';

// Leitner intervals in milliseconds
// Box 1: 4 hours (Review today)
// Box 2: 1 day (Review tomorrow)
// Box 3: 3 days
// Box 4: 7 days
// Box 5: 14 days (Mastered!)
const INTERVALS_MS = [
  0,
  4 * 60 * 60 * 1000,
  24 * 60 * 60 * 1000,
  3 * 24 * 60 * 60 * 1000,
  7 * 24 * 60 * 60 * 1000,
  14 * 24 * 60 * 60 * 1000
];

export interface SolvedRecord {
  questionId: string;
  subjectId: SubjectId;
  attempts: number;
  correctCount: number;
  lastAttemptAt: number;
  lastWasCorrect: boolean;
  isHighYield: boolean;
  importanceScore: number;
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
 * REPETITION RULE:
 * 1. If question is NOT High-Yield (importanceScore < 90) and user got it right,
 *    it is marked as solved/mastered and NEVER repeats in regular practice.
 * 2. If question IS High-Yield (importanceScore >= 90), it enters the Leitner Spaced Repetition queue.
 *    It repeats ONLY when its scheduled review interval is due.
 * 3. If user got it wrong, it repeats and is added to the Mistakes Notebook.
 */
export function recordAnswerInSRS(question: Question, isCorrect: boolean): void {
  const isHighYield = question.importance === 'HIGH_YIELD' || question.importanceScore >= 90;
  const now = Date.now();

  // 1. Update Solved History
  const history = getSolvedHistory();
  const existingRecord = history[question.id] || {
    questionId: question.id,
    subjectId: question.subjectId,
    attempts: 0,
    correctCount: 0,
    lastAttemptAt: 0,
    lastWasCorrect: false,
    isHighYield,
    importanceScore: question.importanceScore
  };

  existingRecord.attempts += 1;
  existingRecord.lastAttemptAt = now;
  existingRecord.lastWasCorrect = isCorrect;
  if (isCorrect) {
    existingRecord.correctCount += 1;
  }
  history[question.id] = existingRecord;
  saveSolvedHistory(history);

  // 2. If NOT High-Yield and answered correctly: lock out from repeat
  if (!isHighYield && isCorrect) {
    // Remove from mistakes if it was there
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
    existingSRS.box = 1; // Demote back to Box 1 for immediate review
  }

  // Calculate next review timestamp based on Leitner box
  const interval = INTERVALS_MS[existingSRS.box] || INTERVALS_MS[1];
  existingSRS.nextReviewDate = now + interval;

  srsItems[question.id] = existingSRS;
  saveSRSItems(srsItems);

  // 4. Record or clear mistake
  if (!isCorrect) {
    recordMistake(question.id);
  } else {
    clearMistake(question.id);
  }
}

/**
 * Check whether a question should be shown in practice.
 * Non-important questions that were answered correctly will return FALSE (they do not repeat).
 * High-yield questions will return TRUE if not solved yet, or if solved and due for spaced review.
 */
export function isQuestionEligibleForPractice(questionId: string, importanceScore: number): boolean {
  const history = getSolvedHistory();
  const record = history[questionId];

  // If candidate has never attempted this question, it is eligible
  if (!record || record.attempts === 0) {
    return true;
  }

  // If candidate got it wrong last time, it is eligible (needs revision)
  if (!record.lastWasCorrect) {
    return true;
  }

  const isHighYield = record.isHighYield || importanceScore >= 90;

  // If NOT high yield and answered correctly, LOCK OUT! (Do not repeat)
  if (!isHighYield) {
    return false;
  }

  // If High-Yield, only repeat if due in Spaced Repetition (or mastered in Box 5)
  const srsItems = getSRSItems();
  const srs = srsItems[questionId];
  if (!srs) {
    return false;
  }

  // Once candidate gets 3+ consecutive correct on a high yield question, do not clutter daily drill
  if (srs.consecutiveCorrect >= 3 && srs.box >= 4) {
    return false;
  }

  // Repeat if scheduled time has arrived
  return srs.nextReviewDate <= Date.now();
}

export function getQuestionsDueForReview(allQuestions: Question[]): Question[] {
  const items = getSRSItems();
  const now = Date.now();

  const dueIds = new Set<string>();
  for (const [id, item] of Object.entries(items)) {
    // High-yield questions due for review or questions missed previously
    if (item.nextReviewDate <= now && item.consecutiveCorrect < 3) {
      dueIds.add(id);
    }
  }

  return allQuestions.filter(q => dueIds.has(q.id));
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

/**
 * Live User Analytics computed from real storage data
 */
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

  // Calculate subject accuracies
  Object.keys(subjectPerformance).forEach((subj) => {
    const s = subjectPerformance[subj];
    s.accuracy = s.solved > 0 ? Math.round((s.correct / s.solved) * 100) : 0;
  });

  // Count high yield mastered
  Object.values(srsItems).forEach((item) => {
    if (item.consecutiveCorrect >= 3 || item.box >= 4) {
      highYieldMastered += 1;
    }
  });

  // Count due SRS
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
