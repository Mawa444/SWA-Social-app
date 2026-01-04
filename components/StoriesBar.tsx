
import React from 'react';
import { Story } from '../types';

interface StoriesBarProps {
  stories: Story[];
}

const StoriesBar: React.FC<StoriesBarProps> = ({ stories }) => {
  return (
    <div className="flex overflow-x-auto py-5 px-3 space-x-5 hide-scrollbar border-b border-gray-50 bg-white">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center space-y-2 flex-shrink-0 min-w-[85px]">
          <div className="w-[72px] h-[72px] rounded-full p-[2.5px] border-[3px] border-[#5B50FF]">
            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-100">
              <img src={story.user.avatar} alt={story.user.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="text-xs font-bold text-gray-700 truncate w-full text-center">
            {story.user.handle}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StoriesBar;
