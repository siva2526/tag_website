'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { events } from '../data/events';
import { seasons } from '../data/team';
import { CLIPS } from '../data/clips';
import { YOUTUBE_CONFIG } from '../config/youtube';
import { playBlip, playSelect, playPowerUp, isSoundEnabled, setSoundEnabled } from './SoundEffects';
import { useToast } from './Toast';
import { ACHIEVEMENTS, getUnlockedAchievements } from './EasterEggs';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'Quests & Events' | 'Officers & Dossiers' | 'Clips & Plays' | 'Settings & Guild';
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
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showToast } = useToast();

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() =>
    typeof window !== 'undefined' ? getUnlockedAchievements() : []
  );

  useEffect(() => {
    const refresh = () => setUnlockedAchievements(getUnlockedAchievements());
    window.addEventListener('tag:achievement-unlocked', refresh);
    return () => window.removeEventListener('tag:achievement-unlocked', refresh);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (showAchievementsModal) {
          setShowAchievementsModal(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
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
  }, [isOpen, showAchievementsModal]);

  useEffect(() => {
    if (isOpen) {
      playSelect();
      const timer = setTimeout(() => {
        setQuery('');
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  const allCommands = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [
      // NAVIGATION
      {
        id: 'nav-home',
        title: 'Home Lobby',
        subtitle: 'Return to main lobby and archetype selector',
        category: 'Navigation',
        icon: '🏠',
        keywords: ['lobby', 'home', 'landing', 'start', 'main'],
        action: () => router.push('/'),
      },
      {
        id: 'nav-events',
        title: 'Quest Board (Events)',
        subtitle: 'Explore competitive tournaments, game jams & hackathons',
        category: 'Navigation',
        icon: '📋',
        keywords: ['events', 'quests', 'tournaments', 'jams', 'hackathons'],
        badge: `${events.length} Quests`,
        action: () => router.push('/events'),
      },
      {
        id: 'nav-clips',
        title: 'Replay Cinema (Clips)',
        subtitle: 'Watch clutches, tournament highlights & YouTube plays',
        category: 'Navigation',
        icon: '🎬',
        keywords: ['clips', 'replays', 'youtube', 'vods', 'highlights', 'videos'],
        badge: `${CLIPS.length} Clips`,
        action: () => router.push('/clips'),
      },
      {
        id: 'nav-team',
        title: 'Board Chronicle (Team)',
        subtitle: `Browse council officers and all ${seasons.length} seasons of archives`,
        category: 'Navigation',
        icon: '🛡️',
        keywords: ['team', 'council', 'board', 'members', 'officers', 'seasons', 'legacy'],
        badge: `${seasons.length} Seasons`,
        action: () => router.push('/team'),
      },
      {
        id: 'nav-discord',
        title: 'Join Discord Guild',
        subtitle: 'Direct jump to the official TAG Club Discord server',
        category: 'Navigation',
        icon: '🎮',
        keywords: ['discord', 'chat', 'server', 'community', 'join'],
        badge: 'External ↗',
        action: () => window.open('https://discord.com/invite/Y9cpqdvZE4', '_blank'),
      },
      {
        id: 'nav-youtube-channel',
        title: 'TAG YouTube Channel',
        subtitle: 'Watch official highlights and tournament streams',
        category: 'Navigation',
        icon: '▶',
        keywords: ['youtube', 'channel', 'stream', 'broadcast', 'vod'],
        badge: 'External ↗',
        action: () => window.open(YOUTUBE_CONFIG.channelUrl, '_blank'),
      },

      // SETTINGS & GUILD
      {
        id: 'guild-achievements',
        title: 'Guild Achievements Logbook',
        subtitle: `${unlockedAchievements.length} of ${ACHIEVEMENTS.length} secret easter eggs discovered through interactions`,
        category: 'Settings & Guild',
        icon: '🏆',
        keywords: ['achievements', 'secrets', 'easter eggs', 'trophies', 'how did we get here', 'diamonds', '500kg'],
        badge: `${unlockedAchievements.length}/${ACHIEVEMENTS.length} Found`,
        action: () => setShowAchievementsModal(true),
      },
      {
        id: 'set-sfx-toggle',
        title: 'Toggle Retro Audio SFX',
        subtitle: isSoundEnabled() ? 'Currently: ENABLED (Click to Mute)' : 'Currently: MUTED (Click to Enable)',
        category: 'Settings & Guild',
        icon: isSoundEnabled() ? '🔊' : '🔇',
        keywords: ['sound', 'audio', 'sfx', 'mute', 'volume'],
        badge: isSoundEnabled() ? 'ON' : 'OFF',
        action: () => {
          const next = !isSoundEnabled();
          setSoundEnabled(next);
          if (next) playBlip();
          showToast(next ? '🔊 Audio SFX Enabled' : '🔇 Audio SFX Muted', {
            type: 'info',
            icon: next ? '🔊' : '🔇',
          });
        },
      },
      {
        id: 'set-copy-link',
        title: 'Share Website Link',
        subtitle: 'Copy URL to clipboard to invite peers to TAG Club',
        category: 'Settings & Guild',
        icon: '🔗',
        keywords: ['share', 'copy', 'url', 'invite'],
        action: () => {
          playBlip();
          if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.origin);
            showToast('🔗 Website link copied to clipboard!', { type: 'success', icon: '📋' });
          }
        },
      },
    ];

    // Dynamic Quests / Events
    events.slice(0, 6).forEach((event) => {
      items.push({
        id: `event-${event.id}`,
        title: event.title,
        subtitle: `${event.fullDate} • ${event.category} (${event.status.toUpperCase()})`,
        category: 'Quests & Events',
        icon: event.category === 'Technology' ? '⚡' : '🎮',
        keywords: [event.title, event.category, event.status, event.date],
        badge: event.xpReward ?? 'Quest',
        action: () => {
          if (event.link) window.open(event.link, '_blank');
          else router.push('/events');
        },
      });
    });

    // Dynamic Clips
    CLIPS.slice(0, 5).forEach((clip) => {
      items.push({
        id: `clip-${clip.id}`,
        title: clip.title,
        subtitle: `${clip.game} • by ${clip.player} (${clip.duration})`,
        category: 'Clips & Plays',
        icon: '🎬',
        keywords: [clip.title, clip.player, clip.game, ...clip.tags],
        badge: clip.views,
        action: () => router.push('/clips'),
      });
    });

    // Dynamic Officers
    officersList.slice(0, 8).forEach((officer, idx) => {
      items.push({
        id: `officer-${idx}`,
        title: officer.name,
        subtitle: `${officer.position} • Council ${officer.year}`,
        category: 'Officers & Dossiers',
        icon: officer.class === 'tech' ? '⚡' : officer.class === 'gaming' ? '🎮' : '👑',
        keywords: [officer.name, officer.position, officer.year],
        badge: officer.class.toUpperCase(),
        action: () => router.push('/team'),
      });
    });

    return items;
  }, [router, officersList, unlockedAchievements, showToast]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return allCommands;
    const q = query.toLowerCase().trim();

    return allCommands.filter((cmd) => {
      if (cmd.title.toLowerCase().includes(q)) return true;
      if (cmd.subtitle?.toLowerCase().includes(q)) return true;
      if (cmd.category.toLowerCase().includes(q)) return true;
      if (cmd.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [allCommands, query]);

  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playBlip();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playBlip();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
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
      className="fixed inset-0 z-[9998] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-xl"
      onClick={() => {
        setIsOpen(false);
        setShowAchievementsModal(false);
      }}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0c0c12] border-2 border-yellow-400 rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#fff400] flex flex-col max-h-[80vh]"
        style={{
          animation: 'paletteIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-zinc-950 border-b-2 border-zinc-800 shrink-0">
          <span className="text-yellow-400 text-lg">⚡</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, quest, clip, or officer name..."
            className="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm outline-none font-sans"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-500 hover:text-white text-xs px-2 py-1 font-mono"
            >
              ✕
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-700 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 sm:p-3 space-y-4 flex-1">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              <div className="text-3xl mb-2">👾</div>
              <div>NO GUILD PROTOCOLS MATCH &quot;{query}&quot;</div>
              <div className="text-zinc-600 text-[11px] font-mono mt-1">
                Try searching &quot;achievements&quot;, &quot;events&quot;, &quot;clips&quot;, or &quot;discord&quot;
              </div>
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, items]) => (
              <div key={category}>
                <div className="text-[10px] font-mono font-bold text-yellow-400/90 tracking-widest uppercase px-3 py-1 flex items-center justify-between">
                  <span>{`// ${category}`}</span>
                  <span className="text-zinc-600">[{items.length}]</span>
                </div>
                <div className="space-y-1.5">
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
                        className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-yellow-400 text-black border-black font-semibold shadow-[3px_3px_0px_0px_#ffffff] translate-x-1'
                            : 'bg-zinc-950/60 hover:bg-zinc-900 text-zinc-300 border-zinc-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-base shrink-0">{item.icon}</span>
                          <div className="truncate">
                            <div className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-black' : 'text-white'}`}>
                              {item.title}
                            </div>
                            {item.subtitle && (
                              <div className={`text-[11px] truncate ${isSelected ? 'text-zinc-800' : 'text-zinc-500'}`}>
                                {item.subtitle}
                              </div>
                            )}
                          </div>
                        </div>

                        {item.badge && (
                          <span
                            className={`shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                              isSelected
                                ? 'bg-black text-yellow-400 border-black'
                                : 'bg-zinc-900 border-zinc-800 text-yellow-400'
                            }`}
                          >
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
        <div className="px-4 py-2.5 bg-zinc-950 border-t-2 border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 font-mono shrink-0">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-yellow-400/90 font-bold hidden sm:inline">
            COMMAND PALETTE // v4.2
          </span>
        </div>
      </div>

      {/* Secret Achievements Tracker Modal */}
      {showAchievementsModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
          onClick={() => setShowAchievementsModal(false)}
        >
          <div
            className="relative w-full max-w-xl bg-[#0c0c12] border-2 border-yellow-400 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#fff400] max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <div>
                  <h3 className="font-arcade text-xs text-white">Guild Secrets &amp; Achievements</h3>
                  <div className="font-terminal text-sm text-yellow-400">
                    {unlockedAchievements.length} / {ACHIEVEMENTS.length} DISCOVERED THROUGH INTERACTIONS
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAchievementsModal(false)}
                className="text-zinc-400 hover:text-white font-mono text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800"
              >
                ESC ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Secrets are unlocked by performing specific tactical interactions with the website (exploration, combos, and hidden markers).
            </p>

            <div className="space-y-2.5">
              {ACHIEVEMENTS.map((ach) => {
                const isUnlocked = unlockedAchievements.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-xl border-2 transition-all ${
                      isUnlocked
                        ? 'bg-yellow-400/10 border-yellow-400/60 shadow-[2px_2px_0px_0px_#fff400]'
                        : 'bg-zinc-950/80 border-zinc-800/80 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{ach.icon}</span>
                        <span className="font-bold text-sm text-white">{ach.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400">
                          {ach.game}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isUnlocked
                            ? 'bg-yellow-400 text-black font-extrabold'
                            : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                        }`}
                      >
                        {isUnlocked ? 'UNLOCKED ✓' : 'LOCKED 🔒'}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-300 ml-7 mb-1">
                      {isUnlocked ? ach.description : ach.hint}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800 text-center">
              <button
                onClick={() => setShowAchievementsModal(false)}
                className="px-6 py-2 bg-yellow-400 text-black font-extrabold text-xs rounded-lg hover:bg-yellow-300 font-mono shadow-[2px_2px_0px_0px_#fff]"
              >
                CLOSE LOGBOOK
              </button>
            </div>
          </div>
        </div>
      )}

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
