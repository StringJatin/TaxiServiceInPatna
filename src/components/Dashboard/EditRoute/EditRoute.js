'use client'
// Import statements
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './editRoute.module.css';
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

const EditBlog = ({id , metatitle , metadescription , keywords, title , content , FromRoute,toRoute , customUrl, media,faq1, faq2, faq3, faq4, faq5 }) => {
    const router = useRouter();
  // Your state variables
  const [Newtitle, setNewTitle] = useState(title);
  const [Newcontent, setNewContent] = useState(content);
  const [NewcustomUrl, setNewCustomUrl] = useState(customUrl);
  const [Newmetatitle, setNewMetaTitle] = useState(metatitle);
  const [Newkeywords, setNewKeywords] = useState(keywords);
  const [Newmetadescription, setNewMetaDescription] = useState(metadescription);
  const [NewFromRoute, setNewFromRoute] = useState(FromRoute);
  const [NewtoRoute, setNewtoRoute] = useState(toRoute);
  const [Newmedia,setNewMedia] = useState("")

  const [Newfaq1Ques, setNewFaq1Ques] = useState(faq1.que);
  const [Newfaq1Ans, setNewFaq1Ans] = useState(faq1.ans);

  const [Newfaq2Ques, setNewFaq2Ques] = useState(faq2.que);
  const [Newfaq2Ans, setNewFaq2Ans] = useState(faq2.ans);

  const [Newfaq3Ques, setNewFaq3Ques] = useState(faq3.que);
  const [Newfaq3Ans, setNewFaq3Ans] = useState(faq3.ans);

  const [Newfaq4Ques, setNewFaq4Ques] = useState(faq4.que);
  const [Newfaq4Ans, setNewFaq4Ans] = useState(faq4.ans);

  const [Newfaq5Ques, setNewFaq5Ques] = useState(faq5.que);
  const [Newfaq5Ans, setNewFaq5Ans] = useState(faq5.ans);
  
console.log(Newtitle);
  const createNewPost = async (e) => {
    e.preventDefault();
    try {
         e.preventDefault();
      // Send POST request to backend API
      const NewmediaUrl =  await imageUpload()

      const res = await fetch(`/api/getRoute/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Newtitle,
            Newcontent,
            NewcustomUrl,
            Newmetatitle,
            Newkeywords,
            Newmetadescription,
            NewmediaUrl,
            NewFromRoute,
            NewtoRoute,
            Newfaq1Ques,
            Newfaq1Ans,
            Newfaq2Ques,
            Newfaq2Ans,
            Newfaq3Ques,
            Newfaq3Ans,
            Newfaq4Ques,
            Newfaq4Ans,
            Newfaq5Ques,
            Newfaq5Ans

        }),
      });
      if (!res.ok) {
        throw new Error('Error occurred');
      }

      const blog = await res.json();
      alert('Route Updated successfully:');
      router.refresh();
      router.push('/route');
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
     <Link href={`/route/${customUrl}`}> {/* Add your dashboard URL */}
        <div className={styles.goBackLink}>Go Back</div>
      </Link>
    <div className={styles.createContainer}>
         <h2>Edit Post</h2>
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
          placeholder="Enter FromRoute"
          className={styles.createSummary}
          value={NewFromRoute}
          onChange={(e) => setNewFromRoute(e.target.value)}
        />
         <input
          type="text"
          placeholder="Enter toRoute"
          className={styles.createSummary}
          value={NewtoRoute}
          onChange={(e) => setNewtoRoute(e.target.value)}
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
         <h1>FAQs</h1>
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ1 Question"
                    value={Newfaq1Ques}
                    onChange={(e) => setNewFaq1Ques(e.target.value)}
                />
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ1 Answer"
                    value={Newfaq1Ans}
                    onChange={(e) => setNewFaq1Ans(e.target.value)}
                />


                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ2 Question"
                    value={Newfaq2Ques}
                    onChange={(e) => setNewFaq2Ques(e.target.value)}
                />
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ2 Answer"
                    value={Newfaq2Ans}
                    onChange={(e) => setNewFaq2Ans(e.target.value)}
                />

                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ3 Question"
                    value={Newfaq3Ques}
                    onChange={(e) => setNewFaq3Ques(e.target.value)}
                />
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ3 Answer"
                    value={Newfaq3Ans}
                    onChange={(e) => setNewFaq3Ans(e.target.value)}
                />

                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ4 Question"
                    value={Newfaq4Ques}
                    onChange={(e) => setNewFaq4Ques(e.target.value)}
                />
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ4 Answer"
                    value={Newfaq4Ans}
                    onChange={(e) => setNewFaq4Ans(e.target.value)}
                />

                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ5 Question"
                    value={Newfaq5Ques}
                    onChange={(e) => setNewFaq5Ques(e.target.value)}
                />
                <input
                    type="summary"
                    className={styles.createSummary}
                    placeholder="FAQ5 Answer"
                    value={Newfaq5Ans}
                    onChange={(e) => setNewFaq5Ans(e.target.value)}
                />

        <button className={styles.createPostBtn}>Update Route</button>
      </form>
    </div>
    </>
  );
};

export default EditBlog;
