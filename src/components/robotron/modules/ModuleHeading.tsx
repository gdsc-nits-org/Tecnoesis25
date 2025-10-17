import React from 'react';
import styles from './ModuleSection.module.css';

interface ModuleHeadingProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
}

const ModuleHeading: React.FC<ModuleHeadingProps> = ({
  children,
  className = '',
  bgImage = '/robotron/modules/moduleheadingbg.svg'
}) => (
  <div className={`${styles.wrapper} ${className}`}>
    <div className={styles.container}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.videoBackground}
      >
        <source src="/robotron/bit_binary.mp4" type="video/mp4" />
      </video>
      <img 
        src={bgImage}
        alt="" 
        className={styles.backgroundImage}
        aria-hidden="true"
      />
      <h2 className={styles.heading}>{children}</h2>
    </div>
  </div>
);

export default ModuleHeading;
