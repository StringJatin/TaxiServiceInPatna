import React from "react";
import Image from "next/image";
import Link from "next/link";
import car from "../../../public/partnercar.png";
import styles from "./partnerpage.module.css";

const Partner = () => {
  return (
    <div className={styles.mainPartner}>
      <div className={styles.contentPartner}>
        <p className={styles.driver}>FOR DRIVERS (PARTNERS)</p>
        <p className={styles.headingPartner}>
          DO YOU WISH TO EARN & GROW WITH US?
        </p>
        <p className={styles.contentPartnerP}>
          We understand the value of our partners. For others, you are the
          driver of your cab, but for us you are the driver of our business.
          Join hands with us and convert the cost into investment. You have all
          the skills and expertise to manage your vehicle. Just use this
          platform to ensure regular earning with less investment. It’s the
          right place for you to find decent & professional customers with less
          efforts.
        </p>
        <div className={styles.partnerButton}>
          <Link href="/ContactUs">
            <button type="submit">Lets Handshake</button>
          </Link>
        </div>
      </div>
      <div className={styles.imgPartner}>
        <Image src={car} alt="" className={styles.img} />
      </div>
    </div>
  );
};

export default Partner;
