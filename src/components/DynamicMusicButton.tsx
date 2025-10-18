"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const BgmButton = dynamic(() => import("~/components/BgmButton"), {
  ssr: false,
});

export default function DynamicMusicButton() {
  return (
    // Suspense is good practice for dynamic imports
    <Suspense fallback={null}>
      <BgmButton />
    </Suspense>
  );
}
