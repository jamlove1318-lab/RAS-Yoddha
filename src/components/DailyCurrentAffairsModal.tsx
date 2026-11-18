import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Flame, 
  Award,
  BookOpen,
  ArrowRight,
  Infinity as InfinityIcon,
  Layers,
  Check
} from 'lucide-react';
import { 
  getLiveCurrentAffairsQuestion, 
  getTodayDateString, 
  getFormattedTodayDate,
  saveTodayQuizScore 
} from '../services/currentAffairsService';
import { recordAnswerInSRS } from '../services/srsEngine';
import { Question } from '../types';
import { sounds } from '../utils/audio';

interface DailyCurrentAffairsModalProps {
  lang: 'en' | 'hi';
  onClose: () => void;
  onAddXP: (amt: number) => void;
}

export const DailyCurrentAffairsModal: React.FC<DailyCurrentAffairsModalProps> = ({
  lang,
  onClose,
  onAddXP
}) => {
  const todayKey = getTodayDateString();
  const formattedDate = getFormattedTodayDate(lang);

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Seen question IDs to prevent duplicate questions in active session
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());

  // Questions dynamic queue
  const [questions, setQuestions] = useState<Question[]>(() => {
    const q1 = getLiveCurrentAffairsQuestion(Date.now(), new Set(), 'all');
    return [q1];
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const currentQ = questions[currentIndex] || questions[0];
  const userSelected = selectedAnswers[currentIndex];
  const totalAttempted = Object.keys(selectedAnswers).length;
  const accuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

  const handleCategoryChange = (cat: string) => {
    sounds.playClick();
    setSelectedCategory(cat);
    // Fetch a new question matching this category
    const nextQ = getLiveCurrentAffairsQuestion(Date.now() + Math.random() * 10000, seenIds, cat);
    setQuestions(prev => [...prev.slice(0, currentIndex + 1), nextQ]);
    setCurrentIndex(prev => prev + 1);
    setShowExplanation(false);
    setSeenIds(prev => new Set([...prev, nextQ.id, nextQ.conceptKey]));
  };

  const handleSelectOption = (optIndex: number) => {
    if (userSelected !== undefined) return;
    sounds.playClick();

    const isCorrect = optIndex === currentQ.correctOption;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
    setShowExplanation(true);

    if (isCorrect) {
      sounds.playCorrect();
      onAddXP(20);
      setStreak(prev => prev + 1);
      setCorrectCount(prev => prev + 1);
    } else {
      sounds.playWrong();
      setStreak(0);
    }

    recordAnswerInSRS(currentQ, isCorrect);
    setSeenIds(prev => new Set([...prev, currentQ.id, currentQ.conceptKey]));
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    setShowExplanation(false);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Generate next fresh, authentic live question
      const nextQ = getLiveCurrentAffairsQuestion(
        Date.now() + (currentIndex + 1) * 73, 
        seenIds, 
        selectedCategory
      );
      setQuestions(prev => [...prev, nextQ]);
      setCurrentIndex(prev => prev + 1);
      setSeenIds(prev => new Set([...prev, nextQ.id, nextQ.conceptKey]));
    }
  };

  const handleFinishSession = () => {
    sounds.playLevelUp();
    setIsCompleted(true);
    saveTodayQuizScore(todayKey, correctCount, Math.max(totalAttempted, 1));
  };

  const handleRestart = () => {
    sounds.playClick();
    const freshQ = getLiveCurrentAffairsQuestion(Date.now(), new Set(), selectedCategory);
    setQuestions([freshQ]);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    setStreak(0);
    setCorrectCount(0);
    setSeenIds(new Set([freshQ.id]));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-5 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-yellow-200 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm sm:text-base tracking-tight">
                  {lang === 'hi' ? 'लाइव समसामयिकी केंद्र' : 'Live Current Affairs Hub'}
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-white/25">
                  <InfinityIcon className="w-3 h-3" />
                  {lang === 'hi' ? 'असीमित' : 'Unlimited'}
                </span>
              </div>
              <span className="text-[11px] text-amber-100 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate} • {lang === 'hi' ? 'राजस्थान एवं राष्ट्रीय' : 'Rajasthan & National'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {streak > 1 && (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-600/60 border border-orange-400/40 text-xs font-black text-yellow-200">
                <Flame className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                <span>{streak} Streak!</span>
              </div>
            )}
            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="p-1.5 rounded-xl hover:bg-white/20 active:scale-95 transition-all text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Filter Bar */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            {lang === 'hi' ? 'फिल्टर:' : 'Filter:'}
          </span>
          {[
            { id: 'all', labelHi: 'सभी समसामयिकी', labelEn: 'All Topics' },
            { id: 'raj_welfare_schemes', labelHi: 'राजस्थान योजनाएं', labelEn: 'Rajasthan Schemes' },
            { id: 'raj_solar_energy', labelHi: 'सौर ऊर्जा व बजट', labelEn: 'Solar & Budget' },
            { id: 'raj_water_infrastructure', labelHi: 'जल व ईआरसीपी', labelEn: 'Water & ERCP' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => handleCategoryChange(f.id)}
              className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all text-xs ${
                selectedCategory === f.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {lang === 'hi' ? f.labelHi : f.labelEn}
            </button>
          ))}
        </div>

        {/* Modal Content */}
        {!isCompleted ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* Live Stats Header */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-extrabold text-amber-600 dark:text-amber-400">
                {lang === 'hi' ? `प्रश्न संख्या #${currentIndex + 1}` : `Question #${currentIndex + 1}`}
                <span className="text-slate-400 ml-1.5 font-normal">
                  ({currentQ.subtopic})
                </span>
              </span>

              <div className="flex items-center gap-3 font-bold">
                <span className="text-emerald-600 dark:text-emerald-400">
                  {correctCount} {lang === 'hi' ? 'सही' : 'Correct'}
                </span>
                <span>•</span>
                <span>{accuracy}% {lang === 'hi' ? 'सटीकता' : 'Accuracy'}</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200/60 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                {lang === 'hi' ? 'RPSC प्रीलिम्स समसामयिकी' : 'RPSC Prelims Current Affairs'}
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                {lang === 'hi' ? currentQ.question.hi : currentQ.question.en}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {(lang === 'hi' ? currentQ.options.hi : currentQ.options.en).map((opt, idx) => {
                const isSelected = userSelected === idx;
                const isCorrect = idx === currentQ.correctOption;
                const hasSelected = userSelected !== undefined;

                let btnStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';
                if (hasSelected) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/20';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-2 ring-rose-500/20';
                  } else {
                    btnStyle = 'border-slate-200 dark:border-slate-800 opacity-50 text-slate-500 dark:text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasSelected}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${btnStyle}`}
                  >
                    <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                      hasSelected && isCorrect
                        ? 'bg-emerald-500 text-white'
                        : hasSelected && isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold flex-1 leading-snug">
                      {opt}
                    </span>
                    {hasSelected && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    )}
                    {hasSelected && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Card */}
            {showExplanation && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'विस्तृत परीक्षा व्याख्या एवं मुख्य बिंदु' : 'Comprehensive RPSC Analysis'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {lang === 'hi' ? currentQ.explanation.hi : currentQ.explanation.en}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Session Completed Summary */
          <div className="flex-1 overflow-y-auto p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-orange-500/30">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                {lang === 'hi' ? 'समसामयिकी अभ्यास सत्र पूर्ण!' : 'Current Affairs Drill Complete!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {lang === 'hi' ? 'आपकी प्रगति एवं प्रदर्शन का संक्षिप्त विवरण:' : 'Here is your active session performance:'}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 block">
                  {lang === 'hi' ? 'हल किए' : 'Attempted'}
                </span>
                <span className="text-2xl font-black text-amber-900 dark:text-amber-100">
                  {totalAttempted}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 block">
                  {lang === 'hi' ? 'सही उत्तर' : 'Correct'}
                </span>
                <span className="text-2xl font-black text-emerald-900 dark:text-emerald-100">
                  {correctCount}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50">
                <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300 block">
                  {lang === 'hi' ? 'सटीकता' : 'Accuracy'}
                </span>
                <span className="text-2xl font-black text-orange-900 dark:text-orange-100">
                  {accuracy}%
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {lang === 'hi'
                ? 'सभी गलत प्रश्नों को स्वतः आपकी गलती नोटबुक (Mistakes Notebook) में जोड़ दिया गया है ताकि आप उनका रिवीजन कर सकें।'
                : 'All incorrect questions have been saved to your Mistakes Notebook for spaced review.'}
            </p>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between shrink-0">
          {!isCompleted ? (
            <>
              <button
                onClick={handleFinishSession}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
              >
                {lang === 'hi' ? 'सत्र समाप्त करें' : 'Finish Session'}
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={userSelected === undefined}
                className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm shadow-md flex items-center gap-2 active:scale-95 transition-all ${
                  userSelected !== undefined
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-orange-500/25 hover:from-amber-600 hover:to-orange-700'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{lang === 'hi' ? 'अगला प्रश्न' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between gap-3">
              <button
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'hi' ? 'नया सत्र शुरू करें' : 'Start Fresh Session'}</span>
              </button>

              <button
                onClick={() => { sounds.playClick(); onClose(); }}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{lang === 'hi' ? 'डैशबोर्ड पर लौटें' : 'Back to Dashboard'}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
