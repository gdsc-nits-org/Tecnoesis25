"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const sponsors = [
  {
    src: "/sponsors/amul-logo.png",
    alt: "Amul",
    url: "https://amul.com/",
    bg: "/sponsors/sponsor-bg.png",
  },
  {
    src: "/sponsors/amul-logo.png",
    alt: "Amul",
    url: "https://amul.com/",
    bg: "/sponsors/sponsor-bg.png",
  },
  {
    src: "/sponsors/amul-logo.png",
    alt: "Amul",
    url: "https://amul.com/",
    bg: "/sponsors/sponsor-bg.png",
  },
  {
    src: "/sponsors/amul-logo.png",
    alt: "Amul",
    url: "https://amul.com/",
    bg: "/sponsors/sponsor-bg.png",
  },
  {
    src: "/sponsors/amul-logo.png",
    alt: "Amul",
    url: "https://amul.com/",
    bg: "/sponsors/sponsor-bg.png",
  },
  {
    src: "/sponsors/amul-logo.png",
    alt: "Amul",
    url: "https://amul.com/",
    bg: "/sponsors/sponsor-bg.png",
  },
  {
    src: "/sponsors/amul-logo.png",
    alt: "Amul",
    url: "https://amul.com/",
    bg: "/sponsors/sponsor-bg.png",
  },
  {
    src: "/sponsors/amul-logo.png",
    alt: "Amul",
    url: "https://amul.com/",
    bg: "/sponsors/sponsor-bg.png",
  },
];

const SponsorHome: React.FC = () => {
  const topSponsors = sponsors.slice(0, 4);
  const bottomSponsors = sponsors.slice(4, 8);

  return (
    <section
      id="sponsors"
      className="w-full min-h-screen bg-black flex flex-col items-center justify-center py-10 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="order-1 sm:order-1 md:order-2 lg:order-2 flex justify-center mb-8">
        <Image
          src="/sponsors/SPONSORS.png"
          alt="Sponsors"
          width={661}
          height={52}
          className="w-[240px] sm:w-[400px] md:w-[400px] lg:w-[500px] h-auto"
        />
      </div>

      <div className="order-2 sm:order-2 md:order-1 lg:order-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[31px] w-full max-w-[1696px] mb-8">
        {topSponsors.map((sponsor, index) => (
          <SponsorCard key={index} sponsor={sponsor} />
        ))}
      </div>

      <div className="order-3 sm:order-3 md:order-3 lg:order-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[31px] w-full max-w-[1696px]">
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
    <div className="absolute inset-0 z-0 transition-all duration-500">
      <Image
        src="/sponsors/sponsors-bg.svg"
        alt="Sponsor Background"
        fill
        className="object-cover transition-all duration-500
                   group-hover:grayscale group-hover:brightness-200"
      />
    </div>

    <div className="absolute inset-0 z-5 bg-transparent
                    group-hover:bg-black/70 transition-colors duration-500"></div>

    <Image
      src={sponsor.src}
      alt={sponsor.alt}
      width={240}
      height={270}
      className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 z-20
                 w-[100px] h-[113px] sm:w-[140px] sm:h-[160px] md:w-[180px] md:h-[203px] lg:w-[200px] lg:h-[225px]"
    />
  </Link>
);

export default SponsorHome;
