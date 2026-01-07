
import React from 'react';
import { Post } from '../../types';
import XYImage from '../XYImage';

interface PostOptionsMenuProps {
  post: Post;
  onClose: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onHideAuthor?: () => void;
}

const PostOptionsMenu: React.FC<PostOptionsMenuProps> = ({ 
  post, 
  onClose,
  onDelete,
  onArchive,
  onHideAuthor
}) => {
  const isMyPost = post.author.id === 'me';

  const handleAction = (action?: () => void) => {
    if (action) action();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end justify-center animate-in fade-in duration-300">
      {/* Overlay sombre avec flou */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      {/* Conteneur de la modale (Strictement identique à la capture) */}
      <div className="relative w-full max-w-xl bg-[#F8F9FB] rounded-t-[44px] shadow-2xl animate-in slide-in-from-bottom duration-500 flex flex-col overflow-hidden pb-10">
        
        {/* Handle de drag tactile */}
        <div className="pt-4 flex justify-center">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>

        {/* En-tête du post dans les options */}
        <div className="p-6">
          <div className="bg-white rounded-[32px] p-5 border border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-50 shadow-sm">
                <XYImage src={post.author.avatar} aspectRatio="aspect-square" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="font-black text-sm uppercase tracking-tight truncate">{post.author.name}</span>
                  {post.author.isVerified && (
                    <svg className="w-4 h-4 text-[#FF415B]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  )}
                </div>
                <p className="text-gray-400 text-[11px] font-bold leading-tight line-clamp-2 mt-0.5 italic">
                  "{post.content}"
                </p>
              </div>
            </div>
            {/* Carré dégradé décoratif à droite (identique capture) */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-200 via-orange-300 to-red-400 flex-shrink-0 ml-4 opacity-80 shadow-inner" />
          </div>
        </div>

        {/* Boutons violets dégradés (Action Primaires Capture) */}
        <div className="px-6 space-y-3">
          <button 
            onClick={() => handleAction(() => {
              navigator.clipboard.writeText(post.content);
            })}
            className="w-full h-20 bg-gradient-to-r from-[#7B61FF] to-[#9747FF] rounded-[28px] flex items-center justify-between px-8 text-white group active:scale-[0.98] transition-all shadow-lg shadow-[#7B61FF]/10"
          >
            <div className="flex items-center space-x-5">
              <span className="text-2xl">📋</span>
              <span className="text-sm font-[1000] uppercase tracking-[0.2em]">Copier le texte</span>
            </div>
            <svg className="w-5 h-5 opacity-40" fill="none" stroke="currentColor" strokeWidth={3.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>

          <button 
            onClick={() => handleAction()}
            className="w-full h-20 bg-gradient-to-r from-[#7B61FF] to-[#9747FF] rounded-[28px] flex items-center justify-between px-8 text-white group active:scale-[0.98] transition-all shadow-lg shadow-[#7B61FF]/10"
          >
            <div className="flex items-center space-x-5">
              <span className="text-2xl">💾</span>
              <span className="text-sm font-[1000] uppercase tracking-[0.2em]">Enregistrer les médias</span>
            </div>
            <svg className="w-5 h-5 opacity-40" fill="none" stroke="currentColor" strokeWidth={3.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Grille d'actions (🙈 Masquer / 🚫 Auteur) */}
        <div className="px-6 mt-6 grid grid-cols-2 gap-3">
          <button 
            onClick={() => handleAction(onArchive)}
            className="bg-white rounded-[32px] p-6 flex flex-col items-center justify-center space-y-3 border border-gray-100 active:scale-95 transition-all shadow-sm group hover:border-[#7B61FF]/30"
          >
            <span className="text-3xl transition-transform group-hover:scale-110">🙈</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Masquer le post</span>
          </button>

          <button 
            onClick={() => handleAction(onHideAuthor)}
            className="bg-white rounded-[32px] p-6 flex flex-col items-center justify-center space-y-3 border border-gray-100 active:scale-95 transition-all shadow-sm group hover:border-[#7B61FF]/30"
          >
            <span className="text-3xl transition-transform group-hover:scale-110">🚫</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Masquer l'auteur</span>
          </button>

          {/* Boutons Roses Signalement Capture */}
          <button 
            className="bg-[#FF416C] rounded-[32px] p-6 flex flex-col items-center justify-center space-y-3 active:scale-95 transition-all shadow-lg shadow-[#FF416C]/15 hover:brightness-105"
          >
            <div className="flex items-center space-x-2 text-white/50">
              <span className="text-lg">🚩</span>
              <div className="w-4 h-0.5 bg-white/20 rounded-full" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Signaler le post</span>
          </button>

          <button 
            className="bg-[#FF416C] rounded-[32px] p-6 flex flex-col items-center justify-center space-y-3 active:scale-95 transition-all shadow-lg shadow-[#FF416C]/15 hover:brightness-105"
          >
            <div className="flex items-center space-x-2 text-white/50">
              <span className="text-lg">👤</span>
              <div className="w-4 h-0.5 bg-white/20 rounded-full" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Signaler l'auteur</span>
          </button>
        </div>

        {/* Option de suppression réelle (si c'est mon post) */}
        {isMyPost && (
          <div className="px-6 mt-3">
            <button 
              onClick={() => handleAction(onDelete)}
              className="w-full py-5 bg-red-50 text-red-600 rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] border border-red-100 hover:bg-red-100 transition-all active:scale-[0.98]"
            >
              Supprimer définitivement
            </button>
          </div>
        )}

        {/* Bouton Fermer final (Noir Capture) */}
        <div className="px-6 mt-6 mb-4">
          <button 
            onClick={onClose}
            className="w-full h-16 bg-black text-white rounded-[24px] font-black text-sm uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostOptionsMenu;
