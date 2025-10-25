"use client";
import React from "react";
import FaultyTerminal from "./FaultyTerminal";

const Footer = React.memo(() => {
  return (
    <div className="relative w-full overflow-hidden bg-black p-0">
      {/* Background Terminal Effect */}
      <div className="absolute inset-0 z-0" style={{ contain: "strict" }}>
        <FaultyTerminal
          scale={4}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.8}
          pause={false}
          scanlineIntensity={0.8}
          glitchAmount={0.8}
          flickerAmount={0.8}
          noiseAmp={0.8}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#F40004"
          mouseReact={true}
          mouseStrength={0.3}
          pageLoadAnimation={false}
          brightness={1}
        />
      </div>

      {/* Content Overlay */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-screen-xl flex-col items-center gap-y-8 px-4 py-16 md:gap-y-12 md:py-24">
        {/* Main Title */}
        <div className="relative mobile:scale-[0.8] mobile2:scale-[1]">
          <div className="pointer-events-none select-none text-center font-nyxerin text-[clamp(2.5rem,10vw,6.6rem)] text-white laptop:text-[8rem]">
            Robotron
          </div>
          <div className="pointer-events-none absolute right-[1.5rem] top-[-1rem] -translate-y-[20%] translate-x-[20%] select-none font-nyxerin text-[clamp(2rem,6vw,4rem)] text-white md:right-[2.4rem] lg:right-[3rem]">
            2025
          </div>
        </div>
      </div>

      {/* Bottom Credits */}
      <div className="md:bottom-15 absolute bottom-10 left-0 right-0 z-10 w-full px-4">
        <a
          href="https://www.nerdsnitsilchar.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-center font-orbitron text-[0.6rem] font-thin tracking-widest text-white sm:text-xs md:text-sm">
            Made With ❤️ By N.E.R.D.S.
          </p>
        </a>
      </div>
    </div>
  );
});

Footer.displayName = "Footer";

export default Footer;
