import React from 'react';
import styles from './page.module.css';
import {FaLocationDot} from 'react-icons/fa'
import metaData from '../../../public/metaData.json'
export const metadata = {
  title: `${metaData.contact.title}`,
  description: `${metaData.contact.description}`,
  keywords: `${metaData.contact.keywords}`,
  metadataBase: new URL(`${metaData.contact.canonical}`),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
}

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <div className={`${styles.details} ${styles.address}`}>
            <div className={styles.topic}>Address</div>
            <div className={styles.textOne}>Surkhet, NP12</div>
            <div className={styles.textTwo}>Birendranagar 06</div>
          </div>
          <div className={`${styles.details} ${styles.phone}`}>
            <i className="fas fa-phone-alt"></i>
            <div className={styles.topic}>Phone</div>
            <div className={styles.textOne}>+0098 9893 5647</div>
            <div className={styles.textTwo}>+0096 3434 5678</div>
          </div>
          <div className={`${styles.details} ${styles.email}`}>
            <i className="fas fa-envelope"></i>
            <div className={styles.topic}>Email</div>
            <div className={styles.textOne}>example@gmail.com</div>
            <div className={styles.textTwo}>info.example@gmail.com</div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.topicText}>Send us a message</div>
          <p>
            If you have any work for me or any types of queries related to my tutorial, you can send me a message from here. Its my pleasure to help you.
          </p>
          <form action="#">
            <div className={styles.inputBox}>
              <input type="text" placeholder="Enter your name" className={styles.inputTextBox} />
            </div>
            <div className={styles.inputBox}>
              <input type="text" placeholder="Enter your email" className={styles.inputTextBox} />
            </div>
            <div className={`${styles.inputBox} ${styles.messageBox}`}>
              <textarea placeholder="Your message" cols="30" rows="10"></textarea>
            </div>
            <div >
              <button className={styles.button}>Send Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
