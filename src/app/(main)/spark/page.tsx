"use client";
import photos from "../../../../data/sparkGallery.json";
import { useState, useEffect, useRef } from "react";
import SparkReveal from "~/components/spark/reveal";

interface CardProps {
    url: string;
}

const Card = ({ url }: CardProps) => {
    return (
        <div className="w-[70vw] h-[23rem] md:w-[30rem]  md:h-[18rem] flex-shrink-0  transition-transform duration-300 border-[#B050FF] border-[1px] p-[15px] bg-gradient-to-r from-[#520095] via-[#B46EFF] to-[#6200A9] rounded-md">
            <img src={url} className="object-fill w-full h-full rounded-md" />
        </div>
    );
};

const SparkGalleryMobile = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            const maxScrollLeft = scrollWidth - clientWidth;
            if (maxScrollLeft > 0) {
                setScrollProgress(scrollLeft / maxScrollLeft);
            }
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div 
                ref={containerRef}
                className="w-full overflow-x-auto py-4 scrollbar-hide"
                onScroll={handleScroll}
            >
                <div className="flex gap-4 px-4 snap-x snap-mandatory">
                    {photos.photos.map((photo) => (
                        <div key={photo.id} className="snap-start">
                            <Card url={photo.url} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-2/3 h-[.1rem] mt-4 bg-[#B050FF] rounded-full">
                <div
                    className="h-1 rounded-full bg-white"
                    style={{ width: `${scrollProgress * 100}%` }}
                ></div>
            </div>
        </div>
    );
};
const SparkGalleryDesktop = () => {
    const [scrollX, setScrollX] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        const container = event.currentTarget;
        container.scrollLeft += event.deltaY * 0.1; // reduce scroll speed
        setScrollX(container.scrollLeft);

        const { scrollWidth, clientWidth } = container;
        const maxScrollLeft = scrollWidth - clientWidth;
        if (maxScrollLeft > 0) {
            setScrollProgress(container.scrollLeft / maxScrollLeft);
        }
    };

    return (
        <div className="w-full flex flex-col items-center"
        >
            <div
                ref={containerRef}
                className="relative w-[100%] overflow-x-auto overflow-y-hidden py-4 scrollbar-hide"
                onWheel={handleScroll}
                style={{
                    WebkitMaskImage:
                        "radial-gradient(ellipse at center, black 60%, transparent 100%)",
                    maskImage:
                        "radial-gradient(ellipse at center, black 60%, transparent 100%)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                    scrollBehavior: "auto",
                    overscrollBehaviorX: "none",
                    overscrollBehavior: "none",
                    WebkitOverflowScrolling: "auto",
                }}
            >
                <div className="flex gap-4 h-[36rem] px-4 relative">
                    {photos.photos.map((photo, idx: number) => {
                        const diagonalShift = scrollX * 3.8;
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
                                <Card url={photo.url} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-1/3 h-[.1rem] relative bottom-20 mt-4 bg-[#B050FF] rounded-full">
                <div
                    className="h-1 rounded-full bg-white"
                    style={{ width: `${scrollProgress * 100}%` }}
                ></div>
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
        <div
            className="text-[#ffffff] flex mt-10 flex-col justify-center items-center min-h-screen absolute top-0 w-screen overflow-x-hidden"
        >
            <SparkReveal />
            <div className="relative top-0 flex flex-col items-center justify-center w-full h-[85vh]"
                style={{
                    backgroundImage: !isMobile ? "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.95) 100%), url(/spark/bg.gif)" : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                }}>
                <h1
                    className="relative translate-x-0 md:translate-x-[30rem] md:top-20 right-0 text-center md:text-right bg-clip-text text-transparent text-5xl font-nyxerin"
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
