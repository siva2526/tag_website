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
      border: 'border-cyan-400/50',
      bg: 'bg-cyan-500/10',
      badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      bar: 'from-cyan-500 to-cyan-300',
      glow: 'rgba(0, 240, 255, 0.2)',
    },
    gaming: {
      text: 'text-emerald-400',
      border: 'border-emerald-400/50',
      bg: 'bg-emerald-500/10',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      bar: 'from-emerald-500 to-emerald-300',
      glow: 'rgba(52, 211, 153, 0.2)',
    },
    management: {
      text: 'text-yellow-400',
      border: 'border-yellow-400/50',
      bg: 'bg-yellow-400/10',
      badge: 'bg-yellow-400/15 text-yellow-300 border-yellow-400/30',
      bar: 'from-yellow-400 to-yellow-600',
      glow: 'rgba(255, 244, 0, 0.2)',
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
      onClick={() => {
        playBlip();
        onClose();
      }}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0c0c12] border-2 ${classColor.border} rounded-2xl shadow-[6px_6px_0px_0px_#fff400] p-6 sm:p-8`}
        style={{
          animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_8px_#fff400]" />
            <span className="text-xs text-zinc-400 font-mono">
              GUILD_DOSSIER // {seasonLabel} ({seasonYear})
            </span>
          </div>
          <button
            onClick={() => {
              playBlip();
              onClose();
            }}
            className="text-zinc-400 hover:text-white font-mono font-bold text-xs px-3 py-1.5 min-h-[38px] flex items-center justify-center rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Close dossier"
          >
            ESC ✕
          </button>
        </div>

        {/* Member Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-left">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-900 border-2 ${classColor.border} flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-lg`}
          >
            {member.avatar ?? '🎮'}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${classColor.badge}`}>
                {member.class.toUpperCase()}
              </span>
              <span className="text-zinc-500 font-mono text-[11px] bg-zinc-900 border border-white/10 px-2 py-0.5 rounded">
                LVL.{member.level ?? 42}
              </span>
              {member.specialization && (
                <span className="text-yellow-400/90 font-mono text-[11px] bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded">
                  ⚡ {member.specialization}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
              {member.name}
            </h2>
            <div className={`text-xs font-mono font-bold ${classColor.text} tracking-wider uppercase mb-2`}>
              {member.position}
            </div>

            {member.tagline && (
              <p className="text-xs sm:text-sm text-zinc-400 italic">
                &ldquo;{member.tagline}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Stats Radar-style Bars */}
        <div className="space-y-3 mb-6 bg-zinc-900/60 border border-white/[0.06] rounded-xl p-4 sm:p-5">
          <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
            // TELEMETRY &amp; MASTERY STATS
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-zinc-400">⚡ Code &amp; Technology Mastery</span>
              <span className="text-cyan-400 font-bold">{stats.tech}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
                style={{ width: `${stats.tech}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-zinc-400">🎮 Arena &amp; Gaming Reflex</span>
              <span className="text-emerald-400 font-bold">{stats.gaming}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
                style={{ width: `${stats.gaming}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-zinc-400">👑 Leadership &amp; Guild Strategy</span>
              <span className="text-yellow-400 font-bold">{stats.management}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"
                style={{ width: `${stats.management}%` }}
              />
            </div>
          </div>
        </div>

        {/* Skills & Favorite Game */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {member.skills && member.skills.length > 0 && (
            <div className="bg-zinc-900/60 border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-zinc-500 uppercase font-mono mb-2">EQUIPPED SKILLS</div>
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-zinc-800 text-zinc-300 border border-white/10 px-2 py-0.5 rounded font-mono"
                  >
                    ⚔️ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {member.favoriteGame && (
            <div className="bg-zinc-900/60 border border-white/[0.06] rounded-xl p-4">
              <div className="text-xs text-zinc-500 uppercase font-mono mb-2">FAVORITE GAME</div>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>🎮</span>
                <span>{member.favoriteGame}</span>
              </div>
            </div>
          )}
        </div>

        {/* Social / Direct Connect Node */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.08] text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {member.socials?.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-yellow-400 hover:text-black border border-white/10 hover:border-yellow-400 text-zinc-300 transition-all font-mono font-bold"
              >
                LinkedIn ↗
              </a>
            )}
            {member.socials?.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-yellow-400 hover:text-black border border-white/10 hover:border-yellow-400 text-zinc-300 transition-all font-mono font-bold"
              >
                GitHub ↗
              </a>
            )}
            {member.socials?.instagram && (
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-yellow-400 hover:text-black border border-white/10 hover:border-yellow-400 text-zinc-300 transition-all font-mono font-bold"
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
            className="w-full sm:w-auto px-6 py-2.5 bg-yellow-400 text-black font-extrabold text-xs rounded-xl hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(255,244,0,0.25)] min-h-[40px] flex items-center justify-center font-mono"
          >
            DISMISS DOSSIER
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
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
