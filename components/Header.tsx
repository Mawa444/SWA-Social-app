
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white w-full relative h-[68px]">
      {/* Profil Avatar */}
      <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-gray-100">
        <img 
          src="https://picsum.photos/seed/myuser/100/100" 
          alt="Profile" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Logo SWA. Centré de manière absolue */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="text-[28px] font-[900] tracking-tighter text-[#5B50FF]">SWA.</span>
      </div>

      {/* Bouton SWA+ : Bordure fine et texte noir gras */}
      <button className="px-6 py-2 rounded-full border border-gray-200 text-[16px] font-[900] text-gray-900 hover:bg-gray-50 active:scale-95 transition-all leading-none">
        SWA+
      </button>
    </header>
  );
};

export default Header;