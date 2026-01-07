
import React, { useState, useRef, useEffect } from 'react';
import ImageCarousel from './ImageCarousel';
import FullscreenCarousel from './FullscreenCarousel';
import XYImage from '../XYImage';

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

  useEffect(() => {
    if (!video || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.7 }
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
            className="rounded-[28px] overflow-hidden border border-gray-100 shadow-sm bg-black aspect-video flex items-center justify-center relative cursor-pointer group"
            onClick={() => setFullscreenIndex(0)}
          >
            <XYImage 
              src={allImages[0]} 
              alt="Post media" 
              className="w-full h-full group-active:scale-[0.99] transition-transform duration-200" 
            />
          </div>
        ) : null}
        
        {video && (
          <div className="rounded-[28px] overflow-hidden border border-gray-100 shadow-sm bg-black mt-2">
            <div className="relative aspect-video flex flex-col bg-black group overflow-hidden">
              <video 
                ref={videoRef}
                src={video}
                loop
                muted
                playsInline
                className="w-full h-full cursor-pointer object-cover" 
                poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
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
