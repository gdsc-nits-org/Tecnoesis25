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

export default function ModuleDetailsMobile() {
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
        
        if (e.deltaX < 0) {
            triggerGlitch(() =>
                setIndex((prev) => (prev + 1) % modulesData.length)
            );
        } else if (e.deltaX > 0) {
            triggerGlitch(() =>
                setIndex((prev) => (prev - 1 + modulesData.length) % modulesData.length)
            );
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
            <section className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
                <div className="text-white font-nyxerin text-xl">Loading modules...</div>
            </section>
        );
    }

    if (!current || modulesData.length === 0) {
        return (
            <section className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
                <div className="text-white font-nyxerin text-xl">No modules available</div>
            </section>
        );
    }

    return (
        <section
            className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden px-4"
            style={{
                backgroundImage: "url('/grid.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
                backgroundPosition: "center",
            }}
            onWheel={handleScroll}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-[3]" />


            <motion.h1
                className="text-2xl text-[#FF0000] font-nyxerin tracking-widest z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                MODULES
            </motion.h1>

       
            <AnimatePresence mode="wait">
                <motion.div key={current.name} className="relative flex  flex-col items-center justify-center w-full">
                    <motion.div
                        key={current.name}
                        className="relative flex flex-col items-center justify-center w-full mt-8 z-10"
                    >
                       
                        <div className="relative flex items-center justify-center">
                          
                            <div className="absolute -left-16 flex flex-col justify-center items-center">
                                <Image
                                    src="/Modules/SideBarImg.svg"
                                    alt="Left Sidebar"
                                    width={40}
                                    height={250}
                                    className="object-contain z-10"
                                />
                                <p className="absolute z-20 h-full text-center font-nyxerin text-white text-[0.9rem] [writing-mode:vertical-rl] rotate-180 tracking-widest">
                                    <DecryptedText text={current.name} animateOn="view" />
                                </p>
                            </div>

                            <div className="relative w-[16rem] h-[25rem] border-4 border-red-700 bg-white flex justify-center items-center overflow-hidden"
                              onClick={() => router.push(`/allEvents/${index}`)}
                            >
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
                                    <motion.div key={current.image} className="absolute inset-0">
                                        <Image
                                            src={current.image}
                                            alt={current.name}
                                            fill
                                            className="object-cover shadow-2xl "
                                        />
                                    </motion.div>
                                )}
                            </div>

                            {/* Right Sidebar */}
                            <div className="absolute -right-16 flex flex-col justify-center items-center">
                                <Image
                                    src="/Modules/SideBarImg.svg"
                                    alt="Right Sidebar"
                                    width={40}
                                    height={250}
                                    className="object-contain z-10"
                                />
                                <p className="absolute z-20 h-full text-center font-nyxerin text-white text-[0.9rem] [writing-mode:vertical-rl] tracking-widest">
                                    <DecryptedText text={current.name} animateOn="view" />
                                </p>
                            </div>
                        </div>


                        <p className="absolute bottom-[0.5rem] text-lg font-nyxerin tracking-widest text-white uppercase z-20 bg-black/50 px-4 py-1 rounded-lg">
                            <DecryptedText text={current.name} animateOn="view" />
                        </p>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
