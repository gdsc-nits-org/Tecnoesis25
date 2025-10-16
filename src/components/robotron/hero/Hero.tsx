"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import StyledStarsCanvas from '../Stars';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

// Tron Bike Model Component
function TronBike() {
  const { scene } = useGLTF('/robotron/tron_bike.glb');
  
  // Clone the scene to avoid reusing the same instance
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();
    
    // Apply selective neon red effect to preserve details
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Keep original material but enhance it with red tint and emission
        if (child.material) {
          const originalMaterial = child.material as THREE.MeshStandardMaterial;
          
          // Clone the original material to preserve details
          const enhancedMaterial = originalMaterial.clone();
          
          // Add red tint and neon glow
          enhancedMaterial.emissive = new THREE.Color(0xFF0000); // Red emission
          enhancedMaterial.emissiveIntensity = 0.8; // Moderate glow to preserve details
          
          // Add slight red tint to the base color
          if (enhancedMaterial.color) {
            const currentColor = enhancedMaterial.color;
            enhancedMaterial.color = new THREE.Color(
              Math.min(currentColor.r + 0.3, 1),
              currentColor.g * 0.7,
              currentColor.b * 0.7
            );
          }
          
          enhancedMaterial.metalness = Math.max(enhancedMaterial.metalness || 0, 0.7);
          enhancedMaterial.roughness = Math.min(enhancedMaterial.roughness || 1, 0.3);
          
          child.material = enhancedMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }
    });
    
    return clone;
  }, [scene]);
  
  return (
    <>
      <primitive 
        object={clonedScene} 
        scale={15} 
        position={[-4, -4, 3.1]} 
        rotation={[-0.2, Math.PI / -4.9, 0.4]}
      />

    </>
  );
}

// Preload the model
useGLTF.preload('/robotron/tron_bike.glb');

const Hero = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const robotronChars = el.querySelectorAll('.robotron-char');
    
    // ROBOTRON starts visible, fades out on scroll
    gsap.fromTo(
      robotronChars,
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: 0,
        y: 100,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'top top-=30%',
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={styles.heroContainer}>
      {/* Fixed Hero Container */}
      <div className={styles.stickyContainer}>
      {/* Stars Animation Background - Top Layer */}
      {/* <div className="absolute inset-0" style={{ zIndex: 80 }}>
        <StyledStarsCanvas />
      </div> */}

      {/* Background Layer 1 - Static (Deep Blue - Farthest) */}
      <div className={styles.bgLayer1} />

      {/* Background Layer 2 - Moving Left (Light Blue - Middle) - Slower - Seamless Loop */}
      <div className={styles.bgLayer2Container}>
        <motion.div
          className={styles.bgLayer2}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        />
        <motion.div
          className={styles.bgLayer2}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        />
      </div>
      {/* Blue overlay for Layer 2 */}
      <div className={styles.bgLayer2Container}>
        <motion.div
          className="h-full w-full flex-shrink-0"
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        />
        <motion.div
          className="h-full w-full flex-shrink-0"
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        />
      </div>

      {/* Background Layer 3 - Moving Left (No Blue Tint - Closest) - Faster */}
      <div className={styles.bgLayer3Container}>
        <motion.div
          className={styles.bgLayer3}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        />
        <motion.div
          className={styles.bgLayer3}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        />
      </div>

      {/* Tron Bike 3D Model Layer */}
      <div className={styles.canvasLayer}>
        <Canvas
          camera={{ position: [5, 2, 5], fov: 50 }}
          gl={{ 
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.5,
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            <spotLight position={[0, 10, 0]} angle={0.3} intensity={1} />
            
            <TronBike />
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Silhouette Layer - Top layer above everything */}
      <div className={styles.silhouetteContainer}>
        <motion.div
          className={styles.silhouette}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        />
        <motion.div
          className={styles.silhouette}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        />
      </div>

      {/* Red Gradient Road Effect - Horizontal at Bottom */}
      <div className={styles.roadEffect}>
        {/* Main red gradient road */}
        <div className={styles.roadGradientMain} />
        {/* Bright center line effect */}
        <div className={styles.roadGradientCenter} />
        {/* Sharp glowing line */}
        <div className={styles.roadGlowLine} />
      </div>

      {/* ROBOTRON Text - Top layer */}
      <div className={styles.textContainer}>
        <div className={styles.textWrapper}>
          <h1 className={styles.robotronText}>
            {Array.from('ROBOTRON').map((char, index) => (
              <span key={index} className={styles.robotronChar}>
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Hero;