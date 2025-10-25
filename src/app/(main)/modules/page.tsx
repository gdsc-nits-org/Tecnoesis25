"use client";

import React, { useState, useEffect, useRef, forwardRef } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

// --- 1. Define Types ---

interface Module {
  id: string;
  name: string;
  coverImage: string;
}

interface EventType {
  id: string;
  name: string;
  year: string;
  imageUrl: string;
}

interface EventCardProps {
  event: EventType;
  position: "top-left" | "bottom-right";
}

interface MobileEventCardProps {
  event: EventType;
}

interface CustomScrollbarProps {
  pairsCount: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

interface GalleryAnimationProps {
  onScrollClick: () => void;
}

interface BarsProps {
  className?: string;
  sensitivity?: number;
}

interface MobileProgressBarProps {
  progress: number;
}

// --- 2. Helper Function ---
const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

// --- Child Components ---

const Bars: React.FC<BarsProps> = ({ className = "", sensitivity = 0.5 }) => {
  const [bandOffset, setBandOffset] = useState(0);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) =>
      setBandOffset(event.clientX * sensitivity);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [sensitivity]);
  return (
    <div
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ "--band-offset": `${bandOffset}px` } as React.CSSProperties}
    >
      <div className="glitch-bar-mask" />
      <style jsx>{`
        .glitch-bar-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          background-color: rgba(0, 0, 0, 0.3);
          mask-image: repeating-linear-gradient(
            to right,
            #000 0,
            #000 1vw,
            transparent 1vw,
            transparent 2vw
          );
          -webkit-mask-image: repeating-linear-gradient(
            to right,
            #000 0,
            #000 1vw,
            transparent 1vw,
            transparent 2vw
          );
          mask-position-x: var(--band-offset);
          -webkit-mask-position-x: var(--band-offset);
        }
      `}</style>
    </div>
  );
};

const GalleryAnimation = forwardRef<HTMLDivElement, GalleryAnimationProps>(
  ({ onScrollClick }, ref) => (
    <div
      ref={ref}
      className="relative flex h-screen w-full flex-shrink-0 snap-start items-center justify-center bg-black"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      >
        <source src="/background.gif" type="video/mp4" />
      </video>
      <Bars className="z-20" />
      <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-nyxerin text-4xl tracking-widest text-white md:text-6xl">
            TECNOESIS
          </h1>
          <h2 className="font-nyxerin text-3xl tracking-widest text-red-600 md:text-7xl">
            MODULES 2025
          </h2>
        </div>
      </div>
      <div className="absolute left-[7vw] z-10">
        <Image
          src="/hand.png"
          alt="Left robotic hand"
          width={600}
          height={600}
          className="opacity-90"
        />
      </div>
      <div className="absolute right-[7vw] z-10 scale-x-[-1]">
        <Image
          src="/hand.png"
          alt="Right robotic hand"
          width={600}
          height={600}
          className="opacity-90"
        />
      </div>
      <div className="absolute z-0">
        <Image
          src="/starseed-starseeds.gif"
          alt="Center glow"
          width={600}
          height={600}
          unoptimized
          className="opacity-80 mix-blend-screen"
        />
      </div>
      <button
        onClick={onScrollClick}
        aria-label="Scroll to next section"
        className="absolute bottom-16 left-1/2 z-50 -translate-x-1/2 font-nyxerin tracking-wider text-white"
      >
        <span className="cursor-pointer rounded-full bg-black/60 px-6 py-2 backdrop-blur-sm hover:opacity-90">
          SCROLL UP
        </span>
      </button>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-40 bg-gradient-to-t from-black to-transparent md:h-56 lg:h-72" />
    </div>
  ),
);
GalleryAnimation.displayName = "GalleryAnimation";

const EventCard: React.FC<EventCardProps> = ({ event, position }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/allEvents/${event.id}`)}
      className={`small-bounce absolute w-[40%] cursor-pointer transition-transform duration-1000 hover:scale-105 ${position === "top-left" ? "left-[8%] top-[10%]" : "bottom-[10%] right-[8%]"}`}
    >
      <div className="relative">
        <Image
          src={event.imageUrl}
          alt={`${event.name} Visual`}
          width={1200}
          height={1200}
          className="rounded-lg border border-gray-800"
        />
        <Image
          src="/Subtract.png"
          alt="Event Badge"
          width={300}
          height={300}
          className={`absolute -top-12 ${position === "top-left" ? "-left-7 fourK:scale-125" : "-right-7 scale-x-[-1] fourK:scale-125 fourK:scale-x-[-1]"}`}
        />
        <div
          className={`absolute -top-6 font-nyxerin text-xs text-white  fourK:scale-125 ${position === "top-left" ? "left-16" : "right-16 text-right"}`}
        >
          <p>{event.name}</p>
          <p>{event.year}</p>
        </div>
      </div>
    </div>
  );
};

const MobileEventCard: React.FC<MobileEventCardProps> = ({ event }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/allEvents/${event.id}`)}
      className="relative w-[70vw] max-w-sm flex-shrink-0 cursor-pointer p-4"
    >
      <div className="relative aspect-[3/4] rounded-xl border-2 border-orange-500/50 bg-black/30 p-4 transition-transform hover:scale-105">
        <Image
          src={event.imageUrl}
          alt={event.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <p className="absolute bottom-4 left-4 font-nyxerin text-[1rem] tracking-widest text-white">
          {event.name}
        </p>
        <div className="absolute right-4 top-4 rounded-md bg-white/10 p-2 backdrop-blur-sm">
          <p className="font-nyxerin text-xs text-white">{event.year}</p>
        </div>
      </div>
    </div>
  );
};

const MobileProgressBar: React.FC<MobileProgressBarProps> = ({ progress }) => {
  const totalSegments = 12;
  const filledSegments = Math.round((progress / 100) * totalSegments);
  const clipPathValue =
    'path("M28.88 1L10.88 16L28.88 31H163.12L181.12 16L163.12 1H18.88Z")';

  return (
    <div className="relative my-2 h-8 w-48">
      <Image
        src="/pbar.svg"
        alt="Progress bar border"
        layout="fill"
        className="pointer-events-none absolute inset-0 z-20"
      />
      <div
        className="absolute inset-0 flex justify-center overflow-hidden"
        style={{ clipPath: clipPathValue, WebkitClipPath: clipPathValue }}
      >
        <div className="flex h-full w-[93%] items-center space-x-[0.12rem] px-3">
          {Array.from({ length: totalSegments }).map((_, i) => (
            <div
              key={i}
              className={`h-[55%] w-full transition-colors duration-150 ease-in-out ${
                i < filledSegments ? "bg-[#F40004]" : "bg-red-900/40"
              }`}
              style={{ transform: "skewX(-45deg)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  pairsCount,
  activeIndex,
  onSelect,
}) => (
  <div className="fixed right-[2%] top-0 z-50 flex h-full w-4 flex-col items-center justify-center">
    <div className="relative h-3/4">
      {Array.from({ length: pairsCount }).map((_, index) => (
        <div
          key={index}
          onClick={() => onSelect(index)}
          className={`absolute left-1/2 h-10 w-3 -translate-x-1/2 cursor-pointer border-l-2 transition-all duration-300 ${activeIndex === index ? "border-[#F40004]" : "border-[#5D2DE6]"}`}
          style={{ top: `${(100 / (pairsCount + 1)) * (index + 1)}%` }}
        />
      ))}
    </div>
  </div>
);

export default function EventPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventPairs, setEventPairs] = useState<EventType[][]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  // Fetch modules from backend
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

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // This consolidated effect handles data processing, ref creation, and observer logic.
  useEffect(() => {
    // Transform modules to events format
    const events: EventType[] = modules.map((module) => ({
      id: module.id,
      name: module.name,
      year: "2025",
      imageUrl: module.coverImage,
    }));

    const pairs = chunkArray(events, 2);
    setEventPairs(pairs);

    const numSections = isMobile ? 2 : pairs.length + 1;
    sectionRefs.current = Array.from<HTMLDivElement | null>({
      length: numSections,
    }).fill(null);

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisibleEntry = entries.reduce(
          (prev, current) => {
            if (!prev) return current.isIntersecting ? current : null;
            return current.isIntersecting &&
              current.intersectionRatio > prev.intersectionRatio
              ? current
              : prev;
          },
          null as IntersectionObserverEntry | null,
        );

        if (mostVisibleEntry) {
          const index = sectionRefs.current.indexOf(
            mostVisibleEntry.target as HTMLDivElement,
          );
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      },
      { threshold: [0.4, 0.5, 0.6] },
    );

    const timeoutId = setTimeout(() => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile, modules]);

  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!isMobile || !scrollContainer) return;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };
    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  // Transform modules to events for rendering
  const events: EventType[] = modules.map((module) => ({
    id: module.id,
    name: module.name,
    year: "2025",
    imageUrl: module.coverImage,
  }));

  if (isLoading) {
    return (
      <main className="relative flex h-screen items-center justify-center bg-black">
        <div className="font-nyxerin text-xl tracking-widest text-white">
          Loading modules...
        </div>
      </main>
    );
  }

  return (
    <main className="relative isolate bg-black">
      <style jsx global>{`
        html,
        body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .small-bounce {
          animation: smallBounce 1.6s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes smallBounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>

      {!isMobile && (
        <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center">
          <Image
            src="/x.png"
            alt="Background decoration"
            width={600}
            height={600}
            className="opacity-8 rounded-lg"
          />
          <Image
            src="/xshad.png"
            alt="Background shadow"
            width={600}
            height={600}
            className="absolute left-[50%] w-[40%] -translate-x-[50%]"
          />
          <Bars className="z-10" />
        </div>
      )}

      <div className="hide-scrollbar h-screen w-full snap-y snap-mandatory overflow-y-auto scroll-smooth">
        {isMobile ? (
          <>
            <GalleryAnimation
              ref={(el) => {
                if (el) sectionRefs.current[0] = el;
              }}
              onScrollClick={() => scrollToSection(1)}
            />
            <div
              ref={(el) => {
                if (el) sectionRefs.current[1] = el;
              }}
              className="relative h-screen w-full flex-shrink-0 snap-start bg-cover bg-center"
              style={{ backgroundImage: "url('/grid.png')" }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center space-y-4 p-4"> 
                {/* <h3 className="text-white font-nyxerin tracking-widest text-2xl">SELECT THE EVENT</h3> */}
                <div
                  ref={mobileScrollRef}
                  className="hide-scrollbar flex w-full snap-x snap-mandatory items-center overflow-x-auto py-4"
                >
                  {events.map((event) => (
                    <MobileEventCard key={event.id} event={event} />
                  ))}
                </div>
                <p className="font-mono text-xs tracking-widest text-white/50">
                  ⟵ SCROLL SIDEWAYS ⟶
                </p>
                <MobileProgressBar progress={scrollProgress} />
              </div>
            </div>
          </>
        ) : (
          <>
            <GalleryAnimation
              ref={(el) => {
                if (el) sectionRefs.current[0] = el;
              }}
              onScrollClick={() => scrollToSection(1)}
            />
            {eventPairs.map((pair, index) => (
              <div
                key={pair[0]?.id ?? index}
                ref={(el) => {
                  if (el) sectionRefs.current[index + 1] = el;
                }}
                className="relative flex h-screen w-full flex-shrink-0 snap-start items-center justify-center bg-transparent"
              >
                <div className="relative z-10 h-full w-full">
                  {pair[0] && <EventCard event={pair[0]} position="top-left" />}
                  {pair[1] && (
                    <EventCard event={pair[1]} position="bottom-right" />
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {!isMobile && (
        <div
          className={`transition-opacity duration-500 ${activeIndex > 0 ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          {eventPairs.length > 0 && (
            <CustomScrollbar
              pairsCount={eventPairs.length}
              activeIndex={activeIndex - 1}
              onSelect={(index) => scrollToSection(index + 1)}
            />
          )}
        </div>
      )}
    </main>
  );
}
