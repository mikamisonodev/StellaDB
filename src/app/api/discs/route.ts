import { NextResponse } from "next/server";

import { request } from "@/api/request";

export const GET = async () => {
    const response = await request.get("/disc.json");

    return NextResponse.json(response.data);
};
