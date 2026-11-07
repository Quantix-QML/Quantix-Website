"use client";

import { Float, Sparkles, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

const destinations = [
  ["#manifesto", "#ff5059"],
  ["#learn", "#ff263d"],
  ["#events", "#c31732"],
  ["#research", "#ff6770"],
  ["#people", "#c52039"]
] as const;

export function QuantumCore({ centered = false }: { centered?: boolean }) {
  const root = useRef<Group>(null);
  const board = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const wormhole = useRef<Group>(null);
  const halo = useRef<THREE.MeshPhysicalMaterial>(null);
  const wormholeMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const transitionScale = useRef({ value: 1 });
  const transitionZoom = useRef({ value: 0 });
  const { camera, size } = useThree();
  const reducedMotion = useReducedMotion();
  const scroll = useRef({ progress: 0, pointerX: 0, pointerY: 0, section: 0 });
  const particles = useMemo(() => new Float32Array(420 * 3).map((_, index) =>
    index % 3 === 0 ? (Math.random() - 0.5) * 20 :
      index % 3 === 1 ? (Math.random() - 0.5) * 12 : -Math.random() * 12 - 2
  ), []);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main > section")];
    let ticking = false;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scroll.current.progress = window.scrollY / max;
      const marker = window.innerHeight * 0.53;
      let nearest = 0;
      let distance = Number.POSITIVE_INFINITY;
      sections.forEach((section, index) => {
        const bounds = section.getBoundingClientRect();
        const nextDistance = Math.abs(bounds.top + bounds.height / 2 - marker);
        if (nextDistance < distance) {
          nearest = index;
          distance = nextDistance;
        }
      });
      scroll.current.section = nearest;
      const scene = document.querySelector(".experience-shell");
      scene?.setAttribute("data-active-universe", sections[nearest]?.id ?? "home");
      scene?.setAttribute("data-scroll-progress", String(Number(scroll.current.progress.toFixed(3))));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      scroll.current.pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      scroll.current.pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onPortal = (event: Event) => {
      const destination = (event as CustomEvent<{ href: string }>).detail.href;
      const transition = gsap.timeline();
      transition.fromTo(transitionScale.current, { value: 1 }, {
        value: 1.17, duration: 0.48, yoyo: true, repeat: 1, ease: "power2.inOut"
      }, 0);
      if (wormhole.current && wormholeMaterial.current) {
        transition.set(wormhole.current, { visible: true }, 0);
        transition.fromTo(wormhole.current.scale, { x: 0.08, y: 0.08, z: 0.08 }, {
          x: 2.4, y: 2.4, z: 2.4, duration: 0.72, ease: "power3.in"
        }, 0);
        transition.fromTo(wormholeMaterial.current, { opacity: 0 }, {
          opacity: 0.82, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut"
        }, 0);
        transition.set(wormhole.current, { visible: false });
        transition.set(wormhole.current.scale, { x: 0.08, y: 0.08, z: 0.08 });
      }
      transition.to(transitionZoom.current, { value: 1, duration: 0.28, yoyo: true, repeat: 1, ease: "power2.inOut" }, 0);
      if (destination) {
        window.setTimeout(() => {
          document.querySelector(destination)?.scrollIntoView({
            behavior: reducedMotion ? "instant" : "smooth"
          });
        }, 170);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("quantix:portal", onPortal);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("quantix:portal", onPortal);
    };
  }, [camera, reducedMotion]);

  useEffect(() => {
    camera.position.x = 0;
    camera.position.y = size.width < 640 ? 0.2 : 0;
    camera.position.z = 12;
    camera.lookAt(0, 0, 0);
  }, [camera, size.width]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const { progress, pointerX, pointerY, section } = scroll.current;
    const tint = destinations[section % destinations.length][1];
    if (board.current) {
      const targetX = reducedMotion ? 0.12 : 0.12 + pointerY * 0.11;
      const targetY = reducedMotion ? progress * 0.3 : pointerX * 0.13 + progress * 0.3;
      board.current.rotation.x = THREE.MathUtils.damp(board.current.rotation.x, targetX, 2.2, delta);
      board.current.rotation.y = THREE.MathUtils.damp(board.current.rotation.y, targetY, 2.2, delta);
      board.current.position.y = THREE.MathUtils.damp(
        board.current.position.y,
        Math.sin(time * 0.32) * 0.13 + (0.5 - progress) * 0.42,
        1.7,
        delta
      );
    }
    if (core.current) {
      core.current.rotation.z = time * (reducedMotion ? 0 : 0.13);
      core.current.scale.setScalar(1 + (reducedMotion ? 0 : Math.sin(time * 1.3) * 0.045));
    }
    if (halo.current) {
      halo.current.emissive.lerp(new THREE.Color(tint), delta * 0.65);
      halo.current.emissiveIntensity = 0.8 + (reducedMotion ? 0 : Math.sin(time * 1.4) * 0.3);
    }
    if (root.current) {
      const baseX = centered ? 0 : size.width < 640 ? 0 : size.width < 900 ? 1.4 : 3.25;
      const scrollDrift = size.width < 640 ? Math.sin(progress * Math.PI * 3) * 0.36 : Math.sin(progress * Math.PI * 2) * 0.42;
      root.current.position.x = THREE.MathUtils.damp(root.current.position.x, baseX + scrollDrift + pointerX * 0.16, 1.5, delta);
      root.current.position.y = THREE.MathUtils.damp(
        root.current.position.y,
        (centered ? 0 : size.width < 640 ? -3 : 0) + (0.5 - progress) * (size.width < 640 ? 0.3 : 0.42),
        1.3,
        delta
      );
      const scale = centered
        ? size.width < 640 ? 0.76 : size.width < 900 ? 0.94 : 1.12
        : size.width < 640 ? 0.57 : size.width < 900 ? 0.82 : 1;
      const targetScale = scale * transitionScale.current.value;
      root.current.scale.setScalar(THREE.MathUtils.damp(root.current.scale.x, targetScale, 2, delta));
    }
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, pointerX * 0.08, 1.2, delta);
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      12 - Math.sin(progress * Math.PI) * 0.4 - transitionZoom.current.value * 1.6,
      2.2,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <group ref={root} position={[0, 0, 0]}>
        <group ref={board}>
          <mesh position={[0, 0, -0.12]} castShadow receiveShadow>
            <boxGeometry args={[4.5, 3.35, 0.24]} />
            <meshPhysicalMaterial color="#271217" emissive="#19090e" emissiveIntensity={0.7} metalness={0.78} roughness={0.28} transparent opacity={0.68} clearcoat={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[4.15, 3, 0.035]} />
            <meshStandardMaterial color="#210e13" emissive="#18080d" emissiveIntensity={0.65} metalness={0.48} roughness={0.42} transparent opacity={0.62} />
          </mesh>
          <CircuitTraces />
          <QubitPads />
          <mesh ref={core} position={[0, 0, 0.35]} rotation={[0.4, 0.4, Math.PI / 4]} castShadow>
            <boxGeometry args={[0.96, 0.96, 0.22]} />
            <meshPhysicalMaterial ref={halo} color="#45111b" emissive="#7b1020" emissiveIntensity={0.9} metalness={0.46} roughness={0.24} clearcoat={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.52]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.38, 0.38, 0.045]} />
            <meshStandardMaterial color="#a91629" emissive="#ec1832" emissiveIntensity={1.8} metalness={0.35} roughness={0.22} />
          </mesh>
          <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0} floatIntensity={0.08}>
            <Text position={[0, 0, 0.59]} fontSize={0.46} color="#fff0ef" anchorX="center" anchorY="middle">Q</Text>
          </Float>
        </group>
        <OrbitRings reducedMotion={Boolean(reducedMotion)} />
        <group ref={wormhole} visible={false} position={[0, 0, 0.8]}>
          <mesh>
            <torusGeometry args={[0.78, 0.035, 8, 64]} />
            <meshBasicMaterial ref={wormholeMaterial} color="#ff414d" transparent opacity={0} />
          </mesh>
          <mesh rotation-z={Math.PI / 2}>
            <torusGeometry args={[0.56, 0.014, 8, 64]} />
            <meshBasicMaterial color="#ae1025" transparent opacity={0.65} />
          </mesh>
        </group>
      </group>
      <Sparkles count={22} scale={[7, 5, 2]} size={2.3} speed={reducedMotion ? 0 : 0.18} opacity={0.72} color="#ff646b" />
      <points position={[0, 0, -2]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffd6d8" size={0.022} transparent opacity={0.48} sizeAttenuation />
      </points>
    </>
  );
}

function CircuitTraces() {
  const traces = [
    [[-1.95, -0.95], [-1.25, -0.95], [-1.25, -0.38], [-0.62, -0.38]],
    [[-1.95, 0.12], [-1.45, 0.12], [-1.45, 0.78], [-0.62, 0.78]],
    [[1.95, 0.92], [1.32, 0.92], [1.32, 0.25], [0.62, 0.25]],
    [[1.95, -0.12], [1.48, -0.12], [1.48, -0.76], [0.62, -0.76]],
    [[-0.18, 1.43], [-0.18, 1.02], [0.43, 1.02], [0.43, 0.68]],
    [[0.35, -1.42], [0.35, -1.05], [-0.42, -1.05], [-0.42, -0.68]]
  ];

  return (
    <group>
      {traces.map((points, index) => (
        <group key={index}>
          {points.slice(0, -1).map((point, segment) => {
            const next = points[segment + 1];
            const start = new THREE.Vector3(point[0], point[1], 0.055);
            const end = new THREE.Vector3(next[0], next[1], 0.055);
            const midpoint = start.clone().add(end).multiplyScalar(0.5);
            const length = start.distanceTo(end);
            const horizontal = Math.abs(start.x - end.x) > Math.abs(start.y - end.y);
            return (
              <mesh key={segment} position={midpoint} rotation-z={horizontal ? 0 : Math.PI / 2}>
                <cylinderGeometry args={[0.013, 0.013, length, 8]} />
                <meshStandardMaterial color="#ff4e58" emissive="#ae1425" emissiveIntensity={1.35} metalness={0.55} roughness={0.3} />
              </mesh>
            );
          })}
          <QubitNode position={[points[0][0], points[0][1], 0.09]} delay={index * 0.8} />
          <QubitNode position={[points[points.length - 1][0], points[points.length - 1][1], 0.09]} delay={index * 0.5 + 2} />
        </group>
      ))}
    </group>
  );
}

function QubitNode({ position, delay }: { position: [number, number, number]; delay: number }) {
  const node = useRef<Group>(null);
  const ring = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const pulse = 0.9 + Math.sin(clock.elapsedTime * 1.4 + delay) * 0.12;
    node.current?.scale.setScalar(pulse);
    if (ring.current) ring.current.rotation.z = clock.elapsedTime * 0.18 + delay;
  });

  return (
    <group ref={node} position={position}>
      <mesh>
        <sphereGeometry args={[0.062, 16, 16]} />
        <meshStandardMaterial color="#ffe1e2" emissive="#ff3545" emissiveIntensity={2} />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[0.105, 0.009, 6, 32]} />
        <meshBasicMaterial color="#ff6871" transparent opacity={0.72} />
      </mesh>
    </group>
  );
}

function QubitPads() {
  const pads = useMemo(() => {
    const points: [number, number, number, boolean][] = [];
    for (let row = -3; row <= 3; row += 1) {
      for (let column = -4; column <= 4; column += 1) {
        const x = column * 0.31;
        const y = row * 0.31;
        if (Math.abs(x) < 0.74 && Math.abs(y) < 0.74) continue;
        points.push([x, y, 0.055, (row + column) % 2 === 0]);
      }
    }
    return points;
  }, []);
  return (
    <group>
      {pads.map(([x, y, z, cyan], index) => (
        <mesh key={index} position={[x, y, z]} rotation-z={Math.PI / 4}>
          <boxGeometry args={[0.075, 0.075, 0.035]} />
          <meshStandardMaterial
            color={cyan ? "#f04b56" : "#a51d31"}
            emissive={cyan ? "#ae1828" : "#5c101d"}
            emissiveIntensity={0.9}
            metalness={0.55}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitRings({ reducedMotion }: { reducedMotion: boolean }) {
  const orbit = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!orbit.current || reducedMotion) return;
    orbit.current.rotation.y = clock.elapsedTime * 0.055;
    orbit.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <group ref={orbit}>
      <mesh rotation={[0.83, 0.24, 0]}>
        <torusGeometry args={[2.75, 0.008, 6, 128]} />
        <meshBasicMaterial color="#ff505b" transparent opacity={0.48} />
      </mesh>
      <mesh rotation={[-0.66, -0.42, 0]}>
        <torusGeometry args={[3, 0.006, 6, 128]} />
        <meshBasicMaterial color="#a9192c" transparent opacity={0.46} />
      </mesh>
      <mesh rotation={[1.18, 0, 0.64]}>
        <torusGeometry args={[2.5, 0.006, 6, 128]} />
        <meshBasicMaterial color="#d24350" transparent opacity={0.36} />
      </mesh>
    </group>
  );
}
