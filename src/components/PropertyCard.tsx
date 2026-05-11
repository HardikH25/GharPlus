import { motion } from "framer-motion";
import { MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { PropertyCategory } from "../lib/properties";
import { getFallbackImage } from "../lib/cloudinary";

type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  category: PropertyCategory;
  images: string[];
};

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const thumbnail = property.images[0] ?? "";

  return (
    <Link to={`/properties/${property.id}`} className="block">
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        viewport={{ once: true }}
        transition={{ duration: 0.25 }}
        className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Thumbnail */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={thumbnail}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = getFallbackImage();
            }}
          />
          {/* Verified badge */}
          <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#2A3B32]/10 bg-[#E8EDE5]/95 px-2.5 py-1 text-xs font-bold text-[#2A3B32] backdrop-blur shadow-sm">
            <ShieldCheck size={14} fill="#688A71" className="text-[#E8EDE5]" />
            Verified
          </div>
          {/* Category badge */}
          <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/90 px-2.5 py-1 text-xs font-medium text-[#4A5D50] backdrop-blur shadow-sm">
            {property.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-[#2A3B32]">
              {property.title}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#4A5D50]">
              <MapPin size={13} />
              {property.location}
            </p>
          </div>
          <p className="text-lg font-semibold tracking-tight text-[#688A71]">
            {property.price}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
