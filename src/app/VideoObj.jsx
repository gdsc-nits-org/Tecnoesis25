import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
// Make sure to import the utility from the correct path for your THREE version
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// --- Shader Code ---
// This vertex shader now includes a 'uInteractionStrength' uniform
// to control the scattering effect based on user interaction.

const vertexShader = `
  uniform float uTime;
  uniform float uInteractionStrength; // New uniform to control scattering (0.0 to 1.0)
  attribute vec3 aRandom;
  attribute vec3 aTargetPosition;

  varying float vDistance;

  // 2D Random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // 2D Noise function for swirling
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
    // --- Animation Logic ---
    // 1. The base position is the target shape from the model.
    vec3 basePosition = aTargetPosition;

    // 2. Calculate a scatter offset using noise for a nice organic feel.
    // This creates a swirling, chaotic position for each particle.
    vec3 scatterOffset = vec3(
    sin(aRandom.x * 5.0 + uTime * 0.2),
    sin(aRandom.y * 5.0 + uTime * 0.2),
    sin(aRandom.z * 5.0 + uTime * 0.2)
);

    scatterOffset = (scatterOffset - 0.5) * 15.0; // Center and scale the noise

    // 3. Mix between the base shape and the scattered state.
    // When uInteractionStrength is 0, particles are in the model's shape.
    // When uInteractionStrength is 1, they are fully scattered.
    vec3 finalPosition = mix(basePosition, basePosition + scatterOffset, uInteractionStrength);
    
    // --- Final Vertex Calculation ---
    vec4 modelPosition = modelMatrix * vec4(finalPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    
    // --- Point Size ---
    gl_PointSize = 15.0;
    gl_PointSize *= (1.0 / -viewPosition.z);

    vDistance = distance(finalPosition, vec3(0.0));
  }
`;

const fragmentShader = `
  varying float vDistance;

  void main() {
    // Create a soft circular shape for the particle
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - step(0.5, strength);
    strength = pow(strength, 3.0);

    // Color the particle
    vec3 color = mix(vec3(1.0, 0.1, 0.3), vec3(0.3, 0.5, 1.0), vDistance / 3.0);
    
    gl_FragColor = vec4(color, strength);
  }
`;


// --- Updated Particle Model Component ---
function ParticleModel({ interactionRef }) {
  const pointsRef = useRef();

  const { scene } = useGLTF('/tr.glb'); // Your model path

  // This is the core logic that has been updated
  const particlesData = useMemo(() => {
    // 1. Create an array to hold the geometries from all meshes
    const geometries = [];

    // 2. Traverse the loaded scene to find all meshes
    scene.traverse((child) => {
      // We only care about meshes that have geometry
      if (child.isMesh) {
        // We need to apply the mesh's world transform to its geometry
        // to ensure all parts of the model are in their correct relative positions.
        const transformedGeometry = child.geometry.clone();
        transformedGeometry.applyMatrix4(child.matrixWorld);
        geometries.push(transformedGeometry);
      }
    });

    // 3. If no meshes were found, return null
    if (geometries.length === 0) return null;

    // 4. Merge all the collected geometries into a single geometry
    const mergedGeometry = mergeGeometries(geometries);

    // 5. Now, we proceed as before, but using the merged geometry
    const targetPositions = mergedGeometry.attributes.position.array;
    const particleCount = targetPositions.length / 50;
    const randomPositions = new Float32Array(particleCount * 50);

    for (let i = 0; i < particleCount; i++) {
      randomPositions.set(
        [(Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)],
        i * 3
      );
    }

    return {
      target: targetPositions,
      random: randomPositions,
      count: particleCount
    };
  }, [scene]);

  // The useFrame hook remains exactly the same
  useFrame((state) => {
    const { clock } = state;
    if (pointsRef.current && interactionRef && interactionRef.current) {
      pointsRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
      const currentStrength = pointsRef.current.material.uniforms.uInteractionStrength.value;
      const targetStrength = interactionRef.current.target;
      const newStrength = THREE.MathUtils.lerp(currentStrength, targetStrength, 0.05);
      pointsRef.current.material.uniforms.uInteractionStrength.value = newStrength;
    }
  });

  if (!particlesData) return null;

  // The JSX returned here also remains exactly the same
  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particlesData.count} array={particlesData.target} itemSize={3} />
        <bufferAttribute attach="attributes-aTargetPosition" count={particlesData.count} array={particlesData.target} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" count={particlesData.count} array={particlesData.random} itemSize={3} />
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

export default function App() {
  // A ref is used to store the interaction state. This is more performant
  // than React state as it doesn't cause re-renders on every frame.
  // The initial value for the ref's .current property is a simple object.
  const interactionRef = useRef({ target: 0 });

  // These functions are called by OrbitControls when interaction starts and ends.
  const handleInteractionStart = () => {
    // Add a more robust check here as well
    if(interactionRef && interactionRef.current) {
        interactionRef.current.target = 1; // Set target strength to 1 (scatter)
    }
  };

  const handleInteractionEnd = () => {
    // Add a more robust check here as well
    if(interactionRef && interactionRef.current) {
        interactionRef.current.target = 0; // Set target strength to 0 (form shape)
    }
  };

  return (
    <Canvas camera={{ position: [0, 200, 200], fov: 75 }}>
      <color attach="background" args={['#050505']} />
      {/* <ambientLight intensity={0.2} /> */}
      {/* <pointLight position={[10, 10, 10]} intensity={1.5} /> */}
      
      {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}

      {/* Pass the interaction ref down to the particle model */}
      <ParticleModel interactionRef={interactionRef} />

      {/* Add event handlers to OrbitControls */}
      <OrbitControls onStart={handleInteractionStart} onEnd={handleInteractionEnd} />

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.5} radius={0.8} intensity={1.2} />
      </EffectComposer>
    </Canvas>
  );
}
