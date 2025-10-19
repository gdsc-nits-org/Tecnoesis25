'use client';

import React, { useState, useEffect, useRef, forwardRef } from 'react';
import Image from 'next/image';

// --- 1. Define Types ---

interface EventType {
  id: number;
  name: string;
  year: string;
  imageUrl: string;
}

interface EventCardProps {
  event: EventType;
  position: 'top-left' | 'bottom-right';
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

// --- Data (20 events) ---
const events: EventType[] = [
    { id: 1, name: "CYBERIA", year: "2024", imageUrl: "/demo.png" },
    { id: 2, name: "NEXUS", year: "2024", imageUrl: "/demo.png" },
    { id: 3, name: "APERTURE", year: "2025", imageUrl: "/demo.png" },
    { id: 4, name: "VELOCITY", year: "2025", imageUrl: "/demo.png" },
    { id: 5, name: "ORION", year: "2026", imageUrl: "/demo.png" },
    { id: 6, name: "ECLIPSE", year: "2026", imageUrl: "/demo.png" },
    { id: 7, name: "AEON", year: "2027", imageUrl: "/demo.png" },
    { id: 8, name: "SPECTRA", year: "2027", imageUrl: "/demo.png" },
    { id: 9, name: "PULSAR", year: "2028", imageUrl: "/demo.png" },
    { id: 10, name: "QUASAR", year: "2028", imageUrl: "/demo.png" },
    { id: 11, name: "ZENITH", year: "2029", imageUrl: "/demo.png" },
    { id: 12, name: "HALCYON", year: "2029", imageUrl: "/demo.png" },
    { id: 13, name: "KAIROS", year: "2030", imageUrl: "/demo.png" },
    { id: 14, name: "CHRONOS", year: "2030", imageUrl: "/demo.png" },
    { id: 15, name: "AURA", year: "2031", imageUrl: "/demo.png" },
    { id: 16, name: "NOVA", year: "2031", imageUrl: "/demo.png" },
    { id: 17, name: "GENESIS", year: "2032", imageUrl: "/demo.png" },
    { id: 18, name: "PARALLAX", year: "2032", imageUrl: "/demo.png" },
    { id: 19, name: "KINETIC", year: "2033", imageUrl: "/demo.png" },
    { id: 20, name: "FUSION", year: "2033", imageUrl: "/demo.png" },
];

// --- 2. Helper Function ---
const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

// --- Child Components ---

const Bars: React.FC<BarsProps> = ({ className = '', sensitivity = 0.5 }) => {
  const [bandOffset, setBandOffset] = useState(0);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => setBandOffset(event.clientX * sensitivity);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sensitivity]);
  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{'--band-offset': `${bandOffset}px`} as React.CSSProperties}
    >
      <div className="glitch-bar-mask" />
      <style jsx>{`
        .glitch-bar-mask {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          background-color: rgba(0, 0, 0, 0.3);
          mask-image: repeating-linear-gradient(to right, #000 0, #000 1vw, transparent 1vw, transparent 2vw);
          -webkit-mask-image: repeating-linear-gradient(to right, #000 0, #000 1vw, transparent 1vw, transparent 2vw);
          mask-position-x: var(--band-offset); -webkit-mask-position-x: var(--band-offset);
        }
      `}</style>
    </div>
  );
};

const GalleryAnimation = forwardRef<HTMLDivElement, GalleryAnimationProps>(({ onScrollClick }, ref) => (
  <div ref={ref} className="h-screen w-full relative flex items-center justify-center snap-start flex-shrink-0 bg-black">
    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-70"><source src="/background.gif" type="video/mp4" /></video>
    <Bars className="z-20" />
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="text-center space-y-4">
        <h1 className="text-white text-4xl md:text-6xl tracking-widest font-nyxerin">TECNOESIS</h1>
        <h2 className="text-red-600 text-4xl md:text-7xl font-nyxerin tracking-widest">PHOTO GALLERY</h2>
      </div>
    </div>
    <div className="absolute left-[7vw] z-10"><Image src="/hand.png" alt="Left robotic hand" width={600} height={600} className="opacity-90" /></div>
    <div className="absolute right-[7vw] scale-x-[-1] z-10"><Image src="/hand.png" alt="Right robotic hand" width={600} height={600} className="opacity-90" /></div>
    <div className="absolute z-0"><Image src="/starseed-starseeds.gif" alt="Center glow" width={600} height={600} unoptimized className="opacity-80 mix-blend-screen" /></div>
    <button onClick={onScrollClick} aria-label="Scroll to next section" className="absolute left-1/2 bottom-16 -translate-x-1/2 z-50 text-white tracking-wider font-nyxerin">
      <span className="bg-black/60 backdrop-blur-sm px-6 py-2 rounded-full cursor-pointer hover:opacity-90">SCROLL UP</span>
    </button>
    <div className="absolute left-0 right-0 bottom-0 h-40 md:h-56 lg:h-72 bg-gradient-to-t from-black to-transparent pointer-events-none z-30" />
  </div>
));
GalleryAnimation.displayName = 'GalleryAnimation';

const EventCard: React.FC<EventCardProps> = ({ event, position }) => (
  <div className={`absolute small-bounce transition-transform duration-1000 w-[40%] max-w-2xl ${position === 'top-left' ? 'top-[10%] left-[8%]' : 'bottom-[10%] right-[8%]'}`}>
    <div className="relative">
      <Image src={event.imageUrl} alt={`${event.name} Visual`} width={600} height={600} className="rounded-lg border border-gray-800" />
      <div className={`absolute -top-12 w-[300px] h-[300px] ${position === 'top-left' ? '-left-7' : '-right-7'}`}>
        <Image src="/Subtract.png" alt="Event Badge" layout="fill" className={`${position === 'bottom-right' && 'scale-x-[-1]'}`} />
        <div className={`absolute top-[28px] text-white font-mono text-xs ${position === 'top-left' ? 'left-[65px]' : 'right-[65px] text-right'}`}>
          <p>{event.name}</p>
          <p>{event.year}</p>
        </div>
      </div>
    </div>
  </div>
);

const MobileEventCard: React.FC<MobileEventCardProps> = ({ event }) => (
    <div className="relative w-[70vw] max-w-sm flex-shrink-0 p-4">
        <div className="relative aspect-[3/4] p-4 border-2 border-orange-500/50 rounded-xl bg-black/30">
            <Image src={event.imageUrl} alt={event.name} layout="fill" objectFit="cover" className="rounded-md opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <p className="absolute bottom-4 left-4 text-white font-nyxerin text-3xl tracking-widest">{event.name}</p>
            <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-md backdrop-blur-sm">
                 <p className="text-white font-mono text-xs">{event.year}</p>
            </div>
        </div>
    </div>
);

const MobileProgressBar: React.FC<MobileProgressBarProps> = ({ progress }) => {
    const totalSegments = 12;
    const filledSegments = Math.round((progress / 100) * totalSegments);
    const clipPathValue = 'path("M28.88 1L10.88 16L28.88 31H163.12L181.12 16L163.12 1H18.88Z")';

    return (
        <div className="w-48 h-8 relative my-2">
            <Image
                src="/pbar.svg"
                alt="Progress bar border"
                layout="fill"
                className="absolute inset-0 z-20 pointer-events-none"
            />
            <div
                className="absolute inset-0 overflow-hidden flex justify-center"
                style={{ clipPath: clipPathValue, WebkitClipPath: clipPathValue }}
            >
                <div className="flex h-full w-[93%] items-center px-3 space-x-[0.12rem]">
                    {Array.from({ length: totalSegments }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-[55%] w-full transition-colors duration-150 ease-in-out ${
                                i < filledSegments ? 'bg-[#F40004]' : 'bg-red-900/40'
                            }`}
                            style={{ transform: 'skewX(-45deg)' }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ pairsCount, activeIndex, onSelect }) => (
  <div className="fixed top-0 right-[2%] h-full w-4 flex flex-col justify-center items-center z-50">
    <div className="h-3/4 relative">
      {Array.from({ length: pairsCount }).map((_, index) => (
        <div
          key={index}
          onClick={() => onSelect(index)}
          className={`absolute left-1/2 -translate-x-1/2 w-3 h-10 border-l-2 cursor-pointer transition-all duration-300 ${activeIndex === index ? 'border-[#F40004]' : 'border-[#5D2DE6]'}`}
          style={{ top: `${(100 / (pairsCount + 1)) * (index + 1)}%` }}
        />
      ))}
    </div>
  </div>
);

export default function EventPage() {
  const [eventPairs, setEventPairs] = useState<EventType[][]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // This consolidated effect handles data processing, ref creation, and observer logic.
  useEffect(() => {
    const pairs = chunkArray(events, 2);
    setEventPairs(pairs);
    
    const numSections = isMobile ? 2 : pairs.length + 1;
    sectionRefs.current = Array.from<HTMLDivElement | null>({ length: numSections }).fill(null);
    
    const observer = new IntersectionObserver((entries) => {
        const mostVisibleEntry = entries.reduce((prev, current) => {
            if (!prev) return current.isIntersecting ? current : null;
            return current.isIntersecting && current.intersectionRatio > prev.intersectionRatio ? current : prev;
        }, null as IntersectionObserverEntry | null);

        if (mostVisibleEntry) {
            const index = sectionRefs.current.indexOf(mostVisibleEntry.target as HTMLDivElement);
            if (index !== -1) {
                setActiveIndex(index);
            }
        }
    }, { threshold: [0.4, 0.5, 0.6] });
  
    const timeoutId = setTimeout(() => {
      sectionRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });
    }, 100);
  
    return () => {
      clearTimeout(timeoutId);
      sectionRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile]);

  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!isMobile || !scrollContainer) return;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };
    scrollContainer.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative isolate bg-black">
      <style jsx global>{`
        html, body { scrollbar-width: none; -ms-overflow-style: none; }
        html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .small-bounce { animation: smallBounce 1.6s ease-in-out infinite; will-change: transform; }
        @keyframes smallBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      `}</style>

      {!isMobile && (
          <div className="fixed inset-0 flex justify-center items-center pointer-events-none -z-10">
            <Image src="/x.png" alt="Background decoration" width={600} height={600} className="rounded-lg opacity-8" />
            <Image src="/xshad.png" alt="Background shadow" width={600} height={600} className="w-[40%] absolute left-[50%] -translate-x-[50%]" />
            <Bars className="z-10" />
          </div>
      )}

      <div className="h-screen w-full overflow-y-auto scroll-smooth snap-y snap-mandatory hide-scrollbar">
        
        {isMobile ? (
          <>
            <GalleryAnimation ref={el => { if (el) sectionRefs.current[0] = el; }} onScrollClick={() => scrollToSection(1)} />
            <div 
              ref={el => { if (el) sectionRefs.current[1] = el; }} 
              className="h-screen w-full snap-start flex-shrink-0 relative bg-cover bg-center"
              style={{ backgroundImage: "url('/grid.png')" }}
            >
              <div className="w-full h-full flex flex-col justify-center items-center space-y-4 p-4">
                  {/* <h3 className="text-white font-nyxerin tracking-widest text-2xl">SELECT THE EVENT</h3> */}
                  <div 
                    ref={mobileScrollRef}
                    className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar items-center py-4"
                  >
                      {events.map((event) => (
                         <MobileEventCard key={event.id} event={event} />
                      ))}
                  </div>
                   <p className="text-white/50 font-mono text-xs tracking-widest">⟵ SCROLL SIDEWAYS ⟶</p>
                   <MobileProgressBar progress={scrollProgress} />
              </div>
            </div>
          </>
        ) : (
          <>
            <GalleryAnimation ref={el => { if (el) sectionRefs.current[0] = el; }} onScrollClick={() => scrollToSection(1)} />
            {eventPairs.map((pair, index) => (
              <div
                key={pair[0]?.id ?? index}
                ref={el => { if (el) sectionRefs.current[index + 1] = el; }}
                className="h-screen w-full relative flex items-center justify-center snap-start flex-shrink-0 bg-transparent"
              >
                <div className="relative z-10 w-full h-full">
                  {pair[0] && <EventCard event={pair[0]} position="top-left" />}
                  {pair[1] && <EventCard event={pair[1]} position="bottom-right" />}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {!isMobile && (
        <div className={`transition-opacity duration-500 ${activeIndex > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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

