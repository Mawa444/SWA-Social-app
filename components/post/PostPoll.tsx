
import React, { useState } from 'react';
import { Poll, PollOption } from '../../types';
import CompetitorDetailModal from './CompetitorDetailModal';

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
    setTimeout(() => setShowResults(true), 600);
  };

  const getPercentage = (votes: number) => {
    return poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0;
  };

  if (poll.type === 'AWARD') {
    return (
      <div className="my-4 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#5B50FF] uppercase">{poll.category}</span>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest tabular-nums">{poll.expiresAt} Restant</span>
          </div>
          <h4 className="text-2xl font-[1000] text-black tracking-tighter leading-none uppercase italic mb-6">
            {poll.question}
          </h4>

          <div className="grid grid-cols-2 gap-2 relative">
            {poll.options.map((opt) => {
              const perc = getPercentage(opt.votes);
              const isSelected = selectedId === opt.id;

              return (
                <div 
                  key={opt.id}
                  className={`relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border-2 ${
                    hasVoted 
                      ? (isSelected ? 'border-[#5B50FF] shadow-lg z-10' : 'border-transparent opacity-30 grayscale scale-[0.98]')
                      : 'border-gray-50 hover:border-[#5B50FF]'
                  }`}
                  onClick={() => handleVote(opt.id)}
                >
                  <img src={opt.image} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Info Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setDetailOption(opt); }}
                    className="absolute top-3 right-3 w-7 h-7 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/30 transition-all active:scale-90"
                  >
                    <span className="font-black italic text-xs">i</span>
                  </button>

                  {/* Results Overlay */}
                  {showResults && (
                    <div className="absolute inset-0 bg-[#5B50FF]/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95 duration-500">
                      <span className="text-4xl font-[1000] text-white italic tracking-tighter mb-0.5">{perc}%</span>
                      {isSelected && (
                        <div className="mt-2 px-3 py-1 bg-white text-[#5B50FF] rounded-lg font-black text-[8px] uppercase tracking-widest">
                          SÉLECTIONNÉ
                        </div>
                      )}
                    </div>
                  )}

                  {!showResults && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <h5 className="text-white font-black text-sm leading-tight italic uppercase truncate">{opt.label}</h5>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 pt-4 bg-gray-50/50 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
             <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                   <img src={`https://picsum.photos/seed/${i+10}/40/40`} />
                 </div>
               ))}
             </div>
             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{poll.totalVotes.toLocaleString()} Votes enregistrés</span>
          </div>

          {poll.competitionId && onExploreHub && (
            <button 
              onClick={() => onExploreHub(poll.competitionId!)}
              className="w-full bg-black text-white py-4 rounded-xl font-black text-[10px] tracking-[0.3em] uppercase hover:bg-[#5B50FF] active:scale-[0.98] transition-all flex items-center justify-center space-x-3"
            >
              <span>Accéder au Hub Live</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}
        </div>

        {detailOption && (
          <CompetitorDetailModal option={detailOption} onClose={() => setDetailOption(null)} />
        )}
      </div>
    );
  }

  // Rendu Standard
  return (
    <div className="mb-4 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
      <h4 className="font-black text-lg mb-5 text-black italic tracking-tighter uppercase">{poll.question}</h4>
      <div className="space-y-2">
        {poll.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleVote(opt.id)}
            className={`w-full py-4 px-6 rounded-xl border-2 font-black text-left transition-all relative overflow-hidden flex justify-between items-center ${
              selectedId === opt.id ? 'bg-[#5B50FF] text-white border-[#5B50FF]' : 'bg-gray-50 border-gray-100 text-gray-600'
            }`}
          >
            {showResults && (
              <div 
                className="absolute left-0 top-0 bottom-0 bg-white/10 transition-all duration-1000"
                style={{ width: `${getPercentage(opt.votes)}%` }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
            {showResults && <span className="relative z-10 text-xs font-black">{getPercentage(opt.votes)}%</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostPoll;
