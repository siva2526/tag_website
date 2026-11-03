'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white font-mono flex flex-col items-center justify-center px-8">
      {/* CRT Scanline */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 z-50"
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff400 1px, transparent 1px),
              linear-gradient(to bottom, #fff400 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'top',
            height: '200%',
            top: '-50%',
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Error Code Header */}
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg mb-8">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-400 text-sm font-bold tracking-wider">ERROR_404 • DUNGEON_VOID</span>
        </div>

        {/* Big 404 */}
        <div
          className="text-[9rem] md:text-[13rem] font-bold leading-none text-yellow-400 mb-4 select-none"
          style={{
            textShadow: '0 0 60px rgba(255,244,0,0.3), 4px 4px 0 rgba(255,244,0,0.1)',
            filter: 'drop-shadow(0 0 30px rgba(255,244,0,0.2))',
          }}
        >
          404
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          LEVEL NOT FOUND
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg mb-2 font-mono">
          This dungeon chamber does not exist in the guild archives.
        </p>
        <p className="text-gray-600 text-sm mb-10 font-mono">
          The coordinates you entered have been swallowed by the void.
        </p>

        {/* Pixel art character */}
        <div className="text-6xl mb-8 animate-bounce">💀</div>

        {/* Terminal style error */}
        <div className="bg-black/80 border border-gray-800 rounded-xl p-6 mb-10 text-left">
          <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>SYSTEM_DIAGNOSTIC</span>
          </div>
          <div className="space-y-1 text-sm font-mono">
            <p className="text-gray-500">
              <span className="text-yellow-400">$</span> navigate --route &quot;{pathname || '/unknown'}&quot;
            </p>
            <p className="text-red-400">  ERROR: 404 - Chamber not found in world map</p>
            <p className="text-gray-600">  Memory dump: 0xDEADBEEF [STATUS: RE-ROUTING REQUIRED]</p>
            <p className="text-gray-500">
              <span className="text-yellow-400">$</span> <span className="animate-pulse">▌</span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-400/25"
          >
            <span>🏰</span>
            RETURN TO LOBBY
          </Link>
          <Link
            href="/events"
            className="flex items-center gap-2 px-8 py-3 border-2 border-gray-700 text-gray-300 font-bold rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
          >
            <span>📋</span>
            VIEW QUEST BOARD
          </Link>
          <Link
            href="/clips"
            className="flex items-center gap-2 px-8 py-3 border-2 border-gray-700 text-gray-300 font-bold rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
          >
            <span>🎬</span>
            REPLAY THEATER
          </Link>
          <Link
            href="/team"
            className="flex items-center gap-2 px-8 py-3 border-2 border-gray-700 text-gray-300 font-bold rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
          >
            <span>👥</span>
            MEET ROSTER
          </Link>
        </div>

        {/* Footer hint */}
        <p className="text-gray-700 text-xs mt-10 font-mono">
          [ Hint: Try pressing the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A ]
        </p>
      </div>
    </div>
  );
}
