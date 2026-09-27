import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  // Redirect /admin to dashboard or login
  if (pathname === "/admin") {
    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Protect all admin routes (except login) — require session
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // If already logged in and visiting login, go to dashboard
  if (pathname === "/admin/login" && session) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
