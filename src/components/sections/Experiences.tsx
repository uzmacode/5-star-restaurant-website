"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, GlassWater, Leaf, Sparkles, UtensilsCrossed, Wine, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Exp = { title: string; description: string; image: string; icon: LucideIcon; badge: string; wide?: boolean };

const EXPERIENCES: Exp[] = [
  {
    title: "The Botanical Glasshouse",
    description: "Dine under soaring Victorian glass with living botanical walls, bathed in natural daylight and evening candlelight.",
    image: "photo-1517248135467-4c7edcad34c4",
    icon: GlassWater,
    badge: "Main Salon",
    wide: true,
  },
  {
    title: "Chef’s Hearth Counter",
    description: "An intimate 8-seat front-row view of our open-fire hearth cooking and plating.",
    image: "photo-1556910103-1c02745aae4d",
    icon: Flame,
    badge: "Exclusive",
  },
  {
    title: "Rare Cellar & Sommelier Pairings",
    description: "Over 600 bins of low-intervention, biodynamic wines and vintage Champagne curations.",
    image: "photo-1514362545857-3bc16c4c7d1c",
    icon: Wine,
    badge: "Wine List",
  },
  {
    title: "Bespoke Private Hire & Celebrations",
    description: "Full glasshouse or mezzanine buyout for private anniversaries, weddings, and executive banquets.",
    image: "photo-1552566626-52f8b828add9",
    icon: UtensilsCrossed,
    badge: "Up to 60 Guests",
    wide: true,
  },
];

export function Experiences() {
  const pathname = usePathname();
  const isFirst = pathname === "/experiences";

  return (
    <section id="experiences" className={`relative overflow-hidden bg-[var(--sky)] ${isFirst ? "pt-36 sm:pt-40" : "pt-10"} pb-24`}>
      {/* corner decor */}
      <div className="absolute top-24 left-0 w-40 h-40 halftone opacity-15" />
      <div className="absolute bottom-10 right-0 w-48 h-48 halftone opacity-15" />
      <motion.span animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-32 right-[10%] text-[var(--olive)]"><Leaf className="w-8 h-8" /></motion.span>
      <motion.span animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="absolute bottom-24 left-[8%] text-[var(--flame)]"><Sparkles className="w-6 h-6" /></motion.span>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading eyebrow="SANCTUARIES OF TASTE" title="Bespoke Dining Atmospheres" />
        <p className="text-center font-serif-subtle max-w-xl mx-auto mb-14">Every table offers a distinct ambiance tailored for romance, culinary immersion, or celebration.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 50, rotate: idx % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: idx % 2 ? 0.8 : -0.8 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 110, damping: 17, delay: (idx % 2) * 0.1 }}
              whileHover={{ rotate: 0, scale: 1.02, y: -8 }}
              className={`group sketch comic-shadow bg-[var(--card)] overflow-hidden ${exp.wide ? "md:col-span-2" : ""}`}
            >
              {/* image + stickers */}
              <div className={`relative overflow-hidden border-b-[3px] border-[var(--ink)] ${exp.wide ? "aspect-[21/9]" : "aspect-video"}`}>
                <Image
                  src={`https://images.unsplash.com/${exp.image}?auto=format&fit=crop&q=80&w=1400`}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                />
                {/* number stamp */}
                <span className="absolute bottom-3 left-3 font-display text-5xl text-[var(--card)] opacity-80" style={{ textShadow: "3px 3px 0 var(--ink)" }}>
                  0{idx + 1}
                </span>
                {/* icon sticker — wiggles on hover */}
                <span className="absolute top-3 left-3 w-11 h-11 grid place-items-center bg-[var(--butter)] border-[3px] border-[var(--ink)] comic-shadow-sm rotate-[-6deg] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <exp.icon className="w-5 h-5" />
                </span>
                {/* badge sticker */}
                <span className="absolute top-3 right-3 sketch-alt bg-[var(--flame)] text-[var(--card)] px-3 py-1 font-mono-price text-[9px] tracking-widest rotate-[4deg]">
                  {exp.badge}
                </span>
              </div>

              {/* copy */}
              <div className="p-6 sm:p-7">
                <h3 className="font-display text-2xl sm:text-3xl leading-tight">{exp.title}</h3>
                <p className="text-sm text-[var(--ink)]/70 leading-relaxed mt-2 max-w-2xl">{exp.description}</p>
                <Link href="/reservations" className="mt-5 inline-flex items-center gap-2 font-mono-price text-[10px] uppercase tracking-widest font-bold underline decoration-[var(--flame)] decoration-2 underline-offset-4 hover:text-[var(--flame)] transition-colors">
                  Book this room <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center mt-14">
          <Link href="/reservations" className="btn-2d px-8 py-3.5 bg-[var(--flame)] text-[var(--card)] uppercase text-xs tracking-widest">Inquire for Dining Experience</Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Experiences;