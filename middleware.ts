import { NextRequest, NextResponse } from "next/server";

/**
 * Password-protects the internal lead manager (/manage and its nested API
 * routes) with HTTP Basic Auth over HTTPS. Credentials from env vars:
 *   MANAGE_USER      (optional, defaults to "atlas")
 *   MANAGE_PASSWORD  (required — if unset, access is denied: fail-closed)
 * Use a long, random MANAGE_PASSWORD; that is the real lock on this page.
 */
export function middleware(req: NextRequest) {
  const user = process.env.MANAGE_USER || "atlas";
  const pass = process.env.MANAGE_PASSWORD || "";

  const auth = req.headers.get("authorization");
  if (pass && auth?.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const sep = decoded.indexOf(":");
      if (decoded.slice(0, sep) === user && decoded.slice(sep + 1) === pass) {
        return NextResponse.next();
      }
    } catch {
      /* fall through to 401 */
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Atlas Lead Manager", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/manage", "/manage/:path*"],
};
