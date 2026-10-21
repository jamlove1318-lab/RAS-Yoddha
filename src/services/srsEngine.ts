import { Question, SRSItem } from '../types';

const SRS_STORAGE_KEY = 'ras_srs_data_v1';
const MISTAKES_STORAGE_KEY = 'ras_mistakes_v1';

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
 * Record user response for spaced repetition.
 * "Only important questions should repeat":
 * - If question is NOT high yield AND user got it right, we don't repeat it!
 * - If question IS high yield, we track spaced repetition intervals.
 * - If user got it wrong, we track it for revision.
 */
export function recordAnswerInSRS(question: Question, isCorrect: boolean): void {
  const isHighYield = question.importance === 'HIGH_YIELD' || question.importanceScore >= 90;

  // Don't clutter repetition queue with standard trivia if already answered correctly
  if (!isHighYield && isCorrect) {
    return;
  }

  const items = getSRSItems();
  const existing = items[question.id] || {
    questionId: question.id,
    box: 1,
    nextReviewDate: Date.now(),
    lastReviewedDate: 0,
    consecutiveCorrect: 0,
    totalAttempts: 0,
    history: [],
    isHighYieldOnly: isHighYield
  };

  const now = Date.now();
  existing.totalAttempts += 1;
  existing.lastReviewedDate = now;
  existing.history.push({ date: now, isCorrect });

  if (isCorrect) {
    existing.consecutiveCorrect += 1;
    existing.box = Math.min(5, existing.box + 1);
  } else {
    existing.consecutiveCorrect = 0;
    existing.box = 1; // Demote back to Box 1 for immediate repeat
  }

  // Calculate next review timestamp based on current box
  const interval = INTERVALS_MS[existing.box] || INTERVALS_MS[1];
  existing.nextReviewDate = now + interval;

  items[question.id] = existing;
  saveSRSItems(items);

  // If wrong, also add to Mistakes notebook
  if (!isCorrect) {
    recordMistake(question.id);
  }
}

export function getQuestionsDueForReview(allQuestions: Question[]): Question[] {
  const items = getSRSItems();
  const now = Date.now();

  const dueIds = new Set<string>();
  for (const [id, item] of Object.entries(items)) {
    // Only repeat if due AND either High-Yield or has low consecutive correct (< 3)
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
      localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(mistakes.slice(0, 100)));
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
