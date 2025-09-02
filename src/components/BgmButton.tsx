"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const BgmButton: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Audio play failed:", err));
    }
  };

  return (
    <div className="flex fixed scale-75 hover:scale-90 md:scale-100 md:hover:scale-110  bottom-40 md:bottom-14 right-0 md:right-3 items-center justify-center transition-all duration-300 ease-out">
    
      <audio ref={audioRef} loop>
        <source src="/bgm.mp4" type="audio/mpeg" />
      </audio>

    
      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-5 py-2 "
      >
        {isPlaying ? (
          <>
            <Image src="/playButton.svg" alt="Play Buttoon" width={100} height={100}/>
          </>
        ) : (
          <>
            <Image src="/pauseButton.svg" alt="Pause Buttoon" width={100} height={100}/>
          </>
        )}
      </button>
    </div>
  );
};

export default BgmButton;
