import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { db } from "../lib/firebase";
import type { PropertyCategory, PropertyDocument } from "../lib/properties";
import { normalizePropertyImages, resolveCategory } from "../lib/properties";
import { AnimatedText } from "../components/ui/AnimatedText";

const filters = ["All", "Boys", "Girls", "< INR 10k"] as const;

type PropertyCardViewModel = {
  id: string;
  title: string;
  location: string;
  price: string;
  category: PropertyCategory;
  monthlyBudget: number;
  images: string[];
};

export default function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [properties, setProperties] = useState<PropertyCardViewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "properties"),
      (snapshot) => {
        const next = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data() as PropertyDocument;

          return {
            id: doc.id,
            title: data.title ?? "Untitled Property",
            location: data.location ?? "Location unavailable",
            price: `₹${Number(data.price ?? 0).toLocaleString("en-IN")}/month`,
            category: resolveCategory(data),
            monthlyBudget: Number(data.price ?? 0),
            images: normalizePropertyImages(data),
          };
        });

        setProperties(next);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching properties:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "Boys") {
      return properties.filter((p) => p.category === "Boys Only");
    }
    if (activeFilter === "Girls") {
      return properties.filter((p) => p.category === "Girls Only");
    }
    if (activeFilter === "< INR 10k") {
      return properties.filter((p) => p.monthlyBudget < 10000);
    }
    return properties;
  }, [activeFilter, properties]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 md:space-y-12 pb-16 pt-28 md:pt-36 px-4 md:px-8">
      <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1 md:space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A5D50]">Premium Collection</p>
          <AnimatedText
            text="Explore Properties"
            className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-[#2A3B32] lg:text-5xl"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide rounded-2xl bg-white/50 backdrop-blur-md p-1.5 shadow-sm border border-black/5 -mx-1 px-1">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap rounded-xl px-4 md:px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-[#688A71] text-white shadow-md"
                  : "text-[#4A5D50] hover:text-[#2A3B32] hover:bg-white/40"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="flex min-h-64 items-center justify-center rounded-3xl bg-white shadow-sm border-dashed border-2 border-black/10">
          <LoaderCircle className="h-10 w-10 animate-spin text-[#688A71]" />
        </div>
      )}

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {!isLoading &&
          filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
      </motion.div>

      {!isLoading && filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white shadow-sm p-8 md:p-12 text-center max-w-xl mx-auto border-dashed border-2 border-black/10"
        >
          <p className="text-lg md:text-xl font-heading font-semibold text-[#2A3B32]">No matching properties found.</p>
          <p className="mt-3 text-sm md:text-base text-[#4A5D50]">
            We are constantly adding new premium properties. Adjust your filters or reach out directly to check our unlisted inventory.
          </p>
        </motion.div>
      )}
    </div>
  );
}
