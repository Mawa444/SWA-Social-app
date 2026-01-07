
import React, { useState } from 'react';

interface FollowButtonProps {
  initialFollowing?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

const FollowButton: React.FC<FollowButtonProps> = ({ 
  initialFollowing = false, 
  className = "",
  size = 'sm'
}) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const baseStyles = "font-[1000] uppercase tracking-wider transition-all active:scale-95 border select-none flex items-center justify-center shadow-none";
  
  const sizeStyles = {
    sm: "px-4 py-1.5 rounded-full text-[12px]",
    md: "px-8 py-3 rounded-[24px] text-sm"
  };

  const stateStyles = isFollowing
    ? "bg-gray-100 text-gray-600 border-gray-200"
    : "bg-[#5B50FF] text-white border-[#5B50FF] hover:bg-[#4a40d4]";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIsFollowing(!isFollowing);
      }}
      className={`${baseStyles} ${sizeStyles[size]} ${stateStyles} ${className}`}
    >
      {isFollowing ? 'Suivi' : 'Suivre'}
    </button>
  );
};

export default FollowButton;
