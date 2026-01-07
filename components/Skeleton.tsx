
import React from 'react';

export const SkeletonStory = () => (
  <div className="flex flex-col items-center space-y-2 flex-shrink-0 min-w-[85px] animate-pulse">
    <div className="w-[72px] h-[72px] rounded-full bg-gray-200" />
    <div className="w-12 h-2 bg-gray-200 rounded" />
  </div>
);

export const SkeletonPost = () => (
  <div className="p-8 bg-white rounded-[32px] border-[2px] border-[#5B50FF]/20 w-full space-y-6 animate-pulse shadow-sm">
    <div className="flex items-center space-x-4">
      <div className="w-[54px] h-[54px] rounded-full bg-gray-200" />
      <div className="space-y-2">
        <div className="w-32 h-4 bg-gray-200 rounded" />
        <div className="w-24 h-3 bg-gray-100 rounded" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="w-full h-4 bg-gray-100 rounded" />
      <div className="w-3/4 h-4 bg-gray-100 rounded" />
    </div>
    <div className="w-full aspect-video bg-gray-100 rounded-[22px]" />
    <div className="flex justify-between items-center pt-2">
      <div className="flex space-x-6">
        <div className="w-12 h-4 bg-gray-100 rounded" />
        <div className="w-12 h-4 bg-gray-100 rounded" />
      </div>
      <div className="w-8 h-4 bg-gray-100 rounded" />
    </div>
  </div>
);
