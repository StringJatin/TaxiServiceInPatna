// 'use client'
// import React, { useEffect, useState } from 'react';

import styles from './page.module.css'; // Import your CSS styles
import Blog from './blogView';


// const AllBlogs = ({ loginStatus }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch('https://backend-taxi.onrender.com/post')
//       .then((response) => response.json())
//       .then((data) => {
//         setPosts(data.data); // Assuming data is an object with a "data" property containing the posts array
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <>
      
//       <h1 className={styles.blogHeading}>Blogs, News, Events & Client Reviews</h1>
//       <div className={styles.DisplayBlog}>
//         {posts.length > 0 &&
//           posts.map((post) => (
//             <Blog key={post.id} {...post} /> // Assuming each post has a unique "id" property
//           ))}
//       </div>
    
//     </>
//   );
// };

// export default AllBlogs;
import React from 'react'

const page = ({data}) => {
    
  return (
    <>
   <h1>Hello Server {data}</h1> 
    {/* <h1 className={styles.blogHeading}>Blogs, News, Events & Client Reviews</h1>
       <div className={styles.DisplayBlog}>
        {data.length > 0 &&
           data.map((post) => (
             <Blog key={post.id} {...post} /> // Assuming each post has a unique "id" property
           ))}
       </div> */}
    </>
  )
}
export async function getServerSideProps(e) {
    e.preventDefault();
    
    try {
      // Fetch data from external API
      const res = await fetch(`https://backend-taxi.onrender.com/post`);
  
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status code: ${res.status}`);
      }
  
      const data = await res.json();
      console.log('Data received from the external API:', data);
  
      // Pass data to the page via props
      return { props: { data } };
    } catch (error) {
      console.error('Error in getServerSideProps:', error);
      return {
        props: {
          data: null, // or an appropriate default value or error indicator
        },
      };
    }
  }
  
export default page