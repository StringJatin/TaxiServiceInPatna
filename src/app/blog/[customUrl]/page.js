import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import EditButton from "@/components/editAndDelete/EditButton";
async function getData(customUrl) {
  const res = await fetch(`http://localhost:3000/api/getPosts/${customUrl}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}
export async function generateMetadata({ params }) {

  const post = await getData(params.customUrl)
  return {
    title: post.metatitle,
    description: post.metadescription,
    keywords: post.keywords,
    metadataBase: new URL(`http://localhost:3000/blog/${post.customUrl}`),
   alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  };
}
const BlogPost = async ({ params }) => {
  const data = await getData(params.customUrl);
  const postInfo = data;
  return (
    <>
<EditButton data={data} url={"blog/editBlog"} />
    <div className={styles.container}>

      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
          <div className={styles.imageContainer}>
          <Image
    src={data.mediaUrl}
    alt=""
    width={500} // Set the desired width of the image
    height={300} // Set the desired height of the image
    layout="responsive" // Use responsive layout
    objectFit="contain" // Adjust object-fit property as needed
    className={styles.avatar}
  />
           
          </div>
        </div>
      <br></br>
         by <strong> {postInfo.author}{" "}</strong>
    
    
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div></>
  );
};

export default BlogPost;
