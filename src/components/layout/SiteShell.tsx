"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CartDrawer from "@/components/layout/CartDrawer";
import ToastNotification from "@/components/layout/ToastNotification";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return <><div className="fixed inset-0 paper-grain pointer-events-none z-30 opacity-60" /><Preloader /><Navbar /><div className="page-mount">{children}</div><Footer /><CartDrawer /><WhatsAppButton /><ToastNotification /></>;
}
