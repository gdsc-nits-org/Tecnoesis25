"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface EmpresarioHeroProps {
  "data-id"?: string;
  onNavigate?: () => void;
}

export const EmpresarioHero: React.FC<EmpresarioHeroProps> = ({
  "data-id": dataId,
  onNavigate,
}) => {
  const [blocks, setBlocks] = useState<
    Array<{ left: number; delay: number; duration: number; width: number }>
  >([]);

  useEffect(() => {
    // Generate floating block positions
    const blockData = Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      width: 10 + Math.random() * 40,
    }));
    setBlocks(blockData);
  }, []);

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    } else {
      window.open("https://ecellnits.org/empresario", "_blank");
    }
  };

  return (
    <div
      data-id={dataId}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black p-4 md:p-8"
    >
      {/* City Grid Background */}
      <div className="city-perspective absolute inset-0">
        <div className="city-floor"></div>
      </div>

      {/* Vertical Data Beams (Rising) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="data-beam beam-1"></div>
        <div className="data-beam beam-2"></div>
        <div className="data-beam beam-3"></div>
        <div className="data-beam beam-4"></div>
        <div className="data-beam beam-5"></div>
      </div>

      {/* Maze / Labyrinth Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="maze-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 10 H90 M10 10 V90 M90 10 V50 M50 90 V50 M50 50 H90 M10 50 H30 M10 90 H90"
                stroke="#FF4500"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              />
              <rect x="45" y="45" width="10" height="10" fill="#FF4500" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#maze-pattern)" />
        </svg>
      </div>

      {/* Floating Blocks (City Debris/Data) */}
      <div className="pointer-events-none absolute inset-0">
        {blocks.map((block, i) => (
          <div
            key={i}
            className="floating-block"
            style={{
              left: `${block.left}%`,
              width: `${block.width}px`,
              height: `${block.width}px`,
              animationDelay: `${block.delay}s`,
              animationDuration: `${block.duration}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Horizon Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#FF4500]/20 to-transparent blur-3xl"></div>
      
      {/* Central Abstract Cityscape Silhouette */}
      <div className="absolute bottom-0 inset-x-0 h-1/3 opacity-30 pointer-events-none">
         <div className="absolute bottom-0 left-0 right-0 h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         <div className="w-full h-full bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center gap-1">
            {/* Simple CSS City Skyline */}
            <div className="w-8 h-24 bg-[#FF4500]/20"></div>
            <div className="w-12 h-32 bg-[#FF4500]/30"></div>
            <div className="w-16 h-16 bg-[#FF4500]/10"></div>
            <div className="w-10 h-40 bg-[#FF4500]/25"></div>
            <div className="w-14 h-28 bg-[#FF4500]/15"></div>
            <div className="w-20 h-12 bg-[#FF4500]/20"></div>
         </div>
      </div>

      {/* Glowing Orbs - Warmer tones */}
      <div className="animate-pulse-slow absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-orange-600/20 blur-[100px]"></div>
      <div className="animate-pulse-slower absolute -right-20 bottom-1/3 h-96 w-96 rounded-full bg-red-600/15 blur-[100px]"></div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Border Frame */}
        <div className="absolute -inset-1 rounded-sm bg-gradient-to-b from-[#FF4500] via-transparent to-[#FF4500] opacity-30 blur-sm"></div>
        
        <div className="empresario-card relative border border-[#FF4500]/40 bg-black/80 p-8 backdrop-blur-md md:p-14">
          
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FF4500]"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FF4500]"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FF4500]"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF4500]"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Header Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6 flex items-center gap-4"
            >
              <div className="h-[1px] w-12 bg-[#FF4500]"></div>
              <span className="text-base font-bold tracking-[0.2em] text-[#FF4500] md:text-xl">
                E-CELL PRESENTS
              </span>
              <div className="h-[1px] w-12 bg-[#FF4500]"></div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="glitch-text mb-4 pb-4 text-3xl font-black uppercase tracking-tighter text-white md:text-7xl lg:text-8xl"
              data-text="EMPRESARIO"
            >
              EMPRESARIO
            </motion.h1>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8 rounded-full border border-[#FF4500]/30 bg-[#FF4500]/10 px-6 py-2 backdrop-blur-sm"
            >
              <span className="font-mono text-lg font-bold text-[#FF8800] tracking-widest">
                16–18TH JANUARY
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-10 max-w-2xl text-justify text-gray-400 md:text-lg"
            >
              EMPRESARIO, the flagship entrepreneurial challenge of E-Cell NIT Silchar is back, a space where ideas begin as individual points and gradually connect, like elements on a grid, forming something greater than the sum of their parts. It&apos;s not just a competition; it&apos;s a environment for thinkers, builders, and dreamers who believe every idea has a place, it just needs the right alignment
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <button
                onClick={handleClick}
                className="group relative flex items-center gap-4 overflow-hidden bg-[#FF4500] px-8 py-4 font-bold text-black transition-all hover:bg-white hover:text-[#FF4500]"
              >
                <span className="z-10 tracking-widest font-bankGothik">ENTER TO REGISTER</span>
                <ChevronRight className="z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                
                {/* Button Scan Effect */}
                <div className="absolute inset-0 -translate-x-full bg-white opacity-20 transition-transform duration-500 group-hover:translate-x-full"></div>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap");

        * {
          font-family: "Orbitron", sans-serif;
        }

        /* Perspective Floor */
        .city-perspective {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .city-floor {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: 
            linear-gradient(rgba(255, 69, 0, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 69, 0, 0.15) 1px, transparent 1px);
          background-size: 60px 60px;
          transform: rotateX(75deg);
          animation: floorMove 15s linear infinite;
          mask-image: radial-gradient(circle, black 30%, transparent 70%);
        }

        @keyframes floorMove {
          from {
            transform: rotateX(75deg) translateY(0);
          }
          to {
            transform: rotateX(75deg) translateY(60px);
          }
        }

        /* Vertical Beams */
        .data-beam {
          position: absolute;
          bottom: -100%;
          width: 2px;
          background: linear-gradient(to top, transparent, #FF4500, transparent);
          box-shadow: 0 0 15px #FF4500;
          animation: beamRise 6s ease-in-out infinite;
          opacity: 0.6;
        }

        .beam-1 { left: 10%; height: 120%; animation-delay: 0s; animation-duration: 5s; }
        .beam-2 { left: 30%; height: 150%; animation-delay: 1.5s; animation-duration: 7s; }
        .beam-3 { left: 50%; height: 100%; animation-delay: 3s; animation-duration: 6s; }
        .beam-4 { left: 70%; height: 140%; animation-delay: 2s; animation-duration: 8s; }
        .beam-5 { left: 90%; height: 110%; animation-delay: 0.5s; animation-duration: 5.5s; }

        @keyframes beamRise {
          0% { bottom: -100%; opacity: 0; }
          50% { opacity: 0.8; }
          100% { bottom: 100%; opacity: 0; }
        }

        /* Floating Blocks */
        .floating-block {
          position: absolute;
          background: rgba(255, 69, 0, 0.1);
          border: 1px solid rgba(255, 69, 0, 0.3);
          animation: floatUp linear infinite;
        }

        @keyframes floatUp {
          0% { top: 110%; transform: rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: -10%; transform: rotate(180deg); opacity: 0; }
        }

        /* Glitch Text Effect */
        .glitch-text {
          position: relative;
          color: white;
          text-shadow: 2px 2px #FF4500;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
        }

        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 #00ffff;
          clip-path: inset(0 0 0 0);
          animation: glitch-anim-1 3s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 #ff00ff;
          clip-path: inset(0 0 0 0);
          animation: glitch-anim-2 2s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); }
          20% { clip-path: inset(60% 0 10% 0); }
          40% { clip-path: inset(40% 0 50% 0); }
          60% { clip-path: inset(80% 0 5% 0); }
          80% { clip-path: inset(10% 0 70% 0); }
          100% { clip-path: inset(30% 0 20% 0); }
        }

        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); }
          20% { clip-path: inset(80% 0 5% 0); }
          40% { clip-path: inset(30% 0 20% 0); }
          60% { clip-path: inset(10% 0 80% 0); }
          80% { clip-path: inset(50% 0 30% 0); }
          100% { clip-path: inset(90% 0 10% 0); }
        }

        /* Pulse Animations */
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-pulse-slower {
          animation: pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};
