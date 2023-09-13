import { NextResponse } from "next/server";

export const GET = async (request) => {

    try {
        return new NextResponse.json({message: "Hola"});
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};