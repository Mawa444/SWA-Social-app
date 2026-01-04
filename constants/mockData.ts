
import { Post, Story } from '../types';

export const STORIES: Story[] = [
  { id: '1', user: { id: 'u1', name: 'Cyber Horizon', handle: '@CyberHorizon', avatar: 'https://picsum.photos/seed/cyber/120/120' } },
  { id: '2', user: { id: 'u2', name: 'SWA. News', handle: '@swanews', avatar: 'https://picsum.photos/seed/swa/120/120' } },
  { id: '3', user: { id: 'u3', name: 'JustTheNews', handle: '@justthe...', avatar: 'https://picsum.photos/seed/u2/120/120' } },
  { id: '4', user: { id: 'u4', name: 'OAN', handle: '@OAN', avatar: 'https://picsum.photos/seed/u4/120/120' } },
  { id: '5', user: { id: 'u5', name: 'RSBN', handle: '@RSBN', avatar: 'https://picsum.photos/seed/u7/120/120' } },
  { id: '6', user: { id: 'u6', name: 'WhiteHouse', handle: '@WhiteH...', avatar: 'https://picsum.photos/seed/u5/120/120' } },
];

export const POSTS: Post[] = [
  {
    id: 'p-vertical',
    author: {
      id: 'tiktok_style',
      name: 'Creative Hub',
      handle: '@creativehub',
      avatar: 'https://picsum.photos/seed/hub/120/120',
      isVerified: true,
    },
    timestamp: '2m',
    content: "Une création verticale unique au format TikTok. Dans le flux, vous ne voyez qu'une partie, cliquez pour voir l'œuvre complète en plein écran !",
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1080&h=1920',
    stats: {
      comments: '88',
      reposts: '42',
      likes: '2.5k'
    }
  },
  {
    id: 'p-multi',
    author: {
      id: 'vision',
      name: 'Future Vision',
      handle: '@futurevision',
      avatar: 'https://picsum.photos/seed/vision/120/120',
      isVerified: true,
    },
    timestamp: '5m',
    content: "Portfolio exclusif de l'architecture modulaire SWA. CORE. Une révolution visuelle et structurelle qui redéfinit nos espaces de travail numériques. Swipez pour découvrir les détails.",
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200'
    ],
    stats: {
      comments: '1.2k',
      reposts: '850',
      likes: '15k'
    }
  },
  {
    id: 'p0',
    author: {
      id: 'cyber',
      name: 'Cyber Horizon',
      handle: '@CyberHorizon',
      avatar: 'https://picsum.photos/seed/cyberhead/120/120',
      isVerified: true,
    },
    timestamp: '15m',
    content: "L'intelligence artificielle SWA. CORE est désormais capable d'analyser des flux de données en temps réel 3x plus vite que ses concurrents. Une prouesse technologique au service de la vérité.",
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    stats: {
      comments: '450',
      reposts: '1,20k',
      likes: '8,60k'
    }
  },
  {
    id: 'p-video',
    author: {
      id: 'tech',
      name: 'Tech Labs',
      handle: '@techlabs',
      avatar: 'https://picsum.photos/seed/tech/120/120',
      isVerified: true,
    },
    timestamp: '30m',
    content: "Démonstration exclusive de l'interface neuronale SWA. Vision. Un contrôle fluide, par la pensée.",
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    stats: {
      comments: '89',
      reposts: '45',
      likes: '1,2k'
    }
  },
  {
    id: 'p-link',
    author: {
      id: 'media',
      name: 'Global Media',
      handle: '@globalmedia',
      avatar: 'https://picsum.photos/seed/media/120/120',
      isVerified: true,
    },
    timestamp: '45m',
    content: "Consultez notre dossier complet sur l'impact de la décentralisation dans les médias sociaux.",
    link: {
      url: 'https://www.google.com',
      title: "L'ère de la décentralisation : Pourquoi SWA. mène la danse",
      description: "Une analyse profonde des mécanismes de consensus et de la souveraineté numérique dans l'écosystème CORE."
    },
    stats: {
      comments: '12',
      reposts: '8',
      likes: '142'
    }
  },
  {
    id: 'p1',
    author: {
      id: 'news',
      name: 'SWA. Officiel',
      handle: '@swaofficiel',
      avatar: 'https://picsum.photos/seed/officiel/120/120',
      isVerified: true,
    },
    timestamp: '1h',
    content: "Découvrez notre nouveau système de vote décentralisé. La transparence est au coeur de notre vision SWA. CORE.",
    poll: {
      question: "Soutenez-vous l'initiative CORE ?",
      options: [
        { label: "Oui, à 100%", votes: 5200 },
        { label: "En cours de réflexion", votes: 1100 }
      ],
      totalVotes: 6300,
      expiresAt: "1h"
    },
    stats: {
      comments: '312',
      reposts: '150',
      likes: '980'
    }
  }
];
