'use client'
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './page.module.css'
import { Axios } from 'axios';
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

const Create = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [author, setAuthor] = useState('');
  const [createdAt, setCreatedAt] = useState('20/09/09');
  const [customUrl, setCustomUrl] = useState('');
  const [metatitle, setMetaTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [metadescription, setMetaDescription] = useState('');


  const reset = () => {
    setTitle('');
    setSummary('');
    setContent('');
    setFile(null);
    setAuthor('');
    setCustomUrl('');
  };

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
        e.preventDefault();
    //   const currentDate = new Date().toLocaleDateString(); // Format: "28/7/2023"
    //   const formattedCurrentDate = formatDate(currentDate);
      // Send POST request to backend API
      await Axios.post('http://localhost:3000/api/createPost', {
        metatitle,
          metadescription,
          keywords,
          title,
          content,
          file,
          createdAt,
          author,
          customUrl
      });
      console.log('Post Created successfully:');
      // Add any additional logic or UI updates after successful form submission
    } catch (error) {
      console.error('Error saving form data:', error);
      // Handle errors or display error messages to the user
    }
   
  };

  return (
    <div className={styles.createContainer}>
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
        <input
          type="text"
          placeholder="Summary"
          className={styles.createSummary}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <input
          type="file"
          className={styles.inputFile}
          onChange={(e) => setFile(e.target.files[0])}
        />

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

export default Create;
