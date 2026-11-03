'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from "./page.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faDiscord, faInstagram } from '@fortawesome/free-brands-svg-icons';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageBackground from './components/PageBackground';
import SecretTerminal from './components/SecretTerminal';
import ProTipTicker from './components/ProTipTicker';
import { playBlip, playSelect } from './components/SoundEffects';
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
  const router = useRouter();
  const isTech = category === 'Technology';

  const handleClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="relative bg-black/80 border-2 border-gray-800 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px rgba(255, 244, 0, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {/* Animated Border */}
      <div className={`absolute inset-0 rounded-xl border-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} ${isTech ? 'border-yellow-400' : 'border-green-500'}`}></div>

      {/* Quest Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${isTech ? 'bg-yellow-400/20 border border-yellow-400/30' : 'bg-green-500/20 border border-green-500/30'} flex items-center justify-center`}>
            <span className={`text-xl ${isTech ? 'text-yellow-400' : 'text-green-500'}`}>{isTech ? '⚡' : '🎮'}</span>
          </div>
          <div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
              isTech
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                : 'bg-green-500/20 text-green-500 border border-green-500/30'
            }`}>
              {category}
            </span>
          </div>
        </div>
        <div className="text-right font-mono">
          <div className="text-2xl font-bold text-yellow-400">{date.split(' ')[0]}</div>
          <div className="text-gray-500 text-xs">{date.split(' ')[1]}</div>
        </div>
      </div>

      {/* Quest Details */}
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 text-sm mb-4 font-mono leading-relaxed">
        {description}
      </p>

      {/* Quest Stats */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 font-mono">DIFFICULTY</span>
          <span className={`font-bold ${isTech ? 'text-yellow-400' : 'text-green-500'}`}>
            {difficulty ?? (isTech ? 'ADVANCED' : 'PRO')}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 font-mono">REWARD</span>
          <span className="text-yellow-400 font-bold">{xpReward ?? (isTech ? '2,500 XP' : '3,000 XP')}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full transition-all duration-300 ${isTech ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-green-500 to-green-700'}`}
          style={{ width: isHovered ? '85%' : '60%' }}
        ></div>
      </div>

      {/* Click Indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs text-yellow-400">Click to view →</span>
      </div>
    </div>
  );
}

interface StatItemProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="text-center group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative inline-block">
        <div className={`absolute inset-0 bg-yellow-400/20 blur-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className="relative text-4xl md:text-5xl font-bold text-yellow-400 mb-2 transition-all duration-300 group-hover:scale-110 font-mono">
          {value}
        </div>
      </div>
      <div className="text-gray-400 text-xs font-bold tracking-wider uppercase">{label}</div>
    </div>
  );
}

interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
}

function PillarCard({ title, description, icon }: PillarCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/80 p-8 border-2 border-gray-800 transition-all duration-500 hover:border-yellow-400/50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none"></div>

      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 transition-transform duration-700"
        style={{
          transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
        }}
      />

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-6 shadow-lg shadow-yellow-400/30 group-hover:scale-110 transition-transform duration-300">
          <span className="text-3xl font-bold text-black">{icon}</span>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed font-mono text-sm">
          {description}
        </p>

        {/* XP Bar */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">MASTERY</span>
            <span className="text-yellow-400">{isHovered ? '75%' : '60%'}</span>
          </div>
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500"
              style={{ width: isHovered ? '75%' : '60%' }}
            ></div>
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
      // Toggle secret terminal with backtick ` or ~
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
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 4);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const characterFrames = ['◐', '◓', '◑', '◒'];

  const pillars = [
    {
      id: 1,
      title: 'Technology',
      description: 'Cutting-edge workshops, jams, and community projects in Game Development on various platforms.',
      icon: '⚡'
    },
    {
      id: 2,
      title: 'Gaming',
      description: 'Esports tournaments, communities, and industry connections in the gaming world.',
      icon: '🎮'
    }
  ];

  const stats = [
    { id: 1, value: '150+', label: 'Active Members' },
    { id: 2, value: '100+', label: 'Events Hosted' },
    { id: 3, value: '20+', label: 'Partnerships' },
    { id: 4, value: '14', label: 'Years Running' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white overflow-hidden font-mono">
      <PageBackground />

      <Navbar
        logoAlt="TAG Club VIT Vellore"
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Hero Section - Game Lobby */}
      <section className="relative pt-16 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Player Info */}
            <div className="order-2 lg:order-1">
              {/* Server Status */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/60 border-2 border-yellow-400/30 rounded-lg mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-400 text-sm font-bold tracking-wider">SERVER VIT-01 • ONLINE</span>
                <span className="text-gray-500 text-xs font-mono">[842/1000]</span>
              </div>

              {/* Game Title */}
              <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                <span className="text-white">TAG</span>
                <span className="text-yellow-400 ml-2 drop-shadow-[0_0_15px_rgba(255,244,0,0.3)]">CLUB</span>
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl text-gray-400">//</span>
                <p className="text-2xl md:text-3xl font-light text-gray-300">
                  Technology &amp; Gaming Club
                </p>
              </div>

              <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed font-mono">
                ⚔️ JOIN THE PREMIER TECH &amp; GAMING COLLECTIVE AT VIT VELLORE.
                LEVEL UP YOUR SKILLS, COMPETE IN TOURNAMENTS, AND BUILD THE FUTURE.
              </p>

              {/* Character Class Selection */}
              <div className="mb-8">
                <div className="text-xs text-gray-500 mb-3 font-mono"> &gt; SELECT YOUR CLASS</div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      playSelect();
                      setSelectedClass('tech');
                    }}
                    className={`relative flex-1 p-5 border-2 rounded-xl transition-all duration-300 group ${
                      selectedClass === 'tech'
                        ? 'border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20'
                        : 'border-gray-800 hover:border-yellow-400/50 bg-gray-900/50'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative text-center">
                      <div className="text-3xl mb-2">⚡</div>
                      <div className="font-bold text-base mb-1">TECH MAGE</div>
                      <div className="text-xs text-gray-500 font-mono">WEB • CLOUD • DEV</div>
                    </div>
                    {selectedClass === 'tech' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      playSelect();
                      setSelectedClass('gaming');
                    }}
                    className={`relative flex-1 p-5 border-2 rounded-xl transition-all duration-300 group ${
                      selectedClass === 'gaming'
                        ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20'
                        : 'border-gray-800 hover:border-green-500/50 bg-gray-900/50'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative text-center">
                      <div className="text-3xl mb-2">🎮</div>
                      <div className="font-bold text-base mb-1">GAMING WARRIOR</div>
                      <div className="text-xs text-gray-500 font-mono">ESPORTS • CONTENT • STRATEGY</div>
                    </div>
                    {selectedClass === 'gaming' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Character Display */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Animated Rings */}
                <div className="absolute inset-0 border-2 border-yellow-400/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-[5%] border border-yellow-400/30 rounded-full animate-spin" style={{ animationDuration: '12s' }}></div>
                <div className="absolute inset-[15%] border border-dashed border-yellow-400/20 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>

                {/* Character Card */}
                <div className="absolute inset-[10%] bg-gradient-to-br from-gray-900 to-black rounded-3xl border-2 border-yellow-400/30 flex items-center justify-center backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 bg-scanline opacity-10"></div>
                  <div className="text-center relative z-10">
                    <div className="text-7xl mb-4 animate-bounce">
                      {selectedClass === 'tech' ? '⚡' : '🎮'}
                    </div>
                    <div className="text-3xl text-yellow-400 font-mono mb-2">
                      {characterFrames[frame]}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">
                      {selectedClass === 'tech' ? 'TECH MAGE' : 'GAMING WARRIOR'}
                    </div>
                    <div className="text-xs text-gray-500 font-mono mt-1">
                      LVL.{selectedClass === 'tech' ? '42' : '38'}
                    </div>
                    <div className="mt-3 flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/60 border-2 border-gray-800 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <StatItem key={stat.id} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guild Intel / Pro Tip Ticker */}
      <ProTipTicker onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Pillars Section - Guild Classes */}
      <section id="about" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-yellow-400 text-2xl">⚔️</span>
              <span className="text-gray-500 font-mono text-sm">// GUILD_CLASSES</span>
              <span className="text-yellow-400 text-2xl">⚔️</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-yellow-400">Pillars</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-mono">
              Choose your path. Master your craft. Join the elite.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.id} {...pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - Quest Board */}
      <section id="events" className="py-20 px-8 bg-gradient-to-b from-black to-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              <span className="text-yellow-400 font-bold text-sm tracking-wider">ACTIVE QUESTS</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-yellow-400">Events</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm">{featuredEvents.length} QUESTS AVAILABLE</p>
          </div>

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

          <div className="text-center mt-12">
            <Link
              href="/events"
              className="inline-flex items-center gap-3 text-yellow-400 font-bold hover:text-yellow-300 transition-colors group"
            >
              <span>VIEW ALL QUESTS</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              <span className="text-xs text-gray-500 font-mono">({featuredEvents.length}+)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Join Section - Multiplayer Lobby */}
      <section id="join" className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400/30 p-12">
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none"></div>

            <div className="relative z-10 text-center">
              {/* Party Status */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/60 border border-yellow-400/30 rounded-lg mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-400 text-sm font-bold">MULTIPLAYER LOBBY • OPEN</span>
                <span className="text-gray-500 text-xs font-mono">196 ONLINE</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">READY TO</span>
                <span className="text-yellow-400 ml-3">JOIN THE GUILD?</span>
              </h2>

              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto font-mono">
                CONNECT WITH 150+ PLAYERS. COMPETE IN TOURNAMENTS. BUILD THE FUTURE OF TECH &amp; GAMING.
              </p>

              {/* Social Links - Party Members */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <a
                  href="https://www.instagram.com/tagclub.vit"
                  className="group relative p-4 bg-gray-900/80 border-2 border-gray-800 rounded-xl hover:border-yellow-400 transition-all duration-300 hover:scale-110"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <FontAwesomeIcon
                    icon={['fab', 'instagram']}
                    className="text-2xl text-gray-400 group-hover:text-yellow-400 transition-colors duration-300 relative z-10"
                  />
                </a>

                <a
                  href="https://discord.com/invite/Y9cpqdvZE4"
                  className="group relative p-4 bg-gray-900/80 border-2 border-gray-800 rounded-xl hover:border-yellow-400 transition-all duration-300 hover:scale-110"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <FontAwesomeIcon
                    icon={['fab', 'discord']}
                    className="text-2xl text-gray-400 group-hover:text-yellow-400 transition-colors duration-300 relative z-10"
                  />
                </a>

                <a
                  href="https://in.linkedin.com/company/tag-club-vit"
                  className="group relative p-4 bg-gray-900/80 border-2 border-gray-800 rounded-xl hover:border-yellow-400 transition-all duration-300 hover:scale-110"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <FontAwesomeIcon
                    icon={['fab', 'linkedin']}
                    className="text-2xl text-gray-400 group-hover:text-yellow-400 transition-colors duration-300 relative z-10"
                  />
                </a>

                <a
                  href="#"
                  className="group relative p-4 bg-gray-900/80 border-2 border-gray-800 rounded-xl hover:border-yellow-400 transition-all duration-300 hover:scale-110"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <FontAwesomeIcon
                    icon={['fab', 'github']}
                    className="text-2xl text-gray-400 group-hover:text-yellow-400 transition-colors duration-300 relative z-10"
                  />
                </a>
              </div>

              {/* Contact Info - Server Address */}
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-black/60 border-2 border-gray-800 rounded-full">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 font-mono text-sm">SERVER: tag@vit.ac.in</span>
                <span className="text-xs text-gray-600">[GUILD_MAIL]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SecretTerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      <Footer />

      {/* Custom Animations */}
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
