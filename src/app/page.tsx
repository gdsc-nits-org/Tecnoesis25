'use client';

import dynamic from "next/dynamic";
const Gallery = dynamic(() => import("~/components/gallery"), { ssr: false });
const About = dynamic(() => import("~/components/About"), { ssr: false });
const Footer = dynamic(() => import("~/components/footer"), { ssr: false });


const Home = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden pt-28 md:pt-32 bg-black">
      <About />
      <Gallery />
      <Footer />
    </div>
  );
}

export default Home;
