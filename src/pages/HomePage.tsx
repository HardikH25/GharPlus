import { motion } from "framer-motion";
import { ArrowRight, DollarSign, Heart, MessageCircle, ShieldCheck, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { getWhatsAppLink } from "../lib/whatsapp";

// Feature pills shown inline on mobile, as floating cards on desktop
const features = [
  { icon: DollarSign,    label: "Zero Brokerage" },
  { icon: ShieldCheck,   label: "Verified Properties" },
  { icon: Heart,         label: "Student First" },
  { icon: Tag,           label: "Best Rates" },
  { icon: MessageCircle, label: "WhatsApp Support" },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row lg:items-center justify-center pt-24 pb-12 overflow-hidden bg-[#E8EDE5]">

      {/* ── Background decorative spheres (desktop only, they clip badly on mobile) ── */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute top-[15%] left-[45%] w-24 h-24 rounded-full bg-gradient-to-br from-white/80 to-[#A5C0AD]/50 shadow-xl backdrop-blur-sm z-0 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden lg:block absolute bottom-1/4 right-[5%] w-40 h-40 rounded-full bg-gradient-to-tr from-[#688A71]/20 to-[#92B49D]/50 shadow-2xl backdrop-blur-sm z-0"
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hidden lg:block absolute top-1/2 right-[45%] w-16 h-16 rounded-full bg-[#F4F7F2] shadow-[inset_0_-4px_6px_rgba(0,0,0,0.1),_0_8px_16px_rgba(0,0,0,0.1)] z-0"
      />

      <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-8 lg:gap-8 items-center relative z-10 px-6 md:px-12">

        {/* ── Left: Hero copy ── */}
        <div className="space-y-6 lg:space-y-8 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#DCE5DB] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2A3B32]">
            <ShieldCheck size={14} /> Premium Student Housing
          </div>

          <h1 className="text-[2.1rem] sm:text-[2.75rem] md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-[#2A3B32]">
            Move into your next city with confidence.
          </h1>

          <p className="text-base md:text-xl text-[#4A5D50] leading-relaxed">
            Verified hostels with zero brokerage. Browse stays and inquire instantly via WhatsApp.
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

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-2">
            <Link
              to="/properties"
              className="group inline-flex items-center gap-2 rounded-full bg-[#2A3B32] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95 sm:bg-transparent sm:px-0 sm:py-0 sm:text-[#2A3B32] sm:rounded-none sm:text-base"
            >
              Explore Properties
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={getWhatsAppLink("Hi Ghar+, I need help finding a premium hostel.")}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[#2A3B32]/20 bg-white/60 px-6 py-3 text-sm font-semibold text-[#2A3B32] transition hover:bg-white active:scale-95 sm:bg-transparent sm:border-none sm:px-0 sm:py-0 sm:text-base sm:font-semibold"
            >
              Inquire via WhatsApp
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* ── Right: 3D Graphic + Floating Cards (desktop only) ── */}
        <div className="hidden lg:flex relative h-[700px] w-full items-center justify-center">

          {/* Main 3D Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
            <img
              src="/hero-3d.png"
              alt="Abstract 3D architectural rendering"
              className="w-[85%] h-auto max-h-full object-contain drop-shadow-2xl mix-blend-multiply"
            />
          </motion.div>

          {/* Floating card — Zero Brokerage */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-10 -left-8 z-20 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col gap-2 w-48 border border-white/60"
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
            className="absolute bottom-24 right-[25%] z-20 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col gap-2 w-40 border border-white/60"
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
            className="absolute bottom-0 -right-4 z-20 bg-white/85 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col gap-2 w-56 border border-white/60"
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
            className="absolute top-12 left-0 z-20 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col gap-2 w-44 border border-white/60"
          >
            <div className="w-8 h-8 rounded-full bg-[#E8EDE5] flex items-center justify-center text-[#2A3B32]">
              <ShieldCheck size={16} />
            </div>
            <p className="font-semibold text-[#2A3B32]">Verified Properties</p>
          </motion.div>

          {/* Floating card — Best Rates */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}
            className="absolute top-24 -right-8 z-20 bg-white/85 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col gap-2 w-48 border border-white/60"
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
