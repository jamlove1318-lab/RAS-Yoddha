import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  Target, 
  Award, 
  Brain, 
  Gamepad2, 
  Calendar,
  Flame,
  Clock,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Zap,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { SUBJECT_METADATA } from '../data/pyqAnalysis';
import { SubjectId } from '../types';
import { ActiveTab } from './Navbar';
import { sounds } from '../utils/audio';
import { getUserLiveStats, UserLiveStats } from '../services/srsEngine';
import { 
  getFormattedTodayDate, 
  getTodayDateString, 
  getTodayNewsCapsules,
  isTodayQuizCompleted,
  getTodayQuizResult 
} from '../services/currentAffairsService';
import { DailyCurrentAffairsModal } from './DailyCurrentAffairsModal';

interface DashboardProps {
  lang: 'en' | 'hi';
  setActiveTab: (tab: ActiveTab) => void;
  onSelectSubjectPractice: (subjectId: SubjectId) => void;
  onStartMock: (mode: 'full' | 'mini') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  lang,
  setActiveTab,
  onSelectSubjectPractice,
  onStartMock
}) => {
  const [stats, setStats] = useState<UserLiveStats>(getUserLiveStats());
  const [showCAModal, setShowCAModal] = useState<boolean>(false);
  const formattedToday = getFormattedTodayDate(lang);
  const todayKey = getTodayDateString();
  const isCACompleted = isTodayQuizCompleted(todayKey);
  const caResult = getTodayQuizResult(todayKey);
  const newsCapsules = getTodayNewsCapsules();

  // Refresh live user stats whenever dashboard mounts or updates
  useEffect(() => {
    setStats(getUserLiveStats());
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Functional Candidate Control Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedToday} • RPSC RAS Prelims Control Center</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
              {lang === 'hi' ? 'अभ्यर्थी डैशबोर्ड एवं दैनिक अध्ययन केंद्र' : 'Candidate Performance & Testing Hub'}
            </h1>
          </div>

          {/* Quick Launch Simulation CTAs */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                onStartMock('full');
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Target className="w-4 h-4 text-white" />
              <span>{lang === 'hi' ? '150Q फुल मॉक टेस्ट' : 'Full 150Q Mock'}</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onStartMock('mini');
              }}
              className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'hi' ? '25Q स्पीड ड्रिल' : '25Q Speed Drill'}</span>
            </button>
          </div>
        </div>

        {/* Live Personal Analytics Grid (Calculated from real attempts, zero fake UI) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 block">
              {lang === 'hi' ? 'कुल हल किए प्रश्न' : 'Total MCQs Solved'}
            </span>
            <div className="text-2xl font-black text-amber-900 dark:text-amber-100 mt-0.5">
              {stats.totalSolved}
            </div>
            <span className="text-[10px] text-amber-600/80 dark:text-amber-400/80">
              {stats.correctCount} {lang === 'hi' ? 'सही' : 'correct'} • {stats.incorrectCount} {lang === 'hi' ? 'गलत' : 'wrong'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 block">
              {lang === 'hi' ? 'सटीकता दर (Accuracy)' : 'Accuracy Rate'}
            </span>
            <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100 mt-0.5">
              {stats.accuracyRate}%
            </div>
            <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80">
              {lang === 'hi' ? 'कट-ऑफ लक्ष्य: 60%+' : 'Cutoff Target: 60%+'}
            </span>
          </div>

          <div 
            onClick={() => { sounds.playClick(); setActiveTab('revision'); }}
            className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 cursor-pointer hover:border-purple-400 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300">
                {lang === 'hi' ? 'आज रिवीजन हेतु लंबित' : 'SRS Due Today'}
              </span>
              <Brain className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-purple-900 dark:text-purple-100 mt-0.5">
              {stats.srsDueCount}
            </div>
            <span className="text-[10px] text-purple-600/80 dark:text-purple-400/80">
              {lang === 'hi' ? 'रिवीजन हेतु टैप करें' : 'Tap to review now'}
            </span>
          </div>

          <div 
            onClick={() => { sounds.playClick(); setActiveTab('revision'); }}
            className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 cursor-pointer hover:border-rose-400 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300">
                {lang === 'hi' ? 'गलती नोटबुक (Mistakes)' : 'Mistakes Notebook'}
              </span>
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            </div>
            <div className="text-2xl font-black text-rose-900 dark:text-rose-100 mt-0.5">
              {stats.mistakesCount}
            </div>
            <span className="text-[10px] text-rose-600/80 dark:text-rose-400/80">
              {lang === 'hi' ? 'सुधार हेतु टैप करें' : 'Tap to correct mistakes'}
            </span>
          </div>
        </div>
      </div>

      {/* TODAY'S CURRENT AFFAIRS MODULE (UPDATED DAILY ON CURRENT BASIS) */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 rounded-3xl p-5 sm:p-7 text-white shadow-xl shadow-orange-600/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-extrabold backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" />
              <span>{lang === 'hi' ? `दैनिक समसामयिकी • ${formattedToday}` : `Daily Current Affairs • ${formattedToday}`}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {lang === 'hi' ? 'लाइव एवं असीमित समसामयिकी केंद्र' : 'Live & Unlimited Current Affairs Hub'}
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-2xl">
              {lang === 'hi'
                ? 'राजस्थान सूजस, बजट, योजनाएं, नवीनतम नियुक्तियां, खेल एवं राष्ट्रीय घटनाक्रम पर आधारित। हर समय असीमित नए प्रश्नों के साथ स्वतः अपडेट।'
                : 'Real-time updated current events with Rajasthan Sujas, state welfare schemes, sports, awards, and national developments. Unlimited practice anytime.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setShowCAModal(true);
              }}
              className="px-5 py-2.5 rounded-2xl bg-white text-orange-700 hover:bg-amber-50 font-black text-xs sm:text-sm shadow-lg active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{lang === 'hi' ? 'असीमित समसामयिकी शुरू करें' : 'Start Unlimited Current Affairs'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Daily News Brief Capsules (Crisp Exam Takeaways) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {newsCapsules.map((capsule) => (
            <div 
              key={capsule.id}
              className="p-3.5 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 space-y-1.5 text-xs"
            >
              <span className="text-[10px] uppercase font-bold text-yellow-300 block">
                {capsule.category === 'rajasthan' ? (lang === 'hi' ? 'राजस्थान विशेष' : 'Rajasthan Focus') : (lang === 'hi' ? 'राष्ट्रीय/खेल' : 'National/Sports')}
              </span>
              <h4 className="font-extrabold text-white text-xs sm:text-sm leading-snug line-clamp-1">
                {lang === 'hi' ? capsule.headlineHi : capsule.headlineEn}
              </h4>
              <p className="text-amber-100/90 text-[11px] leading-relaxed line-clamp-2">
                {lang === 'hi' ? capsule.summaryHi : capsule.summaryEn}
              </p>
              <div className="text-[10px] text-amber-200 font-semibold pt-1 border-t border-white/10">
                ★ {lang === 'hi' ? capsule.examTakeawayHi : capsule.examTakeawayEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBJECT-WISE UNLIMITED PRACTICE HUB (DIRECT 1-TAP TESTING) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <BarChart3 className="w-4 h-4" />
              <span>{lang === 'hi' ? 'विषयवार असीमित प्रश्न बैंक' : 'Subject-Wise Unlimited Question Hub'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              {lang === 'hi' ? 'विषय चुनें और असीमित नए प्रश्न हल करें' : 'Select Subject for Limitless MCQ Drill'}
            </h3>
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'hi' ? 'केवल महत्वपूर्ण प्रश्न ही पुनरावर्तित होंगे' : 'Only High-Yield Questions Repeat'}
          </span>
        </div>

        {/* Subject Grid with Real Performance Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {Object.values(SUBJECT_METADATA).map((subj) => {
            const perf = stats.subjectPerformance[subj.id] || { solved: 0, correct: 0, accuracy: 0 };

            return (
              <div
                key={subj.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectSubjectPractice(subj.id);
                }}
                className="group p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {subj.weightage}
                    </span>

                    {/* Real Performance Badge */}
                    <span className="text-[11px] font-bold text-slate-500">
                      {perf.solved > 0 ? `${perf.accuracy}% (${perf.solved} Qs)` : (lang === 'hi' ? 'अभ्यास शुरू करें' : 'Start Practice')}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {lang === 'hi' ? subj.nameHi : subj.nameEn}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {subj.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'hi' ? 'असीमित प्रश्न हल करें' : 'Practice Unlimited MCQs'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Current Affairs Test Modal */}
      {showCAModal && (
        <DailyCurrentAffairsModal
          lang={lang}
          onClose={() => {
            setShowCAModal(false);
            setStats(getUserLiveStats());
          }}
          onAddXP={(amt) => {}}
        />
      )}
    </div>
  );
};
