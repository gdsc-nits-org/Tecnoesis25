"use client";
import Image from "next/image";
import { useState } from "react";

const RegisterButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
<<<<<<< HEAD
      className="relative px-4 py-1 rounded-md text-black font-semibold overflow-hidden cursor-not-allowed group"
=======
      className="group relative cursor-not-allowed overflow-hidden rounded-md px-4 py-1 font-semibold text-black"
>>>>>>> 7fc25aa975b724238871ca830f2162123133f2c8
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute left-[18%] top-1 h-[80%] w-[0.25rem] bg-white transition-all duration-700 ease-in-out ${
          hovered ? "translate-x-[1500%]" : ""
        }`}
        style={{
          transform: hovered
            ? "translateX(8.5rem) skewX(-23deg)"
            : "skewX(-23deg)",
          zIndex: 0,
        }}
      ></div>

      <div className="relative z-10">
        <Image
          src={hovered ? "/RegisterState2.svg" : "/RegisterState1.svg"}
          alt="Registration"
          width={200}
          height={60}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
};

export default RegisterButton;
