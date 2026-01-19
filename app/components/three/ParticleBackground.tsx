"use client";

import React, {useRef, useMemo} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {Points, PointMaterial} from "@react-three/drei";
import * as THREE from "three";

function ParticleSphere() {
  const ref = useRef<THREE.Points>(null);

  // Generate points on a sphere surface
  const particles = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const radius = 2.5;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, []);

  // Slow rotation animation
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00BCD4"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFFFFF"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{position: [0, 0, 5], fov: 60}}
        dpr={[1, 1.5]}
        gl={{alpha: true, antialias: true}}
        style={{background: "transparent"}}
      >
        <color attach="background" args={["#0A0A0A"]} />
        <ambientLight intensity={0.3} />
        <ParticleSphere />
        <FloatingParticles />
      </Canvas>

      {/* Subtle edge glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at top right, rgba(0,188,212,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at bottom left, rgba(0,188,212,0.05) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
