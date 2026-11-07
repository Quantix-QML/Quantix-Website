"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { QuantumCore } from "./QuantumCore";
import { BlochSphere } from "./BlochSphere";
import { SpaceEnvironment } from "./SpaceEnvironment";

export function Experience({ centered = false, landing = false }: { centered?: boolean; landing?: boolean }) {
  return (
    <>
      <div className="space-glow space-glow--a" aria-hidden="true" />
      <div className="space-glow space-glow--b" aria-hidden="true" />
      <div className={`experience-shell${landing ? " experience-shell--landing" : ""}`} role="img" aria-label={landing ? "Interactive 3D Bloch sphere: drag to rotate, move the pointer to move the qubit state vector, or apply quantum gates." : "Interactive 3D quantum processor background"}>
        <Canvas
          camera={{ position: [0, 0, 12], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          fallback={<div className="canvas-fallback" />}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} color={landing ? "#dce8ff" : "#ffd0d0"} />
            <pointLight position={[2, 2, 4]} intensity={landing ? 16 : 24} color={landing ? "#4c8dff" : "#ff303f"} distance={12} />
            <pointLight position={[-3, -2, 3]} intensity={landing ? 8 : 9} color={landing ? "#b35cff" : "#9b1022"} distance={11} />
            <fog attach="fog" args={["#050505", 18, 42]} />
            <SpaceEnvironment />
            {landing ? <BlochSphere /> : <QuantumCore centered={centered} />}
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
