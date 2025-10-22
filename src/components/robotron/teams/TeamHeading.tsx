import React from "react";
import Image from "next/image";
import styles from "./TeamSection.module.css";

interface TeamHeadingProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
}

const TeamHeading: React.FC<TeamHeadingProps> = ({
  children,
  className = "",
  bgImage = "/robotron/team/teamsheadingbg.min.svg",
}) => (
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

export default TeamHeading;
