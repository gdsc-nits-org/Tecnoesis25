// Reusable text styles
const headingStyles =
  "font-bold text-white font-['Orbitron',sans-serif] leading-[1] tracking-[0.19em]";
const paragraphStyles =
  "text-white font-['Orbitron',sans-serif] font-medium leading-[1.6] md:leading-[36px] tracking-[0.03em] text-justify";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative mt-[-20rem] bg-cover bg-center py-16"
      style={{
        backgroundImage: 'url("/robotron/aboutBackground.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto max-w-5xl px-4">
        {/* Mobile Frame */}
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-red-500/20 to-blue-400/20 p-6 backdrop-blur-sm md:hidden">
          {/* Content */}
          <div className="relative z-10">
            <h2 className={`${headingStyles} mb-6 text-4xl`}>
              <span className="block">ABOUT</span>
              <span className="mt-1 block">ROBOTRON</span>
            </h2>
            <div className="w-full">
              <p className={`${paragraphStyles} text-sm`}>
                Robotron is the flagship annual event of N.E.R.D.S., the
                Robotics Club of NIT Silchar, dedicated to celebrating
                innovation, technology, and engineering excellence. It brings
                together creative minds and tech enthusiasts from across the
                nation to design, build, and battle robots in an electrifying
                arena of intelligence and precision.
              </p>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute left-4 top-4 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-red-400"></div>
          <div className="absolute right-4 top-4 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-blue-400"></div>
          <div className="absolute bottom-4 left-4 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-blue-400"></div>
          <div className="absolute bottom-4 right-4 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-red-400"></div>
        </div>

        {/* Desktop/Tablet Frame */}
        <div className="relative hidden md:block">
          <img
            src="/robotron/aboutFrame.svg"
            alt="About Robotron Frame"
            className="h-auto w-full"
            loading="lazy"
            width={1296}
            height={859}
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center md:p-12">
            <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
              <h2
                className={`${headingStyles} text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}
              >
                <span className="block">ABOUT</span>
                <span className="mt-1 block sm:mt-2">ROBOTRON</span>
              </h2>
              <div className="mx-auto mt-4 w-full max-w-full sm:mt-6 md:mt-8">
                <p
                  className={`${paragraphStyles} text-xs leading-relaxed sm:text-sm md:text-[15px] md:leading-loose lg:text-base xl:text-lg`}
                >
                  Robotron is the flagship annual event of N.E.R.D.S., the
                  Robotics Club of NIT Silchar, dedicated to celebrating
                  innovation, technology, and engineering excellence. It brings
                  together creative minds and tech enthusiasts from across the
                  nation to design, build, and battle robots in an electrifying
                  arena of intelligence and precision.The event showcases the
                  limitless potential of robotics through competitions like
                  RoboWar, RoboSoccer, Race Circuit, and Bluetooth Blitz,
                  testing participants’ mechanical design, coding skills, and
                  real-time problem-solving abilities. Beyond the adrenaline of
                  robot battles, Robotron fosters collaboration, teamwork, and a
                  spirit of engineering innovation among young technocrats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
