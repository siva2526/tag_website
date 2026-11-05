'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, type IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faDiscord, faInstagram } from '@fortawesome/free-brands-svg-icons';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageBackground from './components/PageBackground';
import SecretTerminal from './components/SecretTerminal';
import ProTipTicker from './components/ProTipTicker';
import { playBlip, playSelect, playPowerUp } from './components/SoundEffects';
import { recordPageVisit, recordInteraction } from './components/EasterEggs';
import { events as allEvents } from './data/events';
import { getGoogleCalendarUrl } from './utils/calendar';

library.add(faCoffee, faGithub, faLinkedin, faDiscord, faInstagram);

// Only show featured events on home page
const featuredEvents = allEvents.filter(e => e.featured);

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  category: 'Technology' | 'Gaming';
  link: string;
  xpReward?: string;
  difficulty?: string;
}

function EventCard({ title, date, description, category, link, xpReward, difficulty }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isTech = category === 'Technology';

  const handleClick = () => {
    playSelect();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const dateParts = date.trim().split(/\s+/);
  const dateDay = dateParts[0] || 'TBA';
  const dateSub = dateParts.slice(1).join(' ');

  return (
    <div
      className={`relative bg-[#0c0c14] border-[3px] rounded-2xl p-6 transition-all duration-150 group cursor-pointer flex flex-col justify-between ${
        isHovered
          ? isTech
            ? 'border-cyan-400 shadow-[5px_5px_0px_0px_#00f0ff] -translate-x-1 -translate-y-1'
            : 'border-yellow-400 shadow-[5px_5px_0px_0px_#fff400] -translate-x-1 -translate-y-1'
          : 'border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.08)]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      <div>
        {/* Quest Top Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-xs font-mono font-black px-2.5 py-1 rounded-md border-2 border-black uppercase ${
                isTech
                  ? 'bg-cyan-400 text-black shadow-[2px_2px_0px_0px_#ffffff]'
                  : 'bg-yellow-400 text-black shadow-[2px_2px_0px_0px_#ffffff]'
              }`}
            >
              {isTech ? '⚡ TECH' : '🎮 GAMING'}
            </span>
            {difficulty && (
              <span className="text-[10px] font-mono font-bold text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded">
                {difficulty}
              </span>
            )}
          </div>

          <div className="text-right font-mono">
            <div className={`text-xl font-black ${isTech ? 'text-cyan-400' : 'text-yellow-400'}`}>
              {dateDay}
            </div>
            {dateSub && <div className="text-zinc-500 text-[10px] uppercase font-bold">{dateSub}</div>}
          </div>
        </div>

        {/* Quest Title */}
        <h3 className="text-lg font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors">
          {title}
        </h3>

        <p className="text-zinc-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Quest Action Footer */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-zinc-500 font-semibold">{xpReward ?? '+2,500 XP'}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSelect();
              window.open(getGoogleCalendarUrl({ title, description, fullDate: date, link }), '_blank');
            }}
            className="text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-1 text-[11px]"
            title="Add to Google Calendar"
          >
            <span>📅</span>
            <span>Cal</span>
          </button>
        </div>
        <span className={`font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform ${isTech ? 'text-cyan-400' : 'text-yellow-400'}`}>
          VIEW QUEST ↗
        </span>
      </div>
    </div>
  );
}

interface StatItemProps {
  value: string;
  label: string;
  sublabel?: string;
}

function StatItem({ value, label, sublabel }: StatItemProps) {
  return (
    <div className="text-center group p-3 sm:p-4">
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-yellow-400 font-terminal mb-1">
        {value}
      </div>
      <div className="text-white text-xs font-black tracking-wider uppercase font-mono">{label}</div>
      {sublabel && <div className="text-zinc-500 text-[10px] font-mono mt-0.5">{sublabel}</div>}
    </div>
  );
}

interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
  accent: 'cyan' | 'yellow';
  tags: string[];
}

function PillarCard({ title, description, icon, accent, tags }: PillarCardProps) {
  const isCyan = accent === 'cyan';

  return (
    <div
      className={`relative bg-[#0c0c14] border-[3px] rounded-2xl p-7 transition-all duration-150 ${
        isCyan
          ? 'border-black shadow-[6px_6px_0px_0px_#00f0ff]'
          : 'border-black shadow-[6px_6px_0px_0px_#fff400]'
      }`}
    >
      <div className="flex items-center justify-between mb-5">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 border-black text-2xl font-black ${
            isCyan
              ? 'bg-cyan-400 text-black shadow-[3px_3px_0px_0px_#ffffff]'
              : 'bg-yellow-400 text-black shadow-[3px_3px_0px_0px_#ffffff]'
          }`}
        >
          {icon}
        </div>
        <span className="text-[11px] font-mono text-zinc-500 font-bold">
          {isCyan ? '[SECTOR_01]' : '[SECTOR_02]'}
        </span>
      </div>

      <h3 className="text-2xl font-black mb-3 text-white tracking-tight">
        {title}
      </h3>
      <p className="text-zinc-300 leading-relaxed text-sm mb-6">
        {description}
      </p>

      {/* Track Badges */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`text-[10px] font-mono font-black px-2.5 py-1 rounded border-2 border-black ${
              isCyan
                ? 'bg-cyan-400/20 text-cyan-300'
                : 'bg-yellow-400/20 text-yellow-300'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedClass, setSelectedClass] = useState<'tech' | 'gaming'>('tech');
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    recordPageVisit('home');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const activeTag = (document.activeElement as HTMLElement)?.tagName;
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          setTerminalOpen(prev => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const pillars = [
    {
      id: 1,
      title: 'Technology & Game Engineering',
      description: 'Production-grade software engineering, workshops, 48-hour game jams, and community game engines built by students across Godot, Unity, and modern web stacks.',
      icon: '⚡',
      accent: 'cyan' as const,
      tags: ['GAME_ENGINES', 'GODOT_UNITY', 'FULL_STACK', 'SYSTEMS'],
    },
    {
      id: 2,
      title: 'Competitive Gaming & Esports',
      description: 'Varsity collegiate scrims, campus tournaments, streaming broadcasts, and a supportive gaming collective competing across premier titles.',
      icon: '🎮',
      accent: 'yellow' as const,
      tags: ['VALORANT', 'CS2', 'BGMI', 'COMMUNITY_RAIDS'],
    }
  ];

  const stats = [
    { id: 1, value: '150+', label: 'Guild Members', sublabel: 'ENGINEERS & GAMERS' },
    { id: 2, value: '100+', label: 'Events Hosted', sublabel: 'HACKATHONS & CUPS' },
    { id: 3, value: '20+', label: 'Guild Partners', sublabel: 'INDUSTRY & CAMPUS' },
    { id: 4, value: '14', label: 'Years Legacy', sublabel: 'SINCE VIT INCEPTION' }
  ];

  return (
    <div className="min-h-screen bg-[#08080c] text-zinc-100 overflow-hidden relative">
      <PageBackground />

      <Navbar
        logoAlt="TAG Club VIT Vellore"
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Hero Section - Neo-Brutalist Retro Arcade */}
      <section className="relative pt-6 sm:pt-12 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Mission & Controls (7 cols) */}
            <div className="lg:col-span-7">
              {/* Telemetry Status Bar */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border-2 border-black shadow-[2px_2px_0px_0px_#fff400] mb-6 flex-wrap">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white text-xs font-mono font-black tracking-wide">
                  SERVER VIT-01
                </span>
                <span className="text-zinc-600 font-mono text-xs">•</span>
                <span className="text-yellow-400 text-xs font-mono font-bold">
                  STATUS: OPERATIONAL
                </span>
              </div>

              {/* Bold Neo-Brutalist Title */}
              <h1 className="font-arcade text-2xl sm:text-3xl md:text-4xl tracking-tight mb-6 leading-[1.4] text-white">
                BUILD <span className="text-yellow-400 underline decoration-4 decoration-black">THE TECH.</span>
                <br />
                MASTER <span className="text-cyan-400 underline decoration-4 decoration-black">THE GAME.</span>
              </h1>

              <p className="text-zinc-300 text-base sm:text-lg mb-8 max-w-xl leading-relaxed font-normal">
                VIT Vellore&apos;s premier collective for game developers, software engineers, and esports athletes. Build real-world projects, level up your stack, and compete at the highest level.
              </p>

              {/* Archetype Class Selector (Tactile Neo-Brutalist Switch) */}
              <div className="mb-8 p-4 rounded-2xl bg-[#0c0c14] border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-zinc-400">
                  <span>{"// SELECT ARCHETYPE:"}</span>
                  <span className="text-zinc-500 text-[11px] font-normal">10 PITY COUNTER</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      playSelect();
                      setSelectedClass('tech');
                      recordInteraction('pity');
                    }}
                    className={`relative p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all duration-150 min-h-[44px] ${
                      selectedClass === 'tech'
                        ? 'border-black bg-cyan-400 text-black shadow-[4px_4px_0px_0px_#ffffff] -translate-x-0.5 -translate-y-0.5'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">⚡</span>
                      <span className={`font-black text-sm ${selectedClass === 'tech' ? 'text-black' : 'text-white'}`}>
                        TECH MAGE
                      </span>
                    </div>
                    <p className={`text-[11px] font-mono font-bold ${selectedClass === 'tech' ? 'text-zinc-900' : 'text-zinc-400'}`}>
                      GODOT • ENGINES • WEB
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      playSelect();
                      setSelectedClass('gaming');
                      recordInteraction('pity');
                    }}
                    className={`relative p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all duration-150 min-h-[44px] ${
                      selectedClass === 'gaming'
                        ? 'border-black bg-yellow-400 text-black shadow-[4px_4px_0px_0px_#ffffff] -translate-x-0.5 -translate-y-0.5'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">🎮</span>
                      <span className={`font-black text-sm ${selectedClass === 'gaming' ? 'text-black' : 'text-white'}`}>
                        GAMING WARRIOR
                      </span>
                    </div>
                    <p className={`text-[11px] font-mono font-bold ${selectedClass === 'gaming' ? 'text-zinc-900' : 'text-zinc-400'}`}>
                      ESPORTS • CLUTCH • SCRIMS
                    </p>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://discord.com/invite/Y9cpqdvZE4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none"
                >
                  <button
                    onClick={() => playSelect()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-[5px_5px_0px_0px_#ffffff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                  >
                    <FontAwesomeIcon icon={['fab', 'discord']} className="text-base" />
                    <span>ENTER DISCORD GUILD</span>
                  </button>
                </a>

                <Link href="/events" className="flex-1 sm:flex-none">
                  <button
                    onClick={() => playBlip()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-sm rounded-xl border-2 border-zinc-700 hover:border-yellow-400 hover:text-yellow-400 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[4px_4px_0px_0px_#fff400] transition-all"
                  >
                    <span>QUEST BOARD</span>
                    <span className="text-zinc-500">→</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column: Clean Retro Arcade Cabinet Viewport (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className={`w-full max-w-[360px] sm:max-w-md bg-[#0c0c14] border-4 border-black rounded-3xl p-6 sm:p-7 transition-all duration-300 ${
                  selectedClass === 'tech'
                    ? 'shadow-[8px_8px_0px_0px_#00f0ff]'
                    : 'shadow-[8px_8px_0px_0px_#fff400]'
                }`}
              >
                {/* Arcade Top Banner */}
                <div className="flex items-center justify-between pb-3 mb-5 border-b-2 border-zinc-800 text-xs font-mono font-black">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-arcade text-[10px] text-white">1P READY</span>
                  </div>
                  <span className="font-arcade text-[10px] text-yellow-400">CREDIT 01</span>
                </div>

                {/* Character Avatar Showcase */}
                <div className="text-center py-6">
                  <div className="text-7xl mb-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
                    {selectedClass === 'tech' ? '⚡' : '🎮'}
                  </div>
                  <div className={`font-arcade text-lg sm:text-xl mb-2 tracking-tight ${selectedClass === 'tech' ? 'text-cyan-400' : 'text-yellow-400'}`}>
                    {selectedClass === 'tech' ? 'TECH MAGE' : 'GAMING WARRIOR'}
                  </div>
                  <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
                    {selectedClass === 'tech' ? 'CLASS: CODE SHAPER • LVL 42' : 'CLASS: ARENA ACE • LVL 38'}
                  </div>
                </div>

                {/* Character Stats Box */}
                <div className="bg-zinc-950/80 border-2 border-black rounded-xl p-4 space-y-2 text-xs font-mono mb-5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.06)]">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">FOCUS:</span>
                    <span className="text-white font-bold">
                      {selectedClass === 'tech' ? 'GAME ENGINES & WEB' : 'VALORANT & CS2 SCRIMS'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">ATTRIBUTES:</span>
                    <span className={selectedClass === 'tech' ? 'text-cyan-400 font-bold' : 'text-yellow-400 font-bold'}>
                      {selectedClass === 'tech' ? 'GODOT / UNITY / PYTHON' : 'AIM REFLEX / 1vX CLUTCH'}
                    </span>
                  </div>
                </div>

                {/* Interactive Blip Trigger */}
                <button
                  onClick={() => {
                    playPowerUp();
                    recordInteraction('pity');
                  }}
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-yellow-400 font-arcade text-[10px] rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#fff400] transition-all active:translate-x-0.5 active:translate-y-0.5"
                >
                  ► LEVEL UP XP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-[3px] border-black bg-[#0c0c14] rounded-2xl p-4 sm:p-6 shadow-[5px_5px_0px_0px_rgba(255,255,255,0.1)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
              {stats.map((stat) => (
                <StatItem key={stat.id} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guild Intel Ticker */}
      <ProTipTicker onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Pillars Section */}
      <section id="about" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border-2 border-black text-yellow-400 text-xs font-arcade mb-3 shadow-[2px_2px_0px_0px_#fff400]">
              <span>{"// GUILD PILLARS"}</span>
            </div>
            <h2 className="font-arcade text-lg sm:text-2xl tracking-tight text-white mb-4 leading-relaxed">
              CHOOSE YOUR <span className="text-yellow-400">SPECIALIZATION</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
              Whether you build graphics shaders or clutch tournament rounds, TAG provides the resources, network, and stage to excel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.id} {...pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - Quest Board */}
      <section id="events" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0f] border-t-2 border-zinc-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border-2 border-black text-yellow-400 text-xs font-arcade mb-2 shadow-[2px_2px_0px_0px_#fff400]">
                <span>{"// QUEST DIRECTORY"}</span>
              </div>
              <h2 className="font-arcade text-lg sm:text-2xl tracking-tight text-white leading-relaxed">
                ACTIVE <span className="text-yellow-400">QUESTS &amp; EVENTS</span>
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-arcade text-yellow-400 hover:text-yellow-300 transition-colors group"
            >
              <span>EXPLORE ALL {allEvents.length} QUESTS</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {featuredEvents.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  category={event.category}
                  link={event.link}
                  xpReward={event.xpReward}
                  difficulty={event.difficulty}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-900/50 border-2 border-black rounded-2xl max-w-lg mx-auto">
              <div className="text-4xl mb-3">🔮</div>
              <p className="text-zinc-400 text-sm mb-4">No quests currently featured on the main board.</p>
              <Link
                href="/events"
                className="px-4 py-2 bg-yellow-400 text-black font-extrabold text-xs rounded-lg hover:bg-yellow-300 transition-all font-mono inline-block border-2 border-black shadow-[2px_2px_0px_0px_#fff]"
              >
                Explore Full Quest Board →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Multiplayer Lobby Call-to-Action */}
      <section id="join" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative border-4 border-black bg-[#0c0c14] rounded-3xl p-8 sm:p-12 text-center shadow-[8px_8px_0px_0px_#fff400]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border-2 border-black text-xs font-mono font-bold text-zinc-300 mb-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MULTIPLAYER LOBBY • OPEN FOR RECRUITS</span>
            </div>

            <h2 className="font-arcade text-lg sm:text-2xl tracking-tight text-white mb-4 leading-relaxed">
              READY TO JOIN THE <span className="text-yellow-400">GUILD?</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Connect with 150+ student developers and competitive players, build production projects, and represent VIT in tournaments.
            </p>

            {/* Social Link Nodes */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
              {[
                { icon: ['fab', 'discord'] as IconProp, label: 'Discord', href: 'https://discord.com/invite/Y9cpqdvZE4', primary: true },
                { icon: ['fab', 'instagram'] as IconProp, label: 'Instagram', href: 'https://www.instagram.com/tagclub.vit' },
                { icon: ['fab', 'linkedin'] as IconProp, label: 'LinkedIn', href: 'https://in.linkedin.com/company/tag-club-vit' },
                { icon: ['fab', 'github'] as IconProp, label: 'GitHub', href: 'https://github.com/tag-club' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all border-2 border-black min-h-[44px] ${
                    social.primary
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-[3px_3px_0px_0px_#ffffff]'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)]'
                  }`}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-base" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-950 border-2 border-black text-xs font-mono text-zinc-400 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.06)]">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span>OFFICIAL CONTACT: <a href="mailto:tag@vit.ac.in" className="text-zinc-200 hover:text-yellow-400 transition-colors">tag@vit.ac.in</a></span>
            </div>
          </div>
        </div>
      </section>

      <SecretTerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      <Footer />
    </div>
  );
}
