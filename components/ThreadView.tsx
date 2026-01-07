
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Post, User } from '../types';
import PostItem from './PostItem';

interface Comment {
  id: string;
  user: string;
  handle: string;
  avatar: string;
  text: string;
  time: string;
  myReaction?: string; 
  othersReactions: string[]; 
  replyToId?: string;
  isMe?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  rotation: number;
  vr: number;
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

// Ordre des emojis mis à jour selon la demande : ❤️ 🙏 😂 😱 😭 😡 💩 🎁
const REACTIONS_LIST = ['❤️', '🙏', '😂', '😱', '😭', '😡', '💩', '🎁'];

const ThreadView: React.FC<ThreadViewProps> = ({ 
  post, 
  onBack,
  onDeletePost,
  onProfileClick
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleString('fr-FR', { 
      day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' 
    });
  };

  const [comments, setComments] = useState<Comment[]>([
    { id: '1', user: 'Lina Horizon', handle: '@lina_92', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200', text: "Totalement d'accord avec cette analyse ! 🚀 Le futur est décentralisé.", time: '12/05/24 14:20', othersReactions: ['❤️', '🎁'] },
    { id: '2', user: 'Marc XY', handle: '@marc_xy', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200', text: "On attendait ce genre de contenu depuis longtemps. Merci pour l'info !", time: '12/05/24 14:35', othersReactions: ['🙏'] },
  ]);

  const [postReaction, setPostReaction] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [inputText, setInputText] = useState('');
  const [activeReactionPickerId, setActiveReactionPickerId] = useState<string | null>(null);
  const [pressingId, setPressingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [explodingId, setExplodingId] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const requestRef = useRef<number>(null);
  const longPressTimer = useRef<number | null>(null);
  const isLongPressActive = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    REACTIONS_LIST.forEach(emoji => counts[emoji] = 0);
    if (postReaction) counts[postReaction]++;
    comments.forEach(c => {
      if (c.myReaction) counts[c.myReaction]++;
      c.othersReactions.forEach(r => { if (counts[r] !== undefined) counts[r]++; });
    });
    return {
      reactions: counts,
      messageCount: comments.length,
      totalReactions: Object.values(counts).reduce((a, b) => a + b, 0)
    };
  }, [comments, postReaction]);

  const animateParticles = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.05; 
      p.vx += 0.02; 
      p.rotation += p.vr;
      p.life -= 0.01;
      p.alpha = Math.max(0, p.life);

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    particles.current = particles.current.filter(p => p.life > 0);
    requestRef.current = requestAnimationFrame(animateParticles);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateParticles);
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    document.body.style.overflow = 'hidden'; 
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, []);

  const triggerExplosion = (targetId: string, primaryColor: string, secondaryColor: string) => {
    const element = document.getElementById(`bubble-${targetId}`);
    if (!element) return;

    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 180; i++) {
      particles.current.push({
        x: rect.left + Math.random() * rect.width,
        y: rect.top + Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14,
        size: Math.random() * 8 + 2,
        color: Math.random() > 0.2 ? primaryColor : secondaryColor,
        alpha: 1,
        life: Math.random() * 0.9 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.25
      });
    }

    setExplodingId(targetId);
    if (window.navigator?.vibrate) window.navigator.vibrate([40, 30, 100]);
  };

  const toggleReaction = (targetId: string, emoji: string) => {
    if (targetId === post.id) {
      setPostReaction(prev => prev === emoji ? null : emoji);
    } else {
      setComments(prev => prev.map(c => 
        c.id === targetId ? { ...c, myReaction: c.myReaction === emoji ? undefined : emoji } : c
      ));
    }
    closePicker();
    if (window.navigator?.vibrate) window.navigator.vibrate(20);
  };

  const closePicker = () => {
    setActiveReactionPickerId(null);
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = (targetId: string, isMe: boolean = false, isMainPost: boolean = false) => {
    if (confirmDeleteId !== targetId) return;

    let pColor = '#FFFFFF';
    let sColor = '#EEEEEE';
    
    if (isMe) { pColor = '#5B50FF'; sColor = '#FFFFFF'; }
    else if (isMainPost) { pColor = '#FFFFFF'; sColor = '#5B50FF'; }

    triggerExplosion(targetId, pColor, sColor);

    setTimeout(() => {
      if (targetId === post.id) {
        if (onDeletePost) {
          onDeletePost(post.id);
          onBack();
        }
      } else {
        setComments(prev => prev.filter(c => c.id !== targetId));
      }
      setExplodingId(null);
      setConfirmDeleteId(null);
      setActiveReactionPickerId(null);
    }, 400);
  };

  const handleTrashClick = (e: React.MouseEvent, targetId: string) => {
    e.stopPropagation();
    setConfirmDeleteId(targetId);
    if (window.navigator?.vibrate) window.navigator.vibrate(40);
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDeleteId(null);
    if (window.navigator?.vibrate) window.navigator.vibrate(15);
  };

  const startPress = (id: string, comment?: Comment) => {
    if (explodingId) return;
    setPressingId(id);
    isLongPressActive.current = false;
    longPressTimer.current = window.setTimeout(() => {
      isLongPressActive.current = true;
      if (comment) {
        setReplyingTo(comment);
        inputRef.current?.focus();
      }
      setPressingId(null);
      if (window.navigator?.vibrate) window.navigator.vibrate(50);
    }, 450); 
  };

  const endPress = (id: string) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (!isLongPressActive.current && pressingId === id) {
      setActiveReactionPickerId(prev => prev === id ? null : id);
      setConfirmDeleteId(null);
    }
    setPressingId(null);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      user: 'Moi',
      handle: '@moi',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      text: inputText,
      time: formatTime(new Date()),
      othersReactions: [],
      isMe: true,
      replyToId: replyingTo?.id
    };
    setComments([...comments, newComment]);
    setInputText('');
    setReplyingTo(null);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F1F3F5] w-full overflow-hidden relative">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1000]" />

      <style>{`
        .bubble-other { 
          border-radius: 28px 28px 28px 6px; 
          background: #FFFFFF;
          border: 2px solid #EEE;
          transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
        }
        .bubble-me { 
          border-radius: 28px 28px 6px 28px; 
          background: #5B50FF; 
          color: white;
          border: 2px solid #5B50FF;
          transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
        }
        .bubble-pressing { transform: scale(0.96); }
        .bubble-exploding { 
          opacity: 0 !important; 
          transform: scale(1.15) !important;
          pointer-events: none;
        }
        
        .danger-target {
          border-color: #EF4444 !important;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2), 0 10px 40px rgba(239, 68, 68, 0.15);
          animation: danger-pulse 1.2s infinite ease-in-out, danger-shake 0.4s ease-in-out;
          z-index: 10;
        }

        @keyframes danger-pulse {
          0% { border-color: #EF4444; }
          50% { border-color: #B91C1C; }
          100% { border-color: #EF4444; }
        }

        @keyframes danger-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }

        .reaction-picker-attached {
          background: #FFF;
          border: 2px solid #5B50FF;
          border-radius: 32px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          z-index: 300;
          box-shadow: 0 25px 60px rgba(0,0,0,0.15);
          animation: pickerFade 0.2s cubic-bezier(0.2, 0, 0, 1.3);
          transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
          width: 460px;
          height: 56px;
          justify-content: center;
          gap: 4px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          overflow: hidden;
        }

        .reaction-picker-danger {
          background: #EF4444 !important;
          border-color: #B91C1C !important;
        }

        .dock-item {
          width: 42px;
          height: 42px;
          transition: transform 0.2s cubic-bezier(0.1, 0, 0.2, 1.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          cursor: pointer;
        }

        .dock-item:hover { transform: scale(1.4) translateY(-6px); z-index: 10; }

        @keyframes pickerFade {
          from { opacity: 0; transform: translate(-50%, 20px) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }

        .picker-divider {
          width: 2px;
          height: 24px;
          background: #F1F3F5;
          margin: 0 12px;
          flex-shrink: 0;
        }
      `}</style>

      {/* Header Discussion */}
      <div className="flex items-center justify-between px-6 py-6 border-b-2 border-gray-100 bg-white sticky top-0 z-[100] shrink-0">
        <div className="flex items-center space-x-6">
          <button onClick={onBack} className="p-3 bg-gray-50 rounded-full active:scale-90 transition-transform">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="text-3xl font-[1000] uppercase tracking-tighter text-black leading-none">DISCUSSION</h2>
        </div>
        <div className="bg-black px-5 py-2.5 rounded-full flex items-center space-x-3">
           <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
           <span className="text-[11px] font-black uppercase text-white leading-none tracking-widest">Actif</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8 space-y-12 pb-60 hide-scrollbar">
        {/* Main Post Bubble */}
        <div className="max-w-4xl mx-auto w-full relative">
           <div 
             id={`bubble-${post.id}`}
             onMouseDown={() => startPress(post.id)}
             onMouseUp={() => endPress(post.id)}
             className={`bg-white rounded-[44px] border-[3px] border-gray-100 overflow-hidden relative transition-all ${activeReactionPickerId === post.id ? 'border-[#5B50FF]' : ''} ${pressingId === post.id ? 'scale-[0.99]' : ''} ${confirmDeleteId === post.id ? 'danger-target' : ''} ${explodingId === post.id ? 'bubble-exploding' : ''}`}
           >
              <PostItem post={post} />
           </div>

           {activeReactionPickerId === post.id && !explodingId && (
             <div 
               onClick={() => handleConfirmDelete(post.id, false, true)}
               className={`reaction-picker-attached -top-12 ${confirmDeleteId === post.id ? 'reaction-picker-danger' : ''}`}
             >
                {confirmDeleteId === post.id ? (
                  <div className="w-full flex items-center justify-between px-6 animate-in fade-in zoom-in-95 duration-200">
                    <span className="text-white font-black uppercase tracking-tight text-[13px] relative z-10">Supprimer la publication ?</span>
                    <button onClick={cancelDelete} className="bg-white text-[#5B50FF] px-6 py-2 rounded-2xl text-[11px] font-[1000] uppercase tracking-widest transition-all active:scale-90">NON</button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1 flex-1 justify-center">
                      {REACTIONS_LIST.map(emoji => (
                        <button key={emoji} onClick={(e) => { e.stopPropagation(); toggleReaction(post.id, emoji); }} className="dock-item">{emoji}</button>
                      ))}
                    </div>
                    <div className="picker-divider" />
                    <button onClick={(e) => handleTrashClick(e, post.id)} className="dock-item text-black hover:text-red-500 transition-colors">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </button>
                  </>
                )}
             </div>
           )}
        </div>

        {/* Audit Stats Board */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-[32px] border-2 border-gray-100 p-8 flex items-center justify-between">
            <div className="flex items-center space-x-12">
               <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase text-slate-600 mb-2 tracking-widest">Messages</span>
                  <span className="text-4xl font-[1000] text-green-600 leading-none">{stats.messageCount}</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase text-slate-600 mb-2 tracking-widest">Votes</span>
                  <span className="text-4xl font-[1000] text-[#5B50FF] leading-none">{stats.totalReactions}</span>
               </div>
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-2xl border-2 border-white overflow-x-auto hide-scrollbar">
              {REACTIONS_LIST.map(emoji => {
                const count = stats.reactions[emoji];
                if (count === 0) return null;
                return (
                  <div key={emoji} className="flex items-center bg-white border border-gray-100 px-3 py-1.5 rounded-xl gap-2 shadow-sm">
                    <span className="text-xl">{emoji}</span>
                    <span className="text-sm font-black text-black">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-14 space-y-16">
            {comments.map((comment) => (
              <div key={comment.id} className={`flex flex-col ${comment.isMe ? 'items-end' : 'items-start'}`}>
                {/* Identity Header: Name (Bold/Black) + Handle (@ lowercase/black) */}
                <div className={`flex items-center space-x-4 mb-3 ${comment.isMe ? 'flex-row-reverse space-x-reverse mr-1' : 'ml-1'}`}>
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                    <img src={comment.avatar} className="w-full h-full object-cover" />
                  </div>
                  <div className={`flex flex-col ${comment.isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-[15px] font-[1000] uppercase text-black leading-none">{comment.user}</span>
                    <span className="text-[13px] font-medium text-black lowercase tracking-normal mt-1">{comment.handle}</span>
                  </div>
                </div>

                <div className="relative w-full flex flex-col" style={{ alignItems: comment.isMe ? 'flex-end' : 'flex-start' }}>
                  {activeReactionPickerId === comment.id && !explodingId && (
                    <div 
                      onClick={() => handleConfirmDelete(comment.id, !!comment.isMe)}
                      className={`reaction-picker-attached bottom-full mb-5 ${comment.isMe ? 'right-0' : 'left-0'} ${confirmDeleteId === comment.id ? 'reaction-picker-danger' : ''}`}
                    >
                       {confirmDeleteId === comment.id ? (
                         <div className="w-full flex items-center justify-between px-6 animate-in fade-in zoom-in-95 duration-200">
                           <span className="text-white font-black uppercase tracking-tight text-[12px] relative z-10">Supprimer le message ?</span>
                           <button onClick={cancelDelete} className="bg-white text-[#5B50FF] px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">NON</button>
                         </div>
                       ) : (
                         <>
                          <div className="flex items-center gap-1 flex-1 justify-center">
                            {REACTIONS_LIST.map(emoji => (
                              <button key={emoji} onClick={(e) => { e.stopPropagation(); toggleReaction(comment.id, emoji); }} className="dock-item">{emoji}</button>
                            ))}
                          </div>
                          <div className="picker-divider" />
                          <button onClick={(e) => handleTrashClick(e, comment.id)} className="dock-item text-black hover:text-red-500 transition-colors">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                          </button>
                         </>
                       )}
                    </div>
                  )}
                  <div 
                    id={`bubble-${comment.id}`}
                    onMouseDown={(e) => { e.stopPropagation(); startPress(comment.id, comment); }}
                    onMouseUp={(e) => { e.stopPropagation(); endPress(comment.id); }}
                    className={`relative px-8 py-6 max-w-[90%] cursor-pointer ${comment.isMe ? 'bubble-me' : 'bubble-other'} ${pressingId === comment.id ? 'bubble-pressing' : ''} ${confirmDeleteId === comment.id ? 'danger-target' : ''} ${explodingId === comment.id ? 'bubble-exploding' : ''}`}
                  >
                    <p className="text-[17px] font-medium leading-[1.5] tracking-tight">{comment.text}</p>
                    <div className={`absolute -bottom-4 ${comment.isMe ? 'left-6' : 'right-6'} flex -space-x-1.5`}>
                       {comment.myReaction && <div className="bg-white border-2 border-[#5B50FF] rounded-full px-2.5 py-1 text-[14px] font-black z-10 shadow-sm">{comment.myReaction}</div>}
                    </div>
                  </div>
                  {/* Timestamp anchored to the corner of the bubble */}
                  <span className={`text-[10px] font-black text-slate-600 uppercase mt-2 tracking-widest ${comment.isMe ? 'text-right' : 'text-left'}`}>{comment.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Persistent Input Bar */}
      <div className="bg-white border-t-2 border-gray-200 p-6 pb-12 relative z-[200]">
        <div className="max-w-4xl mx-auto w-full">
          {replyingTo && (
            <div className="flex items-center justify-between bg-gray-50 px-6 py-4 rounded-2xl border border-gray-200 animate-in slide-in-from-bottom-2 mb-4">
               <span className="text-[11px] font-black uppercase tracking-widest text-[#5B50FF]">Réponse à {replyingTo.handle}</span>
               <button onClick={() => setReplyingTo(null)} className="p-1 text-slate-500 hover:text-black transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
          )}
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea 
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Votre message..."
                className="w-full bg-[#F8F9FB] border-none rounded-[32px] py-6 px-9 pr-24 text-xl font-bold focus:bg-white focus:ring-4 focus:ring-[#5B50FF]/10 transition-all resize-none max-h-40"
                rows={1}
              />
              <button onClick={handleSendMessage} disabled={!inputText.trim()} className={`absolute right-4 bottom-3 w-16 h-16 rounded-full flex items-center justify-center transition-all ${inputText.trim() ? 'bg-[#5B50FF] text-white shadow-lg shadow-[#5B50FF]/20' : 'bg-gray-200 text-gray-400'}`}>
                <svg className="w-9 h-9 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadView;
