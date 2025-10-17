"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import pastSponsors from "../../data/pastSponsors.json";

interface MarqueeComponentProps {
  direction?: "left" | "right";
  set: number;
}

const MarqueeComponent: React.FC<MarqueeComponentProps> = ({
  direction = "left",
  set,
}) => {
  const imageSets = pastSponsors.sets ?? [];
  const imagesToShow = imageSets?.[set - 1] ?? imageSets?.[0] ?? [];

  // Duplicate images for seamless scrolling
  const repeatedImages = [...imagesToShow, ...imagesToShow];

  return (
    <div className="w-full bg-black overflow-hidden">
      <Marquee
        speed={100}
        direction={direction}
        gradient={false}
        pauseOnHover={false}
      >
        <div className="flex gap-x-10 md:gap-x-14 lg:gap-x-20">
          {repeatedImages.map((image, index) => (
            <div
              key={index}
              className={`flex items-center ${image.divWidths} scale-105`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;
