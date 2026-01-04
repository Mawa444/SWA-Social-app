
import React, { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import StoriesBar from './components/StoriesBar';
import BreakingNews from './components/BreakingNews';
import Feed from './components/Feed';
import BottomNav from './components/BottomNav';
import ComposeButton from './components/ComposeButton';
import { POSTS, STORIES } from './constants/mockData';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Pour vous');

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] w-full relative">
      {/* BLOC FIXE : Entête + Onglets avec ombre renforcée */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
        <Header />
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      {/* Contenu Défilant avec padding-top pour compenser le bloc fixe (approx 125px) */}
      <main className="flex-1 pb-40 w-full pt-[125px]">
        <div className="max-w-4xl mx-auto w-full bg-white">
          <StoriesBar stories={STORIES} />
          
          <div className="border-b border-gray-100">
             <BreakingNews 
               title="DERNIÈRE MINUTE" 
               description="Le réseau SWA. annonce le déploiement massif de son architecture CORE décentralisée." 
             />
          </div>

          <Feed posts={POSTS} />
        </div>
      </main>

      <ComposeButton />
      <BottomNav />
    </div>
  );
};

export default App;