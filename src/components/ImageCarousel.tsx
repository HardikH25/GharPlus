import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { getFallbackImage } from "../lib/cloudinary";

type ImageCarouselProps = {
  images: string[];
  title: string;
  heightClassName: string;
  roundedClassName?: string;
  imageClassName?: string;
};

export default function ImageCarousel({
  images,
  title,
  heightClassName,
  roundedClassName = "",
  imageClassName = "object-contain drop-shadow-2xl",
}: ImageCarouselProps) {
  const safeImages = useMemo(() => (images.length > 0 ? images : [""]), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Touch/swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  }, [safeImages.length]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % safeImages.length);
  }, [safeImages.length]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    const delta = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(delta) > minSwipeDistance) {
      if (delta > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  }

  function handleHoverSegment(clientX: number, left: number, width: number) {
    if (safeImages.length <= 1) return;
    const position = clientX - left;
    const segmentSize = width / safeImages.length;
    const nextIndex = Math.max(
      0,
      Math.min(safeImages.length - 1, Math.floor(position / segmentSize)),
    );
    setActiveIndex(nextIndex);
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden border-b border-zinc-800 bg-zinc-950 ${roundedClassName} ${heightClassName}`}>
      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-50 scale-110 transition-all duration-500"
        style={{ backgroundImage: `url(${safeImages[activeIndex]})` }}
      />
      <img
        src={safeImages[activeIndex]}
        alt={`${title} image ${activeIndex + 1}`}
        className={`relative z-10 w-full h-full ${imageClassName}`}
        onError={(event) => {
          event.currentTarget.src = getFallbackImage();
        }}
      />

      {/* Desktop hover segment navigation */}
      <div
        className="absolute inset-0 z-20 hidden md:block"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          handleHoverSegment(event.clientX, rect.left, rect.width);
        }}
      />

      {/* Mobile touch/swipe area */}
      <div
        className="absolute inset-0 z-20 md:hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {safeImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 md:left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-950/80 p-1.5 text-zinc-100 transition hover:border-emerald-400/60 active:scale-90"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 md:right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-950/80 p-1.5 text-zinc-100 transition hover:border-emerald-400/60 active:scale-90"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
            {safeImages.map((_, index) => (
              <motion.button
                key={`${title}-${index}`}
                type="button"
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === index ? "w-5 bg-emerald-300" : "w-2 bg-zinc-500"
                }`}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
