'use client';
import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";


import { useState, useCallback, useRef } from "react";

const SparkLanding = dynamic(() => import("~/components/spark/SparkLanding"), { ssr: false, loading: () => null });
const SparkAbout = dynamic(() => import("~/components/spark/SparkAbout"), { ssr: false, loading: () => null });
const SparkReveal = dynamic(() => import("~/components/spark/reveal"), { ssr: false, loading: () => null });
const SparkGallery = dynamic(() => import("~/components/spark/SparkGallery"), { ssr: false, loading: () => null });
const SparkFooter = dynamic(() => import("~/components/spark/SparkFooter"), { ssr: false, loading: () => null });
const ArtistPage = dynamic(() => import("~/components/Artist/Artist"), { ssr: false, loading: () => null });


const preloadImages = [
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761399366/SparkBG_womodd.jpg",
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761399357/9ea5e0244489e06e51c100d06e8ad957cc5e1b87_qsg5rb.jpg",
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761399370/feb0c83b471946ea49742add02b119e8a66213b6_rvefoi.gif",
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761399368/9dbf609e4cc522a951f1fc228f4c165d32ca9168_azen50.gif",
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761399383/8ce713b5f4c704eb1238449d18d739ec4c0d6022_ckar1c.gif",
  "https://res.cloudinary.com/dmezugavw/image/upload/v1761401229/crowd_aowbu6.png"
];


const SparkPage = () => {

  const [sectionsLoaded, setSectionsLoaded] = useState({
    landing: false,
    about: false,
    artist: false,
    reveal: false,
    gallery: false,
    footer: false,
  });
  // Track which sections have already called onReady to prevent infinite loop
  const alreadyLoadedRef = useRef<Record<string, boolean>>({});

  const onSectionLoad = useCallback((section: keyof typeof sectionsLoaded) => {
    if (!alreadyLoadedRef.current[section]) {
      alreadyLoadedRef.current[section] = true;
      setSectionsLoaded((prev) => ({ ...prev, [section]: true }));
    }
  }, []);

  const allLoaded = Object.values(sectionsLoaded).every(Boolean);

  return (
    <>
      <Head>
        {preloadImages.map((src) => (
          <link key={src} rel="preload" as="image" href={src} />
        ))}
      </Head>
      {!allLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
          <span className="text-3xl font-bold animate-pulse">Loading...</span>
        </div>
      )}
      <div className={`overflow-x-hidden${!allLoaded ? ' pointer-events-none select-none opacity-0' : ''}`}>
        <SparkLanding onReady={() => onSectionLoad('landing')} />
        <SparkAbout onReady={() => onSectionLoad('about')} />
        <ArtistPage onReady={() => onSectionLoad('artist')} />
        <SparkReveal onReady={() => onSectionLoad('reveal')} />
        <SparkGallery onReady={() => onSectionLoad('gallery')} />
        <SparkFooter onReady={() => onSectionLoad('footer')} />
      </div>
    </>
  );
};

export default SparkPage;
