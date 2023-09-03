import React from "react";
import styles from './majorcity.module.css'
import car1 from '../../../public/dharbanga.jpg'
import car2 from '../../../public/patna.jpg'
import car3 from '../../../public/madhubani.jpg'
import car4 from '../../../public/muzaffarpur.jpg'
import Image from "next/image";
const Majorcity = () => {
    return (
      <>
        <div className={styles.headingService}>
          <h1>CAB SERVICES IN BIHAR</h1>
        </div>
        <div className={styles.majorCityMain}>
          <div className={styles.majorCityCard}>
            <div className={styles.majorCityCardImage}>
              <Image src={car1} alt="" className={styles.img} />
            </div>
            <p className={styles.majorCityCardTitle}>Taxi Services In Darbhanga, Bihar</p>
            <p className={styles.majorCityCardBody}>
              Nullam ac tristique nulla, at convallis quam. Integer consectetur mi nec magna tristique, non lobortis.
            </p>
          </div>
          <div className={styles.majorCityCard}>
            <div className={styles.majorCityCardImage}>
              <Image src={car2} alt="" className={styles.img} />
            </div>
            <p className={styles.majorCityCardTitle}>Cab Services In Patna, Bihar</p>
            <p className={styles.majorCityCardBody}>
              Nullam ac tristique nulla, at convallis quam. Integer consectetur mi nec magna tristique, non lobortis.
            </p>
          </div>
          <div className={styles.majorCityCard}>
            <div className={styles.majorCityCardImage}>
              <Image src={car3} alt="" className={styles.img} />
            </div>
            <p className={styles.majorCityCardTitle}>Book Online Cab Service In Madhubani</p>
            <p className={styles.majorCityCardBody}>
              Nullam ac tristique nulla, at convallis quam. Integer consectetur mi nec magna tristique, non lobortis.
            </p>
          </div>
          <div className={styles.majorCityCard}>
            <div className={styles.majorCityCardImage}>
              <Image src={car4} alt="" className={styles.img} />
            </div>
            <p className={styles.majorCityCardTitle}>Online Cab Service In Muzaffarpur</p>
            <p className={styles.majorCityCardBody}>
              Nullam ac tristique nulla, at convallis quam. Integer consectetur mi nec magna tristique, non lobortis.
            </p>
          </div>
        </div>
      </>
    );
  };
  
  export default Majorcity;