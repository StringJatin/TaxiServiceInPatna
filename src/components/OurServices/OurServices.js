// Ourservices.js

import React from "react";
import Image from "next/image";
import local from "../../../public/local.jpg";
import oneway from "../../../public/oneway.jpg";
import outstation from "../../../public/outstation.jpg";
import styles from "./ourservices.module.css";
import Button from "../Button/Button";

const servicesData = [
  {
    image: local,
    title: "ROUNDTRIP TAXI",
    desc: "Experience the convenience of our Roundtrip Taxi service. Whether it's a weekend getaway or a business trip, our reliable and comfortable taxis are at your service for a seamless travel experience.",
    price: "$499.49",
  },
  {
    image: oneway,
    title: "Oneway Taxi",
    desc: "Simplify your travel plans with our Oneway Taxi service. Reach your destination hassle-free with our prompt and efficient taxi service that offers convenient point-to-point transportation.",
    price: "$499.49",
  },
  {
    image: outstation,
    title: "Outstation Taxi",
    desc: "Explore beyond the city limits with our Outstation Taxi service. Discover new destinations with ease and comfort, as our skilled drivers ensure a safe and enjoyable journey for you and your companions.",
    price: "$499.49",
  },
  {
    image: outstation,
    title: "Car Package",
    desc: "Explore beyond the city limits with our Car Package service. Discover new destinations with ease and comfort, as our skilled drivers ensure a safe and enjoyable journey for you and your companions.",
    price: "$499.49",
  },
  // Repeat the same structure for other items
];

const Ourservices = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainText}>Our Services</h1>
      <div className={styles.serviceGrid}>
        {servicesData.map((item) => (
          <div className={styles.item} key={item.title}>
            <div className={styles.imgContainer}>
              <Image
                className={styles.image}
                src={item.image}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
              <div className={styles.button}>
                <Button text="See More" url="#" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ourservices;
