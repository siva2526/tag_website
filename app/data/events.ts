export type EventStatus = 'upcoming' | 'ongoing' | 'completed';
export type EventCategory = 'Technology' | 'Gaming';

export interface Event {
  id: number | string;
  title: string;
  date: string;           // Display date e.g. "26 FEB", "TBA 2026", or "LIVE NOW"
  fullDate: string;       // Full date range e.g. "Feb 26 - Mar 1, 2026" or "Dates to be announced"
  description: string;
  category: EventCategory;
  link: string;           // Event page, registration URL, or Discord link
  status: EventStatus;    // Simply switch between: 'upcoming' | 'ongoing' | 'completed'
  xpReward?: string;      // e.g. "3,000 XP"
  difficulty?: string;    // e.g. "PRO" | "ADVANCED" | "TBA"
  featured?: boolean;     // Toggle true to highlight on the homepage (recommended: 3 events)
  isPlaceholder?: boolean;// Mark true for placeholder/TBA events (will be emptied in a later iteration)
}

/**
 * ============================================================================
 * TAG CLUB EVENTS REGISTRY & MAINTENANCE GUIDE
 * ============================================================================
 * 
 * 🎮 HOW TO MOVE AN EVENT (Status Transition):
 *    Change the `status` field to any of:
 *      • 'upcoming'  -> Displays under UPCOMING tab with blue badge
 *      • 'ongoing'   -> Displays under ACTIVE MISSIONS tab with pulsing green badge
 *      • 'completed' -> Displays under COMPLETED RAIDS tab with gray checkmark
 * 
 * ➕ HOW TO ADD A NEW EVENT:
 *    Copy `EVENT_TEMPLATE` below, fill in details, and add to the `events` array.
 * 
 * 🗑️ HOW TO DELETE OR CLEAR PLACEHOLDERS:
 *    When you are ready to empty the placeholder events, simply delete their
 *    entries from the array. The website automatically handles 0 events with a
 *    custom empty state and Discord CTA without breaking.
 * 
 * ⭐ HOMEPAGE FEATURED:
 *    Set `featured: true` to display on the homepage Quest Board.
 * ============================================================================
 */

export const EVENT_TEMPLATE: Event = {
  id: 'custom-event-id',
  title: 'Event Title',
  date: 'DD MMM',
  fullDate: 'Month DD - Month DD, YYYY',
  description: '1-2 sentence description of the event or tournament.',
  category: 'Gaming', // 'Technology' | 'Gaming'
  link: 'https://discord.com/invite/Y9cpqdvZE4',
  status: 'upcoming', // 'upcoming' | 'ongoing' | 'completed'
  xpReward: '3,000 XP',
  difficulty: 'ADVANCED',
  featured: false,
  isPlaceholder: false,
};

export const events: Event[] = [
  // ============================================================================
  // COMPLETED RAIDS (Official VGL Tournaments)
  // ============================================================================
  {
    id: 1,
    title: 'VGL x Valorant',
    date: '26 FEB',
    fullDate: 'Feb 26 - Mar 1, 2026',
    description: 'High-stakes FPS duels where pinpoint accuracy meets game-changing abilities. Outthink, outplay, and outlast in the ultimate tactical showdown.',
    category: 'Gaming',
    link: 'https://riviera.vit.ac.in/events/evt_93070e7af0ee4c2181cd9ba51c426144',
    status: 'completed',
    xpReward: '3,000 XP',
    difficulty: 'PRO',
    featured: true,
  },
  {
    id: 2,
    title: 'VGL x FIFA',
    date: '28 FEB',
    fullDate: 'Feb 28 - Mar 1, 2026',
    description: 'The beautiful game distilled to its tactical core. Surgical passing and footballing intelligence decide the winner.',
    category: 'Gaming',
    link: 'https://riviera.vit.ac.in/events/evt_acb34e94a74b4721b9a7bbade686ab71',
    status: 'completed',
    xpReward: '2,500 XP',
    difficulty: 'ADVANCED',
    featured: true,
  },
  {
    id: 3,
    title: 'VGL x BGMI',
    date: '21 FEB',
    fullDate: 'Feb 21, 2026',
    description: 'Battle royale intensity where every drop, loot, and firefight tells a story. Outlast the competition and become the last one standing.',
    category: 'Gaming',
    link: 'https://riviera.vit.ac.in/events/evt_7912e8d5958143f5bebb4d8455e84c37',
    status: 'completed',
    xpReward: '3,500 XP',
    difficulty: 'LEGENDARY',
    featured: true,
  },

  // ============================================================================
  // UPCOMING QUESTS (Placeholders — will become empty in a later iteration)
  // ============================================================================
  {
    id: 'placeholder-upcoming-1',
    title: '[Placeholder] Upcoming Quest #1: TBA',
    date: 'TBA 2026',
    fullDate: 'Dates To Be Announced',
    description: 'Placeholder slot for an upcoming game development hackathon or tech sprint. Final theme and schedules will be published once officially scheduled.',
    category: 'Technology',
    link: 'https://discord.com/invite/Y9cpqdvZE4',
    status: 'upcoming',
    xpReward: 'TBA',
    difficulty: 'TBA',
    featured: false,
    isPlaceholder: true,
  },
  {
    id: 'placeholder-upcoming-2',
    title: '[Placeholder] Upcoming Quest #2: TBA',
    date: 'TBA 2026',
    fullDate: 'Dates To Be Announced',
    description: 'Placeholder slot for the next campus esports showdown. Join the TAG Discord server to get pinged the instant registrations go live.',
    category: 'Gaming',
    link: 'https://discord.com/invite/Y9cpqdvZE4',
    status: 'upcoming',
    xpReward: 'TBA',
    difficulty: 'TBA',
    featured: false,
    isPlaceholder: true,
  },

  // ============================================================================
  // ACTIVE MISSIONS (Placeholders — will become empty in a later iteration)
  // ============================================================================
  {
    id: 'placeholder-ongoing-1',
    title: '[Placeholder] Active Mission: TBA',
    date: 'LIVE TBA',
    fullDate: 'No Active Mission Right Now',
    description: 'Placeholder slot for currently live tournaments and workshops. When a tournament is active, its live leaderboard and bracket links will be anchored here.',
    category: 'Technology',
    link: 'https://discord.com/invite/Y9cpqdvZE4',
    status: 'ongoing',
    xpReward: 'TBA',
    difficulty: 'TBA',
    featured: false,
    isPlaceholder: true,
  },
];
