
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import StoriesBar from './components/StoriesBar';
import BreakingNews from './components/BreakingNews';
import Feed from './components/Feed';
import ExploreView from './components/ExploreView';
import BottomNav from './components/BottomNav';
import ComposeButton from './components/ComposeButton';
import CompetitionHub from './components/CompetitionHub';
import ThreadView from './components/ThreadView';
import { POSTS, STORIES, COMPETITIONS } from './constants/mockData';
import { Post } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('SOCIAL');
  const [activeView, setActiveView] = useState<'home' | 'explore' | 'notifications' | 'messages'>('home');
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string | null>(null);
  const [activeThreadPost, setActiveThreadPost] = useState<Post | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView, selectedCompetitionId, activeThreadPost]);

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

  // Vue Thread (Commentaires) - Navigation masquée pour focus sur la conversation
  if (activeThreadPost) {
    return (
      <div className="flex flex-col min-h-screen bg-white w-full animate-in slide-in-from-right duration-300">
        <ThreadView post={activeThreadPost} onBack={handleCloseThread} />
      </div>
    );
  }

  // Vue Hub Compétition
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

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFF] w-full relative overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-3xl border-b border-gray-100">
        <Header />
        {activeView === 'home' && (
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
      
      <main className={`flex-1 pb-44 w-full ${activeView === 'home' ? 'pt-[125px]' : 'pt-[68px]'}`}>
        <div className="max-w-4xl mx-auto w-full bg-white min-h-screen border-x border-gray-100">
          {activeView === 'home' ? (
            <>
              {activeTab === 'SOCIAL' && <StoriesBar stories={STORIES} />}
              
              <div className="border-b border-gray-100 bg-white">
                <BreakingNews 
                  title="SWA. DIRECT" 
                  description="Découvrez comment la communauté façonne l'information en temps réel sur le flux Social." 
                />
              </div>

              {activeTab === 'CLUBS' ? (
                <div className="p-10 text-center text-gray-400 font-black italic">Section Clubs en cours de synchronisation...</div>
              ) : (
                <Feed posts={filteredPosts} onExploreHub={handleExploreHub} onComment={handleOpenThread} />
              )}
            </>
          ) : activeView === 'explore' ? (
            <ExploreView />
          ) : (
            <div className="flex flex-col items-center justify-center py-48 text-gray-400">
              <p className="font-black italic text-xl tracking-tighter">Flux non disponible</p>
            </div>
          )}
        </div>
      </main>

      <ComposeButton />
      <BottomNav activeView={activeView} onViewChange={setActiveView} />
    </div>
  );
};

export default App;
