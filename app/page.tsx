'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, type IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faDiscord, faInstagram } from '@fortawesome/free-brands-svg-icons';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageBackground from './components/PageBackground';
import SecretTerminal from './components/SecretTerminal';
import ProTipTicker from './components/ProTipTicker';
import { playBlip, playSelect } from './components/SoundEffects';
import { recordPageVisit, recordInteraction } from './components/EasterEggs';
import { events as allEvents } from './data/events';

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
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const dateParts = date.trim().split(/\s+/);
  const dateDay = dateParts[0] || 'TBA';
  const dateSub = dateParts.slice(1).join(' ');

  return (
    <div
      className={`relative bg-zinc-950/70 border backdrop-blur-md rounded-2xl p-6 transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
        isHovered
          ? isTech
            ? 'border-cyan-400/60 shadow-[0_12px_36px_rgba(0,240,255,0.15)] -translate-y-1'
            : 'border-yellow-400/60 shadow-[0_12px_36px_rgba(255,244,0,0.15)] -translate-y-1'
          : 'border-white/[0.08] hover:border-white/20'
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
        {/* Quest Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isTech
                  ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400'
                  : 'bg-yellow-400/15 border border-yellow-400/30 text-yellow-400'
              }`}
            >
              <span className="text-lg">{isTech ? '⚡' : '🎮'}</span>
            </div>
            <div>
              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  isTech
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                    : 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30'
                }`}
              >
                {category.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="text-right font-mono">
            <div className={`text-xl font-bold ${isTech ? 'text-cyan-400' : 'text-yellow-400'}`}>
              {dateDay}
            </div>
            {dateSub && <div className="text-zinc-500 text-[11px] uppercase">{dateSub}</div>}
          </div>
        </div>

        {/* Quest Details */}
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors">
          {title}
        </h3>

        <p className="text-zinc-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Quest Stats & Meter */}
      <div className="pt-4 border-t border-white/[0.06] mt-2">
        <div className="flex justify-between items-center text-xs font-mono mb-2">
          <span className="text-zinc-500">TIER: <span className={isTech ? 'text-cyan-400 font-bold' : 'text-yellow-400 font-bold'}>{difficulty ?? (isTech ? 'ADVANCED' : 'COMPETITIVE')}</span></span>
          <span className="text-zinc-300 font-bold">{xpReward ?? (isTech ? '+2,500 XP' : '+3,000 XP')}</span>
        </div>

        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isTech
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-300'
                : 'bg-gradient-to-r from-yellow-500 to-yellow-300'
            }`}
            style={{ width: isHovered ? '90%' : '65%' }}
          />
        </div>

        <div className="flex items-center justify-between mt-3 text-[11px] font-mono text-zinc-500">
          <span>STATUS: OPEN</span>
          <span className="text-yellow-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
            VIEW RAID →
          </span>
        </div>
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
    <div className="text-center group p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.02]">
      <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white group-hover:text-yellow-400 transition-colors font-mono mb-1">
        {value}
      </div>
      <div className="text-zinc-300 text-xs font-bold tracking-wider uppercase">{label}</div>
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
  const [isHovered, setIsHovered] = useState(false);
  const isCyan = accent === 'cyan';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-zinc-950/70 p-8 border backdrop-blur-md transition-all duration-300 group ${
        isHovered
          ? isCyan
            ? 'border-cyan-400/50 shadow-[0_12px_40px_rgba(0,240,255,0.12)] -translate-y-1'
            : 'border-yellow-400/50 shadow-[0_12px_40px_rgba(255,244,0,0.12)] -translate-y-1'
          : 'border-white/[0.08]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg ${
              isCyan
                ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 text-black shadow-cyan-500/25'
                : 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-yellow-500/25'
            }`}
          >
            <span className="text-2xl font-bold">{icon}</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            {isCyan ? '[SYS_FORGE_01]' : '[SYS_ARENA_02]'}
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-300 transition-colors tracking-tight">
          {title}
        </h3>
        <p className="text-zinc-400 leading-relaxed text-sm mb-6">
          {description}
        </p>

        {/* Tactical Tag Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md border ${
                isCyan
                  ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                  : 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Mastery Meter */}
        <div className="pt-4 border-t border-white/[0.06]">
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-zinc-500">SECTOR READINESS</span>
            <span className={isCyan ? 'text-cyan-400 font-bold' : 'text-yellow-400 font-bold'}>
              {isHovered ? '95%' : '80%'}
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isCyan
                  ? 'bg-gradient-to-r from-cyan-500 to-cyan-300'
                  : 'bg-gradient-to-r from-yellow-500 to-yellow-300'
              }`}
              style={{ width: isHovered ? '95%' : '80%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [frame, setFrame] = useState(0);
  const [selectedClass, setSelectedClass] = useState<'tech' | 'gaming'>('tech');
  const [terminalOpen, setTerminalOpen] = useState(false);

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

  useEffect(() => {
    recordPageVisit('home');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 4);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const characterFrames = ['◐', '◓', '◑', '◒'];

  const pillars = [
    {
      id: 1,
      title: 'Technology & Game Engineering',
      description: 'Hands-on workshops, 48-hour game jams, software engineering labs, and production-grade community codebases across Godot, Unity, and modern web stacks.',
      icon: '⚡',
      accent: 'cyan' as const,
      tags: ['GAME_DEV', 'FULL_STACK', 'SYSTEMS', 'AI_ENG'],
    },
    {
      id: 2,
      title: 'Esports & Gaming Culture',
      description: 'Competitive collegiate tournaments, collegiate league scrims, live streaming, casting masterclasses, and an inclusive community for casual and hardcore gamers.',
      icon: '🎮',
      accent: 'yellow' as const,
      tags: ['VALORANT', 'CS2', 'BGMI', 'COMMUNITY_RAIDS'],
    }
  ];

  const stats = [
    { id: 1, value: '150+', label: 'Active Guild Members', sublabel: 'ENGINEERS & CONTENDERS' },
    { id: 2, value: '100+', label: 'Events Hosted', sublabel: 'HACKATHONS & TOURNAMENTS' },
    { id: 3, value: '20+', label: 'Guild Partners', sublabel: 'INDUSTRY & CAMPUS' },
    { id: 4, value: '14', label: 'Years Of Legacy', sublabel: 'SINCE VIT INCEPTION' }
  ];

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 overflow-hidden relative">
      <PageBackground />

      <Navbar
        logoAlt="TAG Club VIT Vellore"
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Hero Section - Neo-Tokyo Cyberdeck Lobby */}
      <section className="relative pt-6 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Column - Tactical Briefing (7 cols) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              {/* Telemetry Status Bar */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/[0.08] mb-6 flex-wrap shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-zinc-300 text-xs font-mono font-bold tracking-wide">
                  SERVER VIT-01
                </span>
                <span className="text-zinc-600 font-mono text-xs">•</span>
                <span className="text-yellow-400 text-xs font-mono font-semibold">
                  STATUS: OPERATIONAL
                </span>
                <span className="text-zinc-500 text-[11px] font-mono hidden sm:inline">
                  [18ms // IN-MAA]
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4 leading-[1.08] text-white">
                BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-500">THE TECH.</span>
                <br />
                MASTER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-400">THE GAME.</span>
              </h1>

              <p className="text-zinc-400 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
                VIT Vellore&apos;s premier collective bridging modern software engineering, game development, and competitive esports. Join our ranks to build next-generation projects and dominate the arena.
              </p>

              {/* Class Selection Cyberdeck Switcher */}
              <div className="mb-8 p-4 rounded-2xl bg-zinc-950/60 border border-white/[0.06] backdrop-blur-md">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-400">
                  <span className="tracking-wider uppercase">// INITIALIZE ARCHETYPE:</span>
                  <span className="text-zinc-500 text-[11px]">CLICK TO CONFIGURE</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      playSelect();
                      setSelectedClass('tech');
                      recordInteraction('pity');
                    }}
                    className={`relative p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 min-h-[44px] ${
                      selectedClass === 'tech'
                        ? 'border-cyan-400 bg-cyan-500/15 shadow-[4px_4px_0px_0px_#00f0ff] -translate-y-0.5'
                        : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-xl">⚡</span>
                      <span className="font-bold text-sm text-white">TECH MAGE</span>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400">GODOT • SYSTEMS • WEB</p>
                    {selectedClass === 'tech' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      playSelect();
                      setSelectedClass('gaming');
                      recordInteraction('pity');
                    }}
                    className={`relative p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 min-h-[44px] ${
                      selectedClass === 'gaming'
                        ? 'border-yellow-400 bg-yellow-400/15 shadow-[4px_4px_0px_0px_#fff400] -translate-y-0.5'
                        : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-xl">🎮</span>
                      <span className="font-bold text-sm text-white">GAMING WARRIOR</span>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400">ESPORTS • SCRIMS • SPEEDRUN</p>
                    {selectedClass === 'gaming' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://discord.com/invite/Y9cpqdvZE4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none"
                >
                  <button
                    onClick={() => playSelect()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-[5px_5px_0px_0px_#ffffff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
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

            {/* Right Column - Holographic Cyberdeck HUD (5 cols) */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-md aspect-square">
                {/* Rotating HUD Reticles */}
                <div
                  className="absolute inset-0 border border-white/[0.08] rounded-full animate-spin pointer-events-none"
                  style={{ animationDuration: '40s' }}
                />
                <div
                  className={`absolute inset-[8%] border border-dashed rounded-full pointer-events-none transition-colors duration-500 ${
                    selectedClass === 'tech' ? 'border-cyan-400/30' : 'border-yellow-400/30'
                  }`}
                  style={{ animationDuration: '25s' }}
                />

                {/* Central Cyberdeck Chassis */}
                <div className="absolute inset-[10%] rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                  {/* Subtle Corner Brackets */}
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-600">[+]</div>
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-zinc-600">[+]</div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-600">[+]</div>
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-600">[+]</div>

                  {/* Top HUD Readout */}
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/[0.06] pb-3">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${selectedClass === 'tech' ? 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]' : 'bg-yellow-400 shadow-[0_0_8px_#fff400]'}`} />
                      ARCHETYPE:
                    </span>
                    <span className={`font-bold ${selectedClass === 'tech' ? 'text-cyan-400' : 'text-yellow-400'}`}>
                      {selectedClass === 'tech' ? 'TECH MAGE' : 'WARRIOR'}
                    </span>
                  </div>

                  {/* Character Avatar Stage */}
                  <div className="text-center py-4 my-auto">
                    <div className="text-6xl sm:text-7xl mb-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      {selectedClass === 'tech' ? '⚡' : '🎮'}
                    </div>
                    <div className="text-2xl font-mono text-yellow-400 mb-1">
                      {characterFrames[frame]}
                    </div>
                    <div className="text-xs font-mono text-zinc-400 tracking-wider">
                      {selectedClass === 'tech' ? 'LEVEL 42 • CODE SHAPER' : 'LEVEL 38 • ARENA ACE'}
                    </div>
                  </div>

                  {/* Telemetry Stats in Chassis */}
                  <div className="space-y-2 border-t border-white/[0.06] pt-3 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>SYNC INDEX:</span>
                      <span className={selectedClass === 'tech' ? 'text-cyan-400 font-bold' : 'text-yellow-400 font-bold'}>
                        {selectedClass === 'tech' ? '98.4%' : '96.2%'}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>GUILD STATUS:</span>
                      <span className="text-emerald-400 font-semibold">DEPLOYED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 border-y border-white/[0.06] bg-zinc-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatItem key={stat.id} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Guild Intel Ticker */}
      <ProTipTicker onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Pillars Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-yellow-400 text-xs font-mono mb-3">
              <span>// GUILD CORE PILLARS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              CHOOSE YOUR <span className="text-yellow-400">SPECIALIZATION</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              Whether you write graphics pipelines or clutch 1v4 tournament rounds, TAG provides the resources, network, and stage to excel.
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
      <section id="events" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/50 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-yellow-400 text-xs font-mono mb-2">
                <span>// MISSION DIRECTORY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                ACTIVE <span className="text-yellow-400">QUESTS &amp; EVENTS</span>
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-yellow-400 hover:text-yellow-300 transition-colors group self-start sm:self-auto"
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
            <div className="text-center py-12 bg-zinc-950/60 border border-white/10 rounded-2xl max-w-lg mx-auto">
              <div className="text-4xl mb-3">🔮</div>
              <p className="text-zinc-400 text-sm mb-4">No quests currently featured on the main board.</p>
              <Link
                href="/events"
                className="px-4 py-2 bg-yellow-400 text-black font-bold text-xs rounded-lg hover:bg-yellow-300 transition-all font-mono inline-block"
              >
                Explore Full Quest Board →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Multiplayer Lobby Call-to-Action */}
      <section id="join" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-white/10 p-8 sm:p-12 text-center shadow-2xl">
            {/* Ambient Cones */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>MULTIPLAYER LOBBY • OPEN FOR RECRUITS</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
                READY TO JOIN THE <span className="text-yellow-400">GUILD?</span>
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Connect with 150+ passionate students, take part in hackathons, compete in varsity tournaments, and build your portfolio.
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
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                      social.primary
                        ? 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-[0_0_15px_rgba(255,244,0,0.25)]'
                        : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <FontAwesomeIcon icon={social.icon} className="text-base" />
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <span>OFFICIAL CONTACT: <a href="mailto:tag@vit.ac.in" className="text-zinc-200 hover:text-yellow-400 transition-colors">tag@vit.ac.in</a></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SecretTerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      <Footer />
    </div>
  );
}
