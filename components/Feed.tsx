
import React from 'react';
import { Post as PostType } from '../types';
import PostItem from './PostItem';

interface FeedProps {
  posts: PostType[];
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
  return (
    <div className="flex flex-col w-full">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;