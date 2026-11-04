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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl"
      onClick={() => {
        playBlip();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0c0c12] border-2 border-yellow-400 rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#fff400]"
        style={{
          animation: 'clipModalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 bg-zinc-900/80 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
            <span className="text-xs text-yellow-400 font-mono font-bold tracking-wider">
              REPLAY_CINEMA // {clip.game.toUpperCase()}
            </span>
            {isPlaceholder && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400/90 border border-yellow-400/25">
                STANDBY
              </span>
            )}
          </div>
          <button
            onClick={() => {
              playBlip();
              onClose();
            }}
            className="text-zinc-400 hover:text-white font-mono font-bold text-xs px-3 py-1.5 min-h-[38px] flex items-center justify-center rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            ESC ✕
          </button>
        </div>

        {/* Cinema Video Player Viewport */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center border-b border-white/[0.06] shrink-0">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={clip.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${clip.thumbnailGradient} flex flex-col items-center justify-center gap-4 p-6 sm:p-8 text-center`}
            >
              <div className="w-16 h-16 rounded-2xl bg-yellow-400/15 border border-yellow-400/30 flex items-center justify-center text-3xl">
                🎬
              </div>
              <div>
                <div className="text-sm font-bold text-yellow-400 mb-1">REPLAY CLIP QUEUED</div>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  This clip slot is configured. Watch other highlights or visit the official TAG YouTube channel.
                </p>
              </div>
              <a
                href={YOUTUBE_CONFIG.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-all"
              >
                <span>▶</span>
                Visit TAG Club YouTube
              </a>
            </div>
          )}
        </div>

        {/* Clip Information & Controls */}
        <div className="p-4 sm:p-6 bg-zinc-950/90 overflow-y-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-400 border border-yellow-400/30">
                  {clip.gameIcon ?? '🎮'} {clip.game}
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 uppercase">
                  {clip.category}
                </span>
                {clip.tournamentName && (
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    🏆 {clip.tournamentName}
                  </span>
                )}
                <span className="text-xs text-zinc-500 font-mono">
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
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all min-h-[40px] ${
                  clip.isPlaceholder && !clip.youtubeVideoId
                    ? 'border-white/[0.08] bg-zinc-900/50 text-zinc-600 cursor-not-allowed'
                    : hasLiked
                    ? 'border-red-500 bg-red-500/20 text-red-400'
                    : 'border-white/[0.08] bg-zinc-900 text-zinc-300 hover:border-yellow-400 hover:text-yellow-400'
                }`}
              >
                <span>{hasLiked ? '❤️' : '🤍'}</span>
                <span>{likes}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-white/[0.08] bg-zinc-900 text-zinc-300 hover:border-yellow-400 hover:text-yellow-400 transition-all min-h-[40px]"
                title="Share clip"
              >
                <span>🔗</span>
                <span>Share</span>
              </button>

              <button
                onClick={handleOpenYouTube}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-red-800/60 bg-red-950/30 text-red-400 hover:border-red-500 hover:bg-red-500/20 transition-all min-h-[40px]"
                title={clip.youtubeVideoId ? 'Watch on YouTube' : 'Visit TAG Club YouTube Channel'}
              >
                <span>▶</span>
                <span>{clip.youtubeVideoId ? 'YouTube' : 'Channel'}</span>
              </button>
            </div>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
            {clip.description}
          </p>

          {/* Player Credit HUD */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.06] text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-base shrink-0">
                {clip.playerAvatar ?? '🎮'}
              </div>
              <div>
                <div className="text-white font-bold">{clip.player}</div>
                <div className="text-zinc-500 font-mono text-[11px]">{clip.playerTitle}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 font-mono">
              {clip.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-zinc-400 bg-zinc-900 border border-white/[0.06] px-2 py-0.5 rounded"
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
