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

export const seasons: Season[] = [
  {
    id: 1,
    season: 2026,
    year: '2026',
    label: 'Season 2026',
    eraName: 'Active Council',
    isCurrent: true,
    majorAchievement: 'Leading TAG Club as the premier technology, esports, and game dev powerhouse at VIT.',
    members: [
      { id: 1, position: 'Chairperson', name: 'Hriday Sharma', tagline: 'Leading the active guild into the new frontier', avatar: '👑', class: 'management', specialization: 'Guild Leadership', level: 99, skills: ['Strategy', 'Leadership', 'Roadmap'], favoriteGame: 'Elden Ring', stats: { tech: 88, gaming: 92, management: 99, mana: 95 } },
      { id: 2, position: 'Co-Chairperson', name: 'Sanjay Raj', tagline: 'Second in command & tactical coordinator', avatar: '⚔️', class: 'management', specialization: 'Operations', level: 94, skills: ['Operations', 'Execution', 'Crisis Mgmt'], favoriteGame: 'Dark Souls III', stats: { tech: 82, gaming: 90, management: 96, mana: 90 } },
      { id: 3, position: 'Secretary', name: 'Prateek', tagline: 'Keeper of guild charters & historical scrolls', avatar: '📜', class: 'management', specialization: 'Governance', level: 90, skills: ['Documentation', 'Guild Charters', 'Governance'], favoriteGame: 'Civilization VI', stats: { tech: 80, gaming: 84, management: 95, mana: 88 } },
      { id: 4, position: 'Co-Secretary', name: 'Chaitanya Ghogare', tagline: 'Guild operations & resource coordinator', avatar: '📋', class: 'management', specialization: 'Logistics', level: 88, skills: ['Logistics', 'Scheduling', 'Resource Flow'], favoriteGame: 'Factorio', stats: { tech: 78, gaming: 85, management: 92, mana: 85 } },
      { id: 5, position: 'Events Head', name: 'Piyush Mundra', tagline: 'Master of quests & tournament arenas', avatar: '🗺️', class: 'management', specialization: 'Live Productions', level: 95, skills: ['Tournament Brackets', 'Stage Ops', 'Crowd Mgmt'], favoriteGame: 'Super Smash Bros', stats: { tech: 80, gaming: 94, management: 96, mana: 93 } },
      { id: 6, position: 'Design Head', name: 'Aaditya Jaiswal', tagline: 'Crafter of pixel-perfect visuals & UI', avatar: '🎨', class: 'tech', specialization: 'Game UI/UX', level: 93, skills: ['UI/UX', 'Blender', 'Figma', 'Pixel Art'], favoriteGame: 'Hollow Knight', stats: { tech: 94, gaming: 85, management: 74, mana: 92 } },
      { id: 7, position: 'Esports Head', name: 'Niddhish Reddy', tagline: 'Commander of competitive divisions', avatar: '🏆', class: 'gaming', specialization: 'FPS Esports', level: 97, skills: ['FPS Meta', 'Team Scouting', 'Scrims', 'Coaching'], favoriteGame: 'Valorant', stats: { tech: 76, gaming: 99, management: 86, mana: 95 } },
      { id: 8, position: 'Tech Head', name: 'Sivaseelan Sa', tagline: 'Master of engines, tools & game dev', avatar: '⚡', class: 'tech', specialization: 'Game Engines & Systems', level: 98, skills: ['Unity', 'Unreal Engine', 'C++', 'Next.js'], favoriteGame: 'Cyberpunk 2077', stats: { tech: 99, gaming: 88, management: 76, mana: 96 } },
      { id: 9, position: 'PR and Outreach Head', name: 'Aujas Shahi', tagline: 'Voice of the guild across all realms', avatar: '📣', class: 'gaming', specialization: 'Media & Outreach', level: 92, skills: ['Brand Strategy', 'Sponsorships', 'Social Meta'], favoriteGame: 'Apex Legends', stats: { tech: 78, gaming: 94, management: 90, mana: 91 } },
      { id: 10, position: 'Management Head', name: 'Anuska Sen', tagline: 'Guild resource & expedition director', avatar: '🏰', class: 'management', specialization: 'Team Operations', level: 91, skills: ['Team Ops', 'Event Budgets', 'Negotiation'], favoriteGame: 'Age of Empires II', stats: { tech: 74, gaming: 82, management: 98, mana: 89 } },
    ]
  },
  {
    id: 2,
    season: 2025,
    year: '2025',
    label: 'Season 2025',
    eraName: 'Advisory Council',
    isCurrent: false,
    majorAchievement: 'Spearheaded inter-collegiate tournaments and mentored incoming guild generations.',
    members: [
      { id: 1, position: 'Chairperson', name: 'Cavin Allwyn Monis', tagline: 'Former Guild Master', avatar: '👑', class: 'management', specialization: 'Guild Leadership', level: 98, skills: ['Strategy', 'Leadership'], favoriteGame: 'Elden Ring', stats: { tech: 85, gaming: 90, management: 98, mana: 92 } },
      { id: 2, position: 'Co-Chairperson', name: 'Soham Patra', tagline: 'Former Second in Command', avatar: '⚔️', class: 'management', specialization: 'Operations', level: 94, skills: ['Operations', 'Execution'], favoriteGame: 'Dark Souls III', stats: { tech: 80, gaming: 88, management: 95, mana: 88 } },
      { id: 3, position: 'Secretary', name: 'Sanidhya', tagline: 'Former Record Keeper', avatar: '📜', class: 'management', specialization: 'Governance', level: 91, skills: ['Documentation', 'Secretariat'], favoriteGame: 'Civilization VI', stats: { tech: 78, gaming: 82, management: 94, mana: 86 } },
      { id: 4, position: 'Co-Secretary', name: 'Sivaram', tagline: 'Former Operations Coordinator', avatar: '📋', class: 'management', specialization: 'Logistics', level: 89, skills: ['Logistics', 'Scheduling'], favoriteGame: 'Factorio', stats: { tech: 76, gaming: 84, management: 91, mana: 84 } },
      { id: 5, position: 'Design Head', name: 'Aronnya Pal', tagline: 'Former Vision Crafter', avatar: '🎨', class: 'tech', specialization: 'Creative Direction', level: 93, skills: ['Figma', 'Blender', 'Visual Identity'], favoriteGame: 'Hollow Knight', stats: { tech: 95, gaming: 82, management: 75, mana: 90 } },
      { id: 6, position: 'Esports Head', name: 'Nidhish', tagline: 'Former Tournament Commander', avatar: '🏆', class: 'gaming', specialization: 'Esports Management', level: 96, skills: ['Tournament Ops', 'Team Scouting'], favoriteGame: 'Valorant', stats: { tech: 75, gaming: 98, management: 85, mana: 92 } },
      { id: 7, position: 'Tech Head', name: 'Jayden', tagline: 'Former Forge Master', avatar: '⚡', class: 'tech', specialization: 'Software & Tools', level: 96, skills: ['Full Stack', 'Game Systems', 'C++'], favoriteGame: 'Doom Eternal', stats: { tech: 98, gaming: 86, management: 75, mana: 94 } },
      { id: 8, position: 'PR Head', name: 'Sameer Shaw', tagline: 'Former Public Relations Lead', avatar: '📣', class: 'gaming', specialization: 'Public Relations', level: 90, skills: ['PR Strategy', 'Communications'], favoriteGame: 'Apex Legends', stats: { tech: 76, gaming: 92, management: 88, mana: 88 } },
      { id: 9, position: 'Outreach', name: 'Bharti', tagline: 'Former Outreach Coordinator', avatar: '🌐', class: 'gaming', specialization: 'Community Outreach', level: 89, skills: ['Sponsorships', 'Networking'], favoriteGame: 'Overwatch 2', stats: { tech: 74, gaming: 90, management: 89, mana: 87 } },
      { id: 10, position: 'Management Head', name: 'Saksham', tagline: 'Former Management Director', avatar: '🏰', class: 'management', specialization: 'Event Coordination', level: 92, skills: ['Event Ops', 'Team Management'], favoriteGame: 'Age of Empires II', stats: { tech: 72, gaming: 80, management: 96, mana: 88 } },
    ]
  },
  {
    id: 3,
    season: 2024,
    year: '2024',
    label: 'Season 2024',
    eraName: 'The Hybrid Vanguard',
    isCurrent: false,
    majorAchievement: 'Organized flagship VGL Riviera gaming championships with record campus participation.',
    members: [
      { id: 1, position: 'Chairperson', name: 'Naman Agarwal', tagline: 'Former Guild Master', avatar: '👑', class: 'management', specialization: 'Strategic Leadership', level: 97, skills: ['Leadership', 'Event Direction'], favoriteGame: 'Elden Ring', stats: { tech: 84, gaming: 88, management: 97, mana: 90 } },
      { id: 2, position: 'Co-Chairperson', name: 'Rushil Jaiswal', tagline: 'Former Second in Command', avatar: '⚔️', class: 'management', specialization: 'Execution', level: 93, skills: ['Operations', 'Team Leadership'], favoriteGame: 'Dark Souls', stats: { tech: 80, gaming: 86, management: 94, mana: 86 } },
      { id: 3, position: 'Secretary', name: 'Adikesavan Dhayalan', tagline: 'Former Record Keeper', avatar: '📜', class: 'management', specialization: 'Club Affairs', level: 90, skills: ['Secretariat', 'Documentation'], favoriteGame: 'Civilization', stats: { tech: 78, gaming: 80, management: 93, mana: 85 } },
      { id: 4, position: 'Co-Secretary', name: 'Vivek Patidar', tagline: 'Former Co-Secretary', avatar: '📋', class: 'management', specialization: 'Internal Ops', level: 88, skills: ['Logistics', 'Operations'], favoriteGame: 'SimCity', stats: { tech: 75, gaming: 82, management: 90, mana: 83 } },
      { id: 5, position: 'Design Head', name: 'Vineet Arora', tagline: 'Former Design Lead', avatar: '🎨', class: 'tech', specialization: 'Graphic Design', level: 92, skills: ['Photoshop', 'Illustrator', 'Figma'], favoriteGame: 'Ori and the Blind Forest', stats: { tech: 94, gaming: 80, management: 74, mana: 88 } },
      { id: 6, position: 'Events Head', name: 'Yash Raj', tagline: 'Former Quest Master', avatar: '🗺️', class: 'management', specialization: 'Campus Tournaments', level: 94, skills: ['Live Operations', 'Event Logistics'], favoriteGame: 'Super Smash Bros', stats: { tech: 78, gaming: 92, management: 95, mana: 91 } },
      { id: 7, position: 'Tech Head', name: 'Prithviraj S K', tagline: 'Former Forge Master', avatar: '⚡', class: 'tech', specialization: 'Systems & Web', level: 95, skills: ['Web Dev', 'Game Dev', 'Python'], favoriteGame: 'Witcher 3', stats: { tech: 97, gaming: 84, management: 74, mana: 92 } },
      { id: 8, position: 'PR Head', name: 'Kharinarayanan Ayengar', tagline: 'Former Public Relations Head', avatar: '📣', class: 'gaming', specialization: 'Media Campaigns', level: 90, skills: ['Content Strategy', 'PR'], favoriteGame: 'Valorant', stats: { tech: 75, gaming: 92, management: 87, mana: 86 } },
      { id: 9, position: 'Outreach Head', name: 'Rishi Mehta', tagline: 'Former Outreach Head', avatar: '🌐', class: 'gaming', specialization: 'External Relations', level: 90, skills: ['Outreach', 'Sponsorships'], favoriteGame: 'CS:GO', stats: { tech: 74, gaming: 91, management: 88, mana: 86 } },
      { id: 10, position: 'Management Head', name: 'Divij Bhambhani', tagline: 'Former Management Head', avatar: '🏰', class: 'management', specialization: 'Resource Allocation', level: 91, skills: ['Budgeting', 'Resource Planning'], favoriteGame: 'Total War', stats: { tech: 72, gaming: 78, management: 95, mana: 86 } },
    ]
  },
  {
    id: 4,
    season: 2022,
    year: '2022',
    label: 'Season 2022',
    eraName: 'The Esports Resurgence',
    isCurrent: false,
    majorAchievement: 'Revived massive in-person gaming conventions and expanded tech developer workshops.',
    members: [
      { id: 1, position: 'Chairperson', name: 'Ayush Saha', tagline: 'Former Guild Master', avatar: '👑', class: 'management', specialization: 'Guild Leadership', level: 96, skills: ['Leadership', 'Strategic Vision'], favoriteGame: 'Elden Ring', stats: { tech: 82, gaming: 88, management: 96, mana: 89 } },
      { id: 2, position: 'Co-Chairperson', name: 'Ayush Aggarwal', tagline: 'Former Second in Command', avatar: '⚔️', class: 'management', specialization: 'Club Operations', level: 92, skills: ['Operations', 'Planning'], favoriteGame: 'Dark Souls III', stats: { tech: 78, gaming: 86, management: 93, mana: 85 } },
      { id: 3, position: 'Secretary', name: 'Vinayak Aggarwal', tagline: 'Former Record Keeper', avatar: '📜', class: 'management', specialization: 'Governance', level: 89, skills: ['Governance', 'Documentation'], favoriteGame: 'Age of Empires', stats: { tech: 76, gaming: 80, management: 92, mana: 83 } },
      { id: 4, position: 'Co-Secretary', name: 'Kumar Krishav', tagline: 'Former Co-Secretary', avatar: '📋', class: 'management', specialization: 'Coordination', level: 87, skills: ['Coordination', 'Scheduling'], favoriteGame: 'SimCity', stats: { tech: 74, gaming: 81, management: 89, mana: 81 } },
      { id: 5, position: 'Design Head', name: 'Sreejith', tagline: 'Former Design Head', avatar: '🎨', class: 'tech', specialization: 'Brand Design', level: 91, skills: ['Visual Arts', 'UI Design'], favoriteGame: 'Journey', stats: { tech: 93, gaming: 78, management: 72, mana: 86 } },
      { id: 6, position: 'Creative Head', name: 'Manav Sharma', tagline: 'Former Creative Head', avatar: '✨', class: 'tech', specialization: 'Creative Concepts', level: 90, skills: ['Creative Direction', 'Storyboarding'], favoriteGame: 'Hades', stats: { tech: 91, gaming: 82, management: 74, mana: 87 } },
      { id: 7, position: 'Tech Head', name: 'Prakhar', tagline: 'Former Forge Master', avatar: '⚡', class: 'tech', specialization: 'Game Development', level: 94, skills: ['Unity Engine', 'C#', 'OpenGL'], favoriteGame: 'Cyberpunk 2077', stats: { tech: 96, gaming: 82, management: 72, mana: 90 } },
      { id: 8, position: 'PR Head', name: 'Shounak Banerjee', tagline: 'Former PR Lead', avatar: '📣', class: 'gaming', specialization: 'Communications', level: 89, skills: ['Public Relations', 'Social Media'], favoriteGame: 'Valorant', stats: { tech: 73, gaming: 90, management: 86, mana: 84 } },
      { id: 9, position: 'Events Head', name: 'Bhargav Chopra', tagline: 'Former Quest Master', avatar: '🗺️', class: 'management', specialization: 'Tournament Operations', level: 93, skills: ['Tournament Brackets', 'LAN Hosting'], favoriteGame: 'CS:GO', stats: { tech: 76, gaming: 92, management: 94, mana: 89 } },
      { id: 10, position: 'Management Head', name: 'Sanchit Ahlawat', tagline: 'Former Management Head', avatar: '🏰', class: 'management', specialization: 'Logistics', level: 90, skills: ['Logistics', 'Budgeting'], favoriteGame: 'Total War', stats: { tech: 71, gaming: 76, management: 94, mana: 84 } },
      { id: 11, position: 'Outreach Head', name: 'Surinder Singh Chhabra', tagline: 'Former Outreach Head', avatar: '🌐', class: 'gaming', specialization: 'Sponsorships', level: 89, skills: ['Partnerships', 'Outreach'], favoriteGame: 'FIFA', stats: { tech: 72, gaming: 89, management: 87, mana: 84 } },
    ]
  },
  {
    id: 5,
    season: 2021,
    year: '2021',
    label: 'Season 2021',
    eraName: 'The Cloud Guild Era',
    isCurrent: false,
    majorAchievement: 'Transitioned club operations online, running virtual LANs and cloud game dev hackathons.',
    members: [
      { id: 1, position: 'Chairperson', name: 'Vinayak Sharma', tagline: 'Former Guild Master', avatar: '👑', class: 'management', specialization: 'Digital Transition', level: 95, skills: ['Remote Leadership', 'Strategy'], favoriteGame: 'DOTA 2', stats: { tech: 80, gaming: 86, management: 95, mana: 88 } },
      { id: 2, position: 'Co-Chairperson', name: 'Saumitra Pathak', tagline: 'Former Second in Command', avatar: '⚔️', class: 'management', specialization: 'Operations', level: 91, skills: ['Coordination', 'Planning'], favoriteGame: 'CS:GO', stats: { tech: 77, gaming: 84, management: 92, mana: 84 } },
      { id: 3, position: 'Secretary', name: 'Atik Zaman', tagline: 'Former Record Keeper', avatar: '📜', class: 'management', specialization: 'Secretariat', level: 88, skills: ['Documentation', 'Affairs'], favoriteGame: 'Civilization V', stats: { tech: 75, gaming: 78, management: 91, mana: 82 } },
      { id: 4, position: 'PR Head', name: 'Yoshita Madamala', tagline: 'Former PR Head', avatar: '📣', class: 'gaming', specialization: 'Public Relations', level: 89, skills: ['Social Media', 'Content Creation'], favoriteGame: 'Overwatch', stats: { tech: 72, gaming: 89, management: 86, mana: 84 } },
      { id: 5, position: 'Finance Head', name: 'KV Ayushnav', tagline: 'Former Finance Head', avatar: '💰', class: 'management', specialization: 'Treasury & Budgets', level: 89, skills: ['Accounting', 'Sponsorships'], favoriteGame: 'Monopoly Plus', stats: { tech: 70, gaming: 75, management: 94, mana: 83 } },
      { id: 6, position: 'Technical Head', name: 'Saksham Dewan', tagline: 'Former Technical Head', avatar: '⚡', class: 'tech', specialization: 'Game Systems', level: 93, skills: ['Unity', 'Game Architecture'], favoriteGame: 'Portal 2', stats: { tech: 96, gaming: 81, management: 70, mana: 89 } },
      { id: 7, position: 'Design Head', name: 'Akash Joshi', tagline: 'Former Design Head', avatar: '🎨', class: 'tech', specialization: 'Graphic Arts', level: 90, skills: ['Illustrator', 'Motion Graphics'], favoriteGame: 'Celeste', stats: { tech: 92, gaming: 77, management: 71, mana: 85 } },
      { id: 8, position: 'Events Head', name: 'Shatayu Mittal', tagline: 'Former Events Head', avatar: '🗺️', class: 'management', specialization: 'Virtual Tournaments', level: 92, skills: ['Tournament Ops', 'Broadcasts'], favoriteGame: 'Valorant', stats: { tech: 75, gaming: 90, management: 93, mana: 87 } },
      { id: 9, position: 'Operations Head', name: 'Yoga Narsimha', tagline: 'Former Operations Head', avatar: '⚙️', class: 'management', specialization: 'Club Infrastructure', level: 89, skills: ['Discord Server Ops', 'Logistics'], favoriteGame: 'Factorio', stats: { tech: 76, gaming: 78, management: 91, mana: 83 } },
      { id: 10, position: 'Project Head', name: 'Aadarsh N Prasad', tagline: 'Former Project Head', avatar: '🚀', class: 'tech', specialization: 'Game Projects', level: 90, skills: ['Project Management', 'Dev Sprints'], favoriteGame: 'Minecraft', stats: { tech: 91, gaming: 79, management: 76, mana: 85 } },
      { id: 11, position: 'Technical Manager', name: 'Shambhavi Swarup', tagline: 'Former Tech Manager', avatar: '💻', class: 'tech', specialization: 'Web Development', level: 88, skills: ['HTML/CSS', 'JavaScript'], favoriteGame: 'Terraria', stats: { tech: 90, gaming: 75, management: 72, mana: 82 } },
      { id: 12, position: 'Design Manager', name: 'Chirag Deep Mandal', tagline: 'Former Design Manager', avatar: '🖌️', class: 'tech', specialization: 'Visual Assets', level: 87, skills: ['Photoshop', 'Posters'], favoriteGame: 'Limbo', stats: { tech: 89, gaming: 74, management: 70, mana: 81 } },
      { id: 13, position: 'Core Manager', name: 'Nishant Tiwari', tagline: 'Former Core Manager', avatar: '🛡️', class: 'management', specialization: 'Core Team Management', level: 88, skills: ['Core Operations', 'Volunteers'], favoriteGame: 'Age of Empires II', stats: { tech: 71, gaming: 76, management: 90, mana: 82 } },
    ]
  },
  {
    id: 6,
    season: 2020,
    year: '2020',
    label: 'Season 2020',
    eraName: 'The Digital Frontier',
    isCurrent: false,
    majorAchievement: 'Maintained strong gaming community bonds during quarantine through weekly esports leagues.',
    members: [
      { id: 1, position: 'Chairperson', name: 'Swattik', tagline: 'Former Guild Master', avatar: '👑', class: 'management', specialization: 'Guild Leadership', level: 94, skills: ['Leadership', 'Vision'], favoriteGame: 'DOTA 2', stats: { tech: 79, gaming: 85, management: 94, mana: 86 } },
      { id: 2, position: 'Co-Chairperson', name: 'Kisore', tagline: 'Former Second in Command', avatar: '⚔️', class: 'management', specialization: 'Operations', level: 90, skills: ['Operations', 'Coordination'], favoriteGame: 'CS:GO', stats: { tech: 76, gaming: 83, management: 91, mana: 83 } },
      { id: 3, position: 'Events Head', name: 'Varyan', tagline: 'Former Events Head', avatar: '🗺️', class: 'management', specialization: 'Online Tournaments', level: 91, skills: ['Tournament Hosting', 'Streaming'], favoriteGame: 'PUBG', stats: { tech: 74, gaming: 89, management: 92, mana: 85 } },
      { id: 4, position: 'Secretary', name: 'Shivang', tagline: 'Former Record Keeper', avatar: '📜', class: 'management', specialization: 'Secretariat', level: 87, skills: ['Documentation', 'Affairs'], favoriteGame: 'Civilization', stats: { tech: 74, gaming: 76, management: 90, mana: 81 } },
      { id: 5, position: 'Tech Head', name: 'Vineet', tagline: 'Former Forge Master', avatar: '⚡', class: 'tech', specialization: 'Game Development', level: 93, skills: ['Unity', 'C#', 'Game Physics'], favoriteGame: 'Half-Life 2', stats: { tech: 95, gaming: 80, management: 69, mana: 88 } },
      { id: 6, position: 'PR Head', name: 'Ishaan', tagline: 'Former PR Head', avatar: '📣', class: 'gaming', specialization: 'Public Relations', level: 88, skills: ['Social Campaigns', 'Promotion'], favoriteGame: 'FIFA', stats: { tech: 71, gaming: 88, management: 85, mana: 83 } },
      { id: 7, position: 'Operations Head', name: 'Advit', tagline: 'Former Operations Head', avatar: '⚙️', class: 'management', specialization: 'Logistics', level: 88, skills: ['Club Logistics', 'Management'], favoriteGame: 'SimCity', stats: { tech: 74, gaming: 76, management: 90, mana: 82 } },
      { id: 8, position: 'Design Head', name: 'Aishika', tagline: 'Former Design Head', avatar: '🎨', class: 'tech', specialization: 'Art & Design', level: 90, skills: ['Illustrations', 'Design Layouts'], favoriteGame: 'Gris', stats: { tech: 91, gaming: 75, management: 70, mana: 84 } },
      { id: 9, position: 'Projects Head', name: 'Spandan', tagline: 'Former Projects Head', avatar: '🚀', class: 'tech', specialization: 'Technical Projects', level: 89, skills: ['Project Planning', 'Development'], favoriteGame: 'Kerbal Space Program', stats: { tech: 90, gaming: 78, management: 74, mana: 84 } },
      { id: 10, position: 'Finance Manager', name: 'Lakshit', tagline: 'Former Finance Manager', avatar: '📊', class: 'management', specialization: 'Financial Accounting', level: 86, skills: ['Budgets', 'Auditing'], favoriteGame: 'Monopoly', stats: { tech: 69, gaming: 73, management: 89, mana: 80 } },
      { id: 11, position: 'Finance Head', name: 'Pranav', tagline: 'Former Finance Head', avatar: '💰', class: 'management', specialization: 'Treasury', level: 88, skills: ['Treasury Management', 'Sponsors'], favoriteGame: 'Civilization VI', stats: { tech: 70, gaming: 74, management: 92, mana: 82 } },
      { id: 12, position: 'Tech Manager', name: 'Sankalp', tagline: 'Former Tech Manager', avatar: '💻', class: 'tech', specialization: 'Infrastructure', level: 87, skills: ['Web Platforms', 'Servers'], favoriteGame: 'Minecraft', stats: { tech: 89, gaming: 74, management: 70, mana: 81 } },
      { id: 13, position: 'Tech Manager', name: 'Nihar', tagline: 'Former Tech Manager', avatar: '🔧', class: 'tech', specialization: 'Tools & Scripts', level: 87, skills: ['Automation', 'Software Tools'], favoriteGame: 'Factorio', stats: { tech: 89, gaming: 75, management: 70, mana: 81 } },
    ]
  },
  {
    id: 7,
    season: 2019,
    year: '2019',
    label: 'Season 2019',
    eraName: 'The Foundation Era',
    isCurrent: false,
    majorAchievement: 'Pioneered custom campus LAN tournaments and interactive game dev showcases.',
    members: [
      { id: 1, position: 'Chairperson', name: 'Ritwik', tagline: 'Former Guild Master', avatar: '👑', class: 'management', specialization: 'Guild Founding & Direction', level: 93, skills: ['Leadership', 'Club Foundation'], favoriteGame: 'DOTA 2', stats: { tech: 78, gaming: 84, management: 93, mana: 85 } },
      { id: 2, position: 'Co-Chairperson', name: 'Shashwat', tagline: 'Former Second in Command', avatar: '⚔️', class: 'management', specialization: 'Campus Operations', level: 89, skills: ['Operations', 'Team Management'], favoriteGame: 'CS:GO', stats: { tech: 75, gaming: 82, management: 90, mana: 82 } },
      { id: 3, position: 'Secretary', name: 'Arijeet', tagline: 'Former Record Keeper', avatar: '📜', class: 'management', specialization: 'Charters & Documentation', level: 86, skills: ['Documentation', 'Affairs'], favoriteGame: 'Age of Empires II', stats: { tech: 73, gaming: 75, management: 89, mana: 80 } },
      { id: 4, position: 'Tech Head', name: 'Saumya', tagline: 'Former Forge Master', avatar: '⚡', class: 'tech', specialization: 'Game Development Bootcamps', level: 92, skills: ['Game Engines', 'C++', 'Java'], favoriteGame: 'Half-Life', stats: { tech: 94, gaming: 79, management: 68, mana: 86 } },
      { id: 5, position: 'PR Head', name: 'Yashvardhan', tagline: 'Former PR Head', avatar: '📣', class: 'gaming', specialization: 'Publicity & Campus Reach', level: 87, skills: ['Publicity', 'Campaigns'], favoriteGame: 'FIFA', stats: { tech: 70, gaming: 87, management: 84, mana: 81 } },
      { id: 6, position: 'Operations Head', name: 'Sarthak', tagline: 'Former Operations Head', avatar: '⚙️', class: 'management', specialization: 'LAN & Stage Setup', level: 87, skills: ['Hardware Setup', 'Event Logistics'], favoriteGame: 'Command & Conquer', stats: { tech: 73, gaming: 75, management: 89, mana: 81 } },
      { id: 7, position: 'Projects Head', name: 'Tanmay', tagline: 'Former Projects Head', avatar: '🚀', class: 'tech', specialization: 'Community Dev Projects', level: 88, skills: ['Software Dev', 'Mentorship'], favoriteGame: 'Quake', stats: { tech: 89, gaming: 77, management: 72, mana: 82 } },
      { id: 8, position: 'Design Head', name: 'Harika', tagline: 'Former Design Head', avatar: '🎨', class: 'tech', specialization: 'Creative & Poster Art', level: 89, skills: ['Graphic Design', 'Branding'], favoriteGame: 'Transistor', stats: { tech: 90, gaming: 74, management: 69, mana: 83 } },
      { id: 9, position: 'Events Head', name: 'Shivaum', tagline: 'Former Events Head', avatar: '🗺️', class: 'management', specialization: 'Campus Gaming Fests', level: 90, skills: ['Gaming Events', 'Stage Coordination'], favoriteGame: 'Tekken 7', stats: { tech: 73, gaming: 88, management: 91, mana: 84 } },
      { id: 10, position: 'Finance Head', name: 'Abhishek', tagline: 'Former Finance Head', avatar: '💰', class: 'management', specialization: 'Sponsorships & Accounts', level: 87, skills: ['Financial Planning', 'Budgets'], favoriteGame: 'SimCity 4', stats: { tech: 68, gaming: 72, management: 90, mana: 80 } },
      { id: 11, position: 'Tech Mentor', name: 'Girish', tagline: 'Former Technical Advisor', avatar: '🧙‍♂️', class: 'tech', specialization: 'Game Dev Guidance', level: 95, skills: ['Architecture', 'Mentorship'], favoriteGame: 'Deus Ex', stats: { tech: 96, gaming: 82, management: 78, mana: 92 } },
      { id: 12, position: 'Core Mentor', name: 'Chinmay', tagline: 'Former Core Advisor', avatar: '🛡️', class: 'management', specialization: 'Club Governance & Heritage', level: 95, skills: ['Leadership Mentoring', 'Club History'], favoriteGame: 'StarCraft II', stats: { tech: 79, gaming: 85, management: 96, mana: 92 } },
    ]
  },
];
