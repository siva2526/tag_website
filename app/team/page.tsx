'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBackground from '../components/PageBackground';
import { seasons, type BoardMember, type Season } from '../data/team';

// Style helpers based on RPG class
function getClassStyle(cls: BoardMember['class']) {
  switch (cls) {
    case 'tech':
      return {
        border: 'border-cyan-500/50 hover:border-cyan-400',
        badge: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40',
        glow: 'shadow-cyan-500/20',
        bar: 'from-cyan-400 to-cyan-600',
        icon: '⚡',
      };
    case 'gaming':
      return {
        border: 'border-green-500/50 hover:border-green-400',
        badge: 'bg-green-500/20 text-green-400 border border-green-500/40',
        glow: 'shadow-green-500/20',
        bar: 'from-green-400 to-green-600',
        icon: '🎮',
      };
    case 'management':
    default:
      return {
        border: 'border-yellow-400/50 hover:border-yellow-400',
        badge: 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40',
        glow: 'shadow-yellow-400/20',
        bar: 'from-yellow-400 to-yellow-600',
        icon: '👑',
      };
  }
}

function BoardMemberCard({ member }: { member: BoardMember }) {
  const [isHovered, setIsHovered] = useState(false);
  const style = getClassStyle(member.class);
  const isTBA = member.name === 'TBA';

  return (
    <div
      className={`relative bg-black/80 border-2 border-gray-800 ${style.border} rounded-xl p-6 transition-all duration-300 group`}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 20px 40px rgba(0,0,0,0.4)` : '0 4px 12px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border glow on hover */}
      <div className={`absolute inset-0 rounded-xl border-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} ${style.border.split(' ')[0]}`} />

      {/* Avatar */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className={`w-16 h-16 rounded-xl bg-gray-900 border-2 ${style.border.split(' ')[0]} flex items-center justify-center mb-3 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
          <span className="text-3xl">{member.avatar ?? '🎮'}</span>
        </div>

        {/* Position Badge */}
        <span className={`text-xs font-bold px-2 py-1 rounded-full mb-2 ${style.badge}`}>
          {style.icon} {member.class?.toUpperCase() ?? 'GUILD'}
        </span>

        {/* Position Title */}
        <h3 className="text-sm font-bold text-gray-400 mb-1 tracking-wider uppercase font-mono">
          {member.position}
        </h3>

        {/* Member Name */}
        <div className={`text-lg font-bold transition-colors duration-300 ${isHovered ? 'text-yellow-400' : isTBA ? 'text-gray-600' : 'text-white'}`}>
          {isTBA ? '[ TBA ]' : member.name}
        </div>

        {/* Tagline */}
        {member.tagline && (
          <p className="text-gray-500 text-xs font-mono mt-1 italic">
            &quot;{member.tagline}&quot;
          </p>
        )}
      </div>

      {/* Social links */}
      {member.socials && !isTBA && (
        <div className="flex justify-center gap-3 mb-4">
          {member.socials.linkedin && (
            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-gray-600 hover:text-yellow-400 transition-colors text-sm">in</a>
          )}
          {member.socials.github && (
            <a href={member.socials.github} target="_blank" rel="noopener noreferrer"
              className="text-gray-600 hover:text-yellow-400 transition-colors text-sm">gh</a>
          )}
          {member.socials.instagram && (
            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer"
              className="text-gray-600 hover:text-yellow-400 transition-colors text-sm">ig</a>
          )}
        </div>
      )}

      {/* XP Bar */}
      <div className="mt-auto pt-3 border-t border-gray-800">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-600 font-mono">RANK</span>
          <span className={`font-bold ${isHovered ? 'text-yellow-400' : 'text-gray-500'}`}>
            {isTBA ? 'RECRUITING' : 'ELITE'}
          </span>
        </div>
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${style.bar} transition-all duration-500`}
            style={{ width: isTBA ? '30%' : isHovered ? '90%' : '70%' }}
          />
        </div>
      </div>
    </div>
  );
}

function SeasonRoster({ season }: { season: Season }) {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {season.members.map((member) => (
          <BoardMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const currentSeason = seasons.find(s => s.isCurrent)!;
  const pastSeasons = seasons.filter(s => !s.isCurrent);
  const [activeSeason, setActiveSeason] = useState<number>(currentSeason.id);

  const selectedSeason = seasons.find(s => s.id === activeSeason) ?? currentSeason;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white overflow-hidden font-mono">
      <PageBackground />
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-8 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 font-mono mb-6">
              <Link href="/" className="hover:text-yellow-400 transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-yellow-400">GUILD ROSTER</span>
            </div>

            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              <span className="text-yellow-400 font-bold text-sm tracking-wider">GUILD_ROSTER</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Meet the <span className="text-yellow-400">Team</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-mono">
              The elite guild members who forge the future of TAG Club VIT.
            </p>
          </div>

          {/* Season Selector */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {seasons.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSeason(s.id)}
                className={`relative px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 border-2 ${
                  activeSeason === s.id
                    ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-lg shadow-yellow-400/20'
                    : 'border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                }`}
              >
                {s.label}
                {s.isCurrent && (
                  <span className="ml-2 text-xs bg-green-500/20 text-green-400 border border-green-500/40 px-1.5 py-0.5 rounded-full">
                    ACTIVE
                  </span>
                )}
                {activeSeason === s.id && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping" />
                )}
              </button>
            ))}
          </div>

          {/* Active Roster Banner */}
          <div className="bg-black/60 border-2 border-gray-800 rounded-xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-white">{selectedSeason.label}</h2>
                  {selectedSeason.isCurrent && (
                    <span className="flex items-center gap-1.5 text-xs bg-green-500/20 text-green-400 border border-green-500/40 px-2 py-1 rounded-full font-bold">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      ACTIVE ROSTER
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm font-mono">
                  Academic Year: {selectedSeason.year} • {selectedSeason.members.length} Officers
                </p>
              </div>
              <div className="text-right font-mono">
                <div className="text-3xl font-bold text-yellow-400">S{selectedSeason.season}</div>
                <div className="text-xs text-gray-600">SEASON</div>
              </div>
            </div>

            <SeasonRoster season={selectedSeason} />
          </div>
        </div>
      </section>

      {/* Hall of Fame for past seasons */}
      {pastSeasons.length > 0 && (
        <section className="py-12 px-8 bg-gradient-to-b from-black to-gray-950/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
                <span className="text-yellow-400/70 font-bold text-sm tracking-wider">HALL_OF_FAME</span>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                Past <span className="text-yellow-400">Seasons</span>
              </h2>
              <p className="text-gray-600 font-mono text-sm">Legendary guilds that shaped TAG Club</p>
            </div>

            <div className="space-y-8">
              {pastSeasons.map((season) => (
                <div key={season.id} className="bg-black/40 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-300">{season.label}</h3>
                      <p className="text-gray-600 text-xs font-mono">{season.year}</p>
                    </div>
                    <span className="text-xs bg-gray-800 text-gray-500 px-3 py-1 rounded-full border border-gray-700 font-mono">
                      ARCHIVED
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {season.members.map((member) => (
                      <div key={member.id}
                        className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center opacity-70 hover:opacity-100 transition-opacity"
                      >
                        <div className="text-2xl mb-1">{member.avatar}</div>
                        <div className="text-xs text-gray-500 font-mono mb-0.5">{member.position}</div>
                        <div className={`text-sm font-bold ${member.name === 'TBA' ? 'text-gray-700' : 'text-gray-300'}`}>
                          {member.name === 'TBA' ? '—' : member.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join CTA */}
      <section className="py-16 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-900/80 to-black border-2 border-yellow-400/30 rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold mb-3">
                Want to <span className="text-yellow-400">Join the Guild?</span>
              </h2>
              <p className="text-gray-400 font-mono text-sm mb-6">
                Recruitment opens every academic year. Stay tuned on our socials.
              </p>
              <a
                href="https://discord.com/invite/Y9cpqdvZE4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-400/25"
              >
                <span>🎮</span>
                JOIN DISCORD
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Inline scanline style */}
      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        .bg-scanline {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 50%
          );
          background-size: 100% 4px;
          animation: scanline 8s linear infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
