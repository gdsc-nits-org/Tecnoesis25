"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";

type SparkAboutProps = {
  onReady?: () => void;
};

const SparkAbout = ({ onReady }: SparkAboutProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 5; // Max 10deg tilt
    const rotateY = ((x - centerX) / centerX) * -5;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "rotateX(0deg) rotateY(0deg)";
  };
  useEffect(() => {
    if (onReady) onReady();
  }, [onReady]);
  return (
    <section
      id="about"
      className="flex min-h-screen w-screen flex-col items-center overflow-hidden bg-[url('https://res.cloudinary.com/dmezugavw/image/upload/v1761722383/grid_1_ovy88p.png')] px-[5vw] pb-20 text-white md:flex-row md:pb-0"
      style={{ perspective: "1000px" }}
    >
      <div className="max-w-4xl p-8 md:w-[35vw]">
        <div
          className={`ease-out" relative z-10 bg-clip-text text-center  font-nyxerin text-transparent duration-1000 md:text-start
       `}
          style={{
            backgroundImage:
              "linear-gradient(90deg, #520095 0%, #B46EFF 44.31%, #6200A9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "400",
          }}
        >
          <p className="mt-7 text-[3rem] md:mt-0 md:text-[3vw]">About</p>
          <p className="-mt-7 text-[4.5rem] md:-mt-[1.8vw] md:text-[5vw]">
            SPARK
          </p>
        </div>
        <p className="mb-4 text-center font-bankGothik text-lg md:text-start md:text-[1.1vw]">
          Tecnoesis is the annual techno-managerial event of NIT Silchar,
          promising all tech geeks the ideal niche of fascinating events,
          workshops, competitions and interactions worth a lifetime.{" "}
        </p>
      </div>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-grow items-center justify-center font-nyxerin text-[2vw] md:text-[1vw]"
        style={{transformStyle:"preserve-3d"}}
      >
        <div className="absolute right-[1%] top-[2.5%] flex h-[95%] w-[75%] items-center justify-center bg-[url('https://res.cloudinary.com/dmezugavw/image/upload/v1761721543/dexbg_y9ra4l.svg')] bg-cover bg-center md:right-[14%] md:w-[56.2%]">
          <div className="mid-right-anim absolute right-[1%] h-[91%] w-[74%] rounded-l-xl bg-black" />
          <Image
            src="https://res.cloudinary.com/dmezugavw/image/upload/v1761721544/seedhe_ezxlpx.svg"
            alt="About Spark"
            width={800}
            height={800}
            className="mid-right-more-anim relative top-[-3%] z-0 aspect-square h-[100%] object-contain"
          />
        </div>
        <div className="relative flex aspect-square h-[80vw] flex-col items-end justify-between bg-[url('https://res.cloudinary.com/dmezugavw/image/upload/v1761723060/styleabout_vmwbud.svg')] bg-cover bg-center md:h-[40vw]">
          <Image
            src="https://res.cloudinary.com/dmezugavw/image/upload/v1761721543/sparkt_noj7v7.svg"
            alt="About Spark"
            width={500}
            height={500}
            className="spark-top-anim relative bottom-[1%] h-auto w-2/3 object-contain"
          />
          <Image
            src="https://res.cloudinary.com/dmezugavw/image/upload/v1761721543/sparkb_ilxthg.svg"
            alt="About Spark"
            width={500}
            height={500}
            className="spark-bot-anim relative top-[1%] h-auto w-2/3 object-contain"
          />
          <Image
            src="https://res.cloudinary.com/dmezugavw/image/upload/v1761721544/maut_nptczq.gif"
            alt="About Spark"
            width={1000}
            height={1000}
            unoptimized
            className="absolute left-[1.1%] top-[17%] h-auto w-[42%]"
          />
          <p className="text-glow-anim absolute left-[7.5%] top-[6%]">
            tecnoesis
          </p>
          <p className="text-glow-anim absolute left-[8%] top-[50%] text-[#AEB4BE] drop-shadow-[1px_2px_2px_#000000] backdrop-contrast-100">
            into the grid
          </p>
          <p className="text-glow-anim absolute bottom-[23.5%] left-[34.5%] rotate-[270deg] text-[1.6vw] md:text-[0.8vw]">
            spark
          </p>
          <p className="text-glow-anim absolute bottom-[21%] left-[48%] text-[3.3vw] md:text-[1.65vw]">
            spark
          </p>
          <p className="text-glow-anim absolute bottom-[17%] left-[73%] text-[3.6vw] md:text-[1.8vw]">
            night
          </p>
        </div>
      </div>
    </section>
  );
};

export default SparkAbout;
