"use client";
import { useState, useRef } from "react";
import { BiSolidVolumeMute, BiSolidVolumeFull } from "react-icons/bi";

export default function MusicButton() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlayPause = async () => {
        if (!audioRef.current) return;
        if (isPlaying) audioRef.current.pause();
        else await audioRef.current.play();
        setIsPlaying(!isPlaying);
    };
    return (
        <div
            onClick={togglePlayPause}
            className="fixed right-3 md:right-6 scale-[.75] md:scale-100 top-[75%] md:top-[85%] flex flex-col items-center space-y-6 z-50 tron-icon cursor-pointer"
        >
            {isPlaying ? (
                <BiSolidVolumeFull className="icon" />
            ) : (
                <BiSolidVolumeMute className="icon" />
            )}
            <audio ref={audioRef} src="/tronmusic.mp3" preload="metadata" loop />
        </div>
    )
}