import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { InstallAppBanner } from './components/InstallAppBanner';
import { Dashboard } from './components/Dashboard';
import { ExamSimulator } from './components/ExamSimulator';
import { PracticeMode } from './components/PracticeMode';
import { HighYieldVault } from './components/HighYieldVault';
import { GameArena } from './components/GameArena';
import { SubjectId } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [lang, setLang] = useState<'en' | 'hi'>('hi');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [selectedPracticeSubject, setSelectedPracticeSubject] = useState<SubjectId>('raj_history_art');
  const [examInitialMode, setExamInitialMode] = useState<'full' | 'mini'>('mini');

  // Gamification Player Profile state
  const [xp, setXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ras_player_xp');
      return saved ? parseInt(saved, 10) : 150;
    } catch {
      return 150;
    }
  });

  const [streak] = useState<number>(3);

  // Sync Dark Mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddXP = (amount: number) => {
    setXp((prev) => {
      const next = prev + amount;
      try {
        localStorage.setItem('ras_player_xp', next.toString());
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleSelectSubjectPractice = (subjectId: SubjectId) => {
    setSelectedPracticeSubject(subjectId);
    setActiveTab('practice');
  };

  const handleStartMock = (mode: 'full' | 'mini') => {
    setExamInitialMode(mode);
    setActiveTab('mock');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans selection:bg-amber-500 selection:text-white pb-20 md:pb-0">
      {/* PWA Mobile Install Banner */}
      <InstallAppBanner lang={lang} />

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        xp={xp}
        streak={streak}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            lang={lang}
            setActiveTab={setActiveTab}
            onSelectSubjectPractice={handleSelectSubjectPractice}
            onStartMock={handleStartMock}
          />
        )}

        {activeTab === 'mock' && (
          <ExamSimulator
            key={examInitialMode}
            lang={lang}
            initialMode={examInitialMode}
            onExit={() => setActiveTab('dashboard')}
            onOpenVault={() => setActiveTab('vault')}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeMode
            key={selectedPracticeSubject}
            lang={lang}
            initialSubject={selectedPracticeSubject}
            onOpenVault={() => setActiveTab('vault')}
            onAddXP={handleAddXP}
          />
        )}

        {activeTab === 'vault' && (
          <HighYieldVault
            lang={lang}
            onAddXP={handleAddXP}
          />
        )}

        {activeTab === 'game' && (
          <GameArena
            lang={lang}
            onAddXP={handleAddXP}
            playerXP={xp}
          />
        )}
      </main>

      {/* Mobile Native App Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
      />

      {/* Footer (Desktop only or scroll bottom) */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm py-6 text-center text-xs text-slate-500 dark:text-slate-400 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            {lang === 'hi'
              ? 'RPSC RAS प्रारंभिक परीक्षा तैयारी मंच • विगत वर्षों का सटीक विश्लेषण एवं गेमिफाइड अभ्यास'
              : 'RPSC RAS Prelims Preparation System • Past Paper Blueprint & Gamified Learning'}
          </p>
          <p className="text-[11px] text-slate-400">
            Official Syllabus: General Knowledge and General Science (150 MCQs / 200 Marks / 3 Hours / -1/3 Negative Marking)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
