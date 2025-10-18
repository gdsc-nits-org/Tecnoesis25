import React from "react";
import styles from "./TeamSection.module.css";

interface TeamHeadingProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
}

const TeamHeading: React.FC<TeamHeadingProps> = ({
  children,
  className = "",
  bgImage = "/robotron/team/teamsheadingbg.svg",
}) => (
  <div className={`${styles.wrapper} ${className}`}>
    <div className={styles.container}>
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

export default TeamHeading;
