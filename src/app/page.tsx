import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import SignatureDishes from "@/components/sections/SignatureDishes";
import CtaBand from "@/components/sections/CtaBand";

export default function Home() {
  return <>
    <Hero />
    <section className="bg-[var(--espresso)] text-[var(--paper)] py-4 overflow-hidden whitespace-nowrap">
      <div className="font-display text-xl tracking-widest animate-[marquee_22s_linear_infinite]">
        SEASONAL ✦ BIODYNAMIC ✦ KENT SOIL ✦ LINE-CAUGHT ✦ SEASONAL ✦ BIODYNAMIC ✦ KENT SOIL ✦ LINE-CAUGHT ✦
      </div>
    </section>
    <Story teaser />
    <SignatureDishes limit={3} />
    <CtaBand />
  </>;
}