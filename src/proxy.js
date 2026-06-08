import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { NextResponse } from "next/server";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(session){
        return NextResponse.redirect(new URL('/', request.url));
    } else {
        return NextResponse.next();
    };
};
export const config = {
    matcher: ['/signin', '/signup'],
};