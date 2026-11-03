'use client';

import { useState, useEffect, useRef } from 'react';

export default function AFKDetector() {
  const [isAFK, setIsAFK] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      setIsAFK(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      // Trigger AFK after 20 seconds of no interaction
      timerRef.current = setTimeout(() => {
        setIsAFK(true);
      }, 20000);
    };

    resetTimer();

    window.addEventListener('mousemove', resetTimer, { passive: true });
    window.addEventListener('keydown', resetTimer, { passive: true });
    window.addEventListener('scroll', resetTimer, { passive: true });
    window.addEventListener('click', resetTimer, { passive: true });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, []);

  if (!isAFK) return null;

  return (
    <div
      onClick={() => setIsAFK(false)}
      className="fixed bottom-6 left-6 z-[9994] cursor-pointer animate-bounce"
    >
      <div className="flex items-center gap-3 px-4 py-2 bg-black/90 border-2 border-yellow-400/80 rounded-xl font-mono text-xs shadow-2xl shadow-yellow-400/20 backdrop-blur-md">
        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping" />
        <span className="text-yellow-400 font-bold">AFK DETECTED</span>
        <span className="text-gray-400">// Press any key to resume quest</span>
      </div>
    </div>
  );
}

