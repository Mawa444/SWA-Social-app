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
import { POSTS, STORIES, COMPETITIONS } from './constants/mockData';
import { Post, User } from './types';

// Mock de l'utilisateur actuel
const ME: User = {
  id: 'me',
  name: 'Alex Core',
  handle: '@alex_core',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format',
  isVerified: true,
  activityScore: 98.5
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('SOCIAL');
  const [activeView, setActiveView] = useState<'home' | 'explore' | 'notifications' | 'messages' | 'profile'>('home');
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string | null>(null);
  const [activeThreadPost, setActiveThreadPost] = useState<Post | null>(null);
  const [activeProfileUser, setActiveProfileUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showCompose, setShowCompose] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeView, activeTab, activeProfileUser]);

  const selectedCompetition = useMemo(() => 
    COMPETITIONS.find(c => c.id === selectedCompetitionId), 
  [selectedCompetitionId]);

  const filteredPosts = useMemo(() => {
    if (activeTab === 'VOIX') return POSTS.filter(p => !!p.poll);
    if (activeTab === 'SOCIAL') return POSTS.filter(p => !p.poll);
    if (activeTab === 'CLUBS') return [];
    return POSTS;
  }, [activeTab]);

  const handleExploreHub = (id: string) => setSelectedCompetitionId(id);
  const handleOpenThread = (post: Post) => setActiveThreadPost(post);
  const handleCloseThread = () => setActiveThreadPost(null);
  
  const handleOpenProfile = (user: User) => {
    setActiveProfileUser(user);
    setActiveView('profile');
  };

  const handleOpenMyProfile = () => {
    setActiveProfileUser(ME);
    setActiveView('profile');
  };

  if (activeThreadPost) {
    return (
      <div className="flex flex-col min-h-screen bg-white w-full animate-in slide-in-from-right duration-300">
        <ThreadView post={activeThreadPost} onBack={handleCloseThread} />
      </div>
    );
  }

  if (selectedCompetition) {
    return (
      <div className="flex flex-col min-h-screen bg-white w-full animate-in fade-in duration-500">
        <CompetitionHub 
          competition={selectedCompetition} 
          onBack={() => setSelectedCompetitionId(null)} 
        />
        <BottomNav activeView={activeView} onViewChange={(v) => { setSelectedCompetitionId(null); setActiveView(v); }} />
      </div>
    );
  }

  const renderContent = () => {
    if (activeView === 'profile' && activeProfileUser) {
      return (
        <ProfileView 
          user={activeProfileUser} 
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
            <BreakingNews 
              title="socialX DIRECT" 
              description="Découvrez comment la communauté façonne l'information en temps réel sur le flux Social." 
            />
          </div>

          {activeTab === 'CLUBS' ? (
            <ClubsView />
          ) : (
            <div className="w-full">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => <SkeletonPost key={i} />)}
                </div>
              ) : (
                <Feed 
                  posts={filteredPosts} 
                  onExploreHub={handleExploreHub} 
                  onComment={handleOpenThread}
                  onProfileClick={handleOpenProfile}
                />
              )}
            </div>
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
    <div className="flex flex-col min-h-screen bg-[#F8F9FB] w-full relative overflow-x-hidden animate-in fade-in duration-700">
      {activeView !== 'profile' && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-3xl border-b border-gray-100">
          <Header 
            onOpenPremium={() => setShowPremium(true)} 
            onProfileClick={handleOpenMyProfile}
          />
          {activeView === 'home' && (
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          )}
        </div>
      )}
      
      <main className={`flex-1 pb-44 w-full ${activeView === 'profile' ? 'pt-0' : (activeView === 'home' ? 'pt-[110px]' : 'pt-[60px]')}`}>
        <div className="max-w-4xl mx-auto w-full min-h-screen border-x border-gray-100/50 bg-white shadow-sm">
          {renderContent()}
        </div>
      </main>

      {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}
      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
      
      <ComposeButton onClick={() => setShowCompose(true)} />
      <BottomNav activeView={activeView === 'profile' ? 'home' : activeView} onViewChange={setActiveView} />
    </div>
  );
};

export default App;