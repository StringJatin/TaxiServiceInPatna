'use client'
// Import statements
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './page.module.css';

import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean'],
    ['table'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'table',
];

const AddBlog = () => {
  // Your state variables
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [metatitle, setMetaTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [metadescription, setMetaDescription] = useState('');
  const [media,setMedia] = useState("")
  const createNewPost = async (e) => {
    e.preventDefault();
    try {
         e.preventDefault();
         const mediaUrl =  await imageUpload()
         console.log("media" , mediaUrl)
      // Send POST request to backend API
      const res = await fetch('/api/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metatitle,
          metadescription,
          keywords,
          title,
          content,
          
          mediaUrl,
          author,
          customUrl,
        }),
      });

      if (!res.ok) {
        throw new Error('Error occurred');
      }

      const blog = await res.json();
      console.log('Post Created successfully:', blog);
      // Add any additional logic or UI updates after successful form submission
    } catch (error) {
      console.error('Error saving form data:', error);
      // Handle errors or display error messages to the user
    }
  };
  const imageUpload = async ()=>{
    const data =  new FormData()
    data.append('file',media)
    data.append('upload_preset',"mystore")
    data.append('cloud_name',"dsxl2vpgs")
    const res = await fetch("https://api.cloudinary.com/v1_1/dsxl2vpgs/image/upload",{
      method:"POST",
      body:data
    })
    const res2  = await res.json()
    return res2.url
}
  return (
    <div className={styles.createContainer}>
         <h2>Add blog</h2>
      <form className={styles.createForm} onSubmit={createNewPost}>
        <input
          type="text"
          placeholder="Title"
          className={styles.createTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
         <input
          type="text"
          placeholder="Enter Meta Title"
          className={styles.createTitle}
          value={metatitle}
          onChange={(e) => setMetaTitle(e.target.value)}
        />
         <input
          type="text"
          placeholder="Enter Meta Description"
          className={styles.createSummary}
          value={metadescription}
          onChange={(e) => setMetaDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Keywords"
          className={styles.createSummary}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
       
          
          
            <input type="file" 
             className={styles.createSummary}
              accept="image/*"
              onChange={(e)=>setMedia(e.target.files[0])}
            />
        <img className="responsive-img" src={media?URL.createObjectURL(media):""} />
       
      

       
        <input
          type="text"
          placeholder="Enter the name of Author"
          className={styles.createSummary}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter the customized URL"
          className={styles.createSummary}
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
        />

        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          className={styles.createTextarea}
          onChange={(newValue) => setContent(newValue)}
        />

        <button className={styles.createPostBtn}>Create Post</button>
      </form>
    </div>
  );
};

export default AddBlog;
