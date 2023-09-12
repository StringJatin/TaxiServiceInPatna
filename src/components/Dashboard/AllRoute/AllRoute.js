'use client'
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

const AllRoute = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/getRoute`)
          .then((response) => response.json())
          .then((data) => {
           
            setPosts(data); // Assuming data is an object with a "data" property containing the posts array
          })
          .catch((error) => console.error(error));
      }, []);
      
  return (
    <>
     <div className={styles.container}>
      <h2 className={styles.mainTitle}>Routes</h2>
      <div className={styles.mainContainer}>
        {posts?.map((item, index) => (
          <div  key={index} className={styles.blogContainer}>
            <div className={styles.post}>
              <div className={styles.BlogImage}>
                <Link href={`/route/${item.customUrl}`}>
                <Image src={item.mediaUrl} alt="" onResize="responsive" height={1000} width={1000} />

                </Link>
              </div>
              <div className={styles.texts}>
                <Link href={`/route/${item.customUrl}`}>
                  <h2>{item.title}</h2>
                </Link>
                {/* <p className={styles.info}>
                  <span className={styles.author}>by {item.author} </span>
                </p> */}
                <p className={styles.Summary}>
                  {" "}
                  {item.metadescription.length > 100
                    ? `${item.metadescription.substring(0, 100)}...`
                    : item.metadescription}{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AllRoute;