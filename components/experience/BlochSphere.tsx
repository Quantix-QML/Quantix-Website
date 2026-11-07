"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

type Gate = "H" | "X" | "Z";

export function BlochSphere() {
  const sphere = useRef<THREE.Group>(null);
  const vector = useRef<THREE.Group>(null);
  const shaft = useRef<THREE.Mesh>(null);
  const tip = useRef<THREE.Mesh>(null);
  const endpoint = useRef<THREE.Mesh>(null);
  const stateVector = useRef(new THREE.Vector3(0, 0, 1));
  const pointer = useRef(new THREE.Vector2());
  const drag = useRef({ active: false, x: 0, y: 0, rotationX: 0.18, rotationY: -0.3 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const displayedDirection = () => stateVector.current.clone()
      .add(new THREE.Vector3(pointer.current.x * 0.35, -pointer.current.y * 0.3, 0))
      .normalize();
    const announceState = (direction = displayedDirection()) => {
      const { x, y, z } = direction;
      const label = z > 0.95 ? "|0⟩" : z < -0.95 ? "|1⟩" : x > 0.95 ? "|+⟩" : x < -0.95 ? "|−⟩" : "SUPERPOSITION";
      const theta = Math.acos(THREE.MathUtils.clamp(z, -1, 1)) * (180 / Math.PI);
      const phi = (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
      window.dispatchEvent(new CustomEvent("quantix:state", { detail: { label, theta, phi } }));
    };
    const applyGate = (gate: Gate) => {
      const { x, y, z } = stateVector.current;
      if (gate === "H") stateVector.current.set(z, -y, x);
      if (gate === "X") stateVector.current.set(x, -y, -z);
      if (gate === "Z") stateVector.current.set(-x, -y, z);
      stateVector.current.normalize();
      announceState();
    };
    const onGate = (event: Event) => {
      const gate = (event as CustomEvent<{ gate: Gate }>).detail.gate;
      if (gate === "H" || gate === "X" || gate === "Z") applyGate(gate);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("a,button,input")) return;
      drag.current.active = true;
      drag.current.x = event.clientX;
      drag.current.y = event.clientY;
    };
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth - 0.5) * 2,
        (event.clientY / window.innerHeight - 0.5) * 2
      );
      announceState();
      if (!drag.current.active) return;
      const dx = event.clientX - drag.current.x;
      const dy = event.clientY - drag.current.y;
      drag.current.rotationY += dx * 0.006;
      drag.current.rotationX = THREE.MathUtils.clamp(drag.current.rotationX + dy * 0.006, -1.2, 1.2);
      drag.current.x = event.clientX;
      drag.current.y = event.clientY;
    };
    const onPointerUp = () => { drag.current.active = false; };
    const onWheel = () => {
      const now = performance.now();
      if (now - lastScrollGate < 450) return;
      lastScrollGate = now;
      const gates: Gate[] = ["H", "X", "Z"];
      applyGate(gates[scrollGateIndex % gates.length]);
      scrollGateIndex += 1;
    };
    let scrollGateIndex = 0;
    let lastScrollGate = 0;
    window.addEventListener("quantix:gate", onGate);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("quantix:gate", onGate);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  useFrame((state, delta) => {
    if (sphere.current) {
      const time = state.clock.elapsedTime;
      const targetX = drag.current.rotationX + (reducedMotion ? 0 : Math.sin(time * 0.2) * 0.07);
      const targetY = drag.current.rotationY + (reducedMotion ? 0 : time * 0.16);
      sphere.current.rotation.x = THREE.MathUtils.damp(sphere.current.rotation.x, targetX, 2.2, delta);
      sphere.current.rotation.y = THREE.MathUtils.damp(sphere.current.rotation.y, targetY, 2.2, delta);
    }
    if (!vector.current || !shaft.current || !tip.current || !endpoint.current) return;
    const direction = stateVector.current.clone()
      .add(new THREE.Vector3(pointer.current.x * 0.35, -pointer.current.y * 0.3, 0))
      .normalize();
    vector.current.position.lerp(direction.clone().multiplyScalar(0.56), delta * 4);
    vector.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    shaft.current.scale.y = 1.05;
    tip.current.position.set(0, 1.15, 0);
    endpoint.current.position.copy(direction.clone().multiplyScalar(1.16));
  });

  return (
    <group>
      <group ref={sphere}>
        <mesh>
          <sphereGeometry args={[1.45, 48, 48]} />
          <meshPhysicalMaterial color="#183568" emissive="#2457a1" emissiveIntensity={0.28} metalness={0.24} roughness={0.32} transparent opacity={0.13} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.455, 28, 20]} />
          <meshBasicMaterial color="#78c9ff" wireframe transparent opacity={0.23} />
        </mesh>
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[1.45, 0.008, 6, 96]} />
          <meshBasicMaterial color="#a8a0ff" transparent opacity={0.72} />
        </mesh>
        <mesh rotation-y={Math.PI / 2}>
          <torusGeometry args={[1.45, 0.006, 6, 96]} />
          <meshBasicMaterial color="#63d9ff" transparent opacity={0.37} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.006, 0.006, 3.2, 8]} />
          <meshBasicMaterial color="#8bbfff" transparent opacity={0.62} />
        </mesh>
        <mesh position={[0, 1.55, 0]}>
          <coneGeometry args={[0.045, 0.14, 12]} />
          <meshBasicMaterial color="#c5eaff" />
        </mesh>
        <mesh position={[0, -1.55, 0]} rotation-z={Math.PI}>
          <coneGeometry args={[0.045, 0.14, 12]} />
          <meshBasicMaterial color="#c5eaff" />
        </mesh>
        <group ref={vector}>
          <mesh ref={shaft} position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 1, 12]} />
            <meshBasicMaterial color="#ff6fcf" />
          </mesh>
          <mesh ref={tip}>
            <coneGeometry args={[0.065, 0.2, 16]} />
            <meshBasicMaterial color="#ff9be0" />
          </mesh>
        </group>
        <mesh ref={endpoint}>
          <sphereGeometry args={[0.085, 20, 20]} />
          <meshBasicMaterial color="#fff4ff" />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#dceeff" />
        </mesh>
      </group>
      <pointLight position={[0, 0, 2]} color="#67caff" intensity={2.2} distance={6} />
      <pointLight position={[-2, 1, -2]} color="#d16bff" intensity={1.2} distance={5} />
    </group>
  );
}
