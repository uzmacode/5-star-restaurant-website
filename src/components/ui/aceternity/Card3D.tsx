"use client";
import { motion } from "framer-motion";
export function Card3D({ children, className = "", intensity = 15 }: { children: React.ReactNode; className?: string; intensity?: number }) { return <motion.div className={className} whileHover={{ y: -4, rotateY: intensity / 5 }} transition={{ type: "spring", stiffness: 250, damping: 25 }} style={{ transformStyle: "preserve-3d" }}>{children}</motion.div>; }
