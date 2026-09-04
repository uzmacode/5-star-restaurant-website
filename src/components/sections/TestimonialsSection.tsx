"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Sparkles, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { TESTIMONIALS } from "@/data/restaurantData";
import { SectionHeading } from "@/components/ui/SectionHeading";

const variants = {
  enter: (d: number) => ({ x: d * 90, opacity: 0, rotate: d * 7, scale: 0.95 }),
  center: { x: 0, opacity: 1, rotate: -1, scale: 1 },
  exit: (d: number) => ({ x: d * -90, opacity: 0, rotate: d * -7, scale: 0.95 }),
};

export function TestimonialsSection() {
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);
  const pathname = usePathname();
  const isFirst = pathname === "/testimonials";
  const current = testimonials[page] || testimonials[0];
  useEffect(() => { fetch("/api/testimonials").then((response) => response.ok ? response.json() : Promise.reject()).then(setTestimonials).catch(() => setTestimonials(TESTIMONIALS)); }, []);

  const paginate = (d: number) => setPage(([p]) => [(p + d + testimonials.length) % testimonials.length, d]);

  return (
    <section id="testimonials" className={`relative overflow-hidden bg-[var(--mint)] ${isFirst ? "pt-36 sm:pt-40" : "pt-10"} pb-24`}>
      <div className="absolute top-24 right-0 w-44 h-44 halftone opacity-15" />
      <div className="absolute bottom-10 left-0 w-40 h-40 halftone opacity-15" />
      <motion.span animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-32 left-[8%] text-[var(--flame)]"><Sparkles className="w-6 h-6" /></motion.span>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading eyebrow="CRITICAL ACCLAIM & PRAISE" title="Words from Our Guests" />

        {/* the deck */}
        <div className="relative mt-4">
          {/* backing cards */}
          <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-2 border-[3px] border-[var(--ink)] bg-[var(--card)] opacity-50" />
          <div className="absolute inset-0 -translate-x-2 translate-y-1 rotate-[-2.5deg] border-[3px] border-[var(--ink)] bg-[var(--card)] opacity-30" />

          <div className="relative h-[430px] sm:h-[380px]">
            <AnimatePresence mode="popLayout" custom={dir}>
              <motion.div
                key={page}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="absolute inset-0 sketch comic-shadow bg-[var(--card)] p-7 sm:p-10"
              >
                {/* counter sticker */}
                <span className="absolute -top-4 right-6 sketch-alt bg-[var(--butter)] px-3 py-1 font-mono-price text-[10px] font-bold tracking-widest rotate-[4deg]">
                   {String(page + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                </span>

                <span className="inline-block rotate-[-4deg] sketch-alt bg-[var(--butter)] p-2 mb-4">
                  <Quote className="w-5 h-5 text-[var(--flame)]" />
                </span>

                <div className="flex gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <motion.span key={i} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 400, damping: 16 }}>
                      <Star className="w-5 h-5 fill-[var(--butter)] text-[var(--ink)]" />
                    </motion.span>
                  ))}
                </div>

                <p className="font-display italic text-xl sm:text-2xl my-6 leading-snug">“{current.quote}”</p>

                <div className="border-t-[3px] border-[var(--ink)] pt-4 flex items-center justify-between">
                  <span className="font-display text-lg">
                    {current.author}
                    <small className="block text-xs text-[var(--flame)]">{current.role}</small>
                  </span>
                  <span className="font-serif-subtle italic text-sm text-[var(--olive)]">— verified guest</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* nav buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button whileTap={{ scale: 0.85 }} whileHover={{ rotate: -6 }} onClick={() => paginate(-1)} aria-label="Previous review" className="w-12 h-12 rounded-full border-[3px] border-[var(--ink)] bg-[var(--card)] comic-shadow-sm grid place-items-center">
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.85 }} whileHover={{ rotate: 6 }} onClick={() => paginate(1)} aria-label="Next review" className="w-12 h-12 rounded-full border-[3px] border-[var(--ink)] bg-[var(--flame)] text-[var(--card)] comic-shadow-sm grid place-items-center">
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
