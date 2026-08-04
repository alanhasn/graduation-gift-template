"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Keyboard } from "lucide-react";
import { keyboardShortcuts } from "@/lib/content";

export default function ShortcutsOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-void/85 backdrop-blur-md px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl glass-strong border border-white/10 p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-primary">
                <Keyboard className="h-4 w-4 text-cyan-bright" />
                <h3 className="font-display text-lg font-semibold">Keyboard Shortcuts</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close shortcuts"
                className="flex h-8 w-8 items-center justify-center rounded-full glass text-text-secondary hover:text-text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="space-y-3">
              {keyboardShortcuts.map((s) => (
                <li key={s.action} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-text-secondary">{s.action}</span>
                  <kbd className="whitespace-nowrap rounded-md border border-white/15 bg-white/5 px-2 py-1 font-mono text-xs text-cyan-bright">
                    {s.keys}
                  </kbd>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
