
import React from 'react';
import { PollOption } from '../../types';

interface CompetitorDetailModalProps {
  option: PollOption;
  onClose: () => void;
}

const CompetitorDetailModal: React.FC<CompetitorDetailModalProps> = ({ option, onClose }) => {
  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-72 relative">
          <img src={option.image} className="w-full h-full object-cover" alt={option.label} />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          <div className="absolute bottom-6 left-8">
            <h3 className="text-4xl font-[1000] italic tracking-tighter text-black uppercase">{option.label}</h3>
            <p className="text-gray-500 font-black text-xs tracking-widest uppercase">{option.sublabel}</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <span className="text-[10px] font-black text-[#5B50FF] uppercase tracking-[0.3em] block mb-2">BIOGRAPHIE CORE</span>
            <p className="text-gray-700 font-bold leading-relaxed text-lg italic">
              {option.bio || "Aucune information supplémentaire disponible pour le moment."}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-black text-[#5B50FF] uppercase tracking-[0.3em] block mb-4">PALMARÈS & STATS</span>
            <div className="grid grid-cols-2 gap-4">
              {option.achievements?.map((ach, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#5B50FF] rounded-full" />
                  <span className="font-black text-xs text-black uppercase truncate">{ach}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm tracking-[0.3em] uppercase shadow-lg active:scale-95 transition-all"
          >
            RETOURNER AU VOTE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompetitorDetailModal;
