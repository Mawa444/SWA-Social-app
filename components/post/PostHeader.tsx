
import React from 'react';
import { User } from '../../types';

interface PostHeaderProps {
  author: User;
  timestamp: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ author, timestamp }) => (
  <div className="flex items-start justify-between w-full mb-2">
    <div className="flex items-center space-x-3">
      <div className="w-[54px] h-[54px] rounded-full overflow-hidden flex-shrink-0">
        <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5">
          <span className="font-[1000] text-[20px] text-black leading-none tracking-tight">{author.name}</span>
          <div className="flex items-center space-x-1">
            <svg className="w-[18px] h-[18px] text-[#FF415B]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div className="w-[16px] h-[16px] bg-black rounded-[4px] flex items-center justify-center">
              <span className="text-white text-[12px] font-[1000] leading-none">+</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-[17px] text-gray-500 font-medium tracking-tight mt-0.5">
          <span>{author.handle}</span>
          <span className="text-[12px] opacity-60">•</span>
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
    <button className="text-gray-300 p-1 hover:text-black transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    </button>
  </div>
);

export default PostHeader;
