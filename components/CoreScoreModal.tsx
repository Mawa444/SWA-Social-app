
import React from 'react';

interface CoreScoreModalProps {
  score: number;
  onClose: () => void;
}

const CoreScoreModal: React.FC<CoreScoreModalProps> = ({ score, onClose }) => {
  const pillars = [
    { label: "PoA - Authenticity", value: 98, desc: "Identité souveraine & Signature CORE validée.", icon: "🛡️" },
    { label: "PoI - Impact", value: 92, desc: "Analyse de sentiment & Accord communautaire.", icon: "🧠" },
    { label: "PoV - Vibrance", value: 85, desc: "Participation active aux Proof of Engagement.", icon: "🔋" }
  ];

  return (
    <div className="fixed inset-0 z-[4000] flex items-end sm:items-center justify-center animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl shadow-none" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white rounded-t-[50px] sm:rounded-[40px] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500 shadow-none border border-gray-100">
        
        {/* Header Audit UI */}
        <div className="bg-black p-12 text-white text-center relative shadow-none">
          <div className="absolute top-4 left-6 flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-red-600">Secure Core Link</span>
          </div>
          
          <span className="text-[10px] font-black text-[#5B50FF] uppercase tracking-[0.5em] mb-6 block">Sovereign Reputation Hub</span>
          <div className="inline-flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full border-[8px] border-[#5B50FF]/20 border-t-[#5B50FF] flex items-center justify-center shadow-none">
              <span className="text-4xl font-[1000] tabular-nums tracking-tighter">{score}</span>
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-[1000] uppercase tracking-tighter leading-none mb-2">Audit Certifié</h2>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Niveau de Confiance : ALPHA+</span>
            </div>
          </div>
        </div>

        {/* Détails Techniques */}
        <div className="p-10 space-y-10 shadow-none">
          <div className="space-y-8">
            {pillars.map((p, i) => (
              <div key={i} className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl border border-gray-100 flex-shrink-0 shadow-none">
                  {p.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-black">{p.label}</span>
                    <span className="text-xs font-black text-[#5B50FF] tabular-nums">{p.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-none">
                    <div className="h-full bg-black transition-all duration-1000 shadow-none" style={{ width: `${p.value}%` }} />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 mt-2 leading-relaxed italic">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-100 shadow-none">
            <button 
              onClick={onClose}
              className="w-full py-5 bg-black text-white rounded-[24px] font-[1000] text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-none border-none"
            >
              Fermer le Rapport d'Audit
            </button>
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest text-center mt-6">
              Aucune intervention humaine — Algorithme de consensus immuable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreScoreModal;
