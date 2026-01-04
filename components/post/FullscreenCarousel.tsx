
import React, { useState, useRef, useEffect } from 'react';

interface FullscreenCarouselProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const FullscreenCarousel: React.FC<FullscreenCarouselProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [dragY, setDragY] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingX = useRef(false);
  const isDraggingY = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: initialIndex * window.innerWidth,
        behavior: 'auto'
      });
    }
    // Empêcher le scroll du body quand la modal est ouverte
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleScroll = () => {
    if (scrollRef.current && !isDraggingX.current) {
      const index = Math.round(scrollRef.current.scrollLeft / window.innerWidth);
      if (index !== currentIndex) setCurrentIndex(index);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.pageX;
    startY.current = e.pageY;
    if (scrollRef.current) scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const deltaX = Math.abs(e.pageX - startX.current);
    const deltaY = e.pageY - startY.current;

    // Détecter la direction du geste (Vertical vs Horizontal)
    if (!isDraggingX.current && !isDraggingY.current) {
      if (deltaX > 10) isDraggingX.current = true;
      else if (deltaY > 10) isDraggingY.current = true;
    }

    if (isDraggingX.current && scrollRef.current) {
      e.preventDefault();
      const walk = (e.pageX - startX.current) * 1.5;
      scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
      scrollRef.current.style.scrollSnapType = 'none';
    } else if (isDraggingY.current && deltaY > 0) {
      setDragY(deltaY);
    }
  };

  const handleMouseUp = () => {
    if (isDraggingY.current && dragY > 150) {
      onClose();
    } else {
      setDragY(0);
    }
    isDraggingX.current = false;
    isDraggingY.current = false;
    if (scrollRef.current) scrollRef.current.style.scrollSnapType = 'x mandatory';
  };

  // Touch handlers pour mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].pageX;
    startY.current = e.touches[0].pageY;
    if (scrollRef.current) scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaX = Math.abs(e.touches[0].pageX - startX.current);
    const deltaY = e.touches[0].pageY - startY.current;

    if (!isDraggingX.current && !isDraggingY.current) {
      if (deltaX > 15) isDraggingX.current = true;
      else if (deltaY > 15) isDraggingY.current = true;
    }

    if (isDraggingY.current && deltaY > 0) {
      setDragY(deltaY);
      if (e.cancelable) e.preventDefault();
    }
  };

  const opacity = Math.max(0.4, 1 - dragY / 500);
  const scale = Math.max(0.85, 1 - dragY / 1000);

  return (
    <div 
      className="fixed inset-0 z-[300] bg-black flex flex-col transition-colors duration-200 select-none overflow-hidden"
      role="dialog"
      aria-modal="true"
      style={{ 
        backgroundColor: `rgba(0,0,0,${opacity * 0.98})`,
        backdropFilter: `blur(${opacity * 20}px)` 
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div 
        className="flex-1 flex flex-col transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${dragY}px) scale(${scale})` }}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[310]">
          <div className="bg-white/10 px-4 py-1.5 rounded-full text-white font-black text-sm backdrop-blur-md border border-white/10 tabular-nums">
            {currentIndex + 1} / {images.length}
          </div>
          <button 
            onClick={onClose}
            className="text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all active:scale-90 border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scroll Surface */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="flex-1 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing touch-pan-x"
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-screen h-screen flex-shrink-0 snap-center flex items-center justify-center p-4">
              <img 
                src={img} 
                alt={`Image ${idx + 1}`} 
                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-2.5 px-5 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 z-[310]">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-1.5 bg-white/20'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullscreenCarousel;
