import { motion } from "framer-motion";
import {
  BadgeCheck,
  CircleDollarSign,
  HeartHandshake,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getWhatsAppLink } from "../lib/whatsapp";

const valueProps = [
  {
    title: "Verified Listings",
    description: "Every property is verified with photos, amenities, and neighborhood checks.",
    icon: BadgeCheck,
  },
  {
    title: "Zero Brokerage",
    description: "No hidden brokerage cuts. Clear pricing and transparent support.",
    icon: CircleDollarSign,
  },
  {
    title: "Student First",
    description: "Flexible plans and daily essentials designed around student routines.",
    icon: HeartHandshake,
  },
  {
    title: "Instant WhatsApp Support",
    description: "Get pricing, room availability, and onboarding help directly on WhatsApp without any waiting.",
    icon: MessageCircleMore,
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 md:space-y-16 pb-10">
      <section className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:p-10">
        <motion.div
          aria-hidden="true"
          initial={{ x: -30, y: -20, scale: 1 }}
          animate={{ x: 20, y: 10, scale: 1.08 }}
          transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="pointer-events-none absolute -left-24 -top-20 h-48 w-48 md:h-72 md:w-72 rounded-full bg-emerald-400/10 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          initial={{ x: 30, y: 20, scale: 1 }}
          animate={{ x: -20, y: -10, scale: 1.06 }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 md:h-80 md:w-80 rounded-full bg-cyan-400/10 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/3 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-emerald-300/10 blur-2xl"
        />
        <div className="relative grid items-center gap-6 md:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4 md:space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] md:text-xs uppercase tracking-[0.16em] text-emerald-300">
              <Sparkles size={12} /> Premium Student Housing
            </div>

            <h1 className="max-w-2xl text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight tracking-tight text-zinc-50">
              Move into your next city with confidence.
            </h1>

            <p className="max-w-xl text-sm md:text-base leading-relaxed text-zinc-300">
              Ghar+ helps students find verified hostels with fast support and zero brokerage.
              Browse stays in one place and inquire instantly on WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={{ scale: 1.02 }} className="w-full sm:w-auto">
                <Link
                  to="/properties"
                  className="inline-flex w-full sm:w-auto justify-center rounded-xl bg-emerald-400 px-5 py-3 md:py-2.5 text-sm font-semibold text-zinc-950"
                >
                  Explore Properties
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="w-full sm:w-auto">
                <a
                  href={getWhatsAppLink("Hi Ghar+, I need help finding a premium hostel.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-3 md:py-2.5 text-sm font-medium text-zinc-200"
                >
                  <MessageCircleMore size={16} />
                  Inquire on WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="space-y-4"
          >
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
              alt="Premium Student Apartment"
              className="h-[220px] sm:h-[300px] md:h-[380px] w-full rounded-2xl border border-zinc-800 object-cover"
            />
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3 md:p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-400/15 p-2 text-emerald-300">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-100">100% Verified Listings</p>
                  <p className="text-xs text-zinc-400">Quality checks before publishing</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-4">
        {valueProps.map((item, idx) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
            className="rounded-xl md:rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-5"
          >
            <item.icon className="text-emerald-400" size={18} />
            <h3 className="mt-3 md:mt-4 text-sm md:text-lg font-semibold tracking-tight text-zinc-50">{item.title}</h3>
            <p className="mt-1 md:mt-2 text-xs md:text-sm leading-relaxed text-zinc-400">{item.description}</p>
          </motion.article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">How it works</p>
          <h2 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-zinc-50">
            Faster search, smoother move-in.
          </h2>
          <div className="mt-4 md:mt-5 grid gap-2 md:gap-3 text-sm text-zinc-300">
            <p className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 md:px-4 py-3">1. Browse verified properties on the listing page.</p>
            <p className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 md:px-4 py-3">2. Open WhatsApp and ask for pricing and availability.</p>
            <p className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 md:px-4 py-3">3. Finalize your stay with support from Ghar+.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Need help now?</p>
          <h3 className="mt-2 text-lg md:text-xl font-semibold tracking-tight text-zinc-50">Talk to our team directly</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            Get city-wise suggestions, latest availability, and the right plan for your budget.
          </p>
          <a
            href={getWhatsAppLink("Hi Ghar+, please suggest the best hostel options for me.")}
            target="_blank"
            rel="noreferrer"
            className="mt-4 md:mt-5 inline-flex w-full justify-center rounded-xl bg-emerald-400 px-4 py-3 md:py-2.5 text-sm font-semibold text-zinc-950"
          >
            Start WhatsApp Inquiry
          </a>
        </div>
      </section>
    </div>
  );
}
