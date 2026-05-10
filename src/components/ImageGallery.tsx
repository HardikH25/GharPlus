import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { getFallbackImage } from "../lib/cloudinary";

type ImageGalleryProps = {
  images: string[];
  title: string;
  type?: string;
};

export default function ImageGallery({ images, title, type }: ImageGalleryProps) {
  const safeImages = useMemo(() => (images.length > 0 ? images : [getFallbackImage()]), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

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
    if (Math.abs(delta) > 50) delta > 0 ? goNext() : goPrev();
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div
        className="relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-black/5"
        style={{ height: "420px" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Blurred background layer to fill gaps */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center blur-2xl opacity-40 scale-110"
          style={{ backgroundImage: `url(${safeImages[activeIndex]})` }}
        />

        <img
          src={safeImages[activeIndex]}
          alt={`${title} ${activeIndex + 1}`}
          className="relative z-10 w-full h-full object-contain"
          onError={(e) => { e.currentTarget.src = getFallbackImage(); }}
        />

        {/* Type pill */}
        {type && (
          <span className="absolute top-3 right-3 z-10 rounded-md bg-[#688A71] px-2.5 py-1 text-xs font-semibold text-white shadow">
            {type}
          </span>
        )}

        {/* Nav arrows */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
            {/* Counter badge */}
            <span className="absolute bottom-3 right-3 z-10 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
              {activeIndex + 1} / {safeImages.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="rounded-xl border border-black/5 bg-white shadow-sm p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2A3B32]">All Photos</span>
            <span className="text-xs text-[#4A5D50]">{safeImages.length} items</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {safeImages.map((src, i) => (
              <button
                key={`${title}-t-${i}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`relative flex-shrink-0 h-14 w-20 overflow-hidden rounded-lg border-2 transition-all ${i === activeIndex ? "border-[#688A71]" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
              >
                <img
                  src={src}
                  alt={`thumb ${i + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => { e.currentTarget.src = getFallbackImage(); }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
