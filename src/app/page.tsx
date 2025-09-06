"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Model from "~/components/Model";
import Countdown from "~/components/Countdown";
import Loader from "~/components/Loader";
import Tecnoesis from "~/components/Tecno";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import SocialIcons from "~/components/LandingFooter";
import DynamicMusicButton from "~/components/DynamicMusicButton";

export default function Page() {
  const [showBottomElements, setShowBottomElements] = useState(false);
  const [isMount, setIsMount] = useState(false);
  useEffect(() => setIsMount(true), []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBottomElements(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicSrc = "https://d3f6voaditlmqg.cloudfront.net/bgm.mp4";

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
    <div className="h-screen w-screen bg-black">
      {showBottomElements && (
        <div
          className={`animate-fade-in absolute -top-[50px] left-[50%] z-${isMobile ? 0 : 20} h-80 w-[50vw] -translate-x-[50%] bg-transparent`}
        >
          <Tecnoesis bigScreen={!isMobile} />
        </div>
      )}
      <Loader />
      <Model />
      {showBottomElements && (
        <>
          <div className="animate-fade-in pointer-events-none fixed bottom-8 left-0 right-0 -z-0 flex h-60 w-screen justify-center">
            {isMobile ? (
              <Image
                className="absolute bottom-12 h-full w-full  scale-[2] select-none"
                src="https://d3f6voaditlmqg.cloudfront.net/abc.svg"
                width={300}
                height={100}
                alt="fkadshj"
              />
            ) : (
              <Image
                className="absolute bottom-0 h-full w-full select-none"
                src="https://d3f6voaditlmqg.cloudfront.net/abc.svg"
                width={300}
                height={100}
                alt="fkadshj"
              />
            )}
          </div>
          {isMobile && (
            <div className="absolute bottom-5 z-50 flex w-full justify-center gap-10">
              <Link
                href="https://www.instagram.com/tecnoesis.nits/"
                target="_blank"
                rel="noopener noreferrer"
                className="tron-icon"
              >
                <FaInstagram className="icon" />
              </Link>
              {/*  */}
              <div className=" z-50 scale-75 items-center justify-center transition-all duration-300 ease-out hover:scale-90 md:scale-100 md:hover:scale-110">
                <audio ref={audioRef} loop preload="none" />
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-2 px-5 py-2 "
                  aria-label={
                    isPlaying
                      ? "Pause background music"
                      : "Play background music"
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

              <Link
                href="https://www.facebook.com/tecnoesis.nits"
                target="_blank"
                rel="noopener noreferrer"
                className="tron-icon"
              >
                <FaFacebookF className="icon" />
              </Link>
            </div>
          )}
          {!isMobile && <SocialIcons />}
          {!isMobile && <DynamicMusicButton />}

          <div className="animate-fade-in flex flex-col">
            <Countdown />
          </div>
        </>
      )}
    </div>
  );
}
