"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ViewDetailsButton from "~/components/ViewDetailsButton";

export default function ModuleMainMobile() {
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-[3]" />

      <div className="absolute inset-0 flex flex-col justify-center  items-center pointer-events-none z-[2]">
        <motion.div
          initial={{ opacity: 0, y: -120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/squares.webp"
            alt="Left Decoration"
            width={300}
            height={300}
            className="rotate-0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Image
            src="/Modules/ModuleCenter.svg"
            alt="Center Decoration"
            width={200}
            height={200}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/squares.webp"
            alt="Right Decoration"
            width={300}
            height={300}
            className="rotate-180"
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
          className="text-[2rem] font-nyxerin tracking-widest"
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
