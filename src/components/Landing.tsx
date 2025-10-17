"use client";

import { Canvas } from "@react-three/fiber";
import { useState, Suspense } from "react";
import * as THREE from 'three';
import ParticleModel from "./ParticleModel";
import SolidModel from "./SolidModel";


const Landing = () => {
  // 💡 NEW: State to manage the reveal effect
  const [isActivated, setIsActivated] = useState(false);

  return (
    <div
      className="flex h-screen w-screen cursor-pointer items-center justify-center bg-black bg-cover bg-center"
      style={{ backgroundImage: "url('/landing/bg.png')" }}
      // 💡 NEW: Click handler to trigger the reveal
      onClick={() => setIsActivated(true)}
    >
      <Canvas
        camera={{ position: [0, 0, 100], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />
        <Suspense fallback={null}>
          {/* 💡 NEW: Conditional rendering based on the isActivated state */}
          {isActivated ? <ParticleModel /> : <SolidModel />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Landing;