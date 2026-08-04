"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { terminalCommands } from "@/lib/content";
import { useSound } from "@/hooks/useSound";
import SectionHeading from "@/components/shared/SectionHeading";
import MatrixRain from "@/components/shared/MatrixRain";

type Entry =
  | { type: "input"; text: string }
  | { type: "output"; lines: string[]; tone?: "normal" | "error" | "success" };

const KNOWN_COMMANDS = [...terminalCommands.map((c) => c.command), "clear"];

const WELCOME: string[] = [
  "Welcome to grad-shell v2026.1.0",
  "Type 'help' to see available commands.",
  "",
];

function resolveCommand(raw: string): Entry {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "clear") {
    return { type: "output", lines: [] };
  }

  const match = terminalCommands.find((c) => c.command === cmd);
  if (match) {
    return { type: "output", lines: match.output, tone: cmd === "sudo graduate" ? "success" : "normal" };
  }

  if (cmd === "") {
    return { type: "output", lines: [] };
  }

  if (cmd === "sudo rm -rf /") {
    return {
      type: "output",
      tone: "error",
      lines: [
        "Nice try.",
        "This terminal is protected by 4 years of hard-earned trust.",
        "Permission denied.",
      ],
    };
  }

  if (cmd === "ls") {
    return {
      type: "output",
      lines: ["memories/  skills/  friendships/  diploma.pdf  future_plans.draft"],
    };
  }

  return {
    type: "output",
    tone: "error",
    lines: [
      `command not found: ${raw}`,
      "type 'help' to see what's actually available.",
    ],
  };
}

export default function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([{ type: "output", lines: WELCOME }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const sound = useSound();

  const suggestion = useMemo(() => {
    if (!input) return "";
    const found = KNOWN_COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
    return found && found !== input.toLowerCase() ? found : "";
  }, [input]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Scroll only within the terminal's own panel — never the page.
    const container = scrollContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [entries]);

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    setEntries((prev) => [...prev, { type: "input", text: raw }]);

    if (trimmed.toLowerCase() === "clear") {
      setEntries([]);
      return;
    }

    const result = resolveCommand(raw);
    if (result.type === "output" && result.lines.length > 0) {
      setEntries((prev) => [...prev, result]);
      if (result.tone === "error") sound.error();
      else if (result.tone === "success") sound.unlock();
      else sound.success();
    }

    if (trimmed) {
      setHistory((prev) => [...prev, raw]);
    }
    setHistoryIndex(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setInput(suggestion);
        sound.click();
      }
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
      return;
    }
    if (e.key.length === 1) sound.key();
  }

  return (
    <section id="terminal" className="relative overflow-hidden py-28 sm:py-36">
      <MatrixRain className="absolute inset-0 z-0 h-full w-full" opacity={0.1} />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="interactive://terminal" title="Try It Yourself" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          onClick={() => inputRef.current?.focus()}
          className="mt-14 overflow-hidden rounded-xl glass-strong border border-white/10 shadow-[0_0_60px_-15px_rgba(139,92,246,0.35)]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-text-muted">grad-shell — zsh</span>
          </div>

          <div
            ref={scrollContainerRef}
            className="no-scrollbar h-[420px] overflow-y-auto p-4 font-mono text-sm sm:p-5"
          >
            {entries.map((entry, i) =>
              entry.type === "input" ? (
                <div key={i} className="mb-1.5 flex gap-2 text-text-primary">
                  <span className="text-green">graduate@2026</span>
                  <span className="text-text-muted">~$</span>
                  <span>{entry.text}</span>
                </div>
              ) : (
                <div
                  key={i}
                  className={`mb-2 whitespace-pre-wrap ${
                    entry.tone === "error"
                      ? "text-[#f87171]"
                      : entry.tone === "success"
                      ? "text-green"
                      : "text-text-secondary"
                  }`}
                >
                  {entry.lines.join("\n")}
                </div>
              )
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2 text-text-primary">
              <span className="text-green">graduate@2026</span>
              <span className="text-text-muted">~$</span>
              <div className="relative flex-1">
                <span className="pointer-events-none absolute inset-0 whitespace-pre text-text-muted/50">
                  {input}
                  {suggestion ? suggestion.slice(input.length) : ""}
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal command input"
                  className="relative w-full bg-transparent text-transparent caret-transparent outline-none"
                  style={{ color: "transparent" }}
                />
                <span className="pointer-events-none absolute inset-0 whitespace-pre text-text-primary">
                  {input}
                </span>
                <span
                  className="pointer-events-none absolute top-0 h-[1.15em] w-[7px] animate-blink bg-cyan-bright"
                  style={{ left: `${input.length}ch` }}
                />
              </div>
            </form>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
            {["help", "whoami", "skills", "sudo graduate"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  runCommand(c);
                  inputRef.current?.focus();
                }}
                className="rounded-full glass px-3 py-1 font-mono text-xs text-text-secondary transition-colors hover:border-cyan/40 hover:text-cyan-bright"
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        <p className="mt-4 text-center font-mono text-xs text-text-muted">
          <kbd className="rounded border border-white/15 px-1.5 py-0.5">Tab</kbd> to autocomplete ·{" "}
          <kbd className="rounded border border-white/15 px-1.5 py-0.5">↑</kbd>{" "}
          <kbd className="rounded border border-white/15 px-1.5 py-0.5">↓</kbd> for history
        </p>
      </div>
    </section>
  );
}
