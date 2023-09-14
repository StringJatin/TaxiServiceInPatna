
import dbConn from "@/utils/dbConn";
import FormData from "@/models/form";
import { NextResponse } from "next/server";

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export const GET = async (req) => {
    try {
        await dbConn();
        const data = await FormData.find({});
        console.log("Data fetched successfully:", data);
        return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (err) {
        console.error("Error fetching data:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}



