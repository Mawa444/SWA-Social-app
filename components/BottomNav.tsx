
import React from 'react';

interface BottomNavProps {
  activeView: string;
  onViewChange: (view: any) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-[100] shadow-[0_-10px_35px_rgba(0,0,0,0.12)]">
      <div className="max-w-4xl mx-auto w-full px-8 py-5 flex items-center justify-between">
        <button 
          onClick={() => onViewChange('home')}
          className={`transition-all active:scale-75 ${activeView === 'home' ? 'text-[#5B50FF]' : 'text-gray-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
          </svg>
        </button>

        <button 
          onClick={() => onViewChange('explore')}
          className={`transition-all active:scale-75 ${activeView === 'explore' ? 'text-[#5B50FF]' : 'text-gray-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>

        <button 
          onClick={() => onViewChange('notifications')}
          className={`transition-all active:scale-75 relative ${activeView === 'notifications' ? 'text-[#5B50FF]' : 'text-gray-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
        </button>

        <button 
          onClick={() => onViewChange('messages')}
          className={`transition-all active:scale-75 ${activeView === 'messages' ? 'text-[#5B50FF]' : 'text-gray-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
