'use client';

import { useEffect, useState } from 'react';
import { Clip } from '../data/clips';
import { playBlip, playPowerUp } from './SoundEffects';
import { useToast } from './Toast';
import {
  YOUTUBE_CONFIG,
  getYouTubeEmbedUrl,
  getYouTubeWatchUrl,
} from '../config/youtube';

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
    const shareUrl = clip.youtubeVideoId
      ? getYouTubeWatchUrl({ videoId: clip.youtubeVideoId })
      : window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      showToast('🔗 Link copied to clipboard!', { type: 'success', icon: '📋' });
    }
  };

  const handleOpenYouTube = () => {
    playSelect();
    const url = clip.youtubeVideoId
      ? getYouTubeWatchUrl({ videoId: clip.youtubeVideoId })
      : YOUTUBE_CONFIG.channelUrl;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const embedUrl = clip.youtubeVideoId
    ? getYouTubeEmbedUrl({ videoId: clip.youtubeVideoId, autoplay: true })
    : null;

  const isPlaceholder = clip.isPlaceholder || !clip.youtubeVideoId;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
      onClick={() => {
        playBlip();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-black border-2 border-yellow-400 rounded-2xl overflow-hidden shadow-2xl font-mono"
        style={{
          boxShadow: '0 0 60px rgba(255, 244, 0, 0.25)',
          animation: 'clipModalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CRT Scanline */}
        <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 bg-gray-950 border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-yellow-400 font-bold tracking-wider">
              REPLAY_CINEMA // {clip.game.toUpperCase()}
            </span>
            {isPlaceholder && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400/80 border border-yellow-400/25">
                PLACEHOLDER
              </span>
            )}
          </div>
          <button
            onClick={() => {
              playBlip();
              onClose();
            }}
            className="text-gray-400 hover:text-yellow-400 font-bold text-xs px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded hover:bg-gray-900 transition-colors"
            aria-label="Close modal"
          >
            [ ESC ✕ ]
          </button>
        </div>

        {/* Cinema Video Player Viewport */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center border-b border-gray-800 shrink-0">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={clip.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // Placeholder state — video not yet on YouTube
            <div
              className={`w-full h-full bg-gradient-to-br ${clip.thumbnailGradient} flex flex-col items-center justify-center gap-4 p-6 sm:p-8 text-center`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-yellow-400/15 border-2 border-yellow-400/30 border-dashed flex items-center justify-center text-3xl sm:text-4xl">
                🎬
              </div>
              <div>
                <div className="text-sm font-bold text-yellow-400 mb-1">VIDEO UPLOADING SOON</div>
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                  This slot is reserved. Once uploaded to YouTube, set the{' '}
                  <code className="text-yellow-400/80 bg-yellow-400/10 px-1 rounded">youtubeVideoId</code>{' '}
                  in <code className="text-gray-300">app/data/clips.ts</code>.
                </p>
              </div>
              <a
                href={YOUTUBE_CONFIG.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600/80 hover:bg-red-600 border border-red-500/40 text-white font-bold text-xs rounded-xl transition-all min-h-[44px]"
              >
                <span>▶</span>
                Visit TAG Club YouTube
              </a>
            </div>
          )}
        </div>

        {/* Clip Information & Controls — scrollable on short mobile screens */}
        <div className="p-4 sm:p-6 bg-gradient-to-b from-gray-950 to-black overflow-y-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
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
              <h2 className="text-base sm:text-xl font-bold text-white">{clip.title}</h2>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end flex-wrap">
              <button
                onClick={handleLike}
                disabled={clip.isPlaceholder && !clip.youtubeVideoId}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all min-h-[44px] ${
                  clip.isPlaceholder && !clip.youtubeVideoId
                    ? 'border-gray-800 bg-gray-900/50 text-gray-600 cursor-not-allowed'
                    : hasLiked
                    ? 'border-red-500 bg-red-500/20 text-red-400'
                    : 'border-gray-800 bg-gray-900 text-gray-300 hover:border-yellow-400 hover:text-yellow-400'
                }`}
              >
                <span>{hasLiked ? '❤️' : '🤍'}</span>
                <span>{likes}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border border-gray-800 bg-gray-900 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 transition-all min-h-[44px]"
                title="Share clip"
              >
                <span>🔗</span>
                <span>Share</span>
              </button>

              {/* Open on YouTube button */}
              <button
                onClick={handleOpenYouTube}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border border-red-800/60 bg-red-950/30 text-red-400 hover:border-red-500 hover:bg-red-500/20 transition-all min-h-[44px]"
                title={clip.youtubeVideoId ? 'Watch on YouTube' : 'Visit TAG Club YouTube Channel'}
              >
                <span>▶</span>
                <span>{clip.youtubeVideoId ? 'YouTube' : 'Channel'}</span>
              </button>
            </div>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm font-mono leading-relaxed mb-4">
            {clip.description}
          </p>

          {/* Player Credit HUD */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-gray-900 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-base shrink-0">
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

// local helper for opening YouTube in modal
function playSelect() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 660;
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // audio not available
  }
}
