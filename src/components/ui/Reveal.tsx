"use client";
import { motion, type HTMLMotionProps } from "framer-motion";
export interface RevealProps extends HTMLMotionProps<"div"> { children: React.ReactNode; delay?: number; direction?: "up" | "down" | "left" | "right" | "none"; duration?: number; }
export function Reveal({ children, delay = 0, direction = "up", duration = .7, ...props }: RevealProps) { const offset = direction === "left" ? { x: 30 } : direction === "right" ? { x: -30 } : direction === "down" ? { y: -30 } : direction === "none" ? {} : { y: 30 }; return <motion.div initial={{ opacity: 0, ...offset }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration, delay, ease: [.22, 1, .36, 1] }} {...props}>{children}</motion.div>; }
