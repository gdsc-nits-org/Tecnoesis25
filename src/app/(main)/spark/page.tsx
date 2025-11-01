'use client';
import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import SparkReveal from "~/components/spark/reveal";
import SparkAbout from "~/components/spark/SparkAbout";
import SparkFooter from "~/components/spark/SparkFooter";
import SparkGallery from "~/components/spark/SparkGallery";
import SparkLanding from "~/components/spark/SparkLanding";
const ArtistPage = dynamic(() => import("~/components/Artist/Artist"), { ssr: false });


const preloadImages = [
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761399366/SparkBG_womodd.jpg",
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761399357/9ea5e0244489e06e51c100d06e8ad957cc5e1b87_qsg5rb.jpg",
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761399370/feb0c83b471946ea49742add02b119e8a66213b6_rvefoi.gif",
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761399368/9dbf609e4cc522a951f1fc228f4c165d32ca9168_azen50.gif",
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761399383/8ce713b5f4c704eb1238449d18d739ec4c0d6022_ckar1c.gif",
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761401229/crowd_aowbu6.png"
];

const SparkPage = () => {
  return (
    <>
      <Head>
        {preloadImages.map((src) => (
          <link key={src} rel="preload" as="image" href={src} />
        ))}
      </Head>
      <div className="overflow-x-hidden">
        <SparkLanding/>
        <SparkAbout/>
        <ArtistPage/>
        <SparkReveal/>
        <SparkGallery />
        <SparkFooter />
      </div>
    </>
  );
};

export default SparkPage;
