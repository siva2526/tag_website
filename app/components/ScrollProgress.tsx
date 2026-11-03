'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9996] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 transition-all duration-100 ease-out"
        style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(255,244,0,0.6)' }}
      />
    </div>
  );
}
