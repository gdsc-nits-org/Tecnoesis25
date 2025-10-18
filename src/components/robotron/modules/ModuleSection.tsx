import ModuleHeading from "./ModuleHeading";
import styles from "./ModuleSection.module.css";
import modulesData from "./modulesData.json";
import Link from "next/link";
import Image from "next/image";

const ModuleSection = () => {
  const colorPairs = [
    {
      frame: "/robotron/modules/framemodules.svg",
      button: "/robotron/modules/redbutton.svg",
      comp: "/robotron/modules/redcomp.svg",
      className: styles.redItem,
      data: modulesData["1"],
      headingColor: "#F50000",
    },
    {
      frame: "/robotron/modules/blueframe.svg",
      button: "/robotron/modules/bluebutton.svg",
      comp: "/robotron/modules/bluecomp.svg",
      className: styles.blueItem,
      data: modulesData["2"],
      headingColor: "#00E5F5",
    },
    {
      frame: "/robotron/modules/greenframe.svg",
      button: "/robotron/modules/greenbutton.svg",
      comp: "/robotron/modules/greencomp.svg",
      className: "",
      data: modulesData["3"],
      headingColor: "#00F500",
    },
    {
      frame: "/robotron/modules/yellowframe.svg",
      button: "/robotron/modules/yellowbutton.svg",
      comp: "/robotron/modules/yellowcomp.svg",
      className: "",
      data: modulesData["4"],
      headingColor: "#F5D800",
    },
  ];

  return (
    <>
      <ModuleHeading>MODULES</ModuleHeading>
      <div className={styles.itemsContainer}>
        {colorPairs.map((pair, index) => (
          <div key={index} className={`${styles.itemGroup} ${pair.className}`}>
            <div className={styles.frameWrapper}>
              <Image
                src={pair.frame}
                alt=""
                width={500}
                height={300}
                className={styles.frame}
                aria-hidden="true"
              />
              <Image
                src={pair.data.url}
                alt={pair.data.head}
                width={500}
                height={300}
                className={styles.moduleImage}
              />
              <div className={styles.hoverContent}>
                <h3
                  className={styles.moduleHeading}
                  style={{ color: pair.headingColor }}
                >
                  {pair.data.head}
                </h3>
                <p className={styles.moduleDescription}>{pair.data.text}</p>
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <div className={styles.buttonGroup}>
                <Link href={pair.data.register} className={styles.buttonLink}>
                  <button className={styles.button}>
                    <Image src={pair.button} alt="" width={200} height={50} aria-hidden="true" />
                    <span className={styles.buttonText}>REGISTER</span>
                  </button>
                </Link>
              </div>
              <div className={styles.compContainer}>
                <Image
                  src={pair.comp}
                  alt=""
                  width={100}
                  height={100}
                  className={styles.comp}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ModuleSection;
