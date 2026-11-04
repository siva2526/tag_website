'use client';

import { useState, useEffect } from 'react';
import {
  playYouDied,
  playBombDrop,
  playAceChime,
  playWishPull,
  playSandevistan,
  playMinecraftDing,
  playLevelUp,
} from './SoundEffects';
import { useToast } from './Toast';

export type EasterEggType =
  | 'eldenring'
  | 'helldivers'
  | 'valorant'
  | 'gacha'
  | 'sandevistan'
  | 'minecraft'
  | 'konami';

interface TriggerEventDetail {
  type: EasterEggType;
}

/** Global trigger helper so any component (CommandPalette, Terminal, Navbar) can fire an easter egg */
export function triggerEasterEgg(type: EasterEggType) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tag-trigger-easter-egg', { detail: { type } }));
  }
}

export default function EasterEggOverlay() {
  const [activeEgg, setActiveEgg] = useState<EasterEggType | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<TriggerEventDetail>;
      const type = customEvent.detail?.type;
      if (!type) return;

      setActiveEgg(type);

      switch (type) {
        case 'eldenring':
          playYouDied();
          setTimeout(() => {
            setActiveEgg(null);
            showToast('🔥 Lost runes retrieved at Site of Grace: VIT Vellore (+5,000 XP)', {
              type: 'xp',
              icon: '⚔️',
            });
          }, 3200);
          break;

        case 'helldivers':
          playBombDrop();
          setTimeout(() => {
            setActiveEgg(null);
            showToast('💥 SWEET LIBERTY! 500KG Bomb detonated. (+500 Warbonds)', {
              type: 'success',
              icon: '🚀',
            });
          }, 3000);
          break;

        case 'valorant':
          playAceChime();
          setTimeout(() => {
            setActiveEgg(null);
            showToast('🎯 ACE! "They thought they could outplay the TAG roster."', {
              type: 'success',
              icon: '👑',
            });
          }, 3000);
          break;

        case 'gacha':
          playWishPull();
          setTimeout(() => {
            setActiveEgg(null);
            showToast('⭐ 5-STAR PULL: TAG President Sivasankaran [SSR Tech Mage] added to party!', {
              type: 'xp',
              icon: '✨',
            });
          }, 3800);
          break;

        case 'sandevistan':
          playSandevistan();
          setTimeout(() => {
            setActiveEgg(null);
            showToast('⚡ Sandevistan Neural Overheat Cooldown Complete (Neural +25)', {
              type: 'info',
              icon: '⚡',
            });
          }, 3200);
          break;

        case 'minecraft':
          playMinecraftDing();
          setTimeout(() => {
            setActiveEgg(null);
          }, 3600);
          break;

        case 'konami':
          playLevelUp();
          setTimeout(() => {
            setActiveEgg(null);
          }, 3000);
          break;
      }
    };

    window.addEventListener('tag-trigger-easter-egg', handleTrigger);
    return () => window.removeEventListener('tag-trigger-easter-egg', handleTrigger);
  }, [showToast]);

  if (!activeEgg) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center font-mono">
      {/* ─────────────────────────────────────────────────────────────
          1. ELDEN RING: "YOU DIED"
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'eldenring' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in select-none">
          {/* Blood-red vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-red-950/30 to-black pointer-events-none" />
          <div
            className="text-red-700 font-serif tracking-[0.3em] sm:tracking-[0.5em] text-5xl sm:text-7xl md:text-8xl font-black drop-shadow-[0_0_35px_rgba(220,38,38,0.8)]"
            style={{ animation: 'eldenDied 3.2s ease-out forwards' }}
          >
            YOU DIED
          </div>
          <div className="text-gray-500 font-mono text-xs sm:text-sm mt-4 tracking-widest uppercase">
            [ 50,000 RUNES LOST // SITE OF GRACE LOCATED AT VIT ]
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. HELLDIVERS 2: 500KG BOMB STRATAGEM
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'helldivers' && (
        <div
          className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center pointer-events-none select-none"
          style={{ animation: 'screenShake 0.6s ease-in-out 0.4s' }}
        >
          {/* Laser Beacon from the sky */}
          <div
            className="absolute top-0 w-2 bg-gradient-to-b from-red-500 via-yellow-400 to-red-600 h-full shadow-[0_0_30px_#ef4444]"
            style={{ animation: 'beaconDrop 0.5s ease-out' }}
          />

          {/* Stratagem Arrow HUD */}
          <div className="relative z-10 bg-black/95 border-4 border-yellow-400 rounded-2xl p-6 sm:p-8 text-center max-w-sm sm:max-w-md shadow-2xl shadow-yellow-400/50">
            <div className="text-xs text-yellow-400 font-bold tracking-widest mb-2">
              SUPER EARTH ARMED FORCES // ORBITAL CANNON
            </div>
            <div className="text-3xl sm:text-4xl text-yellow-400 font-black mb-3">
              500KG BOMB
            </div>
            {/* Input combo */}
            <div className="flex justify-center gap-2 text-2xl sm:text-3xl text-white font-mono mb-4 bg-gray-900 border border-gray-800 py-2 rounded-lg">
              <span className="text-yellow-400">↑</span>
              <span className="text-yellow-400">→</span>
              <span className="text-yellow-400">↓</span>
              <span className="text-yellow-400">↓</span>
              <span className="text-yellow-400">↓</span>
            </div>
            <div className="text-xs text-gray-400 font-mono tracking-wider">
              SWEET LIBERTY! SPREADING MANAGED DEMOCRACY ACROSS VIT
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. VALORANT: 5K ACE BANNER
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'valorant' && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center pointer-events-none select-none">
          <div
            className="relative bg-gradient-to-r from-red-950/80 via-black to-red-950/80 border-y-4 border-yellow-400 w-full py-8 text-center shadow-2xl shadow-yellow-400/30"
            style={{ animation: 'aceBanner 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="text-2xl text-yellow-400 filter drop-shadow-[0_0_8px_rgba(255,244,0,0.8)]"
                >
                  💀
                </span>
              ))}
            </div>
            <div className="text-5xl sm:text-7xl font-black tracking-[0.25em] text-white">
              A <span className="text-yellow-400">C</span> E
            </div>
            <div className="text-xs sm:text-sm text-yellow-400/90 font-mono tracking-widest uppercase mt-2">
              ROUND WON // CLUTCH 1v5 ELIMINATIONS
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. GENSHIN / STAR RAIL: 5-STAR WISH PULL
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'gacha' && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center pointer-events-none select-none p-4">
          {/* Shooting golden meteor */}
          <div
            className="absolute w-72 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-white shadow-[0_0_20px_#fff400] rotate-[-35deg]"
            style={{ animation: 'meteorStrike 1.2s ease-out' }}
          />
          <div
            className="relative z-10 bg-gradient-to-b from-yellow-950/90 via-black to-yellow-950/90 border-4 border-yellow-400 rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center shadow-[0_0_80px_rgba(255,244,0,0.4)]"
            style={{ animation: 'wishCardFlip 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <div className="text-yellow-400 text-lg mb-2">⭐⭐⭐⭐⭐</div>
            <div className="text-xs text-yellow-300 font-bold uppercase tracking-widest mb-1">
              5-STAR SSR CHARACTER ACQUIRED!
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mb-2">
              Sivasankaran
            </div>
            <div className="text-xs text-yellow-400 font-mono mb-4">
              [ ELEMENT: TECH MAGE // GUILD MASTER ]
            </div>
            <div className="bg-black/80 border border-yellow-400/30 rounded-xl p-3 text-xs text-gray-300 font-mono grid grid-cols-3 gap-2">
              <div>
                <div className="text-gray-500 text-[10px]">HP</div>
                <div className="text-green-400 font-bold">14,250</div>
              </div>
              <div>
                <div className="text-gray-500 text-[10px]">ATK</div>
                <div className="text-yellow-400 font-bold">3,890</div>
              </div>
              <div>
                <div className="text-gray-500 text-[10px]">CRIT</div>
                <div className="text-red-400 font-bold">100%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. CYBERPUNK 2077: SANDEVISTAN
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'sandevistan' && (
        <div
          className="fixed inset-0 pointer-events-none select-none flex items-center justify-center border-[8px] border-cyan-400/60"
          style={{ animation: 'sandyGlitch 0.2s infinite alternate' }}
        >
          {/* Scanline chromatic aberration */}
          <div className="absolute inset-0 bg-cyan-500/10 mix-blend-screen" />
          <div className="bg-black/90 border-2 border-cyan-400 rounded-2xl p-6 sm:p-8 text-center max-w-sm sm:max-w-md shadow-[0_0_50px_#06b6d4]">
            <div className="text-xs text-cyan-400 font-mono font-bold tracking-widest mb-1 animate-pulse">
              CYBERWARE OPERATING SYSTEM // ACTIVE
            </div>
            <div className="text-2xl sm:text-4xl font-black text-white tracking-wider mb-2">
              SANDEVISTAN
            </div>
            <div className="text-xs text-cyan-300 font-mono mb-4">
              [ MILITECH APOGEE // 200% TIME-DILATION ]
            </div>
            <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-cyan-500/40">
              <div
                className="bg-cyan-400 h-full"
                style={{ animation: 'sandyBar 3s linear forwards' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. MINECRAFT: ADVANCEMENT POPUP (TOP-RIGHT)
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'minecraft' && (
        <div className="fixed top-20 right-4 sm:right-8 z-[9999] pointer-events-none select-none max-w-xs sm:max-w-sm w-full">
          <div
            className="bg-[#212121] border-2 border-white rounded-lg p-3.5 shadow-2xl flex items-center gap-3"
            style={{ animation: 'mcAdvancement 3.5s ease-in-out forwards' }}
          >
            <div className="w-12 h-12 bg-black border border-gray-600 rounded flex items-center justify-center text-2xl shrink-0 shadow-inner">
              💎
            </div>
            <div>
              <div className="text-yellow-400 font-bold text-xs uppercase tracking-wider">
                Advancement Made!
              </div>
              <div className="text-white font-bold text-sm">Diamonds!</div>
              <div className="text-gray-400 text-[11px] font-mono leading-tight">
                Acquired membership in TAG Club VIT.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyframe styles */}
      <style jsx global>{`
        @keyframes eldenDied {
          0% { opacity: 0; transform: scale(1.15); }
          20% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.95); }
        }

        @keyframes screenShake {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-8px, 6px); }
          40% { transform: translate(8px, -6px); }
          60% { transform: translate(-4px, 4px); }
          80% { transform: translate(4px, -2px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes beaconDrop {
          0% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes aceBanner {
          0% { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }

        @keyframes meteorStrike {
          0% { transform: translate(-200px, -200px) rotate(-35deg); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translate(300px, 300px) rotate(-35deg); opacity: 0; }
        }

        @keyframes wishCardFlip {
          0% { transform: scale(0.4) rotateY(90deg); opacity: 0; }
          100% { transform: scale(1) rotateY(0deg); opacity: 1; }
        }

        @keyframes sandyBar {
          0% { width: 100%; }
          100% { width: 0%; }
        }

        @keyframes mcAdvancement {
          0% { transform: translateY(-30px); opacity: 0; }
          15% { transform: translateY(0); opacity: 1; }
          85% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
