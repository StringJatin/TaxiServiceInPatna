import dbConn from "@/utils/dbConn";
import RoutePage from "@/models/route";
import {NextResponse} from "next/server";

export const GET = async (request, { params }) => {
    const { customUrl } = params;
  
    try {
      await dbConn();
  
      const post = await RoutePage.findOne({ customUrl : customUrl });
  
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };
  
  