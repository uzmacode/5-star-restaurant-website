"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Sparkles, Star } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurantData";

export function CtaBand() {
  return (
    <section className="relative py-20 bg-[var(--butter)] overflow-hidden">
      {/* stripe corners */}
      <div className="absolute -top-8 -left-8 w-52 h-52 opacity-40 [background:repeating-linear-gradient(45deg,transparent_0_12px,var(--card)_12px_14px)]" />
      <div className="absolute -bottom-8 -right-8 w-52 h-52 opacity-40 [background:repeating-linear-gradient(45deg,transparent_0_12px,var(--card)_12px_14px)]" />

      {/* floating doodles */}
      <motion.span animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-14 left-[14%] text-[var(--flame)]"><Star className="w-5 h-5" /></motion.span>
      <motion.span animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-14 right-[16%] text-[var(--olive)]"><Leaf className="w-6 h-6" /></motion.span>
      <motion.span animate={{ y: [0, -12, 0], rotate: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-20 right-[24%] text-[var(--flame)]"><Sparkles className="w-5 h-5" /></motion.span>

      {/* the ticket — compact */}
      <div className="relative max-w-md mx-auto px-4">
        <div className="sketch comic-shadow bg-[var(--card)] rotate-[-1deg] p-6 sm:p-8 text-center relative">
          {/* punched holes */}
          <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--butter)] border-[3px] border-[var(--ink)]" />
          <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--butter)] border-[3px] border-[var(--ink)]" />

          <p className="font-mono-price text-[9px] uppercase tracking-[.25em] text-[var(--ink)]/60">The Garden Table · Table for two</p>
          <div className="border-t-2 border-dashed border-[var(--ink)]/30 my-4" />

          <h2 className="font-display text-2xl sm:text-3xl leading-[1]">An evening worth <i className="text-[var(--flame)]">savouring</i></h2>
          <p className="font-serif-subtle italic text-sm mt-3 text-[var(--ink)]/75">Join us beneath the glasshouse lanterns for an unhurried journey through the season.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
            <Link href="/reservations" className="btn-2d px-5 py-3 bg-[var(--flame)] text-[var(--card)] text-[10px] uppercase tracking-widest">Reserve a Table</Link>
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-mono-price text-[10px] underline decoration-[var(--flame)] decoration-2 underline-offset-4">or call {RESTAURANT_INFO.phone}</a>
          </div>

          <div className="border-t-2 border-dashed border-[var(--ink)]/30 mt-5 pt-3 flex items-center justify-center gap-3">
            <div className="flex items-end gap-[2px] h-5">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="bg-[var(--ink)]" style={{ width: i % 4 === 0 ? 2 : 1, height: `${50 + ((i * 9) % 50)}%` }} />
              ))}
            </div>
            <span className="font-mono-price text-[9px] tracking-widest">ADMIT TWO · EST. 2012</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaBand;