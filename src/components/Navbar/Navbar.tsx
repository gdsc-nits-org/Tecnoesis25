"use client";
import { useEffect, useState } from "react";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
import { useMediaQuery } from "usehooks-ts";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const bigScreen = useMediaQuery("(min-width: 1025px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{bigScreen ? <NavbarDesktop /> : <NavbarMobile />}</>;
};

export default Navbar;