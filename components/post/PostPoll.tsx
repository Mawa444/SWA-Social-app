
import React from 'react';
import { Poll } from '../../types';

interface PostPollProps {
  poll?: Poll;
}

const PostPoll: React.FC<PostPollProps> = ({ poll }) => {
  if (!poll) return null;

  return (
    <div className="mb-6 space-y-4 border-2 border-gray-100 rounded-[24px] p-6 bg-white shadow-sm">
      <h4 className="font-black text-xl mb-4 text-black leading-tight">{poll.question}</h4>
      {poll.options.map((opt, idx) => {
        const percentage = Math.round((opt.votes / poll.totalVotes) * 100);
        return (
          <div key={idx} className="relative w-full h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all active:scale-[0.99]">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-indigo-100/60 transition-all duration-700" 
              style={{ width: `${percentage}%` }}
            />
            <div className="absolute inset-0 px-5 flex items-center justify-between text-lg font-black">
              <span className="z-10 text-black">{opt.label}</span>
              <span className="z-10 text-[#5B50FF]">{percentage}%</span>
            </div>
          </div>
        )
      })}
      <div className="text-base font-bold text-gray-500 mt-4 flex items-center space-x-3">
         <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
         <span>{poll.totalVotes.toLocaleString()} votes • {poll.expiresAt} restantes</span>
      </div>
    </div>
  );
};

export default PostPoll;
