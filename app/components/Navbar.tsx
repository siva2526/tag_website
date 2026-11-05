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
import { recordInteraction } from './EasterEggs';
import { isCrtEnabled, setCrtEnabled } from './PageBackground';

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
  const [sfxOn, setSfxOn] = useState(() => (typeof window !== 'undefined' ? isSoundEnabled() : true));
  const [crtOn, setCrtOn] = useState(() => (typeof window !== 'undefined' ? isCrtEnabled() : true));
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Character HUD animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 4);
    }, 250);
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
      recordInteraction('logo');
      showToast('⚡ SANDEVISTAN SPEEDRUN ENGAGED! Time-Dilation Active', { type: 'xp', icon: '⚡' });
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
    showToast(next ? '🔊 Tactical SFX: ONLINE' : '🔇 Tactical SFX: MUTED', {
      type: 'info',
      icon: next ? '🔊' : '🔇',
    });
  };

  const toggleCrt = () => {
    const next = !crtOn;
    setCrtOn(next);
    setCrtEnabled(next);
    playBlip();
    showToast(next ? '📺 Retro CRT Scanlines: ENGAGED' : '🖥️ Modern Display: CLEAN', {
      type: 'info',
      icon: next ? '📺' : '🖥️',
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#08080c]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2 sm:py-2.5'
            : 'bg-[#08080c]/60 backdrop-blur-md border-b border-white/[0.04] py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <div onClick={handleLogoClick} className="cursor-pointer">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="relative transition-all duration-300 group-hover:scale-105 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                    <div className="absolute inset-0 bg-yellow-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    <Image
                      src={resolvedLogo}
                      alt={logoAlt}
                      width={56}
                      height={56}
                      className="object-contain relative z-10 max-h-full max-w-full drop-shadow-[0_0_12px_rgba(255,244,0,0.3)]"
                      priority
                    />
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-arcade text-xs text-white tracking-wider">TAG</span>
                      <span className="text-[9px] font-arcade font-bold px-1.5 py-0.5 rounded bg-yellow-400 text-black border border-black shadow-[1px_1px_0px_0px_#ffffff]">
                        GUILD
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 tracking-wider font-mono">
                      TECH // GAMING
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-1 bg-zinc-900/40 p-1 rounded-full border border-white/[0.06]">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => playSelect()}
                    className="text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-all px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Command Palette Button */}
              <button
                onClick={() => openCommandPalette()}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border border-white/[0.08] text-zinc-400 bg-zinc-900/60 hover:border-yellow-400/50 hover:text-yellow-400 transition-all hover:shadow-[0_0_15px_rgba(255,244,0,0.1)]"
                title="Open Command Palette (Ctrl+K / Cmd+K)"
              >
                <span className="text-zinc-500">⌘</span>
                <span className="font-sans text-xs">Search</span>
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/60">
                  Ctrl+K
                </kbd>
              </button>

              {/* Sound FX Audio Toggle */}
              <button
                onClick={toggleSound}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                  sfxOn
                    ? 'border-yellow-400/40 text-yellow-400 bg-yellow-400/10 hover:border-yellow-400 shadow-[0_0_10px_rgba(255,244,0,0.15)]'
                    : 'border-white/[0.08] text-zinc-500 bg-zinc-900/40 hover:text-zinc-300'
                }`}
                title={sfxOn ? 'Mute Audio SFX' : 'Enable Audio SFX'}
              >
                <span>{sfxOn ? '🔊' : '🔇'}</span>
                <span className="text-[11px] font-bold">{sfxOn ? 'SFX' : 'MUTED'}</span>
              </button>

              {/* CRT Scanline Toggle */}
              <button
                onClick={toggleCrt}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                  crtOn
                    ? 'border-cyan-400/40 text-cyan-400 bg-cyan-400/10 hover:border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                    : 'border-white/[0.08] text-zinc-500 bg-zinc-900/40 hover:text-zinc-300'
                }`}
                title={crtOn ? 'Disable CRT Scanline Layer' : 'Enable CRT Scanline Layer'}
              >
                <span>📺</span>
                <span className="text-[11px] font-bold">{crtOn ? 'CRT' : 'FLAT'}</span>
              </button>

              {/* Active Player HUD Indicator */}
              <div
                onClick={() => {
                  playBlip();
                  if (onOpenTerminal) onOpenTerminal();
                  else showToast('⚡ Telemetry: Server Node VIT-01 • All Systems Nominal', { type: 'info', icon: '📡' });
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/60 border border-white/[0.08] rounded-lg cursor-pointer hover:border-cyan-400/50 transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] group"
                title="Click for Guild Telemetry / Secret Terminal"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-xs text-zinc-300 font-terminal group-hover:text-cyan-400 transition-colors tracking-widest">LVL.42</span>
                <span className="text-xs text-yellow-400 font-mono">{characterFrames[frame]}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop CTA Button */}
              <a href="https://discord.com/invite/Y9cpqdvZE4" target="_blank" rel="noopener noreferrer">
                <button
                  onClick={() => playSelect()}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-extrabold text-xs tracking-wider border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_#ffffff] hover:shadow-[4px_4px_0px_0px_#ffffff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <FontAwesomeIcon icon={['fab', 'discord']} className="text-sm" />
                  <span>JOIN DISCORD</span>
                </button>
              </a>

              {/* Mobile Search / Palette Toggle */}
              <button
                onClick={() => openCommandPalette()}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg bg-zinc-900/80 border border-white/[0.08] text-sm hover:border-yellow-400/50 transition-colors text-zinc-300"
                title="Search / Command Palette"
                aria-label="Open Command Palette"
              >
                🔍
              </button>

              {/* Mobile SFX Toggle */}
              <button
                onClick={toggleSound}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg bg-zinc-900/80 border border-white/[0.08] text-sm hover:border-yellow-400/50 transition-colors"
                title="Toggle SFX"
                aria-label="Toggle sound effects"
              >
                {sfxOn ? '🔊' : '🔇'}
              </button>

              {/* Mobile CRT Toggle */}
              <button
                onClick={toggleCrt}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg bg-zinc-900/80 border border-white/[0.08] text-sm hover:border-cyan-400/50 transition-colors"
                title="Toggle CRT Mode"
                aria-label="Toggle CRT scanlines"
              >
                📺
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-zinc-800 transition-colors border border-white/[0.08]"
                onClick={() => {
                  playBlip();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label="Toggle navigation menu"
              >
                <svg
                  className="w-5 h-5 text-zinc-300"
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

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#08080c]/95 backdrop-blur-2xl border-b border-white/[0.08] animate-in slide-in-from-top duration-300 shadow-2xl">
            <div className="px-5 py-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-3 px-3 text-zinc-200 hover:text-yellow-400 hover:bg-white/[0.04] rounded-lg transition-colors text-sm font-semibold border-b border-white/[0.04] last:border-b-0 min-h-[44px] flex items-center"
                  onClick={() => {
                    playSelect();
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCommandPalette();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-white/[0.08] bg-zinc-900/80 text-zinc-300 hover:text-yellow-400 text-sm font-medium min-h-[44px]"
              >
                <span className="flex items-center gap-2">
                  <span>🔍</span> Command Palette
                </span>
                <kbd className="text-[10px] bg-black px-2 py-0.5 rounded text-zinc-400 border border-white/10 font-mono">
                  Ctrl+K
                </kbd>
              </button>

              <div className="pt-2">
                <a href="https://discord.com/invite/Y9cpqdvZE4" target="_blank" rel="noopener noreferrer">
                  <button
                    onClick={() => playSelect()}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold text-sm rounded-lg hover:bg-yellow-300 transition-colors min-h-[44px] shadow-[0_0_15px_rgba(255,244,0,0.25)]"
                  >
                    <FontAwesomeIcon icon={['fab', 'discord']} />
                    JOIN DISCORD
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to match responsive navbar height */}
      <div className="h-16 sm:h-20" />
    </>
  );
}
