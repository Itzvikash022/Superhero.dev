import React, { useState, useEffect, useCallback } from 'react';
import { Facebook, Instagram, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';

import spidermanCutoutAsset from './assets/spiderman-cutout.asset.json';
import spidermanBgAsset from './assets/spiderman-bg.asset.json';
import captainCutoutAsset from './assets/captain-cutout.asset.json';
import captainBgAsset from './assets/captain-bg.asset.json';
import pantherCutoutAsset from './assets/panther-cutout.asset.json';
import pantherBgAsset from './assets/panther-bg.asset.json';

// X (Twitter) icon component
const XIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export interface HeroState {
  id: string;
  name: string;
  copy: string;
  cutout: string;
  backdrop: string;
}

const heroes: HeroState[] = [
  {
    id: 'spiderman',
    name: 'Spider-Man',
    copy: 'He is a crime-fighting hero in the Marvel universe. Peter Parker gained his powers by being bitten by a radioactive spider and follows the motto "With great power comes great responsibility."',
    cutout: spidermanCutoutAsset.url,
    backdrop: spidermanBgAsset.url,
  },
  {
    id: 'captain',
    name: 'Captain America',
    copy: 'From the dark days of world war to the explosive challenges of today, Super-Soldier Captain America stands ready as a shining sentinel of liberty to shield the oppressed and fight for freedom everywhere.',
    cutout: captainCutoutAsset.url,
    backdrop: captainBgAsset.url,
  },
  {
    id: 'panther',
    name: 'Black Panther',
    copy: 'King T\'Challa protects the isolated, technologically advanced African nation of Wakanda and the world as Black Panther. Empowered by the heart-shaped herb and armed with a Vibranium suit, he stands as a warrior king of honor, wisdom, and strength.',
    cutout: pantherCutoutAsset.url,
    backdrop: pantherBgAsset.url,
  },
];

export function App() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const currentHero = heroes[heroIndex];

  const handleNext = useCallback(() => {
    setHeroIndex((prev) => (prev + 1) % heroes.length);
  }, []);

  const handlePrev = useCallback(() => {
    setHeroIndex((prev) => (prev - 1 + heroes.length) % heroes.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (clientY - innerHeight / 2) / (innerHeight / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const getLayerStyle = (z: number) => {
    const { x, y } = mousePos;
    const tx = -x * z * 8;
    const ty = -y * z * 5;
    const ry = -x * z * 1.6;
    const rx = y * z * 1.1;
    return {
      transform: `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg)`,
    };
  };

  return (
    <div
      data-hero={currentHero.id}
      className="relative w-screen h-screen overflow-hidden stage theme-transition bg-[var(--background)] text-[var(--foreground)] select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* z=0.2 — Giant ghost "MARVEL" wordmark */}
      <div
        className="layer-3d absolute left-[2vw] top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
        style={getLayerStyle(0.2)}
      >
        <span className="text-[22vw] font-black tracking-tighter text-[var(--ghost-text)] leading-none block theme-transition">
          MARVEL
        </span>
      </div>

      {/* z=0.35 — Solid themed wedge panel pinned right */}
      <div
        className="layer-3d absolute inset-y-[-10%] right-[-6%] w-[34%] z-10 pointer-events-none"
        style={getLayerStyle(0.35)}
      >
        <div
          key={`wedge-${currentHero.id}`}
          className="w-full h-full wedge-panel bg-[var(--wedge)] theme-transition animate-hero-enter shadow-2xl"
        />
      </div>

      {/* z=0.6 — Angled backdrop photo slab */}
      <div
        className="layer-3d absolute inset-y-[-6%] right-[6%] w-[62%] z-20 pointer-events-none overflow-hidden"
        style={getLayerStyle(0.6)}
      >
        <div
          key={`backdrop-${currentHero.id}`}
          className="w-full h-full wedge-photo shadow-2xl animate-hero-enter relative"
        >
          <img
            src={currentHero.backdrop}
            alt={`${currentHero.name} backdrop`}
            className="w-full h-full object-cover scale-110"
          />
          {/* Atmospheric dark overlay over backdrop photo */}
          <div className="absolute inset-0 bg-black/45 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-black/10 pointer-events-none" />
        </div>
      </div>

      {/* z=1.15 — Character cutout foreground */}
      <div
        className="layer-3d absolute right-[8%] w-[54%] bottom-0 h-[88%] z-40 pointer-events-none flex items-end justify-center"
        style={getLayerStyle(1.15)}
      >
        <img
          key={`cutout-${currentHero.id}`}
          src={currentHero.cutout}
          alt={currentHero.name}
          className="h-full w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)] pointer-events-none animate-hero-enter"
        />
      </div>

      {/* z=0.45 — Left content column */}
      <div
        className="layer-3d absolute inset-0 max-w-[46%] p-[4vw] flex flex-col justify-between h-full z-30 pointer-events-auto"
        style={getLayerStyle(0.45)}
      >
        {/* Top: MARVEL wordmark */}
        <div>
          <span className="text-4xl font-black tracking-tighter text-[var(--primary)] theme-transition block">
            MARVEL
          </span>
        </div>

        {/* Middle: Breadcrumb, Title, Description */}
        <div key={`text-${currentHero.id}`} className="flex flex-col gap-4 animate-text-enter">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
            <span className="text-[var(--foreground)] opacity-50">Home</span>
            <span className="text-[var(--foreground)] opacity-40">/</span>
            <span className="font-bold text-[var(--foreground)]">CHARACTERS</span>
          </div>

          <h1 className="text-[5vw] font-black uppercase leading-none text-[var(--primary)] theme-transition tracking-tight drop-shadow-sm">
            {currentHero.name}
          </h1>

          <p className="text-[var(--foreground)] opacity-80 text-base md:text-lg max-w-xl font-normal leading-relaxed">
            {currentHero.copy}
          </p>
        </div>

        {/* Bottom: Social icons */}
        <div className="flex items-center gap-8 text-[var(--foreground)]">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:opacity-60 transition-opacity p-1"
            onClick={(e) => e.preventDefault()}
          >
            <Facebook className="w-6 h-6 fill-current" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:opacity-60 transition-opacity p-1"
            onClick={(e) => e.preventDefault()}
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="#"
            aria-label="X"
            className="hover:opacity-60 transition-opacity p-1"
            onClick={(e) => e.preventDefault()}
          >
            <XIcon className="w-6 h-6" />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="hover:opacity-60 transition-opacity p-1"
            onClick={(e) => e.preventDefault()}
          >
            <Youtube className="w-6 h-6 fill-current" />
          </a>
        </div>
      </div>

      {/* z=0.9 — Two parallelogram arrow buttons at bottom-[6vh] */}
      {/* Left button */}
      <div
        className="layer-3d absolute left-[40%] bottom-[6vh] z-50 pointer-events-auto"
        style={getLayerStyle(0.9)}
      >
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous character"
          className="h-16 w-32 skew-tile bg-[var(--foreground)] text-[var(--background)] theme-transition flex items-center justify-center cursor-pointer hover:-translate-x-1 transition-transform focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <ChevronLeft className="w-8 h-8 stroke-[3]" />
        </button>
      </div>

      {/* Right button */}
      <div
        className="layer-3d absolute right-[10%] bottom-[6vh] z-50 pointer-events-auto"
        style={getLayerStyle(0.9)}
      >
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next character"
          className="h-16 w-32 skew-tile bg-[var(--background)] text-[var(--foreground)] theme-transition shadow-xl flex items-center justify-center cursor-pointer hover:translate-x-1 transition-transform focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <ChevronRight className="w-8 h-8 stroke-[3]" />
        </button>
      </div>

      {/* Right rail: 4 stacked 3px white/foreground dashes */}
      <div className="absolute right-[3%] top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-end pointer-events-auto">
        {[0, 1, 2, 3].map((idx) => {
          const isActive = idx === heroIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setHeroIndex(idx % heroes.length)}
              aria-label={`Select character indicator ${idx + 1}`}
              className={`h-[3px] bg-[var(--foreground)] rounded-full transition-all duration-500 cursor-pointer ${
                isActive ? 'w-10 opacity-100' : 'w-6 opacity-45 hover:opacity-75'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
