export interface MemberStats {
  tech: number;
  gaming: number;
  management: number;
  mana: number;
}

export interface BoardMember {
  id: number;
  name: string;
  position: string;
  tagline?: string;
  avatar?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  specialization?: string;
  class: 'tech' | 'gaming' | 'management';
  level?: number;
  skills?: string[];
  favoriteGame?: string;
  stats?: MemberStats;
}

export interface Season {
  id: number;
  season: number;
  year: string;
  label: string;
  eraName: string;
  isCurrent: boolean;
  theme?: string;
  majorAchievement?: string;
  members: BoardMember[];
}

const DEFAULT_POSITIONS = [
  { position: 'Chairperson', role: 'Guild Master', avatar: '👑', class: 'management' as const, skills: ['Strategy', 'Leadership', 'Roadmap'], defaultGame: 'Elden Ring' },
  { position: 'Co-Chairperson', role: 'Second-in-Command', avatar: '⚔️', class: 'management' as const, skills: ['Operations', 'Execution', 'Crisis Mgmt'], defaultGame: 'Dark Souls III' },
  { position: 'Secretary', role: 'Record Keeper', avatar: '📜', class: 'management' as const, skills: ['Documentation', 'Guild Charters', 'Governance'], defaultGame: 'Civilization VI' },
  { position: 'Co-Secretary', role: 'Logistics Arbiter', avatar: '📋', class: 'management' as const, skills: ['Logistics', 'Scheduling', 'Resource Flow'], defaultGame: 'Factorio' },
  { position: 'Tech Head', role: 'Forge Master', avatar: '⚡', class: 'tech' as const, skills: ['Unity', 'Unreal Engine', 'C++', 'Next.js'], defaultGame: 'Cyberpunk 2077' },
  { position: 'Design Head', role: 'Vision Crafter', avatar: '🎨', class: 'tech' as const, skills: ['UI/UX', 'Blender', 'Figma', 'Pixel Art'], defaultGame: 'Hollow Knight' },
  { position: 'Management Head', role: 'Expedition Commander', avatar: '🏰', class: 'management' as const, skills: ['Team Ops', 'Event Budgets', 'Negotiation'], defaultGame: 'Age of Empires II' },
  { position: 'Events Head', role: 'Quest Master', avatar: '🗺️', class: 'management' as const, skills: ['Tournament Brackets', 'Stage Ops', 'Crowd Mgmt'], defaultGame: 'Super Smash Bros' },
  { position: 'ESports Head', role: 'Warlord', avatar: '🏆', class: 'gaming' as const, skills: ['FPS Meta', 'Team Scouting', 'Scrims', 'Coaching'], defaultGame: 'Valorant' },
  { position: 'PR & Outreach Head', role: 'Guild Herald', avatar: '📣', class: 'gaming' as const, skills: ['Brand Strategy', 'Sponsorships', 'Social Meta'], defaultGame: 'Apex Legends' },
];

function generateSeasonMembers(seasonNum: number, isCurrent: boolean): BoardMember[] {
  return DEFAULT_POSITIONS.map((def, idx) => ({
    id: idx + 1,
    position: def.position,
    name: isCurrent ? 'TBA' : `Alumni Officer #${seasonNum}-${idx + 1}`,
    tagline: isCurrent ? `${def.role} of the Active Guild` : `Former ${def.role} for Season ${seasonNum}`,
    avatar: def.avatar,
    class: def.class,
    specialization: def.skills[0],
    skills: def.skills,
    favoriteGame: def.defaultGame,
    level: isCurrent ? 42 : Math.max(10, 99 - (14 - seasonNum) * 6),
    stats: {
      tech: def.class === 'tech' ? 95 : 70,
      gaming: def.class === 'gaming' ? 96 : 75,
      management: def.class === 'management' ? 98 : 72,
      mana: 85 + (idx % 15),
    },
    socials: {
      linkedin: 'https://in.linkedin.com/company/tag-club-vit',
      github: def.class === 'tech' ? 'https://github.com' : undefined,
      instagram: 'https://www.instagram.com/tagclub.vit',
    },
  }));
}

export const seasons: Season[] = [
  {
    id: 1,
    season: 14,
    year: '2025-26',
    label: 'Season 14',
    eraName: 'The Quantum Nexus',
    isCurrent: true,
    majorAchievement: 'Spearheading unified collegiate esports leagues and autonomous AI game development jams.',
    members: [
      { id: 1, position: 'Chairperson', name: 'TBA', tagline: 'Leading the active guild into the new frontier', avatar: '👑', class: 'management', specialization: 'Strategic Vision', level: 99, skills: ['Strategy', 'Leadership', 'Club Governance'], favoriteGame: 'Elden Ring', stats: { tech: 88, gaming: 92, management: 99, mana: 95 } },
      { id: 2, position: 'Co-Chairperson', name: 'TBA', tagline: 'Second in command & tactical coordinator', avatar: '⚔️', class: 'management', specialization: 'Operations', level: 94, skills: ['Operations', 'Execution', 'Crisis Mgmt'], favoriteGame: 'Dark Souls III', stats: { tech: 82, gaming: 90, management: 96, mana: 90 } },
      { id: 3, position: 'Secretary', name: 'TBA', tagline: 'Keeper of guild charters & historical scrolls', avatar: '📜', class: 'management', specialization: 'Governance', level: 90, skills: ['Documentation', 'Guild Charters', 'Secretariat'], favoriteGame: 'Civilization VI', stats: { tech: 80, gaming: 84, management: 95, mana: 88 } },
      { id: 4, position: 'Co-Secretary', name: 'TBA', tagline: 'Guild operations & resource coordinator', avatar: '📋', class: 'management', specialization: 'Resource Flow', level: 88, skills: ['Logistics', 'Scheduling', 'Internal Comms'], favoriteGame: 'Factorio', stats: { tech: 78, gaming: 85, management: 92, mana: 85 } },
      { id: 5, position: 'Tech Head', name: 'TBA', tagline: 'Master of engines, tools & game dev', avatar: '⚡', class: 'tech', specialization: 'Game Engines', level: 98, skills: ['Unity 6', 'Unreal Engine 5', 'C++', 'Shaders'], favoriteGame: 'Cyberpunk 2077', stats: { tech: 99, gaming: 88, management: 76, mana: 96 } },
      { id: 6, position: 'Design Head', name: 'TBA', tagline: 'Crafter of pixel-perfect visuals & UI', avatar: '🎨', class: 'tech', specialization: 'Game UI/UX', level: 93, skills: ['Figma', 'Blender 4', 'Pixel Art', 'Motion Design'], favoriteGame: 'Hollow Knight', stats: { tech: 94, gaming: 85, management: 74, mana: 92 } },
      { id: 7, position: 'Management Head', name: 'TBA', tagline: 'Guild resource & expedition director', avatar: '🏰', class: 'management', specialization: 'Sponsorships', level: 91, skills: ['Team Ops', 'Budgeting', 'Negotiations'], favoriteGame: 'Age of Empires II', stats: { tech: 74, gaming: 82, management: 98, mana: 89 } },
      { id: 8, position: 'Events Head', name: 'TBA', tagline: 'Master of quests & tournament arenas', avatar: '🗺️', class: 'management', specialization: 'Live Productions', level: 95, skills: ['Tournament Ops', 'Broadcast Prod', 'Stage Control'], favoriteGame: 'Super Smash Bros', stats: { tech: 80, gaming: 94, management: 96, mana: 93 } },
      { id: 9, position: 'ESports Head', name: 'TBA', tagline: 'Commander of competitive divisions', avatar: '🏆', class: 'gaming', specialization: 'FPS Esports', level: 97, skills: ['Tactical FPS', 'Scouting', 'Meta Analysis', 'Scrims'], favoriteGame: 'Valorant', stats: { tech: 76, gaming: 99, management: 86, mana: 95 } },
      { id: 10, position: 'PR & Outreach Head', name: 'TBA', tagline: 'Voice of the guild across all realms', avatar: '📣', class: 'gaming', specialization: 'Media & Community', level: 92, skills: ['Viral Content', 'PR Strategy', 'Community Growth'], favoriteGame: 'Apex Legends', stats: { tech: 78, gaming: 94, management: 90, mana: 91 } },
    ]
  },
  {
    id: 2,
    season: 13,
    year: '2024-25',
    label: 'Season 13',
    eraName: 'The Hybrid Vanguard',
    isCurrent: false,
    majorAchievement: 'Organized VGL Riviera series with record 1,200+ participants across 4 titles.',
    members: generateSeasonMembers(13, false),
  },
  {
    id: 3,
    season: 12,
    year: '2023-24',
    label: 'Season 12',
    eraName: 'The Cyber Renaissance',
    isCurrent: false,
    majorAchievement: 'Pioneered collegiate Godot game jams and established national esports partnerships.',
    members: generateSeasonMembers(12, false),
  },
  {
    id: 4,
    season: 11,
    year: '2022-23',
    label: 'Season 11',
    eraName: 'The LAN Resurgence',
    isCurrent: false,
    majorAchievement: 'Brought back in-person LAN tournaments with custom spectator broadcasting systems.',
    members: generateSeasonMembers(11, false),
  },
  {
    id: 5,
    season: 10,
    year: '2021-22',
    label: 'Season 10',
    eraName: 'Decade of Dominance',
    isCurrent: false,
    majorAchievement: 'Celebrated 10 years of TAG Club with a 72-hour virtual game dev marathon.',
    members: generateSeasonMembers(10, false),
  },
  {
    id: 6,
    season: 9,
    year: '2020-21',
    label: 'Season 9',
    eraName: 'The Cloud Guild Era',
    isCurrent: false,
    majorAchievement: 'Transitioned club activities entirely to cloud servers and hosted online national cups.',
    members: generateSeasonMembers(9, false),
  },
  {
    id: 7,
    season: 8,
    year: '2019-20',
    label: 'Season 8',
    eraName: 'The Esports Awakening',
    isCurrent: false,
    majorAchievement: 'Formed the first official university Valorant and CS:GO competitive rosters.',
    members: generateSeasonMembers(8, false),
  },
  {
    id: 8,
    season: 7,
    year: '2018-19',
    label: 'Season 7',
    eraName: 'The Retro Revival',
    isCurrent: false,
    majorAchievement: 'Created custom arcade cabinets showcased across tech fests and exhibitions.',
    members: generateSeasonMembers(7, false),
  },
  {
    id: 9,
    season: 6,
    year: '2017-18',
    label: 'Season 6',
    eraName: 'The Indie Wave',
    isCurrent: false,
    majorAchievement: 'Published 4 student-made indie titles onto Steam and itch.io.',
    members: generateSeasonMembers(6, false),
  },
  {
    id: 10,
    season: 5,
    year: '2016-17',
    label: 'Season 5',
    eraName: 'The Forge Era',
    isCurrent: false,
    majorAchievement: 'Initiated the annual Game Development Bootcamp with 300+ trainees.',
    members: generateSeasonMembers(5, false),
  },
  {
    id: 11,
    season: 4,
    year: '2015-16',
    label: 'Season 4',
    eraName: 'The Golden Alpha',
    isCurrent: false,
    majorAchievement: 'Hosted the largest FIFA and DOTA 2 campus showdown in South India.',
    members: generateSeasonMembers(4, false),
  },
  {
    id: 12,
    season: 3,
    year: '2014-15',
    label: 'Season 3',
    eraName: 'The Expansion Protocol',
    isCurrent: false,
    majorAchievement: 'Formalized the 10 board structure and partnered with major hardware sponsors.',
    members: generateSeasonMembers(3, false),
  },
  {
    id: 13,
    season: 2,
    year: '2013-14',
    label: 'Season 2',
    eraName: 'The Foundation',
    isCurrent: false,
    majorAchievement: 'Established the official Technology and Gaming charters with university sanction.',
    members: generateSeasonMembers(2, false),
  },
  {
    id: 14,
    season: 1,
    year: '2012-13',
    label: 'Season 1',
    eraName: 'The Genesis',
    isCurrent: false,
    majorAchievement: 'The founding guild gathered in the tech labs — TAG Club VIT was born.',
    members: generateSeasonMembers(1, false),
  },
];
