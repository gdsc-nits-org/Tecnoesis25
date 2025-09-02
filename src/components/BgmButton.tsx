"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const BgmButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicSrc = "/bgm.mp4"; 

  const togglePlay = () => {
    if (!isInitialized) {
      if (audioRef.current) {
        audioRef.current.src = musicSrc;
        audioRef.current.load();
      }
      setIsInitialized(true);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isInitialized) {
      if (isPlaying) {
        audioRef.current?.play().catch((error) => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current?.pause();
      }
    }
  }, [isPlaying, isInitialized]);

  return (
    <div className="flex fixed scale-75 hover:scale-90 md:scale-100 md:hover:scale-110 bottom-40 md:bottom-14 right-0 md:right-3 items-center justify-center transition-all duration-300 ease-out z-50">
      
      <audio ref={audioRef} loop preload="none" />

      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-5 py-2 "
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        {!isPlaying ? (
          <Image
            src="/pauseButton.svg"
            alt="Pause Button"
            width={100}
            height={100}
          />
        ) : (
          <Image
            src="/playButton.svg"
            alt="Play Button"
            width={100}
            height={100}
          />
        )}
      </button>
    </div>
  );
};

export default BgmButton;