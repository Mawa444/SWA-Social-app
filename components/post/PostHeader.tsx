
import React from 'react';
import { Post } from '../../types';
import XYImage from '../XYImage';
import FollowButton from '../FollowButton';

interface PostHeaderProps {
  post: Post;
  onProfileClick?: () => void;
  onOptionsClick?: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post, onProfileClick, onOptionsClick }) => {
  const { author, timestamp } = post;
  const reputationScore = author.reputationScore || (author.activityScore / 10);

  const renderTrustIndicator = () => {
    if (reputationScore >= 9) {
      return (
        <svg className="w-4 h-4 text-[#FF415B]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    }
    if (reputationScore >= 7) {
      return (
        <svg className="w-4 h-4 text-[#10B981]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="flex items-start justify-between w-full mb-3 relative">
      <div 
        className="flex items-center space-x-3 cursor-pointer group/header"
        onClick={(e) => { 
          e.stopPropagation(); 
          onProfileClick?.(); 
        }}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 group-hover/header:opacity-80 transition-opacity">
          <XYImage src={author.avatar} alt={author.name} aspectRatio="aspect-square" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span className="font-extrabold text-[17px] text-black leading-tight tracking-tight group-hover/header:text-[#5B50FF] transition-colors">
              {author.name}
            </span>
            {renderTrustIndicator()}
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600 font-semibold tracking-tight">
            <span>{author.handle}</span>
            <span className="opacity-40 text-[10px]">•</span>
            <span>{timestamp}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <FollowButton size="sm" />
        <button 
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:text-black hover:bg-gray-100 transition-all active:scale-90" 
          onClick={(e) => {
            e.stopPropagation();
            onOptionsClick?.();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
            <circle cx="5" cy="12" r="2.2" />
            <circle cx="12" cy="12" r="2.2" />
            <circle cx="19" cy="12" r="2.2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
