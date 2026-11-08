import { NextResponse } from "next/server";
import { COOKIE_NAME, TTL_DAYS, makeToken, timingSafeEqual } from "@/lib/manageAuth";

// Verifies the password and, if correct, sets the signed 90-day cookie.
export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const pass = process.env.MANAGE_PASSWORD || "";
  if (!pass) {
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* empty */
  }
  const given = String(body.password ?? "");

  if (!given || !timingSafeEqual(given, pass)) {
    return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
  }

  const token = await makeToken(pass, TTL_DAYS);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/manage",
    maxAge: TTL_DAYS * 86400,
  });
  return res;
}
