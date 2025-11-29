import { NextResponse } from "next/server";

import { request } from "@/api/request";

// TODO: Get current banner based on time
export const GET = async () => {
    const response = await request.get("/gacha.json");

    return NextResponse.json(response.data);
};
