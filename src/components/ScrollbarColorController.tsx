"use client";
import { useEffect } from "react";

export default function ScrollbarColorController() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      let r, g, b;

      if (scrollPercent < 50) {
        const progress = scrollPercent;
        r = 255;
        g = Math.round(255 * progress);
        b = Math.round(255 * progress);
      } else {
        const progress = (scrollPercent - 50) / 50;
        r = 255;
        g = Math.round(255 * (1 - progress));
        b = Math.round(255 * (1 - progress));
      }

      const scrollbarColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
      document.documentElement.style.setProperty(
        "--scrollbar-color",
        scrollbarColor,
      );
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
