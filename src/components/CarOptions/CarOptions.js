import React from "react";
import Car1 from "../../../public/car1.png";
import Car2 from "../../../public/car2.png";
import Car3 from "../../../public/car3.png";
import styles from "./caroptions.module.css";
import Image from "next/image";
const CarOptions = () => {
  return (
    <div className={styles.caroptionMain}>
      <h1 className={styles.catheading}>Available Car Options</h1>
      <p className={styles.catpara}>
        Choose from our wide range of fleets that will suit your travel needs.{" "}
        <br /> Your Everyday travel partner - AC Cabs for point to point
      </p>
      <div className={styles.categoryCardContainer}>
        <div className={styles.categoryCard}>
          <div className={styles.content}>
            <p className={styles.heading}>
              Choti Sawari <br /> (Mini Car)
            </p>
            <p className={styles.facilities}>
              <span className={styles.hiddenText}>4 seater, 4 bags, AC</span>
            </p>
            <div className={styles.para}>
              <Image src={Car2} alt="" className={styles.img}/>
            </div>
          </div>
        </div>
        <div className={styles.categoryCard}>
          <div className={styles.content}>
            <p className={styles.heading}>
              Badi Sawari <br /> (Sedan Car)
            </p>
            <p className={styles.facilities}>
              <span className={styles.hiddenText}>4 seater, 4 bags, AC</span>
            </p>
            <div className={styles.para}>
              <Image src={Car1} alt="" className={styles.img} />
            </div>
          </div>
        </div>
        <div className={styles.categoryCard}>
          <div className={styles.content}>
            <p className={styles.heading}>
              Family Sawari <br />
              (SUV)
            </p>
            <p className={styles.facilities}>
              <span className={styles.hiddenText}>4 seater, 4 bags, AC</span>
            </p>
            <div className={styles.para}>
              <Image src={Car3} alt="" className={styles.img} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarOptions;
