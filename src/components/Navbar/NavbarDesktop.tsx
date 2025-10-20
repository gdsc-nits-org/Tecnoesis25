"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import RegisterButton from "./RegisterButton";

const NavbarDesktop = () => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const navigate = useRouter();

  const isAnyHovered = hoverIndex !== null;

  // Update active index based on current pathname
  useEffect(() => {
    const currentIndex = NavDetails.findIndex((item) => item.link === pathname);
    setActiveIndex(currentIndex);
    setIsNavigating(false);
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
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black px-4">
          {/* Loading Container */}
          <div className="w-full max-w-2xl">
            {/* Loading Text */}
            <div className="mb-4 text-left font-bankGothik text-sm tracking-[0.3em] text-white md:text-base">
              LOADING...
            </div>

            {/* Loading Bar Container with Border */}
            <div className="relative rounded-lg border border-gray-600 p-1">
              {/* Corner Decorations */}
              <div className="absolute -left-1 top-1/2 h-3 w-1 -translate-y-1/2 bg-red-600"></div>
              <div className="absolute -right-1 top-1/2 h-3 w-1 -translate-y-1/2 bg-red-600"></div>

              {/* Progress Bar Background */}
              <div className="relative h-4 w-full overflow-hidden rounded bg-black/50">
                {/* Striped Progress Bar */}
                <div
                  className="h-full animate-pulse transition-all duration-300 ease-out"
                  style={{
                    width: '100%',
                    background: 'repeating-linear-gradient(45deg, #dc2626 0px, #dc2626 10px, #b91c1c 10px, #b91c1c 20px)',
                    boxShadow: '0 0 10px rgba(220, 38, 38, 0.5), inset 0 0 10px rgba(220, 38, 38, 0.3)'
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="absolute bottom-20 w-full max-w-4xl px-8 text-center">
            <p className="mb-4 font-bankGothik text-xs leading-relaxed tracking-wide text-white md:text-sm">
              &ldquo;The Thing About Perfection Is That It&apos;s Unknowable. It&apos;s Impossible, But It&apos;s Also Right<br className="hidden md:block" />
              In Front Of Us All The Time&rdquo;
            </p>
            <p className="font-bankGothik text-xs tracking-[0.3em] text-purple-400 md:text-sm">
              KEVIN FLYNN
            </p>
          </div>
        </div>
      )}
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
        className={`flex flex-1 items-center justify-center rounded-lg transition-all duration-500 ease-in-out ${
          isAnyHovered
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
              onClick={() => setIsNavigating(true)}
              className="flex cursor-pointer flex-col items-center transition-all duration-500 ease-in-out"
            >
              <Image
                src={imgSrc}
                alt={item.name}
                width={50}
                height={50}
                className={`transition-transform duration-500 ease-in-out ${
                  shouldHighlight
                    ? "scale-125 opacity-100"
                    : "scale-100 opacity-90"
                }`}
              />

              <span
                className={`mt-2 max-w-[80px] transform text-wrap font-nyxerin text-sm font-semibold text-[#FF9595] transition-all duration-500 ease-in-out ${
                  shouldHighlight
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
      <div className="w-[250px]" aria-hidden="true" />
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
  //   name: "About",
  //   link: "/home#about",
  //   defaultImg: "/ItemState1.svg",
  //   hoverImg: "/ItemState2.svg",
  //   clickedImg: "/ItemState3.svg",
  // },
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
    name: "Team",
    link: "/team",
    defaultImg: "/ItemState1.svg",
    hoverImg: "/ItemState2.svg",
    clickedImg: "/ItemState3.svg",
  },
];

export default NavbarDesktop;