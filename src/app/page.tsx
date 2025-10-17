'use client';

import dynamic from "next/dynamic";
const Gallery = dynamic(() => import("~/components/gallery"), { ssr: false });


const Home = () => {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Gallery />
    </div>
  );
}

export default Home;