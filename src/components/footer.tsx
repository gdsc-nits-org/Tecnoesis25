"use client";
import Dither from "~/components/dither";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="relative w-full overflow-hidden bg-black p-0">
      <div className="absolute inset-0 z-0">
        <Dither
          waveColor={[1, 0, 0.2]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.25}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-screen-xl flex-col items-center gap-y-8 px-4 py-16 md:gap-y-12 md:py-24">
        {/* <div className="pointer-events-auto flex w-[90%] cursor-pointer items-center justify-center space-x-3 rounded-lg border border-white p-2 md:space-x-4 md:p-3 laptop:w-[50%]">
          <div className="relative h-10 w-10 flex-shrink-0 laptop:h-14 laptop:w-14">
            <Image
              src="/independence1.png"
              alt="Campus Ambassador Program"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="font-bank text-center text-xs font-semibold text-white sm:text-sm md:text-2xl">
            BECOME OUR CAMPUS AMBASSADOR
          </p>
        </div> */}

        <div className="relative mobile:scale-[0.8] mobile2:scale-[1] ">
          <div className="pointer-events-none select-none text-center font-nyxerin text-[clamp(2.5rem,10vw,6.6rem)] text-white laptop:text-[8rem]">
            Tecnoesis
          </div>
          <div className="pointer-events-none absolute right-[1.5rem] top-[-1rem] -translate-y-[20%] translate-x-[20%] select-none font-nyxerin text-[clamp(2rem,6vw,4rem)] text-white md:right-[2.4rem] lg:right-[3rem]">
            2025
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4">
          <p className="font-bank text-sm font-semibold text-white sm:text-base md:text-lg laptop:text-[1.7rem]">
            CONTACT US
          </p>
          <div className="flex items-center justify-center gap-x-6 sm:gap-x-8 md:gap-x-6">
            <a
              href="https://www.instagram.com/tecnoesis.nits/"
              target="_blank"
              aria-label="Instagram"
              className="pointer-events-auto transform transition-transform hover:scale-110"
            >
              <div className="relative h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8">
                <Image
                  src="/insta.png"
                  alt="Instagram"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </a>
            {/* <a href="#" aria-label="LinkedIn" className="pointer-events-auto transform transition-transform hover:scale-110">
              <div className="relative h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8">
                <Image src="/linkedin.png" alt="LinkedIn" layout="fill" objectFit="contain" />
              </div>
            </a> */}
            <a
              href="https://www.facebook.com/tecnoesis.nits"
              target="_blank"
              aria-label="Facebook"
              className="pointer-events-auto transform transition-transform hover:scale-110"
            >
              <div className="relative h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </a>
            <a
              href="mailto:tecnoesis@nits.ac.in"
              target="_blank"
              aria-label="mail"
              className="pointer-events-auto transform transition-transform hover:scale-110"
            >
              <div className="relative h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8">
                <Image
                  src="/pmail.png"
                  alt="mail"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </a>
            {/* <a href="#" aria-label="X (formerly Twitter)" className="pointer-events-auto transform transition-transform hover:scale-110">
              <div className="relative h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8">
                <Image src="/x.png" alt="X (formerly Twitter)" layout="fill" objectFit="contain" />
              </div>
            </a> */}
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-0 right-0 z-10 flex w-full translate-y-8 items-center justify-center px-4 md:translate-y-0">
        <a href="https://gdscnits.in/" target="_blank" className="flex">
          <p className="text-center font-nyxerin text-[0.6rem] font-thin tracking-widest text-white sm:text-xs md:text-sm">
            Made in Collaboration with GDG Nit Silchar
          </p>
          <Image
            src="/gdgc_logo_animated.gif"
            alt="gdgc_logo"
            height={60}
            width={55}
            className="-translate-y-5"
          />
        </a>
      </div>
    </div>
  );
}
