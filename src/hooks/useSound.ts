"use client";

import { useCallback, useRef } from "react";

/**
 * Tiny WebAudio-based SFX engine — no audio files required.
 * Generates short synthesized blips so the site has sound polish
 * without shipping binary assets.
 */
export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (freq: number, duration = 0.08, type: OscillatorType = "sine", gain = 0.05) => {
      const ctx = getCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.value = gain;
      osc.connect(g);
      g.connect(ctx.destination);
      const now = ctx.currentTime;
      g.gain.setValueAtTime(gain, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.start(now);
      osc.stop(now + duration);
    },
    [getCtx]
  );

  const key = useCallback(() => play(440 + Math.random() * 180, 0.04, "square", 0.02), [play]);
  const success = useCallback(() => {
    play(523, 0.1, "sine", 0.06);
    setTimeout(() => play(784, 0.14, "sine", 0.06), 90);
  }, [play]);
  const error = useCallback(() => play(140, 0.16, "sawtooth", 0.05), [play]);
  const click = useCallback(() => play(660, 0.05, "triangle", 0.04), [play]);
  const unlock = useCallback(() => {
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => play(f, 0.18, "sine", 0.07), i * 100)
    );
  }, [play]);

  return { key, success, error, click, unlock };
}
