"use client";

import { Canvas, useFrame, extend, ThreeElements, useThree } from '@react-three/fiber';
import { Environment, useGLTF } from "@react-three/drei";
import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

// Define the type for our custom shader material
interface ParticleMaterialType extends THREE.ShaderMaterial {
  uniforms: {
    uTime: { value: number };
  };
}

// Define the type for the GLTF result for type safety
interface GLTFResult {
  scene: THREE.Group;
  nodes: {
    [key:string]: THREE.Object3D;
    Scene: THREE.Group;
  };
  materials: {
    [key:string]: THREE.Material;
  };
}

// --- SHADER UPGRADE: NOISE ONLY ---
const vertexShader = `
  uniform float uTime;
  attribute float aRandom;
  attribute vec3 aOriginalPosition; // The particle's "home" position
  attribute float aInteractionStrength; // 💡 Pass interaction strength to fragment shader
  varying float vInteractionStrength;

  // Perlin noise function remains the same
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
  float cnoise(vec3 P){
    vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g011), dot(g111, g111)));
    g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }

  void main() {
    vInteractionStrength = aInteractionStrength;
    vec3 transformed = position;

    float noiseDampening = 1.0 - aInteractionStrength;

    float internalNoiseStrength = 0.9 * noiseDampening;
    vec3 internalNoise = vec3(
        cnoise(aOriginalPosition * 1.5 + uTime * 0.2),
        cnoise(aOriginalPosition * 1.5 + uTime * 0.2 + 100.0),
        cnoise(aOriginalPosition * 1.5 + uTime * 0.2 - 100.0)
    );
    transformed += internalNoise * internalNoiseStrength;

    float explosiveNoiseStrength = 7.0 * noiseDampening; 
    vec3 explosiveNoise = vec3(
        cnoise(aOriginalPosition * 0.5 + uTime * 0.1),
        cnoise(aOriginalPosition * 0.5 + uTime * 0.1 + 200.0),
        cnoise(aOriginalPosition * 0.5 + uTime * 0.1 - 200.0)
    );

    float timeOffset = aRandom * 1.0; // Slowed down random pulse
    float pulse = pow((sin(uTime * 0.2 + timeOffset) + 1.0) * 0.5, 5.0);
    transformed += explosiveNoise * pulse * explosiveNoiseStrength;
        
    vec4 modelViewPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    gl_PointSize = 3.5;
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying float vInteractionStrength;

  void main() {
    // --- 💡 NEW MATTE SPHERE SHADING ---
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) {
        discard;
    }
    
    // Calculate 3D normal for lighting
    float z = sqrt(0.25 - dist*dist);
    vec3 normal = normalize(vec3(coord.x, coord.y, z));
    
    // --- 1. Define Colors ---
    vec3 baseColor = vec3(0.8, 0.85, 1.0); // Slightly bluish white
    vec3 glowColor = vec3(1.0, 0.1, 0.1); // Tron Ares Red

    // --- 2. Calculate Base Appearance (Matte) ---
    // Use simple diffuse lighting instead of fresnel for a matte look
    vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
    float diffuse = max(0.0, dot(normal, lightDir)) * 0.7 + 0.3; // Add ambient term
    vec3 restingColor = baseColor * diffuse;

    // --- 3. Calculate Interaction Glow ---
    // The red glow now covers the whole particle, not just the rim
    vec3 interactionGlow = glowColor * vInteractionStrength;

    // --- 4. Final Combination ---
    vec3 finalColor = restingColor + interactionGlow;
    
    // --- 5. Alpha ---
    // Fade out at the edges to keep it soft
    float alpha = (1.0 - dist * 2.0) + vInteractionStrength;

    gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
  }
`;

class ParticleMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
  }
}
extend({ ParticleMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleMaterial: ThreeElements['shaderMaterial'] & { ref?:React.Ref<ParticleMaterialType> };
    }
  }
}

function ParticleModel() {
  const pointsRef = useRef<THREE.Points<THREE.BufferGeometry, ParticleMaterialType>>(null);
  const { nodes } = useGLTF("/landing/Tecno_logo.glb") as unknown as GLTFResult;
  
  const cursorPosition = useMemo(() => new THREE.Vector3(10000, 10000, 10000), []);
  const interactionPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  const isMobile = useMemo(() => 'ontouchstart' in window, []);

  // 💡 NEW: A ref to track if the pointer is down, managed by event listeners.
  const isPointerDown = useRef(false);
  const { gl } = useThree(); // Get the renderer to attach events

  // 💡 NEW: Set up event listeners for pointer state
  useEffect(() => {
    const handlePointerDown = () => { isPointerDown.current = true; };
    const handlePointerUp = () => { isPointerDown.current = false; };
    
    gl.domElement.addEventListener('pointerdown', handlePointerDown);
    gl.domElement.addEventListener('pointerup', handlePointerUp);
    gl.domElement.addEventListener('pointerleave', handlePointerUp); // Also stop on leave

    return () => {
      gl.domElement.removeEventListener('pointerdown', handlePointerDown);
      gl.domElement.removeEventListener('pointerup', handlePointerUp);
      gl.domElement.removeEventListener('pointerleave', handlePointerUp);
    };
  }, [gl]);

  const particlesData = useRef<{
    originalPositions: Float32Array;
    currentPositions: Float32Array;
    randomValues: Float32Array;
    interactionStrengths: Float32Array;
  } | null>(null);

  useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];
    nodes.Scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const transformedGeometry = child.geometry.clone();
        transformedGeometry.applyMatrix4(child.matrixWorld);
        geometries.push(transformedGeometry);
      }
    });

    if (geometries.length === 0) return;
    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);
    if (!mergedGeometry) return;

    const tempMesh = new THREE.Mesh(mergedGeometry);
    const sampler = new MeshSurfaceSampler(tempMesh).build();
    const particleCount = 4000;
    const original = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount);
    const interactions = new Float32Array(particleCount);
    
    const scattered = new Float32Array(particleCount * 3);
    const tempPosition = new THREE.Vector3();

    for (let i = 0; i < particleCount; i++) {
        sampler.sample(tempPosition);
        original.set([tempPosition.x, tempPosition.y, tempPosition.z], i * 3);
        randoms[i] = Math.random();
        interactions[i] = 0;
        
        const r = 100 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        scattered.set([
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
        ], i * 3);
    }
    
    particlesData.current = {
      originalPositions: original,
      currentPositions: scattered,
      randomValues: randoms,
      interactionStrengths: interactions,
    };
  }, [nodes]);

  useFrame((state, delta) => {
    if (pointsRef.current && particlesData.current) {
      pointsRef.current.rotation.y += delta * 0.5;
      pointsRef.current.material.uniforms.uTime.value += delta;
      
      // 💡 FIX: Use the ref to check for pointer state.
      const pointerIsCurrentlyDown = isPointerDown.current;
      const shouldInteract = !isMobile || pointerIsCurrentlyDown;

      if (shouldInteract) {
        state.raycaster.ray.intersectPlane(interactionPlane, cursorPosition);
      } else {
        cursorPosition.set(10000, 10000, 10000);
      }

      const { originalPositions, currentPositions, interactionStrengths } = particlesData.current;
      const positionAttribute = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const interactionAttribute = pointsRef.current.geometry.attributes.aInteractionStrength as THREE.BufferAttribute;

      for (let i = 0; i < currentPositions.length / 3; i++) {
        const i3 = i * 3;
        const pos = new THREE.Vector3(currentPositions[i3], currentPositions[i3 + 1], currentPositions[i3 + 2]);
        const originalPos = new THREE.Vector3(originalPositions[i3], originalPositions[i3 + 1], originalPositions[i3 + 2]);
        
        const distanceToCursor = pos.distanceTo(cursorPosition);
        const interactionRadius = 3.5;
        const force = Math.max(0, interactionRadius - distanceToCursor);
        
        const shouldGlow = force > 0;
        
        const currentStrength = interactionStrengths[i];
        const targetStrength = shouldGlow ? 1.0 : 0.0;
        const dampingFactor = shouldGlow ? 8 : 1.5;
        interactionStrengths[i] = THREE.MathUtils.damp(currentStrength??0, targetStrength, dampingFactor, delta);

        if (force > 0) {
            const direction = pos.clone().sub(cursorPosition).normalize();
            const pushForce = Math.pow(force, 2.0) * 0.6;
            pos.add(direction.multiplyScalar(pushForce));
        }

        pos.lerp(originalPos, 0.01);
        currentPositions.set([pos.x, pos.y, pos.z], i3);
      }

      positionAttribute.set(currentPositions);
      positionAttribute.needsUpdate = true;
      
      interactionAttribute.set(interactionStrengths);
      interactionAttribute.needsUpdate = true;
    }
  });
  
  if (!particlesData.current) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesData.current.currentPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-aOriginalPosition"
          args={[particlesData.current.originalPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[particlesData.current.randomValues, 1]}
        />
        <bufferAttribute
          attach="attributes-aInteractionStrength"
          args={[particlesData.current.interactionStrengths, 1]}
        />
      </bufferGeometry>
      <particleMaterial />
    </points>
  );
}

export default ParticleModel;