'use client'
import React from 'react';
import styles from './cta.module.css';

const Cta = () => {
  const handleBookNowCta = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.ctamain}>
      <div className={styles.bgimghero}>
        <div className={styles.container}>
          <div className={`${styles.row} ${styles.alignitemslgcenter} ${styles.textcenter} ${styles.textlgleft} ${styles.space2}`}>
            <div className={styles.collg7}>
              <h2 className={styles.textwhite}>Call Now To Reserve Your Ride</h2>
              <p className={`${styles.lead} ${styles.textwhite}`}>
                Space gives you everything you need to manage business, build
                great stuff, and reach your goals.
              </p>
            </div>

            <div className={styles.textlgright}>
              <a className={`${styles.btn} ${styles.btnpurple}`} href="#">
                +91 8877665544
              </a>
              <button
                className={`${styles.btn} ${styles.btnlight} ${styles.btnglowing}`}
                onClick={handleBookNowCta}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
