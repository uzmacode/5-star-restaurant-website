"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Check, Filter, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { ALL_MENU_ITEMS } from "@/data/restaurantData";
import type { DietaryTag } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart } from "@/context/CartContext";

const CATEGORIES = [
  { id: "all", label: "Complete" },
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "desserts", label: "Desserts" },
  { id: "botanical-cellar", label: "Cellar" },
];

export function MenuSection() {
  const [category, setCategory] = useState("all");
  const [dietary, setDietary] = useState<DietaryTag[]>([]);
  const [added, setAdded] = useState<string | null>(null);
  const { addToCart } = useCart();
  const pathname = usePathname();
  const isFirst = pathname === "/seasonal-menu";

  const filtered = useMemo(
    () => ALL_MENU_ITEMS.filter((item) => (category === "all" || item.category === category) && (dietary.length === 0 || dietary.every((tag) => item.dietary.includes(tag)))),
    [category, dietary]
  );

  const countFor = (id: string) => (id === "all" ? ALL_MENU_ITEMS.length : ALL_MENU_ITEMS.filter((i) => i.category === id).length);

  const handleAdd = (item: (typeof ALL_MENU_ITEMS)[number]) => {
    addToCart(item);
    setAdded(item.id);
    setTimeout(() => setAdded(null), 1200);
  };

  return (
    <section id="menu" className={`relative overflow-hidden bg-[var(--paper)] ${isFirst ? "pt-36 sm:pt-40" : "pt-10"} pb-24`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading eyebrow="AUTUMN / WINTER TASTING SELECTION" title="The Seasonal Menu" />
        <p className="text-center font-serif-subtle max-w-xl mx-auto mb-6">Each dish reflects seasonal micro-harvests, organic game, and sustainably caught seafood with low-intervention pairings.</p>

        {/* diagonal floating plates — 3 layers: mount / float / hover */}
        <div className="relative h-40 sm:h-48 max-w-2xl mx-auto mb-4">
          {ALL_MENU_ITEMS.slice(0, 3).map((item, i) => (
            <motion.div
              key={item.id}
              className="absolute w-24 h-24 sm:w-32 sm:h-32"
              style={{ left: `${12 + i * 30}%`, top: `${i * 18}%` }}
              initial={{ opacity: 0, scale: 0.6, rotate: i % 2 ? -30 : 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: i % 2 ? 2 : -2 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 160, damping: 16, delay: i * 0.15 }}
            >
              <motion.div
                className="w-full h-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="w-full h-full rounded-full border-[3px] border-[var(--ink)] bg-[var(--ink)] p-1.5 comic-shadow cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: i % 2 ? -4 : 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image src={item.image} alt={item.name} fill sizes="130px" className="object-cover" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* stepper category tabs */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <span className="absolute left-8 right-8 top-[14px] h-[3px] bg-[var(--ink)]/15" />
          <div className="relative flex justify-between">
            {CATEGORIES.map((c) => {
              const active = category === c.id;
              return (
                <motion.button key={c.id} onClick={() => setCategory(c.id)} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-1.5 group">
                  <motion.span
                    animate={active ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`relative w-7 h-7 rounded-full border-[3px] border-[var(--ink)] grid place-items-center text-[9px] font-bold transition-colors ${active ? "bg-[var(--flame)] text-[var(--card)] comic-shadow-sm -translate-y-0.5" : "bg-[var(--card)] text-[var(--ink)]/60 group-hover:bg-[var(--butter)]"}`}
                  >
                    {countFor(c.id)}
                  </motion.span>
                  <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${active ? "text-[var(--ink)]" : "text-[var(--ink)]/45"}`}>{c.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* dietary chips */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="flex flex-wrap justify-center items-center gap-2 border-t-[3px] border-[var(--ink)]/15 pt-4 mb-10 text-xs"
        >
          <Filter className="w-4 text-[var(--flame)]" />
          {(["V", "VG", "GF", "DF"] as DietaryTag[]).map((tag) => (
            <motion.button
              key={tag}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setDietary((p) => (p.includes(tag) ? p.filter((x) => x !== tag) : [...p, tag]))}
              className={`rounded-full border-[3px] border-[var(--ink)] px-2.5 py-1 font-bold transition-colors ${dietary.includes(tag) ? "bg-[var(--olive)] text-[var(--card)]" : "bg-[var(--card)] hover:bg-[var(--butter)]"}`}
            >
              {tag}
            </motion.button>
          ))}
          {dietary.length > 0 && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setDietary([])} className="underline">
              Clear filters
            </motion.button>
          )}
        </motion.div>

        {/* sticker rows */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.length ? (
              filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30, rotate: idx % 2 ? 2 : -2 }}
                  animate={{ opacity: 1, y: 0, rotate: idx % 2 ? 0.4 : -0.4 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 160, damping: 18, delay: (idx % 6) * 0.04 }}
                  whileHover={{ rotate: 0, y: -4, boxShadow: "6px 6px 0 var(--ink)" }}
                  className="relative flex items-center gap-4 sm:gap-5 border-[3px] border-[var(--ink)] rounded-2xl bg-[var(--card)] p-4 sm:p-5 mb-5 comic-shadow-sm group"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rotate-[-3deg] border-[3px] border-[var(--ink)] bg-[var(--ink)] p-1 comic-shadow-sm group-hover:rotate-0 transition-transform duration-300">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image src={item.image} alt={item.name} fill sizes="100px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg sm:text-xl leading-tight">{item.name}</h3>
                      <b className="font-display text-lg text-[var(--flame)] shrink-0">£{item.price.toFixed(0)}</b>
                    </div>
                    <p className="text-xs text-[var(--ink)]/70 leading-relaxed mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex gap-1.5 mt-2">
                      {item.dietary.map((tag) => (
                        <span key={tag} className="text-[8px] font-bold border-2 border-[var(--olive)] text-[var(--olive)] rounded-full px-1.5 py-0.5">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    whileHover={{ rotate: added === item.id ? 0 : 8 }}
                    onClick={() => handleAdd(item)}
                    aria-label={`Add ${item.name}`}
                    className="w-11 h-11 shrink-0 rounded-xl border-[3px] border-[var(--ink)] bg-[var(--butter)] grid place-items-center shadow-[3px_3px_0_var(--ink)] hover:-translate-y-0.5 active:translate-y-0.5 transition-transform"
                  >
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={added === item.id ? "check" : "plus"}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="grid place-items-center"
                      >
                        {added === item.id ? <Check className="w-4 h-4 text-[var(--olive)]" /> : <Plus className="w-4 h-4" />}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-display text-2xl">
                No dishes match those filters.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default MenuSection;