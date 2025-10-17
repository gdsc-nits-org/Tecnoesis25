"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { isMobile } from "react-device-detect";

const BgmButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicSrc = "/bgm.mp3";

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
  if (isMobile) return null;
  return (
    <div className="fixed bottom-40 right-0 z-50 flex scale-75 items-center justify-center transition-all duration-300 ease-out hover:scale-90 md:bottom-14 md:right-3 md:scale-100 md:hover:scale-110">
      <audio ref={audioRef} loop preload="none" />

      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-5 py-2 "
        aria-label={
          isPlaying ? "Pause background music" : "Play background music"
        }
      >
        {!isPlaying ? (
          <Image
            src="https://d3f6voaditlmqg.cloudfront.net/pauseButton.svg"
            alt="Pause Button"
            width={100}
            height={100}
          />
        ) : (
          <Image
            src="https://d3f6voaditlmqg.cloudfront.net/playButton.svg"
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
