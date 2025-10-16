"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import RegisterButton from "./RegisterButton";

const NavbarDesktop = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const isAnyHovered = hoverIndex !== null;

  return (
    <nav className="fixed top-0 h-[6rem] flex justify-between items-center bg-transparent w-full px-6 z-50">

      <div className="flex items-center">
        <Image src="/TechnoLogo.svg" alt="TechnoLogo" width={250} height={40} />
      </div>



      <div
        className={`flex items-center  rounded-lg transition-all duration-500 ease-in-out ${isAnyHovered ? "gap-8 xl:gap-10 px-4 pt-6 " : "gap-6 xl:gap-8 px-2 pt-4"
          }`}
      >
        {NavDetails.map((item, index) => {
          const isActive = index === activeIndex;
          const isHovered = index === hoverIndex;

          const imgSrc = isActive
            ? item.clickedImg
            : isHovered
              ? item.hoverImg
              : item.defaultImg;

          const shouldHighlight = isActive || isHovered;

          return (
            <Link
              key={index}
              href={item.link}
              onClick={() => {
                setActiveIndex(index);
                setHoverIndex(null);
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="flex flex-col items-center transition-all duration-500 ease-in-out cursor-pointer"
            >

              <Image
                src={imgSrc}
                alt={item.name}
                width={50}
                height={50}
                className={`transition-transform duration-500 ease-in-out ${shouldHighlight ? "scale-125 opacity-100" : "scale-100 opacity-90"
                  }`}
              />


              <span
                className={`text-[#FF9595] text-sm mt-2 font-semibold font-nyxerin transition-all max-w-[80px] text-wrap duration-500 ease-in-out transform ${shouldHighlight
                    ? "opacity-100 mt-2 translate-y-0"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}

      </div>

      <div className=" px-4 py-1 rounded-md text-black font-semibold">
        <RegisterButton />
      </div>
    </nav>
  );
};

const NavDetails = [
  {
    name: "Home",
    link: "/",
    defaultImg: "/ItemState1.svg",
    hoverImg: "/ItemState2.svg",
    clickedImg: "/ItemState3.svg",
  },
  {
    name: "About",
    link: "/about",
    defaultImg: "/ItemState1.svg",
    hoverImg: "/ItemState2.svg",
    clickedImg: "/ItemState3.svg",
  },
  {
    name: "Events",
    link: "/events",
    defaultImg: "/ItemState1.svg",
    hoverImg: "/ItemState2.svg",
    clickedImg: "/ItemState3.svg",
  },
  {
    name: "Gallery",
    link: "/gallery",
    defaultImg: "/ItemState1.svg",
    hoverImg: "/ItemState2.svg",
    clickedImg: "/ItemState3.svg",
  },
  {
    name: "Team",
    link: "/team",
    defaultImg: "/ItemState1.svg",
    hoverImg: "/ItemState2.svg",
    clickedImg: "/ItemState3.svg",
  },
];

export default NavbarDesktop;
