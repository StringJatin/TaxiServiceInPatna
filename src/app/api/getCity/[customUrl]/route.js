import dbConn from "@/utils/dbConn";
import CityData from "@/models/city";
import {NextResponse} from "next/server";

export const GET = async (request, { params }) => {
    const { customUrl } = params;
  
    try {
      await dbConn();
  
      const post = await CityData.findOne({ customUrl : customUrl });
  
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };
  
  