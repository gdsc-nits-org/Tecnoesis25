// ...existing code...
"use client";
import React, { useState, useEffect, useRef } from 'react';

interface CursorGlitchBandProps {
  imageUrl: string;
  className?: string;
  sensitivity?: number;
}

const CursorGlitchBand: React.FC<CursorGlitchBandProps> = ({
  imageUrl = "/demo.png",
  className = '',
  sensitivity = 0.5
}) => {
  const [bandOffset, setBandOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const relativeX = event.clientX - containerRect.left;
        setBandOffset(relativeX * sensitivity);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [sensitivity]);

  return (
    <div
      ref={containerRef}
      className={`glitch-container ${className} h-screen w-screen`}
      // The background image is set on the main container
      style={{ backgroundImage: `url('${imageUrl}')`, '--band-offset': `${bandOffset}px` } as React.CSSProperties}
    >
      <div className="glitch-overlay-effect" />
      {/* This single div will now handle both the color and the masked glass effect */}
      <div className="glitch-bar-mask" />

      <style jsx>{`
        .glitch-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          background-size: cover;
          background-position: center;
        }

        .glitch-overlay-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          filter:
            saturate(1.5)
            hue-rotate(15deg)
            drop-shadow(1px 0 0 rgba(255, 0, 0, 0.5))
            blur(0.5px);
        }

        .glitch-bar-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
          pointer-events: none;

          /* 1. Apply the glassmorphism effect to the whole layer */
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);

          /* 2. Set a background color for the bars themselves (changed to whitish/50) */
          background-color: rgba(255, 255, 255, 0.5);

          /* 3. THE KEY: Use a mask to "cut out" the bars. */
          /* Where the mask is opaque (white), the element is visible. */
          /* Where the mask is transparent, the element is cut away. */
          mask-image: repeating-linear-gradient(
            to right,
            /* Opaque part (the bar) is 1vw wide */
            #000 0,
            #000 1.5vw,
            /* Transparent part (the space) is 1vw wide */
            transparent 1.5vw,
            transparent 3vw
          );
          -webkit-mask-image: repeating-linear-gradient(
            to right,
            #000 0,
            #000 1.5vw,
            transparent 1.5vw,
            transparent 3vw
          );

          /* 4. Move the MASK's position instead of the background's */
          mask-position-x: var(--band-offset);
          -webkit-mask-position-x: var(--band-offset);
        }
      `}</style>
    </div>
  );
};

export default CursorGlitchBand;
// ...existing code...