"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CartDrawer from "@/components/layout/CartDrawer";
import ToastNotification from "@/components/layout/ToastNotification";
import FloatingGarnish from "@/components/shared/FloatingGarnish";
import SpecialsTicker from "@/components/shared/SpecialsTicker";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return <><div className="fixed inset-0 paper-grain pointer-events-none z-30 opacity-60" /><Preloader /><Navbar /><SpecialsTicker /><div className="page-mount relative"><FloatingGarnish />{children}</div><Footer /><CartDrawer /><WhatsAppButton /><ToastNotification /></>;
}
