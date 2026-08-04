"use client";

import { useEffect, useRef } from "react";

const CHARS = "01アイウエオカキクケコサシスセソ{}<>/;=+-*&|!?".split("");

export default function MatrixRain({ className = "", opacity = 0.14 }: { className?: string; opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];
    let raf = 0;
    let lastTime = 0;

    function resize() {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      width = canvasEl.clientWidth;
      height = canvasEl.clientHeight;
      canvasEl.width = width * window.devicePixelRatio;
      canvasEl.height = height * window.devicePixelRatio;
      ctx!.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    }

    function draw(time: number) {
      raf = requestAnimationFrame(draw);
      if (time - lastTime < 55) return;
      lastTime = time;

      ctx!.fillStyle = "rgba(5, 6, 9, 0.18)";
      ctx!.fillRect(0, 0, width, height);

      ctx!.font = `${fontSize}px var(--font-jetbrains-mono, monospace)`;

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const isHead = Math.random() > 0.92;
        ctx!.fillStyle = isHead ? "rgba(103, 232, 249, 0.9)" : "rgba(34, 211, 238, 0.35)";
        ctx!.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (!reduceMotion) {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ opacity }}
    />
  );
}
