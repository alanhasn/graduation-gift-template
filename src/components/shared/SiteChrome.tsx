"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowUp, Keyboard } from "lucide-react";
import MusicToggle from "@/components/shared/MusicToggle";
import ShortcutsOverlay from "@/components/shared/ShortcutsOverlay";
import { useMusic } from "@/context/MusicContext";
import { useSound } from "@/hooks/useSound";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function SiteChrome() {
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const { toggle: toggleMusic } = useMusic();
  const sound = useSound();

  const konamiIndex = useRef(0);
  const gPending = useRef(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setShowTop(v > 0.08));
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      // Konami code tracking works even while typing in the terminal.
      const expected = KONAMI[konamiIndex.current];
      if (e.key === expected) {
        konamiIndex.current += 1;
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0;
          triggerEasterEgg();
        }
      } else {
        konamiIndex.current = e.key === KONAMI[0] ? 1 : 0;
      }

      if (isTyping) return;

      if (e.key === "?") {
        setShortcutsOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setShortcutsOpen(false);
        return;
      }
      if (e.key.toLowerCase() === "m") {
        toggleMusic();
        return;
      }
      if (e.key.toLowerCase() === "g") {
        gPending.current = true;
        setTimeout(() => (gPending.current = false), 600);
        return;
      }
      if (gPending.current) {
        if (e.key.toLowerCase() === "h") {
          document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
        }
        if (e.key.toLowerCase() === "t") {
          document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
        }
        gPending.current = false;
      }
    }

    function triggerEasterEgg() {
      sound.unlock();
      setEasterEgg(true);
      const colors = ["#22d3ee", "#8b5cf6", "#ec4899", "#fbbf24"];
      confetti({ particleCount: 140, spread: 100, origin: { y: 0.5 }, colors, zIndex: 100 });
      setTimeout(() => setEasterEgg(false), 3200);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleMusic]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-cyan via-violet to-magenta"
        style={{ scaleX: progress }}
      />

      <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full glass-strong border border-white/10 text-text-secondary transition-colors hover:text-cyan-bright"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setShortcutsOpen(true)}
          aria-label="Show keyboard shortcuts"
          className="flex h-10 w-10 items-center justify-center rounded-full glass-strong border border-white/10 text-text-secondary transition-colors hover:text-cyan-bright"
        >
          <Keyboard className="h-4 w-4" />
        </button>

        <MusicToggle />
      </div>

      <ShortcutsOverlay open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />

      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed left-1/2 top-8 z-[100] -translate-x-1/2 rounded-full glass-strong border border-gold/40 px-5 py-2.5 font-mono text-xs text-gold shadow-2xl"
          >
            🕹️ Cheat code accepted — infinite debug points granted.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
