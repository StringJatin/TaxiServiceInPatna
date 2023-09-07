'use client'
import React from 'react';

import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';
import Link from 'next/link';
import styles from './page.module.css'; // Import your CSS styles
import Image from 'next/image';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const Blog = ({ _id, title, summary, cover, content, createdAt, author, customUrl }) => {

  return (
    <>
      <div className={styles.blogContainer}>
        <div className={styles.post}>
          <div className={styles.BlogImage}>
            <Link href={`/post/${customUrl}`}>
              
                <Image src={`https://backend-taxi.onrender.com/${cover}`} alt="" layout="responsive" width={100} height={100}  />
           
            </Link>
          </div>
          <div className={styles.texts}>
            <Link href={`/post/${customUrl}`}>
            
                <h2>{title}</h2>
             
            </Link>
            <p className={styles.info}>
              <a href="" className={styles.author}>
                {author}
              </a>
              <time>
                {<ReactTimeAgo date={new Date(createdAt)} />} {/* Ensure createdAt is a valid date */}
              </time>
            </p>
            <p className={styles.Summary}>{summary}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
