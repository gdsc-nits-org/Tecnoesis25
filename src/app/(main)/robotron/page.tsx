"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Hero } from "../../../components/robotron";
import "./performance.css";

// Loading skeleton components
const SectionSkeleton = ({ height = "h-screen" }: { height?: string }) => (
  <div className={`${height} w-full animate-pulse bg-gradient-to-b from-gray-900 to-black`}>
    <div className="flex h-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-700 border-t-red-500" />
    </div>
  </div>
);

// Lazy load heavy components with optimized loading states
const AboutSection = dynamic(
  () => import("../../../components/robotron").then((mod) => ({ default: mod.AboutSection })),
  {
    loading: () => <SectionSkeleton />,
  }
);

const ModuleSection = dynamic(
  () => import("../../../components/robotron").then((mod) => ({ default: mod.ModuleSection })),
  {
    loading: () => <SectionSkeleton />,
  }
);

const TeamsSection = dynamic(
  () => import("../../../components/robotron").then((mod) => ({ default: mod.TeamsSection })),
  {
    loading: () => <SectionSkeleton />,
    ssr: false, // Client-side only due to slick carousel
  }
);

const Footer = dynamic(
  () => import("../../../components/robotron").then((mod) => ({ default: mod.Footer })),
  {
    loading: () => <SectionSkeleton height="h-64" />,
    ssr: false, // WebGL component - client-side only
  }
);

export default function RobotronPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <main className="pb-0">
        {/* Hero loads immediately - critical above-the-fold content */}
        <Hero />
        
        {/* Sections wrapped in Suspense for better error boundaries */}
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <ModuleSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <TeamsSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-64" />}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
