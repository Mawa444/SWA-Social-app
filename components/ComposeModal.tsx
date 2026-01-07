
import React, { useState } from 'react';

interface ComposeModalProps {
  onClose: () => void;
  onPublish?: (text: string) => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ onClose, onPublish }) => {
  const [text, setText] = useState('');

  const handlePublish = () => {
    if (text.trim() && onPublish) {
      onPublish(text);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-t-[40px] sm:rounded-[40px] h-[90vh] sm:h-auto overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <button onClick={onClose} className="font-black text-sm uppercase tracking-widest text-gray-400">Annuler</button>
          <h2 className="text-xl font-[1000] uppercase tracking-tighter">Nouveau Partage</h2>
          <button 
            disabled={!text.trim()}
            onClick={handlePublish}
            className="bg-[#5B50FF] text-white px-6 py-2.5 rounded-full font-black text-sm uppercase tracking-widest disabled:opacity-30 transition-all"
          >
            Publier
          </button>
        </div>

        <div className="p-8">
          <textarea 
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Quoi de neuf sur le réseau ?"
            className="w-full border-none focus:ring-0 text-2xl font-bold placeholder:text-gray-200 min-h-[200px] resize-none"
          />
          
          <div className="grid grid-cols-2 gap-4 mt-10">
            <button className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-gray-100 transition-all">
              <span className="text-2xl mb-2">📸</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Photo / Vidéo</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-gray-100 transition-all">
              <span className="text-2xl mb-2">📊</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Créer un Vote</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gray-50/50 border-t border-gray-100">
           <div className="flex items-center space-x-3 text-gray-400">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Votre identité est protégée par CORE v2.5</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;
