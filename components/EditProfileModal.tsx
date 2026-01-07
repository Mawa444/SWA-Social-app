
import React, { useState } from 'react';
import { User } from '../types';
import XYImage from './XYImage';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const SOLID_COLORS = [
  '#5B50FF', '#4A40D4', '#3D34B3', '#2E278E',
  '#FF416C', '#E03A5F', '#C23253', '#A42A46',
  '#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6',
  '#000000', '#1A1A1A', '#333333', '#4D4D4D',
  '#10B981', '#F59E0B'
];

const GRADIENTS = [
  { name: 'Core Signature', value: 'linear-gradient(to bottom right, #5B50FF, #FF416C)' },
  { name: 'Deep Nebula', value: 'linear-gradient(to right, #4A00E0, #8E2DE2)' },
  { name: 'Ultra Pink', value: 'linear-gradient(to right, #FF416C, #8B5CF6)' },
  { name: 'Night Sky', value: 'linear-gradient(to right, #232526, #414345)' },
  { name: 'Vibrant Pulse', value: 'linear-gradient(to right, #5B50FF, #00F2FE)' },
  { name: 'Crimson Glow', value: 'linear-gradient(to right, #FF416C, #FF1F4B)' },
  { name: 'Royal Violet', value: 'linear-gradient(to right, #8E2DE2, #4A00E0)' },
  { name: 'Matrix Black', value: 'linear-gradient(to right, #000000, #434343)' }
];

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user.name);
  const [handle, setHandle] = useState(user.handle.replace('@', ''));
  const [avatar, setAvatar] = useState(user.avatar);
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [website, setWebsite] = useState(user.website || "");
  const [birthDate, setBirthDate] = useState(user.birthDate || "");
  const [birthPlace, setBirthPlace] = useState(user.birthPlace || "");
  const [bannerColor, setBannerColor] = useState(user.bannerColor || '#5B50FF');
  const [areMetricsPublic, setAreMetricsPublic] = useState(user.areMetricsPublic || false);
  const [isSigning, setIsSigning] = useState(false);
  const [signStep, setSignStep] = useState(0);

  const steps = [
    "Hachage SHA-256...",
    "Signature CORE rsa-4096...",
    "Synchronisation réseau...",
    "Identité Immuable OK"
  ];

  const handleSave = () => {
    if (!handle.trim() || !name.trim()) return;
    
    setIsSigning(true);
    setSignStep(0);
    const interval = setInterval(() => {
      setSignStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            onSave({ 
              ...user, 
              name, 
              handle: `@${handle.toLowerCase().replace(/\s+/g, '_')}`, 
              avatar, 
              bio, 
              location, 
              website, 
              birthDate, 
              birthPlace, 
              bannerColor,
              areMetricsPublic
            });
            setIsSigning(false);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-end sm:items-center justify-center animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl shadow-none" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-t-[50px] sm:rounded-[40px] h-[95vh] sm:h-auto overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500 shadow-none border border-gray-100">
        
        {isSigning && (
          <div className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300 shadow-none">
            <div className="w-24 h-24 border-[8px] border-gray-100 border-t-[#5B50FF] rounded-full animate-spin mb-8 shadow-none" />
            <h4 className="text-3xl font-[1000] uppercase tracking-tighter mb-2 text-black">Signature CORE</h4>
            <p className="text-xs font-black text-[#5B50FF] uppercase tracking-widest">{steps[signStep]}</p>
          </div>
        )}

        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10 shadow-none">
          <button onClick={onClose} className="text-[11px] font-[1000] uppercase tracking-widest text-gray-500 px-4 py-2 hover:bg-gray-50 rounded-xl transition-all shadow-none">ANNULER</button>
          <h3 className="text-lg font-[1000] uppercase tracking-tighter text-black">Édition Souveraine</h3>
          <button 
            onClick={handleSave}
            disabled={!handle || !name}
            className="bg-gradient-to-r from-[#5B50FF] to-[#FF416C] text-white px-8 py-3 rounded-2xl text-[11px] font-[1000] uppercase tracking-widest active:scale-95 transition-all disabled:opacity-20 shadow-none border-none"
          >
            APPLIQUER
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 hide-scrollbar pb-32">
          
          <div className="space-y-6">
             <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-[1000] text-gray-400 uppercase tracking-[0.3em]">Design Bannière</label>
             </div>

             <div className="space-y-4">
                <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar px-2 py-1">
                  {SOLID_COLORS.map(color => (
                    <button 
                      key={color}
                      onClick={() => setBannerColor(color)}
                      className={`w-7 h-7 rounded-full flex-shrink-0 border-2 transition-all duration-300 shadow-none ${bannerColor === color ? 'border-black scale-125' : 'border-transparent hover:scale-110'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
             </div>

             <div className="relative h-32 w-full rounded-[32px] overflow-hidden border border-gray-100 shadow-none" style={{ background: bannerColor }}>
                <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             </div>
          </div>

          <div className="flex flex-col items-center pt-2">
            <div className="relative">
              {/* Photo de profil avec bordure synchronisée avec la couleur de bannière */}
              <div 
                className="w-28 h-28 rounded-[36px] border-[6px] overflow-hidden bg-white rotate-[-2deg] shadow-lg relative z-10 transition-all duration-300"
                style={{ borderColor: bannerColor }}
              >
                <XYImage src={avatar} aspectRatio="aspect-square" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-[1000] text-gray-500 uppercase tracking-[0.2em] ml-2">Nom d'affichage</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl py-4 px-6 text-lg font-[1000] text-gray-900 uppercase tracking-tighter focus:border-[#5B50FF] outline-none shadow-none"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-[1000] text-gray-500 uppercase tracking-[0.2em] ml-2">Identifiant Unique</label>
                    <div className="relative flex items-center">
                        <span className="absolute left-6 text-lg font-[1000] text-gray-400">@</span>
                        <input 
                            type="text" 
                            value={handle}
                            onChange={(e) => setHandle(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl py-4 pl-11 pr-6 text-lg font-[1000] text-[#5B50FF] lowercase tracking-tighter focus:border-[#5B50FF] outline-none shadow-none"
                        />
                    </div>
                </div>
            </div>

            {/* TOGGLE PRIVACY */}
            <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 flex items-center justify-between shadow-none">
              <div>
                <h4 className="text-[11px] font-[1000] uppercase tracking-widest text-black mb-1">Visibilité des Statistiques</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Rendre public mes abonnés et abonnements</p>
              </div>
              <button 
                onClick={() => setAreMetricsPublic(!areMetricsPublic)}
                className={`w-14 h-8 rounded-full relative transition-all duration-300 ${areMetricsPublic ? 'bg-[#5B50FF]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${areMetricsPublic ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-[1000] text-gray-500 uppercase tracking-[0.2em] ml-2">Biographie</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl py-5 px-8 text-lg font-bold text-gray-900 focus:border-[#5B50FF] outline-none shadow-none resize-none"
              />
            </div>
          </div>

          <div className="p-8 bg-black rounded-[40px] text-white flex items-center space-x-6 shadow-none border border-white/10">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl rotate-[-3deg]">🛡️</div>
            <div>
               <h4 className="font-[1000] text-sm uppercase tracking-tighter">PROTOCOLE CORE V2.5</h4>
               <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-2 leading-relaxed">
                 Toute modification est enregistrée sur le registre immuable.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
