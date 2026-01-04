
import React from 'react';

interface PostLinkProps {
  link?: {
    url: string;
    title: string;
    description: string;
  };
}

const PostLink: React.FC<PostLinkProps> = ({ link }) => {
  if (!link) return null;

  return (
    <a 
      href={link.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block mt-3 mb-4 rounded-[22px] overflow-hidden border border-gray-100 shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors group"
    >
      <div className="p-4">
        <div className="text-[14px] text-gray-500 uppercase font-bold tracking-wider mb-1 group-hover:text-[#5B50FF] transition-colors">
          {new URL(link.url).hostname}
        </div>
        <h4 className="text-[18px] font-black text-black leading-tight mb-1">
          {link.title}
        </h4>
        <p className="text-[15px] text-gray-600 line-clamp-2 leading-snug">
          {link.description}
        </p>
      </div>
    </a>
  );
};

export default PostLink;