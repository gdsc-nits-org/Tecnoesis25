"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;    
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_aberrationIntensity;
    float sz = 80.00;
    float len = 40.00;
    float breth = 80.00;
    void main() {
        vec2 gridUV = floor(vUv * vec2(sz, sz)) / vec2(sz, sz);
        vec2 centerOfPixel = gridUV + vec2(1.0/len, 1.0/breth) ;
        
        vec2 mouseDirection = u_mouse - u_prevMouse;
        
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

        vec2 uvOffset = strength * - mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        // Combine the color channels
        vec4 finalColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);

        // Define a small threshold to catch colors very close to black
        float threshold = 0.05;

        // If the sum of RGB values is less than the threshold, it's black
        if (finalColor.r + finalColor.g + finalColor.b < threshold) {
            // Set alpha to 0.0 to make it fully transparent
            finalColor.a = 0.0;
        }

        gl_FragColor = finalColor;
    }
`;

const TecnoesisDesktop = ({ is4k }: { is4k: boolean }) => {
  const initialized = useRef(false);
  const [isResize, setIsResize] = useState(false);

  useEffect(() => {
    const resizeHandler = () => setIsResize((prev) => !prev);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;

    const f = () => {
      const imageContainer = document.getElementById(
        "imageContainer",
      ) as HTMLDivElement;

      if (!imageContainer) return;

      const scene = new THREE.Scene();
      const perspective = 1000;
      const fov =
        (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;
      const camera = new THREE.PerspectiveCamera(fov, 1, 1, 1000);
      camera.position.set(0, 0, 16);

      // ✅ Create video element
      const videoElement = document.createElement("video");
      videoElement.src = "/Tecno_Blue.mp4"; // your video path
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.autoplay = true;
      videoElement.playsInline = true;
      videoElement.crossOrigin = "anonymous";
      videoElement
        .play()
        .catch((err) => console.error("Error playing video:", err));

      // ✅ Create VideoTexture
      const texture = new THREE.VideoTexture(videoElement);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBAFormat;

      const shaderUniforms = {
        u_mouse: { value: new THREE.Vector2() },
        u_prevMouse: { value: new THREE.Vector2() },
        u_aberrationIntensity: { value: 0.0 },
        u_texture: { value: texture },
      };

      const size = is4k ? 40 : 13;
      const planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(size, size),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader,
          fragmentShader,
          transparent: true,
        }),
      );
      scene.add(planeMesh);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        premultipliedAlpha: false,
      });
      renderer.setSize(imageContainer.offsetWidth, imageContainer.offsetHeight);
      imageContainer.appendChild(renderer.domElement);
      renderer.setClearColor(0x000000, 0);

      const mousePosition = new THREE.Vector2(0.5, 0.5);
      const targetMousePosition = new THREE.Vector2(0.5, 0.5);
      const prevPosition = new THREE.Vector2(0.5, 0.5);
      let aberrationIntensity = 1;
      let easeFactor = 1;

      function animateScene() {
        requestAnimationFrame(animateScene);

        mousePosition.lerp(targetMousePosition, easeFactor);

        shaderUniforms.u_mouse.value.copy(mousePosition);
        shaderUniforms.u_prevMouse.value.copy(prevPosition);

        aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
        shaderUniforms.u_aberrationIntensity.value = aberrationIntensity;

        renderer.render(scene, camera);
      }

      function handleMouseMove(event: MouseEvent) {
        easeFactor = 0.02;
        const rect = imageContainer.getBoundingClientRect();
        prevPosition.copy(targetMousePosition);

        targetMousePosition.set(
          (event.clientX - rect.left) / rect.width,
          (event.clientY - rect.top) / rect.height,
        );

        aberrationIntensity = 1;
      }

      function handleMouseEnter(event: MouseEvent) {
        easeFactor = 0.02;
        const rect = imageContainer.getBoundingClientRect();

        mousePosition.set(
          (event.clientX - rect.left) / rect.width,
          (event.clientY - rect.top) / rect.height,
        );
        targetMousePosition.copy(mousePosition);
      }

      function handleMouseLeave() {
        easeFactor = 0.05;
        targetMousePosition.copy(prevPosition);
      }

      animateScene();
      imageContainer.addEventListener("mousemove", handleMouseMove);
      imageContainer.addEventListener("mouseenter", handleMouseEnter);
      imageContainer.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        renderer.dispose();
        scene.clear();
        planeMesh.geometry.dispose();
        (planeMesh.material as THREE.Material).dispose();
        imageContainer.removeChild(renderer.domElement);
      };
    };

    setTimeout(f, 1000);
  }, [is4k, isResize]);

  return (
    <section className="absolute  h-full w-full scale-125 overflow-hidden bg-transparent lg:scale-100">
      <div
        id="imageContainer"
        className="relative mx-auto  flex h-full w-full max-w-full items-center justify-center overflow-hidden bg-transparent"
      />
    </section>
  );
};
const TecnoesisMobile = () => {
  return (
    <div className="flex h-full w-full  justify-center bg-transparent">
      <video
        className="scale-150 mix-blend-screen"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/Tecno_Blue.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

const Tecnoesis = ({
  bigScreen,
  is4k,
}: {
  bigScreen: boolean;
  is4k?: boolean;
}) => {
  if (bigScreen) return <TecnoesisDesktop is4k={is4k ?? false} />;
  return <TecnoesisMobile />;
};
export default Tecnoesis;
