
export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isVerified?: boolean;
}

export interface PollOption {
  label: string;
  votes: number;
}

export interface Poll {
  question: string;
  options: PollOption[];
  totalVotes: number;
  expiresAt: string;
}

export interface Post {
  id: string;
  author: User;
  timestamp: string;
  content: string;
  image?: string; // Gardé pour compatibilité ascendante si nécessaire
  images?: string[]; // Support multi-images
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