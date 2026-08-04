"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

export default function MusicToggle({ className = "" }: { className?: string }) {
  const { playing, toggle } = useMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute background music" : "Play background music"}
      className={`flex items-center gap-2 rounded-full glass-strong border border-white/10 px-3.5 py-2 text-text-secondary transition-colors hover:border-cyan/40 hover:text-cyan-bright ${className}`}
    >
      {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      <span className="flex items-end gap-0.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-current"
            style={{
              height: playing ? undefined : 4,
              animation: playing ? `eq 0.${6 + i}s ease-in-out ${i * 0.12}s infinite alternate` : undefined,
            }}
          />
        ))}
      </span>
      <style jsx>{`
        @keyframes eq {
          from {
            height: 4px;
          }
          to {
            height: 14px;
          }
        }
      `}</style>
    </button>
  );
}
