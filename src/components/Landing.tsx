"use client";

import { Canvas, useFrame, extend, ThreeElements } from '@react-three/fiber';
import { Environment, useGLTF } from "@react-three/drei";
import React, { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

// Define the type for our custom shader material
interface ParticleMaterialType extends THREE.ShaderMaterial {
  uniforms: {
    uTime: { value: number };
    uCursor: { value: THREE.Vector3 };
    uVelocity: { value: number }; // Uniform for cursor velocity
  };
}

// Define the type for the GLTF result for type safety
interface GLTFResult {
  nodes: {
    [key: string]: THREE.Object3D;
    Scene: THREE.Group;
  };
  materials: {
    [key: string]: THREE.Material;
  };
}

// --- SHADER UPGRADE: VELOCITY-BASED REPULSION ---
const vertexShader = `
  uniform float uTime;
  uniform vec3 uCursor;
  uniform float uVelocity; // The speed of the cursor
  attribute float aRandom; // Attribute for randomization

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
    vec3 transformed = position;

    // --- RANDOMIZED NOISE LOGIC ---
    float internalNoiseStrength = 0.7;
    vec3 internalNoise = vec3(
        cnoise(position * 1.5 + uTime * 0.2),
        cnoise(position * 1.5 + uTime * 0.2 + 100.0),
        cnoise(position * 1.5 + uTime * 0.2 - 100.0)
    );
    transformed += internalNoise * internalNoiseStrength;

    float explosiveNoiseStrength = 12.0;
    vec3 explosiveNoise = vec3(
        cnoise(position * 0.5 + uTime * 0.1),
        cnoise(position * 0.5 + uTime * 0.1 + 200.0),
        cnoise(position * 0.5 + uTime * 0.1 - 200.0)
    );

    float timeOffset = aRandom * 10.0;
    float pulse = pow((sin(uTime * 0.5 + timeOffset) + 1.0) * 0.5, 5.0);
    transformed += explosiveNoise * pulse * explosiveNoiseStrength;

    // --- 💡 REPULSION LOGIC ---
    float distanceToCursor = length(uCursor - position);
    vec3 directionFromCursor = normalize(position - uCursor);

    // Repulsion is strongest near the cursor, simulating "radius 0"
    float falloff = smoothstep(15.0, 0.0, distanceToCursor);
    
    // The force is a combination of the falloff and the cursor's velocity.
    float force = falloff * uVelocity * 400.0; 

    transformed += directionFromCursor * force;
    
    vec4 modelViewPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    gl_PointSize = 5.0;
  }
`;

const fragmentShader = `
  void main() {
    // --- SPHERICAL SHADING LOGIC ---
    vec2 coord = gl_PointCoord - vec2(0.5);
    if (length(coord) > 0.5) {
      discard;
    }
    float z = sqrt(0.25 - dot(coord, coord));
    vec3 normal = normalize(vec3(coord.x, coord.y, z));
    vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
    float diffuse = max(0.0, dot(normal, lightDir)) * 0.7 + 0.3;
    gl_FragColor = vec4(vec3(0.8, 0.9, 1.0) * diffuse, 1.0);
  }
`;

class ParticleMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uCursor: { value: new THREE.Vector3(10000, 10000, 10000) },
        uVelocity: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }
}
extend({ ParticleMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleMaterial: ThreeElements['shaderMaterial'] & { ref?: React.Ref<ParticleMaterialType> };
    }
  }
}

function ParticleModel() {
  const pointsRef = useRef<THREE.Points<THREE.BufferGeometry, ParticleMaterialType>>(null);
  const { nodes } = useGLTF("/landing/Tecno_logo.glb") as unknown as GLTFResult;
  
  const targetPosition = useMemo(() => new THREE.Vector3(10000, 10000, 10000), []);
  const lastPointerPosition = useRef(new THREE.Vector2());
  const cursorVelocity = useRef(0);

  const { particlePositions, randomValues } = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];
    nodes.Scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const transformedGeometry = child.geometry.clone();
        transformedGeometry.applyMatrix4(child.matrixWorld);
        geometries.push(transformedGeometry);
      }
    });

    if (geometries.length === 0) return { particlePositions: new Float32Array(0), randomValues: new Float32Array(0) };
    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);
    if (!mergedGeometry) return { particlePositions: new Float32Array(0), randomValues: new Float32Array(0) };

    const tempMesh = new THREE.Mesh(mergedGeometry);
    const sampler = new MeshSurfaceSampler(tempMesh).build();
    const particleCount = 500;
    const particles = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount);
    const tempPosition = new THREE.Vector3();

    for (let i = 0; i < particleCount; i++) {
        sampler.sample(tempPosition);
        particles.set([tempPosition.x, tempPosition.y, tempPosition.z], i * 3);
        randoms[i] = Math.random();
    }

    return { particlePositions: particles, randomValues: randoms };
  }, [nodes]);

  const interactionPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value += delta;
      
      const pointerDistance = state.pointer.distanceTo(lastPointerPosition.current);
      // --- 💡 SLOWER RELEASE SPEED ---
      // A smaller damping factor makes the velocity fade out more slowly.
      cursorVelocity.current = THREE.MathUtils.damp(
          cursorVelocity.current,
          pointerDistance,
          2.5, // Decreased for a slower stagger effect
          delta
      );
      lastPointerPosition.current.copy(state.pointer);

      state.raycaster.ray.intersectPlane(interactionPlane, targetPosition);

      pointsRef.current.material.uniforms.uCursor.value.lerp(targetPosition, 0.2);
      pointsRef.current.material.uniforms.uVelocity.value = cursorVelocity.current;
    }
  });
  
  if (particlePositions.length === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlePositions.length / 3}
          array={particlePositions}
          args={[particlePositions, 3]}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={randomValues.length}
          array={randomValues}
          args={[randomValues,1]}
          itemSize={1}
        />
      </bufferGeometry>
      <particleMaterial />
    </points>
  );
}

useGLTF.preload("/landing/Tecno_logo.glb");

const Landing = () => {
  return (
    <div
      className="flex h-screen w-screen cursor-pointer items-center justify-center bg-black bg-cover bg-center"
      style={{ backgroundImage: "url('/landing/bg.png')" }}
    >
      <Canvas
        camera={{ position: [0, 0, 150], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />
        <Suspense fallback={null}>
          <ParticleModel />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Landing;

