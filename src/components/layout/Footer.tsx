"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUp, Instagram, Facebook, Twitter } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { FormEvent, useState } from "react";
import { showToast } from "@/components/layout/ToastNotification";

export function Footer() {
  const [email, setEmail] = useState("");
  const subscribe = async (event: FormEvent) => { event.preventDefault(); const response = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); if (response.ok) { setEmail(""); showToast("You are on the garden list."); } else showToast("Please enter a valid email."); };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative py-16 px-6 border-t-[3px] border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] overflow-hidden">
      {/* animated halftone */}
      <div className="footer-halftone mb-10 opacity-30" />

      {/* floating doodle */}
      <motion.span
        animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 right-[6%] text-[var(--butter)] opacity-40"
      >
        <ArrowUp className="w-8 h-8" />
      </motion.span>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 relative z-10">
        {/* brand column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <b className="font-display text-xl text-[var(--butter)]">THE GARDEN TABLE</b>
          <p className="text-xs text-[var(--paper)]/70 mt-3">A Michelin-inspired botanical dining experience celebrating seasonal harvests and European craft.</p>
          <form onSubmit={subscribe} className="mt-5 flex gap-2"><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="min-w-0 w-full border-2 border-[var(--paper)] bg-transparent p-2 text-xs" /><button className="btn-2d shrink-0 bg-[var(--butter)] text-[var(--ink)] px-3 text-[10px] uppercase">Join</button></form>
          <div className="flex gap-2 mt-5">
            {[
              { icon: Instagram, color: "bg-[var(--flame)]", label: "Instagram" },
              { icon: Facebook, color: "bg-[var(--olive)]", label: "Facebook" },
              { icon: Twitter, color: "bg-[var(--butter)]", label: "Twitter" },
            ].map(({ icon: Icon, color, label }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                whileHover={{ rotate: 8, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`social-square ${color} grid place-items-center`}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* explore column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <b className="text-xs uppercase text-[var(--butter)]">Explore</b>
          <div className="grid gap-2 mt-3 text-xs">
            {["our-story", "signatures", "seasonal-menu", "experiences", "gallery", "testimonials", "faq", "contact", "reservations"].map((x, i) => (
              <motion.div key={x} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.04 }}>
                <Link href={`/${x}`} className="group inline-block relative hover:text-[var(--flame)] transition-colors">
                  {x.replaceAll("-", " ")}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[var(--flame)] group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* hours column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <b className="text-xs uppercase text-[var(--butter)]">Service Hours</b>
          <p className="text-xs mt-3 text-[var(--paper)]/70">
            {RESTAURANT_INFO.hours.lunch}
            <br />
            {RESTAURANT_INFO.hours.dinner}
            <br />
            {RESTAURANT_INFO.hours.closed}
          </p>
        </motion.div>

        {/* concierge column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <b className="text-xs uppercase text-[var(--butter)]">Concierge</b>
          <p className="text-xs mt-3 text-[var(--paper)]/70">
            {RESTAURANT_INFO.address}
            <br />
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[var(--flame)] transition-colors">{RESTAURANT_INFO.phone}</a>
            <br />
            <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[var(--flame)] transition-colors underline decoration-[var(--flame)] decoration-2 underline-offset-2">{RESTAURANT_INFO.email}</a>
          </p>
        </motion.div>
      </div>

      {/* bottom bar with back to top */}
      <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-[var(--paper)]/20 flex items-center justify-between flex-wrap gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-[10px] uppercase tracking-widest text-[var(--paper)]/60"
        >
          The Garden Table · Seasonal hospitality, thoughtfully grown.
        </motion.p>
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, rotate: -8 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
          className="w-10 h-10 rounded-full border-2 border-[var(--paper)]/40 grid place-items-center hover:border-[var(--flame)] hover:bg-[var(--flame)] transition-colors"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      </div>
    </footer>
  );
}

export default Footer;
