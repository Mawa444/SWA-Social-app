import React from 'react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = ['VOIX', 'SOCIAL', 'CLUBS'];
  
  return (
    <nav className="flex border-b border-gray-100 bg-white w-full h-[50px]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 flex flex-col items-center justify-center relative transition-colors ${
            activeTab === tab ? 'text-black' : 'text-[#64748B]'
          }`}
        >
          <div className="relative inline-flex items-center">
            <span className="text-[14px] font-[900] tracking-wider">{tab}</span>
            {tab === 'CLUBS' && (
              <span className="absolute -top-1 -right-1.5 w-[8px] h-[8px] bg-[#EF4444] rounded-full border-2 border-white shadow-sm"></span>
            )}
          </div>
          
          {/* Indicateur actif bleu épais (4px) */}
          {activeTab === tab && (
            <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#5B50FF] rounded-t-full"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;