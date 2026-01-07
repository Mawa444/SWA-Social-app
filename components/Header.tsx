
import React from 'react';
import XYImage from './XYImage';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onOpenPremium?: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onOpenPremium, onProfileClick }) => {
  return (
    <header className="flex items-center justify-between px-4 bg-white w-full relative h-[60px]">
      <div 
        onClick={onProfileClick}
        className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 cursor-pointer hover:ring-4 hover:ring-[#5B50FF]/20 transition-all active:scale-90"
      >
        <XYImage 
          src={user.avatar} 
          alt="Profile" 
          aspectRatio="aspect-square" 
        />
      </div>
      
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="text-[26px] font-[900] tracking-tighter text-[#5B50FF] select-none">socialX</span>
      </div>

      <button 
        onClick={onOpenPremium}
        className="px-3.5 py-1.5 rounded-full border border-gray-200 text-[14px] font-[900] text-gray-900 hover:bg-black hover:text-white hover:border-black active:scale-95 transition-all leading-none"
      >
        socialX+
      </button>
    </header>
  );
};

export default Header;
