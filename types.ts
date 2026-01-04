
export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isVerified?: boolean;
  activityScore?: number;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
  image?: string;
  sublabel?: string;
  bio?: string;
  achievements?: string[];
  momentum?: number; // Votes par seconde
}

export type PollType = 'STANDARD' | 'PETITION' | 'BINARY' | 'AWARD';

export interface Poll {
  id: string;
  type: PollType;
  question: string;
  options: PollOption[];
  totalVotes: number;
  goal?: number;
  category?: string;
  expiresAt: string;
  competitionId?: string;
}

export interface Post {
  id: string;
  author: User;
  timestamp: string;
  content: string;
  image?: string;
  images?: string[];
  video?: string;
  poll?: Poll;
  link?: {
    url: string;
    title: string;
    description: string;
  };
  stats: {
    comments: string;
    reposts: string;
    likes: string;
  };
}

export interface Story {
  id: string;
  user: User;
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  banner: string;
  logo?: string;
  startDate: string;
  endDate: string;
  totalVotes: number;
  categories: {
    id: string;
    name: string;
    icon: string;
    pollId: string;
  }[];
}
