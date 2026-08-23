import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/edge";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (
    process.env.MAINTENANCE_MODE === "true" &&
    pathname !== "/maintenance" &&
    !pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/maintenance", req.url));
  }

  const isLoginPage = pathname === "/admin/login";
  const isProtected = pathname.startsWith("/admin") && !isLoginPage;

  if (isProtected && !req.auth) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && req.auth) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
