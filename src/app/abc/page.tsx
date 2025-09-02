"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Model from "~/components/VideoObj";
import BgmButton from "~/components/BgmButton";

export default function Page() {
  // const [isAnimating, setIsAnimating] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsAnimating(false);
  //   }, 10000);
  // }, []);

  return (
    <div className="h-screen w-screen">
      <BgmButton/>
      {/* <Model />
      <div
        className="animate-fade-in absolute bottom-0 h-60 w-screen transition-transform delay-1000"
        style={{ transform: "-translateY(10rem)" }}
      >
        <Image
          className="absolute bottom-0 h-full w-full select-none"
          src="/abc.svg"
          width={300}
          height={100}
          alt="fkadshj"
        />
      </div> */}
    </div>
  );
}
