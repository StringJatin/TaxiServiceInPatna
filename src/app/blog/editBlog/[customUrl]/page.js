import EditBlog from '@/components/Dashboard/EditBlog/editBlog'
import React from 'react'
const getPostID = async(customUrl) => {
    try{
        const res = await fetch(`${process.env.DOMAIN}/api/getPosts/${customUrl}`, {
            cache: "no-store",
        })

        if(!res.ok){
            throw new Error("Failed to fetch topic");
        }

        return res.json();
    }catch (error){
        console.log(error);
    }
}
const EditBlogPage = async ({ params }) => {
    const { customUrl } = params;
    const post = await getPostID(customUrl);
    console.log(post)
    const {_id, metatitle , metadescription , keywords, title , content , author , mediaUrl } = post;
  return (
   <EditBlog id={_id}  metatitle = {metatitle} metadescription = {metadescription} keywords = {keywords} title = {title} content = {content} author = {author} customUrl ={customUrl} media={mediaUrl} />
  )
}

export default EditBlogPage