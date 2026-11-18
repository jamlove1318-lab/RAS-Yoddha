import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  Flame, 
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { 
  getDailyCurrentAffairsQuiz, 
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
  const questions: Question[] = getDailyCurrentAffairsQuiz(todayKey);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentQ = questions[currentIndex];
  const userSelected = selectedAnswers[currentIndex];

  const handleSelectOption = (optIndex: number) => {
    if (userSelected !== undefined) return;
    sounds.playClick();

    const isCorrect = optIndex === currentQ.correctOption;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
    setShowExplanation(true);

    if (isCorrect) {
      sounds.playCorrect();
      onAddXP(20);
    } else {
      sounds.playWrong();
    }

    recordAnswerInSRS(currentQ, isCorrect);
  };

  const handleNext = () => {
    sounds.playClick();
    setShowExplanation(false);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Calculate final score
      let correct = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctOption) {
          correct += 1;
        }
      });
      setScore(correct);
      setIsCompleted(true);
      saveTodayQuizScore(todayKey, correct, questions.length);
      sounds.playLevelUp();
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    setScore(0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-amber-500 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm sm:text-base">
                  {lang === 'hi' ? 'दैनिक समसामयिकी क्विज' : 'Daily Current Affairs Quiz'}
                </h3>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-white/30">
                  {formattedDate}
                </span>
              </div>
              <span className="text-[11px] text-amber-100">
                {lang === 'hi' ? 'राजस्थान एवं राष्ट्रीय समसामयिकी (10 प्रश्न)' : 'Rajasthan & National Affairs (10 Qs)'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {!isCompleted ? (
            <>
              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span>Question {currentIndex + 1} of {questions.length}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold">{currentQ.subtopic}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                {lang === 'hi' ? currentQ.question.hi : currentQ.question.en}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {(lang === 'hi' ? currentQ.options.hi : currentQ.options.en).map((opt, optIdx) => {
                  const isSelected = userSelected === optIdx;
                  const isCorrect = optIdx === currentQ.correctOption;

                  let rowStyle = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-amber-400 text-slate-800 dark:text-slate-200';
                  if (userSelected !== undefined) {
                    if (isCorrect) {
                      rowStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold';
                    } else if (isSelected && !isCorrect) {
                      rowStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-100 font-bold';
                    }
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${rowStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-[11px] shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {userSelected !== undefined && isCorrect && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {userSelected !== undefined && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Solution Box */}
              {showExplanation && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1.5 animate-fadeIn text-xs sm:text-sm">
                  <span className="font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider text-[11px] block">
                    {lang === 'hi' ? 'परीक्षा तथ्य एवं संदर्भ:' : 'Exam Reference & Key Fact:'}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {lang === 'hi' ? currentQ.explanation.hi : currentQ.explanation.en}
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                  {lang === 'hi' ? 'आज का क्विज पूर्ण हुआ!' : 'Today\'s Daily Quiz Complete!'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'hi' ? `तारीख: ${formattedDate}` : `Date: ${formattedDate}`}
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 max-w-xs mx-auto border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">{lang === 'hi' ? 'आपका स्कोर' : 'Your Score'}</span>
                <div className="text-3xl font-black text-amber-600 mt-1">
                  {score} <span className="text-base text-slate-400">/ {questions.length}</span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 mt-1 block">
                  {Math.round((score / questions.length) * 100)}% Accuracy
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                {lang === 'hi'
                  ? 'कल फिर आएं! हर रात 12 बजे नए 10 समसामयिकी प्रश्न स्वतः अपडेट होते हैं।'
                  : 'Come back tomorrow! 10 fresh current affairs questions update automatically every midnight.'}
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'पुनः प्रयास करें' : 'Retake'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-md"
                >
                  {lang === 'hi' ? 'समाप्त' : 'Done'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer (Controls) */}
        {!isCompleted && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 shrink-0">
            <span className="text-[11px] text-slate-500">
              {userSelected === undefined 
                ? (lang === 'hi' ? 'विकल्प चुनें' : 'Select an option') 
                : (lang === 'hi' ? 'अगला प्रश्न देखें' : 'Tap Next to proceed')}
            </span>

            <button
              disabled={userSelected === undefined}
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <span>{currentIndex === questions.length - 1 ? (lang === 'hi' ? 'परिणाम देखें' : 'View Results') : (lang === 'hi' ? 'अगला प्रश्न' : 'Next Question')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
