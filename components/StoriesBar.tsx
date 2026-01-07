import React from 'react';
import { Story } from '../types';
import { SkeletonStory } from './Skeleton';
import XYImage from './XYImage';

interface StoriesBarProps {
  stories: Story[];
  isLoading?: boolean;
}

const StoriesBar: React.FC<StoriesBarProps> = ({ stories, isLoading }) => {
  // Avatar de l'utilisateur actuel (statique pour la démo)
  const currentUserAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format";

  return (
    <div className="flex items-center overflow-hidden border-b border-gray-50 bg-white relative h-[140px]">
      {/* Container horizontal scrollable */}
      <div className="flex overflow-x-auto py-5 hide-scrollbar w-full h-full">
        
        {/* STATUT UTILISATEUR (STICKY & OPAQUE) */}
        <div className="sticky left-0 z-[20] bg-white flex items-center px-4 shadow-[15px_0_15px_-5px_rgba(255,255,255,1)]">
          <div className="flex flex-col items-center space-y-2 flex-shrink-0 min-w-[85px] group cursor-pointer relative z-30">
            <div className="relative w-[72px] h-[72px]">
              {/* Bordure de statut (segmentée pour indiquer 4 statuts max) */}
              <div className="absolute inset-0 rounded-full border-[3px] border-[#5B50FF] opacity-30" />
              <div className="absolute inset-0 rounded-full border-[3px] border-[#5B50FF] border-t-transparent border-l-transparent transition-transform group-active:scale-95" style={{ transform: 'rotate(-45deg)' }} />
              
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-100 p-[1px]">
                <XYImage 
                  src={currentUserAvatar} 
                  alt="Moi" 
                  aspectRatio="aspect-square" 
                />
              </div>
              
              {/* Badge "+" pour l'utilisateur */}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#FF416C] rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 6v12m6-6H6" />
                </svg>
              </div>
            </div>
            <span className="text-[11px] font-[1000] text-gray-900 uppercase tracking-tight w-full text-center">
              Votre Statut
            </span>
          </div>
          {/* Séparateur subtil vertical pour marquer la limite du sticky */}
          <div className="ml-2 w-[1px] h-12 bg-gray-100/50" />
        </div>

        {/* LISTE DES AUTRES STATUTS */}
        <div className="flex items-center space-x-5 px-4 pr-12">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonStory key={i} />)
          ) : (
            stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center space-y-2 flex-shrink-0 min-w-[85px] group cursor-pointer transition-all active:scale-95">
                <div className="relative w-[72px] h-[72px]">
                  {/* Bordure segmentée style socialX (4 segments pour 4 statuts max) */}
                  <div className="absolute inset-0 rounded-full border-[3px] border-[#5B50FF] group-hover:border-[#FF416C] transition-colors" />
                  
                  <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-100 p-[1px]">
                    <XYImage 
                      src={story.user.avatar} 
                      alt={story.user.name} 
                      aspectRatio="aspect-square" 
                    />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-gray-700 truncate w-full text-center tracking-tight">
                  {story.user.handle}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Dégradé de fondu sur le bord droit pour indiquer le scroll possible */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default StoriesBar;