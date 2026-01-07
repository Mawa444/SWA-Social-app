
import React, { useState } from 'react';
import { Post, User } from '../types';
import PostHeader from './post/PostHeader';
import PostContent from './post/PostContent';
import PostMedia from './post/PostMedia';
import PostLink from './post/PostLink';
import PostPoll from './post/PostPoll';
import PostActions from './post/PostActions';
import PostOptionsMenu from './post/PostOptionsMenu';
import RepostModal from './post/RepostModal';

interface PostItemProps {
  post: Post;
  isQuoted?: boolean; 
  onExploreHub?: (id: string) => void;
  onComment?: (postOrId: Post | string) => void;
  onProfileClick?: (user: User) => void;
  onPublishQuote?: (comment: string, originalPost: Post) => void;
  onDeletePost?: (postId: string) => void;
  onArchivePost?: (postId: string) => void;
  onHideAuthor?: (authorId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ 
  post, 
  isQuoted = false,
  onExploreHub, 
  onComment, 
  onProfileClick, 
  onPublishQuote,
  onDeletePost,
  onArchivePost,
  onHideAuthor
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showRepostModal, setShowRepostModal] = useState(false);

  const containerClasses = isQuoted
    ? "mt-4 bg-indigo-50/5 rounded-[40px] border-2 border-[#5B50FF]/30 overflow-hidden group/quoted hover:bg-indigo-50/15 hover:border-[#5B50FF] transition-all cursor-pointer active:scale-[0.995] relative"
    : "flex flex-col w-full bg-white rounded-[32px] shadow-[0_12px_40px_rgb(0,0,0,0.03)] border-[2px] border-[#5B50FF]/40 overflow-hidden group transition-all hover:shadow-[0_15px_50px_rgb(0,0,0,0.08)] hover:border-[#5B50FF]/80";

  const paddingClasses = isQuoted ? "p-6 md:p-7" : "p-6 md:p-8";

  const getDisplayHandle = (user: User) => {
    const handle = user.handle || '';
    const cleanHandle = handle.startsWith('@') ? handle.substring(1) : handle;
    return `@${cleanHandle.toUpperCase()}`;
  };

  return (
    <>
      <div 
        className={containerClasses}
        onClick={(e) => {
          if (isQuoted) {
            e.stopPropagation();
            onComment?.(post);
          }
        }}
      >
        {/* Bandeau de repartage - Restauration du design XY Core et redirection source */}
        {!isQuoted && post.isRepost && post.originalAuthor && (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              // On remonte à l'ID original pour afficher la publication d'origine entière
              const sourceId = post.originalPostId || post.id;
              onComment?.(sourceId); 
            }}
            className="px-8 py-2.5 bg-[#FF416C] border-b border-white/5 flex items-center justify-center cursor-pointer hover:brightness-110 active:opacity-95 transition-all group/banner"
          >
             <span className="text-[10px] font-[1000] tracking-[0.2em] text-white uppercase text-center leading-none">
               Publié initialement par {getDisplayHandle(post.originalAuthor)}
             </span>
          </div>
        )}

        <div className={`${paddingClasses} w-full flex flex-col`}>
          <PostHeader 
            post={post}
            onProfileClick={() => onProfileClick?.(post.author)}
            onOptionsClick={() => setShowOptions(true)}
          />
          
          <div className="mt-2 pl-0 md:pl-2">
            {post.content && (
              <PostContent content={post.content} />
            )}
            
            {post.quotedPost && (
              <PostItem 
                post={post.quotedPost} 
                isQuoted={true}
                onExploreHub={onExploreHub}
                onComment={onComment}
                onProfileClick={onProfileClick}
                onPublishQuote={onPublishQuote}
                onDeletePost={onDeletePost}
                onArchivePost={onArchivePost}
                onHideAuthor={onHideAuthor}
              />
            )}
            
            {!post.quotedPost && (
              <>
                <PostMedia image={post.image} images={post.images} video={post.video} />
                <PostLink link={post.link} />
                <PostPoll poll={post.poll} onExploreHub={onExploreHub} />
              </>
            )}
            
            <PostActions 
              stats={post.stats} 
              onComment={() => onComment?.(post)} 
              onRepost={() => setShowRepostModal(true)}
            />
          </div>
        </div>

        {isQuoted && (
          <div className="absolute top-6 right-16 opacity-0 group-hover/quoted:opacity-40 transition-opacity">
            <svg className="w-5 h-5 text-[#5B50FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </div>
        )}
      </div>

      {showOptions && (
        <PostOptionsMenu 
          post={post} 
          onClose={() => setShowOptions(false)} 
          onDelete={() => onDeletePost?.(post.id)}
          onArchive={() => onArchivePost?.(post.id)}
          onHideAuthor={() => onHideAuthor?.(post.author.id)}
        />
      )}

      {showRepostModal && (
        <RepostModal 
          post={post} 
          onClose={() => setShowRepostModal(false)} 
          onPublish={(comment) => {
            onPublishQuote?.(comment, post);
            setShowRepostModal(false);
          }}
        />
      )}
    </>
  );
};

export default PostItem;
