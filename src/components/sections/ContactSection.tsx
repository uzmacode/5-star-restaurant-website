"use client";
import { motion } from "framer-motion";
import { Clock, ExternalLink, Mail, MapPin, Navigation, Phone, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { SectionHeading } from "@/components/ui/SectionHeading";

const cardClass = "sketch comic-shadow bg-[var(--card)] p-8 space-y-4";

export function ContactSection() {
  const pathname = usePathname();
  const isFirst = pathname === "/contact";

  const infoCards = [
    {
      icon: MapPin,
      title: "Address & Transit",
      lines: [RESTAURANT_INFO.address, "High St Kensington Station (4 min)", "Valet parking on arrival"],
    },
    {
      icon: Clock,
      title: "Dining Hours",
      lines: [RESTAURANT_INFO.hours.lunch, RESTAURANT_INFO.hours.dinner, RESTAURANT_INFO.hours.bar],
    },
    {
      icon: Phone,
      title: "Direct Inquiries",
      lines: [
        <a key="phone" href={`tel:${RESTAURANT_INFO.phone}`} className="text-sm hover:text-[var(--flame)] transition-colors">{RESTAURANT_INFO.phone}</a>,
        <a key="email" href={`mailto:${RESTAURANT_INFO.email}`} className="text-xs underline decoration-[var(--flame)] decoration-2 underline-offset-2 hover:text-[var(--flame)] transition-colors">{RESTAURANT_INFO.email}</a>,
        <span key="mail" className="flex items-center gap-2 text-xs text-[var(--ink)]/70"><Mail className="w-3.5 h-3.5" /> We reply within 24 hours</span>,
      ],
    },
  ];

  return (
    <section id="contact" className={`relative overflow-hidden bg-[var(--sage)] ${isFirst ? "pt-36 sm:pt-40" : "pt-10"} pb-24`}>
      {/* ambient doodles */}
      <motion.span animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-28 right-[8%] text-[var(--flame)] opacity-60">
        <Sparkles className="w-7 h-7" />
      </motion.span>
      <motion.span animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }} className="absolute bottom-24 left-[6%] text-[var(--olive)] opacity-60">
        <Navigation className="w-6 h-6" />
      </motion.span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading eyebrow="KENSINGTON CONCIERGE & VISIT" title="Find & Contact Us" />
        <p className="text-center font-serif-subtle mb-14">Nestled near Kensington Palace Gardens, accessible by tube, taxi, and private chauffeur.</p>

        {/* info cards grid with stagger */}
        <div className="grid md:grid-cols-3 gap-6">
          {infoCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50, rotate: idx % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: idx % 2 ? 0.5 : -0.5 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: idx * 0.12 }}
              whileHover={{ rotate: 0, y: -8, boxShadow: "6px 6px 0 var(--ink)" }}
              className={cardClass}
            >
              {/* icon circle with rotation on hover */}
              <motion.span whileHover={{ rotate: 360 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="w-11 h-11 grid place-items-center bg-[var(--butter)] border-[3px] border-[var(--ink)] rounded-full">
                <card.icon className="w-5 h-5" />
              </motion.span>

              <h3 className="font-display text-xl">{card.title}</h3>

              <div className="space-y-1">
                {card.lines.map((line, i) => (
                  <p key={i} className="text-xs text-[var(--ink)]/80">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* big location card with map */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 110, damping: 18, delay: 0.2 }}
          className="mt-12 sketch comic-shadow bg-[var(--card)] p-8 sm:p-10 relative"
        >
          {/* floating pin sticker */}
          <motion.span
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-[var(--flame)] border-[3px] border-[var(--ink)] comic-shadow-sm grid place-items-center"
          >
            <MapPin className="w-5 h-5 text-[var(--card)]" />
          </motion.span>

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="font-display text-3xl sm:text-4xl">The Garden Table</h3>
              <p className="text-sm text-[var(--ink)]/70 mt-3">42 Kensington Church Street, London W8 4DB · United Kingdom</p>
              <motion.a
                href="https://maps.google.com/?q=42+Kensington+Church+Street+London+W8+4DB"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04, rotate: -1 }}
                whileTap={{ scale: 0.96 }}
                className="btn-2d inline-flex items-center gap-2 mt-6 bg-[var(--flame)] text-[var(--card)] px-5 py-3 text-xs uppercase tracking-widest"
              >
                Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            </div>

            {/* embedded map */}
            <div className="relative aspect-video border-[3px] border-[var(--ink)] rounded-xl overflow-hidden comic-shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.7!2d-0.19!3d51.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzAwLjAiTiAwwrAxMScyNC4wIlc!5e0!3m2!1sen!2suk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Garden Table location"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;