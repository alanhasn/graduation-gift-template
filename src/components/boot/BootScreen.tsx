"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { bootSequence } from "@/lib/content";
import { useSound } from "@/hooks/useSound";

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [skipHint, setSkipHint] = useState(false);
  const sound = useSound();

  useEffect(() => {
    let cancelled = false;
    let finished = false;

    async function finish() {
      if (finished) return;
      finished = true;
      cancelled = true;
      sound.success();
      setProgress(100);
      setExiting(true);
      await new Promise((r) => setTimeout(r, 700));
      onDone();
    }

    async function run() {
      for (let i = 0; i < bootSequence.length; i++) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, i === 0 ? 250 : 420));
        if (cancelled) return;
        setLines((prev) => [...prev, bootSequence[i]]);
        setProgress(Math.round(((i + 1) / bootSequence.length) * 100));
        sound.key();
      }
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 550));
      if (cancelled) return;
      finish();
    }

    run();
    const hintTimer = setTimeout(() => setSkipHint(true), 1400);

    function skip(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        finish();
      }
    }
    window.addEventListener("keydown", skip);

    return () => {
      cancelled = true;
      clearTimeout(hintTimer);
      window.removeEventListener("keydown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="boot"
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.03 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void px-6"
        >
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative w-full max-w-xl">
            <div className="glass-strong rounded-xl border border-white/10 p-6 font-mono text-sm shadow-2xl sm:p-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-text-muted">grad-protocol.sh</span>
              </div>

              <div className="min-h-[180px]">
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-1.5 flex items-start gap-2 text-text-secondary"
                  >
                    <span className="text-green">$</span>
                    <span className={i === bootSequence.length - 1 ? "text-cyan-bright" : ""}>
                      {line}
                    </span>
                  </motion.div>
                ))}
                {lines.length < bootSequence.length && (
                  <span className="inline-block h-4 w-2 animate-blink bg-cyan-bright align-middle" />
                )}
              </div>

              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan via-violet to-magenta"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[11px] text-text-muted">
                <span>booting graduation.exe</span>
                <span>{progress}%</span>
              </div>
            </div>

            <AnimatePresence>
              {skipHint && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-center font-mono text-xs text-text-muted"
                >
                  press <kbd className="rounded border border-white/15 px-1.5 py-0.5">enter</kbd> to skip
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
