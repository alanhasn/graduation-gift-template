"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { roadmap } from "@/lib/content";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-md px-6">
        <SectionHeading eyebrow="deploy --future" title="The Road Ahead" />

        <div className="mt-16 flex flex-col items-center">
          {roadmap.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ scale: 1.04 }}
                className={`w-full min-w-[240px] rounded-2xl border p-5 text-center glass ${
                  i === 1
                    ? "border-cyan/50 neon-glow"
                    : "border-white/10"
                }`}
              >
                {i === 1 && (
                  <span className="mb-1.5 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-bright">
                    you are here
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {step.label}
                </h3>
                <p className="mt-1 text-xs text-text-secondary">{step.detail}</p>
              </motion.div>

              {i < roadmap.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: 40 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 + 0.15 }}
                  className="flex flex-col items-center py-1"
                >
                  <div className="h-full w-px bg-gradient-to-b from-cyan/50 to-violet/50" />
                  <ArrowDown className="h-4 w-4 text-violet" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
