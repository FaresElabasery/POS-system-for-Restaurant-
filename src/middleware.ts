import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    

    if (token.role === "admin") {
        return NextResponse.next();
    } else if (token.role === "user") {
        if (
            pathname.startsWith("/products") ||
            pathname.startsWith("/orders") ||
            pathname.startsWith("/category")
        ) {
            return NextResponse.redirect(new URL("/table", req.url));
        }
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
    matcher: [
        "/products/:path*",
        "/orders/:path*",
        "/category/:path*",
        "/table/:path*",
        "/tableDetails/:path*",
    ],
};
