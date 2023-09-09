import dbConn from "@/utils/dbConn";
import PostPage from "@/models/post";
import {NextResponse} from "next/server";

export const GET = async (request, { params }) => {
    const { customUrl } = params;
  
    try {
      await dbConn();
  
      const post = await PostPage.findOne({ customUrl : customUrl });
  
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };
  
  export const DELETE = async (request, { params }) => {
    console.log("id by ayush : ",params)
    const { id } = params;
  
    try {
      await dbConn();
      // const deletePost = PostPage.find((post) => post._id === parseInt(id))
      const res = await PostPage.deleteOne(id);
      console.log("post deleted" , res)
      return new NextResponse("Post has been deleted", { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };

  export const PUT = async (request, { params }) => {
    const id  = params.customUrl;
  console.log("id is : " , id)
    try {
      await dbConn();
      const newdata = await request.json();
      const {Newmetatitle,
            Newmetadescription,
            Newkeywords,
            Newtitle,
            Newcontent,
           Newauthor,
            NewcustomUrl,
            NewmediaUrl} =newdata
      const post = await PostPage.updateMany({_id : id},{ $set: {metatitle : Newmetatitle , metadescription : Newmetadescription , keywords: Newkeywords , title : Newtitle , content : Newcontent, author : Newauthor, customUrl: NewcustomUrl, mediaUrl : NewmediaUrl }});
  
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };