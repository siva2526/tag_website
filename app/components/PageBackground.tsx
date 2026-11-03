export default function PageBackground() {
  return (
    <>
      {/* CRT Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-50" style={{
        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 50%)',
        backgroundSize: '100% 4px',
      }} />

      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `
            linear-gradient(to right, #fff400 1px, transparent 1px),
            linear-gradient(to bottom, #fff400 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'top',
          height: '200%',
          top: '-50%'
        }} />

        {/* Floating Particles - Deterministic */}
        {Array.from({ length: 15 }, (_, i) => {
          const top = ((i * 37) % 70) + 15;
          const left = ((i * 73) % 70) + 15;
          const delay = ((i * 13) % 30) / 10;
          const duration = 3 + ((i * 7) % 4);

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-ping"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
