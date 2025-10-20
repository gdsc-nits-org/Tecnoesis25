"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NavDetails = [
  { name: "Home", link: "/home" },
  { name: "Gallery", link: "/gallery" },
  // { name: "About", link: "/about" },
  // { name: "Modules", link: "/modules" },
  { name: "Team", link: "/team" },
];

export default function NavbarMobile() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const router = useRouter();
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
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black px-4">
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
        className={`fixed left-0 top-0 z-[10000000] flex w-full items-center justify-between bg-transparent px-4 `}
      >
      <div
        className={`cursor-pointertransition-transform flex h-full w-full origin-center scale-100 items-center justify-between px-2 py-3 backdrop-blur-sm transition-transform duration-300 ease-in-out sm:scale-110 md:scale-125 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <Image
          src="/TechnoLogo.svg"
          alt="TechnoLogo"
          width={200}
          height={45}
          className="object-contain"
          onClick={() => router.push("/")}
        />

        <button onClick={() => setIsOpen(true)} aria-label="Open menu">
          <Image src="/MenuIcon.svg" alt="MenuIcon" width={30} height={15} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed right-0 top-0 z-50 flex h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0a0a0a] p-6 shadow-lg"
          >
            <div className="absolute right-4 top-4">
              <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                <Image
                  src="/CrossSign.svg"
                  alt="crossIcon"
                  width={30}
                  height={15}
                />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center gap-12 text-lg  font-medium">
              {NavDetails.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={item.name}
                    className="relative pt-4"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.link}
                      onClick={() => {
                        setIsOpen(false);
                        setIsNavigating(true);
                      }}
                      className="flex cursor-pointer flex-col items-center"
                    >
                      <div className="relative flex items-center justify-center">
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="absolute h-[60px] w-[90vw] max-w-[500px]"
                          >
                            <Image
                              src="/ItemBoundary.svg"
                              alt="Boundary"
                              fill
                              className="object-contain"
                            />
                          </motion.div>
                        )}

                        <span
                          className={`font-bankGothik relative z-10 text-3xl font-semibold transition-all duration-300 ${
                            isActive ? "text-[#FF9595]" : "text-white"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* <div className="flex  min-h-48 justify-center align-middle ">
              <Image
                src="/RegisterState1.svg"
                alt="registerImage"
                height={60}
                width={250}
              />
            </div> */}
          </motion.aside>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
}