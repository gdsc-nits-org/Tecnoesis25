"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ViewDetailsButton from "~/components/ViewDetailsButton";

export default function ModuleMainDesktop() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden"
      style={{
        backgroundImage: "url('/grid.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-[3]" />

      <div className="absolute inset-0 flex justify-between gap-4 items-center pointer-events-none z-[2]">
        {/* Left SVG */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: -100 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/squares.webp"
            alt="Left Decoration"
            width={650}
            height={650}
            className="-rotate-90"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="min-w-[250px] min-h-[250px]"
        >
          <Image
            src="/Modules/ModuleCenter.svg"
            alt="Center Decoration"
            width={300}
            height={300}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 100 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/squares.webp"
            alt="Right Decoration"
            width={650}
            height={650}
            className="rotate-90"
          />
        </motion.div>
      </div>

      <div className="relative flex flex-col h-[90vh] justify-between items-center z-[3]">
        <div className="z-[20] invisible">
          <ViewDetailsButton href="/modules/details" ariaLabel="View details" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[3rem] sm:text-[2rem] lg:text-[3.5rem] font-nyxerin tracking-widest"
        >
          MODULES
        </motion.h1>

  
        <div className="z-[20]">
          <ViewDetailsButton href="/modules/details" ariaLabel="View details" />
        </div>
      </div>
    </section>
  );
}
