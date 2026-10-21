import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  CheckCircle, 
  RotateCcw, 
  Trash2, 
  BookOpen, 
  AlertCircle, 
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';
import { 
  getSRSItems, 
  getMistakeQuestionIds, 
  clearMistake, 
  recordAnswerInSRS 
} from '../services/srsEngine';
import { INITIAL_QUESTION_BANK } from '../data/questionBank';
import { Question } from '../types';
import { sounds } from '../utils/audio';

interface HighYieldVaultProps {
  lang: 'en' | 'hi';
  onAddXP: (amt: number) => void;
}

export const HighYieldVault: React.FC<HighYieldVaultProps> = ({
  lang,
  onAddXP
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'srs' | 'mistakes'>('srs');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const srsItems = getSRSItems();
  const mistakeIds = getMistakeQuestionIds();

  // Find questions
  const allBank = INITIAL_QUESTION_BANK;

  // Box statistics
  const boxCounts = [0, 0, 0, 0, 0, 0];
  Object.values(srsItems).forEach(item => {
    if (item.box >= 1 && item.box <= 5) {
      boxCounts[item.box] += 1;
    }
  });

  const dueQuestions = allBank.filter(q => {
    const item = srsItems[q.id];
    if (!item) return false;
    return item.nextReviewDate <= Date.now() || item.box === 1;
  });

  const mistakeQuestions = allBank.filter(q => mistakeIds.includes(q.id));

  const toggleReveal = (id: string) => {
    sounds.playClick();
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReviewFeedback = (question: Question, success: boolean) => {
    sounds.playClick();
    if (success) {
      sounds.playCorrect();
      onAddXP(20);
    } else {
      sounds.playWrong();
    }
    recordAnswerInSRS(question, success);
    if (success) {
      clearMistake(question.id);
    }
    // force update
    setRevealedSolutions(prev => ({ ...prev, [question.id]: false }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Brain className="w-4 h-4" />
              <span>{lang === 'hi' ? 'स्मार्ट रिपीटीशन एवं हाई-यील्ड वॉल्ट' : 'Smart Spaced Repetition Engine'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
              {lang === 'hi' ? 'केवल महत्वपूर्ण प्रश्नों का पुनरावर्तन' : 'Only Important Questions Repeat'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'hi'
                ? 'बेकार प्रश्नों को बार-बार दोहराने से बचें! यह वैज्ञानिक एल्गोरिदम केवल हाई-यील्ड अवधारणाओं और आपकी पिछली गलतियों को याद रखने हेतु शेड्यूल करता है।'
                : 'Never waste time re-answering trivial facts. Our Leitner SRS schedules only verified high-yield RPSC concepts and questions you missed.'}
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveSubTab('srs');
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'srs'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {lang === 'hi' ? 'स्मार्ट रिवीजन' : 'Due for Review'} ({dueQuestions.length})
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveSubTab('mistakes');
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'mistakes'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {lang === 'hi' ? 'गलती नोटबुक' : 'Mistakes Notebook'} ({mistakeQuestions.length})
            </button>
          </div>
        </div>

        {/* Leitner 5-Box Visual Progress */}
        <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">Box 1 (Today)</span>
            <span className="text-lg font-black text-amber-600">{boxCounts[1]}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">Box 2 (1 Day)</span>
            <span className="text-lg font-black text-amber-600">{boxCounts[2]}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">Box 3 (3 Days)</span>
            <span className="text-lg font-black text-amber-600">{boxCounts[3]}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-center">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">Box 4 (7 Days)</span>
            <span className="text-lg font-black text-amber-600">{boxCounts[4]}</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-center border border-emerald-300 dark:border-emerald-800">
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 block uppercase">Box 5 (Mastered)</span>
            <span className="text-lg font-black text-emerald-600">{boxCounts[5]}</span>
          </div>
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {activeSubTab === 'srs' && (
          dueQuestions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                {lang === 'hi' ? 'शाबाश! आपकी आज की सभी हाई-यील्ड समीक्षाएं पूर्ण हैं!' : 'All Caught Up! No High-Yield Items Due Today!'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {lang === 'hi'
                  ? 'नए प्रश्न हल करने के लिए "विषयवार अभ्यास" या "मॉक टेस्ट" टैब पर जाएं।'
                  : 'Practice more in the Unlimited Practice tab or take a Mock Exam to expand your retention database.'}
              </p>
            </div>
          ) : (
            dueQuestions.map((q, idx) => {
              const isRevealed = revealedSolutions[q.id];
              return (
                <div
                  key={q.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                      {q.subtopic}
                    </span>
                    <span className="text-rose-600 dark:text-rose-400 font-extrabold">
                      ★ High-Yield Focus ({q.importanceScore}%)
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {lang === 'hi' ? q.question.hi : q.question.en}
                  </h3>

                  {isRevealed ? (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 font-bold">
                        {lang === 'hi' ? 'सही उत्तर: ' : 'Correct Answer: '}
                        {lang === 'hi' ? q.options.hi[q.correctOption] : q.options.en[q.correctOption]}
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                        <span className="font-bold block text-slate-900 dark:text-slate-100">
                          {lang === 'hi' ? 'महत्वपूर्ण तथ्य:' : 'Revision Fact Note:'}
                        </span>
                        <p>{lang === 'hi' ? q.explanation.hi : q.explanation.en}</p>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <span className="text-xs text-slate-500">{lang === 'hi' ? 'क्या आपको यह याद रहा?' : 'Did you recall correctly?'}</span>
                        <button
                          onClick={() => handleReviewFeedback(q, false)}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-300 font-bold text-xs"
                        >
                          {lang === 'hi' ? 'भूल गया (Box 1)' : 'Forgot (Repeat)'}
                        </button>
                        <button
                          onClick={() => handleReviewFeedback(q, true)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
                        >
                          {lang === 'hi' ? 'याद रहा (+Level Up)' : 'Recalled (+Next Box)'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleReveal(q.id)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-md shadow-amber-500/20"
                    >
                      {lang === 'hi' ? 'उत्तर व समाधान देखें' : 'Reveal Answer & Notes'}
                    </button>
                  )}
                </div>
              );
            })
          )
        )}

        {activeSubTab === 'mistakes' && (
          mistakeQuestions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                {lang === 'hi' ? 'गलती नोटबुक खाली है!' : 'No Mistakes Recorded Yet!'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {lang === 'hi'
                  ? 'मॉक टेस्ट या प्रैक्टिस में होने वाली कोई भी गलती स्वतः यहाँ दर्ज हो जाएगी।'
                  : 'Any question answered incorrectly during exams or practice drills is safely cataloged here for revision.'}
              </p>
            </div>
          ) : (
            mistakeQuestions.map((q) => (
              <div
                key={q.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-950/60 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
                    {q.subtopic}
                  </span>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      clearMistake(q.id);
                    }}
                    className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'नोटबुक से हटाएं' : 'Remove'}</span>
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                  {lang === 'hi' ? q.question.hi : q.question.en}
                </h3>

                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 font-bold">
                  {lang === 'hi' ? 'सही उत्तर: ' : 'Correct: '}
                  {lang === 'hi' ? q.options.hi[q.correctOption] : q.options.en[q.correctOption]}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300">
                  {lang === 'hi' ? q.explanation.hi : q.explanation.en}
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};
