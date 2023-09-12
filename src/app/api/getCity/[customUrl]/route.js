import dbConn from "@/utils/dbConn";
import CityData from "@/models/city";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { customUrl } = params;

  try {
    await dbConn();

    const post = await CityData.findOne({ customUrl: customUrl });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await dbConn();
    // const deletePost = PostPage.find((post) => post._id === parseInt(id))
    const res = await CityData.deleteOne(id);

    return new NextResponse("Post has been deleted", { status: 200 ,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }, });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const id = params.customUrl;

  try {
    await dbConn();
    const newdata = await request.json();
    const {
      Newmetatitle,
      Newmetadescription,
      Newkeywords,
      Newtitle,
      Newcontent,
      NewfootTitle,
      NewcustomUrl,
      Newfaq1Ques,
      Newfaq1Ans,
      Newfaq2Ques,
      Newfaq2Ans,
      Newfaq3Ques,
      Newfaq3Ans,
      Newfaq4Ques,
      Newfaq4Ans,
      Newfaq5Ques,
      Newfaq5Ans,
      NewmediaUrl
    } = newdata;
    const post = await CityData.updateMany({_id : id},{ $set: {
      metatitle: Newmetatitle,
      metadescription: Newmetadescription,
      keywords: Newkeywords,
      title: Newtitle,
      content: Newcontent,
      footTitle: NewfootTitle,
      customUrl: NewcustomUrl,
      mediaUrl:NewmediaUrl,
      faq1Ques: Newfaq1Ques,
      faq1Ans: Newfaq1Ans,
      faq2Ques: Newfaq2Ques,
      faq2Ans: Newfaq2Ans,
      faq3Ques: Newfaq3Ques,
      faq3Ans: Newfaq3Ans,
      faq4Ques: Newfaq4Ques,
      faq4Ans: Newfaq4Ans,
      faq5Ques: Newfaq5Ques,
      faq5Ans: Newfaq5Ans,
    }});

    return new NextResponse(JSON.stringify(post), { status: 200 ,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }, });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
