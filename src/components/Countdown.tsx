import localFont from "next/font/local";
import { Orbitron } from "next/font/google";
import RcCountdown, { type CountdownRenderProps } from "react-countdown";

const tron = localFont({ src: "../../public/tron.ttf" });
const digits = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

let targetDate = new Date(2025, 9, 30, 17, 0, 0, 0);


function two(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {

  return (
    <div
      className={`${tron.className} pointer-events-none fixed bottom-6 left-0 right-0 z-20 flex justify-center px-4 text-cyan-300 mt-0 pt-0`}
      style={{
        contain: "paint",
        textShadow: "0 0 6px rgba(56,189,248,.6), 0 0 12px rgba(56,189,248,.3)",
      }}
    >
      <div className="flex items-baseline gap-4 sm:gap-6 md:gap-8 mt-0 pt-0 max-w-full">
        <RcCountdown
          date={targetDate}
          renderer={({ days, hours, minutes, seconds }: CountdownRenderProps) => (
            <>
              <Item value={`${days}`} label="DAYS" />
              <Item value={two(hours)} label="HRS" />
              <Item value={two(minutes)} label="MIN" />
              <Item value={two(seconds)} label="SEC" />
            </>
          )}
        />
      </div>
    </div>
  );
}

function Item({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-end gap-2 mt-0 pt-0 min-w-0">
      <span className={`${digits.className} tabular-nums leading-none text-lg sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] mt-0 translate-y-[2px] sm:translate-y-[3px]`}>{value}</span>
      <span className="leading-none text-[10px] sm:text-xs md:text-sm tracking-[0.12em] mt-0 pt-0">{label}</span>
    </div>
  );
}


