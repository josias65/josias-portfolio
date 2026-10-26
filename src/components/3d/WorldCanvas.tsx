'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function useReduced() {
  return useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
}

function bustProfile() {
  return [
    [0.0, 1.08],
    [0.1, 1.07],
    [0.26, 1.0],
    [0.38, 0.88],
    [0.44, 0.72],
    [0.46, 0.58],
    [0.45, 0.48],
    [0.42, 0.4],
    [0.36, 0.32],
    [0.33, 0.24],
    [0.28, 0.16],
    [0.2, 0.08],
    [0.16, 0.0],
    [0.15, -0.12],
    [0.2, -0.22],
    [0.42, -0.32],
    [0.62, -0.4],
    [0.74, -0.52],
    [0.78, -0.72],
    [0.8, -1.05],
  ].map(([x, y]) => new THREE.Vector2(x, y));
}

function useBustGeo() {
  return useMemo(() => new THREE.LatheGeometry(bustProfile(), 96), []);
}

function useRibbon() {
  return useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const t = (i / 64) * Math.PI * 1.85 + 0.4;
      pts.push(
        new THREE.Vector3(
          Math.cos(t) * 1.05,
          -0.05 + Math.sin(t * 0.85) * 0.62,
          Math.sin(t) * 0.78,
        ),
      );
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const shape = new THREE.Shape();
    shape.moveTo(-0.09, -0.012);
    shape.lineTo(0.09, -0.012);
    shape.lineTo(0.09, 0.012);
    shape.lineTo(-0.09, 0.012);
    const geo = new THREE.ExtrudeGeometry(shape, {
      extrudePath: curve,
      steps: 120,
      bevelEnabled: false,
    });
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ff7a18';
    ctx.fillRect(0, 0, 1024, 64);
    ctx.fillStyle = '#1a0e04';
    ctx.font = '700 28px ui-sans-serif, system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText('  CODE  ·  IAI  ·  WEB  ·  RÉSEAUX  ·  SÉCU  ·  BUILD  ·  ', 16, 34);
    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.ClampToEdgeWrapping;
    map.repeat.set(2, 1);
    map.colorSpace = THREE.SRGBColorSpace;
    return { geo, map };
  }, []);
}

function VisorBust({ reduced }: { reduced: boolean }) {
  const g = useRef<THREE.Group>(null!);
  const visor = useRef<THREE.Mesh>(null!);
  const mapRef = useRef<THREE.Texture>(null!);
  const geo = useBustGeo();
  const { geo: ribbonGeo, map } = useRibbon();
  mapRef.current = map;

  const skin = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#2d4a5e',
        roughness: 0.32,
        metalness: 0.18,
        clearcoat: 0.55,
        clearcoatRoughness: 0.25,
        sheen: 0.4,
        sheenColor: new THREE.Color('#7eb0c9'),
        emissive: new THREE.Color('#13202c'),
        emissiveIntensity: 0.35,
      }),
    [],
  );

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (g.current && !reduced) {
      g.current.rotation.y = -0.38 + Math.sin(t * 0.45) * 0.14;
      g.current.position.y = Math.sin(t * 0.7) * 0.06;
    }
    if (visor.current) {
      const mat = visor.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.2 + Math.sin(t * 2.2) * 0.55;
    }
    if (mapRef.current && !reduced) mapRef.current.offset.x = t * 0.08;
  });

  return (
    <group ref={g} position={[1.55, 0.12, 0.35]} rotation={[0, -0.4, 0]} scale={1.22}>
      <mesh geometry={geo} material={skin} />
      {Array.from({ length: 18 }, (_, i) => (
        <mesh
          key={i}
          geometry={geo}
          position={[0.22 + i * 0.046, 0, 0]}
          scale={[0.038, 1, 1]}
        >
          <meshStandardMaterial
            color={i % 2 === 0 ? '#121820' : '#ff7a18'}
            emissive={i % 2 === 0 ? '#0b1016' : '#ff6a00'}
            emissiveIntensity={i % 2 === 0 ? 0.2 : 1.15}
            roughness={0.28}
            metalness={0.4}
            toneMapped={i % 2 === 0}
          />
        </mesh>
      ))}
      <mesh ref={visor} position={[0, 0.58, 0.28]} rotation={[0.18, 0, 0]}>
        <torusGeometry args={[0.33, 0.055, 16, 48, Math.PI * 1.05]} />
        <meshStandardMaterial
          color="#ff8a22"
          emissive="#ff7a18"
          emissiveIntensity={2.4}
          roughness={0.15}
          metalness={0.6}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.56, 0.38]} rotation={[0.12, 0, 0]}>
        <boxGeometry args={[0.62, 0.11, 0.045]} />
        <meshStandardMaterial
          color="#ffb347"
          emissive="#ff8a1a"
          emissiveIntensity={2.8}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={ribbonGeo} rotation={[0.05, 0.2, 0.1]}>
        <meshStandardMaterial
          map={map}
          emissive="#ff6a00"
          emissiveIntensity={0.55}
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>
    </group>
  );
}

function isLand(lat: number, lon: number) {
  const la = THREE.MathUtils.radToDeg(lat);
  const lo = THREE.MathUtils.radToDeg(lon);
  if (lo > -18 && lo < 52 && la > -35 && la < 37) return true;
  if (lo > -10 && lo < 42 && la > 36 && la < 72) return true;
  if (lo > 42 && lo < 150 && la > 0 && la < 76) return true;
  if (lo > -168 && lo < -52 && la > 15 && la < 72) return true;
  if (lo > -82 && lo < -34 && la > -56 && la < 13) return true;
  if (lo > 112 && lo < 155 && la > -44 && la < -10) return true;
  return false;
}

function SoftGlobe({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null!);
  const land = useMemo(() => {
    const landPos: number[] = [];
    const r = 1.35;
    for (let i = 0; i < 9000; i++) {
      const u = Math.random();
      const v = Math.random();
      const lat = Math.acos(2 * u - 1) - Math.PI / 2;
      const lon = 2 * Math.PI * v - Math.PI;
      if (!isLand(lat, lon)) continue;
      landPos.push(
        r * Math.cos(lat) * Math.cos(lon),
        r * Math.sin(lat),
        r * Math.cos(lat) * Math.sin(lon),
      );
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(landPos, 3));
    return g;
  }, []);

  useFrame((_, d) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y += d * 0.08;
  });

  return (
    <group ref={ref} position={[-0.85, 0.55, -1.8]} scale={1.15}>
      <mesh>
        <sphereGeometry args={[1.28, 32, 32]} />
        <meshBasicMaterial color="#0c1220" transparent opacity={0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.42, 32, 32]} />
        <meshBasicMaterial color="#ff7a18" transparent opacity={0.05} />
      </mesh>
      <points geometry={land}>
        <pointsMaterial color="#9fd4e8" size={0.022} sizeAttenuation depthWrite={false} transparent opacity={0.7} />
      </points>
    </group>
  );
}

function Rig({ reduced }: { reduced: boolean }) {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    const z = reduced ? 5.4 : 5.4 - Math.min(window.scrollY / 1400, 0.8);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, -0.15 + mouse.current.x * 0.4, 0.045);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.35 + mouse.current.y * 0.18, 0.045);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, z, 0.05);
    state.camera.lookAt(1.15, 0.25, 0);
  });
  return null;
}

function Scene() {
  const reduced = useReduced();
  return (
    <>
      <color attach="background" args={['#0a0d14']} />
      <fog attach="fog" args={['#0a0d14', 10, 22]} />
      <hemisphereLight color="#ffd4b0" groundColor="#121826" intensity={0.55} />
      <ambientLight intensity={0.28} />
      <spotLight position={[3.4, 3.2, 4]} angle={0.42} penumbra={0.6} intensity={55} color="#ff9a4a" />
      <spotLight position={[-3.5, 2.4, 3]} angle={0.5} penumbra={0.8} intensity={28} color="#7ec8e3" />
      <pointLight position={[1.8, 0.7, 1.6]} intensity={18} color="#ff7a18" distance={6} />
      <SoftGlobe reduced={reduced} />
      <VisorBust reduced={reduced} />
      <Sparkles count={reduced ? 16 : 50} scale={[10, 6, 8]} size={1.4} speed={0.25} color="#ffb070" opacity={0.35} />
      <ContactShadows position={[0, -1.45, 0]} opacity={0.4} scale={12} blur={2.8} far={3} color="#ff7a18" />
      <Rig reduced={reduced} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.22} intensity={reduced ? 0.4 : 0.95} mipmapBlur />
        <Vignette eskil={false} offset={0.15} darkness={0.55} />
      </EffectComposer>
    </>
  );
}

export function WorldCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [-0.2, 0.35, 5.4], fov: 38 }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 1.6]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
