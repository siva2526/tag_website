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
      className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2 px-3 py-2 bg-black/90 border-2 border-yellow-400 text-yellow-400 font-mono text-xs font-bold rounded-xl shadow-xl shadow-yellow-400/20 hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all duration-300"
      title="Warp to Top"
    >
      <span className="text-sm">🚀</span>
      <span className="hidden sm:inline">WARP TOP</span>
    </button>
  );
}

