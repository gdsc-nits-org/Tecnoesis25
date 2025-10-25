"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import DecryptedText from "~/components/DecryptedText";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Module {
  id: string;
  name: string;
  coverImage: string;
}

interface ModuleData {
  name: string;
  image: string;
  progressImage: string;
  year: string;
}

export default function ModuleDetailsDesktop() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [glitchVisible, setGlitchVisible] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const { data } = await axios.get<{ msg: Module[] }>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/module`,
        );
        setModules(data.msg);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching modules:", error);
        setIsLoading(false);
      }
    };

    void fetchModules();
  }, []);

  // Transform API data to display format
  const modulesData: ModuleData[] = modules.map((module) => ({
    name: module.name,
    image: module.coverImage,
    progressImage: "/Modules/ProgreeBar.svg",
    year: "2025",
  }));

  const current = modulesData[index];

  const handleScroll = (e: React.WheelEvent) => {
    if (modulesData.length === 0) return;
    
    if (e.deltaY < 0) {
      triggerGlitch(() => setIndex((prev) => (prev + 1) % modulesData.length));
    } else if (e.deltaY > 0) {
      triggerGlitch(() => setIndex((prev) => (prev - 1 + modulesData.length) % modulesData.length));
    }
  };

  const triggerGlitch = (callback: () => void) => {
    setGlitchVisible(true);
    setTimeout(() => {
      callback();
      setGlitchVisible(false);
    }, 500); 
  };

  if (isLoading) {
    return (
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="text-white font-nyxerin text-xl">Loading modules...</div>
      </section>
    );
  }

  if (!current || modulesData.length === 0) {
    return (
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="text-white font-nyxerin text-xl">No modules available</div>
      </section>
    );
  }

  const sidebarHeight = 90; 
  return (
    <section
      className="relative flex flex-col items-center gap-4 justify-center min-h-screen bg-black text-white overflow-hidden"
       style={{
        backgroundImage: "url('/grid.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundPosition: "center",
      }}
      onWheel={handleScroll}
    >
         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-[3]" />

      <motion.h1
        className="text-3xl lg:text-5xl mt-8 text-[#FF0000] font-nyxerin tracking-widest"
      >
        Modules
      </motion.h1>

      
      <AnimatePresence mode="wait"

      >
        <motion.div
          key={current.name}
          className="relative w-[50%] flex flex-col items-center justify-center mt-8"
        >

          <div className="relative min-w-[540px] w-full aspect-[2/1] flex z-30 justify-center items-center"
           onClick={() => router.push(`/allEvents/${index}`)}>
            {glitchVisible ? (
              <motion.div
                key="glitch"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 z-10"
              >
                <Image
                  src="/Modules/glitchImg.jpg" 
                  alt="Glitch Effect"
                  fill
                  className="object-cover mix-blend-screen opacity-80"
                />
              </motion.div>
            ) : (
              <motion.div
                key={current.image}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  className="object-cover shadow-xl"
                />
              </motion.div>
            )}


            <div className="absolute -top-10 right-[-10px] flex items-center space-x-3">
              <Image
                src="/Modules/UpperFrame.svg"
                alt="upperFrame"
                width={300}
                height={90}
                className="z-0"
              />
              <div className="absolute top-2 text-left">
                <h2 className="text-white text-[0.65rem] lg:text-[0.8rem] xl:text-[1rem] font-nyxerin font-bold">
                  <DecryptedText text={current.name} animateOn="view" />
                </h2>
                <p className="text-white text-[0.65rem] lg:text-[0.8rem] xl:text-[1rem] font-nyxerin tracking-widest">
                  <DecryptedText text={current.year} animateOn="view" />
                </p>
              </div>
            </div>

            {/* Left Sidebar */}
            <div
              className="absolute left-[-70px] lg:left-[-80px] xl:left-[-100px]  flex flex-col justify-center items-center"

            >
              <Image
                src="/Modules/SideBarImg.svg"
                alt="SideBar"
                width={50}
                height={350}
                className=" scale-75 lg:scale-90 xl:scale-100 z-10"
              />
              <p className="absolute z-20 h-full text-center font-nyxerin text-white text-[0.65rem] lg:text-[0.8rem] xl:text-[1rem] mt-2 [writing-mode:vertical-rl] rotate-180 tracking-widest">
                <DecryptedText text={current.name} animateOn="view" />
              </p>
            </div>
            <div
              className="absolute left-[-150px] lg:left-[-180px] xl:left-[-200px] flex flex-col justify-center items-center"

            >
              <Image
                src="/Modules/SideBarImg.svg"
                alt="SideBar"
                width={50}
                height={350}
                className="scale-50 lg:scale-75 xl:scale-90 z-10"
              />
              <p className="absolute z-20 h-full text-center font-nyxerin text-white   text-[0.65rem] lg:text-[0.8rem] xl:text-[1rem] mt-2 [writing-mode:vertical-rl] rotate-180 tracking-widest">
                <DecryptedText text={current.name} animateOn="view" />
              </p>
            </div>

            <div
              className="absolute right-[-80px] lg:right-[-100px] xl:right-[-100px]] flex flex-col justify-center items-center"
              style ={{ height: `${sidebarHeight}%` }}
            >
              <Image
                src="/Modules/SideBarImg.svg"
                alt="SideBar"
                width={50}
                height={350}
                className="scale-75 lg:scale-90 xl:scale-100 z-10"
              />
              <p className="absolute z-20 h-full text-center font-nyxerin text-white  text-[0.65rem] lg:text-[0.8rem] xl:text-[1rem] mt-2 [writing-mode:vertical-rl] tracking-widest">
                <DecryptedText text={current.name} animateOn="view" />
              </p>
            </div>
            <div
              className="absolute right-[-150px] lg:right-[-180px] xl:right-[-200px] flex flex-col justify-center items-center"
              style={{ height: `${sidebarHeight}%` }}
            >
              <Image
                src="/Modules/SideBarImg.svg"
                alt="SideBar"
                width={50}
                height={350}
                className="scale-50 lg:scale-75 xl:scale-90 z-10"
              />
              <p className="absolute z-20 h-full text-center font-nyxerin text-white text-[0.65rem] lg:text-[0.8rem] xl:text-[1rem] mt-2 [writing-mode:vertical-rl] tracking-widest">
                <DecryptedText text={current.name} animateOn="view" />
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
