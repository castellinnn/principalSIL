"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

interface SceneProps {
  reducedMotion: boolean;
}

type Position3 = [number, number, number];

const pinOffsets = [-0.62, -0.3, 0, 0.3, 0.62];

function createGridGeometry(size = 4.8, step = 0.4) {
  const positions: number[] = [];
  const half = size / 2;

  for (let value = -half; value <= half + 0.001; value += step) {
    positions.push(-half, 0, value, half, 0, value);
    positions.push(value, 0, -half, value, 0, half);
  }

  return new THREE.BufferGeometry().setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
}

function createCircuitGeometry() {
  const paths: Position3[][] = [
    [[-0.82, 0.035, -0.48], [-1.38, 0.035, -0.48], [-1.38, 0.035, -1.55], [-1.82, 0.035, -1.55]],
    [[0.82, 0.035, -0.2], [1.35, 0.035, -0.2], [1.35, 0.035, -1.42], [1.82, 0.035, -1.42]],
    [[-0.82, 0.035, 0.35], [-1.52, 0.035, 0.35], [-1.52, 0.035, 1.52], [-1.9, 0.035, 1.52]],
    [[0.82, 0.035, 0.52], [1.45, 0.035, 0.52], [1.45, 0.035, 1.55], [1.88, 0.035, 1.55]],
    [[-0.34, 0.035, -0.82], [-0.34, 0.035, -1.14], [0.15, 0.035, -1.14], [0.15, 0.035, -2.18]],
    [[0.3, 0.035, 0.82], [0.3, 0.035, 1.18], [-0.18, 0.035, 1.18], [-0.18, 0.035, 2.18]],
  ];
  const positions: number[] = [];

  paths.forEach((path) => {
    for (let index = 0; index < path.length - 1; index += 1) {
      positions.push(...path[index], ...path[index + 1]);
    }
  });

  return new THREE.BufferGeometry().setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
}

function DataPulses({ reducedMotion }: SceneProps) {
  const pulseRefs = useRef<Array<THREE.Mesh | null>>([]);
  const paths = useMemo(
    () => [
      [new THREE.Vector3(-2.15, 0.09, -0.48), new THREE.Vector3(-0.9, 0.09, -0.48)],
      [new THREE.Vector3(2.15, 0.09, -0.2), new THREE.Vector3(0.9, 0.09, -0.2)],
      [new THREE.Vector3(-1.9, 0.09, 1.52), new THREE.Vector3(-0.9, 0.09, 0.42)],
      [new THREE.Vector3(1.9, 0.09, 1.55), new THREE.Vector3(0.9, 0.09, 0.58)],
    ],
    []
  );

  useFrame((state) => {
    pulseRefs.current.forEach((pulse, index) => {
      if (!pulse) return;
      const progress = reducedMotion
        ? 0.72
        : (state.clock.elapsedTime * 0.38 + index * 0.24) % 1;
      pulse.position.lerpVectors(paths[index][0], paths[index][1], progress);
    });
  });

  return (
    <>
      {paths.map((_, index) => (
        <mesh
          key={index}
          ref={(node) => {
            pulseRefs.current[index] = node;
          }}
        >
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#67E8F9" : "#60A5FA"}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}

function ServerModule({ position, accent }: { position: Position3; accent: string }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((level) => (
        <group key={level} position={[0, 0.09 + level * 0.16, 0]}>
          <mesh>
            <boxGeometry args={[0.68, 0.12, 0.5]} />
            <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.25} />
          </mesh>
          {[-0.22, 0, 0.22].map((x, index) => (
            <mesh key={x} position={[x, 0.01, 0.255]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color={index === 0 ? accent : "#334155"} toneMapped={false} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Hologram({ reducedMotion }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.58, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 10), [geometry]);

  useFrame((_state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.x += delta * 0.045;
  });

  return (
    <group ref={groupRef} position={[0, 1.22, 0]}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#22D3EE" transparent opacity={0.56} depthWrite={false} />
      </lineSegments>
      <points geometry={geometry}>
        <pointsMaterial color="#BAE6FD" size={0.045} transparent opacity={0.95} depthWrite={false} />
      </points>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.012, 8, 96]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.48} toneMapped={false} />
      </mesh>
      <mesh rotation={[0.35, 0.2, 0.75]}>
        <torusGeometry args={[0.72, 0.009, 8, 96]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.36} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Processor({ reducedMotion }: SceneProps) {
  return (
    <group>
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[1.72, 0.3, 1.72]} />
        <meshStandardMaterial color="#0F172A" metalness={0.94} roughness={0.18} />
      </mesh>

      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[1.08, 0.12, 1.08]} />
        <meshStandardMaterial
          color="#0B2038"
          emissive="#075985"
          emissiveIntensity={1.4}
          metalness={0.76}
          roughness={0.16}
        />
      </mesh>

      <mesh position={[0, 0.46, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.39, 48]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.88} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      {pinOffsets.flatMap((offset, index) => [
        <mesh key={`left-${index}`} position={[-0.98, 0.13, offset]}>
          <boxGeometry args={[0.35, 0.09, 0.1]} />
          <meshStandardMaterial color="#94A3B8" metalness={1} roughness={0.14} />
        </mesh>,
        <mesh key={`right-${index}`} position={[0.98, 0.13, offset]}>
          <boxGeometry args={[0.35, 0.09, 0.1]} />
          <meshStandardMaterial color="#94A3B8" metalness={1} roughness={0.14} />
        </mesh>,
        <mesh key={`front-${index}`} position={[offset, 0.13, 0.98]}>
          <boxGeometry args={[0.1, 0.09, 0.35]} />
          <meshStandardMaterial color="#94A3B8" metalness={1} roughness={0.14} />
        </mesh>,
        <mesh key={`back-${index}`} position={[offset, 0.13, -0.98]}>
          <boxGeometry args={[0.1, 0.09, 0.35]} />
          <meshStandardMaterial color="#94A3B8" metalness={1} roughness={0.14} />
        </mesh>,
      ])}

      <mesh position={[0, 0.87, 0]}>
        <cylinderGeometry args={[0.12, 0.42, 0.82, 32, 1, true]} />
        <meshBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <Hologram reducedMotion={reducedMotion} />
    </group>
  );
}

function TechScene({ reducedMotion }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gridGeometry = useMemo(() => createGridGeometry(), []);
  const circuitGeometry = useMemo(() => createCircuitGeometry(), []);
  const boardEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(5, 0.08, 5)),
    []
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const compact = state.viewport.width < 6;
    const targetX = compact ? 0 : 2.35;
    const targetScale = compact ? 0.68 : 0.95;
    group.position.x = THREE.MathUtils.damp(group.position.x, targetX, 4, delta);
    group.scale.setScalar(THREE.MathUtils.damp(group.scale.x, targetScale, 4, delta));

    if (!reducedMotion) {
      const time = state.clock.elapsedTime;
      group.position.y = -0.18 + Math.sin(time * 0.55) * 0.07;
      group.rotation.x = 0.68 + state.pointer.y * 0.055 + Math.sin(time * 0.25) * 0.018;
      group.rotation.y = -0.46 + state.pointer.x * 0.08 + Math.sin(time * 0.2) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[2.35, -0.18, 0]} rotation={[0.68, -0.46, -0.08]} scale={0.95}>
      <mesh position={[0, -0.065, 0]}>
        <boxGeometry args={[5, 0.08, 5]} />
        <meshStandardMaterial
          color="#07101D"
          emissive="#07152D"
          emissiveIntensity={0.35}
          metalness={0.64}
          roughness={0.68}
          transparent
          opacity={0.78}
        />
      </mesh>
      <lineSegments geometry={boardEdges} position={[0, -0.065, 0]}>
        <lineBasicMaterial color="#2563EB" transparent opacity={0.34} />
      </lineSegments>
      <lineSegments geometry={gridGeometry} position={[0, -0.018, 0]}>
        <lineBasicMaterial color="#1E40AF" transparent opacity={0.14} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={circuitGeometry}>
        <lineBasicMaterial color="#22D3EE" transparent opacity={0.72} depthWrite={false} />
      </lineSegments>

      <Processor reducedMotion={reducedMotion} />
      <ServerModule position={[-1.82, 0.02, -1.55]} accent="#22D3EE" />
      <ServerModule position={[1.82, 0.02, -1.42]} accent="#60A5FA" />
      <ServerModule position={[-1.9, 0.02, 1.52]} accent="#38BDF8" />
      <ServerModule position={[1.88, 0.02, 1.55]} accent="#67E8F9" />
      <DataPulses reducedMotion={reducedMotion} />
    </group>
  );
}

export default function NetworkBackground() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(mediaQuery.matches);
    const updatePageVisibility = () => setIsPageVisible(!document.hidden);
    const container = containerRef.current;

    updateMobile();
    updatePageVisibility();

    const observer = container
      ? new IntersectionObserver(
          ([entry]) => setIsVisible(entry.isIntersecting),
          { rootMargin: "160px 0px" }
        )
      : null;

    if (container) observer?.observe(container);
    mediaQuery.addEventListener("change", updateMobile);
    document.addEventListener("visibilitychange", updatePageVisibility);

    return () => {
      observer?.disconnect();
      mediaQuery.removeEventListener("change", updateMobile);
      document.removeEventListener("visibilitychange", updatePageVisibility);
    };
  }, []);

  const shouldAnimate = isVisible && isPageVisible && !prefersReducedMotion && !isMobile;
  const useStaticScene = Boolean(prefersReducedMotion || isMobile);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-[#080B12]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_82%)]" />
      <div className="absolute -right-32 top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 rounded-full bg-primary/10 blur-[125px]" />

      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        frameloop={shouldAnimate ? "always" : "demand"}
        gl={{ antialias: !isMobile, alpha: true, stencil: false, powerPreference: "high-performance" }}
        className="relative z-10 opacity-65 sm:opacity-80 lg:opacity-100"
      >
        <fog attach="fog" args={["#080B12", 7, 12.5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 7, 5]} color="#BFDBFE" intensity={3.1} />
        <pointLight position={[2, 1.5, 4]} color="#06B6D4" intensity={28} decay={2} distance={11} />
        <pointLight position={[-4, -2, 2]} color="#2563EB" intensity={16} decay={2} distance={9} />
        <TechScene reducedMotion={useStaticScene} />
      </Canvas>

      <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,rgba(8,11,18,0.18)_0%,rgba(8,11,18,0.5)_55%,rgba(8,11,18,0.92)_100%)] lg:bg-[linear-gradient(90deg,rgba(8,11,18,0.97)_0%,rgba(8,11,18,0.8)_38%,rgba(8,11,18,0.2)_72%,rgba(8,11,18,0.54)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-background via-transparent to-background/45 pointer-events-none" />
    </div>
  );
}
