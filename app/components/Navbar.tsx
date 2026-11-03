'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faDiscord, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useToast } from './Toast';
import { playBlip, playSelect, isSoundEnabled, setSoundEnabled } from './SoundEffects';

library.add(faCoffee, faGithub, faLinkedin, faDiscord, faInstagram);

interface NavbarProps {
  logoUrl?: string;
  logoAlt?: string;
  onOpenTerminal?: () => void;
}

export default function Navbar({
  logoUrl = '/TAG_Vector.svg',
  logoAlt = 'TAG Club Logo',
  onOpenTerminal
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [frame, setFrame] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [sfxOn, setSfxOn] = useState(true);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { showToast } = useToast();

  useEffect(() => {
    setSfxOn(isSoundEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Character animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 4);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleLogoClick = () => {
    playBlip();
    const next = clickCount + 1;
    setClickCount(next);

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2500);

    if (next === 5) {
      showToast('⚡ SPEEDRUN COMBO x5! Guild Agility +10', { type: 'xp', icon: '⚡' });
    } else if (next === 10) {
      showToast('🏆 GUILD MASTER BADGE UNLOCKED! Secret Member XP +5000', { type: 'success', icon: '👑' });
      setClickCount(0);
    }
  };

  const toggleSound = () => {
    const next = !sfxOn;
    setSfxOn(next);
    setSoundEnabled(next);
    if (next) playBlip();
    showToast(next ? '🔊 Retro SFX: ENABLED' : '🔇 Retro SFX: MUTED', {
      type: 'info',
      icon: next ? '🔊' : '🔇',
    });
  };

  const characterFrames = ['◐', '◓', '◑', '◒'];
  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Events', href: '/events' },
    { name: 'Clips', href: '/clips' },
    { name: 'Team', href: '/team' },
  ];

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b-2 border-yellow-400/30 py-3'
          : 'bg-black/90 backdrop-blur-sm py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <div onClick={handleLogoClick} className="cursor-pointer">
                <Link href="/" className="flex items-center gap-3 group">
                  {/* Logo Image with Game HUD Effect */}
                  <div className="relative transition-all duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 bg-yellow-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={logoUrl}
                      alt={logoAlt}
                      width={100}
                      height={100}
                      className="object-contain relative z-10"
                      priority
                    />
                  </div>
                  {/* Player Tag */}
                  <div className="hidden md:block">
                    <span className="text-xs text-gray-500 font-mono group-hover:text-yellow-400 transition-colors">
                      [GUILD_MASTER]
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation Links - Game Menu */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => playSelect()}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-bold text-sm tracking-wide relative group"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}

              {/* Sound FX Audio Toggle */}
              <button
                onClick={toggleSound}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                  sfxOn
                    ? 'border-yellow-400/40 text-yellow-400 bg-yellow-400/10 hover:border-yellow-400'
                    : 'border-gray-800 text-gray-500 bg-gray-900/50 hover:text-gray-300'
                }`}
                title={sfxOn ? 'Mute Retro SFX' : 'Enable Retro SFX'}
              >
                <span>{sfxOn ? '🔊' : '🔇'}</span>
                <span className="hidden xl:inline">{sfxOn ? 'SFX: ON' : 'SFX: OFF'}</span>
              </button>

              {/* Active Player Indicator */}
              <div
                onClick={() => {
                  playBlip();
                  if (onOpenTerminal) onOpenTerminal();
                  else showToast('⚔️ Player Status: Guild Champion • Online', { type: 'info', icon: '🛡️' });
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/80 border border-gray-800 rounded-lg cursor-pointer hover:border-yellow-400/60 transition-colors"
                title="Click for Guild Status / Secret Terminal"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400 font-mono">LVL.42</span>
                <span className="text-xs text-yellow-400 font-mono">{characterFrames[frame]}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Desktop CTA Button */}
              <a href="https://discord.com/invite/Y9cpqdvZE4" target="_blank" rel="noopener noreferrer">
                <button
                  onClick={() => playSelect()}
                  className="hidden sm:flex items-center gap-2 px-5 py-2 bg-yellow-400 text-black font-bold text-xs md:text-sm rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-400/25"
                >
                  <span>🎮</span>
                  JOIN DISCORD
                </button>
              </a>

              {/* Mobile SFX Toggle */}
              <button
                onClick={toggleSound}
                className="lg:hidden p-2 rounded-lg bg-gray-900 border border-gray-800 text-xs"
                title="Toggle SFX"
              >
                {sfxOn ? '🔊' : '🔇'}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
                onClick={() => {
                  playBlip();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label="Toggle navigation menu"
              >
                <svg
                  className="w-6 h-6 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b-2 border-yellow-400/30 animate-in slide-in-from-top duration-300">
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-gray-300 hover:text-yellow-400 transition-colors text-lg font-bold border-b border-gray-800 last:border-b-0"
                  onClick={() => {
                    playSelect();
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
              {/* DISCORD BUTTON */}
              <div className="pt-4">
                <a href="https://discord.com/invite/Y9cpqdvZE4" target="_blank" rel="noopener noreferrer">
                  <button
                    onClick={() => playSelect()}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors"
                  >
                    <span>🎮</span>
                    JOIN DISCORD
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
}
