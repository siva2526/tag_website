'use client';

import { useEffect, useRef, useState } from 'react';

interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export default function CursorTrail() {
  const [dots, setDots] = useState<TrailDot[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window) return;

    let animFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      const id = counterRef.current++;
      const newDot: TrailDot = {
        id,
        x: e.clientX,
        y: e.clientY,
        opacity: 0.8,
        size: 6,
      };
      setDots(prev => [...prev.slice(-18), newDot]);
    };

    // Fade out dots
    const fade = () => {
      setDots(prev =>
        prev
          .map(d => ({ ...d, opacity: d.opacity - 0.05, size: d.size * 0.94 }))
          .filter(d => d.opacity > 0.01)
      );
      animFrame = requestAnimationFrame(fade);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrame = requestAnimationFrame(fade);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {dots.map((dot, index) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-yellow-400"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity * (index / dots.length),
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${dot.size * 2}px rgba(255,244,0,0.3)`,
          }}
        />
      ))}
    </div>
  );
}
