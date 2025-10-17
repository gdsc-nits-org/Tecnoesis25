"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


const NavDetails = [
  { name: "Home", link: "/home" },
  // { name: "About", link: "/about" },
  { name: "Modules", link: "/modules" },
  { name: "Team", link: "/team" },
  { name: "Gallery", link: "/Gallery" },
];

export default function NavbarMobile() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const router = useRouter();
  // Update active index based on current pathname
  useEffect(() => {
    const currentIndex = NavDetails.findIndex(item => item.link === pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
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

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`flex items-center justify-between px-4 py-3 fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>

     <div className="flex px-2 items-center transition-transform duration-300 origin-center scale-100 sm:scale-110 md:scale-125 cursor-pointer">
  <Image
    src="/TechnoLogo.svg"
    alt="TechnoLogo"
    width={200}
    height={45}
    className="object-contain"
    onClick={() => router.push("/")}
  />
</div>



      <button onClick={() => setIsOpen(true)} aria-label="Open menu">
        <Image src="/MenuIcon.svg" alt="MenuIcon" width={30} height={15} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-0 right-0 w-[100%] h-full bg-[#0a0a0a] shadow-lg flex flex-col justify-between p-6 z-50 overflow-y-auto"
          >

            <div className="flex justify-end pr-2 pt-2">
              <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <Image src="/CrossSign.svg" alt="crossIcon" width={30} height={15} />
              </button>
            </div>

            <div className="flex flex-col gap-12 text-lg font-medium  items-center">
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
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <div className="relative flex items-center justify-center">
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="absolute w-[420px] h-[60px]"
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
                          className={`relative z-10 text-3xl font-semibold font-bankGothik transition-all duration-300 ${isActive ? "text-[#FF9595]" : "text-white"
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

            <div className="flex  justify-center align-middle min-h-48 ">
                <Image src="/RegisterState1.svg" alt="registerImage" height={60} width={250}/>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </nav>
  );
}
