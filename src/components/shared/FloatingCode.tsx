"use client";

const SNIPPETS = [
  "git commit -m \"survived finals\"",
  "while(!success) { tryAgain(); }",
  "// TODO: sleep eventually",
  "return future.build();",
  "npm run graduate",
  "catch (e) { keepGoing(); }",
  "const dream = compile(effort);",
  "status: 200 OK",
];

type Placement = { top: string; left: string; rotate: number; delay: number; duration: number };

const PLACEMENTS: Placement[] = [
  { top: "8%", left: "6%", rotate: -6, delay: 0, duration: 9 },
  { top: "18%", left: "80%", rotate: 5, delay: 1.2, duration: 11 },
  { top: "62%", left: "4%", rotate: 4, delay: 0.6, duration: 10 },
  { top: "72%", left: "84%", rotate: -4, delay: 1.8, duration: 8.5 },
  { top: "40%", left: "90%", rotate: 3, delay: 0.9, duration: 12 },
  { top: "88%", left: "45%", rotate: -3, delay: 2.2, duration: 9.5 },
];

/**
 * Ambient decorative layer — faint drifting code snippets.
 * Purely aesthetic, hidden from assistive tech, hidden on small screens
 * to avoid crowding mobile layouts.
 */
export default function FloatingCode() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden lg:block">
      {PLACEMENTS.map((p, i) => (
        <span
          key={i}
          className="absolute animate-float-slow whitespace-nowrap rounded-lg border border-white/5 bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-text-muted/60"
          style={{
            top: p.top,
            left: p.left,
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {SNIPPETS[i % SNIPPETS.length]}
        </span>
      ))}
    </div>
  );
}
