"use client";

import React from "react";
import Image from "next/image";
import styles from "./ModuleSection.module.css";

interface ModuleHeadingProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
}

const ModuleHeading: React.FC<ModuleHeadingProps> = ({
  children,
  className = "",
  bgImage = "/robotron/modules/moduleheadingbg.min.svg",
}) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.container}>
        <Image
          src={bgImage}
          alt=""
          className={styles.backgroundImage}
          aria-hidden="true"
          width={800}
          height={200}
          priority
        />
        <h2 className={styles.heading}>{children}</h2>
      </div>
    </div>
  );
};

export default ModuleHeading;
