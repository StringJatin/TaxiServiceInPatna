
import { NextResponse } from "next/server"
import connect from "@/utils/dbConn";
import formdata from "@/models/formdata"
export const GET = async (Request) => {
    try {
        await connect();
        const data = await formdata.find();
        console.log("Data fetched successfully:", data);
        return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (err) {
      

        console.error("Error fetching data:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
