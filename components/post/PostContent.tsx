
import React from 'react';

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => (
  <div className="flex flex-col mb-4 relative">
    <p className="text-[22px] text-black font-[500] leading-[1.3] tracking-tight whitespace-pre-wrap">
      {content}
    </p>
  </div>
);

export default PostContent;
