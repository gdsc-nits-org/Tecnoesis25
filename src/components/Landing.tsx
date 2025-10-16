"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

type ModelProps = JSX.IntrinsicElements["group"];

function Model(props: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  // Load the GLB model
  const { scene } = useGLTF("/landing/Tecno_logo.glb");

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Render the model as a primitive Three.js object */}
      <primitive
        object={scene}
        scale={1.5}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/landing/Tecno_logo.glb");

const Landing = () => {
  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-black bg-cover bg-center"
      style={{ backgroundImage: "url('/landing/bg.png')" }}
    >
      <Canvas
        camera={{ position: [50, 35, 200], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />

        <Suspense fallback={null}>
          <Model />
          <Environment preset="sunset" />
          <OrbitControls enableZoom={true} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Landing;
