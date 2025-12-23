import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decodedRefreshToken } from "./lib/sessions";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function proxy(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const refrehToken = (await cookies()).get("refreshToken")?.value;
  const decodedTokenRefresh = await decodedRefreshToken(refrehToken);

  if (isProtectedRoute && !decodedTokenRefresh?.userId!) {
    //return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    isPublicRoute &&
    decodedTokenRefresh?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    //return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
