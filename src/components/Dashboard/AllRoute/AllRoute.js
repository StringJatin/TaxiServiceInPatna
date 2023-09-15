'use client'
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import styles2 from '../tables/tables.module.css'
import EditBlog from '../EditRoute/EditRoute';
const AllRoute = ({ selectedOption, setSelectedOption }) => {
    const [posts, setPosts] = useState([]);
    const [postData, setPostData] = useState(null);
    useEffect(() => {
        fetch(`/api/getRoute`)
            .then((response) => response.json())
            .then((data) => {

                setPosts(data); // Assuming data is an object with a "data" property containing the posts array
            })
            .catch((error) => console.error(error));
    }, [posts]);
    const handleEditClick = (post) => {
        // Set the post data in the data state when the edit button is clicked
        setPostData(post);


        console.log(postData)

    };

    const handleDeleteClick = async (postId) => {
        try {
            // Make a DELETE request to the server to delete the field
            const response = await fetch(`/api/getRoute/${postId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Blog post deleted successfully
                alert('Route post deleted successfully!');
                // Refresh the list of posts after deletion (you may want to improve this logic)
                setPosts(posts.filter((post) => post.id !== postId));
            } else {
                // Handle the case where the delete request was not successful
                console.error('Error deleting field:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting field:', error);
        }
    };
    return (
        <>{!postData && (
            <div className={styles.container}>
                <h2 className={styles.mainTitle}>All Routes</h2>
                <table className={styles2.tableContainer}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Page Url</th>
                            <th>Image</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>

                                    {item.title}

                                </td>
                                <td>{item.customUrl}</td>
                                <td>
                                    <Image className={styles2.imageTable} src={item.mediaUrl} alt="hello" onResize="responsive" height={1000} width={1000} />
                                </td>
                                <td>{item.createdAt?.split("T")[0]}</td>

                                <td>
                                    <button className={styles.editButton} onClick={() => handleEditClick(item)}>
                                        Edit
                                    </button>
                                    <button className={styles.deleteButton} onClick={() => handleDeleteClick()}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>)}
            {postData && <EditBlog data={postData} setPostData={setPostData} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />}
        </>
    );
};

export default AllRoute;