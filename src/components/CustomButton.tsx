"use client";
import React, { useState } from "react";

interface CustomButtonProps {
  text: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  width?: number | "auto";
  height?: number;
  fontSize?: number;
  href?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  className = "",
  width = "auto",
  height = 60,
  fontSize = 16,
  href,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate padding based on text length to maintain the hexagonal shape
  const padding = width === "auto" ? "0 60px" : "0";
  const minWidth = width === "auto" ? "300px" : `${width}px`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (href) {
      window.open(href, '_blank');
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative transition-transform duration-300 ease-in-out ${isHovered ? "scale-110" : "scale-100"} ${className}`}
      style={{
        width: width === "auto" ? "auto" : `${width}px`,
        minWidth: minWidth,
        maxWidth: "90vw",
        height: `${height}px`,
        padding: padding,
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {/* Main button shape with clip-path */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          clipPath:
            "polygon(39.4% 14.8%, 42.5% 21.7%, 42.9% 21.7%, 49.9% 22.2%, 93.6% 22.2%, 93.6% 47.3%, 77.6% 85.3%, 60.5% 85.3%, 57.7% 78.7%, 57.5% 78.3%, 57.2% 78.3%, 49.9% 78.1%, 6.2% 78.1%, 6.2% 52.7%, 22.2% 14.8%, 39.4% 14.8%)",
        }}
      >
        {/* Background with blur effect */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(9.85px)",
            backgroundColor: isHovered
              ? "rgba(202, 0, 3, 0.3)"
              : "rgba(202, 0, 3, 0.2)",
          }}
        />

        {/* Main fill */}
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: isHovered ? "#CA0003" : "transparent",
            opacity: isHovered ? 0.4 : 0.2,
          }}
        />

        {/* Stroke */}
        <div
          className="absolute inset-0"
          style={{
            background: "transparent",
            border: "4px solid #680002",
            clipPath:
              "polygon(39.4% 14.8%, 42.5% 21.7%, 42.9% 21.7%, 49.9% 22.2%, 93.6% 22.2%, 93.6% 47.3%, 77.6% 85.3%, 60.5% 85.3%, 57.7% 78.7%, 57.5% 78.3%, 57.2% 78.3%, 49.9% 78.1%, 6.2% 78.1%, 6.2% 52.7%, 22.2% 14.8%, 39.4% 14.8%)",
          }}
        />
      </div>

      {/* Top left diagonal bar - matches SVG path */}
      <div
        className="absolute transition-all duration-300"
        style={{
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          clipPath:
            "polygon(3.8% 79.5%, 0% 79.5%, 0% 47.1%, 19.8% 0%, 33.5% 0%, 37.8% 9.5%, 20.2% 9.5%, 3.8% 48.3%)",
          background: isHovered
            ? "linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #ffffff 100%)"
            : "linear-gradient(135deg, #A50000 0%, #1a0000 50%, #A50000 100%)",
        }}
      />

      {/* Bottom right diagonal bar - matches SVG path */}
      <div
        className="absolute transition-all duration-300"
        style={{
          bottom: "0",
          right: "0",
          width: "100%",
          height: "100%",
          clipPath:
            "polygon(96.1% 20.4%, 100% 20.4%, 100% 52.8%, 80.1% 100%, 66.4% 100%, 62.1% 90.4%, 79.7% 90.4%, 96.1% 51.6%)",
          background: isHovered
            ? "linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #ffffff 100%)"
            : "linear-gradient(135deg, #A50000 0%, #1a0000 50%, #A50000 100%)",
        }}
      />

      {/* Top left shadow overlay */}
      <div
        className="absolute"
        style={{
          top: "0",
          left: "0",
          width: "22%",
          height: "10%",
          clipPath:
            "polygon(0% 47.1%, 3.8% 48.9%, 20.3% 9.5%, 19.8% 0%, 0% 47.1%)",
          background: "#570001",
          opacity: 0.7,
        }}
      />

      {/* Bottom right shadow overlay */}
      <div
        className="absolute"
        style={{
          bottom: "0",
          right: "0",
          width: "22%",
          height: "10%",
          clipPath:
            "polygon(79.7% 90.4%, 80.1% 100%, 100% 52.9%, 95.9% 51.5%, 79.7% 90.4%)",
          background: "#570001",
          opacity: 0.7,
        }}
      />

      {/* Text */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden whitespace-nowrap px-6 font-bankGothik text-xs transition-all duration-300 "
        style={{
          color: "white",
          fontWeight: "bold",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textShadow: isHovered ? "0 0 10px rgba(255,255,255,0.5)" : "none",
        }}
      >
        <span className="truncate">{text}</span>
      </div>
    </button>
  );
};

export default CustomButton;
