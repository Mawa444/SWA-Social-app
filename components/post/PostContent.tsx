
import React from 'react';

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => (
  <div className="flex flex-col mb-2 relative">
    <p className="text-[20px] md:text-[21px] text-black font-[500] leading-[1.35] tracking-tight mt-1">
      {content}
    </p>
  </div>
);

export default PostContent;