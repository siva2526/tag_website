'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBackground from '../components/PageBackground';
import ClipModal from '../components/ClipModal';
import { CLIPS, CLIP_GAMES, type Clip, type ClipCategory } from '../data/clips';
import { playBlip, playSelect, playPowerUp } from '../components/SoundEffects';
import { recordPageVisit, recordInteraction } from '../components/EasterEggs';
import {
  YOUTUBE_CONFIG,
  getYouTubeEmbedUrl,
  getYouTubeWatchUrl,
  isPlaceholderPlaylist,
} from '../config/youtube';

function categoryBadge(category: ClipCategory) {
  switch (category) {
    case 'clutch':
      return { label: 'CLUTCH', color: 'bg-red-500/15 text-red-400 border-red-500/30', icon: '🔥' };
    case 'ace':
      return { label: 'ACE', color: 'bg-yellow-400/15 text-yellow-400 border-yellow-400/30', icon: '⚡' };
    case 'tournament':
      return { label: 'TOURNAMENT', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', icon: '🏆' };
    case 'funny':
      return { label: 'FAIL & FUNNY', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30', icon: '😂' };
    case 'highlight':
    default:
      return { label: 'HIGHLIGHT', color: 'bg-purple-500/15 text-purple-300 border-purple-500/30', icon: '⭐' };
  }
}

function ClipCard({
  clip,
  onPlay,
}: {
  clip: Clip;
  onPlay: (clip: Clip) => void;
  }) {
  const [isHovered, setIsHovered] = useState(false);
  const cat = categoryBadge(clip.category);
  const isPlaceholder = clip.isPlaceholder || !clip.youtubeVideoId;

  const handleClick = () => {
    playPowerUp();
    recordInteraction('like');
    onPlay(clip);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative bg-[#0c0c12] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between border-2 ${
        isPlaceholder ? 'border-dashed border-zinc-700' : 'border-zinc-800'
      } ${
        isHovered
          ? 'border-yellow-400 shadow-[4px_4px_0px_0px_#fff400] -translate-x-0.5 -translate-y-0.5'
          : 'hover:border-zinc-700'
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        playBlip();
      }}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      {/* Video Thumbnail Viewport */}
      <div className={`relative aspect-video w-full bg-gradient-to-br ${clip.thumbnailGradient} flex items-center justify-center overflow-hidden border-b border-white/[0.06]`}>
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #fff400 1px, transparent 1px), linear-gradient(to bottom, #fff400 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Play Button */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
          isPlaceholder
            ? `border border-dashed border-yellow-400/40 bg-yellow-400/10 ${isHovered ? 'scale-110 border-yellow-400/60' : ''}`
            : `bg-yellow-400 text-black ${isHovered ? 'scale-110 bg-yellow-300 shadow-[0_0_20px_rgba(255,244,0,0.4)]' : 'opacity-90'}`
        }`}>
          {isPlaceholder
            ? <span className="text-yellow-400/60 text-xl">⏳</span>
            : <span className="text-xl ml-1 font-bold">▶</span>
          }
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/80 text-white border border-white/10 backdrop-blur-md">
            {clip.gameIcon} {clip.game}
          </span>
          <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border backdrop-blur-md ${cat.color}`}>
            {cat.icon} {cat.label}
          </span>
          {isPlaceholder && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400/90 border border-yellow-400/30 backdrop-blur-md">
              STANDBY
            </span>
          )}
        </div>

        {/* Duration Chip */}
        <div className="absolute bottom-3 right-3 text-[11px] font-mono bg-black/90 text-yellow-400 border border-white/10 px-2 py-0.5 rounded-md font-bold">
          ⏱️ {clip.duration}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2 mb-1.5">
            {clip.title}
          </h3>
          <p className="text-zinc-400 text-xs line-clamp-2 mb-4 leading-relaxed">
            {clip.description}
          </p>
        </div>

        {/* Player & Stats Row */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-lg">{clip.playerAvatar ?? '🎮'}</span>
            <div>
              <div className="text-zinc-200 font-bold leading-tight">{clip.player}</div>
              <div className="text-zinc-500 font-mono text-[10px] leading-tight">{clip.playerTitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-zinc-500 font-mono text-[11px]">
            {clip.views !== 'TBA' && <span>👁️ {clip.views}</span>}
            {clip.isPlaceholder
              ? <span className="text-yellow-400/60 font-semibold">SOON</span>
              : <span className="text-red-400 font-semibold">❤️ {clip.likes}</span>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaylistBanner() {
  const [showEmbed, setShowEmbed] = useState(false);
  const isPlaceholder = isPlaceholderPlaylist();

  const embedUrl = getYouTubeEmbedUrl({
    playlistId: YOUTUBE_CONFIG.clipsPlaylistId,
    autoplay: false,
  });

  return (
    <section className="mb-12 bg-zinc-950/80 border border-white/[0.08] backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">
      {/* Banner Header */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-white/[0.06] bg-zinc-900/40 gap-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-red-400 tracking-wider">YOUTUBE</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-xs font-bold text-white tracking-wide">
            OFFICIAL TAG HIGHLIGHTS THEATER
          </span>
          {isPlaceholder && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
              CHANNEL FEED
            </span>
          )}
        </div>
        <a
          href={YOUTUBE_CONFIG.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-red-400 hover:text-red-300 font-bold transition-colors flex items-center gap-1 min-h-[36px]"
          onClick={() => playBlip()}
        >
          Visit Channel ↗
        </a>
      </div>

      {isPlaceholder ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-3xl text-red-400">
            ▶
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Official YouTube Vault Connected</h3>
            <p className="text-zinc-400 text-xs max-w-md mx-auto leading-relaxed">
              Explore premier esports scrims, campus tournament recaps, and clutch compilations on the official TAG Club YouTube channel.
            </p>
          </div>
          <a
            href={YOUTUBE_CONFIG.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            <span>▶</span>
            Open TAG Club YouTube
          </a>
        </div>
      ) : showEmbed ? (
        <div className="aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title="TAG Club Clips Playlist"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div
          className="relative aspect-video bg-gradient-to-br from-red-950/20 via-zinc-950 to-black flex flex-col items-center justify-center gap-4 cursor-pointer group"
          onClick={() => {
            playPowerUp();
            setShowEmbed(true);
          }}
        >
          <div className="w-20 h-20 rounded-2xl bg-red-600/20 border border-red-500/40 group-hover:bg-red-600/30 group-hover:border-red-400 flex items-center justify-center text-4xl transition-all duration-300 group-hover:scale-110 shadow-2xl">
            <span className="ml-1 text-white">▶</span>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-white mb-1">TAG Club Official Highlights Reel</div>
            <div className="text-xs text-zinc-500 font-mono">Click to load interactive YouTube player</div>
          </div>
          <div className="absolute bottom-4 right-4 text-[11px] font-mono bg-red-600 text-white font-bold px-3 py-1 rounded-full">
            ▶ PLAYLIST
          </div>
        </div>
      )}
    </section>
  );
}

export default function ClipsPage() {
  const [selectedGame, setSelectedGame] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeClip, setActiveClip] = useState<Clip | null>(null);

  useEffect(() => {
    recordPageVisit('clips');
  }, []);

  const filteredClips = useMemo(() => {
    return CLIPS.filter((c) => {
      if (selectedGame !== 'All' && c.game !== selectedGame) return false;
      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.player.toLowerCase().includes(q) ||
          c.game.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedGame, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 overflow-hidden relative">
      <PageBackground />
      <Navbar />

      <main className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-6">
          <Link href="/" className="hover:text-yellow-400 transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-yellow-400">REPLAY THEATER</span>
        </div>

        {/* Page Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-yellow-400 text-xs font-mono mb-3">
            <span>// GUILD HIGHLIGHTS VAULT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            REPLAY <span className="text-yellow-400">CINEMA &amp; HIGHLIGHTS</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Watch tournament clutches, 1vX aces, and legendary guild plays. All highlights sourced directly from collegiate scrims and official streams.
          </p>
        </div>

        {/* YouTube Playlist Banner */}
        <PlaylistBanner />

        {/* Filter Toolbar */}
        <div className="space-y-4 mb-10">
          {/* Game pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-xs text-zinc-500 font-mono font-bold uppercase mr-1">GAME:</span>
            {CLIP_GAMES.map((game) => (
              <button
                key={game}
                onClick={() => {
                  playBlip();
                  setSelectedGame(game);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border min-h-[38px] flex items-center ${
                  selectedGame === game
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                    : 'border-white/[0.08] bg-zinc-900/40 text-zinc-400 hover:text-white'
                }`}
              >
                {game}
              </button>
            ))}
          </div>

          {/* Category tabs & search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
              {[
                { key: 'all', label: 'All Plays', icon: '🎬' },
                { key: 'clutch', label: 'Clutches', icon: '🔥' },
                { key: 'ace', label: 'Aces', icon: '⚡' },
                { key: 'tournament', label: 'Tournament', icon: '🏆' },
                { key: 'funny', label: 'Guild Fails', icon: '😂' },
                { key: 'highlight', label: 'Highlights', icon: '⭐' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    playSelect();
                    setSelectedCategory(tab.key);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border min-h-[38px] flex items-center ${
                    selectedCategory === tab.key
                      ? 'border-yellow-400 bg-yellow-400/15 text-yellow-400'
                      : 'border-white/[0.08] bg-zinc-900/40 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="mr-1">{tab.icon}</span> {tab.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search player, game, or tags..."
                className="w-full bg-zinc-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors min-h-[44px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-zinc-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Clips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClips.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-zinc-950/60 border border-white/10 rounded-2xl">
              <div className="text-4xl mb-3">🎬</div>
              <h3 className="text-base font-bold text-zinc-300 mb-1">NO CLIPS MATCH YOUR QUERY</h3>
              <p className="text-xs text-zinc-500 font-mono">Try adjusting the game or category filters.</p>
            </div>
          ) : (
            filteredClips.map((clip) => (
              <ClipCard
                key={clip.id}
                clip={clip}
                onPlay={(c) => setActiveClip(c)}
              />
            ))
          )}
        </div>

        {/* Submit a Clip Callout */}
        <section className="mt-14 sm:mt-16 max-w-4xl mx-auto bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-white/10 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="text-3xl sm:text-4xl mb-2">📹</div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Hit an Insane Shot or 1vX Clutch?
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Share your best plays in the club Discord <span className="text-yellow-400 font-mono">#clip-submissions</span> channel. Our media team reviews entries weekly and highlights top clips.
            </p>
            <div className="pt-4">
              <a
                href="https://discord.com/invite/Y9cpqdvZE4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-yellow-400 text-black font-extrabold text-xs sm:text-sm rounded-xl hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(255,244,0,0.25)] min-h-[44px]"
              >
                <span>🎮</span>
                SUBMIT YOUR CLIP ON DISCORD
              </a>
            </div>
          </div>
        </section>
      </main>

      <ClipModal clip={activeClip} onClose={() => setActiveClip(null)} />
      <Footer />
    </div>
  );
}
