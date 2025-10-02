// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 🔹 Define page access by role
const roleAccess: Record<string, string[]> = {
  User: ["/users"],
  Admin: ["/todos"],
  Moderator: ["/products"],
};

// 🔹 Public pages that anyone can access
const PUBLIC_PATHS = ["/", "/login", "/signup", "/unauthorized"];
const PUBLIC_PATH_PREFIXES = ["/api/", "/_next/"];
const LOGIN_PAGE = "/login";

// 🔹 Middleware function
export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // ✅ Skip public paths and Next.js internals
  if (
    PUBLIC_PATHS.includes(pathname) ||
    PUBLIC_PATH_PREFIXES.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.next();
  }

  // 🔹 Get JWT token from NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // ✅ If no token, redirect to login
  if (!token) {
    url.pathname = LOGIN_PAGE;
    return NextResponse.redirect(url);
  }

  // 🔹 Get role from token
  const role = token.role as string | undefined;
  if (!role) {
    url.pathname = LOGIN_PAGE;
    return NextResponse.redirect(url);
  }

  // 🔹 RBAC check: is this path allowed for the role?
  const allowedPaths = roleAccess[role] || [];
  const isAllowed = allowedPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (!isAllowed) {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  // ✅ All good, allow the request
  return NextResponse.next();
}

// 🔹 Apply middleware to all pages except static files
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
