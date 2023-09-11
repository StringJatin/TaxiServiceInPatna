'use client'
// Import statements
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './page.module.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
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

const EditBlog = ({id , metatitle , metadescription , keywords, title , content , author, customUrl , media }) => {
  const router = useRouter();
  // Your state variables
  const [Newtitle, setNewTitle] = useState(title);
  const [Newcontent, setNewContent] = useState(content);
  const [Newauthor, setNewAuthor] = useState(author);
  const [NewcustomUrl, setNewCustomUrl] = useState(customUrl);
  const [Newmetatitle, setNewMetaTitle] = useState(metatitle);
  const [Newkeywords, setNewKeywords] = useState(keywords);
  const [Newmetadescription, setNewMetaDescription] = useState(metadescription);
  const [Newmedia,setNewMedia] = useState(media)
  const createNewPost = async (e) => {
    e.preventDefault();
    try {
         e.preventDefault();
      // Send POST request to backend API
      const NewmediaUrl =  await imageUpload()
      const res = await fetch(`http://localhost:3000/api/getPosts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Newmetatitle,
            Newmetadescription,
            Newkeywords,
            Newtitle,
            Newcontent,
           Newauthor,
            NewcustomUrl,
            Newmedia,
            NewmediaUrl,
        }),
      });

      if (!res.ok) {
        throw new Error('Error occurred');
      }

      const blog = await res.json();
      console.log('Post Created successfully:', blog);
      alert('Post Updated successfully:');
      router.push('/blog');
      // Add any additional logic or UI updates after successful form submission
    } catch (error) {
      console.error('Error saving form data:', error);
      // Handle errors or display error messages to the user
    }
  };

  
  const imageUpload = async ()=>{
    const data =  new FormData()
    data.append('file',Newmedia)
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
    <>
     <Link href={`/blog/${customUrl}`}> {/* Add your dashboard URL */}
        <div className={styles.goBackLink}>Go Back</div>
      </Link>
    <div className={styles.createContainer}>
         <h2>Edit blog</h2>
      <form className={styles.createForm} onSubmit={createNewPost}>
        <input
          type="text"
          placeholder="Title"
          className={styles.createTitle}
          value={Newtitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
         <input
          type="text"
          placeholder="Enter Meta Title"
          className={styles.createTitle}
          value={Newmetatitle}
          onChange={(e) => setNewMetaTitle(e.target.value)}
        />
         <input
          type="text"
          placeholder="Enter Meta Description"
          className={styles.createSummary}
          value={Newmetadescription}
          onChange={(e) => setNewMetaDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Keywords"
          className={styles.createSummary}
          value={Newkeywords}
          onChange={(e) => setNewKeywords(e.target.value)}
        />
         <input type="file" 
             className={styles.createSummary}
              accept="image/*"
              onChange={(e)=>setNewMedia(e.target.files[0])}
            />
       
      
        <input
          type="text"
          placeholder="Enter the name of Author"
          className={styles.createSummary}
          value={Newauthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter the customized URL"
          className={styles.createSummary}
          value={NewcustomUrl}
          onChange={(e) => setNewCustomUrl(e.target.value)}
        />

        <ReactQuill
          value={Newcontent}
          modules={modules}
          formats={formats}
          className={styles.createTextarea}
          onChange={(newValue) => setNewContent(newValue)}
        />
        

        <button className={styles.createPostBtn}>Update Post</button>
      </form>
    </div>
    </>
  );
};

export default EditBlog;
