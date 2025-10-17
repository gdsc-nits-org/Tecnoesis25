"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import sponsors from "../../data/sponsors.json"

const SponsorHome: React.FC = () => {
  const topSponsors = sponsors.slice(0, 4);
  const bottomSponsors = sponsors.slice(4, 8);

  return (
    <section
      id="sponsors"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-10 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
        src="/sponsor_bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 order-1 sm:order-1 md:order-2 lg:order-2 flex justify-center mb-4 md:mb-10 lg:mb-14">
        <Image
          src="/sponsors/SPONSORS.png"
          alt="Sponsors"
          width={661}
          height={52}
          className="w-[240px] sm:w-[400px] md:w-[400px] lg:w-[500px] h-auto"
        />
      </div>

      <div className="relative z-10 order-2 sm:order-2 md:order-1 lg:order-1
            grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            gap-[31px] w-full md:max-w-[1024px] mb-4 md:mb-10 lg:mb-14">
        {topSponsors.map((sponsor, index) => (
          <SponsorCard key={index} sponsor={sponsor} />
        ))}
      </div>

      <div className="relative z-10 order-3 sm:order-3 md:order-3 lg:order-3
            grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            gap-[31px] w-full md:max-w-[1024px]">
        {bottomSponsors.map((sponsor, index) => (
          <SponsorCard key={index} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );
};

const SponsorCard = ({ sponsor }: any) => (
  <Link
    href={sponsor.url}
    className="relative group flex items-center justify-center
               w-full aspect-[400.85/263.83] 
               rounded-xl overflow-hidden transition-all duration-500"
  >
    <div className="absolute inset-0 z-0">
      <Image
        src="/sponsors/sponsors-bg.svg"
        alt="Sponsor Background"
        fill
        className="object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
      />

      <Image
        src="/sponsors/sponsor-bg2.svg"
        alt="Sponsor Hover Background"
        fill
        className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
      />
    </div>

    <Image
      src={sponsor.src}
      alt={sponsor.alt}
      width={240}
      height={270}
      className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-125 z-20
                 w-[100px] h-[113px] sm:w-[140px] sm:h-[160px] md:w-[120px] md:h-[136px] lg:w-[160px] lg:h-[180px]"
    />
  </Link>
);

export default SponsorHome;
