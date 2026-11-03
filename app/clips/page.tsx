'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBackground from '../components/PageBackground';
import ClipModal from '../components/ClipModal';
import { CLIPS, CLIP_GAMES, type Clip, type ClipCategory } from '../data/clips';
import { playBlip, playSelect, playPowerUp } from '../components/SoundEffects';

function categoryBadge(category: ClipCategory) {
  switch (category) {
    case 'clutch':
      return { label: 'CLUTCH', color: 'bg-red-500/20 text-red-400 border-red-500/40', icon: '🔥' };
    case 'ace':
      return { label: 'ACE', color: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/40', icon: '⚡' };
    case 'tournament':
      return { label: 'TOURNAMENT', color: 'bg-green-500/20 text-green-400 border-green-500/40', icon: '🏆' };
    case 'funny':
      return { label: 'FAIL & FUNNY', color: 'bg-orange-500/20 text-orange-400 border-orange-500/40', icon: '😂' };
    case 'highlight':
    default:
      return { label: 'HIGHLIGHT', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40', icon: '⭐' };
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

  const handleClick = () => {
    playPowerUp();
    onPlay(clip);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-black/80 border-2 border-gray-800 hover:border-yellow-400 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-yellow-400/10 font-mono"
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
      <div className={`relative aspect-video w-full bg-gradient-to-br ${clip.thumbnailGradient} flex items-center justify-center overflow-hidden border-b border-gray-800`}>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #fff400 1px, transparent 1px), linear-gradient(to bottom, #fff400 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none" />

        {/* Play Button Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-yellow-400/90 text-black flex items-center justify-center transition-all duration-300 shadow-xl ${
          isHovered ? 'scale-115 bg-yellow-300 shadow-yellow-400/50' : 'opacity-85'
        }`}>
          <span className="text-xl ml-1">▶</span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/80 text-white border border-gray-700 backdrop-blur-sm">
            {clip.gameIcon} {clip.game}
          </span>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-sm ${cat.color}`}>
            {cat.icon} {cat.label}
          </span>
        </div>

        {/* Duration Chip */}
        <div className="absolute bottom-3 right-3 text-[11px] bg-black/90 text-yellow-400 border border-gray-800 px-2 py-0.5 rounded-md font-bold">
          ⏱️ {clip.duration}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-gray-950/70 to-black">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2 mb-2">
            {clip.title}
          </h3>
          <p className="text-gray-400 text-xs line-clamp-2 mb-4 leading-relaxed">
            {clip.description}
          </p>
        </div>

        {/* Player & Stats Row */}
        <div className="pt-3 border-t border-gray-900 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-lg">{clip.playerAvatar ?? '🎮'}</span>
            <div>
              <div className="text-gray-200 font-bold leading-tight">{clip.player}</div>
              <div className="text-gray-500 text-[10px] leading-tight">{clip.playerTitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-500 text-[11px]">
            <span>👁️ {clip.views}</span>
            <span className="text-red-400">❤️ {clip.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClipsPage() {
  const [selectedGame, setSelectedGame] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeClip, setActiveClip] = useState<Clip | null>(null);

  const featuredClip = CLIPS.find((c) => c.featured) ?? CLIPS[0];

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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white overflow-hidden font-mono">
      <PageBackground />
      <Navbar />

      <main className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-6">
          <Link href="/" className="hover:text-yellow-400 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-yellow-400">REPLAY THEATER</span>
        </div>

        {/* Page Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            <span className="text-yellow-400 font-bold text-xs tracking-widest">
              GUILD_CINEMA // BEST_PLAYS_VAULT
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Club <span className="text-yellow-400">Clips &amp; Highlights</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base font-mono">
            Witness our members pull off 1vX tournament clutches, impossible aces, and legendary guild plays.
          </p>
        </div>

        {/* Featured Clip Spotlight Cinema Banner */}
        {featuredClip && (
          <div className="relative mb-14 bg-gradient-to-br from-gray-900/90 to-black border-2 border-yellow-400/50 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Spotlight Info */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-black">
                    <span>👑</span> PLAY OF THE WEEK
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-black/80 border border-gray-700 text-yellow-400 font-bold">
                    {featuredClip.game}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">
                    {featuredClip.views} views • {featuredClip.duration}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {featuredClip.title}
                </h2>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-mono">
                  {featuredClip.description}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 border border-yellow-400/40 flex items-center justify-center text-xl">
                    {featuredClip.playerAvatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{featuredClip.player}</div>
                    <div className="text-yellow-400 text-xs font-mono">{featuredClip.playerTitle}</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      playPowerUp();
                      setActiveClip(featuredClip);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold text-xs sm:text-sm rounded-xl hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg shadow-yellow-400/25"
                  >
                    <span>▶</span>
                    <span>WATCH FEATURED REPLAY</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Thumbnail Mockup */}
              <div
                onClick={() => {
                  playPowerUp();
                  setActiveClip(featuredClip);
                }}
                className={`lg:col-span-6 aspect-video rounded-2xl bg-gradient-to-br ${featuredClip.thumbnailGradient} border-2 border-gray-800 hover:border-yellow-400 relative overflow-hidden flex items-center justify-center cursor-pointer group shadow-2xl transition-all`}
              >
                <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none" />
                <div className="w-20 h-20 rounded-3xl bg-yellow-400 text-black flex items-center justify-center text-3xl group-hover:scale-110 shadow-2xl shadow-yellow-400/40 transition-transform">
                  <span className="ml-1">▶</span>
                </div>
                <div className="absolute bottom-4 right-4 text-xs font-bold bg-black/90 border border-gray-800 px-3 py-1 rounded text-yellow-400">
                  {featuredClip.duration}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Toolbar: Games, Categories, & Search */}
        <div className="space-y-4 mb-10">
          {/* Top row: Game pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-gray-500 font-bold uppercase mr-1">GAME:</span>
            {CLIP_GAMES.map((game) => (
              <button
                key={game}
                onClick={() => {
                  playBlip();
                  setSelectedGame(game);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  selectedGame === game
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400 shadow-md'
                    : 'border-gray-800 bg-black/60 text-gray-400 hover:text-white'
                }`}
              >
                {game}
              </button>
            ))}
          </div>

          {/* Middle row: Category Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { key: 'all', label: 'All Plays', icon: '🎬' },
                { key: 'clutch', label: 'Clutches', icon: '🔥' },
                { key: 'ace', label: 'Aces', icon: '⚡' },
                { key: 'tournament', label: 'Tournament', icon: '🏆' },
                { key: 'funny', label: 'Guild Fails', icon: '😂' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    playSelect();
                    setSelectedCategory(tab.key);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedCategory === tab.key
                      ? 'border-yellow-400 bg-yellow-400/15 text-yellow-400'
                      : 'border-gray-800 bg-black/40 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>{tab.icon}</span> {tab.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by player, game, or tags..."
                className="w-full bg-black/80 border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-xs text-gray-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Clips Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClips.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-black/40 border border-gray-800 rounded-2xl">
              <div className="text-5xl mb-3">🎬</div>
              <h3 className="text-lg font-bold text-gray-400 mb-1">NO CLIPS MATCH YOUR QUERY</h3>
              <p className="text-xs text-gray-600 font-mono">
                Try switching the game or category filters.
              </p>
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

        {/* "Submit a Clip" Callout Banner */}
        <section className="mt-20 max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400/30 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="text-4xl mb-2">📹</div>
            <h3 className="text-2xl font-bold text-white">
              Hit an Insane Shot or 1vX Clutch?
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-mono max-w-xl mx-auto">
              Share your best plays in the club Discord <span className="text-yellow-400">#clip-submissions</span> channel. Our media team reviews entries weekly to feature on the theater board.
            </p>
            <div className="pt-4">
              <a
                href="https://discord.com/invite/Y9cpqdvZE4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 text-black font-bold text-xs sm:text-sm rounded-xl hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg shadow-yellow-400/25"
              >
                <span>🎮</span>
                SUBMIT YOUR CLIP ON DISCORD
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Video Cinema Theater Modal */}
      <ClipModal
        clip={activeClip}
        onClose={() => setActiveClip(null)}
      />

      <Footer />
    </div>
  );
}
