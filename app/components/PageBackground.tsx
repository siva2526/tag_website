'use client';

export default function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Delicate Retro CRT Scanline Layer (Subtle 3% opacity for authentic arcade vibe without eye strain) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-50"
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.7) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

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
