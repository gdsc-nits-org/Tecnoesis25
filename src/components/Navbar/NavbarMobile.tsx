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
  const router = useRouter();
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
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
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
                            className={`relative z-10 font-bankGothik text-3xl font-semibold transition-all duration-300 ${
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
