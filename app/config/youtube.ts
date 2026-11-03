/**
 * ============================================================================
 * TAG CLUB - YOUTUBE CLIPS & PLAYLIST CONFIGURATION
 * ============================================================================
 * 
 * All YouTube links, playlist IDs, and channel references can be customized
 * via environment variables (e.g. in `.env.local` or GitHub Actions Secrets/Vars).
 * 
 * 🎬 HOW TO HOOK UP YOUR YOUTUBE PLAYLIST:
 * 1. Create a playlist on YouTube (e.g. "TAG Club Official Highlights & Best Plays").
 * 2. Copy the Playlist ID from the URL:
 *    https://www.youtube.com/playlist?list=PLxxxxxxxxxxxxxxxx
 *    (the part after `list=`, e.g. `PL1234567890abcdef`)
 * 3. Add to your `.env.local` file (or repository secrets):
 *    NEXT_PUBLIC_YOUTUBE_CLIPS_PLAYLIST_ID=PLxxxxxxxxxxxxxxxx
 * 4. Done! The website will automatically link to and stream your YouTube playlist.
 * ============================================================================
 */

export const YOUTUBE_CONFIG = {
  // Main Clips & Highlights YouTube Playlist ID (e.g. PLxxxxxxxxxxxx)
  clipsPlaylistId:
    process.env.NEXT_PUBLIC_YOUTUBE_CLIPS_PLAYLIST_ID || 'PL_PLACEHOLDER_TAG_CLIPS',

  // Fallback / Spotlight video ID for "Play of the Week" (e.g. 11-char YouTube ID)
  featuredVideoId:
    process.env.NEXT_PUBLIC_YOUTUBE_FEATURED_VIDEO_ID || 'dQw4w9WgXcQ',

  // Official Club YouTube Channel link
  channelUrl:
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL || 'https://www.youtube.com/@TAGClubVIT',

  // Optional: YouTube Data API v3 key if you choose to enable automated playlist sync later
  apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '',
};

/**
 * Returns true if the configured playlist is still using the default placeholder ID.
 */
export function isPlaceholderPlaylist(): boolean {
  return (
    !YOUTUBE_CONFIG.clipsPlaylistId ||
    YOUTUBE_CONFIG.clipsPlaylistId.startsWith('PL_PLACEHOLDER')
  );
}

/**
 * Generates a clean, privacy-enhanced YouTube embed URL with optimal player params.
 */
export function getYouTubeEmbedUrl({
  videoId,
  playlistId,
  autoplay = true,
}: {
  videoId?: string;
  playlistId?: string;
  autoplay?: boolean;
}): string {
  const base = 'https://www.youtube-nocookie.com/embed';
  const autoParam = autoplay ? '1' : '0';

  if (playlistId) {
    return `${base}/videoseries?list=${encodeURIComponent(playlistId)}&autoplay=${autoParam}&rel=0&modestbranding=1`;
  }

  const id = videoId || YOUTUBE_CONFIG.featuredVideoId;
  return `${base}/${encodeURIComponent(id)}?autoplay=${autoParam}&rel=0&modestbranding=1`;
}

/**
 * Returns a high-res or high-quality YouTube thumbnail for a given video ID.
 */
export function getYouTubeThumbnailUrl(videoId?: string): string {
  const id = videoId || YOUTUBE_CONFIG.featuredVideoId;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/**
 * Returns the direct YouTube watch URL for a video or playlist.
 */
export function getYouTubeWatchUrl({
  videoId,
  playlistId,
}: {
  videoId?: string;
  playlistId?: string;
}): string {
  if (playlistId) {
    return `https://www.youtube.com/playlist?list=${encodeURIComponent(playlistId)}`;
  }
  const id = videoId || YOUTUBE_CONFIG.featuredVideoId;
  return `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
}

