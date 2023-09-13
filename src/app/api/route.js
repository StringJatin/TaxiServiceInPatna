import { NextResponse } from "next/server";

export const GET = async (request) => {

    try {
        return new Response(JSON.stringify({message: "hola"}), { status: 200 })
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};