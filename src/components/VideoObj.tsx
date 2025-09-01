"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { mergeBufferGeometries } from "three-stdlib";

// --- Shader Code ---
const vertexShader = `
  uniform float uTime;
  uniform float uInteractionStrength;
  uniform vec2 uResolution;
  attribute vec3 aRandom;
  attribute vec3 aTargetPosition;

  varying float vDistance;
  varying float vInteractionStrength;

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
      noise(aTargetPosition.xy + uTime * 0.1),
      noise(aTargetPosition.yz + uTime * 0.1),
      noise(aTargetPosition.zx + uTime * 0.1)
    );

    scatterOffset = (scatterOffset - 0.5) * 100.0;

    vec3 finalPosition = mix(basePosition, basePosition + scatterOffset, uInteractionStrength);
    vInteractionStrength = uInteractionStrength;

    vec4 modelPosition = modelMatrix * vec4(finalPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = 350.0 + 50.0 * (2160.0 / uResolution.x);
    gl_PointSize *= (1.0 / -viewPosition.z);

    vDistance = distance(finalPosition, vec3(0.0));
  }
`;

const fragmentShader = `
  varying float vDistance;
  varying float vInteractionStrength;

  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - step(0.5, strength);
    strength = pow(strength, 3.0);

    vec3 color = mix(vec3(1.0, 0.1, 0.3), vec3(0.3, 0.5, 1.0), vDistance / 50.0);
    gl_FragColor = vec4(color, strength);
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
    const mergedGeometry = mergeBufferGeometries(geometries);
    if (!mergedGeometry?.attributes?.position) return null;
    const targetPositions = mergedGeometry.attributes.position.array as Float32Array;
    const particleCount = targetPositions.length / 3;
    const randomPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      randomPositions.set(
        [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5],
        i * 3
      );
    }
    return {
      target: targetPositions,
      random: randomPositions,
      count: particleCount,
    };
  }, [scene]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uInteractionStrength: { value: 0.15 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    }),
    []
  );

  useFrame((state) => {
    if (pointsRef.current) pointsRef.current.rotation.x = Math.PI / 2;
    const { clock } = state;
    if (pointsRef.current && interactionRef.current) {
      const mat = pointsRef.current.material as THREE.ShaderMaterial;
      if (!mat.uniforms) return;
      if (mat.uniforms.uTime) {
        mat.uniforms.uTime.value = clock.getElapsedTime();
      }
      if (mat.uniforms.uInteractionStrength) {
        const currentStrength = mat.uniforms.uInteractionStrength.value as number;
        const targetStrength = interactionRef.current.target;
        const newStrength = THREE.MathUtils.lerp(
          currentStrength,
          targetStrength,
          0.05
        );
        mat.uniforms.uInteractionStrength.value = newStrength;
      }
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
          args={[particlesData.random, 3]}
        />
        <bufferAttribute
          attach="attributes-aTargetPosition"
          count={particlesData.count}
          array={particlesData.target}
          itemSize={3}
          args={[particlesData.random, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={particlesData.count}
          array={particlesData.random}
          itemSize={3}
          args={[particlesData.random, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
}

function CameraAnimation({ onAnimationEnd }: { onAnimationEnd: () => void }) {
  const startTimeRef = useRef(Date.now());
  const animationEndedRef = useRef(false);

  useFrame(({ camera }) => {
    if (animationEndedRef.current) return;

    const elapsedTime = (Date.now() - startTimeRef.current) / 1000;

    if (elapsedTime <= 2.0) {
      const progress = elapsedTime / 2.0;
      camera.position.z = THREE.MathUtils.lerp(200, 0, progress);
    } else if (elapsedTime <= 4.0) {
      const progress = (elapsedTime - 2.0) / 2.0;
      camera.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 2, progress);
    } else if (elapsedTime <= 8.0) {
      camera.position.z = 0;
      camera.rotation.x = Math.PI / 2;
      const progress = (elapsedTime - 4.0) / 4.0;
      camera.position.y = THREE.MathUtils.lerp(0, -300, progress);
      camera.position.z = THREE.MathUtils.lerp(0, 50, progress);
    } else if (elapsedTime <= 10.0) {
      const progress = (elapsedTime - 8.0) / 2.0;
      camera.rotation.x = THREE.MathUtils.lerp(Math.PI / 2, 0, progress);
      camera.position.y = THREE.MathUtils.lerp(-300, 0, progress);
      camera.position.z = THREE.MathUtils.lerp(50, 350, progress);
    } else {
      if (!animationEndedRef.current) {
        onAnimationEnd();
        animationEndedRef.current = true;
      }
    }
  });

  return null;
}

interface MouseSpeedControllerProps {
  interactionRef: InteractionRef;
  mouseDataRef: React.MutableRefObject<{
    lastX: number;
    lastY: number;
    lastTime: number;
    speed: number;
  }>;
}

function MouseSpeedController({ interactionRef, mouseDataRef }: MouseSpeedControllerProps) {
  useFrame(() => {
    const speed = mouseDataRef.current.speed;
    const RESTING_STRENGTH = 0;
    const SENSITIVITY = 0.2;
    const DECAY_RATE = 0.05;

    const speedStrength = RESTING_STRENGTH + Math.min(speed * SENSITIVITY, 1.0);
    const decayingStrength = THREE.MathUtils.lerp(
      interactionRef.current.target,
      RESTING_STRENGTH,
      DECAY_RATE
    );

    interactionRef.current.target = Math.max(speedStrength, decayingStrength);
    mouseDataRef.current.speed = 0;
  });

  return null;
}

// ScrollZoom uses useThree() to get the actual canvas camera.
function ScrollZoom({ enabled = true }: { enabled?: boolean }) {
  const scrollYRef = useRef(0);
  const { camera } = useThree();

  // Listen to page scroll (update stored scrollY)
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (!enabled) return;

    // Configurable values
    const baseZ = 200;
    const sensitivity = 0.2; // change to taste
    const minZ = 50;
    const maxZ = 400;

    const targetZ = THREE.MathUtils.clamp(baseZ - scrollYRef.current * sensitivity, minZ, maxZ);

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
  });

  return null;
}

// --- Main Scene Component ---
export default function Model() {
  const interactionRef = useRef<{ target: number }>({ target: 0 });
  const [isAnimating, setIsAnimating] = useState(true);

  const mouseDataRef = useRef({
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    speed: 0,
  });

  const isDraggingRef = useRef(false);

  useEffect(() => {
    const handleMouseDown = () => {
      isDraggingRef.current = true;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      // reset lastTime so drag starts fresh next time
      mouseDataRef.current.lastTime = 0;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const { clientX, clientY, timeStamp } = event;
      const mouseData = mouseDataRef.current;

      if (mouseData.lastTime === 0) {
        mouseData.lastX = clientX;
        mouseData.lastY = clientY;
        mouseData.lastTime = timeStamp;
        return;
      }

      const deltaTime = timeStamp - mouseData.lastTime;
      if (deltaTime === 0) return;

      const deltaX = clientX - mouseData.lastX;
      const deltaY = clientY - mouseData.lastY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      mouseData.speed = distance / deltaTime;

      mouseData.lastX = clientX;
      mouseData.lastY = clientY;
      mouseData.lastTime = timeStamp;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Canvas
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 200], fov: 75 }}
      className="mx-auto h-[90%] w-[90%]"
    >
      {/* Camera animation runs at start */}
      {isAnimating && <CameraAnimation onAnimationEnd={() => setIsAnimating(false)} />}

      <ParticleModel interactionRef={interactionRef} />

      {!isAnimating && (
        <>
          <OrbitControls enableZoom={true} enablePan={false} enableRotate={true} maxPolarAngle={Math.PI / 2} />
          <MouseSpeedController interactionRef={interactionRef} mouseDataRef={mouseDataRef} />
          {/* enable scroll zoom only after animation ends */}
          <ScrollZoom enabled={!isAnimating} />
        </>
      )}

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.5} radius={0.8} intensity={0.2} />
      </EffectComposer>
    </Canvas>
  );
}
