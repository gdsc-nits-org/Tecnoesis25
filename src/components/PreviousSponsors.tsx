"use client";

import Image from "next/image";
import MarqueeComponent from "./MarqueeComponent";

const PreviousSponsors: React.FC = () => {
  return (
    <div className="flex w-screen flex-col items-center overflow-hidden bg-black py-6 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
      <div className="mb-8 flex w-full justify-center px-4 sm:mb-10 md:mb-12">
        <Image
          src="/past-sponsor-logos/PreviousSponsors.png"
          alt="Previous Sponsors"
          width={800}
          height={35}
          className="h-auto w-[80%] drop-shadow-lg sm:w-[70%] md:w-[60%] lg:w-[50%]"
        />
      </div>

      <div className="mb-6 w-full overflow-hidden sm:mb-8">
        <MarqueeComponent set={1} direction="left" />
      </div>

      <div className="w-full overflow-hidden">
        <MarqueeComponent set={2} direction="right" />
      </div>
    </div>
  );
};

export default PreviousSponsors;
