"use client";
import { useEffect, useState } from "react";

export function showToast(message: string) { window.dispatchEvent(new CustomEvent("garden-toast", { detail: message })); }

export default function ToastNotification() {
  const [message, setMessage] = useState("");
  useEffect(() => { const receive = (event: Event) => { setMessage((event as CustomEvent<string>).detail); window.setTimeout(() => setMessage(""), 3500); }; window.addEventListener("garden-toast", receive); return () => window.removeEventListener("garden-toast", receive); }, []);
  if (!message) return null;
  return <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] sketch comic-shadow bg-[var(--card)] px-5 py-3 text-sm font-bold" role="status">{message}</div>;
}
