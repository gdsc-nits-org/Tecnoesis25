"use client";

import { isMobile } from "react-device-detect";
import useGlobalBgm from "~/hooks/useGlobalBgm";
import Image from "next/image";

const BgmButton: React.FC = () => {
  const { isPlaying, toggle } = useGlobalBgm("/bgm.mp3");
  if (isMobile) return null;
  return (
    <div className="fixed bottom-40 right-0 z-50 flex scale-75 items-center justify-center transition-all duration-300 ease-out hover:scale-90 md:bottom-14 md:right-3 md:scale-100 md:hover:scale-110">
      <button
        onClick={toggle}
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
