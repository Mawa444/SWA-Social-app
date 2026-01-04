
import React, { useState, useRef } from 'react';
import ImageCarousel from './ImageCarousel';

interface PostMediaProps {
  image?: string;
  images?: string[];
  video?: string;
}

const PostMedia: React.FC<PostMediaProps> = ({ image, images, video }) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Normalisation des images : on favorise l'array 'images' s'il existe
  const allImages = images && images.length > 0 ? images : (image ? [image] : []);

  if (allImages.length === 0 && !video) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <div className="mt-3 mb-4 relative w-full">
        {/* Affichage Carrousel ou Image Unique */}
        {allImages.length > 1 ? (
          <ImageCarousel images={allImages} onImageClick={setFullscreenImage} />
        ) : allImages.length === 1 ? (
          <div 
            className="rounded-[22px] overflow-hidden border border-gray-100 shadow-sm bg-black aspect-video flex items-center justify-center relative cursor-pointer"
            onClick={() => setFullscreenImage(allImages[0])}
          >
            <img 
              src={allImages[0]} 
              alt="Post media" 
              className="w-full h-full object-cover active:scale-[0.99] transition-transform duration-200" 
            />
          </div>
        ) : null}
        
        {/* Lecteur Vidéo Custom */}
        {video && (
          <div className="rounded-[22px] overflow-hidden border border-gray-100 shadow-sm bg-black mt-2">
            <div className="relative aspect-video flex flex-col bg-black group">
              <video 
                ref={videoRef}
                src={video}
                className="w-full h-full cursor-pointer object-cover" 
                poster="https://picsum.photos/seed/vid/1920/1080"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
              
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white/40 shadow-xl scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8 ml-1">
                      <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
                    </svg>
                  </div>
                </div>
              )}

              <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <div className="flex items-center space-x-3">
                  <span className="text-white text-xs font-bold tabular-nums">{formatTime(currentTime)}</span>
                  <input 
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-[#5B50FF]"
                  />
                  <span className="text-white text-xs font-bold tabular-nums">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Plein Écran */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-300 backdrop-blur-sm"
          onClick={() => setFullscreenImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-colors z-[210]"
            onClick={(e) => { e.stopPropagation(); setFullscreenImage(null); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="w-full h-full flex items-center justify-center p-4">
            <img 
              src={fullscreenImage} 
              alt="Plein écran" 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostMedia;
