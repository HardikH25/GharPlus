import { motion } from "framer-motion";
import { MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { PropertyCategory } from "../lib/properties";

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
        className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/95"
      >
        {/* Thumbnail */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={thumbnail}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          {/* Verified badge */}
          <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-accent-primary/40 bg-zinc-950/80 px-2.5 py-1 text-xs font-medium text-accent-primary backdrop-blur">
            <ShieldCheck size={12} />
            Verified
          </div>
          {/* Category badge */}
          <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-zinc-700/50 bg-zinc-950/80 px-2.5 py-1 text-xs font-medium text-zinc-300 backdrop-blur">
            {property.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-zinc-50">
              {property.title}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-400">
              <MapPin size={13} />
              {property.location}
            </p>
          </div>
          <p className="text-lg font-semibold tracking-tight text-accent-primary">
            {property.price}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
