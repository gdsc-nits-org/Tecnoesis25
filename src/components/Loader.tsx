"use client";

import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import localFont from "next/font/local";

const tron = localFont({ src: "../../public/tron.ttf" });

export default function Loader() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);

  // Clamp progress to valid range
  const clampedProgress = Math.max(0, Math.min(100, progress || 0));

  // Hide loader when loading is complete
  useEffect(() => {
    if (!active && clampedProgress >= 100) {
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [active, clampedProgress]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-6 transition-opacity duration-500"
      style={{ opacity: !active && clampedProgress >= 100 ? 0 : 1 }}
    >
      <div className="w-full max-w-xl">
        {/* Title */}
        <div
          className={`${tron.className} text-center text-cyan-300 mb-6 select-none text-lg sm:text-xl md:text-2xl tracking-[0.2em]`}
          style={{
            textShadow: "0 0 6px rgba(56,189,248,.6), 0 0 12px rgba(56,189,248,.3)",
          }}
        >
          INTO THE GRID
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 sm:h-4 md:h-5 rounded-full bg-cyan-900/30 overflow-hidden ring-1 ring-cyan-400/40">
          <div
            className="h-full bg-cyan-400 transition-all duration-300 ease-out"
            style={{
              width: `${clampedProgress}%`,
              boxShadow: "0 0 16px rgba(56,189,248,.6)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/10 via-transparent to-cyan-300/10" />
        </div>

        {/* Progress Percentage */}
        <div className={`${tron.className} mt-3 text-center text-cyan-300 text-sm sm:text-base md:text-lg`}>
          {Math.round(clampedProgress)}%
        </div>
      </div>
    </div>
  );
}


