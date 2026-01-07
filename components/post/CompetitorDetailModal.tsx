
import React from 'react';
import { PollOption } from '../../types';
import XYImage from '../XYImage';

interface CompetitorDetailModalProps {
  option: PollOption;
  onClose: () => void;
}

const CompetitorDetailModal: React.FC<CompetitorDetailModalProps> = ({ option, onClose }) => {
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white rounded-[44px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-80 relative">
          <XYImage src={option.image} alt={option.label} className="w-full h-full" aspectRatio="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          <div className="absolute bottom-6 left-8">
            <h3 className="text-4xl font-[1000] tracking-tighter text-black uppercase">{option.label}</h3>
            <p className="text-[#5B50FF] font-black text-xs tracking-[0.2em] uppercase mt-1">{option.sublabel}</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <span className="text-[10px] font-black text-[#5B50FF] uppercase tracking-[0.4em] block mb-2">BIOGRAPHIE CORE</span>
            <p className="text-gray-700 font-bold leading-relaxed text-lg">
              {option.bio || "Inscrit au programme XY Talents v2.5. Expert reconnu dans son domaine, ce candidat porte les valeurs de souveraineté et de créativité du réseau CORE."}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-black text-[#5B50FF] uppercase tracking-[0.4em] block mb-4">PALMARÈS & STATS</span>
            <div className="grid grid-cols-2 gap-3">
              {(option.achievements || ["TOP 10 CORE", "VÉTÉRAN XY", "ACTIF +80%"]).map((ach, i) => (
                <div key={i} className="bg-[#F5F7FF] p-4 rounded-2xl border border-[#5B50FF]/10 flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#5B50FF] rounded-full" />
                  <span className="font-black text-[10px] text-black uppercase truncate tracking-widest">{ach}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-black text-white py-6 rounded-[22px] font-black text-sm tracking-[0.4em] uppercase shadow-xl hover:bg-[#5B50FF] active:scale-95 transition-all"
          >
            RETOURNER AU VOTE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompetitorDetailModal;
