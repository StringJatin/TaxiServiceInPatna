"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'

const DeleteBlog = ({ postId }) => {
   
    const router = useRouter();

    const handleDeleteClick = async () => {
        try {
          // Make a DELETE request to the server to delete the field
          const response = await fetch(`/api/getPosts/${postId}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            // Blog post deleted successfully
            alert('Blog post deleted successfully!');
            router.push('/blog');

          } else {
            // Handle the case where the delete request was not successful
            console.error('Error deleting field:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting field:', error);
        }
      };

  return (
    <button onClick={handleDeleteClick} className={`${styles.button} ${styles.deleteButton}`} >
      Delete
    </button>
  );
};

export default DeleteBlog;
