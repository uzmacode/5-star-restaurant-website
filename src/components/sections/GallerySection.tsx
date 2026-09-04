"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Leaf, Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { GALLERY_ITEMS } from "@/data/restaurantData";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ROTS = [-2, 1.5, -1, 2];

export function GallerySection() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState(GALLERY_ITEMS);
  const pathname = usePathname();
  const isFirst = pathname === "/gallery";
  useEffect(() => { fetch("/api/gallery").then((response) => response.ok ? response.json() : Promise.reject()).then(setGalleryItems).catch(() => setGalleryItems(GALLERY_ITEMS)); }, []);
  const items = galleryItems.filter((x) => category === "All" || x.category === category);

  const prev = () => setSelected((s) => (s === null ? s : (s - 1 + items.length) % items.length));
  const next = () => setSelected((s) => (s === null ? s : (s + 1) % items.length));

  return (
    <section id="gallery" className={`relative overflow-hidden bg-[var(--cream-2)] ${isFirst ? "pt-36 sm:pt-40" : "pt-10"} pb-24`}>
      {/* ambient doodles */}
      <motion.span animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-28 left-[6%] text-[var(--olive)]"><Leaf className="w-8 h-8" /></motion.span>
      <motion.span animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="absolute bottom-20 right-[7%] text-[var(--flame)]"><Sparkles className="w-6 h-6" /></motion.span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading eyebrow="VISUAL PROVENANCE" title="Atmosphere & Moments" />
        <p className="text-center font-serif-subtle mb-10">A glimpse into the natural light, artisanal craft, and culinary artistry of our dining room.</p>

        {/* filter pills with sliding flame indicator */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {["All", "Interior", "Food", "Events"].map((x) => (
            <button key={x} onClick={() => setCategory(x)} className="relative px-5 py-2.5 border-[3px] border-[var(--ink)] rounded-xl bg-[var(--card)] overflow-hidden" aria-pressed={category === x}>
              {category === x && (
                <motion.span layoutId="gallery-pill" className="absolute inset-0 bg-[var(--flame)]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className={`relative z-10 text-xs uppercase tracking-widest font-bold ${category === x ? "text-[var(--card)]" : "text-[var(--ink)]"}`}>{x}</span>
            </button>
          ))}
        </div>

        {/* scattered polaroid grid with layout shuffle */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, y: 50, rotate: ROTS[index % 4] * 3 }}
                animate={{ opacity: 1, y: 0, rotate: ROTS[index % 4] }}
                exit={{ opacity: 0, scale: 0.85, rotate: 0 }}
                whileHover={{ rotate: 0, y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 150, damping: 18, delay: (index % 8) * 0.05 }}
                onClick={() => setSelected(index)}
                className="gallery-matte p-3 text-left bg-[var(--card)] border-[3px] border-[var(--ink)] comic-shadow relative group"
                aria-label={`View ${item.title}`}
              >
                {/* washi tape */}
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[var(--butter)]/90 border border-[var(--ink)]/20 z-10 ${index % 2 ? "rotate-3" : "rotate-[-4deg]"}`} />

                <div className={`relative ${item.aspect} overflow-hidden border-[3px] border-[var(--ink)]`}>
                  <Image src={item.image} alt={item.title} fill sizes="25vw" className="object-cover ink-img transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:rotate-1" />
                  {/* view sticker on hover */}
                  <span className="absolute bottom-2 right-2 sketch-alt bg-[var(--flame)] text-[var(--card)] px-2.5 py-1 font-mono-price text-[9px] tracking-widest rotate-[-4deg] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    VIEW ✦
                  </span>
                </div>
                <b className="font-display text-lg block mt-3">{item.title}</b>
                <p className="text-xs text-[var(--ink)]/70 mt-1">{item.caption}</p>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* lightbox with spring entrance + prev/next */}
      <AnimatePresence>
        {selected !== null && items[selected] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--ink)]/95 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40, rotate: -3 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative bg-[var(--card)] sketch comic-shadow max-w-3xl w-full p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden border-[3px] border-[var(--ink)]">
                <AnimatePresence mode="popLayout">
                  <motion.div key={items[selected].id} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0">
                    <Image src={items[selected].image} alt={items[selected].title} fill sizes="80vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>

                {/* arrows inside image */}
                <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-[3px] border-[var(--ink)] bg-[var(--card)] comic-shadow-sm grid place-items-center hover:-translate-x-0.5 transition-transform">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-[3px] border-[var(--ink)] bg-[var(--card)] comic-shadow-sm grid place-items-center hover:translate-x-0.5 transition-transform">
                  <ChevronRight className="w-4 h-4" />
                </button>

                <span className="absolute top-3 left-3 sketch-alt bg-[var(--butter)] px-2.5 py-1 font-mono-price text-[10px] font-bold tracking-widest">
                  {String(selected + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 mt-4">
                <div>
                  <h3 className="font-display text-2xl">{items[selected].title}</h3>
                  <p className="text-sm text-[var(--ink)]/70 mt-1">{items[selected].caption}</p>
                </div>
                <button onClick={() => setSelected(null)} aria-label="Close" className="w-11 h-11 shrink-0 rounded-full border-[3px] border-[var(--ink)] bg-[var(--flame)] text-[var(--card)] grid place-items-center comic-shadow-sm hover:rotate-90 transition-transform duration-300">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default GallerySection;
