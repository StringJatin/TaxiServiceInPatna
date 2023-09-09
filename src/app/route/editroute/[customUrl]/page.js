import EditBlog from '@/components/Dashboard/EditRoute/EditRoute'
import React from 'react'
const getPostID = async(customUrl) => {
    try{
        const res = await fetch(`http://localhost:3000/api/getRoute/${customUrl}`, {
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
    console.log("Custom is ",customUrl)
    const post = await getPostID(customUrl);
    console.log(post)
    const {_id, metatitle , metadescription , keywords, title , FromRoute, toRoute , content, faq1, faq2, faq3, faq4, faq5    } = post;
  return (
   <EditBlog id={_id}  metatitle = {metatitle} metadescription = {metadescription} keywords = {keywords} title = {title} content = {content} FromRoute={FromRoute} toRoute={toRoute} faq1={faq1} faq2={faq2} faq3={faq3}  faq4={faq4} faq5={faq5}  customUrl ={customUrl} />
  )
}

export default EditBlogPage