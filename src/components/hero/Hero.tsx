"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { hero, graduates } from "@/lib/content";
import { useMousePosition } from "@/hooks/useMousePosition";

const Starfield = dynamic(() => import("@/components/shared/Starfield"), { ssr: false });

const titleWords = hero.title.split(" ");

export default function Hero() {
  const mouse = useMousePosition();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <Starfield className="absolute inset-0 z-0" />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          transform: `translate3d(${mouse.nx * -12}px, ${mouse.ny * -8}px, 0)`,
        }}
      >
        <div className="absolute left-[15%] top-[22%] h-2 w-2 rounded-full bg-cyan-bright shadow-[0_0_12px_4px_rgba(103,232,249,0.5)] animate-float" />
        <div className="absolute right-[18%] top-[30%] h-1.5 w-1.5 rounded-full bg-violet shadow-[0_0_10px_3px_rgba(139,92,246,0.5)] animate-float-slow" />
        <div className="absolute bottom-[28%] left-[22%] h-1.5 w-1.5 rounded-full bg-magenta shadow-[0_0_10px_3px_rgba(236,72,153,0.5)] animate-float" />
        <div className="absolute bottom-[35%] right-[24%] h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_3px_rgba(251,191,36,0.5)] animate-float-slow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-cyan-bright"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" />
        Class of {graduates.gradYear} · Build Successful
      </motion.div>

      <h1
        className="relative z-10 max-w-5xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl"
        style={{
          transform: `translate3d(${mouse.nx * 6}px, ${mouse.ny * 4}px, 0)`,
        }}
      >
        {titleWords.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`mr-4 inline-block last:mr-0 ${
              word.replace(/[.,]/g, "") === "Engineers" ? "text-gradient text-glow" : "text-text-primary"
            }`}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      <div className="relative z-10 mt-8 max-w-xl space-y-1.5 font-mono text-base text-text-secondary sm:text-lg">
        {hero.subtitle.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 + i * 0.15 }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="relative z-10 mt-14 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em]">{hero.cta}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-bright" />
        </motion.div>
      </motion.div>
    </section>
  );
}
