import dbConn from "@/utils/dbConn";
import RoutePage from "@/models/route";
import {NextResponse} from "next/server";

export async function POST(req, res) {
    try {

        const body = await req.json();
        await dbConn();

        await RoutePage.create(body);

        return NextResponse.json({
            message:"route sent successfully!"
        }, {
            status: 200
        })

    }catch (e) {
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}

