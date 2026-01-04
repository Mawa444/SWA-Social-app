
import React, { useState, useRef, useEffect } from 'react';
import ImageCarousel from './ImageCarousel';
import FullscreenCarousel from './FullscreenCarousel';

interface PostMediaProps {
  image?: string;
  images?: string[];
  video?: string;
}

const PostMedia: React.FC<PostMediaProps> = ({ image, images, video }) => {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allImages = images && images.length > 0 ? images : (image ? [image] : []);

  // Intersection Observer pour Auto-play/pause
  useEffect(() => {
    if (!video || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {}); // Gérer le blocage navigateur (autoplay sans son requis souvent)
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.7 } // Se déclenche quand 70% de la vidéo est visible
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [video]);

  if (allImages.length === 0 && !video) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div ref={containerRef}>
      <div className="mt-3 mb-4 relative w-full">
        {allImages.length > 1 ? (
          <ImageCarousel images={allImages} onImageClick={(index) => setFullscreenIndex(index)} />
        ) : allImages.length === 1 ? (
          <div 
            className="rounded-[22px] overflow-hidden border border-gray-100 shadow-sm bg-black aspect-video flex items-center justify-center relative cursor-pointer"
            onClick={() => setFullscreenIndex(0)}
          >
            <img 
              src={allImages[0]} 
              alt="Post media" 
              className="w-full h-full object-cover active:scale-[0.99] transition-transform duration-200" 
            />
          </div>
        ) : null}
        
        {video && (
          <div className="rounded-[22px] overflow-hidden border border-gray-100 shadow-sm bg-black mt-2">
            <div className="relative aspect-video flex flex-col bg-black group overflow-hidden">
              <video 
                ref={videoRef}
                src={video}
                loop
                muted
                playsInline
                className="w-full h-full cursor-pointer object-cover" 
                poster="https://picsum.photos/seed/vid/1920/1080"
                onClick={togglePlay}
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer backdrop-blur-[2px]" onClick={togglePlay}>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white/40 shadow-xl scale-110 active:scale-90 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8 ml-1">
                      <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
                    </svg>
                  </div>
                </div>
              )}
              {/* Overlay minimaliste quand en lecture */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.066.925-2.066 2.067v5.666c0 1.141.925 2.067 2.066 2.067h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {fullscreenIndex !== null && (
        <FullscreenCarousel 
          images={allImages} 
          initialIndex={fullscreenIndex} 
          onClose={() => setFullscreenIndex(null)} 
        />
      )}
    </div>
  );
};

export default PostMedia;
