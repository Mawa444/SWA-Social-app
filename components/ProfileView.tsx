
import React, { useMemo, useState } from 'react';
import { User, Post as PostType } from '../types';
import PostItem from './PostItem';
import XYImage from './XYImage';
import FollowButton from './FollowButton';
import EditProfileModal from './EditProfileModal';
import CoreScoreModal from './CoreScoreModal';
import ConnectionsModal from './ConnectionsModal';
import CitizenRatingModal from './CitizenRatingModal';

interface ProfileViewProps {
  user: User;
  allPosts: PostType[]; 
  isMe?: boolean;
  onBack: () => void;
  onPostComment?: (post: PostType) => void;
  onUpdateUser?: (updatedUser: User) => void;
  onCompose?: () => void;
  onViewProfile?: (user: User) => void;
  onDeletePost?: (postId: string) => void;
  onArchivePost?: (postId: string) => void;
  onHideAuthor?: (authorId: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ 
  user, 
  allPosts,
  isMe = false, 
  onBack, 
  onPostComment,
  onUpdateUser,
  onCompose,
  onViewProfile,
  onDeletePost,
  onArchivePost,
  onHideAuthor
}) => {
  const [activeTab, setActiveTab] = useState<'POSTS' | 'REPOSTS' | 'ARCHIVES' | 'HISTORY'>('POSTS');
  const [hasSentDM, setHasSentDM] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showVaultNotice, setShowVaultNotice] = useState(false);
  const [connectionView, setConnectionView] = useState<'FOLLOWERS' | 'FOLLOWING' | null>(null);

  // Filtrage des posts pour le profil
  const userPosts = useMemo(() => 
    allPosts.filter(p => (p.author.id === user.id || (isMe && p.author.id === 'me')) && !p.isRepost && !p.isArchived), 
  [allPosts, user.id, isMe]);

  const userReposts = useMemo(() => 
    allPosts.filter(p => (p.author.id === user.id || (isMe && p.author.id === 'me')) && p.isRepost && !p.isArchived), 
  [allPosts, user.id, isMe]);

  const userArchives = useMemo(() => 
    allPosts.filter(p => (p.author.id === user.id || (isMe && p.author.id === 'me')) && p.isArchived),
  [allPosts, user.id, isMe]);

  const formatK = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num.toString();
  };

  const reputationScore = user.reputationScore || (user.activityScore / 10);
  const primaryColor = user.bannerColor || '#5B50FF';

  const tabs = isMe 
    ? [
        { id: 'POSTS', label: 'Posts' }, 
        { id: 'REPOSTS', label: 'Reposts' }, 
        { id: 'ARCHIVES', label: 'Archives' },
        { id: 'HISTORY', label: 'Historique' }
      ]
    : [
        { id: 'POSTS', label: 'Posts' }, 
        { id: 'REPOSTS', label: 'Reposts' }
      ];

  const handleMetricClick = (view: 'FOLLOWERS' | 'FOLLOWING') => setConnectionView(view);
  const handleSaveProfile = (updatedUser: User) => {
    onUpdateUser?.(updatedUser);
    setShowEditModal(false);
  };

  return (
    <div className="flex flex-col w-full bg-[#F8F9FB] min-h-screen animate-in fade-in duration-500 pb-40 relative">
      <style>{`
        @keyframes pill-shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          25% { transform: translateX(200%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-pill-shine::after {
          content: "";
          position: absolute; top: 0; left: 0; width: 60%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: pill-shine 4s infinite;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      
      {/* COUVERTURE */}
      <div className="relative h-72 w-full overflow-hidden border-b border-gray-100" style={{ background: primaryColor }}>
        <button onClick={onBack} className="absolute top-6 left-6 z-30 w-12 h-12 bg-black/20 backdrop-blur-2xl rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/40 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
        </button>
      </div>

      {/* PROFIL IDENTITÉ */}
      <div className="px-6 -mt-24 relative z-10">
        <div className="bg-white rounded-[44px] p-8 border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-40 h-40 rounded-[44px] border-[8px] overflow-hidden bg-white rotate-[-3deg] shadow-xl" style={{ borderColor: primaryColor }}>
                <XYImage src={user.avatar} aspectRatio="aspect-square" />
              </div>
              <div className="flex flex-col pt-4">
                <h1 className="text-3xl font-[1000] tracking-tighter uppercase text-black leading-none">{user.name}</h1>
                <p className="text-[#5B50FF] font-black text-lg mt-1">{user.handle}</p>
                <div className="mt-5">
                   <button onClick={() => setShowScoreModal(true)} className="px-6 py-2.5 bg-black rounded-full text-white font-[1000] uppercase text-[11px] tracking-widest animate-pill-shine relative overflow-hidden">
                     Score: {reputationScore.toFixed(1)}
                   </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4 pt-4">
              {isMe ? (
                <button onClick={() => setShowEditModal(true)} style={{ backgroundColor: primaryColor }} className="px-10 py-4 text-white rounded-[24px] font-[1000] text-xs uppercase tracking-[0.2em]">Modifier Profil</button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button onClick={() => setHasSentDM(true)} className={`px-8 py-4 rounded-[24px] font-[1000] text-xs uppercase tracking-[0.2em] ${hasSentDM ? 'bg-gray-100 text-gray-400' : 'bg-[#5B50FF] text-white'}`}>{hasSentDM ? 'Message Envoyé' : 'Message'}</button>
                  <FollowButton size="md" />
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-12 relative">
            <div className="grid grid-cols-5 border-t border-gray-100 pt-8 gap-1">
              {[
                { label: 'Abonnés', val: user.followersCount, click: () => handleMetricClick('FOLLOWERS') },
                { label: 'Suivis', val: user.followingCount, click: () => handleMetricClick('FOLLOWING') },
                { label: 'Posts', val: user.postsCount },
                { label: "J'aime", val: user.likesReceived },
                { label: 'Reposts', val: user.repostsCount }
              ].map((stat, i) => (
                <button key={i} onClick={stat.click} className="flex flex-col items-center justify-center py-4 rounded-2xl hover:bg-gray-50 transition-all group">
                  <span className="text-xl md:text-2xl font-[1000] text-black tracking-tighter leading-none group-hover:text-[#5B50FF]">{formatK(stat.val || 0)}</span>
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-2 text-center">{stat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 border-l-4 border-[#5B50FF]/20 pl-8 py-2">
            <p className="text-gray-700 font-bold text-lg italic leading-relaxed max-w-2xl">
              {user.bio || "Citoyen actif du réseau socialX."}
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="mt-10 border-b border-gray-100 bg-white sticky top-0 z-[40]">
        <div className="flex w-full overflow-x-auto hide-scrollbar">
          {tabs.map(tab => {
            const count = tab.id === 'POSTS' ? userPosts.length 
                        : tab.id === 'REPOSTS' ? userReposts.length 
                        : tab.id === 'ARCHIVES' ? userArchives.length : null;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex-1 flex flex-col items-center justify-center py-5 relative transition-all group min-w-max px-6 ${activeTab === tab.id ? 'text-black' : 'text-gray-600 hover:text-black'}`}>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[11px] font-[1000] uppercase tracking-[0.2em]">{tab.label}</span>
                  {count !== null && <span className="text-[10px] font-black opacity-30">({count})</span>}
                </div>
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#5B50FF] rounded-t-full" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 mt-10">
        {activeTab === 'POSTS' && (
          <div className="flex flex-col space-y-6 pb-20">
            {userPosts.map(post => <PostItem key={post.id} post={post} onComment={onPostComment} onDeletePost={onDeletePost} onArchivePost={onArchivePost} onHideAuthor={onHideAuthor} />)}
            {userPosts.length === 0 && <div className="p-24 text-center border-2 border-dashed border-gray-100 rounded-[44px] font-black text-gray-300 uppercase italic">Aucun post public</div>}
          </div>
        )}

        {activeTab === 'REPOSTS' && (
          <div className="flex flex-col space-y-6 pb-20">
            {userReposts.map(post => <PostItem key={post.id} post={post} onComment={onPostComment} onDeletePost={onDeletePost} onArchivePost={onArchivePost} onHideAuthor={onHideAuthor} />)}
            {userReposts.length === 0 && <div className="p-24 text-center border-2 border-dashed border-gray-100 rounded-[44px] font-black text-gray-300 uppercase italic">Aucun repost</div>}
          </div>
        )}

        {activeTab === 'ARCHIVES' && isMe && (
          <div className="flex flex-col space-y-6 pb-20">
            <div className="bg-[#F5F7FF] p-6 rounded-[32px] border border-[#5B50FF]/10 mb-4">
              <p className="text-[11px] font-black text-[#5B50FF] uppercase tracking-widest text-center">🔐 Vos publications archivées ne sont visibles que par vous.</p>
            </div>
            {userArchives.map(post => <PostItem key={post.id} post={post} onComment={onPostComment} onDeletePost={onDeletePost} onArchivePost={onArchivePost} onHideAuthor={onHideAuthor} />)}
            {userArchives.length === 0 && <div className="p-24 text-center border-2 border-dashed border-gray-100 rounded-[44px] font-black text-gray-300 uppercase italic">Coffre-fort vide</div>}
          </div>
        )}
        
        {activeTab === 'HISTORY' && isMe && (
          <div className="p-24 text-center border-2 border-dashed border-gray-100 rounded-[44px] font-black text-gray-300 uppercase italic">Historique vide</div>
        )}
      </div>

      {showEditModal && <EditProfileModal user={user} onClose={() => setShowEditModal(false)} onSave={handleSaveProfile} />}
      {showScoreModal && <CoreScoreModal score={user.activityScore} onClose={() => setShowScoreModal(false)} />}
      {showRatingModal && <CitizenRatingModal user={user} onClose={() => setShowRatingModal(false)} />}
      {connectionView && <ConnectionsModal type={connectionView === 'FOLLOWERS' ? 'FOLLOWERS' : 'FOLLOWING'} onClose={() => setConnectionView(null)} onSelectProfile={onViewProfile!} />}
    </div>
  );
};

export default ProfileView;
