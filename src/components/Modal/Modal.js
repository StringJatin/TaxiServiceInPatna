import React from 'react';
import { useState } from 'react'; // You can import other necessary hooks here
import styles from './Modal.module.css'; // Adjust the path based on your project structure
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';


const Modal = ({ setShowModal, setCarType, showSummary, setShowSummary }) => {
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={closeModal}>
          X
        </button>
        <h1 className={styles.catHeadingModal}>Choose Your Car Category</h1>
        <div className={styles.categoryCardContainer}>
          <div className={styles.categoryCard}>
            <div className={styles.content}>
              <p className={styles.heading}>Choti Sawari (Mini Car)</p>
              <p className={styles.facilities}>
                <span className={styles.hiddenText}>4 seater, 4 bags, AC</span>
              </p>
              <div className={styles.para}>
                <Image src="/car1.png" width={200} height={300} alt="" />
              </div>
              <button
                className={styles.bookNowBtn}
                onClick={() => {
                  setCarType('Mini Car');
                  setShowModal(false);
                  setShowSummary(true);
                }}
              >
                Book Now
              </button>
            </div>
          </div>
          <div className={styles.categoryCard}>
            <div className={styles.content}>
              <p className={styles.heading}>Badi Sawari (Sedan Car)</p>
              <p className={styles.facilities}>
                <span className={styles.hiddenText}>4 seater, 4 bags, AC</span>
              </p>
              <div className={styles.para}>
              <Image src="/car2.png"  width={200} height={300} alt="" />
              </div>
              <button
                className={styles.bookNowBtn}
                onClick={() => {
                  setCarType('Sedan');
                  setShowModal(false);
                  setShowSummary(true);
                }}
              >
                Book Now
              </button>
            </div>
          </div>
          <div className={styles.categoryCard}>
            <div className={styles.content}>
              <p className={styles.heading}>Family Sawari (SUV)</p>
              <p className={styles.facilities}>
                <span className={styles.hiddenText}>4 seater, 4 bags, AC</span>
              </p>
              <div className={styles.para}>
              <Image src="/car3.png" width={200} height={300} alt="" />
              </div>
              <button
                className={styles.bookNowBtn}
                onClick={() => {
                  setCarType('SUV');
                  setShowModal(false);
                  setShowSummary(true);
                }}
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

export default Modal;
