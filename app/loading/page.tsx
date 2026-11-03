'use client';

import { useState, useEffect } from 'react';

export default function Loading() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [frame, setFrame] = useState(0);
  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 50);

    // Animate character
    const frameInterval = setInterval(() => {
      setFrame(prev => (prev + 1) % 4);
    }, 200);

    // Generate deterministic random player ID (client only)
    setPlayerId('TAG' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'));

    return () => {
      clearInterval(progressInterval);
      clearInterval(frameInterval);
    };
  }, []);

  const characterFrames = ['◐', '◓', '◑', '◒'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-mono overflow-hidden">
      {/* CRT Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none bg-scanline opacity-10 z-50"></div>
      
      {/* Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #fff40022 1px, transparent 1px),
            linear-gradient(to bottom, #fff40022 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'top',
          height: '200%',
          top: '-50%'
        }} />
        
        {/* Floating Particles - Deterministic (Not completely random, but mimicking randomness) */}
        {Array.from({ length: 10 }, (_, i) => {
          const top = ((i * 23) % 80) + 10;
          const left = ((i * 47) % 80) + 10;
          const delay = ((i * 7) % 30) / 10;
          const duration = 3 + ((i * 5) % 4);
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-20"
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

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-24">
        <div className="max-w-4xl mx-auto">
          
          {/* Game Header */}
          <div className="flex justify-between items-center mb-12 border border-gray-800 bg-black/50 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-yellow-400 text-sm font-bold">TAG CLUB • VIT VELLORE</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
          </div>

          {/* Player Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-black/70 border border-gray-800 p-4 rounded-lg">
              <div className="text-gray-500 text-xs mb-1">PLAYER</div>
              <div className="text-yellow-400 font-bold text-xl">@TAG_MEMBER</div>
            </div>
            <div className="bg-black/70 border border-gray-800 p-4 rounded-lg">
              <div className="text-gray-500 text-xs mb-1">LEVEL</div>
              <div className="text-white font-bold text-xl flex items-center gap-2">
                <span>LOADING</span>
                <span className="text-yellow-400 text-sm">[{loadingProgress}%]</span>
              </div>
            </div>
            <div className="bg-black/70 border border-gray-800 p-4 rounded-lg">
              <div className="text-gray-500 text-xs mb-1">SERVER</div>
              <div className="text-green-400 font-bold text-xl flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                VIT-01
              </div>
            </div>
          </div>

          {/* Main Game Display */}
          <div className="relative mb-12">
            {/* Pixel Art Frame */}
            <div className="absolute inset-0 border-4 border-gray-800 rounded-2xl transform rotate-1"></div>
            <div className="absolute inset-0 border-4 border-yellow-400/20 rounded-2xl transform -rotate-1"></div>
            
            <div className="relative bg-black/80 border-2 border-gray-800 rounded-2xl p-12 md:p-16 backdrop-blur-sm">
              
              {/* Character & Level Display */}
              <div className="flex flex-col items-center mb-8">
                {/* Character Sprite */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl border-2 border-yellow-400/30 flex items-center justify-center">
                    <div className="text-6xl text-yellow-400 animate-bounce">
                      {characterFrames[frame]}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-yellow-400/30 rounded-full blur"></div>
                </div>

                {/* Level Status */}
                <div className="text-center mb-6">
                  <div className="text-2xl md:text-3xl text-gray-400 mb-2">⚠️ THIS LEVEL IS</div>
                  <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mb-4 tracking-wider drop-shadow-[0_0_20px_rgba(255,244,0,0.3)]">
                    BEING BUILT
                  </h1>
                  <div className="flex items-center justify-center gap-3 text-gray-500">
                    <span>🛠️</span>
                    <span>DEVS AT WORK</span>
                    <span>🛠️</span>
                  </div>
                </div>

                {/* Progress Bar - XP Style */}
                <div className="w-full max-w-2xl">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-yellow-400 font-bold">LOADING LEVEL...</span>
                    <span className="text-gray-400 font-mono">{loadingProgress}%</span>
                  </div>
                  <div className="w-full h-8 bg-gray-900 border-2 border-gray-800 rounded-lg overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-150 flex items-center justify-end px-2"
                      style={{ width: `${loadingProgress}%` }}
                    >
                      {loadingProgress > 30 && (
                        <span className="text-black text-xs font-bold">XP</span>
                      )}
                    </div>
                    {/* Scanline effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-scan"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Game Console */}
          <div className="bg-black/90 border border-gray-800 rounded-lg p-6 mb-8 font-mono">
            <div className="flex items-center gap-2 text-green-400 mb-4">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm">&gt; TERMINAL_ACTIVE</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> git checkout feature/new-level
              </p>
              <p className="text-gray-500">  Switched to branch 'feature/new-level'</p>
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> npm run build
              </p>
              <p className="text-yellow-400/70">  &gt; Building level assets...</p>
              <p className="text-gray-500">  &gt; 42 files optimized</p>
              <p className="text-gray-400">
                <span className="text-yellow-400">$</span> {loadingProgress < 100 ? (
                  <span className="animate-pulse">▌</span>
                ) : (
                  <span className="text-green-400">Build complete!</span>
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/"
              className="group relative overflow-hidden bg-gray-900 border-2 border-gray-800 hover:border-yellow-400 rounded-lg p-4 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-3">
                <span className="font-bold">RETURN TO LOBBY</span>
              </div>
            </a>
          </div>

          {/* Player Stats Footer */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="border border-gray-800 bg-black/50 p-3 rounded-lg">
              <div className="text-yellow-400 text-sm">COMPLETION</div>
              <div className="text-white font-bold text-lg">{loadingProgress}%</div>
            </div>
            <div className="border border-gray-800 bg-black/50 p-3 rounded-lg">
              <div className="text-yellow-400 text-sm">ENEMIES</div>
              <div className="text-white font-bold text-lg">0/0</div>
            </div>
            <div className="border border-gray-800 bg-black/50 p-3 rounded-lg">
              <div className="text-yellow-400 text-sm">SECRETS</div>
              <div className="text-white font-bold text-lg">???</div>
            </div>
            <div className="border border-gray-800 bg-black/50 p-3 rounded-lg">
              <div className="text-yellow-400 text-sm">EST. RELEASE</div>
              <div className="text-white font-bold text-lg">SOON™</div>
            </div>
          </div>

        </div>
      </main>

      {/* Debug Console */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-gray-800 p-2 text-xs font-mono z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-gray-500">
          <div className="flex items-center gap-4">
            <span className="text-green-400">[DEBUG]</span>
            <span>LOADING_ASSETS: {loadingProgress}%</span>
            <span className="text-yellow-400">FRAME_RATE: 60FPS</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {/* Fixed deterministic player ID that only renders after mount */}
            {playerId && (
              <>
                <span>PLAYER_ID: {playerId}</span>
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
        
        .bg-scanline {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 50%
          );
          background-size: 100% 4px;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}