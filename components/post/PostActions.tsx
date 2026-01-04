
import React from 'react';

interface PostActionsProps {
  stats: {
    comments: string;
    reposts: string;
    likes: string;
  };
}

const PostActions: React.FC<PostActionsProps> = ({ stats }) => (
  <div className="flex items-center justify-between w-full py-1.5 mb-3">
    <div className="flex items-center space-x-10 md:space-x-14">
      <button className="flex items-center space-x-2.5 text-gray-500 hover:text-gray-900 transition-all active:scale-95 group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[26px] h-[26px] opacity-80 group-hover:opacity-100">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785 0.5 0.5 0 00.37.825c1.157-.03 2.232-.418 3.158-.997a1.463 1.463 0 011.545-.12c1.282.574 2.731.887 4.241.887z" />
        </svg>
        <span className="text-[16.5px] font-[700] tracking-tight">{stats.comments}</span>
      </button>
      
      <button className="flex items-center space-x-2.5 text-gray-500 hover:text-green-600 transition-all active:scale-95 group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[26px] h-[26px] opacity-80 group-hover:opacity-100">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M7.5 12l3 3m-3-3l-3 3" />
        </svg>
        <span className="text-[16.5px] font-[700] tracking-tight">{stats.reposts}</span>
      </button>
      
      <button className="flex items-center space-x-2.5 text-gray-500 hover:text-red-500 transition-all active:scale-95 group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[26px] h-[26px] opacity-80 group-hover:opacity-100">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        <span className="text-[16.5px] font-[700] tracking-tight">{stats.likes}</span>
      </button>
    </div>

    <div className="flex items-center space-x-6">
      <button className="text-gray-500 hover:text-gray-900 transition-all active:scale-90">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[26px] h-[26px] opacity-80 hover:opacity-100">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      </button>
      <button className="text-gray-500 hover:text-gray-900 transition-all active:scale-90">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[26px] h-[26px] opacity-80 hover:opacity-100">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      </button>
    </div>
  </div>
);

export default PostActions;