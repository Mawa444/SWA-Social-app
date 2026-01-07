
import React from 'react';
import XYImage from './XYImage';

const NOTIFS = [
  { id: '1', type: 'LIKE', user: 'MarcXY', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200', text: 'a aimé votre publication sur la décentralisation.', time: '2m', score: 4.5 },
  { id: '2', type: 'VOTE', user: 'OAN Global', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200', text: 'Le sondage auquel vous avez participé est terminé.', time: '15m', score: 9.5 },
  { id: '3', type: 'MENTION', user: 'Cyber Horizon', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200', text: 'vous a mentionné dans une discussion.', time: '1h', score: 8.2 },
];

const NotificationsView: React.FC = () => {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="p-6 border-b border-gray-100 bg-white">
        <h2 className="text-3xl font-[1000] uppercase tracking-tighter">Notifications</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {NOTIFS.map((n) => (
          <div key={n.id} className="p-6 border-b border-gray-50 flex items-start space-x-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
              <XYImage src={n.avatar} aspectRatio="aspect-square" />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-gray-800 leading-tight">
                <span className="font-black uppercase tracking-tight text-black">{n.user}</span>
                <span className="ml-1">{n.text}</span>
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className={`w-2.5 h-2.5 rounded-full ${n.type === 'LIKE' ? 'bg-red-500' : n.type === 'VOTE' ? 'bg-[#5B50FF]' : 'bg-green-500'}`} />
                <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest">{n.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
