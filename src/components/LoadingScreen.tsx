import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  imagesToPreload: string[];
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  imagesToPreload,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isWobbling, setIsWobbling] = useState(false);
  const [particles, setParticles] = useState<{ id: number; left: number; top: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate 168 subtle tactical particles (4x the previous particle count)
    const generated = Array.from({ length: 168 }).map((_, idx) => ({
      id: idx,
      left: 10 + Math.random() * 80, // spread nicely around the scaled emblem
      top: 10 + Math.random() * 80,
      size: 1.2 + Math.random() * 2.2,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3
    }));
    setParticles(generated);
  }, []);

  const triggerWobble = () => {
    if (isWobbling) return;
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 400);
  };

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    if (totalImages === 0) {
      setProgress(100);
      setIsLoaded(true);
      return;
    }

    const minTime = 1800;
    const startTime = Date.now();

    const updateProgress = () => {
      loadedCount++;
      const elapsedTime = Date.now() - startTime;
      const realProgress = Math.floor((loadedCount / totalImages) * 100);
      const timeProgress = Math.min(Math.floor((elapsedTime / minTime) * 100), 100);
      setProgress(Math.min(realProgress, timeProgress));

      if (loadedCount === totalImages) {
        const remainingTime = Math.max(0, minTime - (Date.now() - startTime));
        setTimeout(() => {
          setProgress(100);
          setIsLoaded(true);
        }, remainingTime);
      }
    };

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const timeProgress = Math.min(Math.floor((elapsedTime / minTime) * 100), 100);
      setProgress((prev) => {
        const next = Math.max(prev, timeProgress);
        if (next >= 100 && loadedCount >= totalImages) {
          setIsLoaded(true);
          clearInterval(interval);
        }
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [imagesToPreload]);

  const handleEnter = () => {
    if (!isLoaded || isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 950);
  };

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] w-screen h-screen overflow-hidden select-none ${
        isOpening ? 'pointer-events-none' : ''
      }`}
    >
      {/* ================= LEFT PANEL (LIGHT) ================= */}
      <div
        className={`absolute top-0 left-0 h-screen w-screen bg-[#F4F5F8] transition-transform duration-[950ms] ease-[cubic-bezier(0.85,0,0.15,1)] z-10 flex flex-col justify-between px-10 py-10 md:px-20 md:py-14 ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{ clipPath: 'polygon(0 0, 57% 0, 36% 100%, 0 100%)' }}
      >
        {/* Ghost MARVEL Watermark */}
        <div className="absolute left-[3vw] top-[22vh] pointer-events-none opacity-[0.05]">
          <span className="text-[22vw] font-black tracking-tighter text-[#0F172A] leading-none block">
            MARVEL
          </span>
        </div>

        {/* Top: Red MARVEL Box */}
        <div className="relative z-20">
          <div className="bg-[#E50914] text-white px-3 py-1.5 text-2xl md:text-3xl font-black tracking-tighter uppercase inline-block shadow-sm">
            MARVEL
          </div>
        </div>

        {/* Middle: Title & CTA */}
        <div className="relative z-20 max-w-xl my-auto">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-5 h-[2.5px] bg-[#E50914]" />
            <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-[#64748B] uppercase">
              INITIATING SYSTEM
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-[#0F172A] uppercase leading-none mb-3">
            LOADING
          </h1>

          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#64748B] mb-8 font-medium">
            PREPARING <span className="font-extrabold text-[#0F172A]">AVENGERS</span> DATABASE
          </p>

          <div className="min-h-[70px] flex items-center">
            {!isLoaded ? (
              <div className="w-full max-w-md">
                <div className="flex justify-between items-center text-xs font-mono font-bold tracking-widest text-[#64748B] mb-2">
                  <span className="animate-pulse">LOADING...</span>
                  <span className="text-[#0F172A]">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div
                    className="h-full bg-[#E50914] rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(229,9,20,0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEnter}
                className="h-14 px-10 skew-tile bg-[#E50914] text-white text-base md:text-lg font-black tracking-[0.18em] uppercase cursor-pointer hover:bg-[#CC0812] hover:scale-105 active:scale-95 transition-all shadow-xl focus:outline-none focus:ring-4 focus:ring-[#E50914]/40 animate-pulse flex items-center gap-3"
              >
                <span>ENTER SHOWCASE</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Spacer (Icons removed for now per request) */}
        <div className="h-6" />
      </div>

      {/* ================= RIGHT PANEL (DARK TACTICAL HUD) ================= */}
      <div
        className={`absolute top-0 right-0 h-screen w-screen bg-[#08101E] transition-transform duration-[950ms] ease-[cubic-bezier(0.85,0,0.15,1)] z-10 overflow-hidden ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{ clipPath: 'polygon(57% 0, 100% 0, 100% 100%, 36% 100%)' }}
      >
        {/* Radial dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_#0f1a2e_0%,_#08101E_70%)]" />

        {/* Subtle diagonal grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hud-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94A3B8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hud-grid)" />
        </svg>

        {/* Top-right corner HUD bracket */}
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-slate-600/50" />
        {/* Bottom-right corner HUD bracket */}
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-slate-600/50" />
        {/* Bottom-left (near seam) corner HUD bracket */}
        <div className="absolute bottom-8 left-[40%] w-12 h-12 border-b-2 border-l-2 border-slate-700/40" />

        {/* Top accent red dash */}
        <div className="absolute top-10 right-32 flex items-center gap-1">
          <span className="w-8 h-[2px] bg-[#E50914]/60" />
          <span className="w-2 h-[2px] bg-[#E50914]/30" />
        </div>
        {/* Bottom accent red dash */}
        <div className="absolute bottom-10 right-32 flex items-center gap-1">
          <span className="w-2 h-[2px] bg-[#E50914]/30" />
          <span className="w-8 h-[2px] bg-[#E50914]/60" />
        </div>

        {/* Dot grid: top-right */}
        <div className="absolute top-10 right-10 grid grid-cols-4 gap-[6px] opacity-25">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="w-[3px] h-[3px] bg-slate-400 rounded-full" />
          ))}
        </div>
        {/* Dot grid: bottom-left-of-dark-area */}
        <div className="absolute bottom-10 left-[42%] grid grid-cols-4 gap-[6px] opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="w-[3px] h-[3px] bg-slate-500 rounded-full" />
          ))}
        </div>

        {/* Center: Avengers Emblem image ONLY (shifted 10% to left) */}
        <div className="absolute inset-0 flex items-center justify-end pr-[8%] mr-[-2vw] pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Avengers "A" Emblem Image with click & hover wobble + 168 floating particles */}
            <div
              className={`relative flex items-center justify-center pointer-events-auto cursor-pointer select-none transition-transform duration-300 active:scale-95 ${
                isWobbling ? 'animate-wobble-minor' : 'hover:animate-wobble-minor'
              }`}
              onClick={triggerWobble}
            >
              {/* Subtle floating particles (3x effect) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map((p) => (
                  <span
                    key={p.id}
                    className="absolute rounded-full bg-red-500/65 blur-[1px] animate-particle-drift"
                    style={{
                      left: `${p.left}%`,
                      top: `${p.top}%`,
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      '--drift-delay': `${p.delay}s`,
                      '--drift-duration': `${p.duration}s`,
                    } as React.CSSProperties}
                  />
                ))}
              </div>

              <img
                src="/images/avengers-icon.png"
                alt="Avengers Icon"
                className="w-[728px] h-[728px] md:w-[896px] md:h-[896px] max-w-none object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.65)]"
              />
            </div>
          </div>
        </div>

        {/* Seam bevel line */}
        <div className="absolute top-0 bottom-0 left-[35.5%] w-[1.5px] bg-gradient-to-b from-slate-600/30 via-slate-500/15 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
