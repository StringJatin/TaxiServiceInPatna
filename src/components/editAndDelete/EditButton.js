"use client"
import React from 'react'
import styles from '@/app/blog/[customUrl]/page.module.css'
import { useAuth } from '@/app/contexts/authContexts'
import DeleteBlog from "@/components/deleteblog/delblog";
import Link from "next/link";
const EditButton = ({data ,url}) => {
    const {user} = useAuth();
    console.log(user)
  return (
    <>  {user && <> <Link href="/dashboard"> {/* Add your dashboard URL */}
    <div className={styles.goBackLink}>Go Back To Dashboard</div>
  </Link>
  <div className={styles.buttonContainer}>
  <Link href={`/${url}/${data.customUrl}`}> <button className={`${styles.button} ${styles.editButton}`}>
    Edit Post
  </button> </Link>
 <DeleteBlog postId={data._id} />
 
 </div> </> }</>
  )
}

export default EditButton