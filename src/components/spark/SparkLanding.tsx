"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type SparkLandingProps = {
  onReady?: () => void;
};

const SparkLanding = ({ onReady }: SparkLandingProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }, // adjust sensitivity
    );

    if (ref.current) observer.observe(ref.current);
    if (onReady) onReady();
    return () => observer.disconnect();
  }, [onReady]);
  return (
    <section
      id="spark"
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(to_bottom,transparent_15%,rgba(0,0,0)),url('https://res.cloudinary.com/dmezugavw/image/upload/v1761399366/SparkBG_womodd.jpg')] bg-cover bg-center text-white"
      onWheel={(e) => {
        if (e.deltaY > 0) {
          const gallery = document.getElementById("about");
          gallery?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <h1
        className={`relative bottom-44 z-10 bg-clip-text text-center font-nyxerin text-transparent duration-1000 ease-out md:bottom-32 ${
          !inView ? "text-8xl md:text-[9rem]" : "text-[4rem] md:text-8xl"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(90deg, #520095 0%, #FFFFFF 44.31%, #6200A9 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "400",
        }}
      >
        SPARK
      </h1>
      <div
        ref={ref}
        className={`absolute z-0 flex w-full select-none items-end justify-center transition-transform duration-700 ease-out md:justify-evenly ${
          inView
            ? "transalte-y-32 scale-[2] md:translate-y-16 md:scale-[1.15]"
            : "translate-y-6 scale-100"
        }`}
        style={{ perspective: "1000px" }}
      >
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399357/9ea5e0244489e06e51c100d06e8ad957cc5e1b87_qsg5rb.jpg"
          alt="Spark Background"
          objectFit="cover"
          className=" hidden h-80 w-40 border border-[#B050FF] object-cover md:block"
          style={{ transform: "rotateY(-35deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399370/feb0c83b471946ea49742add02b119e8a66213b6_rvefoi.gif"
          alt="Spark Background"
          objectFit="cover"
          className="hidden h-96 w-52 border border-[#B050FF] object-cover md:block"
          style={{ transform: "rotateY(70deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399368/9dbf609e4cc522a951f1fc228f4c165d32ca9168_azen50.gif"
          alt="Spark Background"
          objectFit="cover"
          className="hidden h-[15rem] w-5 border border-[#B050FF] object-cover md:block md:h-[30rem] md:w-10"
          style={{ transform: "rotateY(-45deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399383/8ce713b5f4c704eb1238449d18d739ec4c0d6022_ckar1c.gif"
          alt="Spark Background"
          objectFit="cover"
          className="h-[16rem] w-16 border border-[#B050FF] object-cover md:h-[32rem] md:w-32"
          style={{ transform: "rotateY(45deg)" }}
          width={200}
          height={600}
        />
        <div className="flex h-[17rem] w-[9rem] flex-col items-center justify-center border border-[#B050FF77] bg-[url('https://res.cloudinary.com/dmezugavw/image/upload/v1761399357/9ea5e0244489e06e51c100d06e8ad957cc5e1b87_qsg5rb.jpg')] bg-cover bg-center pt-20 font-nyxerin text-4xl md:h-[34rem] md:w-[18rem] md:pt-40 md:text-6xl">
          <h2>18</h2>
          <h2>Jan</h2>
        </div>

        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399383/8ce713b5f4c704eb1238449d18d739ec4c0d6022_ckar1c.gif"
          alt="Spark Background"
          objectFit="cover"
          className="h-[16rem] w-16 border border-[#B050FF] object-cover md:h-[32rem] md:w-32"
          style={{ transform: "rotateY(-45deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399368/9dbf609e4cc522a951f1fc228f4c165d32ca9168_azen50.gif"
          alt="Spark Background"
          objectFit="cover"
          className=" hidden h-[15rem] w-5 border border-dashed border-[#B050FF] object-cover md:block md:h-[30rem] md:w-10"
          style={{ transform: "rotateY(45deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399370/feb0c83b471946ea49742add02b119e8a66213b6_rvefoi.gif"
          alt="Spark Background"
          objectFit="cover"
          className="hidden h-96 w-52 border border-[#B050FF] object-cover md:block"
          style={{ transform: "rotateY(-75deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399357/9ea5e0244489e06e51c100d06e8ad957cc5e1b87_qsg5rb.jpg"
          alt="Spark Background"
          objectFit="cover"
          className=" hidden h-80 w-40 border border-[#B050FF] object-cover md:block "
          style={{ transform: "rotateY(35deg)", objectPosition: "55%" }}
          width={200}
          height={600}
        />
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-[5] transition-transform duration-700 ease-out ${
          inView ? "translate-y-16 scale-[1.03]" : "translate-y-6"
        } 
  
  bg-gradient-to-b from-transparent to-black/95 md:to-black/40`}
        style={{
          // background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 100%)", // <-- Remove this
          transformStyle: "preserve-3d",
        }}
      />
      <div className="absolute bottom-0 h-40 w-screen bg-[url('https://res.cloudinary.com/dmezugavw/image/upload/v1761401229/crowd_aowbu6.png')] bg-contain bg-center md:h-80"></div>
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 h-40 w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.95) 100%)",
        }}
      /> */}
      <button
        aria-label="scroll down"
        onClick={() => {
          const gallery = document.getElementById("about");
          gallery?.scrollIntoView({ behavior: "smooth" });
        }}
        className="md:hidden absolute bottom-8 left-1/2 -translate-y-10 -translate-x-1/2 z-20 font-bankGothik text-2xl tracking-widest text-white bg-transparent rounded-full backdrop-blur-sm"
      >
        Scroll Down
      </button>
    </section>
  );
};

export default SparkLanding;
