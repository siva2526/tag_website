'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBackground from '../components/PageBackground';
import MemberInspectModal from '../components/MemberInspectModal';
import { seasons, type BoardMember, type Season } from '../data/team';
import { playBlip, playSelect, playPowerUp } from '../components/SoundEffects';

function getClassStyle(cls: BoardMember['class']) {
  switch (cls) {
    case 'tech':
      return {
        border: 'border-cyan-500/50 hover:border-cyan-400',
        badge: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40',
        glow: 'shadow-cyan-500/20',
        bar: 'from-cyan-400 to-cyan-600',
        icon: '⚡',
        label: 'TECH FORGE',
      };
    case 'gaming':
      return {
        border: 'border-green-500/50 hover:border-green-400',
        badge: 'bg-green-500/20 text-green-400 border border-green-500/40',
        glow: 'shadow-green-500/20',
        bar: 'from-green-400 to-green-600',
        icon: '🎮',
        label: 'GAMING WARRIOR',
      };
    case 'management':
    default:
      return {
        border: 'border-yellow-400/50 hover:border-yellow-400',
        badge: 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40',
        glow: 'shadow-yellow-400/20',
        bar: 'from-yellow-400 to-yellow-600',
        icon: '👑',
        label: 'GUILD MASTER',
      };
  }
}

function BoardMemberCard({
  member,
  onInspect,
}: {
  member: BoardMember;
  onInspect: (member: BoardMember) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const style = getClassStyle(member.class);
  const isTBA = member.name === 'TBA';

  const handleClick = () => {
    playPowerUp();
    onInspect(member);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative bg-black/80 border-2 border-gray-800 ${style.border} rounded-xl p-5 transition-all duration-300 group cursor-pointer flex flex-col justify-between`}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? `0 16px 32px rgba(${member.class === 'tech' ? '6,182,212' : member.class === 'gaming' ? '34,197,94' : '255,244,0'}, 0.15)`
          : '0 4px 12px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        playBlip();
      }}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {/* Animated border glow on hover */}
      <div
        className={`absolute inset-0 rounded-xl border-2 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } ${style.border.split(' ')[0]}`}
      />

      {/* Top badges: Class & Level */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className={`px-2 py-0.5 rounded-full font-bold border ${style.badge}`}>
          {style.icon} {member.class.toUpperCase()}
        </span>
        <span className="text-gray-500 font-mono text-[11px] bg-gray-900 border border-gray-800 px-1.5 py-0.5 rounded">
          LVL.{member.level ?? 42}
        </span>
      </div>

      {/* Avatar & Info */}
      <div className="flex flex-col items-center text-center my-2">
        <div
          className={`w-16 h-16 rounded-xl bg-gray-950 border-2 ${
            style.border.split(' ')[0]
          } flex items-center justify-center mb-3 transition-transform duration-300 ${
            isHovered ? 'scale-110 shadow-lg' : ''
          }`}
        >
          <span className="text-3xl">{member.avatar ?? '🎮'}</span>
        </div>

        {/* Position Title */}
        <h3 className="text-xs font-bold text-gray-400 mb-1 tracking-wider uppercase font-mono">
          {member.position}
        </h3>

        {/* Member Name */}
        <div
          className={`text-base font-bold transition-colors duration-300 ${
            isHovered ? 'text-yellow-400' : isTBA ? 'text-gray-500' : 'text-white'
          }`}
        >
          {isTBA ? '[ TBA ]' : member.name}
        </div>

        {/* Specialization */}
        {member.specialization && (
          <span className="text-[11px] text-gray-500 font-mono mt-1">
            ⚡ {member.specialization}
          </span>
        )}
      </div>

      {/* Footer Info / XP Bar */}
      <div className="mt-4 pt-3 border-t border-gray-800/80">
        <div className="flex justify-between items-center text-[11px] mb-1.5">
          <span className="text-gray-500 font-mono">STATS</span>
          <span className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
            Inspect 🔍
          </span>
        </div>
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${style.bar} transition-all duration-500`}
            style={{ width: isTBA ? '40%' : isHovered ? '95%' : '75%' }}
          />
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const currentSeason = seasons.find((s) => s.isCurrent) ?? seasons[0];
  const [selectedSeasonId, setSelectedSeasonId] = useState<number>(currentSeason.id);
  const [seasonSearch, setSeasonSearch] = useState('');
  const [seasonFilter, setSeasonFilter] = useState<'all' | 'current' | 'legacy'>('all');
  const [memberClassFilter, setMemberClassFilter] = useState<'all' | 'management' | 'tech' | 'gaming'>('all');
  const [memberSearch, setMemberSearch] = useState('');
  const [inspectedMember, setInspectedMember] = useState<BoardMember | null>(null);

  // Filter seasons in the sidebar
  const filteredSeasons = useMemo(() => {
    return seasons.filter((s) => {
      const matchSearch =
        s.label.toLowerCase().includes(seasonSearch.toLowerCase()) ||
        s.year.toLowerCase().includes(seasonSearch.toLowerCase()) ||
        s.eraName.toLowerCase().includes(seasonSearch.toLowerCase()) ||
        s.season.toString() === seasonSearch.trim();

      if (!matchSearch) return false;

      if (seasonFilter === 'current') return s.isCurrent;
      if (seasonFilter === 'legacy') return !s.isCurrent;
      return true;
    });
  }, [seasonSearch, seasonFilter]);

  const activeSeason = seasons.find((s) => s.id === selectedSeasonId) ?? currentSeason;

  // Filter members of active season
  const filteredMembers = useMemo(() => {
    return activeSeason.members.filter((m) => {
      if (memberClassFilter !== 'all' && m.class !== memberClassFilter) return false;
      if (memberSearch.trim()) {
        const query = memberSearch.toLowerCase();
        return (
          m.name.toLowerCase().includes(query) ||
          m.position.toLowerCase().includes(query) ||
          (m.specialization && m.specialization.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [activeSeason, memberClassFilter, memberSearch]);

  const classCounts = useMemo(() => {
    return {
      management: activeSeason.members.filter((m) => m.class === 'management').length,
      tech: activeSeason.members.filter((m) => m.class === 'tech').length,
      gaming: activeSeason.members.filter((m) => m.class === 'gaming').length,
    };
  }, [activeSeason]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white overflow-hidden font-mono">
      <PageBackground />
      <Navbar />

      <main className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-6">
          <Link href="/" className="hover:text-yellow-400 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-yellow-400">GUILD ROSTER &amp; ARCHIVES</span>
        </div>

        {/* Header Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            <span className="text-yellow-400 font-bold text-xs tracking-widest">
              GUILD_OFFICERS // SEASON_ARCHIVES
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Board of <span className="text-yellow-400">Officers</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base font-mono">
            Explore the active council and journey through all {seasons.length} seasons of TAG Club leadership.
          </p>
        </div>

        {/* 2-Column Split: Scrollable Season Sidebar + Roster Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================
              LEFT COLUMN: SCROLLABLE SEASONS SIDEBAR
              Can scale from 3 to 50+ seasons seamlessly!
             ======================================================== */}
          <aside className="lg:col-span-4 xl:col-span-4 bg-black/80 border-2 border-gray-800 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-sm lg:sticky lg:top-28">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-lg">📜</span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  SEASONS CHRONICLE
                </span>
              </div>
              <span className="text-[11px] bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 px-2 py-0.5 rounded-full font-bold">
                {seasons.length} SEASONS
              </span>
            </div>

            {/* Season Search Input */}
            <div className="relative mb-3">
              <input
                type="text"
                value={seasonSearch}
                onChange={(e) => setSeasonSearch(e.target.value)}
                placeholder="Search season e.g. '2026', '2022'..."
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition-colors"
              />
              {seasonSearch && (
                <button
                  onClick={() => setSeasonSearch('')}
                  className="absolute right-2.5 top-2 text-xs text-gray-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Filter Tabs for Seasons */}
            <div className="flex gap-1.5 mb-3 text-[11px]">
              {(['all', 'current', 'legacy'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    playBlip();
                    setSeasonFilter(filter);
                  }}
                  className={`flex-1 py-1 px-2 rounded font-bold uppercase transition-all ${
                    seasonFilter === filter
                      ? 'bg-yellow-400 text-black shadow'
                      : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Scrollable Season List */}
            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredSeasons.length === 0 ? (
                <div className="text-center py-8 text-xs text-gray-600">
                  No seasons match &quot;{seasonSearch}&quot;
                </div>
              ) : (
                filteredSeasons.map((s) => {
                  const isSelected = s.id === activeSeason.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => {
                        playSelect();
                        setSelectedSeasonId(s.id);
                      }}
                      className={`relative p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                        isSelected
                          ? 'border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/15'
                          : 'border-gray-800/80 bg-gray-950/60 hover:border-gray-600 hover:bg-gray-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-bold font-mono ${
                              isSelected ? 'text-yellow-400' : 'text-white group-hover:text-yellow-400'
                            }`}
                          >
                            {s.label}
                          </span>
                          {s.isCurrent ? (
                            <span className="flex items-center gap-1 text-[10px] bg-green-500/20 text-green-400 border border-green-500/40 px-1.5 py-0.2 rounded-full font-bold">
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                              ACTIVE
                            </span>
                          ) : (
                            <span className="text-[10px] text-gray-600 font-mono">
                              ARCHIVED
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 font-mono">{s.year}</span>
                      </div>

                      <div className="text-xs text-gray-400 font-mono truncate">
                        &quot;{s.eraName}&quot;
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2 pt-1.5 border-t border-gray-800/60">
                        <span>{s.members.length} Council Seats</span>
                        <span className="text-yellow-400/80 group-hover:translate-x-1 transition-transform">
                          {isSelected ? 'Viewing ◀' : 'View →'}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="text-[11px] text-gray-600 text-center mt-3 pt-2 border-t border-gray-900">
              Scroll to browse all {seasons.length} club seasons
            </div>
          </aside>

          {/* ========================================================
              RIGHT COLUMN: ACTIVE ROSTER DISPLAY
             ======================================================== */}
          <section className="lg:col-span-8 xl:col-span-8 space-y-6">
            {/* Active Season Highlight Banner */}
            <div className="relative overflow-hidden bg-black/80 border-2 border-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        {activeSeason.label}
                      </h2>
                      {activeSeason.isCurrent && (
                        <span className="flex items-center gap-1.5 text-xs bg-green-500/20 text-green-400 border border-green-500/40 px-2.5 py-1 rounded-full font-bold">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          ACTIVE COUNCIL
                        </span>
                      )}
                    </div>
                    <div className="text-yellow-400 text-sm font-bold">
                      &quot;{activeSeason.eraName}&quot; • Academic Year {activeSeason.year}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-yellow-400 font-mono">
                        {activeSeason.label}
                      </div>
                      <div className="text-[11px] text-gray-500 font-mono">
                        {activeSeason.members.length} OFFICERS
                      </div>
                    </div>
                  </div>
                </div>

                {activeSeason.majorAchievement && (
                  <div className="bg-gray-950/70 border border-gray-800 rounded-xl p-3 text-xs text-gray-300 mb-4 flex items-start gap-2.5">
                    <span className="text-base">🏆</span>
                    <div>
                      <span className="text-yellow-400 font-bold">Season Hallmark:</span>{' '}
                      {activeSeason.majorAchievement}
                    </div>
                  </div>
                )}

                {/* Class composition breakdown */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 rounded-full">
                    👑 {classCounts.management} Management &amp; Ops
                  </span>
                  <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full">
                    ⚡ {classCounts.tech} Tech &amp; Design Forge
                  </span>
                  <span className="px-2.5 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full">
                    🎮 {classCounts.gaming} Gaming &amp; Esports
                  </span>
                </div>
              </div>
            </div>

            {/* Officer Search & Class Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Class Filter Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: 'all', label: `All (${activeSeason.members.length})`, icon: '👥' },
                  { key: 'management', label: 'Management', icon: '👑' },
                  { key: 'tech', label: 'Tech & Design', icon: '⚡' },
                  { key: 'gaming', label: 'Gaming & PR', icon: '🎮' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      playBlip();
                      setMemberClassFilter(tab.key as typeof memberClassFilter);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      memberClassFilter === tab.key
                        ? 'border-yellow-400 bg-yellow-400/15 text-yellow-400 shadow-md'
                        : 'border-gray-800 bg-black/60 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{tab.icon}</span> {tab.label}
                  </button>
                ))}
              </div>

              {/* Officer Search Box */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="Filter officers by name..."
                  className="w-full bg-black/80 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition-colors"
                />
                {memberSearch && (
                  <button
                    onClick={() => setMemberSearch('')}
                    className="absolute right-2 top-1.5 text-xs text-gray-500 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 10 Positions Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredMembers.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-black/60 border border-gray-800 rounded-2xl">
                  <div className="text-4xl mb-3">🔍</div>
                  <h4 className="text-base font-bold text-gray-400 mb-1">
                    NO OFFICERS FOUND
                  </h4>
                  <p className="text-xs text-gray-600 font-mono">
                    No officer matches the selected filters for {activeSeason.label}.
                  </p>
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <BoardMemberCard
                    key={member.id}
                    member={member}
                    onInspect={(m) => setInspectedMember(m)}
                  />
                ))
              )}
            </div>
          </section>
        </div>

        {/* Join CTA */}
        <section className="mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900/90 to-black border-2 border-yellow-400/30 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="relative z-10">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-2xl font-bold mb-2">
                Aspire to <span className="text-yellow-400">Join the Council?</span>
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm font-mono mb-6 max-w-xl mx-auto">
                Every legend begins as an initiate. Join the discord server, participate in raids, and climb the ranks to become an officer.
              </p>
              <a
                href="https://discord.com/invite/Y9cpqdvZE4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 text-black font-bold text-sm rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-400/25"
              >
                <span>🎮</span>
                JOIN THE GUILD DISCORD
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Member Dossier / Character Sheet Modal */}
      <MemberInspectModal
        member={inspectedMember}
        seasonLabel={activeSeason.label}
        seasonYear={activeSeason.year}
        onClose={() => setInspectedMember(null)}
      />

      <Footer />

      {/* Custom Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 244, 0, 0.3);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 244, 0, 0.6);
        }
      `}</style>
    </div>
  );
}
