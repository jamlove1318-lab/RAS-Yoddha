import React, { useState } from 'react';
import { 
  RotateCcw, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  Brain, 
  Flame, 
  BookOpen, 
  Award, 
  Layers, 
  Check, 
  ArrowRight,
  Filter,
  Eye,
  AlertTriangle,
  Zap,
  Play
} from 'lucide-react';
import { Question, SubjectId } from '../types';
import { 
  getAllHighImportanceQuestions, 
  getDueRevisionQuestions, 
  getMistakeQuestions 
} from '../services/revisionService';
import { 
  getSRSItems, 
  recordAnswerInSRS, 
  clearMistake 
} from '../services/srsEngine';
import { sounds } from '../utils/audio';

interface RevisionHubProps {
  lang: 'en' | 'hi';
  onAddXP: (amt: number) => void;
}

export const RevisionHub: React.FC<RevisionHubProps> = ({ lang, onAddXP }) => {
  const [activeMode, setActiveMode] = useState<'drill' | 'cards' | 'mistakes'>('drill');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  // Drill State
  const [drillActive, setDrillActive] = useState<boolean>(false);
  const [drillQuestions, setDrillQuestions] = useState<Question[]>([]);
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [drillScore, setDrillScore] = useState<number>(0);
  const [drillComplete, setDrillComplete] = useState<boolean>(false);

  // Flashcards revealed state
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});

  const allHighYield = getAllHighImportanceQuestions(subjectFilter);
  const dueQuestions = getDueRevisionQuestions();
  const mistakeQuestions = getMistakeQuestions();
  const srsItems = getSRSItems();

  // Box statistics
  const boxCounts = [0, 0, 0, 0, 0, 0];
  Object.values(srsItems).forEach(item => {
    if (item.box >= 1 && item.box <= 5) {
      boxCounts[item.box] += 1;
    }
  });

  const handleStartDrill = (questionsPool: Question[], limit: number = 0) => {
    sounds.playClick();
    const shuffled = [...questionsPool].sort(() => 0.5 - Math.random());
    const selected = limit > 0 ? shuffled.slice(0, limit) : shuffled;

    if (selected.length === 0) return;

    setDrillQuestions(selected);
    setDrillIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setDrillScore(0);
    setDrillComplete(false);
    setDrillActive(true);
  };

  const handleDrillSelectOption = (idx: number) => {
    if (selectedAnswer !== null) return;
    sounds.playClick();
    setSelectedAnswer(idx);
    setShowExplanation(true);

    const currentQ = drillQuestions[drillIndex];
    const isCorrect = idx === currentQ.correctOption;

    if (isCorrect) {
      sounds.playCorrect();
      onAddXP(20);
      setDrillScore(prev => prev + 1);
    } else {
      sounds.playWrong();
    }

    recordAnswerInSRS(currentQ, isCorrect);
    if (isCorrect) {
      clearMistake(currentQ.id);
    }
  };

  const handleDrillNext = () => {
    sounds.playClick();
    setSelectedAnswer(null);
    setShowExplanation(false);

    if (drillIndex < drillQuestions.length - 1) {
      setDrillIndex(prev => prev + 1);
    } else {
      sounds.playLevelUp();
      setDrillComplete(true);
    }
  };

  const toggleRevealCard = (id: string) => {
    sounds.playClick();
    setRevealedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardFeedback = (question: Question, success: boolean) => {
    sounds.playClick();
    if (success) {
      sounds.playCorrect();
      onAddXP(20);
      clearMistake(question.id);
    } else {
      sounds.playWrong();
    }
    recordAnswerInSRS(question, success);
    setRevealedCards(prev => ({ ...prev, [question.id]: false }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-14">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-orange-600/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-black backdrop-blur-md">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'उच्च-महत्व प्रश्न रिवीजन हब' : 'High-Importance Revision Hub'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {lang === 'hi' ? 'जब चाहें महत्वपूर्ण प्रश्नों का रिवीजन करें' : 'Revise High-Yield Questions Anytime'}
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
              {lang === 'hi'
                ? 'यह विशेष हब केवल RPSC के सर्वाधिक महत्वपूर्ण (High-Yield) प्रश्नों, समसामयिकी और आपकी पिछली गलतियों के लिए समर्पित है। अपनी सुविधानुसार कभी भी अभ्यास करें।'
                : 'Dedicated revision center for verified high-yield RPSC Prelims questions, live current affairs, and previous mistakes.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleStartDrill(dueQuestions.length > 0 ? dueQuestions : allHighYield, 15)}
              className="px-5 py-2.5 rounded-2xl bg-white text-orange-700 hover:bg-amber-50 font-black text-xs sm:text-sm shadow-lg active:scale-95 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-600" />
              <span>{lang === 'hi' ? 'त्वरित 15Q रिवीजन' : 'Quick 15Q Drill'}</span>
            </button>
          </div>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          <div className="p-3 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
            <span className="text-[10px] uppercase font-bold text-yellow-300 block">
              {lang === 'hi' ? 'कुल महत्वपूर्ण प्रश्न' : 'Total High-Yield'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-white">
              {allHighYield.length}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
            <span className="text-[10px] uppercase font-bold text-amber-200 block">
              {lang === 'hi' ? 'रिवीजन हेतु तैयार' : 'Due for Review'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-white">
              {dueQuestions.length}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
            <span className="text-[10px] uppercase font-bold text-emerald-300 block">
              {lang === 'hi' ? 'कंठस्थ (Mastered)' : 'Mastered'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-white">
              {boxCounts[4] + boxCounts[5]}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
            <span className="text-[10px] uppercase font-bold text-rose-300 block">
              {lang === 'hi' ? 'गलतियां (Mistakes)' : 'Mistakes in Vault'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-white">
              {mistakeQuestions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'drill', labelHi: '🎯 त्वरित रिवीजन टेस्ट', labelEn: '🎯 Interactive Drill' },
            { id: 'cards', labelHi: '💡 फ्लैशकार्ड व समाधान', labelEn: '💡 High-Yield Flashcards' },
            { id: 'mistakes', labelHi: `⚠️ गलती सुधार (${mistakeQuestions.length})`, labelEn: `⚠️ Mistakes (${mistakeQuestions.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveMode(tab.id as any);
                setDrillActive(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                activeMode === tab.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {lang === 'hi' ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Subject Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {lang === 'hi' ? 'विषय:' : 'Subject:'}
          </span>
          <select
            value={subjectFilter}
            onChange={(e) => {
              sounds.playClick();
              setSubjectFilter(e.target.value);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">{lang === 'hi' ? 'सभी विषय (All Subjects)' : 'All Subjects'}</option>
            <option value="current_affairs">{lang === 'hi' ? 'दैनिक समसामयिकी' : 'Current Affairs'}</option>
            <option value="raj_history_art">{lang === 'hi' ? 'राजस्थान इतिहास व कला' : 'Rajasthan History & Art'}</option>
            <option value="raj_geography">{lang === 'hi' ? 'राजस्थान भूगोल' : 'Rajasthan Geography'}</option>
            <option value="raj_polity_admin">{lang === 'hi' ? 'राजस्थान राजव्यवस्था' : 'Rajasthan Polity'}</option>
            <option value="raj_economy">{lang === 'hi' ? 'राजस्थान अर्थव्यवस्था' : 'Rajasthan Economy'}</option>
            <option value="indian_history">{lang === 'hi' ? 'भारतीय इतिहास' : 'Indian History'}</option>
            <option value="indian_polity">{lang === 'hi' ? 'भारतीय संविधान' : 'Indian Polity'}</option>
            <option value="science_tech">{lang === 'hi' ? 'विज्ञान एवं प्रौद्योगिकी' : 'Science & Tech'}</option>
          </select>
        </div>
      </div>

      {/* MODE 1: INTERACTIVE DRILL */}
      {activeMode === 'drill' && (
        <div className="space-y-4">
          {!drillActive ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                  {lang === 'hi' ? 'उच्च-महत्व प्रश्नों का अभ्यास सत्र' : 'Start High-Yield Revision Session'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  {lang === 'hi'
                    ? 'अपनी गति से हल करें। प्रत्येक प्रश्न के तुरंत बाद विस्तृत द्विभाषी व्याख्या प्राप्त करें।'
                    : 'Practice at your own pace with instant bilingual explanations and retention tracking.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => handleStartDrill(allHighYield, 10)}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{lang === 'hi' ? '10 प्रश्न रिवीजन' : '10 Questions'}</span>
                </button>

                <button
                  onClick={() => handleStartDrill(allHighYield, 25)}
                  className="px-5 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{lang === 'hi' ? '25 प्रश्न रिवीजन' : '25 Questions'}</span>
                </button>

                <button
                  onClick={() => handleStartDrill(allHighYield, 0)}
                  className="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Layers className="w-4 h-4" />
                  <span>{lang === 'hi' ? `सभी ${allHighYield.length} प्रश्न` : `All ${allHighYield.length} Questions`}</span>
                </button>
              </div>
            </div>
          ) : !drillComplete ? (
            /* Active Drill Question */
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400">
                    {lang === 'hi' ? `प्रश्न ${drillIndex + 1} / ${drillQuestions.length}` : `Question ${drillIndex + 1} of ${drillQuestions.length}`}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    {drillQuestions[drillIndex].subtopic}
                  </span>
                </div>

                <div className="font-bold text-emerald-600 dark:text-emerald-400">
                  {drillScore} {lang === 'hi' ? 'सही' : 'Correct'}
                </div>
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/60 dark:border-slate-700">
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                  {lang === 'hi' ? drillQuestions[drillIndex].question.hi : drillQuestions[drillIndex].question.en}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {(lang === 'hi' ? drillQuestions[drillIndex].options.hi : drillQuestions[drillIndex].options.en).map((opt, idx) => {
                  const currentQ = drillQuestions[drillIndex];
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === currentQ.correctOption;
                  const hasAnswered = selectedAnswer !== null;

                  let style = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';
                  if (hasAnswered) {
                    if (isCorrect) {
                      style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/20';
                    } else if (isSelected) {
                      style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-2 ring-rose-500/20';
                    } else {
                      style = 'border-slate-200 dark:border-slate-800 opacity-50 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleDrillSelectOption(idx)}
                      disabled={hasAnswered}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${style}`}
                    >
                      <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                        hasAnswered && isCorrect
                          ? 'bg-emerald-500 text-white'
                          : hasAnswered && isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold flex-1 leading-snug">
                        {opt}
                      </span>
                      {hasAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
                      {hasAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {showExplanation && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'विस्तृत परीक्षा व्याख्या' : 'Detailed Analysis'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {lang === 'hi' ? drillQuestions[drillIndex].explanation.hi : drillQuestions[drillIndex].explanation.en}
                  </p>
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setDrillActive(false)}
                  className="px-3.5 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800"
                >
                  {lang === 'hi' ? 'रिवीजन समाप्त करें' : 'Exit Session'}
                </button>

                <button
                  onClick={handleDrillNext}
                  disabled={selectedAnswer === null}
                  className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm shadow-md flex items-center gap-2 active:scale-95 transition-all ${
                    selectedAnswer !== null
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>{drillIndex < drillQuestions.length - 1 ? (lang === 'hi' ? 'अगला प्रश्न' : 'Next Question') : (lang === 'hi' ? 'परिणाम देखें' : 'View Result')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Drill Complete Card */
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 text-center space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                  {lang === 'hi' ? 'रिवीजन सत्र सफलतापूर्वक पूर्ण!' : 'Revision Session Completed!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {lang === 'hi'
                    ? `आपने ${drillQuestions.length} में से ${drillScore} प्रश्नों का सही उत्तर दिया है।`
                    : `You answered ${drillScore} out of ${drillQuestions.length} questions correctly.`}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => handleStartDrill(allHighYield, drillQuestions.length)}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'पुनः रिवीजन करें' : 'Revise Again'}</span>
                </button>

                <button
                  onClick={() => setDrillActive(false)}
                  className="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-100"
                >
                  <span>{lang === 'hi' ? 'मुख्य मेनू' : 'Main Menu'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: FLASHCARDS & REVEAL */}
      {activeMode === 'cards' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {allHighYield.map((q, idx) => {
              const isRevealed = !!revealedCards[q.id];
              const srs = srsItems[q.id];
              const box = srs ? srs.box : 1;

              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {q.subtopic}
                    </span>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      Box {box} / 5
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {lang === 'hi' ? q.question.hi : q.question.en}
                  </p>

                  {/* Reveal / Answer section */}
                  {isRevealed ? (
                    <div className="space-y-3 pt-2 animate-fadeIn">
                      <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                        <span className="text-[10px] uppercase font-black text-emerald-700 dark:text-emerald-300 block">
                          {lang === 'hi' ? 'सही उत्तर' : 'Correct Answer'}
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-100">
                          {lang === 'hi' ? q.options.hi[q.correctOption] : q.options.en[q.correctOption]}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                        <span className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 block">
                          {lang === 'hi' ? 'परीक्षा व्याख्या' : 'Official Analysis'}
                        </span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {lang === 'hi' ? q.explanation.hi : q.explanation.en}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <button
                          onClick={() => handleCardFeedback(q, false)}
                          className="px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-bold text-xs hover:bg-rose-100"
                        >
                          {lang === 'hi' ? 'पुनः अभ्यास आवश्यक' : 'Need Practice'}
                        </button>

                        <button
                          onClick={() => handleCardFeedback(q, true)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{lang === 'hi' ? 'याद है (Mastered)' : 'I Knew This'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleRevealCard(q.id)}
                      className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <Eye className="w-4 h-4 text-amber-600" />
                      <span>{lang === 'hi' ? 'उत्तर एवं व्याख्या देखें' : 'Show Answer & Explanation'}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 3: MISTAKES VAULT */}
      {activeMode === 'mistakes' && (
        <div className="space-y-4">
          {mistakeQuestions.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                {lang === 'hi' ? 'कोई गलती दर्ज नहीं है!' : 'Zero Mistakes in Notebook!'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {lang === 'hi'
                  ? 'उत्कृष्ट! जब भी आप किसी टेस्ट या अभ्यास में कोई प्रश्न गलत करेंगे, वह स्वतः यहां रिवीजन हेतु जुड़ जाएगा।'
                  : 'Great job! Any questions you get wrong during practice or mock exams will automatically appear here for correction.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {lang === 'hi' ? `सुधार हेतु कुल ${mistakeQuestions.length} गलतियां` : `${mistakeQuestions.length} mistakes to rectify`}
                </span>
                <button
                  onClick={() => handleStartDrill(mistakeQuestions)}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-sm flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'सभी गलतियों का टेस्ट लें' : 'Test All Mistakes'}</span>
                </button>
              </div>

              {mistakeQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-rose-200/80 dark:border-rose-900/40 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {q.subtopic}
                    </span>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        clearMistake(q.id);
                        // Force refresh by triggering small state change
                        setRevealedCards(prev => ({ ...prev }));
                      }}
                      className="text-[11px] font-bold text-slate-400 hover:text-slate-600"
                    >
                      {lang === 'hi' ? 'हटाएं' : 'Dismiss'}
                    </button>
                  </div>

                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {lang === 'hi' ? q.question.hi : q.question.en}
                  </p>

                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-xs">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 block">
                      {lang === 'hi' ? 'सही उत्तर: ' : 'Correct Answer: '}
                      {lang === 'hi' ? q.options.hi[q.correctOption] : q.options.en[q.correctOption]}
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      {lang === 'hi' ? q.explanation.hi : q.explanation.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
