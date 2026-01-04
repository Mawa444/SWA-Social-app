
import React, { useState, useRef, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  onImageClick: (image: string) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onImageClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const dragThreshold = 5; // pixels pour différencier clic et drag

  // Synchronisation de l'index au scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  // Navigation par flèches
  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  // Support du drag à la souris pour desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
    
    // On retire temporairement le snap pour un drag fluide
    scrollRef.current.style.scrollSnapType = 'none';
    scrollRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    isDragging.current = false;
    
    // Rétablissement du snap
    scrollRef.current.style.scrollSnapType = 'x mandatory';
    scrollRef.current.style.scrollBehavior = 'smooth';

    const endX = e.pageX - scrollRef.current.offsetLeft;
    const distance = Math.abs(endX - startX.current);

    // Si c'est un clic (peu de mouvement)
    if (distance < dragThreshold) {
      const clickIndex = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      onImageClick(images[clickIndex]);
    } else {
      // Force le snap sur l'image la plus proche après le drag
      const newIndex = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      scrollTo(newIndex);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      if (scrollRef.current) {
        scrollRef.current.style.scrollSnapType = 'x mandatory';
        scrollRef.current.style.scrollBehavior = 'smooth';
        const newIndex = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
        scrollTo(newIndex);
      }
    }
  };

  return (
    <div className="relative group w-full aspect-video rounded-[22px] overflow-hidden border border-gray-100 shadow-sm bg-black select-none">
      {/* Container Défilant - Utilisation du snap natif pour mobile */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing touch-pan-x"
        style={{ scrollSnapStop: 'always' }}
      >
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="flex-shrink-0 w-full h-full snap-center snap-always flex items-center justify-center bg-black overflow-hidden pointer-events-none"
          >
            <img 
              src={img} 
              alt={`Slide ${idx + 1}`} 
              className="w-full h-full object-cover" 
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Boutons de navigation (Visibles au survol sur desktop) */}
      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); scrollTo(activeIndex - 1); }}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-opacity z-20 ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); scrollTo(activeIndex + 1); }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-opacity z-20 ${activeIndex === images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Indicateurs visuels (Dots) style SWA. */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 px-3 py-2 rounded-full bg-black/30 backdrop-blur-md pointer-events-none z-10">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
