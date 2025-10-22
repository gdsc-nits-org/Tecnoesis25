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
    <main
      ref={mainRef}
      className="hide-scrollbar relative flex h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* 🔹 Background GIF */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      >
        <source src="/background.gif" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-nyxerin text-6xl tracking-widest text-white md:text-7xl">
            TECNOESIS
          </h1>
          <h2 className="font-nyxerin text-5xl tracking-widest text-red-600 md:text-6xl">
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
      <div className="absolute right-[7vw] z-10 scale-x-[-1]">
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
        className="absolute bottom-16 left-1/2 z-50 -translate-x-1/2 font-nyxerin tracking-wider text-white"
      >
        <span className="cursor-pointer rounded-full bg-black/60 px-6 py-2 backdrop-blur-sm hover:opacity-90">
          SCROLL UP
        </span>
      </button>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-40 bg-gradient-to-t from-black to-transparent transition-opacity duration-700 ease-out md:h-56 lg:h-72 " />
    </main>
  );
}
