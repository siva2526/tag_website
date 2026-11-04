'use client';

import { useState, useEffect } from 'react';
import { playSelect } from './SoundEffects';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2 px-3.5 py-2.5 bg-yellow-400 text-black font-extrabold font-mono text-xs border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#ffffff] hover:shadow-[4px_4px_0px_0px_#ffffff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all min-h-[44px]"
      title="Warp to Top"
    >
      <span className="text-sm">🚀</span>
      <span className="hidden sm:inline">WARP TOP</span>
    </button>
  );
}
