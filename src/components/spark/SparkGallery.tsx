"use client";
import photos from "../../../data/sparkGallery.json";
import { useState, useEffect, useRef } from "react";

interface CardProps {
  url: string;
}

const Card = ({ url }: CardProps) => {
  return (
    <div className="h-[23rem] w-[70vw] flex-shrink-0  rounded-md border-[1px]  border-[#B050FF] bg-gradient-to-r from-[#520095] via-[#B46EFF] to-[#6200A9] p-[15px] transition-transform duration-300 md:h-[20rem] md:w-[32rem]">
      <img src={url} className="h-full w-full rounded-md object-cover" />
    </div>
  );
};

const SparkGalleryMobile = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft > 0) {
        setScrollProgress(scrollLeft / maxScrollLeft);
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div
        ref={containerRef}
        className="scrollbar-hide w-full overflow-x-auto py-4"
        onScroll={handleScroll}
      >
        <div className="flex snap-x snap-mandatory gap-4 px-4">
          {photos.photos.map((photo) => (
            <div key={photo.id} className="snap-start">
              <Card url={photo.url} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 h-[.1rem] w-2/3 rounded-full bg-[#B050FF]">
        <div
          className="h-1 rounded-full bg-white"
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
const SparkGalleryDesktop = () => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null); // For throttling wheel events

  /**
   * Handles the wheel event to trigger smooth horizontal "paging" scroll.
   */
  const handleWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    // Prevent default vertical scroll behavior
    event.preventDefault();

    const container = event.currentTarget;
    if (!container) return;

    // If a scroll is already in progress (within the timeout), ignore this event
    if (scrollTimeout.current) {
      return;
    }

    const { scrollWidth, clientWidth, scrollLeft } = container;
    const maxScrollLeft = scrollWidth - clientWidth;

    const remInPixels = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const scrollAmountInRem = 39 * 0.2; // 38rem total
    const scrollAmount = scrollAmountInRem * remInPixels; // Convert 38rem to pixels

    // Add a check for a valid scroll amount
    if (isNaN(scrollAmount) || scrollAmount <= 0) {
      // This should not happen with hardcoded values, but good to check.
      console.warn(
        "SparkGalleryDesktop: Could not calculate a valid scroll amount from rem.",
      );
      return;
    }

    let newScrollLeft = scrollLeft;

    if (event.deltaY > 0) {
      // --- Scrolling forward (down wheel) ---
      if (scrollLeft <= 6) {
        newScrollLeft = scrollLeft + scrollAmount * 0.25;
      } else newScrollLeft = scrollLeft + scrollAmount;

      // --- Boundary Check: End of Scroll ---
      if (newScrollLeft >= maxScrollLeft) {
        newScrollLeft = maxScrollLeft; // Clamp to max

        // If we are already at the end, trigger scroll to footer
        if (scrollLeft >= maxScrollLeft - 1) {
          // -1 for float precision
          const footElement = document.getElementById("foot");
          if (footElement) {
            footElement.scrollIntoView({ behavior: "smooth" });
          }
          return; // Stop further execution
        }
      }
    } else if (event.deltaY < 0) {
      // --- Scrolling backward (up wheel) ---
      newScrollLeft = scrollLeft - scrollAmount;

      // --- Boundary Check: Start of Scroll ---
      if (newScrollLeft <= 0) {
        const sparkElement = document.getElementById("reveal");
        if (sparkElement) {
          sparkElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }

    // --- Apply the smooth scroll ---
    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    // --- Throttle ---
    // Block new wheel events for 500ms to let the scroll animation play
    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
    }, 500); // Adjust timeout as needed
  };

  /**
   * Handles the onScroll event to update state (progress bar, parallax)
   * as the container scrolls.
   */
  const handleScrollUpdates = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollWidth, clientWidth, scrollLeft } = container;
    const maxScrollLeft = scrollWidth - clientWidth;

    // Update state based on the current scroll position
    setScrollX(scrollLeft);

    if (maxScrollLeft > 0) {
      setScrollProgress(scrollLeft / maxScrollLeft);
    } else {
      setScrollProgress(0);
    }
  };

  return (
    <div className="absolute flex h-screen w-full flex-col items-center" id="gallery">
      <div className="relative h-screen w-[100%]">
        <div
          ref={containerRef}
          // We now use onWheel for triggering scrolls and onScroll for updating state
          className="scrollbar-hide relative w-full overflow-x-auto overflow-y-hidden overscroll-none scroll-auto py-4 pt-28"
          onWheel={handleWheelScroll} // Renamed to clarify it handles the wheel trigger
          onScroll={handleScrollUpdates} // Added onScroll listener for state updates
          style={{
            WebkitOverflowScrolling: "auto",
          }}
        >
          {/* Your scrolling content */}
          <div className="relative flex h-[36rem] gap-24 px-4 w-screen">
            {/* Assuming 'photos' is defined and has a 'photos' array */}
            {photos.photos.map((photo: {id:string,url:string}, idx: number) => {
              const diagonalShift = scrollX * 3.8;
              const yShift = -scrollX * 0.8;
              const baseY = idx * 100;

              return (
                <div
                  key={photo.id}
                  className="snap-start transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate(${-diagonalShift}px, ${baseY + yShift}px)`,
                  }}
                >
                  <Card url={photo.url} />
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_black_85%)] h-screen w-full"
          aria-hidden="true"
        />
        {/* ------------------------- */}
      </div>

      {/* Scrollbar (unchanged) */}
      <div className="relative bottom-20 mt-4 h-[.1rem] w-1/3 rounded-full bg-[#B050FF]">
        <div
          className="h-1 rounded-full bg-white"
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
const SparkGallery = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center overflow-x-hidden text-[#ffffff]">
      <div
        className="flex h-screen w-full flex-col items-center justify-center"
        style={{
          backgroundImage: !isMobile
            ? "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.95) 100%), url(/spark/bg.gif)"
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {isMobile ? <SparkGalleryMobile /> : <SparkGalleryDesktop />}
        <h1
          className="absolute right-auto top-16 bg-clip-text  text-center font-nyxerin text-5xl text-transparent md:right-20 md:top-20 md:translate-x-0 md:text-right"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #520095 0%, #B46EFF 44.31%, #6200A9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "400",
          }}
        >
          PHOTO
          <br />
          GALLERY
        </h1>
      </div>
    </div>
  );
};

export default SparkGallery;
