// ...existing code...
"use client";

import Image from "next/image";
import Bars from "./Bars";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  // resolve the "next" element only after everything mounts/loads
  useEffect(() => {
    const resolveNext = () => {
      const el = document.getElementById("fu");
      setNextEl(el);
    };

    if (document.readyState === "complete") {
      // all resources already loaded
      resolveNext();
    } else {
      // wait for full load (images, video, etc.)
      window.addEventListener("load", resolveNext, { once: true });
      // fallback: also try shortly after mount in case load doesn't fire
      const t = setTimeout(resolveNext, 500);
      return () => {
        clearTimeout(t);
        window.removeEventListener("load", resolveNext);
      };
    }
  }, []);

  const scrollToNextSection = () => {
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback: scroll one viewport height
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <main ref={mainRef} className="relative flex items-center justify-center h-screen overflow-hidden bg-black hide-scrollbar">
      {/* 🔹 Background GIF */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      >
        <source src="/background.gif" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-4">
          <h1 className="text-white text-6xl md:text-7xl tracking-widest font-nyxerin">
            TECNOESIS
          </h1>
          <h2 className="text-red-600 text-5xl md:text-6xl font-nyxerin tracking-widest">
            PHOTO GALLERY
          </h2>
        </div>
      </div>

      <Bars className="z-20" imageUrl={""} />

      {/* 🔹 Robotic Hands */}
      <div className="absolute left-[7vw] z-10">
        <Image
          src="/hand.png"
          alt="Left robotic hand"
          width={600}
          height={600}
          className="opacity-90"
        />
      </div>
      <div className="absolute right-[7vw] scale-x-[-1] z-10">
        <Image
          src="/hand.png"
          alt="Right robotic hand"
          width={600}
          height={600}
          className="opacity-90"
        />
      </div>

      {/* Optional glowing center shape overlay */}
      <div className="absolute z-0">
        <Image
          src="/starseed-starseeds.gif"
          alt="Center glow"
          width={600}
          height={600}
          unoptimized
          className="opacity-80 mix-blend-screen"
        />
      </div>

      <button
        onClick={scrollToNextSection}
        aria-label="Scroll to next section"
        className="absolute left-1/2 bottom-16 -translate-x-1/2 z-50 text-white tracking-wider font-nyxerin"
      >
        <span className="bg-black/60 backdrop-blur-sm px-6 py-2 rounded-full cursor-pointer hover:opacity-90">
          SCROLL UP
        </span>
      </button>

      <div
        className="absolute left-0 right-0 bottom-0 h-40 md:h-56 lg:h-72 bg-gradient-to-t from-black to-transparent pointer-events-none transition-opacity duration-700 ease-out z-30 "
      />
    </main>
  );
}