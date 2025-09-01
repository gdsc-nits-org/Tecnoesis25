"use client";

import { useEffect, useState } from "react";
import localFont from "next/font/local";
import { Orbitron } from "next/font/google";
import RcCountdown from "react-countdown";


const tron = localFont({ src: "../../public/tron.ttf" });
const digits = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

const targetDate = new Date(2025, 9, 30, 17, 0, 0, 0);

function two(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={`${tron.className} pointer-events-none fixed bottom-6 left-0 right-0 z-20 flex justify-center px-4 text-cyan-300`}
      style={{
        contain: "paint",
        textShadow: "0 0 6px rgba(56,189,248,.6), 0 0 12px rgba(56,189,248,.3)",
      }}
    >
      <div className="flex items-baseline gap-4 sm:gap-6 md:gap-8 max-w-full">
        {isMounted ? (
          <RcCountdown
            date={targetDate}
            renderer={({ days, hours, minutes, seconds }) => (
              <>
                <Item value={`${days}`} label="DAYS" />
                <Item value={two(hours )} label="HRS" />
                <Item value={two(minutes )} label="MIN" />
                <Item value={two(seconds )} label="SEC" />
              </>
            )}
          />
        ) : (
          // Placeholder content that matches the expected structure
          <>
            <Item value="--" label="DAYS" />
            <Item value="--" label="HRS" />
            <Item value="--" label="MIN" />
            <Item value="--" label="SEC" />
          </>
        )}
      </div>
    </div>
  );
}

function Item({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-end gap-2">
      <span
        className={`${digits.className} tabular-nums leading-none text-lg sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.15em]`}
      >
        {value}
      </span>
      <span className="leading-none text-[10px] sm:text-xs md:text-sm tracking-[0.12em]">
        {label}
      </span>
    </div>
  );
}
