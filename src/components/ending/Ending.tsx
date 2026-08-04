"use client";

import { motion } from "framer-motion";
import { ending, signature, graduates } from "@/lib/content";

export default function Ending() {
  return (
    <section id="ending" className="relative flex min-h-[70svh] flex-col items-center justify-center px-6 py-28 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl font-display text-3xl font-medium leading-snug text-text-primary sm:text-5xl"
      >
        {ending.line1}
        <br />
        <span className="text-gradient text-glow">{ending.line2}</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-16 flex flex-col items-center gap-1"
      >
        <p className="font-mono text-sm text-text-muted">{signature.from}</p>
        <p className="font-display text-2xl italic text-text-primary" style={{ fontFamily: "cursive" }}>
          {signature.name}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-20 flex items-center gap-3 font-mono text-xs text-text-muted"
      >
        <span className="h-px w-10 bg-white/15" />
        <span>
          {graduates.shortNames[0]} · {graduates.shortNames[1]} · {graduates.gradYear}
        </span>
        <span className="h-px w-10 bg-white/15" />
      </motion.div>
    </section>
  );
}
