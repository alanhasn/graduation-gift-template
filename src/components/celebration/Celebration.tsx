"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";
import MusicToggle from "@/components/shared/MusicToggle";

const Starfield = dynamic(() => import("@/components/shared/Starfield"), { ssr: false });

export default function Celebration() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-150px" });
  const fired = useRef(false);

  useEffect(() => {
    if (!inView || fired.current) return;
    fired.current = true;

    const duration = 3200;
    const end = Date.now() + duration;
    const colors = ["#22d3ee", "#8b5cf6", "#ec4899", "#fbbf24", "#34d399"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors,
        zIndex: 60,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors,
        zIndex: 60,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    const fireworkTimer = setInterval(() => {
      confetti({
        particleCount: 60,
        startVelocity: 28,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random() * 0.7 + 0.15, y: Math.random() * 0.4 + 0.15 },
        colors,
        zIndex: 60,
        scalar: 0.9,
      });
    }, 550);

    setTimeout(() => clearInterval(fireworkTimer), duration);

    return () => clearInterval(fireworkTimer);
  }, [inView]);

  return (
    <section
      ref={ref}
      id="celebration"
      className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      <Starfield className="absolute inset-0 z-0 opacity-70" />

      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-float-slow"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: 4 + (i % 3) * 3,
              height: 4 + (i % 3) * 3,
              background: ["#22d3ee", "#8b5cf6", "#ec4899", "#fbbf24"][i % 4],
              boxShadow: "0 0 12px 3px currentColor",
              color: ["#22d3ee", "#8b5cf6", "#ec4899", "#fbbf24"][i % 4],
              animationDelay: `${i * 0.4}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.35 }}
        className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl glass-strong neon-glow"
      >
        <Sparkles className="h-7 w-7 text-gold" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 max-w-2xl font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-6xl"
      >
        You <span className="text-gradient text-glow">did it</span>.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative z-10 mt-4 max-w-md text-base text-text-secondary sm:text-lg"
      >
        Take a second. Look how far you came. This one&rsquo;s worth celebrating — loudly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 mt-10"
      >
        <MusicToggle />
      </motion.div>
    </section>
  );
}
