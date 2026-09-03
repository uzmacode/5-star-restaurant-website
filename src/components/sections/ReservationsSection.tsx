"use client";
import { FormEvent, useState } from "react";
import { Mail, MapPin, Minus, Phone, Plus, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { ReservationDetails } from "@/types";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SEATS: ReservationDetails["seatingArea"][] = [
  "Botanical Glasshouse",
  "Main Dining Salon",
  "Chef’s Hearth Counter",
  "Herb Garden Terrace",
];

const SLOTS = ["12:00", "12:30", "13:00", "13:30", "14:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const OCCASIONS = ["Dinner & Gastronomy", "Anniversary", "Birthday", "Business", "Proposal"];

const inputCls = "w-full border-[3px] border-[var(--ink)] bg-[var(--paper)] p-3 text-sm outline-none transition-shadow focus:shadow-[3px_3px_0_var(--ink)]";

export function ReservationsSection() {
  const { createReservation } = useCart();
  const [confirmed, setConfirmed] = useState<ReservationDetails | null>(null);
  const pathname = usePathname();
  const isFirst = pathname === "/reservations";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    time: "19:30",
    guests: 2,
    seatingArea: "Botanical Glasshouse" as ReservationDetails["seatingArea"],
    specialRequests: "",
    occasion: "Dinner & Gastronomy",
  });
  const update = (key: string, value: string | number) => setForm((p) => ({ ...p, [key]: value }));
  const submit = (e: FormEvent) => { e.preventDefault(); setConfirmed(createReservation(form)); };

  return (
    <section id="reservations" className={`relative overflow-hidden bg-[var(--ink)] text-[var(--card)] ${isFirst ? "pt-36 sm:pt-40" : "pt-24"} pb-24`}>
      {/* quiet halftone */}
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(var(--flame)_1.2px,transparent_1.2px)] [background-size:26px_26px]" />
      {/* subtle doodles */}
      <motion.span animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-28 left-[6%] text-[var(--butter)] opacity-60"><Star className="w-5 h-5" /></motion.span>
      <motion.span animate={{ y: [0, -10, 0], rotate: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }} className="absolute bottom-24 right-[6%] text-[var(--flame)] opacity-60"><Sparkles className="w-6 h-6" /></motion.span>

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="TABLE BOOKINGS & PRIVATE SITTINGS" title="Reserve Your Table" />

        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 items-start mt-10">
          {/* LEFT — concierge */}
          <div className="space-y-7 pt-2">
            <h3 className="font-display text-4xl sm:text-5xl">An intimate <i className="text-[var(--flame)]">dining ritual.</i></h3>
            <p className="text-sm text-[var(--card)]/75 max-w-md">
              Tables are allocated for an unhurried evening beneath the glasshouse lanterns. For larger groups, our private salon is available.
            </p>

            <div className="grid gap-3 text-sm">
              <a className="flex items-center gap-3 hover:text-[var(--butter)] transition-colors" href={`tel:${RESTAURANT_INFO.phone}`}>
                <span className="w-11 h-11 grid place-items-center bg-[var(--flame)] border-[3px] border-[var(--card)] shadow-[3px_3px_0_rgba(0,0,0,.4)]"><Phone className="w-4" /></span>
                {RESTAURANT_INFO.phone}
              </a>
              <a className="flex items-center gap-3 hover:text-[var(--butter)] transition-colors" href={`mailto:${RESTAURANT_INFO.email}`}>
                <span className="w-11 h-11 grid place-items-center bg-[var(--flame)] border-[3px] border-[var(--card)] shadow-[3px_3px_0_rgba(0,0,0,.4)]"><Mail className="w-4" /></span>
                {RESTAURANT_INFO.email}
              </a>
              <span className="flex items-center gap-3">
                <span className="w-11 h-11 grid place-items-center bg-[var(--flame)] border-[3px] border-[var(--card)] shadow-[3px_3px_0_rgba(0,0,0,.4)]"><MapPin className="w-4" /></span>
                {RESTAURANT_INFO.address}
              </span>
            </div>

            <div className="border-[3px] border-[var(--card)] p-5 text-sm outline outline-1 outline-[var(--card)] outline-offset-4 max-w-md">
              <b className="font-display text-xl text-[var(--butter)]">Service hours</b>
              <p className="mt-3 text-[var(--card)]/80">
                {RESTAURANT_INFO.hours.lunch}<br />{RESTAURANT_INFO.hours.dinner}<br />{RESTAURANT_INFO.hours.closed}
              </p>
            </div>
          </div>

          {/* RIGHT — the ticket */}
          <div className="relative sketch comic-shadow bg-[var(--card)] text-[var(--ink)] p-6 sm:p-8 rotate-[0.4deg]">
            <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[var(--ink)]" />
            <span className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[var(--ink)]" />

            {confirmed ? (
              <div className="text-center space-y-5">
                <div className="mx-auto w-fit px-6 py-2 border-4 border-[var(--olive)] text-[var(--olive)] font-display text-2xl uppercase tracking-widest rotate-[-8deg]">Confirmed</div>
                <h3 className="font-display text-3xl">We await your arrival, {confirmed.name}</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="sketch-alt bg-[var(--paper)] p-3"><b className="block text-[9px] uppercase tracking-widest text-[var(--ink)]/60">Date</b>{confirmed.date}</div>
                  <div className="sketch-alt bg-[var(--paper)] p-3"><b className="block text-[9px] uppercase tracking-widest text-[var(--ink)]/60">Time</b>{confirmed.time}</div>
                  <div className="sketch-alt bg-[var(--paper)] p-3"><b className="block text-[9px] uppercase tracking-widest text-[var(--ink)]/60">Guests</b>{confirmed.guests}</div>
                  <div className="sketch-alt bg-[var(--paper)] p-3"><b className="block text-[9px] uppercase tracking-widest text-[var(--ink)]/60">Sitting</b>{confirmed.seatingArea}</div>
                </div>
                <p className="font-mono-price text-xs tracking-widest">REF: {confirmed.id?.toUpperCase().slice(0, 10)}</p>
                <div className="flex justify-center items-end gap-[3px] h-10">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <span key={i} className="bg-[var(--ink)]" style={{ width: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1, height: `${60 + ((i * 7) % 40)}%` }} />
                  ))}
                </div>
                <button onClick={() => setConfirmed(null)} className="btn-2d px-5 py-3 bg-[var(--flame)] text-[var(--card)] text-xs uppercase">Make Another Booking</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl">Table reservation</h3>
                  <span className="sketch-alt bg-[var(--butter)] px-3 py-1 font-mono-price text-[10px] font-bold tracking-widest">ADMIT {form.guests > 1 ? form.guests : "ONE"}</span>
                </div>

                {(["name", "email", "phone"] as const).map((field) => (
                  <input key={field} required type={field === "email" ? "email" : "text"} placeholder={field[0].toUpperCase() + field.slice(1)} value={form[field]} onChange={(e) => update(field, e.target.value)} className={inputCls} />
                ))}

                <div className="grid grid-cols-2 gap-3">
                  <input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputCls} />
                  <select value={form.time} onChange={(e) => update("time", e.target.value)} className={inputCls}>
                    {SLOTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                {/* guest stepper */}
                <div className="flex items-center justify-center gap-4 py-1">
                  <button type="button" aria-label="Fewer guests" onClick={() => update("guests", Math.max(1, form.guests - 1))} className="w-10 h-10 rounded-full border-[3px] border-[var(--ink)] bg-[var(--butter)] grid place-items-center shadow-[3px_3px_0_var(--ink)] hover:-translate-y-0.5 transition-transform"><Minus className="w-4" /></button>
                  <span className="font-display text-2xl w-24 text-center">{form.guests} <small className="text-xs uppercase">guests</small></span>
                  <button type="button" aria-label="More guests" onClick={() => update("guests", Math.min(8, form.guests + 1))} className="w-10 h-10 rounded-full border-[3px] border-[var(--ink)] bg-[var(--butter)] grid place-items-center shadow-[3px_3px_0_var(--ink)] hover:-translate-y-0.5 transition-transform"><Plus className="w-4" /></button>
                </div>

                {/* seating chips */}
                <div className="grid grid-cols-2 gap-2">
                  {SEATS.map((s) => (
                    <button type="button" key={s} onClick={() => update("seatingArea", s)} className={`sketch-alt px-3 py-2 text-[10px] uppercase tracking-wider font-bold transition-colors ${form.seatingArea === s ? "bg-[var(--flame)] text-[var(--card)]" : "bg-[var(--paper)] hover:bg-[var(--butter)]"}`}>
                      {s}
                    </button>
                  ))}
                </div>

                <select value={form.occasion} onChange={(e) => update("occasion", e.target.value)} className={inputCls}>
                  {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
                </select>

                <textarea value={form.specialRequests} onChange={(e) => update("specialRequests", e.target.value)} placeholder="Special requests (optional)" rows={3} className={inputCls} />

                <button type="submit" className="btn-2d w-full justify-center px-5 py-4 bg-[var(--flame)] text-[var(--card)] uppercase text-xs tracking-widest">Confirm Reservation</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationsSection;