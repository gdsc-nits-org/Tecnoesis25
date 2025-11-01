// Lenis smooth scroll initialization for Next.js app
// This file sets up Lenis and exports a React component to wrap the app
'use client';
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Use duration and a spring-like easing for springy smooth scroll
      duration: 1.2, // seconds, adjust for more/less spring
      easing: (t: number) => 1 - Math.pow(2, -10 * t), // spring-like ease-out
      gestureOrientation: "vertical",
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}
