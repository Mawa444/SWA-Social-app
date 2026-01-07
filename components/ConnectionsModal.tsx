
import React from 'react';
import { User } from '../types';
import XYImage from './XYImage';
import { STORIES } from '../constants/mockData';

interface ConnectionsModalProps {
  type: 'FOLLOWERS' | 'FOLLOWING' | 'LIKERS' | 'REPOSTERS';
  onClose: () => void;
  onSelectProfile: (user: User) => void;
}

const ConnectionsModal: React.FC<ConnectionsModalProps> = ({ type, onClose, onSelectProfile }) => {
  // Simulation de données basées sur les mocks existants
  const mockUsers = STORIES.map(s => s.user);

  const getTitle = () => {
    switch(type) {
      case 'FOLLOWERS': return 'Abonnés';
      case 'FOLLOWING': return 'Suivis';
      case 'LIKERS': return 'Appréciations';
      case 'REPOSTERS': return 'Reposts';
      default: return 'Liste Citoyenne';
    }
  };

  const renderTrustBadge = (user: User) => {
    const score = user.reputationScore || (user.activityScore / 10);
    if (score >= 9) {
      return (
        <svg className="w-4 h-4 text-[#FF415B]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    }
    if (score >= 7) {
      return (
        <svg className="w-4 h-4 text-[#10B981]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    }
    if (score >= 3 && score < 5) {
      return (
        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    }
    if (score < 3) {
      return (
        <span className="text-[#FF415B] text-[8px] font-black uppercase tracking-widest ml-1">Très douteux</span>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-[4000] flex items-end sm:items-center justify-center animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white rounded-t-[50px] sm:rounded-[40px] h-[80vh] sm:h-[600px] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500 shadow-none border border-gray-100">
        
        <div className="p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-[#5B50FF] uppercase tracking-[0.4em] mb-1">Détails Réseau</span>
            <h3 className="text-xl font-[1000] uppercase tracking-tighter text-black leading-none">
              {getTitle()}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-black hover:bg-gray-100 transition-all active:scale-90 shadow-none border border-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 hide-scrollbar">
          {mockUsers.length > 0 ? (
            mockUsers.map(u => (
              <div 
                key={u.id}
                onClick={() => onSelectProfile(u)}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-[28px] cursor-pointer transition-all group border border-transparent hover:border-gray-100 shadow-none"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-[18px] overflow-hidden border-2 border-white group-hover:scale-105 transition-transform shadow-none">
                    <XYImage src={u.avatar} aspectRatio="aspect-square" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-1">
                       <span className="font-black text-sm uppercase tracking-tight text-black">{u.name}</span>
                       {renderTrustBadge(u)}
                    </div>
                    <span className="text-[10px] font-black text-[#5B50FF] uppercase tracking-widest">{u.handle}</span>
                  </div>
                </div>
                <button className="px-5 py-2 bg-black text-white rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-[#5B50FF] transition-all shadow-none border-none">Profil</button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 opacity-20">
               <span className="font-black text-xl uppercase tracking-widest italic">Néant Numérique</span>
            </div>
          )}
        </div>

        <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col items-center text-center">
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none mb-2">Protocole de Sécurité CORE v2.5</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Accès cryptographiquement validé.</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsModal;
