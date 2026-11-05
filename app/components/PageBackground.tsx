'use client';

import { useState, useEffect } from 'react';

export function isCrtEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const val = localStorage.getItem('tag-crt-enabled');
  return val === null ? true : val === 'true';
}

export function setCrtEnabled(enabled: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('tag-crt-enabled', String(enabled));
  window.dispatchEvent(new CustomEvent('tag:crt-toggle', { detail: { enabled } }));
}

export default function PageBackground() {
  const [crtOn, setCrtOn] = useState(() => (typeof window !== 'undefined' ? isCrtEnabled() : true));

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      setCrtOn(customEvent.detail?.enabled ?? isCrtEnabled());
    };
    window.addEventListener('tag:crt-toggle', handleToggle);
    return () => window.removeEventListener('tag:crt-toggle', handleToggle);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Delicate Retro CRT Scanline Layer (Subtle 3.5% opacity, toggleable) */}
      {crtOn && (
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.045] z-50 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.75) 50%)',
            backgroundSize: '100% 4px',
          }}
        />
      )}

      {/* Ambient Radial Spotlight: Cyber Yellow (Top-Center) */}
      <div
        className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #fff400 0%, rgba(255, 244, 0, 0.15) 45%, transparent 70%)',
        }}
      />

      {/* Ambient Radial Spotlight: Electric Cyan (Lower Right) */}
      <div
        className="absolute top-[40%] -right-[10%] w-[550px] sm:w-[800px] h-[480px] rounded-full blur-[150px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00f0ff 0%, rgba(6, 182, 212, 0.15) 45%, transparent 70%)',
        }}
      />

      {/* Retro Tactical Grid with Vignette */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 85%)',
        }}
      />

      {/* Halftone / Dot Matrix Accent */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 244, 0, 0.8) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}
