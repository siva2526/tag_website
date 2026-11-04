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
  duration: string;        // Display only, e.g. "0:48" or "TBA"
  date: string;            // Display only, e.g. "FEB 2026"
  views: string;           // Display only, e.g. "2.4K" (update manually or via API later)
  likes: number;           // In-session upvote starting value
  /**
   * YouTube video ID (11 characters, e.g. "dQw4w9WgXcQ")
   * Leave undefined to show a placeholder state when the clip isn't on YouTube yet.
   * The getYouTubeEmbedUrl() util in app/config/youtube.ts generates the full embed URL.
   */
  youtubeVideoId?: string;
  thumbnailGradient: string; // Cyberpunk gradient fallback when thumbnail image unavailable
  tags: string[];
  featured?: boolean;        // Pin to "Play of the Week" spotlight banner
  isPlaceholder?: boolean;   // True when the clip slot is reserved but video isn't uploaded yet
  description: string;
  tournamentName?: string;
}

/**
 * ============================================================================
 * TAG CLUB CLIPS REGISTRY — MAINTENANCE GUIDE
 * ============================================================================
 *
 * ➕ ADDING A CLIP:
 *    1. Upload the video to YouTube (or the TAG Club channel).
 *    2. Copy the 11-char video ID from the URL:
 *       https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  youtubeVideoId: 'dQw4w9WgXcQ'
 *    3. Paste it into a new entry below and set isPlaceholder: false.
 *    4. Set featured: true on the clip you want to spotlight in the hero banner.
 *
 * 🗑️ REMOVING A CLIP:
 *    Delete the entry. The page handles an empty array gracefully.
 *
 * 🎬 PLAYLISTS:
 *    Set NEXT_PUBLIC_YOUTUBE_CLIPS_PLAYLIST_ID in .env.local to embed the
 *    full YouTube playlist directly on the page.
 *    See app/config/youtube.ts for all available env vars.
 * ============================================================================
 */

export const CLIPS: Clip[] = [
  // ============================================================================
  // PLACEHOLDER CLIPS — swap youtubeVideoId when the video is uploaded
  // ============================================================================
  {
    id: 'clip-vgl-valorant-1',
    title: '[Placeholder] Best VGL x Valorant Clutch: TBA',
    player: 'TBA',
    playerTitle: 'TAG Club Member',
    playerAvatar: '🎯',
    game: 'Valorant',
    gameIcon: '🎯',
    category: 'clutch',
    duration: 'TBA',
    date: 'FEB 2026',
    views: 'TBA',
    likes: 0,
    youtubeVideoId: 'E4WlUXrJgy4', // ← placeholder video ID
    thumbnailGradient: 'from-rose-900/60 via-purple-950/80 to-black',
    tags: ['Valorant', 'VGL', 'Clutch', 'Riviera 2026'],
    featured: true,
    isPlaceholder: true,
    tournamentName: 'VGL Riviera 2026',
    description: 'Slot reserved for the best clutch play from the VGL x Valorant tournament at Riviera 2026. Video will be linked once uploaded to the TAG Club YouTube channel.',
  },
  {
    id: 'clip-vgl-bgmi-1',
    title: '[Placeholder] Highlight Reel — VGL x BGMI: TBA',
    player: 'TBA',
    playerTitle: 'TAG Club Member',
    playerAvatar: '🪖',
    game: 'BGMI',
    gameIcon: '💥',
    category: 'highlight',
    duration: 'TBA',
    date: 'FEB 2026',
    views: 'TBA',
    likes: 0,
    youtubeVideoId: 'E4WlUXrJgy4', // ← placeholder video ID
    thumbnailGradient: 'from-emerald-950/70 via-gray-950/80 to-black',
    tags: ['BGMI', 'VGL', 'Highlight', 'Battle Royale'],
    featured: false,
    isPlaceholder: true,
    tournamentName: 'VGL Riviera 2026',
    description: 'Slot reserved for the BGMI tournament highlights from Riviera 2026. Will be replaced with the actual YouTube clip once the video is processed and uploaded.',
  },
  {
    id: 'clip-vgl-fifa-1',
    title: '[Placeholder] Match Highlight — VGL x FIFA: TBA',
    player: 'TBA',
    playerTitle: 'TAG Club Member',
    playerAvatar: '⚽',
    game: 'FIFA',
    gameIcon: '⚽',
    category: 'highlight',
    duration: 'TBA',
    date: 'FEB 2026',
    views: 'TBA',
    likes: 0,
    youtubeVideoId: 'E4WlUXrJgy4', // ← placeholder video ID
    thumbnailGradient: 'from-teal-950/70 via-black to-black',
    tags: ['FIFA', 'VGL', 'Highlight', 'Campus Open'],
    featured: false,
    isPlaceholder: true,
    tournamentName: 'VGL FIFA Campus Open',
    description: 'Slot reserved for a standout match highlight from the VGL x FIFA tournament. Link the uploaded YouTube video by setting the youtubeVideoId field in app/data/clips.ts.',
  },
];

export const CLIP_GAMES = ['All', 'Valorant', 'BGMI', 'FIFA', 'Counter-Strike 2', 'Tekken 8', 'Rocket League'];
