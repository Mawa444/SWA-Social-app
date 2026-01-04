
import React from 'react';
import { User } from '../../types';

interface PostHeaderProps {
  author: User;
  timestamp: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ author, timestamp }) => (
  <div className="flex items-start justify-between w-full mb-1">
    <div className="flex items-center space-x-3">
      <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
        <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5">
          <span className="font-[900] text-[19px] text-black leading-none tracking-tight">{author.name}</span>
          {author.isVerified && (
            <div className="flex items-center space-x-1">
              <span className="text-[#FF415B]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </span>
              <div className="w-[17px] h-[17px] bg-black rounded-[3px] flex items-center justify-center">
                <span className="text-white text-[11px] font-[900]">+</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1 text-[16px] text-gray-500 font-medium tracking-tight mt-0.5">
          <span>{author.handle}</span>
          <span>•</span>
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
    <button className="text-[#AAB8C2] p-1 hover:bg-gray-50 rounded-full transition-colors self-start">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    </button>
  </div>
);

export default PostHeader;