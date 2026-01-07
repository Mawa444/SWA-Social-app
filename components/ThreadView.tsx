
import React, { useState, useEffect, useRef } from 'react';
import { Post, User } from '../types';
import PostItem from './PostItem';

interface Comment {
  id: string;
  user: string;
  handle: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  reactions: string[];
  replyToId?: string;
  isMe?: boolean;
  isLiked?: boolean;
}

interface ThreadViewProps {
  post: Post;
  onBack: () => void;
  onDeletePost?: (id: string) => void;
  onArchivePost?: (id: string) => void;
  onHideAuthor?: (id: string) => void;
  onProfileClick?: (user: User) => void;
  onExploreHub?: (id: string) => void;
  onPublishQuote?: (comment: string, post: Post) => void;
}

const REACTIONS_LIST = ['❤️', '😂', '🔥', '👏', '😢', '👍'];

const ThreadView: React.FC<ThreadViewProps> = ({ 
  post, 
  onBack,
  onDeletePost,
  onArchivePost,
  onHideAuthor,
  onProfileClick,
  onExploreHub,
  onPublishQuote
}) => {
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', user: 'Lina_92', handle: '@Lina_92', avatar: 'https://picsum.photos/seed/lina/100/100', text: "Totalement d'accord avec cette analyse ! 🚀 Le futur est décentralisé.", time: '12m', likes: 12, reactions: ['🔥'] },
    { id: '2', user: 'MarcXY', handle: '@MarcXY', avatar: 'https://picsum.photos/seed/marc/100/100', text: "On attendait ce genre de contenu depuis longtemps. Merci pour l'info !", time: '5m', likes: 4, reactions: ['❤️'] },
    { id: '3', user: 'CoreUser', handle: '@CoreUser', avatar: 'https://picsum.photos/seed/core/100/100', text: "Est-ce applicable au marché actuel ?", time: '2m', likes: 0, reactions: [], replyToId: '1' },
  ]);

  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [inputText, setInputText] = useState('');
  const [activeReactionId, setActiveReactionId] = useState<string | null>(null);
  const [reportingId, setReportingId] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const commentsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReply = (comment: Comment) => {
    setReplyingTo(comment);
    inputRef.current?.focus();
  };

  const toggleLike = (id: string) => {
    setComments(prev => prev.map(c => 
      c.id === id ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 } : c
    ));
  };

  const addReaction = (id: string, emoji: string) => {
    setComments(prev => prev.map(c => 
      c.id === id ? { ...c, reactions: Array.from(new Set([...c.reactions, emoji])) } : c
    ));
    setActiveReactionId(null);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      user: 'Moi',
      handle: '@Moi',
      avatar: 'https://picsum.photos/seed/me/100/100',
      text: inputText,
      time: 'À l\'instant',
      likes: 0,
      reactions: [],
      isMe: true,
      replyToId: replyingTo?.id
    };
    setComments([...comments, newComment]);
    setInputText('');
    setReplyingTo(null);
  };

  const scrollToComments = () => {
    commentsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-screen bg-white w-full overflow-hidden">
      <style>{`
        .bubble-other { border-radius: 24px 24px 24px 4px; }
        .bubble-me { border-radius: 24px 24px 4px 24px; background: #5B50FF; color: white; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header Publication (Identité Immuable) */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-[100]">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 -ml-2 active:scale-90 transition-transform">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h2 className="text-xl font-[1000] uppercase tracking-tighter leading-none">Publication Entière</h2>
            <p className="text-[10px] font-black text-[#FF416C] uppercase tracking-[0.2em] mt-1">Source Originale • socialX CORE</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Vérifié</span>
        </div>
      </div>

      {/* Contenu Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-8 space-y-16 pb-44 scroll-smooth hide-scrollbar bg-[#F8F9FB]">
        
        {/* LA PUBLICATION : Le héros de la page */}
        <div className="max-w-3xl mx-auto w-full animate-in zoom-in-95 duration-500">
           <div className="bg-white rounded-[44px] shadow-2xl shadow-black/5 overflow-hidden border border-gray-100">
              <PostItem 
                post={post} 
                onComment={scrollToComments}
                onDeletePost={onDeletePost}
                onArchivePost={onArchivePost}
                onHideAuthor={onHideAuthor}
                onProfileClick={onProfileClick}
                onExploreHub={onExploreHub}
                onPublishQuote={onPublishQuote}
              />
           </div>
        </div>

        {/* ESPACE DISCUSSION : L'utilisateur choisit d'y aller */}
        <div ref={commentsSectionRef} className="max-w-3xl mx-auto w-full flex flex-col space-y-12">
          <div className="px-6 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Espace Discussion</h3>
            <span className="text-[10px] font-black text-gray-300 uppercase">{comments.length} Contributions</span>
          </div>

          <div className="space-y-12">
            {comments.map((comment) => {
              const isMe = comment.isMe;
              const parent = comment.replyToId ? comments.find(c => c.id === comment.replyToId) : null;

              return (
                <div key={comment.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} ${comment.replyToId ? 'pl-8' : ''}`}>
                  
                  {/* Auteur et Time */}
                  {!isMe && (
                    <div className="flex items-center space-x-3 mb-2 ml-1">
                      <img src={comment.avatar} className="w-8 h-8 rounded-full object-cover border border-gray-100 shadow-sm" />
                      <span className="text-[13px] font-black uppercase tracking-tight">{comment.user}</span>
                      <span className="text-[11px] font-bold text-gray-300">{comment.time}</span>
                    </div>
                  )}

                  {/* Bulle de texte */}
                  <div className={`relative px-6 py-4 max-w-[90%] shadow-sm ${isMe ? 'bubble-me' : 'bg-white border border-gray-100 bubble-other'}`}>
                    {parent && (
                      <div className={`mb-3 pl-3 border-l-2 py-0.5 text-[12px] font-bold opacity-70 italic ${isMe ? 'border-white/40' : 'border-[#5B50FF]'}`}>
                        @{parent.user} : {parent.text.substring(0, 30)}...
                      </div>
                    )}
                    <p className="text-[17px] font-bold leading-tight tracking-tight">{comment.text}</p>
                  </div>

                  {/* Actions (Sous la bulle) */}
                  <div className={`flex items-center mt-3 space-x-6 px-2 ${isMe ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Réactions existantes */}
                    {comment.reactions.length > 0 && (
                      <div className="flex items-center -space-x-1 mr-2">
                        {comment.reactions.map((r, i) => (
                          <div key={i} className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-sm">
                            {r}
                          </div>
                        ))}
                      </div>
                    )}

                    <button 
                      onClick={() => toggleLike(comment.id)}
                      className={`flex items-center space-x-1.5 transition-colors ${comment.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    >
                      <svg className="w-5 h-5" fill={comment.isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                      <span className="text-xs font-black">{comment.likes || ''}</span>
                    </button>

                    <button 
                      onClick={() => handleReply(comment)}
                      className="text-gray-400 hover:text-[#5B50FF] flex items-center space-x-1.5 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                      <span className="text-xs font-black uppercase tracking-widest">Répondre</span>
                    </button>

                    <div className="relative">
                      <button 
                        onClick={() => setActiveReactionId(activeReactionId === comment.id ? null : comment.id)}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>
                      </button>
                      {activeReactionId === comment.id && (
                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex items-center bg-white shadow-2xl border border-gray-100 rounded-full px-4 py-2 space-x-3 animate-in fade-in zoom-in-90 duration-200 z-[110]">
                          {REACTIONS_LIST.map(emoji => (
                            <button key={emoji} onClick={() => addReaction(comment.id, emoji)} className="text-2xl hover:scale-125 transition-transform active:scale-90">{emoji}</button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => setReportingId(comment.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" /></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Barre de saisie (Toujours là, mais discrète) */}
      <div className="bg-white border-t border-gray-100 p-4 pb-10 shadow-2xl relative z-[200]">
        <div className="max-w-4xl mx-auto space-y-3">
          {replyingTo && (
            <div className="flex items-center justify-between bg-gray-50 px-5 py-3 rounded-2xl animate-in slide-in-from-bottom-2">
               <div className="flex flex-col">
                 <span className="text-[10px] font-black text-[#5B50FF] uppercase tracking-widest leading-none">Réponse à</span>
                 <span className="text-sm font-black text-black">@{replyingTo.user}</span>
               </div>
               <button onClick={() => setReplyingTo(null)} className="p-2 text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></button>
            </div>
          )}
          
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea 
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Votre avis sur cette publication..."
                className="w-full bg-gray-100 border-none rounded-[24px] py-4 px-6 pr-14 text-[17px] font-bold placeholder:text-gray-400 focus:ring-4 focus:ring-[#5B50FF]/5 transition-all resize-none max-h-32 shadow-inner"
                rows={1}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={`absolute right-2 bottom-2 w-11 h-11 rounded-full flex items-center justify-center transition-all ${inputText.trim() ? 'bg-[#5B50FF] text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Signalement Simple */}
      {reportingId && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm" onClick={() => setReportingId(null)}>
           <div className="w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-[1000] uppercase tracking-tighter mb-6 text-center">Signaler</h3>
              <div className="space-y-2">
                {['Spam', 'Haine', 'Désinformation', 'Autre'].map(reason => (
                  <button key={reason} onClick={() => setReportingId(null)} className="w-full p-4 bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-xl text-left font-black text-xs uppercase tracking-widest transition-all">
                    {reason}
                  </button>
                ))}
                <button onClick={() => setReportingId(null)} className="w-full mt-4 p-4 text-gray-400 font-black text-xs uppercase tracking-widest">Annuler</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ThreadView;
