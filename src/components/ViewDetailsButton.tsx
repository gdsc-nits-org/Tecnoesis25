"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Transition } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";

interface ViewDetailsButtonProps {
  href: string;
  ariaLabel: string;
  className?: string;
}

export default function ViewDetailsButton({
  href,
  ariaLabel,
  className = "",
}: ViewDetailsButtonProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const springTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
  };

  const buttonVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: isMobile ? 1.05 : 1.1,
    },
  };

  return (
    <Link href={href} aria-label={ariaLabel} className={`inline-block ${className}`}>
      <motion.div
        tabIndex={-1}
        className="group relative flex h-20 w-40 items-center justify-center tablet:h-28 tablet:w-56 laptop:h-24 laptop:w-50"
        initial="initial"
        whileHover="hover"
        transition={springTransition}
        variants={buttonVariants}
      >
        <Image
          src="/view1.png"
          alt="View details background"
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src="/view2.svg"
          alt="View details background hovered"
          fill
          className="object-cover opacity-0 transition-all duration-300 group-hover:scale-[1.1] group-hover:opacity-100"
        />
      </motion.div>
    </Link>
  );
}