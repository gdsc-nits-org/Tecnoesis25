"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CongratsPopupProps {
  eventName: string;
  members?: { name: string; tag: string; image?: string }[];
  onClose?: () => void;
}

const CongratsPopup: React.FC<CongratsPopupProps> = ({
  eventName,
  members = [],
  onClose,
}) => {
  const [isPhone, setIsPhone] = useState(false);
  const [isIpad, setIsIpad] = useState(false);
  const [isLap, setIsLap] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      setIsPhone(width >= 320 && width <= 758);
      setIsIpad(width >= 759 && width <= 1300);
      setIsLap(width >= 1301);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* =============== 💻 LAPTOP VIEW =============== */}
{isLap && (
  <div className="fixed inset-0 bg-black/60 saturate-20 flex items-center justify-center z-[99] ">
    <div className="absolute top-[25vh] h-[50vh] w-[50vw] bg-black aspect-[16/9] flex flex-col items-center justify-between overflow-hidden">
      {/* Borders */}
      <div className="absolute top-0 left-0 w-full">
        <Image
          src="/TeamDetails/bordertop.svg"
          alt="Border Top"
          width={900}
          height={100}
          className="object-contain w-full h-[5vh]"
        />
        <Image
          src="/TeamDetails/missingborder1.svg"
          alt="Border Addon"
          width={900}
          height={100}
          className="object-contain w-[4vw] h-[6vh] absolute left-[16.2vw] bottom-0"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <Image
          src="/TeamDetails/borderbottom.svg"
          alt="Border Bottom"
          width={900}
          height={100}
          className="object-contain w-full h-[5vh]"
        />
        <Image
          src="/TeamDetails/missingborder2.svg"
          alt="Border Addon"
          width={900}
          height={100}
          className="object-contain w-[4vw] h-[6vh] absolute -bottom-[1vh] left-[30vw]"
        />
      </div>

      {/* Content */}
      <div className="relative top-[25vh] z-10 flex flex-col items-center text-center text-white px-[2vw] py-[2vh]">
        <Image
          src="/TeamDetails/congratulations.svg"
          alt="Congratulations"
          width={400}
          height={100}
          className="mb-[2vh] w-[27vw] h-[4vh]"
        />
        <Image
          src="/TeamDetails/message.svg"
          alt="Message"
          width={500}
          height={50}
          className="mb-[1vh] w-[28vw] h-[4vh]"
        />
        <span className="text-[1vw] font-bankGothik tracking-wider uppercase">
          <span className="text-[1.4vw]">E</span>VENT{" "}
          <span className="text-[1.4vw]">N</span>AME
        </span>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-12 text-2xl text-transparent"
        >
          ✕
        </button>
      )}
    </div>
  </div>
)}

{/* =============== 📱 PHONE VIEW =============== */}
{isPhone && (
  <div className="fixed inset-0 bg-transparent/20 flex items-center justify-center z-[99] ">
    <div className="absolute top-[25vh] h-[40vh] w-[90vw] bg-transparent/30 opacity-100 flex flex-col items-center justify-between overflow-hidden">
      {/* Borders */}
      <div className="absolute top-0 left-0 w-full">
        <Image
          src="/TeamDetails/bordertop.svg"
          alt="Border Top"
          width={700}
          height={70}
          className="object-contain w-full h-[4vh]"
        />
        <Image
          src="/TeamDetails/missingborder1.svg"
          alt="Border Addon"
          width={900}
          height={100}
          className="object-contain w-[10vw] h-[6vh] absolute left-[25.3vw] -top-[1.2vh]"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <Image
          src="/TeamDetails/borderbottom.svg"
          alt="Border Bottom"
          width={700}
          height={70}
          className="object-contain w-full h-[4vh]"
        />
        <Image
          src="/TeamDetails/missingborder2.svg"
          alt="Border Addon"
          width={900}
          height={100}
          className="object-contain w-[10vw] h-[6vh] absolute left-[55vw] -bottom-[1.2vh]"
        />
      </div>

      {/* Content */}
      <div className="absolute top-[21vh] z-10 flex flex-col gap-[4vh] items-center text-center text-white">
        <Image
          src="/TeamDetails/congratulations.svg"
          alt="Congratulations"
          width={250}
          height={70}
          className="w-[70vw] h-[6vh]"
        />
        <Image
          src="/TeamDetails/messagemobile.svg"
          alt="Message"
          width={300}
          height={40}
          className="absolute top-[2vh] mb-[1vh] w-[55vw] h-[12vh]"
        />
        <span className="text-[5vw] font-bankGothik tracking-wider uppercase">
          <span className="text-[6vw]">E</span>VENT{" "}
          <span className="text-[6vw]">N</span>AME
        </span>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-0 text-3xl text-transparent"
        >
          ✕
        </button>
      )}
    </div>
  </div>
)}

{/* =============== 💻📱 IPAD VIEW =============== */}
{isIpad && (
  <div className="fixed inset-0 bg-transparent/50 flex items-center justify-center z-[99] ">
    <div className="absolute top-[25vh] h-[40vh] w-[85vw] bg-transparent/30 opacity-100 flex flex-col items-center justify-between overflow-hidden">
      {/* Borders */}
      <div className="absolute top-0 left-0 w-full">
        <Image
          src="/TeamDetails/bordertop.svg"
          alt="Border Top"
          width={700}
          height={70}
          className="object-contain w-full h-[4vh]"
        />
        <Image
          src="/TeamDetails/missingborder1.svg"
          alt="Border Addon"
          width={900}
          height={100}
          className="object-contain w-[9vw] h-[6vh] absolute left-[24.4vw] -top-[1.3vh]"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <Image
          src="/TeamDetails/borderbottom.svg"
          alt="Border Bottom"
          width={700}
          height={70}
          className="object-contain w-full h-[4vh]"
        />
        <Image
          src="/TeamDetails/missingborder2.svg"
          alt="Border Addon"
          width={900}
          height={100}
          className="object-contain w-[9vw] h-[6vh] absolute left-[52vw] -bottom-[1.4vh]"
        />
      </div>

      {/* Content */}
      <div className="absolute top-[21vh] z-10 flex flex-col gap-[4vh] items-center text-center text-white">
        <Image
          src="/TeamDetails/congratulations.svg"
          alt="Congratulations"
          width={250}
          height={70}
          className="w-[60vw] h-[6vh]"
        />
        <Image
          src="/TeamDetails/messagemobile.svg"
          alt="Message"
          width={300}
          height={40}
          className="absolute top-[2vh] mb-[1vh] w-[45vw] h-[12vh]"
        />
        <span className="text-[4vw] font-bankGothik tracking-wider uppercase">
          <span className="text-[5vw]">E</span>VENT{" "}
          <span className="text-[5vw]">N</span>AME
        </span>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 -right-4 text-7xl text-transparent"
        >
          ✕
        </button>
      )}
    </div>
  </div>
)}
</>
)

}

export default CongratsPopup;
