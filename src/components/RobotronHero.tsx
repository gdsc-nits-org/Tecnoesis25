"use client";

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface RobotronHeroProps {
  'data-id'?: string
  onNavigate?: () => void
}

export const RobotronHero: React.FC<RobotronHeroProps> = ({
  'data-id': dataId,
  onNavigate,
}) => {
  const [particles, setParticles] = useState<Array<{ left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate particle positions only on client side to avoid hydration mismatch
    const particleData = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setParticles(particleData);
  }, []);

  const handleClick = () => {
    if (onNavigate) {
      onNavigate()
    } else {
      window.location.href = '/robotron'
    }
  }

  return (
    <div
      data-id={dataId}
      className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center p-4 md:p-8"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-background">
        <div className="grid-lines"></div>
      </div>

      {/* Tron Light Trails */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="light-trail trail-1"></div>
        <div className="light-trail trail-2"></div>
        <div className="light-trail trail-3"></div>
        <div className="light-trail trail-4"></div>
        <div className="light-trail trail-5"></div>
      </div>

      {/* Circuit Board Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 50 L 50 50 L 50 0 M 50 100 L 50 150 L 100 150 M 150 50 L 200 50 M 100 0 L 100 50 L 150 50"
                stroke="#F40004"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
              <circle
                cx="50"
                cy="50"
                r="3"
                fill="#F40004"
                className="circuit-node"
              />
              <circle
                cx="100"
                cy="150"
                r="3"
                fill="#F40004"
                className="circuit-node"
              />
              <circle
                cx="150"
                cy="50"
                r="3"
                fill="#F40004"
                className="circuit-node"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-line scan-line-1"></div>
        <div className="scan-line scan-line-2"></div>
        <div className="scan-line scan-line-3"></div>
      </div>

      {/* Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Speed Lines from Corners */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="speed-line speed-line-tl"></div>
        <div className="speed-line speed-line-tr"></div>
        <div className="speed-line speed-line-bl"></div>
        <div className="speed-line speed-line-br"></div>
      </div>

      {/* Pulsing Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="geometric-shape shape-1"></div>
        <div className="geometric-shape shape-2"></div>
        <div className="geometric-shape shape-3"></div>
      </div>

      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/15 rounded-full blur-3xl animate-pulse-slower"></div>

      {/* Robot Silhouette */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="robotGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F40004" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F40004" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M50 20 L50 30 M45 30 L55 30 M45 30 L45 50 M55 30 L55 50 M45 50 L55 50 M50 50 L50 60 M40 60 L60 60 M40 60 L40 80 M60 60 L60 80 M40 80 L45 80 M55 80 L60 80"
            stroke="url(#robotGradient)"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Futuristic Container Box */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="relative z-10 w-full max-w-6xl futuristic-box"
      >
        {/* Box Border Glow */}
        <div className="absolute inset-0 border-glow"></div>

        {/* Corner Decorations */}
        <div className="absolute -top-2 -left-2 w-8 h-8 corner-accent top-left"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 corner-accent top-right"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 corner-accent bottom-left"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 corner-accent bottom-right"></div>

        {/* Side Accent Lines */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-red-500 to-transparent side-line-left"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-red-500 to-transparent side-line-right"></div>

        {/* Main Content Container */}
        <div className="relative backdrop-blur-sm bg-black/40 border-2 border-red-500/30 box-shape p-8 md:p-12 lg:p-16">
          {/* Inner Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/5 pointer-events-none"></div>

          <div className="relative text-center">
            {/* Technoesis Logo/Title */}
            <motion.div
              initial={{
                opacity: 0,
                y: -30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-2 neon-text-red tron-font">
                ROBOTRON
              </h1>
              <div className="flex items-center justify-center gap-2 text-red-400 text-sm md:text-base tracking-[0.3em]">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500"></div>
                <span className="font-light">2025</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500"></div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              className="mb-6"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 neon-text-white">
                ENTER THE ARENA
              </h2>
            
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.6,
              }}
              className="text-gray-400 text-sm md:text-base lg:text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Experience the ultimate Robotics battle at Tecnoesis.
              <br />
              Where machines collide and innovation ignites.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.8,
              }}
            >
              <button
                onClick={handleClick}
                className="group relative px-8 py-4 md:px-12 md:py-5 bg-transparent border-2 border-red-500 text-red-500 font-bold text-lg md:text-xl tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 neon-button"
              >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-all duration-300"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 animate-pulse-ring"></div>
                </div>

                {/* Button Content */}
                <span className="relative flex items-center gap-3">
                  ENTER ROBOTRON
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500"></div>
              </button>
            </motion.div>

            {/* Decorative Lines */}
            <motion.div
              initial={{
                opacity: 0,
                scaleX: 0,
              }}
              animate={{
                opacity: 1,
                scaleX: 1,
              }}
              transition={{
                duration: 1,
                delay: 1,
              }}
              className="mt-16 flex items-center justify-center gap-4"
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

        @font-face {
          font-family: 'Tron';
          src: url('/tron.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        * {
          font-family: 'Orbitron', sans-serif;
        }

        .tron-font {
          font-family: 'Tron', 'Orbitron', sans-serif;
        }

        .grid-background {
          background-image:
            linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        .grid-lines::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            transparent 0%,
            black 100%
          );
        }

        @keyframes gridMove {
          0% {
            transform: perspective(500px) rotateX(60deg) translateY(0);
          }
          100% {
            transform: perspective(500px) rotateX(60deg) translateY(50px);
          }
        }

        /* Tron Light Trails */
        .light-trail {
          position: absolute;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, transparent, #F40004, transparent);
          box-shadow:
            0 0 10px #F40004,
            0 0 20px #F40004;
          animation: trailMove 4s linear infinite;
        }

        .trail-1 {
          top: 15%;
          left: -20%;
          animation-delay: 0s;
        }

        .trail-2 {
          top: 35%;
          left: -20%;
          animation-delay: 1.5s;
        }

        .trail-3 {
          top: 55%;
          left: -20%;
          animation-delay: 3s;
        }

        .trail-4 {
          top: 75%;
          left: -20%;
          animation-delay: 0.8s;
        }

        .trail-5 {
          top: 90%;
          left: -20%;
          animation-delay: 2.2s;
        }

        @keyframes trailMove {
          0% {
            left: -20%;
            width: 0;
          }
          50% {
            width: 40%;
          }
          100% {
            left: 120%;
            width: 0;
          }
        }

        /* Circuit Board Nodes */
        .circuit-node {
          animation: nodePulse 2s ease-in-out infinite;
        }

        @keyframes nodePulse {
          0%, 100% {
            opacity: 0.3;
            r: 3;
          }
          50% {
            opacity: 1;
            r: 4;
          }
        }

        /* Scanning Lines */
        .scan-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #F40004, transparent);
          box-shadow: 0 0 10px #F40004;
          animation: scanMove 8s linear infinite;
        }

        .scan-line-1 {
          animation-delay: 0s;
        }

        .scan-line-2 {
          animation-delay: 2.7s;
        }

        .scan-line-3 {
          animation-delay: 5.3s;
        }

        @keyframes scanMove {
          0% {
            top: -10%;
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }

        /* Particle System */
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #F40004;
          border-radius: 50%;
          box-shadow: 0 0 5px #F40004;
          animation: particleFloat linear infinite;
        }

        @keyframes particleFloat {
          0% {
            top: 100%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: -10%;
            opacity: 0;
          }
        }

        /* Speed Lines */
        .speed-line {
          position: absolute;
          width: 200px;
          height: 1px;
          background: linear-gradient(90deg, #F40004, transparent);
          box-shadow: 0 0 5px #F40004;
          opacity: 0;
          animation: speedLineFlash 3s ease-in-out infinite;
        }

        .speed-line-tl {
          top: 10%;
          left: 0;
          transform-origin: left;
          animation-delay: 0s;
        }

        .speed-line-tr {
          top: 10%;
          right: 0;
          transform: rotate(180deg);
          transform-origin: right;
          animation-delay: 0.75s;
        }

        .speed-line-bl {
          bottom: 10%;
          left: 0;
          transform-origin: left;
          animation-delay: 1.5s;
        }

        .speed-line-br {
          bottom: 10%;
          right: 0;
          transform: rotate(180deg);
          transform-origin: right;
          animation-delay: 2.25s;
        }

        @keyframes speedLineFlash {
          0%, 100% {
            opacity: 0;
            width: 0;
          }
          50% {
            opacity: 0.8;
            width: 300px;
          }
        }

        /* Geometric Shapes */
        .geometric-shape {
          position: absolute;
          border: 1px solid rgba(255, 0, 0, 0.3);
          animation: shapePulse 4s ease-in-out infinite;
        }

        .shape-1 {
          top: 20%;
          left: 10%;
          width: 80px;
          height: 80px;
          transform: rotate(45deg);
          animation-delay: 0s;
        }

        .shape-2 {
          top: 60%;
          right: 15%;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          animation-delay: 1.3s;
        }

        .shape-3 {
          bottom: 25%;
          left: 20%;
          width: 100px;
          height: 100px;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          animation-delay: 2.6s;
        }

        @keyframes shapePulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1) rotate(0deg);
            box-shadow: 0 0 0 rgba(255, 0, 0, 0);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1) rotate(180deg);
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
          }
        }

        /* Futuristic Box Styling */
        .futuristic-box {
          position: relative;
          filter: drop-shadow(0 0 20px rgba(255, 0, 0, 0.3));
        }

        .box-shape {
          clip-path: polygon(
            0 8%,
            8% 0,
            92% 0,
            100% 8%,
            100% 92%,
            92% 100%,
            8% 100%,
            0 92%
          );
          position: relative;
        }

        .border-glow {
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 0, 0, 0.3),
            transparent
          );
          animation: borderPulse 3s ease-in-out infinite;
          clip-path: polygon(
            0 8%,
            8% 0,
            92% 0,
            100% 8%,
            100% 92%,
            92% 100%,
            8% 100%,
            0 92%
          );
        }

        @keyframes borderPulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        /* Corner Accents */
        .corner-accent {
          background: linear-gradient(135deg, #F40004 0%, transparent 70%);
          animation: cornerGlow 2s ease-in-out infinite;
        }

        .corner-accent.top-right {
          background: linear-gradient(225deg, #F40004 0%, transparent 70%);
          animation-delay: 0.5s;
        }

        .corner-accent.bottom-left {
          background: linear-gradient(45deg, #F40004 0%, transparent 70%);
          animation-delay: 1s;
        }

        .corner-accent.bottom-right {
          background: linear-gradient(315deg, #F40004 0%, transparent 70%);
          animation-delay: 1.5s;
        }

        @keyframes cornerGlow {
          0%, 100% {
            opacity: 0.5;
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
          }
        }

        /* Side Lines */
        .side-line-left,
        .side-line-right {
          animation: sidePulse 2s ease-in-out infinite;
        }

        .side-line-right {
          animation-delay: 1s;
        }

        @keyframes sidePulse {
          0%, 100% {
            opacity: 0.3;
            height: 5rem;
          }
          50% {
            opacity: 1;
            height: 8rem;
          }
        }

        .neon-text-red {
          color: #fff;
          text-shadow:
            0 0 10px #F40004,
            0 0 20px #F40004,
            0 0 30px #F40004,
            0 0 40px #F40004;
          animation: flicker 3s infinite alternate;
        }

        .neon-text-white {
          color: #fff;
          text-shadow:
            0 0 10px #fff,
            0 0 20px #ffffff50,
            0 0 30px #F40004,
            0 0 40px #F40004;
        }

        .neon-button {
          box-shadow:
            0 0 10px #F40004,
            inset 0 0 10px rgba(255, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .neon-button:hover {
          box-shadow:
            0 0 20px rgba(255, 0, 0, 0.8),
            0 0 40px rgba(255, 0, 0, 0.6),
            inset 0 0 20px rgba(255, 0, 0, 0.2);
          text-shadow: 0 0 10px #F40004;
        }

        @keyframes flicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
          }
          100% {
            box-shadow: 0 0 0 20px rgba(255, 0, 0, 0);
          }
        }

        .animate-pulse-ring {
          animation: pulse-ring 1.5s infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-pulse-slower {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}
