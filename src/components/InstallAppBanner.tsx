import React, { useState, useEffect } from 'react';
import { Download, Share2, Smartphone, X, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallAppBannerProps {
  lang: 'en' | 'hi';
}

export const InstallAppBanner: React.FC<InstallAppBannerProps> = ({ lang }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showIOSGuide, setShowIOSGuide] = useState<boolean>(false);

  useEffect(() => {
    // Check if running already in standalone PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setShowBanner(false);
      return;
    }

    // Check if dismissed before
    const isDismissed = sessionStorage.getItem('ras_install_dismissed') === 'true';
    if (isDismissed) return;

    // Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isAppleDevice);

    if (isAppleDevice) {
      setShowBanner(true);
    }

    // Capture Android / Chrome PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    sounds.playClick();
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) {
      alert(lang === 'hi' 
        ? 'अपने ब्राउज़र मेन्यू में जाकर "Add to Home Screen" या "ऐप इंस्टॉल करें" पर क्लिक करें।' 
        : 'Open browser menu and tap "Add to Home Screen" or "Install App".');
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    sounds.playClick();
    setShowBanner(false);
    sessionStorage.setItem('ras_install_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="relative z-40 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-white px-3 py-2.5 sm:px-6 shadow-md transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4 text-amber-200" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs sm:text-sm tracking-tight">
                  {lang === 'hi' ? 'मोबाइल ऐप इंस्टॉल करें' : 'Install Mobile App'}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-yellow-400 text-slate-900 uppercase">
                  PWA
                </span>
              </div>
              <p className="text-[11px] text-amber-100 truncate hidden xs:block">
                {lang === 'hi' ? 'फोन पर 1-टैप में खोलें • 100% ऑफलाइन कार्य करता है' : 'Runs like native app on Android & iOS • 100% Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-xl bg-white text-orange-700 hover:bg-amber-50 font-black text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'इंस्टॉल' : 'Install'}</span>
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Safari Instruction Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full space-y-4 border border-slate-200 dark:border-slate-800 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center mx-auto">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
              {lang === 'hi' ? 'iPhone / iPad पर इंस्टॉल करें' : 'Install on iPhone / iPad'}
            </h3>
            <div className="space-y-3 text-left text-xs text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">1</span>
                <span>{lang === 'hi' ? 'सफारी ब्राउज़र में नीचे शेयर (Share) बटन दबाएं' : 'Tap the Safari Share button below'}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">2</span>
                <span>{lang === 'hi' ? 'सूची में "Add to Home Screen" चुनें' : 'Scroll down & tap "Add to Home Screen"'}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">3</span>
                <span>{lang === 'hi' ? 'ऊपर दाईं ओर "Add" पर टैप करें' : 'Tap "Add" in top-right corner'}</span>
              </p>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs"
            >
              {lang === 'hi' ? 'समझ गया' : 'Got It'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
