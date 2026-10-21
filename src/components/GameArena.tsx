import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Zap, 
  Flame, 
  Award, 
  Clock, 
  ShieldAlert, 
  Compass, 
  Crown, 
  Sparkles, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Swords, 
  Trophy,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question } from '../types';
import { INITIAL_QUESTION_BANK } from '../data/questionBank';
import { generateDynamicQuestion } from '../services/questionGenerator';
import { sounds } from '../utils/audio';

type GameMode = 'hub' | 'blitz' | 'conquest' | 'kbr' | 'boss';

interface GameArenaProps {
  lang: 'en' | 'hi';
  onAddXP: (amt: number) => void;
  playerXP: number;
}

export const GameArena: React.FC<GameArenaProps> = ({
  lang,
  onAddXP,
  playerXP
}) => {
  const [activeGame, setActiveGame] = useState<GameMode>('hub');

  // Blitz State
  const [blitzTime, setBlitzTime] = useState<number>(60);
  const [blitzScore, setBlitzScore] = useState<number>(0);
  const [blitzCombo, setBlitzCombo] = useState<number>(1);
  const [blitzRunning, setBlitzRunning] = useState<boolean>(false);
  const [blitzOver, setBlitzOver] = useState<boolean>(false);
  const [blitzQuestion, setBlitzQuestion] = useState<Question>(INITIAL_QUESTION_BANK[0]);

  // Kaun Banega RAS Officer State
  const [kbrLevel, setKbrLevel] = useState<number>(0);
  const [kbrQuestion, setKbrQuestion] = useState<Question>(INITIAL_QUESTION_BANK[0]);
  const [kbrFiftyUsed, setKbrFiftyUsed] = useState<boolean>(false);
  const [kbrPollUsed, setKbrPollUsed] = useState<boolean>(false);
  const [kbrSkipUsed, setKbrSkipUsed] = useState<boolean>(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [pollData, setPollData] = useState<number[] | null>(null);
  const [kbrGameOver, setKbrGameOver] = useState<boolean>(false);
  const [kbrWon, setKbrWon] = useState<boolean>(false);

  // Boss Battle State
  const [bossHP, setBossHP] = useState<number>(1000);
  const [playerHP, setPlayerHP] = useState<number>(500);
  const [bossQuestion, setBossQuestion] = useState<Question>(INITIAL_QUESTION_BANK[0]);
  const [bossBattleOver, setBossBattleOver] = useState<boolean>(false);
  const [bossWon, setBossWon] = useState<boolean>(false);

  // Conquest State (7 Divisions)
  const divisions = [
    { id: 'jaipur', name: 'Jaipur Division (ढूंढाड़)', color: 'from-amber-500 to-rose-600', landmark: 'Amer & Hawa Mahal' },
    { id: 'jodhpur', name: 'Jodhpur Division (मारवाड़)', color: 'from-blue-600 to-indigo-700', landmark: 'Mehrangarh & Thar' },
    { id: 'udaipur', name: 'Udaipur Division (मेवाड़)', color: 'from-emerald-600 to-teal-700', landmark: 'Kumbhalgarh & Lakes' },
    { id: 'kota', name: 'Kota Division (हाड़ौती)', color: 'from-orange-600 to-amber-700', landmark: 'Chambal & Bundi Taragarh' },
    { id: 'bikaner', name: 'Bikaner Division (जांगलदेश)', color: 'from-purple-600 to-violet-700', landmark: 'Junagarh & Karni Mata' },
    { id: 'ajmer', name: 'Ajmer Division (मेरवाड़ा)', color: 'from-cyan-600 to-blue-700', landmark: 'Taragarh & Pushkar' },
    { id: 'bharatpur', name: 'Bharatpur Division (मत्स्य)', color: 'from-rose-600 to-red-700', landmark: 'Lohagarh & Keoladeo' }
  ];
  const [conqueredDivisions, setConqueredDivisions] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ras_conquered_divs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeDivision, setActiveDivision] = useState<any | null>(null);
  const [divisionStage, setDivisionStage] = useState<number>(0);
  const [divisionQ, setDivisionQ] = useState<Question>(INITIAL_QUESTION_BANK[0]);

  // Helper trigger confetti
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  // 1. BLITZ TIMER EFFECT
  useEffect(() => {
    if (!blitzRunning || blitzTime <= 0) return;
    const interval = setInterval(() => {
      setBlitzTime(t => {
        if (t <= 1) {
          clearInterval(interval);
          setBlitzRunning(false);
          setBlitzOver(true);
          sounds.playLevelUp();
          fireConfetti();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [blitzRunning, blitzTime]);

  const startBlitz = () => {
    sounds.playClick();
    setBlitzTime(60);
    setBlitzScore(0);
    setBlitzCombo(1);
    setBlitzOver(false);
    setBlitzQuestion(generateDynamicQuestion(undefined, Date.now()));
    setBlitzRunning(true);
    setActiveGame('blitz');
  };

  const handleBlitzAnswer = (selectedIdx: number) => {
    if (!blitzRunning) return;
    sounds.playClick();

    if (selectedIdx === blitzQuestion.correctOption) {
      sounds.playCorrect();
      const points = 100 * blitzCombo;
      setBlitzScore(s => s + points);
      setBlitzCombo(c => Math.min(4, c + 1));
      onAddXP(20 * blitzCombo);
    } else {
      sounds.playWrong();
      setBlitzCombo(1);
    }

    setBlitzQuestion(generateDynamicQuestion(undefined, Date.now() + Math.random() * 1000));
  };

  // 2. KAUN BANEGA RAS OFFICER LOGIC
  const kbrRanks = [
    { title: 'Patwari (पटवारी)', marks: 'Level 1' },
    { title: 'Gram Vikas Adhikari - VDO (ग्राम विकास अधिकारी)', marks: 'Level 2' },
    { title: 'Junior Assistant (कनिष्ठ सहायक)', marks: 'Level 3' },
    { title: 'Sub-Inspector - Rajasthan Police (SI)', marks: 'Level 4' },
    { title: 'Commercial Taxes Inspector (कर निरीक्षक)', marks: 'Level 5' },
    { title: 'Tehsildar (तहसीलदार)', marks: 'Level 6' },
    { title: 'Block Development Officer - BDO (विकास अधिकारी)', marks: 'Level 7' },
    { title: 'District Transport Officer - DTO (परिवहन अधिकारी)', marks: 'Level 8' },
    { title: 'Additional District Magistrate - ADM (अतिरिक्त जिला कलेक्टर)', marks: 'Level 9' },
    { title: 'Sub-Divisional Magistrate - SDM / Top RAS Rank (एसडीएम / आरएएस टॉपर)', marks: 'CROWN' }
  ];

  const startKBR = () => {
    sounds.playClick();
    setKbrLevel(0);
    setKbrFiftyUsed(false);
    setKbrPollUsed(false);
    setKbrSkipUsed(false);
    setHiddenOptions([]);
    setPollData(null);
    setKbrGameOver(false);
    setKbrWon(false);
    setKbrQuestion(generateDynamicQuestion(undefined, Date.now()));
    setActiveGame('kbr');
  };

  const handleKBRAnswer = (idx: number) => {
    sounds.playClick();
    if (idx === kbrQuestion.correctOption) {
      sounds.playCorrect();
      onAddXP(50);
      setHiddenOptions([]);
      setPollData(null);

      if (kbrLevel >= kbrRanks.length - 1) {
        setKbrWon(true);
        setKbrGameOver(true);
        sounds.playLevelUp();
        fireConfetti();
      } else {
        setKbrLevel(prev => prev + 1);
        setKbrQuestion(generateDynamicQuestion(undefined, Date.now() + Math.random() * 5000));
      }
    } else {
      sounds.playWrong();
      setKbrGameOver(true);
    }
  };

  const useFiftyFifty = () => {
    if (kbrFiftyUsed) return;
    sounds.playClick();
    setKbrFiftyUsed(true);

    const correct = kbrQuestion.correctOption;
    const wrongIndices = [0, 1, 2, 3].filter(i => i !== correct);
    // pick 2 wrong indices to hide
    const toHide = wrongIndices.slice(0, 2);
    setHiddenOptions(toHide);
  };

  const useAudiencePoll = () => {
    if (kbrPollUsed) return;
    sounds.playClick();
    setKbrPollUsed(true);

    const correct = kbrQuestion.correctOption;
    const distribution = [10, 10, 10, 10];
    distribution[correct] = 70;
    setPollData(distribution);
  };

  const useSkipQuestion = () => {
    if (kbrSkipUsed) return;
    sounds.playClick();
    setKbrSkipUsed(true);
    setHiddenOptions([]);
    setPollData(null);
    setKbrQuestion(generateDynamicQuestion(undefined, Date.now() + 777));
  };

  // 3. BOSS BATTLE LOGIC
  const startBossBattle = () => {
    sounds.playClick();
    setBossHP(1000);
    setPlayerHP(500);
    setBossBattleOver(false);
    setBossWon(false);
    setBossQuestion(generateDynamicQuestion(undefined, Date.now()));
    setActiveGame('boss');
  };

  const handleBossAnswer = (idx: number) => {
    sounds.playClick();
    if (idx === bossQuestion.correctOption) {
      sounds.playBossHit();
      const isHigh = bossQuestion.importance === 'HIGH_YIELD';
      const damage = isHigh ? 300 : 200; // Critical hit on High-Yield Qs!
      const newBossHP = Math.max(0, bossHP - damage);
      setBossHP(newBossHP);
      onAddXP(40);

      if (newBossHP <= 0) {
        setBossWon(true);
        setBossBattleOver(true);
        sounds.playLevelUp();
        fireConfetti();
      } else {
        setBossQuestion(generateDynamicQuestion(undefined, Date.now() + Math.random() * 2000));
      }
    } else {
      sounds.playWrong();
      const newPlayerHP = Math.max(0, playerHP - 150);
      setPlayerHP(newPlayerHP);

      if (newPlayerHP <= 0) {
        setBossBattleOver(true);
        setBossWon(false);
      } else {
        setBossQuestion(generateDynamicQuestion(undefined, Date.now() + Math.random() * 2000));
      }
    }
  };

  // 4. CONQUEST LOGIC
  const startDivisionConquest = (div: any) => {
    sounds.playClick();
    setActiveDivision(div);
    setDivisionStage(0);
    setDivisionQ(generateDynamicQuestion('raj_history_art', Date.now()));
    setActiveGame('conquest');
  };

  const handleConquestAnswer = (idx: number) => {
    sounds.playClick();
    if (idx === divisionQ.correctOption) {
      sounds.playCorrect();
      onAddXP(30);

      if (divisionStage >= 2) {
        // Conquered!
        sounds.playLevelUp();
        fireConfetti();
        const updated = Array.from(new Set([...conqueredDivisions, activeDivision.id]));
        setConqueredDivisions(updated);
        localStorage.setItem('ras_conquered_divs', JSON.stringify(updated));
        setActiveGame('hub');
      } else {
        setDivisionStage(s => s + 1);
        setDivisionQ(generateDynamicQuestion('raj_geography', Date.now() + 123));
      }
    } else {
      sounds.playWrong();
      alert(lang === 'hi' ? 'गलत उत्तर! पुनः प्रयास करें।' : 'Incorrect! Try this division again.');
      setActiveGame('hub');
    }
  };

  // RENDER GAME HUB
  if (activeGame === 'hub') {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
        {/* Arena Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 border border-purple-800 shadow-2xl">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs font-bold text-purple-200">
              <Gamepad2 className="w-4 h-4 text-yellow-300 animate-bounce" />
              <span>{lang === 'hi' ? 'आरपीएससी गेम एरिना: खेल-खेल में RAS तैयारी' : 'RPSC Gamified Learning Arena'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              {lang === 'hi' ? 'गेम खेलें, याद रखें और RAS प्रीलिम्स क्रैक करें!' : 'Play, Retain & Master RPSC Prelims GK!'}
            </h1>
            <p className="text-purple-200 text-xs sm:text-sm leading-relaxed">
              {lang === 'hi'
                ? 'तनावमुक्त रहकर पढ़ाई करें! रैपिड फायर, कौन बनेगा RAS अधिकारी, संभाग विजय और कट-ऑफ बॉस बैटल जैसे 4 गेम राउंड्स के साथ अभ्यास करें।'
                : 'Study without exam burnout! Engage in 4 gamified battle and quest rounds designed specifically for high-yield RPSC retention.'}
            </p>
          </div>
        </div>

        {/* 4 Game Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1: Rapid Fire Blitz */}
          <div 
            onClick={startBlitz}
            className="group p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  60 SEC DRILL
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                  {lang === 'hi' ? '⚡ 60-सेकंड रैपिड फायर ब्लिट्ज़' : '⚡ 60-Sec Rapid Fire Blitz'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {lang === 'hi'
                    ? 'घड़ी की टिक-टिक के साथ जितने संभव हो उतने RAS तथ्य सही उत्तर दें। स्ट्रीक गुणक (Combo Multiplier) से स्कोर बढ़ाएं!'
                    : 'Answer as many high-yield RAS facts as possible before the clock hits zero. Build combos for huge scores!'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>{lang === 'hi' ? 'तुरंत खेलें' : 'Play Blitz'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Kaun Banega RAS Officer */}
          <div 
            onClick={startKBR}
            className="group p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-yellow-500 dark:hover:border-yellow-400 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center text-white shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition-transform">
                  <Crown className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300">
                  10 RANKS
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 group-hover:text-yellow-600 transition-colors">
                  {lang === 'hi' ? '👑 कौन बनेगा RAS अधिकारी (KBR)' : '👑 Kaun Banega RAS Officer'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {lang === 'hi'
                    ? 'पटवारी से शुरू करके एसडीएम (SDM) की कुर्सी तक पहुंचे। 3 लाइफलाइन (50:50, पब्लिक पोल, स्किप) का बुद्धिमानी से उपयोग करें!'
                    : 'Climb 10 administrative ranks from Patwari to SDM. Use 3 official lifelines (50:50, Audience Poll, Skip)!'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-yellow-600 dark:text-yellow-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>{lang === 'hi' ? 'रैंक मुकाबला शुरू करें' : 'Start Career Ladder'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Boss Battle */}
          <div 
            onClick={startBossBattle}
            className="group p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-rose-500 dark:hover:border-rose-400 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-red-800 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 group-hover:scale-110 transition-transform">
                  <Swords className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
                  BOSS FIGHT
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 group-hover:text-rose-600 transition-colors">
                  {lang === 'hi' ? '⚔️ कट-ऑफ राक्षस संग्राम (Boss Battle)' : '⚔️ Prelims Cutoff Boss Battle'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {lang === 'hi'
                    ? 'RPSC कट-ऑफ दैत्य से मुकाबला करें। सही उत्तर देकर बॉस की HP शून्य करें, गलत उत्तर पर आपकी HP कटेगी!'
                    : 'Battle the Cutoff Demon! Inflict critical damage with High-Yield questions to conquer the 1000 HP boss.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>{lang === 'hi' ? 'बॉस से लड़ें' : 'Fight Boss'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Division Conquest Map */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-800 flex items-center justify-center text-white shadow-lg shadow-teal-600/30">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
                  {conqueredDivisions.length} / 7 CONQUERED
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                  {lang === 'hi' ? '🗺️ राजस्थान संभाग विजय पथ' : '🗺️ 7 Divisions Conquest Quest'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {lang === 'hi'
                    ? 'राजस्थान के सातों प्रशासनिक संभागों के क्षेत्रीय GK प्रश्नों को हल करके पूरे राजस्थान को विजित करें।'
                    : 'Conquer the 7 administrative divisions of Rajasthan by answering their unique historical & geographical questions.'}
                </p>
              </div>

              {/* Division buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {divisions.map((d) => {
                  const isConquered = conqueredDivisions.includes(d.id);
                  return (
                    <button
                      key={d.id}
                      onClick={() => startDivisionConquest(d)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all flex items-center justify-between ${
                        isConquered
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                      }`}
                    >
                      <span className="line-clamp-1">{d.name.split(' ')[0]}</span>
                      {isConquered ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 1. BLITZ ACTIVE VIEW
  if (activeGame === 'blitz') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-12">
        {/* Blitz Stats Bar */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white shadow-xl">
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${blitzTime <= 10 ? 'text-rose-500 animate-ping' : 'text-amber-400'}`} />
            <span className="font-mono text-2xl font-black">{blitzTime}s</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-600/30 border border-orange-500/50">
            <Flame className="w-4 h-4 text-orange-400 fill-current animate-pulse" />
            <span className="font-extrabold text-sm text-orange-300">{blitzCombo}x COMBO</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Score</span>
            <span className="text-2xl font-black text-amber-300">{blitzScore}</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {blitzOver ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-5 shadow-xl">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto animate-bounce" />
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {lang === 'hi' ? 'समय समाप्त! उत्कृष्ट प्रयास!' : 'Time Up! Excellent Blitz Run!'}
            </h2>
            <div className="text-4xl font-black text-amber-600">
              {blitzScore} <span className="text-base text-slate-500 font-bold">PTS</span>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={startBlitz}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-sm shadow-md"
              >
                {lang === 'hi' ? 'पुनः खेलें' : 'Play Again'}
              </button>
              <button
                onClick={() => setActiveGame('hub')}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-sm"
              >
                {lang === 'hi' ? 'एरिना हब पर जाएं' : 'Back to Arena'}
              </button>
            </div>
          </div>
        ) : (
          /* Blitz Active Question */
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              {blitzQuestion.subtopic}
            </span>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
              {lang === 'hi' ? blitzQuestion.question.hi : blitzQuestion.question.en}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(lang === 'hi' ? blitzQuestion.options.hi : blitzQuestion.options.en).map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleBlitzAnswer(i)}
                  className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 text-left font-bold text-sm transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. KAUN BANEGA RAS OFFICER ACTIVE VIEW
  if (activeGame === 'kbr') {
    const currentRank = kbrRanks[kbrLevel] || kbrRanks[0];

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
        {/* KBR Header */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-700 to-yellow-800 text-white shadow-xl">
          <div>
            <span className="text-[10px] text-yellow-200 font-bold uppercase tracking-wider block">Target Designation</span>
            <h3 className="text-base sm:text-lg font-black">{currentRank.title}</h3>
          </div>

          {/* Lifelines */}
          <div className="flex items-center gap-2">
            <button
              disabled={kbrFiftyUsed}
              onClick={useFiftyFifty}
              className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/20 text-xs font-bold disabled:opacity-30 hover:bg-black/50"
            >
              50:50
            </button>
            <button
              disabled={kbrPollUsed}
              onClick={useAudiencePoll}
              className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/20 text-xs font-bold disabled:opacity-30 hover:bg-black/50"
            >
              📊 Poll
            </button>
            <button
              disabled={kbrSkipUsed}
              onClick={useSkipQuestion}
              className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/20 text-xs font-bold disabled:opacity-30 hover:bg-black/50"
            >
              🔄 Skip
            </button>
          </div>
        </div>

        {kbrGameOver ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-5 shadow-xl">
            {kbrWon ? (
              <>
                <Crown className="w-16 h-16 text-yellow-500 mx-auto animate-bounce" />
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  {lang === 'hi' ? '👑 बधाई! आप SDM (RAS टॉपर) बन चुके हैं!' : '👑 Congratulations! You achieved SDM Rank!'}
                </h2>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-rose-500 mx-auto" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {lang === 'hi' ? 'गलत उत्तर! खेल समाप्त' : 'Incorrect Answer! Career Ended'}
                </h2>
                <p className="text-sm text-slate-500">
                  {lang === 'hi' ? `आपकी अंतिम पदस्थापना: ${currentRank.title}` : `Your final rank reached: ${currentRank.title}`}
                </p>
              </>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={startKBR}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-sm shadow-md"
              >
                {lang === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}
              </button>
              <button
                onClick={() => setActiveGame('hub')}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-sm"
              >
                {lang === 'hi' ? 'एरिना हब पर जाएं' : 'Back to Arena'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              Rank {kbrLevel + 1} / 10 • {kbrQuestion.subtopic}
            </span>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
              {lang === 'hi' ? kbrQuestion.question.hi : kbrQuestion.question.en}
            </h3>

            {/* Audience Poll Graphic if active */}
            {pollData && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs space-y-2">
                <span className="font-bold text-amber-900 dark:text-amber-200">📊 Expert Audience Poll Results:</span>
                <div className="grid grid-cols-4 gap-2 text-center font-bold">
                  {pollData.map((pct, idx) => (
                    <div key={idx} className="p-1 rounded bg-white dark:bg-slate-800">
                      Option {String.fromCharCode(65 + idx)}: {pct}%
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              {(lang === 'hi' ? kbrQuestion.options.hi : kbrQuestion.options.en).map((opt, i) => {
                if (hiddenOptions.includes(i)) {
                  return (
                    <div key={i} className="p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 opacity-20 text-center font-bold text-xs">
                      [50:50 Struck Off]
                    </div>
                  );
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleKBRAnswer(i)}
                    className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 text-left font-bold text-sm sm:text-base transition-all flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. BOSS BATTLE ACTIVE VIEW
  if (activeGame === 'boss') {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
        {/* Health Bars */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900 text-white shadow-xl">
          {/* Player HP */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span>Candidate HP</span>
              <span className="text-emerald-400">{playerHP} / 500</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${(playerHP / 500) * 100}%` }}
              />
            </div>
          </div>

          {/* Boss HP */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-rose-400">Cutoff Demon HP</span>
              <span className="text-rose-400">{bossHP} / 1000</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-600 transition-all duration-300"
                style={{ width: `${(bossHP / 1000) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {bossBattleOver ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-5 shadow-xl">
            {bossWon ? (
              <>
                <Swords className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  {lang === 'hi' ? '⚔️ कट-ऑफ दैत्य परास्त! प्रीलिम्स विजय!' : '⚔️ Cutoff Demon Slain! Prelims Cleared!'}
                </h2>
              </>
            ) : (
              <>
                <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {lang === 'hi' ? 'आपकी HP समाप्त! पुनः अभ्यास करें' : 'Candidate Defeated by Negative Marks!'}
                </h2>
              </>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={startBossBattle}
                className="px-6 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-sm shadow-md"
              >
                {lang === 'hi' ? 'पुनः युद्ध करें' : 'Rematch Boss'}
              </button>
              <button
                onClick={() => setActiveGame('hub')}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-sm"
              >
                {lang === 'hi' ? 'एरिना हब पर जाएं' : 'Back to Arena'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
                Boss Attack Stage • {bossQuestion.subtopic}
              </span>
              <span className="text-xs font-bold text-amber-600">
                Critical Damage on High-Yield Qs!
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
              {lang === 'hi' ? bossQuestion.question.hi : bossQuestion.question.en}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(lang === 'hi' ? bossQuestion.options.hi : bossQuestion.options.en).map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleBossAnswer(i)}
                  className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:bg-rose-50/40 text-left font-bold text-sm transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 4. CONQUEST STAGE VIEW
  if (activeGame === 'conquest' && activeDivision) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-12">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-800 text-white shadow-xl">
          <div>
            <span className="text-[10px] text-teal-200 font-bold uppercase tracking-wider block">Division Under Conquest</span>
            <h3 className="text-base sm:text-lg font-black">{activeDivision.name}</h3>
          </div>
          <span className="px-3 py-1 rounded-xl bg-white/20 font-bold text-xs">
            Checkpoint {divisionStage + 1} / 3
          </span>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
            {divisionQ.subtopic}
          </span>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
            {lang === 'hi' ? divisionQ.question.hi : divisionQ.question.en}
          </h3>

          <div className="space-y-3">
            {(lang === 'hi' ? divisionQ.options.hi : divisionQ.options.en).map((opt, i) => (
              <button
                key={i}
                onClick={() => handleConquestAnswer(i)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:bg-teal-50/50 text-left font-bold text-sm transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
