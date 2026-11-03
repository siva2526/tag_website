'use client';

import { useEffect, useState } from 'react';
import { Clip } from '../data/clips';
import { playBlip, playPowerUp } from './SoundEffects';
import { useToast } from './Toast';

interface ClipModalProps {
  clip: Clip | null;
  onClose: () => void;
}

export default function ClipModal({ clip, onClose }: ClipModalProps) {
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (clip) {
      setLikes(clip.likes);
      setHasLiked(false);
    }
  }, [clip]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playBlip();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!clip) return null;

  const handleLike = () => {
    if (!hasLiked) {
      playPowerUp();
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      showToast('🔥 Clip upvoted! Guild XP +50 awarded.', { type: 'xp', icon: '🔥' });
    }
  };

  const handleCopyLink = () => {
    playBlip();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`🔗 Link copied to clipboard!`, { type: 'success', icon: '📋' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
      onClick={() => {
        playBlip();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-4xl bg-black border-2 border-yellow-400 rounded-2xl overflow-hidden shadow-2xl font-mono"
        style={{
          boxShadow: '0 0 60px rgba(255, 244, 0, 0.25)',
          animation: 'clipModalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CRT Scanline */}
        <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-gray-950 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-yellow-400 font-bold tracking-wider">
              REPLAY_CINEMA // {clip.game.toUpperCase()}
            </span>
          </div>
          <button
            onClick={() => {
              playBlip();
              onClose();
            }}
            className="text-gray-400 hover:text-yellow-400 font-bold text-xs px-2 py-1 rounded hover:bg-gray-900 transition-colors"
          >
            [ ESC ✕ ]
          </button>
        </div>

        {/* Cinema Video Player Viewport */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center border-b border-gray-800">
          {clip.videoEmbedUrl ? (
            <iframe
              src={`${clip.videoEmbedUrl}?autoplay=1&rel=0`}
              title={clip.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-8">
              <div className="text-6xl mb-3">🎬</div>
              <div className="text-sm text-yellow-400 font-bold mb-1">LOCAL REPLAY FEED READY</div>
              <p className="text-xs text-gray-500">Provide a YouTube embed or mp4 link to stream gameplay.</p>
            </div>
          )}
        </div>

        {/* Clip Information & Controls */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-gray-950 to-black">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                  {clip.gameIcon ?? '🎮'} {clip.game}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
                  {clip.category}
                </span>
                {clip.tournamentName && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/40">
                    🏆 {clip.tournamentName}
                  </span>
                )}
                <span className="text-xs text-gray-500 font-mono">
                  ⏱️ {clip.duration} • {clip.views} views
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{clip.title}</h2>
            </div>

            {/* Like & Share Action Buttons */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                  hasLiked
                    ? 'border-red-500 bg-red-500/20 text-red-400'
                    : 'border-gray-800 bg-gray-900 text-gray-300 hover:border-yellow-400 hover:text-yellow-400'
                }`}
              >
                <span>{hasLiked ? '❤️' : '🤍'}</span>
                <span>{likes}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-gray-800 bg-gray-900 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-all"
                title="Share clip"
              >
                <span>🔗</span>
                <span>Share</span>
              </button>
            </div>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm font-mono leading-relaxed mb-4">
            {clip.description}
          </p>

          {/* Player Credit HUD */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-gray-900 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-base">
                {clip.playerAvatar ?? '🎮'}
              </div>
              <div>
                <div className="text-white font-bold">{clip.player}</div>
                <div className="text-gray-500 text-[11px]">{clip.playerTitle}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {clip.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-gray-500 bg-black border border-gray-800 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes clipModalIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
