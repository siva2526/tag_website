'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBackground from '../components/PageBackground';
import { events, type Event, type EventStatus, type EventCategory } from '../data/events';
import { playBlip, playSelect } from '../components/SoundEffects';
import { useToast } from '../components/Toast';

type FilterTab = EventStatus | 'all';

const TAB_CONFIG: { key: FilterTab; label: string; icon: string; emptyMsg: string }[] = [
  { key: 'all', label: 'ALL QUESTS', icon: '📋', emptyMsg: 'No quests match your search query.' },
  { key: 'upcoming', label: 'UPCOMING', icon: '🔮', emptyMsg: 'No upcoming quests available, adventurer.' },
  { key: 'ongoing', label: 'ACTIVE MISSIONS', icon: '⚔️', emptyMsg: 'No active missions. Check back soon!' },
  { key: 'completed', label: 'COMPLETED RAIDS', icon: '✅', emptyMsg: 'No completed raids found.' },
];

function statusBadge(status: EventStatus) {
  switch (status) {
    case 'upcoming':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          UPCOMING
        </span>
      );
    case 'ongoing':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/40">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          ACTIVE
        </span>
      );
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400 border border-gray-700">
          <span>✓</span>
          COMPLETED
        </span>
      );
  }
}

function EventCard({ event }: { event: Event }) {
  const [isHovered, setIsHovered] = useState(false);
  const isTech = event.category === 'Technology';
  const { showToast } = useToast();

  const handleClick = () => {
    if (event.link) {
      playSelect();
      window.open(event.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBlip();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${event.title} - ${event.fullDate} | ${event.link}`);
      showToast(`📋 Quest details copied for "${event.title}"!`, { type: 'success', icon: '📋' });
    }
  };

  return (
    <div
      className={`relative bg-black/80 border-2 border-gray-800 rounded-xl p-6 transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
        event.status === 'completed' ? 'opacity-85' : ''
      }`}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? `0 20px 40px rgba(${isTech ? '255,244,0' : '34,197,94'}, 0.14)`
          : '0 4px 12px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        playBlip();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      {/* Animated Border */}
      <div
        className={`absolute inset-0 rounded-xl border-2 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } ${isTech ? 'border-yellow-400' : 'border-green-500'}`}
      />

      <div>
        {/* Quest Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${
                isTech ? 'bg-yellow-400/20 border border-yellow-400/30' : 'bg-green-500/20 border border-green-500/30'
              } flex items-center justify-center`}
            >
              <span className={`text-xl ${isTech ? 'text-yellow-400' : 'text-green-500'}`}>
                {isTech ? '⚡' : '🎮'}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  isTech
                    ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                    : 'bg-green-500/20 text-green-500 border border-green-500/30'
                }`}
              >
                {event.category}
              </span>
              {statusBadge(event.status)}
            </div>
          </div>
          <div className="text-right font-mono">
            <div className={`text-2xl font-bold ${isTech ? 'text-yellow-400' : 'text-green-400'}`}>
              {event.date.split(' ')[0]}
            </div>
            <div className="text-gray-500 text-xs">{event.date.split(' ')[1]}</div>
          </div>
        </div>

        {/* Quest Details */}
        <h3 className="text-xl font-bold mb-1 text-white group-hover:text-yellow-400 transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-500 text-xs font-mono mb-3">{event.fullDate}</p>
        <p className="text-gray-400 text-sm mb-4 font-mono leading-relaxed">
          {event.description}
        </p>

        {/* Quest Stats */}
        <div className="space-y-1.5 mb-4 bg-gray-950/60 border border-gray-800/80 rounded-lg p-2.5">
          {event.difficulty && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-mono">DIFFICULTY</span>
              <span className={`font-bold ${isTech ? 'text-yellow-400' : 'text-green-500'}`}>
                {event.difficulty}
              </span>
            </div>
          )}
          {event.xpReward && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-mono">REWARD</span>
              <span className="text-yellow-400 font-bold">{event.xpReward}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full transition-all duration-300 ${
              isTech
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                : 'bg-gradient-to-r from-green-500 to-green-700'
            }`}
            style={{
              width: event.status === 'completed' ? '100%' : isHovered ? '80%' : '50%',
            }}
          />
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-900">
          <button
            onClick={handleCopy}
            className="text-gray-500 hover:text-yellow-400 transition-colors font-mono flex items-center gap-1"
            title="Copy quest link"
          >
            <span>🔗</span>
            <span>Share</span>
          </button>
          <span className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
            View Quest ↗
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-black/40 border border-gray-800 rounded-2xl">
      <div className="text-6xl mb-4">🗺️</div>
      <h3 className="text-xl font-bold text-gray-400 mb-2 font-mono">NO QUESTS FOUND</h3>
      <p className="text-gray-500 font-mono text-sm max-w-md">{message}</p>
      <div className="mt-6 text-gray-600 text-xs font-mono animate-pulse">
        [ Check back later or adjust your filters, adventurer ]
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | EventCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      if (activeTab !== 'all' && e.status !== activeTab) return false;
      if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.fullDate.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTab, categoryFilter, searchQuery]);

  const countByStatus = (status: EventStatus) => events.filter((e) => e.status === status).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white overflow-hidden font-mono">
      <PageBackground />
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-8 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-600 font-mono mb-8">
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-yellow-400">QUEST BOARD</span>
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              <span className="text-yellow-400 font-bold text-xs tracking-widest">
                QUEST_BOARD // TOURNAMENTS &amp; WORKSHOPS
              </span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Guild <span className="text-yellow-400">Events</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm sm:text-base">
              Browse all tactical tournaments, development jams, and hackathons hosted by TAG Club VIT.
            </p>
          </div>

          {/* Search Bar + Controls */}
          <div className="max-w-3xl mx-auto mb-8 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quest by title, game, or keywords..."
                className="w-full bg-black/80 border-2 border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition-colors shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-sm text-gray-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-gray-500 uppercase font-bold mr-1">PILLAR:</span>
              {(['all', 'Technology', 'Gaming'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playBlip();
                    setCategoryFilter(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                    categoryFilter === cat
                      ? cat === 'Technology'
                        ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                        : cat === 'Gaming'
                        ? 'border-green-500 bg-green-500/20 text-green-400'
                        : 'border-white bg-white/20 text-white'
                      : 'border-gray-800 bg-black/50 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Pillars' : cat === 'Technology' ? '⚡ Technology' : '🎮 Gaming'}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {TAB_CONFIG.map((tab) => {
              const count =
                tab.key === 'all' ? events.length : countByStatus(tab.key as EventStatus);
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    playSelect();
                    setActiveTab(tab.key);
                  }}
                  className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 border-2 ${
                    activeTab === tab.key
                      ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-lg shadow-yellow-400/20'
                      : 'border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200 bg-black/40'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                      activeTab === tab.key
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : 'bg-gray-800 text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                  {activeTab === tab.key && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <EmptyState
                message={
                  TAB_CONFIG.find((t) => t.key === activeTab)?.emptyMsg ?? 'No quests found.'
                }
              />
            )}
          </div>

          {/* Telemetry Stats Row */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="text-center bg-black/60 border border-gray-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400 font-mono">
                {countByStatus('upcoming')}
              </div>
              <div className="text-[11px] text-gray-500 font-mono mt-1">UPCOMING</div>
            </div>
            <div className="text-center bg-black/60 border border-gray-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">
                {countByStatus('ongoing')}
              </div>
              <div className="text-[11px] text-gray-500 font-mono mt-1">ACTIVE</div>
            </div>
            <div className="text-center bg-black/60 border border-gray-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-gray-400 font-mono">
                {countByStatus('completed')}
              </div>
              <div className="text-[11px] text-gray-500 font-mono mt-1">COMPLETED</div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-12" />

      <Footer />
    </div>
  );
}
