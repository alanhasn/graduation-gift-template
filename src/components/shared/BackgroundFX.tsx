"use client";

/**
 * Global ambient background: subtle grid, drifting gradient blobs,
 * and a top vignette. Sits fixed behind all sections at z-0.
 */
export default function BackgroundFX() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden bg-void">
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />

      <div className="absolute -top-40 left-1/4 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan/20 blur-[140px] animate-pulse-glow" />
      <div
        className="absolute top-1/3 right-0 h-[480px] w-[480px] translate-x-1/3 rounded-full bg-violet/20 blur-[140px] animate-pulse-glow"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="absolute bottom-0 left-0 h-[460px] w-[460px] -translate-x-1/4 translate-y-1/3 rounded-full bg-magenta/15 blur-[140px] animate-pulse-glow"
        style={{ animationDelay: "2.1s" }}
      />

      <div className="absolute inset-0 bg-noise" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/0 via-void/0 to-void" />
    </div>
  );
}
