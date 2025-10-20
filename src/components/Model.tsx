"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { isMobile } from "react-device-detect";
import EnterGridButton from "./EnterGridButton";

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
  uniform float uColorTransition;
  uniform float uTime;

  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - step(0.5, strength);
    strength = pow(strength, 3.0);

    // Original blue gradient color
    vec3 blueColor = mix(vec3(1.0, 0.1, 0.3), vec3(0.3, 0.5, 1.0), vDistance / 50.0);
    
    // Target deep red color - pure red with no green or blue components
    vec3 redColor = vec3(0.9, 0.0, 0.0);
    
    // Create a wave effect for the transition
    float wave = sin(vDistance * 0.5 - uTime * 3.0) * 0.5 + 0.5;
    float transitionProgress = uColorTransition * (1.0 + wave * 0.3);
    transitionProgress = clamp(transitionProgress, 0.0, 1.0);
    
    // Smooth easing for the transition
    float easedProgress = transitionProgress * transitionProgress * (3.0 - 2.0 * transitionProgress);
    
    // Mix colors with the eased progress
    vec3 finalColor = mix(blueColor, redColor, easedProgress);
    
    // Add a subtle pulse during transition - boost red intensity
    float pulse = 1.0 + sin(uTime * 5.0) * 0.15 * uColorTransition * (1.0 - uColorTransition);
    finalColor *= pulse;
    
    // Ensure red channel stays strong and green/blue stay at zero during full transition
    if (uColorTransition > 0.95) {
      finalColor = vec3(finalColor.r * 1.1, 0.0, 0.0);
    }
    
    gl_FragColor = vec4(finalColor, strength);
  }
`;

// ---- Types ----
type InteractionRef = React.MutableRefObject<{ target: number }>;

interface ParticleModelProps {
  interactionRef: InteractionRef;
  isDraggingRef: React.MutableRefObject<boolean>;
  colorTransition: number;
}

function ParticleModel({
  interactionRef,
  isDraggingRef,
  colorTransition,
}: ParticleModelProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { scene } = useGLTF("https://d3f6voaditlmqg.cloudfront.net/tr.glb");

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

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uInteractionStrength: { value: 0.15 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uColorTransition: { value: 0 },
    }),
    [],
  );

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.PI / 2;
      if (!isDraggingRef.current) pointsRef.current.rotation.y -= 0.09;
    }
    const { clock } = state;
    if (pointsRef.current && interactionRef.current) {
      const mat = pointsRef.current.material as THREE.ShaderMaterial;
      if (!mat.uniforms) return;
      if (mat.uniforms.uTime) {
        mat.uniforms.uTime.value = clock.getElapsedTime();
      }
      if (mat.uniforms.uInteractionStrength) {
        const currentStrength = mat.uniforms.uInteractionStrength
          .value as number;
        const targetStrength = interactionRef.current.target;
        const newStrength = THREE.MathUtils.lerp(
          currentStrength,
          targetStrength,
          0.05,
        );
        mat.uniforms.uInteractionStrength.value = newStrength;
      }
      if (mat.uniforms.uColorTransition) {
        mat.uniforms.uColorTransition.value = colorTransition;
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
        // Ensure final position is set
        camera.position.y = 0;
        camera.position.z = 350;
        camera.rotation.x = 0;
        onAnimationEnd();
        animationEndedRef.current = true;
      }
    }
  });

  return null;
}

function ZoomTransition({ onTransitionEnd }: { onTransitionEnd: () => void }) {
  const startTimeRef = useRef(Date.now());
  const transitionEndedRef = useRef(false);
  const finalPositionSetRef = useRef(false);
  const TRANSITION_DURATION = 2.5; // seconds

  useFrame(({ camera }) => {
    if (transitionEndedRef.current) {
      // Keep camera locked at final position
      if (!finalPositionSetRef.current) {
        camera.position.z = -200;
        finalPositionSetRef.current = true;
      }
      return;
    }

    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const progress = Math.min(elapsed / TRANSITION_DURATION, 1.0);

    // Smooth easing function for better visual experience
    const easeProgress =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    // Interpolate camera position z from 350 to -200
    camera.position.z = THREE.MathUtils.lerp(350, -200, easeProgress);

    // Trigger callback when complete
    if (progress >= 1.0 && !transitionEndedRef.current) {
      // Ensure final position is locked
      camera.position.z = -200;
      transitionEndedRef.current = true;
      onTransitionEnd();
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

function MouseSpeedController({
  interactionRef,
  mouseDataRef,
}: MouseSpeedControllerProps) {
  useFrame(() => {
    const speed = mouseDataRef.current.speed;
    const RESTING_STRENGTH = 0;
    const SENSITIVITY = 0.2;
    const DECAY_RATE = 0.05;

    const speedStrength = RESTING_STRENGTH + Math.min(speed * SENSITIVITY, 1.0);
    const decayingStrength = THREE.MathUtils.lerp(
      interactionRef.current.target,
      RESTING_STRENGTH,
      DECAY_RATE,
    );

    interactionRef.current.target = Math.max(speedStrength, decayingStrength);
    mouseDataRef.current.speed = 0;
  });

  return null;
}

// Component to reset camera position after interactions
interface CameraResetProps {
  isInteracting: boolean;
  originalPosition: THREE.Vector3;
  originalRotation: THREE.Euler;
}

function CameraReset({
  isInteracting,
  originalPosition,
  originalRotation,
}: CameraResetProps) {
  const { camera } = useThree();
  const resetStartTimeRef = useRef<number | null>(null);
  const RESET_DURATION = 1.5; // seconds

  useFrame(() => {
    if (isInteracting) {
      // Reset the timer when interaction starts
      resetStartTimeRef.current = null;
      return;
    }

    // Start reset timer if not already started
    if (resetStartTimeRef.current === null) {
      resetStartTimeRef.current = Date.now();
    }

    const elapsed = (Date.now() - resetStartTimeRef.current) / 1000;
    const progress = Math.min(elapsed / RESET_DURATION, 1.0);

    // Smooth easing
    const easeProgress =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    // Smoothly interpolate back to original position
    camera.position.lerp(originalPosition, easeProgress * 0.1);

    // Smoothly interpolate back to original rotation
    const targetQuaternion = new THREE.Quaternion().setFromEuler(
      originalRotation,
    );
    camera.quaternion.slerp(targetQuaternion, easeProgress * 0.1);
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
    const baseZ = 300;
    const sensitivity = 0.2; // change to taste
    const minZ = 50;
    const maxZ = 400;

    const targetZ = THREE.MathUtils.clamp(
      baseZ - scrollYRef.current * sensitivity,
      minZ,
      maxZ,
    );

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
  });

  return null;
}

// Component to track model center position in screen coordinates
function ModelCenterTracker({
  onPositionUpdate,
}: {
  onPositionUpdate: (x: number, y: number) => void;
}) {
  const { camera, size } = useThree();

  useFrame(() => {
    // The model is centered at origin (0, 0, 0) in 3D space
    const modelCenter = new THREE.Vector3(0, 0, 0);

    // Project 3D position to screen coordinates
    const screenPosition = modelCenter.clone().project(camera);

    // Convert normalized device coordinates (-1 to 1) to pixel coordinates
    const x = (screenPosition.x * 0.5 + 0.5) * size.width;
    const y = (-(screenPosition.y * 0.5) + 0.5) * size.height;

    onPositionUpdate(x, y);
  });

  return null;
}

// --- Main Scene Component ---
interface ModelProps {
  onZoomStart?: () => void;
  onNavigate?: () => void;
}

export default function Model({ onZoomStart, onNavigate }: ModelProps = {}) {
  const interactionRef = useRef<{ target: number }>({ target: 0 });
  const [isAnimating, setIsAnimating] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [isColorTransitioning, setIsColorTransitioning] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [colorTransition, setColorTransition] = useState(0);
  const colorTransitionStartRef = useRef<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const mouseDataRef = useRef({
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    speed: 0,
  });

  const isDraggingRef = useRef(false);
  
  // Store original camera position and rotation after initial animation
  const originalCameraPosition = useRef(new THREE.Vector3(0, 0, 350));
  const originalCameraRotation = useRef(new THREE.Euler(0, 0, 0));

  // Store original camera position and rotation after initial animation
  // const originalCameraPosition = useRef(new THREE.Vector3(0, 0, 350));
  // const originalCameraRotation = useRef(new THREE.Euler(0, 0, 0));

  const handleInitialAnimationEnd = () => {
    setIsAnimating(false);
    setShowButton(true);
    // Store the final camera position after animation
    originalCameraPosition.current.set(0, 0, 350);
    originalCameraRotation.current.set(0, 0, 0);
  };

  const handleEnterGrid = () => {
    setShowButton(false);
    setIsColorTransitioning(true);
    colorTransitionStartRef.current = Date.now();
    if (onZoomStart) {
      onZoomStart();
    }
  };

  const handleColorTransitionEnd = () => {
    setIsColorTransitioning(false);
    setIsZooming(true);
  };

  const handleZoomEnd = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  // Animate color transition over 2 seconds, then start zoom
  useEffect(() => {
    if (!isColorTransitioning || colorTransitionStartRef.current === null)
      return;

    const animate = () => {
      const elapsed = Date.now() - colorTransitionStartRef.current!;
      const progress = Math.min(elapsed / 2000, 1.0); // 2 seconds
      setColorTransition(progress);

      if (progress < 1.0) {
        requestAnimationFrame(animate);
      } else {
        // Color transition complete, start zoom
        handleColorTransitionEnd();
      }
    };

    requestAnimationFrame(animate);
  }, [isColorTransitioning]);

  useEffect(() => {
    const handleInteractionStart = () => {
      setIsInteracting(true);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };

    const handleInteractionEnd = () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      interactionTimeoutRef.current = setTimeout(() => {
        setIsInteracting(false);
      }, 500); // Wait 500ms after interaction ends before showing button
    };

    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
      // Ignore if clicking on a button or interactive element
      const target = event.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.closest("button")) {
        return;
      }

      isDraggingRef.current = true;
      handleInteractionStart();
    };

    const handleMouseUp = (event: MouseEvent | TouchEvent) => {
      // Ignore if clicking on a button or interactive element
      const target = event.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.closest("button")) {
        return;
      }

      isDraggingRef.current = false;
      mouseDataRef.current.lastTime = 0;
      handleInteractionEnd();
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

    const handleWheel = () => {
      handleInteractionStart();
      handleInteractionEnd();
    };

    window.addEventListener("mousedown", handleMouseDown as EventListener);
    window.addEventListener("mouseup", handleMouseUp as EventListener);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel, { passive: true });

    window.addEventListener("touchstart", handleMouseDown as EventListener);
    window.addEventListener("touchend", handleMouseUp as EventListener);
    window.addEventListener("touchmove", (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        if (touch)
          handleMouseMove({
            clientX: touch.clientX ? touch.clientX : 0,
            clientY: touch.clientY ? touch.clientY : 0,
            timeStamp: event.timeStamp,
          } as MouseEvent);
      }
    });

    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", (event) => {
        if (event.touches.length > 0) {
          const touch = event.touches[0];
          if (touch)
            handleMouseMove({
              clientX: touch.clientX ? touch.clientX : 0,
              clientY: touch.clientY ? touch.clientY : 0,
              timeStamp: event.timeStamp,
            } as MouseEvent);
        }
      });
    };
  }, []);

  return (
    <>
      <Canvas
        gl={{ alpha: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 200], fov: isMobile ? 100 : 75 }}
        className="z-10 mx-auto h-[90%] w-[90%]"
      >
        {isAnimating && (
          <CameraAnimation onAnimationEnd={handleInitialAnimationEnd} />
        )}

        {isZooming && <ZoomTransition onTransitionEnd={handleZoomEnd} />}

        <ParticleModel
          interactionRef={interactionRef}
          isDraggingRef={isDraggingRef}
          colorTransition={colorTransition}
        />

        {!isAnimating && !isColorTransitioning && !isZooming && (
          <>
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              enableRotate={true}
            />
            <MouseSpeedController
              interactionRef={interactionRef}
              mouseDataRef={mouseDataRef}
            />
            {/* enable scroll zoom only after animation ends */}
            <ScrollZoom
              enabled={!isAnimating && !isColorTransitioning && !isZooming}
            />
            {/* Reset camera to original position when not interacting */}
            <CameraReset
              isInteracting={isInteracting}
              originalPosition={originalCameraPosition.current}
              originalRotation={originalCameraRotation.current}
            />
          </>
        )}

        {!isMobile && (
          <EffectComposer>
            <Bloom
              mipmapBlur
              luminanceThreshold={0.5}
              radius={0.8}
              intensity={0.2}
            />
          </EffectComposer>
        )}

        {/* Track model center position for button placement */}
        {showButton && !isInteracting && (
          <ModelCenterTracker
            onPositionUpdate={(x, y) => setButtonPosition({ x, y })}
          />
        )}
      </Canvas>

      <EnterGridButton
        visible={showButton && !isInteracting}
        onClick={handleEnterGrid}
        position={buttonPosition}
      />
    </>
  );
}
