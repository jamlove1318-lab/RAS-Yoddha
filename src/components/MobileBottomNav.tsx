import React from 'react';
import { 
  Compass, 
  Layers, 
  BookOpen, 
  Brain, 
  Gamepad2 
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { sounds } from '../utils/audio';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  lang: 'en' | 'hi';
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  lang
}) => {
  const tabs = [
    {
      id: 'dashboard' as ActiveTab,
      labelEn: 'Trends',
      labelHi: 'विश्लेषण',
      icon: Compass
    },
    {
      id: 'mock' as ActiveTab,
      labelEn: 'Mock',
      labelHi: 'मॉक टेस्ट',
      icon: Layers
    },
    {
      id: 'practice' as ActiveTab,
      labelEn: 'Practice',
      labelHi: 'अभ्यास',
      icon: BookOpen
    },
    {
      id: 'vault' as ActiveTab,
      labelEn: 'Vault',
      labelHi: 'रिवीजन',
      icon: Brain
    },
    {
      id: 'game' as ActiveTab,
      labelEn: 'Arena 🎮',
      labelHi: 'गेम 🎮',
      icon: Gamepad2,
      badge: 'NEW'
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[max(0.375rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-5 gap-1 items-center max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {/* Active Pill Glow */}
              {isActive && (
                <span className="absolute -top-1 w-8 h-1 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </div>

              <span className="text-[11px] tracking-tight mt-0.5 truncate w-full text-center">
                {lang === 'hi' ? tab.labelHi : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
