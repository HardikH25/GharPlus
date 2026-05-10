import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/services", label: "Services" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="absolute inset-x-0 top-0 z-50 py-4 px-6 md:py-6 md:px-12"
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <Link to="/" className="flex flex-col items-center justify-center gap-0 tracking-tighter" onClick={() => setMobileOpen(false)}>
          <span className="text-2xl md:text-3xl font-heading font-normal text-[#2A3B32] uppercase tracking-widest relative">
            GHAR<sup className="text-sm absolute top-1 -right-3">+</sup>
          </span>
          <span className="text-[0.45rem] tracking-[0.2em] uppercase text-[#2A3B32] mt-1 text-center font-medium w-full whitespace-nowrap">
            | APNAPAN DUSRE SEHER ME |
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className="text-sm font-medium text-[#2A3B32] hover:text-black transition-colors"
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger */}
        <div className="flex items-center justify-end lg:hidden">
           <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative z-50 p-2 text-[#2A3B32] hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl bg-[#E8EDE5]/95 backdrop-blur-xl border border-[#2A3B32]/10 p-4 shadow-xl"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-xl px-4 py-3 text-base font-medium text-[#2A3B32] hover:bg-[#2A3B32]/5 transition-colors"
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
