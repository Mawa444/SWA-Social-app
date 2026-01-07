
import React, { useState } from 'react';

interface PostActionsProps {
  stats: {
    comments: string;
    reposts: string;
    likes: string;
  };
  onComment?: () => void;
  onRepost?: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({ stats, onComment, onRepost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);

  return (
    <div className="flex items-center w-full pt-3 border-t border-gray-100 mt-2 h-14">
      {/* Bouton Discussion Dominant */}
      <button 
        onClick={(e) => { e.stopPropagation(); onComment?.(); }}
        className="flex-1 h-11 bg-[#5B50FF] text-white font-black rounded-full text-[13px] flex items-center justify-between px-6 hover:bg-[#4a40d4] transition-all active:scale-[0.98] shadow-sm"
      >
        <span className="uppercase tracking-widest truncate mr-2">Discussion ({stats.comments})</span>
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      {/* Groupe Actions Sociales - Contraste renforcé */}
      <div className="flex-none flex items-center ml-4 gap-1">
        {/* Like */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          className={`px-2 py-2 flex items-center space-x-1.5 transition-all active:scale-90 ${
            isLiked ? 'text-[#FF415B]' : 'text-gray-700 hover:text-black'
          }`}
        >
          <svg className="w-[22px] h-[22px]" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <span className="text-sm font-extrabold tabular-nums tracking-tight text-gray-800">{stats.likes}</span>
        </button>

        {/* Repost */}
        <button 
          onClick={(e) => { e.stopPropagation(); onRepost?.(); }}
          className={`px-2 py-2 flex items-center space-x-1.5 transition-all active:scale-90 ${
            isReposted ? 'text-emerald-600' : 'text-gray-700 hover:text-black'
          }`}
        >
          <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
          </svg>
          <span className="text-sm font-extrabold tabular-nums tracking-tight text-gray-800">{stats.reposts}</span>
        </button>
      </div>
    </div>
  );
};

export default PostActions;
