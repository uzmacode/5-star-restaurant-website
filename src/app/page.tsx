import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import SignatureDishes from "@/components/sections/SignatureDishes";
import CtaBand from "@/components/sections/CtaBand";
import Link from "next/link";
import { Flame } from "lucide-react";

export default function Home() {
  return <>
    <Hero />
    <section className="bg-[var(--espresso)] text-[var(--paper)] py-4 overflow-hidden whitespace-nowrap">
      <div className="font-display text-xl tracking-widest animate-[marquee_22s_linear_infinite]">
        SEASONAL ✦ BIODYNAMIC ✦ KENT SOIL ✦ LINE-CAUGHT ✦ SEASONAL ✦ BIODYNAMIC ✦ KENT SOIL ✦ LINE-CAUGHT ✦
      </div>
    </section>
    <Story teaser />
    <section className="relative overflow-hidden bg-[var(--cream-2)] px-5 py-16 sm:px-8">
      <Flame className="absolute -right-3 top-6 h-28 w-28 rotate-12 text-[var(--flame)] opacity-25" aria-hidden="true" />
      <div className="sketch comic-shadow relative mx-auto grid max-w-5xl gap-6 bg-[var(--card)] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9">
        <div><p className="font-mono-price text-[10px] font-bold uppercase tracking-[.25em] text-[var(--flame)]">A table, tuned to you</p><h2 className="font-display mt-2 text-4xl sm:text-5xl">Don&apos;t book a table.<br /><i className="text-[var(--flame)]">Design your evening.</i></h2><p className="mt-3 max-w-lg text-sm">Try the room, the glow, and every course before your evening begins.</p></div>
        <Link href="/composer" className="btn-2d justify-center bg-[var(--flame)] px-5 py-4 text-xs uppercase tracking-widest text-[var(--card)]">Enter the studio</Link>
      </div>
    </section>
    <SignatureDishes limit={3} />
    <CtaBand />
  </>;
}
