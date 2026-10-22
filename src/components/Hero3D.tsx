"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { MathUtils } from "three";

// Global mouse tracker for flawless tracking regardless of z-index overlays
const mouse = { x: 0, y: 0 };

if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    // Normalize mouse coordinates from -1 to 1
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

function ProfessionalMinimalistRoom() {
  const roomRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (roomRef.current) {
      // Smoothly track the global window mouse pointer
      const targetY = mouse.x * Math.PI * 0.35; 
      const targetX = -mouse.y * (Math.PI / 16) + (Math.PI / 12); 
      
      roomRef.current.rotation.y = MathUtils.lerp(roomRef.current.rotation.y, targetY, 0.05);
      roomRef.current.rotation.x = MathUtils.lerp(roomRef.current.rotation.x, targetX, 0.05);
    }
  });

  return (
    <group ref={roomRef} position={[0, -1.8, 0]}>
      {/* 1. Floor - Matte Charcoal Tile */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[11, 0.1, 10]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} />
      </mesh>

      {/* 2. Back Wall - Warm White */}
      <mesh castShadow receiveShadow position={[0, 2, -4.9]}>
        <boxGeometry args={[11, 4, 0.2]} />
        <meshStandardMaterial color="#F8FAFC" roughness={1} />
      </mesh>

      {/* 3. Left Wall - Feature Wall with Dark Wood Tone */}
      <mesh castShadow receiveShadow position={[-5.4, 2, 0]}>
        <boxGeometry args={[0.2, 4, 10]} />
        <meshStandardMaterial color="#292524" roughness={0.8} />
      </mesh>

      {/* 4. Floor-to-Ceiling Window Panes (Right side) */}
      <group position={[5.4, 2, 0]}>
        <mesh position={[0, 0, -2.5]}>
          <boxGeometry args={[0.1, 4, 4.8]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0, 2.5]}>
          <boxGeometry args={[0.1, 4, 4.8]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0} metalness={0.1} />
        </mesh>
        {/* Window Frames */}
        <mesh castShadow position={[0, 0, 0]}><boxGeometry args={[0.2, 4, 0.1]} /><meshStandardMaterial color="#000000" /></mesh>
      </group>

      {/* 5. Minimalist Designer Sofa */}
      <group position={[0, 0, -1.5]}>
        {/* Sofa Base */}
        <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[5, 0.3, 1.8]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        {/* Seat Cushions */}
        <mesh castShadow receiveShadow position={[-1.2, 0.35, 0.1]}>
          <boxGeometry args={[2.3, 0.15, 1.4]} />
          <meshStandardMaterial color="#64748B" roughness={0.9} />
        </mesh>
        <mesh castShadow receiveShadow position={[1.2, 0.35, 0.1]}>
          <boxGeometry args={[2.3, 0.15, 1.4]} />
          <meshStandardMaterial color="#64748B" roughness={0.9} />
        </mesh>
        {/* Backrests */}
        <mesh castShadow receiveShadow position={[-1.2, 0.65, -0.7]}>
          <boxGeometry args={[2.3, 0.5, 0.3]} />
          <meshStandardMaterial color="#64748B" roughness={0.9} />
        </mesh>
        <mesh castShadow receiveShadow position={[1.2, 0.65, -0.7]}>
          <boxGeometry args={[2.3, 0.5, 0.3]} />
          <meshStandardMaterial color="#64748B" roughness={0.9} />
        </mesh>
      </group>

      {/* 6. Glass Coffee Table */}
      <group position={[0, 0, 1.5]}>
        <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.03, 64]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.95} transparent roughness={0} metalness={0.2} ior={1.5} clearcoat={1} />
        </mesh>
        {/* Table Base - Gold */}
        <mesh castShadow position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.6, 0.4, 0.4, 32]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* 7. TV / Media Console on Left Wall */}
      <group position={[-5, 0, 0]}>
        {/* Floating Console */}
        <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
          <boxGeometry args={[0.6, 0.15, 4]} />
          <meshStandardMaterial color="#171717" roughness={0.5} />
        </mesh>
        {/* Ultra-thin OLED TV */}
        <mesh castShadow position={[0.3, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[3, 1.6, 0.05]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
        </mesh>
      </group>

      {/* 8. Minimalist Floor Lamp */}
      <group position={[3.5, 0, -3.5]}>
        {/* Stand */}
        <mesh castShadow position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 2.4, 16]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Glowing Bulb Shade */}
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color="#FFFAF0" />
        </mesh>
        {/* Actual Point Light to cast glow */}
        <pointLight position={[0, 2.5, 0]} intensity={1.5} distance={5} color="#FFFAF0" />
      </group>
      
      {/* 9. Large Elegant Rug */}
      <mesh receiveShadow position={[0, 0.01, 0.5]}>
        <boxGeometry args={[6, 0.02, 5]} />
        <meshStandardMaterial color="#94A3B8" roughness={1} />
      </mesh>

    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 bg-slate-50 overflow-hidden cursor-move">
      <Canvas shadows camera={{ position: [0, 2, 13], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} color="#ffffff" />
        
        {/* Main Sunlight streaming through the right glass windows */}
        <directionalLight 
          castShadow 
          position={[8, 6, 2]} 
          intensity={2} 
          shadow-mapSize={2048}
          shadow-bias={-0.0001}
          color="#FFFAF0"
        >
          <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10, 0.1, 50]} />
        </directionalLight>
        
        {/* Fill light from the room */}
        <directionalLight position={[-5, 5, -5]} intensity={0.3} />
        
        <Environment preset="apartment" />
        
        <ProfessionalMinimalistRoom />

        {/* Soft realistic shadow under the entire room diorama */}
        <ContactShadows position={[0, -1.81, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000000" />
      </Canvas>
      {/* Light elegant vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
