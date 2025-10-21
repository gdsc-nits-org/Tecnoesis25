"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Landing from "~/components/Home/Landing";
import { RobotronHero } from "~/components/RobotronHero";
const SnakeMatrix = dynamic(() => import("~/components/SnakeMatrix"), {
  ssr: false,
});
const Gallery = dynamic(() => import("~/components/gallery"), { ssr: false });
const About = dynamic(() => import("~/components/About"), { ssr: false });
const PreviousSponsors = dynamic(
  () => import("~/components/PreviousSponsors"),
  { ssr: false },
);
const Footer = dynamic(() => import("~/components/footer"), { ssr: false });
const Modules = dynamic(() => import("~/components/Home/Modules"), { ssr: false });


const Home = () => {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);
    
    // Disable scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-black">
      <Landing />
      <About />
      <SnakeMatrix />
      <Modules />
      <Gallery />
      <RobotronHero />
      <PreviousSponsors />
      <Footer />
    </div>
  );
};

export default Home;
