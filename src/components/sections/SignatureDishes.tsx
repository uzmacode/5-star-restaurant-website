"use client";
import Link from "next/link";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Clock, Heart, Leaf, Plus, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SIGNATURE_DISHES } from "@/data/restaurantData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart } from "@/context/CartContext";

const TIMES = ["25 mins", "35 mins", "30 mins", "40 mins", "28 mins", "32 mins"];

export function SignatureDishes({ limit }: { limit?: number }) {
  const dishes = limit ? SIGNATURE_DISHES.slice(0, limit) : SIGNATURE_DISHES;
  const [idx, setIdx] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [added, setAdded] = useState<string | null>(null);
  const { addToCart } = useCart();
  const pathname = usePathname();
  const isFirst = pathname === "/signatures"; // pad below navbar only when this is the top section
  const dish = dishes[idx % dishes.length];

  const prev = () => setIdx((v) => (v - 1 + dishes.length) % dishes.length);
  const next = () => setIdx((v) => (v + 1) % dishes.length);

  const handleAdd = () => {
    addToCart(dish);
    setAdded(dish.id);
    setTimeout(() => setAdded(null), 1200);
  };

  return (
    <section id="signatures" className={`relative overflow-hidden bg-[var(--cream-2)] ${isFirst ? "pt-36 sm:pt-40" : "pt-10"} pb-20`}>
      {/* halftone corners */}
      <div className="absolute top-24 left-0 w-40 h-40 halftone opacity-15" />
      <div className="absolute bottom-8 right-0 w-48 h-48 halftone opacity-15" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="CHEF ARTHUR VANCE’S CURATION" title="Signature Dishes" />
        <p className="text-center font-serif-subtle text-base max-w-xl mx-auto mb-8">
          Perennial favorites crafted from morning harvests in our Kent walled garden and pristine coastal catches.
        </p>

        {/* filmstrip rail */}
        <div className="flex gap-3 justify-start sm:justify-center overflow-x-auto pb-3 mb-8">
          {dishes.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setIdx(i)}
              aria-label={`Show ${d.name}`}
              className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[3px] p-0.5 bg-[var(--card)] transition-all duration-300 ${
                i === idx ? "border-[var(--flame)] comic-shadow-sm -translate-y-1 rotate-3" : "border-[var(--ink)]/25 opacity-60 hover:opacity-100"
              }`}
            >
              <span className="relative block w-full h-full rounded-full overflow-hidden">
                <Image src={d.image} alt={d.name} fill sizes="80px" className="object-cover" />
              </span>
            </button>
          ))}
        </div>

        {/* compact spotlight card */}
        <div className="relative max-w-3xl mx-auto">
          <button onClick={prev} aria-label="Previous dish" className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border-[3px] border-[var(--ink)] bg-[var(--card)] comic-shadow-sm grid place-items-center hover:-translate-x-0.5 transition-transform">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} aria-label="Next dish" className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border-[3px] border-[var(--ink)] bg-[var(--card)] comic-shadow-sm grid place-items-center hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="rounded-[2rem] border-[3px] border-[var(--ink)] comic-shadow bg-[var(--card)] p-6 sm:p-8 rotate-[-0.4deg] relative">
            {/* chef's pick badge */}
            <span className="absolute -top-4 left-6 sketch-alt bg-[var(--butter)] px-3 py-1 font-mono-price text-[10px] font-bold tracking-widest rotate-[-3deg] inline-flex items-center gap-1">
              <Star className="w-3 h-3 text-[var(--flame)] fill-current" /> CHEF’S PICK
            </span>

            <div className="grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-8 items-center">
              {/* plate + escaping leaves */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="absolute inset-0 rounded-full border-[3px] border-[var(--ink)] bg-[var(--ink)] p-1.5 comic-shadow"
                  >
                    <span className="relative block w-full h-full rounded-full overflow-hidden">
                      <Image src={dish.image} alt={dish.name} fill sizes="240px" className="object-cover" />
                    </span>
                  </motion.div>
                </AnimatePresence>
                <motion.span animate={{ y: [0, -8, 0], rotate: [18, 26, 18] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-6 top-4 z-10 text-[var(--olive)]"><Leaf className="w-7 h-7" /></motion.span>
                <motion.span animate={{ y: [0, -10, 0], rotate: [-14, -4, -14] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }} className="absolute -left-7 bottom-8 z-10 text-[var(--olive)]"><Leaf className="w-8 h-8 -scale-x-100" /></motion.span>
              </div>

              {/* info */}
              <div className="text-center sm:text-left">
                <h3 className="font-display text-2xl sm:text-3xl leading-tight">{dish.name}</h3>
                <span className="inline-flex items-center gap-1.5 font-mono-price text-[10px] uppercase tracking-widest text-[var(--ink)]/70 mt-2">
                  <Clock className="w-3.5 h-3.5 text-[var(--flame)]" /> {TIMES[idx % TIMES.length]}
                </span>
                <p className="text-[var(--ink)]/70 text-sm leading-relaxed mt-3">{dish.description}</p>

                <div className="flex items-center justify-center sm:justify-start gap-4 mt-5 flex-wrap">
                  <div className="text-left">
                    <span className="block text-[9px] uppercase tracking-widest text-[var(--ink)]/60">Total price</span>
                    <b className="font-display text-xl text-[var(--flame)]">£{dish.price.toFixed(2)}</b>
                  </div>
                  <button
                    onClick={() => setLiked((s) => ({ ...s, [dish.id]: !s[dish.id] }))}
                    aria-label="Save dish"
                    className={`w-10 h-10 rounded-full border-[3px] border-[var(--ink)] grid place-items-center transition-colors ${liked[dish.id] ? "bg-[var(--flame)] text-[var(--card)]" : "bg-[var(--card)] hover:bg-[var(--butter)]"}`}
                  >
                    <Heart className={`w-4 h-4 ${liked[dish.id] ? "fill-current" : ""}`} />
                  </button>
                  <button onClick={handleAdd} className="btn-2d px-5 py-3 bg-[var(--ink)] text-[var(--card)] text-xs uppercase tracking-widest">
                    {added === dish.id ? <Check className="w-4 h-4 text-[var(--olive)]" /> : <Plus className="w-4 h-4" />}
                    {added === dish.id ? "Added" : "Add to Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {limit && (
          <div className="text-center mt-10">
            <Link href="/signatures" className="btn-2d px-5 py-3 bg-[var(--card)] text-xs uppercase tracking-widest">View All Signatures</Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default SignatureDishes;