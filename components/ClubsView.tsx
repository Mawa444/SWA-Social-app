
import React from 'react';
import XYImage from './XYImage';

const CLUBS = [
  { id: '1', name: 'NEO-TOKYO TECH', members: '12.4K', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format', category: 'TECH' },
  { id: '2', name: 'DEFI REVOLUTION', members: '45.2K', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format', category: 'FINANCE' },
  { id: '3', name: 'CYBER-ART HUB', members: '8.1K', image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=800&auto=format', category: 'ART' },
  { id: '4', name: 'QUANTUM MIND', members: '3.2K', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format', category: 'SCIENCE' },
];

const ClubsView: React.FC = () => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 pb-32">
      <div className="flex flex-col space-y-2">
        <h2 className="text-4xl font-[1000] uppercase tracking-tighter text-black">VOS CLUBS</h2>
        <p className="text-gray-500 font-bold text-base">Rejoignez des communautés exclusives basées sur vos intérêts CORE.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CLUBS.map((club) => (
          <div key={club.id} className="relative aspect-[16/10] rounded-[40px] overflow-hidden group cursor-pointer border border-gray-100 shadow-sm">
            <XYImage src={club.image} alt={club.name} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute top-5 right-5">
              <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{club.category}</span>
            </div>
            <div className="absolute bottom-6 left-8 right-8">
              <h3 className="text-2xl font-[1000] text-white uppercase leading-none mb-2">{club.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">{club.members} MEMBRES</span>
                <button className="bg-white text-black text-[10px] font-black px-6 py-2.5 rounded-xl uppercase tracking-widest hover:bg-[#5B50FF] hover:text-white transition-all active:scale-95">REJOINDRE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#5B50FF] rounded-[44px] p-10 text-white relative overflow-hidden shadow-2xl shadow-[#5B50FF]/30">
        <div className="relative z-10">
          <h4 className="text-3xl font-[1000] uppercase mb-3">CRÉER UN CLUB</h4>
          <p className="font-bold opacity-80 mb-8 text-base max-w-[300px]">Devenez un leader d'opinion et gérez votre propre communauté XY de manière souveraine.</p>
          <button className="bg-white text-[#5B50FF] px-10 py-4 rounded-[22px] font-black text-xs uppercase tracking-[0.3em] shadow-lg">Lancer maintenant</button>
        </div>
        <div className="absolute top-0 right-0 p-12 text-[140px] font-black opacity-10 -rotate-12 translate-x-1/4 select-none pointer-events-none">XY</div>
      </div>
    </div>
  );
};

export default ClubsView;
