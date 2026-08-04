"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy } from "lucide-react";
import { achievement } from "@/lib/content";
import { useSound } from "@/hooks/useSound";

export default function Achievement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const fired = useRef(false);
  const sound = useSound();

  useEffect(() => {
    if (!inView || fired.current) return;
    fired.current = true;
    sound.unlock();
    const colors = ["#22d3ee", "#8b5cf6", "#ec4899", "#fbbf24"];

    confetti({
      particleCount: 90,
      spread: 70,
      startVelocity: 38,
      origin: { y: 0.55 },
      colors,
      zIndex: 60,
    });
    const timer = setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: 0.6 }, colors, zIndex: 60 });
      confetti({ particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: 0.6 }, colors, zIndex: 60 });
    }, 250);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section id="achievement" className="relative py-28 sm:py-36">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.7, rotateX: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          className="relative w-full max-w-md"
          style={{ perspective: 800 }}
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-gold/30 via-violet/20 to-cyan/20 blur-2xl animate-pulse-glow" />

          <div className="relative overflow-hidden rounded-3xl glass-strong border border-gold/30 p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-violet/10" />
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/20 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]" />
                {achievement.rarity} Achievement
              </span>

              <motion.div
                animate={{ rotate: [0, -6, 6, -4, 4, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 1.4, delay: 0.5 }}
                className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/30 to-gold/5 neon-border"
              >
                <Trophy className="h-11 w-11 text-gold" strokeWidth={1.5} />
              </motion.div>

              <h3 className="mt-6 font-display text-2xl font-semibold text-text-primary sm:text-3xl">
                {achievement.title}
              </h3>
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.25em] text-gradient-gold">
                {achievement.subtitle}
              </p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
                {achievement.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
