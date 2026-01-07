
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import StoriesBar from './components/StoriesBar';
import BreakingNews from './components/BreakingNews';
import Feed from './components/Feed';
import ExploreView from './components/ExploreView';
import MessagesView from './components/MessagesView';
import NotificationsView from './components/NotificationsView';
import ProfileView from './components/ProfileView';
import BottomNav from './components/BottomNav';
import ComposeButton from './components/ComposeButton';
import ComposeModal from './components/ComposeModal';
import CompetitionHub from './components/CompetitionHub';
import ThreadView from './components/ThreadView';
import ClubsView from './components/ClubsView';
import PremiumModal from './components/PremiumModal';
import { SkeletonPost } from './components/Skeleton';
import { POSTS as INITIAL_POSTS, STORIES, COMPETITIONS } from './constants/mockData';
import { Post, User } from './types';

// Utilisateur ME complet pour satisfaire l'interface User et éviter les erreurs
const ME: User = {
  id: 'me',
  name: 'Alex Core',
  handle: '@alex_core',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format',
  isVerified: true,
  activityScore: 98.5,
  bio: "Explorateur socialX. Passionné par l'information souveraine.",
  followersCount: 1240,
  followingCount: 850,
  postsCount: 156,
  repostsCount: 42,
  likesReceived: 5400,
  commentsReceived: 890,
  commentsMade: 1205,
  reportsCount: 0,
  reputationScore: 9.8
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeTab, setActiveTab] = useState('SOCIAL');
  const [activeView, setActiveView] = useState<'home' | 'explore' | 'notifications' | 'messages' | 'profile'>('home');
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string | null>(null);
  const [activeThreadPost, setActiveThreadPost] = useState<Post | null>(null);
  const [activeProfileUser, setActiveProfileUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showCompose, setShowCompose] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeView, activeTab]);

  const selectedCompetition = useMemo(() => 
    COMPETITIONS.find(c => c.id === selectedCompetitionId), 
  [selectedCompetitionId]);

  const filteredPosts = useMemo(() => {
    if (activeTab === 'VOIX') return posts.filter(p => !!p.poll);
    if (activeTab === 'SOCIAL') return posts.filter(p => !p.poll);
    return posts;
  }, [activeTab, posts]);

  const handleOpenThread = (post: Post) => setActiveThreadPost(post);
  const handleOpenProfile = (user: User) => {
    setActiveProfileUser(user);
    setActiveView('profile');
  };

  if (activeThreadPost) {
    return (
      <div className="flex flex-col min-h-screen bg-white w-full animate-in fade-in duration-300">
        <ThreadView 
          post={activeThreadPost} 
          onBack={() => setActiveThreadPost(null)}
          onProfileClick={handleOpenProfile}
        />
      </div>
    );
  }

  const renderContent = () => {
    if (activeView === 'profile' && activeProfileUser) {
      return (
        <ProfileView 
          user={activeProfileUser} 
          allPosts={posts}
          isMe={activeProfileUser.id === 'me'}
          onBack={() => { setActiveView('home'); setActiveProfileUser(null); }} 
          onPostComment={handleOpenThread}
        />
      );
    }
    if (activeView === 'home') {
      return (
        <>
          {activeTab === 'SOCIAL' && <StoriesBar stories={STORIES} isLoading={isLoading} />}
          <div className="bg-white border-b border-gray-100">
            <BreakingNews title="socialX DIRECT" description="La communauté façonne l'information en temps réel sur le flux Social." />
          </div>
          {activeTab === 'CLUBS' ? <ClubsView /> : (
            <Feed posts={filteredPosts} onComment={handleOpenThread} onProfileClick={handleOpenProfile} onExploreHub={setSelectedCompetitionId} />
          )}
        </>
      );
    }
    if (activeView === 'explore') return <ExploreView />;
    if (activeView === 'notifications') return <NotificationsView />;
    if (activeView === 'messages') return <MessagesView />;
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB] w-full relative overflow-x-hidden">
      {activeView !== 'profile' && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-gray-100">
          <Header user={ME} onOpenPremium={() => setShowPremium(true)} onProfileClick={() => handleOpenProfile(ME)} />
          {activeView === 'home' && <Tabs activeTab={activeTab} onTabChange={setActiveTab} />}
        </div>
      )}
      <main className={`flex-1 pb-44 w-full ${activeView === 'profile' ? 'pt-0' : (activeView === 'home' ? 'pt-[110px]' : 'pt-[60px]')}`}>
        <div className="max-w-4xl mx-auto w-full min-h-screen bg-white shadow-sm border-x border-gray-100">{renderContent()}</div>
      </main>
      {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}
      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
      <ComposeButton onClick={() => setShowCompose(true)} />
      <BottomNav activeView={activeView === 'profile' ? 'home' : activeView} onViewChange={setActiveView} />
    </div>
  );
};

export default App;
