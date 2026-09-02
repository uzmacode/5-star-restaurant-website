import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import SignatureDishes from "@/components/sections/SignatureDishes";
import Link from "next/link";

export default function Home() {
  return <>
    <Hero />
    <section className="bg-[var(--espresso)] text-[var(--paper)] py-4 overflow-hidden whitespace-nowrap"><div className="font-display text-xl tracking-widest animate-[marquee_22s_linear_infinite]">SEASONAL ✦ BIODYNAMIC ✦ KENT SOIL ✦ LINE-CAUGHT ✦ SEASONAL ✦ BIODYNAMIC ✦ KENT SOIL ✦ LINE-CAUGHT ✦</div></section>
    <Story teaser />
    <SignatureDishes limit={3} />
    <section className="py-20 bg-[var(--espresso)] text-[var(--paper)] text-center halftone">
      <div className="max-w-3xl mx-auto px-6 space-y-5">
        <span className="font-mono-price text-xs uppercase tracking-[0.25em] text-[var(--flame)]">YOUR TABLE AWAITS</span>
        <h2 className="font-display text-4xl sm:text-5xl">An evening worth <span className="italic text-[var(--flame)]">savouring</span></h2>
        <p className="font-serif-subtle text-lg text-[var(--paper)]/75">Join us beneath the glasshouse lanterns for an unhurried journey through the season.</p>
        <Link href="/reservations" className="btn-2d px-7 py-3.5 bg-[var(--paper)] text-[var(--ink)] text-xs font-mono-price uppercase tracking-widest font-semibold hover:bg-[var(--flame)] hover:text-[var(--paper)]">Reserve a Table</Link>
      </div>
    </section>
  </>;
}
