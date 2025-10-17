"use client";

import dynamic from "next/dynamic";
import Landing from "~/components/Home/Landing";
const Gallery = dynamic(() => import("~/components/gallery"), { ssr: false });
const About = dynamic(() => import("~/components/About"), { ssr: false });
const PreviousSponsors = dynamic(
  () => import("~/components/PreviousSponsors"),
  { ssr: false },
);
const Footer = dynamic(() => import("~/components/footer"), { ssr: false });

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-black">
      <Landing />
      <About />
      <Gallery />
      <PreviousSponsors />
      <Footer />
    </div>
  );
};

export default Home;
