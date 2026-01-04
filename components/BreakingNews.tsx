
import React from 'react';

interface BreakingNewsProps {
  title: string;
  description: string;
}

const BreakingNews: React.FC<BreakingNewsProps> = ({ title, description }) => {
  return (
    <div className="p-5 bg-white max-w-4xl mx-auto w-full">
      <div className="flex items-start space-x-5">
        <div className="w-14 h-14 flex-shrink-0 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
          <svg className="w-10 h-10 text-red-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-black text-base text-red-600 tracking-wider uppercase mb-1">{title}</h3>
          <p className="text-lg text-black font-bold leading-tight">
            {description}
          </p>
        </div>
      </div>
      <button className="w-full mt-5 bg-[#5B50FF] text-white font-black py-4 rounded-2xl text-lg shadow-lg hover:bg-indigo-700 active:scale-[0.98] transition-all">
        En savoir plus ici
      </button>
    </div>
  );
};

export default BreakingNews;
