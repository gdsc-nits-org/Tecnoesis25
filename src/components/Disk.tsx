"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { div } from "three/tsl";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
// import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// --- Shader Code ---
const vertexShader = `
  uniform float uTime;
  uniform float uInteractionStrength;
  attribute vec3 aRandom;
  attribute vec3 aTargetPosition;

  varying float vDistance;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
  }

  void main() {
    vec3 basePosition = aTargetPosition;

    vec3 scatterOffset = vec3(
      sin(aRandom.x * 5.0 + uTime * 0.2),
      sin(aRandom.y * 5.0 + uTime * 0.2),
      sin(aRandom.z * 5.0 + uTime * 0.2)
    );

    scatterOffset = (scatterOffset - 0.5) * 15.0;

    vec3 finalPosition = mix(basePosition, basePosition + scatterOffset, uInteractionStrength);

    vec4 modelPosition = modelMatrix * vec4(finalPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = 15.0;
    gl_PointSize *= (1.0 / -viewPosition.z);

    vDistance = distance(finalPosition, vec3(0.0));
  }
`;

const fragmentShader = `
  varying float vDistance;

  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - step(0.5, strength);
    strength = pow(strength, 3.0);
  
    vec3 color = mix(vec3(1.0, 0.1, 0.3), vec3(0.3, 0.5, 1.0), vDistance / 3.0);

    gl_FragColor = vec4(color, strength);
  }
`;

// --- NEW: Hologram Shader Code ---
const hologramVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const hologramFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    // Create a scanline effect
    float scanline = sin(vUv.y * 300.0 - uTime * 5.0) * 0.1 + 0.9;
    
    // Sample the texture
    vec4 textureColor = texture2D(uTexture, vUv);
    
    // Apply effects
    vec3 finalColor = textureColor.rgb * scanline;
    
    // Make sure transparent parts of the PNG are not visible
    float alpha = textureColor.a > 0.1 ? 1.0 : 0.0;
    
    gl_FragColor = vec4(finalColor, alpha * uOpacity);
  }
`;

// ---- Types ----
type InteractionRef = React.MutableRefObject<{ target: number }>;

interface ParticleModelProps {
  interactionRef: InteractionRef;
}

function ParticleModel({ interactionRef }: ParticleModelProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { scene } = useGLTF("/tr.glb");

  const particlesData = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const transformedGeometry = mesh.geometry.clone();
        transformedGeometry.applyMatrix4(mesh.matrixWorld);
        geometries.push(transformedGeometry);
      }
    });

    if (geometries.length === 0) return null;

    const mergedGeometry = mergeGeometries(geometries);
    if (!mergedGeometry || !mergedGeometry.attributes.position) return null;

    const targetPositions = mergedGeometry.attributes.position
      .array as Float32Array;

    const particleCount = targetPositions.length / 3;
    const randomPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      randomPositions.set(
        [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5],
        i * 3,
      );
    }

    return {
      target: targetPositions,
      random: randomPositions,
      count: particleCount,
    };
  }, [scene]);

  useFrame((state) => {
    if (pointsRef.current) pointsRef.current.rotation.x = Math.PI / 2;
    const { clock } = state;
    if (pointsRef.current && interactionRef.current) {
      const mat = pointsRef.current.material as THREE.ShaderMaterial;
      if (!mat || !mat.uniforms || !mat.uniforms.uTime) return;
      mat.uniforms.uTime.value = clock.getElapsedTime();
      if (!mat.uniforms.uInteractionStrength) return;
      const currentStrength = mat.uniforms.uInteractionStrength.value as number;
      const targetStrength = interactionRef.current.target;

      const newStrength = THREE.MathUtils.lerp(
        currentStrength,
        targetStrength,
        0.05,
      );
      mat.uniforms.uInteractionStrength.value = newStrength;
    }
  });

  if (!particlesData) return null;

  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesData.count}
          array={particlesData.target}
          itemSize={3}
          args={[particlesData.target, 3]}
        />
        <bufferAttribute
          attach="attributes-aTargetPosition"
          count={particlesData.count}
          array={particlesData.target}
          itemSize={3}
          args={[particlesData.target, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={particlesData.count}
          array={particlesData.random}
          itemSize={3}
          args={[particlesData.target, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{
          uTime: { value: 0 },
          uInteractionStrength: { value: 0 },
        }}
      />
    </points>
  );
}

function CameraAnimation({ onAnimationEnd }: { onAnimationEnd: () => void }) {
  const startTimeRef = useRef(Date.now());
  const animationEndedRef = useRef(false);

  useFrame(({ camera }) => {
    // If the animation has already ended, do nothing.
    if (animationEndedRef.current) return;

    const elapsedTime = (Date.now() - startTimeRef.current) / 1000;

    // --- Animation Sequence ---
    // Phase 1: Move towards the model (0s -> 2s)
    if (elapsedTime <= 2.0) {
      const progress = elapsedTime / 2.0;
      // Animate Z position from 200 to 30
      camera.position.z = THREE.MathUtils.lerp(200, 0, progress);
    }
    // Phase 2: Look down (2s -> 4s)
    else if (elapsedTime <= 4.0) {
      // Lock Z position to the final state of phase 1
      const progress = (elapsedTime - 2.0) / 2.0;
      // Animate rotation around the X-axis to look down
      camera.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 2, progress);
    }
    // Phase 3: Move up (4s -> 6s)
    else if (elapsedTime <= 8.0) {
      // Lock Z position and X rotation to final states of phase 2
      camera.position.z = 0;
      camera.rotation.x = Math.PI / 2;
      const progress = (elapsedTime - 4.0) / 2.0;
      // Animate Y position to move the camera up
      camera.position.y = THREE.MathUtils.lerp(0, -210, progress);
      camera.position.z = THREE.MathUtils.lerp(0, 80, progress);
    } else if (elapsedTime <= 10.0) {
      // Lock Z position and X rotation to final states of phase 2
      // const progress = (elapsedTime - 8.0) / 2.0;
      // camera.rotation.x = THREE.MathUtils.lerp(
      //   Math.PI / 2,
      //   Math.PI / 2.2,
      //   progress,
      // );
    }
    // End of Animation
    else {
      // Set the final camera state to be precise
      // camera.position.set(0, -150, 50);
      // camera.rotation.set(Math.PI / 2.75, 0, 0);
      // Call the onAnimationEnd callback once to re-enable controls
      // onAnimationEnd();
      // animationEndedRef.current = true;
    }
  });

  return null; // This component doesn't render any visible elements
}

// --- NEW: Hologram Component ---
function Hologram({ visible }: { visible: boolean }) {
  // NOTE: Make sure `logo.png` is in the public folder.
  const texture = useTexture("/logo.jpg");
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

      // Animate opacity when it becomes visible
      const targetOpacity = visible ? 0.75 : 0;
      const currentOpacity = materialRef.current.uniforms.uOpacity.value;
      materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
        currentOpacity,
        targetOpacity,
        0.05,
      );
    }
  });

  // Set aspect ratio of the plane to match the image
  const aspect = texture.image ? texture.image.width / texture.image.height : 1;
  const planeSize = 10;

  return (
    <mesh
      position={[0, 8, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[planeSize * aspect, planeSize, 1]}
    >
      <planeGeometry />
      <shaderMaterial
        ref={materialRef}
        vertexShader={hologramVertexShader}
        fragmentShader={hologramFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uTexture: { value: texture },
          uOpacity: { value: 0 },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// --- Main Scene Component (Modified) ---
export default function Model() {
  const interactionRef = useRef<{ target: number }>({ target: 1 });
  // State to track if the initial camera animation is playing
  const [isAnimating, setIsAnimating] = useState(true);

  const handleInteractionStart = () => {
    interactionRef.current.target = 0;
  };

  const handleInteractionEnd = () => {
    interactionRef.current.target = 1;
  };

  useEffect(() => console.log(isAnimating), [isAnimating]);

  return (
    <Canvas camera={{ position: [0, 0, 200], fov: 75 }}>
      <color attach="background" args={["#050505"]} />

      {/* Conditionally render the animation component */}
      {isAnimating && (
        <CameraAnimation onAnimationEnd={() => setIsAnimating(false)} />
      )}
      <ParticleModel interactionRef={interactionRef} />

      <OrbitControls
        // Disable controls during the initial animation
        enabled={!isAnimating}
        onStart={handleInteractionStart}
        onEnd={handleInteractionEnd}
      />

      <EffectComposer>
        <Bloom
          mipmapBlur
          luminanceThreshold={0.5}
          radius={0.8}
          intensity={0.2}
        />
      </EffectComposer>
    </Canvas>
  );
}
