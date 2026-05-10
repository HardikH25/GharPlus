import { motion } from "framer-motion";
import { Bike, ChefHat, type LucideIcon, Shirt, Utensils } from "lucide-react";
import { getWhatsAppLink } from "../lib/whatsapp";
import { AnimatedText } from "../components/ui/AnimatedText";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    id: "tiffin",
    title: "Tiffin Service",
    description: "Fresh homestyle meals delivered daily, with weekly rotating menus crafted for nutrition and taste.",
    icon: Utensils,
  },
  {
    id: "laundry",
    title: "Laundry Assist",
    description: "Doorstep pickup and drop with premium washing and ironing options available.",
    icon: Shirt,
  },
  {
    id: "chef",
    title: "Chef Service",
    description: "Book a personal cook for events, specialized meal prep, or weekly batching at your convenience.",
    icon: ChefHat,
  },
  {
    id: "bike",
    title: "Bike Rentals",
    description: "Flexible, well-maintained bike plans perfect for classes, internships, and easy city commuting.",
    icon: Bike,
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 md:space-y-12 pb-16 pt-28 md:pt-36 px-4 md:px-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A5D50]">Daily Essentials</p>
        <AnimatedText 
          text="Services Hub" 
          className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-[#2A3B32] lg:text-5xl" 
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-base text-[#4A5D50] max-w-xl"
        >
          Everything you need to focus on your studies, handled by professionals.
        </motion.p>
      </div>

      <motion.section
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
        className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 md:grid-cols-6"
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          const spanClass = index === 0 ? "md:col-span-4" : index === 1 ? "md:col-span-2" : "md:col-span-3";
          
          return (
            <motion.article
              key={service.id}
              variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-sm hover:shadow-md border border-black/5 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ${spanClass}`}
            >
              <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#E8EDE5] blur-3xl group-hover:bg-[#DCE5DB] transition-colors duration-500"></div>
              
              <div className="relative z-10">
                <div className="inline-flex rounded-xl md:rounded-2xl bg-[#F4F7F2] p-2.5 md:p-3 shadow-inner border border-black/5">
                  <Icon className="text-[#688A71]" size={24} />
                </div>
                <h2 className="mt-4 md:mt-6 text-xl md:text-2xl font-heading font-bold tracking-tight text-[#2A3B32]">{service.title}</h2>
                <p className="mt-2 md:mt-3 text-sm md:text-base leading-relaxed text-[#4A5D50]">{service.description}</p>
              </div>

              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-black/5 flex items-center justify-between relative z-10">
                <span className="text-xs font-semibold text-[#4A5D50] uppercase tracking-wider">Custom Plans</span>
                <a
                  href={getWhatsAppLink(`Hi Ghar+, I want pricing and complete details for ${service.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E8EDE5] px-4 py-2 text-sm font-semibold text-[#2A3B32] transition-all hover:bg-[#688A71] hover:text-white active:scale-95"
                >
                  Inquire Now →
                </a>
              </div>
            </motion.article>
          );
        })}
      </motion.section>
    </div>
  );
}
