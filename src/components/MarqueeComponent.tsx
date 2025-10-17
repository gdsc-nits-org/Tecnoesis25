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
  const imageSets = pastSponsors.sets;
  const imagesToShow = imageSets[set - 1] ?? imageSets[0];

  return (
    <div className="w-full bg-black">
      <Marquee
        speed={100}
        direction={direction}
        gradient={true}
        gradientColor="black"
      >
        <div className="flex gap-x-8 md:gap-x-12 lg:gap-x-18">
          {imagesToShow?.map((image, index) => (
            <div
              key={index}
              className={`flex items-center px-4 ${image.divWidths}`}
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
