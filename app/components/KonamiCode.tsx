'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useToast } from './Toast';
import { playLevelUp } from './SoundEffects';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export default function KonamiCode() {
  const sequenceRef = useRef<string[]>([]);
  const [activated, setActivated] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const { showToast } = useToast();

  const spawnParticles = useCallback(() => {
    const newParticles: Particle[] = Array.from({ length: 45 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 40,
      y: 50 + (Math.random() - 0.5) * 30,
      vx: (Math.random() - 0.5) * 4,
      vy: -(Math.random() * 5 + 1),
      life: 1,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        return;
      }

      // Update sequence in ref to avoid calling setState side-effects inside render phases
      sequenceRef.current = [...sequenceRef.current, e.key].slice(-KONAMI_CODE.length);

      if (sequenceRef.current.join(',').toLowerCase() === KONAMI_CODE.join(',').toLowerCase()) {
        sequenceRef.current = [];
        setActivated(true);
        spawnParticles();
        playLevelUp();
        showToast('⚡ SECRET KONAMI CODE UNLOCKED! +9999 XP', { type: 'xp', icon: '🎮' });
        setTimeout(() => setActivated(false), 3600);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spawnParticles, showToast]);

  // Animate particles
  useEffect(() => {
    if (!activated) return;
    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.12,
            life: p.life - 0.02,
          }))
          .filter(p => p.life > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [activated]);

  if (!activated) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-full bg-yellow-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.life,
            transform: `scale(${p.life})`,
            boxShadow: '0 0 10px rgba(255,244,0,0.8)',
          }}
        />
      ))}

      {/* Overlay Message */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="bg-black/95 border-4 border-yellow-400 rounded-2xl px-10 py-8 text-center font-mono shadow-2xl shadow-yellow-400/40"
          style={{ animation: 'konamiPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
        >
          <div className="text-5xl mb-3">🎮</div>
          <div className="text-yellow-400 text-2xl font-bold mb-2">CHEAT CODE ACTIVATED!</div>
          <div className="text-white text-lg mb-1">You found the legendary secret!</div>
          <div className="text-green-400 font-bold text-2xl">+9,999 XP</div>
          <div className="text-gray-500 text-xs mt-3 font-mono">↑↑↓↓←→←→BA</div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes konamiPop {
          0% { opacity: 0; transform: scale(0.3) rotate(-5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
