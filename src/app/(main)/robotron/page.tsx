"use client";

import dynamic from "next/dynamic";
import { Hero } from "../../../components/robotron";

// Lazy load heavy components with loading states
const AboutSection = dynamic(
  () => import("../../../components/robotron").then((mod) => ({ default: mod.AboutSection })),
  {
    loading: () => <div className="h-screen" />,
  }
);

const ModuleSection = dynamic(
  () => import("../../../components/robotron").then((mod) => ({ default: mod.ModuleSection })),
  {
    loading: () => <div className="h-screen" />,
  }
);

const TeamsSection = dynamic(
  () => import("../../../components/robotron").then((mod) => ({ default: mod.TeamsSection })),
  {
    loading: () => <div className="h-screen" />,
    ssr: false, // Client-side only due to slick carousel
  }
);

const Footer = dynamic(
  () => import("../../../components/robotron").then((mod) => ({ default: mod.Footer })),
  {
    loading: () => <div className="h-64" />,
    ssr: false, // WebGL component - client-side only
  }
);

export default function RobotronPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <main className="pb-0">
        <Hero />
        <AboutSection />
        <ModuleSection />
        <TeamsSection />
        <Footer />
      </main>
    </div>
  );
}
