import React from 'react';
import { 
  Award, 
  Flame, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  BookOpen, 
  Compass, 
  Brain, 
  Gamepad2, 
  Layers 
} from 'lucide-react';
import { sounds } from '../utils/audio';

export type ActiveTab = 'dashboard' | 'mock' | 'practice' | 'vault' | 'game';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  xp: number;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  darkMode,
  setDarkMode,
  xp,
  streak
}) => {
  const [soundOn, setSoundOn] = React.useState(sounds.isEnabled());

  const handleToggleSound = () => {
    const updated = sounds.toggleSound();
    setSoundOn(updated);
    if (updated) sounds.playClick();
  };

  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      labelEn: 'PYQ Trends',
      labelHi: 'विश्लेषण व ट्रेंड',
      icon: Compass
    },
    {
      id: 'mock' as ActiveTab,
      labelEn: 'Mock Exam',
      labelHi: 'मॉक टेस्ट (150 प्रश्न)',
      icon: Layers
    },
    {
      id: 'practice' as ActiveTab,
      labelEn: 'Unlimited Practice',
      labelHi: 'विषयवार अभ्यास',
      icon: BookOpen
    },
    {
      id: 'vault' as ActiveTab,
      labelEn: 'High-Yield SRS',
      labelHi: 'रिवीजन वॉल्ट',
      icon: Brain
    },
    {
      id: 'game' as ActiveTab,
      labelEn: 'Game Arena 🎮',
      labelHi: 'खेल-खेल में सीखें 🎮',
      icon: Gamepad2,
      badge: 'NEW'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-amber-200/80 dark:border-slate-800 shadow-sm transition-colors pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => { setActiveTab('dashboard'); sounds.playClick(); }}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-rose-700 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-base sm:text-xl tracking-tighter">रा</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  {lang === 'hi' ? 'RAS योद्धा' : 'RAS Yoddha'}
                </span>
                <span className="px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded border border-amber-300 dark:border-amber-700">
                  Prelims
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                {lang === 'hi' ? 'RPSC विश्लेषण, असीमित प्रश्न व गेम एरिना' : 'PYQs, Unlimited Questions & Gaming Arena'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab(item.id);
                  }}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-rose-500 text-white rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Utility Toolbar (Stats, Lang, Sound, Dark mode) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Gamification Quick Badge */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 dark:bg-slate-800/80 rounded-full border border-amber-200/60 dark:border-slate-700 text-[11px] font-bold text-amber-900 dark:text-amber-300 shadow-inner">
              <span className="flex items-center gap-0.5 text-orange-600 dark:text-orange-400">
                <Flame className="w-3.5 h-3.5 fill-current" />
                {streak}d
              </span>
              <span className="w-0.5 h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
              <span className="flex items-center gap-0.5 text-amber-700 dark:text-amber-300">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                {xp}
              </span>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => {
                sounds.playClick();
                setLang(lang === 'hi' ? 'en' : 'hi');
              }}
              title="Toggle Hindi / English"
              className="px-2 py-1 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-slate-300 dark:border-slate-700 transition-colors"
            >
              {lang === 'hi' ? 'EN' : 'हिन्दी'}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundOn ? 'Mute Sounds' : 'Enable Sounds'}
              className="p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                sounds.playClick();
                setDarkMode(!darkMode);
              }}
              title="Toggle Theme"
              className="p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
