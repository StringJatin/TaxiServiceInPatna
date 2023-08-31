import React from "react";
import Image from "next/image";
import car from "../../../public/banner-car.jpg";
import billing from "../../../public/billing.jpg";
import driver from "../../../public/driver.webp";
import india from "../../../public/india.jpg";
import styles from "./banner.module.css";

const Banner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headingbanner}>What Makes Us Unique?</div>
      <p className={styles.servicepara}>
      At Patna Taxi Service, we take pride in offering a service that stands out from the rest. Our commitment to excellence and customer satisfaction sets us apart. Here's what makes us unique:
      </p>
      <div className={styles.bannerMain}>
        <div className={styles.banner}>
          <div className={styles.shoppingImage}>
            <Image src={car} alt="clean and hygenic" layout="fill" objectFit="cover" />
          </div>
          <div className={styles.text}>
            <h4>Clean and Hygienic Car</h4>
          </div>
        </div>
        <div className={styles.banner}>
          <div className={styles.shoppingImage}>
            <Image src={billing} alt="billing" layout="fill" objectFit="cover" />
          </div>
          <div className={styles.text}>
            <h4>Transparent Billing</h4>
          </div>
        </div>
        <div className={styles.banner}>
          <div className={styles.shoppingImage}>
            <Image src={driver} alt="expert drivers" layout="fill" objectFit="cover" />
          </div>
          <div className={styles.text}>
            <h4>Expert Chauffeurs</h4>
          </div>
        </div>
        <div className={styles.banner}>
          <div className={styles.shoppingImage}>
            <Image src={india} alt="2000+ cities" layout="fill" objectFit="cover" />
          </div>
          <div className={styles.text}>
            <h4>2000+ cities</h4>
          </div>
        </div>
        {/* Repeat the same structure for other items */}
      </div>
    </div>
  );
};

export default Banner;
