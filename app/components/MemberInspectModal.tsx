'use client';

import { useEffect } from 'react';
import { BoardMember } from '../data/team';
import { playBlip } from './SoundEffects';

interface MemberInspectModalProps {
  member: BoardMember | null;
  seasonLabel: string;
  seasonYear: string;
  onClose: () => void;
}

export default function MemberInspectModal({
  member,
  seasonLabel,
  seasonYear,
  onClose,
}: MemberInspectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playBlip();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!member) return null;

  const classColor = {
    tech: {
      text: 'text-cyan-400',
      border: 'border-cyan-400',
      bg: 'bg-cyan-500/10',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      bar: 'from-cyan-500 to-cyan-300',
    },
    gaming: {
      text: 'text-green-400',
      border: 'border-green-400',
      bg: 'bg-green-500/10',
      badge: 'bg-green-500/20 text-green-300 border-green-500/40',
      bar: 'from-green-500 to-green-300',
    },
    management: {
      text: 'text-yellow-400',
      border: 'border-yellow-400',
      bg: 'bg-yellow-400/10',
      badge: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/40',
      bar: 'from-yellow-400 to-yellow-600',
    },
  }[member.class];

  const stats = member.stats ?? {
    tech: member.class === 'tech' ? 95 : 75,
    gaming: member.class === 'gaming' ? 95 : 75,
    management: member.class === 'management' ? 95 : 75,
    mana: 85,
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={() => {
        playBlip();
        onClose();
      }}
    >
      <div
        className={`relative w-full max-w-2xl bg-black border-2 ${classColor.border} rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 font-mono`}
        style={{
          boxShadow: `0 0 50px rgba(${member.class === 'tech' ? '6,182,212' : member.class === 'gaming' ? '34,197,94' : '255,244,0'}, 0.25)`,
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CRT Scanline */}
        <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400 font-mono">
              GUILD_DOSSIER // {seasonLabel} ({seasonYear})
            </span>
          </div>
          <button
            onClick={() => {
              playBlip();
              onClose();
            }}
            className="text-gray-400 hover:text-yellow-400 font-bold text-sm px-2 py-1 rounded hover:bg-gray-900 transition-colors"
          >
            [ ESC ✕ ]
          </button>
        </div>

        {/* Header Profile Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          <div
            className={`w-24 h-24 rounded-2xl ${classColor.bg} border-2 ${classColor.border} flex items-center justify-center shrink-0 shadow-lg`}
          >
            <span className="text-5xl">{member.avatar ?? '🎮'}</span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${classColor.badge}`}>
                {member.class.toUpperCase()} CLASS
              </span>
              <span className="text-xs bg-gray-900 border border-gray-800 text-gray-400 px-2.5 py-1 rounded-full">
                LVL.{member.level ?? 42}
              </span>
              {member.specialization && (
                <span className="text-xs bg-gray-900 border border-gray-800 text-yellow-400 px-2.5 py-1 rounded-full">
                  SPECS: {member.specialization}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">{member.name}</h2>
            <div className={`text-sm font-bold uppercase tracking-wider ${classColor.text}`}>
              {member.position}
            </div>
            {member.tagline && (
              <p className="text-gray-400 text-xs italic mt-2">&quot;{member.tagline}&quot;</p>
            )}
          </div>
        </div>

        {/* Character Attributes / Stats Bars */}
        <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-5 mb-6 space-y-3">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            // BATTLE &amp; GUILD ATTRIBUTES
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-cyan-400 font-bold">TECH FORGE &amp; CODE</span>
              <span className="text-gray-400">{stats.tech} / 100</span>
            </div>
            <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-700"
                style={{ width: `${stats.tech}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-green-400 font-bold">GAMING REFLEX &amp; TACTICS</span>
              <span className="text-gray-400">{stats.gaming} / 100</span>
            </div>
            <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-700"
                style={{ width: `${stats.gaming}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-yellow-400 font-bold">GUILD LEADERSHIP &amp; OPS</span>
              <span className="text-gray-400">{stats.management} / 100</span>
            </div>
            <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-700"
                style={{ width: `${stats.management}%` }}
              />
            </div>
          </div>
        </div>

        {/* Skills / Inventory & Favorite Game */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {member.skills && member.skills.length > 0 && (
            <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-4">
              <div className="text-xs text-gray-500 uppercase font-mono mb-2">EQUIPPED SKILLS</div>
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-gray-900 text-gray-300 border border-gray-700 px-2 py-0.5 rounded"
                  >
                    ⚔️ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {member.favoriteGame && (
            <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-4">
              <div className="text-xs text-gray-500 uppercase font-mono mb-2">FAVORITE GAME</div>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>🎮</span>
                <span>{member.favoriteGame}</span>
              </div>
            </div>
          )}
        </div>

        {/* Social Links & Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            {member.socials?.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 bg-gray-900 hover:bg-yellow-400 hover:text-black border border-gray-800 hover:border-yellow-400 text-gray-300 rounded transition-all font-bold"
              >
                LinkedIn ↗
              </a>
            )}
            {member.socials?.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 bg-gray-900 hover:bg-yellow-400 hover:text-black border border-gray-800 hover:border-yellow-400 text-gray-300 rounded transition-all font-bold"
              >
                GitHub ↗
              </a>
            )}
            {member.socials?.instagram && (
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 bg-gray-900 hover:bg-yellow-400 hover:text-black border border-gray-800 hover:border-yellow-400 text-gray-300 rounded transition-all font-bold"
              >
                Instagram ↗
              </a>
            )}
          </div>

          <button
            onClick={() => {
              playBlip();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2 bg-yellow-400 text-black font-bold text-xs rounded hover:bg-yellow-300 transition-colors"
          >
            DISMISS DOSSIER
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
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

