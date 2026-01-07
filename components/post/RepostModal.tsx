
import React, { useState, useRef, useEffect } from 'react';
import { Post } from '../../types';
import XYImage from '../XYImage';
import PostContent from './PostContent';

interface RepostModalProps {
  post: Post;
  onClose: () => void;
  onPublish: (comment: string) => void;
}

type ModalView = 'EDITOR' | 'SETTINGS';
type SettingsTab = 'VISIBILITY' | 'SCHEDULE' | 'INTERACTION' | 'ADVANCED';

const RepostModal: React.FC<RepostModalProps> = ({ post, onClose, onPublish }) => {
  const [view, setView] = useState<ModalView>('EDITOR');
  const [activeTab, setActiveTab] = useState<SettingsTab>('VISIBILITY');
  const [comment, setComment] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    "Initialisation CORE...",
    "Hachage SHA-512...",
    "Signature Numérique...",
    "Validation Consensus..."
  ];
  
  // États de réglages
  const [visibility, setVisibility] = useState('EVERYONE'); 
  const [replyWho, setReplyWho] = useState('EVERYONE'); 
  const [allowQuotes, setAllowQuotes] = useState(true);
  const [expiration, setExpiration] = useState('PERMANENT');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (view === 'EDITOR' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comment, view]);

  const handleSend = () => {
    setIsSending(true);
    setStep(0);
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            onPublish(comment);
            setIsSending(false);
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
  };

  const renderSettings = () => (
    <div className="flex-1 flex flex-col bg-[#F8F9FB] animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Tabs Navigation Haut de Gamme */}
      <div className="flex overflow-x-auto hide-scrollbar bg-white border-b border-gray-100 px-4">
        {[
          { id: 'VISIBILITY', label: 'Visibilité', icon: '🌍' },
          { id: 'SCHEDULE', label: 'Planning', icon: '⏰' },
          { id: 'INTERACTION', label: 'Interactions', icon: '💬' },
          { id: 'ADVANCED', label: 'Avancé', icon: '🛠️' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-shrink-0 flex items-center space-x-2 px-6 py-5 border-b-4 transition-all ${
              activeTab === tab.id ? 'border-[#5B50FF] text-black' : 'border-transparent text-gray-400'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[11px] font-[1000] uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {activeTab === 'VISIBILITY' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-2">Portée du partage</h4>
            {[
              { id: 'EVERYONE', label: 'Tout le monde', desc: 'Diffusion globale sur le registre socialX.' },
              { id: 'FOLLOWERS', label: 'Cercle Certifié', desc: 'Visible uniquement par vos abonnés authentifiés.' },
              { id: 'PRIVATE', label: 'Stockage Privé', desc: 'Sauvegardé dans votre coffre-fort numérique.' }
            ].map(opt => (
              <button 
                key={opt.id}
                onClick={() => setVisibility(opt.id)}
                className={`w-full p-6 rounded-[32px] border-2 text-left transition-all flex items-center justify-between ${
                  visibility === opt.id ? 'bg-white border-[#5B50FF] shadow-[0_20px_40px_rgba(91,80,255,0.1)]' : 'bg-white border-transparent opacity-60'
                }`}
              >
                <div className="pr-4">
                  <span className="block text-sm font-black uppercase tracking-tight mb-1">{opt.label}</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight leading-tight">{opt.desc}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-4 flex-shrink-0 transition-all ${visibility === opt.id ? 'border-[#5B50FF] bg-[#5B50FF]' : 'border-gray-100'}`} />
              </button>
            ))}
          </div>
        )}

        {activeTab === 'INTERACTION' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="p-8 bg-white rounded-[32px] border border-gray-100 flex items-center justify-between">
              <div>
                <span className="block text-sm font-black uppercase tracking-tight">Autoriser les citations</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-1">Permettre aux autres de citer votre contenu.</p>
              </div>
              <button 
                onClick={() => setAllowQuotes(!allowQuotes)}
                className={`w-14 h-8 rounded-full transition-all relative ${allowQuotes ? 'bg-[#5B50FF]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${allowQuotes ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-4">Gouvernance des réponses</h4>
              {['Tout le monde', 'Comptes vérifiés', 'Amis uniquement'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => setReplyWho(opt)}
                  className={`w-full p-5 bg-white rounded-[24px] border-2 flex items-center justify-between transition-all ${
                    replyWho === opt ? 'border-[#5B50FF] bg-white' : 'border-transparent opacity-60'
                  }`}
                >
                  <span className="text-[11px] font-black uppercase tracking-widest">{opt}</span>
                  {replyWho === opt && <div className="w-2.5 h-2.5 bg-[#5B50FF] rounded-full animate-pulse" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ADVANCED' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-2">Persistance de la donnée</h4>
            {[
              { id: 'PERMANENT', label: 'Permanent (Immuable)', desc: 'Gravé dans la blockchain socialX.' },
              { id: '24H', label: '24 Heures', desc: 'Disparaît après une journée complète.' },
              { id: '1H', label: 'Flash (1 Heure)', desc: 'Contenu ultra-éphémère.' }
            ].map(opt => (
              <button 
                key={opt.id}
                onClick={() => setExpiration(opt.id)}
                className={`w-full p-6 rounded-[32px] border-2 text-left transition-all flex items-center justify-between ${
                  expiration === opt.id ? 'bg-white border-[#FF416C] shadow-[0_20px_40px_rgba(255,65,108,0.1)]' : 'bg-white border-transparent opacity-60'
                }`}
              >
                <div>
                  <span className={`block text-sm font-black uppercase tracking-tight mb-1 ${expiration === opt.id ? 'text-[#FF416C]' : 'text-black'}`}>{opt.label}</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight leading-tight">{opt.desc}</p>
                </div>
                {expiration === opt.id && <span className="text-xl">🔥</span>}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'SCHEDULE' && (
          <div className="bg-white p-12 rounded-[44px] border border-gray-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
             <div className="w-20 h-20 bg-indigo-50 rounded-[28px] flex items-center justify-center text-4xl mb-6 shadow-inner rotate-3">🗓️</div>
             <h3 className="text-2xl font-[1000] uppercase tracking-tighter mb-2">Programmation CORE</h3>
             <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed max-w-[200px] mx-auto">Activez socialX+ pour débloquer le moteur de planification.</p>
             <button className="mt-8 px-10 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all">S'abonner</button>
          </div>
        )}
      </div>
      
      {/* Footer des réglages pour revenir en arrière proprement */}
      <div className="p-8 bg-white border-t border-gray-100">
         <button 
            onClick={() => setView('EDITOR')}
            className="w-full py-5 bg-black text-white rounded-[26px] font-black text-[11px] uppercase tracking-[0.4em] shadow-xl hover:bg-gray-900 transition-all active:scale-[0.98]"
         >
           Valider les Réglages
         </button>
      </div>
    </div>
  );

  const renderEditor = () => (
    <>
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 flex flex-col hide-scrollbar bg-white">
        {/* Post original cité */}
        <div className="bg-indigo-50/20 rounded-[44px] border-2 border-[#5B50FF] flex flex-col overflow-hidden">
          <div className="p-5 pb-2 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <XYImage src={post.author.avatar} aspectRatio="aspect-square" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-black text-black leading-none uppercase tracking-tight">{post.author.name}</span>
              <span className="text-[9px] font-black text-[#5B50FF] uppercase tracking-widest">{post.author.handle}</span>
            </div>
          </div>
          <div className="px-5 pb-6">
            <div className="text-[16px] font-bold text-gray-600 line-clamp-3 italic leading-snug">
              "{post.content}"
            </div>
          </div>
        </div>

        {/* Input Commentaire */}
        <div className="space-y-4 shrink-0">
          <textarea 
            ref={textareaRef}
            autoFocus
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Écrire une citation..."
            className="w-full bg-white border-2 border-gray-50 rounded-[32px] p-6 text-[21px] font-bold placeholder:text-gray-200 focus:border-[#5B50FF]/30 focus:ring-0 outline-none resize-none transition-all"
            rows={2}
          />
        </div>
      </div>

      {/* PIED DE PAGE : RÉGLAGES (RESTAURÉ ICI) */}
      <div className="p-6 bg-[#F8F9FB] border-t border-gray-100 flex flex-col space-y-4 rounded-t-[40px]">
        <button 
            onClick={() => setView('SETTINGS')}
            className="w-full py-5 bg-white border-2 border-gray-200 rounded-[28px] flex items-center justify-between px-8 hover:border-[#5B50FF] transition-all group active:scale-[0.98] shadow-sm"
        >
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#5B50FF]/10 rounded-xl flex items-center justify-center text-[#5B50FF] group-hover:bg-[#5B50FF] group-hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover:text-black">Réglages de la publication</span>
            </div>
            <svg className="w-4 h-4 text-gray-300 group-hover:text-[#5B50FF]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button>

        <div className="flex items-center justify-center space-x-3 opacity-40">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-widest">Protocole Chiffré CORE v2.5</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 z-[3000] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300" onClick={(e) => e.stopPropagation()}>
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }} 
      />
      <div 
        className="relative w-full max-w-3xl bg-white rounded-t-[50px] sm:rounded-[48px] h-[95vh] sm:h-auto sm:max-h-[92vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-500 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {isSending && (
          <div className="absolute inset-0 z-[3100] bg-white flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-300">
            <div className="w-20 h-20 border-[8px] border-gray-100 border-t-[#5B50FF] rounded-full animate-spin mb-8" />
            <h4 className="text-3xl font-[1000] uppercase tracking-tighter mb-2 text-black">Publication...</h4>
            <p className="text-[10px] font-black text-[#5B50FF] uppercase tracking-[0.3em]">{steps[step]}</p>
          </div>
        )}

        {/* Header Modale épuré */}
        <div className="px-8 py-4 sm:py-6 flex items-center justify-between border-b-2 border-gray-100 bg-white sticky top-0 z-30 shrink-0">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (view === 'SETTINGS') setView('EDITOR');
              else onClose();
            }} 
            className="text-[13px] font-black uppercase tracking-widest text-black hover:text-[#5B50FF] transition-colors"
          >
            {view === 'SETTINGS' ? 'Retour' : 'Fermer'}
          </button>
          
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[16px] sm:text-[18px] font-black uppercase tracking-tighter text-black leading-none">
              {view === 'SETTINGS' ? 'Réglages Partage' : (comment.trim() === '' ? 'Repartager' : 'Citer')}
            </h3>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleSend();
            }}
            className="bg-[#5B50FF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-black text-[12px] uppercase tracking-widest hover:brightness-110 active:scale-95 shadow-lg shadow-[#5B50FF]/20 transition-all"
          >
            Publier
          </button>
        </div>

        {view === 'EDITOR' ? renderEditor() : renderSettings()}
      </div>
    </div>
  );
};

export default RepostModal;
