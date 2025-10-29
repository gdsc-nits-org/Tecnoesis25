"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Login from "../GoogleAuth";

const NavbarDesktop = () => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const navigate = useRouter();

  const isAnyHovered = hoverIndex !== null;

  // Update active index based on current pathname
  useEffect(() => {
    const currentIndex = NavDetails.findIndex((item) => item.link === pathname);
    setActiveIndex(currentIndex);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show navbar at the top of the page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed z-50 flex h-[6rem] w-full items-center justify-between bg-gradient-to-b from-black via-black/80 to-transparent px-6 transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex cursor-pointer items-center">
          <Image
            src="/TechnoLogo.svg"
            alt="TechnoLogo"
            width={250}
            height={40}
            onClick={() => navigate.push("/")}
          />
        </div>

        <div
          className={`flex flex-1 items-center justify-center rounded-lg transition-all duration-500 ease-in-out ${isAnyHovered
              ? "gap-8 px-4 pt-6 xl:gap-10 "
              : "gap-6 px-2 pt-4 xl:gap-8"
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
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className="flex cursor-pointer flex-col items-center transition-all duration-500 ease-in-out"
              >
                <Image
                  src={imgSrc}
                  alt={item.name}
                  width={50}
                  height={50}
                  className={`transition-transform duration-500 ease-in-out ${shouldHighlight
                      ? "scale-125 opacity-100"
                      : "scale-100 opacity-90"
                    }`}
                />

                <span
                  className={`mt-2 max-w-[80px] transform text-wrap font-nyxerin text-sm font-semibold text-[#FF9595] transition-all duration-500 ease-in-out ${shouldHighlight
                      ? "mt-2 translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
        {/* right spacer to keep center group truly centered */}
        <div className="w-[250px]" aria-hidden="true" >
          <Login />
        </div>
      </nav>
    </>
  );
};

const NavDetails = [
  {
    name: "Home",
    link: "/home",
    defaultImg: "/ItemState1.svg",
    hoverImg: "/ItemState2.svg",
    clickedImg: "/ItemState3.svg",
  },

  // {
  //   name: "Events",
  //   link: "/events",
  //   defaultImg: "/ItemState1.svg",
  //   hoverImg: "/ItemState2.svg",
  //   clickedImg: "/ItemState3.svg",
  // },
  {
    name: "Gallery",
    link: "/gallery",
    defaultImg: "/ItemState1.svg",
    hoverImg: "/ItemState2.svg",
    clickedImg: "/ItemState3.svg",
  },
  {
    name: "Modules",
    link: "/modules",
    defaultImg: "/ItemState1.svg",
    hoverImg: "/ItemState2.svg",
    clickedImg: "/ItemState3.svg",
  },
  {
    name: "Merchandise",
    link: "/merch",
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
