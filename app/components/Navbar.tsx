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
import { getAssetPath } from '../utils/asset';
import { openCommandPalette } from './CommandPalette';

library.add(faCoffee, faGithub, faLinkedin, faDiscord, faInstagram);

interface NavbarProps {
  logoUrl?: string;
  logoAlt?: string;
  onOpenTerminal?: () => void;
}

export default function Navbar({
  logoUrl,
  logoAlt = 'TAG Club Logo',
  onOpenTerminal
}: NavbarProps) {
  const resolvedLogo = getAssetPath(logoUrl || '/TAG_Vector.svg');
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
          ? 'bg-black/95 backdrop-blur-md border-b-2 border-yellow-400/30 py-2 sm:py-3'
          : 'bg-black/90 backdrop-blur-sm py-3 sm:py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <div onClick={handleLogoClick} className="cursor-pointer">
                <Link href="/" className="flex items-center gap-3 group">
                  {/* Logo Image with Responsive Sizing & Game HUD Effect */}
                  <div className="relative transition-all duration-300 group-hover:scale-105 w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-yellow-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={resolvedLogo}
                      alt={logoAlt}
                      width={80}
                      height={80}
                      className="object-contain relative z-10 max-h-full max-w-full"
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

              {/* Command Palette Button */}
              <button
                onClick={() => openCommandPalette()}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border border-gray-800 text-gray-400 bg-gray-900/60 hover:border-yellow-400/60 hover:text-yellow-400 transition-all"
                title="Open Command Palette (Ctrl+K / Cmd+K)"
              >
                <span>🔍</span>
                <span className="text-[11px] text-gray-500 font-bold">⌘K</span>
              </button>

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

            <div className="flex items-center gap-2 sm:gap-3">
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

              {/* Mobile Search / Palette Toggle */}
              <button
                onClick={() => openCommandPalette()}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 text-sm hover:border-yellow-400/60 transition-colors text-gray-300"
                title="Search / Command Palette"
                aria-label="Open Command Palette"
              >
                🔍
              </button>

              {/* Mobile SFX Toggle with 44px hit target */}
              <button
                onClick={toggleSound}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 text-sm hover:border-yellow-400/60 transition-colors"
                title="Toggle SFX"
                aria-label="Toggle sound effects"
              >
                {sfxOn ? '🔊' : '🔇'}
              </button>

              {/* Mobile Menu Toggle with 44px hit target */}
              <button
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b-2 border-yellow-400/30 animate-in slide-in-from-top duration-300 shadow-2xl">
            <div className="px-5 py-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-3 px-2 text-gray-300 hover:text-yellow-400 transition-colors text-base font-bold border-b border-gray-800 last:border-b-0 min-h-[44px] flex items-center"
                  onClick={() => {
                    playSelect();
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
              {/* Mobile Command Palette Launcher */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCommandPalette();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-gray-800 bg-gray-900/80 text-gray-300 hover:text-yellow-400 text-sm font-bold min-h-[44px]"
              >
                <span className="flex items-center gap-2">
                  <span>🔍</span> Command Palette &amp; Cheats
                </span>
                <kbd className="text-[10px] bg-black px-2 py-0.5 rounded text-gray-500 border border-gray-800">
                  Ctrl+K
                </kbd>
              </button>

              {/* DISCORD BUTTON */}
              <div className="pt-3">
                <a href="https://discord.com/invite/Y9cpqdvZE4" target="_blank" rel="noopener noreferrer">
                  <button
                    onClick={() => playSelect()}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-yellow-400 text-black font-bold text-sm rounded-xl hover:bg-yellow-300 transition-colors min-h-[44px]"
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

      {/* Spacer to match responsive navbar height */}
      <div className="h-20 sm:h-24" />
    </>
  );
}
