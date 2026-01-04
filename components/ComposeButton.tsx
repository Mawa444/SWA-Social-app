
import React from 'react';

const ComposeButton: React.FC = () => (
  <div className="fixed bottom-32 right-6 z-50 md:right-12">
    <button className="bg-[#FF416C] w-20 h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all border-4 border-white/20">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="white" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    </button>
  </div>
);

export default ComposeButton;
