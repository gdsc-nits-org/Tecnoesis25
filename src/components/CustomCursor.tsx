"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = "0";
    };

    // Add scale effect on click
    const handleMouseDown = () => {
      if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    };

    const handleMouseUp = () => {
      if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(1)";
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" style={{ opacity: 0, transition: "transform 0.15s ease, opacity 0.3s ease" }}>
      <div className="cursor-ring">
        <div className="cursor-dot"></div>
      </div>
      <div className="cursor-arc"></div>
    </div>
  );
}
