"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import sponsors from "../../data/sponsors.json";

interface Sponsor {
  src: string;
  alt: string;
  url: string;
}

const SponsorHome: React.FC = () => {
  const topSponsors = sponsors.slice(0, 4) as Sponsor[];
  const bottomSponsors = sponsors.slice(4, 8) as Sponsor[];

  return (
    <section
      id="sponsors"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-10 md:px-8 lg:px-16"
    >
      <video
        className="absolute left-0 top-0 h-full w-full object-cover opacity-100"
        src="/sponsor_bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 order-1 mb-4 flex justify-center sm:order-1 md:order-2 md:mb-10 lg:order-2 lg:mb-14">
        <Image
          src="/sponsors/SPONSORS.png"
          alt="Sponsors"
          width={661}
          height={52}
          className="h-auto w-[240px] sm:w-[400px] md:w-[400px] lg:w-[500px]"
        />
      </div>

      <div
        className="relative z-10 order-2 mb-4 grid w-full
            grid-cols-2 gap-[31px] sm:order-2 sm:grid-cols-2 md:order-1
            md:mb-10 md:max-w-[1024px] md:grid-cols-3 lg:order-1 lg:mb-14 lg:grid-cols-4"
      >
        {topSponsors.map((sponsor, index) => (
          <SponsorCard key={index} sponsor={sponsor} />
        ))}
      </div>

      <div
        className="relative z-10 order-3 grid w-full grid-cols-2
            gap-[31px] sm:order-3 sm:grid-cols-2 md:order-3 md:max-w-[1024px]
            md:grid-cols-3 lg:order-3 lg:grid-cols-4"
      >
        {bottomSponsors.map((sponsor, index) => (
          <SponsorCard key={index} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );
};

const SponsorCard: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => (
  <Link
    href={sponsor.url}
    className="group relative flex aspect-[400.85/263.83] w-full
               items-center justify-center 
               overflow-hidden rounded-xl transition-all duration-500"
  >
    <div className="absolute inset-0 z-0">
      <Image
        src="/sponsors/sponsors-bg.svg"
        alt="Sponsor Background"
        fill
        className="object-cover opacity-100 transition-opacity duration-500 group-hover:opacity-0"
      />

      <Image
        src="/sponsors/sponsor-bg2.svg"
        alt="Sponsor Hover Background"
        fill
        className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>

    <Image
      src={sponsor.src}
      alt={sponsor.alt}
      width={240}
      height={270}
      className="z-20 h-[113px] w-[100px] object-contain transition-transform duration-500
                 ease-in-out group-hover:scale-125 sm:h-[160px] sm:w-[140px] md:h-[136px] md:w-[120px] lg:h-[180px] lg:w-[160px]"
    />
  </Link>
);

export default SponsorHome;
