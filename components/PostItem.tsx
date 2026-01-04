
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
  onExploreHub?: (id: string) => void;
  onComment?: (post: Post) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onExploreHub, onComment }) => {
  return (
    <div className="flex flex-col w-full group border-b border-gray-100">
      <div className="p-6 bg-white w-full flex flex-col">
        <PostHeader author={post.author} timestamp={post.timestamp} />
        <PostContent content={post.content} />
        
        <PostMedia image={post.image} images={post.images} video={post.video} />
        <PostLink link={post.link} />
        <PostPoll poll={post.poll} onExploreHub={onExploreHub} />
        
        <PostActions stats={post.stats} onComment={() => onComment?.(post)} />

        {/* Bannière de réponses style Capture */}
        <button 
          onClick={() => onComment?.(post)}
          className="w-full mt-2 bg-[#EEF2FF] text-[#5B50FF] font-[1000] py-4 rounded-[18px] text-[16px] flex items-center justify-between px-6 hover:bg-[#E0E7FF] transition-all"
        >
          <span>Voir les {post.stats.comments} réponses</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostItem;
