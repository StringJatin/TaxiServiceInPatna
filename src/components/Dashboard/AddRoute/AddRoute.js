'use client'
// Import statements
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './page.module.css';

import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
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

const AddRoute = () => {
  // Your state variables
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [metatitle, setMetaTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [metadescription, setMetaDescription] = useState('');
  const [FromRoute, setFromRoute] = useState('');
  const [toRoute, settoRoute] = useState('');
  const [media,setMedia] = useState("")

  const [faq1Ques, setFaq1Ques] = useState('');
  const [faq1Ans, setFaq1Ans] = useState('');

  const [faq2Ques, setFaq2Ques] = useState('');
  const [faq2Ans, setFaq2Ans] = useState('');

  const [faq3Ques, setFaq3Ques] = useState('');
  const [faq3Ans, setFaq3Ans] = useState('');

  const [faq4Ques, setFaq4Ques] = useState('');
  const [faq4Ans, setFaq4Ans] = useState('');

  const [faq5Ques, setFaq5Ques] = useState('');
  const [faq5Ans, setFaq5Ans] = useState('');

  const reset = () =>{
    setMetaTitle("");
    setMetaDescription("");
    setKeywords("");
    setTitle('');
    setFromRoute('');
    setContent('');
    settoRoute('');
    setCustomUrl('');
    setFaq1Ques('');
    setFaq1Ans('');
    setFaq2Ques('');
    setFaq2Ans('');
    setFaq3Ques('');
    setFaq3Ans('');
    setFaq4Ques('');
    setFaq4Ans('');
    setFaq5Ques('');
    setFaq5Ans('');

   }

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
         e.preventDefault();
         const mediaUrl =  await imageUpload()

      // Send POST request to backend API
      const res = await fetch(`http://localhost:3000/api/createRoute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metatitle,
          metadescription,
          keywords,
          title,
          FromRoute,
          content,
          mediaUrl,
          toRoute,
          customUrl,
          faq1: { que: faq1Ques, ans: faq1Ans },
          faq2: { que: faq2Ques, ans: faq2Ans },
          faq3: { que: faq3Ques, ans: faq3Ans },
          faq4: { que: faq4Ques, ans: faq4Ans },
          faq5: { que: faq5Ques, ans: faq5Ans },
        }),
      });

      if (!res.ok) {
        throw new Error('Error occurred');
      }

      const blog = await res.json();
      console.log('Post Created successfully:', blog);
      alert('Route post created successfully');
          
      reset();
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
         <h2>Add Route</h2>
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
          placeholder="Enter FromRoute"
          className={styles.createSummary}
          value={FromRoute}
          onChange={(e) => setFromRoute(e.target.value)}
        />
         <input
          type="text"
          placeholder="Enter toRoute"
          className={styles.createSummary}
          value={toRoute}
          onChange={(e) => settoRoute(e.target.value)}
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
          <h1>FAQs</h1>
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ1 Question"
                    value={faq1Ques}
                    onChange={(e) => setFaq1Ques(e.target.value)}
                />
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ1 Answer"
                    value={faq1Ans}
                    onChange={(e) => setFaq1Ans(e.target.value)}
                />


                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ2 Question"
                    value={faq2Ques}
                    onChange={(e) => setFaq2Ques(e.target.value)}
                />
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ2 Answer"
                    value={faq2Ans}
                    onChange={(e) => setFaq2Ans(e.target.value)}
                />

                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ3 Question"
                    value={faq3Ques}
                    onChange={(e) => setFaq3Ques(e.target.value)}
                />
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ3 Answer"
                    value={faq3Ans}
                    onChange={(e) => setFaq3Ans(e.target.value)}
                />

                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ4 Question"
                    value={faq4Ques}
                    onChange={(e) => setFaq4Ques(e.target.value)}
                />
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ4 Answer"
                    value={faq4Ans}
                    onChange={(e) => setFaq4Ans(e.target.value)}
                />

                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ5 Question"
                    value={faq5Ques}
                    onChange={(e) => setFaq5Ques(e.target.value)}
                />
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ5 Answer"
                    value={faq5Ans}
                    onChange={(e) => setFaq5Ans(e.target.value)}
                />

        <button className={styles.createPostBtn}>Create Route</button>
      </form>
    </div>
  );
};

export default AddRoute;
