"use client";

import Image from "next/image";
import MarqueeComponent from "./MarqueeComponent";

const PreviousSponsors: React.FC = () => {
  return (
    <div className="w-screen bg-black flex flex-col items-center py-6 overflow-hidden">

      <div className="w-full px-4 mb-6 flex justify-center">
        <Image
          src="/past-sponsor-logos/PreviousSponsors.png"
          alt="Previous Sponsors"
          width={800}
          height={35}
          className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-auto drop-shadow-lg"
        />
      </div>

      <div className="w-full overflow-hidden mb-4">
        <MarqueeComponent set={1} direction="left" />
      </div>

      <div className="w-full overflow-hidden">
        <MarqueeComponent set={2} direction="right" />
      </div>
    </div>
  );
};

export default PreviousSponsors;
