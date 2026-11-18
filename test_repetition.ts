import { generateDynamicQuestion } from './src/services/questionGenerator';
import { getNextHighYieldRevisionQuestion } from './src/services/revisionService';
import { getLiveCurrentAffairsQuestion } from './src/services/currentAffairsService';
import { recordAnswerInSRS, isQuestionEligibleForPractice, getRecentSignatures } from './src/services/srsEngine';

// Polyfill localStorage for node environment
const storage: Record<string, string> = {};
(global as any).localStorage = {
  getItem: (key: string) => storage[key] || null,
  setItem: (key: string, val: string) => { storage[key] = val; },
  removeItem: (key: string) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

console.log('--- STARTING COMPREHENSIVE REPETITION TEST ---');

// 1. TEST REVISION HUB UNLIMITED STREAM (100 Questions)
console.log('\n[TEST 1] Testing Revision Hub 100-Question Stream...');
const revisionSeen = new Set<string>();
const recentHistory: string[] = [];
let revisionDuplicates = 0;

for (let i = 0; i < 100; i++) {
  const q = getNextHighYieldRevisionQuestion('all', revisionSeen, Date.now() + i * 137);
  
  // Check if this concept was seen in the last 20 questions
  const last20 = recentHistory.slice(-20);
  if (last20.includes(q.conceptKey)) {
    console.error(`FAIL: Revision question ${q.conceptKey} repeated too soon! Seen within last 20 questions.`);
    revisionDuplicates++;
  }
  
  recentHistory.push(q.conceptKey);
  revisionSeen.add(q.conceptKey);
  revisionSeen.add(q.id);
  recordAnswerInSRS(q, true);
}

console.log(`[TEST 1 RESULT] 100 Revision Questions streamed. Immediate duplicates in last 20: ${revisionDuplicates}`);

// 2. TEST DYNAMIC CURRENT AFFAIRS STREAM (50 Questions)
console.log('\n[TEST 2] Testing Live Current Affairs 50-Question Stream...');
const caSeen = new Set<string>();
const caHistory: string[] = [];
let caDuplicates = 0;

for (let i = 0; i < 50; i++) {
  const q = getLiveCurrentAffairsQuestion(Date.now() + i * 191, caSeen);
  
  const last20 = caHistory.slice(-20);
  if (last20.includes(q.conceptKey)) {
    console.error(`FAIL: CA question ${q.conceptKey} repeated too soon!`);
    caDuplicates++;
  }

  caHistory.push(q.conceptKey);
  caSeen.add(q.conceptKey);
  caSeen.add(q.id);
  recordAnswerInSRS(q, true);
}

console.log(`[TEST 2 RESULT] 50 Current Affairs Questions streamed. Duplicates in last 20: ${caDuplicates}`);

// 3. TEST PRACTICE MODE ZERO REPEATS (50 Questions)
console.log('\n[TEST 3] Testing Practice Mode 50 Questions with SRS check...');
const practiceSeen = new Set<string>();
const practiceHistory: string[] = [];
let practiceDuplicates = 0;

for (let i = 0; i < 50; i++) {
  const q = generateDynamicQuestion('raj_history_art', Date.now() + i * 239, practiceSeen);
  
  const last20 = practiceHistory.slice(-20);
  if (last20.includes(q.conceptKey)) {
    console.error(`FAIL: Practice question ${q.conceptKey} repeated within last 20!`);
    practiceDuplicates++;
  }

  practiceHistory.push(q.conceptKey);
  practiceSeen.add(q.conceptKey);
  practiceSeen.add(q.id);
  recordAnswerInSRS(q, true);
}

console.log(`[TEST 3 RESULT] 50 Practice Questions streamed. Duplicates in last 20: ${practiceDuplicates}`);

if (revisionDuplicates === 0 && caDuplicates === 0 && practiceDuplicates === 0) {
  console.log('\n>>> ALL REPETITION TESTS PASSED PERFECTLY WITH ZERO UNWANTED REPEATS! <<<');
  process.exit(0);
} else {
  console.error('\n>>> TESTS FAILED WITH DUPLICATES! <<<');
  process.exit(1);
}
