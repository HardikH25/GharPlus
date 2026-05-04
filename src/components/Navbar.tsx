import { AnimatePresence, motion } from "framer-motion";
import { Home, LayoutGrid, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/properties", label: "Properties", icon: LayoutGrid },
  { to: "/services", label: "Services", icon: Sparkles },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed inset-x-0 top-0 z-50 py-3 px-3 md:py-4"
    >
      <nav className="mx-auto flex h-14 md:h-16 w-full max-w-6xl items-center justify-between rounded-2xl glass-card px-4 md:px-8 shadow-glass">
        <NavLink to="/" className="tracking-tight relative group" onClick={() => setMobileOpen(false)}>
          <p className="text-lg md:text-xl font-heading font-bold text-zinc-50 tracking-wide text-gradient">Ghar+</p>
          <motion.div
            className="absolute -bottom-1 left-0 h-[2px] bg-accent-primary"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "text-zinc-50"
                    : "text-zinc-400 hover:text-zinc-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 rounded-xl bg-glass-border shadow-inner"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon size={16} className="relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="sm:hidden relative z-50 rounded-xl p-2 text-zinc-300 hover:text-zinc-50 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden mx-auto mt-2 max-w-5xl rounded-2xl glass-card border border-glass-border bg-zinc-950/95 backdrop-blur-2xl p-3 shadow-glass"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-accent-primary/10 text-emerald-300"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                  }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
