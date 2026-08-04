"use client";

import { useCallback, useRef, useState } from "react";

const CHORD = [130.81, 164.81, 196.0, 246.94]; // Cm-ish pad (C3, E3, G3, B3)

/**
 * Self-contained ambient "background music" synthesized entirely via
 * WebAudio — no external audio file needed. A soft evolving pad with
 * slow filter movement, kept quiet and non-intrusive.
 */
export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || !masterRef.current) {
      setPlaying(false);
      return;
    }
    const now = ctx.currentTime;
    masterRef.current.gain.cancelScheduledValues(now);
    masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now);
    masterRef.current.gain.linearRampToValueAtTime(0, now + 0.6);

    setTimeout(() => {
      nodesRef.current.forEach(({ osc }) => {
        try {
          osc.stop();
        } catch {
          /* already stopped */
        }
      });
      lfoRef.current?.stop();
      nodesRef.current = [];
      lfoRef.current = null;
    }, 650);

    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new AudioCtx();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    masterRef.current = master;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 800;
    filter.Q.value = 0.7;
    filter.connect(master);
    filterRef.current = filter;

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.06;
    lfoGain.gain.value = 300;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    lfoRef.current = lfo;

    const nodes = CHORD.map((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.5 : 0.28;
      osc.connect(g);
      g.connect(filter);
      osc.start();
      osc.detune.value = (Math.random() - 0.5) * 4;
      return { osc, gain: g };
    });
    nodesRef.current = nodes;

    const now = ctx.currentTime;
    master.gain.linearRampToValueAtTime(0.045, now + 1.4);
    setPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    if (playing) stop();
    else start();
  }, [playing, start, stop]);

  return { playing, toggle };
}
