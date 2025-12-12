import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const protectedRoutes = ["/api/v1/users"];
const publicRoutes = ["/login", "/register"];

export default async function proxy(req: NextRequest, res: NextResponse) {
  const authHeader = (await headers()).get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  //const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute) {
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    return jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      function (err, decoded) {
        if (err) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }

        return NextResponse.next();
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
