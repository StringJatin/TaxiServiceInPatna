import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import metaData from '../../../public/metaData.json'
import GoToDashboard from "@/components/GoToDashboard/GoToDashboard";
export const metadata = {
  title: `${metaData.blogs.title}`,
  description: `${metaData.blogs.description}`,
  keywords: `${metaData.blogs.keywords}`,
  metadataBase: new URL(`${metaData.blogs.canonical}`),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
}

const Blog = async () => {

  async function getData() {
    try {
    const res = await fetch("http://localhost:3000/api/getPosts", {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log("Failed to fetch data. Response status:", res.status);
      throw new Error("Failed to fetch data");
    }
  
   const postData = await res.json();
   console.log("sssssssssssssssss0",postData)
   return postData;
  }catch (error) {
    console.error("Error fetching form data:", error);
  }
  }
  const data = await getData();
  console.log("dataaaaaa", data)
  return (
    <>
    <Head>
    <link rel="canonical" href="https://example.com/dresses/green-dresses" key="cannonical" />
    </Head>
    <div className={styles.container}>
    <GoToDashboard/>
      <h2 className={styles.mainTitle} >Blogs, News and Releases</h2>
    <div className={styles.mainContainer}>
      
      {data.map((item) => (
       <div className={styles.blogContainer}>
       <div className={styles.post}>
           <div className={styles.BlogImage}>
               <Link href={`/blog/${item.customUrl}`}>
                  
               <Image src={item.mediaUrl} alt="" onResize="responsive" height={1000} width={1000} />
               </Link>
           </div>
           <div className={styles.texts}>
              <Link href={`/blog/${item.customUrl}`}><h2>{item.title}</h2></Link> 
               <p className={styles.info}>
                   <span className={styles.author}>by {item.author} </span>
               </p>
               <p className={styles.Summary}> {item.metadescription.length > 100
    ? `${item.metadescription.substring(0, 200)}...`
    : item.metadescription} </p>
           </div>
       </div>
   </div>
      ))} 
    </div>
    </div> </>
  );
};

export default Blog;