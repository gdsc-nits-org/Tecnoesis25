"use client";
import photos from "../../../../data/sparkGallery.json";
import { useState, useEffect } from "react";

interface CardProps {
    id: number;
    url: string;
}

const Card = ({ url }: CardProps) => {
    return (
        <div className="w-40 h-40 md:w-[18rem] md:h-[18rem] flex-shrink-0 p-2 transition-transform duration-300">
            <img src={url} className="object-cover w-full h-full rounded-md" />
        </div>
    );
};

const SparkGalleryMobile = () => {
    return (
        <div className="w-full overflow-x-auto py-4 scrollbar-hide">
            <div className="flex gap-4 px-4 snap-x snap-mandatory">
                {photos.photos.map((photo: any) => (
                    <div key={photo.id} className="snap-start">
                        <Card id={photo.id} url={photo.url} />
                    </div>
                ))}
            </div>
        </div>
    );
};
const SparkGalleryDesktop = () => {
    const [scrollX, setScrollX] = useState(0);

    const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        const container = event.currentTarget;
        container.scrollLeft += event.deltaY * 0.1; // reduce scroll speed
        setScrollX(container.scrollLeft);
    };

    return (
        <div
            className="relative w-[60%] overflow-x-auto overflow-y-hidden py-4 scrollbar-hide"
            onWheel={handleScroll}
            style={{
                /* Radial gradient mask for fade on all edges */
                WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 20%, transparent 100%)",
                maskImage:
                    "radial-gradient(ellipse at center, black 20%, transparent 100%)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",

                /* Disable scroll inertia and spring/bounce */
                scrollBehavior: "auto",
                // Use 'overscrollBehaviorX' for horizontal axis specifically
                // 'none' prevents scroll chaining and the rubber-banding/spring effect.
                overscrollBehaviorX: "none", 
                overscrollBehavior: "none", // Fallback/general
                WebkitOverflowScrolling: "auto",
            }}
        >
            <div className="flex gap-4 h-[25rem] px-4 relative">
                {photos.photos.map((photo: any, idx: number) => {
                    const diagonalShift = scrollX * 2;
                    const yShift = -scrollX * 1;
                    const baseY = idx * 100;

                    return (
                        <div
                            key={photo.id}
                            className="snap-start transition-transform duration-300 ease-out"
                            style={{
                                transform: `translate(${-diagonalShift}px, ${baseY + yShift}px)`,
                            }}
                        >
                            <Card id={photo.id} url={photo.url} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const SparkPage = () => {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <div className="text-[#ffffff] flex justify-center items-center min-h-screen absolute top-0 w-screen overflow-x-hidden">
            <div className="relative top-0 flex flex-col items-center justify-center w-full h-full">
                <h1
                    className="relative translate-x-0 md:translate-x-72 top-0 right-0 text-center md:text-right bg-clip-text text-transparent font-nyxerin"
                    style={{
                        backgroundImage:
                            "linear-gradient(90deg, #520095 0%, #B46EFF 44.31%, #6200A9 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "400",
                    }}
                >
                    PHOTO
                    <br />
                    GALLERY
                </h1>
                {isMobile ? <SparkGalleryMobile /> : <SparkGalleryDesktop />}
            </div>
        </div>
    );
};

export default SparkPage;
