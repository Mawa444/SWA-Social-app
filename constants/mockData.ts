
import { Post, Story, Competition } from '../types';

const IMAGES = {
  cyber: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format",
  news: "https://images.unsplash.com/photo-1504711432869-0df10b1ecad0?q=80&w=600&auto=format",
  tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format",
  art: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=600&auto=format",
  space: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&auto=format",
  user1: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format",
  user2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format",
  user3: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format",
  user4: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format",
  user5: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format",
  user6: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format",
  user7: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format",
  user8: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format",
  user9: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format",
  user10: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format",
  music: "https://images.unsplash.com/photo-1514525253344-99a42999629a?q=80&w=600&auto=format",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format",
  future: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format"
};

export const COMPETITIONS: Competition[] = [
  {
    id: 'comp-socialx-music-2025',
    title: 'socialX MUSIC AWARDS 2025',
    description: 'La plus grande cérémonie décentralisée célébrant les talents de demain. Votre voix définit le futur de la musique.',
    banner: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1200&auto=format",
    startDate: '01 Jan 2025',
    endDate: '24h',
    totalVotes: 1250400,
    categories: [
      { id: 'cat-1', name: 'Révélation', icon: '✨', pollId: 'poll-revelation' },
      { id: 'cat-2', name: 'Artiste de l’année', icon: '👑', pollId: 'poll-artiste-annee' },
    ]
  }
];

export const STORIES: Story[] = [
  { id: '1', user: { id: 'u1', name: 'Cyber Horizon', handle: '@CyberHorizon', avatar: IMAGES.user1, activityScore: 92.4, followersCount: 1200, followingCount: 400, postsCount: 88, repostsCount: 12, likesReceived: 4500, commentsReceived: 300, commentsMade: 500, reportsCount: 0 } },
  { id: '2', user: { id: 'u2', name: 'socialX News', handle: '@socialxnews', avatar: IMAGES.user2, activityScore: 88.1, followersCount: 45000, followingCount: 12, postsCount: 1200, repostsCount: 450, likesReceived: 120000, commentsReceived: 15000, commentsMade: 10, reportsCount: 2 } },
  { id: '3', user: { id: 'u3', name: 'JustTheNews', handle: '@justthe...', avatar: IMAGES.user3, activityScore: 75.5, followersCount: 890, followingCount: 230, postsCount: 45, repostsCount: 5, likesReceived: 1200, commentsReceived: 80, commentsMade: 140, reportsCount: 1 } },
];

export const POSTS: Post[] = [
  {
    id: 'p-trend-1',
    author: { id: 'socialxnews', name: 'socialX News', handle: '@socialxnews', avatar: IMAGES.user2, isVerified: true, activityScore: 99.1, followersCount: 2450000, followingCount: 8, postsCount: 8500, repostsCount: 1200, likesReceived: 15000000, commentsReceived: 200000, commentsMade: 0, reportsCount: 0 },
    timestamp: '15m',
    content: "URGENT : socialX franchit la barre des 10 millions d'utilisateurs souverains actifs par jour. Une étape historique pour le réseau décentralisé. 🌍💎 #socialX #Milestone",
    image: IMAGES.future,
    stats: { comments: '45.2k', reposts: '128.5k', likes: '1.2M' }
  },
  {
    id: 'p-tech-1',
    author: { id: 'core_official', name: 'CORE Protocole', handle: '@CORE', avatar: IMAGES.ai, isVerified: true, activityScore: 99.8, followersCount: 850000, followingCount: 1, postsCount: 42, repostsCount: 150, likesReceived: 500000, commentsReceived: 45000, commentsMade: 0, reportsCount: 0 },
    timestamp: '45m',
    content: "L'activation du moteur CORE v3.0 est imminente. Préparez-vous à une fluidité de navigation jamais vue sur le Web3. Le futur est entre vos mains.",
    image: IMAGES.tech,
    stats: { comments: '18.4k', reposts: '42k', likes: '245k' }
  },
  {
    id: 'p-me-1',
    author: { id: 'me', name: 'Alex Core', handle: '@alex_core', avatar: IMAGES.user1, isVerified: true, activityScore: 94.2, followersCount: 1240, followingCount: 850, postsCount: 156, repostsCount: 42, likesReceived: 5400, commentsReceived: 890, commentsMade: 1205, reportsCount: 0 },
    timestamp: '1h',
    content: "En train de tester la nouvelle interface souveraine de socialX. La fluidité du protocole CORE est impressionnante ! 🚀 #Web3 #Sovereignty",
    image: IMAGES.cyber,
    stats: { comments: '12', reposts: '4', likes: '88' }
  },
  {
    id: 'p-me-repost-1',
    author: { id: 'me', name: 'Alex Core', handle: '@alex_core', avatar: IMAGES.user1, isVerified: true, activityScore: 94.2, followersCount: 1240, followingCount: 850, postsCount: 156, repostsCount: 42, likesReceived: 5400, commentsReceived: 890, commentsMade: 1205, reportsCount: 0 },
    timestamp: '3h',
    content: "Cette analyse sur le chiffrement est essentielle. À lire absolument.",
    isRepost: true,
    originalAuthor: { id: 'oan', name: 'OAN Global', handle: '@OAN', avatar: IMAGES.user4, isVerified: true, activityScore: 82.3, followersCount: 12000, followingCount: 50, postsCount: 450, repostsCount: 100, likesReceived: 34000, commentsReceived: 1200, commentsMade: 300, reportsCount: 0 },
    stats: { comments: '2', reposts: '1', likes: '15' }
  },
  {
    id: 'p-analysis-1',
    author: { id: 'justthenews', name: 'JustTheNews', handle: '@justthe...', avatar: IMAGES.user3, activityScore: 75.5, followersCount: 890, followingCount: 230, postsCount: 45, repostsCount: 5, likesReceived: 1200, commentsReceived: 80, commentsMade: 140, reportsCount: 1 },
    timestamp: '5h',
    content: "Analyse profonde : pourquoi le modèle socialX de 'Proof of Engagement' change radicalement la valeur de nos données. 🧠📈",
    stats: { comments: '1.5k', reposts: '850', likes: '12.4k' }
  },
  {
    id: 'p1',
    author: { id: 'oan', name: 'OAN Global', handle: '@OAN', avatar: IMAGES.user4, isVerified: true, activityScore: 82.3, followersCount: 12000, followingCount: 50, postsCount: 450, repostsCount: 100, likesReceived: 34000, commentsReceived: 1200, commentsMade: 300, reportsCount: 0 },
    timestamp: '2m',
    content: "DÉBAT : Doit-on généraliser le chiffrement de bout en bout pour tous les services publics afin de garantir une vie privée absolue ?",
    poll: {
      id: 'poll-binary-privacy',
      type: 'BINARY',
      question: "CHIFFREMENT ABSOLU ?",
      options: [
        { id: 'opt-y', label: "OUI, PRIORITÉ PRIVACY", votes: 8500 },
        { id: 'opt-n', label: "NON, SÉCURITÉ D'ABORD", votes: 4200 }
      ],
      totalVotes: 12700,
      expiresAt: "12h"
    },
    stats: { comments: '1.2k', reposts: '450', likes: '3.4k' }
  },
  {
    id: 'p2',
    author: { id: 'socialx_arts', name: 'socialX Arts', handle: '@socialx_arts', avatar: IMAGES.music, isVerified: true, activityScore: 96.8, followersCount: 5600, followingCount: 120, postsCount: 340, repostsCount: 12, likesReceived: 45000, commentsReceived: 5600, commentsMade: 120, reportsCount: 0 },
    timestamp: '15m',
    content: "Voici les nommés pour la catégorie RÉVÉLATION de l'année. Votez pour votre favori !",
    poll: {
      id: 'poll-revelation',
      type: 'AWARD',
      category: "socialX MUSIC AWARDS",
      competitionId: 'comp-socialx-music-2025',
      question: "VOTRE RÉVÉLATION 2024",
      options: [
        { id: 'art-1', label: "Alya Nova", sublabel: "Synth-Pop", votes: 45000, image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format" },
        { id: 'art-2', label: "Elias Vance", sublabel: "Soul Futuriste", votes: 38000, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format" }
      ],
      totalVotes: 83000,
      expiresAt: "24h"
    },
    stats: { comments: '5.6k', reposts: '12k', likes: '45k' }
  }
];
