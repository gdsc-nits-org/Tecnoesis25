"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StyledStarsCanvas from './Stars';

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
      {/* Additional point lights for enhanced neon glow effect */}
      <pointLight position={[-4, -4, 3]} intensity={2} color="#FF0000" distance={20} />
      <pointLight position={[-2, -3, 4]} intensity={1.5} color="#FF3333" distance={15} />
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
    <div ref={containerRef} className="relative h-[300vh] w-full">
      {/* Fixed Hero Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Load Tron Font */}
        <style jsx>{`
          @font-face {
            font-family: 'Tron';
            src: url('/tron.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
        `}</style>

      {/* Stars Animation Background - Top Layer */}
      <div className="absolute inset-0" style={{ zIndex: 80 }}>
        <StyledStarsCanvas />
      </div>

      {/* Background Layer 1 - Static (Deep Blue - Farthest) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/robotron/bg_robotron.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.6) saturate(0.8) blur(4px)',
        }}
      />
      {/* <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'rgba(0, 50, 150, 0.4)',
          mixBlendMode: 'multiply',
        }}
      /> */}

      {/* Background Layer 2 - Moving Left (Light Blue - Middle) - Slower - Seamless Loop */}
      <div className="absolute inset-0 z-10 flex">
        <motion.div
          className="h-full w-full flex-shrink-0"
          style={{
            backgroundImage: 'url(/robotron/bg_robotron_2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.8) saturate(1.1) blur(2px)',
            opacity: 0.85,
          }}
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
          style={{
            backgroundImage: 'url(/robotron/bg_robotron_2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.8) saturate(1.1) blur(2px)',
            opacity: 0.85,
          }}
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
      <div className="absolute inset-0 z-10 flex">
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
      <div className="absolute inset-0 z-20 flex">
        <motion.div
          className="h-full w-full flex-shrink-0"
          style={{
            backgroundImage: 'url(/robotron/bg_robotron_3.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(1.1) contrast(1.1)',
            opacity: 0.9,
          }}
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
          className="h-full w-full flex-shrink-0"
          style={{
            backgroundImage: 'url(/robotron/bg_robotron_3.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(1.1) contrast(1.1)',
            opacity: 0.9,
          }}
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
      <div className="absolute inset-0 z-30">
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
      <div className="absolute inset-0 flex" style={{ zIndex: 70 }}>
        <motion.div
          className="h-full w-full flex-shrink-0"
          style={{
            backgroundImage: 'url(/robotron/silhouette.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
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
          className="h-full w-full flex-shrink-0"
          style={{
            backgroundImage: 'url(/robotron/silhouette.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
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
      <div className="absolute bottom-0 left-0 right-0 z-50 h-48 pointer-events-none">
        {/* Main red gradient road */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(220, 38, 38, 0.8) 0%, rgba(220, 38, 38, 0.4) 40%, transparent 100%)',
            filter: 'blur(20px)',
          }}
        />
        {/* Bright center line effect */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: 'linear-gradient(to top, rgba(255, 0, 0, 0.9) 0%, rgba(255, 0, 0, 0.3) 50%, transparent 100%)',
            filter: 'blur(30px)',
          }}
        />
        {/* Sharp glowing line */}
        <div
          className="absolute bottom-8 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(255, 0, 0, 0.8) 20%, rgba(255, 0, 0, 0.8) 80%, transparent 100%)',
            boxShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.5)',
          }}
        />
      </div>

      {/* ROBOTRON Text - Top layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 60 }}
      >
        <div className="robotron-text-wrapper-fixed">
          <h1 className="robotron-text-initial">
            {Array.from('ROBOTRON').map((char, index) => (
              <span key={index} className="inline-block robotron-char">
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>
      
      {/* Tron Font Style */}
      <style jsx>{`
        .robotron-text-wrapper-fixed {
          width: 100%;
          text-align: center;
          padding: 0 1rem;
        }
        :global(.robotron-text-initial) {
          color: rgb(255, 0, 0);
          font-weight: bold;
          letter-spacing: 0.1em;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.922), 0 0 40px rgba(41, 0, 0, 0.6);
          font-family: 'Tron', monospace;
          font-size: clamp(2rem, 10vw, 6rem);
          display: block;
        }
        :global(.robotron-char) {
          display: inline-block;
        }
        
        /* Mobile-specific adjustments */
        @media (max-width: 640px) {
          :global(.robotron-text-initial) {
            font-size: clamp(1rem, 10vw, 2rem);
            letter-spacing: 0.05em;
            text-shadow: 0 0 10px rgb(255, 255, 255), 0 0 20px rgba(155, 23, 23, 0.6);
          }
        }
        
        /* Tablet adjustments */
        @media (min-width: 641px) and (max-width: 1024px) {
          :global(.robotron-text-initial) {
            font-size: clamp(2.5rem, 10vw, 5rem);
          }
        }
      `}</style>
      </div>
    </div>
  );
};

export default Hero;