import dbConn from "@/utils/dbConn";
import CityData from "@/models/city";
import {NextResponse} from "next/server";
export const GET = async (request) => { 
  
    try {
      await dbConn();
  
      const posts = await CityData.find({});
  
      return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };