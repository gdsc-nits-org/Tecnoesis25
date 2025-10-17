// src/components/gallery.tsx

"use client";

import { useState, useRef, MouseEvent, TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Transition } from "framer-motion";

export default function PhotoGallery() {
  const [isPressed, setIsPressed] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const wasHeld = useRef(false);

  const handlePress = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    pressTimer.current = setTimeout(() => {
      setIsPressed(true);
      wasHeld.current = true;
    }, 250);
  };

  const handleRelease = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    setIsPressed(false);
  };

  const handleClickCapture = (event: MouseEvent | TouchEvent) => {
    if (wasHeld.current) {
      event.stopPropagation();
      wasHeld.current = false;
    }
  };

  const handleButtonInteraction = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation();
  };

  const springTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
  };

  return (
    <>
      <div
        className="relative min-h-screen w-full overflow-hidden laptop:scale-110 bg-center bg-cover xL:bg-contain"
        style={{ backgroundImage: "url('/tech.gif')" }}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
        onClickCapture={handleClickCapture}
      >
        {/* "Photo Gallery" Title */}
        <motion.div
          className="absolute space-y-0 text-center select-none"
          // 1. FIX: Add initial={false} to prevent animation on page load
          initial={false}
          animate={isPressed ? "pressed" : "initial"}
          transition={springTransition}
          variants={{
            initial: { top: "15%", left: "50%", x: "-50%", scale: 1 },
            pressed: { top: "5%", left: "5%", x: "0%", scale: 0.6 },
          }}
        >
          <motion.div
            initial={false}
            animate={{ textAlign: isPressed ? "left" : "center" }}
            transition={{ duration: 0.4 }}
            className="mobile:text-[2.5rem] laptop:text-[2.8rem]"
          >
            <p className="font-nyxerin leading-tight text-[#F40004]">Photo</p>
            <p className="font-nyxerin leading-tight text-[#bb1315]">Gallery</p>
          </motion.div>
        </motion.div>

        {/* "View Details" button */}
        <motion.div
          tabIndex={-1}
          onMouseDown={handleButtonInteraction}
          onTouchStart={handleButtonInteraction}
          className="group absolute flex items-center justify-center mobile:h-20 mobile:w-40 tablet:h-28 tablet:w-56 laptop:h-24 laptop:w-50"
          // FIX: Add initial={false} here too
          initial={false}
          animate={isPressed ? "pressed" : "initial"}
          transition={springTransition}
          variants={{
            // 2. FIX: Define all animated properties in the initial state
            initial: {
              top: "75%",
              left: "50%",
              x: "-50%",
              y: "0%",
              scale: 1,
              // Add these to give Framer Motion a clear starting point
              bottom: "auto",
              right: "auto",
            },
            pressed: {
              top: "auto",
              left: "auto",
              bottom: "7%",
              right: "8%",
              x: "0%",
              y: "0%",
              scale: 0.8,
            },
          }}
        >
          <Link href="/gallery" className="absolute inset-0 z-10" aria-label="View photo gallery" />

          <Image
            src="/view1.png"
            alt="View details background"
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src="/view2.png"
            alt="View details background hovered"
            fill
            className="object-cover opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.1]"
          />
        </motion.div>

        {/* Center Image */}
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 h-3/4 w-3/4 max-h-[500px] max-w-[500px] -translate-x-1/2 -translate-y-1/2"
          initial={false}
          animate={{ opacity: isPressed ? 1 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Image
            src="/view.png"
            alt="Centered gallery view"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>
    </>
  );
}