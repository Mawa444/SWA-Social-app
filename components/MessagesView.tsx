
import React, { useState } from 'react';
import XYImage from './XYImage';

const MOCK_CHATS = [
  { id: '1', name: 'Cyber Horizon', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200', lastMsg: 'L\'analyse du bloc 450 est terminée.', time: '2m', online: true, reputationScore: 9.2 },
  { id: '2', name: 'Sarah (XY Support)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200', lastMsg: 'Bienvenue sur la version CORE 2.5 !', time: '1h', online: true, reputationScore: 8.5 },
  { id: '3', name: 'Le Cercle Tech', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200', lastMsg: 'Marc: Quelqu\'un a vu les nouveaux sondages ?', time: '3h', online: false, reputationScore: 4.2 },
];

const MessagesView: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<any | null>(null);

  if (selectedChat) {
    return (
      <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-4">
          <button onClick={() => setSelectedChat(null)} className="p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg></button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100"><XYImage src={selectedChat.avatar} aspectRatio="aspect-square" /></div>
          <div>
            <h3 className="font-black text-sm uppercase tracking-tight">{selectedChat.name}</h3>
            <span className="text-[10px] text-green-600 font-black uppercase tracking-widest">En ligne</span>
          </div>
        </div>
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50/50">
          <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 max-w-[80%]">
            <p className="text-sm font-bold text-gray-800">{selectedChat.lastMsg}</p>
          </div>
        </div>
        <div className="p-6 bg-white border-t border-gray-100">
          <input placeholder="Votre message..." className="w-full bg-gray-100 border-none rounded-2xl py-4 px-6 font-bold" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="p-6 border-b border-gray-100 bg-white">
        <h2 className="text-3xl font-[1000] uppercase tracking-tighter">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {MOCK_CHATS.map((chat) => (
          <div key={chat.id} onClick={() => setSelectedChat(chat)} className="p-6 border-b border-gray-50 flex items-center space-x-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100"><XYImage src={chat.avatar} aspectRatio="aspect-square" /></div>
              {chat.online && <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-black text-base uppercase tracking-tight text-black">{chat.name}</h3>
                <span className="text-[11px] font-black text-gray-600 uppercase">{chat.time}</span>
              </div>
              <p className="text-sm font-bold text-gray-700 line-clamp-1">{chat.lastMsg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesView;
