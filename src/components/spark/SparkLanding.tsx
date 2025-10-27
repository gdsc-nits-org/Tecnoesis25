"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const SparkLanding = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry) setInView(entry.isIntersecting); },
      { threshold: 0.3 } // adjust sensitivity
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      id="spark"
      className="relative overflow-hidden flex h-screen flex-col items-center bg-center justify-center bg-[linear-gradient(to_bottom,transparent_20%,rgba(0,0,0)),url('https://res.cloudinary.com/dmezugavw/image/upload/v1761399366/SparkBG_womodd.jpg')] bg-cover text-white"
      onWheel={(e) => {
        if (e.deltaY > 0) {
          const gallery = document.getElementById("gallery");
          gallery?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <h1
        className={`relative bottom-32 z-10 bg-clip-text text-center font-nyxerin text-transparent duration-1000 ease-out ${
          !inView ? "text-6xl md:text-[9rem]" : "text-7xl md:text-8xl"
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
        className={`absolute z-0 flex w-full select-none items-end justify-center md:justify-evenly transition-transform duration-700 ease-out ${
          inView ? "scale-[1.6] md:scale-[1.15] translate-y-16" : "scale-100 translate-y-6"
        }`}
        style={{ perspective: "1000px" }}
      >
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399357/9ea5e0244489e06e51c100d06e8ad957cc5e1b87_qsg5rb.jpg"
          alt="Spark Background"
          objectFit="cover"
          className=" hidden md:block h-80 w-40 border border-[#B050FF] object-cover"
          style={{ transform: "rotateY(-35deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399370/feb0c83b471946ea49742add02b119e8a66213b6_rvefoi.gif"
          alt="Spark Background"
          objectFit="cover"
          className="hidden md:block h-96 w-52 border border-[#B050FF] object-cover"
          style={{ transform: "rotateY(70deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399368/9dbf609e4cc522a951f1fc228f4c165d32ca9168_azen50.gif"
          alt="Spark Background"
          objectFit="cover"
          className="hidden md:block h-[15rem] w-5 md:h-[30rem] md:w-10 border border-[#B050FF] object-cover"
          style={{ transform: "rotateY(-45deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399383/8ce713b5f4c704eb1238449d18d739ec4c0d6022_ckar1c.gif"
          alt="Spark Background"
          objectFit="cover"
          className="h-[16rem] w-16 md:h-[32rem] md:w-32 border border-[#B050FF] object-cover"
          style={{ transform: "rotateY(45deg)" }}
          width={200}
          height={600}
        />
        <div className="h-[17rem] w-[9rem] md:h-[34rem] md:w-[18rem] pt-20 md:pt-40 font-nyxerin text-4xl md:text-6xl flex flex-col items-center justify-center border border-[#B050FF] bg-[url('https://res.cloudinary.com/dmezugavw/image/upload/v1761399357/9ea5e0244489e06e51c100d06e8ad957cc5e1b87_qsg5rb.jpg')] bg-cover bg-center">
          <h2>23</h2><h2>NOV</h2>
        </div>

        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399383/8ce713b5f4c704eb1238449d18d739ec4c0d6022_ckar1c.gif"
          alt="Spark Background"
          objectFit="cover"
          className="h-[16rem] w-16 md:h-[32rem] md:w-32 border border-[#B050FF] object-cover"
          style={{ transform: "rotateY(-45deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399368/9dbf609e4cc522a951f1fc228f4c165d32ca9168_azen50.gif"
          alt="Spark Background"
          objectFit="cover"
          className=" hidden md:block h-[15rem] w-5 md:h-[30rem] md:w-10 border border-[#B050FF] object-cover"
          style={{ transform: "rotateY(45deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399370/feb0c83b471946ea49742add02b119e8a66213b6_rvefoi.gif"
          alt="Spark Background"
          objectFit="cover"
          className="hidden md:block h-96 w-52 border border-[#B050FF] object-cover"
          style={{ transform: "rotateY(-75deg)" }}
          width={200}
          height={600}
        />
        <Image
          src="https://res.cloudinary.com/dmezugavw/image/upload/v1761399357/9ea5e0244489e06e51c100d06e8ad957cc5e1b87_qsg5rb.jpg"
          alt="Spark Background"
          objectFit="cover"
          className=" hidden md:block h-80 w-40 border border-[#B050FF] object-cover "
          style={{ transform: "rotateY(35deg)", objectPosition: "55%" }}
          width={200}
          height={600}
        />
      </div>
      <div className="absolute bottom-44 w-screen h-40 md:h-0 bg-[url('https://res.cloudinary.com/dmezugavw/image/upload/v1761401229/crowd_aowbu6.png')] bg-contain bg-center"></div>
      <div className="absolute bottom-36 w-screen h-40 md:h-0 bg-[url('https://res.cloudinary.com/dmezugavw/image/upload/v1761401229/crowd_aowbu6.png')] bg-contain bg-center"></div>
      <div className="absolute bottom-0 w-screen h-40 md:h-80 bg-[url('https://res.cloudinary.com/dmezugavw/image/upload/v1761401229/crowd_aowbu6.png')] bg-contain bg-center"></div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 h-40 w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.95) 100%)",
        }}
      />
    </section>
  );
};

export default SparkLanding;
