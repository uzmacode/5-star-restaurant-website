"use client";
import Link from "next/link";
import {
  Calendar, Menu as MenuIcon, ShoppingBag, X,
  BookOpen, Star, UtensilsCrossed, Sparkles, Image as ImageIcon,
  MessageCircle, HelpCircle, MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import OrdersHistoryModal from "@/components/sections/OrdersHistoryModal";

const links = [
  { slug: "our-story",     label: "Story",      icon: BookOpen },
  { slug: "signatures",    label: "Signatures", icon: Star },
  { slug: "seasonal-menu", label: "Menu",       icon: UtensilsCrossed },
  { slug: "experiences",   label: "Experience", icon: Sparkles },
  { slug: "gallery",       label: "Gallery",    icon: ImageIcon },
  { slug: "testimonials",  label: "Reviews",    icon: MessageCircle },
  { slug: "faq",           label: "FAQ",        icon: HelpCircle },
  { slug: "contact",       label: "Contact",    icon: MapPin },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [rest, setRest] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, orders } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const routeSlug = links.find((l) => pathname === `/${l.slug}`)?.slug ?? null;
  useEffect(() => { if (routeSlug) setRest(routeSlug); }, [routeSlug]);
  const active = hovered ?? routeSlug ?? rest;

  return (
    <>
      <header className={`fixed z-40 inset-x-3 sm:inset-x-6 sketch comic-shadow bg-[var(--paper)] transition-all duration-500 ${scrolled ? "top-2" : "top-3"}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? "py-2" : "py-3"}`}>
          {/* Brand */}
          <Link href="/" className="font-display font-bold leading-none">
            <span className={`transition-all duration-500 ${scrolled ? "text-lg" : "text-xl sm:text-2xl"}`}>
              THE GARDEN <span className="text-[var(--flame)]">TABLE</span>
            </span>
            <small className={`font-mono-price text-[9px] tracking-[.25em] text-[var(--flame)] mt-1 ${scrolled ? "hidden" : "block"}`}>
              TOKYO · EST. 2012
            </small>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-1" onMouseLeave={() => setHovered(null)}>
            {links.map((link) => {
              const isActive = active === link.slug;
              const isRoute = routeSlug === link.slug;
              return (
                <Link
                  key={link.slug}
                  href={`/${link.slug}`}
                  onMouseEnter={() => { setHovered(link.slug); setRest(link.slug); }}
                  className="relative flex flex-col items-center gap-1.5 px-2 py-1.5"
                >
                  <span className="relative w-11 h-11 flex items-center justify-center">
                    {/* OUTER: flies horizontally between tabs (layoutId) */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-ball"
                        className="absolute inset-0"
                        style={{ borderRadius: 999 }}
                        transition={{ type: "spring", stiffness: 550, damping: 32, mass: 0.9 }}
                      >
                        {/* INNER: drops in from above on every switch */}
                        <motion.span
                          className={`absolute inset-0 border-[3px] border-[var(--ink)] ${isRoute ? "bg-[var(--flame)]" : "bg-[var(--butter)]"}`}
                          style={{ borderRadius: 999 }}
                          initial={{ y: -28, scale: 0.9 }}
                          animate={{ y: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 600, damping: 24 }}
                        />
                      </motion.span>
                    )}
                    <motion.span
                      animate={{ y: isActive ? -1 : 0, scale: isActive ? 1.1 : 1, rotate: isActive ? -6 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className={`relative z-10 ${isActive ? "text-[var(--ink)]" : "text-[var(--ink)]/70"}`}
                    >
                      <link.icon className="w-5 h-5" />
                    </motion.span>
                  </span>
                  <span className={`relative text-[9px] uppercase tracking-widest font-bold ${isActive ? "text-[var(--ink)]" : "text-[var(--ink)]/70"}`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {orders.length > 0 && (
              <button onClick={() => setHistory(true)} className="hidden sm:block text-xs font-bold">
                Orders ({orders.length})
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative border-[3px] border-[var(--ink)] p-2 bg-[var(--card)] comic-shadow-sm hover:-translate-y-0.5 transition-transform"
              aria-label="View culinary tray"
            >
              <ShoppingBag className="w-4" />
              {cartCount > 0 && (
                <b className="absolute -top-2 -right-2 bg-[var(--flame)] border-2 border-[var(--ink)] text-[var(--card)] rounded-full text-[10px] w-5 h-5 grid place-items-center">
                  {cartCount}
                </b>
              )}
            </button>
            <Link href="/my-table" className="hidden sm:inline text-xs font-bold hover:text-[var(--flame)]">My Table</Link>
            <Link href="/reservations" className="btn-2d hidden md:inline-flex px-4 py-2 bg-[var(--flame)] text-[var(--card)] text-xs uppercase">
              <Calendar className="w-3" /> Reserve
            </Link>
            <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="lg:hidden flex flex-col p-6 gap-4 border-t-[3px] border-[var(--ink)] bg-[var(--paper)]">
            {links.map((link, i) => (
              <motion.div key={link.slug} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <Link onClick={() => setOpen(false)} href={`/${link.slug}`} className="flex items-center gap-3 font-display text-2xl">
                  <span className="border-[3px] border-[var(--ink)] bg-[var(--butter)] p-1.5 comic-shadow-sm">
                    <link.icon className="w-4 h-4" />
                  </span>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        )}
      </header>

      <OrdersHistoryModal isOpen={history} onClose={() => setHistory(false)} onSelectOrder={() => setHistory(false)} />
    </>
  );
}

export default Navbar;
