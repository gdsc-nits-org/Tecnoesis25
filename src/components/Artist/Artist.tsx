"use client";

import type { NextPage } from 'next';
import { useState, useEffect, useRef } from 'react';

const tracklist = [
  { id: 1, title: "Raat Ki Rani", playing: true },
  { id: 2, title: "Yeh Haseen Raatein", playing: true },
  { id: 3, title: "Dil Hai Jawan", playing: true },
  { id: 4, title: "Tum Ho Kahan", playing: true },
  { id: 5, title: "Yeh Saare Talk Talk", playing: false },
  { id: 6, title: "SM Kare Knock Knock", playing: false },
  { id: 7, title: "Bande Khaate Khauf", playing: false },
  { id: 8, title: "Khauf", playing: false },
  { id: 9, title: "Energy Dein Off Off", playing: false },
  { id: 10, title: "Hum Kare Boss Job", playing: false },
  { id: 11, title: "Ceo Hain Top Notch", playing: false },
];

const ArtistPage: NextPage = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const visualizerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isCardPlaying, setIsCardPlaying] = useState(false);


  const [isMobileVisible, setIsMobileVisible] = useState(false);
  const [hasMobileAnimated, setHasMobileAnimated] = useState(false);
  const mobileVisualizerRef = useRef<HTMLDivElement>(null); const [showMobileIntro, setShowMobileIntro] = useState(true);
  const [showMobileBaba, setShowMobileBaba] = useState(false);
  const [showMobileMain, setShowMobileMain] = useState(false);

  const [lyrics, setLyrics] = useState(tracklist);

  const handleCardPlayToggle = () => {

    const newIsPlaying = !isCardPlaying;
    setIsCardPlaying(newIsPlaying);

    // Act based on the new state
    if (newIsPlaying) {
      void audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsLoaded(true);
          setHasLoaded(true);
        } else if (entry) {
          setIsLoaded(false);
        }
      },
      {
        threshold: 0.5,
      }
    );

    const currentRef = visualizerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // --- NEW: MOBILE Effect (Scroll-based) ---
  useEffect(() => {
    const mobileObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsMobileVisible(true);
          setHasMobileAnimated(true);
        } else if (entry) {
          setIsMobileVisible(false);
        }
      },
      { threshold: 0.5 }
    );
    const currentMobileRef = mobileVisualizerRef.current;
    if (currentMobileRef) {
      mobileObserver.observe(currentMobileRef);
    }
    return () => {
      if (currentMobileRef) {
        mobileObserver.unobserve(currentMobileRef);
      }
    };
  }, []); useEffect(() => {
    // Check for window width or user agent, or just run it.
    // For this example, we'll assume if it's not a large screen, it's mobile.
    // A better check might be window.innerWidth < 768 on mount.

    // 1. Show Intro (default) -> Show Baba
    const timer1 = setTimeout(() => {
      setShowMobileIntro(false);
      setShowMobileBaba(true);
    }, 3000); // 3 seconds on intro, matches video

    // 2. Show Baba -> Show Main
    const timer2 = setTimeout(() => {
      setShowMobileMain(true); // This triggers the slide-up animation
    }, 5000); // 2 more seconds on baba art, matches video (5s total)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
    // Run only once on mount
  }, []);

  // --- Animation logic for split-screen ---
  const getSplitAnimation = (direction: 'left' | 'right') => {
    if (isLoaded) {
      return direction === 'left' ? 'slideOutLeft 0.5s forwards' : 'slideOutRight 0.5s forwards';
    }
    if (hasLoaded && !isLoaded) {
      return direction === 'left' ? 'slideInLeftReverse 0.5s forwards' : 'slideInRightReverse 0.5s forwards';
    }
    return 'none';
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/dsj9gr1o3/video/upload/v1761826455/Raat_Ki_Rani_-_Seedhe_Maut_pagalall.com_qoz3wo.mp3"
        preload="auto"
        onEnded={() => setIsCardPlaying(false)}
      />
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* --- MOBILE-ONLY ANIMATIONS --- */
        @keyframes slideUpAndFade {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 1; transform: translateY(-100%); }
        }

        /* --- NEW: Mobile Intro Split --- */
        @keyframes slideUpSplit {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 1; }
        }
        @keyframes slideDownSplit {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100%); opacity: 1; }
        }

        /* Reverse animations for scrolling back up */
        @keyframes slideUpReverse {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDownReverse {
          0% { transform: translateY(100%); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }

        /* Logo animation - bounce left, then slide right and fade out */
        @keyframes logoSlideRightBounce {
          0% { 
            transform: translateX(0); 
            opacity: 1;
            animation-timing-function: ease-in;
          }
          10% { 
            transform: translateX(-30px); 
            opacity: 1;
            animation-timing-function: ease-in;
          }
          100% { 
            transform: translateX(calc(100vw + 100px)); 
            opacity: 1; 
          }
        }

        .animate-logoSlide {
          animation: logoSlideRightBounce 1.1s linear forwards;
        }
        /* Background fade and darken animation */
        @keyframes bgFadeAndDarken {
          0% {
            opacity: 1;
            filter: brightness(1);
          }
          100% {
            opacity: 0.7;
            filter: brightness(0.4);
          }
        }

        .animate-bgFade {
          animation: bgFadeAndDarken 0.6s ease-out forwards;
        }
        @keyframes artistSlideDown {
          0% {
            transform: translateY(-150%);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-artistSlide {
          animation: artistSlideDown 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Maut rotation animation */
        @keyframes mautRotate {
          0% {
            transform: rotate(45deg);
          }
          70% {
            transform: rotate(45deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .animate-mautRotate {
          animation: mautRotate 1.2s ease-out forwards;
        }

        /* Spotify card slide up from bottom */
        @keyframes spotifySlideUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-spotifySlide {
          animation: spotifySlideUp 0.8s ease-out forwards;
        }

        /* PA (Parental Advisory) slide down from top with bounce */
        @keyframes paSlideDown {
          0% {
            transform: translateY(-150%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-paSlide {
          animation: paSlideDown 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slideUp {
          animation: slideUpSplit 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-slideDown {
          animation: slideDownSplit 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-slideUpReverse {
          animation: slideUpReverse 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-slideDownReverse {
          animation: slideDownReverse 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }        /* Split-screen animations:
          - Slide partially (40% of their *own* width, which is 20% of the screen)
          - Fade slightly
          - Darken
        */
        @keyframes slideOutLeft {
          from { transform: translateX(0); opacity: 1; filter: brightness(1); }
          to { transform: translateX(-45%); opacity: 0.7; filter: brightness(0.4); }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; filter: brightness(1); }
          to { transform: translateX(45%); opacity: 0.7; filter: brightness(0.4); }
        }

        /* Reverse split-screen animations:
          - The opposite of the 'out' animations
        */
        @keyframes slideInLeftReverse {
          from { transform: translateX(-40%); opacity: 0.7; filter: brightness(0.4); }
          to { transform: translateX(0); opacity: 1; filter: brightness(1); }
        }
        @keyframes slideInRightReverse {
          from { transform: translateX(40%); opacity: 0.7; filter: brightness(0.4); }
          to { transform: translateX(0); opacity: 1; filter: brightness(1); }
        }

        /* Keyframe for tracklist: slides in from bottom
        */
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInDown {
  from { opacity: 0; transform: translateY(-100%); }
  to { opacity: 1; transform: translateY(0); }
}

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100%); }
          to { opacity: 1; transform: translateX(0); }
        }


        @keyframes glitch {
          0% { transform: translate(0); text-shadow: none; }
          20% { transform: translate(-3px, 3px); text-shadow: -3px 0 0 rgba(255, 0, 0, 0.7), 3px 0 0 rgba(0, 255, 255, 0.7); }
          40% { transform: translate(3px, -3px); text-shadow: -3px 0 0 rgba(255, 0, 0, 0.7), 3px 0 0 rgba(0, 255, 255, 0.7); }
          60% { transform: translate(-3px, -3px); text-shadow: none; }
          80% { transform: translate(3px, 3px); text-shadow: -3px 0 0 rgba(255, 0, 0, 0.7), 3px 0 0 rgba(0, 255, 255, 0.7); }
          100% { transform: translate(0); text-shadow: none; }
        }
        @keyframes staticFlicker {
          0%, 100% { opacity: 0.02; }
          10% { opacity: 0.05; }
          30% { opacity: 0.01; }
          50% { opacity: 0.04; }
          70% { opacity: 0.02; }
          90% { opacity: 0.06; }
        }
          @keyframes slideDownThenRotateMaut {
          0% {
            opacity: 1;
            transform: translate(-50%, -150%) rotate(45deg); /* Start up and rotated */
          }
          70% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(45deg); /* Arrive, still rotated */
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(0deg); /* Straighten out */
          }
        }

        @keyframes slideInFromLeft {
 0%{ opacity: 0; transform: translateX(-100%); }
 25%{ opacity: 0; transform: translateX(-75%); filter: brightness(0.4) }
 50%{ opacity: 0; transform: translateX(-50%); filter: brightness(0.4) }
 75%{ opacity: 0; transform: translateX(-20%); filter: brightness(0.4) }
 100%{ opacity: 0.7; transform: translateX(0); filter: brightness(0.4) }
 }
 @keyframes slideInFromRight {
  0%{ opacity: 0; transform: translateX(100%); }
 25%{ opacity: 0; transform: translateX(75%); filter: brightness(0.4) }
 50%{ opacity: 0; transform: translateX(50%); filter: brightness(0.4) }
 75%{ opacity: 0; transform: translateX(20%); filter: brightness(0.4) }
 100%{ opacity: 0.7; transform: translateX(0); filter: brightness(0.4) }
 }

        {/* These slide in at the same time as the logo stack */}
        .animate-on-load.loaded .merging-image-left {
 animation: slideInFromLeft 0.7s 0s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94);
 }
 .animate-on-load.loaded .merging-image-right {
animation: slideInFromRight 0.7s 0s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94);
 }

        /* Class-based animations */
        .animate-on-load.loaded .center-content {
          animation: fadeIn 0.7s 0.3s forwards, glitch 1.5s 1s linear infinite;
        }
        
        /* Applied the new slideInUp animation
        */
        .animate-on-load.loaded .tracklist-container {
          animation: slideInUp 1s 1.5s forwards cubic-bezier(0.34, 1.42, 0.64, 1);
        }

        .animate-on-load.loaded .logo-part-maut {
          animation: slideDownThenRotateMaut 1.2s 0s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Longer duration */
        }

        .animate-on-load.loaded .artist-image {
          animation: slideInUp 0.7s 0s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-on-load.loaded .logo-stack {
  animation: slideInDown 0.7s 0.3s forwards cubic-bezier(0.34, 1.42, 0.64, 1);
}
        
        .animate-on-load.loaded .left-elements {
          animation: slideInUp 1s 1.5s forwards cubic-bezier(0.34, 1.42, 0.64, 1);
        }
      `}</style>

      {/* Main Container is now just a wrapper, not the full screen */}
      <main>

        {/*Visualizer Screen */}
        <section
          ref={visualizerRef} // Attach the ref here
          className={`animate-on-load ${isLoaded ? 'loaded' : ''} relative h-screen w-full bg-black overflow-hidden font-sans hidden md:block mt-5`}
        >
          {/* Layer 1: Split Images (The Background) */}
          <div className="absolute inset-0 z-0 flex flex-row">
            {/* These slide in from the sides to merge in the middle */}
            <div className="merging-images absolute inset-0 z-[-0] flex flex-row -translate-x-[50%] left-[50%] w-[45%] h-full">
              <div className="merging-image-left relative w-[50%] h-full overflow-hidden opacity-0 bg-black">
                <img
                  src="/leftshakti.png"
                  alt="Shakti background left"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="merging-image-right relative w-[50%] h-full overflow-hidden opacity-0 bg-black">
                <img
                  src="/rightshakti.png"
                  alt="Shakti background right"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Left Half Container */}
            <div
              className="relative w-1/2 h-full overflow-hidden"
              style={{
                animation: getSplitAnimation('left'),
              }}
            >
              <img
                src="leftbaba.png"
                alt="Initial background art - left half"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Right Half Container */}
            <div
              className="relative w-1/2 h-full overflow-hidden"
              style={{
                animation: getSplitAnimation('right'),
              }}
            >
              <img
                src="rightbaba.png"
                alt="Initial background art - right half"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Layer 2: Static Flicker Overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'url(https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2M1OGY0NTIzNWI2YjRhYjJkYmZkY2IzYmNiMmYzYTU5YWY4ZGFjMyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/TEXTURE/giphy.gif)',
              backgroundSize: 'cover',
              animation: 'staticFlicker 0.3s steps(5, end) infinite',
              opacity: 0.02,
            }}
          />

          {/* Layer 3: Center Content (Artists & Text) */}
          {/* *** CHANGED *** Using flex-col, justify-between, and padding to position items
          */}
          <div className="center-content absolute inset-0 z-40 flex flex-col items-center justify-between pt-24 pb-0 opacity-0">
            {/* *** CHANGED *** Replaced text with image stack */}
            <div className="logo-stack relative w-full max-w-2xl h-64 flex items-center justify-center z-30">
              {/* BHAI.png - Small text "TERA BHAI" */}
              <img
                src="/BHAI.png"
                alt="Tera Bhai"
                className="absolute z-20 w-20"
                style={{ top: '10%', left: '18.5%', transform: 'translate(-50%, -50%)' }}
              />
              {/* LOGOS.png - Red circle logo */}
              <img
                src="/LOGOS.png"
                alt="Seedhe Maut Logo"
                className="absolute z-10 w-32"
                style={{ top: '2%', right: '22%', transform: 'translate(50%, -50%)' }}
              />
              {/* SEEDHE.png - Large main text */}
              <img
                src="/SEEDHE.png"
                alt="Seedhe"
                className="absolute z-10 w-full max-w-lg"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              />
              {/* Maut.png - Bottom text */}
              <img
                src="/Maut.png"
                alt="Maut"
                className="logo-part-maut absolute z-30 w-44"
                style={{ top: '78%', left: '68%', transform: 'translate(-50%, -50%)' }}
              />
            </div>
            {/* This container will be pushed to the bottom by justify-between */}
            <div className="artist-image relative w-[60vw]"> {/* Constrained width */}
              <img
                src="/SM.png"
                alt="Main artist"
                className=" relative z-10 w-full h-auto" // Responsive image
              />
            </div>
          </div>

          {/* Layer 4: Left Elements (Logo & Advisory) */}
          <div className="left-elements absolute bottom-8 z-30 left-8 flex flex-col gap-4 opacity-0">
            <img src="/N.svg" alt="Logo"
              className="h-60 w-60 z-10 relative animate-pulse"
            />
            <img
              src="/PA.png"
              alt="Parental Advisory"
              className="h-16 w-20  relative"
            />
          </div>


          {/* Layer 5: Right "Lyrics" Card */}
          <div className="tracklist-container absolute bottom-20 right-12 z-30 w-80 max-w-sm opacity-0">
            <div className="relative rounded-lg overflow-hidden backdrop-blur-md ring-1 ring-white/10 shadow-2xl">
              <img
                src="bgbg.jpg"
                alt="Card background"
                className="absolute inset-0 z-0 h-full w-full object-cover"
              />
              <div className="rounded-lg  p-6 backdrop-blur-sm ring-1 ring-white/10 shadow-2xl"
                style={{ backgroundColor: 'rgba(255, 13, 23, 0.6)' }}>
                {/* Header */}
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src="/logogg.png"
                    alt="Album Art"
                    className="h-16 w-16 rounded-md shadow-md"
                  />
                  <div>
                    {/* Hardcoded to match image, but you can use tracklist[0] */}
                    <h3 className="text-xl font-bold text-white">Raat Ki Rani</h3>
                    <p className="text-sm text-white/90">Seedhe Maut</p>
                  </div>
                  <img
                    src={isCardPlaying ? '/pause.png' : '/play.png'}
                    alt={isCardPlaying ? 'Pause' : 'Play'}
                    className="h-24 w-20 cursor-pointer absolute right-2 z-20" // Adjust size as needed
                    onClick={handleCardPlayToggle}
                  />
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  {/* --- CHANGED: Modified Lyric Map --- */}
                  {lyrics.map((track) => (
                    <div key={track.id}>
                      <p
                        className={`text-2xl font-bold transition-colors ${
                          // If card is playing, ALL are white.
                          // If not, use the track's individual 'playing' status.
                          isCardPlaying ? 'text-white' : (track.playing ? 'text-white' : 'text-black')
                          }`}
                      >
                        {track.title}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Spotify Logo Footer */}
                <div className="mt-8 flex items-center gap-2 text-black">
                  <svg fill="currentColor" viewBox="0 0 16 16" className="h-6 w-6">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.5.5 0 0 1-.582-.495c-.038-.28.192-.505.47-.543 3.03-.69 5.662-.393 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-8.005-.93a.625.625 0 0 1-.72-.609c-.043-.33.24-.622.568-.667 2.872-.81 6.522-.36 8.943 1.12a.625.625 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.75.75 0 0 1-.825-.67c-.05-3.63 3.14-1.003 6.363-1.662C13.312 3.61 14.135 5.36 12.75 6.81a.75.75 0 0 1-1.002.085z" />
                  </svg>
                  <span className="text-lg font-bold">Spotify</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-40 bg-gradient-to-t from-black from-45% to-transparent" />
        </section>

        {/* =================================================================== */}
        {/* Section 3: MOBILE Visualizer (Visible on mobile only)              */}
        {/* =================================================================== */}
        <section
          ref={mobileVisualizerRef} // <-- ATTACHED REF
          className={`animate-on-load ${isMobileVisible ? 'loaded' : ''} relative h-screen w-full bg-black overflow-hidden font-sans block md:hidden`} // <-- ADDED STATE
        >

          {/* --- MOBILE Layer 1: Main Content (Final Screen) --- */}
          {/* This is the base layer (z-0) that is revealed */}
          <div className="absolute inset-0 z-0">
            {/* New Gold/Yellow Background */}
            <img
              src="/mobilebg.jpg"
              alt="Background"
              className={`h-screen w-full object-cover ${isMobileVisible ? 'animate-bgFade' : ''}`}
              style={{ animationDelay: '2s' }}
            />            {/* (All your existing main content: artists, logos, lyrics card) */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center -translate-y-[10%]">
              {/* ... Artists ... */}
              <div
                className={`flex flex-col relative ${isMobileVisible ? 'animate-artistSlide' : 'opacity-0'}`}
                style={{ animationDelay: '1.8s', transform: 'translateY(-150vh)' }}
              >
                {/* Background intersect image */}
                <img
                  src="/intersect.png"
                  alt="Background"
                  className="absolute inset-0 w-[75vw] h-[75vw] object-contain -z-10 -top-[40%] mx-auto"
                />
                <img
                  src="/SM.png"
                  alt="Artists"
                  className="w-[90vw] max-w-sm mx-auto"
                />
                <img
                  src="/SEEDHE.png"
                  alt="Seedhe"
                  className="w-[90vw] max-w-md -mt-1"
                />
                <img
                  src="/Maut.png"
                  alt="Maut"
                  className={`w-[30vw] absolute ${isMobileVisible ? 'animate-mautRotate' : ''}`}
                  style={{ top: '87%', left: '58%', animationDelay: '2s', transform: 'rotate(45deg)' }}
                />
                <img
                  src="/BHAI.png"
                  alt="Tera Bhai"
                  className="w-[20vw] absolute -mt-1"
                  style={{ top: '65%', left: '0%' }}
                />
              </div>
            </div>
            {/* ... Parental Advisory ... */}
            <img
              src="/PA.png"
              alt="Parental Advisory"
              className={`absolute top-4 right-4 z-20 h-16 w-auto ${isMobileVisible ? 'animate-paSlide' : 'opacity-0'}`}
              style={{ animationDelay: '1.8s', transform: 'translateY(-150%)' }}
            />
            {/* ... Lyrics Card ... */}
            <div
              className={`absolute bottom-0 left-0 right-0 z-30 p-6 ${isMobileVisible ? 'animate-spotifySlide' : 'opacity-0'}`}
              style={{ animationDelay: '1.5s', transform: 'translateY(100%)' }}
            >
              <div className="relative rounded-2xl overflow-visible backdrop-blur-md ring-1 ring-white/10 shadow-2xl max-w-md mx-auto">
                {/* Play/Pause Button - Outside to bulge out */}
                <img
                  src={isCardPlaying ? '/pause.png' : '/play.png'}
                  alt={isCardPlaying ? 'Pause' : 'Play'}
                  className="absolute h-28 w-24 cursor-pointer z-20"
                  style={{ top: '-2rem', right: '-1rem' }}
                  onClick={handleCardPlayToggle}
                />
                <img
                  src="bgbg.jpg"
                  alt="Card background"
                  className="absolute inset-0 z-0 h-full w-full object-cover rounded-2xl"
                />
                <div className="rounded-lg p-6 backdrop-blur-sm ring-1 ring-white/10 shadow-2xl relative overflow-hidden"
                  style={{ backgroundColor: 'rgba(255, 13, 23, 0.6)' }}>
                  {/* Header */}
                  <div className="mb-4 flex items-center gap-4">
                    <img
                      src="/logogg.png"
                      alt="Album Art"
                      className="h-16 w-16 rounded-md shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">Raat Ki Rani</h3>
                      <p className="text-sm text-white/90">Seedhe Maut</p>
                    </div>
                  </div>

                  {/* Lyrics Section */}
                  <div className="mt-6 flex flex-col gap-1">
                    {lyrics.filter(track => track.playing).map((track) => (
                      <div key={track.id}>
                        <p
                          className={`text-2xl font-bold transition-colors ${
                            // If card is playing, ALL are white.
                            // If not, use the track's individual 'playing' status.
                            isCardPlaying ? 'text-white' : (track.playing ? 'text-white' : 'text-black')
                            }`}
                        >
                          {track.title}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Spotify Logo Footer */}
                  <div className="mt-4 flex items-center gap-2 text-black">
                    <svg fill="currentColor" viewBox="0 0 16 16" className="h-6 w-6">
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.5.5 0 0 1-.582-.495c-.038-.28.192-.505.47-.543 3.03-.69 5.662-.393 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-8.005-.93a.625.625 0 0 1-.72-.609c-.043-.33.24-.622.568-.667 2.872-.81 6.522-.36 8.943 1.12a.625.625 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.75.75 0 0 1-.825-.67c-.05-3.63 3.14-1.003 6.363-1.662C13.312 3.61 14.135 5.36 12.75 6.81a.75.75 0 0 1-1.002.085z" />
                    </svg>
                    <span className="text-lg font-bold">Spotify</span>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* --- MOBILE Layer 2: Centered Seedhe Maut Logo (Stays visible during reveal) --- */}
          <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none">
            <img
              src="/LOGOS.png"
              alt="Seedhe Maut Logo"
              className={`w-32 h-32 object-contain ${isMobileVisible ? 'animate-logoSlide' : ''}`}
              style={{ animationDelay: '1.5s' }}
            />
          </div>

          {/* --- MOBILE Layer 3: Intro Screen (NOW SPLITS ON SCROLL) --- */}
          <div
            className={`absolute inset-0 z-10 pointer-events-none overflow-hidden`}
          >
            {/* Top Half */}
            <div
              className={`absolute top-0 left-0 w-full h-1/2 bg-black ${isMobileVisible
                  ? 'animate-slideUp'
                  : hasMobileAnimated
                    ? 'animate-slideUpReverse'
                    : ''
                }`}
            >
              <img
                src="/mob.png"
                alt="Intro top"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Bottom Half (Flipped) */}
            <div
              className={`absolute bottom-0 left-0 w-full h-1/2 bg-black ${isMobileVisible
                  ? 'animate-slideDown'
                  : hasMobileAnimated
                    ? 'animate-slideDownReverse'
                    : ''
                }`}
            >
              <img
                src="/mob2.png"
                alt="Intro bottom mirror"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

        </section>
      </main>
    </>
  );
};

export default ArtistPage;

