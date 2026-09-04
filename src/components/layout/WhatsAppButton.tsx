"use client";
import { MessageCircle } from "lucide-react"; import { RESTAURANT_INFO } from "@/data/restaurantData";
export function WhatsAppButton(){const href=`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent("Hello The Garden Table concierge, I would like to inquire about dining reservations.")}`;return <a href={href} target="_blank" rel="noopener noreferrer" className="btn-2d fixed bottom-6 right-6 z-30 px-4 py-3 bg-[var(--cream)]" aria-label="Contact Concierge on WhatsApp"><MessageCircle/></a>}; export default WhatsAppButton;
