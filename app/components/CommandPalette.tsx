'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { events } from '../data/events';
import { seasons } from '../data/team';
import { CLIPS } from '../data/clips';
import { YOUTUBE_CONFIG } from '../config/youtube';
import { playBlip, playSelect, playPowerUp, isSoundEnabled, setSoundEnabled } from './SoundEffects';
import { useToast } from './Toast';
import { triggerEasterEgg, EasterEggType } from './EasterEggs';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'Quests & Events' | 'Officers & Dossiers' | 'Clips & Plays' | 'Settings & Audio' | '🎮 Modern Game Cheats';
  icon: string;
  action: () => void;
  keywords?: string[];
  badge?: string;
}

export function openCommandPalette() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  }
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showToast } = useToast();

  // Listen for Ctrl+K, Cmd+K, or custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpen);
    };
  }, [isOpen]);

  // Focus input and reset selection on open
  useEffect(() => {
    if (isOpen) {
      playSelect();
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Extract unique active officers from latest seasons
  const officersList = useMemo(() => {
    const list: { name: string; position: string; year: string; class: string }[] = [];
    seasons.forEach((season) => {
      season.members.forEach((member) => {
        if (member.name !== 'TBA') {
          list.push({
            name: member.name,
            position: member.position,
            year: season.year,
            class: member.class,
          });
        }
      });
    });
    return list;
  }, []);

  // Construct master command list
  const allCommands = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [
      // ─────────────────────────────────────────────────────────────
      // NAVIGATION
      // ─────────────────────────────────────────────────────────────
      {
        id: 'nav-home',
        title: 'Home Lobby',
        subtitle: 'Return to main lobby and class selection',
        category: 'Navigation',
        icon: '🏠',
        keywords: ['home', 'lobby', 'main', 'start'],
        action: () => router.push('/'),
      },
      {
        id: 'nav-events',
        title: 'Quest Board // Events',
        subtitle: 'Browse tactical tournaments and hackathons',
        category: 'Navigation',
        icon: '⚔️',
        keywords: ['events', 'tournaments', 'quests', 'workshops', 'vgl'],
        action: () => router.push('/events'),
      },
      {
        id: 'nav-clips',
        title: 'Replay Cinema // Clips',
        subtitle: 'Watch member clutches, aces, and YouTube playlist',
        category: 'Navigation',
        icon: '🎬',
        keywords: ['clips', 'videos', 'youtube', 'highlights', 'cinema'],
        action: () => router.push('/clips'),
      },
      {
        id: 'nav-team',
        title: 'Board of Officers // Team',
        subtitle: 'Explore 7 seasons of TAG leadership dossiers',
        category: 'Navigation',
        icon: '📜',
        keywords: ['team', 'officers', 'board', 'seasons', 'members', 'president'],
        action: () => router.push('/team'),
      },
      {
        id: 'nav-pillars',
        title: 'Guild Pillars',
        subtitle: 'Technology (Dev) & Gaming (Esports) divisions',
        category: 'Navigation',
        icon: '⚡',
        keywords: ['pillars', 'tech', 'gaming', 'classes'],
        action: () => router.push('/#about'),
      },

      // ─────────────────────────────────────────────────────────────
      // MODERN GAME CHEATS & EASTER EGGS
      // ─────────────────────────────────────────────────────────────
      {
        id: 'egg-eldenring',
        title: 'Elden Ring: "YOU DIED"',
        subtitle: 'Trigger the legendary crimson death screen & lose 50,000 runes',
        category: '🎮 Modern Game Cheats',
        icon: '⚔️',
        badge: 'ELDEN RING',
        keywords: ['elden', 'ring', 'you died', 'souls', 'death', 'dark souls', 'malenia'],
        action: () => triggerEasterEgg('eldenring'),
      },
      {
        id: 'egg-helldivers',
        title: 'Helldivers 2: Call in 500KG Bomb',
        subtitle: 'Input stratagem combo ↑ → ↓ ↓ ↓ for orbital democracy delivery',
        category: '🎮 Modern Game Cheats',
        icon: '🚀',
        badge: 'HELLDIVERS',
        keywords: ['helldivers', '500kg', 'bomb', 'stratagem', 'democracy', 'super earth'],
        action: () => triggerEasterEgg('helldivers'),
      },
      {
        id: 'egg-valorant',
        title: 'Valorant: Trigger 5K Ace Banner',
        subtitle: 'Hear the ascending ace kill fanfare and skull banner',
        category: '🎮 Modern Game Cheats',
        icon: '👑',
        badge: 'VALORANT',
        keywords: ['valorant', 'ace', 'clutch', '5k', 'riot', 'jett'],
        action: () => triggerEasterEgg('valorant'),
      },
      {
        id: 'egg-gacha',
        title: 'Genshin / Star Rail: 5-Star Wish Pull',
        subtitle: 'Golden shooting star & SSR character card acquisition',
        category: '🎮 Modern Game Cheats',
        icon: '✨',
        badge: 'GACHA',
        keywords: ['gacha', 'genshin', 'wish', 'star rail', 'pull', 'ssr', '5 star'],
        action: () => triggerEasterEgg('gacha'),
      },
      {
        id: 'egg-sandevistan',
        title: 'Cyberpunk 2077: Militech Sandevistan',
        subtitle: 'Overclock neural reflexes with 200% time-dilation',
        category: '🎮 Modern Game Cheats',
        icon: '⚡',
        badge: 'CYBERPUNK',
        keywords: ['sandevistan', 'cyberpunk', 'edgerunners', 'david', 'slow mo', 'sandy'],
        action: () => triggerEasterEgg('sandevistan'),
      },
      {
        id: 'egg-minecraft',
        title: 'Minecraft: Unlock "Diamonds!" Advancement',
        subtitle: 'Pop down the classic retro achievement banner',
        category: '🎮 Modern Game Cheats',
        icon: '💎',
        badge: 'MINECRAFT',
        keywords: ['minecraft', 'advancement', 'achievement', 'diamonds'],
        action: () => triggerEasterEgg('minecraft'),
      },
      {
        id: 'egg-konami',
        title: 'Konami Code: +9,999 XP Gold Coin Shower',
        subtitle: 'Trigger the floating 8-bit gold coins and level up fanfare',
        category: '🎮 Modern Game Cheats',
        icon: '🪙',
        badge: 'RETRO',
        keywords: ['konami', 'cheat', 'coins', 'level up', 'xp'],
        action: () => triggerEasterEgg('konami'),
      },
      {
        id: 'egg-d20',
        title: 'Roll a D20 (Dungeons & Dragons)',
        subtitle: 'Roll a twenty-sided die for an initiative check',
        category: '🎮 Modern Game Cheats',
        icon: '🎲',
        badge: 'D&D',
        keywords: ['d20', 'dice', 'roll', 'dnd', 'critical'],
        action: () => {
          const roll = Math.floor(Math.random() * 20) + 1;
          if (roll === 20) {
            playPowerUp();
            showToast('🎲 NATURAL 20! Critical Hit! Maximum guild damage dealt.', { type: 'xp', icon: '🔥' });
          } else if (roll === 1) {
            playBlip();
            showToast('🎲 NATURAL 1! Critical Miss! You dropped your weapon.', { type: 'warning', icon: '💀' });
          } else {
            playBlip();
            showToast(`🎲 D20 Roll: You rolled a ${roll}! Check passed.`, { type: 'info', icon: '🎲' });
          }
        },
      },

      // ─────────────────────────────────────────────────────────────
      // SETTINGS & AUDIO
      // ─────────────────────────────────────────────────────────────
      {
        id: 'util-sound',
        title: isSoundEnabled() ? 'Mute Retro Sound FX' : 'Enable Retro Sound FX',
        subtitle: 'Toggle 8-bit audio blips and fanfares',
        category: 'Settings & Audio',
        icon: isSoundEnabled() ? '🔊' : '🔇',
        keywords: ['sound', 'audio', 'mute', 'sfx', 'music'],
        action: () => {
          const next = !isSoundEnabled();
          setSoundEnabled(next);
          if (next) playBlip();
          showToast(next ? '🔊 Retro SFX: ENABLED' : '🔇 Retro SFX: MUTED', {
            type: 'info',
            icon: next ? '🔊' : '🔇',
          });
        },
      },
      {
        id: 'util-discord',
        title: 'Copy Discord Invite URL',
        subtitle: 'https://discord.com/invite/Y9cpqdvZE4',
        category: 'Settings & Audio',
        icon: '💬',
        keywords: ['discord', 'invite', 'join', 'server', 'chat'],
        action: () => {
          navigator.clipboard.writeText('https://discord.com/invite/Y9cpqdvZE4');
          showToast('📋 Discord invite copied to clipboard!', { type: 'success', icon: '📋' });
        },
      },
      {
        id: 'util-email',
        title: 'Copy Guild Master Email',
        subtitle: 'tag@vit.ac.in',
        category: 'Settings & Audio',
        icon: '✉️',
        keywords: ['email', 'contact', 'mail', 'support'],
        action: () => {
          navigator.clipboard.writeText('tag@vit.ac.in');
          showToast('📋 Email tag@vit.ac.in copied!', { type: 'success', icon: '📋' });
        },
      },
      {
        id: 'util-youtube',
        title: 'Open TAG YouTube Channel',
        subtitle: YOUTUBE_CONFIG.channelUrl,
        category: 'Settings & Audio',
        icon: '▶',
        keywords: ['youtube', 'channel', 'stream', 'video'],
        action: () => window.open(YOUTUBE_CONFIG.channelUrl, '_blank', 'noopener,noreferrer'),
      },

      // ─────────────────────────────────────────────────────────────
      // QUESTS & TOURNAMENTS (from events data)
      // ─────────────────────────────────────────────────────────────
      ...events.map((e) => ({
        id: `event-${e.id}`,
        title: e.title,
        subtitle: `${e.date} • ${e.fullDate} (${e.status.toUpperCase()})`,
        category: 'Quests & Events' as const,
        icon: e.category === 'Technology' ? '⚡' : '🎮',
        badge: e.status.toUpperCase(),
        keywords: ['quest', 'event', e.title, e.category, e.status, e.difficulty || ''],
        action: () => {
          if (e.link) {
            window.open(e.link, '_blank', 'noopener,noreferrer');
          } else {
            router.push('/events');
          }
        },
      })),

      // ─────────────────────────────────────────────────────────────
      // OFFICERS & LEADERS (from team seasons)
      // ─────────────────────────────────────────────────────────────
      ...officersList.map((m, idx) => ({
        id: `officer-${idx}`,
        title: m.name,
        subtitle: `${m.position} • Season ${m.year} (${m.class.toUpperCase()})`,
        category: 'Officers & Dossiers' as const,
        icon: m.class === 'tech' ? '⚡' : m.class === 'gaming' ? '🎮' : '👑',
        badge: `S-${m.year}`,
        keywords: ['officer', 'leader', m.name, m.position, m.year, m.class],
        action: () => router.push('/team'),
      })),

      // ─────────────────────────────────────────────────────────────
      // CLIPS & PLAYS
      // ─────────────────────────────────────────────────────────────
      ...CLIPS.map((clip) => ({
        id: `clip-${clip.id}`,
        title: clip.title,
        subtitle: `${clip.game} • ${clip.player} (${clip.duration})`,
        category: 'Clips & Plays' as const,
        icon: '🎬',
        badge: clip.game,
        keywords: ['clip', 'highlight', clip.title, clip.game, clip.player, ...clip.tags],
        action: () => router.push('/clips'),
      })),
    ];

    return items;
  }, [officersList, router, showToast]);

  // Filter commands by query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return allCommands.slice(0, 24); // Show top default suggestions
    const q = query.toLowerCase();
    return allCommands.filter((item) => {
      if (item.title.toLowerCase().includes(q)) return true;
      if (item.subtitle?.toLowerCase().includes(q)) return true;
      if (item.category.toLowerCase().includes(q)) return true;
      if (item.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [allCommands, query]);

  // Group filtered commands by category
  const groupedCommands = useMemo(() => {
    const groups: { [key: string]: CommandItem[] } = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // Keyboard navigation within the filtered results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      playBlip();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      playBlip();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredCommands[selectedIndex];
      if (selected) {
        playPowerUp();
        setIsOpen(false);
        selected.action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md font-mono"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl bg-black border-2 border-yellow-400 rounded-2xl overflow-hidden shadow-2xl font-mono flex flex-col max-h-[80vh]"
        style={{
          boxShadow: '0 0 60px rgba(255, 244, 0, 0.3)',
          animation: 'paletteIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* CRT Scanline */}
        <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />

        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-gray-950 border-b border-gray-800 shrink-0">
          <span className="text-yellow-400 text-lg">⚡</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, quest, game cheat, or officer name..."
            className="flex-1 bg-transparent text-white placeholder-gray-600 text-sm outline-none font-mono"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-gray-500 hover:text-white text-xs px-2 py-1"
            >
              ✕
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] bg-gray-900 text-gray-500 border border-gray-800 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 sm:p-3 space-y-4 flex-1">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-xs">
              <div className="text-3xl mb-2">👾</div>
              <div>NO GUILD PROTOCOLS MATCH &quot;{query}&quot;</div>
              <div className="text-gray-600 text-[11px] mt-1">
                Try searching &quot;elden&quot;, &quot;valorant&quot;, &quot;500kg&quot;, or &quot;events&quot;
              </div>
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, items]) => (
              <div key={category}>
                <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase px-3 py-1">
                  {category}
                </div>
                <div className="space-y-1">
                  {items.map((item) => {
                    const currentIndex = filteredCommands.findIndex((c) => c.id === item.id);
                    const isSelected = currentIndex === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          playPowerUp();
                          setIsOpen(false);
                          item.action();
                        }}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/50 shadow-md'
                            : 'hover:bg-gray-900/60 text-gray-300 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-base shrink-0">{item.icon}</span>
                          <div className="truncate">
                            <div className="text-xs sm:text-sm font-bold text-white truncate">
                              {item.title}
                            </div>
                            {item.subtitle && (
                              <div className="text-[11px] text-gray-500 truncate">
                                {item.subtitle}
                              </div>
                            )}
                          </div>
                        </div>

                        {item.badge && (
                          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-yellow-400">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="px-4 py-2.5 bg-gray-950 border-t border-gray-900 flex items-center justify-between text-[11px] text-gray-500 shrink-0">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-yellow-400/80 font-bold hidden sm:inline">
            TAG COMMAND PALETTE // v4.2
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes paletteIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
