import dbConn from "@/utils/dbConn";
import PostPage from "@/models/post";
import { NextResponse } from "next/server";

export const revalidate = 0.2;
export const fetchCache = 'force-no-store';

export const GET = async (request) => {

  try {
    await dbConn();

    const posts = await PostPage.find({});

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};