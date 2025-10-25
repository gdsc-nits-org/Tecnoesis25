"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import ModuleMainDesktop from "~/components/Module/ModuleMainDesktop";
import ModuleMainMobile from "~/components/Module/ModuleMainMobile";

const ModulePage= () => {
  const [isMounted, setIsMounted] = useState(false);
  const bigScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{bigScreen ? <ModuleMainDesktop/>: <ModuleMainMobile/>}</>;
};

export default ModulePage;
