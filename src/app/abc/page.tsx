"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Model from "~/components/Model";
import Countdown from "~/components/Countdown";
import Loader from "~/components/Loader";
import Tecnoesis from "~/components/Tecno";
import { isMobile } from "react-device-detect";

export default function Page() {
  const [showBottomElements, setShowBottomElements] = useState(true);
  const [showTHead, setShowTHead] = useState(false);
  const [isMount, setIsMount] = useState(false);
  useEffect(() => setIsMount(true), []);
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
        <div
          className={`animate-fade-in absolute -top-[50px] left-[50%] z-${isMobile ? 0 : 20} h-80 w-[50vw] -translate-x-[50%] bg-transparent`}
        >
          <Tecnoesis bigScreen={!isMobile} />
        </div>
      )}
      <Loader />
      <Model />
      {showBottomElements && (
        <>
          <div className="animate-fade-in pointer-events-none fixed bottom-0 left-0 right-0 -z-0 flex h-60 w-screen justify-center">
            {isMobile ? (
              <Image
                className="absolute -bottom-8 h-full w-full  scale-150 select-none"
                src="/abc.svg"
                width={300}
                height={100}
                alt="fkadshj"
              />
            ) : (
              <Image
                className="absolute bottom-0 h-full w-full select-none"
                src="/abc.svg"
                width={300}
                height={100}
                alt="fkadshj"
              />
            )}
          </div>
          <div className="animate-fade-in flex flex-col">
            <Countdown />
          </div>
        </>
      )}
    </div>
  );
}
