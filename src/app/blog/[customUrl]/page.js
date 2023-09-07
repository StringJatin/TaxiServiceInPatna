import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(customUrl) {
  const res = await fetch(`http://localhost:3000/api/getPosts/${customUrl}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.customUrl);
  const postInfo = data;
  return (
    <div className={styles.container}>
      <div className={styles.postPage}>
        <h1>{postInfo.title}</h1>
        <div>
          {postInfo.metadescription}
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
