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
      <div className="bg-[#0c0c14] border-2 border-black rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-400 text-black text-[9px] font-arcade font-bold rounded border border-black shadow-[1px_1px_0px_0px_#fff] shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
            GUILD INTEL
          </div>
          <div className="text-xs text-zinc-300 font-mono transition-opacity duration-300 line-clamp-2 sm:truncate sm:line-clamp-none">
            {TIPS[index]}
          </div>
        </div>
        {onOpenTerminal && (
          <button
            onClick={onOpenTerminal}
            className="text-[9px] text-yellow-400 font-arcade shrink-0 border-2 border-black bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 min-h-[36px] flex items-center justify-center rounded-lg shadow-[2px_2px_0px_0px_#fff400] transition-all active:translate-x-0.5 active:translate-y-0.5"
          >
            TERMINAL `~`
          </button>
        )}
      </div>
    </div>
  );
}
