'use client';

import { useState, useEffect } from 'react';

const TIPS = [
  'Godot 4.3 handles 2D pixel lighting natively — great for rapid game jams.',
  'Press Ctrl+K (or ⌘K) anywhere to summon the Command Palette & game cheats.',
  'Try entering the classic Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A',
  'Click the [LVL.42] player badge in the navbar to open the Secret Guild Terminal.',
  'Rapid-click the guild crest in the navbar for a speedrunner surprise!',
  'Explore the Quest Board under /events to track active and upcoming raids.',
];

export default function ProTipTicker({ onOpenTerminal }: { onOpenTerminal?: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TIPS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
      <div className="bg-zinc-950/70 border border-white/[0.08] backdrop-blur-md rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg hover:border-yellow-400/30 transition-all">
        <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[11px] font-mono font-bold rounded-md shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
            GUILD INTEL
          </div>
          <div className="text-xs text-zinc-300 font-mono transition-opacity duration-300 line-clamp-2 sm:truncate sm:line-clamp-none">
            {TIPS[index]}
          </div>
        </div>
        {onOpenTerminal && (
          <button
            onClick={onOpenTerminal}
            className="text-xs text-zinc-400 hover:text-yellow-400 transition-colors font-mono shrink-0 border border-white/[0.08] hover:border-yellow-400/40 bg-zinc-900/60 hover:bg-zinc-900 px-3 py-1.5 min-h-[36px] flex items-center justify-center rounded-lg"
          >
            TERMINAL `~`
          </button>
        )}
      </div>
    </div>
  );
}
