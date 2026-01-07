
import React from 'react';

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => (
  <div className="flex flex-col mb-3 relative">
    <p className="text-[16px] text-black font-medium leading-[1.4] tracking-tight whitespace-pre-wrap">
      {content}
    </p>
  </div>
);

export default PostContent;
