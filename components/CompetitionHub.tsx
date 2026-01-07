
import React, { useState, useEffect, useRef } from 'react';
import { Competition, PollOption } from '../types';
import { POSTS } from '../constants/mockData';

interface CompetitionHubProps {
  competition: Competition;
  onBack: () => void;
}

interface ActivityEvent {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  isPremium?: boolean;
}

const CompetitionHub: React.FC<CompetitionHubProps> = ({ competition, onBack }) => {
  const [candidates, setCandidates] = useState<PollOption[]>([]);
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [voteTokens, setVoteTokens] = useState(50);
  const activityEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const poll = POSTS.find(p => p.poll?.competitionId === competition.id)?.poll;
    if (poll) {
      setCandidates(poll.options.map(opt => ({ ...opt, momentum: Math.floor(Math.random() * 5) })));
    }
  }, [competition.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCandidates(prev => {
        const next = prev.map(c => ({
          ...c,
          votes: c.votes + Math.floor(Math.random() * 5),
          momentum: Math.floor(Math.random() * 10)
        }));
        return [...next].sort((a, b) => b.votes - a.votes);
      });

      if (Math.random() > 0.7) {
        const names = ["Thomas", "Sarah", "Marc", "Julie", "Inès", "Lucas"];
        const candidateNames = candidates.map(c => c.label);
        const newEvent: ActivityEvent = {
          id: Date.now().toString(),
          user: names[Math.floor(Math.random() * names.length)],
          action: Math.random() > 0.3 ? "a voté pour" : "a boosté",
          target: candidateNames[Math.floor(Math.random() * candidateNames.length)] || "son favori",
          time: "À l'instant",
          isPremium: Math.random() > 0.8
        };
        setActivities(prev => [...prev.slice(-15), newEvent]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [candidates]);

  useEffect(() => {
    activityEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activities]);

  const handleVote = (candidateId: string) => {
    if (voteTokens <= 0) return;
    setVoteTokens(prev => prev - 1);
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, votes: c.votes + 10 } : c));
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#F4F7FA] text-black font-sans overflow-hidden">
      
      {/* 1. HEADER DYNAMIQUE (DIRECT) */}
      <div className="bg-white px-6 py-6 pt-12 border-b border-gray-200 shadow-sm relative z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div>
              <div className="flex items-center space-x-2 mb-0.5">
                <span className="flex items-center px-2 py-0.5 bg-red-600 text-white text-[9px] font-black uppercase rounded tracking-widest animate-pulse">En Direct</span>
                <h1 className="text-xl font-[1000] uppercase tracking-tighter">{competition.title}</h1>
              </div>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Mise à jour en temps réel • {competition.totalVotes.toLocaleString()} votes</p>
            </div>
          </div>
          
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Clôture dans</span>
            <div className="flex space-x-2">
              <div className="bg-black text-white px-2 py-1 rounded font-black tabular-nums text-lg">02</div>
              <span className="text-xl font-black">:</span>
              <div className="bg-black text-white px-2 py-1 rounded font-black tabular-nums text-lg">45</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DASHBOARD PRINCIPAL */}
      <div className="flex-1 max-w-5xl mx-auto w-full flex overflow-hidden">
        
        {/* LISTE DES CANDIDATS (CLAIRE & HIÉRARCHISÉE) */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 hide-scrollbar">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[11px] font-black text-[#5B50FF] uppercase tracking-[0.3em]">Classement Officiel</h2>
            <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <span className="text-[10px] font-black uppercase">Mes votes :</span>
              <span className="text-sm font-[1000] text-[#5B50FF]">{voteTokens}</span>
              <div className="w-4 h-4 bg-[#5B50FF]/20 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#5B50FF] rounded-full" />
              </div>
            </div>
          </div>

          {candidates.map((c, i) => {
            const nextCandidate = candidates[i-1];
            const gap = nextCandidate ? nextCandidate.votes - c.votes : 0;
            const speed = c.momentum > 7 ? '🔥 Ultra-Rapide' : c.momentum > 4 ? '⚡ Rapide' : '✨ Stable';

            return (
              <div key={c.id} className={`bg-white rounded-[32px] p-6 border transition-all duration-500 shadow-sm hover:shadow-md ${i === 0 ? 'border-[#5B50FF]/40 ring-1 ring-[#5B50FF]/10' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-5">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-[1000] text-xl ${i === 0 ? 'bg-black text-white shadow-xl' : 'bg-gray-50 text-gray-300'}`}>
                      {i + 1}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img src={c.image} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm" />
                        {i === 0 && <span className="absolute -top-2 -right-2 text-2xl">👑</span>}
                      </div>
                      <div>
                        <h3 className="text-xl font-[1000] uppercase tracking-tighter leading-none mb-1">{c.label}</h3>
                        <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                          <span className="text-[#5B50FF]">{c.votes.toLocaleString()} voix</span>
                          <span>•</span>
                          <span className={c.momentum > 7 ? 'text-orange-500' : 'text-gray-400'}>{speed}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    {gap > 0 ? (
                      <div className="bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 mb-3 animate-in fade-in slide-in-from-right-2">
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Manque {gap.toLocaleString()} pour {nextCandidate.label}</span>
                      </div>
                    ) : (
                      <div className="bg-green-50 px-3 py-1.5 rounded-xl border border-green-100 mb-3">
                        <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">En tête du classement</span>
                      </div>
                    )}
                    <button 
                      onClick={() => handleVote(c.id)}
                      disabled={voteTokens <= 0}
                      className={`px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-sm active:scale-95 ${voteTokens > 0 ? 'bg-black text-white hover:bg-[#5B50FF]' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                    >
                      Voter (+10)
                    </button>
                  </div>
                </div>

                {/* Barre de progression simple et parlante */}
                <div className="relative h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className={`absolute inset-0 h-full transition-all duration-1000 ease-out rounded-full ${i === 0 ? 'bg-[#5B50FF]' : 'bg-gray-300'}`}
                    style={{ width: `${(c.votes / candidates[0].votes) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* FLUX D'ACTIVITÉ (SOCIAL PROOF ACCESSIBLE) */}
        <div className="hidden lg:flex w-[380px] flex-col border-l border-gray-200 bg-white/50 backdrop-blur-xl">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center justify-between">
              Activités Récentes
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
            {activities.map(event => (
              <div key={event.id} className="flex items-start space-x-4 animate-in slide-in-from-right-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm border ${event.isPremium ? 'bg-[#5B50FF] text-white border-[#5B50FF]' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                  {event.isPremium ? "💎" : "👤"}
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold leading-tight">
                    <span className="text-black font-black">{event.user}</span>
                    <span className="text-gray-400 font-medium"> {event.action} </span>
                    <span className="text-[#5B50FF] font-black">{event.target}</span>
                  </p>
                  <span className="text-[9px] font-black text-gray-300 uppercase mt-1 block">Il y a quelques secondes</span>
                </div>
              </div>
            ))}
            <div ref={activityEndRef} />
          </div>

          <div className="p-8 bg-white border-t border-gray-100">
             <div className="bg-[#5B50FF] rounded-3xl p-6 text-white shadow-xl shadow-[#5B50FF]/20">
                <h4 className="font-black text-sm uppercase tracking-widest mb-2 font-black underline decoration-white/30">Besoin de plus de votes ?</h4>
                <p className="text-[11px] opacity-80 font-bold leading-snug mb-4">Partagez cette compétition ou invitez vos amis pour recharger vos jetons.</p>
                <button className="w-full bg-white text-[#5B50FF] py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Partager le Hub</button>
             </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-24 left-6 right-6 flex space-x-4">
        <button className="flex-1 bg-white border border-gray-200 p-5 rounded-3xl shadow-xl flex items-center justify-center space-x-3">
           <span className="text-[10px] font-black uppercase tracking-widest">Activité</span>
           <div className="w-2 h-2 bg-green-500 rounded-full" />
        </button>
        <button className="flex-1 bg-black text-white p-5 rounded-3xl shadow-xl font-black text-[10px] uppercase tracking-widest">Aider mon favori</button>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default CompetitionHub;
