
export interface ReputationEvent {
  id: string;
  timestamp: string;
  delta: number;
  reason: string;
  type: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  bannerStyle?: string;
  bannerColor?: string;
  isVerified?: boolean;
  areMetricsPublic?: boolean;
  activityScore: number;
  reputationScore?: number;
  birthDate?: string;
  birthPlace?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  repostsCount: number;
  likesReceived: number;
  commentsReceived: number;
  commentsMade: number;
  reportsCount: number;
  reputationMetrics?: {
    sentimentIndex: number;
    trustFactor: number;
    engagementQuality: number;
    ledger: ReputationEvent[];
  };
  hasPendingMessageFromMe?: boolean; 
  profileStyle?: {
    bannerGradient?: string;
    bannerColor?: string;
  };
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
  image?: string;
  sublabel?: string;
  bio?: string;
  achievements?: string[];
  momentum?: number; 
}

export type PollType = 'STANDARD' | 'PETITION' | 'BINARY' | 'AWARD' | 'RATING';

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
  isRepost?: boolean;
  isArchived?: boolean; // Pour masquer du flux public mais garder en archives
  originalAuthor?: User;
  originalPostId?: string;
  quotedPost?: Post; 
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
