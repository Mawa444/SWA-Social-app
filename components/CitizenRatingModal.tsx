
import React, { useState } from 'react';
import { User } from '../types';
import XYImage from './XYImage';

interface CitizenRatingModalProps {
  user: User;
  onClose: () => void;
}

const RatingOption = ({ label, emoji, desc, selected, onClick, color }: any) => (
  <button 
    onClick={onClick}
    className={`w-full p-6 rounded-[32px] border-2 transition-all flex items-start space-x-5 text-left group active:scale-[0.98] ${selected ? 'shadow-lg' : 'border-gray-100 bg-white hover:border-gray-200'}`}
    style={selected ? { backgroundColor: color, borderColor: color } : {}}
  >
    <div 
      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 transition-transform ${selected ? 'scale-110 bg-white/20' : 'bg-gray-50'}`}
    >
      {emoji}
    </div>
    <div className="flex flex-col pt-1">
      <span className={`text-sm font-[1000] uppercase tracking-widest ${selected ? 'text-white' : 'text-black'}`}>{label}</span>
      <p className={`text-[10px] font-bold uppercase tracking-tight mt-1 ${selected ? 'text-white/70' : 'text-gray-400'}`}>{desc}</p>
    </div>
  </button>
);

const CitizenRatingModal: React.FC<CitizenRatingModalProps> = ({ user, onClose }) => {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratings = [
    { id: 'trust', label: 'Très Fiable', emoji: '💎', color: '#FF415B', desc: 'Contenu exceptionnel, toujours véridique.' },
    { id: 'valuable', label: 'Fiable', emoji: '🛡️', color: '#10B981', desc: 'Informations sérieuses et sourcées.' },
    { id: 'neutral', label: 'Correct', emoji: '⚖️', color: '#64748B', desc: 'Contenu classique, sans problème particulier.' },
    { id: 'suspicious', label: 'Douteux', emoji: '⚠️', color: '#000000', desc: 'Attention, informations souvent incertaines.' },
    { id: 'toxic', label: 'Très douteux', emoji: '🚫', color: '#FF415B', desc: 'Désinformation grave ou comportement malveillant.' },
  ];

  const handleSubmit = () => {
    if (!selectedRating) return;
    setIsSubmitting(true);
    // Simulation signature protocole CORE
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[5000] flex items-end sm:items-center justify-center animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl shadow-none" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white rounded-t-[50px] sm:rounded-[40px] max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500 border border-gray-100 shadow-none">
        
        {isSubmitting && (
          <div className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center shadow-none">
            <div className="w-20 h-20 border-[6px] border-gray-100 border-t-[#5B50FF] rounded-full animate-spin mb-8 shadow-none" />
            <h4 className="text-2xl font-[1000] uppercase tracking-tighter mb-2">Signature de l'Audit</h4>
            <p className="text-[10px] font-black text-[#5B50FF] uppercase tracking-[0.3em]">Enregistrement sur le registre immuable...</p>
          </div>
        )}

        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10 shadow-none">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-[#5B50FF] uppercase tracking-[0.5em] mb-1">Audit Citoyen</span>
            <h3 className="text-xl font-[1000] uppercase tracking-tighter text-black">Évaluer {user.name}</h3>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shadow-none border border-gray-100 hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-4 hide-scrollbar">
          <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100 mb-8 flex items-center space-x-4 shadow-none">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-none">
               <XYImage src={user.avatar} aspectRatio="aspect-square" />
            </div>
            <p className="text-gray-500 font-bold text-sm leading-relaxed">
              Votre avis est précieux. Il permet de signaler les profils toxiques et de valoriser les sources fiables.
            </p>
          </div>

          <div className="space-y-3">
            {ratings.map(r => (
              <RatingOption 
                key={r.id} 
                {...r} 
                selected={selectedRating === r.id} 
                onClick={() => setSelectedRating(r.id)} 
              />
            ))}
          </div>
        </div>

        <div className="p-8 bg-gray-50 border-t border-gray-100">
          <button 
            disabled={!selectedRating}
            onClick={handleSubmit}
            className="w-full bg-black text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-[#5B50FF] active:scale-95 disabled:opacity-20 transition-all border-none"
          >
            VALIDER MON AVIS
          </button>
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest text-center mt-6">Protocole de consensus socialX v2.5</p>
        </div>
      </div>
    </div>
  );
};

export default CitizenRatingModal;
