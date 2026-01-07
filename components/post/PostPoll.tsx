
import React, { useState } from 'react';
import { Poll, PollOption } from '../../types';
import CompetitorDetailModal from './CompetitorDetailModal';
import XYImage from '../XYImage';

interface PostPollProps {
  poll?: Poll;
  onExploreHub?: (competitionId: string) => void;
}

const PostPoll: React.FC<PostPollProps> = ({ poll, onExploreHub }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [detailOption, setDetailOption] = useState<PollOption | null>(null);

  if (!poll) return null;

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    setSelectedId(optionId);
    setHasVoted(true);
    setTimeout(() => setShowResults(true), 400);
  };

  const getPercentage = (votes: number) => {
    return poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0;
  };

  // --- 1. DESIGN : AWARD (Grille Image) ---
  if (poll.type === 'AWARD') {
    return (
      <div className="my-8 bg-gray-50/50 rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-[1000] tracking-[0.4em] text-[#5B50FF] uppercase">{poll.category || 'VOTE OFFICIEL'}</span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest tabular-nums">{poll.expiresAt}</span>
          </div>
          <h4 className="text-3xl font-[1000] text-black tracking-tighter leading-tight uppercase mb-8">{poll.question}</h4>
          <div className="grid grid-cols-2 gap-4">
            {poll.options.map((opt) => {
              const isSelected = selectedId === opt.id;
              return (
                <div key={opt.id} onClick={() => handleVote(opt.id)} className={`group relative aspect-[3/4] rounded-[32px] overflow-hidden cursor-pointer border-2 transition-all duration-500 ${hasVoted ? (isSelected ? 'border-[#5B50FF] scale-100 shadow-xl' : 'opacity-40 grayscale scale-95 border-transparent') : 'border-transparent hover:border-gray-200'}`}>
                  <XYImage 
                    src={opt.image} 
                    alt={opt.label} 
                    aspectRatio="aspect-square" 
                    className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <button onClick={(e) => { e.stopPropagation(); setDetailOption(opt); }} className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/30 transition-all">i</button>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="font-black text-sm uppercase tracking-tight">{opt.label}</div>
                    <div className="text-[10px] opacity-60 font-bold uppercase tracking-widest mt-1">{opt.sublabel}</div>
                  </div>
                  {showResults && (
                    <div className="absolute inset-0 bg-[#5B50FF]/80 backdrop-blur-md flex items-center justify-center animate-in zoom-in-90 duration-500">
                      <span className="text-4xl font-[1000] text-white">{getPercentage(opt.votes)}%</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {poll.competitionId && (
          <button onClick={() => onExploreHub?.(poll.competitionId!)} className="w-full bg-black text-white py-6 font-black text-[11px] tracking-[0.4em] uppercase hover:bg-[#5B50FF] transition-all">ACCÉDER AU HUB EN DIRECT</button>
        )}
        {detailOption && <CompetitorDetailModal option={detailOption} onClose={() => setDetailOption(null)} />}
      </div>
    );
  }

  // --- 2. DESIGN : BINARY (Duel Vertical Massive) ---
  if (poll.type === 'BINARY') {
    return (
      <div className="my-8 space-y-3">
        <h4 className="font-black text-xl mb-6 text-black tracking-tighter uppercase">{poll.question}</h4>
        <div className="flex flex-col space-y-4">
          {poll.options.map((opt) => {
            const isSelected = selectedId === opt.id;
            const perc = getPercentage(opt.votes);
            return (
              <button key={opt.id} onClick={() => handleVote(opt.id)} className={`relative overflow-hidden py-8 px-8 rounded-[28px] border-2 text-left transition-all duration-500 ${hasVoted ? (isSelected ? 'bg-white border-[#5B50FF] text-[#5B50FF]' : 'bg-gray-50 border-transparent text-gray-300 opacity-40') : 'bg-gray-50 border-gray-50 text-black hover:border-gray-200 hover:bg-white active:scale-[0.98]'}`}>
                {showResults && (
                  <div className="absolute left-0 top-0 bottom-0 bg-[#5B50FF]/10 transition-all duration-1000 ease-out" style={{ width: `${perc}%` }} />
                )}
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-xl font-[1000] uppercase tracking-tighter">{opt.label}</span>
                  {showResults && <span className="text-2xl font-[1000] tabular-nums">{perc}%</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // --- 3. DESIGN : RATING (Sentiment Scale) ---
  if (poll.type === 'RATING') {
    return (
      <div className="my-8 p-8 bg-[#F5F7FF] rounded-[32px] border border-[#5B50FF]/10">
        <h4 className="font-black text-lg mb-8 text-black tracking-tighter uppercase text-center">{poll.question}</h4>
        <div className="flex justify-between items-center max-w-sm mx-auto">
          {[1, 2, 3, 4, 5].map((num) => {
            const isSelected = selectedId === num.toString();
            return (
              <button 
                key={num} 
                onClick={() => handleVote(num.toString())}
                className={`w-12 h-12 rounded-full font-black text-lg flex items-center justify-center transition-all ${hasVoted ? (isSelected ? 'bg-[#5B50FF] text-white scale-125 shadow-lg' : 'opacity-20 scale-90') : 'bg-white text-gray-400 hover:bg-[#5B50FF] hover:text-white active:scale-90 shadow-sm'}`}
              >
                {num}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
           <span>Pas du tout</span>
           <span>Totalement</span>
        </div>
      </div>
    );
  }

  // --- 4. DESIGN : PETITION ---
  if (poll.type === 'PETITION') {
    const progress = Math.min(100, (poll.totalVotes / (poll.goal || 1000000)) * 100);
    return (
      <div className="my-8 p-10 bg-black rounded-[40px] text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <span className="text-[10px] font-black text-[#5B50FF] uppercase tracking-[0.5em] mb-4 block">PÉTITION CORE</span>
          <h4 className="text-3xl font-[1000] tracking-tighter uppercase mb-8 leading-none">{poll.question}</h4>
          
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <span className="text-4xl font-[1000] tabular-nums">{poll.totalVotes.toLocaleString()}</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">GOAL: {(poll.goal || 1000000).toLocaleString()}</span>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#5B50FF] to-[#8B5CF6] transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <button onClick={() => handleVote('sign')} disabled={hasVoted} className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all shadow-xl ${hasVoted ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-[#5B50FF] hover:text-white active:scale-95'}`}>
            {hasVoted ? 'ACTION VALIDÉE' : 'SIGNER L\'ENGAGEMENT'}
          </button>
        </div>
        <div className="absolute -bottom-10 -right-10 text-[180px] font-black opacity-[0.03] select-none pointer-events-none rotate-12 italic">XY</div>
      </div>
    );
  }

  // --- 5. DESIGN : STANDARD ---
  return (
    <div className="my-8 p-2">
      <h4 className="font-black text-xl mb-6 text-black tracking-tighter uppercase">{poll.question}</h4>
      <div className="space-y-3">
        {poll.options.map((opt) => {
          const isSelected = selectedId === opt.id;
          const perc = getPercentage(opt.votes);
          return (
            <button key={opt.id} onClick={() => handleVote(opt.id)} className={`w-full relative py-6 px-8 rounded-[24px] border-2 font-black text-left transition-all overflow-hidden ${hasVoted ? (isSelected ? 'border-[#5B50FF] bg-white text-[#5B50FF]' : 'border-transparent opacity-30 grayscale scale-[0.98]') : 'bg-gray-50 border-gray-50 hover:border-gray-200 hover:bg-white active:scale-[0.98]'}`}>
              {showResults && (
                <div className="absolute left-0 top-0 bottom-0 bg-[#5B50FF]/5 transition-all duration-1000 ease-out" style={{ width: `${perc}%` }} />
              )}
              <div className="relative z-10 flex justify-between items-center">
                <span className="text-base tracking-tight">{opt.label}</span>
                {showResults && <span className="text-lg font-[1000] tabular-nums">{perc}%</span>}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex justify-between items-center px-4">
        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{poll.totalVotes.toLocaleString()} PARTICIPANTS</span>
        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{poll.expiresAt} RESTANT</span>
      </div>
    </div>
  );
};

export default PostPoll;
