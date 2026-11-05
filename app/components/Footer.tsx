'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '../utils/asset';
import { recordInteraction } from './EasterEggs';
import { playBlip } from './SoundEffects';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-8 border-t-2 border-zinc-800 bg-[#09090e] relative z-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-zinc-800/80">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center bg-zinc-950 border-2 border-yellow-400 rounded-xl shadow-[3px_3px_0px_0px_#fff400]">
                <Image
                  src={getAssetPath('/TAG_Vector.svg')}
                  alt="TAG Logo"
                  width={36}
                  height={36}
                  className="object-contain relative z-10"
                  priority
                />
              </div>
              <div>
                <div className="font-arcade text-white text-xs tracking-wider flex items-center gap-2">
                  TAG CLUB <span className="text-[9px] font-arcade text-black font-extrabold px-1.5 py-0.5 rounded bg-yellow-400 border border-black shadow-[1px_1px_0px_0px_#fff]">VIT VELLORE</span>
                </div>
                <div className="text-xs text-zinc-400 font-mono mt-1">Technology &amp; Gaming Collective</div>
              </div>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed">
              VIT Vellore&apos;s premier hub for game developers, software engineers, tournament contenders, and tech enthusiasts building the future of interactive entertainment.
            </p>

            {/* Secret Interactive Arcade Markers */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => {
                  playBlip();
                  recordInteraction('bloodstain');
                }}
                className="px-2.5 py-1 text-[11px] font-mono text-red-400 hover:text-red-300 bg-red-950/40 border border-red-800/80 hover:border-red-500 rounded-md transition-all hover:scale-105"
                title="Inspect bloodstain..."
              >
                🩸 Bloodstain: &ldquo;Try jumping&rdquo;
              </button>

              <button
                onClick={() => {
                  playBlip();
                  recordInteraction('diamond');
                }}
                className="px-2.5 py-1 text-[11px] font-mono text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 border border-cyan-800/80 hover:border-cyan-400 rounded-md transition-all hover:scale-105"
                title="Mine secret diamond ore..."
              >
                💎 [Diamond Ore]
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <div className="text-[10px] font-arcade text-yellow-400 tracking-wider uppercase mb-3">
              {"// SECTORS"}
            </div>
            <div className="flex flex-col space-y-2">
              {[
                { name: 'Home Lobby', href: '/' },
                { name: 'Pillars & About', href: '/#about' },
                { name: 'Quest Board (Events)', href: '/events' },
                { name: 'Replay Cinema (Clips)', href: '/clips' },
                { name: 'The Chronicle (Team)', href: '/team' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-400 hover:text-yellow-400 transition-colors text-xs py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Telemetry / Node Info */}
          <div>
            <div className="text-[10px] font-arcade text-cyan-400 tracking-wider uppercase mb-3">
              {"// TELEMETRY"}
            </div>
            <div className="space-y-2 text-zinc-300 font-terminal text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-zinc-200">NODE VIT-01: ONLINE</span>
              </div>
              <div>
                DISCORD: <span className="text-zinc-200">150+ GUILD MEMBERS</span>
              </div>
              <div>
                UPTIME: <span className="text-yellow-400">99.9% (SEASON {currentYear})</span>
              </div>
              <div className="pt-2">
                <span className="text-xs font-terminal px-2 py-1 rounded bg-zinc-950 border border-zinc-700 text-zinc-400 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]">
                  BUILD v4.2.0 • PROD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400 font-mono">
          <div>
            © {currentYear} TAG CLUB VIT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-yellow-400 transition-colors cursor-default">
              BUILT FOR BUILDERS &amp; GAMERS
            </span>
            <span className="text-zinc-700">•</span>
            <a
              href="mailto:tag@vit.ac.in"
              className="hover:text-cyan-400 transition-colors"
            >
              tag@vit.ac.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
