"use client";
import Image from "next/image";
import { useState } from "react";

const RegisterButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative px-4 py-1 rounded-md text-black font-semibold overflow-hidden cursor-not-allowed group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
        <div
        className={`absolute top-1 left-[18%] h-[80%] w-[0.25rem] bg-white transition-all duration-700 ease-in-out ${
            hovered ? "translate-x-[1500%]" : ""
        }`}
        style={{
            transform: hovered
            ? "translateX(8.5rem) skewX(-23deg)"
            : "skewX(-23deg)",
            zIndex : 0,
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
