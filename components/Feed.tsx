
import React from 'react';
import { Post as PostType } from '../types';
import PostItem from './PostItem';

interface FeedProps {
  posts: PostType[];
  onExploreHub?: (id: string) => void;
  onComment?: (post: PostType) => void;
}

const Feed: React.FC<FeedProps> = ({ posts, onExploreHub, onComment }) => {
  return (
    <div className="flex flex-col w-full">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onExploreHub={onExploreHub} onComment={onComment} />
      ))}
    </div>
  );
};

export default Feed;
