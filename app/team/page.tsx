'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBackground from '../components/PageBackground';
import MemberInspectModal from '../components/MemberInspectModal';
import { seasons, type BoardMember } from '../data/team';
import { playBlip, playSelect, playPowerUp } from '../components/SoundEffects';
import { recordPageVisit, recordInteraction } from '../components/EasterEggs';

function getClassStyle(cls: BoardMember['class']) {
  switch (cls) {
    case 'tech':
      return {
        border: 'border-cyan-500/30 hover:border-cyan-400/60',
        badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
        glow: 'shadow-[0_8px_30px_rgba(0,240,255,0.12)]',
        bar: 'from-cyan-500 to-cyan-300',
        icon: '⚡',
        label: 'TECH FORGE',
      };
    case 'gaming':
      return {
        border: 'border-emerald-500/30 hover:border-emerald-400/60',
        badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        glow: 'shadow-[0_8px_30px_rgba(52,211,153,0.12)]',
        bar: 'from-emerald-500 to-emerald-300',
        icon: '🎮',
        label: 'GAMING WARRIOR',
      };
    case 'management':
    default:
      return {
        border: 'border-yellow-400/30 hover:border-yellow-400/60',
        badge: 'bg-yellow-400/15 text-yellow-300 border-yellow-400/30',
        glow: 'shadow-[0_8px_30px_rgba(255,244,0,0.12)]',
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
    recordInteraction('inspect');
    onInspect(member);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative bg-[#0c0c12] border-2 ${style.border} rounded-2xl p-5 transition-all duration-200 group cursor-pointer flex flex-col justify-between ${
        isHovered ? 'shadow-[4px_4px_0px_0px_#fff400] -translate-x-0.5 -translate-y-0.5' : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]'
      }`}
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
      {/* Top badges: Class & Level */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className={`px-2 py-0.5 rounded-full font-mono font-bold border text-[11px] ${style.badge}`}>
          {style.icon} {member.class.toUpperCase()}
        </span>
        <span className="text-zinc-500 font-mono text-[11px] bg-zinc-900 border border-white/10 px-2 py-0.5 rounded">
          LVL.{member.level ?? 42}
        </span>
      </div>

      {/* Avatar & Info */}
      <div className="flex flex-col items-center text-center my-2">
        <div
          className={`w-16 h-16 rounded-2xl bg-zinc-900 border ${style.border.split(' ')[0]} flex items-center justify-center mb-3 transition-transform duration-300 ${
            isHovered ? 'scale-110 shadow-lg' : ''
          }`}
        >
          <span className="text-3xl">{member.avatar ?? '🎮'}</span>
        </div>

        {/* Position Title */}
        <h3 className="text-[11px] font-bold text-zinc-400 mb-1 tracking-wider uppercase font-mono">
          {member.position}
        </h3>

        {/* Member Name */}
        <div
          className={`text-base font-bold transition-colors duration-300 ${
            isHovered ? 'text-yellow-300' : isTBA ? 'text-zinc-500' : 'text-white'
          }`}
        >
          {isTBA ? '[ TBA ]' : member.name}
        </div>

        {/* Specialization */}
        {member.specialization && (
          <span className="text-[11px] text-zinc-500 font-mono mt-1">
            ⚡ {member.specialization}
          </span>
        )}
      </div>

      {/* Footer Info / XP Bar */}
      <div className="mt-4 pt-3 border-t border-white/[0.06]">
        <div className="flex justify-between items-center text-[11px] mb-1.5 font-mono">
          <span className="text-zinc-500">TELEMETRY</span>
          <span className="text-yellow-400 group-hover:translate-x-1 transition-transform font-bold">
            Inspect 🔍
          </span>
        </div>
        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${style.bar} transition-all duration-500 rounded-full`}
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

  useEffect(() => {
    recordPageVisit('team');
  }, []);

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
    <div className="min-h-screen bg-[#060608] text-zinc-100 overflow-hidden relative">
      <PageBackground />
      <Navbar />

      <main className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-6">
          <Link href="/" className="hover:text-yellow-400 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-yellow-400">GUILD ROSTER &amp; ARCHIVES</span>
        </div>

        {/* Header Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-yellow-400 text-xs font-mono mb-3">
            <span>// LEADERSHIP CHRONICLE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            BOARD OF <span className="text-yellow-400">OFFICERS</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            Explore the active council and journey through all {seasons.length} seasons of TAG Club leadership at VIT Vellore.
          </p>
        </div>

        {/* 2-Column Split: Scrollable Season Sidebar + Roster Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: SCROLLABLE SEASONS SIDEBAR */}
          <aside className="lg:col-span-4 xl:col-span-4 bg-zinc-950/70 border border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md lg:sticky lg:top-28">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-lg">📜</span>
                <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  SEASONS CHRONICLE
                </span>
              </div>
              <span className="text-[11px] font-mono bg-yellow-400/15 text-yellow-400 border border-yellow-400/30 px-2 py-0.5 rounded-full font-bold">
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
                className="w-full bg-zinc-900/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
              />
              {seasonSearch && (
                <button
                  onClick={() => setSeasonSearch('')}
                  className="absolute right-2.5 top-2 text-xs text-zinc-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Filter Tabs for Seasons */}
            <div className="flex gap-1.5 mb-3 text-xs sm:text-[11px] font-mono">
              {(['all', 'current', 'legacy'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    playBlip();
                    setSeasonFilter(filter);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-bold uppercase transition-all min-h-[36px] flex items-center justify-center ${
                    seasonFilter === filter
                      ? 'bg-yellow-400 text-black shadow'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Scrollable Season List */}
            <div className="space-y-2 max-h-[300px] lg:max-h-[520px] overflow-y-auto pr-1">
              {filteredSeasons.length === 0 ? (
                <div className="text-center py-8 text-xs text-zinc-500 font-mono">
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
                      className={`relative p-3 rounded-xl border transition-all duration-200 cursor-pointer group ${
                        isSelected
                          ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_rgba(255,244,0,0.15)] ring-1 ring-yellow-400/40'
                          : 'border-white/[0.06] bg-zinc-900/40 hover:border-white/20 hover:bg-zinc-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-bold font-mono ${
                              isSelected ? 'text-yellow-400' : 'text-white group-hover:text-yellow-300'
                            }`}
                          >
                            {s.label}
                          </span>
                          {s.isCurrent ? (
                            <span className="flex items-center gap-1 text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded-full font-bold font-mono">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                              ACTIVE
                            </span>
                          ) : (
                            <span className="text-[10px] text-zinc-500 font-mono">
                              ARCHIVED
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-zinc-400 font-mono">{s.year}</span>
                      </div>

                      <div className="text-xs text-zinc-400 truncate">
                        &quot;{s.eraName}&quot;
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-2 pt-1.5 border-t border-white/[0.06]">
                        <span>{s.members.length} Council Seats</span>
                        <span className="text-yellow-400/90 group-hover:translate-x-1 transition-transform">
                          {isSelected ? 'Viewing ◀' : 'View →'}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="text-[11px] text-zinc-500 font-mono text-center mt-3 pt-2 border-t border-white/[0.06]">
              Scroll to browse all {seasons.length} seasons
            </div>
          </aside>

          {/* RIGHT COLUMN: ACTIVE ROSTER DISPLAY */}
          <section className="lg:col-span-8 xl:col-span-8 space-y-6">
            {/* Active Season Highlight Banner */}
            <div className="relative overflow-hidden bg-zinc-950/70 border border-white/[0.08] rounded-2xl p-6 shadow-2xl backdrop-blur-md">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl sm:text-3xl font-black text-white">
                        {activeSeason.label}
                      </h2>
                      {activeSeason.isCurrent && (
                        <span className="flex items-center gap-1.5 text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold font-mono">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                          ACTIVE COUNCIL
                        </span>
                      )}
                    </div>
                    <div className="text-yellow-400 text-sm font-semibold">
                      &quot;{activeSeason.eraName}&quot; • Academic Year {activeSeason.year}
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-yellow-400 font-mono">
                        {activeSeason.label}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        {activeSeason.members.length} OFFICERS
                      </div>
                    </div>
                  </div>
                </div>

                {activeSeason.majorAchievement && (
                  <div className="bg-zinc-900/60 border border-white/[0.06] rounded-xl p-3 text-xs text-zinc-300 mb-4 flex items-start gap-2.5">
                    <span className="text-base">🏆</span>
                    <div>
                      <span className="text-yellow-400 font-bold">Season Hallmark:</span>{' '}
                      {activeSeason.majorAchievement}
                    </div>
                  </div>
                )}

                {/* Class composition breakdown */}
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 rounded-full">
                    👑 {classCounts.management} Management &amp; Ops
                  </span>
                  <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full">
                    ⚡ {classCounts.tech} Tech &amp; Design Forge
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full">
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border min-h-[38px] flex items-center ${
                      memberClassFilter === tab.key
                        ? 'border-yellow-400 bg-yellow-400/15 text-yellow-300 shadow-md'
                        : 'border-white/[0.08] bg-zinc-900/40 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="mr-1">{tab.icon}</span> {tab.label}
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
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors min-h-[40px]"
                />
                {memberSearch && (
                  <button
                    onClick={() => setMemberSearch('')}
                    className="absolute right-2.5 top-2 text-xs text-zinc-500 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Council Officers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredMembers.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-zinc-950/60 border border-white/10 rounded-2xl">
                  <div className="text-4xl mb-3">🔍</div>
                  <h4 className="text-base font-bold text-zinc-300 mb-1">
                    NO OFFICERS FOUND
                  </h4>
                  <p className="text-xs text-zinc-500 font-mono">
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

        {/* Join Council CTA */}
        <section className="mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-2xl sm:text-3xl font-black mb-2 text-white">
                Aspire to <span className="text-yellow-400">Join the Council?</span>
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mb-6 max-w-xl mx-auto leading-relaxed">
                Every leader begins in the ranks. Join the club Discord server, build projects, participate in tournaments, and climb the ladder to become an officer.
              </p>
              <a
                href="https://discord.com/invite/Y9cpqdvZE4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 text-black font-extrabold text-xs sm:text-sm rounded-xl hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(255,244,0,0.25)] min-h-[44px]"
              >
                <span>🎮</span>
                JOIN THE GUILD DISCORD
              </a>
            </div>
          </div>
        </section>
      </main>

      <MemberInspectModal
        member={inspectedMember}
        seasonLabel={activeSeason.label}
        seasonYear={activeSeason.year}
        onClose={() => setInspectedMember(null)}
      />

      <Footer />
    </div>
  );
}
