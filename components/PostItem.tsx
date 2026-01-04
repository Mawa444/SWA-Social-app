
import React from 'react';
import { Post } from '../types';
import PostHeader from './post/PostHeader';
import PostContent from './post/PostContent';
import PostMedia from './post/PostMedia';
import PostLink from './post/PostLink';
import PostPoll from './post/PostPoll';
import PostActions from './post/PostActions';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="p-4 bg-white w-full flex flex-col">
        <PostHeader author={post.author} timestamp={post.timestamp} />
        <PostContent content={post.content} />
        
        <PostMedia image={post.image} images={post.images} video={post.video} />
        <PostLink link={post.link} />
        <PostPoll poll={post.poll} />
        
        <PostActions stats={post.stats} />

        {/* Bouton Voir les réponses */}
        <button className="w-full bg-[#EEF2FF] text-[#5B50FF] font-extrabold py-4 rounded-[16px] text-[16px] flex items-center justify-between px-6 hover:bg-[#E0E7FF] active:scale-[0.98] transition-all">
          <span>Voir les {post.stats.comments} réponses</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
      
      {/* Séparateur prononcé (Gutter) entre les publications */}
      <div className="h-[10px] w-full bg-[#F3F4F6] border-y border-gray-100/50"></div>
    </div>
  );
};

export default PostItem;