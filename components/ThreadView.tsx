
import React, { useState, useEffect, useRef } from 'react';
import { Post } from '../types';
import PostHeader from './post/PostHeader';
import PostContent from './post/PostContent';
import PostMedia from './post/PostMedia';
import PostActions from './post/PostActions';

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  reactions: string[];
  replyTo?: string;
  replyToUser?: string;
  isMasked?: boolean;
}

interface ThreadViewProps {
  post: Post;
  onBack: () => void;
}

const REACTION_OPTIONS = ['🔥', '❤️', '😂', '👏', '😮', '😢', '💯'];

const ThreadView: React.FC<ThreadViewProps> = ({ post, onBack }) => {
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [reactionPickerId, setReactionPickerId] = useState<string | null>(null);
  const [swipeX, setSwipeX] = useState(0);
  const [swipingId, setSwipingId] = useState<string | null>(null);
  
  const [comments, setComments] = useState<Comment[]>([
    { 
      id: 'c1', 
      user: 'Lina_92', 
      avatar: 'https://picsum.photos/seed/lina/80/80',
      text: 'Totalement d\'accord avec cette analyse ! 🚀 Le futur est décentralisé et SWA. CORE en est la preuve.', 
      time: '12m',
      likes: 12,
      reactions: ['🔥', '👏']
    },
    { 
      id: 'c2', 
      user: 'MarcSWA', 
      avatar: 'https://picsum.photos/seed/marc/80/80',
      text: 'On attendait ce genre de contenu depuis longtemps. Merci pour le partage.', 
      time: '5m',
      likes: 4,
      reactions: ['❤️']
    },
    { 
      id: 'c3', 
      user: 'CoreUser', 
      avatar: 'https://picsum.photos/seed/core/80/80',
      text: 'Est-ce que tu penses que c\'est applicable au marché actuel ?', 
      time: '2m',
      likes: 0,
      reactions: [],
      replyTo: 'c1',
      replyToUser: 'Lina_92'
    },
  ]);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const touchStartX = useRef<number>(0);
  const longPressTimer = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSend = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      user: 'Moi',
      avatar: 'https://picsum.photos/seed/myuser/100/100',
      text: commentText,
      time: 'À l\'instant',
      likes: 0,
      reactions: [],
      replyTo: replyingTo?.id,
      replyToUser: replyingTo?.user
    };
    setComments([...comments, newComment]);
    setCommentText('');
    setReplyingTo(null);
  };

  const handleReply = (comment: Comment) => {
    setReplyingTo(comment);
    setReactionPickerId(null);
    setActiveMenu(null);
    inputRef.current?.focus();
    if ('vibrate' in navigator) navigator.vibrate(15);
  };

  const toggleReaction = (id: string, emoji: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === id) {
        const hasEmoji = c.reactions.includes(emoji);
        return {
          ...c,
          reactions: hasEmoji ? c.reactions.filter(r => r !== emoji) : [...c.reactions, emoji]
        };
      }
      return c;
    }));
    setReactionPickerId(null);
    if ('vibrate' in navigator) navigator.vibrate(30);
  };

  const handleMask = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, isMasked: true } : c));
    setActiveMenu(null);
  };

  const onTouchStart = (e: React.TouchEvent, id: string) => {
    touchStartX.current = e.touches[0].clientX;
    setSwipingId(id);
    setSwipeX(0);

    longPressTimer.current = window.setTimeout(() => {
      setReactionPickerId(id);
      if ('vibrate' in navigator) navigator.vibrate(40);
    }, 600);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!swipingId) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    
    if (Math.abs(diff) > 15 && longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    const damping = Math.abs(diff) > 130 ? 0.25 : 0.75;
    setSwipeX(diff * damping);
  };

  const onTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    if (swipingId) {
      const target = comments.find(c => c.id === swipingId);
      if (target && !target.isMasked) {
        if (swipeX > 110) handleReply(target);
        else if (swipeX < -110) setActiveMenu(swipingId);
      }
    }
    setSwipingId(null);
    setSwipeX(0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white w-full max-w-4xl mx-auto border-x border-gray-100 relative overflow-x-hidden">
      <style>{`
        @keyframes reaction-pop {
          0% { transform: scale(0.3) translateY(40px); opacity: 0; }
          70% { transform: scale(1.15) translateY(-8px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-reaction-pop {
          animation: reaction-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* HEADER FIXE : RÉPLIQUE EXACTE DE LA CAPTURE */}
      <div className="sticky top-0 z-[210] bg-white border-b border-gray-100 px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <button onClick={onBack} className="p-1 -ml-2 transition-transform active:scale-75">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex flex-col">
            <h2 className="text-[28px] font-[1000] italic tracking-tighter uppercase leading-none text-black">DISCUSSION</h2>
            <div className="flex items-center mt-1.5 space-x-2">
              <span className="w-2.5 h-2.5 bg-[#5B50FF]/60 rounded-full" />
              <span className="text-[14px] font-[900] text-gray-400 uppercase tracking-widest leading-none">4 PARTICIPANTS</span>
            </div>
          </div>
        </div>
        <div className="flex items-center -space-x-2.5">
           <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
             <img src="https://picsum.photos/seed/u1/80/80" className="w-full h-full object-cover" />
           </div>
           <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
             <img src="https://picsum.photos/seed/u2/80/80" className="w-full h-full object-cover" />
           </div>
           <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
             <img src="https://picsum.photos/seed/u3/80/80" className="w-full h-full object-cover" />
           </div>
        </div>
      </div>

      <div className="flex-1 pb-64">
        <div className="p-6 bg-white border-b border-gray-100 mb-6">
           <PostHeader author={post.author} timestamp={post.timestamp} />
           <div className="mt-3">
             <PostContent content={post.content} />
           </div>
           <PostMedia image={post.image} images={post.images} video={post.video} />
           <PostActions stats={post.stats} />
        </div>

        <div className="flex flex-col px-4 py-4 space-y-12">
           {comments.map((comment) => {
             const isMe = comment.user === 'Moi';
             const isSwipingThis = swipingId === comment.id;
             const currentX = isSwipingThis ? swipeX : 0;

             return (
               <div 
                 key={comment.id} 
                 className={`flex flex-col w-full relative transition-all duration-300 ${comment.isMasked ? 'opacity-20 pointer-events-none' : ''}`}
                 onTouchStart={(e) => onTouchStart(e, comment.id)}
                 onTouchMove={onTouchMove}
                 onTouchEnd={onTouchEnd}
               >
                  <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
                    <div className={`transition-all duration-300 ${swipeX > 70 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                      <svg className="w-10 h-10 text-[#5B50FF]" fill="currentColor" viewBox="0 0 24 24"><path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                    </div>
                    <div className={`transition-all duration-300 ${swipeX < -70 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                      <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 16.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" /></svg>
                    </div>
                  </div>

                  <div 
                    className={`flex flex-col relative transition-transform duration-100 ease-out ${isMe ? 'items-end ml-14' : 'items-start mr-14'}`}
                    style={{ transform: `translateX(${currentX}px)` }}
                  >
                    {!isMe && (
                      <div className="flex items-center space-x-3 mb-2 ml-1">
                        <img src={comment.avatar} className="w-7 h-7 rounded-full object-cover border border-gray-100 shadow-sm" />
                        <span className="text-[13px] font-[1000] text-black tracking-tight uppercase">{comment.user}</span>
                        <span className="text-[10px] font-bold text-gray-300">{comment.time}</span>
                      </div>
                    )}

                    <div 
                      className={`relative group p-5 rounded-[28px] shadow-sm transition-all duration-500 ${isMe ? 'bg-[#5B50FF] text-white rounded-tr-none' : 'bg-white text-black border border-gray-100 rounded-tl-none hover:border-gray-200'}`}
                      onContextMenu={(e) => { e.preventDefault(); setReactionPickerId(comment.id); }}
                    >
                       {comment.replyToUser && (
                         <div className={`mb-3 p-3 rounded-2xl text-[13px] border-l-[5px] overflow-hidden ${isMe ? 'bg-white/10 border-white/30 text-white/90' : 'bg-gray-50 border-[#5B50FF] text-gray-500'}`}>
                            <div className="font-[1000] uppercase text-[9px] mb-1 tracking-[0.1em] opacity-80 italic">Réponse à {comment.replyToUser}</div>
                            <p className="line-clamp-2 italic leading-snug">"{comment.text.slice(0, 50)}..."</p>
                         </div>
                       )}

                       <p className="text-[17px] font-[600] leading-snug tracking-tight">
                         {comment.text}
                       </p>

                       {isMe && (
                         <div className="mt-2 flex items-center justify-end space-x-1 text-[9px] font-[1000] text-white/40 uppercase tracking-widest">
                           <span>{comment.time}</span>
                           <span>• Lu</span>
                         </div>
                       )}

                       {reactionPickerId === comment.id && (
                         <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 flex items-center bg-white/95 backdrop-blur-3xl border border-gray-100 shadow-[0_25px_60px_rgba(0,0,0,0.2)] rounded-full px-5 py-4 space-x-5 z-[300] scale-100 origin-bottom">
                            {REACTION_OPTIONS.map((emoji, idx) => (
                              <button 
                                key={emoji} 
                                onClick={(e) => { e.stopPropagation(); toggleReaction(comment.id, emoji); }}
                                className="text-[44px] animate-reaction-pop hover:scale-150 transition-transform active:scale-90 select-none"
                                style={{ animationDelay: `${idx * 0.05}s` }}
                              >
                                {emoji}
                              </button>
                            ))}
                         </div>
                       )}

                       {comment.reactions.length > 0 && (
                         <div className={`absolute -bottom-5 flex items-center -space-x-1.5 ${isMe ? 'right-2' : 'left-2'}`}>
                           {comment.reactions.map((r, i) => (
                             <div key={i} className="bg-white border-2 border-gray-50 shadow-md rounded-full w-10 h-10 flex items-center justify-center text-2xl animate-reaction-pop">
                               {r}
                             </div>
                           ))}
                         </div>
                       )}
                    </div>
                  </div>

                  {activeMenu === comment.id && (
                    <div className="fixed inset-0 z-[500] flex items-end justify-center px-4 pb-12 bg-black/50 backdrop-blur-sm" onClick={() => setActiveMenu(null)}>
                       <div className="w-full max-w-sm bg-white rounded-[40px] p-6 shadow-2xl animate-in slide-in-from-bottom-10" onClick={e => e.stopPropagation()}>
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
                          <div className="space-y-3">
                             <button onClick={() => { handleReply(comment); setActiveMenu(null); }} className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-[#EEF2FF] rounded-[24px] transition-all font-[1000] text-[14px] uppercase tracking-widest text-black group">
                                <span>Citer & Répondre</span>
                                <svg className="w-6 h-6 text-[#5B50FF]" fill="currentColor" viewBox="0 0 24 24"><path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                             </button>
                             <button onClick={() => handleMask(comment.id)} className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 rounded-[24px] transition-all font-[1000] text-[14px] uppercase tracking-widest text-black">
                                <span>Masquer</span>
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                             </button>
                             <div className="h-[1px] bg-gray-100 my-4 mx-4" />
                             <button className="w-full flex items-center justify-between p-5 bg-red-50 text-red-600 rounded-[24px] transition-all font-[1000] text-[14px] uppercase tracking-widest">
                                <span>Signaler Core</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                             </button>
                          </div>
                       </div>
                    </div>
                  )}
               </div>
             );
           })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-12 z-[400] shadow-[0_-20px_50px_rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto flex flex-col space-y-4">
          
          {replyingTo && (
            <div className="flex items-center justify-between bg-[#F4F7FF] px-6 py-4 rounded-[28px] border border-[#5B50FF]/10 animate-in slide-in-from-bottom-4 duration-400">
              <div className="flex items-center space-x-5">
                <div className="w-1.5 h-10 bg-[#5B50FF] rounded-full" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-[1000] text-[#5B50FF] uppercase tracking-[0.2em] leading-none mb-1">Réponse à {replyingTo.user}</span>
                  <p className="text-[14px] text-gray-500 line-clamp-1 font-bold italic opacity-70">"{replyingTo.text}"</p>
                </div>
              </div>
              <button onClick={() => setReplyingTo(null)} className="p-2.5 bg-white shadow-sm border border-gray-100 rounded-full transition-all active:scale-75">
                 <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}

          <div className="flex items-end space-x-4">
            <button className="p-5 bg-gray-50 text-gray-400 hover:text-[#5B50FF] rounded-full transition-all active:scale-75 mb-1 border border-gray-100">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
            </button>
            <div className="flex-1 relative">
              <textarea 
                ref={inputRef}
                rows={1}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Exprimez-vous..."
                className="w-full bg-gray-50 border-none rounded-[32px] py-6 px-8 pr-20 text-[18px] font-bold text-black placeholder:text-gray-300 focus:ring-4 focus:ring-[#5B50FF]/5 transition-all resize-none overflow-hidden shadow-inner"
                style={{ minHeight: '76px' }}
              />
              <button 
                onClick={handleSend}
                className={`absolute right-3 bottom-3 p-5 rounded-full transition-all shadow-xl active:scale-90 ${commentText ? 'bg-[#5B50FF] text-white scale-100' : 'bg-gray-200 text-gray-400 scale-90 opacity-40'}`}
                disabled={!commentText}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadView;
