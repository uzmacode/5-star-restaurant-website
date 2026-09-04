"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@thegardentable.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(""); const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }); const data = await response.json(); if (!response.ok) return setError(data.error || "Login failed"); localStorage.setItem("gt-admin-token", data.token); router.replace("/admin"); };
  return <main className="min-h-screen bg-[var(--cream-2)] grid place-items-center px-5"><form onSubmit={submit} className="sketch comic-shadow bg-[var(--card)] w-full max-w-md p-8 space-y-5"><div className="text-center"><p className="text-[10px] uppercase tracking-[.25em] text-[var(--flame)] font-bold">The Garden Table</p><h1 className="font-display text-4xl mt-2">Back of House</h1><p className="text-xs mt-2">Sign in to manage the restaurant.</p></div><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border-[3px] border-[var(--ink)] bg-[var(--paper)] p-3 text-sm" /><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border-[3px] border-[var(--ink)] bg-[var(--paper)] p-3 text-sm" />{error && <p className="text-sm text-[var(--flame-deep)]">{error}</p>}<button className="btn-2d w-full justify-center px-5 py-4 bg-[var(--flame)] text-[var(--card)] uppercase text-xs tracking-widest">Enter Portal</button></form></main>;
}
