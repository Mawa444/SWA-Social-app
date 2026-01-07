import React from 'react';

interface PremiumModalProps {
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-black border border-white/10 rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-10 flex flex-col items-center text-center">
          <div className="w-24 h-20 bg-gradient-to-tr from-[#5B50FF] to-[#FF416C] rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-[#5B50FF]/40 rotate-12">
             <span className="text-2xl font-black text-white">socialX+</span>
          </div>
          
          <h2 className="text-4xl font-[1000] text-white uppercase tracking-tighter mb-2">socialX PREMIUM</h2>
          <p className="text-gray-400 font-bold mb-10">Accédez à l'expérience sociale ultime sans compromis.</p>

          <div className="w-full space-y-4 mb-10">
            {[
              { icon: '✨', text: 'Badge de vérification CORE' },
              { icon: '🎧', text: 'Audio Spatial High-Fidelity' },
              { icon: '🚫', text: 'Zéro publicités, 100% contenu' },
              { icon: '💎', text: '500 Jetons de vote par mois' },
            ].map((f, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/5 text-left">
                <span className="text-2xl">{f.icon}</span>
                <span className="text-white font-bold text-sm tracking-tight">{f.text}</span>
              </div>
            ))}
          </div>

          <button className="w-full bg-[#5B50FF] text-white py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase shadow-lg shadow-[#5B50FF]/30 active:scale-95 transition-all">
            S'ABONNER — 9.99€ / MOIS
          </button>
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mt-6 cursor-pointer hover:text-gray-400 transition-colors">Politique de remboursement</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;