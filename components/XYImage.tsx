
import React, { useState } from 'react';

interface XYImageProps {
  src?: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain';
}

const XYImage: React.FC<XYImageProps> = ({ 
  src, 
  alt = "XY Media", 
  className = "", 
  aspectRatio = "aspect-video",
  objectFit = "cover"
}) => {
  const [status, setStatus] = useState<'loading' | 'error' | 'loaded'>('loading');
  const [retryCount, setRetryCount] = useState(0);

  // Fallbacks progressifs
  const fallbackUrls = [
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format"
  ];

  const handleError = () => {
    if (retryCount < fallbackUrls.length) {
      setRetryCount(retryCount + 1);
    } else {
      setStatus('error');
    }
  };

  const currentSrc = (status === 'error') 
    ? fallbackUrls[0] 
    : (retryCount > 0 ? fallbackUrls[retryCount - 1] : src);

  return (
    <div className={`relative overflow-hidden bg-gray-50 ${aspectRatio} ${className}`}>
      {/* Skeleton Loading */}
      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50" />
      )}

      {/* Error Overlay (Only if all fallbacks fail) */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
             <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
          </div>
          <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">XY_MEDIA_ERROR</span>
        </div>
      )}

      <img
        src={currentSrc || fallbackUrls[0]}
        alt={alt}
        loading="lazy"
        onLoad={() => setStatus('loaded')}
        onError={handleError}
        className={`w-full h-full transition-all duration-1000 ease-out ${
          objectFit === 'cover' ? 'object-cover' : 'object-contain'
        } ${status === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
      />
      
      {/* Texture grainée Premium */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default XYImage;
