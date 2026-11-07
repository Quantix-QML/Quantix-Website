"use client";

import { Stars } from "@react-three/drei";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import type { Group } from "three";

export function SpaceEnvironment() {
  const stars = useRef<Group>(null);
  const { size } = useThree();
  const compact = size.width < 640;

  return (
    <group ref={stars}>
      <Stars radius={52} depth={35} count={compact ? 500 : 1500} factor={3} saturation={0.28} fade speed={0.12} />
      <Stars radius={20} depth={12} count={compact ? 90 : 240} factor={4} saturation={0.7} fade speed={0.3} />
    </group>
  );
}
