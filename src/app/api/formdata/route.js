
import dbConn from "@/utils/dbConn";
import FormData from "@/models/form";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        return new Response(JSON.stringify({message: "hola"}), { status: 200 })
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
}

export async function POST(req, res) {
    try {

        const body = await req.json();
        await dbConn();

        await FormData.create(body);

        return NextResponse.json({
            message: "Message sent successfully!"
        }, {
            status: 200
        }
        )

    } catch (e) {
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}



