import React, { useState } from 'react';
import { 
  SubjectId, 
  Question 
} from '../types';
import { SUBJECT_METADATA } from '../data/pyqAnalysis';
import { INITIAL_QUESTION_BANK } from '../data/questionBank';
import { generateDynamicQuestion } from '../services/questionGenerator';
import { recordAnswerInSRS } from '../services/srsEngine';
import { sounds } from '../utils/audio';
import { 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Filter, 
  ChevronRight, 
  ArrowRight,
  BookOpen,
  Award,
  Zap,
  Flame
} from 'lucide-react';

interface PracticeModeProps {
  lang: 'en' | 'hi';
  initialSubject?: SubjectId;
  onOpenVault: () => void;
  onAddXP: (amt: number) => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  lang,
  initialSubject = 'raj_history_art',
  onOpenVault,
  onAddXP
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(initialSubject);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('all');
  const [onlyHighYield, setOnlyHighYield] = useState<boolean>(true);
  const [instantFeedback, setInstantFeedback] = useState<boolean>(true);

  // Active question stream
  const [currentQuestion, setCurrentQuestion] = useState<Question>(() => {
    return INITIAL_QUESTION_BANK.find(q => q.subjectId === initialSubject) || INITIAL_QUESTION_BANK[0];
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [practiceStreak, setPracticeStreak] = useState<number>(0);
  const [solvedCount, setSolvedCount] = useState<number>(0);

  const subjectInfo = SUBJECT_METADATA[selectedSubject];

  const handleSelectSubject = (id: SubjectId) => {
    sounds.playClick();
    setSelectedSubject(id);
    setSelectedSubtopic('all');
    fetchNextQuestion(id, 'all', onlyHighYield);
  };

  const fetchNextQuestion = (subj: SubjectId = selectedSubject, subtopic: string = selectedSubtopic, highYieldOnly: boolean = onlyHighYield) => {
    setSelectedOption(null);
    setHasAnswered(false);

    // Filter existing bank first
    let candidates = INITIAL_QUESTION_BANK.filter(q => q.subjectId === subj);
    if (subtopic !== 'all') {
      candidates = candidates.filter(q => q.subtopic === subtopic);
    }
    if (highYieldOnly) {
      candidates = candidates.filter(q => q.importance === 'HIGH_YIELD');
    }

    // If available in bank and random chance, pick from bank, otherwise generate dynamically for "unlimited"
    const pickFromBank = candidates.length > 0 && Math.random() > 0.4;
    if (pickFromBank) {
      const randomIdx = Math.floor(Math.random() * candidates.length);
      setCurrentQuestion(candidates[randomIdx]);
    } else {
      // Dynamic generation
      const generated = generateDynamicQuestion(subj, Date.now() + Math.floor(Math.random() * 10000));
      setCurrentQuestion(generated);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (hasAnswered && instantFeedback) return;
    sounds.playClick();
    setSelectedOption(idx);

    if (instantFeedback) {
      setHasAnswered(true);
      const isCorrect = idx === currentQuestion.correctOption;
      recordAnswerInSRS(currentQuestion, isCorrect);

      if (isCorrect) {
        sounds.playCorrect();
        setPracticeStreak(prev => prev + 1);
        setSolvedCount(prev => prev + 1);
        onAddXP(15);
      } else {
        sounds.playWrong();
        setPracticeStreak(0);
        setSolvedCount(prev => prev + 1);
      }
    }
  };

  const isCorrect = selectedOption === currentQuestion.correctOption;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'hi' ? 'विषयवार असीमित प्रश्न अभ्यास' : 'Subject-Wise Unlimited Drill'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
            {lang === 'hi' ? subjectInfo.nameHi : subjectInfo.nameEn}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {subjectInfo.weightage} • {subjectInfo.description}
          </p>
        </div>

        {/* Practice Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs font-bold text-amber-900 dark:text-amber-300">
            <Flame className="w-4 h-4 text-orange-500 fill-current" />
            <span>{practiceStreak} {lang === 'hi' ? 'लगातार सही' : 'Streak'}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>{solvedCount} {lang === 'hi' ? 'हल किए' : 'Solved'}</span>
          </div>
        </div>
      </div>

      {/* Subject Filter Pills (Horizontally Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {Object.values(SUBJECT_METADATA).map((subj) => (
          <button
            key={subj.id}
            onClick={() => handleSelectSubject(subj.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedSubject === subj.id
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {lang === 'hi' ? subj.nameHi.split(' ')[0] + '...' : subj.nameEn.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs font-semibold">
        <div className="flex items-center gap-3">
          {/* Subtopic dropdown */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedSubtopic}
              onChange={(e) => {
                setSelectedSubtopic(e.target.value);
                fetchNextQuestion(selectedSubject, e.target.value, onlyHighYield);
              }}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="all">{lang === 'hi' ? 'सभी उप-विषय (All Subtopics)' : 'All Subtopics'}</option>
              {subjectInfo.subtopics.map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Only High Yield Switch */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyHighYield}
              onChange={(e) => {
                setOnlyHighYield(e.target.checked);
                fetchNextQuestion(selectedSubject, selectedSubtopic, e.target.checked);
              }}
              className="rounded text-amber-500 focus:ring-amber-400"
            />
            <span className="text-rose-600 dark:text-rose-400 font-bold">
              {lang === 'hi' ? 'केवल महत्वपूर्ण प्रश्न (High-Yield Only)' : 'Only High-Yield Questions'}
            </span>
          </label>
        </div>

        {/* Instant Feedback Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500">{lang === 'hi' ? 'तुरंत समाधान:' : 'Instant Solution:'}</span>
          <button
            onClick={() => setInstantFeedback(!instantFeedback)}
            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              instantFeedback ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-700'
            }`}
          >
            {instantFeedback ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Active Question Box */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Question Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              {currentQuestion.subtopic}
            </span>
            {currentQuestion.importance === 'HIGH_YIELD' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                {currentQuestion.importanceScore}% Yield
              </span>
            )}
          </div>

          {currentQuestion.frequencyNote && (
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              ★ {currentQuestion.frequencyNote}
            </span>
          )}
        </div>

        {/* Question Prompt */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
          {lang === 'hi' ? currentQuestion.question.hi : currentQuestion.question.en}
        </h3>

        {/* MCQ Options */}
        <div className="space-y-3">
          {(lang === 'hi' ? currentQuestion.options.hi : currentQuestion.options.en).map((opt, optIdx) => {
            const isSelected = selectedOption === optIdx;
            const isCorrectOpt = optIdx === currentQuestion.correctOption;

            let cardStyle = 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200';

            if (hasAnswered) {
              if (isCorrectOpt) {
                cardStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold';
              } else if (isSelected && !isCorrectOpt) {
                cardStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-100';
              }
            } else if (isSelected) {
              cardStyle = 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-100 font-bold';
            }

            return (
              <div
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between text-sm sm:text-base ${cardStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full border flex items-center justify-center font-bold text-xs shrink-0">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {hasAnswered && isCorrectOpt && (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {hasAnswered && isSelected && !isCorrectOpt && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Explanation Banner (when answered) */}
        {hasAnswered && (
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-2 animate-fadeIn text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-black text-amber-900 dark:text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{lang === 'hi' ? 'विस्तृत परीक्षा तथ्य एवं विश्लेषण:' : 'In-depth Analysis & Facts:'}</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {lang === 'hi' ? currentQuestion.explanation.hi : currentQuestion.explanation.en}
            </p>
          </div>
        )}

        {/* Next Question Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => onOpenVault()}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            {lang === 'hi' ? 'रिवीजन वॉल्ट में देखें' : 'View Spaced Repetition Queue'}
          </button>

          <button
            onClick={() => fetchNextQuestion()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span>{lang === 'hi' ? 'अगला असीमित प्रश्न' : 'Next Unlimited Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
