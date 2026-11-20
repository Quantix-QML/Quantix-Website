import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ── SECOND-ORDER DAMPED SPRING ──
// Analytical closed-form solution of a damped harmonic oscillator.
// Unlike exponential decay (THREE.MathUtils.damp / lerp), this tracks
// both position AND velocity, producing physically correct motion with
// smooth acceleration curves and natural momentum.
//
// Unconditionally stable — uses the exact analytical solution of the
// differential equation, not numerical integration.
//
// Parameters:
//   frequency: Hz — how fast it responds (higher = snappier)
//   damping:   ratio — <1 underdamped (bouncy), 1 critical, >1 overdamped
class Spring {
  constructor(frequency, damping, initialValue = 0) {
    this.omega = 2 * Math.PI * frequency;
    this.zeta = Math.max(0.001, damping);
    this.pos = initialValue;
    this.vel = 0;
  }

  update(target, dt) {
    if (dt <= 0) return this.pos;

    const dp = this.pos - target; // displacement from target
    const omega = this.omega;
    const zeta = this.zeta;

    if (zeta >= 1.0) {
      // Critically damped (ζ ≥ 1): smooth, no oscillation
      // x(t) = target + e^(−ωt) · (C₁ + C₂t)
      const decay = Math.exp(-omega * dt);
      const c2 = this.vel + omega * dp;
      this.pos = target + decay * (dp + c2 * dt);
      this.vel = decay * (this.vel - omega * dt * c2);
    } else {
      // Underdamped (ζ < 1): elegant micro-overshoot with organic settling
      // x(t) = target + e^(−ζωt) · (A·cos(ωd·t) + B·sin(ωd·t))
      const omegaD = omega * Math.sqrt(1 - zeta * zeta);
      const decay = Math.exp(-zeta * omega * dt);
      const cosT = Math.cos(omegaD * dt);
      const sinT = Math.sin(omegaD * dt);

      this.pos = target + decay * (
        dp * cosT + ((this.vel + zeta * omega * dp) / omegaD) * sinT
      );
      this.vel = decay * (
        this.vel * cosT - ((zeta * omega * this.vel + omega * omega * dp) / omegaD) * sinT
      );
    }

    // Snap to rest when effectively settled (prevent infinite micro-jitter)
    if (Math.abs(this.pos - target) < 1e-7 && Math.abs(this.vel) < 1e-7) {
      this.pos = target;
      this.vel = 0;
    }

    return this.pos;
  }

  snapTo(value) {
    this.pos = value;
    this.vel = 0;
  }
}


export default function QuantumHaloExperience() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── SCENE & CAMERA ──
    const scene = new THREE.Scene();

    const getWidth = () => window.innerWidth;
    const getHeight = () => window.innerHeight;

    const computeCameraZ = (w, h) => {
      const aspect = w / h;
      if (w < 640) return 8.2;       // Mobile portrait
      if (w < 1024) return 8.8;      // Tablet
      return Math.min(10.2, 8.8 + (aspect - 1.0) * 0.9); // Desktop widescreen
    };

    const computeHaloScale = (w) => {
      if (w < 640) return 0.65;       // Scaled down by 35% on mobile for clean typographic headroom
      if (w < 1024) return 0.85;      // Tablet balanced scale
      return 1.0;                     // Full scale on desktop
    };

    const camera = new THREE.PerspectiveCamera(40, getWidth() / getHeight(), 0.1, 100);
    camera.position.set(0, 0, computeCameraZ(getWidth(), getHeight()));

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    // ── BLACK FLASH FIX ──
    // Set a clear color matching the page gradient so the canvas
    // NEVER shows raw black during fast scroll repaints.
    // setClearAlpha(0) keeps the canvas transparent under normal
    // compositing, but the CSS background-color acts as the
    // ultimate fallback when the compositor drops frames.
    renderer.setClearColor(new THREE.Color('#0433a8'), 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(getWidth(), getHeight());
    // CSS safety net: if the GPU frame is late the browser paints
    // the element's own background — match it to the page.
    renderer.domElement.style.background = '#0433a8';
    // Promote to its own compositor layer so the browser never
    // tears or drops this surface during fast scrolling.
    renderer.domElement.style.willChange = 'transform';
    container.appendChild(renderer.domElement);

    // ── LIGHTING ──
    const ambientLight = new THREE.AmbientLight('#ffffff', 1.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#ffffff', 1.8);
    keyLight.position.set(5, 5, 7);
    scene.add(keyLight);

    const haloPointLight = new THREE.PointLight('#a3ff00', 35, 25);
    haloPointLight.position.set(0, 0, 2);
    scene.add(haloPointLight);

    // ── ROOT HALO GROUP (CENTERED IN VIEWPORT) ──
    const rootHaloGroup = new THREE.Group();
    rootHaloGroup.scale.setScalar(computeHaloScale(getWidth()));
    scene.add(rootHaloGroup);

    // ── 1. PRIMARY THICK GLOWING HALO RING (MORPHER) ──
    const primaryHaloGeo = new THREE.TorusGeometry(2.4, 0.058, 32, 128);
    const primaryHaloMat = new THREE.MeshStandardMaterial({
      color: '#06339e',
      emissive: '#a3ff00',
      emissiveIntensity: 2.8,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.95,
    });
    const primaryHaloMesh = new THREE.Mesh(primaryHaloGeo, primaryHaloMat);
    rootHaloGroup.add(primaryHaloMesh);

    // Subtle Inner Accent Rim
    const innerRimGeo = new THREE.TorusGeometry(2.38, 0.008, 16, 128);
    const innerRimMat = new THREE.MeshBasicMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.7,
    });
    const innerRimMesh = new THREE.Mesh(innerRimGeo, innerRimMat);
    rootHaloGroup.add(innerRimMesh);

    // ── 2. OUTER GYROSCOPIC ORBIT RING (TILTED ANGLE) ──
    const orbitRing1Geo = new THREE.TorusGeometry(2.88, 0.014, 16, 128);
    const orbitRing1Mat = new THREE.MeshBasicMaterial({
      color: '#a3ff00',
      transparent: true,
      opacity: 0.75,
    });
    const orbitRing1Mesh = new THREE.Mesh(orbitRing1Geo, orbitRing1Mat);
    orbitRing1Mesh.rotation.set(0.85, 0.35, 0);
    rootHaloGroup.add(orbitRing1Mesh);

    // ── 3. TERTIARY INNER PRECESSION RING ──
    const orbitRing2Geo = new THREE.TorusGeometry(1.88, 0.012, 16, 128);
    const orbitRing2Mat = new THREE.MeshBasicMaterial({
      color: '#a3ff00',
      transparent: true,
      opacity: 0.65,
    });
    const orbitRing2Mesh = new THREE.Mesh(orbitRing2Geo, orbitRing2Mat);
    orbitRing2Mesh.rotation.set(-0.72, 0, 0.58);
    rootHaloGroup.add(orbitRing2Mesh);

    // ── 4. CENTER TRANSMON QUBIT CORE NODE ──
    const centerGroup = new THREE.Group();
    rootHaloGroup.add(centerGroup);

    const qubitCoreGeo = new THREE.SphereGeometry(0.14, 24, 24);
    const qubitCoreMat = new THREE.MeshStandardMaterial({
      color: '#a3ff00',
      emissive: '#a3ff00',
      emissiveIntensity: 3.0,
      metalness: 0.6,
      roughness: 0.2,
    });
    const qubitCoreMesh = new THREE.Mesh(qubitCoreGeo, qubitCoreMat);
    centerGroup.add(qubitCoreMesh);

    // Mini Orbit around Center
    const miniRingGeo = new THREE.TorusGeometry(0.28, 0.01, 8, 32);
    const miniRingMat = new THREE.MeshBasicMaterial({
      color: '#a3ff00',
      transparent: true,
      opacity: 0.85,
    });
    const miniRingMesh = new THREE.Mesh(miniRingGeo, miniRingMat);
    centerGroup.add(miniRingMesh);

    // ── 5. QUANTUM PROBABILITY PARTICLES ──
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.0 + (Math.random() - 0.5) * 1.8;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = Math.sin(angle) * radius;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.0;

      particleColors[i * 3] = 0.0;
      particleColors[i * 3 + 1] = 0.5;
      particleColors[i * 3 + 2] = 1.0;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    rootHaloGroup.add(particlePoints);

    // ── 6. SECTION COLOR DESTINATIONS (DYNAMIC MORPHING ON SCROLL) ──
    // Option B: Start Lime (radioactive quantum energy behind hero), shift to Blue deeper
    const sectionDestinations = [
      { id: 'hero', color: new THREE.Color('#a3ff00') },      // Acid Neon Lime — electric glow behind #QUANTIX
      { id: 'research', color: new THREE.Color('#bef264') },  // Softer Lime transition
      { id: 'tracks', color: new THREE.Color('#0052ff') },    // Electric Royal Blue — brand shift
      { id: 'team', color: new THREE.Color('#06339e') },      // Deep Royal Blue — gravitas
    ];

    const currentHaloColor = new THREE.Color('#a3ff00');
    let targetHaloColor = new THREE.Color('#a3ff00');

    // ── 7. SPRING-DRIVEN SCROLL & POINTER SYSTEM ──
    // Read initial scroll position
    const initialMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const initialProgress = Math.min(1, Math.max(0, window.scrollY / initialMaxScroll));

    // Compute initial rotation from scroll position
    const initRotX = 0.38 + initialProgress * 0.75;
    const initRotY = -0.32 + initialProgress * 1.15;
    const initRotZ = initialProgress * 0.38;

    // Set initial orientation
    rootHaloGroup.rotation.x = initRotX;
    rootHaloGroup.rotation.y = initRotY;
    rootHaloGroup.rotation.z = initRotZ;

    // Stage 1 springs: smooth the INPUT (scroll position & pointer)
    //   - Critically damped (ζ=1.0): converts staircase wheel input to smooth ramp
    //   - Fast (f=4Hz): low latency, settles in ~250ms
    const scrollSpring = new Spring(4.0, 1.0, initialProgress);
    const pointerXSpring = new Spring(5.0, 0.9, 0);
    const pointerYSpring = new Spring(5.0, 0.9, 0);

    // Stage 2 springs: smooth the OUTPUT (3D rotation angles)
    //   - Underdamped (ζ=0.55–0.7): elegant micro-overshoot gives physical mass feel
    //   - Slower (f=1.8–2.2Hz): majestic, cinematic settling over ~400ms
    //   Combined with stage 1, this creates a cascaded 4th-order dynamical system:
    //   staircase input → smooth ramp → smooth rotation with momentum
    const rotXSpring = new Spring(2.0, 0.6, initRotX);
    const rotYSpring = new Spring(2.2, 0.55, initRotY);
    const rotZSpring = new Spring(1.8, 0.7, initRotZ);

    // Pointer targets (updated by events)
    let targetPointerX = 0;
    let targetPointerY = 0;

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch') return;
      targetPointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPointerY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onPointerLeave = () => {
      targetPointerX = 0;
      targetPointerY = 0;
    };

    // Section color detection (on scroll event, throttled to rAF)
    let colorTicking = false;
    const updateSectionColors = () => {
      const midViewport = window.innerHeight * 0.5;
      let nearestIdx = 0;
      let nearestDist = Number.POSITIVE_INFINITY;

      sectionDestinations.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top + rect.height * 0.5 - midViewport);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestIdx = idx;
          }
        }
      });

      targetHaloColor = sectionDestinations[nearestIdx].color;
      colorTicking = false;
    };

    const onScroll = () => {
      if (!colorTicking) {
        requestAnimationFrame(updateSectionColors);
        colorTicking = true;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    updateSectionColors();

    const onResize = () => {
      const w = getWidth();
      const h = getHeight();
      camera.aspect = w / h;
      camera.position.z = computeCameraZ(w, h);
      camera.updateProjectionMatrix();
      rootHaloGroup.scale.setScalar(computeHaloScale(w));
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };
    window.addEventListener('resize', onResize);

    // ── ANIMATION RENDER LOOP ──
    let animationFrameId;
    const startTime = performance.now();
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (document.hidden) {
        lastTime = performance.now();
        return;
      }

      const now = performance.now();
      const delta = Math.min(0.1, (now - lastTime) * 0.001);
      lastTime = now;

      const time = (now - startTime) * 0.001;

      // Read scroll position directly every frame (freshest possible input)
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const rawProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      // ── STAGE 1: Spring-smooth the inputs ──
      const smoothScroll = scrollSpring.update(rawProgress, delta);
      const smoothPX = pointerXSpring.update(targetPointerX, delta);
      const smoothPY = pointerYSpring.update(targetPointerY, delta);

      // ── COLOR: Smooth section color morphing (exponential lerp is fine here) ──
      currentHaloColor.lerp(targetHaloColor, 1 - Math.exp(-2.2 * delta));
      primaryHaloMat.emissive.copy(currentHaloColor);
      qubitCoreMat.emissive.copy(currentHaloColor);
      haloPointLight.color.copy(currentHaloColor);
      orbitRing1Mat.color.copy(currentHaloColor);

      if (!prefersReducedMotion) {
        // Compute target rotation angles from smoothed scroll
        const targetAngleX = 0.38 + smoothScroll * 0.75 - smoothPY * 0.05;
        const targetAngleY = -0.32 + smoothScroll * 1.15 + smoothPX * 0.07;
        const targetAngleZ = smoothScroll * 0.38 + Math.sin(time * 0.22) * 0.035;

        // ── STAGE 2: Spring-smooth the rotation with momentum & micro-overshoot ──
        rootHaloGroup.rotation.x = rotXSpring.update(targetAngleX, delta);
        rootHaloGroup.rotation.y = rotYSpring.update(targetAngleY, delta);
        rootHaloGroup.rotation.z = rotZSpring.update(targetAngleZ, delta);

        // Organic levitation breathing
        rootHaloGroup.position.y = Math.sin(time * 0.6) * 0.06;

        // Continuous orbital ring gyroscopic rotations
        orbitRing1Mesh.rotation.z = time * 0.14;
        orbitRing2Mesh.rotation.y = -time * 0.18;
        miniRingMesh.rotation.z = time * 0.85;

        // Transmon qubit center node breathing
        const pulse = 1.0 + Math.sin(time * 2.0) * 0.12;
        centerGroup.scale.setScalar(pulse);

        // Particle cloud slow spin
        particlePoints.rotation.z = time * 0.025;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── CLEANUP ──
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      primaryHaloGeo.dispose();
      primaryHaloMat.dispose();
      innerRimGeo.dispose();
      innerRimMat.dispose();
      orbitRing1Geo.dispose();
      orbitRing1Mat.dispose();
      orbitRing2Geo.dispose();
      orbitRing2Mat.dispose();
      qubitCoreGeo.dispose();
      qubitCoreMat.dispose();
      miniRingGeo.dispose();
      miniRingMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full pointer-events-none select-none flex items-center justify-center"
      style={{ background: '#0433a8' }}
      aria-hidden="true"
    />
  );
}
