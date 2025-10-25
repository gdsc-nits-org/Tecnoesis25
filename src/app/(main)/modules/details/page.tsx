"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import ModuleDetailsDesktop from "~/components/Module/ModuleDetailsDesktop";
import ModuleDetailsMobile from "~/components/Module/ModuleDetailsMobile";


const ModuleDetails= () => {
  const [isMounted, setIsMounted] = useState(false);
  const bigScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{bigScreen ? <ModuleDetailsDesktop/>: <ModuleDetailsMobile/>}</>;
};

export default ModuleDetails;
