'use client';

import { useState, useEffect, useRef } from 'react';

const DEFAULT_TITLE = 'TAG Club | Technology & Gaming Club VIT';
const AFK_TITLE = '⏸️ PAUSED // Player 1 AFK...';

export default function AFKDetector() {
  const [isAFK, setIsAFK] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleActive = () => {
      setIsAFK(false);
      document.title = DEFAULT_TITLE;
      if (timerRef.current) clearTimeout(timerRef.current);
      // Trigger AFK after 30 seconds of no interaction
      timerRef.current = setTimeout(() => {
        setIsAFK(true);
        document.title = AFK_TITLE;
      }, 30000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = AFK_TITLE;
      } else {
        if (!isAFK) {
          document.title = DEFAULT_TITLE;
        }
      }
    };

    handleActive();

    window.addEventListener('mousemove', handleActive, { passive: true });
    window.addEventListener('keydown', handleActive, { passive: true });
    window.addEventListener('scroll', handleActive, { passive: true });
    window.addEventListener('click', handleActive, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', handleActive);
      window.removeEventListener('keydown', handleActive);
      window.removeEventListener('scroll', handleActive);
      window.removeEventListener('click', handleActive);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.title = DEFAULT_TITLE;
    };
  }, [isAFK]);

  if (!isAFK) return null;

  return (
    <div
      onClick={() => {
        setIsAFK(false);
        document.title = DEFAULT_TITLE;
      }}
      className="fixed bottom-6 left-6 z-[9994] cursor-pointer"
    >
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#0c0c14] border-2 border-yellow-400 rounded-xl font-mono text-xs shadow-[4px_4px_0px_0px_#fff400] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5">
        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping" />
        <span className="text-yellow-400 font-arcade text-[10px]">AFK DETECTED</span>
        <span className="text-zinc-400 font-terminal text-sm">{"// CLICK OR PRESS ANY KEY TO RESUME"}</span>
      </div>
    </div>
  );
}


