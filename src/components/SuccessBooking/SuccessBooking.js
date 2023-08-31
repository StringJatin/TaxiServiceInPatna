import React, { useEffect } from 'react';
import styles from './SuccessBooking.module.css'; // Adjust the path based on your project structure

const SuccessBooking = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.reload();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      <div className={styles.box}>
        <div className={`${styles.success} ${styles.alert}`}>
          <div className={styles.alertBody}>
            Booking Success ! <br /> Our drivers will contact you soon. Stay Tuned!
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessBooking;
