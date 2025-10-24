"use client";

import { Canvas } from "@react-three/fiber";
import { useState, Suspense, useMemo } from "react";
import * as THREE from "three";
import ParticleModel from "./ParticleModel";
import SolidModel from "./SolidModel";

const Landing = () => {
  const [isActivated, setIsActivated] = useState(false);

  // FIX: Memoize a check for mobile devices to run only on the client.
  const isMobile = useMemo(() => {
    if (typeof navigator !== "undefined") {
      return /Mobi|Android/i.test(navigator.userAgent);
    }
    return false;
  }, []);

  return (
    <div
      className="relative flex h-screen min-h-screen w-screen cursor-default items-center justify-center overflow-hidden bg-black"
      onClick={() => setIsActivated(true)}
    >
      {/* Animated SVG background as an <object> so SMIL/filter animations run */}
      <object
        data="/landing/bg.svg"
        type="image/svg+xml"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full min-h-screen w-full object-cover"
        style={{ minHeight: "100vh", minWidth: "100vw" }}
      />
      <Canvas
        // FIX: Conditionally set the DPR. Capped at 1.5 on mobile for performance.
        camera={{ position: [0, 0, 100], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />
        <Suspense fallback={null}>
          {isMobile ? (
            <SolidModel />
          ) : isActivated ? (
            <ParticleModel />
          ) : (
            <SolidModel />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Landing;
