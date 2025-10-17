import React, { useRef, useLayoutEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { easing } from "maath";

// Extend THREE with ShaderMaterial so it can be used declaratively
extend({ ShaderMaterial: THREE.ShaderMaterial });

// Define the structure of the GLTF result for TypeScript
type GLTFResult = GLTF & {
  nodes: {
    Curve: THREE.Mesh;
    Curve001: THREE.Mesh;
    Curve002: THREE.Mesh;
    Curve003: THREE.Mesh;
    Curve004: THREE.Mesh;
    Curve005: THREE.Mesh;
    Curve006: THREE.Mesh;
    Curve007: THREE.Mesh;
    Curve008: THREE.Mesh;
    Curve009: THREE.Mesh;
  };
  materials: {
    SVGMat: THREE.Material; // We won't use this directly for the Tron effect, but it's still present
  };
};

// --- Custom Tron Shader Material ---
// Vertex Shader is unchanged
const tronVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vViewPosition = -worldPosition.xyz; // View vector in world space
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader: SIMPLIFIED to only render the glossy black base
const tronFragmentShader = `
  uniform vec3 baseColor;
  uniform float shininess;
  uniform float smoothness;

  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    // Base glossy material (simplified Phong-like)
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Basic specular highlight for the glossy black effect
    vec3 lightDir = normalize(vec3(0.0, 0.0, 1.0)); // Simple directional light for highlights
    vec3 halfVector = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfVector), 0.0), shininess);
    
    // Final color is just the base plus the highlight
    vec3 finalColor = baseColor + (spec * smoothness);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// A helper component to handle the animation for a single mesh.
type AnimatedMeshProps = {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  rotation: [number, number, number];
  groupRef: React.RefObject<THREE.Group>;
  displacement?: number;
  intensity?: number;
};

function AnimatedMesh({
  geometry,
  position,
  rotation,
  groupRef,
  displacement = 15,
  intensity = 0.2,
}: AnimatedMeshProps) {
  const animatedGroupRef = useRef<THREE.Group>(null!);

  const originalPosition = useRef(new THREE.Vector3()).current;
  const dir = new THREE.Vector3();
  const worldCursor = new THREE.Vector3();
  const localCursor = new THREE.Vector3();

  // Uniforms for the SOLID shader
  const solidUniforms = useMemo(
    () => ({
      baseColor: { value: new THREE.Color(0x0a0a0d) },
      shininess: { value: 60.0 },
      smoothness: { value: 0.8 },
    }),
    [],
  );

  // An HDR color for the wireframe to make it glow with Bloom
  const wireframeColor = useMemo(
    () => new THREE.Color(0xff0000).multiplyScalar(20),
    [],
  );

  // A random seed for each mesh to make its movement unique
  const randomSeed = useMemo(() => Math.random() * 100, []);

  // Create a new geometry that only contains the sharp edges
  const edges = useMemo(
    () => new THREE.EdgesGeometry(geometry, 15),
    [geometry],
  );

  useLayoutEffect(() => {
    originalPosition.set(...position);
  }, [position, originalPosition]);

  useFrame(({ pointer, camera, clock }, delta) => {
    if (!animatedGroupRef.current || !groupRef.current) return;
    animatedGroupRef.current.rotation.z =
      Math.sin(clock.getElapsedTime()) * 0.5;

    // --- Cursor Repulsion Logic (unchanged) ---
    worldCursor.set(pointer.x, pointer.y, 0.5).unproject(camera);
    dir.copy(worldCursor).sub(camera.position).normalize();
    worldCursor.add(dir.multiplyScalar(camera.position.length()));

    const parentMatrixInverse = groupRef.current.matrixWorld.clone().invert();
    localCursor.copy(worldCursor).applyMatrix4(parentMatrixInverse);

    const dist = originalPosition.distanceTo(localCursor);
    dir.copy(originalPosition).sub(localCursor).normalize();

    const distInv = displacement - dist;

    // --- Calculate Target Position ---
    const targetPosition = new THREE.Vector3();

    // If cursor is far, target is the original position. If close, it's pushed away.
    if (dist > displacement) {
      targetPosition.copy(originalPosition);
    } else {
      targetPosition
        .copy(originalPosition)
        .add(dir.multiplyScalar(distInv * intensity));
    }

    // --- Add Slight Random Movement ---
    const time = clock.getElapsedTime();
    const movementSpeed = 0.5;
    const movementAmplitude = 0.35;
    targetPosition.x +=
      Math.sin(time * movementSpeed + randomSeed) * movementAmplitude;
    targetPosition.y +=
      Math.cos(time * movementSpeed + randomSeed * 1.1) * movementAmplitude;
    targetPosition.z +=
      Math.sin(time * movementSpeed * 0.9 + randomSeed) * movementAmplitude;

    // --- Animate to Target ---
    easing.damp3(animatedGroupRef.current.position, targetPosition, 0.1, delta);
  });

  return (
    <group ref={animatedGroupRef} position={position} rotation={rotation}>
      {/* 1. The solid glossy black mesh */}
      <mesh geometry={geometry}>
        <shaderMaterial
          attach="material"
          args={[
            {
              uniforms: solidUniforms,
              vertexShader: tronVertexShader,
              fragmentShader: tronFragmentShader,
            },
          ]}
        />
      </mesh>
      {/* 2. The glowing red edges on top */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={wireframeColor} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

export default function SolidModel() {
  const { nodes, materials } = useGLTF(
    "/landing/Tecno_logo.glb",
  ) as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group>(null!);

  const meshData = [
    { name: "Curve", node: nodes.Curve },
    { name: "Curve001", node: nodes.Curve001 },
    { name: "Curve002", node: nodes.Curve002 },
    { name: "Curve003", node: nodes.Curve003 },
    { name: "Curve004", node: nodes.Curve004 },
    { name: "Curve005", node: nodes.Curve005 },
    { name: "Curve006", node: nodes.Curve006 },
    { name: "Curve007", node: nodes.Curve007 },
    { name: "Curve008", node: nodes.Curve008 },
    { name: "Curve009", node: nodes.Curve009 },
  ];

  return (
    <group ref={groupRef} dispose={null}>
      {meshData.map(({ name, node }) => (
        <AnimatedMesh
          key={name}
          geometry={node.geometry}
          position={node.position.toArray() as [number, number, number]}
          rotation={
            node.rotation.toArray().slice(0, 3) as [number, number, number]
          }
          groupRef={groupRef}
          displacement={8}
          intensity={0.2}
        />
      ))}
    </group>
  );
}

useGLTF.preload("/landing/Tecno_logo.glb");
