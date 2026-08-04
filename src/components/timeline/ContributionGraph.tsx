"use client";

import { motion } from "framer-motion";

const WEEKS = 36;
const DAYS = 7;

// Deterministic pseudo-random intensity so it's stable across renders/SSR.
function intensityAt(w: number, d: number) {
  const n = Math.sin(w * 12.9898 + d * 78.233) * 43758.5453;
  const frac = n - Math.floor(n);
  return Math.floor(frac * 5);
}

const LEVEL_COLORS = [
  "bg-white/[0.05]",
  "bg-cyan/25",
  "bg-cyan/45",
  "bg-violet/60",
  "bg-magenta/80",
];

export default function ContributionGraph() {
  return (
    <div className="mt-16 rounded-2xl glass border border-white/10 p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
          4 years of showing up
        </p>
        <p className="font-mono text-xs text-text-muted">
          <span className="text-cyan-bright">1,461</span> days committed
        </p>
      </div>

      <div className="flex gap-[3px] overflow-x-auto no-scrollbar">
        {Array.from({ length: WEEKS }).map((_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: DAYS }).map((_, d) => {
              const level = intensityAt(w, d);
              return (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.25, delay: (w * DAYS + d) * 0.0025 }}
                  className={`h-[10px] w-[10px] rounded-[2px] ${LEVEL_COLORS[level]}`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-text-muted">
        <span>less</span>
        {LEVEL_COLORS.map((c, i) => (
          <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${c}`} />
        ))}
        <span>more</span>
      </div>
    </div>
  );
}
