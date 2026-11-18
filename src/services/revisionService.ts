import { Question, SubjectId } from '../types';
import { INITIAL_QUESTION_BANK } from '../data/questionBank';
import { CURRENT_AFFAIRS_MASTER } from './currentAffairsService';
import { getSRSItems, getMistakeQuestionIds, getRecentSignatures } from './srsEngine';
import { generateDynamicQuestion } from './questionGenerator';

/**
 * Convert Current Affairs Master Items into Question format
 */
export function getHighYieldCurrentAffairsQuestions(): Question[] {
  return CURRENT_AFFAIRS_MASTER.map((item) => ({
    id: `rev_ca_${item.id}`,
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
    tags: ['High Yield', 'Current Affairs', ...item.tags]
  }));
}

/**
 * Aggregates all curated High-Importance RPSC Prelims questions
 */
export function getAllHighImportanceQuestions(subjectFilter?: string): Question[] {
  const bankHighYield = INITIAL_QUESTION_BANK.filter(
    q => q.importance === 'HIGH_YIELD' || q.importanceScore >= 90
  );

  const caHighYield = getHighYieldCurrentAffairsQuestions();
  const combined = [...bankHighYield, ...caHighYield];

  if (!subjectFilter || subjectFilter === 'all') {
    return combined;
  }

  return combined.filter(q => q.subjectId === subjectFilter);
}

/**
 * Generates the NEXT High-Importance Question for the Revision Tab
 * Mathematically guarantees zero duplicates by checking:
 * 1. session seen keys
 * 2. persistent 40-question ring buffer
 */
export function getNextHighYieldRevisionQuestion(
  subjectFilter?: string,
  excludeKeys?: Set<string>,
  seed: number = Date.now()
): Question {
  const targetSubj = (!subjectFilter || subjectFilter === 'all') ? undefined : (subjectFilter as SubjectId);
  const recentSignatures = new Set(getRecentSignatures());

  // Combined exclusion set (session seen + recent 40 buffer)
  const combinedExcludes = new Set<string>();
  if (excludeKeys) {
    excludeKeys.forEach(k => combinedExcludes.add(k));
  }
  recentSignatures.forEach(s => combinedExcludes.add(s));

  // 1. First check if any curated high-yield question is unseen
  const curated = getAllHighImportanceQuestions(subjectFilter);
  const eligibleCurated = curated.filter(q => !combinedExcludes.has(q.conceptKey) && !combinedExcludes.has(q.id));

  if (eligibleCurated.length > 0) {
    const chosen = eligibleCurated[seed % eligibleCurated.length];
    return chosen;
  }

  // 2. Generate dynamic high-yield question with exclusion
  return generateDynamicQuestion(targetSubj, seed, combinedExcludes);
}

/**
 * Returns High-Importance questions that are currently due for review
 */
export function getDueRevisionQuestions(): Question[] {
  const allHighYield = getAllHighImportanceQuestions();
  const srsItems = getSRSItems();
  const now = Date.now();

  return allHighYield.filter(q => {
    const srs = srsItems[q.id] || srsItems[q.conceptKey];
    if (!srs) {
      return true;
    }
    return srs.nextReviewDate <= now || srs.box === 1;
  });
}

/**
 * Returns all questions currently logged in Mistakes Vault
 */
export function getMistakeQuestions(): Question[] {
  const allHighYield = getAllHighImportanceQuestions();
  const mistakeIds = getMistakeQuestionIds();

  return allHighYield.filter(q => 
    mistakeIds.includes(q.id) || (q.conceptKey && mistakeIds.includes(q.conceptKey))
  );
}
