
import { Post, Story, Competition } from '../types';

export const COMPETITIONS: Competition[] = [
  {
    id: 'comp-swa-music-2025',
    title: 'SWA. MUSIC AWARDS 2025',
    description: 'La plus grande cérémonie décentralisée célébrant les talents de demain. Votre voix définit le futur de la musique.',
    banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    startDate: '01 Jan 2025',
    endDate: '24h',
    totalVotes: 1250400,
    categories: [
      { id: 'cat-1', name: 'Révélation', icon: '✨', pollId: 'poll-revelation' },
      { id: 'cat-2', name: 'Artiste de l’année', icon: '👑', pollId: 'poll-artiste-annee' },
      { id: 'cat-3', name: 'Meilleur Clip', icon: '🎬', pollId: 'poll-clip' },
      { id: 'cat-4', name: 'Producteur', icon: '🎹', pollId: 'poll-prod' },
    ]
  }
];

export const STORIES: Story[] = [
  { id: '1', user: { id: 'u1', name: 'Cyber Horizon', handle: '@CyberHorizon', avatar: 'https://picsum.photos/seed/cyber/120/120' } },
  { id: '2', user: { id: 'u2', name: 'SWA. News', handle: '@swanews', avatar: 'https://picsum.photos/seed/swa/120/120' } },
  { id: '3', user: { id: 'u3', name: 'JustTheNews', handle: '@justthe...', avatar: 'https://picsum.photos/seed/u2/120/120' } },
  { id: '4', user: { id: 'u4', name: 'OAN', handle: '@OAN', avatar: 'https://picsum.photos/seed/u4/120/120' } },
];

export const POSTS: Post[] = [
  {
    id: 'p-screenshot-replica',
    author: {
      id: 'cyber_horizon',
      name: 'Cyber Horizon',
      handle: '@CyberHorizon',
      avatar: 'https://picsum.photos/seed/cyber/120/120',
      isVerified: true,
    },
    timestamp: '15m',
    content: "L'intelligence artificielle SWA. CORE est désormais capable d'analyser des flux de données en temps réel 3x plus vite que ses concurrents. Une prouesse technologique au service de la vérité.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    stats: { comments: '450', reposts: '1,20k', likes: '8,60k' }
  },
  {
    id: 'p-award-music',
    author: {
      id: 'swa_arts',
      name: 'SWA. Arts & Music',
      handle: '@swa_arts',
      avatar: 'https://picsum.photos/seed/music/120/120',
      isVerified: true,
    },
    timestamp: 'Juste maintenant',
    content: "C'est l'heure de choisir vos favoris pour les SWA. MUSIC AWARDS 2025. Qui mérite le titre de Révélation de l'Année ?",
    poll: {
      id: 'poll-revelation',
      type: 'AWARD',
      competitionId: 'comp-swa-music-2025',
      category: "RÉVÉLATION DE L'ANNÉE",
      question: "Choisissez votre artiste favori :",
      options: [
        { 
          id: 'art-1', 
          label: "Alya Nova", 
          sublabel: "Album: Ethereal", 
          votes: 12400, 
          image: "https://images.unsplash.com/photo-1516575334481-f8528e946623?q=80&w=600&auto=format&fit=crop",
          bio: "Prodige de la synth-pop originaire de Neo-Tokyo.",
          achievements: ["#1 Billboard Dance", "50M Streams"]
        },
        { 
          id: 'art-2', 
          label: "Elias Vance", 
          sublabel: "Single: Midnight", 
          votes: 15200, 
          image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=600&auto=format&fit=crop",
          bio: "La nouvelle voix soul qui bouleverse les codes du R&B.",
          achievements: ["Gold Single", "Sold Out Tour"]
        }
      ],
      totalVotes: 55200,
      expiresAt: "24h"
    },
    stats: { comments: '5.6k', reposts: '12k', likes: '45k' }
  }
];
