'use client';
import Image from "next/image";

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black">
            <style jsx>{`
                @keyframes flicker {
                    0%, 100% {
                        opacity: 1;
                        text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000;
                    }
                    10%, 30%, 50%, 70%, 90% {
                        opacity: 0.8;
                        text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000;
                    }
                    20%, 40%, 60%, 80% {
                        opacity: 1;
                        text-shadow: 0 0 15px #ff0000, 0 0 25px #ff0000, 0 0 35px #ff0000;
                    }
                    15%, 45%, 75% {
                        opacity: 0.6;
                        text-shadow: 0 0 3px #ff0000;
                    }
                }
                .flicker-text {
                    animation: flicker 5s infinite;
                }
            `}</style>
            <div className="relative w-[340px] sm:w-[400px] md:w-[460px] aspect-square">
                {/* Base SVG loader */}
                <Image
                    src="/Loader/loader.svg"
                    alt="Loading..."
                    fill
                    priority
                    className="animate-pulse object-contain"
                />

                {/* Center GIF inside the SVG's empty middle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/Loader/loader.gif"
                        alt="Neon grid animation"
                        width={220}
                        height={220}
                        unoptimized
                        className="object-contain rounded-full"
                    />
                </div>
            </div>
            <div className="flicker-text text-center text-3xl font-bold font-bankGothik text-red-600 tracking-wide laptop:bottom-24 laptop:text-5xl">
                <h2> ENTER THE GRID</h2>
            </div>
        </div>
    );
};

export default Loader;