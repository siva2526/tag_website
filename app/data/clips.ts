export type ClipCategory = 'clutch' | 'ace' | 'tournament' | 'highlight' | 'funny';

export interface Clip {
  id: string;
  title: string;
  player: string;
  playerTitle: string;
  playerAvatar?: string;
  game: string;
  gameIcon?: string;
  category: ClipCategory;
  duration: string;
  date: string;
  views: string;
  likes: number;
  videoEmbedUrl?: string; // YouTube embed / Twitch clip URL
  thumbnailGradient: string; // Dynamic cyberpunk gradient placeholder
  tags: string[];
  featured?: boolean;
  description: string;
  tournamentName?: string;
}

export const CLIPS: Clip[] = [
  {
    id: 'clip-1',
    title: '1v4 Improbable Retake - VGL Grand Finals',
    player: 'PhantomX',
    playerTitle: 'TAG Vanguard Duelist',
    playerAvatar: '🎯',
    game: 'Valorant',
    gameIcon: '🎯',
    category: 'clutch',
    duration: '0:48',
    date: 'FEB 2026',
    views: '2.4K',
    likes: 342,
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', // Placeholder embed
    thumbnailGradient: 'from-rose-900/60 via-purple-950/80 to-black',
    tags: ['Valorant', 'Clutch', 'Ascent', '1v4', 'VGL Finals'],
    featured: true,
    tournamentName: 'VGL Riviera 2026',
    description: '1 HP and a dream. Pinpoint crosshair placement and utility usage turned an unwinnable round into the tournament championship point.',
  },
  {
    id: 'clip-2',
    title: 'Clean 5K Sheriff Ace on Eco Round',
    player: 'Vortex_99',
    playerTitle: 'Sharpshooter Elite',
    playerAvatar: '⚡',
    game: 'Valorant',
    gameIcon: '🎯',
    category: 'ace',
    duration: '0:32',
    date: 'FEB 2026',
    views: '1.8K',
    likes: 218,
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailGradient: 'from-amber-900/60 via-stone-950/80 to-black',
    tags: ['Valorant', 'Sheriff', 'Ace', 'Eco'],
    featured: false,
    description: 'No armor, five bullets, zero hesitation. Five consecutive headshots to completely flip the opponent economy.',
  },
  {
    id: 'clip-3',
    title: 'Final Circle 1v3 Solo Wipe for Chicken Dinner',
    player: 'WraithHunter',
    playerTitle: 'Survival Tactician',
    playerAvatar: '🪖',
    game: 'BGMI',
    gameIcon: '💥',
    category: 'clutch',
    duration: '1:12',
    date: 'FEB 2026',
    views: '3.1K',
    likes: 405,
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailGradient: 'from-emerald-950/70 via-gray-950/80 to-black',
    tags: ['BGMI', 'Solo-Squad', 'Zone 7', 'Dinner'],
    featured: false,
    tournamentName: 'TAG Battlegrounds Cup',
    description: 'Patience in the grass and a laser spray transfer when the smoke dissipated. 1v3 victory in the final circle.',
  },
  {
    id: 'clip-4',
    title: 'Double Tap Flip Reset Goal in Overtime (+3:15)',
    player: 'AeroGlide',
    playerTitle: 'Aerial Wizard',
    playerAvatar: '🚀',
    game: 'Rocket League',
    gameIcon: '🚗',
    category: 'highlight',
    duration: '0:24',
    date: 'JAN 2026',
    views: '1.2K',
    likes: 189,
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailGradient: 'from-blue-950/70 via-indigo-950/80 to-black',
    tags: ['Rocket League', 'Flip Reset', 'Overtime', 'Double Tap'],
    featured: false,
    description: 'Ceiling drop into an aerial flip reset backboard double tap to seal the sudden-death overtime match.',
  },
  {
    id: 'clip-5',
    title: '90th Minute Scorpion Kick Winner - FIFA League',
    player: 'StrikerSam',
    playerTitle: 'Virtual Maestro',
    playerAvatar: '⚽',
    game: 'FIFA',
    gameIcon: '⚽',
    category: 'highlight',
    duration: '0:35',
    date: 'JAN 2026',
    views: '980',
    likes: 142,
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailGradient: 'from-teal-950/70 via-black to-black',
    tags: ['FIFA', 'Puskas', 'Scorpion Kick', '90th Min'],
    featured: false,
    tournamentName: 'VGL FIFA Campus Open',
    description: 'Outrageous first-time cross converted via an acrobatic scorpion kick in the 93rd minute of injury time.',
  },
  {
    id: 'clip-6',
    title: 'When Smoke Grenades Betray Your Entire Squad',
    player: 'OopsAllNades',
    playerTitle: 'Guild Jester',
    playerAvatar: '🤡',
    game: 'Counter-Strike 2',
    gameIcon: '💣',
    category: 'funny',
    duration: '0:28',
    date: 'FEB 2026',
    views: '4.5K',
    likes: 670,
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailGradient: 'from-yellow-950/60 via-stone-950 to-black',
    tags: ['CS2', 'Fail', 'Smoke', 'Friendly Fire'],
    featured: false,
    description: 'A miscalculated bounce resulted in four flashed teammates and a rogue grenade that wiped the squad before the bomb planted.',
  },
  {
    id: 'clip-7',
    title: 'Perfect Parry into Rage Art Comeback (1% HP)',
    player: 'IronFist',
    playerTitle: 'Fighting Guild Veteran',
    playerAvatar: '🥋',
    game: 'Tekken 8',
    gameIcon: '🥊',
    category: 'clutch',
    duration: '0:40',
    date: 'FEB 2026',
    views: '1.6K',
    likes: 275,
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailGradient: 'from-red-950/70 via-zinc-950 to-black',
    tags: ['Tekken 8', 'Low HP', 'Rage Art', 'Parry'],
    featured: false,
    description: 'Frame-perfect low parry followed by a maximum damage combo and Rage Art finish in tournament Top 8.',
  },
];

export const CLIP_GAMES = ['All', 'Valorant', 'BGMI', 'Counter-Strike 2', 'Rocket League', 'FIFA', 'Tekken 8'];
