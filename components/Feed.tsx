
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Post as PostType, User } from '../types';
import PostItem from './PostItem';
import { SkeletonPost } from './Skeleton';

interface FeedProps {
  posts: PostType[];
  onExploreHub?: (id: string) => void;
  onComment?: (post: PostType) => void;
  onProfileClick?: (user: User) => void;
  onPublishQuote?: (comment: string, originalPost: PostType) => void;
  onDeletePost?: (postId: string) => void;
  onArchivePost?: (postId: string) => void;
  onHideAuthor?: (authorId: string) => void;
}

const BATCH_SIZE = 10;
const TRIGGER_OFFSET = 3;

const Feed: React.FC<FeedProps> = ({ 
  posts, 
  onExploreHub, 
  onComment, 
  onProfileClick, 
  onPublishQuote,
  onDeletePost,
  onArchivePost,
  onHideAuthor
}) => {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [isAutoLoading, setIsAutoLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [posts]);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isAutoLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && visibleCount < posts.length) {
        setIsAutoLoading(true);
        setTimeout(() => {
          setVisibleCount(prev => prev + BATCH_SIZE);
          setIsAutoLoading(false);
        }, 600);
      }
    }, {
      rootMargin: '200px',
    });

    if (node) observer.current.observe(node);
  }, [visibleCount, posts.length, isAutoLoading]);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <div className="flex flex-col w-full p-4 space-y-4 pb-32">
      {visiblePosts.map((post, index) => {
        const isTrigger = index === Math.max(0, visiblePosts.length - 1 - TRIGGER_OFFSET);
        
        return (
          <div key={post.id} ref={isTrigger ? lastElementRef : null}>
            <PostItem 
              post={post} 
              onExploreHub={onExploreHub} 
              onComment={onComment}
              onProfileClick={onProfileClick}
              onPublishQuote={onPublishQuote}
              onDeletePost={onDeletePost}
              onArchivePost={onArchivePost}
              onHideAuthor={onHideAuthor}
            />
          </div>
        );
      })}

      {(hasMore || isAutoLoading) && (
        <div className="py-8 space-y-4">
          <SkeletonPost />
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 text-[#5B50FF] font-black text-xs uppercase tracking-[0.3em] opacity-50">
              <div className="w-1.5 h-1.5 bg-[#5B50FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-[#5B50FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-[#5B50FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="ml-2">Chargement CORE</span>
            </div>
          </div>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="py-20 flex flex-col items-center justify-center opacity-20">
          <div className="w-12 h-1 text-gray-400 rounded-full mb-4" />
          <span className="font-black text-[10px] uppercase tracking-[0.5em] text-center">Vous avez atteint la fin du flux</span>
        </div>
      )}
    </div>
  );
};

export default Feed;
