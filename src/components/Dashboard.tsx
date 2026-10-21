import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  Award, 
  Compass, 
  Info,
  Calendar,
  Gamepad2,
  Brain,
  ShieldCheck
} from 'lucide-react';
import { SUBJECT_METADATA, PAST_YEAR_TRENDS, HIGH_YIELD_CONCEPTS_INDEX } from '../data/pyqAnalysis';
import { SubjectId } from '../types';
import { ActiveTab } from './Navbar';
import { sounds } from '../utils/audio';

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
  const [selectedYear, setSelectedYear] = useState<number>(2023);

  const currentTrend = PAST_YEAR_TRENDS.find(t => t.year === selectedYear) || PAST_YEAR_TRENDS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-white p-6 sm:p-10 shadow-xl shadow-orange-600/10">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-amber-100">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
            <span>{lang === 'hi' ? 'RPSC RAS प्रारंभिक परीक्षा तैयारी मंच' : 'RPSC RAS Prelims Master Preparation System'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {lang === 'hi' 
              ? 'विगत वर्षों का सटीक विश्लेषण, असीमित प्रश्न एवं गेमिफाइड अभ्यास'
              : 'Past Paper Blueprint, Unlimited MCQs & Gamified Practice'}
          </h1>

          <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
            {lang === 'hi'
              ? 'RPSC RAS प्रीलिम्स के 150 प्रश्न व 200 अंकों के वास्तविक पैटर्न पर आधारित। केवल महत्वपूर्ण प्रश्नों का वैज्ञानिक पुनरावर्तन (Spaced Repetition) और खेल-खेल में सीखने के 4 रोमांचक राउंड्स।'
              : 'Calibrated to the exact 150 Qs / 200 Marks RPSC pattern with -1/3 negative marking. Features intelligent spaced repetition so only high-yield concepts repeat, paired with game-like learning arenas.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sounds.playClick();
                onStartMock('full');
              }}
              className="px-5 py-2.5 rounded-xl bg-white text-orange-700 hover:bg-amber-50 font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
            >
              <Target className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform" />
              <span>{lang === 'hi' ? 'फुल 150Q मॉक शुरू करें' : 'Start Full 150Q Mock'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('game');
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-900/40 hover:bg-amber-900/60 border border-white/30 text-white font-bold text-sm backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4 text-yellow-300" />
              <span>{lang === 'hi' ? 'गेम एरिना खेलें' : 'Play Game Arena'}</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('vault');
              }}
              className="px-4 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <Brain className="w-4 h-4 text-amber-200" />
              <span>{lang === 'hi' ? 'स्मार्ट रिवीजन' : 'Smart Repetition'}</span>
            </button>
          </div>
        </div>

        {/* Decorative Rajputana Arch Motif */}
        <div className="absolute right-0 top-0 bottom-0 w-80 opacity-15 pointer-events-none hidden md:block">
          <svg viewBox="0 0 200 200" className="w-full h-full fill-current text-white">
            <path d="M100 0 C60 60 20 80 0 100 C20 120 60 140 100 200 C140 140 180 120 200 100 C180 80 140 60 100 0 Z" />
          </svg>
        </div>
      </div>

      {/* RPSC Past Year Trend Analysis Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>{lang === 'hi' ? 'विगत वर्षों का प्रश्नपत्र विश्लेषण' : 'RPSC Prelims Past Papers Deep Analysis'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {lang === 'hi' ? `RAS प्रारंभिक परीक्षा ${selectedYear} का विश्लेषण` : `RAS Prelims ${selectedYear} Paper Breakdown`}
            </h2>
          </div>

          {/* Year selector pills */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
            {PAST_YEAR_TRENDS.map((trend) => (
              <button
                key={trend.year}
                onClick={() => {
                  sounds.playClick();
                  setSelectedYear(trend.year);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedYear === trend.year
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                RAS {trend.year}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/50">
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              {lang === 'hi' ? 'सामान्य वर्ग कट-ऑफ' : 'General Cutoff'}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-900 dark:text-amber-200 mt-1">
              {currentTrend.cutoffGeneralMale}
              <span className="text-xs font-medium text-slate-500 ml-1">/ 200</span>
            </div>
            <span className="text-[11px] text-amber-600/80 dark:text-amber-400/80 block mt-0.5">
              {lang === 'hi' ? 'OBC के समतुल्य' : 'Equivalent to OBC'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/50">
            <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">
              {lang === 'hi' ? 'राजस्थान GK प्रश्न' : 'Rajasthan GK Weightage'}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-orange-900 dark:text-orange-200 mt-1">
              {currentTrend.subjectDistribution.raj_history_art + 
               currentTrend.subjectDistribution.raj_geography + 
               currentTrend.subjectDistribution.raj_polity_admin + 
               currentTrend.subjectDistribution.raj_economy}
              <span className="text-xs font-medium text-slate-500 ml-1">/ 150 Qs</span>
            </div>
            <span className="text-[11px] text-orange-600/80 dark:text-orange-400/80 block mt-0.5">
              ~45% of total paper!
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/50">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              {lang === 'hi' ? 'प्रकृति व कठिनाई' : 'Difficulty Rating'}
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-900 dark:text-emerald-200 mt-1">
              {currentTrend.difficultyRating}
            </div>
            <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 block mt-0.5">
              150 Qs, 180 Minutes
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/50">
            <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">
              {lang === 'hi' ? 'ऋणात्मक अंकन' : 'Negative Marking'}
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-purple-900 dark:text-purple-200 mt-1">
              - 1/3 (-0.44)
            </div>
            <span className="text-[11px] text-purple-600/80 dark:text-purple-400/80 block mt-0.5">
              +1.33 for correct
            </span>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === 'hi' ? 'RAS परीक्षक की रणनीति एवं मुख्य बिंदु' : 'Paper Pattern & Key Takeaways'}</span>
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {currentTrend.keyTakeaways.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Top 10 High-Yield Concepts Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>{lang === 'hi' ? 'स्मार्ट रिपीटीशन कोर' : 'High-Yield Topic Priority Index'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              {lang === 'hi' ? 'RPSC के पसंदीदा 10 अति-महत्वपूर्ण विषय (गारंटीड प्रश्न)' : 'Top 10 High-Yield RPSC Concepts (100% Recurrence)'}
            </h3>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('vault');
            }}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>{lang === 'hi' ? 'रिवीजन वॉल्ट देखें' : 'View SRS Vault'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {HIGH_YIELD_CONCEPTS_INDEX.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between gap-3 hover:border-amber-400 dark:hover:border-amber-500/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                  #{idx + 1}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {item.concept}
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.frequency}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                  {item.weight}% Yield
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject-Wise Unlimited Practice Hub */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>{lang === 'hi' ? 'पाठ्यक्रम अनुसार असीमित प्रश्न बैंक' : 'Complete Prelims Syllabus Hub'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            {lang === 'hi' ? 'विषयवार असीमित प्रश्न हल करें' : 'Practice Subject-Wise Unlimited MCQs'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {lang === 'hi'
              ? 'किसी भी विषय पर क्लिक करें और असीमित नए व विगत वर्षों के प्रश्न हल करें। सही उत्तरों के साथ तुरंत व्याख्या।'
              : 'Choose any subject below to practice limitless authentic and dynamically generated questions with deep bilingual solutions.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(SUBJECT_METADATA).map((subj) => (
            <div
              key={subj.id}
              onClick={() => {
                sounds.playClick();
                onSelectSubjectPractice(subj.id);
              }}
              className="group p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/60 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${subj.color} flex items-center justify-center text-white shadow-md`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {subj.weightage}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {lang === 'hi' ? subj.nameHi : subj.nameEn}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {subj.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>{lang === 'hi' ? 'असीमित अभ्यास शुरू करें' : 'Start Unlimited MCQs'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
