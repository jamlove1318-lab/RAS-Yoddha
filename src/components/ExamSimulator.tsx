import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  RotateCcw, 
  BarChart, 
  Layers, 
  Check, 
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Question, UserAnswerRecord, ExamAttempt } from '../types';
import { INITIAL_QUESTION_BANK } from '../data/questionBank';
import { generateQuestionSet } from '../services/questionGenerator';
import { recordAnswerInSRS } from '../services/srsEngine';
import { sounds } from '../utils/audio';

interface ExamSimulatorProps {
  lang: 'en' | 'hi';
  initialMode?: 'full' | 'mini';
  onExit: () => void;
  onOpenVault: () => void;
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  lang,
  initialMode = 'mini',
  onExit,
  onOpenVault
}) => {
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<'full' | 'mini'>(initialMode);
  const [useFifthOption, setUseFifthOption] = useState<boolean>(true); // Official RPSC 2023+ rule

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswerRecord>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Set<string>>(new Set());
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState<boolean>(false);

  // Timer
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(1800);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState<number>(1800);

  // Score summary
  const [examResult, setExamResult] = useState<ExamAttempt | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct' | 'unattempted'>('all');

  // Start Exam
  const startExam = (mode: 'full' | 'mini') => {
    sounds.playClick();
    setSelectedMode(mode);

    const questionCount = mode === 'full' ? 150 : 25;
    const duration = mode === 'full' ? 180 * 60 : 30 * 60; // 180 min or 30 min

    // Compile questions: mix authentic PYQs and high-yield generated questions
    const set = [...INITIAL_QUESTION_BANK];
    if (set.length < questionCount) {
      const extraNeeded = questionCount - set.length;
      const generated = generateQuestionSet(extraNeeded);
      set.push(...generated);
    }
    const finalSet = set.slice(0, questionCount);

    setQuestions(finalSet);
    setTimeRemainingSeconds(duration);
    setTotalDurationSeconds(duration);
    setCurrentIndex(0);
    setUserAnswers({});
    setVisitedQuestions(new Set([finalSet[0].id]));
    setExamStarted(true);
    setExamFinished(false);
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (!examStarted || examFinished) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, examFinished]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    sounds.playClick();
    if (!currentQ) return;

    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        selectedOption: optionIndex,
        isCorrect: optionIndex === currentQ.correctOption,
        timeSpentSeconds: (prev[currentQ.id]?.timeSpentSeconds || 0) + 1,
        markedForReview: prev[currentQ.id]?.markedForReview || false
      }
    }));
  };

  const handleClearResponse = () => {
    sounds.playClick();
    if (!currentQ) return;
    setUserAnswers(prev => {
      const updated = { ...prev };
      delete updated[currentQ.id];
      return updated;
    });
  };

  const handleToggleMarkReview = () => {
    sounds.playClick();
    if (!currentQ) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        selectedOption: prev[currentQ.id]?.selectedOption ?? null,
        isCorrect: prev[currentQ.id]?.isCorrect ?? false,
        timeSpentSeconds: (prev[currentQ.id]?.timeSpentSeconds || 0) + 1,
        markedForReview: !prev[currentQ.id]?.markedForReview
      }
    }));
  };

  const navigateToQuestion = (index: number) => {
    sounds.playClick();
    setCurrentIndex(index);
    if (questions[index]) {
      setVisitedQuestions(prev => new Set([...prev, questions[index].id]));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      navigateToQuestion(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigateToQuestion(currentIndex - 1);
    }
  };

  // Submit Exam & Calculate RPSC Scoring
  const submitExam = () => {
    sounds.playLevelUp();

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const subjectBreakdown: any = {};

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      const selected = ans?.selectedOption;

      // In 5th option mode, if option 4 (5th option "Not Attempted") is chosen, it counts as unattempted without negative mark
      const isFifthOption = selected === 4;
      const isAnswered = selected !== undefined && selected !== null && !isFifthOption;

      if (!subjectBreakdown[q.subjectId]) {
        subjectBreakdown[q.subjectId] = { total: 0, correct: 0, incorrect: 0, netScore: 0 };
      }
      subjectBreakdown[q.subjectId].total += 1;

      if (isAnswered) {
        if (selected === q.correctOption) {
          correctCount += 1;
          subjectBreakdown[q.subjectId].correct += 1;
          recordAnswerInSRS(q, true);
        } else {
          incorrectCount += 1;
          subjectBreakdown[q.subjectId].incorrect += 1;
          recordAnswerInSRS(q, false);
        }
      } else {
        unattemptedCount += 1;
      }
    });

    // RPSC Prelims standard scoring: 150 Qs = 200 Marks => +1.333 per correct, -0.444 per wrong (-1/3)
    const marksPerQ = selectedMode === 'full' ? 200 / 150 : 200 / 25;
    const penaltyPerQ = marksPerQ / 3;

    const rawScore = correctCount * marksPerQ;
    const negativeMarks = incorrectCount * penaltyPerQ;
    const netScore = Math.max(0, Number((rawScore - negativeMarks).toFixed(2)));

    // calculate subject net
    Object.keys(subjectBreakdown).forEach((sid) => {
      const s = subjectBreakdown[sid];
      s.netScore = Number((s.correct * marksPerQ - s.incorrect * penaltyPerQ).toFixed(2));
    });

    const result: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      date: new Date().toLocaleDateString(),
      mode: selectedMode,
      title: selectedMode === 'full' ? 'RPSC RAS Full Prelims Mock (150Q)' : 'RPSC RAS Rapid Mini Mock (25Q)',
      totalQuestions: questions.length,
      attempted: correctCount + incorrectCount,
      correct: correctCount,
      incorrect: incorrectCount,
      unattempted: unattemptedCount,
      rawScore: Number(rawScore.toFixed(2)),
      negativeMarks: Number(negativeMarks.toFixed(2)),
      netScore,
      maxScore: 200,
      timeTakenSeconds: totalDurationSeconds - timeRemainingSeconds,
      answers: userAnswers,
      subjectBreakdown
    };

    setExamResult(result);
    setExamFinished(true);
  };

  // Time format helper
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // If exam has not started yet, show Mock Setup Screen
  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-800">
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'RPSC RAS प्रारंभिक परीक्षा मॉक सिमुलेटर' : 'Official RPSC Prelims Exam Simulator'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            {lang === 'hi' ? 'आरपीएससी वास्तविक परीक्षा प्रारूप' : 'Simulate the Real RAS Prelims Exam'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {lang === 'hi'
              ? 'सटीक 1/3rd ऋणात्मक अंकन, 5वां विकल्प (अनुत्तरित प्रश्न), प्रश्न पैलेट और विस्तृत समाधान के साथ परीक्षा दें।'
              : 'Test yourself with exact 1/3 negative marking, 5th option toggle, live OMR palette, and complete post-exam diagnostics.'}
          </p>
        </div>

        {/* Mock Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Full Mock */}
          <div 
            onClick={() => setSelectedMode('full')}
            className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer bg-white dark:bg-slate-900 flex flex-col justify-between space-y-6 ${
              selectedMode === 'full'
                ? 'border-amber-500 ring-4 ring-amber-500/20 shadow-xl'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-white shadow-md shadow-amber-500/20">
                  {lang === 'hi' ? 'वास्तविक परीक्षा' : 'Official Exam'}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 180 Min
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {lang === 'hi' ? 'फुल लेंथ मॉक टेस्ट (150 प्रश्न)' : 'Full Length Mock Exam (150 Qs)'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {lang === 'hi'
                    ? '150 प्रश्न, 200 अंक, 3 घंटे। राजस्थान GK (65+ Qs), भारतीय राजव्यवस्था, विज्ञान एवं प्रौद्योगिकी तथा समसामयिकी।'
                    : '150 questions, 200 marks, 3 hours. Complete syllabus distribution mirroring actual RPSC papers.'}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>{lang === 'hi' ? 'कुल अंक' : 'Total Marks'}:</span>
                  <span className="font-bold">200 Marks (+1.33 per Q)</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'hi' ? 'ऋणात्मक अंकन' : 'Negative Marking'}:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">-0.44 per wrong (-1/3)</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'hi' ? 'सामान्य कट-ऑफ लक्ष्य' : 'Target Cutoff'}:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">85 - 100 Marks</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Check className="w-4 h-4" />
              <span>{lang === 'hi' ? 'चयनित' : 'Selected'}</span>
            </div>
          </div>

          {/* Card 2: Mini Mock */}
          <div 
            onClick={() => setSelectedMode('mini')}
            className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer bg-white dark:bg-slate-900 flex flex-col justify-between space-y-6 ${
              selectedMode === 'mini'
                ? 'border-amber-500 ring-4 ring-amber-500/20 shadow-xl'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-md shadow-blue-500/20">
                  {lang === 'hi' ? 'फास्ट ड्रिल' : 'Rapid Drill'}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 30 Min
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {lang === 'hi' ? 'मिनी स्पीड मॉक (25 प्रश्न)' : 'Mini Speed Mock (25 Qs)'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {lang === 'hi'
                    ? '25 उच्च-प्राथमिकता वाले प्रश्न, 30 मिनट। व्यस्त समय में त्वरित मूल्यांकन के लिए सर्वोत्तम।'
                    : '25 high-yield curated questions in 30 minutes. Perfect for fast daily performance checks.'}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>{lang === 'hi' ? 'कुल अंक' : 'Total Marks'}:</span>
                  <span className="font-bold">200 Marks (Scaled)</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'hi' ? 'ऋणात्मक अंकन' : 'Negative Marking'}:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">-1/3 Negative penalty</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'hi' ? 'उद्देश्य' : 'Focus'}:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">High-Yield Questions</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Check className="w-4 h-4" />
              <span>{lang === 'hi' ? 'चयनित' : 'Selected'}</span>
            </div>
          </div>
        </div>

        {/* 5th Option RPSC Mandate Toggle */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{lang === 'hi' ? 'RPSC 5वां विकल्प नियम (Option E: अनुत्तरित प्रश्न)' : 'Official RPSC 5th Option Rule (Option E)'}</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {lang === 'hi'
                ? 'RPSC 2023+ नए नियम के अनुसार यदि कोई प्रश्न छोड़ना है तो 5वां गोला (अनुत्तरित प्रश्न) भरना अनिवार्य है।'
                : 'According to latest RPSC rule, candidates must select Option 5 (Not Attempted) if they choose not to attempt a question.'}
            </p>
          </div>
          <button
            onClick={() => setUseFifthOption(!useFifthOption)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              useFifthOption ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              useFifthOption ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Start Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => startExam(selectedMode)}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-extrabold text-base shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <span>{lang === 'hi' ? 'मॉक परीक्षा प्रारंभ करें' : 'Begin Mock Exam Now'}</span>
          </button>
        </div>
      </div>
    );
  }

  // If exam is completed, show Scorecard & Review
  if (examFinished && examResult) {
    const isQualified = examResult.netScore >= (examResult.mode === 'full' ? 88 : 88);
    const accuracy = examResult.attempted > 0 
      ? Math.round((examResult.correct / examResult.attempted) * 100)
      : 0;

    const filteredQuestions = questions.filter(q => {
      const ans = userAnswers[q.id];
      const selected = ans?.selectedOption;
      const isFifth = selected === 4;
      const isAttempted = selected !== undefined && selected !== null && !isFifth;

      if (reviewFilter === 'wrong') return isAttempted && selected !== q.correctOption;
      if (reviewFilter === 'correct') return isAttempted && selected === q.correctOption;
      if (reviewFilter === 'unattempted') return !isAttempted;
      return true;
    });

    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
        {/* Scorecard Hero */}
        <div className={`p-6 sm:p-10 rounded-3xl text-white shadow-xl ${
          isQualified 
            ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 shadow-emerald-700/20'
            : 'bg-gradient-to-br from-amber-600 via-orange-700 to-rose-900 shadow-orange-700/20'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/20 backdrop-blur-md">
                {examResult.title} • {examResult.date}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
                {examResult.netScore} <span className="text-xl sm:text-2xl font-medium text-white/80">/ {examResult.maxScore}</span>
              </h2>
              <p className="text-sm sm:text-base text-white/90">
                {isQualified
                  ? (lang === 'hi' ? '🎉 बधाई! आप आरपीएससी प्रारंभिक परीक्षा कट-ऑफ पार कर चुके हैं!' : '🎉 Congratulations! You have cleared the estimated RPSC RAS Prelims Cutoff!')
                  : (lang === 'hi' ? 'लक्ष्य के निकट! ऋणात्मक अंकन नियंत्रित करें और हाई-यील्ड विषयों पर ध्यान दें।' : 'Close to target! Control negative marking and focus on high-yield areas.')}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
              <div>
                <span className="text-[11px] text-white/70 block">{lang === 'hi' ? 'सटीकता' : 'Accuracy'}</span>
                <span className="text-xl font-extrabold">{accuracy}%</span>
              </div>
              <div>
                <span className="text-[11px] text-white/70 block">{lang === 'hi' ? 'ऋणात्मक हानि' : 'Neg. Lost'}</span>
                <span className="text-xl font-extrabold text-rose-300">-{examResult.negativeMarks}</span>
              </div>
              <div>
                <span className="text-[11px] text-white/70 block">{lang === 'hi' ? 'सही प्रश्न' : 'Correct'}</span>
                <span className="text-xl font-extrabold text-emerald-300">{examResult.correct}</span>
              </div>
              <div>
                <span className="text-[11px] text-white/70 block">{lang === 'hi' ? 'गलत प्रश्न' : 'Incorrect'}</span>
                <span className="text-xl font-extrabold text-rose-300">{examResult.incorrect}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setExamStarted(false);
                setExamFinished(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'hi' ? 'पुनः टेस्ट दें' : 'Retake Exam'}</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenVault();
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'hi' ? 'गलतियों का स्मार्ट रिवीजन' : 'Review Mistakes in Vault'}</span>
            </button>
          </div>

          {/* Filter Pills for Question Review */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${reviewFilter === 'all' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
            >
              {lang === 'hi' ? 'सभी' : 'All'} ({questions.length})
            </button>
            <button
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1 rounded-lg transition-all ${reviewFilter === 'wrong' ? 'bg-rose-500 text-white shadow-sm' : 'text-rose-600 dark:text-rose-400'}`}
            >
              {lang === 'hi' ? 'गलत' : 'Wrong'} ({examResult.incorrect})
            </button>
            <button
              onClick={() => setReviewFilter('correct')}
              className={`px-3 py-1 rounded-lg transition-all ${reviewFilter === 'correct' ? 'bg-emerald-500 text-white shadow-sm' : 'text-emerald-600 dark:text-emerald-400'}`}
            >
              {lang === 'hi' ? 'सही' : 'Correct'} ({examResult.correct})
            </button>
            <button
              onClick={() => setReviewFilter('unattempted')}
              className={`px-3 py-1 rounded-lg transition-all ${reviewFilter === 'unattempted' ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white' : 'text-slate-500'}`}
            >
              {lang === 'hi' ? 'अनुत्तरित' : 'Unattempted'} ({examResult.unattempted})
            </button>
          </div>
        </div>

        {/* Detailed Solutions List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {lang === 'hi' ? 'प्रश्नोत्तर एवं विस्तृत समाधान' : 'Detailed Question Review & Solutions'}
          </h3>

          <div className="space-y-4">
            {filteredQuestions.map((q, qIndex) => {
              const ans = userAnswers[q.id];
              const selected = ans?.selectedOption;
              const isFifth = selected === 4;
              const isCorrect = selected === q.correctOption;
              const isAttempted = selected !== undefined && selected !== null && !isFifth;

              return (
                <div 
                  key={q.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Q.{qIndex + 1} • {q.subtopic}
                    </span>
                    <div className="flex items-center gap-2">
                      {isAttempted ? (
                        isCorrect ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> +1.33
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> -0.44
                          </span>
                        )
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {isFifth ? (lang === 'hi' ? 'विकल्प 5 (अनुत्तरित)' : 'Option 5 (Not Attempted)') : (lang === 'hi' ? 'छोड़ा गया' : 'Unattempted')}
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {lang === 'hi' ? q.question.hi : q.question.en}
                  </h4>

                  {/* Options status */}
                  <div className="space-y-2">
                    {(lang === 'hi' ? q.options.hi : q.options.en).map((opt, optIdx) => {
                      const isThisCorrect = optIdx === q.correctOption;
                      const isThisUserSelected = selected === optIdx;

                      let rowStyle = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200';
                      if (isThisCorrect) {
                        rowStyle = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isThisUserSelected && !isThisCorrect) {
                        rowStyle = 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-900 dark:text-rose-200';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${rowStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full border flex items-center justify-center font-bold text-xs shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isThisCorrect && (
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                              {lang === 'hi' ? 'सही उत्तर' : 'Correct Answer'}
                            </span>
                          )}
                          {isThisUserSelected && !isThisCorrect && (
                            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                              {lang === 'hi' ? 'आपका चयन' : 'Your Answer'}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Comprehensive Explanation */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1.5 text-xs sm:text-sm">
                    <span className="font-extrabold text-amber-800 dark:text-amber-300 block uppercase tracking-wider text-[11px]">
                      {lang === 'hi' ? 'विस्तृत समाधान व तथ्य:' : 'Solution & RPSC Notes:'}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {lang === 'hi' ? q.explanation.hi : q.explanation.en}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Simulator View
  const currentAnswer = userAnswers[currentQ?.id];
  const selectedOpt = currentAnswer?.selectedOption;
  const isMarked = currentAnswer?.markedForReview;

  return (
    <div className="max-w-7xl mx-auto space-y-4 animate-fadeIn pb-12">
      {/* Top Test Navigation Header */}
      <div className="sticky top-14 sm:top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-black bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            {selectedMode === 'full' ? 'Full 150Q' : 'Mini 25Q'}
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
            Q. {currentIndex + 1}/{questions.length}
          </span>
        </div>

        {/* Mobile Palette Drawer Trigger */}
        <button
          onClick={() => {
            sounds.playClick();
            setMobilePaletteOpen(true);
          }}
          className="lg:hidden px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
        >
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          <span>{lang === 'hi' ? 'पैलेट' : 'Palette'}</span>
        </button>

        {/* Live Countdown Timer */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 text-white font-mono text-xs sm:text-sm font-bold shadow-inner">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{formatTime(timeRemainingSeconds)}</span>
        </div>

        {/* Submit Exam Button */}
        <button
          onClick={() => {
            if (window.confirm(lang === 'hi' ? 'क्या आप निश्चित रूप से परीक्षा सबमिट करना चाहते हैं?' : 'Are you sure you want to submit the exam?')) {
              submitExam();
            }
          }}
          className="px-3 sm:px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[11px] sm:text-sm font-black shadow-md shadow-rose-600/20 transition-colors"
        >
          {lang === 'hi' ? 'सबमिट' : 'Submit'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left 3 Cols: Question Area */}
        <div className="lg:col-span-3 space-y-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Question Topic & Year Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              {currentQ?.subtopic}
            </span>
            <div className="flex items-center gap-2">
              {currentQ?.paperName && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {currentQ.paperName}
                </span>
              )}
              {currentQ?.importance === 'HIGH_YIELD' && (
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                  High-Yield
                </span>
              )}
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
              {lang === 'hi' ? currentQ?.question.hi : currentQ?.question.en}
            </h3>
          </div>

          {/* MCQ Options */}
          <div className="space-y-3 pt-2">
            {(lang === 'hi' ? currentQ?.options.hi : currentQ?.options.en).map((opt, optIdx) => {
              const isSelected = selectedOpt === optIdx;
              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-100 font-semibold shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border ${
                      isSelected
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-sm sm:text-base">{opt}</span>
                  </div>
                </div>
              );
            })}

            {/* Official 5th Option per RPSC Mandate */}
            {useFifthOption && (
              <div
                onClick={() => handleSelectOption(4)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  selectedOpt === 4
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-purple-300 bg-slate-50/30 dark:bg-slate-800/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border ${
                    selectedOpt === 4
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    E
                  </span>
                  <span className="text-sm sm:text-base italic text-slate-700 dark:text-slate-300">
                    {lang === 'hi' ? 'अनुत्तरित प्रश्न (Question not attempted - 5वां विकल्प)' : 'Question Not Attempted (Official RPSC 5th Option)'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Button Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMarkReview}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                  isMarked
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-purple-300 dark:border-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{isMarked ? (lang === 'hi' ? 'समीक्षित' : 'Marked') : (lang === 'hi' ? 'समीक्षा हेतु चिन्हित करें' : 'Mark for Review')}</span>
              </button>

              <button
                onClick={handleClearResponse}
                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {lang === 'hi' ? 'उत्तर हटाएं' : 'Clear'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentIndex === 0}
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'hi' ? 'पिछला' : 'Previous'}</span>
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 transition-colors flex items-center gap-1"
              >
                <span>{lang === 'hi' ? 'सहेजें व आगे बढ़ें' : 'Save & Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Question Palette (Desktop) */}
        <div className="hidden lg:block space-y-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-32">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {lang === 'hi' ? 'प्रश्न पैलेट (Question Palette)' : 'Question Palette'}
          </h4>

          {/* Palette Legend */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500 shrink-0"></span>
              <span>{lang === 'hi' ? 'उत्तर दिया' : 'Answered'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-purple-600 shrink-0"></span>
              <span>{lang === 'hi' ? 'समीक्षित' : 'Marked'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-500 shrink-0"></span>
              <span>{lang === 'hi' ? 'वर्तमान' : 'Current'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-slate-200 dark:bg-slate-700 shrink-0"></span>
              <span>{lang === 'hi' ? 'शेष' : 'Not Visited'}</span>
            </div>
          </div>

          {/* Palette Grid */}
          <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-1">
            {questions.map((q, idx) => {
              const ans = userAnswers[q.id];
              const isCurr = idx === currentIndex;
              const hasAns = ans?.selectedOption !== undefined && ans?.selectedOption !== null;
              const isMark = ans?.markedForReview;

              let btnBg = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
              if (isCurr) {
                btnBg = 'bg-amber-500 text-white font-black ring-2 ring-amber-400';
              } else if (isMark) {
                btnBg = 'bg-purple-600 text-white font-bold';
              } else if (hasAns) {
                btnBg = 'bg-emerald-500 text-white font-bold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => navigateToQuestion(idx)}
                  className={`w-full aspect-square rounded-xl text-xs flex items-center justify-center transition-all ${btnBg}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Palette Bottom Drawer Modal */}
      {mobilePaletteOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl w-full max-h-[80vh] flex flex-col p-5 border-t border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  {lang === 'hi' ? 'प्रश्न पैलेट (150 प्रश्न)' : 'Question Palette'}
                </h3>
                <span className="text-xs text-slate-500">
                  {questions.length} {lang === 'hi' ? 'कुल प्रश्न' : 'Total Questions'}
                </span>
              </div>
              <button
                onClick={() => setMobilePaletteOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
              >
                {lang === 'hi' ? 'बंद करें' : 'Close'}
              </button>
            </div>

            {/* Mobile Legend */}
            <div className="grid grid-cols-4 gap-1 text-[10px] font-bold text-center">
              <span className="p-1 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">Answered</span>
              <span className="p-1 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300">Marked</span>
              <span className="p-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">Current</span>
              <span className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Remaining</span>
            </div>

            {/* Mobile Grid */}
            <div className="grid grid-cols-6 gap-2 overflow-y-auto max-h-64 py-2 pr-1">
              {questions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isCurr = idx === currentIndex;
                const hasAns = ans?.selectedOption !== undefined && ans?.selectedOption !== null;
                const isMark = ans?.markedForReview;

                let btnBg = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                if (isCurr) {
                  btnBg = 'bg-amber-500 text-white font-black ring-2 ring-amber-400';
                } else if (isMark) {
                  btnBg = 'bg-purple-600 text-white font-bold';
                } else if (hasAns) {
                  btnBg = 'bg-emerald-500 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      navigateToQuestion(idx);
                      setMobilePaletteOpen(false);
                    }}
                    className={`aspect-square rounded-xl text-xs flex items-center justify-center font-bold transition-all ${btnBg}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
