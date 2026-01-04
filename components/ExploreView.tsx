
import React from 'react';

const TRENDS = [
  { tag: '#SWACore', posts: '125K', category: 'Technologie' },
  { tag: 'Décentralisation', posts: '89K', category: 'Économie' },
  { tag: '#DigitalSovereignty', posts: '45K', category: 'Politique' },
  { tag: 'Web3.0', posts: '32K', category: 'Tech' },
  { tag: 'Mars Mission', posts: '28K', category: 'Science' },
];

const ExploreView: React.FC = () => {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      {/* Barre de recherche */}
      <div className="p-4 border-b border-gray-100 bg-white sticky top-[68px] z-20">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Rechercher sur SWA."
            className="w-full bg-gray-100 border-none rounded-2xl py-4 pl-12 pr-4 text-lg font-bold placeholder:text-gray-400 focus:ring-2 focus:ring-[#5B50FF] transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Bannière Tendance */}
      <div className="relative aspect-[21/9] bg-gradient-to-br from-[#5B50FF] to-[#FF416C] p-8 flex flex-col justify-end text-white">
        <span className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-80">À la une</span>
        <h2 className="text-3xl font-[900] leading-tight mb-2">Le futur de la donnée est là.</h2>
        <p className="font-bold opacity-90">Découvrez comment CORE révolutionne votre vie.</p>
      </div>

      {/* Liste des tendances */}
      <div className="p-6">
        <h3 className="text-2xl font-[900] mb-6 text-black tracking-tight">Tendances pour vous</h3>
        <div className="space-y-8">
          {TRENDS.map((trend, i) => (
            <div key={i} className="flex justify-between items-start group cursor-pointer">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 font-bold mb-1">{trend.category} • Tendances</span>
                <span className="text-lg font-black text-black group-hover:text-[#5B50FF] transition-colors">{trend.tag}</span>
                <span className="text-sm text-gray-500 font-bold mt-1">{trend.posts} publications</span>
              </div>
              <button className="text-gray-300 group-hover:text-gray-900 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <button className="mx-6 mb-10 py-4 text-[#5B50FF] font-black text-lg bg-[#EEF2FF] rounded-2xl hover:bg-[#E0E7FF] transition-all">
        Afficher plus
      </button>
    </div>
  );
};

export default ExploreView;
