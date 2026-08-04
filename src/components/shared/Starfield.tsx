"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function RotatingStars() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.015;
      group.current.rotation.x += delta * 0.004;
    }
  });

  return (
    <group ref={group}>
      <Stars radius={80} depth={50} count={2200} factor={3} saturation={0} fade speed={0.6} />
      <Stars radius={40} depth={30} count={600} factor={2} saturation={0.5} fade speed={1.2} />
    </group>
  );
}

/**
 * Full-bleed WebGL starfield used as an ambient background layer.
 * Kept to a single lightweight scene (no postprocessing) for perf.
 */
export default function Starfield({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <RotatingStars />
      </Canvas>
    </div>
  );
}
