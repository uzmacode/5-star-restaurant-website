"use client";
export function SpotlightCard({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) { return <div onClick={onClick} className={`relative overflow-hidden ${className}`}>{children}</div>; }
