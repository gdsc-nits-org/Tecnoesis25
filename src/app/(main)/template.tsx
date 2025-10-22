"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  // Dispatch event when loading state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('pageLoading', { detail: { isLoading: isLoading || !minTimeElapsed } });
      window.dispatchEvent(event);
    }
  }, [isLoading, minTimeElapsed]);

  useEffect(() => {
    setIsLoading(true);
    setMinTimeElapsed(false);
    setProgress(0);

    // Progress animation
    const duration = 5000;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    const minLoadTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 5000);
    const contentLoadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => {
      clearTimeout(minLoadTimer);
      clearTimeout(contentLoadTimer);
      clearInterval(progressTimer);
    };
  }, [pathname]);

  if (isLoading || !minTimeElapsed) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black px-4">
        <style jsx>{`
          @keyframes progressBar {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
          .loading-bar {
            animation: progressBar 5s linear forwards;
          }
        `}</style>

        {/* Loading Container */}
        <div className="w-full max-w-2xl">
          {/* Loading Text */}
          <div className="mb-4 text-left font-bankGothik text-sm tracking-[0.3em] text-white md:text-base">
            LOADING...
          </div>

          {/* Loading Bar Container with Border */}
          <div className="relative rounded-lg border border-gray-600 p-1">
            {/* Corner Decorations */}
            <div className="absolute -left-1 top-1/2 h-3 w-1 -translate-y-1/2 bg-red-600"></div>
            <div className="absolute -right-1 top-1/2 h-3 w-1 -translate-y-1/2 bg-red-600"></div>

            {/* Progress Bar Background */}
            <div className="relative h-4 w-full overflow-hidden rounded bg-black/50">
              {/* Slanting Striped Progress Bar */}
              <div
                className="loading-bar h-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  background:
                    "repeating-linear-gradient(45deg, #dc2626 0px, #dc2626 15px, transparent 15px, transparent 25px)",
                  boxShadow: "0 0 10px rgba(220, 38, 38, 0.5)",
                }}
              ></div>
            </div>
          </div>

          {/* Percentage Display */}
          <div className="mt-3 text-center font-nyxerin text-lg tracking-wider text-white md:text-xl">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Quote Section */}
        <div className="absolute bottom-20 w-full max-w-4xl px-8 text-center">
          <p className="mb-4 text-left font-nyxerin text-xs leading-relaxed tracking-wide text-white">
            &ldquo;The Thing About Perfection Is That It&apos;s Unknowable.
            It&apos;s Impossible, But It&apos;s Also Right
            <br className="hidden md:block" />
            In Front Of Us All The Time&rdquo;
          </p>
          <p className="text-right font-nyxerin text-sm tracking-[0.3em] text-purple-400 md:text-lg">
            ~ KEVIN FLYNN
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
