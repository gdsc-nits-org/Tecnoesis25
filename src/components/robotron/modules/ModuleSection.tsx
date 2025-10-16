import ModuleHeading from './ModuleHeading';
import styles from './ModuleSection.module.css';

const ModuleSection = () => {
  const colorPairs = [
    { 
      frame: '/robotron/modules/framemodules.svg',
      button: '/robotron/modules/redbutton.svg',
      comp: '/robotron/modules/redcomp.svg',
      className: styles.redItem
    },
    { 
      frame: '/robotron/modules/blueframe.svg',
      button: '/robotron/modules/bluebutton.svg',
      comp: '/robotron/modules/bluecomp.svg',
      className: styles.blueItem
    },
    { 
      frame: '/robotron/modules/greenframe.svg',
      button: '/robotron/modules/greenbutton.svg',
      comp: '/robotron/modules/greencomp.svg',
      className: ''
    },
    { 
      frame: '/robotron/modules/yellowframe.svg',
      button: '/robotron/modules/yellowbutton.svg',
      comp: '/robotron/modules/yellowcomp.svg',
      className: ''
    }
  ];

  return (
    <>
      <ModuleHeading>
        MODULES
      </ModuleHeading>
      <div className={styles.itemsContainer}>
        {colorPairs.map((pair, index) => (
          <div key={index} className={`${styles.itemGroup} ${pair.className}`}>
            <div className={styles.frameWrapper}>
              <img 
                src={pair.frame}
                alt="" 
                className={styles.frame}
                aria-hidden="true"
              />
            </div>
            <div className={styles.buttonWrapper}>
              <div className={styles.buttonGroup}>
                <button className={styles.button}>
                  <img 
                    src={pair.button}
                    alt="" 
                    aria-hidden="true"
                  />
                  <span className={styles.buttonText}>REGISTER</span>
                </button>
              </div>
              <div className={styles.compContainer}>
                <img 
                  src={pair.comp}
                  alt="" 
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