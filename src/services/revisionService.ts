import { Question, SubjectId } from '../types';
import { INITIAL_QUESTION_BANK } from '../data/questionBank';
import { CURRENT_AFFAIRS_MASTER } from './currentAffairsService';
import { getSRSItems, getMistakeQuestionIds } from './srsEngine';

/**
 * Convert Current Affairs Master Items into Question format
 */
export function getHighYieldCurrentAffairsQuestions(): Question[] {
  return CURRENT_AFFAIRS_MASTER.map((item, idx) => ({
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
 * Aggregates all verified High-Importance RPSC Prelims questions
 * from the Question Bank and Current Affairs Master
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
 * Returns High-Importance questions that are currently due for review
 */
export function getDueRevisionQuestions(): Question[] {
  const allHighYield = getAllHighImportanceQuestions();
  const srsItems = getSRSItems();
  const now = Date.now();

  return allHighYield.filter(q => {
    const srs = srsItems[q.id] || srsItems[q.conceptKey];
    if (!srs) {
      // Not yet reviewed in SRS
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
