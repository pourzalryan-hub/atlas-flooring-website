import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/manageAuth";

/**
 * Protects the internal lead manager (/manage and its nested API routes).
 * One password login sets a signed, 90-day cookie (see src/lib/manageAuth.ts),
 * so you don't have to sign in on every visit.
 *   MANAGE_PASSWORD  (required — if unset, access is denied: fail-closed)
 * The login page and its API are the only /manage paths left open.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public auth endpoints (must be reachable without a cookie).
  if (
    pathname === "/manage/login" ||
    pathname.startsWith("/manage/api/login") ||
    pathname.startsWith("/manage/api/logout")
  ) {
    return NextResponse.next();
  }

  const pass = process.env.MANAGE_PASSWORD || "";
  if (!pass) {
    return new NextResponse("Lead manager is not configured.", { status: 503 });
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (await verifyToken(token, pass)) {
    return NextResponse.next();
  }

  // Data/API calls get a clean 401; page views go to the login screen.
  if (pathname.startsWith("/manage/api/")) {
    return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/manage/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/manage", "/manage/:path*"],
};
