"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Model from "~/components/VideoObj";
import Countdown from "~/components/Countdown";
import Loader from "~/components/Loader";
import Tecnoesis from "~/components/Tecno";

export default function Page() {
  const [showBottomElements, setShowBottomElements] = useState(false);
  const [showTHead, setShowTHead] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBottomElements(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-black">
      {showBottomElements && (
        <div className="absolute animate-fade-in z-20 left-[50%] h-80 w-[50vw] -translate-x-[50%] bg-transparent -top-[50px]">
          <Tecnoesis bigScreen={true} />
        </div>
      )}
      <Loader />
      <Model />
      {showBottomElements && (
        <>
          <div className="animate-fade-in pointer-events-none fixed bottom-0 left-0 right-0 z-20 h-60 w-screen">
            <Image
              className="absolute bottom-0 h-full w-full select-none"
              src="/abc.svg"
              width={300}
              height={100}
              alt="fkadshj"
            />
          </div>
          <div className="animate-fade-in">
            <Countdown />
          </div>
        </>
      )}
    </div>
  );
}