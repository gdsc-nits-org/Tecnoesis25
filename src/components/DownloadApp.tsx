"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const DownloadApp: React.FC = () => {
  const [isPhone, setIsPhone] = useState(false);
  const [isIpad, setIsIpad] = useState(false);
  const [isLap, setIsLap] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const resizeFunc = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      setIsPhone(width >= 320 && width <= 450);
      setIsIpad(width >= 451 && width <= 1300);
      setIsLap(width >= 1301);
    };

    resizeFunc();
    window.addEventListener("resize", resizeFunc);
    return () => window.removeEventListener("resize", resizeFunc);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {/* LAPTOP / DESKTOP VIEW */}
      {isLap && (
        <section className="w-full min-h-screen bg-black text-white flex flex-col xl:flex-row items-center justify-center px-[0.5vw] xl:px-[1.8vw] py-[1.3vh] relative overflow-hidden">
          {/* Background image */}
          <div className="absolute top-[4vh] xl:top-[3vh] xl:left-[6vw] w-full xl:w-[90%] h-[45%] lg:h-[50%] xl:h-[100vh] xl:z-2 xl:p-[1.2vw]">
            <Image
              src="/DownloadApp1.png"
              alt="Background pattern"
              width={1920}
              height={1080}
              className="object-cover w-[100vw] h-[100vh] opacity-100"
            />
          </div>

          {/* LEFT CONTENT */}
          <div className="flex-1 flex flex-col items-center xl:items-start text-left xl:text-left z-10 ml-[1.5vw] mt-[5vh] top-[8.3vh] xl:top-0 xl:gap-[5vh] lg:gap-[43.8vh]">
            

            <div className="flex flex-col items-center xl:items-start gap-[2.5vh]">
              <Image
                src="/DownloadApp2.png"
                alt="Download text"
                width={375}
                height={80}
                className="xl:mb-[1vh] w-[27vw] h-[5vh]"
              />
              <Image
                src="/DownloadApp3.png"
                alt="The App text"
                width={290}
                height={80}
                className=" w-[21vw] h-[5vh]"
              />
            </div>

            
            <div className="flex flex-col gap-[2.5vh] xl:gap-[2vh] overflow-visible">
              {/* Google Play */}
              <a
                href="#"
                className="flex items-center gap-[0.2vw] w-[11.1vw] bg-black text-white/90 pl-[1vw] pr-[1vw] pt-[0.3vh] pb-[1vh] border border-[#8875D9]"
              >
                <Image
                  src="/DownloadApp4.png"
                  alt="Google Play Icon"
                  width={25}
                  height={25}
                  className="translate-y-[1.1vh] w-[1.7vw] h-[3.8vh]"
                />
                <div className="flex flex-col translate-y-[0.4vh]">
                  <p className="text-[0.53vw] tracking-[0.06vw] uppercase font-medium -mb-[0.5vh] whitespace-nowrap">
                    Get it on
                  </p>
                  <p className="text-[1.3vw] font-large text-white/100 whitespace-nowrap">
                    Google Play
                  </p>
                </div>
              </a>

              {/* App Store */}
              <a
                href="#"
                className="flex items-center gap-[0.2vw] w-[11.1vw] bg-black text-white/90 pl-[0.5vw] pr-[1vw] pb-[1vh] pt-[0.3vh] border border-[#8875D9]"
              >
                <Image
                  src="/DownloadApp5.png"
                  alt="App Store Icon"
                  width={30}
                  height={20}
                  className="w-[2.3vw] h-[5vh]"
                />
                <div className="flex flex-col translate-y-[0.4vh] gap-[0.01vw]">
                  <p className="text-[0.65vw] tracking-[0.1vw] font-medium whitespace-nowrap -mb-[0.5vh]">
                    Download on the
                  </p>
                  <p className="text-[1.5vw] font-large text-white/100 whitespace-nowrap">
                    App Store
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* TABLET / IPAD VIEW */}
      {isIpad && (
        <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden px-8 py-20">
          {/* Background Image */}
          <div className="absolute top-[25.7vh] left-0 w-full h-[50%] opacity-100">
            <Image
              src="/DownloadApp1.png"
              alt="Background pattern"
              fill
              className="object-cover"
            />
          </div>

          {/* Left Content */}
          <div className="absolute z-10 flex flex-1 flex-col items-center text-left gap-[64vh] top-[10vh]">
            <div className="flex flex-col items-center gap-[2vh]">
              <Image
                src="/DownloadApp2.png"
                alt="Download text"
                width={570}
                height={75}
                className="w-[70vw] h-[4vh]"
              />
              <Image
                src="/DownloadApp3.png"
                alt="The App text"
                width={430}
                height={75}
                className="h-[4vh] w-[53vw]"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-[2vh] items-center">
              <a
                href="#"
                className="flex items-center gap-[0.5vw] w-[20vw] bg-black text-white border border-[#8875D9] pl-[1.5vw] pr-[1.3vw] pt-[0.5vh] pb-[0.5vh]"
              >
                <Image
                  src="/DownloadApp4.png"
                  alt="Google Play Icon"
                  width={25}
                  height={25} 
                  className=" translate-y-[0.5vh] w-[3vw] h-[2vh]"
                />
                <div className="flex flex-col leading-tight">
                  <p className="text-[1vw] uppercase tracking-[0.2vw] whitespace-nowrap">
                    Get it on
                  </p>
                  <p className="text-[2vw] font-semibold  whitespace-nowrap">Google Play</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-[0.5vw] w-[20vw]  bg-black text-white border border-[#8875D9] pl-[1vw] pr-[1.3vw] pt-[0.5vh] pb-[0.5vh]"
              >
                <Image
                  src="/DownloadApp5.png"
                  alt="App Store Icon"
                  width={30}
                  height={20}
                  className="w-[3.6vw] h-[2.4vh]"
                />
                <div className="flex flex-col leading-tight">
                  <p className="text-[1vw] uppercase tracking-[0.2vw] whitespace-nowrap">
                    Download on the
                  </p>
                  <p className="text-[2.5vw] tracking-[0.1vw] font-semibold whitespace-nowrap">App Store</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* PHONE VIEW */}
      {isPhone && (
        <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
          {/* Background */}
          <div className="absolute top-[23vh] left-0 w-full h-[45%] opacity-100">
            <Image
              src="/DownloadApp1.png"
              alt="Background pattern"
              fill
              className="object-cover w-full h-full opacity-100"
            />
          </div>

          {/* Left content */}
          <div className="absolute z-10 flex flex-1 flex-col items-center gap-[58vh] top-[10vh]">
            <div className="flex flex-col items-center gap-[1.7vh]">
              <Image
                src="/DownloadApp2.png"
                alt="Download text"
                width={320}
                height={80}
                className="w-[79vw] h-[3vh]"
              />
              <Image
                src="/DownloadApp3.png"
                alt="The App text"
                width={240}
                height={80}
                className="w-[59vw] h-[3vh]"
              />
            </div>

            {/* Store Buttons */}
            <div className="flex flex-col gap-[1.2vh] items-center">
              <a
                href="#"
                className="flex items-center gap-1 w-[35vw] bg-black text-white border border-[#8875D9] pl-[3.2vw] pr-[3.5vw] pt-[0.6vh] pb-[0.5vh]"
              >
                <Image
                  src="/DownloadApp4.png"
                  alt="Google Play Icon"
                  width={22}
                  height={22}
                  className="translate-y-[0.4vh] w-[45vw] h-[2.5vh]"
                />
                <div className="flex flex-col leading-tight">
                  <p className="text-[1.7vw] uppercase tracking-[0.1vw] whitespace-nowrap"
                  style={{fontFamily:'Roboto,Arial,sans-serif'}}>
                    Get it on
                  </p>
                  <p className="text-[3.8vw] font-semibold whitespace-nowrap"
                  style={{fontFamily:'Google Sans,Poppins, sans-serif'}}>Google Play</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-1 w-[35vw] bg-black text-white border border-[#8875D9] pl-[2vw] pr-[3.5vw] pt-[0.6vh] pb-[0.4vh]"
              >
                <Image
                  src="/DownloadApp5.png"
                  alt="App Store Icon"
                  width={25}
                  height={16}
                  className="w-[6vw] h-[2.5vh]"
                />
                <div className="flex flex-col leading-tight">
                  <p className="text-[1.7vw]  tracking-[0.45vw] whitespace-nowrap">
                    Download on the
                  </p>
                  <p className="text-[3.8vw] tracking-[0.3vw] font-semibold whitespace-nowrap">App Store</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DownloadApp;
