export interface BoardMember {
  id: number;
  name: string;
  position: string;
  tagline?: string;       // Short bio/quote
  avatar?: string;        // emoji or image path
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  specialization?: string; // e.g. "Game Dev", "Esports"
  class?: 'tech' | 'gaming' | 'management'; // RPG class type
}

export interface Season {
  id: number;
  season: number;         // Season number e.g. 14
  year: string;           // e.g. "2025-26"
  label: string;          // e.g. "Season 14"
  isCurrent: boolean;
  members: BoardMember[];
}

/**
 * 10 default board positions per roster:
 * 1. Chairperson
 * 2. Co-Chairperson
 * 3. Secretary
 * 4. Co-Secretary
 * 5. Tech Head
 * 6. Design Head
 * 7. Management Head
 * 8. Events Head
 * 9. ESports Head
 * 10. PR & Outreach Head
 */
export const seasons: Season[] = [
  {
    id: 1,
    season: 14,
    year: '2025-26',
    label: 'Season 14',
    isCurrent: true,
    members: [
      { id: 1, position: 'Chairperson', name: 'TBA', tagline: 'Leading the guild into the new frontier', avatar: '👑', class: 'management' },
      { id: 2, position: 'Co-Chairperson', name: 'TBA', tagline: 'Second in command & strategic executor', avatar: '⚔️', class: 'management' },
      { id: 3, position: 'Secretary', name: 'TBA', tagline: 'Keeper of guild charters & records', avatar: '📜', class: 'management' },
      { id: 4, position: 'Co-Secretary', name: 'TBA', tagline: 'Guild operations coordinator', avatar: '📋', class: 'management' },
      { id: 5, position: 'Tech Head', name: 'TBA', tagline: 'Master of engines, tools & game dev', avatar: '⚡', class: 'tech' },
      { id: 6, position: 'Design Head', name: 'TBA', tagline: 'Crafter of pixel-perfect visuals & UI', avatar: '🎨', class: 'tech' },
      { id: 7, position: 'Management Head', name: 'TBA', tagline: 'Guild resource & expedition director', avatar: '🏰', class: 'management' },
      { id: 8, position: 'Events Head', name: 'TBA', tagline: 'Master of quests & tournament arenas', avatar: '🗺️', class: 'management' },
      { id: 9, position: 'ESports Head', name: 'TBA', tagline: 'Commander of competitive divisions', avatar: '🏆', class: 'gaming' },
      { id: 10, position: 'PR & Outreach Head', name: 'TBA', tagline: 'Voice of the guild across all realms', avatar: '📣', class: 'gaming' },
    ]
  },
  {
    id: 2,
    season: 13,
    year: '2024-25',
    label: 'Season 13',
    isCurrent: false,
    members: [
      { id: 1, position: 'Chairperson', name: 'TBA', tagline: 'Former guild master', avatar: '👑', class: 'management' },
      { id: 2, position: 'Co-Chairperson', name: 'TBA', tagline: 'Former second in command', avatar: '⚔️', class: 'management' },
      { id: 3, position: 'Secretary', name: 'TBA', tagline: 'Former keeper of records', avatar: '📜', class: 'management' },
      { id: 4, position: 'Co-Secretary', name: 'TBA', tagline: 'Former operations coordinator', avatar: '📋', class: 'management' },
      { id: 5, position: 'Tech Head', name: 'TBA', tagline: 'Former forge master', avatar: '⚡', class: 'tech' },
      { id: 6, position: 'Design Head', name: 'TBA', tagline: 'Former vision crafter', avatar: '🎨', class: 'tech' },
      { id: 7, position: 'Management Head', name: 'TBA', tagline: 'Former operations lead', avatar: '🏰', class: 'management' },
      { id: 8, position: 'Events Head', name: 'TBA', tagline: 'Former quest master', avatar: '🗺️', class: 'management' },
      { id: 9, position: 'ESports Head', name: 'TBA', tagline: 'Former champion commander', avatar: '🏆', class: 'gaming' },
      { id: 10, position: 'PR & Outreach Head', name: 'TBA', tagline: 'Former guild voice', avatar: '📣', class: 'gaming' },
    ]
  },
  {
    id: 3,
    season: 12,
    year: '2023-24',
    label: 'Season 12',
    isCurrent: false,
    members: [
      { id: 1, position: 'Chairperson', name: 'TBA', tagline: 'Pioneer of the 12th iteration', avatar: '👑', class: 'management' },
      { id: 2, position: 'Co-Chairperson', name: 'TBA', tagline: 'Tactical veteran', avatar: '⚔️', class: 'management' },
      { id: 3, position: 'Secretary', name: 'TBA', tagline: 'Charter archivist', avatar: '📜', class: 'management' },
      { id: 4, position: 'Co-Secretary', name: 'TBA', tagline: 'Operations assistant', avatar: '📋', class: 'management' },
      { id: 5, position: 'Tech Head', name: 'TBA', tagline: 'Foundational systems architect', avatar: '⚡', class: 'tech' },
      { id: 6, position: 'Design Head', name: 'TBA', tagline: 'Brand & concept designer', avatar: '🎨', class: 'tech' },
      { id: 7, position: 'Management Head', name: 'TBA', tagline: 'Expedition coordinator', avatar: '🏰', class: 'management' },
      { id: 8, position: 'Events Head', name: 'TBA', tagline: 'Tournament organizer', avatar: '🗺️', class: 'management' },
      { id: 9, position: 'ESports Head', name: 'TBA', tagline: 'Division founder', avatar: '🏆', class: 'gaming' },
      { id: 10, position: 'PR & Outreach Head', name: 'TBA', tagline: 'Outreach specialist', avatar: '📣', class: 'gaming' },
    ]
  }
];
