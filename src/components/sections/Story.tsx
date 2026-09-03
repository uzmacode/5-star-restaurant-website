"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Leaf, Sparkles } from "lucide-react";
import { TIMELINE_STORIES } from "@/data/restaurantData";
import { Reveal } from "@/components/ui/Reveal";

const bowls = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=70&w=500",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=70&w=500",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=70&w=500",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=70&w=500",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=70&w=500",
];

function Bowl({ src, alt, className, sizes = "180px" }: { src: string; alt: string; className?: string; sizes?: string }) {
  return (
    <div className={`rounded-full bg-[var(--ink)] p-2 border-[3px] border-[var(--ink)] comic-shadow ${className ?? ""}`}>
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}

export function Story({ teaser = false }: { teaser?: boolean }) {
  /* ============ HOME TEASER ============ */
  if (teaser) {
    return (
      <section id="story" className="py-24 bg-[var(--paper)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
            <div className="absolute inset-0 rotate-[-3deg] bg-[var(--card)] p-3 pb-16 border-[3px] border-[var(--ink)] comic-shadow">
              <div className="relative w-full h-full overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=900" alt="Chef Arthur Vance" fill sizes="500px" className="object-cover" />
              </div>
            </div>
            <span className="absolute -top-2 -left-2 w-16 h-6 bg-[var(--butter)]/90 border border-[var(--ink)]/20 rotate-[-45deg] z-10" />
            <span className="absolute -top-2 -right-2 w-16 h-6 bg-[var(--butter)]/90 border border-[var(--ink)]/20 rotate-[45deg] z-10" />
            <span className="absolute -top-3 right-8 sketch-alt bg-[var(--flame)] text-[var(--card)] px-3 py-1 font-mono-price text-[10px] font-bold tracking-widest rotate-[6deg] z-10">EST. 2012</span>
            <div className="speech-bubble absolute -bottom-6 -right-4 lg:-right-8 w-56 p-4 rotate-[3deg] z-20">
              <span className="font-display text-5xl text-[var(--flame)] leading-none">{"\u201C"}</span>
              <p className="font-display italic text-base leading-tight -mt-2">The soil whispers. We listen, then serve.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="sketch-alt inline-flex items-center gap-1.5 bg-[var(--card)] px-3 py-1 font-mono-price text-[10px] uppercase tracking-widest"><Leaf className="w-3 h-3 text-[var(--olive)]" /> Kent soil</span>
              <span className="sketch-alt inline-flex items-center gap-1.5 bg-[var(--card)] px-3 py-1 font-mono-price text-[10px] uppercase tracking-widest"><Sparkles className="w-3 h-3 text-[var(--butter)]" /> Zero waste</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl leading-[.95]">A sanctuary where nature sets <i className="text-[var(--flame)]">the rhythm</i></h2>
            <p className="text-[var(--ink)]/75 text-base sm:text-lg leading-relaxed">
              Established in 2012 within a heritage Victorian conservatory in Kensington, The Garden Table was conceived as a communion between classical French technique and Britain&apos;s micro-climates.
            </p>
            <p className="font-serif-subtle italic text-lg text-[var(--olive)]">
              15 years, 50,000 guests, and three green Michelin stars later — our story is only just beginning.
            </p>

            <div className="flex items-center gap-5 pt-3">
              {[{ n: "15+", l: "years" }, { n: "50K+", l: "guests" }, { n: "3", l: "stars" }].map((s) => (
                <div key={s.l} className="text-center">
                  <b className="font-display text-2xl text-[var(--flame)] block leading-none">{s.n}</b>
                  <span className="text-[9px] uppercase tracking-widest text-[var(--ink)]/60">{s.l}</span>
                </div>
              ))}
              <div className="flex-1 h-px bg-[var(--ink)]/20" />
            </div>

            <Link href="/our-story" className="btn-2d px-6 py-3.5 bg-[var(--card)] text-xs uppercase inline-flex">
              Read Our Full Story <ChevronRight className="w-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* ============ /OUR-STORY ============ */
  return (
    <section id="story" className="relative pt-40 sm:pt-44 pb-0 bg-[var(--paper)] overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-6 mb-20">
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="sketch-alt inline-flex items-center gap-1.5 bg-[var(--card)] px-3 py-1 font-mono-price text-[10px] uppercase tracking-widest"><Clock className="w-3 h-3 text-[var(--flame)]" /> Est. 2012</span>
          <span className="sketch-alt inline-flex items-center gap-1.5 bg-[var(--card)] px-3 py-1 font-mono-price text-[10px] uppercase tracking-widest"><Leaf className="w-3 h-3 text-[var(--olive)]" /> Kent soil</span>
          <span className="sketch-alt inline-flex items-center gap-1.5 bg-[var(--card)] px-3 py-1 font-mono-price text-[10px] uppercase tracking-widest"><Sparkles className="w-3 h-3 text-[var(--butter)]" /> Zero waste</span>
        </div>
        <h2 className="font-display text-4xl sm:text-6xl">A sanctuary where nature sets <i className="text-[var(--flame)]">the rhythm</i></h2>
        <p className="text-[var(--ink)]/70 text-sm leading-relaxed">
          Every dawn, our foragers and Kent farmers harvest heirloom botanicals, wild sorrel, and rare root vegetables. By midday, these treasures are transformed at our open hearth. Scroll the table — our story is served course by course.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <rect width="100" height="100" fill="var(--flame)" />
          <path d="M0,0 L58,0 C42,10 66,18 52,30 C40,42 64,50 50,62 C38,74 62,84 48,100 L0,100 Z" fill="var(--paper)" />
        </svg>

        <span className="absolute left-[10%] top-[6%] w-2.5 h-2.5 rounded-full bg-[var(--flame)]" />
        <span className="absolute left-[16%] top-[9%] w-1.5 h-1.5 rounded-full bg-[var(--flame)]" />
        <span className="absolute left-[8%] top-[12%] w-1 h-1 rounded-full bg-[var(--olive)]" />
        <span className="absolute right-[12%] top-[38%] w-2 h-2 rounded-full bg-[var(--card)]" />
        <span className="absolute right-[8%] top-[42%] w-1.5 h-1.5 rounded-full bg-[var(--butter)]" />
        <span className="absolute left-[14%] bottom-[10%] w-2 h-2 rounded-full bg-[var(--flame)]" />
        <span className="absolute left-[20%] bottom-[7%] w-1 h-1 rounded-full bg-[var(--olive)]" />

        <svg className="absolute left-[4%] bottom-[14%] w-32 sm:w-44 opacity-90" viewBox="0 0 200 200" aria-hidden>
          <path d="M150,35 A72,72 0 1,0 152,150" stroke="var(--flame)" strokeWidth="16" fill="none" strokeLinecap="round" />
          <path d="M162,60 A52,52 0 1,0 163,140" stroke="var(--flame)" strokeWidth="7" fill="none" strokeLinecap="round" />
        </svg>

        <div className="relative z-10 space-y-16 sm:space-y-24 py-14">
          {TIMELINE_STORIES.map((item, idx) => {
            const onWhite = idx % 2 === 0;
            return (
              <Reveal key={item.year} delay={0.1}>
                <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] items-center gap-5 sm:gap-8">
                  <div className="order-2 sm:order-1 w-full sm:text-right">
                    {onWhite && (
                      <div>
                        <span className="sketch-alt inline-block bg-[var(--butter)] px-2.5 py-0.5 font-mono-price text-[10px] font-bold tracking-widest">{item.year}</span>
                        <p className="font-display text-2xl sm:text-3xl leading-tight mt-2">{item.title}</p>
                      </div>
                    )}
                  </div>

                  <div className={`order-1 sm:order-2 relative w-40 h-40 sm:w-52 sm:h-52 ${idx % 2 ? "rotate-2" : "-rotate-2"}`}>
                    <Bowl src={bowls[idx % bowls.length]} alt={item.title} className="w-full h-full" sizes="220px" />
                  </div>

                  <div className="order-3 w-full">
                    {!onWhite && (
                      <div>
                        <span className="sketch-alt inline-block bg-[var(--card)] px-2.5 py-0.5 font-mono-price text-[10px] font-bold tracking-widest">{item.year}</span>
                        <p className="font-display text-2xl sm:text-3xl leading-tight mt-2 text-[var(--card)]">{item.title}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ====== THE SIGNATURE ====== */}
      <div className="relative mt-24 bg-[var(--ink)] text-[var(--card)] overflow-hidden">
        <svg className="absolute -top-px left-0 w-full text-[var(--paper)]" viewBox="0 0 1440 60" fill="currentColor" preserveAspectRatio="none" aria-hidden>
          <path d="M0,0 L0,20 C240,60 480,60 720,30 C960,0 1200,10 1440,40 L1440,0 Z" />
        </svg>

        <div className="absolute top-10 right-0 w-40 h-40 halftone opacity-[0.08]" />
        <div className="absolute bottom-10 left-0 w-32 h-32 halftone opacity-[0.08]" />

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-[auto_1fr] gap-12 items-center">
          <div className="relative mx-auto">
            <svg className="absolute inset-[-30%] w-[160%] h-[160%]" viewBox="0 0 200 200" aria-hidden>
              <path d="M150,35 A72,72 0 1,0 152,150" stroke="var(--butter)" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5" />
              <path d="M162,60 A52,52 0 1,0 163,140" stroke="var(--flame)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
            </svg>
            <div className="relative w-56 h-56 md:w-72 md:h-72 rotate-[-4deg]">
              <Bowl src={bowls[4]} alt="The Garden Table today" className="w-full h-full" sizes="290px" />
            </div>
            <span className="absolute -bottom-2 -right-2 sketch-alt bg-[var(--flame)] text-[var(--card)] px-3 py-1 font-mono-price text-[10px] font-bold tracking-widest rotate-[8deg] border-[var(--card)]">TODAY</span>
          </div>

          <div>
            <span className="font-display text-7xl md:text-8xl text-[var(--flame)] leading-none block">{"\u201C"}</span>
            <p className="font-display italic text-3xl md:text-5xl leading-[1.05] -mt-10">
              The soil whispers.<br />We listen,<br />then <span className="text-[var(--flame)]">serve</span>.
            </p>
            <p className="font-mono-price text-[11px] uppercase tracking-widest text-[var(--butter)] mt-6">— Chef Arthur Vance, Founder</p>

            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-[var(--card)]/20 flex-wrap">
              {[{ n: "15+", l: "years" }, { n: "50K+", l: "guests" }, { n: "3", l: "stars" }].map((s) => (
                <div key={s.l}>
                  <b className="font-display text-4xl text-[var(--flame)] block leading-none">{s.n}</b>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--card)]/70">{s.l}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/reservations" className="btn-2d px-7 py-3.5 bg-[var(--flame)] text-[var(--card)] text-xs uppercase tracking-widest">Reserve Your Table</Link>
              <Link href="/seasonal-menu" className="btn-2d px-7 py-3.5 bg-[var(--card)] text-[var(--ink)] text-xs uppercase tracking-widest">See the Menu</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story;