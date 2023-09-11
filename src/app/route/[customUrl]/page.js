import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteBlog from "@/components/deleteroute/delroute";
import EditButton from "@/components/editAndDelete/EditButton";
async function getData(customUrl) {
  const res = await fetch(`${process.env.DOMAIN}/api/getRoute/${customUrl}`, {
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
    metadataBase: new URL(`${process.env.DOMAIN}/route/${post.customUrl}`),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
        'de-DE': '/de-DE',
      },
    },
  };
}


const CityPost = async ({ params }) => {
  const data = await getData(params.customUrl);
  const postInfo = data;
  console.log(postInfo);

  return (
    <> <EditButton data={data} url={"route/editroute"} />

      <div className={styles.container}>

        <div className={styles.postPage}>
          <h1>{postInfo.title}</h1>
          {/* <div>{postInfo.metadescription}</div> */}
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
          <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />

          {/* Render FAQs using FAQAccordion */}
          {(postInfo.faq1.que !== '') && <h2 className={styles.faqTitle} >Frequently Asked Questions</h2>}
          <div className={styles.faqs}>
            {Object.keys(postInfo)
              .filter((key) => key.startsWith("faq"))
              .map((key) => (
                <div key={key} className={styles.faq}>
                  <input type="checkbox" id={key} className={styles.faqToggle} />
                  {postInfo[key].que && (<><label htmlFor={key} className={styles.faqButton}>
                    {postInfo[key].que}
                  </label>
                    <div className={styles.faqAnswer}>{postInfo[key].ans}</div> </>)}
                </div>
              ))}
          </div>
        </div>
      </div> </>
  );
};

export default CityPost;
