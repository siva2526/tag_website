export type EventStatus = 'upcoming' | 'ongoing' | 'completed';
export type EventCategory = 'Technology' | 'Gaming';

export interface Event {
  id: number;
  title: string;
  date: string;           // Display date e.g. "26 FEB"
  fullDate: string;       // Full date range e.g. "Feb 26 - Mar 1, 2026"
  description: string;
  category: EventCategory;
  link: string;
  status: EventStatus;
  xpReward?: string;      // e.g. "2,500 XP"
  difficulty?: string;    // e.g. "ADVANCED"
  featured?: boolean;     // Show on home page
}

/**
 * Master event list for TAG Club.
 * To showcase an event on the home page, set `featured: true`.
 * To add or remove events, simply add/remove entries here.
 */
export const events: Event[] = [
  {
    id: 1,
    title: 'TAG Game Jam 2026',
    date: '15 MAR',
    fullDate: 'Mar 15 - Mar 17, 2026',
    description: '48 hours of rapid prototyping, caffeine-fueled creativity, and game engine mastery. Build a playable game from scratch around a surprise theme.',
    category: 'Technology',
    link: 'https://discord.com/invite/Y9cpqdvZE4',
    status: 'upcoming',
    xpReward: '5,000 XP',
    difficulty: 'EXPERT',
    featured: true,
  },
  {
    id: 2,
    title: 'Nexus LAN Championship',
    date: '28 MAR',
    fullDate: 'Mar 28 - Mar 29, 2026',
    description: 'Campus-wide LAN tournament featuring tactical shooters, sports games, and fighting games. Low latency, high energy, and pure adrenaline.',
    category: 'Gaming',
    link: 'https://discord.com/invite/Y9cpqdvZE4',
    status: 'upcoming',
    xpReward: '4,000 XP',
    difficulty: 'PRO',
    featured: false,
  },
  {
    id: 3,
    title: 'Guild Arena: AI Game Agent Challenge',
    date: '05 MAR',
    fullDate: 'Mar 5 - Mar 9, 2026',
    description: 'Design and train intelligent bots and pathfinding algorithms to battle in a custom multiplayer grid arena. Live leaderboard active now!',
    category: 'Technology',
    link: 'https://discord.com/invite/Y9cpqdvZE4',
    status: 'ongoing',
    xpReward: '4,500 XP',
    difficulty: 'ADVANCED',
    featured: true,
  },
  {
    id: 4,
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
    id: 5,
    title: 'VGL x FIFA',
    date: '28 FEB',
    fullDate: 'Feb 28 - Mar 1, 2026',
    description: 'The beautiful game distilled to its tactical core. Surgical passing and footballing intelligence decide the winner.',
    category: 'Gaming',
    link: 'https://riviera.vit.ac.in/events/evt_acb34e94a74b4721b9a7bbade686ab71',
    status: 'completed',
    xpReward: '2,500 XP',
    difficulty: 'ADVANCED',
    featured: false,
  },
  {
    id: 6,
    title: 'VGL x BGMI',
    date: '21 FEB',
    fullDate: 'Feb 21, 2026',
    description: 'Battle royale intensity where every drop, loot, and firefight tells a story. Outlast the competition and become the last one standing.',
    category: 'Gaming',
    link: 'https://riviera.vit.ac.in/events/evt_7912e8d5958143f5bebb4d8455e84c37',
    status: 'completed',
    xpReward: '3,500 XP',
    difficulty: 'LEGENDARY',
    featured: false,
  },
];
