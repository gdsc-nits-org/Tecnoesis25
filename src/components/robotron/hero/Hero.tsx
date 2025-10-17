"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
// import StyledStarsCanvas from '../Stars';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const robotronChars = el.querySelectorAll('.robotron-char');
    
    // Set initial state
    gsap.set(robotronChars, { opacity: 1, y: 0 });
    
    // ROBOTRON starts visible, fades out on scroll - optimized with force3D
    gsap.to(
      robotronChars,
      {
        opacity: 0,
        y: 100,
        stagger: 0.05,
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'top top-=30%',
          scrub: 1, // Added smoothing
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.heroContainer}>
      {/* Fixed Hero Container */}
      <div className={styles.stickyContainer}>
      {/* Stars Animation Background - Top Layer */}
      {/* <div className="absolute inset-0" style={{ zIndex: 80 }}>
        <StyledStarsCanvas />
      </div> */}

      {/* Background Layer 1 - Static (Deep Blue - Farthest) */}
      <div className={styles.bgLayer1} />

      {/* Background Layer 2 - Moving Left (Light Blue - Middle) - Slower - Seamless Loop */}
      <div className={styles.bgLayer2Container}>
        <motion.div
          className={styles.bgLayer2}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
          style={{ willChange: 'transform' }}
        />
        <motion.div
          className={styles.bgLayer2}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Background Layer 3 - Moving Left (No Blue Tint - Closest) - Faster */}
      <div className={styles.bgLayer3Container}>
        <motion.div
          className={styles.bgLayer3}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
          style={{ willChange: 'transform' }}
        />
        <motion.div
          className={styles.bgLayer3}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Tron Bike Image Layer */}
      <div className={styles.bikeImageLayer}>
        <motion.div
          className={styles.bikeImageWrapper}
          initial={{ x: '-150%', scale: 0.5, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{
            duration: 2.5,
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: 0.3
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          <Image
            src="/robotron/tron_ares_bike.png"
            alt="Tron Ares Bike"
            fill
            className={styles.bikeImage}
            priority
            quality={90}
          />
        </motion.div>
      </div>

      {/* Silhouette Layer - Top layer above everything */}
      <div className={styles.silhouetteContainer}>
        <motion.div
          className={styles.silhouette}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
          style={{ willChange: 'transform' }}
        />
        <motion.div
          className={styles.silhouette}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Red Gradient Road Effect - Horizontal at Bottom */}
      <div className={styles.roadEffect}>
        {/* Main red gradient road */}
        <div className={styles.roadGradientMain} />
        {/* Bright center line effect */}
        <div className={styles.roadGradientCenter} />
        {/* Sharp glowing line */}
        <div className={styles.roadGlowLine} />
      </div>

      {/* ROBOTRON Text - Top layer */}
      <div className={styles.textContainer}>
        <div className={styles.textWrapper}>
          <h1 className={styles.robotronText}>
            {Array.from('ROBOTRON').map((char, index) => (
              <span key={index} className={`${styles.robotronChar} robotron-char`}>
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Hero;