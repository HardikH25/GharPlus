import { motion } from "framer-motion";
import { ArrowRight, DollarSign, Heart, MessageCircle, ShieldCheck, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { getWhatsAppLink } from "../lib/whatsapp";

// Feature pills shown inline on mobile, as floating cards on desktop
const features = [
  { icon: DollarSign, label: "Zero Brokerage" },
  { icon: ShieldCheck, label: "Verified Properties" },
  { icon: Heart, label: "Student First" },
  { icon: Tag, label: "Best Rates" },
  { icon: MessageCircle, label: "WhatsApp Support" },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row lg:items-center justify-center pt-24 pb-12 overflow-hidden bg-[#E8EDE5]">

      {/* ── Background decorative spheres (desktop only, they clip badly on mobile) ── */}
      <motion.div
        animate={{ y: [0, -25, 0], scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-[15%] left-[45%] w-24 h-24 rounded-full bg-gradient-to-br from-white/80 to-[#A5C0AD]/50 shadow-xl backdrop-blur-sm z-0 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden lg:block absolute bottom-1/4 right-[5%] w-40 h-40 rounded-full bg-gradient-to-tr from-[#688A71]/20 to-[#92B49D]/50 shadow-2xl backdrop-blur-sm z-0"
      />
      <motion.div
        animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="hidden lg:block absolute top-1/2 right-[45%] w-16 h-16 rounded-full bg-[#F4F7F2] shadow-[inset_0_-4px_6px_rgba(0,0,0,0.1),_0_8px_16px_rgba(0,0,0,0.1)] z-0"
      />

      <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-8 lg:gap-8 items-center relative z-10 px-6 md:px-12">

        {/* ── Left: Hero copy ── */}
        <div className="space-y-6 lg:space-y-8 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#DCE5DB] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2A3B32]">
            <ShieldCheck size={16} fill="#688A71" className="text-[#DCE5DB]" /> Premium Student Housing
          </div>

          <h1 className="text-[2.1rem] sm:text-[2.75rem] md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-[#2A3B32]">
            Move into your next city with confidence.
          </h1>

          <p className="text-base md:text-xl font-medium text-[#2A3B32]/90 leading-relaxed">
            Browse stays and inquire instantly via WhatsApp.
          </p>

          {/* ── Mobile feature pills (hidden on lg+) ── */}
          <div className="flex flex-wrap gap-2 lg:hidden">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-full bg-white/80 border border-black/5 shadow-sm px-3 py-1.5 text-xs font-semibold text-[#2A3B32]"
              >
                <Icon size={12} className="text-[#688A71]" />
                {label}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {/* Explore Properties — solid dark pill on every breakpoint */}
            <Link
              to="/properties"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#2A3B32] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1e2e26] hover:shadow-lg active:scale-95"
            >
              Explore Properties
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Inquire via WhatsApp — theme matched */}
            <a
              href={getWhatsAppLink("Hi Ghar+, I need help finding a premium hostel.")}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-7 py-3.5 text-sm font-bold text-[#2A3B32] shadow-sm transition hover:bg-black/5 active:scale-95"
            >
              {/* WhatsApp logo SVG */}
              <svg viewBox="0 0 24 24" fill="#25D366" className="h-5 w-5 flex-shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Inquire via WhatsApp
            </a>
          </div>
        </div>

        {/* ── Right: Photo Collage + Floating Cards (desktop only) ── */}
        <div className="hidden lg:flex relative h-[700px] w-full items-center justify-center">

          {/* Main Photo Collage */}
          <div className="relative z-10 w-full h-full">
            {/* Main Tall Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute right-[2%] top-[8%] w-[58%] h-[78%] rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white z-10"
            >
              <img
                src="https://i.pinimg.com/736x/d3/88/d3/d388d390a2bffdee1e3cd63f51c9f645.jpg"
                alt="Premium Room"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>

            {/* Top Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="absolute left-[2%] top-[18%] w-[42%] h-[34%] rounded-[2rem] overflow-hidden shadow-xl border-[6px] border-white z-20"
            >
              <img
                src="https://i.pinimg.com/736x/9d/47/b5/9d47b5c8fb6cc0036f20e9b7fb9137e3.jpg"
                alt="Study Space"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>

            {/* Bottom Left Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="absolute left-[8%] bottom-[12%] w-[45%] h-[32%] rounded-[2rem] overflow-hidden shadow-xl border-[6px] border-white z-20"
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0661/4217/5482/files/7_ways_to_decorate_a_rented_home_7.webp?v=1750771405"
                alt="Modern Living"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Floating card — Zero Brokerage */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-8 left-0 z-30 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl shadow-black/10 flex flex-col gap-2 w-48 border border-white/90"
          >
            <div className="w-8 h-8 rounded-full bg-[#E8EDE5] flex items-center justify-center text-[#2A3B32]">
              <DollarSign size={16} />
            </div>
            <p className="font-semibold text-[#2A3B32]">Zero Brokerage</p>
          </motion.div>

          {/* Floating card — Student First */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-[45%] -right-6 z-30 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl shadow-black/10 flex flex-col gap-2 w-40 border border-white/90"
          >
            <div className="w-8 h-8 rounded-full bg-[#E8EDE5] flex items-center justify-center text-[#2A3B32]">
              <Heart size={16} />
            </div>
            <p className="font-semibold text-[#2A3B32]">Student First</p>
          </motion.div>

          {/* Floating card — WhatsApp Support */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            className="absolute -bottom-2 right-[15%] z-30 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl shadow-black/10 flex flex-col gap-2 w-56 border border-white/90"
          >
            <div className="w-8 h-8 rounded-full bg-[#E8EDE5] flex items-center justify-center text-[#2A3B32]">
              <MessageCircle size={16} />
            </div>
            <p className="font-semibold text-[#2A3B32]">Instant WhatsApp Support</p>
          </motion.div>

          {/* Floating card — Verified Properties */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute top-12 left-4 z-30 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl shadow-black/10 flex flex-col gap-2 w-44 border border-white/90"
          >
            <div className="w-8 h-8 rounded-full bg-[#E8EDE5] flex items-center justify-center">
              <ShieldCheck size={18} fill="#688A71" className="text-[#E8EDE5]" />
            </div>
            <p className="font-semibold text-[#2A3B32]">Verified Properties</p>
          </motion.div>

          {/* Floating card — Best Rates */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}
            className="absolute top-10 -right-8 z-30 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl shadow-black/10 flex flex-col gap-2 w-48 border border-white/90"
          >
            <div className="w-8 h-8 rounded-full bg-[#E8EDE5] flex items-center justify-center text-[#2A3B32]">
              <Tag size={16} />
            </div>
            <p className="font-semibold text-[#2A3B32]">Best Rates Guaranteed</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
