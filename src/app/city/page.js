import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import metaData from '../../../public/metaData.json'
import GoToDashboard from "@/components/GoToDashboard/GoToDashboard";
export const metadata = {
  title: `${metaData.city.title}`,
  description: `${metaData.city.description}`,
  keywords: `${metaData.city.keywords}`,
  metadataBase: new URL(`${metaData.city.canonical}`),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
}

const AllCity = async () => {
  async function getData() {
    try {
      const res = await fetch(`${process.env.DOMAIN}/api/getCity`, {
        cache: "no-store",
      });
      if (!res.ok) {
        console.log("Failed to fetch data. Response status:", res.status);
        throw new Error("Failed to fetch data");
      }

      const postData = await res.json();
      return postData;
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  }
  const data = await getData();
  return (
    <div className={styles.container}>
      <GoToDashboard/>
      <h2 className={styles.mainTitle}>Cities</h2>
      <div className={styles.mainContainer}>
        {data?.map((item, index) => (
          <div  key={index} className={styles.blogContainer}>
            <div className={styles.post}>
              <div className={styles.BlogImage}>
                <Link href={`/city/${item.customUrl}`}>
                <Image src={item.mediaUrl} alt="" onResize="responsive" height={1000} width={1000} />

                </Link>
              </div>
              <div className={styles.texts}>
                <Link href={`/city/${item.customUrl}`}>
                  <h2>{item.title}</h2>
                </Link>
                {/* <p className={styles.info}>
                  <span className={styles.author}>by {item.author} </span>
                </p> */}
                <p className={styles.Summary}>
                  {" "}
                  {item.metadescription.length > 100
                    ? `${item.metadescription.substring(0, 250)}...`
                    : item.metadescription}{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCity;
