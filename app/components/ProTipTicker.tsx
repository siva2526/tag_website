'use client';

import { useState, useEffect } from 'react';

const TIPS = [
  'Godot 4.3 handles 2D pixel lighting natively — great for rapid game jams.',
  'Try typing the classic Konami Code on any page: ↑ ↑ ↓ ↓ ← → ← → B A',
  'Rapid-click the guild crest in the navbar for a speedrunner surprise!',
  'Binding crouch to your mouse side buttons shaves 45ms off your slide-cancel timing.',
  'Click the [LVL.42] player badge in the navbar to open the Secret Guild Terminal.',
  'Check out the Quest Board under /events to track active and upcoming raids.',
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
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-black/80 border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="px-2.5 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold rounded shrink-0">
            GUILD INTEL
          </div>
          <div className="text-xs text-gray-300 font-mono transition-opacity duration-300 truncate">
            {TIPS[index]}
          </div>
        </div>
        {onOpenTerminal && (
          <button
            onClick={onOpenTerminal}
            className="text-xs text-gray-400 hover:text-yellow-400 transition-colors font-mono shrink-0 border border-gray-800 hover:border-yellow-400/50 px-3 py-1 rounded"
          >
            [ OPEN TERMINAL ]
          </button>
        )}
      </div>
    </div>
  );
}

