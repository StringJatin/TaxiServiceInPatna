import React from 'react';
import carmain from '../../../public/carmain.png';
import Link from 'next/link';
import styles from './aboutusbanner.module.css';
import Image from 'next/image';
const AboutUs = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutContainer}>
        <div className={styles.aboutImg}>
          <Image src={carmain} className={styles.img} alt="" />
        </div>
        <div className={styles.aboutText}>
          <span>About Us</span>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam aperiam magnam fuga sunt harum rerum
            mollitia libero quam necessitatibus commodi, obcaecati laborum optio quaerat facilis! Blanditiis dolores
            earum officiis veniam.
          </p>
          <Link href="/AboutUsPage">
            <button className={styles.btn}>Learn More</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
