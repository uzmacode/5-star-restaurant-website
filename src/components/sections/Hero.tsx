"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Clock, Leaf, MapPin, Phone, Sparkles, Star, Cherry } from "lucide-react";
import { motion } from "framer-motion";
import { RESTAURANT_INFO } from "@/data/restaurantData";

const plates = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=70&w=400",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=70&w=400",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=70&w=400",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=70&w=400",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=70&w=400",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=70&w=400",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=70&w=400",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=70&w=400",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=70&w=400",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1c?auto=format&fit=crop&q=70&w=400",
  "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=70&w=400",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=70&w=400",
];

const SPIN = 80; // seconds per full orbit

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[var(--mint)] pt-28 sm:pt-32 pb-8 overflow-hidden">
      {/* diagonal stripe corners (ref 1) */}
      <div className="absolute -top-8 -left-8 w-52 h-52 opacity-50 [background:repeating-linear-gradient(45deg,transparent_0_12px,var(--card)_12px_14px)]" />
      <div className="absolute -bottom-8 -right-8 w-52 h-52 opacity-50 [background:repeating-linear-gradient(45deg,transparent_0_12px,var(--card)_12px_14px)]" />

      {/* floating ingredient doodles (ref 2) */}
      <motion.span animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[18%] left-[6%] text-[var(--flame)]"><Cherry className="w-7 h-7" /></motion.span>
      <motion.span animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="absolute top-[30%] right-[8%] text-[var(--olive)]"><Leaf className="w-8 h-8" /></motion.span>
      <motion.span animate={{ y: [0, -12, 0], rotate: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} className="absolute bottom-[22%] left-[10%] text-[var(--butter)]"><Star className="w-6 h-6" /></motion.span>
      <motion.span animate={{ y: [0, -9, 0], rotate: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} className="absolute bottom-[30%] right-[14%] text-[var(--flame)]"><Sparkles className="w-6 h-6" /></motion.span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.05fr] gap-14 items-center min-h-[calc(100vh-200px)]">
        {/* LEFT — copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="sketch-alt inline-flex items-center gap-2 px-3 py-1 bg-[var(--card)] mb-6">
            <Sparkles className="w-3 h-3 text-[var(--flame)]" />
            <span className="font-mono-price text-[10px] uppercase tracking-[.2em]">TOKYO · EST. 2012</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[.95] tracking-tight">
            Time for
            <br />
            something
            <br />
            <span className="italic text-[var(--flame)]">delicious.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-serif-subtle text-xl max-w-xl mt-7 mb-9 leading-relaxed mx-auto lg:mx-0">
            An intimate botanical dining room rooted in biodynamic Kent soil, line-caught British seafood, and timeless European craft.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/reservations" className="btn-2d px-8 py-4 bg-[var(--flame)] text-[var(--card)] text-xs uppercase tracking-widest">Reserve Your Table</Link>
            <Link href="/seasonal-menu" className="btn-2d px-8 py-4 bg-[var(--card)] text-[var(--ink)] text-xs uppercase tracking-widest">Explore Menu</Link>
            <Link href="/composer" className="btn-2d px-8 py-4 bg-[var(--butter)] text-[var(--ink)] text-xs uppercase tracking-widest">Compose Your Evening</Link>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="font-serif-subtle italic text-lg mt-8 text-[var(--olive)]">
            psst… happy hour 5–7pm, every day 🌿
          </motion.p>
        </div>

        {/* RIGHT — THE FOOD CLOCK (ref 1) */}
        <div className="relative aspect-square w-full max-w-[340px] sm:max-w-[520px] mx-auto">
          {/* orbiting plates */}
          <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: SPIN, ease: "linear", repeat: Infinity }}>
            {plates.map((src, idx) => {
              const a = (idx / plates.length) * 2 * Math.PI - Math.PI / 2;
              const x = 50 + 45 * Math.cos(a);
              const y = 50 + 45 * Math.sin(a);
              return (
                <div key={idx} className="absolute w-[21%] sm:w-[19%] aspect-square -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                  {/* counter-rotate so plates stay upright */}
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: SPIN, ease: "linear", repeat: Infinity }} className="w-full h-full rounded-full border-[3px] border-[var(--ink)] bg-[var(--card)] comic-shadow-sm overflow-hidden p-1">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image src={src} alt={`Garden Table dish ${idx + 1}`} fill sizes="120px" className="object-cover" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* clock hands */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, ease: "linear", repeat: Infinity }} className="absolute left-1/2 top-1/2 w-1.5 h-[38%] -ml-[3px] -mt-[38%] rounded-full bg-[var(--olive)] border-2 border-[var(--ink)] origin-bottom" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 90, ease: "linear", repeat: Infinity }} className="absolute left-1/2 top-1/2 w-2 h-[26%] -ml-1 -mt-[26%] rounded-full bg-[var(--flame)] border-2 border-[var(--ink)] origin-bottom" />

          {/* center promo plate */}
          <div className="absolute inset-[27%] rounded-full border-[3px] border-[var(--ink)] bg-[var(--card)] comic-shadow flex flex-col items-center justify-center text-center p-4">
            <span className="font-display text-2xl sm:text-4xl font-bold leading-none">GET <span className="text-[var(--flame)]">25%</span> OFF</span>
            <span className="font-mono-price text-[9px] sm:text-[10px] uppercase tracking-[.2em] mt-2">on your first order</span>
            <span className="sketch-alt bg-[var(--butter)] px-3 py-1 mt-3 font-mono-price text-[10px] sm:text-xs font-bold tracking-widest">CODE: GARDEN25</span>
          </div>
        </div>
      </div>

      {/* info strip */}
      <div className="max-w-7xl mx-auto px-6 mt-10 pt-4 border-t-[3px] border-[var(--ink)]/20 flex flex-wrap gap-5 justify-between text-[11px] font-mono-price">
        <span><Clock className="inline w-3.5 mr-2" />Lunch 12–3pm · Dinner 5:30–11pm</span>
        <span><MapPin className="inline w-3.5 mr-2" />42 Kensington Church St, London</span>
        <span><Phone className="inline w-3.5 mr-2" />{RESTAURANT_INFO.phone}</span>
        <Link href="/our-story" className="uppercase tracking-widest hover:text-[var(--flame)] transition-colors">
          Discover the journey <ArrowDown className="inline w-3 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}

export default Hero;
