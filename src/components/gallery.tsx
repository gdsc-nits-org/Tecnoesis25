// src/components/gallery.tsx

"use client";

import { useState, useRef, MouseEvent, TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { motion, Transition } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";

export default function PhotoGallery() {
  const [isPressed, setIsPressed] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const wasHeld = useRef(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handlePress = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    pressTimer.current = setTimeout(() => {
      setIsPressed(true);
      wasHeld.current = true;
      // if (isMobile && navigator.vibrate) {
      //   navigator.vibrate(50);
      // }
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

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
  };

  const springTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
  };

  const titleVariants = {
    initial: { top: "15%", left: "50%", x: "-50%", scale: 1 },
    pressed: {
      top: isMobile ? "8%" : "8.5%",
      left: isMobile ? "5%" : "14%",
      x: isMobile ? "0%" : "0%",
      scale: isMobile ? 0.85 : 0.8,
    },
  };

  const buttonVariants = {
    initial: {
      top: "75%",
      left: "50%",
      x: "-50%",
      y: "0%",
      scale: 1,
      bottom: "auto",
      right: "auto",
    },
    pressed: {
      top: "auto",
      left: "auto",
      bottom: "12%",
      right: "14%",
      x: "0%",
      y: "0%",
      scale: isMobile ? 0.9 : 0.8,
    },
  };

  return (
    <>
      <div
        className="relative isolate min-h-screen w-full overflow-hidden bg-cover bg-center laptop:scale-110 xL:bg-contain"
        style={{ backgroundImage: "url('/tech.gif')" }}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
        onClickCapture={handleClickCapture}
        onContextMenu={handleContextMenu}
      >
        <motion.div
          className="absolute inset-0 z-0 bg-black"
          initial={false}
          animate={{ opacity: isPressed ? 0.85 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute z-10 select-none space-y-0 text-center"
          initial={false}
          animate={isPressed ? "pressed" : "initial"}
          transition={springTransition}
          variants={titleVariants}
        >
          <motion.div
            initial={false}
            animate={{
              textAlign:
                isMobile && isPressed ? "left" : isPressed ? "left" : "center",
            }}
            transition={{ duration: 0.4 }}
            className="mobile:text-[2.5rem] laptop:text-[2.8rem]"
          >
            <p className="font-nyxerin leading-tight text-[#F40004]">Photo</p>
            <p className="font-nyxerin leading-tight text-[#bb1315]">Gallery</p>
          </motion.div>
        </motion.div>

        <motion.div
          tabIndex={-1}
          onMouseDown={handleButtonInteraction}
          onTouchStart={handleButtonInteraction}
          className="laptop:w-50 group absolute z-10 flex items-center justify-center mobile:h-20 mobile:w-40 tablet:h-28 tablet:w-56 laptop:h-24"
          initial={false}
          animate={isPressed ? "pressed" : "initial"}
          transition={springTransition}
          variants={buttonVariants}
        >
          <Link href="/gallery" aria-label="View photo gallery">
            <CustomButton
              text="View Gallery"
              width={isMobile ? 140 : 200}
              height={isMobile ? 40 : 100}
              fontSize={isMobile ? 14 : 16}
            />
          </Link>
        </motion.div>
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-3/4 max-h-[500px] w-3/4 max-w-[500px] -translate-x-1/2 -translate-y-1/2 laptop:max-h-[600px] laptop:max-w-[600px]"
          initial={false}
          animate={{ opacity: isPressed ? 1 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Image
            src="/easter.svg"
            alt="Centered gallery view"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>
    </>
  );
}
