
import React, { useState, useMemo } from 'react';

const TRENDS = [
  { tag: '#XYCore', posts: '125K', category: 'Technologie' },
  { tag: 'Décentralisation', posts: '89K', category: 'Économie' },
  { tag: '#DigitalSovereignty', posts: '45K', category: 'Politique' },
  { tag: 'Web3.0', posts: '32K', category: 'Tech' },
  { tag: 'Mars Mission', posts: '28K', category: 'Science' },
  { tag: '#MusicAward2025', posts: '254K', category: 'Divertissement' },
  { tag: 'Cyber-Sécurité', posts: '12K', category: 'Tech' },
];

const ExploreView: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredTrends = useMemo(() => {
    if (!search.trim()) return TRENDS;
    return TRENDS.filter(t => 
      t.tag.toLowerCase().includes(search.toLowerCase()) || 
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="p-4 border-b border-gray-100 bg-white sticky top-[68px] z-20">
        <div className="relative">
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher sur XY"
            className="w-full bg-gray-100 border-none rounded-2xl py-4 pl-12 pr-4 text-lg font-bold placeholder:text-gray-500 focus:ring-2 focus:ring-[#5B50FF] transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-[900] mb-6 text-black tracking-tight uppercase">Tendances pour vous</h3>
        <div className="space-y-8 min-h-[300px]">
          {filteredTrends.map((trend, i) => (
            <div key={i} className="flex justify-between items-start group cursor-pointer animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-700 font-black uppercase tracking-widest mb-1">{trend.category} • Tendances</span>
                <span className="text-lg font-black text-black group-hover:text-[#5B50FF] transition-colors">{trend.tag}</span>
                <span className="text-[11px] text-gray-600 font-bold mt-1 uppercase tracking-widest">{trend.posts} publications</span>
              </div>
              <button className="text-gray-400 group-hover:text-black transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreView;
