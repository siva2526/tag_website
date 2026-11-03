'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBackground from '../components/PageBackground';
import { events, type Event, type EventStatus } from '../data/events';

type FilterTab = EventStatus | 'all';

const TAB_CONFIG: { key: FilterTab; label: string; icon: string; emptyMsg: string }[] = [
  { key: 'all', label: 'ALL QUESTS', icon: '📋', emptyMsg: 'No quests found.' },
  { key: 'upcoming', label: 'UPCOMING', icon: '🔮', emptyMsg: 'No upcoming quests available, adventurer.' },
  { key: 'ongoing', label: 'ACTIVE MISSIONS', icon: '⚔️', emptyMsg: 'No active missions. Check back soon!' },
  { key: 'completed', label: 'COMPLETED RAIDS', icon: '✅', emptyMsg: 'No completed raids yet.' },
];

function statusBadge(status: EventStatus) {
  switch (status) {
    case 'upcoming':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          UPCOMING
        </span>
      );
    case 'ongoing':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/40">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          ACTIVE
        </span>
      );
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full bg-gray-700/50 text-gray-400 border border-gray-700">
          <span>✓</span>
          COMPLETED
        </span>
      );
  }
}

function EventCard({ event }: { event: Event }) {
  const [isHovered, setIsHovered] = useState(false);
  const isTech = event.category === 'Technology';
  const accentColor = isTech ? 'yellow' : 'green';

  const handleClick = () => {
    if (event.link) window.open(event.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`relative bg-black/80 border-2 border-gray-800 rounded-xl p-6 transition-all duration-300 group cursor-pointer ${
        event.status === 'completed' ? 'opacity-80' : ''
      }`}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? `0 20px 40px rgba(${isTech ? '255,244,0' : '34,197,94'}, 0.12)`
          : '0 4px 12px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
    >
      {/* Animated Border */}
      <div className={`absolute inset-0 rounded-xl border-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} ${
        isTech ? 'border-yellow-400' : 'border-green-500'
      }`} />

      {/* Quest Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${
            isTech ? 'bg-yellow-400/20 border border-yellow-400/30' : 'bg-green-500/20 border border-green-500/30'
          } flex items-center justify-center`}>
            <span className={`text-xl ${isTech ? 'text-yellow-400' : 'text-green-500'}`}>
              {isTech ? '⚡' : '🎮'}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isTech
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                : 'bg-green-500/20 text-green-500 border border-green-500/30'
            }`}>
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
      <div className="space-y-2 mb-4">
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

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full transition-all duration-300 ${
            isTech
              ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
              : 'bg-gradient-to-r from-green-500 to-green-700'
          }`}
          style={{
            width: event.status === 'completed' ? '100%' : isHovered ? '75%' : '50%',
          }}
        />
      </div>

      {/* Click Indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs text-yellow-400">View quest →</span>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-4">🗺️</div>
      <h3 className="text-xl font-bold text-gray-500 mb-2 font-mono">NO QUESTS AVAILABLE</h3>
      <p className="text-gray-600 font-mono text-sm">{message}</p>
      <div className="mt-6 text-gray-700 text-xs font-mono animate-pulse">[ Check back later, adventurer ]</div>
    </div>
  );
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filteredEvents = activeTab === 'all'
    ? events
    : events.filter(e => e.status === activeTab);

  const countByStatus = (status: EventStatus) => events.filter(e => e.status === status).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white overflow-hidden font-mono">
      <PageBackground />
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-8 pb-4 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-600 font-mono mb-8">
            <Link href="/" className="hover:text-yellow-400 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-yellow-400">QUEST BOARD</span>
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              <span className="text-yellow-400 font-bold text-sm tracking-wider">QUEST_BOARD</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Guild <span className="text-yellow-400">Events</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Browse all quests, missions, and raids hosted by TAG Club VIT.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {TAB_CONFIG.map((tab) => {
              const count = tab.key === 'all' ? events.length : countByStatus(tab.key as EventStatus);
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 border-2 ${
                    activeTab === tab.key
                      ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-lg shadow-yellow-400/20'
                      : 'border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200 bg-black/40'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                    activeTab === tab.key
                      ? 'bg-yellow-400/20 text-yellow-400'
                      : 'bg-gray-800 text-gray-500'
                  }`}>
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
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <EmptyState message={TAB_CONFIG.find(t => t.key === activeTab)?.emptyMsg ?? 'No quests found.'} />
            )}
          </div>

          {/* Stats Row */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="text-center bg-black/60 border border-gray-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400 font-mono">{countByStatus('upcoming')}</div>
              <div className="text-xs text-gray-600">UPCOMING</div>
            </div>
            <div className="text-center bg-black/60 border border-gray-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">{countByStatus('ongoing')}</div>
              <div className="text-xs text-gray-600">ACTIVE</div>
            </div>
            <div className="text-center bg-black/60 border border-gray-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-gray-400 font-mono">{countByStatus('completed')}</div>
              <div className="text-xs text-gray-600">COMPLETED</div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-12" />

      <Footer />

      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        .bg-scanline {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 50%
          );
          background-size: 100% 4px;
          animation: scanline 8s linear infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
