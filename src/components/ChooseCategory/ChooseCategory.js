import React from 'react';
import Image from 'next/image'; // Import the next/image component for optimizing image loading
import styles from './ChooseCategory.module.css'; // Adjust the path based on your project structure

const ChooseCategory = ({ setCarType, setShowModal, showModal, setShowSummary }) => {
  const handleBookNow = (carType) => {
    setCarType(carType);
    setShowSummary(true);
  };

  return (
    <div className={styles.categoryMain}>
      <h2 className={styles.carCategoryText}>Step 2: Choose Your Car</h2>
      <div className={styles.carOptionsContainer}>
        <div className={styles.carOption}>
          <h2>Chhoti Sawari (Mini Car)</h2>
          <p className={styles.facilitiesCategory}>
            <span className={styles.hiddenTextPhone}>4 seater, 4 bags, AC</span>
          </p>
          <Image src="/car1.png" alt='Mini Car' width={200} height={100} />
          <button onClick={() => handleBookNow('Mini')}>Book Now</button>
        </div>
        <div className={styles.carOption}>
          <h2>Badi Sawari (Sedan Car)</h2>
          <p className={styles.facilitiesCategory}>
            <span className={styles.hiddenTextPhone}>5 seater, 4 bags, AC</span>
          </p>
          <Image src="/car2.png" alt='Sedan Car' width={200} height={100} />
          <button onClick={() => handleBookNow('Sedan')}>Book Now</button>
        </div>
        <div className={styles.carOption}>
          <h2>Family Sawari (SUV Car)</h2>
          <p className={styles.facilitiesCategory}>
            <span className={styles.hiddenTextPhone}>6 seater, 4 bags, AC</span>
          </p>
          <Image src="/car3.png" alt='SUV Car' width={200} height={100} />
          <button onClick={() => handleBookNow('SUV')}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default ChooseCategory;
