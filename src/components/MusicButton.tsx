// ~/components/MusicButton.tsx (or wherever your file is located)

"use client";
import { useState, useRef, useEffect } from "react";
import { BiSolidVolumeMute, BiSolidVolumeFull } from "react-icons/bi";

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const musicSrc = "/tronmusic.mp3";

  const togglePlayPause = () => {
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
    <button
      onClick={togglePlayPause}
      className="fixed right-3 md:right-6 scale-[.75] md:scale-100 top-[75%] md:top-[85%] flex flex-col items-center space-y-6 z-50 tron-icon cursor-pointer"
      aria-label={isPlaying ? "Mute music" : "Unmute music"}
    >
      {isPlaying ? (
        <BiSolidVolumeFull className="icon" />
      ) : (
        <BiSolidVolumeMute className="icon" />
      )}

      <audio ref={audioRef} loop preload="none" />
    </button>
  );
}