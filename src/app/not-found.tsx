"use client";

import React, { useState, useEffect } from "react";
import localFont from "next/font/local";

const tron = localFont({ src: "../../public/tron.ttf" });
import { Orbitron } from "next/font/google";
const digits = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const CornerBracket = ({ className }: { className?: string }) => (
  <svg
    className={`absolute text-red-600 ${className}`}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M38 2H18V4H36V22H38V2Z" fill="currentColor" />
    <path d="M2 38H22V36H4V18H2V38Z" fill="currentColor" />
  </svg>
);

// New component to create the quantum glitch effect on the 404 text
const Quantum404 = () => {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const target = "404";

  const [text, setText] = useState(target);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const timeout: NodeJS.Timeout | null = null;

    const scramble = () => {
      let iteration = 0;
      if (interval) clearInterval(interval);

      interval = setInterval(() => {
        setText((prev) =>
          prev
            .split("")
            .map((_, index) => {
              if (index < iteration) {
                return target[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(""),
        );

        if (iteration >= target.length) {
          if (interval) clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 50);
    };

    scramble();

    const rescrambleInterval = setInterval(() => {
      scramble();
    }, 2000);

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
      clearInterval(rescrambleInterval);
    };
  }, []);

  return (
    <h1
      className={`${digits.className} text-glow text-7xl font-bold text-red-600 md:text-9xl`}
      style={{ minHeight: "1.2em" }}
    >
      {text}
    </h1>
  );
};

export default function NotFound() {
  return (
    <>
      <main
        className={`${digits.className} flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black p-4 font-orbitron text-white`}
      >
        <div className="relative flex w-full max-w-2xl flex-col items-center rounded-lg border-2 border-red-500/30 bg-black/30 p-8 text-center md:p-12">
          {/* Decorative Corner Brackets */}
          <CornerBracket className="left-2 top-2" />
          <CornerBracket className="right-2 top-2 rotate-90 transform" />
          <CornerBracket className="bottom-2 left-2 -rotate-90 transform" />
          <CornerBracket className="bottom-2 right-2 rotate-180 transform" />

          <Quantum404 />

          <p className="mt-4 text-lg uppercase tracking-widest text-white md:text-2xl">
            Data-Stream Desynchronized from Reality
          </p>

          <p className="md:text-md mt-4 max-w-md text-sm text-gray-300">
            Connection failed. The quantum data-path has collapsed, this sector
            address no longer exists within this reality.
          </p>

          <a
            href="/"
            className={`${tron.className} md:text-md mt-10 inline-block rounded-md border-2 border-red-800 px-8 py-3 text-sm uppercase tracking-widest text-red-800 transition-all duration-300 hover:bg-red-600/60 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.7)]`}
          >
            Go Back to Reality
          </a>
        </div>
        {/* Decorative bottom bar element to match the homepage */}
        <div className="absolute bottom-5 left-1/2 h-2 w-1/3 -translate-x-1/2 rounded-full bg-red-600/60 shadow-md blur-sm"></div>
        <div className="absolute bottom-5 left-1/2 h-1 w-1/4 -translate-x-1/2 rounded-full bg-red-900"></div>
      </main>
    </>
  );
}
