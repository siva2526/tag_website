'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  | 'minecraft_how_did_we_get_here'
  | 'konami';

export interface Achievement {
  id: EasterEggType;
  title: string;
  game: string;
  description: string;
  hint: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'minecraft_how_did_we_get_here',
    title: 'How Did We Get Here?',
    game: 'Minecraft',
    description: 'Explored all 4 primary sectors of TAG Club in a single journey.',
    hint: 'Visit Home, Events, Clips, and Team in one session.',
    icon: '🟣',
  },
  {
    id: 'helldivers',
    title: 'Democracy Delivered (500kg Bomb)',
    game: 'Helldivers 2',
    description: 'Dialed the orbital stratagem strike sequence on your keyboard.',
    hint: 'Enter the Eagle 500kg stratagem code: ↑ → ↓ ↓ ↓',
    icon: '🚀',
  },
  {
    id: 'valorant',
    title: 'Radiant 5K ACE',
    game: 'Valorant',
    description: 'Scored 5 consecutive clutch interactions in the guild vault.',
    hint: 'Like 5 clips or inspect 5 officers in one session.',
    icon: '🎯',
  },
  {
    id: 'eldenring',
    title: 'YOU DIED',
    game: 'Elden Ring',
    description: 'Interacted with the lost bloodstain at the footer Site of Grace.',
    hint: 'Search the footer for a warrior\'s bloodstain message.',
    icon: '💀',
  },
  {
    id: 'gacha',
    title: 'Golden 5-Star Pull',
    game: 'Genshin / Honkai',
    description: 'Reached 10-pull pity by rapidly toggling the archetype selector.',
    hint: 'Rapidly switch between Tech Mage and Gaming Warrior 10 times.',
    icon: '⭐',
  },
  {
    id: 'sandevistan',
    title: 'Sandevistan Overclock',
    game: 'Cyberpunk 2077',
    description: 'Triggered Militech neural acceleration via speedrun clicks.',
    hint: 'Click the TAG crest in the navbar 5 times in rapid succession.',
    icon: '⚡',
  },
  {
    id: 'minecraft',
    title: 'Diamonds!',
    game: 'Minecraft',
    description: 'Discovered the hidden diamond ore block in the guild footer.',
    hint: 'Mine the secret diamond ore block in the footer.',
    icon: '💎',
  },
];

const HELLDIVERS_COMBO = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowDown', 'ArrowDown'];

export function triggerEasterEgg(type: EasterEggType) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tag-trigger-easter-egg', { detail: { type } }));
  }
}

export function recordInteraction(action: 'like' | 'inspect' | 'pity' | 'logo' | 'bloodstain' | 'diamond') {
  if (typeof window === 'undefined') return;

  switch (action) {
    case 'bloodstain':
      triggerEasterEgg('eldenring');
      break;
    case 'diamond':
      triggerEasterEgg('minecraft');
      break;
    case 'like':
    case 'inspect': {
      const current = parseInt(sessionStorage.getItem('tag_clutch_count') || '0', 10) + 1;
      sessionStorage.setItem('tag_clutch_count', current.toString());
      if (current === 5) {
        triggerEasterEgg('valorant');
        sessionStorage.setItem('tag_clutch_count', '0');
      }
      break;
    }
    case 'pity': {
      const current = parseInt(sessionStorage.getItem('tag_pity_count') || '0', 10) + 1;
      sessionStorage.setItem('tag_pity_count', current.toString());
      if (current >= 10) {
        triggerEasterEgg('gacha');
        sessionStorage.setItem('tag_pity_count', '0');
      }
      break;
    }
    case 'logo': {
      triggerEasterEgg('sandevistan');
      break;
    }
  }
}

export function recordPageVisit(sector: 'home' | 'events' | 'clips' | 'team') {
  if (typeof window === 'undefined') return;
  try {
    const raw = sessionStorage.getItem('tag_sectors_visited') || '[]';
    const visited: string[] = JSON.parse(raw);
    if (!visited.includes(sector)) {
      visited.push(sector);
      sessionStorage.setItem('tag_sectors_visited', JSON.stringify(visited));
      if (['home', 'events', 'clips', 'team'].every((s) => visited.includes(s))) {
        const alreadyDone = sessionStorage.getItem('tag_how_did_we_get_here_fired');
        if (!alreadyDone) {
          sessionStorage.setItem('tag_how_did_we_get_here_fired', 'true');
          setTimeout(() => triggerEasterEgg('minecraft_how_did_we_get_here'), 800);
        }
      }
    }
  } catch {
    // Session storage not available
  }
}

export function getUnlockedAchievements(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('tag_unlocked_achievements') || '[]');
  } catch {
    return [];
  }
}

export default function EasterEggOverlay() {
  const [activeEgg, setActiveEgg] = useState<EasterEggType | null>(null);
  const keySequenceRef = useRef<string[]>([]);
  const { showToast } = useToast();

  const markAchievementUnlocked = useCallback((id: EasterEggType) => {
    try {
      const existing = getUnlockedAchievements();
      if (!existing.includes(id)) {
        existing.push(id);
        localStorage.setItem('tag_unlocked_achievements', JSON.stringify(existing));
        window.dispatchEvent(new CustomEvent('tag:achievement-unlocked'));
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  // Helldivers 2 keyboard sequence listener: Up, Right, Down, Down, Down
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      keySequenceRef.current = [...keySequenceRef.current, e.key].slice(-HELLDIVERS_COMBO.length);

      if (keySequenceRef.current.join(',') === HELLDIVERS_COMBO.join(',')) {
        keySequenceRef.current = [];
        triggerEasterEgg('helldivers');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main listener for trigger events
  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: EasterEggType }>;
      const type = customEvent.detail?.type;
      if (!type) return;

      setActiveEgg(type);
      markAchievementUnlocked(type);

      switch (type) {
        case 'minecraft_how_did_we_get_here':
          playLevelUp();
          setTimeout(() => {
            setActiveEgg(null);
            showToast('🟣 CHALLENGE COMPLETE: How Did We Get Here? (+10,000 XP)', {
              type: 'xp',
              icon: '🟣',
            });
          }, 4500);
          break;

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
            showToast('💎 Advancement Made! Diamonds! (+2,500 XP)', {
              type: 'xp',
              icon: '💎',
            });
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
  }, [markAchievementUnlocked, showToast]);

  if (!activeEgg) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center font-mono">
      {/* ─────────────────────────────────────────────────────────────
          1. MINECRAFT: "HOW DID WE GET HERE?" (PURPLE CHALLENGE)
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'minecraft_how_did_we_get_here' && (
        <div className="fixed top-16 sm:top-20 right-4 sm:right-8 z-[9999] pointer-events-none select-none max-w-sm sm:max-w-md w-full">
          <div
            className="bg-[#1f1728] border-4 border-[#b967ff] rounded-xl p-4 shadow-[0_0_40px_rgba(185,103,255,0.6)] flex items-start gap-3.5"
            style={{ animation: 'mcChallengeIn 4.2s ease-in-out forwards' }}
          >
            <div className="w-14 h-14 bg-black border-2 border-[#b967ff] rounded-lg flex items-center justify-center text-3xl shrink-0 shadow-[0_0_15px_#b967ff]">
              🟣
            </div>
            <div className="flex-1">
              <div className="text-[#d896ff] font-extrabold text-[11px] sm:text-xs uppercase tracking-widest font-mono">
                Challenge Complete!
              </div>
              <div className="text-white font-black text-sm sm:text-base mb-1">
                How Did We Get Here?
              </div>
              <div className="text-zinc-300 text-xs font-mono leading-tight mb-2">
                Have every sector of the TAG Club explored in a single session.
              </div>
              {/* Potion effect icons row */}
              <div className="flex items-center gap-1 text-sm bg-black/60 px-2 py-1 rounded border border-purple-500/30">
                <span title="Speed">⚡</span>
                <span title="Haste">⛏️</span>
                <span title="Strength">🗡️</span>
                <span title="Jump Boost">🐇</span>
                <span title="Regen">💖</span>
                <span title="Night Vision">👁️</span>
                <span title="Glowing">🌟</span>
                <span title="Hero of the Village">👑</span>
                <span title="Bad Omen">☠️</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. ELDEN RING: "YOU DIED"
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'eldenring' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center select-none">
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-red-950/40 to-black pointer-events-none" />
          <div
            className="text-red-700 font-serif tracking-[0.3em] sm:tracking-[0.5em] text-5xl sm:text-7xl md:text-8xl font-black drop-shadow-[0_0_40px_rgba(220,38,38,0.9)]"
            style={{ animation: 'eldenDied 3.2s ease-out forwards' }}
          >
            YOU DIED
          </div>
          <div className="text-zinc-500 font-mono text-xs sm:text-sm mt-4 tracking-widest uppercase">
            [ 50,000 RUNES LOST // SITE OF GRACE RESTORED AT VIT ]
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. HELLDIVERS 2: 500KG BOMB STRATAGEM
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'helldivers' && (
        <div
          className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center pointer-events-none select-none"
          style={{ animation: 'screenShake 0.6s ease-in-out 0.4s' }}
        >
          <div
            className="absolute top-0 w-3 bg-gradient-to-b from-red-500 via-yellow-400 to-red-600 h-full shadow-[0_0_35px_#ef4444]"
            style={{ animation: 'beaconDrop 0.5s ease-out' }}
          />

          <div className="relative z-10 bg-black/95 border-4 border-yellow-400 rounded-2xl p-6 sm:p-8 text-center max-w-sm sm:max-w-md shadow-2xl shadow-yellow-400/50">
            <div className="text-xs text-yellow-400 font-bold tracking-widest mb-2 font-mono">
              SUPER EARTH COMMAND // ORBITAL BEACON
            </div>
            <div className="text-3xl sm:text-4xl text-yellow-400 font-black mb-3">
              500KG BOMB
            </div>
            <div className="flex justify-center gap-2 text-2xl sm:text-3xl text-white font-mono mb-4 bg-zinc-900 border border-zinc-800 py-2 rounded-lg">
              <span className="text-yellow-400">↑</span>
              <span className="text-yellow-400">→</span>
              <span className="text-yellow-400">↓</span>
              <span className="text-yellow-400">↓</span>
              <span className="text-yellow-400">↓</span>
            </div>
            <div className="text-xs text-zinc-400 font-mono tracking-wider">
              SWEET LIBERTY! SPREADING MANAGED DEMOCRACY ACROSS VIT
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. VALORANT: 5K ACE BANNER
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'valorant' && (
        <div className="fixed inset-0 bg-black/75 flex flex-col items-center justify-center pointer-events-none select-none">
          <div
            className="relative bg-gradient-to-r from-red-950/90 via-black to-red-950/90 border-y-4 border-yellow-400 w-full py-8 text-center shadow-2xl shadow-yellow-400/30"
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
            <div className="text-xs sm:text-sm text-yellow-400 font-mono tracking-widest uppercase mt-2">
              ROUND WON // 5-PLAYER CLUTCH CONFIRMED
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. GENSHIN / STAR RAIL: 5-STAR WISH PULL
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'gacha' && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center pointer-events-none select-none p-4">
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
              5-STAR SSR PITY REACHED!
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mb-2">
              Sivasankaran
            </div>
            <div className="text-xs text-yellow-400 font-mono mb-4">
              [ ELEMENT: TECH MAGE // GUILD MASTER ]
            </div>
            <div className="bg-black/80 border border-yellow-400/30 rounded-xl p-3 text-xs text-zinc-300 font-mono grid grid-cols-3 gap-2">
              <div>
                <div className="text-zinc-500 text-[10px]">HP</div>
                <div className="text-emerald-400 font-bold">14,250</div>
              </div>
              <div>
                <div className="text-zinc-500 text-[10px]">ATK</div>
                <div className="text-yellow-400 font-bold">3,890</div>
              </div>
              <div>
                <div className="text-zinc-500 text-[10px]">CRIT</div>
                <div className="text-rose-400 font-bold">100%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. CYBERPUNK 2077: SANDEVISTAN
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'sandevistan' && (
        <div
          className="fixed inset-0 pointer-events-none select-none flex items-center justify-center border-[8px] border-cyan-400/60"
          style={{ animation: 'sandyGlitch 0.2s infinite alternate' }}
        >
          <div className="absolute inset-0 bg-cyan-500/10 mix-blend-screen" />
          <div className="bg-black/90 border-2 border-cyan-400 rounded-2xl p-6 sm:p-8 text-center max-w-sm sm:max-w-md shadow-[0_0_50px_#06b6d4]">
            <div className="text-xs text-cyan-400 font-mono font-bold tracking-widest mb-1 animate-pulse">
              CYBERWARE OS // OVERCLOCK ACTIVE
            </div>
            <div className="text-2xl sm:text-4xl font-black text-white tracking-wider mb-2">
              SANDEVISTAN
            </div>
            <div className="text-xs text-cyan-300 font-mono mb-4">
              [ MILITECH APOGEE // 200% TIME-DILATION ]
            </div>
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-cyan-500/40">
              <div
                className="bg-cyan-400 h-full"
                style={{ animation: 'sandyBar 3s linear forwards' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. MINECRAFT: ADVANCEMENT POPUP (TOP-RIGHT)
          ───────────────────────────────────────────────────────────── */}
      {activeEgg === 'minecraft' && (
        <div className="fixed top-20 right-4 sm:right-8 z-[9999] pointer-events-none select-none max-w-xs sm:max-w-sm w-full">
          <div
            className="bg-[#212121] border-2 border-white rounded-lg p-3.5 shadow-2xl flex items-center gap-3"
            style={{ animation: 'mcAdvancement 3.5s ease-in-out forwards' }}
          >
            <div className="w-12 h-12 bg-black border border-zinc-600 rounded flex items-center justify-center text-2xl shrink-0 shadow-inner">
              💎
            </div>
            <div>
              <div className="text-yellow-400 font-bold text-xs uppercase tracking-wider font-mono">
                Advancement Made!
              </div>
              <div className="text-white font-bold text-sm">Diamonds!</div>
              <div className="text-zinc-400 text-[11px] font-mono leading-tight">
                Discovered the secret diamond ore at TAG Club.
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

        @keyframes mcChallengeIn {
          0% { transform: translateY(-30px); opacity: 0; }
          12% { transform: translateY(0); opacity: 1; }
          85% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
