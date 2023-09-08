import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import DeleteBlog from "@/components/deleteblog/delblog";

async function getData(customUrl) {
  const res = await fetch(`http://localhost:3000/api/getPosts/${customUrl}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

  const post = await getData(params.customUrl)
  return {
    title: post.metatitle,
    description: post.metadescription,
    keywords: post.keywords
  };
}
const BlogPost = async ({ params }) => {
  const data = await getData(params.customUrl);
  const postInfo = data;
  return (
    
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <a href="" className="author">
          {" "}
          by {postInfo.author}{" "}
        </a>
        <div className={styles.imagePost}>
          <img src={`https://backend-taxi.onrender.com/${postInfo.cover}`} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
};

export default BlogPost;