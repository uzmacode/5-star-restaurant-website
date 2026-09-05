"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, CakeSlice, Check, Copy, Heart, Leaf, Moon, Sun, Sunset, Users } from "lucide-react";
import { useState } from "react";
import { ALL_MENU_ITEMS, GALLERY_ITEMS } from "@/data/restaurantData";
import type { MenuItem } from "@/types";

type Zone = { id: string; name: string; prefix: string; capacity: number; vibe: string; image: string; premium: number; match: Record<string, number> };
type Light = { label: string; range: string; caption: string; filter: string; match: Record<string, number> };

const zones: Zone[] = [
  { id: "glasshouse", name: "Glasshouse", prefix: "Glasshouse", capacity: 4, vibe: "greenhouse · glowing leaves", image: GALLERY_ITEMS[0].image, premium: 0, match: { Anniversary: 8, "Date Night": 10, Business: 5, Family: 7 } },
  { id: "salon", name: "Salon", prefix: "Salon", capacity: 6, vibe: "linen · brass · polished", image: GALLERY_ITEMS[2].image, premium: 0, match: { Anniversary: 7, "Date Night": 7, Business: 10, Family: 9 } },
  { id: "hearth", name: "Hearth", prefix: "Hearth", capacity: 2, vibe: "chef's counter · close-up", image: GALLERY_ITEMS[1].image, premium: 10, match: { Anniversary: 9, "Date Night": 9, Business: 5, Family: 4 } },
  { id: "terrace", name: "Terrace", prefix: "Terrace", capacity: 4, vibe: "open air · herbs & sky", image: GALLERY_ITEMS[4].image, premium: 0, match: { Anniversary: 6, "Date Night": 8, Business: 6, Family: 10 } },
  { id: "private", name: "Private", prefix: "Private", capacity: 1, vibe: "quiet room · just yours", image: GALLERY_ITEMS[6].image, premium: 15, match: { Anniversary: 10, "Date Night": 10, Business: 9, Family: 5 } },
];
const lights: Light[] = [
  { label: "Lunch", range: "12–3", caption: "Bright glasshouse, long shadows, no rush.", filter: "brightness(1.14) saturate(1.05)", match: { Anniversary: 5, "Date Night": 3, Business: 9, Family: 10 } },
  { label: "Golden Hour", range: "5–7", caption: "Peach light, warm plates, the city turning amber.", filter: "sepia(.34) saturate(1.28) brightness(1.03)", match: { Anniversary: 9, "Date Night": 10, Business: 7, Family: 8 } },
  { label: "Candlelit", range: "8–11", caption: "Candlelight, low conversation, no rush.", filter: "brightness(.55) contrast(1.15) sepia(.18)", match: { Anniversary: 10, "Date Night": 10, Business: 6, Family: 4 } },
];
const occasions = [
  { label: "Date Night", icon: Heart, note: "A little electricity between every course.", zone: "hearth" },
  { label: "Anniversary", icon: CakeSlice, note: "Candlelight, low conversation, no rush.", zone: "glasshouse" },
  { label: "Business", icon: BriefcaseBusiness, note: "Good ideas need good bread and room to breathe.", zone: "salon" },
  { label: "Family", icon: Users, note: "Pass the plates. Stay for the stories.", zone: "terrace" },
];
const diets = ["Vegetarian", "Vegan", "GF", "Adventurous spice"];
const tablePositions: Record<string, [number, number][]> = { glasshouse: [[18, 20], [35, 20], [18, 38], [35, 38]], salon: [[64, 18], [82, 18], [64, 31], [82, 31], [64, 44], [82, 44]], hearth: [[19, 72], [36, 72]], terrace: [[64, 68], [82, 68], [64, 84], [82, 84]], private: [[50, 50]] };
const courseNames = ["Starter", "Fish", "Main", "Pre-dessert", "Dessert", "Mignardises", "Garden extra"];

function pickCourse(index: number, dietary: string[], occasion: string): MenuItem {
  const category = index === 0 ? "starters" : index === 1 ? "mains" : index === 2 ? "mains" : "desserts";
  const pool = ALL_MENU_ITEMS.filter((item) => item.category === category);
  const preferred = pool.filter((item) => dietary.every((diet) => diet === "Vegetarian" ? item.dietary.includes("V") : diet === "Vegan" ? item.dietary.includes("VG") : diet === "GF" ? item.dietary.includes("GF") : diet === "Adventurous spice" ? Boolean(item.spice && item.spice > 2) : true));
  const occasionBias = occasion === "Family" ? pool.find((item) => item.dietary.includes("V")) : occasion === "Business" ? pool.find((item) => item.dietary.includes("GF")) : undefined;
  return preferred[0] || occasionBias || pool[index % Math.max(pool.length, 1)] || ALL_MENU_ITEMS[0];
}

function floorPlan(zoneId: string, table: number, setTable: (zone: string, table: number) => void) {
  return <div className="studio-floor sketch-alt bg-[#dbe4cc] p-2"><svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-label="Clickable hand-drawn floor plan"><path d="M5 5h90v90H5zM5 52h90M50 5v90" fill="none" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 2" /><path d="M9 9h35v34H9zM56 9h35v34H56zM9 57h35v34H9zM56 57h35v34H56z" fill="none" stroke="var(--ink)" strokeWidth="1.5" /></svg>{zones.map((zone, zoneIndex) => tablePositions[zone.id].map((position, index) => { const selected = zoneId === zone.id && table === index + 1; return <button key={`${zone.id}-${index}`} type="button" aria-label={`Select ${zone.name} table ${index + 1}, seats ${zone.capacity}`} onClick={() => setTable(zone.id, index + 1)} className={`floor-table absolute -translate-x-1/2 -translate-y-1/2 ${selected ? "selected" : ""}`} style={{ left: `${position[0]}%`, top: `${position[1]}%` }}><span>{zone.prefix[0]}{index + 1}</span><small>{zone.capacity} seats</small></button>; }))}</div>;
}

export default function ComposerPage() {
  const router = useRouter();
  const [occasion, setOccasion] = useState("Anniversary"); const [zoneId, setZoneId] = useState("glasshouse"); const [table, setTable] = useState(2); const [lightIndex, setLightIndex] = useState(2); const [courseCount, setCourseCount] = useState(5); const [dietary, setDietary] = useState<string[]>([]); const [toast, setToast] = useState(false);
  const zone = zones.find((item) => item.id === zoneId) || zones[0]; const light = lights[lightIndex]; const occasionData = occasions.find((item) => item.label === occasion) || occasions[1];
  const courses = Array.from({ length: courseCount }, (_, index) => pickCourse(index, dietary, occasion));
  const price = courses.reduce((sum, item) => sum + item.price, zone.premium); const fit = Math.round(74 + (zone.match[occasion] || 6) * .7 + (light.match[occasion] || 6) * .8 + (courseCount === 5 ? 6 : courseCount === 7 ? 4 : 2)); const time = courseCount * 25;
  const changeZone = (id: string, nextTable = 1) => { setZoneId(id); setTable(nextTable); };
  const reserve = () => router.push(`/reservations?table=${encodeURIComponent(`${zone.prefix}-${table}`)}&time=${encodeURIComponent(light.label)}&occasion=${encodeURIComponent(occasion)}&guests=${zone.capacity > 4 ? 4 : zone.capacity}&courses=${courseCount}`);
  const share = async () => { await navigator.clipboard?.writeText(`${occasion} · ${zone.name} ${table} · ${light.label} · ${courseCount} courses · £${price}/head`); setToast(true); window.setTimeout(() => setToast(false), 2600); };

  return <main className="studio-page min-h-screen bg-[var(--paper)] px-4 pb-40 pt-32 sm:px-6 lg:pb-24"><div className="mx-auto max-w-7xl"><header className="mb-8 max-w-3xl"><p className="font-mono-price text-[10px] font-bold uppercase tracking-[.28em] text-[var(--flame)]">Evening Fitting Studio · 01</p><h1 className="font-display text-5xl leading-none sm:text-7xl">Make it <i className="text-[var(--flame)]">yours.</i></h1><p className="font-serif-subtle mt-3 max-w-xl text-lg">Try on the table, the light, and the whole delicious arc of your evening before you book it.</p></header>
    <div className="studio-card sketch comic-shadow grid gap-8 bg-[var(--card)] p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,.9fr)] lg:p-8">
      <section className="space-y-7" aria-label="Evening controls"><div><Step n="01" title="What are we marking?" /><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{occasions.map(({ label, icon: Icon }) => <button key={label} type="button" aria-pressed={occasion === label} onClick={() => { setOccasion(label); changeZone(occasions.find((item) => item.label === label)?.zone || zoneId); }} className={`choice-card ${occasion === label ? "active" : ""}`}><Icon className="mb-2 w-6" /><b>{label}</b></button>)}</div><p className="mt-3 border-l-4 border-[var(--flame)] pl-3 text-sm italic">“{occasionData.note}”</p></div>
        <div><Step n="02" title="Pick your table" /><div className="grid gap-3 sm:grid-cols-[1.25fr_1fr]">{floorPlan(zoneId, table, changeZone)}<div className="space-y-2">{zones.map((item) => <button key={item.id} type="button" aria-pressed={zoneId === item.id} onClick={() => changeZone(item.id)} className={`zone-row ${zoneId === item.id ? "active" : ""}`}><span><b>{item.name}</b><small>{item.vibe}</small></span><strong>{item.capacity} seats</strong></button>)}</div></div></div>
        <div><Step n="03" title="Set the light" /><div className="grid grid-cols-3 gap-2">{lights.map((item, index) => <button type="button" key={item.label} aria-pressed={lightIndex === index} onClick={() => setLightIndex(index)} className={`light-button ${lightIndex === index ? "active" : ""}`}>{index === 0 ? <Sun /> : index === 1 ? <Sunset /> : <Moon />}<b>{item.label}</b><small>{item.range}</small></button>)}</div></div>
        <div><div className="flex items-end justify-between"><Step n="04" title="Build the pace" /><output className="font-display text-2xl">{courseCount} courses</output></div><input className="studio-slider w-full" type="range" min="3" max="7" step="2" value={courseCount} aria-label="Number of courses" onChange={(event) => setCourseCount(Number(event.target.value))} /><div className="flex justify-between text-[10px] font-bold uppercase"><span>3 · Essential</span><span>5 · Signature</span><span>7 · Full story</span></div><div className="course-list mt-4"><AnimatePresence initial={false}>{courses.map((item, index) => <motion.article layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} key={`${item.id}-${index}`} className="course-card"><span className="course-number">0{index + 1}</span><div><b>{courseNames[index]}</b><h3>{item.name}</h3><small>{item.pairingNote || "A garden-led pairing from our cellar."}</small></div><span className="font-mono-price text-xs">£{item.price}</span></motion.article>)}</AnimatePresence></div></div>
        <div><Step n="05" title="Make it yours" /><div className="flex flex-wrap gap-2">{diets.map((diet) => <button type="button" key={diet} aria-pressed={dietary.includes(diet)} onClick={() => setDietary((current) => current.includes(diet) ? current.filter((item) => item !== diet) : [...current, diet])} className={`diet-chip ${dietary.includes(diet) ? "active" : ""}`}>{dietary.includes(diet) && <Check className="w-3" />}{diet}</button>)}</div></div>
      </section>
      <section className="preview-column" aria-label="Live evening preview"><div className={`preview-frame light-${lightIndex}`}><Image key={`${zone.id}-${lightIndex}`} src={zone.image} alt={`${zone.name} dining room`} fill sizes="(max-width: 1024px) 100vw, 45vw" className="preview-image" style={{ filter: light.filter }} /><div className="preview-wash" />{lightIndex === 2 && <div className="flame-dots" aria-hidden="true">{Array.from({ length: 7 }).map((_, i) => <i key={i} style={{ left: `${16 + i * 12}%`, bottom: `${15 + (i % 3) * 11}%` }} />)}</div>}{lightIndex === 2 && <div className="steam" aria-hidden="true"><span>〰</span><span>〰</span><span>〰</span></div>}{lightIndex === 0 && <div className="lemon-doodles" aria-hidden="true">◯　◯</div>}<div className="preview-chip">{occasion} · {zone.name} {table} · {light.label} · {courseCount} courses</div><div className="preview-caption"><span className="font-mono-price text-[10px] uppercase tracking-widest">{zone.vibe}</span><h2 className="font-display text-4xl sm:text-5xl">{occasion === "Anniversary" ? "A little forever." : occasion === "Business" ? "Ideas, served." : occasion === "Family" ? "Gather round." : "Just us."}</h2><p>{light.caption}</p></div></div><div className="preview-note"><Leaf className="w-5 shrink-0 text-[var(--flame)]" /><span>Tonight&apos;s fit: {occasionData.note}</span></div></section>
    </div>
    <div className="readout-bar comic-shadow-sm"><div><span>Evening fit</span><strong>{fit}%</strong></div><div><span>Per head</span><strong>£{price}</strong></div><div><span>Time at table</span><strong>~{Math.floor(time / 60)}h {time % 60}m</strong></div><div className="readout-actions"><button type="button" onClick={share} className="btn-2d border-[var(--card)] bg-transparent px-3 py-2 text-[10px] text-[var(--card)]"><Copy className="w-3" /> Share</button><button type="button" onClick={reserve} className="btn-2d border-[var(--card)] bg-[var(--flame)] px-4 py-2 text-[10px] uppercase text-[var(--card)]">Reserve This Exact Evening</button></div></div>{toast && <div className="studio-toast" role="status">Evening copied — send it to your date</div>}</div></main>;
}

function Step({ n, title }: { n: string; title: string }) { return <div className="mb-3 flex items-baseline gap-2"><span className="font-mono-price text-[10px] text-[var(--flame)]">{n}</span><h2 className="font-display text-2xl">{title}</h2></div>; }
