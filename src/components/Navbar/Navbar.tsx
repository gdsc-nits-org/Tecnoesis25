"use client";
import { useEffect, useState } from "react";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
import { useMediaQuery } from "usehooks-ts";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const bigScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setIsMounted(true);

    // Listen for page loading state changes
    const handlePageLoading = (event: Event) => {
      const customEvent = event as CustomEvent<{ isLoading: boolean }>;
      setIsPageLoading(customEvent.detail.isLoading);
    };

    window.addEventListener("pageLoading", handlePageLoading);

    return () => {
      window.removeEventListener("pageLoading", handlePageLoading);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isPageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
        </div>
      )}
      {bigScreen ? <NavbarDesktop /> : <NavbarMobile />}
    </>
  );
};

export default Navbar;
